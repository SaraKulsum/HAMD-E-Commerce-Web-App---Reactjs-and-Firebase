import React, { useContext } from 'react'
import {IoSearch } from "react-icons/io5"
import { useState } from 'react';
import MyContext from '../../context/MyContext'
import { Link, useNavigate } from 'react-router-dom';


const SearchBox = () => {
    let [search, setSearch] = useState(""); 
    const context = useContext(MyContext);
    const {getAllProduct} = context;
    const navigate = useNavigate();
    
    const getSearchedResults = (id)=>{
      navigate(`/productInfo/${id}`,{ replace: true})
      window.location.reload();
      window.scrollTo(0, 0)
    }

    const searchedData = getAllProduct;
    const filtered_searched_data = searchedData.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()));
  return (
   <>
              <div  className='searchBox'>
                        <input type="text" placeholder="SEARCH"  value={search}  onChange={(e) =>{setSearch(e.target.value)}} className="text-right bg-inherit outline-none font-[monospace] focus:border-b-[1px] border-black text-[15px] "/>
                         {/*search box dropdown*/}
                        <div className="flex  justify-center bg-white">
                            <div className="block absolute bg-white w-[175px] rounded-lg max-h-[75vh] overflow-y-auto">
                                {search &&  (
                                  filtered_searched_data.map((item, indx) =>(
                                    
                                   
                                      <div key={indx} onClick={()=>getSearchedResults(item.id)}  className="flex  gap-2 py-4 aspect-auto items-center hover:cursor-pointer">
                                      <img src={item.imageURL1} alt="IMG" className='h-[72px]' />
                                      <span className='text-sm'>{item.title}</span>
                                      </div> 
                                    
                                 
                                ))  
                                )}
                            </div>   
                        </div>    
                    </div>
                   
                    <span className="navItem text-xl hover:cursor-pointer"><IoSearch/></span>
   </>
  )
}

export default SearchBox