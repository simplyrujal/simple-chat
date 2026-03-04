'use client';module.export({AccordionPanel:()=>AccordionPanel});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let useState;module.link('react',{useState(v){useState=v}},1);let AccordionPanelContext;module.link('./AccordionPanelContext.js',{AccordionPanelContext(v){AccordionPanelContext=v}},2);




function AccordionPanel({ children, ...props }) {
  const { alwaysOpen } = props;
  const [isOpen, setOpen] = useState(props.isOpen);
  const provider = alwaysOpen ? {
    ...props,
    isOpen,
    setOpen: () => setOpen(!isOpen)
  } : props;
  return /* @__PURE__ */ jsx(AccordionPanelContext.Provider, { value: provider, children });
}
AccordionPanel.displayName = "AccordionPanel";


//# sourceMappingURL=AccordionPanel.js.map
