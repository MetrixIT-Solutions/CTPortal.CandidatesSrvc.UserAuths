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

// --- Begin: B2B Partner End Users Leads Marketing Lifecycles Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  lid: {type: String, required: true},
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  refType: {type: String, required: true}, // Refer Type: Internal, Other
  refByUser: {type: String, required: false}, // Referred By User(_id): Required true if refType = Internal
  refByUID: {type: String, required: false}, // Referred By User(refUID): Required true if refType = Internal
  refByName: {type: String, required: true}, // Referred By User(Name)

  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},
  orgs: {type: [String], required: false}, // Organizations IDs(_id): Allowed Organizations Users
  orgNames: {type: [String], required: false},

  report: {type: String, required: false},
  rprtName: {type: String, required: false},
  rprtPrimary: {type: String, required: false},
  pReports: {type: [String], required: false}, // Parent Reports

  euUser: {type: String, required: true},
  euName: {type: String, required: true},
  euMobCcNum: {type: String, required: false}, // Mobile Number with Country Code
  euEmID: {type: String, required: true, trim: true}, // Email ID
  euUID: {type: String, required: true}, // Reference Unique ID
  euPrimary: {type: String, required: true}, // MobcollB2BEuLeadsLcsile Number or Email

  leadId: {type: String, required: true, index: true},

  mVisaStatus: {type: String, required: false},  // Marketing
  mEmail: {type: String, required: false},
  mMobCc: {type: String, required: false},
  mMobNum: {type: String, required: false},
  mTexp: {type: Number, required: false},
  mPrimSkills: {type: String, required: false},
  mCurrClient: {type: String, required: false},
  mPrevClient: {type: String, required: false},
  mWrkUrls: {type: [String], required: false},
  mWrkAuthExpDtStr: {type: String, required: false},
  mUsaNatID: {type: String, required: false}, // USA issued national ID state: Number
  mUnidType: {type: String, required: false}, // USA issued national ID state Type: DL(Driving Licence)/State ID/Other
  mUnidExpDtStr: {type: String, required: false},
  mState: {type: String, required: false},
  mScode: {type: String, required: false},
  mResState: {type: String, required: false},
  mResScode: {type: String, required: false},
  mJobTitle: {type: String, required: false},
  mCertificates: {type: [String], required: false},

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.cuName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({delFlag: -1, b2b: 1, lid: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEuLeadsMrktLcs, schema);
// --- End: B2B Partner End Users Leads Marketing Lifecycles Schema --- //
