import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Server host and headers
const host = 'https://fashion-folio-ecom-store-backend.onrender.com';
const getAuthToken = () => localStorage.getItem('ecom-auth-token');
const getHeaders = () => ({
    'Content-Type': 'application/json',
    ...(getAuthToken() && { 'auth-token': getAuthToken() }),
});

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${host}/api/v1/product/getallorders`, {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                return rejectWithValue(
                    errorResponse.message || 'Failed to fetch orders'
                );
            }

            const result = await response.json();

            if (!Array.isArray(result)) {
                throw new Error('Invalid response format: Orders must be an array');
            }

            // Sorting orders by date (newest first)
            return result.sort(
                (a, b) =>
                    new Date(b.dateOrdered || 0) - new Date(a.dateOrdered || 0)
            );
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for checkout
export const checkout = createAsyncThunk(
    'order/checkout',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${host}/api/v1/product/makeorder`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `HTTP error! status: ${response.status} - ${errorText}`
                );
            }

            const result = await response.json();
            return result; // Return result to update the state
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Initial state
const initialState = {
    orderItems: [],
    loading: false,
    error: null,
    successMessage: '', // Holds success message after checkout
};

// Create the slice
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(checkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = 'Order placed successfully!';
            })
            .addCase(checkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer and actions
export const { clearSuccessMessage } = orderSlice.actions;
export default orderSlice.reducer;
