import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Footer = () => {
  let [mail, setMail] = useState(""); 
  const subcribe = () => { 
    if(mail != "" && mail.includes("@gmail.com")){
      toast('🦄 SUBSCRIBED!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
      setMail("")
    }else{
      toast.error("Enter Correct E-mail Address")
    }   
  }
  return (
    <footer className='mt-28' id = "footer">
   
    <div className = "contactContainer bg-black w-full text-[#e5e5e5] py-8 px-5 font-sans ">
        
          
          <div className='subscriptionBox font-thin flex flex-col gap-5 items-center'> 
           <h2>SIGN UP AND SAVE</h2>
           <p className='tracking-wider'>Sign up now and be the first one to know about the exclusive offers & latest fashion trends!</p>
           <form>
            <div className='border-b-[1px]  border-solid bordee-[#e5e5e5]'>
            <input type="email" onChange={(e)=>setMail(e.target.value)} value={mail} name="email" id="email" placeholder='Enter your email' required 
            className='bg-[inherit] outline-none'/>
	         <input onClick={()=>subcribe()}  type="button" value='Subscribe' accessKey='Enter' className='hover: cursor-pointer' />
            </div>
           </form>
          </div>
           {/* <hr className='h-0 border-solid border-[#e5e5e5] my-6'/> */}
           <div className = "lastContainer flex flex-row justify-between mt-6">
              <div className = 'footercontent relative '>
                <div  className='absolute bottom-0  w-[7rem] font-extralight' > 
                  <span>© 2024 HAMD</span>
                </div>
              </div>
              <div className = "socialHandles ">
                  <span>SOCIAL HANDLES</span>
                  <ul className='flex gap-4 '>
                 <a href=""><li className='transition-all ease-in-out duration-400 socials hover:scale-110 '>Linkedin</li></a>
                 <a href=""><li className='socials transition-all ease-in-out duration-400 socials hover:scale-110'>Github</li></a>
                 <a href=""><li className='socials transition-all ease-in-out duration-400 socials hover:scale-110'>Instagram</li></a>
                 <a href=""><li className='socials transition-all ease-in-out duration-400 socials hover:scale-110'>Twitter</li></a>
                  </ul>
               
              </div>
              
           </div>  
    </div>
           
    </footer>
  )
}

export default Footer