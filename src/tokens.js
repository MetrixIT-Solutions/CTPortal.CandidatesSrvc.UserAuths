/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var logger = require('./lib/logger');

'use strict';
var crypto = require('crypto');

const ENCRYPTION_KEY = config.criptoTokenKey; // process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

// --- Begin: tokenGeneration: Token Generation Code
const tokenGeneration = (usrObj, uc, res, callback) => {
  try {
    const exp = moment().add(config.webSsnExpr, config.webSsnExprType).valueOf();
    const sep = moment().add(5, 'minutes').valueOf();
    const payload = {
      iss: usrObj._id,
      uid: usrObj.refUID,
      mp: usrObj.myPrimary,
      fn: usrObj.fName,
      ln: usrObj.lName,
      mn: usrObj.mobCcNum || '',
      eid: usrObj.emID || '',
      us: usrObj.uStatus,
      b2b: usrObj.b2b,
      bn: usrObj.b2bName,
      bc: usrObj.b2bCode,
      org: usrObj.org || '',
      on: usrObj.orgName || '',
      oc: usrObj.orgCode || '',
      ot: usrObj.team || '',
      otn: usrObj.tName || '',
      otc: usrObj.tCode || '',
      at: usrObj.at, // Access Token
      ip: usrObj.ip,
      uc, sep, exp
    };

    const jwtToken = jwt.sign(payload, config.jwtSecretKey);
    const token = encrypt(jwtToken, ENCRYPTION_KEY);
    res.header('ctpeuatoken', token);
    callback(token);
  } catch(error) {
    logger.error('src/tokens.js - tokenGeneration: Un-Known Error: ' + error);
    callback(null);
  }
}
// --- End: tokenGeneration: Token Generation Code

/**
 * Begin: refreshToken
 * @param {string} reqToken string
 * @param {object} res
 * @return {function} callback function
 */
const refreshToken = (reqToken, ip, res, callback) => {
  try {
    const currentDtNum = moment().valueOf();
    const jwtToken = decrypt(reqToken, ENCRYPTION_KEY);
    const tokenData = jwt.verify(jwtToken, config.jwtSecretKey);
    const exp = moment().add(config.webSsnExpr, config.webSsnExprType).valueOf();
    if(tokenData.exp >= currentDtNum) {
      getUserSsnData(tokenData, exp, ip, (token) => {
        const newToken = token !== 'error' ? token : reqToken;
        const newTokenData = token !== 'error' ? tokenData : null;
        const isExpired = (token === 'NA');
        res.header('ctpeuatoken', newToken);
        callback({tokenData: newTokenData, isExpired, ctpeuatoken: newToken});
      });
    } else {
      res.header('ctpeuatoken', reqToken);
      callback({tokenData, isExpired: true, ctpeuatoken: reqToken});
    }
  } catch(error) {
    logger.error('src/tokens.js - refreshToken: Un-Known Error: ' + error);
    res.header('ctpeuatoken', reqToken);
    callback(null);
  }
}
// --- End: refreshToken

// --- Begin: userTokenDecode
const userTokenDecode = (reqToken) => {
  try {
    const currentDtNum = moment().valueOf();
    const jwtToken = decrypt(reqToken, ENCRYPTION_KEY);
    const tokenData = jwt.decode(jwtToken, config.jwtSecretKey);
    if(tokenData.exp >= currentDtNum) {
      return {tokenData, isExpired: false};
    } else {
      return {tokenData, isExpired: true};
    }
  } catch(error) {
    logger.error('src/tokens.js - userTokenDecode: Un-Known Error: ' + error);
    return null;
  }
}
// --- End: userTokenDecode

const otpTokenGeneration = (usrObj, uc, otpType, otpStatus, res) => {
  try {
    const exp = moment().add(config.otpSsnExpr, config.otpSsnExprType).valueOf();
    const payload = {
      iss: usrObj._id,
      uid: usrObj.refUID,
      mp: usrObj.myPrimary,
      ot: otpType,
      os: otpStatus, uc, exp
    };

    const jwtToken = jwt.sign(payload, config.jwtSecretKey);
    const token = encrypt(jwtToken, ENCRYPTION_KEY);
    res.header('ctpeuotoken', token);
    return token;
  } catch(error) {
    logger.error('src/tokens.js - otpTokenGeneration: Un-Known Error: ' + error);
    return null;
  }
}

/**
 * @param {string} text string
 * @param {string} encryptKey string
 * @return {string}
 */
const encrypt = (text, encryptKey) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptKey), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * @param {string} text string
 * @param {string} decryptKey string
 * @return {string}
 */
const decrypt = (text, decryptKey) => {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(decryptKey), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  tokenGeneration, refreshToken, userTokenDecode, otpTokenGeneration, encrypt, decrypt
};

const getUserSsnData = (tokenData, exp, ip, callback) => {
  const {getEuSsn, postEUAuthLogout} = require('./services/EuUserAuthsSrvc');
  // if (tokenData.ip == ip) {
    const sep = moment().add(5, 'minutes').valueOf();
    getEuSsn(tokenData, (resObj) => {
      if (resObj?.status == '200') {
        const payload = setTokenPayload(tokenData, {sep, exp});

        const jwtNewToken = jwt.sign(payload, config.jwtSecretKey);
        const token = encrypt(jwtNewToken, ENCRYPTION_KEY);
        callback(token);
      } else if(resObj?.status == '204') {
        callback('NA');
      } else {
        logger.error('src/tokens.js - getUserSsnData: ' + JSON.stringify(resObj));
        callback('error');
      }
    });
  // } else {
  //   postEUAuthLogout(tokenData, resObj => {
  //     callback('NA');
  //   });
  // }
}

const setTokenPayload = (tokenData, newData) => {
  const payload = {
    ...tokenData, ...newData
  };
  return payload;
}