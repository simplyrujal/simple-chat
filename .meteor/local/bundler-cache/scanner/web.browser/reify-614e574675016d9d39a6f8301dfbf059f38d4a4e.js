'use client';module.export({TimelineItem:()=>TimelineItem});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let timelineTheme;module.link('./theme.js',{timelineTheme(v){timelineTheme=v}},7);let useTimelineContext;module.link('./TimelineContext.js',{useTimelineContext(v){useTimelineContext=v}},8);let TimelineItemContext;module.link('./TimelineItemContext.js',{TimelineItemContext(v){TimelineItemContext=v}},9);











const TimelineItem = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, horizontal } = useTimelineContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [timelineTheme.item, provider.theme?.timeline?.item, rootTheme?.item, props.theme],
    [get(provider.clearTheme, "timeline.item"), get(rootClearTheme, "item"), props.clearTheme],
    [get(provider.applyTheme, "timeline.item"), get(rootApplyTheme, "item"), props.applyTheme]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.timelineItem);
  return /* @__PURE__ */ jsx(
    TimelineItemContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme },
      children: /* @__PURE__ */ jsx(
        "li",
        {
          ref,
          "data-testid": "timeline-item",
          className: twMerge(horizontal && theme.root.horizontal, !horizontal && theme.root.vertical, className),
          ...restProps
        }
      )
    }
  );
});
TimelineItem.displayName = "TimelineItem";


//# sourceMappingURL=TimelineItem.js.map
