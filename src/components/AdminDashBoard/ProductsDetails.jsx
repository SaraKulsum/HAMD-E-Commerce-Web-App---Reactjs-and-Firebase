import React, { useContext, useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import {fireDB} from '../../firebase/FirebaseConfig'
import { toast } from 'react-toastify'

import Loader from '../Loader';
import MyContext from '../../context/MyContext';
const ProductsDetails = () => {

  const navigate = useNavigate()
  const context = useContext(MyContext);

  const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    
 
   
    // Delete product 
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

   
  return (
    
    
   <div className='Details border mx-auto py-6 bg-white rounded-md w-full'>
            
   <div className='totalProductsDetails details px-2 mb-8'>
    <div className='flex justify-between '>
    <h2 className='text-xl font-semibold '>Total Products</h2>
    <Link to={'/AddProduct'}>
    <button onClick={()=>navigate('/AddProduct')} className='bg-black border border-black text-white hover:text-black hover:bg-white  transition-all p-2'>Add Product</button>
    
    </Link>
    
    </div>
    <div className='flex justify-center'>
    {loading && <Loader/>} 
    </div>
   </div>

  <div><div id='productContainer_grid_View' className="productContainer_grid_View_3_cols  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
  {getAllProduct.map((item, index) => {
                            const {id, title, price, category, date, imageURL1, imageURL2 } = item
                            return (
                              
                              
                                <div key={index} className="productsDisplayBox mx-auto">
                                 
                                    <div className=" cursor-pointer border  w-fit">   
                                        <div className="imgContainer relative">
                                          <img src={imageURL1} className="imgFront w-full object-cover aspect-auto transition-transform duration-300 transform hover:scale-110" alt="Imagem de perfil" />
                                          <img src={imageURL2} className="imgRare w-full object-cover aspect-auto absolute top-0 left-0 opacity-0 transition-opacity duration-300 transform hover:opacity-100" alt="Nova imagem" />
                                         </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="p-1 flex flex-col gap-1">
                                            <span className="title-font  font-sm text-gray-900 capitalize">
                                                {title.toLowerCase()}
                                            </span>
                                            
                                            <span className="title-font  font-[700] text-gray-900 ">
                                                ₹{price}/-
                                            </span>
                                            </div>
                                            
                                            <div className='flex items-center justify-between  gap-3 hover:cursor-pointer'>
                                              <span className='flex items-center p-1 hover:bg-gray-400' onClick={()=>navigate(`/UpdateProductPage/${id}`)}><MdEdit/>Edit</span>
                                              <span className='flex items-center p-1 hover:bg-gray-400' onClick={()=>deleteProduct(id)}><FaRegTrashAlt/>Delete</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                               
                            )
                        })}
                         </div>
                      
  </div>
   
</div>

  )
}

export default ProductsDetails