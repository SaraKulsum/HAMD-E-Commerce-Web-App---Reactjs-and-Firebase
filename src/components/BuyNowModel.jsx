import React from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const BuyNowModel = ({
  closeBtn,
  addressInfo,
  setAddressInfo,
  buyNowFunction,
  placeOrderCOD,
  setPaymentMethod,
  paymentMethod,
  
}) => {
  const navigate = useNavigate();
  //cartItem
  const cartItems = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // user

  const test = () => {
    if (paymentMethod === "cod") {
      //place order and close entire model
      closeBtn();
    } else {
      //close current model content to display other model
      document.querySelector(".model").style = "display:none;";
    }
  };

  //object to store order address

  return (
    <div className="modellContainer fixed inset-0 bg-black bg-opacity-30 flex backdrop-blur-sm  justify-center items-center z-[9999]">
      <div className="model flex flex-col justify-center border  bg-white  rounded-lg border-black w-full h-[100vh] md:w-96 md:h-fit p-4 ">
        <div className="flex justify-between">
          <span className="font-bold text-bg font-serif">HAMD</span>
          <button
            onClick={closeBtn}
            type="button"
            className="text-black flex justify-end mb-4"
          >
            <IoMdClose />
          </button>
        </div>

        <form>
          <div className="flex flex-col gap-3 mx-8">
            <label htmlFor="phone" className="font-semibold flex flex-col">
              Name
              <input
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, name: e.target.value })
                }
                required
                type="text"
                id="name"
                placeholder="Name"
                value={addressInfo.name}
                className="border font-normal border-black rounded-md w-full p-2"
              />
            </label>

            <label htmlFor="phone" className="font-semibold flex flex-col">
              Phone Number
              <input
                onChange={(e) =>
                  setAddressInfo({
                    ...addressInfo,
                    phoneNumber: e.target.value,
                  })
                }
                required
                value={addressInfo.phoneNumber}
                type="number"
                id="phone"
                placeholder="Phone Number"
                className="border font-normal border-black rounded-md w-full p-2"
              />
            </label>
            <div className="flex justify-between">
              <label htmlFor="country" className="font-semibold flex flex-col ">
                country
                <input
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, country: e.target.value })
                  }
                  required
                  value={addressInfo.country}
                  type="text"
                  id="country"
                  placeholder="country"
                  className="border border-black font-normal rounded-md w-[130px] text-lg p-2"
                />
              </label>

              <label htmlFor="city" className="font-semibold flex flex-col">
                city
                <input
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, city: e.target.value })
                  }
                  required
                  value={addressInfo.city}
                  type="text"
                  id="city"
                  placeholder="city"
                  className="border border-black font-normal w-[130px] rounded-md text-lg p-2"
                />
              </label>
            </div>

            <label htmlFor="address" className="font-semibold flex flex-col">
              address
              <input
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, address: e.target.value })
                }
                value={addressInfo.address}
                type="text"
                id="address"
                placeholder="address"
                className="border border-black font-normal rounded-md text-lg p-2"
              />
            </label>

            <label htmlFor="pinCode" className="font-semibold flex flex-col">
              pincode
              <input
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, pincode: e.target.value })
                }
                required
                value={addressInfo.pincode}
                type="pincode"
                id="phone"
                placeholder="pincode"
                className="border border-black font-normal rounded-md text-lg p-2"
              />
            </label>
          </div>

          <div className="mx-8 mt-2 flex flex-col gap-1">
            <h4 className="font-semibold">payment method</h4>
            <div className="flex justify-between ">
              <label htmlFor="cod" className="capitalize text-sm border rounded-md border-black m-1 px-[3px] py-3">
                <input
                  type="radio"
                  id="cod"
                  name="opt"
                  className="mr-1"
                  onChange={() => {
                    setPaymentMethod("cod");
                  }}
                />
                cash on delivery
              </label>
              <label htmlFor="op" className="capitalize border rounded-md border-black m-1 px-[3px] py-3">
                <input
                  type="radio"
                  id="op"
                  name="opt"
                  className="mr-1"
                  onChange={() => {
                    setPaymentMethod("op");
                  }}
                />
                Razorpay
              </label>
            </div>
          </div>
        </form>
        <button
          onClick={() => {
           if(paymentMethod === 'op'){
            buyNowFunction();
           }else{
            placeOrderCOD();
           } 
          }}
          type="button"
          className="bg-black text-white my-4"
        >
          Buy Now!
        </button>
      </div>
    </div>
  );
};

export default BuyNowModel;
