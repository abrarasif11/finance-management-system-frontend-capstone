import React from 'react';

const UserModal = () => {
        const { name, price } = singleCategories;
    console.log(singleCategories);
    const { user } = useContext(AuthContext);
    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const price = form.price.value;
        const number = form.number.value
        const meeting = form.meeting.value;
        const formValue = { name, email, meeting, number,price };
        console.log(formValue);
        if (user?.uid) {
            fetch("https://java-bakery-shop-server.vercel.app/items", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formValue),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.acknowledged) {
                        setSingleCategories(null)
                        toast.success("Order Confirm Successfully");
                    }
                })
                .catch((err) => console.log(err));
        } else {
            toast.error("Please login first to confirm order");
        }
    }
        return (
                <>
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box font-josefin relative">
                    <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking} className='grid grid-cols-1  gap-3 mt-10'>
                        <input name='model' type="model" disabled value={name} className="input w-full input-bordered" />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Your Email" className="input w-full input-bordered" />
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name='price' type="model" disabled value={price} className="input w-full input-bordered" />
                        <input name='number' type="text" placeholder="Contact Number" className="input w-full input-bordered" />
                        <input name='meeting' type="text" placeholder="Order Location" className="input w-full input-bordered" />
                        <br />
                        <input className='bg-[#DC0000] px-2 py-2 rounded font-semibold text-black w-full ' type="Submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
        );
};

export default UserModal;