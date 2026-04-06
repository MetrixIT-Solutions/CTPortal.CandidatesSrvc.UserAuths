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

const euserLoginVldn = (req) => {
  if(!req.body.userID || !req.body.password || !req.body.b2bCode) {
    const mandatory = SetRes.mandatory();
    return {vFlag: false, result: mandatory};
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {vFlag: false, result: hr};
  } else {
    return {vFlag: true};
  }
}

const euserFPVldn = (req) => {
  if(!req.body.userID || !req.body.b2bCode) {
    const mandatory = SetRes.mandatory();
    return {isTrue: false, result: mandatory};
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {vFlag: false, result: hr};
  } else {
    return {isTrue: true};
  }
}

const euserFPOtpVldn = (req) => {
  if (!req.headers.ctpeuotoken) {
    const tr = SetRes.tokenRequired();
    return {isTrue: false, result: tr};
  } else if(!req.body.otp) {
    const mandatory = SetRes.mandatory();
    return {isTrue: false, result: mandatory};
  } else {
    return {isTrue: true};
  }
}

const euRPVldn = (req) => {
  if (!req.headers.ctpeuotoken) {
    const tr = SetRes.tokenRequired();
    return {isTrue: false, result: tr};
  } else if(!req.body.password) {
    const mandatory = SetRes.mandatory();
    return {isTrue: false, result: mandatory};
  } else {
    return {isTrue: true};
  }
}

module.exports = {
  tokenVldn, euserLoginVldn, euserFPVldn, euserFPOtpVldn, euRPVldn
};
