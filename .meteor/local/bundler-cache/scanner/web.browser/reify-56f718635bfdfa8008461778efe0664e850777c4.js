'use client';module.export({TimelineContext:()=>TimelineContext,useTimelineContext:()=>useTimelineContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const TimelineContext = createContext(void 0);
function useTimelineContext() {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimelineContext should be used within the TimelineContext provider!");
  }
  return context;
}


//# sourceMappingURL=TimelineContext.js.map
