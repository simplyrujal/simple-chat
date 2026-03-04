module.export({listTheme:()=>listTheme});let createTheme;module.link('../../helpers/create-theme.js',{createTheme(v){createTheme=v}},0);

const listTheme = createTheme({
  root: {
    base: "list-inside space-y-1 text-gray-500 dark:text-gray-400",
    ordered: {
      off: "list-disc",
      on: "list-decimal"
    },
    horizontal: "flex list-none flex-wrap items-center justify-center space-x-4 space-y-0",
    unstyled: "list-none",
    nested: "mt-2 ps-5"
  },
  item: {
    withIcon: {
      off: "",
      on: "flex items-center"
    },
    icon: "me-2 h-3.5 w-3.5 shrink-0"
  }
});


//# sourceMappingURL=theme.js.map
