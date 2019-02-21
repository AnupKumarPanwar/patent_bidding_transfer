import axios from "axios";
import controller from '../controller';

export default {

    register: async function (data) {
        try {
            const res = await axios.post(controller.register, { data });
            return (res.data);
        } catch (err) {
            console.log(err);
        }

    },

    login: async function (data) {
        try {
            const res = await axios.post(controller.login, { data });
            return (res.data);
        }
        catch (err) {
            console.log(err);
        }
    }


}
