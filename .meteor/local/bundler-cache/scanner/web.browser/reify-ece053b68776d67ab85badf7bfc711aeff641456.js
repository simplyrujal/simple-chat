'use client';module.export({SidebarItem:()=>SidebarItem});let jsx,jsxs;module.link('react/jsx-runtime',{jsx(v){jsx=v},jsxs(v){jsxs=v}},0);let forwardRef,useId;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let Badge;module.link('../Badge/Badge.js',{Badge(v){Badge=v}},7);let Tooltip;module.link('../Tooltip/Tooltip.js',{Tooltip(v){Tooltip=v}},8);let useSidebarContext;module.link('./SidebarContext.js',{useSidebarContext(v){useSidebarContext=v}},9);let useSidebarItemContext;module.link('./SidebarItemContext.js',{useSidebarItemContext(v){useSidebarItemContext=v}},10);let sidebarTheme;module.link('./theme.js',{sidebarTheme(v){sidebarTheme=v}},11);













const SidebarItem = forwardRef((props, ref) => {
  const id = useId();
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isCollapsed } = useSidebarContext();
  const { isInsideCollapse } = useSidebarItemContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.item, provider.theme?.sidebar?.item, rootTheme?.item, props.theme],
    [get(provider.clearTheme, "sidebar.item"), get(rootClearTheme, "item"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.item"), get(rootApplyTheme, "item"), props.applyTheme]
  );
  const {
    active: isActive,
    as: Component = "a",
    children,
    className,
    icon: Icon,
    label,
    labelColor = "info",
    ...restProps
  } = resolveProps(props, provider.props?.sidebarItem);
  return /* @__PURE__ */ jsx(ListItem, { theme, className: theme.listItem, id, isCollapsed, tooltipChildren: children, children: /* @__PURE__ */ jsxs(
    Component,
    {
      "aria-labelledby": `flowbite-sidebar-item-${id}`,
      ref,
      className: twMerge(
        theme.base,
        isActive && theme.active,
        !isCollapsed && isInsideCollapse && theme.collapsed.insideCollapse,
        className
      ),
      ...restProps,
      children: [
        Icon && /* @__PURE__ */ jsx(
          Icon,
          {
            "aria-hidden": true,
            "data-testid": "flowbite-sidebar-item-icon",
            className: twMerge(theme.icon.base, isActive && theme.icon.active)
          }
        ),
        isCollapsed && !Icon && /* @__PURE__ */ jsx("span", { className: theme.collapsed.noIcon, children: children.charAt(0).toLocaleUpperCase() ?? "?" }),
        !isCollapsed && /* @__PURE__ */ jsx(Children, { id, theme, children }),
        !isCollapsed && label && /* @__PURE__ */ jsx(Badge, { color: labelColor, "data-testid": "flowbite-sidebar-label", hidden: isCollapsed, className: theme.label, children: label })
      ]
    }
  ) });
});
SidebarItem.displayName = "SidebarItem";
function ListItem({
  id,
  theme,
  isCollapsed,
  tooltipChildren,
  children: wrapperChildren,
  ...props
}) {
  return /* @__PURE__ */ jsx("li", { ...props, children: isCollapsed ? /* @__PURE__ */ jsx(
    Tooltip,
    {
      content: /* @__PURE__ */ jsx(Children, { id, theme, children: tooltipChildren }),
      placement: "right",
      children: wrapperChildren
    }
  ) : wrapperChildren });
}
ListItem.displayName = "SidebarItem.ListItem";
function Children({ id, theme, children }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-testid": "flowbite-sidebar-item-content",
      id: `flowbite-sidebar-item-${id}`,
      className: twMerge(theme.content.base),
      children
    }
  );
}
ListItem.displayName = "SidebarItem.Children";


//# sourceMappingURL=SidebarItem.js.map
