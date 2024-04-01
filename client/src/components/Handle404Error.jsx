import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useDispatch } from 'react-redux';
import {
    deleteUserFailure,
    deleteUserSuccess,
    signOutUserStart,
  } from "../redux/user/userSlice.js";
import { useNavigate } from 'react-router-dom';
export function Handle404Error() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = async (e) => {
      e.preventDefault();
        try {
          dispatch(signOutUserStart());
          const res = await fetch("/api/auth/signout");
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
        //   navigate('/');
        } catch (error) {
          dispatch(deleteUserFailure(data.message));
        }
      };
  return (
    <div className="flex items-center justify-center px-2 md:px-0 p-10">
      <div>
        <p className="text-sm font-semibold text-black">404 error</p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          We can&apos;t find that page
        </h1>
        <p className="mt-4 text-gray-500">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center space-x-3">
            <form  onSubmit={handleSignOut} id = 'okk'>
            <button
           
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <ArrowLeft size={16} className="mr-2" />
            Sign Out
          </button>
            </form>
        </div>
      </div>
    </div>
  )
}
