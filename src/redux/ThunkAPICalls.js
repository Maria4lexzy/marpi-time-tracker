import {api} from '../utils/RestAPI'
import {createAsyncThunk} from '@reduxjs/toolkit'



//getting user sum / default view of calendar
export const fetchCalendarMonthSum = createAsyncThunk(
    'calendar/fetchCalendarSum',
    async (props, thunkAPI) => {
    const response = await  api.get("get-schedule/"+props[0]+"/"+props[1]);
      return response.data;
    }
  )