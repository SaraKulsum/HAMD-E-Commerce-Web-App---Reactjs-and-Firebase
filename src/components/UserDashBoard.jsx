import React, { useContext, useState, useEffect } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";
import Loader from "./Loader";

const UserDashBoard = () => {
  let [greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const { loading, setLoading, getAllOrders, deleteOrder } = context;

  const user = JSON.parse(localStorage.getItem("users"));

  let currUserCartItems = getAllOrders.filter((ele) => ele.userid === user.uid);
  //Greeting Function
  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
      } else if (currentHour >= 18 && currentHour < 22) {
        return "Good Evening";
      } else {
        return "Good Night";
      }
    };

    setGreeting(getGreeting());
  }, []);
  //logout Function
  const logout = () => {
    localStorage.clear("users");
    navigate("/");
  };
  return (
    <Layout>
      <div className="container mx-auto py-5 lg:py-8 ">
        {/* Top  */}
        <div className="flex w-full px-2 border border-black justify-between ">
          {/* main  */}
          <div className="py-5  w-full">
            {/* image  */}
            <div className="flex justify-center ">
              <span className="rounded-full  bg-black  flex justify-center items-center w-12 h-12">
                <span className="text-2xl mb-1 text-white"> 
                  {user.name.slice(0, 1)}
                </span>
              </span>
            </div>
            {/* text  */}
            <div className="text-center flex flex-col">
              <span className=" font-semibold">{greeting}!</span>
              <span className=" font-normal">{user.name}</span>
            </div>
          </div>
          <div className="mt-2">
            <button onClick={logout} className="bg-black text-white p-3">
              LogOut
            </button>
          </div>
        </div>

        {/* bottom  */}
        <div className="bottom  w-full">
          {loading && (
            <div className="flex justify-center items-center mt-10">
              <Loader />
            </div>
          )}

          {currUserCartItems.length === 0 && loading == false ? (
            <div className="emptyCartDiv flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 179.47 74.81"
                className="h-36"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      d="M166.17,37c2.23,16.55-51.79,27.35-98.28,19.81S.06,19.89,22.25,4.21,163.94,20.48,166.17,37Z"
                      style={{ fill: "#f2f2f2", opacity: "0.26" }}
                    ></path>
                    <path
                      d="M179.47,68.46c0,3.51-40.18,6.35-89.74,6.35S0,72,0,68.46C0,67.2,5.24,66,14.28,65c-2.45-1.39-2.68-4.7-2.68-8.56h3.69c-.69-.74-1.4-1.46-2-2.15-.91-1-1.87-1.94-2.78-2.92A9.78,9.78,0,0,0,7.86,49a16.73,16.73,0,0,1,7.42,6.19c-.17-.38-.34-.76-.5-1.15-.7-1.64-1.42-3.28-2.19-4.9a21.59,21.59,0,0,0-1.19-2.29c-.19-.29-.78-.81-1-1.14a.41.41,0,0,1-.18-.19c.28-.53,3.83,2.94,4.11,3.29a19.49,19.49,0,0,1,2.75,4.57l.12.29a10.17,10.17,0,0,1,.08-1.1,18.19,18.19,0,0,1,1.22-4.26c.37-1,.76-2.86,1.94-3.47.13-.06.17.14.18.28,0-.12-.1-.22-.24-.11-.74.73-.73,2.37-.93,3.29-.27,1.27-.56,2.55-.75,3.83a13.85,13.85,0,0,0-.15,2.23,10.56,10.56,0,0,1,.54-1.06c1.6-2.75,4.35-5,6.88-7.34A9.42,9.42,0,0,0,25,47.4l-1.29,1.9a43.3,43.3,0,0,0-2.47,4.21,26.41,26.41,0,0,0-1.26,3h3.32c0,3.33-.17,6.24-1.78,7.88C38,63,62.45,62.12,89.73,62.12,139.29,62.12,179.47,65,179.47,68.46Z"
                      style={{ fill: "#f8f8f8" }}
                    ></path>
                    <path
                      d="M113.13,39.33,90.38,42.78,67.62,39.33l22.76-3.44Zm0,10.6V60.71L90.38,66.58V42.78l6.2,9.66ZM90.38,42.78v23.8L67.62,60.71V49.93l16.55,2.51Z"
                      style={{ fill: "#f6feff" }}
                    ></path>
                    <path
                      d="M63.13,70a1,1,0,1,1,0,2.07,1,1,0,0,1,0-2.07Zm55.18-13.1a1,1,0,1,1-1,1,1,1,0,0,1,1-1Zm-9.66-43.45a1,1,0,1,1,0,2.07,1,1,0,0,1,0-2.07ZM91.41,19.68a1,1,0,1,1-1,1,1,1,0,0,1,1-1ZM76.93,14.51a1,1,0,0,1,0,2.07,1,1,0,1,1,0-2.07ZM59.69,38.3a1,1,0,0,1,0,2.07,1,1,0,1,1,0-2.07Z"
                      style={{ fill: "#1e81ce" }}
                    ></path>
                    <path
                      d="M90.48,42.1a.71.71,0,0,1,.31.13A.61.61,0,0,0,90.48,42.1Zm-.18,0h.08ZM114,39.34l6-9.29a.68.68,0,0,0-.48-1.05L96.69,25.55a.7.7,0,0,0-.69.31l-5.62,8.75-5.63-8.75a.69.69,0,0,0-.68-.31L61.31,29a.69.69,0,0,0-.53.39.7.7,0,0,0,0,.66l6,9.29-6,9.28a.69.69,0,0,0,.48,1.05l5.62.85v16.4a.69.69,0,0,0,.52.67L90.2,73.45l.18,0,.17,0,22.76-5.86a.7.7,0,0,0,.51-.67V50.52l5.62-.85a.67.67,0,0,0,.53-.4.66.66,0,0,0,0-.65ZM96.92,27l21.27,3.22-5.39,8.39L91.53,35.36ZM62.57,30.2,83.83,27l5.39,8.38L68,38.59Zm5.11,19h-.06l-5.05-.77L68,40.08,89.22,43.3l-5.39,8.39-16-2.43Zm22,22.65-21.38-5.5V61.6l21.38,5.51Zm0-6.2L68.31,60.17V50.73l15.76,2.39h.1a.7.7,0,0,0,.58-.32l4.94-7.68Zm.69-23.6H90.3l.08,0L72.24,39.34l18.14-2.75,18.13,2.75L90.38,42.08Zm.1,0a.61.61,0,0,1,.31.13A.71.71,0,0,0,90.48,42.1Zm22,24.29-21.37,5.5V67.11l21.37-5.51Zm0-6.22L91.07,65.69V45.14L96,52.81a.7.7,0,0,0,.58.32h.11l15.75-2.39Zm.69-10.93-.2,0-16,2.42L91.53,43.3l21.27-3.22,5.39,8.39ZM90.48,42.1a.71.71,0,0,1,.31.13A.61.61,0,0,0,90.48,42.1Zm-.18,0h.08Z"
                      style={{ fill: "#64b9ff" }}
                    ></path>
                    <path
                      d="M115.89,16.23A2.76,2.76,0,1,1,113.13,19a2.76,2.76,0,0,1,2.76-2.76Z"
                      style={{ fill: "#9bc9ff" }}
                    ></path>
                    <path
                      d="M115.89,22.44A3.45,3.45,0,1,1,119.34,19a3.46,3.46,0,0,1-3.45,3.45Zm0-5.52A2.07,2.07,0,1,0,118,19a2.07,2.07,0,0,0-2.07-2.07Z"
                      style={{ fill: "#38a5ff" }}
                    ></path>
                    <path
                      d="M66.58,14.85a3.8,3.8,0,1,1-3.79,3.8,3.8,3.8,0,0,1,3.79-3.8Z"
                      style={{ fill: "#9bc9ff" }}
                    ></path>
                    <path
                      d="M66.58,23.13a4.49,4.49,0,1,1,4.49-4.48,4.49,4.49,0,0,1-4.49,4.48Zm0-7.59a3.11,3.11,0,1,0,3.11,3.11,3.1,3.1,0,0,0-3.11-3.11Z"
                      style={{ fill: "#64b9ff" }}
                    ></path>
                  </g>
                </g>
              </svg>
              <span>You haven't placed any orders yet.</span>
              <span>We can't wait to have you as a customer!</span>
            </div>
          ) : (
            /* main 1 */
            <div className="my-4  px-2 md:my-6 md:px-0">
              {/* text  */}
              <h2 className="text-2xl lg:text-3xl">Order Details</h2>

              {/* main 2 */}
              {currUserCartItems.map((order, index) => {
                return (
                  <div key={index}>
                    {order.cartItems.map((ele) => (
                      <div
                        key={index}
                        className="mt-5 flex flex-col overflow-hidden  md:flex-row gap-8"
                      >
                        {/* main 3  */}
                        <div className="w-full border-r  md:max-w-xs">
                          {/* left  */}
                          <div className="p-8   border border-black">
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 ">
                              <div className="mb-4">
                                <div className="text-sm font-semibold text-black">
                                  Order Id
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {ele.id}
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="text-sm font-semibold">
                                  Date
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {order.date}
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="text-sm font-semibold">
                                  Total Amount
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  ₹{ele.price * ele.quantity}
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="text-sm font-semibold">
                                  Order Status
                                </div>
                                <div className="text-sm font-medium text-green-800">
                                  Confirmed
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* right  */}
                        <div className="flex-1">
                          <div className="p-8 border border-black">
                            <ul className="-my-7 divide-y divide-gray-200">
                              <div>
                                <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                        src={ele.imageURL1}
                                        alt={"IMG"}
                                      />
                                    </div>

                                    <div className="ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">
                                          {ele.title}
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                                          {ele.color}
                                        </p>
                                      </div>

                                      <p className="mt-4 text-sm font-medium text-gray-500">
                                        x {ele.quantity}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">
                                      {"$" + ele.price}
                                    </p>
                                  </div>
                                </li>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashBoard;
