module.export({pendingThenable:()=>pendingThenable,tryResolveSync:()=>tryResolveSync});module.link("./chunk-PXG64RU4.js");let noop;module.link("./utils.js",{noop(v){noop=v}},0);

// src/thenable.ts

function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}
function tryResolveSync(promise) {
  var _a;
  let data;
  (_a = promise.then((result) => {
    data = result;
    return result;
  }, noop)) == null ? void 0 : _a.catch(noop);
  if (data !== void 0) {
    return { data };
  }
  return void 0;
}




//# sourceMappingURL=thenable.js.map