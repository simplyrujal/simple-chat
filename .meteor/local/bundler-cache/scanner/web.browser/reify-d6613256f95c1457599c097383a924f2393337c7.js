'use client';module.export({DropdownDivider:()=>DropdownDivider});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useDropdownContext;module.link('./DropdownContext.js',{useDropdownContext(v){useDropdownContext=v}},7);let dropdownTheme;module.link('./theme.js',{dropdownTheme(v){dropdownTheme=v}},8);










const DropdownDivider = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useDropdownContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [dropdownTheme.floating, provider.theme?.dropdown?.floating, rootTheme?.floating, props.theme],
    [get(provider.clearTheme, "dropdown.floating"), get(rootClearTheme, "floating"), props.clearTheme],
    [get(provider.applyTheme, "dropdown.floating"), get(rootApplyTheme, "floating"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.dropdownDivider);
  return /* @__PURE__ */ jsx("div", { ref, className: twMerge(theme.divider, className), ...restProps });
});
DropdownDivider.displayName = "DropdownDivider";


//# sourceMappingURL=DropdownDivider.js.map
