'use client';module.export({Table:()=>Table});let jsx,jsxs;module.link('react/jsx-runtime',{jsx(v){jsx=v},jsxs(v){jsxs=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let TableContext;module.link('./TableContext.js',{TableContext(v){TableContext=v}},7);let tableTheme;module.link('./theme.js',{tableTheme(v){tableTheme=v}},8);










const Table = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tableTheme, provider.theme?.table, props.theme],
    [get(provider.clearTheme, "table"), props.clearTheme],
    [get(provider.applyTheme, "table"), props.applyTheme]
  );
  const { className, striped, hoverable, ...restProps } = resolveProps(props, provider.props?.table);
  return /* @__PURE__ */ jsx("div", { "data-testid": "table-element", className: twMerge(theme.root.wrapper), children: /* @__PURE__ */ jsxs(
    TableContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, striped, hoverable },
      children: [
        /* @__PURE__ */ jsx("div", { className: twMerge(theme.root.shadow, className) }),
        /* @__PURE__ */ jsx("table", { ref, className: twMerge(theme.root.base, className), ...restProps })
      ]
    }
  ) });
});
Table.displayName = "Table";


//# sourceMappingURL=Table.js.map
