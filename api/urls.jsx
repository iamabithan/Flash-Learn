/** ****************************** Import libs *********************************** */

import { verifyUser } from "./create";

const URL_CONSTANTS = {
  login:'/auth/login',
  signUp:'/auth/signup',
  getVideo:'/videos',
  addVideo:'/addvideo',
  getVideoById:'/video/:id',
  getRelaxVideoByGrade:'/videos/relax/grade/',
  deleteUser:'/user/delete/',
  userDetail:'/user/',
  getVideoByGrade:'/videos/grade/',
  ytthumbnail:'/thumbnail',
  verifyUser:'verify-admin',
  allRelaxVideo:'fetchRelaxVideos',
  addRelax:'/add/relax/video',
  createAdmin:'/create-admin',
  
};

export { URL_CONSTANTS };
