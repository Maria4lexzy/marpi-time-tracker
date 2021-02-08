import React, { useState, useEffect } from 'react';
import '../assets/css/Calendar.css';
import CalendarMonthView from './CalendarMonthView'
import CalendarWeekView from './CalendarWeekView'
import { Button, Dropdown, DropdownButton} from 'react-bootstrap'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md';
import {currentDateAction} from "../redux/CalendarDateSlice"
import { useSelector, useDispatch } from "react-redux";
export default function Calendar() {
  
  
    const {date}  = useSelector((state) => state.currentDate);
    const {calendarTitle}  = useSelector((state) => state.currentTitle);
    const [activeView, setActiveView] = useState("MONTH");
    const dispatch = useDispatch();
    const switchToMonthView = () => { 
        if(activeView !== "MONTH") setActiveView('MONTH'); 
        }
    const switchToWeekView = () => { 
        if(activeView !== "WEEK") setActiveView('WEEK');
        }

    useEffect(()=>{
        dispatch(currentDateAction({newDate: new Date().toString()}))
        }, []);
    const prevBtn = () =>{
        let updatedDate = new Date(date);
        updatedDate.setDate(1);
        updatedDate.setMonth(new Date(date).getMonth() - 1);
        dispatch(currentDateAction({newDate: updatedDate.toString()}));
        }
    const nextBtn = () => {
        console.log("btn");
        let updatedDate = new Date(date);
        updatedDate.setDate(1);
        updatedDate.setMonth(new Date(date).getMonth() + 1);
        dispatch(currentDateAction({newDate: updatedDate.toString()}))
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
                        <Button variant="outline-info" className="text-uppercase font-weight-bold calendar-tools-today px-sm-3 px-lg-5 px-md-4">TODAY</Button>
                    </div>
                    <div className="col-5  order-3 order-md-4  my-col calendar-tools-date">
                        <h4 className="text-uppercase font-weight-bold mt-1">{calendarTitle}</h4>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div>
                    <DropdownButton variant="info" className="text-uppercase font-weight-bold calendar-tools-dropdown" id="month-view-button" title="View">
                        <Dropdown.Item onClick={switchToMonthView}>MONTH</Dropdown.Item>
                        <Dropdown.Item onClick={switchToWeekView}>WEEK</Dropdown.Item>
                        <Dropdown.Item href="#">DAY</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </div>

    </div>
    <div> {activeView === 'MONTH' && <CalendarMonthView />}
    {activeView === 'WEEK' && <CalendarWeekView />}</div>
    </>
    )
}

