"use client";module.export({ReactQueryDevtools:()=>ReactQueryDevtools2,ReactQueryDevtoolsPanel:()=>ReactQueryDevtoolsPanel2});let Devtools;module.link("./ReactQueryDevtools.js",{"*"(v){Devtools=v}},0);let DevtoolsPanel;module.link("./ReactQueryDevtoolsPanel.js",{"*"(v){DevtoolsPanel=v}},1);

// src/index.ts


var ReactQueryDevtools2 = process.env.NODE_ENV !== "development" ? function() {
  return null;
} : Devtools.ReactQueryDevtools;
var ReactQueryDevtoolsPanel2 = process.env.NODE_ENV !== "development" ? function() {
  return null;
} : DevtoolsPanel.ReactQueryDevtoolsPanel;




//# sourceMappingURL=index.js.map