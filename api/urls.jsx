/** ****************************** Import libs *********************************** */

import { verifyUser } from "./create";

const URL_CONSTANTS = {
  login:'/auth/login',
  signUp:'/auth/signup',
  getVideo:'/videos',
  addVideo:'/addvideo',
  getVideoById:'/video/:id',
  userDetail:'/user/',
  getVideoByGrade:'/videos/grade/',
  ytthumbnail:'/thumbnail',
  verifyUser:'verify-admin'
};

export { URL_CONSTANTS };
