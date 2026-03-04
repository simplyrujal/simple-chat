'use client';module.export({FooterBrand:()=>FooterBrand});let jsx,jsxs;module.link('react/jsx-runtime',{jsx(v){jsx=v},jsxs(v){jsxs=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let footerTheme;module.link('./theme.js',{footerTheme(v){footerTheme=v}},7);









const FooterBrand = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme.brand, provider.theme?.footer?.brand, props.theme],
    [get(provider.clearTheme, "footer.brand"), props.clearTheme],
    [get(provider.applyTheme, "footer.brand"), props.applyTheme]
  );
  const { alt, className, children, href, name, src, ...restProps } = resolveProps(props, provider.props?.footerBrand);
  return /* @__PURE__ */ jsx("div", { ref, children: href ? /* @__PURE__ */ jsxs("a", { "data-testid": "flowbite-footer-brand", href, className: twMerge(theme.base, className), ...restProps, children: [
    /* @__PURE__ */ jsx("img", { alt, src, className: theme.img }),
    /* @__PURE__ */ jsx("span", { "data-testid": "flowbite-footer-brand-span", className: theme.span, children: name }),
    children
  ] }) : /* @__PURE__ */ jsx(
    "img",
    {
      alt,
      "data-testid": "flowbite-footer-brand",
      src,
      className: twMerge(theme.img, className),
      ...restProps
    }
  ) });
});
FooterBrand.displayName = "FooterBrand";


//# sourceMappingURL=FooterBrand.js.map
