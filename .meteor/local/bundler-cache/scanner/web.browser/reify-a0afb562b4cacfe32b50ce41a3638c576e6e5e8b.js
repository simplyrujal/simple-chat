'use client';module.export({RatingAdvanced:()=>RatingAdvanced});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let ratingAdvancedTheme;module.link('./theme.js',{ratingAdvancedTheme(v){ratingAdvancedTheme=v}},7);









const RatingAdvanced = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [ratingAdvancedTheme, provider.theme?.ratingAdvanced, props.theme],
    [get(provider.clearTheme, "ratingAdvanced"), props.clearTheme],
    [get(provider.applyTheme, "ratingAdvanced"), props.applyTheme]
  );
  const { children, className, percentFilled = 0, ...restProps } = resolveProps(props, provider.props?.ratingAdvanced);
  return /* @__PURE__ */ jsxs("div", { ref, className: twMerge(theme.base, className), ...restProps, children: [
    /* @__PURE__ */ jsx("span", { className: theme.label, children }),
    /* @__PURE__ */ jsx("div", { className: theme.progress.base, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: theme.progress.fill,
        "data-testid": "flowbite-rating-fill",
        style: { width: `${percentFilled}%` }
      }
    ) }),
    /* @__PURE__ */ jsx("span", { className: theme.progress.label, children: `${percentFilled}%` })
  ] });
});
RatingAdvanced.displayName = "RatingAdvanced";


//# sourceMappingURL=RatingAdvanced.js.map
