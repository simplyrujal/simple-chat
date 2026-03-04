'use client';module.export({Floating:()=>Floating});let jsxs,Fragment,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},Fragment(v){Fragment=v},jsx(v){jsx=v}},0);let useFocus,autoUpdate;module.link('@floating-ui/react',{useFocus(v){useFocus=v},autoUpdate(v){autoUpdate=v}},1);let useRef,useState,useEffect;module.link('react',{useRef(v){useRef=v},useState(v){useState=v},useEffect(v){useEffect=v}},2);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},3);let useBaseFloating,useFloatingInteractions;module.link('../../hooks/use-floating.js',{useBaseFloating(v){useBaseFloating=v},useFloatingInteractions(v){useFloatingInteractions=v}},4);let getArrowPlacement;module.link('./helpers.js',{getArrowPlacement(v){getArrowPlacement=v}},5);







function Floating({
  animation = "duration-300",
  arrow = true,
  children,
  className,
  content,
  placement = "top",
  style = "dark",
  theme,
  trigger = "hover",
  minWidth,
  ...props
}) {
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);
  const floatingProperties = useBaseFloating({
    open,
    placement,
    arrowRef,
    setOpen
  });
  const {
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    refs,
    strategy,
    update,
    x,
    y
  } = floatingProperties;
  const focus = useFocus(context);
  const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
    context,
    role: "tooltip",
    trigger,
    interactions: [focus]
  });
  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, refs.floating, refs.reference, update]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: refs.setReference,
        className: theme.target,
        "data-testid": "flowbite-tooltip-target",
        ...getReferenceProps(),
        children
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: refs.setFloating,
        "data-testid": "flowbite-tooltip",
        ...getFloatingProps({
          className: twMerge(
            theme.base,
            animation && `${theme.animation} ${animation}`,
            !open && theme.hidden,
            theme.style[style],
            className
          ),
          style: {
            position: strategy,
            top: y ?? " ",
            left: x ?? " ",
            minWidth
          },
          ...props
        }),
        children: [
          /* @__PURE__ */ jsx("div", { className: theme.content, children: content }),
          arrow && /* @__PURE__ */ jsx(
            "div",
            {
              className: twMerge(
                theme.arrow.base,
                style === "dark" && theme.arrow.style.dark,
                style === "light" && theme.arrow.style.light,
                style === "auto" && theme.arrow.style.auto
              ),
              "data-testid": "flowbite-tooltip-arrow",
              ref: arrowRef,
              style: {
                top: arrowY ?? " ",
                left: arrowX ?? " ",
                right: " ",
                bottom: " ",
                [getArrowPlacement({ placement: floatingProperties.placement })]: theme.arrow.placement
              },
              children: "\xA0"
            }
          )
        ]
      }
    )
  ] });
}
Floating.displayName = "Floating";


//# sourceMappingURL=Floating.js.map
