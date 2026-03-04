'use client';module.export({NavbarToggle:()=>NavbarToggle});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let BarsIcon;module.link('../../icons/bars-icon.js',{BarsIcon(v){BarsIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let useNavbarContext;module.link('./NavbarContext.js',{useNavbarContext(v){useNavbarContext=v}},8);let navbarTheme;module.link('./theme.js',{navbarTheme(v){navbarTheme=v}},9);











const NavbarToggle = forwardRef((props, ref) => {
  const {
    theme: rootTheme,
    clearTheme: rootClearTheme,
    applyTheme: rootApplyTheme,
    isOpen,
    setIsOpen
  } = useNavbarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [navbarTheme.toggle, provider.theme?.navbar?.toggle, rootTheme?.toggle, props.theme],
    [get(provider.clearTheme, "navbar.toggle"), get(rootClearTheme, "toggle"), props.clearTheme],
    [get(provider.applyTheme, "navbar.toggle"), get(rootApplyTheme, "toggle"), props.applyTheme]
  );
  const { barIcon: BarIcon = BarsIcon, className, ...restProps } = resolveProps(props, provider.props?.navbarToggle);
  function handleClick() {
    setIsOpen(!isOpen);
  }
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      "data-testid": "flowbite-navbar-toggle",
      onClick: handleClick,
      className: twMerge(theme.base, className),
      ...restProps,
      children: [
        /* @__PURE__ */ jsx("span", { className: theme.title, children: "Open main menu" }),
        /* @__PURE__ */ jsx(BarIcon, { "aria-hidden": true, className: theme.icon })
      ]
    }
  );
});
NavbarToggle.displayName = "NavbarToggle";


//# sourceMappingURL=NavbarToggle.js.map
