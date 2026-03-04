'use client';module.export({TableBodyContext:()=>TableBodyContext,useTableBodyContext:()=>useTableBodyContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const TableBodyContext = createContext(void 0);
function useTableBodyContext() {
  const context = useContext(TableBodyContext);
  if (!context) {
    throw new Error("useTableBodyContext should be used within the TableBodyContext provider!");
  }
  return context;
}


//# sourceMappingURL=TableBodyContext.js.map
