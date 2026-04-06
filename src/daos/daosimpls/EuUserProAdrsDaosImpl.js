/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const { uType } = require('../../consts/EuUserAuthsConsts.json')
const cs = require('../../services/CommonSrvc');

const getAdrsQry = (tData) => {
  return { uid: tData.iss, delFlag: false }
}

const proAdrsUpdate = (reqBody, tData) => {
  const currentUTC = cs.currUTCObj();
  return {
    hNum: reqBody.hNum,
    area: reqBody.area,
    zip: reqBody.zip,
    city: reqBody.city,
    state: reqBody.state,
    sCode: reqBody.sCode,
    country: reqBody.country,
    cCode: reqBody.cCode,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr
  }
}

module.exports = {
  getAdrsQry, proAdrsUpdate
}