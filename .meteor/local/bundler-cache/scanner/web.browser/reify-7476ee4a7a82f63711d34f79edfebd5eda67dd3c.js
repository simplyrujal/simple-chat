'use client';module.export({RatingStar:()=>RatingStar});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let StarIcon;module.link('../../icons/star-icon.js',{StarIcon(v){StarIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let useRatingContext;module.link('./RatingContext.js',{useRatingContext(v){useRatingContext=v}},8);let ratingTheme;module.link('./theme.js',{ratingTheme(v){ratingTheme=v}},9);











const RatingStar = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, size = "sm" } = useRatingContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [ratingTheme.star, provider.theme?.rating?.star, rootTheme?.star, props.theme],
    [get(provider.clearTheme, "rating.star"), get(rootClearTheme, "star"), props.clearTheme],
    [get(provider.applyTheme, "rating.star"), get(rootApplyTheme, "star"), props.applyTheme]
  );
  const {
    className,
    filled = true,
    starIcon: Icon = StarIcon,
    ...restProps
  } = resolveProps(props, provider.props?.ratingStar);
  return /* @__PURE__ */ jsx(
    Icon,
    {
      ref,
      "data-testid": "flowbite-rating-star",
      className: twMerge(theme.sizes[size], theme[filled ? "filled" : "empty"], className),
      ...restProps
    }
  );
});
RatingStar.displayName = "RatingStar";


//# sourceMappingURL=RatingStar.js.map
