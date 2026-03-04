'use client';module.export({HRText:()=>HRText});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let hrTheme;module.link('./theme.js',{hrTheme(v){hrTheme=v}},7);









const HRText = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [hrTheme.text, provider.theme?.hr?.text, props.theme],
    [get(provider.clearTheme, "hr.text"), props.clearTheme],
    [get(provider.applyTheme, "hr.text"), props.applyTheme]
  );
  const { className, text, ...restProps } = resolveProps(props, provider.props?.hrText);
  return /* @__PURE__ */ jsxs("div", { className: theme.base, children: [
    /* @__PURE__ */ jsx(
      "hr",
      {
        ref,
        className: twMerge(theme.hrLine, className),
        "data-testid": "flowbite-hr-text",
        role: "separator",
        ...restProps
      }
    ),
    /* @__PURE__ */ jsx("span", { className: theme.text, children: text })
  ] });
});
HRText.displayName = "HRText";


//# sourceMappingURL=HRText.js.map
