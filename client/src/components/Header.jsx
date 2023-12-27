import React from "react";
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Header() {
  const {currentUser} = useSelector(state=>state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
      <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
        <form action="" className="bg-slate-100 p-3 rounded-lg flex  items-center gap-2">
          <input type="text" placeholder="Search..." className="bg-transparent flex-1 focus:outline-none w-34 sm:w-64"/>
          <FaSearch className="text-slate-600 "/>
        </form>
     <ul className="flex gap-4 items-center">
      
<Link to="/">
<li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
</Link>
<Link to='/about'>
<li className="hidden sm:inline text-slate-700 hover:underline">About</li>
</Link>
<Link to='/profile'>
{
  currentUser? (<img className="rounded-full h-8 w-8 object-cover" src={currentUser.avatar} alt="Profile Photo"></img>):(<li className=" text-slate-700 hover:underline">Sign In</li>)
}
</Link>
    
 

     </ul>
      </div>
    </header>
  );
}
