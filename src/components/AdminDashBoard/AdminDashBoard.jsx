import React, { useContext } from 'react'
import { SlGraph } from "react-icons/sl";
import { PiSquaresFour } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MdDashboard } from "react-icons/md";
import ProductsDetails from './ProductsDetails';
import OrdersDetails from './OrdersDetails';
import UsersDetails from './UsersDetails';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import Layout from '../Layout';
const AdminDashBoard = () => {
    const context = useContext(MyContext);
    const {getAllProduct, getAllOrders, getAllUsers} = context;
    const totalUsers = getAllUsers.length;
    const totalOrders = getAllOrders.length; 
    const totalProducts = getAllProduct.length;
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear('users');
        navigate("/")
    }
  return (
    <Layout>
        <div className='font-sans px-8 md:px-24 flex flex-col gap-7'>
        <div className='welcome mt-8 py-8 px-4 bg-white border flex justify-between'>
            <h1 className='flex justify-center items-center gap-1  text-[500] text-lg md:text-3xl tracking-wide uppercase'>Admin Dashboard<MdDashboard/> </h1> 
           
            <button onClick={logout} className="bg-black text-white p-3">LogOut</button>   
       
        </div>
        <div className='optCards w-full flex gap-4 md:gap-8 justify-center'>
            <Tabs className='w-full '>
                <TabList className='flex justify-center gap-4 md:gap-6 w-full '>
                        <Tab className='w-1/3 '>
                        <div className="totalProductsborder h-[155px] border flex flex-col justify-between bg-white rounded-md  p-4 hover:shadow-xl transform hover:cursor-pointer hover:scale-[105%] transition-all ">
                           <span className='flex justify-around flex-col md:flex-row font-[500] text-[16px] md:text-2xl md:font-normal items-center '><PiSquaresFour className='size-8 md:size-16 '  />{'('+totalProducts+')'}</span>
                           <span className='text-sm md:text-2xl  font-normal flex justify-center'>TOTAL PRODUCTS</span>
                       </div>
                        </Tab> 
                        <Tab className='w-1/3'>
                        <div  className="totalOrders h-[155px] border flex flex-col  md:justify-around justify-between bg-white rounded-md  p-4 hover:shadow-xl transform hover:cursor-pointer hover:scale-[105%] transition-all ">
                           <span className='flex justify-around flex-col md:flex-row font-[500] text-[16px] md:text-2xl md:font-normal items-center '><SlGraph className='size-8 md:size-16  '  />{'('+totalOrders+')'}</span>
                           <span className='text-sm md:text-2xl  font-normal flex justify-center'>TOTAL ORDERS</span>
                       </div>
                        </Tab>
                        <Tab className='w-1/3'>
                        <div className="totalUsers h-[155px] border flex flex-col justify-between bg-white rounded-md  p-4 hover:shadow-xl transform hover:cursor-pointer hover:scale-[105%] transition-all ">
            <span className='flex justify-around flex-col md:flex-row font-[500] text-[16px] md:text-2xl md:font-normal items-center '><FaUsers className='size-8 md:size-16'  />{'('+totalUsers+')'}</span>
               <span className='text-sm md:text-2xl  font-normal flex justify-center'>TOTAL USERS</span>
           </div>
                        </Tab>
                </TabList>
                 
                <TabPanel className='my-8 shadow-md'>
                   <ProductsDetails />
                </TabPanel>
                <TabPanel className='my-8 shadow-md'>
                    <OrdersDetails/>
                </TabPanel>
                <TabPanel className='my-8 shadow-md'>
                  <UsersDetails/>
                </TabPanel>
            </Tabs>
           
           
           
          
        </div>
       
       

    </div>
    </Layout>
  )
}

export default AdminDashBoard