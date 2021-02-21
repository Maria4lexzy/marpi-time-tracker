import React, { useState, useEffect } from 'react';
import '../assets/css/Calendar.css';
import {getFirstDayIndex,getWeekNumbers,getFirstDateFromWeekNo} from '../utils/calendar.js';
import {Table} from 'react-bootstrap';
import store from '../redux/configureStore';
import {currentTitleAction, fistDateInWeekAction} from "../redux/CalendarSlice";
import { useDispatch, useSelector } from "react-redux";
import watch from 'redux-watch';
export default function CalendarMonthView() {

    //titleText needs to be same name as a slice initial state
    const {fistDateInWeek}  = useSelector((state) => state.calendar);

    const [weekNumbers, setWeekNumbers] = useState([]);
    const [firstCalRow, setFirstCalRow] = useState([]);
    const [secondCalRow, setSecondCalRow] = useState([]);
    const [thirdCalRow, setThirdCalRow] = useState([]);
    const [fourthCalRow, setFourthCalRow] = useState([]);
    const [fifthCalRow, setFifthCalRow] = useState([]);
    const [sixthCalRow, setSixthCalRow] = useState([]);
    //added because calculation of first date in week was wrong if calendar displayed previous month dates
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

    // store is THE redux store
    
    useEffect(()=>{
        if(fistDateInWeek !== "")
            renderCalendar(new Date(fistDateInWeek));
        
        //renderCalendar(new Date(date));
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
        //set calendar title
        dispatch(currentTitleAction({newTitle: monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear()}))
       
        //first day name index
        updatedDate.setDate(1);
        let firstDayIndex = getFirstDayIndex(updatedDate);
        //get number of days in the current month
       
        let lastDay = new Date(updatedDate.getFullYear(),updatedDate.getMonth() + 1,0).getDate();
        //get number of days in previous month
        let prevLastDay = new Date(updatedDate.getFullYear(),updatedDate.getMonth(),0).getDate();
        //total days of current month - laterr adding days from previous and next month
        //setWeekNumbersFromDate
        let weekNumbersFromDate;
        if(firstDayIndex>0)
        {
            weekNumbersFromDate = new Date(
                updatedDate.getFullYear(),
                updatedDate.getMonth()-1,
                prevLastDay - firstDayIndex +1
            );
        }
        else
        {
            weekNumbersFromDate = new Date(
                updatedDate.getFullYear(),
                updatedDate.getMonth(),
                1
            );
        }
        let weekNumber = updatedDate.getWeekNumber();
        ///////update first date of a first week in a month calendar
        let newFirstDateInWeek = "";
        if(weekNumber === 53 || weekNumber === 52 && updatedDate.getMonth() === 0)
            newFirstDateInWeek = getFirstDateFromWeekNo(weekNumber,updatedDate.getFullYear()-1).toString();
        else
            newFirstDateInWeek = getFirstDateFromWeekNo(weekNumber,updatedDate.getFullYear()).toString();

        dispatch(fistDateInWeekAction({newWeekDate: newFirstDateInWeek}));
        
        //set week numbers array
        setWeekNumbers(getWeekNumbers(weekNumbersFromDate));
        //creates previous month calendar days
        let forwardToNextMonth = createCurrentMonth(createPreviousMonthArray(updatedDate,prevLastDay,firstDayIndex),updatedDate,lastDay);
        createNextMonth(updatedDate,forwardToNextMonth);
        
    }
    //loop for creating previous month date numbers and update week date state
    const createPreviousMonthArray = (updatedDate,prevLastDay,firstDayIndex) =>{
        let plusTotalDays = 0;
        let daysArray = [];
        const year = updatedDate.getFullYear();
        const month = updatedDate.getMonth()+1;
        for(let x = firstDayIndex; x > 0;x--)
        {
            daysArray.push(<td key={year + `,`+ month + `,` + (prevLastDay - x + 1)}> <div style={{color:'#E8E8E8'}}  id={year + `,`+ month + `,` + (prevLastDay - x + 1)} className="day-field">{prevLastDay - x + 1}</div>
            <div className="events-wrapper"></div></td>)
            plusTotalDays++;
        }
        //update first week date
          
        
        
        return [plusTotalDays,daysArray];
    }  
     //loop for creating current month date numbers 
     const createCurrentMonth = (prevMonthArray,updatedDate,lastDay) =>{
        let numberOfPrintedDays = prevMonthArray[0];
        let daysArray = prevMonthArray[1];
        const year = updatedDate.getFullYear();
        const month = updatedDate.getMonth()+1;
        let printedRows = 0;

        for(let i = 1; i <= lastDay; i++)
        {
      
            if(numberOfPrintedDays%7===0 && numberOfPrintedDays !== 0)
            {
                switch(printedRows)
                {
                    case 0:
                        {
                            
                            setFirstCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    case 1:
                        {
                           
                            setSecondCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    case 2:
                        {
                         
                            setThirdCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    case 3:
                        {
                            
                            setFourthCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    case 4:
                        {
                            setFifthCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    case 5:
                        {
                            setSixthCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    default:
                        break;
                }
                printedRows++; 
            }
                           
            if ( i === new Date().getDate() && updatedDate.getMonth() === new Date().getMonth() && updatedDate.getFullYear() === new Date().getFullYear())
            {
                daysArray.push(<td className="today" key={year + `,`+ month + `,` +i }>
                <div id={year + `,`+ month + `,` +i } className="day-field">{i}</div> <div className="events-wrapper">
                </div> </td>);
            }
            else
            {
                daysArray.push(<td key={year + `,`+ month + `,` +i }>
                <div id={year + `,`+ month + `,` +i } className="day-field">{i}</div> <div className="events-wrapper">
                </div> </td>);
            }
            numberOfPrintedDays++;
        }

        return [numberOfPrintedDays, printedRows,daysArray];

    } 
     //loop for creating next month date numbers
     const createNextMonth = (updatedDate, printedData) =>{
        let numberOfPrintedDays = printedData[0];
        let rowNumber = printedData[1];
        let daysArray = printedData[2];
        const year = updatedDate.getFullYear();
        const month = updatedDate.getMonth()+1;
        let loopHandler = 42 - numberOfPrintedDays;
        for (let j = 1; j <= loopHandler; j++) {
         
            if(numberOfPrintedDays%7===0)
            {
                switch(rowNumber)
                {
                    case 3:
                        {
                            
                            setFourthCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    case 4:
                        {
                            
                            setFifthCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    case 5:
                        {
                            break;
                        }
                    case 2:
                        {
                            setThirdCalRow(daysArray);
                            daysArray = [];
                            break;
                        }
                    default:
                        break;
                }
                rowNumber++;
            }
            numberOfPrintedDays++;
            daysArray.push(<td key={year + `,`+ month + `,` +j }>
                <div id={year + `,`+ month + `,` +j } className="day-field" style={{color:'#E8E8E8'}} >{j}</div> <div className="events-wrapper">
                </div> </td>);
        }
        setSixthCalRow(daysArray);
      
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
                        <tbody>
                        <tr>  
                            <td>
                                <div className="day-field" style={{fontWeight: 'bold'}}>{weekNumbers[0]}</div>
                                <div className="events-wrapper"></div> 
                            </td>
                            {firstCalRow}
                        </tr>
                        <tr>  
                            <td>
                                <div className="day-field" style={{fontWeight: 'bold'}}>{weekNumbers[1]}</div>
                                <div className="events-wrapper"></div> 
                            </td>
                            {secondCalRow}
                        </tr>
                        <tr>  
                            <td>
                                <div className="day-field" style={{fontWeight: 'bold'}}>{weekNumbers[2]}</div>
                                <div className="events-wrapper"></div> 
                            </td>
                            {thirdCalRow}
                        </tr>
                        <tr>  
                            <td>
                                <div className="day-field" style={{fontWeight: 'bold'}}>{weekNumbers[3]}</div>
                                <div className="events-wrapper"></div> 
                            </td>
                            {fourthCalRow}
                        </tr>
                        <tr>  
                            <td>
                                <div className="day-field" style={{fontWeight: 'bold'}}>{weekNumbers[4]}</div>
                                <div className="events-wrapper"></div> 
                            </td>
                            {fifthCalRow}
                        </tr>
                        <tr>  
                            <td>
                                <div className="day-field" style={{fontWeight: 'bold'}}>{weekNumbers[5]}</div>
                                <div className="events-wrapper"></div> 
                            </td>
                            {sixthCalRow}
                        </tr>
                        </tbody>
                    </Table>

                </div>
        </>
    )
}

