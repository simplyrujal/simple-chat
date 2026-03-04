'use client';module.export({Breadcrumb:()=>Breadcrumb});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let breadcrumbTheme;module.link('./theme.js',{breadcrumbTheme(v){breadcrumbTheme=v}},7);









const Breadcrumb = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [breadcrumbTheme.root, provider.theme?.breadcrumb?.root, props.theme],
    [get(provider.clearTheme, "breadcrumb.root"), props.clearTheme],
    [get(provider.applyTheme, "breadcrumb.root"), props.applyTheme]
  );
  const { children, className, ...restProps } = resolveProps(props, provider.props?.breadcrumb);
  return /* @__PURE__ */ jsx("nav", { ref, "aria-label": "Breadcrumb", className: twMerge(theme.base, className), ...restProps, children: /* @__PURE__ */ jsx("ol", { className: theme.list, children }) });
});
Breadcrumb.displayName = "Breadcrumb";


//# sourceMappingURL=Breadcrumb.js.map
