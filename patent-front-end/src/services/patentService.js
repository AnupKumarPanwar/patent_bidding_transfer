import axios from "axios";
import { controller } from "../controller";

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
            return (res.data);
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
    auctionMyPatent: async function (data) {
        try {
            const res = await axios.post(controller.auctionPatent, { data });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
    searchService: async function (data) {
        try {
            const res = await axios.post(controller.search, { data });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
    getActiveAuctions: async function (data) {
        try {
            const res = await axios.get(controller.getActiveAuctions, { data });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
    getUserActiveAuctions: async function (data) {
        try {
            const res = await axios.post(controller.getUserActiveAuctions, { data });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
    getUserProfile: async function (data) {
        try {
            const res = await axios.post(controller.userProfile, { data });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }
}