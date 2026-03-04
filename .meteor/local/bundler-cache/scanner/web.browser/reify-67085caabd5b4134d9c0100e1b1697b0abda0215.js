'use client';module.export({MegaMenu:()=>MegaMenu});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},5);let Navbar;module.link('../Navbar/Navbar.js',{Navbar(v){Navbar=v}},6);module.link('../Navbar/NavbarBrand.js');module.link('../Navbar/NavbarCollapse.js');module.link('../Navbar/NavbarContext.js');module.link('../Navbar/NavbarLink.js');module.link('../Navbar/NavbarToggle.js');let megaMenuTheme;module.link('./theme.js',{megaMenuTheme(v){megaMenuTheme=v}},7);














const MegaMenu = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [megaMenuTheme, provider.theme?.megaMenu, props.theme],
    [get(provider.clearTheme, "megaMenu"), props.clearTheme],
    [get(provider.applyTheme, "megaMenu"), props.applyTheme]
  );
  const mergedProps = resolveProps(props, provider.props?.megaMenu);
  return /* @__PURE__ */ jsx(Navbar, { ref, theme, fluid: true, ...mergedProps });
});
MegaMenu.displayName = "MegaMenu";


//# sourceMappingURL=MegaMenu.js.map
