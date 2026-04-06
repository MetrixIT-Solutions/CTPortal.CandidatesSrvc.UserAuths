/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var axios = require('axios');
var config = require('config');

const profileSubUpdate = (data, ctpeuatoken, callback) => {  
  const headers =  { headers: { ctpeuatoken } };
  axios.put(config.putSubUpdateApi, data, headers)
    .then((res) => callback(null, res.data)).catch((err) => callback(err, null));
}

const profileIntrvwUpdate = (data, ctpeuatoken, callback) => {
  const headers =  { headers: { ctpeuatoken } };
  axios.put(config.putIntrwUpdateApi, data, headers)
    .then((res) => callback(null, res.data)).catch((err) => callback(err, null));
}

module.exports = {
  profileSubUpdate, profileIntrvwUpdate
}
