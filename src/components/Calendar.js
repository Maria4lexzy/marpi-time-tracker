import React, { useState } from 'react';
import '../assets/css/Calendar.css';
import CalendarMonthView from './CalendarMonthView'
import CalendarWeekView from './CalendarWeekView'
export default function Calendar() {
  
    const [activeView, setActiveView] = useState("MONTH");
    const switchToMonthView = () => { 
        if(activeView !== "MONTH") setActiveView('MONTH'); 
        }
    const switchToWeekView = () => { 
        if(activeView !== "WEEK") setActiveView('WEEK');
        }
       return (
        <>
        <div>
            <button onClick={switchToMonthView}>Month</button>
            <button onClick={switchToWeekView}>Week</button></div>
            <div> {activeView === 'MONTH' && <CalendarMonthView />}
            {activeView === 'WEEK' && <CalendarWeekView />}</div>
        </>
    )
}

