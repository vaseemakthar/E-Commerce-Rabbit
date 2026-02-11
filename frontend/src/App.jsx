import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import UserLayout from './components/Layout/UserLayout';
import Home from "./pages/Home";
import {Toaster} from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { Navigate } from "react-router-dom";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import {Provider} from "react-redux"
import store from "./redux/store"
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { setupAxiosInterceptors } from "./utils/axiosConfig";

const AppContent = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setupAxiosInterceptors(navigate)
  }, [navigate])

  return (
    <>
      <Toaster position="top-right"/>
      <Routes>
        
        <Route path="/" element={<UserLayout/>}>
          <Route index element={<Home />}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="collections/:all" element={<CollectionPage/>}/>
          <Route path="product/:id" element={<ProductDetails />}/>
          <Route path="checkout" element={<Checkout />}/>
          <Route path="order-confirmation" element={<OrderConfirmationPage />}></Route>
          <Route path="order/:id" element={<OrderDetailsPage />}></Route>
          <Route path="my-orders" element={<Navigate to="/profile" />}></Route>
        </Route>

        <Route 
        path="/admin" 
        element={
         <ProtectedRoute role="admin">
              <AdminLayout />
         </ProtectedRoute> 
        }
        >
          <Route index element={<AdminHomePage />}></Route>
          <Route path="users" element={<UserManagement />}></Route>
          <Route path="products" element={<ProductManagement />}></Route>
          <Route path="products/:id/edit" element={<EditProductPage />}></Route>
          <Route path="orders" element={<OrderManagement />}></Route>
        </Route>

      </Routes>
    </>
  )
}

const App = () => {
  return (
    <Provider store={store}>
     <BrowserRouter>
       <AppContent />
     </BrowserRouter>
     </Provider>
  )
}

export default App;


