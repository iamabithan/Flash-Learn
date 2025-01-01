/** ****************************** Import libs *********************************** */
import { getRequest } from './actions';
import { URL_CONSTANTS } from './urls';

export const getVideo = (params) =>
  getRequest(URL_CONSTANTS.getVideo, params);

export const getVideoById = (params) =>
  getRequest(URL_CONSTANTS.getVideoById, params);
