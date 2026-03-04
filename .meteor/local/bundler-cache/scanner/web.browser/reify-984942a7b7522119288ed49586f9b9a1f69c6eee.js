'use client';module.export({FooterTitle:()=>FooterTitle});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let footerTheme;module.link('./theme.js',{footerTheme(v){footerTheme=v}},7);









const FooterTitle = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.title, provider.theme?.footer?.title, props.theme],
    [get(provider.clearTheme, "footer.title"), props.clearTheme],
    [get(provider.applyTheme, "footer.title"), props.applyTheme]
  );
  const { as: Component = "h2", className, title, ...restProps } = resolveProps(props, provider.props?.footerTitle);
  return /* @__PURE__ */ jsx(Component, { ref, "data-testid": "flowbite-footer-title", className: twMerge(theme.base, className), ...restProps, children: title });
});
FooterTitle.displayName = "FooterTitle";


//# sourceMappingURL=FooterTitle.js.map
