'use client';module.export({FloatingLabel:()=>FloatingLabel});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef,useId;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let floatingLabelTheme;module.link('./theme.js',{floatingLabelTheme(v){floatingLabelTheme=v}},7);









const FloatingLabel = forwardRef((props, ref) => {
  const randomId = useId();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [floatingLabelTheme, provider.theme?.floatingLabel, props.theme],
    [get(provider.clearTheme, "floatingLabel"), props.clearTheme],
    [get(provider.applyTheme, "floatingLabel"), props.applyTheme]
  );
  const {
    label,
    color = "default",
    sizing = "md",
    variant,
    disabled = false,
    className,
    ...restProps
  } = resolveProps(props, provider.props?.floatingLabel);
  return /* @__PURE__ */ jsxs("div", { className: twMerge("relative", variant === "standard" ? "z-0" : ""), children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        id: "floatingLabel" + randomId,
        "aria-describedby": "outlined_success_help",
        className: twMerge(theme.input[color][variant][sizing], className),
        placeholder: " ",
        "data-testid": "floating-label",
        disabled,
        ...restProps,
        ref
      }
    ),
    /* @__PURE__ */ jsx("label", { htmlFor: "floatingLabel" + randomId, className: twMerge(theme.label[color][variant][sizing], className), children: label })
  ] });
});
FloatingLabel.displayName = "FloatingLabel";


//# sourceMappingURL=FloatingLabel.js.map
