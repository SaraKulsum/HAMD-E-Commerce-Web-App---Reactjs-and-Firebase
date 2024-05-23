import React, { useContext } from 'react'
import Layout from './Layout';

import Banner from './Banner'
import { useEffect } from 'react';
import HomePageProductCard from './HomePageProductCard'
import Loader from './Loader';

const HomePage = () => {
  //Scroll to top on page load
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
  
  }, []);
 
  return (
    
    <div>
        <Layout>
           <Banner />    
           <HomePageProductCard />
        </Layout> 
       
    </div>
  )
}

export default HomePage