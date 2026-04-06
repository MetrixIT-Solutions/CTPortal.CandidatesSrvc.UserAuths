/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const apiServerStatus = () => {
  return {httpStatus: 200, status: '200', resData: {message: 'CT(Candidates Tracking) Portal End Users - B2B End Users / Candidates / Applicants Login Authentication API Service.'}};
}
const successRes = (result) => ({httpStatus: 200, status: '200', resData: {message: 'Success', result}});
const noData = (result) => ({httpStatus: 400, status: '204', resData: {message: '204 - No Data Found', result}});
const mandatory = () => ({httpStatus: 400, status: '198', resData: {message: 'Provide required field(s) data'}});
const unKnownErr = (result) => ({httpStatus: 500, status: '199', resData: {message: '500 - Unknown Error', result}});

const tokenSsnErr = () => ({httpStatus: 400, status: '189', resData: {message: 'Session error'}});
const tokenExpired = () => ({httpStatus: 400, status: '190', resData: {message: 'Token Expired'}});
const tokenInvalid = () => ({httpStatus: 500, status: '191', resData: {message: 'Invalid Token'}});
const tokenRequired = () => ({httpStatus: 400, status: '192', resData: {message: 'Token is required'}});
const accessDenied = () => ({httpStatus: 400, status: '193', resData: {message: 'You do not have access'}});
const deleteFailed = () => ({httpStatus: 400, status: '194', resData: {message: 'Delete failed'}});
const updateFailed = () => ({httpStatus: 400, status: '195', resData: {message: 'Update failed'}});

const invalidCredentials = (message) => ({httpStatus: 400, status: '100', resData: {message}});
const invalidPassword = (message) => ({httpStatus: 400, status: '102', resData: {message}});
const headersRequired = () => ({httpStatus: 400, status: '103', resData: {message: 'Missed required headers data'}});
const sessionGenFailed = () => ({httpStatus: 400, status: '104', resData: {message: 'Session generation failed'}});
const sessionExpired = () => ({httpStatus: 400, status: '105', resData: {message: 'Session Expired or Invalid Request'}});
const forgotErrMsg = () => ({httpStatus: 400, status: '106', resData: {message: 'Due to security, you not allowed to use forgot password. Please contact support'}});

const accBlocked = () => ({httpStatus: 400, status: '150', resData: {message: 'Your account is blocked, try after 1 hour'}});
const accHold = () => ({httpStatus: 400, status: '151', resData: {message: 'Your account is on hold, try after 24 hours'}});
const accInactive = () => ({httpStatus: 400, status: '152', resData: {message: 'Your account is inactive, contact management'}});
const invalidStatus = (message) => ({httpStatus: 400, status: '153', resData: {message}});
const invalidIp = () => ({httpStatus: 400, status: '154', resData: {message: 'Due to security reason, you not allowed to login. Please contact support'}});

const otpSendRes = (message) => ({httpStatus: 200, status: '180', resData: message});
const otpFailedRes = (message) => ({httpStatus: 400, status: '181', resData: message});
const otpVerified = (message) => ({httpStatus: 200, status: '182', resData: message});
const otpVerFailed = (message) => ({httpStatus: 400, status: '183', resData: message});

module.exports = {
  apiServerStatus, successRes, noData, mandatory, unKnownErr, tokenSsnErr, tokenExpired, tokenInvalid, tokenRequired, accessDenied, 
  deleteFailed, updateFailed, invalidCredentials, invalidPassword, headersRequired, sessionGenFailed, sessionExpired, forgotErrMsg,
  accBlocked, accHold, accInactive, invalidStatus, invalidIp, otpSendRes, otpFailedRes, otpVerified, otpVerFailed
};
