module.export({megaMenuTheme:()=>megaMenuTheme});let createTheme;module.link('../../helpers/create-theme.js',{createTheme(v){createTheme=v}},0);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},1);let dropdownTheme;module.link('../Dropdown/theme.js',{dropdownTheme(v){dropdownTheme=v}},2);let navbarTheme;module.link('../Navbar/theme.js',{navbarTheme(v){navbarTheme=v}},3);




const megaMenuTheme = createTheme({
  ...navbarTheme,
  dropdown: {
    base: "",
    toggle: {
      ...dropdownTheme,
      floating: {
        ...dropdownTheme.floating,
        base: twMerge(dropdownTheme.floating.base, "mt-2 block"),
        content: twMerge(dropdownTheme.floating.content, "text-gray-500 dark:text-gray-400"),
        style: {
          ...dropdownTheme.floating.style,
          auto: twMerge(dropdownTheme.floating.style.auto, "text-gray-500 dark:text-gray-400")
        }
      },
      inlineWrapper: twMerge(dropdownTheme.inlineWrapper, "flex w-full items-center justify-between")
    }
  },
  dropdownToggle: {
    base: twMerge(navbarTheme.link.base, navbarTheme.link.active.off, "flex w-full items-center justify-between")
  }
});


//# sourceMappingURL=theme.js.map
