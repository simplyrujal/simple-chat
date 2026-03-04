'use client';module.export({Blockquote:()=>Blockquote});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let blockquoteTheme;module.link('./theme.js',{blockquoteTheme(v){blockquoteTheme=v}},7);









const Blockquote = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [blockquoteTheme, provider.theme?.blockquote, props.theme],
    [get(provider.clearTheme, "blockquote"), props.clearTheme],
    [get(provider.applyTheme, "blockquote"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.blockquote);
  return /* @__PURE__ */ jsx(
    "blockquote",
    {
      ref,
      className: twMerge(theme.root.base, className),
      "data-testid": "flowbite-blockquote",
      ...restProps
    }
  );
});
Blockquote.displayName = "Blockquote";


//# sourceMappingURL=Blockquote.js.map
