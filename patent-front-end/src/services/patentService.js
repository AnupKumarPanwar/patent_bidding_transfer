import axios from "axios";
import controller from "../controller";

export default {
    auction: async function (data) {
        const response = await axios.post(controller.auction, data);
        return response
    },
    fileUpload: async function (data) {
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
    },
    getMyPatents: async function (data) {
        try {
            const res = await axios.post(controller.getPatents, { data });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
    auctionMyPatent : async function(data){
        try {
            const res = await axios.post(controller.auctionPatent, {data});
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
}