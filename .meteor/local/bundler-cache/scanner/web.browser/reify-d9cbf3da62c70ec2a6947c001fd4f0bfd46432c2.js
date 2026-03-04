'use client';module.export({FooterDivider:()=>FooterDivider});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let footerTheme;module.link('./theme.js',{footerTheme(v){footerTheme=v}},7);









const FooterDivider = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.divider, provider.theme?.footer?.divider, props.theme],
    [get(provider.clearTheme, "footer.divider"), props.clearTheme],
    [get(provider.applyTheme, "footer.divider"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.footerDivider);
  return /* @__PURE__ */ jsx("hr", { ref, "data-testid": "footer-divider", className: twMerge(theme.base, className), ...restProps });
});
FooterDivider.displayName = "FooterDivider";


//# sourceMappingURL=FooterDivider.js.map
