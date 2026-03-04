'use client';module.export({AccordionPanelContext:()=>AccordionPanelContext,useAccordionContext:()=>useAccordionContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const AccordionPanelContext = createContext(void 0);
function useAccordionContext() {
  const context = useContext(AccordionPanelContext);
  if (!context) {
    throw new Error("useAccordionContext should be used within the AccordionPanelContext provider!");
  }
  return context;
}


//# sourceMappingURL=AccordionPanelContext.js.map
