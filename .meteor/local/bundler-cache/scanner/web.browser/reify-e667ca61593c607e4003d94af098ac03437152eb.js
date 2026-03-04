module.export({getArrowPlacement:()=>getArrowPlacement,getMiddleware:()=>getMiddleware,getPlacement:()=>getPlacement});let offset,autoPlacement,flip,shift,arrow;module.link('@floating-ui/react',{offset(v){offset=v},autoPlacement(v){autoPlacement=v},flip(v){flip=v},shift(v){shift=v},arrow(v){arrow=v}},0);

const getMiddleware = ({
  arrowRef,
  placement
}) => {
  const middleware = [];
  middleware.push(offset(8));
  middleware.push(placement === "auto" ? autoPlacement() : flip());
  middleware.push(shift({ padding: 8 }));
  if (arrowRef?.current) {
    middleware.push(arrow({ element: arrowRef.current }));
  }
  return middleware;
};
const getPlacement = ({ placement }) => {
  return placement === "auto" ? void 0 : placement;
};
const getArrowPlacement = ({ placement }) => {
  return {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement.split("-")[0]];
};


//# sourceMappingURL=helpers.js.map
