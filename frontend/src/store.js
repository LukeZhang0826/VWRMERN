import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import { usersApiSlice } from './slices/usersApiSlice'; // Make sure the path is correct
import { appointmentApiSlice } from './slices/appointmentApiSlice'; // Make sure the path is correct

const store = configureStore({
    reducer: {
        auth: authReducer, 
        [apiSlice.reducerPath]: apiSlice.reducer,
        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
        [appointmentApiSlice.reducerPath]: appointmentApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            apiSlice.middleware, 
            usersApiSlice.middleware, 
            appointmentApiSlice.middleware
        ),
    devTools: true,
});

export default store;