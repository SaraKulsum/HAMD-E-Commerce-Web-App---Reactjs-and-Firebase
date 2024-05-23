// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Scrollbar, Autoplay } from 'swiper/modules';

import b1 from './bannerImgs/banner1.webp'
import b2 from './bannerImgs/banner2.jpg'

import b3 from './bannerImgs/banner3.jpg'

import b4 from './bannerImgs/banner4.jpg'





const Banner = () => {
    let data = [{img:b1, link: '/men/collections/jeans&trousers',key:1},{img:b2, link: '/men/collections/co-ords' },{img:b3, link: '/womensWear' },{img:b4, link: '/men/collections/jackets&blazers' }];
  return (
    <>
    
        <Swiper
       modules={[ Scrollbar, Autoplay]}
       spaceBetween={50}
       slidesPerView={1}
       
       
       autoplay={
        {
            delay: 2000,
            disableOnInteraction: false,

        } }
       rewind = {true}
       scrollbar={{ draggable: true }}
      >
       
        
         
            <SwiperSlide>  
                <a href={data[0].link}><img className='w-[3000px] 
                  aspect-auto' src={data[0].img} alt="image1"/></a>       
                {/* update the links in the above imgs array */}
            </SwiperSlide>
            
            <SwiperSlide>
                <a href={data[1].link}><img className='w-[3000px] 
                 aspect-auto' src={data[1].img} alt="image2"/></a>      
                {/* update the links in the above imgs array */}
            </SwiperSlide>
            
            <SwiperSlide> 
                <a href={data[2].link}><img className='w-[3000px] 
                 aspect-auto' src={data[2].img} alt="image3"/></a> 
                {/* update the links in the above imgs array */}
            </SwiperSlide>

           
            
            <SwiperSlide>
                <a href={data[3].link}><img className='w-[3000px] 
                 aspect-auto' src={data[3].img} alt="image5"/></a>    
                {/* update the links in the above imgs array */}    
            </SwiperSlide>
          
            
          
    </Swiper>
    </>
  )
}

export default Banner