import {createSlice} from '@reduxjs/toolkit'
import {fetchCalendarMonthSum} from './ThunkAPICalls'



const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        date: "",
        dayDisplayed: "",
        fistDateInWeek: "",
        calendarTitle: "",
        viewType: "MONTH",
        monthData: [],
    },
    reducers: {
     /* increment: state => ({...state, count: state.count + 1}),
      decrement: state => ({...state, count: state.count - 1}),*/
      currentDateAction: (state,action) =>
      {
          const { newDate} = action.payload;
          state.date = newDate;
      },
      dayDisplayedAction: (state,action) =>
      {
          const { newDayDisplayed} = action.payload;
          state.dayDisplayed = newDayDisplayed;
      },
      fistDateInWeekAction: (state,action) =>
      {
          const { newWeekDate} = action.payload;
          state.fistDateInWeek = newWeekDate;
      },
      currentTitleAction: (state,action) =>
      {
          const { newTitle} = action.payload;
          state.calendarTitle = newTitle;
      },
      currentViewAction: (state,action) =>
      {
          const { newView} = action.payload;
          state.viewType = newView;
      }
    },
    extraReducers: builder => {
        builder.addCase(fetchCalendarMonthSum.fulfilled, (state, action) => {
          state.monthData = action.payload;
          })
    }
  });

export const {currentDateAction, dayDisplayedAction, currentTitleAction, currentViewAction, fistDateInWeekAction} = calendarSlice.actions;
export default calendarSlice.reducer;