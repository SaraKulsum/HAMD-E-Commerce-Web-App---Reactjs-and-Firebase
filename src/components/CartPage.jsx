import React, { useState } from "react";
import Layout from "./Layout";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../redux/cartSlice";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BuyNowModel from "./BuyNowModel";

const CartPage = () => {
  let [openModel, setOpenModel] = useState(false);
  let [paymentMethod, setPaymentMethod] = useState("");
  const user = JSON.parse(localStorage.getItem("users"));
  const [addressInfo, setAddressInfo] = useState({
    name: user.name,
    country: "",
    city: "",
    address: "",
    pincode: "",
    phoneNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //scroll top onload
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted From Cart");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  //get product from cart to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  console.log(cartItems);
  //Total Cart Item...
  const totalCartItems = cartItems
    .map((ele) => ele.quantity)
    .reduce((accumulator, currValue) => {
      return accumulator + currValue;
    }, 0);

  //Total amount
  const totalAmount = cartItems
    .map((ele) => Number(ele.quantity) * Number(ele.price))
    .reduce((accumulator, currValue) => {
      return accumulator + currValue;
    }, 0);

  //discount will be 5% above 2000
  let discount;
  if (totalAmount >= 2000) {
    discount = (totalAmount / 100) * 5;
  } else {
    discount = 0;
  }
  //AMOUNT TO BE PAID AFTER DISCOUNT
  const toPayAmount = Math.round(Number(totalAmount) - Number(discount));
  console.log(toPayAmount);
  //CLOSE MODEL FUNCTION
  const closeBtn = () => {
    setOpenModel(false);
  };

  //BUY NOW FUNCTION
  /*---------------------------------------------------------------------------------------------------------------------------*/
  const buyNowFunction = async () => {
    // validation
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.phoneNumber === "" ||
      addressInfo.country === "" ||
      addressInfo.city === ""
    ) {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    closeBtn()
    var options = {
      key: "rzp_test_Rp50rEZcbWyrjj",
      key_secret: "9wXvtSd4B1rfHPiIFBkBITCx",
      amount: parseInt(toPayAmount * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + addressInfo.name,
      name: "HAMD",
      description: "for testing purpose",
      handler: function (response) {
        // console.log(response)
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;
        // store in firebase
        const orderInfo = {
          cartItems,
          addressInfo,
          email: user.email,
          userid: user.uid,
          paymentId,
          status: "confirmed",
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };

        try {
          const orderRef = collection(fireDB, "order");
          addDoc(orderRef, orderInfo);
          setAddressInfo({
            name: "",
            country: "",
            city: "",
            address: "",
            pincode: "",
            phoneNumber: "",
          });
          //CLEAR CART AFTER ORDER
          cartItems.map((ele) => {
            dispatch(deleteFromCart(ele));
          });
        } catch (error) {
          console.log(error);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  const placeOrderCOD = () => {
    // validation
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.phoneNumber === "" ||
      addressInfo.country === "" ||
      addressInfo.city === ""
    ) {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    // store in firebase
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    try {
      const orderRef = collection(fireDB, "order");
      addDoc(orderRef, orderInfo);
      toast.success("order placed successfully!");
      setAddressInfo({
        name: "",
        country: "",
        city: "",
        address: "",
        pincode: "",
        phoneNumber: "",
      });
      //CLEAR CART AFTER ORDER
      cartItems.map((ele) => {
        dispatch(deleteFromCart(ele));
      });
      closeBtn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto px-4 max-w-7xl  lg:px-0">
          <div className="mx-auto max-w-2xl  lg:max-w-7xl">
            <form className="flex  flex-col gap-8">
              {/*oders*/}
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white "
              >
                <div className="text-center bg-black my-3">
                  <span className="capitalize text-white text-xs sm:text-sm ">
                    get 5% discount on shopping above rs 2000/-
                  </span>
                </div>
                <h2
                  id="cart-heading"
                  className="text-3xl text-center font-normal tracking-wide my-2 text-gray-900 sm:text-4xl"
                >
                  Your Cart ({totalCartItems} items)
                </h2>
                <hr className="my-2" />

                <ul role="list" className="divide-y divide-gray-200">
                  {totalCartItems == 0 && (
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
                      <span>Your cart is currently empty!</span>
                    </div>
                  )}
                  {cartItems?.map((product) => (
                    <li
                      key={product.id}
                      className="flex flex-col gap-4 py-6 px-4 "
                    >
                      <div className="flex justify-between">
                        <div
                          onClick={() => navigate(`/productInfo/${product.id}`)}
                          className="flex gap-1"
                        >
                          <img
                            src={product.imageURL1}
                            alt={"image"}
                            className=" w-24 aspect-auto object-contain object-center"
                          />
                          <div className="CartProductInfo flex flex-col justify-around md:justify-center">
                            <h3 className="text-sm font-semibold text-black">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                        </div>

                        <div className="ml-6 flex text-sm">
                          <button
                            onClick={() => deleteCart(product)}
                            type="button"
                            className="flex  space-x-1 px-2 py-1 pl-0"
                          >
                            <FaRegTrashAlt className="md:size-4" />
                          </button>
                        </div>
                      </div>

                      <div className="quantity_SubTotal">
                        <div className="flex justify-between  ">
                          <div className="flex w-24 border items-center justify-center">
                            <button
                              onClick={() => {
                                handleDecrement(product.id);
                              }}
                              type="button"
                              className="h-7 w-7 text-lg"
                            >
                              -
                            </button>
                            <span className="sara mx-1 h-7 w-9 rounded-md  text-center">
                              {product.quantity}
                            </span>
                            <button
                              onClick={() => {
                                handleIncrement(product.id);
                              }}
                              type="button"
                              className="flex h-7 w-7 text-lg rounded-md items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <p>Rs {product.price}/-</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary || continue shopping*/}
              {cartItems.length != 0 ? (
                <section
                  aria-labelledby="summary-heading"
                  className="rounded-md bg-white"
                >
                  <h2
                    id="summary-heading"
                    className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                  >
                    Summary
                  </h2>
                  <div>
                    <dl className="space-y-1 px-2 py-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-800">
                          Price ({totalCartItems} item)
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ₹ {totalAmount}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <dt className="flex items-center text-sm text-gray-800">
                          <span>Discount</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">
                          - ₹ {Math.round(discount)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="flex text-sm text-gray-800">
                          <span>Delivery Charges</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">
                          Free
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-y border-dashed py-4 ">
                        <dt className="text-base font-medium text-gray-900">
                          Total Amount
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          ₹ {Math.round(toPayAmount)}
                        </dd>
                      </div>
                    </dl>
                    <div className="checkOut_Model_Btn px-2 pb-4 font-medium text-green-700">
                      <div className="flex gap-4 mb-6">
                        <button
                          onClick={() => {
                            setOpenModel(true);
                          }}
                          type="button"
                          className="w-full px-4 py-3 text-center text-gray-100 bg-black border border-transparent dark:border-gray-700 hover:border-black hover:text-black hover:bg-white rounded-xl"
                        >
                          CHECK OUT
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <section>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => navigate("/")}
                      className="px-4 py-3 text-center text-gray-100 bg-black border border-transparent dark:border-gray-700 hover:border-black hover:text-black hover:bg-gradient-to-b from-white to-gray-400 rounded-xl"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </section>
              )}
            </form>
          </div>
        </div>
      </Layout>

      {openModel && (
        <BuyNowModel
          closeBtn={closeBtn}
          addressInfo={addressInfo}
          setAddressInfo={setAddressInfo}
          buyNowFunction={buyNowFunction}
          placeOrderCOD = {placeOrderCOD}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      )}
    </>
  );
};

export default CartPage;
