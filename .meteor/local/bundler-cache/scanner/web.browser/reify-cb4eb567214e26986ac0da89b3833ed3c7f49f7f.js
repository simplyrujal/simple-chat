'use client';module.export({DatepickerContext:()=>DatepickerContext,useDatePickerContext:()=>useDatePickerContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const DatepickerContext = createContext(void 0);
function useDatePickerContext() {
  const context = useContext(DatepickerContext);
  if (!context) {
    throw new Error("useDatePickerContext should be used within the DatePickerContext provider!");
  }
  return context;
}


//# sourceMappingURL=DatepickerContext.js.map
