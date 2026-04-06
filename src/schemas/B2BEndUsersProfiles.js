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

// --- Begin: B2B Partner End Users Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  uid: {type: String, required: true, ref: config.collB2BEndUsers},
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  refType: {type: String, required: true}, // Refer Type: Internal, Other
  refByUser: {type: String, required: false}, // Referred By User(_id): Required true if refType = Internal
  refByUID: {type: String, required: false}, // Referred By User(refUID): Required true if refType = Internal
  refByName: {type: String, required: true}, // Referred By User(Name)

  report: {type: String, required: false},
  rprtName: {type: String, required: false},
  rprtPrimary: {type: String, required: false},
  pReports: {type: [String], required: false}, // Parent Reports

  name: {type: String, required: true, trim: true}, // Full Name
  sName: {type: String, required: false, trim: true}, // Short Name
  fName: {type: String, required: true, trim: true}, // First Name
  lName: {type: String, required: true, trim: true}, // Last Name
  mobCc: {type: String, required: true}, // cc - Country Code: +91
  mobNum: {type: String, required: true}, // Mobile Number
  mobCcNum: {type: String, required: true}, // Mobile Number with Country Code
  emID: {type: String, required: true, trim: true}, // Email ID
  refUID: {type: String, required: true, index: true, unique: true}, // Reference Unique ID // teksolve:superadmin
  myPrimary: {type: String, required: true, index: true, unique: true}, // Mobile Number or Email // teksolve:admin@teksolveit.com
  mpType: {type: String, required: true}, // My Primary Type:  Email or Mobile
  altMobCc: {type: String, required: false}, // cc - Country Code
  altMobNum: {type: String, required: false},
  altMobCcNum: {type: String, required: false},
  altEmID: {type: String, required: false, trim: true},
  dob: {type: Date, required: false}, // Puttina Roju - Date of Birth - Format = YYYY-MM-DD
  dobStr: {type: String, required: false}, // Puttina Roju - Date of Birth - Format = YYYY-MM-DD
  gender: {type: String, required: false}, // Gender
  wrkUrls: {type: [String], required: false, default: []},

  ecPer: {type: String, required: false}, // Emergency Contact Person Name
  ecRelt: {type: String, required: false}, // Emergency Relation
  ecNum: {type: String, required: false}, // Emergency Contact Number: +91 1234567891
  ecEml: {type: String, required: false}, // Emergency Contact Email

  empType: {type: String, required: false, trim: true}, // Full Time, Part Time
  empType: {type: String, required: false}, // Full Time, Part Time
  ssn: {type: String, required: false}, // SSN Number
  ssnExpDt: {type: Date, required: false}, // SSN Expected Date
  ssnExpDtStr: {type: String, required: false}, // SSN Expected Date
  mStatus: {type: String, required: false}, // Marial Status: Single, Married, Separated, Widowed, Other

  unidType: {type: String, required: false}, // USA issued national ID state Type: DL(Driving Licence)/State ID/Other
  usaNatID: {type: String, required: false}, // USA issued national ID state: Number
  unidIssDt: {type: String, required: false},
  unidIssDtStr: {type: String, required: false},
  unidExpDt: {type: String, required: false},
  unidExpDtStr: {type: String, required: false},
  isRes: {type: Boolean, default: false},   // Same as Residential Address

  uStatus: {type: String, required: true}, // User Status: Open, Active, Inactive(Contact Support), Hold(24Hrs), Blocked(1Hr), Rejected
  mPin: {type: String, required: false},
  mPinLav: {type: String, required: false}, // Lav(Lavanam) - Salt
  logPswd: {type: String, required: false},
  logPswdLav: {type: String, required: false}, // Lav(Lavanam) - Salt
  otp: {type: String, required: false},
  otpLav: {type: String, required: false}, // Lav(Lavanam) - Salt
  mdTokens: {type: [String], required: false, default: []}, // Mobile Device Tokens
  wdTokens: {type: [String], required: false, default: []}, // Web Device Tokens

  pIcon: {type: String, required: false}, // Profile Icon
  piActualName: {type: String, required: false},
  piPath: {type: String, required: false},

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

schema.index({name: 'text', sName: 'text', mobCcNum: 'text', emID: 'text', refUID: 'text'});
schema.index({delFlag: -1, b2b: 1, myPrimary: 1});
schema.index({delFlag: -1, b2b: 1, refUID: 1});
schema.index({delFlag: -1, b2b: 1, uid: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEndUsersProfiles, schema);
// --- End: B2B Partner End Users Schema --- //
