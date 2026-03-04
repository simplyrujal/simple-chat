"use client";module.export({useSuspenseInfiniteQuery:()=>useSuspenseInfiniteQuery});let InfiniteQueryObserver,skipToken;module.link("@tanstack/query-core",{InfiniteQueryObserver(v){InfiniteQueryObserver=v},skipToken(v){skipToken=v}},0);let useBaseQuery;module.link("./useBaseQuery.js",{useBaseQuery(v){useBaseQuery=v}},1);let defaultThrowOnError;module.link("./suspense.js",{defaultThrowOnError(v){defaultThrowOnError=v}},2);

// src/useSuspenseInfiniteQuery.ts



function useSuspenseInfiniteQuery(options, queryClient) {
  if (process.env.NODE_ENV !== "production") {
    if (options.queryFn === skipToken) {
      console.error("skipToken is not allowed for useSuspenseInfiniteQuery");
    }
  }
  return useBaseQuery(
    {
      ...options,
      enabled: true,
      suspense: true,
      throwOnError: defaultThrowOnError
    },
    InfiniteQueryObserver,
    queryClient
  );
}



//# sourceMappingURL=useSuspenseInfiniteQuery.js.map