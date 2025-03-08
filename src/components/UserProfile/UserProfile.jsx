import React from "react";
import MyProfile from "./MyProfile/MyProfile";
import Information from "../Information/Information";
import Address from "../Address/Address";
// import UserModal from "../UserModal/UserModal";

const UserProfile = () => {
  return (
    <div>
      <h1 className="mt-10 mb-5 ml-6">My Profile </h1>
      <div></div>
      <div className="mb-10">
        <MyProfile />
      </div>
      <div className="mb-10">
        <Information/>
      </div>
      <div className="mb-10">
        <Address />
      </div>
    </div>
  );
};

export default UserProfile;
