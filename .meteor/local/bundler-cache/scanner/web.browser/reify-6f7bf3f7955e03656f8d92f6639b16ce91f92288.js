'use client';module.export({TableHeadContext:()=>TableHeadContext,useTableHeadContext:()=>useTableHeadContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const TableHeadContext = createContext(void 0);
function useTableHeadContext() {
  const context = useContext(TableHeadContext);
  if (!context) {
    throw new Error("useTableHeadContext should be used within the TableHeadContext provider!");
  }
  return context;
}


//# sourceMappingURL=TableHeadContext.js.map
