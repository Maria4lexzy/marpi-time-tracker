import React, { useState, useEffect } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import '../assets/css/Calendar.css';
export default function Calendar() {


    const [daysHTML, setDaysHTML] = useState("");
    
    function prevMonth(e) {
        e.preventDefault();

      }
    function nextMonth(e) {
    e.preventDefault();

    }

    
       return (
        <>
        <button className="transp-btn" onClick={prevMonth}><MdChevronLeft className="prev" size={62}/></button>
        <button onClick={nextMonth} className="transp-btn"><MdChevronRight className="next" size={62}/></button>
        </>
    )
}

