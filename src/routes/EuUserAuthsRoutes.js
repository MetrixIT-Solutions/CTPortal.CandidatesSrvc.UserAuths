/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const eua = require('../controllers/EuUserAuthsCtrl');

module.exports.controller = (app, passport) => {

  app.get('/', eua.apiServerStatus);

  app.post('/ctpcust/v1/end/users/auth-login', (req, res, next) => eua.postEUAuthLogin(req, res, next, passport));
  app.post('/ctpcust/v1/end/users/forgot/send/otp', eua.postEUAuthFPSendOtp);
  app.post('/ctpcust/v1/end/users/forgot/verify/otp', eua.postEUAuthFPVerfOtp);
  app.post('/ctpcust/v1/end/users/reset/password', eua.postEUAuthResetPassword);
  app.post('/ctpcust/v1/end/users/auth-logout', eua.postEUAuthLogout);
  app.post('/ctpcust/v1/end/users/update-password', eua.postEuUpdatePassword);

  app.post('/ctpcust/v1/end/users/auth-user/session', eua.postEuUserAuthUserSession);

};
