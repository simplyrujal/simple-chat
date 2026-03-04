'use client';module.export({ToastToggle:()=>ToastToggle});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let XIcon;module.link('../../icons/x-icon.js',{XIcon(v){XIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let toastTheme;module.link('./theme.js',{toastTheme(v){toastTheme=v}},8);let useToastContext;module.link('./ToastContext.js',{useToastContext(v){useToastContext=v}},9);











const ToastToggle = forwardRef((props, ref) => {
  const {
    theme: rootTheme,
    clearTheme: rootClearTheme,
    applyTheme: rootApplyTheme,
    duration,
    isClosed,
    isRemoved,
    setIsClosed,
    setIsRemoved
  } = useToastContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [toastTheme.toggle, provider.theme?.toast?.toggle, rootTheme?.toggle, props.theme],
    [get(provider.clearTheme, "toast.toggle"), get(rootClearTheme, "toggle"), props.clearTheme],
    [get(provider.applyTheme, "toast.toggle"), get(rootApplyTheme, "toggle"), props.applyTheme]
  );
  const {
    className,
    onClick,
    onDismiss,
    xIcon: XIcon$1 = XIcon,
    ...restProps
  } = resolveProps(props, provider.props?.toastToggle);
  function handleClick(e) {
    if (onClick) {
      onClick(e);
    }
    if (onDismiss) {
      onDismiss();
      return;
    }
    setIsClosed(!isClosed);
    setTimeout(() => setIsRemoved(!isRemoved), duration);
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      "aria-label": "Close",
      onClick: handleClick,
      type: "button",
      className: twMerge(theme.base, className),
      ...restProps,
      children: /* @__PURE__ */ jsx(XIcon$1, { "aria-hidden": true, className: theme.icon })
    }
  );
});
ToastToggle.displayName = "ToastToggle";


//# sourceMappingURL=ToastToggle.js.map
