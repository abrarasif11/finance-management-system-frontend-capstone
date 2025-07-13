import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setIsLoading(true);
      const res = await login(email, password);
      
      if (res?.statusCode === 200) {
        navigate(`/dashboard/analytics`);
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      toast.error("Please enter valid email or password!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <img
        src="https://res.cloudinary.com/dqvsc6e7e/image/upload/v1752398483/finance-management-system/photo-1642388813992-f12b04ba3db0_ut97q4.jpg"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-gray-900 bg-opacity-75">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-poppins text-3xl font-bold tracking-tight text-green-500 sm:text-4xl sm:leading-none">
                Hi There !
                <br />
                Welcome To
                <br />
                <span className="text-white"> FMS </span>
              </h2>
            </div>
            <div className="w-full font-poppins max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white text-black rounded shadow-2xl p-7 sm:p-10">
                <form onSubmit={handleSubmit}>
                  <h3 className="text-4xl font-semibold mb-5">Log In Here</h3>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      className="inline-block mr-[315px] mb-2 font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="johndoe@example.com"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="password"
                      className="inline-block mr-[290px] mb-2 font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      className="block w-full px-5 py-3 text-gray-700 bg-white border rounded-lg  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="12****"
                    />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-badge shadow-md bg-gradient-to-r from-green-500 to-green-800 focus:shadow-outline focus:outline-none"
                    >
                      {isLoading ? "Logging In..." : "Log In"}
                    </button>
                    {/* <p className='text-[#DC0000] mt-7 mb-7'> {error}</p> */}
                    <br />
                    <button className="w-full">
                      <a
                        href="#"
                        className="flex items-center justify-center px-6 py-3 mt-4 text-white transition-colors duration-300 transform border rounded-badge bg-black"
                      >
                        <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                          <path
                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                            fill="#FFC107"
                          />
                          <path
                            d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                            fill="#FF3D00"
                          />
                          <path
                            d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                            fill="#4CAF50"
                          />
                          <path
                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                            fill="#1976D2"
                          />
                        </svg>
                        <span className="mx-2">Log in with Google</span>
                      </a>
                    </button>
                  </div>
                  <div className="mt-6 text-center">
                    Don’t have an account?{" "}
                    <Link to="/register" className="hover:underline">
                      {" "}
                      <span className="text-green-500"> Register</span>
                    </Link>
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

export default Login;
