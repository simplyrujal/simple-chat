'use client';module.export({Timeline:()=>Timeline});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let timelineTheme;module.link('./theme.js',{timelineTheme(v){timelineTheme=v}},7);let TimelineContext;module.link('./TimelineContext.js',{TimelineContext(v){TimelineContext=v}},8);










const Timeline = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [timelineTheme, provider.theme?.timeline, props.theme],
    [get(provider.clearTheme, "timeline"), props.clearTheme],
    [get(provider.applyTheme, "timeline"), props.applyTheme]
  );
  const { className, horizontal, ...restProps } = resolveProps(props, provider.props?.timeline);
  return /* @__PURE__ */ jsx(
    TimelineContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme, horizontal },
      children: /* @__PURE__ */ jsx(
        "ol",
        {
          ref,
          "data-testid": "timeline-component",
          className: twMerge(
            horizontal && theme.root.direction.horizontal,
            !horizontal && theme.root.direction.vertical,
            className
          ),
          ...restProps
        }
      )
    }
  );
});
Timeline.displayName = "Timeline";


//# sourceMappingURL=Timeline.js.map
