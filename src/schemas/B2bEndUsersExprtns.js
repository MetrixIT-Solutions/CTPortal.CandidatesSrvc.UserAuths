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

// --- Begin: B2B Partner End Users Expirations Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},

  uid: {type: String, required: true, ref: config.collB2BEndUsers}, // End User Record ID (_id)
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},
  team: {type: String, required: false},
  tName: {type: String, required: false}, // Team Name
  tCode: {type: String, required: false}, // Team Code
  teams: {type: [String], required: false}, // Org Teams IDs(_id): Allowed Teams Users
  tNames: {type: [String], required: false},

  report: {type: String, required: false},
  rprtName: {type: String, required: false},
  rprtPrimary: {type: String, required: false},
  pReports: {type: [String], required: false}, // Parent Reports

  ua: [{
    _id: {type: String, required: true}, //
    role: {type: String, required: true}, // Recruiter, Mentor, Onsite Manager, Ofshore Manager
    name: {type: String, required: true},
    mobCcNum: {type: String, required: true}, // Mobile Number with Country Code
    deskCcNum: {type: String, required: false},
    deskNumExtn: {type: String, required: false},
    emID: {type: String, required: true}, // Email ID
    refUID: {type: String, required: true}, // Reference Unique ID // teksolve:superadmin
    primary: {type: String, required: true}, // Mobile Number or Email // teksolve:admin@teksolveit.com
  }],

  name: {type: String, required: true, trim: true}, // End User Full Name
  mobCcNum: {type: String, required: false}, // End User Mobile Number with Country Code
  emID: {type: String, required: true, trim: true}, // End User Email ID
  refUID: {type: String, required: true}, // Reference Unique ID // teksolve:superadmin
  myPrimary: {type: String, required: true}, // Mobile Number or Email // teksolve:admin@teksolveit.com

  type: {type: String, required: true}, // i94, Visa, Passport, WrkAuth, USid, SSN
  newObj: {type: Object, required: true},
  oldObj: {type: Object, required: false},
  strDtStr: {type: String, required: false}, // Start Date String
  expDtStr: {type: String, required: false}, // Expired Date String
  searchStr: {type: String, required: true},

  isVrfd: {type: Boolean, default: false},
  status: {type: String, required: true}, // Sumitted, Approved

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

schema.index({searchStr: 'text'});
schema.index({pReports: 1, type: 1, status: 1, b2b: 1, delFlag: -1});
schema.index({uid: 1, expDtStr: 1, type: 1, b2b: 1, delFlag: -1});
schema.index({teams: 1, type: 1, status: 1, b2b: 1, delFlag: -1});
schema.index({expDtStr: -1, cDtStr: -1});

module.exports = mongoose.model(config.collB2bEndUsersExprtns, schema);
// --- End: B2B Partner End Users Expirations Schema --- //
