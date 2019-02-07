import axios from "axios";
import controller from "../controller";

export default {
    auction: async function (data) {
        const response = await axios.post(controller.auction, data);
        console.log(response);
    },
    fileUpload : async function(data){
        
        // console.log(data)
        var res = axios.post(controller.fileUpload, data);
        return res;
        
    },
    registerPatent: async function (data) {
        try {
            const res = await axios.post(controller.registerPatent, { data });
            return (res.data.message);
        }
        catch (err) {
            console.log(err);
        }
    }
}