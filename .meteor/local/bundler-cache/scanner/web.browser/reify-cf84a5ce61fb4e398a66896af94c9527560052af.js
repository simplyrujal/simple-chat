'use client';module.export({Progress:()=>Progress});let jsxs,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v}},0);let forwardRef,useId;module.link('react',{forwardRef(v){forwardRef=v},useId(v){useId=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},6);let progressTheme;module.link('./theme.js',{progressTheme(v){progressTheme=v}},7);









const Progress = forwardRef((props, ref) => {
  const id = useId();
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [progressTheme, provider.theme?.progress, props.theme],
    [get(provider.clearTheme, "progress"), props.clearTheme],
    [get(provider.applyTheme, "progress"), props.applyTheme]
  );
  const {
    className,
    color = "default",
    labelProgress = false,
    labelText = false,
    progress,
    progressLabelPosition = "inside",
    size = "md",
    textLabel = "progressbar",
    textLabelPosition = "inside",
    ...restProps
  } = resolveProps(props, provider.props?.progress);
  return /* @__PURE__ */ jsxs("div", { ref, id, "aria-label": textLabel, "aria-valuenow": progress, role: "progressbar", ...restProps, children: [
    (textLabel && labelText && textLabelPosition === "outside" || progress > 0 && labelProgress && progressLabelPosition === "outside") && /* @__PURE__ */ jsxs("div", { className: theme.label, "data-testid": "flowbite-progress-outer-label-container", children: [
      textLabel && labelText && textLabelPosition === "outside" && /* @__PURE__ */ jsx("span", { "data-testid": "flowbite-progress-outer-text-label", children: textLabel }),
      labelProgress && progressLabelPosition === "outside" && /* @__PURE__ */ jsxs("span", { "data-testid": "flowbite-progress-outer-progress-label", children: [
        progress,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: twMerge(theme.base, theme.size[size], className), children: /* @__PURE__ */ jsxs("div", { style: { width: `${progress}%` }, className: twMerge(theme.bar, theme.color[color], theme.size[size]), children: [
      textLabel && labelText && textLabelPosition === "inside" && /* @__PURE__ */ jsx("span", { "data-testid": "flowbite-progress-inner-text-label", children: textLabel }),
      progress > 0 && labelProgress && progressLabelPosition === "inside" && /* @__PURE__ */ jsxs("span", { "data-testid": "flowbite-progress-inner-progress-label", children: [
        progress,
        "%"
      ] })
    ] }) })
  ] });
});
Progress.displayName = "Progress";


//# sourceMappingURL=Progress.js.map
