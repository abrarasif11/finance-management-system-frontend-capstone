import React from 'react'
import { features } from "../../constants/items";
const Features = () => {
  return (
    <div className="mx-auto w-lg relative mt-20 border-b border-neutral-800 min-h-[800px]">
    <div className="text-center">
      <span className="bg-neutral-900 text-green-500 rounded-full h-6 text-xl font-medium px-2 py-1 uppercase">
       Our Services
      </span>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mt-10 lg:mt-20 tracking-wide">
      Smart Features {" "}
        <span className="bg-gradient-to-r from-green-500 to-green-800 text-transparent bg-clip-text">
        for Smarter Finances!
        </span>
      </h2>
    </div>
    <div className="flex flex-wrap mt-10 lg:mt-20">
      {features.map((feature, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
          <div className="flex">
            <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-green-500 justify-center items-center rounded-full">
              {feature.icon}
            </div>
            <div>
              <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
              <p className="text-md p-2 mb-20 text-neutral-500">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Features;
