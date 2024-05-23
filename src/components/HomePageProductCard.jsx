import React from 'react'


import womensDress from './products/womensDressC.png'
import womensCo_Ord_C from './products/womensCO-ORD-SETS-C.png'
import womensJackets from './products/womensJacketsC.png'
import womensJeans from './products/womensJeansC.png'
import womensTshirt from './products/womensTshirtC.png'




import mensShirt from './products/mensShritCard.webp'
import mensJeans from './products/mensJeansC.webp'
import mensHoodies from './products/mensHoodiesC.webp'
import mensBlazers from './products/mensBlazersC.webp'
import mensFormals from './products/mensFormalsC.webp'

import womenWearHeader from './bannerImgs/ba4.jpg'
import menWearHeader from './bannerImgs/menWearHeader.jpg'
import kidsWearHeader from './bannerImgs/kidsWearHeader.jpg'
import freeDeliveyBanner from './bannerImgs/freeDelivery.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'


 
 const HomePageProductCard = () => {
  
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const navigate = useNavigate();
  let womenCategoryData=  [{img: womensJackets, name: "Jackets & coats",link:"/women/collections/jackets&coats"},{img: womensDress, name:  "Tops & dresses",link:"/women/collections/tops&dresses"},{img: womensCo_Ord_C, name: "co-ord sets",link:"/women/collections/co-ords"},{img: womensTshirt, name: "t-shirts & shirts",link:"/women/collections/t-shirts&shirts"},{img: womensJeans, name: "jeans & trousers",link:"/women/collections/jeans&trousers"}]

  let menCategoryData =  [{img: mensShirt, name: "t-shirts & shirts",link:"/men/collections/t-shirts&shirts"},{img: mensJeans, name:  "jeans & trousers",link:"/men/collections/jeans&trousers"},{img:mensBlazers , name: "jackets & blazers",link:"/men/collections/jackets&blazers"},{img: mensHoodies, name: "co-ords-sets",link:"/men/collections/co-ords"},{img: mensFormals, name: "suits",link:"/men/collections/suits"}];
  
  return (
    
    /*category cards*/ 
    <>
    <div className='overflow-hidden' >
      <img className='transition-all duration-300 ease-out hover:scale-[1.01] w-[100vw]'src={freeDeliveyBanner} alt="freeDelivery" />
    </div>
    {/*-------women category cards--------*/}
    <div className=' rounded-tl-3xl  rounded-tr-3xl bg-gradient-to-b  from-[#d8e0d5] to-[#fffefe] '>
    <div className='text-center my-8 bg-[#fffefe]'>
        <img className='rounded-tr-3xl rounded-tl-3xl w-[100vw]' src={womenWearHeader} alt="men-Wear"/> 
    </div>
   <div className='CategoryContainerWomen pt-4 h-[440px] flex shrink-0 flex-row mx-[30px]  gap-5 md:justify-evenly overflow-x-auto overflow-y-hidden '>
    {womenCategoryData.map((item, index) => (
      
       <div onClick={()=>navigate(item.link)} key = {index} className='categoryCard flex shrink-0  items-center relative w-[240px] transition-all duration-500 overflow-hidden ease-in-out hover:cursor-pointer hover:brightness-90  rounded-md '> 
         
         <img className='categoryImage w-full h-[400px] object-cover bg-black opacity-100 brightness-75 transition-all duration-500 ease-in-out rounded-md ' src={item.img} alt="product" />
         <span className = 'categoryTitle absolute bottom-12 text-xl left-4 text-white uppercase '>{item.name}</span>       
       </div> 
         
    ))}
         
   </div>
   <div className='viewAllbtnContainer text-center my-7'>
      <a href='/WomensWear' className='border-[0.1px] border-[#3d4246] tracking-[4px] text-xs text-[rgb(61,66,70)] p-2 uppercase hover:bg-black hover:text-[#E5E5E5] hover:cursor-pointer'>view all</a>   
   </div>
   </div>

{/*-------men category cards--------*/}
<div className=' rounded-tl-3xl  rounded-tr-3xl bg-gradient-to-b  from-[#f6f6f6] to-[#fffefe] '>
    <div className='text-center my-8 bg-[#fffefe]'>
        <img className='rounded-tr-3xl rounded-tl-3xl w-[100vw]' src={menWearHeader} alt="men-Wear"/> 
    </div>
    <div className='CategoryContainerMen pt-4 h-[440px] flex flex-row  mx-[30px] gap-5 md:justify-evenly overflow-x-auto overflow-y-hidden '>
        {menCategoryData.map((item, index) => (
          <div  onClick={()=>navigate(item.link)} key = {index} className='categoryCard flex shrink-0  items-center relative w-[240px] transition-all duration-500 overflow-hidden ease-in-out hover:cursor-pointer hover:brightness-90  rounded-md '> 
         
          <img className='categoryImage w-full h-[400px] object-cover bg-black opacity-100 brightness-75 transition-all duration-500 ease-in-out rounded-md ' src={item.img} alt="product" />
          <span className = 'categoryTitle absolute bottom-12 text-xl left-4 text-white uppercase '>{item.name}</span>       
        </div> 
         ))}   
    </div>
    <div className='viewAllBtnContainer text-center my-7'>
        <a href='/MensWear' className='border-[0.1px] border-[#3d4246] tracking-[4px] text-xs text-[#3d4246] p-2 uppercase hover:bg-black hover:text-[#E5E5E5] hover:cursor-pointer'>view all</a>   
    </div>
</div>
  
   
   

   </>
    
  )
}
export default HomePageProductCard;