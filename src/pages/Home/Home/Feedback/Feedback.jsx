import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Feedback = () => {
  const data = [
    {
      id: "1",
      name: "Yasir",
      img: "/src/assets/437909366_2162601154083568_8384285843800500649_n.jpg",
      review: "This platform has transformed my financial planning!",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Asif",
      img: "/src/assets/459809096_1213306209810555_1832615970736443789_n.jpg",
      review: "Excellent tools and great support—highly recommend!",
      rating: 5.0,
    },
    {
      id: "3",
      name: "Sakib",
      img: "/src/assets/461517104_878925317519341_419941465583354984_n.jpg",
      review: "A reliable solution for managing my investments.",
      rating: 4.0,
    },
    {
      id: "4",
      name: "Anamika",
      img: "/src/assets/476606836_1836977850437904_7411614726355960226_n.jpg",
      review: "Flexible features to take smart decisions",
      rating: 5.0,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows:false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    if (rating % 1 !== 0) {
      stars[Math.floor(rating)] = <span key={Math.floor(rating) + 1} className="text-yellow-400">★</span>;
    }
    return stars;
  };

  return (
    <div className="py-16 tracking-wide">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 tracking-wide">
        User
        <span className="bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
          {" "}Appreciation
        </span>
      </h1>
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {data.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <div className="bg-black rounded-lg shadow-lg p-6 border border-green-500 hover:shadow-xl hover:shadow-green-500 transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                    src={testimonial.img}
                    alt={`${testimonial.name}'s profile`}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-green-500">{testimonial.name}</h3>
                    <div className="flex text-sm">{renderStars(testimonial.rating)}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic before:content-['\201C'] after:content-['\201D'] before:text-green-500 after:text-green-500">
                  {testimonial.review}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Feedback;