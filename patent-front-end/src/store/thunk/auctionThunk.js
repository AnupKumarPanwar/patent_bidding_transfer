import { getActiveAction } from '../actions/auction/ActiveAuctionActions';
import service from '../../services/patentService';

export const activeAuctionThunk = () => {
    return (dispatch) => {
        service.getActiveAuctions().then((res) => {
            console.log(res.data);
            return dispatch(getActiveAction(res.data))
        }).catch((err) => {
            console.error(err);
        })
    };
};