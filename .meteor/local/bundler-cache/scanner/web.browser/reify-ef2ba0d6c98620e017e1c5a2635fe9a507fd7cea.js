'use client';module.export({TableBody:()=>TableBody});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let TableBodyContext;module.link('./TableBodyContext.js',{TableBodyContext(v){TableBodyContext=v}},7);let useTableContext;module.link('./TableContext.js',{useTableContext(v){useTableContext=v}},8);let tableTheme;module.link('./theme.js',{tableTheme(v){tableTheme=v}},9);











const TableBody = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTableContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.body, provider.theme?.table?.body, rootTheme?.body, props.theme],
    [get(provider.clearTheme, "table.body"), get(rootClearTheme, "body"), props.clearTheme],
    [get(provider.applyTheme, "table.body"), get(rootApplyTheme, "body"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.tableBody);
  return /* @__PURE__ */ jsx(
    TableBodyContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme },
      children: /* @__PURE__ */ jsx("tbody", { ref, className: twMerge(theme.base, className), ...restProps })
    }
  );
});
TableBody.displayName = "TableBody";


//# sourceMappingURL=TableBody.js.map
