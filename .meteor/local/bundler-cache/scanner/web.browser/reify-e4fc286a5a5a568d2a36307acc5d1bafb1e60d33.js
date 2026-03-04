'use client';module.export({NavbarContext:()=>NavbarContext,useNavbarContext:()=>useNavbarContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const NavbarContext = createContext(void 0);
function useNavbarContext() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavBarContext should be used within the NavbarContext provider!");
  }
  return context;
}


//# sourceMappingURL=NavbarContext.js.map
