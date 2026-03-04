'use client';module.export({TableHead:()=>TableHead});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let useTableContext;module.link('./TableContext.js',{useTableContext(v){useTableContext=v}},7);let TableHeadContext;module.link('./TableHeadContext.js',{TableHeadContext(v){TableHeadContext=v}},8);let tableTheme;module.link('./theme.js',{tableTheme(v){tableTheme=v}},9);











const TableHead = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTableContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme.head, provider.theme?.table?.head, rootTheme?.head, props.theme],
    [get(provider.clearTheme, "table.head"), get(rootClearTheme, "head"), props.clearTheme],
    [get(provider.applyTheme, "table.head"), get(rootApplyTheme, "head"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.tableHead);
  return /* @__PURE__ */ jsx(
    TableHeadContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme },
      children: /* @__PURE__ */ jsx("thead", { ref, className: twMerge(theme.base, className), ...restProps })
    }
  );
});
TableHead.displayName = "TableHead";


//# sourceMappingURL=TableHead.js.map
