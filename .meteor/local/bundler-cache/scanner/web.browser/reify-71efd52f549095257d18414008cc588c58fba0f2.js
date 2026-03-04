'use client';module.export({TextInput:()=>TextInput});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let textInputTheme;module.link('./theme.js',{textInputTheme(v){textInputTheme=v}},7);









const TextInput = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [textInputTheme, provider.theme?.textInput, props.theme],
    [get(provider.clearTheme, "textInput"), props.clearTheme],
    [get(provider.applyTheme, "textInput"), props.applyTheme]
  );
  const {
    addon,
    className,
    color = "gray",
    icon: Icon,
    rightIcon: RightIcon,
    shadow,
    sizing = "md",
    type = "text",
    ...restProps
  } = resolveProps(props, provider.props?.textInput);
  return /* @__PURE__ */ jsxs("div", { className: twMerge(theme.base, className), children: [
    addon && /* @__PURE__ */ jsx("span", { className: theme.addon, children: addon }),
    /* @__PURE__ */ jsxs("div", { className: theme.field.base, children: [
      Icon && /* @__PURE__ */ jsx("div", { className: theme.field.icon.base, children: /* @__PURE__ */ jsx(Icon, { className: theme.field.icon.svg }) }),
      RightIcon && /* @__PURE__ */ jsx("div", { "data-testid": "right-icon", className: theme.field.rightIcon.base, children: /* @__PURE__ */ jsx(RightIcon, { className: theme.field.rightIcon.svg }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: twMerge(
            theme.field.input.base,
            theme.field.input.colors[color],
            theme.field.input.sizes[sizing],
            theme.field.input.withIcon[Icon ? "on" : "off"],
            theme.field.input.withRightIcon[RightIcon ? "on" : "off"],
            theme.field.input.withAddon[addon ? "on" : "off"],
            theme.field.input.withShadow[shadow ? "on" : "off"]
          ),
          type,
          ...restProps,
          ref
        }
      )
    ] })
  ] });
});
TextInput.displayName = "TextInput";


//# sourceMappingURL=TextInput.js.map
