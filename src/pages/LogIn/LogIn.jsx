import { Link } from "react-router-dom";

const LogIn = () => {
    
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
                <h2 className="max-w-lg mb-6 font-poppins text-3xl font-bold tracking-tight text-[#3D3CF9] sm:text-4xl sm:leading-none">
                  Hi There !
                  <br />
                  Welcome To
                  <br />
                  <span className='text-white'>  FMS{' '}</span>
  
                </h2>
  
  
              </div>
              <div className="w-full font-poppins max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-[#DFE2E7] text-[#3D3CF9] rounded shadow-2xl p-7 sm:p-10">
  
                  <form >
  
                    <h3 className='text-4xl font-semibold mb-5'>Log In Here</h3>
                    <div className="mb-1  sm:mb-2">
                      <label
                        htmlFor="firstName"
                        className="inline-block mr-[315px] mb-2 font-medium"
                      >
                        Email
                      </label>
                      <input type="email" id='email' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                    </div>
  
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="email"
                        className="inline-block mr-[290px] mb-2 font-medium"
                      >
                        Password
                      </label>
                      <input type="password" id='password' className="block w-full px-5 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-badge shadow-md hover:bg-gray-400 hover:text-black bg-[#3D3CF9] focus:shadow-outline focus:outline-none"
                      >
                        Log In
                      </button>
                      <br />
                      <button  className=' w-full'>
                        <a href="#" className="flex items-center justify-center px-6 py-3 mt-4 text-[#3D3CF9] transition-colors duration-300 transform border rounded-badge dark:border-gray-700 hover:text-black bg-gray-50 dark:hover:bg-gray-600">
                          <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                            <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                            <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                          </svg>
  
                          <span className=" mx-2">Log in with Google</span>
                        </a>
                      </button>
                      {/* <p className='text-[#DC0000] mt-7 mb-7'> {error}</p> */}
                    </div>
                    <div className="mt-6 text-center ">
  
                      Don’t have an account? <Link to='/register' className='hover:underline'> <span className='text-white'> Register</span></Link>
  
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

export default LogIn;