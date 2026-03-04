"use client";module.export({QueryClientContext:()=>QueryClientContext,QueryClientProvider:()=>QueryClientProvider,useQueryClient:()=>useQueryClient});let React;module.link("react",{"*"(v){React=v}},0);let jsx;module.link("react/jsx-runtime",{jsx(v){jsx=v}},1);

// src/QueryClientProvider.tsx


var QueryClientContext = React.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = React.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
var QueryClientProvider = ({
  client,
  children
}) => {
  React.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ jsx(QueryClientContext.Provider, { value: client, children });
};





//# sourceMappingURL=QueryClientProvider.js.map