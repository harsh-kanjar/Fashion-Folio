import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const host = 'https://fashion-folio-ecom-store-backend.onrender.com';
// const host = 'http://localhost:5000'
const headers = {
    'Content-Type': 'application/json',
  }
 
export const signupUser = createAsyncThunk('auth/signupUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${host}/api/v1/auth/createuser`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData),
        });

        const json = await response.json();
        if (!response.ok) {
            return rejectWithValue(json.message);
        }

        return json;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}); 

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await fetch(`${host}/api/v1/auth/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(credentials),
        });

        const json = await response.json();
        if (!response.ok) {
            return rejectWithValue(json.message);
        }

        return json;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    user: null,
    loading: false,
    error: null,
};
 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Save user data if needed
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem('ecom-auth-token', action.payload.authToken);
                state.user = action.payload; 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions and reducer
export const { resetError } = authSlice.actions;
export default authSlice.reducer;
