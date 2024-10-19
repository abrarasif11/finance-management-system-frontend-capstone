import React from 'react';

const Feedbacks = ({feedback}) => {
    return (
        <section className="py-6 dark:bg-gray-800 dark:text-gray-100">
			<div className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 dark:bg-gray-100 dark:text-gray-800">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-gray-500" src={feedback.img} />
				<div className="flex-1 my-4">
					<p className="text-xl font-semibold leadi">{feedback.name}</p>
					<p>{feedback.review}</p>
				</div>			
			</div>	
</section>
    );
};

export default Feedbacks;