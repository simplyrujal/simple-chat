'use client';module.export({Banner:()=>Banner});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},2);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},3);





const Banner = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const mergedProps = resolveProps(props, provider.props?.banner);
  return /* @__PURE__ */ jsx("div", { ref, "data-testid": "flowbite-banner", role: "banner", tabIndex: -1, ...mergedProps });
});
Banner.displayName = "Banner";


//# sourceMappingURL=Banner.js.map
