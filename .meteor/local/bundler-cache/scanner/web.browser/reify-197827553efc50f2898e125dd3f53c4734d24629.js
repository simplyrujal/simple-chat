'use client';module.export({AccordionContent:()=>AccordionContent});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let get;module.link('../../helpers/get.js',{get(v){get=v}},1);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},2);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},3);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},4);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},5);let useAccordionContext;module.link('./AccordionPanelContext.js',{useAccordionContext(v){useAccordionContext=v}},6);let accordionTheme;module.link('./theme.js',{accordionTheme(v){accordionTheme=v}},7);









function AccordionContent(props) {
  const { isOpen } = useAccordionContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [accordionTheme.content, provider.theme?.accordion?.content, props.theme],
    [get(provider.clearTheme, "accordion.content"), props.clearTheme],
    [get(provider.applyTheme, "accordion.content"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.accordionContent);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: twMerge(theme.base, className),
      "data-testid": "flowbite-accordion-content",
      hidden: !isOpen,
      ...restProps
    }
  );
}
AccordionContent.displayName = "AccordionContent";


//# sourceMappingURL=AccordionContent.js.map
