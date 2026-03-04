'use client';module.export({DropdownItem:()=>DropdownItem});let jsx,jsxs;module.link('react/jsx-runtime',{jsx(v){jsx=v},jsxs(v){jsxs=v}},0);let useListItem,useMergeRefs;module.link('@floating-ui/react',{useListItem(v){useListItem=v},useMergeRefs(v){useMergeRefs=v}},1);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},2);let get;module.link('../../helpers/get.js',{get(v){get=v}},3);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},4);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},5);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let ButtonBase;module.link('../Button/ButtonBase.js',{ButtonBase(v){ButtonBase=v}},8);let useDropdownContext;module.link('./DropdownContext.js',{useDropdownContext(v){useDropdownContext=v}},9);let dropdownTheme;module.link('./theme.js',{dropdownTheme(v){dropdownTheme=v}},10);












const DropdownItem = forwardRef(
  (props, forwardedRef) => {
    const {
      theme: rootTheme,
      clearTheme: rootClearTheme,
      applyTheme: rootApplyTheme,
      activeIndex,
      dismissOnClick,
      getItemProps,
      handleSelect
    } = useDropdownContext();
    const provider = useThemeProvider();
    const theme = useResolveTheme(
      [dropdownTheme.floating.item, provider.theme?.dropdown?.floating?.item, rootTheme?.floating?.item, props.theme],
      [get(provider.clearTheme, "dropdown.floating.item"), get(rootClearTheme, "floating.item"), props.clearTheme],
      [get(provider.applyTheme, "dropdown.floating.item"), get(rootApplyTheme, "floating.item"), props.applyTheme]
    );
    const {
      children,
      className,
      icon: Icon,
      onClick,
      ...restProps
    } = resolveProps(props, provider.props?.dropdownItem);
    const { ref: listItemRef, index } = useListItem({ label: typeof children === "string" ? children : void 0 });
    const ref = useMergeRefs([forwardedRef, listItemRef]);
    const isActive = activeIndex === index;
    return /* @__PURE__ */ jsx("li", { role: "menuitem", className: theme.container, children: /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        ref,
        className: twMerge(theme.base, className),
        ...restProps,
        ...getItemProps({
          onClick: () => {
            onClick?.();
            dismissOnClick && handleSelect(null);
          }
        }),
        tabIndex: isActive ? 0 : -1,
        children: [
          Icon && /* @__PURE__ */ jsx(Icon, { className: theme.icon }),
          children
        ]
      }
    ) });
  }
);
DropdownItem.displayName = "DropdownItem";


//# sourceMappingURL=DropdownItem.js.map
