/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const euaCv = require('../controllers/apiVldns/EuUserAuthsCtrlVldns');
const euaSrv = require('../services/EuUserAuthsSrvc')
const util = require('../lib/util');
const SetRes = require('../SetRes');
const token = require('../tokens');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiRes(res, resObj);
}

const postEUAuthLogin = (req, res, next, passport) => {
  const vRes = euaCv.euserLoginVldn(req);
  if(vRes.vFlag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    euaSrv.postEUAuthLogin(req, res, next, passport, devInfo, (resObj) => {
      util.sendApiRes(res, resObj);
    });
  } else {
    util.sendApiRes(res, vRes.result);
  }
}

const postEUAuthFPSendOtp = (req, res) => {
  const vldRes = euaCv.euserFPVldn(req);
  if(vldRes.isTrue) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    euaSrv.postEUAuthFPSendOtp(req.body, req.ip, devInfo, res, (resObj) => {
      util.sendApiRes(res, resObj);
    });
  } else {
    util.sendApiRes(res, vldRes.result);
  }
}

const postEUAuthFPVerfOtp = (req, res) => {
  const vldRes = euaCv.euserFPOtpVldn(req);
  if(vldRes.isTrue) {
    const tknRes = token.userTokenDecode(req.headers.ctpeuotoken);
    const tokenvald = euaCv.tokenVldn(tknRes);
    if (tokenvald.flag) {
      euaSrv.postEUAuthFPVerfOtp(req.body, tknRes.tokenData, res, (resObj) => {
        util.sendApiRes(res, resObj);
      });
    } else {
      util.sendApiRes(res, tokenvald.result);
    }
  } else {
    util.sendApiRes(res, vldRes.result);
  }
}

const postEUAuthResetPassword = (req, res) => {
  const vldRes = euaCv.euRPVldn(req);
  if(vldRes.isTrue) {
    const tData = token.userTokenDecode(req.headers.ctpeuotoken);
    const tokenValid = euaCv.tokenVldn(tData);
    if (tokenValid.flag) {
      euaSrv.postEUAuthResetPassword(req.body, tData.tokenData, (resObj) => {
        util.sendApiRes(res, resObj);
      });
    } else {
      util.sendApiRes(res, tokenValid.result);
    }
  } else {
    util.sendApiRes(res, vldRes.result);
  }
}


const postEUAuthLogout = (req, res) => {
  if (req.headers.ctpeuatoken) {
    const tData = token.userTokenDecode(req.headers.ctpeuatoken);
    const tokenValid = euaCv.tokenVldn(tData);
    if (tokenValid.flag) {
      euaSrv.postEUAuthLogout(tData.tokenData, (resObj) => {
        util.sendApiRes(res, resObj);
      });
    } else {
      util.sendApiRes(res, tokenValid.result);
    }
  } else {
    util.sendApiRes(res, SetRes.tokenRequired());
  }
}

const postEuUpdatePassword = (req, res) => {
  if (req.body.password && req.body.refId && req.headers.ctpeuua) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    euaSrv.postEuUpdatePassword(req.body, res, req.ip || devInfo.ip, (resObj) => {
      util.sendApiRes(res, resObj);
    });
  } else {
    util.sendApiRes(res, SetRes.mandatory());
  }
}

const postEuUserAuthUserSession = (req, res) => {
  if (req.headers.ctpeuatoken) {
    const tData = token.userTokenDecode(req.headers.ctpeuatoken);
    const tokenValid = euaCv.tokenVldn(tData);
    if (tokenValid.flag) {
      euaSrv.getEuUserSsn(tData.tokenData, (resObj) => {
        util.sendApiRes(res, resObj);
      });
    } else util.sendApiRes(res, tokenValid.result);
  } else  util.sendApiRes(res, SetRes.tokenRequired());

}

module.exports = {
  apiServerStatus, postEUAuthLogin, postEUAuthFPSendOtp, postEUAuthFPVerfOtp,
 postEUAuthResetPassword, postEUAuthLogout, postEuUpdatePassword, postEuUserAuthUserSession
};
