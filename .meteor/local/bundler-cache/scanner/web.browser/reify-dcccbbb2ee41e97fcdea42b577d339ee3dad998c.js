'use client';module.export({HRTrimmed:()=>HRTrimmed});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let hrTheme;module.link('./theme.js',{hrTheme(v){hrTheme=v}},7);









const HRTrimmed = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.trimmed, provider.theme?.hr?.trimmed, props.theme],
    [get(provider.clearTheme, "hr.trimmed"), props.clearTheme],
    [get(provider.applyTheme, "hr.trimmed"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.hrTrimmed);
  return /* @__PURE__ */ jsx(
    "hr",
    {
      ref,
      className: twMerge(theme.base, className),
      "data-testid": "flowbite-hr-trimmed",
      role: "separator",
      ...restProps
    }
  );
});
HRTrimmed.displayName = "HRTrimmed";


//# sourceMappingURL=HRTrimmed.js.map
