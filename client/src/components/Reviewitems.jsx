import React from 'react'
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Reviewitems({review}) {
  const { currentUser } = useSelector((state) => state.user);
  const handleSubmit1 = async ()=>{
    //  e.preventDefault();
    const result = await fetch(`/api/review/listings/${review.listing}/delete/${review._id}`, {
      method: 'DELETE',
    });
  }
  return (
    
    <div className='bg-white border p-3 rounded-lg hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] flex flex-col gap-3'>
        <p className='text-[10px]'>@{review.author.username}</p>
         <Rating name="read-only"  size='small' value={review.rating} readOnly />
         <p>{review.comment}</p>
        {
          currentUser._id==review.author._id && <div className='flex flex-wrap gap-3 justify-between'>
            <form action="" onSubmit={handleSubmit1}>
            <button className='text-red-700 cursor-pointer p-2 bg-red-100 rounded-lg'>Delete</button>
            </form>
           
          </div>
        }
    </div>
  )
}
