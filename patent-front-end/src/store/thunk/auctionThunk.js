import { getActiveAction } from '../actions/auction/ActiveAuctionActions';
import service from '../../services/patentService';

export const activeAuctionThunk = (data) => {
    return (dispatch) => {
        service.getUserActiveAuctions(data).then((res) => {
    
            return dispatch(getActiveAction(res.data))
        }).catch((err) => {
            console.error(err);
        })
    };
};

