import React, { useState } from 'react'
import { GoChevronDown } from "react-icons/go";

const SortFilter = ({sortOrder, setSortOrder, sortState, setSortState}) => {
    // let [sortState, setSortState] = useState(false);
    const handleChange = (value)=>{
        setSortOrder(value)
       
         
    }
    
  return (
    <>
    <div className ="relative w-full inline-block text-left font-sans tracking-wide capitalize">
                          <div className='w-full'>
                           <button
                           onClick={()=>setSortState(!sortState)}
                           type="button" className ="sortBtn flex w-full  text-black  justify-center items-center gap-x-1.5 capitalize text-xs  bg-white px-3 py-2 md:text-sm  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" >
                           {sortOrder || 'curated for you'} <GoChevronDown size={18} className='dropSymbol'/>
                           </button>
                         </div>
                         {sortState &&
                         <div className ="absolute w-full right-0 z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu"  >
                         <div className ="py-3" role="none">
                            <ul className='flex flex-col gap-3 text-xs text-black  md:text-sm'>
                                <li onClick={()=>{handleChange('curated for you'), setSortState(!sortState)}} className='hover:underline hover:cursor-pointer pl-3'>curated for you</li>
                                <li onClick={()=>{handleChange('newly added'),  setSortState(!sortState)}} className='hover:underline hover:cursor-pointer pl-3'>newly added</li>
                                <li onClick={()=>{handleChange('prices (low - high)'), setSortState(!sortState)}} className='hover:underline hover:cursor-pointer pl-3'>prices (low - high)</li>
                                <li onClick={()=>{handleChange('prices (high - low)'), setSortState(!sortState)}} className='hover:underline hover:cursor-pointer pl-3'>prices (high - low)</li>
                            </ul>
                          
                         </div>
                       </div>
                         }
                         
                       </div>  
    </>
  )
}

export default SortFilter