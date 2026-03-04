'use client';module.export({Kbd:()=>Kbd});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let kbdTheme;module.link('./theme.js',{kbdTheme(v){kbdTheme=v}},7);









const Kbd = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [kbdTheme, provider.theme?.kbd, props.theme],
    [get(provider.clearTheme, "kbd"), props.clearTheme],
    [get(provider.applyTheme, "kbd"), props.applyTheme]
  );
  const { children, className, icon: Icon, ...restProps } = resolveProps(props, provider.props?.hr);
  return /* @__PURE__ */ jsxs("span", { ref, className: twMerge(theme.root.base, className), "data-testid": "flowbite-kbd", ...restProps, children: [
    Icon && /* @__PURE__ */ jsx(Icon, { className: theme.root.icon, "data-testid": "flowbite-kbd-icon" }),
    children
  ] });
});
Kbd.displayName = "Kbd";


//# sourceMappingURL=Kbd.js.map
