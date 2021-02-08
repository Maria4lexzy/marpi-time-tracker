import React, { useState, useEffect } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import store from '../redux/configureStore';
import {currentTitleAction} from "../redux/CalendarTitleSlice";
import { useDispatch } from "react-redux";
import watch from 'redux-watch';
import '../assets/css/Calendar.css';
export default function CalendarWeekView() {

  const dispatch = useDispatch();
  useEffect(()=>{
    let w = watch(store.getState, 'currentDate.date');
    const unsubscribe = store.subscribe(w((newVal, oldVal, objectPath) => 
    {
        console.log("subscribed");
        if(newVal !== oldVal)
            renderCalendar(new Date(newVal));
    }));
    return () => {
        console.log("unsubscribing")
        unsubscribe();
    }
    }, [])


    const renderCalendar = (updatedDate) =>
    {
        dispatch(currentTitleAction({newTitle: monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear()}))
    }
    //titleText needs to be same name as a slice initial state

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

    
       return (
        <>
        <button className="transp-btn" ><MdChevronLeft className="prev" size={62}/></button>
        <button  className="transp-btn"><MdChevronRight className="next" size={62}/></button>
        </>
    )
}

