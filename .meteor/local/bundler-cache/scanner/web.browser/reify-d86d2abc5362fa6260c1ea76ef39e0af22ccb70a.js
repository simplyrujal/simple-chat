'use client';module.export({Badge:()=>Badge});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let badgeTheme;module.link('./theme.js',{badgeTheme(v){badgeTheme=v}},7);









const Badge = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [badgeTheme, provider.theme?.badge, props.theme],
    [get(provider.clearTheme, "badge"), props.clearTheme],
    [get(provider.applyTheme, "badge"), props.applyTheme]
  );
  const {
    children,
    color = "info",
    icon: Icon,
    size = "xs",
    className,
    ...restProps
  } = resolveProps(props, provider.props?.badge);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      className: twMerge(
        theme.root.base,
        theme.root.color[color],
        theme.root.size[size],
        theme.icon[Icon ? "on" : "off"],
        className
      ),
      "data-testid": "flowbite-badge",
      ...restProps,
      children: [
        Icon && /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, className: theme.icon.size[size], "data-testid": "flowbite-badge-icon" }),
        children && /* @__PURE__ */ jsx("span", { children })
      ]
    }
  );
});
Badge.displayName = "Badge";


//# sourceMappingURL=Badge.js.map
