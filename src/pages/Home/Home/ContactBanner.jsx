const ContactBanner = () => {
    return (
        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-gray-800 dark:text-gray-100">
            <div className="flex flex-col justify-between">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leadi lg:text-5xl">Book a Demo</h2>
                    <div className="text-gray-400">We will show you how it can help business</div>
                </div>
                <img src="/src/assets/illustration_booking.png" alt="" className="p-6 " />
            </div>
            <form novalidate="" className="space-y-6">
                <div>
                    <input id="name" type="text" placeholder="Company Name" className="w-full p-3 rounded bg-gray-100" />
                </div>
                <div>
                    <input id="email" type="email" placeholder="Email Address" className="w-full p-3 rounded bg-gray-100" />
                </div>
                <div>
                    <select className="select bg-[#F3f4f6]  select-bordered w-full max-w-xl">
                        <option disabled selected>Select Interest </option>
                        <option>Normal Apple</option>
                        <option>Normal Orange</option>
                        <option>Normal Tomato</option>
                    </select>
                </div>
                <div>
                    <textarea id="message" rows="3" className="w-full p-3 rounded bg-[#F3f4f6]"></textarea>
                </div>
                <button type="submit" className="w-full tracking font-poppins uppercase  px-7 py-3 text-lg font-semibold rounded-badge bg-[#EF4E5D] text-white">Get Started</button>
            </form>
        </div>
    );
};

export default ContactBanner;
