import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const handleImageSubmit = (e) => {
  
    if (files.length > 0 && files.length+formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false)
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  console.log(files);
  const handleRemoveImage = (index)=>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!==index)
    })
  }
  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />

          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          ></textarea>

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="162"
            minLength="10"
            required
          />
          <div className=" flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="" id="sale" className="w-4" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="rent" className="w-4" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" name="" id="parking" className="w-4" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className=" flex items-center gap-3">
              <input
                className="p-3 border-gray-300 border-2 rounded-lg"
                type="number"
                id="bedrooms"
                min="1"
                max="5"
                required
              />
              <p>Beds</p>
            </div>
            <div className=" flex items-center gap-3">
              <input
                className="p-3 border-gray-300 border-2 rounded-lg"
                type="number"
                id="bathrooms"
                min="1"
                max="5"
                required
              />
              <p>Baths</p>
            </div>
            <div className=" flex items-center gap-3">
              <input
                className="p-3 border-gray-300 border-2 rounded-lg"
                type="number"
                id="regularPrice"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs text-center">(₹/ Month)</span>
              </div>
            </div>
            <div className=" flex items-center gap-3">
              <input
                className="p-3 border-gray-300 border-2 rounded-lg"
                type="number"
                id=" discountPrice"
                required
              />
              <div className=" flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs text-center">(₹/ Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 px-3 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="uppercase font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded-lg w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-800 border-2 border-green-800 rounded-lg hover:bg-green-100 disabled:opacity-80"
            >
              {uploading ?"Uploading...": "Upload"}
             
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>(
              <div key={url} className="flex justify-between p-3 items-center border">
              <img src={url} alt="listing image" className="w-20 h-20 object-cover rounded-lg" />
              <button type="button" onClick={()=>handleRemoveImage(index)} className="text-red-800 border-2 border-red-800 bg-red-100 rounded-lg p-2 hover:bg-red-300">Delete</button>
              </div>
            )
           
            )
          }
          <button className=" uppercase p-3 border-2 border-blue-800 bg-blue-100 rounded-lg hover:bg-blue-300 disabled:opacity-80">
            Create Listing
          </button>
        </div>
        
      </form>
    </main>
  );
}
