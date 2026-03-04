'use client';module.export({Checkbox:()=>Checkbox});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let checkboxTheme;module.link('./theme.js',{checkboxTheme(v){checkboxTheme=v}},7);









const Checkbox = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [checkboxTheme, provider.theme?.checkbox, props.theme],
    [get(provider.clearTheme, "checkbox"), props.clearTheme],
    [get(provider.applyTheme, "checkbox"), props.applyTheme]
  );
  const { className, color = "default", indeterminate, ...restProps } = resolveProps(props, provider.props?.checkbox);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type: "checkbox",
      className: twMerge(theme.base, theme.color[color], indeterminate && theme.indeterminate, className),
      ...restProps
    }
  );
});
Checkbox.displayName = "Checkbox";


//# sourceMappingURL=Checkbox.js.map
