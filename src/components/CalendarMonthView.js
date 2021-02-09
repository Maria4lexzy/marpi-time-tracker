import React, { useState, useEffect } from 'react';
import '../assets/css/Calendar.css';
import {createCalendarDays} from '../utils/calendar.js';
import {Table} from 'react-bootstrap';
import store from '../redux/configureStore';
import {currentTitleAction} from "../redux/CalendarSlice";
import { useDispatch, useSelector } from "react-redux";
import watch from 'redux-watch';
export default function CalendarMonthView() {

    //titleText needs to be same name as a slice initial state
    const {date}  = useSelector((state) => state.calendar);
    const dispatch = useDispatch();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",];
  
    const [daysHTML, setDaysHTML] = useState("");

    // store is THE redux store
    
    useEffect(()=>{
        renderCalendar(new Date(date));
        let w = watch(store.getState, 'calendar.date');
        const unsubscribe = store.subscribe(w((newVal, oldVal, objectPath) => 
        {
            if(newVal !== oldVal)
                renderCalendar(new Date(newVal));
        }));
    return () => {
        unsubscribe();
    }
    }, [])

    const renderCalendar = (updatedDate) =>
    {
        dispatch(currentTitleAction({newTitle: monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear()}))
        setDaysHTML(createCalendarDays(updatedDate));
    }
  
       return (
        <>
            <div className="mt-5 calendar">
                    <Table bordered responsive="md" className="month">
                        <thead className="text-uppercase text-center">
                            <tr>
                                <th>Week no.</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                                <th>Sun</th>
                            </tr>
                        </thead>
                        <tbody dangerouslySetInnerHTML={{__html: daysHTML}}>
                           

                        </tbody>
                    </Table>

                </div>
        </>
    )
}

