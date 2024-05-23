import React from 'react'
 
  

const GridFilterSection = () => {
    const HandleClick=(boxClass, barClass, noOfCols)=>{
        let box = document.querySelector(`.${boxClass}`);
        let bars = document.querySelectorAll(`.${barClass}`);
        let b1 = document.querySelector('.GridViewCols2');
        let b2 = document.querySelector('.GridViewCols3');
        let b3 = document.querySelector('.GridViewCols4');
        let bars1 = document.querySelectorAll(".gridBar2");
        let bars2 = document.querySelectorAll(".gridBar3");
        let bars3 = document.querySelectorAll(".gridBar4");
        if(b1.getAttribute("data-status") === "active"){
           
            b1.setAttribute("data-status", "deactive");
            bars1.forEach(ele => {
                ele.setAttribute("data-status", "deactive");
            })
        }else if(b2.getAttribute("data-status") === "active"){
            b2.setAttribute("data-status", "deactive");
            bars2.forEach(ele => {
                ele.setAttribute("data-status", "deactive");
            })
        }else if(b3.getAttribute("data-status") === "active"){
            b3.setAttribute("data-status", "deactive");
            bars3.forEach(ele => {
                ele.setAttribute("data-status", "deactive");
            })
        }
        box.setAttribute("data-status", "active");
        bars.forEach(ele => {
            ele.setAttribute("data-status", "active");
        })
        {/*functionality in grid view onClick*/}
        document.querySelector("#productContainer_grid_View").setAttribute("class", `productContainer_grid_View_${noOfCols}_cols` )
        
    }
  return (
   <>
   <div className='GridViewAs_Container flex items-center gap-3'>
        <div className='font-sans tracking-wider text-sm'>View As</div>
        {/*grid view 2 cols container -> button*/}
        <div onClick={()=>HandleClick('GridViewCols2', 'gridBar2', '2')} data-status='deactive' className='GridViewCols2 flex gap-[3px] border-[1px] border-gray-400 hover:cursor-pointer hover:border-black p-[3px]'>
                           
            <span data-status='deactive' className='gridBar2  block w-[4px] h-[16px] bg-gray-400'></span>
            <span data-status='deactive' className='gridBar2  block w-[4px] h-[16px] bg-gray-400'></span>
                           
        </div>
        {/*grid view 3 cols container -> button*/}
        <div onClick={()=>HandleClick('GridViewCols3', 'gridBar3', '3')} data-status='active' className='GridViewCols3 flex gap-[3px] border-[1px]  border-gray-400 hover:cursor-pointer hover:border-black p-[3px]'>
            <span data-status='active' className='gridBar3 relative block w-[4px] h-[16px] bg-gray-400'></span>           
            <span data-status='active' className='gridBar3 relative block w-[4px] h-[16px] bg-gray-400'></span>           
            <span data-status='active' className='gridBar3 relative block w-[4px] h-[16px] bg-gray-400'></span>           
        </div>
        {/*grid view 4 cols container -> button*/}                
        <div onClick={()=>HandleClick('GridViewCols4', 'gridBar4', '4')} data-status='deactive' className='GridViewCols4 hidden md:flex gap-[3px] border-[1px]  border-gray-400 hover:cursor-pointer hover:border-black p-[3px]'>
            <span data-status='deactive' className='gridBar4 relative block w-[4px] h-[16px] bg-gray-400'></span>
            <span data-status='deactive' className='gridBar4 relative block w-[4px] h-[16px] bg-gray-400'></span>
            <span data-status='deactive' className='gridBar4 relative block w-[4px] h-[16px] bg-gray-400'></span>
            <span data-status='deactive' className='gridBar4 relative block w-[4px] h-[16px] bg-gray-400'></span>
        </div>
    </div>     
   </>
  )
}

export default GridFilterSection