"use client";module.export({HydrationBoundary:()=>HydrationBoundary});let React;module.link("react",{"*"(v){React=v}},0);let hydrate;module.link("@tanstack/query-core",{hydrate(v){hydrate=v}},1);let useQueryClient;module.link("./QueryClientProvider.js",{useQueryClient(v){useQueryClient=v}},2);

// src/HydrationBoundary.tsx



var HydrationBoundary = ({
  children,
  options = {},
  state,
  queryClient
}) => {
  const client = useQueryClient(queryClient);
  const optionsRef = React.useRef(options);
  React.useEffect(() => {
    optionsRef.current = options;
  });
  const hydrationQueue = React.useMemo(() => {
    if (state) {
      if (typeof state !== "object") {
        return;
      }
      const queryCache = client.getQueryCache();
      const queries = state.queries || [];
      const newQueries = [];
      const existingQueries = [];
      for (const dehydratedQuery of queries) {
        const existingQuery = queryCache.get(dehydratedQuery.queryHash);
        if (!existingQuery) {
          newQueries.push(dehydratedQuery);
        } else {
          const hydrationIsNewer = dehydratedQuery.state.dataUpdatedAt > existingQuery.state.dataUpdatedAt || dehydratedQuery.promise && existingQuery.state.status !== "pending" && existingQuery.state.fetchStatus !== "fetching" && dehydratedQuery.dehydratedAt !== void 0 && dehydratedQuery.dehydratedAt > existingQuery.state.dataUpdatedAt;
          if (hydrationIsNewer) {
            existingQueries.push(dehydratedQuery);
          }
        }
      }
      if (newQueries.length > 0) {
        hydrate(client, { queries: newQueries }, optionsRef.current);
      }
      if (existingQueries.length > 0) {
        return existingQueries;
      }
    }
    return void 0;
  }, [client, state]);
  React.useEffect(() => {
    if (hydrationQueue) {
      hydrate(client, { queries: hydrationQueue }, optionsRef.current);
    }
  }, [client, hydrationQueue]);
  return children;
};



//# sourceMappingURL=HydrationBoundary.js.map