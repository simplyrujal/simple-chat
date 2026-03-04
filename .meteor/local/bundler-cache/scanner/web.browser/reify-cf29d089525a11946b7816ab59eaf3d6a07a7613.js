'use client';module.export({AvatarGroupCounter:()=>AvatarGroupCounter});let jsxs;module.link('react/jsx-runtime',{jsxs(v){jsxs=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let avatarTheme;module.link('./theme.js',{avatarTheme(v){avatarTheme=v}},7);









const AvatarGroupCounter = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [avatarTheme.groupCounter, provider.theme?.avatar?.groupCounter, props.theme],
    [get(provider.clearTheme, "avatar.groupCounter"), props.clearTheme],
    [get(provider.applyTheme, "avatar.groupCounter"), props.applyTheme]
  );
  const { className, href, total, ...restProps } = resolveProps(props, provider.props?.avatarGroupCounter);
  return /* @__PURE__ */ jsxs("a", { ref, href, className: twMerge(theme.base, className), ...restProps, children: [
    "+",
    total
  ] });
});
AvatarGroupCounter.displayName = "AvatarGroupCounter";


//# sourceMappingURL=AvatarGroupCounter.js.map
