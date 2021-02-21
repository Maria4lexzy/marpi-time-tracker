import React, { useState, useEffect, createElement } from 'react';
import {Table} from 'react-bootstrap'
import store from '../redux/configureStore';
import {currentTitleAction} from "../redux/CalendarSlice";
import { useDispatch, useSelector } from "react-redux";
import watch from 'redux-watch';
import '../assets/css/Calendar.css';
export default function CalendarWeekView() {


  const [calendarHeader, setCalendarHeader] = useState([]);
  const [calendarBody, setCalendarBody] = useState([]);
  const {fistDateInWeek} = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  useEffect(()=>{
    const renderCalendar = (firstDateInWeek) =>
    {
        
        var options = { year: 'numeric', month: 'long', day: 'numeric' };  
        let firstDate = new Date(firstDateInWeek);  
        let lastWeekDay = new Date(firstDateInWeek);
        lastWeekDay.setDate(lastWeekDay.getDate()+6);
        dispatch(currentTitleAction({newTitle: firstDate.toLocaleDateString(undefined, options)+ " - " + lastWeekDay.toLocaleDateString(undefined, options)}));
        createWeekCalendar(firstDate);
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
                header.push(<th key="weekNo">{tempDate.getWeekNumber()}</th>);
                header.push(<th key={tempDate.getDay().toString()}>{weekday[tempDate.getDay()]} {updateDate.getDate()}</th>);
            }
            else
                header.push(<th key={tempDate.getDay().toString()}>{weekday[tempDate.getDay()]} {tempDate.getDate()}</th>);

            tempDate.setDate(tempDate.getDate() + 1);
        }
        setCalendarHeader(header);

      
    
        for(let b=0;b<24;b++)
        {
            tempDate = new Date(updateDate);
            const trData = [];
            trData.push(<th key={b + `h`} id={b + `h`} className="hour-field">{b}:00</th>);
            for(let c=0;c<7;c++)
            {
                trData.push(<td key={b + `h` + c + `col`} ><div id={tempDate.toLocaleDateString(undefined, options) + ` ` + b + `:00`} className="event event-short"></div></td>);
                tempDate.setDate(tempDate.getDate() + 1);
            }
            const table = createElement('tr',{key: b.toString()},trData);

            body.push(table);

        }
        setCalendarBody(body);
    }

    renderCalendar(new Date(fistDateInWeek)); 
    let w = watch(store.getState, 'calendar.fistDateInWeek');
    const unsubscribe = store.subscribe(w((newVal, oldVal, objectPath) => 
    {
        if(newVal !== oldVal)
            renderCalendar(newVal);
    }));
    return () => {
        unsubscribe();
    }
    }, [])

    return (
        <>
          <div className="mt-5 week">
                    <Table bordered responsive="md" className="month">
                        <thead className="text-uppercase text-center" key="topHeader"> 
                        <tr key="header">
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

