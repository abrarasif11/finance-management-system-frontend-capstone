import { Link } from "react-router-dom";
import BannerImg from "../BannerImg/BannerImg";

const Banner1 = () => {
    return (
        <div>
            <section className="bg-gray-800 text-[#21304E]">
                <div className="container flex flex-col-reverse justify-between p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-semibold ">Ac mattis
                            <span className="text-[#21304E]">senectus</span>erat pharetra
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer

                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <Link rel="noopener noreferrer" to='/login' className="px-9 py-3 text-lg font-semibold rounded-badge bg-[#EF4E5D] text-white">Log In</Link>
                            <a rel="noopener noreferrer" href="#" className="px-9 py-3 bg-[#DFE2E7] text-lg rounded-badge font-semibold  border-gray-100">Get In Touch</a>
                        </div>
                    </div>
                    <div className="ml-0 lg:ml-20">

                        <BannerImg />
                        {/* <img src="/src/assets/photo-1434626881859-194d67b2b86f.png" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" /> */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner1;