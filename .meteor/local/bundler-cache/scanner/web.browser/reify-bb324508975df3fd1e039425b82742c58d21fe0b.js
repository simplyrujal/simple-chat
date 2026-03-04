'use client';module.export({Modal:()=>Modal});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let useFloating,useMergeRefs,useClick,useDismiss,useRole,useInteractions,FloatingPortal,FloatingOverlay,FloatingFocusManager;module.link('@floating-ui/react',{useFloating(v){useFloating=v},useMergeRefs(v){useMergeRefs=v},useClick(v){useClick=v},useDismiss(v){useDismiss=v},useRole(v){useRole=v},useInteractions(v){useInteractions=v},FloatingPortal(v){FloatingPortal=v},FloatingOverlay(v){FloatingOverlay=v},FloatingFocusManager(v){FloatingFocusManager=v}},1);let forwardRef,useState;module.link('react',{forwardRef(v){forwardRef=v},useState(v){useState=v}},2);let get;module.link('../../helpers/get.js',{get(v){get=v}},3);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},4);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},5);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let ModalContext;module.link('./ModalContext.js',{ModalContext(v){ModalContext=v}},8);let modalTheme;module.link('./theme.js',{modalTheme(v){modalTheme=v}},9);











const Modal = forwardRef((props, ref) => {
  const [headerId, setHeaderId] = useState(void 0);
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [modalTheme, provider.theme?.modal, props.theme],
    [get(provider.clearTheme, "modal"), props.clearTheme],
    [get(provider.applyTheme, "modal"), props.applyTheme]
  );
  const {
    children,
    className,
    dismissible = false,
    onClose,
    popup,
    position = "center",
    root,
    show,
    size = "2xl",
    initialFocus,
    ...restProps
  } = resolveProps(props, provider.props?.modal);
  const { context } = useFloating({
    open: show,
    onOpenChange: () => onClose && onClose()
  });
  const mergedRef = useMergeRefs([context.refs.setFloating, ref]);
  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown", enabled: dismissible });
  const role = useRole(context);
  const { getFloatingProps } = useInteractions([click, dismiss, role]);
  if (!show) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ModalContext.Provider,
    {
      value: {
        theme: props.theme,
        clearTheme: props.clearTheme,
        applyTheme: props.applyTheme,
        popup,
        dismissible,
        onClose,
        setHeaderId
      },
      children: /* @__PURE__ */ jsx(FloatingPortal, { root, children: /* @__PURE__ */ jsx(
        FloatingOverlay,
        {
          lockScroll: true,
          "data-testid": "modal-overlay",
          className: twMerge(
            theme.root.base,
            theme.root.positions[position],
            show ? theme.root.show.on : theme.root.show.off,
            className
          ),
          ...restProps,
          children: /* @__PURE__ */ jsx(FloatingFocusManager, { context, initialFocus, children: /* @__PURE__ */ jsx(
            "div",
            {
              ref: mergedRef,
              ...getFloatingProps(restProps),
              "aria-labelledby": headerId,
              className: twMerge(theme.content.base, theme.root.sizes[size]),
              children: /* @__PURE__ */ jsx("div", { className: theme.content.inner, children })
            }
          ) })
        }
      ) })
    }
  );
});
Modal.displayName = "Modal";


//# sourceMappingURL=Modal.js.map
