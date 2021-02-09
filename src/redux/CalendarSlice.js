import {createSlice} from '@reduxjs/toolkit'
const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        date: "",
        week: 0,
        calendarTitle: "",
        viewType: "MONTH"
    },
    reducers: {
     /* increment: state => ({...state, count: state.count + 1}),
      decrement: state => ({...state, count: state.count - 1}),*/
      currentDateAction: (state,action) =>
      {
          const { newDate} = action.payload;
          state.date = newDate;
      },
      selectedWeekAction: (state,action) =>
      {
          const { newWeek} = action.payload;
          state.week = newWeek;
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
    }
  });

export const {currentDateAction, selectedWeekAction, currentTitleAction, currentViewAction} = calendarSlice.actions;
export default calendarSlice.reducer;