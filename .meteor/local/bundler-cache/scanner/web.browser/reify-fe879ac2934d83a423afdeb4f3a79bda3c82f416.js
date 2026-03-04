'use client';module.export({Drawer:()=>Drawer});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef,useId,useEffect;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v},useEffect(v){useEffect=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let DrawerContext;module.link('./DrawerContext.js',{DrawerContext(v){DrawerContext=v}},7);let drawerTheme;module.link('./theme.js',{drawerTheme(v){drawerTheme=v}},8);










const Drawer = forwardRef((props, ref) => {
  const id = useId();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [drawerTheme, provider.theme?.drawer, props.theme],
    [get(provider.clearTheme, "drawer"), props.clearTheme],
    [get(provider.applyTheme, "drawer"), props.applyTheme]
  );
  const {
    backdrop = true,
    children,
    className,
    edge = false,
    position = "left",
    onClose,
    open: isOpen = false,
    ...restProps
  } = resolveProps(props, provider.props?.drawer);
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose, isOpen]);
  return /* @__PURE__ */ jsxs(
    DrawerContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, onClose, isOpen, id },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            "aria-modal": true,
            "aria-describedby": `drawer-dialog-${id}`,
            role: "dialog",
            tabIndex: -1,
            "data-testid": "flowbite-drawer",
            className: twMerge(
              theme.root.base,
              theme.root.position[position][isOpen ? "on" : "off"],
              edge && !isOpen && theme.root.edge,
              className
            ),
            ...restProps,
            children
          }
        ),
        isOpen && backdrop && /* @__PURE__ */ jsx("div", { onClick: () => onClose(), className: theme.root.backdrop })
      ]
    }
  );
});
Drawer.displayName = "Drawer";


//# sourceMappingURL=Drawer.js.map
