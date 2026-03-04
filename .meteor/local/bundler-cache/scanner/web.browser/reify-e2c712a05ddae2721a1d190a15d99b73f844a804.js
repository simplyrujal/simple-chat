'use client';module.export({RangeSlider:()=>RangeSlider});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let rangeSliderTheme;module.link('./theme.js',{rangeSliderTheme(v){rangeSliderTheme=v}},7);









const RangeSlider = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [rangeSliderTheme, provider.theme?.rangeSlider, props.theme],
    [get(provider.clearTheme, "rangeSlider"), props.clearTheme],
    [get(provider.applyTheme, "rangeSlider"), props.applyTheme]
  );
  const { className, sizing = "md", ...restProps } = resolveProps(props, provider.props?.rangeSlider);
  return /* @__PURE__ */ jsx("div", { "data-testid": "flowbite-range-slider", className: twMerge(theme.root.base, className), children: /* @__PURE__ */ jsx("div", { className: theme.field.base, children: /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type: "range",
      className: twMerge(theme.field.input.base, theme.field.input.sizes[sizing]),
      ...restProps
    }
  ) }) });
});
RangeSlider.displayName = "RangeSlider";


//# sourceMappingURL=RangeSlider.js.map
