/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const adrsDaoImpl = require('../daos/daosimpls/EuUserProAdrsDaosImpl');
const resAdrsDao = require('../daos/EuUserProAdrsDaos');

const getEUProAdrsView = ( tData, callback) => {  
  const qry = adrsDaoImpl.getAdrsQry(tData);
  resAdrsDao.proAdrsView(qry, callback);
}

const putEUProAdrsUpdate = (reqBody, tData, callback) => {
  const qry = adrsDaoImpl.getAdrsQry(tData);
  const updateObj = adrsDaoImpl.proAdrsUpdate(reqBody, tData);
  resAdrsDao.proAdrsUpdate(qry, updateObj, callback);
}

module.exports = {
  getEUProAdrsView, putEUProAdrsUpdate
}