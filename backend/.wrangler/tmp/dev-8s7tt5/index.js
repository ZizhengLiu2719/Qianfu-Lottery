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
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-OdNl9w/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-OdNl9w/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/@prisma/debug/dist/index.js
var require_dist = __commonJS({
  "node_modules/@prisma/debug/dist/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name2 in all)
        __defProp2(target, name2, { get: all[name2], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to2, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to2, key) && key !== except)
            __defProp2(to2, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to2;
    }, "__copyProps");
    var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports2 = {};
    __export2(src_exports2, {
      Debug: /* @__PURE__ */ __name(() => Debug3, "Debug"),
      clearLogs: /* @__PURE__ */ __name(() => clearLogs, "clearLogs"),
      default: /* @__PURE__ */ __name(() => src_default2, "default"),
      getLogs: /* @__PURE__ */ __name(() => getLogs, "getLogs")
    });
    module.exports = __toCommonJS(src_exports2);
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
          const ms = `+${Date.now() - lastTimestamp}ms`;
          lastTimestamp = Date.now();
          if (globalThis.DEBUG_COLORS) {
            log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
          } else {
            log(namespace2, ...stringArgs, ms);
          }
        }
      }, "debugCall");
      return new Proxy(debugCall, {
        get: /* @__PURE__ */ __name((_, prop) => instanceProps[prop], "get"),
        set: /* @__PURE__ */ __name((_, prop, value) => instanceProps[prop] = value, "set")
      });
    }
    __name(debugCreate, "debugCreate");
    var Debug3 = new Proxy(debugCreate, {
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
    function getLogs(numChars = 7500) {
      const logs = argsHistory.map(([namespace, ...args]) => {
        return `${namespace} ${args.map((arg) => {
          if (typeof arg === "string") {
            return arg;
          } else {
            return JSON.stringify(arg);
          }
        }).join(" ")}`;
      }).join("\n");
      if (logs.length < numChars) {
        return logs;
      }
      return logs.slice(-numChars);
    }
    __name(getLogs, "getLogs");
    function clearLogs() {
      argsHistory.length = 0;
    }
    __name(clearLogs, "clearLogs");
    var src_default2 = Debug3;
  }
});

// node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    exports.parse = function(source, transform) {
      return parsePostgresArray(source, transform);
    };
    function parsePostgresArray(source, transform, nested = false) {
      let character = "";
      let quote = false;
      let position = 0;
      let dimension = 0;
      const entries = [];
      let recorded = "";
      const newEntry = /* @__PURE__ */ __name(function(includeEmpty) {
        let entry = recorded;
        if (entry.length > 0 || includeEmpty) {
          if (entry === "NULL" && !includeEmpty) {
            entry = null;
          }
          if (entry !== null && transform) {
            entry = transform(entry);
          }
          entries.push(entry);
          recorded = "";
        }
      }, "newEntry");
      if (source[0] === "[") {
        while (position < source.length) {
          const char = source[position++];
          if (char === "=") {
            break;
          }
        }
      }
      while (position < source.length) {
        let escaped = false;
        character = source[position++];
        if (character === "\\") {
          character = source[position++];
          escaped = true;
        }
        if (character === "{" && !quote) {
          dimension++;
          if (dimension > 1) {
            const parser = parsePostgresArray(source.substr(position - 1), transform, true);
            entries.push(parser.entries);
            position += parser.position - 2;
          }
        } else if (character === "}" && !quote) {
          dimension--;
          if (!dimension) {
            newEntry();
            if (nested) {
              return {
                entries,
                position
              };
            }
          }
        } else if (character === '"' && !escaped) {
          if (quote) {
            newEntry(true);
          }
          quote = !quote;
        } else if (character === "," && !quote) {
          newEntry();
        } else {
          recorded += character;
        }
      }
      if (dimension !== 0) {
        throw new Error("array dimension not balanced");
      }
      return entries;
    }
    __name(parsePostgresArray, "parsePostgresArray");
  }
});

// node_modules/@prisma/client/runtime/wasm.js
var require_wasm = __commonJS({
  "node_modules/@prisma/client/runtime/wasm.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var Uo = Object.create;
    var kt = Object.defineProperty;
    var qo = Object.getOwnPropertyDescriptor;
    var Bo = Object.getOwnPropertyNames;
    var $o2 = Object.getPrototypeOf;
    var Vo = Object.prototype.hasOwnProperty;
    var se = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "se");
    var De = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "De");
    var Mt = /* @__PURE__ */ __name((e, t) => {
      for (var r in t) kt(e, r, { get: t[r], enumerable: true });
    }, "Mt");
    var rn = /* @__PURE__ */ __name((e, t, r, n) => {
      if (t && typeof t == "object" || typeof t == "function") for (let i of Bo(t)) !Vo.call(e, i) && i !== r && kt(e, i, { get: /* @__PURE__ */ __name(() => t[i], "get"), enumerable: !(n = qo(t, i)) || n.enumerable });
      return e;
    }, "rn");
    var Fe = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? Uo($o2(e)) : {}, rn(t || !e || !e.__esModule ? kt(r, "default", { value: e, enumerable: true }) : r, e)), "Fe");
    var jo = /* @__PURE__ */ __name((e) => rn(kt({}, "__esModule", { value: true }), e), "jo");
    function gr(e, t) {
      if (t = t.toLowerCase(), t === "utf8" || t === "utf-8") return new y(Wo.encode(e));
      if (t === "base64" || t === "base64url") return e = e.replace(/-/g, "+").replace(/_/g, "/"), e = e.replace(/[^A-Za-z0-9+/]/g, ""), new y([...atob(e)].map((r) => r.charCodeAt(0)));
      if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1") return new y([...e].map((r) => r.charCodeAt(0)));
      if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
        let r = new y(e.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < e.length; i++) n.setUint16(i * 2, e.charCodeAt(i), true);
        return r;
      }
      if (t === "hex") {
        let r = new y(e.length / 2);
        for (let n = 0, i = 0; i < e.length; i += 2, n++) r[n] = parseInt(e.slice(i, i + 2), 16);
        return r;
      }
      on2(`encoding "${t}"`);
    }
    __name(gr, "gr");
    function Qo(e) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a2) => a2.startsWith("get") || a2.startsWith("set")), n = r.map((a2) => a2.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a2, u) => function(g = 0) {
        return B(g, "offset"), Y(g, "offset"), V(g, "offset", this.length - 1), new DataView(this.buffer)[r[a2]](g, u);
      }, "i"), o = /* @__PURE__ */ __name((a2, u) => function(g, T2 = 0) {
        let C = r[a2].match(/set(\w+\d+)/)[1].toLowerCase(), O2 = Go2[C];
        return B(T2, "offset"), Y(T2, "offset"), V(T2, "offset", this.length - 1), Jo(g, "value", O2[0], O2[1]), new DataView(this.buffer)[r[a2]](T2, g, u), T2 + parseInt(r[a2].match(/\d+/)[0]) / 8;
      }, "o"), s = /* @__PURE__ */ __name((a2) => {
        a2.forEach((u) => {
          u.includes("Uint") && (e[u.replace("Uint", "UInt")] = e[u]), u.includes("Float64") && (e[u.replace("Float64", "Double")] = e[u]), u.includes("Float32") && (e[u.replace("Float32", "Float")] = e[u]);
        });
      }, "s");
      n.forEach((a2, u) => {
        a2.startsWith("read") && (e[a2] = i(u, false), e[a2 + "LE"] = i(u, true), e[a2 + "BE"] = i(u, false)), a2.startsWith("write") && (e[a2] = o(u, false), e[a2 + "LE"] = o(u, true), e[a2 + "BE"] = o(u, false)), s([a2, a2 + "LE", a2 + "BE"]);
      });
    }
    __name(Qo, "Qo");
    function on2(e) {
      throw new Error(`Buffer polyfill does not implement "${e}"`);
    }
    __name(on2, "on");
    function It(e, t) {
      if (!(e instanceof Uint8Array)) throw new TypeError(`The "${t}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(It, "It");
    function V(e, t, r = zo + 1) {
      if (e < 0 || e > r) {
        let n = new RangeError(`The value of "${t}" is out of range. It must be >= 0 && <= ${r}. Received ${e}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name(V, "V");
    function B(e, t) {
      if (typeof e != "number") {
        let r = new TypeError(`The "${t}" argument must be of type number. Received type ${typeof e}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(B, "B");
    function Y(e, t) {
      if (!Number.isInteger(e) || Number.isNaN(e)) {
        let r = new RangeError(`The value of "${t}" is out of range. It must be an integer. Received ${e}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(Y, "Y");
    function Jo(e, t, r, n) {
      if (e < r || e > n) {
        let i = new RangeError(`The value of "${t}" is out of range. It must be >= ${r} and <= ${n}. Received ${e}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(Jo, "Jo");
    function nn(e, t) {
      if (typeof e != "string") {
        let r = new TypeError(`The "${t}" argument must be of type string. Received type ${typeof e}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(nn, "nn");
    function Yo(e, t = "utf8") {
      return y.from(e, t);
    }
    __name(Yo, "Yo");
    var y;
    var Go2;
    var Wo;
    var Ko2;
    var Ho2;
    var zo;
    var b2;
    var hr2;
    var c = se(() => {
      "use strict";
      y = class e extends Uint8Array {
        static {
          __name(this, "e");
        }
        constructor() {
          super(...arguments);
          this._isBuffer = true;
        }
        get offset() {
          return this.byteOffset;
        }
        static alloc(r, n = 0, i = "utf8") {
          return nn(i, "encoding"), e.allocUnsafe(r).fill(n, i);
        }
        static allocUnsafe(r) {
          return e.from(r);
        }
        static allocUnsafeSlow(r) {
          return e.from(r);
        }
        static isBuffer(r) {
          return r && !!r._isBuffer;
        }
        static byteLength(r, n = "utf8") {
          if (typeof r == "string") return gr(r, n).byteLength;
          if (r && r.byteLength) return r.byteLength;
          let i = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw i.code = "ERR_INVALID_ARG_TYPE", i;
        }
        static isEncoding(r) {
          return Ho2.includes(r);
        }
        static compare(r, n) {
          It(r, "buff1"), It(n, "buff2");
          for (let i = 0; i < r.length; i++) {
            if (r[i] < n[i]) return -1;
            if (r[i] > n[i]) return 1;
          }
          return r.length === n.length ? 0 : r.length > n.length ? 1 : -1;
        }
        static from(r, n = "utf8") {
          if (r && typeof r == "object" && r.type === "Buffer") return new e(r.data);
          if (typeof r == "number") return new e(new Uint8Array(r));
          if (typeof r == "string") return gr(r, n);
          if (ArrayBuffer.isView(r)) {
            let { byteOffset: i, byteLength: o, buffer: s } = r;
            return "map" in r && typeof r.map == "function" ? new e(r.map((a2) => a2 % 256), i, o) : new e(s, i, o);
          }
          if (r && typeof r == "object" && ("length" in r || "byteLength" in r || "buffer" in r)) return new e(r);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(r, n) {
          if (r.length === 0) return e.alloc(0);
          let i = [].concat(...r.map((s) => [...s])), o = e.alloc(n !== void 0 ? n : i.length);
          return o.set(n !== void 0 ? i.slice(0, n) : i), o;
        }
        slice(r = 0, n = this.length) {
          return this.subarray(r, n);
        }
        subarray(r = 0, n = this.length) {
          return Object.setPrototypeOf(super.subarray(r, n), e.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s);
          return i.getUint8(0) & 128 && (o -= Math.pow(256, n)), o;
        }
        readIntLE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s);
          return i.getUint8(n - 1) & 128 && (o -= Math.pow(256, n)), o;
        }
        readUIntBE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s);
          return o;
        }
        readUintBE(r, n) {
          return this.readUIntBE(r, n);
        }
        readUIntLE(r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n), o = 0;
          for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s);
          return o;
        }
        readUintLE(r, n) {
          return this.readUIntLE(r, n);
        }
        writeIntBE(r, n, i) {
          return r = r < 0 ? r + Math.pow(256, i) : r, this.writeUIntBE(r, n, i);
        }
        writeIntLE(r, n, i) {
          return r = r < 0 ? r + Math.pow(256, i) : r, this.writeUIntLE(r, n, i);
        }
        writeUIntBE(r, n, i) {
          B(n, "offset"), Y(n, "offset"), V(n, "offset", this.length - 1), B(i, "byteLength"), Y(i, "byteLength");
          let o = new DataView(this.buffer, n, i);
          for (let s = i - 1; s >= 0; s--) o.setUint8(s, r & 255), r = r / 256;
          return n + i;
        }
        writeUintBE(r, n, i) {
          return this.writeUIntBE(r, n, i);
        }
        writeUIntLE(r, n, i) {
          B(n, "offset"), Y(n, "offset"), V(n, "offset", this.length - 1), B(i, "byteLength"), Y(i, "byteLength");
          let o = new DataView(this.buffer, n, i);
          for (let s = 0; s < i; s++) o.setUint8(s, r & 255), r = r / 256;
          return n + i;
        }
        writeUintLE(r, n, i) {
          return this.writeUIntLE(r, n, i);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 2) r.setUint16(n, r.getUint16(n, true), false);
          return this;
        }
        swap32() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 4) r.setUint32(n, r.getUint32(n, true), false);
          return this;
        }
        swap64() {
          let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let n = 0; n < this.length; n += 8) r.setBigUint64(n, r.getBigUint64(n, true), false);
          return this;
        }
        compare(r, n = 0, i = r.length, o = 0, s = this.length) {
          return It(r, "target"), B(n, "targetStart"), B(i, "targetEnd"), B(o, "sourceStart"), B(s, "sourceEnd"), V(n, "targetStart"), V(i, "targetEnd", r.length), V(o, "sourceStart"), V(s, "sourceEnd", this.length), e.compare(this.slice(o, s), r.slice(n, i));
        }
        equals(r) {
          return It(r, "otherBuffer"), this.length === r.length && this.every((n, i) => n === r[i]);
        }
        copy(r, n = 0, i = 0, o = this.length) {
          V(n, "targetStart"), V(i, "sourceStart", this.length), V(o, "sourceEnd"), n >>>= 0, i >>>= 0, o >>>= 0;
          let s = 0;
          for (; i < o && !(this[i] === void 0 || r[n] === void 0); ) r[n] = this[i], s++, i++, n++;
          return s;
        }
        write(r, n, i, o = "utf8") {
          let s = typeof n == "string" ? 0 : n ?? 0, a2 = typeof i == "string" ? this.length - s : i ?? this.length - s;
          return o = typeof n == "string" ? n : typeof i == "string" ? i : o, B(s, "offset"), B(a2, "length"), V(s, "offset", this.length), V(a2, "length", this.length), (o === "ucs2" || o === "ucs-2" || o === "utf16le" || o === "utf-16le") && (a2 = a2 - a2 % 2), gr(r, o).copy(this, s, 0, a2);
        }
        fill(r = 0, n = 0, i = this.length, o = "utf-8") {
          let s = typeof n == "string" ? 0 : n, a2 = typeof i == "string" ? this.length : i;
          if (o = typeof n == "string" ? n : typeof i == "string" ? i : o, r = e.from(typeof r == "number" ? [r] : r ?? [], o), nn(o, "encoding"), V(s, "offset", this.length), V(a2, "end", this.length), r.length !== 0) for (let u = s; u < a2; u += r.length) super.set(r.slice(0, r.length + u >= this.length ? this.length - u : r.length), u);
          return this;
        }
        includes(r, n = null, i = "utf-8") {
          return this.indexOf(r, n, i) !== -1;
        }
        lastIndexOf(r, n = null, i = "utf-8") {
          return this.indexOf(r, n, i, true);
        }
        indexOf(r, n = null, i = "utf-8", o = false) {
          let s = o ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          i = typeof n == "string" ? n : i;
          let a2 = e.from(typeof r == "number" ? [r] : r, i), u = typeof n == "string" ? 0 : n;
          return u = typeof n == "number" ? u : null, u = Number.isNaN(u) ? null : u, u ??= o ? this.length : 0, u = u < 0 ? this.length + u : u, a2.length === 0 && o === false ? u >= this.length ? this.length : u : a2.length === 0 && o === true ? (u >= this.length ? this.length : u) || this.length : s((g, T2) => (o ? T2 <= u : T2 >= u) && this[T2] === a2[0] && a2.every((O2, A) => this[T2 + A] === O2));
        }
        toString(r = "utf8", n = 0, i = this.length) {
          if (n = n < 0 ? 0 : n, r = r.toString().toLowerCase(), i <= 0) return "";
          if (r === "utf8" || r === "utf-8") return Ko2.decode(this.slice(n, i));
          if (r === "base64" || r === "base64url") {
            let o = btoa(this.reduce((s, a2) => s + hr2(a2), ""));
            return r === "base64url" ? o.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : o;
          }
          if (r === "binary" || r === "ascii" || r === "latin1" || r === "latin-1") return this.slice(n, i).reduce((o, s) => o + hr2(s & (r === "ascii" ? 127 : 255)), "");
          if (r === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le") {
            let o = new DataView(this.buffer.slice(n, i));
            return Array.from({ length: o.byteLength / 2 }, (s, a2) => a2 * 2 + 1 < o.byteLength ? hr2(o.getUint16(a2 * 2, true)) : "").join("");
          }
          if (r === "hex") return this.slice(n, i).reduce((o, s) => o + s.toString(16).padStart(2, "0"), "");
          on2(`encoding "${r}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      };
      Go2 = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, Wo = new TextEncoder(), Ko2 = new TextDecoder(), Ho2 = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], zo = 4294967295;
      Qo(y.prototype);
      b2 = new Proxy(Yo, { construct(e, [t, r]) {
        return y.from(t, r);
      }, get(e, t) {
        return y[t];
      } }), hr2 = String.fromCodePoint;
    });
    var h;
    var m2 = se(() => {
      "use strict";
      h = { nextTick: /* @__PURE__ */ __name((e, ...t) => {
        setTimeout(() => {
          e(...t);
        }, 0);
      }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"] };
    });
    var x2;
    var p2 = se(() => {
      "use strict";
      x2 = globalThis.performance ?? (() => {
        let e = Date.now();
        return { now: /* @__PURE__ */ __name(() => Date.now() - e, "now") };
      })();
    });
    var E;
    var d2 = se(() => {
      "use strict";
      E = /* @__PURE__ */ __name(() => {
      }, "E");
      E.prototype = E;
    });
    var w2;
    var f = se(() => {
      "use strict";
      w2 = class {
        static {
          __name(this, "w");
        }
        constructor(t) {
          this.value = t;
        }
        deref() {
          return this.value;
        }
      };
    });
    function un(e, t) {
      var r, n, i, o, s, a2, u, g, T2 = e.constructor, C = T2.precision;
      if (!e.s || !t.s) return t.s || (t = new T2(e)), U ? D(t, C) : t;
      if (u = e.d, g = t.d, s = e.e, i = t.e, u = u.slice(), o = s - i, o) {
        for (o < 0 ? (n = u, o = -o, a2 = g.length) : (n = g, i = s, a2 = u.length), s = Math.ceil(C / N), a2 = s > a2 ? s + 1 : a2 + 1, o > a2 && (o = a2, n.length = 1), n.reverse(); o--; ) n.push(0);
        n.reverse();
      }
      for (a2 = u.length, o = g.length, a2 - o < 0 && (o = a2, n = g, g = u, u = n), r = 0; o; ) r = (u[--o] = u[o] + g[o] + r) / Q | 0, u[o] %= Q;
      for (r && (u.unshift(r), ++i), a2 = u.length; u[--a2] == 0; ) u.pop();
      return t.d = u, t.e = i, U ? D(t, C) : t;
    }
    __name(un, "un");
    function le(e, t, r) {
      if (e !== ~~e || e < t || e > r) throw Error(Oe + e);
    }
    __name(le, "le");
    function ae(e) {
      var t, r, n, i = e.length - 1, o = "", s = e[0];
      if (i > 0) {
        for (o += s, t = 1; t < i; t++) n = e[t] + "", r = N - n.length, r && (o += Pe(r)), o += n;
        s = e[t], n = s + "", r = N - n.length, r && (o += Pe(r));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    __name(ae, "ae");
    function cn2(e, t) {
      var r, n, i, o, s, a2, u = 0, g = 0, T2 = e.constructor, C = T2.precision;
      if ($(e) > 16) throw Error(br + $(e));
      if (!e.s) return new T2(Z);
      for (t == null ? (U = false, a2 = C) : a2 = t, s = new T2(0.03125); e.abs().gte(0.1); ) e = e.times(s), g += 5;
      for (n = Math.log(Se2(2, g)) / Math.LN10 * 2 + 5 | 0, a2 += n, r = i = o = new T2(Z), T2.precision = a2; ; ) {
        if (i = D(i.times(e), a2), r = r.times(++u), s = o.plus(ye(i, r, a2)), ae(s.d).slice(0, a2) === ae(o.d).slice(0, a2)) {
          for (; g--; ) o = D(o.times(o), a2);
          return T2.precision = C, t == null ? (U = true, D(o, C)) : o;
        }
        o = s;
      }
    }
    __name(cn2, "cn");
    function $(e) {
      for (var t = e.e * N, r = e.d[0]; r >= 10; r /= 10) t++;
      return t;
    }
    __name($, "$");
    function yr(e, t, r) {
      if (t > e.LN10.sd()) throw U = true, r && (e.precision = r), Error(re + "LN10 precision limit exceeded");
      return D(new e(e.LN10), t);
    }
    __name(yr, "yr");
    function Pe(e) {
      for (var t = ""; e--; ) t += "0";
      return t;
    }
    __name(Pe, "Pe");
    function it(e, t) {
      var r, n, i, o, s, a2, u, g, T2, C = 1, O2 = 10, A = e, M = A.d, S2 = A.constructor, I2 = S2.precision;
      if (A.s < 1) throw Error(re + (A.s ? "NaN" : "-Infinity"));
      if (A.eq(Z)) return new S2(0);
      if (t == null ? (U = false, g = I2) : g = t, A.eq(10)) return t == null && (U = true), yr(S2, g);
      if (g += O2, S2.precision = g, r = ae(M), n = r.charAt(0), o = $(A), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) A = A.times(e), r = ae(A.d), n = r.charAt(0), C++;
        o = $(A), n > 1 ? (A = new S2("0." + r), o++) : A = new S2(n + "." + r.slice(1));
      } else return u = yr(S2, g + 2, I2).times(o + ""), A = it(new S2(n + "." + r.slice(1)), g - O2).plus(u), S2.precision = I2, t == null ? (U = true, D(A, I2)) : A;
      for (a2 = s = A = ye(A.minus(Z), A.plus(Z), g), T2 = D(A.times(A), g), i = 3; ; ) {
        if (s = D(s.times(T2), g), u = a2.plus(ye(s, new S2(i), g)), ae(u.d).slice(0, g) === ae(a2.d).slice(0, g)) return a2 = a2.times(2), o !== 0 && (a2 = a2.plus(yr(S2, g + 2, I2).times(o + ""))), a2 = ye(a2, new S2(C), g), S2.precision = I2, t == null ? (U = true, D(a2, I2)) : a2;
        a2 = u, i += 2;
      }
    }
    __name(it, "it");
    function sn(e, t) {
      var r, n, i;
      for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
      for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
      if (t = t.slice(n, i), t) {
        if (i -= n, r = r - n - 1, e.e = Ue(r / N), e.d = [], n = (r + 1) % N, r < 0 && (n += N), n < i) {
          for (n && e.d.push(+t.slice(0, n)), i -= N; n < i; ) e.d.push(+t.slice(n, n += N));
          t = t.slice(n), n = N - t.length;
        } else n -= i;
        for (; n--; ) t += "0";
        if (e.d.push(+t), U && (e.e > Lt || e.e < -Lt)) throw Error(br + r);
      } else e.s = 0, e.e = 0, e.d = [0];
      return e;
    }
    __name(sn, "sn");
    function D(e, t, r) {
      var n, i, o, s, a2, u, g, T2, C = e.d;
      for (s = 1, o = C[0]; o >= 10; o /= 10) s++;
      if (n = t - s, n < 0) n += N, i = t, g = C[T2 = 0];
      else {
        if (T2 = Math.ceil((n + 1) / N), o = C.length, T2 >= o) return e;
        for (g = o = C[T2], s = 1; o >= 10; o /= 10) s++;
        n %= N, i = n - N + s;
      }
      if (r !== void 0 && (o = Se2(10, s - i - 1), a2 = g / o % 10 | 0, u = t < 0 || C[T2 + 1] !== void 0 || g % o, u = r < 4 ? (a2 || u) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : a2 > 5 || a2 == 5 && (r == 4 || u || r == 6 && (n > 0 ? i > 0 ? g / Se2(10, s - i) : 0 : C[T2 - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !C[0]) return u ? (o = $(e), C.length = 1, t = t - o - 1, C[0] = Se2(10, (N - t % N) % N), e.e = Ue(-t / N) || 0) : (C.length = 1, C[0] = e.e = e.s = 0), e;
      if (n == 0 ? (C.length = T2, o = 1, T2--) : (C.length = T2 + 1, o = Se2(10, N - n), C[T2] = i > 0 ? (g / Se2(10, s - i) % Se2(10, i) | 0) * o : 0), u) for (; ; ) if (T2 == 0) {
        (C[0] += o) == Q && (C[0] = 1, ++e.e);
        break;
      } else {
        if (C[T2] += o, C[T2] != Q) break;
        C[T2--] = 0, o = 1;
      }
      for (n = C.length; C[--n] === 0; ) C.pop();
      if (U && (e.e > Lt || e.e < -Lt)) throw Error(br + $(e));
      return e;
    }
    __name(D, "D");
    function mn(e, t) {
      var r, n, i, o, s, a2, u, g, T2, C, O2 = e.constructor, A = O2.precision;
      if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new O2(e), U ? D(t, A) : t;
      if (u = e.d, C = t.d, n = t.e, g = e.e, u = u.slice(), s = g - n, s) {
        for (T2 = s < 0, T2 ? (r = u, s = -s, a2 = C.length) : (r = C, n = g, a2 = u.length), i = Math.max(Math.ceil(A / N), a2) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--; ) r.push(0);
        r.reverse();
      } else {
        for (i = u.length, a2 = C.length, T2 = i < a2, T2 && (a2 = i), i = 0; i < a2; i++) if (u[i] != C[i]) {
          T2 = u[i] < C[i];
          break;
        }
        s = 0;
      }
      for (T2 && (r = u, u = C, C = r, t.s = -t.s), a2 = u.length, i = C.length - a2; i > 0; --i) u[a2++] = 0;
      for (i = C.length; i > s; ) {
        if (u[--i] < C[i]) {
          for (o = i; o && u[--o] === 0; ) u[o] = Q - 1;
          --u[o], u[i] += Q;
        }
        u[i] -= C[i];
      }
      for (; u[--a2] === 0; ) u.pop();
      for (; u[0] === 0; u.shift()) --n;
      return u[0] ? (t.d = u, t.e = n, U ? D(t, A) : t) : new O2(0);
    }
    __name(mn, "mn");
    function ke(e, t, r) {
      var n, i = $(e), o = ae(e.d), s = o.length;
      return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Pe(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Pe(-i - 1) + o, r && (n = r - s) > 0 && (o += Pe(n))) : i >= s ? (o += Pe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Pe(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Pe(n))), e.s < 0 ? "-" + o : o;
    }
    __name(ke, "ke");
    function an(e, t) {
      if (e.length > t) return e.length = t, true;
    }
    __name(an, "an");
    function pn(e) {
      var t, r, n;
      function i(o) {
        var s = this;
        if (!(s instanceof i)) return new i(o);
        if (s.constructor = i, o instanceof i) {
          s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0) throw Error(Oe + o);
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
          return sn(s, o.toString());
        } else if (typeof o != "string") throw Error(Oe + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, Zo.test(o)) sn(s, o);
        else throw Error(Oe + o);
      }
      __name(i, "i");
      if (i.prototype = R, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = pn, i.config = i.set = es2, e === void 0 && (e = {}), e) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
      return i.config(e), i;
    }
    __name(pn, "pn");
    function es2(e) {
      if (!e || typeof e != "object") throw Error(re + "Object expected");
      var t, r, n, i = ["precision", 1, Ne, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (t = 0; t < i.length; t += 3) if ((n = e[r = i[t]]) !== void 0) if (Ue(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(Oe + r + ": " + n);
      if ((n = e[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
      else throw Error(Oe + r + ": " + n);
      return this;
    }
    __name(es2, "es");
    var Ne;
    var Xo;
    var wr;
    var U;
    var re;
    var Oe;
    var br;
    var Ue;
    var Se2;
    var Zo;
    var Z;
    var Q;
    var N;
    var ln;
    var Lt;
    var R;
    var ye;
    var wr;
    var _t;
    var dn = se(() => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
      Ne = 1e9, Xo = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, U = true, re = "[DecimalError] ", Oe = re + "Invalid argument: ", br = re + "Exponent out of range: ", Ue = Math.floor, Se2 = Math.pow, Zo = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Q = 1e7, N = 7, ln = 9007199254740991, Lt = Ue(ln / N), R = {};
      R.absoluteValue = R.abs = function() {
        var e = new this.constructor(this);
        return e.s && (e.s = 1), e;
      };
      R.comparedTo = R.cmp = function(e) {
        var t, r, n, i, o = this;
        if (e = new o.constructor(e), o.s !== e.s) return o.s || -e.s;
        if (o.e !== e.e) return o.e > e.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t) if (o.d[t] !== e.d[t]) return o.d[t] > e.d[t] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      R.decimalPlaces = R.dp = function() {
        var e = this, t = e.d.length - 1, r = (t - e.e) * N;
        if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
        return r < 0 ? 0 : r;
      };
      R.dividedBy = R.div = function(e) {
        return ye(this, new this.constructor(e));
      };
      R.dividedToIntegerBy = R.idiv = function(e) {
        var t = this, r = t.constructor;
        return D(ye(t, new r(e), 0, 1), r.precision);
      };
      R.equals = R.eq = function(e) {
        return !this.cmp(e);
      };
      R.exponent = function() {
        return $(this);
      };
      R.greaterThan = R.gt = function(e) {
        return this.cmp(e) > 0;
      };
      R.greaterThanOrEqualTo = R.gte = function(e) {
        return this.cmp(e) >= 0;
      };
      R.isInteger = R.isint = function() {
        return this.e > this.d.length - 2;
      };
      R.isNegative = R.isneg = function() {
        return this.s < 0;
      };
      R.isPositive = R.ispos = function() {
        return this.s > 0;
      };
      R.isZero = function() {
        return this.s === 0;
      };
      R.lessThan = R.lt = function(e) {
        return this.cmp(e) < 0;
      };
      R.lessThanOrEqualTo = R.lte = function(e) {
        return this.cmp(e) < 1;
      };
      R.logarithm = R.log = function(e) {
        var t, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (e === void 0) e = new n(10);
        else if (e = new n(e), e.s < 1 || e.eq(Z)) throw Error(re + "NaN");
        if (r.s < 1) throw Error(re + (r.s ? "NaN" : "-Infinity"));
        return r.eq(Z) ? new n(0) : (U = false, t = ye(it(r, o), it(e, o), o), U = true, D(t, i));
      };
      R.minus = R.sub = function(e) {
        var t = this;
        return e = new t.constructor(e), t.s == e.s ? mn(t, e) : un(t, (e.s = -e.s, e));
      };
      R.modulo = R.mod = function(e) {
        var t, r = this, n = r.constructor, i = n.precision;
        if (e = new n(e), !e.s) throw Error(re + "NaN");
        return r.s ? (U = false, t = ye(r, e, 0, 1).times(e), U = true, r.minus(t)) : D(new n(r), i);
      };
      R.naturalExponential = R.exp = function() {
        return cn2(this);
      };
      R.naturalLogarithm = R.ln = function() {
        return it(this);
      };
      R.negated = R.neg = function() {
        var e = new this.constructor(this);
        return e.s = -e.s || 0, e;
      };
      R.plus = R.add = function(e) {
        var t = this;
        return e = new t.constructor(e), t.s == e.s ? un(t, e) : mn(t, (e.s = -e.s, e));
      };
      R.precision = R.sd = function(e) {
        var t, r, n, i = this;
        if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Oe + e);
        if (t = $(i) + 1, n = i.d.length - 1, r = n * N + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10) r--;
          for (n = i.d[0]; n >= 10; n /= 10) r++;
        }
        return e && t > r ? t : r;
      };
      R.squareRoot = R.sqrt = function() {
        var e, t, r, n, i, o, s, a2 = this, u = a2.constructor;
        if (a2.s < 1) {
          if (!a2.s) return new u(0);
          throw Error(re + "NaN");
        }
        for (e = $(a2), U = false, i = Math.sqrt(+a2), i == 0 || i == 1 / 0 ? (t = ae(a2.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = Ue((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new u(t)) : n = new u(i.toString()), r = u.precision, i = s = r + 3; ; ) if (o = n, n = o.plus(ye(a2, o, s + 2)).times(0.5), ae(o.d).slice(0, s) === (t = ae(n.d)).slice(0, s)) {
          if (t = t.slice(s - 3, s + 1), i == s && t == "4999") {
            if (D(o, r + 1, 0), o.times(o).eq(a2)) {
              n = o;
              break;
            }
          } else if (t != "9999") break;
          s += 4;
        }
        return U = true, D(n, r);
      };
      R.times = R.mul = function(e) {
        var t, r, n, i, o, s, a2, u, g, T2 = this, C = T2.constructor, O2 = T2.d, A = (e = new C(e)).d;
        if (!T2.s || !e.s) return new C(0);
        for (e.s *= T2.s, r = T2.e + e.e, u = O2.length, g = A.length, u < g && (o = O2, O2 = A, A = o, s = u, u = g, g = s), o = [], s = u + g, n = s; n--; ) o.push(0);
        for (n = g; --n >= 0; ) {
          for (t = 0, i = u + n; i > n; ) a2 = o[i] + A[n] * O2[i - n - 1] + t, o[i--] = a2 % Q | 0, t = a2 / Q | 0;
          o[i] = (o[i] + t) % Q | 0;
        }
        for (; !o[--s]; ) o.pop();
        return t ? ++r : o.shift(), e.d = o, e.e = r, U ? D(e, C.precision) : e;
      };
      R.toDecimalPlaces = R.todp = function(e, t) {
        var r = this, n = r.constructor;
        return r = new n(r), e === void 0 ? r : (le(e, 0, Ne), t === void 0 ? t = n.rounding : le(t, 0, 8), D(r, e + $(r) + 1, t));
      };
      R.toExponential = function(e, t) {
        var r, n = this, i = n.constructor;
        return e === void 0 ? r = ke(n, true) : (le(e, 0, Ne), t === void 0 ? t = i.rounding : le(t, 0, 8), n = D(new i(n), e + 1, t), r = ke(n, true, e + 1)), r;
      };
      R.toFixed = function(e, t) {
        var r, n, i = this, o = i.constructor;
        return e === void 0 ? ke(i) : (le(e, 0, Ne), t === void 0 ? t = o.rounding : le(t, 0, 8), n = D(new o(i), e + $(i) + 1, t), r = ke(n.abs(), false, e + $(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      R.toInteger = R.toint = function() {
        var e = this, t = e.constructor;
        return D(new t(e), $(e) + 1, t.rounding);
      };
      R.toNumber = function() {
        return +this;
      };
      R.toPower = R.pow = function(e) {
        var t, r, n, i, o, s, a2 = this, u = a2.constructor, g = 12, T2 = +(e = new u(e));
        if (!e.s) return new u(Z);
        if (a2 = new u(a2), !a2.s) {
          if (e.s < 1) throw Error(re + "Infinity");
          return a2;
        }
        if (a2.eq(Z)) return a2;
        if (n = u.precision, e.eq(Z)) return D(a2, n);
        if (t = e.e, r = e.d.length - 1, s = t >= r, o = a2.s, s) {
          if ((r = T2 < 0 ? -T2 : T2) <= ln) {
            for (i = new u(Z), t = Math.ceil(n / N + 4), U = false; r % 2 && (i = i.times(a2), an(i.d, t)), r = Ue(r / 2), r !== 0; ) a2 = a2.times(a2), an(a2.d, t);
            return U = true, e.s < 0 ? new u(Z).div(i) : D(i, n);
          }
        } else if (o < 0) throw Error(re + "NaN");
        return o = o < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, a2.s = 1, U = false, i = e.times(it(a2, n + g)), U = true, i = cn2(i), i.s = o, i;
      };
      R.toPrecision = function(e, t) {
        var r, n, i = this, o = i.constructor;
        return e === void 0 ? (r = $(i), n = ke(i, r <= o.toExpNeg || r >= o.toExpPos)) : (le(e, 1, Ne), t === void 0 ? t = o.rounding : le(t, 0, 8), i = D(new o(i), e, t), r = $(i), n = ke(i, e <= r || r <= o.toExpNeg, e)), n;
      };
      R.toSignificantDigits = R.tosd = function(e, t) {
        var r = this, n = r.constructor;
        return e === void 0 ? (e = n.precision, t = n.rounding) : (le(e, 1, Ne), t === void 0 ? t = n.rounding : le(t, 0, 8)), D(new n(r), e, t);
      };
      R.toString = R.valueOf = R.val = R.toJSON = R[Symbol.for("nodejs.util.inspect.custom")] = function() {
        var e = this, t = $(e), r = e.constructor;
        return ke(e, t <= r.toExpNeg || t >= r.toExpPos);
      };
      ye = /* @__PURE__ */ function() {
        function e(n, i) {
          var o, s = 0, a2 = n.length;
          for (n = n.slice(); a2--; ) o = n[a2] * i + s, n[a2] = o % Q | 0, s = o / Q | 0;
          return s && n.unshift(s), n;
        }
        __name(e, "e");
        function t(n, i, o, s) {
          var a2, u;
          if (o != s) u = o > s ? 1 : -1;
          else for (a2 = u = 0; a2 < o; a2++) if (n[a2] != i[a2]) {
            u = n[a2] > i[a2] ? 1 : -1;
            break;
          }
          return u;
        }
        __name(t, "t");
        function r(n, i, o) {
          for (var s = 0; o--; ) n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * Q + n[o] - i[o];
          for (; !n[0] && n.length > 1; ) n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s) {
          var a2, u, g, T2, C, O2, A, M, S2, I2, ne, z, _e2, k2, Ae2, fr2, ie, St, Ot = n.constructor, No = n.s == i.s ? 1 : -1, oe = n.d, q = i.d;
          if (!n.s) return new Ot(n);
          if (!i.s) throw Error(re + "Division by zero");
          for (u = n.e - i.e, ie = q.length, Ae2 = oe.length, A = new Ot(No), M = A.d = [], g = 0; q[g] == (oe[g] || 0); ) ++g;
          if (q[g] > (oe[g] || 0) && --u, o == null ? z = o = Ot.precision : s ? z = o + ($(n) - $(i)) + 1 : z = o, z < 0) return new Ot(0);
          if (z = z / N + 2 | 0, g = 0, ie == 1) for (T2 = 0, q = q[0], z++; (g < Ae2 || T2) && z--; g++) _e2 = T2 * Q + (oe[g] || 0), M[g] = _e2 / q | 0, T2 = _e2 % q | 0;
          else {
            for (T2 = Q / (q[0] + 1) | 0, T2 > 1 && (q = e(q, T2), oe = e(oe, T2), ie = q.length, Ae2 = oe.length), k2 = ie, S2 = oe.slice(0, ie), I2 = S2.length; I2 < ie; ) S2[I2++] = 0;
            St = q.slice(), St.unshift(0), fr2 = q[0], q[1] >= Q / 2 && ++fr2;
            do
              T2 = 0, a2 = t(q, S2, ie, I2), a2 < 0 ? (ne = S2[0], ie != I2 && (ne = ne * Q + (S2[1] || 0)), T2 = ne / fr2 | 0, T2 > 1 ? (T2 >= Q && (T2 = Q - 1), C = e(q, T2), O2 = C.length, I2 = S2.length, a2 = t(C, S2, O2, I2), a2 == 1 && (T2--, r(C, ie < O2 ? St : q, O2))) : (T2 == 0 && (a2 = T2 = 1), C = q.slice()), O2 = C.length, O2 < I2 && C.unshift(0), r(S2, C, I2), a2 == -1 && (I2 = S2.length, a2 = t(q, S2, ie, I2), a2 < 1 && (T2++, r(S2, ie < I2 ? St : q, I2))), I2 = S2.length) : a2 === 0 && (T2++, S2 = [0]), M[g++] = T2, a2 && S2[0] ? S2[I2++] = oe[k2] || 0 : (S2 = [oe[k2]], I2 = 1);
            while ((k2++ < Ae2 || S2[0] !== void 0) && z--);
          }
          return M[0] || M.shift(), A.e = u, D(A, s ? o + $(A) + 1 : o);
        };
      }();
      wr = pn(Xo);
      Z = new wr(1);
      _t = wr;
    });
    var v2;
    var ue;
    var l = se(() => {
      "use strict";
      dn();
      v2 = class extends _t {
        static {
          __name(this, "v");
        }
        static isDecimal(t) {
          return t instanceof _t;
        }
        static random(t = 20) {
          {
            let n = crypto.getRandomValues(new Uint8Array(t)).reduce((i, o) => i + o, "");
            return new _t(`0.${n.slice(0, t)}`);
          }
        }
      }, ue = v2;
    });
    function ts() {
      return false;
    }
    __name(ts, "ts");
    var rs2;
    var ns;
    var yn;
    var bn = se(() => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
      rs2 = {}, ns = { existsSync: ts, promises: rs2 }, yn = ns;
    });
    function us2(...e) {
      return e.join("/");
    }
    __name(us2, "us");
    function cs(...e) {
      return e.join("/");
    }
    __name(cs, "cs");
    var In2;
    var ms;
    var ps2;
    var st;
    var Ln = se(() => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
      In2 = "/", ms = { sep: In2 }, ps2 = { resolve: us2, posix: ms, join: cs, sep: In2 }, st = ps2;
    });
    var Ut2;
    var Dn = se(() => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
      Ut2 = class {
        static {
          __name(this, "Ut");
        }
        constructor() {
          this.events = {};
        }
        on(t, r) {
          return this.events[t] || (this.events[t] = []), this.events[t].push(r), this;
        }
        emit(t, ...r) {
          return this.events[t] ? (this.events[t].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      };
    });
    var Nn = De((Wc, Fn) => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
      Fn.exports = (e, t = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof t != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (t === 0) return e;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, r.indent.repeat(t));
      };
    });
    var Bn = De((am, qn) => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
      qn.exports = ({ onlyFirst: e = false } = {}) => {
        let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(t, e ? void 0 : "g");
      };
    });
    var Vn = De((fm, $n) => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
      var bs2 = Bn();
      $n.exports = (e) => typeof e == "string" ? e.replace(bs2(), "") : e;
    });
    var kr = De((Mf, Jn) => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
      Jn.exports = /* @__PURE__ */ function() {
        function e(t, r, n, i, o) {
          return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o ? r : r + 1;
        }
        __name(e, "e");
        return function(t, r) {
          if (t === r) return 0;
          if (t.length > r.length) {
            var n = t;
            t = r, r = n;
          }
          for (var i = t.length, o = r.length; i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a2 = 0, u, g, T2, C, O2, A, M, S2, I2, ne, z, _e2, k2 = [];
          for (u = 0; u < i; u++) k2.push(u + 1), k2.push(t.charCodeAt(s + u));
          for (var Ae2 = k2.length - 1; a2 < o - 3; ) for (I2 = r.charCodeAt(s + (g = a2)), ne = r.charCodeAt(s + (T2 = a2 + 1)), z = r.charCodeAt(s + (C = a2 + 2)), _e2 = r.charCodeAt(s + (O2 = a2 + 3)), A = a2 += 4, u = 0; u < Ae2; u += 2) M = k2[u], S2 = k2[u + 1], g = e(M, g, T2, I2, S2), T2 = e(g, T2, C, ne, S2), C = e(T2, C, O2, z, S2), A = e(C, O2, A, _e2, S2), k2[u] = A, O2 = C, C = T2, T2 = g, g = M;
          for (; a2 < o; ) for (I2 = r.charCodeAt(s + (g = a2)), A = ++a2, u = 0; u < Ae2; u += 2) M = k2[u], k2[u] = A = e(M, g, A, I2, k2[u + 1]), g = M;
          return A;
        };
      }();
    });
    var wi = De((oE, fa) => {
      fa.exports = { name: "@prisma/engines-version", version: "5.22.0-44.605197351a3c8bdd595af2d2a9bc3025bca48ea2", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.34", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Ei2 = De(() => {
      "use strict";
      c();
      m2();
      p2();
      d2();
      f();
      l();
    });
    var ul = {};
    Mt(ul, { Debug: /* @__PURE__ */ __name(() => Tr, "Debug"), Decimal: /* @__PURE__ */ __name(() => ue, "Decimal"), Extensions: /* @__PURE__ */ __name(() => Er, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => Ze, "MetricsClient"), NotFoundError: /* @__PURE__ */ __name(() => we, "NotFoundError"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => L, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => J, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => Ee, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => G, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => j, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => xr, "Public"), Sql: /* @__PURE__ */ __name(() => X2, "Sql"), defineDmmfProperty: /* @__PURE__ */ __name(() => hi2, "defineDmmfProperty"), deserializeJsonResponse: /* @__PURE__ */ __name(() => $e2, "deserializeJsonResponse"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => gi, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => Pi2, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => _o, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => Ce, "getRuntime"), join: /* @__PURE__ */ __name(() => xi, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => Do, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => yi2, "makeTypedQueryFactory"), objectEnumValues: /* @__PURE__ */ __name(() => Wt2, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => Vr, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => Zt, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => Xt2, "skip"), sqltag: /* @__PURE__ */ __name(() => jr, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => void 0, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => ct, "warnOnce") });
    module.exports = jo(ul);
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Er = {};
    Mt(Er, { defineExtension: /* @__PURE__ */ __name(() => fn, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => gn, "getExtensionContext") });
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function fn(e) {
      return typeof e == "function" ? e : (t) => t.$extends(e);
    }
    __name(fn, "fn");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function gn(e) {
      return e;
    }
    __name(gn, "gn");
    var xr = {};
    Mt(xr, { validator: /* @__PURE__ */ __name(() => hn, "validator") });
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function hn(...e) {
      return (t) => t;
    }
    __name(hn, "hn");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Pr;
    var wn2;
    var En3;
    var xn2;
    var Pn = true;
    typeof h < "u" && ({ FORCE_COLOR: Pr, NODE_DISABLE_COLORS: wn2, NO_COLOR: En3, TERM: xn2 } = h.env || {}, Pn = h.stdout && h.stdout.isTTY);
    var is = { enabled: !wn2 && En3 == null && xn2 !== "dumb" && (Pr != null && Pr !== "0" || Pn) };
    function F(e, t) {
      let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${t}m`;
      return function(o) {
        return !is.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(F, "F");
    var fu = F(0, 0);
    var Dt = F(1, 22);
    var Ft = F(2, 22);
    var gu = F(3, 23);
    var vn3 = F(4, 24);
    var hu = F(7, 27);
    var yu = F(8, 28);
    var bu = F(9, 29);
    var wu = F(30, 39);
    var qe = F(31, 39);
    var Tn2 = F(32, 39);
    var Cn = F(33, 39);
    var Rn = F(34, 39);
    var Eu = F(35, 39);
    var An = F(36, 39);
    var xu = F(37, 39);
    var Sn3 = F(90, 39);
    var Pu = F(90, 39);
    var vu = F(40, 49);
    var Tu = F(41, 49);
    var Cu = F(42, 49);
    var Ru = F(43, 49);
    var Au2 = F(44, 49);
    var Su = F(45, 49);
    var Ou = F(46, 49);
    var ku = F(47, 49);
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var os = 100;
    var On = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Nt = [];
    var kn = Date.now();
    var ss = 0;
    var vr = typeof h < "u" ? h.env : {};
    globalThis.DEBUG ??= vr.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= vr.DEBUG_COLORS ? vr.DEBUG_COLORS === "true" : true;
    var ot = { enable(e) {
      typeof e == "string" && (globalThis.DEBUG = e);
    }, disable() {
      let e = globalThis.DEBUG;
      return globalThis.DEBUG = "", e;
    }, enabled(e) {
      let t = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = t.some((i) => i === "" || i[0] === "-" ? false : e.match(RegExp(i.split("*").join(".*") + "$"))), n = t.some((i) => i === "" || i[0] !== "-" ? false : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: /* @__PURE__ */ __name((...e) => {
      let [t, r, ...n] = e;
      (console.warn ?? console.log)(`${t} ${r}`, ...n);
    }, "log"), formatters: {} };
    function as(e) {
      let t = { color: On[ss++ % On.length], enabled: ot.enabled(e), namespace: e, log: ot.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a2 } = t;
        if (n.length !== 0 && Nt.push([o, ...n]), Nt.length > os && Nt.shift(), ot.enabled(o) || i) {
          let u = n.map((T2) => typeof T2 == "string" ? T2 : ls(T2)), g = `+${Date.now() - kn}ms`;
          kn = Date.now(), a2(o, ...u, g);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => t[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => t[i] = o, "set") });
    }
    __name(as, "as");
    var Tr = new Proxy(as, { get: /* @__PURE__ */ __name((e, t) => ot[t], "get"), set: /* @__PURE__ */ __name((e, t, r) => ot[t] = r, "set") });
    function ls(e, t = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, t);
    }
    __name(ls, "ls");
    function Mn() {
      Nt.length = 0;
    }
    __name(Mn, "Mn");
    var ee = Tr;
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Cr = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var _n2 = "library";
    function at(e) {
      let t = ds2();
      return t || (e?.config.engineType === "library" ? "library" : e?.config.engineType === "binary" ? "binary" : _n2);
    }
    __name(at, "at");
    function ds2() {
      let e = h.env.PRISMA_CLIENT_ENGINE_TYPE;
      return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
    }
    __name(ds2, "ds");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Me;
    ((t) => {
      let e;
      ((k2) => (k2.findUnique = "findUnique", k2.findUniqueOrThrow = "findUniqueOrThrow", k2.findFirst = "findFirst", k2.findFirstOrThrow = "findFirstOrThrow", k2.findMany = "findMany", k2.create = "create", k2.createMany = "createMany", k2.createManyAndReturn = "createManyAndReturn", k2.update = "update", k2.updateMany = "updateMany", k2.upsert = "upsert", k2.delete = "delete", k2.deleteMany = "deleteMany", k2.groupBy = "groupBy", k2.count = "count", k2.aggregate = "aggregate", k2.findRaw = "findRaw", k2.aggregateRaw = "aggregateRaw"))(e = t.ModelAction ||= {});
    })(Me ||= {});
    var ut = {};
    Mt(ut, { error: /* @__PURE__ */ __name(() => hs, "error"), info: /* @__PURE__ */ __name(() => gs2, "info"), log: /* @__PURE__ */ __name(() => fs2, "log"), query: /* @__PURE__ */ __name(() => ys2, "query"), should: /* @__PURE__ */ __name(() => Un, "should"), tags: /* @__PURE__ */ __name(() => lt, "tags"), warn: /* @__PURE__ */ __name(() => Rr, "warn") });
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var lt = { error: qe("prisma:error"), warn: Cn("prisma:warn"), info: An("prisma:info"), query: Rn("prisma:query") };
    var Un = { warn: /* @__PURE__ */ __name(() => !h.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function fs2(...e) {
      console.log(...e);
    }
    __name(fs2, "fs");
    function Rr(e, ...t) {
      Un.warn() && console.warn(`${lt.warn} ${e}`, ...t);
    }
    __name(Rr, "Rr");
    function gs2(e, ...t) {
      console.info(`${lt.info} ${e}`, ...t);
    }
    __name(gs2, "gs");
    function hs(e, ...t) {
      console.error(`${lt.error} ${e}`, ...t);
    }
    __name(hs, "hs");
    function ys2(e, ...t) {
      console.log(`${lt.query} ${e}`, ...t);
    }
    __name(ys2, "ys");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function qt2(e, t) {
      if (!e) throw new Error(`${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(qt2, "qt");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function be(e, t) {
      throw new Error(t);
    }
    __name(be, "be");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Ar(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
    __name(Ar, "Ar");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Sr = /* @__PURE__ */ __name((e, t) => e.reduce((r, n) => (r[t(n)] = n, r), {}), "Sr");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Be(e, t) {
      let r = {};
      for (let n of Object.keys(e)) r[n] = t(e[n], n);
      return r;
    }
    __name(Be, "Be");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Or(e, t) {
      if (e.length === 0) return;
      let r = e[0];
      for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n]);
      return r;
    }
    __name(Or, "Or");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function K2(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(K2, "K");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var jn = /* @__PURE__ */ new Set();
    var ct = /* @__PURE__ */ __name((e, t, ...r) => {
      jn.has(e) || (jn.add(e), Rr(t, ...r));
    }, "ct");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var J = class extends Error {
      static {
        __name(this, "J");
      }
      constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(t), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    K2(J, "PrismaClientKnownRequestError");
    var we = class extends J {
      static {
        __name(this, "we");
      }
      constructor(t, r) {
        super(t, { code: "P2025", clientVersion: r }), this.name = "NotFoundError";
      }
    };
    K2(we, "NotFoundError");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var L = class e extends Error {
      static {
        __name(this, "e");
      }
      constructor(t, r, n) {
        super(t), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(e);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    K2(L, "PrismaClientInitializationError");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Ee = class extends Error {
      static {
        __name(this, "Ee");
      }
      constructor(t, r) {
        super(t), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    K2(Ee, "PrismaClientRustPanicError");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var G = class extends Error {
      static {
        __name(this, "G");
      }
      constructor(t, { clientVersion: r, batchRequestIdx: n }) {
        super(t), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    K2(G, "PrismaClientUnknownRequestError");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var j = class extends Error {
      static {
        __name(this, "j");
      }
      constructor(r, { clientVersion: n }) {
        super(r);
        this.name = "PrismaClientValidationError";
        this.clientVersion = n;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    K2(j, "PrismaClientValidationError");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    l();
    function $e2(e) {
      return e === null ? e : Array.isArray(e) ? e.map($e2) : typeof e == "object" ? ws2(e) ? Es(e) : Be(e, $e2) : e;
    }
    __name($e2, "$e");
    function ws2(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    __name(ws2, "ws");
    function Es({ $type: e, value: t }) {
      switch (e) {
        case "BigInt":
          return BigInt(t);
        case "Bytes":
          return b2.from(t, "base64");
        case "DateTime":
          return new Date(t);
        case "Decimal":
          return new ue(t);
        case "Json":
          return JSON.parse(t);
        default:
          be(t, "Unknown tagged value");
      }
    }
    __name(Es, "Es");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Ve(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(Ve, "Ve");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function je(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    __name(je, "je");
    function Bt(e) {
      return e.toString() !== "Invalid Date";
    }
    __name(Bt, "Bt");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    l();
    function Qe(e) {
      return v2.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    __name(Qe, "Qe");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var xs = Fe(Nn());
    var Ps = { red: qe, gray: Sn3, dim: Ft, bold: Dt, underline: vn3, highlightSource: /* @__PURE__ */ __name((e) => e.highlight(), "highlightSource") };
    var vs2 = { red: /* @__PURE__ */ __name((e) => e, "red"), gray: /* @__PURE__ */ __name((e) => e, "gray"), dim: /* @__PURE__ */ __name((e) => e, "dim"), bold: /* @__PURE__ */ __name((e) => e, "bold"), underline: /* @__PURE__ */ __name((e) => e, "underline"), highlightSource: /* @__PURE__ */ __name((e) => e, "highlightSource") };
    function Ts({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${t}()`, message: e, isPanic: r ?? false, callArguments: n };
    }
    __name(Ts, "Ts");
    function Cs({ functionName: e, location: t, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a2 = [""], u = t ? " in" : ":";
      if (n ? (a2.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a2.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${u}`))) : a2.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${u}`)), t && a2.push(s.underline(Rs(t))), i) {
        a2.push("");
        let g = [i.toString()];
        o && (g.push(o), g.push(s.dim(")"))), a2.push(g.join("")), o && a2.push("");
      } else a2.push(""), o && a2.push(o), a2.push("");
      return a2.push(r), a2.join(`
`);
    }
    __name(Cs, "Cs");
    function Rs(e) {
      let t = [e.fileName];
      return e.lineNumber && t.push(String(e.lineNumber)), e.columnNumber && t.push(String(e.columnNumber)), t.join(":");
    }
    __name(Rs, "Rs");
    function Je(e) {
      let t = e.showColors ? Ps : vs2, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(e, t) : r = Ts(e), Cs(r, t);
    }
    __name(Je, "Je");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Yn = Fe(kr());
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Kn(e, t, r) {
      let n = Hn(e), i = As2(n), o = Os2(i);
      o ? $t(o, t, r) : t.addErrorMessage(() => "Unknown error");
    }
    __name(Kn, "Kn");
    function Hn(e) {
      return e.errors.flatMap((t) => t.kind === "Union" ? Hn(t) : [t]);
    }
    __name(Hn, "Hn");
    function As2(e) {
      let t = /* @__PURE__ */ new Map(), r = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = t.get(i);
        o ? t.set(i, { ...n, argument: { ...n.argument, typeNames: Ss2(o.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
      }
      return r.push(...t.values()), r;
    }
    __name(As2, "As");
    function Ss2(e, t) {
      return [...new Set(e.concat(t))];
    }
    __name(Ss2, "Ss");
    function Os2(e) {
      return Or(e, (t, r) => {
        let n = Gn2(t), i = Gn2(r);
        return n !== i ? n - i : Wn(t) - Wn(r);
      });
    }
    __name(Os2, "Os");
    function Gn2(e) {
      let t = 0;
      return Array.isArray(e.selectionPath) && (t += e.selectionPath.length), Array.isArray(e.argumentPath) && (t += e.argumentPath.length), t;
    }
    __name(Gn2, "Gn");
    function Wn(e) {
      switch (e.kind) {
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
    __name(Wn, "Wn");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var te = class {
      static {
        __name(this, "te");
      }
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.isRequired = false;
      }
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.addMarginSymbol(r(this.isRequired ? "+" : "?")), t.write(r(this.name)), this.isRequired || t.write(r("?")), t.write(r(": ")), typeof this.value == "string" ? t.write(r(this.value)) : t.write(this.value);
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Ge2 = class {
      static {
        __name(this, "Ge");
      }
      constructor(t = 0, r) {
        this.context = r;
        this.lines = [];
        this.currentLine = "";
        this.currentIndent = 0;
        this.currentIndent = t;
      }
      write(t) {
        return typeof t == "string" ? this.currentLine += t : t.write(this), this;
      }
      writeJoined(t, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(t);
        return this;
      }
      writeLine(t) {
        return this.write(t).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let t = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, t?.(), this;
      }
      withIndent(t) {
        return this.indent(), t(this), this.unindent(), this;
      }
      afterNextNewline(t) {
        return this.afterNextNewLineCallback = t, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(t) {
        return this.marginSymbol = t, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let t = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Vt = class {
      static {
        __name(this, "Vt");
      }
      constructor(t) {
        this.value = t;
      }
      write(t) {
        t.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var jt = /* @__PURE__ */ __name((e) => e, "jt");
    var Qt2 = { bold: jt, red: jt, green: jt, dim: jt, enabled: false };
    var zn = { bold: Dt, red: qe, green: Tn2, dim: Ft, enabled: true };
    var We2 = { write(e) {
      e.writeLine(",");
    } };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var ce = class {
      static {
        __name(this, "ce");
      }
      constructor(t) {
        this.contents = t;
        this.isUnderlined = false;
        this.color = (t2) => t2;
      }
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(t) {
        return this.color = t, this;
      }
      write(t) {
        let r = t.getCurrentLineLength();
        t.write(this.color(this.contents)), this.isUnderlined && t.afterNextNewline(() => {
          t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var ve = class {
      static {
        __name(this, "ve");
      }
      constructor() {
        this.hasError = false;
      }
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Ke2 = class extends ve {
      static {
        __name(this, "Ke");
      }
      constructor() {
        super(...arguments);
        this.items = [];
      }
      addItem(r) {
        return this.items.push(new Vt(r)), this;
      }
      getField(r) {
        return this.items[r];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
      }
      write(r) {
        if (this.items.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithItems(r);
      }
      writeEmpty(r) {
        let n = new ce("[]");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithItems(r) {
        let { colors: n } = r.context;
        r.writeLine("[").withIndent(() => r.writeJoined(We2, this.items).newLine()).write("]"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var He2 = class e extends ve {
      static {
        __name(this, "e");
      }
      constructor() {
        super(...arguments);
        this.fields = {};
        this.suggestions = [];
      }
      addField(r) {
        this.fields[r.name] = r;
      }
      addSuggestion(r) {
        this.suggestions.push(r);
      }
      getField(r) {
        return this.fields[r];
      }
      getDeepField(r) {
        let [n, ...i] = r, o = this.getField(n);
        if (!o) return;
        let s = o;
        for (let a2 of i) {
          let u;
          if (s.value instanceof e ? u = s.value.getField(a2) : s.value instanceof Ke2 && (u = s.value.getField(Number(a2))), !u) return;
          s = u;
        }
        return s;
      }
      getDeepFieldValue(r) {
        return r.length === 0 ? this : this.getDeepField(r)?.value;
      }
      hasField(r) {
        return !!this.getField(r);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(r) {
        delete this.fields[r];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(r) {
        return this.getField(r)?.value;
      }
      getDeepSubSelectionValue(r) {
        let n = this;
        for (let i of r) {
          if (!(n instanceof e)) return;
          let o = n.getSubSelectionValue(i);
          if (!o) return;
          n = o;
        }
        return n;
      }
      getDeepSelectionParent(r) {
        let n = this.getSelectionParent();
        if (!n) return;
        let i = n;
        for (let o of r) {
          let s = i.value.getFieldValue(o);
          if (!s || !(s instanceof e)) return;
          let a2 = s.getSelectionParent();
          if (!a2) return;
          i = a2;
        }
        return i;
      }
      getSelectionParent() {
        let r = this.getField("select")?.value.asObject();
        if (r) return { kind: "select", value: r };
        let n = this.getField("include")?.value.asObject();
        if (n) return { kind: "include", value: n };
      }
      getSubSelectionValue(r) {
        return this.getSelectionParent()?.value.fields[r].value;
      }
      getPrintWidth() {
        let r = Object.values(this.fields);
        return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2;
      }
      write(r) {
        let n = Object.values(this.fields);
        if (n.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(r);
          return;
        }
        this.writeWithContents(r, n);
      }
      asObject() {
        return this;
      }
      writeEmpty(r) {
        let n = new ce("{}");
        this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
      }
      writeWithContents(r, n) {
        r.writeLine("{").withIndent(() => {
          r.writeJoined(We2, [...n, ...this.suggestions]).newLine();
        }), r.write("}"), this.hasError && r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var W = class extends ve {
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
        let n = new ce(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var mt = class {
      static {
        __name(this, "mt");
      }
      constructor() {
        this.fields = [];
      }
      addField(t, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(t) {
        let { colors: { green: r } } = t.context;
        t.writeLine(r("{")).withIndent(() => {
          t.writeJoined(We2, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function $t(e, t, r) {
      switch (e.kind) {
        case "MutuallyExclusiveFields":
          Ms(e, t);
          break;
        case "IncludeOnScalar":
          Is(e, t);
          break;
        case "EmptySelection":
          Ls2(e, t, r);
          break;
        case "UnknownSelectionField":
          Ns(e, t);
          break;
        case "InvalidSelectionValue":
          Us2(e, t);
          break;
        case "UnknownArgument":
          qs(e, t);
          break;
        case "UnknownInputField":
          Bs(e, t);
          break;
        case "RequiredArgumentMissing":
          $s(e, t);
          break;
        case "InvalidArgumentType":
          Vs2(e, t);
          break;
        case "InvalidArgumentValue":
          js(e, t);
          break;
        case "ValueTooLarge":
          Qs2(e, t);
          break;
        case "SomeFieldsMissing":
          Js2(e, t);
          break;
        case "TooManyFieldsGiven":
          Gs2(e, t);
          break;
        case "Union":
          Kn(e, t, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    __name($t, "$t");
    function Ms(e, t) {
      let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      r && (r.getField(e.firstField)?.markAsError(), r.getField(e.secondField)?.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(Ms, "Ms");
    function Is(e, t) {
      let [r, n] = pt(e.selectionPath), i = e.outputType, o = t.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new te(s.name, "true"));
      t.addErrorMessage((s) => {
        let a2 = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a2 += ` on model ${s.bold(i.name)}. ${dt(s)}` : a2 += ".", a2 += `
Note that ${s.bold("include")} statements only accept relation fields.`, a2;
      });
    }
    __name(Is, "Is");
    function Ls2(e, t, r) {
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          _s2(e, t, i);
          return;
        }
        if (n.hasField("select")) {
          Ds2(e, t);
          return;
        }
      }
      if (r?.[Ve(e.outputType.name)]) {
        Fs(e, t);
        return;
      }
      t.addErrorMessage(() => `Unknown field at "${e.selectionPath.join(".")} selection"`);
    }
    __name(Ls2, "Ls");
    function _s2(e, t, r) {
      r.removeAllFields();
      for (let n of e.outputType.fields) r.addSuggestion(new te(n.name, "false"));
      t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(_s2, "_s");
    function Ds2(e, t) {
      let r = e.outputType, n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), ei(n, r)), t.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${dt(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(Ds2, "Ds");
    function Fs(e, t) {
      let r = new mt();
      for (let i of e.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new te("omit", r).makeRequired();
      if (e.selectionPath.length === 0) t.arguments.addSuggestion(n);
      else {
        let [i, o] = pt(e.selectionPath), a2 = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a2) {
          let u = a2?.value.asObject() ?? new He2();
          u.addSuggestion(n), a2.value = u;
        }
      }
      t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`);
    }
    __name(Fs, "Fs");
    function Ns(e, t) {
      let r = ti(e.selectionPath, t);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            ei(n, e.outputType);
            break;
          case "include":
            Ws(n, e.outputType);
            break;
          case "omit":
            Ks2(n, e.outputType);
            break;
        }
      }
      t.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e.outputType.name}\``)}.`), i.push(dt(n)), i.join(" ");
      });
    }
    __name(Ns, "Ns");
    function Us2(e, t) {
      let r = ti(e.selectionPath, t);
      r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e.underlyingError}`);
    }
    __name(Us2, "Us");
    function qs(e, t) {
      let r = e.argumentPath[0], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), Hs(n, e.arguments)), t.addErrorMessage((i) => Xn(i, r, e.arguments.map((o) => o.name)));
    }
    __name(qs, "qs");
    function Bs(e, t) {
      let [r, n] = pt(e.argumentPath), i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && ri2(o, e.inputType);
      }
      t.addErrorMessage((o) => Xn(o, n, e.inputType.fields.map((s) => s.name)));
    }
    __name(Bs, "Bs");
    function Xn(e, t, r) {
      let n = [`Unknown argument \`${e.red(t)}\`.`], i = Ys2(t, r);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), r.length > 0 && n.push(dt(e)), n.join(" ");
    }
    __name(Xn, "Xn");
    function $s(e, t) {
      let r;
      t.addErrorMessage((u) => r?.value instanceof W && r.value.text === "null" ? `Argument \`${u.green(o)}\` must not be ${u.red("null")}.` : `Argument \`${u.green(o)}\` is missing.`);
      let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = pt(e.argumentPath), s = new mt(), a2 = n.getDeepFieldValue(i)?.asObject();
      if (a2) if (r = a2.getField(o), r && a2.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
        for (let u of e.inputTypes[0].fields) s.addField(u.name, u.typeNames.join(" | "));
        a2.addSuggestion(new te(o, s).makeRequired());
      } else {
        let u = e.inputTypes.map(Zn).join(" | ");
        a2.addSuggestion(new te(o, u).makeRequired());
      }
    }
    __name($s, "$s");
    function Zn(e) {
      return e.kind === "list" ? `${Zn(e.elementType)}[]` : e.name;
    }
    __name(Zn, "Zn");
    function Vs2(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = Jt("or", e.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    __name(Vs2, "Vs");
    function js(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      n && n.getDeepFieldValue(e.argumentPath)?.markAsError(), t.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s = Jt("or", e.argument.typeNames.map((a2) => i.green(a2)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(js, "js");
    function Qs2(e, t) {
      let r = e.argument.name, n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(e.argumentPath)?.value;
        s?.markAsError(), s instanceof W && (i = s.text);
      }
      t.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(Qs2, "Qs");
    function Js2(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
        i && ri2(i, e.inputType);
      }
      t.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Jt("or", e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(dt(i)), o.join(" ");
      });
    }
    __name(Js2, "Js");
    function Gs2(e, t) {
      let r = e.argumentPath[e.argumentPath.length - 1], n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      t.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Jt("and", i.map((a2) => o.red(a2)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(Gs2, "Gs");
    function ei(e, t) {
      for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new te(r.name, "true"));
    }
    __name(ei, "ei");
    function Ws(e, t) {
      for (let r of t.fields) r.isRelation && !e.hasField(r.name) && e.addSuggestion(new te(r.name, "true"));
    }
    __name(Ws, "Ws");
    function Ks2(e, t) {
      for (let r of t.fields) !e.hasField(r.name) && !r.isRelation && e.addSuggestion(new te(r.name, "true"));
    }
    __name(Ks2, "Ks");
    function Hs(e, t) {
      for (let r of t) e.hasField(r.name) || e.addSuggestion(new te(r.name, r.typeNames.join(" | ")));
    }
    __name(Hs, "Hs");
    function ti(e, t) {
      let [r, n] = pt(e), i = t.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a2 = i.getFieldValue("omit")?.asObject(), u = o?.getField(n);
      return o && u ? { parentKind: "select", parent: o, field: u, fieldName: n } : (u = s?.getField(n), s && u ? { parentKind: "include", field: u, parent: s, fieldName: n } : (u = a2?.getField(n), a2 && u ? { parentKind: "omit", field: u, parent: a2, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(ti, "ti");
    function ri2(e, t) {
      if (t.kind === "object") for (let r of t.fields) e.hasField(r.name) || e.addSuggestion(new te(r.name, r.typeNames.join(" | ")));
    }
    __name(ri2, "ri");
    function pt(e) {
      let t = [...e], r = t.pop();
      if (!r) throw new Error("unexpected empty path");
      return [t, r];
    }
    __name(pt, "pt");
    function dt({ green: e, enabled: t }) {
      return "Available options are " + (t ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    __name(dt, "dt");
    function Jt(e, t) {
      if (t.length === 1) return t[0];
      let r = [...t], n = r.pop();
      return `${r.join(", ")} ${e} ${n}`;
    }
    __name(Jt, "Jt");
    var zs2 = 3;
    function Ys2(e, t) {
      let r = 1 / 0, n;
      for (let i of t) {
        let o = (0, Yn.default)(e, i);
        o > zs2 || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(Ys2, "Ys");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function ni2(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(ni2, "ni");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var ft = class {
      static {
        __name(this, "ft");
      }
      constructor(t, r, n, i, o) {
        this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function ze(e) {
      return e instanceof ft;
    }
    __name(ze, "ze");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Gt = Symbol();
    var Mr = /* @__PURE__ */ new WeakMap();
    var xe = class {
      static {
        __name(this, "xe");
      }
      constructor(t) {
        t === Gt ? Mr.set(this, `Prisma.${this._getName()}`) : Mr.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return Mr.get(this);
      }
    };
    var gt2 = class extends xe {
      static {
        __name(this, "gt");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var ht = class extends gt2 {
      static {
        __name(this, "ht");
      }
    };
    Ir(ht, "DbNull");
    var yt = class extends gt2 {
      static {
        __name(this, "yt");
      }
    };
    Ir(yt, "JsonNull");
    var bt = class extends gt2 {
      static {
        __name(this, "bt");
      }
    };
    Ir(bt, "AnyNull");
    var Wt2 = { classes: { DbNull: ht, JsonNull: yt, AnyNull: bt }, instances: { DbNull: new ht(Gt), JsonNull: new yt(Gt), AnyNull: new bt(Gt) } };
    function Ir(e, t) {
      Object.defineProperty(e, "name", { value: t, configurable: true });
    }
    __name(Ir, "Ir");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var ii = ": ";
    var Kt = class {
      static {
        __name(this, "Kt");
      }
      constructor(t, r) {
        this.name = t;
        this.value = r;
        this.hasError = false;
      }
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + ii.length;
      }
      write(t) {
        let r = new ce(this.name);
        this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(ii).write(this.value);
      }
    };
    var Lr = class {
      static {
        __name(this, "Lr");
      }
      constructor(t) {
        this.errorMessages = [];
        this.arguments = t;
      }
      write(t) {
        t.write(this.arguments);
      }
      addErrorMessage(t) {
        this.errorMessages.push(t);
      }
      renderAllMessages(t) {
        return this.errorMessages.map((r) => r(t)).join(`
`);
      }
    };
    function Ye(e) {
      return new Lr(oi(e));
    }
    __name(Ye, "Ye");
    function oi(e) {
      let t = new He2();
      for (let [r, n] of Object.entries(e)) {
        let i = new Kt(r, si(n));
        t.addField(i);
      }
      return t;
    }
    __name(oi, "oi");
    function si(e) {
      if (typeof e == "string") return new W(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean") return new W(String(e));
      if (typeof e == "bigint") return new W(`${e}n`);
      if (e === null) return new W("null");
      if (e === void 0) return new W("undefined");
      if (Qe(e)) return new W(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array) return b2.isBuffer(e) ? new W(`Buffer.alloc(${e.byteLength})`) : new W(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let t = Bt(e) ? e.toISOString() : "Invalid Date";
        return new W(`new Date("${t}")`);
      }
      return e instanceof xe ? new W(`Prisma.${e._getName()}`) : ze(e) ? new W(`prisma.${ni2(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? Xs2(e) : typeof e == "object" ? oi(e) : new W(Object.prototype.toString.call(e));
    }
    __name(si, "si");
    function Xs2(e) {
      let t = new Ke2();
      for (let r of e) t.addItem(si(r));
      return t;
    }
    __name(Xs2, "Xs");
    function Ht(e, t) {
      let r = t === "pretty" ? zn : Qt2, n = e.renderAllMessages(r), i = new Ge2(0, { colors: r }).write(e).toString();
      return { message: n, args: i };
    }
    __name(Ht, "Ht");
    function zt({ args: e, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a2 = Ye(e);
      for (let C of t) $t(C, a2, s);
      let { message: u, args: g } = Ht(a2, r), T2 = Je({ message: u, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: g });
      throw new j(T2, { clientVersion: o });
    }
    __name(zt, "zt");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var me = class {
      static {
        __name(this, "me");
      }
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      get(t) {
        return this._map.get(t)?.value;
      }
      set(t, r) {
        this._map.set(t, { value: r });
      }
      getOrCreate(t, r) {
        let n = this._map.get(t);
        if (n) return n.value;
        let i = r();
        return this.set(t, i), i;
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function wt2(e) {
      let t;
      return { get() {
        return t || (t = { value: e() }), t.value;
      } };
    }
    __name(wt2, "wt");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function pe(e) {
      return e.replace(/^./, (t) => t.toLowerCase());
    }
    __name(pe, "pe");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function li(e, t, r) {
      let n = pe(r);
      return !t.result || !(t.result.$allModels || t.result[n]) ? e : Zs2({ ...e, ...ai(t.name, e, t.result.$allModels), ...ai(t.name, e, t.result[n]) });
    }
    __name(li, "li");
    function Zs2(e) {
      let t = new me(), r = /* @__PURE__ */ __name((n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return Be(e, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Zs2, "Zs");
    function ai(e, t, r) {
      return r ? Be(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: ea(t, o, i) })) : {};
    }
    __name(ai, "ai");
    function ea(e, t, r) {
      let n = e?.[t]?.compute;
      return n ? (i) => r({ ...i, [t]: n(i) }) : r;
    }
    __name(ea, "ea");
    function ui2(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (e[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(ui2, "ui");
    function ci(e, t) {
      if (!t) return e;
      let r = { ...e };
      for (let n of Object.values(t)) if (!e[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(ci, "ci");
    var Yt = class {
      static {
        __name(this, "Yt");
      }
      constructor(t, r) {
        this.extension = t;
        this.previous = r;
        this.computedFieldsCache = new me();
        this.modelExtensionsCache = new me();
        this.queryCallbacksCache = new me();
        this.clientExtensions = wt2(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        this.batchCallbacks = wt2(() => {
          let t2 = this.previous?.getAllBatchQueryCallbacks() ?? [], r2 = this.extension.query?.$__internalBatch;
          return r2 ? t2.concat(r2) : t2;
        });
      }
      getAllComputedFields(t) {
        return this.computedFieldsCache.getOrCreate(t, () => li(this.previous?.getAllComputedFields(t), this.extension, t));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(t) {
        return this.modelExtensionsCache.getOrCreate(t, () => {
          let r = pe(t);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(t) : { ...this.previous?.getAllModelExtensions(t), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(t, r) {
        return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(t, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations) ? n : (o[t] !== void 0 && (o[t][r] !== void 0 && i.push(o[t][r]), o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)), t !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var Xe2 = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.head = t;
      }
      static empty() {
        return new e();
      }
      static single(t) {
        return new e(new Yt(t));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(t) {
        return new e(new Yt(t, this.head));
      }
      getAllComputedFields(t) {
        return this.head?.getAllComputedFields(t);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(t) {
        return this.head?.getAllModelExtensions(t);
      }
      getAllQueryCallbacks(t, r) {
        return this.head?.getAllQueryCallbacks(t, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var mi = Symbol();
    var Et = class {
      static {
        __name(this, "Et");
      }
      constructor(t) {
        if (t !== mi) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(t) {
        return t === void 0 ? Xt2 : t;
      }
    };
    var Xt2 = new Et(mi);
    function de(e) {
      return e instanceof Et;
    }
    __name(de, "de");
    var ta = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var pi2 = "explicitly `undefined` values are not allowed";
    function Zt({ modelName: e, action: t, args: r, runtimeDataModel: n, extensions: i = Xe2.empty(), callsite: o, clientMethod: s, errorFormat: a2, clientVersion: u, previewFeatures: g, globalOmit: T2 }) {
      let C = new _r({ runtimeDataModel: n, modelName: e, action: t, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a2, clientVersion: u, previewFeatures: g, globalOmit: T2 });
      return { modelName: e, action: ta[t], query: xt(r, C) };
    }
    __name(Zt, "Zt");
    function xt({ select: e, include: t, ...r } = {}, n) {
      let i;
      return n.isPreviewFeatureOn("omitApi") && (i = r.omit, delete r.omit), { arguments: fi(r, n), selection: ra(e, t, i, n) };
    }
    __name(xt, "xt");
    function ra(e, t, r, n) {
      return e ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.isPreviewFeatureOn("omitApi") && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), sa(e, n)) : na(n, t, r);
    }
    __name(ra, "ra");
    function na(e, t, r) {
      let n = {};
      return e.modelOrType && !e.isRawAction() && (n.$composites = true, n.$scalars = true), t && ia(n, t, e), e.isPreviewFeatureOn("omitApi") && oa(n, r, e), n;
    }
    __name(na, "na");
    function ia(e, t, r) {
      for (let [n, i] of Object.entries(t)) {
        if (de(i)) continue;
        let o = r.nestSelection(n);
        if (Dr(i, o), i === false || i === void 0) {
          e[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          e[n] = xt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          e[n] = true;
          continue;
        }
        e[n] = xt(i, o);
      }
    }
    __name(ia, "ia");
    function oa(e, t, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o = ci(i, n);
      for (let [s, a2] of Object.entries(o)) {
        if (de(a2)) continue;
        Dr(a2, r.nestSelection(s));
        let u = r.findField(s);
        n?.[s] && !u || (e[s] = !a2);
      }
    }
    __name(oa, "oa");
    function sa(e, t) {
      let r = {}, n = t.getComputedFields(), i = ui2(e, n);
      for (let [o, s] of Object.entries(i)) {
        if (de(s)) continue;
        let a2 = t.nestSelection(o);
        Dr(s, a2);
        let u = t.findField(o);
        if (!(n?.[o] && !u)) {
          if (s === false || s === void 0 || de(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            u?.kind === "object" ? r[o] = xt({}, a2) : r[o] = true;
            continue;
          }
          r[o] = xt(s, a2);
        }
      }
      return r;
    }
    __name(sa, "sa");
    function di(e, t) {
      if (e === null) return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
      if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
      if (je(e)) {
        if (Bt(e)) return { $type: "DateTime", value: e.toISOString() };
        t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (ze(e)) return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e)) return aa(e, t);
      if (ArrayBuffer.isView(e)) return { $type: "Bytes", value: b2.from(e).toString("base64") };
      if (la(e)) return e.values;
      if (Qe(e)) return { $type: "Decimal", value: e.toFixed() };
      if (e instanceof xe) {
        if (e !== Wt2.instances[e._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: e._getName() };
      }
      if (ua(e)) return e.toJSON();
      if (typeof e == "object") return fi(e, t);
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(di, "di");
    function fi(e, t) {
      if (e.$type) return { $type: "Raw", value: e };
      let r = {};
      for (let n in e) {
        let i = e[n], o = t.nestArgument(n);
        de(i) || (i !== void 0 ? r[n] = di(i, o) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: pi2 }));
      }
      return r;
    }
    __name(fi, "fi");
    function aa(e, t) {
      let r = [];
      for (let n = 0; n < e.length; n++) {
        let i = t.nestArgument(String(n)), o = e[n];
        if (o === void 0 || de(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(di(o, i));
      }
      return r;
    }
    __name(aa, "aa");
    function la(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    __name(la, "la");
    function ua(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    __name(ua, "ua");
    function Dr(e, t) {
      e === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: pi2 });
    }
    __name(Dr, "Dr");
    var _r = class e {
      static {
        __name(this, "e");
      }
      constructor(t) {
        this.params = t;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      throwValidationError(t) {
        zt({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
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
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((t) => ({ name: t.name, typeName: "boolean", isRelation: t.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(t) {
        return this.params.previewFeatures.includes(t);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(t) {
        return this.modelOrType?.fields.find((r) => r.name === t);
      }
      nestSelection(t) {
        let r = this.findField(t), n = r?.kind === "object" ? r.type : void 0;
        return new e({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(t) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[Ve(this.params.modelName)] ?? {} : {};
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
            be(this.params.action, "Unknown action");
        }
      }
      nestArgument(t) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Ze = class {
      static {
        __name(this, "Ze");
      }
      constructor(t) {
        this._engine = t;
      }
      prometheus(t) {
        return this._engine.metrics({ format: "prometheus", ...t });
      }
      json(t) {
        return this._engine.metrics({ format: "json", ...t });
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function gi(e) {
      return { models: Fr(e.models), enums: Fr(e.enums), types: Fr(e.types) };
    }
    __name(gi, "gi");
    function Fr(e) {
      let t = {};
      for (let { name: r, ...n } of e) t[r] = n;
      return t;
    }
    __name(Fr, "Fr");
    function hi2(e, t) {
      let r = wt2(() => ca(t));
      Object.defineProperty(e, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(hi2, "hi");
    function ca(e) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(ca, "ca");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Ur = /* @__PURE__ */ new WeakMap();
    var er2 = "$$PrismaTypedSql";
    var qr = class {
      static {
        __name(this, "qr");
      }
      constructor(t, r) {
        Ur.set(this, { sql: t, values: r }), Object.defineProperty(this, er2, { value: er2 });
      }
      get sql() {
        return Ur.get(this).sql;
      }
      get values() {
        return Ur.get(this).values;
      }
    };
    function yi2(e) {
      return (...t) => new qr(e, t);
    }
    __name(yi2, "yi");
    function bi(e) {
      return e != null && e[er2] === er2;
    }
    __name(bi, "bi");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Pt(e) {
      return { ok: false, error: e, map() {
        return Pt(e);
      }, flatMap() {
        return Pt(e);
      } };
    }
    __name(Pt, "Pt");
    var Br = class {
      static {
        __name(this, "Br");
      }
      constructor() {
        this.registeredErrors = [];
      }
      consumeError(t) {
        return this.registeredErrors[t];
      }
      registerNewError(t) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; ) r++;
        return this.registeredErrors[r] = { error: t }, r;
      }
    };
    var $r = /* @__PURE__ */ __name((e) => {
      let t = new Br(), r = fe(t, e.transactionContext.bind(e)), n = { adapterName: e.adapterName, errorRegistry: t, queryRaw: fe(t, e.queryRaw.bind(e)), executeRaw: fe(t, e.executeRaw.bind(e)), provider: e.provider, transactionContext: /* @__PURE__ */ __name(async (...i) => (await r(...i)).map((s) => ma(t, s)), "transactionContext") };
      return e.getConnectionInfo && (n.getConnectionInfo = da(t, e.getConnectionInfo.bind(e))), n;
    }, "$r");
    var ma = /* @__PURE__ */ __name((e, t) => {
      let r = fe(e, t.startTransaction.bind(t));
      return { adapterName: t.adapterName, provider: t.provider, queryRaw: fe(e, t.queryRaw.bind(t)), executeRaw: fe(e, t.executeRaw.bind(t)), startTransaction: /* @__PURE__ */ __name(async (...n) => (await r(...n)).map((o) => pa(e, o)), "startTransaction") };
    }, "ma");
    var pa = /* @__PURE__ */ __name((e, t) => ({ adapterName: t.adapterName, provider: t.provider, options: t.options, queryRaw: fe(e, t.queryRaw.bind(t)), executeRaw: fe(e, t.executeRaw.bind(t)), commit: fe(e, t.commit.bind(t)), rollback: fe(e, t.rollback.bind(t)) }), "pa");
    function fe(e, t) {
      return async (...r) => {
        try {
          return await t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return Pt({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(fe, "fe");
    function da(e, t) {
      return (...r) => {
        try {
          return t(...r);
        } catch (n) {
          let i = e.registerNewError(n);
          return Pt({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(da, "da");
    var Lo = Fe(wi());
    var ek = Fe(Ei2());
    Dn();
    bn();
    Ln();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var X2 = class e {
      static {
        __name(this, "e");
      }
      constructor(t, r) {
        if (t.length - 1 !== r.length) throw t.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${t.length} strings to have ${t.length - 1} values`);
        let n = r.reduce((s, a2) => s + (a2 instanceof e ? a2.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = t[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a2 = t[i];
          if (s instanceof e) {
            this.strings[o] += s.strings[0];
            let u = 0;
            for (; u < s.values.length; ) this.values[o++] = s.values[u++], this.strings[o] = s.strings[u];
            this.strings[o] += a2;
          } else this.values[o++] = s, this.strings[o] = a2;
        }
      }
      get sql() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let t = this.strings.length, r = 1, n = this.strings[0];
        for (; r < t; ) n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    };
    function xi(e, t = ",", r = "", n = "") {
      if (e.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new X2([r, ...Array(e.length - 1).fill(t), n], e);
    }
    __name(xi, "xi");
    function Vr(e) {
      return new X2([e], []);
    }
    __name(Vr, "Vr");
    var Pi2 = Vr("");
    function jr(e, ...t) {
      return new X2(e, t);
    }
    __name(jr, "jr");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function vt(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(t) {
        return e[t];
      } };
    }
    __name(vt, "vt");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function H(e, t) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return t();
      } };
    }
    __name(H, "H");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Ie2(e) {
      let t = new me();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(r) {
        return t.getOrCreate(r, () => e.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return e.getPropertyDescriptor?.(r);
      } };
    }
    __name(Ie2, "Ie");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var tr2 = { enumerable: true, configurable: true, writable: true };
    function rr2(e) {
      let t = new Set(e);
      return { getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => tr2, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => t.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => t.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...t], "ownKeys") };
    }
    __name(rr2, "rr");
    var vi = Symbol.for("nodejs.util.inspect.custom");
    function ge2(e, t) {
      let r = ga(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s) {
        if (n.has(s)) return o[s];
        let a2 = r.get(s);
        return a2 ? a2.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a2 = r.get(s);
        return a2 ? a2.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = Ti(Reflect.ownKeys(o), r), a2 = Ti(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a2, ...n])];
      }, set(o, s, a2) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a2));
      }, getOwnPropertyDescriptor(o, s) {
        let a2 = Reflect.getOwnPropertyDescriptor(o, s);
        if (a2 && !a2.configurable) return a2;
        let u = r.get(s);
        return u ? u.getPropertyDescriptor ? { ...tr2, ...u?.getPropertyDescriptor(s) } : tr2 : a2;
      }, defineProperty(o, s, a2) {
        return n.add(s), Reflect.defineProperty(o, s, a2);
      } });
      return i[vi] = function() {
        let o = { ...this };
        return delete o[vi], o;
      }, i;
    }
    __name(ge2, "ge");
    function ga(e) {
      let t = /* @__PURE__ */ new Map();
      for (let r of e) {
        let n = r.getKeys();
        for (let i of n) t.set(i, r);
      }
      return t;
    }
    __name(ga, "ga");
    function Ti(e, t) {
      return e.filter((r) => t.get(r)?.has?.(r) ?? true);
    }
    __name(Ti, "Ti");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function et2(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(et2, "et");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function nr2(e, t) {
      return { batch: e, transaction: t?.kind === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
    }
    __name(nr2, "nr");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Ci(e) {
      if (e === void 0) return "";
      let t = Ye(e);
      return new Ge2(0, { colors: Qt2 }).write(t).toString();
    }
    __name(Ci, "Ci");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var ha = "P2037";
    function ir2({ error: e, user_facing_error: t }, r, n) {
      return t.error_code ? new J(ya(t, n), { code: t.error_code, clientVersion: r, meta: t.meta, batchRequestIdx: t.batch_request_idx }) : new G(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
    }
    __name(ir2, "ir");
    function ya(e, t) {
      let r = e.message;
      return (t === "postgresql" || t === "postgres" || t === "mysql") && e.error_code === ha && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(ya, "ya");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Qr = class {
      static {
        __name(this, "Qr");
      }
      getLocation() {
        return null;
      }
    };
    function Te(e) {
      return typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new Qr();
    }
    __name(Te, "Te");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Ri = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function tt2(e = {}) {
      let t = wa(e);
      return Object.entries(t).reduce((n, [i, o]) => (Ri[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(tt2, "tt");
    function wa(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    __name(wa, "wa");
    function or2(e = {}) {
      return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
    }
    __name(or2, "or");
    function Ai(e, t) {
      let r = or2(e);
      return t({ action: "aggregate", unpacker: r, argsMapper: tt2 })(e);
    }
    __name(Ai, "Ai");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Ea(e = {}) {
      let { select: t, ...r } = e;
      return typeof t == "object" ? tt2({ ...r, _count: t }) : tt2({ ...r, _count: { _all: true } });
    }
    __name(Ea, "Ea");
    function xa(e = {}) {
      return typeof e.select == "object" ? (t) => or2(e)(t)._count : (t) => or2(e)(t)._count._all;
    }
    __name(xa, "xa");
    function Si(e, t) {
      return t({ action: "count", unpacker: xa(e), argsMapper: Ea })(e);
    }
    __name(Si, "Si");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Pa(e = {}) {
      let t = tt2(e);
      if (Array.isArray(t.by)) for (let r of t.by) typeof r == "string" && (t.select[r] = true);
      else typeof t.by == "string" && (t.select[t.by] = true);
      return t;
    }
    __name(Pa, "Pa");
    function va(e = {}) {
      return (t) => (typeof e?._count == "boolean" && t.forEach((r) => {
        r._count = r._count._all;
      }), t);
    }
    __name(va, "va");
    function Oi(e, t) {
      return t({ action: "groupBy", unpacker: va(e), argsMapper: Pa })(e);
    }
    __name(Oi, "Oi");
    function ki(e, t, r) {
      if (t === "aggregate") return (n) => Ai(n, r);
      if (t === "count") return (n) => Si(n, r);
      if (t === "groupBy") return (n) => Oi(n, r);
    }
    __name(ki, "ki");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Mi(e, t) {
      let r = t.fields.filter((i) => !i.relationName), n = Sr(r, (i) => i.name);
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new ft(e, o, s.type, s.isList, s.kind === "enum");
      }, ...rr2(Object.keys(n)) });
    }
    __name(Mi, "Mi");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Ii = /* @__PURE__ */ __name((e) => Array.isArray(e) ? e : e.split("."), "Ii");
    var Jr = /* @__PURE__ */ __name((e, t) => Ii(t).reduce((r, n) => r && r[n], e), "Jr");
    var Li2 = /* @__PURE__ */ __name((e, t, r) => Ii(t).reduceRight((n, i, o, s) => Object.assign({}, Jr(e, s.slice(0, o)), { [i]: n }), r), "Li");
    function Ta(e, t) {
      return e === void 0 || t === void 0 ? [] : [...t, "select", e];
    }
    __name(Ta, "Ta");
    function Ca(e, t, r) {
      return t === void 0 ? e ?? {} : Li2(t, r, e || true);
    }
    __name(Ca, "Ca");
    function Gr(e, t, r, n, i, o) {
      let a2 = e._runtimeDataModel.models[t].fields.reduce((u, g) => ({ ...u, [g.name]: g }), {});
      return (u) => {
        let g = Te(e._errorFormat), T2 = Ta(n, i), C = Ca(u, o, T2), O2 = r({ dataPath: T2, callsite: g })(C), A = Ra(e, t);
        return new Proxy(O2, { get(M, S2) {
          if (!A.includes(S2)) return M[S2];
          let ne = [a2[S2].type, r, S2], z = [T2, C];
          return Gr(e, ...ne, ...z);
        }, ...rr2([...A, ...Object.getOwnPropertyNames(O2)]) });
      };
    }
    __name(Gr, "Gr");
    function Ra(e, t) {
      return e._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(Ra, "Ra");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function _i2(e, t, r, n) {
      return e === Me.ModelAction.findFirstOrThrow || e === Me.ModelAction.findUniqueOrThrow ? Aa(t, r, n) : n;
    }
    __name(_i2, "_i");
    function Aa(e, t, r) {
      return async (n) => {
        if ("rejectOnNotFound" in n.args) {
          let o = Je({ originalMethod: n.clientMethod, callsite: n.callsite, message: "'rejectOnNotFound' option is not supported" });
          throw new j(o, { clientVersion: t });
        }
        return await r(n).catch((o) => {
          throw o instanceof J && o.code === "P2025" ? new we(`No ${e} found`, t) : o;
        });
      };
    }
    __name(Aa, "Aa");
    var Sa = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var Oa = ["aggregate", "count", "groupBy"];
    function Wr(e, t) {
      let r = e._extensions.getAllModelExtensions(t) ?? {}, n = [ka(e, t), Ia(e, t), vt(r), H("name", () => t), H("$name", () => t), H("$parent", () => e._appliedParent)];
      return ge2({}, n);
    }
    __name(Wr, "Wr");
    function ka(e, t) {
      let r = pe(t), n = Object.keys(Me.ModelAction).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((u) => e._request(u), "s");
        s = _i2(o, t, e._clientVersion, s);
        let a2 = /* @__PURE__ */ __name((u) => (g) => {
          let T2 = Te(e._errorFormat);
          return e._createPrismaPromise((C) => {
            let O2 = { args: g, dataPath: [], action: o, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: C, callsite: T2 };
            return s({ ...O2, ...u });
          });
        }, "a");
        return Sa.includes(o) ? Gr(e, t, a2) : Ma(i) ? ki(e, i, a2) : a2({});
      } };
    }
    __name(ka, "ka");
    function Ma(e) {
      return Oa.includes(e);
    }
    __name(Ma, "Ma");
    function Ia(e, t) {
      return Ie2(H("fields", () => {
        let r = e._runtimeDataModel.models[t];
        return Mi(t, r);
      }));
    }
    __name(Ia, "Ia");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Di(e) {
      return e.replace(/^./, (t) => t.toUpperCase());
    }
    __name(Di, "Di");
    var Kr = Symbol();
    function Tt(e) {
      let t = [La(e), H(Kr, () => e), H("$parent", () => e._appliedParent)], r = e._extensions.getAllClientExtensions();
      return r && t.push(vt(r)), ge2(e, t);
    }
    __name(Tt, "Tt");
    function La(e) {
      let t = Object.keys(e._runtimeDataModel.models), r = t.map(pe), n = [...new Set(t.concat(r))];
      return Ie2({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Di(i);
        if (e._runtimeDataModel.models[o] !== void 0) return Wr(e, o);
        if (e._runtimeDataModel.models[i] !== void 0) return Wr(e, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(La, "La");
    function Fi(e) {
      return e[Kr] ? e[Kr] : e;
    }
    __name(Fi, "Fi");
    function Ni2(e) {
      if (typeof e == "function") return e(this);
      if (e.client?.__AccelerateEngine) {
        let r = e.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return Tt(t);
    }
    __name(Ni2, "Ni");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Ui({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(t);
      if (!o) return e;
      let s = [], a2 = [];
      for (let u of Object.values(o)) {
        if (n) {
          if (n[u.name]) continue;
          let g = u.needs.filter((T2) => n[T2]);
          g.length > 0 && a2.push(et2(g));
        } else if (r) {
          if (!r[u.name]) continue;
          let g = u.needs.filter((T2) => !r[T2]);
          g.length > 0 && a2.push(et2(g));
        }
        _a(e, u.needs) && s.push(Da(u, ge2(e, s)));
      }
      return s.length > 0 || a2.length > 0 ? ge2(e, [...s, ...a2]) : e;
    }
    __name(Ui, "Ui");
    function _a(e, t) {
      return t.every((r) => Ar(e, r));
    }
    __name(_a, "_a");
    function Da(e, t) {
      return Ie2(H(e.name, () => e.compute(t)));
    }
    __name(Da, "Da");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function sr2({ visitor: e, result: t, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(t)) {
        for (let s = 0; s < t.length; s++) t[s] = sr2({ result: t[s], args: r, modelName: i, runtimeDataModel: n, visitor: e });
        return t;
      }
      let o = e(t, i, r) ?? t;
      return r.include && qi2({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), r.select && qi2({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    __name(sr2, "sr");
    function qi2({ includeOrSelect: e, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(e)) {
        if (!s || t[o] == null || de(s)) continue;
        let u = n.models[r].fields.find((T2) => T2.name === o);
        if (!u || u.kind !== "object" || !u.relationName) continue;
        let g = typeof s == "object" ? s : {};
        t[o] = sr2({ visitor: i, result: t[o], args: g, modelName: u.type, runtimeDataModel: n });
      }
    }
    __name(qi2, "qi");
    function Bi({ result: e, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[t] ? e : sr2({ result: e, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a2, u, g) => {
        let T2 = pe(u);
        return Ui({ result: a2, modelName: T2, select: g.select, omit: g.select ? void 0 : { ...o?.[T2], ...g.omit }, extensions: n });
      }, "visitor") });
    }
    __name(Bi, "Bi");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    l();
    function $i(e) {
      if (e instanceof X2) return Fa(e);
      if (Array.isArray(e)) {
        let r = [e[0]];
        for (let n = 1; n < e.length; n++) r[n] = Ct2(e[n]);
        return r;
      }
      let t = {};
      for (let r in e) t[r] = Ct2(e[r]);
      return t;
    }
    __name($i, "$i");
    function Fa(e) {
      return new X2(e.strings, e.values);
    }
    __name(Fa, "Fa");
    function Ct2(e) {
      if (typeof e != "object" || e == null || e instanceof xe || ze(e)) return e;
      if (Qe(e)) return new ue(e.toFixed());
      if (je(e)) return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e)) return e.slice(0);
      if (Array.isArray(e)) {
        let t = e.length, r;
        for (r = Array(t); t--; ) r[t] = Ct2(e[t]);
        return r;
      }
      if (typeof e == "object") {
        let t = {};
        for (let r in e) r === "__proto__" ? Object.defineProperty(t, r, { value: Ct2(e[r]), configurable: true, enumerable: true, writable: true }) : t[r] = Ct2(e[r]);
        return t;
      }
      be(e, "Unknown value");
    }
    __name(Ct2, "Ct");
    function ji(e, t, r, n = 0) {
      return e._createPrismaPromise((i) => {
        let o = t.customDataProxyFetch;
        return "transaction" in t && i !== void 0 && (t.transaction?.kind === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: $i(t.args ?? {}), __internalParams: t, query: /* @__PURE__ */ __name((s, a2 = t) => {
          let u = a2.customDataProxyFetch;
          return a2.customDataProxyFetch = Wi(o, u), a2.args = s, ji(e, a2, r, n + 1);
        }, "query") });
      });
    }
    __name(ji, "ji");
    function Qi2(e, t) {
      let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
      if (e._extensions.isEmpty()) return e._executeRequest(t);
      let s = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return ji(e, t, s);
    }
    __name(Qi2, "Qi");
    function Ji2(e) {
      return (t) => {
        let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? Gi2(r, n, 0, e) : e(r);
      };
    }
    __name(Ji2, "Ji");
    function Gi2(e, t, r, n) {
      if (r === t.length) return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return t[r]({ args: { queries: e.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s, a2 = e) {
        let u = a2.customDataProxyFetch;
        return a2.customDataProxyFetch = Wi(i, u), Gi2(a2, t, r + 1, n);
      } });
    }
    __name(Gi2, "Gi");
    var Vi2 = /* @__PURE__ */ __name((e) => e, "Vi");
    function Wi(e = Vi2, t = Vi2) {
      return (r) => e(t(r));
    }
    __name(Wi, "Wi");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Ki = ee("prisma:client");
    var Hi = { Vercel: "vercel", "Netlify CI": "netlify" };
    function zi({ postinstall: e, ciName: t, clientVersion: r }) {
      if (Ki("checkPlatformCaching:postinstall", e), Ki("checkPlatformCaching:ciName", t), e === true && t && t in Hi) {
        let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Hi[t]}-build`;
        throw console.error(n), new L(n, r);
      }
    }
    __name(zi, "zi");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Yi2(e, t) {
      return e ? e.datasources ? e.datasources : e.datasourceUrl ? { [t[0]]: { url: e.datasourceUrl } } : {} : {};
    }
    __name(Yi2, "Yi");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Na = "Cloudflare-Workers";
    var Ua = "node";
    function Xi2() {
      return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : globalThis.navigator?.userAgent === Na ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : globalThis.process?.release?.name === Ua ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
    }
    __name(Xi2, "Xi");
    var qa = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function Ce() {
      let e = Xi2();
      return { id: e, prettyName: qa[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
    }
    __name(Ce, "Ce");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function ar({ inlineDatasources: e, overrideDatasources: t, env: r, clientVersion: n }) {
      let i, o = Object.keys(e)[0], s = e[o]?.url, a2 = t[o]?.url;
      if (o === void 0 ? i = void 0 : a2 ? i = a2 : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw Ce().id === "workerd" ? new L(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new L(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new L("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(ar, "ar");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Zi(e) {
      if (e?.kind === "itx") return e.options.id;
    }
    __name(Zi, "Zi");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Hr;
    var eo2 = { async loadLibrary(e) {
      let { clientVersion: t, adapter: r, engineWasm: n } = e;
      if (r === void 0) throw new L(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Ce().prettyName})`, t);
      if (n === void 0) throw new L("WASM engine was unexpectedly `undefined`", t);
      Hr === void 0 && (Hr = (async () => {
        let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new L("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t);
        let a2 = { "./query_engine_bg.js": o }, u = new WebAssembly.Instance(s, a2);
        return o.__wbg_set_wasm(u.exports), o.QueryEngine;
      })());
      let i = await Hr;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var Ba = "P2036";
    var he = ee("prisma:client:libraryEngine");
    function $a(e) {
      return e.item_type === "query" && "query" in e;
    }
    __name($a, "$a");
    function Va(e) {
      return "level" in e ? e.level === "error" && e.message === "PANIC" : false;
    }
    __name(Va, "Va");
    var VR = [...Cr, "native"];
    var Rt = class {
      static {
        __name(this, "Rt");
      }
      constructor(t, r) {
        this.name = "LibraryEngine";
        this.libraryLoader = r ?? eo2, this.config = t, this.libraryStarted = false, this.logQueries = t.logQueries ?? false, this.logLevel = t.logLevel ?? "error", this.logEmitter = t.logEmitter, this.datamodel = t.inlineSchema, t.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(t.overrideDatasources)[0], i = t.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(t, r, n) {
        await this.start();
        let i = JSON.stringify(r), o;
        if (t === "start") {
          let a2 = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          o = await this.engine?.startTransaction(a2, i);
        } else t === "commit" ? o = await this.engine?.commitTransaction(n.id, i) : t === "rollback" && (o = await this.engine?.rollbackTransaction(n.id, i));
        let s = this.parseEngineResponse(o);
        if (ja(s)) {
          let a2 = this.getExternalAdapterError(s);
          throw a2 ? a2.error : new J(s.message, { code: s.error_code, clientVersion: this.config.clientVersion, meta: s.meta });
        }
        return s;
      }
      async instantiateLibrary() {
        if (he("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.loadEngine(), this.version();
      }
      async getCurrentBinaryTarget() {
      }
      parseEngineResponse(t) {
        if (!t) throw new G("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(t);
        } catch {
          throw new G("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let t = new w2(this), { adapter: r } = this.config;
            r && he("Using driver adapter: %O", r), this.engine = new this.QueryEngineConstructor({ datamodel: this.datamodel, env: h.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json" }, (n) => {
              t.deref()?.logger(n);
            }, r);
          } catch (t) {
            let r = t, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new L(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(t) {
        let r = this.parseEngineResponse(t);
        if (r) {
          if ("span" in r) {
            this.config.tracingHelper.createEngineSpan(r);
            return;
          }
          r.level = r?.level.toLowerCase() ?? "unknown", $a(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : (Va(r), this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path }));
        }
      }
      parseInitError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      parseRequestError(t) {
        try {
          return JSON.parse(t);
        } catch {
        }
        return t;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return he(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let t = /* @__PURE__ */ __name(async () => {
          he("library starting");
          try {
            let r = { traceparent: this.config.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, he("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new L(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "t");
        return this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan("connect", t), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return he("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) return;
        let t = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setTimeout(n, 5)), he("library stopping");
          let r = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.libraryStarted = false, this.libraryStoppingPromise = void 0, he("library stopped");
        }, "t");
        return this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan("disconnect", t), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(t) {
        return this.library?.debugPanic(t);
      }
      async request(t, { traceparent: r, interactiveTransaction: n }) {
        he(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(t);
        try {
          await this.start(), this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let s = this.parseEngineResponse(await this.executingQueryPromise);
          if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new G(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: s, elapsed: 0 };
        } catch (s) {
          if (s instanceof L) throw s;
          s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
          let a2 = this.parseRequestError(s.message);
          throw typeof a2 == "string" ? s : new G(`${a2.message}
${a2.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(t, { transaction: r, traceparent: n }) {
        he("requestBatch");
        let i = nr2(t, r);
        await this.start(), this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), Zi(r));
        let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
        if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new G(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: a2, errors: u } = s;
        if (Array.isArray(a2)) return a2.map((g) => g.errors && g.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(g.errors[0]) : { data: g, elapsed: 0 });
        throw u && u.length === 1 ? new Error(u[0].error) : new Error(JSON.stringify(s));
      }
      buildQueryError(t) {
        t.user_facing_error.is_panic;
        let r = this.getExternalAdapterError(t.user_facing_error);
        return r ? r.error : ir2(t, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(t) {
        if (t.error_code === Ba && this.config.adapter) {
          let r = t.meta?.id;
          qt2(typeof r == "number", "Malformed external JS error received from the engine");
          let n = this.config.adapter.errorRegistry.consumeError(r);
          return qt2(n, "External error with reported id was not registered"), n;
        }
      }
      async metrics(t) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(t));
        return t.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    };
    function ja(e) {
      return typeof e == "object" && e !== null && e.error_code !== void 0;
    }
    __name(ja, "ja");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var At2 = "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started";
    var lr2 = class {
      static {
        __name(this, "lr");
      }
      constructor(t) {
        this.config = t;
        this.name = "AccelerateEngine";
        this.resolveDatasourceUrl = this.config.accelerateUtils?.resolveDatasourceUrl;
        this.getBatchRequestPayload = this.config.accelerateUtils?.getBatchRequestPayload;
        this.prismaGraphQLToJSError = this.config.accelerateUtils?.prismaGraphQLToJSError;
        this.PrismaClientUnknownRequestError = this.config.accelerateUtils?.PrismaClientUnknownRequestError;
        this.PrismaClientInitializationError = this.config.accelerateUtils?.PrismaClientInitializationError;
        this.PrismaClientKnownRequestError = this.config.accelerateUtils?.PrismaClientKnownRequestError;
        this.debug = this.config.accelerateUtils?.debug;
        this.engineVersion = this.config.accelerateUtils?.engineVersion;
        this.clientVersion = this.config.accelerateUtils?.clientVersion;
      }
      onBeforeExit(t) {
      }
      async start() {
      }
      async stop() {
      }
      version(t) {
        return "unknown";
      }
      transaction(t, r, n) {
        throw new L(At2, this.config.clientVersion);
      }
      metrics(t) {
        throw new L(At2, this.config.clientVersion);
      }
      request(t, r) {
        throw new L(At2, this.config.clientVersion);
      }
      requestBatch(t, r) {
        throw new L(At2, this.config.clientVersion);
      }
      applyPendingMigrations() {
        throw new L(At2, this.config.clientVersion);
      }
    };
    function to2({ copyEngine: e = true }, t) {
      let r;
      try {
        r = ar({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, env: { ...t.env, ...h.env }, clientVersion: t.clientVersion });
      } catch {
      }
      let n = !!(r?.startsWith("prisma://") || r?.startsWith("prisma+postgres://"));
      e && n && ct("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let i = at(t.generator), o = n || !e, s = !!t.adapter, a2 = i === "library", u = i === "binary";
      if (o && s || s && false) {
        let g;
        throw e ? r?.startsWith("prisma://") ? g = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : g = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : g = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new j(g.join(`
`), { clientVersion: t.clientVersion });
      }
      if (s) return new Rt(t);
      if (o) return new lr2(t);
      {
        let g = [`PrismaClient failed to initialize because it wasn't configured to run in this environment (${Ce().prettyName}).`, "In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:", "- Enable Driver Adapters: https://pris.ly/d/driver-adapters", "- Enable Accelerate: https://pris.ly/d/accelerate"];
        throw new j(g.join(`
`), { clientVersion: t.clientVersion });
      }
      throw new j("Invalid client engine type, please use `library` or `binary`", { clientVersion: t.clientVersion });
    }
    __name(to2, "to");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function ur({ generator: e }) {
      return e?.previewFeatures ?? [];
    }
    __name(ur, "ur");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var ro2 = /* @__PURE__ */ __name((e) => ({ command: e }), "ro");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var no2 = /* @__PURE__ */ __name((e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`), "no");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    l();
    function rt(e) {
      try {
        return io2(e, "fast");
      } catch {
        return io2(e, "slow");
      }
    }
    __name(rt, "rt");
    function io2(e, t) {
      return JSON.stringify(e.map((r) => so(r, t)));
    }
    __name(io2, "io");
    function so(e, t) {
      return Array.isArray(e) ? e.map((r) => so(r, t)) : typeof e == "bigint" ? { prisma__type: "bigint", prisma__value: e.toString() } : je(e) ? { prisma__type: "date", prisma__value: e.toJSON() } : ue.isDecimal(e) ? { prisma__type: "decimal", prisma__value: e.toJSON() } : b2.isBuffer(e) ? { prisma__type: "bytes", prisma__value: e.toString("base64") } : Qa(e) || ArrayBuffer.isView(e) ? { prisma__type: "bytes", prisma__value: b2.from(e).toString("base64") } : typeof e == "object" && t === "slow" ? ao(e) : e;
    }
    __name(so, "so");
    function Qa(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Qa, "Qa");
    function ao(e) {
      if (typeof e != "object" || e === null) return e;
      if (typeof e.toJSON == "function") return e.toJSON();
      if (Array.isArray(e)) return e.map(oo);
      let t = {};
      for (let r of Object.keys(e)) t[r] = oo(e[r]);
      return t;
    }
    __name(ao, "ao");
    function oo(e) {
      return typeof e == "bigint" ? e.toString() : ao(e);
    }
    __name(oo, "oo");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Ja = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var lo = Ja;
    var Ga = /^(\s*alter\s)/i;
    var uo = ee("prisma:client");
    function zr2(e, t, r, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && r.length > 0 && Ga.exec(t)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(zr2, "zr");
    var Yr = /* @__PURE__ */ __name(({ clientMethod: e, activeProvider: t }) => (r) => {
      let n = "", i;
      if (bi(r)) n = r.sql, i = { values: rt(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: rt(s || []), __prismaRawParameters__: true };
      } else switch (t) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: rt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: rt(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = no2(r), i = { values: rt(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${t} provider does not support ${e}`);
      }
      return i?.values ? uo(`prisma.${e}(${n}, ${i.values})`) : uo(`prisma.${e}(${n})`), { query: n, parameters: i };
    }, "Yr");
    var co = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new X2(t, r);
    } };
    var mo = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Xr(e) {
      return function(r) {
        let n, i = /* @__PURE__ */ __name((o = e) => {
          try {
            return o === void 0 || o?.kind === "itx" ? n ??= po(r(o)) : po(r(o));
          } catch (s) {
            return Promise.reject(s);
          }
        }, "i");
        return { then(o, s) {
          return i().then(o, s);
        }, catch(o) {
          return i().catch(o);
        }, finally(o) {
          return i().finally(o);
        }, requestTransaction(o) {
          let s = i(o);
          return s.requestTransaction ? s.requestTransaction(o) : s;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(Xr, "Xr");
    function po(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    __name(po, "po");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var fo = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, async createEngineSpan() {
    }, getActiveContext() {
    }, runInChildSpan(e, t) {
      return t();
    } };
    var Zr = class {
      static {
        __name(this, "Zr");
      }
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(t) {
        return this.getGlobalTracingHelper().getTraceParent(t);
      }
      createEngineSpan(t) {
        return this.getGlobalTracingHelper().createEngineSpan(t);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(t, r) {
        return this.getGlobalTracingHelper().runInChildSpan(t, r);
      }
      getGlobalTracingHelper() {
        return globalThis.PRISMA_INSTRUMENTATION?.helper ?? fo;
      }
    };
    function go(e) {
      return e.includes("tracing") ? new Zr() : fo;
    }
    __name(go, "go");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function ho(e, t = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --e === 0 && r(t()), i?.(n);
      } };
    }
    __name(ho, "ho");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function yo(e) {
      return typeof e == "string" ? e : e.reduce((t, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
      }, void 0);
    }
    __name(yo, "yo");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var cr = class {
      static {
        __name(this, "cr");
      }
      constructor() {
        this._middlewares = [];
      }
      use(t) {
        this._middlewares.push(t);
      }
      get(t) {
        return this._middlewares[t];
      }
      has(t) {
        return !!this._middlewares[t];
      }
      length() {
        return this._middlewares.length;
      }
    };
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Eo = Fe(Vn());
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function mr(e) {
      return typeof e.batchRequestIdx == "number";
    }
    __name(mr, "mr");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function bo(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
      let t = [];
      return e.modelName && t.push(e.modelName), e.query.arguments && t.push(en(e.query.arguments)), t.push(en(e.query.selection)), t.join("");
    }
    __name(bo, "bo");
    function en(e) {
      return `(${Object.keys(e).sort().map((r) => {
        let n = e[r];
        return typeof n == "object" && n !== null ? `(${r} ${en(n)})` : r;
      }).join(" ")})`;
    }
    __name(en, "en");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Wa = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateOne: true, upsertOne: true };
    function tn(e) {
      return Wa[e];
    }
    __name(tn, "tn");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var pr = class {
      static {
        __name(this, "pr");
      }
      constructor(t) {
        this.options = t;
        this.tickActive = false;
        this.batches = {};
      }
      request(t) {
        let r = this.options.batchBy(t);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, h.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        })) : this.options.singleLoader(t);
      }
      dispatchBatches() {
        for (let t in this.batches) {
          let r = this.batches[t];
          delete this.batches[t], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
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
    c();
    m2();
    p2();
    d2();
    f();
    l();
    l();
    function Le(e, t) {
      if (t === null) return t;
      switch (e) {
        case "bigint":
          return BigInt(t);
        case "bytes":
          return b2.from(t, "base64");
        case "decimal":
          return new ue(t);
        case "datetime":
        case "date":
          return new Date(t);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
        case "bigint-array":
          return t.map((r) => Le("bigint", r));
        case "bytes-array":
          return t.map((r) => Le("bytes", r));
        case "decimal-array":
          return t.map((r) => Le("decimal", r));
        case "datetime-array":
          return t.map((r) => Le("datetime", r));
        case "date-array":
          return t.map((r) => Le("date", r));
        case "time-array":
          return t.map((r) => Le("time", r));
        default:
          return t;
      }
    }
    __name(Le, "Le");
    function wo(e) {
      let t = [], r = Ka(e);
      for (let n = 0; n < e.rows.length; n++) {
        let i = e.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++) o[e.columns[s]] = Le(e.types[s], i[s]);
        t.push(o);
      }
      return t;
    }
    __name(wo, "wo");
    function Ka(e) {
      let t = {};
      for (let r = 0; r < e.columns.length; r++) t[e.columns[r]] = null;
      return t;
    }
    __name(Ka, "Ka");
    var Ha = ee("prisma:client:request_handler");
    var dr = class {
      static {
        __name(this, "dr");
      }
      constructor(t, r) {
        this.logEmitter = r, this.client = t, this.dataloader = new pr({ batchLoader: Ji2(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a2 = n.map((C) => C.protocolQuery), u = this.client._tracingHelper.getTraceParent(s), g = n.some((C) => tn(C.protocolQuery.action));
          return (await this.client._engine.requestBatch(a2, { traceparent: u, transaction: za(o), containsWrite: g, customDataProxyFetch: i })).map((C, O2) => {
            if (C instanceof Error) return C;
            try {
              return this.mapQueryEngineResult(n[O2], C);
            } catch (A) {
              return A;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? xo(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: tn(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : bo(n.protocolQuery), "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(t) {
        try {
          return await this.dataloader.request(t);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a2 } = t;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a2, globalOmit: t.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
        let i = n?.data, o = n?.elapsed, s = this.unpack(i, t, r);
        return h.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
      }
      handleAndLogRequestError(t) {
        try {
          this.handleRequestError(t);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a2 }) {
        if (Ha(t), Ya(t, i) || t instanceof we) throw t;
        if (t instanceof J && Xa(t)) {
          let g = Po(t.meta);
          zt({ args: o, errors: [g], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a2 });
        }
        let u = t.message;
        if (n && (u = Je({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: u })), u = this.sanitizeMessage(u), t.code) {
          let g = s ? { modelName: s, ...t.meta } : t.meta;
          throw new J(u, { code: t.code, clientVersion: this.client._clientVersion, meta: g, batchRequestIdx: t.batchRequestIdx });
        } else {
          if (t.isPanic) throw new Ee(u, this.client._clientVersion);
          if (t instanceof G) throw new G(u, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
          if (t instanceof L) throw new L(u, this.client._clientVersion);
          if (t instanceof Ee) throw new Ee(u, this.client._clientVersion);
        }
        throw t.clientVersion = this.client._clientVersion, t;
      }
      sanitizeMessage(t) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Eo.default)(t) : t;
      }
      unpack(t, r, n) {
        if (!t || (t.data && (t = t.data), !t)) return t;
        let i = Object.keys(t)[0], o = Object.values(t)[0], s = r.filter((g) => g !== "select" && g !== "include"), a2 = Jr(o, s), u = i === "queryRaw" ? wo(a2) : $e2(a2);
        return n ? n(u) : u;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function za(e) {
      if (e) {
        if (e.kind === "batch") return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
        if (e.kind === "itx") return { kind: "itx", options: xo(e) };
        be(e, "Unknown transaction kind");
      }
    }
    __name(za, "za");
    function xo(e) {
      return { id: e.id, payload: e.payload };
    }
    __name(xo, "xo");
    function Ya(e, t) {
      return mr(e) && t?.kind === "batch" && e.batchRequestIdx !== t.index;
    }
    __name(Ya, "Ya");
    function Xa(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    __name(Xa, "Xa");
    function Po(e) {
      if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(Po) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...t] = e.selectionPath;
        return { ...e, selectionPath: t };
      }
      return e;
    }
    __name(Po, "Po");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var vo = "5.22.0";
    var To = vo;
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var Oo = Fe(kr());
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var _ = class extends Error {
      static {
        __name(this, "_");
      }
      constructor(t) {
        super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    K2(_, "PrismaClientConstructorValidationError");
    var Co = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var Ro = ["pretty", "colorless", "minimal"];
    var Ao = ["info", "query", "warn", "error"];
    var el = { datasources: /* @__PURE__ */ __name((e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e)) throw new _(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = nt(r, t) || ` Available datasources: ${t.join(", ")}`;
            throw new _(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new _(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new _(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new _(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((e, t) => {
      if (e === null) return;
      if (e === void 0) throw new _('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!ur(t).includes("driverAdapters")) throw new _('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (at() === "binary") throw new _('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((e) => {
      if (typeof e < "u" && typeof e != "string") throw new _(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((e) => {
      if (e) {
        if (typeof e != "string") throw new _(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Ro.includes(e)) {
          let t = nt(e, Ro);
          throw new _(`Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      if (!Array.isArray(e)) throw new _(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function t(r) {
        if (typeof r == "string" && !Ao.includes(r)) {
          let n = nt(r, Ao);
          throw new _(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(t, "t");
      for (let r of e) {
        t(r);
        let n = { level: t, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = nt(i, o);
            throw new _(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new _(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = e.maxWait;
      if (t != null && t <= 0) throw new _(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = e.timeout;
      if (r != null && r <= 0) throw new _(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((e, t) => {
      if (typeof e != "object") throw new _('"omit" option is expected to be an object.');
      if (e === null) throw new _('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(e)) {
        let o = rl(n, t.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a2] of Object.entries(i)) {
          let u = o.fields.find((g) => g.name === s);
          if (!u) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (u.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a2 != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new _(nl(e, r));
    }, "omit"), __internal: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object") throw new _(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(e)) if (!t.includes(r)) {
        let n = nt(r, t);
        throw new _(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function ko(e, t) {
      for (let [r, n] of Object.entries(e)) {
        if (!Co.includes(r)) {
          let i = nt(r, Co);
          throw new _(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        el[r](n, t);
      }
      if (e.datasourceUrl && e.datasources) throw new _('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(ko, "ko");
    function nt(e, t) {
      if (t.length === 0 || typeof e != "string") return "";
      let r = tl(e, t);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(nt, "nt");
    function tl(e, t) {
      if (t.length === 0) return null;
      let r = t.map((i) => ({ value: i, distance: (0, Oo.default)(e, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(tl, "tl");
    function rl(e, t) {
      return So(t.models, e) ?? So(t.types, e);
    }
    __name(rl, "rl");
    function So(e, t) {
      let r = Object.keys(e).find((n) => Ve(n) === t);
      if (r) return e[r];
    }
    __name(So, "So");
    function nl(e, t) {
      let r = Ye(e);
      for (let o of t) switch (o.kind) {
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
      let { message: n, args: i } = Ht(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(nl, "nl");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    function Mo(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
        let n = new Array(e.length), i = null, o = false, s = 0, a2 = /* @__PURE__ */ __name(() => {
          o || (s++, s === e.length && (o = true, i ? r(i) : t(n)));
        }, "a"), u = /* @__PURE__ */ __name((g) => {
          o || (o = true, r(g));
        }, "u");
        for (let g = 0; g < e.length; g++) e[g].then((T2) => {
          n[g] = T2, a2();
        }, (T2) => {
          if (!mr(T2)) {
            u(T2);
            return;
          }
          T2.batchRequestIdx === g ? u(T2) : (i || (i = T2), a2());
        });
      });
    }
    __name(Mo, "Mo");
    var Re = ee("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var il = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((e) => e, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((e) => e, "middlewareArgsToRequestArgs") };
    var ol = Symbol.for("prisma.client.transaction.id");
    var sl = { id: 0, nextId() {
      return ++this.id;
    } };
    function _o(e) {
      class t {
        static {
          __name(this, "t");
        }
        constructor(n) {
          this._originalClient = this;
          this._middlewares = new cr();
          this._createPrismaPromise = Xr();
          this.$extends = Ni2;
          e = n?.__internal?.configOverride?.(e) ?? e, zi(e), n && ko(n, e);
          let i = new Ut2().on("error", () => {
          });
          this._extensions = Xe2.empty(), this._previewFeatures = ur(e), this._clientVersion = e.clientVersion ?? To, this._activeProvider = e.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = go(this._previewFeatures);
          let o = { rootEnvPath: e.relativeEnvPaths.rootEnvPath && st.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath), schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && st.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = $r(n.adapter);
            let u = e.activeProvider === "postgresql" ? "postgres" : e.activeProvider;
            if (s.provider !== u) throw new L(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${u}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new L("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a2 = e.injectableEdgeEnv?.();
          try {
            let u = n ?? {}, g = u.__internal ?? {}, T2 = g.debug === true;
            T2 && ee.enable("prisma:client");
            let C = st.resolve(e.dirname, e.relativePath);
            yn.existsSync(C) || (C = e.dirname), Re("dirname", e.dirname), Re("relativePath", e.relativePath), Re("cwd", C);
            let O2 = g.engine || {};
            if (u.errorFormat ? this._errorFormat = u.errorFormat : h.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : h.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { cwd: C, dirname: e.dirname, enableDebugLogs: T2, allowTriggerPanic: O2.allowTriggerPanic, datamodelPath: st.join(e.dirname, e.filename ?? "schema.prisma"), prismaPath: O2.binaryPath ?? void 0, engineEndpoint: O2.endpoint, generator: e.generator, showColors: this._errorFormat === "pretty", logLevel: u.log && yo(u.log), logQueries: u.log && !!(typeof u.log == "string" ? u.log === "query" : u.log.find((A) => typeof A == "string" ? A === "query" : A.level === "query")), env: a2?.parsed ?? {}, flags: [], engineWasm: e.engineWasm, clientVersion: e.clientVersion, engineVersion: e.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, overrideDatasources: Yi2(u, e.datasourceNames), inlineDatasources: e.inlineDatasources, inlineSchemaHash: e.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: u.transactionOptions?.maxWait ?? 2e3, timeout: u.transactionOptions?.timeout ?? 5e3, isolationLevel: u.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: e.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: ar, getBatchRequestPayload: nr2, prismaGraphQLToJSError: ir2, PrismaClientUnknownRequestError: G, PrismaClientInitializationError: L, PrismaClientKnownRequestError: J, debug: ee("prisma:client:accelerateEngine"), engineVersion: Lo.version, clientVersion: e.clientVersion } }, Re("clientVersion", e.clientVersion), this._engine = to2(e, this._engineConfig), this._requestHandler = new dr(this, i), u.log) for (let A of u.log) {
              let M = typeof A == "string" ? A : A.emit === "stdout" ? A.level : null;
              M && this.$on(M, (S2) => {
                ut.log(`${ut.tags[M] ?? ""}`, S2.message || S2.query);
              });
            }
            this._metrics = new Ze(this._engine);
          } catch (u) {
            throw u.clientVersion = this._clientVersion, u;
          }
          return this._appliedParent = Tt(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $use(n) {
          this._middlewares.use(n);
        }
        $on(n, i) {
          n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i);
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
            Mn();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a2 = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: Yr({ clientMethod: i, activeProvider: a2 }), callsite: Te(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a2] = Io(n, i);
              return zr2(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a2);
            }
            throw new j("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (zr2(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb") throw new j(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: ro2, callsite: Te(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a2 = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: Yr({ clientMethod: i, activeProvider: a2 }), callsite: Te(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Io(n, i));
            throw new j("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new j("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = sl.nextId(), s = ho(n.length), a2 = n.map((u, g) => {
            if (u?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let T2 = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, C = { kind: "batch", id: o, index: g, isolationLevel: T2, lock: s };
            return u.requestTransaction?.(C) ?? u;
          });
          return Mo(a2);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a2 = await this._engine.transaction("start", o, s), u;
          try {
            let g = { kind: "itx", ...a2 };
            u = await n(this._createItxClient(g)), await this._engine.transaction("commit", o, a2);
          } catch (g) {
            throw await this._engine.transaction("rollback", o, a2).catch(() => {
            }), g;
          }
          return u;
        }
        _createItxClient(n) {
          return Tt(ge2(Fi(this), [H("_appliedParent", () => this._appliedParent._createItxClient(n)), H("_createPrismaPromise", () => Xr(n)), H(ol, () => n.id), et2(lo)]));
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
          let i = n.middlewareArgsMapper ?? il, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a2 = -1, u = /* @__PURE__ */ __name(async (g) => {
            let T2 = this._middlewares.get(++a2);
            if (T2) return this._tracingHelper.runInChildSpan(s.middleware, (I2) => T2(g, (ne) => (I2?.end(), u(ne))));
            let { runInTransaction: C, args: O2, ...A } = g, M = { ...n, ...A };
            O2 && (M.args = i.middlewareArgsToRequestArgs(O2)), n.transaction !== void 0 && C === false && delete M.transaction;
            let S2 = await Qi2(this, M);
            return M.model ? Bi({ result: S2, modelName: M.model, args: M.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : S2;
          }, "u");
          return this._tracingHelper.runInChildSpan(s.operation, () => u(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a2, model: u, argsMapper: g, transaction: T2, unpacker: C, otelParentCtx: O2, customDataProxyFetch: A }) {
          try {
            n = g ? g(n) : n;
            let M = { name: "serialize" }, S2 = this._tracingHelper.runInChildSpan(M, () => Zt({ modelName: u, runtimeDataModel: this._runtimeDataModel, action: a2, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return ee.enabled("prisma:client") && (Re("Prisma Client call:"), Re(`prisma.${i}(${Ci(n)})`), Re("Generated request:"), Re(JSON.stringify(S2, null, 2) + `
`)), T2?.kind === "batch" && await T2.lock, this._requestHandler.request({ protocolQuery: S2, modelName: u, action: a2, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: T2, unpacker: C, otelParentCtx: O2, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: A });
          } catch (M) {
            throw M.clientVersion = this._clientVersion, M;
          }
        }
        get $metrics() {
          if (!this._hasPreviewFlag("metrics")) throw new j("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: this._clientVersion });
          return this._metrics;
        }
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
      }
      return t;
    }
    __name(_o, "_o");
    function Io(e, t) {
      return al(e) ? [new X2(e, t), co] : [e, mo];
    }
    __name(Io, "Io");
    function al(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    __name(al, "al");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    var ll = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Do(e) {
      return new Proxy(e, { get(t, r) {
        if (r in t) return t[r];
        if (!ll.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Do, "Do");
    c();
    m2();
    p2();
    d2();
    f();
    l();
    l();
  }
});

// node_modules/.prisma/client/query_engine_bg.js
var require_query_engine_bg = __commonJS({
  "node_modules/.prisma/client/query_engine_bg.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var j = Object.defineProperty;
    var R = Object.getOwnPropertyDescriptor;
    var D = Object.getOwnPropertyNames;
    var M = Object.prototype.hasOwnProperty;
    var U = /* @__PURE__ */ __name((t, e) => {
      for (var n in e) j(t, n, { get: e[n], enumerable: true });
    }, "U");
    var B = /* @__PURE__ */ __name((t, e, n, _) => {
      if (e && typeof e == "object" || typeof e == "function") for (let o of D(e)) !M.call(t, o) && o !== n && j(t, o, { get: /* @__PURE__ */ __name(() => e[o], "get"), enumerable: !(_ = R(e, o)) || _.enumerable });
      return t;
    }, "B");
    var N = /* @__PURE__ */ __name((t) => B(j({}, "__esModule", { value: true }), t), "N");
    var Ee = {};
    U(Ee, { QueryEngine: /* @__PURE__ */ __name(() => G, "QueryEngine"), __wbg_String_88810dfeb4021902: /* @__PURE__ */ __name(() => Dt, "__wbg_String_88810dfeb4021902"), __wbg_buffer_344d9b41efe96da7: /* @__PURE__ */ __name(() => Ut2, "__wbg_buffer_344d9b41efe96da7"), __wbg_call_53fc3abd42e24ec8: /* @__PURE__ */ __name(() => fe, "__wbg_call_53fc3abd42e24ec8"), __wbg_call_669127b9d730c650: /* @__PURE__ */ __name(() => Kt, "__wbg_call_669127b9d730c650"), __wbg_crypto_58f13aa23ffcb166: /* @__PURE__ */ __name(() => zt, "__wbg_crypto_58f13aa23ffcb166"), __wbg_done_bc26bf4ada718266: /* @__PURE__ */ __name(() => te, "__wbg_done_bc26bf4ada718266"), __wbg_entries_6d727b73ee02b7ce: /* @__PURE__ */ __name(() => me, "__wbg_entries_6d727b73ee02b7ce"), __wbg_exec_393fa168a3695345: /* @__PURE__ */ __name(() => Ft, "__wbg_exec_393fa168a3695345"), __wbg_getRandomValues_504510b5564925af: /* @__PURE__ */ __name(() => $t, "__wbg_getRandomValues_504510b5564925af"), __wbg_getTime_ed6ee333b702f8fc: /* @__PURE__ */ __name(() => ct, "__wbg_getTime_ed6ee333b702f8fc"), __wbg_get_2aff440840bb6202: /* @__PURE__ */ __name(() => re, "__wbg_get_2aff440840bb6202"), __wbg_get_4a9aa5157afeb382: /* @__PURE__ */ __name(() => Xt2, "__wbg_get_4a9aa5157afeb382"), __wbg_get_94990005bd6ca07c: /* @__PURE__ */ __name(() => Rt, "__wbg_get_94990005bd6ca07c"), __wbg_getwithrefkey_5e6d9547403deab8: /* @__PURE__ */ __name(() => Et, "__wbg_getwithrefkey_5e6d9547403deab8"), __wbg_globalThis_17eff828815f7d84: /* @__PURE__ */ __name(() => ce, "__wbg_globalThis_17eff828815f7d84"), __wbg_global_46f939f6541643c5: /* @__PURE__ */ __name(() => ie, "__wbg_global_46f939f6541643c5"), __wbg_has_cdf8b85f6e903c80: /* @__PURE__ */ __name(() => rt, "__wbg_has_cdf8b85f6e903c80"), __wbg_instanceof_ArrayBuffer_c7cc317e5c29cc0d: /* @__PURE__ */ __name(() => ye, "__wbg_instanceof_ArrayBuffer_c7cc317e5c29cc0d"), __wbg_instanceof_Promise_cfbcc42300367513: /* @__PURE__ */ __name(() => at, "__wbg_instanceof_Promise_cfbcc42300367513"), __wbg_instanceof_Uint8Array_19e6f142a5e7e1e1: /* @__PURE__ */ __name(() => xe, "__wbg_instanceof_Uint8Array_19e6f142a5e7e1e1"), __wbg_isArray_38525be7442aa21e: /* @__PURE__ */ __name(() => se, "__wbg_isArray_38525be7442aa21e"), __wbg_isSafeInteger_c38b0a16d0c7cef7: /* @__PURE__ */ __name(() => ae, "__wbg_isSafeInteger_c38b0a16d0c7cef7"), __wbg_iterator_7ee1a391d310f8e4: /* @__PURE__ */ __name(() => gt2, "__wbg_iterator_7ee1a391d310f8e4"), __wbg_length_a5587d6cd79ab197: /* @__PURE__ */ __name(() => le, "__wbg_length_a5587d6cd79ab197"), __wbg_length_cace2e0b3ddc0502: /* @__PURE__ */ __name(() => bt, "__wbg_length_cace2e0b3ddc0502"), __wbg_msCrypto_abcb1295e768d1f2: /* @__PURE__ */ __name(() => Qt2, "__wbg_msCrypto_abcb1295e768d1f2"), __wbg_new0_ad75dd38f92424e2: /* @__PURE__ */ __name(() => ot, "__wbg_new0_ad75dd38f92424e2"), __wbg_new_00f9fd9cefd9f65c: /* @__PURE__ */ __name(() => vt, "__wbg_new_00f9fd9cefd9f65c"), __wbg_new_08236689f0afb357: /* @__PURE__ */ __name(() => Tt, "__wbg_new_08236689f0afb357"), __wbg_new_1b94180eeb48f2a2: /* @__PURE__ */ __name(() => St, "__wbg_new_1b94180eeb48f2a2"), __wbg_new_c728d68b8b34487e: /* @__PURE__ */ __name(() => At2, "__wbg_new_c728d68b8b34487e"), __wbg_new_d8a000788389a31e: /* @__PURE__ */ __name(() => Nt, "__wbg_new_d8a000788389a31e"), __wbg_new_feb65b865d980ae2: /* @__PURE__ */ __name(() => Y, "__wbg_new_feb65b865d980ae2"), __wbg_newnoargs_ccdcae30fd002262: /* @__PURE__ */ __name(() => ue, "__wbg_newnoargs_ccdcae30fd002262"), __wbg_newwithbyteoffsetandlength_2dc04d99088b15e3: /* @__PURE__ */ __name(() => Bt, "__wbg_newwithbyteoffsetandlength_2dc04d99088b15e3"), __wbg_newwithlength_13b5319ab422dcf6: /* @__PURE__ */ __name(() => Ht, "__wbg_newwithlength_13b5319ab422dcf6"), __wbg_next_15da6a3df9290720: /* @__PURE__ */ __name(() => ne, "__wbg_next_15da6a3df9290720"), __wbg_next_1989a20442400aaa: /* @__PURE__ */ __name(() => Zt, "__wbg_next_1989a20442400aaa"), __wbg_node_523d7bd03ef69fba: /* @__PURE__ */ __name(() => Wt2, "__wbg_node_523d7bd03ef69fba"), __wbg_now_28a6b413aca4a96a: /* @__PURE__ */ __name(() => we, "__wbg_now_28a6b413aca4a96a"), __wbg_now_4579335d3581594c: /* @__PURE__ */ __name(() => st, "__wbg_now_4579335d3581594c"), __wbg_now_8ed1a4454e40ecd1: /* @__PURE__ */ __name(() => ut, "__wbg_now_8ed1a4454e40ecd1"), __wbg_parse_3f0cb48976ca4123: /* @__PURE__ */ __name(() => _t, "__wbg_parse_3f0cb48976ca4123"), __wbg_process_5b786e71d465a513: /* @__PURE__ */ __name(() => Lt, "__wbg_process_5b786e71d465a513"), __wbg_push_fd3233d09cf81821: /* @__PURE__ */ __name(() => kt, "__wbg_push_fd3233d09cf81821"), __wbg_randomFillSync_a0d98aa11c81fe89: /* @__PURE__ */ __name(() => Vt, "__wbg_randomFillSync_a0d98aa11c81fe89"), __wbg_require_2784e593a4674877: /* @__PURE__ */ __name(() => Jt, "__wbg_require_2784e593a4674877"), __wbg_resolve_a3252b2860f0a09e: /* @__PURE__ */ __name(() => Oe, "__wbg_resolve_a3252b2860f0a09e"), __wbg_self_3fad056edded10bd: /* @__PURE__ */ __name(() => _e2, "__wbg_self_3fad056edded10bd"), __wbg_setTimeout_631fe61f31fa2fad: /* @__PURE__ */ __name(() => Z, "__wbg_setTimeout_631fe61f31fa2fad"), __wbg_set_0ac78a2bc07da03c: /* @__PURE__ */ __name(() => It, "__wbg_set_0ac78a2bc07da03c"), __wbg_set_3355b9f2d3092e3b: /* @__PURE__ */ __name(() => jt, "__wbg_set_3355b9f2d3092e3b"), __wbg_set_40f7786a25a9cc7e: /* @__PURE__ */ __name(() => be, "__wbg_set_40f7786a25a9cc7e"), __wbg_set_841ac57cff3d672b: /* @__PURE__ */ __name(() => qt2, "__wbg_set_841ac57cff3d672b"), __wbg_set_dcfd613a3420f908: /* @__PURE__ */ __name(() => de, "__wbg_set_dcfd613a3420f908"), __wbg_set_wasm: /* @__PURE__ */ __name(() => C, "__wbg_set_wasm"), __wbg_stringify_4039297315a25b00: /* @__PURE__ */ __name(() => ge2, "__wbg_stringify_4039297315a25b00"), __wbg_subarray_6ca5cfa7fbb9abbe: /* @__PURE__ */ __name(() => Ct2, "__wbg_subarray_6ca5cfa7fbb9abbe"), __wbg_then_1bbc9edafd859b06: /* @__PURE__ */ __name(() => je, "__wbg_then_1bbc9edafd859b06"), __wbg_then_89e1c559530b85cf: /* @__PURE__ */ __name(() => Ae2, "__wbg_then_89e1c559530b85cf"), __wbg_valueOf_ff4b62641803432a: /* @__PURE__ */ __name(() => Yt, "__wbg_valueOf_ff4b62641803432a"), __wbg_value_0570714ff7d75f35: /* @__PURE__ */ __name(() => ee, "__wbg_value_0570714ff7d75f35"), __wbg_versions_c2ab80650590b6a2: /* @__PURE__ */ __name(() => Pt, "__wbg_versions_c2ab80650590b6a2"), __wbg_window_a4f46c98a61d4089: /* @__PURE__ */ __name(() => oe, "__wbg_window_a4f46c98a61d4089"), __wbindgen_bigint_from_i64: /* @__PURE__ */ __name(() => pt, "__wbindgen_bigint_from_i64"), __wbindgen_bigint_from_u64: /* @__PURE__ */ __name(() => yt, "__wbindgen_bigint_from_u64"), __wbindgen_bigint_get_as_i64: /* @__PURE__ */ __name(() => Te, "__wbindgen_bigint_get_as_i64"), __wbindgen_boolean_get: /* @__PURE__ */ __name(() => dt, "__wbindgen_boolean_get"), __wbindgen_cb_drop: /* @__PURE__ */ __name(() => Se2, "__wbindgen_cb_drop"), __wbindgen_closure_wrapper7038: /* @__PURE__ */ __name(() => qe, "__wbindgen_closure_wrapper7038"), __wbindgen_debug_string: /* @__PURE__ */ __name(() => Ie2, "__wbindgen_debug_string"), __wbindgen_error_new: /* @__PURE__ */ __name(() => X2, "__wbindgen_error_new"), __wbindgen_in: /* @__PURE__ */ __name(() => xt, "__wbindgen_in"), __wbindgen_is_bigint: /* @__PURE__ */ __name(() => lt, "__wbindgen_is_bigint"), __wbindgen_is_function: /* @__PURE__ */ __name(() => Gt, "__wbindgen_is_function"), __wbindgen_is_object: /* @__PURE__ */ __name(() => ft, "__wbindgen_is_object"), __wbindgen_is_string: /* @__PURE__ */ __name(() => Ot, "__wbindgen_is_string"), __wbindgen_is_undefined: /* @__PURE__ */ __name(() => nt, "__wbindgen_is_undefined"), __wbindgen_jsval_eq: /* @__PURE__ */ __name(() => mt, "__wbindgen_jsval_eq"), __wbindgen_jsval_loose_eq: /* @__PURE__ */ __name(() => pe, "__wbindgen_jsval_loose_eq"), __wbindgen_memory: /* @__PURE__ */ __name(() => Mt, "__wbindgen_memory"), __wbindgen_number_get: /* @__PURE__ */ __name(() => wt2, "__wbindgen_number_get"), __wbindgen_number_new: /* @__PURE__ */ __name(() => ht, "__wbindgen_number_new"), __wbindgen_object_clone_ref: /* @__PURE__ */ __name(() => et2, "__wbindgen_object_clone_ref"), __wbindgen_object_drop_ref: /* @__PURE__ */ __name(() => it, "__wbindgen_object_drop_ref"), __wbindgen_string_get: /* @__PURE__ */ __name(() => K2, "__wbindgen_string_get"), __wbindgen_string_new: /* @__PURE__ */ __name(() => tt2, "__wbindgen_string_new"), __wbindgen_throw: /* @__PURE__ */ __name(() => he, "__wbindgen_throw"), debug_panic: /* @__PURE__ */ __name(() => Q, "debug_panic"), getBuildTimeInfo: /* @__PURE__ */ __name(() => J, "getBuildTimeInfo") });
    module.exports = N(Ee);
    var T2 = /* @__PURE__ */ __name(() => {
    }, "T");
    T2.prototype = T2;
    var c;
    function C(t) {
      c = t;
    }
    __name(C, "C");
    var w2 = new Array(128).fill(void 0);
    w2.push(void 0, null, true, false);
    function r(t) {
      return w2[t];
    }
    __name(r, "r");
    var a2 = 0;
    var I2 = null;
    function S2() {
      return (I2 === null || I2.byteLength === 0) && (I2 = new Uint8Array(c.memory.buffer)), I2;
    }
    __name(S2, "S");
    var $ = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
    var A = new $("utf-8");
    var V = typeof A.encodeInto == "function" ? function(t, e) {
      return A.encodeInto(t, e);
    } : function(t, e) {
      const n = A.encode(t);
      return e.set(n), { read: t.length, written: n.length };
    };
    function d2(t, e, n) {
      if (n === void 0) {
        const s = A.encode(t), y = e(s.length, 1) >>> 0;
        return S2().subarray(y, y + s.length).set(s), a2 = s.length, y;
      }
      let _ = t.length, o = e(_, 1) >>> 0;
      const f = S2();
      let u = 0;
      for (; u < _; u++) {
        const s = t.charCodeAt(u);
        if (s > 127) break;
        f[o + u] = s;
      }
      if (u !== _) {
        u !== 0 && (t = t.slice(u)), o = n(o, _, _ = u + t.length * 3, 1) >>> 0;
        const s = S2().subarray(o + u, o + _), y = V(t, s);
        u += y.written, o = n(o, _, u, 1) >>> 0;
      }
      return a2 = u, o;
    }
    __name(d2, "d");
    function p2(t) {
      return t == null;
    }
    __name(p2, "p");
    var m2 = null;
    function l() {
      return (m2 === null || m2.buffer.detached === true || m2.buffer.detached === void 0 && m2.buffer !== c.memory.buffer) && (m2 = new DataView(c.memory.buffer)), m2;
    }
    __name(l, "l");
    var z = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
    var q = new z("utf-8", { ignoreBOM: true, fatal: true });
    q.decode();
    function x2(t, e) {
      return t = t >>> 0, q.decode(S2().subarray(t, t + e));
    }
    __name(x2, "x");
    var h = w2.length;
    function i(t) {
      h === w2.length && w2.push(w2.length + 1);
      const e = h;
      return h = w2[e], w2[e] = t, e;
    }
    __name(i, "i");
    function L(t) {
      t < 132 || (w2[t] = h, h = t);
    }
    __name(L, "L");
    function b2(t) {
      const e = r(t);
      return L(t), e;
    }
    __name(b2, "b");
    function O2(t) {
      const e = typeof t;
      if (e == "number" || e == "boolean" || t == null) return `${t}`;
      if (e == "string") return `"${t}"`;
      if (e == "symbol") {
        const o = t.description;
        return o == null ? "Symbol" : `Symbol(${o})`;
      }
      if (e == "function") {
        const o = t.name;
        return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
      }
      if (Array.isArray(t)) {
        const o = t.length;
        let f = "[";
        o > 0 && (f += O2(t[0]));
        for (let u = 1; u < o; u++) f += ", " + O2(t[u]);
        return f += "]", f;
      }
      const n = /\[object ([^\]]+)\]/.exec(toString.call(t));
      let _;
      if (n.length > 1) _ = n[1];
      else return toString.call(t);
      if (_ == "Object") try {
        return "Object(" + JSON.stringify(t) + ")";
      } catch {
        return "Object";
      }
      return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : _;
    }
    __name(O2, "O");
    var E = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((t) => {
      c.__wbindgen_export_2.get(t.dtor)(t.a, t.b);
    });
    function P(t, e, n, _) {
      const o = { a: t, b: e, cnt: 1, dtor: n }, f = /* @__PURE__ */ __name((...u) => {
        o.cnt++;
        const s = o.a;
        o.a = 0;
        try {
          return _(s, o.b, ...u);
        } finally {
          --o.cnt === 0 ? (c.__wbindgen_export_2.get(o.dtor)(s, o.b), E.unregister(o)) : o.a = s;
        }
      }, "f");
      return f.original = o, E.register(f, o, o), f;
    }
    __name(P, "P");
    function W(t, e, n) {
      c._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h9eef02caf99553a1(t, e, i(n));
    }
    __name(W, "W");
    function J() {
      const t = c.getBuildTimeInfo();
      return b2(t);
    }
    __name(J, "J");
    function Q(t) {
      try {
        const f = c.__wbindgen_add_to_stack_pointer(-16);
        var e = p2(t) ? 0 : d2(t, c.__wbindgen_malloc, c.__wbindgen_realloc), n = a2;
        c.debug_panic(f, e, n);
        var _ = l().getInt32(f + 4 * 0, true), o = l().getInt32(f + 4 * 1, true);
        if (o) throw b2(_);
      } finally {
        c.__wbindgen_add_to_stack_pointer(16);
      }
    }
    __name(Q, "Q");
    function g(t, e) {
      try {
        return t.apply(this, e);
      } catch (n) {
        c.__wbindgen_exn_store(i(n));
      }
    }
    __name(g, "g");
    function H(t, e, n, _) {
      c.wasm_bindgen__convert__closures__invoke2_mut__h174c8485536aed69(t, e, i(n), i(_));
    }
    __name(H, "H");
    var k2 = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((t) => c.__wbg_queryengine_free(t >>> 0, 1));
    var G = class {
      static {
        __name(this, "G");
      }
      __destroy_into_raw() {
        const e = this.__wbg_ptr;
        return this.__wbg_ptr = 0, k2.unregister(this), e;
      }
      free() {
        const e = this.__destroy_into_raw();
        c.__wbg_queryengine_free(e, 0);
      }
      constructor(e, n, _) {
        try {
          const s = c.__wbindgen_add_to_stack_pointer(-16);
          c.queryengine_new(s, i(e), i(n), i(_));
          var o = l().getInt32(s + 4 * 0, true), f = l().getInt32(s + 4 * 1, true), u = l().getInt32(s + 4 * 2, true);
          if (u) throw b2(f);
          return this.__wbg_ptr = o >>> 0, k2.register(this, this.__wbg_ptr, this), this;
        } finally {
          c.__wbindgen_add_to_stack_pointer(16);
        }
      }
      connect(e) {
        const n = d2(e, c.__wbindgen_malloc, c.__wbindgen_realloc), _ = a2, o = c.queryengine_connect(this.__wbg_ptr, n, _);
        return b2(o);
      }
      disconnect(e) {
        const n = d2(e, c.__wbindgen_malloc, c.__wbindgen_realloc), _ = a2, o = c.queryengine_disconnect(this.__wbg_ptr, n, _);
        return b2(o);
      }
      query(e, n, _) {
        const o = d2(e, c.__wbindgen_malloc, c.__wbindgen_realloc), f = a2, u = d2(n, c.__wbindgen_malloc, c.__wbindgen_realloc), s = a2;
        var y = p2(_) ? 0 : d2(_, c.__wbindgen_malloc, c.__wbindgen_realloc), v2 = a2;
        const F = c.queryengine_query(this.__wbg_ptr, o, f, u, s, y, v2);
        return b2(F);
      }
      startTransaction(e, n) {
        const _ = d2(e, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2, f = d2(n, c.__wbindgen_malloc, c.__wbindgen_realloc), u = a2, s = c.queryengine_startTransaction(this.__wbg_ptr, _, o, f, u);
        return b2(s);
      }
      commitTransaction(e, n) {
        const _ = d2(e, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2, f = d2(n, c.__wbindgen_malloc, c.__wbindgen_realloc), u = a2, s = c.queryengine_commitTransaction(this.__wbg_ptr, _, o, f, u);
        return b2(s);
      }
      rollbackTransaction(e, n) {
        const _ = d2(e, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2, f = d2(n, c.__wbindgen_malloc, c.__wbindgen_realloc), u = a2, s = c.queryengine_rollbackTransaction(this.__wbg_ptr, _, o, f, u);
        return b2(s);
      }
      metrics(e) {
        const n = d2(e, c.__wbindgen_malloc, c.__wbindgen_realloc), _ = a2, o = c.queryengine_metrics(this.__wbg_ptr, n, _);
        return b2(o);
      }
    };
    function K2(t, e) {
      const n = r(e), _ = typeof n == "string" ? n : void 0;
      var o = p2(_) ? 0 : d2(_, c.__wbindgen_malloc, c.__wbindgen_realloc), f = a2;
      l().setInt32(t + 4 * 1, f, true), l().setInt32(t + 4 * 0, o, true);
    }
    __name(K2, "K");
    function X2(t, e) {
      const n = new Error(x2(t, e));
      return i(n);
    }
    __name(X2, "X");
    function Y(t, e) {
      try {
        var n = { a: t, b: e }, _ = /* @__PURE__ */ __name((f, u) => {
          const s = n.a;
          n.a = 0;
          try {
            return H(s, n.b, f, u);
          } finally {
            n.a = s;
          }
        }, "_");
        const o = new Promise(_);
        return i(o);
      } finally {
        n.a = n.b = 0;
      }
    }
    __name(Y, "Y");
    function Z(t, e) {
      return setTimeout(r(t), e >>> 0);
    }
    __name(Z, "Z");
    function tt2(t, e) {
      const n = x2(t, e);
      return i(n);
    }
    __name(tt2, "tt");
    function et2(t) {
      const e = r(t);
      return i(e);
    }
    __name(et2, "et");
    function nt(t) {
      return r(t) === void 0;
    }
    __name(nt, "nt");
    function rt() {
      return g(function(t, e) {
        return Reflect.has(r(t), r(e));
      }, arguments);
    }
    __name(rt, "rt");
    function _t() {
      return g(function(t, e) {
        const n = JSON.parse(x2(t, e));
        return i(n);
      }, arguments);
    }
    __name(_t, "_t");
    function ot() {
      return i(/* @__PURE__ */ new Date());
    }
    __name(ot, "ot");
    function ct(t) {
      return r(t).getTime();
    }
    __name(ct, "ct");
    function it(t) {
      b2(t);
    }
    __name(it, "it");
    function ut(t) {
      return r(t).now();
    }
    __name(ut, "ut");
    function st() {
      return Date.now();
    }
    __name(st, "st");
    function ft(t) {
      const e = r(t);
      return typeof e == "object" && e !== null;
    }
    __name(ft, "ft");
    function at(t) {
      let e;
      try {
        e = r(t) instanceof Promise;
      } catch {
        e = false;
      }
      return e;
    }
    __name(at, "at");
    function bt(t) {
      return r(t).length;
    }
    __name(bt, "bt");
    function gt2() {
      return i(Symbol.iterator);
    }
    __name(gt2, "gt");
    function dt(t) {
      const e = r(t);
      return typeof e == "boolean" ? e ? 1 : 0 : 2;
    }
    __name(dt, "dt");
    function lt(t) {
      return typeof r(t) == "bigint";
    }
    __name(lt, "lt");
    function wt2(t, e) {
      const n = r(e), _ = typeof n == "number" ? n : void 0;
      l().setFloat64(t + 8 * 1, p2(_) ? 0 : _, true), l().setInt32(t + 4 * 0, !p2(_), true);
    }
    __name(wt2, "wt");
    function pt(t) {
      return i(t);
    }
    __name(pt, "pt");
    function xt(t, e) {
      return r(t) in r(e);
    }
    __name(xt, "xt");
    function yt(t) {
      const e = BigInt.asUintN(64, t);
      return i(e);
    }
    __name(yt, "yt");
    function mt(t, e) {
      return r(t) === r(e);
    }
    __name(mt, "mt");
    function ht(t) {
      return i(t);
    }
    __name(ht, "ht");
    function Tt() {
      const t = new Array();
      return i(t);
    }
    __name(Tt, "Tt");
    function It(t, e, n) {
      r(t)[e >>> 0] = b2(n);
    }
    __name(It, "It");
    function St() {
      return i(/* @__PURE__ */ new Map());
    }
    __name(St, "St");
    function At2() {
      const t = new Object();
      return i(t);
    }
    __name(At2, "At");
    function jt(t, e, n) {
      const _ = r(t).set(r(e), r(n));
      return i(_);
    }
    __name(jt, "jt");
    function Ot(t) {
      return typeof r(t) == "string";
    }
    __name(Ot, "Ot");
    function qt2(t, e, n) {
      r(t)[b2(e)] = b2(n);
    }
    __name(qt2, "qt");
    function Et(t, e) {
      const n = r(t)[r(e)];
      return i(n);
    }
    __name(Et, "Et");
    function kt(t, e) {
      return r(t).push(r(e));
    }
    __name(kt, "kt");
    function vt(t, e, n, _) {
      const o = new RegExp(x2(t, e), x2(n, _));
      return i(o);
    }
    __name(vt, "vt");
    function Ft(t, e, n) {
      const _ = r(t).exec(x2(e, n));
      return p2(_) ? 0 : i(_);
    }
    __name(Ft, "Ft");
    function Rt() {
      return g(function(t, e) {
        const n = r(t)[b2(e)];
        return i(n);
      }, arguments);
    }
    __name(Rt, "Rt");
    function Dt(t, e) {
      const n = String(r(e)), _ = d2(n, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2;
      l().setInt32(t + 4 * 1, o, true), l().setInt32(t + 4 * 0, _, true);
    }
    __name(Dt, "Dt");
    function Mt() {
      const t = c.memory;
      return i(t);
    }
    __name(Mt, "Mt");
    function Ut2(t) {
      const e = r(t).buffer;
      return i(e);
    }
    __name(Ut2, "Ut");
    function Bt(t, e, n) {
      const _ = new Uint8Array(r(t), e >>> 0, n >>> 0);
      return i(_);
    }
    __name(Bt, "Bt");
    function Nt(t) {
      const e = new Uint8Array(r(t));
      return i(e);
    }
    __name(Nt, "Nt");
    function Ct2(t, e, n) {
      const _ = r(t).subarray(e >>> 0, n >>> 0);
      return i(_);
    }
    __name(Ct2, "Ct");
    function $t() {
      return g(function(t, e) {
        r(t).getRandomValues(r(e));
      }, arguments);
    }
    __name($t, "$t");
    function Vt() {
      return g(function(t, e) {
        r(t).randomFillSync(b2(e));
      }, arguments);
    }
    __name(Vt, "Vt");
    function zt(t) {
      const e = r(t).crypto;
      return i(e);
    }
    __name(zt, "zt");
    function Lt(t) {
      const e = r(t).process;
      return i(e);
    }
    __name(Lt, "Lt");
    function Pt(t) {
      const e = r(t).versions;
      return i(e);
    }
    __name(Pt, "Pt");
    function Wt2(t) {
      const e = r(t).node;
      return i(e);
    }
    __name(Wt2, "Wt");
    function Jt() {
      return g(function() {
        const t = module.require;
        return i(t);
      }, arguments);
    }
    __name(Jt, "Jt");
    function Qt2(t) {
      const e = r(t).msCrypto;
      return i(e);
    }
    __name(Qt2, "Qt");
    function Ht(t) {
      const e = new Uint8Array(t >>> 0);
      return i(e);
    }
    __name(Ht, "Ht");
    function Gt(t) {
      return typeof r(t) == "function";
    }
    __name(Gt, "Gt");
    function Kt() {
      return g(function(t, e) {
        const n = r(t).call(r(e));
        return i(n);
      }, arguments);
    }
    __name(Kt, "Kt");
    function Xt2(t, e) {
      const n = r(t)[e >>> 0];
      return i(n);
    }
    __name(Xt2, "Xt");
    function Yt(t) {
      return r(t).valueOf();
    }
    __name(Yt, "Yt");
    function Zt() {
      return g(function(t) {
        const e = r(t).next();
        return i(e);
      }, arguments);
    }
    __name(Zt, "Zt");
    function te(t) {
      return r(t).done;
    }
    __name(te, "te");
    function ee(t) {
      const e = r(t).value;
      return i(e);
    }
    __name(ee, "ee");
    function ne(t) {
      const e = r(t).next;
      return i(e);
    }
    __name(ne, "ne");
    function re() {
      return g(function(t, e) {
        const n = Reflect.get(r(t), r(e));
        return i(n);
      }, arguments);
    }
    __name(re, "re");
    function _e2() {
      return g(function() {
        const t = self.self;
        return i(t);
      }, arguments);
    }
    __name(_e2, "_e");
    function oe() {
      return g(function() {
        const t = window.window;
        return i(t);
      }, arguments);
    }
    __name(oe, "oe");
    function ce() {
      return g(function() {
        const t = globalThis.globalThis;
        return i(t);
      }, arguments);
    }
    __name(ce, "ce");
    function ie() {
      return g(function() {
        const t = global.global;
        return i(t);
      }, arguments);
    }
    __name(ie, "ie");
    function ue(t, e) {
      const n = new T2(x2(t, e));
      return i(n);
    }
    __name(ue, "ue");
    function se(t) {
      return Array.isArray(r(t));
    }
    __name(se, "se");
    function fe() {
      return g(function(t, e, n) {
        const _ = r(t).call(r(e), r(n));
        return i(_);
      }, arguments);
    }
    __name(fe, "fe");
    function ae(t) {
      return Number.isSafeInteger(r(t));
    }
    __name(ae, "ae");
    function be() {
      return g(function(t, e, n) {
        return Reflect.set(r(t), r(e), r(n));
      }, arguments);
    }
    __name(be, "be");
    function ge2() {
      return g(function(t) {
        const e = JSON.stringify(r(t));
        return i(e);
      }, arguments);
    }
    __name(ge2, "ge");
    function de(t, e, n) {
      r(t).set(r(e), n >>> 0);
    }
    __name(de, "de");
    function le(t) {
      return r(t).length;
    }
    __name(le, "le");
    function we() {
      return g(function() {
        return Date.now();
      }, arguments);
    }
    __name(we, "we");
    function pe(t, e) {
      return r(t) == r(e);
    }
    __name(pe, "pe");
    function xe(t) {
      let e;
      try {
        e = r(t) instanceof Uint8Array;
      } catch {
        e = false;
      }
      return e;
    }
    __name(xe, "xe");
    function ye(t) {
      let e;
      try {
        e = r(t) instanceof ArrayBuffer;
      } catch {
        e = false;
      }
      return e;
    }
    __name(ye, "ye");
    function me(t) {
      const e = Object.entries(r(t));
      return i(e);
    }
    __name(me, "me");
    function he(t, e) {
      throw new Error(x2(t, e));
    }
    __name(he, "he");
    function Te(t, e) {
      const n = r(e), _ = typeof n == "bigint" ? n : void 0;
      l().setBigInt64(t + 8 * 1, p2(_) ? BigInt(0) : _, true), l().setInt32(t + 4 * 0, !p2(_), true);
    }
    __name(Te, "Te");
    function Ie2(t, e) {
      const n = O2(r(e)), _ = d2(n, c.__wbindgen_malloc, c.__wbindgen_realloc), o = a2;
      l().setInt32(t + 4 * 1, o, true), l().setInt32(t + 4 * 0, _, true);
    }
    __name(Ie2, "Ie");
    function Se2(t) {
      const e = b2(t).original;
      return e.cnt-- == 1 ? (e.a = 0, true) : false;
    }
    __name(Se2, "Se");
    function Ae2(t, e) {
      const n = r(t).then(r(e));
      return i(n);
    }
    __name(Ae2, "Ae");
    function je(t, e, n) {
      const _ = r(t).then(r(e), r(n));
      return i(_);
    }
    __name(je, "je");
    function Oe(t) {
      const e = Promise.resolve(r(t));
      return i(e);
    }
    __name(Oe, "Oe");
    function qe(t, e, n) {
      const _ = P(t, e, 541, W);
      return i(_);
    }
    __name(qe, "qe");
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
    init_checked_fetch();
    init_modules_watch_stub();
    wasm_worker_loader_default = import("./8552dff651243a79886dd7f71c5a50258a0caeed-query_engine_bg.wasm");
  }
});

// node_modules/.prisma/client/wasm.js
var require_wasm2 = __commonJS({
  "node_modules/.prisma/client/wasm.js"(exports) {
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      NotFoundError: NotFoundError2,
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
      getRuntime: getRuntime2
    } = require_wasm();
    var Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "5.22.0",
      engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.NotFoundError = NotFoundError2;
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
      createdAt: "createdAt"
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
      shippingAddress: "shippingAddress",
      note: "note",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
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
    exports.Prisma.TravelPostScalarFieldEnum = {
      id: "id",
      title: "title",
      content: "content",
      summary: "summary",
      category: "category",
      tags: "tags",
      imageUrl: "imageUrl",
      images: "images",
      author: "author",
      isPublished: "isPublished",
      viewCount: "viewCount",
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
    exports.Prisma.ModelName = {
      User: "User",
      QiancaiDouTransaction: "QiancaiDouTransaction",
      Product: "Product",
      Order: "Order",
      OrderItem: "OrderItem",
      OfflineCourse: "OfflineCourse",
      CourseSchedule: "CourseSchedule",
      UserAppointment: "UserAppointment",
      TravelPost: "TravelPost"
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
      "clientVersion": "5.22.0",
      "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "postgresql",
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": 'generator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\n// \u7528\u6237\u6A21\u578B\nmodel User {\n  id                Int      @id @default(autoincrement())\n  email             String   @unique\n  passwordHash      String\n  qiancaiDouBalance Int      @default(0)\n  firstName         String?\n  lastName          String?\n  avatarUrl         String?\n  language          String   @default("zh")\n  createdAt         DateTime @default(now())\n  updatedAt         DateTime @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  qiancaiDouTransactions QiancaiDouTransaction[]\n  orders                 Order[]\n  appointments           UserAppointment[]\n\n  @@map("users")\n}\n\n// \u4EDF\u5F69\u8C46\u4EA4\u6613\u8BB0\u5F55\nmodel QiancaiDouTransaction {\n  id          Int      @id @default(autoincrement())\n  userId      Int\n  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  amount      Int // \u6B63\u6570\u4E3A\u589E\u52A0\uFF0C\u8D1F\u6570\u4E3A\u51CF\u5C11\n  newBalance  Int // \u4EA4\u6613\u540E\u7684\u4F59\u989D\n  reason      String // \u4EA4\u6613\u539F\u56E0: ADMIN_ADJUSTMENT, PRODUCT_REDEMPTION, APPOINTMENT_FEE, TASK_REWARD\n  description String? // \u8BE6\u7EC6\u63CF\u8FF0\n  refTable    String? // \u5173\u8054\u8868\u540D\n  refId       String? // \u5173\u8054\u8BB0\u5F55ID\n  createdAt   DateTime @default(now())\n\n  @@map("qiancaidou_transactions")\n}\n\n// \u5546\u54C1\u6A21\u578B\nmodel Product {\n  id                Int      @id @default(autoincrement())\n  title             String\n  description       String\n  images            String[] @default([])\n  priceInQiancaiDou Int // \u4EDF\u5F69\u8C46\u4EF7\u683C\n  stock             Int      @default(0)\n  category          String   @default("general")\n  isActive          Boolean  @default(true)\n  createdAt         DateTime @default(now())\n  updatedAt         DateTime @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  orderItems OrderItem[]\n\n  @@map("products")\n}\n\n// \u8BA2\u5355\u6A21\u578B\nmodel Order {\n  id              Int      @id @default(autoincrement())\n  userId          Int\n  user            User     @relation(fields: [userId], references: [id])\n  totalCost       Int // \u603B\u4EDF\u5F69\u8C46\u6D88\u8D39\n  status          String   @default("PENDING") // PENDING, PROCESSING, SHIPPED, COMPLETED, CANCELLED\n  shippingAddress String?\n  note            String?\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  items OrderItem[]\n\n  @@map("orders")\n}\n\n// \u8BA2\u5355\u9879\u76EE\nmodel OrderItem {\n  id         Int     @id @default(autoincrement())\n  orderId    Int\n  order      Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  productId  Int\n  product    Product @relation(fields: [productId], references: [id])\n  quantity   Int\n  unitPrice  Int // \u5355\u4EF7\uFF08\u4EDF\u5F69\u8C46\uFF09\n  totalPrice Int // \u5C0F\u8BA1\uFF08\u4EDF\u5F69\u8C46\uFF09\n\n  @@map("order_items")\n}\n\n// \u7EBF\u4E0B\u8BFE\u7A0B\nmodel OfflineCourse {\n  id          Int      @id @default(autoincrement())\n  title       String\n  description String\n  instructor  String?\n  category    String // ENGLISH_ORAL, AI_PROGRAMMING\n  duration    Int? // \u8BFE\u7A0B\u65F6\u957F\uFF08\u5206\u949F\uFF09\n  imageUrl    String?\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  // \u5173\u8054\u5173\u7CFB\n  schedules CourseSchedule[]\n\n  @@map("offline_courses")\n}\n\n// \u8BFE\u7A0B\u65F6\u95F4\u5B89\u6392\nmodel CourseSchedule {\n  id              Int           @id @default(autoincrement())\n  courseId        Int\n  course          OfflineCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)\n  startTime       DateTime\n  endTime         DateTime\n  location        String? // \u4E0A\u8BFE\u5730\u70B9\n  capacity        Int           @default(10)\n  bookedSlots     Int           @default(0)\n  feeInQiancaiDou Int           @default(0) // \u9884\u7EA6\u8D39\u7528\n  isActive        Boolean       @default(true)\n  createdAt       DateTime      @default(now())\n\n  // \u5173\u8054\u5173\u7CFB\n  appointments UserAppointment[]\n\n  @@map("course_schedules")\n}\n\n// \u7528\u6237\u9884\u7EA6\nmodel UserAppointment {\n  id         Int            @id @default(autoincrement())\n  userId     Int\n  user       User           @relation(fields: [userId], references: [id])\n  scheduleId Int\n  schedule   CourseSchedule @relation(fields: [scheduleId], references: [id])\n  status     String         @default("BOOKED") // BOOKED, CANCELLED, COMPLETED, NO_SHOW\n  note       String? // \u7528\u6237\u5907\u6CE8\n  createdAt  DateTime       @default(now())\n  updatedAt  DateTime       @updatedAt\n\n  @@unique([userId, scheduleId])\n  @@map("user_appointments")\n}\n\n// \u65C5\u6E38\u6587\u7AE0\nmodel TravelPost {\n  id          Int      @id @default(autoincrement())\n  title       String\n  content     String\n  summary     String?\n  category    String // DOMESTIC, INTERNATIONAL\n  tags        String[] @default([])\n  imageUrl    String?\n  images      String[] @default([])\n  author      String?\n  isPublished Boolean  @default(false)\n  viewCount   Int      @default(0)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  @@map("travel_posts")\n}\n',
      "inlineSchemaHash": "6ede9e1b2618a5dc01a1b3359cba0372eb69206311fd2f211d72e6001dd4d6b8",
      "copyEngine": true
    };
    config.dirname = "/";
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"email","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String"},{"name":"qiancaiDouBalance","kind":"scalar","type":"Int"},{"name":"firstName","kind":"scalar","type":"String"},{"name":"lastName","kind":"scalar","type":"String"},{"name":"avatarUrl","kind":"scalar","type":"String"},{"name":"language","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"qiancaiDouTransactions","kind":"object","type":"QiancaiDouTransaction","relationName":"QiancaiDouTransactionToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"appointments","kind":"object","type":"UserAppointment","relationName":"UserToUserAppointment"}],"dbName":"users"},"QiancaiDouTransaction":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"QiancaiDouTransactionToUser"},{"name":"amount","kind":"scalar","type":"Int"},{"name":"newBalance","kind":"scalar","type":"Int"},{"name":"reason","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"refTable","kind":"scalar","type":"String"},{"name":"refId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"qiancaidou_transactions"},"Product":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"priceInQiancaiDou","kind":"scalar","type":"Int"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"category","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToProduct"}],"dbName":"products"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"totalCost","kind":"scalar","type":"Int"},{"name":"status","kind":"scalar","type":"String"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"productId","kind":"scalar","type":"Int"},{"name":"product","kind":"object","type":"Product","relationName":"OrderItemToProduct"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unitPrice","kind":"scalar","type":"Int"},{"name":"totalPrice","kind":"scalar","type":"Int"}],"dbName":"order_items"},"OfflineCourse":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"instructor","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"schedules","kind":"object","type":"CourseSchedule","relationName":"CourseScheduleToOfflineCourse"}],"dbName":"offline_courses"},"CourseSchedule":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"courseId","kind":"scalar","type":"Int"},{"name":"course","kind":"object","type":"OfflineCourse","relationName":"CourseScheduleToOfflineCourse"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"location","kind":"scalar","type":"String"},{"name":"capacity","kind":"scalar","type":"Int"},{"name":"bookedSlots","kind":"scalar","type":"Int"},{"name":"feeInQiancaiDou","kind":"scalar","type":"Int"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"appointments","kind":"object","type":"UserAppointment","relationName":"CourseScheduleToUserAppointment"}],"dbName":"course_schedules"},"UserAppointment":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"UserToUserAppointment"},{"name":"scheduleId","kind":"scalar","type":"Int"},{"name":"schedule","kind":"object","type":"CourseSchedule","relationName":"CourseScheduleToUserAppointment"},{"name":"status","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"user_appointments"},"TravelPost":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"summary","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"images","kind":"scalar","type":"String"},{"name":"author","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"viewCount","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"travel_posts"}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config.runtimeDataModel);
    config.engineWasm = {
      getRuntime: /* @__PURE__ */ __name(() => require_query_engine_bg(), "getRuntime"),
      getQueryEngineWasmModule: /* @__PURE__ */ __name(async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const engine = (await loader).default;
        return engine;
      }, "getQueryEngineWasmModule")
    };
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
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = { ...require_wasm2() };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = {
      ...require_default()
    };
  }
});

// .wrangler/tmp/bundle-OdNl9w/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-OdNl9w/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// src/index.ts
init_checked_fetch();
init_modules_watch_stub();

// src/app.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/compose.js
init_checked_fetch();
init_modules_watch_stub();
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
        } catch (err2) {
          if (err2 instanceof Error && onError) {
            context.error = err2;
            res = await onError(err2, context);
            isError = true;
          } else {
            throw err2;
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

// node_modules/hono/dist/context.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/request.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/request/constants.js
init_checked_fetch();
init_modules_watch_stub();
var GET_MATCH_RESULT = Symbol();

// node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
      for (const [k2, v2] of this.#res.headers.entries()) {
        if (k2 === "content-type") {
          continue;
        }
        if (k2 === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k2, v2);
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
      for (const [k2, v2] of Object.entries(headers)) {
        if (typeof v2 === "string") {
          responseHeaders.set(k2, v2);
        } else {
          responseHeaders.delete(k2);
          for (const v22 of v2) {
            responseHeaders.append(k2, v22);
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err2, c) => {
  if ("getResponse" in err2) {
    const res = err2.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err2);
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
  #handleError(err2, c) {
    if (err2 instanceof Error) {
      return this.errorHandler(err2, c);
    }
    throw err2;
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
      } catch (err2) {
        return this.#handleError(err2, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err2) => this.#handleError(err2, c)) : res ?? this.#notFoundHandler(c);
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
      } catch (err2) {
        return this.#handleError(err2, c);
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

// node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_modules_watch_stub();
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
          (k2) => k2 !== ONLY_WILDCARD_REG_EXP_STR && k2 !== TAIL_WILDCARD_REG_EXP_STR
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
          (k2) => k2.length > 1 && k2 !== ONLY_WILDCARD_REG_EXP_STR && k2 !== TAIL_WILDCARD_REG_EXP_STR
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
    const strList = childKeys.map((k2) => {
      const c = this.#children[k2];
      return (typeof c.#varIndex === "number" ? `(${k2})@${c.#varIndex}` : regExpMetaChars.has(k2) ? `\\${k2}` : k2) + c.buildRegExpStr();
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
init_checked_fetch();
init_modules_watch_stub();
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
      for (let k2 = 0, len3 = keys.length; k2 < len3; k2++) {
        map[keys[k2]] = paramReplacementMap[map[keys[k2]]];
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
  for (const k2 of Object.keys(middleware).sort((a2, b2) => b2.length - a2.length)) {
    if (buildWildcardRegExp(k2).test(path)) {
      return [...middleware[k2]];
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

// node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_modules_watch_stub();
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
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

// node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_modules_watch_stub();
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
        for (let k2 = 0, len3 = node.#patterns.length; k2 < len3; k2++) {
          const pattern = node.#patterns[k2];
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

// src/handlers/appointments.handler.ts
init_checked_fetch();
init_modules_watch_stub();

// src/services/db.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@neondatabase/serverless/index.mjs
init_checked_fetch();
init_modules_watch_stub();
var Xs = Object.create;
var Ie = Object.defineProperty;
var eo = Object.getOwnPropertyDescriptor;
var to = Object.getOwnPropertyNames;
var ro = Object.getPrototypeOf;
var no = Object.prototype.hasOwnProperty;
var io = /* @__PURE__ */ __name((r, e, t) => e in r ? Ie(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, "io");
var a = /* @__PURE__ */ __name((r, e) => Ie(r, "name", { value: e, configurable: true }), "a");
var K = /* @__PURE__ */ __name((r, e) => () => (r && (e = r(r = 0)), e), "K");
var I = /* @__PURE__ */ __name((r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), "I");
var X = /* @__PURE__ */ __name((r, e) => {
  for (var t in e)
    Ie(r, t, { get: e[t], enumerable: true });
}, "X");
var _n = /* @__PURE__ */ __name((r, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function") for (let i of to(e)) !no.call(r, i) && i !== t && Ie(r, i, { get: /* @__PURE__ */ __name(() => e[i], "get"), enumerable: !(n = eo(e, i)) || n.enumerable });
  return r;
}, "_n");
var We = /* @__PURE__ */ __name((r, e, t) => (t = r != null ? Xs(ro(r)) : {}, _n(e || !r || !r.__esModule ? Ie(t, "default", {
  value: r,
  enumerable: true
}) : t, r)), "We");
var k = /* @__PURE__ */ __name((r) => _n(Ie({}, "__esModule", { value: true }), r), "k");
var T = /* @__PURE__ */ __name((r, e, t) => (io(r, typeof e != "symbol" ? e + "" : e, t), t), "T");
var In = I((it) => {
  "use strict";
  p();
  it.byteLength = oo;
  it.toByteArray = uo;
  it.fromByteArray = lo;
  var oe = [], ee = [], so = typeof Uint8Array < "u" ? Uint8Array : Array, It = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Ee = 0, An = It.length; Ee < An; ++Ee)
    oe[Ee] = It[Ee], ee[It.charCodeAt(Ee)] = Ee;
  var Ee, An;
  ee[45] = 62;
  ee[95] = 63;
  function Cn(r) {
    var e = r.length;
    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var t = r.indexOf("=");
    t === -1 && (t = e);
    var n = t === e ? 0 : 4 - t % 4;
    return [t, n];
  }
  __name(Cn, "Cn");
  a(
    Cn,
    "getLens"
  );
  function oo(r) {
    var e = Cn(r), t = e[0], n = e[1];
    return (t + n) * 3 / 4 - n;
  }
  __name(oo, "oo");
  a(oo, "byteLength");
  function ao(r, e, t) {
    return (e + t) * 3 / 4 - t;
  }
  __name(ao, "ao");
  a(ao, "_byteLength");
  function uo(r) {
    var e, t = Cn(r), n = t[0], i = t[1], s = new so(ao(r, n, i)), o = 0, u = i > 0 ? n - 4 : n, c;
    for (c = 0; c < u; c += 4) e = ee[r.charCodeAt(c)] << 18 | ee[r.charCodeAt(c + 1)] << 12 | ee[r.charCodeAt(c + 2)] << 6 | ee[r.charCodeAt(c + 3)], s[o++] = e >> 16 & 255, s[o++] = e >> 8 & 255, s[o++] = e & 255;
    return i === 2 && (e = ee[r.charCodeAt(c)] << 2 | ee[r.charCodeAt(c + 1)] >> 4, s[o++] = e & 255), i === 1 && (e = ee[r.charCodeAt(
      c
    )] << 10 | ee[r.charCodeAt(c + 1)] << 4 | ee[r.charCodeAt(c + 2)] >> 2, s[o++] = e >> 8 & 255, s[o++] = e & 255), s;
  }
  __name(uo, "uo");
  a(uo, "toByteArray");
  function co(r) {
    return oe[r >> 18 & 63] + oe[r >> 12 & 63] + oe[r >> 6 & 63] + oe[r & 63];
  }
  __name(co, "co");
  a(co, "tripletToBase64");
  function ho(r, e, t) {
    for (var n, i = [], s = e; s < t; s += 3) n = (r[s] << 16 & 16711680) + (r[s + 1] << 8 & 65280) + (r[s + 2] & 255), i.push(co(n));
    return i.join(
      ""
    );
  }
  __name(ho, "ho");
  a(ho, "encodeChunk");
  function lo(r) {
    for (var e, t = r.length, n = t % 3, i = [], s = 16383, o = 0, u = t - n; o < u; o += s) i.push(ho(r, o, o + s > u ? u : o + s));
    return n === 1 ? (e = r[t - 1], i.push(oe[e >> 2] + oe[e << 4 & 63] + "==")) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(oe[e >> 10] + oe[e >> 4 & 63] + oe[e << 2 & 63] + "=")), i.join("");
  }
  __name(lo, "lo");
  a(lo, "fromByteArray");
});
var Tn = I((Tt) => {
  p();
  Tt.read = function(r, e, t, n, i) {
    var s, o, u = i * 8 - n - 1, c = (1 << u) - 1, h = c >> 1, l = -7, y = t ? i - 1 : 0, E = t ? -1 : 1, _ = r[e + y];
    for (y += E, s = _ & (1 << -l) - 1, _ >>= -l, l += u; l > 0; s = s * 256 + r[e + y], y += E, l -= 8) ;
    for (o = s & (1 << -l) - 1, s >>= -l, l += n; l > 0; o = o * 256 + r[e + y], y += E, l -= 8) ;
    if (s === 0) s = 1 - h;
    else {
      if (s === c) return o ? NaN : (_ ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, n), s = s - h;
    }
    return (_ ? -1 : 1) * o * Math.pow(2, s - n);
  };
  Tt.write = function(r, e, t, n, i, s) {
    var o, u, c, h = s * 8 - i - 1, l = (1 << h) - 1, y = l >> 1, E = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = n ? 0 : s - 1, P = n ? 1 : -1, N = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, o = l) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), o + y >= 1 ? e += E / c : e += E * Math.pow(2, 1 - y), e * c >= 2 && (o++, c /= 2), o + y >= l ? (u = 0, o = l) : o + y >= 1 ? (u = (e * c - 1) * Math.pow(
      2,
      i
    ), o = o + y) : (u = e * Math.pow(2, y - 1) * Math.pow(2, i), o = 0)); i >= 8; r[t + _] = u & 255, _ += P, u /= 256, i -= 8) ;
    for (o = o << i | u, h += i; h > 0; r[t + _] = o & 255, _ += P, o /= 256, h -= 8) ;
    r[t + _ - P] |= N * 128;
  };
});
var Gn = I((Le) => {
  "use strict";
  p();
  var Pt = In(), Pe = Tn(), Pn = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Le.Buffer = f;
  Le.SlowBuffer = wo;
  Le.INSPECT_MAX_BYTES = 50;
  var st = 2147483647;
  Le.kMaxLength = st;
  f.TYPED_ARRAY_SUPPORT = fo();
  !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function fo() {
    try {
      let r = new Uint8Array(1), e = { foo: /* @__PURE__ */ __name(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(r, e), r.foo() === 42;
    } catch {
      return false;
    }
  }
  __name(fo, "fo");
  a(fo, "typedArraySupport");
  Object.defineProperty(
    f.prototype,
    "parent",
    { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (f.isBuffer(this)) return this.buffer;
    }, "get") }
  );
  Object.defineProperty(f.prototype, "offset", { enumerable: true, get: /* @__PURE__ */ __name(function() {
    if (f.isBuffer(
      this
    )) return this.byteOffset;
  }, "get") });
  function le(r) {
    if (r > st) throw new RangeError('The value "' + r + '" is invalid for option "size"');
    let e = new Uint8Array(r);
    return Object.setPrototypeOf(e, f.prototype), e;
  }
  __name(le, "le");
  a(le, "createBuffer");
  function f(r, e, t) {
    if (typeof r == "number") {
      if (typeof e == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return Ft(r);
    }
    return Fn(r, e, t);
  }
  __name(f, "f");
  a(f, "Buffer");
  f.poolSize = 8192;
  function Fn(r, e, t) {
    if (typeof r == "string") return yo(r, e);
    if (ArrayBuffer.isView(r)) return mo(r);
    if (r == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
    if (ae(r, ArrayBuffer) || r && ae(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ae(r, SharedArrayBuffer) || r && ae(r.buffer, SharedArrayBuffer))) return Lt(
      r,
      e,
      t
    );
    if (typeof r == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = r.valueOf && r.valueOf();
    if (n != null && n !== r) return f.from(n, e, t);
    let i = go(r);
    if (i) return i;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function") return f.from(r[Symbol.toPrimitive](
      "string"
    ), e, t);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
  }
  __name(Fn, "Fn");
  a(
    Fn,
    "from"
  );
  f.from = function(r, e, t) {
    return Fn(r, e, t);
  };
  Object.setPrototypeOf(
    f.prototype,
    Uint8Array.prototype
  );
  Object.setPrototypeOf(f, Uint8Array);
  function Mn(r) {
    if (typeof r != "number") throw new TypeError('"size" argument must be of type number');
    if (r < 0) throw new RangeError(
      'The value "' + r + '" is invalid for option "size"'
    );
  }
  __name(Mn, "Mn");
  a(Mn, "assertSize");
  function po(r, e, t) {
    return Mn(r), r <= 0 ? le(r) : e !== void 0 ? typeof t == "string" ? le(r).fill(e, t) : le(r).fill(
      e
    ) : le(r);
  }
  __name(po, "po");
  a(po, "alloc");
  f.alloc = function(r, e, t) {
    return po(r, e, t);
  };
  function Ft(r) {
    return Mn(r), le(r < 0 ? 0 : Mt(r) | 0);
  }
  __name(Ft, "Ft");
  a(Ft, "allocUnsafe");
  f.allocUnsafe = function(r) {
    return Ft(
      r
    );
  };
  f.allocUnsafeSlow = function(r) {
    return Ft(r);
  };
  function yo(r, e) {
    if ((typeof e != "string" || e === "") && (e = "utf8"), !f.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
    let t = Dn(r, e) | 0, n = le(t), i = n.write(r, e);
    return i !== t && (n = n.slice(0, i)), n;
  }
  __name(yo, "yo");
  a(yo, "fromString");
  function Bt(r) {
    let e = r.length < 0 ? 0 : Mt(r.length) | 0, t = le(e);
    for (let n = 0; n < e; n += 1) t[n] = r[n] & 255;
    return t;
  }
  __name(Bt, "Bt");
  a(Bt, "fromArrayLike");
  function mo(r) {
    if (ae(r, Uint8Array)) {
      let e = new Uint8Array(r);
      return Lt(e.buffer, e.byteOffset, e.byteLength);
    }
    return Bt(
      r
    );
  }
  __name(mo, "mo");
  a(mo, "fromArrayView");
  function Lt(r, e, t) {
    if (e < 0 || r.byteLength < e) throw new RangeError(
      '"offset" is outside of buffer bounds'
    );
    if (r.byteLength < e + (t || 0)) throw new RangeError(
      '"length" is outside of buffer bounds'
    );
    let n;
    return e === void 0 && t === void 0 ? n = new Uint8Array(
      r
    ) : t === void 0 ? n = new Uint8Array(r, e) : n = new Uint8Array(r, e, t), Object.setPrototypeOf(
      n,
      f.prototype
    ), n;
  }
  __name(Lt, "Lt");
  a(Lt, "fromArrayBuffer");
  function go(r) {
    if (f.isBuffer(r)) {
      let e = Mt(
        r.length
      ) | 0, t = le(e);
      return t.length === 0 || r.copy(t, 0, 0, e), t;
    }
    if (r.length !== void 0)
      return typeof r.length != "number" || Ot(r.length) ? le(0) : Bt(r);
    if (r.type === "Buffer" && Array.isArray(r.data)) return Bt(r.data);
  }
  __name(go, "go");
  a(go, "fromObject");
  function Mt(r) {
    if (r >= st) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + st.toString(16) + " bytes");
    return r | 0;
  }
  __name(Mt, "Mt");
  a(Mt, "checked");
  function wo(r) {
    return +r != r && (r = 0), f.alloc(+r);
  }
  __name(wo, "wo");
  a(wo, "SlowBuffer");
  f.isBuffer = a(function(e) {
    return e != null && e._isBuffer === true && e !== f.prototype;
  }, "isBuffer");
  f.compare = a(function(e, t) {
    if (ae(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), ae(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), !f.isBuffer(e) || !f.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (e === t) return 0;
    let n = e.length, i = t.length;
    for (let s = 0, o = Math.min(n, i); s < o; ++s) if (e[s] !== t[s]) {
      n = e[s], i = t[s];
      break;
    }
    return n < i ? -1 : i < n ? 1 : 0;
  }, "compare");
  f.isEncoding = a(function(e) {
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
  f.concat = a(function(e, t) {
    if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (e.length === 0) return f.alloc(0);
    let n;
    if (t === void 0) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
    let i = f.allocUnsafe(t), s = 0;
    for (n = 0; n < e.length; ++n) {
      let o = e[n];
      if (ae(o, Uint8Array)) s + o.length > i.length ? (f.isBuffer(
        o
      ) || (o = f.from(o)), o.copy(i, s)) : Uint8Array.prototype.set.call(i, o, s);
      else if (f.isBuffer(
        o
      )) o.copy(i, s);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      s += o.length;
    }
    return i;
  }, "concat");
  function Dn(r, e) {
    if (f.isBuffer(r)) return r.length;
    if (ArrayBuffer.isView(r) || ae(r, ArrayBuffer)) return r.byteLength;
    if (typeof r != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r);
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
        return Rt(r).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return t * 2;
      case "hex":
        return t >>> 1;
      case "base64":
        return Hn(r).length;
      default:
        if (i) return n ? -1 : Rt(r).length;
        e = ("" + e).toLowerCase(), i = true;
    }
  }
  __name(Dn, "Dn");
  a(Dn, "byteLength");
  f.byteLength = Dn;
  function bo(r, e, t) {
    let n = false;
    if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e >>>= 0, t <= e)) return "";
    for (r || (r = "utf8"); ; ) switch (r) {
      case "hex":
        return Po(
          this,
          e,
          t
        );
      case "utf8":
      case "utf-8":
        return kn(this, e, t);
      case "ascii":
        return Io(
          this,
          e,
          t
        );
      case "latin1":
      case "binary":
        return To(this, e, t);
      case "base64":
        return Ao(
          this,
          e,
          t
        );
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Bo(this, e, t);
      default:
        if (n) throw new TypeError("Unknown encoding: " + r);
        r = (r + "").toLowerCase(), n = true;
    }
  }
  __name(bo, "bo");
  a(
    bo,
    "slowToString"
  );
  f.prototype._isBuffer = true;
  function ve(r, e, t) {
    let n = r[e];
    r[e] = r[t], r[t] = n;
  }
  __name(ve, "ve");
  a(ve, "swap");
  f.prototype.swap16 = a(function() {
    let e = this.length;
    if (e % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < e; t += 2) ve(this, t, t + 1);
    return this;
  }, "swap16");
  f.prototype.swap32 = a(function() {
    let e = this.length;
    if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < e; t += 4) ve(this, t, t + 3), ve(this, t + 1, t + 2);
    return this;
  }, "swap32");
  f.prototype.swap64 = a(function() {
    let e = this.length;
    if (e % 8 !== 0) throw new RangeError(
      "Buffer size must be a multiple of 64-bits"
    );
    for (let t = 0; t < e; t += 8) ve(this, t, t + 7), ve(this, t + 1, t + 6), ve(this, t + 2, t + 5), ve(this, t + 3, t + 4);
    return this;
  }, "swap64");
  f.prototype.toString = a(function() {
    let e = this.length;
    return e === 0 ? "" : arguments.length === 0 ? kn(
      this,
      0,
      e
    ) : bo.apply(this, arguments);
  }, "toString");
  f.prototype.toLocaleString = f.prototype.toString;
  f.prototype.equals = a(function(e) {
    if (!f.isBuffer(e)) throw new TypeError(
      "Argument must be a Buffer"
    );
    return this === e ? true : f.compare(this, e) === 0;
  }, "equals");
  f.prototype.inspect = a(function() {
    let e = "", t = Le.INSPECT_MAX_BYTES;
    return e = this.toString(
      "hex",
      0,
      t
    ).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
  }, "inspect");
  Pn && (f.prototype[Pn] = f.prototype.inspect);
  f.prototype.compare = a(function(e, t, n, i, s) {
    if (ae(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), !f.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
    if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), s === void 0 && (s = this.length), t < 0 || n > e.length || i < 0 || s > this.length) throw new RangeError("out of range index");
    if (i >= s && t >= n) return 0;
    if (i >= s) return -1;
    if (t >= n) return 1;
    if (t >>>= 0, n >>>= 0, i >>>= 0, s >>>= 0, this === e) return 0;
    let o = s - i, u = n - t, c = Math.min(o, u), h = this.slice(i, s), l = e.slice(t, n);
    for (let y = 0; y < c; ++y)
      if (h[y] !== l[y]) {
        o = h[y], u = l[y];
        break;
      }
    return o < u ? -1 : u < o ? 1 : 0;
  }, "compare");
  function On(r, e, t, n, i) {
    if (r.length === 0) return -1;
    if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, Ot(t) && (t = i ? 0 : r.length - 1), t < 0 && (t = r.length + t), t >= r.length) {
      if (i) return -1;
      t = r.length - 1;
    } else if (t < 0) if (i) t = 0;
    else return -1;
    if (typeof e == "string" && (e = f.from(e, n)), f.isBuffer(e)) return e.length === 0 ? -1 : Bn(r, e, t, n, i);
    if (typeof e == "number") return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : Bn(
      r,
      [e],
      t,
      n,
      i
    );
    throw new TypeError("val must be string, number or Buffer");
  }
  __name(On, "On");
  a(On, "bidirectionalIndexOf");
  function Bn(r, e, t, n, i) {
    let s = 1, o = r.length, u = e.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (r.length < 2 || e.length < 2) return -1;
      s = 2, o /= 2, u /= 2, t /= 2;
    }
    function c(l, y) {
      return s === 1 ? l[y] : l.readUInt16BE(y * s);
    }
    __name(c, "c");
    a(c, "read");
    let h;
    if (i) {
      let l = -1;
      for (h = t; h < o; h++) if (c(r, h) === c(e, l === -1 ? 0 : h - l)) {
        if (l === -1 && (l = h), h - l + 1 === u) return l * s;
      } else l !== -1 && (h -= h - l), l = -1;
    } else for (t + u > o && (t = o - u), h = t; h >= 0; h--) {
      let l = true;
      for (let y = 0; y < u; y++)
        if (c(r, h + y) !== c(e, y)) {
          l = false;
          break;
        }
      if (l) return h;
    }
    return -1;
  }
  __name(Bn, "Bn");
  a(Bn, "arrayIndexOf");
  f.prototype.includes = a(function(e, t, n) {
    return this.indexOf(e, t, n) !== -1;
  }, "includes");
  f.prototype.indexOf = a(function(e, t, n) {
    return On(this, e, t, n, true);
  }, "indexOf");
  f.prototype.lastIndexOf = a(function(e, t, n) {
    return On(this, e, t, n, false);
  }, "lastIndexOf");
  function So(r, e, t, n) {
    t = Number(t) || 0;
    let i = r.length - t;
    n ? (n = Number(n), n > i && (n = i)) : n = i;
    let s = e.length;
    n > s / 2 && (n = s / 2);
    let o;
    for (o = 0; o < n; ++o) {
      let u = parseInt(e.substr(o * 2, 2), 16);
      if (Ot(u))
        return o;
      r[t + o] = u;
    }
    return o;
  }
  __name(So, "So");
  a(So, "hexWrite");
  function xo(r, e, t, n) {
    return ot(Rt(
      e,
      r.length - t
    ), r, t, n);
  }
  __name(xo, "xo");
  a(xo, "utf8Write");
  function Eo(r, e, t, n) {
    return ot(Mo(e), r, t, n);
  }
  __name(Eo, "Eo");
  a(Eo, "asciiWrite");
  function vo(r, e, t, n) {
    return ot(Hn(e), r, t, n);
  }
  __name(vo, "vo");
  a(vo, "base64Write");
  function _o(r, e, t, n) {
    return ot(Do(e, r.length - t), r, t, n);
  }
  __name(_o, "_o");
  a(_o, "ucs2Write");
  f.prototype.write = a(function(e, t, n, i) {
    if (t === void 0) i = "utf8", n = this.length, t = 0;
    else if (n === void 0 && typeof t == "string") i = t, n = this.length, t = 0;
    else if (isFinite(t)) t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let s = this.length - t;
    if ((n === void 0 || n > s) && (n = s), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError(
      "Attempt to write outside buffer bounds"
    );
    i || (i = "utf8");
    let o = false;
    for (; ; ) switch (i) {
      case "hex":
        return So(this, e, t, n);
      case "utf8":
      case "utf-8":
        return xo(this, e, t, n);
      case "ascii":
      case "latin1":
      case "binary":
        return Eo(this, e, t, n);
      case "base64":
        return vo(
          this,
          e,
          t,
          n
        );
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return _o(this, e, t, n);
      default:
        if (o) throw new TypeError("Unknown encoding: " + i);
        i = ("" + i).toLowerCase(), o = true;
    }
  }, "write");
  f.prototype.toJSON = a(function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  }, "toJSON");
  function Ao(r, e, t) {
    return e === 0 && t === r.length ? Pt.fromByteArray(r) : Pt.fromByteArray(r.slice(e, t));
  }
  __name(Ao, "Ao");
  a(Ao, "base64Slice");
  function kn(r, e, t) {
    t = Math.min(r.length, t);
    let n = [], i = e;
    for (; i < t; ) {
      let s = r[i], o = null, u = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
      if (i + u <= t) {
        let c, h, l, y;
        switch (u) {
          case 1:
            s < 128 && (o = s);
            break;
          case 2:
            c = r[i + 1], (c & 192) === 128 && (y = (s & 31) << 6 | c & 63, y > 127 && (o = y));
            break;
          case 3:
            c = r[i + 1], h = r[i + 2], (c & 192) === 128 && (h & 192) === 128 && (y = (s & 15) << 12 | (c & 63) << 6 | h & 63, y > 2047 && (y < 55296 || y > 57343) && (o = y));
            break;
          case 4:
            c = r[i + 1], h = r[i + 2], l = r[i + 3], (c & 192) === 128 && (h & 192) === 128 && (l & 192) === 128 && (y = (s & 15) << 18 | (c & 63) << 12 | (h & 63) << 6 | l & 63, y > 65535 && y < 1114112 && (o = y));
        }
      }
      o === null ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), n.push(o), i += u;
    }
    return Co(n);
  }
  __name(kn, "kn");
  a(kn, "utf8Slice");
  var Ln = 4096;
  function Co(r) {
    let e = r.length;
    if (e <= Ln) return String.fromCharCode.apply(String, r);
    let t = "", n = 0;
    for (; n < e; ) t += String.fromCharCode.apply(String, r.slice(n, n += Ln));
    return t;
  }
  __name(Co, "Co");
  a(Co, "decodeCodePointsArray");
  function Io(r, e, t) {
    let n = "";
    t = Math.min(r.length, t);
    for (let i = e; i < t; ++i) n += String.fromCharCode(r[i] & 127);
    return n;
  }
  __name(Io, "Io");
  a(Io, "asciiSlice");
  function To(r, e, t) {
    let n = "";
    t = Math.min(r.length, t);
    for (let i = e; i < t; ++i) n += String.fromCharCode(r[i]);
    return n;
  }
  __name(To, "To");
  a(To, "latin1Slice");
  function Po(r, e, t) {
    let n = r.length;
    (!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n);
    let i = "";
    for (let s = e; s < t; ++s) i += Oo[r[s]];
    return i;
  }
  __name(Po, "Po");
  a(Po, "hexSlice");
  function Bo(r, e, t) {
    let n = r.slice(e, t), i = "";
    for (let s = 0; s < n.length - 1; s += 2) i += String.fromCharCode(n[s] + n[s + 1] * 256);
    return i;
  }
  __name(Bo, "Bo");
  a(Bo, "utf16leSlice");
  f.prototype.slice = a(function(e, t) {
    let n = this.length;
    e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
    let i = this.subarray(
      e,
      t
    );
    return Object.setPrototypeOf(i, f.prototype), i;
  }, "slice");
  function U(r, e, t) {
    if (r % 1 !== 0 || r < 0) throw new RangeError("offset is not uint");
    if (r + e > t) throw new RangeError(
      "Trying to access beyond buffer length"
    );
  }
  __name(U, "U");
  a(U, "checkOffset");
  f.prototype.readUintLE = f.prototype.readUIntLE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || U(e, t, this.length);
    let i = this[e], s = 1, o = 0;
    for (; ++o < t && (s *= 256); ) i += this[e + o] * s;
    return i;
  }, "readUIntLE");
  f.prototype.readUintBE = f.prototype.readUIntBE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || U(e, t, this.length);
    let i = this[e + --t], s = 1;
    for (; t > 0 && (s *= 256); ) i += this[e + --t] * s;
    return i;
  }, "readUIntBE");
  f.prototype.readUint8 = f.prototype.readUInt8 = a(function(e, t) {
    return e = e >>> 0, t || U(e, 1, this.length), this[e];
  }, "readUInt8");
  f.prototype.readUint16LE = f.prototype.readUInt16LE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 2, this.length), this[e] | this[e + 1] << 8;
  }, "readUInt16LE");
  f.prototype.readUint16BE = f.prototype.readUInt16BE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 2, this.length), this[e] << 8 | this[e + 1];
  }, "readUInt16BE");
  f.prototype.readUint32LE = f.prototype.readUInt32LE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
  }, "readUInt32LE");
  f.prototype.readUint32BE = f.prototype.readUInt32BE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  }, "readUInt32BE");
  f.prototype.readBigUInt64LE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && je(e, this.length - 8);
    let i = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
    return BigInt(i) + (BigInt(s) << BigInt(32));
  }, "readBigUInt64LE"));
  f.prototype.readBigUInt64BE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && je(e, this.length - 8);
    let i = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
    return (BigInt(
      i
    ) << BigInt(32)) + BigInt(s);
  }, "readBigUInt64BE"));
  f.prototype.readIntLE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || U(e, t, this.length);
    let i = this[e], s = 1, o = 0;
    for (; ++o < t && (s *= 256); )
      i += this[e + o] * s;
    return s *= 128, i >= s && (i -= Math.pow(2, 8 * t)), i;
  }, "readIntLE");
  f.prototype.readIntBE = a(function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || U(e, t, this.length);
    let i = t, s = 1, o = this[e + --i];
    for (; i > 0 && (s *= 256); ) o += this[e + --i] * s;
    return s *= 128, o >= s && (o -= Math.pow(2, 8 * t)), o;
  }, "readIntBE");
  f.prototype.readInt8 = a(function(e, t) {
    return e = e >>> 0, t || U(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
  }, "readInt8");
  f.prototype.readInt16LE = a(function(e, t) {
    e = e >>> 0, t || U(e, 2, this.length);
    let n = this[e] | this[e + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, "readInt16LE");
  f.prototype.readInt16BE = a(
    function(e, t) {
      e = e >>> 0, t || U(e, 2, this.length);
      let n = this[e + 1] | this[e] << 8;
      return n & 32768 ? n | 4294901760 : n;
    },
    "readInt16BE"
  );
  f.prototype.readInt32LE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  }, "readInt32LE");
  f.prototype.readInt32BE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  }, "readInt32BE");
  f.prototype.readBigInt64LE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && je(
      e,
      this.length - 8
    );
    let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
    return (BigInt(
      i
    ) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
  }, "readBigInt64LE"));
  f.prototype.readBigInt64BE = me(a(function(e) {
    e = e >>> 0, Be(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && je(e, this.length - 8);
    let i = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
    return (BigInt(i) << BigInt(32)) + BigInt(
      this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
    );
  }, "readBigInt64BE"));
  f.prototype.readFloatLE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 4, this.length), Pe.read(
      this,
      e,
      true,
      23,
      4
    );
  }, "readFloatLE");
  f.prototype.readFloatBE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 4, this.length), Pe.read(this, e, false, 23, 4);
  }, "readFloatBE");
  f.prototype.readDoubleLE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 8, this.length), Pe.read(this, e, true, 52, 8);
  }, "readDoubleLE");
  f.prototype.readDoubleBE = a(function(e, t) {
    return e = e >>> 0, t || U(e, 8, this.length), Pe.read(this, e, false, 52, 8);
  }, "readDoubleBE");
  function z(r, e, t, n, i, s) {
    if (!f.isBuffer(
      r
    )) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > i || e < s) throw new RangeError('"value" argument is out of bounds');
    if (t + n > r.length) throw new RangeError(
      "Index out of range"
    );
  }
  __name(z, "z");
  a(z, "checkInt");
  f.prototype.writeUintLE = f.prototype.writeUIntLE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let u = Math.pow(2, 8 * n) - 1;
      z(
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
  f.prototype.writeUintBE = f.prototype.writeUIntBE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let u = Math.pow(2, 8 * n) - 1;
      z(this, e, t, n, u, 0);
    }
    let s = n - 1, o = 1;
    for (this[t + s] = e & 255; --s >= 0 && (o *= 256); ) this[t + s] = e / o & 255;
    return t + n;
  }, "writeUIntBE");
  f.prototype.writeUint8 = f.prototype.writeUInt8 = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
  }, "writeUInt8");
  f.prototype.writeUint16LE = f.prototype.writeUInt16LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(
      this,
      e,
      t,
      2,
      65535,
      0
    ), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  }, "writeUInt16LE");
  f.prototype.writeUint16BE = f.prototype.writeUInt16BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(
      this,
      e,
      t,
      2,
      65535,
      0
    ), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  }, "writeUInt16BE");
  f.prototype.writeUint32LE = f.prototype.writeUInt32LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(
      this,
      e,
      t,
      4,
      4294967295,
      0
    ), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
  }, "writeUInt32LE");
  f.prototype.writeUint32BE = f.prototype.writeUInt32BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  }, "writeUInt32BE");
  function Un(r, e, t, n, i) {
    jn(
      e,
      n,
      i,
      r,
      t,
      7
    );
    let s = Number(e & BigInt(4294967295));
    r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s;
    let o = Number(e >> BigInt(32) & BigInt(4294967295));
    return r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, t;
  }
  __name(Un, "Un");
  a(Un, "wrtBigUInt64LE");
  function qn(r, e, t, n, i) {
    jn(e, n, i, r, t, 7);
    let s = Number(e & BigInt(4294967295));
    r[t + 7] = s, s = s >> 8, r[t + 6] = s, s = s >> 8, r[t + 5] = s, s = s >> 8, r[t + 4] = s;
    let o = Number(e >> BigInt(32) & BigInt(4294967295));
    return r[t + 3] = o, o = o >> 8, r[t + 2] = o, o = o >> 8, r[t + 1] = o, o = o >> 8, r[t] = o, t + 8;
  }
  __name(qn, "qn");
  a(qn, "wrtBigUInt64BE");
  f.prototype.writeBigUInt64LE = me(a(function(e, t = 0) {
    return Un(this, e, t, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64LE"));
  f.prototype.writeBigUInt64BE = me(a(function(e, t = 0) {
    return qn(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64BE"));
  f.prototype.writeIntLE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let c = Math.pow(
        2,
        8 * n - 1
      );
      z(this, e, t, n, c - 1, -c);
    }
    let s = 0, o = 1, u = 0;
    for (this[t] = e & 255; ++s < n && (o *= 256); ) e < 0 && u === 0 && this[t + s - 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
    return t + n;
  }, "writeIntLE");
  f.prototype.writeIntBE = a(function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let c = Math.pow(
        2,
        8 * n - 1
      );
      z(this, e, t, n, c - 1, -c);
    }
    let s = n - 1, o = 1, u = 0;
    for (this[t + s] = e & 255; --s >= 0 && (o *= 256); ) e < 0 && u === 0 && this[t + s + 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
    return t + n;
  }, "writeIntBE");
  f.prototype.writeInt8 = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(
      this,
      e,
      t,
      1,
      127,
      -128
    ), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
  }, "writeInt8");
  f.prototype.writeInt16LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  }, "writeInt16LE");
  f.prototype.writeInt16BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  }, "writeInt16BE");
  f.prototype.writeInt32LE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
  }, "writeInt32LE");
  f.prototype.writeInt32BE = a(function(e, t, n) {
    return e = +e, t = t >>> 0, n || z(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  }, "writeInt32BE");
  f.prototype.writeBigInt64LE = me(a(function(e, t = 0) {
    return Un(this, e, t, -BigInt(
      "0x8000000000000000"
    ), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64LE"));
  f.prototype.writeBigInt64BE = me(a(function(e, t = 0) {
    return qn(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64BE"));
  function Nn(r, e, t, n, i, s) {
    if (t + n > r.length) throw new RangeError("Index out of range");
    if (t < 0) throw new RangeError(
      "Index out of range"
    );
  }
  __name(Nn, "Nn");
  a(Nn, "checkIEEE754");
  function Qn(r, e, t, n, i) {
    return e = +e, t = t >>> 0, i || Nn(r, e, t, 4, 34028234663852886e22, -34028234663852886e22), Pe.write(
      r,
      e,
      t,
      n,
      23,
      4
    ), t + 4;
  }
  __name(Qn, "Qn");
  a(Qn, "writeFloat");
  f.prototype.writeFloatLE = a(function(e, t, n) {
    return Qn(
      this,
      e,
      t,
      true,
      n
    );
  }, "writeFloatLE");
  f.prototype.writeFloatBE = a(function(e, t, n) {
    return Qn(
      this,
      e,
      t,
      false,
      n
    );
  }, "writeFloatBE");
  function Wn(r, e, t, n, i) {
    return e = +e, t = t >>> 0, i || Nn(
      r,
      e,
      t,
      8,
      17976931348623157e292,
      -17976931348623157e292
    ), Pe.write(r, e, t, n, 52, 8), t + 8;
  }
  __name(Wn, "Wn");
  a(Wn, "writeDouble");
  f.prototype.writeDoubleLE = a(function(e, t, n) {
    return Wn(
      this,
      e,
      t,
      true,
      n
    );
  }, "writeDoubleLE");
  f.prototype.writeDoubleBE = a(function(e, t, n) {
    return Wn(
      this,
      e,
      t,
      false,
      n
    );
  }, "writeDoubleBE");
  f.prototype.copy = a(function(e, t, n, i) {
    if (!f.isBuffer(
      e
    )) throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0) return 0;
    if (t < 0) throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
    if (i < 0) throw new RangeError(
      "sourceEnd out of bounds"
    );
    i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
    let s = i - n;
    return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t), s;
  }, "copy");
  f.prototype.fill = a(function(e, t, n, i) {
    if (typeof e == "string") {
      if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string") throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !f.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
      if (e.length === 1) {
        let o = e.charCodeAt(0);
        (i === "utf8" && o < 128 || i === "latin1") && (e = o);
      }
    } else typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
    if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
    if (n <= t) return this;
    t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
    let s;
    if (typeof e == "number") for (s = t; s < n; ++s)
      this[s] = e;
    else {
      let o = f.isBuffer(e) ? e : f.from(e, i), u = o.length;
      if (u === 0) throw new TypeError(
        'The value "' + e + '" is invalid for argument "value"'
      );
      for (s = 0; s < n - t; ++s) this[s + t] = o[s % u];
    }
    return this;
  }, "fill");
  var Te = {};
  function Dt(r, e, t) {
    var n;
    Te[r] = (n = class extends t {
      static {
        __name(this, "n");
      }
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: e.apply(this, arguments),
          writable: true,
          configurable: true
        }), this.name = `${this.name} [${r}]`, this.stack, delete this.name;
      }
      get code() {
        return r;
      }
      set code(s) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value: s,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${r}]: ${this.message}`;
      }
    }, a(n, "NodeError"), n);
  }
  __name(Dt, "Dt");
  a(Dt, "E");
  Dt("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
    return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  Dt("ERR_INVALID_ARG_TYPE", function(r, e) {
    return `The "${r}" argument must be of type number. Received type ${typeof e}`;
  }, TypeError);
  Dt("ERR_OUT_OF_RANGE", function(r, e, t) {
    let n = `The value of "${r}" is out of range.`, i = t;
    return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = Rn(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = Rn(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
  }, RangeError);
  function Rn(r) {
    let e = "", t = r.length, n = r[0] === "-" ? 1 : 0;
    for (; t >= n + 4; t -= 3) e = `_${r.slice(t - 3, t)}${e}`;
    return `${r.slice(
      0,
      t
    )}${e}`;
  }
  __name(Rn, "Rn");
  a(Rn, "addNumericalSeparator");
  function Lo(r, e, t) {
    Be(e, "offset"), (r[e] === void 0 || r[e + t] === void 0) && je(e, r.length - (t + 1));
  }
  __name(Lo, "Lo");
  a(Lo, "checkBounds");
  function jn(r, e, t, n, i, s) {
    if (r > t || r < e) {
      let o = typeof e == "bigint" ? "n" : "", u;
      throw s > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${o} and < 2${o} ** ${(s + 1) * 8}${o}` : u = `>= -(2${o} ** ${(s + 1) * 8 - 1}${o}) and < 2 ** ${(s + 1) * 8 - 1}${o}` : u = `>= ${e}${o} and <= ${t}${o}`, new Te.ERR_OUT_OF_RANGE(
        "value",
        u,
        r
      );
    }
    Lo(n, i, s);
  }
  __name(jn, "jn");
  a(jn, "checkIntBI");
  function Be(r, e) {
    if (typeof r != "number")
      throw new Te.ERR_INVALID_ARG_TYPE(e, "number", r);
  }
  __name(Be, "Be");
  a(Be, "validateNumber");
  function je(r, e, t) {
    throw Math.floor(r) !== r ? (Be(r, t), new Te.ERR_OUT_OF_RANGE(
      t || "offset",
      "an integer",
      r
    )) : e < 0 ? new Te.ERR_BUFFER_OUT_OF_BOUNDS() : new Te.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e}`, r);
  }
  __name(je, "je");
  a(je, "boundsError");
  var Ro = /[^+/0-9A-Za-z-_]/g;
  function Fo(r) {
    if (r = r.split("=")[0], r = r.trim().replace(Ro, ""), r.length < 2) return "";
    for (; r.length % 4 !== 0; ) r = r + "=";
    return r;
  }
  __name(Fo, "Fo");
  a(Fo, "base64clean");
  function Rt(r, e) {
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
          (e -= 3) > -1 && s.push(
            239,
            191,
            189
          ), i = t;
          continue;
        }
        t = (i - 55296 << 10 | t - 56320) + 65536;
      } else i && (e -= 3) > -1 && s.push(
        239,
        191,
        189
      );
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
  __name(Rt, "Rt");
  a(
    Rt,
    "utf8ToBytes"
  );
  function Mo(r) {
    let e = [];
    for (let t = 0; t < r.length; ++t) e.push(r.charCodeAt(
      t
    ) & 255);
    return e;
  }
  __name(Mo, "Mo");
  a(Mo, "asciiToBytes");
  function Do(r, e) {
    let t, n, i, s = [];
    for (let o = 0; o < r.length && !((e -= 2) < 0); ++o) t = r.charCodeAt(o), n = t >> 8, i = t % 256, s.push(i), s.push(n);
    return s;
  }
  __name(Do, "Do");
  a(Do, "utf16leToBytes");
  function Hn(r) {
    return Pt.toByteArray(Fo(r));
  }
  __name(Hn, "Hn");
  a(Hn, "base64ToBytes");
  function ot(r, e, t, n) {
    let i;
    for (i = 0; i < n && !(i + t >= e.length || i >= r.length); ++i)
      e[i + t] = r[i];
    return i;
  }
  __name(ot, "ot");
  a(ot, "blitBuffer");
  function ae(r, e) {
    return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name;
  }
  __name(ae, "ae");
  a(ae, "isInstance");
  function Ot(r) {
    return r !== r;
  }
  __name(Ot, "Ot");
  a(Ot, "numberIsNaN");
  var Oo = function() {
    let r = "0123456789abcdef", e = new Array(256);
    for (let t = 0; t < 16; ++t) {
      let n = t * 16;
      for (let i = 0; i < 16; ++i) e[n + i] = r[t] + r[i];
    }
    return e;
  }();
  function me(r) {
    return typeof BigInt > "u" ? ko : r;
  }
  __name(me, "me");
  a(me, "defineBigIntMethod");
  function ko() {
    throw new Error("BigInt not supported");
  }
  __name(ko, "ko");
  a(ko, "BufferBigIntNotDefined");
});
var b;
var S;
var v;
var w;
var d;
var m;
var p = K(() => {
  "use strict";
  b = globalThis, S = globalThis.setImmediate ?? ((r) => setTimeout(
    r,
    0
  )), v = globalThis.clearImmediate ?? ((r) => clearTimeout(r)), w = globalThis.crypto ?? {};
  w.subtle ?? (w.subtle = {});
  d = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : Gn().Buffer, m = globalThis.process ?? {};
  m.env ?? (m.env = {});
  try {
    m.nextTick(() => {
    });
  } catch {
    let e = Promise.resolve();
    m.nextTick = e.then.bind(e);
  }
});
var ge = I((Jc, kt) => {
  "use strict";
  p();
  var Re = typeof Reflect == "object" ? Reflect : null, $n = Re && typeof Re.apply == "function" ? Re.apply : a(function(e, t, n) {
    return Function.prototype.apply.call(e, t, n);
  }, "ReflectApply"), at;
  Re && typeof Re.ownKeys == "function" ? at = Re.ownKeys : Object.getOwnPropertySymbols ? at = a(function(e) {
    return Object.getOwnPropertyNames(
      e
    ).concat(Object.getOwnPropertySymbols(e));
  }, "ReflectOwnKeys") : at = a(function(e) {
    return Object.getOwnPropertyNames(e);
  }, "ReflectOwnKeys");
  function Uo(r) {
    console && console.warn && console.warn(r);
  }
  __name(Uo, "Uo");
  a(Uo, "ProcessEmitWarning");
  var Vn = Number.isNaN || a(function(e) {
    return e !== e;
  }, "NumberIsNaN");
  function B() {
    B.init.call(this);
  }
  __name(B, "B");
  a(B, "EventEmitter");
  kt.exports = B;
  kt.exports.once = Wo;
  B.EventEmitter = B;
  B.prototype._events = void 0;
  B.prototype._eventsCount = 0;
  B.prototype._maxListeners = void 0;
  var Kn = 10;
  function ut(r) {
    if (typeof r != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
  }
  __name(ut, "ut");
  a(ut, "checkListener");
  Object.defineProperty(B, "defaultMaxListeners", { enumerable: true, get: /* @__PURE__ */ __name(function() {
    return Kn;
  }, "get"), set: /* @__PURE__ */ __name(function(r) {
    if (typeof r != "number" || r < 0 || Vn(r)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
    Kn = r;
  }, "set") });
  B.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  };
  B.prototype.setMaxListeners = a(function(e) {
    if (typeof e != "number" || e < 0 || Vn(
      e
    )) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
    return this._maxListeners = e, this;
  }, "setMaxListeners");
  function zn(r) {
    return r._maxListeners === void 0 ? B.defaultMaxListeners : r._maxListeners;
  }
  __name(zn, "zn");
  a(zn, "_getMaxListeners");
  B.prototype.getMaxListeners = a(
    function() {
      return zn(this);
    },
    "getMaxListeners"
  );
  B.prototype.emit = a(function(e) {
    for (var t = [], n = 1; n < arguments.length; n++)
      t.push(arguments[n]);
    var i = e === "error", s = this._events;
    if (s !== void 0) i = i && s.error === void 0;
    else if (!i) return false;
    if (i) {
      var o;
      if (t.length > 0 && (o = t[0]), o instanceof Error)
        throw o;
      var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
      throw u.context = o, u;
    }
    var c = s[e];
    if (c === void 0) return false;
    if (typeof c == "function") $n(c, this, t);
    else for (var h = c.length, l = ei(c, h), n = 0; n < h; ++n) $n(l[n], this, t);
    return true;
  }, "emit");
  function Yn(r, e, t, n) {
    var i, s, o;
    if (ut(t), s = r._events, s === void 0 ? (s = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s.newListener !== void 0 && (r.emit("newListener", e, t.listener ? t.listener : t), s = r._events), o = s[e]), o === void 0) o = s[e] = t, ++r._eventsCount;
    else if (typeof o == "function" ? o = s[e] = n ? [t, o] : [o, t] : n ? o.unshift(t) : o.push(t), i = zn(r), i > 0 && o.length > i && !o.warned) {
      o.warned = true;
      var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      u.name = "MaxListenersExceededWarning", u.emitter = r, u.type = e, u.count = o.length, Uo(u);
    }
    return r;
  }
  __name(Yn, "Yn");
  a(Yn, "_addListener");
  B.prototype.addListener = a(function(e, t) {
    return Yn(
      this,
      e,
      t,
      false
    );
  }, "addListener");
  B.prototype.on = B.prototype.addListener;
  B.prototype.prependListener = a(function(e, t) {
    return Yn(this, e, t, true);
  }, "prependListener");
  function qo() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  __name(qo, "qo");
  a(qo, "onceWrapper");
  function Zn(r, e, t) {
    var n = {
      fired: false,
      wrapFn: void 0,
      target: r,
      type: e,
      listener: t
    }, i = qo.bind(n);
    return i.listener = t, n.wrapFn = i, i;
  }
  __name(Zn, "Zn");
  a(Zn, "_onceWrap");
  B.prototype.once = a(function(e, t) {
    return ut(t), this.on(e, Zn(this, e, t)), this;
  }, "once");
  B.prototype.prependOnceListener = a(function(e, t) {
    return ut(t), this.prependListener(e, Zn(this, e, t)), this;
  }, "prependOnceListener");
  B.prototype.removeListener = a(function(e, t) {
    var n, i, s, o, u;
    if (ut(t), i = this._events, i === void 0) return this;
    if (n = i[e], n === void 0) return this;
    if (n === t || n.listener === t) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
    else if (typeof n != "function") {
      for (s = -1, o = n.length - 1; o >= 0; o--)
        if (n[o] === t || n[o].listener === t) {
          u = n[o].listener, s = o;
          break;
        }
      if (s < 0) return this;
      s === 0 ? n.shift() : No(n, s), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit(
        "removeListener",
        e,
        u || t
      );
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
      for (i = 0; i < s.length; ++i) o = s[i], o !== "removeListener" && this.removeAllListeners(o);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (t = n[e], typeof t == "function") this.removeListener(e, t);
    else if (t !== void 0) for (i = t.length - 1; i >= 0; i--) this.removeListener(e, t[i]);
    return this;
  }, "removeAllListeners");
  function Jn(r, e, t) {
    var n = r._events;
    if (n === void 0) return [];
    var i = n[e];
    return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? Qo(i) : ei(i, i.length);
  }
  __name(Jn, "Jn");
  a(Jn, "_listeners");
  B.prototype.listeners = a(function(e) {
    return Jn(this, e, true);
  }, "listeners");
  B.prototype.rawListeners = a(function(e) {
    return Jn(this, e, false);
  }, "rawListeners");
  B.listenerCount = function(r, e) {
    return typeof r.listenerCount == "function" ? r.listenerCount(e) : Xn.call(r, e);
  };
  B.prototype.listenerCount = Xn;
  function Xn(r) {
    var e = this._events;
    if (e !== void 0) {
      var t = e[r];
      if (typeof t == "function") return 1;
      if (t !== void 0) return t.length;
    }
    return 0;
  }
  __name(Xn, "Xn");
  a(Xn, "listenerCount");
  B.prototype.eventNames = a(function() {
    return this._eventsCount > 0 ? at(this._events) : [];
  }, "eventNames");
  function ei(r, e) {
    for (var t = new Array(e), n = 0; n < e; ++n) t[n] = r[n];
    return t;
  }
  __name(ei, "ei");
  a(ei, "arrayClone");
  function No(r, e) {
    for (; e + 1 < r.length; e++) r[e] = r[e + 1];
    r.pop();
  }
  __name(No, "No");
  a(No, "spliceOne");
  function Qo(r) {
    for (var e = new Array(r.length), t = 0; t < e.length; ++t)
      e[t] = r[t].listener || r[t];
    return e;
  }
  __name(Qo, "Qo");
  a(Qo, "unwrapListeners");
  function Wo(r, e) {
    return new Promise(
      function(t, n) {
        function i(o) {
          r.removeListener(e, s), n(o);
        }
        __name(i, "i");
        a(i, "errorListener");
        function s() {
          typeof r.removeListener == "function" && r.removeListener("error", i), t([].slice.call(
            arguments
          ));
        }
        __name(s, "s");
        a(s, "resolver"), ti(r, e, s, { once: true }), e !== "error" && jo(r, i, { once: true });
      }
    );
  }
  __name(Wo, "Wo");
  a(Wo, "once");
  function jo(r, e, t) {
    typeof r.on == "function" && ti(r, "error", e, t);
  }
  __name(jo, "jo");
  a(
    jo,
    "addErrorHandlerIfEventEmitter"
  );
  function ti(r, e, t, n) {
    if (typeof r.on == "function")
      n.once ? r.once(e, t) : r.on(e, t);
    else if (typeof r.addEventListener == "function") r.addEventListener(
      e,
      a(/* @__PURE__ */ __name(function i(s) {
        n.once && r.removeEventListener(e, i), t(s);
      }, "i"), "wrapListener")
    );
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
  }
  __name(ti, "ti");
  a(ti, "eventTargetAgnosticAddListener");
});
var He = {};
X(He, { default: /* @__PURE__ */ __name(() => Ho, "default") });
var Ho;
var Ge = K(() => {
  "use strict";
  p();
  Ho = {};
});
function $e(r) {
  let e = 1779033703, t = 3144134277, n = 1013904242, i = 2773480762, s = 1359893119, o = 2600822924, u = 528734635, c = 1541459225, h = 0, l = 0, y = [
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
  ], E = a(
    (A, g) => A >>> g | A << 32 - g,
    "rrot"
  ), _ = new Uint32Array(64), P = new Uint8Array(64), N = a(() => {
    for (let L = 0, G = 0; L < 16; L++, G += 4) _[L] = P[G] << 24 | P[G + 1] << 16 | P[G + 2] << 8 | P[G + 3];
    for (let L = 16; L < 64; L++) {
      let G = E(_[L - 15], 7) ^ E(_[L - 15], 18) ^ _[L - 15] >>> 3, ce = E(_[L - 2], 17) ^ E(_[L - 2], 19) ^ _[L - 2] >>> 10;
      _[L] = _[L - 16] + G + _[L - 7] + ce | 0;
    }
    let A = e, g = t, D = n, H = i, Q = s, W = o, ue = u, de = c;
    for (let L = 0; L < 64; L++) {
      let G = E(
        Q,
        6
      ) ^ E(Q, 11) ^ E(Q, 25), ce = Q & W ^ ~Q & ue, ye = de + G + ce + y[L] + _[L] | 0, xe = E(A, 2) ^ E(A, 13) ^ E(A, 22), he = A & g ^ A & D ^ g & D, ie = xe + he | 0;
      de = ue, ue = W, W = Q, Q = H + ye | 0, H = D, D = g, g = A, A = ye + ie | 0;
    }
    e = e + A | 0, t = t + g | 0, n = n + D | 0, i = i + H | 0, s = s + Q | 0, o = o + W | 0, u = u + ue | 0, c = c + de | 0, l = 0;
  }, "process"), J = a((A) => {
    typeof A == "string" && (A = new TextEncoder().encode(A));
    for (let g = 0; g < A.length; g++) P[l++] = A[g], l === 64 && N();
    h += A.length;
  }, "add"), pe = a(() => {
    if (P[l++] = 128, l == 64 && N(), l + 8 > 64) {
      for (; l < 64; ) P[l++] = 0;
      N();
    }
    for (; l < 58; ) P[l++] = 0;
    let A = h * 8;
    P[l++] = A / 1099511627776 & 255, P[l++] = A / 4294967296 & 255, P[l++] = A >>> 24, P[l++] = A >>> 16 & 255, P[l++] = A >>> 8 & 255, P[l++] = A & 255, N();
    let g = new Uint8Array(32);
    return g[0] = e >>> 24, g[1] = e >>> 16 & 255, g[2] = e >>> 8 & 255, g[3] = e & 255, g[4] = t >>> 24, g[5] = t >>> 16 & 255, g[6] = t >>> 8 & 255, g[7] = t & 255, g[8] = n >>> 24, g[9] = n >>> 16 & 255, g[10] = n >>> 8 & 255, g[11] = n & 255, g[12] = i >>> 24, g[13] = i >>> 16 & 255, g[14] = i >>> 8 & 255, g[15] = i & 255, g[16] = s >>> 24, g[17] = s >>> 16 & 255, g[18] = s >>> 8 & 255, g[19] = s & 255, g[20] = o >>> 24, g[21] = o >>> 16 & 255, g[22] = o >>> 8 & 255, g[23] = o & 255, g[24] = u >>> 24, g[25] = u >>> 16 & 255, g[26] = u >>> 8 & 255, g[27] = u & 255, g[28] = c >>> 24, g[29] = c >>> 16 & 255, g[30] = c >>> 8 & 255, g[31] = c & 255, g;
  }, "digest");
  return r === void 0 ? { add: J, digest: pe } : (J(r), pe());
}
__name($e, "$e");
var ri = K(
  () => {
    "use strict";
    p();
    a($e, "sha256");
  }
);
var O;
var Ke;
var ni = K(() => {
  "use strict";
  p();
  O = class O2 {
    static {
      __name(this, "O");
    }
    constructor() {
      T(
        this,
        "_dataLength",
        0
      );
      T(this, "_bufferLength", 0);
      T(this, "_state", new Int32Array(4));
      T(
        this,
        "_buffer",
        new ArrayBuffer(68)
      );
      T(this, "_buffer8");
      T(this, "_buffer32");
      this._buffer8 = new Uint8Array(
        this._buffer,
        0,
        68
      ), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
    }
    static hashByteArray(e, t = false) {
      return this.onePassHasher.start().appendByteArray(e).end(t);
    }
    static hashStr(e, t = false) {
      return this.onePassHasher.start().appendStr(e).end(t);
    }
    static hashAsciiStr(e, t = false) {
      return this.onePassHasher.start().appendAsciiStr(e).end(t);
    }
    static _hex(e) {
      let t = O2.hexChars, n = O2.hexOut, i, s, o, u;
      for (u = 0; u < 4; u += 1) for (s = u * 8, i = e[u], o = 0; o < 8; o += 2) n[s + 1 + o] = t.charAt(i & 15), i >>>= 4, n[s + 0 + o] = t.charAt(i & 15), i >>>= 4;
      return n.join("");
    }
    static _md5cycle(e, t) {
      let n = e[0], i = e[1], s = e[2], o = e[3];
      n += (i & s | ~i & o) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[1] - 389564586 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[5] + 1200080426 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[9] - 1958414417 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[10] - 42063 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[13] - 40341101 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & o | s & ~o) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[6] - 1069501632 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[10] + 38016083 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[14] - 1019803690 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[2] - 51403784 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i ^ s ^ o) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[8] - 2022574463 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[4] + 1272893353 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[0] - 358537222 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[12] - 421815835 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (s ^ (i | ~o)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[7] + 1126891415 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[3] - 1894986606 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[15] - 30611744 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[11] - 1120210379 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s + e[2] | 0, e[3] = o + e[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(O2.stateIdentity), this;
    }
    appendStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o;
      for (o = 0; o < e.length; o += 1) {
        if (s = e.charCodeAt(o), s < 128) t[i++] = s;
        else if (s < 2048) t[i++] = (s >>> 6) + 192, t[i++] = s & 63 | 128;
        else if (s < 55296 || s > 56319) t[i++] = (s >>> 12) + 224, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        else {
          if (s = (s - 55296) * 1024 + (e.charCodeAt(++o) - 56320) + 65536, s > 1114111) throw new Error("Unicode standard supports code points up to U+10FFFF");
          t[i++] = (s >>> 18) + 240, t[i++] = s >>> 12 & 63 | 128, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
        }
        i >= 64 && (this._dataLength += 64, O2._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
      }
      return this._bufferLength = i, this;
    }
    appendAsciiStr(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o, 64 - i); s--; ) t[i++] = e.charCodeAt(o++);
        if (i < 64) break;
        this._dataLength += 64, O2._md5cycle(
          this._state,
          n
        ), i = 0;
      }
      return this._bufferLength = i, this;
    }
    appendByteArray(e) {
      let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
      for (; ; ) {
        for (s = Math.min(e.length - o, 64 - i); s--; ) t[i++] = e[o++];
        if (i < 64) break;
        this._dataLength += 64, O2._md5cycle(
          this._state,
          n
        ), i = 0;
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
      if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, i.set(O2.buffer32Identity.subarray(s), s), t > 55 && (O2._md5cycle(this._state, i), i.set(O2.buffer32Identity)), o <= 4294967295)
        i[14] = o;
      else {
        let u = o.toString(16).match(/(.*?)(.{0,8})$/);
        if (u === null) return;
        let c = parseInt(
          u[2],
          16
        ), h = parseInt(u[1], 16) || 0;
        i[14] = c, i[15] = h;
      }
      return O2._md5cycle(this._state, i), e ? this._state : O2._hex(this._state);
    }
  };
  a(O, "Md5"), T(O, "stateIdentity", new Int32Array(
    [1732584193, -271733879, -1732584194, 271733878]
  )), T(O, "buffer32Identity", new Int32Array(
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  )), T(O, "hexChars", "0123456789abcdef"), T(O, "hexOut", []), T(O, "onePassHasher", new O());
  Ke = O;
});
var Ut = {};
X(Ut, { createHash: /* @__PURE__ */ __name(() => $o, "createHash"), createHmac: /* @__PURE__ */ __name(() => Ko, "createHmac"), randomBytes: /* @__PURE__ */ __name(() => Go, "randomBytes") });
function Go(r) {
  return w.getRandomValues(d.alloc(r));
}
__name(Go, "Go");
function $o(r) {
  if (r === "sha256") return { update: /* @__PURE__ */ __name(function(e) {
    return { digest: /* @__PURE__ */ __name(function() {
      return d.from($e(e));
    }, "digest") };
  }, "update") };
  if (r === "md5") return { update: /* @__PURE__ */ __name(function(e) {
    return { digest: /* @__PURE__ */ __name(function() {
      return typeof e == "string" ? Ke.hashStr(e) : Ke.hashByteArray(
        e
      );
    }, "digest") };
  }, "update") };
  throw new Error(`Hash type '${r}' not supported`);
}
__name($o, "$o");
function Ko(r, e) {
  if (r !== "sha256") throw new Error(`Only sha256 is supported (requested: '${r}')`);
  return {
    update: /* @__PURE__ */ __name(function(t) {
      return { digest: /* @__PURE__ */ __name(function() {
        typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(t));
        let n = e.length;
        if (n > 64) e = $e(e);
        else if (n < 64) {
          let c = new Uint8Array(64);
          c.set(e), e = c;
        }
        let i = new Uint8Array(
          64
        ), s = new Uint8Array(64);
        for (let c = 0; c < 64; c++) i[c] = 54 ^ e[c], s[c] = 92 ^ e[c];
        let o = new Uint8Array(
          t.length + 64
        );
        o.set(i, 0), o.set(t, 64);
        let u = new Uint8Array(96);
        return u.set(s, 0), u.set($e(o), 64), d.from($e(u));
      }, "digest") };
    }, "update")
  };
}
__name(Ko, "Ko");
var qt = K(() => {
  "use strict";
  p();
  ri();
  ni();
  a(Go, "randomBytes");
  a($o, "createHash");
  a(Ko, "createHmac");
});
var Qt = I((ii) => {
  "use strict";
  p();
  ii.parse = function(r, e) {
    return new Nt(r, e).parse();
  };
  var ct = class ct2 {
    static {
      __name(this, "ct");
    }
    constructor(e, t) {
      this.source = e, this.transform = t || Vo, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var e = this.source[this.position++];
      return e === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e, escaped: false };
    }
    record(e) {
      this.recorded.push(e);
    }
    newEntry(e) {
      var t;
      (this.recorded.length > 0 || e) && (t = this.recorded.join(""), t === "NULL" && !e && (t = null), t !== null && (t = this.transform(t)), this.entries.push(
        t
      ), this.recorded = []);
    }
    consumeDimensions() {
      if (this.source[0] === "[") for (; !this.isEof(); ) {
        var e = this.nextCharacter();
        if (e.value === "=") break;
      }
    }
    parse(e) {
      var t, n, i;
      for (this.consumeDimensions(); !this.isEof(); ) if (t = this.nextCharacter(), t.value === "{" && !i) this.dimension++, this.dimension > 1 && (n = new ct2(this.source.substr(this.position - 1), this.transform), this.entries.push(
        n.parse(true)
      ), this.position += n.position - 2);
      else if (t.value === "}" && !i) {
        if (this.dimension--, !this.dimension && (this.newEntry(), e)) return this.entries;
      } else t.value === '"' && !t.escaped ? (i && this.newEntry(true), i = !i) : t.value === "," && !i ? this.newEntry() : this.record(
        t.value
      );
      if (this.dimension !== 0) throw new Error("array dimension not balanced");
      return this.entries;
    }
  };
  a(ct, "ArrayParser");
  var Nt = ct;
  function Vo(r) {
    return r;
  }
  __name(Vo, "Vo");
  a(Vo, "identity");
});
var Wt = I((yh, si) => {
  p();
  var zo = Qt();
  si.exports = { create: /* @__PURE__ */ __name(function(r, e) {
    return { parse: /* @__PURE__ */ __name(function() {
      return zo.parse(r, e);
    }, "parse") };
  }, "create") };
});
var ui = I((gh, ai) => {
  "use strict";
  p();
  var Yo = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, Zo = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, Jo = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, Xo = /^-?infinity$/;
  ai.exports = a(function(e) {
    if (Xo.test(e)) return Number(e.replace("i", "I"));
    var t = Yo.exec(e);
    if (!t) return ea(e) || null;
    var n = !!t[8], i = parseInt(t[1], 10);
    n && (i = oi(i));
    var s = parseInt(
      t[2],
      10
    ) - 1, o = t[3], u = parseInt(t[4], 10), c = parseInt(t[5], 10), h = parseInt(t[6], 10), l = t[7];
    l = l ? 1e3 * parseFloat(l) : 0;
    var y, E = ta(e);
    return E != null ? (y = new Date(Date.UTC(
      i,
      s,
      o,
      u,
      c,
      h,
      l
    )), jt(i) && y.setUTCFullYear(i), E !== 0 && y.setTime(y.getTime() - E)) : (y = new Date(
      i,
      s,
      o,
      u,
      c,
      h,
      l
    ), jt(i) && y.setFullYear(i)), y;
  }, "parseDate");
  function ea(r) {
    var e = Zo.exec(r);
    if (e) {
      var t = parseInt(e[1], 10), n = !!e[4];
      n && (t = oi(t));
      var i = parseInt(
        e[2],
        10
      ) - 1, s = e[3], o = new Date(t, i, s);
      return jt(t) && o.setFullYear(t), o;
    }
  }
  __name(ea, "ea");
  a(ea, "getDate");
  function ta(r) {
    if (r.endsWith("+00")) return 0;
    var e = Jo.exec(r.split(" ")[1]);
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
  __name(ta, "ta");
  a(ta, "timeZoneOffset");
  function oi(r) {
    return -(r - 1);
  }
  __name(oi, "oi");
  a(oi, "bcYearToNegativeYear");
  function jt(r) {
    return r >= 0 && r < 100;
  }
  __name(jt, "jt");
  a(
    jt,
    "is0To99"
  );
});
var hi = I((Sh, ci) => {
  p();
  ci.exports = na;
  var ra = Object.prototype.hasOwnProperty;
  function na(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t) ra.call(
        t,
        n
      ) && (r[n] = t[n]);
    }
    return r;
  }
  __name(na, "na");
  a(na, "extend");
});
var pi = I((vh, fi) => {
  "use strict";
  p();
  var ia = hi();
  fi.exports = Fe;
  function Fe(r) {
    if (!(this instanceof Fe)) return new Fe(r);
    ia(this, ma(r));
  }
  __name(Fe, "Fe");
  a(Fe, "PostgresInterval");
  var sa = ["seconds", "minutes", "hours", "days", "months", "years"];
  Fe.prototype.toPostgres = function() {
    var r = sa.filter(this.hasOwnProperty, this);
    return this.milliseconds && r.indexOf("seconds") < 0 && r.push("seconds"), r.length === 0 ? "0" : r.map(function(e) {
      var t = this[e] || 0;
      return e === "seconds" && this.milliseconds && (t = (t + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), t + " " + e;
    }, this).join(" ");
  };
  var oa = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, aa = ["years", "months", "days"], ua = ["hours", "minutes", "seconds"];
  Fe.prototype.toISOString = Fe.prototype.toISO = function() {
    var r = aa.map(t, this).join(""), e = ua.map(t, this).join("");
    return "P" + r + "T" + e;
    function t(n) {
      var i = this[n] || 0;
      return n === "seconds" && this.milliseconds && (i = (i + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), i + oa[n];
    }
    __name(t, "t");
  };
  var Ht = "([+-]?\\d+)", ca = Ht + "\\s+years?", ha = Ht + "\\s+mons?", la = Ht + "\\s+days?", fa = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", pa = new RegExp([
    ca,
    ha,
    la,
    fa
  ].map(function(r) {
    return "(" + r + ")?";
  }).join("\\s*")), li = {
    years: 2,
    months: 4,
    days: 6,
    hours: 9,
    minutes: 10,
    seconds: 11,
    milliseconds: 12
  }, da = ["hours", "minutes", "seconds", "milliseconds"];
  function ya(r) {
    var e = r + "000000".slice(r.length);
    return parseInt(
      e,
      10
    ) / 1e3;
  }
  __name(ya, "ya");
  a(ya, "parseMilliseconds");
  function ma(r) {
    if (!r) return {};
    var e = pa.exec(
      r
    ), t = e[8] === "-";
    return Object.keys(li).reduce(function(n, i) {
      var s = li[i], o = e[s];
      return !o || (o = i === "milliseconds" ? ya(o) : parseInt(o, 10), !o) || (t && ~da.indexOf(i) && (o *= -1), n[i] = o), n;
    }, {});
  }
  __name(ma, "ma");
  a(ma, "parse");
});
var yi = I((Ch, di) => {
  "use strict";
  p();
  di.exports = a(function(e) {
    if (/^\\x/.test(e)) return new d(
      e.substr(2),
      "hex"
    );
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
var Ei = I((Ph, xi) => {
  p();
  var Ve = Qt(), ze = Wt(), ht = ui(), gi = pi(), wi = yi();
  function lt(r) {
    return a(function(t) {
      return t === null ? t : r(t);
    }, "nullAllowed");
  }
  __name(lt, "lt");
  a(lt, "allowNull");
  function bi(r) {
    return r === null ? r : r === "TRUE" || r === "t" || r === "true" || r === "y" || r === "yes" || r === "on" || r === "1";
  }
  __name(bi, "bi");
  a(bi, "parseBool");
  function ga(r) {
    return r ? Ve.parse(r, bi) : null;
  }
  __name(ga, "ga");
  a(ga, "parseBoolArray");
  function wa(r) {
    return parseInt(r, 10);
  }
  __name(wa, "wa");
  a(wa, "parseBaseTenInt");
  function Gt(r) {
    return r ? Ve.parse(r, lt(wa)) : null;
  }
  __name(Gt, "Gt");
  a(Gt, "parseIntegerArray");
  function ba(r) {
    return r ? Ve.parse(r, lt(function(e) {
      return Si(e).trim();
    })) : null;
  }
  __name(ba, "ba");
  a(ba, "parseBigIntegerArray");
  var Sa = a(function(r) {
    if (!r) return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = zt(t)), t;
    });
    return e.parse();
  }, "parsePointArray"), $t = a(function(r) {
    if (!r)
      return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = parseFloat(t)), t;
    });
    return e.parse();
  }, "parseFloatArray"), te = a(function(r) {
    if (!r) return null;
    var e = ze.create(r);
    return e.parse();
  }, "parseStringArray"), Kt = a(function(r) {
    if (!r) return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = ht(t)), t;
    });
    return e.parse();
  }, "parseDateArray"), xa = a(function(r) {
    if (!r) return null;
    var e = ze.create(r, function(t) {
      return t !== null && (t = gi(t)), t;
    });
    return e.parse();
  }, "parseIntervalArray"), Ea = a(function(r) {
    return r ? Ve.parse(r, lt(wi)) : null;
  }, "parseByteAArray"), Vt = a(function(r) {
    return parseInt(
      r,
      10
    );
  }, "parseInteger"), Si = a(function(r) {
    var e = String(r);
    return /^\d+$/.test(e) ? e : r;
  }, "parseBigInteger"), mi = a(
    function(r) {
      return r ? Ve.parse(r, lt(JSON.parse)) : null;
    },
    "parseJsonArray"
  ), zt = a(function(r) {
    return r[0] !== "(" ? null : (r = r.substring(1, r.length - 1).split(","), { x: parseFloat(r[0]), y: parseFloat(r[1]) });
  }, "parsePoint"), va = a(function(r) {
    if (r[0] !== "<" && r[1] !== "(") return null;
    for (var e = "(", t = "", n = false, i = 2; i < r.length - 1; i++) {
      if (n || (e += r[i]), r[i] === ")") {
        n = true;
        continue;
      } else if (!n) continue;
      r[i] !== "," && (t += r[i]);
    }
    var s = zt(e);
    return s.radius = parseFloat(t), s;
  }, "parseCircle"), _a = a(function(r) {
    r(
      20,
      Si
    ), r(21, Vt), r(23, Vt), r(26, Vt), r(700, parseFloat), r(701, parseFloat), r(16, bi), r(
      1082,
      ht
    ), r(1114, ht), r(1184, ht), r(600, zt), r(651, te), r(718, va), r(1e3, ga), r(1001, Ea), r(
      1005,
      Gt
    ), r(1007, Gt), r(1028, Gt), r(1016, ba), r(1017, Sa), r(1021, $t), r(1022, $t), r(1231, $t), r(1014, te), r(1015, te), r(1008, te), r(1009, te), r(1040, te), r(1041, te), r(1115, Kt), r(
      1182,
      Kt
    ), r(1185, Kt), r(1186, gi), r(1187, xa), r(17, wi), r(114, JSON.parse.bind(JSON)), r(
      3802,
      JSON.parse.bind(JSON)
    ), r(199, mi), r(3807, mi), r(3907, te), r(2951, te), r(791, te), r(
      1183,
      te
    ), r(1270, te);
  }, "init");
  xi.exports = { init: _a };
});
var _i = I((Rh, vi) => {
  "use strict";
  p();
  var Y = 1e6;
  function Aa(r) {
    var e = r.readInt32BE(
      0
    ), t = r.readUInt32BE(4), n = "";
    e < 0 && (e = ~e + (t === 0), t = ~t + 1 >>> 0, n = "-");
    var i = "", s, o, u, c, h, l;
    {
      if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0) return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++) c += "0";
      i = c + u + i;
    }
    {
      if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0) return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++) c += "0";
      i = c + u + i;
    }
    {
      if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0) return n + u + i;
      for (c = "", h = 6 - u.length, l = 0; l < h; l++) c += "0";
      i = c + u + i;
    }
    return s = e % Y, o = 4294967296 * s + t, u = "" + o % Y, n + u + i;
  }
  __name(Aa, "Aa");
  a(Aa, "readInt8");
  vi.exports = Aa;
});
var Pi = I((Dh, Ti) => {
  p();
  var Ca = _i(), R = a(function(r, e, t, n, i) {
    t = t || 0, n = n || false, i = i || function(_, P, N) {
      return _ * Math.pow(2, N) + P;
    };
    var s = t >> 3, o = a(function(_) {
      return n ? ~_ & 255 : _;
    }, "inv"), u = 255, c = 8 - t % 8;
    e < c && (u = 255 << 8 - e & 255, c = e), t && (u = u >> t % 8);
    var h = 0;
    t % 8 + e >= 8 && (h = i(0, o(r[s]) & u, c));
    for (var l = e + t >> 3, y = s + 1; y < l; y++) h = i(h, o(r[y]), 8);
    var E = (e + t) % 8;
    return E > 0 && (h = i(h, o(r[l]) >> 8 - E, E)), h;
  }, "parseBits"), Ii = a(function(r, e, t) {
    var n = Math.pow(2, t - 1) - 1, i = R(r, 1), s = R(r, t, 1);
    if (s === 0) return 0;
    var o = 1, u = a(function(h, l, y) {
      h === 0 && (h = 1);
      for (var E = 1; E <= y; E++) o /= 2, (l & 1 << y - E) > 0 && (h += o);
      return h;
    }, "parsePrecisionBits"), c = R(r, e, t + 1, false, u);
    return s == Math.pow(2, t + 1) - 1 ? c === 0 ? i === 0 ? 1 / 0 : -1 / 0 : NaN : (i === 0 ? 1 : -1) * Math.pow(2, s - n) * c;
  }, "parseFloatFromBits"), Ia = a(function(r) {
    return R(r, 1) == 1 ? -1 * (R(r, 15, 1, true) + 1) : R(r, 15, 1);
  }, "parseInt16"), Ai = a(function(r) {
    return R(r, 1) == 1 ? -1 * (R(
      r,
      31,
      1,
      true
    ) + 1) : R(r, 31, 1);
  }, "parseInt32"), Ta = a(function(r) {
    return Ii(r, 23, 8);
  }, "parseFloat32"), Pa = a(function(r) {
    return Ii(r, 52, 11);
  }, "parseFloat64"), Ba = a(function(r) {
    var e = R(r, 16, 32);
    if (e == 49152) return NaN;
    for (var t = Math.pow(1e4, R(r, 16, 16)), n = 0, i = [], s = R(r, 16), o = 0; o < s; o++) n += R(r, 16, 64 + 16 * o) * t, t /= 1e4;
    var u = Math.pow(10, R(r, 16, 48));
    return (e === 0 ? 1 : -1) * Math.round(n * u) / u;
  }, "parseNumeric"), Ci = a(function(r, e) {
    var t = R(
      e,
      1
    ), n = R(e, 63, 1), i = new Date((t === 0 ? 1 : -1) * n / 1e3 + 9466848e5);
    return r || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4), i.usec = n % 1e3, i.getMicroSeconds = function() {
      return this.usec;
    }, i.setMicroSeconds = function(s) {
      this.usec = s;
    }, i.getUTCMicroSeconds = function() {
      return this.usec;
    }, i;
  }, "parseDate"), Ye = a(function(r) {
    for (var e = R(r, 32), t = R(r, 32, 32), n = R(r, 32, 64), i = 96, s = [], o = 0; o < e; o++) s[o] = R(r, 32, i), i += 32, i += 32;
    var u = a(function(h) {
      var l = R(r, 32, i);
      if (i += 32, l == 4294967295) return null;
      var y;
      if (h == 23 || h == 20) return y = R(r, l * 8, i), i += l * 8, y;
      if (h == 25) return y = r.toString(this.encoding, i >> 3, (i += l << 3) >> 3), y;
      console.log("ERROR: ElementType not implemented: " + h);
    }, "parseElement"), c = a(function(h, l) {
      var y = [], E;
      if (h.length > 1) {
        var _ = h.shift();
        for (E = 0; E < _; E++) y[E] = c(h, l);
        h.unshift(
          _
        );
      } else for (E = 0; E < h[0]; E++) y[E] = u(l);
      return y;
    }, "parse");
    return c(s, n);
  }, "parseArray"), La = a(function(r) {
    return r.toString("utf8");
  }, "parseText"), Ra = a(function(r) {
    return r === null ? null : R(r, 8) > 0;
  }, "parseBool"), Fa = a(function(r) {
    r(20, Ca), r(21, Ia), r(23, Ai), r(
      26,
      Ai
    ), r(1700, Ba), r(700, Ta), r(701, Pa), r(16, Ra), r(1114, Ci.bind(null, false)), r(1184, Ci.bind(
      null,
      true
    )), r(1e3, Ye), r(1007, Ye), r(1016, Ye), r(1008, Ye), r(1009, Ye), r(25, La);
  }, "init");
  Ti.exports = { init: Fa };
});
var Li = I((Uh, Bi) => {
  p();
  Bi.exports = {
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
var Xe = I((Je) => {
  p();
  var Ma = Ei(), Da = Pi(), Oa = Wt(), ka = Li();
  Je.getTypeParser = Ua;
  Je.setTypeParser = qa;
  Je.arrayParser = Oa;
  Je.builtins = ka;
  var Ze = { text: {}, binary: {} };
  function Ri(r) {
    return String(
      r
    );
  }
  __name(Ri, "Ri");
  a(Ri, "noParse");
  function Ua(r, e) {
    return e = e || "text", Ze[e] && Ze[e][r] || Ri;
  }
  __name(Ua, "Ua");
  a(
    Ua,
    "getTypeParser"
  );
  function qa(r, e, t) {
    typeof e == "function" && (t = e, e = "text"), Ze[e][r] = t;
  }
  __name(qa, "qa");
  a(qa, "setTypeParser");
  Ma.init(function(r, e) {
    Ze.text[r] = e;
  });
  Da.init(function(r, e) {
    Ze.binary[r] = e;
  });
});
var et = I((jh, Yt) => {
  "use strict";
  p();
  Yt.exports = {
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
  var Me = Xe(), Na = Me.getTypeParser(
    20,
    "text"
  ), Qa = Me.getTypeParser(1016, "text");
  Yt.exports.__defineSetter__("parseInt8", function(r) {
    Me.setTypeParser(20, "text", r ? Me.getTypeParser(23, "text") : Na), Me.setTypeParser(1016, "text", r ? Me.getTypeParser(1007, "text") : Qa);
  });
});
var tt = I((Gh, Mi) => {
  "use strict";
  p();
  var Wa = (qt(), k(Ut)), ja = et();
  function Ha(r) {
    var e = r.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return '"' + e + '"';
  }
  __name(Ha, "Ha");
  a(Ha, "escapeElement");
  function Fi(r) {
    for (var e = "{", t = 0; t < r.length; t++) t > 0 && (e = e + ","), r[t] === null || typeof r[t] > "u" ? e = e + "NULL" : Array.isArray(r[t]) ? e = e + Fi(r[t]) : r[t] instanceof d ? e += "\\\\x" + r[t].toString("hex") : e += Ha(ft(r[t]));
    return e = e + "}", e;
  }
  __name(Fi, "Fi");
  a(Fi, "arrayString");
  var ft = a(function(r, e) {
    if (r == null) return null;
    if (r instanceof d) return r;
    if (ArrayBuffer.isView(r)) {
      var t = d.from(r.buffer, r.byteOffset, r.byteLength);
      return t.length === r.byteLength ? t : t.slice(
        r.byteOffset,
        r.byteOffset + r.byteLength
      );
    }
    return r instanceof Date ? ja.parseInputDatesAsUTC ? Ka(r) : $a(r) : Array.isArray(r) ? Fi(r) : typeof r == "object" ? Ga(r, e) : r.toString();
  }, "prepareValue");
  function Ga(r, e) {
    if (r && typeof r.toPostgres == "function") {
      if (e = e || [], e.indexOf(r) !== -1) throw new Error('circular reference detected while preparing "' + r + '" for query');
      return e.push(r), ft(r.toPostgres(ft), e);
    }
    return JSON.stringify(r);
  }
  __name(Ga, "Ga");
  a(Ga, "prepareObject");
  function j(r, e) {
    for (r = "" + r; r.length < e; ) r = "0" + r;
    return r;
  }
  __name(j, "j");
  a(
    j,
    "pad"
  );
  function $a(r) {
    var e = -r.getTimezoneOffset(), t = r.getFullYear(), n = t < 1;
    n && (t = Math.abs(t) + 1);
    var i = j(t, 4) + "-" + j(r.getMonth() + 1, 2) + "-" + j(r.getDate(), 2) + "T" + j(r.getHours(), 2) + ":" + j(r.getMinutes(), 2) + ":" + j(r.getSeconds(), 2) + "." + j(
      r.getMilliseconds(),
      3
    );
    return e < 0 ? (i += "-", e *= -1) : i += "+", i += j(Math.floor(e / 60), 2) + ":" + j(e % 60, 2), n && (i += " BC"), i;
  }
  __name($a, "$a");
  a($a, "dateToString");
  function Ka(r) {
    var e = r.getUTCFullYear(), t = e < 1;
    t && (e = Math.abs(e) + 1);
    var n = j(e, 4) + "-" + j(r.getUTCMonth() + 1, 2) + "-" + j(r.getUTCDate(), 2) + "T" + j(r.getUTCHours(), 2) + ":" + j(r.getUTCMinutes(), 2) + ":" + j(r.getUTCSeconds(), 2) + "." + j(r.getUTCMilliseconds(), 3);
    return n += "+00:00", t && (n += " BC"), n;
  }
  __name(Ka, "Ka");
  a(Ka, "dateToStringUTC");
  function Va(r, e, t) {
    return r = typeof r == "string" ? { text: r } : r, e && (typeof e == "function" ? r.callback = e : r.values = e), t && (r.callback = t), r;
  }
  __name(Va, "Va");
  a(Va, "normalizeQueryConfig");
  var Zt = a(function(r) {
    return Wa.createHash("md5").update(r, "utf-8").digest("hex");
  }, "md5"), za = a(function(r, e, t) {
    var n = Zt(e + r), i = Zt(d.concat([d.from(n), t]));
    return "md5" + i;
  }, "postgresMd5PasswordHash");
  Mi.exports = { prepareValue: a(function(e) {
    return ft(
      e
    );
  }, "prepareValueWrapper"), normalizeQueryConfig: Va, postgresMd5PasswordHash: za, md5: Zt };
});
var qi = I((Vh, Ui) => {
  "use strict";
  p();
  var Jt = (qt(), k(Ut));
  function Ya(r) {
    if (r.indexOf(
      "SCRAM-SHA-256"
    ) === -1) throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let e = Jt.randomBytes(18).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: e, response: "n,,n=*,r=" + e, message: "SASLInitialResponse" };
  }
  __name(Ya, "Ya");
  a(Ya, "startSession");
  function Za(r, e, t) {
    if (r.message !== "SASLInitialResponse") throw new Error(
      "SASL: Last message was not SASLInitialResponse"
    );
    if (typeof e != "string") throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
    );
    if (typeof t != "string") throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    let n = eu(t);
    if (n.nonce.startsWith(r.clientNonce)) {
      if (n.nonce.length === r.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    var i = d.from(n.salt, "base64"), s = nu(
      e,
      i,
      n.iteration
    ), o = De(s, "Client Key"), u = ru(o), c = "n=*,r=" + r.clientNonce, h = "r=" + n.nonce + ",s=" + n.salt + ",i=" + n.iteration, l = "c=biws,r=" + n.nonce, y = c + "," + h + "," + l, E = De(u, y), _ = ki(
      o,
      E
    ), P = _.toString("base64"), N = De(s, "Server Key"), J = De(N, y);
    r.message = "SASLResponse", r.serverSignature = J.toString("base64"), r.response = l + ",p=" + P;
  }
  __name(Za, "Za");
  a(Za, "continueSession");
  function Ja(r, e) {
    if (r.message !== "SASLResponse") throw new Error("SASL: Last message was not SASLResponse");
    if (typeof e != "string") throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    let { serverSignature: t } = tu(
      e
    );
    if (t !== r.serverSignature) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
  __name(Ja, "Ja");
  a(Ja, "finalizeSession");
  function Xa(r) {
    if (typeof r != "string") throw new TypeError("SASL: text must be a string");
    return r.split("").map(
      (e, t) => r.charCodeAt(t)
    ).every((e) => e >= 33 && e <= 43 || e >= 45 && e <= 126);
  }
  __name(Xa, "Xa");
  a(Xa, "isPrintableChars");
  function Di(r) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r);
  }
  __name(Di, "Di");
  a(Di, "isBase64");
  function Oi(r) {
    if (typeof r != "string") throw new TypeError(
      "SASL: attribute pairs text must be a string"
    );
    return new Map(r.split(",").map((e) => {
      if (!/^.=/.test(e)) throw new Error("SASL: Invalid attribute pair entry");
      let t = e[0], n = e.substring(2);
      return [t, n];
    }));
  }
  __name(Oi, "Oi");
  a(Oi, "parseAttributePairs");
  function eu(r) {
    let e = Oi(
      r
    ), t = e.get("r");
    if (t) {
      if (!Xa(t)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    let n = e.get("s");
    if (n) {
      if (!Di(n)) throw new Error(
        "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64"
      );
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    let i = e.get("i");
    if (i) {
      if (!/^[1-9][0-9]*$/.test(i)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let s = parseInt(i, 10);
    return { nonce: t, salt: n, iteration: s };
  }
  __name(eu, "eu");
  a(eu, "parseServerFirstMessage");
  function tu(r) {
    let t = Oi(r).get("v");
    if (t) {
      if (!Di(t)) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    } else throw new Error(
      "SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing"
    );
    return { serverSignature: t };
  }
  __name(tu, "tu");
  a(tu, "parseServerFinalMessage");
  function ki(r, e) {
    if (!d.isBuffer(r)) throw new TypeError(
      "first argument must be a Buffer"
    );
    if (!d.isBuffer(e)) throw new TypeError("second argument must be a Buffer");
    if (r.length !== e.length) throw new Error("Buffer lengths must match");
    if (r.length === 0) throw new Error("Buffers cannot be empty");
    return d.from(r.map((t, n) => r[n] ^ e[n]));
  }
  __name(ki, "ki");
  a(ki, "xorBuffers");
  function ru(r) {
    return Jt.createHash(
      "sha256"
    ).update(r).digest();
  }
  __name(ru, "ru");
  a(ru, "sha256");
  function De(r, e) {
    return Jt.createHmac(
      "sha256",
      r
    ).update(e).digest();
  }
  __name(De, "De");
  a(De, "hmacSha256");
  function nu(r, e, t) {
    for (var n = De(
      r,
      d.concat([e, d.from([0, 0, 0, 1])])
    ), i = n, s = 0; s < t - 1; s++) n = De(r, n), i = ki(i, n);
    return i;
  }
  __name(nu, "nu");
  a(nu, "Hi");
  Ui.exports = { startSession: Ya, continueSession: Za, finalizeSession: Ja };
});
var Xt = {};
X(Xt, { join: /* @__PURE__ */ __name(() => iu, "join") });
function iu(...r) {
  return r.join("/");
}
__name(iu, "iu");
var er = K(() => {
  "use strict";
  p();
  a(iu, "join");
});
var tr = {};
X(tr, { stat: /* @__PURE__ */ __name(() => su, "stat") });
function su(r, e) {
  e(new Error("No filesystem"));
}
__name(su, "su");
var rr = K(
  () => {
    "use strict";
    p();
    a(su, "stat");
  }
);
var nr = {};
X(nr, { default: /* @__PURE__ */ __name(() => ou, "default") });
var ou;
var ir = K(() => {
  "use strict";
  p();
  ou = {};
});
var Ni = {};
X(Ni, { StringDecoder: /* @__PURE__ */ __name(() => sr, "StringDecoder") });
var or;
var sr;
var Qi = K(() => {
  "use strict";
  p();
  or = class or {
    static {
      __name(this, "or");
    }
    constructor(e) {
      T(this, "td");
      this.td = new TextDecoder(e);
    }
    write(e) {
      return this.td.decode(e, { stream: true });
    }
    end(e) {
      return this.td.decode(e);
    }
  };
  a(or, "StringDecoder");
  sr = or;
});
var Gi = I((il, Hi) => {
  "use strict";
  p();
  var { Transform: au } = (ir(), k(nr)), { StringDecoder: uu } = (Qi(), k(Ni)), we = Symbol("last"), pt = Symbol("decoder");
  function cu(r, e, t) {
    let n;
    if (this.overflow) {
      if (n = this[pt].write(r).split(this.matcher), n.length === 1) return t();
      n.shift(), this.overflow = false;
    } else this[we] += this[pt].write(r), n = this[we].split(this.matcher);
    this[we] = n.pop();
    for (let i = 0; i < n.length; i++) try {
      ji(this, this.mapper(n[i]));
    } catch (s) {
      return t(
        s
      );
    }
    if (this.overflow = this[we].length > this.maxLength, this.overflow && !this.skipOverflow) {
      t(new Error("maximum buffer reached"));
      return;
    }
    t();
  }
  __name(cu, "cu");
  a(cu, "transform");
  function hu(r) {
    if (this[we] += this[pt].end(), this[we]) try {
      ji(this, this.mapper(this[we]));
    } catch (e) {
      return r(e);
    }
    r();
  }
  __name(hu, "hu");
  a(hu, "flush");
  function ji(r, e) {
    e !== void 0 && r.push(e);
  }
  __name(ji, "ji");
  a(ji, "push");
  function Wi(r) {
    return r;
  }
  __name(Wi, "Wi");
  a(Wi, "noop");
  function lu(r, e, t) {
    switch (r = r || /\r?\n/, e = e || Wi, t = t || {}, arguments.length) {
      case 1:
        typeof r == "function" ? (e = r, r = /\r?\n/) : typeof r == "object" && !(r instanceof RegExp) && !r[Symbol.split] && (t = r, r = /\r?\n/);
        break;
      case 2:
        typeof r == "function" ? (t = e, e = r, r = /\r?\n/) : typeof e == "object" && (t = e, e = Wi);
    }
    t = Object.assign({}, t), t.autoDestroy = true, t.transform = cu, t.flush = hu, t.readableObjectMode = true;
    let n = new au(t);
    return n[we] = "", n[pt] = new uu("utf8"), n.matcher = r, n.mapper = e, n.maxLength = t.maxLength, n.skipOverflow = t.skipOverflow || false, n.overflow = false, n._destroy = function(i, s) {
      this._writableState.errorEmitted = false, s(i);
    }, n;
  }
  __name(lu, "lu");
  a(lu, "split");
  Hi.exports = lu;
});
var Vi = I((al, fe) => {
  "use strict";
  p();
  var $i = (er(), k(Xt)), fu = (ir(), k(nr)).Stream, pu = Gi(), Ki = (Ge(), k(He)), du = 5432, dt = m.platform === "win32", rt = m.stderr, yu = 56, mu = 7, gu = 61440, wu = 32768;
  function bu(r) {
    return (r & gu) == wu;
  }
  __name(bu, "bu");
  a(bu, "isRegFile");
  var Oe = [
    "host",
    "port",
    "database",
    "user",
    "password"
  ], ar = Oe.length, Su = Oe[ar - 1];
  function ur() {
    var r = rt instanceof fu && rt.writable === true;
    if (r) {
      var e = Array.prototype.slice.call(arguments).concat(`
`);
      rt.write(Ki.format.apply(Ki, e));
    }
  }
  __name(ur, "ur");
  a(ur, "warn");
  Object.defineProperty(
    fe.exports,
    "isWin",
    { get: /* @__PURE__ */ __name(function() {
      return dt;
    }, "get"), set: /* @__PURE__ */ __name(function(r) {
      dt = r;
    }, "set") }
  );
  fe.exports.warnTo = function(r) {
    var e = rt;
    return rt = r, e;
  };
  fe.exports.getFileName = function(r) {
    var e = r || m.env, t = e.PGPASSFILE || (dt ? $i.join(e.APPDATA || "./", "postgresql", "pgpass.conf") : $i.join(e.HOME || "./", ".pgpass"));
    return t;
  };
  fe.exports.usePgPass = function(r, e) {
    return Object.prototype.hasOwnProperty.call(m.env, "PGPASSWORD") ? false : dt ? true : (e = e || "<unkn>", bu(r.mode) ? r.mode & (yu | mu) ? (ur('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e), false) : true : (ur(
      'WARNING: password file "%s" is not a plain file',
      e
    ), false));
  };
  var xu = fe.exports.match = function(r, e) {
    return Oe.slice(0, -1).reduce(
      function(t, n, i) {
        return i == 1 && Number(r[n] || du) === Number(e[n]) ? t && true : t && (e[n] === "*" || e[n] === r[n]);
      },
      true
    );
  };
  fe.exports.getPassword = function(r, e, t) {
    var n, i = e.pipe(pu());
    function s(c) {
      var h = Eu(
        c
      );
      h && vu(h) && xu(r, h) && (n = h[Su], i.end());
    }
    __name(s, "s");
    a(s, "onLine");
    var o = a(function() {
      e.destroy(), t(n);
    }, "onEnd"), u = a(function(c) {
      e.destroy(), ur("WARNING: error on reading file: %s", c), t(void 0);
    }, "onErr");
    e.on("error", u), i.on("data", s).on("end", o).on(
      "error",
      u
    );
  };
  var Eu = fe.exports.parseLine = function(r) {
    if (r.length < 11 || r.match(/^\s+#/)) return null;
    for (var e = "", t = "", n = 0, i = 0, s = 0, o = {}, u = false, c = a(function(l, y, E) {
      var _ = r.substring(
        y,
        E
      );
      Object.hasOwnProperty.call(m.env, "PGPASS_NO_DEESCAPE") || (_ = _.replace(
        /\\([:\\])/g,
        "$1"
      )), o[Oe[l]] = _;
    }, "addToObj"), h = 0; h < r.length - 1; h += 1) {
      if (e = r.charAt(h + 1), t = r.charAt(
        h
      ), u = n == ar - 1, u) {
        c(n, i);
        break;
      }
      h >= 0 && e == ":" && t !== "\\" && (c(n, i, h + 1), i = h + 2, n += 1);
    }
    return o = Object.keys(o).length === ar ? o : null, o;
  }, vu = fe.exports.isValidEntry = function(r) {
    for (var e = {
      0: function(o) {
        return o.length > 0;
      },
      1: function(o) {
        return o === "*" ? true : (o = Number(o), isFinite(
          o
        ) && o > 0 && o < 9007199254740992 && Math.floor(o) === o);
      },
      2: function(o) {
        return o.length > 0;
      },
      3: function(o) {
        return o.length > 0;
      },
      4: function(o) {
        return o.length > 0;
      }
    }, t = 0; t < Oe.length; t += 1) {
      var n = e[t], i = r[Oe[t]] || "", s = n(i);
      if (!s) return false;
    }
    return true;
  };
});
var Yi = I((ll, cr) => {
  "use strict";
  p();
  var hl = (er(), k(Xt)), zi = (rr(), k(tr)), yt = Vi();
  cr.exports = function(r, e) {
    var t = yt.getFileName();
    zi.stat(t, function(n, i) {
      if (n || !yt.usePgPass(i, t)) return e(void 0);
      var s = zi.createReadStream(t);
      yt.getPassword(
        r,
        s,
        e
      );
    });
  };
  cr.exports.warnTo = yt.warnTo;
});
var hr = I((pl, Zi) => {
  "use strict";
  p();
  var _u = Xe();
  function mt(r) {
    this._types = r || _u, this.text = {}, this.binary = {};
  }
  __name(mt, "mt");
  a(mt, "TypeOverrides");
  mt.prototype.getOverrides = function(r) {
    switch (r) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  };
  mt.prototype.setTypeParser = function(r, e, t) {
    typeof e == "function" && (t = e, e = "text"), this.getOverrides(e)[r] = t;
  };
  mt.prototype.getTypeParser = function(r, e) {
    return e = e || "text", this.getOverrides(e)[r] || this._types.getTypeParser(r, e);
  };
  Zi.exports = mt;
});
var Ji = {};
X(Ji, { default: /* @__PURE__ */ __name(() => Au, "default") });
var Au;
var Xi = K(() => {
  "use strict";
  p();
  Au = {};
});
var es = {};
X(es, { parse: /* @__PURE__ */ __name(() => lr, "parse") });
function lr(r, e = false) {
  let { protocol: t } = new URL(r), n = "http:" + r.substring(t.length), {
    username: i,
    password: s,
    host: o,
    hostname: u,
    port: c,
    pathname: h,
    search: l,
    searchParams: y,
    hash: E
  } = new URL(n);
  s = decodeURIComponent(s);
  let _ = i + ":" + s, P = e ? Object.fromEntries(y.entries()) : l;
  return {
    href: r,
    protocol: t,
    auth: _,
    username: i,
    password: s,
    host: o,
    hostname: u,
    port: c,
    pathname: h,
    search: l,
    query: P,
    hash: E
  };
}
__name(lr, "lr");
var fr = K(
  () => {
    "use strict";
    p();
    a(lr, "parse");
  }
);
var rs = I((bl, ts) => {
  "use strict";
  p();
  var Cu = (fr(), k(es)), pr = (rr(), k(tr));
  function dr(r) {
    if (r.charAt(0) === "/") {
      var t = r.split(" ");
      return { host: t[0], database: t[1] };
    }
    var e = Cu.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) ? encodeURI(r).replace(
      /\%25(\d\d)/g,
      "%$1"
    ) : r, true), t = e.query;
    for (var n in t) Array.isArray(t[n]) && (t[n] = t[n][t[n].length - 1]);
    var i = (e.auth || ":").split(":");
    if (t.user = i[0], t.password = i.splice(1).join(":"), t.port = e.port, e.protocol == "socket:") return t.host = decodeURI(e.pathname), t.database = e.query.db, t.client_encoding = e.query.encoding, t;
    t.host || (t.host = e.hostname);
    var s = e.pathname;
    if (!t.host && s && /^%2f/i.test(s)) {
      var o = s.split("/");
      t.host = decodeURIComponent(
        o[0]
      ), s = o.splice(1).join("/");
    }
    switch (s && s.charAt(0) === "/" && (s = s.slice(1) || null), t.database = s && decodeURI(s), (t.ssl === "true" || t.ssl === "1") && (t.ssl = true), t.ssl === "0" && (t.ssl = false), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = pr.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = pr.readFileSync(
      t.sslkey
    ).toString()), t.sslrootcert && (t.ssl.ca = pr.readFileSync(t.sslrootcert).toString()), t.sslmode) {
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
  __name(dr, "dr");
  a(dr, "parse");
  ts.exports = dr;
  dr.parse = dr;
});
var gt = I((El, ss) => {
  "use strict";
  p();
  var Iu = (Xi(), k(Ji)), is = et(), ns = rs().parse, V = a(
    function(r, e, t) {
      return t === void 0 ? t = m.env["PG" + r.toUpperCase()] : t === false || (t = m.env[t]), e[r] || t || is[r];
    },
    "val"
  ), Tu = a(function() {
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
    return is.ssl;
  }, "readSSLConfigFromEnvironment"), ke = a(
    function(r) {
      return "'" + ("" + r).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    },
    "quoteParamValue"
  ), re = a(function(r, e, t) {
    var n = e[t];
    n != null && r.push(t + "=" + ke(n));
  }, "add"), mr = class mr {
    static {
      __name(this, "mr");
    }
    constructor(e) {
      e = typeof e == "string" ? ns(e) : e || {}, e.connectionString && (e = Object.assign({}, e, ns(e.connectionString))), this.user = V("user", e), this.database = V("database", e), this.database === void 0 && (this.database = this.user), this.port = parseInt(
        V("port", e),
        10
      ), this.host = V("host", e), Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: V("password", e)
      }), this.binary = V("binary", e), this.options = V("options", e), this.ssl = typeof e.ssl > "u" ? Tu() : e.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = V("client_encoding", e), this.replication = V("replication", e), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = V("application_name", e, "PGAPPNAME"), this.fallback_application_name = V("fallback_application_name", e, false), this.statement_timeout = V("statement_timeout", e, false), this.lock_timeout = V(
        "lock_timeout",
        e,
        false
      ), this.idle_in_transaction_session_timeout = V("idle_in_transaction_session_timeout", e, false), this.query_timeout = V("query_timeout", e, false), e.connectionTimeoutMillis === void 0 ? this.connect_timeout = m.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e.connectionTimeoutMillis / 1e3), e.keepAlive === false ? this.keepalives = 0 : e.keepAlive === true && (this.keepalives = 1), typeof e.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e.keepAliveInitialDelayMillis / 1e3));
    }
    getLibpqConnectionString(e) {
      var t = [];
      re(t, this, "user"), re(t, this, "password"), re(t, this, "port"), re(t, this, "application_name"), re(t, this, "fallback_application_name"), re(t, this, "connect_timeout"), re(
        t,
        this,
        "options"
      );
      var n = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      if (re(t, n, "sslmode"), re(t, n, "sslca"), re(t, n, "sslkey"), re(t, n, "sslcert"), re(t, n, "sslrootcert"), this.database && t.push("dbname=" + ke(this.database)), this.replication && t.push("replication=" + ke(this.replication)), this.host && t.push("host=" + ke(this.host)), this.isDomainSocket) return e(null, t.join(" "));
      this.client_encoding && t.push("client_encoding=" + ke(this.client_encoding)), Iu.lookup(this.host, function(i, s) {
        return i ? e(i, null) : (t.push("hostaddr=" + ke(s)), e(null, t.join(" ")));
      });
    }
  };
  a(mr, "ConnectionParameters");
  var yr = mr;
  ss.exports = yr;
});
var us = I((Al, as) => {
  "use strict";
  p();
  var Pu = Xe(), os = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, wr = class wr {
    static {
      __name(this, "wr");
    }
    constructor(e, t) {
      this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t, this.RowCtor = null, this.rowAsArray = e === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
    }
    addCommandComplete(e) {
      var t;
      e.text ? t = os.exec(e.text) : t = os.exec(e.command), t && (this.command = t[1], t[3] ? (this.oid = parseInt(t[2], 10), this.rowCount = parseInt(t[3], 10)) : t[2] && (this.rowCount = parseInt(
        t[2],
        10
      )));
    }
    _parseRowAsArray(e) {
      for (var t = new Array(e.length), n = 0, i = e.length; n < i; n++) {
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
        this._types ? this._parsers[t] = this._types.getTypeParser(n.dataTypeID, n.format || "text") : this._parsers[t] = Pu.getTypeParser(n.dataTypeID, n.format || "text");
      }
    }
  };
  a(wr, "Result");
  var gr = wr;
  as.exports = gr;
});
var fs = I((Tl, ls) => {
  "use strict";
  p();
  var { EventEmitter: Bu } = ge(), cs = us(), hs = tt(), Sr = class Sr extends Bu {
    static {
      __name(this, "Sr");
    }
    constructor(e, t, n) {
      super(), e = hs.normalizeQueryConfig(e, t, n), this.text = e.text, this.values = e.values, this.rows = e.rows, this.types = e.types, this.name = e.name, this.binary = e.binary, this.portal = e.portal || "", this.callback = e.callback, this._rowMode = e.rowMode, m.domain && e.callback && (this.callback = m.domain.bind(e.callback)), this._result = new cs(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
    }
    requiresPreparation() {
      return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
    }
    _checkForMultirow() {
      this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new cs(
        this._rowMode,
        this.types
      ), this._results.push(this._result));
    }
    handleRowDescription(e) {
      this._checkForMultirow(), this._result.addFields(e.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(e) {
      let t;
      if (!this._canceledDueToError) {
        try {
          t = this._result.parseRow(e.fields);
        } catch (n) {
          this._canceledDueToError = n;
          return;
        }
        this.emit("row", t, this._result), this._accumulateRows && this._result.addRow(t);
      }
    }
    handleCommandComplete(e, t) {
      this._checkForMultirow(), this._result.addCommandComplete(e), this.rows && t.sync();
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
      this.emit("end", this._results);
    }
    submit(e) {
      if (typeof this.text != "string" && typeof this.name != "string") return new Error("A query must have either text or a name. Supplying neither is unsupported.");
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
      e.execute(
        { portal: this.portal, rows: t }
      ), t ? e.flush() : e.sync();
    }
    prepare(e) {
      this.isPreparedStatement = true, this.hasBeenParsed(e) || e.parse({ text: this.text, name: this.name, types: this.types });
      try {
        e.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: hs.prepareValue });
      } catch (t) {
        this.handleError(t, e);
        return;
      }
      e.describe(
        { type: "P", name: this.portal || "" }
      ), this._getRows(e, this.rows);
    }
    handleCopyInResponse(e) {
      e.sendCopyFail("No source stream defined");
    }
    handleCopyData(e, t) {
    }
  };
  a(Sr, "Query");
  var br = Sr;
  ls.exports = br;
});
var ds = {};
X(ds, { Socket: /* @__PURE__ */ __name(() => _e, "Socket"), isIP: /* @__PURE__ */ __name(() => Lu, "isIP") });
function Lu(r) {
  return 0;
}
__name(Lu, "Lu");
var ps;
var x;
var _e;
var wt = K(() => {
  "use strict";
  p();
  ps = We(ge(), 1);
  a(Lu, "isIP");
  x = class x2 extends ps.EventEmitter {
    static {
      __name(this, "x");
    }
    constructor() {
      super(...arguments);
      T(this, "opts", {});
      T(this, "connecting", false);
      T(this, "pending", true);
      T(this, "writable", true);
      T(this, "encrypted", false);
      T(this, "authorized", false);
      T(this, "destroyed", false);
      T(this, "ws", null);
      T(this, "writeBuffer");
      T(this, "tlsState", 0);
      T(
        this,
        "tlsRead"
      );
      T(this, "tlsWrite");
    }
    static get poolQueryViaFetch() {
      return x2.opts.poolQueryViaFetch ?? x2.defaults.poolQueryViaFetch;
    }
    static set poolQueryViaFetch(t) {
      x2.opts.poolQueryViaFetch = t;
    }
    static get fetchEndpoint() {
      return x2.opts.fetchEndpoint ?? x2.defaults.fetchEndpoint;
    }
    static set fetchEndpoint(t) {
      x2.opts.fetchEndpoint = t;
    }
    static get fetchConnectionCache() {
      return x2.opts.fetchConnectionCache ?? x2.defaults.fetchConnectionCache;
    }
    static set fetchConnectionCache(t) {
      x2.opts.fetchConnectionCache = t;
    }
    static get fetchFunction() {
      return x2.opts.fetchFunction ?? x2.defaults.fetchFunction;
    }
    static set fetchFunction(t) {
      x2.opts.fetchFunction = t;
    }
    static get webSocketConstructor() {
      return x2.opts.webSocketConstructor ?? x2.defaults.webSocketConstructor;
    }
    static set webSocketConstructor(t) {
      x2.opts.webSocketConstructor = t;
    }
    get webSocketConstructor() {
      return this.opts.webSocketConstructor ?? x2.webSocketConstructor;
    }
    set webSocketConstructor(t) {
      this.opts.webSocketConstructor = t;
    }
    static get wsProxy() {
      return x2.opts.wsProxy ?? x2.defaults.wsProxy;
    }
    static set wsProxy(t) {
      x2.opts.wsProxy = t;
    }
    get wsProxy() {
      return this.opts.wsProxy ?? x2.wsProxy;
    }
    set wsProxy(t) {
      this.opts.wsProxy = t;
    }
    static get coalesceWrites() {
      return x2.opts.coalesceWrites ?? x2.defaults.coalesceWrites;
    }
    static set coalesceWrites(t) {
      x2.opts.coalesceWrites = t;
    }
    get coalesceWrites() {
      return this.opts.coalesceWrites ?? x2.coalesceWrites;
    }
    set coalesceWrites(t) {
      this.opts.coalesceWrites = t;
    }
    static get useSecureWebSocket() {
      return x2.opts.useSecureWebSocket ?? x2.defaults.useSecureWebSocket;
    }
    static set useSecureWebSocket(t) {
      x2.opts.useSecureWebSocket = t;
    }
    get useSecureWebSocket() {
      return this.opts.useSecureWebSocket ?? x2.useSecureWebSocket;
    }
    set useSecureWebSocket(t) {
      this.opts.useSecureWebSocket = t;
    }
    static get forceDisablePgSSL() {
      return x2.opts.forceDisablePgSSL ?? x2.defaults.forceDisablePgSSL;
    }
    static set forceDisablePgSSL(t) {
      x2.opts.forceDisablePgSSL = t;
    }
    get forceDisablePgSSL() {
      return this.opts.forceDisablePgSSL ?? x2.forceDisablePgSSL;
    }
    set forceDisablePgSSL(t) {
      this.opts.forceDisablePgSSL = t;
    }
    static get disableSNI() {
      return x2.opts.disableSNI ?? x2.defaults.disableSNI;
    }
    static set disableSNI(t) {
      x2.opts.disableSNI = t;
    }
    get disableSNI() {
      return this.opts.disableSNI ?? x2.disableSNI;
    }
    set disableSNI(t) {
      this.opts.disableSNI = t;
    }
    static get pipelineConnect() {
      return x2.opts.pipelineConnect ?? x2.defaults.pipelineConnect;
    }
    static set pipelineConnect(t) {
      x2.opts.pipelineConnect = t;
    }
    get pipelineConnect() {
      return this.opts.pipelineConnect ?? x2.pipelineConnect;
    }
    set pipelineConnect(t) {
      this.opts.pipelineConnect = t;
    }
    static get subtls() {
      return x2.opts.subtls ?? x2.defaults.subtls;
    }
    static set subtls(t) {
      x2.opts.subtls = t;
    }
    get subtls() {
      return this.opts.subtls ?? x2.subtls;
    }
    set subtls(t) {
      this.opts.subtls = t;
    }
    static get pipelineTLS() {
      return x2.opts.pipelineTLS ?? x2.defaults.pipelineTLS;
    }
    static set pipelineTLS(t) {
      x2.opts.pipelineTLS = t;
    }
    get pipelineTLS() {
      return this.opts.pipelineTLS ?? x2.pipelineTLS;
    }
    set pipelineTLS(t) {
      this.opts.pipelineTLS = t;
    }
    static get rootCerts() {
      return x2.opts.rootCerts ?? x2.defaults.rootCerts;
    }
    static set rootCerts(t) {
      x2.opts.rootCerts = t;
    }
    get rootCerts() {
      return this.opts.rootCerts ?? x2.rootCerts;
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
      }, "handleWebSocketOpen"), o = a((c, h = false) => {
        c.binaryType = "arraybuffer", c.addEventListener("error", (l) => {
          this.emit("error", l), this.emit("close");
        }), c.addEventListener("message", (l) => {
          if (this.tlsState === 0) {
            let y = d.from(l.data);
            this.emit(
              "data",
              y
            );
          }
        }), c.addEventListener("close", () => {
          this.emit("close");
        }), h ? s() : c.addEventListener(
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
        let h = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u;
        if (this.webSocketConstructor !== void 0) this.ws = new this.webSocketConstructor(h), o(this.ws);
        else try {
          this.ws = new WebSocket(
            h
          ), o(this.ws);
        } catch {
          this.ws = new __unstable_WebSocket(h), o(this.ws);
        }
      } catch (c) {
        let l = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u;
        fetch(l, { headers: { Upgrade: "websocket" } }).then((y) => {
          if (this.ws = y.webSocket, this.ws == null) throw c;
          this.ws.accept(), o(
            this.ws,
            true
          );
        }).catch((y) => {
          this.emit("error", new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${y.message}`)), this.emit("close");
        });
      }
    }
    async startTls(t) {
      if (this.subtls === void 0) throw new Error("For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information.");
      this.tlsState = 1;
      let n = this.subtls.TrustedCert.fromPEM(this.rootCerts), i = new this.subtls.WebSocketReadQueue(this.ws), s = i.read.bind(
        i
      ), o = this.rawWrite.bind(this), [u, c] = await this.subtls.startTls(t, n, s, o, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
      this.tlsRead = u, this.tlsWrite = c, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit(
        "secureConnection",
        this
      ), this.tlsReadLoop();
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
        this.ws.send(t);
        return;
      }
      if (this.writeBuffer === void 0) this.writeBuffer = t, setTimeout(
        () => {
          this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
        },
        0
      );
      else {
        let n = new Uint8Array(this.writeBuffer.length + t.length);
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
  a(x, "Socket"), T(x, "defaults", {
    poolQueryViaFetch: false,
    fetchEndpoint: /* @__PURE__ */ __name((t) => "https://" + t + "/sql", "fetchEndpoint"),
    fetchConnectionCache: false,
    fetchFunction: void 0,
    webSocketConstructor: void 0,
    wsProxy: /* @__PURE__ */ __name((t) => t + "/v2", "wsProxy"),
    useSecureWebSocket: true,
    forceDisablePgSSL: true,
    coalesceWrites: true,
    pipelineConnect: "password",
    subtls: void 0,
    rootCerts: "",
    pipelineTLS: false,
    disableSNI: false
  }), T(x, "opts", {});
  _e = x;
});
var zr = I((C) => {
  "use strict";
  p();
  Object.defineProperty(C, "__esModule", { value: true });
  C.NoticeMessage = C.DataRowMessage = C.CommandCompleteMessage = C.ReadyForQueryMessage = C.NotificationResponseMessage = C.BackendKeyDataMessage = C.AuthenticationMD5Password = C.ParameterStatusMessage = C.ParameterDescriptionMessage = C.RowDescriptionMessage = C.Field = C.CopyResponse = C.CopyDataMessage = C.DatabaseError = C.copyDone = C.emptyQuery = C.replicationStart = C.portalSuspended = C.noData = C.closeComplete = C.bindComplete = C.parseComplete = void 0;
  C.parseComplete = { name: "parseComplete", length: 5 };
  C.bindComplete = { name: "bindComplete", length: 5 };
  C.closeComplete = { name: "closeComplete", length: 5 };
  C.noData = { name: "noData", length: 5 };
  C.portalSuspended = { name: "portalSuspended", length: 5 };
  C.replicationStart = { name: "replicationStart", length: 4 };
  C.emptyQuery = { name: "emptyQuery", length: 4 };
  C.copyDone = { name: "copyDone", length: 4 };
  var Dr = class Dr extends Error {
    static {
      __name(this, "Dr");
    }
    constructor(e, t, n) {
      super(
        e
      ), this.length = t, this.name = n;
    }
  };
  a(Dr, "DatabaseError");
  var xr = Dr;
  C.DatabaseError = xr;
  var Or = class Or {
    static {
      __name(this, "Or");
    }
    constructor(e, t) {
      this.length = e, this.chunk = t, this.name = "copyData";
    }
  };
  a(Or, "CopyDataMessage");
  var Er = Or;
  C.CopyDataMessage = Er;
  var kr = class kr {
    static {
      __name(this, "kr");
    }
    constructor(e, t, n, i) {
      this.length = e, this.name = t, this.binary = n, this.columnTypes = new Array(i);
    }
  };
  a(kr, "CopyResponse");
  var vr = kr;
  C.CopyResponse = vr;
  var Ur = class Ur {
    static {
      __name(this, "Ur");
    }
    constructor(e, t, n, i, s, o, u) {
      this.name = e, this.tableID = t, this.columnID = n, this.dataTypeID = i, this.dataTypeSize = s, this.dataTypeModifier = o, this.format = u;
    }
  };
  a(Ur, "Field");
  var _r = Ur;
  C.Field = _r;
  var qr = class qr {
    static {
      __name(this, "qr");
    }
    constructor(e, t) {
      this.length = e, this.fieldCount = t, this.name = "rowDescription", this.fields = new Array(
        this.fieldCount
      );
    }
  };
  a(qr, "RowDescriptionMessage");
  var Ar = qr;
  C.RowDescriptionMessage = Ar;
  var Nr = class Nr {
    static {
      __name(this, "Nr");
    }
    constructor(e, t) {
      this.length = e, this.parameterCount = t, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
    }
  };
  a(Nr, "ParameterDescriptionMessage");
  var Cr = Nr;
  C.ParameterDescriptionMessage = Cr;
  var Qr = class Qr {
    static {
      __name(this, "Qr");
    }
    constructor(e, t, n) {
      this.length = e, this.parameterName = t, this.parameterValue = n, this.name = "parameterStatus";
    }
  };
  a(Qr, "ParameterStatusMessage");
  var Ir = Qr;
  C.ParameterStatusMessage = Ir;
  var Wr = class Wr {
    static {
      __name(this, "Wr");
    }
    constructor(e, t) {
      this.length = e, this.salt = t, this.name = "authenticationMD5Password";
    }
  };
  a(Wr, "AuthenticationMD5Password");
  var Tr = Wr;
  C.AuthenticationMD5Password = Tr;
  var jr = class jr {
    static {
      __name(this, "jr");
    }
    constructor(e, t, n) {
      this.length = e, this.processID = t, this.secretKey = n, this.name = "backendKeyData";
    }
  };
  a(
    jr,
    "BackendKeyDataMessage"
  );
  var Pr = jr;
  C.BackendKeyDataMessage = Pr;
  var Hr = class Hr {
    static {
      __name(this, "Hr");
    }
    constructor(e, t, n, i) {
      this.length = e, this.processId = t, this.channel = n, this.payload = i, this.name = "notification";
    }
  };
  a(Hr, "NotificationResponseMessage");
  var Br = Hr;
  C.NotificationResponseMessage = Br;
  var Gr = class Gr {
    static {
      __name(this, "Gr");
    }
    constructor(e, t) {
      this.length = e, this.status = t, this.name = "readyForQuery";
    }
  };
  a(Gr, "ReadyForQueryMessage");
  var Lr = Gr;
  C.ReadyForQueryMessage = Lr;
  var $r = class $r {
    static {
      __name(this, "$r");
    }
    constructor(e, t) {
      this.length = e, this.text = t, this.name = "commandComplete";
    }
  };
  a($r, "CommandCompleteMessage");
  var Rr = $r;
  C.CommandCompleteMessage = Rr;
  var Kr = class Kr {
    static {
      __name(this, "Kr");
    }
    constructor(e, t) {
      this.length = e, this.fields = t, this.name = "dataRow", this.fieldCount = t.length;
    }
  };
  a(Kr, "DataRowMessage");
  var Fr = Kr;
  C.DataRowMessage = Fr;
  var Vr = class Vr {
    static {
      __name(this, "Vr");
    }
    constructor(e, t) {
      this.length = e, this.message = t, this.name = "notice";
    }
  };
  a(Vr, "NoticeMessage");
  var Mr = Vr;
  C.NoticeMessage = Mr;
});
var ys = I((bt) => {
  "use strict";
  p();
  Object.defineProperty(bt, "__esModule", { value: true });
  bt.Writer = void 0;
  var Zr = class Zr {
    static {
      __name(this, "Zr");
    }
    constructor(e = 256) {
      this.size = e, this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(e);
    }
    ensure(e) {
      var t = this.buffer.length - this.offset;
      if (t < e) {
        var n = this.buffer, i = n.length + (n.length >> 1) + e;
        this.buffer = d.allocUnsafe(
          i
        ), n.copy(this.buffer);
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
        var t = d.byteLength(e);
        this.ensure(t + 1), this.buffer.write(
          e,
          this.offset,
          "utf-8"
        ), this.offset += t;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(e = "") {
      var t = d.byteLength(e);
      return this.ensure(t), this.buffer.write(e, this.offset), this.offset += t, this;
    }
    add(e) {
      return this.ensure(e.length), e.copy(this.buffer, this.offset), this.offset += e.length, this;
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
      var t = this.join(e);
      return this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(this.size), t;
    }
  };
  a(Zr, "Writer");
  var Yr = Zr;
  bt.Writer = Yr;
});
var gs = I((xt) => {
  "use strict";
  p();
  Object.defineProperty(xt, "__esModule", { value: true });
  xt.serialize = void 0;
  var Jr = ys(), F = new Jr.Writer(), Ru = a((r) => {
    F.addInt16(3).addInt16(
      0
    );
    for (let n of Object.keys(r)) F.addCString(n).addCString(r[n]);
    F.addCString("client_encoding").addCString("UTF8");
    var e = F.addCString("").flush(), t = e.length + 4;
    return new Jr.Writer().addInt32(t).add(e).flush();
  }, "startup"), Fu = a(() => {
    let r = d.allocUnsafe(8);
    return r.writeInt32BE(8, 0), r.writeInt32BE(80877103, 4), r;
  }, "requestSsl"), Mu = a((r) => F.addCString(r).flush(112), "password"), Du = a(function(r, e) {
    return F.addCString(r).addInt32(
      d.byteLength(e)
    ).addString(e), F.flush(112);
  }, "sendSASLInitialResponseMessage"), Ou = a(
    function(r) {
      return F.addString(r).flush(112);
    },
    "sendSCRAMClientFinalMessage"
  ), ku = a(
    (r) => F.addCString(r).flush(81),
    "query"
  ), ms = [], Uu = a((r) => {
    let e = r.name || "";
    e.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e, e.length), console.error("This can cause conflicts and silent errors executing queries"));
    let t = r.types || ms;
    for (var n = t.length, i = F.addCString(e).addCString(r.text).addInt16(n), s = 0; s < n; s++) i.addInt32(t[s]);
    return F.flush(80);
  }, "parse"), Ue = new Jr.Writer(), qu = a(function(r, e) {
    for (let t = 0; t < r.length; t++) {
      let n = e ? e(r[t], t) : r[t];
      n == null ? (F.addInt16(0), Ue.addInt32(-1)) : n instanceof d ? (F.addInt16(1), Ue.addInt32(n.length), Ue.add(n)) : (F.addInt16(0), Ue.addInt32(d.byteLength(
        n
      )), Ue.addString(n));
    }
  }, "writeValues"), Nu = a((r = {}) => {
    let e = r.portal || "", t = r.statement || "", n = r.binary || false, i = r.values || ms, s = i.length;
    return F.addCString(e).addCString(t), F.addInt16(s), qu(i, r.valueMapper), F.addInt16(s), F.add(Ue.flush()), F.addInt16(n ? 1 : 0), F.flush(66);
  }, "bind"), Qu = d.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Wu = a((r) => {
    if (!r || !r.portal && !r.rows) return Qu;
    let e = r.portal || "", t = r.rows || 0, n = d.byteLength(e), i = 4 + n + 1 + 4, s = d.allocUnsafe(1 + i);
    return s[0] = 69, s.writeInt32BE(i, 1), s.write(e, 5, "utf-8"), s[n + 5] = 0, s.writeUInt32BE(t, s.length - 4), s;
  }, "execute"), ju = a((r, e) => {
    let t = d.allocUnsafe(16);
    return t.writeInt32BE(16, 0), t.writeInt16BE(1234, 4), t.writeInt16BE(5678, 6), t.writeInt32BE(
      r,
      8
    ), t.writeInt32BE(e, 12), t;
  }, "cancel"), Xr = a(
    (r, e) => {
      let n = 4 + d.byteLength(e) + 1, i = d.allocUnsafe(1 + n);
      return i[0] = r, i.writeInt32BE(n, 1), i.write(e, 5, "utf-8"), i[n] = 0, i;
    },
    "cstringMessage"
  ), Hu = F.addCString("P").flush(68), Gu = F.addCString("S").flush(68), $u = a((r) => r.name ? Xr(68, `${r.type}${r.name || ""}`) : r.type === "P" ? Hu : Gu, "describe"), Ku = a(
    (r) => {
      let e = `${r.type}${r.name || ""}`;
      return Xr(67, e);
    },
    "close"
  ), Vu = a((r) => F.add(r).flush(
    100
  ), "copyData"), zu = a((r) => Xr(102, r), "copyFail"), St = a((r) => d.from([r, 0, 0, 0, 4]), "codeOnlyBuffer"), Yu = St(72), Zu = St(83), Ju = St(88), Xu = St(99), ec = {
    startup: Ru,
    password: Mu,
    requestSsl: Fu,
    sendSASLInitialResponseMessage: Du,
    sendSCRAMClientFinalMessage: Ou,
    query: ku,
    parse: Uu,
    bind: Nu,
    execute: Wu,
    describe: $u,
    close: Ku,
    flush: /* @__PURE__ */ __name(() => Yu, "flush"),
    sync: /* @__PURE__ */ __name(() => Zu, "sync"),
    end: /* @__PURE__ */ __name(() => Ju, "end"),
    copyData: Vu,
    copyDone: /* @__PURE__ */ __name(() => Xu, "copyDone"),
    copyFail: zu,
    cancel: ju
  };
  xt.serialize = ec;
});
var ws = I((Et) => {
  "use strict";
  p();
  Object.defineProperty(Et, "__esModule", { value: true });
  Et.BufferReader = void 0;
  var tc = d.allocUnsafe(0), tn = class tn {
    static {
      __name(this, "tn");
    }
    constructor(e = 0) {
      this.offset = e, this.buffer = tc, this.encoding = "utf-8";
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
      let e = this.buffer.readInt32BE(this.offset);
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
  a(tn, "BufferReader");
  var en = tn;
  Et.BufferReader = en;
});
var bs = {};
X(bs, { default: /* @__PURE__ */ __name(() => rc, "default") });
var rc;
var Ss = K(() => {
  "use strict";
  p();
  rc = {};
});
var vs = I((qe) => {
  "use strict";
  p();
  var nc = qe && qe.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(qe, "__esModule", { value: true });
  qe.Parser = void 0;
  var M = zr(), ic = ws(), sc = nc((Ss(), k(bs))), rn = 1, oc = 4, xs = rn + oc, Es = d.allocUnsafe(
    0
  ), sn = class sn {
    static {
      __name(this, "sn");
    }
    constructor(e) {
      if (this.buffer = Es, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new ic.BufferReader(), e?.mode === "binary") throw new Error("Binary mode not supported yet");
      this.mode = e?.mode || "text";
    }
    parse(e, t) {
      this.mergeBuffer(e);
      let n = this.bufferOffset + this.bufferLength, i = this.bufferOffset;
      for (; i + xs <= n; ) {
        let s = this.buffer[i], o = this.buffer.readUInt32BE(i + rn), u = rn + o;
        if (u + i <= n) {
          let c = this.handlePacket(
            i + xs,
            s,
            o,
            this.buffer
          );
          t(c), i += u;
        } else break;
      }
      i === n ? (this.buffer = Es, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n - i, this.bufferOffset = i);
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
          return M.bindComplete;
        case 49:
          return M.parseComplete;
        case 51:
          return M.closeComplete;
        case 110:
          return M.noData;
        case 115:
          return M.portalSuspended;
        case 99:
          return M.copyDone;
        case 87:
          return M.replicationStart;
        case 73:
          return M.emptyQuery;
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
          return this.parseNotificationMessage(e, n, i);
        case 82:
          return this.parseAuthenticationResponse(
            e,
            n,
            i
          );
        case 83:
          return this.parseParameterStatusMessage(e, n, i);
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
          return this.parseCopyInMessage(e, n, i);
        case 72:
          return this.parseCopyOutMessage(e, n, i);
        case 100:
          return this.parseCopyData(e, n, i);
        default:
          sc.default.fail(`unknown message code: ${t.toString(16)}`);
      }
    }
    parseReadyForQueryMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.string(1);
      return new M.ReadyForQueryMessage(t, i);
    }
    parseCommandCompleteMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring();
      return new M.CommandCompleteMessage(
        t,
        i
      );
    }
    parseCopyData(e, t, n) {
      let i = n.slice(e, e + (t - 4));
      return new M.CopyDataMessage(
        t,
        i
      );
    }
    parseCopyInMessage(e, t, n) {
      return this.parseCopyMessage(e, t, n, "copyInResponse");
    }
    parseCopyOutMessage(e, t, n) {
      return this.parseCopyMessage(e, t, n, "copyOutResponse");
    }
    parseCopyMessage(e, t, n, i) {
      this.reader.setBuffer(e, n);
      let s = this.reader.byte() !== 0, o = this.reader.int16(), u = new M.CopyResponse(t, i, s, o);
      for (let c = 0; c < o; c++) u.columnTypes[c] = this.reader.int16();
      return u;
    }
    parseNotificationMessage(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int32(), s = this.reader.cstring(), o = this.reader.cstring();
      return new M.NotificationResponseMessage(t, i, s, o);
    }
    parseRowDescriptionMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new M.RowDescriptionMessage(t, i);
      for (let o = 0; o < i; o++) s.fields[o] = this.parseField();
      return s;
    }
    parseField() {
      let e = this.reader.cstring(), t = this.reader.int32(), n = this.reader.int16(), i = this.reader.int32(), s = this.reader.int16(), o = this.reader.int32(), u = this.reader.int16() === 0 ? "text" : "binary";
      return new M.Field(e, t, n, i, s, o, u);
    }
    parseParameterDescriptionMessage(e, t, n) {
      this.reader.setBuffer(
        e,
        n
      );
      let i = this.reader.int16(), s = new M.ParameterDescriptionMessage(t, i);
      for (let o = 0; o < i; o++) s.dataTypeIDs[o] = this.reader.int32();
      return s;
    }
    parseDataRowMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int16(), s = new Array(i);
      for (let o = 0; o < i; o++) {
        let u = this.reader.int32();
        s[o] = u === -1 ? null : this.reader.string(u);
      }
      return new M.DataRowMessage(
        t,
        s
      );
    }
    parseParameterStatusMessage(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.cstring(), s = this.reader.cstring();
      return new M.ParameterStatusMessage(t, i, s);
    }
    parseBackendKeyData(e, t, n) {
      this.reader.setBuffer(e, n);
      let i = this.reader.int32(), s = this.reader.int32();
      return new M.BackendKeyDataMessage(t, i, s);
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
            let u = this.reader.bytes(4);
            return new M.AuthenticationMD5Password(t, u);
          }
          break;
        case 10:
          s.name = "authenticationSASL", s.mechanisms = [];
          let o;
          do
            o = this.reader.cstring(), o && s.mechanisms.push(o);
          while (o);
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
      let u = s.M, c = i === "notice" ? new M.NoticeMessage(
        t,
        u
      ) : new M.DatabaseError(u, t, i);
      return c.severity = s.S, c.code = s.C, c.detail = s.D, c.hint = s.H, c.position = s.P, c.internalPosition = s.p, c.internalQuery = s.q, c.where = s.W, c.schema = s.s, c.table = s.t, c.column = s.c, c.dataType = s.d, c.constraint = s.n, c.file = s.F, c.line = s.L, c.routine = s.R, c;
    }
  };
  a(sn, "Parser");
  var nn = sn;
  qe.Parser = nn;
});
var on = I((be) => {
  "use strict";
  p();
  Object.defineProperty(be, "__esModule", { value: true });
  be.DatabaseError = be.serialize = be.parse = void 0;
  var ac = zr();
  Object.defineProperty(
    be,
    "DatabaseError",
    { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ac.DatabaseError;
    }, "get") }
  );
  var uc = gs();
  Object.defineProperty(be, "serialize", { enumerable: true, get: /* @__PURE__ */ __name(function() {
    return uc.serialize;
  }, "get") });
  var cc = vs();
  function hc(r, e) {
    let t = new cc.Parser();
    return r.on("data", (n) => t.parse(
      n,
      e
    )), new Promise((n) => r.on("end", () => n()));
  }
  __name(hc, "hc");
  a(hc, "parse");
  be.parse = hc;
});
var _s = {};
X(_s, { connect: /* @__PURE__ */ __name(() => lc, "connect") });
function lc({ socket: r, servername: e }) {
  return r.startTls(
    e
  ), r;
}
__name(lc, "lc");
var As = K(() => {
  "use strict";
  p();
  a(lc, "connect");
});
var cn = I((ef, Ts) => {
  "use strict";
  p();
  var Cs = (wt(), k(ds)), fc = ge().EventEmitter, {
    parse: pc,
    serialize: q
  } = on(), Is = q.flush(), dc = q.sync(), yc = q.end(), un = class un extends fc {
    static {
      __name(this, "un");
    }
    constructor(e) {
      super(), e = e || {}, this.stream = e.stream || new Cs.Socket(), this._keepAlive = e.keepAlive, this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e.ssl || false, this._ending = false, this._emitMessage = false;
      var t = this;
      this.on("newListener", function(n) {
        n === "message" && (t._emitMessage = true);
      });
    }
    connect(e, t) {
      var n = this;
      this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(
        e,
        t
      ), this.stream.once("connect", function() {
        n._keepAlive && n.stream.setKeepAlive(
          true,
          n._keepAliveInitialDelayMillis
        ), n.emit("connect");
      });
      let i = a(function(s) {
        n._ending && (s.code === "ECONNRESET" || s.code === "EPIPE") || n.emit("error", s);
      }, "reportStreamError");
      if (this.stream.on("error", i), this.stream.on("close", function() {
        n.emit("end");
      }), !this.ssl) return this.attachListeners(this.stream);
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
        var u = (As(), k(_s));
        let c = { socket: n.stream };
        n.ssl !== true && (Object.assign(
          c,
          n.ssl
        ), "key" in n.ssl && (c.key = n.ssl.key)), Cs.isIP(t) === 0 && (c.servername = t);
        try {
          n.stream = u.connect(c);
        } catch (h) {
          return n.emit("error", h);
        }
        n.attachListeners(n.stream), n.stream.on("error", i), n.emit("sslconnect");
      });
    }
    attachListeners(e) {
      e.on("end", () => {
        this.emit("end");
      }), pc(e, (t) => {
        var n = t.name === "error" ? "errorMessage" : t.name;
        this._emitMessage && this.emit("message", t), this.emit(n, t);
      });
    }
    requestSsl() {
      this.stream.write(q.requestSsl());
    }
    startup(e) {
      this.stream.write(q.startup(e));
    }
    cancel(e, t) {
      this._send(q.cancel(e, t));
    }
    password(e) {
      this._send(q.password(e));
    }
    sendSASLInitialResponseMessage(e, t) {
      this._send(q.sendSASLInitialResponseMessage(
        e,
        t
      ));
    }
    sendSCRAMClientFinalMessage(e) {
      this._send(q.sendSCRAMClientFinalMessage(e));
    }
    _send(e) {
      return this.stream.writable ? this.stream.write(e) : false;
    }
    query(e) {
      this._send(q.query(
        e
      ));
    }
    parse(e) {
      this._send(q.parse(e));
    }
    bind(e) {
      this._send(q.bind(e));
    }
    execute(e) {
      this._send(q.execute(e));
    }
    flush() {
      this.stream.writable && this.stream.write(Is);
    }
    sync() {
      this._ending = true, this._send(Is), this._send(dc);
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
      return this.stream.write(yc, () => {
        this.stream.end();
      });
    }
    close(e) {
      this._send(q.close(e));
    }
    describe(e) {
      this._send(q.describe(e));
    }
    sendCopyFromChunk(e) {
      this._send(q.copyData(e));
    }
    endCopyFrom() {
      this._send(q.copyDone());
    }
    sendCopyFail(e) {
      this._send(q.copyFail(e));
    }
  };
  a(un, "Connection");
  var an = un;
  Ts.exports = an;
});
var Ls = I((sf, Bs) => {
  "use strict";
  p();
  var mc = ge().EventEmitter, nf = (Ge(), k(He)), gc = tt(), hn = qi(), wc = Yi(), bc = hr(), Sc = gt(), Ps = fs(), xc = et(), Ec = cn(), ln = class ln extends mc {
    static {
      __name(this, "ln");
    }
    constructor(e) {
      super(), this.connectionParameters = new Sc(e), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }), this.replication = this.connectionParameters.replication;
      var t = e || {};
      this._Promise = t.Promise || b.Promise, this._types = new bc(t.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t.connection || new Ec({ stream: t.stream, ssl: this.connectionParameters.ssl, keepAlive: t.keepAlive || false, keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t.binary || xc.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(e) {
      let t = a(
        (n) => {
          m.nextTick(() => {
            n.handleError(e, this.connection);
          });
        },
        "enqueueError"
      );
      this.activeQuery && (t(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t), this.queryQueue.length = 0;
    }
    _connect(e) {
      var t = this, n = this.connection;
      if (this._connectionCallback = e, this._connecting || this._connected) {
        let i = new Error("Client has already been connected. You cannot reuse a client.");
        m.nextTick(() => {
          e(i);
        });
        return;
      }
      this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
        n._ending = true, n.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
        t.ssl ? n.requestSsl() : n.startup(t.getStartupConf());
      }), n.on("sslconnect", function() {
        n.startup(t.getStartupConf());
      }), this._attachListeners(n), n.once("end", () => {
        let i = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i) : this._handleErrorEvent(i) : this._connectionError || this._handleErrorEvent(
          i
        )), m.nextTick(() => {
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
      e.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e.on("authenticationSASL", this._handleAuthSASL.bind(this)), e.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e.on("backendKeyData", this._handleBackendKeyData.bind(this)), e.on("error", this._handleErrorEvent.bind(this)), e.on(
        "errorMessage",
        this._handleErrorMessage.bind(this)
      ), e.on("readyForQuery", this._handleReadyForQuery.bind(this)), e.on("notice", this._handleNotice.bind(this)), e.on("rowDescription", this._handleRowDescription.bind(this)), e.on("dataRow", this._handleDataRow.bind(this)), e.on("portalSuspended", this._handlePortalSuspended.bind(this)), e.on(
        "emptyQuery",
        this._handleEmptyQuery.bind(this)
      ), e.on("commandComplete", this._handleCommandComplete.bind(this)), e.on("parseComplete", this._handleParseComplete.bind(this)), e.on("copyInResponse", this._handleCopyInResponse.bind(this)), e.on("copyData", this._handleCopyData.bind(this)), e.on("notification", this._handleNotification.bind(this));
    }
    _checkPgPass(e) {
      let t = this.connection;
      typeof this.password == "function" ? this._Promise.resolve().then(
        () => this.password()
      ).then((n) => {
        if (n !== void 0) {
          if (typeof n != "string") {
            t.emit("error", new TypeError("Password must be a string"));
            return;
          }
          this.connectionParameters.password = this.password = n;
        } else this.connectionParameters.password = this.password = null;
        e();
      }).catch((n) => {
        t.emit("error", n);
      }) : this.password !== null ? e() : wc(
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
      this._checkPgPass(() => {
        let t = gc.postgresMd5PasswordHash(
          this.user,
          this.password,
          e.salt
        );
        this.connection.password(t);
      });
    }
    _handleAuthSASL(e) {
      this._checkPgPass(() => {
        this.saslSession = hn.startSession(e.mechanisms), this.connection.sendSASLInitialResponseMessage(
          this.saslSession.mechanism,
          this.saslSession.response
        );
      });
    }
    _handleAuthSASLContinue(e) {
      hn.continueSession(this.saslSession, this.password, e.data), this.connection.sendSCRAMClientFinalMessage(
        this.saslSession.response
      );
    }
    _handleAuthSASLFinal(e) {
      hn.finalizeSession(
        this.saslSession,
        e.data
      ), this.saslSession = null;
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
      if (this._connecting)
        return this._handleErrorWhileConnecting(e);
      let t = this.activeQuery;
      if (!t) {
        this._handleErrorEvent(
          e
        );
        return;
      }
      this.activeQuery = null, t.handleError(e, this.connection);
    }
    _handleRowDescription(e) {
      this.activeQuery.handleRowDescription(e);
    }
    _handleDataRow(e) {
      this.activeQuery.handleDataRow(
        e
      );
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
      this.activeQuery.handleCopyInResponse(
        this.connection
      );
    }
    _handleCopyData(e) {
      this.activeQuery.handleCopyData(e, this.connection);
    }
    _handleNotification(e) {
      this.emit("notification", e);
    }
    _handleNotice(e) {
      this.emit("notice", e);
    }
    getStartupConf() {
      var e = this.connectionParameters, t = { user: e.user, database: e.database }, n = e.application_name || e.fallback_application_name;
      return n && (t.application_name = n), e.replication && (t.replication = "" + e.replication), e.statement_timeout && (t.statement_timeout = String(parseInt(
        e.statement_timeout,
        10
      ))), e.lock_timeout && (t.lock_timeout = String(parseInt(e.lock_timeout, 10))), e.idle_in_transaction_session_timeout && (t.idle_in_transaction_session_timeout = String(parseInt(
        e.idle_in_transaction_session_timeout,
        10
      ))), e.options && (t.options = e.options), t;
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
      return '"' + e.replace(
        /"/g,
        '""'
      ) + '"';
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
      if (e == null) throw new TypeError("Client was passed a null or undefined query");
      return typeof e.submit == "function" ? (o = e.query_timeout || this.connectionParameters.query_timeout, s = i = e, typeof t == "function" && (i.callback = i.callback || t)) : (o = this.connectionParameters.query_timeout, i = new Ps(
        e,
        t,
        n
      ), i.callback || (s = new this._Promise((h, l) => {
        i.callback = (y, E) => y ? l(y) : h(E);
      }))), o && (c = i.callback, u = setTimeout(() => {
        var h = new Error("Query read timeout");
        m.nextTick(
          () => {
            i.handleError(h, this.connection);
          }
        ), c(h), i.callback = () => {
        };
        var l = this.queryQueue.indexOf(i);
        l > -1 && this.queryQueue.splice(l, 1), this._pulseQueryQueue();
      }, o), i.callback = (h, l) => {
        clearTimeout(u), c(h, l);
      }), this.binary && !i.binary && (i.binary = true), i._result && !i._result._types && (i._result._types = this._types), this._queryable ? this._ending ? (m.nextTick(() => {
        i.handleError(
          new Error("Client was closed and is not queryable"),
          this.connection
        );
      }), s) : (this.queryQueue.push(i), this._pulseQueryQueue(), s) : (m.nextTick(
        () => {
          i.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
        }
      ), s);
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
  a(ln, "Client");
  var vt = ln;
  vt.Query = Ps;
  Bs.exports = vt;
});
var Ds = I((uf, Ms) => {
  "use strict";
  p();
  var vc = ge().EventEmitter, Rs = a(function() {
  }, "NOOP"), Fs = a(
    (r, e) => {
      let t = r.findIndex(e);
      return t === -1 ? void 0 : r.splice(t, 1)[0];
    },
    "removeWhere"
  ), dn = class dn {
    static {
      __name(this, "dn");
    }
    constructor(e, t, n) {
      this.client = e, this.idleListener = t, this.timeoutId = n;
    }
  };
  a(dn, "IdleItem");
  var fn = dn, yn = class yn {
    static {
      __name(this, "yn");
    }
    constructor(e) {
      this.callback = e;
    }
  };
  a(yn, "PendingItem");
  var Ne = yn;
  function _c() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  __name(_c, "_c");
  a(_c, "throwOnDoubleRelease");
  function _t(r, e) {
    if (e) return { callback: e, result: void 0 };
    let t, n, i = a(function(o, u) {
      o ? t(o) : n(u);
    }, "cb"), s = new r(function(o, u) {
      n = o, t = u;
    }).catch((o) => {
      throw Error.captureStackTrace(
        o
      ), o;
    });
    return { callback: i, result: s };
  }
  __name(_t, "_t");
  a(_t, "promisify");
  function Ac(r, e) {
    return a(
      /* @__PURE__ */ __name(function t(n) {
        n.client = e, e.removeListener("error", t), e.on("error", () => {
          r.log("additional client error after disconnection due to error", n);
        }), r._remove(e), r.emit("error", n, e);
      }, "t"),
      "idleListener"
    );
  }
  __name(Ac, "Ac");
  a(Ac, "makeIdleListener");
  var mn = class mn extends vc {
    static {
      __name(this, "mn");
    }
    constructor(e, t) {
      super(), this.options = Object.assign({}, e), e != null && "password" in e && Object.defineProperty(
        this.options,
        "password",
        { configurable: true, enumerable: false, writable: true, value: e.password }
      ), e != null && e.ssl && e.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
      }, this.Client = this.options.Client || t || At().Client, this.Promise = this.options.Promise || b.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
    }
    _isFull() {
      return this._clients.length >= this.options.max;
    }
    _pulseQueue() {
      if (this.log("pulse queue"), this.ended) {
        this.log("pulse queue ended");
        return;
      }
      if (this.ending) {
        this.log(
          "pulse queue on ending"
        ), this._idle.length && this._idle.slice().map((t) => {
          this._remove(
            t.client
          );
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
        clearTimeout(t.timeoutId);
        let n = t.client;
        n.ref && n.ref();
        let i = t.idleListener;
        return this._acquireClient(n, e, i, false);
      }
      if (!this._isFull()) return this.newClient(e);
      throw new Error("unexpected condition");
    }
    _remove(e) {
      let t = Fs(this._idle, (n) => n.client === e);
      t !== void 0 && clearTimeout(t.timeoutId), this._clients = this._clients.filter((n) => n !== e), e.end(), this.emit("remove", e);
    }
    connect(e) {
      if (this.ending) {
        let i = new Error("Cannot use a pool after calling end on the pool");
        return e ? e(i) : this.Promise.reject(
          i
        );
      }
      let t = _t(this.Promise, e), n = t.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length && m.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
          return this._pendingQueue.push(new Ne(t.callback)), n;
        let i = a((u, c, h) => {
          clearTimeout(
            o
          ), t.callback(u, c, h);
        }, "queueCallback"), s = new Ne(i), o = setTimeout(() => {
          Fs(
            this._pendingQueue,
            (u) => u.callback === i
          ), s.timedOut = true, t.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return this._pendingQueue.push(s), n;
      }
      return this.newClient(new Ne(t.callback)), n;
    }
    newClient(e) {
      let t = new this.Client(this.options);
      this._clients.push(t);
      let n = Ac(this, t);
      this.log("checking client timeout");
      let i, s = false;
      this.options.connectionTimeoutMillis && (i = setTimeout(() => {
        this.log("ending client due to timeout"), s = true, t.connection ? t.connection.stream.destroy() : t.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t.connect((o) => {
        if (i && clearTimeout(i), t.on("error", n), o) this.log("client failed to connect", o), this._clients = this._clients.filter((u) => u !== t), s && (o.message = "Connection terminated due to connection timeout"), this._pulseQueue(), e.timedOut || e.callback(
          o,
          void 0,
          Rs
        );
        else {
          if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
            let u = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(t), this._idle.findIndex((h) => h.client === t) !== -1 && this._acquireClient(
                t,
                new Ne((h, l, y) => y()),
                n,
                false
              );
            }, this.options.maxLifetimeSeconds * 1e3);
            u.unref(), t.once(
              "end",
              () => clearTimeout(u)
            );
          }
          return this._acquireClient(t, e, n, true);
        }
      });
    }
    _acquireClient(e, t, n, i) {
      i && this.emit("connect", e), this.emit("acquire", e), e.release = this._releaseOnce(e, n), e.removeListener("error", n), t.timedOut ? i && this.options.verify ? this.options.verify(
        e,
        e.release
      ) : e.release() : i && this.options.verify ? this.options.verify(e, (s) => {
        if (s) return e.release(s), t.callback(s, void 0, Rs);
        t.callback(void 0, e, e.release);
      }) : t.callback(
        void 0,
        e,
        e.release
      );
    }
    _releaseOnce(e, t) {
      let n = false;
      return (i) => {
        n && _c(), n = true, this._release(
          e,
          t,
          i
        );
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
      this.options.idleTimeoutMillis && (s = setTimeout(() => {
        this.log("remove idle client"), this._remove(e);
      }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s.unref()), this.options.allowExitOnIdle && e.unref(), this._idle.push(new fn(e, t, s)), this._pulseQueue();
    }
    query(e, t, n) {
      if (typeof e == "function") {
        let s = _t(this.Promise, e);
        return S(function() {
          return s.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), s.result;
      }
      typeof t == "function" && (n = t, t = void 0);
      let i = _t(this.Promise, n);
      return n = i.callback, this.connect((s, o) => {
        if (s)
          return n(s);
        let u = false, c = a((h) => {
          u || (u = true, o.release(h), n(h));
        }, "onError");
        o.once("error", c), this.log("dispatching query");
        try {
          o.query(e, t, (h, l) => {
            if (this.log("query dispatched"), o.removeListener("error", c), !u) return u = true, o.release(h), h ? n(h) : n(
              void 0,
              l
            );
          });
        } catch (h) {
          return o.release(h), n(h);
        }
      }), i.result;
    }
    end(e) {
      if (this.log("ending"), this.ending) {
        let n = new Error("Called end on pool more than once");
        return e ? e(n) : this.Promise.reject(n);
      }
      this.ending = true;
      let t = _t(this.Promise, e);
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
  a(mn, "Pool");
  var pn = mn;
  Ms.exports = pn;
});
var Os = {};
X(Os, { default: /* @__PURE__ */ __name(() => Cc, "default") });
var Cc;
var ks = K(() => {
  "use strict";
  p();
  Cc = {};
});
var Us = I((ff, Ic) => {
  Ic.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
    "database",
    "libpq",
    "pg",
    "postgre",
    "postgres",
    "postgresql",
    "rdbms"
  ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: {
    "buffer-writer": "2.0.0",
    "packet-reader": "1.0.0",
    "pg-connection-string": "^2.5.0",
    "pg-pool": "^3.5.2",
    "pg-protocol": "^1.5.0",
    "pg-types": "^2.1.0",
    pgpass: "1.x"
  }, devDependencies: { async: "2.6.4", bluebird: "3.5.2", co: "4.6.0", "pg-copy-streams": "0.3.0" }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: {
    "pg-native": { optional: true }
  }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
});
var Qs = I((pf, Ns) => {
  "use strict";
  p();
  var qs = ge().EventEmitter, Tc = (Ge(), k(He)), gn = tt(), Qe = Ns.exports = function(r, e, t) {
    qs.call(this), r = gn.normalizeQueryConfig(r, e, t), this.text = r.text, this.values = r.values, this.name = r.name, this.callback = r.callback, this.state = "new", this._arrayMode = r.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n) {
      n === "row" && (this._emitRowEvents = true);
    }.bind(this));
  };
  Tc.inherits(
    Qe,
    qs
  );
  var Pc = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  Qe.prototype.handleError = function(r) {
    var e = this.native.pq.resultErrorFields();
    if (e) for (var t in e) {
      var n = Pc[t] || t;
      r[n] = e[t];
    }
    this.callback ? this.callback(r) : this.emit("error", r), this.state = "error";
  };
  Qe.prototype.then = function(r, e) {
    return this._getPromise().then(r, e);
  };
  Qe.prototype.catch = function(r) {
    return this._getPromise().catch(r);
  };
  Qe.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(r, e) {
      this._once("end", r), this._once(
        "error",
        e
      );
    }.bind(this)), this._promise);
  };
  Qe.prototype.submit = function(r) {
    this.state = "running";
    var e = this;
    this.native = r.native, r.native.arrayMode = this._arrayMode;
    var t = a(
      function(s, o, u) {
        if (r.native.arrayMode = false, S(function() {
          e.emit("_done");
        }), s) return e.handleError(s);
        e._emitRowEvents && (u.length > 1 ? o.forEach((c, h) => {
          c.forEach((l) => {
            e.emit(
              "row",
              l,
              u[h]
            );
          });
        }) : o.forEach(function(c) {
          e.emit("row", c, u);
        })), e.state = "end", e.emit(
          "end",
          u
        ), e.callback && e.callback(null, u);
      },
      "after"
    );
    if (m.domain && (t = m.domain.bind(
      t
    )), this.name) {
      this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error(
        "You supplied %s (%s)",
        this.name,
        this.name.length
      ), console.error("This can cause conflicts and silent errors executing queries"));
      var n = (this.values || []).map(gn.prepareValue);
      if (r.namedQueries[this.name]) {
        if (this.text && r.namedQueries[this.name] !== this.text) {
          let s = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return t(s);
        }
        return r.native.execute(this.name, n, t);
      }
      return r.native.prepare(
        this.name,
        this.text,
        n.length,
        function(s) {
          return s ? t(s) : (r.namedQueries[e.name] = e.text, e.native.execute(e.name, n, t));
        }
      );
    } else if (this.values) {
      if (!Array.isArray(this.values)) {
        let s = new Error("Query values must be an array");
        return t(s);
      }
      var i = this.values.map(gn.prepareValue);
      r.native.query(this.text, i, t);
    } else r.native.query(this.text, t);
  };
});
var Gs = I((gf, Hs) => {
  "use strict";
  p();
  var Bc = (ks(), k(Os)), Lc = hr(), mf = Us(), Ws = ge().EventEmitter, Rc = (Ge(), k(He)), Fc = gt(), js = Qs(), Z = Hs.exports = function(r) {
    Ws.call(this), r = r || {}, this._Promise = r.Promise || b.Promise, this._types = new Lc(r.types), this.native = new Bc({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
    var e = this.connectionParameters = new Fc(
      r
    );
    this.user = e.user, Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: e.password
    }), this.database = e.database, this.host = e.host, this.port = e.port, this.namedQueries = {};
  };
  Z.Query = js;
  Rc.inherits(Z, Ws);
  Z.prototype._errorAllQueries = function(r) {
    let e = a(
      (t) => {
        m.nextTick(() => {
          t.native = this.native, t.handleError(r);
        });
      },
      "enqueueError"
    );
    this._hasActiveQuery() && (e(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e), this._queryQueue.length = 0;
  };
  Z.prototype._connect = function(r) {
    var e = this;
    if (this._connecting) {
      m.nextTick(() => r(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t, n) {
      if (t) return r(
        t
      );
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
  Z.prototype.connect = function(r) {
    if (r) {
      this._connect(r);
      return;
    }
    return new this._Promise(
      (e, t) => {
        this._connect((n) => {
          n ? t(n) : e();
        });
      }
    );
  };
  Z.prototype.query = function(r, e, t) {
    var n, i, s, o, u;
    if (r == null) throw new TypeError("Client was passed a null or undefined query");
    if (typeof r.submit == "function") s = r.query_timeout || this.connectionParameters.query_timeout, i = n = r, typeof e == "function" && (r.callback = e);
    else if (s = this.connectionParameters.query_timeout, n = new js(r, e, t), !n.callback) {
      let c, h;
      i = new this._Promise((l, y) => {
        c = l, h = y;
      }), n.callback = (l, y) => l ? h(l) : c(y);
    }
    return s && (u = n.callback, o = setTimeout(() => {
      var c = new Error("Query read timeout");
      m.nextTick(() => {
        n.handleError(c, this.connection);
      }), u(c), n.callback = () => {
      };
      var h = this._queryQueue.indexOf(n);
      h > -1 && this._queryQueue.splice(h, 1), this._pulseQueryQueue();
    }, s), n.callback = (c, h) => {
      clearTimeout(o), u(c, h);
    }), this._queryable ? this._ending ? (n.native = this.native, m.nextTick(() => {
      n.handleError(
        new Error("Client was closed and is not queryable")
      );
    }), i) : (this._queryQueue.push(
      n
    ), this._pulseQueryQueue(), i) : (n.native = this.native, m.nextTick(() => {
      n.handleError(
        new Error("Client has encountered a connection error and is not queryable")
      );
    }), i);
  };
  Z.prototype.end = function(r) {
    var e = this;
    this._ending = true, this._connected || this.once(
      "connect",
      this.end.bind(this, r)
    );
    var t;
    return r || (t = new this._Promise(function(n, i) {
      r = a((s) => s ? i(s) : n(), "cb");
    })), this.native.end(function() {
      e._errorAllQueries(new Error(
        "Connection terminated"
      )), m.nextTick(() => {
        e.emit("end"), r && r();
      });
    }), t;
  };
  Z.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  Z.prototype._pulseQueryQueue = function(r) {
    if (this._connected && !this._hasActiveQuery()) {
      var e = this._queryQueue.shift();
      if (!e) {
        r || this.emit("drain");
        return;
      }
      this._activeQuery = e, e.submit(this);
      var t = this;
      e.once(
        "_done",
        function() {
          t._pulseQueryQueue();
        }
      );
    }
  };
  Z.prototype.cancel = function(r) {
    this._activeQuery === r ? this.native.cancel(function() {
    }) : this._queryQueue.indexOf(r) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r), 1);
  };
  Z.prototype.ref = function() {
  };
  Z.prototype.unref = function() {
  };
  Z.prototype.setTypeParser = function(r, e, t) {
    return this._types.setTypeParser(r, e, t);
  };
  Z.prototype.getTypeParser = function(r, e) {
    return this._types.getTypeParser(r, e);
  };
});
var wn = I((Sf, $s) => {
  "use strict";
  p();
  $s.exports = Gs();
});
var At = I((Ef, nt) => {
  "use strict";
  p();
  var Mc = Ls(), Dc = et(), Oc = cn(), kc = Ds(), { DatabaseError: Uc } = on(), qc = a((r) => {
    var e;
    return e = class extends kc {
      static {
        __name(this, "e");
      }
      constructor(n) {
        super(n, r);
      }
    }, a(e, "BoundPool"), e;
  }, "poolFactory"), bn = a(function(r) {
    this.defaults = Dc, this.Client = r, this.Query = this.Client.Query, this.Pool = qc(this.Client), this._pools = [], this.Connection = Oc, this.types = Xe(), this.DatabaseError = Uc;
  }, "PG");
  typeof m.env.NODE_PG_FORCE_NATIVE < "u" ? nt.exports = new bn(wn()) : (nt.exports = new bn(Mc), Object.defineProperty(nt.exports, "native", { configurable: true, enumerable: false, get() {
    var r = null;
    try {
      r = new bn(wn());
    } catch (e) {
      if (e.code !== "MODULE_NOT_FOUND") throw e;
    }
    return Object.defineProperty(nt.exports, "native", { value: r }), r;
  } }));
});
p();
var Ct = We(At());
wt();
p();
fr();
wt();
var zs = We(tt());
var Sn = class Sn2 extends Error {
  static {
    __name(this, "Sn");
  }
  constructor() {
    super(...arguments);
    T(this, "name", "NeonDbError");
    T(this, "code", null);
    T(this, "sourceError");
  }
};
a(Sn, "NeonDbError");
var Ae = Sn;
var Ks = "transaction() expects an array of queries, or a function returning an array of queries";
function Ys(r, {
  arrayMode: e,
  fullResults: t,
  fetchOptions: n,
  isolationLevel: i,
  readOnly: s,
  deferrable: o,
  queryCallback: u,
  resultCallback: c
} = {}) {
  if (!r) throw new Error(
    "No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?"
  );
  let h;
  try {
    h = lr(r);
  } catch {
    throw new Error("Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(
      r
    ));
  }
  let { protocol: l, username: y, password: E, hostname: _, port: P, pathname: N } = h;
  if (l !== "postgres:" && l !== "postgresql:" || !y || !E || !_ || !N) throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
  function J(A, ...g) {
    let D, H;
    if (typeof A == "string") D = A, H = g[1], g = g[0] ?? [];
    else {
      D = "";
      for (let W = 0; W < A.length; W++) D += A[W], W < g.length && (D += "$" + (W + 1));
    }
    g = g.map((W) => (0, zs.prepareValue)(W));
    let Q = { query: D, params: g };
    return u && u(Q), Nc(
      pe,
      Q,
      H
    );
  }
  __name(J, "J");
  a(J, "resolve"), J.transaction = async (A, g) => {
    if (typeof A == "function" && (A = A(J)), !Array.isArray(A)) throw new Error(Ks);
    let D = A.map((H) => {
      if (H[Symbol.toStringTag] !== "NeonQueryPromise") throw new Error(Ks);
      return H.parameterizedQuery;
    });
    return pe(
      D,
      g
    );
  };
  async function pe(A, g) {
    let D = n ?? {}, { fetchEndpoint: H, fetchConnectionCache: Q, fetchFunction: W } = _e, ue = typeof H == "function" ? H(_, P) : H, de = Array.isArray(A) ? { queries: A } : A, L = e ?? false, G = t ?? false, ce = i, ye = s, xe = o;
    g !== void 0 && (g.arrayMode !== void 0 && (L = g.arrayMode), g.fullResults !== void 0 && (G = g.fullResults), g.fetchOptions !== void 0 && (D = { ...D, ...g.fetchOptions }), g.isolationLevel !== void 0 && (ce = g.isolationLevel), g.readOnly !== void 0 && (ye = g.readOnly), g.deferrable !== void 0 && (xe = g.deferrable));
    let he = { "Neon-Connection-String": r, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true" };
    Q === true && (he["Neon-Pool-Opt-In"] = "true"), Array.isArray(A) && (ce !== void 0 && (he["Neon-Batch-Isolation-Level"] = ce), ye !== void 0 && (he["Neon-Batch-Read-Only"] = String(ye)), xe !== void 0 && (he["Neon-Batch-Deferrable"] = String(xe)));
    let ie;
    try {
      ie = await (W ?? fetch)(ue, { method: "POST", body: JSON.stringify(de), headers: he, ...D });
    } catch (se) {
      let $ = new Ae(`Error connecting to database: ${se.message}`);
      throw $.sourceError = se, $;
    }
    if (ie.ok) {
      let se = await ie.json();
      if (Array.isArray(A)) {
        let $ = se.results;
        if (!Array.isArray($)) throw new Ae("Neon internal error: unexpected result format");
        return $.map((ne, Ce) => Vs(ne, {
          arrayMode: L,
          fullResults: G,
          parameterizedQuery: A[Ce],
          resultCallback: c
        }));
      } else return Vs(se, {
        arrayMode: L,
        fullResults: G,
        parameterizedQuery: A,
        resultCallback: c
      });
    } else {
      let { status: se } = ie;
      if (se === 400) {
        let { message: $, code: ne } = await ie.json(), Ce = new Ae($);
        throw Ce.code = ne, Ce;
      } else {
        let $ = await ie.text();
        throw new Ae(`Server error (HTTP status ${se}): ${$}`);
      }
    }
  }
  __name(pe, "pe");
  return a(
    pe,
    "execute"
  ), J;
}
__name(Ys, "Ys");
a(Ys, "neon");
function Nc(r, e, t) {
  return { [Symbol.toStringTag]: "NeonQueryPromise", parameterizedQuery: e, opts: t, then: /* @__PURE__ */ __name((n, i) => r(e, t).then(n, i), "then"), catch: /* @__PURE__ */ __name((n) => r(
    e,
    t
  ).catch(n), "catch"), finally: /* @__PURE__ */ __name((n) => r(e, t).finally(n), "finally") };
}
__name(Nc, "Nc");
a(Nc, "createNeonQueryPromise");
function Vs(r, {
  arrayMode: e,
  fullResults: t,
  parameterizedQuery: n,
  resultCallback: i
}) {
  let s = r.fields.map((c) => c.name), o = r.fields.map((c) => Se.types.getTypeParser(c.dataTypeID)), u = e === true ? r.rows.map((c) => c.map((h, l) => h === null ? null : o[l](h))) : r.rows.map((c) => Object.fromEntries(
    c.map((h, l) => [s[l], h === null ? null : o[l](h)])
  ));
  return i && i(n, r, u, { arrayMode: e, fullResults: t }), t ? (r.viaNeonFetch = true, r.rowAsArray = e, r.rows = u, r) : u;
}
__name(Vs, "Vs");
a(Vs, "processQueryResult");
var Js = We(gt());
var Se = We(At());
var En = class En2 extends Ct.Client {
  static {
    __name(this, "En");
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
    let i = this.config?.host !== void 0 || this.config?.connectionString !== void 0 || m.env.PGHOST !== void 0, s = m.env.USER ?? m.env.USERNAME;
    if (!i && this.host === "localhost" && this.user === s && this.database === s && this.password === null) throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let o = super.connect(t), u = n.pipelineTLS && this.ssl, c = n.pipelineConnect === "password";
    if (!u && !n.pipelineConnect) return o;
    let h = this.connection;
    if (u && h.on("connect", () => h.stream.emit("data", "S")), c) {
      h.removeAllListeners(
        "authenticationCleartextPassword"
      ), h.removeAllListeners("readyForQuery"), h.once(
        "readyForQuery",
        () => h.on("readyForQuery", this._handleReadyForQuery.bind(this))
      );
      let l = this.ssl ? "sslconnect" : "connect";
      h.on(l, () => {
        this._handleAuthCleartextPassword(), this._handleReadyForQuery();
      });
    }
    return o;
  }
  async _handleAuthSASLContinue(t) {
    let n = this.saslSession, i = this.password, s = t.data;
    if (n.message !== "SASLInitialResponse" || typeof i != "string" || typeof s != "string") throw new Error("SASL: protocol error");
    let o = Object.fromEntries(s.split(",").map(($) => {
      if (!/^.=/.test($)) throw new Error("SASL: Invalid attribute pair entry");
      let ne = $[0], Ce = $.substring(2);
      return [ne, Ce];
    })), u = o.r, c = o.s, h = o.i;
    if (!u || !/^[!-+--~]+$/.test(u)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
    if (!c || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(c)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
    if (!h || !/^[1-9][0-9]*$/.test(h)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
    if (!u.startsWith(n.clientNonce)) throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce"
    );
    if (u.length === n.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    let l = parseInt(h, 10), y = d.from(c, "base64"), E = new TextEncoder(), _ = E.encode(i), P = await w.subtle.importKey("raw", _, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), N = new Uint8Array(await w.subtle.sign("HMAC", P, d.concat([y, d.from(
      [0, 0, 0, 1]
    )]))), J = N;
    for (var pe = 0; pe < l - 1; pe++) N = new Uint8Array(await w.subtle.sign(
      "HMAC",
      P,
      N
    )), J = d.from(J.map(($, ne) => J[ne] ^ N[ne]));
    let A = J, g = await w.subtle.importKey(
      "raw",
      A,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), D = new Uint8Array(await w.subtle.sign("HMAC", g, E.encode("Client Key"))), H = await w.subtle.digest(
      "SHA-256",
      D
    ), Q = "n=*,r=" + n.clientNonce, W = "r=" + u + ",s=" + c + ",i=" + l, ue = "c=biws,r=" + u, de = Q + "," + W + "," + ue, L = await w.subtle.importKey(
      "raw",
      H,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    var G = new Uint8Array(await w.subtle.sign("HMAC", L, E.encode(de))), ce = d.from(D.map(($, ne) => D[ne] ^ G[ne])), ye = ce.toString("base64");
    let xe = await w.subtle.importKey("raw", A, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), he = await w.subtle.sign("HMAC", xe, E.encode("Server Key")), ie = await w.subtle.importKey("raw", he, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
    var se = d.from(await w.subtle.sign("HMAC", ie, E.encode(de)));
    n.message = "SASLResponse", n.serverSignature = se.toString("base64"), n.response = ue + ",p=" + ye, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
};
a(En, "NeonClient");
var xn = En;
function Qc(r, e) {
  if (e) return {
    callback: e,
    result: void 0
  };
  let t, n, i = a(function(o, u) {
    o ? t(o) : n(u);
  }, "cb"), s = new r(function(o, u) {
    n = o, t = u;
  });
  return { callback: i, result: s };
}
__name(Qc, "Qc");
a(Qc, "promisify");
var vn = class vn2 extends Ct.Pool {
  static {
    __name(this, "vn");
  }
  constructor() {
    super(...arguments);
    T(this, "Client", xn);
    T(this, "hasFetchUnsupportedListeners", false);
  }
  on(t, n) {
    return t !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t, n);
  }
  query(t, n, i) {
    if (!_e.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t == "function")
      return super.query(t, n, i);
    typeof n == "function" && (i = n, n = void 0);
    let s = Qc(
      this.Promise,
      i
    );
    i = s.callback;
    try {
      let o = new Js.default(this.options), u = encodeURIComponent, c = encodeURI, h = `postgresql://${u(o.user)}:${u(o.password)}@${u(o.host)}/${c(o.database)}`, l = typeof t == "string" ? t : t.text, y = n ?? t.values ?? [];
      Ys(h, { fullResults: true, arrayMode: t.rowMode === "array" })(l, y).then((_) => i(void 0, _)).catch((_) => i(_));
    } catch (o) {
      i(o);
    }
    return s.result;
  }
};
a(vn, "NeonPool");
var Zs = vn;
var export_ClientBase = Se.ClientBase;
var export_Connection = Se.Connection;
var export_DatabaseError = Se.DatabaseError;
var export_Query = Se.Query;
var export_defaults = Se.defaults;
var export_types = Se.types;

// node_modules/@prisma/adapter-neon/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
init_checked_fetch();
init_modules_watch_stub();
var import_debug = __toESM(require_dist(), 1);
function ok(value) {
  return {
    ok: true,
    value,
    map(fn) {
      return ok(fn(value));
    },
    flatMap(fn) {
      return fn(value);
    }
  };
}
__name(ok, "ok");
function err(error) {
  return {
    ok: false,
    error,
    map() {
      return err(error);
    },
    flatMap() {
      return err(error);
    }
  };
}
__name(err, "err");
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
var _UnsupportedNativeDataType = class _UnsupportedNativeDataType2 extends Error {
  static {
    __name(this, "_UnsupportedNativeDataType");
  }
  constructor(code) {
    super();
    this.type = _UnsupportedNativeDataType2.typeNames[code] || "Unknown";
    this.message = `Unsupported column type ${this.type}`;
  }
};
_UnsupportedNativeDataType.typeNames = {
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
var UnsupportedNativeDataType = _UnsupportedNativeDataType;
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
  return time;
}
__name(normalize_timestamp, "normalize_timestamp");
function normalize_timestampz(time) {
  return time.split("+")[0];
}
__name(normalize_timestampz, "normalize_timestampz");
function normalize_time(time) {
  return time;
}
__name(normalize_time, "normalize_time");
function normalize_timez(time) {
  return time.split("+")[0];
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
  [ScalarColumnType.JSONB]: toJson,
  [ScalarColumnType.BYTEA]: convertBytes,
  [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
  [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
function fixArrayBufferValues(values) {
  for (let i = 0; i < values.length; i++) {
    const list = values[i];
    if (!Array.isArray(list)) {
      continue;
    }
    for (let j = 0; j < list.length; j++) {
      const listItem = list[j];
      if (ArrayBuffer.isView(listItem)) {
        list[j] = Buffer.from(listItem.buffer, listItem.byteOffset, listItem.byteLength);
      }
    }
  }
  return values;
}
__name(fixArrayBufferValues, "fixArrayBufferValues");
var debug = (0, import_debug.Debug)("prisma:driver-adapter:neon");
var NeonQueryable = class {
  static {
    __name(this, "NeonQueryable");
  }
  constructor() {
    this.provider = "postgres";
    this.adapterName = name;
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag2 = "[js::query_raw]";
    debug(`${tag2} %O`, query);
    const res = await this.performIO(query);
    if (!res.ok) {
      return err(res.error);
    }
    const { fields, rows } = res.value;
    const columnNames = fields.map((field) => field.name);
    let columnTypes = [];
    try {
      columnTypes = fields.map((field) => fieldToColumnType(field.dataTypeID));
    } catch (e) {
      if (e instanceof UnsupportedNativeDataType) {
        return err({
          kind: "UnsupportedNativeDataType",
          type: e.type
        });
      }
      throw e;
    }
    return ok({
      columnNames,
      columnTypes,
      rows
    });
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag2 = "[js::execute_raw]";
    debug(`${tag2} %O`, query);
    return (await this.performIO(query)).map((r) => r.rowCount ?? 0);
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
    const { sql, args: values } = query;
    try {
      const result = await this.client.query(
        {
          text: sql,
          values: fixArrayBufferValues(values),
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
        fixArrayBufferValues(values)
      );
      return ok(result);
    } catch (e) {
      debug("Error in performIO: %O", e);
      if (e && typeof e.code === "string" && typeof e.severity === "string" && typeof e.message === "string") {
        return err({
          kind: "Postgres",
          code: e.code,
          severity: e.severity,
          message: e.message,
          detail: e.detail,
          column: e.column,
          hint: e.hint
        });
      }
      throw e;
    }
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
    debug(`[js::commit]`);
    this.client.release();
    return Promise.resolve(ok(void 0));
  }
  async rollback() {
    debug(`[js::rollback]`);
    this.client.release();
    return Promise.resolve(ok(void 0));
  }
};
var NeonTransactionContext = class extends NeonWsQueryable {
  static {
    __name(this, "NeonTransactionContext");
  }
  constructor(conn) {
    super(conn);
    this.conn = conn;
  }
  async startTransaction() {
    const options = {
      usePhantomQuery: false
    };
    const tag2 = "[js::startTransaction]";
    debug("%s options: %O", tag2, options);
    return ok(new NeonTransaction(this.conn, options));
  }
};
var PrismaNeon = class extends NeonWsQueryable {
  static {
    __name(this, "PrismaNeon");
  }
  constructor(pool, options) {
    if (!(pool instanceof Zs)) {
      throw new TypeError(`PrismaNeon must be initialized with an instance of Pool:
import { Pool } from '@neondatabase/serverless'
const pool = new Pool({ connectionString: url })
const adapter = new PrismaNeon(pool)
`);
    }
    super(pool);
    this.options = options;
    this.isRunning = true;
  }
  getConnectionInfo() {
    return ok({
      schemaName: this.options?.schema
    });
  }
  async transactionContext() {
    const conn = await this.client.connect();
    return ok(new NeonTransactionContext(conn));
  }
  async close() {
    if (this.isRunning) {
      await this.client.end();
      this.isRunning = false;
    }
    return ok(void 0);
  }
};

// src/services/db.ts
var import_client = __toESM(require_default2());
var prisma;
function getPrismaClient2(databaseUrl) {
  if (!prisma) {
    const neon = new Zs({ connectionString: databaseUrl });
    const adapter = new PrismaNeon(neon);
    prisma = new import_client.PrismaClient({
      adapter,
      log: ["error", "warn"]
    });
  }
  return prisma;
}
__name(getPrismaClient2, "getPrismaClient");

// src/handlers/appointments.handler.ts
function createAppointmentHandlers(qiancaiDouService) {
  const getCourses = /* @__PURE__ */ __name(async (c) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma2 = getPrismaClient2(databaseUrl);
      const category = c.req.query("category");
      const where = {
        isActive: true,
        ...category && { category }
      };
      const courses = await prisma2.offlineCourse.findMany({
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const schedules = await prisma2.courseSchedule.findMany({
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const result = await prisma2.$transaction(async (tx) => {
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const where = {
        userId: currentUser.id,
        ...status && { status }
      };
      const appointments = await prisma2.userAppointment.findMany({
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const result = await prisma2.$transaction(async (tx) => {
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
init_checked_fetch();
init_modules_watch_stub();
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const existingUser = await prisma2.user.findUnique({
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
      const user = await prisma2.user.create({
        data: {
          email: body.email,
          passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
          language: body.language || "zh",
          qiancaiDouBalance: 100
          // 新用户奖励100仟彩豆
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const user = await prisma2.user.findUnique({
        where: { email: body.email }
      });
      if (!user) {
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
      return c.json({
        code: 500,
        message: "Internal server error",
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const user = await prisma2.user.findUnique({
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
  return {
    register,
    login,
    getMe
  };
}
__name(createAuthHandlers, "createAuthHandlers");

// src/handlers/products.handler.ts
init_checked_fetch();
init_modules_watch_stub();
function createProductHandlers(qiancaiDouService) {
  const getProducts = /* @__PURE__ */ __name(async (c) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma2 = getPrismaClient2(databaseUrl);
      const page = Math.max(1, parseInt(c.req.query("page") || "1"));
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query("limit") || "20")));
      const category = c.req.query("category");
      const offset = (page - 1) * limit;
      const where = {
        isActive: true,
        ...category && { category }
      };
      const [products, total] = await Promise.all([
        prisma2.product.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: offset,
          take: limit
        }),
        prisma2.product.count({ where })
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
    }
  }, "getProducts");
  const getProduct = /* @__PURE__ */ __name(async (c) => {
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const product = await prisma2.product.findUnique({
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const result = await prisma2.$transaction(async (tx) => {
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
            shippingAddress: body.shippingAddress,
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const [orders, total] = await Promise.all([
        prisma2.order.findMany({
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
        prisma2.order.count({
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

// src/handlers/travel.handler.ts
init_checked_fetch();
init_modules_watch_stub();
function createTravelHandlers() {
  const getTravelPosts = /* @__PURE__ */ __name(async (c) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL not configured");
      }
      const prisma2 = getPrismaClient2(databaseUrl);
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
        prisma2.travelPost.findMany({
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
        prisma2.travelPost.count({ where })
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const [post] = await Promise.all([
        prisma2.travelPost.findUnique({
          where: {
            id: postId,
            isPublished: true
          }
        }),
        // 异步增加浏览量
        prisma2.travelPost.update({
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
      const prisma2 = getPrismaClient2(databaseUrl);
      const posts = await prisma2.travelPost.findMany({
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
      const prisma2 = getPrismaClient2(databaseUrl);
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
        prisma2.travelPost.findMany({
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
        prisma2.travelPost.count({ where: searchCondition })
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
init_checked_fetch();
init_modules_watch_stub();
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
    c.header("Access-Control-Allow-Origin", "*");
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Max-Age", "86400");
    if (c.req.method === "OPTIONS") {
      return c.text("", 204);
    }
    await next();
  };
}
__name(corsMiddleware, "corsMiddleware");

// src/services/auth.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/base64url.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/buffer_utils.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/webcrypto.js
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
var is_key_like_default = /* @__PURE__ */ __name((key) => {
  if (isCryptoKey(key)) {
    return true;
  }
  return key?.[Symbol.toStringTag] === "KeyObject";
}, "default");
var types = ["CryptoKey"];

// node_modules/jose/dist/browser/lib/is_disjoint.js
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
var check_key_length_default = /* @__PURE__ */ __name((alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
}, "default");

// node_modules/jose/dist/browser/runtime/normalize_key.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/is_jwk.js
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
var exportKeyValue = /* @__PURE__ */ __name((k2) => decode(k2), "exportKeyValue");
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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

// node_modules/jose/dist/browser/jws/compact/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jws/flattened/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/subtle_dsa.js
init_checked_fetch();
init_modules_watch_stub();
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
init_checked_fetch();
init_modules_watch_stub();
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

// node_modules/jose/dist/browser/jwt/verify.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/jwt_claims_set.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/lib/epoch.js
init_checked_fetch();
init_modules_watch_stub();
var epoch_default = /* @__PURE__ */ __name((date) => Math.floor(date.getTime() / 1e3), "default");

// node_modules/jose/dist/browser/lib/secs.js
init_checked_fetch();
init_modules_watch_stub();
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

// node_modules/jose/dist/browser/jws/compact/sign.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jws/flattened/sign.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/runtime/sign.js
init_checked_fetch();
init_modules_watch_stub();
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

// node_modules/jose/dist/browser/jwt/sign.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/jose/dist/browser/jwt/produce.js
init_checked_fetch();
init_modules_watch_stub();
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
    return crypto.subtle.timingSafeEqual(storedHashBytes, derivedBytes);
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
init_checked_fetch();
init_modules_watch_stub();
var QiancaiDouService = class {
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  static {
    __name(this, "QiancaiDouService");
  }
  /**
   * 获取用户仟彩豆余额
   */
  async getBalance(userId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { qiancaiDouBalance: true }
    });
    return user?.qiancaiDouBalance ?? 0;
  }
  /**
   * 增加仟彩豆
   */
  async creditQiancaiDou(transaction) {
    if (transaction.amount <= 0) {
      throw new Error("Credit amount must be positive");
    }
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: transaction.userId },
        select: { qiancaiDouBalance: true }
      });
      if (!user) {
        throw new Error("User not found");
      }
      const newBalance = user.qiancaiDouBalance + transaction.amount;
      await tx.user.update({
        where: { id: transaction.userId },
        data: { qiancaiDouBalance: newBalance }
      });
      await tx.qiancaiDouTransaction.create({
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
    });
  }
  /**
   * 扣除仟彩豆
   */
  async debitQiancaiDou(transaction) {
    if (transaction.amount <= 0) {
      throw new Error("Debit amount must be positive");
    }
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
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
      await tx.user.update({
        where: { id: transaction.userId },
        data: { qiancaiDouBalance: newBalance }
      });
      await tx.qiancaiDouTransaction.create({
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
    });
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
function initializeServices(c) {
  const databaseUrl = c.env?.DATABASE_URL;
  const jwtSecret = c.env?.JWT_SECRET;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  const prisma2 = getPrismaClient2(databaseUrl);
  const authService = new AuthService(jwtSecret);
  const qiancaiDouService = new QiancaiDouService(prisma2);
  const authMiddleware = createAuthMiddleware(authService);
  return {
    authService,
    qiancaiDouService,
    authMiddleware,
    prisma: prisma2
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
app.onError((err2, c) => {
  console.error("Unhandled error:", err2);
  return c.json({
    code: 500,
    message: "Internal server error",
    data: null
  }, 500);
});

// src/index.ts
var src_default = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-OdNl9w/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-OdNl9w/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
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
