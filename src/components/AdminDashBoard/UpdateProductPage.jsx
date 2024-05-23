import React, { useContext, useEffect } from 'react'
import Layout from '../Layout'
import MyContext from '../../context/MyContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from '../../firebase/FirebaseConfig'
import { toast } from 'react-toastify'
import Loader from '../Loader'

export const UpdateProductPage = () => {
  const navigate = useNavigate()
  const context = useContext(MyContext);
    const { loading, setLoading, getAllProductFunction } = context;

  const {id} = useParams()
  
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageURL1: "",
    imageURL2: "",
    category: "",
    gender: "",
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
/*Extracting data according to product id from firebase db*/
const getSingleProductData = async () => {
  setLoading(true)
  try{
     const productPrevData = await getDoc(doc(fireDB, 'products', id)) 
     const product = productPrevData.data();
     setProduct({title: product?.title, price:product?.price, imageURL1: product?.imageURL1,
     imageURL2: product?.imageURL2, category: product?.category,
     gender: product?.gender, color: product?.color, quantity : product?.quantity,
     time: product?.time,
     date: product?.date })
     setLoading(false)
  }
  catch(error){
    console.log(error);
    setLoading(false)
  }
} 
const updateProduct = async () => {
  setLoading(true)
  try {
    await setDoc(doc(fireDB, 'products', id), product)
    toast.success("Product Updated successfully")
    getAllProductFunction();
    setLoading(false)
    navigate('/AdminDashBoard')
  }
  catch (error) {
    console.log(error)
    setLoading(false)
  }
}

/*call function once on pageload*/
useEffect(()=>{getSingleProductData()},[])
  return (
    <Layout>
            <div className='flex justify-center items-center '>
         
              {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form px-1 py-6 ">
                    <form action="" className='flex flex-col gap-4 w-[280px] md:w-80 '>

             
                     {/* Top Heading  */}  
                        <div className="mb-5">
                            <h2 className='text-center text-2xl font-[500] text-black '>
                              UPDATE PRODUCT
                           </h2>
                        </div>

                      {/* Input One  */}
               
                        <input
                          type="text"
                          placeholder='Product Title'
                          value={product?.title}  //set value from prevData
                          onChange={(e)=>setProduct({...product, title:e.target.value})}
                          className=' border border-gray-400 px-2 py-2  rounded-lg outline-none'
                        
                          required
                        />
               

                        {/* Input Two  */}
                
                        <input
                          type="number"
                          placeholder='Product Price'
                          value={product?.price}
                          onChange={(e)=>setProduct({...product, price:e.target.value})}
                          className=' border border-gray-400 px-2 py-2  rounded-lg outline-none'
                          required
                        /> 
              

                        {/* Input Three  */}
                
                        <input
                          type="text"
                          placeholder='Product Image URL 1' 
                          value={product?.imageURL1}
                          onChange={(e)=>setProduct({...product, imageURL1:e.target.value})}
                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />
                        <input
                          type="text"
                          placeholder='Product Image URL 2' 
                          value={product?.imageURL2}
                          onChange={(e)=>setProduct({...product, imageURL2:e.target.value})}
                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />

                      
                        <input
                          type="text"
                          placeholder='Category' 
                          value={product.category}
                          onChange={(e)=>setProduct({...product, category:e.target.value})}

                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />
     
                        <input
                          type="text"
                          placeholder='gender' 
                          value={product.gender}
                          onChange={(e)=>setProduct({...product, gender:e.target.value})}

                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />
                        <input
                          type="text"
                          placeholder='color' 
                          value={product.color}
                          onChange={(e)=>setProduct({...product, color:e.target.value})}

                          className=' border border-gray-400 px-2 py-2   rounded-lg outline-none'
                          required
                        />
                         
                        {/* <textarea  
                           value={product.gender}
                          onChange={(e)=>setProduct({...product, gender:e.target.value})}

                            placeholder='Product gender'
                            className=' border border-gray-400 px-2 py-2  rounded-lg outline-none'rows={3}
                            required></textarea> */}
                            
                         
                       

                        <input onClick={updateProduct}   type="button"  value='UPDATE PRODUCT' accessKey='Enter' className='border border-black bg-black hover:bg-white w-full text-white text-center hover:text-black  py-2 font-[600] rounded-md hover: cursor-pointer' />
                
                    </form>
                    
                </div>
           </div>  
       </Layout>  
  )
}
