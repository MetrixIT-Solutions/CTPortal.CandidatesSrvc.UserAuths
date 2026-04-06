/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const config = require('config');

const cs = require('../CommonSrvc');
const euaDao = require('../../daos/EuUserAuthsDaos');
const euaDaoImpl = require('../../daos/daosimpls/EuUserAuthsDaosImpl');
const sendMail = require('../../../config/mail');
const SetRes = require('../../SetRes');
const tokens = require('../../tokens');
const {passportData, otpData, emailData} = require('../../consts/EuUserAuthsConsts.json');

const setEndUsrLoginRes = (uResObj, uc, res, ip, devInfo, callback) => {
  const ssnObj = euaDaoImpl.euSsnCreate(uResObj, ip, devInfo);
  euaDao.createCommonData(ssnObj.ssnData, resObj => {
    if(resObj.status == '200') {
      euaDao.createCommonData(ssnObj.ssncData, resObj => {});
      const uData = {...uResObj.toObject(), at: resObj.resData.result.atoken, ip: ip || devInfo.ip};
      tokens.tokenGeneration(uData, uc, res, token => {
        if (token) {
          if (uResObj.uStatus === passportData.op) {
            const uObj = euaDaoImpl.setEuData(uResObj);
            const ls = SetRes.successRes(uObj);
            callback(ls);
          } else {
            const qry = euaDaoImpl.usrPrfQry(uResObj._id);
            euaDao.getUserPrfData(qry, uRes => {
              if(uRes.status == '200') {
                const uObj = euaDaoImpl.setEuData(uRes.resData.result);
                const ls = SetRes.successRes(uObj);
                callback(ls);
              } else {
                const uke = SetRes.unKnownErr({});
                callback(uke);
              }
            });
          }
        } else {
          const uke = SetRes.unKnownErr({});
          callback(uke);
        }
      });
    } else {
      const sgf = SetRes.sessionGenFailed();
      callback(sgf);
    }
  });
}

const validateEndUserStatus = (uObj, devInfo) => {
  // const isIp = uObj.alwdIPs.some(item => item == devInfo.ip);
  // if (isIp) {
  //   const inip = SetRes.invalidIp();
  //   return inip;
  // } else
  if(uObj.uStatus === passportData.active || uObj.uStatus === passportData.op) {
    return {status: '200'};
  } else if(uObj.uStatus === passportData.blocked) {
    const bAcc = SetRes.accBlocked();
    return bAcc;
  } else if(uObj.uStatus === passportData.hold) {
    const hAcc = SetRes.accHold();
    return hAcc;
  } else if(uObj.uStatus === passportData.inactive) {
    const iaAcc = SetRes.accInactive();
    return iaAcc;
  } else {
    const invd = SetRes.invalidStatus(passportData.statusErr);
    return invd;
  }
}

const eUserOtpUpdate = (reqBody, query, tData, uc, res, callback) => {
  const otp = cs.randomStrGen(otpData.numStr, 6);
  const genSalt = cs.genSalt(config.mySaltLen);
  const pswObj = cs.encryptStr(otp, genSalt);
  if (pswObj && pswObj.strHash) {
    const updateObj = euaDaoImpl.setB2bUserOtpData(pswObj, tData);
    if (uc) {
      euaDao.eUserUpdateByEId(query, updateObj, uc, (otpRes) => {
        setOtpTokenData(otpRes, reqBody.userID, otp, uc, res, callback);
      });
    } else {
      euaDao.eUserUpdate(query, updateObj, (otpRes) => {
        setOtpTokenData(otpRes, reqBody.userID, otp, '', res, callback);
      });
    }
  } else {
    const of = SetRes.otpFailedRes({otpMessage: otpData.otf});
    callback(of);
  }
}

const euVerifyOtp = (tData, otpNumber, res, callback) =>  {
  const query = euaDaoImpl.getQry(tData.iss);
  if (tData.uc) {
    euaDao.getEndUserDataByID(query, tData.uc, (userObj) => {
      setVefOtp(userObj, query, tData, otpNumber, tData.uc, res, callback);
    });
  } else {
    euaDao.getEndUserData(query, (userObj) => {
      setVefOtp(userObj,query, tData, otpNumber, '', res, callback);
    });
  }
}

const euUpdatePassword = (query, reqBody, ssnData, res, ip, callback) => {
  const qry = euaDaoImpl.getUserDataQry(ssnData.uid);
  const genSalt = cs.genSalt(config.mySaltLen);
  const pswObj = cs.encryptStr(reqBody.password, genSalt);
  const updateObj = euaDaoImpl.passwordUpdate(pswObj, ssnData.uid, ip);
  euaDao.eUserUpdate(qry, updateObj, (resObj) => {
    if(resObj.status == '200') {
      euaDao.deleteSsndata(query, (resObj1) => {});
      euaDao.eUserUpdateByEId(qry, updateObj, resObj.resData.result.ucNum, (resObj2) => {});
    } 
    callback(resObj);
  });
  //  => {
  //   if (resObj1.status == '200') {
  //     const uData = { ...resObj1.resData.result.toObject(), at: ssnData.atoken, ip };
  //     const uc = '';
  //     // tokens.tokenGeneration(uData, uc, res, token => {
  //     //   if (token) {
  //     //     const uObj = euaDaoImpl.setEuData(resObj1.resData.result);
  //     //     const ls = SetRes.successRes(uObj);
  //     //     callback(ls);
  //     //   } else {
  //     //     const uke = SetRes.unKnownErr({});
  //     //     callback(uke);
  //     //   }
  //     // });
  //   } else
  //    callback(SetRes.updateFailed());
  // });
}

const deleteCanSsn = (tData, callback) => {
  const query = euaDaoImpl.usrPrfQry(tData.iss);
  euaDao.deleteEndUserSsn(query, callback);
}

module.exports = {
  setEndUsrLoginRes, validateEndUserStatus, eUserOtpUpdate, euVerifyOtp, euUpdatePassword, deleteCanSsn
};

const setOtpTokenData = (otpRes, userID, otp, uc, res, callback) => {
  if (otpRes.status == '200') {
    const otpResult = otpRes.resData.result;
    const token = tokens.otpTokenGeneration(otpResult, uc, otpData.otforgot, otpData.osNVerified, res);
    if(token) {
      sendOtpToEmail(userID, otp);
      console.log('=======otp', otp);
      const or = SetRes.otpSendRes({otpMessage: otpData.otpMsg});
      callback(or);
    } else {
      const of = SetRes.otpFailedRes({otpMessage: otpData.otf});
      callback(of);
    }
  } else {
    const of = SetRes.otpFailedRes({otpMessage: otpData.otf});
    callback(of);
  }
}

const sendOtpToEmail = (email, otpNumber) => {
  sendMail.sendEMail(email, emailData.mailSub, `${emailData.mailMsg01}${otpNumber}${emailData.mailMsg02}`, (resObj) => {});
}

const setVefOtp = (userObj, query, tData, otpNumber, uc, res, callback) => {
  if (userObj.status == '200') {
    const pswObj = cs.encryptStr(otpNumber, userObj.resData.result.otpLav);
    if (pswObj.strHash == userObj.resData.result.otp) {
      const token = tokens.otpTokenGeneration(userObj.resData.result, uc, otpData.otReset, otpData.osVerified, res);
      if (token) {
        const updateObj = euaDaoImpl.setB2bUserOtpData({otp: '', otpLav: ''}, tData);
        if (tData.uc) {
          euaDao.eUserUpdateByEId(query, updateObj, tData.uc, (otpRes) => {
            const ov = SetRes.otpVerified({otpMessage: otpData.ovs});
            callback(ov);
          });
        } else {
          euaDao.eUserUpdate(query, updateObj, (otpRes) => {
            const ov = SetRes.otpVerified({otpMessage: otpData.ovs});
            callback(ov);
          });
        }
      } else {
        const of = SetRes.otpVerFailed({otpMessage: otpData.ovf});
        callback(of);
      }
    } else {
      const of = SetRes.otpVerFailed({otpMessage: otpData.pco});
      callback(of);     
    }
  } else {
    const of = SetRes.otpVerFailed({otpMessage: otpData.ovf});
    callback(of);    
  }
}