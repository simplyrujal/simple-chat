'use client';module.export({DatepickerViewsDays:()=>DatepickerViewsDays});let jsxs,Fragment,jsx;module.link('react/jsx-runtime',{jsxs(v){jsxs=v},Fragment(v){Fragment=v},jsx(v){jsx=v}},0);let twMerge;module.link('../../../helpers/tailwind-merge.js',{twMerge(v){twMerge=v}},1);let useDatePickerContext;module.link('../DatepickerContext.js',{useDatePickerContext(v){useDatePickerContext=v}},2);let getWeekDays,getFirstDayOfTheMonth,addDays,getFormattedDate,isDateEqual,isDateInRange,Views,isDateToday;module.link('../helpers.js',{getWeekDays(v){getWeekDays=v},getFirstDayOfTheMonth(v){getFirstDayOfTheMonth=v},addDays(v){addDays=v},getFormattedDate(v){getFormattedDate=v},isDateEqual(v){isDateEqual=v},isDateInRange(v){isDateInRange=v},Views(v){Views=v},isDateToday(v){isDateToday=v}},3);





function DatepickerViewsDays() {
  const {
    theme: rootTheme,
    weekStart,
    minDate,
    maxDate,
    filterDate,
    viewDate,
    selectedDate,
    changeSelectedDate,
    language
  } = useDatePickerContext();
  const theme = rootTheme.views.days;
  const weekDays = getWeekDays(language, weekStart);
  const startDate = getFirstDayOfTheMonth(viewDate, weekStart);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: theme.header.base, children: weekDays.map((day, index) => /* @__PURE__ */ jsx("span", { className: theme.header.title, children: day }, index)) }),
    /* @__PURE__ */ jsx("div", { className: theme.items.base, children: [...Array(42)].map((_date, index) => {
      const currentDate = addDays(startDate, index);
      const day = getFormattedDate(language, currentDate, { day: "numeric" });
      const isSelected = selectedDate && isDateEqual(selectedDate, currentDate);
      const isDisabled = !isDateInRange(currentDate, minDate, maxDate) || filterDate && !filterDate(currentDate, Views.Days);
      const isToday = isDateToday(currentDate);
      return /* @__PURE__ */ jsx(
        "button",
        {
          disabled: isDisabled,
          type: "button",
          className: twMerge(
            theme.items.item.base,
            isToday && theme.items.item.today,
            isSelected && theme.items.item.selected,
            isDisabled && theme.items.item.disabled
          ),
          onClick: () => {
            if (isDisabled) return;
            changeSelectedDate(currentDate, true);
          },
          children: day
        },
        index
      );
    }) })
  ] });
}
DatepickerViewsDays.displayName = "DatepickerViewsDays";


//# sourceMappingURL=Days.js.map
