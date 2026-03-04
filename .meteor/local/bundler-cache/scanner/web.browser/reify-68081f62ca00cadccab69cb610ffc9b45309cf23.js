'use client';module.export({ClipboardWithIcon:()=>ClipboardWithIcon});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef,useState;module.link('react',{forwardRef(v){forwardRef=v},useState(v){useState=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let CheckIcon;module.link('../../icons/check-icon.js',{CheckIcon(v){CheckIcon=v}},6);let ClipboardListIcon;module.link('../../icons/clipboard-list-icon.js',{ClipboardListIcon(v){ClipboardListIcon=v}},7);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},8);let copyToClipboard;module.link('./helpers.js',{copyToClipboard(v){copyToClipboard=v}},9);let clipboardTheme;module.link('./theme.js',{clipboardTheme(v){clipboardTheme=v}},10);












const ClipboardWithIcon = forwardRef((props, ref) => {
  const [isJustCopied, setIsJustCopied] = useState(false);
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [clipboardTheme.withIcon, provider.theme?.clipboard?.withIcon, props.theme],
    [get(provider.clearTheme, "clipboard.withIcon"), props.clearTheme],
    [get(provider.applyTheme, "clipboard.withIcon"), props.applyTheme]
  );
  const {
    valueToCopy,
    icon: Icon = ClipboardListIcon,
    className,
    ...restProps
  } = resolveProps(props, provider.props?.clipboardWithIcon);
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: twMerge(theme.base, className),
      onClick: () => copyToClipboard(valueToCopy, setIsJustCopied),
      ...restProps,
      ref,
      children: isJustCopied ? /* @__PURE__ */ jsx(CheckIcon, { "aria-hidden": true, className: theme.icon.successIcon }) : /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, className: theme.icon.defaultIcon })
    }
  );
});
ClipboardWithIcon.displayName = "Clipboard.WithIcon";


//# sourceMappingURL=ClipboardWithIcon.js.map
