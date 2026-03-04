'use client';module.export({TimelineContentContext:()=>TimelineContentContext,useTimelineContentContext:()=>useTimelineContentContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const TimelineContentContext = createContext(void 0);
function useTimelineContentContext() {
  const context = useContext(TimelineContentContext);
  if (!context) {
    throw new Error("useTimelineContentContext should be used within the TimelineContentContext provider!");
  }
  return context;
}


//# sourceMappingURL=TimelineContentContext.js.map
