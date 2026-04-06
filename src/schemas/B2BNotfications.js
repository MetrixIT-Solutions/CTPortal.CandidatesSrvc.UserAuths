/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// ------ Begin: B2B Partner End Users - Notifications Schema ------//
const schema = new Schema({
  _id: {type: String, default: uuidv4()},

  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},
  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},
  orgs: {type: [String], required: false}, // Organizations IDs(_id)

  user: {type: String, required: true}, // B2BEndUsers._id
  uName: {type: String, required: true},
  uRefID: {type: String, reorgsquired: false},
  uPrimary: {type: String, required: true},

  nTitle: {type: String, required: false}, // Notification Title (submission Verified or interview Verified)
  nMessage: {type: String, required: true}, // Notification Message
  nStatus: {type: String, required: true}, // Notification Status: Read, Unread
  nFrom: {type: String, required: false}, // Notification From: Submission, Interview
  recordId: {type: String, required: false}, // Record ID (submission or interview)

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uuType: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true}, // Updated Users._id
  uuName: {type: String, required: true}, // Updated Users.pName
  uDate: {type: Date, required: true}, // Date & Time
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({nTitle: 'text', nMessage: 'text'});
schema.index({user: 1, b2b: 1, org: 1, delFlag: -1});
schema.index({cDtStr: -1});

module.exports = mongoose.model(config.collB2BNotfications, schema);
// ------ End: B2B Partner End Users - Notifications Schema -------//
