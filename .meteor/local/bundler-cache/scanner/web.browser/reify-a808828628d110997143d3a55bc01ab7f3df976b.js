'use client';module.export({Radio:()=>Radio});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let radioTheme;module.link('./theme.js',{radioTheme(v){radioTheme=v}},7);









const Radio = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [radioTheme, provider.theme?.radio, props.theme],
    [get(provider.clearTheme, "radio"), props.clearTheme],
    [get(provider.applyTheme, "radio"), props.applyTheme]
  );
  const { color = "default", className, ...restProps } = resolveProps(props, provider.props?.radio);
  return /* @__PURE__ */ jsx("input", { ref, type: "radio", className: twMerge(theme.base, theme.color[color], className), ...restProps });
});
Radio.displayName = "Radio";


//# sourceMappingURL=Radio.js.map
