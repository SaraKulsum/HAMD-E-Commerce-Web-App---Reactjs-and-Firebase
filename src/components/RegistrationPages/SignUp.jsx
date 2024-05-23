import React, { useContext, useState } from 'react'
/* eslint-disable react/no-unescaped-entities */
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Layout from '../Layout'
import MyContext from '../../context/MyContext'
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../Loader';
const SignUp = () => {
  // const context = useContext(MyContext)
   const context = useContext(MyContext);
   const {loading, setLoading } = context;
   const navigate = useNavigate();
   const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
});
/**========================================================================
    *========================================================================**/

const userSignupFunction = async () => {
  // validation 
  if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      toast.error("All Fields are required")
      return false;
  }

  setLoading(true);
  try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      // create user object
      const user = {
          name: userSignup.name,
          email: users.user.email,
          uid: users.user.uid,
          role: userSignup.role,
          time: Timestamp.now(),
          date: new Date().toLocaleString(
              "en-US",
              {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
              }
          )
      }
      //storing userData in local storage
      localStorage.setItem("users", JSON.stringify(user) )
      

      // create user Refrence
      const userRefrence = collection(fireDB, "user")

      // Add User Detail
      addDoc(userRefrence, user);

      setUserSignup({
          name: "",
          email: "",
          password: ""
      })

      toast.success("Signup Successfully");

      setLoading(false);
    //navigate depend on role
    if(user.role === "user") {
        navigate('/UserDashBoard');
    }else{
        navigate('/AdminDashboard');
    }
  } catch (error) {
      console.log(error);
      setLoading(false);
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
                               SIGNUP
                           </h2>
                        </div>

                      {/* Input One  */}
               
                        <input
                          type="text"
                          placeholder='Full Name'
                          className=' border border-gray-400 px-2 py-2  rounded-lg outline-none'
                          value={userSignup.name}
                          onChange={(e)=>setUserSignup({...userSignup, name:e.target.value})}
                          required
                        />
               

                        {/* Input Two  */}
                
                        <input
                          type="email"
                          placeholder='Email Address'
                          value={userSignup.email}
                          onChange={(e)=>setUserSignup({...userSignup,email: e.target.value})}
                          className=' border border-gray-400 px-2 py-2  rounded-lg outline-none'
                          required
                        /> 
              

                        {/* Input Three  */}
                
                        <input
                          type="password"
                          placeholder='Password'
                          value={userSignup.password}
                          onChange={(e)=>setUserSignup({...userSignup,password: e.target.value})}
                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />
                

                        {/* Signup Button  */}
                
                       {/* <button
                       
                        type='button'
                        onClick={userSignupFunction}
                        className='border border-black bg-black hover:bg-white w-full text-white text-center hover:text-black  py-2 font-[600] rounded-md '
                         >
                          Signup
                        </button> */}
                        <input onClick={userSignupFunction} type="button"  value='Signup' accessKey='Enter' className='border border-black bg-black hover:bg-white w-full text-white text-center hover:text-black  py-2 font-[600] rounded-md hover: cursor-pointer' />
                
                    </form>
                    <div className=''>
                        <hr className='h-px mt-6 bg-gray-400 border-0' />
                        <p className='text-center mt-4  font-medium  text-sm md:text-lg  text-gray-900 '>Have an account</p>
                    </div>

                    <div className='flex justify-center py-4 '>
                        <Link className='hover:text-white hover:bg-black text-black font-[600] border-[1px] outline-none rounded-lg px-3 p-1 border-black' to={'/login'}>Login</Link> 
                    </div>
                </div>
           </div>  
       </Layout>      
    );
}

export default SignUp;