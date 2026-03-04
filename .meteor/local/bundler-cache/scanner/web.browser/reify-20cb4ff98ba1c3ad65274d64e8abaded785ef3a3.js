"use client";module.export({useMutation:()=>useMutation});let React;module.link("react",{"*"(v){React=v}},0);let MutationObserver,noop,notifyManager,shouldThrowError;module.link("@tanstack/query-core",{MutationObserver(v){MutationObserver=v},noop(v){noop=v},notifyManager(v){notifyManager=v},shouldThrowError(v){shouldThrowError=v}},1);let useQueryClient;module.link("./QueryClientProvider.js",{useQueryClient(v){useQueryClient=v}},2);

// src/useMutation.ts








function useMutation(options, queryClient) {
  const client = useQueryClient(queryClient);
  const [observer] = React.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  React.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = React.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}



//# sourceMappingURL=useMutation.js.map