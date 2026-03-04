'use client';module.export({TimelineBody:()=>TimelineBody});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let timelineTheme;module.link('./theme.js',{timelineTheme(v){timelineTheme=v}},7);let useTimelineContentContext;module.link('./TimelineContentContext.js',{useTimelineContentContext(v){useTimelineContentContext=v}},8);let useTimelineContext;module.link('./TimelineContext.js',{useTimelineContext(v){useTimelineContext=v}},9);let useTimelineItemContext;module.link('./TimelineItemContext.js',{useTimelineItemContext(v){useTimelineItemContext=v}},10);












const TimelineBody = forwardRef((props, ref) => {
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
      timelineTheme.item.content.body,
      provider.theme?.timeline?.item?.content?.body,
      rootTheme?.item?.content?.body,
      itemTheme?.content?.body,
      contentTheme?.body,
      props.theme
    ],
    [
      get(provider.clearTheme, "timeline.item.content.body"),
      get(rootClearTheme, "item.content.body"),
      get(itemClearTheme, "content.body"),
      get(contentClearTheme, "body"),
      props.clearTheme
    ],
    [
      get(provider.applyTheme, "timeline.item.content.body"),
      get(rootApplyTheme, "item.content.body"),
      get(itemApplyTheme, "content.body"),
      get(contentApplyTheme, "body"),
      props.applyTheme
    ]
  );
  const { className, ...restProps } = resolveProps(props, provider.props?.timelineBody);
  return /* @__PURE__ */ jsx("div", { ref, className: twMerge(theme.base, className), ...restProps });
});
TimelineBody.displayName = "TimelineBody";


//# sourceMappingURL=TimelineBody.js.map
