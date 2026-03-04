'use client';module.export({Pagination:()=>Pagination});let jsx,jsxs;module.link('react/jsx-runtime',{jsx(v){jsx=v},jsxs(v){jsxs=v}},0);let forwardRef;module.link('react',{forwardRef(v){forwardRef=v}},1);let get;module.link('../../helpers/get.js',{get(v){get=v}},2);let resolveProps;module.link('../../helpers/resolve-props.js',{resolveProps(v){resolveProps=v}},3);let useResolveTheme;module.link('../../helpers/resolve-theme.js',{useResolveTheme(v){useResolveTheme=v}},4);let twMerge;module.link('../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},5);let ChevronLeftIcon;module.link('../../icons/chevron-left-icon.js',{ChevronLeftIcon(v){ChevronLeftIcon=v}},6);let ChevronRightIcon;module.link('../../icons/chevron-right-icon.js',{ChevronRightIcon(v){ChevronRightIcon=v}},7);let useThemeProvider;module.link('../../theme/provider.js',{useThemeProvider(v){useThemeProvider=v}},8);let range;module.link('./helpers.js',{range(v){range=v}},9);let PaginationButton,PaginationNavigation;module.link('./PaginationButton.js',{PaginationButton(v){PaginationButton=v},PaginationNavigation(v){PaginationNavigation=v}},10);let paginationTheme;module.link('./theme.js',{paginationTheme(v){paginationTheme=v}},11);













const Pagination = forwardRef((props, ref) => {
  if (props.layout === "table") return /* @__PURE__ */ jsx(TablePagination, { ...props, ref });
  return /* @__PURE__ */ jsx(DefaultPagination, { ...props, ref });
});
const DefaultPagination = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [paginationTheme, provider.theme?.pagination, props.theme],
    [get(provider.clearTheme, "pagination"), props.clearTheme],
    [get(provider.applyTheme, "pagination"), props.applyTheme]
  );
  const {
    className,
    currentPage,
    layout = "pagination",
    nextLabel = "Next",
    onPageChange,
    previousLabel = "Previous",
    renderPaginationButton = (props2) => /* @__PURE__ */ jsx(PaginationButton, { ...props2 }),
    totalPages,
    showIcons: showIcon = false,
    ...restProps
  } = resolveProps(props, provider.props?.pagination);
  if (!Number.isInteger(currentPage) || currentPage < 1) {
    throw new Error("Invalid props: currentPage must be a positive integer");
  }
  if (!Number.isInteger(totalPages) || totalPages < 1) {
    throw new Error("Invalid props: totalPages must be a positive integer");
  }
  const lastPage = Math.min(Math.max(layout === "pagination" ? currentPage + 2 : currentPage + 4, 5), totalPages);
  const firstPage = Math.max(1, lastPage - 4);
  function goToNextPage() {
    onPageChange(Math.min(currentPage + 1, totalPages));
  }
  function goToPreviousPage() {
    onPageChange(Math.max(currentPage - 1, 1));
  }
  return /* @__PURE__ */ jsx("nav", { ref, className: twMerge(theme.base, className), ...restProps, children: /* @__PURE__ */ jsxs("ul", { className: theme.pages.base, children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      PaginationNavigation,
      {
        className: twMerge(theme.pages.previous.base, showIcon && theme.pages.showIcon),
        onClick: goToPreviousPage,
        disabled: currentPage === 1,
        children: [
          showIcon && /* @__PURE__ */ jsx(ChevronLeftIcon, { "aria-hidden": true, className: theme.pages.previous.icon }),
          previousLabel
        ]
      }
    ) }),
    layout === "pagination" && range(firstPage, lastPage).map((page) => /* @__PURE__ */ jsx("li", { "aria-current": page === currentPage ? "page" : void 0, children: renderPaginationButton({
      className: twMerge(theme.pages.selector.base, currentPage === page && theme.pages.selector.active),
      active: page === currentPage,
      onClick: () => onPageChange(page),
      children: page
    }) }, page)),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      PaginationNavigation,
      {
        className: twMerge(theme.pages.next.base, showIcon && theme.pages.showIcon),
        onClick: goToNextPage,
        disabled: currentPage === totalPages,
        children: [
          nextLabel,
          showIcon && /* @__PURE__ */ jsx(ChevronRightIcon, { "aria-hidden": true, className: theme.pages.next.icon })
        ]
      }
    ) })
  ] }) });
});
const TablePagination = forwardRef((props, ref) => {
  const provider = useThemeProvider();
  const theme = useResolveTheme(
    [paginationTheme, provider.theme?.pagination, props.theme],
    [get(provider.clearTheme, "pagination"), props.clearTheme],
    [get(provider.applyTheme, "pagination"), props.applyTheme]
  );
  const {
    className,
    currentPage,
    nextLabel = "Next",
    onPageChange,
    previousLabel = "Previous",
    showIcons: showIcon = false,
    itemsPerPage,
    totalItems,
    ...restProps
  } = resolveProps(props, provider.props?.pagination);
  if (!Number.isInteger(currentPage) || currentPage < 1) {
    throw new Error("Invalid props: currentPage must be a positive integer");
  }
  if (!Number.isInteger(itemsPerPage) || itemsPerPage < 1) {
    throw new Error("Invalid props: itemsPerPage must be a positive integer");
  }
  if (!Number.isInteger(totalItems) || totalItems < 0) {
    throw new Error("Invalid props: totalItems must be a non-negative integer");
  }
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;
  const offset = (currentPage - 1) * itemsPerPage;
  const firstItem = totalItems > 0 ? offset + 1 : 0;
  const lastItem = currentPage === totalPages ? totalItems : offset + itemsPerPage;
  function goToNextPage() {
    onPageChange(Math.min(currentPage + 1, totalPages));
  }
  function goToPreviousPage() {
    onPageChange(Math.max(currentPage - 1, 1));
  }
  return /* @__PURE__ */ jsxs("nav", { ref, className: twMerge(theme.base, className), ...restProps, children: [
    /* @__PURE__ */ jsxs("div", { role: "status", "aria-live": "polite", "aria-label": "Table Pagination", className: theme.layout.table.base, children: [
      "Showing ",
      /* @__PURE__ */ jsx("span", { className: theme.layout.table.span, children: firstItem }),
      " to\xA0",
      /* @__PURE__ */ jsx("span", { className: theme.layout.table.span, children: lastItem }),
      " of\xA0",
      /* @__PURE__ */ jsx("span", { className: theme.layout.table.span, children: totalItems }),
      " Entries"
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: theme.pages.base, children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        PaginationNavigation,
        {
          className: twMerge(theme.pages.previous.base, showIcon && theme.pages.showIcon),
          onClick: goToPreviousPage,
          disabled: currentPage === 1,
          children: [
            showIcon && /* @__PURE__ */ jsx(ChevronLeftIcon, { "aria-hidden": true, className: theme.pages.previous.icon }),
            previousLabel
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        PaginationNavigation,
        {
          className: twMerge(theme.pages.next.base, showIcon && theme.pages.showIcon),
          onClick: goToNextPage,
          disabled: currentPage === totalPages,
          children: [
            nextLabel,
            showIcon && /* @__PURE__ */ jsx(ChevronRightIcon, { "aria-hidden": true, className: theme.pages.next.icon })
          ]
        }
      ) })
    ] })
  ] });
});
Pagination.displayName = "Pagination";


//# sourceMappingURL=Pagination.js.map
