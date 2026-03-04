"use client";module.export({useQueries:()=>useQueries});let React;module.link("react",{"*"(v){React=v}},0);let QueriesObserver,QueryObserver,noop,notifyManager;module.link("@tanstack/query-core",{QueriesObserver(v){QueriesObserver=v},QueryObserver(v){QueryObserver=v},noop(v){noop=v},notifyManager(v){notifyManager=v}},1);let useQueryClient;module.link("./QueryClientProvider.js",{useQueryClient(v){useQueryClient=v}},2);let useIsRestoring;module.link("./IsRestoringProvider.js",{useIsRestoring(v){useIsRestoring=v}},3);let useQueryErrorResetBoundary;module.link("./QueryErrorResetBoundary.js",{useQueryErrorResetBoundary(v){useQueryErrorResetBoundary=v}},4);let ensurePreventErrorBoundaryRetry,getHasError,useClearResetErrorBoundary;module.link("./errorBoundaryUtils.js",{ensurePreventErrorBoundaryRetry(v){ensurePreventErrorBoundaryRetry=v},getHasError(v){getHasError=v},useClearResetErrorBoundary(v){useClearResetErrorBoundary=v}},5);let ensureSuspenseTimers,fetchOptimistic,shouldSuspend;module.link("./suspense.js",{ensureSuspenseTimers(v){ensureSuspenseTimers=v},fetchOptimistic(v){fetchOptimistic=v},shouldSuspend(v){shouldSuspend=v}},6);

// src/useQueries.ts




















function useQueries({
  queries,
  ...options
}, queryClient) {
  const client = useQueryClient(queryClient);
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const defaultedQueries = React.useMemo(
    () => queries.map((opts) => {
      const defaultedOptions = client.defaultQueryOptions(
        opts
      );
      defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
      return defaultedOptions;
    }),
    [queries, client, isRestoring]
  );
  defaultedQueries.forEach((queryOptions) => {
    ensureSuspenseTimers(queryOptions);
    const query = client.getQueryCache().get(queryOptions.queryHash);
    ensurePreventErrorBoundaryRetry(queryOptions, errorResetBoundary, query);
  });
  useClearResetErrorBoundary(errorResetBoundary);
  const [observer] = React.useState(
    () => new QueriesObserver(
      client,
      defaultedQueries,
      options
    )
  );
  const [optimisticResult, getCombinedResult, trackResult] = observer.getOptimisticResult(
    defaultedQueries,
    options.combine
  );
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop,
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  React.useEffect(() => {
    observer.setQueries(
      defaultedQueries,
      options
    );
  }, [defaultedQueries, options, observer]);
  const shouldAtLeastOneSuspend = optimisticResult.some(
    (result, index) => shouldSuspend(defaultedQueries[index], result)
  );
  const suspensePromises = shouldAtLeastOneSuspend ? optimisticResult.flatMap((result, index) => {
    const opts = defaultedQueries[index];
    if (opts && shouldSuspend(opts, result)) {
      const queryObserver = new QueryObserver(client, opts);
      return fetchOptimistic(opts, queryObserver, errorResetBoundary);
    }
    return [];
  }) : [];
  if (suspensePromises.length > 0) {
    throw Promise.all(suspensePromises);
  }
  const firstSingleResultWhichShouldThrow = optimisticResult.find(
    (result, index) => {
      const query = defaultedQueries[index];
      return query && getHasError({
        result,
        errorResetBoundary,
        throwOnError: query.throwOnError,
        query: client.getQueryCache().get(query.queryHash),
        suspense: query.suspense
      });
    }
  );
  if (firstSingleResultWhichShouldThrow == null ? void 0 : firstSingleResultWhichShouldThrow.error) {
    throw firstSingleResultWhichShouldThrow.error;
  }
  return getCombinedResult(trackResult());
}



//# sourceMappingURL=useQueries.js.map