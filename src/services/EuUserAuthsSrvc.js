/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const config = require('config');

const {passportData, otpData} = require('../consts/EuUserAuthsConsts.json');
const {strObj} = require('../consts/dbcoll.json');
const euaDao = require('./../daos/EuUserAuthsDaos');
const euaDaoImpl = require('./../daos/daosimpls/EuUserAuthsDaosImpl');
const euSrvcImpl = require('./srvcimpls/EuUserAuthsSrvcImpl');
const cs = require('./CommonSrvc');
const SetRes = require('../SetRes');
const logger = require('../lib/logger');

const postEUAuthLogin = (req, res, next, passport, devInfo, callback) => {
  require('../passport')(passport);
  passport.authenticate('ctp-end-user-local-login', (resObj) => {
    try {
      if(resObj.status === '200') {
        const uid = req.body.userID ? req.body.userID.substring(0, 2) : null;
        const uc = strObj[uid] || strObj[req.body.userID[0]] || 25;
        euSrvcImpl.setEndUsrLoginRes(resObj.resData.result, uc, res, req.ip, devInfo, callback);
      } else callback(resObj);
    } catch (error) {
      logger.error('Unknown Error in services/EuUserAuthsSrvc.js, at postEUAuthLogin(catch):' + error);
      const uke = SetRes.unKnownErr('Unknown Error');
      callback(uke);
    }
  })(req, res, next);
}
const passportVerifyEUserAuthLogin = (userData, password, devInfo, callback) => {
  const au = euSrvcImpl.validateEndUserStatus(userData, devInfo);
  if(au.status === '200') {
    const pswdObj = cs.encryptStr(password, userData.logPswdLav);
    if (pswdObj.strHash === userData.logPswd) {
      const ls = SetRes.successRes(userData);
      callback(ls);
    } else {
      const ic = SetRes.invalidPassword(passportData.invalidPswd);
      callback(ic);
    }
  } else callback(au);
}

const postEUAuthFPSendOtp = (reqBody, ip, devInfo, res, callback) => {
  const query = euaDaoImpl.setLoginQuery(reqBody);
  const uid = reqBody.userID ? reqBody.userID.substring(0, 2) : null;
  const uc = strObj[uid] || strObj[reqBody.userID[0]] || 25;
  const qry = euaDaoImpl.snQry(reqBody);
  euaDao.getEuClsdSSsnData(qry, sRes => {
    if(sRes.status == '200') {
      if (sRes.resData.result.ipa == ip || sRes.resData.result.ipa ==  devInfo.ip) {
        euaDao.getEndUserDataByID(query, uc, uResObj => {
          if(uResObj.status == '200') {
            validateUser(uResObj, reqBody, query, uc, devInfo, res, callback);
          } else if (uResObj.status == '204') {
            euaDao.getEndUserData(query, ursRes => {
              if(ursRes.status == '200') {
                validateUser(ursRes, reqBody, query,  '', devInfo, res, callback);
              } else if (ursRes.status == '204') {
                const nf = SetRes.invalidCredentials(passportData.userNotExist);
                callback(nf);
              } else callback(ursRes);
            });
          } else callback(uResObj);
        });
      } else {
        const fe = SetRes.forgotErrMsg();
        callback(fe);
      }
    } else callback(sRes);
  });
}

const postEUAuthFPVerfOtp = (reqBody, tData, res, callback) => {
  euSrvcImpl.euVerifyOtp(tData, reqBody.otp, res, callback);  
}

const postEUAuthResetPassword = (reqBody, tData, callback) => {
  if(tData.os === otpData.osVerified) {
    const genSalt = cs.genSalt(config.mySaltLen);
    const pswObj = cs.encryptStr(reqBody.password, genSalt);
    const updateObj = euaDaoImpl.passwordResetData(pswObj, tData);
    const query = euaDaoImpl.getQry(tData.iss);
    if (tData.uc) {
      euaDao.eUserUpdateByEId(query, updateObj, tData.uc, resObj => {
        if (resObj.status == '200') {
          euaDao.eUserUpdate(query, updateObj, resObj => {});
          euSrvcImpl.deleteCanSsn(tData, dsRes => {});
          const ls = SetRes.successRes({rpMessage: otpData.rps});
          callback(ls);
        } else callback(resObj);
      });
    } else {
      euaDao.eUserUpdate(query, updateObj, resObj => {
        if (resObj.status == '200') {
          euSrvcImpl.deleteCanSsn(tData, dsRes => {});
          const ls = SetRes.successRes({rpMessage: otpData.rps});
          callback(ls);
        } else callback(resObj);
      });
    }
  } else callback(SetRes.otpVerFailed({otpMessage: otpData.ovf}));
}

const postEUAuthLogout = (tData, callback) => {
  const qry = euaDaoImpl.getQry(tData.at);
  const upObj = euaDaoImpl.setSnUpdate(tData);
  euaDao.deleteSsndata(qry, delRes => {
    euaDao.updateSsnClsdData(qry, upObj, callback);
  });
}

const postEuUpdatePassword = (reqBody, res, ip, callback) => {
  const qry = euaDaoImpl.getQry(reqBody.refId);
  euaDao.getSsndata(qry, (resObj) => {
    if (resObj.status == '200') {
      const data = resObj.resData.result;
      const cDate = data.cDtStr;
      const curnDtm = cs.currUTCObj().currUTCDtTmStr;
      const diff = dateDifference(curnDtm, cDate);
      if (diff) {
        euSrvcImpl.euUpdatePassword(qry, reqBody, data, res, ip, callback);
      } else {
        euaDao.deleteSsndata(qry, (resObj1) => {});
        callback(SetRes.sessionExpired());
      }
    } else if(resObj.status === '204') callback(SetRes.sessionExpired());
    else callback(resObj);
  });
}

const getEuUserSsn = (tokenData, callback) => {
  const snQry = euaDaoImpl.getQry(tokenData.at);
  euaDao.getSsndata(snQry, ssnRes => {
    if (ssnRes.status == '200') {
      const qry = euaDaoImpl.getQry(tokenData.iss);
      euaDao.getEndUserData(qry, usrRes => {
        if (usrRes.status == '200') {
          const userData = euaDaoImpl.setEuData(usrRes.resData.result);
          const result = SetRes.successRes(userData);
          callback(result);
        } else callback(usrRes);
      });
    } else callback(ssnRes);
  });
}

const getEuSsn = (tokenData, callback) => {
  const snQry = euaDaoImpl.getQry(tokenData.at);
  euaDao.getSsndata(snQry, callback);
}

module.exports = {
  postEUAuthLogin, passportVerifyEUserAuthLogin, postEUAuthFPSendOtp, postEUAuthFPVerfOtp,
  postEUAuthResetPassword, postEUAuthLogout, postEuUpdatePassword, getEuUserSsn, getEuSsn
};

const validateUser = (uData, reqBody, query, uc, devInfo, res, callback) => {
  const au = euSrvcImpl.validateEndUserStatus(uData?.resData?.result, devInfo);
  if(au.status === '200') {
    const tData = { iss: uData?.resData?.result._id, fn: uData?.resData?.result.fName, ln: uData?.resData?.result.lName};
    euSrvcImpl.eUserOtpUpdate(reqBody, query, tData, uc, res, callback);
  } else callback(au);
}

const dateDifference = (date1, date2) => {
  const time1 = new Date(date1).getTime();
  const time2 = new Date(date2).getTime();
  const differenceInMs = Math.abs(time1 - time2);
  const differenceInHours = differenceInMs / (1000 * 60 * 60);
  return differenceInHours < 24;
}
