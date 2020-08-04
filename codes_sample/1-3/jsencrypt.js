var utc;

var navigator = { appName: "" };

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

var exports = {};

(function (global, factory) {
  factory(exports);
})(exports, function (exports) {
  'use strict';

  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";

  function int2char(n) {
    return BI_RM.charAt(n);
  } //#region BIT_OPERATIONS
  // (public) this & a


  function op_and(x, y) {
    return x & y;
  } // (public) this | a


  function op_or(x, y) {
    return x | y;
  } // (public) this ^ a


  function op_xor(x, y) {
    return x ^ y;
  } // (public) this & ~a


  function op_andnot(x, y) {
    return x & ~y;
  } // return index of lowest 1-bit in x, x < 2^31


  function lbit(x) {
    if (x == 0) {
      return -1;
    }

    var r = 0;

    if ((x & 65535) == 0) {
      x >>= 16;
      r += 16;
    }

    if ((x & 255) == 0) {
      x >>= 8;
      r += 8;
    }

    if ((x & 15) == 0) {
      x >>= 4;
      r += 4;
    }

    if ((x & 3) == 0) {
      x >>= 2;
      r += 2;
    }

    if ((x & 1) == 0) {
      ++r;
    }

    return r;
  } // return number of 1 bits in x


  function cbit(x) {
    var r = 0;

    while (x != 0) {
      x &= x - 1;
      ++r;
    }

    return r;
  } //#endregion BIT_OPERATIONS


  var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad = "=";

  function hex2b64(h) {
    var i;
    var c;
    var ret = "";

    for (i = 0; i + 3 <= h.length; i += 3) {
      c = parseInt(h.substring(i, i + 3), 16);
      ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }

    if (i + 1 == h.length) {
      c = parseInt(h.substring(i, i + 1), 16);
      ret += b64map.charAt(c << 2);
    } else if (i + 2 == h.length) {
      c = parseInt(h.substring(i, i + 2), 16);
      ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }

    while ((ret.length & 3) > 0) {
      ret += b64pad;
    }

    return ret;
  } // convert a base64 string to hex


  function b64tohex(s) {
    var ret = "";
    var i;
    var k = 0; // b64 state, 0-3

    var slop = 0;

    for (i = 0; i < s.length; ++i) {
      if (s.charAt(i) == b64pad) {
        break;
      }

      var v = b64map.indexOf(s.charAt(i));

      if (v < 0) {
        continue;
      }

      if (k == 0) {
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 1;
      } else if (k == 1) {
        ret += int2char(slop << 2 | v >> 4);
        slop = v & 15;
        k = 2;
      } else if (k == 2) {
        ret += int2char(slop);
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 3;
      } else {
        ret += int2char(slop << 2 | v >> 4);
        ret += int2char(v & 15);
        k = 0;
      }
    }

    if (k == 1) {
      ret += int2char(slop << 2);
    }

    return ret;
  }
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  /* global Reflect, Promise */


  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  function __extends(d, b) {
    extendStatics(d, b);

    function __() {
      (this || _global).constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  } // Hex JavaScript decoder
  // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */


  var decoder;
  var Hex = {
    decode: function (a) {
      var i;

      if (decoder === undefined) {
        var hex = "0123456789ABCDEF";
        var ignore = " \f\n\r\t\xA0\u2028\u2029";
        decoder = {};

        for (i = 0; i < 16; ++i) {
          decoder[hex.charAt(i)] = i;
        }

        hex = hex.toLowerCase();

        for (i = 10; i < 16; ++i) {
          decoder[hex.charAt(i)] = i;
        }

        for (i = 0; i < ignore.length; ++i) {
          decoder[ignore.charAt(i)] = -1;
        }
      }

      var out = [];
      var bits = 0;
      var char_count = 0;

      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);

        if (c == "=") {
          break;
        }

        c = decoder[c];

        if (c == -1) {
          continue;
        }

        if (c === undefined) {
          throw new Error("Illegal character at offset " + i);
        }

        bits |= c;

        if (++char_count >= 2) {
          out[out.length] = bits;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 4;
        }
      }

      if (char_count) {
        throw new Error("Hex encoding incomplete: 4 bits missing");
      }

      return out;
    }
  }; // Base64 JavaScript decoder
  // Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */

  var decoder$1;
  var Base64 = {
    decode: function (a) {
      var i;

      if (decoder$1 === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var ignore = "= \f\n\r\t\xA0\u2028\u2029";
        decoder$1 = Object.create(null);

        for (i = 0; i < 64; ++i) {
          decoder$1[b64.charAt(i)] = i;
        }

        for (i = 0; i < ignore.length; ++i) {
          decoder$1[ignore.charAt(i)] = -1;
        }
      }

      var out = [];
      var bits = 0;
      var char_count = 0;

      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);

        if (c == "=") {
          break;
        }

        c = decoder$1[c];

        if (c == -1) {
          continue;
        }

        if (c === undefined) {
          throw new Error("Illegal character at offset " + i);
        }

        bits |= c;

        if (++char_count >= 4) {
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 255;
          out[out.length] = bits & 255;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 6;
        }
      }

      switch (char_count) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");

        case 2:
          out[out.length] = bits >> 10;
          break;

        case 3:
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 255;
          break;
      }

      return out;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function (a) {
      var m = Base64.re.exec(a);

      if (m) {
        if (m[1]) {
          a = m[1];
        } else if (m[2]) {
          a = m[2];
        } else {
          throw new Error("RegExp out of sync");
        }
      }

      return Base64.decode(a);
    }
  }; // Big integer base-10 printing library
  // Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>
  // Permission to use, copy, modify, and/or distribute this software for any
  // purpose with or without fee is hereby granted, provided that the above
  // copyright notice and this permission notice appear in all copies.
  //
  // THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
  // WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
  // MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
  // ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
  // WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
  // ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
  // OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */

  var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256

  var Int10 =
  /** @class */
  function () {
    function Int10(value) {
      (this || _global).buf = [+value || 0];
    }

    Int10.prototype.mulAdd = function (m, c) {
      // assert(m <= 256)
      var b = (this || _global).buf;
      var l = b.length;
      var i;
      var t;

      for (i = 0; i < l; ++i) {
        t = b[i] * m + c;

        if (t < max) {
          c = 0;
        } else {
          c = 0 | t / max;
          t -= c * max;
        }

        b[i] = t;
      }

      if (c > 0) {
        b[i] = c;
      }
    };

    Int10.prototype.sub = function (c) {
      // assert(m <= 256)
      var b = (this || _global).buf;
      var l = b.length;
      var i;
      var t;

      for (i = 0; i < l; ++i) {
        t = b[i] - c;

        if (t < 0) {
          t += max;
          c = 1;
        } else {
          c = 0;
        }

        b[i] = t;
      }

      while (b[b.length - 1] === 0) {
        b.pop();
      }
    };

    Int10.prototype.toString = function (base) {
      if ((base || 10) != 10) {
        throw new Error("only base 10 is supported");
      }

      var b = (this || _global).buf;
      var s = b[b.length - 1].toString();

      for (var i = b.length - 2; i >= 0; --i) {
        s += (max + b[i]).toString().substring(1);
      }

      return s;
    };

    Int10.prototype.valueOf = function () {
      var b = (this || _global).buf;
      var v = 0;

      for (var i = b.length - 1; i >= 0; --i) {
        v = v * max + b[i];
      }

      return v;
    };

    Int10.prototype.simplify = function () {
      var b = (this || _global).buf;
      return b.length == 1 ? b[0] : this || _global;
    };

    return Int10;
  }(); // ASN.1 JavaScript decoder


  var ellipsis = "\u2026";
  var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

  function stringCut(str, len) {
    if (str.length > len) {
      str = str.substring(0, len) + ellipsis;
    }

    return str;
  }

  var Stream =
  /** @class */
  function () {
    function Stream(enc, pos) {
      (this || _global).hexDigits = "0123456789ABCDEF";

      if (enc instanceof Stream) {
        (this || _global).enc = enc.enc;
        (this || _global).pos = enc.pos;
      } else {
        // enc should be an array or a binary string
        (this || _global).enc = enc;
        (this || _global).pos = pos;
      }
    }

    Stream.prototype.get = function (pos) {
      if (pos === undefined) {
        pos = (this || _global).pos++;
      }

      if (pos >= (this || _global).enc.length) {
        throw new Error("Requesting byte offset " + pos + " on a stream of length " + (this || _global).enc.length);
      }

      return "string" === typeof (this || _global).enc ? (this || _global).enc.charCodeAt(pos) : (this || _global).enc[pos];
    };

    Stream.prototype.hexByte = function (b) {
      return (this || _global).hexDigits.charAt(b >> 4 & 15) + (this || _global).hexDigits.charAt(b & 15);
    };

    Stream.prototype.hexDump = function (start, end, raw) {
      var s = "";

      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));

        if (raw !== true) {
          switch (i & 15) {
            case 7:
              s += "  ";
              break;

            case 15:
              s += "\n";
              break;

            default:
              s += " ";
          }
        }
      }

      return s;
    };

    Stream.prototype.isASCII = function (start, end) {
      for (var i = start; i < end; ++i) {
        var c = this.get(i);

        if (c < 32 || c > 176) {
          return false;
        }
      }

      return true;
    };

    Stream.prototype.parseStringISO = function (start, end) {
      var s = "";

      for (var i = start; i < end; ++i) {
        s += String.fromCharCode(this.get(i));
      }

      return s;
    };

    Stream.prototype.parseStringUTF = function (start, end) {
      var s = "";

      for (var i = start; i < end;) {
        var c = this.get(i++);

        if (c < 128) {
          s += String.fromCharCode(c);
        } else if (c > 191 && c < 224) {
          s += String.fromCharCode((c & 31) << 6 | this.get(i++) & 63);
        } else {
          s += String.fromCharCode((c & 15) << 12 | (this.get(i++) & 63) << 6 | this.get(i++) & 63);
        }
      }

      return s;
    };

    Stream.prototype.parseStringBMP = function (start, end) {
      var str = "";
      var hi;
      var lo;

      for (var i = start; i < end;) {
        hi = this.get(i++);
        lo = this.get(i++);
        str += String.fromCharCode(hi << 8 | lo);
      }

      return str;
    };

    Stream.prototype.parseTime = function (start, end, shortYear) {
      var s = this.parseStringISO(start, end);
      var m = (shortYear ? reTimeS : reTimeL).exec(s);

      if (!m) {
        return "Unrecognized time: " + s;
      }

      if (shortYear) {
        // to avoid querying the timer, use the fixed range [1970, 2069]
        // it will conform with ITU X.400 [-10, +40] sliding window until 2030
        m[1] = +m[1];
        m[1] += +m[1] < 70 ? 2000 : 1900;
      }

      s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];

      if (m[5]) {
        s += ":" + m[5];

        if (m[6]) {
          s += ":" + m[6];

          if (m[7]) {
            s += "." + m[7];
          }
        }
      }

      if (m[8]) {
        s += " UTC";

        if (m[8] != "Z") {
          s += m[8];

          if (m[9]) {
            s += ":" + m[9];
          }
        }
      }

      return s;
    };

    Stream.prototype.parseInteger = function (start, end) {
      var v = this.get(start);
      var neg = v > 127;
      var pad = neg ? 255 : 0;
      var len;
      var s = ""; // skip unuseful bits (not allowed in DER)

      while (v == pad && ++start < end) {
        v = this.get(start);
      }

      len = end - start;

      if (len === 0) {
        return neg ? -1 : 0;
      } // show bit length of huge integers


      if (len > 4) {
        s = v;
        len <<= 3;

        while (((+s ^ pad) & 128) == 0) {
          s = +s << 1;
          --len;
        }

        s = "(" + len + " bit)\n";
      } // decode the integer


      if (neg) {
        v = v - 256;
      }

      var n = new Int10(v);

      for (var i = start + 1; i < end; ++i) {
        n.mulAdd(256, this.get(i));
      }

      return s + n.toString();
    };

    Stream.prototype.parseBitString = function (start, end, maxLength) {
      var unusedBit = this.get(start);
      var lenBit = (end - start - 1 << 3) - unusedBit;
      var intro = "(" + lenBit + " bit)\n";
      var s = "";

      for (var i = start + 1; i < end; ++i) {
        var b = this.get(i);
        var skip = i == end - 1 ? unusedBit : 0;

        for (var j = 7; j >= skip; --j) {
          s += b >> j & 1 ? "1" : "0";
        }

        if (s.length > maxLength) {
          return intro + stringCut(s, maxLength);
        }
      }

      return intro + s;
    };

    Stream.prototype.parseOctetString = function (start, end, maxLength) {
      if (this.isASCII(start, end)) {
        return stringCut(this.parseStringISO(start, end), maxLength);
      }

      var len = end - start;
      var s = "(" + len + " byte)\n";
      maxLength /= 2; // we work in bytes

      if (len > maxLength) {
        end = start + maxLength;
      }

      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
      }

      if (len > maxLength) {
        s += ellipsis;
      }

      return s;
    };

    Stream.prototype.parseOID = function (start, end, maxLength) {
      var s = "";
      var n = new Int10();
      var bits = 0;

      for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n.mulAdd(128, v & 127);
        bits += 7;

        if (!(v & 128)) {
          // finished
          if (s === "") {
            n = n.simplify();

            if (n instanceof Int10) {
              n.sub(80);
              s = "2." + n.toString();
            } else {
              var m = n < 80 ? n < 40 ? 0 : 1 : 2;
              s = m + "." + (n - m * 40);
            }
          } else {
            s += "." + n.toString();
          }

          if (s.length > maxLength) {
            return stringCut(s, maxLength);
          }

          n = new Int10();
          bits = 0;
        }
      }

      if (bits > 0) {
        s += ".incomplete";
      }

      return s;
    };

    return Stream;
  }();

  var ASN1 =
  /** @class */
  function () {
    function ASN1(stream, header, length, tag, sub) {
      if (!(tag instanceof ASN1Tag)) {
        throw new Error("Invalid tag value.");
      }

      (this || _global).stream = stream;
      (this || _global).header = header;
      (this || _global).length = length;
      (this || _global).tag = tag;
      (this || _global).sub = sub;
    }

    ASN1.prototype.typeName = function () {
      switch ((this || _global).tag.tagClass) {
        case 0:
          // universal
          switch ((this || _global).tag.tagNumber) {
            case 0:
              return "EOC";

            case 1:
              return "BOOLEAN";

            case 2:
              return "INTEGER";

            case 3:
              return "BIT_STRING";

            case 4:
              return "OCTET_STRING";

            case 5:
              return "NULL";

            case 6:
              return "OBJECT_IDENTIFIER";

            case 7:
              return "ObjectDescriptor";

            case 8:
              return "EXTERNAL";

            case 9:
              return "REAL";

            case 10:
              return "ENUMERATED";

            case 11:
              return "EMBEDDED_PDV";

            case 12:
              return "UTF8String";

            case 16:
              return "SEQUENCE";

            case 17:
              return "SET";

            case 18:
              return "NumericString";

            case 19:
              return "PrintableString";
            // ASCII subset

            case 20:
              return "TeletexString";
            // aka T61String

            case 21:
              return "VideotexString";

            case 22:
              return "IA5String";
            // ASCII

            case 23:
              return "UTCTime";

            case 24:
              return "GeneralizedTime";

            case 25:
              return "GraphicString";

            case 26:
              return "VisibleString";
            // ASCII subset

            case 27:
              return "GeneralString";

            case 28:
              return "UniversalString";

            case 30:
              return "BMPString";
          }

          return "Universal_" + (this || _global).tag.tagNumber.toString();

        case 1:
          return "Application_" + (this || _global).tag.tagNumber.toString();

        case 2:
          return "[" + (this || _global).tag.tagNumber.toString() + "]";
        // Context

        case 3:
          return "Private_" + (this || _global).tag.tagNumber.toString();
      }
    };

    ASN1.prototype.content = function (maxLength) {
      if ((this || _global).tag === undefined) {
        return null;
      }

      if (maxLength === undefined) {
        maxLength = Infinity;
      }

      var content = this.posContent();
      var len = Math.abs((this || _global).length);

      if (!(this || _global).tag.isUniversal()) {
        if ((this || _global).sub !== null) {
          return "(" + (this || _global).sub.length + " elem)";
        }

        return (this || _global).stream.parseOctetString(content, content + len, maxLength);
      }

      switch ((this || _global).tag.tagNumber) {
        case 1:
          // BOOLEAN
          return (this || _global).stream.get(content) === 0 ? "false" : "true";

        case 2:
          // INTEGER
          return (this || _global).stream.parseInteger(content, content + len);

        case 3:
          // BIT_STRING
          return (this || _global).sub ? "(" + (this || _global).sub.length + " elem)" : (this || _global).stream.parseBitString(content, content + len, maxLength);

        case 4:
          // OCTET_STRING
          return (this || _global).sub ? "(" + (this || _global).sub.length + " elem)" : (this || _global).stream.parseOctetString(content, content + len, maxLength);
        // case 0x05: // NULL

        case 6:
          // OBJECT_IDENTIFIER
          return (this || _global).stream.parseOID(content, content + len, maxLength);
        // case 0x07: // ObjectDescriptor
        // case 0x08: // EXTERNAL
        // case 0x09: // REAL
        // case 0x0A: // ENUMERATED
        // case 0x0B: // EMBEDDED_PDV

        case 16: // SEQUENCE

        case 17:
          // SET
          if ((this || _global).sub !== null) {
            return "(" + (this || _global).sub.length + " elem)";
          } else {
            return "(no elem)";
          }

        case 12:
          // UTF8String
          return stringCut((this || _global).stream.parseStringUTF(content, content + len), maxLength);

        case 18: // NumericString

        case 19: // PrintableString

        case 20: // TeletexString

        case 21: // VideotexString

        case 22: // IA5String
        // case 0x19: // GraphicString

        case 26:
          // VisibleString
          // case 0x1B: // GeneralString
          // case 0x1C: // UniversalString
          return stringCut((this || _global).stream.parseStringISO(content, content + len), maxLength);

        case 30:
          // BMPString
          return stringCut((this || _global).stream.parseStringBMP(content, content + len), maxLength);

        case 23: // UTCTime

        case 24:
          // GeneralizedTime
          return (this || _global).stream.parseTime(content, content + len, (this || _global).tag.tagNumber == 23);
      }

      return null;
    };

    ASN1.prototype.toString = function () {
      return this.typeName() + "@" + (this || _global).stream.pos + "[header:" + (this || _global).header + ",length:" + (this || _global).length + ",sub:" + ((this || _global).sub === null ? "null" : (this || _global).sub.length) + "]";
    };

    ASN1.prototype.toPrettyString = function (indent) {
      if (indent === undefined) {
        indent = "";
      }

      var s = indent + this.typeName() + " @" + (this || _global).stream.pos;

      if ((this || _global).length >= 0) {
        s += "+";
      }

      s += (this || _global).length;

      if ((this || _global).tag.tagConstructed) {
        s += " (constructed)";
      } else if ((this || _global).tag.isUniversal() && ((this || _global).tag.tagNumber == 3 || (this || _global).tag.tagNumber == 4) && (this || _global).sub !== null) {
        s += " (encapsulates)";
      }

      s += "\n";

      if ((this || _global).sub !== null) {
        indent += "  ";

        for (var i = 0, max = (this || _global).sub.length; i < max; ++i) {
          s += (this || _global).sub[i].toPrettyString(indent);
        }
      }

      return s;
    };

    ASN1.prototype.posStart = function () {
      return (this || _global).stream.pos;
    };

    ASN1.prototype.posContent = function () {
      return (this || _global).stream.pos + (this || _global).header;
    };

    ASN1.prototype.posEnd = function () {
      return (this || _global).stream.pos + (this || _global).header + Math.abs((this || _global).length);
    };

    ASN1.prototype.toHexString = function () {
      return (this || _global).stream.hexDump(this.posStart(), this.posEnd(), true);
    };

    ASN1.decodeLength = function (stream) {
      var buf = stream.get();
      var len = buf & 127;

      if (len == buf) {
        return len;
      } // no reason to use Int10, as it would be a huge buffer anyways


      if (len > 6) {
        throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
      }

      if (len === 0) {
        return null;
      } // undefined


      buf = 0;

      for (var i = 0; i < len; ++i) {
        buf = buf * 256 + stream.get();
      }

      return buf;
    };
    /**
     * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
     * @returns {string}
     * @public
     */


    ASN1.prototype.getHexStringValue = function () {
      var hexString = this.toHexString();
      var offset = (this || _global).header * 2;
      var length = (this || _global).length * 2;
      return hexString.substr(offset, length);
    };

    ASN1.decode = function (str) {
      var stream;

      if (!(str instanceof Stream)) {
        stream = new Stream(str, 0);
      } else {
        stream = str;
      }

      var streamStart = new Stream(stream);
      var tag = new ASN1Tag(stream);
      var len = ASN1.decodeLength(stream);
      var start = stream.pos;
      var header = start - streamStart.pos;
      var sub = null;

      var getSub = function () {
        var ret = [];

        if (len !== null) {
          // definite length
          var end = start + len;

          while (stream.pos < end) {
            ret[ret.length] = ASN1.decode(stream);
          }

          if (stream.pos != end) {
            throw new Error("Content size is not correct for container starting at offset " + start);
          }
        } else {
          // undefined length
          try {
            for (;;) {
              var s = ASN1.decode(stream);

              if (s.tag.isEOC()) {
                break;
              }

              ret[ret.length] = s;
            }

            len = start - stream.pos; // undefined lengths are represented as negative values
          } catch (e) {
            throw new Error("Exception while decoding undefined length content: " + e);
          }
        }

        return ret;
      };

      if (tag.tagConstructed) {
        // must have valid content
        sub = getSub();
      } else if (tag.isUniversal() && (tag.tagNumber == 3 || tag.tagNumber == 4)) {
        // sometimes BitString and OctetString are used to encapsulate ASN.1
        try {
          if (tag.tagNumber == 3) {
            if (stream.get() != 0) {
              throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
            }
          }

          sub = getSub();

          for (var i = 0; i < sub.length; ++i) {
            if (sub[i].tag.isEOC()) {
              throw new Error("EOC is not supposed to be actual content.");
            }
          }
        } catch (e) {
          // but silently ignore when they don't
          sub = null;
        }
      }

      if (sub === null) {
        if (len === null) {
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
        }

        stream.pos = start + Math.abs(len);
      }

      return new ASN1(streamStart, header, len, tag, sub);
    };

    return ASN1;
  }();

  var ASN1Tag =
  /** @class */
  function () {
    function ASN1Tag(stream) {
      var buf = stream.get();
      (this || _global).tagClass = buf >> 6;
      (this || _global).tagConstructed = (buf & 32) !== 0;
      (this || _global).tagNumber = buf & 31;

      if ((this || _global).tagNumber == 31) {
        // long tag
        var n = new Int10();

        do {
          buf = stream.get();
          n.mulAdd(128, buf & 127);
        } while (buf & 128);

        (this || _global).tagNumber = n.simplify();
      }
    }

    ASN1Tag.prototype.isUniversal = function () {
      return (this || _global).tagClass === 0;
    };

    ASN1Tag.prototype.isEOC = function () {
      return (this || _global).tagClass === 0 && (this || _global).tagNumber === 0;
    };

    return ASN1Tag;
  }(); // Copyright (c) 2005  Tom Wu
  // Bits per digit


  var dbits; // JavaScript engine analysis

  var canary = 244837814094590;
  var j_lm = (canary & 16777215) == 15715070; //#region

  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1]; //#endregion
  // (public) Constructor

  var BigInteger =
  /** @class */
  function () {
    function BigInteger(a, b, c) {
      if (a != null) {
        if ("number" == typeof a) {
          this.fromNumber(a, b, c);
        } else if (b == null && "string" != typeof a) {
          this.fromString(a, 256);
        } else {
          this.fromString(a, b);
        }
      }
    } //#region PUBLIC
    // BigInteger.prototype.toString = bnToString;
    // (public) return string representation in given radix


    BigInteger.prototype.toString = function (b) {
      if ((this || _global).s < 0) {
        return "-" + this.negate().toString(b);
      }

      var k;

      if (b == 16) {
        k = 4;
      } else if (b == 8) {
        k = 3;
      } else if (b == 2) {
        k = 1;
      } else if (b == 32) {
        k = 5;
      } else if (b == 4) {
        k = 2;
      } else {
        return this.toRadix(b);
      }

      var km = (1 << k) - 1;
      var d;
      var m = false;
      var r = "";
      var i = (this || _global).t;
      var p = (this || _global).DB - i * (this || _global).DB % k;

      if (i-- > 0) {
        if (p < (this || _global).DB && (d = (this || _global)[i] >> p) > 0) {
          m = true;
          r = int2char(d);
        }

        while (i >= 0) {
          if (p < k) {
            d = ((this || _global)[i] & (1 << p) - 1) << k - p;
            d |= (this || _global)[--i] >> (p += (this || _global).DB - k);
          } else {
            d = (this || _global)[i] >> (p -= k) & km;

            if (p <= 0) {
              p += (this || _global).DB;
              --i;
            }
          }

          if (d > 0) {
            m = true;
          }

          if (m) {
            r += int2char(d);
          }
        }
      }

      return m ? r : "0";
    }; // BigInteger.prototype.negate = bnNegate;
    // (public) -this


    BigInteger.prototype.negate = function () {
      var r = nbi();
      BigInteger.ZERO.subTo(this || _global, r);
      return r;
    }; // BigInteger.prototype.abs = bnAbs;
    // (public) |this|


    BigInteger.prototype.abs = function () {
      return (this || _global).s < 0 ? this.negate() : this || _global;
    }; // BigInteger.prototype.compareTo = bnCompareTo;
    // (public) return + if this > a, - if this < a, 0 if equal


    BigInteger.prototype.compareTo = function (a) {
      var r = (this || _global).s - a.s;

      if (r != 0) {
        return r;
      }

      var i = (this || _global).t;
      r = i - a.t;

      if (r != 0) {
        return (this || _global).s < 0 ? -r : r;
      }

      while (--i >= 0) {
        if ((r = (this || _global)[i] - a[i]) != 0) {
          return r;
        }
      }

      return 0;
    }; // BigInteger.prototype.bitLength = bnBitLength;
    // (public) return the number of bits in "this"


    BigInteger.prototype.bitLength = function () {
      if ((this || _global).t <= 0) {
        return 0;
      }

      return (this || _global).DB * ((this || _global).t - 1) + nbits((this || _global)[(this || _global).t - 1] ^ (this || _global).s & (this || _global).DM);
    }; // BigInteger.prototype.mod = bnMod;
    // (public) this mod a


    BigInteger.prototype.mod = function (a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);

      if ((this || _global).s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        a.subTo(r, r);
      }

      return r;
    }; // BigInteger.prototype.modPowInt = bnModPowInt;
    // (public) this^e % m, 0 <= e < 2^32


    BigInteger.prototype.modPowInt = function (e, m) {
      var z;

      if (e < 256 || m.isEven()) {
        z = new Classic(m);
      } else {
        z = new Montgomery(m);
      }

      return this.exp(e, z);
    }; // BigInteger.prototype.clone = bnClone;
    // (public)


    BigInteger.prototype.clone = function () {
      var r = nbi();
      this.copyTo(r);
      return r;
    }; // BigInteger.prototype.intValue = bnIntValue;
    // (public) return value as integer


    BigInteger.prototype.intValue = function () {
      if ((this || _global).s < 0) {
        if ((this || _global).t == 1) {
          return (this || _global)[0] - (this || _global).DV;
        } else if ((this || _global).t == 0) {
          return -1;
        }
      } else if ((this || _global).t == 1) {
        return (this || _global)[0];
      } else if ((this || _global).t == 0) {
        return 0;
      } // assumes 16 < DB < 32


      return ((this || _global)[1] & (1 << 32 - (this || _global).DB) - 1) << (this || _global).DB | (this || _global)[0];
    }; // BigInteger.prototype.byteValue = bnByteValue;
    // (public) return value as byte


    BigInteger.prototype.byteValue = function () {
      return (this || _global).t == 0 ? (this || _global).s : (this || _global)[0] << 24 >> 24;
    }; // BigInteger.prototype.shortValue = bnShortValue;
    // (public) return value as short (assumes DB>=16)


    BigInteger.prototype.shortValue = function () {
      return (this || _global).t == 0 ? (this || _global).s : (this || _global)[0] << 16 >> 16;
    }; // BigInteger.prototype.signum = bnSigNum;
    // (public) 0 if this == 0, 1 if this > 0


    BigInteger.prototype.signum = function () {
      if ((this || _global).s < 0) {
        return -1;
      } else if ((this || _global).t <= 0 || (this || _global).t == 1 && (this || _global)[0] <= 0) {
        return 0;
      } else {
        return 1;
      }
    }; // BigInteger.prototype.toByteArray = bnToByteArray;
    // (public) convert to bigendian byte array


    BigInteger.prototype.toByteArray = function () {
      var i = (this || _global).t;
      var r = [];
      r[0] = (this || _global).s;
      var p = (this || _global).DB - i * (this || _global).DB % 8;
      var d;
      var k = 0;

      if (i-- > 0) {
        if (p < (this || _global).DB && (d = (this || _global)[i] >> p) != ((this || _global).s & (this || _global).DM) >> p) {
          r[k++] = d | (this || _global).s << (this || _global).DB - p;
        }

        while (i >= 0) {
          if (p < 8) {
            d = ((this || _global)[i] & (1 << p) - 1) << 8 - p;
            d |= (this || _global)[--i] >> (p += (this || _global).DB - 8);
          } else {
            d = (this || _global)[i] >> (p -= 8) & 255;

            if (p <= 0) {
              p += (this || _global).DB;
              --i;
            }
          }

          if ((d & 128) != 0) {
            d |= -256;
          }

          if (k == 0 && ((this || _global).s & 128) != (d & 128)) {
            ++k;
          }

          if (k > 0 || d != (this || _global).s) {
            r[k++] = d;
          }
        }
      }

      return r;
    }; // BigInteger.prototype.equals = bnEquals;


    BigInteger.prototype.equals = function (a) {
      return this.compareTo(a) == 0;
    }; // BigInteger.prototype.min = bnMin;


    BigInteger.prototype.min = function (a) {
      return this.compareTo(a) < 0 ? this || _global : a;
    }; // BigInteger.prototype.max = bnMax;


    BigInteger.prototype.max = function (a) {
      return this.compareTo(a) > 0 ? this || _global : a;
    }; // BigInteger.prototype.and = bnAnd;


    BigInteger.prototype.and = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    }; // BigInteger.prototype.or = bnOr;


    BigInteger.prototype.or = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    }; // BigInteger.prototype.xor = bnXor;


    BigInteger.prototype.xor = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    }; // BigInteger.prototype.andNot = bnAndNot;


    BigInteger.prototype.andNot = function (a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    }; // BigInteger.prototype.not = bnNot;
    // (public) ~this


    BigInteger.prototype.not = function () {
      var r = nbi();

      for (var i = 0; i < (this || _global).t; ++i) {
        r[i] = (this || _global).DM & ~(this || _global)[i];
      }

      r.t = (this || _global).t;
      r.s = ~(this || _global).s;
      return r;
    }; // BigInteger.prototype.shiftLeft = bnShiftLeft;
    // (public) this << n


    BigInteger.prototype.shiftLeft = function (n) {
      var r = nbi();

      if (n < 0) {
        this.rShiftTo(-n, r);
      } else {
        this.lShiftTo(n, r);
      }

      return r;
    }; // BigInteger.prototype.shiftRight = bnShiftRight;
    // (public) this >> n


    BigInteger.prototype.shiftRight = function (n) {
      var r = nbi();

      if (n < 0) {
        this.lShiftTo(-n, r);
      } else {
        this.rShiftTo(n, r);
      }

      return r;
    }; // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    // (public) returns index of lowest 1-bit (or -1 if none)


    BigInteger.prototype.getLowestSetBit = function () {
      for (var i = 0; i < (this || _global).t; ++i) {
        if ((this || _global)[i] != 0) {
          return i * (this || _global).DB + lbit((this || _global)[i]);
        }
      }

      if ((this || _global).s < 0) {
        return (this || _global).t * (this || _global).DB;
      }

      return -1;
    }; // BigInteger.prototype.bitCount = bnBitCount;
    // (public) return number of set bits


    BigInteger.prototype.bitCount = function () {
      var r = 0;
      var x = (this || _global).s & (this || _global).DM;

      for (var i = 0; i < (this || _global).t; ++i) {
        r += cbit((this || _global)[i] ^ x);
      }

      return r;
    }; // BigInteger.prototype.testBit = bnTestBit;
    // (public) true iff nth bit is set


    BigInteger.prototype.testBit = function (n) {
      var j = Math.floor(n / (this || _global).DB);

      if (j >= (this || _global).t) {
        return (this || _global).s != 0;
      }

      return ((this || _global)[j] & 1 << n % (this || _global).DB) != 0;
    }; // BigInteger.prototype.setBit = bnSetBit;
    // (public) this | (1<<n)


    BigInteger.prototype.setBit = function (n) {
      return this.changeBit(n, op_or);
    }; // BigInteger.prototype.clearBit = bnClearBit;
    // (public) this & ~(1<<n)


    BigInteger.prototype.clearBit = function (n) {
      return this.changeBit(n, op_andnot);
    }; // BigInteger.prototype.flipBit = bnFlipBit;
    // (public) this ^ (1<<n)


    BigInteger.prototype.flipBit = function (n) {
      return this.changeBit(n, op_xor);
    }; // BigInteger.prototype.add = bnAdd;
    // (public) this + a


    BigInteger.prototype.add = function (a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    }; // BigInteger.prototype.subtract = bnSubtract;
    // (public) this - a


    BigInteger.prototype.subtract = function (a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    }; // BigInteger.prototype.multiply = bnMultiply;
    // (public) this * a


    BigInteger.prototype.multiply = function (a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    }; // BigInteger.prototype.divide = bnDivide;
    // (public) this / a


    BigInteger.prototype.divide = function (a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    }; // BigInteger.prototype.remainder = bnRemainder;
    // (public) this % a


    BigInteger.prototype.remainder = function (a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    }; // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    // (public) [this/a,this%a]


    BigInteger.prototype.divideAndRemainder = function (a) {
      var q = nbi();
      var r = nbi();
      this.divRemTo(a, q, r);
      return [q, r];
    }; // BigInteger.prototype.modPow = bnModPow;
    // (public) this^e % m (HAC 14.85)


    BigInteger.prototype.modPow = function (e, m) {
      var i = e.bitLength();
      var k;
      var r = nbv(1);
      var z;

      if (i <= 0) {
        return r;
      } else if (i < 18) {
        k = 1;
      } else if (i < 48) {
        k = 3;
      } else if (i < 144) {
        k = 4;
      } else if (i < 768) {
        k = 5;
      } else {
        k = 6;
      }

      if (i < 8) {
        z = new Classic(m);
      } else if (m.isEven()) {
        z = new Barrett(m);
      } else {
        z = new Montgomery(m);
      } // precomputation


      var g = [];
      var n = 3;
      var k1 = k - 1;
      var km = (1 << k) - 1;
      g[1] = z.convert(this || _global);

      if (k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1], g2);

        while (n <= km) {
          g[n] = nbi();
          z.mulTo(g2, g[n - 2], g[n]);
          n += 2;
        }
      }

      var j = e.t - 1;
      var w;
      var is1 = true;
      var r2 = nbi();
      var t;
      i = nbits(e[j]) - 1;

      while (j >= 0) {
        if (i >= k1) {
          w = e[j] >> i - k1 & km;
        } else {
          w = (e[j] & (1 << i + 1) - 1) << k1 - i;

          if (j > 0) {
            w |= e[j - 1] >> (this || _global).DB + i - k1;
          }
        }

        n = k;

        while ((w & 1) == 0) {
          w >>= 1;
          --n;
        }

        if ((i -= n) < 0) {
          i += (this || _global).DB;
          --j;
        }

        if (is1) {
          // ret == 1, don't bother squaring or multiplying it
          g[w].copyTo(r);
          is1 = false;
        } else {
          while (n > 1) {
            z.sqrTo(r, r2);
            z.sqrTo(r2, r);
            n -= 2;
          }

          if (n > 0) {
            z.sqrTo(r, r2);
          } else {
            t = r;
            r = r2;
            r2 = t;
          }

          z.mulTo(r2, g[w], r);
        }

        while (j >= 0 && (e[j] & 1 << i) == 0) {
          z.sqrTo(r, r2);
          t = r;
          r = r2;
          r2 = t;

          if (--i < 0) {
            i = (this || _global).DB - 1;
            --j;
          }
        }
      }

      return z.revert(r);
    }; // BigInteger.prototype.modInverse = bnModInverse;
    // (public) 1/this % m (HAC 14.61)


    BigInteger.prototype.modInverse = function (m) {
      var ac = m.isEven();

      if (this.isEven() && ac || m.signum() == 0) {
        return BigInteger.ZERO;
      }

      var u = m.clone();
      var v = this.clone();
      var a = nbv(1);
      var b = nbv(0);
      var c = nbv(0);
      var d = nbv(1);

      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);

          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this || _global, a);
              b.subTo(m, b);
            }

            a.rShiftTo(1, a);
          } else if (!b.isEven()) {
            b.subTo(m, b);
          }

          b.rShiftTo(1, b);
        }

        while (v.isEven()) {
          v.rShiftTo(1, v);

          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this || _global, c);
              d.subTo(m, d);
            }

            c.rShiftTo(1, c);
          } else if (!d.isEven()) {
            d.subTo(m, d);
          }

          d.rShiftTo(1, d);
        }

        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);

          if (ac) {
            a.subTo(c, a);
          }

          b.subTo(d, b);
        } else {
          v.subTo(u, v);

          if (ac) {
            c.subTo(a, c);
          }

          d.subTo(b, d);
        }
      }

      if (v.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO;
      }

      if (d.compareTo(m) >= 0) {
        return d.subtract(m);
      }

      if (d.signum() < 0) {
        d.addTo(m, d);
      } else {
        return d;
      }

      if (d.signum() < 0) {
        return d.add(m);
      } else {
        return d;
      }
    }; // BigInteger.prototype.pow = bnPow;
    // (public) this^e


    BigInteger.prototype.pow = function (e) {
      return this.exp(e, new NullExp());
    }; // BigInteger.prototype.gcd = bnGCD;
    // (public) gcd(this,a) (HAC 14.54)


    BigInteger.prototype.gcd = function (a) {
      var x = (this || _global).s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();

      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }

      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();

      if (g < 0) {
        return x;
      }

      if (i < g) {
        g = i;
      }

      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }

      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }

        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }

        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }

      if (g > 0) {
        y.lShiftTo(g, y);
      }

      return y;
    }; // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    // (public) test primality with certainty >= 1-.5^t


    BigInteger.prototype.isProbablePrime = function (t) {
      var i;
      var x = this.abs();

      if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i) {
          if (x[0] == lowprimes[i]) {
            return true;
          }
        }

        return false;
      }

      if (x.isEven()) {
        return false;
      }

      i = 1;

      while (i < lowprimes.length) {
        var m = lowprimes[i];
        var j = i + 1;

        while (j < lowprimes.length && m < lplim) {
          m *= lowprimes[j++];
        }

        m = x.modInt(m);

        while (i < j) {
          if (m % lowprimes[i++] == 0) {
            return false;
          }
        }
      }

      return x.millerRabin(t);
    }; //#endregion PUBLIC
    //#region PROTECTED
    // BigInteger.prototype.copyTo = bnpCopyTo;
    // (protected) copy this to r


    BigInteger.prototype.copyTo = function (r) {
      for (var i = (this || _global).t - 1; i >= 0; --i) {
        r[i] = (this || _global)[i];
      }

      r.t = (this || _global).t;
      r.s = (this || _global).s;
    }; // BigInteger.prototype.fromInt = bnpFromInt;
    // (protected) set from integer value x, -DV <= x < DV


    BigInteger.prototype.fromInt = function (x) {
      (this || _global).t = 1;
      (this || _global).s = x < 0 ? -1 : 0;

      if (x > 0) {
        (this || _global)[0] = x;
      } else if (x < -1) {
        (this || _global)[0] = x + (this || _global).DV;
      } else {
        (this || _global).t = 0;
      }
    }; // BigInteger.prototype.fromString = bnpFromString;
    // (protected) set from string and radix


    BigInteger.prototype.fromString = function (s, b) {
      var k;

      if (b == 16) {
        k = 4;
      } else if (b == 8) {
        k = 3;
      } else if (b == 256) {
        k = 8;
        /* byte array */
      } else if (b == 2) {
        k = 1;
      } else if (b == 32) {
        k = 5;
      } else if (b == 4) {
        k = 2;
      } else {
        this.fromRadix(s, b);
        return;
      }

      (this || _global).t = 0;
      (this || _global).s = 0;
      var i = s.length;
      var mi = false;
      var sh = 0;

      while (--i >= 0) {
        var x = k == 8 ? +s[i] & 255 : intAt(s, i);

        if (x < 0) {
          if (s.charAt(i) == "-") {
            mi = true;
          }

          continue;
        }

        mi = false;

        if (sh == 0) {
          (this || _global)[(this || _global).t++] = x;
        } else if (sh + k > (this || _global).DB) {
          (this || _global)[(this || _global).t - 1] |= (x & (1 << (this || _global).DB - sh) - 1) << sh;
          (this || _global)[(this || _global).t++] = x >> (this || _global).DB - sh;
        } else {
          (this || _global)[(this || _global).t - 1] |= x << sh;
        }

        sh += k;

        if (sh >= (this || _global).DB) {
          sh -= (this || _global).DB;
        }
      }

      if (k == 8 && (+s[0] & 128) != 0) {
        (this || _global).s = -1;

        if (sh > 0) {
          (this || _global)[(this || _global).t - 1] |= (1 << (this || _global).DB - sh) - 1 << sh;
        }
      }

      this.clamp();

      if (mi) {
        BigInteger.ZERO.subTo(this || _global, this || _global);
      }
    }; // BigInteger.prototype.clamp = bnpClamp;
    // (protected) clamp off excess high words


    BigInteger.prototype.clamp = function () {
      var c = (this || _global).s & (this || _global).DM;

      while ((this || _global).t > 0 && (this || _global)[(this || _global).t - 1] == c) {
        --(this || _global).t;
      }
    }; // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    // (protected) r = this << n*DB


    BigInteger.prototype.dlShiftTo = function (n, r) {
      var i;

      for (i = (this || _global).t - 1; i >= 0; --i) {
        r[i + n] = (this || _global)[i];
      }

      for (i = n - 1; i >= 0; --i) {
        r[i] = 0;
      }

      r.t = (this || _global).t + n;
      r.s = (this || _global).s;
    }; // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    // (protected) r = this >> n*DB


    BigInteger.prototype.drShiftTo = function (n, r) {
      for (var i = n; i < (this || _global).t; ++i) {
        r[i - n] = (this || _global)[i];
      }

      r.t = Math.max((this || _global).t - n, 0);
      r.s = (this || _global).s;
    }; // BigInteger.prototype.lShiftTo = bnpLShiftTo;
    // (protected) r = this << n


    BigInteger.prototype.lShiftTo = function (n, r) {
      var bs = n % (this || _global).DB;
      var cbs = (this || _global).DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n / (this || _global).DB);
      var c = (this || _global).s << bs & (this || _global).DM;

      for (var i = (this || _global).t - 1; i >= 0; --i) {
        r[i + ds + 1] = (this || _global)[i] >> cbs | c;
        c = ((this || _global)[i] & bm) << bs;
      }

      for (var i = ds - 1; i >= 0; --i) {
        r[i] = 0;
      }

      r[ds] = c;
      r.t = (this || _global).t + ds + 1;
      r.s = (this || _global).s;
      r.clamp();
    }; // BigInteger.prototype.rShiftTo = bnpRShiftTo;
    // (protected) r = this >> n


    BigInteger.prototype.rShiftTo = function (n, r) {
      r.s = (this || _global).s;
      var ds = Math.floor(n / (this || _global).DB);

      if (ds >= (this || _global).t) {
        r.t = 0;
        return;
      }

      var bs = n % (this || _global).DB;
      var cbs = (this || _global).DB - bs;
      var bm = (1 << bs) - 1;
      r[0] = (this || _global)[ds] >> bs;

      for (var i = ds + 1; i < (this || _global).t; ++i) {
        r[i - ds - 1] |= ((this || _global)[i] & bm) << cbs;
        r[i - ds] = (this || _global)[i] >> bs;
      }

      if (bs > 0) {
        r[(this || _global).t - ds - 1] |= ((this || _global).s & bm) << cbs;
      }

      r.t = (this || _global).t - ds;
      r.clamp();
    }; // BigInteger.prototype.subTo = bnpSubTo;
    // (protected) r = this - a


    BigInteger.prototype.subTo = function (a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, (this || _global).t);

      while (i < m) {
        c += (this || _global)[i] - a[i];
        r[i++] = c & (this || _global).DM;
        c >>= (this || _global).DB;
      }

      if (a.t < (this || _global).t) {
        c -= a.s;

        while (i < (this || _global).t) {
          c += (this || _global)[i];
          r[i++] = c & (this || _global).DM;
          c >>= (this || _global).DB;
        }

        c += (this || _global).s;
      } else {
        c += (this || _global).s;

        while (i < a.t) {
          c -= a[i];
          r[i++] = c & (this || _global).DM;
          c >>= (this || _global).DB;
        }

        c -= a.s;
      }

      r.s = c < 0 ? -1 : 0;

      if (c < -1) {
        r[i++] = (this || _global).DV + c;
      } else if (c > 0) {
        r[i++] = c;
      }

      r.t = i;
      r.clamp();
    }; // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    // (protected) r = this * a, r != this,a (HAC 14.12)
    // "this" should be the larger one if appropriate.


    BigInteger.prototype.multiplyTo = function (a, r) {
      var x = this.abs();
      var y = a.abs();
      var i = x.t;
      r.t = i + y.t;

      while (--i >= 0) {
        r[i] = 0;
      }

      for (i = 0; i < y.t; ++i) {
        r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
      }

      r.s = 0;
      r.clamp();

      if ((this || _global).s != a.s) {
        BigInteger.ZERO.subTo(r, r);
      }
    }; // BigInteger.prototype.squareTo = bnpSquareTo;
    // (protected) r = this^2, r != this (HAC 14.16)


    BigInteger.prototype.squareTo = function (r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;

      while (--i >= 0) {
        r[i] = 0;
      }

      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x[i], r, 2 * i, 0, 1);

        if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r[i + x.t] -= x.DV;
          r[i + x.t + 1] = 1;
        }
      }

      if (r.t > 0) {
        r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
      }

      r.s = 0;
      r.clamp();
    }; // BigInteger.prototype.divRemTo = bnpDivRemTo;
    // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
    // r != q, this != m.  q or r may be null.


    BigInteger.prototype.divRemTo = function (m, q, r) {
      var pm = m.abs();

      if (pm.t <= 0) {
        return;
      }

      var pt = this.abs();

      if (pt.t < pm.t) {
        if (q != null) {
          q.fromInt(0);
        }

        if (r != null) {
          this.copyTo(r);
        }

        return;
      }

      if (r == null) {
        r = nbi();
      }

      var y = nbi();
      var ts = (this || _global).s;
      var ms = m.s;
      var nsh = (this || _global).DB - nbits(pm[pm.t - 1]); // normalize modulus

      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else {
        pm.copyTo(y);
        pt.copyTo(r);
      }

      var ys = y.t;
      var y0 = y[ys - 1];

      if (y0 == 0) {
        return;
      }

      var yt = y0 * (1 << (this || _global).F1) + (ys > 1 ? y[ys - 2] >> (this || _global).F2 : 0);
      var d1 = (this || _global).FV / yt;
      var d2 = (1 << (this || _global).F1) / yt;
      var e = 1 << (this || _global).F2;
      var i = r.t;
      var j = i - ys;
      var t = q == null ? nbi() : q;
      y.dlShiftTo(j, t);

      if (r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t, r);
      }

      BigInteger.ONE.dlShiftTo(ys, t);
      t.subTo(y, y); // "negative" y so we can replace sub with am later

      while (y.t < ys) {
        y[y.t++] = 0;
      }

      while (--j >= 0) {
        // Estimate quotient digit
        var qd = r[--i] == y0 ? (this || _global).DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);

        if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
          // Try it out
          y.dlShiftTo(j, t);
          r.subTo(t, r);

          while (r[i] < --qd) {
            r.subTo(t, r);
          }
        }
      }

      if (q != null) {
        r.drShiftTo(ys, q);

        if (ts != ms) {
          BigInteger.ZERO.subTo(q, q);
        }
      }

      r.t = ys;
      r.clamp();

      if (nsh > 0) {
        r.rShiftTo(nsh, r);
      } // Denormalize remainder


      if (ts < 0) {
        BigInteger.ZERO.subTo(r, r);
      }
    }; // BigInteger.prototype.invDigit = bnpInvDigit;
    // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
    // justification:
    //         xy == 1 (mod m)
    //         xy =  1+km
    //   xy(2-xy) = (1+km)(1-km)
    // x[y(2-xy)] = 1-k^2m^2
    // x[y(2-xy)] == 1 (mod m^2)
    // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
    // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
    // JS multiply "overflows" differently from C/C++, so care is needed here.


    BigInteger.prototype.invDigit = function () {
      if ((this || _global).t < 1) {
        return 0;
      }

      var x = (this || _global)[0];

      if ((x & 1) == 0) {
        return 0;
      }

      var y = x & 3; // y == 1/x mod 2^2

      y = y * (2 - (x & 15) * y) & 15; // y == 1/x mod 2^4

      y = y * (2 - (x & 255) * y) & 255; // y == 1/x mod 2^8

      y = y * (2 - ((x & 65535) * y & 65535)) & 65535; // y == 1/x mod 2^16
      // last step - calculate inverse mod DV directly;
      // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints

      y = y * (2 - x * y % (this || _global).DV) % (this || _global).DV; // y == 1/x mod 2^dbits
      // we really want the negative inverse, and -DV < y < DV

      return y > 0 ? (this || _global).DV - y : -y;
    }; // BigInteger.prototype.isEven = bnpIsEven;
    // (protected) true iff this is even


    BigInteger.prototype.isEven = function () {
      return ((this || _global).t > 0 ? (this || _global)[0] & 1 : (this || _global).s) == 0;
    }; // BigInteger.prototype.exp = bnpExp;
    // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)


    BigInteger.prototype.exp = function (e, z) {
      if (e > 4294967295 || e < 1) {
        return BigInteger.ONE;
      }

      var r = nbi();
      var r2 = nbi();
      var g = z.convert(this || _global);
      var i = nbits(e) - 1;
      g.copyTo(r);

      while (--i >= 0) {
        z.sqrTo(r, r2);

        if ((e & 1 << i) > 0) {
          z.mulTo(r2, g, r);
        } else {
          var t = r;
          r = r2;
          r2 = t;
        }
      }

      return z.revert(r);
    }; // BigInteger.prototype.chunkSize = bnpChunkSize;
    // (protected) return x s.t. r^x < DV


    BigInteger.prototype.chunkSize = function (r) {
      return Math.floor(Math.LN2 * (this || _global).DB / Math.log(r));
    }; // BigInteger.prototype.toRadix = bnpToRadix;
    // (protected) convert to radix string


    BigInteger.prototype.toRadix = function (b) {
      if (b == null) {
        b = 10;
      }

      if (this.signum() == 0 || b < 2 || b > 36) {
        return "0";
      }

      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a);
      var y = nbi();
      var z = nbi();
      var r = "";
      this.divRemTo(d, y, z);

      while (y.signum() > 0) {
        r = (a + z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z);
      }

      return z.intValue().toString(b) + r;
    }; // BigInteger.prototype.fromRadix = bnpFromRadix;
    // (protected) convert from radix string


    BigInteger.prototype.fromRadix = function (s, b) {
      this.fromInt(0);

      if (b == null) {
        b = 10;
      }

      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs);
      var mi = false;
      var j = 0;
      var w = 0;

      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);

        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0) {
            mi = true;
          }

          continue;
        }

        w = b * w + x;

        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }

      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }

      if (mi) {
        BigInteger.ZERO.subTo(this || _global, this || _global);
      }
    }; // BigInteger.prototype.fromNumber = bnpFromNumber;
    // (protected) alternate constructor


    BigInteger.prototype.fromNumber = function (a, b, c) {
      if ("number" == typeof b) {
        // new BigInteger(int,int,RNG)
        if (a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, c);

          if (!this.testBit(a - 1)) {
            // force MSB set
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this || _global);
          }

          if (this.isEven()) {
            this.dAddOffset(1, 0);
          } // force odd


          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);

            if (this.bitLength() > a) {
              this.subTo(BigInteger.ONE.shiftLeft(a - 1), this || _global);
            }
          }
        }
      } else {
        // new BigInteger(int,RNG)
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);

        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else {
          x[0] = 0;
        }

        this.fromString(x, 256);
      }
    }; // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    // (protected) r = this op a (bitwise)


    BigInteger.prototype.bitwiseTo = function (a, op, r) {
      var i;
      var f;
      var m = Math.min(a.t, (this || _global).t);

      for (i = 0; i < m; ++i) {
        r[i] = op((this || _global)[i], a[i]);
      }

      if (a.t < (this || _global).t) {
        f = a.s & (this || _global).DM;

        for (i = m; i < (this || _global).t; ++i) {
          r[i] = op((this || _global)[i], f);
        }

        r.t = (this || _global).t;
      } else {
        f = (this || _global).s & (this || _global).DM;

        for (i = m; i < a.t; ++i) {
          r[i] = op(f, a[i]);
        }

        r.t = a.t;
      }

      r.s = op((this || _global).s, a.s);
      r.clamp();
    }; // BigInteger.prototype.changeBit = bnpChangeBit;
    // (protected) this op (1<<n)


    BigInteger.prototype.changeBit = function (n, op) {
      var r = BigInteger.ONE.shiftLeft(n);
      this.bitwiseTo(r, op, r);
      return r;
    }; // BigInteger.prototype.addTo = bnpAddTo;
    // (protected) r = this + a


    BigInteger.prototype.addTo = function (a, r) {
      var i = 0;
      var c = 0;
      var m = Math.min(a.t, (this || _global).t);

      while (i < m) {
        c += (this || _global)[i] + a[i];
        r[i++] = c & (this || _global).DM;
        c >>= (this || _global).DB;
      }

      if (a.t < (this || _global).t) {
        c += a.s;

        while (i < (this || _global).t) {
          c += (this || _global)[i];
          r[i++] = c & (this || _global).DM;
          c >>= (this || _global).DB;
        }

        c += (this || _global).s;
      } else {
        c += (this || _global).s;

        while (i < a.t) {
          c += a[i];
          r[i++] = c & (this || _global).DM;
          c >>= (this || _global).DB;
        }

        c += a.s;
      }

      r.s = c < 0 ? -1 : 0;

      if (c > 0) {
        r[i++] = c;
      } else if (c < -1) {
        r[i++] = (this || _global).DV + c;
      }

      r.t = i;
      r.clamp();
    }; // BigInteger.prototype.dMultiply = bnpDMultiply;
    // (protected) this *= n, this >= 0, 1 < n < DV


    BigInteger.prototype.dMultiply = function (n) {
      (this || _global)[(this || _global).t] = this.am(0, n - 1, this || _global, 0, 0, (this || _global).t);
      ++(this || _global).t;
      this.clamp();
    }; // BigInteger.prototype.dAddOffset = bnpDAddOffset;
    // (protected) this += n << w words, this >= 0


    BigInteger.prototype.dAddOffset = function (n, w) {
      if (n == 0) {
        return;
      }

      while ((this || _global).t <= w) {
        (this || _global)[(this || _global).t++] = 0;
      }

      (this || _global)[w] += n;

      while ((this || _global)[w] >= (this || _global).DV) {
        (this || _global)[w] -= (this || _global).DV;

        if (++w >= (this || _global).t) {
          (this || _global)[(this || _global).t++] = 0;
        }

        ++(this || _global)[w];
      }
    }; // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    // (protected) r = lower n words of "this * a", a.t <= n
    // "this" should be the larger one if appropriate.


    BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
      var i = Math.min((this || _global).t + a.t, n);
      r.s = 0; // assumes a,this >= 0

      r.t = i;

      while (i > 0) {
        r[--i] = 0;
      }

      for (var j = r.t - (this || _global).t; i < j; ++i) {
        r[i + (this || _global).t] = this.am(0, a[i], r, i, 0, (this || _global).t);
      }

      for (var j = Math.min(a.t, n); i < j; ++i) {
        this.am(0, a[i], r, i, 0, n - i);
      }

      r.clamp();
    }; // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    // (protected) r = "this * a" without lower n words, n > 0
    // "this" should be the larger one if appropriate.


    BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
      --n;
      var i = r.t = (this || _global).t + a.t - n;
      r.s = 0; // assumes a,this >= 0

      while (--i >= 0) {
        r[i] = 0;
      }

      for (i = Math.max(n - (this || _global).t, 0); i < a.t; ++i) {
        r[(this || _global).t + i - n] = this.am(n - i, a[i], r, 0, 0, (this || _global).t + i - n);
      }

      r.clamp();
      r.drShiftTo(1, r);
    }; // BigInteger.prototype.modInt = bnpModInt;
    // (protected) this % n, n < 2^26


    BigInteger.prototype.modInt = function (n) {
      if (n <= 0) {
        return 0;
      }

      var d = (this || _global).DV % n;
      var r = (this || _global).s < 0 ? n - 1 : 0;

      if ((this || _global).t > 0) {
        if (d == 0) {
          r = (this || _global)[0] % n;
        } else {
          for (var i = (this || _global).t - 1; i >= 0; --i) {
            r = (d * r + (this || _global)[i]) % n;
          }
        }
      }

      return r;
    }; // BigInteger.prototype.millerRabin = bnpMillerRabin;
    // (protected) true if probably prime (HAC 4.24, Miller-Rabin)


    BigInteger.prototype.millerRabin = function (t) {
      var n1 = this.subtract(BigInteger.ONE);
      var k = n1.getLowestSetBit();

      if (k <= 0) {
        return false;
      }

      var r = n1.shiftRight(k);
      t = t + 1 >> 1;

      if (t > lowprimes.length) {
        t = lowprimes.length;
      }

      var a = nbi();

      for (var i = 0; i < t; ++i) {
        // Pick bases at random, instead of starting at 2
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y = a.modPow(r, this || _global);

        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;

          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this || _global);

            if (y.compareTo(BigInteger.ONE) == 0) {
              return false;
            }
          }

          if (y.compareTo(n1) != 0) {
            return false;
          }
        }
      }

      return true;
    }; // BigInteger.prototype.square = bnSquare;
    // (public) this^2


    BigInteger.prototype.square = function () {
      var r = nbi();
      this.squareTo(r);
      return r;
    }; //#region ASYNC
    // Public API method


    BigInteger.prototype.gcda = function (a, callback) {
      var x = (this || _global).s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();

      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }

      var i = x.getLowestSetBit();
      var g = y.getLowestSetBit();

      if (g < 0) {
        callback(x);
        return;
      }

      if (i < g) {
        g = i;
      }

      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      } // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.


      var gcda1 = function () {
        if ((i = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i, x);
        }

        if ((i = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i, y);
        }

        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }

        if (!(x.signum() > 0)) {
          if (g > 0) {
            y.lShiftTo(g, y);
          }

          setTimeout(function () {
            callback(y);
          }, 0); // escape
        } else {
          setTimeout(gcda1, 0);
        }
      };

      setTimeout(gcda1, 10);
    }; // (protected) alternate constructor


    BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {
      if ("number" == typeof b) {
        if (a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, c);

          if (!this.testBit(a - 1)) {
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this || _global);
          }

          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }

          var bnp_1 = this || _global;

          var bnpfn1_1 = function () {
            bnp_1.dAddOffset(2, 0);

            if (bnp_1.bitLength() > a) {
              bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);
            }

            if (bnp_1.isProbablePrime(b)) {
              setTimeout(function () {
                callback();
              }, 0); // escape
            } else {
              setTimeout(bnpfn1_1, 0);
            }
          };

          setTimeout(bnpfn1_1, 0);
        }
      } else {
        var x = [];
        var t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);

        if (t > 0) {
          x[0] &= (1 << t) - 1;
        } else {
          x[0] = 0;
        }

        this.fromString(x, 256);
      }
    };

    return BigInteger;
  }(); //#region REDUCERS
  //#region NullExp


  var NullExp =
  /** @class */
  function () {
    function NullExp() {} // NullExp.prototype.convert = nNop;


    NullExp.prototype.convert = function (x) {
      return x;
    }; // NullExp.prototype.revert = nNop;


    NullExp.prototype.revert = function (x) {
      return x;
    }; // NullExp.prototype.mulTo = nMulTo;


    NullExp.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
    }; // NullExp.prototype.sqrTo = nSqrTo;


    NullExp.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
    };

    return NullExp;
  }(); // Modular reduction using "classic" algorithm


  var Classic =
  /** @class */
  function () {
    function Classic(m) {
      (this || _global).m = m;
    } // Classic.prototype.convert = cConvert;


    Classic.prototype.convert = function (x) {
      if (x.s < 0 || x.compareTo((this || _global).m) >= 0) {
        return x.mod((this || _global).m);
      } else {
        return x;
      }
    }; // Classic.prototype.revert = cRevert;


    Classic.prototype.revert = function (x) {
      return x;
    }; // Classic.prototype.reduce = cReduce;


    Classic.prototype.reduce = function (x) {
      x.divRemTo((this || _global).m, null, x);
    }; // Classic.prototype.mulTo = cMulTo;


    Classic.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }; // Classic.prototype.sqrTo = cSqrTo;


    Classic.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };

    return Classic;
  }(); //#endregion
  //#region Montgomery
  // Montgomery reduction


  var Montgomery =
  /** @class */
  function () {
    function Montgomery(m) {
      (this || _global).m = m;
      (this || _global).mp = m.invDigit();
      (this || _global).mpl = (this || _global).mp & 32767;
      (this || _global).mph = (this || _global).mp >> 15;
      (this || _global).um = (1 << m.DB - 15) - 1;
      (this || _global).mt2 = 2 * m.t;
    } // Montgomery.prototype.convert = montConvert;
    // xR mod m


    Montgomery.prototype.convert = function (x) {
      var r = nbi();
      x.abs().dlShiftTo((this || _global).m.t, r);
      r.divRemTo((this || _global).m, null, r);

      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        (this || _global).m.subTo(r, r);
      }

      return r;
    }; // Montgomery.prototype.revert = montRevert;
    // x/R mod m


    Montgomery.prototype.revert = function (x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }; // Montgomery.prototype.reduce = montReduce;
    // x = x/R mod m (HAC 14.32)


    Montgomery.prototype.reduce = function (x) {
      while (x.t <= (this || _global).mt2) {
        // pad x so am has enough room later
        x[x.t++] = 0;
      }

      for (var i = 0; i < (this || _global).m.t; ++i) {
        // faster way of calculating u0 = x[i]*mp mod DV
        var j = x[i] & 32767;
        var u0 = j * (this || _global).mpl + ((j * (this || _global).mph + (x[i] >> 15) * (this || _global).mpl & (this || _global).um) << 15) & x.DM; // use am to combine the multiply-shift-add into one call

        j = i + (this || _global).m.t;
        x[j] += (this || _global).m.am(0, u0, x, i, 0, (this || _global).m.t); // propagate carry

        while (x[j] >= x.DV) {
          x[j] -= x.DV;
          x[++j]++;
        }
      }

      x.clamp();
      x.drShiftTo((this || _global).m.t, x);

      if (x.compareTo((this || _global).m) >= 0) {
        x.subTo((this || _global).m, x);
      }
    }; // Montgomery.prototype.mulTo = montMulTo;
    // r = "xy/R mod m"; x,y != r


    Montgomery.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }; // Montgomery.prototype.sqrTo = montSqrTo;
    // r = "x^2/R mod m"; x != r


    Montgomery.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };

    return Montgomery;
  }(); //#endregion Montgomery
  //#region Barrett
  // Barrett modular reduction


  var Barrett =
  /** @class */
  function () {
    function Barrett(m) {
      (this || _global).m = m; // setup Barrett

      (this || _global).r2 = nbi();
      (this || _global).q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, (this || _global).r2);
      (this || _global).mu = (this || _global).r2.divide(m);
    } // Barrett.prototype.convert = barrettConvert;


    Barrett.prototype.convert = function (x) {
      if (x.s < 0 || x.t > 2 * (this || _global).m.t) {
        return x.mod((this || _global).m);
      } else if (x.compareTo((this || _global).m) < 0) {
        return x;
      } else {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    }; // Barrett.prototype.revert = barrettRevert;


    Barrett.prototype.revert = function (x) {
      return x;
    }; // Barrett.prototype.reduce = barrettReduce;
    // x = x mod m (HAC 14.42)


    Barrett.prototype.reduce = function (x) {
      x.drShiftTo((this || _global).m.t - 1, (this || _global).r2);

      if (x.t > (this || _global).m.t + 1) {
        x.t = (this || _global).m.t + 1;
        x.clamp();
      }

      (this || _global).mu.multiplyUpperTo((this || _global).r2, (this || _global).m.t + 1, (this || _global).q3);

      (this || _global).m.multiplyLowerTo((this || _global).q3, (this || _global).m.t + 1, (this || _global).r2);

      while (x.compareTo((this || _global).r2) < 0) {
        x.dAddOffset(1, (this || _global).m.t + 1);
      }

      x.subTo((this || _global).r2, x);

      while (x.compareTo((this || _global).m) >= 0) {
        x.subTo((this || _global).m, x);
      }
    }; // Barrett.prototype.mulTo = barrettMulTo;
    // r = x*y mod m; x,y != r


    Barrett.prototype.mulTo = function (x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }; // Barrett.prototype.sqrTo = barrettSqrTo;
    // r = x^2 mod m; x != r


    Barrett.prototype.sqrTo = function (x, r) {
      x.squareTo(r);
      this.reduce(r);
    };

    return Barrett;
  }(); //#endregion
  //#endregion REDUCERS
  // return new, unset BigInteger


  function nbi() {
    return new BigInteger(null);
  }

  function parseBigInt(str, r) {
    return new BigInteger(str, r);
  } // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)


  function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * (this || _global)[i++] + w[j] + c;
      c = Math.floor(v / 67108864);
      w[j++] = v & 67108863;
    }

    return c;
  } // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)


  function am2(i, x, w, j, c, n) {
    var xl = x & 32767;
    var xh = x >> 15;

    while (--n >= 0) {
      var l = (this || _global)[i] & 32767;
      var h = (this || _global)[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 1073741823;
    }

    return c;
  } // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.


  function am3(i, x, w, j, c, n) {
    var xl = x & 16383;
    var xh = x >> 14;

    while (--n >= 0) {
      var l = (this || _global)[i] & 16383;
      var h = (this || _global)[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 16383) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 268435455;
    }

    return c;
  }

  if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = am2;
    dbits = 30;
  } else if (j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else {
    // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = (1 << dbits) - 1;
  BigInteger.prototype.DV = 1 << dbits;
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP; // Digit conversions

  var BI_RC = [];
  var rr;
  var vv;
  rr = "0".charCodeAt(0);

  for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
  }

  rr = "a".charCodeAt(0);

  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }

  rr = "A".charCodeAt(0);

  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }

  function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return c == null ? -1 : c;
  } // return bigint initialized to value


  function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
  } // returns bit length of the integer x


  function nbits(x) {
    var r = 1;
    var t;

    if ((t = x >>> 16) != 0) {
      x = t;
      r += 16;
    }

    if ((t = x >> 8) != 0) {
      x = t;
      r += 8;
    }

    if ((t = x >> 4) != 0) {
      x = t;
      r += 4;
    }

    if ((t = x >> 2) != 0) {
      x = t;
      r += 2;
    }

    if ((t = x >> 1) != 0) {
      x = t;
      r += 1;
    }

    return r;
  } // "constants"


  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1); // prng4.js - uses Arcfour as a PRNG

  var Arcfour =
  /** @class */
  function () {
    function Arcfour() {
      (this || _global).i = 0;
      (this || _global).j = 0;
      (this || _global).S = [];
    } // Arcfour.prototype.init = ARC4init;
    // Initialize arcfour context from key, an array of ints, each from [0..255]


    Arcfour.prototype.init = function (key) {
      var i;
      var j;
      var t;

      for (i = 0; i < 256; ++i) {
        (this || _global).S[i] = i;
      }

      j = 0;

      for (i = 0; i < 256; ++i) {
        j = j + (this || _global).S[i] + key[i % key.length] & 255;
        t = (this || _global).S[i];
        (this || _global).S[i] = (this || _global).S[j];
        (this || _global).S[j] = t;
      }

      (this || _global).i = 0;
      (this || _global).j = 0;
    }; // Arcfour.prototype.next = ARC4next;


    Arcfour.prototype.next = function () {
      var t;
      (this || _global).i = (this || _global).i + 1 & 255;
      (this || _global).j = (this || _global).j + (this || _global).S[(this || _global).i] & 255;
      t = (this || _global).S[(this || _global).i];
      (this || _global).S[(this || _global).i] = (this || _global).S[(this || _global).j];
      (this || _global).S[(this || _global).j] = t;
      return (this || _global).S[t + (this || _global).S[(this || _global).i] & 255];
    };

    return Arcfour;
  }(); // Plug in your RNG constructor here


  function prng_newstate() {
    return new Arcfour();
  } // Pool size must be a multiple of 4 and greater than 32.
  // An array of bytes the size of the pool will be passed to init()


  var rng_psize = 256; // Random number generator - requires a PRNG backend, e.g. prng4.js

  var rng_state;
  var rng_pool = null;
  var rng_pptr; // Initialize the pool with junk if needed.

  if (rng_pool == null) {
    rng_pool = [];
    rng_pptr = 0;
    var t = void 0;

    if (window.crypto && window.crypto.getRandomValues) {
      // Extract entropy (2048 bits) from RNG if available
      var z = new Uint32Array(256);
      window.crypto.getRandomValues(z);

      for (t = 0; t < z.length; ++t) {
        rng_pool[rng_pptr++] = z[t] & 255;
      }
    } // Use mouse events for entropy, if we do not have enough entropy by the time
    // we need it, entropy will be generated by Math.random.


    var onMouseMoveListener_1 = function (ev) {
      (this || _global).count = (this || _global).count || 0;

      if ((this || _global).count >= 256 || rng_pptr >= rng_psize) {
        if (window.removeEventListener) {
          window.removeEventListener("mousemove", onMouseMoveListener_1, false);
        } else if (window.detachEvent) {
          window.detachEvent("onmousemove", onMouseMoveListener_1);
        }

        return;
      }

      try {
        var mouseCoordinates = ev.x + ev.y;
        rng_pool[rng_pptr++] = mouseCoordinates & 255;
        (this || _global).count += 1;
      } catch (e) {// Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
      }
    };

    if (window.addEventListener) {
      window.addEventListener("mousemove", onMouseMoveListener_1, false);
    } else if (window.attachEvent) {
      window.attachEvent("onmousemove", onMouseMoveListener_1);
    }
  }

  function rng_get_byte() {
    if (rng_state == null) {
      rng_state = prng_newstate(); // At this point, we may not have collected enough entropy.  If not, fall back to Math.random

      while (rng_pptr < rng_psize) {
        var random = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = random & 255;
      }

      rng_state.init(rng_pool);

      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
        rng_pool[rng_pptr] = 0;
      }

      rng_pptr = 0;
    } // TODO: allow reseeding after first request


    return rng_state.next();
  }

  var SecureRandom =
  /** @class */
  function () {
    function SecureRandom() {}

    SecureRandom.prototype.nextBytes = function (ba) {
      for (var i = 0; i < ba.length; ++i) {
        ba[i] = rng_get_byte();
      }
    };

    return SecureRandom;
  }(); // Depends on jsbn.js and rng.js
  // function linebrk(s,n) {
  //   var ret = "";
  //   var i = 0;
  //   while(i + n < s.length) {
  //     ret += s.substring(i,i+n) + "\n";
  //     i += n;
  //   }
  //   return ret + s.substring(i,s.length);
  // }
  // function byte2Hex(b) {
  //   if(b < 0x10)
  //     return "0" + b.toString(16);
  //   else
  //     return b.toString(16);
  // }


  function pkcs1pad1(s, n) {
    if (n < s.length + 22) {
      console.error("Message too long for RSA");
      return null;
    }

    var len = n - s.length - 6;
    var filler = "";

    for (var f = 0; f < len; f += 2) {
      filler += "ff";
    }

    var m = "0001" + filler + "00" + s;
    return parseBigInt(m, 16);
  } // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint


  function pkcs1pad2(s, n) {
    if (n < s.length + 11) {
      // TODO: fix for utf-8
      console.error("Message too long for RSA");
      return null;
    }

    var ba = [];
    var i = s.length - 1;

    while (i >= 0 && n > 0) {
      var c = s.charCodeAt(i--);

      if (c < 128) {
        // encode using utf-8
        ba[--n] = c;
      } else if (c > 127 && c < 2048) {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 | 192;
      } else {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 & 63 | 128;
        ba[--n] = c >> 12 | 224;
      }
    }

    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = [];

    while (n > 2) {
      // random non-zero pad
      x[0] = 0;

      while (x[0] == 0) {
        rng.nextBytes(x);
      }

      ba[--n] = x[0];
    }

    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
  } // "empty" RSA key constructor


  var RSAKey =
  /** @class */
  function () {
    function RSAKey() {
      (this || _global).n = null;
      (this || _global).e = 0;
      (this || _global).d = null;
      (this || _global).p = null;
      (this || _global).q = null;
      (this || _global).dmp1 = null;
      (this || _global).dmq1 = null;
      (this || _global).coeff = null;
    } //#region PROTECTED
    // protected
    // RSAKey.prototype.doPublic = RSADoPublic;
    // Perform raw public operation on "x": return x^e (mod n)


    RSAKey.prototype.doPublic = function (x) {
      return x.modPowInt((this || _global).e, (this || _global).n);
    }; // RSAKey.prototype.doPrivate = RSADoPrivate;
    // Perform raw private operation on "x": return x^d (mod n)


    RSAKey.prototype.doPrivate = function (x) {
      if ((this || _global).p == null || (this || _global).q == null) {
        return x.modPow((this || _global).d, (this || _global).n);
      } // TODO: re-calculate any missing CRT params


      var xp = x.mod((this || _global).p).modPow((this || _global).dmp1, (this || _global).p);
      var xq = x.mod((this || _global).q).modPow((this || _global).dmq1, (this || _global).q);

      while (xp.compareTo(xq) < 0) {
        xp = xp.add((this || _global).p);
      }

      return xp.subtract(xq).multiply((this || _global).coeff).mod((this || _global).p).multiply((this || _global).q).add(xq);
    }; //#endregion PROTECTED
    //#region PUBLIC
    // RSAKey.prototype.setPublic = RSASetPublic;
    // Set the public key fields N and e from hex strings


    RSAKey.prototype.setPublic = function (N, E) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        (this || _global).n = parseBigInt(N, 16);
        (this || _global).e = parseInt(E, 16);
      } else {
        console.error("Invalid RSA public key");
      }
    }; // RSAKey.prototype.encrypt = RSAEncrypt;
    // Return the PKCS#1 RSA encryption of "text" as an even-length hex string


    RSAKey.prototype.encrypt = function (text) {
      var m = pkcs1pad2(text, (this || _global).n.bitLength() + 7 >> 3);

      if (m == null) {
        return null;
      }

      var c = this.doPublic(m);

      if (c == null) {
        return null;
      }

      var h = c.toString(16);

      if ((h.length & 1) == 0) {
        return h;
      } else {
        return "0" + h;
      }
    }; // RSAKey.prototype.setPrivate = RSASetPrivate;
    // Set the private key fields N, e, and d from hex strings


    RSAKey.prototype.setPrivate = function (N, E, D) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        (this || _global).n = parseBigInt(N, 16);
        (this || _global).e = parseInt(E, 16);
        (this || _global).d = parseBigInt(D, 16);
      } else {
        console.error("Invalid RSA private key");
      }
    }; // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
    // Set the private key fields N, e, d and CRT params from hex strings


    RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {
      if (N != null && E != null && N.length > 0 && E.length > 0) {
        (this || _global).n = parseBigInt(N, 16);
        (this || _global).e = parseInt(E, 16);
        (this || _global).d = parseBigInt(D, 16);
        (this || _global).p = parseBigInt(P, 16);
        (this || _global).q = parseBigInt(Q, 16);
        (this || _global).dmp1 = parseBigInt(DP, 16);
        (this || _global).dmq1 = parseBigInt(DQ, 16);
        (this || _global).coeff = parseBigInt(C, 16);
      } else {
        console.error("Invalid RSA private key");
      }
    }; // RSAKey.prototype.generate = RSAGenerate;
    // Generate a new random private key B bits long, using public expt E


    RSAKey.prototype.generate = function (B, E) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      (this || _global).e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);

      for (;;) {
        for (;;) {
          (this || _global).p = new BigInteger(B - qs, 1, rng);

          if ((this || _global).p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && (this || _global).p.isProbablePrime(10)) {
            break;
          }
        }

        for (;;) {
          (this || _global).q = new BigInteger(qs, 1, rng);

          if ((this || _global).q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && (this || _global).q.isProbablePrime(10)) {
            break;
          }
        }

        if ((this || _global).p.compareTo((this || _global).q) <= 0) {
          var t = (this || _global).p;
          (this || _global).p = (this || _global).q;
          (this || _global).q = t;
        }

        var p1 = (this || _global).p.subtract(BigInteger.ONE);

        var q1 = (this || _global).q.subtract(BigInteger.ONE);

        var phi = p1.multiply(q1);

        if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
          (this || _global).n = (this || _global).p.multiply((this || _global).q);
          (this || _global).d = ee.modInverse(phi);
          (this || _global).dmp1 = (this || _global).d.mod(p1);
          (this || _global).dmq1 = (this || _global).d.mod(q1);
          (this || _global).coeff = (this || _global).q.modInverse((this || _global).p);
          break;
        }
      }
    }; // RSAKey.prototype.decrypt = RSADecrypt;
    // Return the PKCS#1 RSA decryption of "ctext".
    // "ctext" is an even-length hex string and the output is a plain string.


    RSAKey.prototype.decrypt = function (ctext) {
      var c = parseBigInt(ctext, 16);
      var m = this.doPrivate(c);

      if (m == null) {
        return null;
      }

      return pkcs1unpad2(m, (this || _global).n.bitLength() + 7 >> 3);
    }; // Generate a new random private key B bits long, using public expt E


    RSAKey.prototype.generateAsync = function (B, E, callback) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      (this || _global).e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);
      var rsa = this || _global; // These functions have non-descript names because they were originally for(;;) loops.
      // I don't know about cryptography to give them better names than loop1-4.

      var loop1 = function () {
        var loop4 = function () {
          if (rsa.p.compareTo(rsa.q) <= 0) {
            var t = rsa.p;
            rsa.p = rsa.q;
            rsa.q = t;
          }

          var p1 = rsa.p.subtract(BigInteger.ONE);
          var q1 = rsa.q.subtract(BigInteger.ONE);
          var phi = p1.multiply(q1);

          if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
            rsa.n = rsa.p.multiply(rsa.q);
            rsa.d = ee.modInverse(phi);
            rsa.dmp1 = rsa.d.mod(p1);
            rsa.dmq1 = rsa.d.mod(q1);
            rsa.coeff = rsa.q.modInverse(rsa.p);
            setTimeout(function () {
              callback();
            }, 0); // escape
          } else {
            setTimeout(loop1, 0);
          }
        };

        var loop3 = function () {
          rsa.q = nbi();
          rsa.q.fromNumberAsync(qs, 1, rng, function () {
            rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                setTimeout(loop4, 0);
              } else {
                setTimeout(loop3, 0);
              }
            });
          });
        };

        var loop2 = function () {
          rsa.p = nbi();
          rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
            rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                setTimeout(loop3, 0);
              } else {
                setTimeout(loop2, 0);
              }
            });
          });
        };

        setTimeout(loop2, 0);
      };

      setTimeout(loop1, 0);
    };

    RSAKey.prototype.sign = function (text, digestMethod, digestName) {
      var header = getDigestHeader(digestName);
      var digest = header + digestMethod(text).toString();
      var m = pkcs1pad1(digest, (this || _global).n.bitLength() / 4);

      if (m == null) {
        return null;
      }

      var c = this.doPrivate(m);

      if (c == null) {
        return null;
      }

      var h = c.toString(16);

      if ((h.length & 1) == 0) {
        return h;
      } else {
        return "0" + h;
      }
    };

    RSAKey.prototype.verify = function (text, signature, digestMethod) {
      var c = parseBigInt(signature, 16);
      var m = this.doPublic(c);

      if (m == null) {
        return null;
      }

      var unpadded = m.toString(16).replace(/^1f+00/, "");
      var digest = removeDigestHeader(unpadded);
      return digest == digestMethod(text).toString();
    };

    return RSAKey;
  }(); // Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext


  function pkcs1unpad2(d, n) {
    var b = d.toByteArray();
    var i = 0;

    while (i < b.length && b[i] == 0) {
      ++i;
    }

    if (b.length - i != n - 1 || b[i] != 2) {
      return null;
    }

    ++i;

    while (b[i] != 0) {
      if (++i >= b.length) {
        return null;
      }
    }

    var ret = "";

    while (++i < b.length) {
      var c = b[i] & 255;

      if (c < 128) {
        // utf-8 decode
        ret += String.fromCharCode(c);
      } else if (c > 191 && c < 224) {
        ret += String.fromCharCode((c & 31) << 6 | b[i + 1] & 63);
        ++i;
      } else {
        ret += String.fromCharCode((c & 15) << 12 | (b[i + 1] & 63) << 6 | b[i + 2] & 63);
        i += 2;
      }
    }

    return ret;
  } // https://tools.ietf.org/html/rfc3447#page-43


  var DIGEST_HEADERS = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414"
  };

  function getDigestHeader(name) {
    return DIGEST_HEADERS[name] || "";
  }

  function removeDigestHeader(str) {
    for (var name_1 in DIGEST_HEADERS) {
      if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
        var header = DIGEST_HEADERS[name_1];
        var len = header.length;

        if (str.substr(0, len) == header) {
          return str.substr(len);
        }
      }
    }

    return str;
  } // Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
  // function RSAEncryptB64(text) {
  //  var h = this.encrypt(text);
  //  if(h) return hex2b64(h); else return null;
  // }
  // public
  // RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

  /*!
  Copyright (c) 2011, Yahoo! Inc. All rights reserved.
  Code licensed under the BSD License:
  http://developer.yahoo.com/yui/license.html
  version: 2.9.0
  */


  var YAHOO = {};
  YAHOO.lang = {
    /**
     * Utility to set up the prototype, constructor and superclass properties to
     * support an inheritance strategy that can chain constructors and methods.
     * Static members will not be inherited.
     *
     * @method extend
     * @static
     * @param {Function} subc   the object to modify
     * @param {Function} superc the object to inherit
     * @param {Object} overrides  additional properties/methods to add to the
     *                              subclass prototype.  These will override the
     *                              matching items obtained from the superclass
     *                              if present.
     */
    extend: function (subc, superc, overrides) {
      if (!superc || !subc) {
        throw new Error("YAHOO.lang.extend failed, please check that " + "all dependencies are included.");
      }

      var F = function () {};

      F.prototype = superc.prototype;
      subc.prototype = new F();
      subc.prototype.constructor = subc;
      subc.superclass = superc.prototype;

      if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
      }

      if (overrides) {
        var i;

        for (i in overrides) {
          subc.prototype[i] = overrides[i];
        }
        /*
         * IE will not enumerate native functions in a derived object even if the
         * function was overridden.  This is a workaround for specific functions
         * we care about on the Object prototype.
         * @property _IEEnumFix
         * @param {Function} r  the object to receive the augmentation
         * @param {Function} s  the object that supplies the properties to augment
         * @static
         * @private
         */


        var _IEEnumFix = function () {},
            ADD = ["toString", "valueOf"];

        try {
          if (/MSIE/.test(navigator.userAgent)) {
            _IEEnumFix = function (r, s) {
              for (i = 0; i < ADD.length; i = i + 1) {
                var fname = ADD[i],
                    f = s[fname];

                if (typeof f === "function" && f != Object.prototype[fname]) {
                  r[fname] = f;
                }
              }
            };
          }
        } catch (ex) {}

        _IEEnumFix(subc.prototype, overrides);
      }
    }
  };
  /* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
   */

  /**
   * @fileOverview
   * @name asn1-1.0.js
   * @author Kenji Urushima kenji.urushima@gmail.com
   * @version asn1 1.0.13 (2017-Jun-02)
   * @since jsrsasign 2.1
   * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
   */

  /**
   * kjur's class library name space
   * <p>
   * This name space provides following name spaces:
   * <ul>
   * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
   * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
   * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
   * class and utilities</li>
   * </ul>
   * </p>
   * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
   * @name KJUR
   * @namespace kjur's class library name space
   */

  var KJUR = {};
  /**
   * kjur's ASN.1 class library name space
   * <p>
   * This is ITU-T X.690 ASN.1 DER encoder class library and
   * class structure and methods is very similar to
   * org.bouncycastle.asn1 package of
   * well known BouncyCaslte Cryptography Library.
   * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
   * Here are ASN.1 DER primitive classes.
   * <ul>
   * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>
   * <li>0x02 {@link KJUR.asn1.DERInteger}</li>
   * <li>0x03 {@link KJUR.asn1.DERBitString}</li>
   * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>
   * <li>0x05 {@link KJUR.asn1.DERNull}</li>
   * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>
   * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>
   * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>
   * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>
   * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>
   * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>
   * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>
   * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>
   * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>
   * <li>0x30 {@link KJUR.asn1.DERSequence}</li>
   * <li>0x31 {@link KJUR.asn1.DERSet}</li>
   * </ul>
   * <h4>OTHER ASN.1 CLASSES</h4>
   * <ul>
   * <li>{@link KJUR.asn1.ASN1Object}</li>
   * <li>{@link KJUR.asn1.DERAbstractString}</li>
   * <li>{@link KJUR.asn1.DERAbstractTime}</li>
   * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
   * <li>{@link KJUR.asn1.DERTaggedObject}</li>
   * </ul>
   * <h4>SUB NAME SPACES</h4>
   * <ul>
   * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>
   * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>
   * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>
   * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>
   * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>
   * </ul>
   * </p>
   * NOTE: Please ignore method summary and document of this namespace.
   * This caused by a bug of jsdoc2.
   * @name KJUR.asn1
   * @namespace
   */

  if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};
  /**
   * ASN1 utilities class
   * @name KJUR.asn1.ASN1Util
   * @class ASN1 utilities class
   * @since asn1 1.0.2
   */

  KJUR.asn1.ASN1Util = new function () {
    (this || _global).integerToByteHex = function (i) {
      var h = i.toString(16);
      if (h.length % 2 == 1) h = "0" + h;
      return h;
    };

    (this || _global).bigIntToMinTwosComplementsHex = function (bigIntegerValue) {
      var h = bigIntegerValue.toString(16);

      if (h.substr(0, 1) != "-") {
        if (h.length % 2 == 1) {
          h = "0" + h;
        } else {
          if (!h.match(/^[0-7]/)) {
            h = "00" + h;
          }
        }
      } else {
        var hPos = h.substr(1);
        var xorLen = hPos.length;

        if (xorLen % 2 == 1) {
          xorLen += 1;
        } else {
          if (!h.match(/^[0-7]/)) {
            xorLen += 2;
          }
        }

        var hMask = "";

        for (var i = 0; i < xorLen; i++) {
          hMask += "f";
        }

        var biMask = new BigInteger(hMask, 16);
        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
        h = biNeg.toString(16).replace(/^-/, "");
      }

      return h;
    };
    /**
     * get PEM string from hexadecimal data and header string
     * @name getPEMStringFromHex
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {String} dataHex hexadecimal string of PEM body
     * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
     * @return {String} PEM formatted string of input data
     * @description
     * This method converts a hexadecimal string to a PEM string with
     * a specified header. Its line break will be CRLF("\r\n").
     * @example
     * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
     * // value of pem will be:
     * -----BEGIN PRIVATE KEY-----
     * YWFh
     * -----END PRIVATE KEY-----
     */


    (this || _global).getPEMStringFromHex = function (dataHex, pemHeader) {
      return hextopem(dataHex, pemHeader);
    };
    /**
     * generate ASN1Object specifed by JSON parameters
     * @name newObject
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {Array} param JSON parameter to generate ASN1Object
     * @return {KJUR.asn1.ASN1Object} generated object
     * @since asn1 1.0.3
     * @description
     * generate any ASN1Object specified by JSON param
     * including ASN.1 primitive or structured.
     * Generally 'param' can be described as follows:
     * <blockquote>
     * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}
     * </blockquote>
     * 'TYPE-OF-ASN1OBJ' can be one of following symbols:
     * <ul>
     * <li>'bool' - DERBoolean</li>
     * <li>'int' - DERInteger</li>
     * <li>'bitstr' - DERBitString</li>
     * <li>'octstr' - DEROctetString</li>
     * <li>'null' - DERNull</li>
     * <li>'oid' - DERObjectIdentifier</li>
     * <li>'enum' - DEREnumerated</li>
     * <li>'utf8str' - DERUTF8String</li>
     * <li>'numstr' - DERNumericString</li>
     * <li>'prnstr' - DERPrintableString</li>
     * <li>'telstr' - DERTeletexString</li>
     * <li>'ia5str' - DERIA5String</li>
     * <li>'utctime' - DERUTCTime</li>
     * <li>'gentime' - DERGeneralizedTime</li>
     * <li>'seq' - DERSequence</li>
     * <li>'set' - DERSet</li>
     * <li>'tag' - DERTaggedObject</li>
     * </ul>
     * @example
     * newObject({'prnstr': 'aaa'});
     * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})
     * // ASN.1 Tagged Object
     * newObject({'tag': {'tag': 'a1',
     *                    'explicit': true,
     *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});
     * // more simple representation of ASN.1 Tagged Object
     * newObject({'tag': ['a1',
     *                    true,
     *                    {'seq': [
     *                      {'int': 3},
     *                      {'prnstr': 'aaa'}]}
     *                   ]});
     */


    (this || _global).newObject = function (param) {
      var _KJUR = KJUR,
          _KJUR_asn1 = _KJUR.asn1,
          _DERBoolean = _KJUR_asn1.DERBoolean,
          _DERInteger = _KJUR_asn1.DERInteger,
          _DERBitString = _KJUR_asn1.DERBitString,
          _DEROctetString = _KJUR_asn1.DEROctetString,
          _DERNull = _KJUR_asn1.DERNull,
          _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier,
          _DEREnumerated = _KJUR_asn1.DEREnumerated,
          _DERUTF8String = _KJUR_asn1.DERUTF8String,
          _DERNumericString = _KJUR_asn1.DERNumericString,
          _DERPrintableString = _KJUR_asn1.DERPrintableString,
          _DERTeletexString = _KJUR_asn1.DERTeletexString,
          _DERIA5String = _KJUR_asn1.DERIA5String,
          _DERUTCTime = _KJUR_asn1.DERUTCTime,
          _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime,
          _DERSequence = _KJUR_asn1.DERSequence,
          _DERSet = _KJUR_asn1.DERSet,
          _DERTaggedObject = _KJUR_asn1.DERTaggedObject,
          _newObject = _KJUR_asn1.ASN1Util.newObject;
      var keys = Object.keys(param);
      if (keys.length != 1) throw "key of param shall be only one.";
      var key = keys[0];
      if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1) throw "undefined key: " + key;
      if (key == "bool") return new _DERBoolean(param[key]);
      if (key == "int") return new _DERInteger(param[key]);
      if (key == "bitstr") return new _DERBitString(param[key]);
      if (key == "octstr") return new _DEROctetString(param[key]);
      if (key == "null") return new _DERNull(param[key]);
      if (key == "oid") return new _DERObjectIdentifier(param[key]);
      if (key == "enum") return new _DEREnumerated(param[key]);
      if (key == "utf8str") return new _DERUTF8String(param[key]);
      if (key == "numstr") return new _DERNumericString(param[key]);
      if (key == "prnstr") return new _DERPrintableString(param[key]);
      if (key == "telstr") return new _DERTeletexString(param[key]);
      if (key == "ia5str") return new _DERIA5String(param[key]);
      if (key == "utctime") return new _DERUTCTime(param[key]);
      if (key == "gentime") return new _DERGeneralizedTime(param[key]);

      if (key == "seq") {
        var paramList = param[key];
        var a = [];

        for (var i = 0; i < paramList.length; i++) {
          var asn1Obj = _newObject(paramList[i]);

          a.push(asn1Obj);
        }

        return new _DERSequence({
          "array": a
        });
      }

      if (key == "set") {
        var paramList = param[key];
        var a = [];

        for (var i = 0; i < paramList.length; i++) {
          var asn1Obj = _newObject(paramList[i]);

          a.push(asn1Obj);
        }

        return new _DERSet({
          "array": a
        });
      }

      if (key == "tag") {
        var tagParam = param[key];

        if (Object.prototype.toString.call(tagParam) === "[object Array]" && tagParam.length == 3) {
          var obj = _newObject(tagParam[2]);

          return new _DERTaggedObject({
            tag: tagParam[0],
            explicit: tagParam[1],
            obj: obj
          });
        } else {
          var newParam = {};
          if (tagParam.explicit !== undefined) newParam.explicit = tagParam.explicit;
          if (tagParam.tag !== undefined) newParam.tag = tagParam.tag;
          if (tagParam.obj === undefined) throw "obj shall be specified for 'tag'.";
          newParam.obj = _newObject(tagParam.obj);
          return new _DERTaggedObject(newParam);
        }
      }
    };
    /**
     * get encoded hexadecimal string of ASN1Object specifed by JSON parameters
     * @name jsonToASN1HEX
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {Array} param JSON parameter to generate ASN1Object
     * @return hexadecimal string of ASN1Object
     * @since asn1 1.0.4
     * @description
     * As for ASN.1 object representation of JSON object,
     * please see {@link newObject}.
     * @example
     * jsonToASN1HEX({'prnstr': 'aaa'});
     */


    (this || _global).jsonToASN1HEX = function (param) {
      var asn1Obj = this.newObject(param);
      return asn1Obj.getEncodedHex();
    };
  }();
  /**
   * get dot noted oid number string from hexadecimal value of OID
   * @name oidHexToInt
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {String} hex hexadecimal value of object identifier
   * @return {String} dot noted string of object identifier
   * @since jsrsasign 4.8.3 asn1 1.0.7
   * @description
   * This static method converts from hexadecimal string representation of
   * ASN.1 value of object identifier to oid number string.
   * @example
   * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; "2.5.4.6"
   */

  KJUR.asn1.ASN1Util.oidHexToInt = function (hex) {
    var s = "";
    var i01 = parseInt(hex.substr(0, 2), 16);
    var i0 = Math.floor(i01 / 40);
    var i1 = i01 % 40;
    var s = i0 + "." + i1;
    var binbuf = "";

    for (var i = 2; i < hex.length; i += 2) {
      var value = parseInt(hex.substr(i, 2), 16);
      var bin = ("00000000" + value.toString(2)).slice(-8);
      binbuf = binbuf + bin.substr(1, 7);

      if (bin.substr(0, 1) == "0") {
        var bi = new BigInteger(binbuf, 2);
        s = s + "." + bi.toString(10);
        binbuf = "";
      }
    }

    return s;
  };
  /**
   * get hexadecimal value of object identifier from dot noted oid value
   * @name oidIntToHex
   * @memberOf KJUR.asn1.ASN1Util
   * @function
   * @param {String} oidString dot noted string of object identifier
   * @return {String} hexadecimal value of object identifier
   * @since jsrsasign 4.8.3 asn1 1.0.7
   * @description
   * This static method converts from object identifier value string.
   * to hexadecimal string representation of it.
   * @example
   * KJUR.asn1.ASN1Util.oidIntToHex("2.5.4.6") &rarr; "550406"
   */


  KJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {
    var itox = function (i) {
      var h = i.toString(16);
      if (h.length == 1) h = "0" + h;
      return h;
    };

    var roidtox = function (roid) {
      var h = "";
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = "";

      for (var i = 0; i < padLen; i++) bPad += "0";

      b = bPad + b;

      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = "1" + b8;
        h += itox(parseInt(b8, 2));
      }

      return h;
    };

    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }

    var h = "";
    var a = oidString.split(".");
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);

    for (var i = 0; i < a.length; i++) {
      h += roidtox(a[i]);
    }

    return h;
  }; // ********************************************************************
  //  Abstract ASN.1 Classes
  // ********************************************************************
  // ********************************************************************

  /**
   * base class for ASN.1 DER encoder object
   * @name KJUR.asn1.ASN1Object
   * @class base class for ASN.1 DER encoder object
   * @property {Boolean} isModified flag whether internal data was changed
   * @property {String} hTLV hexadecimal string of ASN.1 TLV
   * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
   * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
   * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
   * @description
   */


  KJUR.asn1.ASN1Object = function () {
    var hV = "";
    /**
     * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
     * @name getLengthHexFromValue
     * @memberOf KJUR.asn1.ASN1Object#
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV length(L)
     */

    (this || _global).getLengthHexFromValue = function () {
      if (typeof (this || _global).hV == "undefined" || (this || _global).hV == null) {
        throw "this.hV is null or undefined.";
      }

      if ((this || _global).hV.length % 2 == 1) {
        throw "value hex must be even length: n=" + hV.length + ",v=" + (this || _global).hV;
      }

      var n = (this || _global).hV.length / 2;
      var hN = n.toString(16);

      if (hN.length % 2 == 1) {
        hN = "0" + hN;
      }

      if (n < 128) {
        return hN;
      } else {
        var hNlen = hN.length / 2;

        if (hNlen > 15) {
          throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
        }

        var head = 128 + hNlen;
        return head.toString(16) + hN;
      }
    };
    /**
     * get hexadecimal string of ASN.1 TLV bytes
     * @name getEncodedHex
     * @memberOf KJUR.asn1.ASN1Object#
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV
     */


    (this || _global).getEncodedHex = function () {
      if ((this || _global).hTLV == null || (this || _global).isModified) {
        (this || _global).hV = this.getFreshValueHex();
        (this || _global).hL = this.getLengthHexFromValue();
        (this || _global).hTLV = (this || _global).hT + (this || _global).hL + (this || _global).hV;
        (this || _global).isModified = false; //alert("first time: " + this.hTLV);
      }

      return (this || _global).hTLV;
    };
    /**
     * get hexadecimal string of ASN.1 TLV value(V) bytes
     * @name getValueHex
     * @memberOf KJUR.asn1.ASN1Object#
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
     */


    (this || _global).getValueHex = function () {
      this.getEncodedHex();
      return (this || _global).hV;
    };

    (this || _global).getFreshValueHex = function () {
      return "";
    };
  }; // == BEGIN DERAbstractString ================================================

  /**
   * base class for ASN.1 DER string classes
   * @name KJUR.asn1.DERAbstractString
   * @class base class for ASN.1 DER string classes
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @property {String} s internal string of value
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */


  KJUR.asn1.DERAbstractString = function (params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this || _global);
    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractString#
     * @function
     * @return {String} string value of this string object
     */

    (this || _global).getString = function () {
      return (this || _global).s;
    };
    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractString#
     * @function
     * @param {String} newS value by a string to set
     */


    (this || _global).setString = function (newS) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).s = newS;
      (this || _global).hV = stohex((this || _global).s);
    };
    /**
     * set value by a hexadecimal string
     * @name setStringHex
     * @memberOf KJUR.asn1.DERAbstractString#
     * @function
     * @param {String} newHexString value by a hexadecimal string to set
     */


    (this || _global).setStringHex = function (newHexString) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).s = null;
      (this || _global).hV = newHexString;
    };

    (this || _global).getFreshValueHex = function () {
      return (this || _global).hV;
    };

    if (typeof params != "undefined") {
      if (typeof params == "string") {
        this.setString(params);
      } else if (typeof params["str"] != "undefined") {
        this.setString(params["str"]);
      } else if (typeof params["hex"] != "undefined") {
        this.setStringHex(params["hex"]);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object); // == END   DERAbstractString ================================================
  // == BEGIN DERAbstractTime ==================================================

  /**
   * base class for ASN.1 DER Generalized/UTCTime class
   * @name KJUR.asn1.DERAbstractTime
   * @class base class for ASN.1 DER Generalized/UTCTime class
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */

  KJUR.asn1.DERAbstractTime = function (params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this || _global); // --- PRIVATE METHODS --------------------

    (this || _global).localDateToUTC = function (d) {
      _global.utc = utc = d.getTime() + d.getTimezoneOffset() * 60000;
      var utcDate = new Date(utc);
      return utcDate;
    };
    /*
     * format date string by Data object
     * @name formatDate
     * @memberOf KJUR.asn1.AbstractTime;
     * @param {Date} dateObject
     * @param {string} type 'utc' or 'gen'
     * @param {boolean} withMillis flag for with millisections or not
     * @description
     * 'withMillis' flag is supported from asn1 1.0.6.
     */


    (this || _global).formatDate = function (dateObject, type, withMillis) {
      var pad = (this || _global).zeroPadding;
      var d = this.localDateToUTC(dateObject);
      var year = String(d.getFullYear());
      if (type == "utc") year = year.substr(2, 2);
      var month = pad(String(d.getMonth() + 1), 2);
      var day = pad(String(d.getDate()), 2);
      var hour = pad(String(d.getHours()), 2);
      var min = pad(String(d.getMinutes()), 2);
      var sec = pad(String(d.getSeconds()), 2);
      var s = year + month + day + hour + min + sec;

      if (withMillis === true) {
        var millis = d.getMilliseconds();

        if (millis != 0) {
          var sMillis = pad(String(millis), 3);
          sMillis = sMillis.replace(/[0]+$/, "");
          s = s + "." + sMillis;
        }
      }

      return s + "Z";
    };

    (this || _global).zeroPadding = function (s, len) {
      if (s.length >= len) return s;
      return new Array(len - s.length + 1).join("0") + s;
    }; // --- PUBLIC METHODS --------------------

    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractTime#
     * @function
     * @return {String} string value of this time object
     */


    (this || _global).getString = function () {
      return (this || _global).s;
    };
    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractTime#
     * @function
     * @param {String} newS value by a string to set such like "130430235959Z"
     */


    (this || _global).setString = function (newS) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).s = newS;
      (this || _global).hV = stohex(newS);
    };
    /**
     * set value by a Date object
     * @name setByDateValue
     * @memberOf KJUR.asn1.DERAbstractTime#
     * @function
     * @param {Integer} year year of date (ex. 2013)
     * @param {Integer} month month of date between 1 and 12 (ex. 12)
     * @param {Integer} day day of month
     * @param {Integer} hour hours of date
     * @param {Integer} min minutes of date
     * @param {Integer} sec seconds of date
     */


    (this || _global).setByDateValue = function (year, month, day, hour, min, sec) {
      var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
      this.setByDate(dateObject);
    };

    (this || _global).getFreshValueHex = function () {
      return (this || _global).hV;
    };
  };

  YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object); // == END   DERAbstractTime ==================================================
  // == BEGIN DERAbstractStructured ============================================

  /**
   * base class for ASN.1 DER structured class
   * @name KJUR.asn1.DERAbstractStructured
   * @class base class for ASN.1 DER structured class
   * @property {Array} asn1Array internal array of ASN1Object
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */

  KJUR.asn1.DERAbstractStructured = function (params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this || _global);
    /**
     * set value by array of ASN1Object
     * @name setByASN1ObjectArray
     * @memberOf KJUR.asn1.DERAbstractStructured#
     * @function
     * @param {array} asn1ObjectArray array of ASN1Object to set
     */

    (this || _global).setByASN1ObjectArray = function (asn1ObjectArray) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).asn1Array = asn1ObjectArray;
    };
    /**
     * append an ASN1Object to internal array
     * @name appendASN1Object
     * @memberOf KJUR.asn1.DERAbstractStructured#
     * @function
     * @param {ASN1Object} asn1Object to add
     */


    (this || _global).appendASN1Object = function (asn1Object) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;

      (this || _global).asn1Array.push(asn1Object);
    };

    (this || _global).asn1Array = new Array();

    if (typeof params != "undefined") {
      if (typeof params["array"] != "undefined") {
        (this || _global).asn1Array = params["array"];
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object); // ********************************************************************
  //  ASN.1 Object Classes
  // ********************************************************************
  // ********************************************************************

  /**
   * class for ASN.1 DER Boolean
   * @name KJUR.asn1.DERBoolean
   * @class class for ASN.1 DER Boolean
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */

  KJUR.asn1.DERBoolean = function () {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this || _global);
    (this || _global).hT = "01";
    (this || _global).hTLV = "0101ff";
  };

  YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER Integer
   * @name KJUR.asn1.DERInteger
   * @class class for ASN.1 DER Integer
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */

  KJUR.asn1.DERInteger = function (params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this || _global);
    (this || _global).hT = "02";
    /**
     * set value by Tom Wu's BigInteger object
     * @name setByBigInteger
     * @memberOf KJUR.asn1.DERInteger#
     * @function
     * @param {BigInteger} bigIntegerValue to set
     */

    (this || _global).setByBigInteger = function (bigIntegerValue) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };
    /**
     * set value by integer value
     * @name setByInteger
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {Integer} integer value to set
     */


    (this || _global).setByInteger = function (intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };
    /**
     * set value by integer value
     * @name setValueHex
     * @memberOf KJUR.asn1.DERInteger#
     * @function
     * @param {String} hexadecimal string of integer value
     * @description
     * <br/>
     * NOTE: Value shall be represented by minimum octet length of
     * two's complement representation.
     * @example
     * new KJUR.asn1.DERInteger(123);
     * new KJUR.asn1.DERInteger({'int': 123});
     * new KJUR.asn1.DERInteger({'hex': '1fad'});
     */


    (this || _global).setValueHex = function (newHexString) {
      (this || _global).hV = newHexString;
    };

    (this || _global).getFreshValueHex = function () {
      return (this || _global).hV;
    };

    if (typeof params != "undefined") {
      if (typeof params["bigint"] != "undefined") {
        this.setByBigInteger(params["bigint"]);
      } else if (typeof params["int"] != "undefined") {
        this.setByInteger(params["int"]);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setValueHex(params["hex"]);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER encoded BitString primitive
   * @name KJUR.asn1.DERBitString
   * @class class for ASN.1 DER encoded BitString primitive
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>bin - specify binary string (ex. '10111')</li>
   * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
   * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
   * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}
   * argument for "BitString encapsulates" structure.</li>
   * </ul>
   * NOTE1: 'params' can be omitted.<br/>
   * NOTE2: 'obj' parameter have been supported since
   * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>
   * @example
   * // default constructor
   * o = new KJUR.asn1.DERBitString();
   * // initialize with binary string
   * o = new KJUR.asn1.DERBitString({bin: "1011"});
   * // initialize with boolean array
   * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});
   * // initialize with hexadecimal string (04 is unused bits)
   * o = new KJUR.asn1.DEROctetString({hex: "04bac0"});
   * // initialize with ASN1Util.newObject argument for encapsulated
   * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
   * // above generates a ASN.1 data like this:
   * // BIT STRING, encapsulates {
   * //   SEQUENCE {
   * //     INTEGER 3
   * //     PrintableString 'aaa'
   * //     }
   * //   }
   */

  KJUR.asn1.DERBitString = function (params) {
    if (params !== undefined && typeof params.obj !== "undefined") {
      var o = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = "00" + o.getEncodedHex();
    }

    KJUR.asn1.DERBitString.superclass.constructor.call(this || _global);
    (this || _global).hT = "03";
    /**
     * set ASN.1 value(V) by a hexadecimal string including unused bits
     * @name setHexValueIncludingUnusedBits
     * @memberOf KJUR.asn1.DERBitString#
     * @function
     * @param {String} newHexStringIncludingUnusedBits
     */

    (this || _global).setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).hV = newHexStringIncludingUnusedBits;
    };
    /**
     * set ASN.1 value(V) by unused bit and hexadecimal string of value
     * @name setUnusedBitsAndHexValue
     * @memberOf KJUR.asn1.DERBitString#
     * @function
     * @param {Integer} unusedBits
     * @param {String} hValue
     */


    (this || _global).setUnusedBitsAndHexValue = function (unusedBits, hValue) {
      if (unusedBits < 0 || 7 < unusedBits) {
        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
      }

      var hUnusedBits = "0" + unusedBits;
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).hV = hUnusedBits + hValue;
    };
    /**
     * set ASN.1 DER BitString by binary string<br/>
     * @name setByBinaryString
     * @memberOf KJUR.asn1.DERBitString#
     * @function
     * @param {String} binaryString binary value string (i.e. '10111')
     * @description
     * Its unused bits will be calculated automatically by length of
     * 'binaryValue'. <br/>
     * NOTE: Trailing zeros '0' will be ignored.
     * @example
     * o = new KJUR.asn1.DERBitString();
     * o.setByBooleanArray("01011");
     */


    (this || _global).setByBinaryString = function (binaryString) {
      binaryString = binaryString.replace(/0+$/, "");
      var unusedBits = 8 - binaryString.length % 8;
      if (unusedBits == 8) unusedBits = 0;

      for (var i = 0; i <= unusedBits; i++) {
        binaryString += "0";
      }

      var h = "";

      for (var i = 0; i < binaryString.length - 1; i += 8) {
        var b = binaryString.substr(i, 8);
        var x = parseInt(b, 2).toString(16);
        if (x.length == 1) x = "0" + x;
        h += x;
      }

      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).hV = "0" + unusedBits + h;
    };
    /**
     * set ASN.1 TLV value(V) by an array of boolean<br/>
     * @name setByBooleanArray
     * @memberOf KJUR.asn1.DERBitString#
     * @function
     * @param {array} booleanArray array of boolean (ex. [true, false, true])
     * @description
     * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.
     * @example
     * o = new KJUR.asn1.DERBitString();
     * o.setByBooleanArray([false, true, false, true, true]);
     */


    (this || _global).setByBooleanArray = function (booleanArray) {
      var s = "";

      for (var i = 0; i < booleanArray.length; i++) {
        if (booleanArray[i] == true) {
          s += "1";
        } else {
          s += "0";
        }
      }

      this.setByBinaryString(s);
    };
    /**
     * generate an array of falses with specified length<br/>
     * @name newFalseArray
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {Integer} nLength length of array to generate
     * @return {array} array of boolean falses
     * @description
     * This static method may be useful to initialize boolean array.
     * @example
     * o = new KJUR.asn1.DERBitString();
     * o.newFalseArray(3) &rarr; [false, false, false]
     */


    (this || _global).newFalseArray = function (nLength) {
      var a = new Array(nLength);

      for (var i = 0; i < nLength; i++) {
        a[i] = false;
      }

      return a;
    };

    (this || _global).getFreshValueHex = function () {
      return (this || _global).hV;
    };

    if (typeof params != "undefined") {
      if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
        this.setHexValueIncludingUnusedBits(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setHexValueIncludingUnusedBits(params["hex"]);
      } else if (typeof params["bin"] != "undefined") {
        this.setByBinaryString(params["bin"]);
      } else if (typeof params["array"] != "undefined") {
        this.setByBooleanArray(params["array"]);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER OctetString<br/>
   * @name KJUR.asn1.DEROctetString
   * @class class for ASN.1 DER OctetString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * This class provides ASN.1 OctetString simple type.<br/>
   * Supported "params" attributes are:
   * <ul>
   * <li>str - to set a string as a value</li>
   * <li>hex - to set a hexadecimal string as a value</li>
   * <li>obj - to set a encapsulated ASN.1 value by JSON object
   * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>
   * </ul>
   * NOTE: A parameter 'obj' have been supported
   * for "OCTET STRING, encapsulates" structure.
   * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).
   * @see KJUR.asn1.DERAbstractString - superclass
   * @example
   * // default constructor
   * o = new KJUR.asn1.DEROctetString();
   * // initialize with string
   * o = new KJUR.asn1.DEROctetString({str: "aaa"});
   * // initialize with hexadecimal string
   * o = new KJUR.asn1.DEROctetString({hex: "616161"});
   * // initialize with ASN1Util.newObject argument
   * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});
   * // above generates a ASN.1 data like this:
   * // OCTET STRING, encapsulates {
   * //   SEQUENCE {
   * //     INTEGER 3
   * //     PrintableString 'aaa'
   * //     }
   * //   }
   */

  KJUR.asn1.DEROctetString = function (params) {
    if (params !== undefined && typeof params.obj !== "undefined") {
      var o = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = o.getEncodedHex();
    }

    KJUR.asn1.DEROctetString.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "04";
  };

  YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER Null
   * @name KJUR.asn1.DERNull
   * @class class for ASN.1 DER Null
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */

  KJUR.asn1.DERNull = function () {
    KJUR.asn1.DERNull.superclass.constructor.call(this || _global);
    (this || _global).hT = "05";
    (this || _global).hTLV = "0500";
  };

  YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER ObjectIdentifier
   * @name KJUR.asn1.DERObjectIdentifier
   * @class class for ASN.1 DER ObjectIdentifier
   * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */

  KJUR.asn1.DERObjectIdentifier = function (params) {
    var itox = function (i) {
      var h = i.toString(16);
      if (h.length == 1) h = "0" + h;
      return h;
    };

    var roidtox = function (roid) {
      var h = "";
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = "";

      for (var i = 0; i < padLen; i++) bPad += "0";

      b = bPad + b;

      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = "1" + b8;
        h += itox(parseInt(b8, 2));
      }

      return h;
    };

    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this || _global);
    (this || _global).hT = "06";
    /**
     * set value by a hexadecimal string
     * @name setValueHex
     * @memberOf KJUR.asn1.DERObjectIdentifier#
     * @function
     * @param {String} newHexString hexadecimal value of OID bytes
     */

    (this || _global).setValueHex = function (newHexString) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).s = null;
      (this || _global).hV = newHexString;
    };
    /**
     * set value by a OID string<br/>
     * @name setValueOidString
     * @memberOf KJUR.asn1.DERObjectIdentifier#
     * @function
     * @param {String} oidString OID string (ex. 2.5.4.13)
     * @example
     * o = new KJUR.asn1.DERObjectIdentifier();
     * o.setValueOidString("2.5.4.13");
     */


    (this || _global).setValueOidString = function (oidString) {
      if (!oidString.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + oidString;
      }

      var h = "";
      var a = oidString.split(".");
      var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
      h += itox(i0);
      a.splice(0, 2);

      for (var i = 0; i < a.length; i++) {
        h += roidtox(a[i]);
      }

      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).s = null;
      (this || _global).hV = h;
    };
    /**
     * set value by a OID name
     * @name setValueName
     * @memberOf KJUR.asn1.DERObjectIdentifier#
     * @function
     * @param {String} oidName OID name (ex. 'serverAuth')
     * @since 1.0.1
     * @description
     * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
     * Otherwise raise error.
     * @example
     * o = new KJUR.asn1.DERObjectIdentifier();
     * o.setValueName("serverAuth");
     */


    (this || _global).setValueName = function (oidName) {
      var oid = KJUR.asn1.x509.OID.name2oid(oidName);

      if (oid !== "") {
        this.setValueOidString(oid);
      } else {
        throw "DERObjectIdentifier oidName undefined: " + oidName;
      }
    };

    (this || _global).getFreshValueHex = function () {
      return (this || _global).hV;
    };

    if (params !== undefined) {
      if (typeof params === "string") {
        if (params.match(/^[0-2].[0-9.]+$/)) {
          this.setValueOidString(params);
        } else {
          this.setValueName(params);
        }
      } else if (params.oid !== undefined) {
        this.setValueOidString(params.oid);
      } else if (params.hex !== undefined) {
        this.setValueHex(params.hex);
      } else if (params.name !== undefined) {
        this.setValueName(params.name);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER Enumerated
   * @name KJUR.asn1.DEREnumerated
   * @class class for ASN.1 DER Enumerated
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * @example
   * new KJUR.asn1.DEREnumerated(123);
   * new KJUR.asn1.DEREnumerated({int: 123});
   * new KJUR.asn1.DEREnumerated({hex: '1fad'});
   */

  KJUR.asn1.DEREnumerated = function (params) {
    KJUR.asn1.DEREnumerated.superclass.constructor.call(this || _global);
    (this || _global).hT = "0a";
    /**
     * set value by Tom Wu's BigInteger object
     * @name setByBigInteger
     * @memberOf KJUR.asn1.DEREnumerated#
     * @function
     * @param {BigInteger} bigIntegerValue to set
     */

    (this || _global).setByBigInteger = function (bigIntegerValue) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };
    /**
     * set value by integer value
     * @name setByInteger
     * @memberOf KJUR.asn1.DEREnumerated#
     * @function
     * @param {Integer} integer value to set
     */


    (this || _global).setByInteger = function (intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };
    /**
     * set value by integer value
     * @name setValueHex
     * @memberOf KJUR.asn1.DEREnumerated#
     * @function
     * @param {String} hexadecimal string of integer value
     * @description
     * <br/>
     * NOTE: Value shall be represented by minimum octet length of
     * two's complement representation.
     */


    (this || _global).setValueHex = function (newHexString) {
      (this || _global).hV = newHexString;
    };

    (this || _global).getFreshValueHex = function () {
      return (this || _global).hV;
    };

    if (typeof params != "undefined") {
      if (typeof params["int"] != "undefined") {
        this.setByInteger(params["int"]);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setValueHex(params["hex"]);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object); // ********************************************************************

  /**
   * class for ASN.1 DER UTF8String
   * @name KJUR.asn1.DERUTF8String
   * @class class for ASN.1 DER UTF8String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERUTF8String = function (params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "0c";
  };

  YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER NumericString
   * @name KJUR.asn1.DERNumericString
   * @class class for ASN.1 DER NumericString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERNumericString = function (params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "12";
  };

  YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER PrintableString
   * @name KJUR.asn1.DERPrintableString
   * @class class for ASN.1 DER PrintableString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERPrintableString = function (params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "13";
  };

  YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER TeletexString
   * @name KJUR.asn1.DERTeletexString
   * @class class for ASN.1 DER TeletexString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERTeletexString = function (params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "14";
  };

  YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER IA5String
   * @name KJUR.asn1.DERIA5String
   * @class class for ASN.1 DER IA5String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */

  KJUR.asn1.DERIA5String = function (params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "16";
  };

  YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString); // ********************************************************************

  /**
   * class for ASN.1 DER UTCTime
   * @name KJUR.asn1.DERUTCTime
   * @class class for ASN.1 DER UTCTime
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * <h4>EXAMPLES</h4>
   * @example
   * d1 = new KJUR.asn1.DERUTCTime();
   * d1.setString('130430125959Z');
   *
   * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
   * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
   * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');
   */

  KJUR.asn1.DERUTCTime = function (params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "17";
    /**
     * set value by a Date object<br/>
     * @name setByDate
     * @memberOf KJUR.asn1.DERUTCTime#
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     * @example
     * o = new KJUR.asn1.DERUTCTime();
     * o.setByDate(new Date("2016/12/31"));
     */

    (this || _global).setByDate = function (dateObject) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).date = dateObject;
      (this || _global).s = this.formatDate((this || _global).date, "utc");
      (this || _global).hV = stohex((this || _global).s);
    };

    (this || _global).getFreshValueHex = function () {
      if (typeof (this || _global).date == "undefined" && typeof (this || _global).s == "undefined") {
        (this || _global).date = new Date();
        (this || _global).s = this.formatDate((this || _global).date, "utc");
        (this || _global).hV = stohex((this || _global).s);
      }

      return (this || _global).hV;
    };

    if (params !== undefined) {
      if (params.str !== undefined) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
        this.setString(params);
      } else if (params.hex !== undefined) {
        this.setStringHex(params.hex);
      } else if (params.date !== undefined) {
        this.setByDate(params.date);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime); // ********************************************************************

  /**
   * class for ASN.1 DER GeneralizedTime
   * @name KJUR.asn1.DERGeneralizedTime
   * @class class for ASN.1 DER GeneralizedTime
   * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
   * @property {Boolean} withMillis flag to show milliseconds or not
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>
   * </ul>
   * NOTE1: 'params' can be omitted.
   * NOTE2: 'withMillis' property is supported from asn1 1.0.6.
   */

  KJUR.asn1.DERGeneralizedTime = function (params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "18";
    (this || _global).withMillis = false;
    /**
     * set value by a Date object
     * @name setByDate
     * @memberOf KJUR.asn1.DERGeneralizedTime#
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     * @example
     * When you specify UTC time, use 'Date.UTC' method like this:<br/>
     * o1 = new DERUTCTime();
     * o1.setByDate(date);
     *
     * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
     */

    (this || _global).setByDate = function (dateObject) {
      (this || _global).hTLV = null;
      (this || _global).isModified = true;
      (this || _global).date = dateObject;
      (this || _global).s = this.formatDate((this || _global).date, "gen", (this || _global).withMillis);
      (this || _global).hV = stohex((this || _global).s);
    };

    (this || _global).getFreshValueHex = function () {
      if ((this || _global).date === undefined && (this || _global).s === undefined) {
        (this || _global).date = new Date();
        (this || _global).s = this.formatDate((this || _global).date, "gen", (this || _global).withMillis);
        (this || _global).hV = stohex((this || _global).s);
      }

      return (this || _global).hV;
    };

    if (params !== undefined) {
      if (params.str !== undefined) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
        this.setString(params);
      } else if (params.hex !== undefined) {
        this.setStringHex(params.hex);
      } else if (params.date !== undefined) {
        this.setByDate(params.date);
      }

      if (params.millis === true) {
        (this || _global).withMillis = true;
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime); // ********************************************************************

  /**
   * class for ASN.1 DER Sequence
   * @name KJUR.asn1.DERSequence
   * @class class for ASN.1 DER Sequence
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */

  KJUR.asn1.DERSequence = function (params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "30";

    (this || _global).getFreshValueHex = function () {
      var h = "";

      for (var i = 0; i < (this || _global).asn1Array.length; i++) {
        var asn1Obj = (this || _global).asn1Array[i];
        h += asn1Obj.getEncodedHex();
      }

      (this || _global).hV = h;
      return (this || _global).hV;
    };
  };

  YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured); // ********************************************************************

  /**
   * class for ASN.1 DER Set
   * @name KJUR.asn1.DERSet
   * @class class for ASN.1 DER Set
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>
   * </ul>
   * NOTE1: 'params' can be omitted.<br/>
   * NOTE2: sortflag is supported since 1.0.5.
   */

  KJUR.asn1.DERSet = function (params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this || _global, params);
    (this || _global).hT = "31";
    (this || _global).sortFlag = true; // item shall be sorted only in ASN.1 DER

    (this || _global).getFreshValueHex = function () {
      var a = new Array();

      for (var i = 0; i < (this || _global).asn1Array.length; i++) {
        var asn1Obj = (this || _global).asn1Array[i];
        a.push(asn1Obj.getEncodedHex());
      }

      if ((this || _global).sortFlag == true) a.sort();
      (this || _global).hV = a.join("");
      return (this || _global).hV;
    };

    if (typeof params != "undefined") {
      if (typeof params.sortflag != "undefined" && params.sortflag == false) (this || _global).sortFlag = false;
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured); // ********************************************************************

  /**
   * class for ASN.1 DER TaggedObject
   * @name KJUR.asn1.DERTaggedObject
   * @class class for ASN.1 DER TaggedObject
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
   * For example, if you find '[1]' tag in a ASN.1 dump,
   * 'tagNoHex' will be 'a1'.
   * <br/>
   * As for optional argument 'params' for constructor, you can specify *ANY* of
   * following properties:
   * <ul>
   * <li>explicit - specify true if this is explicit tag otherwise false
   *     (default is 'true').</li>
   * <li>tag - specify tag (default is 'a0' which means [0])</li>
   * <li>obj - specify ASN1Object which is tagged</li>
   * </ul>
   * @example
   * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
   * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
   * hex = d2.getEncodedHex();
   */

  KJUR.asn1.DERTaggedObject = function (params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this || _global);
    (this || _global).hT = "a0";
    (this || _global).hV = "";
    (this || _global).isExplicit = true;
    (this || _global).asn1Object = null;
    /**
     * set value by an ASN1Object
     * @name setString
     * @memberOf KJUR.asn1.DERTaggedObject#
     * @function
     * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
     * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
     * @param {ASN1Object} asn1Object ASN.1 to encapsulate
     */

    (this || _global).setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {
      (this || _global).hT = tagNoHex;
      (this || _global).isExplicit = isExplicitFlag;
      (this || _global).asn1Object = asn1Object;

      if ((this || _global).isExplicit) {
        (this || _global).hV = (this || _global).asn1Object.getEncodedHex();
        (this || _global).hTLV = null;
        (this || _global).isModified = true;
      } else {
        (this || _global).hV = null;
        (this || _global).hTLV = asn1Object.getEncodedHex();
        (this || _global).hTLV = (this || _global).hTLV.replace(/^../, tagNoHex);
        (this || _global).isModified = false;
      }
    };

    (this || _global).getFreshValueHex = function () {
      return (this || _global).hV;
    };

    if (typeof params != "undefined") {
      if (typeof params["tag"] != "undefined") {
        (this || _global).hT = params["tag"];
      }

      if (typeof params["explicit"] != "undefined") {
        (this || _global).isExplicit = params["explicit"];
      }

      if (typeof params["obj"] != "undefined") {
        (this || _global).asn1Object = params["obj"];
        this.setASN1Object((this || _global).isExplicit, (this || _global).hT, (this || _global).asn1Object);
      }
    }
  };

  YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
  /**
   * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
   * This object is just a decorator for parsing the key parameter
   * @param {string|Object} key - The key in string format, or an object containing
   * the parameters needed to build a RSAKey object.
   * @constructor
   */

  var JSEncryptRSAKey =
  /** @class */
  function (_super) {
    __extends(JSEncryptRSAKey, _super);

    function JSEncryptRSAKey(key) {
      var _this = _super.call(this || _global) || this || _global; // Call the super constructor.
      //  RSAKey.call(this);
      // If a key key was provided.


      if (key) {
        // If this is a string...
        if (typeof key === "string") {
          _this.parseKey(key);
        } else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) || JSEncryptRSAKey.hasPublicKeyProperty(key)) {
          // Set the values for the key.
          _this.parsePropertiesFrom(key);
        }
      }

      return _this;
    }
    /**
     * Method to parse a pem encoded string containing both a public or private key.
     * The method will translate the pem encoded string in a der encoded string and
     * will parse private key and public key parameters. This method accepts public key
     * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
     *
     * @todo Check how many rsa formats use the same format of pkcs #1.
     *
     * The format is defined as:
     * PublicKeyInfo ::= SEQUENCE {
     *   algorithm       AlgorithmIdentifier,
     *   PublicKey       BIT STRING
     * }
     * Where AlgorithmIdentifier is:
     * AlgorithmIdentifier ::= SEQUENCE {
     *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
     *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
     * }
     * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
     * RSAPublicKey ::= SEQUENCE {
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER   -- e
     * }
     * it's possible to examine the structure of the keys obtained from openssl using
     * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
     * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
     * @private
     */


    JSEncryptRSAKey.prototype.parseKey = function (pem) {
      try {
        var modulus = 0;
        var public_exponent = 0;
        var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
        var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
        var asn1 = ASN1.decode(der); // Fixes a bug with OpenSSL 1.0+ private keys

        if (asn1.sub.length === 3) {
          asn1 = asn1.sub[2].sub[0];
        }

        if (asn1.sub.length === 9) {
          // Parse the private key.
          modulus = asn1.sub[1].getHexStringValue(); // bigint

          (this || _global).n = parseBigInt(modulus, 16);
          public_exponent = asn1.sub[2].getHexStringValue(); // int

          (this || _global).e = parseInt(public_exponent, 16);
          var private_exponent = asn1.sub[3].getHexStringValue(); // bigint

          (this || _global).d = parseBigInt(private_exponent, 16);
          var prime1 = asn1.sub[4].getHexStringValue(); // bigint

          (this || _global).p = parseBigInt(prime1, 16);
          var prime2 = asn1.sub[5].getHexStringValue(); // bigint

          (this || _global).q = parseBigInt(prime2, 16);
          var exponent1 = asn1.sub[6].getHexStringValue(); // bigint

          (this || _global).dmp1 = parseBigInt(exponent1, 16);
          var exponent2 = asn1.sub[7].getHexStringValue(); // bigint

          (this || _global).dmq1 = parseBigInt(exponent2, 16);
          var coefficient = asn1.sub[8].getHexStringValue(); // bigint

          (this || _global).coeff = parseBigInt(coefficient, 16);
        } else if (asn1.sub.length === 2) {
          // Parse the public key.
          var bit_string = asn1.sub[1];
          var sequence = bit_string.sub[0];
          modulus = sequence.sub[0].getHexStringValue();
          (this || _global).n = parseBigInt(modulus, 16);
          public_exponent = sequence.sub[1].getHexStringValue();
          (this || _global).e = parseInt(public_exponent, 16);
        } else {
          return false;
        }

        return true;
      } catch (ex) {
        return false;
      }
    };
    /**
     * Translate rsa parameters in a hex encoded string representing the rsa key.
     *
     * The translation follow the ASN.1 notation :
     * RSAPrivateKey ::= SEQUENCE {
     *   version           Version,
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER,  -- e
     *   privateExponent   INTEGER,  -- d
     *   prime1            INTEGER,  -- p
     *   prime2            INTEGER,  -- q
     *   exponent1         INTEGER,  -- d mod (p1)
     *   exponent2         INTEGER,  -- d mod (q-1)
     *   coefficient       INTEGER,  -- (inverse of q) mod p
     * }
     * @returns {string}  DER Encoded String representing the rsa private key
     * @private
     */


    JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {
      var options = {
        array: [new KJUR.asn1.DERInteger({
          int: 0
        }), new KJUR.asn1.DERInteger({
          bigint: (this || _global).n
        }), new KJUR.asn1.DERInteger({
          int: (this || _global).e
        }), new KJUR.asn1.DERInteger({
          bigint: (this || _global).d
        }), new KJUR.asn1.DERInteger({
          bigint: (this || _global).p
        }), new KJUR.asn1.DERInteger({
          bigint: (this || _global).q
        }), new KJUR.asn1.DERInteger({
          bigint: (this || _global).dmp1
        }), new KJUR.asn1.DERInteger({
          bigint: (this || _global).dmq1
        }), new KJUR.asn1.DERInteger({
          bigint: (this || _global).coeff
        })]
      };
      var seq = new KJUR.asn1.DERSequence(options);
      return seq.getEncodedHex();
    };
    /**
     * base64 (pem) encoded version of the DER encoded representation
     * @returns {string} pem encoded representation without header and footer
     * @public
     */


    JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {
      return hex2b64(this.getPrivateBaseKey());
    };
    /**
     * Translate rsa parameters in a hex encoded string representing the rsa public key.
     * The representation follow the ASN.1 notation :
     * PublicKeyInfo ::= SEQUENCE {
     *   algorithm       AlgorithmIdentifier,
     *   PublicKey       BIT STRING
     * }
     * Where AlgorithmIdentifier is:
     * AlgorithmIdentifier ::= SEQUENCE {
     *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
     *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
     * }
     * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
     * RSAPublicKey ::= SEQUENCE {
     *   modulus           INTEGER,  -- n
     *   publicExponent    INTEGER   -- e
     * }
     * @returns {string} DER Encoded String representing the rsa public key
     * @private
     */


    JSEncryptRSAKey.prototype.getPublicBaseKey = function () {
      var first_sequence = new KJUR.asn1.DERSequence({
        array: [new KJUR.asn1.DERObjectIdentifier({
          oid: "1.2.840.113549.1.1.1"
        }), new KJUR.asn1.DERNull()]
      });
      var second_sequence = new KJUR.asn1.DERSequence({
        array: [new KJUR.asn1.DERInteger({
          bigint: (this || _global).n
        }), new KJUR.asn1.DERInteger({
          int: (this || _global).e
        })]
      });
      var bit_string = new KJUR.asn1.DERBitString({
        hex: "00" + second_sequence.getEncodedHex()
      });
      var seq = new KJUR.asn1.DERSequence({
        array: [first_sequence, bit_string]
      });
      return seq.getEncodedHex();
    };
    /**
     * base64 (pem) encoded version of the DER encoded representation
     * @returns {string} pem encoded representation without header and footer
     * @public
     */


    JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {
      return hex2b64(this.getPublicBaseKey());
    };
    /**
     * wrap the string in block of width chars. The default value for rsa keys is 64
     * characters.
     * @param {string} str the pem encoded string without header and footer
     * @param {Number} [width=64] - the length the string has to be wrapped at
     * @returns {string}
     * @private
     */


    JSEncryptRSAKey.wordwrap = function (str, width) {
      width = width || 64;

      if (!str) {
        return str;
      }

      var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
      return str.match(RegExp(regex, "g")).join("\n");
    };
    /**
     * Retrieve the pem encoded private key
     * @returns {string} the pem encoded private key with header/footer
     * @public
     */


    JSEncryptRSAKey.prototype.getPrivateKey = function () {
      var key = "-----BEGIN RSA PRIVATE KEY-----\n";
      key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
      key += "-----END RSA PRIVATE KEY-----";
      return key;
    };
    /**
     * Retrieve the pem encoded public key
     * @returns {string} the pem encoded public key with header/footer
     * @public
     */


    JSEncryptRSAKey.prototype.getPublicKey = function () {
      var key = "-----BEGIN PUBLIC KEY-----\n";
      key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
      key += "-----END PUBLIC KEY-----";
      return key;
    };
    /**
     * Check if the object contains the necessary parameters to populate the rsa modulus
     * and public exponent parameters.
     * @param {Object} [obj={}] - An object that may contain the two public key
     * parameters
     * @returns {boolean} true if the object contains both the modulus and the public exponent
     * properties (n and e)
     * @todo check for types of n and e. N should be a parseable bigInt object, E should
     * be a parseable integer number
     * @private
     */


    JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
    };
    /**
     * Check if the object contains ALL the parameters of an RSA key.
     * @param {Object} [obj={}] - An object that may contain nine rsa key
     * parameters
     * @returns {boolean} true if the object contains all the parameters needed
     * @todo check for types of the parameters all the parameters but the public exponent
     * should be parseable bigint objects, the public exponent should be a parseable integer number
     * @private
     */


    JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
    };
    /**
     * Parse the properties of obj in the current rsa object. Obj should AT LEAST
     * include the modulus and public exponent (n, e) parameters.
     * @param {Object} obj - the object containing rsa parameters
     * @private
     */


    JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {
      (this || _global).n = obj.n;
      (this || _global).e = obj.e;

      if (obj.hasOwnProperty("d")) {
        (this || _global).d = obj.d;
        (this || _global).p = obj.p;
        (this || _global).q = obj.q;
        (this || _global).dmp1 = obj.dmp1;
        (this || _global).dmq1 = obj.dmq1;
        (this || _global).coeff = obj.coeff;
      }
    };

    return JSEncryptRSAKey;
  }(RSAKey);
  /**
   *
   * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
   * possible parameters are:
   * - default_key_size        {number}  default: 1024 the key size in bit
   * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
   * - log                     {boolean} default: false whether log warn/error or not
   * @constructor
   */


  var JSEncrypt =
  /** @class */
  function () {
    function JSEncrypt(options) {
      options = options || {};
      (this || _global).default_key_size = parseInt(options.default_key_size, 10) || 1024;
      (this || _global).default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type

      (this || _global).log = options.log || false; // The private and public key.

      (this || _global).key = null;
    }
    /**
     * Method to set the rsa key parameter (one method is enough to set both the public
     * and the private key, since the private key contains the public key paramenters)
     * Log a warning if logs are enabled
     * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
     * @public
     */


    JSEncrypt.prototype.setKey = function (key) {
      if ((this || _global).log && (this || _global).key) {
        console.warn("A key was already set, overriding existing.");
      }

      (this || _global).key = new JSEncryptRSAKey(key);
    };
    /**
     * Proxy method for setKey, for api compatibility
     * @see setKey
     * @public
     */


    JSEncrypt.prototype.setPrivateKey = function (privkey) {
      // Create the key.
      this.setKey(privkey);
    };
    /**
     * Proxy method for setKey, for api compatibility
     * @see setKey
     * @public
     */


    JSEncrypt.prototype.setPublicKey = function (pubkey) {
      // Sets the public key.
      this.setKey(pubkey);
    };
    /**
     * Proxy method for RSAKey object's decrypt, decrypt the string using the private
     * components of the rsa key object. Note that if the object was not set will be created
     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
     * @param {string} str base64 encoded crypted string to decrypt
     * @return {string} the decrypted string
     * @public
     */


    JSEncrypt.prototype.decrypt = function (str) {
      // Return the decrypted string.
      try {
        return this.getKey().decrypt(b64tohex(str));
      } catch (ex) {
        return false;
      }
    };
    /**
     * Proxy method for RSAKey object's encrypt, encrypt the string using the public
     * components of the rsa key object. Note that if the object was not set will be created
     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
     * @param {string} str the string to encrypt
     * @return {string} the encrypted string encoded in base64
     * @public
     */


    JSEncrypt.prototype.encrypt = function (str) {
      // Return the encrypted string.
      try {
        return hex2b64(this.getKey().encrypt(str));
      } catch (ex) {
        return false;
      }
    };
    /**
     * Proxy method for RSAKey object's sign.
     * @param {string} str the string to sign
     * @param {function} digestMethod hash method
     * @param {string} digestName the name of the hash algorithm
     * @return {string} the signature encoded in base64
     * @public
     */


    JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {
      // return the RSA signature of 'str' in 'hex' format.
      try {
        return hex2b64(this.getKey().sign(str, digestMethod, digestName));
      } catch (ex) {
        return false;
      }
    };
    /**
     * Proxy method for RSAKey object's verify.
     * @param {string} str the string to verify
     * @param {string} signature the signature encoded in base64 to compare the string to
     * @param {function} digestMethod hash method
     * @return {boolean} whether the data and signature match
     * @public
     */


    JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
      // Return the decrypted 'digest' of the signature.
      try {
        return this.getKey().verify(str, b64tohex(signature), digestMethod);
      } catch (ex) {
        return false;
      }
    };
    /**
     * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
     * will be created and returned
     * @param {callback} [cb] the callback to be called if we want the key to be generated
     * in an async fashion
     * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
     * @public
     */


    JSEncrypt.prototype.getKey = function (cb) {
      // Only create new if it does not exist.
      if (!(this || _global).key) {
        // Get a new private key.
        (this || _global).key = new JSEncryptRSAKey();

        if (cb && {}.toString.call(cb) === "[object Function]") {
          (this || _global).key.generateAsync((this || _global).default_key_size, (this || _global).default_public_exponent, cb);

          return;
        } // Generate the key.


        (this || _global).key.generate((this || _global).default_key_size, (this || _global).default_public_exponent);
      }

      return (this || _global).key;
    };
    /**
     * Returns the pem encoded representation of the private key
     * If the key doesn't exists a new key will be created
     * @returns {string} pem encoded representation of the private key WITH header and footer
     * @public
     */


    JSEncrypt.prototype.getPrivateKey = function () {
      // Return the private representation of this key.
      return this.getKey().getPrivateKey();
    };
    /**
     * Returns the pem encoded representation of the private key
     * If the key doesn't exists a new key will be created
     * @returns {string} pem encoded representation of the private key WITHOUT header and footer
     * @public
     */


    JSEncrypt.prototype.getPrivateKeyB64 = function () {
      // Return the private representation of this key.
      return this.getKey().getPrivateBaseKeyB64();
    };
    /**
     * Returns the pem encoded representation of the public key
     * If the key doesn't exists a new key will be created
     * @returns {string} pem encoded representation of the public key WITH header and footer
     * @public
     */


    JSEncrypt.prototype.getPublicKey = function () {
      // Return the private representation of this key.
      return this.getKey().getPublicKey();
    };
    /**
     * Returns the pem encoded representation of the public key
     * If the key doesn't exists a new key will be created
     * @returns {string} pem encoded representation of the public key WITHOUT header and footer
     * @public
     */


    JSEncrypt.prototype.getPublicKeyB64 = function () {
      // Return the private representation of this key.
      return this.getKey().getPublicBaseKeyB64();
    };

    JSEncrypt.version = "3.0.0-rc.1";
    return JSEncrypt;
  }();

  window.JSEncrypt = JSEncrypt;
  exports.JSEncrypt = JSEncrypt;
  exports.default = JSEncrypt;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
const JSEncrypt = exports.JSEncrypt,
      __esModule = exports.__esModule;

export default exports;
export { JSEncrypt, __esModule };

//# sourceMappingURL=npm:jsencrypt@3.0.0-rc.1!cjs.map