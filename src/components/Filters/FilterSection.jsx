import React from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { GiCheckMark } from "react-icons/gi";



const FilterSection = ({products, categories, prices, color, handleCategoryFilter, handlePriceFilter, handleColorFilter}) => {

   const countProductsByCategory = (category) => {
      return products.filter((product) => product.category === category).length;
   };
   // const countProductsByPrice = (price) => {
   //    return products.filter((product) => product.price === price).length;
   // };


   const countProductsByColor = (color) => {
      return products.filter((product) => product.color === color).length;
   };
  
   const countProductsByPrice = (priceRange) => {
     
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      return products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      ).length;
     

    };
    
  return (
   <>
    <div className='refindContainer pt-8 px-5 block min-w-[250px] text-xs tracking-wide '>
{/*REFIND by CATEGORY*/ }
<div className='refindByCategoryDropDown gap-4 flex flex-col'>
 <button className='CategoryDropDownBtn hover:bg-slate-400 text-black font-[600] flex items-center gap-1'><IoMdArrowDropdown color='black' size={25} />Category</button>
 <div className='RefindcategoryDropDownList flex flex-col gap-3'>
    {categories.map((element,index) => (
       <div key={index}>
       <div className='flex items-center gap-3 w-full'> 
      
           <input type="checkbox" value={element} id={'categoryItem'+index}  className='listItemJacket relative peer h-4 w-4 appearance-none hover:cursor-pointer bg-white border-[1px] border-solid border-black'onClick={()=> handleCategoryFilter(element)}  />
           <GiCheckMark color='black' size={10} className='ml-[2px] hidden m-auto absolute  peer-checked:block' />
           <label className='uppercase w-full flex justify-between hover:cursor-pointer ' htmlFor={'categoryItem'+index}>{element}<span className='text-right '>{countProductsByCategory(element)}</span></label>

       </div>
        
    </div>
    ))}
     
     
        
 </div>

</div>
<hr className='h-[2px] my-5 w-full bg-[#a7a6a6]' />
  {/*REFIND by color*/ }
  <div className='refindByPriceDropDown gap-4 flex flex-col'>
 <button className='PriceDropDownBtn hover:bg-slate-400 text-black font-[600] flex items-center gap-1'><IoMdArrowDropdown color='black' size={25} />Colors</button>
 <div className='RefindPriceDropDownList flex flex-col gap-3'>
    {color.map((item, index)=>(
        <div key = {index}>
         <div className='flex items-center gap-3 w-full'> 
            <input type="checkbox" id={index+'Size&Fit'} className='listItemJacket relative peer h-4 w-4 appearance-none bg-white border-[1px] border-solid border-black hover:cursor-pointer' onClick={()=>handleColorFilter(item)}  />
            <label className='uppercase flex justify-between w-full hover:cursor-pointer ' htmlFor={index+'Size&Fit'}>{item} <span className='text-right '>{countProductsByColor(item)}</span></label>
            <GiCheckMark color='black' size={10} className='ml-[2px] hidden m-auto absolute  peer-checked:block' />
         </div>
        
     </div>
    ))} 
 </div>  
</div>
<hr className='h-[2px] my-5 w-full bg-[#a7a6a6]' />
{/*REFIND by PRICE*/ }
<div className='refindByPriceDropDown gap-4 flex flex-col'>
 <button className='PriceDropDownBtn hover:bg-slate-400 text-black font-[600] flex items-center gap-1'><IoMdArrowDropdown color='black' size={25} />Price</button>
 <div className='RefindPriceDropDownList flex flex-col gap-3'>
    {prices.map((priceRange, index)=>(
        <div key = {index}>
         <div className='flex items-center gap-3 w-full'> 
            <input type="checkbox"  id={index} className='listItemJacket relative peer h-4 w-4 appearance-none bg-white border-[1px] border-solid border-black hover:cursor-pointer' onClick={()=>handlePriceFilter(priceRange)} />
            <GiCheckMark color='black' size={10} className='ml-[2px] hidden m-auto absolute  peer-checked:block' />     
            <label className='uppercase w-full hover:cursor-pointer flex justify-between' htmlFor={index}>{priceRange}<span className='totalFilteredProducts text-right '>{countProductsByPrice(priceRange)}</span></label>
         </div>
     </div>
    ))} 
 </div>  
</div>

<hr className='h-[2px] my-5 w-full bg-[#a7a6a6]' />
</div>
   </>
  )
}

export default FilterSection