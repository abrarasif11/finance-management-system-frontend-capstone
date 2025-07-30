import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center mt-4 lg:mt-10">
      {/* Offer */}
      <section className=" text-white">
        <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold  text-center tracking-wide">
              Our
              <span className="bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
                {" "}
                Mission
              </span>
            </h1>
            <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-white">
              To make financial literacy accessible by equipping individuals
              with intelligent, data-driven tools that help them make better
              financial decisions, save efficiently and invest wisely.
            </p>
          </div>

          <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-green-500">
                Our Goals
              </h3>
              <div className="mt-12 space-y-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium  leading-6 text-white">
                      Enhance Financial Awareness
                    </h4>
                    <p className="mt-2 text-gray-500">
                      Help users understand their spending habits and improve
                      financial literacy.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-green-500 leading-6 text-white">
                      Provide AI-Driven Budgeting
                    </h4>
                    <p className="mt-2 text-gray-500">
                      Automate budget planning based on income, expenses, and
                      financial goals.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-green-500 leading-6 text-white">
                      Predict Future Financial Trends
                    </h4>
                    <p className="mt-2 text-gray-500">
                      Use machine learning to forecast spending patterns and
                      savings potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="mt-10 lg:mt-0">
              <img
                src="src/assets/Men_invest_and_have_made_a_profit_generated.jpg"
                alt=""
                className="mx-auto rounded-lg bg-gray-500 border-green-700 hover:shadow-2xl hover:shadow-green-500"
              />
            </div>
          </div>
          <div>
            <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
              <div className="lg:col-start-2">
                <div className="mt-12 space-y-12">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-green-500 leading-6 text-white">
                        Enable Goal
                      </h4>
                      <p className="mt-2 text-gray-500">
                        Based Financial Planning – Assist users in setting and
                        achieving financial milestones.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-green-500 leading-6 text-white">
                        Encourage Smart Saving & Investments
                      </h4>
                      <p className="mt-2 text-gray-500">
                        Offer personalized recommendations for savings and
                        investment opportunities.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-green-500 leading-6 text-white">
                        Improve Financial Security
                      </h4>
                      <p className="mt-2 text-gray-500">
                        Detect fraud risks and ensure safe money management
                        practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                <img
                  src="src/assets/vecteezy_financial-analysis-data-on-investment-business-results-and_4474438-1.jpg"
                  alt=""
                  className="mx-auto rounded-lg bg-gray-500 border-green-700 hover:shadow-lg hover:shadow-green-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* choose */}
      <div className="">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold  text-center tracking-wide">
              Why
              <span className="bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
                {" "}
                Choose Us!
              </span>
            </h1>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-2 lg:gap-x-8">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <div className="ml-3">
                <dt className="text-lg font-medium text-green-500 text-green-500">
                  User-Friendly Interface –{" "}
                </dt>
                <dd className="mt-2 text-gray-600">
                  {" "}
                  A seamless and intuitive experience for all users.
                </dd>
              </div>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <div className="ml-3">
                <dt className="text-lg font-medium text-green-500">
                  Smart Insights & Analytics –{" "}
                </dt>
                <dd className="mt-2 text-gray-600">
                  Data-driven recommendations for better financial decisions.
                </dd>
              </div>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <div className="ml-3">
                <dt className="text-lg font-medium text-green-500">
                  Secure & Reliable –{" "}
                </dt>
                <dd className="mt-2 text-gray-600">
                  Your financial data is protected with industry-leading
                  security.
                </dd>
              </div>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <div className="ml-3">
                <dt className="text-lg font-medium text-green-500">
                  Customizable Solutions –{" "}
                </dt>
                <dd className="mt-2 text-gray-600">
                  Tailor features to fit your unique financial needs.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
      {/* contact */}
      <div className="text-center py-16">
        <div className="items-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold  text-center tracking-wide">
            Join Us
            <span className="bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
              {" "}
              Today!
            </span>
          </h1>
          <p className="pt-2 mt-5 pb-4">
            Sign up now and start managing your money smarter!
          </p>
          <div className="text-center mt-5 mb-10 space-y-4">
            <p className="text-center flex items-center">
              <span>📩 budgetbuddy@finance.com </span>
            </p>
            <p className="flex items-center">📞 01776621100</p>
            <p className="flex mb-10 items-center">
              🌐 https://finance-management-system-frontend-capstone.vercel.app/
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
