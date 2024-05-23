import * as ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { PiBag } from "react-icons/pi";

import { IoOptionsOutline, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBox from "./SearchComponents/SearchBox";

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users"));

  let [isMenuOpn, setMenuOpn] = useState("false");

  let [prevClickedAddress, setAddress] = useState(null);

  /*CATEGORIES*/
  let menCategoryData = [
    { name: "t-shirts & shirts", link: "/men/collections/t-shirts&shirts" },
    { name: "jeans & trousers", link: "/men/collections/jeans&trousers" },
    { name: "jackets & blazers", link: "/men/collections/jackets&blazers" },
    { name: "co-ords-sets", link: "/men/collections/co-ords" },
    { name: "suits", link: "/men/collections/suits" },
    { name: "View All>>", link: "/mensWear" },
  ];
  let womenCategoryData = [
    { name: "Jackets & coats", link: "/women/collections/jackets&coats" },
    { name: "Tops & dresses", link: "/women/collections/tops&dresses" },
    { name: "co-ord sets", link: "/women/collections/co-ords" },
    { name: "t-shirts & shirts", link: "/women/collections/t-shirts&shirts" },
    { name: "jeans & trousers", link: "/women/collections/jeans&trousers" },
    { name: "View All>>", link: "/womensWear" },
  ];

  const showMenu = () => {
    if (isMenuOpn == "false") {
      document.querySelector(".optBox").style.right = "0vw";

      setMenuOpn("true");
      console.log("open");
    } else {
      setMenuOpn("false");
      document.querySelector(".optBox").style.right = "-100vw";

      console.log("close");
    }
  };

  const getmenCategoryList = () => {
    document.querySelector(".dropDown-content-list-women").style =
      "display:none;";
    document.querySelector(".dropDown-content-list-men").style =
      "display:block;";
  };

  const getWomenCategoryList = () => {
    document.querySelector(".dropDown-content-list-men").style =
      "display:none;";
    document.querySelector(".dropDown-content-list-women").style =
      "display:block;";
  };

  /*Underline on clicked navItem*/
  const handleClick = (address) => {
    if (prevClickedAddress != null) {
      document.querySelector(`.${prevClickedAddress}Underline`).style =
        "display:none;";
    }

    document.querySelector(`.${address}Underline`).style = "display:block;";
    console.log(`'#${address}Underline'`);
    let dropDownEle = document.querySelector(".dropDown-content");
    let dropDownState = dropDownEle.getAttribute("data-theme");
    if ((prevClickedAddress == address) & (dropDownState == "active")) {
      
        /*remove underline when dropdown is closed*/
      
      document.querySelector(`.${prevClickedAddress}Underline`).style =
        "display:none;";

      dropDownEle.style = "display:none";
      document
        .querySelector(".dropDown-content")
        .setAttribute("data-theme", "inActive");
    } else {
      document.querySelector(".dropDown-content").style = "display:flex";
      document
        .querySelector(".dropDown-content")
        .setAttribute("data-theme", "active");
    }
    setAddress(address);
    console.log(dropDownEle.getAttribute("data-theme"));
  };

  {
    /*navigate Category Page ONCLICK IN HAM_MENU */
  }
  const hamCategoryClicked = (link) => {
    navigate(link);
  };

  {
    /*Display total cartItems on NavBar */
  }
  const cartItems = useSelector((state) => state.cart);
  //Total Cart Item...
  const totalCartItems = cartItems
    .map((ele) => ele.quantity)
    .reduce((accumulator, currValue) => {
      return accumulator + currValue;
    }, 0);

  {
    /*check user (or) admin and navigate to respective Dashboard ||  display sign in page*/
  }
  const checkAdminOrUser = () => {
    if (user === null) {
      navigate("/Signup");
    } else {
      user.role === "user"
        ? navigate("/UserDashBoard")
        : navigate("/AdminDashBoard");
    }
  };

 

 const closeOptionBox = () => {
    
    let dropDownEle = document.querySelector('.dropDown-content');
    let dropDownState = dropDownEle.getAttribute('data-theme');
   
        dropDownEle.style = 'display:none'
        document.querySelector('.dropDown-content').setAttribute('data-theme' , 'inActive');    
        document.querySelector('.contactUnderline').style = "display:none;"
        document.querySelector('.menCategoryUnderline').style = "display:none;"
        document.querySelector('.womenCategoryUnderline').style = "display:none;"

         
  };

  return (
    <header >
      <div  className="navContainer  z-[100] p-3 w-[100vw] bg-transparent backdrop-blur-sm fixed shadow-md block top-0">
        <div onClick={()=>closeOptionBox} className="flex justify-between items-center mx-3">
          <a href="/">
            <span className="font-[robotic] font-bold text-[30px] text-center ">
              HAMD
            </span>{" "}
          </a>

          <div className="navLeft flex gap-8 items-center py-3">
            <ul className="navItem flex gap-8 tracking-wide">
              <li
                id="navItem"
                onClick={() => {
                  getWomenCategoryList();
                  handleClick("womenCategory");
                }}
                className="category relative  block  hover:cursor-pointer "
              >
                WOMEN
                <span className="womenCategoryUnderline bg-black absolute bottom-0 h-[2px] w-full hidden"></span>
              </li>

              <li
                id="navItem"
                onClick={() => {
                  getmenCategoryList();
                  handleClick("menCategory");
                }}
                className="category relative hover:cursor-pointer block"
              >
                MEN
                <span className="menCategoryUnderline bg-black absolute bottom-0 h-[2px] w-full hidden"></span>
              </li>

              <li
                id="navItem"
                onClick={() =>{ handleClick("contact"), closeOptionBox()}}
                className="category relative hover:cursor-pointer block"
              >
                <a href="#footer">CONTACT</a>
                <span className="contactUnderline bg-black absolute bottom-0 h-[2px] w-full hidden"></span>
              </li>

              <li id="userAccount" className="navItem">
                <BiUser
                  onClick={checkAdminOrUser}
                  className="hover:cursor-pointer"
                  size={20}
                />
              </li>

              <li id="cart" className="navItem  ">
                <a href="/cart" className="text-xl flex items-center">
                  <PiBag />
                  <span className="bg-black flex items-center  text-white text-xs rounded-full px-[4px]">
                    {totalCartItems}
                  </span>
                </a>
              </li>
            </ul>
            {isMenuOpn && (
              <div
                data-theme="inActive"
                className="dropDown-content  transition-all duration-[1s]  py-6 top-[60px] ease-in-out drop-shadow-xl w-[300px]  absolute hidden flex-col bg-white gap-4 rounded-md px-3"
              >
                <span className="text-[#373F47]">
                  //SHOP BY CATEGORY:<span className="categoryName"></span>
                </span>
                <hr />

                <ul className="dropDown-content-list-men hover:cursor-pointer hidden">
                  {menCategoryData.map((ele, index) => (
                    <li
                      key={index}
                      onClick={() => {navigate(ele.link), closeOptionBox()}}
                      className="l1 hover:font-[600] my-2 uppercase"
                    >
                      <span>{ele.name}</span>
                    </li>
                  ))}
                </ul>
                <ul className="dropDown-content-list-women hover:cursor-pointer hidden">
                  {womenCategoryData.map((ele, index) => (
                    <li
                      key={index}
                      onClick={() => {navigate(ele.link),closeOptionBox()}}
                      className="l1 hover:font-[600] my-2 uppercase"
                    >
                      <span>{ele.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="navRight flex gap-6">
            {/*search box*/}
            <div className="navItem">
              <SearchBox />
            </div>

            <a
              href={"/cart"}
              className="optionsForSmScrns text-xl  items-center"
            >
              <PiBag />
              <span className="bg-black flex items-center  text-white text-xs  rounded-full px-[4px]">
                {totalCartItems}
              </span>
            </a>
            <span className="optionsForSmScrns text-[25px]  text-black z-[9999]">
              <IoOptionsOutline onClick={showMenu} />
            </span>
          </div>
        </div>
      </div>
      {/*-----(HAM_MENU) options button for small screens----*/}
      <div className="optBox min-h-[100vh] w-[300px] rounded-md bg-white fixed backdrop-blur-sm pt-14 z-[99]  overflow-y-scroll">
        <div className="h-full flex  flex-col justify-center gap-4 pt-16  transition-all ">
          <div className="searchBox_sm_scrns flex gap-2 items-center   rounded-sm">
            <SearchBox />
          </div>

          <hr className="h-[2px] bg-[#a7a3a3]" />
          <ul className="flex flex-col gap-4 overflow-y-auto h-[50vh]">
            <li>
              <select
                onChange={(e) => hamCategoryClicked(e.target.value)}
                name="Men"
                id="men"
                className="border-none outline-none"
              >
                <option value="">Men</option>

                {menCategoryData.map((ele, index) => (
                  <option key={index} value={ele.link}>
                    {ele.name}
                  </option>
                ))}
              </select>
            </li>
            <hr className="h-[2px] bg-[#a7a3a3]" />

            <li>
              <select
                onChange={(e) => hamCategoryClicked(e.target.value)}
                name="Women"
                id="women"
                className="border-none outline-none"
              >
                <option value="">Women</option>
                {womenCategoryData.map((ele, index) => (
                  <option key={index} value={ele.link}>
                    {ele.name}
                  </option>
                ))}
              </select>
            </li>
            <hr className="h-[2px] bg-[#a7a3a3]" />

            <li>
              <a href="#footer">Contact</a>
            </li>
            <hr className="h-[2px] bg-[#a7a3a3]" />

            <li>
              <span onClick={() => checkAdminOrUser()}>Account</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
export default NavBar;
