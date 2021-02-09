import React, { useState, useEffect } from 'react';
import '../assets/css/Calendar.css';
import CalendarMonthView from './CalendarMonthView'
import CalendarWeekView from './CalendarWeekView'
import { Button, Dropdown, DropdownButton} from 'react-bootstrap'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md';
import {currentDateAction, selectedWeekAction} from "../redux/CalendarSlice"
import { useSelector, useDispatch } from "react-redux";
import Select from 'react-select';
export default function Calendar() {
  
  
    const {date,week,calendarTitle}  = useSelector((state) => state.calendar);
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
        dispatch(currentDateAction({newDate: today.toString()}))
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
                    console.log(activeView);
                    weekViewChange(false);
                    break;
                }
            case "day":
                {

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
            case "day":
                {
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
        today.setHours(0,0,0,0);
        today.setDate(1);
        let storedDate = new Date(date);
        storedDate.setHours(0,0,0,0);
        if(today.getTime() !== storedDate.getTime())
        {
            dispatch(currentDateAction({newDate: today.toString()}));
            if(activeView === "WEEK")
            {
                dispatch(selectedWeekAction({newWeek: 0}));
            }
        }
       
    }

    const handleDropdownChange = selectedOption => {
        if(activeView !== selectedOption.value)
        {
            setActiveView(selectedOption.value);
        }
      };
    const monthViewChange = type =>{
        //true next button was pressed
        dispatch(selectedWeekAction({newWeek: 0}));
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
            dispatch(selectedWeekAction({newWeek: week+1}));
        }
        else
        {
            dispatch(selectedWeekAction({newWeek: week-1}));
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
    {activeView === 'WEEK' && <CalendarWeekView />}</div>
    </>
    )
}

