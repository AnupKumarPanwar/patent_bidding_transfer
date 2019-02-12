const ipAddress = "http://localhost:4000";
module.exports = {
    register: ipAddress + "/users/register",
    login: ipAddress + "/users/login",
    auction: ipAddress + "/manage/auction",
    fileUpload : ipAddress + "/manage/checkSignature", 
    getPatents : ipAddress + "/manage/getPatents"
}
