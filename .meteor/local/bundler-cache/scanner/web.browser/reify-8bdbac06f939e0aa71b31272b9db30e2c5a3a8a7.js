'use client';module.export({NavbarCollapse:()=>NavbarCollapse});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useNavbarContext;module.link('./NavbarContext.js',{useNavbarContext(v){useNavbarContext=v}},7);let navbarTheme;module.link('./theme.js',{navbarTheme(v){navbarTheme=v}},8);










const NavbarCollapse = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isOpen } = useNavbarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [navbarTheme.collapse, provider.theme?.navbar?.collapse, rootTheme?.collapse, props.theme],
    [get(provider.clearTheme, "navbar.collapse"), get(rootClearTheme, "collapse"), props.clearTheme],
    [get(provider.applyTheme, "navbar.collapse"), get(rootApplyTheme, "collapse"), props.applyTheme]
  );
  const { children, className, ...restProps } = resolveProps(props, provider.props?.navbarCollapse);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-testid": "flowbite-navbar-collapse",
      className: twMerge(theme.base, theme.hidden[!isOpen ? "on" : "off"], className),
      ...restProps,
      children: /* @__PURE__ */ jsx("ul", { className: theme.list, children })
    }
  );
});
NavbarCollapse.displayName = "NavbarCollapse";


//# sourceMappingURL=NavbarCollapse.js.map
