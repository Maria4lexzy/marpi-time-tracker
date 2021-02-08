import {createSlice} from '@reduxjs/toolkit'
const calendarTitleSlice = createSlice({
    name: "calendarTitle",
    initialState: {
        calendarTitle: ""
    },
    reducers: {
     /* increment: state => ({...state, count: state.count + 1}),
      decrement: state => ({...state, count: state.count - 1}),*/
      currentTitleAction: (state,action) =>
      {
          const { newTitle} = action.payload;
          state.calendarTitle = newTitle;
      }
    }
  });

export const {currentTitleAction} = calendarTitleSlice.actions;
export default calendarTitleSlice.reducer;