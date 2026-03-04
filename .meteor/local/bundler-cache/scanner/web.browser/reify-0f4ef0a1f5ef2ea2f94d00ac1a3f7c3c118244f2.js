'use client';module.export({SidebarItemGroup:()=>SidebarItemGroup});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useSidebarContext;module.link('./SidebarContext.js',{useSidebarContext(v){useSidebarContext=v}},7);let SidebarItemContext;module.link('./SidebarItemContext.js',{SidebarItemContext(v){SidebarItemContext=v}},8);let sidebarTheme;module.link('./theme.js',{sidebarTheme(v){sidebarTheme=v}},9);











const SidebarItemGroup = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useSidebarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.itemGroup, provider.theme?.sidebar?.itemGroup, rootTheme?.itemGroup, props.theme],
    [get(provider.clearTheme, "sidebar.itemGroup"), get(rootClearTheme, "itemGroup"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.itemGroup"), get(rootApplyTheme, "itemGroup"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.sidebarItemGroup);
  return /* @__PURE__ */ jsx(SidebarItemContext.Provider, { value: { isInsideCollapse: false }, children: /* @__PURE__ */ jsx(
    "ul",
    {
      ref,
      "data-testid": "flowbite-sidebar-item-group",
      className: twMerge(theme.base, className),
      ...restProps
    }
  ) });
});
SidebarItemGroup.displayName = "SidebarItemGroup";


//# sourceMappingURL=SidebarItemGroup.js.map
