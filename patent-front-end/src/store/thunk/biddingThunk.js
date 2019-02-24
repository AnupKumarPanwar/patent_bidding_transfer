import service from "../../services/biddingService";

export const submitBid = (data) => {
  return (dispatch)=>{
    service.submitBid(data).then(res=>{
      return res
    })
  }
}