import { configureStore } from '@reduxjs/toolkit' 
import { cartSlice } from './cartSlice'



 const store = configureStore({
  //to remove timestamp error
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  //reducer that contain reducers as obj
  reducer: {
    cart : cartSlice.reducer,
  },
})
export default store