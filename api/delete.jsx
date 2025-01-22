/** ****************************** Import libs *********************************** */
import { deleteRequest} from './actions';
import { URL_CONSTANTS } from './urls';

export const deleteUserData = (userId) =>
    deleteRequest(URL_CONSTANTS.deleteUser+ userId);