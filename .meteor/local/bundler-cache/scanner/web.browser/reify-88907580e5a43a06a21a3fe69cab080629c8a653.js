module.export({StoreInit:()=>StoreInit});let jsxs,Fragment,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},Fragment(v){Fragment=v},jsx(v){jsx=v}},0);let StoreInitClient;module.link('./client.js',{StoreInitClient(v){StoreInitClient=v}},1);let StoreInitServer;module.link('./server.js',{StoreInitServer(v){StoreInitServer=v}},2);



function StoreInit(props) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StoreInitServer, { ...props }),
    /* @__PURE__ */ jsx(StoreInitClient, { ...props })
  ] });
}
StoreInit.displayName = "StoreInit";


//# sourceMappingURL=index.js.map
