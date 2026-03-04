'use client';module.export({ThemeProvider:()=>ThemeProvider,useThemeProvider:()=>useThemeProvider});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let deepmerge;module.link('deepmerge-ts',{deepmerge(v){deepmerge=v}},1);let createContext,useContext,useMemo;module.link('react',{createContext(v){createContext=v},useContext(v){useContext=v},useMemo(v){useMemo=v}},2);let deepMergeStrings;module.link('../helpers/deep-merge.js',{deepMergeStrings(v){deepMergeStrings=v}},3);let twMerge;module.link('../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},4);






const ThemeProviderContext = createContext(void 0);
function ThemeProvider({ children, root, props, theme, clearTheme, applyTheme }) {
  const parentProvider = useContext(ThemeProviderContext);
  const value = useMemo(
    () => ({
      props: !root && parentProvider?.props ? deepmerge(parentProvider?.props, props) : props,
      theme: !root && parentProvider?.theme ? deepMergeStrings(twMerge)(parentProvider.theme, theme) : theme,
      clearTheme: !root && parentProvider?.clearTheme ? deepmerge(parentProvider.clearTheme, clearTheme) : clearTheme,
      applyTheme: !root && parentProvider?.applyTheme ? deepmerge(parentProvider?.applyTheme, applyTheme) : applyTheme
    }),
    [
      root,
      props,
      theme,
      clearTheme,
      applyTheme,
      parentProvider?.props,
      parentProvider?.theme,
      parentProvider?.clearTheme,
      parentProvider?.applyTheme
    ]
  );
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { value, children });
}
ThemeProvider.displayName = "ThemeProvider";
function useThemeProvider() {
  return useContext(ThemeProviderContext) ?? {};
}


//# sourceMappingURL=provider.js.map
