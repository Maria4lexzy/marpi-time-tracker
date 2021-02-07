import React from 'react'
import { Button, Card, Alert, Container, Table, Dropdown, DropdownButton, Item, Col, Row } from 'react-bootstrap'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdFiberManualRecord } from 'react-icons/md';

export default function CalanderTesting() {
    return (
        <>
            <Container fluid className="calendar mt-5">
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
                                    <Dropdown.Item href="#" >MONTH</Dropdown.Item>
                                    <Dropdown.Item href="#">WEEK</Dropdown.Item>
                                    <Dropdown.Item href="#">DAY</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-5 calendar">
                    <Table bordered responsive="md" className="month">
                        <thead className="text-uppercase text-center">
                            <tr>
                                <th>#</th>
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
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">1</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">29</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">30</div>
                                    <div className="events-wrapper"></div>
                                </td>
                                <td>
                                    <div className="day-field">31</div>
                                    <div className="events-wrapper"></div>
                                </td>

                            </tr>

                        </tbody>
                    </Table>

                </div>
                <div className="mt-5 week">
                    <Table bordered responsive="md" className="month">
                        <thead className="text-uppercase text-center">
                            <tr>
                                <th></th>
                                <th>Mon 24</th>
                                <th>Tue 25</th>
                                <th>Wed 28</th>
                                <th>Thu 28</th>
                                <th>Fri 28</th>
                                <th>Sat 28</th>
                                <th>Sun 28</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="hour-field">1:00</th>
                                <td data-date-time="24/01/2021 1:00">
                                    <div className="event event-short"><div className="pe-1 event-circle " style={{ color: "#1F66F1" }} >< MdFiberManualRecord /> Meeting</div></div>
                                </td>
                                <td data-date-time="24/01/2021 1:00">
                                    <div className="event event-short"><div className="pe-1 event-circle " style={{ color: "#1F66F1" }} >< MdFiberManualRecord /> Meeting</div></div>
                                </td>
                                <td data-date-time="24/01/2021 1:00">
                                    <div className="event event-short"><div className="pe-1 event-circle " style={{ color: "#1F66F1" }} >< MdFiberManualRecord /> Meeting</div></div>
                                </td>
                                <td data-date-time="24/01/2021 1:00">
                                    <div className="event event-short"><div className="pe-1 event-circle " style={{ color: "#1F66F1" }} >< MdFiberManualRecord /> Meeting</div></div>
                                </td>
                                <td data-date-time="24/01/2021 1:00">
                                    <div className="event event-short"><div className="pe-1 event-circle " style={{ color: "#1F66F1" }} >< MdFiberManualRecord /> Meeting</div></div>
                                </td>
                                <td data-date-time="24/01/2021 1:00">
                                    <div className="event event-short"><div className="pe-1 event-circle " style={{ color: "#1F66F1" }} >< MdFiberManualRecord /> Meeting</div></div>
                                </td>
                                <td data-date-time="24/01/2021 1:00">
                                    <div className="event event-short"><div className="pe-1 event-circle " style={{ color: "#1F66F1" }} >< MdFiberManualRecord /> Meeting</div></div>
                                </td>

                            </tr>
                            <tr>
                                <th className="hour-field">2:00</th>
                                <td data-date-time="24/01/2021 1:00"></td>
                                <td data-date-time="24/01/2021 1:00"></td>
                                <td data-date-time="24/01/2021 1:00"></td>
                                <td data-date-time="24/01/2021 1:00"></td>
                                <td data-date-time="24/01/2021 1:00"></td>
                                <td data-date-time="24/01/2021 1:00"></td>
                                <td data-date-time="24/01/2021 1:00"></td>
                            </tr>
                        </tbody>
                    </Table>

                </div>
            </Container>
        </>
    )
}
