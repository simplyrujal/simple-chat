"use client";module.export({useInfiniteQuery:()=>useInfiniteQuery});let InfiniteQueryObserver;module.link("@tanstack/query-core",{InfiniteQueryObserver(v){InfiniteQueryObserver=v}},0);let useBaseQuery;module.link("./useBaseQuery.js",{useBaseQuery(v){useBaseQuery=v}},1);

// src/useInfiniteQuery.ts


function useInfiniteQuery(options, queryClient) {
  return useBaseQuery(
    options,
    InfiniteQueryObserver,
    queryClient
  );
}



//# sourceMappingURL=useInfiniteQuery.js.map