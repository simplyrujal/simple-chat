'use client';module.export({Tabs:()=>Tabs});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef,useId,useMemo,Children,useRef,useState,useEffect,useImperativeHandle;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v},useMemo(v){useMemo=v},Children(v){Children=v},useRef(v){useRef=v},useState(v){useState=v},useEffect(v){useEffect=v},useImperativeHandle(v){useImperativeHandle=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let tabsTheme;module.link('./theme.js',{tabsTheme(v){tabsTheme=v}},7);









const Tabs = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [tabsTheme, provider.theme?.tabs, props.theme],
    [get(provider.clearTheme, "tabs"), props.clearTheme],
    [get(provider.applyTheme, "tabs"), props.applyTheme]
  );
  const {
    children,
    className,
    onActiveTabChange,
    variant = "default",
    ...restProps
  } = resolveProps(props, provider.props?.tabs);
  const id = useId();
  const tabs = useMemo(
    () => Children.map(Children.toArray(children), ({ props: props2 }) => props2),
    [children]
  );
  const tabRefs = useRef([]);
  const [activeTab, setActiveTab] = useState(
    Math.max(
      0,
      tabs.findIndex((tab) => tab.active)
    )
  );
  const [focusedTab, setFocusedTab] = useState(-1);
  function setActiveTabWithCallback(activeTab2) {
    setActiveTab(activeTab2);
    if (onActiveTabChange) onActiveTabChange(activeTab2);
  }
  function handleClick({ target }) {
    setActiveTabWithCallback(target);
    setFocusedTab(target);
  }
  function handleKeyboard({ event, target }) {
    if (event.key === "ArrowLeft") {
      setFocusedTab(Math.max(0, focusedTab - 1));
    }
    if (event.key === "ArrowRight") {
      setFocusedTab(Math.min(tabs.length - 1, focusedTab + 1));
    }
    if (event.key === "Enter") {
      setActiveTabWithCallback(target);
      setFocusedTab(target);
    }
  }
  const tabItemStyle = theme.tablist.tabitem.variant[variant];
  const tabItemContainerStyle = theme.tabitemcontainer.variant[variant];
  useEffect(() => {
    tabRefs.current[focusedTab]?.focus();
  }, [focusedTab]);
  useImperativeHandle(ref, () => ({
    setActiveTab: setActiveTabWithCallback
  }));
  return /* @__PURE__ */ jsxs("div", { className: twMerge(theme.base, className), children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-label": "Tabs",
        role: "tablist",
        className: twMerge(theme.tablist.base, theme.tablist.variant[variant], className),
        ...restProps,
        children: tabs.map((tab, index) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-controls": `${id}-tabpanel-${index}`,
            "aria-selected": index === activeTab,
            className: twMerge(
              theme.tablist.tabitem.base,
              tabItemStyle.base,
              index === activeTab && tabItemStyle.active.on,
              index !== activeTab && !tab.disabled && tabItemStyle.active.off
            ),
            disabled: tab.disabled,
            id: `${id}-tab-${index}`,
            onClick: () => handleClick({ target: index }),
            onKeyDown: (event) => handleKeyboard({ event, target: index }),
            ref: (element) => {
              tabRefs.current[index] = element;
            },
            role: "tab",
            tabIndex: index === focusedTab ? 0 : -1,
            style: { zIndex: index === focusedTab ? 2 : 1 },
            children: [
              tab.icon && /* @__PURE__ */ jsx(tab.icon, { className: theme.tablist.tabitem.icon }),
              tab.title
            ]
          },
          index
        ))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: twMerge(theme.tabitemcontainer.base, tabItemContainerStyle), children: tabs.map((tab, index) => /* @__PURE__ */ jsx(
      "div",
      {
        "aria-labelledby": `${id}-tab-${index}`,
        className: theme.tabpanel,
        hidden: index !== activeTab,
        id: `${id}-tabpanel-${index}`,
        role: "tabpanel",
        tabIndex: 0,
        children: tab.children
      },
      index
    )) })
  ] });
});
Tabs.displayName = "Tabs";


//# sourceMappingURL=Tabs.js.map
