import React, { useState } from 'react';
import '../assets/css/Calendar.css';
import CalendarMonthView from './CalendarMonthView'
import CalendarWeekView from './CalendarWeekView'
import { Button, Dropdown, DropdownButton} from 'react-bootstrap'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md';
export default function Calendar() {
  
    const [activeView, setActiveView] = useState("MONTH");
    const switchToMonthView = () => { 
        if(activeView !== "MONTH") setActiveView('MONTH'); 
        }
    const switchToWeekView = () => { 
        if(activeView !== "WEEK") setActiveView('WEEK');
        }
       return (
        <>
        {/* Calendar Tools */}
        <div className="calendar-tools">
            <div className="row text-center ">
                <div className="col-9 ">
                    <div className="row">
                        <div className="col-2 order-2 order-md-1 my-col">
                            <Button variant="outline-info" className="text-uppercase font-weight-bold calendar-tools-arrows px-sm-3 px-md-4 px-lg-5"><MdKeyboardArrowLeft /></Button>
                        </div>
                        <div className="col-2  order-4 order-md-2 my-col">
                            <Button variant="outline-info" className="text-uppercase font-weight-bold calendar-tools-arrows px-sm-3 px-md-4 px-lg-5"><MdKeyboardArrowRight /></Button>
                        </div>
                        <div className="col-3  order-1 order-md-3 my-col">
                            <Button variant="outline-info" className="text-uppercase font-weight-bold calendar-tools-today px-sm-3 px-lg-5 px-md-4">TODAY</Button>
                        </div>
                        <div className="col-5  order-3 order-md-4  my-col calendar-tools-date">
                            <h4 className="text-uppercase font-weight-bold mt-1">January 2021</h4>
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

