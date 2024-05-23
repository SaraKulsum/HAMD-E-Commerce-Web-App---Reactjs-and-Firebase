
import {
  BrowserRouter as Router,
  Route,
  Routes,
}from "react-router-dom";
import './App.css'
import './gridFilter.css'
import HomePage from './components/HomePage';
import WomensWear from './components/WomensWear';
import MensWear from "./components/MensWear";
import ProductInfoPage from "./components/ProductInfoPage";
import CartPage from "./components/CartPage";
import SignUp from "./components/RegistrationPages/SignUp";
import Login from "./components/RegistrationPages/Login";
import UserDashBoard from "./components/UserDashBoard";
import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import AddProducts from "./components/AdminDashBoard/AddProducts";
import { UpdateProductPage } from "./components/AdminDashBoard/UpdateProductPage";
import MyState from "./context/MyState";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRouteForAdmin } from "./components/ProtectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForUser } from "./components/ProtectedRoute/ProtectedRouteForUser";
import CategoryPage from "./components/CategoryPage";

function App() {
  

  return (
    <>
     <MyState>
          <Router>
              <Routes>
                  <Route path='/' element = {<HomePage />}/>
                  <Route path='/WomensWear' element = {<WomensWear />}/>
                  <Route path='/MensWear' element = {<MensWear />}/>       
                  <Route path='/ProductInfo/:id' element = {<ProductInfoPage />}/>        
                  <Route path='/cart' element = {<CartPage />}/>
                       
                  <Route path='/Signup' element = {<SignUp />}/>        
                  <Route path='/Login' element = {<Login />}/>        
                  <Route path='/UserDashBoard' element = {
                  <ProtectedRouteForUser> <UserDashBoard /> </ProtectedRouteForUser>
                  }/>        
                  <Route path='/AdminDashBoard' element = {
                  <ProtectedRouteForAdmin><AdminDashBoard /></ProtectedRouteForAdmin>
                  }/>    
                  <Route path='/AddProduct' element = {
                  <ProtectedRouteForAdmin><AddProducts /></ProtectedRouteForAdmin>
                  }/>      
                  <Route path='/UpdateProductPage/:id' element = {
                  <ProtectedRouteForAdmin><UpdateProductPage /></ProtectedRouteForAdmin>
                  }/>   

                  <Route path=':gender/collections/:category' element = {<CategoryPage />}/>        
                  
              </Routes>
              <ToastContainer/>
           </Router>
       </MyState>
 </>
  )
}

export default App
