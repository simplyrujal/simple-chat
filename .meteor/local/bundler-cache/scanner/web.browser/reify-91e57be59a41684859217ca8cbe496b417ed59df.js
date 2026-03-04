'use client';module.export({ListItem:()=>ListItem});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let listTheme;module.link('./theme.js',{listTheme(v){listTheme=v}},7);









const ListItem = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [listTheme.item, provider.theme?.list?.item, props.theme],
    [get(provider.clearTheme, "list.item"), props.clearTheme],
    [get(provider.applyTheme, "list.item"), props.applyTheme]
  );
  const { children, className, icon: Icon, ...restProps } = resolveProps(props, provider.props?.listItem);
  return /* @__PURE__ */ jsxs("li", { ref, className: twMerge(theme.withIcon[Icon ? "on" : "off"], className), ...restProps, children: [
    Icon && /* @__PURE__ */ jsx(Icon, { className: twMerge(theme.icon) }),
    children
  ] });
});
ListItem.displayName = "ListItem";


//# sourceMappingURL=ListItem.js.map
