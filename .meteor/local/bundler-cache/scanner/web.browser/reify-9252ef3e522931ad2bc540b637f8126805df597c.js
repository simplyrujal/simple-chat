'use client';module.export({List:()=>List});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let listTheme;module.link('./theme.js',{listTheme(v){listTheme=v}},7);









const List = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [listTheme.root, provider.theme?.list?.root, props.theme],
    [get(provider.clearTheme, "list.root"), props.clearTheme],
    [get(provider.applyTheme, "list.root"), props.applyTheme]
  );
  const { className, horizontal, nested, ordered, unstyled, ...restProps } = resolveProps(props, provider.props?.list);
  const Component = ordered ? "ol" : "ul";
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref,
      className: twMerge(
        theme.base,
        theme.ordered[ordered ? "on" : "off"],
        unstyled && theme.unstyled,
        nested && theme.nested,
        horizontal && theme.horizontal,
        className
      ),
      ...restProps
    }
  );
});
List.displayName = "List";


//# sourceMappingURL=List.js.map
