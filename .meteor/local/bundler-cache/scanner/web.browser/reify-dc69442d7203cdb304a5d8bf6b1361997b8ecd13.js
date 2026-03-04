'use client';module.export({Rating:()=>Rating});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let RatingContext;module.link('./RatingContext.js',{RatingContext(v){RatingContext=v}},7);let ratingTheme;module.link('./theme.js',{ratingTheme(v){ratingTheme=v}},8);










const Rating = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [ratingTheme, provider.theme?.rating, props.theme],
    [get(provider.clearTheme, "rating"), props.clearTheme],
    [get(provider.applyTheme, "rating"), props.applyTheme]
  );
  const { className, size = "sm", ...restProps } = resolveProps(props, provider.props?.rating);
  return /* @__PURE__ */ jsx(
    RatingContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, size },
      children: /* @__PURE__ */ jsx("div", { ref, className: twMerge(theme.root.base, className), ...restProps })
    }
  );
});
Rating.displayName = "Rating";


//# sourceMappingURL=Rating.js.map
