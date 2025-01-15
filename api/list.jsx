/** ****************************** Import libs *********************************** */
import { getRequest } from './actions';
import { URL_CONSTANTS } from './urls';

export const getVideo = (params) =>
  getRequest(URL_CONSTANTS.getVideo, params);
export const getVideoById = (params) =>
  getRequest(URL_CONSTANTS.getVideoById, params);
export const getUserDetailById = (id) =>
  getRequest(URL_CONSTANTS.userDetail+id);
export const getAllUsers = (params) =>
  getRequest(URL_CONSTANTS.userDetail,params);
export const getVideosByGrade = (grade) =>
  getRequest(URL_CONSTANTS.getVideoByGrade+grade);
