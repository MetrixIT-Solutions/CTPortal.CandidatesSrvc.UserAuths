/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const bEuSsns = require('../../schemas/B2BEndUsersSsns');
const bEuSsnClsd = require('../../schemas/B2BEndUsersSsnsClsd');
const {atStr, ssnData, uType, uName, openSts, activeSts} = require('../../consts/EuUserAuthsConsts.json')
const cs = require('../../services/CommonSrvc');
const ents = require('../../../config/entities.json');

const setLoginQuery = (reqBody) => {
  return { delFlag: false, myPrimary: ents[reqBody.b2bCode] + ':' + reqBody.userID, b2bCode: ents[reqBody.b2bCode]};
}

const euSsnCreate = (usrObj, ip, devInfo) => {
  const ssnObj = getEuSsnCreateData(usrObj, ip, devInfo);
  const ssnData = new bEuSsns(ssnObj);
  const ssncData = new bEuSsnClsd(ssnObj);
  return {ssnData, ssncData};
}

const setEuData = (uResObj) => {
  const uObj = setEuObj(uResObj);
  return uObj;
}

const setB2bUserOtpData = (otpObj, tData) => {
  const currentUTC = cs.currUTCObj();
  return {
    otp: otpObj.strHash,
    otpLav: otpObj.salt,
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  };
}

const getQry = (_id) => {
  return { delFlag: false, _id};
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

const setSnUpdate = (tData) => {
  const currentUTC = cs.currUTCObj();
  return {
    atStatus: ssnData.expire,
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  }
}

const usrPrfQry = (uid) => {
  return {delFlag: false, uid};
}

const getUserDataQry = (_id) => {
  return { _id, delFlag: false, uStatus: {$in: [openSts, activeSts]} };
}

const passwordUpdate = (pwdObj, userId, ip) => {
  const currentUTC = cs.currUTCObj();
  return {
    $push: {
      alwdIPs: ip
    },
    $set: {
      logPswd: pwdObj.strHash,
      logPswdLav: pwdObj.salt,
      uuType: uType,
      uUser: userId,
      uuName: uName,
      uDate: currentUTC.currUTCDtTm,
      uDtStr: currentUTC.currUTCDtTmStr
    }
  };
}

const snQry = (reqBody) => {
  return { delFlag: false, euPrimary: ents[reqBody.b2bCode] + ':' + reqBody.userID};
}

module.exports = {
  setLoginQuery, euSsnCreate, setEuData, setB2bUserOtpData, getQry, passwordResetData, setSnUpdate, usrPrfQry, getUserDataQry, passwordUpdate, snQry
}

const getEuSsnCreateData = (usrObj, ip, devInfo) => {
  const _id = generateAccessToken();
  const currentUTC = cs.currUTCObj();
  return {
    _id,
    uid: usrObj._id,
    atoken: _id,
    euPrimary: usrObj.myPrimary,
    atStatus: ssnData.active,
    at: ssnData.at,
    dt: devInfo.deviceType,
    dos: devInfo.osName,
    dosv: devInfo.osVersion,
    duId: devInfo.duId || '',
    ma: devInfo.ma || '',
    ipa: ip || devInfo.ip,
    ipv: 'ipV4',
    bn: devInfo.browserName,
    bv: devInfo.browserVersion,
    ua: devInfo.ua,
    ip: devInfo,

    cuType: usrObj.cuType,
    cUser: usrObj.cUser,
    cuName: usrObj.cuName,
    cDate: currentUTC.currUTCDtTm,
    cDtStr: currentUTC.currUTCDtTmStr,
    uuType: usrObj.uuType,
    uUser: usrObj.uUser,
    uuName: usrObj.uuName,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  };
}

const setEuObj = (data) => {
  return {
    b2b: data.b2b,
    b2bName: data.b2bName,
    b2bCode: data.b2bCode,
    refType: data.refType || '',
    refByUser: data.refByUser || '',
    refByUID: data.refByUID || '',
    refByName: data.refByName || '',
    name: data.name,
    sName: data.sName || '',
    fName: data.fName,
    lName: data.lName,
    mobCc: data.mobCc || '',
    mobNum: data.mobNum || '',
    mobCcNum: data.mobCcNum || '',
    emID: data.emID,
    refUID: data.refUID,
    myPrimary: data.myPrimary,
    mpType: data.mpType,
    altMobCc: data.altMobCc || '',
    altMobNum: data.altMobNum || '',
    altMobCcNum: data.altMobCcNum || '',
    altEmID: data.altEmID || '',
    dob: data.dob || '',
    dobStr: data.dobStr || '',
    gender: data.gender || '',
    wrkUrls: data.wrkUrls || [],

    ecPer: data.ecPer || '',
    ecNum: data.ecNum || '',
    ecEml: data.ecEml || '',
    empType: data.empType || '',
    ssn: data.ssn || '',
    ssnExpDt: data.ssnExpDt || '',
    ssnExpDtStr: data.ssnExpDtStr || '',
    mStatus: data.mStatus || '',
    unidType: data.unidType || '',
    usaNatID: data.usaNatID || '',
    unidIssDt: data.unidIssDt ||'',
    unidIssDtStr: data.unidIssDtStr || '',
    unidExpDt: data.unidExpDt || '',
    unidExpDtStr: data.unidExpDtStr || '',
    uStatus: data.uStatus || '',
    wStatus: data.wStatus,

    // userType: data.userType,
    // userRole: data.userRole,
    mdTokens: data.mdTokens,
    wdTokens: data.wdTokens,

    cUser: data.cUser,
    cuName: data.cuName,
  };
}

const generateAccessToken = () => {
  const curntUTC = cs.currUTCObj()
  const g5rndm = cs.randomStrGen(atStr, 5);
  const g5rndm1 = cs.randomStrGen(atStr, 5);
  const yr = curntUTC.currUTCYear - 2023;
  const Doy = curntUTC.currUTCDayOfYear;
  const hrs = curntUTC.currUTCHrs;
  const min = curntUTC.currUTCMin;
  const sec = curntUTC.currUTCSec;
  const g4rndm = cs.randomStrGen(atStr, 4);
  const at = g5rndm+yr+Doy+'-'+hrs+g5rndm1+min+'-'+g4rndm+sec;
  return at;
}