import { key } from "localforage";
import React from "react";
import { json, Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const phone_number = form.phone_number.value;
    const email = form.email.value;
    const password = form.password.value;
    const cpassword = form.cpassword.value;

    const user = {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      cpassword,
    };
    if (password !== cpassword) {
      alert("password did not match");
    }
    console.log(user);
    const response = await fetch(
      "https://api-financial-management-system.vercel.app/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    ).then((res) => res.json()).catch(error =>(console.log(error)));
    console.log(response);
    const regiUser = JSON.stringify(response.user);
    localStorage.setItem("user", regiUser);

    //     createUser(email, password)
    //         .then(result => {
    //             const user = result.user;
    //             console.log(user);
    //             setError('');
    //             form.reset();
    //             handleUpdateUserProfile(name, email, password);

    //             handleEmailVerification();
    //             toast.warning("Please verify your email before login", { autoClose: 800 });
    //         })
    //         .catch(error => {
    //             console.error(error)
    //             setError(error.message)
    //         });
  };

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
              <h2 className="max-w-lg mb-6 font-poppins text-3xl font-bold tracking-tight text-green-500 sm:text-4xl sm:leading-none">
                <span className="text-white">FMS</span>
                <br />
                Register! <br className="hidden md:block" />
                For New Account{" "}
              </h2>
            </div>
            <div className="w-full font-poppins max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white text-black rounded shadow-2xl p-7 sm:p-10">
                <form onSubmit={handleSubmit}>
                  <h3 className="text-4xl font-semibold mb-5">Register Here</h3>
                  <div className="mb-1  sm:mb-2">
                    <label
                      htmlFor="first_name"
                      // className="inline-block mr-[315px] mb-2 font-medium"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      class="block w-full py-3  text-gray-700 bg-white border rounded-lg px-5 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="John"
                    />
                  </div>
                  <div className="mb-1  sm:mb-2">
                    <label
                      htmlFor="first_name"
                      // className="inline-block mr-[315px] mb-2 font-medium"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      class="block w-full py-3  text-gray-700 bg-white border rounded-lg px-5 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Kabir"
                    />
                  </div>

                  <div className="mb-1  sm:mb-2">
                    <label
                      htmlFor="first_name"
                      // className="inline-block mr-[315px] mb-2 font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="john.kabir69@gamil.com"
                    />
                  </div>
                  <div className="mb-1  sm:mb-2">
                    <label
                      htmlFor="first_name"
                      // className="inline-block mr-[315px] mb-2 font-medium"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="8801*********"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      // className="inline-block mr-[290px] mb-2 font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      class="block w-full px-5 py-3 text-gray-700 bg-white border rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="********"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="email"
                      // className="inline-block mr-[290px] mb-2 font-medium"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="cpassword"
                      class="block w-full px-5 py-3 text-gray-700 bg-white border rounded-lg focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="********"
                    />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-badge shadow-md bg-gradient-to-r from-green-500 to-green-800 focus:shadow-outline focus:outline-none"
                    >
                      Register
                    </button>
                    {/* <p className='text-[#DC0000] mt-7 mb-7'> {error}</p> */}
                    <br />
                  </div>
                  <div class="mt-6 text-center ">
                    Already have an account?{" "}
                    <Link to="/login" className="hover:underline">
                      {" "}
                      <span className="text-green-500"> Log In</span>
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

export default Register;
