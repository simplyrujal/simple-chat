'use client';module.export({HR:()=>HR});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let hrTheme;module.link('./theme.js',{hrTheme(v){hrTheme=v}},7);









const HR = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.root, provider.theme?.hr?.root, props.theme],
    [get(provider.clearTheme, "hr.root"), props.clearTheme],
    [get(provider.applyTheme, "hr.root"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.hr);
  return /* @__PURE__ */ jsx(
    "hr",
    {
      ref,
      className: twMerge(theme.base, className),
      "data-testid": "flowbite-hr",
      role: "separator",
      ...restProps
    }
  );
});
HR.displayName = "HR";


//# sourceMappingURL=HR.js.map
