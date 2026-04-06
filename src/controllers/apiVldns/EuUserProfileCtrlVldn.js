/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../../SetRes');

const tokenVldn = (tData) => {
  if (!tData) {
    const result = SetRes.tokenInvalid();
    return { flag: false, result };
  } else if (tData.isExpired) {
    const result = SetRes.tokenExpired();
    return { flag: false, result };
  } else if (!tData.tokenData) {
    const result = SetRes.tokenSsnErr();
    return { flag: false, result };
  } else {
    return { flag: true, result: tData.tokenData };
  }
}

const prflChangePswdVldn = (req) => {
  if (!req.headers.ctpeuatoken) {
    const tr = SetRes.tokenRequired();
    return {flag: false, result: tr};
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if(!req.body.oldPassword || !req.body.newPassword) {
    const mandatory = SetRes.mandatory();
    return {flag: false, result: mandatory};
  } else {
    return {flag: true};
  }
}

const prflUpdateVldn = (req) => {
  const reqBody = req.body;  
  if(!req.headers.ctpeuatoken) {
    const tr = SetRes.tokenRequired();
    return { flag: false, result: tr };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else {
    const data = prflVldnData(reqBody);
    if(data){
      const mandatory = SetRes.mandatory();
      return { flag: false, result: mandatory };
    } else {
      return { flag: true };
    }
  }
}

module.exports = {
  tokenVldn, prflChangePswdVldn, prflUpdateVldn
}

const prflVldnData = (reqBody) => {    
  if(!reqBody.fName && !reqBody.lName && !reqBody.MobNum && !reqBody.dob && !reqBody.gender) {
    return true;
  } else {
    return false;
  }
}
