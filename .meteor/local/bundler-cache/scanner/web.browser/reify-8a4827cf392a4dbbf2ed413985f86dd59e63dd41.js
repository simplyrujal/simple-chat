'use client';module.export({ToggleSwitch:()=>ToggleSwitch});let jsxs,Fragment,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},Fragment(v){Fragment=v},jsx(v){jsx=v}},0);let forwardRef,useId;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let toggleSwitchTheme;module.link('./theme.js',{toggleSwitchTheme(v){toggleSwitchTheme=v}},7);









const ToggleSwitch = forwardRef((props, ref) => {
  const id = useId();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [toggleSwitchTheme, provider.theme?.toggleSwitch, props.theme],
    [get(provider.clearTheme, "toggleSwitch"), props.clearTheme],
    [get(provider.applyTheme, "toggleSwitch"), props.applyTheme]
  );
  const {
    checked,
    className,
    color = "default",
    sizing = "md",
    disabled,
    label,
    name,
    onChange,
    ...restProps
  } = resolveProps(props, provider.props?.toggleSwitch);
  function handleClick() {
    onChange(!checked);
  }
  function handleOnKeyDown(event) {
    if (event.code == "Enter") {
      event.preventDefault();
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("input", { ref, checked, name, type: "checkbox", className: theme.root.input, readOnly: true, hidden: true }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        "aria-checked": checked,
        "aria-labelledby": `${id}-flowbite-toggleswitch-label`,
        disabled,
        id: `${id}-flowbite-toggleswitch`,
        onClick: handleClick,
        onKeyDown: handleOnKeyDown,
        role: "switch",
        tabIndex: 0,
        type: "button",
        className: twMerge(theme.root.base, theme.root.active[disabled ? "off" : "on"], className),
        ...restProps,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-testid": "flowbite-toggleswitch-toggle",
              className: twMerge(
                theme.toggle.base,
                theme.toggle.checked.color[color],
                theme.toggle.checked[checked ? "on" : "off"],
                theme.toggle.sizes[sizing]
              )
            }
          ),
          !!label?.length && /* @__PURE__ */ jsx(
            "span",
            {
              "data-testid": "flowbite-toggleswitch-label",
              id: `${id}-flowbite-toggleswitch-label`,
              className: theme.root.label,
              children: label
            }
          )
        ]
      }
    )
  ] });
});
ToggleSwitch.displayName = "ToggleSwitch";


//# sourceMappingURL=ToggleSwitch.js.map
