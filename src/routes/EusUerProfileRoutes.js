/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const euPCtrl = require('../controllers/EuUserProfileCtrl');

module.exports.controller = (app) => {

  app.post('/ctpcust/v1/end/users/profile/changes/password', euPCtrl.postEUPrflChangePassword);
  app.put('/ctpcust/v1/end/users/profile/update', euPCtrl.putEUprflUpdate);
}