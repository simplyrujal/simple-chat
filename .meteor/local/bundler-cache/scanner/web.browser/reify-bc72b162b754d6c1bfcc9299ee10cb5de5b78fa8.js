"use client";module.export({useQuery:()=>useQuery});let QueryObserver;module.link("@tanstack/query-core",{QueryObserver(v){QueryObserver=v}},0);let useBaseQuery;module.link("./useBaseQuery.js",{useBaseQuery(v){useBaseQuery=v}},1);

// src/useQuery.ts


function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver, queryClient);
}



//# sourceMappingURL=useQuery.js.map