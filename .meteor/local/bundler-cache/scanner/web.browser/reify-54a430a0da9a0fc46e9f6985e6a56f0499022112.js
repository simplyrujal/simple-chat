module.export({darkThemeToggleTheme:()=>darkThemeToggleTheme});let createTheme;module.link('../../helpers/create-theme.js',{createTheme(v){createTheme=v}},0);

const darkThemeToggleTheme = createTheme({
  root: {
    base: "rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
    icon: {
      base: "h-5 w-5",
      dark: "hidden dark:block",
      light: "dark:hidden"
    }
  }
});


//# sourceMappingURL=theme.js.map
