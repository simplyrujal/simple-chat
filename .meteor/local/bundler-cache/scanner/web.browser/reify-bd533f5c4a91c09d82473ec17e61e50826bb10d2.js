'use client';module.export({Label:()=>Label});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let labelTheme;module.link('./theme.js',{labelTheme(v){labelTheme=v}},7);









const Label = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [labelTheme, provider.theme?.label, props.theme],
    [get(provider.clearTheme, "label"), props.clearTheme],
    [get(provider.applyTheme, "label"), props.applyTheme]
  );
  const { className, color = "default", disabled = false, ...restProps } = resolveProps(props, provider.props?.label);
  return /* @__PURE__ */ jsx(
    "label",
    {
      ref,
      className: twMerge(theme.root.base, theme.root.colors[color], disabled && theme.root.disabled, className),
      "data-testid": "flowbite-label",
      ...restProps
    }
  );
});
Label.displayName = "Label";


//# sourceMappingURL=Label.js.map
