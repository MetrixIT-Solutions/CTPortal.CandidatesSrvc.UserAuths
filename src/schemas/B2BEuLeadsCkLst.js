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

// --- Begin: B2B Partner End Users Leads Check List Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  lid: {type: String, required: true},
  leadId: {type: String, required: true},
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

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
  euPrimary: {type: String, required: true}, // Mobile Number or Email

  template: {type: String, required: true}, // Template _id
  tempName: {type: String, required: true}, // Template Name
  tempNotes: {type: String, required: false}, // Template Notes

  tempData: {
    id: {type: String, required: true}, // name: required
    seq: {type: Number, required: true}, // required
    dataType: {type: String, required: true}, // required
    data: {type: [String], required: true}, // required
    fPaths: {type: [String], required: false},
    limit: {type: Number, default: 1},
    notes: {type: String, required: false},
    flag: {type: Boolean, default: false}, // Data Provided?
    status: {type: Boolean, default: false}, // Data Approved?
  },

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
}, {collection: config.collB2BEuLeadsCkLst});

schema.index({delFlag: -1, b2b: 1, lid: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEuLeadsCkLst, schema);
// --- End: B2B Partner End Users Leads Check List Schema --- //
