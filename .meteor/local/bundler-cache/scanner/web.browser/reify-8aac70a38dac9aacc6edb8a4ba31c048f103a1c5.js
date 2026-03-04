"use client";module.export({QueryErrorResetBoundary:()=>QueryErrorResetBoundary,useQueryErrorResetBoundary:()=>useQueryErrorResetBoundary});let React;module.link("react",{"*"(v){React=v}},0);let jsx;module.link("react/jsx-runtime",{jsx(v){jsx=v}},1);

// src/QueryErrorResetBoundary.tsx


function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = React.createContext(createValue());
var useQueryErrorResetBoundary = () => React.useContext(QueryErrorResetBoundaryContext);
var QueryErrorResetBoundary = ({
  children
}) => {
  const [value] = React.useState(() => createValue());
  return /* @__PURE__ */ jsx(QueryErrorResetBoundaryContext.Provider, { value, children: typeof children === "function" ? children(value) : children });
};




//# sourceMappingURL=QueryErrorResetBoundary.js.map