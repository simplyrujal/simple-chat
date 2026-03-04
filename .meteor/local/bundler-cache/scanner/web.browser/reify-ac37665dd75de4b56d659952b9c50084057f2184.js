'use client';module.export({DatepickerViewsMonth:()=>DatepickerViewsMonth});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let twMerge;module.link('../../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},1);let useDatePickerContext;module.link('../DatepickerContext.js',{useDatePickerContext(v){useDatePickerContext=v}},2);let getFormattedDate,isDateEqual,isDateInRange,Views;module.link('../helpers.js',{getFormattedDate(v){getFormattedDate=v},isDateEqual(v){isDateEqual=v},isDateInRange(v){isDateInRange=v},Views(v){Views=v}},3);





function DatepickerViewsMonth() {
  const {
    theme: rootTheme,
    minDate,
    maxDate,
    filterDate,
    selectedDate,
    viewDate,
    language,
    setViewDate,
    setView
  } = useDatePickerContext();
  const theme = rootTheme.views.months;
  return /* @__PURE__ */ jsx("div", { className: theme.items.base, children: [...Array(12)].map((_month, index) => {
    const newDate = /* @__PURE__ */ new Date();
    newDate.setMonth(index, 1);
    newDate.setFullYear(viewDate.getFullYear());
    const month = getFormattedDate(language, newDate, { month: "short" });
    const isSelected = selectedDate && isDateEqual(selectedDate, newDate);
    const isDisabled = !isDateInRange(newDate, minDate, maxDate) || filterDate && !filterDate(newDate, Views.Months);
    return /* @__PURE__ */ jsx(
      "button",
      {
        disabled: isDisabled,
        type: "button",
        className: twMerge(
          theme.items.item.base,
          isSelected && theme.items.item.selected,
          isDisabled && theme.items.item.disabled
        ),
        onClick: () => {
          if (isDisabled) return;
          setViewDate(newDate);
          setView(Views.Days);
        },
        children: month
      },
      index
    );
  }) });
}
DatepickerViewsMonth.displayName = "DatepickerViewsMonth";


//# sourceMappingURL=Months.js.map
