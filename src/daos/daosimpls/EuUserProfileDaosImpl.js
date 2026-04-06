/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const {uType} = require('../../consts/EuUserAuthsConsts.json')
const cs = require('../../services/CommonSrvc');
const moment = require('moment');

const getQry = (_id) => {
  return {delFlag: false, _id};
}
const passwordResetData = (pwdObj, tData) => {
  const currentUTC = cs.currUTCObj();
  return {
    logPswd: pwdObj.strHash,
    logPswdLav: pwdObj.salt,
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  };
}

const getPrfQry = (tData) => {
  return {delFlag: false, uid: tData.iss};
}

const  EUprflUpdate = (reqBody, tData) => {
  const currentUTC = cs.currUTCObj();
  const dobStr = moment(reqBody.dob).format('YYYY-MM-DD');  
  return {
    name: reqBody.fName + ' ' + reqBody.lName,
    sName : reqBody.sName || '',
    fName: reqBody.fName,
    lName: reqBody.lName,
    mobCc: reqBody.mobCc,
    mobNum: reqBody.mobNum,
    mobCcNum: reqBody.mobCc + ' ' + reqBody.mobNum,
    altEmID: reqBody.altEmID || '',
    altMobCc: reqBody.altMobCc || '',
    altMobNum: reqBody.altMobNum || '',
    altMobCcNum: reqBody.altMobNum ? reqBody.altMobCc + ' ' + reqBody.altMobNum : '',
    dob: reqBody.dob || '',
    dobStr: dobStr || '',
    gender: reqBody.gender || '',
    wrkUrls: reqBody.wrkUrls || [],

    mStatus: reqBody.mStatus || '',
    
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr
  }
}

const usrUpdObj = (reqBody, tData) => {
  const currentUTC = cs.currUTCObj();
  return {
    name: reqBody.fName + reqBody.lName,
    fName: reqBody.fName,
    lName: reqBody.lName,
    mobCc: reqBody.mobCc,
    mobNum: reqBody.mobNum,
    mobCcNum: reqBody.mobCc + reqBody.mobNum,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr
  }
}

const leadUpdate = (reqBody, tData) => {
  const currentUTC = cs.currUTCObj();
  const query = { delFlag: false, b2b: tData.b2b, euUser: reqBody.uid };

  const upDat = {
    euName: reqBody.name,
    euMobCcNum: reqBody.mobCcNum,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr
  };

  return { query, upDat };
}

module.exports = {
  getQry, passwordResetData, getPrfQry, EUprflUpdate, usrUpdObj, leadUpdate
}