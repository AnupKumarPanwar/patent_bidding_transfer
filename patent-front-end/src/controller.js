export const ipAddress = "http://3.84.234.224:4000";
export const controller = {
    register: ipAddress + "/users/register",
    login: ipAddress + "/users/login",
    auctionPatent: ipAddress + "/auction/setAuction",
    fileUpload: ipAddress + "/manage/checkSignature",
    getPatents: ipAddress + "/manage/getPatents",
    registerPatent: ipAddress + "/manage/registerPatent",
    search: ipAddress + "/manage/search",
    getActiveAuctions: ipAddress + "/auction/getActiveAuctions",
    getUserActiveAuctions: ipAddress + "/auction/getUserActiveAuctions",
    submitBid: ipAddress + "/bidding/bidForPatent",
    userProfile: ipAddress + "/users/userProfile",
    getPatent: ipAddress + "/manage/getPatent"
}