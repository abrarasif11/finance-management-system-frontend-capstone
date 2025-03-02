import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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

   
    return (
<div className="mt-20 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      <div className="flex flex-wrap justify-center">
        {data.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin">
              <p>{testimonial.name}</p>
              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src={testimonial.img}
                  alt=""
                />
                <div>
                  <h6>{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-neutral-600">
                    {testimonial.review}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        
    );
};

export default Feedback;