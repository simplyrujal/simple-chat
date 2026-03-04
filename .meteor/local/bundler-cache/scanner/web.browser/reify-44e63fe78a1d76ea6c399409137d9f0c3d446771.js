module.export({QueryCache:()=>QueryCache});let __privateAdd,__privateGet,__privateSet;module.link("./chunk-PXG64RU4.js",{__privateAdd(v){__privateAdd=v},__privateGet(v){__privateGet=v},__privateSet(v){__privateSet=v}},0);let hashQueryKeyByOptions,matchQuery;module.link("./utils.js",{hashQueryKeyByOptions(v){hashQueryKeyByOptions=v},matchQuery(v){matchQuery=v}},1);let Query;module.link("./query.js",{Query(v){Query=v}},2);let notifyManager;module.link("./notifyManager.js",{notifyManager(v){notifyManager=v}},3);let Subscribable;module.link("./subscribable.js",{Subscribable(v){Subscribable=v}},4);





// src/queryCache.ts




var _queries;
var QueryCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    __privateAdd(this, _queries);
    __privateSet(this, _queries, /* @__PURE__ */ new Map());
  }
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!__privateGet(this, _queries).has(query.queryHash)) {
      __privateGet(this, _queries).set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = __privateGet(this, _queries).get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        __privateGet(this, _queries).delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return __privateGet(this, _queries).get(queryHash);
  }
  getAll() {
    return [...__privateGet(this, _queries).values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => matchQuery(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};
_queries = new WeakMap();



//# sourceMappingURL=queryCache.js.map