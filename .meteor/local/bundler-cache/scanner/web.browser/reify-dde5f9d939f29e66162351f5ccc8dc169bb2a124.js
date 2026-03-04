'use client';module.export({MegaMenuDropdownToggle:()=>MegaMenuDropdownToggle});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef,useId,useRef,useState,useEffect;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v},useRef(v){useRef=v},useState(v){useState=v},useEffect(v){useEffect=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let mergeRefs;module.link('../../helpers/merge-refs.js',{mergeRefs(v){mergeRefs=v}},3);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},4);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},5);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},6);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},7);let megaMenuTheme;module.link('./theme.js',{megaMenuTheme(v){megaMenuTheme=v}},8);










const MegaMenuDropdownToggle = forwardRef((props, ref) => {
  const id = useId();
  const innerRef = useRef(null);
  const [controls, setControls] = useState(void 0);
  const [isExpanded, setExpanded] = useState(void 0);
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [megaMenuTheme.dropdownToggle, provider.theme?.megaMenu?.dropdownToggle, props.theme],
    [get(provider.clearTheme, "megaMenu.dropdownToggle"), props.clearTheme],
    [get(provider.applyTheme, "megaMenu.dropdownToggle"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.megaMenuDropdownToggle);
  function findDropdown() {
    const megaMenu = innerRef.current?.closest("nav");
    return megaMenu?.querySelector('[role="menu"]');
  }
  function onClick() {
    findDropdown()?.classList.toggle("hidden");
    setExpanded(!isExpanded);
  }
  useEffect(() => {
    const dropdown = findDropdown();
    const isDropdownHidden = dropdown?.classList.contains("hidden");
    setControls(dropdown?.id);
    setExpanded(!isDropdownHidden);
  }, []);
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref: mergeRefs([ref, innerRef]),
      "aria-controls": controls,
      "aria-expanded": isExpanded,
      "aria-haspopup": "menu",
      id,
      onClick,
      className: twMerge(theme.base, className),
      ...restProps
    }
  );
});
MegaMenuDropdownToggle.displayName = "MegaMenuDropdownToggle";


//# sourceMappingURL=MegaMenuDropdownToggle.js.map
