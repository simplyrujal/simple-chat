'use client';module.export({DropdownContext:()=>DropdownContext,useDropdownContext:()=>useDropdownContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const DropdownContext = createContext(void 0);
function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdownContext should be used within the DropdownContext provider!");
  }
  return context;
}


//# sourceMappingURL=DropdownContext.js.map
