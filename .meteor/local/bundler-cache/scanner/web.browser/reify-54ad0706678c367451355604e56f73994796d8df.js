'use client';module.export({TimelineItemContext:()=>TimelineItemContext,useTimelineItemContext:()=>useTimelineItemContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const TimelineItemContext = createContext(void 0);
function useTimelineItemContext() {
  const context = useContext(TimelineItemContext);
  if (!context) {
    throw new Error("useTimelineItemContext should be used within the TimelineItemContext provider!");
  }
  return context;
}


//# sourceMappingURL=TimelineItemContext.js.map
