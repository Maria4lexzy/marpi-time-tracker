import {createSlice} from '@reduxjs/toolkit'
const calendarDateSlice = createSlice({
    name: "calendarDate",
    initialState: {
        date: ""
    },
    reducers: {
     /* increment: state => ({...state, count: state.count + 1}),
      decrement: state => ({...state, count: state.count - 1}),*/
      currentDateAction: (state,action) =>
      {
          const { newDate} = action.payload;
          state.date = newDate;
      }
    }
  });

export const {currentDateAction} = calendarDateSlice.actions;
export default calendarDateSlice.reducer;