'use client';module.export({SidebarItemContext:()=>SidebarItemContext,useSidebarItemContext:()=>useSidebarItemContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const SidebarItemContext = createContext(void 0);
function useSidebarItemContext() {
  const context = useContext(SidebarItemContext);
  if (!context) {
    throw new Error("useSidebarItemContext should be used within the SidebarItemContext provider!");
  }
  return context;
}


//# sourceMappingURL=SidebarItemContext.js.map
