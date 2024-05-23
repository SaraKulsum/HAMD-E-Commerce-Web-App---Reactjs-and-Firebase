import React, { useContext } from 'react'
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa"
import MyContext from '../../context/MyContext';


const UsersDetails = () => {
  const context = useContext(MyContext);
  const{getAllUsers} = context;
  return (
    <div className='Details border mx-auto bg-white rounded-md w-full'>
            
    <div className='totalUsersDetails details px-2 mb-8'>
    <h2 className='text-xl font-semibold my-4'>Total Users</h2>
       <table className='w-full table-fixed '>
        <tbody>
         <tr className='my-8 text-left h-12 border-b border-gray-400'>
            <th className='font-[500] w-1/4 bg-slate-100 '>Name</th>
            <th className='font-[500] w-1/2 bg-slate-100 '>E-mail</th> 
            <th className='font-[500] w-1/4 bg-slate-100 '>Date</th>
          </tr>
        
         
          {getAllUsers.map(ele => (
            
              <tr className='text-left h-12 border-b border-gray-400'>
                <td >{ele.name}</td>
                <td>{ele.email}</td>
          
                <td>{ele.date}</td>
            </tr>
              
            
            ))}
          
          </tbody>
          {/* <tbody>
          <tr className='text-left h-12 border-b border-gray-400'>
            <td >sara</td>
            <td>sarak@gmail.com</td>
          
            <td className='flex items-center pt-4 gap-3 hover:cursor-pointer'><MdEdit/><FaRegTrashAlt/></td>
          </tr>

          <tr className='text-left h-12 border-b border-gray-400'>
            <td>omer</td>
            <td>omer@gmail.com</td>
            <td className='flex items-center pt-4 gap-3 hover:cursor-pointer'><MdEdit/><FaRegTrashAlt/></td>
          </tr>
          <tr className='text-left h-12 border-b border-gray-400'>
            <td>rafe</td>
            <td>rafe@gmail.com</td>
            <td className='flex items-center pt-4 gap-3 hover:cursor-pointer'><MdEdit/><FaRegTrashAlt/></td>
          </tr>
          </tbody> */}
         
       </table>
    </div>
 
   
    
    
    
 </div>
 
  )
}

export default UsersDetails