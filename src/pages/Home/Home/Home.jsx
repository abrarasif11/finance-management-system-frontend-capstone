import Features from "../../../components/Features/Features";
import Workflow from "../../../components/Workflow/Workflow";
import Banner2 from "./Banne2";
import Banner1 from "./Banner1";
import ContactBanner from "./ContactBanner";
import Feedback from "./Feedback/Feedback";
import Pricing from "../../Pricing/Pricing";

const Home = () => {
  return (
    <div>
      <Banner1 />
      <Features/>
      {/* <Banner2 /> */}
      <Workflow/>
      <Pricing/>
      <Feedback />
      {/* <ContactBanner /> */}
    </div>
  );
};

export default Home;
