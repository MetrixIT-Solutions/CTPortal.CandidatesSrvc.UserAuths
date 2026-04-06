/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const euProAdrsCtrl = require('../controllers/EuUserProAdrsCtrl');

module.exports.controller = (app) => {
  app.get('/ctpcust/v1/end/users/address/view', euProAdrsCtrl.getEUProAdrsView);
  app.put('/ctpcust/v1/end/users/address/update', euProAdrsCtrl.putEUProAdrsUpdate);

}