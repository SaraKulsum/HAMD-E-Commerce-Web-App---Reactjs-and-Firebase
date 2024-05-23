import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { collection, onSnapshot, orderBy, query,doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import Layout from './Layout';
import Loader from './Loader';
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbDiscount2 } from "react-icons/tb";
import  MyContext  from "../context/MyContext"
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'

import { addToCart, deleteFromCart } from "../redux/cartSlice";


const ProductInfoPage =  () => {
  let [currImg, setCurrImg] = useState(0);
  let [product, setProduct] = useState("");
  let [images, setImages] = useState([]);
  let context = useContext(MyContext);
 const navigate = useNavigate();
  const{getAllProduct,loading,setLoading} = context;
 
  const {id} = useParams();


/*add to cart functionality using redux tool kit*/
const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const addCart = (item) => {
      dispatch(addToCart({...item, id: id, quantity:1}));
      toast.success("Added To Cart")
      
    }
 
    const deleteCart = (item) => {
      dispatch(deleteFromCart({...item, id: id, quantity:1}));
      toast.success("Deleted From Cart")
    }
console.log(cartItems);

 

  {/*functinality to slide image*/}
  const setImg = (indx) =>{
     document.querySelector(".mainImg").setAttribute("src", images[indx]);
     setCurrImg(indx);
  }
  const handleClickUp = () => {
    let upImg
    (currImg == 0? upImg = images.length-1 :  upImg = currImg - 1 )
    
    setImg(upImg);
  }
  const handleClickDown = () => {
    let downImg
    (currImg == images.length-1? downImg = 0 :  downImg = currImg + 1 )
    setImg(downImg);
  }
  {/*extracting information from fireDB according to its id */}
  const getProductFrmDB=async()=>{
    setLoading(true)
    try{
      const docRef =  doc(fireDB, "products",  id);
      const productSanp =  await getDoc(docRef);
      const data = productSanp.data();
      setProduct(data);
      setImages([data.imageURL1,data.imageURL2]); //donot use useState variabele to asssign value to other variable cause useState takis time 
      setLoading(false);
      console.log(data);
    }
    catch(error){
      console.log(error);
      setLoading(false);
    }
    
  }
  //get productInfo onLoad
  useEffect(()=>{
  getProductFrmDB();
  },[])

  


  //get product from cart to local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])


 console.log(product.gender);
  let filteredProducts = getAllProduct?.filter((ele)=> ele.gender == product?.gender);

  return (
    <>
     <Layout>
 
     <div className="container mx-auto ">
     {loading ?
                <>
                    <div className="flex justify-center items-center h-[75vh]">
                        <Loader />
                    </div>
                </>

                :

                <>
      <div className="flex w-full flex-col md:flex-row my-24 gap-8">

        <div className="imagesContainer flex gap-4 md:flex-row flex-col  items-center justify-center w-full md:w-1/2">
          <div className='thumbnails flex flex-row md:flex-col items-center gap-4  order-last md:order-first '>
             <button className='hidden md:block' onClick={handleClickUp}><IoIosArrowUp/></button>
            
                {images.map((ele,index)=>(
                  <img key={"img"+index} src={ele} onClick={()=>setImg(index)} className ='h-[100px] aspect-auto' alt= {"img"+index} />
                ))}  
              <button className ='hidden md:block' onClick={handleClickDown}><IoIosArrowDown/></button>
          </div>

          <div className="image overflow-hidden">
          <img className='mainImg h-[450px] md:h-[550px] aspect-auto' src={product.imageURL1}  alt="pImg" />
          </div>

        </div>

        <div className="informationBox w-full md:w-1/2 mt-4 md:mt-0 flex flex-col gap-7 ">
          <h2 className="text-3xl  tracking-wide">{product?.title}</h2>
         
        <div>
            <span className="text-lg font-semibold mr-2">₹ {product?.price}/- </span>
            <span>(incl. of all taxes)</span>
        </div>
           

            <div className='flex flex-col gap-3'>
                <span className='flex items-center gap-4'><TbDiscount2 size={20}/>15% Off on minimum purchase of 2699/-</span>
                <span className='flex items-center gap-4'><TbDiscount2 size={20}/>20% Off on minimum purchase of 3999/-</span>
                <span className='flex items-center gap-4'><LiaShippingFastSolid size={20} />Free Shipping on 799 and above. Just for you.</span>
            </div>
           
            <hr className='h-[2px] bg-gray-900 w-full ' />
            <div className='size tracking-wider text-black flex flex-col '>
              <span className=' tracking-wide'>SIZE</span>

              <div className='flex gap-3'>
                  <button className='border-[1px] border-black rounded-md px-3 py-2 text-xz hover:bg-black hover:text-white '>S</button>
                  <button className='border-[1px] border-black rounded-md px-3 py-2 text-xs hover:bg-black hover:text-white '>M</button>
                  <button className='border-[1px] border-black rounded-md px-3 py-2 text-xs hover:bg-black hover:text-white '>L</button>
                  <button className='border-[1px] border-black rounded-md px-3 py-2 text-xs hover:bg-black hover:text-white'>XL</button>
                  <button className='border-[1px] border-black rounded-md px-3 py-2 text-xs hover:bg-black hover:text-white '>XXL</button>

              </div>
            </div>
            <div>
            {cartItems.some((p)=> p.id === id)                                     
              ? 
            <button onClick={()=> deleteCart(product)} className="bg-black w-full text-white px-4 py-2  hover:bg-zinc-800 transition duration-300">
             delete from Cart 
            </button>
            :
            <button  onClick={() =>addCart(product)} className="bg-black w-full text-white px-4 py-2  hover:bg-zinc-800 transition duration-300">
            Add to Cart
          </button>
           }  
            </div>
         
         
        </div>

      </div>
      {/*RECOMMENDATION SECTION*/}
      <div className='YOU_MAY_ALSO_LIKE text-center'>
          <span className='text-2xl '>YOU MAY ALSO LIKE</span>
      <div  className="productContainer grid grid-cols-4 gap-5 my-5 font-mono ">
                        {filteredProducts.map((item, index) => {
                            const { id, imageURL1, imageURL2, title, price, color, gender, category} = item
                            return (
                                <div key={index} onClick={()=>{navigate(`/productInfo/${id}`), window.location.reload()}} className="productsDisplayBox hover:cursor-pointer">
                                    <div className="h-full overflow-hidden cursor-pointer">
                                       <div className="imgContainer relative">
                                          <img src={imageURL1} className ="imgFront w-full object-cover aspect-auto transition-transform duration-300 transform hover:scale-110" alt="Imagem de perfil" />
                                          <img src={imageURL2} className ="imgRare w-full object-cover aspect-auto absolute top-0 left-0 opacity-0 transition-opacity duration-300 transform hover:opacity-100" alt="Nova imagem" />
                                        </div>
                                        <div className="p-4 flex flex-col gap-3">
                                      
                                            <span className="title-font text-sm  text-gray-900">
                                                {title}
                                            </span>
                                            <span className="title-font text-sm font-[500] text-gray-900 mb-3">
                                                ₹{price}
                                            </span>
                                           
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

      </div>
      </>}
    </div>     
     

     
   
     </Layout>
      
    </>
  );

  
  
};

export default ProductInfoPage;