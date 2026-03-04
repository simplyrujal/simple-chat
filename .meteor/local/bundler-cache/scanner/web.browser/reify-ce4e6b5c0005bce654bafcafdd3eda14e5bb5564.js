'use client';module.export({NavbarLink:()=>NavbarLink});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useNavbarContext;module.link('./NavbarContext.js',{useNavbarContext(v){useNavbarContext=v}},7);let navbarTheme;module.link('./theme.js',{navbarTheme(v){navbarTheme=v}},8);










const NavbarLink = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, setIsOpen } = useNavbarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [navbarTheme.link, provider.theme?.navbar?.link, rootTheme?.link, props.theme],
    [get(provider.clearTheme, "navbar.link"), get(rootClearTheme, "link"), props.clearTheme],
    [get(provider.applyTheme, "navbar.link"), get(rootApplyTheme, "link"), props.applyTheme]
  );
  const {
    active,
    as: Component = "a",
    disabled,
    children,
    className,
    onClick,
    ...restProps
  } = resolveProps(props, provider.props?.navbarLink);
  function handleClick(event) {
    setIsOpen(false);
    onClick?.(event);
  }
  return /* @__PURE__ */ jsx("li", { ref, children: /* @__PURE__ */ jsx(
    Component,
    {
      className: twMerge(
        theme.base,
        active && theme.active.on,
        !active && !disabled && theme.active.off,
        theme.disabled[disabled ? "on" : "off"],
        className
      ),
      onClick: handleClick,
      ...restProps,
      children
    }
  ) });
});
NavbarLink.displayName = "NavbarLink";


//# sourceMappingURL=NavbarLink.js.map
