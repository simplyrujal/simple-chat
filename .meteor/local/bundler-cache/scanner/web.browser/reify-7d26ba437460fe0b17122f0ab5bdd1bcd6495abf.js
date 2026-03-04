'use client';module.export({TableRow:()=>TableRow});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useTableContext;module.link('./TableContext.js',{useTableContext(v){useTableContext=v}},7);let tableTheme;module.link('./theme.js',{tableTheme(v){tableTheme=v}},8);










const TableRow = forwardRef((props, ref) => {
  const {
    theme: rootTheme,
    clearTheme: rootClearTheme,
    applyTheme: rootApplyTheme,
    hoverable,
    striped
  } = useTableContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.row, provider.theme?.table?.row, rootTheme?.row, props.theme],
    [get(provider.clearTheme, "table.row"), get(rootClearTheme, "row"), props.clearTheme],
    [get(provider.applyTheme, "table.row"), get(rootApplyTheme, "row"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.tableRow);
  return /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      "data-testid": "table-row-element",
      className: twMerge(theme.base, striped && theme.striped, hoverable && theme.hovered, className),
      ...restProps
    }
  );
});
TableRow.displayName = "TableRow";


//# sourceMappingURL=TableRow.js.map
