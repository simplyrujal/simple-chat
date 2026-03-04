'use client';module.export({BreadcrumbItem:()=>BreadcrumbItem});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let ChevronRightIcon;module.link('../../icons/chevron-right-icon.js',{ChevronRightIcon(v){ChevronRightIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let breadcrumbTheme;module.link('./theme.js',{breadcrumbTheme(v){breadcrumbTheme=v}},8);










const BreadcrumbItem = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [breadcrumbTheme.item, provider.theme?.breadcrumb?.item, props.theme],
    [get(provider.clearTheme, "breadcrumb.item"), props.clearTheme],
    [get(provider.applyTheme, "breadcrumb.item"), props.applyTheme]
  );
  const { children, className, href, icon: Icon, ...restProps } = resolveProps(props, provider.props?.breadcrumbItem);
  const isLink = typeof href !== "undefined";
  const Component = isLink ? "a" : "span";
  return /* @__PURE__ */ jsxs("li", { className: twMerge(theme.base, className), ...restProps, children: [
    /* @__PURE__ */ jsx(ChevronRightIcon, { "aria-hidden": true, className: theme.chevron, "data-testid": "flowbite-breadcrumb-separator" }),
    /* @__PURE__ */ jsxs(
      Component,
      {
        ref,
        className: theme.href[isLink ? "on" : "off"],
        "data-testid": "flowbite-breadcrumb-item",
        href,
        children: [
          Icon && /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, className: theme.icon }),
          children
        ]
      }
    )
  ] });
});
BreadcrumbItem.displayName = "BreadcrumbItem";


//# sourceMappingURL=BreadcrumbItem.js.map
