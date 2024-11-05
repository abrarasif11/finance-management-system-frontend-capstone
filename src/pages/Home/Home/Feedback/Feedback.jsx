import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Feedback = () => {
    const data = [
        {
            id: '1',
            name: `Yasir`,
            img: `/src/assets/437909366_2162601154083568_8384285843800500649_n.jpg`,
            review: `nice`,
        },
        {
            id: '2',
            name: `Asif`,
            img: `/src/assets/459809096_1213306209810555_1832615970736443789_n.jpg`,
            review: `nice`,
        },
        {
            id: '3',
            name: `Sakib`,
            img: `/src/assets/461517104_878925317519341_419941465583354984_n.jpg`,
            review: `nice`,
        },

    ]




    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (

        <div className='h-screen pt-10'>
            <h1 className='text-center text-[#21304E] font-semibold text-4xl pb-20'>Our Customers Feedback</h1>

            <div className=' w-3/4 mx-auto slider '>
                <Slider {...settings}>
                    {
                        data.map((feedback, index) => {
                            return (
                                <div key={index} className='bg-white'>
                                    <div className="container mx-4 flex flex-col w-full border max-w-lg p-6  divide-y rounded-md divide-[#21304E] bg-[#DFE2E7] ">
                                        <div className="flex justify-between p-4">
                                            <div className="flex p-8 space-x-4">
                                                <div>
                                                    <img src={feedback.img} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">{feedback.name}</h4>
                                                    <span className="text-xs dark:text-gray-400">2 days ago</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 dark:text-yellow-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                                    <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                                </svg>
                                                <span className="text-xl font-bold">4.5</span>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                                            <p>{feedback.review}</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    );
};

export default Feedback;