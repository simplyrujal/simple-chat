'use client';module.export({Card:()=>Card});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let cardTheme;module.link('./theme.js',{cardTheme(v){cardTheme=v}},7);









const Card = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [cardTheme, provider.theme?.card, props.theme],
    [get(provider.clearTheme, "card"), props.clearTheme],
    [get(provider.applyTheme, "card"), props.applyTheme]
  );
  const { children, className, horizontal, href, imgAlt, imgSrc, renderImage, ...restProps } = resolveProps(
    props,
    provider.props?.card
  );
  const Component = typeof href === "undefined" ? "div" : "a";
  return /* @__PURE__ */ jsxs(
    Component,
    {
      ref,
      "data-testid": "flowbite-card",
      href,
      className: twMerge(
        theme.root.base,
        theme.root.horizontal[horizontal ? "on" : "off"],
        href && theme.root.href,
        className
      ),
      ...restProps,
      children: [
        renderImage?.(theme, !!horizontal) ?? (imgSrc && /* @__PURE__ */ jsx(
          "img",
          {
            "data-testid": "flowbite-card-image",
            alt: imgAlt ?? "",
            src: imgSrc,
            className: twMerge(theme.img.base, theme.img.horizontal[props.horizontal ? "on" : "off"])
          }
        )),
        /* @__PURE__ */ jsx("div", { className: theme.root.children, children })
      ]
    }
  );
});
Card.displayName = "Card";


//# sourceMappingURL=Card.js.map
