import axios from "axios";
import controller from "../controller";

export default {
  submitBid : async (data) => {
    const response = await axios.post(controller.submitBid, data);
    return response;
  }
}