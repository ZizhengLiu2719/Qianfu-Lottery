var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "node_modules/postgres-array/index.js"(exports) {
    "use strict";
    var BACKSLASH = "\\";
    var DQUOT = '"';
    var LBRACE = "{";
    var RBRACE = "}";
    var LBRACKET = "[";
    var EQUALS = "=";
    var COMMA = ",";
    var NULL_STRING = "NULL";
    function makeParseArrayWithTransform(transform) {
      const haveTransform = transform != null;
      return /* @__PURE__ */ __name(function parseArray3(str) {
        const rbraceIndex = str.length - 1;
        if (rbraceIndex === 1) {
          return [];
        }
        if (str[rbraceIndex] !== RBRACE) {
          throw new Error("Invalid array text - must end with }");
        }
        let position = 0;
        if (str[position] === LBRACKET) {
          position = str.indexOf(EQUALS) + 1;
        }
        if (str[position++] !== LBRACE) {
          throw new Error("Invalid array text - must start with {");
        }
        const output = [];
        let current = output;
        const stack = [];
        let currentStringStart = position;
        let currentString = "";
        let expectValue = true;
        for (; position < rbraceIndex; ++position) {
          let char = str[position];
          if (char === DQUOT) {
            currentStringStart = ++position;
            let dquot = str.indexOf(DQUOT, currentStringStart);
            let backSlash = str.indexOf(BACKSLASH, currentStringStart);
            while (backSlash !== -1 && backSlash < dquot) {
              position = backSlash;
              const part2 = str.slice(currentStringStart, position);
              currentString += part2;
              currentStringStart = ++position;
              if (dquot === position++) {
                dquot = str.indexOf(DQUOT, position);
              }
              backSlash = str.indexOf(BACKSLASH, position);
            }
            position = dquot;
            const part = str.slice(currentStringStart, position);
            currentString += part;
            current.push(haveTransform ? transform(currentString) : currentString);
            currentString = "";
            expectValue = false;
          } else if (char === LBRACE) {
            const newArray = [];
            current.push(newArray);
            stack.push(current);
            current = newArray;
            currentStringStart = position + 1;
            expectValue = true;
          } else if (char === COMMA) {
            expectValue = true;
          } else if (char === RBRACE) {
            expectValue = false;
            const arr = stack.pop();
            if (arr === void 0) {
              throw new Error("Invalid array text - too many '}'");
            }
            current = arr;
          } else if (expectValue) {
            currentStringStart = position;
            while ((char = str[position]) !== COMMA && char !== RBRACE && position < rbraceIndex) {
              ++position;
            }
            const part = str.slice(currentStringStart, position--);
            current.push(
              part === NULL_STRING ? null : haveTransform ? transform(part) : part
            );
            expectValue = false;
          } else {
            throw new Error("Was expecting delimeter");
          }
        }
        return output;
      }, "parseArray");
    }
    __name(makeParseArrayWithTransform, "makeParseArrayWithTransform");
    var parseArray2 = makeParseArrayWithTransform();
    exports.parse = (source, transform) => transform != null ? makeParseArrayWithTransform(transform)(source) : parseArray2(source);
  }
});

// node_modules/@prisma/client/runtime/wasm-engine-edge.js
var require_wasm_engine_edge = __commonJS({
  "node_modules/@prisma/client/runtime/wasm-engine-edge.js"(exports, module) {
    "use strict";
    var Xo = Object.create;
    var kt = Object.defineProperty;
    var Zo = Object.getOwnPropertyDescriptor;
    var es2 = Object.getOwnPropertyNames;
    var ts2 = Object.getPrototypeOf;
    var rs = Object.prototype.hasOwnProperty;
    var ie2 = /* @__PURE__ */ __name((t, e) => () => (t && (e = t(t = 0)), e), "ie");
    var Fe2 = /* @__PURE__ */ __name((t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), "Fe");
    var nt2 = /* @__PURE__ */ __name((t, e) => {
      for (var r in e) kt(t, r, { get: e[r], enumerable: true });
    }, "nt");
    var mn = /* @__PURE__ */ __name((t, e, r, n) => {
      if (e && typeof e == "object" || typeof e == "function") for (let i of es2(e)) !rs.call(t, i) && i !== r && kt(t, i, { get: /* @__PURE__ */ __name(() => e[i], "get"), enumerable: !(n = Zo(e, i)) || n.enumerable });
      return t;
    }, "mn");
    var it2 = /* @__PURE__ */ __name((t, e, r) => (r = t != null ? Xo(ts2(t)) : {}, mn(e || !t || !t.__esModule ? kt(r, "default", { value: t, enumerable: true }) : r, t)), "it");
    var ns = /* @__PURE__ */ __name((t) => mn(kt({}, "__esModule", { value: true }), t), "ns");
    function xr2(t, e) {
      if (e = e.toLowerCase(), e === "utf8" || e === "utf-8") return new y(as2.encode(t));
      if (e === "base64" || e === "base64url") return t = t.replace(/-/g, "+").replace(/_/g, "/"), t = t.replace(/[^A-Za-z0-9+/]/g, ""), new y([...atob(t)].map((r) => r.charCodeAt(0)));
      if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return new y([...t].map((r) => r.charCodeAt(0)));
      if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
        let r = new y(t.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < t.length; i++) n.setUint16(i * 2, t.charCodeAt(i), true);
        return r;
      }
      if (e === "hex") {
        let r = new y(t.length / 2);
        for (let n = 0, i = 0; i < t.length; i += 2, n++) r[n] = parseInt(t.slice(i, i + 2), 16);
        return r;
      }
      dn(`encoding "${e}"`);
    }
    __name(xr2, "xr");
    function is2(t) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a2) => a2.startsWith("get") || a2.startsWith("set")), n = r.map((a2) => a2.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a2, f) => function(h = 0) {
        return V(h, "offset"), X(h, "offset"), $2(h, "offset", this.length - 1), new DataView(this.buffer)[r[a2]](h, f);
      }, "i"), o = /* @__PURE__ */ __name((a2, f) => function(h, C = 0) {
        let A = r[a2].match(/set(\w+\d+)/)[1].toLowerCase(), k = ss2[A];
        return V(C, "offset"), X(C, "offset"), $2(C, "offset", this.length - 1), os2(h, "value", k[0], k[1]), new DataView(this.buffer)[r[a2]](C, h, f), C + parseInt(r[a2].match(/\d+/)[0]) / 8;
      }, "o"), s = /* @__PURE__ */ __name((a2) => {
        a2.forEach((f) => {
          f.includes("Uint") && (t[f.replace("Uint", "UInt")] = t[f]), f.includes("Float64") && (t[f.replace("Float64", "Double")] = t[f]), f.includes("Float32") && (t[f.replace("Float32", "Float")] = t[f]);
        });
      }, "s");
      n.forEach((a2, f) => {
        a2.startsWith("read") && (t[a2] = i(f, false), t[a2 + "LE"] = i(f, true), t[a2 + "BE"] = i(f, false)), a2.startsWith("write") && (t[a2] = o(f, false), t[a2 + "LE"] = o(f, true), t[a2 + "BE"] = o(f, false)), s([a2, a2 + "LE", a2 + "BE"]);
      });
    }
    __name(is2, "is");
    function dn(t) {
      throw new Error(`Buffer polyfill does not implement "${t}"`);
    }
    __name(dn, "dn");
    function Dt(t, e) {
      if (!(t instanceof Uint8Array)) throw new TypeError(`The "${e}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(Dt, "Dt");
    function $2(t, e, r = cs2 + 1) {
      if (t < 0 || t > r) {
        let n = new RangeError(`The value of "${e}" is out of range. It must be >= 0 && <= ${r}. Received ${t}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name($2, "$");
    function V(t, e) {
      if (typeof t != "number") {
        let r = new TypeError(`The "${e}" argument must be of type number. Received type ${typeof t}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(V, "V");
    function X(t, e) {
      if (!Number.isInteger(t) || Number.isNaN(t)) {
        let r = new RangeError(`The value of "${e}" is out of range. It must be an integer. Received ${t}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(X, "X");
    function os2(t, e, r, n) {
      if (t < r || t > n) {
        let i = new RangeError(`The value of "${e}" is out of range. It must be >= ${r} and <= ${n}. Received ${t}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(os2, "os");
    function pn(t, e) {
      if (typeof t != "string") {
        let r = new TypeError(`The "${e}" argument must be of type string. Received type ${typeof t}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(pn, "pn");
    function ms2(t, e = "utf8") {
      return y.from(t, e);
    }
    __name(ms2, "ms");
    var y;
    var ss2;
    var as2;
    var ls;
    var us2;
    var cs2;
    var b2;
    var Pr;
    var u = ie2(() => {
      "use strict";
      y = class t extends Uint8Array {
        static {
          __name(this, "t");
        }
        _isBuffer = true;
        get offset() {
          return this.byteOffset;
        }
        static alloc(e, r = 0, n = "utf8") {
          return pn(n, "encoding"), t.allocUnsafe(e).fill(r, n);
        }
        static allocUnsafe(e) {
          return t.from(e);
        }
        static allocUnsafeSlow(e) {
          return t.from(e);
        }
        static isBuffer(e) {
          return e && !!e._isBuffer;
        }
        static byteLength(e, r = "utf8") {
          if (typeof e == "string") return xr2(e, r).byteLength;
          if (e && e.byteLength) return e.byteLength;
          let n = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw n.code = "ERR_INVALID_ARG_TYPE", n;
        }
        static isEncoding(e) {
          return us2.includes(e);
        }
        static compare(e, r) {
          Dt(e, "buff1"), Dt(r, "buff2");
          for (let n = 0; n < e.length; n++) {
            if (e[n] < r[n]) return -1;
            if (e[n] > r[n]) return 1;
          }
          return e.length === r.length ? 0 : e.length > r.length ? 1 : -1;
        }
        static from(e, r = "utf8") {
          if (e && typeof e == "object" && e.type === "Buffer") return new t(e.data);
          if (typeof e == "number") return new t(new Uint8Array(e));
          if (typeof e == "string") return xr2(e, r);
          if (ArrayBuffer.isView(e)) {
            let { byteOffset: n, byteLength: i, buffer: o } = e;
            return "map" in e && typeof e.map == "function" ? new t(e.map((s) => s % 256), n, i) : new t(o, n, i);
          }
          if (e && typeof e == "object" && ("length" in e || "byteLength" in e || "buffer" in e)) return new t(e);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(e, r) {
          if (e.length === 0) return t.alloc(0);
          let n = [].concat(...e.map((o) => [...o])), i = t.alloc(r !== void 0 ? r : n.length);
          return i.set(r !== void 0 ? n.slice(0, r) : n), i;
        }
        slice(e = 0, r = this.length) {
          return this.subarray(e, r);
        }
        subarray(e = 0, r = this.length) {
          return Object.setPrototypeOf(super.subarray(e, r), t.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(e, r) {
          V(e, "offset"), X(e, "offset"), $2(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return n.getUint8(0) & 128 && (i -= Math.pow(256, r)), i;
        }
        readIntLE(e, r) {
          V(e, "offset"), X(e, "offset"), $2(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return n.getUint8(r - 1) & 128 && (i -= Math.pow(256, r)), i;
        }
        readUIntBE(e, r) {
          V(e, "offset"), X(e, "offset"), $2(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return i;
        }
        readUintBE(e, r) {
          return this.readUIntBE(e, r);
        }
        readUIntLE(e, r) {
          V(e, "offset"), X(e, "offset"), $2(e, "offset", this.length - 1), V(r, "byteLength"), X(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return i;
        }
        readUintLE(e, r) {
          return this.readUIntLE(e, r);
        }
        writeIntBE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntBE(e, r, n);
        }
        writeIntLE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntLE(e, r, n);
        }
        writeUIntBE(e, r, n) {
          V(r, "offset"), X(r, "offset"), $2(r, "offset", this.length - 1), V(n, "byteLength"), X(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = n - 1; o >= 0; o--) i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintBE(e, r, n) {
          return this.writeUIntBE(e, r, n);
        }
        writeUIntLE(e, r, n) {
          V(r, "offset"), X(r, "offset"), $2(r, "offset", this.length - 1), V(n, "byteLength"), X(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = 0; o < n; o++) i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintLE(e, r, n) {
          return this.writeUIntLE(e, r, n);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 2) e.setUint16(r, e.getUint16(r, true), false);
          return this;
        }
        swap32() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 4) e.setUint32(r, e.getUint32(r, true), false);
          return this;
        }
        swap64() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 8) e.setBigUint64(r, e.getBigUint64(r, true), false);
          return this;
        }
        compare(e, r = 0, n = e.length, i = 0, o = this.length) {
          return Dt(e, "target"), V(r, "targetStart"), V(n, "targetEnd"), V(i, "sourceStart"), V(o, "sourceEnd"), $2(r, "targetStart"), $2(n, "targetEnd", e.length), $2(i, "sourceStart"), $2(o, "sourceEnd", this.length), t.compare(this.slice(i, o), e.slice(r, n));
        }
        equals(e) {
          return Dt(e, "otherBuffer"), this.length === e.length && this.every((r, n) => r === e[n]);
        }
        copy(e, r = 0, n = 0, i = this.length) {
          $2(r, "targetStart"), $2(n, "sourceStart", this.length), $2(i, "sourceEnd"), r >>>= 0, n >>>= 0, i >>>= 0;
          let o = 0;
          for (; n < i && !(this[n] === void 0 || e[r] === void 0); ) e[r] = this[n], o++, n++, r++;
          return o;
        }
        write(e, r, n, i = "utf8") {
          let o = typeof r == "string" ? 0 : r ?? 0, s = typeof n == "string" ? this.length - o : n ?? this.length - o;
          return i = typeof r == "string" ? r : typeof n == "string" ? n : i, V(o, "offset"), V(s, "length"), $2(o, "offset", this.length), $2(s, "length", this.length), (i === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le") && (s = s - s % 2), xr2(e, i).copy(this, o, 0, s);
        }
        fill(e = 0, r = 0, n = this.length, i = "utf-8") {
          let o = typeof r == "string" ? 0 : r, s = typeof n == "string" ? this.length : n;
          if (i = typeof r == "string" ? r : typeof n == "string" ? n : i, e = t.from(typeof e == "number" ? [e] : e ?? [], i), pn(i, "encoding"), $2(o, "offset", this.length), $2(s, "end", this.length), e.length !== 0) for (let a2 = o; a2 < s; a2 += e.length) super.set(e.slice(0, e.length + a2 >= this.length ? this.length - a2 : e.length), a2);
          return this;
        }
        includes(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n) !== -1;
        }
        lastIndexOf(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n, true);
        }
        indexOf(e, r = null, n = "utf-8", i = false) {
          let o = i ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          n = typeof r == "string" ? r : n;
          let s = t.from(typeof e == "number" ? [e] : e, n), a2 = typeof r == "string" ? 0 : r;
          return a2 = typeof r == "number" ? a2 : null, a2 = Number.isNaN(a2) ? null : a2, a2 ??= i ? this.length : 0, a2 = a2 < 0 ? this.length + a2 : a2, s.length === 0 && i === false ? a2 >= this.length ? this.length : a2 : s.length === 0 && i === true ? (a2 >= this.length ? this.length : a2) || this.length : o((f, h) => (i ? h <= a2 : h >= a2) && this[h] === s[0] && s.every((A, k) => this[h + k] === A));
        }
        toString(e = "utf8", r = 0, n = this.length) {
          if (r = r < 0 ? 0 : r, e = e.toString().toLowerCase(), n <= 0) return "";
          if (e === "utf8" || e === "utf-8") return ls.decode(this.slice(r, n));
          if (e === "base64" || e === "base64url") {
            let i = btoa(this.reduce((o, s) => o + Pr(s), ""));
            return e === "base64url" ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : i;
          }
          if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return this.slice(r, n).reduce((i, o) => i + Pr(o & (e === "ascii" ? 127 : 255)), "");
          if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
            let i = new DataView(this.buffer.slice(r, n));
            return Array.from({ length: i.byteLength / 2 }, (o, s) => s * 2 + 1 < i.byteLength ? Pr(i.getUint16(s * 2, true)) : "").join("");
          }
          if (e === "hex") return this.slice(r, n).reduce((i, o) => i + o.toString(16).padStart(2, "0"), "");
          dn(`encoding "${e}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      };
      ss2 = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, as2 = new TextEncoder(), ls = new TextDecoder(), us2 = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], cs2 = 4294967295;
      is2(y.prototype);
      b2 = new Proxy(ms2, { construct(t, [e, r]) {
        return y.from(e, r);
      }, get(t, e) {
        return y[e];
      } }), Pr = String.fromCodePoint;
    });
    var g;
    var x2;
    var c = ie2(() => {
      "use strict";
      g = { nextTick: /* @__PURE__ */ __name((t, ...e) => {
        setTimeout(() => {
          t(...e);
        }, 0);
      }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: x2 } = g;
    });
    var P;
    var m2 = ie2(() => {
      "use strict";
      P = globalThis.performance ?? (() => {
        let t = Date.now();
        return { now: /* @__PURE__ */ __name(() => Date.now() - t, "now") };
      })();
    });
    var E2;
    var p2 = ie2(() => {
      "use strict";
      E2 = /* @__PURE__ */ __name(() => {
      }, "E");
      E2.prototype = E2;
    });
    var w;
    var d2 = ie2(() => {
      "use strict";
      w = class {
        static {
          __name(this, "w");
        }
        value;
        constructor(e) {
          this.value = e;
        }
        deref() {
          return this.value;
        }
      };
    });
    function hn(t, e) {
      var r, n, i, o, s, a2, f, h, C = t.constructor, A = C.precision;
      if (!t.s || !e.s) return e.s || (e = new C(t)), q ? L(e, A) : e;
      if (f = t.d, h = e.d, s = t.e, i = e.e, f = f.slice(), o = s - i, o) {
        for (o < 0 ? (n = f, o = -o, a2 = h.length) : (n = h, i = s, a2 = f.length), s = Math.ceil(A / N), a2 = s > a2 ? s + 1 : a2 + 1, o > a2 && (o = a2, n.length = 1), n.reverse(); o--; ) n.push(0);
        n.reverse();
      }
      for (a2 = f.length, o = h.length, a2 - o < 0 && (o = a2, n = h, h = f, f = n), r = 0; o; ) r = (f[--o] = f[o] + h[o] + r) / J | 0, f[o] %= J;
      for (r && (f.unshift(r), ++i), a2 = f.length; f[--a2] == 0; ) f.pop();
      return e.d = f, e.e = i, q ? L(e, A) : e;
    }
    __name(hn, "hn");
    function ce2(t, e, r) {
      if (t !== ~~t || t < e || t > r) throw Error(ke + t);
    }
    __name(ce2, "ce");
    function ue(t) {
      var e, r, n, i = t.length - 1, o = "", s = t[0];
      if (i > 0) {
        for (o += s, e = 1; e < i; e++) n = t[e] + "", r = N - n.length, r && (o += Pe(r)), o += n;
        s = t[e], n = s + "", r = N - n.length, r && (o += Pe(r));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    __name(ue, "ue");
    function bn(t, e) {
      var r, n, i, o, s, a2, f = 0, h = 0, C = t.constructor, A = C.precision;
      if (j(t) > 16) throw Error(Tr + j(t));
      if (!t.s) return new C(te);
      for (e == null ? (q = false, a2 = A) : a2 = e, s = new C(0.03125); t.abs().gte(0.1); ) t = t.times(s), h += 5;
      for (n = Math.log(Oe(2, h)) / Math.LN10 * 2 + 5 | 0, a2 += n, r = i = o = new C(te), C.precision = a2; ; ) {
        if (i = L(i.times(t), a2), r = r.times(++f), s = o.plus(he(i, r, a2)), ue(s.d).slice(0, a2) === ue(o.d).slice(0, a2)) {
          for (; h--; ) o = L(o.times(o), a2);
          return C.precision = A, e == null ? (q = true, L(o, A)) : o;
        }
        o = s;
      }
    }
    __name(bn, "bn");
    function j(t) {
      for (var e = t.e * N, r = t.d[0]; r >= 10; r /= 10) e++;
      return e;
    }
    __name(j, "j");
    function vr2(t, e, r) {
      if (e > t.LN10.sd()) throw q = true, r && (t.precision = r), Error(oe + "LN10 precision limit exceeded");
      return L(new t(t.LN10), e);
    }
    __name(vr2, "vr");
    function Pe(t) {
      for (var e = ""; t--; ) e += "0";
      return e;
    }
    __name(Pe, "Pe");
    function ot2(t, e) {
      var r, n, i, o, s, a2, f, h, C, A = 1, k = 10, R = t, _ = R.d, O2 = R.constructor, D = O2.precision;
      if (R.s < 1) throw Error(oe + (R.s ? "NaN" : "-Infinity"));
      if (R.eq(te)) return new O2(0);
      if (e == null ? (q = false, h = D) : h = e, R.eq(10)) return e == null && (q = true), vr2(O2, h);
      if (h += k, O2.precision = h, r = ue(_), n = r.charAt(0), o = j(R), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) R = R.times(t), r = ue(R.d), n = r.charAt(0), A++;
        o = j(R), n > 1 ? (R = new O2("0." + r), o++) : R = new O2(n + "." + r.slice(1));
      } else return f = vr2(O2, h + 2, D).times(o + ""), R = ot2(new O2(n + "." + r.slice(1)), h - k).plus(f), O2.precision = D, e == null ? (q = true, L(R, D)) : R;
      for (a2 = s = R = he(R.minus(te), R.plus(te), h), C = L(R.times(R), h), i = 3; ; ) {
        if (s = L(s.times(C), h), f = a2.plus(he(s, new O2(i), h)), ue(f.d).slice(0, h) === ue(a2.d).slice(0, h)) return a2 = a2.times(2), o !== 0 && (a2 = a2.plus(vr2(O2, h + 2, D).times(o + ""))), a2 = he(a2, new O2(A), h), O2.precision = D, e == null ? (q = true, L(a2, D)) : a2;
        a2 = f, i += 2;
      }
    }
    __name(ot2, "ot");
    function fn(t, e) {
      var r, n, i;
      for ((r = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (n = e.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +e.slice(n + 1), e = e.substring(0, n)) : r < 0 && (r = e.length), n = 0; e.charCodeAt(n) === 48; ) ++n;
      for (i = e.length; e.charCodeAt(i - 1) === 48; ) --i;
      if (e = e.slice(n, i), e) {
        if (i -= n, r = r - n - 1, t.e = Ne(r / N), t.d = [], n = (r + 1) % N, r < 0 && (n += N), n < i) {
          for (n && t.d.push(+e.slice(0, n)), i -= N; n < i; ) t.d.push(+e.slice(n, n += N));
          e = e.slice(n), n = N - e.length;
        } else n -= i;
        for (; n--; ) e += "0";
        if (t.d.push(+e), q && (t.e > It || t.e < -It)) throw Error(Tr + r);
      } else t.s = 0, t.e = 0, t.d = [0];
      return t;
    }
    __name(fn, "fn");
    function L(t, e, r) {
      var n, i, o, s, a2, f, h, C, A = t.d;
      for (s = 1, o = A[0]; o >= 10; o /= 10) s++;
      if (n = e - s, n < 0) n += N, i = e, h = A[C = 0];
      else {
        if (C = Math.ceil((n + 1) / N), o = A.length, C >= o) return t;
        for (h = o = A[C], s = 1; o >= 10; o /= 10) s++;
        n %= N, i = n - N + s;
      }
      if (r !== void 0 && (o = Oe(10, s - i - 1), a2 = h / o % 10 | 0, f = e < 0 || A[C + 1] !== void 0 || h % o, f = r < 4 ? (a2 || f) && (r == 0 || r == (t.s < 0 ? 3 : 2)) : a2 > 5 || a2 == 5 && (r == 4 || f || r == 6 && (n > 0 ? i > 0 ? h / Oe(10, s - i) : 0 : A[C - 1]) % 10 & 1 || r == (t.s < 0 ? 8 : 7))), e < 1 || !A[0]) return f ? (o = j(t), A.length = 1, e = e - o - 1, A[0] = Oe(10, (N - e % N) % N), t.e = Ne(-e / N) || 0) : (A.length = 1, A[0] = t.e = t.s = 0), t;
      if (n == 0 ? (A.length = C, o = 1, C--) : (A.length = C + 1, o = Oe(10, N - n), A[C] = i > 0 ? (h / Oe(10, s - i) % Oe(10, i) | 0) * o : 0), f) for (; ; ) if (C == 0) {
        (A[0] += o) == J && (A[0] = 1, ++t.e);
        break;
      } else {
        if (A[C] += o, A[C] != J) break;
        A[C--] = 0, o = 1;
      }
      for (n = A.length; A[--n] === 0; ) A.pop();
      if (q && (t.e > It || t.e < -It)) throw Error(Tr + j(t));
      return t;
    }
    __name(L, "L");
    function wn(t, e) {
      var r, n, i, o, s, a2, f, h, C, A, k = t.constructor, R = k.precision;
      if (!t.s || !e.s) return e.s ? e.s = -e.s : e = new k(t), q ? L(e, R) : e;
      if (f = t.d, A = e.d, n = e.e, h = t.e, f = f.slice(), s = h - n, s) {
        for (C = s < 0, C ? (r = f, s = -s, a2 = A.length) : (r = A, n = h, a2 = f.length), i = Math.max(Math.ceil(R / N), a2) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--; ) r.push(0);
        r.reverse();
      } else {
        for (i = f.length, a2 = A.length, C = i < a2, C && (a2 = i), i = 0; i < a2; i++) if (f[i] != A[i]) {
          C = f[i] < A[i];
          break;
        }
        s = 0;
      }
      for (C && (r = f, f = A, A = r, e.s = -e.s), a2 = f.length, i = A.length - a2; i > 0; --i) f[a2++] = 0;
      for (i = A.length; i > s; ) {
        if (f[--i] < A[i]) {
          for (o = i; o && f[--o] === 0; ) f[o] = J - 1;
          --f[o], f[i] += J;
        }
        f[i] -= A[i];
      }
      for (; f[--a2] === 0; ) f.pop();
      for (; f[0] === 0; f.shift()) --n;
      return f[0] ? (e.d = f, e.e = n, q ? L(e, R) : e) : new k(0);
    }
    __name(wn, "wn");
    function De(t, e, r) {
      var n, i = j(t), o = ue(t.d), s = o.length;
      return e ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Pe(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Pe(-i - 1) + o, r && (n = r - s) > 0 && (o += Pe(n))) : i >= s ? (o += Pe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Pe(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Pe(n))), t.s < 0 ? "-" + o : o;
    }
    __name(De, "De");
    function gn(t, e) {
      if (t.length > e) return t.length = e, true;
    }
    __name(gn, "gn");
    function En2(t) {
      var e, r, n;
      function i(o) {
        var s = this;
        if (!(s instanceof i)) return new i(o);
        if (s.constructor = i, o instanceof i) {
          s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0) throw Error(ke + o);
          if (o > 0) s.s = 1;
          else if (o < 0) o = -o, s.s = -1;
          else {
            s.s = 0, s.e = 0, s.d = [0];
            return;
          }
          if (o === ~~o && o < 1e7) {
            s.e = 0, s.d = [o];
            return;
          }
          return fn(s, o.toString());
        } else if (typeof o != "string") throw Error(ke + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, ds2.test(o)) fn(s, o);
        else throw Error(ke + o);
      }
      __name(i, "i");
      if (i.prototype = S2, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = En2, i.config = i.set = fs, t === void 0 && (t = {}), t) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], e = 0; e < n.length; ) t.hasOwnProperty(r = n[e++]) || (t[r] = this[r]);
      return i.config(t), i;
    }
    __name(En2, "En");
    function fs(t) {
      if (!t || typeof t != "object") throw Error(oe + "Object expected");
      var e, r, n, i = ["precision", 1, Ue, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (e = 0; e < i.length; e += 3) if ((n = t[r = i[e]]) !== void 0) if (Ne(n) === n && n >= i[e + 1] && n <= i[e + 2]) this[r] = n;
      else throw Error(ke + r + ": " + n);
      if ((n = t[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
      else throw Error(ke + r + ": " + n);
      return this;
    }
    __name(fs, "fs");
    var Ue;
    var ps;
    var Cr;
    var q;
    var oe;
    var ke;
    var Tr;
    var Ne;
    var Oe;
    var ds2;
    var te;
    var J;
    var N;
    var yn;
    var It;
    var S2;
    var he;
    var Cr;
    var Mt;
    var xn = ie2(() => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
      Ue = 1e9, ps = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, q = true, oe = "[DecimalError] ", ke = oe + "Invalid argument: ", Tr = oe + "Exponent out of range: ", Ne = Math.floor, Oe = Math.pow, ds2 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, J = 1e7, N = 7, yn = 9007199254740991, It = Ne(yn / N), S2 = {};
      S2.absoluteValue = S2.abs = function() {
        var t = new this.constructor(this);
        return t.s && (t.s = 1), t;
      };
      S2.comparedTo = S2.cmp = function(t) {
        var e, r, n, i, o = this;
        if (t = new o.constructor(t), o.s !== t.s) return o.s || -t.s;
        if (o.e !== t.e) return o.e > t.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = t.d.length, e = 0, r = n < i ? n : i; e < r; ++e) if (o.d[e] !== t.d[e]) return o.d[e] > t.d[e] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      S2.decimalPlaces = S2.dp = function() {
        var t = this, e = t.d.length - 1, r = (e - t.e) * N;
        if (e = t.d[e], e) for (; e % 10 == 0; e /= 10) r--;
        return r < 0 ? 0 : r;
      };
      S2.dividedBy = S2.div = function(t) {
        return he(this, new this.constructor(t));
      };
      S2.dividedToIntegerBy = S2.idiv = function(t) {
        var e = this, r = e.constructor;
        return L(he(e, new r(t), 0, 1), r.precision);
      };
      S2.equals = S2.eq = function(t) {
        return !this.cmp(t);
      };
      S2.exponent = function() {
        return j(this);
      };
      S2.greaterThan = S2.gt = function(t) {
        return this.cmp(t) > 0;
      };
      S2.greaterThanOrEqualTo = S2.gte = function(t) {
        return this.cmp(t) >= 0;
      };
      S2.isInteger = S2.isint = function() {
        return this.e > this.d.length - 2;
      };
      S2.isNegative = S2.isneg = function() {
        return this.s < 0;
      };
      S2.isPositive = S2.ispos = function() {
        return this.s > 0;
      };
      S2.isZero = function() {
        return this.s === 0;
      };
      S2.lessThan = S2.lt = function(t) {
        return this.cmp(t) < 0;
      };
      S2.lessThanOrEqualTo = S2.lte = function(t) {
        return this.cmp(t) < 1;
      };
      S2.logarithm = S2.log = function(t) {
        var e, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (t === void 0) t = new n(10);
        else if (t = new n(t), t.s < 1 || t.eq(te)) throw Error(oe + "NaN");
        if (r.s < 1) throw Error(oe + (r.s ? "NaN" : "-Infinity"));
        return r.eq(te) ? new n(0) : (q = false, e = he(ot2(r, o), ot2(t, o), o), q = true, L(e, i));
      };
      S2.minus = S2.sub = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? wn(e, t) : hn(e, (t.s = -t.s, t));
      };
      S2.modulo = S2.mod = function(t) {
        var e, r = this, n = r.constructor, i = n.precision;
        if (t = new n(t), !t.s) throw Error(oe + "NaN");
        return r.s ? (q = false, e = he(r, t, 0, 1).times(t), q = true, r.minus(e)) : L(new n(r), i);
      };
      S2.naturalExponential = S2.exp = function() {
        return bn(this);
      };
      S2.naturalLogarithm = S2.ln = function() {
        return ot2(this);
      };
      S2.negated = S2.neg = function() {
        var t = new this.constructor(this);
        return t.s = -t.s || 0, t;
      };
      S2.plus = S2.add = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? hn(e, t) : wn(e, (t.s = -t.s, t));
      };
      S2.precision = S2.sd = function(t) {
        var e, r, n, i = this;
        if (t !== void 0 && t !== !!t && t !== 1 && t !== 0) throw Error(ke + t);
        if (e = j(i) + 1, n = i.d.length - 1, r = n * N + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10) r--;
          for (n = i.d[0]; n >= 10; n /= 10) r++;
        }
        return t && e > r ? e : r;
      };
      S2.squareRoot = S2.sqrt = function() {
        var t, e, r, n, i, o, s, a2 = this, f = a2.constructor;
        if (a2.s < 1) {
          if (!a2.s) return new f(0);
          throw Error(oe + "NaN");
        }
        for (t = j(a2), q = false, i = Math.sqrt(+a2), i == 0 || i == 1 / 0 ? (e = ue(a2.d), (e.length + t) % 2 == 0 && (e += "0"), i = Math.sqrt(e), t = Ne((t + 1) / 2) - (t < 0 || t % 2), i == 1 / 0 ? e = "5e" + t : (e = i.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + t), n = new f(e)) : n = new f(i.toString()), r = f.precision, i = s = r + 3; ; ) if (o = n, n = o.plus(he(a2, o, s + 2)).times(0.5), ue(o.d).slice(0, s) === (e = ue(n.d)).slice(0, s)) {
          if (e = e.slice(s - 3, s + 1), i == s && e == "4999") {
            if (L(o, r + 1, 0), o.times(o).eq(a2)) {
              n = o;
              break;
            }
          } else if (e != "9999") break;
          s += 4;
        }
        return q = true, L(n, r);
      };
      S2.times = S2.mul = function(t) {
        var e, r, n, i, o, s, a2, f, h, C = this, A = C.constructor, k = C.d, R = (t = new A(t)).d;
        if (!C.s || !t.s) return new A(0);
        for (t.s *= C.s, r = C.e + t.e, f = k.length, h = R.length, f < h && (o = k, k = R, R = o, s = f, f = h, h = s), o = [], s = f + h, n = s; n--; ) o.push(0);
        for (n = h; --n >= 0; ) {
          for (e = 0, i = f + n; i > n; ) a2 = o[i] + R[n] * k[i - n - 1] + e, o[i--] = a2 % J | 0, e = a2 / J | 0;
          o[i] = (o[i] + e) % J | 0;
        }
        for (; !o[--s]; ) o.pop();
        return e ? ++r : o.shift(), t.d = o, t.e = r, q ? L(t, A.precision) : t;
      };
      S2.toDecimalPlaces = S2.todp = function(t, e) {
        var r = this, n = r.constructor;
        return r = new n(r), t === void 0 ? r : (ce2(t, 0, Ue), e === void 0 ? e = n.rounding : ce2(e, 0, 8), L(r, t + j(r) + 1, e));
      };
      S2.toExponential = function(t, e) {
        var r, n = this, i = n.constructor;
        return t === void 0 ? r = De(n, true) : (ce2(t, 0, Ue), e === void 0 ? e = i.rounding : ce2(e, 0, 8), n = L(new i(n), t + 1, e), r = De(n, true, t + 1)), r;
      };
      S2.toFixed = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? De(i) : (ce2(t, 0, Ue), e === void 0 ? e = o.rounding : ce2(e, 0, 8), n = L(new o(i), t + j(i) + 1, e), r = De(n.abs(), false, t + j(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      S2.toInteger = S2.toint = function() {
        var t = this, e = t.constructor;
        return L(new e(t), j(t) + 1, e.rounding);
      };
      S2.toNumber = function() {
        return +this;
      };
      S2.toPower = S2.pow = function(t) {
        var e, r, n, i, o, s, a2 = this, f = a2.constructor, h = 12, C = +(t = new f(t));
        if (!t.s) return new f(te);
        if (a2 = new f(a2), !a2.s) {
          if (t.s < 1) throw Error(oe + "Infinity");
          return a2;
        }
        if (a2.eq(te)) return a2;
        if (n = f.precision, t.eq(te)) return L(a2, n);
        if (e = t.e, r = t.d.length - 1, s = e >= r, o = a2.s, s) {
          if ((r = C < 0 ? -C : C) <= yn) {
            for (i = new f(te), e = Math.ceil(n / N + 4), q = false; r % 2 && (i = i.times(a2), gn(i.d, e)), r = Ne(r / 2), r !== 0; ) a2 = a2.times(a2), gn(a2.d, e);
            return q = true, t.s < 0 ? new f(te).div(i) : L(i, n);
          }
        } else if (o < 0) throw Error(oe + "NaN");
        return o = o < 0 && t.d[Math.max(e, r)] & 1 ? -1 : 1, a2.s = 1, q = false, i = t.times(ot2(a2, n + h)), q = true, i = bn(i), i.s = o, i;
      };
      S2.toPrecision = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? (r = j(i), n = De(i, r <= o.toExpNeg || r >= o.toExpPos)) : (ce2(t, 1, Ue), e === void 0 ? e = o.rounding : ce2(e, 0, 8), i = L(new o(i), t, e), r = j(i), n = De(i, t <= r || r <= o.toExpNeg, t)), n;
      };
      S2.toSignificantDigits = S2.tosd = function(t, e) {
        var r = this, n = r.constructor;
        return t === void 0 ? (t = n.precision, e = n.rounding) : (ce2(t, 1, Ue), e === void 0 ? e = n.rounding : ce2(e, 0, 8)), L(new n(r), t, e);
      };
      S2.toString = S2.valueOf = S2.val = S2.toJSON = S2[Symbol.for("nodejs.util.inspect.custom")] = function() {
        var t = this, e = j(t), r = t.constructor;
        return De(t, e <= r.toExpNeg || e >= r.toExpPos);
      };
      he = /* @__PURE__ */ function() {
        function t(n, i) {
          var o, s = 0, a2 = n.length;
          for (n = n.slice(); a2--; ) o = n[a2] * i + s, n[a2] = o % J | 0, s = o / J | 0;
          return s && n.unshift(s), n;
        }
        __name(t, "t");
        function e(n, i, o, s) {
          var a2, f;
          if (o != s) f = o > s ? 1 : -1;
          else for (a2 = f = 0; a2 < o; a2++) if (n[a2] != i[a2]) {
            f = n[a2] > i[a2] ? 1 : -1;
            break;
          }
          return f;
        }
        __name(e, "e");
        function r(n, i, o) {
          for (var s = 0; o--; ) n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * J + n[o] - i[o];
          for (; !n[0] && n.length > 1; ) n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s) {
          var a2, f, h, C, A, k, R, _, O2, D, ye, z, F, Y, Se2, Er2, se, St, Ot = n.constructor, Yo = n.s == i.s ? 1 : -1, le = n.d, B = i.d;
          if (!n.s) return new Ot(n);
          if (!i.s) throw Error(oe + "Division by zero");
          for (f = n.e - i.e, se = B.length, Se2 = le.length, R = new Ot(Yo), _ = R.d = [], h = 0; B[h] == (le[h] || 0); ) ++h;
          if (B[h] > (le[h] || 0) && --f, o == null ? z = o = Ot.precision : s ? z = o + (j(n) - j(i)) + 1 : z = o, z < 0) return new Ot(0);
          if (z = z / N + 2 | 0, h = 0, se == 1) for (C = 0, B = B[0], z++; (h < Se2 || C) && z--; h++) F = C * J + (le[h] || 0), _[h] = F / B | 0, C = F % B | 0;
          else {
            for (C = J / (B[0] + 1) | 0, C > 1 && (B = t(B, C), le = t(le, C), se = B.length, Se2 = le.length), Y = se, O2 = le.slice(0, se), D = O2.length; D < se; ) O2[D++] = 0;
            St = B.slice(), St.unshift(0), Er2 = B[0], B[1] >= J / 2 && ++Er2;
            do
              C = 0, a2 = e(B, O2, se, D), a2 < 0 ? (ye = O2[0], se != D && (ye = ye * J + (O2[1] || 0)), C = ye / Er2 | 0, C > 1 ? (C >= J && (C = J - 1), A = t(B, C), k = A.length, D = O2.length, a2 = e(A, O2, k, D), a2 == 1 && (C--, r(A, se < k ? St : B, k))) : (C == 0 && (a2 = C = 1), A = B.slice()), k = A.length, k < D && A.unshift(0), r(O2, A, D), a2 == -1 && (D = O2.length, a2 = e(B, O2, se, D), a2 < 1 && (C++, r(O2, se < D ? St : B, D))), D = O2.length) : a2 === 0 && (C++, O2 = [0]), _[h++] = C, a2 && O2[0] ? O2[D++] = le[Y] || 0 : (O2 = [le[Y]], D = 1);
            while ((Y++ < Se2 || O2[0] !== void 0) && z--);
          }
          return _[0] || _.shift(), R.e = f, L(R, s ? o + j(R) + 1 : o);
        };
      }();
      Cr = En2(ps);
      te = new Cr(1);
      Mt = Cr;
    });
    var v2;
    var be2;
    var l = ie2(() => {
      "use strict";
      xn();
      v2 = class extends Mt {
        static {
          __name(this, "v");
        }
        static isDecimal(e) {
          return e instanceof Mt;
        }
        static random(e = 20) {
          {
            let n = globalThis.crypto.getRandomValues(new Uint8Array(e)).reduce((i, o) => i + o, "");
            return new Mt(`0.${n.slice(0, e)}`);
          }
        }
      }, be2 = v2;
    });
    function Es2() {
      return false;
    }
    __name(Es2, "Es");
    function kr() {
      return { dev: 0, ino: 0, mode: 0, nlink: 0, uid: 0, gid: 0, rdev: 0, size: 0, blksize: 0, blocks: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0, atime: /* @__PURE__ */ new Date(), mtime: /* @__PURE__ */ new Date(), ctime: /* @__PURE__ */ new Date(), birthtime: /* @__PURE__ */ new Date() };
    }
    __name(kr, "kr");
    function xs() {
      return kr();
    }
    __name(xs, "xs");
    function Ps2() {
      return [];
    }
    __name(Ps2, "Ps");
    function vs2(t) {
      t(null, []);
    }
    __name(vs2, "vs");
    function Ts() {
      return "";
    }
    __name(Ts, "Ts");
    function Cs2() {
      return "";
    }
    __name(Cs2, "Cs");
    function As() {
    }
    __name(As, "As");
    function Rs() {
    }
    __name(Rs, "Rs");
    function Ss() {
    }
    __name(Ss, "Ss");
    function Os() {
    }
    __name(Os, "Os");
    function ks() {
    }
    __name(ks, "ks");
    function Ds() {
    }
    __name(Ds, "Ds");
    function Is2() {
    }
    __name(Is2, "Is");
    function Ms2() {
    }
    __name(Ms2, "Ms");
    function _s2() {
      return { close: /* @__PURE__ */ __name(() => {
      }, "close"), on: /* @__PURE__ */ __name(() => {
      }, "on"), removeAllListeners: /* @__PURE__ */ __name(() => {
      }, "removeAllListeners") };
    }
    __name(_s2, "_s");
    function Ls(t, e) {
      e(null, kr());
    }
    __name(Ls, "Ls");
    var Fs;
    var Us;
    var Nn2;
    var qn = ie2(() => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
      Fs = {}, Us = { existsSync: Es2, lstatSync: kr, stat: Ls, statSync: xs, readdirSync: Ps2, readdir: vs2, readlinkSync: Ts, realpathSync: Cs2, chmodSync: As, renameSync: Rs, mkdirSync: Ss, rmdirSync: Os, rmSync: ks, unlinkSync: Ds, watchFile: Is2, unwatchFile: Ms2, watch: _s2, promises: Fs }, Nn2 = Us;
    });
    function Ns(...t) {
      return t.join("/");
    }
    __name(Ns, "Ns");
    function qs2(...t) {
      return t.join("/");
    }
    __name(qs2, "qs");
    function Bs(t) {
      let e = Bn(t), r = Vn(t), [n, i] = e.split(".");
      return { root: "/", dir: r, base: e, ext: i, name: n };
    }
    __name(Bs, "Bs");
    function Bn(t) {
      let e = t.split("/");
      return e[e.length - 1];
    }
    __name(Bn, "Bn");
    function Vn(t) {
      return t.split("/").slice(0, -1).join("/");
    }
    __name(Vn, "Vn");
    function js2(t) {
      let e = t.split("/").filter((i) => i !== "" && i !== "."), r = [];
      for (let i of e) i === ".." ? r.pop() : r.push(i);
      let n = r.join("/");
      return t.startsWith("/") ? "/" + n : n;
    }
    __name(js2, "js");
    var jn;
    var Vs2;
    var $s;
    var Qs2;
    var Ut;
    var $n = ie2(() => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
      jn = "/", Vs2 = ":";
      $s = { sep: jn }, Qs2 = { basename: Bn, delimiter: Vs2, dirname: Vn, join: qs2, normalize: js2, parse: Bs, posix: $s, resolve: Ns, sep: jn }, Ut = Qs2;
    });
    var Qn2 = Fe2((lm, Js) => {
      Js.exports = { name: "@prisma/internals", version: "6.15.0", description: "This package is intended for Prisma's internal use", main: "dist/index.js", types: "dist/index.d.ts", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/internals" }, homepage: "https://www.prisma.io", author: "Tim Suchanek <suchanek@prisma.io>", bugs: "https://github.com/prisma/prisma/issues", license: "Apache-2.0", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", test: "dotenv -e ../../.db.env -- jest --silent", prepublishOnly: "pnpm run build" }, files: ["README.md", "dist", "!**/libquery_engine*", "!dist/get-generators/engines/*", "scripts"], devDependencies: { "@babel/helper-validator-identifier": "7.25.9", "@opentelemetry/api": "1.9.0", "@swc/core": "1.11.5", "@swc/jest": "0.2.37", "@types/babel__helper-validator-identifier": "7.15.2", "@types/jest": "29.5.14", "@types/node": "18.19.76", "@types/resolve": "1.20.6", archiver: "6.0.2", "checkpoint-client": "1.1.33", "cli-truncate": "4.0.0", dotenv: "16.5.0", empathic: "2.0.0", esbuild: "0.25.5", "escape-string-regexp": "5.0.0", execa: "5.1.1", "fast-glob": "3.3.3", "find-up": "7.0.0", "fp-ts": "2.16.9", "fs-extra": "11.3.0", "fs-jetpack": "5.1.0", "global-dirs": "4.0.0", globby: "11.1.0", "identifier-regex": "1.0.0", "indent-string": "4.0.0", "is-windows": "1.0.2", "is-wsl": "3.1.0", jest: "29.7.0", "jest-junit": "16.0.0", kleur: "4.1.5", "mock-stdin": "1.0.0", "new-github-issue-url": "0.2.1", "node-fetch": "3.3.2", "npm-packlist": "5.1.3", open: "7.4.2", "p-map": "4.0.0", resolve: "1.22.10", "string-width": "7.2.0", "strip-ansi": "6.0.1", "strip-indent": "4.0.0", "temp-dir": "2.0.0", tempy: "1.0.1", "terminal-link": "4.0.0", tmp: "0.2.3", "ts-node": "10.9.2", "ts-pattern": "5.6.2", "ts-toolbelt": "9.6.0", typescript: "5.4.5", yarn: "1.22.22" }, dependencies: { "@prisma/config": "workspace:*", "@prisma/debug": "workspace:*", "@prisma/dmmf": "workspace:*", "@prisma/driver-adapter-utils": "workspace:*", "@prisma/engines": "workspace:*", "@prisma/fetch-engine": "workspace:*", "@prisma/generator": "workspace:*", "@prisma/generator-helper": "workspace:*", "@prisma/get-platform": "workspace:*", "@prisma/prisma-schema-wasm": "6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb", "@prisma/schema-engine-wasm": "6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb", "@prisma/schema-files-loader": "workspace:*", arg: "5.0.2", prompts: "2.4.2" }, peerDependencies: { typescript: ">=5.1.0" }, peerDependenciesMeta: { typescript: { optional: true } }, sideEffects: false };
    });
    var Hn = Fe2((Ep, Kn) => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
      Kn.exports = (t, e = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof t != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof t}\``);
        if (typeof e != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof e}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (e === 0) return t;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return t.replace(n, r.indent.repeat(e));
      };
    });
    var Xn = Fe2((_p, Yn) => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
      Yn.exports = ({ onlyFirst: t = false } = {}) => {
        let e = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(e, t ? void 0 : "g");
      };
    });
    var ei = Fe2((Vp, Zn) => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
      var ta = Xn();
      Zn.exports = (t) => typeof t == "string" ? t.replace(ta(), "") : t;
    });
    var Br = Fe2((zy, oi) => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
      oi.exports = /* @__PURE__ */ function() {
        function t(e, r, n, i, o) {
          return e < r || n < r ? e > n ? n + 1 : e + 1 : i === o ? r : r + 1;
        }
        __name(t, "t");
        return function(e, r) {
          if (e === r) return 0;
          if (e.length > r.length) {
            var n = e;
            e = r, r = n;
          }
          for (var i = e.length, o = r.length; i > 0 && e.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && e.charCodeAt(s) === r.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a2 = 0, f, h, C, A, k, R, _, O2, D, ye, z, F, Y = [];
          for (f = 0; f < i; f++) Y.push(f + 1), Y.push(e.charCodeAt(s + f));
          for (var Se2 = Y.length - 1; a2 < o - 3; ) for (D = r.charCodeAt(s + (h = a2)), ye = r.charCodeAt(s + (C = a2 + 1)), z = r.charCodeAt(s + (A = a2 + 2)), F = r.charCodeAt(s + (k = a2 + 3)), R = a2 += 4, f = 0; f < Se2; f += 2) _ = Y[f], O2 = Y[f + 1], h = t(_, h, C, D, O2), C = t(h, C, A, ye, O2), A = t(C, A, k, z, O2), R = t(A, k, R, F, O2), Y[f] = R, k = A, A = C, C = h, h = _;
          for (; a2 < o; ) for (D = r.charCodeAt(s + (h = a2)), R = ++a2, f = 0; f < Se2; f += 2) _ = Y[f], Y[f] = R = t(_, h, R, D, Y[f + 1]), h = _;
          return R;
        };
      }();
    });
    var ci = ie2(() => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
    });
    var mi2 = ie2(() => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
    });
    var Li = Fe2((YP, Ga) => {
      Ga.exports = { name: "@prisma/engines-version", version: "6.15.0-5.85179d7826409ee107a6ba334b5e305ae3fba9fb", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "85179d7826409ee107a6ba334b5e305ae3fba9fb" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var sr;
    var Fi2 = ie2(() => {
      "use strict";
      u();
      c();
      m2();
      p2();
      d2();
      l();
      sr = class {
        static {
          __name(this, "sr");
        }
        events = {};
        on(e, r) {
          return this.events[e] || (this.events[e] = []), this.events[e].push(r), this;
        }
        emit(e, ...r) {
          return this.events[e] ? (this.events[e].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      };
    });
    var eu = {};
    nt2(eu, { DMMF: /* @__PURE__ */ __name(() => pt, "DMMF"), Debug: /* @__PURE__ */ __name(() => G2, "Debug"), Decimal: /* @__PURE__ */ __name(() => be2, "Decimal"), Extensions: /* @__PURE__ */ __name(() => Ar, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => Ye, "MetricsClient"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => I, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => Z, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => Ee, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => Q, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => K, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => Rr, "Public"), Sql: /* @__PURE__ */ __name(() => ee, "Sql"), createParam: /* @__PURE__ */ __name(() => Ri, "createParam"), defineDmmfProperty: /* @__PURE__ */ __name(() => Mi2, "defineDmmfProperty"), deserializeJsonResponse: /* @__PURE__ */ __name(() => et2, "deserializeJsonResponse"), deserializeRawResult: /* @__PURE__ */ __name(() => br2, "deserializeRawResult"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => ii2, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => Ni, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => Ko, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => Ae, "getRuntime"), join: /* @__PURE__ */ __name(() => Ui, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => Ho, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => _i, "makeTypedQueryFactory"), objectEnumValues: /* @__PURE__ */ __name(() => zt, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => Hr, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => nr, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => rr2, "skip"), sqltag: /* @__PURE__ */ __name(() => zr, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => void 0, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => ut2, "warnOnce") });
    module.exports = ns(eu);
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Ar = {};
    nt2(Ar, { defineExtension: /* @__PURE__ */ __name(() => Pn, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => vn2, "getExtensionContext") });
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Pn(t) {
      return typeof t == "function" ? t : (e) => e.$extends(t);
    }
    __name(Pn, "Pn");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function vn2(t) {
      return t;
    }
    __name(vn2, "vn");
    var Rr = {};
    nt2(Rr, { validator: /* @__PURE__ */ __name(() => Tn, "validator") });
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Tn(...t) {
      return (e) => e;
    }
    __name(Tn, "Tn");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Sr2;
    var Cn;
    var An;
    var Rn;
    var Sn = true;
    typeof g < "u" && ({ FORCE_COLOR: Sr2, NODE_DISABLE_COLORS: Cn, NO_COLOR: An, TERM: Rn } = g.env || {}, Sn = g.stdout && g.stdout.isTTY);
    var gs = { enabled: !Cn && An == null && Rn !== "dumb" && (Sr2 != null && Sr2 !== "0" || Sn) };
    function U2(t, e) {
      let r = new RegExp(`\\x1b\\[${e}m`, "g"), n = `\x1B[${t}m`, i = `\x1B[${e}m`;
      return function(o) {
        return !gs.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(U2, "U");
    var Xu = U2(0, 0);
    var _t3 = U2(1, 22);
    var Lt = U2(2, 22);
    var Zu = U2(3, 23);
    var On = U2(4, 24);
    var ec = U2(7, 27);
    var tc = U2(8, 28);
    var rc = U2(9, 29);
    var nc = U2(30, 39);
    var qe = U2(31, 39);
    var kn3 = U2(32, 39);
    var Dn2 = U2(33, 39);
    var In = U2(34, 39);
    var ic = U2(35, 39);
    var Mn2 = U2(36, 39);
    var oc = U2(37, 39);
    var _n = U2(90, 39);
    var sc = U2(90, 39);
    var ac = U2(40, 49);
    var lc = U2(41, 49);
    var uc = U2(42, 49);
    var cc2 = U2(43, 49);
    var mc = U2(44, 49);
    var pc = U2(45, 49);
    var dc = U2(46, 49);
    var fc = U2(47, 49);
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var ys2 = 100;
    var Ln2 = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Ft = [];
    var Fn = Date.now();
    var hs = 0;
    var Or = typeof g < "u" ? g.env : {};
    globalThis.DEBUG ??= Or.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= Or.DEBUG_COLORS ? Or.DEBUG_COLORS === "true" : true;
    var st = { enable(t) {
      typeof t == "string" && (globalThis.DEBUG = t);
    }, disable() {
      let t = globalThis.DEBUG;
      return globalThis.DEBUG = "", t;
    }, enabled(t) {
      let e = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = e.some((i) => i === "" || i[0] === "-" ? false : t.match(RegExp(i.split("*").join(".*") + "$"))), n = e.some((i) => i === "" || i[0] !== "-" ? false : t.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: /* @__PURE__ */ __name((...t) => {
      let [e, r, ...n] = t;
      (console.warn ?? console.log)(`${e} ${r}`, ...n);
    }, "log"), formatters: {} };
    function bs(t) {
      let e = { color: Ln2[hs++ % Ln2.length], enabled: st.enabled(t), namespace: t, log: st.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a2 } = e;
        if (n.length !== 0 && Ft.push([o, ...n]), Ft.length > ys2 && Ft.shift(), st.enabled(o) || i) {
          let f = n.map((C) => typeof C == "string" ? C : ws(C)), h = `+${Date.now() - Fn}ms`;
          Fn = Date.now(), a2(o, ...f, h);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => e[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => e[i] = o, "set") });
    }
    __name(bs, "bs");
    var G2 = new Proxy(bs, { get: /* @__PURE__ */ __name((t, e) => st[e], "get"), set: /* @__PURE__ */ __name((t, e, r) => st[e] = r, "set") });
    function ws(t, e = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(t, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, e);
    }
    __name(ws, "ws");
    function Un3() {
      Ft.length = 0;
    }
    __name(Un3, "Un");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Dr = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Gs2 = Qn2();
    var Ir = Gs2.version;
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Be(t) {
      let e = Ws2();
      return e || (t?.config.engineType === "library" ? "library" : t?.config.engineType === "binary" ? "binary" : t?.config.engineType === "client" ? "client" : Ks(t));
    }
    __name(Be, "Be");
    function Ws2() {
      let t = g.env.PRISMA_CLIENT_ENGINE_TYPE;
      return t === "library" ? "library" : t === "binary" ? "binary" : t === "client" ? "client" : void 0;
    }
    __name(Ws2, "Ws");
    function Ks(t) {
      return t?.previewFeatures.includes("queryCompiler") ? "client" : "library";
    }
    __name(Ks, "Ks");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Mr(t) {
      return t.name === "DriverAdapterError" && typeof t.cause == "object";
    }
    __name(Mr, "Mr");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Nt(t) {
      return { ok: true, value: t, map(e) {
        return Nt(e(t));
      }, flatMap(e) {
        return e(t);
      } };
    }
    __name(Nt, "Nt");
    function Ie2(t) {
      return { ok: false, error: t, map() {
        return Ie2(t);
      }, flatMap() {
        return Ie2(t);
      } };
    }
    __name(Ie2, "Ie");
    var Jn = G2("driver-adapter-utils");
    var _r = class {
      static {
        __name(this, "_r");
      }
      registeredErrors = [];
      consumeError(e) {
        return this.registeredErrors[e];
      }
      registerNewError(e) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; ) r++;
        return this.registeredErrors[r] = { error: e }, r;
      }
    };
    var qt = /* @__PURE__ */ __name((t, e = new _r()) => {
      let r = { adapterName: t.adapterName, errorRegistry: e, queryRaw: we(e, t.queryRaw.bind(t)), executeRaw: we(e, t.executeRaw.bind(t)), executeScript: we(e, t.executeScript.bind(t)), dispose: we(e, t.dispose.bind(t)), provider: t.provider, startTransaction: /* @__PURE__ */ __name(async (...n) => (await we(e, t.startTransaction.bind(t))(...n)).map((o) => Hs(e, o)), "startTransaction") };
      return t.getConnectionInfo && (r.getConnectionInfo = zs2(e, t.getConnectionInfo.bind(t))), r;
    }, "qt");
    var Hs = /* @__PURE__ */ __name((t, e) => ({ adapterName: e.adapterName, provider: e.provider, options: e.options, queryRaw: we(t, e.queryRaw.bind(e)), executeRaw: we(t, e.executeRaw.bind(e)), commit: we(t, e.commit.bind(e)), rollback: we(t, e.rollback.bind(e)) }), "Hs");
    function we(t, e) {
      return async (...r) => {
        try {
          return Nt(await e(...r));
        } catch (n) {
          if (Jn("[error@wrapAsync]", n), Mr(n)) return Ie2(n.cause);
          let i = t.registerNewError(n);
          return Ie2({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(we, "we");
    function zs2(t, e) {
      return (...r) => {
        try {
          return Nt(e(...r));
        } catch (n) {
          if (Jn("[error@wrapSync]", n), Mr(n)) return Ie2(n.cause);
          let i = t.registerNewError(n);
          return Ie2({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(zs2, "zs");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Gn = "prisma+postgres";
    var Wn = `${Gn}:`;
    function Lr(t) {
      return t?.toString().startsWith(`${Wn}//`) ?? false;
    }
    __name(Lr, "Lr");
    var lt = {};
    nt2(lt, { error: /* @__PURE__ */ __name(() => Zs, "error"), info: /* @__PURE__ */ __name(() => Xs, "info"), log: /* @__PURE__ */ __name(() => Ys, "log"), query: /* @__PURE__ */ __name(() => ea, "query"), should: /* @__PURE__ */ __name(() => zn, "should"), tags: /* @__PURE__ */ __name(() => at, "tags"), warn: /* @__PURE__ */ __name(() => Fr, "warn") });
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var at = { error: qe("prisma:error"), warn: Dn2("prisma:warn"), info: Mn2("prisma:info"), query: In("prisma:query") };
    var zn = { warn: /* @__PURE__ */ __name(() => !g.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function Ys(...t) {
      console.log(...t);
    }
    __name(Ys, "Ys");
    function Fr(t, ...e) {
      zn.warn() && console.warn(`${at.warn} ${t}`, ...e);
    }
    __name(Fr, "Fr");
    function Xs(t, ...e) {
      console.info(`${at.info} ${t}`, ...e);
    }
    __name(Xs, "Xs");
    function Zs(t, ...e) {
      console.error(`${at.error} ${t}`, ...e);
    }
    __name(Zs, "Zs");
    function ea(t, ...e) {
      console.log(`${at.query} ${t}`, ...e);
    }
    __name(ea, "ea");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Bt2(t, e) {
      if (!t) throw new Error(`${e}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(Bt2, "Bt");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Me(t, e) {
      throw new Error(e);
    }
    __name(Me, "Me");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Ur(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    __name(Ur, "Ur");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Vt(t, e) {
      let r = {};
      for (let n of Object.keys(t)) r[n] = e(t[n], n);
      return r;
    }
    __name(Vt, "Vt");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Nr(t, e) {
      if (t.length === 0) return;
      let r = t[0];
      for (let n = 1; n < t.length; n++) e(r, t[n]) < 0 && (r = t[n]);
      return r;
    }
    __name(Nr, "Nr");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function re(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name(re, "re");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var ti = /* @__PURE__ */ new Set();
    var ut2 = /* @__PURE__ */ __name((t, e, ...r) => {
      ti.has(t) || (ti.add(t), Fr(e, ...r));
    }, "ut");
    var I = class t extends Error {
      static {
        __name(this, "t");
      }
      clientVersion;
      errorCode;
      retryable;
      constructor(e, r, n) {
        super(e), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(t);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    re(I, "PrismaClientInitializationError");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Z = class extends Error {
      static {
        __name(this, "Z");
      }
      code;
      meta;
      clientVersion;
      batchRequestIdx;
      constructor(e, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(e), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    re(Z, "PrismaClientKnownRequestError");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Ee = class extends Error {
      static {
        __name(this, "Ee");
      }
      clientVersion;
      constructor(e, r) {
        super(e), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    re(Ee, "PrismaClientRustPanicError");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Q = class extends Error {
      static {
        __name(this, "Q");
      }
      clientVersion;
      batchRequestIdx;
      constructor(e, { clientVersion: r, batchRequestIdx: n }) {
        super(e), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    re(Q, "PrismaClientUnknownRequestError");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var K = class extends Error {
      static {
        __name(this, "K");
      }
      name = "PrismaClientValidationError";
      clientVersion;
      constructor(e, { clientVersion: r }) {
        super(e), this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    re(K, "PrismaClientValidationError");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var me = class {
      static {
        __name(this, "me");
      }
      _map = /* @__PURE__ */ new Map();
      get(e) {
        return this._map.get(e)?.value;
      }
      set(e, r) {
        this._map.set(e, { value: r });
      }
      getOrCreate(e, r) {
        let n = this._map.get(e);
        if (n) return n.value;
        let i = r();
        return this.set(e, i), i;
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function ve(t) {
      return t.substring(0, 1).toLowerCase() + t.substring(1);
    }
    __name(ve, "ve");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function ni(t, e) {
      let r = {};
      for (let n of t) {
        let i = n[e];
        r[i] = n;
      }
      return r;
    }
    __name(ni, "ni");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function ct2(t) {
      let e;
      return { get() {
        return e || (e = { value: t() }), e.value;
      } };
    }
    __name(ct2, "ct");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function ii2(t) {
      return { models: qr(t.models), enums: qr(t.enums), types: qr(t.types) };
    }
    __name(ii2, "ii");
    function qr(t) {
      let e = {};
      for (let { name: r, ...n } of t) e[r] = n;
      return e;
    }
    __name(qr, "qr");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Ve(t) {
      return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
    }
    __name(Ve, "Ve");
    function jt(t) {
      return t.toString() !== "Invalid Date";
    }
    __name(jt, "jt");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    l();
    function je(t) {
      return v2.isDecimal(t) ? true : t !== null && typeof t == "object" && typeof t.s == "number" && typeof t.e == "number" && typeof t.toFixed == "function" && Array.isArray(t.d);
    }
    __name(je, "je");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var pt = {};
    nt2(pt, { ModelAction: /* @__PURE__ */ __name(() => mt2, "ModelAction"), datamodelEnumToSchemaEnum: /* @__PURE__ */ __name(() => ra, "datamodelEnumToSchemaEnum") });
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function ra(t) {
      return { name: t.name, values: t.values.map((e) => e.name) };
    }
    __name(ra, "ra");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var mt2 = ((F) => (F.findUnique = "findUnique", F.findUniqueOrThrow = "findUniqueOrThrow", F.findFirst = "findFirst", F.findFirstOrThrow = "findFirstOrThrow", F.findMany = "findMany", F.create = "create", F.createMany = "createMany", F.createManyAndReturn = "createManyAndReturn", F.update = "update", F.updateMany = "updateMany", F.updateManyAndReturn = "updateManyAndReturn", F.upsert = "upsert", F.delete = "delete", F.deleteMany = "deleteMany", F.groupBy = "groupBy", F.count = "count", F.aggregate = "aggregate", F.findRaw = "findRaw", F.aggregateRaw = "aggregateRaw", F))(mt2 || {});
    var na = it2(Hn());
    var ia = { red: qe, gray: _n, dim: Lt, bold: _t3, underline: On, highlightSource: /* @__PURE__ */ __name((t) => t.highlight(), "highlightSource") };
    var oa = { red: /* @__PURE__ */ __name((t) => t, "red"), gray: /* @__PURE__ */ __name((t) => t, "gray"), dim: /* @__PURE__ */ __name((t) => t, "dim"), bold: /* @__PURE__ */ __name((t) => t, "bold"), underline: /* @__PURE__ */ __name((t) => t, "underline"), highlightSource: /* @__PURE__ */ __name((t) => t, "highlightSource") };
    function sa({ message: t, originalMethod: e, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${e}()`, message: t, isPanic: r ?? false, callArguments: n };
    }
    __name(sa, "sa");
    function aa({ functionName: t, location: e, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a2 = [""], f = e ? " in" : ":";
      if (n ? (a2.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a2.push(s.red(`It occurred in the ${s.bold(`\`${t}\``)} invocation${f}`))) : a2.push(s.red(`Invalid ${s.bold(`\`${t}\``)} invocation${f}`)), e && a2.push(s.underline(la(e))), i) {
        a2.push("");
        let h = [i.toString()];
        o && (h.push(o), h.push(s.dim(")"))), a2.push(h.join("")), o && a2.push("");
      } else a2.push(""), o && a2.push(o), a2.push("");
      return a2.push(r), a2.join(`
`);
    }
    __name(aa, "aa");
    function la(t) {
      let e = [t.fileName];
      return t.lineNumber && e.push(String(t.lineNumber)), t.columnNumber && e.push(String(t.columnNumber)), e.join(":");
    }
    __name(la, "la");
    function $t(t) {
      let e = t.showColors ? ia : oa, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(t, e) : r = sa(t), aa(r, e);
    }
    __name($t, "$t");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var di = it2(Br());
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function li(t, e, r) {
      let n = ui(t), i = ua(n), o = ma2(i);
      o ? Qt(o, e, r) : e.addErrorMessage(() => "Unknown error");
    }
    __name(li, "li");
    function ui(t) {
      return t.errors.flatMap((e) => e.kind === "Union" ? ui(e) : [e]);
    }
    __name(ui, "ui");
    function ua(t) {
      let e = /* @__PURE__ */ new Map(), r = [];
      for (let n of t) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = e.get(i);
        o ? e.set(i, { ...n, argument: { ...n.argument, typeNames: ca(o.argument.typeNames, n.argument.typeNames) } }) : e.set(i, n);
      }
      return r.push(...e.values()), r;
    }
    __name(ua, "ua");
    function ca(t, e) {
      return [...new Set(t.concat(e))];
    }
    __name(ca, "ca");
    function ma2(t) {
      return Nr(t, (e, r) => {
        let n = si(e), i = si(r);
        return n !== i ? n - i : ai(e) - ai(r);
      });
    }
    __name(ma2, "ma");
    function si(t) {
      let e = 0;
      return Array.isArray(t.selectionPath) && (e += t.selectionPath.length), Array.isArray(t.argumentPath) && (e += t.argumentPath.length), e;
    }
    __name(si, "si");
    function ai(t) {
      switch (t.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(ai, "ai");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var ne = class {
      static {
        __name(this, "ne");
      }
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      isRequired = false;
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.addMarginSymbol(r(this.isRequired ? "+" : "?")), e.write(r(this.name)), this.isRequired || e.write(r("?")), e.write(r(": ")), typeof this.value == "string" ? e.write(r(this.value)) : e.write(this.value);
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    mi2();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var $e2 = class {
      static {
        __name(this, "$e");
      }
      constructor(e = 0, r) {
        this.context = r;
        this.currentIndent = e;
      }
      lines = [];
      currentLine = "";
      currentIndent = 0;
      marginSymbol;
      afterNextNewLineCallback;
      write(e) {
        return typeof e == "string" ? this.currentLine += e : e.write(this), this;
      }
      writeJoined(e, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(e);
        return this;
      }
      writeLine(e) {
        return this.write(e).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let e = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, e?.(), this;
      }
      withIndent(e) {
        return this.indent(), e(this), this.unindent(), this;
      }
      afterNextNewline(e) {
        return this.afterNextNewLineCallback = e, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(e) {
        return this.marginSymbol = e, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let e = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + e.slice(1) : e;
      }
    };
    ci();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Jt2 = class {
      static {
        __name(this, "Jt");
      }
      constructor(e) {
        this.value = e;
      }
      write(e) {
        e.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Gt = /* @__PURE__ */ __name((t) => t, "Gt");
    var Wt = { bold: Gt, red: Gt, green: Gt, dim: Gt, enabled: false };
    var pi = { bold: _t3, red: qe, green: kn3, dim: Lt, enabled: true };
    var Qe = { write(t) {
      t.writeLine(",");
    } };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var pe = class {
      static {
        __name(this, "pe");
      }
      constructor(e) {
        this.contents = e;
      }
      isUnderlined = false;
      color = /* @__PURE__ */ __name((e) => e, "color");
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(e) {
        return this.color = e, this;
      }
      write(e) {
        let r = e.getCurrentLineLength();
        e.write(this.color(this.contents)), this.isUnderlined && e.afterNextNewline(() => {
          e.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Te = class {
      static {
        __name(this, "Te");
      }
      hasError = false;
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Je2 = class extends Te {
      static {
        __name(this, "Je");
      }
      items = [];
      addItem(e) {
        return this.items.push(new Jt2(e)), this;
      }
      getField(e) {
        return this.items[e];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((r) => r.value.getPrintWidth())) + 2;
      }
      write(e) {
        if (this.items.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithItems(e);
      }
      writeEmpty(e) {
        let r = new pe("[]");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithItems(e) {
        let { colors: r } = e.context;
        e.writeLine("[").withIndent(() => e.writeJoined(Qe, this.items).newLine()).write("]"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(r.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var Ge2 = class t extends Te {
      static {
        __name(this, "t");
      }
      fields = {};
      suggestions = [];
      addField(e) {
        this.fields[e.name] = e;
      }
      addSuggestion(e) {
        this.suggestions.push(e);
      }
      getField(e) {
        return this.fields[e];
      }
      getDeepField(e) {
        let [r, ...n] = e, i = this.getField(r);
        if (!i) return;
        let o = i;
        for (let s of n) {
          let a2;
          if (o.value instanceof t ? a2 = o.value.getField(s) : o.value instanceof Je2 && (a2 = o.value.getField(Number(s))), !a2) return;
          o = a2;
        }
        return o;
      }
      getDeepFieldValue(e) {
        return e.length === 0 ? this : this.getDeepField(e)?.value;
      }
      hasField(e) {
        return !!this.getField(e);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(e) {
        delete this.fields[e];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(e) {
        return this.getField(e)?.value;
      }
      getDeepSubSelectionValue(e) {
        let r = this;
        for (let n of e) {
          if (!(r instanceof t)) return;
          let i = r.getSubSelectionValue(n);
          if (!i) return;
          r = i;
        }
        return r;
      }
      getDeepSelectionParent(e) {
        let r = this.getSelectionParent();
        if (!r) return;
        let n = r;
        for (let i of e) {
          let o = n.value.getFieldValue(i);
          if (!o || !(o instanceof t)) return;
          let s = o.getSelectionParent();
          if (!s) return;
          n = s;
        }
        return n;
      }
      getSelectionParent() {
        let e = this.getField("select")?.value.asObject();
        if (e) return { kind: "select", value: e };
        let r = this.getField("include")?.value.asObject();
        if (r) return { kind: "include", value: r };
      }
      getSubSelectionValue(e) {
        return this.getSelectionParent()?.value.fields[e].value;
      }
      getPrintWidth() {
        let e = Object.values(this.fields);
        return e.length == 0 ? 2 : Math.max(...e.map((n) => n.getPrintWidth())) + 2;
      }
      write(e) {
        let r = Object.values(this.fields);
        if (r.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithContents(e, r);
      }
      asObject() {
        return this;
      }
      writeEmpty(e) {
        let r = new pe("{}");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithContents(e, r) {
        e.writeLine("{").withIndent(() => {
          e.writeJoined(Qe, [...r, ...this.suggestions]).newLine();
        }), e.write("}"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(e.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var W = class extends Te {
      static {
        __name(this, "W");
      }
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new pe(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var dt = class {
      static {
        __name(this, "dt");
      }
      fields = [];
      addField(e, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${e}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.writeLine(r("{")).withIndent(() => {
          e.writeJoined(Qe, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function Qt(t, e, r) {
      switch (t.kind) {
        case "MutuallyExclusiveFields":
          pa2(t, e);
          break;
        case "IncludeOnScalar":
          da2(t, e);
          break;
        case "EmptySelection":
          fa(t, e, r);
          break;
        case "UnknownSelectionField":
          ba2(t, e);
          break;
        case "InvalidSelectionValue":
          wa2(t, e);
          break;
        case "UnknownArgument":
          Ea2(t, e);
          break;
        case "UnknownInputField":
          xa2(t, e);
          break;
        case "RequiredArgumentMissing":
          Pa(t, e);
          break;
        case "InvalidArgumentType":
          va2(t, e);
          break;
        case "InvalidArgumentValue":
          Ta(t, e);
          break;
        case "ValueTooLarge":
          Ca(t, e);
          break;
        case "SomeFieldsMissing":
          Aa2(t, e);
          break;
        case "TooManyFieldsGiven":
          Ra(t, e);
          break;
        case "Union":
          li(t, e, r);
          break;
        default:
          throw new Error("not implemented: " + t.kind);
      }
    }
    __name(Qt, "Qt");
    function pa2(t, e) {
      let r = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      r && (r.getField(t.firstField)?.markAsError(), r.getField(t.secondField)?.markAsError()), e.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${t.firstField}\``)} or ${n.green(`\`${t.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(pa2, "pa");
    function da2(t, e) {
      let [r, n] = We(t.selectionPath), i = t.outputType, o = e.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new ne(s.name, "true"));
      e.addErrorMessage((s) => {
        let a2 = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a2 += ` on model ${s.bold(i.name)}. ${ft(s)}` : a2 += ".", a2 += `
Note that ${s.bold("include")} statements only accept relation fields.`, a2;
      });
    }
    __name(da2, "da");
    function fa(t, e, r) {
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          ga2(t, e, i);
          return;
        }
        if (n.hasField("select")) {
          ya2(t, e);
          return;
        }
      }
      if (r?.[ve(t.outputType.name)]) {
        ha2(t, e);
        return;
      }
      e.addErrorMessage(() => `Unknown field at "${t.selectionPath.join(".")} selection"`);
    }
    __name(fa, "fa");
    function ga2(t, e, r) {
      r.removeAllFields();
      for (let n of t.outputType.fields) r.addSuggestion(new ne(n.name, "false"));
      e.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(ga2, "ga");
    function ya2(t, e) {
      let r = t.outputType, n = e.arguments.getDeepSelectionParent(t.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), yi2(n, r)), e.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${ft(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(ya2, "ya");
    function ha2(t, e) {
      let r = new dt();
      for (let i of t.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new ne("omit", r).makeRequired();
      if (t.selectionPath.length === 0) e.arguments.addSuggestion(n);
      else {
        let [i, o] = We(t.selectionPath), a2 = e.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a2) {
          let f = a2?.value.asObject() ?? new Ge2();
          f.addSuggestion(n), a2.value = f;
        }
      }
      e.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(ha2, "ha");
    function ba2(t, e) {
      let r = hi(t.selectionPath, e);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            yi2(n, t.outputType);
            break;
          case "include":
            Sa2(n, t.outputType);
            break;
          case "omit":
            Oa(n, t.outputType);
            break;
        }
      }
      e.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${t.outputType.name}\``)}.`), i.push(ft(n)), i.join(" ");
      });
    }
    __name(ba2, "ba");
    function wa2(t, e) {
      let r = hi(t.selectionPath, e);
      r.parentKind !== "unknown" && r.field.value.markAsError(), e.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${t.underlyingError}`);
    }
    __name(wa2, "wa");
    function Ea2(t, e) {
      let r = t.argumentPath[0], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), ka(n, t.arguments)), e.addErrorMessage((i) => fi(i, r, t.arguments.map((o) => o.name)));
    }
    __name(Ea2, "Ea");
    function xa2(t, e) {
      let [r, n] = We(t.argumentPath), i = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(t.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && bi2(o, t.inputType);
      }
      e.addErrorMessage((o) => fi(o, n, t.inputType.fields.map((s) => s.name)));
    }
    __name(xa2, "xa");
    function fi(t, e, r) {
      let n = [`Unknown argument \`${t.red(e)}\`.`], i = Ia(e, r);
      return i && n.push(`Did you mean \`${t.green(i)}\`?`), r.length > 0 && n.push(ft(t)), n.join(" ");
    }
    __name(fi, "fi");
    function Pa(t, e) {
      let r;
      e.addErrorMessage((f) => r?.value instanceof W && r.value.text === "null" ? `Argument \`${f.green(o)}\` must not be ${f.red("null")}.` : `Argument \`${f.green(o)}\` is missing.`);
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = We(t.argumentPath), s = new dt(), a2 = n.getDeepFieldValue(i)?.asObject();
      if (a2) {
        if (r = a2.getField(o), r && a2.removeField(o), t.inputTypes.length === 1 && t.inputTypes[0].kind === "object") {
          for (let f of t.inputTypes[0].fields) s.addField(f.name, f.typeNames.join(" | "));
          a2.addSuggestion(new ne(o, s).makeRequired());
        } else {
          let f = t.inputTypes.map(gi2).join(" | ");
          a2.addSuggestion(new ne(o, f).makeRequired());
        }
        if (t.dependentArgumentPath) {
          n.getDeepField(t.dependentArgumentPath)?.markAsError();
          let [, f] = We(t.dependentArgumentPath);
          e.addErrorMessage((h) => `Argument \`${h.green(o)}\` is required because argument \`${h.green(f)}\` was provided.`);
        }
      }
    }
    __name(Pa, "Pa");
    function gi2(t) {
      return t.kind === "list" ? `${gi2(t.elementType)}[]` : t.name;
    }
    __name(gi2, "gi");
    function va2(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = Kt("or", t.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(t.inferredType)}.`;
      });
    }
    __name(va2, "va");
    function Ta(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (t.underlyingError && o.push(`: ${t.underlyingError}`), o.push("."), t.argument.typeNames.length > 0) {
          let s = Kt("or", t.argument.typeNames.map((a2) => i.green(a2)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(Ta, "Ta");
    function Ca(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(t.argumentPath)?.value;
        s?.markAsError(), s instanceof W && (i = s.text);
      }
      e.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(Ca, "Ca");
    function Aa2(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(t.argumentPath)?.asObject();
        i && bi2(i, t.inputType);
      }
      e.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 ? t.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Kt("or", t.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${t.constraints.minFieldCount}`)} arguments.`), o.push(ft(i)), o.join(" ");
      });
    }
    __name(Aa2, "Aa");
    function Ra(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(t.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      e.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 && t.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : t.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${t.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Kt("and", i.map((a2) => o.red(a2)))}. Please choose`), t.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${t.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(Ra, "Ra");
    function yi2(t, e) {
      for (let r of e.fields) t.hasField(r.name) || t.addSuggestion(new ne(r.name, "true"));
    }
    __name(yi2, "yi");
    function Sa2(t, e) {
      for (let r of e.fields) r.isRelation && !t.hasField(r.name) && t.addSuggestion(new ne(r.name, "true"));
    }
    __name(Sa2, "Sa");
    function Oa(t, e) {
      for (let r of e.fields) !t.hasField(r.name) && !r.isRelation && t.addSuggestion(new ne(r.name, "true"));
    }
    __name(Oa, "Oa");
    function ka(t, e) {
      for (let r of e) t.hasField(r.name) || t.addSuggestion(new ne(r.name, r.typeNames.join(" | ")));
    }
    __name(ka, "ka");
    function hi(t, e) {
      let [r, n] = We(t), i = e.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a2 = i.getFieldValue("omit")?.asObject(), f = o?.getField(n);
      return o && f ? { parentKind: "select", parent: o, field: f, fieldName: n } : (f = s?.getField(n), s && f ? { parentKind: "include", field: f, parent: s, fieldName: n } : (f = a2?.getField(n), a2 && f ? { parentKind: "omit", field: f, parent: a2, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(hi, "hi");
    function bi2(t, e) {
      if (e.kind === "object") for (let r of e.fields) t.hasField(r.name) || t.addSuggestion(new ne(r.name, r.typeNames.join(" | ")));
    }
    __name(bi2, "bi");
    function We(t) {
      let e = [...t], r = e.pop();
      if (!r) throw new Error("unexpected empty path");
      return [e, r];
    }
    __name(We, "We");
    function ft({ green: t, enabled: e }) {
      return "Available options are " + (e ? `listed in ${t("green")}` : "marked with ?") + ".";
    }
    __name(ft, "ft");
    function Kt(t, e) {
      if (e.length === 1) return e[0];
      let r = [...e], n = r.pop();
      return `${r.join(", ")} ${t} ${n}`;
    }
    __name(Kt, "Kt");
    var Da = 3;
    function Ia(t, e) {
      let r = 1 / 0, n;
      for (let i of e) {
        let o = (0, di.default)(t, i);
        o > Da || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(Ia, "Ia");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var gt3 = class {
      static {
        __name(this, "gt");
      }
      modelName;
      name;
      typeName;
      isList;
      isEnum;
      constructor(e, r, n, i, o) {
        this.modelName = e, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let e = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${e}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function Ke(t) {
      return t instanceof gt3;
    }
    __name(Ke, "Ke");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Ht = Symbol();
    var jr = /* @__PURE__ */ new WeakMap();
    var xe = class {
      static {
        __name(this, "xe");
      }
      constructor(e) {
        e === Ht ? jr.set(this, `Prisma.${this._getName()}`) : jr.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return jr.get(this);
      }
    };
    var yt2 = class extends xe {
      static {
        __name(this, "yt");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var ht = class extends yt2 {
      static {
        __name(this, "ht");
      }
      #e;
    };
    $r(ht, "DbNull");
    var bt2 = class extends yt2 {
      static {
        __name(this, "bt");
      }
      #e;
    };
    $r(bt2, "JsonNull");
    var wt2 = class extends yt2 {
      static {
        __name(this, "wt");
      }
      #e;
    };
    $r(wt2, "AnyNull");
    var zt = { classes: { DbNull: ht, JsonNull: bt2, AnyNull: wt2 }, instances: { DbNull: new ht(Ht), JsonNull: new bt2(Ht), AnyNull: new wt2(Ht) } };
    function $r(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name($r, "$r");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var wi2 = ": ";
    var Yt2 = class {
      static {
        __name(this, "Yt");
      }
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      hasError = false;
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + wi2.length;
      }
      write(e) {
        let r = new pe(this.name);
        this.hasError && r.underline().setColor(e.context.colors.red), e.write(r).write(wi2).write(this.value);
      }
    };
    var Qr = class {
      static {
        __name(this, "Qr");
      }
      arguments;
      errorMessages = [];
      constructor(e) {
        this.arguments = e;
      }
      write(e) {
        e.write(this.arguments);
      }
      addErrorMessage(e) {
        this.errorMessages.push(e);
      }
      renderAllMessages(e) {
        return this.errorMessages.map((r) => r(e)).join(`
`);
      }
    };
    function He2(t) {
      return new Qr(Ei2(t));
    }
    __name(He2, "He");
    function Ei2(t) {
      let e = new Ge2();
      for (let [r, n] of Object.entries(t)) {
        let i = new Yt2(r, xi2(n));
        e.addField(i);
      }
      return e;
    }
    __name(Ei2, "Ei");
    function xi2(t) {
      if (typeof t == "string") return new W(JSON.stringify(t));
      if (typeof t == "number" || typeof t == "boolean") return new W(String(t));
      if (typeof t == "bigint") return new W(`${t}n`);
      if (t === null) return new W("null");
      if (t === void 0) return new W("undefined");
      if (je(t)) return new W(`new Prisma.Decimal("${t.toFixed()}")`);
      if (t instanceof Uint8Array) return b2.isBuffer(t) ? new W(`Buffer.alloc(${t.byteLength})`) : new W(`new Uint8Array(${t.byteLength})`);
      if (t instanceof Date) {
        let e = jt(t) ? t.toISOString() : "Invalid Date";
        return new W(`new Date("${e}")`);
      }
      return t instanceof xe ? new W(`Prisma.${t._getName()}`) : Ke(t) ? new W(`prisma.${ve(t.modelName)}.$fields.${t.name}`) : Array.isArray(t) ? Ma(t) : typeof t == "object" ? Ei2(t) : new W(Object.prototype.toString.call(t));
    }
    __name(xi2, "xi");
    function Ma(t) {
      let e = new Je2();
      for (let r of t) e.addItem(xi2(r));
      return e;
    }
    __name(Ma, "Ma");
    function Xt3(t, e) {
      let r = e === "pretty" ? pi : Wt, n = t.renderAllMessages(r), i = new $e2(0, { colors: r }).write(t).toString();
      return { message: n, args: i };
    }
    __name(Xt3, "Xt");
    function Zt2({ args: t, errors: e, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a2 = He2(t);
      for (let A of e) Qt(A, a2, s);
      let { message: f, args: h } = Xt3(a2, r), C = $t({ message: f, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: h });
      throw new K(C, { clientVersion: o });
    }
    __name(Zt2, "Zt");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function de(t) {
      return t.replace(/^./, (e) => e.toLowerCase());
    }
    __name(de, "de");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function vi2(t, e, r) {
      let n = de(r);
      return !e.result || !(e.result.$allModels || e.result[n]) ? t : _a({ ...t, ...Pi(e.name, t, e.result.$allModels), ...Pi(e.name, t, e.result[n]) });
    }
    __name(vi2, "vi");
    function _a(t) {
      let e = new me(), r = /* @__PURE__ */ __name((n, i) => e.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), t[n] ? t[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return Vt(t, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(_a, "_a");
    function Pi(t, e, r) {
      return r ? Vt(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: La(e, o, i) })) : {};
    }
    __name(Pi, "Pi");
    function La(t, e, r) {
      let n = t?.[e]?.compute;
      return n ? (i) => r({ ...i, [e]: n(i) }) : r;
    }
    __name(La, "La");
    function Ti2(t, e) {
      if (!e) return t;
      let r = { ...t };
      for (let n of Object.values(e)) if (t[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(Ti2, "Ti");
    function Ci(t, e) {
      if (!e) return t;
      let r = { ...t };
      for (let n of Object.values(e)) if (!t[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(Ci, "Ci");
    var er = class {
      static {
        __name(this, "er");
      }
      constructor(e, r) {
        this.extension = e;
        this.previous = r;
      }
      computedFieldsCache = new me();
      modelExtensionsCache = new me();
      queryCallbacksCache = new me();
      clientExtensions = ct2(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
      batchCallbacks = ct2(() => {
        let e = this.previous?.getAllBatchQueryCallbacks() ?? [], r = this.extension.query?.$__internalBatch;
        return r ? e.concat(r) : e;
      });
      getAllComputedFields(e) {
        return this.computedFieldsCache.getOrCreate(e, () => vi2(this.previous?.getAllComputedFields(e), this.extension, e));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(e) {
        return this.modelExtensionsCache.getOrCreate(e, () => {
          let r = de(e);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(e) : { ...this.previous?.getAllModelExtensions(e), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(e, r) {
        return this.queryCallbacksCache.getOrCreate(`${e}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(e, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[e] || o.$allModels || o[r] || o.$allOperations) ? n : (o[e] !== void 0 && (o[e][r] !== void 0 && i.push(o[e][r]), o[e].$allOperations !== void 0 && i.push(o[e].$allOperations)), e !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var ze = class t {
      static {
        __name(this, "t");
      }
      constructor(e) {
        this.head = e;
      }
      static empty() {
        return new t();
      }
      static single(e) {
        return new t(new er(e));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(e) {
        return new t(new er(e, this.head));
      }
      getAllComputedFields(e) {
        return this.head?.getAllComputedFields(e);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(e) {
        return this.head?.getAllModelExtensions(e);
      }
      getAllQueryCallbacks(e, r) {
        return this.head?.getAllQueryCallbacks(e, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var tr2 = class {
      static {
        __name(this, "tr");
      }
      constructor(e) {
        this.name = e;
      }
    };
    function Ai(t) {
      return t instanceof tr2;
    }
    __name(Ai, "Ai");
    function Ri(t) {
      return new tr2(t);
    }
    __name(Ri, "Ri");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Si2 = Symbol();
    var Et = class {
      static {
        __name(this, "Et");
      }
      constructor(e) {
        if (e !== Si2) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(e) {
        return e === void 0 ? rr2 : e;
      }
    };
    var rr2 = new Et(Si2);
    function fe(t) {
      return t instanceof Et;
    }
    __name(fe, "fe");
    var Fa = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var Oi = "explicitly `undefined` values are not allowed";
    function nr({ modelName: t, action: e, args: r, runtimeDataModel: n, extensions: i = ze.empty(), callsite: o, clientMethod: s, errorFormat: a2, clientVersion: f, previewFeatures: h, globalOmit: C }) {
      let A = new Jr({ runtimeDataModel: n, modelName: t, action: e, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a2, clientVersion: f, previewFeatures: h, globalOmit: C });
      return { modelName: t, action: Fa[e], query: xt(r, A) };
    }
    __name(nr, "nr");
    function xt({ select: t, include: e, ...r } = {}, n) {
      let i = r.omit;
      return delete r.omit, { arguments: Di(r, n), selection: Ua(t, e, i, n) };
    }
    __name(xt, "xt");
    function Ua(t, e, r, n) {
      return t ? (e ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Va(t, n)) : Na(n, e, r);
    }
    __name(Ua, "Ua");
    function Na(t, e, r) {
      let n = {};
      return t.modelOrType && !t.isRawAction() && (n.$composites = true, n.$scalars = true), e && qa(n, e, t), Ba(n, r, t), n;
    }
    __name(Na, "Na");
    function qa(t, e, r) {
      for (let [n, i] of Object.entries(e)) {
        if (fe(i)) continue;
        let o = r.nestSelection(n);
        if (Gr(i, o), i === false || i === void 0) {
          t[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          t[n] = xt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          t[n] = true;
          continue;
        }
        t[n] = xt(i, o);
      }
    }
    __name(qa, "qa");
    function Ba(t, e, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...e }, o = Ci(i, n);
      for (let [s, a2] of Object.entries(o)) {
        if (fe(a2)) continue;
        Gr(a2, r.nestSelection(s));
        let f = r.findField(s);
        n?.[s] && !f || (t[s] = !a2);
      }
    }
    __name(Ba, "Ba");
    function Va(t, e) {
      let r = {}, n = e.getComputedFields(), i = Ti2(t, n);
      for (let [o, s] of Object.entries(i)) {
        if (fe(s)) continue;
        let a2 = e.nestSelection(o);
        Gr(s, a2);
        let f = e.findField(o);
        if (!(n?.[o] && !f)) {
          if (s === false || s === void 0 || fe(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            f?.kind === "object" ? r[o] = xt({}, a2) : r[o] = true;
            continue;
          }
          r[o] = xt(s, a2);
        }
      }
      return r;
    }
    __name(Va, "Va");
    function ki(t, e) {
      if (t === null) return null;
      if (typeof t == "string" || typeof t == "number" || typeof t == "boolean") return t;
      if (typeof t == "bigint") return { $type: "BigInt", value: String(t) };
      if (Ve(t)) {
        if (jt(t)) return { $type: "DateTime", value: t.toISOString() };
        e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (Ai(t)) return { $type: "Param", value: t.name };
      if (Ke(t)) return { $type: "FieldRef", value: { _ref: t.name, _container: t.modelName } };
      if (Array.isArray(t)) return ja(t, e);
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { $type: "Bytes", value: b2.from(r, n, i).toString("base64") };
      }
      if ($a(t)) return t.values;
      if (je(t)) return { $type: "Decimal", value: t.toFixed() };
      if (t instanceof xe) {
        if (t !== zt.instances[t._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: t._getName() };
      }
      if (Qa(t)) return t.toJSON();
      if (typeof t == "object") return Di(t, e);
      e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(t)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(ki, "ki");
    function Di(t, e) {
      if (t.$type) return { $type: "Raw", value: t };
      let r = {};
      for (let n in t) {
        let i = t[n], o = e.nestArgument(n);
        fe(i) || (i !== void 0 ? r[n] = ki(i, o) : e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: e.getSelectionPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: Oi }));
      }
      return r;
    }
    __name(Di, "Di");
    function ja(t, e) {
      let r = [];
      for (let n = 0; n < t.length; n++) {
        let i = e.nestArgument(String(n)), o = t[n];
        if (o === void 0 || fe(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${e.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(ki(o, i));
      }
      return r;
    }
    __name(ja, "ja");
    function $a(t) {
      return typeof t == "object" && t !== null && t.__prismaRawParameters__ === true;
    }
    __name($a, "$a");
    function Qa(t) {
      return typeof t == "object" && t !== null && typeof t.toJSON == "function";
    }
    __name(Qa, "Qa");
    function Gr(t, e) {
      t === void 0 && e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: e.getSelectionPath(), underlyingError: Oi });
    }
    __name(Gr, "Gr");
    var Jr = class t {
      static {
        __name(this, "t");
      }
      constructor(e) {
        this.params = e;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      modelOrType;
      throwValidationError(e) {
        Zt2({ errors: [e], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((e) => ({ name: e.name, typeName: "boolean", isRelation: e.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(e) {
        return this.params.previewFeatures.includes(e);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(e) {
        return this.modelOrType?.fields.find((r) => r.name === e);
      }
      nestSelection(e) {
        let r = this.findField(e), n = r?.kind === "object" ? r.type : void 0;
        return new t({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(e) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[ve(this.params.modelName)] ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "updateManyAndReturn":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            Me(this.params.action, "Unknown action");
        }
      }
      nestArgument(e) {
        return new t({ ...this.params, argumentPath: this.params.argumentPath.concat(e) });
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Ii(t) {
      if (!t._hasPreviewFlag("metrics")) throw new K("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: t._clientVersion });
    }
    __name(Ii, "Ii");
    var Ye = class {
      static {
        __name(this, "Ye");
      }
      _client;
      constructor(e) {
        this._client = e;
      }
      prometheus(e) {
        return Ii(this._client), this._client._engine.metrics({ format: "prometheus", ...e });
      }
      json(e) {
        return Ii(this._client), this._client._engine.metrics({ format: "json", ...e });
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Mi2(t, e) {
      let r = ct2(() => Ja(e));
      Object.defineProperty(t, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(Mi2, "Mi");
    function Ja(t) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(Ja, "Ja");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Kr = /* @__PURE__ */ new WeakMap();
    var ir = "$$PrismaTypedSql";
    var Pt = class {
      static {
        __name(this, "Pt");
      }
      constructor(e, r) {
        Kr.set(this, { sql: e, values: r }), Object.defineProperty(this, ir, { value: ir });
      }
      get sql() {
        return Kr.get(this).sql;
      }
      get values() {
        return Kr.get(this).values;
      }
    };
    function _i(t) {
      return (...e) => new Pt(t, e);
    }
    __name(_i, "_i");
    function or(t) {
      return t != null && t[ir] === ir;
    }
    __name(or, "or");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Wo = it2(Li());
    u();
    c();
    m2();
    p2();
    d2();
    l();
    Fi2();
    qn();
    $n();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var ee = class t {
      static {
        __name(this, "t");
      }
      constructor(e, r) {
        if (e.length - 1 !== r.length) throw e.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${e.length} strings to have ${e.length - 1} values`);
        let n = r.reduce((s, a2) => s + (a2 instanceof t ? a2.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = e[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a2 = e[i];
          if (s instanceof t) {
            this.strings[o] += s.strings[0];
            let f = 0;
            for (; f < s.values.length; ) this.values[o++] = s.values[f++], this.strings[o] = s.strings[f];
            this.strings[o] += a2;
          } else this.values[o++] = s, this.strings[o] = a2;
        }
      }
      get sql() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    };
    function Ui(t, e = ",", r = "", n = "") {
      if (t.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new ee([r, ...Array(t.length - 1).fill(e), n], t);
    }
    __name(Ui, "Ui");
    function Hr(t) {
      return new ee([t], []);
    }
    __name(Hr, "Hr");
    var Ni = Hr("");
    function zr(t, ...e) {
      return new ee(t, e);
    }
    __name(zr, "zr");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function vt(t) {
      return { getKeys() {
        return Object.keys(t);
      }, getPropertyValue(e) {
        return t[e];
      } };
    }
    __name(vt, "vt");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function H(t, e) {
      return { getKeys() {
        return [t];
      }, getPropertyValue() {
        return e();
      } };
    }
    __name(H, "H");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function _e(t) {
      let e = new me();
      return { getKeys() {
        return t.getKeys();
      }, getPropertyValue(r) {
        return e.getOrCreate(r, () => t.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return t.getPropertyDescriptor?.(r);
      } };
    }
    __name(_e, "_e");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var ar = { enumerable: true, configurable: true, writable: true };
    function lr2(t) {
      let e = new Set(t);
      return { getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf"), getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => ar, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => e.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => e.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...e], "ownKeys") };
    }
    __name(lr2, "lr");
    var qi = Symbol.for("nodejs.util.inspect.custom");
    function ae(t, e) {
      let r = Wa(e), n = /* @__PURE__ */ new Set(), i = new Proxy(t, { get(o, s) {
        if (n.has(s)) return o[s];
        let a2 = r.get(s);
        return a2 ? a2.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a2 = r.get(s);
        return a2 ? a2.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = Bi2(Reflect.ownKeys(o), r), a2 = Bi2(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a2, ...n])];
      }, set(o, s, a2) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a2));
      }, getOwnPropertyDescriptor(o, s) {
        let a2 = Reflect.getOwnPropertyDescriptor(o, s);
        if (a2 && !a2.configurable) return a2;
        let f = r.get(s);
        return f ? f.getPropertyDescriptor ? { ...ar, ...f?.getPropertyDescriptor(s) } : ar : a2;
      }, defineProperty(o, s, a2) {
        return n.add(s), Reflect.defineProperty(o, s, a2);
      }, getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf") });
      return i[qi] = function() {
        let o = { ...this };
        return delete o[qi], o;
      }, i;
    }
    __name(ae, "ae");
    function Wa(t) {
      let e = /* @__PURE__ */ new Map();
      for (let r of t) {
        let n = r.getKeys();
        for (let i of n) e.set(i, r);
      }
      return e;
    }
    __name(Wa, "Wa");
    function Bi2(t, e) {
      return t.filter((r) => e.get(r)?.has?.(r) ?? true);
    }
    __name(Bi2, "Bi");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Xe2(t) {
      return { getKeys() {
        return t;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(Xe2, "Xe");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function ur(t, e) {
      return { batch: t, transaction: e?.kind === "batch" ? { isolationLevel: e.options.isolationLevel } : void 0 };
    }
    __name(ur, "ur");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Vi(t) {
      if (t === void 0) return "";
      let e = He2(t);
      return new $e2(0, { colors: Wt }).write(e).toString();
    }
    __name(Vi, "Vi");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Ka = "P2037";
    function cr({ error: t, user_facing_error: e }, r, n) {
      return e.error_code ? new Z(Ha(e, n), { code: e.error_code, clientVersion: r, meta: e.meta, batchRequestIdx: e.batch_request_idx }) : new Q(t, { clientVersion: r, batchRequestIdx: e.batch_request_idx });
    }
    __name(cr, "cr");
    function Ha(t, e) {
      let r = t.message;
      return (e === "postgresql" || e === "postgres" || e === "mysql") && t.error_code === Ka && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(Ha, "Ha");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Yr = class {
      static {
        __name(this, "Yr");
      }
      getLocation() {
        return null;
      }
    };
    function Ce2(t) {
      return typeof $EnabledCallSite == "function" && t !== "minimal" ? new $EnabledCallSite() : new Yr();
    }
    __name(Ce2, "Ce");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var ji = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function Ze(t = {}) {
      let e = Ya(t);
      return Object.entries(e).reduce((n, [i, o]) => (ji[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(Ze, "Ze");
    function Ya(t = {}) {
      return typeof t._count == "boolean" ? { ...t, _count: { _all: t._count } } : t;
    }
    __name(Ya, "Ya");
    function mr2(t = {}) {
      return (e) => (typeof t._count == "boolean" && (e._count = e._count._all), e);
    }
    __name(mr2, "mr");
    function $i(t, e) {
      let r = mr2(t);
      return e({ action: "aggregate", unpacker: r, argsMapper: Ze })(t);
    }
    __name($i, "$i");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Xa(t = {}) {
      let { select: e, ...r } = t;
      return typeof e == "object" ? Ze({ ...r, _count: e }) : Ze({ ...r, _count: { _all: true } });
    }
    __name(Xa, "Xa");
    function Za(t = {}) {
      return typeof t.select == "object" ? (e) => mr2(t)(e)._count : (e) => mr2(t)(e)._count._all;
    }
    __name(Za, "Za");
    function Qi(t, e) {
      return e({ action: "count", unpacker: Za(t), argsMapper: Xa })(t);
    }
    __name(Qi, "Qi");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function el(t = {}) {
      let e = Ze(t);
      if (Array.isArray(e.by)) for (let r of e.by) typeof r == "string" && (e.select[r] = true);
      else typeof e.by == "string" && (e.select[e.by] = true);
      return e;
    }
    __name(el, "el");
    function tl(t = {}) {
      return (e) => (typeof t?._count == "boolean" && e.forEach((r) => {
        r._count = r._count._all;
      }), e);
    }
    __name(tl, "tl");
    function Ji(t, e) {
      return e({ action: "groupBy", unpacker: tl(t), argsMapper: el })(t);
    }
    __name(Ji, "Ji");
    function Gi(t, e, r) {
      if (e === "aggregate") return (n) => $i(n, r);
      if (e === "count") return (n) => Qi(n, r);
      if (e === "groupBy") return (n) => Ji(n, r);
    }
    __name(Gi, "Gi");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Wi2(t, e) {
      let r = e.fields.filter((i) => !i.relationName), n = ni(r, "name");
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new gt3(t, o, s.type, s.isList, s.kind === "enum");
      }, ...lr2(Object.keys(n)) });
    }
    __name(Wi2, "Wi");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Ki2 = /* @__PURE__ */ __name((t) => Array.isArray(t) ? t : t.split("."), "Ki");
    var Xr = /* @__PURE__ */ __name((t, e) => Ki2(e).reduce((r, n) => r && r[n], t), "Xr");
    var Hi2 = /* @__PURE__ */ __name((t, e, r) => Ki2(e).reduceRight((n, i, o, s) => Object.assign({}, Xr(t, s.slice(0, o)), { [i]: n }), r), "Hi");
    function rl(t, e) {
      return t === void 0 || e === void 0 ? [] : [...e, "select", t];
    }
    __name(rl, "rl");
    function nl(t, e, r) {
      return e === void 0 ? t ?? {} : Hi2(e, r, t || true);
    }
    __name(nl, "nl");
    function Zr(t, e, r, n, i, o) {
      let a2 = t._runtimeDataModel.models[e].fields.reduce((f, h) => ({ ...f, [h.name]: h }), {});
      return (f) => {
        let h = Ce2(t._errorFormat), C = rl(n, i), A = nl(f, o, C), k = r({ dataPath: C, callsite: h })(A), R = il(t, e);
        return new Proxy(k, { get(_, O2) {
          if (!R.includes(O2)) return _[O2];
          let ye = [a2[O2].type, r, O2], z = [C, A];
          return Zr(t, ...ye, ...z);
        }, ...lr2([...R, ...Object.getOwnPropertyNames(k)]) });
      };
    }
    __name(Zr, "Zr");
    function il(t, e) {
      return t._runtimeDataModel.models[e].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(il, "il");
    var ol2 = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var sl = ["aggregate", "count", "groupBy"];
    function en(t, e) {
      let r = t._extensions.getAllModelExtensions(e) ?? {}, n = [al(t, e), ul(t, e), vt(r), H("name", () => e), H("$name", () => e), H("$parent", () => t._appliedParent)];
      return ae({}, n);
    }
    __name(en, "en");
    function al(t, e) {
      let r = de(e), n = Object.keys(mt2).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((a2) => (f) => {
          let h = Ce2(t._errorFormat);
          return t._createPrismaPromise((C) => {
            let A = { args: f, dataPath: [], action: o, model: e, clientMethod: `${r}.${i}`, jsModelName: r, transaction: C, callsite: h };
            return t._request({ ...A, ...a2 });
          }, { action: o, args: f, model: e });
        }, "s");
        return ol2.includes(o) ? Zr(t, e, s) : ll(i) ? Gi(t, i, s) : s({});
      } };
    }
    __name(al, "al");
    function ll(t) {
      return sl.includes(t);
    }
    __name(ll, "ll");
    function ul(t, e) {
      return _e(H("fields", () => {
        let r = t._runtimeDataModel.models[e];
        return Wi2(e, r);
      }));
    }
    __name(ul, "ul");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function zi(t) {
      return t.replace(/^./, (e) => e.toUpperCase());
    }
    __name(zi, "zi");
    var tn = Symbol();
    function Tt(t) {
      let e = [cl(t), ml(t), H(tn, () => t), H("$parent", () => t._appliedParent)], r = t._extensions.getAllClientExtensions();
      return r && e.push(vt(r)), ae(t, e);
    }
    __name(Tt, "Tt");
    function cl(t) {
      let e = Object.getPrototypeOf(t._originalClient), r = [...new Set(Object.getOwnPropertyNames(e))];
      return { getKeys() {
        return r;
      }, getPropertyValue(n) {
        return t[n];
      } };
    }
    __name(cl, "cl");
    function ml(t) {
      let e = Object.keys(t._runtimeDataModel.models), r = e.map(de), n = [...new Set(e.concat(r))];
      return _e({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = zi(i);
        if (t._runtimeDataModel.models[o] !== void 0) return en(t, o);
        if (t._runtimeDataModel.models[i] !== void 0) return en(t, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(ml, "ml");
    function Yi(t) {
      return t[tn] ? t[tn] : t;
    }
    __name(Yi, "Yi");
    function Xi(t) {
      if (typeof t == "function") return t(this);
      if (t.client?.__AccelerateEngine) {
        let r = t.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let e = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(t) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } });
      return Tt(e);
    }
    __name(Xi, "Xi");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Zi2({ result: t, modelName: e, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(e);
      if (!o) return t;
      let s = [], a2 = [];
      for (let f of Object.values(o)) {
        if (n) {
          if (n[f.name]) continue;
          let h = f.needs.filter((C) => n[C]);
          h.length > 0 && a2.push(Xe2(h));
        } else if (r) {
          if (!r[f.name]) continue;
          let h = f.needs.filter((C) => !r[C]);
          h.length > 0 && a2.push(Xe2(h));
        }
        pl(t, f.needs) && s.push(dl(f, ae(t, s)));
      }
      return s.length > 0 || a2.length > 0 ? ae(t, [...s, ...a2]) : t;
    }
    __name(Zi2, "Zi");
    function pl(t, e) {
      return e.every((r) => Ur(t, r));
    }
    __name(pl, "pl");
    function dl(t, e) {
      return _e(H(t.name, () => t.compute(e)));
    }
    __name(dl, "dl");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function pr({ visitor: t, result: e, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(e)) {
        for (let s = 0; s < e.length; s++) e[s] = pr({ result: e[s], args: r, modelName: i, runtimeDataModel: n, visitor: t });
        return e;
      }
      let o = t(e, i, r) ?? e;
      return r.include && eo2({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), r.select && eo2({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), o;
    }
    __name(pr, "pr");
    function eo2({ includeOrSelect: t, result: e, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(t)) {
        if (!s || e[o] == null || fe(s)) continue;
        let f = n.models[r].fields.find((C) => C.name === o);
        if (!f || f.kind !== "object" || !f.relationName) continue;
        let h = typeof s == "object" ? s : {};
        e[o] = pr({ visitor: i, result: e[o], args: h, modelName: f.type, runtimeDataModel: n });
      }
    }
    __name(eo2, "eo");
    function to({ result: t, modelName: e, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || t == null || typeof t != "object" || !i.models[e] ? t : pr({ result: t, args: r ?? {}, modelName: e, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a2, f, h) => {
        let C = de(f);
        return Zi2({ result: a2, modelName: C, select: h.select, omit: h.select ? void 0 : { ...o?.[C], ...h.omit }, extensions: n });
      }, "visitor") });
    }
    __name(to, "to");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var fl = ["$connect", "$disconnect", "$on", "$transaction", "$extends"];
    var ro = fl;
    function no(t) {
      if (t instanceof ee) return gl(t);
      if (or(t)) return yl(t);
      if (Array.isArray(t)) {
        let r = [t[0]];
        for (let n = 1; n < t.length; n++) r[n] = Ct(t[n]);
        return r;
      }
      let e = {};
      for (let r in t) e[r] = Ct(t[r]);
      return e;
    }
    __name(no, "no");
    function gl(t) {
      return new ee(t.strings, t.values);
    }
    __name(gl, "gl");
    function yl(t) {
      return new Pt(t.sql, t.values);
    }
    __name(yl, "yl");
    function Ct(t) {
      if (typeof t != "object" || t == null || t instanceof xe || Ke(t)) return t;
      if (je(t)) return new be2(t.toFixed());
      if (Ve(t)) return /* @__PURE__ */ new Date(+t);
      if (ArrayBuffer.isView(t)) return t.slice(0);
      if (Array.isArray(t)) {
        let e = t.length, r;
        for (r = Array(e); e--; ) r[e] = Ct(t[e]);
        return r;
      }
      if (typeof t == "object") {
        let e = {};
        for (let r in t) r === "__proto__" ? Object.defineProperty(e, r, { value: Ct(t[r]), configurable: true, enumerable: true, writable: true }) : e[r] = Ct(t[r]);
        return e;
      }
      Me(t, "Unknown value");
    }
    __name(Ct, "Ct");
    function oo2(t, e, r, n = 0) {
      return t._createPrismaPromise((i) => {
        let o = e.customDataProxyFetch;
        return "transaction" in e && i !== void 0 && (e.transaction?.kind === "batch" && e.transaction.lock.then(), e.transaction = i), n === r.length ? t._executeRequest(e) : r[n]({ model: e.model, operation: e.model ? e.action : e.clientMethod, args: no(e.args ?? {}), __internalParams: e, query: /* @__PURE__ */ __name((s, a2 = e) => {
          let f = a2.customDataProxyFetch;
          return a2.customDataProxyFetch = uo(o, f), a2.args = s, oo2(t, a2, r, n + 1);
        }, "query") });
      });
    }
    __name(oo2, "oo");
    function so2(t, e) {
      let { jsModelName: r, action: n, clientMethod: i } = e, o = r ? n : i;
      if (t._extensions.isEmpty()) return t._executeRequest(e);
      let s = t._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return oo2(t, e, s);
    }
    __name(so2, "so");
    function ao2(t) {
      return (e) => {
        let r = { requests: e }, n = e[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? lo2(r, n, 0, t) : t(r);
      };
    }
    __name(ao2, "ao");
    function lo2(t, e, r, n) {
      if (r === e.length) return n(t);
      let i = t.customDataProxyFetch, o = t.requests[0].transaction;
      return e[r]({ args: { queries: t.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: t, query(s, a2 = t) {
        let f = a2.customDataProxyFetch;
        return a2.customDataProxyFetch = uo(i, f), lo2(a2, e, r + 1, n);
      } });
    }
    __name(lo2, "lo");
    var io2 = /* @__PURE__ */ __name((t) => t, "io");
    function uo(t = io2, e = io2) {
      return (r) => t(e(r));
    }
    __name(uo, "uo");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var co = G2("prisma:client");
    var mo = { Vercel: "vercel", "Netlify CI": "netlify" };
    function po({ postinstall: t, ciName: e, clientVersion: r }) {
      if (co("checkPlatformCaching:postinstall", t), co("checkPlatformCaching:ciName", e), t === true && e && e in mo) {
        let n = `Prisma has detected that this project was built on ${e}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${mo[e]}-build`;
        throw console.error(n), new I(n, r);
      }
    }
    __name(po, "po");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function fo(t, e) {
      return t ? t.datasources ? t.datasources : t.datasourceUrl ? { [e[0]]: { url: t.datasourceUrl } } : {} : {};
    }
    __name(fo, "fo");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var hl = /* @__PURE__ */ __name(() => globalThis.process?.release?.name === "node", "hl");
    var bl = /* @__PURE__ */ __name(() => !!globalThis.Bun || !!globalThis.process?.versions?.bun, "bl");
    var wl = /* @__PURE__ */ __name(() => !!globalThis.Deno, "wl");
    var El = /* @__PURE__ */ __name(() => typeof globalThis.Netlify == "object", "El");
    var xl = /* @__PURE__ */ __name(() => typeof globalThis.EdgeRuntime == "object", "xl");
    var Pl = /* @__PURE__ */ __name(() => globalThis.navigator?.userAgent === "Cloudflare-Workers", "Pl");
    function vl2() {
      return [[El, "netlify"], [xl, "edge-light"], [Pl, "workerd"], [wl, "deno"], [bl, "bun"], [hl, "node"]].flatMap((r) => r[0]() ? [r[1]] : []).at(0) ?? "";
    }
    __name(vl2, "vl");
    var Tl = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function Ae() {
      let t = vl2();
      return { id: t, prettyName: Tl[t] || t, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(t) };
    }
    __name(Ae, "Ae");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    l();
    function go2(t, e) {
      throw new Error(e);
    }
    __name(go2, "go");
    function Cl(t) {
      return t !== null && typeof t == "object" && typeof t.$type == "string";
    }
    __name(Cl, "Cl");
    function Al(t, e) {
      let r = {};
      for (let n of Object.keys(t)) r[n] = e(t[n], n);
      return r;
    }
    __name(Al, "Al");
    function et2(t) {
      return t === null ? t : Array.isArray(t) ? t.map(et2) : typeof t == "object" ? Cl(t) ? Rl(t) : t.constructor !== null && t.constructor.name !== "Object" ? t : Al(t, et2) : t;
    }
    __name(et2, "et");
    function Rl({ $type: t, value: e }) {
      switch (t) {
        case "BigInt":
          return BigInt(e);
        case "Bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = b2.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "DateTime":
          return new Date(e);
        case "Decimal":
          return new v2(e);
        case "Json":
          return JSON.parse(e);
        default:
          go2(e, "Unknown tagged value");
      }
    }
    __name(Rl, "Rl");
    var yo2 = "6.15.0";
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function dr3({ inlineDatasources: t, overrideDatasources: e, env: r, clientVersion: n }) {
      let i, o = Object.keys(t)[0], s = t[o]?.url, a2 = e[o]?.url;
      if (o === void 0 ? i = void 0 : a2 ? i = a2 : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw Ae().id === "workerd" ? new I(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new I(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new I("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(dr3, "dr");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function ho(t) {
      if (t?.kind === "itx") return t.options.id;
    }
    __name(ho, "ho");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var rn;
    var bo2 = { async loadLibrary(t) {
      let { clientVersion: e, adapter: r, engineWasm: n } = t;
      if (r === void 0) throw new I(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Ae().prettyName})`, e);
      if (n === void 0) throw new I("WASM engine was unexpectedly `undefined`", e);
      rn === void 0 && (rn = (async () => {
        let o = await n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new I("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", e);
        let a2 = { "./query_engine_bg.js": o }, f = new WebAssembly.Instance(s, a2), h = f.exports.__wbindgen_start;
        return o.__wbg_set_wasm(f.exports), h(), o.QueryEngine;
      })());
      let i = await rn;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var Ol = "P2036";
    var ge2 = G2("prisma:client:libraryEngine");
    function kl(t) {
      return t.item_type === "query" && "query" in t;
    }
    __name(kl, "kl");
    function Dl(t) {
      return "level" in t ? t.level === "error" && t.message === "PANIC" : false;
    }
    __name(Dl, "Dl");
    var sO = [...Dr, "native"];
    var Il = 0xffffffffffffffffn;
    var nn = 1n;
    function Ml() {
      let t = nn++;
      return nn > Il && (nn = 1n), t;
    }
    __name(Ml, "Ml");
    var At2 = class {
      static {
        __name(this, "At");
      }
      name = "LibraryEngine";
      engine;
      libraryInstantiationPromise;
      libraryStartingPromise;
      libraryStoppingPromise;
      libraryStarted;
      executingQueryPromise;
      config;
      QueryEngineConstructor;
      libraryLoader;
      library;
      logEmitter;
      libQueryEnginePath;
      binaryTarget;
      datasourceOverrides;
      datamodel;
      logQueries;
      logLevel;
      lastQuery;
      loggerRustPanic;
      tracingHelper;
      adapterPromise;
      versionInfo;
      constructor(e, r) {
        this.libraryLoader = r ?? bo2, this.config = e, this.libraryStarted = false, this.logQueries = e.logQueries ?? false, this.logLevel = e.logLevel ?? "error", this.logEmitter = e.logEmitter, this.datamodel = e.inlineSchema, this.tracingHelper = e.tracingHelper, e.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(e.overrideDatasources)[0], i = e.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      wrapEngine(e) {
        return { applyPendingMigrations: e.applyPendingMigrations?.bind(e), commitTransaction: this.withRequestId(e.commitTransaction.bind(e)), connect: this.withRequestId(e.connect.bind(e)), disconnect: this.withRequestId(e.disconnect.bind(e)), metrics: e.metrics?.bind(e), query: this.withRequestId(e.query.bind(e)), rollbackTransaction: this.withRequestId(e.rollbackTransaction.bind(e)), sdlSchema: e.sdlSchema?.bind(e), startTransaction: this.withRequestId(e.startTransaction.bind(e)), trace: e.trace.bind(e), free: e.free?.bind(e) };
      }
      withRequestId(e) {
        return async (...r) => {
          let n = Ml().toString();
          try {
            return await e(...r, n);
          } finally {
            if (this.tracingHelper.isEnabled()) {
              let i = await this.engine?.trace(n);
              if (i) {
                let o = JSON.parse(i);
                this.tracingHelper.dispatchEngineSpans(o.spans);
              }
            }
          }
        };
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(e, r, n) {
        await this.start();
        let i = await this.adapterPromise, o = JSON.stringify(r), s;
        if (e === "start") {
          let f = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          s = await this.engine?.startTransaction(f, o);
        } else e === "commit" ? s = await this.engine?.commitTransaction(n.id, o) : e === "rollback" && (s = await this.engine?.rollbackTransaction(n.id, o));
        let a2 = this.parseEngineResponse(s);
        if (_l(a2)) {
          let f = this.getExternalAdapterError(a2, i?.errorRegistry);
          throw f ? f.error : new Z(a2.message, { code: a2.error_code, clientVersion: this.config.clientVersion, meta: a2.meta });
        } else if (typeof a2.message == "string") throw new Q(a2.message, { clientVersion: this.config.clientVersion });
        return a2;
      }
      async instantiateLibrary() {
        if (ge2("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
      }
      async getCurrentBinaryTarget() {
      }
      parseEngineResponse(e) {
        if (!e) throw new Q("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(e);
        } catch {
          throw new Q("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let e = new w(this);
            this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(qt));
            let r = await this.adapterPromise;
            r && ge2("Using driver adapter: %O", r), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: g.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (n) => {
              e.deref()?.logger(n);
            }, r));
          } catch (e) {
            let r = e, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new I(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(e) {
        let r = this.parseEngineResponse(e);
        r && (r.level = r?.level.toLowerCase() ?? "unknown", kl(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : (Dl(r), this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path })));
      }
      parseInitError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      parseRequestError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (this.libraryInstantiationPromise || (this.libraryInstantiationPromise = this.instantiateLibrary()), await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return ge2(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let e = /* @__PURE__ */ __name(async () => {
          ge2("library starting");
          try {
            let r = { traceparent: this.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(qt)), await this.adapterPromise, ge2("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new I(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "e");
        return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", e), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return ge2("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) {
          await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0;
          return;
        }
        let e = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setImmediate(n)), ge2("library stopping");
          let r = { traceparent: this.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.engine?.free && this.engine.free(), this.engine = void 0, this.libraryStarted = false, this.libraryStoppingPromise = void 0, this.libraryInstantiationPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, ge2("library stopped");
        }, "e");
        return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", e), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(e) {
        return this.library?.debugPanic(e);
      }
      async request(e, { traceparent: r, interactiveTransaction: n }) {
        ge2(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(e);
        try {
          await this.start();
          let s = await this.adapterPromise;
          this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let a2 = this.parseEngineResponse(await this.executingQueryPromise);
          if (a2.errors) throw a2.errors.length === 1 ? this.buildQueryError(a2.errors[0], s?.errorRegistry) : new Q(JSON.stringify(a2.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: a2 };
        } catch (s) {
          if (s instanceof I) throw s;
          s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
          let a2 = this.parseRequestError(s.message);
          throw typeof a2 == "string" ? s : new Q(`${a2.message}
${a2.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(e, { transaction: r, traceparent: n }) {
        ge2("requestBatch");
        let i = ur(e, r);
        await this.start();
        let o = await this.adapterPromise;
        this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine?.query(this.lastQuery, JSON.stringify({ traceparent: n }), ho(r));
        let s = await this.executingQueryPromise, a2 = this.parseEngineResponse(s);
        if (a2.errors) throw a2.errors.length === 1 ? this.buildQueryError(a2.errors[0], o?.errorRegistry) : new Q(JSON.stringify(a2.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: f, errors: h } = a2;
        if (Array.isArray(f)) return f.map((C) => C.errors && C.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(C.errors[0], o?.errorRegistry) : { data: C });
        throw h && h.length === 1 ? new Error(h[0].error) : new Error(JSON.stringify(a2));
      }
      buildQueryError(e, r) {
        e.user_facing_error.is_panic;
        let n = this.getExternalAdapterError(e.user_facing_error, r);
        return n ? n.error : cr(e, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(e, r) {
        if (e.error_code === Ol && r) {
          let n = e.meta?.id;
          Bt2(typeof n == "number", "Malformed external JS error received from the engine");
          let i = r.consumeError(n);
          return Bt2(i, "External error with reported id was not registered"), i;
        }
      }
      async metrics(e) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(e));
        return e.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    };
    function _l(t) {
      return typeof t == "object" && t !== null && t.error_code !== void 0;
    }
    __name(_l, "_l");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Rt = "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started";
    var fr2 = class {
      static {
        __name(this, "fr");
      }
      constructor(e) {
        this.config = e;
        this.resolveDatasourceUrl = this.config.accelerateUtils?.resolveDatasourceUrl, this.getBatchRequestPayload = this.config.accelerateUtils?.getBatchRequestPayload, this.prismaGraphQLToJSError = this.config.accelerateUtils?.prismaGraphQLToJSError, this.PrismaClientUnknownRequestError = this.config.accelerateUtils?.PrismaClientUnknownRequestError, this.PrismaClientInitializationError = this.config.accelerateUtils?.PrismaClientInitializationError, this.PrismaClientKnownRequestError = this.config.accelerateUtils?.PrismaClientKnownRequestError, this.debug = this.config.accelerateUtils?.debug, this.engineVersion = this.config.accelerateUtils?.engineVersion, this.clientVersion = this.config.accelerateUtils?.clientVersion;
      }
      name = "AccelerateEngine";
      resolveDatasourceUrl;
      getBatchRequestPayload;
      prismaGraphQLToJSError;
      PrismaClientUnknownRequestError;
      PrismaClientInitializationError;
      PrismaClientKnownRequestError;
      debug;
      engineVersion;
      clientVersion;
      onBeforeExit(e) {
      }
      async start() {
      }
      async stop() {
      }
      version(e) {
        return "unknown";
      }
      transaction(e, r, n) {
        throw new I(Rt, this.config.clientVersion);
      }
      metrics(e) {
        throw new I(Rt, this.config.clientVersion);
      }
      request(e, r) {
        throw new I(Rt, this.config.clientVersion);
      }
      requestBatch(e, r) {
        throw new I(Rt, this.config.clientVersion);
      }
      applyPendingMigrations() {
        throw new I(Rt, this.config.clientVersion);
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function wo2({ url: t, adapter: e, copyEngine: r, targetBuildType: n }) {
      let i = [], o = [], s = /* @__PURE__ */ __name((O2) => {
        i.push({ _tag: "warning", value: O2 });
      }, "s"), a2 = /* @__PURE__ */ __name((O2) => {
        let D = O2.join(`
`);
        o.push({ _tag: "error", value: D });
      }, "a"), f = !!t?.startsWith("prisma://"), h = Lr(t), C = !!e, A = f || h;
      !C && r && A && s(["recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"]);
      let k = A || !r;
      C && (k || n === "edge") && (n === "edge" ? a2(["Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.", "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."]) : r ? f && a2(["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."]) : a2(["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."]));
      let R = { accelerate: k, ppg: h, driverAdapters: C };
      function _(O2) {
        return O2.length > 0;
      }
      __name(_, "_");
      return _(o) ? { ok: false, diagnostics: { warnings: i, errors: o }, isUsing: R } : { ok: true, diagnostics: { warnings: i }, isUsing: R };
    }
    __name(wo2, "wo");
    function Eo2({ copyEngine: t = true }, e) {
      let r;
      try {
        r = dr3({ inlineDatasources: e.inlineDatasources, overrideDatasources: e.overrideDatasources, env: { ...e.env, ...g.env }, clientVersion: e.clientVersion });
      } catch {
      }
      let { ok: n, isUsing: i, diagnostics: o } = wo2({ url: r, adapter: e.adapter, copyEngine: t, targetBuildType: "wasm-engine-edge" });
      for (let A of o.warnings) ut2(...A.value);
      if (!n) {
        let A = o.errors[0];
        throw new K(A.value, { clientVersion: e.clientVersion });
      }
      let s = Be(e.generator), a2 = s === "library", f = s === "binary", h = s === "client", C = (i.accelerate || i.ppg) && !i.driverAdapters;
      if (i.accelerate, i.driverAdapters) return new At2(e);
      if (i.accelerate) return new fr2(e);
      {
        let A = [`PrismaClient failed to initialize because it wasn't configured to run in this environment (${Ae().prettyName}).`, "In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:", "- Enable Driver Adapters: https://pris.ly/d/driver-adapters", "- Enable Accelerate: https://pris.ly/d/accelerate"];
        throw new K(A.join(`
`), { clientVersion: e.clientVersion });
      }
      return "wasm-engine-edge";
    }
    __name(Eo2, "Eo");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function gr2({ generator: t }) {
      return t?.previewFeatures ?? [];
    }
    __name(gr2, "gr");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var xo = /* @__PURE__ */ __name((t) => ({ command: t }), "xo");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Po = /* @__PURE__ */ __name((t) => t.strings.reduce((e, r, n) => `${e}@P${n}${r}`), "Po");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    l();
    function tt2(t) {
      try {
        return vo(t, "fast");
      } catch {
        return vo(t, "slow");
      }
    }
    __name(tt2, "tt");
    function vo(t, e) {
      return JSON.stringify(t.map((r) => Co2(r, e)));
    }
    __name(vo, "vo");
    function Co2(t, e) {
      if (Array.isArray(t)) return t.map((r) => Co2(r, e));
      if (typeof t == "bigint") return { prisma__type: "bigint", prisma__value: t.toString() };
      if (Ve(t)) return { prisma__type: "date", prisma__value: t.toJSON() };
      if (be2.isDecimal(t)) return { prisma__type: "decimal", prisma__value: t.toJSON() };
      if (b2.isBuffer(t)) return { prisma__type: "bytes", prisma__value: t.toString("base64") };
      if (Ll(t)) return { prisma__type: "bytes", prisma__value: b2.from(t).toString("base64") };
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { prisma__type: "bytes", prisma__value: b2.from(r, n, i).toString("base64") };
      }
      return typeof t == "object" && e === "slow" ? Ao2(t) : t;
    }
    __name(Co2, "Co");
    function Ll(t) {
      return t instanceof ArrayBuffer || t instanceof SharedArrayBuffer ? true : typeof t == "object" && t !== null ? t[Symbol.toStringTag] === "ArrayBuffer" || t[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Ll, "Ll");
    function Ao2(t) {
      if (typeof t != "object" || t === null) return t;
      if (typeof t.toJSON == "function") return t.toJSON();
      if (Array.isArray(t)) return t.map(To);
      let e = {};
      for (let r of Object.keys(t)) e[r] = To(t[r]);
      return e;
    }
    __name(Ao2, "Ao");
    function To(t) {
      return typeof t == "bigint" ? t.toString() : Ao2(t);
    }
    __name(To, "To");
    var Fl = /^(\s*alter\s)/i;
    var Ro = G2("prisma:client");
    function on(t, e, r, n) {
      if (!(t !== "postgresql" && t !== "cockroachdb") && r.length > 0 && Fl.exec(e)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(on, "on");
    var sn = /* @__PURE__ */ __name(({ clientMethod: t, activeProvider: e }) => (r) => {
      let n = "", i;
      if (or(r)) n = r.sql, i = { values: tt2(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: tt2(s || []), __prismaRawParameters__: true };
      } else switch (e) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: tt2(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: tt2(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = Po(r), i = { values: tt2(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${e} provider does not support ${t}`);
      }
      return i?.values ? Ro(`prisma.${t}(${n}, ${i.values})`) : Ro(`prisma.${t}(${n})`), { query: n, parameters: i };
    }, "sn");
    var So2 = { requestArgsToMiddlewareArgs(t) {
      return [t.strings, ...t.values];
    }, middlewareArgsToRequestArgs(t) {
      let [e, ...r] = t;
      return new ee(e, r);
    } };
    var Oo = { requestArgsToMiddlewareArgs(t) {
      return [t];
    }, middlewareArgsToRequestArgs(t) {
      return t[0];
    } };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function an(t) {
      return function(r, n) {
        let i, o = /* @__PURE__ */ __name((s = t) => {
          try {
            return s === void 0 || s?.kind === "itx" ? i ??= ko(r(s)) : ko(r(s));
          } catch (a2) {
            return Promise.reject(a2);
          }
        }, "o");
        return { get spec() {
          return n;
        }, then(s, a2) {
          return o().then(s, a2);
        }, catch(s) {
          return o().catch(s);
        }, finally(s) {
          return o().finally(s);
        }, requestTransaction(s) {
          let a2 = o(s);
          return a2.requestTransaction ? a2.requestTransaction(s) : a2;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(an, "an");
    function ko(t) {
      return typeof t.then == "function" ? t : Promise.resolve(t);
    }
    __name(ko, "ko");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Ul = Ir.split(".")[0];
    var Nl = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, dispatchEngineSpans() {
    }, getActiveContext() {
    }, runInChildSpan(t, e) {
      return e();
    } };
    var ln2 = class {
      static {
        __name(this, "ln");
      }
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(e) {
        return this.getGlobalTracingHelper().getTraceParent(e);
      }
      dispatchEngineSpans(e) {
        return this.getGlobalTracingHelper().dispatchEngineSpans(e);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(e, r) {
        return this.getGlobalTracingHelper().runInChildSpan(e, r);
      }
      getGlobalTracingHelper() {
        let e = globalThis[`V${Ul}_PRISMA_INSTRUMENTATION`], r = globalThis.PRISMA_INSTRUMENTATION;
        return e?.helper ?? r?.helper ?? Nl;
      }
    };
    function Do() {
      return new ln2();
    }
    __name(Do, "Do");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Io2(t, e = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --t === 0 && r(e()), i?.(n);
      } };
    }
    __name(Io2, "Io");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Mo(t) {
      return typeof t == "string" ? t : t.reduce((e, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? e : e && (r === "info" || e === "info") ? "info" : n;
      }, void 0);
    }
    __name(Mo, "Mo");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Lo = it2(ei());
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function yr(t) {
      return typeof t.batchRequestIdx == "number";
    }
    __name(yr, "yr");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function _o2(t) {
      if (t.action !== "findUnique" && t.action !== "findUniqueOrThrow") return;
      let e = [];
      return t.modelName && e.push(t.modelName), t.query.arguments && e.push(un(t.query.arguments)), e.push(un(t.query.selection)), e.join("");
    }
    __name(_o2, "_o");
    function un(t) {
      return `(${Object.keys(t).sort().map((r) => {
        let n = t[r];
        return typeof n == "object" && n !== null ? `(${r} ${un(n)})` : r;
      }).join(" ")})`;
    }
    __name(un, "un");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var ql = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
    function cn(t) {
      return ql[t];
    }
    __name(cn, "cn");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var hr = class {
      static {
        __name(this, "hr");
      }
      constructor(e) {
        this.options = e;
        this.batches = {};
      }
      batches;
      tickActive = false;
      request(e) {
        let r = this.options.batchBy(e);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, g.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: e, resolve: n, reject: i });
        })) : this.options.singleLoader(e);
      }
      dispatchBatches() {
        for (let e in this.batches) {
          let r = this.batches[e];
          delete this.batches[e], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
            else for (let i = 0; i < r.length; i++) {
              let o = n[i];
              o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++) r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    u();
    c();
    m2();
    p2();
    d2();
    l();
    l();
    function Le(t, e) {
      if (e === null) return e;
      switch (t) {
        case "bigint":
          return BigInt(e);
        case "bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = b2.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "decimal":
          return new be2(e);
        case "datetime":
        case "date":
          return new Date(e);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${e}Z`);
        case "bigint-array":
          return e.map((r) => Le("bigint", r));
        case "bytes-array":
          return e.map((r) => Le("bytes", r));
        case "decimal-array":
          return e.map((r) => Le("decimal", r));
        case "datetime-array":
          return e.map((r) => Le("datetime", r));
        case "date-array":
          return e.map((r) => Le("date", r));
        case "time-array":
          return e.map((r) => Le("time", r));
        default:
          return e;
      }
    }
    __name(Le, "Le");
    function br2(t) {
      let e = [], r = Bl(t);
      for (let n = 0; n < t.rows.length; n++) {
        let i = t.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++) o[t.columns[s]] = Le(t.types[s], i[s]);
        e.push(o);
      }
      return e;
    }
    __name(br2, "br");
    function Bl(t) {
      let e = {};
      for (let r = 0; r < t.columns.length; r++) e[t.columns[r]] = null;
      return e;
    }
    __name(Bl, "Bl");
    var Vl = G2("prisma:client:request_handler");
    var wr2 = class {
      static {
        __name(this, "wr");
      }
      client;
      dataloader;
      logEmitter;
      constructor(e, r) {
        this.logEmitter = r, this.client = e, this.dataloader = new hr({ batchLoader: ao2(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a2 = n.map((A) => A.protocolQuery), f = this.client._tracingHelper.getTraceParent(s), h = n.some((A) => cn(A.protocolQuery.action));
          return (await this.client._engine.requestBatch(a2, { traceparent: f, transaction: jl(o), containsWrite: h, customDataProxyFetch: i })).map((A, k) => {
            if (A instanceof Error) return A;
            try {
              return this.mapQueryEngineResult(n[k], A);
            } catch (R) {
              return R;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? Fo(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: cn(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : _o2(n.protocolQuery), "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(e) {
        try {
          return await this.dataloader.request(e);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a2 } = e;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a2, globalOmit: e.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: e, unpacker: r }, n) {
        let i = n?.data, o = this.unpack(i, e, r);
        return g.env.PRISMA_CLIENT_GET_TIME ? { data: o } : o;
      }
      handleAndLogRequestError(e) {
        try {
          this.handleRequestError(e);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: e.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: e, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a2 }) {
        if (Vl(e), $l(e, i)) throw e;
        if (e instanceof Z && Ql(e)) {
          let h = Uo(e.meta);
          Zt2({ args: o, errors: [h], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a2 });
        }
        let f = e.message;
        if (n && (f = $t({ callsite: n, originalMethod: r, isPanic: e.isPanic, showColors: this.client._errorFormat === "pretty", message: f })), f = this.sanitizeMessage(f), e.code) {
          let h = s ? { modelName: s, ...e.meta } : e.meta;
          throw new Z(f, { code: e.code, clientVersion: this.client._clientVersion, meta: h, batchRequestIdx: e.batchRequestIdx });
        } else {
          if (e.isPanic) throw new Ee(f, this.client._clientVersion);
          if (e instanceof Q) throw new Q(f, { clientVersion: this.client._clientVersion, batchRequestIdx: e.batchRequestIdx });
          if (e instanceof I) throw new I(f, this.client._clientVersion);
          if (e instanceof Ee) throw new Ee(f, this.client._clientVersion);
        }
        throw e.clientVersion = this.client._clientVersion, e;
      }
      sanitizeMessage(e) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Lo.default)(e) : e;
      }
      unpack(e, r, n) {
        if (!e || (e.data && (e = e.data), !e)) return e;
        let i = Object.keys(e)[0], o = Object.values(e)[0], s = r.filter((h) => h !== "select" && h !== "include"), a2 = Xr(o, s), f = i === "queryRaw" ? br2(a2) : et2(a2);
        return n ? n(f) : f;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function jl(t) {
      if (t) {
        if (t.kind === "batch") return { kind: "batch", options: { isolationLevel: t.isolationLevel } };
        if (t.kind === "itx") return { kind: "itx", options: Fo(t) };
        Me(t, "Unknown transaction kind");
      }
    }
    __name(jl, "jl");
    function Fo(t) {
      return { id: t.id, payload: t.payload };
    }
    __name(Fo, "Fo");
    function $l(t, e) {
      return yr(t) && e?.kind === "batch" && t.batchRequestIdx !== e.index;
    }
    __name($l, "$l");
    function Ql(t) {
      return t.code === "P2009" || t.code === "P2012";
    }
    __name(Ql, "Ql");
    function Uo(t) {
      if (t.kind === "Union") return { kind: "Union", errors: t.errors.map(Uo) };
      if (Array.isArray(t.selectionPath)) {
        let [, ...e] = t.selectionPath;
        return { ...t, selectionPath: e };
      }
      return t;
    }
    __name(Uo, "Uo");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var No = yo2;
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var $o = it2(Br());
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var M = class extends Error {
      static {
        __name(this, "M");
      }
      constructor(e) {
        super(e + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    re(M, "PrismaClientConstructorValidationError");
    var qo = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var Bo = ["pretty", "colorless", "minimal"];
    var Vo = ["info", "query", "warn", "error"];
    var Jl = { datasources: /* @__PURE__ */ __name((t, { datasourceNames: e }) => {
      if (t) {
        if (typeof t != "object" || Array.isArray(t)) throw new M(`Invalid value ${JSON.stringify(t)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(t)) {
          if (!e.includes(r)) {
            let i = rt2(r, e) || ` Available datasources: ${e.join(", ")}`;
            throw new M(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new M(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new M(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new M(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((t, e) => {
      if (!t && Be(e.generator) === "client") throw new M('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
      if (t === null) return;
      if (t === void 0) throw new M('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!gr2(e).includes("driverAdapters")) throw new M('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (Be(e.generator) === "binary") throw new M('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((t) => {
      if (typeof t < "u" && typeof t != "string") throw new M(`Invalid value ${JSON.stringify(t)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((t) => {
      if (t) {
        if (typeof t != "string") throw new M(`Invalid value ${JSON.stringify(t)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Bo.includes(t)) {
          let e = rt2(t, Bo);
          throw new M(`Invalid errorFormat ${t} provided to PrismaClient constructor.${e}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      if (!Array.isArray(t)) throw new M(`Invalid value ${JSON.stringify(t)} for "log" provided to PrismaClient constructor.`);
      function e(r) {
        if (typeof r == "string" && !Vo.includes(r)) {
          let n = rt2(r, Vo);
          throw new M(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(e, "e");
      for (let r of t) {
        e(r);
        let n = { level: e, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = rt2(i, o);
            throw new M(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new M(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      let e = t.maxWait;
      if (e != null && e <= 0) throw new M(`Invalid value ${e} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = t.timeout;
      if (r != null && r <= 0) throw new M(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((t, e) => {
      if (typeof t != "object") throw new M('"omit" option is expected to be an object.');
      if (t === null) throw new M('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(t)) {
        let o = Wl(n, e.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a2] of Object.entries(i)) {
          let f = o.fields.find((h) => h.name === s);
          if (!f) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (f.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a2 != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new M(Kl(t, r));
    }, "omit"), __internal: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      let e = ["debug", "engine", "configOverride"];
      if (typeof t != "object") throw new M(`Invalid value ${JSON.stringify(t)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(t)) if (!e.includes(r)) {
        let n = rt2(r, e);
        throw new M(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function Qo(t, e) {
      for (let [r, n] of Object.entries(t)) {
        if (!qo.includes(r)) {
          let i = rt2(r, qo);
          throw new M(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        Jl[r](n, e);
      }
      if (t.datasourceUrl && t.datasources) throw new M('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(Qo, "Qo");
    function rt2(t, e) {
      if (e.length === 0 || typeof t != "string") return "";
      let r = Gl(t, e);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(rt2, "rt");
    function Gl(t, e) {
      if (e.length === 0) return null;
      let r = e.map((i) => ({ value: i, distance: (0, $o.default)(t, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(Gl, "Gl");
    function Wl(t, e) {
      return jo(e.models, t) ?? jo(e.types, t);
    }
    __name(Wl, "Wl");
    function jo(t, e) {
      let r = Object.keys(t).find((n) => ve(n) === e);
      if (r) return t[r];
    }
    __name(jo, "jo");
    function Kl(t, e) {
      let r = He2(t);
      for (let o of e) switch (o.kind) {
        case "UnknownModel":
          r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
          break;
        case "UnknownField":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
          break;
        case "RelationInOmit":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
          break;
        case "InvalidFieldValue":
          r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
          break;
      }
      let { message: n, args: i } = Xt3(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(Kl, "Kl");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    function Jo(t) {
      return t.length === 0 ? Promise.resolve([]) : new Promise((e, r) => {
        let n = new Array(t.length), i = null, o = false, s = 0, a2 = /* @__PURE__ */ __name(() => {
          o || (s++, s === t.length && (o = true, i ? r(i) : e(n)));
        }, "a"), f = /* @__PURE__ */ __name((h) => {
          o || (o = true, r(h));
        }, "f");
        for (let h = 0; h < t.length; h++) t[h].then((C) => {
          n[h] = C, a2();
        }, (C) => {
          if (!yr(C)) {
            f(C);
            return;
          }
          C.batchRequestIdx === h ? f(C) : (i || (i = C), a2());
        });
      });
    }
    __name(Jo, "Jo");
    var Re = G2("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Hl = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((t) => t, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((t) => t, "middlewareArgsToRequestArgs") };
    var zl = Symbol.for("prisma.client.transaction.id");
    var Yl = { id: 0, nextId() {
      return ++this.id;
    } };
    function Ko(t) {
      class e {
        static {
          __name(this, "e");
        }
        _originalClient = this;
        _runtimeDataModel;
        _requestHandler;
        _connectionPromise;
        _disconnectionPromise;
        _engineConfig;
        _accelerateEngineConfig;
        _clientVersion;
        _errorFormat;
        _tracingHelper;
        _previewFeatures;
        _activeProvider;
        _globalOmit;
        _extensions;
        _engine;
        _appliedParent;
        _createPrismaPromise = an();
        constructor(n) {
          t = n?.__internal?.configOverride?.(t) ?? t, po(t), n && Qo(n, t);
          let i = new sr().on("error", () => {
          });
          this._extensions = ze.empty(), this._previewFeatures = gr2(t), this._clientVersion = t.clientVersion ?? No, this._activeProvider = t.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = Do();
          let o = t.relativeEnvPaths && { rootEnvPath: t.relativeEnvPaths.rootEnvPath && Ut.resolve(t.dirname, t.relativeEnvPaths.rootEnvPath), schemaEnvPath: t.relativeEnvPaths.schemaEnvPath && Ut.resolve(t.dirname, t.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = n.adapter;
            let f = t.activeProvider === "postgresql" || t.activeProvider === "cockroachdb" ? "postgres" : t.activeProvider;
            if (s.provider !== f) throw new I(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${f}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new I("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a2 = t.injectableEdgeEnv?.();
          try {
            let f = n ?? {}, h = f.__internal ?? {}, C = h.debug === true;
            C && G2.enable("prisma:client");
            let A = Ut.resolve(t.dirname, t.relativePath);
            Nn2.existsSync(A) || (A = t.dirname), Re("dirname", t.dirname), Re("relativePath", t.relativePath), Re("cwd", A);
            let k = h.engine || {};
            if (f.errorFormat ? this._errorFormat = f.errorFormat : g.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : g.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = t.runtimeDataModel, this._engineConfig = { cwd: A, dirname: t.dirname, enableDebugLogs: C, allowTriggerPanic: k.allowTriggerPanic, prismaPath: k.binaryPath ?? void 0, engineEndpoint: k.endpoint, generator: t.generator, showColors: this._errorFormat === "pretty", logLevel: f.log && Mo(f.log), logQueries: f.log && !!(typeof f.log == "string" ? f.log === "query" : f.log.find((R) => typeof R == "string" ? R === "query" : R.level === "query")), env: a2?.parsed ?? {}, flags: [], engineWasm: t.engineWasm, compilerWasm: t.compilerWasm, clientVersion: t.clientVersion, engineVersion: t.engineVersion, previewFeatures: this._previewFeatures, activeProvider: t.activeProvider, inlineSchema: t.inlineSchema, overrideDatasources: fo(f, t.datasourceNames), inlineDatasources: t.inlineDatasources, inlineSchemaHash: t.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: f.transactionOptions?.maxWait ?? 2e3, timeout: f.transactionOptions?.timeout ?? 5e3, isolationLevel: f.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: t.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: dr3, getBatchRequestPayload: ur, prismaGraphQLToJSError: cr, PrismaClientUnknownRequestError: Q, PrismaClientInitializationError: I, PrismaClientKnownRequestError: Z, debug: G2("prisma:client:accelerateEngine"), engineVersion: Wo.version, clientVersion: t.clientVersion } }, Re("clientVersion", t.clientVersion), this._engine = Eo2(t, this._engineConfig), this._requestHandler = new wr2(this, i), f.log) for (let R of f.log) {
              let _ = typeof R == "string" ? R : R.emit === "stdout" ? R.level : null;
              _ && this.$on(_, (O2) => {
                lt.log(`${lt.tags[_] ?? ""}`, O2.message || O2.query);
              });
            }
          } catch (f) {
            throw f.clientVersion = this._clientVersion, f;
          }
          return this._appliedParent = Tt(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $on(n, i) {
          return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            Un3();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a2 = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: sn({ clientMethod: i, activeProvider: a2 }), callsite: Ce2(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a2] = Go(n, i);
              return on(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a2);
            }
            throw new K("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (on(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (t.activeProvider !== "mongodb") throw new K(`The ${t.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: xo, callsite: Ce2(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a2 = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: sn({ clientMethod: i, activeProvider: a2 }), callsite: Ce2(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Go(n, i));
            throw new K("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new K("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = Yl.nextId(), s = Io2(n.length), a2 = n.map((f, h) => {
            if (f?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let C = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, A = { kind: "batch", id: o, index: h, isolationLevel: C, lock: s };
            return f.requestTransaction?.(A) ?? f;
          });
          return Jo(a2);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a2 = await this._engine.transaction("start", o, s), f;
          try {
            let h = { kind: "itx", ...a2 };
            f = await n(this._createItxClient(h)), await this._engine.transaction("commit", o, a2);
          } catch (h) {
            throw await this._engine.transaction("rollback", o, a2).catch(() => {
            }), h;
          }
          return f;
        }
        _createItxClient(n) {
          return ae(Tt(ae(Yi(this), [H("_appliedParent", () => this._appliedParent._createItxClient(n)), H("_createPrismaPromise", () => an(n)), H(zl, () => n.id)])), [Xe2(ro)]);
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Hl, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a2 = /* @__PURE__ */ __name(async (f) => {
            let { runInTransaction: h, args: C, ...A } = f, k = { ...n, ...A };
            C && (k.args = i.middlewareArgsToRequestArgs(C)), n.transaction !== void 0 && h === false && delete k.transaction;
            let R = await so2(this, k);
            return k.model ? to({ result: R, modelName: k.model, args: k.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : R;
          }, "a");
          return this._tracingHelper.runInChildSpan(s.operation, () => a2(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a2, model: f, argsMapper: h, transaction: C, unpacker: A, otelParentCtx: k, customDataProxyFetch: R }) {
          try {
            n = h ? h(n) : n;
            let _ = { name: "serialize" }, O2 = this._tracingHelper.runInChildSpan(_, () => nr({ modelName: f, runtimeDataModel: this._runtimeDataModel, action: a2, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return G2.enabled("prisma:client") && (Re("Prisma Client call:"), Re(`prisma.${i}(${Vi(n)})`), Re("Generated request:"), Re(JSON.stringify(O2, null, 2) + `
`)), C?.kind === "batch" && await C.lock, this._requestHandler.request({ protocolQuery: O2, modelName: f, action: a2, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: C, unpacker: A, otelParentCtx: k, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: R });
          } catch (_) {
            throw _.clientVersion = this._clientVersion, _;
          }
        }
        $metrics = new Ye(this);
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
        $extends = Xi;
      }
      return e;
    }
    __name(Ko, "Ko");
    function Go(t, e) {
      return Xl(t) ? [new ee(t, e), So2] : [t, Oo];
    }
    __name(Go, "Go");
    function Xl(t) {
      return Array.isArray(t) && Array.isArray(t.raw);
    }
    __name(Xl, "Xl");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    var Zl = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Ho(t) {
      return new Proxy(t, { get(e, r) {
        if (r in e) return e[r];
        if (!Zl.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Ho, "Ho");
    u();
    c();
    m2();
    p2();
    d2();
    l();
    l();
  }
});

// node_modules/.prisma/client/query_engine_bg.js
var require_query_engine_bg = __commonJS({
  "node_modules/.prisma/client/query_engine_bg.js"(exports, module) {
    "use strict";
    var S2 = Object.defineProperty;
    var k = Object.getOwnPropertyDescriptor;
    var D = Object.getOwnPropertyNames;
    var R = Object.prototype.hasOwnProperty;
    var B = /* @__PURE__ */ __name((e, t) => {
      for (var n in t) S2(e, n, { get: t[n], enumerable: true });
    }, "B");
    var U2 = /* @__PURE__ */ __name((e, t, n, r) => {
      if (t && typeof t == "object" || typeof t == "function") for (let _ of D(t)) !R.call(e, _) && _ !== n && S2(e, _, { get: /* @__PURE__ */ __name(() => t[_], "get"), enumerable: !(r = k(t, _)) || r.enumerable });
      return e;
    }, "U");
    var L = /* @__PURE__ */ __name((e) => U2(S2({}, "__esModule", { value: true }), e), "L");
    var Ft = {};
    B(Ft, { QueryEngine: /* @__PURE__ */ __name(() => Q, "QueryEngine"), __wbg_String_8f0eb39a4a4c2f66: /* @__PURE__ */ __name(() => H, "__wbg_String_8f0eb39a4a4c2f66"), __wbg_buffer_609cc3eee51ed158: /* @__PURE__ */ __name(() => J, "__wbg_buffer_609cc3eee51ed158"), __wbg_call_672a4d21634d4a24: /* @__PURE__ */ __name(() => K, "__wbg_call_672a4d21634d4a24"), __wbg_call_7cccdd69e0791ae2: /* @__PURE__ */ __name(() => X, "__wbg_call_7cccdd69e0791ae2"), __wbg_crypto_805be4ce92f1e370: /* @__PURE__ */ __name(() => Y, "__wbg_crypto_805be4ce92f1e370"), __wbg_done_769e5ede4b31c67b: /* @__PURE__ */ __name(() => Z, "__wbg_done_769e5ede4b31c67b"), __wbg_entries_3265d4158b33e5dc: /* @__PURE__ */ __name(() => ee, "__wbg_entries_3265d4158b33e5dc"), __wbg_exec_3e2d2d0644c927df: /* @__PURE__ */ __name(() => te, "__wbg_exec_3e2d2d0644c927df"), __wbg_getRandomValues_f6a868620c8bab49: /* @__PURE__ */ __name(() => ne, "__wbg_getRandomValues_f6a868620c8bab49"), __wbg_getTime_46267b1c24877e30: /* @__PURE__ */ __name(() => re, "__wbg_getTime_46267b1c24877e30"), __wbg_get_67b2ba62fc30de12: /* @__PURE__ */ __name(() => oe, "__wbg_get_67b2ba62fc30de12"), __wbg_get_b9b93047fe3cf45b: /* @__PURE__ */ __name(() => _e, "__wbg_get_b9b93047fe3cf45b"), __wbg_get_ece95cf6585650d9: /* @__PURE__ */ __name(() => ce2, "__wbg_get_ece95cf6585650d9"), __wbg_getwithrefkey_1dc361bd10053bfe: /* @__PURE__ */ __name(() => ie2, "__wbg_getwithrefkey_1dc361bd10053bfe"), __wbg_has_a5ea9117f258a0ec: /* @__PURE__ */ __name(() => ue, "__wbg_has_a5ea9117f258a0ec"), __wbg_instanceof_ArrayBuffer_e14585432e3737fc: /* @__PURE__ */ __name(() => se, "__wbg_instanceof_ArrayBuffer_e14585432e3737fc"), __wbg_instanceof_Map_f3469ce2244d2430: /* @__PURE__ */ __name(() => fe, "__wbg_instanceof_Map_f3469ce2244d2430"), __wbg_instanceof_Promise_935168b8f4b49db3: /* @__PURE__ */ __name(() => ae, "__wbg_instanceof_Promise_935168b8f4b49db3"), __wbg_instanceof_Uint8Array_17156bcf118086a9: /* @__PURE__ */ __name(() => be2, "__wbg_instanceof_Uint8Array_17156bcf118086a9"), __wbg_isArray_a1eab7e0d067391b: /* @__PURE__ */ __name(() => ge2, "__wbg_isArray_a1eab7e0d067391b"), __wbg_isSafeInteger_343e2beeeece1bb0: /* @__PURE__ */ __name(() => le, "__wbg_isSafeInteger_343e2beeeece1bb0"), __wbg_iterator_9a24c88df860dc65: /* @__PURE__ */ __name(() => de, "__wbg_iterator_9a24c88df860dc65"), __wbg_keys_5c77a08ddc2fb8a6: /* @__PURE__ */ __name(() => we, "__wbg_keys_5c77a08ddc2fb8a6"), __wbg_length_a446193dc22c12f8: /* @__PURE__ */ __name(() => pe, "__wbg_length_a446193dc22c12f8"), __wbg_length_e2d2a49132c1b256: /* @__PURE__ */ __name(() => xe, "__wbg_length_e2d2a49132c1b256"), __wbg_msCrypto_2ac4d17c4748234a: /* @__PURE__ */ __name(() => ye, "__wbg_msCrypto_2ac4d17c4748234a"), __wbg_new0_f788a2397c7ca929: /* @__PURE__ */ __name(() => me, "__wbg_new0_f788a2397c7ca929"), __wbg_new_23a2665fac83c611: /* @__PURE__ */ __name(() => he, "__wbg_new_23a2665fac83c611"), __wbg_new_405e22f390576ce2: /* @__PURE__ */ __name(() => Te, "__wbg_new_405e22f390576ce2"), __wbg_new_5e0be73521bc8c17: /* @__PURE__ */ __name(() => qe, "__wbg_new_5e0be73521bc8c17"), __wbg_new_63847613cde5d4bc: /* @__PURE__ */ __name(() => Se2, "__wbg_new_63847613cde5d4bc"), __wbg_new_78feb108b6472713: /* @__PURE__ */ __name(() => Ae, "__wbg_new_78feb108b6472713"), __wbg_new_a12002a7f91c75be: /* @__PURE__ */ __name(() => Ie2, "__wbg_new_a12002a7f91c75be"), __wbg_newnoargs_105ed471475aaf50: /* @__PURE__ */ __name(() => Ee, "__wbg_newnoargs_105ed471475aaf50"), __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: /* @__PURE__ */ __name(() => Oe, "__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a"), __wbg_newwithlength_a381634e90c276d4: /* @__PURE__ */ __name(() => Fe2, "__wbg_newwithlength_a381634e90c276d4"), __wbg_next_25feadfc0913fea9: /* @__PURE__ */ __name(() => Me, "__wbg_next_25feadfc0913fea9"), __wbg_next_6574e1a8a62d1055: /* @__PURE__ */ __name(() => je, "__wbg_next_6574e1a8a62d1055"), __wbg_node_ecc8306b9857f33d: /* @__PURE__ */ __name(() => ke, "__wbg_node_ecc8306b9857f33d"), __wbg_now_7fd00a794a07d388: /* @__PURE__ */ __name(() => De, "__wbg_now_7fd00a794a07d388"), __wbg_now_807e54c39636c349: /* @__PURE__ */ __name(() => Re, "__wbg_now_807e54c39636c349"), __wbg_now_b3f7572f6ef3d3a9: /* @__PURE__ */ __name(() => Be, "__wbg_now_b3f7572f6ef3d3a9"), __wbg_process_5cff2739921be718: /* @__PURE__ */ __name(() => Ue, "__wbg_process_5cff2739921be718"), __wbg_push_737cfc8c1432c2c6: /* @__PURE__ */ __name(() => Le, "__wbg_push_737cfc8c1432c2c6"), __wbg_queueMicrotask_5a8a9131f3f0b37b: /* @__PURE__ */ __name(() => ve, "__wbg_queueMicrotask_5a8a9131f3f0b37b"), __wbg_queueMicrotask_6d79674585219521: /* @__PURE__ */ __name(() => Ne, "__wbg_queueMicrotask_6d79674585219521"), __wbg_randomFillSync_d3c85af7e31cf1f8: /* @__PURE__ */ __name(() => $e2, "__wbg_randomFillSync_d3c85af7e31cf1f8"), __wbg_require_0c566c6f2eef6c79: /* @__PURE__ */ __name(() => Ce2, "__wbg_require_0c566c6f2eef6c79"), __wbg_resolve_4851785c9c5f573d: /* @__PURE__ */ __name(() => Ve, "__wbg_resolve_4851785c9c5f573d"), __wbg_setTimeout_5d6a1d4fc51ea450: /* @__PURE__ */ __name(() => ze, "__wbg_setTimeout_5d6a1d4fc51ea450"), __wbg_set_37837023f3d740e8: /* @__PURE__ */ __name(() => We, "__wbg_set_37837023f3d740e8"), __wbg_set_3f1d0b984ed272ed: /* @__PURE__ */ __name(() => Pe, "__wbg_set_3f1d0b984ed272ed"), __wbg_set_65595bdd868b3009: /* @__PURE__ */ __name(() => Ge2, "__wbg_set_65595bdd868b3009"), __wbg_set_8fc6bf8a5b1071d1: /* @__PURE__ */ __name(() => Qe, "__wbg_set_8fc6bf8a5b1071d1"), __wbg_set_bb8cecf6a62b9f46: /* @__PURE__ */ __name(() => He2, "__wbg_set_bb8cecf6a62b9f46"), __wbg_set_wasm: /* @__PURE__ */ __name(() => v2, "__wbg_set_wasm"), __wbg_static_accessor_GLOBAL_88a902d13a557d07: /* @__PURE__ */ __name(() => Je2, "__wbg_static_accessor_GLOBAL_88a902d13a557d07"), __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: /* @__PURE__ */ __name(() => Ke, "__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0"), __wbg_static_accessor_SELF_37c5d418e4bf5819: /* @__PURE__ */ __name(() => Xe2, "__wbg_static_accessor_SELF_37c5d418e4bf5819"), __wbg_static_accessor_WINDOW_5de37043a91a9c40: /* @__PURE__ */ __name(() => Ye, "__wbg_static_accessor_WINDOW_5de37043a91a9c40"), __wbg_subarray_aa9065fa9dc5df96: /* @__PURE__ */ __name(() => Ze, "__wbg_subarray_aa9065fa9dc5df96"), __wbg_then_44b73946d2fb3e7d: /* @__PURE__ */ __name(() => et2, "__wbg_then_44b73946d2fb3e7d"), __wbg_then_48b406749878a531: /* @__PURE__ */ __name(() => tt2, "__wbg_then_48b406749878a531"), __wbg_valueOf_7392193dd78c6b97: /* @__PURE__ */ __name(() => nt2, "__wbg_valueOf_7392193dd78c6b97"), __wbg_value_cd1ffa7b1ab794f1: /* @__PURE__ */ __name(() => rt2, "__wbg_value_cd1ffa7b1ab794f1"), __wbg_versions_a8e5a362e1f16442: /* @__PURE__ */ __name(() => ot2, "__wbg_versions_a8e5a362e1f16442"), __wbindgen_as_number: /* @__PURE__ */ __name(() => _t3, "__wbindgen_as_number"), __wbindgen_bigint_from_i64: /* @__PURE__ */ __name(() => ct2, "__wbindgen_bigint_from_i64"), __wbindgen_bigint_from_u64: /* @__PURE__ */ __name(() => it2, "__wbindgen_bigint_from_u64"), __wbindgen_bigint_get_as_i64: /* @__PURE__ */ __name(() => ut2, "__wbindgen_bigint_get_as_i64"), __wbindgen_boolean_get: /* @__PURE__ */ __name(() => st, "__wbindgen_boolean_get"), __wbindgen_cb_drop: /* @__PURE__ */ __name(() => ft, "__wbindgen_cb_drop"), __wbindgen_closure_wrapper7723: /* @__PURE__ */ __name(() => at, "__wbindgen_closure_wrapper7723"), __wbindgen_debug_string: /* @__PURE__ */ __name(() => bt2, "__wbindgen_debug_string"), __wbindgen_error_new: /* @__PURE__ */ __name(() => gt3, "__wbindgen_error_new"), __wbindgen_in: /* @__PURE__ */ __name(() => lt, "__wbindgen_in"), __wbindgen_init_externref_table: /* @__PURE__ */ __name(() => dt, "__wbindgen_init_externref_table"), __wbindgen_is_bigint: /* @__PURE__ */ __name(() => wt2, "__wbindgen_is_bigint"), __wbindgen_is_function: /* @__PURE__ */ __name(() => pt, "__wbindgen_is_function"), __wbindgen_is_object: /* @__PURE__ */ __name(() => xt, "__wbindgen_is_object"), __wbindgen_is_string: /* @__PURE__ */ __name(() => yt2, "__wbindgen_is_string"), __wbindgen_is_undefined: /* @__PURE__ */ __name(() => mt2, "__wbindgen_is_undefined"), __wbindgen_jsval_eq: /* @__PURE__ */ __name(() => ht, "__wbindgen_jsval_eq"), __wbindgen_jsval_loose_eq: /* @__PURE__ */ __name(() => Tt, "__wbindgen_jsval_loose_eq"), __wbindgen_memory: /* @__PURE__ */ __name(() => qt, "__wbindgen_memory"), __wbindgen_number_get: /* @__PURE__ */ __name(() => St, "__wbindgen_number_get"), __wbindgen_number_new: /* @__PURE__ */ __name(() => At2, "__wbindgen_number_new"), __wbindgen_string_get: /* @__PURE__ */ __name(() => It, "__wbindgen_string_get"), __wbindgen_string_new: /* @__PURE__ */ __name(() => Et, "__wbindgen_string_new"), __wbindgen_throw: /* @__PURE__ */ __name(() => Ot, "__wbindgen_throw"), debug_panic: /* @__PURE__ */ __name(() => W, "debug_panic"), getBuildTimeInfo: /* @__PURE__ */ __name(() => z, "getBuildTimeInfo") });
    module.exports = L(Ft);
    var m2 = /* @__PURE__ */ __name(() => {
    }, "m");
    m2.prototype = m2;
    var o;
    function v2(e) {
      o = e;
    }
    __name(v2, "v");
    var s = 0;
    var h = null;
    function T2() {
      return (h === null || h.byteLength === 0) && (h = new Uint8Array(o.memory.buffer)), h;
    }
    __name(T2, "T");
    var N = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
    var q = new N("utf-8");
    var $2 = typeof q.encodeInto == "function" ? function(e, t) {
      return q.encodeInto(e, t);
    } : function(e, t) {
      const n = q.encode(e);
      return t.set(n), { read: e.length, written: n.length };
    };
    function f(e, t, n) {
      if (n === void 0) {
        const u = q.encode(e), a2 = t(u.length, 1) >>> 0;
        return T2().subarray(a2, a2 + u.length).set(u), s = u.length, a2;
      }
      let r = e.length, _ = t(r, 1) >>> 0;
      const i = T2();
      let c = 0;
      for (; c < r; c++) {
        const u = e.charCodeAt(c);
        if (u > 127) break;
        i[_ + c] = u;
      }
      if (c !== r) {
        c !== 0 && (e = e.slice(c)), _ = n(_, r, r = c + e.length * 3, 1) >>> 0;
        const u = T2().subarray(_ + c, _ + r), a2 = $2(e, u);
        c += a2.written, _ = n(_, r, c, 1) >>> 0;
      }
      return s = c, _;
    }
    __name(f, "f");
    var p2 = null;
    function l() {
      return (p2 === null || p2.buffer.detached === true || p2.buffer.detached === void 0 && p2.buffer !== o.memory.buffer) && (p2 = new DataView(o.memory.buffer)), p2;
    }
    __name(l, "l");
    function x2(e) {
      const t = o.__externref_table_alloc();
      return o.__wbindgen_export_4.set(t, e), t;
    }
    __name(x2, "x");
    function g(e, t) {
      try {
        return e.apply(this, t);
      } catch (n) {
        const r = x2(n);
        o.__wbindgen_exn_store(r);
      }
    }
    __name(g, "g");
    var C = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
    var I = new C("utf-8", { ignoreBOM: true, fatal: true });
    I.decode();
    function w(e, t) {
      return e = e >>> 0, I.decode(T2().subarray(e, e + t));
    }
    __name(w, "w");
    function b2(e) {
      return e == null;
    }
    __name(b2, "b");
    var E2 = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => {
      o.__wbindgen_export_5.get(e.dtor)(e.a, e.b);
    });
    function V(e, t, n, r) {
      const _ = { a: e, b: t, cnt: 1, dtor: n }, i = /* @__PURE__ */ __name((...c) => {
        _.cnt++;
        const u = _.a;
        _.a = 0;
        try {
          return r(u, _.b, ...c);
        } finally {
          --_.cnt === 0 ? (o.__wbindgen_export_5.get(_.dtor)(u, _.b), E2.unregister(_)) : _.a = u;
        }
      }, "i");
      return i.original = _, E2.register(i, _, _), i;
    }
    __name(V, "V");
    function A(e) {
      const t = typeof e;
      if (t == "number" || t == "boolean" || e == null) return `${e}`;
      if (t == "string") return `"${e}"`;
      if (t == "symbol") {
        const _ = e.description;
        return _ == null ? "Symbol" : `Symbol(${_})`;
      }
      if (t == "function") {
        const _ = e.name;
        return typeof _ == "string" && _.length > 0 ? `Function(${_})` : "Function";
      }
      if (Array.isArray(e)) {
        const _ = e.length;
        let i = "[";
        _ > 0 && (i += A(e[0]));
        for (let c = 1; c < _; c++) i += ", " + A(e[c]);
        return i += "]", i;
      }
      const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
      let r;
      if (n && n.length > 1) r = n[1];
      else return toString.call(e);
      if (r == "Object") try {
        return "Object(" + JSON.stringify(e) + ")";
      } catch {
        return "Object";
      }
      return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : r;
    }
    __name(A, "A");
    function O2(e) {
      const t = o.__wbindgen_export_4.get(e);
      return o.__externref_table_dealloc(e), t;
    }
    __name(O2, "O");
    function z() {
      return o.getBuildTimeInfo();
    }
    __name(z, "z");
    function W(e) {
      var t = b2(e) ? 0 : f(e, o.__wbindgen_malloc, o.__wbindgen_realloc), n = s;
      const r = o.debug_panic(t, n);
      if (r[1]) throw O2(r[0]);
    }
    __name(W, "W");
    function P(e, t, n) {
      o.closure589_externref_shim(e, t, n);
    }
    __name(P, "P");
    function G2(e, t, n, r) {
      o.closure129_externref_shim(e, t, n, r);
    }
    __name(G2, "G");
    var F = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => o.__wbg_queryengine_free(e >>> 0, 1));
    var Q = class {
      static {
        __name(this, "Q");
      }
      __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, F.unregister(this), t;
      }
      free() {
        const t = this.__destroy_into_raw();
        o.__wbg_queryengine_free(t, 0);
      }
      constructor(t, n, r) {
        const _ = o.queryengine_new(t, n, r);
        if (_[2]) throw O2(_[1]);
        return this.__wbg_ptr = _[0] >>> 0, F.register(this, this.__wbg_ptr, this), this;
      }
      connect(t, n) {
        const r = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), _ = s, i = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), c = s;
        return o.queryengine_connect(this.__wbg_ptr, r, _, i, c);
      }
      disconnect(t, n) {
        const r = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), _ = s, i = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), c = s;
        return o.queryengine_disconnect(this.__wbg_ptr, r, _, i, c);
      }
      query(t, n, r, _) {
        const i = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), c = s, u = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), a2 = s;
        var d2 = b2(r) ? 0 : f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), y = s;
        const M = f(_, o.__wbindgen_malloc, o.__wbindgen_realloc), j = s;
        return o.queryengine_query(this.__wbg_ptr, i, c, u, a2, d2, y, M, j);
      }
      startTransaction(t, n, r) {
        const _ = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s, c = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), u = s, a2 = f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), d2 = s;
        return o.queryengine_startTransaction(this.__wbg_ptr, _, i, c, u, a2, d2);
      }
      commitTransaction(t, n, r) {
        const _ = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s, c = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), u = s, a2 = f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), d2 = s;
        return o.queryengine_commitTransaction(this.__wbg_ptr, _, i, c, u, a2, d2);
      }
      rollbackTransaction(t, n, r) {
        const _ = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s, c = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), u = s, a2 = f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), d2 = s;
        return o.queryengine_rollbackTransaction(this.__wbg_ptr, _, i, c, u, a2, d2);
      }
      metrics(t) {
        const n = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), r = s;
        return o.queryengine_metrics(this.__wbg_ptr, n, r);
      }
      trace(t) {
        const n = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), r = s;
        return o.queryengine_trace(this.__wbg_ptr, n, r);
      }
    };
    function H(e, t) {
      const n = String(t), r = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), _ = s;
      l().setInt32(e + 4 * 1, _, true), l().setInt32(e + 4 * 0, r, true);
    }
    __name(H, "H");
    function J(e) {
      return e.buffer;
    }
    __name(J, "J");
    function K() {
      return g(function(e, t) {
        return e.call(t);
      }, arguments);
    }
    __name(K, "K");
    function X() {
      return g(function(e, t, n) {
        return e.call(t, n);
      }, arguments);
    }
    __name(X, "X");
    function Y(e) {
      return e.crypto;
    }
    __name(Y, "Y");
    function Z(e) {
      return e.done;
    }
    __name(Z, "Z");
    function ee(e) {
      return Object.entries(e);
    }
    __name(ee, "ee");
    function te(e, t, n) {
      const r = e.exec(w(t, n));
      return b2(r) ? 0 : x2(r);
    }
    __name(te, "te");
    function ne() {
      return g(function(e, t) {
        e.getRandomValues(t);
      }, arguments);
    }
    __name(ne, "ne");
    function re(e) {
      return e.getTime();
    }
    __name(re, "re");
    function oe() {
      return g(function(e, t) {
        return Reflect.get(e, t);
      }, arguments);
    }
    __name(oe, "oe");
    function _e(e, t) {
      return e[t >>> 0];
    }
    __name(_e, "_e");
    function ce2() {
      return g(function(e, t) {
        return e[t];
      }, arguments);
    }
    __name(ce2, "ce");
    function ie2(e, t) {
      return e[t];
    }
    __name(ie2, "ie");
    function ue() {
      return g(function(e, t) {
        return Reflect.has(e, t);
      }, arguments);
    }
    __name(ue, "ue");
    function se(e) {
      let t;
      try {
        t = e instanceof ArrayBuffer;
      } catch {
        t = false;
      }
      return t;
    }
    __name(se, "se");
    function fe(e) {
      let t;
      try {
        t = e instanceof Map;
      } catch {
        t = false;
      }
      return t;
    }
    __name(fe, "fe");
    function ae(e) {
      let t;
      try {
        t = e instanceof Promise;
      } catch {
        t = false;
      }
      return t;
    }
    __name(ae, "ae");
    function be2(e) {
      let t;
      try {
        t = e instanceof Uint8Array;
      } catch {
        t = false;
      }
      return t;
    }
    __name(be2, "be");
    function ge2(e) {
      return Array.isArray(e);
    }
    __name(ge2, "ge");
    function le(e) {
      return Number.isSafeInteger(e);
    }
    __name(le, "le");
    function de() {
      return Symbol.iterator;
    }
    __name(de, "de");
    function we(e) {
      return Object.keys(e);
    }
    __name(we, "we");
    function pe(e) {
      return e.length;
    }
    __name(pe, "pe");
    function xe(e) {
      return e.length;
    }
    __name(xe, "xe");
    function ye(e) {
      return e.msCrypto;
    }
    __name(ye, "ye");
    function me() {
      return /* @__PURE__ */ new Date();
    }
    __name(me, "me");
    function he(e, t) {
      try {
        var n = { a: e, b: t }, r = /* @__PURE__ */ __name((i, c) => {
          const u = n.a;
          n.a = 0;
          try {
            return G2(u, n.b, i, c);
          } finally {
            n.a = u;
          }
        }, "r");
        return new Promise(r);
      } finally {
        n.a = n.b = 0;
      }
    }
    __name(he, "he");
    function Te() {
      return new Object();
    }
    __name(Te, "Te");
    function qe() {
      return /* @__PURE__ */ new Map();
    }
    __name(qe, "qe");
    function Se2(e, t, n, r) {
      return new RegExp(w(e, t), w(n, r));
    }
    __name(Se2, "Se");
    function Ae() {
      return new Array();
    }
    __name(Ae, "Ae");
    function Ie2(e) {
      return new Uint8Array(e);
    }
    __name(Ie2, "Ie");
    function Ee(e, t) {
      return new m2(w(e, t));
    }
    __name(Ee, "Ee");
    function Oe(e, t, n) {
      return new Uint8Array(e, t >>> 0, n >>> 0);
    }
    __name(Oe, "Oe");
    function Fe2(e) {
      return new Uint8Array(e >>> 0);
    }
    __name(Fe2, "Fe");
    function Me(e) {
      return e.next;
    }
    __name(Me, "Me");
    function je() {
      return g(function(e) {
        return e.next();
      }, arguments);
    }
    __name(je, "je");
    function ke(e) {
      return e.node;
    }
    __name(ke, "ke");
    function De(e) {
      return e.now();
    }
    __name(De, "De");
    function Re() {
      return Date.now();
    }
    __name(Re, "Re");
    function Be() {
      return g(function() {
        return Date.now();
      }, arguments);
    }
    __name(Be, "Be");
    function Ue(e) {
      return e.process;
    }
    __name(Ue, "Ue");
    function Le(e, t) {
      return e.push(t);
    }
    __name(Le, "Le");
    function ve(e) {
      return e.queueMicrotask;
    }
    __name(ve, "ve");
    function Ne(e) {
      queueMicrotask(e);
    }
    __name(Ne, "Ne");
    function $e2() {
      return g(function(e, t) {
        e.randomFillSync(t);
      }, arguments);
    }
    __name($e2, "$e");
    function Ce2() {
      return g(function() {
        return module.require;
      }, arguments);
    }
    __name(Ce2, "Ce");
    function Ve(e) {
      return Promise.resolve(e);
    }
    __name(Ve, "Ve");
    function ze(e, t) {
      return setTimeout(e, t >>> 0);
    }
    __name(ze, "ze");
    function We(e, t, n) {
      e[t >>> 0] = n;
    }
    __name(We, "We");
    function Pe(e, t, n) {
      e[t] = n;
    }
    __name(Pe, "Pe");
    function Ge2(e, t, n) {
      e.set(t, n >>> 0);
    }
    __name(Ge2, "Ge");
    function Qe(e, t, n) {
      return e.set(t, n);
    }
    __name(Qe, "Qe");
    function He2() {
      return g(function(e, t, n) {
        return Reflect.set(e, t, n);
      }, arguments);
    }
    __name(He2, "He");
    function Je2() {
      const e = typeof global > "u" ? null : global;
      return b2(e) ? 0 : x2(e);
    }
    __name(Je2, "Je");
    function Ke() {
      const e = typeof globalThis > "u" ? null : globalThis;
      return b2(e) ? 0 : x2(e);
    }
    __name(Ke, "Ke");
    function Xe2() {
      const e = typeof self > "u" ? null : self;
      return b2(e) ? 0 : x2(e);
    }
    __name(Xe2, "Xe");
    function Ye() {
      const e = typeof window > "u" ? null : window;
      return b2(e) ? 0 : x2(e);
    }
    __name(Ye, "Ye");
    function Ze(e, t, n) {
      return e.subarray(t >>> 0, n >>> 0);
    }
    __name(Ze, "Ze");
    function et2(e, t) {
      return e.then(t);
    }
    __name(et2, "et");
    function tt2(e, t, n) {
      return e.then(t, n);
    }
    __name(tt2, "tt");
    function nt2(e) {
      return e.valueOf();
    }
    __name(nt2, "nt");
    function rt2(e) {
      return e.value;
    }
    __name(rt2, "rt");
    function ot2(e) {
      return e.versions;
    }
    __name(ot2, "ot");
    function _t3(e) {
      return +e;
    }
    __name(_t3, "_t");
    function ct2(e) {
      return e;
    }
    __name(ct2, "ct");
    function it2(e) {
      return BigInt.asUintN(64, e);
    }
    __name(it2, "it");
    function ut2(e, t) {
      const n = t, r = typeof n == "bigint" ? n : void 0;
      l().setBigInt64(e + 8 * 1, b2(r) ? BigInt(0) : r, true), l().setInt32(e + 4 * 0, !b2(r), true);
    }
    __name(ut2, "ut");
    function st(e) {
      const t = e;
      return typeof t == "boolean" ? t ? 1 : 0 : 2;
    }
    __name(st, "st");
    function ft(e) {
      const t = e.original;
      return t.cnt-- == 1 ? (t.a = 0, true) : false;
    }
    __name(ft, "ft");
    function at(e, t, n) {
      return V(e, t, 590, P);
    }
    __name(at, "at");
    function bt2(e, t) {
      const n = A(t), r = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), _ = s;
      l().setInt32(e + 4 * 1, _, true), l().setInt32(e + 4 * 0, r, true);
    }
    __name(bt2, "bt");
    function gt3(e, t) {
      return new Error(w(e, t));
    }
    __name(gt3, "gt");
    function lt(e, t) {
      return e in t;
    }
    __name(lt, "lt");
    function dt() {
      const e = o.__wbindgen_export_4, t = e.grow(4);
      e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
    }
    __name(dt, "dt");
    function wt2(e) {
      return typeof e == "bigint";
    }
    __name(wt2, "wt");
    function pt(e) {
      return typeof e == "function";
    }
    __name(pt, "pt");
    function xt(e) {
      const t = e;
      return typeof t == "object" && t !== null;
    }
    __name(xt, "xt");
    function yt2(e) {
      return typeof e == "string";
    }
    __name(yt2, "yt");
    function mt2(e) {
      return e === void 0;
    }
    __name(mt2, "mt");
    function ht(e, t) {
      return e === t;
    }
    __name(ht, "ht");
    function Tt(e, t) {
      return e == t;
    }
    __name(Tt, "Tt");
    function qt() {
      return o.memory;
    }
    __name(qt, "qt");
    function St(e, t) {
      const n = t, r = typeof n == "number" ? n : void 0;
      l().setFloat64(e + 8 * 1, b2(r) ? 0 : r, true), l().setInt32(e + 4 * 0, !b2(r), true);
    }
    __name(St, "St");
    function At2(e) {
      return e;
    }
    __name(At2, "At");
    function It(e, t) {
      const n = t, r = typeof n == "string" ? n : void 0;
      var _ = b2(r) ? 0 : f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s;
      l().setInt32(e + 4 * 1, i, true), l().setInt32(e + 4 * 0, _, true);
    }
    __name(It, "It");
    function Et(e, t) {
      return w(e, t);
    }
    __name(Et, "Et");
    function Ot(e, t) {
      throw new Error(w(e, t));
    }
    __name(Ot, "Ot");
  }
});

// node_modules/.prisma/client/wasm-worker-loader.mjs
var wasm_worker_loader_exports = {};
__export(wasm_worker_loader_exports, {
  default: () => wasm_worker_loader_default
});
var wasm_worker_loader_default;
var init_wasm_worker_loader = __esm({
  "node_modules/.prisma/client/wasm-worker-loader.mjs"() {
    wasm_worker_loader_default = import("./709b60714c2f002822f28ae0e3973d989f92b3b0-query_engine_bg.wasm");
  }
});

// node_modules/.prisma/client/wasm.js
var require_wasm = __commonJS({
  "node_modules/.prisma/client/wasm.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      getPrismaClient: getPrismaClient3,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw3,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug3,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2,
      createParam: createParam2
    } = require_wasm_engine_edge();
    var Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "6.15.0",
      engine: "85179d7826409ee107a6ba334b5e305ae3fba9fb"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join2;
    Prisma.raw = raw3;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      email: "email",
      passwordHash: "passwordHash",
      qiancaiDouBalance: "qiancaiDouBalance",
      firstName: "firstName",
      lastName: "lastName",
      avatarUrl: "avatarUrl",
      avatarData: "avatarData",
      avatarMimeType: "avatarMimeType",
      avatarSize: "avatarSize",
      language: "language",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.QiancaiDouTransactionScalarFieldEnum = {
      id: "id",
      userId: "userId",
      amount: "amount",
      newBalance: "newBalance",
      reason: "reason",
      description: "description",
      refTable: "refTable",
      refId: "refId",
      createdAt: "createdAt",
      type: "type",
      direction: "direction",
      balanceBefore: "balanceBefore",
      balanceAfter: "balanceAfter",
      orderId: "orderId"
    };
    exports.Prisma.ProductScalarFieldEnum = {
      id: "id",
      title: "title",
      description: "description",
      images: "images",
      priceInQiancaiDou: "priceInQiancaiDou",
      stock: "stock",
      category: "category",
      isActive: "isActive",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.OrderScalarFieldEnum = {
      id: "id",
      userId: "userId",
      totalCost: "totalCost",
      status: "status",
      payMethod: "payMethod",
      shippingAddressId: "shippingAddressId",
      trackingNumber: "trackingNumber",
      estimatedDelivery: "estimatedDelivery",
      note: "note",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      paidAt: "paidAt",
      cancelledAt: "cancelledAt",
      fulfilledAt: "fulfilledAt",
      refundedAt: "refundedAt"
    };
    exports.Prisma.OrderItemScalarFieldEnum = {
      id: "id",
      orderId: "orderId",
      productId: "productId",
      quantity: "quantity",
      unitPrice: "unitPrice",
      totalPrice: "totalPrice"
    };
    exports.Prisma.OfflineCourseScalarFieldEnum = {
      id: "id",
      title: "title",
      description: "description",
      instructor: "instructor",
      category: "category",
      duration: "duration",
      imageUrl: "imageUrl",
      isActive: "isActive",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.CourseScheduleScalarFieldEnum = {
      id: "id",
      courseId: "courseId",
      startTime: "startTime",
      endTime: "endTime",
      location: "location",
      capacity: "capacity",
      bookedSlots: "bookedSlots",
      feeInQiancaiDou: "feeInQiancaiDou",
      isActive: "isActive",
      createdAt: "createdAt"
    };
    exports.Prisma.UserAppointmentScalarFieldEnum = {
      id: "id",
      userId: "userId",
      scheduleId: "scheduleId",
      status: "status",
      note: "note",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.LearningRegistrationScalarFieldEnum = {
      id: "id",
      userId: "userId",
      itemId: "itemId",
      itemType: "itemType",
      title: "title",
      subtitle: "subtitle",
      category: "category",
      status: "status",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.TravelPostScalarFieldEnum = {
      id: "id",
      title: "title",
      content: "content",
      summary: "summary",
      category: "category",
      subcategory: "subcategory",
      tags: "tags",
      imageUrl: "imageUrl",
      images: "images",
      author: "author",
      isPublished: "isPublished",
      viewCount: "viewCount",
      packageId: "packageId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.TravelPackageScalarFieldEnum = {
      id: "id",
      title: "title",
      description: "description",
      category: "category",
      subcategory: "subcategory",
      durationDays: "durationDays",
      maxParticipants: "maxParticipants",
      currentParticipants: "currentParticipants",
      startDate: "startDate",
      endDate: "endDate",
      location: "location",
      imageUrl: "imageUrl",
      images: "images",
      tags: "tags",
      isActive: "isActive",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.TravelRegistrationScalarFieldEnum = {
      id: "id",
      userId: "userId",
      packageId: "packageId",
      title: "title",
      subtitle: "subtitle",
      category: "category",
      status: "status",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.AccountScalarFieldEnum = {
      id: "id",
      userId: "userId",
      availableBalance: "availableBalance",
      lockedBalance: "lockedBalance",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.CartScalarFieldEnum = {
      id: "id",
      userId: "userId",
      itemsCount: "itemsCount",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.CartItemScalarFieldEnum = {
      id: "id",
      cartId: "cartId",
      productId: "productId",
      quantity: "quantity"
    };
    exports.Prisma.InventoryLockScalarFieldEnum = {
      id: "id",
      orderId: "orderId",
      productId: "productId",
      quantity: "quantity",
      status: "status",
      expiresAt: "expiresAt",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.AddressScalarFieldEnum = {
      id: "id",
      userId: "userId",
      receiverName: "receiverName",
      phone: "phone",
      province: "province",
      city: "city",
      district: "district",
      detail: "detail",
      zip: "zip",
      isDefault: "isDefault",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.ShipmentScalarFieldEnum = {
      id: "id",
      orderId: "orderId",
      carrier: "carrier",
      trackingNo: "trackingNo",
      status: "status",
      shippedAt: "shippedAt",
      deliveredAt: "deliveredAt",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.ShippingTrackScalarFieldEnum = {
      id: "id",
      orderId: "orderId",
      status: "status",
      description: "description",
      location: "location",
      timestamp: "timestamp"
    };
    exports.Prisma.AppSettingScalarFieldEnum = {
      key: "key",
      value: "value",
      updatedAt: "updatedAt"
    };
    exports.Prisma.StudyAbroadServiceScalarFieldEnum = {
      id: "id",
      serviceName: "serviceName",
      description: "description",
      serviceType: "serviceType",
      durationWeeks: "durationWeeks",
      priceUsd: "priceUsd",
      isActive: "isActive",
      createdAt: "createdAt"
    };
    exports.Prisma.SummerCampScalarFieldEnum = {
      id: "id",
      name: "name",
      location: "location",
      description: "description",
      imageUrl: "imageUrl",
      startDate: "startDate",
      endDate: "endDate",
      ageRange: "ageRange",
      priceUsd: "priceUsd",
      maxParticipants: "maxParticipants",
      isActive: "isActive",
      createdAt: "createdAt"
    };
    exports.Prisma.UserStudyAbroadRegistrationScalarFieldEnum = {
      id: "id",
      userId: "userId",
      serviceId: "serviceId",
      registrationStatus: "registrationStatus",
      registeredAt: "registeredAt",
      cancelledAt: "cancelledAt",
      completedAt: "completedAt"
    };
    exports.Prisma.UserSummerCampRegistrationScalarFieldEnum = {
      id: "id",
      userId: "userId",
      summerCampId: "summerCampId",
      registrationStatus: "registrationStatus",
      registeredAt: "registeredAt",
      cancelledAt: "cancelledAt",
      completedAt: "completedAt"
    };
    exports.Prisma.FeedbackScalarFieldEnum = {
      id: "id",
      userId: "userId",
      title: "title",
      content: "content",
      category: "category",
      status: "status",
      priority: "priority",
      adminReply: "adminReply",
      adminRepliedAt: "adminRepliedAt",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.PayMethod = exports.$Enums.PayMethod = {
      QIANCAIDOU: "QIANCAIDOU"
    };
    exports.InventoryLockStatus = exports.$Enums.InventoryLockStatus = {
      LOCKED: "LOCKED",
      RELEASED: "RELEASED",
      CONSUMED: "CONSUMED"
    };
    exports.ShipmentStatus = exports.$Enums.ShipmentStatus = {
      PENDING: "PENDING",
      SHIPPED: "SHIPPED",
      DELIVERED: "DELIVERED"
    };
    exports.OrderStatus = exports.$Enums.OrderStatus = {
      PENDING: "PENDING",
      PAID: "PAID",
      PROCESSING: "PROCESSING",
      SHIPPED: "SHIPPED",
      DELIVERED: "DELIVERED",
      CANCELLED: "CANCELLED",
      REFUNDED: "REFUNDED"
    };
    exports.QiancaiDouTransactionType = exports.$Enums.QiancaiDouTransactionType = {
      EARN: "EARN",
      SPEND: "SPEND",
      REFUND: "REFUND",
      LOCK: "LOCK",
      UNLOCK: "UNLOCK",
      ADJUST: "ADJUST"
    };
    exports.TransactionDirection = exports.$Enums.TransactionDirection = {
      CREDIT: "CREDIT",
      DEBIT: "DEBIT"
    };
    exports.Prisma.ModelName = {
      User: "User",
      QiancaiDouTransaction: "QiancaiDouTransaction",
      Product: "Product",
      Order: "Order",
      OrderItem: "OrderItem",
      OfflineCourse: "OfflineCourse",
      CourseSchedule: "CourseSchedule",
      UserAppointment: "UserAppointment",
      LearningRegistration: "LearningRegistration",
      TravelPost: "TravelPost",
      TravelPackage: "TravelPackage",
      TravelRegistration: "TravelRegistration",
      Account: "Account",
      Cart: "Cart",
      CartItem: "CartItem",
      InventoryLock: "InventoryLock",
      Address: "Address",
      Shipment: "Shipment",
      ShippingTrack: "ShippingTrack",
      AppSetting: "AppSetting",
      StudyAbroadService: "StudyAbroadService",
      SummerCamp: "SummerCamp",
      UserStudyAbroadRegistration: "UserStudyAbroadRegistration",
      UserSummerCampRegistration: "UserSummerCampRegistration",
      Feedback: "Feedback"
    };
    var config = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "C:\\Users\\Administrator\\Documents\\GitHub\\Qianfu-Lottery\\backend\\node_modules\\@prisma\\client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "windows",
            "native": true
          }
        ],
        "previewFeatures": [
          "driverAdapters"
        ],
        "sourceFilePath": "C:\\Users\\Administrator\\Documents\\GitHub\\Qianfu-Lottery\\backend\\prisma\\schema.prisma"
      },
      "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../../.env"
      },
      "relativePath": "../../../prisma",
      "clientVersion": "6.15.0",
      "engineVersion": "85179d7826409ee107a6ba334b5e305ae3fba9fb",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "postgresql",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": 'generator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\n// \u7528\u6237\u6A21\u578B\nmodel User {\n  id                Int      @id @default(autoincrement())\n  email             String   @unique\n  passwordHash      String\n  qiancaiDouBalance Int      @default(0)\n  firstName         String?\n  lastName          String?\n  avatarUrl         String?\n  avatarData        String? // Base64\u7F16\u7801\u7684\u5934\u50CF\u6570\u636E\n  avatarMimeType    String? // \u5934\u50CFMIME\u7C7B\u578B\n  avatarSize        Int? // \u5934\u50CF\u6587\u4EF6\u5927\u5C0F\uFF08\u5B57\u8282\uFF09\n  language          String   @default("zh")\n  createdAt         DateTime @default(now())\n  updatedAt         DateTime @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  qiancaiDouTransactions   QiancaiDouTransaction[]\n  orders                   Order[]\n  appointments             UserAppointment[]\n  learningRegistrations    LearningRegistration[]\n  travelRegistrations      TravelRegistration[]\n  account                  Account?\n  carts                    Cart[]\n  addresses                Address[]\n  studyAbroadRegistrations UserStudyAbroadRegistration[]\n  summerCampRegistrations  UserSummerCampRegistration[]\n  feedbacks                Feedback[]\n\n  @@map("users")\n}\n\n// \u5343\u5F69\u8C46\u4EA4\u6613\u8BB0\u5F55\nmodel QiancaiDouTransaction {\n  id            Int                        @id @default(autoincrement())\n  userId        Int\n  user          User                       @relation(fields: [userId], references: [id], onDelete: Cascade)\n  amount        Int // \u6B63\u6570\u4E3A\u589E\u52A0\uFF0C\u8D1F\u6570\u4E3A\u51CF\u5C11\n  newBalance    Int // \u4EA4\u6613\u540E\u7684\u4F59\u989D\n  reason        String // \u4EA4\u6613\u539F\u56E0: ADMIN_ADJUSTMENT, PRODUCT_REDEMPTION, APPOINTMENT_FEE, TASK_REWARD\n  description   String? // \u8BE6\u7EC6\u63CF\u8FF0\n  refTable      String? // \u5173\u8054\u8868\u540D\n  refId         String? // \u5173\u8054\u8BB0\u5F55ID\n  createdAt     DateTime                   @default(now())\n  // \u65B0\u589E\u5B57\u6BB5\uFF08\u5411\u540E\u517C\u5BB9\uFF0C\u53EF\u4E3A\u7A7A\uFF09\n  type          QiancaiDouTransactionType?\n  direction     TransactionDirection?\n  balanceBefore Int?\n  balanceAfter  Int?\n  orderId       Int?\n  order         Order?                     @relation(fields: [orderId], references: [id])\n\n  @@map("qiancaidou_transactions")\n}\n\n// \u5546\u54C1\u6A21\u578B\nmodel Product {\n  id                Int      @id @default(autoincrement())\n  title             String\n  description       String\n  images            String[] @default([])\n  priceInQiancaiDou Int // \u5343\u5F69\u8C46\u4EF7\u683C\n  stock             Int      @default(0)\n  category          String   @default("general")\n  isActive          Boolean  @default(true)\n  createdAt         DateTime @default(now())\n  updatedAt         DateTime @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  orderItems     OrderItem[]\n  cartItems      CartItem[]\n  inventoryLocks InventoryLock[]\n\n  @@map("products")\n}\n\n// \u8BA2\u5355\u6A21\u578B\nmodel Order {\n  id                Int         @id @default(autoincrement())\n  userId            Int\n  user              User        @relation(fields: [userId], references: [id])\n  totalCost         Int // \u603B\u5343\u5F69\u8C46\u6D88\u8D39\n  status            OrderStatus @default(PENDING) // PENDING, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED\n  payMethod         PayMethod   @default(QIANCAIDOU)\n  shippingAddressId Int? // \u914D\u9001\u5730\u5740ID\n  trackingNumber    String? // \u7269\u6D41\u5355\u53F7\n  estimatedDelivery DateTime? // \u9884\u8BA1\u9001\u8FBE\u65F6\u95F4\n  note              String?\n  createdAt         DateTime    @default(now())\n  updatedAt         DateTime    @updatedAt\n  paidAt            DateTime?\n  cancelledAt       DateTime?\n  fulfilledAt       DateTime?\n  refundedAt        DateTime?\n\n  // \u5173\u8054\u5173\u7CFB\n  items           OrderItem[]\n  inventoryLocks  InventoryLock[]\n  transactions    QiancaiDouTransaction[]\n  shipment        Shipment?\n  shippingAddress Address?                @relation("OrderShippingAddress", fields: [shippingAddressId], references: [id])\n  shippingTracks  ShippingTrack[]\n\n  @@map("orders")\n}\n\n// \u8BA2\u5355\u9879\u76EE\nmodel OrderItem {\n  id         Int     @id @default(autoincrement())\n  orderId    Int\n  order      Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  productId  Int\n  product    Product @relation(fields: [productId], references: [id])\n  quantity   Int\n  unitPrice  Int // \u5355\u4EF7\uFF08\u5343\u5F69\u8C46\uFF09\n  totalPrice Int // \u5C0F\u8BA1\uFF08\u5343\u5F69\u8C46\uFF09\n\n  @@map("order_items")\n}\n\n// \u7EBF\u4E0B\u8BFE\u7A0B\nmodel OfflineCourse {\n  id          Int      @id @default(autoincrement())\n  title       String\n  description String\n  instructor  String?\n  category    String // AI\u7F16\u7A0B\u5B66\u4E60, \u82F1\u8BED\u5B66\u4E60, \u7559\u5B66\u54A8\u8BE2, \u590F\u4EE4\u8425\n  duration    Int? // \u8BFE\u7A0B\u65F6\u957F\uFF08\u5206\u949F\uFF09\n  imageUrl    String?\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  schedules CourseSchedule[]\n\n  @@map("offline_courses")\n}\n\n// \u8BFE\u7A0B\u65F6\u95F4\u5B89\u6392\nmodel CourseSchedule {\n  id              Int           @id @default(autoincrement())\n  courseId        Int\n  course          OfflineCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)\n  startTime       DateTime\n  endTime         DateTime\n  location        String? // \u4E0A\u8BFE\u5730\u70B9\n  capacity        Int           @default(10)\n  bookedSlots     Int           @default(0)\n  feeInQiancaiDou Int           @default(0) // \u9884\u7EA6\u8D39\u7528\uFF08\u4FDD\u7559\u4F46\u4E0D\u518D\u4F7F\u7528\uFF09\n  isActive        Boolean       @default(true)\n  createdAt       DateTime      @default(now())\n\n  // \u5173\u8054\u5173\u7CFB\n  appointments UserAppointment[]\n\n  @@map("course_schedules")\n}\n\n// \u7528\u6237\u9884\u7EA6/\u6CE8\u518C\nmodel UserAppointment {\n  id         Int            @id @default(autoincrement())\n  userId     Int\n  user       User           @relation(fields: [userId], references: [id])\n  scheduleId Int\n  schedule   CourseSchedule @relation(fields: [scheduleId], references: [id])\n  status     String         @default("REGISTERED") // REGISTERED, CANCELLED, COMPLETED, NO_SHOW\n  note       String? // \u7528\u6237\u5907\u6CE8\n  createdAt  DateTime       @default(now())\n  updatedAt  DateTime       @updatedAt\n\n  @@unique([userId, scheduleId])\n  @@map("user_appointments")\n}\n\n// \u5B66\u4E60\u5F69\u6CE8\u518C\nmodel LearningRegistration {\n  id        Int      @id @default(autoincrement())\n  userId    Int      @map("user_id")\n  user      User     @relation(fields: [userId], references: [id])\n  itemId    String   @map("item_id") // \u8BFE\u7A0B/\u670D\u52A1/\u590F\u4EE4\u8425\u7684ID\n  itemType  String   @map("item_type") // course, service, camp\n  title     String\n  subtitle  String\n  category  String\n  status    String   @default("REGISTERED") // REGISTERED, CANCELLED, COMPLETED\n  createdAt DateTime @default(now()) @map("created_at")\n  updatedAt DateTime @updatedAt @map("updated_at")\n\n  @@unique([userId, itemId, itemType])\n  @@map("learning_registrations")\n}\n\n// \u65C5\u6E38\u6587\u7AE0\nmodel TravelPost {\n  id          Int            @id @default(autoincrement())\n  title       String\n  content     String\n  summary     String?\n  category    String // DOMESTIC, INTERNATIONAL\n  subcategory String? // \u6587\u5316\u4F53\u9A8C, \u81EA\u7136\u98CE\u5149, \u57CE\u5E02\u63A2\u7D22 \u7B49\n  tags        String[]       @default([])\n  imageUrl    String?\n  images      String[]       @default([])\n  author      String?\n  isPublished Boolean        @default(false)\n  viewCount   Int            @default(0)\n  packageId   Int? // \u5173\u8054\u65C5\u6E38\u5957\u9910\n  package     TravelPackage? @relation(fields: [packageId], references: [id])\n  createdAt   DateTime       @default(now())\n  updatedAt   DateTime       @updatedAt\n\n  @@map("travel_posts")\n}\n\n// \u65C5\u6E38\u5957\u9910\nmodel TravelPackage {\n  id                  Int       @id @default(autoincrement())\n  title               String\n  description         String?\n  category            String // DOMESTIC, INTERNATIONAL\n  subcategory         String? // \u6587\u5316\u4F53\u9A8C, \u81EA\u7136\u98CE\u5149, \u57CE\u5E02\u63A2\u7D22 \u7B49\n  durationDays        Int? // \u884C\u7A0B\u5929\u6570\n  maxParticipants     Int       @default(20) // \u6700\u5927\u53C2\u4E0E\u4EBA\u6570\n  currentParticipants Int       @default(0) // \u5F53\u524D\u53C2\u4E0E\u4EBA\u6570\n  startDate           DateTime? // \u51FA\u53D1\u65E5\u671F\n  endDate             DateTime? // \u7ED3\u675F\u65E5\u671F\n  location            String? // \u76EE\u7684\u5730\n  imageUrl            String? // \u4E3B\u56FE\u7247\n  images              String[]  @default([]) // \u56FE\u7247\u6570\u7EC4\n  tags                String[]  @default([]) // \u6807\u7B7E\u6570\u7EC4\n  isActive            Boolean   @default(true)\n  createdAt           DateTime  @default(now())\n  updatedAt           DateTime  @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  registrations TravelRegistration[]\n  posts         TravelPost[]\n\n  @@map("travel_packages")\n}\n\n// \u65C5\u6E38\u6CE8\u518C\nmodel TravelRegistration {\n  id        Int           @id @default(autoincrement())\n  userId    Int           @map("user_id")\n  user      User          @relation(fields: [userId], references: [id])\n  packageId Int           @map("package_id")\n  package   TravelPackage @relation(fields: [packageId], references: [id], onDelete: Cascade)\n  title     String\n  subtitle  String?\n  category  String\n  status    String        @default("REGISTERED") // REGISTERED, CANCELLED, COMPLETED\n  createdAt DateTime      @default(now()) @map("created_at")\n  updatedAt DateTime      @updatedAt @map("updated_at")\n\n  @@unique([userId, packageId])\n  @@map("travel_registrations")\n}\n\n// \u8D26\u6237\uFF1A\u5343\u5F69\u8C46\u53EF\u7528/\u9501\u5B9A\u4F59\u989D\nmodel Account {\n  id               Int      @id @default(autoincrement())\n  userId           Int      @unique\n  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  availableBalance Int      @default(0)\n  lockedBalance    Int      @default(0)\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  @@map("accounts")\n}\n\n// \u670D\u52A1\u5668\u8D2D\u7269\u8F66\nmodel Cart {\n  id         Int        @id @default(autoincrement())\n  userId     Int        @unique\n  user       User       @relation(fields: [userId], references: [id], onDelete: Cascade)\n  items      CartItem[]\n  itemsCount Int        @default(0)\n  createdAt  DateTime   @default(now())\n  updatedAt  DateTime   @updatedAt\n\n  @@map("carts")\n}\n\nmodel CartItem {\n  id        Int     @id @default(autoincrement())\n  cartId    Int\n  cart      Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)\n  productId Int\n  product   Product @relation(fields: [productId], references: [id])\n  quantity  Int\n\n  @@unique([cartId, productId])\n  @@map("cart_items")\n}\n\n// \u5E93\u5B58\u9501\nmodel InventoryLock {\n  id        Int                 @id @default(autoincrement())\n  orderId   Int\n  order     Order               @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  productId Int\n  product   Product             @relation(fields: [productId], references: [id])\n  quantity  Int\n  status    InventoryLockStatus @default(LOCKED)\n  expiresAt DateTime? // \u9501\u5B9A\u8FC7\u671F\u65F6\u95F4\n  createdAt DateTime            @default(now())\n  updatedAt DateTime            @updatedAt\n\n  @@map("inventory_locks")\n}\n\n// \u5730\u5740\u7C3F\nmodel Address {\n  id           Int      @id @default(autoincrement())\n  userId       Int\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  receiverName String\n  phone        String\n  province     String\n  city         String\n  district     String?\n  detail       String\n  zip          String?\n  isDefault    Boolean  @default(false)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  orders Order[] @relation("OrderShippingAddress")\n\n  @@map("addresses")\n}\n\n// \u53D1\u8D27\u4FE1\u606F\nmodel Shipment {\n  id          Int            @id @default(autoincrement())\n  orderId     Int            @unique\n  order       Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  carrier     String?\n  trackingNo  String?\n  status      ShipmentStatus @default(PENDING)\n  shippedAt   DateTime?\n  deliveredAt DateTime?\n  createdAt   DateTime       @default(now())\n  updatedAt   DateTime       @updatedAt\n\n  @@map("shipments")\n}\n\n// \u7269\u6D41\u8DDF\u8E2A\nmodel ShippingTrack {\n  id          Int      @id @default(autoincrement())\n  orderId     Int\n  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  status      String // \u7269\u6D41\u72B6\u6001\n  description String? // \u72B6\u6001\u63CF\u8FF0\n  location    String? // \u5F53\u524D\u4F4D\u7F6E\n  timestamp   DateTime @default(now())\n\n  @@map("shipping_tracks")\n}\n\n// ===== Enums =====\nenum PayMethod {\n  QIANCAIDOU\n}\n\nenum InventoryLockStatus {\n  LOCKED\n  RELEASED\n  CONSUMED\n}\n\nenum ShipmentStatus {\n  PENDING\n  SHIPPED\n  DELIVERED\n}\n\nenum OrderStatus {\n  PENDING // \u5F85\u652F\u4ED8\n  PAID // \u5DF2\u652F\u4ED8\n  PROCESSING // \u5904\u7406\u4E2D\n  SHIPPED // \u5DF2\u53D1\u8D27\n  DELIVERED // \u5DF2\u9001\u8FBE\n  CANCELLED // \u5DF2\u53D6\u6D88\n  REFUNDED // \u5DF2\u9000\u6B3E\n}\n\nenum QiancaiDouTransactionType {\n  EARN\n  SPEND\n  REFUND\n  LOCK\n  UNLOCK\n  ADJUST\n}\n\nenum TransactionDirection {\n  CREDIT\n  DEBIT\n}\n\n// \u5E94\u7528\u8BBE\u7F6E\uFF08\u952E\u503C\u5BF9\u5B58\u50A8\uFF09\uFF0C\u7528\u4E8E\u653E\u7F6E SEED_TOKEN \u7B49\nmodel AppSetting {\n  key       String   @id\n  value     String\n  updatedAt DateTime @default(now())\n\n  @@map("app_settings")\n}\n\n// \u7559\u5B66\u54A8\u8BE2\u670D\u52A1\nmodel StudyAbroadService {\n  id            Int      @id @default(autoincrement())\n  serviceName   String\n  description   String?\n  serviceType   String // PLANNING, APPLICATION, VISA, PREPARATION, SUPPORT\n  durationWeeks Int?\n  priceUsd      Decimal?\n  isActive      Boolean  @default(true)\n  createdAt     DateTime @default(now())\n\n  // \u5173\u8054\u5173\u7CFB\n  registrations UserStudyAbroadRegistration[]\n\n  @@map("study_abroad_services")\n}\n\n// \u590F\u4EE4\u8425\nmodel SummerCamp {\n  id              Int       @id @default(autoincrement())\n  name            String\n  location        String?\n  description     String?\n  imageUrl        String?\n  startDate       DateTime?\n  endDate         DateTime?\n  ageRange        String?\n  priceUsd        Decimal?\n  maxParticipants Int       @default(30)\n  isActive        Boolean   @default(true)\n  createdAt       DateTime  @default(now())\n\n  // \u5173\u8054\u5173\u7CFB\n  registrations UserSummerCampRegistration[]\n\n  @@map("summer_camps")\n}\n\n// \u7528\u6237\u7559\u5B66\u54A8\u8BE2\u6CE8\u518C\nmodel UserStudyAbroadRegistration {\n  id                 Int                @id @default(autoincrement())\n  userId             Int\n  user               User               @relation(fields: [userId], references: [id], onDelete: Cascade)\n  serviceId          Int\n  service            StudyAbroadService @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n  registrationStatus String             @default("REGISTERED") // REGISTERED, CANCELLED, COMPLETED\n  registeredAt       DateTime           @default(now())\n  cancelledAt        DateTime?\n  completedAt        DateTime?\n\n  @@unique([userId, serviceId])\n  @@map("user_study_abroad_registrations")\n}\n\n// \u7528\u6237\u590F\u4EE4\u8425\u6CE8\u518C\nmodel UserSummerCampRegistration {\n  id                 Int        @id @default(autoincrement())\n  userId             Int\n  user               User       @relation(fields: [userId], references: [id], onDelete: Cascade)\n  summerCampId       Int\n  summerCamp         SummerCamp @relation(fields: [summerCampId], references: [id], onDelete: Cascade)\n  registrationStatus String     @default("REGISTERED") // REGISTERED, CANCELLED, COMPLETED\n  registeredAt       DateTime   @default(now())\n  cancelledAt        DateTime?\n  completedAt        DateTime?\n\n  @@unique([userId, summerCampId])\n  @@map("user_summer_camp_registrations")\n}\n\n// \u7528\u6237\u53CD\u9988\nmodel Feedback {\n  id             Int       @id @default(autoincrement())\n  userId         Int       @map("user_id")\n  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  title          String\n  content        String\n  category       String // general, bug, feature, suggestion, complaint\n  status         String    @default("pending") // pending, in_progress, resolved, closed\n  priority       String    @default("medium") // low, medium, high, urgent\n  adminReply     String?   @map("admin_reply")\n  adminRepliedAt DateTime? @map("admin_replied_at")\n  createdAt      DateTime  @default(now()) @map("created_at")\n  updatedAt      DateTime  @updatedAt @map("updated_at")\n\n  @@map("feedback")\n}\n',
      "inlineSchemaHash": "9af2294db7ae74e9d9699a3d8902ec486632e77e1b10a0720a020a91cca2b80d",
      "copyEngine": true
    };
    config.dirname = "/";
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"email","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String"},{"name":"qiancaiDouBalance","kind":"scalar","type":"Int"},{"name":"firstName","kind":"scalar","type":"String"},{"name":"lastName","kind":"scalar","type":"String"},{"name":"avatarUrl","kind":"scalar","type":"String"},{"name":"avatarData","kind":"scalar","type":"String"},{"name":"avatarMimeType","kind":"scalar","type":"String"},{"name":"avatarSize","kind":"scalar","type":"Int"},{"name":"language","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"qiancaiDouTransactions","kind":"object","type":"QiancaiDouTransaction","relationName":"QiancaiDouTransactionToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"appointments","kind":"object","type":"UserAppointment","relationName":"UserToUserAppointment"},{"name":"learningRegistrations","kind":"object","type":"LearningRegistration","relationName":"LearningRegistrationToUser"},{"name":"travelRegistrations","kind":"object","type":"TravelRegistration","relationName":"TravelRegistrationToUser"},{"name":"account","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"addresses","kind":"object","type":"Address","relationName":"AddressToUser"},{"name":"studyAbroadRegistrations","kind":"object","type":"UserStudyAbroadRegistration","relationName":"UserToUserStudyAbroadRegistration"},{"name":"summerCampRegistrations","kind":"object","type":"UserSummerCampRegistration","relationName":"UserToUserSummerCampRegistration"},{"name":"feedbacks","kind":"object","type":"Feedback","relationName":"FeedbackToUser"}],"dbName":"users"},"QiancaiDouTransaction":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"QiancaiDouTransactionToUser"},{"name":"amount","kind":"scalar","type":"Int"},{"name":"newBalance","kind":"scalar","type":"Int"},{"name":"reason","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"refTable","kind":"scalar","type":"String"},{"name":"refId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"type","kind":"enum","type":"QiancaiDouTransactionType"},{"name":"direction","kind":"enum","type":"TransactionDirection"},{"name":"balanceBefore","kind":"scalar","type":"Int"},{"name":"balanceAfter","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToQiancaiDouTransaction"}],"dbName":"qiancaidou_transactions"},"Product":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"priceInQiancaiDou","kind":"scalar","type":"Int"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"category","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToProduct"},{"name":"inventoryLocks","kind":"object","type":"InventoryLock","relationName":"InventoryLockToProduct"}],"dbName":"products"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"totalCost","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"payMethod","kind":"enum","type":"PayMethod"},{"name":"shippingAddressId","kind":"scalar","type":"Int"},{"name":"trackingNumber","kind":"scalar","type":"String"},{"name":"estimatedDelivery","kind":"scalar","type":"DateTime"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"cancelledAt","kind":"scalar","type":"DateTime"},{"name":"fulfilledAt","kind":"scalar","type":"DateTime"},{"name":"refundedAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"inventoryLocks","kind":"object","type":"InventoryLock","relationName":"InventoryLockToOrder"},{"name":"transactions","kind":"object","type":"QiancaiDouTransaction","relationName":"OrderToQiancaiDouTransaction"},{"name":"shipment","kind":"object","type":"Shipment","relationName":"OrderToShipment"},{"name":"shippingAddress","kind":"object","type":"Address","relationName":"OrderShippingAddress"},{"name":"shippingTracks","kind":"object","type":"ShippingTrack","relationName":"OrderToShippingTrack"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"Int"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unitPrice","kind":"scalar","type":"Int"},{"name":"totalPrice","kind":"scalar","type":"Int"}],"dbName":"order_items"},"OfflineCourse":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"instructor","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"schedules","kind":"object","type":"CourseSchedule","relationName":"CourseScheduleToOfflineCourse"}],"dbName":"offline_courses"},"CourseSchedule":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"courseId","kind":"scalar","type":"Int"},{"name":"course","kind":"object","type":"OfflineCourse","relationName":"CourseScheduleToOfflineCourse"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"location","kind":"scalar","type":"String"},{"name":"capacity","kind":"scalar","type":"Int"},{"name":"bookedSlots","kind":"scalar","type":"Int"},{"name":"feeInQiancaiDou","kind":"scalar","type":"Int"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"appointments","kind":"object","type":"UserAppointment","relationName":"CourseScheduleToUserAppointment"}],"dbName":"course_schedules"},"UserAppointment":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"UserToUserAppointment"},{"name":"scheduleId","kind":"scalar","type":"Int"},{"name":"schedule","kind":"object","type":"CourseSchedule","relationName":"CourseScheduleToUserAppointment"},{"name":"status","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"user_appointments"},"LearningRegistration":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"LearningRegistrationToUser"},{"name":"itemId","kind":"scalar","type":"String","dbName":"item_id"},{"name":"itemType","kind":"scalar","type":"String","dbName":"item_type"},{"name":"title","kind":"scalar","type":"String"},{"name":"subtitle","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"learning_registrations"},"TravelPost":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"summary","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"subcategory","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"author","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"viewCount","kind":"scalar","type":"Int"},{"name":"packageId","kind":"scalar","type":"Int"},{"name":"package","kind":"object","type":"TravelPackage","relationName":"TravelPackageToTravelPost"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"travel_posts"},"TravelPackage":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"subcategory","kind":"scalar","type":"String"},{"name":"durationDays","kind":"scalar","type":"Int"},{"name":"maxParticipants","kind":"scalar","type":"Int"},{"name":"currentParticipants","kind":"scalar","type":"Int"},{"name":"startDate","kind":"scalar","type":"DateTime"},{"name":"endDate","kind":"scalar","type":"DateTime"},{"name":"location","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"registrations","kind":"object","type":"TravelRegistration","relationName":"TravelPackageToTravelRegistration"},{"name":"posts","kind":"object","type":"TravelPost","relationName":"TravelPackageToTravelPost"}],"dbName":"travel_packages"},"TravelRegistration":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"TravelRegistrationToUser"},{"name":"packageId","kind":"scalar","type":"Int","dbName":"package_id"},{"name":"package","kind":"object","type":"TravelPackage","relationName":"TravelPackageToTravelRegistration"},{"name":"title","kind":"scalar","type":"String"},{"name":"subtitle","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"travel_registrations"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"availableBalance","kind":"scalar","type":"Int"},{"name":"lockedBalance","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"accounts"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"itemsCount","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"carts"},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"cartId","kind":"scalar","type":"Int"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"productId","kind":"scalar","type":"Int"},{"name":"product","kind":"object","type":"Product","relationName":"CartItemToProduct"},{"name":"quantity","kind":"scalar","type":"Int"}],"dbName":"cart_items"},"InventoryLock":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"InventoryLockToOrder"},{"name":"productId","kind":"scalar","type":"Int"},{"name":"product","kind":"object","type":"Product","relationName":"InventoryLockToProduct"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"InventoryLockStatus"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"inventory_locks"},"Address":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"AddressToUser"},{"name":"receiverName","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"province","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"detail","kind":"scalar","type":"String"},{"name":"zip","kind":"scalar","type":"String"},{"name":"isDefault","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderShippingAddress"}],"dbName":"addresses"},"Shipment":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToShipment"},{"name":"carrier","kind":"scalar","type":"String"},{"name":"trackingNo","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ShipmentStatus"},{"name":"shippedAt","kind":"scalar","type":"DateTime"},{"name":"deliveredAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"shipments"},"ShippingTrack":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToShippingTrack"},{"name":"status","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"timestamp","kind":"scalar","type":"DateTime"}],"dbName":"shipping_tracks"},"AppSetting":{"fields":[{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"app_settings"},"StudyAbroadService":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"serviceName","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"serviceType","kind":"scalar","type":"String"},{"name":"durationWeeks","kind":"scalar","type":"Int"},{"name":"priceUsd","kind":"scalar","type":"Decimal"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"registrations","kind":"object","type":"UserStudyAbroadRegistration","relationName":"StudyAbroadServiceToUserStudyAbroadRegistration"}],"dbName":"study_abroad_services"},"SummerCamp":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"startDate","kind":"scalar","type":"DateTime"},{"name":"endDate","kind":"scalar","type":"DateTime"},{"name":"ageRange","kind":"scalar","type":"String"},{"name":"priceUsd","kind":"scalar","type":"Decimal"},{"name":"maxParticipants","kind":"scalar","type":"Int"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"registrations","kind":"object","type":"UserSummerCampRegistration","relationName":"SummerCampToUserSummerCampRegistration"}],"dbName":"summer_camps"},"UserStudyAbroadRegistration":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"UserToUserStudyAbroadRegistration"},{"name":"serviceId","kind":"scalar","type":"Int"},{"name":"service","kind":"object","type":"StudyAbroadService","relationName":"StudyAbroadServiceToUserStudyAbroadRegistration"},{"name":"registrationStatus","kind":"scalar","type":"String"},{"name":"registeredAt","kind":"scalar","type":"DateTime"},{"name":"cancelledAt","kind":"scalar","type":"DateTime"},{"name":"completedAt","kind":"scalar","type":"DateTime"}],"dbName":"user_study_abroad_registrations"},"UserSummerCampRegistration":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"UserToUserSummerCampRegistration"},{"name":"summerCampId","kind":"scalar","type":"Int"},{"name":"summerCamp","kind":"object","type":"SummerCamp","relationName":"SummerCampToUserSummerCampRegistration"},{"name":"registrationStatus","kind":"scalar","type":"String"},{"name":"registeredAt","kind":"scalar","type":"DateTime"},{"name":"cancelledAt","kind":"scalar","type":"DateTime"},{"name":"completedAt","kind":"scalar","type":"DateTime"}],"dbName":"user_summer_camp_registrations"},"Feedback":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int","dbName":"user_id"},{"name":"user","kind":"object","type":"User","relationName":"FeedbackToUser"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"priority","kind":"scalar","type":"String"},{"name":"adminReply","kind":"scalar","type":"String","dbName":"admin_reply"},{"name":"adminRepliedAt","kind":"scalar","type":"DateTime","dbName":"admin_replied_at"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"feedback"}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config.runtimeDataModel);
    config.engineWasm = {
      getRuntime: /* @__PURE__ */ __name(async () => require_query_engine_bg(), "getRuntime"),
      getQueryEngineWasmModule: /* @__PURE__ */ __name(async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const engine = (await loader).default;
        return engine;
      }, "getQueryEngineWasmModule")
    };
    config.compilerWasm = void 0;
    config.injectableEdgeEnv = () => ({
      parsed: {
        DATABASE_URL: typeof globalThis !== "undefined" && globalThis["DATABASE_URL"] || typeof process !== "undefined" && process.env && process.env.DATABASE_URL || void 0
      }
    });
    if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
      Debug3.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
    }
    var PrismaClient2 = getPrismaClient3(config);
    exports.PrismaClient = PrismaClient2;
    Object.assign(exports, Prisma);
  }
});

// node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "node_modules/.prisma/client/default.js"(exports, module) {
    module.exports = { ...require_wasm() };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports, module) {
    module.exports = {
      ...require_default()
    };
  }
});

// node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = Symbol();

// node_modules/hono/dist/utils/body.js
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder2) => {
  try {
    return decoder2(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder2(match);
      } catch {
        return match;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v2, i, a2) => a2.indexOf(v2) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name2 = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name2 = _decodeURI(name2);
    }
    keyIndex = nextKeyIndex;
    if (name2 === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name2] && Array.isArray(results[name2]))) {
        results[name2] = [];
      }
      ;
      results[name2].push(value);
    } else {
      results[name2] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param ? /\%/.test(param) ? tryDecodeURIComponent(param) : param : void 0;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name2) {
    if (name2) {
      return this.raw.headers.get(name2) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw3 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw3[key]();
  }, "#cachedBody");
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw2 = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw2(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v2] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v2);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  header = /* @__PURE__ */ __name((name2, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name2);
    } else if (options?.append) {
      headers.append(name2, value);
    } else {
      headers.set(name2, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v2] of Object.entries(headers)) {
        if (typeof v2 === "string") {
          responseHeaders.set(k, v2);
        } else {
          responseHeaders.delete(k);
          for (const v22 of v2) {
            responseHeaders.append(k, v22);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class {
  static {
    __name(this, "Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p2 of [path].flat()) {
        this.#path = p2;
        for (const m2 of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m2.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a2, b2) {
  if (a2.length === 1) {
    return b2.length === 1 ? a2 < b2 ? -1 : 1 : -1;
  }
  if (b2.length === 1) {
    return 1;
  }
  if (a2 === ONLY_WILDCARD_REG_EXP_STR || a2 === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b2 === ONLY_WILDCARD_REG_EXP_STR || b2 === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a2 === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b2 === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a2.length === b2.length ? a2 < b2 ? -1 : 1 : b2.length - a2.length;
}
__name(compareKey, "compareKey");
var Node = class {
  static {
    __name(this, "Node");
  }
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name2 = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name2 && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node();
        if (name2 !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name2 !== "") {
        paramMap.push([name2, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m2) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m2];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var emptyParam = [];
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a2, b2) => b2.length - a2.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p2) => {
          handlerMap[method][p2] = [...handlerMap[METHOD_NAME_ALL][p2]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m2) => {
          middleware[m2][path] ||= findMiddleware(middleware[m2], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          Object.keys(middleware[m2]).forEach((p2) => {
            re.test(p2) && middleware[m2][p2].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          Object.keys(routes[m2]).forEach(
            (p2) => re.test(p2) && routes[m2][p2].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m2) => {
        if (method === METHOD_NAME_ALL || method === m2) {
          routes[m2][path2] ||= [
            ...findMiddleware(middleware[m2], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m2][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.#buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  #buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init2) {
    this.#routers = init2.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
  static {
    __name(this, "Node");
  }
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m2 = /* @__PURE__ */ Object.create(null);
      m2[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m2];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p2 = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p2, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p2;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v2, i, a2) => a2.indexOf(v2) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m2 = node.#methods[i];
      const handlerSet = m2[method] || m2[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name2, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m2 = matcher.exec(restPathString);
            if (m2) {
              params[name2] = m2[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m2[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name2] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a2, b2) => {
        return a2.score - b2.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/@neondatabase/serverless/index.mjs
var So = Object.create;
var Ie = Object.defineProperty;
var Eo = Object.getOwnPropertyDescriptor;
var Ao = Object.getOwnPropertyNames;
var Co = Object.getPrototypeOf;
var _o = Object.prototype.hasOwnProperty;
var Io = /* @__PURE__ */ __name((r, e, t) => e in r ? Ie(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, "Io");
var a = /* @__PURE__ */ __name((r, e) => Ie(r, "name", { value: e, configurable: true }), "a");
var G = /* @__PURE__ */ __name((r, e) => () => (r && (e = r(r = 0)), e), "G");
var T = /* @__PURE__ */ __name((r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), "T");
var ie = /* @__PURE__ */ __name((r, e) => {
  for (var t in e) Ie(r, t, {
    get: e[t],
    enumerable: true
  });
}, "ie");
var Dn = /* @__PURE__ */ __name((r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function") for (let i of Ao(e)) !_o.call(r, i) && i !== t && Ie(r, i, { get: /* @__PURE__ */ __name(() => e[i], "get"), enumerable: !(n = Eo(e, i)) || n.enumerable });
  return r;
}, "Dn");
var Se = /* @__PURE__ */ __name((r, e, t) => (t = r != null ? So(Co(r)) : {}, Dn(e || !r || !r.__esModule ? Ie(t, "default", { value: r, enumerable: true }) : t, r)), "Se");
var O = /* @__PURE__ */ __name((r) => Dn(Ie({}, "__esModule", { value: true }), r), "O");
var E = /* @__PURE__ */ __name((r, e, t) => Io(r, typeof e != "symbol" ? e + "" : e, t), "E");
var Qn = T((lt) => {
  "use strict";
  p();
  lt.byteLength = Po;
  lt.toByteArray = Ro;
  lt.fromByteArray = ko;
  var ae = [], te = [], To = typeof Uint8Array < "u" ? Uint8Array : Array, qt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Ee = 0, On = qt.length; Ee < On; ++Ee) ae[Ee] = qt[Ee], te[qt.charCodeAt(Ee)] = Ee;
  var Ee, On;
  te[45] = 62;
  te[95] = 63;
  function qn(r) {
    var e = r.length;
    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var t = r.indexOf("=");
    t === -1 && (t = e);
    var n = t === e ? 0 : 4 - t % 4;
    return [t, n];
  }
  __name(qn, "qn");
  a(qn, "getLens");
  function Po(r) {
    var e = qn(r), t = e[0], n = e[1];
    return (t + n) * 3 / 4 - n;
  }
  __name(Po, "Po");
  a(Po, "byteLength");
  function Bo(r, e, t) {
    return (e + t) * 3 / 4 - t;
  }
  __name(Bo, "Bo");
  a(Bo, "_byteLength");
  function Ro(r) {
    var e, t = qn(r), n = t[0], i = t[1], s = new To(Bo(r, n, i)), o = 0, u = i > 0 ? n - 4 : n, c;
    for (c = 0; c < u; c += 4) e = te[r.charCodeAt(c)] << 18 | te[r.charCodeAt(c + 1)] << 12 | te[r.charCodeAt(c + 2)] << 6 | te[r.charCodeAt(c + 3)], s[o++] = e >> 16 & 255, s[o++] = e >> 8 & 255, s[o++] = e & 255;
    return i === 2 && (e = te[r.charCodeAt(
      c
    )] << 2 | te[r.charCodeAt(c + 1)] >> 4, s[o++] = e & 255), i === 1 && (e = te[r.charCodeAt(c)] << 10 | te[r.charCodeAt(c + 1)] << 4 | te[r.charCodeAt(c + 2)] >> 2, s[o++] = e >> 8 & 255, s[o++] = e & 255), s;
  }
  __name(Ro, "Ro");
  a(Ro, "toByteArray");
  function Lo(r) {
    return ae[r >> 18 & 63] + ae[r >> 12 & 63] + ae[r >> 6 & 63] + ae[r & 63];
  }
  __name(Lo, "Lo");
  a(Lo, "tripletToBase64");
  function Fo(r, e, t) {
    for (var n, i = [], s = e; s < t; s += 3) n = (r[s] << 16 & 16711680) + (r[s + 1] << 8 & 65280) + (r[s + 2] & 255), i.push(Lo(n));
    return i.join("");
  }
  __name(Fo, "Fo");
  a(Fo, "encodeChunk");
  function ko(r) {
    for (var e, t = r.length, n = t % 3, i = [], s = 16383, o = 0, u = t - n; o < u; o += s) i.push(Fo(
      r,
      o,
      o + s > u ? u : o + s
    ));
    return n === 1 ? (e = r[t - 1], i.push(ae[e >> 2] + ae[e << 4 & 63] + "==")) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(ae[e >> 10] + ae[e >> 4 & 63] + ae[e << 2 & 63] + "=")), i.join("");
  }
  __name(ko, "ko");
  a(ko, "fromByteArray");
});
var Nn = T((Qt) => {
  p();
  Qt.read = function(r, e, t, n, i) {
    var s, o, u = i * 8 - n - 1, c = (1 << u) - 1, l = c >> 1, f = -7, y = t ? i - 1 : 0, g = t ? -1 : 1, A = r[e + y];
    for (y += g, s = A & (1 << -f) - 1, A >>= -f, f += u; f > 0; s = s * 256 + r[e + y], y += g, f -= 8) ;
    for (o = s & (1 << -f) - 1, s >>= -f, f += n; f > 0; o = o * 256 + r[e + y], y += g, f -= 8) ;
    if (s === 0) s = 1 - l;
    else {
      if (s === c) return o ? NaN : (A ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, n), s = s - l;
    }
    return (A ? -1 : 1) * o * Math.pow(2, s - n);
  };
  Qt.write = function(r, e, t, n, i, s) {
    var o, u, c, l = s * 8 - i - 1, f = (1 << l) - 1, y = f >> 1, g = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, A = n ? 0 : s - 1, C = n ? 1 : -1, D = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, o = f) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), o + y >= 1 ? e += g / c : e += g * Math.pow(2, 1 - y), e * c >= 2 && (o++, c /= 2), o + y >= f ? (u = 0, o = f) : o + y >= 1 ? (u = (e * c - 1) * Math.pow(2, i), o = o + y) : (u = e * Math.pow(2, y - 1) * Math.pow(2, i), o = 0)); i >= 8; r[t + A] = u & 255, A += C, u /= 256, i -= 8) ;
    for (o = o << i | u, l += i; l > 0; r[t + A] = o & 255, A += C, o /= 256, l -= 8) ;
    r[t + A - C] |= D * 128;
  };
});
var ii = T((Re) => {
  "use strict";
  p();
  var Nt = Qn(), Pe = Nn(), Wn = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Re.Buffer = h;
  Re.SlowBuffer = Qo;
  Re.INSPECT_MAX_BYTES = 50;
  var ft = 2147483647;
  Re.kMaxLength = ft;
  h.TYPED_ARRAY_SUPPORT = Mo();
  !h.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function Mo() {
    try {
      let r = new Uint8Array(1), e = { foo: a(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(r, e), r.foo() === 42;
    } catch {
      return false;
    }
  }
  __name(Mo, "Mo");
  a(Mo, "typedArraySupport");
  Object.defineProperty(h.prototype, "parent", { enumerable: true, get: a(function() {
    if (h.isBuffer(this)) return this.buffer;
  }, "get") });
  Object.defineProperty(h.prototype, "offset", { enumerable: true, get: a(function() {
    if (h.isBuffer(
      this
    )) return this.byteOffset;
  }, "get") });
  function he(r) {
    if (r > ft) throw new RangeError('The value "' + r + '" is invalid for option "size"');
    let e = new Uint8Array(r);
    return Object.setPrototypeOf(e, h.prototype), e;
  }
  __name(he, "he");
  a(he, "createBuffer");
  function h(r, e, t) {
    if (typeof r == "number") {
      if (typeof e == "string") throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      );
      return $t(r);
    }
    return Gn(r, e, t);
  }
  __name(h, "h");
  a(h, "Buffer");
  h.poolSize = 8192;
  function Gn(r, e, t) {
    if (typeof r == "string") return Do(r, e);
    if (ArrayBuffer.isView(r)) return Oo(r);
    if (r == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
    if (ue(r, ArrayBuffer) || r && ue(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ue(r, SharedArrayBuffer) || r && ue(
      r.buffer,
      SharedArrayBuffer
    ))) return jt(r, e, t);
    if (typeof r == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = r.valueOf && r.valueOf();
    if (n != null && n !== r) return h.from(n, e, t);
    let i = qo(r);
    if (i) return i;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function") return h.from(r[Symbol.toPrimitive]("string"), e, t);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
  }
  __name(Gn, "Gn");
  a(Gn, "from");
  h.from = function(r, e, t) {
    return Gn(r, e, t);
  };
  Object.setPrototypeOf(
    h.prototype,
    Uint8Array.prototype
  );
  Object.setPrototypeOf(h, Uint8Array);
  function Vn(r) {
    if (typeof r != "number") throw new TypeError(
      '"size" argument must be of type number'
    );
    if (r < 0) throw new RangeError('The value "' + r + '" is invalid for option "size"');
  }
  __name(Vn, "Vn");
  a(Vn, "assertSize");
  function Uo(r, e, t) {
    return Vn(r), r <= 0 ? he(r) : e !== void 0 ? typeof t == "string" ? he(r).fill(e, t) : he(r).fill(e) : he(r);
  }
  __name(Uo, "Uo");
  a(Uo, "alloc");
  h.alloc = function(r, e, t) {
    return Uo(r, e, t);
  };
  function $t(r) {
    return Vn(r), he(r < 0 ? 0 : Gt(r) | 0);
  }
  __name($t, "$t");
  a($t, "allocUnsafe");
  h.allocUnsafe = function(r) {
    return $t(
      r
    );
  };
  h.allocUnsafeSlow = function(r) {
    return $t(r);
  };
  function Do(r, e) {
    if ((typeof e != "string" || e === "") && (e = "utf8"), !h.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
    let t = zn(r, e) | 0, n = he(t), i = n.write(
      r,
      e
    );
    return i !== t && (n = n.slice(0, i)), n;
  }
  __name(Do, "Do");
  a(Do, "fromString");
  function Wt(r) {
    let e = r.length < 0 ? 0 : Gt(r.length) | 0, t = he(e);
    for (let n = 0; n < e; n += 1) t[n] = r[n] & 255;
    return t;
  }
  __name(Wt, "Wt");
  a(Wt, "fromArrayLike");
  function Oo(r) {
    if (ue(r, Uint8Array)) {
      let e = new Uint8Array(r);
      return jt(e.buffer, e.byteOffset, e.byteLength);
    }
    return Wt(r);
  }
  __name(Oo, "Oo");
  a(Oo, "fromArrayView");
  function jt(r, e, t) {
    if (e < 0 || r.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
    if (r.byteLength < e + (t || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return e === void 0 && t === void 0 ? n = new Uint8Array(r) : t === void 0 ? n = new Uint8Array(r, e) : n = new Uint8Array(
      r,
      e,
      t
    ), Object.setPrototypeOf(n, h.prototype), n;
  }
  __name(jt, "jt");
  a(jt, "fromArrayBuffer");
  function qo(r) {
    if (h.isBuffer(r)) {
      let e = Gt(r.length) | 0, t = he(e);
      return t.length === 0 || r.copy(t, 0, 0, e), t;
    }
    if (r.length !== void 0) return typeof r.length != "number" || zt(r.length) ? he(0) : Wt(r);
    if (r.type === "Buffer" && Array.isArray(r.data)) return Wt(r.data);
  }
  __name(qo, "qo");
  a(qo, "fromObject");
  function Gt(r) {
    if (r >= ft) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ft.toString(16) + " bytes");
    return r | 0;
  }
  __name(Gt, "Gt");
  a(Gt, "checked");
  function Qo(r) {
    return +r != r && (r = 0), h.alloc(+r);
  }
  __name(Qo, "Qo");
  a(Qo, "SlowBuffer");
  h.isBuffer = a(function(e) {
    return e != null && e._isBuffer === true && e !== h.prototype;
  }, "isBuffer");
  h.compare = a(function(e, t) {
    if (ue(e, Uint8Array) && (e = h.from(e, e.offset, e.byteLength)), ue(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)), !h.isBuffer(e) || !h.isBuffer(t)) throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    );
    if (e === t) return 0;
    let n = e.length, i = t.length;
    for (let s = 0, o = Math.min(n, i); s < o; ++s) if (e[s] !== t[s]) {
      n = e[s], i = t[s];
      break;
    }
    return n < i ? -1 : i < n ? 1 : 0;
  }, "compare");
  h.isEncoding = a(function(e) {
    switch (String(e).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, "isEncoding");
  h.concat = a(function(e, t) {
    if (!Array.isArray(e)) throw new TypeError(
      '"list" argument must be an Array of Buffers'
    );
    if (e.length === 0) return h.alloc(0);
    let n;
    if (t === void 0)
      for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
    let i = h.allocUnsafe(t), s = 0;
    for (n = 0; n < e.length; ++n) {
      let o = e[n];
      if (ue(o, Uint8Array)) s + o.length > i.length ? (h.isBuffer(o) || (o = h.from(o)), o.copy(i, s)) : Uint8Array.prototype.set.call(i, o, s);
      else if (h.isBuffer(o)) o.copy(i, s);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      s += o.length;
    }
    return i;
  }, "concat");
  function zn(r, e) {
    if (h.isBuffer(r)) return r.length;
    if (ArrayBuffer.isView(r) || ue(r, ArrayBuffer)) return r.byteLength;
    if (typeof r != "string") throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r
    );
    let t = r.length, n = arguments.length > 2 && arguments[2] === true;
    if (!n && t === 0) return 0;
    let i = false;
    for (; ; ) switch (e) {
      case "ascii":
      case "latin1":
      case "binary":
        return t;
      case "utf8":
      case "utf-8":
        return Ht(r).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return t * 2;
      case "hex":
        return t >>> 1;
      case "base64":
        return ni(r).length;
      default:
        if (i) return n ? -1 : Ht(r).length;
        e = ("" + e).toLowerCase(), i = true;
    }
  }
  __name(zn, "zn");
  a(zn, "byteLength");
  h.byteLength = zn;
  function No(r, e, t) {
    let n = false;
    if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e >>>= 0, t <= e)) return "";
    for (r || (r = "utf8"); ; ) switch (r) {
      case "hex":
        return Zo(this, e, t);
      case "utf8":
      case "utf-8":
        return Yn(this, e, t);
      case "ascii":
        return Ko(this, e, t);
      case "latin1":
      case "binary":
        return Yo(
          this,
          e,
          t
        );
      case "base64":
        return Vo(this, e, t);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Jo(
          this,
          e,
          t
        );
      default:
        if (n) throw new TypeError("Unknown encoding: " + r);
        r = (r + "").toLowerCase(), n = true;
    }
  }
  __name(No, "No");
  a(
    No,
    "slowToString"
  );
  h.prototype._isBuffer = true;
  function Ae(r, e, t) {
    let n = r[e];
    r[e] = r[t], r[t] = n;
  }
  __name(Ae, "Ae");
  a(Ae, "swap");
  h.prototype.swap16 = a(function() {
    let e = this.length;
    if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < e; t += 2) Ae(this, t, t + 1);
    return this;
  }, "swap16");
  h.prototype.swap32 = a(function() {
    let e = this.length;
    if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < e; t += 4) Ae(this, t, t + 3), Ae(this, t + 1, t + 2);
    return this;
  }, "swap32");
  h.prototype.swap64 = a(
    function() {
      let e = this.length;
      if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t = 0; t < e; t += 8) Ae(this, t, t + 7), Ae(this, t + 1, t + 6), Ae(this, t + 2, t + 5), Ae(this, t + 3, t + 4);
      return this;
    },
    "swap64"
  );
  h.prototype.toString = a(function() {
    let e = this.length;
    return e === 0 ? "" : arguments.length === 0 ? Yn(
      this,
      0,
      e
    ) : No.apply(this, arguments);
  }, "toString");
  h.prototype.toLocaleString = h.prototype.toString;
  h.prototype.equals = a(function(e) {
    if (!h.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
    return this === e ? true : h.compare(this, e) === 0;
  }, "equals");
  h.prototype.inspect = a(function() {
    let e = "", t = Re.INSPECT_MAX_BYTES;
    return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
  }, "inspect");
  Wn && (h.prototype[Wn] = h.prototype.inspect);
  h.prototype.compare = a(function(e, t, n, i, s) {
    if (ue(e, Uint8Array) && (e = h.from(e, e.offset, e.byteLength)), !h.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
    if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), s === void 0 && (s = this.length), t < 0 || n > e.length || i < 0 || s > this.length) throw new RangeError("out of range index");
    if (i >= s && t >= n) return 0;
    if (i >= s) return -1;
    if (t >= n) return 1;
    if (t >>>= 0, n >>>= 0, i >>>= 0, s >>>= 0, this === e) return 0;
    let o = s - i, u = n - t, c = Math.min(o, u), l = this.slice(
      i,
      s
    ), f = e.slice(t, n);
    for (let y = 0; y < c; ++y) if (l[y] !== f[y]) {
      o = l[y], u = f[y];
      break;
    }
    return o < u ? -1 : u < o ? 1 : 0;
  }, "compare");
  function Kn(r, e, t, n, i) {
    if (r.length === 0) return -1;
    if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, zt(t) && (t = i ? 0 : r.length - 1), t < 0 && (t = r.length + t), t >= r.length) {
      if (i) return -1;
      t = r.length - 1;
    } else if (t < 0) if (i) t = 0;
    else return -1;
    if (typeof e == "string" && (e = h.from(
      e,
      n
    )), h.isBuffer(e)) return e.length === 0 ? -1 : jn(r, e, t, n, i);
    if (typeof e == "number") return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : jn(r, [e], t, n, i);
    throw new TypeError("val must be string, number or Buffer");
  }
  __name(Kn, "Kn");
  a(Kn, "bidirectionalIndexOf");
  function jn(r, e, t, n, i) {
    let s = 1, o = r.length, u = e.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (r.length < 2 || e.length < 2) return -1;
      s = 2, o /= 2, u /= 2, t /= 2;
    }
    function c(f, y) {
      return s === 1 ? f[y] : f.readUInt16BE(y * s);
    }
    __name(c, "c");
    a(c, "read");
    let l;
    if (i) {
      let f = -1;
      for (l = t; l < o; l++) if (c(r, l) === c(e, f === -1 ? 0 : l - f)) {
        if (f === -1 && (f = l), l - f + 1 === u) return f * s;
      } else f !== -1 && (l -= l - f), f = -1;
    } else for (t + u > o && (t = o - u), l = t; l >= 0; l--) {
      let f = true;
      for (let y = 0; y < u; y++) if (c(r, l + y) !== c(e, y)) {
        f = false;
        break;
      }
      if (f) return l;
    }
    return -1;
  }
  __name(jn, "jn");
  a(jn, "arrayIndexOf");
  h.prototype.includes = a(function(e, t, n) {
    return this.indexOf(
      e,
      t,
      n
    ) !== -1;
  }, "includes");
  h.prototype.indexOf = a(function(e, t, n) {
    return Kn(this, e, t, n, true);
  }, "indexOf");
  h.prototype.lastIndexOf = a(function(e, t, n) {
    return Kn(this, e, t, n, false);
  }, "lastIndexOf");
  function Wo(r, e, t, n) {
    t = Number(t) || 0;
    let i = r.length - t;
    n ? (n = Number(n), n > i && (n = i)) : n = i;
    let s = e.length;
    n > s / 2 && (n = s / 2);
    let o;
    for (o = 0; o < n; ++o) {
      let u = parseInt(e.substr(o * 2, 2), 16);
      if (zt(u)) return o;
      r[t + o] = u;
    }
    return o;
  }
  __name(Wo, "Wo");
  a(Wo, "hexWrite");
  function jo(r, e, t, n) {
    return ht(Ht(e, r.length - t), r, t, n);
  }
  __name(jo, "jo");
  a(jo, "utf8Write");
  function Ho(r, e, t, n) {
    return ht(ra(e), r, t, n);
  }
  __name(Ho, "Ho");
  a(
    Ho,
    "asciiWrite"
  );
  function $o(r, e, t, n) {
    return ht(ni(e), r, t, n);
  }
  __name($o, "$o");
  a($o, "base64Write");
  function Go(r, e, t, n) {
    return ht(
      na(e, r.length - t),
      r,
      t,
      n
    );
  }
  __name(Go, "Go");
  a(Go, "ucs2Write");
  h.prototype.write = a(function(e, t, n, i) {
    if (t === void 0) i = "utf8", n = this.length, t = 0;
    else if (n === void 0 && typeof t == "string") i = t, n = this.length, t = 0;
    else if (isFinite(t))
      t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let s = this.length - t;
    if ((n === void 0 || n > s) && (n = s), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    i || (i = "utf8");
    let o = false;
    for (; ; ) switch (i) {
      case "hex":
        return Wo(this, e, t, n);
      case "utf8":
      case "utf-8":
        return jo(this, e, t, n);
      case "ascii":
      case "latin1":
      case "binary":
        return Ho(this, e, t, n);
      case "base64":
        return $o(this, e, t, n);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Go(this, e, t, n);
      default:
        if (o) throw new TypeError("Unknown encoding: " + i);
        i = ("" + i).toLowerCase(), o = true;
    }
  }, "write");
  h.prototype.toJSON = a(function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  }, "toJSON");
  function Vo(r, e, t) {
    return e === 0 && t === r.length ? Nt.fromByteArray(r) : Nt.fromByteArray(r.slice(e, t));
  }
  __name(Vo, "Vo");
  a(Vo, "base64Slice");
  function Yn(r, e, t) {
    t = Math.min(r.length, t);
    let n = [], i = e;
    for (; i < t; ) {
      let s = r[i], o = null, u = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
      if (i + u <= t) {
        let c, l, f, y;
        switch (u) {
          case 1:
            s < 128 && (o = s);
            break;
          case 2:
            c = r[i + 1], (c & 192) === 128 && (y = (s & 31) << 6 | c & 63, y > 127 && (o = y));
            break;
          case 3:
            c = r[i + 1], l = r[i + 2], (c & 192) === 128 && (l & 192) === 128 && (y = (s & 15) << 12 | (c & 63) << 6 | l & 63, y > 2047 && (y < 55296 || y > 57343) && (o = y));
            break;
          case 4:
            c = r[i + 1], l = r[i + 2], f = r[i + 3], (c & 192) === 128 && (l & 192) === 128 && (f & 192) === 128 && (y = (s & 15) << 18 | (c & 63) << 12 | (l & 63) << 6 | f & 63, y > 65535 && y < 1114112 && (o = y));
        }
      }
      o === null ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), n.push(o), i += u;
    }
    return zo(n);
  }
  __name(Yn, "Yn");
  a(Yn, "utf8Slice");
  var Hn = 4096;
  function zo(r) {
    let e = r.length;
    if (e <= Hn) return String.fromCharCode.apply(String, r);
    let t = "", n = 0;
    for (; n < e; ) t += String.fromCharCode.apply(String, r.slice(n, n += Hn));
    return t;
  }
  __name(zo, "zo");
  a(zo, "decodeCodePointsArray");
  function Ko(r, e, t) {
    let n = "";
    t = Math.min(r.length, t);
    for (let i = e; i < t; ++i) n += String.fromCharCode(r[i] & 127);
    return n;
  }
  __name(Ko, "Ko");
  a(Ko, "asciiSlice");
  function Yo(r, e, t) {
    let n = "";
    t = Math.min(r.length, t);
    for (let i = e; i < t; ++i) n += String.fromCharCode(r[i]);
    return n;
  }
  __name(Yo, "Yo");
  a(Yo, "latin1Slice");
  function Zo(r, e, t) {
    let n = r.length;
    (!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n);
    let i = "";
    for (let s = e; s < t; ++s) i += ia[r[s]];
    return i;
  }
  __name(Zo, "Zo");
  a(Zo, "hexSlice");
  function Jo(r, e, t) {
    let n = r.slice(e, t), i = "";
    for (let s = 0; s < n.length - 1; s += 2) i += String.fromCharCode(n[s] + n[s + 1] * 256);
    return i;
  }
  __name(Jo, "Jo");
  a(Jo, "utf16leSlice");
  h.prototype.slice = a(function(e, t) {
    let n = this.length;
    e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
    let i = this.subarray(e, t);
    return Object.setPrototypeOf(i, h.prototype), i;
  }, "slice");
  function q(r, e, t) {
    if (r % 1 !== 0 || r < 0) throw new RangeError("offset is not uint");
    if (r + e > t) throw new RangeError("Trying to access beyond buffer length");
  }
  __name(q, "q");
  a(q, "checkOffset");
  h.prototype.readUintLE = h.prototype.readUIntLE = a(
    function(e, t, n) {
      e = e >>> 0, t = t >>> 0, n || q(e, t, this.length);
      let i = this[e], s = 1, o = 0;
      for (; ++o < t && (s *= 256); ) i += this[e + o] * s;
      return i;
    },
    "readUIntLE"
  );
  h.prototype.readUintBE = h.prototype.readUIntBE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || q(
      e,
      t,
      this.length
    );
    let i = this[e + --t], s = 1;
    for (; t > 0 && (s *= 256); ) i += this[e + --t] * s;
    return i;
  }, "readUIntBE");
  h.prototype.readUint8 = h.prototype.readUInt8 = a(
    function(e, t) {
      return e = e >>> 0, t || q(e, 1, this.length), this[e];
    },
    "readUInt8"
  );
  h.prototype.readUint16LE = h.prototype.readUInt16LE = a(function(e, t) {
    return e = e >>> 0, t || q(
      e,
      2,
      this.length
    ), this[e] | this[e + 1] << 8;
  }, "readUInt16LE");
  h.prototype.readUint16BE = h.prototype.readUInt16BE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 2, this.length), this[e] << 8 | this[e + 1];
  }, "readUInt16BE");
  h.prototype.readUint32LE = h.prototype.readUInt32LE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
  }, "readUInt32LE");
  h.prototype.readUint32BE = h.prototype.readUInt32BE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  }, "readUInt32BE");
  h.prototype.readBigUInt64LE = we(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && je(e, this.length - 8);
    let i = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
    return BigInt(i) + (BigInt(s) << BigInt(32));
  }, "readBigUInt64LE"));
  h.prototype.readBigUInt64BE = we(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && je(e, this.length - 8);
    let i = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
    return (BigInt(i) << BigInt(
      32
    )) + BigInt(s);
  }, "readBigUInt64BE"));
  h.prototype.readIntLE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || q(
      e,
      t,
      this.length
    );
    let i = this[e], s = 1, o = 0;
    for (; ++o < t && (s *= 256); ) i += this[e + o] * s;
    return s *= 128, i >= s && (i -= Math.pow(2, 8 * t)), i;
  }, "readIntLE");
  h.prototype.readIntBE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || q(e, t, this.length);
    let i = t, s = 1, o = this[e + --i];
    for (; i > 0 && (s *= 256); ) o += this[e + --i] * s;
    return s *= 128, o >= s && (o -= Math.pow(2, 8 * t)), o;
  }, "readIntBE");
  h.prototype.readInt8 = a(function(e, t) {
    return e = e >>> 0, t || q(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
  }, "readInt8");
  h.prototype.readInt16LE = a(function(e, t) {
    e = e >>> 0, t || q(
      e,
      2,
      this.length
    );
    let n = this[e] | this[e + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, "readInt16LE");
  h.prototype.readInt16BE = a(function(e, t) {
    e = e >>> 0, t || q(e, 2, this.length);
    let n = this[e + 1] | this[e] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, "readInt16BE");
  h.prototype.readInt32LE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  }, "readInt32LE");
  h.prototype.readInt32BE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  }, "readInt32BE");
  h.prototype.readBigInt64LE = we(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && je(e, this.length - 8);
    let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
    return (BigInt(i) << BigInt(
      32
    )) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
  }, "readBigInt64LE"));
  h.prototype.readBigInt64BE = we(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && je(e, this.length - 8);
    let i = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
    return (BigInt(i) << BigInt(32)) + BigInt(
      this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
    );
  }, "readBigInt64BE"));
  h.prototype.readFloatLE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 4, this.length), Pe.read(this, e, true, 23, 4);
  }, "readFloatLE");
  h.prototype.readFloatBE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 4, this.length), Pe.read(this, e, false, 23, 4);
  }, "readFloatBE");
  h.prototype.readDoubleLE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 8, this.length), Pe.read(this, e, true, 52, 8);
  }, "readDoubleLE");
  h.prototype.readDoubleBE = a(function(e, t) {
    return e = e >>> 0, t || q(e, 8, this.length), Pe.read(
      this,
      e,
      false,
      52,
      8
    );
  }, "readDoubleBE");
  function V(r, e, t, n, i, s) {
    if (!h.isBuffer(r)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > i || e < s) throw new RangeError('"value" argument is out of bounds');
    if (t + n > r.length) throw new RangeError("Index out of range");
  }
  __name(V, "V");
  a(V, "checkInt");
  h.prototype.writeUintLE = h.prototype.writeUIntLE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let u = Math.pow(2, 8 * n) - 1;
      V(
        this,
        e,
        t,
        n,
        u,
        0
      );
    }
    let s = 1, o = 0;
    for (this[t] = e & 255; ++o < n && (s *= 256); ) this[t + o] = e / s & 255;
    return t + n;
  }, "writeUIntLE");
  h.prototype.writeUintBE = h.prototype.writeUIntBE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let u = Math.pow(2, 8 * n) - 1;
      V(this, e, t, n, u, 0);
    }
    let s = n - 1, o = 1;
    for (this[t + s] = e & 255; --s >= 0 && (o *= 256); ) this[t + s] = e / o & 255;
    return t + n;
  }, "writeUIntBE");
  h.prototype.writeUint8 = h.prototype.writeUInt8 = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
  }, "writeUInt8");
  h.prototype.writeUint16LE = h.prototype.writeUInt16LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(this, e, t, 2, 65535, 0), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  }, "writeUInt16LE");
  h.prototype.writeUint16BE = h.prototype.writeUInt16BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  }, "writeUInt16BE");
  h.prototype.writeUint32LE = h.prototype.writeUInt32LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(
      this,
      e,
      t,
      4,
      4294967295,
      0
    ), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
  }, "writeUInt32LE");
  h.prototype.writeUint32BE = h.prototype.writeUInt32BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(
      this,
      e,
      t,
      4,
      4294967295,
      0
    ), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  }, "writeUInt32BE");
  function Zn(r, e, t, n, i) {
    ri(e, n, i, r, t, 7);
    let s = Number(e & BigInt(4294967295));
    r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s;
    let o = Number(e >> BigInt(32) & BigInt(4294967295));
    return r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, t;
  }
  __name(Zn, "Zn");
  a(Zn, "wrtBigUInt64LE");
  function Jn(r, e, t, n, i) {
    ri(e, n, i, r, t, 7);
    let s = Number(e & BigInt(4294967295));
    r[t + 7] = s, s = s >> 8, r[t + 6] = s, s = s >> 8, r[t + 5] = s, s = s >> 8, r[t + 4] = s;
    let o = Number(e >> BigInt(32) & BigInt(4294967295));
    return r[t + 3] = o, o = o >> 8, r[t + 2] = o, o = o >> 8, r[t + 1] = o, o = o >> 8, r[t] = o, t + 8;
  }
  __name(Jn, "Jn");
  a(Jn, "wrtBigUInt64BE");
  h.prototype.writeBigUInt64LE = we(a(function(e, t = 0) {
    return Zn(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64LE"));
  h.prototype.writeBigUInt64BE = we(a(function(e, t = 0) {
    return Jn(this, e, t, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64BE"));
  h.prototype.writeIntLE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let c = Math.pow(2, 8 * n - 1);
      V(this, e, t, n, c - 1, -c);
    }
    let s = 0, o = 1, u = 0;
    for (this[t] = e & 255; ++s < n && (o *= 256); )
      e < 0 && u === 0 && this[t + s - 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
    return t + n;
  }, "writeIntLE");
  h.prototype.writeIntBE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let c = Math.pow(2, 8 * n - 1);
      V(this, e, t, n, c - 1, -c);
    }
    let s = n - 1, o = 1, u = 0;
    for (this[t + s] = e & 255; --s >= 0 && (o *= 256); ) e < 0 && u === 0 && this[t + s + 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
    return t + n;
  }, "writeIntBE");
  h.prototype.writeInt8 = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
  }, "writeInt8");
  h.prototype.writeInt16LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  }, "writeInt16LE");
  h.prototype.writeInt16BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  }, "writeInt16BE");
  h.prototype.writeInt32LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(
      this,
      e,
      t,
      4,
      2147483647,
      -2147483648
    ), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
  }, "writeInt32LE");
  h.prototype.writeInt32BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || V(
      this,
      e,
      t,
      4,
      2147483647,
      -2147483648
    ), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  }, "writeInt32BE");
  h.prototype.writeBigInt64LE = we(a(function(e, t = 0) {
    return Zn(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64LE"));
  h.prototype.writeBigInt64BE = we(
    a(function(e, t = 0) {
      return Jn(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64BE")
  );
  function Xn(r, e, t, n, i, s) {
    if (t + n > r.length) throw new RangeError("Index out of range");
    if (t < 0) throw new RangeError("Index out of range");
  }
  __name(Xn, "Xn");
  a(Xn, "checkIEEE754");
  function ei(r, e, t, n, i) {
    return e = +e, t = t >>> 0, i || Xn(r, e, t, 4, 34028234663852886e22, -34028234663852886e22), Pe.write(r, e, t, n, 23, 4), t + 4;
  }
  __name(ei, "ei");
  a(
    ei,
    "writeFloat"
  );
  h.prototype.writeFloatLE = a(function(e, t, n) {
    return ei(this, e, t, true, n);
  }, "writeFloatLE");
  h.prototype.writeFloatBE = a(function(e, t, n) {
    return ei(this, e, t, false, n);
  }, "writeFloatBE");
  function ti(r, e, t, n, i) {
    return e = +e, t = t >>> 0, i || Xn(r, e, t, 8, 17976931348623157e292, -17976931348623157e292), Pe.write(
      r,
      e,
      t,
      n,
      52,
      8
    ), t + 8;
  }
  __name(ti, "ti");
  a(ti, "writeDouble");
  h.prototype.writeDoubleLE = a(function(e, t, n) {
    return ti(this, e, t, true, n);
  }, "writeDoubleLE");
  h.prototype.writeDoubleBE = a(function(e, t, n) {
    return ti(this, e, t, false, n);
  }, "writeDoubleBE");
  h.prototype.copy = a(function(e, t, n, i) {
    if (!h.isBuffer(e)) throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0) return 0;
    if (t < 0) throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
    if (i < 0) throw new RangeError("sourceEnd out of bounds");
    i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
    let s = i - n;
    return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t), s;
  }, "copy");
  h.prototype.fill = a(function(e, t, n, i) {
    if (typeof e == "string") {
      if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string") throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !h.isEncoding(i)) throw new TypeError(
        "Unknown encoding: " + i
      );
      if (e.length === 1) {
        let o = e.charCodeAt(0);
        (i === "utf8" && o < 128 || i === "latin1") && (e = o);
      }
    } else typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
    if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
    if (n <= t) return this;
    t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
    let s;
    if (typeof e == "number") for (s = t; s < n; ++s) this[s] = e;
    else {
      let o = h.isBuffer(e) ? e : h.from(
        e,
        i
      ), u = o.length;
      if (u === 0) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
      for (s = 0; s < n - t; ++s) this[s + t] = o[s % u];
    }
    return this;
  }, "fill");
  var Te = {};
  function Vt(r, e, t) {
    var n;
    Te[r] = (n = class extends t {
      static {
        __name(this, "n");
      }
      constructor() {
        super(), Object.defineProperty(this, "message", { value: e.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${r}]`, this.stack, delete this.name;
      }
      get code() {
        return r;
      }
      set code(s) {
        Object.defineProperty(
          this,
          "code",
          { configurable: true, enumerable: true, value: s, writable: true }
        );
      }
      toString() {
        return `${this.name} [${r}]: ${this.message}`;
      }
    }, a(n, "NodeError"), n);
  }
  __name(Vt, "Vt");
  a(Vt, "E");
  Vt("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
    return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  Vt(
    "ERR_INVALID_ARG_TYPE",
    function(r, e) {
      return `The "${r}" argument must be of type number. Received type ${typeof e}`;
    },
    TypeError
  );
  Vt("ERR_OUT_OF_RANGE", function(r, e, t) {
    let n = `The value of "${r}" is out of range.`, i = t;
    return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = $n(String(t)) : typeof t == "bigint" && (i = String(
      t
    ), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = $n(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
  }, RangeError);
  function $n(r) {
    let e = "", t = r.length, n = r[0] === "-" ? 1 : 0;
    for (; t >= n + 4; t -= 3) e = `_${r.slice(t - 3, t)}${e}`;
    return `${r.slice(0, t)}${e}`;
  }
  __name($n, "$n");
  a($n, "addNumericalSeparator");
  function Xo(r, e, t) {
    Be(e, "offset"), (r[e] === void 0 || r[e + t] === void 0) && je(e, r.length - (t + 1));
  }
  __name(Xo, "Xo");
  a(Xo, "checkBounds");
  function ri(r, e, t, n, i, s) {
    if (r > t || r < e) {
      let o = typeof e == "bigint" ? "n" : "", u;
      throw s > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${o} and < 2${o} ** ${(s + 1) * 8}${o}` : u = `>= -(2${o} ** ${(s + 1) * 8 - 1}${o}) and < 2 ** ${(s + 1) * 8 - 1}${o}` : u = `>= ${e}${o} and <= ${t}${o}`, new Te.ERR_OUT_OF_RANGE("value", u, r);
    }
    Xo(n, i, s);
  }
  __name(ri, "ri");
  a(ri, "checkIntBI");
  function Be(r, e) {
    if (typeof r != "number") throw new Te.ERR_INVALID_ARG_TYPE(e, "number", r);
  }
  __name(Be, "Be");
  a(Be, "validateNumber");
  function je(r, e, t) {
    throw Math.floor(r) !== r ? (Be(r, t), new Te.ERR_OUT_OF_RANGE(t || "offset", "an integer", r)) : e < 0 ? new Te.ERR_BUFFER_OUT_OF_BOUNDS() : new Te.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e}`, r);
  }
  __name(je, "je");
  a(je, "boundsError");
  var ea = /[^+/0-9A-Za-z-_]/g;
  function ta(r) {
    if (r = r.split("=")[0], r = r.trim().replace(ea, ""), r.length < 2) return "";
    for (; r.length % 4 !== 0; ) r = r + "=";
    return r;
  }
  __name(ta, "ta");
  a(ta, "base64clean");
  function Ht(r, e) {
    e = e || 1 / 0;
    let t, n = r.length, i = null, s = [];
    for (let o = 0; o < n; ++o) {
      if (t = r.charCodeAt(o), t > 55295 && t < 57344) {
        if (!i) {
          if (t > 56319) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          } else if (o + 1 === n) {
            (e -= 3) > -1 && s.push(239, 191, 189);
            continue;
          }
          i = t;
          continue;
        }
        if (t < 56320) {
          (e -= 3) > -1 && s.push(239, 191, 189), i = t;
          continue;
        }
        t = (i - 55296 << 10 | t - 56320) + 65536;
      } else i && (e -= 3) > -1 && s.push(239, 191, 189);
      if (i = null, t < 128) {
        if ((e -= 1) < 0) break;
        s.push(t);
      } else if (t < 2048) {
        if ((e -= 2) < 0) break;
        s.push(t >> 6 | 192, t & 63 | 128);
      } else if (t < 65536) {
        if ((e -= 3) < 0) break;
        s.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
      } else if (t < 1114112) {
        if ((e -= 4) < 0) break;
        s.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return s;
  }
  __name(Ht, "Ht");
  a(Ht, "utf8ToBytes");
  function ra(r) {
    let e = [];
    for (let t = 0; t < r.length; ++t) e.push(r.charCodeAt(t) & 255);
    return e;
  }
  __name(ra, "ra");
  a(
    ra,
    "asciiToBytes"
  );
  function na(r, e) {
    let t, n, i, s = [];
    for (let o = 0; o < r.length && !((e -= 2) < 0); ++o) t = r.charCodeAt(
      o
    ), n = t >> 8, i = t % 256, s.push(i), s.push(n);
    return s;
  }
  __name(na, "na");
  a(na, "utf16leToBytes");
  function ni(r) {
    return Nt.toByteArray(
      ta(r)
    );
  }
  __name(ni, "ni");
  a(ni, "base64ToBytes");
  function ht(r, e, t, n) {
    let i;
    for (i = 0; i < n && !(i + t >= e.length || i >= r.length); ++i)
      e[i + t] = r[i];
    return i;
  }
  __name(ht, "ht");
  a(ht, "blitBuffer");
  function ue(r, e) {
    return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name;
  }
  __name(ue, "ue");
  a(ue, "isInstance");
  function zt(r) {
    return r !== r;
  }
  __name(zt, "zt");
  a(zt, "numberIsNaN");
  var ia = function() {
    let r = "0123456789abcdef", e = new Array(256);
    for (let t = 0; t < 16; ++t) {
      let n = t * 16;
      for (let i = 0; i < 16; ++i) e[n + i] = r[t] + r[i];
    }
    return e;
  }();
  function we(r) {
    return typeof BigInt > "u" ? sa : r;
  }
  __name(we, "we");
  a(we, "defineBigIntMethod");
  function sa() {
    throw new Error("BigInt not supported");
  }
  __name(sa, "sa");
  a(sa, "BufferBigIntNotDefined");
});
var b;
var v;
var x;
var d;
var m;
var p = G(() => {
  "use strict";
  b = globalThis, v = globalThis.setImmediate ?? ((r) => setTimeout(r, 0)), x = globalThis.clearImmediate ?? ((r) => clearTimeout(r)), d = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : ii().Buffer, m = globalThis.process ?? {};
  m.env ?? (m.env = {});
  try {
    m.nextTick(() => {
    });
  } catch {
    let e = Promise.resolve();
    m.nextTick = e.then.bind(e);
  }
});
var ge = T((Rl, Kt) => {
  "use strict";
  p();
  var Le = typeof Reflect == "object" ? Reflect : null, si = Le && typeof Le.apply == "function" ? Le.apply : a(function(e, t, n) {
    return Function.prototype.apply.call(e, t, n);
  }, "ReflectApply"), pt;
  Le && typeof Le.ownKeys == "function" ? pt = Le.ownKeys : Object.getOwnPropertySymbols ? pt = a(function(e) {
    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
  }, "ReflectOwnKeys") : pt = a(function(e) {
    return Object.getOwnPropertyNames(e);
  }, "ReflectOwnKeys");
  function oa(r) {
    console && console.warn && console.warn(r);
  }
  __name(oa, "oa");
  a(
    oa,
    "ProcessEmitWarning"
  );
  var ai = Number.isNaN || a(function(e) {
    return e !== e;
  }, "NumberIsNaN");
  function B() {
    B.init.call(this);
  }
  __name(B, "B");
  a(B, "EventEmitter");
  Kt.exports = B;
  Kt.exports.once = la;
  B.EventEmitter = B;
  B.prototype._events = void 0;
  B.prototype._eventsCount = 0;
  B.prototype._maxListeners = void 0;
  var oi = 10;
  function dt(r) {
    if (typeof r != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
  }
  __name(dt, "dt");
  a(dt, "checkListener");
  Object.defineProperty(B, "defaultMaxListeners", { enumerable: true, get: a(function() {
    return oi;
  }, "get"), set: a(
    function(r) {
      if (typeof r != "number" || r < 0 || ai(r)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
      oi = r;
    },
    "set"
  ) });
  B.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  };
  B.prototype.setMaxListeners = a(function(e) {
    if (typeof e != "number" || e < 0 || ai(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
    return this._maxListeners = e, this;
  }, "setMaxListeners");
  function ui(r) {
    return r._maxListeners === void 0 ? B.defaultMaxListeners : r._maxListeners;
  }
  __name(ui, "ui");
  a(ui, "_getMaxListeners");
  B.prototype.getMaxListeners = a(function() {
    return ui(this);
  }, "getMaxListeners");
  B.prototype.emit = a(function(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
    var i = e === "error", s = this._events;
    if (s !== void 0) i = i && s.error === void 0;
    else if (!i) return false;
    if (i) {
      var o;
      if (t.length > 0 && (o = t[0]), o instanceof Error) throw o;
      var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
      throw u.context = o, u;
    }
    var c = s[e];
    if (c === void 0) return false;
    if (typeof c == "function") si(c, this, t);
    else for (var l = c.length, f = pi(c, l), n = 0; n < l; ++n) si(f[n], this, t);
    return true;
  }, "emit");
  function ci(r, e, t, n) {
    var i, s, o;
    if (dt(
      t
    ), s = r._events, s === void 0 ? (s = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s.newListener !== void 0 && (r.emit("newListener", e, t.listener ? t.listener : t), s = r._events), o = s[e]), o === void 0) o = s[e] = t, ++r._eventsCount;
    else if (typeof o == "function" ? o = s[e] = n ? [t, o] : [o, t] : n ? o.unshift(t) : o.push(t), i = ui(r), i > 0 && o.length > i && !o.warned) {
      o.warned = true;
      var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      u.name = "MaxListenersExceededWarning", u.emitter = r, u.type = e, u.count = o.length, oa(u);
    }
    return r;
  }
  __name(ci, "ci");
  a(ci, "_addListener");
  B.prototype.addListener = a(function(e, t) {
    return ci(this, e, t, false);
  }, "addListener");
  B.prototype.on = B.prototype.addListener;
  B.prototype.prependListener = a(function(e, t) {
    return ci(this, e, t, true);
  }, "prependListener");
  function aa() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  __name(aa, "aa");
  a(aa, "onceWrapper");
  function li(r, e, t) {
    var n = {
      fired: false,
      wrapFn: void 0,
      target: r,
      type: e,
      listener: t
    }, i = aa.bind(n);
    return i.listener = t, n.wrapFn = i, i;
  }
  __name(li, "li");
  a(li, "_onceWrap");
  B.prototype.once = a(function(e, t) {
    return dt(t), this.on(e, li(this, e, t)), this;
  }, "once");
  B.prototype.prependOnceListener = a(function(e, t) {
    return dt(t), this.prependListener(e, li(this, e, t)), this;
  }, "prependOnceListener");
  B.prototype.removeListener = a(function(e, t) {
    var n, i, s, o, u;
    if (dt(t), i = this._events, i === void 0) return this;
    if (n = i[e], n === void 0) return this;
    if (n === t || n.listener === t) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
    else if (typeof n != "function") {
      for (s = -1, o = n.length - 1; o >= 0; o--) if (n[o] === t || n[o].listener === t) {
        u = n[o].listener, s = o;
        break;
      }
      if (s < 0) return this;
      s === 0 ? n.shift() : ua(n, s), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, u || t);
    }
    return this;
  }, "removeListener");
  B.prototype.off = B.prototype.removeListener;
  B.prototype.removeAllListeners = a(function(e) {
    var t, n, i;
    if (n = this._events, n === void 0) return this;
    if (n.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
    if (arguments.length === 0) {
      var s = Object.keys(n), o;
      for (i = 0; i < s.length; ++i) o = s[i], o !== "removeListener" && this.removeAllListeners(
        o
      );
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (t = n[e], typeof t == "function") this.removeListener(e, t);
    else if (t !== void 0) for (i = t.length - 1; i >= 0; i--) this.removeListener(e, t[i]);
    return this;
  }, "removeAllListeners");
  function fi(r, e, t) {
    var n = r._events;
    if (n === void 0) return [];
    var i = n[e];
    return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? ca(i) : pi(i, i.length);
  }
  __name(fi, "fi");
  a(fi, "_listeners");
  B.prototype.listeners = a(function(e) {
    return fi(this, e, true);
  }, "listeners");
  B.prototype.rawListeners = a(function(e) {
    return fi(this, e, false);
  }, "rawListeners");
  B.listenerCount = function(r, e) {
    return typeof r.listenerCount == "function" ? r.listenerCount(e) : hi.call(r, e);
  };
  B.prototype.listenerCount = hi;
  function hi(r) {
    var e = this._events;
    if (e !== void 0) {
      var t = e[r];
      if (typeof t == "function")
        return 1;
      if (t !== void 0) return t.length;
    }
    return 0;
  }
  __name(hi, "hi");
  a(hi, "listenerCount");
  B.prototype.eventNames = a(function() {
    return this._eventsCount > 0 ? pt(this._events) : [];
  }, "eventNames");
  function pi(r, e) {
    for (var t = new Array(e), n = 0; n < e; ++n) t[n] = r[n];
    return t;
  }
  __name(pi, "pi");
  a(pi, "arrayClone");
  function ua(r, e) {
    for (; e + 1 < r.length; e++) r[e] = r[e + 1];
    r.pop();
  }
  __name(ua, "ua");
  a(ua, "spliceOne");
  function ca(r) {
    for (var e = new Array(r.length), t = 0; t < e.length; ++t) e[t] = r[t].listener || r[t];
    return e;
  }
  __name(ca, "ca");
  a(ca, "unwrapListeners");
  function la(r, e) {
    return new Promise(function(t, n) {
      function i(o) {
        r.removeListener(e, s), n(o);
      }
      __name(i, "i");
      a(i, "errorListener");
      function s() {
        typeof r.removeListener == "function" && r.removeListener("error", i), t([].slice.call(arguments));
      }
      __name(s, "s");
      a(s, "resolver"), di(r, e, s, { once: true }), e !== "error" && fa(r, i, { once: true });
    });
  }
  __name(la, "la");
  a(la, "once");
  function fa(r, e, t) {
    typeof r.on == "function" && di(r, "error", e, t);
  }
  __name(fa, "fa");
  a(
    fa,
    "addErrorHandlerIfEventEmitter"
  );
  function di(r, e, t, n) {
    if (typeof r.on == "function") n.once ? r.once(e, t) : r.on(e, t);
    else if (typeof r.addEventListener == "function") r.addEventListener(e, a(/* @__PURE__ */ __name(function i(s) {
      n.once && r.removeEventListener(e, i), t(s);
    }, "i"), "wrapListener"));
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
  }
  __name(di, "di");
  a(di, "eventTargetAgnosticAddListener");
});
var wi = {};
ie(wi, { Socket: /* @__PURE__ */ __name(() => ce, "Socket"), isIP: /* @__PURE__ */ __name(() => ha, "isIP") });
function ha(r) {
  return 0;
}
__name(ha, "ha");
var mi;
var yi;
var S;
var ce;
var Fe = G(() => {
  "use strict";
  p();
  mi = Se(ge(), 1);
  a(ha, "isIP");
  yi = /^[^.]+\./, S = class S2 extends mi.EventEmitter {
    static {
      __name(this, "S");
    }
    constructor() {
      super(...arguments);
      E(this, "opts", {});
      E(this, "connecting", false);
      E(this, "pending", true);
      E(
        this,
        "writable",
        true
      );
      E(this, "encrypted", false);
      E(this, "authorized", false);
      E(this, "destroyed", false);
      E(this, "ws", null);
      E(this, "writeBuffer");
      E(this, "tlsState", 0);
      E(this, "tlsRead");
      E(this, "tlsWrite");
    }
    static get poolQueryViaFetch() {
      return S2.opts.poolQueryViaFetch ?? S2.defaults.poolQueryViaFetch;
    }
    static set poolQueryViaFetch(t) {
      S2.opts.poolQueryViaFetch = t;
    }
    static get fetchEndpoint() {
      return S2.opts.fetchEndpoint ?? S2.defaults.fetchEndpoint;
    }
    static set fetchEndpoint(t) {
      S2.opts.fetchEndpoint = t;
    }
    static get fetchConnectionCache() {
      return true;
    }
    static set fetchConnectionCache(t) {
      console.warn("The `fetchConnectionCache` option is deprecated (now always `true`)");
    }
    static get fetchFunction() {
      return S2.opts.fetchFunction ?? S2.defaults.fetchFunction;
    }
    static set fetchFunction(t) {
      S2.opts.fetchFunction = t;
    }
    static get webSocketConstructor() {
      return S2.opts.webSocketConstructor ?? S2.defaults.webSocketConstructor;
    }
    static set webSocketConstructor(t) {
      S2.opts.webSocketConstructor = t;
    }
    get webSocketConstructor() {
      return this.opts.webSocketConstructor ?? S2.webSocketConstructor;
    }
    set webSocketConstructor(t) {
      this.opts.webSocketConstructor = t;
    }
    static get wsProxy() {
      return S2.opts.wsProxy ?? S2.defaults.wsProxy;
    }
    static set wsProxy(t) {
      S2.opts.wsProxy = t;
    }
    get wsProxy() {
      return this.opts.wsProxy ?? S2.wsProxy;
    }
    set wsProxy(t) {
      this.opts.wsProxy = t;
    }
    static get coalesceWrites() {
      return S2.opts.coalesceWrites ?? S2.defaults.coalesceWrites;
    }
    static set coalesceWrites(t) {
      S2.opts.coalesceWrites = t;
    }
    get coalesceWrites() {
      return this.opts.coalesceWrites ?? S2.coalesceWrites;
    }
    set coalesceWrites(t) {
      this.opts.coalesceWrites = t;
    }
    static get useSecureWebSocket() {
      return S2.opts.useSecureWebSocket ?? S2.defaults.useSecureWebSocket;
    }
    static set useSecureWebSocket(t) {
      S2.opts.useSecureWebSocket = t;
    }
    get useSecureWebSocket() {
      return this.opts.useSecureWebSocket ?? S2.useSecureWebSocket;
    }
    set useSecureWebSocket(t) {
      this.opts.useSecureWebSocket = t;
    }
    static get forceDisablePgSSL() {
      return S2.opts.forceDisablePgSSL ?? S2.defaults.forceDisablePgSSL;
    }
    static set forceDisablePgSSL(t) {
      S2.opts.forceDisablePgSSL = t;
    }
    get forceDisablePgSSL() {
      return this.opts.forceDisablePgSSL ?? S2.forceDisablePgSSL;
    }
    set forceDisablePgSSL(t) {
      this.opts.forceDisablePgSSL = t;
    }
    static get disableSNI() {
      return S2.opts.disableSNI ?? S2.defaults.disableSNI;
    }
    static set disableSNI(t) {
      S2.opts.disableSNI = t;
    }
    get disableSNI() {
      return this.opts.disableSNI ?? S2.disableSNI;
    }
    set disableSNI(t) {
      this.opts.disableSNI = t;
    }
    static get disableWarningInBrowsers() {
      return S2.opts.disableWarningInBrowsers ?? S2.defaults.disableWarningInBrowsers;
    }
    static set disableWarningInBrowsers(t) {
      S2.opts.disableWarningInBrowsers = t;
    }
    get disableWarningInBrowsers() {
      return this.opts.disableWarningInBrowsers ?? S2.disableWarningInBrowsers;
    }
    set disableWarningInBrowsers(t) {
      this.opts.disableWarningInBrowsers = t;
    }
    static get pipelineConnect() {
      return S2.opts.pipelineConnect ?? S2.defaults.pipelineConnect;
    }
    static set pipelineConnect(t) {
      S2.opts.pipelineConnect = t;
    }
    get pipelineConnect() {
      return this.opts.pipelineConnect ?? S2.pipelineConnect;
    }
    set pipelineConnect(t) {
      this.opts.pipelineConnect = t;
    }
    static get subtls() {
      return S2.opts.subtls ?? S2.defaults.subtls;
    }
    static set subtls(t) {
      S2.opts.subtls = t;
    }
    get subtls() {
      return this.opts.subtls ?? S2.subtls;
    }
    set subtls(t) {
      this.opts.subtls = t;
    }
    static get pipelineTLS() {
      return S2.opts.pipelineTLS ?? S2.defaults.pipelineTLS;
    }
    static set pipelineTLS(t) {
      S2.opts.pipelineTLS = t;
    }
    get pipelineTLS() {
      return this.opts.pipelineTLS ?? S2.pipelineTLS;
    }
    set pipelineTLS(t) {
      this.opts.pipelineTLS = t;
    }
    static get rootCerts() {
      return S2.opts.rootCerts ?? S2.defaults.rootCerts;
    }
    static set rootCerts(t) {
      S2.opts.rootCerts = t;
    }
    get rootCerts() {
      return this.opts.rootCerts ?? S2.rootCerts;
    }
    set rootCerts(t) {
      this.opts.rootCerts = t;
    }
    wsProxyAddrForHost(t, n) {
      let i = this.wsProxy;
      if (i === void 0) throw new Error("No WebSocket proxy is configured. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#wsproxy-string--host-string-port-number--string--string");
      return typeof i == "function" ? i(t, n) : `${i}?address=${t}:${n}`;
    }
    setNoDelay() {
      return this;
    }
    setKeepAlive() {
      return this;
    }
    ref() {
      return this;
    }
    unref() {
      return this;
    }
    connect(t, n, i) {
      this.connecting = true, i && this.once("connect", i);
      let s = a(() => {
        this.connecting = false, this.pending = false, this.emit("connect"), this.emit("ready");
      }, "handleWebSocketOpen"), o = a((c, l = false) => {
        c.binaryType = "arraybuffer", c.addEventListener("error", (f) => {
          this.emit("error", f), this.emit("close");
        }), c.addEventListener("message", (f) => {
          if (this.tlsState === 0) {
            let y = d.from(f.data);
            this.emit("data", y);
          }
        }), c.addEventListener("close", () => {
          this.emit("close");
        }), l ? s() : c.addEventListener(
          "open",
          s
        );
      }, "configureWebSocket"), u;
      try {
        u = this.wsProxyAddrForHost(n, typeof t == "string" ? parseInt(t, 10) : t);
      } catch (c) {
        this.emit("error", c), this.emit("close");
        return;
      }
      try {
        let l = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u;
        if (this.webSocketConstructor !== void 0) this.ws = new this.webSocketConstructor(l), o(this.ws);
        else try {
          this.ws = new WebSocket(l), o(this.ws);
        } catch {
          this.ws = new __unstable_WebSocket(l), o(this.ws);
        }
      } catch (c) {
        let f = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u;
        fetch(f, { headers: { Upgrade: "websocket" } }).then(
          (y) => {
            if (this.ws = y.webSocket, this.ws == null) throw c;
            this.ws.accept(), o(this.ws, true);
          }
        ).catch((y) => {
          this.emit(
            "error",
            new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${y}`)
          ), this.emit("close");
        });
      }
    }
    async startTls(t) {
      if (this.subtls === void 0) throw new Error(
        "For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information."
      );
      this.tlsState = 1;
      let n = await this.subtls.TrustedCert.databaseFromPEM(this.rootCerts), i = new this.subtls.WebSocketReadQueue(this.ws), s = i.read.bind(i), o = this.rawWrite.bind(this), { read: u, write: c } = await this.subtls.startTls(t, n, s, o, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
      this.tlsRead = u, this.tlsWrite = c, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit("secureConnection", this), this.tlsReadLoop();
    }
    async tlsReadLoop() {
      for (; ; ) {
        let t = await this.tlsRead();
        if (t === void 0) break;
        {
          let n = d.from(t);
          this.emit("data", n);
        }
      }
    }
    rawWrite(t) {
      if (!this.coalesceWrites) {
        this.ws && this.ws.send(t);
        return;
      }
      if (this.writeBuffer === void 0) this.writeBuffer = t, setTimeout(() => {
        this.ws && this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
      }, 0);
      else {
        let n = new Uint8Array(
          this.writeBuffer.length + t.length
        );
        n.set(this.writeBuffer), n.set(t, this.writeBuffer.length), this.writeBuffer = n;
      }
    }
    write(t, n = "utf8", i = (s) => {
    }) {
      return t.length === 0 ? (i(), true) : (typeof t == "string" && (t = d.from(t, n)), this.tlsState === 0 ? (this.rawWrite(t), i()) : this.tlsState === 1 ? this.once("secureConnection", () => {
        this.write(
          t,
          n,
          i
        );
      }) : (this.tlsWrite(t), i()), true);
    }
    end(t = d.alloc(0), n = "utf8", i = () => {
    }) {
      return this.write(t, n, () => {
        this.ws.close(), i();
      }), this;
    }
    destroy() {
      return this.destroyed = true, this.end();
    }
  };
  a(S, "Socket"), E(S, "defaults", {
    poolQueryViaFetch: false,
    fetchEndpoint: a((t, n, i) => {
      let s;
      return i?.jwtAuth ? s = t.replace(yi, "apiauth.") : s = t.replace(yi, "api."), "https://" + s + "/sql";
    }, "fetchEndpoint"),
    fetchConnectionCache: true,
    fetchFunction: void 0,
    webSocketConstructor: void 0,
    wsProxy: a((t) => t + "/v2", "wsProxy"),
    useSecureWebSocket: true,
    forceDisablePgSSL: true,
    coalesceWrites: true,
    pipelineConnect: "password",
    subtls: void 0,
    rootCerts: "",
    pipelineTLS: false,
    disableSNI: false,
    disableWarningInBrowsers: false
  }), E(S, "opts", {});
  ce = S;
});
var gi = {};
ie(gi, { parse: /* @__PURE__ */ __name(() => Yt, "parse") });
function Yt(r, e = false) {
  let { protocol: t } = new URL(r), n = "http:" + r.substring(
    t.length
  ), { username: i, password: s, host: o, hostname: u, port: c, pathname: l, search: f, searchParams: y, hash: g } = new URL(
    n
  );
  s = decodeURIComponent(s), i = decodeURIComponent(i), l = decodeURIComponent(l);
  let A = i + ":" + s, C = e ? Object.fromEntries(y.entries()) : f;
  return {
    href: r,
    protocol: t,
    auth: A,
    username: i,
    password: s,
    host: o,
    hostname: u,
    port: c,
    pathname: l,
    search: f,
    query: C,
    hash: g
  };
}
__name(Yt, "Yt");
var Zt = G(() => {
  "use strict";
  p();
  a(Yt, "parse");
});
var tr = T((Ai) => {
  "use strict";
  p();
  Ai.parse = function(r, e) {
    return new er(r, e).parse();
  };
  var vt = class vt2 {
    static {
      __name(this, "vt");
    }
    constructor(e, t) {
      this.source = e, this.transform = t || Ca, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var e = this.source[this.position++];
      return e === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e, escaped: false };
    }
    record(e) {
      this.recorded.push(
        e
      );
    }
    newEntry(e) {
      var t;
      (this.recorded.length > 0 || e) && (t = this.recorded.join(""), t === "NULL" && !e && (t = null), t !== null && (t = this.transform(t)), this.entries.push(t), this.recorded = []);
    }
    consumeDimensions() {
      if (this.source[0] === "[") for (; !this.isEof(); ) {
        var e = this.nextCharacter();
        if (e.value === "=") break;
      }
    }
    parse(e) {
      var t, n, i;
      for (this.consumeDimensions(); !this.isEof(); ) if (t = this.nextCharacter(), t.value === "{" && !i) this.dimension++, this.dimension > 1 && (n = new vt2(this.source.substr(this.position - 1), this.transform), this.entries.push(n.parse(
        true
      )), this.position += n.position - 2);
      else if (t.value === "}" && !i) {
        if (this.dimension--, !this.dimension && (this.newEntry(), e)) return this.entries;
      } else t.value === '"' && !t.escaped ? (i && this.newEntry(true), i = !i) : t.value === "," && !i ? this.newEntry() : this.record(t.value);
      if (this.dimension !== 0) throw new Error("array dimension not balanced");
      return this.entries;
    }
  };
  a(vt, "ArrayParser");
  var er = vt;
  function Ca(r) {
    return r;
  }
  __name(Ca, "Ca");
  a(Ca, "identity");
});
var rr = T((Zl, Ci) => {
  p();
  var _a = tr();
  Ci.exports = { create: a(function(r, e) {
    return { parse: a(function() {
      return _a.parse(r, e);
    }, "parse") };
  }, "create") };
});
var Ti = T((ef, Ii) => {
  "use strict";
  p();
  var Ia = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, Ta = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, Pa = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, Ba = /^-?infinity$/;
  Ii.exports = a(function(e) {
    if (Ba.test(e)) return Number(e.replace("i", "I"));
    var t = Ia.exec(e);
    if (!t) return Ra(
      e
    ) || null;
    var n = !!t[8], i = parseInt(t[1], 10);
    n && (i = _i(i));
    var s = parseInt(t[2], 10) - 1, o = t[3], u = parseInt(
      t[4],
      10
    ), c = parseInt(t[5], 10), l = parseInt(t[6], 10), f = t[7];
    f = f ? 1e3 * parseFloat(f) : 0;
    var y, g = La(e);
    return g != null ? (y = new Date(Date.UTC(i, s, o, u, c, l, f)), nr(i) && y.setUTCFullYear(i), g !== 0 && y.setTime(y.getTime() - g)) : (y = new Date(i, s, o, u, c, l, f), nr(i) && y.setFullYear(i)), y;
  }, "parseDate");
  function Ra(r) {
    var e = Ta.exec(r);
    if (e) {
      var t = parseInt(e[1], 10), n = !!e[4];
      n && (t = _i(t));
      var i = parseInt(e[2], 10) - 1, s = e[3], o = new Date(t, i, s);
      return nr(
        t
      ) && o.setFullYear(t), o;
    }
  }
  __name(Ra, "Ra");
  a(Ra, "getDate");
  function La(r) {
    if (r.endsWith("+00")) return 0;
    var e = Pa.exec(r.split(" ")[1]);
    if (e) {
      var t = e[1];
      if (t === "Z") return 0;
      var n = t === "-" ? -1 : 1, i = parseInt(e[2], 10) * 3600 + parseInt(
        e[3] || 0,
        10
      ) * 60 + parseInt(e[4] || 0, 10);
      return i * n * 1e3;
    }
  }
  __name(La, "La");
  a(La, "timeZoneOffset");
  function _i(r) {
    return -(r - 1);
  }
  __name(_i, "_i");
  a(_i, "bcYearToNegativeYear");
  function nr(r) {
    return r >= 0 && r < 100;
  }
  __name(nr, "nr");
  a(nr, "is0To99");
});
var Bi = T((nf, Pi) => {
  p();
  Pi.exports = ka;
  var Fa = Object.prototype.hasOwnProperty;
  function ka(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t) Fa.call(t, n) && (r[n] = t[n]);
    }
    return r;
  }
  __name(ka, "ka");
  a(ka, "extend");
});
var Fi = T((af, Li) => {
  "use strict";
  p();
  var Ma = Bi();
  Li.exports = ke;
  function ke(r) {
    if (!(this instanceof ke))
      return new ke(r);
    Ma(this, Va(r));
  }
  __name(ke, "ke");
  a(ke, "PostgresInterval");
  var Ua = [
    "seconds",
    "minutes",
    "hours",
    "days",
    "months",
    "years"
  ];
  ke.prototype.toPostgres = function() {
    var r = Ua.filter(this.hasOwnProperty, this);
    return this.milliseconds && r.indexOf("seconds") < 0 && r.push("seconds"), r.length === 0 ? "0" : r.map(function(e) {
      var t = this[e] || 0;
      return e === "seconds" && this.milliseconds && (t = (t + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), t + " " + e;
    }, this).join(" ");
  };
  var Da = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, Oa = ["years", "months", "days"], qa = ["hours", "minutes", "seconds"];
  ke.prototype.toISOString = ke.prototype.toISO = function() {
    var r = Oa.map(t, this).join(""), e = qa.map(t, this).join("");
    return "P" + r + "T" + e;
    function t(n) {
      var i = this[n] || 0;
      return n === "seconds" && this.milliseconds && (i = (i + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), i + Da[n];
    }
    __name(t, "t");
  };
  var ir = "([+-]?\\d+)", Qa = ir + "\\s+years?", Na = ir + "\\s+mons?", Wa = ir + "\\s+days?", ja = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", Ha = new RegExp([Qa, Na, Wa, ja].map(function(r) {
    return "(" + r + ")?";
  }).join("\\s*")), Ri = { years: 2, months: 4, days: 6, hours: 9, minutes: 10, seconds: 11, milliseconds: 12 }, $a = ["hours", "minutes", "seconds", "milliseconds"];
  function Ga(r) {
    var e = r + "000000".slice(r.length);
    return parseInt(
      e,
      10
    ) / 1e3;
  }
  __name(Ga, "Ga");
  a(Ga, "parseMilliseconds");
  function Va(r) {
    if (!r) return {};
    var e = Ha.exec(r), t = e[8] === "-";
    return Object.keys(Ri).reduce(function(n, i) {
      var s = Ri[i], o = e[s];
      return !o || (o = i === "milliseconds" ? Ga(o) : parseInt(o, 10), !o) || (t && ~$a.indexOf(i) && (o *= -1), n[i] = o), n;
    }, {});
  }
  __name(Va, "Va");
  a(Va, "parse");
});
var Mi = T((lf, ki) => {
  "use strict";
  p();
  ki.exports = a(function(e) {
    if (/^\\x/.test(e)) return new d(e.substr(
      2
    ), "hex");
    for (var t = "", n = 0; n < e.length; ) if (e[n] !== "\\") t += e[n], ++n;
    else if (/[0-7]{3}/.test(e.substr(n + 1, 3))) t += String.fromCharCode(parseInt(e.substr(n + 1, 3), 8)), n += 4;
    else {
      for (var i = 1; n + i < e.length && e[n + i] === "\\"; ) i++;
      for (var s = 0; s < Math.floor(i / 2); ++s) t += "\\";
      n += Math.floor(i / 2) * 2;
    }
    return new d(t, "binary");
  }, "parseBytea");
});
var Wi = T((pf, Ni) => {
  p();
  var Ve = tr(), ze = rr(), xt = Ti(), Di = Fi(), Oi = Mi();
  function St(r) {
    return a(function(t) {
      return t === null ? t : r(t);
    }, "nullAllowed");
  }
  __name(St, "St");
  a(St, "allowNull");
  function qi(r) {
    return r === null ? r : r === "TRUE" || r === "t" || r === "true" || r === "y" || r === "yes" || r === "on" || r === "1";
  }
  __name(qi, "qi");
  a(qi, "parseBool");
  function za(r) {
    return r ? Ve.parse(r, qi) : null;
  }
  __name(za, "za");
  a(za, "parseBoolArray");
  function Ka(r) {
    return parseInt(r, 10);
  }
  __name(Ka, "Ka");
  a(Ka, "parseBaseTenInt");
  function sr(r) {
    return r ? Ve.parse(r, St(Ka)) : null;
  }
  __name(sr, "sr");
  a(sr, "parseIntegerArray");
  function Ya(r) {
    return r ? Ve.parse(r, St(function(e) {
      return Qi(e).trim();
    })) : null;
  }
  __name(Ya, "Ya");
  a(Ya, "parseBigIntegerArray");
  var Za = a(function(r) {
    if (!r) return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = cr(t)), t;
    });
    return e.parse();
  }, "parsePointArray"), or = a(function(r) {
    if (!r) return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = parseFloat(t)), t;
    });
    return e.parse();
  }, "parseFloatArray"), re = a(function(r) {
    if (!r) return null;
    var e = ze.create(r);
    return e.parse();
  }, "parseStringArray"), ar = a(function(r) {
    if (!r) return null;
    var e = ze.create(
      r,
      function(t) {
        return t !== null && (t = xt(t)), t;
      }
    );
    return e.parse();
  }, "parseDateArray"), Ja = a(function(r) {
    if (!r)
      return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = Di(t)), t;
    });
    return e.parse();
  }, "parseIntervalArray"), Xa = a(function(r) {
    return r ? Ve.parse(r, St(Oi)) : null;
  }, "parseByteAArray"), ur = a(function(r) {
    return parseInt(r, 10);
  }, "parseInteger"), Qi = a(function(r) {
    var e = String(r);
    return /^\d+$/.test(e) ? e : r;
  }, "parseBigInteger"), Ui = a(function(r) {
    return r ? Ve.parse(r, St(JSON.parse)) : null;
  }, "parseJsonArray"), cr = a(
    function(r) {
      return r[0] !== "(" ? null : (r = r.substring(1, r.length - 1).split(","), { x: parseFloat(r[0]), y: parseFloat(
        r[1]
      ) });
    },
    "parsePoint"
  ), eu = a(function(r) {
    if (r[0] !== "<" && r[1] !== "(") return null;
    for (var e = "(", t = "", n = false, i = 2; i < r.length - 1; i++) {
      if (n || (e += r[i]), r[i] === ")") {
        n = true;
        continue;
      } else if (!n) continue;
      r[i] !== "," && (t += r[i]);
    }
    var s = cr(e);
    return s.radius = parseFloat(t), s;
  }, "parseCircle"), tu = a(function(r) {
    r(20, Qi), r(21, ur), r(23, ur), r(26, ur), r(700, parseFloat), r(701, parseFloat), r(16, qi), r(1082, xt), r(1114, xt), r(1184, xt), r(
      600,
      cr
    ), r(651, re), r(718, eu), r(1e3, za), r(1001, Xa), r(1005, sr), r(1007, sr), r(1028, sr), r(1016, Ya), r(1017, Za), r(1021, or), r(1022, or), r(1231, or), r(1014, re), r(1015, re), r(1008, re), r(1009, re), r(1040, re), r(1041, re), r(
      1115,
      ar
    ), r(1182, ar), r(1185, ar), r(1186, Di), r(1187, Ja), r(17, Oi), r(114, JSON.parse.bind(JSON)), r(3802, JSON.parse.bind(JSON)), r(199, Ui), r(3807, Ui), r(3907, re), r(2951, re), r(791, re), r(1183, re), r(1270, re);
  }, "init");
  Ni.exports = { init: tu };
});
var Hi = T((mf, ji) => {
  "use strict";
  p();
  var z = 1e6;
  function ru(r) {
    var e = r.readInt32BE(0), t = r.readUInt32BE(
      4
    ), n = "";
    e < 0 && (e = ~e + (t === 0), t = ~t + 1 >>> 0, n = "-");
    var i = "", s, o, u, c, l, f;
    {
      if (s = e % z, e = e / z >>> 0, o = 4294967296 * s + t, t = o / z >>> 0, u = "" + (o - z * t), t === 0 && e === 0) return n + u + i;
      for (c = "", l = 6 - u.length, f = 0; f < l; f++) c += "0";
      i = c + u + i;
    }
    {
      if (s = e % z, e = e / z >>> 0, o = 4294967296 * s + t, t = o / z >>> 0, u = "" + (o - z * t), t === 0 && e === 0) return n + u + i;
      for (c = "", l = 6 - u.length, f = 0; f < l; f++) c += "0";
      i = c + u + i;
    }
    {
      if (s = e % z, e = e / z >>> 0, o = 4294967296 * s + t, t = o / z >>> 0, u = "" + (o - z * t), t === 0 && e === 0) return n + u + i;
      for (c = "", l = 6 - u.length, f = 0; f < l; f++) c += "0";
      i = c + u + i;
    }
    return s = e % z, o = 4294967296 * s + t, u = "" + o % z, n + u + i;
  }
  __name(ru, "ru");
  a(ru, "readInt8");
  ji.exports = ru;
});
var Ki = T((bf, zi) => {
  p();
  var nu = Hi(), L = a(function(r, e, t, n, i) {
    t = t || 0, n = n || false, i = i || function(A, C, D) {
      return A * Math.pow(2, D) + C;
    };
    var s = t >> 3, o = a(function(A) {
      return n ? ~A & 255 : A;
    }, "inv"), u = 255, c = 8 - t % 8;
    e < c && (u = 255 << 8 - e & 255, c = e), t && (u = u >> t % 8);
    var l = 0;
    t % 8 + e >= 8 && (l = i(0, o(r[s]) & u, c));
    for (var f = e + t >> 3, y = s + 1; y < f; y++) l = i(l, o(
      r[y]
    ), 8);
    var g = (e + t) % 8;
    return g > 0 && (l = i(l, o(r[f]) >> 8 - g, g)), l;
  }, "parseBits"), Vi = a(function(r, e, t) {
    var n = Math.pow(2, t - 1) - 1, i = L(r, 1), s = L(r, t, 1);
    if (s === 0) return 0;
    var o = 1, u = a(function(l, f, y) {
      l === 0 && (l = 1);
      for (var g = 1; g <= y; g++) o /= 2, (f & 1 << y - g) > 0 && (l += o);
      return l;
    }, "parsePrecisionBits"), c = L(r, e, t + 1, false, u);
    return s == Math.pow(
      2,
      t + 1
    ) - 1 ? c === 0 ? i === 0 ? 1 / 0 : -1 / 0 : NaN : (i === 0 ? 1 : -1) * Math.pow(2, s - n) * c;
  }, "parseFloatFromBits"), iu = a(function(r) {
    return L(r, 1) == 1 ? -1 * (L(r, 15, 1, true) + 1) : L(r, 15, 1);
  }, "parseInt16"), $i = a(function(r) {
    return L(r, 1) == 1 ? -1 * (L(
      r,
      31,
      1,
      true
    ) + 1) : L(r, 31, 1);
  }, "parseInt32"), su = a(function(r) {
    return Vi(r, 23, 8);
  }, "parseFloat32"), ou = a(function(r) {
    return Vi(r, 52, 11);
  }, "parseFloat64"), au = a(function(r) {
    var e = L(r, 16, 32);
    if (e == 49152) return NaN;
    for (var t = Math.pow(1e4, L(r, 16, 16)), n = 0, i = [], s = L(r, 16), o = 0; o < s; o++) n += L(r, 16, 64 + 16 * o) * t, t /= 1e4;
    var u = Math.pow(10, L(
      r,
      16,
      48
    ));
    return (e === 0 ? 1 : -1) * Math.round(n * u) / u;
  }, "parseNumeric"), Gi = a(function(r, e) {
    var t = L(e, 1), n = L(
      e,
      63,
      1
    ), i = new Date((t === 0 ? 1 : -1) * n / 1e3 + 9466848e5);
    return r || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4), i.usec = n % 1e3, i.getMicroSeconds = function() {
      return this.usec;
    }, i.setMicroSeconds = function(s) {
      this.usec = s;
    }, i.getUTCMicroSeconds = function() {
      return this.usec;
    }, i;
  }, "parseDate"), Ke = a(
    function(r) {
      for (var e = L(
        r,
        32
      ), t = L(r, 32, 32), n = L(r, 32, 64), i = 96, s = [], o = 0; o < e; o++) s[o] = L(r, 32, i), i += 32, i += 32;
      var u = a(function(l) {
        var f = L(r, 32, i);
        if (i += 32, f == 4294967295) return null;
        var y;
        if (l == 23 || l == 20) return y = L(r, f * 8, i), i += f * 8, y;
        if (l == 25) return y = r.toString(this.encoding, i >> 3, (i += f << 3) >> 3), y;
        console.log("ERROR: ElementType not implemented: " + l);
      }, "parseElement"), c = a(function(l, f) {
        var y = [], g;
        if (l.length > 1) {
          var A = l.shift();
          for (g = 0; g < A; g++) y[g] = c(l, f);
          l.unshift(A);
        } else for (g = 0; g < l[0]; g++) y[g] = u(f);
        return y;
      }, "parse");
      return c(s, n);
    },
    "parseArray"
  ), uu = a(function(r) {
    return r.toString("utf8");
  }, "parseText"), cu = a(function(r) {
    return r === null ? null : L(r, 8) > 0;
  }, "parseBool"), lu = a(function(r) {
    r(20, nu), r(21, iu), r(23, $i), r(26, $i), r(1700, au), r(700, su), r(701, ou), r(16, cu), r(1114, Gi.bind(null, false)), r(1184, Gi.bind(null, true)), r(1e3, Ke), r(1007, Ke), r(1016, Ke), r(1008, Ke), r(1009, Ke), r(25, uu);
  }, "init");
  zi.exports = { init: lu };
});
var Zi = T((Sf, Yi) => {
  p();
  Yi.exports = {
    BOOL: 16,
    BYTEA: 17,
    CHAR: 18,
    INT8: 20,
    INT2: 21,
    INT4: 23,
    REGPROC: 24,
    TEXT: 25,
    OID: 26,
    TID: 27,
    XID: 28,
    CID: 29,
    JSON: 114,
    XML: 142,
    PG_NODE_TREE: 194,
    SMGR: 210,
    PATH: 602,
    POLYGON: 604,
    CIDR: 650,
    FLOAT4: 700,
    FLOAT8: 701,
    ABSTIME: 702,
    RELTIME: 703,
    TINTERVAL: 704,
    CIRCLE: 718,
    MACADDR8: 774,
    MONEY: 790,
    MACADDR: 829,
    INET: 869,
    ACLITEM: 1033,
    BPCHAR: 1042,
    VARCHAR: 1043,
    DATE: 1082,
    TIME: 1083,
    TIMESTAMP: 1114,
    TIMESTAMPTZ: 1184,
    INTERVAL: 1186,
    TIMETZ: 1266,
    BIT: 1560,
    VARBIT: 1562,
    NUMERIC: 1700,
    REFCURSOR: 1790,
    REGPROCEDURE: 2202,
    REGOPER: 2203,
    REGOPERATOR: 2204,
    REGCLASS: 2205,
    REGTYPE: 2206,
    UUID: 2950,
    TXID_SNAPSHOT: 2970,
    PG_LSN: 3220,
    PG_NDISTINCT: 3361,
    PG_DEPENDENCIES: 3402,
    TSVECTOR: 3614,
    TSQUERY: 3615,
    GTSVECTOR: 3642,
    REGCONFIG: 3734,
    REGDICTIONARY: 3769,
    JSONB: 3802,
    REGNAMESPACE: 4089,
    REGROLE: 4096
  };
});
var Je = T((Ze) => {
  p();
  var fu = Wi(), hu = Ki(), pu = rr(), du = Zi();
  Ze.getTypeParser = yu;
  Ze.setTypeParser = mu;
  Ze.arrayParser = pu;
  Ze.builtins = du;
  var Ye = { text: {}, binary: {} };
  function Ji(r) {
    return String(r);
  }
  __name(Ji, "Ji");
  a(Ji, "noParse");
  function yu(r, e) {
    return e = e || "text", Ye[e] && Ye[e][r] || Ji;
  }
  __name(yu, "yu");
  a(yu, "getTypeParser");
  function mu(r, e, t) {
    typeof e == "function" && (t = e, e = "text"), Ye[e][r] = t;
  }
  __name(mu, "mu");
  a(mu, "setTypeParser");
  fu.init(function(r, e) {
    Ye.text[r] = e;
  });
  hu.init(function(r, e) {
    Ye.binary[r] = e;
  });
});
var At = T((If, Xi) => {
  "use strict";
  p();
  var wu = Je();
  function Et(r) {
    this._types = r || wu, this.text = {}, this.binary = {};
  }
  __name(Et, "Et");
  a(Et, "TypeOverrides");
  Et.prototype.getOverrides = function(r) {
    switch (r) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  };
  Et.prototype.setTypeParser = function(r, e, t) {
    typeof e == "function" && (t = e, e = "text"), this.getOverrides(e)[r] = t;
  };
  Et.prototype.getTypeParser = function(r, e) {
    return e = e || "text", this.getOverrides(e)[r] || this._types.getTypeParser(r, e);
  };
  Xi.exports = Et;
});
function Xe(r) {
  let e = 1779033703, t = 3144134277, n = 1013904242, i = 2773480762, s = 1359893119, o = 2600822924, u = 528734635, c = 1541459225, l = 0, f = 0, y = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], g = a((I, w) => I >>> w | I << 32 - w, "rrot"), A = new Uint32Array(64), C = new Uint8Array(64), D = a(() => {
    for (let R = 0, j = 0; R < 16; R++, j += 4) A[R] = C[j] << 24 | C[j + 1] << 16 | C[j + 2] << 8 | C[j + 3];
    for (let R = 16; R < 64; R++) {
      let j = g(A[R - 15], 7) ^ g(A[R - 15], 18) ^ A[R - 15] >>> 3, le = g(
        A[R - 2],
        17
      ) ^ g(A[R - 2], 19) ^ A[R - 2] >>> 10;
      A[R] = A[R - 16] + j + A[R - 7] + le | 0;
    }
    let I = e, w = t, Z = n, W = i, J = s, X = o, se = u, oe = c;
    for (let R = 0; R < 64; R++) {
      let j = g(J, 6) ^ g(J, 11) ^ g(J, 25), le = J & X ^ ~J & se, de = oe + j + le + y[R] + A[R] | 0, We = g(I, 2) ^ g(
        I,
        13
      ) ^ g(I, 22), fe = I & w ^ I & Z ^ w & Z, _e = We + fe | 0;
      oe = se, se = X, X = J, J = W + de | 0, W = Z, Z = w, w = I, I = de + _e | 0;
    }
    e = e + I | 0, t = t + w | 0, n = n + Z | 0, i = i + W | 0, s = s + J | 0, o = o + X | 0, u = u + se | 0, c = c + oe | 0, f = 0;
  }, "process"), Y = a((I) => {
    typeof I == "string" && (I = new TextEncoder().encode(I));
    for (let w = 0; w < I.length; w++) C[f++] = I[w], f === 64 && D();
    l += I.length;
  }, "add"), P = a(() => {
    if (C[f++] = 128, f == 64 && D(), f + 8 > 64) {
      for (; f < 64; ) C[f++] = 0;
      D();
    }
    for (; f < 58; ) C[f++] = 0;
    let I = l * 8;
    C[f++] = I / 1099511627776 & 255, C[f++] = I / 4294967296 & 255, C[f++] = I >>> 24, C[f++] = I >>> 16 & 255, C[f++] = I >>> 8 & 255, C[f++] = I & 255, D();
    let w = new Uint8Array(
      32
    );
    return w[0] = e >>> 24, w[1] = e >>> 16 & 255, w[2] = e >>> 8 & 255, w[3] = e & 255, w[4] = t >>> 24, w[5] = t >>> 16 & 255, w[6] = t >>> 8 & 255, w[7] = t & 255, w[8] = n >>> 24, w[9] = n >>> 16 & 255, w[10] = n >>> 8 & 255, w[11] = n & 255, w[12] = i >>> 24, w[13] = i >>> 16 & 255, w[14] = i >>> 8 & 255, w[15] = i & 255, w[16] = s >>> 24, w[17] = s >>> 16 & 255, w[18] = s >>> 8 & 255, w[19] = s & 255, w[20] = o >>> 24, w[21] = o >>> 16 & 255, w[22] = o >>> 8 & 255, w[23] = o & 255, w[24] = u >>> 24, w[25] = u >>> 16 & 255, w[26] = u >>> 8 & 255, w[27] = u & 255, w[28] = c >>> 24, w[29] = c >>> 16 & 255, w[30] = c >>> 8 & 255, w[31] = c & 255, w;
  }, "digest");
  return r === void 0 ? { add: Y, digest: P } : (Y(r), P());
}
__name(Xe, "Xe");
var es = G(() => {
  "use strict";
  p();
  a(Xe, "sha256");
});
var U;
var et;
var ts = G(() => {
  "use strict";
  p();
  U = class U2 {
    static {
      __name(this, "U");
    }
    constructor() {
      E(this, "_dataLength", 0);
      E(this, "_bufferLength", 0);
      E(this, "_state", new Int32Array(4));
      E(this, "_buffer", new ArrayBuffer(68));
      E(this, "_buffer8");
      E(this, "_buffer32");
      this._buffer8 = new Uint8Array(this._buffer, 0, 68), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
    }
    static hashByteArray(e, t = false) {
      return this.onePassHasher.start().appendByteArray(
        e
      ).end(t);
    }
    static hashStr(e, t = false) {
      return this.onePassHasher.start().appendStr(e).end(t);
    }
    static hashAsciiStr(e, t = false) {
      return this.onePassHasher.start().appendAsciiStr(e).end(t);
    }
    static _hex(e) {
      let t = U2.hexChars, n = U2.hexOut, i, s, o, u;
      for (u = 0; u < 4; u += 1) for (s = u * 8, i = e[u], o = 0; o < 8; o += 2) n[s + 1 + o] = t.charAt(i & 15), i >>>= 4, n[s + 0 + o] = t.charAt(
        i & 15
      ), i >>>= 4;
      return n.join("");
    }
    static _md5cycle(e, t) {
      let n = e[0], i = e[1], s = e[2], o = e[3];
      n += (i & s | ~i & o) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[1] - 389564586 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[5] + 1200080426 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[9] - 1958414417 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[10] - 42063 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[13] - 40341101 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & o | s & ~o) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[6] - 1069501632 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[10] + 38016083 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[14] - 1019803690 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[2] - 51403784 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i ^ s ^ o) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[8] - 2022574463 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[4] + 1272893353 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[0] - 358537222 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[12] - 421815835 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (s ^ (i | ~o)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[7] + 1126891415 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[3] - 1894986606 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[15] - 30611744 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[11] - 1120210379 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s + e[2] | 0, e[3] = o + e[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(U2.stateIdentity), this;
    }
    appendStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o;
      for (o = 0; o < e.length; o += 1) {
        if (s = e.charCodeAt(o), s < 128) t[i++] = s;
        else if (s < 2048) t[i++] = (s >>> 6) + 192, t[i++] = s & 63 | 128;
        else if (s < 55296 || s > 56319) t[i++] = (s >>> 12) + 224, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        else {
          if (s = (s - 55296) * 1024 + (e.charCodeAt(++o) - 56320) + 65536, s > 1114111) throw new Error(
            "Unicode standard supports code points up to U+10FFFF"
          );
          t[i++] = (s >>> 18) + 240, t[i++] = s >>> 12 & 63 | 128, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        }
        i >= 64 && (this._dataLength += 64, U2._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
      }
      return this._bufferLength = i, this;
    }
    appendAsciiStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o, 64 - i); s--; ) t[i++] = e.charCodeAt(o++);
        if (i < 64) break;
        this._dataLength += 64, U2._md5cycle(this._state, n), i = 0;
      }
      return this._bufferLength = i, this;
    }
    appendByteArray(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o, 64 - i); s--; ) t[i++] = e[o++];
        if (i < 64) break;
        this._dataLength += 64, U2._md5cycle(this._state, n), i = 0;
      }
      return this._bufferLength = i, this;
    }
    getState() {
      let e = this._state;
      return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
    }
    setState(e) {
      let t = e.buffer, n = e.state, i = this._state, s;
      for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], s = 0; s < t.length; s += 1) this._buffer8[s] = t.charCodeAt(s);
    }
    end(e = false) {
      let t = this._bufferLength, n = this._buffer8, i = this._buffer32, s = (t >> 2) + 1;
      this._dataLength += t;
      let o = this._dataLength * 8;
      if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, i.set(U2.buffer32Identity.subarray(s), s), t > 55 && (U2._md5cycle(this._state, i), i.set(U2.buffer32Identity)), o <= 4294967295) i[14] = o;
      else {
        let u = o.toString(16).match(/(.*?)(.{0,8})$/);
        if (u === null) return;
        let c = parseInt(
          u[2],
          16
        ), l = parseInt(u[1], 16) || 0;
        i[14] = c, i[15] = l;
      }
      return U2._md5cycle(this._state, i), e ? this._state : U2._hex(
        this._state
      );
    }
  };
  a(U, "Md5"), E(U, "stateIdentity", new Int32Array([1732584193, -271733879, -1732584194, 271733878])), E(U, "buffer32Identity", new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), E(U, "hexChars", "0123456789abcdef"), E(U, "hexOut", []), E(U, "onePassHasher", new U());
  et = U;
});
var lr = {};
ie(lr, { createHash: /* @__PURE__ */ __name(() => bu, "createHash"), createHmac: /* @__PURE__ */ __name(() => vu, "createHmac"), randomBytes: /* @__PURE__ */ __name(() => gu, "randomBytes") });
function gu(r) {
  return crypto.getRandomValues(d.alloc(r));
}
__name(gu, "gu");
function bu(r) {
  if (r === "sha256") return { update: a(function(e) {
    return { digest: a(
      function() {
        return d.from(Xe(e));
      },
      "digest"
    ) };
  }, "update") };
  if (r === "md5") return { update: a(function(e) {
    return {
      digest: a(function() {
        return typeof e == "string" ? et.hashStr(e) : et.hashByteArray(e);
      }, "digest")
    };
  }, "update") };
  throw new Error(`Hash type '${r}' not supported`);
}
__name(bu, "bu");
function vu(r, e) {
  if (r !== "sha256") throw new Error(`Only sha256 is supported (requested: '${r}')`);
  return { update: a(function(t) {
    return { digest: a(
      function() {
        typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(
          t
        ));
        let n = e.length;
        if (n > 64) e = Xe(e);
        else if (n < 64) {
          let c = new Uint8Array(64);
          c.set(e), e = c;
        }
        let i = new Uint8Array(
          64
        ), s = new Uint8Array(64);
        for (let c = 0; c < 64; c++) i[c] = 54 ^ e[c], s[c] = 92 ^ e[c];
        let o = new Uint8Array(t.length + 64);
        o.set(i, 0), o.set(t, 64);
        let u = new Uint8Array(96);
        return u.set(s, 0), u.set(Xe(o), 64), d.from(Xe(u));
      },
      "digest"
    ) };
  }, "update") };
}
__name(vu, "vu");
var fr = G(() => {
  "use strict";
  p();
  es();
  ts();
  a(gu, "randomBytes");
  a(bu, "createHash");
  a(vu, "createHmac");
});
var tt = T((Qf, hr) => {
  "use strict";
  p();
  hr.exports = {
    host: "localhost",
    user: m.platform === "win32" ? m.env.USERNAME : m.env.USER,
    database: void 0,
    password: null,
    connectionString: void 0,
    port: 5432,
    rows: 0,
    binary: false,
    max: 10,
    idleTimeoutMillis: 3e4,
    client_encoding: "",
    ssl: false,
    application_name: void 0,
    fallback_application_name: void 0,
    options: void 0,
    parseInputDatesAsUTC: false,
    statement_timeout: false,
    lock_timeout: false,
    idle_in_transaction_session_timeout: false,
    query_timeout: false,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
  };
  var Me = Je(), xu = Me.getTypeParser(20, "text"), Su = Me.getTypeParser(
    1016,
    "text"
  );
  hr.exports.__defineSetter__("parseInt8", function(r) {
    Me.setTypeParser(20, "text", r ? Me.getTypeParser(
      23,
      "text"
    ) : xu), Me.setTypeParser(1016, "text", r ? Me.getTypeParser(1007, "text") : Su);
  });
});
var rt = T((Wf, ns) => {
  "use strict";
  p();
  var Eu = (fr(), O(lr)), Au = tt();
  function Cu(r) {
    var e = r.replace(
      /\\/g,
      "\\\\"
    ).replace(/"/g, '\\"');
    return '"' + e + '"';
  }
  __name(Cu, "Cu");
  a(Cu, "escapeElement");
  function rs(r) {
    for (var e = "{", t = 0; t < r.length; t++) t > 0 && (e = e + ","), r[t] === null || typeof r[t] > "u" ? e = e + "NULL" : Array.isArray(r[t]) ? e = e + rs(r[t]) : r[t] instanceof d ? e += "\\\\x" + r[t].toString("hex") : e += Cu(Ct(r[t]));
    return e = e + "}", e;
  }
  __name(rs, "rs");
  a(rs, "arrayString");
  var Ct = a(function(r, e) {
    if (r == null) return null;
    if (r instanceof d) return r;
    if (ArrayBuffer.isView(r)) {
      var t = d.from(r.buffer, r.byteOffset, r.byteLength);
      return t.length === r.byteLength ? t : t.slice(r.byteOffset, r.byteOffset + r.byteLength);
    }
    return r instanceof Date ? Au.parseInputDatesAsUTC ? Tu(r) : Iu(r) : Array.isArray(r) ? rs(r) : typeof r == "object" ? _u(r, e) : r.toString();
  }, "prepareValue");
  function _u(r, e) {
    if (r && typeof r.toPostgres == "function") {
      if (e = e || [], e.indexOf(r) !== -1) throw new Error('circular reference detected while preparing "' + r + '" for query');
      return e.push(r), Ct(r.toPostgres(Ct), e);
    }
    return JSON.stringify(r);
  }
  __name(_u, "_u");
  a(_u, "prepareObject");
  function N(r, e) {
    for (r = "" + r; r.length < e; ) r = "0" + r;
    return r;
  }
  __name(N, "N");
  a(N, "pad");
  function Iu(r) {
    var e = -r.getTimezoneOffset(), t = r.getFullYear(), n = t < 1;
    n && (t = Math.abs(t) + 1);
    var i = N(t, 4) + "-" + N(r.getMonth() + 1, 2) + "-" + N(r.getDate(), 2) + "T" + N(
      r.getHours(),
      2
    ) + ":" + N(r.getMinutes(), 2) + ":" + N(r.getSeconds(), 2) + "." + N(r.getMilliseconds(), 3);
    return e < 0 ? (i += "-", e *= -1) : i += "+", i += N(Math.floor(e / 60), 2) + ":" + N(e % 60, 2), n && (i += " BC"), i;
  }
  __name(Iu, "Iu");
  a(Iu, "dateToString");
  function Tu(r) {
    var e = r.getUTCFullYear(), t = e < 1;
    t && (e = Math.abs(e) + 1);
    var n = N(e, 4) + "-" + N(r.getUTCMonth() + 1, 2) + "-" + N(r.getUTCDate(), 2) + "T" + N(r.getUTCHours(), 2) + ":" + N(r.getUTCMinutes(), 2) + ":" + N(r.getUTCSeconds(), 2) + "." + N(
      r.getUTCMilliseconds(),
      3
    );
    return n += "+00:00", t && (n += " BC"), n;
  }
  __name(Tu, "Tu");
  a(Tu, "dateToStringUTC");
  function Pu(r, e, t) {
    return r = typeof r == "string" ? { text: r } : r, e && (typeof e == "function" ? r.callback = e : r.values = e), t && (r.callback = t), r;
  }
  __name(Pu, "Pu");
  a(Pu, "normalizeQueryConfig");
  var pr = a(function(r) {
    return Eu.createHash("md5").update(r, "utf-8").digest("hex");
  }, "md5"), Bu = a(
    function(r, e, t) {
      var n = pr(e + r), i = pr(d.concat([d.from(n), t]));
      return "md5" + i;
    },
    "postgresMd5PasswordHash"
  );
  ns.exports = {
    prepareValue: a(function(e) {
      return Ct(e);
    }, "prepareValueWrapper"),
    normalizeQueryConfig: Pu,
    postgresMd5PasswordHash: Bu,
    md5: pr
  };
});
var nt = {};
ie(nt, { default: /* @__PURE__ */ __name(() => ku, "default") });
var ku;
var it = G(() => {
  "use strict";
  p();
  ku = {};
});
var ds = T((th, ps) => {
  "use strict";
  p();
  var yr = (fr(), O(lr));
  function Mu(r) {
    if (r.indexOf("SCRAM-SHA-256") === -1) throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let e = yr.randomBytes(
      18
    ).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: e, response: "n,,n=*,r=" + e, message: "SASLInitialResponse" };
  }
  __name(Mu, "Mu");
  a(Mu, "startSession");
  function Uu(r, e, t) {
    if (r.message !== "SASLInitialResponse") throw new Error(
      "SASL: Last message was not SASLInitialResponse"
    );
    if (typeof e != "string") throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
    if (typeof t != "string") throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    let n = qu(t);
    if (n.nonce.startsWith(r.clientNonce)) {
      if (n.nonce.length === r.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    var i = d.from(n.salt, "base64"), s = Wu(e, i, n.iteration), o = Ue(s, "Client Key"), u = Nu(
      o
    ), c = "n=*,r=" + r.clientNonce, l = "r=" + n.nonce + ",s=" + n.salt + ",i=" + n.iteration, f = "c=biws,r=" + n.nonce, y = c + "," + l + "," + f, g = Ue(u, y), A = hs(o, g), C = A.toString("base64"), D = Ue(s, "Server Key"), Y = Ue(D, y);
    r.message = "SASLResponse", r.serverSignature = Y.toString("base64"), r.response = f + ",p=" + C;
  }
  __name(Uu, "Uu");
  a(Uu, "continueSession");
  function Du(r, e) {
    if (r.message !== "SASLResponse") throw new Error("SASL: Last message was not SASLResponse");
    if (typeof e != "string") throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    let { serverSignature: t } = Qu(
      e
    );
    if (t !== r.serverSignature) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
  __name(Du, "Du");
  a(Du, "finalizeSession");
  function Ou(r) {
    if (typeof r != "string") throw new TypeError("SASL: text must be a string");
    return r.split("").map((e, t) => r.charCodeAt(t)).every((e) => e >= 33 && e <= 43 || e >= 45 && e <= 126);
  }
  __name(Ou, "Ou");
  a(Ou, "isPrintableChars");
  function ls(r) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r);
  }
  __name(ls, "ls");
  a(ls, "isBase64");
  function fs(r) {
    if (typeof r != "string") throw new TypeError("SASL: attribute pairs text must be a string");
    return new Map(r.split(",").map((e) => {
      if (!/^.=/.test(e)) throw new Error("SASL: Invalid attribute pair entry");
      let t = e[0], n = e.substring(2);
      return [t, n];
    }));
  }
  __name(fs, "fs");
  a(fs, "parseAttributePairs");
  function qu(r) {
    let e = fs(r), t = e.get("r");
    if (t) {
      if (!Ou(t)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    let n = e.get("s");
    if (n) {
      if (!ls(n)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    let i = e.get("i");
    if (i) {
      if (!/^[1-9][0-9]*$/.test(i)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let s = parseInt(i, 10);
    return { nonce: t, salt: n, iteration: s };
  }
  __name(qu, "qu");
  a(qu, "parseServerFirstMessage");
  function Qu(r) {
    let t = fs(r).get("v");
    if (t) {
      if (!ls(t)) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    } else throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
    return { serverSignature: t };
  }
  __name(Qu, "Qu");
  a(Qu, "parseServerFinalMessage");
  function hs(r, e) {
    if (!d.isBuffer(r)) throw new TypeError("first argument must be a Buffer");
    if (!d.isBuffer(e)) throw new TypeError(
      "second argument must be a Buffer"
    );
    if (r.length !== e.length) throw new Error("Buffer lengths must match");
    if (r.length === 0) throw new Error("Buffers cannot be empty");
    return d.from(r.map((t, n) => r[n] ^ e[n]));
  }
  __name(hs, "hs");
  a(hs, "xorBuffers");
  function Nu(r) {
    return yr.createHash("sha256").update(r).digest();
  }
  __name(Nu, "Nu");
  a(Nu, "sha256");
  function Ue(r, e) {
    return yr.createHmac("sha256", r).update(e).digest();
  }
  __name(Ue, "Ue");
  a(Ue, "hmacSha256");
  function Wu(r, e, t) {
    for (var n = Ue(
      r,
      d.concat([e, d.from([0, 0, 0, 1])])
    ), i = n, s = 0; s < t - 1; s++) n = Ue(r, n), i = hs(i, n);
    return i;
  }
  __name(Wu, "Wu");
  a(Wu, "Hi");
  ps.exports = { startSession: Mu, continueSession: Uu, finalizeSession: Du };
});
var mr = {};
ie(mr, { join: /* @__PURE__ */ __name(() => ju, "join") });
function ju(...r) {
  return r.join("/");
}
__name(ju, "ju");
var wr = G(() => {
  "use strict";
  p();
  a(
    ju,
    "join"
  );
});
var gr = {};
ie(gr, { stat: /* @__PURE__ */ __name(() => Hu, "stat") });
function Hu(r, e) {
  e(new Error("No filesystem"));
}
__name(Hu, "Hu");
var br = G(() => {
  "use strict";
  p();
  a(Hu, "stat");
});
var vr = {};
ie(vr, { default: /* @__PURE__ */ __name(() => $u, "default") });
var $u;
var xr = G(() => {
  "use strict";
  p();
  $u = {};
});
var ys = {};
ie(ys, { StringDecoder: /* @__PURE__ */ __name(() => Sr, "StringDecoder") });
var Er;
var Sr;
var ms = G(() => {
  "use strict";
  p();
  Er = class Er {
    static {
      __name(this, "Er");
    }
    constructor(e) {
      E(this, "td");
      this.td = new TextDecoder(e);
    }
    write(e) {
      return this.td.decode(e, { stream: true });
    }
    end(e) {
      return this.td.decode(e);
    }
  };
  a(Er, "StringDecoder");
  Sr = Er;
});
var vs = T((fh, bs) => {
  "use strict";
  p();
  var { Transform: Gu } = (xr(), O(vr)), { StringDecoder: Vu } = (ms(), O(ys)), ve = Symbol(
    "last"
  ), It = Symbol("decoder");
  function zu(r, e, t) {
    let n;
    if (this.overflow) {
      if (n = this[It].write(r).split(
        this.matcher
      ), n.length === 1) return t();
      n.shift(), this.overflow = false;
    } else this[ve] += this[It].write(r), n = this[ve].split(this.matcher);
    this[ve] = n.pop();
    for (let i = 0; i < n.length; i++) try {
      gs(this, this.mapper(n[i]));
    } catch (s) {
      return t(s);
    }
    if (this.overflow = this[ve].length > this.maxLength, this.overflow && !this.skipOverflow) {
      t(new Error(
        "maximum buffer reached"
      ));
      return;
    }
    t();
  }
  __name(zu, "zu");
  a(zu, "transform");
  function Ku(r) {
    if (this[ve] += this[It].end(), this[ve])
      try {
        gs(this, this.mapper(this[ve]));
      } catch (e) {
        return r(e);
      }
    r();
  }
  __name(Ku, "Ku");
  a(Ku, "flush");
  function gs(r, e) {
    e !== void 0 && r.push(e);
  }
  __name(gs, "gs");
  a(gs, "push");
  function ws(r) {
    return r;
  }
  __name(ws, "ws");
  a(ws, "noop");
  function Yu(r, e, t) {
    switch (r = r || /\r?\n/, e = e || ws, t = t || {}, arguments.length) {
      case 1:
        typeof r == "function" ? (e = r, r = /\r?\n/) : typeof r == "object" && !(r instanceof RegExp) && !r[Symbol.split] && (t = r, r = /\r?\n/);
        break;
      case 2:
        typeof r == "function" ? (t = e, e = r, r = /\r?\n/) : typeof e == "object" && (t = e, e = ws);
    }
    t = Object.assign({}, t), t.autoDestroy = true, t.transform = zu, t.flush = Ku, t.readableObjectMode = true;
    let n = new Gu(t);
    return n[ve] = "", n[It] = new Vu("utf8"), n.matcher = r, n.mapper = e, n.maxLength = t.maxLength, n.skipOverflow = t.skipOverflow || false, n.overflow = false, n._destroy = function(i, s) {
      this._writableState.errorEmitted = false, s(i);
    }, n;
  }
  __name(Yu, "Yu");
  a(Yu, "split");
  bs.exports = Yu;
});
var Es = T((dh, pe) => {
  "use strict";
  p();
  var xs = (wr(), O(mr)), Zu = (xr(), O(vr)).Stream, Ju = vs(), Ss = (it(), O(nt)), Xu = 5432, Tt = m.platform === "win32", st = m.stderr, ec = 56, tc = 7, rc = 61440, nc = 32768;
  function ic(r) {
    return (r & rc) == nc;
  }
  __name(ic, "ic");
  a(ic, "isRegFile");
  var De = ["host", "port", "database", "user", "password"], Ar = De.length, sc = De[Ar - 1];
  function Cr() {
    var r = st instanceof Zu && st.writable === true;
    if (r) {
      var e = Array.prototype.slice.call(arguments).concat(`
`);
      st.write(Ss.format.apply(Ss, e));
    }
  }
  __name(Cr, "Cr");
  a(Cr, "warn");
  Object.defineProperty(pe.exports, "isWin", { get: a(function() {
    return Tt;
  }, "get"), set: a(function(r) {
    Tt = r;
  }, "set") });
  pe.exports.warnTo = function(r) {
    var e = st;
    return st = r, e;
  };
  pe.exports.getFileName = function(r) {
    var e = r || m.env, t = e.PGPASSFILE || (Tt ? xs.join(e.APPDATA || "./", "postgresql", "pgpass.conf") : xs.join(e.HOME || "./", ".pgpass"));
    return t;
  };
  pe.exports.usePgPass = function(r, e) {
    return Object.prototype.hasOwnProperty.call(m.env, "PGPASSWORD") ? false : Tt ? true : (e = e || "<unkn>", ic(r.mode) ? r.mode & (ec | tc) ? (Cr('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e), false) : true : (Cr('WARNING: password file "%s" is not a plain file', e), false));
  };
  var oc = pe.exports.match = function(r, e) {
    return De.slice(0, -1).reduce(function(t, n, i) {
      return i == 1 && Number(r[n] || Xu) === Number(
        e[n]
      ) ? t && true : t && (e[n] === "*" || e[n] === r[n]);
    }, true);
  };
  pe.exports.getPassword = function(r, e, t) {
    var n, i = e.pipe(
      Ju()
    );
    function s(c) {
      var l = ac(c);
      l && uc(l) && oc(r, l) && (n = l[sc], i.end());
    }
    __name(s, "s");
    a(s, "onLine");
    var o = a(function() {
      e.destroy(), t(n);
    }, "onEnd"), u = a(function(c) {
      e.destroy(), Cr("WARNING: error on reading file: %s", c), t(
        void 0
      );
    }, "onErr");
    e.on("error", u), i.on("data", s).on("end", o).on("error", u);
  };
  var ac = pe.exports.parseLine = function(r) {
    if (r.length < 11 || r.match(/^\s+#/)) return null;
    for (var e = "", t = "", n = 0, i = 0, s = 0, o = {}, u = false, c = a(
      function(f, y, g) {
        var A = r.substring(y, g);
        Object.hasOwnProperty.call(m.env, "PGPASS_NO_DEESCAPE") || (A = A.replace(/\\([:\\])/g, "$1")), o[De[f]] = A;
      },
      "addToObj"
    ), l = 0; l < r.length - 1; l += 1) {
      if (e = r.charAt(l + 1), t = r.charAt(
        l
      ), u = n == Ar - 1, u) {
        c(n, i);
        break;
      }
      l >= 0 && e == ":" && t !== "\\" && (c(n, i, l + 1), i = l + 2, n += 1);
    }
    return o = Object.keys(o).length === Ar ? o : null, o;
  }, uc = pe.exports.isValidEntry = function(r) {
    for (var e = { 0: function(o) {
      return o.length > 0;
    }, 1: function(o) {
      return o === "*" ? true : (o = Number(o), isFinite(o) && o > 0 && o < 9007199254740992 && Math.floor(o) === o);
    }, 2: function(o) {
      return o.length > 0;
    }, 3: function(o) {
      return o.length > 0;
    }, 4: function(o) {
      return o.length > 0;
    } }, t = 0; t < De.length; t += 1) {
      var n = e[t], i = r[De[t]] || "", s = n(i);
      if (!s) return false;
    }
    return true;
  };
});
var Cs = T((gh, _r) => {
  "use strict";
  p();
  var wh = (wr(), O(mr)), As = (br(), O(gr)), Pt = Es();
  _r.exports = function(r, e) {
    var t = Pt.getFileName();
    As.stat(t, function(n, i) {
      if (n || !Pt.usePgPass(i, t)) return e(void 0);
      var s = As.createReadStream(
        t
      );
      Pt.getPassword(r, s, e);
    });
  };
  _r.exports.warnTo = Pt.warnTo;
});
var _s = {};
ie(_s, { default: /* @__PURE__ */ __name(() => cc, "default") });
var cc;
var Is = G(() => {
  "use strict";
  p();
  cc = {};
});
var Ps = T((xh, Ts) => {
  "use strict";
  p();
  var lc = (Zt(), O(gi)), Ir = (br(), O(gr));
  function Tr(r) {
    if (r.charAt(0) === "/") {
      var t = r.split(" ");
      return { host: t[0], database: t[1] };
    }
    var e = lc.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) ? encodeURI(r).replace(/\%25(\d\d)/g, "%$1") : r, true), t = e.query;
    for (var n in t) Array.isArray(t[n]) && (t[n] = t[n][t[n].length - 1]);
    var i = (e.auth || ":").split(":");
    if (t.user = i[0], t.password = i.splice(1).join(
      ":"
    ), t.port = e.port, e.protocol == "socket:") return t.host = decodeURI(e.pathname), t.database = e.query.db, t.client_encoding = e.query.encoding, t;
    t.host || (t.host = e.hostname);
    var s = e.pathname;
    if (!t.host && s && /^%2f/i.test(s)) {
      var o = s.split("/");
      t.host = decodeURIComponent(o[0]), s = o.splice(1).join("/");
    }
    switch (s && s.charAt(
      0
    ) === "/" && (s = s.slice(1) || null), t.database = s && decodeURI(s), (t.ssl === "true" || t.ssl === "1") && (t.ssl = true), t.ssl === "0" && (t.ssl = false), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = Ir.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = Ir.readFileSync(t.sslkey).toString()), t.sslrootcert && (t.ssl.ca = Ir.readFileSync(t.sslrootcert).toString()), t.sslmode) {
      case "disable": {
        t.ssl = false;
        break;
      }
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        break;
      case "no-verify": {
        t.ssl.rejectUnauthorized = false;
        break;
      }
    }
    return t;
  }
  __name(Tr, "Tr");
  a(Tr, "parse");
  Ts.exports = Tr;
  Tr.parse = Tr;
});
var Bt = T((Ah, Ls) => {
  "use strict";
  p();
  var fc = (Is(), O(_s)), Rs = tt(), Bs = Ps().parse, H = a(function(r, e, t) {
    return t === void 0 ? t = m.env["PG" + r.toUpperCase()] : t === false || (t = m.env[t]), e[r] || t || Rs[r];
  }, "val"), hc = a(function() {
    switch (m.env.PGSSLMODE) {
      case "disable":
        return false;
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        return true;
      case "no-verify":
        return { rejectUnauthorized: false };
    }
    return Rs.ssl;
  }, "readSSLConfigFromEnvironment"), Oe = a(function(r) {
    return "'" + ("" + r).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  }, "quoteParamValue"), ne = a(function(r, e, t) {
    var n = e[t];
    n != null && r.push(t + "=" + Oe(n));
  }, "add"), Br = class Br {
    static {
      __name(this, "Br");
    }
    constructor(e) {
      e = typeof e == "string" ? Bs(e) : e || {}, e.connectionString && (e = Object.assign({}, e, Bs(e.connectionString))), this.user = H("user", e), this.database = H("database", e), this.database === void 0 && (this.database = this.user), this.port = parseInt(H("port", e), 10), this.host = H("host", e), Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: H("password", e)
      }), this.binary = H("binary", e), this.options = H("options", e), this.ssl = typeof e.ssl > "u" ? hc() : e.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = H("client_encoding", e), this.replication = H("replication", e), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = H("application_name", e, "PGAPPNAME"), this.fallback_application_name = H("fallback_application_name", e, false), this.statement_timeout = H("statement_timeout", e, false), this.lock_timeout = H("lock_timeout", e, false), this.idle_in_transaction_session_timeout = H("idle_in_transaction_session_timeout", e, false), this.query_timeout = H("query_timeout", e, false), e.connectionTimeoutMillis === void 0 ? this.connect_timeout = m.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e.connectionTimeoutMillis / 1e3), e.keepAlive === false ? this.keepalives = 0 : e.keepAlive === true && (this.keepalives = 1), typeof e.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e.keepAliveInitialDelayMillis / 1e3));
    }
    getLibpqConnectionString(e) {
      var t = [];
      ne(t, this, "user"), ne(t, this, "password"), ne(t, this, "port"), ne(t, this, "application_name"), ne(
        t,
        this,
        "fallback_application_name"
      ), ne(t, this, "connect_timeout"), ne(t, this, "options");
      var n = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      if (ne(t, n, "sslmode"), ne(t, n, "sslca"), ne(t, n, "sslkey"), ne(t, n, "sslcert"), ne(t, n, "sslrootcert"), this.database && t.push("dbname=" + Oe(this.database)), this.replication && t.push("replication=" + Oe(this.replication)), this.host && t.push("host=" + Oe(this.host)), this.isDomainSocket) return e(null, t.join(" "));
      this.client_encoding && t.push("client_encoding=" + Oe(this.client_encoding)), fc.lookup(this.host, function(i, s) {
        return i ? e(i, null) : (t.push("hostaddr=" + Oe(s)), e(null, t.join(" ")));
      });
    }
  };
  a(Br, "ConnectionParameters");
  var Pr = Br;
  Ls.exports = Pr;
});
var Ms = T((Ih, ks) => {
  "use strict";
  p();
  var pc = Je(), Fs = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, Lr = class Lr {
    static {
      __name(this, "Lr");
    }
    constructor(e, t) {
      this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t, this.RowCtor = null, this.rowAsArray = e === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
    }
    addCommandComplete(e) {
      var t;
      e.text ? t = Fs.exec(e.text) : t = Fs.exec(e.command), t && (this.command = t[1], t[3] ? (this.oid = parseInt(
        t[2],
        10
      ), this.rowCount = parseInt(t[3], 10)) : t[2] && (this.rowCount = parseInt(t[2], 10)));
    }
    _parseRowAsArray(e) {
      for (var t = new Array(
        e.length
      ), n = 0, i = e.length; n < i; n++) {
        var s = e[n];
        s !== null ? t[n] = this._parsers[n](s) : t[n] = null;
      }
      return t;
    }
    parseRow(e) {
      for (var t = {}, n = 0, i = e.length; n < i; n++) {
        var s = e[n], o = this.fields[n].name;
        s !== null ? t[o] = this._parsers[n](
          s
        ) : t[o] = null;
      }
      return t;
    }
    addRow(e) {
      this.rows.push(e);
    }
    addFields(e) {
      this.fields = e, this.fields.length && (this._parsers = new Array(e.length));
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        this._types ? this._parsers[t] = this._types.getTypeParser(n.dataTypeID, n.format || "text") : this._parsers[t] = pc.getTypeParser(n.dataTypeID, n.format || "text");
      }
    }
  };
  a(Lr, "Result");
  var Rr = Lr;
  ks.exports = Rr;
});
var qs = T((Bh, Os) => {
  "use strict";
  p();
  var { EventEmitter: dc } = ge(), Us = Ms(), Ds = rt(), kr = class kr extends dc {
    static {
      __name(this, "kr");
    }
    constructor(e, t, n) {
      super(), e = Ds.normalizeQueryConfig(e, t, n), this.text = e.text, this.values = e.values, this.rows = e.rows, this.types = e.types, this.name = e.name, this.binary = e.binary, this.portal = e.portal || "", this.callback = e.callback, this._rowMode = e.rowMode, m.domain && e.callback && (this.callback = m.domain.bind(e.callback)), this._result = new Us(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
    }
    requiresPreparation() {
      return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
    }
    _checkForMultirow() {
      this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new Us(this._rowMode, this.types), this._results.push(this._result));
    }
    handleRowDescription(e) {
      this._checkForMultirow(), this._result.addFields(e.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(e) {
      let t;
      if (!this._canceledDueToError) {
        try {
          t = this._result.parseRow(
            e.fields
          );
        } catch (n) {
          this._canceledDueToError = n;
          return;
        }
        this.emit("row", t, this._result), this._accumulateRows && this._result.addRow(t);
      }
    }
    handleCommandComplete(e, t) {
      this._checkForMultirow(), this._result.addCommandComplete(
        e
      ), this.rows && t.sync();
    }
    handleEmptyQuery(e) {
      this.rows && e.sync();
    }
    handleError(e, t) {
      if (this._canceledDueToError && (e = this._canceledDueToError, this._canceledDueToError = false), this.callback) return this.callback(e);
      this.emit("error", e);
    }
    handleReadyForQuery(e) {
      if (this._canceledDueToError) return this.handleError(
        this._canceledDueToError,
        e
      );
      if (this.callback) try {
        this.callback(null, this._results);
      } catch (t) {
        m.nextTick(() => {
          throw t;
        });
      }
      this.emit(
        "end",
        this._results
      );
    }
    submit(e) {
      if (typeof this.text != "string" && typeof this.name != "string") return new Error(
        "A query must have either text or a name. Supplying neither is unsupported."
      );
      let t = e.parsedStatements[this.name];
      return this.text && t && this.text !== t ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(e) : e.query(this.text), null);
    }
    hasBeenParsed(e) {
      return this.name && e.parsedStatements[this.name];
    }
    handlePortalSuspended(e) {
      this._getRows(e, this.rows);
    }
    _getRows(e, t) {
      e.execute({ portal: this.portal, rows: t }), t ? e.flush() : e.sync();
    }
    prepare(e) {
      this.isPreparedStatement = true, this.hasBeenParsed(e) || e.parse({ text: this.text, name: this.name, types: this.types });
      try {
        e.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: Ds.prepareValue });
      } catch (t) {
        this.handleError(t, e);
        return;
      }
      e.describe({ type: "P", name: this.portal || "" }), this._getRows(e, this.rows);
    }
    handleCopyInResponse(e) {
      e.sendCopyFail("No source stream defined");
    }
    handleCopyData(e, t) {
    }
  };
  a(kr, "Query");
  var Fr = kr;
  Os.exports = Fr;
});
var ln = T((_) => {
  "use strict";
  p();
  Object.defineProperty(_, "__esModule", { value: true });
  _.NoticeMessage = _.DataRowMessage = _.CommandCompleteMessage = _.ReadyForQueryMessage = _.NotificationResponseMessage = _.BackendKeyDataMessage = _.AuthenticationMD5Password = _.ParameterStatusMessage = _.ParameterDescriptionMessage = _.RowDescriptionMessage = _.Field = _.CopyResponse = _.CopyDataMessage = _.DatabaseError = _.copyDone = _.emptyQuery = _.replicationStart = _.portalSuspended = _.noData = _.closeComplete = _.bindComplete = _.parseComplete = void 0;
  _.parseComplete = { name: "parseComplete", length: 5 };
  _.bindComplete = { name: "bindComplete", length: 5 };
  _.closeComplete = { name: "closeComplete", length: 5 };
  _.noData = { name: "noData", length: 5 };
  _.portalSuspended = { name: "portalSuspended", length: 5 };
  _.replicationStart = { name: "replicationStart", length: 4 };
  _.emptyQuery = { name: "emptyQuery", length: 4 };
  _.copyDone = { name: "copyDone", length: 4 };
  var Kr = class Kr extends Error {
    static {
      __name(this, "Kr");
    }
    constructor(e, t, n) {
      super(e), this.length = t, this.name = n;
    }
  };
  a(Kr, "DatabaseError");
  var Mr = Kr;
  _.DatabaseError = Mr;
  var Yr = class Yr {
    static {
      __name(this, "Yr");
    }
    constructor(e, t) {
      this.length = e, this.chunk = t, this.name = "copyData";
    }
  };
  a(Yr, "CopyDataMessage");
  var Ur = Yr;
  _.CopyDataMessage = Ur;
  var Zr = class Zr {
    static {
      __name(this, "Zr");
    }
    constructor(e, t, n, i) {
      this.length = e, this.name = t, this.binary = n, this.columnTypes = new Array(i);
    }
  };
  a(Zr, "CopyResponse");
  var Dr = Zr;
  _.CopyResponse = Dr;
  var Jr = class Jr {
    static {
      __name(this, "Jr");
    }
    constructor(e, t, n, i, s, o, u) {
      this.name = e, this.tableID = t, this.columnID = n, this.dataTypeID = i, this.dataTypeSize = s, this.dataTypeModifier = o, this.format = u;
    }
  };
  a(Jr, "Field");
  var Or = Jr;
  _.Field = Or;
  var Xr = class Xr {
    static {
      __name(this, "Xr");
    }
    constructor(e, t) {
      this.length = e, this.fieldCount = t, this.name = "rowDescription", this.fields = new Array(this.fieldCount);
    }
  };
  a(Xr, "RowDescriptionMessage");
  var qr = Xr;
  _.RowDescriptionMessage = qr;
  var en = class en {
    static {
      __name(this, "en");
    }
    constructor(e, t) {
      this.length = e, this.parameterCount = t, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
    }
  };
  a(en, "ParameterDescriptionMessage");
  var Qr = en;
  _.ParameterDescriptionMessage = Qr;
  var tn = class tn {
    static {
      __name(this, "tn");
    }
    constructor(e, t, n) {
      this.length = e, this.parameterName = t, this.parameterValue = n, this.name = "parameterStatus";
    }
  };
  a(tn, "ParameterStatusMessage");
  var Nr = tn;
  _.ParameterStatusMessage = Nr;
  var rn = class rn {
    static {
      __name(this, "rn");
    }
    constructor(e, t) {
      this.length = e, this.salt = t, this.name = "authenticationMD5Password";
    }
  };
  a(rn, "AuthenticationMD5Password");
  var Wr = rn;
  _.AuthenticationMD5Password = Wr;
  var nn = class nn {
    static {
      __name(this, "nn");
    }
    constructor(e, t, n) {
      this.length = e, this.processID = t, this.secretKey = n, this.name = "backendKeyData";
    }
  };
  a(nn, "BackendKeyDataMessage");
  var jr = nn;
  _.BackendKeyDataMessage = jr;
  var sn = class sn {
    static {
      __name(this, "sn");
    }
    constructor(e, t, n, i) {
      this.length = e, this.processId = t, this.channel = n, this.payload = i, this.name = "notification";
    }
  };
  a(sn, "NotificationResponseMessage");
  var Hr = sn;
  _.NotificationResponseMessage = Hr;
  var on = class on {
    static {
      __name(this, "on");
    }
    constructor(e, t) {
      this.length = e, this.status = t, this.name = "readyForQuery";
    }
  };
  a(on, "ReadyForQueryMessage");
  var $r = on;
  _.ReadyForQueryMessage = $r;
  var an = class an {
    static {
      __name(this, "an");
    }
    constructor(e, t) {
      this.length = e, this.text = t, this.name = "commandComplete";
    }
  };
  a(an, "CommandCompleteMessage");
  var Gr = an;
  _.CommandCompleteMessage = Gr;
  var un = class un {
    static {
      __name(this, "un");
    }
    constructor(e, t) {
      this.length = e, this.fields = t, this.name = "dataRow", this.fieldCount = t.length;
    }
  };
  a(un, "DataRowMessage");
  var Vr = un;
  _.DataRowMessage = Vr;
  var cn = class cn {
    static {
      __name(this, "cn");
    }
    constructor(e, t) {
      this.length = e, this.message = t, this.name = "notice";
    }
  };
  a(cn, "NoticeMessage");
  var zr = cn;
  _.NoticeMessage = zr;
});
var Qs = T((Rt) => {
  "use strict";
  p();
  Object.defineProperty(Rt, "__esModule", { value: true });
  Rt.Writer = void 0;
  var hn = class hn {
    static {
      __name(this, "hn");
    }
    constructor(e = 256) {
      this.size = e, this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(e);
    }
    ensure(e) {
      if (this.buffer.length - this.offset < e) {
        let n = this.buffer, i = n.length + (n.length >> 1) + e;
        this.buffer = d.allocUnsafe(i), n.copy(
          this.buffer
        );
      }
    }
    addInt32(e) {
      return this.ensure(4), this.buffer[this.offset++] = e >>> 24 & 255, this.buffer[this.offset++] = e >>> 16 & 255, this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
    }
    addInt16(e) {
      return this.ensure(2), this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
    }
    addCString(e) {
      if (!e) this.ensure(1);
      else {
        let t = d.byteLength(e);
        this.ensure(t + 1), this.buffer.write(e, this.offset, "utf-8"), this.offset += t;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(e = "") {
      let t = d.byteLength(e);
      return this.ensure(t), this.buffer.write(e, this.offset), this.offset += t, this;
    }
    add(e) {
      return this.ensure(
        e.length
      ), e.copy(this.buffer, this.offset), this.offset += e.length, this;
    }
    join(e) {
      if (e) {
        this.buffer[this.headerPosition] = e;
        let t = this.offset - (this.headerPosition + 1);
        this.buffer.writeInt32BE(t, this.headerPosition + 1);
      }
      return this.buffer.slice(e ? 0 : 5, this.offset);
    }
    flush(e) {
      let t = this.join(e);
      return this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(this.size), t;
    }
  };
  a(hn, "Writer");
  var fn = hn;
  Rt.Writer = fn;
});
var Ws = T((Ft) => {
  "use strict";
  p();
  Object.defineProperty(Ft, "__esModule", { value: true });
  Ft.serialize = void 0;
  var pn = Qs(), F = new pn.Writer(), yc = a((r) => {
    F.addInt16(3).addInt16(0);
    for (let n of Object.keys(r)) F.addCString(
      n
    ).addCString(r[n]);
    F.addCString("client_encoding").addCString("UTF8");
    let e = F.addCString("").flush(), t = e.length + 4;
    return new pn.Writer().addInt32(t).add(e).flush();
  }, "startup"), mc = a(() => {
    let r = d.allocUnsafe(
      8
    );
    return r.writeInt32BE(8, 0), r.writeInt32BE(80877103, 4), r;
  }, "requestSsl"), wc = a((r) => F.addCString(r).flush(
    112
  ), "password"), gc = a(function(r, e) {
    return F.addCString(r).addInt32(d.byteLength(e)).addString(e), F.flush(112);
  }, "sendSASLInitialResponseMessage"), bc = a(function(r) {
    return F.addString(r).flush(112);
  }, "sendSCRAMClientFinalMessage"), vc = a((r) => F.addCString(r).flush(81), "query"), Ns = [], xc = a((r) => {
    let e = r.name || "";
    e.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e, e.length), console.error("This can cause conflicts and silent errors executing queries"));
    let t = r.types || Ns, n = t.length, i = F.addCString(e).addCString(r.text).addInt16(n);
    for (let s = 0; s < n; s++) i.addInt32(t[s]);
    return F.flush(80);
  }, "parse"), qe = new pn.Writer(), Sc = a(function(r, e) {
    for (let t = 0; t < r.length; t++) {
      let n = e ? e(r[t], t) : r[t];
      n == null ? (F.addInt16(0), qe.addInt32(-1)) : n instanceof d ? (F.addInt16(
        1
      ), qe.addInt32(n.length), qe.add(n)) : (F.addInt16(0), qe.addInt32(d.byteLength(n)), qe.addString(n));
    }
  }, "writeValues"), Ec = a((r = {}) => {
    let e = r.portal || "", t = r.statement || "", n = r.binary || false, i = r.values || Ns, s = i.length;
    return F.addCString(e).addCString(t), F.addInt16(s), Sc(i, r.valueMapper), F.addInt16(s), F.add(qe.flush()), F.addInt16(n ? 1 : 0), F.flush(66);
  }, "bind"), Ac = d.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Cc = a((r) => {
    if (!r || !r.portal && !r.rows) return Ac;
    let e = r.portal || "", t = r.rows || 0, n = d.byteLength(e), i = 4 + n + 1 + 4, s = d.allocUnsafe(1 + i);
    return s[0] = 69, s.writeInt32BE(i, 1), s.write(e, 5, "utf-8"), s[n + 5] = 0, s.writeUInt32BE(t, s.length - 4), s;
  }, "execute"), _c = a(
    (r, e) => {
      let t = d.allocUnsafe(16);
      return t.writeInt32BE(16, 0), t.writeInt16BE(1234, 4), t.writeInt16BE(
        5678,
        6
      ), t.writeInt32BE(r, 8), t.writeInt32BE(e, 12), t;
    },
    "cancel"
  ), dn = a((r, e) => {
    let n = 4 + d.byteLength(e) + 1, i = d.allocUnsafe(1 + n);
    return i[0] = r, i.writeInt32BE(n, 1), i.write(e, 5, "utf-8"), i[n] = 0, i;
  }, "cstringMessage"), Ic = F.addCString("P").flush(68), Tc = F.addCString("S").flush(68), Pc = a((r) => r.name ? dn(68, `${r.type}${r.name || ""}`) : r.type === "P" ? Ic : Tc, "describe"), Bc = a((r) => {
    let e = `${r.type}${r.name || ""}`;
    return dn(67, e);
  }, "close"), Rc = a((r) => F.add(r).flush(100), "copyData"), Lc = a((r) => dn(102, r), "copyFail"), Lt = a((r) => d.from([r, 0, 0, 0, 4]), "codeOnlyBuffer"), Fc = Lt(72), kc = Lt(83), Mc = Lt(88), Uc = Lt(99), Dc = {
    startup: yc,
    password: wc,
    requestSsl: mc,
    sendSASLInitialResponseMessage: gc,
    sendSCRAMClientFinalMessage: bc,
    query: vc,
    parse: xc,
    bind: Ec,
    execute: Cc,
    describe: Pc,
    close: Bc,
    flush: a(
      () => Fc,
      "flush"
    ),
    sync: a(() => kc, "sync"),
    end: a(() => Mc, "end"),
    copyData: Rc,
    copyDone: a(() => Uc, "copyDone"),
    copyFail: Lc,
    cancel: _c
  };
  Ft.serialize = Dc;
});
var js = T((kt) => {
  "use strict";
  p();
  Object.defineProperty(kt, "__esModule", { value: true });
  kt.BufferReader = void 0;
  var Oc = d.allocUnsafe(0), mn = class mn {
    static {
      __name(this, "mn");
    }
    constructor(e = 0) {
      this.offset = e, this.buffer = Oc, this.encoding = "utf-8";
    }
    setBuffer(e, t) {
      this.offset = e, this.buffer = t;
    }
    int16() {
      let e = this.buffer.readInt16BE(this.offset);
      return this.offset += 2, e;
    }
    byte() {
      let e = this.buffer[this.offset];
      return this.offset++, e;
    }
    int32() {
      let e = this.buffer.readInt32BE(
        this.offset
      );
      return this.offset += 4, e;
    }
    uint32() {
      let e = this.buffer.readUInt32BE(this.offset);
      return this.offset += 4, e;
    }
    string(e) {
      let t = this.buffer.toString(this.encoding, this.offset, this.offset + e);
      return this.offset += e, t;
    }
    cstring() {
      let e = this.offset, t = e;
      for (; this.buffer[t++] !== 0; ) ;
      return this.offset = t, this.buffer.toString(this.encoding, e, t - 1);
    }
    bytes(e) {
      let t = this.buffer.slice(this.offset, this.offset + e);
      return this.offset += e, t;
    }
  };
  a(mn, "BufferReader");
  var yn = mn;
  kt.BufferReader = yn;
});
var Gs = T((Mt) => {
  "use strict";
  p();
  Object.defineProperty(Mt, "__esModule", { value: true });
  Mt.Parser = void 0;
  var k = ln(), qc = js(), wn = 1, Qc = 4, Hs = wn + Qc, $s = d.allocUnsafe(0), bn = class bn {
    static {
      __name(this, "bn");
    }
    constructor(e) {
      if (this.buffer = $s, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new qc.BufferReader(), e?.mode === "binary") throw new Error("Binary mode not supported yet");
      this.mode = e?.mode || "text";
    }
    parse(e, t) {
      this.mergeBuffer(e);
      let n = this.bufferOffset + this.bufferLength, i = this.bufferOffset;
      for (; i + Hs <= n; ) {
        let s = this.buffer[i], o = this.buffer.readUInt32BE(
          i + wn
        ), u = wn + o;
        if (u + i <= n) {
          let c = this.handlePacket(i + Hs, s, o, this.buffer);
          t(c), i += u;
        } else break;
      }
      i === n ? (this.buffer = $s, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n - i, this.bufferOffset = i);
    }
    mergeBuffer(e) {
      if (this.bufferLength > 0) {
        let t = this.bufferLength + e.byteLength;
        if (t + this.bufferOffset > this.buffer.byteLength) {
          let i;
          if (t <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) i = this.buffer;
          else {
            let s = this.buffer.byteLength * 2;
            for (; t >= s; ) s *= 2;
            i = d.allocUnsafe(s);
          }
          this.buffer.copy(i, 0, this.bufferOffset, this.bufferOffset + this.bufferLength), this.buffer = i, this.bufferOffset = 0;
        }
        e.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t;
      } else this.buffer = e, this.bufferOffset = 0, this.bufferLength = e.byteLength;
    }
    handlePacket(e, t, n, i) {
      switch (t) {
        case 50:
          return k.bindComplete;
        case 49:
          return k.parseComplete;
        case 51:
          return k.closeComplete;
        case 110:
          return k.noData;
        case 115:
          return k.portalSuspended;
        case 99:
          return k.copyDone;
        case 87:
          return k.replicationStart;
        case 73:
          return k.emptyQuery;
        case 68:
          return this.parseDataRowMessage(e, n, i);
        case 67:
          return this.parseCommandCompleteMessage(
            e,
            n,
            i
          );
        case 90:
          return this.parseReadyForQueryMessage(e, n, i);
        case 65:
          return this.parseNotificationMessage(
            e,
            n,
            i
          );
        case 82:
          return this.parseAuthenticationResponse(e, n, i);
        case 83:
          return this.parseParameterStatusMessage(
            e,
            n,
            i
          );
        case 75:
          return this.parseBackendKeyData(e, n, i);
        case 69:
          return this.parseErrorMessage(e, n, i, "error");
        case 78:
          return this.parseErrorMessage(e, n, i, "notice");
        case 84:
          return this.parseRowDescriptionMessage(
            e,
            n,
            i
          );
        case 116:
          return this.parseParameterDescriptionMessage(e, n, i);
        case 71:
          return this.parseCopyInMessage(
            e,
            n,
            i
          );
        case 72:
          return this.parseCopyOutMessage(e, n, i);
        case 100:
          return this.parseCopyData(e, n, i);
        default:
          return new k.DatabaseError("received invalid response: " + t.toString(16), n, "error");
      }
    }
    parseReadyForQueryMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.string(1);
      return new k.ReadyForQueryMessage(t, i);
    }
    parseCommandCompleteMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring();
      return new k.CommandCompleteMessage(t, i);
    }
    parseCopyData(e, t, n) {
      let i = n.slice(e, e + (t - 4));
      return new k.CopyDataMessage(t, i);
    }
    parseCopyInMessage(e, t, n) {
      return this.parseCopyMessage(
        e,
        t,
        n,
        "copyInResponse"
      );
    }
    parseCopyOutMessage(e, t, n) {
      return this.parseCopyMessage(e, t, n, "copyOutResponse");
    }
    parseCopyMessage(e, t, n, i) {
      this.reader.setBuffer(e, n);
      let s = this.reader.byte() !== 0, o = this.reader.int16(), u = new k.CopyResponse(t, i, s, o);
      for (let c = 0; c < o; c++) u.columnTypes[c] = this.reader.int16();
      return u;
    }
    parseNotificationMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int32(), s = this.reader.cstring(), o = this.reader.cstring();
      return new k.NotificationResponseMessage(t, i, s, o);
    }
    parseRowDescriptionMessage(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int16(), s = new k.RowDescriptionMessage(t, i);
      for (let o = 0; o < i; o++) s.fields[o] = this.parseField();
      return s;
    }
    parseField() {
      let e = this.reader.cstring(), t = this.reader.uint32(), n = this.reader.int16(), i = this.reader.uint32(), s = this.reader.int16(), o = this.reader.int32(), u = this.reader.int16() === 0 ? "text" : "binary";
      return new k.Field(e, t, n, i, s, o, u);
    }
    parseParameterDescriptionMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new k.ParameterDescriptionMessage(t, i);
      for (let o = 0; o < i; o++)
        s.dataTypeIDs[o] = this.reader.int32();
      return s;
    }
    parseDataRowMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new Array(i);
      for (let o = 0; o < i; o++) {
        let u = this.reader.int32();
        s[o] = u === -1 ? null : this.reader.string(u);
      }
      return new k.DataRowMessage(t, s);
    }
    parseParameterStatusMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring(), s = this.reader.cstring();
      return new k.ParameterStatusMessage(
        t,
        i,
        s
      );
    }
    parseBackendKeyData(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int32(), s = this.reader.int32();
      return new k.BackendKeyDataMessage(t, i, s);
    }
    parseAuthenticationResponse(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int32(), s = { name: "authenticationOk", length: t };
      switch (i) {
        case 0:
          break;
        case 3:
          s.length === 8 && (s.name = "authenticationCleartextPassword");
          break;
        case 5:
          if (s.length === 12) {
            s.name = "authenticationMD5Password";
            let o = this.reader.bytes(4);
            return new k.AuthenticationMD5Password(t, o);
          }
          break;
        case 10:
          {
            s.name = "authenticationSASL", s.mechanisms = [];
            let o;
            do
              o = this.reader.cstring(), o && s.mechanisms.push(o);
            while (o);
          }
          break;
        case 11:
          s.name = "authenticationSASLContinue", s.data = this.reader.string(t - 8);
          break;
        case 12:
          s.name = "authenticationSASLFinal", s.data = this.reader.string(t - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + i);
      }
      return s;
    }
    parseErrorMessage(e, t, n, i) {
      this.reader.setBuffer(e, n);
      let s = {}, o = this.reader.string(1);
      for (; o !== "\0"; ) s[o] = this.reader.cstring(), o = this.reader.string(1);
      let u = s.M, c = i === "notice" ? new k.NoticeMessage(t, u) : new k.DatabaseError(u, t, i);
      return c.severity = s.S, c.code = s.C, c.detail = s.D, c.hint = s.H, c.position = s.P, c.internalPosition = s.p, c.internalQuery = s.q, c.where = s.W, c.schema = s.s, c.table = s.t, c.column = s.c, c.dataType = s.d, c.constraint = s.n, c.file = s.F, c.line = s.L, c.routine = s.R, c;
    }
  };
  a(bn, "Parser");
  var gn = bn;
  Mt.Parser = gn;
});
var vn = T((xe) => {
  "use strict";
  p();
  Object.defineProperty(xe, "__esModule", { value: true });
  xe.DatabaseError = xe.serialize = xe.parse = void 0;
  var Nc = ln();
  Object.defineProperty(xe, "DatabaseError", { enumerable: true, get: a(
    function() {
      return Nc.DatabaseError;
    },
    "get"
  ) });
  var Wc = Ws();
  Object.defineProperty(xe, "serialize", {
    enumerable: true,
    get: a(function() {
      return Wc.serialize;
    }, "get")
  });
  var jc = Gs();
  function Hc(r, e) {
    let t = new jc.Parser();
    return r.on("data", (n) => t.parse(n, e)), new Promise((n) => r.on("end", () => n()));
  }
  __name(Hc, "Hc");
  a(Hc, "parse");
  xe.parse = Hc;
});
var Vs = {};
ie(Vs, { connect: /* @__PURE__ */ __name(() => $c, "connect") });
function $c({ socket: r, servername: e }) {
  return r.startTls(e), r;
}
__name($c, "$c");
var zs = G(
  () => {
    "use strict";
    p();
    a($c, "connect");
  }
);
var En = T((Xh, Zs) => {
  "use strict";
  p();
  var Ks = (Fe(), O(wi)), Gc = ge().EventEmitter, { parse: Vc, serialize: Q } = vn(), Ys = Q.flush(), zc = Q.sync(), Kc = Q.end(), Sn = class Sn extends Gc {
    static {
      __name(this, "Sn");
    }
    constructor(e) {
      super(), e = e || {}, this.stream = e.stream || new Ks.Socket(), this._keepAlive = e.keepAlive, this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e.ssl || false, this._ending = false, this._emitMessage = false;
      var t = this;
      this.on("newListener", function(n) {
        n === "message" && (t._emitMessage = true);
      });
    }
    connect(e, t) {
      var n = this;
      this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(e, t), this.stream.once("connect", function() {
        n._keepAlive && n.stream.setKeepAlive(true, n._keepAliveInitialDelayMillis), n.emit("connect");
      });
      let i = a(function(s) {
        n._ending && (s.code === "ECONNRESET" || s.code === "EPIPE") || n.emit("error", s);
      }, "reportStreamError");
      if (this.stream.on("error", i), this.stream.on("close", function() {
        n.emit("end");
      }), !this.ssl) return this.attachListeners(
        this.stream
      );
      this.stream.once("data", function(s) {
        var o = s.toString("utf8");
        switch (o) {
          case "S":
            break;
          case "N":
            return n.stream.end(), n.emit("error", new Error("The server does not support SSL connections"));
          default:
            return n.stream.end(), n.emit("error", new Error("There was an error establishing an SSL connection"));
        }
        var u = (zs(), O(Vs));
        let c = { socket: n.stream };
        n.ssl !== true && (Object.assign(c, n.ssl), "key" in n.ssl && (c.key = n.ssl.key)), Ks.isIP(t) === 0 && (c.servername = t);
        try {
          n.stream = u.connect(c);
        } catch (l) {
          return n.emit(
            "error",
            l
          );
        }
        n.attachListeners(n.stream), n.stream.on("error", i), n.emit("sslconnect");
      });
    }
    attachListeners(e) {
      e.on(
        "end",
        () => {
          this.emit("end");
        }
      ), Vc(e, (t) => {
        var n = t.name === "error" ? "errorMessage" : t.name;
        this._emitMessage && this.emit("message", t), this.emit(n, t);
      });
    }
    requestSsl() {
      this.stream.write(Q.requestSsl());
    }
    startup(e) {
      this.stream.write(Q.startup(e));
    }
    cancel(e, t) {
      this._send(Q.cancel(e, t));
    }
    password(e) {
      this._send(Q.password(e));
    }
    sendSASLInitialResponseMessage(e, t) {
      this._send(Q.sendSASLInitialResponseMessage(e, t));
    }
    sendSCRAMClientFinalMessage(e) {
      this._send(Q.sendSCRAMClientFinalMessage(
        e
      ));
    }
    _send(e) {
      return this.stream.writable ? this.stream.write(e) : false;
    }
    query(e) {
      this._send(Q.query(e));
    }
    parse(e) {
      this._send(Q.parse(e));
    }
    bind(e) {
      this._send(Q.bind(e));
    }
    execute(e) {
      this._send(Q.execute(e));
    }
    flush() {
      this.stream.writable && this.stream.write(Ys);
    }
    sync() {
      this._ending = true, this._send(Ys), this._send(zc);
    }
    ref() {
      this.stream.ref();
    }
    unref() {
      this.stream.unref();
    }
    end() {
      if (this._ending = true, !this._connecting || !this.stream.writable) {
        this.stream.end();
        return;
      }
      return this.stream.write(Kc, () => {
        this.stream.end();
      });
    }
    close(e) {
      this._send(Q.close(e));
    }
    describe(e) {
      this._send(Q.describe(e));
    }
    sendCopyFromChunk(e) {
      this._send(Q.copyData(e));
    }
    endCopyFrom() {
      this._send(Q.copyDone());
    }
    sendCopyFail(e) {
      this._send(Q.copyFail(e));
    }
  };
  a(Sn, "Connection");
  var xn = Sn;
  Zs.exports = xn;
});
var eo = T((np, Xs) => {
  "use strict";
  p();
  var Yc = ge().EventEmitter, rp = (it(), O(nt)), Zc = rt(), An = ds(), Jc = Cs(), Xc = At(), el = Bt(), Js = qs(), tl = tt(), rl = En(), Cn = class Cn extends Yc {
    static {
      __name(this, "Cn");
    }
    constructor(e) {
      super(), this.connectionParameters = new el(e), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(
        this,
        "password",
        { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }
      ), this.replication = this.connectionParameters.replication;
      var t = e || {};
      this._Promise = t.Promise || b.Promise, this._types = new Xc(t.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t.connection || new rl({ stream: t.stream, ssl: this.connectionParameters.ssl, keepAlive: t.keepAlive || false, keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t.binary || tl.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(e) {
      let t = a((n) => {
        m.nextTick(() => {
          n.handleError(e, this.connection);
        });
      }, "enqueueError");
      this.activeQuery && (t(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t), this.queryQueue.length = 0;
    }
    _connect(e) {
      var t = this, n = this.connection;
      if (this._connectionCallback = e, this._connecting || this._connected) {
        let i = new Error("Client has already been connected. You cannot reuse a client.");
        m.nextTick(
          () => {
            e(i);
          }
        );
        return;
      }
      this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
        n._ending = true, n.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
        t.ssl ? n.requestSsl() : n.startup(t.getStartupConf());
      }), n.on("sslconnect", function() {
        n.startup(t.getStartupConf());
      }), this._attachListeners(
        n
      ), n.once("end", () => {
        let i = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i) : this._handleErrorEvent(i) : this._connectionError || this._handleErrorEvent(i)), m.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(e) {
      if (e) {
        this._connect(e);
        return;
      }
      return new this._Promise((t, n) => {
        this._connect((i) => {
          i ? n(i) : t();
        });
      });
    }
    _attachListeners(e) {
      e.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e.on("authenticationSASL", this._handleAuthSASL.bind(this)), e.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e.on("backendKeyData", this._handleBackendKeyData.bind(this)), e.on("error", this._handleErrorEvent.bind(this)), e.on("errorMessage", this._handleErrorMessage.bind(this)), e.on("readyForQuery", this._handleReadyForQuery.bind(this)), e.on("notice", this._handleNotice.bind(this)), e.on("rowDescription", this._handleRowDescription.bind(this)), e.on("dataRow", this._handleDataRow.bind(this)), e.on("portalSuspended", this._handlePortalSuspended.bind(
        this
      )), e.on("emptyQuery", this._handleEmptyQuery.bind(this)), e.on("commandComplete", this._handleCommandComplete.bind(this)), e.on("parseComplete", this._handleParseComplete.bind(this)), e.on("copyInResponse", this._handleCopyInResponse.bind(this)), e.on("copyData", this._handleCopyData.bind(this)), e.on("notification", this._handleNotification.bind(this));
    }
    _checkPgPass(e) {
      let t = this.connection;
      typeof this.password == "function" ? this._Promise.resolve().then(() => this.password()).then((n) => {
        if (n !== void 0) {
          if (typeof n != "string") {
            t.emit("error", new TypeError(
              "Password must be a string"
            ));
            return;
          }
          this.connectionParameters.password = this.password = n;
        } else this.connectionParameters.password = this.password = null;
        e();
      }).catch((n) => {
        t.emit("error", n);
      }) : this.password !== null ? e() : Jc(
        this.connectionParameters,
        (n) => {
          n !== void 0 && (this.connectionParameters.password = this.password = n), e();
        }
      );
    }
    _handleAuthCleartextPassword(e) {
      this._checkPgPass(() => {
        this.connection.password(this.password);
      });
    }
    _handleAuthMD5Password(e) {
      this._checkPgPass(
        () => {
          let t = Zc.postgresMd5PasswordHash(this.user, this.password, e.salt);
          this.connection.password(t);
        }
      );
    }
    _handleAuthSASL(e) {
      this._checkPgPass(() => {
        this.saslSession = An.startSession(e.mechanisms), this.connection.sendSASLInitialResponseMessage(
          this.saslSession.mechanism,
          this.saslSession.response
        );
      });
    }
    _handleAuthSASLContinue(e) {
      An.continueSession(
        this.saslSession,
        this.password,
        e.data
      ), this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
    }
    _handleAuthSASLFinal(e) {
      An.finalizeSession(this.saslSession, e.data), this.saslSession = null;
    }
    _handleBackendKeyData(e) {
      this.processID = e.processID, this.secretKey = e.secretKey;
    }
    _handleReadyForQuery(e) {
      this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
      let { activeQuery: t } = this;
      this.activeQuery = null, this.readyForQuery = true, t && t.handleReadyForQuery(this.connection), this._pulseQueryQueue();
    }
    _handleErrorWhileConnecting(e) {
      if (!this._connectionError) {
        if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback) return this._connectionCallback(e);
        this.emit("error", e);
      }
    }
    _handleErrorEvent(e) {
      if (this._connecting) return this._handleErrorWhileConnecting(e);
      this._queryable = false, this._errorAllQueries(e), this.emit("error", e);
    }
    _handleErrorMessage(e) {
      if (this._connecting) return this._handleErrorWhileConnecting(e);
      let t = this.activeQuery;
      if (!t) {
        this._handleErrorEvent(e);
        return;
      }
      this.activeQuery = null, t.handleError(
        e,
        this.connection
      );
    }
    _handleRowDescription(e) {
      this.activeQuery.handleRowDescription(e);
    }
    _handleDataRow(e) {
      this.activeQuery.handleDataRow(e);
    }
    _handlePortalSuspended(e) {
      this.activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(e) {
      this.activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(e) {
      this.activeQuery.handleCommandComplete(e, this.connection);
    }
    _handleParseComplete(e) {
      this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
    }
    _handleCopyInResponse(e) {
      this.activeQuery.handleCopyInResponse(this.connection);
    }
    _handleCopyData(e) {
      this.activeQuery.handleCopyData(
        e,
        this.connection
      );
    }
    _handleNotification(e) {
      this.emit("notification", e);
    }
    _handleNotice(e) {
      this.emit("notice", e);
    }
    getStartupConf() {
      var e = this.connectionParameters, t = { user: e.user, database: e.database }, n = e.application_name || e.fallback_application_name;
      return n && (t.application_name = n), e.replication && (t.replication = "" + e.replication), e.statement_timeout && (t.statement_timeout = String(parseInt(e.statement_timeout, 10))), e.lock_timeout && (t.lock_timeout = String(parseInt(e.lock_timeout, 10))), e.idle_in_transaction_session_timeout && (t.idle_in_transaction_session_timeout = String(parseInt(e.idle_in_transaction_session_timeout, 10))), e.options && (t.options = e.options), t;
    }
    cancel(e, t) {
      if (e.activeQuery === t) {
        var n = this.connection;
        this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
          n.cancel(
            e.processID,
            e.secretKey
          );
        });
      } else e.queryQueue.indexOf(t) !== -1 && e.queryQueue.splice(e.queryQueue.indexOf(t), 1);
    }
    setTypeParser(e, t, n) {
      return this._types.setTypeParser(e, t, n);
    }
    getTypeParser(e, t) {
      return this._types.getTypeParser(e, t);
    }
    escapeIdentifier(e) {
      return '"' + e.replace(/"/g, '""') + '"';
    }
    escapeLiteral(e) {
      for (var t = false, n = "'", i = 0; i < e.length; i++) {
        var s = e[i];
        s === "'" ? n += s + s : s === "\\" ? (n += s + s, t = true) : n += s;
      }
      return n += "'", t === true && (n = " E" + n), n;
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === true) if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
        this.readyForQuery = false, this.hasExecuted = true;
        let e = this.activeQuery.submit(this.connection);
        e && m.nextTick(() => {
          this.activeQuery.handleError(e, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
        });
      } else this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
    }
    query(e, t, n) {
      var i, s, o, u, c;
      if (e == null) throw new TypeError(
        "Client was passed a null or undefined query"
      );
      return typeof e.submit == "function" ? (o = e.query_timeout || this.connectionParameters.query_timeout, s = i = e, typeof t == "function" && (i.callback = i.callback || t)) : (o = this.connectionParameters.query_timeout, i = new Js(e, t, n), i.callback || (s = new this._Promise((l, f) => {
        i.callback = (y, g) => y ? f(y) : l(g);
      }))), o && (c = i.callback, u = setTimeout(() => {
        var l = new Error("Query read timeout");
        m.nextTick(
          () => {
            i.handleError(l, this.connection);
          }
        ), c(l), i.callback = () => {
        };
        var f = this.queryQueue.indexOf(i);
        f > -1 && this.queryQueue.splice(f, 1), this._pulseQueryQueue();
      }, o), i.callback = (l, f) => {
        clearTimeout(u), c(l, f);
      }), this.binary && !i.binary && (i.binary = true), i._result && !i._result._types && (i._result._types = this._types), this._queryable ? this._ending ? (m.nextTick(() => {
        i.handleError(new Error("Client was closed and is not queryable"), this.connection);
      }), s) : (this.queryQueue.push(i), this._pulseQueryQueue(), s) : (m.nextTick(() => {
        i.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
      }), s);
    }
    ref() {
      this.connection.ref();
    }
    unref() {
      this.connection.unref();
    }
    end(e) {
      if (this._ending = true, !this.connection._connecting) if (e) e();
      else return this._Promise.resolve();
      if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), e) this.connection.once("end", e);
      else return new this._Promise((t) => {
        this.connection.once("end", t);
      });
    }
  };
  a(Cn, "Client");
  var Ut = Cn;
  Ut.Query = Js;
  Xs.exports = Ut;
});
var io = T((op, no) => {
  "use strict";
  p();
  var nl = ge().EventEmitter, to = a(function() {
  }, "NOOP"), ro = a((r, e) => {
    let t = r.findIndex(e);
    return t === -1 ? void 0 : r.splice(t, 1)[0];
  }, "removeWhere"), Tn = class Tn {
    static {
      __name(this, "Tn");
    }
    constructor(e, t, n) {
      this.client = e, this.idleListener = t, this.timeoutId = n;
    }
  };
  a(Tn, "IdleItem");
  var _n = Tn, Pn = class Pn {
    static {
      __name(this, "Pn");
    }
    constructor(e) {
      this.callback = e;
    }
  };
  a(Pn, "PendingItem");
  var Qe = Pn;
  function il() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  __name(il, "il");
  a(il, "throwOnDoubleRelease");
  function Dt(r, e) {
    if (e)
      return { callback: e, result: void 0 };
    let t, n, i = a(function(o, u) {
      o ? t(o) : n(u);
    }, "cb"), s = new r(function(o, u) {
      n = o, t = u;
    }).catch((o) => {
      throw Error.captureStackTrace(o), o;
    });
    return { callback: i, result: s };
  }
  __name(Dt, "Dt");
  a(Dt, "promisify");
  function sl(r, e) {
    return a(/* @__PURE__ */ __name(function t(n) {
      n.client = e, e.removeListener("error", t), e.on("error", () => {
        r.log(
          "additional client error after disconnection due to error",
          n
        );
      }), r._remove(e), r.emit("error", n, e);
    }, "t"), "idleListener");
  }
  __name(sl, "sl");
  a(sl, "makeIdleListener");
  var Bn = class Bn extends nl {
    static {
      __name(this, "Bn");
    }
    constructor(e, t) {
      super(), this.options = Object.assign({}, e), e != null && "password" in e && Object.defineProperty(this.options, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: e.password
      }), e != null && e.ssl && e.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.min = this.options.min || 0, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
      }, this.Client = this.options.Client || t || ot().Client, this.Promise = this.options.Promise || b.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
    }
    _isFull() {
      return this._clients.length >= this.options.max;
    }
    _isAboveMin() {
      return this._clients.length > this.options.min;
    }
    _pulseQueue() {
      if (this.log("pulse queue"), this.ended) {
        this.log("pulse queue ended");
        return;
      }
      if (this.ending) {
        this.log("pulse queue on ending"), this._idle.length && this._idle.slice().map((t) => {
          this._remove(t.client);
        }), this._clients.length || (this.ended = true, this._endCallback());
        return;
      }
      if (!this._pendingQueue.length) {
        this.log("no queued requests");
        return;
      }
      if (!this._idle.length && this._isFull()) return;
      let e = this._pendingQueue.shift();
      if (this._idle.length) {
        let t = this._idle.pop();
        clearTimeout(
          t.timeoutId
        );
        let n = t.client;
        n.ref && n.ref();
        let i = t.idleListener;
        return this._acquireClient(n, e, i, false);
      }
      if (!this._isFull()) return this.newClient(e);
      throw new Error("unexpected condition");
    }
    _remove(e) {
      let t = ro(
        this._idle,
        (n) => n.client === e
      );
      t !== void 0 && clearTimeout(t.timeoutId), this._clients = this._clients.filter(
        (n) => n !== e
      ), e.end(), this.emit("remove", e);
    }
    connect(e) {
      if (this.ending) {
        let i = new Error("Cannot use a pool after calling end on the pool");
        return e ? e(i) : this.Promise.reject(i);
      }
      let t = Dt(this.Promise, e), n = t.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length && m.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis) return this._pendingQueue.push(new Qe(t.callback)), n;
        let i = a((u, c, l) => {
          clearTimeout(o), t.callback(u, c, l);
        }, "queueCallback"), s = new Qe(i), o = setTimeout(() => {
          ro(
            this._pendingQueue,
            (u) => u.callback === i
          ), s.timedOut = true, t.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return o.unref && o.unref(), this._pendingQueue.push(s), n;
      }
      return this.newClient(new Qe(t.callback)), n;
    }
    newClient(e) {
      let t = new this.Client(this.options);
      this._clients.push(
        t
      );
      let n = sl(this, t);
      this.log("checking client timeout");
      let i, s = false;
      this.options.connectionTimeoutMillis && (i = setTimeout(() => {
        this.log("ending client due to timeout"), s = true, t.connection ? t.connection.stream.destroy() : t.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t.connect((o) => {
        if (i && clearTimeout(i), t.on("error", n), o) this.log("client failed to connect", o), this._clients = this._clients.filter((u) => u !== t), s && (o = new Error("Connection terminated due to connection timeout", { cause: o })), this._pulseQueue(), e.timedOut || e.callback(o, void 0, to);
        else {
          if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
            let u = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(t), this._idle.findIndex((l) => l.client === t) !== -1 && this._acquireClient(
                t,
                new Qe((l, f, y) => y()),
                n,
                false
              );
            }, this.options.maxLifetimeSeconds * 1e3);
            u.unref(), t.once("end", () => clearTimeout(u));
          }
          return this._acquireClient(t, e, n, true);
        }
      });
    }
    _acquireClient(e, t, n, i) {
      i && this.emit("connect", e), this.emit("acquire", e), e.release = this._releaseOnce(e, n), e.removeListener("error", n), t.timedOut ? i && this.options.verify ? this.options.verify(e, e.release) : e.release() : i && this.options.verify ? this.options.verify(e, (s) => {
        if (s) return e.release(s), t.callback(s, void 0, to);
        t.callback(void 0, e, e.release);
      }) : t.callback(void 0, e, e.release);
    }
    _releaseOnce(e, t) {
      let n = false;
      return (i) => {
        n && il(), n = true, this._release(e, t, i);
      };
    }
    _release(e, t, n) {
      if (e.on("error", t), e._poolUseCount = (e._poolUseCount || 0) + 1, this.emit("release", n, e), n || this.ending || !e._queryable || e._ending || e._poolUseCount >= this.options.maxUses) {
        e._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e), this._pulseQueue();
        return;
      }
      if (this._expired.has(e)) {
        this.log("remove expired client"), this._expired.delete(e), this._remove(e), this._pulseQueue();
        return;
      }
      let s;
      this.options.idleTimeoutMillis && this._isAboveMin() && (s = setTimeout(() => {
        this.log("remove idle client"), this._remove(e);
      }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s.unref()), this.options.allowExitOnIdle && e.unref(), this._idle.push(new _n(
        e,
        t,
        s
      )), this._pulseQueue();
    }
    query(e, t, n) {
      if (typeof e == "function") {
        let s = Dt(this.Promise, e);
        return v(function() {
          return s.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), s.result;
      }
      typeof t == "function" && (n = t, t = void 0);
      let i = Dt(this.Promise, n);
      return n = i.callback, this.connect((s, o) => {
        if (s) return n(s);
        let u = false, c = a((l) => {
          u || (u = true, o.release(l), n(l));
        }, "onError");
        o.once("error", c), this.log("dispatching query");
        try {
          o.query(e, t, (l, f) => {
            if (this.log("query dispatched"), o.removeListener(
              "error",
              c
            ), !u) return u = true, o.release(l), l ? n(l) : n(void 0, f);
          });
        } catch (l) {
          return o.release(l), n(l);
        }
      }), i.result;
    }
    end(e) {
      if (this.log("ending"), this.ending) {
        let n = new Error("Called end on pool more than once");
        return e ? e(n) : this.Promise.reject(n);
      }
      this.ending = true;
      let t = Dt(this.Promise, e);
      return this._endCallback = t.callback, this._pulseQueue(), t.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((e, t) => e + (this._expired.has(t) ? 1 : 0), 0);
    }
    get totalCount() {
      return this._clients.length;
    }
  };
  a(Bn, "Pool");
  var In = Bn;
  no.exports = In;
});
var so = {};
ie(so, { default: /* @__PURE__ */ __name(() => ol, "default") });
var ol;
var oo = G(() => {
  "use strict";
  p();
  ol = {};
});
var ao = T((lp, al) => {
  al.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
    "database",
    "libpq",
    "pg",
    "postgre",
    "postgres",
    "postgresql",
    "rdbms"
  ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: { "buffer-writer": "2.0.0", "packet-reader": "1.0.0", "pg-connection-string": "^2.5.0", "pg-pool": "^3.5.2", "pg-protocol": "^1.5.0", "pg-types": "^2.1.0", pgpass: "1.x" }, devDependencies: {
    async: "2.6.4",
    bluebird: "3.5.2",
    co: "4.6.0",
    "pg-copy-streams": "0.3.0"
  }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: { "pg-native": { optional: true } }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
});
var lo = T((fp, co) => {
  "use strict";
  p();
  var uo = ge().EventEmitter, ul = (it(), O(nt)), Rn = rt(), Ne = co.exports = function(r, e, t) {
    uo.call(this), r = Rn.normalizeQueryConfig(r, e, t), this.text = r.text, this.values = r.values, this.name = r.name, this.callback = r.callback, this.state = "new", this._arrayMode = r.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n) {
      n === "row" && (this._emitRowEvents = true);
    }.bind(this));
  };
  ul.inherits(Ne, uo);
  var cl = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  Ne.prototype.handleError = function(r) {
    var e = this.native.pq.resultErrorFields();
    if (e) for (var t in e) {
      var n = cl[t] || t;
      r[n] = e[t];
    }
    this.callback ? this.callback(r) : this.emit("error", r), this.state = "error";
  };
  Ne.prototype.then = function(r, e) {
    return this._getPromise().then(
      r,
      e
    );
  };
  Ne.prototype.catch = function(r) {
    return this._getPromise().catch(r);
  };
  Ne.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(r, e) {
      this._once("end", r), this._once("error", e);
    }.bind(this)), this._promise);
  };
  Ne.prototype.submit = function(r) {
    this.state = "running";
    var e = this;
    this.native = r.native, r.native.arrayMode = this._arrayMode;
    var t = a(function(s, o, u) {
      if (r.native.arrayMode = false, v(function() {
        e.emit("_done");
      }), s) return e.handleError(s);
      e._emitRowEvents && (u.length > 1 ? o.forEach(
        (c, l) => {
          c.forEach((f) => {
            e.emit("row", f, u[l]);
          });
        }
      ) : o.forEach(function(c) {
        e.emit("row", c, u);
      })), e.state = "end", e.emit("end", u), e.callback && e.callback(null, u);
    }, "after");
    if (m.domain && (t = m.domain.bind(t)), this.name) {
      this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", this.name, this.name.length), console.error("This can cause conflicts and silent errors executing queries"));
      var n = (this.values || []).map(Rn.prepareValue);
      if (r.namedQueries[this.name]) {
        if (this.text && r.namedQueries[this.name] !== this.text) {
          let s = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return t(s);
        }
        return r.native.execute(this.name, n, t);
      }
      return r.native.prepare(this.name, this.text, n.length, function(s) {
        return s ? t(s) : (r.namedQueries[e.name] = e.text, e.native.execute(e.name, n, t));
      });
    } else if (this.values) {
      if (!Array.isArray(
        this.values
      )) {
        let s = new Error("Query values must be an array");
        return t(s);
      }
      var i = this.values.map(Rn.prepareValue);
      r.native.query(this.text, i, t);
    } else r.native.query(this.text, t);
  };
});
var yo = T((yp, po) => {
  "use strict";
  p();
  var ll = (oo(), O(so)), fl = At(), dp = ao(), fo = ge().EventEmitter, hl = (it(), O(nt)), pl = Bt(), ho = lo(), K = po.exports = function(r) {
    fo.call(this), r = r || {}, this._Promise = r.Promise || b.Promise, this._types = new fl(r.types), this.native = new ll({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
    var e = this.connectionParameters = new pl(r);
    this.user = e.user, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: e.password }), this.database = e.database, this.host = e.host, this.port = e.port, this.namedQueries = {};
  };
  K.Query = ho;
  hl.inherits(K, fo);
  K.prototype._errorAllQueries = function(r) {
    let e = a((t) => {
      m.nextTick(() => {
        t.native = this.native, t.handleError(r);
      });
    }, "enqueueError");
    this._hasActiveQuery() && (e(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e), this._queryQueue.length = 0;
  };
  K.prototype._connect = function(r) {
    var e = this;
    if (this._connecting) {
      m.nextTick(() => r(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t, n) {
      if (t) return r(t);
      e.native.connect(n, function(i) {
        if (i) return e.native.end(), r(i);
        e._connected = true, e.native.on("error", function(s) {
          e._queryable = false, e._errorAllQueries(s), e.emit("error", s);
        }), e.native.on("notification", function(s) {
          e.emit("notification", { channel: s.relname, payload: s.extra });
        }), e.emit("connect"), e._pulseQueryQueue(true), r();
      });
    });
  };
  K.prototype.connect = function(r) {
    if (r) {
      this._connect(r);
      return;
    }
    return new this._Promise((e, t) => {
      this._connect((n) => {
        n ? t(n) : e();
      });
    });
  };
  K.prototype.query = function(r, e, t) {
    var n, i, s, o, u;
    if (r == null) throw new TypeError("Client was passed a null or undefined query");
    if (typeof r.submit == "function") s = r.query_timeout || this.connectionParameters.query_timeout, i = n = r, typeof e == "function" && (r.callback = e);
    else if (s = this.connectionParameters.query_timeout, n = new ho(r, e, t), !n.callback) {
      let c, l;
      i = new this._Promise((f, y) => {
        c = f, l = y;
      }), n.callback = (f, y) => f ? l(f) : c(y);
    }
    return s && (u = n.callback, o = setTimeout(() => {
      var c = new Error(
        "Query read timeout"
      );
      m.nextTick(() => {
        n.handleError(c, this.connection);
      }), u(c), n.callback = () => {
      };
      var l = this._queryQueue.indexOf(n);
      l > -1 && this._queryQueue.splice(l, 1), this._pulseQueryQueue();
    }, s), n.callback = (c, l) => {
      clearTimeout(o), u(c, l);
    }), this._queryable ? this._ending ? (n.native = this.native, m.nextTick(() => {
      n.handleError(
        new Error("Client was closed and is not queryable")
      );
    }), i) : (this._queryQueue.push(n), this._pulseQueryQueue(), i) : (n.native = this.native, m.nextTick(() => {
      n.handleError(new Error("Client has encountered a connection error and is not queryable"));
    }), i);
  };
  K.prototype.end = function(r) {
    var e = this;
    this._ending = true, this._connected || this.once("connect", this.end.bind(this, r));
    var t;
    return r || (t = new this._Promise(function(n, i) {
      r = a((s) => s ? i(s) : n(), "cb");
    })), this.native.end(function() {
      e._errorAllQueries(new Error("Connection terminated")), m.nextTick(() => {
        e.emit("end"), r && r();
      });
    }), t;
  };
  K.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  K.prototype._pulseQueryQueue = function(r) {
    if (this._connected && !this._hasActiveQuery()) {
      var e = this._queryQueue.shift();
      if (!e) {
        r || this.emit("drain");
        return;
      }
      this._activeQuery = e, e.submit(this);
      var t = this;
      e.once("_done", function() {
        t._pulseQueryQueue();
      });
    }
  };
  K.prototype.cancel = function(r) {
    this._activeQuery === r ? this.native.cancel(function() {
    }) : this._queryQueue.indexOf(r) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r), 1);
  };
  K.prototype.ref = function() {
  };
  K.prototype.unref = function() {
  };
  K.prototype.setTypeParser = function(r, e, t) {
    return this._types.setTypeParser(
      r,
      e,
      t
    );
  };
  K.prototype.getTypeParser = function(r, e) {
    return this._types.getTypeParser(r, e);
  };
});
var Ln = T((gp, mo) => {
  "use strict";
  p();
  mo.exports = yo();
});
var ot = T((vp, at) => {
  "use strict";
  p();
  var dl = eo(), yl = tt(), ml = En(), wl = io(), { DatabaseError: gl } = vn(), bl = a(
    (r) => {
      var e;
      return e = class extends wl {
        static {
          __name(this, "e");
        }
        constructor(n) {
          super(n, r);
        }
      }, a(e, "BoundPool"), e;
    },
    "poolFactory"
  ), Fn = a(
    function(r) {
      this.defaults = yl, this.Client = r, this.Query = this.Client.Query, this.Pool = bl(this.Client), this._pools = [], this.Connection = ml, this.types = Je(), this.DatabaseError = gl;
    },
    "PG"
  );
  typeof m.env.NODE_PG_FORCE_NATIVE < "u" ? at.exports = new Fn(Ln()) : (at.exports = new Fn(dl), Object.defineProperty(at.exports, "native", {
    configurable: true,
    enumerable: false,
    get() {
      var r = null;
      try {
        r = new Fn(Ln());
      } catch (e) {
        if (e.code !== "MODULE_NOT_FOUND") throw e;
      }
      return Object.defineProperty(at.exports, "native", { value: r }), r;
    }
  }));
});
p();
p();
Fe();
Zt();
p();
var pa = Object.defineProperty;
var da = Object.defineProperties;
var ya = Object.getOwnPropertyDescriptors;
var bi = Object.getOwnPropertySymbols;
var ma = Object.prototype.hasOwnProperty;
var wa = Object.prototype.propertyIsEnumerable;
var vi = a(
  (r, e, t) => e in r ? pa(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t,
  "__defNormalProp"
);
var ga = a((r, e) => {
  for (var t in e || (e = {})) ma.call(e, t) && vi(r, t, e[t]);
  if (bi) for (var t of bi(e)) wa.call(e, t) && vi(r, t, e[t]);
  return r;
}, "__spreadValues");
var ba = a((r, e) => da(r, ya(e)), "__spreadProps");
var va = 1008e3;
var xi = new Uint8Array(
  new Uint16Array([258]).buffer
)[0] === 2;
var xa = new TextDecoder();
var Jt = new TextEncoder();
var yt = Jt.encode("0123456789abcdef");
var mt = Jt.encode("0123456789ABCDEF");
var Sa = Jt.encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
var Si = Sa.slice();
Si[62] = 45;
Si[63] = 95;
var He;
var wt;
function Ea(r, { alphabet: e, scratchArr: t } = {}) {
  if (!He) if (He = new Uint16Array(256), wt = new Uint16Array(256), xi) for (let C = 0; C < 256; C++) He[C] = yt[C & 15] << 8 | yt[C >>> 4], wt[C] = mt[C & 15] << 8 | mt[C >>> 4];
  else for (let C = 0; C < 256; C++) He[C] = yt[C & 15] | yt[C >>> 4] << 8, wt[C] = mt[C & 15] | mt[C >>> 4] << 8;
  r.byteOffset % 4 !== 0 && (r = new Uint8Array(r));
  let n = r.length, i = n >>> 1, s = n >>> 2, o = t || new Uint16Array(n), u = new Uint32Array(
    r.buffer,
    r.byteOffset,
    s
  ), c = new Uint32Array(o.buffer, o.byteOffset, i), l = e === "upper" ? wt : He, f = 0, y = 0, g;
  if (xi)
    for (; f < s; ) g = u[f++], c[y++] = l[g >>> 8 & 255] << 16 | l[g & 255], c[y++] = l[g >>> 24] << 16 | l[g >>> 16 & 255];
  else for (; f < s; )
    g = u[f++], c[y++] = l[g >>> 24] << 16 | l[g >>> 16 & 255], c[y++] = l[g >>> 8 & 255] << 16 | l[g & 255];
  for (f <<= 2; f < n; ) o[f] = l[r[f++]];
  return xa.decode(o.subarray(0, n));
}
__name(Ea, "Ea");
a(Ea, "_toHex");
function Aa(r, e = {}) {
  let t = "", n = r.length, i = va >>> 1, s = Math.ceil(n / i), o = new Uint16Array(s > 1 ? i : n);
  for (let u = 0; u < s; u++) {
    let c = u * i, l = c + i;
    t += Ea(r.subarray(c, l), ba(ga(
      {},
      e
    ), { scratchArr: o }));
  }
  return t;
}
__name(Aa, "Aa");
a(Aa, "_toHexChunked");
function Ei(r, e = {}) {
  return e.alphabet !== "upper" && typeof r.toHex == "function" ? r.toHex() : Aa(r, e);
}
__name(Ei, "Ei");
a(Ei, "toHex");
p();
var gt = class gt2 {
  static {
    __name(this, "gt");
  }
  constructor(e, t) {
    this.strings = e;
    this.values = t;
  }
  toParameterizedQuery(e = { query: "", params: [] }) {
    let { strings: t, values: n } = this;
    for (let i = 0, s = t.length; i < s; i++) if (e.query += t[i], i < n.length) {
      let o = n[i];
      if (o instanceof Ge) e.query += o.sql;
      else if (o instanceof Ce) if (o.queryData instanceof gt2) o.queryData.toParameterizedQuery(
        e
      );
      else {
        if (o.queryData.params?.length) throw new Error("This query is not composable");
        e.query += o.queryData.query;
      }
      else {
        let { params: u } = e;
        u.push(o), e.query += "$" + u.length, (o instanceof d || ArrayBuffer.isView(o)) && (e.query += "::bytea");
      }
    }
    return e;
  }
};
a(gt, "SqlTemplate");
var $e = gt;
var Xt = class Xt2 {
  static {
    __name(this, "Xt");
  }
  constructor(e) {
    this.sql = e;
  }
};
a(Xt, "UnsafeRawSql");
var Ge = Xt;
p();
function bt() {
  typeof window < "u" && typeof document < "u" && typeof console < "u" && typeof console.warn == "function" && console.warn(`          
        ************************************************************
        *                                                          *
        *  WARNING: Running SQL directly from the browser can have *
        *  security implications. Even if your database is         *
        *  protected by Row-Level Security (RLS), use it at your   *
        *  own risk. This approach is great for fast prototyping,  *
        *  but ensure proper safeguards are in place to prevent    *
        *  misuse or execution of expensive SQL queries by your    *
        *  end users.                                              *
        *                                                          *
        *  If you've assessed the risks, suppress this message     *
        *  using the disableWarningInBrowsers configuration        *
        *  parameter.                                              *
        *                                                          *
        ************************************************************`);
}
__name(bt, "bt");
a(bt, "warnIfBrowser");
Fe();
var as = Se(At());
var us = Se(rt());
var _t = class _t2 extends Error {
  static {
    __name(this, "_t");
  }
  constructor(t) {
    super(t);
    E(this, "name", "NeonDbError");
    E(this, "severity");
    E(this, "code");
    E(this, "detail");
    E(this, "hint");
    E(this, "position");
    E(this, "internalPosition");
    E(
      this,
      "internalQuery"
    );
    E(this, "where");
    E(this, "schema");
    E(this, "table");
    E(this, "column");
    E(this, "dataType");
    E(this, "constraint");
    E(this, "file");
    E(this, "line");
    E(this, "routine");
    E(this, "sourceError");
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, _t2);
  }
};
a(
  _t,
  "NeonDbError"
);
var be = _t;
var is = "transaction() expects an array of queries, or a function returning an array of queries";
var Ru = ["severity", "code", "detail", "hint", "position", "internalPosition", "internalQuery", "where", "schema", "table", "column", "dataType", "constraint", "file", "line", "routine"];
function Lu(r) {
  return r instanceof d ? "\\x" + Ei(r) : r;
}
__name(Lu, "Lu");
a(Lu, "encodeBuffersAsBytea");
function ss(r) {
  let { query: e, params: t } = r instanceof $e ? r.toParameterizedQuery() : r;
  return { query: e, params: t.map((n) => Lu((0, us.prepareValue)(n))) };
}
__name(ss, "ss");
a(ss, "prepareQuery");
function cs(r, {
  arrayMode: e,
  fullResults: t,
  fetchOptions: n,
  isolationLevel: i,
  readOnly: s,
  deferrable: o,
  authToken: u,
  disableWarningInBrowsers: c
} = {}) {
  if (!r) throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
  let l;
  try {
    l = Yt(r);
  } catch {
    throw new Error(
      "Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(r)
    );
  }
  let { protocol: f, username: y, hostname: g, port: A, pathname: C } = l;
  if (f !== "postgres:" && f !== "postgresql:" || !y || !g || !C) throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
  function D(P, ...I) {
    if (!(Array.isArray(P) && Array.isArray(P.raw) && Array.isArray(I))) throw new Error('This function can now be called only as a tagged-template function: sql`SELECT ${value}`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).');
    return new Ce(
      Y,
      new $e(P, I)
    );
  }
  __name(D, "D");
  a(D, "templateFn"), D.query = (P, I, w) => new Ce(Y, { query: P, params: I ?? [] }, w), D.unsafe = (P) => new Ge(
    P
  ), D.transaction = async (P, I) => {
    if (typeof P == "function" && (P = P(D)), !Array.isArray(P)) throw new Error(is);
    P.forEach((W) => {
      if (!(W instanceof Ce)) throw new Error(is);
    });
    let w = P.map((W) => W.queryData), Z = P.map((W) => W.opts ?? {});
    return Y(w, Z, I);
  };
  async function Y(P, I, w) {
    let { fetchEndpoint: Z, fetchFunction: W } = ce, J = Array.isArray(
      P
    ) ? { queries: P.map((ee) => ss(ee)) } : ss(P), X = n ?? {}, se = e ?? false, oe = t ?? false, R = i, j = s, le = o;
    w !== void 0 && (w.fetchOptions !== void 0 && (X = { ...X, ...w.fetchOptions }), w.arrayMode !== void 0 && (se = w.arrayMode), w.fullResults !== void 0 && (oe = w.fullResults), w.isolationLevel !== void 0 && (R = w.isolationLevel), w.readOnly !== void 0 && (j = w.readOnly), w.deferrable !== void 0 && (le = w.deferrable)), I !== void 0 && !Array.isArray(I) && I.fetchOptions !== void 0 && (X = { ...X, ...I.fetchOptions });
    let de = u;
    !Array.isArray(I) && I?.authToken !== void 0 && (de = I.authToken);
    let We = typeof Z == "function" ? Z(g, A, { jwtAuth: de !== void 0 }) : Z, fe = { "Neon-Connection-String": r, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true" }, _e = await Fu(de);
    _e && (fe.Authorization = `Bearer ${_e}`), Array.isArray(P) && (R !== void 0 && (fe["Neon-Batch-Isolation-Level"] = R), j !== void 0 && (fe["Neon-Batch-Read-Only"] = String(j)), le !== void 0 && (fe["Neon-Batch-Deferrable"] = String(le))), c || ce.disableWarningInBrowsers || bt();
    let ye;
    try {
      ye = await (W ?? fetch)(We, { method: "POST", body: JSON.stringify(J), headers: fe, ...X });
    } catch (ee) {
      let M = new be(
        `Error connecting to database: ${ee}`
      );
      throw M.sourceError = ee, M;
    }
    if (ye.ok) {
      let ee = await ye.json();
      if (Array.isArray(P)) {
        let M = ee.results;
        if (!Array.isArray(M)) throw new be("Neon internal error: unexpected result format");
        return M.map(($2, me) => {
          let Ot = I[me] ?? {}, vo = Ot.arrayMode ?? se, xo = Ot.fullResults ?? oe;
          return os(
            $2,
            { arrayMode: vo, fullResults: xo, types: Ot.types }
          );
        });
      } else {
        let M = I ?? {}, $2 = M.arrayMode ?? se, me = M.fullResults ?? oe;
        return os(ee, { arrayMode: $2, fullResults: me, types: M.types });
      }
    } else {
      let { status: ee } = ye;
      if (ee === 400) {
        let M = await ye.json(), $2 = new be(M.message);
        for (let me of Ru) $2[me] = M[me] ?? void 0;
        throw $2;
      } else {
        let M = await ye.text();
        throw new be(
          `Server error (HTTP status ${ee}): ${M}`
        );
      }
    }
  }
  __name(Y, "Y");
  return a(Y, "execute"), D;
}
__name(cs, "cs");
a(cs, "neon");
var dr = class dr2 {
  static {
    __name(this, "dr");
  }
  constructor(e, t, n) {
    this.execute = e;
    this.queryData = t;
    this.opts = n;
  }
  then(e, t) {
    return this.execute(this.queryData, this.opts).then(e, t);
  }
  catch(e) {
    return this.execute(this.queryData, this.opts).catch(e);
  }
  finally(e) {
    return this.execute(
      this.queryData,
      this.opts
    ).finally(e);
  }
};
a(dr, "NeonQueryPromise");
var Ce = dr;
function os(r, {
  arrayMode: e,
  fullResults: t,
  types: n
}) {
  let i = new as.default(n), s = r.fields.map((c) => c.name), o = r.fields.map((c) => i.getTypeParser(
    c.dataTypeID
  )), u = e === true ? r.rows.map((c) => c.map((l, f) => l === null ? null : o[f](l))) : r.rows.map((c) => Object.fromEntries(
    c.map((l, f) => [s[f], l === null ? null : o[f](l)])
  ));
  return t ? (r.viaNeonFetch = true, r.rowAsArray = e, r.rows = u, r._parsers = o, r._types = i, r) : u;
}
__name(os, "os");
a(os, "processQueryResult");
async function Fu(r) {
  if (typeof r == "string") return r;
  if (typeof r == "function") try {
    return await Promise.resolve(r());
  } catch (e) {
    let t = new be("Error getting auth token.");
    throw e instanceof Error && (t = new be(`Error getting auth token: ${e.message}`)), t;
  }
}
__name(Fu, "Fu");
a(Fu, "getAuthToken");
p();
var go = Se(ot());
p();
var wo = Se(ot());
var kn = class kn2 extends wo.Client {
  static {
    __name(this, "kn");
  }
  constructor(t) {
    super(t);
    this.config = t;
  }
  get neonConfig() {
    return this.connection.stream;
  }
  connect(t) {
    let { neonConfig: n } = this;
    n.forceDisablePgSSL && (this.ssl = this.connection.ssl = false), this.ssl && n.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
    let i = typeof this.config != "string" && this.config?.host !== void 0 || typeof this.config != "string" && this.config?.connectionString !== void 0 || m.env.PGHOST !== void 0, s = m.env.USER ?? m.env.USERNAME;
    if (!i && this.host === "localhost" && this.user === s && this.database === s && this.password === null) throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let o = super.connect(t), u = n.pipelineTLS && this.ssl, c = n.pipelineConnect === "password";
    if (!u && !n.pipelineConnect) return o;
    let l = this.connection;
    if (u && l.on(
      "connect",
      () => l.stream.emit("data", "S")
    ), c) {
      l.removeAllListeners("authenticationCleartextPassword"), l.removeAllListeners("readyForQuery"), l.once("readyForQuery", () => l.on("readyForQuery", this._handleReadyForQuery.bind(this)));
      let f = this.ssl ? "sslconnect" : "connect";
      l.on(f, () => {
        this.neonConfig.disableWarningInBrowsers || bt(), this._handleAuthCleartextPassword(), this._handleReadyForQuery();
      });
    }
    return o;
  }
  async _handleAuthSASLContinue(t) {
    if (typeof crypto > "u" || crypto.subtle === void 0 || crypto.subtle.importKey === void 0) throw new Error("Cannot use SASL auth when `crypto.subtle` is not defined");
    let n = crypto.subtle, i = this.saslSession, s = this.password, o = t.data;
    if (i.message !== "SASLInitialResponse" || typeof s != "string" || typeof o != "string") throw new Error(
      "SASL: protocol error"
    );
    let u = Object.fromEntries(o.split(",").map((M) => {
      if (!/^.=/.test(M)) throw new Error(
        "SASL: Invalid attribute pair entry"
      );
      let $2 = M[0], me = M.substring(2);
      return [$2, me];
    })), c = u.r, l = u.s, f = u.i;
    if (!c || !/^[!-+--~]+$/.test(c)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
    if (!l || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(l)) throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64"
    );
    if (!f || !/^[1-9][0-9]*$/.test(f)) throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count"
    );
    if (!c.startsWith(i.clientNonce))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    if (c.length === i.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    let y = parseInt(f, 10), g = d.from(l, "base64"), A = new TextEncoder(), C = A.encode(s), D = await n.importKey(
      "raw",
      C,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), Y = new Uint8Array(await n.sign("HMAC", D, d.concat(
      [g, d.from([0, 0, 0, 1])]
    ))), P = Y;
    for (var I = 0; I < y - 1; I++) Y = new Uint8Array(await n.sign("HMAC", D, Y)), P = d.from(
      P.map((M, $2) => P[$2] ^ Y[$2])
    );
    let w = P, Z = await n.importKey(
      "raw",
      w,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), W = new Uint8Array(await n.sign("HMAC", Z, A.encode("Client Key"))), J = await n.digest(
      "SHA-256",
      W
    ), X = "n=*,r=" + i.clientNonce, se = "r=" + c + ",s=" + l + ",i=" + y, oe = "c=biws,r=" + c, R = X + "," + se + "," + oe, j = await n.importKey(
      "raw",
      J,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    var le = new Uint8Array(await n.sign(
      "HMAC",
      j,
      A.encode(R)
    )), de = d.from(W.map((M, $2) => W[$2] ^ le[$2])), We = de.toString("base64");
    let fe = await n.importKey(
      "raw",
      w,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), _e = await n.sign("HMAC", fe, A.encode("Server Key")), ye = await n.importKey("raw", _e, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
    var ee = d.from(
      await n.sign("HMAC", ye, A.encode(R))
    );
    i.message = "SASLResponse", i.serverSignature = ee.toString("base64"), i.response = oe + ",p=" + We, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
};
a(
  kn,
  "NeonClient"
);
var ut = kn;
Fe();
var bo = Se(Bt());
function vl(r, e) {
  if (e) return { callback: e, result: void 0 };
  let t, n, i = a(function(o, u) {
    o ? t(o) : n(u);
  }, "cb"), s = new r(function(o, u) {
    n = o, t = u;
  });
  return { callback: i, result: s };
}
__name(vl, "vl");
a(vl, "promisify");
var Un = class Un2 extends go.Pool {
  static {
    __name(this, "Un");
  }
  constructor() {
    super(...arguments);
    E(this, "Client", ut);
    E(this, "hasFetchUnsupportedListeners", false);
    E(this, "addListener", this.on);
  }
  on(t, n) {
    return t !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t, n);
  }
  query(t, n, i) {
    if (!ce.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t == "function") return super.query(
      t,
      n,
      i
    );
    typeof n == "function" && (i = n, n = void 0);
    let s = vl(this.Promise, i);
    i = s.callback;
    try {
      let o = new bo.default(
        this.options
      ), u = encodeURIComponent, c = encodeURI, l = `postgresql://${u(o.user)}:${u(o.password)}@${u(o.host)}/${c(o.database)}`, f = typeof t == "string" ? t : t.text, y = n ?? t.values ?? [];
      cs(l, { fullResults: true, arrayMode: t.rowMode === "array" }).query(f, y, { types: t.types ?? this.options?.types }).then((A) => i(void 0, A)).catch((A) => i(
        A
      ));
    } catch (o) {
      i(o);
    }
    return s.result;
  }
};
a(Un, "NeonPool");
var Mn = Un;
Fe();
var ct = Se(ot());
var export_DatabaseError = ct.DatabaseError;
var export_defaults = ct.defaults;
var export_escapeIdentifier = ct.escapeIdentifier;
var export_escapeLiteral = ct.escapeLiteral;
var export_types = ct.types;

// node_modules/@prisma/debug/dist/index.mjs
var __defProp2 = Object.defineProperty;
var __export2 = /* @__PURE__ */ __name((target, all) => {
  for (var name2 in all)
    __defProp2(target, name2, { get: all[name2], enumerable: true });
}, "__export");
var colors_exports = {};
__export2(colors_exports, {
  $: /* @__PURE__ */ __name(() => $, "$"),
  bgBlack: /* @__PURE__ */ __name(() => bgBlack, "bgBlack"),
  bgBlue: /* @__PURE__ */ __name(() => bgBlue, "bgBlue"),
  bgCyan: /* @__PURE__ */ __name(() => bgCyan, "bgCyan"),
  bgGreen: /* @__PURE__ */ __name(() => bgGreen, "bgGreen"),
  bgMagenta: /* @__PURE__ */ __name(() => bgMagenta, "bgMagenta"),
  bgRed: /* @__PURE__ */ __name(() => bgRed, "bgRed"),
  bgWhite: /* @__PURE__ */ __name(() => bgWhite, "bgWhite"),
  bgYellow: /* @__PURE__ */ __name(() => bgYellow, "bgYellow"),
  black: /* @__PURE__ */ __name(() => black, "black"),
  blue: /* @__PURE__ */ __name(() => blue, "blue"),
  bold: /* @__PURE__ */ __name(() => bold, "bold"),
  cyan: /* @__PURE__ */ __name(() => cyan, "cyan"),
  dim: /* @__PURE__ */ __name(() => dim, "dim"),
  gray: /* @__PURE__ */ __name(() => gray, "gray"),
  green: /* @__PURE__ */ __name(() => green, "green"),
  grey: /* @__PURE__ */ __name(() => grey, "grey"),
  hidden: /* @__PURE__ */ __name(() => hidden, "hidden"),
  inverse: /* @__PURE__ */ __name(() => inverse, "inverse"),
  italic: /* @__PURE__ */ __name(() => italic, "italic"),
  magenta: /* @__PURE__ */ __name(() => magenta, "magenta"),
  red: /* @__PURE__ */ __name(() => red, "red"),
  reset: /* @__PURE__ */ __name(() => reset, "reset"),
  strikethrough: /* @__PURE__ */ __name(() => strikethrough, "strikethrough"),
  underline: /* @__PURE__ */ __name(() => underline, "underline"),
  white: /* @__PURE__ */ __name(() => white, "white"),
  yellow: /* @__PURE__ */ __name(() => yellow, "yellow")
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x2, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x2}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null) return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
__name(init, "init");
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
var MAX_ARGS_HISTORY = 100;
var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ??= processEnv.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
var topProps = {
  enable(namespace) {
    if (typeof namespace === "string") {
      globalThis.DEBUG = namespace;
    }
  },
  disable() {
    const prev = globalThis.DEBUG;
    globalThis.DEBUG = "";
    return prev;
  },
  // this is the core logic to check if logging should happen or not
  enabled(namespace) {
    const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
      return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    });
    const isListened = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
      return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
    });
    const isExcluded = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
      return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
    });
    return isListened && !isExcluded;
  },
  log: /* @__PURE__ */ __name((...args) => {
    const [namespace, format, ...rest] = args;
    const logWithFormatting = console.warn ?? console.log;
    logWithFormatting(`${namespace} ${format}`, ...rest);
  }, "log"),
  formatters: {}
  // not implemented
};
function debugCreate(namespace) {
  const instanceProps = {
    color: COLORS[lastColor++ % COLORS.length],
    enabled: topProps.enabled(namespace),
    namespace,
    log: topProps.log,
    extend: /* @__PURE__ */ __name(() => {
    }, "extend")
    // not implemented
  };
  const debugCall = /* @__PURE__ */ __name((...args) => {
    const { enabled, namespace: namespace2, color, log } = instanceProps;
    if (args.length !== 0) {
      argsHistory.push([namespace2, ...args]);
    }
    if (argsHistory.length > MAX_ARGS_HISTORY) {
      argsHistory.shift();
    }
    if (topProps.enabled(namespace2) || enabled) {
      const stringArgs = args.map((arg) => {
        if (typeof arg === "string") {
          return arg;
        }
        return safeStringify(arg);
      });
      const ms2 = `+${Date.now() - lastTimestamp}ms`;
      lastTimestamp = Date.now();
      if (globalThis.DEBUG_COLORS) {
        log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms2));
      } else {
        log(namespace2, ...stringArgs, ms2);
      }
    }
  }, "debugCall");
  return new Proxy(debugCall, {
    get: /* @__PURE__ */ __name((_, prop) => instanceProps[prop], "get"),
    set: /* @__PURE__ */ __name((_, prop, value) => instanceProps[prop] = value, "set")
  });
}
__name(debugCreate, "debugCreate");
var Debug2 = new Proxy(debugCreate, {
  get: /* @__PURE__ */ __name((_, prop) => topProps[prop], "get"),
  set: /* @__PURE__ */ __name((_, prop, value) => topProps[prop] = value, "set")
});
function safeStringify(value, indent = 2) {
  const cache = /* @__PURE__ */ new Set();
  return JSON.stringify(
    value,
    (key, value2) => {
      if (typeof value2 === "object" && value2 !== null) {
        if (cache.has(value2)) {
          return `[Circular *]`;
        }
        cache.add(value2);
      } else if (typeof value2 === "bigint") {
        return value2.toString();
      }
      return value2;
    },
    indent
  );
}
__name(safeStringify, "safeStringify");

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
var DriverAdapterError = class extends Error {
  static {
    __name(this, "DriverAdapterError");
  }
  name = "DriverAdapterError";
  cause;
  constructor(payload) {
    super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
    this.cause = payload;
  }
};
var debug = Debug2("driver-adapter-utils");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};
var mockAdapterErrors = {
  queryRaw: new Error("Not implemented: queryRaw"),
  executeRaw: new Error("Not implemented: executeRaw"),
  startTransaction: new Error("Not implemented: startTransaction"),
  executeScript: new Error("Not implemented: executeScript"),
  dispose: new Error("Not implemented: dispose")
};

// node_modules/@prisma/adapter-neon/dist/index.mjs
var import_postgres_array = __toESM(require_postgres_array(), 1);
var name = "@prisma/adapter-neon";
var { builtins: ScalarColumnType, getTypeParser } = export_types;
var ArrayColumnType = {
  BIT_ARRAY: 1561,
  BOOL_ARRAY: 1e3,
  BYTEA_ARRAY: 1001,
  BPCHAR_ARRAY: 1014,
  CHAR_ARRAY: 1002,
  CIDR_ARRAY: 651,
  DATE_ARRAY: 1182,
  FLOAT4_ARRAY: 1021,
  FLOAT8_ARRAY: 1022,
  INET_ARRAY: 1041,
  INT2_ARRAY: 1005,
  INT4_ARRAY: 1007,
  INT8_ARRAY: 1016,
  JSONB_ARRAY: 3807,
  JSON_ARRAY: 199,
  MONEY_ARRAY: 791,
  NUMERIC_ARRAY: 1231,
  OID_ARRAY: 1028,
  TEXT_ARRAY: 1009,
  TIMESTAMP_ARRAY: 1115,
  TIME_ARRAY: 1183,
  UUID_ARRAY: 2951,
  VARBIT_ARRAY: 1563,
  VARCHAR_ARRAY: 1015,
  XML_ARRAY: 143
};
var UnsupportedNativeDataType = class _UnsupportedNativeDataType extends Error {
  static {
    __name(this, "_UnsupportedNativeDataType");
  }
  // map of type codes to type names
  static typeNames = {
    16: "bool",
    17: "bytea",
    18: "char",
    19: "name",
    20: "int8",
    21: "int2",
    22: "int2vector",
    23: "int4",
    24: "regproc",
    25: "text",
    26: "oid",
    27: "tid",
    28: "xid",
    29: "cid",
    30: "oidvector",
    32: "pg_ddl_command",
    71: "pg_type",
    75: "pg_attribute",
    81: "pg_proc",
    83: "pg_class",
    114: "json",
    142: "xml",
    194: "pg_node_tree",
    269: "table_am_handler",
    325: "index_am_handler",
    600: "point",
    601: "lseg",
    602: "path",
    603: "box",
    604: "polygon",
    628: "line",
    650: "cidr",
    700: "float4",
    701: "float8",
    705: "unknown",
    718: "circle",
    774: "macaddr8",
    790: "money",
    829: "macaddr",
    869: "inet",
    1033: "aclitem",
    1042: "bpchar",
    1043: "varchar",
    1082: "date",
    1083: "time",
    1114: "timestamp",
    1184: "timestamptz",
    1186: "interval",
    1266: "timetz",
    1560: "bit",
    1562: "varbit",
    1700: "numeric",
    1790: "refcursor",
    2202: "regprocedure",
    2203: "regoper",
    2204: "regoperator",
    2205: "regclass",
    2206: "regtype",
    2249: "record",
    2275: "cstring",
    2276: "any",
    2277: "anyarray",
    2278: "void",
    2279: "trigger",
    2280: "language_handler",
    2281: "internal",
    2283: "anyelement",
    2287: "_record",
    2776: "anynonarray",
    2950: "uuid",
    2970: "txid_snapshot",
    3115: "fdw_handler",
    3220: "pg_lsn",
    3310: "tsm_handler",
    3361: "pg_ndistinct",
    3402: "pg_dependencies",
    3500: "anyenum",
    3614: "tsvector",
    3615: "tsquery",
    3642: "gtsvector",
    3734: "regconfig",
    3769: "regdictionary",
    3802: "jsonb",
    3831: "anyrange",
    3838: "event_trigger",
    3904: "int4range",
    3906: "numrange",
    3908: "tsrange",
    3910: "tstzrange",
    3912: "daterange",
    3926: "int8range",
    4072: "jsonpath",
    4089: "regnamespace",
    4096: "regrole",
    4191: "regcollation",
    4451: "int4multirange",
    4532: "nummultirange",
    4533: "tsmultirange",
    4534: "tstzmultirange",
    4535: "datemultirange",
    4536: "int8multirange",
    4537: "anymultirange",
    4538: "anycompatiblemultirange",
    4600: "pg_brin_bloom_summary",
    4601: "pg_brin_minmax_multi_summary",
    5017: "pg_mcv_list",
    5038: "pg_snapshot",
    5069: "xid8",
    5077: "anycompatible",
    5078: "anycompatiblearray",
    5079: "anycompatiblenonarray",
    5080: "anycompatiblerange"
  };
  type;
  constructor(code) {
    super();
    this.type = _UnsupportedNativeDataType.typeNames[code] || "Unknown";
    this.message = `Unsupported column type ${this.type}`;
  }
};
function fieldToColumnType(fieldTypeId) {
  switch (fieldTypeId) {
    case ScalarColumnType.INT2:
    case ScalarColumnType.INT4:
      return ColumnTypeEnum.Int32;
    case ScalarColumnType.INT8:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.FLOAT4:
      return ColumnTypeEnum.Float;
    case ScalarColumnType.FLOAT8:
      return ColumnTypeEnum.Double;
    case ScalarColumnType.BOOL:
      return ColumnTypeEnum.Boolean;
    case ScalarColumnType.DATE:
      return ColumnTypeEnum.Date;
    case ScalarColumnType.TIME:
    case ScalarColumnType.TIMETZ:
      return ColumnTypeEnum.Time;
    case ScalarColumnType.TIMESTAMP:
    case ScalarColumnType.TIMESTAMPTZ:
      return ColumnTypeEnum.DateTime;
    case ScalarColumnType.NUMERIC:
    case ScalarColumnType.MONEY:
      return ColumnTypeEnum.Numeric;
    case ScalarColumnType.JSON:
    case ScalarColumnType.JSONB:
      return ColumnTypeEnum.Json;
    case ScalarColumnType.UUID:
      return ColumnTypeEnum.Uuid;
    case ScalarColumnType.OID:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.BPCHAR:
    case ScalarColumnType.TEXT:
    case ScalarColumnType.VARCHAR:
    case ScalarColumnType.BIT:
    case ScalarColumnType.VARBIT:
    case ScalarColumnType.INET:
    case ScalarColumnType.CIDR:
    case ScalarColumnType.XML:
      return ColumnTypeEnum.Text;
    case ScalarColumnType.BYTEA:
      return ColumnTypeEnum.Bytes;
    case ArrayColumnType.INT2_ARRAY:
    case ArrayColumnType.INT4_ARRAY:
      return ColumnTypeEnum.Int32Array;
    case ArrayColumnType.FLOAT4_ARRAY:
      return ColumnTypeEnum.FloatArray;
    case ArrayColumnType.FLOAT8_ARRAY:
      return ColumnTypeEnum.DoubleArray;
    case ArrayColumnType.NUMERIC_ARRAY:
    case ArrayColumnType.MONEY_ARRAY:
      return ColumnTypeEnum.NumericArray;
    case ArrayColumnType.BOOL_ARRAY:
      return ColumnTypeEnum.BooleanArray;
    case ArrayColumnType.CHAR_ARRAY:
      return ColumnTypeEnum.CharacterArray;
    case ArrayColumnType.BPCHAR_ARRAY:
    case ArrayColumnType.TEXT_ARRAY:
    case ArrayColumnType.VARCHAR_ARRAY:
    case ArrayColumnType.VARBIT_ARRAY:
    case ArrayColumnType.BIT_ARRAY:
    case ArrayColumnType.INET_ARRAY:
    case ArrayColumnType.CIDR_ARRAY:
    case ArrayColumnType.XML_ARRAY:
      return ColumnTypeEnum.TextArray;
    case ArrayColumnType.DATE_ARRAY:
      return ColumnTypeEnum.DateArray;
    case ArrayColumnType.TIME_ARRAY:
      return ColumnTypeEnum.TimeArray;
    case ArrayColumnType.TIMESTAMP_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.JSON_ARRAY:
    case ArrayColumnType.JSONB_ARRAY:
      return ColumnTypeEnum.JsonArray;
    case ArrayColumnType.BYTEA_ARRAY:
      return ColumnTypeEnum.BytesArray;
    case ArrayColumnType.UUID_ARRAY:
      return ColumnTypeEnum.UuidArray;
    case ArrayColumnType.INT8_ARRAY:
    case ArrayColumnType.OID_ARRAY:
      return ColumnTypeEnum.Int64Array;
    default:
      if (fieldTypeId >= 1e4) {
        return ColumnTypeEnum.Text;
      }
      throw new UnsupportedNativeDataType(fieldTypeId);
  }
}
__name(fieldToColumnType, "fieldToColumnType");
function normalize_array(element_normalizer) {
  return (str) => (0, import_postgres_array.parse)(str, element_normalizer);
}
__name(normalize_array, "normalize_array");
function normalize_numeric(numeric) {
  return numeric;
}
__name(normalize_numeric, "normalize_numeric");
function normalize_date(date) {
  return date;
}
__name(normalize_date, "normalize_date");
function normalize_timestamp(time) {
  return (/* @__PURE__ */ new Date(`${time}Z`)).toISOString().replace(/(\.000)?Z$/, "+00:00");
}
__name(normalize_timestamp, "normalize_timestamp");
function normalize_timestampz(time) {
  return new Date(time.replace(/[+-]\d{2}(:\d{2})?$/, "Z")).toISOString().replace(/(\.000)?Z$/, "+00:00");
}
__name(normalize_timestampz, "normalize_timestampz");
function normalize_time(time) {
  return time;
}
__name(normalize_time, "normalize_time");
function normalize_timez(time) {
  return time.replace(/[+-]\d{2}(:\d{2})?$/, "");
}
__name(normalize_timez, "normalize_timez");
function normalize_money(money) {
  return money.slice(1);
}
__name(normalize_money, "normalize_money");
function normalize_xml(xml) {
  return xml;
}
__name(normalize_xml, "normalize_xml");
function toJson(json) {
  return json;
}
__name(toJson, "toJson");
function encodeBuffer(buffer) {
  return Array.from(new Uint8Array(buffer));
}
__name(encodeBuffer, "encodeBuffer");
var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
var parseBytesArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
function normalizeByteaArray(serializedBytesArray) {
  const buffers = parseBytesArray(serializedBytesArray);
  return buffers.map((buf) => buf ? encodeBuffer(buf) : null);
}
__name(normalizeByteaArray, "normalizeByteaArray");
function convertBytes(serializedBytes) {
  const buffer = parsePgBytes(serializedBytes);
  return encodeBuffer(buffer);
}
__name(convertBytes, "convertBytes");
function normalizeBit(bit) {
  return bit;
}
__name(normalizeBit, "normalizeBit");
var customParsers = {
  [ScalarColumnType.NUMERIC]: normalize_numeric,
  [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
  [ScalarColumnType.TIME]: normalize_time,
  [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
  [ScalarColumnType.TIMETZ]: normalize_timez,
  [ScalarColumnType.DATE]: normalize_date,
  [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
  [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
  [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
  [ScalarColumnType.TIMESTAMPTZ]: normalize_timestampz,
  [ScalarColumnType.MONEY]: normalize_money,
  [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
  [ScalarColumnType.JSON]: toJson,
  [ArrayColumnType.JSON_ARRAY]: normalize_array(toJson),
  [ScalarColumnType.JSONB]: toJson,
  [ArrayColumnType.JSONB_ARRAY]: normalize_array(toJson),
  [ScalarColumnType.BYTEA]: convertBytes,
  [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
  [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
function mapArg(arg, argType) {
  if (arg === null) {
    return null;
  }
  if (Array.isArray(arg) && argType.arity === "list") {
    return arg.map((value) => mapArg(value, argType));
  }
  if (typeof arg === "string" && argType.scalarType === "datetime") {
    arg = new Date(arg);
  }
  if (arg instanceof Date) {
    switch (argType.dbType) {
      case "TIME":
      case "TIMETZ":
        return formatTime(arg);
      case "DATE":
        return formatDate(arg);
      default:
        return formatDateTime(arg);
    }
  }
  if (typeof arg === "string" && argType.scalarType === "bytes") {
    return Buffer.from(arg, "base64");
  }
  if (Array.isArray(arg) && argType.scalarType === "bytes") {
    return Buffer.from(arg);
  }
  if (ArrayBuffer.isView(arg)) {
    return Buffer.from(arg.buffer, arg.byteOffset, arg.byteLength);
  }
  return arg;
}
__name(mapArg, "mapArg");
function formatDateTime(date) {
  const pad = /* @__PURE__ */ __name((n, z = 2) => String(n).padStart(z, "0"), "pad");
  const ms2 = date.getUTCMilliseconds();
  return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms2 ? "." + String(ms2).padStart(3, "0") : "");
}
__name(formatDateTime, "formatDateTime");
function formatDate(date) {
  const pad = /* @__PURE__ */ __name((n, z = 2) => String(n).padStart(z, "0"), "pad");
  return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());
}
__name(formatDate, "formatDate");
function formatTime(date) {
  const pad = /* @__PURE__ */ __name((n, z = 2) => String(n).padStart(z, "0"), "pad");
  const ms2 = date.getUTCMilliseconds();
  return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms2 ? "." + String(ms2).padStart(3, "0") : "");
}
__name(formatTime, "formatTime");
function convertDriverError(error) {
  if (isDriverError(error)) {
    return {
      originalCode: error.code,
      originalMessage: error.message,
      ...mapDriverError(error)
    };
  }
  throw error;
}
__name(convertDriverError, "convertDriverError");
function mapDriverError(error) {
  switch (error.code) {
    case "22001":
      return {
        kind: "LengthMismatch",
        column: error.column
      };
    case "22003":
      return {
        kind: "ValueOutOfRange",
        cause: error.message
      };
    case "23505": {
      const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
      return {
        kind: "UniqueConstraintViolation",
        constraint: fields !== void 0 ? { fields } : void 0
      };
    }
    case "23502": {
      const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
      return {
        kind: "NullConstraintViolation",
        constraint: fields !== void 0 ? { fields } : void 0
      };
    }
    case "23503": {
      let constraint;
      if (error.column) {
        constraint = { fields: [error.column] };
      } else if (error.constraint) {
        constraint = { index: error.constraint };
      }
      return {
        kind: "ForeignKeyConstraintViolation",
        constraint
      };
    }
    case "3D000":
      return {
        kind: "DatabaseDoesNotExist",
        db: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "28000":
      return {
        kind: "DatabaseAccessDenied",
        db: error.message.split(",").find((s) => s.startsWith(" database"))?.split('"').at(1)
      };
    case "28P01":
      return {
        kind: "AuthenticationFailed",
        user: error.message.split(" ").pop()?.split('"').at(1)
      };
    case "40001":
      return {
        kind: "TransactionWriteConflict"
      };
    case "42P01":
      return {
        kind: "TableDoesNotExist",
        table: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "42703":
      return {
        kind: "ColumnNotFound",
        column: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "42P04":
      return {
        kind: "DatabaseAlreadyExists",
        db: error.message.split(" ").at(1)?.split('"').at(1)
      };
    case "53300":
      return {
        kind: "TooManyConnections",
        cause: error.message
      };
    default:
      return {
        kind: "postgres",
        code: error.code ?? "N/A",
        severity: error.severity ?? "N/A",
        message: error.message,
        detail: error.detail,
        column: error.column,
        hint: error.hint
      };
  }
}
__name(mapDriverError, "mapDriverError");
function isDriverError(error) {
  return typeof error.code === "string" && typeof error.message === "string" && typeof error.severity === "string" && (typeof error.detail === "string" || error.detail === void 0) && (typeof error.column === "string" || error.column === void 0) && (typeof error.hint === "string" || error.hint === void 0);
}
__name(isDriverError, "isDriverError");
var debug2 = Debug2("prisma:driver-adapter:neon");
var NeonQueryable = class {
  static {
    __name(this, "NeonQueryable");
  }
  provider = "postgres";
  adapterName = name;
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag2 = "[js::query_raw]";
    debug2(`${tag2} %O`, query);
    const { fields, rows } = await this.performIO(query);
    const columnNames = fields.map((field) => field.name);
    let columnTypes = [];
    try {
      columnTypes = fields.map((field) => fieldToColumnType(field.dataTypeID));
    } catch (e) {
      if (e instanceof UnsupportedNativeDataType) {
        throw new DriverAdapterError({
          kind: "UnsupportedNativeDataType",
          type: e.type
        });
      }
      throw e;
    }
    return {
      columnNames,
      columnTypes,
      rows
    };
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag2 = "[js::execute_raw]";
    debug2(`${tag2} %O`, query);
    return (await this.performIO(query)).rowCount ?? 0;
  }
};
var NeonWsQueryable = class extends NeonQueryable {
  static {
    __name(this, "NeonWsQueryable");
  }
  constructor(client) {
    super();
    this.client = client;
  }
  async performIO(query) {
    const { sql, args } = query;
    try {
      const result = await this.client.query(
        {
          text: sql,
          rowMode: "array",
          types: {
            // This is the error expected:
            // No overload matches this call.
            // The last overload gave the following error.
            //   Type '(oid: number, format?: any) => (json: string) => unknown' is not assignable to type '{ <T>(oid: number): TypeParser<string, string | T>; <T>(oid: number, format: "text"): TypeParser<string, string | T>; <T>(oid: number, format: "binary"): TypeParser<...>; }'.
            //     Type '(json: string) => unknown' is not assignable to type 'TypeParser<Buffer, any>'.
            //       Types of parameters 'json' and 'value' are incompatible.
            //         Type 'Buffer' is not assignable to type 'string'.ts(2769)
            //
            // Because pg-types types expect us to handle both binary and text protocol versions,
            // where as far we can see, pg will ever pass only text version.
            //
            // @ts-expect-error
            getTypeParser: /* @__PURE__ */ __name((oid, format) => {
              if (format === "text" && customParsers[oid]) {
                return customParsers[oid];
              }
              return export_types.getTypeParser(oid, format);
            }, "getTypeParser")
          }
        },
        args.map((arg, i) => mapArg(arg, query.argTypes[i]))
      );
      return result;
    } catch (e) {
      this.onError(e);
    }
  }
  onError(e) {
    debug2("Error in onError: %O", e);
    throw new DriverAdapterError(convertDriverError(e));
  }
};
var NeonTransaction = class extends NeonWsQueryable {
  static {
    __name(this, "NeonTransaction");
  }
  constructor(client, options) {
    super(client);
    this.options = options;
  }
  async commit() {
    debug2(`[js::commit]`);
    this.client.release();
  }
  async rollback() {
    debug2(`[js::rollback]`);
    this.client.release();
  }
};
var PrismaNeonAdapter = class extends NeonWsQueryable {
  static {
    __name(this, "PrismaNeonAdapter");
  }
  constructor(pool, options) {
    super(pool);
    this.options = options;
  }
  isRunning = true;
  executeScript(_script) {
    throw new Error("Not implemented yet");
  }
  async startTransaction(isolationLevel) {
    const options = {
      usePhantomQuery: false
    };
    const tag2 = "[js::startTransaction]";
    debug2("%s options: %O", tag2, options);
    const conn = await this.client.connect().catch((error) => this.onError(error));
    conn.on("error", (err) => {
      debug2(`Error from pool connection: ${err.message} %O`, err);
      this.options?.onConnectionError?.(err);
    });
    try {
      const tx = new NeonTransaction(conn, options);
      await tx.executeRaw({ sql: "BEGIN", args: [], argTypes: [] });
      if (isolationLevel) {
        await tx.executeRaw({
          sql: `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
          args: [],
          argTypes: []
        });
      }
      return tx;
    } catch (error) {
      conn.release(error);
      this.onError(error);
    }
  }
  getConnectionInfo() {
    return {
      schemaName: this.options?.schema,
      supportsRelationJoins: true
    };
  }
  async dispose() {
    if (this.isRunning) {
      await this.client.end();
      this.isRunning = false;
    }
  }
  underlyingDriver() {
    return this.client;
  }
};
var PrismaNeonAdapterFactory = class {
  static {
    __name(this, "PrismaNeonAdapterFactory");
  }
  constructor(config, options) {
    this.config = config;
    this.options = options;
  }
  provider = "postgres";
  adapterName = name;
  async connect() {
    const pool = new Mn(this.config);
    pool.on("error", (err) => {
      debug2(`Error from pool client: ${err.message} %O`, err);
      this.options?.onPoolError?.(err);
    });
    return new PrismaNeonAdapter(pool, this.options);
  }
};

// src/services/db.ts
var import_client = __toESM(require_default2());
function getPrismaClient2(databaseUrl) {
  const adapter = new PrismaNeonAdapterFactory({ connectionString: databaseUrl });
  return new import_client.PrismaClient({
    adapter,
    log: ["error", "warn"]
  });
}
__name(getPrismaClient2, "getPrismaClient");

// src/handlers/account.handler.ts
function createAccountHandlers(qiancaiDouService) {
  const getAccount = /* @__PURE__ */ __name(async (c) => {
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const currentUser = c.get("user");
    const [user, account] = await Promise.all([
      prisma.user.findUnique({ where: { id: currentUser.id } }),
      prisma.account.findUnique({ where: { userId: currentUser.id } })
    ]);
    return c.json({
      code: 200,
      message: "Account fetched",
      data: {
        balance: user?.qiancaiDouBalance ?? 0,
        account: account ?? null
      }
    });
  }, "getAccount");
  const grantQiancaiDou = /* @__PURE__ */ __name(async (c) => {
    const currentUser = c.get("user");
    const body = await c.req.json();
    const amount = Math.max(0, Math.floor(body.amount || 0));
    const newBalance = await qiancaiDouService.creditQiancaiDou({
      userId: currentUser.id,
      amount,
      reason: "ADMIN_ADJUSTMENT",
      description: body.description ?? "Dev grant"
    });
    return c.json({ code: 200, message: "Granted", data: { balance: newBalance } });
  }, "grantQiancaiDou");
  return { getAccount, grantQiancaiDou };
}
__name(createAccountHandlers, "createAccountHandlers");

// src/handlers/address.handler.ts
function createAddressHandlers(prisma) {
  const getAddresses = /* @__PURE__ */ __name(async (c) => {
    const currentUser = c.get("user");
    const addresses = await prisma.address.findMany({
      where: { userId: currentUser.id },
      orderBy: [
        { isDefault: "desc" },
        { createdAt: "desc" }
      ]
    });
    return c.json({ code: 200, message: "Addresses retrieved", data: addresses });
  }, "getAddresses");
  const createAddress = /* @__PURE__ */ __name(async (c) => {
    const currentUser = c.get("user");
    const body = await c.req.json();
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: currentUser.id, isDefault: true },
        data: { isDefault: false }
      });
    }
    const address = await prisma.address.create({
      data: {
        userId: currentUser.id,
        receiverName: body.receiverName,
        phone: body.phone,
        province: body.province,
        city: body.city,
        district: body.district,
        detail: body.detail,
        zip: body.zip,
        isDefault: body.isDefault || false
      }
    });
    return c.json({ code: 200, message: "Address created", data: address });
  }, "createAddress");
  const updateAddress = /* @__PURE__ */ __name(async (c) => {
    const currentUser = c.get("user");
    const addressId = parseInt(c.req.param("id"));
    const body = await c.req.json();
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId: currentUser.id }
    });
    if (!existingAddress) {
      return c.json({ code: 404, message: "Address not found", data: null }, 404);
    }
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: currentUser.id, isDefault: true },
        data: { isDefault: false }
      });
    }
    const address = await prisma.address.update({
      where: { id: addressId },
      data: body
    });
    return c.json({ code: 200, message: "Address updated", data: address });
  }, "updateAddress");
  const deleteAddress = /* @__PURE__ */ __name(async (c) => {
    const currentUser = c.get("user");
    const addressId = parseInt(c.req.param("id"));
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId: currentUser.id }
    });
    if (!existingAddress) {
      return c.json({ code: 404, message: "Address not found", data: null }, 404);
    }
    await prisma.address.delete({
      where: { id: addressId }
    });
    return c.json({ code: 200, message: "Address deleted", data: null });
  }, "deleteAddress");
  const setDefaultAddress = /* @__PURE__ */ __name(async (c) => {
    const currentUser = c.get("user");
    const addressId = parseInt(c.req.param("id"));
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId: currentUser.id }
    });
    if (!existingAddress) {
      return c.json({ code: 404, message: "Address not found", data: null }, 404);
    }
    await prisma.address.updateMany({
      where: { userId: currentUser.id, isDefault: true },
      data: { isDefault: false }
    });
    const address = await prisma.address.update({
      where: { id: addressId },
      data: { isDefault: true }
    });
    return c.json({ code: 200, message: "Default address set", data: address });
  }, "setDefaultAddress");
  return {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
  };
}
__name(createAddressHandlers, "createAddressHandlers");

// src/handlers/appointments.handler.ts
function createAppointmentHandlers(qiancaiDouService) {
  const getCourses = /* @__PURE__ */ __name(async (c) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const category = c.req.query("category");
      const where = {
        isActive: true,
        ...category && { category }
      };
      const courses = await prisma.offlineCourse.findMany({
        where,
        orderBy: { createdAt: "desc" }
      });
      return c.json({
        code: 200,
        message: "Courses retrieved successfully",
        data: { courses }
      });
    } catch (error) {
      console.error("Get courses error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getCourses");
  const getCourseSchedules = /* @__PURE__ */ __name(async (c) => {
    try {
      const courseId = parseInt(c.req.param("id"));
      if (isNaN(courseId)) {
        return c.json({
          code: 400,
          message: "Invalid course ID",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const schedules = await prisma.courseSchedule.findMany({
        where: {
          courseId,
          isActive: true,
          startTime: {
            gte: /* @__PURE__ */ new Date()
          }
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              instructor: true
            }
          }
        },
        orderBy: { startTime: "asc" }
      });
      return c.json({
        code: 200,
        message: "Course schedules retrieved successfully",
        data: { schedules }
      });
    } catch (error) {
      console.error("Get course schedules error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getCourseSchedules");
  const createAppointment = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      if (!body.scheduleId) {
        return c.json({
          code: 400,
          message: "Schedule ID is required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const result = await prisma.$transaction(async (tx) => {
        const schedule = await tx.courseSchedule.findUnique({
          where: {
            id: body.scheduleId,
            isActive: true
          },
          include: {
            course: true
          }
        });
        if (!schedule) {
          throw new Error("Schedule not found or inactive");
        }
        if (schedule.startTime < /* @__PURE__ */ new Date()) {
          throw new Error("Cannot book past schedule");
        }
        if (schedule.bookedSlots >= schedule.capacity) {
          throw new Error("Schedule is fully booked");
        }
        const existingAppointment = await tx.userAppointment.findUnique({
          where: {
            userId_scheduleId: {
              userId: currentUser.id,
              scheduleId: body.scheduleId
            }
          }
        });
        if (existingAppointment) {
          throw new Error("You have already booked this schedule");
        }
        if (schedule.feeInQiancaiDou > 0) {
          await qiancaiDouService.debitQiancaiDou({
            userId: currentUser.id,
            amount: schedule.feeInQiancaiDou,
            reason: "APPOINTMENT_FEE",
            description: `Appointment for ${schedule.course.title}`,
            refTable: "user_appointments",
            refId: body.scheduleId.toString()
          });
        }
        const appointment = await tx.userAppointment.create({
          data: {
            userId: currentUser.id,
            scheduleId: body.scheduleId,
            note: body.note
          },
          include: {
            schedule: {
              include: {
                course: true
              }
            }
          }
        });
        await tx.courseSchedule.update({
          where: { id: body.scheduleId },
          data: {
            bookedSlots: {
              increment: 1
            }
          }
        });
        return appointment;
      });
      return c.json({
        code: 200,
        message: "Appointment created successfully",
        data: { appointment: result }
      });
    } catch (error) {
      console.error("Create appointment error:", error);
      if (error instanceof Error) {
        if (error.message.includes("fully booked") || error.message.includes("already booked") || error.message.includes("past schedule")) {
          return c.json({
            code: 400,
            message: error.message,
            data: null
          }, 400);
        }
      }
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "createAppointment");
  const getUserAppointments = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const status = c.req.query("status");
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const where = {
        userId: currentUser.id,
        ...status && { status }
      };
      const appointments = await prisma.userAppointment.findMany({
        where,
        include: {
          schedule: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  instructor: true,
                  category: true
                }
              }
            }
          }
        },
        orderBy: [
          { schedule: { startTime: "asc" } },
          { createdAt: "desc" }
        ]
      });
      return c.json({
        code: 200,
        message: "Appointments retrieved successfully",
        data: { appointments }
      });
    } catch (error) {
      console.error("Get user appointments error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getUserAppointments");
  const cancelAppointment = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const appointmentId = parseInt(c.req.param("id"));
      if (isNaN(appointmentId)) {
        return c.json({
          code: 400,
          message: "Invalid appointment ID",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const result = await prisma.$transaction(async (tx) => {
        const appointment = await tx.userAppointment.findUnique({
          where: {
            id: appointmentId,
            userId: currentUser.id
          },
          include: {
            schedule: {
              include: {
                course: true
              }
            }
          }
        });
        if (!appointment) {
          throw new Error("Appointment not found");
        }
        if (appointment.status === "CANCELLED") {
          throw new Error("Appointment already cancelled");
        }
        const hoursUntilStart = (appointment.schedule.startTime.getTime() - (/* @__PURE__ */ new Date()).getTime()) / (1e3 * 60 * 60);
        if (hoursUntilStart < 24) {
          throw new Error("Cannot cancel appointment within 24 hours of start time");
        }
        const updatedAppointment = await tx.userAppointment.update({
          where: { id: appointmentId },
          data: { status: "CANCELLED" },
          include: {
            schedule: {
              include: {
                course: true
              }
            }
          }
        });
        await tx.courseSchedule.update({
          where: { id: appointment.scheduleId },
          data: {
            bookedSlots: {
              decrement: 1
            }
          }
        });
        if (appointment.schedule.feeInQiancaiDou > 0) {
          await qiancaiDouService.creditQiancaiDou({
            userId: currentUser.id,
            amount: appointment.schedule.feeInQiancaiDou,
            reason: "REFUND",
            description: `Refund for cancelled appointment: ${appointment.schedule.course.title}`,
            refTable: "user_appointments",
            refId: appointmentId.toString()
          });
        }
        return updatedAppointment;
      });
      return c.json({
        code: 200,
        message: "Appointment cancelled successfully",
        data: { appointment: result }
      });
    } catch (error) {
      console.error("Cancel appointment error:", error);
      if (error instanceof Error) {
        if (error.message.includes("not found") || error.message.includes("already cancelled") || error.message.includes("within 24 hours")) {
          return c.json({
            code: 400,
            message: error.message,
            data: null
          }, 400);
        }
      }
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "cancelAppointment");
  return {
    getCourses,
    getCourseSchedules,
    createAppointment,
    getUserAppointments,
    cancelAppointment
  };
}
__name(createAppointmentHandlers, "createAppointmentHandlers");

// src/handlers/auth.handler.ts
function createAuthHandlers(authService, qiancaiDouService) {
  const register = /* @__PURE__ */ __name(async (c) => {
    try {
      const body = await c.req.json();
      if (!body.email || !body.password) {
        return c.json({
          code: 400,
          message: "Email and password are required",
          data: null
        }, 400);
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return c.json({
          code: 400,
          message: "Invalid email format",
          data: null
        }, 400);
      }
      if (body.password.length < 6) {
        return c.json({
          code: 400,
          message: "Password must be at least 6 characters long",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const existingUser = await prisma.user.findUnique({
        where: { email: body.email }
      });
      if (existingUser) {
        return c.json({
          code: 409,
          message: "Email already registered",
          data: null
        }, 409);
      }
      const passwordHash = await authService.hashPassword(body.password);
      const user = await prisma.user.create({
        data: {
          email: body.email,
          passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
          language: body.language || "zh",
          qiancaiDouBalance: 100
          // 新用户奖励100千彩豆
        }
      });
      await qiancaiDouService.creditQiancaiDou({
        userId: user.id,
        amount: 100,
        reason: "ADMIN_ADJUSTMENT",
        description: "Welcome bonus for new user"
      });
      const token = await authService.generateToken({
        userId: user.id,
        email: user.email
      });
      return c.json({
        code: 200,
        message: "User registered successfully",
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            qiancaiDouBalance: user.qiancaiDouBalance,
            language: user.language,
            createdAt: user.createdAt
          }
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "register");
  const login = /* @__PURE__ */ __name(async (c) => {
    try {
      const body = await c.req.json();
      if (!body.email || !body.password) {
        return c.json({
          code: 400,
          message: "Email and password are required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const user = await prisma.user.findUnique({
        where: { email: body.email }
      });
      if (!user) {
        return c.json({
          code: 401,
          message: "Invalid email or password",
          data: null
        }, 401);
      }
      if (!user.passwordHash) {
        return c.json({
          code: 401,
          message: "Invalid email or password",
          data: null
        }, 401);
      }
      const isPasswordValid = await authService.verifyPassword(body.password, user.passwordHash);
      if (!isPasswordValid) {
        return c.json({
          code: 401,
          message: "Invalid email or password",
          data: null
        }, 401);
      }
      const token = await authService.generateToken({
        userId: user.id,
        email: user.email
      });
      return c.json({
        code: 200,
        message: "Login successful",
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            qiancaiDouBalance: user.qiancaiDouBalance,
            language: user.language,
            createdAt: user.createdAt
          }
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      const env = c.env || {};
      const isProd = env["ENVIRONMENT"] === "production";
      return c.json({
        code: 500,
        message: isProd ? "Internal server error" : `Login failed: ${String(error?.message || error)}`,
        data: null
      }, 500);
    }
  }, "login");
  const getMe = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const user = await prisma.user.findUnique({
        where: { id: currentUser.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          qiancaiDouBalance: true,
          language: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });
      if (!user) {
        return c.json({
          code: 404,
          message: "User not found",
          data: null
        }, 404);
      }
      return c.json({
        code: 200,
        message: "User information retrieved successfully",
        data: { user }
      });
    } catch (error) {
      console.error("Get user info error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getMe");
  const uploadAvatar = /* @__PURE__ */ __name(async (c) => {
    let prisma = null;
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      if (!body.avatarData || !body.mimeType || !body.size) {
        return c.json({
          code: 400,
          message: "Avatar data, mime type and size are required",
          data: null
        }, 400);
      }
      const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!allowedMimeTypes.includes(body.mimeType)) {
        return c.json({
          code: 400,
          message: "Unsupported image format. Allowed: JPEG, PNG, GIF, WebP",
          data: null
        }, 400);
      }
      const maxSize = 5 * 1024 * 1024;
      if (body.size > maxSize) {
        return c.json({
          code: 400,
          message: "Image size too large. Maximum 5MB allowed",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      prisma = getPrismaClient2(databaseUrl);
      const updatedUser = await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          avatarData: body.avatarData,
          avatarMimeType: body.mimeType,
          avatarSize: body.size,
          avatarUrl: `data:${body.mimeType};base64,${body.avatarData}`,
          updatedAt: /* @__PURE__ */ new Date()
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          avatarData: true,
          avatarMimeType: true,
          avatarSize: true,
          qiancaiDouBalance: true,
          language: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return c.json({
        code: 200,
        message: "Avatar uploaded successfully",
        data: { user: updatedUser }
      });
    } catch (error) {
      console.error("Upload avatar error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    } finally {
      if (prisma) {
        try {
        } catch (disconnectError) {
          console.error("Error disconnecting Prisma:", disconnectError);
        }
      }
    }
  }, "uploadAvatar");
  const updateProfile = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const data = {};
      if (typeof body.firstName === "string") data.firstName = body.firstName;
      if (typeof body.lastName === "string") data.lastName = body.lastName;
      if (typeof body.language === "string") data.language = body.language;
      if (typeof body.avatarDataUrl === "string" && body.avatarDataUrl.length > 0) {
        data.avatarUrl = body.avatarDataUrl;
      }
      const user = await prisma.user.update({
        where: { id: currentUser.id },
        data,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          qiancaiDouBalance: true,
          language: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return c.json({
        code: 200,
        message: "Profile updated successfully",
        data: { user }
      });
    } catch (error) {
      console.error("Update profile error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "updateProfile");
  return {
    register,
    login,
    getMe,
    updateProfile,
    uploadAvatar
  };
}
__name(createAuthHandlers, "createAuthHandlers");

// src/handlers/cart.handler.ts
function createCartHandlers() {
  const getCart = /* @__PURE__ */ __name(async (c) => {
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const currentUser = c.get("user");
    const cart = await prisma.cart.upsert({
      where: { userId: currentUser.id },
      update: {},
      create: { userId: currentUser.id }
    });
    const items = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true }
    });
    return c.json({ code: 200, message: "Cart fetched", data: { cart, items } });
  }, "getCart");
  const addItem = /* @__PURE__ */ __name(async (c) => {
    const body = await c.req.json();
    const qty = Math.max(1, Math.floor(body.quantity ?? 1));
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const currentUser = c.get("user");
    const cart = await prisma.cart.upsert({ where: { userId: currentUser.id }, update: {}, create: { userId: currentUser.id } });
    const item = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: body.productId } },
      update: { quantity: { increment: qty } },
      create: { cartId: cart.id, productId: body.productId, quantity: qty }
    });
    await prisma.cart.update({ where: { id: cart.id }, data: { itemsCount: await prisma.cartItem.count({ where: { cartId: cart.id } }) } });
    return c.json({ code: 200, message: "Added", data: { itemId: item.id } });
  }, "addItem");
  const updateItem = /* @__PURE__ */ __name(async (c) => {
    const itemId = parseInt(c.req.param("itemId"));
    const body = await c.req.json();
    const qty = Math.max(1, Math.floor(body.quantity));
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const currentUser = c.get("user");
    const cart = await prisma.cart.findUniqueOrThrow({ where: { userId: currentUser.id } });
    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity: qty } });
    await prisma.cart.update({ where: { id: cart.id }, data: { itemsCount: await prisma.cartItem.count({ where: { cartId: cart.id } }) } });
    return c.json({ code: 200, message: "Updated" });
  }, "updateItem");
  const removeItem = /* @__PURE__ */ __name(async (c) => {
    const itemId = parseInt(c.req.param("itemId"));
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const currentUser = c.get("user");
    const cart = await prisma.cart.findUniqueOrThrow({ where: { userId: currentUser.id } });
    await prisma.cartItem.delete({ where: { id: itemId } });
    await prisma.cart.update({ where: { id: cart.id }, data: { itemsCount: await prisma.cartItem.count({ where: { cartId: cart.id } }) } });
    return c.json({ code: 200, message: "Removed" });
  }, "removeItem");
  return { getCart, addItem, updateItem, removeItem };
}
__name(createCartHandlers, "createCartHandlers");

// src/handlers/checkout.handler.ts
function createCheckoutHandlers(qiancaiDouService) {
  const preview = /* @__PURE__ */ __name(async (c) => {
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const currentUser = c.get("user");
    const cart = await prisma.cart.findUnique({ where: { userId: currentUser.id } });
    if (!cart) return c.json({ code: 200, message: "Empty", data: { items: [], total: 0, balance: await qiancaiDouService.getBalance(currentUser.id) } });
    const items = await prisma.cartItem.findMany({ where: { cartId: cart.id }, include: { product: true } });
    let total = 0;
    const detail = items.map((i) => {
      const subtotal = i.product.priceInQiancaiDou * i.quantity;
      total += subtotal;
      return { id: i.id, productId: i.productId, title: i.product.title, quantity: i.quantity, unitPrice: i.product.priceInQiancaiDou, subtotal };
    });
    const balance = await qiancaiDouService.getBalance(currentUser.id);
    return c.json({ code: 200, message: "Preview", data: { items: detail, total, balance } });
  }, "preview");
  const createOrderFromCart = /* @__PURE__ */ __name(async (c) => {
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const currentUser = c.get("user");
    const body = await c.req.json().catch(() => ({}));
    const cart = await prisma.cart.findUnique({ where: { userId: currentUser.id } });
    if (!cart) throw new Error("EMPTY_CART");
    const items = await prisma.cartItem.findMany({ where: { cartId: cart.id }, include: { product: true } });
    if (items.length === 0) throw new Error("EMPTY_CART");
    let total = 0;
    const orderItems = items.map((i) => {
      if (!i.product.isActive || i.product.stock < i.quantity) throw new Error("INSUFFICIENT_STOCK");
      const subtotal = i.product.priceInQiancaiDou * i.quantity;
      total += subtotal;
      return { productId: i.productId, quantity: i.quantity, unitPrice: i.product.priceInQiancaiDou, totalPrice: subtotal };
    });
    const result = await prisma.$transaction(async (tx) => {
      await qiancaiDouService.debitQiancaiDou({ userId: currentUser.id, amount: total, reason: "PRODUCT_REDEMPTION", refTable: "orders" }, tx);
      const order = await tx.order.create({
        data: {
          userId: currentUser.id,
          totalCost: total,
          note: body?.note,
          items: { create: orderItems },
          status: "PAID",
          payMethod: "QIANCAIDOU",
          paidAt: /* @__PURE__ */ new Date()
        },
        include: {
          items: {
            include: {
              product: true
            }
          },
          shippingAddress: true
        }
      });
      for (const i of items) {
        await tx.product.update({ where: { id: i.productId }, data: { stock: { decrement: i.quantity } } });
      }
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      await tx.cart.update({ where: { id: cart.id }, data: { itemsCount: 0 } });
      return order;
    });
    return c.json({ code: 200, message: "Order created", data: result });
  }, "createOrderFromCart");
  return { preview, createOrderFromCart };
}
__name(createCheckoutHandlers, "createCheckoutHandlers");

// src/handlers/feedback.handler.ts
function createFeedbackHandlers(prisma) {
  const createFeedback = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      if (!currentUser) {
        return c.json({
          code: 401,
          message: "Unauthorized",
          data: null
        }, 401);
      }
      const body = await c.req.json();
      if (!body.title || !body.content || !body.category || !body.priority) {
        return c.json({
          code: 400,
          message: "Title, content, category and priority are required",
          data: null
        }, 400);
      }
      const validCategories = ["general", "bug", "feature", "suggestion", "complaint"];
      if (!validCategories.includes(body.category)) {
        return c.json({
          code: 400,
          message: "Invalid category",
          data: null
        }, 400);
      }
      const validPriorities = ["low", "medium", "high", "urgent"];
      if (!validPriorities.includes(body.priority)) {
        return c.json({
          code: 400,
          message: "Invalid priority",
          data: null
        }, 400);
      }
      const feedback = await prisma.feedback.create({
        data: {
          userId: currentUser.id,
          title: body.title,
          content: body.content,
          category: body.category,
          priority: body.priority,
          status: "pending"
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      });
      return c.json({
        code: 200,
        message: "Feedback created successfully",
        data: {
          id: feedback.id,
          userId: feedback.userId,
          title: feedback.title,
          content: feedback.content,
          category: feedback.category,
          status: feedback.status,
          priority: feedback.priority,
          createdAt: feedback.createdAt.toISOString(),
          updatedAt: feedback.updatedAt.toISOString(),
          adminReply: feedback.adminReply,
          adminRepliedAt: feedback.adminRepliedAt?.toISOString()
        }
      });
    } catch (error) {
      console.error("Create feedback error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "createFeedback");
  const getUserFeedback = /* @__PURE__ */ __name(async (c) => {
    let currentUser = null;
    try {
      currentUser = c.get("user");
      if (!currentUser) {
        return c.json({
          code: 401,
          message: "Unauthorized",
          data: null
        }, 401);
      }
      const page = parseInt(c.req.query("page") || "1");
      const limit = parseInt(c.req.query("limit") || "20");
      const offset = (page - 1) * limit;
      const feedbacks = await prisma.feedback.findMany({
        where: {
          userId: currentUser.id
        },
        orderBy: {
          createdAt: "desc"
        },
        skip: offset,
        take: limit
      });
      const total = await prisma.feedback.count({
        where: {
          userId: currentUser.id
        }
      });
      return c.json({
        code: 200,
        message: "Feedback list retrieved successfully",
        data: feedbacks.map((feedback) => ({
          id: feedback.id,
          userId: feedback.userId,
          title: feedback.title,
          content: feedback.content,
          category: feedback.category,
          status: feedback.status,
          priority: feedback.priority,
          createdAt: feedback.createdAt.toISOString(),
          updatedAt: feedback.updatedAt.toISOString(),
          adminReply: feedback.adminReply,
          adminRepliedAt: feedback.adminRepliedAt?.toISOString()
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error("Get user feedback error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getUserFeedback");
  const getFeedback = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      if (!currentUser) {
        return c.json({
          code: 401,
          message: "Unauthorized",
          data: null
        }, 401);
      }
      const feedbackId = parseInt(c.req.param("id"));
      if (!feedbackId) {
        return c.json({
          code: 400,
          message: "Invalid feedback ID",
          data: null
        }, 400);
      }
      const feedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id
        }
      });
      if (!feedback) {
        return c.json({
          code: 404,
          message: "Feedback not found",
          data: null
        }, 404);
      }
      return c.json({
        code: 200,
        message: "Feedback retrieved successfully",
        data: {
          id: feedback.id,
          userId: feedback.userId,
          title: feedback.title,
          content: feedback.content,
          category: feedback.category,
          status: feedback.status,
          priority: feedback.priority,
          createdAt: feedback.createdAt.toISOString(),
          updatedAt: feedback.updatedAt.toISOString(),
          adminReply: feedback.adminReply,
          adminRepliedAt: feedback.adminRepliedAt?.toISOString()
        }
      });
    } catch (error) {
      console.error("Get feedback error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getFeedback");
  const updateFeedback = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      if (!currentUser) {
        return c.json({
          code: 401,
          message: "Unauthorized",
          data: null
        }, 401);
      }
      const feedbackId = parseInt(c.req.param("id"));
      if (!feedbackId) {
        return c.json({
          code: 400,
          message: "Invalid feedback ID",
          data: null
        }, 400);
      }
      const body = await c.req.json();
      const existingFeedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id
        }
      });
      if (!existingFeedback) {
        return c.json({
          code: 404,
          message: "Feedback not found",
          data: null
        }, 404);
      }
      if (body.category) {
        const validCategories = ["general", "bug", "feature", "suggestion", "complaint"];
        if (!validCategories.includes(body.category)) {
          return c.json({
            code: 400,
            message: "Invalid category",
            data: null
          }, 400);
        }
      }
      if (body.priority) {
        const validPriorities = ["low", "medium", "high", "urgent"];
        if (!validPriorities.includes(body.priority)) {
          return c.json({
            code: 400,
            message: "Invalid priority",
            data: null
          }, 400);
        }
      }
      if (body.status) {
        const validStatuses = ["pending", "in_progress", "resolved", "closed"];
        if (!validStatuses.includes(body.status)) {
          return c.json({
            code: 400,
            message: "Invalid status",
            data: null
          }, 400);
        }
      }
      const updateData = {};
      if (body.title !== void 0) updateData.title = body.title;
      if (body.content !== void 0) updateData.content = body.content;
      if (body.category !== void 0) updateData.category = body.category;
      if (body.priority !== void 0) updateData.priority = body.priority;
      if (body.status !== void 0) updateData.status = body.status;
      if (body.adminReply !== void 0) {
        updateData.adminReply = body.adminReply;
        updateData.adminRepliedAt = /* @__PURE__ */ new Date();
      }
      const feedback = await prisma.feedback.update({
        where: {
          id: feedbackId
        },
        data: updateData
      });
      return c.json({
        code: 200,
        message: "Feedback updated successfully",
        data: {
          id: feedback.id,
          userId: feedback.userId,
          title: feedback.title,
          content: feedback.content,
          category: feedback.category,
          status: feedback.status,
          priority: feedback.priority,
          createdAt: feedback.createdAt.toISOString(),
          updatedAt: feedback.updatedAt.toISOString(),
          adminReply: feedback.adminReply,
          adminRepliedAt: feedback.adminRepliedAt?.toISOString()
        }
      });
    } catch (error) {
      console.error("Update feedback error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "updateFeedback");
  const deleteFeedback = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      if (!currentUser) {
        return c.json({
          code: 401,
          message: "Unauthorized",
          data: null
        }, 401);
      }
      const feedbackId = parseInt(c.req.param("id"));
      if (!feedbackId) {
        return c.json({
          code: 400,
          message: "Invalid feedback ID",
          data: null
        }, 400);
      }
      const existingFeedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id
        }
      });
      if (!existingFeedback) {
        return c.json({
          code: 404,
          message: "Feedback not found",
          data: null
        }, 404);
      }
      await prisma.feedback.delete({
        where: {
          id: feedbackId
        }
      });
      return c.json({
        code: 200,
        message: "Feedback deleted successfully",
        data: null
      });
    } catch (error) {
      console.error("Delete feedback error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "deleteFeedback");
  return {
    createFeedback,
    getUserFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback
  };
}
__name(createFeedbackHandlers, "createFeedbackHandlers");

// src/handlers/inventory.handler.ts
function createInventoryHandlers(prisma) {
  const checkInventory = /* @__PURE__ */ __name(async (c) => {
    const body = await c.req.json();
    const results = [];
    for (const item of body.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: {
          id: true,
          title: true,
          stock: true,
          isActive: true
        }
      });
      if (!product) {
        results.push({
          productId: item.productId,
          available: false,
          reason: "PRODUCT_NOT_FOUND"
        });
        continue;
      }
      if (!product.isActive) {
        results.push({
          productId: item.productId,
          available: false,
          reason: "PRODUCT_INACTIVE"
        });
        continue;
      }
      if (product.stock < item.quantity) {
        results.push({
          productId: item.productId,
          available: false,
          reason: "INSUFFICIENT_STOCK",
          availableStock: product.stock,
          requestedQuantity: item.quantity
        });
        continue;
      }
      results.push({
        productId: item.productId,
        available: true,
        availableStock: product.stock
      });
    }
    return c.json({ code: 200, message: "Inventory checked", data: results });
  }, "checkInventory");
  const lockInventory = /* @__PURE__ */ __name(async (c) => {
    const body = await c.req.json();
    const expiresInMinutes = body.expiresInMinutes || 15;
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1e3);
    const result = await prisma.$transaction(async (tx) => {
      const locks = [];
      for (const item of body.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });
        if (!product || !product.isActive || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId}`);
        }
        const lock = await tx.inventoryLock.create({
          data: {
            orderId: body.orderId,
            productId: item.productId,
            quantity: item.quantity,
            expiresAt
          }
        });
        locks.push(lock);
      }
      return locks;
    });
    return c.json({ code: 200, message: "Inventory locked", data: result });
  }, "lockInventory");
  const releaseInventory = /* @__PURE__ */ __name(async (c) => {
    const body = await c.req.json();
    const result = await prisma.inventoryLock.updateMany({
      where: {
        orderId: body.orderId,
        status: "LOCKED"
      },
      data: { status: "RELEASED" }
    });
    return c.json({
      code: 200,
      message: "Inventory released",
      data: { updatedCount: result.count }
    });
  }, "releaseInventory");
  const consumeInventory = /* @__PURE__ */ __name(async (c) => {
    const body = await c.req.json();
    const result = await prisma.$transaction(async (tx) => {
      const locks = await tx.inventoryLock.findMany({
        where: {
          orderId: body.orderId,
          status: "LOCKED"
        },
        include: {
          product: true
        }
      });
      for (const lock of locks) {
        await tx.product.update({
          where: { id: lock.productId },
          data: {
            stock: {
              decrement: lock.quantity
            }
          }
        });
      }
      const updateResult = await tx.inventoryLock.updateMany({
        where: {
          orderId: body.orderId,
          status: "LOCKED"
        },
        data: { status: "CONSUMED" }
      });
      return updateResult;
    });
    return c.json({
      code: 200,
      message: "Inventory consumed",
      data: { updatedCount: result.count }
    });
  }, "consumeInventory");
  const cleanupExpiredLocks = /* @__PURE__ */ __name(async (c) => {
    const now = /* @__PURE__ */ new Date();
    const result = await prisma.inventoryLock.updateMany({
      where: {
        status: "LOCKED",
        expiresAt: {
          lt: now
        }
      },
      data: { status: "RELEASED" }
    });
    return c.json({
      code: 200,
      message: "Expired locks cleaned up",
      data: { updatedCount: result.count }
    });
  }, "cleanupExpiredLocks");
  const getInventoryStatus = /* @__PURE__ */ __name(async (c) => {
    const productId = parseInt(c.req.param("productId"));
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        title: true,
        stock: true,
        isActive: true
      }
    });
    if (!product) {
      return c.json({ code: 404, message: "Product not found", data: null }, 404);
    }
    const lockedStock = await prisma.inventoryLock.aggregate({
      where: {
        productId,
        status: "LOCKED"
      },
      _sum: {
        quantity: true
      }
    });
    const availableStock = product.stock - (lockedStock._sum.quantity || 0);
    return c.json({
      code: 200,
      message: "Inventory status retrieved",
      data: {
        productId: product.id,
        title: product.title,
        totalStock: product.stock,
        lockedStock: lockedStock._sum.quantity || 0,
        availableStock,
        isActive: product.isActive
      }
    });
  }, "getInventoryStatus");
  return {
    checkInventory,
    lockInventory,
    releaseInventory,
    consumeInventory,
    cleanupExpiredLocks,
    getInventoryStatus
  };
}
__name(createInventoryHandlers, "createInventoryHandlers");

// src/handlers/learning.handler.ts
function createLearningHandlers() {
  const registerCourse = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      if (!body.courseId || !body.title) {
        return c.json({
          code: 400,
          message: "Course ID and title are required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const existingRegistration = await prisma.learningRegistration.findFirst({
        where: {
          userId: currentUser.id,
          itemId: body.courseId,
          itemType: "course",
          status: "REGISTERED"
        }
      });
      if (existingRegistration) {
        return c.json({
          code: 400,
          message: "Already registered for this course",
          data: null
        }, 400);
      }
      const registration = await prisma.learningRegistration.create({
        data: {
          userId: currentUser.id,
          itemId: body.courseId,
          itemType: "course",
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          status: "REGISTERED"
        }
      });
      return c.json({
        code: 200,
        message: "Course registered successfully",
        data: {
          id: body.courseId,
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: "course",
          registeredAt: registration.createdAt.toISOString(),
          icon: "cpu"
        }
      });
    } catch (error) {
      console.error("Register course error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "registerCourse");
  const registerStudyAbroadService = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      if (!body.serviceId || !body.title) {
        return c.json({
          code: 400,
          message: "Service ID and title are required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const existingRegistration = await prisma.learningRegistration.findFirst({
        where: {
          userId: currentUser.id,
          itemId: body.serviceId,
          itemType: "service",
          status: "REGISTERED"
        }
      });
      if (existingRegistration) {
        return c.json({
          code: 400,
          message: "Already registered for this service",
          data: null
        }, 400);
      }
      const registration = await prisma.learningRegistration.create({
        data: {
          userId: currentUser.id,
          itemId: body.serviceId,
          itemType: "service",
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          status: "REGISTERED"
        }
      });
      return c.json({
        code: 200,
        message: "Study abroad service registered successfully",
        data: {
          id: body.serviceId,
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: "service",
          registeredAt: registration.createdAt.toISOString(),
          icon: "messageSquare"
        }
      });
    } catch (error) {
      console.error("Register study abroad service error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "registerStudyAbroadService");
  const registerSummerCamp = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      if (!body.campId || !body.title) {
        return c.json({
          code: 400,
          message: "Camp ID and title are required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const existingRegistration = await prisma.learningRegistration.findFirst({
        where: {
          userId: currentUser.id,
          itemId: body.campId,
          itemType: "camp",
          status: "REGISTERED"
        }
      });
      if (existingRegistration) {
        return c.json({
          code: 400,
          message: "Already registered for this camp",
          data: null
        }, 400);
      }
      const registration = await prisma.learningRegistration.create({
        data: {
          userId: currentUser.id,
          itemId: body.campId,
          itemType: "camp",
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          status: "REGISTERED"
        }
      });
      return c.json({
        code: 200,
        message: "Summer camp registered successfully",
        data: {
          id: body.campId,
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: "camp",
          registeredAt: registration.createdAt.toISOString(),
          icon: "mapPin"
        }
      });
    } catch (error) {
      console.error("Register summer camp error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "registerSummerCamp");
  const cancelRegistration = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const type = c.req.param("type");
      const registrationId = c.req.param("id");
      if (!type || !registrationId) {
        return c.json({
          code: 400,
          message: "Type and registration ID are required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const registration = await prisma.learningRegistration.findFirst({
        where: {
          userId: currentUser.id,
          itemId: registrationId,
          itemType: type,
          status: "REGISTERED"
        }
      });
      if (!registration) {
        return c.json({
          code: 404,
          message: "Registration not found",
          data: null
        }, 404);
      }
      await prisma.learningRegistration.update({
        where: { id: registration.id },
        data: { status: "CANCELLED" }
      });
      return c.json({
        code: 200,
        message: "Registration cancelled successfully",
        data: null
      });
    } catch (error) {
      console.error("Cancel registration error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "cancelRegistration");
  const deleteRegistration = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const type = c.req.param("type");
      const registrationId = c.req.param("id");
      if (!type || !registrationId) {
        return c.json({
          code: 400,
          message: "Type and registration ID are required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const registration = await prisma.learningRegistration.findFirst({
        where: {
          userId: currentUser.id,
          itemId: registrationId,
          itemType: type,
          status: "REGISTERED"
        }
      });
      if (!registration) {
        return c.json({
          code: 404,
          message: "Registration not found",
          data: null
        }, 404);
      }
      await prisma.learningRegistration.delete({
        where: { id: registration.id }
      });
      return c.json({
        code: 200,
        message: "Registration deleted successfully",
        data: null
      });
    } catch (error) {
      console.error("Delete registration error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "deleteRegistration");
  const getUserLearningRegistrations = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const registrations = await prisma.learningRegistration.findMany({
        where: {
          userId: currentUser.id,
          status: "REGISTERED"
        },
        orderBy: { createdAt: "desc" }
      });
      const formattedRegistrations = registrations.map((reg) => {
        let icon = "helpCircle";
        switch (reg.itemType) {
          case "course":
            icon = "cpu";
            break;
          case "service":
            icon = "messageSquare";
            break;
          case "camp":
            icon = "mapPin";
            break;
        }
        return {
          id: reg.itemId,
          title: reg.title,
          subtitle: reg.subtitle,
          category: reg.category,
          type: reg.itemType,
          registeredAt: reg.createdAt.toISOString(),
          icon
        };
      });
      return c.json({
        code: 200,
        message: "Learning registrations retrieved successfully",
        data: { registrations: formattedRegistrations }
      });
    } catch (error) {
      console.error("Get user learning registrations error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getUserLearningRegistrations");
  const clearAllLearningRegistrations = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      await prisma.learningRegistration.deleteMany({
        where: {
          userId: currentUser.id,
          status: "REGISTERED"
        }
      });
      return c.json({
        code: 200,
        message: "All learning registrations cleared successfully",
        data: null
      });
    } catch (error) {
      console.error("Clear all learning registrations error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "clearAllLearningRegistrations");
  return {
    registerCourse,
    registerStudyAbroadService,
    registerSummerCamp,
    cancelRegistration,
    deleteRegistration,
    getUserLearningRegistrations,
    clearAllLearningRegistrations
  };
}
__name(createLearningHandlers, "createLearningHandlers");

// src/handlers/order.handler.ts
function createOrderHandlers(prisma, qiancaiDouService) {
  const getOrders = /* @__PURE__ */ __name(async (c) => {
    const currentUser = c.get("user");
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "10");
    const status = c.req.query("status");
    const where = { userId: currentUser.id };
    if (status) {
      where.status = status;
    }
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: true
            }
          },
          shippingAddress: true,
          shipment: true
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.order.count({ where })
    ]);
    return c.json({
      code: 200,
      message: "Orders retrieved",
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  }, "getOrders");
  const getOrder = /* @__PURE__ */ __name(async (c) => {
    const currentUser = c.get("user");
    const orderId = parseInt(c.req.param("id"));
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: currentUser.id },
      include: {
        items: {
          include: {
            product: true
          }
        },
        shippingAddress: true,
        shipment: true,
        shippingTracks: {
          orderBy: { timestamp: "desc" }
        }
      }
    });
    if (!order) {
      return c.json({ code: 404, message: "Order not found", data: null }, 404);
    }
    return c.json({ code: 200, message: "Order retrieved", data: order });
  }, "getOrder");
  const createOrderFromCart = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      const cart = await prisma.cart.findUnique({
        where: { userId: currentUser.id },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
      if (!cart || cart.items.length === 0) {
        return c.json({ code: 400, message: "\u8D2D\u7269\u8F66\u4E3A\u7A7A", data: null }, 400);
      }
      let totalCost = 0;
      const orderItems = [];
      for (const item of cart.items) {
        if (!item.product.isActive || item.product.stock < item.quantity) {
          return c.json({ code: 400, message: "\u5E93\u5B58\u4E0D\u8DB3", data: null }, 400);
        }
        const subtotal = item.product.priceInQiancaiDou * item.quantity;
        totalCost += subtotal;
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.priceInQiancaiDou,
          totalPrice: subtotal
        });
      }
      const balance = await qiancaiDouService.getBalance(currentUser.id);
      if (balance < totalCost) {
        return c.json({ code: 400, message: "\u5343\u5F69\u8C46\u4F59\u989D\u4E0D\u8DB3", data: null }, 400);
      }
      const order = await prisma.order.create({
        data: {
          userId: currentUser.id,
          totalCost,
          shippingAddressId: body.shippingAddressId,
          note: body.note,
          status: "PENDING",
          items: {
            create: orderItems
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          },
          shippingAddress: true
        }
      });
      try {
        await qiancaiDouService.debitQiancaiDou({
          userId: currentUser.id,
          amount: totalCost,
          reason: "PRODUCT_REDEMPTION",
          description: `\u8BA2\u5355 #${order.id} \u5546\u54C1\u8D2D\u4E70`,
          refTable: "orders",
          refId: order.id.toString()
        });
      } catch (balanceError) {
        await prisma.order.delete({ where: { id: order.id } });
        throw balanceError;
      }
      for (const item of cart.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
      });
      await prisma.cart.update({
        where: { id: cart.id },
        data: { itemsCount: 0 }
      });
      const result = order;
      return c.json({ code: 200, message: "Order created", data: result });
    } catch (error) {
      console.error("Create order from cart error:", error);
      return c.json({ code: 500, message: "Internal server error", data: null }, 500);
    }
  }, "createOrderFromCart");
  const payOrder = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const orderId = parseInt(c.req.param("id"));
      const order = await prisma.order.findFirst({
        where: { id: orderId, userId: currentUser.id },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
      if (!order) {
        return c.json({ code: 404, message: "Order not found", data: null }, 404);
      }
      if (order.status !== "PENDING") {
        return c.json({ code: 400, message: "Invalid order status", data: null }, 400);
      }
      await qiancaiDouService.debitQiancaiDou({
        userId: currentUser.id,
        amount: order.totalCost,
        reason: "PRODUCT_REDEMPTION",
        description: `\u8BA2\u5355 #${order.id} \u652F\u4ED8`,
        refTable: "orders",
        refId: order.id.toString()
      });
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          paidAt: /* @__PURE__ */ new Date()
        }
      });
      return c.json({ code: 200, message: "Order paid", data: updatedOrder });
    } catch (error) {
      console.error("Pay order error:", error);
      return c.json({ code: 500, message: "Internal server error", data: null }, 500);
    }
  }, "payOrder");
  const cancelOrder = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const orderId = parseInt(c.req.param("id"));
      const order = await prisma.order.findFirst({
        where: { id: orderId, userId: currentUser.id }
      });
      if (!order) {
        return c.json({ code: 404, message: "Order not found", data: null }, 404);
      }
      if (!["PENDING", "PAID"].includes(order.status)) {
        return c.json({ code: 400, message: "Cannot cancel order", data: null }, 400);
      }
      if (order.status === "PAID") {
        await qiancaiDouService.creditQiancaiDou({
          userId: currentUser.id,
          amount: order.totalCost,
          reason: "REFUND",
          description: `\u8BA2\u5355 #${order.id} \u9000\u6B3E`,
          refTable: "orders",
          refId: order.id.toString()
        });
        const items = await prisma.orderItem.findMany({
          where: { orderId: order.id }
        });
        for (const item of items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity
              }
            }
          });
        }
      }
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "CANCELLED",
          cancelledAt: /* @__PURE__ */ new Date()
        }
      });
      return c.json({ code: 200, message: "Order cancelled", data: updatedOrder });
    } catch (error) {
      console.error("Cancel order error:", error);
      return c.json({ code: 500, message: "Internal server error", data: null }, 500);
    }
  }, "cancelOrder");
  const confirmDelivery = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const orderId = parseInt(c.req.param("id"));
      const order = await prisma.order.findFirst({
        where: { id: orderId, userId: currentUser.id }
      });
      if (!order) {
        return c.json({ code: 404, message: "Order not found", data: null }, 404);
      }
      if (order.status !== "SHIPPED") {
        return c.json({ code: 400, message: "Order not shipped", data: null }, 400);
      }
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "DELIVERED",
          fulfilledAt: /* @__PURE__ */ new Date()
        }
      });
      return c.json({ code: 200, message: "Delivery confirmed", data: updatedOrder });
    } catch (error) {
      console.error("Confirm delivery error:", error);
      return c.json({ code: 500, message: "Internal server error", data: null }, 500);
    }
  }, "confirmDelivery");
  const getTracking = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const orderId = parseInt(c.req.param("id"));
      const order = await prisma.order.findFirst({
        where: { id: orderId, userId: currentUser.id },
        include: {
          shippingTracks: {
            orderBy: { timestamp: "desc" }
          },
          shipment: true
        }
      });
      if (!order) {
        return c.json({ code: 404, message: "Order not found", data: null }, 404);
      }
      return c.json({ code: 200, message: "Tracking retrieved", data: order });
    } catch (error) {
      console.error("Get tracking error:", error);
      return c.json({ code: 500, message: "Internal server error", data: null }, 500);
    }
  }, "getTracking");
  return {
    getOrders,
    getOrder,
    createOrderFromCart,
    payOrder,
    cancelOrder,
    confirmDelivery,
    getTracking
  };
}
__name(createOrderHandlers, "createOrderHandlers");

// src/handlers/products.handler.ts
function createProductHandlers(qiancaiDouService) {
  const getProducts = /* @__PURE__ */ __name(async (c) => {
    let prisma = null;
    try {
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        console.error("DATABASE_URL not configured in environment variables");
        return c.json({
          code: 500,
          message: "Database configuration error: DATABASE_URL not set",
          data: null
        }, 500);
      }
      prisma = getPrismaClient2(databaseUrl);
      const page = Math.max(1, parseInt(c.req.query("page") || "1"));
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query("limit") || "20")));
      const category = c.req.query("category");
      const offset = (page - 1) * limit;
      const where = {
        isActive: true,
        ...category && { category }
      };
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: offset,
          take: limit
        }),
        prisma.product.count({ where })
      ]);
      return c.json({
        code: 200,
        message: "Products retrieved successfully",
        data: {
          products,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error("Get products error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    } finally {
      if (prisma) {
        try {
        } catch (disconnectError) {
          console.error("Error disconnecting Prisma:", disconnectError);
        }
      }
    }
  }, "getProducts");
  const getProduct = /* @__PURE__ */ __name(async (c) => {
    let prisma = null;
    try {
      const productId = parseInt(c.req.param("id"));
      if (isNaN(productId)) {
        return c.json({
          code: 400,
          message: "Invalid product ID",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      prisma = getPrismaClient2(databaseUrl);
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
          isActive: true
        }
      });
      if (!product) {
        return c.json({
          code: 404,
          message: "Product not found",
          data: null
        }, 404);
      }
      return c.json({
        code: 200,
        message: "Product retrieved successfully",
        data: { product }
      });
    } catch (error) {
      console.error("Get product error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    } finally {
      if (prisma) {
        try {
        } catch (disconnectError) {
          console.error("Error disconnecting Prisma:", disconnectError);
        }
      }
    }
  }, "getProduct");
  const createOrder = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      if (!body.items || body.items.length === 0) {
        return c.json({
          code: 400,
          message: "Order items are required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const result = await prisma.$transaction(async (tx) => {
        const productIds = body.items.map((item) => item.productId);
        const products = await tx.product.findMany({
          where: {
            id: { in: productIds },
            isActive: true
          }
        });
        if (products.length !== productIds.length) {
          throw new Error("Some products not found or inactive");
        }
        let totalCost = 0;
        const orderItems = [];
        for (const item of body.items) {
          const product = products.find((p2) => p2.id === item.productId);
          if (!product) {
            throw new Error(`Product ${item.productId} not found`);
          }
          if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product.title}`);
          }
          const itemTotal = product.priceInQiancaiDou * item.quantity;
          totalCost += itemTotal;
          orderItems.push({
            productId: product.id,
            quantity: item.quantity,
            unitPrice: product.priceInQiancaiDou,
            totalPrice: itemTotal
          });
        }
        await qiancaiDouService.debitQiancaiDou({
          userId: currentUser.id,
          amount: totalCost,
          reason: "PRODUCT_REDEMPTION",
          description: `Order for ${body.items.length} items`,
          refTable: "orders"
        });
        const order = await tx.order.create({
          data: {
            userId: currentUser.id,
            totalCost,
            shippingAddressId: body.shippingAddressId,
            note: body.note,
            items: {
              create: orderItems
            }
          },
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        });
        for (const item of body.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          });
        }
        return order;
      });
      return c.json({
        code: 200,
        message: "Order created successfully",
        data: { order: result }
      });
    } catch (error) {
      console.error("Create order error:", error);
      if (error instanceof Error) {
        if (error.message.includes("Insufficient")) {
          return c.json({
            code: 400,
            message: error.message,
            data: null
          }, 400);
        }
      }
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "createOrder");
  const getUserOrders = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const page = Math.max(1, parseInt(c.req.query("page") || "1"));
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query("limit") || "10")));
      const offset = (page - 1) * limit;
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where: { userId: currentUser.id },
          include: {
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    title: true,
                    images: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: "desc" },
          skip: offset,
          take: limit
        }),
        prisma.order.count({
          where: { userId: currentUser.id }
        })
      ]);
      return c.json({
        code: 200,
        message: "Orders retrieved successfully",
        data: {
          orders,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error("Get user orders error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getUserOrders");
  return {
    getProducts,
    getProduct,
    createOrder,
    getUserOrders
  };
}
__name(createProductHandlers, "createProductHandlers");

// src/handlers/seed.handler.ts
function createSeedHandlers() {
  const seedProducts = /* @__PURE__ */ __name(async (c) => {
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const environment = c.env?.ENVIRONMENT || "development";
    const force = c.req.query("force") === "1";
    const seedToken = c.req.header("X-Seed-Token");
    const envSeedToken = c.env?.SEED_TOKEN;
    let dbTokenOk = false;
    if (seedToken) {
      const databaseToken = await prisma.appSetting.findUnique({ where: { key: "SEED_TOKEN" } }).catch(() => null);
      if (databaseToken && databaseToken.value === seedToken) dbTokenOk = true;
    }
    const tokenOk = Boolean(seedToken && (envSeedToken === seedToken || dbTokenOk));
    if (environment === "production" && !force && !tokenOk) {
      return c.json({ code: 403, message: "Seeding disabled in production (use ?force=1 or X-Seed-Token)", data: null }, 403);
    }
    const categories = [
      {
        key: "electronics",
        products: [
          {
            title: "\u65E0\u7EBF\u84DD\u7259\u8033\u673A Pro",
            description: "\u964D\u566A | \u7EED\u822A 24h | \u4F4E\u5EF6\u8FDF",
            images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop"],
            priceInQiancaiDou: 1299,
            stock: 50
          },
          {
            title: "\u667A\u80FD\u624B\u8868 S1",
            description: "\u5FC3\u7387\u76D1\u6D4B | 50m \u9632\u6C34 | NFC",
            images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop"],
            priceInQiancaiDou: 2199,
            stock: 30
          }
        ]
      },
      {
        key: "clothing",
        products: [
          {
            title: "\u57CE\u5E02\u673A\u80FD\u98CE\u5939\u514B",
            description: "\u8F7B\u91CF\u9632\u6C34 | \u900F\u6C14\u9762\u6599",
            images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop"],
            priceInQiancaiDou: 899,
            stock: 40
          }
        ]
      },
      {
        key: "food",
        products: [
          {
            title: "\u7CBE\u54C1\u5496\u5561\u8C46 500g",
            description: "\u4EA7\u5730\u62FC\u914D | \u4E2D\u5EA6\u70D8\u7119",
            images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&auto=format&fit=crop"],
            priceInQiancaiDou: 199,
            stock: 100
          }
        ]
      },
      {
        key: "books",
        products: [
          {
            title: "\u4ECE 0 \u5230 1\uFF1A\u5F00\u542F\u5546\u4E1A\u4E0E\u672A\u6765\u7684\u79D8\u5BC6",
            description: "Peter Thiel \u8457 | \u521B\u4E1A\u7ECF\u5178",
            images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"],
            priceInQiancaiDou: 79,
            stock: 60
          }
        ]
      },
      {
        key: "sports",
        products: [
          {
            title: "\u8F7B\u91CF\u8DD1\u6B65\u978B",
            description: "\u7F13\u9707\u652F\u6491 | \u900F\u6C14\u7F51\u9762",
            images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop"],
            priceInQiancaiDou: 699,
            stock: 35
          }
        ]
      }
    ];
    let created = 0;
    for (const cat of categories) {
      const count = await prisma.product.count({ where: { category: cat.key, isActive: true } });
      if (count > 0) continue;
      for (const p2 of cat.products) {
        await prisma.product.create({
          data: {
            title: p2.title,
            description: p2.description,
            images: p2.images,
            priceInQiancaiDou: p2.priceInQiancaiDou,
            stock: p2.stock,
            category: cat.key,
            isActive: true
          }
        });
        created += 1;
      }
    }
    const total = await prisma.product.count({ where: { isActive: true } });
    return c.json({ code: 200, message: "Seeded", data: { created, total } });
  }, "seedProducts");
  const updateProductImages = /* @__PURE__ */ __name(async (c) => {
    const databaseUrl = c.env?.DATABASE_URL;
    const prisma = getPrismaClient2(databaseUrl);
    const environment = c.env?.ENVIRONMENT || "development";
    const force = c.req.query("force") === "1";
    const seedToken = c.req.header("X-Seed-Token");
    const envSeedToken = c.env?.SEED_TOKEN;
    let dbTokenOk = false;
    if (seedToken) {
      const databaseToken = await prisma.appSetting.findUnique({ where: { key: "SEED_TOKEN" } }).catch(() => null);
      if (databaseToken && databaseToken.value === seedToken) dbTokenOk = true;
    }
    const tokenOk = Boolean(seedToken && (envSeedToken === seedToken || dbTokenOk));
    if (environment === "production" && !force && !tokenOk) {
      return c.json({ code: 403, message: "Update disabled in production (use ?force=1 or X-Seed-Token)", data: null }, 403);
    }
    const updates = [
      {
        title: "\u57CE\u5E02\u673A\u80FD\u98CE\u5939\u514B",
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop"]
      },
      {
        title: "\u4ECE 0 \u5230 1\uFF1A\u5F00\u542F\u5546\u4E1A\u4E0E\u672A\u6765\u7684\u79D8\u5BC6",
        images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"]
      },
      {
        title: "\u8F7B\u91CF\u8DD1\u6B65\u978B",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop"]
      },
      {
        title: "\u667A\u80FD\u624B\u8868 S1",
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop"]
      },
      {
        title: "\u65E0\u7EBF\u84DD\u7259\u8033\u673A Pro",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop"]
      }
    ];
    let updated = 0;
    for (const update of updates) {
      await prisma.product.updateMany({
        where: { title: update.title },
        data: { images: update.images }
      });
      updated += 1;
    }
    return c.json({ code: 200, message: "Images updated", data: { updated } });
  }, "updateProductImages");
  return { seedProducts, updateProductImages };
}
__name(createSeedHandlers, "createSeedHandlers");

// src/handlers/travel_packages.handler.ts
function createTravelPackageHandlers() {
  const registerTravelPackage = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();
      if (!body.packageId || !body.title) {
        return c.json({
          code: 400,
          message: "Package ID and title are required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      let packageExists = null;
      if (!isNaN(parseInt(body.packageId))) {
        const result = await prisma.$queryRaw`
          SELECT * FROM travel_packages 
          WHERE id = ${parseInt(body.packageId)} AND is_active = true
        `;
        packageExists = Array.isArray(result) ? result[0] : result;
      }
      if (!packageExists) {
        const result = await prisma.$queryRaw`
          SELECT * FROM travel_packages 
          WHERE title = ${body.title} AND category = ${body.category} AND is_active = true
        `;
        packageExists = Array.isArray(result) ? result[0] : result;
      }
      if (!packageExists) {
        return c.json({
          code: 404,
          message: "Travel package not found",
          data: null
        }, 404);
      }
      const existingRegistrations = await prisma.$queryRaw`
        SELECT * FROM travel_registrations 
        WHERE user_id = ${currentUser.id} AND package_id = ${packageExists.id} AND status = 'REGISTERED'
      `;
      const existingRegistration = Array.isArray(existingRegistrations) ? existingRegistrations[0] : existingRegistrations;
      if (existingRegistration) {
        return c.json({
          code: 400,
          message: "Already registered for this travel package",
          data: null
        }, 400);
      }
      const registrationResult = await prisma.$queryRaw`
        INSERT INTO travel_registrations (user_id, package_id, title, subtitle, category, status, registered_at)
        VALUES (${currentUser.id}, ${packageExists.id}, ${body.title}, ${body.subtitle || null}, ${body.category}, 'REGISTERED', NOW())
        RETURNING *
      `;
      const registration = Array.isArray(registrationResult) ? registrationResult[0] : registrationResult;
      await prisma.$queryRaw`
        UPDATE travel_packages 
        SET current_participants = current_participants + 1, updated_at = NOW()
        WHERE id = ${packageExists.id}
      `;
      return c.json({
        code: 200,
        message: "Travel package registered successfully",
        data: {
          id: registration.id.toString(),
          // 返回注册记录ID
          packageId: packageExists.id.toString(),
          // 返回套餐ID
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: "travel",
          registeredAt: registration.registered_at ? new Date(registration.registered_at).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          icon: "map"
        }
      });
    } catch (error) {
      console.error("Register travel package error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "registerTravelPackage");
  const cancelTravelRegistration = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const registrationId = c.req.param("id");
      if (!registrationId) {
        return c.json({
          code: 400,
          message: "Registration ID is required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const registrationResult = await prisma.$queryRaw`
        SELECT id, user_id, package_id, status
        FROM travel_registrations 
        WHERE id = ${parseInt(registrationId)} 
          AND user_id = ${currentUser.id} 
          AND status = 'REGISTERED'
      `;
      const registration = Array.isArray(registrationResult) ? registrationResult[0] : registrationResult;
      if (!registration) {
        return c.json({
          code: 404,
          message: "Travel registration not found",
          data: null
        }, 404);
      }
      await prisma.$queryRaw`
        UPDATE travel_registrations 
        SET status = 'CANCELLED' 
        WHERE id = ${registration.id}
      `;
      await prisma.$queryRaw`
        UPDATE travel_packages 
        SET current_participants = current_participants - 1 
        WHERE id = ${registration.package_id}
      `;
      return c.json({
        code: 200,
        message: "Travel registration cancelled successfully",
        data: null
      });
    } catch (error) {
      console.error("Cancel travel registration error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "cancelTravelRegistration");
  const deleteTravelRegistration = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const registrationId = c.req.param("id");
      if (!registrationId) {
        return c.json({
          code: 400,
          message: "Registration ID is required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const registrationResult = await prisma.$queryRaw`
        SELECT id, user_id, package_id, status
        FROM travel_registrations 
        WHERE id = ${parseInt(registrationId)} 
          AND user_id = ${currentUser.id} 
          AND status = 'REGISTERED'
      `;
      const registration = Array.isArray(registrationResult) ? registrationResult[0] : registrationResult;
      if (!registration) {
        return c.json({
          code: 404,
          message: "Travel registration not found",
          data: null
        }, 404);
      }
      await prisma.$queryRaw`
        DELETE FROM travel_registrations 
        WHERE id = ${registration.id}
      `;
      await prisma.$queryRaw`
        UPDATE travel_packages 
        SET current_participants = current_participants - 1 
        WHERE id = ${registration.package_id}
      `;
      return c.json({
        code: 200,
        message: "Travel registration deleted successfully",
        data: null
      });
    } catch (error) {
      console.error("Delete travel registration error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "deleteTravelRegistration");
  const getUserTravelRegistrations = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      console.log("Getting travel registrations for user:", currentUser.id);
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const registrations = await prisma.$queryRaw`
        SELECT 
          tr.id,
          tr.user_id,
          tr.package_id,
          tr.title,
          tr.subtitle,
          tr.category,
          tr.status,
          tr.registered_at,
          tp.title as package_title,
          tp.description as package_description,
          tp.category as package_category,
          tp.duration_days,
          tp.location,
          tp.image_url,
          tp.tags
        FROM travel_registrations tr
        LEFT JOIN travel_packages tp ON tr.package_id = tp.id
        WHERE tr.user_id = ${currentUser.id} 
          AND tr.status = 'REGISTERED'
        ORDER BY tr.registered_at DESC
      `;
      console.log("Raw SQL result:", registrations);
      const formattedRegistrations = Array.isArray(registrations) ? registrations.map((reg) => {
        return {
          id: reg.id,
          // 注册记录ID
          packageId: reg.package_id,
          // 套餐ID
          title: reg.title,
          subtitle: reg.subtitle,
          category: reg.category,
          status: reg.status,
          registeredAt: reg.registered_at ? new Date(reg.registered_at).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          package: {
            id: reg.package_id,
            title: reg.package_title,
            description: reg.package_description,
            category: reg.package_category,
            subcategory: null,
            durationDays: reg.duration_days,
            maxParticipants: 20,
            currentParticipants: 0,
            startDate: null,
            endDate: null,
            location: reg.location,
            imageUrl: reg.image_url,
            images: [],
            tags: reg.tags || [],
            isActive: true,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        };
      }) : [];
      console.log("Formatted registrations:", formattedRegistrations);
      return c.json({
        code: 200,
        message: "Travel registrations retrieved successfully",
        data: { registrations: formattedRegistrations }
      });
    } catch (error) {
      console.error("Get user travel registrations error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getUserTravelRegistrations");
  const getTravelPackages = /* @__PURE__ */ __name(async (c) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const category = c.req.query("category");
      const subcategory = c.req.query("subcategory");
      const page = Math.max(1, parseInt(c.req.query("page") || "1"));
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query("limit") || "20")));
      const offset = (page - 1) * limit;
      const where = {
        isActive: true,
        ...category && { category },
        ...subcategory && { subcategory }
      };
      const [packages, total] = await Promise.all([
        prisma.travelPackage.findMany({
          where,
          orderBy: [
            { createdAt: "desc" }
          ],
          skip: offset,
          take: limit
        }),
        prisma.travelPackage.count({ where })
      ]);
      return c.json({
        code: 200,
        message: "Travel packages retrieved successfully",
        data: {
          packages,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error("Get travel packages error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getTravelPackages");
  const getTravelPackage = /* @__PURE__ */ __name(async (c) => {
    try {
      const packageId = parseInt(c.req.param("id"));
      if (isNaN(packageId)) {
        return c.json({
          code: 400,
          message: "Invalid package ID",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const packageData = await prisma.travelPackage.findUnique({
        where: {
          id: packageId,
          isActive: true
        },
        include: {
          posts: {
            where: { isPublished: true },
            orderBy: { createdAt: "desc" }
          }
        }
      });
      if (!packageData) {
        return c.json({
          code: 404,
          message: "Travel package not found",
          data: null
        }, 404);
      }
      return c.json({
        code: 200,
        message: "Travel package retrieved successfully",
        data: { package: packageData }
      });
    } catch (error) {
      console.error("Get travel package error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getTravelPackage");
  const clearAllTravelRegistrations = /* @__PURE__ */ __name(async (c) => {
    try {
      const currentUser = c.get("user");
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      await prisma.travelRegistration.deleteMany({
        where: {
          userId: currentUser.id,
          status: "REGISTERED"
        }
      });
      return c.json({
        code: 200,
        message: "All travel registrations cleared successfully",
        data: null
      });
    } catch (error) {
      console.error("Clear all travel registrations error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "clearAllTravelRegistrations");
  return {
    registerTravelPackage,
    cancelTravelRegistration,
    deleteTravelRegistration,
    getUserTravelRegistrations,
    getTravelPackages,
    getTravelPackage,
    clearAllTravelRegistrations
  };
}
__name(createTravelPackageHandlers, "createTravelPackageHandlers");

// src/handlers/travel.handler.ts
function createTravelHandlers() {
  const getTravelPosts = /* @__PURE__ */ __name(async (c) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const page = Math.max(1, parseInt(c.req.query("page") || "1"));
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query("limit") || "20")));
      const category = c.req.query("category");
      const tag2 = c.req.query("tag");
      const offset = (page - 1) * limit;
      const where = {
        isPublished: true,
        ...category && { category },
        ...tag2 && {
          tags: {
            has: tag2
          }
        }
      };
      const [posts, total] = await Promise.all([
        prisma.travelPost.findMany({
          where,
          select: {
            id: true,
            title: true,
            summary: true,
            category: true,
            tags: true,
            imageUrl: true,
            author: true,
            viewCount: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: [
            { createdAt: "desc" }
          ],
          skip: offset,
          take: limit
        }),
        prisma.travelPost.count({ where })
      ]);
      return c.json({
        code: 200,
        message: "Travel posts retrieved successfully",
        data: {
          posts,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error("Get travel posts error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getTravelPosts");
  const getTravelPost = /* @__PURE__ */ __name(async (c) => {
    try {
      const postId = parseInt(c.req.param("id"));
      if (isNaN(postId)) {
        return c.json({
          code: 400,
          message: "Invalid post ID",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const [post] = await Promise.all([
        prisma.travelPost.findUnique({
          where: {
            id: postId,
            isPublished: true
          }
        }),
        // 异步增加浏览量
        prisma.travelPost.update({
          where: { id: postId },
          data: {
            viewCount: {
              increment: 1
            }
          }
        }).catch(() => {
        })
      ]);
      if (!post) {
        return c.json({
          code: 404,
          message: "Travel post not found",
          data: null
        }, 404);
      }
      return c.json({
        code: 200,
        message: "Travel post retrieved successfully",
        data: { post }
      });
    } catch (error) {
      console.error("Get travel post error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getTravelPost");
  const getPopularTags = /* @__PURE__ */ __name(async (c) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const posts = await prisma.travelPost.findMany({
        where: { isPublished: true },
        select: { tags: true }
      });
      const tagCounts = {};
      posts.forEach((post) => {
        post.tags.forEach((tag2) => {
          tagCounts[tag2] = (tagCounts[tag2] || 0) + 1;
        });
      });
      const popularTags = Object.entries(tagCounts).map(([tag2, count]) => ({ tag: tag2, count })).sort((a2, b2) => b2.count - a2.count).slice(0, 20);
      return c.json({
        code: 200,
        message: "Popular tags retrieved successfully",
        data: { tags: popularTags }
      });
    } catch (error) {
      console.error("Get popular tags error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "getPopularTags");
  const searchTravelPosts = /* @__PURE__ */ __name(async (c) => {
    try {
      const query = c.req.query("q");
      if (!query || query.trim().length === 0) {
        return c.json({
          code: 400,
          message: "Search query is required",
          data: null
        }, 400);
      }
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma = getPrismaClient2(databaseUrl);
      const page = Math.max(1, parseInt(c.req.query("page") || "1"));
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query("limit") || "20")));
      const offset = (page - 1) * limit;
      const searchCondition = {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive"
            }
          },
          {
            content: {
              contains: query,
              mode: "insensitive"
            }
          },
          {
            summary: {
              contains: query,
              mode: "insensitive"
            }
          }
        ],
        isPublished: true
      };
      const [posts, total] = await Promise.all([
        prisma.travelPost.findMany({
          where: searchCondition,
          select: {
            id: true,
            title: true,
            summary: true,
            category: true,
            tags: true,
            imageUrl: true,
            author: true,
            viewCount: true,
            createdAt: true
          },
          orderBy: [
            { viewCount: "desc" },
            { createdAt: "desc" }
          ],
          skip: offset,
          take: limit
        }),
        prisma.travelPost.count({ where: searchCondition })
      ]);
      return c.json({
        code: 200,
        message: "Search completed successfully",
        data: {
          posts,
          query,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error("Search travel posts error:", error);
      return c.json({
        code: 500,
        message: "Internal server error",
        data: null
      }, 500);
    }
  }, "searchTravelPosts");
  return {
    getTravelPosts,
    getTravelPost,
    getPopularTags,
    searchTravelPosts
  };
}
__name(createTravelHandlers, "createTravelHandlers");

// src/middleware/auth.middleware.ts
function createAuthMiddleware(authService) {
  return async (c, next) => {
    try {
      const authorization = c.req.header("Authorization");
      const token = authService.extractTokenFromHeader(authorization);
      if (!token) {
        return c.json({
          code: 401,
          message: "Authorization token required",
          data: null
        }, 401);
      }
      const payload = await authService.verifyToken(token);
      if (!payload) {
        return c.json({
          code: 401,
          message: "Invalid or expired token",
          data: null
        }, 401);
      }
      c.set("user", {
        id: payload.userId,
        email: payload.email
      });
      await next();
      return;
    } catch (error) {
      console.error("Auth middleware error:", error);
      return c.json({
        code: 500,
        message: "Authentication error",
        data: null
      }, 500);
    }
  };
}
__name(createAuthMiddleware, "createAuthMiddleware");
function corsMiddleware() {
  return async (c, next) => {
    const requestOrigin = c.req.header("Origin") || "";
    const allowOrigin = requestOrigin || "*";
    const requestedHeaders = c.req.header("Access-Control-Request-Headers");
    const allowHeaders = requestedHeaders && requestedHeaders.trim().length > 0 ? requestedHeaders : "Content-Type, Authorization";
    c.header("Access-Control-Allow-Origin", allowOrigin);
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    c.header("Access-Control-Allow-Headers", allowHeaders);
    c.header("Access-Control-Max-Age", "86400");
    c.header("Vary", "Origin");
    if (c.req.method === "OPTIONS") {
      return new Response("", {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": allowOrigin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": allowHeaders,
          "Access-Control-Max-Age": "86400"
        }
      });
    }
    await next();
    return;
  };
}
__name(corsMiddleware, "corsMiddleware");

// node_modules/jose/dist/browser/runtime/webcrypto.js
var webcrypto_default = crypto;
var isCryptoKey = /* @__PURE__ */ __name((key) => key instanceof CryptoKey, "isCryptoKey");

// node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}
__name(concat, "concat");

// node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64 = /* @__PURE__ */ __name((input) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder.encode(unencoded);
  }
  const CHUNK_SIZE = 32768;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(""));
}, "encodeBase64");
var encode = /* @__PURE__ */ __name((input) => {
  return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}, "encode");
var decodeBase64 = /* @__PURE__ */ __name((encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}, "decodeBase64");
var decode = /* @__PURE__ */ __name((input) => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}, "decode");

// node_modules/jose/dist/browser/util/errors.js
var JOSEError = class extends Error {
  static {
    __name(this, "JOSEError");
  }
  constructor(message2, options) {
    super(message2, options);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
JOSEError.code = "ERR_JOSE_GENERIC";
var JWTClaimValidationFailed = class extends JOSEError {
  static {
    __name(this, "JWTClaimValidationFailed");
  }
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
JWTClaimValidationFailed.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var JWTExpired = class extends JOSEError {
  static {
    __name(this, "JWTExpired");
  }
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.code = "ERR_JWT_EXPIRED";
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
};
JWTExpired.code = "ERR_JWT_EXPIRED";
var JOSEAlgNotAllowed = class extends JOSEError {
  static {
    __name(this, "JOSEAlgNotAllowed");
  }
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
JOSEAlgNotAllowed.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var JOSENotSupported = class extends JOSEError {
  static {
    __name(this, "JOSENotSupported");
  }
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
};
JOSENotSupported.code = "ERR_JOSE_NOT_SUPPORTED";
var JWEDecryptionFailed = class extends JOSEError {
  static {
    __name(this, "JWEDecryptionFailed");
  }
  constructor(message2 = "decryption operation failed", options) {
    super(message2, options);
    this.code = "ERR_JWE_DECRYPTION_FAILED";
  }
};
JWEDecryptionFailed.code = "ERR_JWE_DECRYPTION_FAILED";
var JWEInvalid = class extends JOSEError {
  static {
    __name(this, "JWEInvalid");
  }
  constructor() {
    super(...arguments);
    this.code = "ERR_JWE_INVALID";
  }
};
JWEInvalid.code = "ERR_JWE_INVALID";
var JWSInvalid = class extends JOSEError {
  static {
    __name(this, "JWSInvalid");
  }
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_INVALID";
  }
};
JWSInvalid.code = "ERR_JWS_INVALID";
var JWTInvalid = class extends JOSEError {
  static {
    __name(this, "JWTInvalid");
  }
  constructor() {
    super(...arguments);
    this.code = "ERR_JWT_INVALID";
  }
};
JWTInvalid.code = "ERR_JWT_INVALID";
var JWKInvalid = class extends JOSEError {
  static {
    __name(this, "JWKInvalid");
  }
  constructor() {
    super(...arguments);
    this.code = "ERR_JWK_INVALID";
  }
};
JWKInvalid.code = "ERR_JWK_INVALID";
var JWKSInvalid = class extends JOSEError {
  static {
    __name(this, "JWKSInvalid");
  }
  constructor() {
    super(...arguments);
    this.code = "ERR_JWKS_INVALID";
  }
};
JWKSInvalid.code = "ERR_JWKS_INVALID";
var JWKSNoMatchingKey = class extends JOSEError {
  static {
    __name(this, "JWKSNoMatchingKey");
  }
  constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
    super(message2, options);
    this.code = "ERR_JWKS_NO_MATCHING_KEY";
  }
};
JWKSNoMatchingKey.code = "ERR_JWKS_NO_MATCHING_KEY";
var JWKSMultipleMatchingKeys = class extends JOSEError {
  static {
    __name(this, "JWKSMultipleMatchingKeys");
  }
  constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
    super(message2, options);
    this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
};
JWKSMultipleMatchingKeys.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var JWKSTimeout = class extends JOSEError {
  static {
    __name(this, "JWKSTimeout");
  }
  constructor(message2 = "request timed out", options) {
    super(message2, options);
    this.code = "ERR_JWKS_TIMEOUT";
  }
};
JWKSTimeout.code = "ERR_JWKS_TIMEOUT";
var JWSSignatureVerificationFailed = class extends JOSEError {
  static {
    __name(this, "JWSSignatureVerificationFailed");
  }
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
    this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
};
JWSSignatureVerificationFailed.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";

// node_modules/jose/dist/browser/lib/crypto_key.js
function unusable(name2, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name2}`);
}
__name(unusable, "unusable");
function isAlgorithm(algorithm, name2) {
  return algorithm.name === name2;
}
__name(isAlgorithm, "isAlgorithm");
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
__name(getHashLength, "getHashLength");
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
__name(getNamedCurve, "getNamedCurve");
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
__name(checkUsage, "checkUsage");
function checkSigCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
        throw unusable("Ed25519 or Ed448");
      }
      break;
    }
    case "Ed25519": {
      if (!isAlgorithm(key.algorithm, "Ed25519"))
        throw unusable("Ed25519");
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}
__name(checkSigCryptoKey, "checkSigCryptoKey");

// node_modules/jose/dist/browser/lib/invalid_key_input.js
function message(msg, actual, ...types2) {
  types2 = types2.filter(Boolean);
  if (types2.length > 2) {
    const last = types2.pop();
    msg += `one of type ${types2.join(", ")}, or ${last}.`;
  } else if (types2.length === 2) {
    msg += `one of type ${types2[0]} or ${types2[1]}.`;
  } else {
    msg += `of type ${types2[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
__name(message, "message");
var invalid_key_input_default = /* @__PURE__ */ __name((actual, ...types2) => {
  return message("Key must be ", actual, ...types2);
}, "default");
function withAlg(alg, actual, ...types2) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
}
__name(withAlg, "withAlg");

// node_modules/jose/dist/browser/runtime/is_key_like.js
var is_key_like_default = /* @__PURE__ */ __name((key) => {
  if (isCryptoKey(key)) {
    return true;
  }
  return key?.[Symbol.toStringTag] === "KeyObject";
}, "default");
var types = ["CryptoKey"];

// node_modules/jose/dist/browser/lib/is_disjoint.js
var isDisjoint = /* @__PURE__ */ __name((...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
}, "isDisjoint");
var is_disjoint_default = isDisjoint;

// node_modules/jose/dist/browser/lib/is_object.js
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
__name(isObjectLike, "isObjectLike");
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}
__name(isObject, "isObject");

// node_modules/jose/dist/browser/runtime/check_key_length.js
var check_key_length_default = /* @__PURE__ */ __name((alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
}, "default");

// node_modules/jose/dist/browser/lib/is_jwk.js
function isJWK(key) {
  return isObject(key) && typeof key.kty === "string";
}
__name(isJWK, "isJWK");
function isPrivateJWK(key) {
  return key.kty !== "oct" && typeof key.d === "string";
}
__name(isPrivateJWK, "isPrivateJWK");
function isPublicJWK(key) {
  return key.kty !== "oct" && typeof key.d === "undefined";
}
__name(isPublicJWK, "isPublicJWK");
function isSecretJWK(key) {
  return isJWK(key) && key.kty === "oct" && typeof key.k === "string";
}
__name(isSecretJWK, "isSecretJWK");

// node_modules/jose/dist/browser/runtime/jwk_to_key.js
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
          algorithm = { name: "ECDSA", namedCurve: "P-256" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          algorithm = { name: "ECDSA", namedCurve: "P-384" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          algorithm = { name: "ECDSA", namedCurve: "P-521" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "Ed25519":
          algorithm = { name: "Ed25519" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "EdDSA":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
__name(subtleMapping, "subtleMapping");
var parse = /* @__PURE__ */ __name(async (jwk) => {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const rest = [
    algorithm,
    jwk.ext ?? false,
    jwk.key_ops ?? keyUsages
  ];
  const keyData = { ...jwk };
  delete keyData.alg;
  delete keyData.use;
  return webcrypto_default.subtle.importKey("jwk", keyData, ...rest);
}, "parse");
var jwk_to_key_default = parse;

// node_modules/jose/dist/browser/runtime/normalize_key.js
var exportKeyValue = /* @__PURE__ */ __name((k) => decode(k), "exportKeyValue");
var privCache;
var pubCache;
var isKeyObject = /* @__PURE__ */ __name((key) => {
  return key?.[Symbol.toStringTag] === "KeyObject";
}, "isKeyObject");
var importAndCache = /* @__PURE__ */ __name(async (cache, key, jwk, alg, freeze = false) => {
  let cached = cache.get(key);
  if (cached?.[alg]) {
    return cached[alg];
  }
  const cryptoKey = await jwk_to_key_default({ ...jwk, alg });
  if (freeze)
    Object.freeze(key);
  if (!cached) {
    cache.set(key, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
}, "importAndCache");
var normalizePublicKey = /* @__PURE__ */ __name((key, alg) => {
  if (isKeyObject(key)) {
    let jwk = key.export({ format: "jwk" });
    delete jwk.d;
    delete jwk.dp;
    delete jwk.dq;
    delete jwk.p;
    delete jwk.q;
    delete jwk.qi;
    if (jwk.k) {
      return exportKeyValue(jwk.k);
    }
    pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
    return importAndCache(pubCache, key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k)
      return decode(key.k);
    pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
    const cryptoKey = importAndCache(pubCache, key, key, alg, true);
    return cryptoKey;
  }
  return key;
}, "normalizePublicKey");
var normalizePrivateKey = /* @__PURE__ */ __name((key, alg) => {
  if (isKeyObject(key)) {
    let jwk = key.export({ format: "jwk" });
    if (jwk.k) {
      return exportKeyValue(jwk.k);
    }
    privCache || (privCache = /* @__PURE__ */ new WeakMap());
    return importAndCache(privCache, key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k)
      return decode(key.k);
    privCache || (privCache = /* @__PURE__ */ new WeakMap());
    const cryptoKey = importAndCache(privCache, key, key, alg, true);
    return cryptoKey;
  }
  return key;
}, "normalizePrivateKey");
var normalize_key_default = { normalizePublicKey, normalizePrivateKey };

// node_modules/jose/dist/browser/key/import.js
async function importJWK(jwk, alg) {
  if (!isObject(jwk)) {
    throw new TypeError("JWK must be an object");
  }
  alg || (alg = jwk.alg);
  switch (jwk.kty) {
    case "oct":
      if (typeof jwk.k !== "string" || !jwk.k) {
        throw new TypeError('missing "k" (Key Value) Parameter value');
      }
      return decode(jwk.k);
    case "RSA":
      if ("oth" in jwk && jwk.oth !== void 0) {
        throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
      }
    case "EC":
    case "OKP":
      return jwk_to_key_default({ ...jwk, alg });
    default:
      throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
  }
}
__name(importJWK, "importJWK");

// node_modules/jose/dist/browser/lib/check_key_type.js
var tag = /* @__PURE__ */ __name((key) => key?.[Symbol.toStringTag], "tag");
var jwkMatchesOp = /* @__PURE__ */ __name((alg, key, usage) => {
  if (key.use !== void 0 && key.use !== "sig") {
    throw new TypeError("Invalid key for this operation, when present its use must be sig");
  }
  if (key.key_ops !== void 0 && key.key_ops.includes?.(usage) !== true) {
    throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
  }
  if (key.alg !== void 0 && key.alg !== alg) {
    throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
  }
  return true;
}, "jwkMatchesOp");
var symmetricTypeCheck = /* @__PURE__ */ __name((alg, key, usage, allowJwk) => {
  if (key instanceof Uint8Array)
    return;
  if (allowJwk && isJWK(key)) {
    if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
      return;
    throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
  }
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, "Uint8Array", allowJwk ? "JSON Web Key" : null));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
  }
}, "symmetricTypeCheck");
var asymmetricTypeCheck = /* @__PURE__ */ __name((alg, key, usage, allowJwk) => {
  if (allowJwk && isJWK(key)) {
    switch (usage) {
      case "sign":
        if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a private JWK`);
      case "verify":
        if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a public JWK`);
    }
  }
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, allowJwk ? "JSON Web Key" : null));
  }
  if (key.type === "secret") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === "sign" && key.type === "public") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === "decrypt" && key.type === "public") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === "verify" && key.type === "private") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === "encrypt" && key.type === "private") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
  }
}, "asymmetricTypeCheck");
function checkKeyType(allowJwk, alg, key, usage) {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key, usage, allowJwk);
  } else {
    asymmetricTypeCheck(alg, key, usage, allowJwk);
  }
}
__name(checkKeyType, "checkKeyType");
var check_key_type_default = checkKeyType.bind(void 0, false);
var checkKeyTypeWithJwk = checkKeyType.bind(void 0, true);

// node_modules/jose/dist/browser/lib/validate_crit.js
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
__name(validateCrit, "validateCrit");
var validate_crit_default = validateCrit;

// node_modules/jose/dist/browser/lib/validate_algorithms.js
var validateAlgorithms = /* @__PURE__ */ __name((option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
}, "validateAlgorithms");
var validate_algorithms_default = validateAlgorithms;

// node_modules/jose/dist/browser/runtime/subtle_dsa.js
function subtleDsa(alg, algorithm) {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "Ed25519":
      return { name: "Ed25519" };
    case "EdDSA":
      return { name: algorithm.name };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}
__name(subtleDsa, "subtleDsa");

// node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
async function getCryptoKey(alg, key, usage) {
  if (usage === "sign") {
    key = await normalize_key_default.normalizePrivateKey(key, alg);
  }
  if (usage === "verify") {
    key = await normalize_key_default.normalizePublicKey(key, alg);
  }
  if (isCryptoKey(key)) {
    checkSigCryptoKey(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalid_key_input_default(key, ...types));
    }
    return webcrypto_default.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array", "JSON Web Key"));
}
__name(getCryptoKey, "getCryptoKey");

// node_modules/jose/dist/browser/runtime/verify.js
var verify = /* @__PURE__ */ __name(async (alg, key, signature, data) => {
  const cryptoKey = await getCryptoKey(alg, key, "verify");
  check_key_length_default(alg, cryptoKey);
  const algorithm = subtleDsa(alg, cryptoKey.algorithm);
  try {
    return await webcrypto_default.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
}, "verify");
var verify_default = verify;

// node_modules/jose/dist/browser/jws/flattened/verify.js
async function flattenedVerify(jws, key, options) {
  if (!isObject(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !isObject(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!is_disjoint_default(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jws.header
  };
  const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
    checkKeyTypeWithJwk(alg, key, "verify");
    if (isJWK(key)) {
      key = await importJWK(key, alg);
    }
  } else {
    checkKeyTypeWithJwk(alg, key, "verify");
  }
  const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
  let signature;
  try {
    signature = decode(jws.signature);
  } catch {
    throw new JWSInvalid("Failed to base64url decode the signature");
  }
  const verified = await verify_default(alg, key, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    try {
      payload = decode(jws.payload);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the payload");
    }
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result = { payload };
  if (jws.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return { ...result, key };
  }
  return result;
}
__name(flattenedVerify, "flattenedVerify");

// node_modules/jose/dist/browser/jws/compact/verify.js
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}
__name(compactVerify, "compactVerify");

// node_modules/jose/dist/browser/lib/epoch.js
var epoch_default = /* @__PURE__ */ __name((date) => Math.floor(date.getTime() / 1e3), "default");

// node_modules/jose/dist/browser/lib/secs.js
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var secs_default = /* @__PURE__ */ __name((str) => {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
}, "default");

// node_modules/jose/dist/browser/lib/jwt_claims_set.js
var normalizeTyp = /* @__PURE__ */ __name((value) => value.toLowerCase().replace(/^application\//, ""), "normalizeTyp");
var checkAudiencePresence = /* @__PURE__ */ __name((audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
}, "checkAudiencePresence");
var jwt_claims_set_default = /* @__PURE__ */ __name((protectedHeader, encodedPayload, options = {}) => {
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs_default(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch_default(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
    }
  }
  return payload;
}, "default");

// node_modules/jose/dist/browser/jwt/verify.js
async function jwtVerify(jwt, key, options) {
  const verified = await compactVerify(jwt, key, options);
  if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = jwt_claims_set_default(verified.protectedHeader, verified.payload, options);
  const result = { payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}
__name(jwtVerify, "jwtVerify");

// node_modules/jose/dist/browser/runtime/sign.js
var sign = /* @__PURE__ */ __name(async (alg, key, data) => {
  const cryptoKey = await getCryptoKey(alg, key, "sign");
  check_key_length_default(alg, cryptoKey);
  const signature = await webcrypto_default.subtle.sign(subtleDsa(alg, cryptoKey.algorithm), cryptoKey, data);
  return new Uint8Array(signature);
}, "sign");
var sign_default = sign;

// node_modules/jose/dist/browser/jws/flattened/sign.js
var FlattenedSign = class {
  static {
    __name(this, "FlattenedSign");
  }
  constructor(payload) {
    if (!(payload instanceof Uint8Array)) {
      throw new TypeError("payload must be an instance of Uint8Array");
    }
    this._payload = payload;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this._unprotectedHeader = unprotectedHeader;
    return this;
  }
  async sign(key, options) {
    if (!this._protectedHeader && !this._unprotectedHeader) {
      throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
    }
    if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...this._protectedHeader,
      ...this._unprotectedHeader
    };
    const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, this._protectedHeader, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
      b64 = this._protectedHeader.b64;
      if (typeof b64 !== "boolean") {
        throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    checkKeyTypeWithJwk(alg, key, "sign");
    let payload = this._payload;
    if (b64) {
      payload = encoder.encode(encode(payload));
    }
    let protectedHeader;
    if (this._protectedHeader) {
      protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
    } else {
      protectedHeader = encoder.encode("");
    }
    const data = concat(protectedHeader, encoder.encode("."), payload);
    const signature = await sign_default(alg, key, data);
    const jws = {
      signature: encode(signature),
      payload: ""
    };
    if (b64) {
      jws.payload = decoder.decode(payload);
    }
    if (this._unprotectedHeader) {
      jws.header = this._unprotectedHeader;
    }
    if (this._protectedHeader) {
      jws.protected = decoder.decode(protectedHeader);
    }
    return jws;
  }
};

// node_modules/jose/dist/browser/jws/compact/sign.js
var CompactSign = class {
  static {
    __name(this, "CompactSign");
  }
  constructor(payload) {
    this._flattened = new FlattenedSign(payload);
  }
  setProtectedHeader(protectedHeader) {
    this._flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  async sign(key, options) {
    const jws = await this._flattened.sign(key, options);
    if (jws.payload === void 0) {
      throw new TypeError("use the flattened module for creating JWS with b64: false");
    }
    return `${jws.protected}.${jws.payload}.${jws.signature}`;
  }
};

// node_modules/jose/dist/browser/jwt/produce.js
function validateInput(label, input) {
  if (!Number.isFinite(input)) {
    throw new TypeError(`Invalid ${label} input`);
  }
  return input;
}
__name(validateInput, "validateInput");
var ProduceJWT = class {
  static {
    __name(this, "ProduceJWT");
  }
  constructor(payload = {}) {
    if (!isObject(payload)) {
      throw new TypeError("JWT Claims Set MUST be an object");
    }
    this._payload = payload;
  }
  setIssuer(issuer) {
    this._payload = { ...this._payload, iss: issuer };
    return this;
  }
  setSubject(subject) {
    this._payload = { ...this._payload, sub: subject };
    return this;
  }
  setAudience(audience) {
    this._payload = { ...this._payload, aud: audience };
    return this;
  }
  setJti(jwtId) {
    this._payload = { ...this._payload, jti: jwtId };
    return this;
  }
  setNotBefore(input) {
    if (typeof input === "number") {
      this._payload = { ...this._payload, nbf: validateInput("setNotBefore", input) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, nbf: validateInput("setNotBefore", epoch_default(input)) };
    } else {
      this._payload = { ...this._payload, nbf: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) };
    }
    return this;
  }
  setExpirationTime(input) {
    if (typeof input === "number") {
      this._payload = { ...this._payload, exp: validateInput("setExpirationTime", input) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, exp: validateInput("setExpirationTime", epoch_default(input)) };
    } else {
      this._payload = { ...this._payload, exp: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) };
    }
    return this;
  }
  setIssuedAt(input) {
    if (typeof input === "undefined") {
      this._payload = { ...this._payload, iat: epoch_default(/* @__PURE__ */ new Date()) };
    } else if (input instanceof Date) {
      this._payload = { ...this._payload, iat: validateInput("setIssuedAt", epoch_default(input)) };
    } else if (typeof input === "string") {
      this._payload = {
        ...this._payload,
        iat: validateInput("setIssuedAt", epoch_default(/* @__PURE__ */ new Date()) + secs_default(input))
      };
    } else {
      this._payload = { ...this._payload, iat: validateInput("setIssuedAt", input) };
    }
    return this;
  }
};

// node_modules/jose/dist/browser/jwt/sign.js
var SignJWT = class extends ProduceJWT {
  static {
    __name(this, "SignJWT");
  }
  setProtectedHeader(protectedHeader) {
    this._protectedHeader = protectedHeader;
    return this;
  }
  async sign(key, options) {
    const sig = new CompactSign(encoder.encode(JSON.stringify(this._payload)));
    sig.setProtectedHeader(this._protectedHeader);
    if (Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === false) {
      throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    return sig.sign(key, options);
  }
};

// src/services/auth.ts
function hexToU8a(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}
__name(hexToU8a, "hexToU8a");
function u8aToHex(bytes) {
  return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
}
__name(u8aToHex, "u8aToHex");
var AuthService = class {
  static {
    __name(this, "AuthService");
  }
  jwtSecret;
  constructor(jwtSecret) {
    this.jwtSecret = new TextEncoder().encode(jwtSecret);
  }
  /**
   * Hashes a password using the Web Crypto API (PBKDF2).
   * @returns A string containing salt and hash, separated by a colon.
   */
  async hashPassword(password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const importedKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: 1e5,
        hash: "SHA-256"
      },
      importedKey,
      256
    );
    const hash = new Uint8Array(hashBuffer);
    return `${u8aToHex(salt)}:${u8aToHex(hash)}`;
  }
  /**
   * Verifies a password against a stored salted hash.
   */
  async verifyPassword(password, storedHash) {
    const [saltHex, hashHex] = storedHash.split(":");
    if (!saltHex || !hashHex) {
      return false;
    }
    const salt = hexToU8a(saltHex);
    const storedHashBytes = hexToU8a(hashHex);
    const importedKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const derivedBuffer = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: 1e5,
        hash: "SHA-256"
      },
      importedKey,
      256
    );
    const derivedBytes = new Uint8Array(derivedBuffer);
    if (storedHashBytes.length !== derivedBytes.length) return false;
    let diff = 0;
    for (let i = 0; i < storedHashBytes.length; i++) {
      diff |= storedHashBytes[i] ^ derivedBytes[i];
    }
    return diff === 0;
  }
  /**
   * Generates a JWT Token using 'jose'.
   */
  async generateToken(payload) {
    return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuer("qianfu-jicai").setIssuedAt().setExpirationTime("7d").sign(this.jwtSecret);
  }
  /**
   * Verifies a JWT Token using 'jose'.
   */
  async verifyToken(token) {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecret, {
        issuer: "qianfu-jicai"
      });
      return payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }
  /**
   * Extracts token from an "Authorization: Bearer <token>" header.
   */
  extractTokenFromHeader(authorization) {
    if (!authorization) return null;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) return null;
    return token;
  }
};

// src/services/qiancaidou.ts
var QiancaiDouService = class {
  constructor(prisma) {
    this.prisma = prisma;
  }
  static {
    __name(this, "QiancaiDouService");
  }
  /**
   * 获取用户千彩豆余额
   */
  async getBalance(userId, tx) {
    const db = tx || this.prisma;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { qiancaiDouBalance: true }
    });
    return user?.qiancaiDouBalance ?? 0;
  }
  /**
   * 增加千彩豆
   */
  async creditQiancaiDou(transaction, tx) {
    const db = tx || this.prisma;
    if (transaction.amount <= 0) {
      throw new Error("Credit amount must be positive");
    }
    const user = await db.user.findUnique({
      where: { id: transaction.userId },
      select: { qiancaiDouBalance: true }
    });
    if (!user) {
      throw new Error("User not found");
    }
    const newBalance = user.qiancaiDouBalance + transaction.amount;
    await db.user.update({
      where: { id: transaction.userId },
      data: { qiancaiDouBalance: newBalance }
    });
    await db.qiancaiDouTransaction.create({
      data: {
        userId: transaction.userId,
        amount: transaction.amount,
        newBalance,
        reason: transaction.reason,
        description: transaction.description,
        refTable: transaction.refTable,
        refId: transaction.refId
      }
    });
    return newBalance;
  }
  /**
   * 扣除千彩豆
   */
  async debitQiancaiDou(transaction, tx) {
    const db = tx || this.prisma;
    if (transaction.amount <= 0) {
      throw new Error("Debit amount must be positive");
    }
    const user = await db.user.findUnique({
      where: { id: transaction.userId },
      select: { qiancaiDouBalance: true }
    });
    if (!user) {
      throw new Error("User not found");
    }
    const newBalance = user.qiancaiDouBalance - transaction.amount;
    if (newBalance < 0) {
      throw new Error("Insufficient QiancaiDou balance");
    }
    await db.user.update({
      where: { id: transaction.userId },
      data: { qiancaiDouBalance: newBalance }
    });
    await db.qiancaiDouTransaction.create({
      data: {
        userId: transaction.userId,
        amount: -transaction.amount,
        newBalance,
        reason: transaction.reason,
        description: transaction.description,
        refTable: transaction.refTable,
        refId: transaction.refId
      }
    });
    return newBalance;
  }
  /**
   * 获取用户交易历史
   */
  async getTransactionHistory(userId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
      this.prisma.qiancaiDouTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit
      }),
      this.prisma.qiancaiDouTransaction.count({
        where: { userId }
      })
    ]);
    return {
      transactions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
  /**
   * 管理员调整用户余额
   */
  async adminAdjustBalance(userId, newBalance, description = "Admin adjustment") {
    const currentBalance = await this.getBalance(userId);
    const amount = newBalance - currentBalance;
    if (amount === 0) {
      return currentBalance;
    }
    if (amount > 0) {
      return await this.creditQiancaiDou({
        userId,
        amount,
        reason: "ADMIN_ADJUSTMENT",
        description
      });
    } else {
      return await this.debitQiancaiDou({
        userId,
        amount: Math.abs(amount),
        reason: "ADMIN_ADJUSTMENT",
        description
      });
    }
  }
};

// src/app.ts
var app = new Hono2();
app.use("*", corsMiddleware());
app.get("/api/health", (c) => {
  return c.json({
    code: 200,
    message: "API is healthy",
    data: {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: c.env?.ENVIRONMENT || "development"
    }
  });
});
app.get("/api/diag", async (c) => {
  try {
    const env = c.env || {};
    const databaseUrl = env["DATABASE_URL"];
    const jwtSecret = env["JWT_SECRET"];
    const result = {
      environment: c.env?.ENVIRONMENT || "development",
      hasDatabaseUrl: Boolean(databaseUrl),
      hasJwtSecret: Boolean(jwtSecret),
      envKeys: Object.keys(env),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    return c.json({ code: 200, message: "Diagnostic completed", data: result });
  } catch (error) {
    console.error("Diagnostic endpoint error:", error);
    return c.json({
      code: 500,
      message: "Diagnostic failed",
      data: {
        error: String(error),
        environment: c.env?.ENVIRONMENT || "development"
      }
    }, 500);
  }
});
function initializeServices(c) {
  const databaseUrl = c.env?.DATABASE_URL;
  const jwtSecret = c.env?.JWT_SECRET;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  const prisma = getPrismaClient2(databaseUrl);
  const authService = new AuthService(jwtSecret);
  const qiancaiDouService = new QiancaiDouService(prisma);
  const authMiddleware = createAuthMiddleware(authService);
  return {
    authService,
    qiancaiDouService,
    authMiddleware,
    prisma
  };
}
__name(initializeServices, "initializeServices");
app.post("/api/auth/register", async (c) => {
  const { authService, qiancaiDouService } = initializeServices(c);
  const handlers = createAuthHandlers(authService, qiancaiDouService);
  return handlers.register(c);
});
app.post("/api/auth/login", async (c) => {
  const { authService, qiancaiDouService } = initializeServices(c);
  const handlers = createAuthHandlers(authService, qiancaiDouService);
  return handlers.login(c);
});
app.get("/api/me", async (c) => {
  const { authService, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAuthHandlers(authService, qiancaiDouService);
  return handlers.getMe(c);
});
app.patch("/api/me", async (c) => {
  const { authService, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAuthHandlers(authService, qiancaiDouService);
  return handlers.updateProfile(c);
});
app.post("/api/me/avatar", async (c) => {
  const { authService, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAuthHandlers(authService, qiancaiDouService);
  return handlers.uploadAvatar(c);
});
app.get("/api/products", async (c) => {
  const { qiancaiDouService } = initializeServices(c);
  const handlers = createProductHandlers(qiancaiDouService);
  return handlers.getProducts(c);
});
app.get("/api/products/:id", async (c) => {
  const { qiancaiDouService } = initializeServices(c);
  const handlers = createProductHandlers(qiancaiDouService);
  return handlers.getProduct(c);
});
app.post("/api/orders", async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createProductHandlers(qiancaiDouService);
  return handlers.createOrder(c);
});
app.get("/api/me/orders", async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createProductHandlers(qiancaiDouService);
  return handlers.getUserOrders(c);
});
app.get("/api/account", async (c) => {
  const { authMiddleware, qiancaiDouService } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAccountHandlers(qiancaiDouService);
  return handlers.getAccount(c);
});
app.post("/api/qiancaidou/grant", async (c) => {
  const { authMiddleware, qiancaiDouService } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAccountHandlers(qiancaiDouService);
  return handlers.grantQiancaiDou(c);
});
app.get("/api/cart", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createCartHandlers();
  return handlers.getCart(c);
});
app.post("/api/cart/items", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createCartHandlers();
  return handlers.addItem(c);
});
app.patch("/api/cart/items/:itemId", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createCartHandlers();
  return handlers.updateItem(c);
});
app.delete("/api/cart/items/:itemId", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createCartHandlers();
  return handlers.removeItem(c);
});
app.post("/api/checkout/preview", async (c) => {
  const { authMiddleware, qiancaiDouService } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createCheckoutHandlers(qiancaiDouService);
  return handlers.preview(c);
});
app.get("/api/courses", async (c) => {
  const { qiancaiDouService } = initializeServices(c);
  const handlers = createAppointmentHandlers(qiancaiDouService);
  return handlers.getCourses(c);
});
app.get("/api/courses/:id/schedules", async (c) => {
  const { qiancaiDouService } = initializeServices(c);
  const handlers = createAppointmentHandlers(qiancaiDouService);
  return handlers.getCourseSchedules(c);
});
app.post("/api/appointments", async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAppointmentHandlers(qiancaiDouService);
  return handlers.createAppointment(c);
});
app.get("/api/me/appointments", async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAppointmentHandlers(qiancaiDouService);
  return handlers.getUserAppointments(c);
});
app.patch("/api/appointments/:id/cancel", async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAppointmentHandlers(qiancaiDouService);
  return handlers.cancelAppointment(c);
});
app.post("/api/learning/courses/register", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createLearningHandlers();
  return handlers.registerCourse(c);
});
app.post("/api/learning/study-abroad/register", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createLearningHandlers();
  return handlers.registerStudyAbroadService(c);
});
app.post("/api/learning/summer-camps/register", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createLearningHandlers();
  return handlers.registerSummerCamp(c);
});
app.delete("/api/learning/:type/cancel/:id", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createLearningHandlers();
  return handlers.cancelRegistration(c);
});
app.delete("/api/learning/:type/delete/:id", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createLearningHandlers();
  return handlers.deleteRegistration(c);
});
app.get("/api/learning/registrations", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createLearningHandlers();
  return handlers.getUserLearningRegistrations(c);
});
app.delete("/api/learning/registrations/clear", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createLearningHandlers();
  return handlers.clearAllLearningRegistrations(c);
});
app.get("/api/travel/posts", async (c) => {
  const handlers = createTravelHandlers();
  return handlers.getTravelPosts(c);
});
app.get("/api/travel/posts/:id", async (c) => {
  const handlers = createTravelHandlers();
  return handlers.getTravelPost(c);
});
app.get("/api/travel/tags", async (c) => {
  const handlers = createTravelHandlers();
  return handlers.getPopularTags(c);
});
app.get("/api/travel/search", async (c) => {
  const handlers = createTravelHandlers();
  return handlers.searchTravelPosts(c);
});
app.get("/api/travel/packages", async (c) => {
  const handlers = createTravelPackageHandlers();
  return handlers.getTravelPackages(c);
});
app.get("/api/travel/packages/:id", async (c) => {
  const handlers = createTravelPackageHandlers();
  return handlers.getTravelPackage(c);
});
app.post("/api/travel/packages/register", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createTravelPackageHandlers();
  return handlers.registerTravelPackage(c);
});
app.delete("/api/travel/registrations/:id", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createTravelPackageHandlers();
  return handlers.cancelTravelRegistration(c);
});
app.delete("/api/travel/registrations/:id/delete", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createTravelPackageHandlers();
  return handlers.deleteTravelRegistration(c);
});
app.get("/api/travel/registrations", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createTravelPackageHandlers();
  return handlers.getUserTravelRegistrations(c);
});
app.delete("/api/travel/registrations/clear", async (c) => {
  const { authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createTravelPackageHandlers();
  return handlers.clearAllTravelRegistrations(c);
});
app.post("/api/dev/seed-products", async (c) => {
  const handlers = createSeedHandlers();
  return handlers.seedProducts(c);
});
app.post("/api/dev/update-product-images", async (c) => {
  const handlers = createSeedHandlers();
  return handlers.updateProductImages(c);
});
app.get("/api/addresses", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAddressHandlers(prisma);
  return handlers.getAddresses(c);
});
app.post("/api/addresses", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAddressHandlers(prisma);
  return handlers.createAddress(c);
});
app.put("/api/addresses/:id", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAddressHandlers(prisma);
  return handlers.updateAddress(c);
});
app.delete("/api/addresses/:id", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAddressHandlers(prisma);
  return handlers.deleteAddress(c);
});
app.put("/api/addresses/:id/default", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createAddressHandlers(prisma);
  return handlers.setDefaultAddress(c);
});
app.get("/api/orders", async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createOrderHandlers(prisma, qiancaiDouService);
  return handlers.getOrders(c);
});
app.get("/api/orders/:id", async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createOrderHandlers(prisma, qiancaiDouService);
  return handlers.getOrder(c);
});
app.post("/api/orders/from-cart", async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createCheckoutHandlers(qiancaiDouService);
  return handlers.createOrderFromCart(c);
});
app.post("/api/orders/:id/pay", async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createOrderHandlers(prisma, qiancaiDouService);
  return handlers.payOrder(c);
});
app.post("/api/orders/:id/cancel", async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createOrderHandlers(prisma, qiancaiDouService);
  return handlers.cancelOrder(c);
});
app.post("/api/orders/:id/confirm-delivery", async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createOrderHandlers(prisma, qiancaiDouService);
  return handlers.confirmDelivery(c);
});
app.get("/api/orders/:id/tracking", async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createOrderHandlers(prisma, qiancaiDouService);
  return handlers.getTracking(c);
});
app.post("/api/inventory/check", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createInventoryHandlers(prisma);
  return handlers.checkInventory(c);
});
app.post("/api/inventory/lock", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createInventoryHandlers(prisma);
  return handlers.lockInventory(c);
});
app.post("/api/inventory/release", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createInventoryHandlers(prisma);
  return handlers.releaseInventory(c);
});
app.post("/api/inventory/consume", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createInventoryHandlers(prisma);
  return handlers.consumeInventory(c);
});
app.get("/api/inventory/:productId/status", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createInventoryHandlers(prisma);
  return handlers.getInventoryStatus(c);
});
app.post("/api/inventory/cleanup-expired", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createInventoryHandlers(prisma);
  return handlers.cleanupExpiredLocks(c);
});
app.get("/api/me/qiancaidou/transactions", async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  try {
    const currentUser = c.get("user");
    const page = Math.max(1, parseInt(c.req.query("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(c.req.query("limit") || "20")));
    const result = await qiancaiDouService.getTransactionHistory(currentUser.id, page, limit);
    return c.json({
      code: 200,
      message: "Transaction history retrieved successfully",
      data: result
    });
  } catch (error) {
    console.error("Get transaction history error:", error);
    return c.json({
      code: 500,
      message: "Internal server error",
      data: null
    }, 500);
  }
});
app.post("/api/feedback", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createFeedbackHandlers(prisma);
  return handlers.createFeedback(c);
});
app.get("/api/feedback", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createFeedbackHandlers(prisma);
  return handlers.getUserFeedback(c);
});
app.get("/api/feedback/:id", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createFeedbackHandlers(prisma);
  return handlers.getFeedback(c);
});
app.put("/api/feedback/:id", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createFeedbackHandlers(prisma);
  return handlers.updateFeedback(c);
});
app.delete("/api/feedback/:id", async (c) => {
  const { prisma, authMiddleware } = initializeServices(c);
  await authMiddleware(c, async () => {
  });
  const handlers = createFeedbackHandlers(prisma);
  return handlers.deleteFeedback(c);
});
app.get("/api/entertainment/*", (c) => {
  return c.json({
    code: 200,
    message: "Entertainment module coming soon",
    data: {
      message: "\u5A31\u4E50\u5F69\u6A21\u5757\u5373\u5C06\u4E0A\u7EBF\uFF0C\u656C\u8BF7\u671F\u5F85\uFF01",
      features: [
        "\u5C0F\u6E38\u620F",
        "\u62BD\u5956\u6D3B\u52A8",
        "\u79EF\u5206\u4EFB\u52A1",
        "\u793E\u533A\u4E92\u52A8"
      ]
    }
  });
});
app.notFound((c) => {
  return c.json({
    code: 404,
    message: "API endpoint not found",
    data: null
  }, 404);
});
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({
    code: 500,
    message: "Internal server error",
    data: null
  }, 500);
});

// src/index.ts
var index_default = app;
export {
  index_default as default
};
/*! Bundled license information:

@neondatabase/serverless/index.mjs:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
//# sourceMappingURL=index.js.map
