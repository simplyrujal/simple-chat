'use client';module.export({TableHeadCell:()=>TableHeadCell});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useTableContext;module.link('./TableContext.js',{useTableContext(v){useTableContext=v}},7);let useTableHeadContext;module.link('./TableHeadContext.js',{useTableHeadContext(v){useTableHeadContext=v}},8);let tableTheme;module.link('./theme.js',{tableTheme(v){tableTheme=v}},9);











const TableHeadCell = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTableContext();
  const { theme: headTheme, clearTheme: headClearTheme, applyTheme: headApplyTheme } = useTableHeadContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.head.cell, provider.theme?.table?.head?.cell, rootTheme?.head?.cell, headTheme?.cell, props.theme],
    [
      get(provider.clearTheme, "table.head.cell"),
      get(rootClearTheme, "head.cell"),
      get(headClearTheme, "cell"),
      props.clearTheme
    ],
    [
      get(provider.applyTheme, "table.head.cell"),
      get(rootApplyTheme, "head.cell"),
      get(headApplyTheme, "cell"),
      props.applyTheme
    ]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.tableHeadCell);
  return /* @__PURE__ */ jsx("th", { ref, className: twMerge(theme.base, className), ...restProps });
});
TableHeadCell.displayName = "TableHeadCell";


//# sourceMappingURL=TableHeadCell.js.map
