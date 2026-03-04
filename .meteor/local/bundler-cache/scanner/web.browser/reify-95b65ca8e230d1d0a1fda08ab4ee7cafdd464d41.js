'use client';module.export({Footer:()=>Footer});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let footerTheme;module.link('./theme.js',{footerTheme(v){footerTheme=v}},7);









const Footer = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [footerTheme, provider.theme?.footer, props.theme],
    [get(provider.clearTheme, "footer"), props.clearTheme],
    [get(provider.applyTheme, "footer"), props.applyTheme]
  );
  const {
    bgDark = false,
    children,
    className,
    container = false,
    ...restProps
  } = resolveProps(props, provider.props?.footer);
  return /* @__PURE__ */ jsx(
    "footer",
    {
      ref,
      "data-testid": "flowbite-footer",
      className: twMerge(theme.root.base, bgDark && theme.root.bgDark, container && theme.root.container, className),
      ...restProps,
      children
    }
  );
});
Footer.displayName = "Footer";


//# sourceMappingURL=Footer.js.map
