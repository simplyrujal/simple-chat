'use client';module.export({Alert:()=>Alert});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let XIcon;module.link('../../icons/x-icon.js',{XIcon(v){XIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let alertTheme;module.link('./theme.js',{alertTheme(v){alertTheme=v}},8);










const Alert = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [alertTheme, provider.theme?.alert, props.theme],
    [get(provider.clearTheme, "alert"), props.clearTheme],
    [get(provider.applyTheme, "alert"), props.applyTheme]
  );
  const {
    additionalContent,
    children,
    className,
    color = "info",
    icon: Icon,
    onDismiss,
    rounded = true,
    withBorderAccent,
    ...restProps
  } = resolveProps(props, provider.props?.alert);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: twMerge(
        theme.base,
        theme.color[color],
        rounded && theme.rounded,
        withBorderAccent && theme.borderAccent,
        className
      ),
      role: "alert",
      ...restProps,
      children: [
        /* @__PURE__ */ jsxs("div", { className: theme.wrapper, "data-testid": "flowbite-alert-wrapper", children: [
          Icon && /* @__PURE__ */ jsx(Icon, { className: theme.icon, "data-testid": "flowbite-alert-icon" }),
          /* @__PURE__ */ jsx("div", { children }),
          typeof onDismiss === "function" && /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Dismiss",
              className: twMerge(theme.closeButton.base, theme.closeButton.color[color]),
              onClick: onDismiss,
              type: "button",
              children: /* @__PURE__ */ jsx(XIcon, { "aria-hidden": true, className: theme.closeButton.icon })
            }
          )
        ] }),
        additionalContent && /* @__PURE__ */ jsx("div", { children: additionalContent })
      ]
    }
  );
});
Alert.displayName = "Alert";


//# sourceMappingURL=Alert.js.map
