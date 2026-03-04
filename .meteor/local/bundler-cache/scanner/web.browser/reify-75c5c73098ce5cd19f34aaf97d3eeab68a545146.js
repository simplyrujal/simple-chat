"use client";module.export({ReactQueryDevtools:()=>ReactQueryDevtools});let React;module.link("react",{"*"(v){React=v}},0);let onlineManager,useQueryClient;module.link("@tanstack/react-query",{onlineManager(v){onlineManager=v},useQueryClient(v){useQueryClient=v}},1);let TanstackQueryDevtools;module.link("@tanstack/query-devtools",{TanstackQueryDevtools(v){TanstackQueryDevtools=v}},2);let jsx;module.link("react/jsx-runtime",{jsx(v){jsx=v}},3);

// src/ReactQueryDevtools.tsx




function ReactQueryDevtools(props) {
  const queryClient = useQueryClient(props.client);
  const ref = React.useRef(null);
  const {
    buttonPosition,
    position,
    initialIsOpen,
    errorTypes,
    styleNonce,
    shadowDOMTarget,
    hideDisabledQueries,
    theme
  } = props;
  const [devtools] = React.useState(
    new TanstackQueryDevtools({
      client: queryClient,
      queryFlavor: "React Query",
      version: "5",
      onlineManager,
      buttonPosition,
      position,
      initialIsOpen,
      errorTypes,
      styleNonce,
      shadowDOMTarget,
      hideDisabledQueries,
      theme
    })
  );
  React.useEffect(() => {
    devtools.setClient(queryClient);
  }, [queryClient, devtools]);
  React.useEffect(() => {
    if (buttonPosition) {
      devtools.setButtonPosition(buttonPosition);
    }
  }, [buttonPosition, devtools]);
  React.useEffect(() => {
    if (position) {
      devtools.setPosition(position);
    }
  }, [position, devtools]);
  React.useEffect(() => {
    devtools.setInitialIsOpen(initialIsOpen || false);
  }, [initialIsOpen, devtools]);
  React.useEffect(() => {
    devtools.setErrorTypes(errorTypes || []);
  }, [errorTypes, devtools]);
  React.useEffect(() => {
    devtools.setTheme(theme);
  }, [theme, devtools]);
  React.useEffect(() => {
    if (ref.current) {
      devtools.mount(ref.current);
    }
    return () => {
      devtools.unmount();
    };
  }, [devtools]);
  return /* @__PURE__ */ jsx("div", { dir: "ltr", className: "tsqd-parent-container", ref });
}



//# sourceMappingURL=ReactQueryDevtools.js.map