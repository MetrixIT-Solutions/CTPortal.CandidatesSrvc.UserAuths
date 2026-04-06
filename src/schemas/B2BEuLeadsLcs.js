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

// --- Begin: B2B Partner End Users Leads Lifecycles Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  lid: {type: String, required: true},
  idSeq: {
    seq: {type: String, required: true}, // Country, State and Year(2022) Moth(10) Day(10)
    cCode: {type: String, required: false}, // Country Code: IND
    sCode: {type: String, required: false}, // State Code: TS
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true}
  },
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
  obId: {type: String, required: false}, // Org Branch Record ID
  obName: {type: String, required: false}, // Org Branch Name
  obCode: {type: String, required: false}, // Org Branch Code
  obIds: {type: [String], required: false}, // Org Branches IDs(_id): Allowed Branches Users
  obNames: {type: [String], required: false},
  team: {type: String, required: false},
  tName: {type: String, required: false}, // Team Name
  tCode: {type: String, required: false}, // Team Code
  teams: {type: [String], required: false}, // Org Teams IDs(_id): Allowed Teams Users
  tNames: {type: [String], required: false},
  searchStr: {type: String, required: true}, // Consultant Name<#$>Stem OPT;
  mSearchStr: {type: String, required: true}, // Consultant Name<#$>Stem OPT;

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
  wStatus: {type: String, required: true}, // Candidate Work Status: Open, Approved, Trainy, Job Ended Trainy, Screeny, Send To Marketing, In Marketing, Job Ended Marketing, Placed, Job Ended, Terminated, Job Ended Terminated
  notes: {type: String, required: false},
  ofsVrfy: {type: Boolean, required: false}, 
  ofsVrfyNotes: {type: String, required: false},

  visaStatus: {type: String, required: false},
  tExp: {type: Number, required: true},
  primSkills: {type: String, required: true},
  wrkUrls: {type: [String], required: false},
  wrkAuthExpDtStr: {type: String, required: false},
  usaNatID: {type: String, required: false}, // USA issued national ID state: Number
  unidType: {type: String, required: false}, // USA issued national ID state Type: DL(Driving Licence)/State ID/Other
  unidExpDtStr: {type: String, required: false},
  state: {type: String, required: true},
  sCode: {type: String, required: true},
  city: {type: String, required: true}, // City, District
  cityCode: {type: String, required: false}, // City Code, District Code
  resState: {type: String, required: true}, // Residential
  resScode: {type: String, required: true},
  resCity: {type: String, required: true}, 
  resCitycode: {type: String, required: false},
  jobTitle: {type: String, required: true},
  certificates: {type: [String], required: false},

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

  temp: [{
    _id: {type: String, required: false}, // Template _id
    tempCat: {type: String, required: false},
    tempName: {type: String, required: false},
    urID: {type: String, required: false}, // User Role: _id
    userRole: {type: String, required: false}, // User Role: rName
    urSeq: {type: Number, required: false}, // User Role Sequence: rSeq
    tdCount: {type: Number, default: 0}, // Template Data Count
    tdpCount: {type: Number, default: 0}, // Template Data Provided Count
    tdaCount: {type: Number, default: 0}, // Template Data Approved Count
  }],

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

  priority: {type: String, required: false},

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({delFlag: -1, b2b: 1, lid: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEuLeadsLcs, schema);
// --- End: B2B Partner End Users Leads Lifecycles Schema --- //
