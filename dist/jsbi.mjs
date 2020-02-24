"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// Copyright 2018 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// <https://apache.org/licenses/LICENSE-2.0>.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var JSBI =
/*#__PURE__*/
function (_Array) {
  _inherits(JSBI, _Array);

  function JSBI(length, sign) {
    var _this;

    _classCallCheck(this, JSBI);

    if (length > JSBI.__kMaxLength) {
      throw new RangeError('Maximum BigInt size exceeded');
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JSBI).call(this, length));
    _this.sign = sign;
    return _this;
  }

  _createClass(JSBI, [{
    key: "toDebugString",
    value: function toDebugString() {
      var result = ['BigInt['];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var digit = _step.value;
          result.push((digit ? (digit >>> 0).toString(16) : digit) + ', ');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      result.push(']');
      return result.join('');
    }
  }, {
    key: "toString",
    value: function toString() {
      var radix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      if (radix < 2 || radix > 36) {
        throw new RangeError('toString() radix argument must be between 2 and 36');
      }

      if (this.length === 0) return '0';

      if ((radix & radix - 1) === 0) {
        return JSBI.__toStringBasePowerOfTwo(this, radix);
      }

      return JSBI.__toStringGeneric(this, radix, false);
    } // Equivalent of "Number(my_bigint)" in the native implementation.

  }, {
    key: "__copy",
    value: function __copy() {
      var result = new JSBI(this.length, this.sign);

      for (var i = 0; i < this.length; i++) {
        result[i] = this[i];
      }

      return result;
    }
  }, {
    key: "__trim",
    value: function __trim() {
      var newLength = this.length;
      var last = this[newLength - 1];

      while (last === 0) {
        newLength--;
        last = this[newLength - 1];
        this.pop();
      }

      if (newLength === 0) this.sign = false;
      return this;
    }
  }, {
    key: "__initializeDigits",
    value: function __initializeDigits() {
      for (var i = 0; i < this.length; i++) {
        this[i] = 0;
      }
    }
  }, {
    key: "__clzmsd",
    value: function __clzmsd() {
      return Math.clz32(this[this.length - 1]);
    }
  }, {
    key: "__inplaceMultiplyAdd",
    value: function __inplaceMultiplyAdd(multiplier, summand, length) {
      if (length > this.length) length = this.length;
      var mLow = multiplier & 0xFFFF;
      var mHigh = multiplier >>> 16;
      var carry = 0;
      var highLower = summand & 0xFFFF;
      var highHigher = summand >>> 16;

      for (var i = 0; i < length; i++) {
        var d = this.__digit(i);

        var dLow = d & 0xFFFF;
        var dHigh = d >>> 16;
        var pLow = Math.imul(dLow, mLow);
        var pMid1 = Math.imul(dLow, mHigh);
        var pMid2 = Math.imul(dHigh, mLow);
        var pHigh = Math.imul(dHigh, mHigh);
        var rLow = highLower + (pLow & 0xFFFF);
        var rHigh = highHigher + carry + (rLow >>> 16) + (pLow >>> 16) + (pMid1 & 0xFFFF) + (pMid2 & 0xFFFF);
        highLower = (pMid1 >>> 16) + (pMid2 >>> 16) + (pHigh & 0xFFFF) + (rHigh >>> 16);
        carry = highLower >>> 16;
        highLower &= 0xFFFF;
        highHigher = pHigh >>> 16;
        var result = rLow & 0xFFFF | rHigh << 16;

        this.__setDigit(i, result);
      }

      if (carry !== 0 || highLower !== 0 || highHigher !== 0) {
        throw new Error('implementation bug');
      }
    }
  }, {
    key: "__inplaceAdd",
    // TODO: work on full digits, like __inplaceSub?
    value: function __inplaceAdd(summand, startIndex, halfDigits) {
      var carry = 0;

      for (var i = 0; i < halfDigits; i++) {
        var sum = this.__halfDigit(startIndex + i) + summand.__halfDigit(i) + carry;
        carry = sum >>> 16;

        this.__setHalfDigit(startIndex + i, sum);
      }

      return carry;
    }
  }, {
    key: "__inplaceSub",
    value: function __inplaceSub(subtrahend, startIndex, halfDigits) {
      var fullSteps = halfDigits - 1 >>> 1;
      var borrow = 0;

      if (startIndex & 1) {
        // this:   [..][..][..]
        // subtr.:   [..][..]
        startIndex >>= 1;

        var current = this.__digit(startIndex);

        var r0 = current & 0xFFFF;
        var i = 0;

        for (; i < fullSteps; i++) {
          var _sub = subtrahend.__digit(i);

          var _r = (current >>> 16) - (_sub & 0xFFFF) - borrow;

          borrow = _r >>> 16 & 1;

          this.__setDigit(startIndex + i, _r << 16 | r0 & 0xFFFF);

          current = this.__digit(startIndex + i + 1);
          r0 = (current & 0xFFFF) - (_sub >>> 16) - borrow;
          borrow = r0 >>> 16 & 1;
        } // Unrolling the last iteration gives a 5% performance benefit!


        var sub = subtrahend.__digit(i);

        var r16 = (current >>> 16) - (sub & 0xFFFF) - borrow;
        borrow = r16 >>> 16 & 1;

        this.__setDigit(startIndex + i, r16 << 16 | r0 & 0xFFFF);

        var subTop = sub >>> 16;

        if (startIndex + i + 1 >= this.length) {
          throw new RangeError('out of bounds');
        }

        if ((halfDigits & 1) === 0) {
          current = this.__digit(startIndex + i + 1);
          r0 = (current & 0xFFFF) - subTop - borrow;
          borrow = r0 >>> 16 & 1;

          this.__setDigit(startIndex + subtrahend.length, current & 0xFFFF0000 | r0 & 0xFFFF);
        }
      } else {
        startIndex >>= 1;
        var _i = 0;

        for (; _i < subtrahend.length - 1; _i++) {
          var _current2 = this.__digit(startIndex + _i);

          var _sub3 = subtrahend.__digit(_i);

          var _r4 = (_current2 & 0xFFFF) - (_sub3 & 0xFFFF) - borrow;

          borrow = _r4 >>> 16 & 1;

          var _r5 = (_current2 >>> 16) - (_sub3 >>> 16) - borrow;

          borrow = _r5 >>> 16 & 1;

          this.__setDigit(startIndex + _i, _r5 << 16 | _r4 & 0xFFFF);
        }

        var _current = this.__digit(startIndex + _i);

        var _sub2 = subtrahend.__digit(_i);

        var _r2 = (_current & 0xFFFF) - (_sub2 & 0xFFFF) - borrow;

        borrow = _r2 >>> 16 & 1;
        var _r3 = 0;

        if ((halfDigits & 1) === 0) {
          _r3 = (_current >>> 16) - (_sub2 >>> 16) - borrow;
          borrow = _r3 >>> 16 & 1;
        }

        this.__setDigit(startIndex + _i, _r3 << 16 | _r2 & 0xFFFF);
      }

      return borrow;
    }
  }, {
    key: "__inplaceRightShift",
    value: function __inplaceRightShift(shift) {
      if (shift === 0) return;
      var carry = this.__digit(0) >>> shift;
      var last = this.length - 1;

      for (var i = 0; i < last; i++) {
        var d = this.__digit(i + 1);

        this.__setDigit(i, d << 32 - shift | carry);

        carry = d >>> shift;
      }

      this.__setDigit(last, carry);
    }
  }, {
    key: "__digit",
    // Digit helpers.
    value: function __digit(i) {
      return this[i];
    }
  }, {
    key: "__unsignedDigit",
    value: function __unsignedDigit(i) {
      return this[i] >>> 0;
    }
  }, {
    key: "__setDigit",
    value: function __setDigit(i, digit) {
      this[i] = digit | 0;
    }
  }, {
    key: "__setDigitGrow",
    value: function __setDigitGrow(i, digit) {
      this[i] = digit | 0;
    }
  }, {
    key: "__halfDigitLength",
    value: function __halfDigitLength() {
      var len = this.length;
      if (this.__unsignedDigit(len - 1) <= 0xFFFF) return len * 2 - 1;
      return len * 2;
    }
  }, {
    key: "__halfDigit",
    value: function __halfDigit(i) {
      return this[i >>> 1] >>> ((i & 1) << 4) & 0xFFFF;
    }
  }, {
    key: "__setHalfDigit",
    value: function __setHalfDigit(i, value) {
      var digitIndex = i >>> 1;

      var previous = this.__digit(digitIndex);

      var updated = i & 1 ? previous & 0xFFFF | value << 16 : previous & 0xFFFF0000 | value & 0xFFFF;

      this.__setDigit(digitIndex, updated);
    }
  }], [{
    key: "BigInt",
    value: function BigInt(arg) {
      if (typeof arg === 'number') {
        if (arg === 0) return JSBI.__zero();

        if ((arg | 0) === arg) {
          if (arg < 0) {
            return JSBI.__oneDigit(-arg, true);
          }

          return JSBI.__oneDigit(arg, false);
        }

        if (!Number.isFinite(arg) || Math.floor(arg) !== arg) {
          throw new RangeError('The number ' + arg + ' cannot be converted to ' + 'BigInt because it is not an integer');
        }

        return JSBI.__fromDouble(arg);
      } else if (typeof arg === 'string') {
        var result = JSBI.__fromString(arg);

        if (result === null) {
          throw new SyntaxError('Cannot convert ' + arg + ' to a BigInt');
        }

        return result;
      } else if (typeof arg === 'boolean') {
        if (arg === true) {
          return JSBI.__oneDigit(1, false);
        }

        return JSBI.__zero();
      } else if (_typeof(arg) === 'object') {
        if (arg.constructor === JSBI) return arg;

        var primitive = JSBI.__toPrimitive(arg);

        return JSBI.BigInt(primitive);
      }

      throw new TypeError('Cannot convert ' + arg + ' to a BigInt');
    }
  }, {
    key: "toNumber",
    value: function toNumber(x) {
      var xLength = x.length;
      if (xLength === 0) return 0;

      if (xLength === 1) {
        var value = x.__unsignedDigit(0);

        return x.sign ? -value : value;
      }

      var xMsd = x.__digit(xLength - 1);

      var msdLeadingZeros = Math.clz32(xMsd);
      var xBitLength = xLength * 32 - msdLeadingZeros;
      if (xBitLength > 1024) return x.sign ? -Infinity : Infinity;
      var exponent = xBitLength - 1;
      var currentDigit = xMsd;
      var digitIndex = xLength - 1;
      var shift = msdLeadingZeros + 1;
      var mantissaHigh = shift === 32 ? 0 : currentDigit << shift;
      mantissaHigh >>>= 12;
      var mantissaHighBitsUnset = shift - 12;
      var mantissaLow = shift >= 12 ? 0 : currentDigit << 20 + shift;
      var mantissaLowBitsUnset = 20 + shift;

      if (mantissaHighBitsUnset > 0 && digitIndex > 0) {
        digitIndex--;
        currentDigit = x.__digit(digitIndex);
        mantissaHigh |= currentDigit >>> 32 - mantissaHighBitsUnset;
        mantissaLow = currentDigit << mantissaHighBitsUnset;
        mantissaLowBitsUnset = mantissaHighBitsUnset;
      }

      if (mantissaLowBitsUnset > 0 && digitIndex > 0) {
        digitIndex--;
        currentDigit = x.__digit(digitIndex);
        mantissaLow |= currentDigit >>> 32 - mantissaLowBitsUnset;
        mantissaLowBitsUnset -= 32;
      }

      var rounding = JSBI.__decideRounding(x, mantissaLowBitsUnset, digitIndex, currentDigit);

      if (rounding === 1 || rounding === 0 && (mantissaLow & 1) === 1) {
        mantissaLow = mantissaLow + 1 >>> 0;

        if (mantissaLow === 0) {
          // Incrementing mantissaLow overflowed.
          mantissaHigh++;

          if (mantissaHigh >>> 20 !== 0) {
            // Incrementing mantissaHigh overflowed.
            mantissaHigh = 0;
            exponent++;

            if (exponent > 1023) {
              // Incrementing the exponent overflowed.
              return x.sign ? -Infinity : Infinity;
            }
          }
        }
      }

      var signBit = x.sign ? 1 << 31 : 0;
      exponent = exponent + 0x3FF << 20;
      JSBI.__kBitConversionInts[1] = signBit | exponent | mantissaHigh;
      JSBI.__kBitConversionInts[0] = mantissaLow;
      return JSBI.__kBitConversionDouble[0];
    } // Operations.

  }, {
    key: "unaryMinus",
    value: function unaryMinus(x) {
      if (x.length === 0) return x;

      var result = x.__copy();

      result.sign = !x.sign;
      return result;
    }
  }, {
    key: "bitwiseNot",
    value: function bitwiseNot(x) {
      if (x.sign) {
        // ~(-x) == ~(~(x-1)) == x-1
        return JSBI.__absoluteSubOne(x).__trim();
      } // ~x == -x-1 == -(x+1)


      return JSBI.__absoluteAddOne(x, true);
    }
  }, {
    key: "exponentiate",
    value: function exponentiate(x, y) {
      if (y.sign) {
        throw new RangeError('Exponent must be positive');
      }

      if (y.length === 0) {
        return JSBI.__oneDigit(1, false);
      }

      if (x.length === 0) return x;

      if (x.length === 1 && x.__digit(0) === 1) {
        // (-1) ** even_number == 1.
        if (x.sign && (y.__digit(0) & 1) === 0) {
          return JSBI.unaryMinus(x);
        } // (-1) ** odd_number == -1, 1 ** anything == 1.


        return x;
      } // For all bases >= 2, very large exponents would lead to unrepresentable
      // results.


      if (y.length > 1) throw new RangeError('BigInt too big');

      var expValue = y.__unsignedDigit(0);

      if (expValue === 1) return x;

      if (expValue >= JSBI.__kMaxLengthBits) {
        throw new RangeError('BigInt too big');
      }

      if (x.length === 1 && x.__digit(0) === 2) {
        // Fast path for 2^n.
        var neededDigits = 1 + (expValue >>> 5);
        var sign = x.sign && (expValue & 1) !== 0;

        var _result = new JSBI(neededDigits, sign);

        _result.__initializeDigits(); // All bits are zero. Now set the n-th bit.


        var msd = 1 << (expValue & 31);

        _result.__setDigit(neededDigits - 1, msd);

        return _result;
      }

      var result = null;
      var runningSquare = x; // This implicitly sets the result's sign correctly.

      if ((expValue & 1) !== 0) result = x;
      expValue >>= 1;

      for (; expValue !== 0; expValue >>= 1) {
        runningSquare = JSBI.multiply(runningSquare, runningSquare);

        if ((expValue & 1) !== 0) {
          if (result === null) {
            result = runningSquare;
          } else {
            result = JSBI.multiply(result, runningSquare);
          }
        }
      }

      return result;
    }
  }, {
    key: "multiply",
    value: function multiply(x, y) {
      if (x.length === 0) return x;
      if (y.length === 0) return y;
      var resultLength = x.length + y.length;

      if (x.__clzmsd() + y.__clzmsd() >= 32) {
        resultLength--;
      }

      var result = new JSBI(resultLength, x.sign !== y.sign);

      result.__initializeDigits();

      for (var i = 0; i < x.length; i++) {
        JSBI.__multiplyAccumulate(y, x.__digit(i), result, i);
      }

      return result.__trim();
    }
  }, {
    key: "divide",
    value: function divide(x, y) {
      if (y.length === 0) throw new RangeError('Division by zero');
      if (JSBI.__absoluteCompare(x, y) < 0) return JSBI.__zero();
      var resultSign = x.sign !== y.sign;

      var divisor = y.__unsignedDigit(0);

      var quotient;

      if (y.length === 1 && divisor <= 0xFFFF) {
        if (divisor === 1) {
          return resultSign === x.sign ? x : JSBI.unaryMinus(x);
        }

        quotient = JSBI.__absoluteDivSmall(x, divisor, null);
      } else {
        quotient = JSBI.__absoluteDivLarge(x, y, true, false);
      }

      quotient.sign = resultSign;
      return quotient.__trim();
    }
  }, {
    key: "remainder",
    value: function remainder(x, y) {
      if (y.length === 0) throw new RangeError('Division by zero');
      if (JSBI.__absoluteCompare(x, y) < 0) return x;

      var divisor = y.__unsignedDigit(0);

      if (y.length === 1 && divisor <= 0xFFFF) {
        if (divisor === 1) return JSBI.__zero();

        var remainderDigit = JSBI.__absoluteModSmall(x, divisor);

        if (remainderDigit === 0) return JSBI.__zero();
        return JSBI.__oneDigit(remainderDigit, x.sign);
      }

      var remainder = JSBI.__absoluteDivLarge(x, y, false, true);

      remainder.sign = x.sign;
      return remainder.__trim();
    }
  }, {
    key: "add",
    value: function add(x, y) {
      var sign = x.sign;

      if (sign === y.sign) {
        // x + y == x + y
        // -x + -y == -(x + y)
        return JSBI.__absoluteAdd(x, y, sign);
      } // x + -y == x - y == -(y - x)
      // -x + y == y - x == -(x - y)


      if (JSBI.__absoluteCompare(x, y) >= 0) {
        return JSBI.__absoluteSub(x, y, sign);
      }

      return JSBI.__absoluteSub(y, x, !sign);
    }
  }, {
    key: "subtract",
    value: function subtract(x, y) {
      var sign = x.sign;

      if (sign !== y.sign) {
        // x - (-y) == x + y
        // (-x) - y == -(x + y)
        return JSBI.__absoluteAdd(x, y, sign);
      } // x - y == -(y - x)
      // (-x) - (-y) == y - x == -(x - y)


      if (JSBI.__absoluteCompare(x, y) >= 0) {
        return JSBI.__absoluteSub(x, y, sign);
      }

      return JSBI.__absoluteSub(y, x, !sign);
    }
  }, {
    key: "leftShift",
    value: function leftShift(x, y) {
      if (y.length === 0 || x.length === 0) return x;
      if (y.sign) return JSBI.__rightShiftByAbsolute(x, y);
      return JSBI.__leftShiftByAbsolute(x, y);
    }
  }, {
    key: "signedRightShift",
    value: function signedRightShift(x, y) {
      if (y.length === 0 || x.length === 0) return x;
      if (y.sign) return JSBI.__leftShiftByAbsolute(x, y);
      return JSBI.__rightShiftByAbsolute(x, y);
    }
  }, {
    key: "unsignedRightShift",
    value: function unsignedRightShift() {
      throw new TypeError('BigInts have no unsigned right shift; use >> instead');
    }
  }, {
    key: "lessThan",
    value: function lessThan(x, y) {
      return JSBI.__compareToBigInt(x, y) < 0;
    }
  }, {
    key: "lessThanOrEqual",
    value: function lessThanOrEqual(x, y) {
      return JSBI.__compareToBigInt(x, y) <= 0;
    }
  }, {
    key: "greaterThan",
    value: function greaterThan(x, y) {
      return JSBI.__compareToBigInt(x, y) > 0;
    }
  }, {
    key: "greaterThanOrEqual",
    value: function greaterThanOrEqual(x, y) {
      return JSBI.__compareToBigInt(x, y) >= 0;
    }
  }, {
    key: "equal",
    value: function equal(x, y) {
      if (x.sign !== y.sign) return false;
      if (x.length !== y.length) return false;

      for (var i = 0; i < x.length; i++) {
        if (x.__digit(i) !== y.__digit(i)) return false;
      }

      return true;
    }
  }, {
    key: "notEqual",
    value: function notEqual(x, y) {
      return !JSBI.equal(x, y);
    }
  }, {
    key: "bitwiseAnd",
    value: function bitwiseAnd(x, y) {
      if (!x.sign && !y.sign) {
        return JSBI.__absoluteAnd(x, y).__trim();
      } else if (x.sign && y.sign) {
        var resultLength = Math.max(x.length, y.length) + 1; // (-x) & (-y) == ~(x-1) & ~(y-1) == ~((x-1) | (y-1))
        // == -(((x-1) | (y-1)) + 1)

        var result = JSBI.__absoluteSubOne(x, resultLength);

        var y1 = JSBI.__absoluteSubOne(y);

        result = JSBI.__absoluteOr(result, y1, result);
        return JSBI.__absoluteAddOne(result, true, result).__trim();
      } // Assume that x is the positive BigInt.


      if (x.sign) {
        var _ref = [y, x];
        x = _ref[0];
        y = _ref[1];
      } // x & (-y) == x & ~(y-1) == x &~ (y-1)


      return JSBI.__absoluteAndNot(x, JSBI.__absoluteSubOne(y)).__trim();
    }
  }, {
    key: "bitwiseXor",
    value: function bitwiseXor(x, y) {
      if (!x.sign && !y.sign) {
        return JSBI.__absoluteXor(x, y).__trim();
      } else if (x.sign && y.sign) {
        // (-x) ^ (-y) == ~(x-1) ^ ~(y-1) == (x-1) ^ (y-1)
        var _resultLength = Math.max(x.length, y.length);

        var _result2 = JSBI.__absoluteSubOne(x, _resultLength);

        var y1 = JSBI.__absoluteSubOne(y);

        return JSBI.__absoluteXor(_result2, y1, _result2).__trim();
      }

      var resultLength = Math.max(x.length, y.length) + 1; // Assume that x is the positive BigInt.

      if (x.sign) {
        var _ref2 = [y, x];
        x = _ref2[0];
        y = _ref2[1];
      } // x ^ (-y) == x ^ ~(y-1) == ~(x ^ (y-1)) == -((x ^ (y-1)) + 1)


      var result = JSBI.__absoluteSubOne(y, resultLength);

      result = JSBI.__absoluteXor(result, x, result);
      return JSBI.__absoluteAddOne(result, true, result).__trim();
    }
  }, {
    key: "bitwiseOr",
    value: function bitwiseOr(x, y) {
      var resultLength = Math.max(x.length, y.length);

      if (!x.sign && !y.sign) {
        return JSBI.__absoluteOr(x, y).__trim();
      } else if (x.sign && y.sign) {
        // (-x) | (-y) == ~(x-1) | ~(y-1) == ~((x-1) & (y-1))
        // == -(((x-1) & (y-1)) + 1)
        var _result3 = JSBI.__absoluteSubOne(x, resultLength);

        var y1 = JSBI.__absoluteSubOne(y);

        _result3 = JSBI.__absoluteAnd(_result3, y1, _result3);
        return JSBI.__absoluteAddOne(_result3, true, _result3).__trim();
      } // Assume that x is the positive BigInt.


      if (x.sign) {
        var _ref3 = [y, x];
        x = _ref3[0];
        y = _ref3[1];
      } // x | (-y) == x | ~(y-1) == ~((y-1) &~ x) == -(((y-1) ~& x) + 1)


      var result = JSBI.__absoluteSubOne(y, resultLength);

      result = JSBI.__absoluteAndNot(result, x, result);
      return JSBI.__absoluteAddOne(result, true, result).__trim();
    }
  }, {
    key: "asIntN",
    value: function asIntN(n, x) {
      if (x.length === 0) return x;
      if (n === 0) return JSBI.__zero(); // If {x} has less than {n} bits, return it directly.

      if (n >= JSBI.__kMaxLengthBits) return x;
      var neededLength = n + 31 >>> 5;
      if (x.length < neededLength) return x;

      var topDigit = x.__unsignedDigit(neededLength - 1);

      var compareDigit = 1 << (n - 1 & 31);
      if (x.length === neededLength && topDigit < compareDigit) return x; // Otherwise truncate and simulate two's complement.

      var hasBit = (topDigit & compareDigit) === compareDigit;
      if (!hasBit) return JSBI.__truncateToNBits(n, x);
      if (!x.sign) return JSBI.__truncateAndSubFromPowerOfTwo(n, x, true);

      if ((topDigit & compareDigit - 1) === 0) {
        for (var i = neededLength - 2; i >= 0; i--) {
          if (x.__digit(i) !== 0) {
            return JSBI.__truncateAndSubFromPowerOfTwo(n, x, false);
          }
        }

        if (x.length === neededLength && topDigit === compareDigit) return x;
        return JSBI.__truncateToNBits(n, x);
      }

      return JSBI.__truncateAndSubFromPowerOfTwo(n, x, false);
    }
  }, {
    key: "asUintN",
    value: function asUintN(n, x) {
      if (x.length === 0) return x;
      if (n === 0) return JSBI.__zero(); // If {x} is negative, simulate two's complement representation.

      if (x.sign) {
        if (n > JSBI.__kMaxLengthBits) {
          throw new RangeError('BigInt too big');
        }

        return JSBI.__truncateAndSubFromPowerOfTwo(n, x, false);
      } // If {x} is positive and has up to {n} bits, return it directly.


      if (n >= JSBI.__kMaxLengthBits) return x;
      var neededLength = n + 31 >>> 5;
      if (x.length < neededLength) return x;
      var bitsInTopDigit = n & 31;

      if (x.length == neededLength) {
        if (bitsInTopDigit === 0) return x;

        var topDigit = x.__digit(neededLength - 1);

        if (topDigit >>> bitsInTopDigit === 0) return x;
      } // Otherwise, truncate.


      return JSBI.__truncateToNBits(n, x);
    } // Operators.

  }, {
    key: "ADD",
    value: function ADD(x, y) {
      x = JSBI.__toPrimitive(x);
      y = JSBI.__toPrimitive(y);

      if (typeof x === 'string') {
        if (typeof y !== 'string') y = y.toString();
        return x + y;
      }

      if (typeof y === 'string') {
        return x.toString() + y;
      }

      x = JSBI.__toNumeric(x);
      y = JSBI.__toNumeric(y);

      if (JSBI.__isBigInt(x) && JSBI.__isBigInt(y)) {
        return JSBI.add(x, y);
      }

      if (typeof x === 'number' && typeof y === 'number') {
        return x + y;
      }

      throw new TypeError('Cannot mix BigInt and other types, use explicit conversions');
    }
  }, {
    key: "LT",
    value: function LT(x, y) {
      return JSBI.__compare(x, y, 0);
    }
  }, {
    key: "LE",
    value: function LE(x, y) {
      return JSBI.__compare(x, y, 1);
    }
  }, {
    key: "GT",
    value: function GT(x, y) {
      return JSBI.__compare(x, y, 2);
    }
  }, {
    key: "GE",
    value: function GE(x, y) {
      return JSBI.__compare(x, y, 3);
    }
  }, {
    key: "EQ",
    value: function EQ(x, y) {
      while (true) {
        if (JSBI.__isBigInt(x)) {
          if (JSBI.__isBigInt(y)) return JSBI.equal(x, y);
          return JSBI.EQ(y, x);
        } else if (typeof x === 'number') {
          if (JSBI.__isBigInt(y)) return JSBI.__equalToNumber(y, x);
          if (_typeof(y) !== 'object') return x == y;
          y = JSBI.__toPrimitive(y);
        } else if (typeof x === 'string') {
          if (JSBI.__isBigInt(y)) {
            x = JSBI.__fromString(x);
            if (x === null) return false;
            return JSBI.equal(x, y);
          }

          if (_typeof(y) !== 'object') return x == y;
          y = JSBI.__toPrimitive(y);
        } else if (typeof x === 'boolean') {
          if (JSBI.__isBigInt(y)) return JSBI.__equalToNumber(y, +x);
          if (_typeof(y) !== 'object') return x == y;
          y = JSBI.__toPrimitive(y);
        } else if (_typeof(x) === 'symbol') {
          if (JSBI.__isBigInt(y)) return false;
          if (_typeof(y) !== 'object') return x == y;
          y = JSBI.__toPrimitive(y);
        } else if (_typeof(x) === 'object') {
          if (_typeof(y) === 'object' && y.constructor !== JSBI) return x == y;
          x = JSBI.__toPrimitive(x);
        } else {
          return x == y;
        }
      }
    }
  }, {
    key: "NE",
    value: function NE(x, y) {
      return !JSBI.EQ(x, y);
    } // Helpers.

  }, {
    key: "__zero",
    value: function __zero() {
      return new JSBI(0, false);
    }
  }, {
    key: "__oneDigit",
    value: function __oneDigit(value, sign) {
      var result = new JSBI(1, sign);

      result.__setDigit(0, value);

      return result;
    }
  }, {
    key: "__decideRounding",
    value: function __decideRounding(x, mantissaBitsUnset, digitIndex, currentDigit) {
      if (mantissaBitsUnset > 0) return -1;
      var topUnconsumedBit;

      if (mantissaBitsUnset < 0) {
        topUnconsumedBit = -mantissaBitsUnset - 1;
      } else {
        // {currentDigit} fit the mantissa exactly; look at the next digit.
        if (digitIndex === 0) return -1;
        digitIndex--;
        currentDigit = x.__digit(digitIndex);
        topUnconsumedBit = 31;
      } // If the most significant remaining bit is 0, round down.


      var mask = 1 << topUnconsumedBit;
      if ((currentDigit & mask) === 0) return -1; // If any other remaining bit is set, round up.

      mask -= 1;
      if ((currentDigit & mask) !== 0) return 1;

      while (digitIndex > 0) {
        digitIndex--;
        if (x.__digit(digitIndex) !== 0) return 1;
      }

      return 0;
    }
  }, {
    key: "__fromDouble",
    value: function __fromDouble(value) {
      var sign = value < 0;
      JSBI.__kBitConversionDouble[0] = value;
      var rawExponent = JSBI.__kBitConversionInts[1] >>> 20 & 0x7FF;
      var exponent = rawExponent - 0x3FF;
      var digits = (exponent >>> 5) + 1;
      var result = new JSBI(digits, sign);
      var kHiddenBit = 0x00100000;
      var mantissaHigh = JSBI.__kBitConversionInts[1] & 0xFFFFF | kHiddenBit;
      var mantissaLow = JSBI.__kBitConversionInts[0];
      var kMantissaHighTopBit = 20; // 0-indexed position of most significant bit in most significant digit.

      var msdTopBit = exponent & 31; // Number of unused bits in the mantissa. We'll keep them shifted to the
      // left (i.e. most significant part).

      var remainingMantissaBits = 0; // Next digit under construction.

      var digit; // First, build the MSD by shifting the mantissa appropriately.

      if (msdTopBit < kMantissaHighTopBit) {
        var shift = kMantissaHighTopBit - msdTopBit;
        remainingMantissaBits = shift + 32;
        digit = mantissaHigh >>> shift;
        mantissaHigh = mantissaHigh << 32 - shift | mantissaLow >>> shift;
        mantissaLow = mantissaLow << 32 - shift;
      } else if (msdTopBit === kMantissaHighTopBit) {
        remainingMantissaBits = 32;
        digit = mantissaHigh;
        mantissaHigh = mantissaLow;
      } else {
        var _shift = msdTopBit - kMantissaHighTopBit;

        remainingMantissaBits = 32 - _shift;
        digit = mantissaHigh << _shift | mantissaLow >>> 32 - _shift;
        mantissaHigh = mantissaLow << _shift;
      }

      result.__setDigit(digits - 1, digit); // Then fill in the rest of the digits.


      for (var digitIndex = digits - 2; digitIndex >= 0; digitIndex--) {
        if (remainingMantissaBits > 0) {
          remainingMantissaBits -= 32;
          digit = mantissaHigh;
          mantissaHigh = mantissaLow;
        } else {
          digit = 0;
        }

        result.__setDigit(digitIndex, digit);
      }

      return result.__trim();
    }
  }, {
    key: "__isWhitespace",
    value: function __isWhitespace(c) {
      if (c <= 0x0D && c >= 0x09) return true;
      if (c <= 0x9F) return c === 0x20;

      if (c <= 0x01FFFF) {
        return c === 0xA0 || c === 0x1680;
      }

      if (c <= 0x02FFFF) {
        c &= 0x01FFFF;
        return c <= 0x0A || c === 0x28 || c === 0x29 || c === 0x2F || c === 0x5F || c === 0x1000;
      }

      return c === 0xFEFF;
    }
  }, {
    key: "__fromString",
    value: function __fromString(string) {
      var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var sign = 0;
      var leadingZero = false;
      var length = string.length;
      var cursor = 0;
      if (cursor === length) return JSBI.__zero();
      var current = string.charCodeAt(cursor); // Skip whitespace.

      while (JSBI.__isWhitespace(current)) {
        if (++cursor === length) return JSBI.__zero();
        current = string.charCodeAt(cursor);
      } // Detect radix.


      if (current === 0x2B) {
        // '+'
        if (++cursor === length) return null;
        current = string.charCodeAt(cursor);
        sign = 1;
      } else if (current === 0x2D) {
        // '-'
        if (++cursor === length) return null;
        current = string.charCodeAt(cursor);
        sign = -1;
      }

      if (radix === 0) {
        radix = 10;

        if (current === 0x30) {
          // '0'
          if (++cursor === length) return JSBI.__zero();
          current = string.charCodeAt(cursor);

          if (current === 0x58 || current === 0x78) {
            // 'X' or 'x'
            radix = 16;
            if (++cursor === length) return null;
            current = string.charCodeAt(cursor);
          } else if (current === 0x4F || current === 0x6F) {
            // 'O' or 'o'
            radix = 8;
            if (++cursor === length) return null;
            current = string.charCodeAt(cursor);
          } else if (current === 0x42 || current === 0x62) {
            // 'B' or 'b'
            radix = 2;
            if (++cursor === length) return null;
            current = string.charCodeAt(cursor);
          } else {
            leadingZero = true;
          }
        }
      } else if (radix === 16) {
        if (current === 0x30) {
          // '0'
          // Allow "0x" prefix.
          if (++cursor === length) return JSBI.__zero();
          current = string.charCodeAt(cursor);

          if (current === 0x58 || current === 0x78) {
            // 'X' or 'x'
            if (++cursor === length) return null;
            current = string.charCodeAt(cursor);
          } else {
            leadingZero = true;
          }
        }
      } // Skip leading zeros.


      while (current === 0x30) {
        leadingZero = true;
        if (++cursor === length) return JSBI.__zero();
        current = string.charCodeAt(cursor);
      } // Allocate result.


      var chars = length - cursor;
      var bitsPerChar = JSBI.__kMaxBitsPerChar[radix];
      var roundup = JSBI.__kBitsPerCharTableMultiplier - 1;
      if (chars > (1 << 30) / bitsPerChar) return null;
      var bitsMin = bitsPerChar * chars + roundup >>> JSBI.__kBitsPerCharTableShift;
      var resultLength = bitsMin + 31 >>> 5;
      var result = new JSBI(resultLength, false); // Parse.

      var limDigit = radix < 10 ? radix : 10;
      var limAlpha = radix > 10 ? radix - 10 : 0;

      if ((radix & radix - 1) === 0) {
        // Power-of-two radix.
        bitsPerChar >>= JSBI.__kBitsPerCharTableShift;
        var parts = [];
        var partsBits = [];
        var done = false;

        do {
          var part = 0;
          var bits = 0;

          while (true) {
            var d = void 0;

            if (current - 48 >>> 0 < limDigit) {
              d = current - 48;
            } else if ((current | 32) - 97 >>> 0 < limAlpha) {
              d = (current | 32) - 87;
            } else {
              done = true;
              break;
            }

            bits += bitsPerChar;
            part = part << bitsPerChar | d;

            if (++cursor === length) {
              done = true;
              break;
            }

            current = string.charCodeAt(cursor);
            if (bits + bitsPerChar > 32) break;
          }

          parts.push(part);
          partsBits.push(bits);
        } while (!done);

        JSBI.__fillFromParts(result, parts, partsBits);
      } else {
        result.__initializeDigits();

        var _done = false;
        var charsSoFar = 0;

        do {
          var _part = 0;
          var multiplier = 1;

          while (true) {
            var _d = void 0;

            if (current - 48 >>> 0 < limDigit) {
              _d = current - 48;
            } else if ((current | 32) - 97 >>> 0 < limAlpha) {
              _d = (current | 32) - 87;
            } else {
              _done = true;
              break;
            }

            var m = multiplier * radix;
            if (m > 0xFFFFFFFF) break;
            multiplier = m;
            _part = _part * radix + _d;
            charsSoFar++;

            if (++cursor === length) {
              _done = true;
              break;
            }

            current = string.charCodeAt(cursor);
          }

          roundup = JSBI.__kBitsPerCharTableMultiplier * 32 - 1;
          var digitsSoFar = bitsPerChar * charsSoFar + roundup >>> JSBI.__kBitsPerCharTableShift + 5;

          result.__inplaceMultiplyAdd(multiplier, _part, digitsSoFar);
        } while (!_done);
      }

      if (cursor !== length) {
        if (!JSBI.__isWhitespace(current)) return null;

        for (cursor++; cursor < length; cursor++) {
          current = string.charCodeAt(cursor);
          if (!JSBI.__isWhitespace(current)) return null;
        }
      } // Get result.


      if (sign !== 0 && radix !== 10) return null;
      result.sign = sign === -1;
      return result.__trim();
    }
  }, {
    key: "__fillFromParts",
    value: function __fillFromParts(result, parts, partsBits) {
      var digitIndex = 0;
      var digit = 0;
      var bitsInDigit = 0;

      for (var i = parts.length - 1; i >= 0; i--) {
        var part = parts[i];
        var partBits = partsBits[i];
        digit |= part << bitsInDigit;
        bitsInDigit += partBits;

        if (bitsInDigit === 32) {
          result.__setDigit(digitIndex++, digit);

          bitsInDigit = 0;
          digit = 0;
        } else if (bitsInDigit > 32) {
          result.__setDigit(digitIndex++, digit);

          bitsInDigit -= 32;
          digit = part >>> partBits - bitsInDigit;
        }
      }

      if (digit !== 0) {
        if (digitIndex >= result.length) throw new Error('implementation bug');

        result.__setDigit(digitIndex++, digit);
      }

      for (; digitIndex < result.length; digitIndex++) {
        result.__setDigit(digitIndex, 0);
      }
    }
  }, {
    key: "__toStringBasePowerOfTwo",
    value: function __toStringBasePowerOfTwo(x, radix) {
      var length = x.length;
      var bits = radix - 1;
      bits = (bits >>> 1 & 0x55) + (bits & 0x55);
      bits = (bits >>> 2 & 0x33) + (bits & 0x33);
      bits = (bits >>> 4 & 0x0F) + (bits & 0x0F);
      var bitsPerChar = bits;
      var charMask = radix - 1;

      var msd = x.__digit(length - 1);

      var msdLeadingZeros = Math.clz32(msd);
      var bitLength = length * 32 - msdLeadingZeros;
      var charsRequired = (bitLength + bitsPerChar - 1) / bitsPerChar | 0;
      if (x.sign) charsRequired++;
      if (charsRequired > 1 << 28) throw new Error('string too long');
      var result = new Array(charsRequired);
      var pos = charsRequired - 1;
      var digit = 0;
      var availableBits = 0;

      for (var i = 0; i < length - 1; i++) {
        var newDigit = x.__digit(i);

        var _current3 = (digit | newDigit << availableBits) & charMask;

        result[pos--] = JSBI.__kConversionChars[_current3];
        var consumedBits = bitsPerChar - availableBits;
        digit = newDigit >>> consumedBits;
        availableBits = 32 - consumedBits;

        while (availableBits >= bitsPerChar) {
          result[pos--] = JSBI.__kConversionChars[digit & charMask];
          digit >>>= bitsPerChar;
          availableBits -= bitsPerChar;
        }
      }

      var current = (digit | msd << availableBits) & charMask;
      result[pos--] = JSBI.__kConversionChars[current];
      digit = msd >>> bitsPerChar - availableBits;

      while (digit !== 0) {
        result[pos--] = JSBI.__kConversionChars[digit & charMask];
        digit >>>= bitsPerChar;
      }

      if (x.sign) result[pos--] = '-';
      if (pos !== -1) throw new Error('implementation bug');
      return result.join('');
    }
  }, {
    key: "__toStringGeneric",
    value: function __toStringGeneric(x, radix, isRecursiveCall) {
      var length = x.length;
      if (length === 0) return '';

      if (length === 1) {
        var result = x.__unsignedDigit(0).toString(radix);

        if (isRecursiveCall === false && x.sign) {
          result = '-' + result;
        }

        return result;
      }

      var bitLength = length * 32 - Math.clz32(x.__digit(length - 1));
      var maxBitsPerChar = JSBI.__kMaxBitsPerChar[radix];
      var minBitsPerChar = maxBitsPerChar - 1;
      var charsRequired = bitLength * JSBI.__kBitsPerCharTableMultiplier;
      charsRequired += minBitsPerChar - 1;
      charsRequired = charsRequired / minBitsPerChar | 0;
      var secondHalfChars = charsRequired + 1 >> 1; // Divide-and-conquer: split by a power of {radix} that's approximately
      // the square root of {x}, then recurse.

      var conqueror = JSBI.exponentiate(JSBI.__oneDigit(radix, false), JSBI.__oneDigit(secondHalfChars, false));
      var quotient;
      var secondHalf;

      var divisor = conqueror.__unsignedDigit(0);

      if (conqueror.length === 1 && divisor <= 0xFFFF) {
        quotient = new JSBI(x.length, false);

        quotient.__initializeDigits();

        var remainder = 0;

        for (var i = x.length * 2 - 1; i >= 0; i--) {
          var input = remainder << 16 | x.__halfDigit(i);

          quotient.__setHalfDigit(i, input / divisor | 0);

          remainder = input % divisor | 0;
        }

        secondHalf = remainder.toString(radix);
      } else {
        var divisionResult = JSBI.__absoluteDivLarge(x, conqueror, true, true);

        quotient = divisionResult.quotient;

        var _remainder = divisionResult.remainder.__trim();

        secondHalf = JSBI.__toStringGeneric(_remainder, radix, true);
      }

      quotient.__trim();

      var firstHalf = JSBI.__toStringGeneric(quotient, radix, true);

      while (secondHalf.length < secondHalfChars) {
        secondHalf = '0' + secondHalf;
      }

      if (isRecursiveCall === false && x.sign) {
        firstHalf = '-' + firstHalf;
      }

      return firstHalf + secondHalf;
    }
  }, {
    key: "__unequalSign",
    value: function __unequalSign(leftNegative) {
      return leftNegative ? -1 : 1;
    }
  }, {
    key: "__absoluteGreater",
    value: function __absoluteGreater(bothNegative) {
      return bothNegative ? -1 : 1;
    }
  }, {
    key: "__absoluteLess",
    value: function __absoluteLess(bothNegative) {
      return bothNegative ? 1 : -1;
    }
  }, {
    key: "__compareToBigInt",
    value: function __compareToBigInt(x, y) {
      var xSign = x.sign;
      if (xSign !== y.sign) return JSBI.__unequalSign(xSign);

      var result = JSBI.__absoluteCompare(x, y);

      if (result > 0) return JSBI.__absoluteGreater(xSign);
      if (result < 0) return JSBI.__absoluteLess(xSign);
      return 0;
    }
  }, {
    key: "__compareToNumber",
    value: function __compareToNumber(x, y) {
      if (y | 0 === 0) {
        var xSign = x.sign;
        var ySign = y < 0;
        if (xSign !== ySign) return JSBI.__unequalSign(xSign);

        if (x.length === 0) {
          if (ySign) throw new Error('implementation bug');
          return y === 0 ? 0 : -1;
        } // Any multi-digit BigInt is bigger than an int32.


        if (x.length > 1) return JSBI.__absoluteGreater(xSign);
        var yAbs = Math.abs(y);

        var xDigit = x.__unsignedDigit(0);

        if (xDigit > yAbs) return JSBI.__absoluteGreater(xSign);
        if (xDigit < yAbs) return JSBI.__absoluteLess(xSign);
        return 0;
      }

      return JSBI.__compareToDouble(x, y);
    }
  }, {
    key: "__compareToDouble",
    value: function __compareToDouble(x, y) {
      if (y !== y) return y; // NaN.

      if (y === Infinity) return -1;
      if (y === -Infinity) return 1;
      var xSign = x.sign;
      var ySign = y < 0;
      if (xSign !== ySign) return JSBI.__unequalSign(xSign);

      if (y === 0) {
        throw new Error('implementation bug: should be handled elsewhere');
      }

      if (x.length === 0) return -1;
      JSBI.__kBitConversionDouble[0] = y;
      var rawExponent = JSBI.__kBitConversionInts[1] >>> 20 & 0x7FF;

      if (rawExponent === 0x7FF) {
        throw new Error('implementation bug: handled elsewhere');
      }

      var exponent = rawExponent - 0x3FF;

      if (exponent < 0) {
        // The absolute value of y is less than 1. Only 0n has an absolute
        // value smaller than that, but we've already covered that case.
        return JSBI.__absoluteGreater(xSign);
      }

      var xLength = x.length;

      var xMsd = x.__digit(xLength - 1);

      var msdLeadingZeros = Math.clz32(xMsd);
      var xBitLength = xLength * 32 - msdLeadingZeros;
      var yBitLength = exponent + 1;
      if (xBitLength < yBitLength) return JSBI.__absoluteLess(xSign);
      if (xBitLength > yBitLength) return JSBI.__absoluteGreater(xSign); // Same sign, same bit length. Shift mantissa to align with x and compare
      // bit for bit.

      var kHiddenBit = 0x00100000;
      var mantissaHigh = JSBI.__kBitConversionInts[1] & 0xFFFFF | kHiddenBit;
      var mantissaLow = JSBI.__kBitConversionInts[0];
      var kMantissaHighTopBit = 20;
      var msdTopBit = 31 - msdLeadingZeros;

      if (msdTopBit !== (xBitLength - 1) % 31) {
        throw new Error('implementation bug');
      }

      var compareMantissa; // Shifted chunk of mantissa.

      var remainingMantissaBits = 0; // First, compare most significant digit against beginning of mantissa.

      if (msdTopBit < kMantissaHighTopBit) {
        var shift = kMantissaHighTopBit - msdTopBit;
        remainingMantissaBits = shift + 32;
        compareMantissa = mantissaHigh >>> shift;
        mantissaHigh = mantissaHigh << 32 - shift | mantissaLow >>> shift;
        mantissaLow = mantissaLow << 32 - shift;
      } else if (msdTopBit === kMantissaHighTopBit) {
        remainingMantissaBits = 32;
        compareMantissa = mantissaHigh;
        mantissaHigh = mantissaLow;
      } else {
        var _shift2 = msdTopBit - kMantissaHighTopBit;

        remainingMantissaBits = 32 - _shift2;
        compareMantissa = mantissaHigh << _shift2 | mantissaLow >>> 32 - _shift2;
        mantissaHigh = mantissaLow << _shift2;
      }

      xMsd = xMsd >>> 0;
      compareMantissa = compareMantissa >>> 0;
      if (xMsd > compareMantissa) return JSBI.__absoluteGreater(xSign);
      if (xMsd < compareMantissa) return JSBI.__absoluteLess(xSign); // Then, compare additional digits against remaining mantissa bits.

      for (var digitIndex = xLength - 2; digitIndex >= 0; digitIndex--) {
        if (remainingMantissaBits > 0) {
          remainingMantissaBits -= 32;
          compareMantissa = mantissaHigh >>> 0;
          mantissaHigh = mantissaLow;
          mantissaLow = 0;
        } else {
          compareMantissa = 0;
        }

        var digit = x.__unsignedDigit(digitIndex);

        if (digit > compareMantissa) return JSBI.__absoluteGreater(xSign);
        if (digit < compareMantissa) return JSBI.__absoluteLess(xSign);
      } // Integer parts are equal; check whether {y} has a fractional part.


      if (mantissaHigh !== 0 || mantissaLow !== 0) {
        if (remainingMantissaBits === 0) throw new Error('implementation bug');
        return JSBI.__absoluteLess(xSign);
      }

      return 0;
    }
  }, {
    key: "__equalToNumber",
    value: function __equalToNumber(x, y) {
      if (y | 0 === y) {
        if (y === 0) return x.length === 0; // Any multi-digit BigInt is bigger than an int32.

        return x.length === 1 && x.sign === y < 0 && x.__unsignedDigit(0) === Math.abs(y);
      }

      return JSBI.__compareToDouble(x, y) === 0;
    } // Comparison operations, chosen such that "op ^ 2" reverses direction:
    // 0 - lessThan
    // 1 - lessThanOrEqual
    // 2 - greaterThan
    // 3 - greaterThanOrEqual

  }, {
    key: "__comparisonResultToBool",
    value: function __comparisonResultToBool(result, op) {
      switch (op) {
        case 0:
          return result < 0;

        case 1:
          return result <= 0;

        case 2:
          return result > 0;

        case 3:
          return result >= 0;
      }

      throw new Error('unreachable');
    }
  }, {
    key: "__compare",
    value: function __compare(x, y, op) {
      x = JSBI.__toPrimitive(x);
      y = JSBI.__toPrimitive(y);

      if (typeof x === 'string' && typeof y === 'string') {
        switch (op) {
          case 0:
            return x < y;

          case 1:
            return x <= y;

          case 2:
            return x > y;

          case 3:
            return x >= y;
        }
      }

      if (JSBI.__isBigInt(x) && typeof y === 'string') {
        y = JSBI.__fromString(y);
        if (y === null) return false;
        return JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(x, y), op);
      }

      if (typeof x === 'string' && JSBI.__isBigInt(y)) {
        x = JSBI.__fromString(x);
        if (x === null) return false;
        return JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(x, y), op);
      }

      x = JSBI.__toNumeric(x);
      y = JSBI.__toNumeric(y);

      if (JSBI.__isBigInt(x)) {
        if (JSBI.__isBigInt(y)) {
          return JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(x, y), op);
        }

        if (typeof y !== 'number') throw new Error('implementation bug');
        return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(x, y), op);
      }

      if (typeof x !== 'number') throw new Error('implementation bug');

      if (JSBI.__isBigInt(y)) {
        // Note that "op ^ 2" reverses the op's direction.
        return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(y, x), op ^ 2);
      }

      if (typeof y !== 'number') throw new Error('implementation bug');

      switch (op) {
        case 0:
          return x < y;

        case 1:
          return x <= y;

        case 2:
          return x > y;

        case 3:
          return x >= y;
      }
    }
  }, {
    key: "__absoluteAdd",
    value: function __absoluteAdd(x, y, resultSign) {
      if (x.length < y.length) return JSBI.__absoluteAdd(y, x, resultSign);
      if (x.length === 0) return x;
      if (y.length === 0) return x.sign === resultSign ? x : JSBI.unaryMinus(x);
      var resultLength = x.length;

      if (x.__clzmsd() === 0 || y.length === x.length && y.__clzmsd() === 0) {
        resultLength++;
      }

      var result = new JSBI(resultLength, resultSign);
      var carry = 0;
      var i = 0;

      for (; i < y.length; i++) {
        var yDigit = y.__digit(i);

        var xDigit = x.__digit(i);

        var rLow = (xDigit & 0xFFFF) + (yDigit & 0xFFFF) + carry;
        var rHigh = (xDigit >>> 16) + (yDigit >>> 16) + (rLow >>> 16);
        carry = rHigh >>> 16;

        result.__setDigit(i, rLow & 0xFFFF | rHigh << 16);
      }

      for (; i < x.length; i++) {
        var _xDigit = x.__digit(i);

        var _rLow = (_xDigit & 0xFFFF) + carry;

        var _rHigh = (_xDigit >>> 16) + (_rLow >>> 16);

        carry = _rHigh >>> 16;

        result.__setDigit(i, _rLow & 0xFFFF | _rHigh << 16);
      }

      if (i < result.length) {
        result.__setDigit(i, carry);
      }

      return result.__trim();
    }
  }, {
    key: "__absoluteSub",
    value: function __absoluteSub(x, y, resultSign) {
      if (x.length === 0) return x;
      if (y.length === 0) return x.sign === resultSign ? x : JSBI.unaryMinus(x);
      var result = new JSBI(x.length, resultSign);
      var borrow = 0;
      var i = 0;

      for (; i < y.length; i++) {
        var xDigit = x.__digit(i);

        var yDigit = y.__digit(i);

        var rLow = (xDigit & 0xFFFF) - (yDigit & 0xFFFF) - borrow;
        borrow = rLow >>> 16 & 1;
        var rHigh = (xDigit >>> 16) - (yDigit >>> 16) - borrow;
        borrow = rHigh >>> 16 & 1;

        result.__setDigit(i, rLow & 0xFFFF | rHigh << 16);
      }

      for (; i < x.length; i++) {
        var _xDigit2 = x.__digit(i);

        var _rLow2 = (_xDigit2 & 0xFFFF) - borrow;

        borrow = _rLow2 >>> 16 & 1;

        var _rHigh2 = (_xDigit2 >>> 16) - borrow;

        borrow = _rHigh2 >>> 16 & 1;

        result.__setDigit(i, _rLow2 & 0xFFFF | _rHigh2 << 16);
      }

      return result.__trim();
    }
  }, {
    key: "__absoluteAddOne",
    value: function __absoluteAddOne(x, sign) {
      var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var inputLength = x.length;

      if (result === null) {
        result = new JSBI(inputLength, sign);
      } else {
        result.sign = sign;
      }

      var carry = true;

      for (var i = 0; i < inputLength; i++) {
        var digit = x.__digit(i);

        var newCarry = digit === (0xFFFFFFFF | 0);
        if (carry) digit = digit + 1 | 0;
        carry = newCarry;

        result.__setDigit(i, digit);
      }

      if (carry) {
        result.__setDigitGrow(inputLength, 1);
      }

      return result;
    }
  }, {
    key: "__absoluteSubOne",
    value: function __absoluteSubOne(x, resultLength) {
      var length = x.length;
      resultLength = resultLength || length;
      var result = new JSBI(resultLength, false);
      var borrow = true;

      for (var i = 0; i < length; i++) {
        var digit = x.__digit(i);

        var newBorrow = digit === 0;
        if (borrow) digit = digit - 1 | 0;
        borrow = newBorrow;

        result.__setDigit(i, digit);
      }

      for (var _i2 = length; _i2 < resultLength; _i2++) {
        result.__setDigit(_i2, 0);
      }

      return result;
    }
  }, {
    key: "__absoluteAnd",
    value: function __absoluteAnd(x, y) {
      var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var xLength = x.length;
      var yLength = y.length;
      var numPairs = yLength;

      if (xLength < yLength) {
        numPairs = xLength;
        var tmp = x;
        var tmpLength = xLength;
        x = y;
        xLength = yLength;
        y = tmp;
        yLength = tmpLength;
      }

      var resultLength = numPairs;

      if (result === null) {
        result = new JSBI(resultLength, false);
      } else {
        resultLength = result.length;
      }

      var i = 0;

      for (; i < numPairs; i++) {
        result.__setDigit(i, x.__digit(i) & y.__digit(i));
      }

      for (; i < resultLength; i++) {
        result.__setDigit(i, 0);
      }

      return result;
    }
  }, {
    key: "__absoluteAndNot",
    value: function __absoluteAndNot(x, y) {
      var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var xLength = x.length;
      var yLength = y.length;
      var numPairs = yLength;

      if (xLength < yLength) {
        numPairs = xLength;
      }

      var resultLength = xLength;

      if (result === null) {
        result = new JSBI(resultLength, false);
      } else {
        resultLength = result.length;
      }

      var i = 0;

      for (; i < numPairs; i++) {
        result.__setDigit(i, x.__digit(i) & ~y.__digit(i));
      }

      for (; i < xLength; i++) {
        result.__setDigit(i, x.__digit(i));
      }

      for (; i < resultLength; i++) {
        result.__setDigit(i, 0);
      }

      return result;
    }
  }, {
    key: "__absoluteOr",
    value: function __absoluteOr(x, y) {
      var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var xLength = x.length;
      var yLength = y.length;
      var numPairs = yLength;

      if (xLength < yLength) {
        numPairs = xLength;
        var tmp = x;
        var tmpLength = xLength;
        x = y;
        xLength = yLength;
        y = tmp;
        yLength = tmpLength;
      }

      var resultLength = xLength;

      if (result === null) {
        result = new JSBI(resultLength, false);
      } else {
        resultLength = result.length;
      }

      var i = 0;

      for (; i < numPairs; i++) {
        result.__setDigit(i, x.__digit(i) | y.__digit(i));
      }

      for (; i < xLength; i++) {
        result.__setDigit(i, x.__digit(i));
      }

      for (; i < resultLength; i++) {
        result.__setDigit(i, 0);
      }

      return result;
    }
  }, {
    key: "__absoluteXor",
    value: function __absoluteXor(x, y) {
      var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var xLength = x.length;
      var yLength = y.length;
      var numPairs = yLength;

      if (xLength < yLength) {
        numPairs = xLength;
        var tmp = x;
        var tmpLength = xLength;
        x = y;
        xLength = yLength;
        y = tmp;
        yLength = tmpLength;
      }

      var resultLength = xLength;

      if (result === null) {
        result = new JSBI(resultLength, false);
      } else {
        resultLength = result.length;
      }

      var i = 0;

      for (; i < numPairs; i++) {
        result.__setDigit(i, x.__digit(i) ^ y.__digit(i));
      }

      for (; i < xLength; i++) {
        result.__setDigit(i, x.__digit(i));
      }

      for (; i < resultLength; i++) {
        result.__setDigit(i, 0);
      }

      return result;
    }
  }, {
    key: "__absoluteCompare",
    value: function __absoluteCompare(x, y) {
      var diff = x.length - y.length;
      if (diff !== 0) return diff;
      var i = x.length - 1;

      while (i >= 0 && x.__digit(i) === y.__digit(i)) {
        i--;
      }

      if (i < 0) return 0;
      return x.__unsignedDigit(i) > y.__unsignedDigit(i) ? 1 : -1;
    }
  }, {
    key: "__multiplyAccumulate",
    value: function __multiplyAccumulate(multiplicand, multiplier, accumulator, accumulatorIndex) {
      if (multiplier === 0) return;
      var m2Low = multiplier & 0xFFFF;
      var m2High = multiplier >>> 16;
      var carry = 0;
      var highLower = 0;
      var highHigher = 0;

      for (var i = 0; i < multiplicand.length; i++, accumulatorIndex++) {
        var acc = accumulator.__digit(accumulatorIndex);

        var accLow = acc & 0xFFFF;
        var accHigh = acc >>> 16;

        var m1 = multiplicand.__digit(i);

        var m1Low = m1 & 0xFFFF;
        var m1High = m1 >>> 16;
        var rLow = Math.imul(m1Low, m2Low);
        var rMid1 = Math.imul(m1Low, m2High);
        var rMid2 = Math.imul(m1High, m2Low);
        var rHigh = Math.imul(m1High, m2High);
        accLow += highLower + (rLow & 0xFFFF);
        accHigh += highHigher + carry + (accLow >>> 16) + (rLow >>> 16) + (rMid1 & 0xFFFF) + (rMid2 & 0xFFFF);
        carry = accHigh >>> 16;
        highLower = (rMid1 >>> 16) + (rMid2 >>> 16) + (rHigh & 0xFFFF) + carry;
        carry = highLower >>> 16;
        highLower &= 0xFFFF;
        highHigher = rHigh >>> 16;
        acc = accLow & 0xFFFF | accHigh << 16;

        accumulator.__setDigit(accumulatorIndex, acc);
      }

      for (; carry !== 0 || highLower !== 0 || highHigher !== 0; accumulatorIndex++) {
        var _acc = accumulator.__digit(accumulatorIndex);

        var _accLow = (_acc & 0xFFFF) + highLower;

        var _accHigh = (_acc >>> 16) + (_accLow >>> 16) + highHigher + carry;

        highLower = 0;
        highHigher = 0;
        carry = _accHigh >>> 16;
        _acc = _accLow & 0xFFFF | _accHigh << 16;

        accumulator.__setDigit(accumulatorIndex, _acc);
      }
    }
  }, {
    key: "__internalMultiplyAdd",
    value: function __internalMultiplyAdd(source, factor, summand, n, result) {
      var carry = summand;
      var high = 0;

      for (var i = 0; i < n; i++) {
        var digit = source.__digit(i);

        var rx = Math.imul(digit & 0xFFFF, factor);
        var r0 = (rx & 0xFFFF) + high + carry;
        carry = r0 >>> 16;
        var ry = Math.imul(digit >>> 16, factor);
        var r16 = (ry & 0xFFFF) + (rx >>> 16) + carry;
        carry = r16 >>> 16;
        high = ry >>> 16;

        result.__setDigit(i, r16 << 16 | r0 & 0xFFFF);
      }

      if (result.length > n) {
        result.__setDigit(n++, carry + high);

        while (n < result.length) {
          result.__setDigit(n++, 0);
        }
      } else {
        if (carry + high !== 0) throw new Error('implementation bug');
      }
    }
  }, {
    key: "__absoluteDivSmall",
    value: function __absoluteDivSmall(x, divisor, quotient) {
      if (quotient === null) quotient = new JSBI(x.length, false);
      var remainder = 0;

      for (var i = x.length * 2 - 1; i >= 0; i -= 2) {
        var input = (remainder << 16 | x.__halfDigit(i)) >>> 0;
        var upperHalf = input / divisor | 0;
        remainder = input % divisor | 0;
        input = (remainder << 16 | x.__halfDigit(i - 1)) >>> 0;
        var lowerHalf = input / divisor | 0;
        remainder = input % divisor | 0;

        quotient.__setDigit(i >>> 1, upperHalf << 16 | lowerHalf);
      }

      return quotient;
    }
  }, {
    key: "__absoluteModSmall",
    value: function __absoluteModSmall(x, divisor) {
      var remainder = 0;

      for (var i = x.length * 2 - 1; i >= 0; i--) {
        var input = (remainder << 16 | x.__halfDigit(i)) >>> 0;
        remainder = input % divisor | 0;
      }

      return remainder;
    }
  }, {
    key: "__absoluteDivLarge",
    value: function __absoluteDivLarge(dividend, divisor, wantQuotient, wantRemainder) {
      var n = divisor.__halfDigitLength();

      var n2 = divisor.length;
      var m = dividend.__halfDigitLength() - n;
      var q = null;

      if (wantQuotient) {
        q = new JSBI(m + 2 >>> 1, false);

        q.__initializeDigits();
      }

      var qhatv = new JSBI(n + 2 >>> 1, false);

      qhatv.__initializeDigits(); // D1.


      var shift = JSBI.__clz16(divisor.__halfDigit(n - 1));

      if (shift > 0) {
        divisor = JSBI.__specialLeftShift(divisor, shift, 0
        /* add no digits*/
        );
      }

      var u = JSBI.__specialLeftShift(dividend, shift, 1
      /* add one digit */
      ); // D2.


      var vn1 = divisor.__halfDigit(n - 1);

      var halfDigitBuffer = 0;

      for (var j = m; j >= 0; j--) {
        // D3.
        var qhat = 0xFFFF;

        var ujn = u.__halfDigit(j + n);

        if (ujn !== vn1) {
          var input = (ujn << 16 | u.__halfDigit(j + n - 1)) >>> 0;
          qhat = input / vn1 | 0;
          var rhat = input % vn1 | 0;

          var vn2 = divisor.__halfDigit(n - 2);

          var ujn2 = u.__halfDigit(j + n - 2);

          while (Math.imul(qhat, vn2) >>> 0 > (rhat << 16 | ujn2) >>> 0) {
            qhat--;
            rhat += vn1;
            if (rhat > 0xFFFF) break;
          }
        } // D4.


        JSBI.__internalMultiplyAdd(divisor, qhat, 0, n2, qhatv);

        var c = u.__inplaceSub(qhatv, j, n + 1);

        if (c !== 0) {
          c = u.__inplaceAdd(divisor, j, n);

          u.__setHalfDigit(j + n, u.__halfDigit(j + n) + c);

          qhat--;
        }

        if (wantQuotient) {
          if (j & 1) {
            halfDigitBuffer = qhat << 16;
          } else {
            q.__setDigit(j >>> 1, halfDigitBuffer | qhat);
          }
        }
      }

      if (wantRemainder) {
        u.__inplaceRightShift(shift);

        if (wantQuotient) {
          return {
            quotient: q,
            remainder: u
          };
        }

        return u;
      }

      if (wantQuotient) return q;
    }
  }, {
    key: "__clz16",
    value: function __clz16(value) {
      return Math.clz32(value) - 16;
    }
  }, {
    key: "__specialLeftShift",
    value: function __specialLeftShift(x, shift, addDigit) {
      var n = x.length;
      var resultLength = n + addDigit;
      var result = new JSBI(resultLength, false);

      if (shift === 0) {
        for (var i = 0; i < n; i++) {
          result.__setDigit(i, x.__digit(i));
        }

        if (addDigit > 0) result.__setDigit(n, 0);
        return result;
      }

      var carry = 0;

      for (var _i3 = 0; _i3 < n; _i3++) {
        var d = x.__digit(_i3);

        result.__setDigit(_i3, d << shift | carry);

        carry = d >>> 32 - shift;
      }

      if (addDigit > 0) {
        result.__setDigit(n, carry);
      }

      return result;
    }
  }, {
    key: "__leftShiftByAbsolute",
    value: function __leftShiftByAbsolute(x, y) {
      var shift = JSBI.__toShiftAmount(y);

      if (shift < 0) throw new RangeError('BigInt too big');
      var digitShift = shift >>> 5;
      var bitsShift = shift & 31;
      var length = x.length;
      var grow = bitsShift !== 0 && x.__digit(length - 1) >>> 32 - bitsShift !== 0;
      var resultLength = length + digitShift + (grow ? 1 : 0);
      var result = new JSBI(resultLength, x.sign);

      if (bitsShift === 0) {
        var i = 0;

        for (; i < digitShift; i++) {
          result.__setDigit(i, 0);
        }

        for (; i < resultLength; i++) {
          result.__setDigit(i, x.__digit(i - digitShift));
        }
      } else {
        var carry = 0;

        for (var _i4 = 0; _i4 < digitShift; _i4++) {
          result.__setDigit(_i4, 0);
        }

        for (var _i5 = 0; _i5 < length; _i5++) {
          var d = x.__digit(_i5);

          result.__setDigit(_i5 + digitShift, d << bitsShift | carry);

          carry = d >>> 32 - bitsShift;
        }

        if (grow) {
          result.__setDigit(length + digitShift, carry);
        } else {
          if (carry !== 0) throw new Error('implementation bug');
        }
      }

      return result.__trim();
    }
  }, {
    key: "__rightShiftByAbsolute",
    value: function __rightShiftByAbsolute(x, y) {
      var length = x.length;
      var sign = x.sign;

      var shift = JSBI.__toShiftAmount(y);

      if (shift < 0) return JSBI.__rightShiftByMaximum(sign);
      var digitShift = shift >>> 5;
      var bitsShift = shift & 31;
      var resultLength = length - digitShift;
      if (resultLength <= 0) return JSBI.__rightShiftByMaximum(sign); // For negative numbers, round down if any bit was shifted out (so that
      // e.g. -5n >> 1n == -3n and not -2n). Check now whether this will happen
      // and whether itc an cause overflow into a new digit. If we allocate the
      // result large enough up front, it avoids having to do grow it later.

      var mustRoundDown = false;

      if (sign) {
        var mask = (1 << bitsShift) - 1;

        if ((x.__digit(digitShift) & mask) !== 0) {
          mustRoundDown = true;
        } else {
          for (var i = 0; i < digitShift; i++) {
            if (x.__digit(i) !== 0) {
              mustRoundDown = true;
              break;
            }
          }
        }
      } // If bitsShift is non-zero, it frees up bits, preventing overflow.


      if (mustRoundDown && bitsShift === 0) {
        // Overflow cannot happen if the most significant digit has unset bits.
        var msd = x.__digit(length - 1);

        var roundingCanOverflow = ~msd === 0;
        if (roundingCanOverflow) resultLength++;
      }

      var result = new JSBI(resultLength, sign);

      if (bitsShift === 0) {
        for (var _i6 = digitShift; _i6 < length; _i6++) {
          result.__setDigit(_i6 - digitShift, x.__digit(_i6));
        }
      } else {
        var carry = x.__digit(digitShift) >>> bitsShift;
        var last = length - digitShift - 1;

        for (var _i7 = 0; _i7 < last; _i7++) {
          var d = x.__digit(_i7 + digitShift + 1);

          result.__setDigit(_i7, d << 32 - bitsShift | carry);

          carry = d >>> bitsShift;
        }

        result.__setDigit(last, carry);
      }

      if (mustRoundDown) {
        // Since the result is negative, rounding down means adding one to its
        // absolute value. This cannot overflow.
        result = JSBI.__absoluteAddOne(result, true, result);
      }

      return result.__trim();
    }
  }, {
    key: "__rightShiftByMaximum",
    value: function __rightShiftByMaximum(sign) {
      if (sign) {
        return JSBI.__oneDigit(1, true);
      }

      return JSBI.__zero();
    }
  }, {
    key: "__toShiftAmount",
    value: function __toShiftAmount(x) {
      if (x.length > 1) return -1;

      var value = x.__unsignedDigit(0);

      if (value > JSBI.__kMaxLengthBits) return -1;
      return value;
    }
  }, {
    key: "__toPrimitive",
    value: function __toPrimitive(obj) {
      var hint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      if (_typeof(obj) !== 'object') return obj;
      if (obj.constructor === JSBI) return obj;
      var exoticToPrim = obj[Symbol.toPrimitive];

      if (exoticToPrim) {
        var primitive = exoticToPrim(hint);
        if (_typeof(primitive) !== 'object') return primitive;
        throw new TypeError('Cannot convert object to primitive value');
      }

      var valueOf = obj.valueOf;

      if (valueOf) {
        var _primitive = valueOf.call(obj);

        if (_typeof(_primitive) !== 'object') return _primitive;
      }

      var toString = obj.toString;

      if (toString) {
        var _primitive2 = toString.call(obj);

        if (_typeof(_primitive2) !== 'object') return _primitive2;
      }

      throw new TypeError('Cannot convert object to primitive value');
    }
  }, {
    key: "__toNumeric",
    value: function __toNumeric(value) {
      if (JSBI.__isBigInt(value)) return value;
      return +value;
    }
  }, {
    key: "__isBigInt",
    value: function __isBigInt(value) {
      return _typeof(value) === 'object' && value.constructor === JSBI;
    }
  }, {
    key: "__truncateToNBits",
    value: function __truncateToNBits(n, x) {
      var neededDigits = n + 31 >>> 5;
      var result = new JSBI(neededDigits, x.sign);
      var last = neededDigits - 1;

      for (var i = 0; i < last; i++) {
        result.__setDigit(i, x.__digit(i));
      }

      var msd = x.__digit(last);

      if ((n & 31) !== 0) {
        var drop = 32 - (n & 31);
        msd = msd << drop >>> drop;
      }

      result.__setDigit(last, msd);

      return result.__trim();
    }
  }, {
    key: "__truncateAndSubFromPowerOfTwo",
    value: function __truncateAndSubFromPowerOfTwo(n, x, resultSign) {
      var neededDigits = n + 31 >>> 5;
      var result = new JSBI(neededDigits, resultSign);
      var i = 0;
      var last = neededDigits - 1;
      var borrow = 0;
      var limit = Math.min(last, x.length);

      for (; i < limit; i++) {
        var xDigit = x.__digit(i);

        var rLow = 0 - (xDigit & 0xFFFF) - borrow;
        borrow = rLow >>> 16 & 1;
        var rHigh = 0 - (xDigit >>> 16) - borrow;
        borrow = rHigh >>> 16 & 1;

        result.__setDigit(i, rLow & 0xFFFF | rHigh << 16);
      }

      for (; i < last; i++) {
        result.__setDigit(i, -borrow | 0);
      }

      var msd = last < x.length ? x.__digit(last) : 0;
      var msdBitsConsumed = n & 31;
      var resultMsd;

      if (msdBitsConsumed === 0) {
        var _rLow3 = 0 - (msd & 0xFFFF) - borrow;

        borrow = _rLow3 >>> 16 & 1;

        var _rHigh3 = 0 - (msd >>> 16) - borrow;

        resultMsd = _rLow3 & 0xFFFF | _rHigh3 << 16;
      } else {
        var drop = 32 - msdBitsConsumed;
        msd = msd << drop >>> drop;
        var minuendMsd = 1 << 32 - drop;

        var _rLow4 = (minuendMsd & 0xFFFF) - (msd & 0xFFFF) - borrow;

        borrow = _rLow4 >>> 16 & 1;

        var _rHigh4 = (minuendMsd >>> 16) - (msd >>> 16) - borrow;

        resultMsd = _rLow4 & 0xFFFF | _rHigh4 << 16;
        resultMsd &= minuendMsd - 1;
      }

      result.__setDigit(last, resultMsd);

      return result.__trim();
    }
  }, {
    key: "__digitPow",
    value: function __digitPow(base, exponent) {
      var result = 1;

      while (exponent > 0) {
        if (exponent & 1) result *= base;
        exponent >>>= 1;
        base *= base;
      }

      return result;
    }
  }]);

  return JSBI;
}(_wrapNativeSuper(Array));

JSBI.__kMaxLength = 1 << 25;
JSBI.__kMaxLengthBits = JSBI.__kMaxLength << 5; // Lookup table for the maximum number of bits required per character of a
// base-N string representation of a number. To increase accuracy, the array
// value is the actual value multiplied by 32. To generate this table:
//
// for (let i = 0; i <= 36; i++) {
//   console.log(Math.ceil(Math.log2(i) * 32) + ',');
// }

JSBI.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, // 0..8
102, 107, 111, 115, 119, 122, 126, 128, // 9..16
131, 134, 136, 139, 141, 143, 145, 147, // 17..24
149, 151, 153, 154, 156, 158, 159, 160, // 25..32
162, 163, 165, 166 // 33..36
];
JSBI.__kBitsPerCharTableShift = 5;
JSBI.__kBitsPerCharTableMultiplier = 1 << JSBI.__kBitsPerCharTableShift;
JSBI.__kConversionChars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
JSBI.__kBitConversionBuffer = new ArrayBuffer(8);
JSBI.__kBitConversionDouble = new Float64Array(JSBI.__kBitConversionBuffer);
JSBI.__kBitConversionInts = new Int32Array(JSBI.__kBitConversionBuffer);
var _default = JSBI;
exports.default = _default;