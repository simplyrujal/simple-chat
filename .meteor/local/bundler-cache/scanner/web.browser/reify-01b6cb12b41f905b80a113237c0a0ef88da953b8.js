'use client';module.export({AccordionTitle:()=>AccordionTitle});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let get;module.link('../../helpers/get.js',{get(v){get=v}},1);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},2);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},3);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},4);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},5);let useAccordionContext;module.link('./AccordionPanelContext.js',{useAccordionContext(v){useAccordionContext=v}},6);let accordionTheme;module.link('./theme.js',{accordionTheme(v){accordionTheme=v}},7);









function AccordionTitle(props) {
  const { arrowIcon: ArrowIcon, flush, isOpen, setOpen } = useAccordionContext();
  const onClick = () => typeof setOpen !== "undefined" && setOpen();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [accordionTheme.title, provider.theme?.accordion?.title, props.theme],
    [get(provider.clearTheme, "accordion.title"), props.clearTheme],
    [get(provider.applyTheme, "accordion.title"), props.applyTheme]
  );
  const { as: Heading = "h2", children, className, ...restProps } = resolveProps(props, provider.props?.accordionTitle);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: twMerge(theme.base, theme.flush[flush ? "on" : "off"], theme.open[isOpen ? "on" : "off"], className),
      onClick,
      type: "button",
      ...restProps,
      children: [
        /* @__PURE__ */ jsx(Heading, { className: theme.heading, "data-testid": "flowbite-accordion-heading", children }),
        ArrowIcon && /* @__PURE__ */ jsx(
          ArrowIcon,
          {
            "aria-hidden": true,
            className: twMerge(theme.arrow.base, theme.arrow.open[isOpen ? "on" : "off"]),
            "data-testid": "flowbite-accordion-arrow"
          }
        )
      ]
    }
  );
}
AccordionTitle.displayName = "AccordionTitle";


//# sourceMappingURL=AccordionTitle.js.map
