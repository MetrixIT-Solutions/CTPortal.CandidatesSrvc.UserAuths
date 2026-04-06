/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const config = require('config');

const eupDaoImpl = require('../daos/daosimpls/EuUserProfileDaosImpl');
const euaDao = require('../daos/EuUserAuthsDaos');
const cs = require('../services/CommonSrvc');
const SetRes = require('../SetRes');
const {pus, puf, opi} = require('../consts/EuUserAuthsConsts.json');
const euadrsDao = require('../daos/EuUserProfileDaos');
const euSrvcImpl = require('./srvcimpls/EuUserAuthsSrvcImpl');
const apiCall = require('../ApiCalls');

const postEUPrflChangePassword = (reqBody, tData, cb) => {
  const qry = eupDaoImpl.getQry(tData.iss);
  if (tData.uc) {
    euaDao.getEndUserDataByID(qry, tData.uc, resObj => {
      if (resObj.status == '200') {
        const pswObj = cs.encryptStr(reqBody.oldPassword, resObj.resData.result.logPswdLav);
        if (pswObj.strHash == resObj.resData.result.logPswd) {
          const genSalt = cs.genSalt(config.mySaltLen);
          const pswObj = cs.encryptStr(reqBody.newPassword, genSalt);
          const updateObj = eupDaoImpl.passwordResetData(pswObj, tData);
          euaDao.eUserUpdateByEId(qry, updateObj, tData.uc, (pwdRes) => {
            if (pwdRes.status == '200') {
              euaDao.eUserUpdate(qry, updateObj, (pwdRes2) => {});
              euSrvcImpl.deleteCanSsn(tData, dsRes => {});
              const sr = SetRes.successRes(pus);
              cb(sr);
            } else SetRes.updateFailed(puf);
          });
        } else {
          const cf = SetRes.invalidPassword(opi);
          cb(cf);
        }
      } else cb(resObj);
    });
  } else {
    euaDao.getEndUserData(qry, resObj => {
      if (resObj.status == '200') {
        const pswObj = cs.encryptStr(reqBody.oldPassword, resObj.resData.result.logPswdLav);
        if (pswObj.strHash == resObj.resData.result.logPswd) {
          const genSalt = cs.genSalt(config.mySaltLen);
          const pswObj = cs.encryptStr(reqBody.newPassword, genSalt);
          const updateObj = eupDaoImpl.passwordResetData(pswObj, tData);
          euaDao.eUserUpdate(qry, updateObj, (pwdRes) => {
            if (pwdRes.status == '200') {
              const sr = SetRes.successRes(pus);
              cb(sr);
            } else SetRes.updateFailed(puf);
          });
        } else {
          const cf = SetRes.invalidPassword(opi);
          cb(cf);
        }
      } else cb(resObj);
    });
  }
}

const putEUprflUpdate = (reqBody, tData, callback) => {  
  const token = tData.tokenData;
  const qry = eupDaoImpl.getPrfQry(token);
  const updateObj = eupDaoImpl.EUprflUpdate(reqBody, token);  
  euadrsDao.EUprflUpdate(qry, updateObj, (resObj) => {    
    if (resObj.status == '200') {
      const qry1 = eupDaoImpl.getQry(token.iss);      
      const updObj = eupDaoImpl.usrUpdObj(reqBody, token);
      const leadUpdObj = eupDaoImpl.leadUpdate(resObj.resData.result, token); //
      euaDao.eUserUpdate(qry1, updObj, (succ) => { });
      euaDao.eUserUpdateByEId(qry1, updObj, token.uc, (resObj2) => { });
      euaDao.leadUpdate(leadUpdObj.query, leadUpdObj.upDat, (leadRes) => {});

      const body = { data: {_id: resObj.resData.result.uid, name: resObj.resData.result.name, mobCcNum: resObj.resData.result.mobCcNum} };
      apiCall.profileSubUpdate(body, tData.ctpeuatoken, (err, resObj3) => {})
      apiCall.profileIntrvwUpdate(body, tData.ctpeuatoken, (err, resObj3) => {})
    }
    callback(resObj);
  });
}

module.exports = {
  postEUPrflChangePassword, putEUprflUpdate
}