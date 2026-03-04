'use client';module.export({Toast:()=>Toast});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef,useState;module.link('react',{forwardRef(v){forwardRef=v},useState(v){useState=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let toastTheme;module.link('./theme.js',{toastTheme(v){toastTheme=v}},7);let ToastContext;module.link('./ToastContext.js',{ToastContext(v){ToastContext=v}},8);










const durationClasses = {
  75: "duration-75",
  100: "duration-100",
  150: "duration-150",
  200: "duration-200",
  300: "duration-300",
  500: "duration-500",
  700: "duration-700",
  1e3: "duration-1000"
};
const Toast = forwardRef((props, ref) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [toastTheme, provider.theme?.toast, props.theme],
    [get(provider.clearTheme, "toast"), props.clearTheme],
    [get(provider.applyTheme, "toast"), props.applyTheme]
  );
  const { className, duration = 300, ...restProps } = resolveProps(props, provider.props?.toast);
  if (isRemoved) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ToastContext.Provider,
    {
      value: {
        theme: props.theme,
        clearTheme: props.clearTheme,
        applyTheme: props.applyTheme,
        duration,
        isClosed,
        isRemoved,
        setIsClosed,
        setIsRemoved
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-testid": "flowbite-toast",
          role: "alert",
          className: twMerge(theme.root.base, durationClasses[duration], isClosed && theme.root.closed, className),
          ...restProps
        }
      )
    }
  );
});
Toast.displayName = "Toast";


//# sourceMappingURL=Toast.js.map
