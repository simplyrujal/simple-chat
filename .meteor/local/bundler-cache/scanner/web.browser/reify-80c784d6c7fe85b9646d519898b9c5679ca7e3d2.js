"use client";module.export({ensurePreventErrorBoundaryRetry:()=>ensurePreventErrorBoundaryRetry,getHasError:()=>getHasError,useClearResetErrorBoundary:()=>useClearResetErrorBoundary});let React;module.link("react",{"*"(v){React=v}},0);let shouldThrowError;module.link("@tanstack/query-core",{shouldThrowError(v){shouldThrowError=v}},1);

// src/errorBoundaryUtils.ts


var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  React.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};





//# sourceMappingURL=errorBoundaryUtils.js.map