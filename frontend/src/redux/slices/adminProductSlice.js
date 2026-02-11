import { createSlice, createAsyncThunk, isAction } from "@reduxjs/toolkit"
import axios from "axios"


const API_URL = `${import.meta.env.VITE_BACKEND_URL}`

// Helper function to get token dynamically
const getAuthHeaders = () => {
    const token = localStorage.getItem("userToken")
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

//thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchProducts",
    async()=>{
        const response = await axios.get(`${API_URL}/api/admin/products`, getAuthHeaders())
        return response.data
    }
)

//to crate a new product
export const createProduct = createAsyncThunk(
    "adminProducts/createProduct",
    async(productData) =>{
        const response = await axios.post(
            `${API_URL}/api/admin/products`,
            productData,
            getAuthHeaders()
        )
        return response.data
    }
) 

//update an existing product
export const updateProduct = createAsyncThunk(
    "adminProducts/updateProduct",
    async({id, productData}) =>{
        const response = await axios.put(
            `${API_URL}/api/admin/products/${id}`,
            productData,
            getAuthHeaders()
        )
    return response.data
    }
)

//delete product
export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (id)=>{
        await axios.delete(`${API_URL}/api/admin/products/${id}`, getAuthHeaders())
        return id
    }
)

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAdminProducts.pending, (state)=>{
            state.loading = true
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.products =  action.payload
        })
        .addCase(fetchAdminProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
        })
        //create prod.
        .addCase(createProduct.fulfilled, (state, action)=>{
            state.products.push(action.payload)
        })

        //update prod.
        .addCase(updateProduct.fulfilled, (state, action)=>{
            const index = state.products.findIndex(
                (product)=> product._id === action.payload._id
            )
            if(index !== -1)
            {
                state.products[index] = action.payload
            }
        })
        //delete prod.
        .addCase(deleteProduct.fulfilled, (state, action)=>{
            state.products = state.products.filter(
                (product)=> product._id !== action.payload
            )
        })
    }
})

export default adminProductSlice.reducer

