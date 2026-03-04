'use client';module.export({SidebarContext:()=>SidebarContext,useSidebarContext:()=>useSidebarContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const SidebarContext = createContext(void 0);
function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext should be used within the SidebarContext provider!");
  }
  return context;
}


//# sourceMappingURL=SidebarContext.js.map
