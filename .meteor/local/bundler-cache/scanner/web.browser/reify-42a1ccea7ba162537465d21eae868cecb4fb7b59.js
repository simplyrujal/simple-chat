module.export({useBaseFloating:()=>useBaseFloating,useFloatingInteractions:()=>useFloatingInteractions});let useFloating,autoUpdate,useInteractions,useClick,useHover,safePolygon,useDismiss,useRole;module.link('@floating-ui/react',{useFloating(v){useFloating=v},autoUpdate(v){autoUpdate=v},useInteractions(v){useInteractions=v},useClick(v){useClick=v},useHover(v){useHover=v},safePolygon(v){safePolygon=v},useDismiss(v){useDismiss=v},useRole(v){useRole=v}},0);let getMiddleware,getPlacement;module.link('../components/Floating/helpers.js',{getMiddleware(v){getMiddleware=v},getPlacement(v){getPlacement=v}},1);


const useBaseFloating = ({
  open,
  arrowRef,
  placement = "top",
  setOpen
}) => {
  return useFloating({
    placement: getPlacement({ placement }),
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: getMiddleware({ placement, arrowRef })
  });
};
const useFloatingInteractions = ({
  context,
  trigger,
  role = "tooltip",
  interactions = []
}) => {
  return useInteractions([
    useClick(context, { enabled: trigger === "click" }),
    useHover(context, {
      enabled: trigger === "hover",
      handleClose: safePolygon()
    }),
    useDismiss(context),
    useRole(context, { role }),
    ...interactions
  ]);
};


//# sourceMappingURL=use-floating.js.map
