'use client';module.export({TableCell:()=>TableCell});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useTableBodyContext;module.link('./TableBodyContext.js',{useTableBodyContext(v){useTableBodyContext=v}},7);let useTableContext;module.link('./TableContext.js',{useTableContext(v){useTableContext=v}},8);let tableTheme;module.link('./theme.js',{tableTheme(v){tableTheme=v}},9);











const TableCell = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTableContext();
  const { theme: bodyTheme, clearTheme: bodyClearTheme, applyTheme: bodyApplyTheme } = useTableBodyContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.body.cell, provider.theme?.table?.body?.cell, rootTheme?.body?.cell, bodyTheme?.cell, props.theme],
    [
      get(provider.clearTheme, "table.body.cell"),
      get(rootClearTheme, "body.cell"),
      get(bodyClearTheme, "cell"),
      props.clearTheme
    ],
    [
      get(provider.applyTheme, "table.body.cell"),
      get(rootApplyTheme, "body.cell"),
      get(bodyApplyTheme, "cell"),
      props.applyTheme
    ]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.tableCell);
  return /* @__PURE__ */ jsx("td", { ref, className: twMerge(theme.base, className), ...restProps });
});
TableCell.displayName = "TableCell";


//# sourceMappingURL=TableCell.js.map
