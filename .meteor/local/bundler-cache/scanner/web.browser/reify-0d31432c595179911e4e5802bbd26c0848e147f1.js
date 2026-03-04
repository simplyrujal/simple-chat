'use client';module.export({NavbarBrand:()=>NavbarBrand});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useNavbarContext;module.link('./NavbarContext.js',{useNavbarContext(v){useNavbarContext=v}},7);let navbarTheme;module.link('./theme.js',{navbarTheme(v){navbarTheme=v}},8);










const NavbarBrand = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useNavbarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [navbarTheme.brand, provider.theme?.navbar?.brand, rootTheme?.brand, props.theme],
    [get(provider.clearTheme, "navbar.brand"), get(rootClearTheme, "brand"), props.clearTheme],
    [get(provider.applyTheme, "navbar.brand"), get(rootApplyTheme, "brand"), props.applyTheme]
  );
  const { as: Component = "a", className, ...restProps } = resolveProps(props, provider.props?.navbarBrand);
  return /* @__PURE__ */ jsx(Component, { ref, className: twMerge(theme.base, className), ...restProps });
});
NavbarBrand.displayName = "NavbarBrand";


//# sourceMappingURL=NavbarBrand.js.map
