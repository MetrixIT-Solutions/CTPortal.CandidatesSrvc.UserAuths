/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const B2BEndUsersAdrs = require('../schemas/B2BEndUsersAdrs');
const SetRes = require('../SetRes');
const logger = require('../lib/logger');

const proAdrsView = (query, callback) => {
  B2BEndUsersAdrs.find(query).then((resObj) => {
    if (resObj && resObj.length) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.noData([]);
      callback(uf);
    }
  }).catch((error) => {
    logger.error('There was an Un-konwn Error occured in daos/EuUserResAdrsDaos.js, at proAdrsView:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  })
}

const proAdrsUpdate = (query, updateObj, callback) => {
  B2BEndUsersAdrs.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('There was an Un-konwn Error occured in daos/EuUserResAdrsDaos.js, at proAdrsUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

module.exports = {
  proAdrsView, proAdrsUpdate
}