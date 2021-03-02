import React, { useState, useEffect, createElement } from 'react';
import {Table} from 'react-bootstrap'
import store from '../redux/configureStore';
import {currentTitleAction, dayDisplayedAction} from "../redux/CalendarSlice";
import { useDispatch, useSelector } from "react-redux";
import watch from 'redux-watch';
import '../assets/css/Calendar.css';
export default function CalendarDayView() {


  const [calendarHeader, setCalendarHeader] = useState([]);
  const [calendarBody, setCalendarBody] = useState([]);
  const {fistDateInWeek,dayDisplayed} = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  useEffect(()=>{

    const renderCalendar = (day) =>
    {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };  
        let date = new Date(day);  
        dispatch(currentTitleAction({newTitle: date.toLocaleDateString(undefined, options)}));
        createDayCalendar();
    }
    
    const createDayCalendar = () =>{
        
        let header = [];
        let body = [];
        for(let a = 0; a<24;a++)
        {
            if(a===0)
            {
                header.push(<th key="Employee">Employee</th>);
                header.push(<th key="0:00">0:00</th>);
            }
            else
                header.push(<th key={a + `:00`}>{a}:00</th>);
        }
        setCalendarHeader(header);

        for(let b=0;b<8;b++)
        {
            const trData = [];
            trData.push(<th key={b + `user`} className="hour-field">Worker {b}</th>);
            for(let c=0;c<24;c++)
            {
                trData.push(<td key={`customer` + b + `time:` + c + `:00` } ><div id={b} className="event event-short"></div></td>);
            }
            const table = createElement('tr',{key: b.toString()},trData);

            body.push(table);

        }
        setCalendarBody(body);
    }
    renderCalendar(new Date(fistDateInWeek)); 
    dispatch(dayDisplayedAction({newDayDisplayed: fistDateInWeek}));
    let w = watch(store.getState, 'calendar.dayDisplayed');
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

