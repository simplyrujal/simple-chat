"use client";module.export({useIsMutating:()=>useIsMutating,useMutationState:()=>useMutationState});let React;module.link("react",{"*"(v){React=v}},0);let notifyManager,replaceEqualDeep;module.link("@tanstack/query-core",{notifyManager(v){notifyManager=v},replaceEqualDeep(v){replaceEqualDeep=v}},1);let useQueryClient;module.link("./QueryClientProvider.js",{useQueryClient(v){useQueryClient=v}},2);

// src/useMutationState.ts



function useIsMutating(filters, queryClient) {
  const client = useQueryClient(queryClient);
  return useMutationState(
    { filters: { ...filters, status: "pending" } },
    client
  ).length;
}
function getResult(mutationCache, options) {
  return mutationCache.findAll(options.filters).map(
    (mutation) => options.select ? options.select(mutation) : mutation.state
  );
}
function useMutationState(options = {}, queryClient) {
  const mutationCache = useQueryClient(queryClient).getMutationCache();
  const optionsRef = React.useRef(options);
  const result = React.useRef(null);
  if (result.current === null) {
    result.current = getResult(mutationCache, options);
  }
  React.useEffect(() => {
    optionsRef.current = options;
  });
  return React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => mutationCache.subscribe(() => {
        const nextResult = replaceEqualDeep(
          result.current,
          getResult(mutationCache, optionsRef.current)
        );
        if (result.current !== nextResult) {
          result.current = nextResult;
          notifyManager.schedule(onStoreChange);
        }
      }),
      [mutationCache]
    ),
    () => result.current,
    () => result.current
  );
}




//# sourceMappingURL=useMutationState.js.map