import axios from "axios"
import store from "../redux/store"
import { logout } from "../redux/slices/authSlice"
import { toast } from "sonner"

export const setupAxiosInterceptors = (navigate) => {
  // Response interceptor to handle token expiration
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        const state = store.getState()
        const { user } = state.auth

        if (user) {
          // User was logged in but token expired
          store.dispatch(logout())
          toast.error("Your session has expired. Please sign in again.")
          navigate("/login")
        }
      }
      return Promise.reject(error)
    }
  )
}
