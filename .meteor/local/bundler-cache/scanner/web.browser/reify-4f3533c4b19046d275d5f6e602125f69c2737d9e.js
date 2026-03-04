'use client';module.export({FooterLinkGroup:()=>FooterLinkGroup});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let footerTheme;module.link('./theme.js',{footerTheme(v){footerTheme=v}},7);









const FooterLinkGroup = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.groupLink, provider.theme?.footer?.groupLink, props.theme],
    [get(provider.clearTheme, "footer.groupLink"), props.clearTheme],
    [get(provider.applyTheme, "footer.groupLink"), props.applyTheme]
  );
  const { className, col = false, ...restProps } = resolveProps(props, provider.props?.footerLinkGroup);
  return /* @__PURE__ */ jsx(
    "ul",
    {
      ref,
      "data-testid": "footer-groupLink",
      className: twMerge(theme.base, col && theme.col, className),
      ...restProps
    }
  );
});
FooterLinkGroup.displayName = "FooterLinkGroup";


//# sourceMappingURL=FooterLinkGroup.js.map
