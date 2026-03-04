'use client';module.export({Carousel:()=>Carousel});let jsxs,jsx,Fragment;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},jsx(v){jsx=v},Fragment(v){Fragment=v}},0);let forwardRef,useRef,useState,useMemo,Children,cloneElement,useCallback,useEffect;module.link('react',{forwardRef(v){forwardRef=v},useRef(v){useRef=v},useState(v){useState=v},useMemo(v){useMemo=v},Children(v){Children=v},cloneElement(v){cloneElement=v},useCallback(v){useCallback=v},useEffect(v){useEffect=v}},1);let ScrollContainer;module.link('../../helpers/drag-scroll.js',{default(v){ScrollContainer=v}},2);let get;module.link('../../helpers/get.js',{get(v){get=v}},3);let isClient;module.link('../../helpers/is-client.js',{isClient(v){isClient=v}},4);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},5);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},6);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},7);let ChevronLeftIcon;module.link('../../icons/chevron-left-icon.js',{ChevronLeftIcon(v){ChevronLeftIcon=v}},8);let ChevronRightIcon;module.link('../../icons/chevron-right-icon.js',{ChevronRightIcon(v){ChevronRightIcon=v}},9);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},10);let carouselTheme;module.link('./theme.js',{carouselTheme(v){carouselTheme=v}},11);













const Carousel = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [carouselTheme, provider.theme?.carousel, props.theme],
    [get(provider.clearTheme, "carousel"), props.clearTheme],
    [get(provider.applyTheme, "carousel"), props.applyTheme]
  );
  const {
    children,
    indicators = true,
    leftControl,
    rightControl,
    slide = true,
    draggable = true,
    slideInterval,
    className,
    onSlideChange,
    pauseOnHover = false,
    ...restProps
  } = resolveProps(props, provider.props?.carousel);
  const isDeviceMobile = isClient() && navigator.userAgent.indexOf("IEMobile") !== -1;
  const carouselContainer = useRef(null);
  const [activeItem, setActiveItem] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const didMountRef = useRef(false);
  const items = useMemo(
    () => Children.map(
      children,
      (child) => cloneElement(child, {
        className: twMerge(theme.item.base, child.props.className)
      })
    ),
    [children, theme.item.base]
  );
  const navigateTo = useCallback(
    (item) => () => {
      if (!items) return;
      item = (item + items.length) % items.length;
      if (carouselContainer.current) {
        carouselContainer.current.scrollLeft = carouselContainer.current.clientWidth * item;
      }
      setActiveItem(item);
    },
    [items]
  );
  useEffect(() => {
    if (carouselContainer.current && !isDragging && carouselContainer.current.scrollLeft !== 0) {
      setActiveItem(Math.round(carouselContainer.current.scrollLeft / carouselContainer.current.clientWidth));
    }
  }, [isDragging]);
  useEffect(() => {
    if (slide && !(pauseOnHover && isHovering)) {
      const intervalId = setInterval(() => !isDragging && navigateTo(activeItem + 1)(), slideInterval ?? 3e3);
      return () => clearInterval(intervalId);
    }
  }, [activeItem, isDragging, navigateTo, slide, slideInterval, pauseOnHover, isHovering]);
  useEffect(() => {
    if (didMountRef.current) {
      onSlideChange?.(activeItem);
    } else {
      didMountRef.current = true;
    }
  }, [onSlideChange, activeItem]);
  const handleDragging = (dragging) => () => setIsDragging(dragging);
  const setHoveringTrue = useCallback(() => setIsHovering(true), []);
  const setHoveringFalse = useCallback(() => setIsHovering(false), []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: twMerge(theme.root.base, className),
      "data-testid": "carousel",
      onMouseEnter: setHoveringTrue,
      onMouseLeave: setHoveringFalse,
      onTouchStart: setHoveringTrue,
      onTouchEnd: setHoveringFalse,
      ...restProps,
      children: [
        /* @__PURE__ */ jsx(
          ScrollContainer,
          {
            className: twMerge(theme.scrollContainer.base, (isDeviceMobile || !isDragging) && theme.scrollContainer.snap),
            draggingClassName: "cursor-grab",
            innerRef: carouselContainer,
            onEndScroll: handleDragging(false),
            onStartScroll: handleDragging(draggable),
            vertical: false,
            horizontal: draggable,
            children: items?.map((item, index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: theme.item.wrapper[draggable ? "on" : "off"],
                "data-active": activeItem === index,
                "data-testid": "carousel-item",
                children: item
              },
              index
            ))
          }
        ),
        indicators && /* @__PURE__ */ jsx("div", { className: theme.indicators.wrapper, children: items?.map((_, index) => /* @__PURE__ */ jsx(
          "button",
          {
            className: twMerge(theme.indicators.base, theme.indicators.active[index === activeItem ? "on" : "off"]),
            onClick: navigateTo(index),
            "data-testid": "carousel-indicator",
            "aria-label": `Slide ${index + 1}`
          },
          index
        )) }),
        items && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: theme.root.leftControl, children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "group",
              "data-testid": "carousel-left-control",
              onClick: navigateTo(activeItem - 1),
              type: "button",
              "aria-label": "Previous slide",
              children: leftControl ? leftControl : /* @__PURE__ */ jsx(DefaultLeftControl, { theme: theme.control })
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: theme.root.rightControl, children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "group",
              "data-testid": "carousel-right-control",
              onClick: navigateTo(activeItem + 1),
              type: "button",
              "aria-label": "Next slide",
              children: rightControl ? rightControl : /* @__PURE__ */ jsx(DefaultRightControl, { theme: theme.control })
            }
          ) })
        ] })
      ]
    }
  );
});
Carousel.displayName = "Carousel";
function DefaultLeftControl({ theme }) {
  return /* @__PURE__ */ jsx("span", { className: theme.base, children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: theme.icon }) });
}
function DefaultRightControl({ theme }) {
  return /* @__PURE__ */ jsx("span", { className: theme.base, children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: theme.icon }) });
}


//# sourceMappingURL=Carousel.js.map
