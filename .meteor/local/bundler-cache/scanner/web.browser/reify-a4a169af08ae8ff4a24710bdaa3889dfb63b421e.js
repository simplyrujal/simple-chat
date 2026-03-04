'use client';module.export({ButtonGroup:()=>ButtonGroup});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let ButtonGroupContext;module.link('./ButtonGroupContext.js',{ButtonGroupContext(v){ButtonGroupContext=v}},7);let buttonGroupTheme;module.link('./theme.js',{buttonGroupTheme(v){buttonGroupTheme=v}},8);










const ButtonGroup = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [buttonGroupTheme, provider.theme?.buttonGroup, props.theme],
    [get(provider.clearTheme, "buttonGroup"), props.clearTheme],
    [get(provider.applyTheme, "buttonGroup"), props.applyTheme]
  );
  const { children, className, outline, pill, ...restProps } = resolveProps(props, provider.props?.buttonGroup);
  return /* @__PURE__ */ jsx(ButtonGroupContext.Provider, { value: { outline, pill }, children: /* @__PURE__ */ jsx("div", { ref, className: twMerge(theme.base, className), role: "group", ...restProps, children }) });
});
ButtonGroup.displayName = "ButtonGroup";


//# sourceMappingURL=ButtonGroup.js.map
