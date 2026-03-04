'use client';module.export({ListGroup:()=>ListGroup});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let listGroupTheme;module.link('./theme.js',{listGroupTheme(v){listGroupTheme=v}},7);









const ListGroup = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [listGroupTheme.root, provider.theme?.listGroup?.root, props.theme],
    [get(provider.clearTheme, "listGroup.root"), props.clearTheme],
    [get(provider.applyTheme, "listGroup.root"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.listGroup);
  return /* @__PURE__ */ jsx("ul", { ref, className: twMerge(theme.base, className), ...restProps });
});
ListGroup.displayName = "ListGroup";


//# sourceMappingURL=ListGroup.js.map
