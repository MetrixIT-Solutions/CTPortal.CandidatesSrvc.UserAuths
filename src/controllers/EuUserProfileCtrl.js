/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const eupCv = require('../controllers/apiVldns/EuUserProfileCtrlVldn');
const eupSrv = require('../services/EuUserProfileSrvc')
const util = require('../lib/util');
const token = require('../tokens');

const postEUPrflChangePassword = (req, res) => {
  const tokenValid = eupCv.prflChangePswdVldn(req);
  if (tokenValid.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    token.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, tData => {
      const tokenValid = eupCv.tokenVldn(tData);
      if (tokenValid.flag) {
        eupSrv.postEUPrflChangePassword(req.body, tData.tokenData, (resObj) => {
          util.sendApiRes(res, resObj);
        });
      } else {
        util.sendApiRes(res, tokenValid.result);
      }
    });
  } else {
    util.sendApiRes(res, tokenValid.result);
  }
}

const putEUprflUpdate = (req, res) => {
  const prflValid = eupCv.prflUpdateVldn(req);
  if (prflValid.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    token.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, tData => {
      const tokenValid = eupCv.tokenVldn(tData);
      if (tokenValid.flag) {
        eupSrv.putEUprflUpdate(req.body, tData, (resObj) => {
          util.sendApiRes(res, resObj);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, prflValid.result);
}

module.exports = {
  postEUPrflChangePassword, putEUprflUpdate
}