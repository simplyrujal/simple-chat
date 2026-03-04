'use client';module.export({DrawerHeader:()=>DrawerHeader});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef,useId;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let CloseIcon;module.link('../../icons/close-icon.js',{CloseIcon(v){CloseIcon=v}},5);let HomeIcon;module.link('../../icons/home-icon.js',{HomeIcon(v){HomeIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let useDrawerContext;module.link('./DrawerContext.js',{useDrawerContext(v){useDrawerContext=v}},8);let drawerTheme;module.link('./theme.js',{drawerTheme(v){drawerTheme=v}},9);











const DrawerHeader = forwardRef((props, ref) => {
  const id = useId();
  const {
    id: mainDivId,
    isOpen,
    onClose,
    theme: rootTheme,
    clearTheme: rootClearTheme,
    applyTheme: rootApplyTheme
  } = useDrawerContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [drawerTheme.header, provider.theme?.drawer?.header, rootTheme?.header, props.theme],
    [get(provider.clearTheme, "drawer.header"), get(rootClearTheme, "header"), props.clearTheme],
    [get(provider.applyTheme, "drawer.header"), get(rootApplyTheme, "header"), props.applyTheme]
  );
  const {
    children,
    className,
    closeIcon: CloseIcon$1 = CloseIcon,
    title,
    titleIcon: TitleIcon = HomeIcon,
    ...restProps
  } = resolveProps(props, provider.props?.drawerHeader);
  return /* @__PURE__ */ jsxs("div", { ref, className, ...restProps, children: [
    /* @__PURE__ */ jsxs("h5", { className: theme.inner.titleText, id: mainDivId, children: [
      /* @__PURE__ */ jsx(TitleIcon, { "aria-hidden": true, className: theme.inner.titleIcon }),
      title
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: onClose, type: "button", "data-testid": "close-drawer", className: theme.inner.closeButton, children: [
      /* @__PURE__ */ jsx(CloseIcon$1, { "aria-hidden": true, className: theme.inner.closeIcon }),
      /* @__PURE__ */ jsx("span", { className: theme.inner.titleCloseIcon, children: "Close menu" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: theme.collapsed[isOpen ? "on" : "off"], id: `flowbite-drawer-header-${id}`, children })
  ] });
});
DrawerHeader.displayName = "DrawerHeader";


//# sourceMappingURL=DrawerHeader.js.map
