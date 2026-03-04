'use client';module.export({Accordion:()=>Accordion});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let useState,useMemo,Children,cloneElement;module.link('react',{useState(v){useState=v},useMemo(v){useMemo=v},Children(v){Children=v},cloneElement(v){cloneElement=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let ChevronDownIcon;module.link('../../icons/chevron-down-icon.js',{ChevronDownIcon(v){ChevronDownIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let accordionTheme;module.link('./theme.js',{accordionTheme(v){accordionTheme=v}},8);










function Accordion(props) {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [accordionTheme.root, provider.theme?.accordion?.root, props.theme],
    [get(provider.clearTheme, "accordion.root"), props.clearTheme],
    [get(provider.applyTheme, "accordion.root"), props.applyTheme]
  );
  const {
    alwaysOpen = false,
    arrowIcon = ChevronDownIcon,
    children,
    flush = false,
    collapseAll = false,
    className,
    ...restProps
  } = resolveProps(props, provider.props?.accordion);
  const [isOpen, setOpen] = useState(collapseAll ? -1 : 0);
  const panels = useMemo(
    () => Children.map(
      children,
      (child, i) => cloneElement(child, {
        alwaysOpen,
        arrowIcon,
        flush,
        isOpen: isOpen === i,
        setOpen: () => setOpen(isOpen === i ? -1 : i)
      })
    ),
    [alwaysOpen, arrowIcon, children, flush, isOpen]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: twMerge(theme.base, theme.flush[flush ? "on" : "off"], className),
      "data-testid": "flowbite-accordion",
      ...restProps,
      children: panels
    }
  );
}
Accordion.displayName = "Accordion";


//# sourceMappingURL=Accordion.js.map
