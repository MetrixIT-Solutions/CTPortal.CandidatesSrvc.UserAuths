/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema; 

// --- Begin: B2B Partner End Users Sessions Schema --- //
var schema = new Schema({
  _id: {type: String, default: uuidv4()},
  uid: {type: String, required: true, ref: config.collB2BEndUsers},
  atoken: {type: String, required: true}, // Access Token
  atStatus: {type: String, required: true}, // Access Token Status: Open, Active, Inactive, Expired
  euPrimary: {type: String, required: true}, // End User Primary(Email)

  at: {type: String, required: true, trim: true}, // App Type: Web App, Mobile App
  dt: {type: String, required: true, trim: true}, // Device Type: Desktop, Mobile, Tab
  dos: {type: String, required: true, trim: true}, // Device OS
  dosv: {type: String, required: true, trim: true}, // Device OS Version
  dvndr: {type: String, required: false, trim: true}, // Device Vendor(For Mobile / Tab)
  dmodel: {type: String, required: false, trim: true}, // Device Model(For Mobile / Tab)
  duId: {type: String, required: false, trim: true}, // Device Unique Id
  ma: {type: String, required: false, trim: true}, // Mac Address
  ipa: {type: String, required: true, trim: true}, // IP Address
  ipv: {type: String, required: true, trim: true}, // IP Version
  bn: {type: String, required: false, trim: true}, // Browser Name
  bv: {type: String, required: false, trim: true}, // Browser Version
  ua: {type: String, required: true, trim: true}, // USer Agent
  ip: {type: Object},

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uuType: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uuName: {type: String, required: true}, // Updated Users.pName
  uDate: {type: Date, required: true}, // Date & Time
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({delFlag: -1, uid: 1});
schema.index({delFlag: -1, uid: 1, ipa: 1});
schema.index({delFlag: -1, atStatus: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEndUsersSsns, schema);
// --- End: B2B Partner End Users Sessions Schema --- //
