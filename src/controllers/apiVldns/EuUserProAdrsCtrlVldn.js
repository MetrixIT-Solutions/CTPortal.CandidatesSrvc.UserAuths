/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../../SetRes');

const proAdrsViewVldn = (req) => {
  if (!req.headers.ctpeuatoken) {
    const tr = SetRes.tokenRequired();
    return { flag: false, result: tr };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else {
    return { flag: true };
  }
}

const proAdrsUpdateVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpeuatoken) {
    const tr = SetRes.tokenRequired();
    return { flag: false, result: tr };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else {
    const data = resAdrsVldnData(reqBody)
    if (!data) {
      const mandatory = SetRes.mandatory();
      return { flag: false, result: mandatory };
    } else {
      return { flag: true };
    }
  }
}

module.exports = {
  proAdrsViewVldn, proAdrsUpdateVldn
}

const resAdrsVldnData = (reqBody) => {
  if (!reqBody.hNum && !reqBody.area && !reqBody.zip && !reqBody.city && !reqBody.state && !reqBody.sCode && !reqBody.country && !reqBody.cCode) {
    return false;
  } else {
    return true;
  }
}
