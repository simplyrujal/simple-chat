'use client';module.export({TimelinePoint:()=>TimelinePoint});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let timelineTheme;module.link('./theme.js',{timelineTheme(v){timelineTheme=v}},7);let useTimelineContext;module.link('./TimelineContext.js',{useTimelineContext(v){useTimelineContext=v}},8);let useTimelineItemContext;module.link('./TimelineItemContext.js',{useTimelineItemContext(v){useTimelineItemContext=v}},9);











const TimelinePoint = forwardRef((props, ref) => {
  const { theme: rootTheme, clearTheme: rootClearTheme, applyTheme: rootApplyTheme, horizontal } = useTimelineContext();
  const { theme: itemTheme, clearTheme: itemClearTheme, applyTheme: itemApplyTheme } = useTimelineItemContext();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [
      timelineTheme.item.point,
      provider.theme?.timeline?.item?.point,
      rootTheme?.item?.point,
      itemTheme?.point,
      props.theme
    ],
    [
      get(provider.clearTheme, "timeline.item.point"),
      get(rootClearTheme, "item.point"),
      get(itemClearTheme, "point"),
      props.clearTheme
    ],
    [
      get(provider.applyTheme, "timeline.item.point"),
      get(rootApplyTheme, "item.point"),
      get(itemApplyTheme, "point"),
      props.applyTheme
    ]
  );
  const { children, className, icon: Icon, ...restProps } = resolveProps(props, provider.props?.timelinePoint);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      "data-testid": "timeline-point",
      className: twMerge(horizontal && theme.horizontal, !horizontal && theme.vertical, className),
      ...restProps,
      children: [
        children,
        Icon ? /* @__PURE__ */ jsx("span", { className: twMerge(theme.marker.icon.wrapper), children: /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, className: twMerge(theme.marker.icon.base) }) }) : /* @__PURE__ */ jsx(
          "div",
          {
            className: twMerge(horizontal && theme.marker.base.horizontal, !horizontal && theme.marker.base.vertical)
          }
        ),
        horizontal && /* @__PURE__ */ jsx("div", { className: twMerge(theme.line) })
      ]
    }
  );
});
TimelinePoint.displayName = "TimelinePoint";


//# sourceMappingURL=TimelinePoint.js.map
