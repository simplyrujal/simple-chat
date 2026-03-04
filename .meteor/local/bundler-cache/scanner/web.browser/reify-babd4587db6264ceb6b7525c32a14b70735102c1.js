'use client';module.export({TableContext:()=>TableContext,useTableContext:()=>useTableContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const TableContext = createContext(void 0);
function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext should be used within the TableContext provider!");
  }
  return context;
}


//# sourceMappingURL=TableContext.js.map
