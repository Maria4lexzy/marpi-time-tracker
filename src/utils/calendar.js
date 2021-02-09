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
    else
        firstDayIndex--;

    let totalDays = lastDay;
    let numberOfPrintedDays = 0;
    let numberOfPrintedWeekends = 0;
    let weekNumbersFromDate;
    if(firstDayIndex>0)
    {
        weekNumbersFromDate = new Date(
            updatedDate.getFullYear(),
            updatedDate.getMonth()-1,
            prevLastDay - firstDayIndex +1
        );
    }
    else
    {
        weekNumbersFromDate = new Date(
            updatedDate.getFullYear(),
            updatedDate.getMonth(),
            1
        );
    }
    let weekNumbers = getWeekNumbers(weekNumbersFromDate);
    let days = `<tr>  <td>
    <div className="day-field" style="font-weight: bold;">${weekNumbers[numberOfPrintedWeekends]}</div> <div className="events-wrapper">
    </div> </td>`
    numberOfPrintedWeekends++;
    //loop for creating previous month date numbers
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<td> <div style="color:#E8E8E8;" className="day-field">${prevLastDay - x + 1}</div>
        <div className="events-wrapper"></div></td>`;
        totalDays++;
        numberOfPrintedDays++;
    }
    //loop for creating curent month date numbers
    for (let i = 1; i <= lastDay; i++) {
        if(numberOfPrintedDays%7===0 && numberOfPrintedDays !== 0)
        {
            days += `</tr> <tr> <td>
            <div className="day-field" style="font-weight: bold;">${weekNumbers[numberOfPrintedWeekends]}</div> <div className="events-wrapper">
            </div> </td>`;
            numberOfPrintedWeekends++;  
        } 
        if ( i === new Date().getDate() && updatedDate.getMonth() === new Date().getMonth())
        {
            days += `<td className="today">
            <div className="day-field">${i}</div> <div className="events-wrapper">
            </div> </td>`;
        }
        else
        {
            days += `<td>
            <div className="day-field">${i}</div> <div className="events-wrapper">
            </div> </td>`;
        }
        
      
        numberOfPrintedDays++;
    }
    //loop for creating next month date numbers
    for (let j = 1; j <= 42 - totalDays; j++) {
        if(numberOfPrintedDays%7===0)
        {
            days += `</tr> <tr> <td>
            <div className="day-field" style="font-weight: bold;">${weekNumbers[numberOfPrintedWeekends]}</div> <div className="events-wrapper">
            </div> </td>`;
            numberOfPrintedWeekends++;
        }
        days += `<td className="disabled">
        <div className="day-field" style="color:#E8E8E8;">${j}</div> <div className="events-wrapper">
        </div> </td>`;
        numberOfPrintedDays++;
    }
    days += `</tr>`;

    return days;
}
const getWeekNumbers = date =>{
    
    let weekNumbers=[];
    for (let a = 0; a < 6; a++) {
        weekNumbers.push(date.getWeekNumber());
        date.setDate(date.getDate() + 7);    
    }
   return weekNumbers;   
}
Date.prototype.getWeekNumber = function() {
    var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

export const createWeekCalendar = (updateDate) => 
{
    
   
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let weekCalendar = `<thead className="text-uppercase text-center"> <tr>`
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //generate name of the days and date
    let tempDate = new Date(updateDate);
    for(let a = 0; a<7;a++)
    {
        if(a===0)
            weekCalendar += `<th>${tempDate.getWeekNumber()}</th><th>${weekday[tempDate.getDay()]} ${updateDate.getDate()}`
        else
            weekCalendar += `<th>${weekday[tempDate.getDay()]} ${tempDate.getDate()}`
        tempDate.setDate(tempDate.getDate() + 1);
    }
    weekCalendar += `</tr> </thead><tbody>`

    for(let b=0;b<24;b++)
    {
        weekCalendar += `<tr><th className="hour-field">${b}:00</th>`
        tempDate = new Date(updateDate);
        for(let c=0;c<7;c++)
        {
            weekCalendar += `<td data-date-time="${tempDate.toLocaleDateString(undefined, options)} ${b}:00>
            <div className="event event-short"></div></td>`
            tempDate.setDate(tempDate.getDate() + 1);
        }
    }
    weekCalendar += `</tr></tbody>`
    return weekCalendar;
}
export const getDatesFromWeekNo = (weekNumber,year) =>{

    var simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;

}


