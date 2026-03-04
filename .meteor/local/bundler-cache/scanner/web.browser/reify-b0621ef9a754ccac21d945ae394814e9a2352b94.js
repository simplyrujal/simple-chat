'use client';module.export({BannerCollapseButton:()=>BannerCollapseButton});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},2);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},3);let Button;module.link('../Button/Button.js',{Button(v){Button=v}},4);






const BannerCollapseButton = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const mergedProps = resolveProps(props, provider.props?.bannerCollapseButton);
  function onClick(e) {
    const collapseButton = e.target;
    const parentBanner = collapseButton.closest('[role="banner"]');
    parentBanner?.remove();
  }
  return /* @__PURE__ */ jsx(Button, { ref, onClick, ...mergedProps });
});
BannerCollapseButton.displayName = "BannerCollapseButton";


//# sourceMappingURL=BannerCollapseButton.js.map
