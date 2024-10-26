import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="relative">
        <img
            src="/src/assets/photo-1642388813992-f12b04ba3db0.jpeg"
            className="absolute inset-0 object-cover w-full h-full"
            alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-75">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="flex flex-col items-center justify-between xl:flex-row">
                    <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                        <h2 className="max-w-lg mb-6 font-poppins text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                            <span className='text-white'>FMS</span>
                            <br />
                            Register! <br className="hidden md:block" />
                            For New Account {' '}

                        </h2>
                    </div>
                    <div className="w-full font-poppins max-w-xl xl:px-8 xl:w-5/12">
                        <div className="bg-[#DFE2E7] text-white rounded shadow-2xl p-7 sm:p-10">

                            <form >
                                <h3 className='text-4xl font-semibold mb-5'>Register Here</h3>
                                <div className="mb-1  sm:mb-2">
                                    <label
                                        htmlFor="firstName"
                                        className="inline-block mr-[315px] mb-2 font-medium"
                                    >
                                        Name
                                    </label>
                                    <input type="text" id='name' class="block w-full py-3  text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Name" />
                                </div>
                                <div className="mb-1  sm:mb-2">
                                    <label
                                        htmlFor="firstName"
                                        className="inline-block mr-[315px] mb-2 font-medium"
                                    >
                                        PhotoURL
                                    </label>
                                    <input type="text" id='photoURL' class="block w-full py-3  text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Image Link" />
                                </div>
                                <div className="mb-1  sm:mb-2">
                                    <label
                                        htmlFor="firstName"
                                        className="inline-block mr-[315px] mb-2 font-medium"
                                    >
                                        Email
                                    </label>
                                    <input type="email" id='email' class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                                </div>

                                <div className="mb-1 sm:mb-2">
                                    <label
                                        htmlFor="email"
                                        className="inline-block mr-[290px] mb-2 font-medium"
                                    >
                                        Password
                                    </label>
                                    <input type="password" id='password' class="block w-full px-5 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                                </div>
                                <div className="mt-4 mb-2 sm:mb-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-badge shadow-md hover:bg-[#DFE2E7] hover:text-black bg-[#3D3CF9]  focus:shadow-outline focus:outline-none"
                                    >
                                        Register
                                    </button>
                                    {/* <p className='text-[#DC0000] mt-7 mb-7'> {error}</p> */}
                                    <br />

                                </div>
                                <div class="mt-6 text-center ">

                                    Already have an account? <Link to='/login' className='hover:underline'> <span className='text-[#3D3CF9]'> Log In</span></Link>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Register;