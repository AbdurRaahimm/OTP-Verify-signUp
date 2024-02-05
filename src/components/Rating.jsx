import React, { useState } from 'react'
import FilledStar from '../icons/FilledStar'
import EmptyStar from '../icons/EmptyStar'
import HalfStar from '../icons/HalfStar'


export default function Rating() {
    // Set the default Ratings Selected
    const [defaultRating, setDefaultRating] = useState(1);
    // Set the max number of Ratings
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const ratingMsg = [
        "Terrible",
        "Bad",
        "Good",
        "Very Good",
        "Excellent"
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = e.target.review.value;
        // save the review as array in localStorage rating and review and ratingMsg
        let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
        const data = {
            rating: defaultRating,
            review: review,
            ratingMsg: ratingMsg[Math.round(defaultRating) - 1]
        }
        ratings.push(data);
        localStorage.setItem('ratings', JSON.stringify(ratings));
        e.target.reset();
        setDefaultRating(1);

    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-slate-300 space-y-8 rounded-md'>
            <div className="bg-white p-5 w-4/12 ">
                <h2 className='text-2xl text-center capitalize' > user rating </h2>
                <h3 className='text-center'> {ratingMsg[Math.round(defaultRating) - 1]} </h3>
                <div className="flex justify-center ">
                    {
                        maxRating.map((rate, index) => {
                            return (
                                <label key={index} className='text-3xl cursor-pointer ' onClick={() => setDefaultRating(rate)}>
                                    {rate <= defaultRating ? <FilledStar /> : rate - 0.5 <= defaultRating ? <HalfStar /> : <EmptyStar />}
                                </label>
                            )
                        })
                    }
                </div>
                <p className='text-center text-3xl font-bold'>{defaultRating + `/` + maxRating.length}</p>
                <form onSubmit={handleSubmit} >
                    <input type="range" min="1" max="5" step="0.5" className='w-full' value={defaultRating} onChange={(e) => setDefaultRating(e.target.value)} />
                    {/* textarea */}
                    <textarea className='w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 resize-none' name="review" placeholder='Write a review' required />
                    <button className='w-full bg-blue-400 p-2 rounded-lg text-white font-bold'>Submit</button>
                </form>


                {/* display rating from localStorage */}
                <div className="mt-4">
                    {
                        JSON.parse(localStorage.getItem('ratings'))?.map((rate, index) => {
                            // console.log(rate);
                            return (
                                <div key={index} className="flex justify-between">
                                    <p> {rate.ratingMsg} ({
                                        // display rating in star filled and half and empty star
                                        // {rate. <= defaultRating ? <FilledStar /> : rate - 0.5 <= defaultRating ? <HalfStar /> : <EmptyStar />} 
                                        rate.rating

                                        
                                    }) </p>
                                    <p> {rate.review} </p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
};