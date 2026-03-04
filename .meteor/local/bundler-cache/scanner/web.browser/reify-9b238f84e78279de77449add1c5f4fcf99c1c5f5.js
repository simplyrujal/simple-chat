'use client';module.export({MegaMenuDropdown:()=>MegaMenuDropdown});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let useState,useId,useRef,useEffect;module.link('react',{useState(v){useState=v},useId(v){useId=v},useRef(v){useRef=v},useEffect(v){useEffect=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let Dropdown;module.link('../Dropdown/Dropdown.js',{Dropdown(v){Dropdown=v}},7);module.link('../Dropdown/DropdownContext.js');module.link('../Dropdown/DropdownDivider.js');module.link('../Dropdown/DropdownHeader.js');module.link('../Dropdown/DropdownItem.js');let megaMenuTheme;module.link('./theme.js',{megaMenuTheme(v){megaMenuTheme=v}},8);














function MegaMenuDropdown(props) {
  const [labelledBy, setLabelledBy] = useState(void 0);
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [megaMenuTheme.dropdown, provider.theme?.megaMenu?.dropdown, props.theme],
    [get(provider.clearTheme, "megaMenu.dropdown"), props.clearTheme],
    [get(provider.applyTheme, "megaMenu.dropdown"), props.applyTheme]
  );
  const { children, className, toggle, ...restProps } = resolveProps(props, provider.props?.megaMenuDropdown);
  if (toggle) {
    return /* @__PURE__ */ jsx(
      Dropdown,
      {
        inline: true,
        label: toggle,
        placement: "bottom",
        theme: theme.toggle,
        className: twMerge(theme.base, className),
        children
      }
    );
  }
  const id = useId();
  const ref = useRef(null);
  useEffect(() => {
    const toggle2 = ref.current?.closest("nav")?.querySelector('[aria-haspopup="menu"]');
    setLabelledBy(toggle2?.id);
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-labelledby": labelledBy,
      id,
      ref,
      role: "menu",
      className: twMerge(theme.base, className),
      ...restProps,
      children
    }
  );
}
MegaMenuDropdown.displayName = "MegaMenuDropdown";


//# sourceMappingURL=MegaMenuDropdown.js.map
