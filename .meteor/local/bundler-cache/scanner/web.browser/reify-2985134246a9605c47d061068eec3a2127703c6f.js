"use client";module.export({ReactQueryDevtoolsPanel:()=>ReactQueryDevtoolsPanel});let React;module.link("react",{"*"(v){React=v}},0);let onlineManager,useQueryClient;module.link("@tanstack/react-query",{onlineManager(v){onlineManager=v},useQueryClient(v){useQueryClient=v}},1);let TanstackQueryDevtoolsPanel;module.link("@tanstack/query-devtools",{TanstackQueryDevtoolsPanel(v){TanstackQueryDevtoolsPanel=v}},2);let jsx;module.link("react/jsx-runtime",{jsx(v){jsx=v}},3);

// src/ReactQueryDevtoolsPanel.tsx




function ReactQueryDevtoolsPanel(props) {
  const queryClient = useQueryClient(props.client);
  const ref = React.useRef(null);
  const {
    errorTypes,
    styleNonce,
    shadowDOMTarget,
    hideDisabledQueries,
    theme
  } = props;
  const [devtools] = React.useState(
    new TanstackQueryDevtoolsPanel({
      client: queryClient,
      queryFlavor: "React Query",
      version: "5",
      onlineManager,
      buttonPosition: "bottom-left",
      position: "bottom",
      initialIsOpen: true,
      errorTypes,
      styleNonce,
      shadowDOMTarget,
      onClose: props.onClose,
      hideDisabledQueries,
      theme
    })
  );
  React.useEffect(() => {
    devtools.setClient(queryClient);
  }, [queryClient, devtools]);
  React.useEffect(() => {
    devtools.setOnClose(props.onClose ?? (() => {
    }));
  }, [props.onClose, devtools]);
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: { height: "500px", ...props.style },
      className: "tsqd-parent-container",
      ref
    }
  );
}



//# sourceMappingURL=ReactQueryDevtoolsPanel.js.map