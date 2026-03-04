'use client';module.export({DarkThemeToggle:()=>DarkThemeToggle});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeMode;module.link('../../hooks/use-theme-mode.js',{useThemeMode(v){useThemeMode=v}},6);let MoonIcon;module.link('../../icons/moon-icon.js',{MoonIcon(v){MoonIcon=v}},7);let SunIcon;module.link('../../icons/sun-icon.js',{SunIcon(v){SunIcon=v}},8);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},9);let darkThemeToggleTheme;module.link('./theme.js',{darkThemeToggleTheme(v){darkThemeToggleTheme=v}},10);












const DarkThemeToggle = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [darkThemeToggleTheme, provider.theme?.darkThemeToggle, props.theme],
    [get(provider.clearTheme, "darkThemeToggle"), props.clearTheme],
    [get(provider.applyTheme, "darkThemeToggle"), props.applyTheme]
  );
  const {
    className,
    iconDark: IconDark = SunIcon,
    iconLight: IconLight = MoonIcon,
    ...restProps
  } = resolveProps(props, provider.props?.darkThemeToggle);
  const { toggleMode } = useThemeMode();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      type: "button",
      "aria-label": "Toggle dark mode",
      "data-testid": "dark-theme-toggle",
      className: twMerge(theme.root.base, className),
      onClick: toggleMode,
      ...restProps,
      children: [
        /* @__PURE__ */ jsx(IconDark, { "aria-label": "Currently dark mode", className: twMerge(theme.root.icon.base, theme.root.icon.dark) }),
        /* @__PURE__ */ jsx(IconLight, { "aria-label": "Currently light mode", className: twMerge(theme.root.icon.base, theme.root.icon.light) })
      ]
    }
  );
});
DarkThemeToggle.displayName = "DarkThemeToggle";


//# sourceMappingURL=DarkThemeToggle.js.map
