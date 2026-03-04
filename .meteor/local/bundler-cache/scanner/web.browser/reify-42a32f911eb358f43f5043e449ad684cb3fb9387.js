"use client";module.export({useSuspenseQuery:()=>useSuspenseQuery});let QueryObserver,skipToken;module.link("@tanstack/query-core",{QueryObserver(v){QueryObserver=v},skipToken(v){skipToken=v}},0);let useBaseQuery;module.link("./useBaseQuery.js",{useBaseQuery(v){useBaseQuery=v}},1);let defaultThrowOnError;module.link("./suspense.js",{defaultThrowOnError(v){defaultThrowOnError=v}},2);

// src/useSuspenseQuery.ts



function useSuspenseQuery(options, queryClient) {
  if (process.env.NODE_ENV !== "production") {
    if (options.queryFn === skipToken) {
      console.error("skipToken is not allowed for useSuspenseQuery");
    }
  }
  return useBaseQuery(
    {
      ...options,
      enabled: true,
      suspense: true,
      throwOnError: defaultThrowOnError,
      placeholderData: void 0
    },
    QueryObserver,
    queryClient
  );
}



//# sourceMappingURL=useSuspenseQuery.js.map