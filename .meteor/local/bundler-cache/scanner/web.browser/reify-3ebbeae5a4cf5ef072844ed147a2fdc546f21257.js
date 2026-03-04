'use client';module.export({FooterIcon:()=>FooterIcon});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let footerTheme;module.link('./theme.js',{footerTheme(v){footerTheme=v}},7);









const FooterIcon = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.icon, provider.theme?.footer?.icon, props.theme],
    [get(provider.clearTheme, "footer.icon"), props.clearTheme],
    [get(provider.applyTheme, "footer.icon"), props.applyTheme]
  );
  const { ariaLabel, className, href, icon: Icon, ...restProps } = resolveProps(props, provider.props?.footerIcon);
  return /* @__PURE__ */ jsx("div", { ref, children: href ? /* @__PURE__ */ jsx(
    "a",
    {
      "aria-label": ariaLabel,
      "data-testid": "flowbite-footer-icon",
      href,
      className: twMerge(theme.base, className),
      ...restProps,
      children: /* @__PURE__ */ jsx(Icon, { className: theme.size })
    }
  ) : /* @__PURE__ */ jsx(Icon, { "data-testid": "flowbite-footer-icon", className: theme.size, ...restProps }) });
});
FooterIcon.displayName = "FooterIcon";


//# sourceMappingURL=FooterIcon.js.map
