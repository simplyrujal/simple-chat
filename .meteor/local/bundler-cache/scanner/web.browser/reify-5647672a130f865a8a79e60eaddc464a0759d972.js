'use client';module.export({HRIcon:()=>HRIcon});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let QuoteRightIcon;module.link('../../icons/quote-right-icon.js',{QuoteRightIcon(v){QuoteRightIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let hrTheme;module.link('./theme.js',{hrTheme(v){hrTheme=v}},8);










const HRIcon = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.icon, provider.theme?.hr?.icon, props.theme],
    [get(provider.clearTheme, "hr.icon"), props.clearTheme],
    [get(provider.applyTheme, "hr.icon"), props.applyTheme]
  );
  const { icon: Icon = QuoteRightIcon, className, ...restProps } = resolveProps(props, provider.props?.hrIcon);
  return /* @__PURE__ */ jsxs("div", { className: theme.base, children: [
    /* @__PURE__ */ jsx(
      "hr",
      {
        ref,
        className: twMerge(theme.hrLine, className),
        "data-testid": "flowbite-hr-icon",
        role: "separator",
        ...restProps
      }
    ),
    /* @__PURE__ */ jsx("div", { className: theme.icon.base, children: /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, className: theme.icon.icon }) })
  ] });
});
HRIcon.displayName = "HRIcon";


//# sourceMappingURL=HRIcon.js.map
