'use client';module.export({TabItem:()=>TabItem});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},2);module.link('../MegaMenu/theme.js');module.link('../../theme/config.js');module.link('../../theme/mode-script.js');let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},3);








const TabItem = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const { title: _, ...restProps } = resolveProps(props, provider.props?.tabItem);
  return /* @__PURE__ */ jsx("div", { ref, ...restProps });
});
TabItem.displayName = "TabItem";


//# sourceMappingURL=TabItem.js.map
