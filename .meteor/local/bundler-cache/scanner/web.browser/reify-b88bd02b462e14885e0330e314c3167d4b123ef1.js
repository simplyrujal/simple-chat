'use client';module.export({DatepickerViewsYears:()=>DatepickerViewsYears});let jsx;module.link('react/jsx-runtime',{jsx(v){jsx=v}},0);let twMerge;module.link('../../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},1);let useDatePickerContext;module.link('../DatepickerContext.js',{useDatePickerContext(v){useDatePickerContext=v}},2);let startOfYearPeriod,isDateEqual,isDateInRange,Views;module.link('../helpers.js',{startOfYearPeriod(v){startOfYearPeriod=v},isDateEqual(v){isDateEqual=v},isDateInRange(v){isDateInRange=v},Views(v){Views=v}},3);





function DatepickerViewsYears() {
  const {
    theme: rootTheme,
    selectedDate,
    minDate,
    maxDate,
    filterDate,
    viewDate,
    setViewDate,
    setView
  } = useDatePickerContext();
  const theme = rootTheme.views.years;
  return /* @__PURE__ */ jsx("div", { className: theme.items.base, children: [...Array(12)].map((_year, index) => {
    const first = startOfYearPeriod(viewDate, 10);
    const year = first + index;
    const newDate = new Date(viewDate.getTime());
    newDate.setFullYear(year);
    const isSelected = selectedDate && isDateEqual(selectedDate, newDate);
    const isDisabled = !isDateInRange(newDate, minDate, maxDate) || filterDate && !filterDate(newDate, Views.Years);
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
          setView(Views.Months);
        },
        children: year
      },
      index
    );
  }) });
}
DatepickerViewsYears.displayName = "DatepickerViewsYears";


//# sourceMappingURL=Years.js.map
