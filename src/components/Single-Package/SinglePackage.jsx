import React from 'react'

const SinglePackage = () => {
  return (
        <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
        <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-[#EF4E5D] text-gray-50">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Efficient</h4>
            <span className="text-6xl font-bold">
              $24
              <span className="text-sm tracking-wide">/month</span>
            </span>
          </div>
          <p className="leading-relaxed">
            Morbi cursus ut sapien sit amet consectetur.
          </p>
          <ul className="flex-1 space-y-2">
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-shrink-0 w-6 h-6 text-[#21304E] "
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Everything in Free</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-shrink-0 w-6 h-6 text-[#21304E]"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Phasellus tellus</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-shrink-0 w-6 h-6 text-[#21304E]"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Praesent faucibus</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-shrink-0 w-6 h-6 text-[#21304E]"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Aenean et lectus blandit</span>
            </li>
          </ul>
          <a
            rel="noopener noreferrer"
            href="#"
            className="inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded bg-gray-100 text-[#21304E]"
          >
            Get Started
          </a>
        </div>
      </div>
  )
}

export default SinglePackage
