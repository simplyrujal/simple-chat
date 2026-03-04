'use client';module.export({SidebarCollapse:()=>SidebarCollapse});let jsx,jsxs,Fragment;module.link('react/jsx-runtime',{jsx(v){jsx=v},jsxs(v){jsxs=v},Fragment(v){Fragment=v}},0);let forwardRef,useId,useState,useEffect;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v},useState(v){useState=v},useEffect(v){useEffect=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let ChevronDownIcon;module.link('../../icons/chevron-down-icon.js',{ChevronDownIcon(v){ChevronDownIcon=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let Tooltip;module.link('../Tooltip/Tooltip.js',{Tooltip(v){Tooltip=v}},8);let useSidebarContext;module.link('./SidebarContext.js',{useSidebarContext(v){useSidebarContext=v}},9);let SidebarItemContext;module.link('./SidebarItemContext.js',{SidebarItemContext(v){SidebarItemContext=v}},10);let sidebarTheme;module.link('./theme.js',{sidebarTheme(v){sidebarTheme=v}},11);













const SidebarCollapse = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, isCollapsed } = useSidebarContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [sidebarTheme.collapse, provider.theme?.sidebar?.collapse, rootTheme?.collapse, props.theme],
    [get(provider.clearTheme, "sidebar.collapse"), get(rootClearTheme, "collapse"), props.clearTheme],
    [get(provider.applyTheme, "sidebar.collapse"), get(rootApplyTheme, "collapse"), props.applyTheme]
  );
  const {
    children,
    className,
    icon: Icon,
    label,
    chevronIcon: ChevronIcon = ChevronDownIcon,
    renderChevronIcon,
    open = false,
    ...restProps
  } = resolveProps(props, provider.props?.sidebarCollapse);
  const id = useId();
  const [isOpen, setOpen] = useState(open);
  useEffect(() => setOpen(open), [open]);
  function Wrapper({ children: children2 }) {
    if (isCollapsed && !isOpen) {
      return /* @__PURE__ */ jsx(Tooltip, { content: label, placement: "right", children: children2 });
    }
    return children2;
  }
  return /* @__PURE__ */ jsx("li", { ref, children: /* @__PURE__ */ jsxs(Wrapper, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        id: `flowbite-sidebar-collapse-${id}`,
        onClick: () => setOpen(!isOpen),
        title: label,
        type: "button",
        className: twMerge(theme.button, className),
        ...restProps,
        children: [
          Icon && /* @__PURE__ */ jsx(
            Icon,
            {
              "aria-hidden": true,
              "data-testid": "flowbite-sidebar-collapse-icon",
              className: twMerge(theme.icon.base, theme.icon.open[isOpen ? "on" : "off"])
            }
          ),
          isCollapsed ? /* @__PURE__ */ jsx("span", { className: theme.label.title, children: label }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { "data-testid": "flowbite-sidebar-collapse-label", className: theme.label.base, children: label }),
            renderChevronIcon ? renderChevronIcon(theme, isOpen) : /* @__PURE__ */ jsx(
              ChevronIcon,
              {
                "aria-hidden": true,
                className: twMerge(theme.label.icon.base, theme.label.icon.open[isOpen ? "on" : "off"])
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("ul", { "aria-labelledby": `flowbite-sidebar-collapse-${id}`, hidden: !isOpen, className: theme.list, children: /* @__PURE__ */ jsx(SidebarItemContext.Provider, { value: { isInsideCollapse: true }, children }) })
  ] }) });
});
SidebarCollapse.displayName = "SidebarCollapse";


//# sourceMappingURL=SidebarCollapse.js.map
