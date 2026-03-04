'use client';module.export({DrawerContext:()=>DrawerContext,useDrawerContext:()=>useDrawerContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const DrawerContext = createContext(void 0);
function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext should be used within the DrawerContext provider!");
  }
  return context;
}


//# sourceMappingURL=DrawerContext.js.map
