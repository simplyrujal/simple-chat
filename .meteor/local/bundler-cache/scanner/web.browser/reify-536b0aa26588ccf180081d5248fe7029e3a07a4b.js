'use client';module.export({ButtonBase:()=>ButtonBase});let forwardRef,createElement;module.link('react',{forwardRef(v){forwardRef=v},createElement(v){createElement=v}},0);


const ButtonBase = forwardRef(
  ({ children, as: Component, href, type = "button", ...props }, ref) => {
    const BaseComponent = Component || (href ? "a" : "button");
    return createElement(BaseComponent, { ref, href, type, ...props }, children);
  }
);
ButtonBase.displayName = "ButtonBase";


//# sourceMappingURL=ButtonBase.js.map
