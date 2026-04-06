/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var LocalStrategy = require('passport-local').Strategy;

const euaDao = require('./daos/EuUserAuthsDaos');
const euaDaoImpl = require('./daos/daosimpls/EuUserAuthsDaosImpl');
const euaSrvc = require('./services/EuUserAuthsSrvc');
const SetRes = require('./SetRes');
const {passportData} = require('./consts/EuUserAuthsConsts.json');
const {strObj} = require('./consts/dbcoll.json');

// --- Begining of passport
module.exports = (passport) => {
  passport.use('ctp-end-user-local-login', new LocalStrategy({
    usernameField: 'userID',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, userID, password, callback) => {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    eUserAuthLogin(req.body, devInfo, callback);
  }));
};
// --- End of passport

/**
 * @param {Object} reqBody - request body object
 * @param {Function} callback - callback function
 */
const eUserAuthLogin = (reqBody, devInfo, callback) => {
  const uid = reqBody.userID ? reqBody.userID.substring(0, 2) : null;
  const uc = strObj[uid] || strObj[reqBody.userID[0]] || 25;
  const query = euaDaoImpl.setLoginQuery(reqBody);
  euaDao.getEndUserDataByID(query, uc, (resObj) => {
    if(resObj.status == '200') {
      euaSrvc.passportVerifyEUserAuthLogin(resObj.resData.result, reqBody.password, devInfo, callback);
    } else if (resObj.status == '204') {
      euaDao.getEndUserData(query, (resObj1) => {
        if(resObj1.status == '200') {
          euaSrvc.passportVerifyEUserAuthLogin(resObj1.resData.result, reqBody.password, devInfo, callback);
        } else if (resObj1.status == '204') {
          const ic = SetRes.invalidCredentials(passportData.userNotExist);
          callback(ic);
        } else {
          callback(resObj1);
        }
      });
    } else {
      callback(resObj);
    }
  });
}
