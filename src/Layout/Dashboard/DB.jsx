import React from "react";
import DBHeaderBox from "./DBHeaderBox";

const Home = () => {
  const loggedIn = { firstName: "Asif" };
  return (
    <section className="home">
      <div className="home-content">
       <header className="home-header">
        <DBHeaderBox
        type="greeting"
        title="Welcome"
        user={loggedIn?.firstName || 'Guest'}
        subtext="Access and manage your account and transaction efficiency."
        />
       </header>
      </div>
    </section>
  );
};

export default Home;
