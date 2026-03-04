'use client';module.export({SidebarItems:()=>SidebarItems});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useSidebarContext;module.link('./SidebarContext.js',{useSidebarContext(v){useSidebarContext=v}},7);let sidebarTheme;module.link('./theme.js',{sidebarTheme(v){sidebarTheme=v}},8);










const SidebarItems = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useSidebarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.items, provider.theme?.sidebar?.items, rootTheme?.items, props.theme],
    [get(provider.clearTheme, "sidebar.items"), get(rootClearTheme, "items"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.items"), get(rootApplyTheme, "items"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.sidebarItems);
  return /* @__PURE__ */ jsx("div", { ref, className: twMerge(theme.base, className), "data-testid": "flowbite-sidebar-items", ...restProps });
});
SidebarItems.displayName = "SidebarItems";


//# sourceMappingURL=SidebarItems.js.map
