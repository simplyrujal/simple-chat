'use client';module.export({TimelineContent:()=>TimelineContent});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let timelineTheme;module.link('./theme.js',{timelineTheme(v){timelineTheme=v}},7);let TimelineContentContext;module.link('./TimelineContentContext.js',{TimelineContentContext(v){TimelineContentContext=v}},8);let useTimelineContext;module.link('./TimelineContext.js',{useTimelineContext(v){useTimelineContext=v}},9);let useTimelineItemContext;module.link('./TimelineItemContext.js',{useTimelineItemContext(v){useTimelineItemContext=v}},10);












const TimelineContent = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, horizontal } = useTimelineContext();
  const { theme: itemTheme, clearTheme: itemClearTheme, applyTheme: itemApplyTheme } = useTimelineItemContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [
      timelineTheme.item.content,
      provider.theme?.timeline?.item?.content,
      rootTheme?.item?.content,
      itemTheme?.content,
      props.theme
    ],
    [
      get(provider.clearTheme, "timeline.item.content"),
      get(rootClearTheme, "item.content"),
      get(itemClearTheme, "content"),
      props.clearTheme
    ],
    [
      get(provider.applyTheme, "timeline.item.content"),
      get(rootApplyTheme, "item.content"),
      get(itemApplyTheme, "content"),
      props.applyTheme
    ]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.timelineContent);
  return /* @__PURE__ */ jsx(
    TimelineContentContext.Provider,
    {
      value: { theme: props.theme, clearTheme: props.clearTheme, applyTheme: props.applyTheme },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-testid": "timeline-content",
          className: twMerge(theme.root.base, horizontal ? theme.root.horizontal : theme.root.vertical, className),
          ...restProps
        }
      )
    }
  );
});
TimelineContent.displayName = "TimelineContent";


//# sourceMappingURL=TimelineContent.js.map
