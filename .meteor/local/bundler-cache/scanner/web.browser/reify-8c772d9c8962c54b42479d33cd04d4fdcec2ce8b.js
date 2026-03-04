module.export({usePrefetchQuery:()=>usePrefetchQuery});let useQueryClient;module.link("./QueryClientProvider.js",{useQueryClient(v){useQueryClient=v}},0);// src/usePrefetchQuery.tsx

function usePrefetchQuery(options, queryClient) {
  const client = useQueryClient(queryClient);
  if (!client.getQueryState(options.queryKey)) {
    client.prefetchQuery(options);
  }
}



//# sourceMappingURL=usePrefetchQuery.js.map