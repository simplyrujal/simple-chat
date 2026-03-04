'use client';module.export({Select:()=>Select});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let selectTheme;module.link('./theme.js',{selectTheme(v){selectTheme=v}},7);









const Select = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [selectTheme, provider.theme?.select, props.theme],
    [get(provider.clearTheme, "select"), props.clearTheme],
    [get(provider.applyTheme, "select"), props.applyTheme]
  );
  const {
    addon,
    className,
    color = "gray",
    icon: Icon,
    shadow,
    sizing = "md",
    ...restProps
  } = resolveProps(props, provider.props?.select);
  return /* @__PURE__ */ jsxs("div", { className: twMerge(theme.base, className), children: [
    addon && /* @__PURE__ */ jsx("span", { className: theme.addon, children: addon }),
    /* @__PURE__ */ jsxs("div", { className: theme.field.base, children: [
      Icon && /* @__PURE__ */ jsx("div", { className: theme.field.icon.base, children: /* @__PURE__ */ jsx(Icon, { className: theme.field.icon.svg }) }),
      /* @__PURE__ */ jsx(
        "select",
        {
          ref,
          className: twMerge(
            theme.field.select.base,
            theme.field.select.colors[color],
            theme.field.select.sizes[sizing],
            theme.field.select.withIcon[Icon ? "on" : "off"],
            theme.field.select.withAddon[addon ? "on" : "off"],
            theme.field.select.withShadow[shadow ? "on" : "off"]
          ),
          ...restProps
        }
      )
    ] })
  ] });
});
Select.displayName = "Select";


//# sourceMappingURL=Select.js.map
