/** ****************************** Import libs *********************************** */
import { postRequest } from './actions';
import { URL_CONSTANTS } from './urls';

export const postLoginRequestData = (params) =>
  postRequest(URL_CONSTANTS.login, params);
export const postSignUpnRequestData = (params) =>
    postRequest(URL_CONSTANTS.signUp, params);
export const postAddVideo = (params) =>
    postRequest(URL_CONSTANTS.addVideo, params);
export const verifyUser = (params) =>
  postRequest(URL_CONSTANTS.verifyUser, params);
export const getYtThumbnail = (urls) =>
  postRequest(URL_CONSTANTS.ytthumbnail, { urls }); // Send 'urls' directly as the payload


 