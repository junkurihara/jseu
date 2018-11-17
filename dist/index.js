"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatter = exports.encoder = exports.default = void 0;

var encoder = _interopRequireWildcard(require("./encoder.js"));

exports.encoder = encoder;

var formatter = _interopRequireWildcard(require("./formatter.js"));

exports.formatter = formatter;

/**
 * index.js
 **/
var _default = {
  encoder: encoder,
  formatter: formatter
};
exports.default = _default;