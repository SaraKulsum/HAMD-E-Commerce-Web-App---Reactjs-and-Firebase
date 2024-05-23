import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import MyContext from '../../context/MyContext';
import { toast } from 'react-toastify';
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from '../Loader';
import { Link, useNavigate } from 'react-router-dom';

const AddProducts = () => {
  

  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  // navigate 
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
      title: "",
      price: "",
      imageURL1: "",
      imageURL2: "",
      category: "t-shirts",
      gender: "",
      color:"",
      size:"",
      quantity : 1,
      time: Timestamp.now(),
      date: new Date().toLocaleString(
          "en-US",
          {
              month: "short",
              day: "2-digit",
              year: "numeric",
          }
      )
  });
  // Add Product Function
  const addProductFunction = async () => {
    console.log(product)
    if (product.title == "" || product.price == "" || product.imageURL1 == "" || product.category == "" || product.color == "" || product.gender == "") {
        return toast.error("All Fields Are Required")
    }

    setLoading(true);
    try {
        const productRef = collection(fireDB, 'products');
        await addDoc(productRef, product)
        toast.success("Product Added Successfully");
        navigate('/AdminDashBoard')
        setLoading(false)
    } catch (error) {
        console.log(error);
        setLoading(false)
        toast.error("Add product failed");
    }

}
  const categoryList = [
    {
        name: 't-shirts'
    },
    {
        name: 'shirts'
    },
    {
        name: 'jackets'
    },
    {
        name: 'trousers'
    },
    {
        name: 'jeans'
    },
    {
        name: 'coats'
    },
    {
      name: 'co-ords'
    },
    {
      name: 'dresses'
    },
    {
      name: 'suits'
    }
    
]
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
                               ADD PRODUCT
                           </h2>
                        </div>

                      {/* Input One  */}
               
                        <input
                          type="text"
                          placeholder='Product Title'
                          className=' border border-gray-400 px-2 py-2  rounded-lg outline-none capitalize'
                          value={product.title}
                          onChange={(e)=>setProduct({...product, title: e.target.value })}
                          required
                        />
               

                        {/* Input Two  */}
                
                        <input
                          type="number"
                          placeholder='Product Price'
                          value={product.price}
                          onChange={(e)=>setProduct({...product, price: e.target.value})}
                          className=' border border-gray-400 px-2 py-2  rounded-lg outline-none'
                          required
                        /> 
              

                        {/* Input Three  */}
                
                        <input
                          type="text"
                          placeholder='Product Image URL 1' 
                          value={product.imageURL1}
                          onChange={(e)=>setProduct({...product, imageURL1: e.target.value})} 
                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />
                        <input
                          type="text"
                          placeholder='Product Image URL 2' 
                          value={product.imageURL2}
                          onChange={(e)=>setProduct({...product, imageURL2: e.target.value})} 
                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />

                      
                        <select
                          value={product.category}
                          onChange={(e)=>setProduct({...product, category: e.target.value})} 
                          className="w-full px-1 py-2 border rounded-md outline-none "
                          placeholder='Select Product Category'
                          >
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                          
                        <input
                          type="text"
                          placeholder='gender' 
                          value={product.gender}
                          onChange={(e)=>setProduct({...product, gender: e.target.value.toLowerCase()})} 
                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none '
                          required
                        />  
   
                        <input
                          type="text"
                          placeholder='color' 
                          value={product.color}
                          onChange={(e)=>setProduct({...product, color: e.target.value.toLowerCase()})} 
                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none '
                          required
                        /> 
                         
                         
                       

                        <input onClick={addProductFunction}  type="button"  value='ADD PRODUCT' accessKey='Enter' className='border border-black bg-black hover:bg-white w-full text-white text-center hover:text-black  py-2 font-[600] rounded-md hover: cursor-pointer' />
                
                    </form>
                    
                </div>
           </div>  
       </Layout>  
  )
}

export default AddProducts