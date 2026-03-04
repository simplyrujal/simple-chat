'use client';module.export({ListGroupItem:()=>ListGroupItem});let jsx,jsxs;module.link('react/jsx-runtime',{jsx(v){jsx=v},jsxs(v){jsxs=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let listGroupTheme;module.link('./theme.js',{listGroupTheme(v){listGroupTheme=v}},7);









const ListGroupItem = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [listGroupTheme.item, provider.theme?.listGroup?.item, props.theme],
    [get(provider.clearTheme, "listGroup.item"), props.clearTheme],
    [get(provider.applyTheme, "listGroup.item"), props.applyTheme]
  );
  const {
    active: isActive,
    children,
    className,
    href,
    icon: Icon,
    onClick,
    disabled,
    ...restProps
  } = resolveProps(props, provider.props?.listGroupItem);
  const isLink = typeof href !== "undefined";
  const Component = isLink ? "a" : "button";
  return /* @__PURE__ */ jsx("li", { ref, className: twMerge(theme.base, className), children: /* @__PURE__ */ jsxs(
    Component,
    {
      href,
      onClick,
      type: isLink ? void 0 : "button",
      disabled,
      className: twMerge(
        theme.link.active[isActive ? "on" : "off"],
        theme.link.disabled[disabled ? "on" : "off"],
        theme.link.base,
        theme.link.href[isLink ? "on" : "off"]
      ),
      ...restProps,
      children: [
        Icon && /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, "data-testid": "flowbite-list-group-item-icon", className: theme.link.icon }),
        children
      ]
    }
  ) });
});
ListGroupItem.displayName = "ListGroupItem";


//# sourceMappingURL=ListGroupItem.js.map
