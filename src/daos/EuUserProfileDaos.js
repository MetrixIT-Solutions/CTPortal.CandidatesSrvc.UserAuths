/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const B2BEndUsersProfiles = require('../schemas/B2BEndUsersProfiles');
const SetRes = require('../SetRes');
const logger = require('../lib/logger');

const EUprflUpdate = (query, updateObj, callback) => {
  B2BEndUsersProfiles.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {    
    if(resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('There was an Un-konwn Error occured in daos/EuUserProfileDaos.js, at EUprflUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

module.exports = {
 EUprflUpdate
}