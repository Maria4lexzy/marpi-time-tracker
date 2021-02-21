import React, { useState, useEffect } from 'react';
import '../assets/css/Calendar.css';
import CalendarMonthView from './CalendarMonthView'
import CalendarWeekView from './CalendarWeekView'
import CalendarDayView from './CalendarDayView'
import { Button} from 'react-bootstrap'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md';
import {currentDateAction,fistDateInWeekAction,dayDisplayedAction} from "../redux/CalendarSlice"
import { useSelector, useDispatch } from "react-redux";
import Select from 'react-select';
import {getFirstDateFromWeekNo} from '../utils/calendar'
export default function Calendar() {
  
  
    const {date,calendarTitle,fistDateInWeek,dayDisplayed}  = useSelector((state) => state.calendar);
    let calendarViewData =
    [
        { value: "MONTH", label: 'Month' },
        { value: "WEEK", label: 'Week' },
        { value: "DAY", label: 'Day' }
    ]
    const [activeView, setActiveView] = useState("MONTH");
    const dispatch = useDispatch();
  
    useEffect(()=>{
        let today = new Date();
        let firstDayInMonth = new Date(today.getFullYear(),today.getMonth(),1)
        dispatch(currentDateAction({newDate: firstDayInMonth.toString()}));
        let weekNumber = today.getWeekNumber();
        dispatch(fistDateInWeekAction({newWeekDate: getFirstDateFromWeekNo(weekNumber,today.getFullYear()).toString()}));
        }, []);

    const prevBtn = () =>{
        switch(activeView)
        {
            case "MONTH":
                {
                    monthViewChange(false);
                    break;
                }
            case "WEEK":
                {
                    weekViewChange(false);
                    break;
                }
            case "DAY":
                {
                    dayViewChange(false)
                    break;
                }
            default:
                {
                    monthViewChange(false);
                    break;
                }
        }
    }
    const nextBtn = () => {
        switch(activeView)
        {
            case "MONTH":
                {
                    monthViewChange(true);
                    break;
                }
            case "WEEK":
                {
                    weekViewChange(true);
                    break;
                }
            case "DAY":
                {
                    dayViewChange(true)
                    break;
                }
            default:
                {
                    monthViewChange(true);
                    break;
                }
        }
    }
    const todayBtn = () => {

        let today = new Date();
        let firstDayInMonth = new Date(today.getFullYear(),today.getMonth(),1)
        dispatch(currentDateAction({newDate: firstDayInMonth.toString()}));
        let weekNumber = today.getWeekNumber();
        dispatch(fistDateInWeekAction({newWeekDate: getFirstDateFromWeekNo(weekNumber,today.getFullYear()).toString()}));
        dispatch(dayDisplayedAction({newDayDisplayed: new Date().toString()}));
       
    }
    const handleDropdownChange = selectedOption => {
        if(activeView !== selectedOption.value)
        {
            setActiveView(selectedOption.value);
        }
      };
    const monthViewChange = type =>{
        //true next button was pressed
        if(type)
        {
            let updatedDate = new Date(date);
            updatedDate.setDate(1);
            updatedDate.setMonth(new Date(date).getMonth() + 1);
            dispatch(currentDateAction({newDate: updatedDate.toString()}))
        }
        else
        {
            let updatedDate = new Date(date);
            updatedDate.setDate(1);
            updatedDate.setMonth(new Date(date).getMonth() - 1);
            dispatch(currentDateAction({newDate: updatedDate.toString()}));
        }
    }
    const weekViewChange = type =>{
        if(type)
        {
            let addDays = new Date(fistDateInWeek);
            addDays.setDate(addDays.getDate()+7);
            dispatch(fistDateInWeekAction({newWeekDate: addDays.toString()}));
        }
        else
        {
            let addDays = new Date(fistDateInWeek);
            addDays.setDate(addDays.getDate()-7);
            dispatch(fistDateInWeekAction({newWeekDate: addDays.toString()}));
        }
    }
    const dayViewChange = type =>{
        if(type)
        {
            let addDays = new Date(dayDisplayed);
            addDays.setDate(addDays.getDate()+1);
            dispatch(dayDisplayedAction({newDayDisplayed: addDays.toString()}));
            dispatch(fistDateInWeekAction({newWeekDate: getFirstDateFromWeekNo(addDays.getWeekNumber(),addDays.getFullYear()).toString()}));
        }
        else
        {
            let addDays = new Date(dayDisplayed);
            addDays.setDate(addDays.getDate()-1);
            dispatch(dayDisplayedAction({newDayDisplayed: addDays.toString()}));
            dispatch(fistDateInWeekAction({newWeekDate: getFirstDateFromWeekNo(addDays.getWeekNumber(),addDays.getFullYear()).toString()}));
        }
    }
    return (
    <>
    {/* Calendar Tools */}
    <div className="calendar-tools">
        <div className="row text-center ">
            <div className="col-9 ">
                <div className="row">
                    <div className="col-2 order-2 order-md-1 my-col">
                        <Button onClick={() => prevBtn()} variant="outline-info" className="text-uppercase font-weight-bold calendar-tools-arrows px-sm-3 px-md-4 px-lg-5"><MdKeyboardArrowLeft /></Button>
                    </div>
                    <div className="col-2  order-4 order-md-2 my-col">
                        <Button onClick={() => nextBtn()} variant="outline-info" className="text-uppercase font-weight-bold calendar-tools-arrows px-sm-3 px-md-4 px-lg-5"><MdKeyboardArrowRight /></Button>
                    </div>
                    <div className="col-3  order-1 order-md-3 my-col">
                        <Button onClick={() => todayBtn()} variant="outline-info" className="text-uppercase font-weight-bold calendar-tools-today px-sm-3 px-lg-5 px-md-4">TODAY</Button>
                    </div>
                    <div className="col-5  order-3 order-md-4  my-col calendar-tools-date">
                        <h4 className="text-uppercase font-weight-bold mt-1">{calendarTitle}</h4>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div>
                    <Select variant="info" className="text-uppercase font-weight-bold calendar-tools-dropdown"  onChange={handleDropdownChange} options={calendarViewData} defaultValue={{ value: calendarViewData[0].value }, { label: calendarViewData[0].label }} />
                </div>
            </div>
        </div>

    </div>
    <div> {activeView === 'MONTH' && <CalendarMonthView />}
    {activeView === 'WEEK' && <CalendarWeekView />}
    {activeView === 'DAY' && <CalendarDayView />}</div>
    </>
    )
}

