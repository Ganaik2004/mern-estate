import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4" >
          <div className="flex flex-col gap-4 flex-1">
               <input type="text" placeholder="Name"  className="border p-3 rounded-lg" id="name" maxLength='62' minLength='10' required/>


               <textarea type="text" placeholder="Description"  className="border p-3 rounded-lg" id="description"  required></textarea>


               <input type="text" placeholder="Address"  className="border p-3 rounded-lg" id="address" maxLength='162' minLength='10' required/>
               <div className=" flex gap-6 flex-wrap">
                       <div className="flex gap-2">
                             <input type="checkbox" name="" id="sale" className="w-4" />
                             <span >Sell</span>
                       </div>
                       <div className="flex gap-2">
                             <input type="checkbox" name="" id="rent" className="w-4" />
                             <span >Rent</span>
                       </div>

                       <div className="flex gap-2">
                             <input type="checkbox" name="" id="parking" className="w-4" />
                             <span >Parking spot</span>
                       </div>
                       <div className="flex gap-2">
                             <input type="checkbox" name="" id="furnished" className="w-4" />
                             <span >Furnished</span>
                       </div>
                       <div className="flex gap-2">
                             <input type="checkbox" name="" id="offer" className="w-4" />
                             <span>Offer</span>
                       </div>
               </div>
               <div className="flex flex-wrap gap-6">
                      <div className=" flex items-center gap-3">
                        <input className="p-3 border-gray-300 border-2 rounded-lg" type="number"  id="bedrooms" min='1' max='5' required/>
                        <p>Beds</p>
                      </div>
                      <div className=" flex items-center gap-3">
                        <input className="p-3 border-gray-300 border-2 rounded-lg" type="number"  id="bathrooms" min='1' max='5' required/>
                        <p>Baths</p>
                      </div>
                      <div className=" flex items-center gap-3">
                        <input className="p-3 border-gray-300 border-2 rounded-lg" type="number"  id="regularPrice"  required/>
                        <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        <span className="text-xs text-center">(₹/ Month)</span>
                        </div>
                      
                      </div>
                      <div className=" flex items-center gap-3">
                        <input className="p-3 border-gray-300 border-2 rounded-lg" type="number"  id=" discountPrice"  required/>
                        <div className=" flex flex-col items-center">
                        <p>Discounted Price</p>
                        <span className="text-xs text-center">(₹/ Month)</span>
                        </div>
                        
                      </div>
               </div>
          </div>
        <div className="flex flex-col flex-1 px-3 gap-4">
            <p className="font-semibold">Images:  <span className="uppercase font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span></p>
            <div className=" flex gap-4">
              <input className="p-3 border border-gray-300 rounded-lg w-full" type="file" id="images" accept="image/*" multiple/>
              <button className="p-3 text-green-800 border-2 border-green-800 rounded-lg hover:bg-green-100 disabled:opacity-80">Upload</button>
            </div>
            <button className=" uppercase p-3 border-2 border-blue-800 bg-blue-100 rounded-lg hover:bg-blue-300 disabled:opacity-80">Create Listing</button>
        </div>
       
      </form>
    </main>
  );
}
