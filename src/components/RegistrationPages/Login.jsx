import React from 'react'
import { useContext, useState } from 'react';
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import MyContext from "../../context/MyContext";
import { toast } from 'react-toastify'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;
   // navigate 
   const navigate = useNavigate();

   // User Signup State 
   const [userLogin, setUserLogin] = useState({
       email: "",
       password: ""
   });

   /**========================================================================
   *========================================================================**/

   const userLoginFunction = async () => {
       // validation 
       if (userLogin.email === "" || userLogin.password === "") {
           toast.error("All Fields are required")
       }

       setLoading(true);
       try {
           const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            console.log(users.user)

           try {
               const q = query(
                   collection(fireDB, "user"),
                   where('uid', '==', users?.user?.uid)
               );
               const data = onSnapshot(q, (QuerySnapshot) => {
                   let user;
                   QuerySnapshot.forEach((doc) => user = doc.data());
                   localStorage.setItem("users", JSON.stringify(user) )
                   setUserLogin({
                       email: "",
                       password: ""
                   })
                   toast.success("Login Successfully");
                   setLoading(false);
                   if(user.role === "user") {
                       navigate('/UserDashBoard');
                   }else{
                       navigate('/AdminDashboard');
                   }
               });
               return () => data;
           } catch (error) {
               console.log(error);
               setLoading(false);
           }
       } catch (error) {
           console.log(error);
           setLoading(false);
           toast.error("Login Failed");
       }
   }
  return (
    <Layout>
            <div className='flex justify-center items-center my-32'>
              {loading && <Loader/>}
                {/* Login Form  */}
                <div className="login_Form px-1 py-6 ">
                    <form action="" className='flex flex-col gap-4 w-[280px] md:w-80 '>

             
                     {/* Top Heading  */}  
                        <div className="mb-5">
                            <h2 className='text-center text-2xl font-[500] text-black '>
                               LOGIN
                           </h2>
                        </div>

                       {/* Input One  */}
               
                        
                
                        <input
                          type="email"
                          placeholder='Email Address'
                          value={userLogin.email}
                          onChange={(e) => {
                              setUserLogin({
                                  ...userLogin,
                                  email: e.target.value
                              })
                          }}
                          className=' border border-gray-400 px-2 py-2  rounded-lg outline-none'
                          required
                        /> 
              

                       {/* Input Two  */}
                
                        <input
                          type="password"
                          placeholder='Password'
                          value={userLogin.password}
                          onChange={(e) => {
                              setUserLogin({
                                  ...userLogin,
                                  password: e.target.value
                              })
                          }}
                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />
                

                        {/* login Button  */}
                
                     
                        <input onClick={userLoginFunction} type="button" value='Login' accessKey='Enter' className='border border-black bg-black hover:bg-white w-full text-white text-center hover:text-black  py-2 font-[600] rounded-md hover: cursor-pointer' />
                
                    </form>
                    <div className=''>
                        <hr className='h-px mt-6 bg-gray-400 border-0' />
                        <p className='text-center mt-4  font-medium  text-sm md:text-lg  text-gray-900 '>Don't Have An Account?</p>
                    </div>

                    <div className='flex justify-center py-4 '>
                        <Link className='hover:text-white hover:bg-black text-black font-[600] border-[1px] outline-none rounded-lg px-3 p-1 border-black' to={'/Signup'}>Signup</Link> 
                    </div>
                </div>
           </div>  
       </Layout>      
  )
}

export default Login