"use client";module.export({useSuspenseQueries:()=>useSuspenseQueries});let skipToken;module.link("@tanstack/query-core",{skipToken(v){skipToken=v}},0);let useQueries;module.link("./useQueries.js",{useQueries(v){useQueries=v}},1);let defaultThrowOnError;module.link("./suspense.js",{defaultThrowOnError(v){defaultThrowOnError=v}},2);

// src/useSuspenseQueries.ts



function useSuspenseQueries(options, queryClient) {
  return useQueries(
    {
      ...options,
      queries: options.queries.map((query) => {
        if (process.env.NODE_ENV !== "production") {
          if (query.queryFn === skipToken) {
            console.error("skipToken is not allowed for useSuspenseQueries");
          }
        }
        return {
          ...query,
          suspense: true,
          throwOnError: defaultThrowOnError,
          enabled: true,
          placeholderData: void 0
        };
      })
    },
    queryClient
  );
}



//# sourceMappingURL=useSuspenseQueries.js.map