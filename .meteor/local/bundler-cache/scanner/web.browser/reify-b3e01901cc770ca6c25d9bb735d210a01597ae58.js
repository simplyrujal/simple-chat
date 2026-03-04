'use client';module.export({ModalContext:()=>ModalContext,useModalContext:()=>useModalContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const ModalContext = createContext(void 0);
function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext should be used within the ModalContext provider!");
  }
  return context;
}


//# sourceMappingURL=ModalContext.js.map
