export const createCalendarDays = (updatedDate) => {
    //get number of days in the current month
    const lastDay = new Date(
        updatedDate.getFullYear(),
        updatedDate.getMonth() + 1,
        0
    ).getDate();

    //get number of days in previous month
    const prevLastDay = new Date(
        updatedDate.getFullYear(),
        updatedDate.getMonth(),
        0
    ).getDate();

    //get number for name of the day for current month -> 0 = sunday .... 6 = saturday
    let firstDayIndex = updatedDate.getDay();
    //logic to put sunday as last(6) and monday as first(0)
    if (firstDayIndex === 0)
        firstDayIndex = 6;
    else if (firstDayIndex === 6)
        firstDayIndex = 0;
    else
        firstDayIndex--;

    let days = ""
    let totalDays = lastDay;
    //loop for creating previous month date numbers
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div className="prev-date disabled">${prevLastDay - x + 1}</div>`;
        totalDays++;
    }
    //loop for creating curent month date numbers
    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            updatedDate.getMonth() === new Date().getMonth()
        ) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }
    //loop for creating next month date numbers
    for (let j = 1; j <= 42 - totalDays; j++) {
        days += `<div class="next-date disabled">${j}</div>`;
    }

    return days;
}