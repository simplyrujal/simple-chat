"use client";module.export({useBaseQuery:()=>useBaseQuery});let React;module.link("react",{"*"(v){React=v}},0);let isServer,noop,notifyManager;module.link("@tanstack/query-core",{isServer(v){isServer=v},noop(v){noop=v},notifyManager(v){notifyManager=v}},1);let useQueryClient;module.link("./QueryClientProvider.js",{useQueryClient(v){useQueryClient=v}},2);let useQueryErrorResetBoundary;module.link("./QueryErrorResetBoundary.js",{useQueryErrorResetBoundary(v){useQueryErrorResetBoundary=v}},3);let ensurePreventErrorBoundaryRetry,getHasError,useClearResetErrorBoundary;module.link("./errorBoundaryUtils.js",{ensurePreventErrorBoundaryRetry(v){ensurePreventErrorBoundaryRetry=v},getHasError(v){getHasError=v},useClearResetErrorBoundary(v){useClearResetErrorBoundary=v}},4);let useIsRestoring;module.link("./IsRestoringProvider.js",{useIsRestoring(v){useIsRestoring=v}},5);let ensureSuspenseTimers,fetchOptimistic,shouldSuspend,willFetch;module.link("./suspense.js",{ensureSuspenseTimers(v){ensureSuspenseTimers=v},fetchOptimistic(v){fetchOptimistic=v},shouldSuspend(v){shouldSuspend=v},willFetch(v){willFetch=v}},6);

// src/useBaseQuery.ts
















function useBaseQuery(options, Observer, queryClient) {
  var _a, _b, _c, _d;
  if (process.env.NODE_ENV !== "production") {
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new Error(
        'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
      );
    }
  }
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient(queryClient);
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a = client.getDefaultOptions().queries) == null ? void 0 : _a._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  if (process.env.NODE_ENV !== "production") {
    if (!defaultedOptions.queryFn) {
      console.error(
        `[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`
      );
    }
  }
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = React.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  React.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  ;
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !isServer && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}



//# sourceMappingURL=useBaseQuery.js.map