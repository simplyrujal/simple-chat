'use client';module.export({FooterLink:()=>FooterLink});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let footerTheme;module.link('./theme.js',{footerTheme(v){footerTheme=v}},7);









const FooterLink = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.groupLink.link, provider.theme?.footer?.groupLink?.link, props.theme],
    [get(provider.clearTheme, "footer.groupLink.link"), props.clearTheme],
    [get(provider.applyTheme, "footer.groupLink.link"), props.applyTheme]
  );
  const { as: Component = "a", className, href, ...restProps } = resolveProps(props, provider.props?.footerLink);
  return /* @__PURE__ */ jsx("li", { ref, className: twMerge(theme.base, className), children: /* @__PURE__ */ jsx(Component, { href, className: theme.href, ...restProps }) });
});
FooterLink.displayName = "FooterLink";


//# sourceMappingURL=FooterLink.js.map
