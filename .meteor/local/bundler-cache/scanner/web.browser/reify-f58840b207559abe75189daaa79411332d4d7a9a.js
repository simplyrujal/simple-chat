'use client';module.export({DrawerItems:()=>DrawerItems});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useDrawerContext;module.link('./DrawerContext.js',{useDrawerContext(v){useDrawerContext=v}},7);let drawerTheme;module.link('./theme.js',{drawerTheme(v){drawerTheme=v}},8);










const DrawerItems = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useDrawerContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [drawerTheme.items, provider.theme?.drawer?.items, rootTheme?.items, props.theme],
    [get(provider.clearTheme, "drawer.items"), get(rootClearTheme, "items"), props.clearTheme],
    [get(provider.applyTheme, "drawer.items"), get(rootApplyTheme, "items"), props.applyTheme]
  );
  const { children, className, ...restProps } = resolveProps(props, provider.props?.drawerItems);
  return /* @__PURE__ */ jsx("div", { ref, "data-testid": "flowbite-drawer-items", className: twMerge(theme.base, className), ...restProps, children });
});
DrawerItems.displayName = "DrawerItems";


//# sourceMappingURL=DrawerItems.js.map
