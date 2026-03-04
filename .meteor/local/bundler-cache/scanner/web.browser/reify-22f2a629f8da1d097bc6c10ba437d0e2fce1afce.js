'use client';module.export({Clipboard:()=>Clipboard});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef,useState;module.link('react',{forwardRef(v){forwardRef=v},useState(v){useState=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let Tooltip;module.link('../Tooltip/Tooltip.js',{Tooltip(v){Tooltip=v}},7);let copyToClipboard;module.link('./helpers.js',{copyToClipboard(v){copyToClipboard=v}},8);let clipboardTheme;module.link('./theme.js',{clipboardTheme(v){clipboardTheme=v}},9);











const Clipboard = forwardRef((props, ref) => {
  const [isJustCopied, setIsJustCopied] = useState(false);
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [clipboardTheme.button, provider.theme?.clipboard?.button, props.theme],
    [get(provider.clearTheme, "clipboard.button"), props.clearTheme],
    [get(provider.applyTheme, "clipboard.button"), props.applyTheme]
  );
  const { className, valueToCopy, label, ...restProps } = resolveProps(props, provider.props?.clipboard);
  return /* @__PURE__ */ jsx(Tooltip, { content: isJustCopied ? "Copied" : "Copy to clipboard", className: "[&_*]:cursor-pointer", children: /* @__PURE__ */ jsx(
    "button",
    {
      className: twMerge(theme.base, className),
      onClick: () => copyToClipboard(valueToCopy, setIsJustCopied),
      ...restProps,
      ref,
      children: /* @__PURE__ */ jsx("span", { className: theme.label, children: label })
    }
  ) });
});
Clipboard.displayName = "Clipboard";


//# sourceMappingURL=Clipboard.js.map
