module.export({resolveProps:()=>resolveProps});let withoutThemingProps;module.link('./without-theming-props.js',{withoutThemingProps(v){withoutThemingProps=v}},0);

function resolveProps(props, providerProps) {
  let mergedProps = withoutThemingProps(props);
  if (providerProps) {
    mergedProps = {
      ...providerProps,
      ...props
    };
  }
  return mergedProps;
}


//# sourceMappingURL=resolve-props.js.map
