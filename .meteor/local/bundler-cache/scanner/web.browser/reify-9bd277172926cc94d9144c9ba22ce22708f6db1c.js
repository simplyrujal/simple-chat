'use client';module.export({PaginationButton:()=>PaginationButton,PaginationNavigation:()=>PaginationNavigation});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},3);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},4);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},5);let paginationTheme;module.link('./theme.js',{paginationTheme(v){paginationTheme=v}},6);








const PaginationButton = forwardRef(
  ({ active, children, className, onClick, theme: customTheme, clearTheme, applyTheme, ...props }, ref) => {
    const provider = useThemeProvider();
    const theme = useResolveTheme(
      [paginationTheme, provider.theme?.pagination, customTheme],
      [get(provider.clearTheme, "pagination"), clearTheme],
      [get(provider.applyTheme, "pagination"), applyTheme]
    );
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type: "button",
        className: twMerge(active && theme.pages.selector.active, className),
        onClick,
        ...props,
        children
      }
    );
  }
);
PaginationButton.displayName = "PaginationButton";
function PaginationNavigation({
  children,
  className,
  onClick,
  disabled = false,
  theme: customTheme,
  clearTheme,
  applyTheme,
  ...props
}) {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [paginationTheme, provider.theme?.pagination, customTheme],
    [get(provider.clearTheme, "pagination"), clearTheme],
    [get(provider.applyTheme, "pagination"), applyTheme]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: twMerge(disabled && theme.pages.selector.disabled, className),
      disabled,
      onClick,
      ...props,
      children
    }
  );
}
PaginationNavigation.displayName = "PaginationNavigation";


//# sourceMappingURL=PaginationButton.js.map
