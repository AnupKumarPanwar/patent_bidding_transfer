import axios from "axios";
import controller from "../controller";

export default {
    auction: async function (data) {
        const response = await axios.post(controller.auction, data);
        console.log(response);
    },
    fileUpload : async function(data){
        // console.log(data)
        const response = await axios.post(controller.fileUpload, data);
        console.log(response);
    }
}