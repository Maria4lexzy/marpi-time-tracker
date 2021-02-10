import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap'
import store from '../redux/configureStore';
import {currentTitleAction, selectedWeekAction, currentDateAction} from "../redux/CalendarSlice";
import { useDispatch, useSelector } from "react-redux";
import watch from 'redux-watch';
import {createWeekCalendar, getDatesFromWeekNo} from '../utils/calendar'
import '../assets/css/Calendar.css';
export default function CalendarWeekView() {


  const [weekCalendar, setWeekCalendar] = useState("");
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
        setWeekCalendar(createWeekCalendar(firstWeekDay));
    }

       return (
        <>
          <div className="mt-5 week">
                    <Table bordered responsive="md" className="month" dangerouslySetInnerHTML={{__html: weekCalendar}}>
                    </Table>
                   
                </div>
        </>
    )
}

