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
        // responsive: [
        //     {
        //       breakpoint: 1024,
        //       settings: {
        //         slidesToShow: 3,
        //         slidesToScroll: 3,
        //         infinite: true,
        //         dots: true
        //       }
        //     },
        //     {
        //       breakpoint: 600,
        //       settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2,
        //         initialSlide: 2
        //       }
        //     },
        //     {
        //       breakpoint: 480,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //       }
        //     }
        //   ]
    };
    return (

        <div className='h-screen pt-10'>
            <h1 className='text-center font-semibold text-4xl pb-20'>Our Customers Feedback</h1>

            <div className=' w-3/4 mx-auto slider '>
                <Slider {...settings}>
                    {
                        data.map((feedback, index) => {
                            return (
                                <div key={index} className='bg-white'>
                                    <section className="py-6  text-gray-100">
                                        <div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 bg-gray-100 text-gray-800">
                                            <img alt="" className="self-center block m-auto flex-shrink-0  w-24 h-24 -mt-12 bg-center bg-cover rounded-full bg-gray-500" src={feedback.img} />
                                            <div className="flex-1 my-4">
                                                <p className="text-xl font-semibold leadi">{feedback.name}</p>
                                                <p>{feedback.review}</p>
                                            </div>
                                        </div>
                                    </section>
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