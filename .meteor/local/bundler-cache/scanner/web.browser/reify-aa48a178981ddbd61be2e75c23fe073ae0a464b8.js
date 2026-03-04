'use client';module.export({SidebarLogo:()=>SidebarLogo});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef,useId;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useSidebarContext;module.link('./SidebarContext.js',{useSidebarContext(v){useSidebarContext=v}},7);let sidebarTheme;module.link('./theme.js',{sidebarTheme(v){sidebarTheme=v}},8);










const SidebarLogo = forwardRef((props, ref) => {
  const id = useId();
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isCollapsed } = useSidebarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.logo, provider.theme?.sidebar?.logo, rootTheme?.logo, props.theme],
    [get(provider.clearTheme, "sidebar.logo"), get(rootClearTheme, "logo"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.logo"), get(rootApplyTheme, "logo"), props.applyTheme]
  );
  const {
    children,
    className,
    href,
    img,
    imgAlt = "",
    ...restProps
  } = resolveProps(props, provider.props?.sidebarLogo);
  return /* @__PURE__ */ jsxs(
    "a",
    {
      ref,
      "aria-labelledby": `flowbite-sidebar-logo-${id}`,
      href,
      className: twMerge(theme.base, className),
      ...restProps,
      children: [
        /* @__PURE__ */ jsx("img", { alt: imgAlt, src: img, className: theme.img }),
        /* @__PURE__ */ jsx("span", { className: theme.collapsed[isCollapsed ? "on" : "off"], id: `flowbite-sidebar-logo-${id}`, children })
      ]
    }
  );
});
SidebarLogo.displayName = "SidebarLogo";


//# sourceMappingURL=SidebarLogo.js.map
