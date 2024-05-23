import React, { useEffect, useState, useContext } from 'react'
import Layout from './Layout'

import ProductCard from './ProductCard'
import { IoFilterSharp } from "react-icons/io5";

import MyContext from '../context/MyContext'
import Loader from './Loader'

import FilterSection from './Filters/FilterSection';
import SortFilter from './Filters/SortFilter'
import GridFilterSection from './Filters/GridFilterSection';

const MensWear = () => {
  let context = useContext(MyContext);
  const{getAllProduct,loading} = context;
  // let sara = getAllProduct.filter(ele => ele.gender === 'men');
  let products = getAllProduct.filter(ele => ele.gender === 'men');
  // let products = data.filter((ele) => ele.gender == 'men'); //filteres products accord to gender
    
     //For setting selected Filters
    const [categoryFilters, setFilters] = useState([]);
    const [PriceFilters, setPriceFilters] = useState([]);
    const [colorFilters, setcolorFilters] = useState([]);
    //For sorting
    const [sortOrder, setSortOrder] = useState('');
     let [sortState, setSortState] = useState(false);
    //For filter slider in sm scrns
   let [filterSliderState, setfilterSliderState] = useState(false);



   
    let prices = ['599-699', '699-799', '799-1199'];
    let categories = ['shirts', 't-shirts', 'trousers', 'jeans', 'jackets', 'hoodies'];
    let color = ['black','white', 'gray','blue', 'green', 'yellow', 'beige'];
    let sizes = ['S','M','L','XL','XXL'];
   

    const handleCategoryFilter = (category) => {
      if (categoryFilters.includes(category)) {
        setFilters(categoryFilters.filter((filter) => filter !== category));
      } else {
        setFilters([...categoryFilters, category]);
      }
    };
    // priceRange
    const filterProductsByPriceRange = (productPrice, priceRange) => {   //alhamdulillah!  
      let result;
     priceRange.map(ele => {
     let [minPrice, maxPrice] = ele.split('-').map(Number) 
     if(productPrice >= minPrice && productPrice <= maxPrice){
      result = true;
     }else{
      result = false;
     }
    })

    return result;
  }

    

    useEffect(()=>{
      console.log(sortOrder);
    },[sortOrder])

    const handlePriceFilter = (price) => {
   
      if (PriceFilters.includes(price)) {
        setPriceFilters(PriceFilters.filter((PriceFilter) => PriceFilter !== price));
      } else {
        setPriceFilters([...PriceFilters, price]);
      }
    };

    const handleColorFilter = (color) => {
      if (colorFilters.includes(color)) {
        setcolorFilters(colorFilters.filter((ele) => ele !== color));
      } else {
        setcolorFilters([...colorFilters, color]);
      }
    };
    
   
    
    const filteredProducts = products.filter((product) => {
     
      if (categoryFilters.length === 0 && PriceFilters.length === 0 && colorFilters.length === 0) {
        return true; // Show all products if no categoryFilters selected
      }

      return((categoryFilters.length === 0 || categoryFilters.includes(product.category)) &&
         (colorFilters.length === 0 || colorFilters.includes(product.color)) &&
         (PriceFilters.length === 0 || filterProductsByPriceRange(product.price, PriceFilters))  //WORKIN!
         
        );
     
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortOrder === 'prices (low - high)') {
        return a.price - b.price;
      } else if (sortOrder === 'prices (high - low)') {
        return b.price - a.price;
      } else if (sortOrder === 'newly added') {
        return b.date - a.date;
      } 
      else {
        return 0;
      }
    });

  /*Close any opened options*/
  const closeOptionBox = () =>{
    if(sortState === true){
      setSortState(!sortState)
    }
    if(filterSliderState === true){
      document.querySelector('.filterSection_sm_Scrns').style.left = "-200vw"  
      setfilterSliderState(false) 
   }
}

/*filter slider for small scrns*/
const handleFiltSlider = () => {
     
    if(filterSliderState === true){
      document.querySelector('.filterSection_sm_Scrns').style.left = "-200vw"  
      setfilterSliderState(false) 
   }else{
     document.querySelector('.filterSection_sm_Scrns').style.left = "0vw"
     setfilterSliderState(true)
   }
    
}
   
 
  
   
  return (
    
    <Layout>
         {/* main  */}
         <div onClick={()=>closeOptionBox()} className="womensWearPageLayout px-3 md:px-10 w-full text-gray-900 font-serif flex justify-between">

            {/*---horizontal container 1---*/}
             <div className='refindFilter hidden md:block'>
                <FilterSection products={products} categories={categories} prices = {prices} color = {color} handleCategoryFilter = {handleCategoryFilter} handleColorFilter={handleColorFilter} handlePriceFilter={handlePriceFilter} />
             </div>

           {/*---horizontal container 2---*/}
           <div className="flex flex-col gap-3 p-5  mx-auto w-full ">
                  <div className='grid_sort_refind_Filter_lgScrs hidden md:flex justify-between p-4 w-full'>   
                      <GridFilterSection />     
                       {/* dropdown BOXXX sort */}
                       <div className='w-56'>
                       <SortFilter sortOrder={sortOrder} setSortOrder = {setSortOrder} sortState = {sortState} setSortState = {setSortState}/>   
                       </div>
                  </div> 
                  <div className='grid_sort_refind_Filter_smScrs  flex flex-col gap-3 md:hidden flex-wrap'>
                      <div className='flex '>
                          {/*REFIND FILTERS*/}
                          <div className='refindFilterSlider w-[50%]'>
                             <button onClick={()=>handleFiltSlider()} type='button' className='refindFilterSlider_btn flex w-full font-sans tracking-wide text-black  justify-center items-center gap-x-1.5 capitalize  bg-white px-3 py-2 text-xs  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"'>Refind By <IoFilterSharp size={18}/></button>
                             <div className='filterSection_sm_Scrns fixed z-[99] bg-white'>
                             <FilterSection  products={products} categories={categories} prices = {prices} color = {color} handleCategoryFilter = {handleCategoryFilter} handleColorFilter={handleColorFilter} handlePriceFilter={handlePriceFilter} /> 
                             </div>
                          </div>      
                          {/* dropdown BOXXX sort */}
                          <div className='sortFilterDropDown  w-[50%]'>
                              <SortFilter  sortOrder={sortOrder} setSortOrder = {setSortOrder} sortState = {sortState} setSortState = {setSortState}/>   
                          </div>
                       </div>
                       <div className='flex justify-end'>
                           {/*GRID FILTERS*/}
                           <GridFilterSection /> 
                       </div>
                       
                  </div>  

                   <div className='flex justify-center items-center'>
                       {loading &&  <Loader/>}
                    </div>
                  <div id='productContainer_grid_View' className="productContainer_grid_View_3_cols  grid grid-cols-3 gap-2 md:gap-5">
                    
                  <ProductCard filteredProducts = {sortedProducts} />
                    </div>
           
           </div>
         </div>
    </Layout>
 
  )
}

export default MensWear