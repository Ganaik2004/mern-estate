import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Rating from "@mui/material/Rating";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import Reviewitems from "../components/Reviewitems";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loadingReview, setLoadingReview] = useState(false);
  const [errorReview, setErrorReview] = useState(false);
  // const [review, setReview] = useState({});
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [valueReview, setValueReview] = useState({rating:2,author:currentUser._id,listing:params.id});
   useEffect(() => {
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
    
   }
  , [params.id]);
   const handleReview = (e) =>{
      setValueReview({ ...valueReview, [e.target.id]: e.target.value });
   }
  //  console.log(valueReview)
   const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
       setLoadingReview(true);
          const res = await fetch(`/api/review/listings/${listing._id}/review`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(valueReview),
          });
          const data = await res.json();
          if (data.success === false) {
          setLoadingReview(false);
          setErrorReview(true);
            return;
          }
          setListing(data);
          setErrorReview(false);
          setLoadingReview(false);
          location. reload(); 
          
        } catch (error) {
          setLoadingReview(false);
          setErrorReview(true);
        }
   }
        // console.log(listing.reviews);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-5xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ₹
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-IN")
                : listing.regularPrice.toLocaleString("en-IN")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-100 w-full max-w-[200px] text-red-800 text-center p-2 rounded-lg  ">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-100 w-full max-w-[200px] text-green-800 text-center p-2 rounded-lg  ">
                  ₹ {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {errorReview}
            <form action="" onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h1 className="font-semibold">Review</h1>
            <Rating
              name="simple-controlled"
              value={valueReview.rating}
              onChange={(event, newValue) => {
                setValueReview({...valueReview,rating:newValue});
              }}
            />
            <textarea
            type="textarea"
            placeholder="Comment"
            className="border p-3 rounded-lg"
            onChange={handleReview}
            value={valueReview.comment}
            id="comment"
            required
          ></textarea>
          <button  disabled={loadingReview} className=" uppercase text-red-800 p-3  bg-red-100 rounded-lg hover:bg-red-300 disabled:opacity-20">Submit Review</button>
            </form>
            <div className="flex flex-wrap gap-3 justify-center">
            {currentUser&&listing&& listing.reviews.map((review)=>(<Reviewitems key={review._id} review={review}/>))}
           
            </div>
           {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact landlord
              </button>
            )}
            {/* <div>
               
            </div> */}

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
