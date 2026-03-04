'use client';module.export({ToastContext:()=>ToastContext,useToastContext:()=>useToastContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const ToastContext = createContext(void 0);
function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext should be used within the ToastContext provider!");
  }
  return context;
}


//# sourceMappingURL=ToastContext.js.map
