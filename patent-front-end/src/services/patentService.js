import axios from "axios";
import controller from "../controller";

export default {
    auction: async function (data) {
        const response = await axios.post(controller.auction, data);
        console.log(response);
    },
    fileUpload : function(data){
        
        console.log(data)
        axios.post(controller.fileUpload, data).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
        
    }
}