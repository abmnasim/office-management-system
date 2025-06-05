import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAuthenticated, login as loginAPI, logout as logoutAPI, resendOtp as resendOtpAPI, verifyOtp as verifyOtpAPI } from '../../services/authAPI';

const login = createAsyncThunk('auth/login', async ({email, password}, thunkAPI) => {
    const response = await loginAPI(email, password);
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        return thunkAPI.rejectWithValue(data.message);
    }
})

const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({email, otp}, thunkAPI) => {
    const response = await verifyOtpAPI(email, otp);
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {        
        return thunkAPI.rejectWithValue(data.message);
    }
})

const checkAuth = createAsyncThunk('auth/checkAuth', async (_, thunkAPI) => {
    const response = await isAuthenticated();
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        return thunkAPI.rejectWithValue(data.message);
    }
})

const resendOtp = createAsyncThunk('auth/resendOtp', async (email, thunkAPI) => {
    const response = await resendOtpAPI(email);
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        return thunkAPI.rejectWithValue(data.message);
    }
})

const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    const response = await logoutAPI();
    if (response.ok) {
        return;
    } else {
        return thunkAPI.rejectWithValue("Logout failed");
    }
})


const initialState = {
    user: null,
    email: "",
    requiresOTP: false,
    status: "idle",
    otpSent: false,
    isLoggedIn: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            state.isLoggedIn = true;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user || null;
                state.email = action.meta.arg.email || "";
                state.requiresOTP = !action.payload.user;
                state.otpSent = state.requiresOTP;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.requiresOTP = !action.payload.verified
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.status = "verifying";
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.status = "succeeded";
                state.requiresOTP = false;
                state.otpSent = false;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload
            })
            .addCase(resendOtp.pending, (state) => {
                state.status = "sending";
                state.error = null;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.status = "sended";
                state.otpSent = true;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user || null;
                state.isLoggedIn = !!action.payload.user;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logout.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "succeeded";
                state.user = null;
                state.isLoggedIn = false;
                state.email = "";
                state.requiresOTP = false;
                state.otpSent = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const { setCredentials, } = authSlice.actions; 
export { checkAuth, login, logout, resendOtp, verifyOtp };
export default authSlice.reducer;