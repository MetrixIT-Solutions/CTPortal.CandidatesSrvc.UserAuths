/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const b2bEUsers = require('../schemas/B2BEndUsers');
const b2bEUsersAm = require('../schemas/B2BEndUsersAm');
const b2bEUsersAz = require('../schemas/B2BEndUsersAz');
const b2bEUsersBm = require('../schemas/B2BEndUsersBm');
const b2bEUsersBz = require('../schemas/B2BEndUsersBz');
const b2bEUsersC = require('../schemas/B2BEndUsersC');
const b2bEUsersD = require('../schemas/B2BEndUsersD');
const b2bEUsersE = require('../schemas/B2BEndUsersE');
const b2bEUsersF = require('../schemas/B2BEndUsersF');
const b2bEUsersG = require('../schemas/B2BEndUsersG');
const b2bEUsersH = require('../schemas/B2BEndUsersH');
const b2bEUsersIquvxyz = require('../schemas/B2BEndUsersIquvxyz');
const b2bEUsersJm = require('../schemas/B2BEndUsersJm');
const b2bEUsersJz = require('../schemas/B2BEndUsersJz');
const b2bEUsersKm = require('../schemas/B2BEndUsersKm');
const b2bEUsersKz = require('../schemas/B2BEndUsersKz');
const b2bEUsersL = require('../schemas/B2BEndUsersL');
const b2bEUsersMm = require('../schemas/B2BEndUsersMm');
const b2bEUsersMz = require('../schemas/B2BEndUsersMz');
const b2bEUsersNo = require('../schemas/B2BEndUsersNo');
const b2bEUsersP = require('../schemas/B2BEndUsersP');
const b2bEUsersR = require('../schemas/B2BEndUsersR');
const b2bEUsersSm = require('../schemas/B2BEndUsersSm');
const b2bEUsersSz = require('../schemas/B2BEndUsersSz');
const b2bEUsersT = require('../schemas/B2BEndUsersT');
const b2bEUsersW = require('../schemas/B2BEndUsersW');
const b2bEUsersNum = require('../schemas/B2BEndUsersNum');
const B2BUsersSsns = require('../schemas/B2BEndUsersSsns');
const B2BUsersSsnsClsd = require('../schemas/B2BEndUsersSsnsClsd');
const B2BEndUsersProfiles = require('../schemas/B2BEndUsersProfiles');
const B2BEuLeads = require('../schemas/B2BEuLeads');
const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const eiArr = [b2bEUsersAm, b2bEUsersAz, b2bEUsersBm, b2bEUsersBz, b2bEUsersC, b2bEUsersD, b2bEUsersE, b2bEUsersF, b2bEUsersG, b2bEUsersH, b2bEUsersIquvxyz, b2bEUsersJm, b2bEUsersJz, b2bEUsersKm, b2bEUsersKz, b2bEUsersL, b2bEUsersMm, b2bEUsersMz, b2bEUsersNo, b2bEUsersP, b2bEUsersR, b2bEUsersSm, b2bEUsersSz, b2bEUsersT, b2bEUsersW, b2bEUsersNum];

const getEndUserData = (query, callback) => {
  b2bEUsers.findOne(query).then((uResObj) => {
    if(uResObj && uResObj._id) {
      const result = SetRes.successRes(uResObj);
      callback(result);
    } else {
      const nD = SetRes.noData({});
      callback(nD);
    }
  }).catch((error) => {
    logger.error('There was an Un-konwn Error occured in daos/EuUserAuthsDaos.js, at getEndUserData:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
};

const getEndUserDataByID = (query, uc, callback) => {
  eiArr[uc].findOne(query).then((uResObj) => {
    if(uResObj && uResObj._id) {
      const result = SetRes.successRes(uResObj);
      callback(result);
    } else {
      const nD = SetRes.noData({});
      callback(nD);
    }
  }).catch((error) => {
    logger.error('There was an Un-konwn Error occured in daos/EuUserAuthsDaos.js, at getEndUserDataByID:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
};

const createCommonData = (createObj, callback) => {
  createObj.save().then((resObj) => {
    if (resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const sf = SetRes.saveFailed();
      callback(sf);
    }
  }).catch((error) => {
    logger.error('Un-konwn Error in daos/EuUserAuthsDaos.js, at createCommonData:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
};

const getSsndata = (query, callback) => {
  B2BUsersSsns.findOne(query).then((uResObj) => {
    if(uResObj && uResObj._id) {
      const result = SetRes.successRes(uResObj);
      callback(result);
    } else {
      const nD = SetRes.noData({});
      callback(nD);
    }
  }).catch((error) => {
    logger.error('There was an Un-konwn Error occured in daos/EuUserAuthsDaos.js, at getSsndata:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
};

const eUserUpdate = (query, updateObj, callback) => {
  b2bEUsers.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const resMsg = SetRes.successRes(resObj);
      callback(resMsg);
    } else {
      const uf = SetRes.updateFailed();
      callback(uf);
    }
  }).catch((err) => {
    logger.error('Unknown Error in daos/EuUserAuthsDaos.js.js at eUserUpdate: ' + err);
    const errMsg = SetRes.unKnownErr({});
    callback(errMsg);
  });
}

const eUserUpdateByEId = (query, updateObj, uc, callback) => {
  eiArr[uc].findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const resMsg = SetRes.successRes(resObj);
      callback(resMsg);
    } else {
      const uf = SetRes.updateFailed();
      callback(uf);
    }
  }).catch((err) => {
    logger.error('Unknown Error in daos/EuUserAuthsDaos.js.js at eUserUpdateByEId: ' + err);
    const errMsg = SetRes.unKnownErr({});
    callback(errMsg);
  });
}

const deleteSsndata = (query, callback) => {
  B2BUsersSsns.findOneAndDelete(query).then((resObj) => {
    if (resObj && resObj._id) {
      const resMsg = SetRes.successRes(resObj);
      callback(resMsg);
    } else {
      const df = SetRes.deleteFailed();
      callback(df);
    }
  }).catch((err) => {
    logger.error('Unknown Error in daos/EuUserAuthsDaos.js.js at deleteSsndata: ' + err);
    const errMsg = SetRes.unKnownErr({});
    callback(errMsg);
  });
}

const updateSsnClsdData = (query, updateObj, callback) => {
  B2BUsersSsnsClsd.findOneAndUpdate(query, { $set: updateObj }, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const resMsg = SetRes.successRes(resObj);
      callback(resMsg);
    } else {
      const uf = SetRes.updateFailed();
      callback(uf);
    }
  }).catch((err) => {
    logger.error('Unknown Error in daos/EuUserAuthsDaos.js.js at updateSsnClsdData: ' + err);
    const errMsg = SetRes.unKnownErr({});
    callback(errMsg);
  });
}

const getUserPrfData = (query, callback) => {
  B2BEndUsersProfiles.findOne(query).then((uResObj) => {
    if(uResObj && uResObj._id) {
      const result = SetRes.successRes(uResObj);
      callback(result);
    } else {
      const nD = SetRes.noData({});
      callback(nD);
    }
  }).catch((error) => {
    logger.error('There was an Un-konwn Error occured in daos/EuUserAuthsDaos.js, at getUserPrfData:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
};

const getEuClsdSSsnData = (query, callback) => {
  B2BUsersSsnsClsd.findOne(query).sort({cDtStr:-1}).then((resObj) => {
    if(resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const nD = SetRes.noData({});
      callback(nD);
    }
  }).catch((error) => {
    logger.error('There was an Un-konwn Error occured in daos/EuUserAuthsDaos.js, at getEuClsdSSsnData:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
};

const deleteEndUserSsn = (query, callback) => {
  B2BUsersSsns.deleteMany(query).then((resObj) => {
    // if (resObj && resObj.deletedCount > 0) {
      const result = SetRes.successRes('Candidate sessions deleted successfully');
      callback(result);
    // } else {
    //   const df = SetRes.deleteFailed({});
    //   callback(df);
    // }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuUserAuthsDaos.js, at deleteEndUserSsn:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const leadUpdate = (query, updateObj, callback) => {
  B2BEuLeads.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const resMsg = SetRes.successRes(resObj);
      callback(resMsg);
    } else {
      const uf = SetRes.updateFailed();
      callback(uf);
    }
  }).catch((err) => {
    logger.error('Unknown Error in daos/EuUserAuthsDaos.js.js at leadUpdate: ' + err);
    const errMsg = SetRes.unKnownErr({});
    callback(errMsg);
  });
}

module.exports = {
  getEndUserData, getEndUserDataByID, createCommonData, getSsndata, eUserUpdate, eUserUpdateByEId, deleteSsndata, updateSsnClsdData,
  getUserPrfData, getEuClsdSSsnData, deleteEndUserSsn, leadUpdate
};
