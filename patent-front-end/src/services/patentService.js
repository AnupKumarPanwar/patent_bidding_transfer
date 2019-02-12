import axios from "axios";
import controller from "../controller";

export default {
    auction: async function (data) {
        const response = await axios.post(controller.auction, data);
        return response
    },
    fileUpload : function(data){
        axios.post(controller.fileUpload, data).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });   
    }, 
    getMyPatents : async function(data){
        try{
            const res = await axios.post(controller.getPatents, {data});
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
}