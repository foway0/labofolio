// TODO another package ???
const error = require('./error_handler');
const parser = require('./parser');
const wrapper = require('./wrapper');
const log4js = require('./log4js');
const is = require('./type_checker');

module.exports = {
  error,
  parser,
  wrapper,
  log4js,
  is,
};