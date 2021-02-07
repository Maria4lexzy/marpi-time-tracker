import React, { useState, useEffect } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import '../assets/css/Calendar.css';
import {createCalendarDays} from '../utils/calendar.js'
import {Table} from 'react-bootstrap'
export default function Calendar() {

    const prevNextMonth = {
        color: 'red',
      };
    useEffect(()=>{
        renderCalendar(new Date());
    }, [])
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
    const [monthName, setMonthName] = useState(monthNames[new Date().getMonth()] + " " + new Date().getFullYear());
    const [currentDate, setDate] = useState(new Date());
    const [daysHTML, setDaysHTML] = useState("");
    
    const renderCalendar = (updatedDate) =>{

        setDate(updatedDate);
        setMonthName(monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear());
        setDaysHTML(createCalendarDays(updatedDate));

    }

    function prevMonth(e) {
        e.preventDefault();
        let updatedDate = currentDate;
        updatedDate.setDate(1);
        updatedDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(updatedDate);
      }
    function nextMonth(e) {
    e.preventDefault();
    let updatedDate = currentDate;
    updatedDate.setDate(1);
    updatedDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(updatedDate);
    }

    
       return (
        <>
            <div className="container">
                <div className="calendar">
                    <div className="month">
                        <button className="transp-btn" onClick={prevMonth}><MdChevronLeft className="prev" size={62}/></button>

                    <div className="date">
                        <h1>{monthName}</h1>
                    </div>
                    <button onClick={nextMonth} className="transp-btn"><MdChevronRight className="next" size={62}/></button>

            </div>
            </div> </div>

            <div className="mt-5 calendar">
                    <Table bordered responsive="md" className="month">
                        <thead className="text-uppercase text-center">
                            <tr>
                                <th>Week No.</th>
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

