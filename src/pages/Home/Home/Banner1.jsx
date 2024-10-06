
const Banner1 = () => {
    return (
        <div>
            <section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leadi sm:text-6xl">Ac mattis
                            <span className="dark:text-violet-400">senectus</span>erat pharetra
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer

                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <a rel="noopener noreferrer" href="#" className="px-9 py-3 text-lg font-semibold rounded-badge bg-[#3D3CF9] text-white">Log In</a>
                            <a rel="noopener noreferrer" href="#" className="px-9 py-3 bg-[#DFE2E7] text-lg rounded-badge font-semibold rounded border-gray-100">Get In Touch</a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-96 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img src="/src/assets/photo-1434626881859-194d67b2b86f.png" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner1;