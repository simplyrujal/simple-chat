module.export({Removable:()=>Removable});let __privateAdd,__privateGet,__privateSet;module.link("./chunk-PXG64RU4.js",{__privateAdd(v){__privateAdd=v},__privateGet(v){__privateGet=v},__privateSet(v){__privateSet=v}},0);let timeoutManager;module.link("./timeoutManager.js",{timeoutManager(v){timeoutManager=v}},1);let isServer,isValidTimeout;module.link("./utils.js",{isServer(v){isServer=v},isValidTimeout(v){isValidTimeout=v}},2);





// src/removable.ts


var _gcTimeout;
var Removable = class {
  constructor() {
    __privateAdd(this, _gcTimeout);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      __privateSet(this, _gcTimeout, timeoutManager.setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime));
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (__privateGet(this, _gcTimeout)) {
      timeoutManager.clearTimeout(__privateGet(this, _gcTimeout));
      __privateSet(this, _gcTimeout, void 0);
    }
  }
};
_gcTimeout = new WeakMap();



//# sourceMappingURL=removable.js.map