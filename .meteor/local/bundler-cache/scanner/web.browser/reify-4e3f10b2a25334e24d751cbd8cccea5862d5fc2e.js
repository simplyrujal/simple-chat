'use client';module.export({ModalBody:()=>ModalBody});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useModalContext;module.link('./ModalContext.js',{useModalContext(v){useModalContext=v}},7);let modalTheme;module.link('./theme.js',{modalTheme(v){modalTheme=v}},8);










const ModalBody = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, popup } = useModalContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [modalTheme.body, provider.theme?.modal?.body, rootTheme?.body, props.theme],
    [get(provider.clearTheme, "modal.body"), get(rootClearTheme, "body"), props.clearTheme],
    [get(provider.applyTheme, "modal.body"), get(rootApplyTheme, "body"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.modalBody);
  return /* @__PURE__ */ jsx("div", { ref, className: twMerge(theme.base, popup && theme.popup, className), ...restProps });
});
ModalBody.displayName = "ModalBody";


//# sourceMappingURL=ModalBody.js.map
