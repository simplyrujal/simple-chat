'use client';module.export({FileInput:()=>FileInput});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let fileInputTheme;module.link('./theme.js',{fileInputTheme(v){fileInputTheme=v}},7);









const FileInput = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [fileInputTheme, provider.theme?.fileInput, props.theme],
    [get(provider.clearTheme, "fileInput"), props.clearTheme],
    [get(provider.applyTheme, "fileInput"), props.applyTheme]
  );
  const { className, color = "gray", sizing = "md", ...restProps } = resolveProps(props, provider.props?.fileInput);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type: "file",
      className: twMerge(theme.base, theme.colors[color], theme.sizes[sizing], className),
      ...restProps
    }
  );
});
FileInput.displayName = "FileInput";


//# sourceMappingURL=FileInput.js.map
