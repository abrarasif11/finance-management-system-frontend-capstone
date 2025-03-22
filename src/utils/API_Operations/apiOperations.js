import axios from "axios";
import toast from "react-hot-toast";

export const deleteRecord = async (API_URL) => {
  try {
    const res = await axios.delete(API_URL);
    if (res.status === 200) {
      console.log("Deleted Successfully!");
      toast.success("Deleted Successfully!", {
        position: "top-right",
        duration: 2000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
