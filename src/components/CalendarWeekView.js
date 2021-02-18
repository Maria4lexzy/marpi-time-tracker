import React, { useState, useEffect, createElement } from 'react';
import {Table} from 'react-bootstrap'
import store from '../redux/configureStore';
import {currentTitleAction, selectedWeekAction, currentDateAction} from "../redux/CalendarSlice";
import { useDispatch, useSelector } from "react-redux";
import watch from 'redux-watch';
import {getDatesFromWeekNo} from '../utils/calendar'
import '../assets/css/Calendar.css';
export default function CalendarWeekView() {


  const [calendarHeader, setCalendarHeader] = useState([]);
  const [calendarBody, setCalendarBody] = useState([]);
  const {week,date} = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(week === 0)
    {
        let firstDay = new Date(date);
        renderCalendar(firstDay.getWeekNumber()); 
    }
    else
        renderCalendar(week); 
    
    let w = watch(store.getState, 'calendar.week');
    const unsubscribe = store.subscribe(w((newVal, oldVal, objectPath) => 
    {
        if(newVal !== oldVal)
            renderCalendar(newVal);
    }));
    return () => {
        unsubscribe();
    }
    }, [])

    const renderCalendar = (weekNumber) =>
    {
        if(weekNumber === 0)
        {
            let firstDay = new Date(date);
            weekNumber = firstDay.getWeekNumber(); 
        }
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        let firstWeekDay = getDatesFromWeekNo(weekNumber,new Date(date).getFullYear());
        let lastWeekDay = new Date(firstWeekDay);
        lastWeekDay.setDate(lastWeekDay.getDate()+6);
        dispatch(currentTitleAction({newTitle: firstWeekDay.toLocaleDateString(undefined, options)+ " - " + lastWeekDay.toLocaleDateString(undefined, options)}));
        dispatch(selectedWeekAction({newWeek: weekNumber}));
        dispatch(currentDateAction({newDate: firstWeekDay.toString()}));
        createWeekCalendar(firstWeekDay);
    }

    const createWeekCalendar = (updateDate) =>{
        let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let tempDate = new Date(updateDate);
        let header = [];
        let body = [];
        for(let a = 0; a<7;a++)
        {
            if(a===0)
            {
                header.push(<th>{tempDate.getWeekNumber()}</th>);
                header.push(<th>{weekday[tempDate.getDay()]} {updateDate.getDate()}</th>);
            }
            else
                header.push(<th>{weekday[tempDate.getDay()]} {tempDate.getDate()}</th>);

            tempDate.setDate(tempDate.getDate() + 1);
        }
        setCalendarHeader(header);

      
    
        for(let b=0;b<24;b++)
        {
            tempDate = new Date(updateDate);
            const trData = [];
            trData.push(<th className="hour-field">{b}:00</th>);
            for(let c=0;c<7;c++)
            {
                trData.push(<td id={tempDate.toLocaleDateString(undefined, options) + ` ` + c + `:00`}><div className="event event-short"></div></td>);
                tempDate.setDate(tempDate.getDate() + 1);
            }
            const table = createElement('tr',{},trData);
            body.push(table);

        }
        setCalendarBody(body);
    }
   

       return (
        <>
          <div className="mt-5 week">
                    <Table bordered responsive="md" className="month">
                        <thead className="text-uppercase text-center"> 
                        <tr>
                            {calendarHeader}
                        </tr>
                        </thead>
                        <tbody>
                            {calendarBody}
                        </tbody>
                    </Table>
                   
                </div>
        </>
    )
}

