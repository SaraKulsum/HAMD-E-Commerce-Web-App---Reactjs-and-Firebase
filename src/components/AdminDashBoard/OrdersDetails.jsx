import React, { useContext } from 'react'
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa"
import MyContext from '../../context/MyContext'
import Loader from '../Loader';


const OrdersDetails = () => {
  const context = useContext(MyContext);
  const { loading, setLoading, getAllOrders, deleteOrder} = context;
 
  return (
    <>
    <div>
        <div className='border rounded-md '> 
            <div className="py-6 px-2">
                {/* text  */}
              <h2 className='text-xl font-semibold '>All Orders</h2>
               
            </div>
            {/* table  */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse sm:border-separate" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 text-black bg-slate-100 font-bold fontPara">
                            S.No
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                            Order ID
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Image
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Title
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Category
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Price
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Quantity
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Total Price
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Status
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Name
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Address
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Pincode
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Phone Number
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              E-mail
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Date
                            </th>
                            <th scope="col"
                                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 text-black bg-slate-100">
                              Action
                            </th>
                        </tr>
                        <div>
                          {loading && <Loader/>}
                        </div>
                        {getAllOrders.map((order) => {
                            console.log(order)
                            return (
                                <>
                                    {order.cartItems.map((item, index) => {
                                        const { id, imageURL1, title, category, price, quantity } = item
                                        return (
                                            <tr key={index} >
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                    {index+1}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                    {id}
                                                </td>
                                                <td className="h-12 px-3 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    <img src={imageURL1} alt="img" />
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    {title}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    {category}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    ₹{price}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    {quantity}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    ₹{price * quantity}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l text-green-600  first:border-l-0 stroke-slate-500  first-letter:uppercase ">
                                                    {order.status}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    {order.addressInfo.name}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    {order.addressInfo.address}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    {order.addressInfo.pincode}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    {order.addressInfo.phoneNumber}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 ">
                                                    {order.email}
                                                </td>
                                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                    {order.date}
                                                </td>
                                                <td className="justify-center h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0  cursor-pointer ">
                                                  <div className='flex justify-center items-center gap-1 cursor-pointer'>
                                                  <FaRegTrashAlt onClick={()=>deleteOrder(order.id)}/>
                                                  </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
       
    </div>
    

 
 </>
);
}

export default OrdersDetails