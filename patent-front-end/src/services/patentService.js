import axios from "axios";
import controller from "../controller";

export default {
    auction: async function (data) {
        const response = await axios.post(controller.auction, data);
        return response
    },
    getMyPatents : async function(data){
        try{
            const res = await axios.post(controller.getPatents, {data});
            return res.data;
        }catch(err){
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