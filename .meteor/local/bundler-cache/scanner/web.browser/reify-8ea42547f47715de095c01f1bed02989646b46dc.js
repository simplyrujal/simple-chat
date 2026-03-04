module.export({useVirtualizer:()=>useVirtualizer,useWindowVirtualizer:()=>useWindowVirtualizer});let React;module.link("react",{"*"(v){React=v}},0);let flushSync;module.link("react-dom",{flushSync(v){flushSync=v}},1);let Virtualizer,elementScroll,observeElementOffset,observeElementRect,windowScroll,observeWindowOffset,observeWindowRect;module.link("@tanstack/virtual-core",{Virtualizer(v){Virtualizer=v},elementScroll(v){elementScroll=v},observeElementOffset(v){observeElementOffset=v},observeElementRect(v){observeElementRect=v},windowScroll(v){windowScroll=v},observeWindowOffset(v){observeWindowOffset=v},observeWindowRect(v){observeWindowRect=v}},2);module.link("@tanstack/virtual-core",{"*":"*"},3);



const useIsomorphicLayoutEffect = typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;
function useVirtualizerBase({
  useFlushSync = true,
  ...options
}) {
  const rerender = React.useReducer(() => ({}), {})[1];
  const resolvedOptions = {
    ...options,
    onChange: (instance2, sync) => {
      var _a;
      if (useFlushSync && sync) {
        flushSync(rerender);
      } else {
        rerender();
      }
      (_a = options.onChange) == null ? void 0 : _a.call(options, instance2, sync);
    }
  };
  const [instance] = React.useState(
    () => new Virtualizer(resolvedOptions)
  );
  instance.setOptions(resolvedOptions);
  useIsomorphicLayoutEffect(() => {
    return instance._didMount();
  }, []);
  useIsomorphicLayoutEffect(() => {
    return instance._willUpdate();
  });
  return instance;
}
function useVirtualizer(options) {
  return useVirtualizerBase({
    observeElementRect,
    observeElementOffset,
    scrollToFn: elementScroll,
    ...options
  });
}
function useWindowVirtualizer(options) {
  return useVirtualizerBase({
    getScrollElement: () => typeof document !== "undefined" ? window : null,
    observeElementRect: observeWindowRect,
    observeElementOffset: observeWindowOffset,
    scrollToFn: windowScroll,
    initialOffset: () => typeof document !== "undefined" ? window.scrollY : 0,
    ...options
  });
}




//# sourceMappingURL=index.js.map
