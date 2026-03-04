'use client';module.export({Sidebar:()=>Sidebar});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let SidebarContext;module.link('./SidebarContext.js',{SidebarContext(v){SidebarContext=v}},7);let sidebarTheme;module.link('./theme.js',{sidebarTheme(v){sidebarTheme=v}},8);










const Sidebar = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme, provider.theme?.sidebar, props.theme],
    [get(provider.clearTheme, "sidebar"), props.clearTheme],
    [get(provider.applyTheme, "sidebar"), props.applyTheme]
  );
  const {
    as: Component = "nav",
    children,
    className,
    collapseBehavior = "collapse",
    collapsed: isCollapsed = false,
    ...restProps
  } = resolveProps(props, provider.props?.sidebar);
  return /* @__PURE__ */ jsx(
    SidebarContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, isCollapsed },
      children: /* @__PURE__ */ jsx(
        Component,
        {
          ref,
          "aria-label": "Sidebar",
          hidden: isCollapsed && collapseBehavior === "hide",
          className: twMerge(theme.root.base, theme.root.collapsed[isCollapsed ? "on" : "off"], className),
          ...restProps,
          children: /* @__PURE__ */ jsx("div", { className: theme.root.inner, children })
        }
      )
    }
  );
});
Sidebar.displayName = "Sidebar";


//# sourceMappingURL=Sidebar.js.map
