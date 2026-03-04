'use client';module.export({TimelineTime:()=>TimelineTime});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let timelineTheme;module.link('./theme.js',{timelineTheme(v){timelineTheme=v}},7);let useTimelineContentContext;module.link('./TimelineContentContext.js',{useTimelineContentContext(v){useTimelineContentContext=v}},8);let useTimelineContext;module.link('./TimelineContext.js',{useTimelineContext(v){useTimelineContext=v}},9);let useTimelineItemContext;module.link('./TimelineItemContext.js',{useTimelineItemContext(v){useTimelineItemContext=v}},10);












const TimelineTime = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme } = useTimelineContext();
  const { theme: itemTheme, clearTheme: itemClearTheme, applyTheme: itemApplyTheme } = useTimelineItemContext();
  const {
    theme: contentTheme,
    clearTheme: contentClearTheme,
    applyTheme: contentApplyTheme
  } = useTimelineContentContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [
      timelineTheme.item.content.time,
      provider.theme?.timeline?.item?.content?.time,
      rootTheme?.item?.content?.time,
      itemTheme?.content?.time,
      contentTheme?.time,
      props.theme
    ],
    [
      get(provider.clearTheme, "timeline.item.content.time"),
      get(rootClearTheme, "item.content.time"),
      get(itemClearTheme, "content.time"),
      get(contentClearTheme, "time"),
      props.clearTheme
    ],
    [
      get(provider.applyTheme, "timeline.item.content.time"),
      get(rootApplyTheme, "item.content.time"),
      get(itemApplyTheme, "content.time"),
      get(contentApplyTheme, "time"),
      props.applyTheme
    ]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.timelineTime);
  return /* @__PURE__ */ jsx("time", { ref, className: twMerge(theme.base, className), ...restProps });
});
TimelineTime.displayName = "TimelineTime";


//# sourceMappingURL=TimelineTime.js.map
