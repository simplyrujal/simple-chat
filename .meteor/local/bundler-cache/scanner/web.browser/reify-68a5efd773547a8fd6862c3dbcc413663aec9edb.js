'use client';module.export({Navbar:()=>Navbar});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef,useState;module.link('react',{forwardRef(v){forwardRef=v},useState(v){useState=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let NavbarContext;module.link('./NavbarContext.js',{NavbarContext(v){NavbarContext=v}},7);let navbarTheme;module.link('./theme.js',{navbarTheme(v){navbarTheme=v}},8);










const Navbar = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [navbarTheme, provider.theme?.navbar, props.theme],
    [get(provider.clearTheme, "navbar"), props.clearTheme],
    [get(provider.applyTheme, "navbar"), props.applyTheme]
  );
  const {
    border,
    children,
    className,
    fluid = false,
    menuOpen,
    rounded,
    ...restProps
  } = resolveProps(props, provider.props?.navbar);
  const [isOpen, setIsOpen] = useState(menuOpen);
  return /* @__PURE__ */ jsx(
    NavbarContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, isOpen, setIsOpen },
      children: /* @__PURE__ */ jsx(
        "nav",
        {
          ref,
          className: twMerge(
            theme.root.base,
            theme.root.bordered[border ? "on" : "off"],
            theme.root.rounded[rounded ? "on" : "off"],
            className
          ),
          ...restProps,
          children: /* @__PURE__ */ jsx("div", { className: twMerge(theme.root.inner.base, theme.root.inner.fluid[fluid ? "on" : "off"]), children })
        }
      )
    }
  );
});
Navbar.displayName = "Navbar";


//# sourceMappingURL=Navbar.js.map
