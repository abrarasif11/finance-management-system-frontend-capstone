// import { Link } from "react-router-dom";
// import BannerImg from "../BannerImg/BannerImg";
import video1 from "../../../assets/giphy.gif";
const Banner1 = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold  text-center tracking-wide">
        Track, Save and
        <span className="bg-green-500 font-semibold to-green-800 text-transparent bg-clip-text">
          {" "}
          Plan Your Finance!
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-white max-w-4xl">
        Your Ultimate Smart Finance Companion for Effortless Budgeting, Smarter
        Spending, and Long Term Financial Growth. Take Control of Your Finances,
        Track Expenses Seamlessly, Save Smarter and Achieve Your Financial
        Goals with Confidence!
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-green-500 to-green-800 py-3 px-4 mx-3 rounded-md"
        >
          Start for free
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
          Documentation
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        {/* <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-green-500 shadow-sm shadow-green-500 mx-2 my-4"
        > */}
          <img className="w-[700px]" src={video1} alt="" />
          {/* Your browser does not support the video tag. */}
          {/* <img src={video2} alt="" /> */}
          {/* Your browser does not support the video tag. */}
        {/* </video> */}
        {/* <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-green-500 shadow-sm shadow-green-500 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
    </div>
  );
};

export default Banner1;
