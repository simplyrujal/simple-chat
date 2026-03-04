"use client";module.export({useIsFetching:()=>useIsFetching});let React;module.link("react",{"*"(v){React=v}},0);let notifyManager;module.link("@tanstack/query-core",{notifyManager(v){notifyManager=v}},1);let useQueryClient;module.link("./QueryClientProvider.js",{useQueryClient(v){useQueryClient=v}},2);

// src/useIsFetching.ts



function useIsFetching(filters, queryClient) {
  const client = useQueryClient(queryClient);
  const queryCache = client.getQueryCache();
  return React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => queryCache.subscribe(notifyManager.batchCalls(onStoreChange)),
      [queryCache]
    ),
    () => client.isFetching(filters),
    () => client.isFetching(filters)
  );
}



//# sourceMappingURL=useIsFetching.js.map