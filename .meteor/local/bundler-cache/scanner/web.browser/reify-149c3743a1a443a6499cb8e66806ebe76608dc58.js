'use client';module.export({RatingContext:()=>RatingContext,useRatingContext:()=>useRatingContext});let createContext,useContext;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v}},0);


const RatingContext = createContext(void 0);
function useRatingContext() {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRatingContext should be used within the RatingContext provider!");
  }
  return context;
}


//# sourceMappingURL=RatingContext.js.map
