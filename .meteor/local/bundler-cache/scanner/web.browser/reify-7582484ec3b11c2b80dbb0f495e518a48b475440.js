module.export({default:()=>DevtoolsComponent_default});let createLocalStorage,THEME_PREFERENCE,QueryDevtoolsContext,PiPProvider,ThemeContext,Devtools;module.link('../chunk/NITRNJ62.js',{createLocalStorage(v){createLocalStorage=v},THEME_PREFERENCE(v){THEME_PREFERENCE=v},QueryDevtoolsContext(v){QueryDevtoolsContext=v},PiPProvider(v){PiPProvider=v},ThemeContext(v){ThemeContext=v},Devtools(v){Devtools=v}},0);let getPreferredColorScheme,createMemo,createComponent;module.link('../chunk/73LUVHE2.js',{getPreferredColorScheme(v){getPreferredColorScheme=v},createMemo(v){createMemo=v},createComponent(v){createComponent=v}},1);


// src/DevtoolsComponent.tsx
var DevtoolsComponent = (props) => {
  const [localStore, setLocalStore] = createLocalStorage({
    prefix: "TanstackQueryDevtools"
  });
  const colorScheme = getPreferredColorScheme();
  const theme = createMemo(() => {
    const preference = props.theme || localStore.theme_preference || THEME_PREFERENCE;
    if (preference !== "system") return preference;
    return colorScheme();
  });
  return createComponent(QueryDevtoolsContext.Provider, {
    value: props,
    get children() {
      return createComponent(PiPProvider, {
        localStore,
        setLocalStore,
        get children() {
          return createComponent(ThemeContext.Provider, {
            value: theme,
            get children() {
              return createComponent(Devtools, {
                localStore,
                setLocalStore
              });
            }
          });
        }
      });
    }
  });
};
var DevtoolsComponent_default = DevtoolsComponent;


