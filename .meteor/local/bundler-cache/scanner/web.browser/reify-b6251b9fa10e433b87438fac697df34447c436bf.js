'use client';module.export({AvatarGroup:()=>AvatarGroup});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let avatarTheme;module.link('./theme.js',{avatarTheme(v){avatarTheme=v}},7);









const AvatarGroup = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [avatarTheme.group, provider.theme?.avatar?.group, props.theme],
    [get(provider.clearTheme, "avatar"), props.clearTheme],
    [get(provider.applyTheme, "avatar"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.avatarGroup);
  return /* @__PURE__ */ jsx("div", { ref, "data-testid": "avatar-group-element", className: twMerge(theme.base, className), ...restProps });
});
AvatarGroup.displayName = "AvatarGroup";


//# sourceMappingURL=AvatarGroup.js.map
