'use client';module.export({Tooltip:()=>Tooltip});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let get;module.link('../../helpers/get.js',{get(v){get=v}},1);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},2);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},3);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},4);let Floating;module.link('../Floating/Floating.js',{Floating(v){Floating=v}},5);let tooltipTheme;module.link('./theme.js',{tooltipTheme(v){tooltipTheme=v}},6);








function Tooltip(props) {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tooltipTheme, provider.theme?.tooltip, props.theme],
    [get(provider.clearTheme, "tooltip"), props.clearTheme],
    [get(provider.applyTheme, "tooltip"), props.applyTheme]
  );
  const {
    animation = "duration-300",
    arrow = true,
    children,
    className,
    content,
    placement = "top",
    style = "dark",
    trigger = "hover",
    ...restProps
  } = resolveProps(props, provider.props?.tooltip);
  return /* @__PURE__ */ jsx(
    Floating,
    {
      animation,
      arrow,
      content,
      placement,
      style,
      theme,
      trigger,
      className,
      ...restProps,
      children
    }
  );
}
Tooltip.displayName = "Tooltip";


//# sourceMappingURL=Tooltip.js.map
