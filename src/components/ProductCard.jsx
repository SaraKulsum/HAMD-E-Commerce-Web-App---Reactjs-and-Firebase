import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({filteredProducts}) => {

    const size = ['S', 'M', 'L', 'XL', 'XXL'];
    const navigate = useNavigate();
  return (
    <>
                  
        {filteredProducts.map((item, index) => {
                            const {id, imageURL1, imageURL2, title, price,date,time,color,gender,category } = item
                            return (
                                <div  key={index} className="productsDisplayBox ">
                                    <div  onClick={()=>navigate(`/productInfo/${id}`)} className=" overflow-hidden cursor-pointer">   
                                        <div className="imgContainer relative">
                                          <img src={imageURL1} className="imgFront w-full object-cover aspect-auto transition-transform duration-300 transform hover:scale-110" alt="Imagem de perfil" />
                                          <img src={imageURL2} className="imgRare w-full object-cover aspect-auto absolute top-0 left-0 opacity-0 transition-opacity duration-300 transform hover:opacity-100" alt="Nova imagem" />
                                        </div>

                                        <div className="p-2 flex flex-col gap-1">
                                            
                                            <span className=" font-sans text-sm  text-gray-900 capitalize">
                                                {title.toLowerCase()}
                                            </span>
                                            <span className=" font-[500] text-gray-900 mb-3">
                                                ₹{price}
                                            </span>
                                            <div className='hidden md:flex gap-3 font-sans'>
                                            {size.map((ele,index)=>(
                                                <span key={index+ele} className='text-gray-400 text-xs'>
                                                  {ele}
                                                </span>
                                            ))}
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                      
    </>
  )
}

export default ProductCard