module.export({usePrefetchInfiniteQuery:()=>usePrefetchInfiniteQuery});let useQueryClient;module.link("./QueryClientProvider.js",{useQueryClient(v){useQueryClient=v}},0);// src/usePrefetchInfiniteQuery.tsx

function usePrefetchInfiniteQuery(options, queryClient) {
  const client = useQueryClient(queryClient);
  if (!client.getQueryState(options.queryKey)) {
    client.prefetchInfiniteQuery(options);
  }
}



//# sourceMappingURL=usePrefetchInfiniteQuery.js.map