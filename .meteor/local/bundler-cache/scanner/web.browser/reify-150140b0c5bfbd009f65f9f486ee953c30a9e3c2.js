'use client';module.export({SidebarCTA:()=>SidebarCTA});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useSidebarContext;module.link('./SidebarContext.js',{useSidebarContext(v){useSidebarContext=v}},7);let sidebarTheme;module.link('./theme.js',{sidebarTheme(v){sidebarTheme=v}},8);










const SidebarCTA = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isCollapsed } = useSidebarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.cta, provider.theme?.sidebar?.cta, rootTheme?.cta, props.theme],
    [get(provider.clearTheme, "sidebar.cta"), get(rootClearTheme, "cta"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.cta"), get(rootApplyTheme, "cta"), props.applyTheme]
  );
  const { color = "info", className, ...restProps } = resolveProps(props, provider.props?.sidebarCTA);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-testid": "sidebar-cta",
      hidden: isCollapsed,
      className: twMerge(theme.base, theme.color[color], className),
      ...restProps
    }
  );
});
SidebarCTA.displayName = "SidebarCTA";


//# sourceMappingURL=SidebarCTA.js.map
