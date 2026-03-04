'use client';module.export({FooterCopyright:()=>FooterCopyright});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let footerTheme;module.link('./theme.js',{footerTheme(v){footerTheme=v}},7);









const FooterCopyright = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.copyright, provider.theme?.footer?.copyright, props.theme],
    [get(provider.clearTheme, "footer.copyright"), props.clearTheme],
    [get(provider.applyTheme, "footer.copyright"), props.applyTheme]
  );
  const { by, className, href, year, ...restProps } = resolveProps(props, provider.props?.footerCopyright);
  return /* @__PURE__ */ jsxs("div", { ref, "data-testid": "flowbite-footer-copyright", className: twMerge(theme.base, className), ...restProps, children: [
    "\xA9 ",
    year,
    href ? /* @__PURE__ */ jsx("a", { href, className: theme.href, children: by }) : /* @__PURE__ */ jsx("span", { "data-testid": "flowbite-footer-copyright-span", className: theme.span, children: by })
  ] });
});
FooterCopyright.displayName = "FooterCopyright";


//# sourceMappingURL=FooterCopyright.js.map
