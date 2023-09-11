// appointmentApiSlice.js
import { apiSlice } from './apiSlice';
const APPOINTMENTS_URL = '/api/appointments';

export const appointmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAppointment: builder.mutation({
            query: (data) => ({
                url: APPOINTMENTS_URL,
                method: 'POST',
                body: data,
            })
        }),
        getAppointment: builder.query({
            query: (id) => `${APPOINTMENTS_URL}/${id}`
        }),
        updateAppointment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${APPOINTMENTS_URL}/${id}`,
                method: 'PUT',
                body: data,
            })
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `${APPOINTMENTS_URL}/${id}`,
                method: 'DELETE',
            })
        }),
        getCalendarAppointments: builder.query({
            query: () => ({
                url: `${APPOINTMENTS_URL}/calendar`,
                method: 'GET'
            })
        }),
        getCompletedAppointments: builder.query({
            query: () => ({
                url: `${APPOINTMENTS_URL}/completed`,
                method: 'GET'
            })
        }),
        getPendingAppointments: builder.query({
            query: () => ({
                url: `${APPOINTMENTS_URL}/pending`,
                method: 'GET'
            })
        }),
        getMissedAppointments: builder.query({
            query: () => ({
                url: `${APPOINTMENTS_URL}/missed`,
                method: 'GET'
            })
        }),
        getPractitionerAvailability: builder.query({
            query: () => ({
                url: `${APPOINTMENTS_URL}/availability`,
                method: 'GET'
            })
        }),
    })
});

// Exporting the hooks for each endpoint
export const {
    useCreateAppointmentMutation,
    useGetAppointmentQuery,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
    useGetCalendarAppointmentsQuery,
    useGetCompletedAppointmentsQuery,
    useGetPendingAppointmentsQuery,
    useGetMissedAppointmentsQuery,
    useGetPractitionerAvailabilityQuery,
} = appointmentApiSlice;
