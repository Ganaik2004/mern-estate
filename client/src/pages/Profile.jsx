import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section>
      <div className="flex items-center justify-center  px-4    lg:px-8  w-full h-[90vh]">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h1 className="text-2xl font-semibold text-center">Profile</h1>
          <div className="mb-2 flex justify-center">
                <img className="rounded-full h-[170px] w-[170px] object-cover cursor-pointer my-2" src={currentUser.avatar} alt="Profile Photo" />
          </div>

          <form className="mt-8">
            <div className="space-y-5">
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Username"
                  id="username"
                ></input>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id="email"
                ></input>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  id="password"
                ></input>
              </div>

              <div>
                <button
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:opacity-70"
                >
                  UPDATE
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-between my-4">
            <span className="text-red-700 cursor-pointer bg-red-100 p-2 rounded-lg">Delete Account</span>
            <span className="text-red-700 cursor-pointer bg-red-100 p-2 rounded-lg">Sign Out</span>
          </div>
        </div>
      </div>
    </section>
  );
}
