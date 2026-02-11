import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async(checkoutdata, {rejectWithValue})=>{
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                checkoutdata,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data
        }
        catch(error)
        {
            error.response?.data?.message || "Unable to place order"
        }
    }
)

export const fetchCheckoutById = createAsyncThunk(
    "checkout/fetchCheckoutById",
    async(checkoutId, {rejectWithValue})=>{
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data
        }
        catch(error)
        {
            return rejectWithValue(
                error.response?.data?.message || "Unable to fetch checkout"
            )
        }
    }
)

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(createCheckout.pending, (state)=>{
            state.loading =true
            state.error=null
        })
        .addCase(createCheckout.fulfilled, (state, action)=>{
            state.loading =false
            state.checkout= action.payload
        })
        .addCase(createCheckout.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload || action.error.message || "Checkout failed"
        })
        .addCase(fetchCheckoutById.pending, (state)=>{
            state.loading =true
            state.error=null
        })
        .addCase(fetchCheckoutById.fulfilled, (state, action)=>{
            state.loading =false
            state.checkout= action.payload
        })
        .addCase(fetchCheckoutById.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload || action.error.message || "Failed to fetch checkout"
        })
    }
})

export default checkoutSlice.reducer