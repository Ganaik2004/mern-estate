import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const params = useParams();
    useEffect(()=>{
        const fetchListing = async () => {
            try {
              setLoading(true);
              const res = await fetch(`/api/listing/get/${params.id}`);
              const data = await res.json();
              if (data.success === false) {
                setError(true);
                setLoading(false);
                return;
              }
              setListing(data);
              setLoading(false);
              setError(false);
            } catch (error) {
              setError(true);
              setLoading(false);
            }
          };
          fetchListing();
       
   },[params.id])
   console.log(listing)
  return (
    <main>
        {
            loading && <p className='text-center my-7 '><span className='bg-green-100 p-3 rounded-lg text-green-800 text-2xl'>Loading...</span></p>
        }
         {
            error && <p className='text-center my-7 '><span className='bg-red-100 p-3 rounded-lg text-red-800 text-2xl'>Something went wrong!</span></p>
        }
        {
            listing && !loading && !error &&(
               <div>
               <Swiper navigation>
               {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
               </Swiper>
               </div>
            )
        }
    </main>
  )
}
