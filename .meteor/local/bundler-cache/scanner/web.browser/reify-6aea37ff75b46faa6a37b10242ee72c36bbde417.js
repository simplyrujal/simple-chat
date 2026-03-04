'use client';module.export({Button:()=>Button});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let ButtonBase;module.link('./ButtonBase.js',{ButtonBase(v){ButtonBase=v}},7);let useButtonGroupContext;module.link('./ButtonGroupContext.js',{useButtonGroupContext(v){useButtonGroupContext=v}},8);let buttonTheme;module.link('./theme.js',{buttonTheme(v){buttonTheme=v}},9);











const Button = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [buttonTheme, provider.theme?.button, props.theme],
    [get(provider.clearTheme, "button"), props.clearTheme],
    [get(provider.applyTheme, "button"), props.applyTheme]
  );
  const {
    children,
    className,
    color = "default",
    disabled,
    fullSized,
    outline: _outline,
    pill: _pill,
    size = "md",
    ...restProps
  } = resolveProps(props, provider.props?.button);
  const buttonGroup = useButtonGroupContext();
  const outline = buttonGroup?.outline ?? _outline;
  const pill = buttonGroup?.pill ?? _pill;
  return /* @__PURE__ */ jsx(
    ButtonBase,
    {
      ref,
      disabled,
      className: twMerge(
        theme.base,
        theme.size[size],
        pill && theme.pill,
        disabled && theme.disabled,
        fullSized && theme.fullSized,
        outline ? theme.outlineColor[color] : theme.color[color],
        buttonGroup && theme.grouped,
        className
      ),
      ...restProps,
      children
    }
  );
});
Button.displayName = "Button";


//# sourceMappingURL=Button.js.map
