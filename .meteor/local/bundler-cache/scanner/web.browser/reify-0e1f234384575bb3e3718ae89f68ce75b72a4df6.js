'use client';module.export({Dropdown:()=>Dropdown});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let useListNavigation,useTypeahead,FloatingFocusManager,FloatingList;module.link('@floating-ui/react',{useListNavigation(v){useListNavigation=v},useTypeahead(v){useTypeahead=v},FloatingFocusManager(v){FloatingFocusManager=v},FloatingList(v){FloatingList=v}},1);let useState,useRef,useCallback,useMemo,useEffect,cloneElement;module.link('react',{useState(v){useState=v},useRef(v){useRef=v},useCallback(v){useCallback=v},useMemo(v){useMemo=v},useEffect(v){useEffect=v},cloneElement(v){cloneElement=v}},2);let get;module.link('../../helpers/get.js',{get(v){get=v}},3);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},4);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},5);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},6);let useBaseFloating,useFloatingInteractions;module.link('../../hooks/use-floating.js',{useBaseFloating(v){useBaseFloating=v},useFloatingInteractions(v){useFloatingInteractions=v}},7);let ChevronDownIcon;module.link('../../icons/chevron-down-icon.js',{ChevronDownIcon(v){ChevronDownIcon=v}},8);let ChevronLeftIcon;module.link('../../icons/chevron-left-icon.js',{ChevronLeftIcon(v){ChevronLeftIcon=v}},9);let ChevronRightIcon;module.link('../../icons/chevron-right-icon.js',{ChevronRightIcon(v){ChevronRightIcon=v}},10);let ChevronUpIcon;module.link('../../icons/chevron-up-icon.js',{ChevronUpIcon(v){ChevronUpIcon=v}},11);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},12);let Button;module.link('../Button/Button.js',{Button(v){Button=v}},13);module.link('../Button/ButtonGroup.js');module.link('../Button/ButtonGroupContext.js');let DropdownContext;module.link('./DropdownContext.js',{DropdownContext(v){DropdownContext=v}},14);let dropdownTheme;module.link('./theme.js',{dropdownTheme(v){dropdownTheme=v}},15);



















const icons = {
  top: ChevronUpIcon,
  right: ChevronRightIcon,
  bottom: ChevronDownIcon,
  left: ChevronLeftIcon
};
function Trigger({
  refs,
  children,
  inline,
  theme,
  disabled,
  setButtonWidth,
  getReferenceProps,
  renderTrigger,
  ...buttonProps
}) {
  const ref = refs.reference;
  const a11yProps = getReferenceProps();
  useEffect(() => {
    if (ref.current) {
      setButtonWidth?.(ref.current.clientWidth);
    }
  }, [ref, setButtonWidth]);
  if (renderTrigger) {
    const triggerElement = renderTrigger(theme);
    return cloneElement(triggerElement, { ref: refs.setReference, disabled, ...a11yProps, ...triggerElement.props });
  }
  return inline ? /* @__PURE__ */ jsx("button", { type: "button", ref: refs.setReference, className: theme?.inlineWrapper, disabled, ...a11yProps, children }) : /* @__PURE__ */ jsx(Button, { ...buttonProps, disabled, type: "button", ref: refs.setReference, ...a11yProps, children });
}
function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [buttonWidth, setButtonWidth] = useState(void 0);
  const elementsRef = useRef([]);
  const labelsRef = useRef([]);
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [dropdownTheme, provider.theme?.dropdown, props.theme],
    [get(provider.clearTheme, "dropdown"), props.clearTheme],
    [get(provider.applyTheme, "dropdown"), props.applyTheme]
  );
  const {
    children,
    className,
    dismissOnClick = true,
    enableTypeAhead = true,
    renderTrigger,
    ...restProps
  } = resolveProps(props, provider.props?.dropdown);
  const {
    placement = restProps.inline ? "bottom-start" : "bottom",
    trigger = "click",
    label,
    inline,
    arrowIcon = true,
    ...buttonProps
  } = restProps;
  const dataTestId = restProps["data-testid"] || "flowbite-dropdown-target";
  const handleSelect = useCallback((index) => {
    setSelectedIndex(index);
    setOpen(false);
  }, []);
  const handleTypeaheadMatch = useCallback(
    (index) => {
      if (open) {
        setActiveIndex(index);
      } else {
        handleSelect(index);
      }
    },
    [open, handleSelect]
  );
  const { context, floatingStyles, refs } = useBaseFloating({
    open,
    setOpen,
    placement
  });
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
    enabled: enableTypeAhead
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useFloatingInteractions({
    context,
    role: "menu",
    trigger,
    interactions: [listNav, typeahead]
  });
  const Icon = useMemo(() => {
    const [p] = placement.split("-");
    return icons[p] ?? ChevronDownIcon;
  }, [placement]);
  return /* @__PURE__ */ jsxs(
    DropdownContext.Provider,
    {
      value: {
        theme: props.theme,
        clearTheme: props.clearTheme,
        applyTheme: props.applyTheme,
        activeIndex,
        dismissOnClick,
        getItemProps,
        handleSelect
      },
      children: [
        /* @__PURE__ */ jsxs(
          Trigger,
          {
            ...buttonProps,
            refs,
            inline,
            theme,
            "data-testid": dataTestId,
            className: twMerge(theme.floating.target, className),
            setButtonWidth,
            getReferenceProps,
            renderTrigger,
            children: [
              label,
              arrowIcon && /* @__PURE__ */ jsx(Icon, { className: theme.arrowIcon })
            ]
          }
        ),
        open && /* @__PURE__ */ jsx(FloatingFocusManager, { context, modal: false, children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: refs.setFloating,
            style: { ...floatingStyles, minWidth: buttonWidth },
            "data-testid": "flowbite-dropdown",
            "aria-expanded": open,
            ...getFloatingProps({
              className: twMerge(
                theme.floating.base,
                theme.floating.animation,
                "duration-100",
                !open && theme.floating.hidden,
                theme.floating.style.auto,
                className
              )
            }),
            children: /* @__PURE__ */ jsx(FloatingList, { elementsRef, labelsRef, children: /* @__PURE__ */ jsx("ul", { className: theme.content, tabIndex: -1, children }) })
          }
        ) })
      ]
    }
  );
}
Dropdown.displayName = "Dropdown";


//# sourceMappingURL=Dropdown.js.map
