import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const response = await axios.get('http://localhost:7070/api/services');
    return response.data;
});

export const fetchServiceDetails = createAsyncThunk('services/fetchServiceDetails', async (id) => {
    const response = await axios.get(`http://localhost:7070/api/services/${id}`);
    return response.data;
});

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        serviceDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchServiceDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServiceDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.serviceDetails = action.payload;
            })
            .addCase(fetchServiceDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default servicesSlice.reducer;
