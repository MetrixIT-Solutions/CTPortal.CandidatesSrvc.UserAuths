/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const auCv = require('./apiVldns/EuUserAuthsCtrlVldns');
const euAdrsCv = require('./apiVldns/EuUserProAdrsCtrlVldn');
const euAdrsSrv = require('../services/EuUserProAdrsSrvc');
const util = require('../lib/util');
const token = require('../tokens');

const getEUProAdrsView = (req, res) => {
  const prflValid = euAdrsCv.proAdrsViewVldn(req);
  if (prflValid.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    token.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, tData => {
      const tokenValid = auCv.tokenVldn(tData);
      if (tokenValid.flag) {
        euAdrsSrv.getEUProAdrsView(tData.tokenData, (resObj) => {
          util.sendApiRes(res, resObj);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, prflValid.result);
}

const putEUProAdrsUpdate = (req, res) => {
  const prflValid = euAdrsCv.proAdrsUpdateVldn(req);
  if (prflValid.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    token.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, tData => {
      const tokenValid = auCv.tokenVldn(tData);
      if (tokenValid.flag) {
        euAdrsSrv.putEUProAdrsUpdate(req.body, tData.tokenData, (resObj) => {
          util.sendApiRes(res, resObj);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, prflValid.result);
}

module.exports = {
  getEUProAdrsView, putEUProAdrsUpdate
}