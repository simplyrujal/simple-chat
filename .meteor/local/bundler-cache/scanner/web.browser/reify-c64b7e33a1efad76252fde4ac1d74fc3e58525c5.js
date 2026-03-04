'use client';module.export({Popover:()=>Popover});let jsxs,Fragment,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},Fragment(v){Fragment=v},jsx(v){jsx=v}},0);let useMergeRefs,FloatingFocusManager;module.link('@floating-ui/react',{useMergeRefs(v){useMergeRefs=v},FloatingFocusManager(v){FloatingFocusManager=v}},1);let useState,useRef,isValidElement,useMemo,cloneElement;module.link('react',{useState(v){useState=v},useRef(v){useRef=v},isValidElement(v){isValidElement=v},useMemo(v){useMemo=v},cloneElement(v){cloneElement=v}},2);let get;module.link('../../helpers/get.js',{get(v){get=v}},3);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},4);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},5);let useBaseFloating,useFloatingInteractions;module.link('../../hooks/use-floating.js',{useBaseFloating(v){useBaseFloating=v},useFloatingInteractions(v){useFloatingInteractions=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let getArrowPlacement;module.link('../Floating/helpers.js',{getArrowPlacement(v){getArrowPlacement=v}},8);let popoverTheme;module.link('./theme.js',{popoverTheme(v){popoverTheme=v}},9);











function Popover(props) {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [popoverTheme, provider.theme?.popover, props.theme],
    [get(provider.clearTheme, "popover"), props.clearTheme],
    [get(provider.applyTheme, "popover"), props.applyTheme]
  );
  const {
    children,
    content,
    arrow = true,
    trigger = "click",
    initialOpen,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    placement: theirPlacement = "bottom",
    ...restProps
  } = resolveProps(props, provider.props?.popover);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(initialOpen));
  const arrowRef = useRef(null);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  const floatingProps = useBaseFloating({
    open,
    placement: theirPlacement,
    arrowRef,
    setOpen
  });
  const {
    floatingStyles,
    context,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    refs
  } = floatingProps;
  const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
    context,
    role: "dialog",
    trigger
  });
  const childrenRef = children.ref;
  const ref = useMergeRefs([context.refs.setReference, childrenRef]);
  if (!isValidElement(children)) {
    throw Error("Invalid target element");
  }
  const target = useMemo(() => {
    return cloneElement(
      children,
      getReferenceProps({
        ref,
        "data-testid": "flowbite-popover-target",
        ...children?.props
      })
    );
  }, [children, ref, getReferenceProps]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    target,
    open && /* @__PURE__ */ jsx(FloatingFocusManager, { context, modal: true, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: theme.base,
        ref: refs.setFloating,
        "data-testid": "flowbite-popover",
        ...restProps,
        style: floatingStyles,
        ...getFloatingProps(),
        children: /* @__PURE__ */ jsxs("div", { className: theme.inner, children: [
          arrow && /* @__PURE__ */ jsx(
            "div",
            {
              className: theme.arrow.base,
              "data-testid": "flowbite-popover-arrow",
              ref: arrowRef,
              style: {
                top: arrowY ?? " ",
                left: arrowX ?? " ",
                right: " ",
                bottom: " ",
                [getArrowPlacement({ placement })]: theme.arrow.placement
              },
              children: "\xA0"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: theme.content, children: content })
        ] })
      }
    ) })
  ] });
}
Popover.displayName = "Popover";


//# sourceMappingURL=Popover.js.map
