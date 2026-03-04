'use client';module.export({HelperText:()=>HelperText});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let helperTextTheme;module.link('./theme.js',{helperTextTheme(v){helperTextTheme=v}},7);









const HelperText = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [helperTextTheme, provider.theme?.helperText, props.theme],
    [get(provider.clearTheme, "helperText"), props.clearTheme],
    [get(provider.applyTheme, "helperText"), props.applyTheme]
  );
  const { className, color = "gray", ...restProps } = resolveProps(props, provider.props?.helperText);
  return /* @__PURE__ */ jsx("p", { ref, className: twMerge(theme.root.base, theme.root.colors[color], className), ...restProps });
});
HelperText.displayName = "HelperText";


//# sourceMappingURL=HelperText.js.map
