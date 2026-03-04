'use client';module.export({ModalHeader:()=>ModalHeader});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef,useId,useLayoutEffect;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v},useLayoutEffect(v){useLayoutEffect=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let OutlineXIcon;module.link('../../icons/outline-x-icon.js',{OutlineXIcon(v){OutlineXIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let useModalContext;module.link('./ModalContext.js',{useModalContext(v){useModalContext=v}},8);let modalTheme;module.link('./theme.js',{modalTheme(v){modalTheme=v}},9);











const ModalHeader = forwardRef((props, ref) => {
  const {
    theme: rootTheme,
    clearTheme: rootClearTheme,
    applyTheme: rootApplyTheme,
    popup,
    dismissible,
    onClose,
    setHeaderId
  } = useModalContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [modalTheme.header, provider.theme?.modal?.header, rootTheme?.header, props.theme],
    [get(provider.clearTheme, "modal.header"), get(rootClearTheme, "header"), props.clearTheme],
    [get(provider.applyTheme, "modal.header"), get(rootApplyTheme, "header"), props.applyTheme]
  );
  const {
    as: Component = "h3",
    children,
    className,
    id,
    ...restProps
  } = resolveProps(props, provider.props?.modalHeader);
  const innerHeaderId = useId();
  const headerId = id || innerHeaderId;
  useLayoutEffect(() => {
    setHeaderId(headerId);
    return () => setHeaderId(void 0);
  }, [headerId, setHeaderId]);
  return /* @__PURE__ */ jsxs("div", { ref, className: twMerge(theme.base, popup && theme.popup, className), ...restProps, children: [
    /* @__PURE__ */ jsx(Component, { id: headerId, className: theme.title, children }),
    dismissible && /* @__PURE__ */ jsx("button", { "aria-label": "Close", className: theme.close.base, type: "button", onClick: onClose, children: /* @__PURE__ */ jsx(OutlineXIcon, { "aria-hidden": true, className: theme.close.icon }) })
  ] });
});
ModalHeader.displayName = "ModalHeader";


//# sourceMappingURL=ModalHeader.js.map
