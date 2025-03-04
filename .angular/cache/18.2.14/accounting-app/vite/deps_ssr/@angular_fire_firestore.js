import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  getCountFromServer,
  onSnapshot,
  refEqual,
  require_src,
  require_src2
} from "./chunk-25354Y6X.js";
import {
  AuthInstances
} from "./chunk-YH3OJHQM.js";
import "./chunk-HV2AWGOI.js";
import "./chunk-2MJSTNSL.js";
import "./chunk-5XTFOKG7.js";
import "./chunk-SHNWMCCJ.js";
import {
  FirebaseApp,
  FirebaseApps,
  VERSION,
  ɵAngularFireSchedulers,
  ɵAppCheckInstances,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵzoneWrap
} from "./chunk-MJFYZGOI.js";
import {
  Component,
  FirebaseError,
  LogLevel,
  Logger,
  SDK_VERSION,
  _getProvider,
  _registerComponent,
  _removeServiceInstance,
  createMockUserToken,
  deepEqual,
  getApp,
  getDefaultEmulatorHostnameAndPort,
  getModularInstance,
  getUA,
  isIndexedDBAvailable,
  isSafari,
  registerVersion
} from "./chunk-3HWNS6QV.js";
import "./chunk-BEQVC6RL.js";
import {
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Optional,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-MO2UWD5T.js";
import {
  require_cjs
} from "./chunk-LWXIL23G.js";
import {
  require_operators
} from "./chunk-MLNVMJFP.js";
import "./chunk-3BV3SMSN.js";
import {
  __async,
  __superGet,
  __toESM
} from "./chunk-LKDWXENB.js";

// node_modules/@angular/fire/fesm2022/angular-fire-firestore.mjs
var import_rxjs2 = __toESM(require_cjs(), 1);
var import_operators2 = __toESM(require_operators(), 1);

// node_modules/rxfire/firestore/index.esm.js
var import_rxjs = __toESM(require_cjs());
var import_operators = __toESM(require_operators());
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from3, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from3.length, ar; i < l; i++) {
    if (ar || !(i in from3)) {
      if (!ar) ar = Array.prototype.slice.call(from3, 0, i);
      ar[i] = from3[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from3));
}
var DEFAULT_OPTIONS = {
  includeMetadataChanges: false
};
function fromRef(ref, options) {
  if (options === void 0) {
    options = DEFAULT_OPTIONS;
  }
  return new import_rxjs.Observable(function(subscriber) {
    var unsubscribe = onSnapshot(ref, options, {
      next: subscriber.next.bind(subscriber),
      error: subscriber.error.bind(subscriber),
      complete: subscriber.complete.bind(subscriber)
    });
    return {
      unsubscribe
    };
  });
}
function doc(ref) {
  return fromRef(ref, {
    includeMetadataChanges: true
  });
}
function docData(ref, options) {
  if (options === void 0) {
    options = {};
  }
  return doc(ref).pipe((0, import_operators.map)(function(snap) {
    return snapToData(snap, options);
  }));
}
function snapToData(snapshot, options) {
  var _a;
  if (options === void 0) {
    options = {};
  }
  var data = snapshot.data(options);
  if (!snapshot.exists() || typeof data !== "object" || data === null || !options.idField) {
    return data;
  }
  return __assign(__assign({}, data), (_a = {}, _a[options.idField] = snapshot.id, _a));
}
var ALL_EVENTS = ["added", "modified", "removed"];
var filterEvents = function(events) {
  return (0, import_operators.filter)(function(changes) {
    var hasChange = false;
    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];
      if (events && events.indexOf(change.type) >= 0) {
        hasChange = true;
        break;
      }
    }
    return hasChange;
  });
};
function sliceAndSplice(original, start, deleteCount) {
  var args = [];
  for (var _i = 3; _i < arguments.length; _i++) {
    args[_i - 3] = arguments[_i];
  }
  var returnArray = original.slice();
  returnArray.splice.apply(returnArray, __spreadArray([start, deleteCount], args, false));
  return returnArray;
}
function processIndividualChange(combined, change) {
  switch (change.type) {
    case "added":
      if (combined[change.newIndex] && refEqual(combined[change.newIndex].doc.ref, change.doc.ref)) ;
      else {
        return sliceAndSplice(combined, change.newIndex, 0, change);
      }
      break;
    case "modified":
      if (combined[change.oldIndex] == null || refEqual(combined[change.oldIndex].doc.ref, change.doc.ref)) {
        if (change.oldIndex !== change.newIndex) {
          var copiedArray = combined.slice();
          copiedArray.splice(change.oldIndex, 1);
          copiedArray.splice(change.newIndex, 0, change);
          return copiedArray;
        } else {
          return sliceAndSplice(combined, change.newIndex, 1, change);
        }
      }
      break;
    case "removed":
      if (combined[change.oldIndex] && refEqual(combined[change.oldIndex].doc.ref, change.doc.ref)) {
        return sliceAndSplice(combined, change.oldIndex, 1);
      }
      break;
  }
  return combined;
}
function processDocumentChanges(current, changes, events) {
  if (events === void 0) {
    events = ALL_EVENTS;
  }
  changes.forEach(function(change) {
    if (events.indexOf(change.type) > -1) {
      current = processIndividualChange(current, change);
    }
  });
  return current;
}
var windowwise = function() {
  return (0, import_rxjs.pipe)((0, import_operators.startWith)(void 0), (0, import_operators.pairwise)());
};
var metaDataEquals = function(a, b) {
  return JSON.stringify(a.metadata) === JSON.stringify(b.metadata);
};
var filterEmptyUnlessFirst = function() {
  return (0, import_rxjs.pipe)(windowwise(), (0, import_operators.filter)(function(_a) {
    var prior = _a[0], current = _a[1];
    return current.length > 0 || prior === void 0;
  }), (0, import_operators.map)(function(_a) {
    var current = _a[1];
    return current;
  }));
};
function collectionChanges(query3, options) {
  if (options === void 0) {
    options = {};
  }
  return fromRef(query3, {
    includeMetadataChanges: true
  }).pipe(windowwise(), (0, import_operators.map)(function(_a) {
    var priorSnapshot = _a[0], currentSnapshot = _a[1];
    var docChanges = currentSnapshot.docChanges();
    if (priorSnapshot && !metaDataEquals(priorSnapshot, currentSnapshot)) {
      currentSnapshot.docs.forEach(function(currentDocSnapshot, currentIndex) {
        var currentDocChange = docChanges.find(function(c) {
          return refEqual(c.doc.ref, currentDocSnapshot.ref);
        });
        if (currentDocChange) {
          if (metaDataEquals(currentDocChange.doc, currentDocSnapshot)) {
            return;
          }
        } else {
          var priorDocSnapshot = priorSnapshot === null || priorSnapshot === void 0 ? void 0 : priorSnapshot.docs.find(function(d) {
            return refEqual(d.ref, currentDocSnapshot.ref);
          });
          if (priorDocSnapshot && metaDataEquals(priorDocSnapshot, currentDocSnapshot)) {
            return;
          }
        }
        docChanges.push({
          oldIndex: currentIndex,
          newIndex: currentIndex,
          type: "modified",
          doc: currentDocSnapshot
        });
      });
    }
    return docChanges;
  }), filterEvents(options.events || ALL_EVENTS), filterEmptyUnlessFirst());
}
function collection(query3) {
  return fromRef(query3, {
    includeMetadataChanges: true
  }).pipe((0, import_operators.map)(function(changes) {
    return changes.docs;
  }));
}
function sortedChanges(query3, options) {
  if (options === void 0) {
    options = {};
  }
  return collectionChanges(query3, options).pipe((0, import_operators.scan)(function(current, changes) {
    return processDocumentChanges(current, changes, options.events);
  }, []), (0, import_operators.distinctUntilChanged)());
}
function auditTrail(query3, options) {
  if (options === void 0) {
    options = {};
  }
  return collectionChanges(query3, options).pipe((0, import_operators.scan)(function(current, action) {
    return __spreadArray(__spreadArray([], current, true), action, true);
  }, []));
}
function collectionData(query3, options) {
  if (options === void 0) {
    options = {};
  }
  return collection(query3).pipe((0, import_operators.map)(function(arr) {
    return arr.map(function(snap) {
      return snapToData(snap, options);
    });
  }));
}
function collectionCountSnap(query3) {
  return (0, import_rxjs.from)(getCountFromServer(query3));
}
function collectionCount(query3) {
  return collectionCountSnap(query3).pipe((0, import_operators.map)(function(snap) {
    return snap.data().count;
  }));
}

// node_modules/@angular/fire/node_modules/@firebase/firestore/dist/index.node.mjs
import { inspect, TextEncoder, TextDecoder } from "util";
import { randomBytes as randomBytes$1 } from "crypto";

// node_modules/@angular/fire/node_modules/@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var bloom_blob_es2018 = {};
var Integer;
var Md5;
(function() {
  var h;
  function k(f, a) {
    function c() {
    }
    c.prototype = a.prototype;
    f.D = a.prototype;
    f.prototype = new c();
    f.prototype.constructor = f;
    f.C = function(d, e, g) {
      for (var b = Array(arguments.length - 2), r = 2; r < arguments.length; r++) b[r - 2] = arguments[r];
      return a.prototype[e].apply(d, b);
    };
  }
  function l() {
    this.blockSize = -1;
  }
  function m() {
    this.blockSize = -1;
    this.blockSize = 64;
    this.g = Array(4);
    this.B = Array(this.blockSize);
    this.o = this.h = 0;
    this.s();
  }
  k(m, l);
  m.prototype.s = function() {
    this.g[0] = 1732584193;
    this.g[1] = 4023233417;
    this.g[2] = 2562383102;
    this.g[3] = 271733878;
    this.o = this.h = 0;
  };
  function n(f, a, c) {
    c || (c = 0);
    var d = Array(16);
    if ("string" === typeof a) for (var e = 0; 16 > e; ++e) d[e] = a.charCodeAt(c++) | a.charCodeAt(c++) << 8 | a.charCodeAt(c++) << 16 | a.charCodeAt(c++) << 24;
    else for (e = 0; 16 > e; ++e) d[e] = a[c++] | a[c++] << 8 | a[c++] << 16 | a[c++] << 24;
    a = f.g[0];
    c = f.g[1];
    e = f.g[2];
    var g = f.g[3];
    var b = a + (g ^ c & (e ^ g)) + d[0] + 3614090360 & 4294967295;
    a = c + (b << 7 & 4294967295 | b >>> 25);
    b = g + (e ^ a & (c ^ e)) + d[1] + 3905402710 & 4294967295;
    g = a + (b << 12 & 4294967295 | b >>> 20);
    b = e + (c ^ g & (a ^ c)) + d[2] + 606105819 & 4294967295;
    e = g + (b << 17 & 4294967295 | b >>> 15);
    b = c + (a ^ e & (g ^ a)) + d[3] + 3250441966 & 4294967295;
    c = e + (b << 22 & 4294967295 | b >>> 10);
    b = a + (g ^ c & (e ^ g)) + d[4] + 4118548399 & 4294967295;
    a = c + (b << 7 & 4294967295 | b >>> 25);
    b = g + (e ^ a & (c ^ e)) + d[5] + 1200080426 & 4294967295;
    g = a + (b << 12 & 4294967295 | b >>> 20);
    b = e + (c ^ g & (a ^ c)) + d[6] + 2821735955 & 4294967295;
    e = g + (b << 17 & 4294967295 | b >>> 15);
    b = c + (a ^ e & (g ^ a)) + d[7] + 4249261313 & 4294967295;
    c = e + (b << 22 & 4294967295 | b >>> 10);
    b = a + (g ^ c & (e ^ g)) + d[8] + 1770035416 & 4294967295;
    a = c + (b << 7 & 4294967295 | b >>> 25);
    b = g + (e ^ a & (c ^ e)) + d[9] + 2336552879 & 4294967295;
    g = a + (b << 12 & 4294967295 | b >>> 20);
    b = e + (c ^ g & (a ^ c)) + d[10] + 4294925233 & 4294967295;
    e = g + (b << 17 & 4294967295 | b >>> 15);
    b = c + (a ^ e & (g ^ a)) + d[11] + 2304563134 & 4294967295;
    c = e + (b << 22 & 4294967295 | b >>> 10);
    b = a + (g ^ c & (e ^ g)) + d[12] + 1804603682 & 4294967295;
    a = c + (b << 7 & 4294967295 | b >>> 25);
    b = g + (e ^ a & (c ^ e)) + d[13] + 4254626195 & 4294967295;
    g = a + (b << 12 & 4294967295 | b >>> 20);
    b = e + (c ^ g & (a ^ c)) + d[14] + 2792965006 & 4294967295;
    e = g + (b << 17 & 4294967295 | b >>> 15);
    b = c + (a ^ e & (g ^ a)) + d[15] + 1236535329 & 4294967295;
    c = e + (b << 22 & 4294967295 | b >>> 10);
    b = a + (e ^ g & (c ^ e)) + d[1] + 4129170786 & 4294967295;
    a = c + (b << 5 & 4294967295 | b >>> 27);
    b = g + (c ^ e & (a ^ c)) + d[6] + 3225465664 & 4294967295;
    g = a + (b << 9 & 4294967295 | b >>> 23);
    b = e + (a ^ c & (g ^ a)) + d[11] + 643717713 & 4294967295;
    e = g + (b << 14 & 4294967295 | b >>> 18);
    b = c + (g ^ a & (e ^ g)) + d[0] + 3921069994 & 4294967295;
    c = e + (b << 20 & 4294967295 | b >>> 12);
    b = a + (e ^ g & (c ^ e)) + d[5] + 3593408605 & 4294967295;
    a = c + (b << 5 & 4294967295 | b >>> 27);
    b = g + (c ^ e & (a ^ c)) + d[10] + 38016083 & 4294967295;
    g = a + (b << 9 & 4294967295 | b >>> 23);
    b = e + (a ^ c & (g ^ a)) + d[15] + 3634488961 & 4294967295;
    e = g + (b << 14 & 4294967295 | b >>> 18);
    b = c + (g ^ a & (e ^ g)) + d[4] + 3889429448 & 4294967295;
    c = e + (b << 20 & 4294967295 | b >>> 12);
    b = a + (e ^ g & (c ^ e)) + d[9] + 568446438 & 4294967295;
    a = c + (b << 5 & 4294967295 | b >>> 27);
    b = g + (c ^ e & (a ^ c)) + d[14] + 3275163606 & 4294967295;
    g = a + (b << 9 & 4294967295 | b >>> 23);
    b = e + (a ^ c & (g ^ a)) + d[3] + 4107603335 & 4294967295;
    e = g + (b << 14 & 4294967295 | b >>> 18);
    b = c + (g ^ a & (e ^ g)) + d[8] + 1163531501 & 4294967295;
    c = e + (b << 20 & 4294967295 | b >>> 12);
    b = a + (e ^ g & (c ^ e)) + d[13] + 2850285829 & 4294967295;
    a = c + (b << 5 & 4294967295 | b >>> 27);
    b = g + (c ^ e & (a ^ c)) + d[2] + 4243563512 & 4294967295;
    g = a + (b << 9 & 4294967295 | b >>> 23);
    b = e + (a ^ c & (g ^ a)) + d[7] + 1735328473 & 4294967295;
    e = g + (b << 14 & 4294967295 | b >>> 18);
    b = c + (g ^ a & (e ^ g)) + d[12] + 2368359562 & 4294967295;
    c = e + (b << 20 & 4294967295 | b >>> 12);
    b = a + (c ^ e ^ g) + d[5] + 4294588738 & 4294967295;
    a = c + (b << 4 & 4294967295 | b >>> 28);
    b = g + (a ^ c ^ e) + d[8] + 2272392833 & 4294967295;
    g = a + (b << 11 & 4294967295 | b >>> 21);
    b = e + (g ^ a ^ c) + d[11] + 1839030562 & 4294967295;
    e = g + (b << 16 & 4294967295 | b >>> 16);
    b = c + (e ^ g ^ a) + d[14] + 4259657740 & 4294967295;
    c = e + (b << 23 & 4294967295 | b >>> 9);
    b = a + (c ^ e ^ g) + d[1] + 2763975236 & 4294967295;
    a = c + (b << 4 & 4294967295 | b >>> 28);
    b = g + (a ^ c ^ e) + d[4] + 1272893353 & 4294967295;
    g = a + (b << 11 & 4294967295 | b >>> 21);
    b = e + (g ^ a ^ c) + d[7] + 4139469664 & 4294967295;
    e = g + (b << 16 & 4294967295 | b >>> 16);
    b = c + (e ^ g ^ a) + d[10] + 3200236656 & 4294967295;
    c = e + (b << 23 & 4294967295 | b >>> 9);
    b = a + (c ^ e ^ g) + d[13] + 681279174 & 4294967295;
    a = c + (b << 4 & 4294967295 | b >>> 28);
    b = g + (a ^ c ^ e) + d[0] + 3936430074 & 4294967295;
    g = a + (b << 11 & 4294967295 | b >>> 21);
    b = e + (g ^ a ^ c) + d[3] + 3572445317 & 4294967295;
    e = g + (b << 16 & 4294967295 | b >>> 16);
    b = c + (e ^ g ^ a) + d[6] + 76029189 & 4294967295;
    c = e + (b << 23 & 4294967295 | b >>> 9);
    b = a + (c ^ e ^ g) + d[9] + 3654602809 & 4294967295;
    a = c + (b << 4 & 4294967295 | b >>> 28);
    b = g + (a ^ c ^ e) + d[12] + 3873151461 & 4294967295;
    g = a + (b << 11 & 4294967295 | b >>> 21);
    b = e + (g ^ a ^ c) + d[15] + 530742520 & 4294967295;
    e = g + (b << 16 & 4294967295 | b >>> 16);
    b = c + (e ^ g ^ a) + d[2] + 3299628645 & 4294967295;
    c = e + (b << 23 & 4294967295 | b >>> 9);
    b = a + (e ^ (c | ~g)) + d[0] + 4096336452 & 4294967295;
    a = c + (b << 6 & 4294967295 | b >>> 26);
    b = g + (c ^ (a | ~e)) + d[7] + 1126891415 & 4294967295;
    g = a + (b << 10 & 4294967295 | b >>> 22);
    b = e + (a ^ (g | ~c)) + d[14] + 2878612391 & 4294967295;
    e = g + (b << 15 & 4294967295 | b >>> 17);
    b = c + (g ^ (e | ~a)) + d[5] + 4237533241 & 4294967295;
    c = e + (b << 21 & 4294967295 | b >>> 11);
    b = a + (e ^ (c | ~g)) + d[12] + 1700485571 & 4294967295;
    a = c + (b << 6 & 4294967295 | b >>> 26);
    b = g + (c ^ (a | ~e)) + d[3] + 2399980690 & 4294967295;
    g = a + (b << 10 & 4294967295 | b >>> 22);
    b = e + (a ^ (g | ~c)) + d[10] + 4293915773 & 4294967295;
    e = g + (b << 15 & 4294967295 | b >>> 17);
    b = c + (g ^ (e | ~a)) + d[1] + 2240044497 & 4294967295;
    c = e + (b << 21 & 4294967295 | b >>> 11);
    b = a + (e ^ (c | ~g)) + d[8] + 1873313359 & 4294967295;
    a = c + (b << 6 & 4294967295 | b >>> 26);
    b = g + (c ^ (a | ~e)) + d[15] + 4264355552 & 4294967295;
    g = a + (b << 10 & 4294967295 | b >>> 22);
    b = e + (a ^ (g | ~c)) + d[6] + 2734768916 & 4294967295;
    e = g + (b << 15 & 4294967295 | b >>> 17);
    b = c + (g ^ (e | ~a)) + d[13] + 1309151649 & 4294967295;
    c = e + (b << 21 & 4294967295 | b >>> 11);
    b = a + (e ^ (c | ~g)) + d[4] + 4149444226 & 4294967295;
    a = c + (b << 6 & 4294967295 | b >>> 26);
    b = g + (c ^ (a | ~e)) + d[11] + 3174756917 & 4294967295;
    g = a + (b << 10 & 4294967295 | b >>> 22);
    b = e + (a ^ (g | ~c)) + d[2] + 718787259 & 4294967295;
    e = g + (b << 15 & 4294967295 | b >>> 17);
    b = c + (g ^ (e | ~a)) + d[9] + 3951481745 & 4294967295;
    f.g[0] = f.g[0] + a & 4294967295;
    f.g[1] = f.g[1] + (e + (b << 21 & 4294967295 | b >>> 11)) & 4294967295;
    f.g[2] = f.g[2] + e & 4294967295;
    f.g[3] = f.g[3] + g & 4294967295;
  }
  m.prototype.u = function(f, a) {
    void 0 === a && (a = f.length);
    for (var c = a - this.blockSize, d = this.B, e = this.h, g = 0; g < a; ) {
      if (0 == e) for (; g <= c; ) n(this, f, g), g += this.blockSize;
      if ("string" === typeof f) for (; g < a; ) {
        if (d[e++] = f.charCodeAt(g++), e == this.blockSize) {
          n(this, d);
          e = 0;
          break;
        }
      }
      else for (; g < a; ) if (d[e++] = f[g++], e == this.blockSize) {
        n(this, d);
        e = 0;
        break;
      }
    }
    this.h = e;
    this.o += a;
  };
  m.prototype.v = function() {
    var f = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
    f[0] = 128;
    for (var a = 1; a < f.length - 8; ++a) f[a] = 0;
    var c = 8 * this.o;
    for (a = f.length - 8; a < f.length; ++a) f[a] = c & 255, c /= 256;
    this.u(f);
    f = Array(16);
    for (a = c = 0; 4 > a; ++a) for (var d = 0; 32 > d; d += 8) f[c++] = this.g[a] >>> d & 255;
    return f;
  };
  function p(f, a) {
    var c = q;
    return Object.prototype.hasOwnProperty.call(c, f) ? c[f] : c[f] = a(f);
  }
  function t(f, a) {
    this.h = a;
    for (var c = [], d = true, e = f.length - 1; 0 <= e; e--) {
      var g = f[e] | 0;
      d && g == a || (c[e] = g, d = false);
    }
    this.g = c;
  }
  var q = {};
  function u(f) {
    return -128 <= f && 128 > f ? p(f, function(a) {
      return new t([a | 0], 0 > a ? -1 : 0);
    }) : new t([f | 0], 0 > f ? -1 : 0);
  }
  function v(f) {
    if (isNaN(f) || !isFinite(f)) return w;
    if (0 > f) return x(v(-f));
    for (var a = [], c = 1, d = 0; f >= c; d++) a[d] = f / c | 0, c *= 4294967296;
    return new t(a, 0);
  }
  function y(f, a) {
    if (0 == f.length) throw Error("number format error: empty string");
    a = a || 10;
    if (2 > a || 36 < a) throw Error("radix out of range: " + a);
    if ("-" == f.charAt(0)) return x(y(f.substring(1), a));
    if (0 <= f.indexOf("-")) throw Error('number format error: interior "-" character');
    for (var c = v(Math.pow(a, 8)), d = w, e = 0; e < f.length; e += 8) {
      var g = Math.min(8, f.length - e), b = parseInt(f.substring(e, e + g), a);
      8 > g ? (g = v(Math.pow(a, g)), d = d.j(g).add(v(b))) : (d = d.j(c), d = d.add(v(b)));
    }
    return d;
  }
  var w = u(0), z = u(1), A = u(16777216);
  h = t.prototype;
  h.m = function() {
    if (B(this)) return -x(this).m();
    for (var f = 0, a = 1, c = 0; c < this.g.length; c++) {
      var d = this.i(c);
      f += (0 <= d ? d : 4294967296 + d) * a;
      a *= 4294967296;
    }
    return f;
  };
  h.toString = function(f) {
    f = f || 10;
    if (2 > f || 36 < f) throw Error("radix out of range: " + f);
    if (C(this)) return "0";
    if (B(this)) return "-" + x(this).toString(f);
    for (var a = v(Math.pow(f, 6)), c = this, d = ""; ; ) {
      var e = D(c, a).g;
      c = F(c, e.j(a));
      var g = ((0 < c.g.length ? c.g[0] : c.h) >>> 0).toString(f);
      c = e;
      if (C(c)) return g + d;
      for (; 6 > g.length; ) g = "0" + g;
      d = g + d;
    }
  };
  h.i = function(f) {
    return 0 > f ? 0 : f < this.g.length ? this.g[f] : this.h;
  };
  function C(f) {
    if (0 != f.h) return false;
    for (var a = 0; a < f.g.length; a++) if (0 != f.g[a]) return false;
    return true;
  }
  function B(f) {
    return -1 == f.h;
  }
  h.l = function(f) {
    f = F(this, f);
    return B(f) ? -1 : C(f) ? 0 : 1;
  };
  function x(f) {
    for (var a = f.g.length, c = [], d = 0; d < a; d++) c[d] = ~f.g[d];
    return new t(c, ~f.h).add(z);
  }
  h.abs = function() {
    return B(this) ? x(this) : this;
  };
  h.add = function(f) {
    for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0, e = 0; e <= a; e++) {
      var g = d + (this.i(e) & 65535) + (f.i(e) & 65535), b = (g >>> 16) + (this.i(e) >>> 16) + (f.i(e) >>> 16);
      d = b >>> 16;
      g &= 65535;
      b &= 65535;
      c[e] = b << 16 | g;
    }
    return new t(c, c[c.length - 1] & -2147483648 ? -1 : 0);
  };
  function F(f, a) {
    return f.add(x(a));
  }
  h.j = function(f) {
    if (C(this) || C(f)) return w;
    if (B(this)) return B(f) ? x(this).j(x(f)) : x(x(this).j(f));
    if (B(f)) return x(this.j(x(f)));
    if (0 > this.l(A) && 0 > f.l(A)) return v(this.m() * f.m());
    for (var a = this.g.length + f.g.length, c = [], d = 0; d < 2 * a; d++) c[d] = 0;
    for (d = 0; d < this.g.length; d++) for (var e = 0; e < f.g.length; e++) {
      var g = this.i(d) >>> 16, b = this.i(d) & 65535, r = f.i(e) >>> 16, E = f.i(e) & 65535;
      c[2 * d + 2 * e] += b * E;
      G(c, 2 * d + 2 * e);
      c[2 * d + 2 * e + 1] += g * E;
      G(c, 2 * d + 2 * e + 1);
      c[2 * d + 2 * e + 1] += b * r;
      G(c, 2 * d + 2 * e + 1);
      c[2 * d + 2 * e + 2] += g * r;
      G(c, 2 * d + 2 * e + 2);
    }
    for (d = 0; d < a; d++) c[d] = c[2 * d + 1] << 16 | c[2 * d];
    for (d = a; d < 2 * a; d++) c[d] = 0;
    return new t(c, 0);
  };
  function G(f, a) {
    for (; (f[a] & 65535) != f[a]; ) f[a + 1] += f[a] >>> 16, f[a] &= 65535, a++;
  }
  function H(f, a) {
    this.g = f;
    this.h = a;
  }
  function D(f, a) {
    if (C(a)) throw Error("division by zero");
    if (C(f)) return new H(w, w);
    if (B(f)) return a = D(x(f), a), new H(x(a.g), x(a.h));
    if (B(a)) return a = D(f, x(a)), new H(x(a.g), a.h);
    if (30 < f.g.length) {
      if (B(f) || B(a)) throw Error("slowDivide_ only works with positive integers.");
      for (var c = z, d = a; 0 >= d.l(f); ) c = I(c), d = I(d);
      var e = J(c, 1), g = J(d, 1);
      d = J(d, 2);
      for (c = J(c, 2); !C(d); ) {
        var b = g.add(d);
        0 >= b.l(f) && (e = e.add(c), g = b);
        d = J(d, 1);
        c = J(c, 1);
      }
      a = F(f, e.j(a));
      return new H(e, a);
    }
    for (e = w; 0 <= f.l(a); ) {
      c = Math.max(1, Math.floor(f.m() / a.m()));
      d = Math.ceil(Math.log(c) / Math.LN2);
      d = 48 >= d ? 1 : Math.pow(2, d - 48);
      g = v(c);
      for (b = g.j(a); B(b) || 0 < b.l(f); ) c -= d, g = v(c), b = g.j(a);
      C(g) && (g = z);
      e = e.add(g);
      f = F(f, b);
    }
    return new H(e, f);
  }
  h.A = function(f) {
    return D(this, f).h;
  };
  h.and = function(f) {
    for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) & f.i(d);
    return new t(c, this.h & f.h);
  };
  h.or = function(f) {
    for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) | f.i(d);
    return new t(c, this.h | f.h);
  };
  h.xor = function(f) {
    for (var a = Math.max(this.g.length, f.g.length), c = [], d = 0; d < a; d++) c[d] = this.i(d) ^ f.i(d);
    return new t(c, this.h ^ f.h);
  };
  function I(f) {
    for (var a = f.g.length + 1, c = [], d = 0; d < a; d++) c[d] = f.i(d) << 1 | f.i(d - 1) >>> 31;
    return new t(c, f.h);
  }
  function J(f, a) {
    var c = a >> 5;
    a %= 32;
    for (var d = f.g.length - c, e = [], g = 0; g < d; g++) e[g] = 0 < a ? f.i(g + c) >>> a | f.i(g + c + 1) << 32 - a : f.i(g + c);
    return new t(e, f.h);
  }
  m.prototype.digest = m.prototype.v;
  m.prototype.reset = m.prototype.s;
  m.prototype.update = m.prototype.u;
  Md5 = bloom_blob_es2018.Md5 = m;
  t.prototype.add = t.prototype.add;
  t.prototype.multiply = t.prototype.j;
  t.prototype.modulo = t.prototype.A;
  t.prototype.compare = t.prototype.l;
  t.prototype.toNumber = t.prototype.m;
  t.prototype.toString = t.prototype.toString;
  t.prototype.getBits = t.prototype.i;
  t.fromNumber = v;
  t.fromString = y;
  Integer = bloom_blob_es2018.Integer = t;
}).apply(typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

// node_modules/@angular/fire/node_modules/@firebase/firestore/dist/index.node.mjs
var grpc = __toESM(require_src2(), 1);
var protoLoader = __toESM(require_src(), 1);
var name = "@firebase/firestore";
var version$1 = "4.7.3";
var User = class {
  constructor(uid) {
    this.uid = uid;
  }
  isAuthenticated() {
    return this.uid != null;
  }
  /**
   * Returns a key representing this user, suitable for inclusion in a
   * dictionary.
   */
  toKey() {
    if (this.isAuthenticated()) {
      return "uid:" + this.uid;
    } else {
      return "anonymous-user";
    }
  }
  isEqual(otherUser) {
    return otherUser.uid === this.uid;
  }
};
User.UNAUTHENTICATED = new User(null);
User.GOOGLE_CREDENTIALS = new User("google-credentials-uid");
User.FIRST_PARTY = new User("first-party-uid");
User.MOCK_USER = new User("mock-user");
var version = "10.14.0";
var SDK_VERSION2 = version;
function setSDKVersion(version2) {
  SDK_VERSION2 = version2;
}
function formatJSON(value) {
  return inspect(value, {
    depth: 100
  });
}
var logClient = new Logger("@firebase/firestore");
function getLogLevel() {
  return logClient.logLevel;
}
function setLogLevel(logLevel) {
  logClient.setLogLevel(logLevel);
}
function logDebug(msg, ...obj) {
  if (logClient.logLevel <= LogLevel.DEBUG) {
    const args = obj.map(argToString);
    logClient.debug(`Firestore (${SDK_VERSION2}): ${msg}`, ...args);
  }
}
function logError(msg, ...obj) {
  if (logClient.logLevel <= LogLevel.ERROR) {
    const args = obj.map(argToString);
    logClient.error(`Firestore (${SDK_VERSION2}): ${msg}`, ...args);
  }
}
function logWarn(msg, ...obj) {
  if (logClient.logLevel <= LogLevel.WARN) {
    const args = obj.map(argToString);
    logClient.warn(`Firestore (${SDK_VERSION2}): ${msg}`, ...args);
  }
}
function argToString(obj) {
  if (typeof obj === "string") {
    return obj;
  } else {
    try {
      return formatJSON(obj);
    } catch (e) {
      return obj;
    }
  }
}
function fail(failure = "Unexpected state") {
  const message = `FIRESTORE (${SDK_VERSION2}) INTERNAL ASSERTION FAILED: ` + failure;
  logError(message);
  throw new Error(message);
}
function hardAssert(assertion, message) {
  if (!assertion) {
    fail();
  }
}
function debugAssert(assertion, message) {
  if (!assertion) {
    fail();
  }
}
function debugCast(obj, constructor) {
  return obj;
}
var Code = {
  // Causes are copied from:
  // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
  /** Not an error; returned on success. */
  OK: "ok",
  /** The operation was cancelled (typically by the caller). */
  CANCELLED: "cancelled",
  /** Unknown error or an error from a different error domain. */
  UNKNOWN: "unknown",
  /**
   * Client specified an invalid argument. Note that this differs from
   * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
   * problematic regardless of the state of the system (e.g., a malformed file
   * name).
   */
  INVALID_ARGUMENT: "invalid-argument",
  /**
   * Deadline expired before operation could complete. For operations that
   * change the state of the system, this error may be returned even if the
   * operation has completed successfully. For example, a successful response
   * from a server could have been delayed long enough for the deadline to
   * expire.
   */
  DEADLINE_EXCEEDED: "deadline-exceeded",
  /** Some requested entity (e.g., file or directory) was not found. */
  NOT_FOUND: "not-found",
  /**
   * Some entity that we attempted to create (e.g., file or directory) already
   * exists.
   */
  ALREADY_EXISTS: "already-exists",
  /**
   * The caller does not have permission to execute the specified operation.
   * PERMISSION_DENIED must not be used for rejections caused by exhausting
   * some resource (use RESOURCE_EXHAUSTED instead for those errors).
   * PERMISSION_DENIED must not be used if the caller cannot be identified
   * (use UNAUTHENTICATED instead for those errors).
   */
  PERMISSION_DENIED: "permission-denied",
  /**
   * The request does not have valid authentication credentials for the
   * operation.
   */
  UNAUTHENTICATED: "unauthenticated",
  /**
   * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
   * entire file system is out of space.
   */
  RESOURCE_EXHAUSTED: "resource-exhausted",
  /**
   * Operation was rejected because the system is not in a state required for
   * the operation's execution. For example, directory to be deleted may be
   * non-empty, an rmdir operation is applied to a non-directory, etc.
   *
   * A litmus test that may help a service implementor in deciding
   * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
   *  (a) Use UNAVAILABLE if the client can retry just the failing call.
   *  (b) Use ABORTED if the client should retry at a higher-level
   *      (e.g., restarting a read-modify-write sequence).
   *  (c) Use FAILED_PRECONDITION if the client should not retry until
   *      the system state has been explicitly fixed. E.g., if an "rmdir"
   *      fails because the directory is non-empty, FAILED_PRECONDITION
   *      should be returned since the client should not retry unless
   *      they have first fixed up the directory by deleting files from it.
   *  (d) Use FAILED_PRECONDITION if the client performs conditional
   *      REST Get/Update/Delete on a resource and the resource on the
   *      server does not match the condition. E.g., conflicting
   *      read-modify-write on the same resource.
   */
  FAILED_PRECONDITION: "failed-precondition",
  /**
   * The operation was aborted, typically due to a concurrency issue like
   * sequencer check failures, transaction aborts, etc.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  ABORTED: "aborted",
  /**
   * Operation was attempted past the valid range. E.g., seeking or reading
   * past end of file.
   *
   * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
   * if the system state changes. For example, a 32-bit file system will
   * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
   * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
   * an offset past the current file size.
   *
   * There is a fair bit of overlap between FAILED_PRECONDITION and
   * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
   * when it applies so that callers who are iterating through a space can
   * easily look for an OUT_OF_RANGE error to detect when they are done.
   */
  OUT_OF_RANGE: "out-of-range",
  /** Operation is not implemented or not supported/enabled in this service. */
  UNIMPLEMENTED: "unimplemented",
  /**
   * Internal errors. Means some invariants expected by underlying System has
   * been broken. If you see one of these errors, Something is very broken.
   */
  INTERNAL: "internal",
  /**
   * The service is currently unavailable. This is a most likely a transient
   * condition and may be corrected by retrying with a backoff.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  UNAVAILABLE: "unavailable",
  /** Unrecoverable data loss or corruption. */
  DATA_LOSS: "data-loss"
};
var FirestoreError = class extends FirebaseError {
  /** @hideconstructor */
  constructor(code, message) {
    super(code, message);
    this.code = code;
    this.message = message;
    this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
  }
};
var Deferred = class {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
var OAuthToken = class {
  constructor(value, user) {
    this.user = user;
    this.type = "OAuth";
    this.headers = /* @__PURE__ */ new Map();
    this.headers.set("Authorization", `Bearer ${value}`);
  }
};
var EmptyAuthCredentialsProvider = class {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {
  }
  start(asyncQueue, changeListener) {
    asyncQueue.enqueueRetryable(() => changeListener(User.UNAUTHENTICATED));
  }
  shutdown() {
  }
};
var EmulatorAuthCredentialsProvider = class {
  constructor(token) {
    this.token = token;
    this.changeListener = null;
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  invalidateToken() {
  }
  start(asyncQueue, changeListener) {
    this.changeListener = changeListener;
    asyncQueue.enqueueRetryable(() => changeListener(this.token.user));
  }
  shutdown() {
    this.changeListener = null;
  }
};
var FirebaseAuthCredentialsProvider = class {
  constructor(authProvider) {
    this.authProvider = authProvider;
    this.currentUser = User.UNAUTHENTICATED;
    this.tokenCounter = 0;
    this.forceRefresh = false;
    this.auth = null;
  }
  start(asyncQueue, changeListener) {
    hardAssert(this.tokenListener === void 0);
    let lastTokenId = this.tokenCounter;
    const guardedChangeListener = (user) => {
      if (this.tokenCounter !== lastTokenId) {
        lastTokenId = this.tokenCounter;
        return changeListener(user);
      } else {
        return Promise.resolve();
      }
    };
    let nextToken = new Deferred();
    this.tokenListener = () => {
      this.tokenCounter++;
      this.currentUser = this.getUser();
      nextToken.resolve();
      nextToken = new Deferred();
      asyncQueue.enqueueRetryable(() => guardedChangeListener(this.currentUser));
    };
    const awaitNextToken = () => {
      const currentTokenAttempt = nextToken;
      asyncQueue.enqueueRetryable(() => __async(this, null, function* () {
        yield currentTokenAttempt.promise;
        yield guardedChangeListener(this.currentUser);
      }));
    };
    const registerAuth = (auth) => {
      logDebug("FirebaseAuthCredentialsProvider", "Auth detected");
      this.auth = auth;
      if (this.tokenListener) {
        this.auth.addAuthTokenListener(this.tokenListener);
        awaitNextToken();
      }
    };
    this.authProvider.onInit((auth) => registerAuth(auth));
    setTimeout(() => {
      if (!this.auth) {
        const auth = this.authProvider.getImmediate({
          optional: true
        });
        if (auth) {
          registerAuth(auth);
        } else {
          logDebug("FirebaseAuthCredentialsProvider", "Auth not yet detected");
          nextToken.resolve();
          nextToken = new Deferred();
        }
      }
    }, 0);
    awaitNextToken();
  }
  getToken() {
    const initialTokenCounter = this.tokenCounter;
    const forceRefresh = this.forceRefresh;
    this.forceRefresh = false;
    if (!this.auth) {
      return Promise.resolve(null);
    }
    return this.auth.getToken(forceRefresh).then((tokenData) => {
      if (this.tokenCounter !== initialTokenCounter) {
        logDebug("FirebaseAuthCredentialsProvider", "getToken aborted due to token change.");
        return this.getToken();
      } else {
        if (tokenData) {
          hardAssert(typeof tokenData.accessToken === "string");
          return new OAuthToken(tokenData.accessToken, this.currentUser);
        } else {
          return null;
        }
      }
    });
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    if (this.auth && this.tokenListener) {
      this.auth.removeAuthTokenListener(this.tokenListener);
    }
    this.tokenListener = void 0;
  }
  // Auth.getUid() can return null even with a user logged in. It is because
  // getUid() is synchronous, but the auth code populating Uid is asynchronous.
  // This method should only be called in the AuthTokenListener callback
  // to guarantee to get the actual user.
  getUser() {
    const currentUid = this.auth && this.auth.getUid();
    hardAssert(currentUid === null || typeof currentUid === "string");
    return new User(currentUid);
  }
};
var FirstPartyToken = class {
  constructor(sessionIndex, iamToken, authTokenFactory) {
    this.sessionIndex = sessionIndex;
    this.iamToken = iamToken;
    this.authTokenFactory = authTokenFactory;
    this.type = "FirstParty";
    this.user = User.FIRST_PARTY;
    this._headers = /* @__PURE__ */ new Map();
  }
  /**
   * Gets an authorization token, using a provided factory function, or return
   * null.
   */
  getAuthToken() {
    if (this.authTokenFactory) {
      return this.authTokenFactory();
    } else {
      return null;
    }
  }
  get headers() {
    this._headers.set("X-Goog-AuthUser", this.sessionIndex);
    const authHeaderTokenValue = this.getAuthToken();
    if (authHeaderTokenValue) {
      this._headers.set("Authorization", authHeaderTokenValue);
    }
    if (this.iamToken) {
      this._headers.set("X-Goog-Iam-Authorization-Token", this.iamToken);
    }
    return this._headers;
  }
};
var FirstPartyAuthCredentialsProvider = class {
  constructor(sessionIndex, iamToken, authTokenFactory) {
    this.sessionIndex = sessionIndex;
    this.iamToken = iamToken;
    this.authTokenFactory = authTokenFactory;
  }
  getToken() {
    return Promise.resolve(new FirstPartyToken(this.sessionIndex, this.iamToken, this.authTokenFactory));
  }
  start(asyncQueue, changeListener) {
    asyncQueue.enqueueRetryable(() => changeListener(User.FIRST_PARTY));
  }
  shutdown() {
  }
  invalidateToken() {
  }
};
var AppCheckToken = class {
  constructor(value) {
    this.value = value;
    this.type = "AppCheck";
    this.headers = /* @__PURE__ */ new Map();
    if (value && value.length > 0) {
      this.headers.set("x-firebase-appcheck", this.value);
    }
  }
};
var FirebaseAppCheckTokenProvider = class {
  constructor(appCheckProvider) {
    this.appCheckProvider = appCheckProvider;
    this.forceRefresh = false;
    this.appCheck = null;
    this.latestAppCheckToken = null;
  }
  start(asyncQueue, changeListener) {
    hardAssert(this.tokenListener === void 0);
    const onTokenChanged = (tokenResult) => {
      if (tokenResult.error != null) {
        logDebug("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${tokenResult.error.message}`);
      }
      const tokenUpdated = tokenResult.token !== this.latestAppCheckToken;
      this.latestAppCheckToken = tokenResult.token;
      logDebug("FirebaseAppCheckTokenProvider", `Received ${tokenUpdated ? "new" : "existing"} token.`);
      return tokenUpdated ? changeListener(tokenResult.token) : Promise.resolve();
    };
    this.tokenListener = (tokenResult) => {
      asyncQueue.enqueueRetryable(() => onTokenChanged(tokenResult));
    };
    const registerAppCheck = (appCheck) => {
      logDebug("FirebaseAppCheckTokenProvider", "AppCheck detected");
      this.appCheck = appCheck;
      if (this.tokenListener) {
        this.appCheck.addTokenListener(this.tokenListener);
      }
    };
    this.appCheckProvider.onInit((appCheck) => registerAppCheck(appCheck));
    setTimeout(() => {
      if (!this.appCheck) {
        const appCheck = this.appCheckProvider.getImmediate({
          optional: true
        });
        if (appCheck) {
          registerAppCheck(appCheck);
        } else {
          logDebug("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
        }
      }
    }, 0);
  }
  getToken() {
    const forceRefresh = this.forceRefresh;
    this.forceRefresh = false;
    if (!this.appCheck) {
      return Promise.resolve(null);
    }
    return this.appCheck.getToken(forceRefresh).then((tokenResult) => {
      if (tokenResult) {
        hardAssert(typeof tokenResult.token === "string");
        this.latestAppCheckToken = tokenResult.token;
        return new AppCheckToken(tokenResult.token);
      } else {
        return null;
      }
    });
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    if (this.appCheck && this.tokenListener) {
      this.appCheck.removeTokenListener(this.tokenListener);
    }
    this.tokenListener = void 0;
  }
};
var EmptyAppCheckTokenProvider = class {
  getToken() {
    return Promise.resolve(new AppCheckToken(""));
  }
  invalidateToken() {
  }
  start(asyncQueue, changeListener) {
  }
  shutdown() {
  }
};
function makeAuthCredentialsProvider(credentials2) {
  if (!credentials2) {
    return new EmptyAuthCredentialsProvider();
  }
  switch (credentials2["type"]) {
    case "firstParty":
      return new FirstPartyAuthCredentialsProvider(credentials2["sessionIndex"] || "0", credentials2["iamToken"] || null, credentials2["authTokenFactory"] || null);
    case "provider":
      return credentials2["client"];
    default:
      throw new FirestoreError(Code.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
  }
}
function randomBytes(nBytes) {
  return randomBytes$1(nBytes);
}
var AutoId = class {
  static newId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const maxMultiple = Math.floor(256 / chars.length) * chars.length;
    let autoId = "";
    const targetLength = 20;
    while (autoId.length < targetLength) {
      const bytes = randomBytes(40);
      for (let i = 0; i < bytes.length; ++i) {
        if (autoId.length < targetLength && bytes[i] < maxMultiple) {
          autoId += chars.charAt(bytes[i] % chars.length);
        }
      }
    }
    return autoId;
  }
};
function primitiveComparator(left, right) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}
function arrayEquals(left, right, comparator) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value, index) => comparator(value, right[index]));
}
function immediateSuccessor(s) {
  return s + "\0";
}
var MIN_SECONDS = -62135596800;
var MS_TO_NANOS = 1e6;
var Timestamp = class _Timestamp {
  /**
   * Creates a new timestamp.
   *
   * @param seconds - The number of seconds of UTC time since Unix epoch
   *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   *     9999-12-31T23:59:59Z inclusive.
   * @param nanoseconds - The non-negative fractions of a second at nanosecond
   *     resolution. Negative second values with fractions must still have
   *     non-negative nanoseconds values that count forward in time. Must be
   *     from 0 to 999,999,999 inclusive.
   */
  constructor(seconds, nanoseconds) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
    if (nanoseconds < 0) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + nanoseconds);
    }
    if (nanoseconds >= 1e9) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + nanoseconds);
    }
    if (seconds < MIN_SECONDS) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp seconds out of range: " + seconds);
    }
    if (seconds >= 253402300800) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp seconds out of range: " + seconds);
    }
  }
  /**
   * Creates a new timestamp with the current date, with millisecond precision.
   *
   * @returns a new timestamp representing the current date.
   */
  static now() {
    return _Timestamp.fromMillis(Date.now());
  }
  /**
   * Creates a new timestamp from the given date.
   *
   * @param date - The date to initialize the `Timestamp` from.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     date.
   */
  static fromDate(date) {
    return _Timestamp.fromMillis(date.getTime());
  }
  /**
   * Creates a new timestamp from the given number of milliseconds.
   *
   * @param milliseconds - Number of milliseconds since Unix epoch
   *     1970-01-01T00:00:00Z.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     number of milliseconds.
   */
  static fromMillis(milliseconds) {
    const seconds = Math.floor(milliseconds / 1e3);
    const nanos = Math.floor((milliseconds - seconds * 1e3) * MS_TO_NANOS);
    return new _Timestamp(seconds, nanos);
  }
  /**
   * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
   * causes a loss of precision since `Date` objects only support millisecond
   * precision.
   *
   * @returns JavaScript `Date` object representing the same point in time as
   *     this `Timestamp`, with millisecond precision.
   */
  toDate() {
    return new Date(this.toMillis());
  }
  /**
   * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
   * epoch). This operation causes a loss of precision.
   *
   * @returns The point in time corresponding to this timestamp, represented as
   *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
   */
  toMillis() {
    return this.seconds * 1e3 + this.nanoseconds / MS_TO_NANOS;
  }
  _compareTo(other) {
    if (this.seconds === other.seconds) {
      return primitiveComparator(this.nanoseconds, other.nanoseconds);
    }
    return primitiveComparator(this.seconds, other.seconds);
  }
  /**
   * Returns true if this `Timestamp` is equal to the provided one.
   *
   * @param other - The `Timestamp` to compare against.
   * @returns true if this `Timestamp` is equal to the provided one.
   */
  isEqual(other) {
    return other.seconds === this.seconds && other.nanoseconds === this.nanoseconds;
  }
  /** Returns a textual representation of this `Timestamp`. */
  toString() {
    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
  }
  /** Returns a JSON-serializable representation of this `Timestamp`. */
  toJSON() {
    return {
      seconds: this.seconds,
      nanoseconds: this.nanoseconds
    };
  }
  /**
   * Converts this object to a primitive string, which allows `Timestamp` objects
   * to be compared using the `>`, `<=`, `>=` and `>` operators.
   */
  valueOf() {
    const adjustedSeconds = this.seconds - MIN_SECONDS;
    const formattedSeconds = String(adjustedSeconds).padStart(12, "0");
    const formattedNanoseconds = String(this.nanoseconds).padStart(9, "0");
    return formattedSeconds + "." + formattedNanoseconds;
  }
};
var SnapshotVersion = class _SnapshotVersion {
  constructor(timestamp) {
    this.timestamp = timestamp;
  }
  static fromTimestamp(value) {
    return new _SnapshotVersion(value);
  }
  static min() {
    return new _SnapshotVersion(new Timestamp(0, 0));
  }
  static max() {
    return new _SnapshotVersion(new Timestamp(253402300799, 1e9 - 1));
  }
  compareTo(other) {
    return this.timestamp._compareTo(other.timestamp);
  }
  isEqual(other) {
    return this.timestamp.isEqual(other.timestamp);
  }
  /** Returns a number representation of the version for use in spec tests. */
  toMicroseconds() {
    return this.timestamp.seconds * 1e6 + this.timestamp.nanoseconds / 1e3;
  }
  toString() {
    return "SnapshotVersion(" + this.timestamp.toString() + ")";
  }
  toTimestamp() {
    return this.timestamp;
  }
};
var DOCUMENT_KEY_NAME = "__name__";
var BasePath = class _BasePath {
  constructor(segments, offset, length) {
    if (offset === void 0) {
      offset = 0;
    } else if (offset > segments.length) {
      fail();
    }
    if (length === void 0) {
      length = segments.length - offset;
    } else if (length > segments.length - offset) {
      fail();
    }
    this.segments = segments;
    this.offset = offset;
    this.len = length;
  }
  get length() {
    return this.len;
  }
  isEqual(other) {
    return _BasePath.comparator(this, other) === 0;
  }
  child(nameOrPath) {
    const segments = this.segments.slice(this.offset, this.limit());
    if (nameOrPath instanceof _BasePath) {
      nameOrPath.forEach((segment) => {
        segments.push(segment);
      });
    } else {
      segments.push(nameOrPath);
    }
    return this.construct(segments);
  }
  /** The index of one past the last segment of the path. */
  limit() {
    return this.offset + this.length;
  }
  popFirst(size) {
    size = size === void 0 ? 1 : size;
    return this.construct(this.segments, this.offset + size, this.length - size);
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }
  firstSegment() {
    return this.segments[this.offset];
  }
  lastSegment() {
    return this.get(this.length - 1);
  }
  get(index) {
    return this.segments[this.offset + index];
  }
  isEmpty() {
    return this.length === 0;
  }
  isPrefixOf(other) {
    if (other.length < this.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (this.get(i) !== other.get(i)) {
        return false;
      }
    }
    return true;
  }
  isImmediateParentOf(potentialChild) {
    if (this.length + 1 !== potentialChild.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (this.get(i) !== potentialChild.get(i)) {
        return false;
      }
    }
    return true;
  }
  forEach(fn) {
    for (let i = this.offset, end = this.limit(); i < end; i++) {
      fn(this.segments[i]);
    }
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }
  static comparator(p1, p2) {
    const len = Math.min(p1.length, p2.length);
    for (let i = 0; i < len; i++) {
      const left = p1.get(i);
      const right = p2.get(i);
      if (left < right) {
        return -1;
      }
      if (left > right) {
        return 1;
      }
    }
    if (p1.length < p2.length) {
      return -1;
    }
    if (p1.length > p2.length) {
      return 1;
    }
    return 0;
  }
};
var ResourcePath = class _ResourcePath extends BasePath {
  construct(segments, offset, length) {
    return new _ResourcePath(segments, offset, length);
  }
  canonicalString() {
    return this.toArray().join("/");
  }
  toString() {
    return this.canonicalString();
  }
  /**
   * Returns a string representation of this path
   * where each path segment has been encoded with
   * `encodeURIComponent`.
   */
  toUriEncodedString() {
    return this.toArray().map(encodeURIComponent).join("/");
  }
  /**
   * Creates a resource path from the given slash-delimited string. If multiple
   * arguments are provided, all components are combined. Leading and trailing
   * slashes from all components are ignored.
   */
  static fromString(...pathComponents) {
    const segments = [];
    for (const path of pathComponents) {
      if (path.indexOf("//") >= 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid segment (${path}). Paths must not contain // in them.`);
      }
      segments.push(...path.split("/").filter((segment) => segment.length > 0));
    }
    return new _ResourcePath(segments);
  }
  static emptyPath() {
    return new _ResourcePath([]);
  }
};
var identifierRegExp = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
var FieldPath$1 = class _FieldPath$1 extends BasePath {
  construct(segments, offset, length) {
    return new _FieldPath$1(segments, offset, length);
  }
  /**
   * Returns true if the string could be used as a segment in a field path
   * without escaping.
   */
  static isValidIdentifier(segment) {
    return identifierRegExp.test(segment);
  }
  canonicalString() {
    return this.toArray().map((str) => {
      str = str.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
      if (!_FieldPath$1.isValidIdentifier(str)) {
        str = "`" + str + "`";
      }
      return str;
    }).join(".");
  }
  toString() {
    return this.canonicalString();
  }
  /**
   * Returns true if this field references the key of a document.
   */
  isKeyField() {
    return this.length === 1 && this.get(0) === DOCUMENT_KEY_NAME;
  }
  /**
   * The field designating the key of a document.
   */
  static keyField() {
    return new _FieldPath$1([DOCUMENT_KEY_NAME]);
  }
  /**
   * Parses a field string from the given server-formatted string.
   *
   * - Splitting the empty string is not allowed (for now at least).
   * - Empty segments within the string (e.g. if there are two consecutive
   *   separators) are not allowed.
   *
   * TODO(b/37244157): we should make this more strict. Right now, it allows
   * non-identifier path components, even if they aren't escaped.
   */
  static fromServerFormat(path) {
    const segments = [];
    let current = "";
    let i = 0;
    const addCurrentSegment = () => {
      if (current.length === 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid field path (${path}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
      }
      segments.push(current);
      current = "";
    };
    let inBackticks = false;
    while (i < path.length) {
      const c = path[i];
      if (c === "\\") {
        if (i + 1 === path.length) {
          throw new FirestoreError(Code.INVALID_ARGUMENT, "Path has trailing escape character: " + path);
        }
        const next = path[i + 1];
        if (!(next === "\\" || next === "." || next === "`")) {
          throw new FirestoreError(Code.INVALID_ARGUMENT, "Path has invalid escape sequence: " + path);
        }
        current += next;
        i += 2;
      } else if (c === "`") {
        inBackticks = !inBackticks;
        i++;
      } else if (c === "." && !inBackticks) {
        addCurrentSegment();
        i++;
      } else {
        current += c;
        i++;
      }
    }
    addCurrentSegment();
    if (inBackticks) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Unterminated ` in path: " + path);
    }
    return new _FieldPath$1(segments);
  }
  static emptyPath() {
    return new _FieldPath$1([]);
  }
};
var DocumentKey = class _DocumentKey {
  constructor(path) {
    this.path = path;
  }
  static fromPath(path) {
    return new _DocumentKey(ResourcePath.fromString(path));
  }
  static fromName(name2) {
    return new _DocumentKey(ResourcePath.fromString(name2).popFirst(5));
  }
  static empty() {
    return new _DocumentKey(ResourcePath.emptyPath());
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  /** Returns true if the document is in the specified collectionId. */
  hasCollectionId(collectionId) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === collectionId;
  }
  /** Returns the collection group (i.e. the name of the parent collection) for this key. */
  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  /** Returns the fully qualified path to the parent collection. */
  getCollectionPath() {
    return this.path.popLast();
  }
  isEqual(other) {
    return other !== null && ResourcePath.comparator(this.path, other.path) === 0;
  }
  toString() {
    return this.path.toString();
  }
  static comparator(k1, k2) {
    return ResourcePath.comparator(k1.path, k2.path);
  }
  static isDocumentKey(path) {
    return path.length % 2 === 0;
  }
  /**
   * Creates and returns a new document key with the given segments.
   *
   * @param segments - The segments of the path to the document
   * @returns A new instance of DocumentKey
   */
  static fromSegments(segments) {
    return new _DocumentKey(new ResourcePath(segments.slice()));
  }
};
var INITIAL_LARGEST_BATCH_ID = -1;
var INITIAL_SEQUENCE_NUMBER = 0;
var FieldIndex = class {
  constructor(indexId, collectionGroup3, fields, indexState) {
    this.indexId = indexId;
    this.collectionGroup = collectionGroup3;
    this.fields = fields;
    this.indexState = indexState;
  }
};
FieldIndex.UNKNOWN_ID = -1;
function fieldIndexGetArraySegment(fieldIndex) {
  return fieldIndex.fields.find(
    (s) => s.kind === 2
    /* IndexKind.CONTAINS */
  );
}
function fieldIndexGetDirectionalSegments(fieldIndex) {
  return fieldIndex.fields.filter(
    (s) => s.kind !== 2
    /* IndexKind.CONTAINS */
  );
}
function fieldIndexGetKeyOrder(fieldIndex) {
  const directionalSegments = fieldIndexGetDirectionalSegments(fieldIndex);
  return directionalSegments.length === 0 ? 0 : directionalSegments[directionalSegments.length - 1].kind;
}
function fieldIndexSemanticComparator(left, right) {
  let cmp = primitiveComparator(left.collectionGroup, right.collectionGroup);
  if (cmp !== 0) {
    return cmp;
  }
  for (let i = 0; i < Math.min(left.fields.length, right.fields.length); ++i) {
    cmp = indexSegmentComparator(left.fields[i], right.fields[i]);
    if (cmp !== 0) {
      return cmp;
    }
  }
  return primitiveComparator(left.fields.length, right.fields.length);
}
function fieldIndexToString(fieldIndex) {
  return `id=${fieldIndex.indexId}|cg=${fieldIndex.collectionGroup}|f=${fieldIndex.fields.map((f) => `${f.fieldPath}:${f.kind}`).join(",")}`;
}
var IndexSegment = class {
  constructor(fieldPath, kind) {
    this.fieldPath = fieldPath;
    this.kind = kind;
  }
};
function indexSegmentComparator(left, right) {
  const cmp = FieldPath$1.comparator(left.fieldPath, right.fieldPath);
  if (cmp !== 0) {
    return cmp;
  }
  return primitiveComparator(left.kind, right.kind);
}
var IndexState = class _IndexState {
  constructor(sequenceNumber, offset) {
    this.sequenceNumber = sequenceNumber;
    this.offset = offset;
  }
  /** The state of an index that has not yet been backfilled. */
  static empty() {
    return new _IndexState(INITIAL_SEQUENCE_NUMBER, IndexOffset.min());
  }
};
function newIndexOffsetSuccessorFromReadTime(readTime, largestBatchId) {
  const successorSeconds = readTime.toTimestamp().seconds;
  const successorNanos = readTime.toTimestamp().nanoseconds + 1;
  const successor = SnapshotVersion.fromTimestamp(successorNanos === 1e9 ? new Timestamp(successorSeconds + 1, 0) : new Timestamp(successorSeconds, successorNanos));
  return new IndexOffset(successor, DocumentKey.empty(), largestBatchId);
}
function newIndexOffsetFromDocument(document) {
  return new IndexOffset(document.readTime, document.key, INITIAL_LARGEST_BATCH_ID);
}
var IndexOffset = class _IndexOffset {
  constructor(readTime, documentKey, largestBatchId) {
    this.readTime = readTime;
    this.documentKey = documentKey;
    this.largestBatchId = largestBatchId;
  }
  /** Returns an offset that sorts before all regular offsets. */
  static min() {
    return new _IndexOffset(SnapshotVersion.min(), DocumentKey.empty(), INITIAL_LARGEST_BATCH_ID);
  }
  /** Returns an offset that sorts after all regular offsets. */
  static max() {
    return new _IndexOffset(SnapshotVersion.max(), DocumentKey.empty(), INITIAL_LARGEST_BATCH_ID);
  }
};
function indexOffsetComparator(left, right) {
  let cmp = left.readTime.compareTo(right.readTime);
  if (cmp !== 0) {
    return cmp;
  }
  cmp = DocumentKey.comparator(left.documentKey, right.documentKey);
  if (cmp !== 0) {
    return cmp;
  }
  return primitiveComparator(left.largestBatchId, right.largestBatchId);
}
var PRIMARY_LEASE_LOST_ERROR_MSG = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
var PersistenceTransaction = class {
  constructor() {
    this.onCommittedListeners = [];
  }
  addOnCommittedListener(listener) {
    this.onCommittedListeners.push(listener);
  }
  raiseOnCommittedEvent() {
    this.onCommittedListeners.forEach((listener) => listener());
  }
};
function ignoreIfPrimaryLeaseLoss(err) {
  return __async(this, null, function* () {
    if (err.code === Code.FAILED_PRECONDITION && err.message === PRIMARY_LEASE_LOST_ERROR_MSG) {
      logDebug("LocalStore", "Unexpectedly lost primary lease");
    } else {
      throw err;
    }
  });
}
var PersistencePromise = class _PersistencePromise {
  constructor(callback) {
    this.nextCallback = null;
    this.catchCallback = null;
    this.result = void 0;
    this.error = void 0;
    this.isDone = false;
    this.callbackAttached = false;
    callback((value) => {
      this.isDone = true;
      this.result = value;
      if (this.nextCallback) {
        this.nextCallback(value);
      }
    }, (error) => {
      this.isDone = true;
      this.error = error;
      if (this.catchCallback) {
        this.catchCallback(error);
      }
    });
  }
  catch(fn) {
    return this.next(void 0, fn);
  }
  next(nextFn, catchFn) {
    if (this.callbackAttached) {
      fail();
    }
    this.callbackAttached = true;
    if (this.isDone) {
      if (!this.error) {
        return this.wrapSuccess(nextFn, this.result);
      } else {
        return this.wrapFailure(catchFn, this.error);
      }
    } else {
      return new _PersistencePromise((resolve, reject) => {
        this.nextCallback = (value) => {
          this.wrapSuccess(nextFn, value).next(resolve, reject);
        };
        this.catchCallback = (error) => {
          this.wrapFailure(catchFn, error).next(resolve, reject);
        };
      });
    }
  }
  toPromise() {
    return new Promise((resolve, reject) => {
      this.next(resolve, reject);
    });
  }
  wrapUserFunction(fn) {
    try {
      const result = fn();
      if (result instanceof _PersistencePromise) {
        return result;
      } else {
        return _PersistencePromise.resolve(result);
      }
    } catch (e) {
      return _PersistencePromise.reject(e);
    }
  }
  wrapSuccess(nextFn, value) {
    if (nextFn) {
      return this.wrapUserFunction(() => nextFn(value));
    } else {
      return _PersistencePromise.resolve(value);
    }
  }
  wrapFailure(catchFn, error) {
    if (catchFn) {
      return this.wrapUserFunction(() => catchFn(error));
    } else {
      return _PersistencePromise.reject(error);
    }
  }
  static resolve(result) {
    return new _PersistencePromise((resolve, reject) => {
      resolve(result);
    });
  }
  static reject(error) {
    return new _PersistencePromise((resolve, reject) => {
      reject(error);
    });
  }
  static waitFor(all) {
    return new _PersistencePromise((resolve, reject) => {
      let expectedCount = 0;
      let resolvedCount = 0;
      let done = false;
      all.forEach((element) => {
        ++expectedCount;
        element.next(() => {
          ++resolvedCount;
          if (done && resolvedCount === expectedCount) {
            resolve();
          }
        }, (err) => reject(err));
      });
      done = true;
      if (resolvedCount === expectedCount) {
        resolve();
      }
    });
  }
  /**
   * Given an array of predicate functions that asynchronously evaluate to a
   * boolean, implements a short-circuiting `or` between the results. Predicates
   * will be evaluated until one of them returns `true`, then stop. The final
   * result will be whether any of them returned `true`.
   */
  static or(predicates) {
    let p = _PersistencePromise.resolve(false);
    for (const predicate of predicates) {
      p = p.next((isTrue) => {
        if (isTrue) {
          return _PersistencePromise.resolve(isTrue);
        } else {
          return predicate();
        }
      });
    }
    return p;
  }
  static forEach(collection4, f) {
    const promises = [];
    collection4.forEach((r, s) => {
      promises.push(f.call(this, r, s));
    });
    return this.waitFor(promises);
  }
  /**
   * Concurrently map all array elements through asynchronous function.
   */
  static mapArray(array, f) {
    return new _PersistencePromise((resolve, reject) => {
      const expectedCount = array.length;
      const results = new Array(expectedCount);
      let resolvedCount = 0;
      for (let i = 0; i < expectedCount; i++) {
        const current = i;
        f(array[current]).next((result) => {
          results[current] = result;
          ++resolvedCount;
          if (resolvedCount === expectedCount) {
            resolve(results);
          }
        }, (err) => reject(err));
      }
    });
  }
  /**
   * An alternative to recursive PersistencePromise calls, that avoids
   * potential memory problems from unbounded chains of promises.
   *
   * The `action` will be called repeatedly while `condition` is true.
   */
  static doWhile(condition, action) {
    return new _PersistencePromise((resolve, reject) => {
      const process2 = () => {
        if (condition() === true) {
          action().next(() => {
            process2();
          }, reject);
        } else {
          resolve();
        }
      };
      process2();
    });
  }
};
var LOG_TAG$i = "SimpleDb";
var TRANSACTION_RETRY_COUNT = 3;
var SimpleDbTransaction = class _SimpleDbTransaction {
  constructor(action, transaction) {
    this.action = action;
    this.transaction = transaction;
    this.aborted = false;
    this.completionDeferred = new Deferred();
    this.transaction.oncomplete = () => {
      this.completionDeferred.resolve();
    };
    this.transaction.onabort = () => {
      if (transaction.error) {
        this.completionDeferred.reject(new IndexedDbTransactionError(action, transaction.error));
      } else {
        this.completionDeferred.resolve();
      }
    };
    this.transaction.onerror = (event) => {
      const error = checkForAndReportiOSError(event.target.error);
      this.completionDeferred.reject(new IndexedDbTransactionError(action, error));
    };
  }
  static open(db, action, mode, objectStoreNames) {
    try {
      return new _SimpleDbTransaction(action, db.transaction(objectStoreNames, mode));
    } catch (e) {
      throw new IndexedDbTransactionError(action, e);
    }
  }
  get completionPromise() {
    return this.completionDeferred.promise;
  }
  abort(error) {
    if (error) {
      this.completionDeferred.reject(error);
    }
    if (!this.aborted) {
      logDebug(LOG_TAG$i, "Aborting transaction:", error ? error.message : "Client-initiated abort");
      this.aborted = true;
      this.transaction.abort();
    }
  }
  maybeCommit() {
    const maybeV3IndexedDb = this.transaction;
    if (!this.aborted && typeof maybeV3IndexedDb.commit === "function") {
      maybeV3IndexedDb.commit();
    }
  }
  /**
   * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
   * operations performed on the SimpleDbStore happen within the context of this
   * transaction and it cannot be used anymore once the transaction is
   * completed.
   *
   * Note that we can't actually enforce that the KeyType and ValueType are
   * correct, but they allow type safety through the rest of the consuming code.
   */
  store(storeName) {
    const store = this.transaction.objectStore(storeName);
    return new SimpleDbStore(store);
  }
};
var SimpleDb = class _SimpleDb {
  /*
   * Creates a new SimpleDb wrapper for IndexedDb database `name`.
   *
   * Note that `version` must not be a downgrade. IndexedDB does not support
   * downgrading the schema version. We currently do not support any way to do
   * versioning outside of IndexedDB's versioning mechanism, as only
   * version-upgrade transactions are allowed to do things like create
   * objectstores.
   */
  constructor(name2, version2, schemaConverter) {
    this.name = name2;
    this.version = version2;
    this.schemaConverter = schemaConverter;
    const iOSVersion = _SimpleDb.getIOSVersion(getUA());
    if (iOSVersion === 12.2) {
      logError("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
    }
  }
  /** Deletes the specified database. */
  static delete(name2) {
    logDebug(LOG_TAG$i, "Removing database:", name2);
    return wrapRequest(window.indexedDB.deleteDatabase(name2)).toPromise();
  }
  /** Returns true if IndexedDB is available in the current environment. */
  static isAvailable() {
    if (!isIndexedDBAvailable()) {
      return false;
    }
    if (_SimpleDb.isMockPersistence()) {
      return true;
    }
    const ua = getUA();
    const iOSVersion = _SimpleDb.getIOSVersion(ua);
    const isUnsupportedIOS = 0 < iOSVersion && iOSVersion < 10;
    const androidVersion = getAndroidVersion(ua);
    const isUnsupportedAndroid = 0 < androidVersion && androidVersion < 4.5;
    if (ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0 || ua.indexOf("Edge/") > 0 || isUnsupportedIOS || isUnsupportedAndroid) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * Returns true if the backing IndexedDB store is the Node IndexedDBShim
   * (see https://github.com/axemclion/IndexedDBShim).
   */
  static isMockPersistence() {
    var _a;
    return typeof process !== "undefined" && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.USE_MOCK_PERSISTENCE) === "YES";
  }
  /** Helper to get a typed SimpleDbStore from a transaction. */
  static getStore(txn, store) {
    return txn.store(store);
  }
  // visible for testing
  /** Parse User Agent to determine iOS version. Returns -1 if not found. */
  static getIOSVersion(ua) {
    const iOSVersionRegex = ua.match(/i(?:phone|pad|pod) os ([\d_]+)/i);
    const version2 = iOSVersionRegex ? iOSVersionRegex[1].split("_").slice(0, 2).join(".") : "-1";
    return Number(version2);
  }
  /**
   * Opens the specified database, creating or upgrading it if necessary.
   */
  ensureDb(action) {
    return __async(this, null, function* () {
      if (!this.db) {
        logDebug(LOG_TAG$i, "Opening database:", this.name);
        this.db = yield new Promise((resolve, reject) => {
          const request = indexedDB.open(this.name, this.version);
          request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
          };
          request.onblocked = () => {
            reject(new IndexedDbTransactionError(action, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
          };
          request.onerror = (event) => {
            const error = event.target.error;
            if (error.name === "VersionError") {
              reject(new FirestoreError(Code.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh."));
            } else if (error.name === "InvalidStateError") {
              reject(new FirestoreError(Code.FAILED_PRECONDITION, "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " + error));
            } else {
              reject(new IndexedDbTransactionError(action, error));
            }
          };
          request.onupgradeneeded = (event) => {
            logDebug(LOG_TAG$i, 'Database "' + this.name + '" requires upgrade from version:', event.oldVersion);
            const db = event.target.result;
            this.schemaConverter.createOrUpgrade(db, request.transaction, event.oldVersion, this.version).next(() => {
              logDebug(LOG_TAG$i, "Database upgrade to version " + this.version + " complete");
            });
          };
        });
      }
      if (this.versionchangelistener) {
        this.db.onversionchange = (event) => this.versionchangelistener(event);
      }
      return this.db;
    });
  }
  setVersionChangeListener(versionChangeListener) {
    this.versionchangelistener = versionChangeListener;
    if (this.db) {
      this.db.onversionchange = (event) => {
        return versionChangeListener(event);
      };
    }
  }
  runTransaction(action, mode, objectStores, transactionFn) {
    return __async(this, null, function* () {
      const readonly = mode === "readonly";
      let attemptNumber = 0;
      while (true) {
        ++attemptNumber;
        try {
          this.db = yield this.ensureDb(action);
          const transaction = SimpleDbTransaction.open(this.db, action, readonly ? "readonly" : "readwrite", objectStores);
          const transactionFnResult = transactionFn(transaction).next((result) => {
            transaction.maybeCommit();
            return result;
          }).catch((error) => {
            transaction.abort(error);
            return PersistencePromise.reject(error);
          }).toPromise();
          transactionFnResult.catch(() => {
          });
          yield transaction.completionPromise;
          return transactionFnResult;
        } catch (e) {
          const error = e;
          const retryable = error.name !== "FirebaseError" && attemptNumber < TRANSACTION_RETRY_COUNT;
          logDebug(LOG_TAG$i, "Transaction failed with error:", error.message, "Retrying:", retryable);
          this.close();
          if (!retryable) {
            return Promise.reject(error);
          }
        }
      }
    });
  }
  close() {
    if (this.db) {
      this.db.close();
    }
    this.db = void 0;
  }
};
function getAndroidVersion(ua) {
  const androidVersionRegex = ua.match(/Android ([\d.]+)/i);
  const version2 = androidVersionRegex ? androidVersionRegex[1].split(".").slice(0, 2).join(".") : "-1";
  return Number(version2);
}
var IterationController = class {
  constructor(dbCursor) {
    this.dbCursor = dbCursor;
    this.shouldStop = false;
    this.nextKey = null;
  }
  get isDone() {
    return this.shouldStop;
  }
  get skipToKey() {
    return this.nextKey;
  }
  set cursor(value) {
    this.dbCursor = value;
  }
  /**
   * This function can be called to stop iteration at any point.
   */
  done() {
    this.shouldStop = true;
  }
  /**
   * This function can be called to skip to that next key, which could be
   * an index or a primary key.
   */
  skip(key) {
    this.nextKey = key;
  }
  /**
   * Delete the current cursor value from the object store.
   *
   * NOTE: You CANNOT do this with a keysOnly query.
   */
  delete() {
    return wrapRequest(this.dbCursor.delete());
  }
};
var IndexedDbTransactionError = class extends FirestoreError {
  constructor(actionName, cause) {
    super(Code.UNAVAILABLE, `IndexedDB transaction '${actionName}' failed: ${cause}`);
    this.name = "IndexedDbTransactionError";
  }
};
function isIndexedDbTransactionError(e) {
  return e.name === "IndexedDbTransactionError";
}
var SimpleDbStore = class {
  constructor(store) {
    this.store = store;
  }
  put(keyOrValue, value) {
    let request;
    if (value !== void 0) {
      logDebug(LOG_TAG$i, "PUT", this.store.name, keyOrValue, value);
      request = this.store.put(value, keyOrValue);
    } else {
      logDebug(LOG_TAG$i, "PUT", this.store.name, "<auto-key>", keyOrValue);
      request = this.store.put(keyOrValue);
    }
    return wrapRequest(request);
  }
  /**
   * Adds a new value into an Object Store and returns the new key. Similar to
   * IndexedDb's `add()`, this method will fail on primary key collisions.
   *
   * @param value - The object to write.
   * @returns The key of the value to add.
   */
  add(value) {
    logDebug(LOG_TAG$i, "ADD", this.store.name, value, value);
    const request = this.store.add(value);
    return wrapRequest(request);
  }
  /**
   * Gets the object with the specified key from the specified store, or null
   * if no object exists with the specified key.
   *
   * @key The key of the object to get.
   * @returns The object with the specified key or null if no object exists.
   */
  get(key) {
    const request = this.store.get(key);
    return wrapRequest(request).next((result) => {
      if (result === void 0) {
        result = null;
      }
      logDebug(LOG_TAG$i, "GET", this.store.name, key, result);
      return result;
    });
  }
  delete(key) {
    logDebug(LOG_TAG$i, "DELETE", this.store.name, key);
    const request = this.store.delete(key);
    return wrapRequest(request);
  }
  /**
   * If we ever need more of the count variants, we can add overloads. For now,
   * all we need is to count everything in a store.
   *
   * Returns the number of rows in the store.
   */
  count() {
    logDebug(LOG_TAG$i, "COUNT", this.store.name);
    const request = this.store.count();
    return wrapRequest(request);
  }
  loadAll(indexOrRange, range) {
    const iterateOptions = this.options(indexOrRange, range);
    const store = iterateOptions.index ? this.store.index(iterateOptions.index) : this.store;
    if (typeof store.getAll === "function") {
      const request = store.getAll(iterateOptions.range);
      return new PersistencePromise((resolve, reject) => {
        request.onerror = (event) => {
          reject(event.target.error);
        };
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
      });
    } else {
      const cursor = this.cursor(iterateOptions);
      const results = [];
      return this.iterateCursor(cursor, (key, value) => {
        results.push(value);
      }).next(() => {
        return results;
      });
    }
  }
  /**
   * Loads the first `count` elements from the provided index range. Loads all
   * elements if no limit is provided.
   */
  loadFirst(range, count3) {
    const request = this.store.getAll(range, count3 === null ? void 0 : count3);
    return new PersistencePromise((resolve, reject) => {
      request.onerror = (event) => {
        reject(event.target.error);
      };
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }
  deleteAll(indexOrRange, range) {
    logDebug(LOG_TAG$i, "DELETE ALL", this.store.name);
    const options = this.options(indexOrRange, range);
    options.keysOnly = false;
    const cursor = this.cursor(options);
    return this.iterateCursor(cursor, (key, value, control) => {
      return control.delete();
    });
  }
  iterate(optionsOrCallback, callback) {
    let options;
    if (!callback) {
      options = {};
      callback = optionsOrCallback;
    } else {
      options = optionsOrCallback;
    }
    const cursor = this.cursor(options);
    return this.iterateCursor(cursor, callback);
  }
  /**
   * Iterates over a store, but waits for the given callback to complete for
   * each entry before iterating the next entry. This allows the callback to do
   * asynchronous work to determine if this iteration should continue.
   *
   * The provided callback should return `true` to continue iteration, and
   * `false` otherwise.
   */
  iterateSerial(callback) {
    const cursorRequest = this.cursor({});
    return new PersistencePromise((resolve, reject) => {
      cursorRequest.onerror = (event) => {
        const error = checkForAndReportiOSError(event.target.error);
        reject(error);
      };
      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (!cursor) {
          resolve();
          return;
        }
        callback(cursor.primaryKey, cursor.value).next((shouldContinue) => {
          if (shouldContinue) {
            cursor.continue();
          } else {
            resolve();
          }
        });
      };
    });
  }
  iterateCursor(cursorRequest, fn) {
    const results = [];
    return new PersistencePromise((resolve, reject) => {
      cursorRequest.onerror = (event) => {
        reject(event.target.error);
      };
      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (!cursor) {
          resolve();
          return;
        }
        const controller = new IterationController(cursor);
        const userResult = fn(cursor.primaryKey, cursor.value, controller);
        if (userResult instanceof PersistencePromise) {
          const userPromise = userResult.catch((err) => {
            controller.done();
            return PersistencePromise.reject(err);
          });
          results.push(userPromise);
        }
        if (controller.isDone) {
          resolve();
        } else if (controller.skipToKey === null) {
          cursor.continue();
        } else {
          cursor.continue(controller.skipToKey);
        }
      };
    }).next(() => PersistencePromise.waitFor(results));
  }
  options(indexOrRange, range) {
    let indexName = void 0;
    if (indexOrRange !== void 0) {
      if (typeof indexOrRange === "string") {
        indexName = indexOrRange;
      } else {
        range = indexOrRange;
      }
    }
    return {
      index: indexName,
      range
    };
  }
  cursor(options) {
    let direction = "next";
    if (options.reverse) {
      direction = "prev";
    }
    if (options.index) {
      const index = this.store.index(options.index);
      if (options.keysOnly) {
        return index.openKeyCursor(options.range, direction);
      } else {
        return index.openCursor(options.range, direction);
      }
    } else {
      return this.store.openCursor(options.range, direction);
    }
  }
};
function wrapRequest(request) {
  return new PersistencePromise((resolve, reject) => {
    request.onsuccess = (event) => {
      const result = event.target.result;
      resolve(result);
    };
    request.onerror = (event) => {
      const error = checkForAndReportiOSError(event.target.error);
      reject(error);
    };
  });
}
var reportedIOSError = false;
function checkForAndReportiOSError(error) {
  const iOSVersion = SimpleDb.getIOSVersion(getUA());
  if (iOSVersion >= 12.2 && iOSVersion < 13) {
    const IOS_ERROR = "An internal error was encountered in the Indexed Database server";
    if (error.message.indexOf(IOS_ERROR) >= 0) {
      const newError = new FirestoreError("internal", `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${IOS_ERROR}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);
      if (!reportedIOSError) {
        reportedIOSError = true;
        setTimeout(() => {
          throw newError;
        }, 0);
      }
      return newError;
    }
  }
  return error;
}
var LOG_TAG$h = "IndexBackfiller";
var INITIAL_BACKFILL_DELAY_MS = 15 * 1e3;
var REGULAR_BACKFILL_DELAY_MS = 60 * 1e3;
var MAX_DOCUMENTS_TO_PROCESS = 50;
var IndexBackfillerScheduler = class {
  constructor(asyncQueue, backfiller) {
    this.asyncQueue = asyncQueue;
    this.backfiller = backfiller;
    this.task = null;
  }
  start() {
    this.schedule(INITIAL_BACKFILL_DELAY_MS);
  }
  stop() {
    if (this.task) {
      this.task.cancel();
      this.task = null;
    }
  }
  get started() {
    return this.task !== null;
  }
  schedule(delay) {
    logDebug(LOG_TAG$h, `Scheduled in ${delay}ms`);
    this.task = this.asyncQueue.enqueueAfterDelay("index_backfill", delay, () => __async(this, null, function* () {
      this.task = null;
      try {
        const documentsProcessed = yield this.backfiller.backfill();
        logDebug(LOG_TAG$h, `Documents written: ${documentsProcessed}`);
      } catch (e) {
        if (isIndexedDbTransactionError(e)) {
          logDebug(LOG_TAG$h, "Ignoring IndexedDB error during index backfill: ", e);
        } else {
          yield ignoreIfPrimaryLeaseLoss(e);
        }
      }
      yield this.schedule(REGULAR_BACKFILL_DELAY_MS);
    }));
  }
};
var IndexBackfiller = class {
  constructor(localStore, persistence) {
    this.localStore = localStore;
    this.persistence = persistence;
  }
  backfill() {
    return __async(this, arguments, function* (maxDocumentsToProcess = MAX_DOCUMENTS_TO_PROCESS) {
      return this.persistence.runTransaction("Backfill Indexes", "readwrite-primary", (txn) => this.writeIndexEntries(txn, maxDocumentsToProcess));
    });
  }
  /** Writes index entries until the cap is reached. Returns the number of documents processed. */
  writeIndexEntries(transaction, maxDocumentsToProcess) {
    const processedCollectionGroups = /* @__PURE__ */ new Set();
    let documentsRemaining = maxDocumentsToProcess;
    let continueLoop = true;
    return PersistencePromise.doWhile(() => continueLoop === true && documentsRemaining > 0, () => {
      return this.localStore.indexManager.getNextCollectionGroupToUpdate(transaction).next((collectionGroup3) => {
        if (collectionGroup3 === null || processedCollectionGroups.has(collectionGroup3)) {
          continueLoop = false;
        } else {
          logDebug(LOG_TAG$h, `Processing collection: ${collectionGroup3}`);
          return this.writeEntriesForCollectionGroup(transaction, collectionGroup3, documentsRemaining).next((documentsProcessed) => {
            documentsRemaining -= documentsProcessed;
            processedCollectionGroups.add(collectionGroup3);
          });
        }
      });
    }).next(() => maxDocumentsToProcess - documentsRemaining);
  }
  /**
   * Writes entries for the provided collection group. Returns the number of documents processed.
   */
  writeEntriesForCollectionGroup(transaction, collectionGroup3, documentsRemainingUnderCap) {
    return this.localStore.indexManager.getMinOffsetFromCollectionGroup(transaction, collectionGroup3).next((existingOffset) => this.localStore.localDocuments.getNextDocuments(transaction, collectionGroup3, existingOffset, documentsRemainingUnderCap).next((nextBatch) => {
      const docs = nextBatch.changes;
      return this.localStore.indexManager.updateIndexEntries(transaction, docs).next(() => this.getNewOffset(existingOffset, nextBatch)).next((newOffset) => {
        logDebug(LOG_TAG$h, `Updating offset: ${newOffset}`);
        return this.localStore.indexManager.updateCollectionGroup(transaction, collectionGroup3, newOffset);
      }).next(() => docs.size);
    }));
  }
  /** Returns the next offset based on the provided documents. */
  getNewOffset(existingOffset, lookupResult) {
    let maxOffset = existingOffset;
    lookupResult.changes.forEach((key, document) => {
      const newOffset = newIndexOffsetFromDocument(document);
      if (indexOffsetComparator(newOffset, maxOffset) > 0) {
        maxOffset = newOffset;
      }
    });
    return new IndexOffset(maxOffset.readTime, maxOffset.documentKey, Math.max(lookupResult.batchId, existingOffset.largestBatchId));
  }
};
var ListenSequence = class {
  constructor(previousValue, sequenceNumberSyncer) {
    this.previousValue = previousValue;
    if (sequenceNumberSyncer) {
      sequenceNumberSyncer.sequenceNumberHandler = (sequenceNumber) => this.setPreviousValue(sequenceNumber);
      this.writeNewSequenceNumber = (sequenceNumber) => sequenceNumberSyncer.writeSequenceNumber(sequenceNumber);
    }
  }
  setPreviousValue(externalPreviousValue) {
    this.previousValue = Math.max(externalPreviousValue, this.previousValue);
    return this.previousValue;
  }
  next() {
    const nextValue = ++this.previousValue;
    if (this.writeNewSequenceNumber) {
      this.writeNewSequenceNumber(nextValue);
    }
    return nextValue;
  }
};
ListenSequence.INVALID = -1;
var escapeChar = "";
var encodedSeparatorChar = "";
var encodedNul = "";
var encodedEscape = "";
function encodeResourcePath(path) {
  let result = "";
  for (let i = 0; i < path.length; i++) {
    if (result.length > 0) {
      result = encodeSeparator(result);
    }
    result = encodeSegment(path.get(i), result);
  }
  return encodeSeparator(result);
}
function encodeSegment(segment, resultBuf) {
  let result = resultBuf;
  const length = segment.length;
  for (let i = 0; i < length; i++) {
    const c = segment.charAt(i);
    switch (c) {
      case "\0":
        result += escapeChar + encodedNul;
        break;
      case escapeChar:
        result += escapeChar + encodedEscape;
        break;
      default:
        result += c;
    }
  }
  return result;
}
function encodeSeparator(result) {
  return result + escapeChar + encodedSeparatorChar;
}
function decodeResourcePath(path) {
  const length = path.length;
  hardAssert(length >= 2);
  if (length === 2) {
    hardAssert(path.charAt(0) === escapeChar && path.charAt(1) === encodedSeparatorChar);
    return ResourcePath.emptyPath();
  }
  const lastReasonableEscapeIndex = length - 2;
  const segments = [];
  let segmentBuilder = "";
  for (let start = 0; start < length; ) {
    const end = path.indexOf(escapeChar, start);
    if (end < 0 || end > lastReasonableEscapeIndex) {
      fail();
    }
    const next = path.charAt(end + 1);
    switch (next) {
      case encodedSeparatorChar:
        const currentPiece = path.substring(start, end);
        let segment;
        if (segmentBuilder.length === 0) {
          segment = currentPiece;
        } else {
          segmentBuilder += currentPiece;
          segment = segmentBuilder;
          segmentBuilder = "";
        }
        segments.push(segment);
        break;
      case encodedNul:
        segmentBuilder += path.substring(start, end);
        segmentBuilder += "\0";
        break;
      case encodedEscape:
        segmentBuilder += path.substring(start, end + 1);
        break;
      default:
        fail();
    }
    start = end + 2;
  }
  return new ResourcePath(segments);
}
var DbRemoteDocumentStore$1 = "remoteDocuments";
var DbPrimaryClientStore = "owner";
var DbPrimaryClientKey = "owner";
var DbMutationQueueStore = "mutationQueues";
var DbMutationQueueKeyPath = "userId";
var DbMutationBatchStore = "mutations";
var DbMutationBatchKeyPath = "batchId";
var DbMutationBatchUserMutationsIndex = "userMutationsIndex";
var DbMutationBatchUserMutationsKeyPath = ["userId", "batchId"];
function newDbDocumentMutationPrefixForUser(userId) {
  return [userId];
}
function newDbDocumentMutationPrefixForPath(userId, path) {
  return [userId, encodeResourcePath(path)];
}
function newDbDocumentMutationKey(userId, path, batchId) {
  return [userId, encodeResourcePath(path), batchId];
}
var DbDocumentMutationPlaceholder = {};
var DbDocumentMutationStore = "documentMutations";
var DbRemoteDocumentStore = "remoteDocumentsV14";
var DbRemoteDocumentKeyPath = ["prefixPath", "collectionGroup", "readTime", "documentId"];
var DbRemoteDocumentDocumentKeyIndex = "documentKeyIndex";
var DbRemoteDocumentDocumentKeyIndexPath = ["prefixPath", "collectionGroup", "documentId"];
var DbRemoteDocumentCollectionGroupIndex = "collectionGroupIndex";
var DbRemoteDocumentCollectionGroupIndexPath = ["collectionGroup", "readTime", "prefixPath", "documentId"];
var DbRemoteDocumentGlobalStore = "remoteDocumentGlobal";
var DbRemoteDocumentGlobalKey = "remoteDocumentGlobalKey";
var DbTargetStore = "targets";
var DbTargetKeyPath = "targetId";
var DbTargetQueryTargetsIndexName = "queryTargetsIndex";
var DbTargetQueryTargetsKeyPath = ["canonicalId", "targetId"];
var DbTargetDocumentStore = "targetDocuments";
var DbTargetDocumentKeyPath = ["targetId", "path"];
var DbTargetDocumentDocumentTargetsIndex = "documentTargetsIndex";
var DbTargetDocumentDocumentTargetsKeyPath = ["path", "targetId"];
var DbTargetGlobalKey = "targetGlobalKey";
var DbTargetGlobalStore = "targetGlobal";
var DbCollectionParentStore = "collectionParents";
var DbCollectionParentKeyPath = ["collectionId", "parent"];
var DbClientMetadataStore = "clientMetadata";
var DbClientMetadataKeyPath = "clientId";
var DbBundleStore = "bundles";
var DbBundleKeyPath = "bundleId";
var DbNamedQueryStore = "namedQueries";
var DbNamedQueryKeyPath = "name";
var DbIndexConfigurationStore = "indexConfiguration";
var DbIndexConfigurationKeyPath = "indexId";
var DbIndexConfigurationCollectionGroupIndex = "collectionGroupIndex";
var DbIndexConfigurationCollectionGroupIndexPath = "collectionGroup";
var DbIndexStateStore = "indexState";
var DbIndexStateKeyPath = ["indexId", "uid"];
var DbIndexStateSequenceNumberIndex = "sequenceNumberIndex";
var DbIndexStateSequenceNumberIndexPath = ["uid", "sequenceNumber"];
var DbIndexEntryStore = "indexEntries";
var DbIndexEntryKeyPath = ["indexId", "uid", "arrayValue", "directionalValue", "orderedDocumentKey", "documentKey"];
var DbIndexEntryDocumentKeyIndex = "documentKeyIndex";
var DbIndexEntryDocumentKeyIndexPath = ["indexId", "uid", "orderedDocumentKey"];
var DbDocumentOverlayStore = "documentOverlays";
var DbDocumentOverlayKeyPath = ["userId", "collectionPath", "documentId"];
var DbDocumentOverlayCollectionPathOverlayIndex = "collectionPathOverlayIndex";
var DbDocumentOverlayCollectionPathOverlayIndexPath = ["userId", "collectionPath", "largestBatchId"];
var DbDocumentOverlayCollectionGroupOverlayIndex = "collectionGroupOverlayIndex";
var DbDocumentOverlayCollectionGroupOverlayIndexPath = ["userId", "collectionGroup", "largestBatchId"];
var DbGlobalsStore = "globals";
var DbGlobalsKeyPath = "name";
var V1_STORES = [DbMutationQueueStore, DbMutationBatchStore, DbDocumentMutationStore, DbRemoteDocumentStore$1, DbTargetStore, DbPrimaryClientStore, DbTargetGlobalStore, DbTargetDocumentStore];
var V3_STORES = V1_STORES;
var V4_STORES = [...V3_STORES, DbClientMetadataStore];
var V6_STORES = [...V4_STORES, DbRemoteDocumentGlobalStore];
var V8_STORES = [...V6_STORES, DbCollectionParentStore];
var V11_STORES = [...V8_STORES, DbBundleStore, DbNamedQueryStore];
var V12_STORES = [...V11_STORES, DbDocumentOverlayStore];
var V13_STORES = [DbMutationQueueStore, DbMutationBatchStore, DbDocumentMutationStore, DbRemoteDocumentStore, DbTargetStore, DbPrimaryClientStore, DbTargetGlobalStore, DbTargetDocumentStore, DbClientMetadataStore, DbRemoteDocumentGlobalStore, DbCollectionParentStore, DbBundleStore, DbNamedQueryStore, DbDocumentOverlayStore];
var V14_STORES = V13_STORES;
var V15_STORES = [...V14_STORES, DbIndexConfigurationStore, DbIndexStateStore, DbIndexEntryStore];
var V16_STORES = V15_STORES;
var V17_STORES = [...V15_STORES, DbGlobalsStore];
function getObjectStores(schemaVersion) {
  if (schemaVersion === 17) {
    return V17_STORES;
  } else if (schemaVersion === 16) {
    return V16_STORES;
  } else if (schemaVersion === 15) {
    return V15_STORES;
  } else if (schemaVersion === 14) {
    return V14_STORES;
  } else if (schemaVersion === 13) {
    return V13_STORES;
  } else if (schemaVersion === 12) {
    return V12_STORES;
  } else if (schemaVersion === 11) {
    return V11_STORES;
  } else {
    fail();
  }
}
var IndexedDbTransaction = class extends PersistenceTransaction {
  constructor(simpleDbTransaction, currentSequenceNumber) {
    super();
    this.simpleDbTransaction = simpleDbTransaction;
    this.currentSequenceNumber = currentSequenceNumber;
  }
};
function getStore(txn, store) {
  const indexedDbTransaction = debugCast(txn);
  return SimpleDb.getStore(indexedDbTransaction.simpleDbTransaction, store);
}
function objectSize(obj) {
  let count3 = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      count3++;
    }
  }
  return count3;
}
function forEach(obj, fn) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn(key, obj[key]);
    }
  }
}
function mapToArray(obj, fn) {
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(fn(obj[key], key, obj));
    }
  }
  return result;
}
function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
var SortedMap = class _SortedMap {
  constructor(comparator, root) {
    this.comparator = comparator;
    this.root = root ? root : LLRBNode.EMPTY;
  }
  // Returns a copy of the map, with the specified key/value added or replaced.
  insert(key, value) {
    return new _SortedMap(this.comparator, this.root.insert(key, value, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
  }
  // Returns a copy of the map, with the specified key removed.
  remove(key) {
    return new _SortedMap(this.comparator, this.root.remove(key, this.comparator).copy(null, null, LLRBNode.BLACK, null, null));
  }
  // Returns the value of the node with the given key, or null.
  get(key) {
    let node = this.root;
    while (!node.isEmpty()) {
      const cmp = this.comparator(key, node.key);
      if (cmp === 0) {
        return node.value;
      } else if (cmp < 0) {
        node = node.left;
      } else if (cmp > 0) {
        node = node.right;
      }
    }
    return null;
  }
  // Returns the index of the element in this sorted map, or -1 if it doesn't
  // exist.
  indexOf(key) {
    let prunedNodes = 0;
    let node = this.root;
    while (!node.isEmpty()) {
      const cmp = this.comparator(key, node.key);
      if (cmp === 0) {
        return prunedNodes + node.left.size;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        prunedNodes += node.left.size + 1;
        node = node.right;
      }
    }
    return -1;
  }
  isEmpty() {
    return this.root.isEmpty();
  }
  // Returns the total number of nodes in the map.
  get size() {
    return this.root.size;
  }
  // Returns the minimum key in the map.
  minKey() {
    return this.root.minKey();
  }
  // Returns the maximum key in the map.
  maxKey() {
    return this.root.maxKey();
  }
  // Traverses the map in key order and calls the specified action function
  // for each key/value pair. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  inorderTraversal(action) {
    return this.root.inorderTraversal(action);
  }
  forEach(fn) {
    this.inorderTraversal((k, v) => {
      fn(k, v);
      return false;
    });
  }
  toString() {
    const descriptions = [];
    this.inorderTraversal((k, v) => {
      descriptions.push(`${k}:${v}`);
      return false;
    });
    return `{${descriptions.join(", ")}}`;
  }
  // Traverses the map in reverse key order and calls the specified action
  // function for each key/value pair. If action returns true, traversal is
  // aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  reverseTraversal(action) {
    return this.root.reverseTraversal(action);
  }
  // Returns an iterator over the SortedMap.
  getIterator() {
    return new SortedMapIterator(this.root, null, this.comparator, false);
  }
  getIteratorFrom(key) {
    return new SortedMapIterator(this.root, key, this.comparator, false);
  }
  getReverseIterator() {
    return new SortedMapIterator(this.root, null, this.comparator, true);
  }
  getReverseIteratorFrom(key) {
    return new SortedMapIterator(this.root, key, this.comparator, true);
  }
};
var SortedMapIterator = class {
  constructor(node, startKey, comparator, isReverse) {
    this.isReverse = isReverse;
    this.nodeStack = [];
    let cmp = 1;
    while (!node.isEmpty()) {
      cmp = startKey ? comparator(node.key, startKey) : 1;
      if (startKey && isReverse) {
        cmp *= -1;
      }
      if (cmp < 0) {
        if (this.isReverse) {
          node = node.left;
        } else {
          node = node.right;
        }
      } else if (cmp === 0) {
        this.nodeStack.push(node);
        break;
      } else {
        this.nodeStack.push(node);
        if (this.isReverse) {
          node = node.right;
        } else {
          node = node.left;
        }
      }
    }
  }
  getNext() {
    let node = this.nodeStack.pop();
    const result = {
      key: node.key,
      value: node.value
    };
    if (this.isReverse) {
      node = node.left;
      while (!node.isEmpty()) {
        this.nodeStack.push(node);
        node = node.right;
      }
    } else {
      node = node.right;
      while (!node.isEmpty()) {
        this.nodeStack.push(node);
        node = node.left;
      }
    }
    return result;
  }
  hasNext() {
    return this.nodeStack.length > 0;
  }
  peek() {
    if (this.nodeStack.length === 0) {
      return null;
    }
    const node = this.nodeStack[this.nodeStack.length - 1];
    return {
      key: node.key,
      value: node.value
    };
  }
};
var LLRBNode = class _LLRBNode {
  constructor(key, value, color, left, right) {
    this.key = key;
    this.value = value;
    this.color = color != null ? color : _LLRBNode.RED;
    this.left = left != null ? left : _LLRBNode.EMPTY;
    this.right = right != null ? right : _LLRBNode.EMPTY;
    this.size = this.left.size + 1 + this.right.size;
  }
  // Returns a copy of the current node, optionally replacing pieces of it.
  copy(key, value, color, left, right) {
    return new _LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
  }
  isEmpty() {
    return false;
  }
  // Traverses the tree in key order and calls the specified action function
  // for each node. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  inorderTraversal(action) {
    return this.left.inorderTraversal(action) || action(this.key, this.value) || this.right.inorderTraversal(action);
  }
  // Traverses the tree in reverse key order and calls the specified action
  // function for each node. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  reverseTraversal(action) {
    return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
  }
  // Returns the minimum node in the tree.
  min() {
    if (this.left.isEmpty()) {
      return this;
    } else {
      return this.left.min();
    }
  }
  // Returns the maximum key in the tree.
  minKey() {
    return this.min().key;
  }
  // Returns the maximum key in the tree.
  maxKey() {
    if (this.right.isEmpty()) {
      return this.key;
    } else {
      return this.right.maxKey();
    }
  }
  // Returns new tree, with the key/value added.
  insert(key, value, comparator) {
    let n = this;
    const cmp = comparator(key, n.key);
    if (cmp < 0) {
      n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
    } else if (cmp === 0) {
      n = n.copy(null, value, null, null, null);
    } else {
      n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
    }
    return n.fixUp();
  }
  removeMin() {
    if (this.left.isEmpty()) {
      return _LLRBNode.EMPTY;
    }
    let n = this;
    if (!n.left.isRed() && !n.left.left.isRed()) {
      n = n.moveRedLeft();
    }
    n = n.copy(null, null, null, n.left.removeMin(), null);
    return n.fixUp();
  }
  // Returns new tree, with the specified item removed.
  remove(key, comparator) {
    let smallest;
    let n = this;
    if (comparator(key, n.key) < 0) {
      if (!n.left.isEmpty() && !n.left.isRed() && !n.left.left.isRed()) {
        n = n.moveRedLeft();
      }
      n = n.copy(null, null, null, n.left.remove(key, comparator), null);
    } else {
      if (n.left.isRed()) {
        n = n.rotateRight();
      }
      if (!n.right.isEmpty() && !n.right.isRed() && !n.right.left.isRed()) {
        n = n.moveRedRight();
      }
      if (comparator(key, n.key) === 0) {
        if (n.right.isEmpty()) {
          return _LLRBNode.EMPTY;
        } else {
          smallest = n.right.min();
          n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin());
        }
      }
      n = n.copy(null, null, null, null, n.right.remove(key, comparator));
    }
    return n.fixUp();
  }
  isRed() {
    return this.color;
  }
  // Returns new tree after performing any needed rotations.
  fixUp() {
    let n = this;
    if (n.right.isRed() && !n.left.isRed()) {
      n = n.rotateLeft();
    }
    if (n.left.isRed() && n.left.left.isRed()) {
      n = n.rotateRight();
    }
    if (n.left.isRed() && n.right.isRed()) {
      n = n.colorFlip();
    }
    return n;
  }
  moveRedLeft() {
    let n = this.colorFlip();
    if (n.right.left.isRed()) {
      n = n.copy(null, null, null, null, n.right.rotateRight());
      n = n.rotateLeft();
      n = n.colorFlip();
    }
    return n;
  }
  moveRedRight() {
    let n = this.colorFlip();
    if (n.left.left.isRed()) {
      n = n.rotateRight();
      n = n.colorFlip();
    }
    return n;
  }
  rotateLeft() {
    const nl = this.copy(null, null, _LLRBNode.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, nl, null);
  }
  rotateRight() {
    const nr = this.copy(null, null, _LLRBNode.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, nr);
  }
  colorFlip() {
    const left = this.left.copy(null, null, !this.left.color, null, null);
    const right = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, left, right);
  }
  // For testing.
  checkMaxDepth() {
    const blackDepth = this.check();
    if (Math.pow(2, blackDepth) <= this.size + 1) {
      return true;
    } else {
      return false;
    }
  }
  // In a balanced RB tree, the black-depth (number of black nodes) from root to
  // leaves is equal on both sides.  This function verifies that or asserts.
  check() {
    if (this.isRed() && this.left.isRed()) {
      throw fail();
    }
    if (this.right.isRed()) {
      throw fail();
    }
    const blackDepth = this.left.check();
    if (blackDepth !== this.right.check()) {
      throw fail();
    } else {
      return blackDepth + (this.isRed() ? 0 : 1);
    }
  }
};
LLRBNode.EMPTY = null;
LLRBNode.RED = true;
LLRBNode.BLACK = false;
var LLRBEmptyNode = class {
  constructor() {
    this.size = 0;
  }
  get key() {
    throw fail();
  }
  get value() {
    throw fail();
  }
  get color() {
    throw fail();
  }
  get left() {
    throw fail();
  }
  get right() {
    throw fail();
  }
  // Returns a copy of the current node.
  copy(key, value, color, left, right) {
    return this;
  }
  // Returns a copy of the tree, with the specified key/value added.
  insert(key, value, comparator) {
    return new LLRBNode(key, value);
  }
  // Returns a copy of the tree, with the specified key removed.
  remove(key, comparator) {
    return this;
  }
  isEmpty() {
    return true;
  }
  inorderTraversal(action) {
    return false;
  }
  reverseTraversal(action) {
    return false;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  isRed() {
    return false;
  }
  // For testing.
  checkMaxDepth() {
    return true;
  }
  check() {
    return 0;
  }
};
LLRBNode.EMPTY = new LLRBEmptyNode();
var SortedSet = class _SortedSet {
  constructor(comparator) {
    this.comparator = comparator;
    this.data = new SortedMap(this.comparator);
  }
  has(elem) {
    return this.data.get(elem) !== null;
  }
  first() {
    return this.data.minKey();
  }
  last() {
    return this.data.maxKey();
  }
  get size() {
    return this.data.size;
  }
  indexOf(elem) {
    return this.data.indexOf(elem);
  }
  /** Iterates elements in order defined by "comparator" */
  forEach(cb) {
    this.data.inorderTraversal((k, v) => {
      cb(k);
      return false;
    });
  }
  /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */
  forEachInRange(range, cb) {
    const iter = this.data.getIteratorFrom(range[0]);
    while (iter.hasNext()) {
      const elem = iter.getNext();
      if (this.comparator(elem.key, range[1]) >= 0) {
        return;
      }
      cb(elem.key);
    }
  }
  /**
   * Iterates over `elem`s such that: start &lt;= elem until false is returned.
   */
  forEachWhile(cb, start) {
    let iter;
    if (start !== void 0) {
      iter = this.data.getIteratorFrom(start);
    } else {
      iter = this.data.getIterator();
    }
    while (iter.hasNext()) {
      const elem = iter.getNext();
      const result = cb(elem.key);
      if (!result) {
        return;
      }
    }
  }
  /** Finds the least element greater than or equal to `elem`. */
  firstAfterOrEqual(elem) {
    const iter = this.data.getIteratorFrom(elem);
    return iter.hasNext() ? iter.getNext().key : null;
  }
  getIterator() {
    return new SortedSetIterator(this.data.getIterator());
  }
  getIteratorFrom(key) {
    return new SortedSetIterator(this.data.getIteratorFrom(key));
  }
  /** Inserts or updates an element */
  add(elem) {
    return this.copy(this.data.remove(elem).insert(elem, true));
  }
  /** Deletes an element */
  delete(elem) {
    if (!this.has(elem)) {
      return this;
    }
    return this.copy(this.data.remove(elem));
  }
  isEmpty() {
    return this.data.isEmpty();
  }
  unionWith(other) {
    let result = this;
    if (result.size < other.size) {
      result = other;
      other = this;
    }
    other.forEach((elem) => {
      result = result.add(elem);
    });
    return result;
  }
  isEqual(other) {
    if (!(other instanceof _SortedSet)) {
      return false;
    }
    if (this.size !== other.size) {
      return false;
    }
    const thisIt = this.data.getIterator();
    const otherIt = other.data.getIterator();
    while (thisIt.hasNext()) {
      const thisElem = thisIt.getNext().key;
      const otherElem = otherIt.getNext().key;
      if (this.comparator(thisElem, otherElem) !== 0) {
        return false;
      }
    }
    return true;
  }
  toArray() {
    const res = [];
    this.forEach((targetId) => {
      res.push(targetId);
    });
    return res;
  }
  toString() {
    const result = [];
    this.forEach((elem) => result.push(elem));
    return "SortedSet(" + result.toString() + ")";
  }
  copy(data) {
    const result = new _SortedSet(this.comparator);
    result.data = data;
    return result;
  }
};
var SortedSetIterator = class {
  constructor(iter) {
    this.iter = iter;
  }
  getNext() {
    return this.iter.getNext().key;
  }
  hasNext() {
    return this.iter.hasNext();
  }
};
function diffSortedSets(before, after, comparator, onAdd, onRemove) {
  const beforeIt = before.getIterator();
  const afterIt = after.getIterator();
  let beforeValue = advanceIterator(beforeIt);
  let afterValue = advanceIterator(afterIt);
  while (beforeValue || afterValue) {
    let added = false;
    let removed = false;
    if (beforeValue && afterValue) {
      const cmp = comparator(beforeValue, afterValue);
      if (cmp < 0) {
        removed = true;
      } else if (cmp > 0) {
        added = true;
      }
    } else if (beforeValue != null) {
      removed = true;
    } else {
      added = true;
    }
    if (added) {
      onAdd(afterValue);
      afterValue = advanceIterator(afterIt);
    } else if (removed) {
      onRemove(beforeValue);
      beforeValue = advanceIterator(beforeIt);
    } else {
      beforeValue = advanceIterator(beforeIt);
      afterValue = advanceIterator(afterIt);
    }
  }
}
function advanceIterator(it) {
  return it.hasNext() ? it.getNext() : void 0;
}
var FieldMask = class _FieldMask {
  constructor(fields) {
    this.fields = fields;
    fields.sort(FieldPath$1.comparator);
  }
  static empty() {
    return new _FieldMask([]);
  }
  /**
   * Returns a new FieldMask object that is the result of adding all the given
   * fields paths to this field mask.
   */
  unionWith(extraFields) {
    let mergedMaskSet = new SortedSet(FieldPath$1.comparator);
    for (const fieldPath of this.fields) {
      mergedMaskSet = mergedMaskSet.add(fieldPath);
    }
    for (const fieldPath of extraFields) {
      mergedMaskSet = mergedMaskSet.add(fieldPath);
    }
    return new _FieldMask(mergedMaskSet.toArray());
  }
  /**
   * Verifies that `fieldPath` is included by at least one field in this field
   * mask.
   *
   * This is an O(n) operation, where `n` is the size of the field mask.
   */
  covers(fieldPath) {
    for (const fieldMaskPath of this.fields) {
      if (fieldMaskPath.isPrefixOf(fieldPath)) {
        return true;
      }
    }
    return false;
  }
  isEqual(other) {
    return arrayEquals(this.fields, other.fields, (l, r) => l.isEqual(r));
  }
};
function decodeBase64(encoded) {
  return Buffer.from(encoded, "base64").toString("binary");
}
function encodeBase64(raw) {
  return Buffer.from(raw, "binary").toString("base64");
}
function isBase64Available() {
  return true;
}
var ByteString = class _ByteString {
  constructor(binaryString) {
    this.binaryString = binaryString;
  }
  static fromBase64String(base64) {
    const binaryString = decodeBase64(base64);
    return new _ByteString(binaryString);
  }
  static fromUint8Array(array) {
    const binaryString = binaryStringFromUint8Array(array);
    return new _ByteString(binaryString);
  }
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i < this.binaryString.length) {
          return {
            value: this.binaryString.charCodeAt(i++),
            done: false
          };
        } else {
          return {
            value: void 0,
            done: true
          };
        }
      }
    };
  }
  toBase64() {
    return encodeBase64(this.binaryString);
  }
  toUint8Array() {
    return uint8ArrayFromBinaryString(this.binaryString);
  }
  approximateByteSize() {
    return this.binaryString.length * 2;
  }
  compareTo(other) {
    return primitiveComparator(this.binaryString, other.binaryString);
  }
  isEqual(other) {
    return this.binaryString === other.binaryString;
  }
};
ByteString.EMPTY_BYTE_STRING = new ByteString("");
function binaryStringFromUint8Array(array) {
  let binaryString = "";
  for (let i = 0; i < array.length; ++i) {
    binaryString += String.fromCharCode(array[i]);
  }
  return binaryString;
}
function uint8ArrayFromBinaryString(binaryString) {
  const buffer = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    buffer[i] = binaryString.charCodeAt(i);
  }
  return buffer;
}
var ISO_TIMESTAMP_REG_EXP = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function normalizeTimestamp(date) {
  hardAssert(!!date);
  if (typeof date === "string") {
    let nanos = 0;
    const fraction = ISO_TIMESTAMP_REG_EXP.exec(date);
    hardAssert(!!fraction);
    if (fraction[1]) {
      let nanoStr = fraction[1];
      nanoStr = (nanoStr + "000000000").substr(0, 9);
      nanos = Number(nanoStr);
    }
    const parsedDate = new Date(date);
    const seconds = Math.floor(parsedDate.getTime() / 1e3);
    return {
      seconds,
      nanos
    };
  } else {
    const seconds = normalizeNumber(date.seconds);
    const nanos = normalizeNumber(date.nanos);
    return {
      seconds,
      nanos
    };
  }
}
function normalizeNumber(value) {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return Number(value);
  } else {
    return 0;
  }
}
function normalizeByteString(blob) {
  if (typeof blob === "string") {
    return ByteString.fromBase64String(blob);
  } else {
    return ByteString.fromUint8Array(blob);
  }
}
var SERVER_TIMESTAMP_SENTINEL = "server_timestamp";
var TYPE_KEY$1 = "__type__";
var PREVIOUS_VALUE_KEY = "__previous_value__";
var LOCAL_WRITE_TIME_KEY = "__local_write_time__";
function isServerTimestamp(value) {
  var _a, _b;
  const type = (_b = (((_a = value === null || value === void 0 ? void 0 : value.mapValue) === null || _a === void 0 ? void 0 : _a.fields) || {})[TYPE_KEY$1]) === null || _b === void 0 ? void 0 : _b.stringValue;
  return type === SERVER_TIMESTAMP_SENTINEL;
}
function serverTimestamp$1(localWriteTime, previousValue) {
  const mapValue = {
    fields: {
      [TYPE_KEY$1]: {
        stringValue: SERVER_TIMESTAMP_SENTINEL
      },
      [LOCAL_WRITE_TIME_KEY]: {
        timestampValue: {
          seconds: localWriteTime.seconds,
          nanos: localWriteTime.nanoseconds
        }
      }
    }
  };
  if (previousValue && isServerTimestamp(previousValue)) {
    previousValue = getPreviousValue(previousValue);
  }
  if (previousValue) {
    mapValue.fields[PREVIOUS_VALUE_KEY] = previousValue;
  }
  return {
    mapValue
  };
}
function getPreviousValue(value) {
  const previousValue = value.mapValue.fields[PREVIOUS_VALUE_KEY];
  if (isServerTimestamp(previousValue)) {
    return getPreviousValue(previousValue);
  }
  return previousValue;
}
function getLocalWriteTime(value) {
  const localWriteTime = normalizeTimestamp(value.mapValue.fields[LOCAL_WRITE_TIME_KEY].timestampValue);
  return new Timestamp(localWriteTime.seconds, localWriteTime.nanos);
}
var DatabaseInfo = class {
  /**
   * Constructs a DatabaseInfo using the provided host, databaseId and
   * persistenceKey.
   *
   * @param databaseId - The database to use.
   * @param appId - The Firebase App Id.
   * @param persistenceKey - A unique identifier for this Firestore's local
   * storage (used in conjunction with the databaseId).
   * @param host - The Firestore backend host to connect to.
   * @param ssl - Whether to use SSL when connecting.
   * @param forceLongPolling - Whether to use the forceLongPolling option
   * when using WebChannel as the network transport.
   * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
   * option when using WebChannel as the network transport.
   * @param longPollingOptions Options that configure long-polling.
   * @param useFetchStreams Whether to use the Fetch API instead of
   * XMLHTTPRequest
   */
  constructor(databaseId, appId, persistenceKey, host, ssl, forceLongPolling, autoDetectLongPolling, longPollingOptions, useFetchStreams) {
    this.databaseId = databaseId;
    this.appId = appId;
    this.persistenceKey = persistenceKey;
    this.host = host;
    this.ssl = ssl;
    this.forceLongPolling = forceLongPolling;
    this.autoDetectLongPolling = autoDetectLongPolling;
    this.longPollingOptions = longPollingOptions;
    this.useFetchStreams = useFetchStreams;
  }
};
var DEFAULT_DATABASE_NAME = "(default)";
var DatabaseId = class _DatabaseId {
  constructor(projectId, database) {
    this.projectId = projectId;
    this.database = database ? database : DEFAULT_DATABASE_NAME;
  }
  static empty() {
    return new _DatabaseId("", "");
  }
  get isDefaultDatabase() {
    return this.database === DEFAULT_DATABASE_NAME;
  }
  isEqual(other) {
    return other instanceof _DatabaseId && other.projectId === this.projectId && other.database === this.database;
  }
};
function databaseIdFromApp(app, database) {
  if (!Object.prototype.hasOwnProperty.apply(app.options, ["projectId"])) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
  }
  return new DatabaseId(app.options.projectId, database);
}
var BATCHID_UNKNOWN = -1;
function isNullOrUndefined(value) {
  return value === null || value === void 0;
}
function isNegativeZero(value) {
  return value === 0 && 1 / value === 1 / -0;
}
function isSafeInteger(value) {
  return typeof value === "number" && Number.isInteger(value) && !isNegativeZero(value) && value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER;
}
var TYPE_KEY = "__type__";
var MAX_VALUE_TYPE = "__max__";
var MAX_VALUE = {
  mapValue: {
    fields: {
      "__type__": {
        stringValue: MAX_VALUE_TYPE
      }
    }
  }
};
var VECTOR_VALUE_SENTINEL = "__vector__";
var VECTOR_MAP_VECTORS_KEY = "value";
var MIN_VALUE = {
  nullValue: "NULL_VALUE"
};
function typeOrder(value) {
  if ("nullValue" in value) {
    return 0;
  } else if ("booleanValue" in value) {
    return 1;
  } else if ("integerValue" in value || "doubleValue" in value) {
    return 2;
  } else if ("timestampValue" in value) {
    return 3;
  } else if ("stringValue" in value) {
    return 5;
  } else if ("bytesValue" in value) {
    return 6;
  } else if ("referenceValue" in value) {
    return 7;
  } else if ("geoPointValue" in value) {
    return 8;
  } else if ("arrayValue" in value) {
    return 9;
  } else if ("mapValue" in value) {
    if (isServerTimestamp(value)) {
      return 4;
    } else if (isMaxValue(value)) {
      return 9007199254740991;
    } else if (isVectorValue(value)) {
      return 10;
    }
    return 11;
  } else {
    return fail();
  }
}
function valueEquals(left, right) {
  if (left === right) {
    return true;
  }
  const leftType = typeOrder(left);
  const rightType = typeOrder(right);
  if (leftType !== rightType) {
    return false;
  }
  switch (leftType) {
    case 0:
      return true;
    case 1:
      return left.booleanValue === right.booleanValue;
    case 4:
      return getLocalWriteTime(left).isEqual(getLocalWriteTime(right));
    case 3:
      return timestampEquals(left, right);
    case 5:
      return left.stringValue === right.stringValue;
    case 6:
      return blobEquals(left, right);
    case 7:
      return left.referenceValue === right.referenceValue;
    case 8:
      return geoPointEquals(left, right);
    case 2:
      return numberEquals(left, right);
    case 9:
      return arrayEquals(left.arrayValue.values || [], right.arrayValue.values || [], valueEquals);
    case 10:
    case 11:
      return objectEquals(left, right);
    case 9007199254740991:
      return true;
    default:
      return fail();
  }
}
function timestampEquals(left, right) {
  if (typeof left.timestampValue === "string" && typeof right.timestampValue === "string" && left.timestampValue.length === right.timestampValue.length) {
    return left.timestampValue === right.timestampValue;
  }
  const leftTimestamp = normalizeTimestamp(left.timestampValue);
  const rightTimestamp = normalizeTimestamp(right.timestampValue);
  return leftTimestamp.seconds === rightTimestamp.seconds && leftTimestamp.nanos === rightTimestamp.nanos;
}
function geoPointEquals(left, right) {
  return normalizeNumber(left.geoPointValue.latitude) === normalizeNumber(right.geoPointValue.latitude) && normalizeNumber(left.geoPointValue.longitude) === normalizeNumber(right.geoPointValue.longitude);
}
function blobEquals(left, right) {
  return normalizeByteString(left.bytesValue).isEqual(normalizeByteString(right.bytesValue));
}
function numberEquals(left, right) {
  if ("integerValue" in left && "integerValue" in right) {
    return normalizeNumber(left.integerValue) === normalizeNumber(right.integerValue);
  } else if ("doubleValue" in left && "doubleValue" in right) {
    const n1 = normalizeNumber(left.doubleValue);
    const n2 = normalizeNumber(right.doubleValue);
    if (n1 === n2) {
      return isNegativeZero(n1) === isNegativeZero(n2);
    } else {
      return isNaN(n1) && isNaN(n2);
    }
  }
  return false;
}
function objectEquals(left, right) {
  const leftMap = left.mapValue.fields || {};
  const rightMap = right.mapValue.fields || {};
  if (objectSize(leftMap) !== objectSize(rightMap)) {
    return false;
  }
  for (const key in leftMap) {
    if (leftMap.hasOwnProperty(key)) {
      if (rightMap[key] === void 0 || !valueEquals(leftMap[key], rightMap[key])) {
        return false;
      }
    }
  }
  return true;
}
function arrayValueContains(haystack, needle) {
  return (haystack.values || []).find((v) => valueEquals(v, needle)) !== void 0;
}
function valueCompare(left, right) {
  if (left === right) {
    return 0;
  }
  const leftType = typeOrder(left);
  const rightType = typeOrder(right);
  if (leftType !== rightType) {
    return primitiveComparator(leftType, rightType);
  }
  switch (leftType) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return primitiveComparator(left.booleanValue, right.booleanValue);
    case 2:
      return compareNumbers(left, right);
    case 3:
      return compareTimestamps(left.timestampValue, right.timestampValue);
    case 4:
      return compareTimestamps(getLocalWriteTime(left), getLocalWriteTime(right));
    case 5:
      return primitiveComparator(left.stringValue, right.stringValue);
    case 6:
      return compareBlobs(left.bytesValue, right.bytesValue);
    case 7:
      return compareReferences(left.referenceValue, right.referenceValue);
    case 8:
      return compareGeoPoints(left.geoPointValue, right.geoPointValue);
    case 9:
      return compareArrays(left.arrayValue, right.arrayValue);
    case 10:
      return compareVectors(left.mapValue, right.mapValue);
    case 11:
      return compareMaps(left.mapValue, right.mapValue);
    default:
      throw fail();
  }
}
function compareNumbers(left, right) {
  const leftNumber = normalizeNumber(left.integerValue || left.doubleValue);
  const rightNumber = normalizeNumber(right.integerValue || right.doubleValue);
  if (leftNumber < rightNumber) {
    return -1;
  } else if (leftNumber > rightNumber) {
    return 1;
  } else if (leftNumber === rightNumber) {
    return 0;
  } else {
    if (isNaN(leftNumber)) {
      return isNaN(rightNumber) ? 0 : -1;
    } else {
      return 1;
    }
  }
}
function compareTimestamps(left, right) {
  if (typeof left === "string" && typeof right === "string" && left.length === right.length) {
    return primitiveComparator(left, right);
  }
  const leftTimestamp = normalizeTimestamp(left);
  const rightTimestamp = normalizeTimestamp(right);
  const comparison = primitiveComparator(leftTimestamp.seconds, rightTimestamp.seconds);
  if (comparison !== 0) {
    return comparison;
  }
  return primitiveComparator(leftTimestamp.nanos, rightTimestamp.nanos);
}
function compareReferences(leftPath, rightPath) {
  const leftSegments = leftPath.split("/");
  const rightSegments = rightPath.split("/");
  for (let i = 0; i < leftSegments.length && i < rightSegments.length; i++) {
    const comparison = primitiveComparator(leftSegments[i], rightSegments[i]);
    if (comparison !== 0) {
      return comparison;
    }
  }
  return primitiveComparator(leftSegments.length, rightSegments.length);
}
function compareGeoPoints(left, right) {
  const comparison = primitiveComparator(normalizeNumber(left.latitude), normalizeNumber(right.latitude));
  if (comparison !== 0) {
    return comparison;
  }
  return primitiveComparator(normalizeNumber(left.longitude), normalizeNumber(right.longitude));
}
function compareBlobs(left, right) {
  const leftBytes = normalizeByteString(left);
  const rightBytes = normalizeByteString(right);
  return leftBytes.compareTo(rightBytes);
}
function compareArrays(left, right) {
  const leftArray = left.values || [];
  const rightArray = right.values || [];
  for (let i = 0; i < leftArray.length && i < rightArray.length; ++i) {
    const compare = valueCompare(leftArray[i], rightArray[i]);
    if (compare) {
      return compare;
    }
  }
  return primitiveComparator(leftArray.length, rightArray.length);
}
function compareVectors(left, right) {
  var _a, _b, _c, _d;
  const leftMap = left.fields || {};
  const rightMap = right.fields || {};
  const leftArrayValue = (_a = leftMap[VECTOR_MAP_VECTORS_KEY]) === null || _a === void 0 ? void 0 : _a.arrayValue;
  const rightArrayValue = (_b = rightMap[VECTOR_MAP_VECTORS_KEY]) === null || _b === void 0 ? void 0 : _b.arrayValue;
  const lengthCompare = primitiveComparator(((_c = leftArrayValue === null || leftArrayValue === void 0 ? void 0 : leftArrayValue.values) === null || _c === void 0 ? void 0 : _c.length) || 0, ((_d = rightArrayValue === null || rightArrayValue === void 0 ? void 0 : rightArrayValue.values) === null || _d === void 0 ? void 0 : _d.length) || 0);
  if (lengthCompare !== 0) {
    return lengthCompare;
  }
  return compareArrays(leftArrayValue, rightArrayValue);
}
function compareMaps(left, right) {
  if (left === MAX_VALUE.mapValue && right === MAX_VALUE.mapValue) {
    return 0;
  } else if (left === MAX_VALUE.mapValue) {
    return 1;
  } else if (right === MAX_VALUE.mapValue) {
    return -1;
  }
  const leftMap = left.fields || {};
  const leftKeys = Object.keys(leftMap);
  const rightMap = right.fields || {};
  const rightKeys = Object.keys(rightMap);
  leftKeys.sort();
  rightKeys.sort();
  for (let i = 0; i < leftKeys.length && i < rightKeys.length; ++i) {
    const keyCompare = primitiveComparator(leftKeys[i], rightKeys[i]);
    if (keyCompare !== 0) {
      return keyCompare;
    }
    const compare = valueCompare(leftMap[leftKeys[i]], rightMap[rightKeys[i]]);
    if (compare !== 0) {
      return compare;
    }
  }
  return primitiveComparator(leftKeys.length, rightKeys.length);
}
function canonicalId(value) {
  return canonifyValue(value);
}
function canonifyValue(value) {
  if ("nullValue" in value) {
    return "null";
  } else if ("booleanValue" in value) {
    return "" + value.booleanValue;
  } else if ("integerValue" in value) {
    return "" + value.integerValue;
  } else if ("doubleValue" in value) {
    return "" + value.doubleValue;
  } else if ("timestampValue" in value) {
    return canonifyTimestamp(value.timestampValue);
  } else if ("stringValue" in value) {
    return value.stringValue;
  } else if ("bytesValue" in value) {
    return canonifyByteString(value.bytesValue);
  } else if ("referenceValue" in value) {
    return canonifyReference(value.referenceValue);
  } else if ("geoPointValue" in value) {
    return canonifyGeoPoint(value.geoPointValue);
  } else if ("arrayValue" in value) {
    return canonifyArray(value.arrayValue);
  } else if ("mapValue" in value) {
    return canonifyMap(value.mapValue);
  } else {
    return fail();
  }
}
function canonifyByteString(byteString) {
  return normalizeByteString(byteString).toBase64();
}
function canonifyTimestamp(timestamp) {
  const normalizedTimestamp = normalizeTimestamp(timestamp);
  return `time(${normalizedTimestamp.seconds},${normalizedTimestamp.nanos})`;
}
function canonifyGeoPoint(geoPoint) {
  return `geo(${geoPoint.latitude},${geoPoint.longitude})`;
}
function canonifyReference(referenceValue) {
  return DocumentKey.fromName(referenceValue).toString();
}
function canonifyMap(mapValue) {
  const sortedKeys = Object.keys(mapValue.fields || {}).sort();
  let result = "{";
  let first = true;
  for (const key of sortedKeys) {
    if (!first) {
      result += ",";
    } else {
      first = false;
    }
    result += `${key}:${canonifyValue(mapValue.fields[key])}`;
  }
  return result + "}";
}
function canonifyArray(arrayValue) {
  let result = "[";
  let first = true;
  for (const value of arrayValue.values || []) {
    if (!first) {
      result += ",";
    } else {
      first = false;
    }
    result += canonifyValue(value);
  }
  return result + "]";
}
function estimateByteSize(value) {
  switch (typeOrder(value)) {
    case 0:
      return 4;
    case 1:
      return 4;
    case 2:
      return 8;
    case 3:
      return 16;
    case 4:
      const previousValue = getPreviousValue(value);
      return previousValue ? 16 + estimateByteSize(previousValue) : 16;
    case 5:
      return value.stringValue.length * 2;
    case 6:
      return normalizeByteString(value.bytesValue).approximateByteSize();
    case 7:
      return value.referenceValue.length;
    case 8:
      return 16;
    case 9:
      return estimateArrayByteSize(value.arrayValue);
    case 10:
    case 11:
      return estimateMapByteSize(value.mapValue);
    default:
      throw fail();
  }
}
function estimateMapByteSize(mapValue) {
  let size = 0;
  forEach(mapValue.fields, (key, val) => {
    size += key.length + estimateByteSize(val);
  });
  return size;
}
function estimateArrayByteSize(arrayValue) {
  return (arrayValue.values || []).reduce((previousSize, value) => previousSize + estimateByteSize(value), 0);
}
function refValue(databaseId, key) {
  return {
    referenceValue: `projects/${databaseId.projectId}/databases/${databaseId.database}/documents/${key.path.canonicalString()}`
  };
}
function isInteger(value) {
  return !!value && "integerValue" in value;
}
function isDouble(value) {
  return !!value && "doubleValue" in value;
}
function isNumber(value) {
  return isInteger(value) || isDouble(value);
}
function isArray(value) {
  return !!value && "arrayValue" in value;
}
function isNullValue(value) {
  return !!value && "nullValue" in value;
}
function isNanValue(value) {
  return !!value && "doubleValue" in value && isNaN(Number(value.doubleValue));
}
function isMapValue(value) {
  return !!value && "mapValue" in value;
}
function isVectorValue(value) {
  var _a, _b;
  const type = (_b = (((_a = value === null || value === void 0 ? void 0 : value.mapValue) === null || _a === void 0 ? void 0 : _a.fields) || {})[TYPE_KEY]) === null || _b === void 0 ? void 0 : _b.stringValue;
  return type === VECTOR_VALUE_SENTINEL;
}
function deepClone(source) {
  if (source.geoPointValue) {
    return {
      geoPointValue: Object.assign({}, source.geoPointValue)
    };
  } else if (source.timestampValue && typeof source.timestampValue === "object") {
    return {
      timestampValue: Object.assign({}, source.timestampValue)
    };
  } else if (source.mapValue) {
    const target = {
      mapValue: {
        fields: {}
      }
    };
    forEach(source.mapValue.fields, (key, val) => target.mapValue.fields[key] = deepClone(val));
    return target;
  } else if (source.arrayValue) {
    const target = {
      arrayValue: {
        values: []
      }
    };
    for (let i = 0; i < (source.arrayValue.values || []).length; ++i) {
      target.arrayValue.values[i] = deepClone(source.arrayValue.values[i]);
    }
    return target;
  } else {
    return Object.assign({}, source);
  }
}
function isMaxValue(value) {
  return (((value.mapValue || {}).fields || {})["__type__"] || {}).stringValue === MAX_VALUE_TYPE;
}
var MIN_VECTOR_VALUE = {
  mapValue: {
    fields: {
      [TYPE_KEY]: {
        stringValue: VECTOR_VALUE_SENTINEL
      },
      [VECTOR_MAP_VECTORS_KEY]: {
        arrayValue: {}
      }
    }
  }
};
function valuesGetLowerBound(value) {
  if ("nullValue" in value) {
    return MIN_VALUE;
  } else if ("booleanValue" in value) {
    return {
      booleanValue: false
    };
  } else if ("integerValue" in value || "doubleValue" in value) {
    return {
      doubleValue: NaN
    };
  } else if ("timestampValue" in value) {
    return {
      timestampValue: {
        seconds: Number.MIN_SAFE_INTEGER
      }
    };
  } else if ("stringValue" in value) {
    return {
      stringValue: ""
    };
  } else if ("bytesValue" in value) {
    return {
      bytesValue: ""
    };
  } else if ("referenceValue" in value) {
    return refValue(DatabaseId.empty(), DocumentKey.empty());
  } else if ("geoPointValue" in value) {
    return {
      geoPointValue: {
        latitude: -90,
        longitude: -180
      }
    };
  } else if ("arrayValue" in value) {
    return {
      arrayValue: {}
    };
  } else if ("mapValue" in value) {
    if (isVectorValue(value)) {
      return MIN_VECTOR_VALUE;
    }
    return {
      mapValue: {}
    };
  } else {
    return fail();
  }
}
function valuesGetUpperBound(value) {
  if ("nullValue" in value) {
    return {
      booleanValue: false
    };
  } else if ("booleanValue" in value) {
    return {
      doubleValue: NaN
    };
  } else if ("integerValue" in value || "doubleValue" in value) {
    return {
      timestampValue: {
        seconds: Number.MIN_SAFE_INTEGER
      }
    };
  } else if ("timestampValue" in value) {
    return {
      stringValue: ""
    };
  } else if ("stringValue" in value) {
    return {
      bytesValue: ""
    };
  } else if ("bytesValue" in value) {
    return refValue(DatabaseId.empty(), DocumentKey.empty());
  } else if ("referenceValue" in value) {
    return {
      geoPointValue: {
        latitude: -90,
        longitude: -180
      }
    };
  } else if ("geoPointValue" in value) {
    return {
      arrayValue: {}
    };
  } else if ("arrayValue" in value) {
    return MIN_VECTOR_VALUE;
  } else if ("mapValue" in value) {
    if (isVectorValue(value)) {
      return {
        mapValue: {}
      };
    }
    return MAX_VALUE;
  } else {
    return fail();
  }
}
function lowerBoundCompare(left, right) {
  const cmp = valueCompare(left.value, right.value);
  if (cmp !== 0) {
    return cmp;
  }
  if (left.inclusive && !right.inclusive) {
    return -1;
  } else if (!left.inclusive && right.inclusive) {
    return 1;
  }
  return 0;
}
function upperBoundCompare(left, right) {
  const cmp = valueCompare(left.value, right.value);
  if (cmp !== 0) {
    return cmp;
  }
  if (left.inclusive && !right.inclusive) {
    return 1;
  } else if (!left.inclusive && right.inclusive) {
    return -1;
  }
  return 0;
}
var ObjectValue = class _ObjectValue {
  constructor(value) {
    this.value = value;
  }
  static empty() {
    return new _ObjectValue({
      mapValue: {}
    });
  }
  /**
   * Returns the value at the given path or null.
   *
   * @param path - the path to search
   * @returns The value at the path or null if the path is not set.
   */
  field(path) {
    if (path.isEmpty()) {
      return this.value;
    } else {
      let currentLevel = this.value;
      for (let i = 0; i < path.length - 1; ++i) {
        currentLevel = (currentLevel.mapValue.fields || {})[path.get(i)];
        if (!isMapValue(currentLevel)) {
          return null;
        }
      }
      currentLevel = (currentLevel.mapValue.fields || {})[path.lastSegment()];
      return currentLevel || null;
    }
  }
  /**
   * Sets the field to the provided value.
   *
   * @param path - The field path to set.
   * @param value - The value to set.
   */
  set(path, value) {
    const fieldsMap = this.getFieldsMap(path.popLast());
    fieldsMap[path.lastSegment()] = deepClone(value);
  }
  /**
   * Sets the provided fields to the provided values.
   *
   * @param data - A map of fields to values (or null for deletes).
   */
  setAll(data) {
    let parent = FieldPath$1.emptyPath();
    let upserts = {};
    let deletes = [];
    data.forEach((value, path) => {
      if (!parent.isImmediateParentOf(path)) {
        const fieldsMap2 = this.getFieldsMap(parent);
        this.applyChanges(fieldsMap2, upserts, deletes);
        upserts = {};
        deletes = [];
        parent = path.popLast();
      }
      if (value) {
        upserts[path.lastSegment()] = deepClone(value);
      } else {
        deletes.push(path.lastSegment());
      }
    });
    const fieldsMap = this.getFieldsMap(parent);
    this.applyChanges(fieldsMap, upserts, deletes);
  }
  /**
   * Removes the field at the specified path. If there is no field at the
   * specified path, nothing is changed.
   *
   * @param path - The field path to remove.
   */
  delete(path) {
    const nestedValue = this.field(path.popLast());
    if (isMapValue(nestedValue) && nestedValue.mapValue.fields) {
      delete nestedValue.mapValue.fields[path.lastSegment()];
    }
  }
  isEqual(other) {
    return valueEquals(this.value, other.value);
  }
  /**
   * Returns the map that contains the leaf element of `path`. If the parent
   * entry does not yet exist, or if it is not a map, a new map will be created.
   */
  getFieldsMap(path) {
    let current = this.value;
    if (!current.mapValue.fields) {
      current.mapValue = {
        fields: {}
      };
    }
    for (let i = 0; i < path.length; ++i) {
      let next = current.mapValue.fields[path.get(i)];
      if (!isMapValue(next) || !next.mapValue.fields) {
        next = {
          mapValue: {
            fields: {}
          }
        };
        current.mapValue.fields[path.get(i)] = next;
      }
      current = next;
    }
    return current.mapValue.fields;
  }
  /**
   * Modifies `fieldsMap` by adding, replacing or deleting the specified
   * entries.
   */
  applyChanges(fieldsMap, inserts, deletes) {
    forEach(inserts, (key, val) => fieldsMap[key] = val);
    for (const field of deletes) {
      delete fieldsMap[field];
    }
  }
  clone() {
    return new _ObjectValue(deepClone(this.value));
  }
};
function extractFieldMask(value) {
  const fields = [];
  forEach(value.fields, (key, value2) => {
    const currentPath = new FieldPath$1([key]);
    if (isMapValue(value2)) {
      const nestedMask = extractFieldMask(value2.mapValue);
      const nestedFields = nestedMask.fields;
      if (nestedFields.length === 0) {
        fields.push(currentPath);
      } else {
        for (const nestedPath of nestedFields) {
          fields.push(currentPath.child(nestedPath));
        }
      }
    } else {
      fields.push(currentPath);
    }
  });
  return new FieldMask(fields);
}
var MutableDocument = class _MutableDocument {
  constructor(key, documentType, version2, readTime, createTime, data, documentState) {
    this.key = key;
    this.documentType = documentType;
    this.version = version2;
    this.readTime = readTime;
    this.createTime = createTime;
    this.data = data;
    this.documentState = documentState;
  }
  /**
   * Creates a document with no known version or data, but which can serve as
   * base document for mutations.
   */
  static newInvalidDocument(documentKey) {
    return new _MutableDocument(
      documentKey,
      0,
      /* version */
      SnapshotVersion.min(),
      /* readTime */
      SnapshotVersion.min(),
      /* createTime */
      SnapshotVersion.min(),
      ObjectValue.empty(),
      0
      /* DocumentState.SYNCED */
    );
  }
  /**
   * Creates a new document that is known to exist with the given data at the
   * given version.
   */
  static newFoundDocument(documentKey, version2, createTime, value) {
    return new _MutableDocument(
      documentKey,
      1,
      /* version */
      version2,
      /* readTime */
      SnapshotVersion.min(),
      /* createTime */
      createTime,
      value,
      0
      /* DocumentState.SYNCED */
    );
  }
  /** Creates a new document that is known to not exist at the given version. */
  static newNoDocument(documentKey, version2) {
    return new _MutableDocument(
      documentKey,
      2,
      /* version */
      version2,
      /* readTime */
      SnapshotVersion.min(),
      /* createTime */
      SnapshotVersion.min(),
      ObjectValue.empty(),
      0
      /* DocumentState.SYNCED */
    );
  }
  /**
   * Creates a new document that is known to exist at the given version but
   * whose data is not known (e.g. a document that was updated without a known
   * base document).
   */
  static newUnknownDocument(documentKey, version2) {
    return new _MutableDocument(
      documentKey,
      3,
      /* version */
      version2,
      /* readTime */
      SnapshotVersion.min(),
      /* createTime */
      SnapshotVersion.min(),
      ObjectValue.empty(),
      2
      /* DocumentState.HAS_COMMITTED_MUTATIONS */
    );
  }
  /**
   * Changes the document type to indicate that it exists and that its version
   * and data are known.
   */
  convertToFoundDocument(version2, value) {
    if (this.createTime.isEqual(SnapshotVersion.min()) && (this.documentType === 2 || this.documentType === 0)) {
      this.createTime = version2;
    }
    this.version = version2;
    this.documentType = 1;
    this.data = value;
    this.documentState = 0;
    return this;
  }
  /**
   * Changes the document type to indicate that it doesn't exist at the given
   * version.
   */
  convertToNoDocument(version2) {
    this.version = version2;
    this.documentType = 2;
    this.data = ObjectValue.empty();
    this.documentState = 0;
    return this;
  }
  /**
   * Changes the document type to indicate that it exists at a given version but
   * that its data is not known (e.g. a document that was updated without a known
   * base document).
   */
  convertToUnknownDocument(version2) {
    this.version = version2;
    this.documentType = 3;
    this.data = ObjectValue.empty();
    this.documentState = 2;
    return this;
  }
  setHasCommittedMutations() {
    this.documentState = 2;
    return this;
  }
  setHasLocalMutations() {
    this.documentState = 1;
    this.version = SnapshotVersion.min();
    return this;
  }
  setReadTime(readTime) {
    this.readTime = readTime;
    return this;
  }
  get hasLocalMutations() {
    return this.documentState === 1;
  }
  get hasCommittedMutations() {
    return this.documentState === 2;
  }
  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations;
  }
  isValidDocument() {
    return this.documentType !== 0;
  }
  isFoundDocument() {
    return this.documentType === 1;
  }
  isNoDocument() {
    return this.documentType === 2;
  }
  isUnknownDocument() {
    return this.documentType === 3;
  }
  isEqual(other) {
    return other instanceof _MutableDocument && this.key.isEqual(other.key) && this.version.isEqual(other.version) && this.documentType === other.documentType && this.documentState === other.documentState && this.data.isEqual(other.data);
  }
  mutableCopy() {
    return new _MutableDocument(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
  }
};
function compareDocumentsByField(field, d1, d2) {
  const v1 = d1.data.field(field);
  const v2 = d2.data.field(field);
  if (v1 !== null && v2 !== null) {
    return valueCompare(v1, v2);
  } else {
    return fail();
  }
}
var Bound = class {
  constructor(position, inclusive) {
    this.position = position;
    this.inclusive = inclusive;
  }
};
function boundCompareToDocument(bound, orderBy3, doc4) {
  let comparison = 0;
  for (let i = 0; i < bound.position.length; i++) {
    const orderByComponent = orderBy3[i];
    const component = bound.position[i];
    if (orderByComponent.field.isKeyField()) {
      comparison = DocumentKey.comparator(DocumentKey.fromName(component.referenceValue), doc4.key);
    } else {
      const docValue = doc4.data.field(orderByComponent.field);
      comparison = valueCompare(component, docValue);
    }
    if (orderByComponent.dir === "desc") {
      comparison = comparison * -1;
    }
    if (comparison !== 0) {
      break;
    }
  }
  return comparison;
}
function boundSortsAfterDocument(bound, orderBy3, doc4) {
  const comparison = boundCompareToDocument(bound, orderBy3, doc4);
  return bound.inclusive ? comparison >= 0 : comparison > 0;
}
function boundSortsBeforeDocument(bound, orderBy3, doc4) {
  const comparison = boundCompareToDocument(bound, orderBy3, doc4);
  return bound.inclusive ? comparison <= 0 : comparison < 0;
}
function boundEquals(left, right) {
  if (left === null) {
    return right === null;
  } else if (right === null) {
    return false;
  }
  if (left.inclusive !== right.inclusive || left.position.length !== right.position.length) {
    return false;
  }
  for (let i = 0; i < left.position.length; i++) {
    const leftPosition = left.position[i];
    const rightPosition = right.position[i];
    if (!valueEquals(leftPosition, rightPosition)) {
      return false;
    }
  }
  return true;
}
var OrderBy = class {
  constructor(field, dir = "asc") {
    this.field = field;
    this.dir = dir;
  }
};
function canonifyOrderBy(orderBy3) {
  return orderBy3.field.canonicalString() + orderBy3.dir;
}
function stringifyOrderBy(orderBy3) {
  return `${orderBy3.field.canonicalString()} (${orderBy3.dir})`;
}
function orderByEquals(left, right) {
  return left.dir === right.dir && left.field.isEqual(right.field);
}
var Filter = class {
};
var FieldFilter = class _FieldFilter extends Filter {
  constructor(field, op, value) {
    super();
    this.field = field;
    this.op = op;
    this.value = value;
  }
  /**
   * Creates a filter based on the provided arguments.
   */
  static create(field, op, value) {
    if (field.isKeyField()) {
      if (op === "in" || op === "not-in") {
        return this.createKeyFieldInFilter(field, op, value);
      } else {
        return new KeyFieldFilter(field, op, value);
      }
    } else if (op === "array-contains") {
      return new ArrayContainsFilter(field, value);
    } else if (op === "in") {
      return new InFilter(field, value);
    } else if (op === "not-in") {
      return new NotInFilter(field, value);
    } else if (op === "array-contains-any") {
      return new ArrayContainsAnyFilter(field, value);
    } else {
      return new _FieldFilter(field, op, value);
    }
  }
  static createKeyFieldInFilter(field, op, value) {
    return op === "in" ? new KeyFieldInFilter(field, value) : new KeyFieldNotInFilter(field, value);
  }
  matches(doc4) {
    const other = doc4.data.field(this.field);
    if (this.op === "!=") {
      return other !== null && this.matchesComparison(valueCompare(other, this.value));
    }
    return other !== null && typeOrder(this.value) === typeOrder(other) && this.matchesComparison(valueCompare(other, this.value));
  }
  matchesComparison(comparison) {
    switch (this.op) {
      case "<":
        return comparison < 0;
      case "<=":
        return comparison <= 0;
      case "==":
        return comparison === 0;
      case "!=":
        return comparison !== 0;
      case ">":
        return comparison > 0;
      case ">=":
        return comparison >= 0;
      default:
        return fail();
    }
  }
  isInequality() {
    return [
      "<",
      "<=",
      ">",
      ">=",
      "!=",
      "not-in"
      /* Operator.NOT_IN */
    ].indexOf(this.op) >= 0;
  }
  getFlattenedFilters() {
    return [this];
  }
  getFilters() {
    return [this];
  }
};
var CompositeFilter = class _CompositeFilter extends Filter {
  constructor(filters, op) {
    super();
    this.filters = filters;
    this.op = op;
    this.memoizedFlattenedFilters = null;
  }
  /**
   * Creates a filter based on the provided arguments.
   */
  static create(filters, op) {
    return new _CompositeFilter(filters, op);
  }
  matches(doc4) {
    if (compositeFilterIsConjunction(this)) {
      return this.filters.find((filter2) => !filter2.matches(doc4)) === void 0;
    } else {
      return this.filters.find((filter2) => filter2.matches(doc4)) !== void 0;
    }
  }
  getFlattenedFilters() {
    if (this.memoizedFlattenedFilters !== null) {
      return this.memoizedFlattenedFilters;
    }
    this.memoizedFlattenedFilters = this.filters.reduce((result, subfilter) => {
      return result.concat(subfilter.getFlattenedFilters());
    }, []);
    return this.memoizedFlattenedFilters;
  }
  // Returns a mutable copy of `this.filters`
  getFilters() {
    return Object.assign([], this.filters);
  }
};
function compositeFilterIsConjunction(compositeFilter) {
  return compositeFilter.op === "and";
}
function compositeFilterIsDisjunction(compositeFilter) {
  return compositeFilter.op === "or";
}
function compositeFilterIsFlatConjunction(compositeFilter) {
  return compositeFilterIsFlat(compositeFilter) && compositeFilterIsConjunction(compositeFilter);
}
function compositeFilterIsFlat(compositeFilter) {
  for (const filter2 of compositeFilter.filters) {
    if (filter2 instanceof CompositeFilter) {
      return false;
    }
  }
  return true;
}
function canonifyFilter(filter2) {
  if (filter2 instanceof FieldFilter) {
    return filter2.field.canonicalString() + filter2.op.toString() + canonicalId(filter2.value);
  } else if (compositeFilterIsFlatConjunction(filter2)) {
    return filter2.filters.map((filter3) => canonifyFilter(filter3)).join(",");
  } else {
    const canonicalIdsString = filter2.filters.map((filter3) => canonifyFilter(filter3)).join(",");
    return `${filter2.op}(${canonicalIdsString})`;
  }
}
function filterEquals(f1, f2) {
  if (f1 instanceof FieldFilter) {
    return fieldFilterEquals(f1, f2);
  } else if (f1 instanceof CompositeFilter) {
    return compositeFilterEquals(f1, f2);
  } else {
    fail();
  }
}
function fieldFilterEquals(f1, f2) {
  return f2 instanceof FieldFilter && f1.op === f2.op && f1.field.isEqual(f2.field) && valueEquals(f1.value, f2.value);
}
function compositeFilterEquals(f1, f2) {
  if (f2 instanceof CompositeFilter && f1.op === f2.op && f1.filters.length === f2.filters.length) {
    const subFiltersMatch = f1.filters.reduce((result, f1Filter, index) => result && filterEquals(f1Filter, f2.filters[index]), true);
    return subFiltersMatch;
  }
  return false;
}
function compositeFilterWithAddedFilters(compositeFilter, otherFilters) {
  const mergedFilters = compositeFilter.filters.concat(otherFilters);
  return CompositeFilter.create(mergedFilters, compositeFilter.op);
}
function stringifyFilter(filter2) {
  if (filter2 instanceof FieldFilter) {
    return stringifyFieldFilter(filter2);
  } else if (filter2 instanceof CompositeFilter) {
    return stringifyCompositeFilter(filter2);
  } else {
    return "Filter";
  }
}
function stringifyCompositeFilter(filter2) {
  return filter2.op.toString() + ` {` + filter2.getFilters().map(stringifyFilter).join(" ,") + "}";
}
function stringifyFieldFilter(filter2) {
  return `${filter2.field.canonicalString()} ${filter2.op} ${canonicalId(filter2.value)}`;
}
var KeyFieldFilter = class extends FieldFilter {
  constructor(field, op, value) {
    super(field, op, value);
    this.key = DocumentKey.fromName(value.referenceValue);
  }
  matches(doc4) {
    const comparison = DocumentKey.comparator(doc4.key, this.key);
    return this.matchesComparison(comparison);
  }
};
var KeyFieldInFilter = class extends FieldFilter {
  constructor(field, value) {
    super(field, "in", value);
    this.keys = extractDocumentKeysFromArrayValue("in", value);
  }
  matches(doc4) {
    return this.keys.some((key) => key.isEqual(doc4.key));
  }
};
var KeyFieldNotInFilter = class extends FieldFilter {
  constructor(field, value) {
    super(field, "not-in", value);
    this.keys = extractDocumentKeysFromArrayValue("not-in", value);
  }
  matches(doc4) {
    return !this.keys.some((key) => key.isEqual(doc4.key));
  }
};
function extractDocumentKeysFromArrayValue(op, value) {
  var _a;
  return (((_a = value.arrayValue) === null || _a === void 0 ? void 0 : _a.values) || []).map((v) => {
    return DocumentKey.fromName(v.referenceValue);
  });
}
var ArrayContainsFilter = class extends FieldFilter {
  constructor(field, value) {
    super(field, "array-contains", value);
  }
  matches(doc4) {
    const other = doc4.data.field(this.field);
    return isArray(other) && arrayValueContains(other.arrayValue, this.value);
  }
};
var InFilter = class extends FieldFilter {
  constructor(field, value) {
    super(field, "in", value);
  }
  matches(doc4) {
    const other = doc4.data.field(this.field);
    return other !== null && arrayValueContains(this.value.arrayValue, other);
  }
};
var NotInFilter = class extends FieldFilter {
  constructor(field, value) {
    super(field, "not-in", value);
  }
  matches(doc4) {
    if (arrayValueContains(this.value.arrayValue, {
      nullValue: "NULL_VALUE"
    })) {
      return false;
    }
    const other = doc4.data.field(this.field);
    return other !== null && !arrayValueContains(this.value.arrayValue, other);
  }
};
var ArrayContainsAnyFilter = class extends FieldFilter {
  constructor(field, value) {
    super(field, "array-contains-any", value);
  }
  matches(doc4) {
    const other = doc4.data.field(this.field);
    if (!isArray(other) || !other.arrayValue.values) {
      return false;
    }
    return other.arrayValue.values.some((val) => arrayValueContains(this.value.arrayValue, val));
  }
};
var TargetImpl = class {
  constructor(path, collectionGroup3 = null, orderBy3 = [], filters = [], limit3 = null, startAt3 = null, endAt3 = null) {
    this.path = path;
    this.collectionGroup = collectionGroup3;
    this.orderBy = orderBy3;
    this.filters = filters;
    this.limit = limit3;
    this.startAt = startAt3;
    this.endAt = endAt3;
    this.memoizedCanonicalId = null;
  }
};
function newTarget(path, collectionGroup3 = null, orderBy3 = [], filters = [], limit3 = null, startAt3 = null, endAt3 = null) {
  return new TargetImpl(path, collectionGroup3, orderBy3, filters, limit3, startAt3, endAt3);
}
function canonifyTarget(target) {
  const targetImpl = debugCast(target);
  if (targetImpl.memoizedCanonicalId === null) {
    let str = targetImpl.path.canonicalString();
    if (targetImpl.collectionGroup !== null) {
      str += "|cg:" + targetImpl.collectionGroup;
    }
    str += "|f:";
    str += targetImpl.filters.map((f) => canonifyFilter(f)).join(",");
    str += "|ob:";
    str += targetImpl.orderBy.map((o) => canonifyOrderBy(o)).join(",");
    if (!isNullOrUndefined(targetImpl.limit)) {
      str += "|l:";
      str += targetImpl.limit;
    }
    if (targetImpl.startAt) {
      str += "|lb:";
      str += targetImpl.startAt.inclusive ? "b:" : "a:";
      str += targetImpl.startAt.position.map((p) => canonicalId(p)).join(",");
    }
    if (targetImpl.endAt) {
      str += "|ub:";
      str += targetImpl.endAt.inclusive ? "a:" : "b:";
      str += targetImpl.endAt.position.map((p) => canonicalId(p)).join(",");
    }
    targetImpl.memoizedCanonicalId = str;
  }
  return targetImpl.memoizedCanonicalId;
}
function stringifyTarget(target) {
  let str = target.path.canonicalString();
  if (target.collectionGroup !== null) {
    str += " collectionGroup=" + target.collectionGroup;
  }
  if (target.filters.length > 0) {
    str += `, filters: [${target.filters.map((f) => stringifyFilter(f)).join(", ")}]`;
  }
  if (!isNullOrUndefined(target.limit)) {
    str += ", limit: " + target.limit;
  }
  if (target.orderBy.length > 0) {
    str += `, orderBy: [${target.orderBy.map((o) => stringifyOrderBy(o)).join(", ")}]`;
  }
  if (target.startAt) {
    str += ", startAt: ";
    str += target.startAt.inclusive ? "b:" : "a:";
    str += target.startAt.position.map((p) => canonicalId(p)).join(",");
  }
  if (target.endAt) {
    str += ", endAt: ";
    str += target.endAt.inclusive ? "a:" : "b:";
    str += target.endAt.position.map((p) => canonicalId(p)).join(",");
  }
  return `Target(${str})`;
}
function targetEquals(left, right) {
  if (left.limit !== right.limit) {
    return false;
  }
  if (left.orderBy.length !== right.orderBy.length) {
    return false;
  }
  for (let i = 0; i < left.orderBy.length; i++) {
    if (!orderByEquals(left.orderBy[i], right.orderBy[i])) {
      return false;
    }
  }
  if (left.filters.length !== right.filters.length) {
    return false;
  }
  for (let i = 0; i < left.filters.length; i++) {
    if (!filterEquals(left.filters[i], right.filters[i])) {
      return false;
    }
  }
  if (left.collectionGroup !== right.collectionGroup) {
    return false;
  }
  if (!left.path.isEqual(right.path)) {
    return false;
  }
  if (!boundEquals(left.startAt, right.startAt)) {
    return false;
  }
  return boundEquals(left.endAt, right.endAt);
}
function targetIsDocumentTarget(target) {
  return DocumentKey.isDocumentKey(target.path) && target.collectionGroup === null && target.filters.length === 0;
}
function targetGetFieldFiltersForPath(target, path) {
  return target.filters.filter((f) => f instanceof FieldFilter && f.field.isEqual(path));
}
function targetGetArrayValues(target, fieldIndex) {
  const segment = fieldIndexGetArraySegment(fieldIndex);
  if (segment === void 0) {
    return null;
  }
  for (const fieldFilter of targetGetFieldFiltersForPath(target, segment.fieldPath)) {
    switch (fieldFilter.op) {
      case "array-contains-any":
        return fieldFilter.value.arrayValue.values || [];
      case "array-contains":
        return [fieldFilter.value];
    }
  }
  return null;
}
function targetGetNotInValues(target, fieldIndex) {
  const values = /* @__PURE__ */ new Map();
  for (const segment of fieldIndexGetDirectionalSegments(fieldIndex)) {
    for (const fieldFilter of targetGetFieldFiltersForPath(target, segment.fieldPath)) {
      switch (fieldFilter.op) {
        case "==":
        case "in":
          values.set(segment.fieldPath.canonicalString(), fieldFilter.value);
          break;
        case "not-in":
        case "!=":
          values.set(segment.fieldPath.canonicalString(), fieldFilter.value);
          return Array.from(values.values());
      }
    }
  }
  return null;
}
function targetGetLowerBound(target, fieldIndex) {
  const values = [];
  let inclusive = true;
  for (const segment of fieldIndexGetDirectionalSegments(fieldIndex)) {
    const segmentBound = segment.kind === 0 ? targetGetAscendingBound(target, segment.fieldPath, target.startAt) : targetGetDescendingBound(target, segment.fieldPath, target.startAt);
    values.push(segmentBound.value);
    inclusive && (inclusive = segmentBound.inclusive);
  }
  return new Bound(values, inclusive);
}
function targetGetUpperBound(target, fieldIndex) {
  const values = [];
  let inclusive = true;
  for (const segment of fieldIndexGetDirectionalSegments(fieldIndex)) {
    const segmentBound = segment.kind === 0 ? targetGetDescendingBound(target, segment.fieldPath, target.endAt) : targetGetAscendingBound(target, segment.fieldPath, target.endAt);
    values.push(segmentBound.value);
    inclusive && (inclusive = segmentBound.inclusive);
  }
  return new Bound(values, inclusive);
}
function targetGetAscendingBound(target, fieldPath, bound) {
  let value = MIN_VALUE;
  let inclusive = true;
  for (const fieldFilter of targetGetFieldFiltersForPath(target, fieldPath)) {
    let filterValue = MIN_VALUE;
    let filterInclusive = true;
    switch (fieldFilter.op) {
      case "<":
      case "<=":
        filterValue = valuesGetLowerBound(fieldFilter.value);
        break;
      case "==":
      case "in":
      case ">=":
        filterValue = fieldFilter.value;
        break;
      case ">":
        filterValue = fieldFilter.value;
        filterInclusive = false;
        break;
      case "!=":
      case "not-in":
        filterValue = MIN_VALUE;
        break;
    }
    if (lowerBoundCompare({
      value,
      inclusive
    }, {
      value: filterValue,
      inclusive: filterInclusive
    }) < 0) {
      value = filterValue;
      inclusive = filterInclusive;
    }
  }
  if (bound !== null) {
    for (let i = 0; i < target.orderBy.length; ++i) {
      const orderBy3 = target.orderBy[i];
      if (orderBy3.field.isEqual(fieldPath)) {
        const cursorValue = bound.position[i];
        if (lowerBoundCompare({
          value,
          inclusive
        }, {
          value: cursorValue,
          inclusive: bound.inclusive
        }) < 0) {
          value = cursorValue;
          inclusive = bound.inclusive;
        }
        break;
      }
    }
  }
  return {
    value,
    inclusive
  };
}
function targetGetDescendingBound(target, fieldPath, bound) {
  let value = MAX_VALUE;
  let inclusive = true;
  for (const fieldFilter of targetGetFieldFiltersForPath(target, fieldPath)) {
    let filterValue = MAX_VALUE;
    let filterInclusive = true;
    switch (fieldFilter.op) {
      case ">=":
      case ">":
        filterValue = valuesGetUpperBound(fieldFilter.value);
        filterInclusive = false;
        break;
      case "==":
      case "in":
      case "<=":
        filterValue = fieldFilter.value;
        break;
      case "<":
        filterValue = fieldFilter.value;
        filterInclusive = false;
        break;
      case "!=":
      case "not-in":
        filterValue = MAX_VALUE;
        break;
    }
    if (upperBoundCompare({
      value,
      inclusive
    }, {
      value: filterValue,
      inclusive: filterInclusive
    }) > 0) {
      value = filterValue;
      inclusive = filterInclusive;
    }
  }
  if (bound !== null) {
    for (let i = 0; i < target.orderBy.length; ++i) {
      const orderBy3 = target.orderBy[i];
      if (orderBy3.field.isEqual(fieldPath)) {
        const cursorValue = bound.position[i];
        if (upperBoundCompare({
          value,
          inclusive
        }, {
          value: cursorValue,
          inclusive: bound.inclusive
        }) > 0) {
          value = cursorValue;
          inclusive = bound.inclusive;
        }
        break;
      }
    }
  }
  return {
    value,
    inclusive
  };
}
function targetGetSegmentCount(target) {
  let fields = new SortedSet(FieldPath$1.comparator);
  let hasArraySegment = false;
  for (const filter2 of target.filters) {
    for (const subFilter of filter2.getFlattenedFilters()) {
      if (subFilter.field.isKeyField()) {
        continue;
      }
      if (subFilter.op === "array-contains" || subFilter.op === "array-contains-any") {
        hasArraySegment = true;
      } else {
        fields = fields.add(subFilter.field);
      }
    }
  }
  for (const orderBy3 of target.orderBy) {
    if (!orderBy3.field.isKeyField()) {
      fields = fields.add(orderBy3.field);
    }
  }
  return fields.size + (hasArraySegment ? 1 : 0);
}
function targetHasLimit(target) {
  return target.limit !== null;
}
var QueryImpl = class {
  /**
   * Initializes a Query with a path and optional additional query constraints.
   * Path must currently be empty if this is a collection group query.
   */
  constructor(path, collectionGroup3 = null, explicitOrderBy = [], filters = [], limit3 = null, limitType = "F", startAt3 = null, endAt3 = null) {
    this.path = path;
    this.collectionGroup = collectionGroup3;
    this.explicitOrderBy = explicitOrderBy;
    this.filters = filters;
    this.limit = limit3;
    this.limitType = limitType;
    this.startAt = startAt3;
    this.endAt = endAt3;
    this.memoizedNormalizedOrderBy = null;
    this.memoizedTarget = null;
    this.memoizedAggregateTarget = null;
    if (this.startAt) ;
    if (this.endAt) ;
  }
};
function newQuery(path, collectionGroup3, explicitOrderBy, filters, limit3, limitType, startAt3, endAt3) {
  return new QueryImpl(path, collectionGroup3, explicitOrderBy, filters, limit3, limitType, startAt3, endAt3);
}
function newQueryForPath(path) {
  return new QueryImpl(path);
}
function asCollectionQueryAtPath(query3, path) {
  return new QueryImpl(
    path,
    /*collectionGroup=*/
    null,
    query3.explicitOrderBy.slice(),
    query3.filters.slice(),
    query3.limit,
    query3.limitType,
    query3.startAt,
    query3.endAt
  );
}
function queryMatchesAllDocuments(query3) {
  return query3.filters.length === 0 && query3.limit === null && query3.startAt == null && query3.endAt == null && (query3.explicitOrderBy.length === 0 || query3.explicitOrderBy.length === 1 && query3.explicitOrderBy[0].field.isKeyField());
}
function getInequalityFilterFields(query3) {
  let result = new SortedSet(FieldPath$1.comparator);
  query3.filters.forEach((filter2) => {
    const subFilters = filter2.getFlattenedFilters();
    subFilters.forEach((filter3) => {
      if (filter3.isInequality()) {
        result = result.add(filter3.field);
      }
    });
  });
  return result;
}
function newQueryForCollectionGroup(collectionId) {
  return new QueryImpl(ResourcePath.emptyPath(), collectionId);
}
function isDocumentQuery$1(query3) {
  return DocumentKey.isDocumentKey(query3.path) && query3.collectionGroup === null && query3.filters.length === 0;
}
function isCollectionGroupQuery(query3) {
  return query3.collectionGroup !== null;
}
function queryNormalizedOrderBy(query3) {
  const queryImpl = debugCast(query3);
  if (queryImpl.memoizedNormalizedOrderBy === null) {
    queryImpl.memoizedNormalizedOrderBy = [];
    const fieldsNormalized = /* @__PURE__ */ new Set();
    for (const orderBy3 of queryImpl.explicitOrderBy) {
      queryImpl.memoizedNormalizedOrderBy.push(orderBy3);
      fieldsNormalized.add(orderBy3.field.canonicalString());
    }
    const lastDirection = queryImpl.explicitOrderBy.length > 0 ? queryImpl.explicitOrderBy[queryImpl.explicitOrderBy.length - 1].dir : "asc";
    const inequalityFields = getInequalityFilterFields(queryImpl);
    inequalityFields.forEach((field) => {
      if (!fieldsNormalized.has(field.canonicalString()) && !field.isKeyField()) {
        queryImpl.memoizedNormalizedOrderBy.push(new OrderBy(field, lastDirection));
      }
    });
    if (!fieldsNormalized.has(FieldPath$1.keyField().canonicalString())) {
      queryImpl.memoizedNormalizedOrderBy.push(new OrderBy(FieldPath$1.keyField(), lastDirection));
    }
  }
  return queryImpl.memoizedNormalizedOrderBy;
}
function queryToTarget(query3) {
  const queryImpl = debugCast(query3);
  if (!queryImpl.memoizedTarget) {
    queryImpl.memoizedTarget = _queryToTarget(queryImpl, queryNormalizedOrderBy(query3));
  }
  return queryImpl.memoizedTarget;
}
function queryToAggregateTarget(query3) {
  const queryImpl = debugCast(query3);
  if (!queryImpl.memoizedAggregateTarget) {
    queryImpl.memoizedAggregateTarget = _queryToTarget(queryImpl, query3.explicitOrderBy);
  }
  return queryImpl.memoizedAggregateTarget;
}
function _queryToTarget(queryImpl, orderBys) {
  if (queryImpl.limitType === "F") {
    return newTarget(queryImpl.path, queryImpl.collectionGroup, orderBys, queryImpl.filters, queryImpl.limit, queryImpl.startAt, queryImpl.endAt);
  } else {
    orderBys = orderBys.map((orderBy3) => {
      const dir = orderBy3.dir === "desc" ? "asc" : "desc";
      return new OrderBy(orderBy3.field, dir);
    });
    const startAt3 = queryImpl.endAt ? new Bound(queryImpl.endAt.position, queryImpl.endAt.inclusive) : null;
    const endAt3 = queryImpl.startAt ? new Bound(queryImpl.startAt.position, queryImpl.startAt.inclusive) : null;
    return newTarget(queryImpl.path, queryImpl.collectionGroup, orderBys, queryImpl.filters, queryImpl.limit, startAt3, endAt3);
  }
}
function queryWithAddedFilter(query3, filter2) {
  const newFilters = query3.filters.concat([filter2]);
  return new QueryImpl(query3.path, query3.collectionGroup, query3.explicitOrderBy.slice(), newFilters, query3.limit, query3.limitType, query3.startAt, query3.endAt);
}
function queryWithAddedOrderBy(query3, orderBy3) {
  const newOrderBy = query3.explicitOrderBy.concat([orderBy3]);
  return new QueryImpl(query3.path, query3.collectionGroup, newOrderBy, query3.filters.slice(), query3.limit, query3.limitType, query3.startAt, query3.endAt);
}
function queryWithLimit(query3, limit3, limitType) {
  return new QueryImpl(query3.path, query3.collectionGroup, query3.explicitOrderBy.slice(), query3.filters.slice(), limit3, limitType, query3.startAt, query3.endAt);
}
function queryWithStartAt(query3, bound) {
  return new QueryImpl(query3.path, query3.collectionGroup, query3.explicitOrderBy.slice(), query3.filters.slice(), query3.limit, query3.limitType, bound, query3.endAt);
}
function queryWithEndAt(query3, bound) {
  return new QueryImpl(query3.path, query3.collectionGroup, query3.explicitOrderBy.slice(), query3.filters.slice(), query3.limit, query3.limitType, query3.startAt, bound);
}
function queryEquals(left, right) {
  return targetEquals(queryToTarget(left), queryToTarget(right)) && left.limitType === right.limitType;
}
function canonifyQuery(query3) {
  return `${canonifyTarget(queryToTarget(query3))}|lt:${query3.limitType}`;
}
function stringifyQuery(query3) {
  return `Query(target=${stringifyTarget(queryToTarget(query3))}; limitType=${query3.limitType})`;
}
function queryMatches(query3, doc4) {
  return doc4.isFoundDocument() && queryMatchesPathAndCollectionGroup(query3, doc4) && queryMatchesOrderBy(query3, doc4) && queryMatchesFilters(query3, doc4) && queryMatchesBounds(query3, doc4);
}
function queryMatchesPathAndCollectionGroup(query3, doc4) {
  const docPath = doc4.key.path;
  if (query3.collectionGroup !== null) {
    return doc4.key.hasCollectionId(query3.collectionGroup) && query3.path.isPrefixOf(docPath);
  } else if (DocumentKey.isDocumentKey(query3.path)) {
    return query3.path.isEqual(docPath);
  } else {
    return query3.path.isImmediateParentOf(docPath);
  }
}
function queryMatchesOrderBy(query3, doc4) {
  for (const orderBy3 of queryNormalizedOrderBy(query3)) {
    if (!orderBy3.field.isKeyField() && doc4.data.field(orderBy3.field) === null) {
      return false;
    }
  }
  return true;
}
function queryMatchesFilters(query3, doc4) {
  for (const filter2 of query3.filters) {
    if (!filter2.matches(doc4)) {
      return false;
    }
  }
  return true;
}
function queryMatchesBounds(query3, doc4) {
  if (query3.startAt && !boundSortsBeforeDocument(query3.startAt, queryNormalizedOrderBy(query3), doc4)) {
    return false;
  }
  if (query3.endAt && !boundSortsAfterDocument(query3.endAt, queryNormalizedOrderBy(query3), doc4)) {
    return false;
  }
  return true;
}
function queryCollectionGroup(query3) {
  return query3.collectionGroup || (query3.path.length % 2 === 1 ? query3.path.lastSegment() : query3.path.get(query3.path.length - 2));
}
function newQueryComparator(query3) {
  return (d1, d2) => {
    let comparedOnKeyField = false;
    for (const orderBy3 of queryNormalizedOrderBy(query3)) {
      const comp = compareDocs(orderBy3, d1, d2);
      if (comp !== 0) {
        return comp;
      }
      comparedOnKeyField = comparedOnKeyField || orderBy3.field.isKeyField();
    }
    return 0;
  };
}
function compareDocs(orderBy3, d1, d2) {
  const comparison = orderBy3.field.isKeyField() ? DocumentKey.comparator(d1.key, d2.key) : compareDocumentsByField(orderBy3.field, d1, d2);
  switch (orderBy3.dir) {
    case "asc":
      return comparison;
    case "desc":
      return -1 * comparison;
    default:
      return fail();
  }
}
var ObjectMap = class {
  constructor(mapKeyFn, equalsFn) {
    this.mapKeyFn = mapKeyFn;
    this.equalsFn = equalsFn;
    this.inner = {};
    this.innerSize = 0;
  }
  /** Get a value for this key, or undefined if it does not exist. */
  get(key) {
    const id = this.mapKeyFn(key);
    const matches = this.inner[id];
    if (matches === void 0) {
      return void 0;
    }
    for (const [otherKey, value] of matches) {
      if (this.equalsFn(otherKey, key)) {
        return value;
      }
    }
    return void 0;
  }
  has(key) {
    return this.get(key) !== void 0;
  }
  /** Put this key and value in the map. */
  set(key, value) {
    const id = this.mapKeyFn(key);
    const matches = this.inner[id];
    if (matches === void 0) {
      this.inner[id] = [[key, value]];
      this.innerSize++;
      return;
    }
    for (let i = 0; i < matches.length; i++) {
      if (this.equalsFn(matches[i][0], key)) {
        matches[i] = [key, value];
        return;
      }
    }
    matches.push([key, value]);
    this.innerSize++;
  }
  /**
   * Remove this key from the map. Returns a boolean if anything was deleted.
   */
  delete(key) {
    const id = this.mapKeyFn(key);
    const matches = this.inner[id];
    if (matches === void 0) {
      return false;
    }
    for (let i = 0; i < matches.length; i++) {
      if (this.equalsFn(matches[i][0], key)) {
        if (matches.length === 1) {
          delete this.inner[id];
        } else {
          matches.splice(i, 1);
        }
        this.innerSize--;
        return true;
      }
    }
    return false;
  }
  forEach(fn) {
    forEach(this.inner, (_, entries) => {
      for (const [k, v] of entries) {
        fn(k, v);
      }
    });
  }
  isEmpty() {
    return isEmpty(this.inner);
  }
  size() {
    return this.innerSize;
  }
};
var EMPTY_MUTABLE_DOCUMENT_MAP = new SortedMap(DocumentKey.comparator);
function mutableDocumentMap() {
  return EMPTY_MUTABLE_DOCUMENT_MAP;
}
var EMPTY_DOCUMENT_MAP = new SortedMap(DocumentKey.comparator);
function documentMap(...docs) {
  let map2 = EMPTY_DOCUMENT_MAP;
  for (const doc4 of docs) {
    map2 = map2.insert(doc4.key, doc4);
  }
  return map2;
}
function newOverlayedDocumentMap() {
  return newDocumentKeyMap();
}
function convertOverlayedDocumentMapToDocumentMap(collection4) {
  let documents = EMPTY_DOCUMENT_MAP;
  collection4.forEach((k, v) => documents = documents.insert(k, v.overlayedDocument));
  return documents;
}
function newOverlayMap() {
  return newDocumentKeyMap();
}
function newMutationMap() {
  return newDocumentKeyMap();
}
function newDocumentKeyMap() {
  return new ObjectMap((key) => key.toString(), (l, r) => l.isEqual(r));
}
var EMPTY_DOCUMENT_VERSION_MAP = new SortedMap(DocumentKey.comparator);
function documentVersionMap() {
  return EMPTY_DOCUMENT_VERSION_MAP;
}
var EMPTY_DOCUMENT_KEY_SET = new SortedSet(DocumentKey.comparator);
function documentKeySet(...keys) {
  let set = EMPTY_DOCUMENT_KEY_SET;
  for (const key of keys) {
    set = set.add(key);
  }
  return set;
}
var EMPTY_TARGET_ID_SET = new SortedSet(primitiveComparator);
function targetIdSet() {
  return EMPTY_TARGET_ID_SET;
}
function toDouble(serializer, value) {
  if (serializer.useProto3Json) {
    if (isNaN(value)) {
      return {
        doubleValue: "NaN"
      };
    } else if (value === Infinity) {
      return {
        doubleValue: "Infinity"
      };
    } else if (value === -Infinity) {
      return {
        doubleValue: "-Infinity"
      };
    }
  }
  return {
    doubleValue: isNegativeZero(value) ? "-0" : value
  };
}
function toInteger(value) {
  return {
    integerValue: "" + value
  };
}
function toNumber(serializer, value) {
  return isSafeInteger(value) ? toInteger(value) : toDouble(serializer, value);
}
var TransformOperation = class {
  constructor() {
    this._ = void 0;
  }
};
function applyTransformOperationToLocalView(transform, previousValue, localWriteTime) {
  if (transform instanceof ServerTimestampTransform) {
    return serverTimestamp$1(localWriteTime, previousValue);
  } else if (transform instanceof ArrayUnionTransformOperation) {
    return applyArrayUnionTransformOperation(transform, previousValue);
  } else if (transform instanceof ArrayRemoveTransformOperation) {
    return applyArrayRemoveTransformOperation(transform, previousValue);
  } else {
    return applyNumericIncrementTransformOperationToLocalView(transform, previousValue);
  }
}
function applyTransformOperationToRemoteDocument(transform, previousValue, transformResult) {
  if (transform instanceof ArrayUnionTransformOperation) {
    return applyArrayUnionTransformOperation(transform, previousValue);
  } else if (transform instanceof ArrayRemoveTransformOperation) {
    return applyArrayRemoveTransformOperation(transform, previousValue);
  }
  return transformResult;
}
function computeTransformOperationBaseValue(transform, previousValue) {
  if (transform instanceof NumericIncrementTransformOperation) {
    return isNumber(previousValue) ? previousValue : {
      integerValue: 0
    };
  }
  return null;
}
function transformOperationEquals(left, right) {
  if (left instanceof ArrayUnionTransformOperation && right instanceof ArrayUnionTransformOperation) {
    return arrayEquals(left.elements, right.elements, valueEquals);
  } else if (left instanceof ArrayRemoveTransformOperation && right instanceof ArrayRemoveTransformOperation) {
    return arrayEquals(left.elements, right.elements, valueEquals);
  } else if (left instanceof NumericIncrementTransformOperation && right instanceof NumericIncrementTransformOperation) {
    return valueEquals(left.operand, right.operand);
  }
  return left instanceof ServerTimestampTransform && right instanceof ServerTimestampTransform;
}
var ServerTimestampTransform = class extends TransformOperation {
};
var ArrayUnionTransformOperation = class extends TransformOperation {
  constructor(elements) {
    super();
    this.elements = elements;
  }
};
function applyArrayUnionTransformOperation(transform, previousValue) {
  const values = coercedFieldValuesArray(previousValue);
  for (const toUnion of transform.elements) {
    if (!values.some((element) => valueEquals(element, toUnion))) {
      values.push(toUnion);
    }
  }
  return {
    arrayValue: {
      values
    }
  };
}
var ArrayRemoveTransformOperation = class extends TransformOperation {
  constructor(elements) {
    super();
    this.elements = elements;
  }
};
function applyArrayRemoveTransformOperation(transform, previousValue) {
  let values = coercedFieldValuesArray(previousValue);
  for (const toRemove of transform.elements) {
    values = values.filter((element) => !valueEquals(element, toRemove));
  }
  return {
    arrayValue: {
      values
    }
  };
}
var NumericIncrementTransformOperation = class extends TransformOperation {
  constructor(serializer, operand) {
    super();
    this.serializer = serializer;
    this.operand = operand;
  }
};
function applyNumericIncrementTransformOperationToLocalView(transform, previousValue) {
  const baseValue = computeTransformOperationBaseValue(transform, previousValue);
  const sum3 = asNumber(baseValue) + asNumber(transform.operand);
  if (isInteger(baseValue) && isInteger(transform.operand)) {
    return toInteger(sum3);
  } else {
    return toDouble(transform.serializer, sum3);
  }
}
function asNumber(value) {
  return normalizeNumber(value.integerValue || value.doubleValue);
}
function coercedFieldValuesArray(value) {
  return isArray(value) && value.arrayValue.values ? value.arrayValue.values.slice() : [];
}
var FieldTransform = class {
  constructor(field, transform) {
    this.field = field;
    this.transform = transform;
  }
};
function fieldTransformEquals(left, right) {
  return left.field.isEqual(right.field) && transformOperationEquals(left.transform, right.transform);
}
function fieldTransformsAreEqual(left, right) {
  if (left === void 0 && right === void 0) {
    return true;
  }
  if (left && right) {
    return arrayEquals(left, right, (l, r) => fieldTransformEquals(l, r));
  }
  return false;
}
var MutationResult = class {
  constructor(version2, transformResults) {
    this.version = version2;
    this.transformResults = transformResults;
  }
};
var Precondition = class _Precondition {
  constructor(updateTime, exists) {
    this.updateTime = updateTime;
    this.exists = exists;
  }
  /** Creates a new empty Precondition. */
  static none() {
    return new _Precondition();
  }
  /** Creates a new Precondition with an exists flag. */
  static exists(exists) {
    return new _Precondition(void 0, exists);
  }
  /** Creates a new Precondition based on a version a document exists at. */
  static updateTime(version2) {
    return new _Precondition(version2);
  }
  /** Returns whether this Precondition is empty. */
  get isNone() {
    return this.updateTime === void 0 && this.exists === void 0;
  }
  isEqual(other) {
    return this.exists === other.exists && (this.updateTime ? !!other.updateTime && this.updateTime.isEqual(other.updateTime) : !other.updateTime);
  }
};
function preconditionIsValidForDocument(precondition, document) {
  if (precondition.updateTime !== void 0) {
    return document.isFoundDocument() && document.version.isEqual(precondition.updateTime);
  } else if (precondition.exists !== void 0) {
    return precondition.exists === document.isFoundDocument();
  } else {
    return true;
  }
}
var Mutation = class {
};
function calculateOverlayMutation(doc4, mask) {
  if (!doc4.hasLocalMutations || mask && mask.fields.length === 0) {
    return null;
  }
  if (mask === null) {
    if (doc4.isNoDocument()) {
      return new DeleteMutation(doc4.key, Precondition.none());
    } else {
      return new SetMutation(doc4.key, doc4.data, Precondition.none());
    }
  } else {
    const docValue = doc4.data;
    const patchValue = ObjectValue.empty();
    let maskSet = new SortedSet(FieldPath$1.comparator);
    for (let path of mask.fields) {
      if (!maskSet.has(path)) {
        let value = docValue.field(path);
        if (value === null && path.length > 1) {
          path = path.popLast();
          value = docValue.field(path);
        }
        if (value === null) {
          patchValue.delete(path);
        } else {
          patchValue.set(path, value);
        }
        maskSet = maskSet.add(path);
      }
    }
    return new PatchMutation(doc4.key, patchValue, new FieldMask(maskSet.toArray()), Precondition.none());
  }
}
function mutationApplyToRemoteDocument(mutation, document, mutationResult) {
  if (mutation instanceof SetMutation) {
    setMutationApplyToRemoteDocument(mutation, document, mutationResult);
  } else if (mutation instanceof PatchMutation) {
    patchMutationApplyToRemoteDocument(mutation, document, mutationResult);
  } else {
    deleteMutationApplyToRemoteDocument(mutation, document, mutationResult);
  }
}
function mutationApplyToLocalView(mutation, document, previousMask, localWriteTime) {
  if (mutation instanceof SetMutation) {
    return setMutationApplyToLocalView(mutation, document, previousMask, localWriteTime);
  } else if (mutation instanceof PatchMutation) {
    return patchMutationApplyToLocalView(mutation, document, previousMask, localWriteTime);
  } else {
    return deleteMutationApplyToLocalView(mutation, document, previousMask);
  }
}
function mutationExtractBaseValue(mutation, document) {
  let baseObject = null;
  for (const fieldTransform of mutation.fieldTransforms) {
    const existingValue = document.data.field(fieldTransform.field);
    const coercedValue = computeTransformOperationBaseValue(fieldTransform.transform, existingValue || null);
    if (coercedValue != null) {
      if (baseObject === null) {
        baseObject = ObjectValue.empty();
      }
      baseObject.set(fieldTransform.field, coercedValue);
    }
  }
  return baseObject ? baseObject : null;
}
function mutationEquals(left, right) {
  if (left.type !== right.type) {
    return false;
  }
  if (!left.key.isEqual(right.key)) {
    return false;
  }
  if (!left.precondition.isEqual(right.precondition)) {
    return false;
  }
  if (!fieldTransformsAreEqual(left.fieldTransforms, right.fieldTransforms)) {
    return false;
  }
  if (left.type === 0) {
    return left.value.isEqual(right.value);
  }
  if (left.type === 1) {
    return left.data.isEqual(right.data) && left.fieldMask.isEqual(right.fieldMask);
  }
  return true;
}
var SetMutation = class extends Mutation {
  constructor(key, value, precondition, fieldTransforms = []) {
    super();
    this.key = key;
    this.value = value;
    this.precondition = precondition;
    this.fieldTransforms = fieldTransforms;
    this.type = 0;
  }
  getFieldMask() {
    return null;
  }
};
function setMutationApplyToRemoteDocument(mutation, document, mutationResult) {
  const newData = mutation.value.clone();
  const transformResults = serverTransformResults(mutation.fieldTransforms, document, mutationResult.transformResults);
  newData.setAll(transformResults);
  document.convertToFoundDocument(mutationResult.version, newData).setHasCommittedMutations();
}
function setMutationApplyToLocalView(mutation, document, previousMask, localWriteTime) {
  if (!preconditionIsValidForDocument(mutation.precondition, document)) {
    return previousMask;
  }
  const newData = mutation.value.clone();
  const transformResults = localTransformResults(mutation.fieldTransforms, localWriteTime, document);
  newData.setAll(transformResults);
  document.convertToFoundDocument(document.version, newData).setHasLocalMutations();
  return null;
}
var PatchMutation = class extends Mutation {
  constructor(key, data, fieldMask, precondition, fieldTransforms = []) {
    super();
    this.key = key;
    this.data = data;
    this.fieldMask = fieldMask;
    this.precondition = precondition;
    this.fieldTransforms = fieldTransforms;
    this.type = 1;
  }
  getFieldMask() {
    return this.fieldMask;
  }
};
function patchMutationApplyToRemoteDocument(mutation, document, mutationResult) {
  if (!preconditionIsValidForDocument(mutation.precondition, document)) {
    document.convertToUnknownDocument(mutationResult.version);
    return;
  }
  const transformResults = serverTransformResults(mutation.fieldTransforms, document, mutationResult.transformResults);
  const newData = document.data;
  newData.setAll(getPatch(mutation));
  newData.setAll(transformResults);
  document.convertToFoundDocument(mutationResult.version, newData).setHasCommittedMutations();
}
function patchMutationApplyToLocalView(mutation, document, previousMask, localWriteTime) {
  if (!preconditionIsValidForDocument(mutation.precondition, document)) {
    return previousMask;
  }
  const transformResults = localTransformResults(mutation.fieldTransforms, localWriteTime, document);
  const newData = document.data;
  newData.setAll(getPatch(mutation));
  newData.setAll(transformResults);
  document.convertToFoundDocument(document.version, newData).setHasLocalMutations();
  if (previousMask === null) {
    return null;
  }
  return previousMask.unionWith(mutation.fieldMask.fields).unionWith(mutation.fieldTransforms.map((transform) => transform.field));
}
function getPatch(mutation) {
  const result = /* @__PURE__ */ new Map();
  mutation.fieldMask.fields.forEach((fieldPath) => {
    if (!fieldPath.isEmpty()) {
      const newValue = mutation.data.field(fieldPath);
      result.set(fieldPath, newValue);
    }
  });
  return result;
}
function serverTransformResults(fieldTransforms, mutableDocument, serverTransformResults2) {
  const transformResults = /* @__PURE__ */ new Map();
  hardAssert(fieldTransforms.length === serverTransformResults2.length);
  for (let i = 0; i < serverTransformResults2.length; i++) {
    const fieldTransform = fieldTransforms[i];
    const transform = fieldTransform.transform;
    const previousValue = mutableDocument.data.field(fieldTransform.field);
    transformResults.set(fieldTransform.field, applyTransformOperationToRemoteDocument(transform, previousValue, serverTransformResults2[i]));
  }
  return transformResults;
}
function localTransformResults(fieldTransforms, localWriteTime, mutableDocument) {
  const transformResults = /* @__PURE__ */ new Map();
  for (const fieldTransform of fieldTransforms) {
    const transform = fieldTransform.transform;
    const previousValue = mutableDocument.data.field(fieldTransform.field);
    transformResults.set(fieldTransform.field, applyTransformOperationToLocalView(transform, previousValue, localWriteTime));
  }
  return transformResults;
}
var DeleteMutation = class extends Mutation {
  constructor(key, precondition) {
    super();
    this.key = key;
    this.precondition = precondition;
    this.type = 2;
    this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
};
function deleteMutationApplyToRemoteDocument(mutation, document, mutationResult) {
  document.convertToNoDocument(mutationResult.version).setHasCommittedMutations();
}
function deleteMutationApplyToLocalView(mutation, document, previousMask) {
  if (preconditionIsValidForDocument(mutation.precondition, document)) {
    document.convertToNoDocument(document.version).setHasLocalMutations();
    return null;
  }
  return previousMask;
}
var VerifyMutation = class extends Mutation {
  constructor(key, precondition) {
    super();
    this.key = key;
    this.precondition = precondition;
    this.type = 3;
    this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
};
var MutationBatch = class {
  /**
   * @param batchId - The unique ID of this mutation batch.
   * @param localWriteTime - The original write time of this mutation.
   * @param baseMutations - Mutations that are used to populate the base
   * values when this mutation is applied locally. This can be used to locally
   * overwrite values that are persisted in the remote document cache. Base
   * mutations are never sent to the backend.
   * @param mutations - The user-provided mutations in this mutation batch.
   * User-provided mutations are applied both locally and remotely on the
   * backend.
   */
  constructor(batchId, localWriteTime, baseMutations, mutations) {
    this.batchId = batchId;
    this.localWriteTime = localWriteTime;
    this.baseMutations = baseMutations;
    this.mutations = mutations;
  }
  /**
   * Applies all the mutations in this MutationBatch to the specified document
   * to compute the state of the remote document
   *
   * @param document - The document to apply mutations to.
   * @param batchResult - The result of applying the MutationBatch to the
   * backend.
   */
  applyToRemoteDocument(document, batchResult) {
    const mutationResults = batchResult.mutationResults;
    for (let i = 0; i < this.mutations.length; i++) {
      const mutation = this.mutations[i];
      if (mutation.key.isEqual(document.key)) {
        const mutationResult = mutationResults[i];
        mutationApplyToRemoteDocument(mutation, document, mutationResult);
      }
    }
  }
  /**
   * Computes the local view of a document given all the mutations in this
   * batch.
   *
   * @param document - The document to apply mutations to.
   * @param mutatedFields - Fields that have been updated before applying this mutation batch.
   * @returns A `FieldMask` representing all the fields that are mutated.
   */
  applyToLocalView(document, mutatedFields) {
    for (const mutation of this.baseMutations) {
      if (mutation.key.isEqual(document.key)) {
        mutatedFields = mutationApplyToLocalView(mutation, document, mutatedFields, this.localWriteTime);
      }
    }
    for (const mutation of this.mutations) {
      if (mutation.key.isEqual(document.key)) {
        mutatedFields = mutationApplyToLocalView(mutation, document, mutatedFields, this.localWriteTime);
      }
    }
    return mutatedFields;
  }
  /**
   * Computes the local view for all provided documents given the mutations in
   * this batch. Returns a `DocumentKey` to `Mutation` map which can be used to
   * replace all the mutation applications.
   */
  applyToLocalDocumentSet(documentMap2, documentsWithoutRemoteVersion) {
    const overlays = newMutationMap();
    this.mutations.forEach((m) => {
      const overlayedDocument = documentMap2.get(m.key);
      const mutableDocument = overlayedDocument.overlayedDocument;
      let mutatedFields = this.applyToLocalView(mutableDocument, overlayedDocument.mutatedFields);
      mutatedFields = documentsWithoutRemoteVersion.has(m.key) ? null : mutatedFields;
      const overlay = calculateOverlayMutation(mutableDocument, mutatedFields);
      if (overlay !== null) {
        overlays.set(m.key, overlay);
      }
      if (!mutableDocument.isValidDocument()) {
        mutableDocument.convertToNoDocument(SnapshotVersion.min());
      }
    });
    return overlays;
  }
  keys() {
    return this.mutations.reduce((keys, m) => keys.add(m.key), documentKeySet());
  }
  isEqual(other) {
    return this.batchId === other.batchId && arrayEquals(this.mutations, other.mutations, (l, r) => mutationEquals(l, r)) && arrayEquals(this.baseMutations, other.baseMutations, (l, r) => mutationEquals(l, r));
  }
};
var MutationBatchResult = class _MutationBatchResult {
  constructor(batch, commitVersion, mutationResults, docVersions) {
    this.batch = batch;
    this.commitVersion = commitVersion;
    this.mutationResults = mutationResults;
    this.docVersions = docVersions;
  }
  /**
   * Creates a new MutationBatchResult for the given batch and results. There
   * must be one result for each mutation in the batch. This static factory
   * caches a document=&gt;version mapping (docVersions).
   */
  static from(batch, commitVersion, results) {
    hardAssert(batch.mutations.length === results.length);
    let versionMap = documentVersionMap();
    const mutations = batch.mutations;
    for (let i = 0; i < mutations.length; i++) {
      versionMap = versionMap.insert(mutations[i].key, results[i].version);
    }
    return new _MutationBatchResult(batch, commitVersion, results, versionMap);
  }
};
var Overlay = class {
  constructor(largestBatchId, mutation) {
    this.largestBatchId = largestBatchId;
    this.mutation = mutation;
  }
  getKey() {
    return this.mutation.key;
  }
  isEqual(other) {
    return other !== null && this.mutation === other.mutation;
  }
  toString() {
    return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
  }
};
var ExistenceFilter = class {
  constructor(count3, unchangedNames) {
    this.count = count3;
    this.unchangedNames = unchangedNames;
  }
};
var RpcCode;
(function(RpcCode2) {
  RpcCode2[RpcCode2["OK"] = 0] = "OK";
  RpcCode2[RpcCode2["CANCELLED"] = 1] = "CANCELLED";
  RpcCode2[RpcCode2["UNKNOWN"] = 2] = "UNKNOWN";
  RpcCode2[RpcCode2["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
  RpcCode2[RpcCode2["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
  RpcCode2[RpcCode2["NOT_FOUND"] = 5] = "NOT_FOUND";
  RpcCode2[RpcCode2["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
  RpcCode2[RpcCode2["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
  RpcCode2[RpcCode2["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
  RpcCode2[RpcCode2["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
  RpcCode2[RpcCode2["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
  RpcCode2[RpcCode2["ABORTED"] = 10] = "ABORTED";
  RpcCode2[RpcCode2["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
  RpcCode2[RpcCode2["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
  RpcCode2[RpcCode2["INTERNAL"] = 13] = "INTERNAL";
  RpcCode2[RpcCode2["UNAVAILABLE"] = 14] = "UNAVAILABLE";
  RpcCode2[RpcCode2["DATA_LOSS"] = 15] = "DATA_LOSS";
})(RpcCode || (RpcCode = {}));
function isPermanentError(code) {
  switch (code) {
    case Code.OK:
      return fail();
    case Code.CANCELLED:
    case Code.UNKNOWN:
    case Code.DEADLINE_EXCEEDED:
    case Code.RESOURCE_EXHAUSTED:
    case Code.INTERNAL:
    case Code.UNAVAILABLE:
    case Code.UNAUTHENTICATED:
      return false;
    case Code.INVALID_ARGUMENT:
    case Code.NOT_FOUND:
    case Code.ALREADY_EXISTS:
    case Code.PERMISSION_DENIED:
    case Code.FAILED_PRECONDITION:
    case Code.ABORTED:
    case Code.OUT_OF_RANGE:
    case Code.UNIMPLEMENTED:
    case Code.DATA_LOSS:
      return true;
    default:
      return fail();
  }
}
function isPermanentWriteError(code) {
  return isPermanentError(code) && code !== Code.ABORTED;
}
function mapCodeFromRpcCode(code) {
  if (code === void 0) {
    logError("GRPC error has no .code");
    return Code.UNKNOWN;
  }
  switch (code) {
    case RpcCode.OK:
      return Code.OK;
    case RpcCode.CANCELLED:
      return Code.CANCELLED;
    case RpcCode.UNKNOWN:
      return Code.UNKNOWN;
    case RpcCode.DEADLINE_EXCEEDED:
      return Code.DEADLINE_EXCEEDED;
    case RpcCode.RESOURCE_EXHAUSTED:
      return Code.RESOURCE_EXHAUSTED;
    case RpcCode.INTERNAL:
      return Code.INTERNAL;
    case RpcCode.UNAVAILABLE:
      return Code.UNAVAILABLE;
    case RpcCode.UNAUTHENTICATED:
      return Code.UNAUTHENTICATED;
    case RpcCode.INVALID_ARGUMENT:
      return Code.INVALID_ARGUMENT;
    case RpcCode.NOT_FOUND:
      return Code.NOT_FOUND;
    case RpcCode.ALREADY_EXISTS:
      return Code.ALREADY_EXISTS;
    case RpcCode.PERMISSION_DENIED:
      return Code.PERMISSION_DENIED;
    case RpcCode.FAILED_PRECONDITION:
      return Code.FAILED_PRECONDITION;
    case RpcCode.ABORTED:
      return Code.ABORTED;
    case RpcCode.OUT_OF_RANGE:
      return Code.OUT_OF_RANGE;
    case RpcCode.UNIMPLEMENTED:
      return Code.UNIMPLEMENTED;
    case RpcCode.DATA_LOSS:
      return Code.DATA_LOSS;
    default:
      return fail();
  }
}
var Base64DecodeError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "Base64DecodeError";
  }
};
var testingHooksSpi = null;
function setTestingHooksSpi(instance) {
  if (testingHooksSpi) {
    throw new Error("a TestingHooksSpi instance is already set");
  }
  testingHooksSpi = instance;
}
function newTextEncoder() {
  return new TextEncoder();
}
function newTextDecoder() {
  return new TextDecoder("utf-8");
}
var MAX_64_BIT_UNSIGNED_INTEGER = new Integer([4294967295, 4294967295], 0);
function getMd5HashValue(value) {
  const encodedValue = newTextEncoder().encode(value);
  const md5 = new Md5();
  md5.update(encodedValue);
  return new Uint8Array(md5.digest());
}
function get64BitUints(Bytes2) {
  const dataView = new DataView(Bytes2.buffer);
  const chunk1 = dataView.getUint32(
    0,
    /* littleEndian= */
    true
  );
  const chunk2 = dataView.getUint32(
    4,
    /* littleEndian= */
    true
  );
  const chunk3 = dataView.getUint32(
    8,
    /* littleEndian= */
    true
  );
  const chunk4 = dataView.getUint32(
    12,
    /* littleEndian= */
    true
  );
  const integer1 = new Integer([chunk1, chunk2], 0);
  const integer2 = new Integer([chunk3, chunk4], 0);
  return [integer1, integer2];
}
var BloomFilter = class _BloomFilter {
  constructor(bitmap, padding, hashCount) {
    this.bitmap = bitmap;
    this.padding = padding;
    this.hashCount = hashCount;
    if (padding < 0 || padding >= 8) {
      throw new BloomFilterError(`Invalid padding: ${padding}`);
    }
    if (hashCount < 0) {
      throw new BloomFilterError(`Invalid hash count: ${hashCount}`);
    }
    if (bitmap.length > 0 && this.hashCount === 0) {
      throw new BloomFilterError(`Invalid hash count: ${hashCount}`);
    }
    if (bitmap.length === 0 && padding !== 0) {
      throw new BloomFilterError(`Invalid padding when bitmap length is 0: ${padding}`);
    }
    this.bitCount = bitmap.length * 8 - padding;
    this.bitCountInInteger = Integer.fromNumber(this.bitCount);
  }
  // Calculate the ith hash value based on the hashed 64bit integers,
  // and calculate its corresponding bit index in the bitmap to be checked.
  getBitIndex(num1, num2, hashIndex) {
    let hashValue = num1.add(num2.multiply(Integer.fromNumber(hashIndex)));
    if (hashValue.compare(MAX_64_BIT_UNSIGNED_INTEGER) === 1) {
      hashValue = new Integer([hashValue.getBits(0), hashValue.getBits(1)], 0);
    }
    return hashValue.modulo(this.bitCountInInteger).toNumber();
  }
  // Return whether the bit on the given index in the bitmap is set to 1.
  isBitSet(index) {
    const byte = this.bitmap[Math.floor(index / 8)];
    const offset = index % 8;
    return (byte & 1 << offset) !== 0;
  }
  mightContain(value) {
    if (this.bitCount === 0) {
      return false;
    }
    const md5HashedValue = getMd5HashValue(value);
    const [hash1, hash2] = get64BitUints(md5HashedValue);
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.getBitIndex(hash1, hash2, i);
      if (!this.isBitSet(index)) {
        return false;
      }
    }
    return true;
  }
  /** Create bloom filter for testing purposes only. */
  static create(bitCount, hashCount, contains) {
    const padding = bitCount % 8 === 0 ? 0 : 8 - bitCount % 8;
    const bitmap = new Uint8Array(Math.ceil(bitCount / 8));
    const bloomFilter = new _BloomFilter(bitmap, padding, hashCount);
    contains.forEach((item) => bloomFilter.insert(item));
    return bloomFilter;
  }
  insert(value) {
    if (this.bitCount === 0) {
      return;
    }
    const md5HashedValue = getMd5HashValue(value);
    const [hash1, hash2] = get64BitUints(md5HashedValue);
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.getBitIndex(hash1, hash2, i);
      this.setBit(index);
    }
  }
  setBit(index) {
    const indexOfByte = Math.floor(index / 8);
    const offset = index % 8;
    this.bitmap[indexOfByte] |= 1 << offset;
  }
};
var BloomFilterError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "BloomFilterError";
  }
};
var RemoteEvent = class _RemoteEvent {
  constructor(snapshotVersion, targetChanges, targetMismatches, documentUpdates, resolvedLimboDocuments) {
    this.snapshotVersion = snapshotVersion;
    this.targetChanges = targetChanges;
    this.targetMismatches = targetMismatches;
    this.documentUpdates = documentUpdates;
    this.resolvedLimboDocuments = resolvedLimboDocuments;
  }
  /**
   * HACK: Views require RemoteEvents in order to determine whether the view is
   * CURRENT, but secondary tabs don't receive remote events. So this method is
   * used to create a synthesized RemoteEvent that can be used to apply a
   * CURRENT status change to a View, for queries executed in a different tab.
   */
  // PORTING NOTE: Multi-tab only
  static createSynthesizedRemoteEventForCurrentChange(targetId, current, resumeToken) {
    const targetChanges = /* @__PURE__ */ new Map();
    targetChanges.set(targetId, TargetChange.createSynthesizedTargetChangeForCurrentChange(targetId, current, resumeToken));
    return new _RemoteEvent(SnapshotVersion.min(), targetChanges, new SortedMap(primitiveComparator), mutableDocumentMap(), documentKeySet());
  }
};
var TargetChange = class _TargetChange {
  constructor(resumeToken, current, addedDocuments, modifiedDocuments, removedDocuments) {
    this.resumeToken = resumeToken;
    this.current = current;
    this.addedDocuments = addedDocuments;
    this.modifiedDocuments = modifiedDocuments;
    this.removedDocuments = removedDocuments;
  }
  /**
   * This method is used to create a synthesized TargetChanges that can be used to
   * apply a CURRENT status change to a View (for queries executed in a different
   * tab) or for new queries (to raise snapshots with correct CURRENT status).
   */
  static createSynthesizedTargetChangeForCurrentChange(targetId, current, resumeToken) {
    return new _TargetChange(resumeToken, current, documentKeySet(), documentKeySet(), documentKeySet());
  }
};
var DocumentWatchChange = class {
  constructor(updatedTargetIds, removedTargetIds, key, newDoc) {
    this.updatedTargetIds = updatedTargetIds;
    this.removedTargetIds = removedTargetIds;
    this.key = key;
    this.newDoc = newDoc;
  }
};
var ExistenceFilterChange = class {
  constructor(targetId, existenceFilter) {
    this.targetId = targetId;
    this.existenceFilter = existenceFilter;
  }
};
var WatchTargetChange = class {
  constructor(state, targetIds, resumeToken = ByteString.EMPTY_BYTE_STRING, cause = null) {
    this.state = state;
    this.targetIds = targetIds;
    this.resumeToken = resumeToken;
    this.cause = cause;
  }
};
var TargetState = class {
  constructor() {
    this.pendingResponses = 0;
    this.documentChanges = snapshotChangesMap();
    this._resumeToken = ByteString.EMPTY_BYTE_STRING;
    this._current = false;
    this._hasPendingChanges = true;
  }
  /**
   * Whether this target has been marked 'current'.
   *
   * 'Current' has special meaning in the RPC protocol: It implies that the
   * Watch backend has sent us all changes up to the point at which the target
   * was added and that the target is consistent with the rest of the watch
   * stream.
   */
  get current() {
    return this._current;
  }
  /** The last resume token sent to us for this target. */
  get resumeToken() {
    return this._resumeToken;
  }
  /** Whether this target has pending target adds or target removes. */
  get isPending() {
    return this.pendingResponses !== 0;
  }
  /** Whether we have modified any state that should trigger a snapshot. */
  get hasPendingChanges() {
    return this._hasPendingChanges;
  }
  /**
   * Applies the resume token to the TargetChange, but only when it has a new
   * value. Empty resumeTokens are discarded.
   */
  updateResumeToken(resumeToken) {
    if (resumeToken.approximateByteSize() > 0) {
      this._hasPendingChanges = true;
      this._resumeToken = resumeToken;
    }
  }
  /**
   * Creates a target change from the current set of changes.
   *
   * To reset the document changes after raising this snapshot, call
   * `clearPendingChanges()`.
   */
  toTargetChange() {
    let addedDocuments = documentKeySet();
    let modifiedDocuments = documentKeySet();
    let removedDocuments = documentKeySet();
    this.documentChanges.forEach((key, changeType) => {
      switch (changeType) {
        case 0:
          addedDocuments = addedDocuments.add(key);
          break;
        case 2:
          modifiedDocuments = modifiedDocuments.add(key);
          break;
        case 1:
          removedDocuments = removedDocuments.add(key);
          break;
        default:
          fail();
      }
    });
    return new TargetChange(this._resumeToken, this._current, addedDocuments, modifiedDocuments, removedDocuments);
  }
  /**
   * Resets the document changes and sets `hasPendingChanges` to false.
   */
  clearPendingChanges() {
    this._hasPendingChanges = false;
    this.documentChanges = snapshotChangesMap();
  }
  addDocumentChange(key, changeType) {
    this._hasPendingChanges = true;
    this.documentChanges = this.documentChanges.insert(key, changeType);
  }
  removeDocumentChange(key) {
    this._hasPendingChanges = true;
    this.documentChanges = this.documentChanges.remove(key);
  }
  recordPendingTargetRequest() {
    this.pendingResponses += 1;
  }
  recordTargetResponse() {
    this.pendingResponses -= 1;
    hardAssert(this.pendingResponses >= 0);
  }
  markCurrent() {
    this._hasPendingChanges = true;
    this._current = true;
  }
};
var LOG_TAG$g = "WatchChangeAggregator";
var WatchChangeAggregator = class {
  constructor(metadataProvider) {
    this.metadataProvider = metadataProvider;
    this.targetStates = /* @__PURE__ */ new Map();
    this.pendingDocumentUpdates = mutableDocumentMap();
    this.pendingDocumentTargetMapping = documentTargetMap();
    this.pendingTargetResets = new SortedMap(primitiveComparator);
  }
  /**
   * Processes and adds the DocumentWatchChange to the current set of changes.
   */
  handleDocumentChange(docChange) {
    for (const targetId of docChange.updatedTargetIds) {
      if (docChange.newDoc && docChange.newDoc.isFoundDocument()) {
        this.addDocumentToTarget(targetId, docChange.newDoc);
      } else {
        this.removeDocumentFromTarget(targetId, docChange.key, docChange.newDoc);
      }
    }
    for (const targetId of docChange.removedTargetIds) {
      this.removeDocumentFromTarget(targetId, docChange.key, docChange.newDoc);
    }
  }
  /** Processes and adds the WatchTargetChange to the current set of changes. */
  handleTargetChange(targetChange) {
    this.forEachTarget(targetChange, (targetId) => {
      const targetState = this.ensureTargetState(targetId);
      switch (targetChange.state) {
        case 0:
          if (this.isActiveTarget(targetId)) {
            targetState.updateResumeToken(targetChange.resumeToken);
          }
          break;
        case 1:
          targetState.recordTargetResponse();
          if (!targetState.isPending) {
            targetState.clearPendingChanges();
          }
          targetState.updateResumeToken(targetChange.resumeToken);
          break;
        case 2:
          targetState.recordTargetResponse();
          if (!targetState.isPending) {
            this.removeTarget(targetId);
          }
          break;
        case 3:
          if (this.isActiveTarget(targetId)) {
            targetState.markCurrent();
            targetState.updateResumeToken(targetChange.resumeToken);
          }
          break;
        case 4:
          if (this.isActiveTarget(targetId)) {
            this.resetTarget(targetId);
            targetState.updateResumeToken(targetChange.resumeToken);
          }
          break;
        default:
          fail();
      }
    });
  }
  /**
   * Iterates over all targetIds that the watch change applies to: either the
   * targetIds explicitly listed in the change or the targetIds of all currently
   * active targets.
   */
  forEachTarget(targetChange, fn) {
    if (targetChange.targetIds.length > 0) {
      targetChange.targetIds.forEach(fn);
    } else {
      this.targetStates.forEach((_, targetId) => {
        if (this.isActiveTarget(targetId)) {
          fn(targetId);
        }
      });
    }
  }
  /**
   * Handles existence filters and synthesizes deletes for filter mismatches.
   * Targets that are invalidated by filter mismatches are added to
   * `pendingTargetResets`.
   */
  handleExistenceFilter(watchChange) {
    const targetId = watchChange.targetId;
    const expectedCount = watchChange.existenceFilter.count;
    const targetData = this.targetDataForActiveTarget(targetId);
    if (targetData) {
      const target = targetData.target;
      if (targetIsDocumentTarget(target)) {
        if (expectedCount === 0) {
          const key = new DocumentKey(target.path);
          this.removeDocumentFromTarget(targetId, key, MutableDocument.newNoDocument(key, SnapshotVersion.min()));
        } else {
          hardAssert(expectedCount === 1);
        }
      } else {
        const currentSize = this.getCurrentDocumentCountForTarget(targetId);
        if (currentSize !== expectedCount) {
          const bloomFilter = this.parseBloomFilter(watchChange);
          const status = bloomFilter ? this.applyBloomFilter(bloomFilter, watchChange, currentSize) : 1;
          if (status !== 0) {
            this.resetTarget(targetId);
            const purpose = status === 2 ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
            this.pendingTargetResets = this.pendingTargetResets.insert(targetId, purpose);
          }
          testingHooksSpi === null || testingHooksSpi === void 0 ? void 0 : testingHooksSpi.notifyOnExistenceFilterMismatch(createExistenceFilterMismatchInfoForTestingHooks(currentSize, watchChange.existenceFilter, this.metadataProvider.getDatabaseId(), bloomFilter, status));
        }
      }
    }
  }
  /**
   * Parse the bloom filter from the "unchanged_names" field of an existence
   * filter.
   */
  parseBloomFilter(watchChange) {
    const unchangedNames = watchChange.existenceFilter.unchangedNames;
    if (!unchangedNames || !unchangedNames.bits) {
      return null;
    }
    const {
      bits: {
        bitmap = "",
        padding = 0
      },
      hashCount = 0
    } = unchangedNames;
    let normalizedBitmap;
    try {
      normalizedBitmap = normalizeByteString(bitmap).toUint8Array();
    } catch (err) {
      if (err instanceof Base64DecodeError) {
        logWarn("Decoding the base64 bloom filter in existence filter failed (" + err.message + "); ignoring the bloom filter and falling back to full re-query.");
        return null;
      } else {
        throw err;
      }
    }
    let bloomFilter;
    try {
      bloomFilter = new BloomFilter(normalizedBitmap, padding, hashCount);
    } catch (err) {
      if (err instanceof BloomFilterError) {
        logWarn("BloomFilter error: ", err);
      } else {
        logWarn("Applying bloom filter failed: ", err);
      }
      return null;
    }
    if (bloomFilter.bitCount === 0) {
      return null;
    }
    return bloomFilter;
  }
  /**
   * Apply bloom filter to remove the deleted documents, and return the
   * application status.
   */
  applyBloomFilter(bloomFilter, watchChange, currentCount) {
    const expectedCount = watchChange.existenceFilter.count;
    const removedDocumentCount = this.filterRemovedDocuments(bloomFilter, watchChange.targetId);
    return expectedCount === currentCount - removedDocumentCount ? 0 : 2;
  }
  /**
   * Filter out removed documents based on bloom filter membership result and
   * return number of documents removed.
   */
  filterRemovedDocuments(bloomFilter, targetId) {
    const existingKeys = this.metadataProvider.getRemoteKeysForTarget(targetId);
    let removalCount = 0;
    existingKeys.forEach((key) => {
      const databaseId = this.metadataProvider.getDatabaseId();
      const documentPath = `projects/${databaseId.projectId}/databases/${databaseId.database}/documents/${key.path.canonicalString()}`;
      if (!bloomFilter.mightContain(documentPath)) {
        this.removeDocumentFromTarget(
          targetId,
          key,
          /*updatedDocument=*/
          null
        );
        removalCount++;
      }
    });
    return removalCount;
  }
  /**
   * Converts the currently accumulated state into a remote event at the
   * provided snapshot version. Resets the accumulated changes before returning.
   */
  createRemoteEvent(snapshotVersion) {
    const targetChanges = /* @__PURE__ */ new Map();
    this.targetStates.forEach((targetState, targetId) => {
      const targetData = this.targetDataForActiveTarget(targetId);
      if (targetData) {
        if (targetState.current && targetIsDocumentTarget(targetData.target)) {
          const key = new DocumentKey(targetData.target.path);
          if (this.pendingDocumentUpdates.get(key) === null && !this.targetContainsDocument(targetId, key)) {
            this.removeDocumentFromTarget(targetId, key, MutableDocument.newNoDocument(key, snapshotVersion));
          }
        }
        if (targetState.hasPendingChanges) {
          targetChanges.set(targetId, targetState.toTargetChange());
          targetState.clearPendingChanges();
        }
      }
    });
    let resolvedLimboDocuments = documentKeySet();
    this.pendingDocumentTargetMapping.forEach((key, targets) => {
      let isOnlyLimboTarget = true;
      targets.forEachWhile((targetId) => {
        const targetData = this.targetDataForActiveTarget(targetId);
        if (targetData && targetData.purpose !== "TargetPurposeLimboResolution") {
          isOnlyLimboTarget = false;
          return false;
        }
        return true;
      });
      if (isOnlyLimboTarget) {
        resolvedLimboDocuments = resolvedLimboDocuments.add(key);
      }
    });
    this.pendingDocumentUpdates.forEach((_, doc4) => doc4.setReadTime(snapshotVersion));
    const remoteEvent = new RemoteEvent(snapshotVersion, targetChanges, this.pendingTargetResets, this.pendingDocumentUpdates, resolvedLimboDocuments);
    this.pendingDocumentUpdates = mutableDocumentMap();
    this.pendingDocumentTargetMapping = documentTargetMap();
    this.pendingTargetResets = new SortedMap(primitiveComparator);
    return remoteEvent;
  }
  /**
   * Adds the provided document to the internal list of document updates and
   * its document key to the given target's mapping.
   */
  // Visible for testing.
  addDocumentToTarget(targetId, document) {
    if (!this.isActiveTarget(targetId)) {
      return;
    }
    const changeType = this.targetContainsDocument(targetId, document.key) ? 2 : 0;
    const targetState = this.ensureTargetState(targetId);
    targetState.addDocumentChange(document.key, changeType);
    this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(document.key, document);
    this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(document.key, this.ensureDocumentTargetMapping(document.key).add(targetId));
  }
  /**
   * Removes the provided document from the target mapping. If the
   * document no longer matches the target, but the document's state is still
   * known (e.g. we know that the document was deleted or we received the change
   * that caused the filter mismatch), the new document can be provided
   * to update the remote document cache.
   */
  // Visible for testing.
  removeDocumentFromTarget(targetId, key, updatedDocument) {
    if (!this.isActiveTarget(targetId)) {
      return;
    }
    const targetState = this.ensureTargetState(targetId);
    if (this.targetContainsDocument(targetId, key)) {
      targetState.addDocumentChange(
        key,
        1
        /* ChangeType.Removed */
      );
    } else {
      targetState.removeDocumentChange(key);
    }
    this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(key, this.ensureDocumentTargetMapping(key).delete(targetId));
    if (updatedDocument) {
      this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(key, updatedDocument);
    }
  }
  removeTarget(targetId) {
    this.targetStates.delete(targetId);
  }
  /**
   * Returns the current count of documents in the target. This includes both
   * the number of documents that the LocalStore considers to be part of the
   * target as well as any accumulated changes.
   */
  getCurrentDocumentCountForTarget(targetId) {
    const targetState = this.ensureTargetState(targetId);
    const targetChange = targetState.toTargetChange();
    return this.metadataProvider.getRemoteKeysForTarget(targetId).size + targetChange.addedDocuments.size - targetChange.removedDocuments.size;
  }
  /**
   * Increment the number of acks needed from watch before we can consider the
   * server to be 'in-sync' with the client's active targets.
   */
  recordPendingTargetRequest(targetId) {
    const targetState = this.ensureTargetState(targetId);
    targetState.recordPendingTargetRequest();
  }
  ensureTargetState(targetId) {
    let result = this.targetStates.get(targetId);
    if (!result) {
      result = new TargetState();
      this.targetStates.set(targetId, result);
    }
    return result;
  }
  ensureDocumentTargetMapping(key) {
    let targetMapping = this.pendingDocumentTargetMapping.get(key);
    if (!targetMapping) {
      targetMapping = new SortedSet(primitiveComparator);
      this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(key, targetMapping);
    }
    return targetMapping;
  }
  /**
   * Verifies that the user is still interested in this target (by calling
   * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
   * from watch.
   */
  isActiveTarget(targetId) {
    const targetActive = this.targetDataForActiveTarget(targetId) !== null;
    if (!targetActive) {
      logDebug(LOG_TAG$g, "Detected inactive target", targetId);
    }
    return targetActive;
  }
  /**
   * Returns the TargetData for an active target (i.e. a target that the user
   * is still interested in that has no outstanding target change requests).
   */
  targetDataForActiveTarget(targetId) {
    const targetState = this.targetStates.get(targetId);
    return targetState && targetState.isPending ? null : this.metadataProvider.getTargetDataForTarget(targetId);
  }
  /**
   * Resets the state of a Watch target to its initial state (e.g. sets
   * 'current' to false, clears the resume token and removes its target mapping
   * from all documents).
   */
  resetTarget(targetId) {
    this.targetStates.set(targetId, new TargetState());
    const existingKeys = this.metadataProvider.getRemoteKeysForTarget(targetId);
    existingKeys.forEach((key) => {
      this.removeDocumentFromTarget(
        targetId,
        key,
        /*updatedDocument=*/
        null
      );
    });
  }
  /**
   * Returns whether the LocalStore considers the document to be part of the
   * specified target.
   */
  targetContainsDocument(targetId, key) {
    const existingKeys = this.metadataProvider.getRemoteKeysForTarget(targetId);
    return existingKeys.has(key);
  }
};
function documentTargetMap() {
  return new SortedMap(DocumentKey.comparator);
}
function snapshotChangesMap() {
  return new SortedMap(DocumentKey.comparator);
}
function createExistenceFilterMismatchInfoForTestingHooks(localCacheCount, existenceFilter, databaseId, bloomFilter, bloomFilterStatus) {
  var _a, _b, _c, _d, _e, _f;
  const result = {
    localCacheCount,
    existenceFilterCount: existenceFilter.count,
    databaseId: databaseId.database,
    projectId: databaseId.projectId
  };
  const unchangedNames = existenceFilter.unchangedNames;
  if (unchangedNames) {
    result.bloomFilter = {
      applied: bloomFilterStatus === 0,
      hashCount: (_a = unchangedNames === null || unchangedNames === void 0 ? void 0 : unchangedNames.hashCount) !== null && _a !== void 0 ? _a : 0,
      bitmapLength: (_d = (_c = (_b = unchangedNames === null || unchangedNames === void 0 ? void 0 : unchangedNames.bits) === null || _b === void 0 ? void 0 : _b.bitmap) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0,
      padding: (_f = (_e = unchangedNames === null || unchangedNames === void 0 ? void 0 : unchangedNames.bits) === null || _e === void 0 ? void 0 : _e.padding) !== null && _f !== void 0 ? _f : 0,
      mightContain: (value) => {
        var _a2;
        return (_a2 = bloomFilter === null || bloomFilter === void 0 ? void 0 : bloomFilter.mightContain(value)) !== null && _a2 !== void 0 ? _a2 : false;
      }
    };
  }
  return result;
}
var DIRECTIONS = (() => {
  const dirs = {};
  dirs[
    "asc"
    /* Direction.ASCENDING */
  ] = "ASCENDING";
  dirs[
    "desc"
    /* Direction.DESCENDING */
  ] = "DESCENDING";
  return dirs;
})();
var OPERATORS = (() => {
  const ops = {};
  ops[
    "<"
    /* Operator.LESS_THAN */
  ] = "LESS_THAN";
  ops[
    "<="
    /* Operator.LESS_THAN_OR_EQUAL */
  ] = "LESS_THAN_OR_EQUAL";
  ops[
    ">"
    /* Operator.GREATER_THAN */
  ] = "GREATER_THAN";
  ops[
    ">="
    /* Operator.GREATER_THAN_OR_EQUAL */
  ] = "GREATER_THAN_OR_EQUAL";
  ops[
    "=="
    /* Operator.EQUAL */
  ] = "EQUAL";
  ops[
    "!="
    /* Operator.NOT_EQUAL */
  ] = "NOT_EQUAL";
  ops[
    "array-contains"
    /* Operator.ARRAY_CONTAINS */
  ] = "ARRAY_CONTAINS";
  ops[
    "in"
    /* Operator.IN */
  ] = "IN";
  ops[
    "not-in"
    /* Operator.NOT_IN */
  ] = "NOT_IN";
  ops[
    "array-contains-any"
    /* Operator.ARRAY_CONTAINS_ANY */
  ] = "ARRAY_CONTAINS_ANY";
  return ops;
})();
var COMPOSITE_OPERATORS = (() => {
  const ops = {};
  ops[
    "and"
    /* CompositeOperator.AND */
  ] = "AND";
  ops[
    "or"
    /* CompositeOperator.OR */
  ] = "OR";
  return ops;
})();
function assertPresent(value, description) {
}
var JsonProtoSerializer = class {
  constructor(databaseId, useProto3Json) {
    this.databaseId = databaseId;
    this.useProto3Json = useProto3Json;
  }
};
function fromRpcStatus(status) {
  const code = status.code === void 0 ? Code.UNKNOWN : mapCodeFromRpcCode(status.code);
  return new FirestoreError(code, status.message || "");
}
function toInt32Proto(serializer, val) {
  if (serializer.useProto3Json || isNullOrUndefined(val)) {
    return val;
  } else {
    return {
      value: val
    };
  }
}
function fromInt32Proto(val) {
  let result;
  if (typeof val === "object") {
    result = val.value;
  } else {
    result = val;
  }
  return isNullOrUndefined(result) ? null : result;
}
function toTimestamp(serializer, timestamp) {
  if (serializer.useProto3Json) {
    const jsDateStr = new Date(timestamp.seconds * 1e3).toISOString();
    const strUntilSeconds = jsDateStr.replace(/\.\d*/, "").replace("Z", "");
    const nanoStr = ("000000000" + timestamp.nanoseconds).slice(-9);
    return `${strUntilSeconds}.${nanoStr}Z`;
  } else {
    return {
      seconds: "" + timestamp.seconds,
      nanos: timestamp.nanoseconds
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
  }
}
function fromTimestamp(date) {
  const timestamp = normalizeTimestamp(date);
  return new Timestamp(timestamp.seconds, timestamp.nanos);
}
function toBytes(serializer, bytes) {
  if (serializer.useProto3Json) {
    return bytes.toBase64();
  } else {
    return bytes.toUint8Array();
  }
}
function fromBytes(serializer, value) {
  if (serializer.useProto3Json) {
    hardAssert(value === void 0 || typeof value === "string");
    return ByteString.fromBase64String(value ? value : "");
  } else {
    hardAssert(value === void 0 || // Check if the value is an instance of both Buffer and Uint8Array,
    // despite the fact that Buffer extends Uint8Array. In some
    // environments, such as jsdom, the prototype chain of Buffer
    // does not indicate that it extends Uint8Array.
    value instanceof Buffer || value instanceof Uint8Array);
    return ByteString.fromUint8Array(value ? value : new Uint8Array());
  }
}
function toVersion(serializer, version2) {
  return toTimestamp(serializer, version2.toTimestamp());
}
function fromVersion(version2) {
  hardAssert(!!version2);
  return SnapshotVersion.fromTimestamp(fromTimestamp(version2));
}
function toResourceName(databaseId, path) {
  return toResourcePath(databaseId, path).canonicalString();
}
function toResourcePath(databaseId, path) {
  const resourcePath = fullyQualifiedPrefixPath(databaseId).child("documents");
  return path === void 0 ? resourcePath : resourcePath.child(path);
}
function fromResourceName(name2) {
  const resource = ResourcePath.fromString(name2);
  hardAssert(isValidResourceName(resource));
  return resource;
}
function toName(serializer, key) {
  return toResourceName(serializer.databaseId, key.path);
}
function fromName(serializer, name2) {
  const resource = fromResourceName(name2);
  if (resource.get(1) !== serializer.databaseId.projectId) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + resource.get(1) + " vs " + serializer.databaseId.projectId);
  }
  if (resource.get(3) !== serializer.databaseId.database) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + resource.get(3) + " vs " + serializer.databaseId.database);
  }
  return new DocumentKey(extractLocalPathFromResourceName(resource));
}
function toQueryPath(serializer, path) {
  return toResourceName(serializer.databaseId, path);
}
function fromQueryPath(name2) {
  const resourceName = fromResourceName(name2);
  if (resourceName.length === 4) {
    return ResourcePath.emptyPath();
  }
  return extractLocalPathFromResourceName(resourceName);
}
function getEncodedDatabaseId(serializer) {
  const path = new ResourcePath(["projects", serializer.databaseId.projectId, "databases", serializer.databaseId.database]);
  return path.canonicalString();
}
function fullyQualifiedPrefixPath(databaseId) {
  return new ResourcePath(["projects", databaseId.projectId, "databases", databaseId.database]);
}
function extractLocalPathFromResourceName(resourceName) {
  hardAssert(resourceName.length > 4 && resourceName.get(4) === "documents");
  return resourceName.popFirst(5);
}
function toMutationDocument(serializer, key, fields) {
  return {
    name: toName(serializer, key),
    fields: fields.value.mapValue.fields
  };
}
function toDocument(serializer, document) {
  return {
    name: toName(serializer, document.key),
    fields: document.data.value.mapValue.fields,
    updateTime: toTimestamp(serializer, document.version.toTimestamp()),
    createTime: toTimestamp(serializer, document.createTime.toTimestamp())
  };
}
function fromDocument(serializer, document, hasCommittedMutations) {
  const key = fromName(serializer, document.name);
  const version2 = fromVersion(document.updateTime);
  const createTime = document.createTime ? fromVersion(document.createTime) : SnapshotVersion.min();
  const data = new ObjectValue({
    mapValue: {
      fields: document.fields
    }
  });
  const result = MutableDocument.newFoundDocument(key, version2, createTime, data);
  if (hasCommittedMutations) {
    result.setHasCommittedMutations();
  }
  return hasCommittedMutations ? result.setHasCommittedMutations() : result;
}
function fromFound(serializer, doc4) {
  hardAssert(!!doc4.found);
  assertPresent(doc4.found.name);
  assertPresent(doc4.found.updateTime);
  const key = fromName(serializer, doc4.found.name);
  const version2 = fromVersion(doc4.found.updateTime);
  const createTime = doc4.found.createTime ? fromVersion(doc4.found.createTime) : SnapshotVersion.min();
  const data = new ObjectValue({
    mapValue: {
      fields: doc4.found.fields
    }
  });
  return MutableDocument.newFoundDocument(key, version2, createTime, data);
}
function fromMissing(serializer, result) {
  hardAssert(!!result.missing);
  hardAssert(!!result.readTime);
  const key = fromName(serializer, result.missing);
  const version2 = fromVersion(result.readTime);
  return MutableDocument.newNoDocument(key, version2);
}
function fromBatchGetDocumentsResponse(serializer, result) {
  if ("found" in result) {
    return fromFound(serializer, result);
  } else if ("missing" in result) {
    return fromMissing(serializer, result);
  }
  return fail();
}
function fromWatchChange(serializer, change) {
  let watchChange;
  if ("targetChange" in change) {
    assertPresent(change.targetChange);
    const state = fromWatchTargetChangeState(change.targetChange.targetChangeType || "NO_CHANGE");
    const targetIds = change.targetChange.targetIds || [];
    const resumeToken = fromBytes(serializer, change.targetChange.resumeToken);
    const causeProto = change.targetChange.cause;
    const cause = causeProto && fromRpcStatus(causeProto);
    watchChange = new WatchTargetChange(state, targetIds, resumeToken, cause || null);
  } else if ("documentChange" in change) {
    assertPresent(change.documentChange);
    const entityChange = change.documentChange;
    assertPresent(entityChange.document);
    assertPresent(entityChange.document.name);
    assertPresent(entityChange.document.updateTime);
    const key = fromName(serializer, entityChange.document.name);
    const version2 = fromVersion(entityChange.document.updateTime);
    const createTime = entityChange.document.createTime ? fromVersion(entityChange.document.createTime) : SnapshotVersion.min();
    const data = new ObjectValue({
      mapValue: {
        fields: entityChange.document.fields
      }
    });
    const doc4 = MutableDocument.newFoundDocument(key, version2, createTime, data);
    const updatedTargetIds = entityChange.targetIds || [];
    const removedTargetIds = entityChange.removedTargetIds || [];
    watchChange = new DocumentWatchChange(updatedTargetIds, removedTargetIds, doc4.key, doc4);
  } else if ("documentDelete" in change) {
    assertPresent(change.documentDelete);
    const docDelete = change.documentDelete;
    assertPresent(docDelete.document);
    const key = fromName(serializer, docDelete.document);
    const version2 = docDelete.readTime ? fromVersion(docDelete.readTime) : SnapshotVersion.min();
    const doc4 = MutableDocument.newNoDocument(key, version2);
    const removedTargetIds = docDelete.removedTargetIds || [];
    watchChange = new DocumentWatchChange([], removedTargetIds, doc4.key, doc4);
  } else if ("documentRemove" in change) {
    assertPresent(change.documentRemove);
    const docRemove = change.documentRemove;
    assertPresent(docRemove.document);
    const key = fromName(serializer, docRemove.document);
    const removedTargetIds = docRemove.removedTargetIds || [];
    watchChange = new DocumentWatchChange([], removedTargetIds, key, null);
  } else if ("filter" in change) {
    assertPresent(change.filter);
    const filter2 = change.filter;
    assertPresent(filter2.targetId);
    const {
      count: count3 = 0,
      unchangedNames
    } = filter2;
    const existenceFilter = new ExistenceFilter(count3, unchangedNames);
    const targetId = filter2.targetId;
    watchChange = new ExistenceFilterChange(targetId, existenceFilter);
  } else {
    return fail();
  }
  return watchChange;
}
function fromWatchTargetChangeState(state) {
  if (state === "NO_CHANGE") {
    return 0;
  } else if (state === "ADD") {
    return 1;
  } else if (state === "REMOVE") {
    return 2;
  } else if (state === "CURRENT") {
    return 3;
  } else if (state === "RESET") {
    return 4;
  } else {
    return fail();
  }
}
function versionFromListenResponse(change) {
  if (!("targetChange" in change)) {
    return SnapshotVersion.min();
  }
  const targetChange = change.targetChange;
  if (targetChange.targetIds && targetChange.targetIds.length) {
    return SnapshotVersion.min();
  }
  if (!targetChange.readTime) {
    return SnapshotVersion.min();
  }
  return fromVersion(targetChange.readTime);
}
function toMutation(serializer, mutation) {
  let result;
  if (mutation instanceof SetMutation) {
    result = {
      update: toMutationDocument(serializer, mutation.key, mutation.value)
    };
  } else if (mutation instanceof DeleteMutation) {
    result = {
      delete: toName(serializer, mutation.key)
    };
  } else if (mutation instanceof PatchMutation) {
    result = {
      update: toMutationDocument(serializer, mutation.key, mutation.data),
      updateMask: toDocumentMask(mutation.fieldMask)
    };
  } else if (mutation instanceof VerifyMutation) {
    result = {
      verify: toName(serializer, mutation.key)
    };
  } else {
    return fail();
  }
  if (mutation.fieldTransforms.length > 0) {
    result.updateTransforms = mutation.fieldTransforms.map((transform) => toFieldTransform(serializer, transform));
  }
  if (!mutation.precondition.isNone) {
    result.currentDocument = toPrecondition(serializer, mutation.precondition);
  }
  return result;
}
function fromMutation(serializer, proto) {
  const precondition = proto.currentDocument ? fromPrecondition(proto.currentDocument) : Precondition.none();
  const fieldTransforms = proto.updateTransforms ? proto.updateTransforms.map((transform) => fromFieldTransform(serializer, transform)) : [];
  if (proto.update) {
    assertPresent(proto.update.name);
    const key = fromName(serializer, proto.update.name);
    const value = new ObjectValue({
      mapValue: {
        fields: proto.update.fields
      }
    });
    if (proto.updateMask) {
      const fieldMask = fromDocumentMask(proto.updateMask);
      return new PatchMutation(key, value, fieldMask, precondition, fieldTransforms);
    } else {
      return new SetMutation(key, value, precondition, fieldTransforms);
    }
  } else if (proto.delete) {
    const key = fromName(serializer, proto.delete);
    return new DeleteMutation(key, precondition);
  } else if (proto.verify) {
    const key = fromName(serializer, proto.verify);
    return new VerifyMutation(key, precondition);
  } else {
    return fail();
  }
}
function toPrecondition(serializer, precondition) {
  if (precondition.updateTime !== void 0) {
    return {
      updateTime: toVersion(serializer, precondition.updateTime)
    };
  } else if (precondition.exists !== void 0) {
    return {
      exists: precondition.exists
    };
  } else {
    return fail();
  }
}
function fromPrecondition(precondition) {
  if (precondition.updateTime !== void 0) {
    return Precondition.updateTime(fromVersion(precondition.updateTime));
  } else if (precondition.exists !== void 0) {
    return Precondition.exists(precondition.exists);
  } else {
    return Precondition.none();
  }
}
function fromWriteResult(proto, commitTime) {
  let version2 = proto.updateTime ? fromVersion(proto.updateTime) : fromVersion(commitTime);
  if (version2.isEqual(SnapshotVersion.min())) {
    version2 = fromVersion(commitTime);
  }
  return new MutationResult(version2, proto.transformResults || []);
}
function fromWriteResults(protos2, commitTime) {
  if (protos2 && protos2.length > 0) {
    hardAssert(commitTime !== void 0);
    return protos2.map((proto) => fromWriteResult(proto, commitTime));
  } else {
    return [];
  }
}
function toFieldTransform(serializer, fieldTransform) {
  const transform = fieldTransform.transform;
  if (transform instanceof ServerTimestampTransform) {
    return {
      fieldPath: fieldTransform.field.canonicalString(),
      setToServerValue: "REQUEST_TIME"
    };
  } else if (transform instanceof ArrayUnionTransformOperation) {
    return {
      fieldPath: fieldTransform.field.canonicalString(),
      appendMissingElements: {
        values: transform.elements
      }
    };
  } else if (transform instanceof ArrayRemoveTransformOperation) {
    return {
      fieldPath: fieldTransform.field.canonicalString(),
      removeAllFromArray: {
        values: transform.elements
      }
    };
  } else if (transform instanceof NumericIncrementTransformOperation) {
    return {
      fieldPath: fieldTransform.field.canonicalString(),
      increment: transform.operand
    };
  } else {
    throw fail();
  }
}
function fromFieldTransform(serializer, proto) {
  let transform = null;
  if ("setToServerValue" in proto) {
    hardAssert(proto.setToServerValue === "REQUEST_TIME");
    transform = new ServerTimestampTransform();
  } else if ("appendMissingElements" in proto) {
    const values = proto.appendMissingElements.values || [];
    transform = new ArrayUnionTransformOperation(values);
  } else if ("removeAllFromArray" in proto) {
    const values = proto.removeAllFromArray.values || [];
    transform = new ArrayRemoveTransformOperation(values);
  } else if ("increment" in proto) {
    transform = new NumericIncrementTransformOperation(serializer, proto.increment);
  } else {
    fail();
  }
  const fieldPath = FieldPath$1.fromServerFormat(proto.fieldPath);
  return new FieldTransform(fieldPath, transform);
}
function toDocumentsTarget(serializer, target) {
  return {
    documents: [toQueryPath(serializer, target.path)]
  };
}
function fromDocumentsTarget(documentsTarget) {
  const count3 = documentsTarget.documents.length;
  hardAssert(count3 === 1);
  const name2 = documentsTarget.documents[0];
  return queryToTarget(newQueryForPath(fromQueryPath(name2)));
}
function toQueryTarget(serializer, target) {
  const queryTarget = {
    structuredQuery: {}
  };
  const path = target.path;
  let parent;
  if (target.collectionGroup !== null) {
    parent = path;
    queryTarget.structuredQuery.from = [{
      collectionId: target.collectionGroup,
      allDescendants: true
    }];
  } else {
    parent = path.popLast();
    queryTarget.structuredQuery.from = [{
      collectionId: path.lastSegment()
    }];
  }
  queryTarget.parent = toQueryPath(serializer, parent);
  const where3 = toFilters(target.filters);
  if (where3) {
    queryTarget.structuredQuery.where = where3;
  }
  const orderBy3 = toOrder(target.orderBy);
  if (orderBy3) {
    queryTarget.structuredQuery.orderBy = orderBy3;
  }
  const limit3 = toInt32Proto(serializer, target.limit);
  if (limit3 !== null) {
    queryTarget.structuredQuery.limit = limit3;
  }
  if (target.startAt) {
    queryTarget.structuredQuery.startAt = toStartAtCursor(target.startAt);
  }
  if (target.endAt) {
    queryTarget.structuredQuery.endAt = toEndAtCursor(target.endAt);
  }
  return {
    queryTarget,
    parent
  };
}
function toRunAggregationQueryRequest(serializer, target, aggregates, skipAliasing) {
  const {
    queryTarget,
    parent
  } = toQueryTarget(serializer, target);
  const aliasMap = {};
  const aggregations = [];
  let aggregationNum = 0;
  aggregates.forEach((aggregate) => {
    const serverAlias = skipAliasing ? aggregate.alias : `aggregate_${aggregationNum++}`;
    aliasMap[serverAlias] = aggregate.alias;
    if (aggregate.aggregateType === "count") {
      aggregations.push({
        alias: serverAlias,
        count: {}
      });
    } else if (aggregate.aggregateType === "avg") {
      aggregations.push({
        alias: serverAlias,
        avg: {
          field: toFieldPathReference(aggregate.fieldPath)
        }
      });
    } else if (aggregate.aggregateType === "sum") {
      aggregations.push({
        alias: serverAlias,
        sum: {
          field: toFieldPathReference(aggregate.fieldPath)
        }
      });
    }
  });
  return {
    request: {
      structuredAggregationQuery: {
        aggregations,
        structuredQuery: queryTarget.structuredQuery
      },
      parent: queryTarget.parent
    },
    aliasMap,
    parent
  };
}
function convertQueryTargetToQuery(target) {
  let path = fromQueryPath(target.parent);
  const query3 = target.structuredQuery;
  const fromCount = query3.from ? query3.from.length : 0;
  let collectionGroup3 = null;
  if (fromCount > 0) {
    hardAssert(fromCount === 1);
    const from3 = query3.from[0];
    if (from3.allDescendants) {
      collectionGroup3 = from3.collectionId;
    } else {
      path = path.child(from3.collectionId);
    }
  }
  let filterBy = [];
  if (query3.where) {
    filterBy = fromFilters(query3.where);
  }
  let orderBy3 = [];
  if (query3.orderBy) {
    orderBy3 = fromOrder(query3.orderBy);
  }
  let limit3 = null;
  if (query3.limit) {
    limit3 = fromInt32Proto(query3.limit);
  }
  let startAt3 = null;
  if (query3.startAt) {
    startAt3 = fromStartAtCursor(query3.startAt);
  }
  let endAt3 = null;
  if (query3.endAt) {
    endAt3 = fromEndAtCursor(query3.endAt);
  }
  return newQuery(path, collectionGroup3, orderBy3, filterBy, limit3, "F", startAt3, endAt3);
}
function fromQueryTarget(target) {
  return queryToTarget(convertQueryTargetToQuery(target));
}
function toListenRequestLabels(serializer, targetData) {
  const value = toLabel(targetData.purpose);
  if (value == null) {
    return null;
  } else {
    return {
      "goog-listen-tags": value
    };
  }
}
function toLabel(purpose) {
  switch (purpose) {
    case "TargetPurposeListen":
      return null;
    case "TargetPurposeExistenceFilterMismatch":
      return "existence-filter-mismatch";
    case "TargetPurposeExistenceFilterMismatchBloom":
      return "existence-filter-mismatch-bloom";
    case "TargetPurposeLimboResolution":
      return "limbo-document";
    default:
      return fail();
  }
}
function toTarget(serializer, targetData) {
  let result;
  const target = targetData.target;
  if (targetIsDocumentTarget(target)) {
    result = {
      documents: toDocumentsTarget(serializer, target)
    };
  } else {
    result = {
      query: toQueryTarget(serializer, target).queryTarget
    };
  }
  result.targetId = targetData.targetId;
  if (targetData.resumeToken.approximateByteSize() > 0) {
    result.resumeToken = toBytes(serializer, targetData.resumeToken);
    const expectedCount = toInt32Proto(serializer, targetData.expectedCount);
    if (expectedCount !== null) {
      result.expectedCount = expectedCount;
    }
  } else if (targetData.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
    result.readTime = toTimestamp(serializer, targetData.snapshotVersion.toTimestamp());
    const expectedCount = toInt32Proto(serializer, targetData.expectedCount);
    if (expectedCount !== null) {
      result.expectedCount = expectedCount;
    }
  }
  return result;
}
function toFilters(filters) {
  if (filters.length === 0) {
    return;
  }
  return toFilter(CompositeFilter.create(
    filters,
    "and"
    /* CompositeOperator.AND */
  ));
}
function fromFilters(filter2) {
  const result = fromFilter(filter2);
  if (result instanceof CompositeFilter && compositeFilterIsFlatConjunction(result)) {
    return result.getFilters();
  }
  return [result];
}
function fromFilter(filter2) {
  if (filter2.unaryFilter !== void 0) {
    return fromUnaryFilter(filter2);
  } else if (filter2.fieldFilter !== void 0) {
    return fromFieldFilter(filter2);
  } else if (filter2.compositeFilter !== void 0) {
    return fromCompositeFilter(filter2);
  } else {
    return fail();
  }
}
function toOrder(orderBys) {
  if (orderBys.length === 0) {
    return;
  }
  return orderBys.map((order) => toPropertyOrder(order));
}
function fromOrder(orderBys) {
  return orderBys.map((order) => fromPropertyOrder(order));
}
function toStartAtCursor(cursor) {
  return {
    before: cursor.inclusive,
    values: cursor.position
  };
}
function toEndAtCursor(cursor) {
  return {
    before: !cursor.inclusive,
    values: cursor.position
  };
}
function fromStartAtCursor(cursor) {
  const inclusive = !!cursor.before;
  const position = cursor.values || [];
  return new Bound(position, inclusive);
}
function fromEndAtCursor(cursor) {
  const inclusive = !cursor.before;
  const position = cursor.values || [];
  return new Bound(position, inclusive);
}
function toDirection(dir) {
  return DIRECTIONS[dir];
}
function fromDirection(dir) {
  switch (dir) {
    case "ASCENDING":
      return "asc";
    case "DESCENDING":
      return "desc";
    default:
      return void 0;
  }
}
function toOperatorName(op) {
  return OPERATORS[op];
}
function toCompositeOperatorName(op) {
  return COMPOSITE_OPERATORS[op];
}
function fromOperatorName(op) {
  switch (op) {
    case "EQUAL":
      return "==";
    case "NOT_EQUAL":
      return "!=";
    case "GREATER_THAN":
      return ">";
    case "GREATER_THAN_OR_EQUAL":
      return ">=";
    case "LESS_THAN":
      return "<";
    case "LESS_THAN_OR_EQUAL":
      return "<=";
    case "ARRAY_CONTAINS":
      return "array-contains";
    case "IN":
      return "in";
    case "NOT_IN":
      return "not-in";
    case "ARRAY_CONTAINS_ANY":
      return "array-contains-any";
    case "OPERATOR_UNSPECIFIED":
      return fail();
    default:
      return fail();
  }
}
function fromCompositeOperatorName(op) {
  switch (op) {
    case "AND":
      return "and";
    case "OR":
      return "or";
    default:
      return fail();
  }
}
function toFieldPathReference(path) {
  return {
    fieldPath: path.canonicalString()
  };
}
function fromFieldPathReference(fieldReference) {
  return FieldPath$1.fromServerFormat(fieldReference.fieldPath);
}
function toPropertyOrder(orderBy3) {
  return {
    field: toFieldPathReference(orderBy3.field),
    direction: toDirection(orderBy3.dir)
  };
}
function fromPropertyOrder(orderBy3) {
  return new OrderBy(fromFieldPathReference(orderBy3.field), fromDirection(orderBy3.direction));
}
function toFilter(filter2) {
  if (filter2 instanceof FieldFilter) {
    return toUnaryOrFieldFilter(filter2);
  } else if (filter2 instanceof CompositeFilter) {
    return toCompositeFilter(filter2);
  } else {
    return fail();
  }
}
function toCompositeFilter(filter2) {
  const protos2 = filter2.getFilters().map((filter3) => toFilter(filter3));
  if (protos2.length === 1) {
    return protos2[0];
  }
  return {
    compositeFilter: {
      op: toCompositeOperatorName(filter2.op),
      filters: protos2
    }
  };
}
function toUnaryOrFieldFilter(filter2) {
  if (filter2.op === "==") {
    if (isNanValue(filter2.value)) {
      return {
        unaryFilter: {
          field: toFieldPathReference(filter2.field),
          op: "IS_NAN"
        }
      };
    } else if (isNullValue(filter2.value)) {
      return {
        unaryFilter: {
          field: toFieldPathReference(filter2.field),
          op: "IS_NULL"
        }
      };
    }
  } else if (filter2.op === "!=") {
    if (isNanValue(filter2.value)) {
      return {
        unaryFilter: {
          field: toFieldPathReference(filter2.field),
          op: "IS_NOT_NAN"
        }
      };
    } else if (isNullValue(filter2.value)) {
      return {
        unaryFilter: {
          field: toFieldPathReference(filter2.field),
          op: "IS_NOT_NULL"
        }
      };
    }
  }
  return {
    fieldFilter: {
      field: toFieldPathReference(filter2.field),
      op: toOperatorName(filter2.op),
      value: filter2.value
    }
  };
}
function fromUnaryFilter(filter2) {
  switch (filter2.unaryFilter.op) {
    case "IS_NAN":
      const nanField = fromFieldPathReference(filter2.unaryFilter.field);
      return FieldFilter.create(nanField, "==", {
        doubleValue: NaN
      });
    case "IS_NULL":
      const nullField = fromFieldPathReference(filter2.unaryFilter.field);
      return FieldFilter.create(nullField, "==", {
        nullValue: "NULL_VALUE"
      });
    case "IS_NOT_NAN":
      const notNanField = fromFieldPathReference(filter2.unaryFilter.field);
      return FieldFilter.create(notNanField, "!=", {
        doubleValue: NaN
      });
    case "IS_NOT_NULL":
      const notNullField = fromFieldPathReference(filter2.unaryFilter.field);
      return FieldFilter.create(notNullField, "!=", {
        nullValue: "NULL_VALUE"
      });
    case "OPERATOR_UNSPECIFIED":
      return fail();
    default:
      return fail();
  }
}
function fromFieldFilter(filter2) {
  return FieldFilter.create(fromFieldPathReference(filter2.fieldFilter.field), fromOperatorName(filter2.fieldFilter.op), filter2.fieldFilter.value);
}
function fromCompositeFilter(filter2) {
  return CompositeFilter.create(filter2.compositeFilter.filters.map((filter3) => fromFilter(filter3)), fromCompositeOperatorName(filter2.compositeFilter.op));
}
function toDocumentMask(fieldMask) {
  const canonicalFields = [];
  fieldMask.fields.forEach((field) => canonicalFields.push(field.canonicalString()));
  return {
    fieldPaths: canonicalFields
  };
}
function fromDocumentMask(proto) {
  const paths = proto.fieldPaths || [];
  return new FieldMask(paths.map((path) => FieldPath$1.fromServerFormat(path)));
}
function isValidResourceName(path) {
  return path.length >= 4 && path.get(0) === "projects" && path.get(2) === "databases";
}
var TargetData = class _TargetData {
  constructor(target, targetId, purpose, sequenceNumber, snapshotVersion = SnapshotVersion.min(), lastLimboFreeSnapshotVersion = SnapshotVersion.min(), resumeToken = ByteString.EMPTY_BYTE_STRING, expectedCount = null) {
    this.target = target;
    this.targetId = targetId;
    this.purpose = purpose;
    this.sequenceNumber = sequenceNumber;
    this.snapshotVersion = snapshotVersion;
    this.lastLimboFreeSnapshotVersion = lastLimboFreeSnapshotVersion;
    this.resumeToken = resumeToken;
    this.expectedCount = expectedCount;
  }
  /** Creates a new target data instance with an updated sequence number. */
  withSequenceNumber(sequenceNumber) {
    return new _TargetData(this.target, this.targetId, this.purpose, sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount);
  }
  /**
   * Creates a new target data instance with an updated resume token and
   * snapshot version.
   */
  withResumeToken(resumeToken, snapshotVersion) {
    return new _TargetData(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      snapshotVersion,
      this.lastLimboFreeSnapshotVersion,
      resumeToken,
      /* expectedCount= */
      null
    );
  }
  /**
   * Creates a new target data instance with an updated expected count.
   */
  withExpectedCount(expectedCount) {
    return new _TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, expectedCount);
  }
  /**
   * Creates a new target data instance with an updated last limbo free
   * snapshot version number.
   */
  withLastLimboFreeSnapshotVersion(lastLimboFreeSnapshotVersion) {
    return new _TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount);
  }
};
var LocalSerializer = class {
  constructor(remoteSerializer) {
    this.remoteSerializer = remoteSerializer;
  }
};
function fromDbRemoteDocument(localSerializer, remoteDoc) {
  let doc4;
  if (remoteDoc.document) {
    doc4 = fromDocument(localSerializer.remoteSerializer, remoteDoc.document, !!remoteDoc.hasCommittedMutations);
  } else if (remoteDoc.noDocument) {
    const key = DocumentKey.fromSegments(remoteDoc.noDocument.path);
    const version2 = fromDbTimestamp(remoteDoc.noDocument.readTime);
    doc4 = MutableDocument.newNoDocument(key, version2);
    if (remoteDoc.hasCommittedMutations) {
      doc4.setHasCommittedMutations();
    }
  } else if (remoteDoc.unknownDocument) {
    const key = DocumentKey.fromSegments(remoteDoc.unknownDocument.path);
    const version2 = fromDbTimestamp(remoteDoc.unknownDocument.version);
    doc4 = MutableDocument.newUnknownDocument(key, version2);
  } else {
    return fail();
  }
  if (remoteDoc.readTime) {
    doc4.setReadTime(fromDbTimestampKey(remoteDoc.readTime));
  }
  return doc4;
}
function toDbRemoteDocument(localSerializer, document) {
  const key = document.key;
  const remoteDoc = {
    prefixPath: key.getCollectionPath().popLast().toArray(),
    collectionGroup: key.collectionGroup,
    documentId: key.path.lastSegment(),
    readTime: toDbTimestampKey(document.readTime),
    hasCommittedMutations: document.hasCommittedMutations
  };
  if (document.isFoundDocument()) {
    remoteDoc.document = toDocument(localSerializer.remoteSerializer, document);
  } else if (document.isNoDocument()) {
    remoteDoc.noDocument = {
      path: key.path.toArray(),
      readTime: toDbTimestamp(document.version)
    };
  } else if (document.isUnknownDocument()) {
    remoteDoc.unknownDocument = {
      path: key.path.toArray(),
      version: toDbTimestamp(document.version)
    };
  } else {
    return fail();
  }
  return remoteDoc;
}
function toDbTimestampKey(snapshotVersion) {
  const timestamp = snapshotVersion.toTimestamp();
  return [timestamp.seconds, timestamp.nanoseconds];
}
function fromDbTimestampKey(dbTimestampKey) {
  const timestamp = new Timestamp(dbTimestampKey[0], dbTimestampKey[1]);
  return SnapshotVersion.fromTimestamp(timestamp);
}
function toDbTimestamp(snapshotVersion) {
  const timestamp = snapshotVersion.toTimestamp();
  return {
    seconds: timestamp.seconds,
    nanoseconds: timestamp.nanoseconds
  };
}
function fromDbTimestamp(dbTimestamp) {
  const timestamp = new Timestamp(dbTimestamp.seconds, dbTimestamp.nanoseconds);
  return SnapshotVersion.fromTimestamp(timestamp);
}
function toDbMutationBatch(localSerializer, userId, batch) {
  const serializedBaseMutations = batch.baseMutations.map((m) => toMutation(localSerializer.remoteSerializer, m));
  const serializedMutations = batch.mutations.map((m) => toMutation(localSerializer.remoteSerializer, m));
  return {
    userId,
    batchId: batch.batchId,
    localWriteTimeMs: batch.localWriteTime.toMillis(),
    baseMutations: serializedBaseMutations,
    mutations: serializedMutations
  };
}
function fromDbMutationBatch(localSerializer, dbBatch) {
  const baseMutations = (dbBatch.baseMutations || []).map((m) => fromMutation(localSerializer.remoteSerializer, m));
  for (let i = 0; i < dbBatch.mutations.length - 1; ++i) {
    const currentMutation = dbBatch.mutations[i];
    const hasTransform = i + 1 < dbBatch.mutations.length && dbBatch.mutations[i + 1].transform !== void 0;
    if (hasTransform) {
      const transformMutation = dbBatch.mutations[i + 1];
      currentMutation.updateTransforms = transformMutation.transform.fieldTransforms;
      dbBatch.mutations.splice(i + 1, 1);
      ++i;
    }
  }
  const mutations = dbBatch.mutations.map((m) => fromMutation(localSerializer.remoteSerializer, m));
  const timestamp = Timestamp.fromMillis(dbBatch.localWriteTimeMs);
  return new MutationBatch(dbBatch.batchId, timestamp, baseMutations, mutations);
}
function fromDbTarget(dbTarget) {
  const version2 = fromDbTimestamp(dbTarget.readTime);
  const lastLimboFreeSnapshotVersion = dbTarget.lastLimboFreeSnapshotVersion !== void 0 ? fromDbTimestamp(dbTarget.lastLimboFreeSnapshotVersion) : SnapshotVersion.min();
  let target;
  if (isDocumentQuery(dbTarget.query)) {
    target = fromDocumentsTarget(dbTarget.query);
  } else {
    target = fromQueryTarget(dbTarget.query);
  }
  return new TargetData(target, dbTarget.targetId, "TargetPurposeListen", dbTarget.lastListenSequenceNumber, version2, lastLimboFreeSnapshotVersion, ByteString.fromBase64String(dbTarget.resumeToken));
}
function toDbTarget(localSerializer, targetData) {
  const dbTimestamp = toDbTimestamp(targetData.snapshotVersion);
  const dbLastLimboFreeTimestamp = toDbTimestamp(targetData.lastLimboFreeSnapshotVersion);
  let queryProto;
  if (targetIsDocumentTarget(targetData.target)) {
    queryProto = toDocumentsTarget(localSerializer.remoteSerializer, targetData.target);
  } else {
    queryProto = toQueryTarget(localSerializer.remoteSerializer, targetData.target).queryTarget;
  }
  const resumeToken = targetData.resumeToken.toBase64();
  return {
    targetId: targetData.targetId,
    canonicalId: canonifyTarget(targetData.target),
    readTime: dbTimestamp,
    resumeToken,
    lastListenSequenceNumber: targetData.sequenceNumber,
    lastLimboFreeSnapshotVersion: dbLastLimboFreeTimestamp,
    query: queryProto
  };
}
function isDocumentQuery(dbQuery) {
  return dbQuery.documents !== void 0;
}
function fromDbBundle(dbBundle) {
  return {
    id: dbBundle.bundleId,
    createTime: fromDbTimestamp(dbBundle.createTime),
    version: dbBundle.version
  };
}
function toDbBundle(metadata) {
  return {
    bundleId: metadata.id,
    createTime: toDbTimestamp(fromVersion(metadata.createTime)),
    version: metadata.version
  };
}
function fromDbNamedQuery(dbNamedQuery) {
  return {
    name: dbNamedQuery.name,
    query: fromBundledQuery(dbNamedQuery.bundledQuery),
    readTime: fromDbTimestamp(dbNamedQuery.readTime)
  };
}
function toDbNamedQuery(query3) {
  return {
    name: query3.name,
    readTime: toDbTimestamp(fromVersion(query3.readTime)),
    bundledQuery: query3.bundledQuery
  };
}
function fromBundledQuery(bundledQuery) {
  const query3 = convertQueryTargetToQuery({
    parent: bundledQuery.parent,
    structuredQuery: bundledQuery.structuredQuery
  });
  if (bundledQuery.limitType === "LAST") {
    return queryWithLimit(
      query3,
      query3.limit,
      "L"
      /* LimitType.Last */
    );
  }
  return query3;
}
function fromProtoNamedQuery(namedQuery3) {
  return {
    name: namedQuery3.name,
    query: fromBundledQuery(namedQuery3.bundledQuery),
    readTime: fromVersion(namedQuery3.readTime)
  };
}
function fromBundleMetadata(metadata) {
  return {
    id: metadata.id,
    version: metadata.version,
    createTime: fromVersion(metadata.createTime)
  };
}
function fromDbDocumentOverlay(localSerializer, dbDocumentOverlay) {
  return new Overlay(dbDocumentOverlay.largestBatchId, fromMutation(localSerializer.remoteSerializer, dbDocumentOverlay.overlayMutation));
}
function toDbDocumentOverlay(localSerializer, userId, overlay) {
  const [_, collectionPath, documentId3] = toDbDocumentOverlayKey(userId, overlay.mutation.key);
  return {
    userId,
    collectionPath,
    documentId: documentId3,
    collectionGroup: overlay.mutation.key.getCollectionGroup(),
    largestBatchId: overlay.largestBatchId,
    overlayMutation: toMutation(localSerializer.remoteSerializer, overlay.mutation)
  };
}
function toDbDocumentOverlayKey(userId, docKey) {
  const docId = docKey.path.lastSegment();
  const collectionPath = encodeResourcePath(docKey.path.popLast());
  return [userId, collectionPath, docId];
}
function toDbIndexConfiguration(index) {
  return {
    indexId: index.indexId,
    collectionGroup: index.collectionGroup,
    fields: index.fields.map((s) => [s.fieldPath.canonicalString(), s.kind])
  };
}
function fromDbIndexConfiguration(index, state) {
  const decodedState = state ? new IndexState(state.sequenceNumber, new IndexOffset(fromDbTimestamp(state.readTime), new DocumentKey(decodeResourcePath(state.documentKey)), state.largestBatchId)) : IndexState.empty();
  const decodedSegments = index.fields.map(([fieldPath, kind]) => new IndexSegment(FieldPath$1.fromServerFormat(fieldPath), kind));
  return new FieldIndex(index.indexId, index.collectionGroup, decodedSegments, decodedState);
}
function toDbIndexState(indexId, uid, sequenceNumber, offset) {
  return {
    indexId,
    uid,
    sequenceNumber,
    readTime: toDbTimestamp(offset.readTime),
    documentKey: encodeResourcePath(offset.documentKey.path),
    largestBatchId: offset.largestBatchId
  };
}
var IndexedDbBundleCache = class {
  getBundleMetadata(transaction, bundleId) {
    return bundlesStore(transaction).get(bundleId).next((bundle) => {
      if (bundle) {
        return fromDbBundle(bundle);
      }
      return void 0;
    });
  }
  saveBundleMetadata(transaction, bundleMetadata) {
    return bundlesStore(transaction).put(toDbBundle(bundleMetadata));
  }
  getNamedQuery(transaction, queryName) {
    return namedQueriesStore(transaction).get(queryName).next((query3) => {
      if (query3) {
        return fromDbNamedQuery(query3);
      }
      return void 0;
    });
  }
  saveNamedQuery(transaction, query3) {
    return namedQueriesStore(transaction).put(toDbNamedQuery(query3));
  }
};
function bundlesStore(txn) {
  return getStore(txn, DbBundleStore);
}
function namedQueriesStore(txn) {
  return getStore(txn, DbNamedQueryStore);
}
var IndexedDbDocumentOverlayCache = class _IndexedDbDocumentOverlayCache {
  /**
   * @param serializer - The document serializer.
   * @param userId - The userId for which we are accessing overlays.
   */
  constructor(serializer, userId) {
    this.serializer = serializer;
    this.userId = userId;
  }
  static forUser(serializer, user) {
    const userId = user.uid || "";
    return new _IndexedDbDocumentOverlayCache(serializer, userId);
  }
  getOverlay(transaction, key) {
    return documentOverlayStore(transaction).get(toDbDocumentOverlayKey(this.userId, key)).next((dbOverlay) => {
      if (dbOverlay) {
        return fromDbDocumentOverlay(this.serializer, dbOverlay);
      }
      return null;
    });
  }
  getOverlays(transaction, keys) {
    const result = newOverlayMap();
    return PersistencePromise.forEach(keys, (key) => {
      return this.getOverlay(transaction, key).next((overlay) => {
        if (overlay !== null) {
          result.set(key, overlay);
        }
      });
    }).next(() => result);
  }
  saveOverlays(transaction, largestBatchId, overlays) {
    const promises = [];
    overlays.forEach((_, mutation) => {
      const overlay = new Overlay(largestBatchId, mutation);
      promises.push(this.saveOverlay(transaction, overlay));
    });
    return PersistencePromise.waitFor(promises);
  }
  removeOverlaysForBatchId(transaction, documentKeys, batchId) {
    const collectionPaths = /* @__PURE__ */ new Set();
    documentKeys.forEach((key) => collectionPaths.add(encodeResourcePath(key.getCollectionPath())));
    const promises = [];
    collectionPaths.forEach((collectionPath) => {
      const range = IDBKeyRange.bound(
        [this.userId, collectionPath, batchId],
        [this.userId, collectionPath, batchId + 1],
        /*lowerOpen=*/
        false,
        /*upperOpen=*/
        true
      );
      promises.push(documentOverlayStore(transaction).deleteAll(DbDocumentOverlayCollectionPathOverlayIndex, range));
    });
    return PersistencePromise.waitFor(promises);
  }
  getOverlaysForCollection(transaction, collection4, sinceBatchId) {
    const result = newOverlayMap();
    const collectionPath = encodeResourcePath(collection4);
    const range = IDBKeyRange.bound(
      [this.userId, collectionPath, sinceBatchId],
      [this.userId, collectionPath, Number.POSITIVE_INFINITY],
      /*lowerOpen=*/
      true
    );
    return documentOverlayStore(transaction).loadAll(DbDocumentOverlayCollectionPathOverlayIndex, range).next((dbOverlays) => {
      for (const dbOverlay of dbOverlays) {
        const overlay = fromDbDocumentOverlay(this.serializer, dbOverlay);
        result.set(overlay.getKey(), overlay);
      }
      return result;
    });
  }
  getOverlaysForCollectionGroup(transaction, collectionGroup3, sinceBatchId, count3) {
    const result = newOverlayMap();
    let currentBatchId = void 0;
    const range = IDBKeyRange.bound(
      [this.userId, collectionGroup3, sinceBatchId],
      [this.userId, collectionGroup3, Number.POSITIVE_INFINITY],
      /*lowerOpen=*/
      true
    );
    return documentOverlayStore(transaction).iterate({
      index: DbDocumentOverlayCollectionGroupOverlayIndex,
      range
    }, (_, dbOverlay, control) => {
      const overlay = fromDbDocumentOverlay(this.serializer, dbOverlay);
      if (result.size() < count3 || overlay.largestBatchId === currentBatchId) {
        result.set(overlay.getKey(), overlay);
        currentBatchId = overlay.largestBatchId;
      } else {
        control.done();
      }
    }).next(() => result);
  }
  saveOverlay(transaction, overlay) {
    return documentOverlayStore(transaction).put(toDbDocumentOverlay(this.serializer, this.userId, overlay));
  }
};
function documentOverlayStore(txn) {
  return getStore(txn, DbDocumentOverlayStore);
}
var IndexedDbGlobalsCache = class {
  globalsStore(txn) {
    return getStore(txn, DbGlobalsStore);
  }
  getSessionToken(txn) {
    const globals = this.globalsStore(txn);
    return globals.get("sessionToken").next((global2) => {
      const value = global2 === null || global2 === void 0 ? void 0 : global2.value;
      return value ? ByteString.fromUint8Array(value) : ByteString.EMPTY_BYTE_STRING;
    });
  }
  setSessionToken(txn, sessionToken) {
    const globals = this.globalsStore(txn);
    return globals.put({
      name: "sessionToken",
      value: sessionToken.toUint8Array()
    });
  }
};
var INDEX_TYPE_NULL = 5;
var INDEX_TYPE_BOOLEAN = 10;
var INDEX_TYPE_NAN = 13;
var INDEX_TYPE_NUMBER = 15;
var INDEX_TYPE_TIMESTAMP = 20;
var INDEX_TYPE_STRING = 25;
var INDEX_TYPE_BLOB = 30;
var INDEX_TYPE_REFERENCE = 37;
var INDEX_TYPE_GEOPOINT = 45;
var INDEX_TYPE_ARRAY = 50;
var INDEX_TYPE_VECTOR = 53;
var INDEX_TYPE_MAP = 55;
var INDEX_TYPE_REFERENCE_SEGMENT = 60;
var NOT_TRUNCATED = 2;
var FirestoreIndexValueWriter = class {
  constructor() {
  }
  // The write methods below short-circuit writing terminators for values
  // containing a (terminating) truncated value.
  //
  // As an example, consider the resulting encoding for:
  //
  // ["bar", [2, "foo"]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TERM, TERM, TERM)
  // ["bar", [2, truncated("foo")]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TRUNC)
  // ["bar", truncated(["foo"])] -> (STRING, "bar", TERM, ARRAY. STRING, "foo", TERM, TRUNC)
  /** Writes an index value.  */
  writeIndexValue(value, encoder) {
    this.writeIndexValueAux(value, encoder);
    encoder.writeInfinity();
  }
  writeIndexValueAux(indexValue, encoder) {
    if ("nullValue" in indexValue) {
      this.writeValueTypeLabel(encoder, INDEX_TYPE_NULL);
    } else if ("booleanValue" in indexValue) {
      this.writeValueTypeLabel(encoder, INDEX_TYPE_BOOLEAN);
      encoder.writeNumber(indexValue.booleanValue ? 1 : 0);
    } else if ("integerValue" in indexValue) {
      this.writeValueTypeLabel(encoder, INDEX_TYPE_NUMBER);
      encoder.writeNumber(normalizeNumber(indexValue.integerValue));
    } else if ("doubleValue" in indexValue) {
      const n = normalizeNumber(indexValue.doubleValue);
      if (isNaN(n)) {
        this.writeValueTypeLabel(encoder, INDEX_TYPE_NAN);
      } else {
        this.writeValueTypeLabel(encoder, INDEX_TYPE_NUMBER);
        if (isNegativeZero(n)) {
          encoder.writeNumber(0);
        } else {
          encoder.writeNumber(n);
        }
      }
    } else if ("timestampValue" in indexValue) {
      let timestamp = indexValue.timestampValue;
      this.writeValueTypeLabel(encoder, INDEX_TYPE_TIMESTAMP);
      if (typeof timestamp === "string") {
        timestamp = normalizeTimestamp(timestamp);
      }
      encoder.writeString(`${timestamp.seconds || ""}`);
      encoder.writeNumber(timestamp.nanos || 0);
    } else if ("stringValue" in indexValue) {
      this.writeIndexString(indexValue.stringValue, encoder);
      this.writeTruncationMarker(encoder);
    } else if ("bytesValue" in indexValue) {
      this.writeValueTypeLabel(encoder, INDEX_TYPE_BLOB);
      encoder.writeBytes(normalizeByteString(indexValue.bytesValue));
      this.writeTruncationMarker(encoder);
    } else if ("referenceValue" in indexValue) {
      this.writeIndexEntityRef(indexValue.referenceValue, encoder);
    } else if ("geoPointValue" in indexValue) {
      const geoPoint = indexValue.geoPointValue;
      this.writeValueTypeLabel(encoder, INDEX_TYPE_GEOPOINT);
      encoder.writeNumber(geoPoint.latitude || 0);
      encoder.writeNumber(geoPoint.longitude || 0);
    } else if ("mapValue" in indexValue) {
      if (isMaxValue(indexValue)) {
        this.writeValueTypeLabel(encoder, Number.MAX_SAFE_INTEGER);
      } else if (isVectorValue(indexValue)) {
        this.writeIndexVector(indexValue.mapValue, encoder);
      } else {
        this.writeIndexMap(indexValue.mapValue, encoder);
        this.writeTruncationMarker(encoder);
      }
    } else if ("arrayValue" in indexValue) {
      this.writeIndexArray(indexValue.arrayValue, encoder);
      this.writeTruncationMarker(encoder);
    } else {
      fail();
    }
  }
  writeIndexString(stringIndexValue, encoder) {
    this.writeValueTypeLabel(encoder, INDEX_TYPE_STRING);
    this.writeUnlabeledIndexString(stringIndexValue, encoder);
  }
  writeUnlabeledIndexString(stringIndexValue, encoder) {
    encoder.writeString(stringIndexValue);
  }
  writeIndexMap(mapIndexValue, encoder) {
    const map2 = mapIndexValue.fields || {};
    this.writeValueTypeLabel(encoder, INDEX_TYPE_MAP);
    for (const key of Object.keys(map2)) {
      this.writeIndexString(key, encoder);
      this.writeIndexValueAux(map2[key], encoder);
    }
  }
  writeIndexVector(mapIndexValue, encoder) {
    var _a, _b;
    const map2 = mapIndexValue.fields || {};
    this.writeValueTypeLabel(encoder, INDEX_TYPE_VECTOR);
    const key = VECTOR_MAP_VECTORS_KEY;
    const length = ((_b = (_a = map2[key].arrayValue) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.length) || 0;
    this.writeValueTypeLabel(encoder, INDEX_TYPE_NUMBER);
    encoder.writeNumber(normalizeNumber(length));
    this.writeIndexString(key, encoder);
    this.writeIndexValueAux(map2[key], encoder);
  }
  writeIndexArray(arrayIndexValue, encoder) {
    const values = arrayIndexValue.values || [];
    this.writeValueTypeLabel(encoder, INDEX_TYPE_ARRAY);
    for (const element of values) {
      this.writeIndexValueAux(element, encoder);
    }
  }
  writeIndexEntityRef(referenceValue, encoder) {
    this.writeValueTypeLabel(encoder, INDEX_TYPE_REFERENCE);
    const path = DocumentKey.fromName(referenceValue).path;
    path.forEach((segment) => {
      this.writeValueTypeLabel(encoder, INDEX_TYPE_REFERENCE_SEGMENT);
      this.writeUnlabeledIndexString(segment, encoder);
    });
  }
  writeValueTypeLabel(encoder, typeOrder2) {
    encoder.writeNumber(typeOrder2);
  }
  writeTruncationMarker(encoder) {
    encoder.writeNumber(NOT_TRUNCATED);
  }
};
FirestoreIndexValueWriter.INSTANCE = new FirestoreIndexValueWriter();
var MIN_SURROGATE = "\uD800";
var MAX_SURROGATE = "\uDBFF";
var ESCAPE1 = 0;
var NULL_BYTE = 255;
var SEPARATOR = 1;
var ESCAPE2 = 255;
var INFINITY = 255;
var FF_BYTE = 0;
var LONG_SIZE = 64;
var BYTE_SIZE = 8;
var DEFAULT_BUFFER_SIZE = 1024;
function doubleToLongBits(value) {
  const dv = new DataView(new ArrayBuffer(8));
  dv.setFloat64(
    0,
    value,
    /* littleEndian= */
    false
  );
  return new Uint8Array(dv.buffer);
}
function numberOfLeadingZerosInByte(x) {
  if (x === 0) {
    return 8;
  }
  let zeros = 0;
  if (x >> 4 === 0) {
    zeros += 4;
    x = x << 4;
  }
  if (x >> 6 === 0) {
    zeros += 2;
    x = x << 2;
  }
  if (x >> 7 === 0) {
    zeros += 1;
  }
  return zeros;
}
function numberOfLeadingZeros(bytes) {
  let leadingZeros = 0;
  for (let i = 0; i < 8; ++i) {
    const zeros = numberOfLeadingZerosInByte(bytes[i] & 255);
    leadingZeros += zeros;
    if (zeros !== 8) {
      break;
    }
  }
  return leadingZeros;
}
function unsignedNumLength(value) {
  const numBits = LONG_SIZE - numberOfLeadingZeros(value);
  return Math.ceil(numBits / BYTE_SIZE);
}
var OrderedCodeWriter = class {
  constructor() {
    this.buffer = new Uint8Array(DEFAULT_BUFFER_SIZE);
    this.position = 0;
  }
  writeBytesAscending(value) {
    const it = value[Symbol.iterator]();
    let byte = it.next();
    while (!byte.done) {
      this.writeByteAscending(byte.value);
      byte = it.next();
    }
    this.writeSeparatorAscending();
  }
  writeBytesDescending(value) {
    const it = value[Symbol.iterator]();
    let byte = it.next();
    while (!byte.done) {
      this.writeByteDescending(byte.value);
      byte = it.next();
    }
    this.writeSeparatorDescending();
  }
  /** Writes utf8 bytes into this byte sequence, ascending. */
  writeUtf8Ascending(sequence) {
    for (const c of sequence) {
      const charCode = c.charCodeAt(0);
      if (charCode < 128) {
        this.writeByteAscending(charCode);
      } else if (charCode < 2048) {
        this.writeByteAscending(15 << 6 | charCode >>> 6);
        this.writeByteAscending(128 | 63 & charCode);
      } else if (c < MIN_SURROGATE || MAX_SURROGATE < c) {
        this.writeByteAscending(15 << 5 | charCode >>> 12);
        this.writeByteAscending(128 | 63 & charCode >>> 6);
        this.writeByteAscending(128 | 63 & charCode);
      } else {
        const codePoint = c.codePointAt(0);
        this.writeByteAscending(15 << 4 | codePoint >>> 18);
        this.writeByteAscending(128 | 63 & codePoint >>> 12);
        this.writeByteAscending(128 | 63 & codePoint >>> 6);
        this.writeByteAscending(128 | 63 & codePoint);
      }
    }
    this.writeSeparatorAscending();
  }
  /** Writes utf8 bytes into this byte sequence, descending */
  writeUtf8Descending(sequence) {
    for (const c of sequence) {
      const charCode = c.charCodeAt(0);
      if (charCode < 128) {
        this.writeByteDescending(charCode);
      } else if (charCode < 2048) {
        this.writeByteDescending(15 << 6 | charCode >>> 6);
        this.writeByteDescending(128 | 63 & charCode);
      } else if (c < MIN_SURROGATE || MAX_SURROGATE < c) {
        this.writeByteDescending(15 << 5 | charCode >>> 12);
        this.writeByteDescending(128 | 63 & charCode >>> 6);
        this.writeByteDescending(128 | 63 & charCode);
      } else {
        const codePoint = c.codePointAt(0);
        this.writeByteDescending(15 << 4 | codePoint >>> 18);
        this.writeByteDescending(128 | 63 & codePoint >>> 12);
        this.writeByteDescending(128 | 63 & codePoint >>> 6);
        this.writeByteDescending(128 | 63 & codePoint);
      }
    }
    this.writeSeparatorDescending();
  }
  writeNumberAscending(val) {
    const value = this.toOrderedBits(val);
    const len = unsignedNumLength(value);
    this.ensureAvailable(1 + len);
    this.buffer[this.position++] = len & 255;
    for (let i = value.length - len; i < value.length; ++i) {
      this.buffer[this.position++] = value[i] & 255;
    }
  }
  writeNumberDescending(val) {
    const value = this.toOrderedBits(val);
    const len = unsignedNumLength(value);
    this.ensureAvailable(1 + len);
    this.buffer[this.position++] = ~(len & 255);
    for (let i = value.length - len; i < value.length; ++i) {
      this.buffer[this.position++] = ~(value[i] & 255);
    }
  }
  /**
   * Writes the "infinity" byte sequence that sorts after all other byte
   * sequences written in ascending order.
   */
  writeInfinityAscending() {
    this.writeEscapedByteAscending(ESCAPE2);
    this.writeEscapedByteAscending(INFINITY);
  }
  /**
   * Writes the "infinity" byte sequence that sorts before all other byte
   * sequences written in descending order.
   */
  writeInfinityDescending() {
    this.writeEscapedByteDescending(ESCAPE2);
    this.writeEscapedByteDescending(INFINITY);
  }
  /**
   * Resets the buffer such that it is the same as when it was newly
   * constructed.
   */
  reset() {
    this.position = 0;
  }
  seed(encodedBytes) {
    this.ensureAvailable(encodedBytes.length);
    this.buffer.set(encodedBytes, this.position);
    this.position += encodedBytes.length;
  }
  /** Makes a copy of the encoded bytes in this buffer.  */
  encodedBytes() {
    return this.buffer.slice(0, this.position);
  }
  /**
   * Encodes `val` into an encoding so that the order matches the IEEE 754
   * floating-point comparison results with the following exceptions:
   *   -0.0 < 0.0
   *   all non-NaN < NaN
   *   NaN = NaN
   */
  toOrderedBits(val) {
    const value = doubleToLongBits(val);
    const isNegative = (value[0] & 128) !== 0;
    value[0] ^= isNegative ? 255 : 128;
    for (let i = 1; i < value.length; ++i) {
      value[i] ^= isNegative ? 255 : 0;
    }
    return value;
  }
  /** Writes a single byte ascending to the buffer. */
  writeByteAscending(b) {
    const masked = b & 255;
    if (masked === ESCAPE1) {
      this.writeEscapedByteAscending(ESCAPE1);
      this.writeEscapedByteAscending(NULL_BYTE);
    } else if (masked === ESCAPE2) {
      this.writeEscapedByteAscending(ESCAPE2);
      this.writeEscapedByteAscending(FF_BYTE);
    } else {
      this.writeEscapedByteAscending(masked);
    }
  }
  /** Writes a single byte descending to the buffer.  */
  writeByteDescending(b) {
    const masked = b & 255;
    if (masked === ESCAPE1) {
      this.writeEscapedByteDescending(ESCAPE1);
      this.writeEscapedByteDescending(NULL_BYTE);
    } else if (masked === ESCAPE2) {
      this.writeEscapedByteDescending(ESCAPE2);
      this.writeEscapedByteDescending(FF_BYTE);
    } else {
      this.writeEscapedByteDescending(b);
    }
  }
  writeSeparatorAscending() {
    this.writeEscapedByteAscending(ESCAPE1);
    this.writeEscapedByteAscending(SEPARATOR);
  }
  writeSeparatorDescending() {
    this.writeEscapedByteDescending(ESCAPE1);
    this.writeEscapedByteDescending(SEPARATOR);
  }
  writeEscapedByteAscending(b) {
    this.ensureAvailable(1);
    this.buffer[this.position++] = b;
  }
  writeEscapedByteDescending(b) {
    this.ensureAvailable(1);
    this.buffer[this.position++] = ~b;
  }
  ensureAvailable(bytes) {
    const minCapacity = bytes + this.position;
    if (minCapacity <= this.buffer.length) {
      return;
    }
    let newLength = this.buffer.length * 2;
    if (newLength < minCapacity) {
      newLength = minCapacity;
    }
    const newBuffer = new Uint8Array(newLength);
    newBuffer.set(this.buffer);
    this.buffer = newBuffer;
  }
};
var AscendingIndexByteEncoder = class {
  constructor(orderedCode) {
    this.orderedCode = orderedCode;
  }
  writeBytes(value) {
    this.orderedCode.writeBytesAscending(value);
  }
  writeString(value) {
    this.orderedCode.writeUtf8Ascending(value);
  }
  writeNumber(value) {
    this.orderedCode.writeNumberAscending(value);
  }
  writeInfinity() {
    this.orderedCode.writeInfinityAscending();
  }
};
var DescendingIndexByteEncoder = class {
  constructor(orderedCode) {
    this.orderedCode = orderedCode;
  }
  writeBytes(value) {
    this.orderedCode.writeBytesDescending(value);
  }
  writeString(value) {
    this.orderedCode.writeUtf8Descending(value);
  }
  writeNumber(value) {
    this.orderedCode.writeNumberDescending(value);
  }
  writeInfinity() {
    this.orderedCode.writeInfinityDescending();
  }
};
var IndexByteEncoder = class {
  constructor() {
    this.orderedCode = new OrderedCodeWriter();
    this.ascending = new AscendingIndexByteEncoder(this.orderedCode);
    this.descending = new DescendingIndexByteEncoder(this.orderedCode);
  }
  seed(encodedBytes) {
    this.orderedCode.seed(encodedBytes);
  }
  forKind(kind) {
    return kind === 0 ? this.ascending : this.descending;
  }
  encodedBytes() {
    return this.orderedCode.encodedBytes();
  }
  reset() {
    this.orderedCode.reset();
  }
};
var IndexEntry = class _IndexEntry {
  constructor(indexId, documentKey, arrayValue, directionalValue) {
    this.indexId = indexId;
    this.documentKey = documentKey;
    this.arrayValue = arrayValue;
    this.directionalValue = directionalValue;
  }
  /**
   * Returns an IndexEntry entry that sorts immediately after the current
   * directional value.
   */
  successor() {
    const currentLength = this.directionalValue.length;
    const newLength = currentLength === 0 || this.directionalValue[currentLength - 1] === 255 ? currentLength + 1 : currentLength;
    const successor = new Uint8Array(newLength);
    successor.set(this.directionalValue, 0);
    if (newLength !== currentLength) {
      successor.set([0], this.directionalValue.length);
    } else {
      ++successor[successor.length - 1];
    }
    return new _IndexEntry(this.indexId, this.documentKey, this.arrayValue, successor);
  }
};
function indexEntryComparator(left, right) {
  let cmp = left.indexId - right.indexId;
  if (cmp !== 0) {
    return cmp;
  }
  cmp = compareByteArrays(left.arrayValue, right.arrayValue);
  if (cmp !== 0) {
    return cmp;
  }
  cmp = compareByteArrays(left.directionalValue, right.directionalValue);
  if (cmp !== 0) {
    return cmp;
  }
  return DocumentKey.comparator(left.documentKey, right.documentKey);
}
function compareByteArrays(left, right) {
  for (let i = 0; i < left.length && i < right.length; ++i) {
    const compare = left[i] - right[i];
    if (compare !== 0) {
      return compare;
    }
  }
  return left.length - right.length;
}
var TargetIndexMatcher = class {
  constructor(target) {
    this.inequalityFilters = new SortedSet((lhs, rhs) => FieldPath$1.comparator(lhs.field, rhs.field));
    this.collectionId = target.collectionGroup != null ? target.collectionGroup : target.path.lastSegment();
    this.orderBys = target.orderBy;
    this.equalityFilters = [];
    for (const filter2 of target.filters) {
      const fieldFilter = filter2;
      if (fieldFilter.isInequality()) {
        this.inequalityFilters = this.inequalityFilters.add(fieldFilter);
      } else {
        this.equalityFilters.push(fieldFilter);
      }
    }
  }
  get hasMultipleInequality() {
    return this.inequalityFilters.size > 1;
  }
  /**
   * Returns whether the index can be used to serve the TargetIndexMatcher's
   * target.
   *
   * An index is considered capable of serving the target when:
   * - The target uses all index segments for its filters and orderBy clauses.
   *   The target can have additional filter and orderBy clauses, but not
   *   fewer.
   * - If an ArrayContains/ArrayContainsAnyfilter is used, the index must also
   *   have a corresponding `CONTAINS` segment.
   * - All directional index segments can be mapped to the target as a series of
   *   equality filters, a single inequality filter and a series of orderBy
   *   clauses.
   * - The segments that represent the equality filters may appear out of order.
   * - The optional segment for the inequality filter must appear after all
   *   equality segments.
   * - The segments that represent that orderBy clause of the target must appear
   *   in order after all equality and inequality segments. Single orderBy
   *   clauses cannot be skipped, but a continuous orderBy suffix may be
   *   omitted.
   */
  servedByIndex(index) {
    hardAssert(index.collectionGroup === this.collectionId);
    if (this.hasMultipleInequality) {
      return false;
    }
    const arraySegment = fieldIndexGetArraySegment(index);
    if (arraySegment !== void 0 && !this.hasMatchingEqualityFilter(arraySegment)) {
      return false;
    }
    const segments = fieldIndexGetDirectionalSegments(index);
    let equalitySegments = /* @__PURE__ */ new Set();
    let segmentIndex = 0;
    let orderBysIndex = 0;
    for (; segmentIndex < segments.length; ++segmentIndex) {
      if (this.hasMatchingEqualityFilter(segments[segmentIndex])) {
        equalitySegments = equalitySegments.add(segments[segmentIndex].fieldPath.canonicalString());
      } else {
        break;
      }
    }
    if (segmentIndex === segments.length) {
      return true;
    }
    if (this.inequalityFilters.size > 0) {
      const inequalityFilter = this.inequalityFilters.getIterator().getNext();
      if (!equalitySegments.has(inequalityFilter.field.canonicalString())) {
        const segment = segments[segmentIndex];
        if (!this.matchesFilter(inequalityFilter, segment) || !this.matchesOrderBy(this.orderBys[orderBysIndex++], segment)) {
          return false;
        }
      }
      ++segmentIndex;
    }
    for (; segmentIndex < segments.length; ++segmentIndex) {
      const segment = segments[segmentIndex];
      if (orderBysIndex >= this.orderBys.length || !this.matchesOrderBy(this.orderBys[orderBysIndex++], segment)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Returns a full matched field index for this target. Currently multiple
   * inequality query is not supported so function returns null.
   */
  buildTargetIndex() {
    if (this.hasMultipleInequality) {
      return null;
    }
    let uniqueFields = new SortedSet(FieldPath$1.comparator);
    const segments = [];
    for (const filter2 of this.equalityFilters) {
      if (filter2.field.isKeyField()) {
        continue;
      }
      const isArrayOperator = filter2.op === "array-contains" || filter2.op === "array-contains-any";
      if (isArrayOperator) {
        segments.push(new IndexSegment(
          filter2.field,
          2
          /* IndexKind.CONTAINS */
        ));
      } else {
        if (uniqueFields.has(filter2.field)) {
          continue;
        }
        uniqueFields = uniqueFields.add(filter2.field);
        segments.push(new IndexSegment(
          filter2.field,
          0
          /* IndexKind.ASCENDING */
        ));
      }
    }
    for (const orderBy3 of this.orderBys) {
      if (orderBy3.field.isKeyField()) {
        continue;
      }
      if (uniqueFields.has(orderBy3.field)) {
        continue;
      }
      uniqueFields = uniqueFields.add(orderBy3.field);
      segments.push(new IndexSegment(
        orderBy3.field,
        orderBy3.dir === "asc" ? 0 : 1
        /* IndexKind.DESCENDING */
      ));
    }
    return new FieldIndex(FieldIndex.UNKNOWN_ID, this.collectionId, segments, IndexState.empty());
  }
  hasMatchingEqualityFilter(segment) {
    for (const filter2 of this.equalityFilters) {
      if (this.matchesFilter(filter2, segment)) {
        return true;
      }
    }
    return false;
  }
  matchesFilter(filter2, segment) {
    if (filter2 === void 0 || !filter2.field.isEqual(segment.fieldPath)) {
      return false;
    }
    const isArrayOperator = filter2.op === "array-contains" || filter2.op === "array-contains-any";
    return segment.kind === 2 === isArrayOperator;
  }
  matchesOrderBy(orderBy3, segment) {
    if (!orderBy3.field.isEqual(segment.fieldPath)) {
      return false;
    }
    return segment.kind === 0 && orderBy3.dir === "asc" || segment.kind === 1 && orderBy3.dir === "desc";
  }
};
function computeInExpansion(filter2) {
  var _a, _b;
  hardAssert(filter2 instanceof FieldFilter || filter2 instanceof CompositeFilter);
  if (filter2 instanceof FieldFilter) {
    if (filter2 instanceof InFilter) {
      const expandedFilters2 = ((_b = (_a = filter2.value.arrayValue) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.map((value) => FieldFilter.create(filter2.field, "==", value))) || [];
      return CompositeFilter.create(
        expandedFilters2,
        "or"
        /* CompositeOperator.OR */
      );
    } else {
      return filter2;
    }
  }
  const expandedFilters = filter2.filters.map((subfilter) => computeInExpansion(subfilter));
  return CompositeFilter.create(expandedFilters, filter2.op);
}
function getDnfTerms(filter2) {
  if (filter2.getFilters().length === 0) {
    return [];
  }
  const result = computeDistributedNormalForm(computeInExpansion(filter2));
  hardAssert(isDisjunctiveNormalForm(result));
  if (isSingleFieldFilter(result) || isFlatConjunction(result)) {
    return [result];
  }
  return result.getFilters();
}
function isSingleFieldFilter(filter2) {
  return filter2 instanceof FieldFilter;
}
function isFlatConjunction(filter2) {
  return filter2 instanceof CompositeFilter && compositeFilterIsFlatConjunction(filter2);
}
function isDisjunctiveNormalForm(filter2) {
  return isSingleFieldFilter(filter2) || isFlatConjunction(filter2) || isDisjunctionOfFieldFiltersAndFlatConjunctions(filter2);
}
function isDisjunctionOfFieldFiltersAndFlatConjunctions(filter2) {
  if (filter2 instanceof CompositeFilter) {
    if (compositeFilterIsDisjunction(filter2)) {
      for (const subFilter of filter2.getFilters()) {
        if (!isSingleFieldFilter(subFilter) && !isFlatConjunction(subFilter)) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}
function computeDistributedNormalForm(filter2) {
  hardAssert(filter2 instanceof FieldFilter || filter2 instanceof CompositeFilter);
  if (filter2 instanceof FieldFilter) {
    return filter2;
  }
  if (filter2.filters.length === 1) {
    return computeDistributedNormalForm(filter2.filters[0]);
  }
  const result = filter2.filters.map((subfilter) => computeDistributedNormalForm(subfilter));
  let newFilter = CompositeFilter.create(result, filter2.op);
  newFilter = applyAssociation(newFilter);
  if (isDisjunctiveNormalForm(newFilter)) {
    return newFilter;
  }
  hardAssert(newFilter instanceof CompositeFilter);
  hardAssert(compositeFilterIsConjunction(newFilter));
  hardAssert(newFilter.filters.length > 1);
  return newFilter.filters.reduce((runningResult, filter3) => applyDistribution(runningResult, filter3));
}
function applyDistribution(lhs, rhs) {
  hardAssert(lhs instanceof FieldFilter || lhs instanceof CompositeFilter);
  hardAssert(rhs instanceof FieldFilter || rhs instanceof CompositeFilter);
  let result;
  if (lhs instanceof FieldFilter) {
    if (rhs instanceof FieldFilter) {
      result = applyDistributionFieldFilters(lhs, rhs);
    } else {
      result = applyDistributionFieldAndCompositeFilters(lhs, rhs);
    }
  } else {
    if (rhs instanceof FieldFilter) {
      result = applyDistributionFieldAndCompositeFilters(rhs, lhs);
    } else {
      result = applyDistributionCompositeFilters(lhs, rhs);
    }
  }
  return applyAssociation(result);
}
function applyDistributionFieldFilters(lhs, rhs) {
  return CompositeFilter.create(
    [lhs, rhs],
    "and"
    /* CompositeOperator.AND */
  );
}
function applyDistributionCompositeFilters(lhs, rhs) {
  hardAssert(lhs.filters.length > 0 && rhs.filters.length > 0);
  if (compositeFilterIsConjunction(lhs) && compositeFilterIsConjunction(rhs)) {
    return compositeFilterWithAddedFilters(lhs, rhs.getFilters());
  }
  const disjunctionSide = compositeFilterIsDisjunction(lhs) ? lhs : rhs;
  const otherSide = compositeFilterIsDisjunction(lhs) ? rhs : lhs;
  const results = disjunctionSide.filters.map((subfilter) => applyDistribution(subfilter, otherSide));
  return CompositeFilter.create(
    results,
    "or"
    /* CompositeOperator.OR */
  );
}
function applyDistributionFieldAndCompositeFilters(fieldFilter, compositeFilter) {
  if (compositeFilterIsConjunction(compositeFilter)) {
    return compositeFilterWithAddedFilters(compositeFilter, fieldFilter.getFilters());
  } else {
    const newFilters = compositeFilter.filters.map((subfilter) => applyDistribution(fieldFilter, subfilter));
    return CompositeFilter.create(
      newFilters,
      "or"
      /* CompositeOperator.OR */
    );
  }
}
function applyAssociation(filter2) {
  hardAssert(filter2 instanceof FieldFilter || filter2 instanceof CompositeFilter);
  if (filter2 instanceof FieldFilter) {
    return filter2;
  }
  const filters = filter2.getFilters();
  if (filters.length === 1) {
    return applyAssociation(filters[0]);
  }
  if (compositeFilterIsFlat(filter2)) {
    return filter2;
  }
  const updatedFilters = filters.map((subfilter) => applyAssociation(subfilter));
  const newSubfilters = [];
  updatedFilters.forEach((subfilter) => {
    if (subfilter instanceof FieldFilter) {
      newSubfilters.push(subfilter);
    } else if (subfilter instanceof CompositeFilter) {
      if (subfilter.op === filter2.op) {
        newSubfilters.push(...subfilter.filters);
      } else {
        newSubfilters.push(subfilter);
      }
    }
  });
  if (newSubfilters.length === 1) {
    return newSubfilters[0];
  }
  return CompositeFilter.create(newSubfilters, filter2.op);
}
var MemoryIndexManager = class {
  constructor() {
    this.collectionParentIndex = new MemoryCollectionParentIndex();
  }
  addToCollectionParentIndex(transaction, collectionPath) {
    this.collectionParentIndex.add(collectionPath);
    return PersistencePromise.resolve();
  }
  getCollectionParents(transaction, collectionId) {
    return PersistencePromise.resolve(this.collectionParentIndex.getEntries(collectionId));
  }
  addFieldIndex(transaction, index) {
    return PersistencePromise.resolve();
  }
  deleteFieldIndex(transaction, index) {
    return PersistencePromise.resolve();
  }
  deleteAllFieldIndexes(transaction) {
    return PersistencePromise.resolve();
  }
  createTargetIndexes(transaction, target) {
    return PersistencePromise.resolve();
  }
  getDocumentsMatchingTarget(transaction, target) {
    return PersistencePromise.resolve(null);
  }
  getIndexType(transaction, target) {
    return PersistencePromise.resolve(
      0
      /* IndexType.NONE */
    );
  }
  getFieldIndexes(transaction, collectionGroup3) {
    return PersistencePromise.resolve([]);
  }
  getNextCollectionGroupToUpdate(transaction) {
    return PersistencePromise.resolve(null);
  }
  getMinOffset(transaction, target) {
    return PersistencePromise.resolve(IndexOffset.min());
  }
  getMinOffsetFromCollectionGroup(transaction, collectionGroup3) {
    return PersistencePromise.resolve(IndexOffset.min());
  }
  updateCollectionGroup(transaction, collectionGroup3, offset) {
    return PersistencePromise.resolve();
  }
  updateIndexEntries(transaction, documents) {
    return PersistencePromise.resolve();
  }
};
var MemoryCollectionParentIndex = class {
  constructor() {
    this.index = {};
  }
  // Returns false if the entry already existed.
  add(collectionPath) {
    const collectionId = collectionPath.lastSegment();
    const parentPath = collectionPath.popLast();
    const existingParents = this.index[collectionId] || new SortedSet(ResourcePath.comparator);
    const added = !existingParents.has(parentPath);
    this.index[collectionId] = existingParents.add(parentPath);
    return added;
  }
  has(collectionPath) {
    const collectionId = collectionPath.lastSegment();
    const parentPath = collectionPath.popLast();
    const existingParents = this.index[collectionId];
    return existingParents && existingParents.has(parentPath);
  }
  getEntries(collectionId) {
    const parentPaths = this.index[collectionId] || new SortedSet(ResourcePath.comparator);
    return parentPaths.toArray();
  }
};
var LOG_TAG$f = "IndexedDbIndexManager";
var EMPTY_VALUE = new Uint8Array(0);
var IndexedDbIndexManager = class {
  constructor(user, databaseId) {
    this.databaseId = databaseId;
    this.collectionParentsCache = new MemoryCollectionParentIndex();
    this.targetToDnfSubTargets = new ObjectMap((t) => canonifyTarget(t), (l, r) => targetEquals(l, r));
    this.uid = user.uid || "";
  }
  /**
   * Adds a new entry to the collection parent index.
   *
   * Repeated calls for the same collectionPath should be avoided within a
   * transaction as IndexedDbIndexManager only caches writes once a transaction
   * has been committed.
   */
  addToCollectionParentIndex(transaction, collectionPath) {
    if (!this.collectionParentsCache.has(collectionPath)) {
      const collectionId = collectionPath.lastSegment();
      const parentPath = collectionPath.popLast();
      transaction.addOnCommittedListener(() => {
        this.collectionParentsCache.add(collectionPath);
      });
      const collectionParent = {
        collectionId,
        parent: encodeResourcePath(parentPath)
      };
      return collectionParentsStore(transaction).put(collectionParent);
    }
    return PersistencePromise.resolve();
  }
  getCollectionParents(transaction, collectionId) {
    const parentPaths = [];
    const range = IDBKeyRange.bound(
      [collectionId, ""],
      [immediateSuccessor(collectionId), ""],
      /*lowerOpen=*/
      false,
      /*upperOpen=*/
      true
    );
    return collectionParentsStore(transaction).loadAll(range).next((entries) => {
      for (const entry of entries) {
        if (entry.collectionId !== collectionId) {
          break;
        }
        parentPaths.push(decodeResourcePath(entry.parent));
      }
      return parentPaths;
    });
  }
  addFieldIndex(transaction, index) {
    const indexes = indexConfigurationStore(transaction);
    const dbIndex = toDbIndexConfiguration(index);
    delete dbIndex.indexId;
    const result = indexes.add(dbIndex);
    if (index.indexState) {
      const states = indexStateStore(transaction);
      return result.next((indexId) => {
        states.put(toDbIndexState(indexId, this.uid, index.indexState.sequenceNumber, index.indexState.offset));
      });
    } else {
      return result.next();
    }
  }
  deleteFieldIndex(transaction, index) {
    const indexes = indexConfigurationStore(transaction);
    const states = indexStateStore(transaction);
    const entries = indexEntriesStore(transaction);
    return indexes.delete(index.indexId).next(() => states.delete(IDBKeyRange.bound(
      [index.indexId],
      [index.indexId + 1],
      /*lowerOpen=*/
      false,
      /*upperOpen=*/
      true
    ))).next(() => entries.delete(IDBKeyRange.bound(
      [index.indexId],
      [index.indexId + 1],
      /*lowerOpen=*/
      false,
      /*upperOpen=*/
      true
    )));
  }
  deleteAllFieldIndexes(transaction) {
    const indexes = indexConfigurationStore(transaction);
    const entries = indexEntriesStore(transaction);
    const states = indexStateStore(transaction);
    return indexes.deleteAll().next(() => entries.deleteAll()).next(() => states.deleteAll());
  }
  createTargetIndexes(transaction, target) {
    return PersistencePromise.forEach(this.getSubTargets(target), (subTarget) => {
      return this.getIndexType(transaction, subTarget).next((type) => {
        if (type === 0 || type === 1) {
          const targetIndexMatcher = new TargetIndexMatcher(subTarget);
          const fieldIndex = targetIndexMatcher.buildTargetIndex();
          if (fieldIndex != null) {
            return this.addFieldIndex(transaction, fieldIndex);
          }
        }
      });
    });
  }
  getDocumentsMatchingTarget(transaction, target) {
    const indexEntries = indexEntriesStore(transaction);
    let canServeTarget = true;
    const indexes = /* @__PURE__ */ new Map();
    return PersistencePromise.forEach(this.getSubTargets(target), (subTarget) => {
      return this.getFieldIndex(transaction, subTarget).next((index) => {
        canServeTarget && (canServeTarget = !!index);
        indexes.set(subTarget, index);
      });
    }).next(() => {
      if (!canServeTarget) {
        return PersistencePromise.resolve(null);
      } else {
        let existingKeys = documentKeySet();
        const result = [];
        return PersistencePromise.forEach(indexes, (index, subTarget) => {
          logDebug(LOG_TAG$f, `Using index ${fieldIndexToString(index)} to execute ${canonifyTarget(target)}`);
          const arrayValues = targetGetArrayValues(subTarget, index);
          const notInValues = targetGetNotInValues(subTarget, index);
          const lowerBound = targetGetLowerBound(subTarget, index);
          const upperBound = targetGetUpperBound(subTarget, index);
          const lowerBoundEncoded = this.encodeBound(index, subTarget, lowerBound);
          const upperBoundEncoded = this.encodeBound(index, subTarget, upperBound);
          const notInEncoded = this.encodeValues(index, subTarget, notInValues);
          const indexRanges = this.generateIndexRanges(index.indexId, arrayValues, lowerBoundEncoded, lowerBound.inclusive, upperBoundEncoded, upperBound.inclusive, notInEncoded);
          return PersistencePromise.forEach(indexRanges, (indexRange) => {
            return indexEntries.loadFirst(indexRange, target.limit).next((entries) => {
              entries.forEach((entry) => {
                const documentKey = DocumentKey.fromSegments(entry.documentKey);
                if (!existingKeys.has(documentKey)) {
                  existingKeys = existingKeys.add(documentKey);
                  result.push(documentKey);
                }
              });
            });
          });
        }).next(() => result);
      }
    });
  }
  getSubTargets(target) {
    let subTargets = this.targetToDnfSubTargets.get(target);
    if (subTargets) {
      return subTargets;
    }
    if (target.filters.length === 0) {
      subTargets = [target];
    } else {
      const dnf = getDnfTerms(CompositeFilter.create(
        target.filters,
        "and"
        /* CompositeOperator.AND */
      ));
      subTargets = dnf.map((term) => newTarget(target.path, target.collectionGroup, target.orderBy, term.getFilters(), target.limit, target.startAt, target.endAt));
    }
    this.targetToDnfSubTargets.set(target, subTargets);
    return subTargets;
  }
  /**
   * Constructs a key range query on `DbIndexEntryStore` that unions all
   * bounds.
   */
  generateIndexRanges(indexId, arrayValues, lowerBounds, lowerBoundInclusive, upperBounds, upperBoundInclusive, notInValues) {
    const totalScans = (arrayValues != null ? arrayValues.length : 1) * Math.max(lowerBounds.length, upperBounds.length);
    const scansPerArrayElement = totalScans / (arrayValues != null ? arrayValues.length : 1);
    const indexRanges = [];
    for (let i = 0; i < totalScans; ++i) {
      const arrayValue = arrayValues ? this.encodeSingleElement(arrayValues[i / scansPerArrayElement]) : EMPTY_VALUE;
      const lowerBound = this.generateLowerBound(indexId, arrayValue, lowerBounds[i % scansPerArrayElement], lowerBoundInclusive);
      const upperBound = this.generateUpperBound(indexId, arrayValue, upperBounds[i % scansPerArrayElement], upperBoundInclusive);
      const notInBound = notInValues.map((notIn) => this.generateLowerBound(
        indexId,
        arrayValue,
        notIn,
        /* inclusive= */
        true
      ));
      indexRanges.push(...this.createRange(lowerBound, upperBound, notInBound));
    }
    return indexRanges;
  }
  /** Generates the lower bound for `arrayValue` and `directionalValue`. */
  generateLowerBound(indexId, arrayValue, directionalValue, inclusive) {
    const entry = new IndexEntry(indexId, DocumentKey.empty(), arrayValue, directionalValue);
    return inclusive ? entry : entry.successor();
  }
  /** Generates the upper bound for `arrayValue` and `directionalValue`. */
  generateUpperBound(indexId, arrayValue, directionalValue, inclusive) {
    const entry = new IndexEntry(indexId, DocumentKey.empty(), arrayValue, directionalValue);
    return inclusive ? entry.successor() : entry;
  }
  getFieldIndex(transaction, target) {
    const targetIndexMatcher = new TargetIndexMatcher(target);
    const collectionGroup3 = target.collectionGroup != null ? target.collectionGroup : target.path.lastSegment();
    return this.getFieldIndexes(transaction, collectionGroup3).next((indexes) => {
      let index = null;
      for (const candidate of indexes) {
        const matches = targetIndexMatcher.servedByIndex(candidate);
        if (matches && (!index || candidate.fields.length > index.fields.length)) {
          index = candidate;
        }
      }
      return index;
    });
  }
  getIndexType(transaction, target) {
    let indexType = 2;
    const subTargets = this.getSubTargets(target);
    return PersistencePromise.forEach(subTargets, (target2) => {
      return this.getFieldIndex(transaction, target2).next((index) => {
        if (!index) {
          indexType = 0;
        } else if (indexType !== 0 && index.fields.length < targetGetSegmentCount(target2)) {
          indexType = 1;
        }
      });
    }).next(() => {
      if (targetHasLimit(target) && subTargets.length > 1 && indexType === 2) {
        return 1;
      }
      return indexType;
    });
  }
  /**
   * Returns the byte encoded form of the directional values in the field index.
   * Returns `null` if the document does not have all fields specified in the
   * index.
   */
  encodeDirectionalElements(fieldIndex, document) {
    const encoder = new IndexByteEncoder();
    for (const segment of fieldIndexGetDirectionalSegments(fieldIndex)) {
      const field = document.data.field(segment.fieldPath);
      if (field == null) {
        return null;
      }
      const directionalEncoder = encoder.forKind(segment.kind);
      FirestoreIndexValueWriter.INSTANCE.writeIndexValue(field, directionalEncoder);
    }
    return encoder.encodedBytes();
  }
  /** Encodes a single value to the ascending index format. */
  encodeSingleElement(value) {
    const encoder = new IndexByteEncoder();
    FirestoreIndexValueWriter.INSTANCE.writeIndexValue(value, encoder.forKind(
      0
      /* IndexKind.ASCENDING */
    ));
    return encoder.encodedBytes();
  }
  /**
   * Returns an encoded form of the document key that sorts based on the key
   * ordering of the field index.
   */
  encodeDirectionalKey(fieldIndex, documentKey) {
    const encoder = new IndexByteEncoder();
    FirestoreIndexValueWriter.INSTANCE.writeIndexValue(refValue(this.databaseId, documentKey), encoder.forKind(fieldIndexGetKeyOrder(fieldIndex)));
    return encoder.encodedBytes();
  }
  /**
   * Encodes the given field values according to the specification in `target`.
   * For IN queries, a list of possible values is returned.
   */
  encodeValues(fieldIndex, target, values) {
    if (values === null) {
      return [];
    }
    let encoders = [];
    encoders.push(new IndexByteEncoder());
    let valueIdx = 0;
    for (const segment of fieldIndexGetDirectionalSegments(fieldIndex)) {
      const value = values[valueIdx++];
      for (const encoder of encoders) {
        if (this.isInFilter(target, segment.fieldPath) && isArray(value)) {
          encoders = this.expandIndexValues(encoders, segment, value);
        } else {
          const directionalEncoder = encoder.forKind(segment.kind);
          FirestoreIndexValueWriter.INSTANCE.writeIndexValue(value, directionalEncoder);
        }
      }
    }
    return this.getEncodedBytes(encoders);
  }
  /**
   * Encodes the given bounds according to the specification in `target`. For IN
   * queries, a list of possible values is returned.
   */
  encodeBound(fieldIndex, target, bound) {
    return this.encodeValues(fieldIndex, target, bound.position);
  }
  /** Returns the byte representation for the provided encoders. */
  getEncodedBytes(encoders) {
    const result = [];
    for (let i = 0; i < encoders.length; ++i) {
      result[i] = encoders[i].encodedBytes();
    }
    return result;
  }
  /**
   * Creates a separate encoder for each element of an array.
   *
   * The method appends each value to all existing encoders (e.g. filter("a",
   * "==", "a1").filter("b", "in", ["b1", "b2"]) becomes ["a1,b1", "a1,b2"]). A
   * list of new encoders is returned.
   */
  expandIndexValues(encoders, segment, value) {
    const prefixes = [...encoders];
    const results = [];
    for (const arrayElement of value.arrayValue.values || []) {
      for (const prefix of prefixes) {
        const clonedEncoder = new IndexByteEncoder();
        clonedEncoder.seed(prefix.encodedBytes());
        FirestoreIndexValueWriter.INSTANCE.writeIndexValue(arrayElement, clonedEncoder.forKind(segment.kind));
        results.push(clonedEncoder);
      }
    }
    return results;
  }
  isInFilter(target, fieldPath) {
    return !!target.filters.find((f) => f instanceof FieldFilter && f.field.isEqual(fieldPath) && (f.op === "in" || f.op === "not-in"));
  }
  getFieldIndexes(transaction, collectionGroup3) {
    const indexes = indexConfigurationStore(transaction);
    const states = indexStateStore(transaction);
    return (collectionGroup3 ? indexes.loadAll(DbIndexConfigurationCollectionGroupIndex, IDBKeyRange.bound(collectionGroup3, collectionGroup3)) : indexes.loadAll()).next((indexConfigs) => {
      const result = [];
      return PersistencePromise.forEach(indexConfigs, (indexConfig) => {
        return states.get([indexConfig.indexId, this.uid]).next((indexState) => {
          result.push(fromDbIndexConfiguration(indexConfig, indexState));
        });
      }).next(() => result);
    });
  }
  getNextCollectionGroupToUpdate(transaction) {
    return this.getFieldIndexes(transaction).next((indexes) => {
      if (indexes.length === 0) {
        return null;
      }
      indexes.sort((l, r) => {
        const cmp = l.indexState.sequenceNumber - r.indexState.sequenceNumber;
        return cmp !== 0 ? cmp : primitiveComparator(l.collectionGroup, r.collectionGroup);
      });
      return indexes[0].collectionGroup;
    });
  }
  updateCollectionGroup(transaction, collectionGroup3, offset) {
    const indexes = indexConfigurationStore(transaction);
    const states = indexStateStore(transaction);
    return this.getNextSequenceNumber(transaction).next((nextSequenceNumber) => indexes.loadAll(DbIndexConfigurationCollectionGroupIndex, IDBKeyRange.bound(collectionGroup3, collectionGroup3)).next((configs) => PersistencePromise.forEach(configs, (config) => states.put(toDbIndexState(config.indexId, this.uid, nextSequenceNumber, offset)))));
  }
  updateIndexEntries(transaction, documents) {
    const memoizedIndexes = /* @__PURE__ */ new Map();
    return PersistencePromise.forEach(documents, (key, doc4) => {
      const memoizedCollectionIndexes = memoizedIndexes.get(key.collectionGroup);
      const fieldIndexes = memoizedCollectionIndexes ? PersistencePromise.resolve(memoizedCollectionIndexes) : this.getFieldIndexes(transaction, key.collectionGroup);
      return fieldIndexes.next((fieldIndexes2) => {
        memoizedIndexes.set(key.collectionGroup, fieldIndexes2);
        return PersistencePromise.forEach(fieldIndexes2, (fieldIndex) => {
          return this.getExistingIndexEntries(transaction, key, fieldIndex).next((existingEntries) => {
            const newEntries = this.computeIndexEntries(doc4, fieldIndex);
            if (!existingEntries.isEqual(newEntries)) {
              return this.updateEntries(transaction, doc4, fieldIndex, existingEntries, newEntries);
            }
            return PersistencePromise.resolve();
          });
        });
      });
    });
  }
  addIndexEntry(transaction, document, fieldIndex, indexEntry) {
    const indexEntries = indexEntriesStore(transaction);
    return indexEntries.put({
      indexId: indexEntry.indexId,
      uid: this.uid,
      arrayValue: indexEntry.arrayValue,
      directionalValue: indexEntry.directionalValue,
      orderedDocumentKey: this.encodeDirectionalKey(fieldIndex, document.key),
      documentKey: document.key.path.toArray()
    });
  }
  deleteIndexEntry(transaction, document, fieldIndex, indexEntry) {
    const indexEntries = indexEntriesStore(transaction);
    return indexEntries.delete([indexEntry.indexId, this.uid, indexEntry.arrayValue, indexEntry.directionalValue, this.encodeDirectionalKey(fieldIndex, document.key), document.key.path.toArray()]);
  }
  getExistingIndexEntries(transaction, documentKey, fieldIndex) {
    const indexEntries = indexEntriesStore(transaction);
    let results = new SortedSet(indexEntryComparator);
    return indexEntries.iterate({
      index: DbIndexEntryDocumentKeyIndex,
      range: IDBKeyRange.only([fieldIndex.indexId, this.uid, this.encodeDirectionalKey(fieldIndex, documentKey)])
    }, (_, entry) => {
      results = results.add(new IndexEntry(fieldIndex.indexId, documentKey, entry.arrayValue, entry.directionalValue));
    }).next(() => results);
  }
  /** Creates the index entries for the given document. */
  computeIndexEntries(document, fieldIndex) {
    let results = new SortedSet(indexEntryComparator);
    const directionalValue = this.encodeDirectionalElements(fieldIndex, document);
    if (directionalValue == null) {
      return results;
    }
    const arraySegment = fieldIndexGetArraySegment(fieldIndex);
    if (arraySegment != null) {
      const value = document.data.field(arraySegment.fieldPath);
      if (isArray(value)) {
        for (const arrayValue of value.arrayValue.values || []) {
          results = results.add(new IndexEntry(fieldIndex.indexId, document.key, this.encodeSingleElement(arrayValue), directionalValue));
        }
      }
    } else {
      results = results.add(new IndexEntry(fieldIndex.indexId, document.key, EMPTY_VALUE, directionalValue));
    }
    return results;
  }
  /**
   * Updates the index entries for the provided document by deleting entries
   * that are no longer referenced in `newEntries` and adding all newly added
   * entries.
   */
  updateEntries(transaction, document, fieldIndex, existingEntries, newEntries) {
    logDebug(LOG_TAG$f, "Updating index entries for document '%s'", document.key);
    const promises = [];
    diffSortedSets(
      existingEntries,
      newEntries,
      indexEntryComparator,
      /* onAdd= */
      (entry) => {
        promises.push(this.addIndexEntry(transaction, document, fieldIndex, entry));
      },
      /* onRemove= */
      (entry) => {
        promises.push(this.deleteIndexEntry(transaction, document, fieldIndex, entry));
      }
    );
    return PersistencePromise.waitFor(promises);
  }
  getNextSequenceNumber(transaction) {
    let nextSequenceNumber = 1;
    const states = indexStateStore(transaction);
    return states.iterate({
      index: DbIndexStateSequenceNumberIndex,
      reverse: true,
      range: IDBKeyRange.upperBound([this.uid, Number.MAX_SAFE_INTEGER])
    }, (_, state, controller) => {
      controller.done();
      nextSequenceNumber = state.sequenceNumber + 1;
    }).next(() => nextSequenceNumber);
  }
  /**
   * Returns a new set of IDB ranges that splits the existing range and excludes
   * any values that match the `notInValue` from these ranges. As an example,
   * '[foo > 2 && foo != 3]` becomes  `[foo > 2 && < 3, foo > 3]`.
   */
  createRange(lower, upper, notInValues) {
    notInValues = notInValues.sort((l, r) => indexEntryComparator(l, r)).filter((el, i, values) => !i || indexEntryComparator(el, values[i - 1]) !== 0);
    const bounds = [];
    bounds.push(lower);
    for (const notInValue of notInValues) {
      const cmpToLower = indexEntryComparator(notInValue, lower);
      const cmpToUpper = indexEntryComparator(notInValue, upper);
      if (cmpToLower === 0) {
        bounds[0] = lower.successor();
      } else if (cmpToLower > 0 && cmpToUpper < 0) {
        bounds.push(notInValue);
        bounds.push(notInValue.successor());
      } else if (cmpToUpper > 0) {
        break;
      }
    }
    bounds.push(upper);
    const ranges = [];
    for (let i = 0; i < bounds.length; i += 2) {
      if (this.isRangeMatchable(bounds[i], bounds[i + 1])) {
        return [];
      }
      const lowerBound = [bounds[i].indexId, this.uid, bounds[i].arrayValue, bounds[i].directionalValue, EMPTY_VALUE, []];
      const upperBound = [bounds[i + 1].indexId, this.uid, bounds[i + 1].arrayValue, bounds[i + 1].directionalValue, EMPTY_VALUE, []];
      ranges.push(IDBKeyRange.bound(lowerBound, upperBound));
    }
    return ranges;
  }
  isRangeMatchable(lowerBound, upperBound) {
    return indexEntryComparator(lowerBound, upperBound) > 0;
  }
  getMinOffsetFromCollectionGroup(transaction, collectionGroup3) {
    return this.getFieldIndexes(transaction, collectionGroup3).next(getMinOffsetFromFieldIndexes);
  }
  getMinOffset(transaction, target) {
    return PersistencePromise.mapArray(this.getSubTargets(target), (subTarget) => this.getFieldIndex(transaction, subTarget).next((index) => index ? index : fail())).next(getMinOffsetFromFieldIndexes);
  }
};
function collectionParentsStore(txn) {
  return getStore(txn, DbCollectionParentStore);
}
function indexEntriesStore(txn) {
  return getStore(txn, DbIndexEntryStore);
}
function indexConfigurationStore(txn) {
  return getStore(txn, DbIndexConfigurationStore);
}
function indexStateStore(txn) {
  return getStore(txn, DbIndexStateStore);
}
function getMinOffsetFromFieldIndexes(fieldIndexes) {
  hardAssert(fieldIndexes.length !== 0);
  let minOffset = fieldIndexes[0].indexState.offset;
  let maxBatchId = minOffset.largestBatchId;
  for (let i = 1; i < fieldIndexes.length; i++) {
    const newOffset = fieldIndexes[i].indexState.offset;
    if (indexOffsetComparator(newOffset, minOffset) < 0) {
      minOffset = newOffset;
    }
    if (maxBatchId < newOffset.largestBatchId) {
      maxBatchId = newOffset.largestBatchId;
    }
  }
  return new IndexOffset(minOffset.readTime, minOffset.documentKey, maxBatchId);
}
function removeMutationBatch(txn, userId, batch) {
  const mutationStore = txn.store(DbMutationBatchStore);
  const indexTxn = txn.store(DbDocumentMutationStore);
  const promises = [];
  const range = IDBKeyRange.only(batch.batchId);
  let numDeleted = 0;
  const removePromise = mutationStore.iterate({
    range
  }, (key, value, control) => {
    numDeleted++;
    return control.delete();
  });
  promises.push(removePromise.next(() => {
    hardAssert(numDeleted === 1);
  }));
  const removedDocuments = [];
  for (const mutation of batch.mutations) {
    const indexKey = newDbDocumentMutationKey(userId, mutation.key.path, batch.batchId);
    promises.push(indexTxn.delete(indexKey));
    removedDocuments.push(mutation.key);
  }
  return PersistencePromise.waitFor(promises).next(() => removedDocuments);
}
function dbDocumentSize(doc4) {
  if (!doc4) {
    return 0;
  }
  let value;
  if (doc4.document) {
    value = doc4.document;
  } else if (doc4.unknownDocument) {
    value = doc4.unknownDocument;
  } else if (doc4.noDocument) {
    value = doc4.noDocument;
  } else {
    throw fail();
  }
  return JSON.stringify(value).length;
}
var IndexedDbMutationQueue = class _IndexedDbMutationQueue {
  constructor(userId, serializer, indexManager, referenceDelegate) {
    this.userId = userId;
    this.serializer = serializer;
    this.indexManager = indexManager;
    this.referenceDelegate = referenceDelegate;
    this.documentKeysByBatchId = {};
  }
  /**
   * Creates a new mutation queue for the given user.
   * @param user - The user for which to create a mutation queue.
   * @param serializer - The serializer to use when persisting to IndexedDb.
   */
  static forUser(user, serializer, indexManager, referenceDelegate) {
    hardAssert(user.uid !== "");
    const userId = user.isAuthenticated() ? user.uid : "";
    return new _IndexedDbMutationQueue(userId, serializer, indexManager, referenceDelegate);
  }
  checkEmpty(transaction) {
    let empty = true;
    const range = IDBKeyRange.bound([this.userId, Number.NEGATIVE_INFINITY], [this.userId, Number.POSITIVE_INFINITY]);
    return mutationsStore(transaction).iterate({
      index: DbMutationBatchUserMutationsIndex,
      range
    }, (key, value, control) => {
      empty = false;
      control.done();
    }).next(() => empty);
  }
  addMutationBatch(transaction, localWriteTime, baseMutations, mutations) {
    const documentStore = documentMutationsStore(transaction);
    const mutationStore = mutationsStore(transaction);
    return mutationStore.add({}).next((batchId) => {
      hardAssert(typeof batchId === "number");
      const batch = new MutationBatch(batchId, localWriteTime, baseMutations, mutations);
      const dbBatch = toDbMutationBatch(this.serializer, this.userId, batch);
      const promises = [];
      let collectionParents = new SortedSet((l, r) => primitiveComparator(l.canonicalString(), r.canonicalString()));
      for (const mutation of mutations) {
        const indexKey = newDbDocumentMutationKey(this.userId, mutation.key.path, batchId);
        collectionParents = collectionParents.add(mutation.key.path.popLast());
        promises.push(mutationStore.put(dbBatch));
        promises.push(documentStore.put(indexKey, DbDocumentMutationPlaceholder));
      }
      collectionParents.forEach((parent) => {
        promises.push(this.indexManager.addToCollectionParentIndex(transaction, parent));
      });
      transaction.addOnCommittedListener(() => {
        this.documentKeysByBatchId[batchId] = batch.keys();
      });
      return PersistencePromise.waitFor(promises).next(() => batch);
    });
  }
  lookupMutationBatch(transaction, batchId) {
    return mutationsStore(transaction).get(batchId).next((dbBatch) => {
      if (dbBatch) {
        hardAssert(dbBatch.userId === this.userId);
        return fromDbMutationBatch(this.serializer, dbBatch);
      }
      return null;
    });
  }
  /**
   * Returns the document keys for the mutation batch with the given batchId.
   * For primary clients, this method returns `null` after
   * `removeMutationBatches()` has been called. Secondary clients return a
   * cached result until `removeCachedMutationKeys()` is invoked.
   */
  // PORTING NOTE: Multi-tab only.
  lookupMutationKeys(transaction, batchId) {
    if (this.documentKeysByBatchId[batchId]) {
      return PersistencePromise.resolve(this.documentKeysByBatchId[batchId]);
    } else {
      return this.lookupMutationBatch(transaction, batchId).next((batch) => {
        if (batch) {
          const keys = batch.keys();
          this.documentKeysByBatchId[batchId] = keys;
          return keys;
        } else {
          return null;
        }
      });
    }
  }
  getNextMutationBatchAfterBatchId(transaction, batchId) {
    const nextBatchId = batchId + 1;
    const range = IDBKeyRange.lowerBound([this.userId, nextBatchId]);
    let foundBatch = null;
    return mutationsStore(transaction).iterate({
      index: DbMutationBatchUserMutationsIndex,
      range
    }, (key, dbBatch, control) => {
      if (dbBatch.userId === this.userId) {
        hardAssert(dbBatch.batchId >= nextBatchId);
        foundBatch = fromDbMutationBatch(this.serializer, dbBatch);
      }
      control.done();
    }).next(() => foundBatch);
  }
  getHighestUnacknowledgedBatchId(transaction) {
    const range = IDBKeyRange.upperBound([this.userId, Number.POSITIVE_INFINITY]);
    let batchId = BATCHID_UNKNOWN;
    return mutationsStore(transaction).iterate({
      index: DbMutationBatchUserMutationsIndex,
      range,
      reverse: true
    }, (key, dbBatch, control) => {
      batchId = dbBatch.batchId;
      control.done();
    }).next(() => batchId);
  }
  getAllMutationBatches(transaction) {
    const range = IDBKeyRange.bound([this.userId, BATCHID_UNKNOWN], [this.userId, Number.POSITIVE_INFINITY]);
    return mutationsStore(transaction).loadAll(DbMutationBatchUserMutationsIndex, range).next((dbBatches) => dbBatches.map((dbBatch) => fromDbMutationBatch(this.serializer, dbBatch)));
  }
  getAllMutationBatchesAffectingDocumentKey(transaction, documentKey) {
    const indexPrefix = newDbDocumentMutationPrefixForPath(this.userId, documentKey.path);
    const indexStart = IDBKeyRange.lowerBound(indexPrefix);
    const results = [];
    return documentMutationsStore(transaction).iterate({
      range: indexStart
    }, (indexKey, _, control) => {
      const [userID, encodedPath, batchId] = indexKey;
      const path = decodeResourcePath(encodedPath);
      if (userID !== this.userId || !documentKey.path.isEqual(path)) {
        control.done();
        return;
      }
      return mutationsStore(transaction).get(batchId).next((mutation) => {
        if (!mutation) {
          throw fail();
        }
        hardAssert(mutation.userId === this.userId);
        results.push(fromDbMutationBatch(this.serializer, mutation));
      });
    }).next(() => results);
  }
  getAllMutationBatchesAffectingDocumentKeys(transaction, documentKeys) {
    let uniqueBatchIDs = new SortedSet(primitiveComparator);
    const promises = [];
    documentKeys.forEach((documentKey) => {
      const indexStart = newDbDocumentMutationPrefixForPath(this.userId, documentKey.path);
      const range = IDBKeyRange.lowerBound(indexStart);
      const promise = documentMutationsStore(transaction).iterate({
        range
      }, (indexKey, _, control) => {
        const [userID, encodedPath, batchID] = indexKey;
        const path = decodeResourcePath(encodedPath);
        if (userID !== this.userId || !documentKey.path.isEqual(path)) {
          control.done();
          return;
        }
        uniqueBatchIDs = uniqueBatchIDs.add(batchID);
      });
      promises.push(promise);
    });
    return PersistencePromise.waitFor(promises).next(() => this.lookupMutationBatches(transaction, uniqueBatchIDs));
  }
  getAllMutationBatchesAffectingQuery(transaction, query3) {
    const queryPath = query3.path;
    const immediateChildrenLength = queryPath.length + 1;
    const indexPrefix = newDbDocumentMutationPrefixForPath(this.userId, queryPath);
    const indexStart = IDBKeyRange.lowerBound(indexPrefix);
    let uniqueBatchIDs = new SortedSet(primitiveComparator);
    return documentMutationsStore(transaction).iterate({
      range: indexStart
    }, (indexKey, _, control) => {
      const [userID, encodedPath, batchID] = indexKey;
      const path = decodeResourcePath(encodedPath);
      if (userID !== this.userId || !queryPath.isPrefixOf(path)) {
        control.done();
        return;
      }
      if (path.length !== immediateChildrenLength) {
        return;
      }
      uniqueBatchIDs = uniqueBatchIDs.add(batchID);
    }).next(() => this.lookupMutationBatches(transaction, uniqueBatchIDs));
  }
  lookupMutationBatches(transaction, batchIDs) {
    const results = [];
    const promises = [];
    batchIDs.forEach((batchId) => {
      promises.push(mutationsStore(transaction).get(batchId).next((mutation) => {
        if (mutation === null) {
          throw fail();
        }
        hardAssert(mutation.userId === this.userId);
        results.push(fromDbMutationBatch(this.serializer, mutation));
      }));
    });
    return PersistencePromise.waitFor(promises).next(() => results);
  }
  removeMutationBatch(transaction, batch) {
    return removeMutationBatch(transaction.simpleDbTransaction, this.userId, batch).next((removedDocuments) => {
      transaction.addOnCommittedListener(() => {
        this.removeCachedMutationKeys(batch.batchId);
      });
      return PersistencePromise.forEach(removedDocuments, (key) => {
        return this.referenceDelegate.markPotentiallyOrphaned(transaction, key);
      });
    });
  }
  /**
   * Clears the cached keys for a mutation batch. This method should be
   * called by secondary clients after they process mutation updates.
   *
   * Note that this method does not have to be called from primary clients as
   * the corresponding cache entries are cleared when an acknowledged or
   * rejected batch is removed from the mutation queue.
   */
  // PORTING NOTE: Multi-tab only
  removeCachedMutationKeys(batchId) {
    delete this.documentKeysByBatchId[batchId];
  }
  performConsistencyCheck(txn) {
    return this.checkEmpty(txn).next((empty) => {
      if (!empty) {
        return PersistencePromise.resolve();
      }
      const startRange = IDBKeyRange.lowerBound(newDbDocumentMutationPrefixForUser(this.userId));
      const danglingMutationReferences = [];
      return documentMutationsStore(txn).iterate({
        range: startRange
      }, (key, _, control) => {
        const userID = key[0];
        if (userID !== this.userId) {
          control.done();
          return;
        } else {
          const path = decodeResourcePath(key[1]);
          danglingMutationReferences.push(path);
        }
      }).next(() => {
        hardAssert(danglingMutationReferences.length === 0);
      });
    });
  }
  containsKey(txn, key) {
    return mutationQueueContainsKey(txn, this.userId, key);
  }
  // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
  /** Returns the mutation queue's metadata from IndexedDb. */
  getMutationQueueMetadata(transaction) {
    return mutationQueuesStore(transaction).get(this.userId).next((metadata) => {
      return metadata || {
        userId: this.userId,
        lastAcknowledgedBatchId: BATCHID_UNKNOWN,
        lastStreamToken: ""
      };
    });
  }
};
function mutationQueueContainsKey(txn, userId, key) {
  const indexKey = newDbDocumentMutationPrefixForPath(userId, key.path);
  const encodedPath = indexKey[1];
  const startRange = IDBKeyRange.lowerBound(indexKey);
  let containsKey = false;
  return documentMutationsStore(txn).iterate({
    range: startRange,
    keysOnly: true
  }, (key2, value, control) => {
    const [
      userID,
      keyPath,
      /*batchID*/
      _
    ] = key2;
    if (userID === userId && keyPath === encodedPath) {
      containsKey = true;
    }
    control.done();
  }).next(() => containsKey);
}
function mutationQueuesContainKey(txn, docKey) {
  let found = false;
  return mutationQueuesStore(txn).iterateSerial((userId) => {
    return mutationQueueContainsKey(txn, userId, docKey).next((containsKey) => {
      if (containsKey) {
        found = true;
      }
      return PersistencePromise.resolve(!containsKey);
    });
  }).next(() => found);
}
function mutationsStore(txn) {
  return getStore(txn, DbMutationBatchStore);
}
function documentMutationsStore(txn) {
  return getStore(txn, DbDocumentMutationStore);
}
function mutationQueuesStore(txn) {
  return getStore(txn, DbMutationQueueStore);
}
var OFFSET = 2;
var TargetIdGenerator = class _TargetIdGenerator {
  constructor(lastId) {
    this.lastId = lastId;
  }
  next() {
    this.lastId += OFFSET;
    return this.lastId;
  }
  static forTargetCache() {
    return new _TargetIdGenerator(2 - OFFSET);
  }
  static forSyncEngine() {
    return new _TargetIdGenerator(1 - OFFSET);
  }
};
var IndexedDbTargetCache = class {
  constructor(referenceDelegate, serializer) {
    this.referenceDelegate = referenceDelegate;
    this.serializer = serializer;
  }
  // PORTING NOTE: We don't cache global metadata for the target cache, since
  // some of it (in particular `highestTargetId`) can be modified by secondary
  // tabs. We could perhaps be more granular (and e.g. still cache
  // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
  // to IndexedDb whenever we need to read metadata. We can revisit if it turns
  // out to have a meaningful performance impact.
  allocateTargetId(transaction) {
    return this.retrieveMetadata(transaction).next((metadata) => {
      const targetIdGenerator = new TargetIdGenerator(metadata.highestTargetId);
      metadata.highestTargetId = targetIdGenerator.next();
      return this.saveMetadata(transaction, metadata).next(() => metadata.highestTargetId);
    });
  }
  getLastRemoteSnapshotVersion(transaction) {
    return this.retrieveMetadata(transaction).next((metadata) => {
      return SnapshotVersion.fromTimestamp(new Timestamp(metadata.lastRemoteSnapshotVersion.seconds, metadata.lastRemoteSnapshotVersion.nanoseconds));
    });
  }
  getHighestSequenceNumber(transaction) {
    return this.retrieveMetadata(transaction).next((targetGlobal) => targetGlobal.highestListenSequenceNumber);
  }
  setTargetsMetadata(transaction, highestListenSequenceNumber, lastRemoteSnapshotVersion) {
    return this.retrieveMetadata(transaction).next((metadata) => {
      metadata.highestListenSequenceNumber = highestListenSequenceNumber;
      if (lastRemoteSnapshotVersion) {
        metadata.lastRemoteSnapshotVersion = lastRemoteSnapshotVersion.toTimestamp();
      }
      if (highestListenSequenceNumber > metadata.highestListenSequenceNumber) {
        metadata.highestListenSequenceNumber = highestListenSequenceNumber;
      }
      return this.saveMetadata(transaction, metadata);
    });
  }
  addTargetData(transaction, targetData) {
    return this.saveTargetData(transaction, targetData).next(() => {
      return this.retrieveMetadata(transaction).next((metadata) => {
        metadata.targetCount += 1;
        this.updateMetadataFromTargetData(targetData, metadata);
        return this.saveMetadata(transaction, metadata);
      });
    });
  }
  updateTargetData(transaction, targetData) {
    return this.saveTargetData(transaction, targetData);
  }
  removeTargetData(transaction, targetData) {
    return this.removeMatchingKeysForTargetId(transaction, targetData.targetId).next(() => targetsStore(transaction).delete(targetData.targetId)).next(() => this.retrieveMetadata(transaction)).next((metadata) => {
      hardAssert(metadata.targetCount > 0);
      metadata.targetCount -= 1;
      return this.saveMetadata(transaction, metadata);
    });
  }
  /**
   * Drops any targets with sequence number less than or equal to the upper bound, excepting those
   * present in `activeTargetIds`. Document associations for the removed targets are also removed.
   * Returns the number of targets removed.
   */
  removeTargets(txn, upperBound, activeTargetIds) {
    let count3 = 0;
    const promises = [];
    return targetsStore(txn).iterate((key, value) => {
      const targetData = fromDbTarget(value);
      if (targetData.sequenceNumber <= upperBound && activeTargetIds.get(targetData.targetId) === null) {
        count3++;
        promises.push(this.removeTargetData(txn, targetData));
      }
    }).next(() => PersistencePromise.waitFor(promises)).next(() => count3);
  }
  /**
   * Call provided function with each `TargetData` that we have cached.
   */
  forEachTarget(txn, f) {
    return targetsStore(txn).iterate((key, value) => {
      const targetData = fromDbTarget(value);
      f(targetData);
    });
  }
  retrieveMetadata(transaction) {
    return globalTargetStore(transaction).get(DbTargetGlobalKey).next((metadata) => {
      hardAssert(metadata !== null);
      return metadata;
    });
  }
  saveMetadata(transaction, metadata) {
    return globalTargetStore(transaction).put(DbTargetGlobalKey, metadata);
  }
  saveTargetData(transaction, targetData) {
    return targetsStore(transaction).put(toDbTarget(this.serializer, targetData));
  }
  /**
   * In-place updates the provided metadata to account for values in the given
   * TargetData. Saving is done separately. Returns true if there were any
   * changes to the metadata.
   */
  updateMetadataFromTargetData(targetData, metadata) {
    let updated = false;
    if (targetData.targetId > metadata.highestTargetId) {
      metadata.highestTargetId = targetData.targetId;
      updated = true;
    }
    if (targetData.sequenceNumber > metadata.highestListenSequenceNumber) {
      metadata.highestListenSequenceNumber = targetData.sequenceNumber;
      updated = true;
    }
    return updated;
  }
  getTargetCount(transaction) {
    return this.retrieveMetadata(transaction).next((metadata) => metadata.targetCount);
  }
  getTargetData(transaction, target) {
    const canonicalId2 = canonifyTarget(target);
    const range = IDBKeyRange.bound([canonicalId2, Number.NEGATIVE_INFINITY], [canonicalId2, Number.POSITIVE_INFINITY]);
    let result = null;
    return targetsStore(transaction).iterate({
      range,
      index: DbTargetQueryTargetsIndexName
    }, (key, value, control) => {
      const found = fromDbTarget(value);
      if (targetEquals(target, found.target)) {
        result = found;
        control.done();
      }
    }).next(() => result);
  }
  addMatchingKeys(txn, keys, targetId) {
    const promises = [];
    const store = documentTargetStore(txn);
    keys.forEach((key) => {
      const path = encodeResourcePath(key.path);
      promises.push(store.put({
        targetId,
        path
      }));
      promises.push(this.referenceDelegate.addReference(txn, targetId, key));
    });
    return PersistencePromise.waitFor(promises);
  }
  removeMatchingKeys(txn, keys, targetId) {
    const store = documentTargetStore(txn);
    return PersistencePromise.forEach(keys, (key) => {
      const path = encodeResourcePath(key.path);
      return PersistencePromise.waitFor([store.delete([targetId, path]), this.referenceDelegate.removeReference(txn, targetId, key)]);
    });
  }
  removeMatchingKeysForTargetId(txn, targetId) {
    const store = documentTargetStore(txn);
    const range = IDBKeyRange.bound(
      [targetId],
      [targetId + 1],
      /*lowerOpen=*/
      false,
      /*upperOpen=*/
      true
    );
    return store.delete(range);
  }
  getMatchingKeysForTargetId(txn, targetId) {
    const range = IDBKeyRange.bound(
      [targetId],
      [targetId + 1],
      /*lowerOpen=*/
      false,
      /*upperOpen=*/
      true
    );
    const store = documentTargetStore(txn);
    let result = documentKeySet();
    return store.iterate({
      range,
      keysOnly: true
    }, (key, _, control) => {
      const path = decodeResourcePath(key[1]);
      const docKey = new DocumentKey(path);
      result = result.add(docKey);
    }).next(() => result);
  }
  containsKey(txn, key) {
    const path = encodeResourcePath(key.path);
    const range = IDBKeyRange.bound(
      [path],
      [immediateSuccessor(path)],
      /*lowerOpen=*/
      false,
      /*upperOpen=*/
      true
    );
    let count3 = 0;
    return documentTargetStore(txn).iterate({
      index: DbTargetDocumentDocumentTargetsIndex,
      keysOnly: true,
      range
    }, ([targetId, path2], _, control) => {
      if (targetId !== 0) {
        count3++;
        control.done();
      }
    }).next(() => count3 > 0);
  }
  /**
   * Looks up a TargetData entry by target ID.
   *
   * @param targetId - The target ID of the TargetData entry to look up.
   * @returns The cached TargetData entry, or null if the cache has no entry for
   * the target.
   */
  // PORTING NOTE: Multi-tab only.
  getTargetDataForTarget(transaction, targetId) {
    return targetsStore(transaction).get(targetId).next((found) => {
      if (found) {
        return fromDbTarget(found);
      } else {
        return null;
      }
    });
  }
};
function targetsStore(txn) {
  return getStore(txn, DbTargetStore);
}
function globalTargetStore(txn) {
  return getStore(txn, DbTargetGlobalStore);
}
function documentTargetStore(txn) {
  return getStore(txn, DbTargetDocumentStore);
}
var GC_DID_NOT_RUN = {
  didRun: false,
  sequenceNumbersCollected: 0,
  targetsRemoved: 0,
  documentsRemoved: 0
};
var LRU_COLLECTION_DISABLED = -1;
var LRU_DEFAULT_CACHE_SIZE_BYTES = 40 * 1024 * 1024;
var LruParams = class _LruParams {
  constructor(cacheSizeCollectionThreshold, percentileToCollect, maximumSequenceNumbersToCollect) {
    this.cacheSizeCollectionThreshold = cacheSizeCollectionThreshold;
    this.percentileToCollect = percentileToCollect;
    this.maximumSequenceNumbersToCollect = maximumSequenceNumbersToCollect;
  }
  static withCacheSize(cacheSize) {
    return new _LruParams(cacheSize, _LruParams.DEFAULT_COLLECTION_PERCENTILE, _LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
  }
};
LruParams.DEFAULT_COLLECTION_PERCENTILE = 10;
LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3;
LruParams.DEFAULT = new LruParams(LRU_DEFAULT_CACHE_SIZE_BYTES, LruParams.DEFAULT_COLLECTION_PERCENTILE, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
LruParams.DISABLED = new LruParams(LRU_COLLECTION_DISABLED, 0, 0);
var LOG_TAG$e = "LruGarbageCollector";
var LRU_MINIMUM_CACHE_SIZE_BYTES = 1 * 1024 * 1024;
var INITIAL_GC_DELAY_MS = 1 * 60 * 1e3;
var REGULAR_GC_DELAY_MS = 5 * 60 * 1e3;
function bufferEntryComparator([aSequence, aIndex], [bSequence, bIndex]) {
  const seqCmp = primitiveComparator(aSequence, bSequence);
  if (seqCmp === 0) {
    return primitiveComparator(aIndex, bIndex);
  } else {
    return seqCmp;
  }
}
var RollingSequenceNumberBuffer = class {
  constructor(maxElements) {
    this.maxElements = maxElements;
    this.buffer = new SortedSet(bufferEntryComparator);
    this.previousIndex = 0;
  }
  nextIndex() {
    return ++this.previousIndex;
  }
  addElement(sequenceNumber) {
    const entry = [sequenceNumber, this.nextIndex()];
    if (this.buffer.size < this.maxElements) {
      this.buffer = this.buffer.add(entry);
    } else {
      const highestValue = this.buffer.last();
      if (bufferEntryComparator(entry, highestValue) < 0) {
        this.buffer = this.buffer.delete(highestValue).add(entry);
      }
    }
  }
  get maxValue() {
    return this.buffer.last()[0];
  }
};
var LruScheduler = class {
  constructor(garbageCollector, asyncQueue, localStore) {
    this.garbageCollector = garbageCollector;
    this.asyncQueue = asyncQueue;
    this.localStore = localStore;
    this.gcTask = null;
  }
  start() {
    if (this.garbageCollector.params.cacheSizeCollectionThreshold !== LRU_COLLECTION_DISABLED) {
      this.scheduleGC(INITIAL_GC_DELAY_MS);
    }
  }
  stop() {
    if (this.gcTask) {
      this.gcTask.cancel();
      this.gcTask = null;
    }
  }
  get started() {
    return this.gcTask !== null;
  }
  scheduleGC(delay) {
    logDebug(LOG_TAG$e, `Garbage collection scheduled in ${delay}ms`);
    this.gcTask = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection", delay, () => __async(this, null, function* () {
      this.gcTask = null;
      try {
        yield this.localStore.collectGarbage(this.garbageCollector);
      } catch (e) {
        if (isIndexedDbTransactionError(e)) {
          logDebug(LOG_TAG$e, "Ignoring IndexedDB error during garbage collection: ", e);
        } else {
          yield ignoreIfPrimaryLeaseLoss(e);
        }
      }
      yield this.scheduleGC(REGULAR_GC_DELAY_MS);
    }));
  }
};
var LruGarbageCollectorImpl = class {
  constructor(delegate, params) {
    this.delegate = delegate;
    this.params = params;
  }
  calculateTargetCount(txn, percentile) {
    return this.delegate.getSequenceNumberCount(txn).next((targetCount) => {
      return Math.floor(percentile / 100 * targetCount);
    });
  }
  nthSequenceNumber(txn, n) {
    if (n === 0) {
      return PersistencePromise.resolve(ListenSequence.INVALID);
    }
    const buffer = new RollingSequenceNumberBuffer(n);
    return this.delegate.forEachTarget(txn, (target) => buffer.addElement(target.sequenceNumber)).next(() => {
      return this.delegate.forEachOrphanedDocumentSequenceNumber(txn, (sequenceNumber) => buffer.addElement(sequenceNumber));
    }).next(() => buffer.maxValue);
  }
  removeTargets(txn, upperBound, activeTargetIds) {
    return this.delegate.removeTargets(txn, upperBound, activeTargetIds);
  }
  removeOrphanedDocuments(txn, upperBound) {
    return this.delegate.removeOrphanedDocuments(txn, upperBound);
  }
  collect(txn, activeTargetIds) {
    if (this.params.cacheSizeCollectionThreshold === LRU_COLLECTION_DISABLED) {
      logDebug("LruGarbageCollector", "Garbage collection skipped; disabled");
      return PersistencePromise.resolve(GC_DID_NOT_RUN);
    }
    return this.getCacheSize(txn).next((cacheSize) => {
      if (cacheSize < this.params.cacheSizeCollectionThreshold) {
        logDebug("LruGarbageCollector", `Garbage collection skipped; Cache size ${cacheSize} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`);
        return GC_DID_NOT_RUN;
      } else {
        return this.runGarbageCollection(txn, activeTargetIds);
      }
    });
  }
  getCacheSize(txn) {
    return this.delegate.getCacheSize(txn);
  }
  runGarbageCollection(txn, activeTargetIds) {
    let upperBoundSequenceNumber;
    let sequenceNumbersToCollect, targetsRemoved;
    let countedTargetsTs, foundUpperBoundTs, removedTargetsTs, removedDocumentsTs;
    const startTs = Date.now();
    return this.calculateTargetCount(txn, this.params.percentileToCollect).next((sequenceNumbers) => {
      if (sequenceNumbers > this.params.maximumSequenceNumbersToCollect) {
        logDebug("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${sequenceNumbers}`);
        sequenceNumbersToCollect = this.params.maximumSequenceNumbersToCollect;
      } else {
        sequenceNumbersToCollect = sequenceNumbers;
      }
      countedTargetsTs = Date.now();
      return this.nthSequenceNumber(txn, sequenceNumbersToCollect);
    }).next((upperBound) => {
      upperBoundSequenceNumber = upperBound;
      foundUpperBoundTs = Date.now();
      return this.removeTargets(txn, upperBoundSequenceNumber, activeTargetIds);
    }).next((numTargetsRemoved) => {
      targetsRemoved = numTargetsRemoved;
      removedTargetsTs = Date.now();
      return this.removeOrphanedDocuments(txn, upperBoundSequenceNumber);
    }).next((documentsRemoved) => {
      removedDocumentsTs = Date.now();
      if (getLogLevel() <= LogLevel.DEBUG) {
        const desc = `LRU Garbage Collection
	Counted targets in ${countedTargetsTs - startTs}ms
	Determined least recently used ${sequenceNumbersToCollect} in ${foundUpperBoundTs - countedTargetsTs}ms
	Removed ${targetsRemoved} targets in ${removedTargetsTs - foundUpperBoundTs}ms
	Removed ${documentsRemoved} documents in ${removedDocumentsTs - removedTargetsTs}ms
Total Duration: ${removedDocumentsTs - startTs}ms`;
        logDebug("LruGarbageCollector", desc);
      }
      return PersistencePromise.resolve({
        didRun: true,
        sequenceNumbersCollected: sequenceNumbersToCollect,
        targetsRemoved,
        documentsRemoved
      });
    });
  }
};
function newLruGarbageCollector(delegate, params) {
  return new LruGarbageCollectorImpl(delegate, params);
}
var IndexedDbLruDelegateImpl = class {
  constructor(db, params) {
    this.db = db;
    this.garbageCollector = newLruGarbageCollector(this, params);
  }
  getSequenceNumberCount(txn) {
    const docCountPromise = this.orphanedDocumentCount(txn);
    const targetCountPromise = this.db.getTargetCache().getTargetCount(txn);
    return targetCountPromise.next((targetCount) => docCountPromise.next((docCount) => targetCount + docCount));
  }
  orphanedDocumentCount(txn) {
    let orphanedCount = 0;
    return this.forEachOrphanedDocumentSequenceNumber(txn, (_) => {
      orphanedCount++;
    }).next(() => orphanedCount);
  }
  forEachTarget(txn, f) {
    return this.db.getTargetCache().forEachTarget(txn, f);
  }
  forEachOrphanedDocumentSequenceNumber(txn, f) {
    return this.forEachOrphanedDocument(txn, (docKey, sequenceNumber) => f(sequenceNumber));
  }
  addReference(txn, targetId, key) {
    return writeSentinelKey(txn, key);
  }
  removeReference(txn, targetId, key) {
    return writeSentinelKey(txn, key);
  }
  removeTargets(txn, upperBound, activeTargetIds) {
    return this.db.getTargetCache().removeTargets(txn, upperBound, activeTargetIds);
  }
  markPotentiallyOrphaned(txn, key) {
    return writeSentinelKey(txn, key);
  }
  /**
   * Returns true if anything would prevent this document from being garbage
   * collected, given that the document in question is not present in any
   * targets and has a sequence number less than or equal to the upper bound for
   * the collection run.
   */
  isPinned(txn, docKey) {
    return mutationQueuesContainKey(txn, docKey);
  }
  removeOrphanedDocuments(txn, upperBound) {
    const documentCache = this.db.getRemoteDocumentCache();
    const changeBuffer = documentCache.newChangeBuffer();
    const promises = [];
    let documentCount = 0;
    const iteration = this.forEachOrphanedDocument(txn, (docKey, sequenceNumber) => {
      if (sequenceNumber <= upperBound) {
        const p = this.isPinned(txn, docKey).next((isPinned) => {
          if (!isPinned) {
            documentCount++;
            return changeBuffer.getEntry(txn, docKey).next(() => {
              changeBuffer.removeEntry(docKey, SnapshotVersion.min());
              return documentTargetStore(txn).delete(sentinelKey$1(docKey));
            });
          }
        });
        promises.push(p);
      }
    });
    return iteration.next(() => PersistencePromise.waitFor(promises)).next(() => changeBuffer.apply(txn)).next(() => documentCount);
  }
  removeTarget(txn, targetData) {
    const updated = targetData.withSequenceNumber(txn.currentSequenceNumber);
    return this.db.getTargetCache().updateTargetData(txn, updated);
  }
  updateLimboDocument(txn, key) {
    return writeSentinelKey(txn, key);
  }
  /**
   * Call provided function for each document in the cache that is 'orphaned'. Orphaned
   * means not a part of any target, so the only entry in the target-document index for
   * that document will be the sentinel row (targetId 0), which will also have the sequence
   * number for the last time the document was accessed.
   */
  forEachOrphanedDocument(txn, f) {
    const store = documentTargetStore(txn);
    let nextToReport = ListenSequence.INVALID;
    let nextPath;
    return store.iterate({
      index: DbTargetDocumentDocumentTargetsIndex
    }, ([targetId, docKey], {
      path,
      sequenceNumber
    }) => {
      if (targetId === 0) {
        if (nextToReport !== ListenSequence.INVALID) {
          f(new DocumentKey(decodeResourcePath(nextPath)), nextToReport);
        }
        nextToReport = sequenceNumber;
        nextPath = path;
      } else {
        nextToReport = ListenSequence.INVALID;
      }
    }).next(() => {
      if (nextToReport !== ListenSequence.INVALID) {
        f(new DocumentKey(decodeResourcePath(nextPath)), nextToReport);
      }
    });
  }
  getCacheSize(txn) {
    return this.db.getRemoteDocumentCache().getSize(txn);
  }
};
function sentinelKey$1(key) {
  return [0, encodeResourcePath(key.path)];
}
function sentinelRow(key, sequenceNumber) {
  return {
    targetId: 0,
    path: encodeResourcePath(key.path),
    sequenceNumber
  };
}
function writeSentinelKey(txn, key) {
  return documentTargetStore(txn).put(sentinelRow(key, txn.currentSequenceNumber));
}
var RemoteDocumentChangeBuffer = class {
  constructor() {
    this.changes = new ObjectMap((key) => key.toString(), (l, r) => l.isEqual(r));
    this.changesApplied = false;
  }
  /**
   * Buffers a `RemoteDocumentCache.addEntry()` call.
   *
   * You can only modify documents that have already been retrieved via
   * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
   */
  addEntry(document) {
    this.assertNotApplied();
    this.changes.set(document.key, document);
  }
  /**
   * Buffers a `RemoteDocumentCache.removeEntry()` call.
   *
   * You can only remove documents that have already been retrieved via
   * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
   */
  removeEntry(key, readTime) {
    this.assertNotApplied();
    this.changes.set(key, MutableDocument.newInvalidDocument(key).setReadTime(readTime));
  }
  /**
   * Looks up an entry in the cache. The buffered changes will first be checked,
   * and if no buffered change applies, this will forward to
   * `RemoteDocumentCache.getEntry()`.
   *
   * @param transaction - The transaction in which to perform any persistence
   *     operations.
   * @param documentKey - The key of the entry to look up.
   * @returns The cached document or an invalid document if we have nothing
   * cached.
   */
  getEntry(transaction, documentKey) {
    this.assertNotApplied();
    const bufferedEntry = this.changes.get(documentKey);
    if (bufferedEntry !== void 0) {
      return PersistencePromise.resolve(bufferedEntry);
    } else {
      return this.getFromCache(transaction, documentKey);
    }
  }
  /**
   * Looks up several entries in the cache, forwarding to
   * `RemoteDocumentCache.getEntry()`.
   *
   * @param transaction - The transaction in which to perform any persistence
   *     operations.
   * @param documentKeys - The keys of the entries to look up.
   * @returns A map of cached documents, indexed by key. If an entry cannot be
   *     found, the corresponding key will be mapped to an invalid document.
   */
  getEntries(transaction, documentKeys) {
    return this.getAllFromCache(transaction, documentKeys);
  }
  /**
   * Applies buffered changes to the underlying RemoteDocumentCache, using
   * the provided transaction.
   */
  apply(transaction) {
    this.assertNotApplied();
    this.changesApplied = true;
    return this.applyChanges(transaction);
  }
  /** Helper to assert this.changes is not null  */
  assertNotApplied() {
  }
};
var IndexedDbRemoteDocumentCacheImpl = class {
  constructor(serializer) {
    this.serializer = serializer;
  }
  setIndexManager(indexManager) {
    this.indexManager = indexManager;
  }
  /**
   * Adds the supplied entries to the cache.
   *
   * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
   * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
   */
  addEntry(transaction, key, doc4) {
    const documentStore = remoteDocumentsStore(transaction);
    return documentStore.put(doc4);
  }
  /**
   * Removes a document from the cache.
   *
   * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
   * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
   */
  removeEntry(transaction, documentKey, readTime) {
    const store = remoteDocumentsStore(transaction);
    return store.delete(dbReadTimeKey(documentKey, readTime));
  }
  /**
   * Updates the current cache size.
   *
   * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
   * cache's metadata.
   */
  updateMetadata(transaction, sizeDelta) {
    return this.getMetadata(transaction).next((metadata) => {
      metadata.byteSize += sizeDelta;
      return this.setMetadata(transaction, metadata);
    });
  }
  getEntry(transaction, documentKey) {
    let doc4 = MutableDocument.newInvalidDocument(documentKey);
    return remoteDocumentsStore(transaction).iterate({
      index: DbRemoteDocumentDocumentKeyIndex,
      range: IDBKeyRange.only(dbKey(documentKey))
    }, (_, dbRemoteDoc) => {
      doc4 = this.maybeDecodeDocument(documentKey, dbRemoteDoc);
    }).next(() => doc4);
  }
  /**
   * Looks up an entry in the cache.
   *
   * @param documentKey - The key of the entry to look up.
   * @returns The cached document entry and its size.
   */
  getSizedEntry(transaction, documentKey) {
    let result = {
      size: 0,
      document: MutableDocument.newInvalidDocument(documentKey)
    };
    return remoteDocumentsStore(transaction).iterate({
      index: DbRemoteDocumentDocumentKeyIndex,
      range: IDBKeyRange.only(dbKey(documentKey))
    }, (_, dbRemoteDoc) => {
      result = {
        document: this.maybeDecodeDocument(documentKey, dbRemoteDoc),
        size: dbDocumentSize(dbRemoteDoc)
      };
    }).next(() => result);
  }
  getEntries(transaction, documentKeys) {
    let results = mutableDocumentMap();
    return this.forEachDbEntry(transaction, documentKeys, (key, dbRemoteDoc) => {
      const doc4 = this.maybeDecodeDocument(key, dbRemoteDoc);
      results = results.insert(key, doc4);
    }).next(() => results);
  }
  /**
   * Looks up several entries in the cache.
   *
   * @param documentKeys - The set of keys entries to look up.
   * @returns A map of documents indexed by key and a map of sizes indexed by
   *     key (zero if the document does not exist).
   */
  getSizedEntries(transaction, documentKeys) {
    let results = mutableDocumentMap();
    let sizeMap = new SortedMap(DocumentKey.comparator);
    return this.forEachDbEntry(transaction, documentKeys, (key, dbRemoteDoc) => {
      const doc4 = this.maybeDecodeDocument(key, dbRemoteDoc);
      results = results.insert(key, doc4);
      sizeMap = sizeMap.insert(key, dbDocumentSize(dbRemoteDoc));
    }).next(() => {
      return {
        documents: results,
        sizeMap
      };
    });
  }
  forEachDbEntry(transaction, documentKeys, callback) {
    if (documentKeys.isEmpty()) {
      return PersistencePromise.resolve();
    }
    let sortedKeys = new SortedSet(dbKeyComparator);
    documentKeys.forEach((e) => sortedKeys = sortedKeys.add(e));
    const range = IDBKeyRange.bound(dbKey(sortedKeys.first()), dbKey(sortedKeys.last()));
    const keyIter = sortedKeys.getIterator();
    let nextKey = keyIter.getNext();
    return remoteDocumentsStore(transaction).iterate({
      index: DbRemoteDocumentDocumentKeyIndex,
      range
    }, (_, dbRemoteDoc, control) => {
      const potentialKey = DocumentKey.fromSegments([...dbRemoteDoc.prefixPath, dbRemoteDoc.collectionGroup, dbRemoteDoc.documentId]);
      while (nextKey && dbKeyComparator(nextKey, potentialKey) < 0) {
        callback(nextKey, null);
        nextKey = keyIter.getNext();
      }
      if (nextKey && nextKey.isEqual(potentialKey)) {
        callback(nextKey, dbRemoteDoc);
        nextKey = keyIter.hasNext() ? keyIter.getNext() : null;
      }
      if (nextKey) {
        control.skip(dbKey(nextKey));
      } else {
        control.done();
      }
    }).next(() => {
      while (nextKey) {
        callback(nextKey, null);
        nextKey = keyIter.hasNext() ? keyIter.getNext() : null;
      }
    });
  }
  getDocumentsMatchingQuery(transaction, query3, offset, mutatedDocs, context) {
    const collection4 = query3.path;
    const startKey = [collection4.popLast().toArray(), collection4.lastSegment(), toDbTimestampKey(offset.readTime), offset.documentKey.path.isEmpty() ? "" : offset.documentKey.path.lastSegment()];
    const endKey = [collection4.popLast().toArray(), collection4.lastSegment(), [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], ""];
    return remoteDocumentsStore(transaction).loadAll(IDBKeyRange.bound(startKey, endKey, true)).next((dbRemoteDocs) => {
      context === null || context === void 0 ? void 0 : context.incrementDocumentReadCount(dbRemoteDocs.length);
      let results = mutableDocumentMap();
      for (const dbRemoteDoc of dbRemoteDocs) {
        const document = this.maybeDecodeDocument(DocumentKey.fromSegments(dbRemoteDoc.prefixPath.concat(dbRemoteDoc.collectionGroup, dbRemoteDoc.documentId)), dbRemoteDoc);
        if (document.isFoundDocument() && (queryMatches(query3, document) || mutatedDocs.has(document.key))) {
          results = results.insert(document.key, document);
        }
      }
      return results;
    });
  }
  getAllFromCollectionGroup(transaction, collectionGroup3, offset, limit3) {
    let results = mutableDocumentMap();
    const startKey = dbCollectionGroupKey(collectionGroup3, offset);
    const endKey = dbCollectionGroupKey(collectionGroup3, IndexOffset.max());
    return remoteDocumentsStore(transaction).iterate({
      index: DbRemoteDocumentCollectionGroupIndex,
      range: IDBKeyRange.bound(startKey, endKey, true)
    }, (_, dbRemoteDoc, control) => {
      const document = this.maybeDecodeDocument(DocumentKey.fromSegments(dbRemoteDoc.prefixPath.concat(dbRemoteDoc.collectionGroup, dbRemoteDoc.documentId)), dbRemoteDoc);
      results = results.insert(document.key, document);
      if (results.size === limit3) {
        control.done();
      }
    }).next(() => results);
  }
  newChangeBuffer(options) {
    return new IndexedDbRemoteDocumentChangeBuffer(this, !!options && options.trackRemovals);
  }
  getSize(txn) {
    return this.getMetadata(txn).next((metadata) => metadata.byteSize);
  }
  getMetadata(txn) {
    return documentGlobalStore(txn).get(DbRemoteDocumentGlobalKey).next((metadata) => {
      hardAssert(!!metadata);
      return metadata;
    });
  }
  setMetadata(txn, metadata) {
    return documentGlobalStore(txn).put(DbRemoteDocumentGlobalKey, metadata);
  }
  /**
   * Decodes `dbRemoteDoc` and returns the document (or an invalid document if
   * the document corresponds to the format used for sentinel deletes).
   */
  maybeDecodeDocument(documentKey, dbRemoteDoc) {
    if (dbRemoteDoc) {
      const doc4 = fromDbRemoteDocument(this.serializer, dbRemoteDoc);
      const isSentinelRemoval = doc4.isNoDocument() && doc4.version.isEqual(SnapshotVersion.min());
      if (!isSentinelRemoval) {
        return doc4;
      }
    }
    return MutableDocument.newInvalidDocument(documentKey);
  }
};
function newIndexedDbRemoteDocumentCache(serializer) {
  return new IndexedDbRemoteDocumentCacheImpl(serializer);
}
var IndexedDbRemoteDocumentChangeBuffer = class extends RemoteDocumentChangeBuffer {
  /**
   * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
   * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
   * `getNewDocumentChanges()`.
   */
  constructor(documentCache, trackRemovals) {
    super();
    this.documentCache = documentCache;
    this.trackRemovals = trackRemovals;
    this.documentStates = new ObjectMap((key) => key.toString(), (l, r) => l.isEqual(r));
  }
  applyChanges(transaction) {
    const promises = [];
    let sizeDelta = 0;
    let collectionParents = new SortedSet((l, r) => primitiveComparator(l.canonicalString(), r.canonicalString()));
    this.changes.forEach((key, documentChange) => {
      const previousDoc = this.documentStates.get(key);
      promises.push(this.documentCache.removeEntry(transaction, key, previousDoc.readTime));
      if (documentChange.isValidDocument()) {
        const doc4 = toDbRemoteDocument(this.documentCache.serializer, documentChange);
        collectionParents = collectionParents.add(key.path.popLast());
        const size = dbDocumentSize(doc4);
        sizeDelta += size - previousDoc.size;
        promises.push(this.documentCache.addEntry(transaction, key, doc4));
      } else {
        sizeDelta -= previousDoc.size;
        if (this.trackRemovals) {
          const deletedDoc = toDbRemoteDocument(this.documentCache.serializer, documentChange.convertToNoDocument(SnapshotVersion.min()));
          promises.push(this.documentCache.addEntry(transaction, key, deletedDoc));
        }
      }
    });
    collectionParents.forEach((parent) => {
      promises.push(this.documentCache.indexManager.addToCollectionParentIndex(transaction, parent));
    });
    promises.push(this.documentCache.updateMetadata(transaction, sizeDelta));
    return PersistencePromise.waitFor(promises);
  }
  getFromCache(transaction, documentKey) {
    return this.documentCache.getSizedEntry(transaction, documentKey).next((getResult) => {
      this.documentStates.set(documentKey, {
        size: getResult.size,
        readTime: getResult.document.readTime
      });
      return getResult.document;
    });
  }
  getAllFromCache(transaction, documentKeys) {
    return this.documentCache.getSizedEntries(transaction, documentKeys).next(({
      documents,
      sizeMap
    }) => {
      sizeMap.forEach((documentKey, size) => {
        this.documentStates.set(documentKey, {
          size,
          readTime: documents.get(documentKey).readTime
        });
      });
      return documents;
    });
  }
};
function documentGlobalStore(txn) {
  return getStore(txn, DbRemoteDocumentGlobalStore);
}
function remoteDocumentsStore(txn) {
  return getStore(txn, DbRemoteDocumentStore);
}
function dbKey(documentKey) {
  const path = documentKey.path.toArray();
  return [
    /* prefix path */
    path.slice(0, path.length - 2),
    /* collection id */
    path[path.length - 2],
    /* document id */
    path[path.length - 1]
  ];
}
function dbReadTimeKey(documentKey, readTime) {
  const path = documentKey.path.toArray();
  return [
    /* prefix path */
    path.slice(0, path.length - 2),
    /* collection id */
    path[path.length - 2],
    toDbTimestampKey(readTime),
    /* document id */
    path[path.length - 1]
  ];
}
function dbCollectionGroupKey(collectionGroup3, offset) {
  const path = offset.documentKey.path.toArray();
  return [
    /* collection id */
    collectionGroup3,
    toDbTimestampKey(offset.readTime),
    /* prefix path */
    path.slice(0, path.length - 2),
    /* document id */
    path.length > 0 ? path[path.length - 1] : ""
  ];
}
function dbKeyComparator(l, r) {
  const left = l.path.toArray();
  const right = r.path.toArray();
  let cmp = 0;
  for (let i = 0; i < left.length - 2 && i < right.length - 2; ++i) {
    cmp = primitiveComparator(left[i], right[i]);
    if (cmp) {
      return cmp;
    }
  }
  cmp = primitiveComparator(left.length, right.length);
  if (cmp) {
    return cmp;
  }
  cmp = primitiveComparator(left[left.length - 2], right[right.length - 2]);
  if (cmp) {
    return cmp;
  }
  return primitiveComparator(left[left.length - 1], right[right.length - 1]);
}
var SCHEMA_VERSION = 17;
var OverlayedDocument = class {
  constructor(overlayedDocument, mutatedFields) {
    this.overlayedDocument = overlayedDocument;
    this.mutatedFields = mutatedFields;
  }
};
var LocalDocumentsView = class {
  constructor(remoteDocumentCache, mutationQueue, documentOverlayCache, indexManager) {
    this.remoteDocumentCache = remoteDocumentCache;
    this.mutationQueue = mutationQueue;
    this.documentOverlayCache = documentOverlayCache;
    this.indexManager = indexManager;
  }
  /**
   * Get the local view of the document identified by `key`.
   *
   * @returns Local view of the document or null if we don't have any cached
   * state for it.
   */
  getDocument(transaction, key) {
    let overlay = null;
    return this.documentOverlayCache.getOverlay(transaction, key).next((value) => {
      overlay = value;
      return this.remoteDocumentCache.getEntry(transaction, key);
    }).next((document) => {
      if (overlay !== null) {
        mutationApplyToLocalView(overlay.mutation, document, FieldMask.empty(), Timestamp.now());
      }
      return document;
    });
  }
  /**
   * Gets the local view of the documents identified by `keys`.
   *
   * If we don't have cached state for a document in `keys`, a NoDocument will
   * be stored for that key in the resulting set.
   */
  getDocuments(transaction, keys) {
    return this.remoteDocumentCache.getEntries(transaction, keys).next((docs) => this.getLocalViewOfDocuments(transaction, docs, documentKeySet()).next(() => docs));
  }
  /**
   * Similar to `getDocuments`, but creates the local view from the given
   * `baseDocs` without retrieving documents from the local store.
   *
   * @param transaction - The transaction this operation is scoped to.
   * @param docs - The documents to apply local mutations to get the local views.
   * @param existenceStateChanged - The set of document keys whose existence state
   *   is changed. This is useful to determine if some documents overlay needs
   *   to be recalculated.
   */
  getLocalViewOfDocuments(transaction, docs, existenceStateChanged = documentKeySet()) {
    const overlays = newOverlayMap();
    return this.populateOverlays(transaction, overlays, docs).next(() => {
      return this.computeViews(transaction, docs, overlays, existenceStateChanged).next((computeViewsResult) => {
        let result = documentMap();
        computeViewsResult.forEach((documentKey, overlayedDocument) => {
          result = result.insert(documentKey, overlayedDocument.overlayedDocument);
        });
        return result;
      });
    });
  }
  /**
   * Gets the overlayed documents for the given document map, which will include
   * the local view of those documents and a `FieldMask` indicating which fields
   * are mutated locally, `null` if overlay is a Set or Delete mutation.
   */
  getOverlayedDocuments(transaction, docs) {
    const overlays = newOverlayMap();
    return this.populateOverlays(transaction, overlays, docs).next(() => this.computeViews(transaction, docs, overlays, documentKeySet()));
  }
  /**
   * Fetches the overlays for {@code docs} and adds them to provided overlay map
   * if the map does not already contain an entry for the given document key.
   */
  populateOverlays(transaction, overlays, docs) {
    const missingOverlays = [];
    docs.forEach((key) => {
      if (!overlays.has(key)) {
        missingOverlays.push(key);
      }
    });
    return this.documentOverlayCache.getOverlays(transaction, missingOverlays).next((result) => {
      result.forEach((key, val) => {
        overlays.set(key, val);
      });
    });
  }
  /**
   * Computes the local view for the given documents.
   *
   * @param docs - The documents to compute views for. It also has the base
   *   version of the documents.
   * @param overlays - The overlays that need to be applied to the given base
   *   version of the documents.
   * @param existenceStateChanged - A set of documents whose existence states
   *   might have changed. This is used to determine if we need to re-calculate
   *   overlays from mutation queues.
   * @return A map represents the local documents view.
   */
  computeViews(transaction, docs, overlays, existenceStateChanged) {
    let recalculateDocuments = mutableDocumentMap();
    const mutatedFields = newDocumentKeyMap();
    const results = newOverlayedDocumentMap();
    docs.forEach((_, doc4) => {
      const overlay = overlays.get(doc4.key);
      if (existenceStateChanged.has(doc4.key) && (overlay === void 0 || overlay.mutation instanceof PatchMutation)) {
        recalculateDocuments = recalculateDocuments.insert(doc4.key, doc4);
      } else if (overlay !== void 0) {
        mutatedFields.set(doc4.key, overlay.mutation.getFieldMask());
        mutationApplyToLocalView(overlay.mutation, doc4, overlay.mutation.getFieldMask(), Timestamp.now());
      } else {
        mutatedFields.set(doc4.key, FieldMask.empty());
      }
    });
    return this.recalculateAndSaveOverlays(transaction, recalculateDocuments).next((recalculatedFields) => {
      recalculatedFields.forEach((documentKey, mask) => mutatedFields.set(documentKey, mask));
      docs.forEach((documentKey, document) => {
        var _a;
        return results.set(documentKey, new OverlayedDocument(document, (_a = mutatedFields.get(documentKey)) !== null && _a !== void 0 ? _a : null));
      });
      return results;
    });
  }
  recalculateAndSaveOverlays(transaction, docs) {
    const masks = newDocumentKeyMap();
    let documentsByBatchId = new SortedMap((key1, key2) => key1 - key2);
    let processed = documentKeySet();
    return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(transaction, docs).next((batches) => {
      for (const batch of batches) {
        batch.keys().forEach((key) => {
          const baseDoc = docs.get(key);
          if (baseDoc === null) {
            return;
          }
          let mask = masks.get(key) || FieldMask.empty();
          mask = batch.applyToLocalView(baseDoc, mask);
          masks.set(key, mask);
          const newSet = (documentsByBatchId.get(batch.batchId) || documentKeySet()).add(key);
          documentsByBatchId = documentsByBatchId.insert(batch.batchId, newSet);
        });
      }
    }).next(() => {
      const promises = [];
      const iter = documentsByBatchId.getReverseIterator();
      while (iter.hasNext()) {
        const entry = iter.getNext();
        const batchId = entry.key;
        const keys = entry.value;
        const overlays = newMutationMap();
        keys.forEach((key) => {
          if (!processed.has(key)) {
            const overlayMutation = calculateOverlayMutation(docs.get(key), masks.get(key));
            if (overlayMutation !== null) {
              overlays.set(key, overlayMutation);
            }
            processed = processed.add(key);
          }
        });
        promises.push(this.documentOverlayCache.saveOverlays(transaction, batchId, overlays));
      }
      return PersistencePromise.waitFor(promises);
    }).next(() => masks);
  }
  /**
   * Recalculates overlays by reading the documents from remote document cache
   * first, and saves them after they are calculated.
   */
  recalculateAndSaveOverlaysForDocumentKeys(transaction, documentKeys) {
    return this.remoteDocumentCache.getEntries(transaction, documentKeys).next((docs) => this.recalculateAndSaveOverlays(transaction, docs));
  }
  /**
   * Performs a query against the local view of all documents.
   *
   * @param transaction - The persistence transaction.
   * @param query - The query to match documents against.
   * @param offset - Read time and key to start scanning by (exclusive).
   * @param context - A optional tracker to keep a record of important details
   *   during database local query execution.
   */
  getDocumentsMatchingQuery(transaction, query3, offset, context) {
    if (isDocumentQuery$1(query3)) {
      return this.getDocumentsMatchingDocumentQuery(transaction, query3.path);
    } else if (isCollectionGroupQuery(query3)) {
      return this.getDocumentsMatchingCollectionGroupQuery(transaction, query3, offset, context);
    } else {
      return this.getDocumentsMatchingCollectionQuery(transaction, query3, offset, context);
    }
  }
  /**
   * Given a collection group, returns the next documents that follow the provided offset, along
   * with an updated batch ID.
   *
   * <p>The documents returned by this method are ordered by remote version from the provided
   * offset. If there are no more remote documents after the provided offset, documents with
   * mutations in order of batch id from the offset are returned. Since all documents in a batch are
   * returned together, the total number of documents returned can exceed {@code count}.
   *
   * @param transaction
   * @param collectionGroup The collection group for the documents.
   * @param offset The offset to index into.
   * @param count The number of documents to return
   * @return A LocalWriteResult with the documents that follow the provided offset and the last processed batch id.
   */
  getNextDocuments(transaction, collectionGroup3, offset, count3) {
    return this.remoteDocumentCache.getAllFromCollectionGroup(transaction, collectionGroup3, offset, count3).next((originalDocs) => {
      const overlaysPromise = count3 - originalDocs.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(transaction, collectionGroup3, offset.largestBatchId, count3 - originalDocs.size) : PersistencePromise.resolve(newOverlayMap());
      let largestBatchId = INITIAL_LARGEST_BATCH_ID;
      let modifiedDocs = originalDocs;
      return overlaysPromise.next((overlays) => {
        return PersistencePromise.forEach(overlays, (key, overlay) => {
          if (largestBatchId < overlay.largestBatchId) {
            largestBatchId = overlay.largestBatchId;
          }
          if (originalDocs.get(key)) {
            return PersistencePromise.resolve();
          }
          return this.remoteDocumentCache.getEntry(transaction, key).next((doc4) => {
            modifiedDocs = modifiedDocs.insert(key, doc4);
          });
        }).next(() => this.populateOverlays(transaction, overlays, originalDocs)).next(() => this.computeViews(transaction, modifiedDocs, overlays, documentKeySet())).next((localDocs) => ({
          batchId: largestBatchId,
          changes: convertOverlayedDocumentMapToDocumentMap(localDocs)
        }));
      });
    });
  }
  getDocumentsMatchingDocumentQuery(transaction, docPath) {
    return this.getDocument(transaction, new DocumentKey(docPath)).next((document) => {
      let result = documentMap();
      if (document.isFoundDocument()) {
        result = result.insert(document.key, document);
      }
      return result;
    });
  }
  getDocumentsMatchingCollectionGroupQuery(transaction, query3, offset, context) {
    const collectionId = query3.collectionGroup;
    let results = documentMap();
    return this.indexManager.getCollectionParents(transaction, collectionId).next((parents) => {
      return PersistencePromise.forEach(parents, (parent) => {
        const collectionQuery = asCollectionQueryAtPath(query3, parent.child(collectionId));
        return this.getDocumentsMatchingCollectionQuery(transaction, collectionQuery, offset, context).next((r) => {
          r.forEach((key, doc4) => {
            results = results.insert(key, doc4);
          });
        });
      }).next(() => results);
    });
  }
  getDocumentsMatchingCollectionQuery(transaction, query3, offset, context) {
    let overlays;
    return this.documentOverlayCache.getOverlaysForCollection(transaction, query3.path, offset.largestBatchId).next((result) => {
      overlays = result;
      return this.remoteDocumentCache.getDocumentsMatchingQuery(transaction, query3, offset, overlays, context);
    }).next((remoteDocuments) => {
      overlays.forEach((_, overlay) => {
        const key = overlay.getKey();
        if (remoteDocuments.get(key) === null) {
          remoteDocuments = remoteDocuments.insert(key, MutableDocument.newInvalidDocument(key));
        }
      });
      let results = documentMap();
      remoteDocuments.forEach((key, document) => {
        const overlay = overlays.get(key);
        if (overlay !== void 0) {
          mutationApplyToLocalView(overlay.mutation, document, FieldMask.empty(), Timestamp.now());
        }
        if (queryMatches(query3, document)) {
          results = results.insert(key, document);
        }
      });
      return results;
    });
  }
};
var MemoryBundleCache = class {
  constructor(serializer) {
    this.serializer = serializer;
    this.bundles = /* @__PURE__ */ new Map();
    this.namedQueries = /* @__PURE__ */ new Map();
  }
  getBundleMetadata(transaction, bundleId) {
    return PersistencePromise.resolve(this.bundles.get(bundleId));
  }
  saveBundleMetadata(transaction, bundleMetadata) {
    this.bundles.set(bundleMetadata.id, fromBundleMetadata(bundleMetadata));
    return PersistencePromise.resolve();
  }
  getNamedQuery(transaction, queryName) {
    return PersistencePromise.resolve(this.namedQueries.get(queryName));
  }
  saveNamedQuery(transaction, query3) {
    this.namedQueries.set(query3.name, fromProtoNamedQuery(query3));
    return PersistencePromise.resolve();
  }
};
var MemoryDocumentOverlayCache = class {
  constructor() {
    this.overlays = new SortedMap(DocumentKey.comparator);
    this.overlayByBatchId = /* @__PURE__ */ new Map();
  }
  getOverlay(transaction, key) {
    return PersistencePromise.resolve(this.overlays.get(key));
  }
  getOverlays(transaction, keys) {
    const result = newOverlayMap();
    return PersistencePromise.forEach(keys, (key) => {
      return this.getOverlay(transaction, key).next((overlay) => {
        if (overlay !== null) {
          result.set(key, overlay);
        }
      });
    }).next(() => result);
  }
  saveOverlays(transaction, largestBatchId, overlays) {
    overlays.forEach((_, mutation) => {
      this.saveOverlay(transaction, largestBatchId, mutation);
    });
    return PersistencePromise.resolve();
  }
  removeOverlaysForBatchId(transaction, documentKeys, batchId) {
    const keys = this.overlayByBatchId.get(batchId);
    if (keys !== void 0) {
      keys.forEach((key) => this.overlays = this.overlays.remove(key));
      this.overlayByBatchId.delete(batchId);
    }
    return PersistencePromise.resolve();
  }
  getOverlaysForCollection(transaction, collection4, sinceBatchId) {
    const result = newOverlayMap();
    const immediateChildrenPathLength = collection4.length + 1;
    const prefix = new DocumentKey(collection4.child(""));
    const iter = this.overlays.getIteratorFrom(prefix);
    while (iter.hasNext()) {
      const entry = iter.getNext();
      const overlay = entry.value;
      const key = overlay.getKey();
      if (!collection4.isPrefixOf(key.path)) {
        break;
      }
      if (key.path.length !== immediateChildrenPathLength) {
        continue;
      }
      if (overlay.largestBatchId > sinceBatchId) {
        result.set(overlay.getKey(), overlay);
      }
    }
    return PersistencePromise.resolve(result);
  }
  getOverlaysForCollectionGroup(transaction, collectionGroup3, sinceBatchId, count3) {
    let batchIdToOverlays = new SortedMap((key1, key2) => key1 - key2);
    const iter = this.overlays.getIterator();
    while (iter.hasNext()) {
      const entry = iter.getNext();
      const overlay = entry.value;
      const key = overlay.getKey();
      if (key.getCollectionGroup() !== collectionGroup3) {
        continue;
      }
      if (overlay.largestBatchId > sinceBatchId) {
        let overlaysForBatchId = batchIdToOverlays.get(overlay.largestBatchId);
        if (overlaysForBatchId === null) {
          overlaysForBatchId = newOverlayMap();
          batchIdToOverlays = batchIdToOverlays.insert(overlay.largestBatchId, overlaysForBatchId);
        }
        overlaysForBatchId.set(overlay.getKey(), overlay);
      }
    }
    const result = newOverlayMap();
    const batchIter = batchIdToOverlays.getIterator();
    while (batchIter.hasNext()) {
      const entry = batchIter.getNext();
      const overlays = entry.value;
      overlays.forEach((key, overlay) => result.set(key, overlay));
      if (result.size() >= count3) {
        break;
      }
    }
    return PersistencePromise.resolve(result);
  }
  saveOverlay(transaction, largestBatchId, mutation) {
    const existing = this.overlays.get(mutation.key);
    if (existing !== null) {
      const newSet = this.overlayByBatchId.get(existing.largestBatchId).delete(mutation.key);
      this.overlayByBatchId.set(existing.largestBatchId, newSet);
    }
    this.overlays = this.overlays.insert(mutation.key, new Overlay(largestBatchId, mutation));
    let batch = this.overlayByBatchId.get(largestBatchId);
    if (batch === void 0) {
      batch = documentKeySet();
      this.overlayByBatchId.set(largestBatchId, batch);
    }
    this.overlayByBatchId.set(largestBatchId, batch.add(mutation.key));
  }
};
var MemoryGlobalsCache = class {
  constructor() {
    this.sessionToken = ByteString.EMPTY_BYTE_STRING;
  }
  getSessionToken(transaction) {
    return PersistencePromise.resolve(this.sessionToken);
  }
  setSessionToken(transaction, sessionToken) {
    this.sessionToken = sessionToken;
    return PersistencePromise.resolve();
  }
};
var ReferenceSet = class {
  constructor() {
    this.refsByKey = new SortedSet(DocReference.compareByKey);
    this.refsByTarget = new SortedSet(DocReference.compareByTargetId);
  }
  /** Returns true if the reference set contains no references. */
  isEmpty() {
    return this.refsByKey.isEmpty();
  }
  /** Adds a reference to the given document key for the given ID. */
  addReference(key, id) {
    const ref = new DocReference(key, id);
    this.refsByKey = this.refsByKey.add(ref);
    this.refsByTarget = this.refsByTarget.add(ref);
  }
  /** Add references to the given document keys for the given ID. */
  addReferences(keys, id) {
    keys.forEach((key) => this.addReference(key, id));
  }
  /**
   * Removes a reference to the given document key for the given
   * ID.
   */
  removeReference(key, id) {
    this.removeRef(new DocReference(key, id));
  }
  removeReferences(keys, id) {
    keys.forEach((key) => this.removeReference(key, id));
  }
  /**
   * Clears all references with a given ID. Calls removeRef() for each key
   * removed.
   */
  removeReferencesForId(id) {
    const emptyKey = new DocumentKey(new ResourcePath([]));
    const startRef = new DocReference(emptyKey, id);
    const endRef = new DocReference(emptyKey, id + 1);
    const keys = [];
    this.refsByTarget.forEachInRange([startRef, endRef], (ref) => {
      this.removeRef(ref);
      keys.push(ref.key);
    });
    return keys;
  }
  removeAllReferences() {
    this.refsByKey.forEach((ref) => this.removeRef(ref));
  }
  removeRef(ref) {
    this.refsByKey = this.refsByKey.delete(ref);
    this.refsByTarget = this.refsByTarget.delete(ref);
  }
  referencesForId(id) {
    const emptyKey = new DocumentKey(new ResourcePath([]));
    const startRef = new DocReference(emptyKey, id);
    const endRef = new DocReference(emptyKey, id + 1);
    let keys = documentKeySet();
    this.refsByTarget.forEachInRange([startRef, endRef], (ref) => {
      keys = keys.add(ref.key);
    });
    return keys;
  }
  containsKey(key) {
    const ref = new DocReference(key, 0);
    const firstRef = this.refsByKey.firstAfterOrEqual(ref);
    return firstRef !== null && key.isEqual(firstRef.key);
  }
};
var DocReference = class {
  constructor(key, targetOrBatchId) {
    this.key = key;
    this.targetOrBatchId = targetOrBatchId;
  }
  /** Compare by key then by ID */
  static compareByKey(left, right) {
    return DocumentKey.comparator(left.key, right.key) || primitiveComparator(left.targetOrBatchId, right.targetOrBatchId);
  }
  /** Compare by ID then by key */
  static compareByTargetId(left, right) {
    return primitiveComparator(left.targetOrBatchId, right.targetOrBatchId) || DocumentKey.comparator(left.key, right.key);
  }
};
var MemoryMutationQueue = class {
  constructor(indexManager, referenceDelegate) {
    this.indexManager = indexManager;
    this.referenceDelegate = referenceDelegate;
    this.mutationQueue = [];
    this.nextBatchId = 1;
    this.batchesByDocumentKey = new SortedSet(DocReference.compareByKey);
  }
  checkEmpty(transaction) {
    return PersistencePromise.resolve(this.mutationQueue.length === 0);
  }
  addMutationBatch(transaction, localWriteTime, baseMutations, mutations) {
    const batchId = this.nextBatchId;
    this.nextBatchId++;
    if (this.mutationQueue.length > 0) {
      this.mutationQueue[this.mutationQueue.length - 1];
    }
    const batch = new MutationBatch(batchId, localWriteTime, baseMutations, mutations);
    this.mutationQueue.push(batch);
    for (const mutation of mutations) {
      this.batchesByDocumentKey = this.batchesByDocumentKey.add(new DocReference(mutation.key, batchId));
      this.indexManager.addToCollectionParentIndex(transaction, mutation.key.path.popLast());
    }
    return PersistencePromise.resolve(batch);
  }
  lookupMutationBatch(transaction, batchId) {
    return PersistencePromise.resolve(this.findMutationBatch(batchId));
  }
  getNextMutationBatchAfterBatchId(transaction, batchId) {
    const nextBatchId = batchId + 1;
    const rawIndex = this.indexOfBatchId(nextBatchId);
    const index = rawIndex < 0 ? 0 : rawIndex;
    return PersistencePromise.resolve(this.mutationQueue.length > index ? this.mutationQueue[index] : null);
  }
  getHighestUnacknowledgedBatchId() {
    return PersistencePromise.resolve(this.mutationQueue.length === 0 ? BATCHID_UNKNOWN : this.nextBatchId - 1);
  }
  getAllMutationBatches(transaction) {
    return PersistencePromise.resolve(this.mutationQueue.slice());
  }
  getAllMutationBatchesAffectingDocumentKey(transaction, documentKey) {
    const start = new DocReference(documentKey, 0);
    const end = new DocReference(documentKey, Number.POSITIVE_INFINITY);
    const result = [];
    this.batchesByDocumentKey.forEachInRange([start, end], (ref) => {
      const batch = this.findMutationBatch(ref.targetOrBatchId);
      result.push(batch);
    });
    return PersistencePromise.resolve(result);
  }
  getAllMutationBatchesAffectingDocumentKeys(transaction, documentKeys) {
    let uniqueBatchIDs = new SortedSet(primitiveComparator);
    documentKeys.forEach((documentKey) => {
      const start = new DocReference(documentKey, 0);
      const end = new DocReference(documentKey, Number.POSITIVE_INFINITY);
      this.batchesByDocumentKey.forEachInRange([start, end], (ref) => {
        uniqueBatchIDs = uniqueBatchIDs.add(ref.targetOrBatchId);
      });
    });
    return PersistencePromise.resolve(this.findMutationBatches(uniqueBatchIDs));
  }
  getAllMutationBatchesAffectingQuery(transaction, query3) {
    const prefix = query3.path;
    const immediateChildrenPathLength = prefix.length + 1;
    let startPath = prefix;
    if (!DocumentKey.isDocumentKey(startPath)) {
      startPath = startPath.child("");
    }
    const start = new DocReference(new DocumentKey(startPath), 0);
    let uniqueBatchIDs = new SortedSet(primitiveComparator);
    this.batchesByDocumentKey.forEachWhile((ref) => {
      const rowKeyPath = ref.key.path;
      if (!prefix.isPrefixOf(rowKeyPath)) {
        return false;
      } else {
        if (rowKeyPath.length === immediateChildrenPathLength) {
          uniqueBatchIDs = uniqueBatchIDs.add(ref.targetOrBatchId);
        }
        return true;
      }
    }, start);
    return PersistencePromise.resolve(this.findMutationBatches(uniqueBatchIDs));
  }
  findMutationBatches(batchIDs) {
    const result = [];
    batchIDs.forEach((batchId) => {
      const batch = this.findMutationBatch(batchId);
      if (batch !== null) {
        result.push(batch);
      }
    });
    return result;
  }
  removeMutationBatch(transaction, batch) {
    const batchIndex = this.indexOfExistingBatchId(batch.batchId, "removed");
    hardAssert(batchIndex === 0);
    this.mutationQueue.shift();
    let references = this.batchesByDocumentKey;
    return PersistencePromise.forEach(batch.mutations, (mutation) => {
      const ref = new DocReference(mutation.key, batch.batchId);
      references = references.delete(ref);
      return this.referenceDelegate.markPotentiallyOrphaned(transaction, mutation.key);
    }).next(() => {
      this.batchesByDocumentKey = references;
    });
  }
  removeCachedMutationKeys(batchId) {
  }
  containsKey(txn, key) {
    const ref = new DocReference(key, 0);
    const firstRef = this.batchesByDocumentKey.firstAfterOrEqual(ref);
    return PersistencePromise.resolve(key.isEqual(firstRef && firstRef.key));
  }
  performConsistencyCheck(txn) {
    if (this.mutationQueue.length === 0) ;
    return PersistencePromise.resolve();
  }
  /**
   * Finds the index of the given batchId in the mutation queue and asserts that
   * the resulting index is within the bounds of the queue.
   *
   * @param batchId - The batchId to search for
   * @param action - A description of what the caller is doing, phrased in passive
   * form (e.g. "acknowledged" in a routine that acknowledges batches).
   */
  indexOfExistingBatchId(batchId, action) {
    const index = this.indexOfBatchId(batchId);
    return index;
  }
  /**
   * Finds the index of the given batchId in the mutation queue. This operation
   * is O(1).
   *
   * @returns The computed index of the batch with the given batchId, based on
   * the state of the queue. Note this index can be negative if the requested
   * batchId has already been removed from the queue or past the end of the
   * queue if the batchId is larger than the last added batch.
   */
  indexOfBatchId(batchId) {
    if (this.mutationQueue.length === 0) {
      return 0;
    }
    const firstBatchId = this.mutationQueue[0].batchId;
    return batchId - firstBatchId;
  }
  /**
   * A version of lookupMutationBatch that doesn't return a promise, this makes
   * other functions that uses this code easier to read and more efficient.
   */
  findMutationBatch(batchId) {
    const index = this.indexOfBatchId(batchId);
    if (index < 0 || index >= this.mutationQueue.length) {
      return null;
    }
    const batch = this.mutationQueue[index];
    return batch;
  }
};
function documentEntryMap() {
  return new SortedMap(DocumentKey.comparator);
}
var MemoryRemoteDocumentCacheImpl = class {
  /**
   * @param sizer - Used to assess the size of a document. For eager GC, this is
   * expected to just return 0 to avoid unnecessarily doing the work of
   * calculating the size.
   */
  constructor(sizer) {
    this.sizer = sizer;
    this.docs = documentEntryMap();
    this.size = 0;
  }
  setIndexManager(indexManager) {
    this.indexManager = indexManager;
  }
  /**
   * Adds the supplied entry to the cache and updates the cache size as appropriate.
   *
   * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
   * returned by `newChangeBuffer()`.
   */
  addEntry(transaction, doc4) {
    const key = doc4.key;
    const entry = this.docs.get(key);
    const previousSize = entry ? entry.size : 0;
    const currentSize = this.sizer(doc4);
    this.docs = this.docs.insert(key, {
      document: doc4.mutableCopy(),
      size: currentSize
    });
    this.size += currentSize - previousSize;
    return this.indexManager.addToCollectionParentIndex(transaction, key.path.popLast());
  }
  /**
   * Removes the specified entry from the cache and updates the cache size as appropriate.
   *
   * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
   * returned by `newChangeBuffer()`.
   */
  removeEntry(documentKey) {
    const entry = this.docs.get(documentKey);
    if (entry) {
      this.docs = this.docs.remove(documentKey);
      this.size -= entry.size;
    }
  }
  getEntry(transaction, documentKey) {
    const entry = this.docs.get(documentKey);
    return PersistencePromise.resolve(entry ? entry.document.mutableCopy() : MutableDocument.newInvalidDocument(documentKey));
  }
  getEntries(transaction, documentKeys) {
    let results = mutableDocumentMap();
    documentKeys.forEach((documentKey) => {
      const entry = this.docs.get(documentKey);
      results = results.insert(documentKey, entry ? entry.document.mutableCopy() : MutableDocument.newInvalidDocument(documentKey));
    });
    return PersistencePromise.resolve(results);
  }
  getDocumentsMatchingQuery(transaction, query3, offset, mutatedDocs) {
    let results = mutableDocumentMap();
    const collectionPath = query3.path;
    const prefix = new DocumentKey(collectionPath.child(""));
    const iterator = this.docs.getIteratorFrom(prefix);
    while (iterator.hasNext()) {
      const {
        key,
        value: {
          document
        }
      } = iterator.getNext();
      if (!collectionPath.isPrefixOf(key.path)) {
        break;
      }
      if (key.path.length > collectionPath.length + 1) {
        continue;
      }
      if (indexOffsetComparator(newIndexOffsetFromDocument(document), offset) <= 0) {
        continue;
      }
      if (!mutatedDocs.has(document.key) && !queryMatches(query3, document)) {
        continue;
      }
      results = results.insert(document.key, document.mutableCopy());
    }
    return PersistencePromise.resolve(results);
  }
  getAllFromCollectionGroup(transaction, collectionGroup3, offset, limit3) {
    fail();
  }
  forEachDocumentKey(transaction, f) {
    return PersistencePromise.forEach(this.docs, (key) => f(key));
  }
  newChangeBuffer(options) {
    return new MemoryRemoteDocumentChangeBuffer(this);
  }
  getSize(txn) {
    return PersistencePromise.resolve(this.size);
  }
};
function newMemoryRemoteDocumentCache(sizer) {
  return new MemoryRemoteDocumentCacheImpl(sizer);
}
var MemoryRemoteDocumentChangeBuffer = class extends RemoteDocumentChangeBuffer {
  constructor(documentCache) {
    super();
    this.documentCache = documentCache;
  }
  applyChanges(transaction) {
    const promises = [];
    this.changes.forEach((key, doc4) => {
      if (doc4.isValidDocument()) {
        promises.push(this.documentCache.addEntry(transaction, doc4));
      } else {
        this.documentCache.removeEntry(key);
      }
    });
    return PersistencePromise.waitFor(promises);
  }
  getFromCache(transaction, documentKey) {
    return this.documentCache.getEntry(transaction, documentKey);
  }
  getAllFromCache(transaction, documentKeys) {
    return this.documentCache.getEntries(transaction, documentKeys);
  }
};
var MemoryTargetCache = class {
  constructor(persistence) {
    this.persistence = persistence;
    this.targets = new ObjectMap((t) => canonifyTarget(t), targetEquals);
    this.lastRemoteSnapshotVersion = SnapshotVersion.min();
    this.highestTargetId = 0;
    this.highestSequenceNumber = 0;
    this.references = new ReferenceSet();
    this.targetCount = 0;
    this.targetIdGenerator = TargetIdGenerator.forTargetCache();
  }
  forEachTarget(txn, f) {
    this.targets.forEach((_, targetData) => f(targetData));
    return PersistencePromise.resolve();
  }
  getLastRemoteSnapshotVersion(transaction) {
    return PersistencePromise.resolve(this.lastRemoteSnapshotVersion);
  }
  getHighestSequenceNumber(transaction) {
    return PersistencePromise.resolve(this.highestSequenceNumber);
  }
  allocateTargetId(transaction) {
    this.highestTargetId = this.targetIdGenerator.next();
    return PersistencePromise.resolve(this.highestTargetId);
  }
  setTargetsMetadata(transaction, highestListenSequenceNumber, lastRemoteSnapshotVersion) {
    if (lastRemoteSnapshotVersion) {
      this.lastRemoteSnapshotVersion = lastRemoteSnapshotVersion;
    }
    if (highestListenSequenceNumber > this.highestSequenceNumber) {
      this.highestSequenceNumber = highestListenSequenceNumber;
    }
    return PersistencePromise.resolve();
  }
  saveTargetData(targetData) {
    this.targets.set(targetData.target, targetData);
    const targetId = targetData.targetId;
    if (targetId > this.highestTargetId) {
      this.targetIdGenerator = new TargetIdGenerator(targetId);
      this.highestTargetId = targetId;
    }
    if (targetData.sequenceNumber > this.highestSequenceNumber) {
      this.highestSequenceNumber = targetData.sequenceNumber;
    }
  }
  addTargetData(transaction, targetData) {
    this.saveTargetData(targetData);
    this.targetCount += 1;
    return PersistencePromise.resolve();
  }
  updateTargetData(transaction, targetData) {
    this.saveTargetData(targetData);
    return PersistencePromise.resolve();
  }
  removeTargetData(transaction, targetData) {
    this.targets.delete(targetData.target);
    this.references.removeReferencesForId(targetData.targetId);
    this.targetCount -= 1;
    return PersistencePromise.resolve();
  }
  removeTargets(transaction, upperBound, activeTargetIds) {
    let count3 = 0;
    const removals = [];
    this.targets.forEach((key, targetData) => {
      if (targetData.sequenceNumber <= upperBound && activeTargetIds.get(targetData.targetId) === null) {
        this.targets.delete(key);
        removals.push(this.removeMatchingKeysForTargetId(transaction, targetData.targetId));
        count3++;
      }
    });
    return PersistencePromise.waitFor(removals).next(() => count3);
  }
  getTargetCount(transaction) {
    return PersistencePromise.resolve(this.targetCount);
  }
  getTargetData(transaction, target) {
    const targetData = this.targets.get(target) || null;
    return PersistencePromise.resolve(targetData);
  }
  addMatchingKeys(txn, keys, targetId) {
    this.references.addReferences(keys, targetId);
    return PersistencePromise.resolve();
  }
  removeMatchingKeys(txn, keys, targetId) {
    this.references.removeReferences(keys, targetId);
    const referenceDelegate = this.persistence.referenceDelegate;
    const promises = [];
    if (referenceDelegate) {
      keys.forEach((key) => {
        promises.push(referenceDelegate.markPotentiallyOrphaned(txn, key));
      });
    }
    return PersistencePromise.waitFor(promises);
  }
  removeMatchingKeysForTargetId(txn, targetId) {
    this.references.removeReferencesForId(targetId);
    return PersistencePromise.resolve();
  }
  getMatchingKeysForTargetId(txn, targetId) {
    const matchingKeys = this.references.referencesForId(targetId);
    return PersistencePromise.resolve(matchingKeys);
  }
  containsKey(txn, key) {
    return PersistencePromise.resolve(this.references.containsKey(key));
  }
};
var LOG_TAG$d = "MemoryPersistence";
var MemoryPersistence = class {
  /**
   * The constructor accepts a factory for creating a reference delegate. This
   * allows both the delegate and this instance to have strong references to
   * each other without having nullable fields that would then need to be
   * checked or asserted on every access.
   */
  constructor(referenceDelegateFactory, serializer) {
    this.mutationQueues = {};
    this.overlays = {};
    this.listenSequence = new ListenSequence(0);
    this._started = false;
    this._started = true;
    this.globalsCache = new MemoryGlobalsCache();
    this.referenceDelegate = referenceDelegateFactory(this);
    this.targetCache = new MemoryTargetCache(this);
    const sizer = (doc4) => this.referenceDelegate.documentSize(doc4);
    this.indexManager = new MemoryIndexManager();
    this.remoteDocumentCache = newMemoryRemoteDocumentCache(sizer);
    this.serializer = new LocalSerializer(serializer);
    this.bundleCache = new MemoryBundleCache(this.serializer);
  }
  start() {
    return Promise.resolve();
  }
  shutdown() {
    this._started = false;
    return Promise.resolve();
  }
  get started() {
    return this._started;
  }
  setDatabaseDeletedListener() {
  }
  setNetworkEnabled() {
  }
  getIndexManager(user) {
    return this.indexManager;
  }
  getDocumentOverlayCache(user) {
    let overlay = this.overlays[user.toKey()];
    if (!overlay) {
      overlay = new MemoryDocumentOverlayCache();
      this.overlays[user.toKey()] = overlay;
    }
    return overlay;
  }
  getMutationQueue(user, indexManager) {
    let queue = this.mutationQueues[user.toKey()];
    if (!queue) {
      queue = new MemoryMutationQueue(indexManager, this.referenceDelegate);
      this.mutationQueues[user.toKey()] = queue;
    }
    return queue;
  }
  getGlobalsCache() {
    return this.globalsCache;
  }
  getTargetCache() {
    return this.targetCache;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getBundleCache() {
    return this.bundleCache;
  }
  runTransaction(action, mode, transactionOperation) {
    logDebug(LOG_TAG$d, "Starting transaction:", action);
    const txn = new MemoryTransaction(this.listenSequence.next());
    this.referenceDelegate.onTransactionStarted();
    return transactionOperation(txn).next((result) => {
      return this.referenceDelegate.onTransactionCommitted(txn).next(() => result);
    }).toPromise().then((result) => {
      txn.raiseOnCommittedEvent();
      return result;
    });
  }
  mutationQueuesContainKey(transaction, key) {
    return PersistencePromise.or(Object.values(this.mutationQueues).map((queue) => () => queue.containsKey(transaction, key)));
  }
};
var MemoryTransaction = class extends PersistenceTransaction {
  constructor(currentSequenceNumber) {
    super();
    this.currentSequenceNumber = currentSequenceNumber;
  }
};
var MemoryEagerDelegate = class _MemoryEagerDelegate {
  constructor(persistence) {
    this.persistence = persistence;
    this.localViewReferences = new ReferenceSet();
    this._orphanedDocuments = null;
  }
  static factory(persistence) {
    return new _MemoryEagerDelegate(persistence);
  }
  get orphanedDocuments() {
    if (!this._orphanedDocuments) {
      throw fail();
    } else {
      return this._orphanedDocuments;
    }
  }
  addReference(txn, targetId, key) {
    this.localViewReferences.addReference(key, targetId);
    this.orphanedDocuments.delete(key.toString());
    return PersistencePromise.resolve();
  }
  removeReference(txn, targetId, key) {
    this.localViewReferences.removeReference(key, targetId);
    this.orphanedDocuments.add(key.toString());
    return PersistencePromise.resolve();
  }
  markPotentiallyOrphaned(txn, key) {
    this.orphanedDocuments.add(key.toString());
    return PersistencePromise.resolve();
  }
  removeTarget(txn, targetData) {
    const orphaned = this.localViewReferences.removeReferencesForId(targetData.targetId);
    orphaned.forEach((key) => this.orphanedDocuments.add(key.toString()));
    const cache = this.persistence.getTargetCache();
    return cache.getMatchingKeysForTargetId(txn, targetData.targetId).next((keys) => {
      keys.forEach((key) => this.orphanedDocuments.add(key.toString()));
    }).next(() => cache.removeTargetData(txn, targetData));
  }
  onTransactionStarted() {
    this._orphanedDocuments = /* @__PURE__ */ new Set();
  }
  onTransactionCommitted(txn) {
    const cache = this.persistence.getRemoteDocumentCache();
    const changeBuffer = cache.newChangeBuffer();
    return PersistencePromise.forEach(this.orphanedDocuments, (path) => {
      const key = DocumentKey.fromPath(path);
      return this.isReferenced(txn, key).next((isReferenced) => {
        if (!isReferenced) {
          changeBuffer.removeEntry(key, SnapshotVersion.min());
        }
      });
    }).next(() => {
      this._orphanedDocuments = null;
      return changeBuffer.apply(txn);
    });
  }
  updateLimboDocument(txn, key) {
    return this.isReferenced(txn, key).next((isReferenced) => {
      if (isReferenced) {
        this.orphanedDocuments.delete(key.toString());
      } else {
        this.orphanedDocuments.add(key.toString());
      }
    });
  }
  documentSize(doc4) {
    return 0;
  }
  isReferenced(txn, key) {
    return PersistencePromise.or([() => PersistencePromise.resolve(this.localViewReferences.containsKey(key)), () => this.persistence.getTargetCache().containsKey(txn, key), () => this.persistence.mutationQueuesContainKey(txn, key)]);
  }
};
var MemoryLruDelegate = class _MemoryLruDelegate {
  constructor(persistence, lruParams) {
    this.persistence = persistence;
    this.orphanedSequenceNumbers = new ObjectMap((k) => encodeResourcePath(k.path), (l, r) => l.isEqual(r));
    this.garbageCollector = newLruGarbageCollector(this, lruParams);
  }
  static factory(persistence, lruParams) {
    return new _MemoryLruDelegate(persistence, lruParams);
  }
  // No-ops, present so memory persistence doesn't have to care which delegate
  // it has.
  onTransactionStarted() {
  }
  onTransactionCommitted(txn) {
    return PersistencePromise.resolve();
  }
  forEachTarget(txn, f) {
    return this.persistence.getTargetCache().forEachTarget(txn, f);
  }
  getSequenceNumberCount(txn) {
    const docCountPromise = this.orphanedDocumentCount(txn);
    const targetCountPromise = this.persistence.getTargetCache().getTargetCount(txn);
    return targetCountPromise.next((targetCount) => docCountPromise.next((docCount) => targetCount + docCount));
  }
  orphanedDocumentCount(txn) {
    let orphanedCount = 0;
    return this.forEachOrphanedDocumentSequenceNumber(txn, (_) => {
      orphanedCount++;
    }).next(() => orphanedCount);
  }
  forEachOrphanedDocumentSequenceNumber(txn, f) {
    return PersistencePromise.forEach(this.orphanedSequenceNumbers, (key, sequenceNumber) => {
      return this.isPinned(txn, key, sequenceNumber).next((isPinned) => {
        if (!isPinned) {
          return f(sequenceNumber);
        } else {
          return PersistencePromise.resolve();
        }
      });
    });
  }
  removeTargets(txn, upperBound, activeTargetIds) {
    return this.persistence.getTargetCache().removeTargets(txn, upperBound, activeTargetIds);
  }
  removeOrphanedDocuments(txn, upperBound) {
    let count3 = 0;
    const cache = this.persistence.getRemoteDocumentCache();
    const changeBuffer = cache.newChangeBuffer();
    const p = cache.forEachDocumentKey(txn, (key) => {
      return this.isPinned(txn, key, upperBound).next((isPinned) => {
        if (!isPinned) {
          count3++;
          changeBuffer.removeEntry(key, SnapshotVersion.min());
        }
      });
    });
    return p.next(() => changeBuffer.apply(txn)).next(() => count3);
  }
  markPotentiallyOrphaned(txn, key) {
    this.orphanedSequenceNumbers.set(key, txn.currentSequenceNumber);
    return PersistencePromise.resolve();
  }
  removeTarget(txn, targetData) {
    const updated = targetData.withSequenceNumber(txn.currentSequenceNumber);
    return this.persistence.getTargetCache().updateTargetData(txn, updated);
  }
  addReference(txn, targetId, key) {
    this.orphanedSequenceNumbers.set(key, txn.currentSequenceNumber);
    return PersistencePromise.resolve();
  }
  removeReference(txn, targetId, key) {
    this.orphanedSequenceNumbers.set(key, txn.currentSequenceNumber);
    return PersistencePromise.resolve();
  }
  updateLimboDocument(txn, key) {
    this.orphanedSequenceNumbers.set(key, txn.currentSequenceNumber);
    return PersistencePromise.resolve();
  }
  documentSize(document) {
    let documentSize = document.key.toString().length;
    if (document.isFoundDocument()) {
      documentSize += estimateByteSize(document.data.value);
    }
    return documentSize;
  }
  isPinned(txn, key, upperBound) {
    return PersistencePromise.or([() => this.persistence.mutationQueuesContainKey(txn, key), () => this.persistence.getTargetCache().containsKey(txn, key), () => {
      const orphanedAt = this.orphanedSequenceNumbers.get(key);
      return PersistencePromise.resolve(orphanedAt !== void 0 && orphanedAt > upperBound);
    }]);
  }
  getCacheSize(txn) {
    return this.persistence.getRemoteDocumentCache().getSize(txn);
  }
};
var SchemaConverter = class {
  constructor(serializer) {
    this.serializer = serializer;
  }
  /**
   * Performs database creation and schema upgrades.
   *
   * Note that in production, this method is only ever used to upgrade the schema
   * to SCHEMA_VERSION. Different values of toVersion are only used for testing
   * and local feature development.
   */
  createOrUpgrade(db, txn, fromVersion2, toVersion2) {
    const simpleDbTransaction = new SimpleDbTransaction("createOrUpgrade", txn);
    if (fromVersion2 < 1 && toVersion2 >= 1) {
      createPrimaryClientStore(db);
      createMutationQueue(db);
      createQueryCache(db);
      createLegacyRemoteDocumentCache(db);
    }
    let p = PersistencePromise.resolve();
    if (fromVersion2 < 3 && toVersion2 >= 3) {
      if (fromVersion2 !== 0) {
        dropQueryCache(db);
        createQueryCache(db);
      }
      p = p.next(() => writeEmptyTargetGlobalEntry(simpleDbTransaction));
    }
    if (fromVersion2 < 4 && toVersion2 >= 4) {
      if (fromVersion2 !== 0) {
        p = p.next(() => upgradeMutationBatchSchemaAndMigrateData(db, simpleDbTransaction));
      }
      p = p.next(() => {
        createClientMetadataStore(db);
      });
    }
    if (fromVersion2 < 5 && toVersion2 >= 5) {
      p = p.next(() => this.removeAcknowledgedMutations(simpleDbTransaction));
    }
    if (fromVersion2 < 6 && toVersion2 >= 6) {
      p = p.next(() => {
        createDocumentGlobalStore(db);
        return this.addDocumentGlobal(simpleDbTransaction);
      });
    }
    if (fromVersion2 < 7 && toVersion2 >= 7) {
      p = p.next(() => this.ensureSequenceNumbers(simpleDbTransaction));
    }
    if (fromVersion2 < 8 && toVersion2 >= 8) {
      p = p.next(() => this.createCollectionParentIndex(db, simpleDbTransaction));
    }
    if (fromVersion2 < 9 && toVersion2 >= 9) {
      p = p.next(() => {
        dropRemoteDocumentChangesStore(db);
      });
    }
    if (fromVersion2 < 10 && toVersion2 >= 10) {
      p = p.next(() => this.rewriteCanonicalIds(simpleDbTransaction));
    }
    if (fromVersion2 < 11 && toVersion2 >= 11) {
      p = p.next(() => {
        createBundlesStore(db);
        createNamedQueriesStore(db);
      });
    }
    if (fromVersion2 < 12 && toVersion2 >= 12) {
      p = p.next(() => {
        createDocumentOverlayStore(db);
      });
    }
    if (fromVersion2 < 13 && toVersion2 >= 13) {
      p = p.next(() => createRemoteDocumentCache(db)).next(() => this.rewriteRemoteDocumentCache(db, simpleDbTransaction)).next(() => db.deleteObjectStore(DbRemoteDocumentStore$1));
    }
    if (fromVersion2 < 14 && toVersion2 >= 14) {
      p = p.next(() => this.runOverlayMigration(db, simpleDbTransaction));
    }
    if (fromVersion2 < 15 && toVersion2 >= 15) {
      p = p.next(() => createFieldIndex(db));
    }
    if (fromVersion2 < 16 && toVersion2 >= 16) {
      p = p.next(() => {
        const indexStateStore2 = txn.objectStore(DbIndexStateStore);
        indexStateStore2.clear();
      }).next(() => {
        const indexEntryStore = txn.objectStore(DbIndexEntryStore);
        indexEntryStore.clear();
      });
    }
    if (fromVersion2 < 17 && toVersion2 >= 17) {
      p = p.next(() => {
        createGlobalsStore(db);
      });
    }
    return p;
  }
  addDocumentGlobal(txn) {
    let byteSize = 0;
    return txn.store(DbRemoteDocumentStore$1).iterate((_, doc4) => {
      byteSize += dbDocumentSize(doc4);
    }).next(() => {
      const metadata = {
        byteSize
      };
      return txn.store(DbRemoteDocumentGlobalStore).put(DbRemoteDocumentGlobalKey, metadata);
    });
  }
  removeAcknowledgedMutations(txn) {
    const queuesStore = txn.store(DbMutationQueueStore);
    const mutationsStore2 = txn.store(DbMutationBatchStore);
    return queuesStore.loadAll().next((queues) => {
      return PersistencePromise.forEach(queues, (queue) => {
        const range = IDBKeyRange.bound([queue.userId, BATCHID_UNKNOWN], [queue.userId, queue.lastAcknowledgedBatchId]);
        return mutationsStore2.loadAll(DbMutationBatchUserMutationsIndex, range).next((dbBatches) => {
          return PersistencePromise.forEach(dbBatches, (dbBatch) => {
            hardAssert(dbBatch.userId === queue.userId);
            const batch = fromDbMutationBatch(this.serializer, dbBatch);
            return removeMutationBatch(txn, queue.userId, batch).next(() => {
            });
          });
        });
      });
    });
  }
  /**
   * Ensures that every document in the remote document cache has a corresponding sentinel row
   * with a sequence number. Missing rows are given the most recently used sequence number.
   */
  ensureSequenceNumbers(txn) {
    const documentTargetStore2 = txn.store(DbTargetDocumentStore);
    const documentsStore = txn.store(DbRemoteDocumentStore$1);
    const globalTargetStore2 = txn.store(DbTargetGlobalStore);
    return globalTargetStore2.get(DbTargetGlobalKey).next((metadata) => {
      const writeSentinelKey2 = (path) => {
        return documentTargetStore2.put({
          targetId: 0,
          path: encodeResourcePath(path),
          sequenceNumber: metadata.highestListenSequenceNumber
        });
      };
      const promises = [];
      return documentsStore.iterate((key, doc4) => {
        const path = new ResourcePath(key);
        const docSentinelKey = sentinelKey(path);
        promises.push(documentTargetStore2.get(docSentinelKey).next((maybeSentinel) => {
          if (!maybeSentinel) {
            return writeSentinelKey2(path);
          } else {
            return PersistencePromise.resolve();
          }
        }));
      }).next(() => PersistencePromise.waitFor(promises));
    });
  }
  createCollectionParentIndex(db, txn) {
    db.createObjectStore(DbCollectionParentStore, {
      keyPath: DbCollectionParentKeyPath
    });
    const collectionParentsStore2 = txn.store(DbCollectionParentStore);
    const cache = new MemoryCollectionParentIndex();
    const addEntry = (collectionPath) => {
      if (cache.add(collectionPath)) {
        const collectionId = collectionPath.lastSegment();
        const parentPath = collectionPath.popLast();
        return collectionParentsStore2.put({
          collectionId,
          parent: encodeResourcePath(parentPath)
        });
      }
    };
    return txn.store(DbRemoteDocumentStore$1).iterate({
      keysOnly: true
    }, (pathSegments, _) => {
      const path = new ResourcePath(pathSegments);
      return addEntry(path.popLast());
    }).next(() => {
      return txn.store(DbDocumentMutationStore).iterate({
        keysOnly: true
      }, ([userID, encodedPath, batchId], _) => {
        const path = decodeResourcePath(encodedPath);
        return addEntry(path.popLast());
      });
    });
  }
  rewriteCanonicalIds(txn) {
    const targetStore = txn.store(DbTargetStore);
    return targetStore.iterate((key, originalDbTarget) => {
      const originalTargetData = fromDbTarget(originalDbTarget);
      const updatedDbTarget = toDbTarget(this.serializer, originalTargetData);
      return targetStore.put(updatedDbTarget);
    });
  }
  rewriteRemoteDocumentCache(db, transaction) {
    const legacyRemoteDocumentStore = transaction.store(DbRemoteDocumentStore$1);
    const writes = [];
    return legacyRemoteDocumentStore.iterate((_, legacyDocument) => {
      const remoteDocumentStore = transaction.store(DbRemoteDocumentStore);
      const path = extractKey(legacyDocument).path.toArray();
      const dbRemoteDocument = {
        prefixPath: path.slice(0, path.length - 2),
        collectionGroup: path[path.length - 2],
        documentId: path[path.length - 1],
        readTime: legacyDocument.readTime || [0, 0],
        unknownDocument: legacyDocument.unknownDocument,
        noDocument: legacyDocument.noDocument,
        document: legacyDocument.document,
        hasCommittedMutations: !!legacyDocument.hasCommittedMutations
      };
      writes.push(remoteDocumentStore.put(dbRemoteDocument));
    }).next(() => PersistencePromise.waitFor(writes));
  }
  runOverlayMigration(db, transaction) {
    const mutationsStore2 = transaction.store(DbMutationBatchStore);
    const remoteDocumentCache = newIndexedDbRemoteDocumentCache(this.serializer);
    const memoryPersistence = new MemoryPersistence(MemoryEagerDelegate.factory, this.serializer.remoteSerializer);
    return mutationsStore2.loadAll().next((dbBatches) => {
      const userToDocumentSet = /* @__PURE__ */ new Map();
      dbBatches.forEach((dbBatch) => {
        var _a;
        let documentSet = (_a = userToDocumentSet.get(dbBatch.userId)) !== null && _a !== void 0 ? _a : documentKeySet();
        const batch = fromDbMutationBatch(this.serializer, dbBatch);
        batch.keys().forEach((key) => documentSet = documentSet.add(key));
        userToDocumentSet.set(dbBatch.userId, documentSet);
      });
      return PersistencePromise.forEach(userToDocumentSet, (allDocumentKeysForUser, userId) => {
        const user = new User(userId);
        const documentOverlayCache = IndexedDbDocumentOverlayCache.forUser(this.serializer, user);
        const indexManager = memoryPersistence.getIndexManager(user);
        const mutationQueue = IndexedDbMutationQueue.forUser(user, this.serializer, indexManager, memoryPersistence.referenceDelegate);
        const localDocumentsView = new LocalDocumentsView(remoteDocumentCache, mutationQueue, documentOverlayCache, indexManager);
        return localDocumentsView.recalculateAndSaveOverlaysForDocumentKeys(new IndexedDbTransaction(transaction, ListenSequence.INVALID), allDocumentKeysForUser).next();
      });
    });
  }
};
function sentinelKey(path) {
  return [0, encodeResourcePath(path)];
}
function createPrimaryClientStore(db) {
  db.createObjectStore(DbPrimaryClientStore);
}
function createMutationQueue(db) {
  db.createObjectStore(DbMutationQueueStore, {
    keyPath: DbMutationQueueKeyPath
  });
  const mutationBatchesStore = db.createObjectStore(DbMutationBatchStore, {
    keyPath: DbMutationBatchKeyPath,
    autoIncrement: true
  });
  mutationBatchesStore.createIndex(DbMutationBatchUserMutationsIndex, DbMutationBatchUserMutationsKeyPath, {
    unique: true
  });
  db.createObjectStore(DbDocumentMutationStore);
}
function upgradeMutationBatchSchemaAndMigrateData(db, txn) {
  const v1MutationsStore = txn.store(DbMutationBatchStore);
  return v1MutationsStore.loadAll().next((existingMutations) => {
    db.deleteObjectStore(DbMutationBatchStore);
    const mutationsStore2 = db.createObjectStore(DbMutationBatchStore, {
      keyPath: DbMutationBatchKeyPath,
      autoIncrement: true
    });
    mutationsStore2.createIndex(DbMutationBatchUserMutationsIndex, DbMutationBatchUserMutationsKeyPath, {
      unique: true
    });
    const v3MutationsStore = txn.store(DbMutationBatchStore);
    const writeAll = existingMutations.map((mutation) => v3MutationsStore.put(mutation));
    return PersistencePromise.waitFor(writeAll);
  });
}
function createLegacyRemoteDocumentCache(db) {
  db.createObjectStore(DbRemoteDocumentStore$1);
}
function createRemoteDocumentCache(db) {
  const remoteDocumentStore = db.createObjectStore(DbRemoteDocumentStore, {
    keyPath: DbRemoteDocumentKeyPath
  });
  remoteDocumentStore.createIndex(DbRemoteDocumentDocumentKeyIndex, DbRemoteDocumentDocumentKeyIndexPath);
  remoteDocumentStore.createIndex(DbRemoteDocumentCollectionGroupIndex, DbRemoteDocumentCollectionGroupIndexPath);
}
function createDocumentGlobalStore(db) {
  db.createObjectStore(DbRemoteDocumentGlobalStore);
}
function createQueryCache(db) {
  const targetDocumentsStore = db.createObjectStore(DbTargetDocumentStore, {
    keyPath: DbTargetDocumentKeyPath
  });
  targetDocumentsStore.createIndex(DbTargetDocumentDocumentTargetsIndex, DbTargetDocumentDocumentTargetsKeyPath, {
    unique: true
  });
  const targetStore = db.createObjectStore(DbTargetStore, {
    keyPath: DbTargetKeyPath
  });
  targetStore.createIndex(DbTargetQueryTargetsIndexName, DbTargetQueryTargetsKeyPath, {
    unique: true
  });
  db.createObjectStore(DbTargetGlobalStore);
}
function dropQueryCache(db) {
  db.deleteObjectStore(DbTargetDocumentStore);
  db.deleteObjectStore(DbTargetStore);
  db.deleteObjectStore(DbTargetGlobalStore);
}
function dropRemoteDocumentChangesStore(db) {
  if (db.objectStoreNames.contains("remoteDocumentChanges")) {
    db.deleteObjectStore("remoteDocumentChanges");
  }
}
function writeEmptyTargetGlobalEntry(txn) {
  const globalStore = txn.store(DbTargetGlobalStore);
  const metadata = {
    highestTargetId: 0,
    highestListenSequenceNumber: 0,
    lastRemoteSnapshotVersion: SnapshotVersion.min().toTimestamp(),
    targetCount: 0
  };
  return globalStore.put(DbTargetGlobalKey, metadata);
}
function createClientMetadataStore(db) {
  db.createObjectStore(DbClientMetadataStore, {
    keyPath: DbClientMetadataKeyPath
  });
}
function createBundlesStore(db) {
  db.createObjectStore(DbBundleStore, {
    keyPath: DbBundleKeyPath
  });
}
function createNamedQueriesStore(db) {
  db.createObjectStore(DbNamedQueryStore, {
    keyPath: DbNamedQueryKeyPath
  });
}
function createFieldIndex(db) {
  const indexConfigurationStore2 = db.createObjectStore(DbIndexConfigurationStore, {
    keyPath: DbIndexConfigurationKeyPath,
    autoIncrement: true
  });
  indexConfigurationStore2.createIndex(DbIndexConfigurationCollectionGroupIndex, DbIndexConfigurationCollectionGroupIndexPath, {
    unique: false
  });
  const indexStateStore2 = db.createObjectStore(DbIndexStateStore, {
    keyPath: DbIndexStateKeyPath
  });
  indexStateStore2.createIndex(DbIndexStateSequenceNumberIndex, DbIndexStateSequenceNumberIndexPath, {
    unique: false
  });
  const indexEntryStore = db.createObjectStore(DbIndexEntryStore, {
    keyPath: DbIndexEntryKeyPath
  });
  indexEntryStore.createIndex(DbIndexEntryDocumentKeyIndex, DbIndexEntryDocumentKeyIndexPath, {
    unique: false
  });
}
function createDocumentOverlayStore(db) {
  const documentOverlayStore2 = db.createObjectStore(DbDocumentOverlayStore, {
    keyPath: DbDocumentOverlayKeyPath
  });
  documentOverlayStore2.createIndex(DbDocumentOverlayCollectionPathOverlayIndex, DbDocumentOverlayCollectionPathOverlayIndexPath, {
    unique: false
  });
  documentOverlayStore2.createIndex(DbDocumentOverlayCollectionGroupOverlayIndex, DbDocumentOverlayCollectionGroupOverlayIndexPath, {
    unique: false
  });
}
function createGlobalsStore(db) {
  db.createObjectStore(DbGlobalsStore, {
    keyPath: DbGlobalsKeyPath
  });
}
function extractKey(remoteDoc) {
  if (remoteDoc.document) {
    return new DocumentKey(ResourcePath.fromString(remoteDoc.document.name).popFirst(5));
  } else if (remoteDoc.noDocument) {
    return DocumentKey.fromSegments(remoteDoc.noDocument.path);
  } else if (remoteDoc.unknownDocument) {
    return DocumentKey.fromSegments(remoteDoc.unknownDocument.path);
  } else {
    return fail();
  }
}
var LOG_TAG$c = "IndexedDbPersistence";
var MAX_CLIENT_AGE_MS = 30 * 60 * 1e3;
var MAX_PRIMARY_ELIGIBLE_AGE_MS = 5e3;
var CLIENT_METADATA_REFRESH_INTERVAL_MS = 4e3;
var PRIMARY_LEASE_EXCLUSIVE_ERROR_MSG = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
var UNSUPPORTED_PLATFORM_ERROR_MSG = "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.";
var ZOMBIED_CLIENTS_KEY_PREFIX = "firestore_zombie";
var MAIN_DATABASE = "main";
var IndexedDbPersistence = class _IndexedDbPersistence {
  constructor(allowTabSynchronization, persistenceKey, clientId, lruParams, queue, window2, document, serializer, sequenceNumberSyncer, forceOwningTab, schemaVersion = SCHEMA_VERSION) {
    this.allowTabSynchronization = allowTabSynchronization;
    this.persistenceKey = persistenceKey;
    this.clientId = clientId;
    this.queue = queue;
    this.window = window2;
    this.document = document;
    this.sequenceNumberSyncer = sequenceNumberSyncer;
    this.forceOwningTab = forceOwningTab;
    this.schemaVersion = schemaVersion;
    this.listenSequence = null;
    this._started = false;
    this.isPrimary = false;
    this.networkEnabled = true;
    this.windowUnloadHandler = null;
    this.inForeground = false;
    this.documentVisibilityHandler = null;
    this.clientMetadataRefresher = null;
    this.lastGarbageCollectionTime = Number.NEGATIVE_INFINITY;
    this.primaryStateListener = (_) => Promise.resolve();
    if (!_IndexedDbPersistence.isAvailable()) {
      throw new FirestoreError(Code.UNIMPLEMENTED, UNSUPPORTED_PLATFORM_ERROR_MSG);
    }
    this.referenceDelegate = new IndexedDbLruDelegateImpl(this, lruParams);
    this.dbName = persistenceKey + MAIN_DATABASE;
    this.serializer = new LocalSerializer(serializer);
    this.simpleDb = new SimpleDb(this.dbName, this.schemaVersion, new SchemaConverter(this.serializer));
    this.globalsCache = new IndexedDbGlobalsCache();
    this.targetCache = new IndexedDbTargetCache(this.referenceDelegate, this.serializer);
    this.remoteDocumentCache = newIndexedDbRemoteDocumentCache(this.serializer);
    this.bundleCache = new IndexedDbBundleCache();
    if (this.window && this.window.localStorage) {
      this.webStorage = this.window.localStorage;
    } else {
      this.webStorage = null;
      if (forceOwningTab === false) {
        logError(LOG_TAG$c, "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page.");
      }
    }
  }
  /**
   * Attempt to start IndexedDb persistence.
   *
   * @returns Whether persistence was enabled.
   */
  start() {
    return this.updateClientMetadataAndTryBecomePrimary().then(() => {
      if (!this.isPrimary && !this.allowTabSynchronization) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, PRIMARY_LEASE_EXCLUSIVE_ERROR_MSG);
      }
      this.attachVisibilityHandler();
      this.attachWindowUnloadHook();
      this.scheduleClientMetadataAndPrimaryLeaseRefreshes();
      return this.runTransaction("getHighestListenSequenceNumber", "readonly", (txn) => this.targetCache.getHighestSequenceNumber(txn));
    }).then((highestListenSequenceNumber) => {
      this.listenSequence = new ListenSequence(highestListenSequenceNumber, this.sequenceNumberSyncer);
    }).then(() => {
      this._started = true;
    }).catch((reason) => {
      this.simpleDb && this.simpleDb.close();
      return Promise.reject(reason);
    });
  }
  /**
   * Registers a listener that gets called when the primary state of the
   * instance changes. Upon registering, this listener is invoked immediately
   * with the current primary state.
   *
   * PORTING NOTE: This is only used for Web multi-tab.
   */
  setPrimaryStateListener(primaryStateListener) {
    this.primaryStateListener = (primaryState) => __async(this, null, function* () {
      if (this.started) {
        return primaryStateListener(primaryState);
      }
    });
    return primaryStateListener(this.isPrimary);
  }
  /**
   * Registers a listener that gets called when the database receives a
   * version change event indicating that it has deleted.
   *
   * PORTING NOTE: This is only used for Web multi-tab.
   */
  setDatabaseDeletedListener(databaseDeletedListener) {
    this.simpleDb.setVersionChangeListener((event) => __async(this, null, function* () {
      if (event.newVersion === null) {
        yield databaseDeletedListener();
      }
    }));
  }
  /**
   * Adjusts the current network state in the client's metadata, potentially
   * affecting the primary lease.
   *
   * PORTING NOTE: This is only used for Web multi-tab.
   */
  setNetworkEnabled(networkEnabled) {
    if (this.networkEnabled !== networkEnabled) {
      this.networkEnabled = networkEnabled;
      this.queue.enqueueAndForget(() => __async(this, null, function* () {
        if (this.started) {
          yield this.updateClientMetadataAndTryBecomePrimary();
        }
      }));
    }
  }
  /**
   * Updates the client metadata in IndexedDb and attempts to either obtain or
   * extend the primary lease for the local client. Asynchronously notifies the
   * primary state listener if the client either newly obtained or released its
   * primary lease.
   */
  updateClientMetadataAndTryBecomePrimary() {
    return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (txn) => {
      const metadataStore = clientMetadataStore(txn);
      return metadataStore.put({
        clientId: this.clientId,
        updateTimeMs: Date.now(),
        networkEnabled: this.networkEnabled,
        inForeground: this.inForeground
      }).next(() => {
        if (this.isPrimary) {
          return this.verifyPrimaryLease(txn).next((success) => {
            if (!success) {
              this.isPrimary = false;
              this.queue.enqueueRetryable(() => this.primaryStateListener(false));
            }
          });
        }
      }).next(() => this.canActAsPrimary(txn)).next((canActAsPrimary) => {
        if (this.isPrimary && !canActAsPrimary) {
          return this.releasePrimaryLeaseIfHeld(txn).next(() => false);
        } else if (canActAsPrimary) {
          return this.acquireOrExtendPrimaryLease(txn).next(() => true);
        } else {
          return (
            /* canActAsPrimary= */
            false
          );
        }
      });
    }).catch((e) => {
      if (isIndexedDbTransactionError(e)) {
        logDebug(LOG_TAG$c, "Failed to extend owner lease: ", e);
        return this.isPrimary;
      }
      if (!this.allowTabSynchronization) {
        throw e;
      }
      logDebug(LOG_TAG$c, "Releasing owner lease after error during lease refresh", e);
      return (
        /* isPrimary= */
        false
      );
    }).then((isPrimary) => {
      if (this.isPrimary !== isPrimary) {
        this.queue.enqueueRetryable(() => this.primaryStateListener(isPrimary));
      }
      this.isPrimary = isPrimary;
    });
  }
  verifyPrimaryLease(txn) {
    const store = primaryClientStore(txn);
    return store.get(DbPrimaryClientKey).next((primaryClient) => {
      return PersistencePromise.resolve(this.isLocalClient(primaryClient));
    });
  }
  removeClientMetadata(txn) {
    const metadataStore = clientMetadataStore(txn);
    return metadataStore.delete(this.clientId);
  }
  /**
   * If the garbage collection threshold has passed, prunes the
   * RemoteDocumentChanges and the ClientMetadata store based on the last update
   * time of all clients.
   */
  maybeGarbageCollectMultiClientState() {
    return __async(this, null, function* () {
      if (this.isPrimary && !this.isWithinAge(this.lastGarbageCollectionTime, MAX_CLIENT_AGE_MS)) {
        this.lastGarbageCollectionTime = Date.now();
        const inactiveClients = yield this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (txn) => {
          const metadataStore = getStore(txn, DbClientMetadataStore);
          return metadataStore.loadAll().next((existingClients) => {
            const active = this.filterActiveClients(existingClients, MAX_CLIENT_AGE_MS);
            const inactive = existingClients.filter((client) => active.indexOf(client) === -1);
            return PersistencePromise.forEach(inactive, (inactiveClient) => metadataStore.delete(inactiveClient.clientId)).next(() => inactive);
          });
        }).catch(() => {
          return [];
        });
        if (this.webStorage) {
          for (const inactiveClient of inactiveClients) {
            this.webStorage.removeItem(this.zombiedClientLocalStorageKey(inactiveClient.clientId));
          }
        }
      }
    });
  }
  /**
   * Schedules a recurring timer to update the client metadata and to either
   * extend or acquire the primary lease if the client is eligible.
   */
  scheduleClientMetadataAndPrimaryLeaseRefreshes() {
    this.clientMetadataRefresher = this.queue.enqueueAfterDelay("client_metadata_refresh", CLIENT_METADATA_REFRESH_INTERVAL_MS, () => {
      return this.updateClientMetadataAndTryBecomePrimary().then(() => this.maybeGarbageCollectMultiClientState()).then(() => this.scheduleClientMetadataAndPrimaryLeaseRefreshes());
    });
  }
  /** Checks whether `client` is the local client. */
  isLocalClient(client) {
    return client ? client.ownerId === this.clientId : false;
  }
  /**
   * Evaluate the state of all active clients and determine whether the local
   * client is or can act as the holder of the primary lease. Returns whether
   * the client is eligible for the lease, but does not actually acquire it.
   * May return 'false' even if there is no active leaseholder and another
   * (foreground) client should become leaseholder instead.
   */
  canActAsPrimary(txn) {
    if (this.forceOwningTab) {
      return PersistencePromise.resolve(true);
    }
    const store = primaryClientStore(txn);
    return store.get(DbPrimaryClientKey).next((currentPrimary) => {
      const currentLeaseIsValid = currentPrimary !== null && this.isWithinAge(currentPrimary.leaseTimestampMs, MAX_PRIMARY_ELIGIBLE_AGE_MS) && !this.isClientZombied(currentPrimary.ownerId);
      if (currentLeaseIsValid) {
        if (this.isLocalClient(currentPrimary) && this.networkEnabled) {
          return true;
        }
        if (!this.isLocalClient(currentPrimary)) {
          if (!currentPrimary.allowTabSynchronization) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, PRIMARY_LEASE_EXCLUSIVE_ERROR_MSG);
          }
          return false;
        }
      }
      if (this.networkEnabled && this.inForeground) {
        return true;
      }
      return clientMetadataStore(txn).loadAll().next((existingClients) => {
        const preferredCandidate = this.filterActiveClients(existingClients, MAX_PRIMARY_ELIGIBLE_AGE_MS).find((otherClient) => {
          if (this.clientId !== otherClient.clientId) {
            const otherClientHasBetterNetworkState = !this.networkEnabled && otherClient.networkEnabled;
            const otherClientHasBetterVisibility = !this.inForeground && otherClient.inForeground;
            const otherClientHasSameNetworkState = this.networkEnabled === otherClient.networkEnabled;
            if (otherClientHasBetterNetworkState || otherClientHasBetterVisibility && otherClientHasSameNetworkState) {
              return true;
            }
          }
          return false;
        });
        return preferredCandidate === void 0;
      });
    }).next((canActAsPrimary) => {
      if (this.isPrimary !== canActAsPrimary) {
        logDebug(LOG_TAG$c, `Client ${canActAsPrimary ? "is" : "is not"} eligible for a primary lease.`);
      }
      return canActAsPrimary;
    });
  }
  shutdown() {
    return __async(this, null, function* () {
      this._started = false;
      this.markClientZombied();
      if (this.clientMetadataRefresher) {
        this.clientMetadataRefresher.cancel();
        this.clientMetadataRefresher = null;
      }
      this.detachVisibilityHandler();
      this.detachWindowUnloadHook();
      yield this.simpleDb.runTransaction("shutdown", "readwrite", [DbPrimaryClientStore, DbClientMetadataStore], (simpleDbTxn) => {
        const persistenceTransaction = new IndexedDbTransaction(simpleDbTxn, ListenSequence.INVALID);
        return this.releasePrimaryLeaseIfHeld(persistenceTransaction).next(() => this.removeClientMetadata(persistenceTransaction));
      });
      this.simpleDb.close();
      this.removeClientZombiedEntry();
    });
  }
  /**
   * Returns clients that are not zombied and have an updateTime within the
   * provided threshold.
   */
  filterActiveClients(clients, activityThresholdMs) {
    return clients.filter((client) => this.isWithinAge(client.updateTimeMs, activityThresholdMs) && !this.isClientZombied(client.clientId));
  }
  /**
   * Returns the IDs of the clients that are currently active. If multi-tab
   * is not supported, returns an array that only contains the local client's
   * ID.
   *
   * PORTING NOTE: This is only used for Web multi-tab.
   */
  getActiveClients() {
    return this.runTransaction("getActiveClients", "readonly", (txn) => {
      return clientMetadataStore(txn).loadAll().next((clients) => this.filterActiveClients(clients, MAX_CLIENT_AGE_MS).map((clientMetadata) => clientMetadata.clientId));
    });
  }
  get started() {
    return this._started;
  }
  getGlobalsCache() {
    return this.globalsCache;
  }
  getMutationQueue(user, indexManager) {
    return IndexedDbMutationQueue.forUser(user, this.serializer, indexManager, this.referenceDelegate);
  }
  getTargetCache() {
    return this.targetCache;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getIndexManager(user) {
    return new IndexedDbIndexManager(user, this.serializer.remoteSerializer.databaseId);
  }
  getDocumentOverlayCache(user) {
    return IndexedDbDocumentOverlayCache.forUser(this.serializer, user);
  }
  getBundleCache() {
    return this.bundleCache;
  }
  runTransaction(action, mode, transactionOperation) {
    logDebug(LOG_TAG$c, "Starting transaction:", action);
    const simpleDbMode = mode === "readonly" ? "readonly" : "readwrite";
    const objectStores = getObjectStores(this.schemaVersion);
    let persistenceTransaction;
    return this.simpleDb.runTransaction(action, simpleDbMode, objectStores, (simpleDbTxn) => {
      persistenceTransaction = new IndexedDbTransaction(simpleDbTxn, this.listenSequence ? this.listenSequence.next() : ListenSequence.INVALID);
      if (mode === "readwrite-primary") {
        return this.verifyPrimaryLease(persistenceTransaction).next((holdsPrimaryLease) => {
          if (holdsPrimaryLease) {
            return (
              /* holdsPrimaryLease= */
              true
            );
          }
          return this.canActAsPrimary(persistenceTransaction);
        }).next((holdsPrimaryLease) => {
          if (!holdsPrimaryLease) {
            logError(`Failed to obtain primary lease for action '${action}'.`);
            this.isPrimary = false;
            this.queue.enqueueRetryable(() => this.primaryStateListener(false));
            throw new FirestoreError(Code.FAILED_PRECONDITION, PRIMARY_LEASE_LOST_ERROR_MSG);
          }
          return transactionOperation(persistenceTransaction);
        }).next((result) => {
          return this.acquireOrExtendPrimaryLease(persistenceTransaction).next(() => result);
        });
      } else {
        return this.verifyAllowTabSynchronization(persistenceTransaction).next(() => transactionOperation(persistenceTransaction));
      }
    }).then((result) => {
      persistenceTransaction.raiseOnCommittedEvent();
      return result;
    });
  }
  /**
   * Verifies that the current tab is the primary leaseholder or alternatively
   * that the leaseholder has opted into multi-tab synchronization.
   */
  // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
  // be turned off.
  verifyAllowTabSynchronization(txn) {
    const store = primaryClientStore(txn);
    return store.get(DbPrimaryClientKey).next((currentPrimary) => {
      const currentLeaseIsValid = currentPrimary !== null && this.isWithinAge(currentPrimary.leaseTimestampMs, MAX_PRIMARY_ELIGIBLE_AGE_MS) && !this.isClientZombied(currentPrimary.ownerId);
      if (currentLeaseIsValid && !this.isLocalClient(currentPrimary)) {
        if (!this.forceOwningTab && (!this.allowTabSynchronization || !currentPrimary.allowTabSynchronization)) {
          throw new FirestoreError(Code.FAILED_PRECONDITION, PRIMARY_LEASE_EXCLUSIVE_ERROR_MSG);
        }
      }
    });
  }
  /**
   * Obtains or extends the new primary lease for the local client. This
   * method does not verify that the client is eligible for this lease.
   */
  acquireOrExtendPrimaryLease(txn) {
    const newPrimary = {
      ownerId: this.clientId,
      allowTabSynchronization: this.allowTabSynchronization,
      leaseTimestampMs: Date.now()
    };
    return primaryClientStore(txn).put(DbPrimaryClientKey, newPrimary);
  }
  static isAvailable() {
    return SimpleDb.isAvailable();
  }
  /** Checks the primary lease and removes it if we are the current primary. */
  releasePrimaryLeaseIfHeld(txn) {
    const store = primaryClientStore(txn);
    return store.get(DbPrimaryClientKey).next((primaryClient) => {
      if (this.isLocalClient(primaryClient)) {
        logDebug(LOG_TAG$c, "Releasing primary lease.");
        return store.delete(DbPrimaryClientKey);
      } else {
        return PersistencePromise.resolve();
      }
    });
  }
  /** Verifies that `updateTimeMs` is within `maxAgeMs`. */
  isWithinAge(updateTimeMs, maxAgeMs) {
    const now = Date.now();
    const minAcceptable = now - maxAgeMs;
    const maxAcceptable = now;
    if (updateTimeMs < minAcceptable) {
      return false;
    } else if (updateTimeMs > maxAcceptable) {
      logError(`Detected an update time that is in the future: ${updateTimeMs} > ${maxAcceptable}`);
      return false;
    }
    return true;
  }
  attachVisibilityHandler() {
    if (this.document !== null && typeof this.document.addEventListener === "function") {
      this.documentVisibilityHandler = () => {
        this.queue.enqueueAndForget(() => {
          this.inForeground = this.document.visibilityState === "visible";
          return this.updateClientMetadataAndTryBecomePrimary();
        });
      };
      this.document.addEventListener("visibilitychange", this.documentVisibilityHandler);
      this.inForeground = this.document.visibilityState === "visible";
    }
  }
  detachVisibilityHandler() {
    if (this.documentVisibilityHandler) {
      this.document.removeEventListener("visibilitychange", this.documentVisibilityHandler);
      this.documentVisibilityHandler = null;
    }
  }
  /**
   * Attaches a window.unload handler that will synchronously write our
   * clientId to a "zombie client id" location in LocalStorage. This can be used
   * by tabs trying to acquire the primary lease to determine that the lease
   * is no longer valid even if the timestamp is recent. This is particularly
   * important for the refresh case (so the tab correctly re-acquires the
   * primary lease). LocalStorage is used for this rather than IndexedDb because
   * it is a synchronous API and so can be used reliably from  an unload
   * handler.
   */
  attachWindowUnloadHook() {
    var _a;
    if (typeof ((_a = this.window) === null || _a === void 0 ? void 0 : _a.addEventListener) === "function") {
      this.windowUnloadHandler = () => {
        this.markClientZombied();
        const safariIndexdbBugVersionRegex = /(?:Version|Mobile)\/1[456]/;
        if (isSafari() && (navigator.appVersion.match(safariIndexdbBugVersionRegex) || navigator.userAgent.match(safariIndexdbBugVersionRegex))) {
          this.queue.enterRestrictedMode(
            /* purgeExistingTasks= */
            true
          );
        }
        this.queue.enqueueAndForget(() => {
          return this.shutdown();
        });
      };
      this.window.addEventListener("pagehide", this.windowUnloadHandler);
    }
  }
  detachWindowUnloadHook() {
    if (this.windowUnloadHandler) {
      this.window.removeEventListener("pagehide", this.windowUnloadHandler);
      this.windowUnloadHandler = null;
    }
  }
  /**
   * Returns whether a client is "zombied" based on its LocalStorage entry.
   * Clients become zombied when their tab closes without running all of the
   * cleanup logic in `shutdown()`.
   */
  isClientZombied(clientId) {
    var _a;
    try {
      const isZombied = ((_a = this.webStorage) === null || _a === void 0 ? void 0 : _a.getItem(this.zombiedClientLocalStorageKey(clientId))) !== null;
      logDebug(LOG_TAG$c, `Client '${clientId}' ${isZombied ? "is" : "is not"} zombied in LocalStorage`);
      return isZombied;
    } catch (e) {
      logError(LOG_TAG$c, "Failed to get zombied client id.", e);
      return false;
    }
  }
  /**
   * Record client as zombied (a client that had its tab closed). Zombied
   * clients are ignored during primary tab selection.
   */
  markClientZombied() {
    if (!this.webStorage) {
      return;
    }
    try {
      this.webStorage.setItem(this.zombiedClientLocalStorageKey(this.clientId), String(Date.now()));
    } catch (e) {
      logError("Failed to set zombie client id.", e);
    }
  }
  /** Removes the zombied client entry if it exists. */
  removeClientZombiedEntry() {
    if (!this.webStorage) {
      return;
    }
    try {
      this.webStorage.removeItem(this.zombiedClientLocalStorageKey(this.clientId));
    } catch (e) {
    }
  }
  zombiedClientLocalStorageKey(clientId) {
    return `${ZOMBIED_CLIENTS_KEY_PREFIX}_${this.persistenceKey}_${clientId}`;
  }
};
function primaryClientStore(txn) {
  return getStore(txn, DbPrimaryClientStore);
}
function clientMetadataStore(txn) {
  return getStore(txn, DbClientMetadataStore);
}
function indexedDbStoragePrefix(databaseId, persistenceKey) {
  let database = databaseId.projectId;
  if (!databaseId.isDefaultDatabase) {
    database += "." + databaseId.database;
  }
  return "firestore/" + persistenceKey + "/" + database + "/";
}
function indexedDbClearPersistence(persistenceKey) {
  return __async(this, null, function* () {
    if (!SimpleDb.isAvailable()) {
      return Promise.resolve();
    }
    const dbName = persistenceKey + MAIN_DATABASE;
    yield SimpleDb.delete(dbName);
  });
}
function diffArrays(before, after, comparator, onAdd, onRemove) {
  before = [...before];
  after = [...after];
  before.sort(comparator);
  after.sort(comparator);
  const bLen = before.length;
  const aLen = after.length;
  let a = 0;
  let b = 0;
  while (a < aLen && b < bLen) {
    const cmp = comparator(before[b], after[a]);
    if (cmp < 0) {
      onRemove(before[b++]);
    } else if (cmp > 0) {
      onAdd(after[a++]);
    } else {
      a++;
      b++;
    }
  }
  while (a < aLen) {
    onAdd(after[a++]);
  }
  while (b < bLen) {
    onRemove(before[b++]);
  }
}
function isPrimitiveArrayEqual(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (let i = 0; i < left.length; ++i) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}
var LOG_TAG$b = "LocalStore";
var RESUME_TOKEN_MAX_AGE_MICROS = 5 * 60 * 1e6;
var LocalStoreImpl = class {
  constructor(persistence, queryEngine, initialUser, serializer) {
    this.persistence = persistence;
    this.queryEngine = queryEngine;
    this.serializer = serializer;
    this.targetDataByTarget = new SortedMap(primitiveComparator);
    this.targetIdByTarget = new ObjectMap((t) => canonifyTarget(t), targetEquals);
    this.collectionGroupReadTime = /* @__PURE__ */ new Map();
    this.remoteDocuments = persistence.getRemoteDocumentCache();
    this.targetCache = persistence.getTargetCache();
    this.bundleCache = persistence.getBundleCache();
    this.initializeUserComponents(initialUser);
  }
  initializeUserComponents(user) {
    this.documentOverlayCache = this.persistence.getDocumentOverlayCache(user);
    this.indexManager = this.persistence.getIndexManager(user);
    this.mutationQueue = this.persistence.getMutationQueue(user, this.indexManager);
    this.localDocuments = new LocalDocumentsView(this.remoteDocuments, this.mutationQueue, this.documentOverlayCache, this.indexManager);
    this.remoteDocuments.setIndexManager(this.indexManager);
    this.queryEngine.initialize(this.localDocuments, this.indexManager);
  }
  collectGarbage(garbageCollector) {
    return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (txn) => garbageCollector.collect(txn, this.targetDataByTarget));
  }
};
function newLocalStore(persistence, queryEngine, initialUser, serializer) {
  return new LocalStoreImpl(persistence, queryEngine, initialUser, serializer);
}
function localStoreHandleUserChange(localStore, user) {
  return __async(this, null, function* () {
    const localStoreImpl = debugCast(localStore);
    const result = yield localStoreImpl.persistence.runTransaction("Handle user change", "readonly", (txn) => {
      let oldBatches;
      return localStoreImpl.mutationQueue.getAllMutationBatches(txn).next((promisedOldBatches) => {
        oldBatches = promisedOldBatches;
        localStoreImpl.initializeUserComponents(user);
        return localStoreImpl.mutationQueue.getAllMutationBatches(txn);
      }).next((newBatches) => {
        const removedBatchIds = [];
        const addedBatchIds = [];
        let changedKeys = documentKeySet();
        for (const batch of oldBatches) {
          removedBatchIds.push(batch.batchId);
          for (const mutation of batch.mutations) {
            changedKeys = changedKeys.add(mutation.key);
          }
        }
        for (const batch of newBatches) {
          addedBatchIds.push(batch.batchId);
          for (const mutation of batch.mutations) {
            changedKeys = changedKeys.add(mutation.key);
          }
        }
        return localStoreImpl.localDocuments.getDocuments(txn, changedKeys).next((affectedDocuments) => {
          return {
            affectedDocuments,
            removedBatchIds,
            addedBatchIds
          };
        });
      });
    });
    return result;
  });
}
function localStoreWriteLocally(localStore, mutations) {
  const localStoreImpl = debugCast(localStore);
  const localWriteTime = Timestamp.now();
  const keys = mutations.reduce((keys2, m) => keys2.add(m.key), documentKeySet());
  let overlayedDocuments;
  let mutationBatch;
  return localStoreImpl.persistence.runTransaction("Locally write mutations", "readwrite", (txn) => {
    let remoteDocs = mutableDocumentMap();
    let docsWithoutRemoteVersion = documentKeySet();
    return localStoreImpl.remoteDocuments.getEntries(txn, keys).next((docs) => {
      remoteDocs = docs;
      remoteDocs.forEach((key, doc4) => {
        if (!doc4.isValidDocument()) {
          docsWithoutRemoteVersion = docsWithoutRemoteVersion.add(key);
        }
      });
    }).next(() => {
      return localStoreImpl.localDocuments.getOverlayedDocuments(txn, remoteDocs);
    }).next((docs) => {
      overlayedDocuments = docs;
      const baseMutations = [];
      for (const mutation of mutations) {
        const baseValue = mutationExtractBaseValue(mutation, overlayedDocuments.get(mutation.key).overlayedDocument);
        if (baseValue != null) {
          baseMutations.push(new PatchMutation(mutation.key, baseValue, extractFieldMask(baseValue.value.mapValue), Precondition.exists(true)));
        }
      }
      return localStoreImpl.mutationQueue.addMutationBatch(txn, localWriteTime, baseMutations, mutations);
    }).next((batch) => {
      mutationBatch = batch;
      const overlays = batch.applyToLocalDocumentSet(overlayedDocuments, docsWithoutRemoteVersion);
      return localStoreImpl.documentOverlayCache.saveOverlays(txn, batch.batchId, overlays);
    });
  }).then(() => ({
    batchId: mutationBatch.batchId,
    changes: convertOverlayedDocumentMapToDocumentMap(overlayedDocuments)
  }));
}
function localStoreAcknowledgeBatch(localStore, batchResult) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (txn) => {
    const affected = batchResult.batch.keys();
    const documentBuffer = localStoreImpl.remoteDocuments.newChangeBuffer({
      trackRemovals: true
      // Make sure document removals show up in `getNewDocumentChanges()`
    });
    return applyWriteToRemoteDocuments(localStoreImpl, txn, batchResult, documentBuffer).next(() => documentBuffer.apply(txn)).next(() => localStoreImpl.mutationQueue.performConsistencyCheck(txn)).next(() => localStoreImpl.documentOverlayCache.removeOverlaysForBatchId(txn, affected, batchResult.batch.batchId)).next(() => localStoreImpl.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(txn, getKeysWithTransformResults(batchResult))).next(() => localStoreImpl.localDocuments.getDocuments(txn, affected));
  });
}
function getKeysWithTransformResults(batchResult) {
  let result = documentKeySet();
  for (let i = 0; i < batchResult.mutationResults.length; ++i) {
    const mutationResult = batchResult.mutationResults[i];
    if (mutationResult.transformResults.length > 0) {
      result = result.add(batchResult.batch.mutations[i].key);
    }
  }
  return result;
}
function localStoreRejectBatch(localStore, batchId) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Reject batch", "readwrite-primary", (txn) => {
    let affectedKeys;
    return localStoreImpl.mutationQueue.lookupMutationBatch(txn, batchId).next((batch) => {
      hardAssert(batch !== null);
      affectedKeys = batch.keys();
      return localStoreImpl.mutationQueue.removeMutationBatch(txn, batch);
    }).next(() => localStoreImpl.mutationQueue.performConsistencyCheck(txn)).next(() => localStoreImpl.documentOverlayCache.removeOverlaysForBatchId(txn, affectedKeys, batchId)).next(() => localStoreImpl.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(txn, affectedKeys)).next(() => localStoreImpl.localDocuments.getDocuments(txn, affectedKeys));
  });
}
function localStoreGetHighestUnacknowledgedBatchId(localStore) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (txn) => localStoreImpl.mutationQueue.getHighestUnacknowledgedBatchId(txn));
}
function localStoreGetLastRemoteSnapshotVersion(localStore) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Get last remote snapshot version", "readonly", (txn) => localStoreImpl.targetCache.getLastRemoteSnapshotVersion(txn));
}
function localStoreApplyRemoteEventToLocalCache(localStore, remoteEvent) {
  const localStoreImpl = debugCast(localStore);
  const remoteVersion = remoteEvent.snapshotVersion;
  let newTargetDataByTargetMap = localStoreImpl.targetDataByTarget;
  return localStoreImpl.persistence.runTransaction("Apply remote event", "readwrite-primary", (txn) => {
    const documentBuffer = localStoreImpl.remoteDocuments.newChangeBuffer({
      trackRemovals: true
      // Make sure document removals show up in `getNewDocumentChanges()`
    });
    newTargetDataByTargetMap = localStoreImpl.targetDataByTarget;
    const promises = [];
    remoteEvent.targetChanges.forEach((change, targetId) => {
      const oldTargetData = newTargetDataByTargetMap.get(targetId);
      if (!oldTargetData) {
        return;
      }
      promises.push(localStoreImpl.targetCache.removeMatchingKeys(txn, change.removedDocuments, targetId).next(() => {
        return localStoreImpl.targetCache.addMatchingKeys(txn, change.addedDocuments, targetId);
      }));
      let newTargetData = oldTargetData.withSequenceNumber(txn.currentSequenceNumber);
      if (remoteEvent.targetMismatches.get(targetId) !== null) {
        newTargetData = newTargetData.withResumeToken(ByteString.EMPTY_BYTE_STRING, SnapshotVersion.min()).withLastLimboFreeSnapshotVersion(SnapshotVersion.min());
      } else if (change.resumeToken.approximateByteSize() > 0) {
        newTargetData = newTargetData.withResumeToken(change.resumeToken, remoteVersion);
      }
      newTargetDataByTargetMap = newTargetDataByTargetMap.insert(targetId, newTargetData);
      if (shouldPersistTargetData(oldTargetData, newTargetData, change)) {
        promises.push(localStoreImpl.targetCache.updateTargetData(txn, newTargetData));
      }
    });
    let changedDocs = mutableDocumentMap();
    let existenceChangedKeys = documentKeySet();
    remoteEvent.documentUpdates.forEach((key) => {
      if (remoteEvent.resolvedLimboDocuments.has(key)) {
        promises.push(localStoreImpl.persistence.referenceDelegate.updateLimboDocument(txn, key));
      }
    });
    promises.push(populateDocumentChangeBuffer(txn, documentBuffer, remoteEvent.documentUpdates).next((result) => {
      changedDocs = result.changedDocuments;
      existenceChangedKeys = result.existenceChangedKeys;
    }));
    if (!remoteVersion.isEqual(SnapshotVersion.min())) {
      const updateRemoteVersion = localStoreImpl.targetCache.getLastRemoteSnapshotVersion(txn).next((lastRemoteSnapshotVersion) => {
        return localStoreImpl.targetCache.setTargetsMetadata(txn, txn.currentSequenceNumber, remoteVersion);
      });
      promises.push(updateRemoteVersion);
    }
    return PersistencePromise.waitFor(promises).next(() => documentBuffer.apply(txn)).next(() => localStoreImpl.localDocuments.getLocalViewOfDocuments(txn, changedDocs, existenceChangedKeys)).next(() => changedDocs);
  }).then((changedDocs) => {
    localStoreImpl.targetDataByTarget = newTargetDataByTargetMap;
    return changedDocs;
  });
}
function populateDocumentChangeBuffer(txn, documentBuffer, documents) {
  let updatedKeys = documentKeySet();
  let existenceChangedKeys = documentKeySet();
  documents.forEach((k) => updatedKeys = updatedKeys.add(k));
  return documentBuffer.getEntries(txn, updatedKeys).next((existingDocs) => {
    let changedDocuments = mutableDocumentMap();
    documents.forEach((key, doc4) => {
      const existingDoc = existingDocs.get(key);
      if (doc4.isFoundDocument() !== existingDoc.isFoundDocument()) {
        existenceChangedKeys = existenceChangedKeys.add(key);
      }
      if (doc4.isNoDocument() && doc4.version.isEqual(SnapshotVersion.min())) {
        documentBuffer.removeEntry(key, doc4.readTime);
        changedDocuments = changedDocuments.insert(key, doc4);
      } else if (!existingDoc.isValidDocument() || doc4.version.compareTo(existingDoc.version) > 0 || doc4.version.compareTo(existingDoc.version) === 0 && existingDoc.hasPendingWrites) {
        documentBuffer.addEntry(doc4);
        changedDocuments = changedDocuments.insert(key, doc4);
      } else {
        logDebug(LOG_TAG$b, "Ignoring outdated watch update for ", key, ". Current version:", existingDoc.version, " Watch version:", doc4.version);
      }
    });
    return {
      changedDocuments,
      existenceChangedKeys
    };
  });
}
function shouldPersistTargetData(oldTargetData, newTargetData, change) {
  if (oldTargetData.resumeToken.approximateByteSize() === 0) {
    return true;
  }
  const timeDelta = newTargetData.snapshotVersion.toMicroseconds() - oldTargetData.snapshotVersion.toMicroseconds();
  if (timeDelta >= RESUME_TOKEN_MAX_AGE_MICROS) {
    return true;
  }
  const changes = change.addedDocuments.size + change.modifiedDocuments.size + change.removedDocuments.size;
  return changes > 0;
}
function localStoreNotifyLocalViewChanges(localStore, viewChanges) {
  return __async(this, null, function* () {
    const localStoreImpl = debugCast(localStore);
    try {
      yield localStoreImpl.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (txn) => {
        return PersistencePromise.forEach(viewChanges, (viewChange) => {
          return PersistencePromise.forEach(viewChange.addedKeys, (key) => localStoreImpl.persistence.referenceDelegate.addReference(txn, viewChange.targetId, key)).next(() => PersistencePromise.forEach(viewChange.removedKeys, (key) => localStoreImpl.persistence.referenceDelegate.removeReference(txn, viewChange.targetId, key)));
        });
      });
    } catch (e) {
      if (isIndexedDbTransactionError(e)) {
        logDebug(LOG_TAG$b, "Failed to update sequence numbers: " + e);
      } else {
        throw e;
      }
    }
    for (const viewChange of viewChanges) {
      const targetId = viewChange.targetId;
      if (!viewChange.fromCache) {
        const targetData = localStoreImpl.targetDataByTarget.get(targetId);
        const lastLimboFreeSnapshotVersion = targetData.snapshotVersion;
        const updatedTargetData = targetData.withLastLimboFreeSnapshotVersion(lastLimboFreeSnapshotVersion);
        localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.insert(targetId, updatedTargetData);
      }
    }
  });
}
function localStoreGetNextMutationBatch(localStore, afterBatchId) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Get next mutation batch", "readonly", (txn) => {
    if (afterBatchId === void 0) {
      afterBatchId = BATCHID_UNKNOWN;
    }
    return localStoreImpl.mutationQueue.getNextMutationBatchAfterBatchId(txn, afterBatchId);
  });
}
function localStoreReadDocument(localStore, key) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("read document", "readonly", (txn) => localStoreImpl.localDocuments.getDocument(txn, key));
}
function localStoreAllocateTarget(localStore, target) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Allocate target", "readwrite", (txn) => {
    let targetData;
    return localStoreImpl.targetCache.getTargetData(txn, target).next((cached) => {
      if (cached) {
        targetData = cached;
        return PersistencePromise.resolve(targetData);
      } else {
        return localStoreImpl.targetCache.allocateTargetId(txn).next((targetId) => {
          targetData = new TargetData(target, targetId, "TargetPurposeListen", txn.currentSequenceNumber);
          return localStoreImpl.targetCache.addTargetData(txn, targetData).next(() => targetData);
        });
      }
    });
  }).then((targetData) => {
    const cachedTargetData = localStoreImpl.targetDataByTarget.get(targetData.targetId);
    if (cachedTargetData === null || targetData.snapshotVersion.compareTo(cachedTargetData.snapshotVersion) > 0) {
      localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.insert(targetData.targetId, targetData);
      localStoreImpl.targetIdByTarget.set(target, targetData.targetId);
    }
    return targetData;
  });
}
function localStoreGetTargetData(localStore, transaction, target) {
  const localStoreImpl = debugCast(localStore);
  const targetId = localStoreImpl.targetIdByTarget.get(target);
  if (targetId !== void 0) {
    return PersistencePromise.resolve(localStoreImpl.targetDataByTarget.get(targetId));
  } else {
    return localStoreImpl.targetCache.getTargetData(transaction, target);
  }
}
function localStoreReleaseTarget(localStore, targetId, keepPersistedTargetData) {
  return __async(this, null, function* () {
    const localStoreImpl = debugCast(localStore);
    const targetData = localStoreImpl.targetDataByTarget.get(targetId);
    const mode = keepPersistedTargetData ? "readwrite" : "readwrite-primary";
    try {
      if (!keepPersistedTargetData) {
        yield localStoreImpl.persistence.runTransaction("Release target", mode, (txn) => {
          return localStoreImpl.persistence.referenceDelegate.removeTarget(txn, targetData);
        });
      }
    } catch (e) {
      if (isIndexedDbTransactionError(e)) {
        logDebug(LOG_TAG$b, `Failed to update sequence numbers for target ${targetId}: ${e}`);
      } else {
        throw e;
      }
    }
    localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.remove(targetId);
    localStoreImpl.targetIdByTarget.delete(targetData.target);
  });
}
function localStoreExecuteQuery(localStore, query3, usePreviousResults) {
  const localStoreImpl = debugCast(localStore);
  let lastLimboFreeSnapshotVersion = SnapshotVersion.min();
  let remoteKeys = documentKeySet();
  return localStoreImpl.persistence.runTransaction(
    "Execute query",
    "readwrite",
    // Use readwrite instead of readonly so indexes can be created
    // Use readwrite instead of readonly so indexes can be created
    (txn) => {
      return localStoreGetTargetData(localStoreImpl, txn, queryToTarget(query3)).next((targetData) => {
        if (targetData) {
          lastLimboFreeSnapshotVersion = targetData.lastLimboFreeSnapshotVersion;
          return localStoreImpl.targetCache.getMatchingKeysForTargetId(txn, targetData.targetId).next((result) => {
            remoteKeys = result;
          });
        }
      }).next(() => localStoreImpl.queryEngine.getDocumentsMatchingQuery(txn, query3, usePreviousResults ? lastLimboFreeSnapshotVersion : SnapshotVersion.min(), usePreviousResults ? remoteKeys : documentKeySet())).next((documents) => {
        setMaxReadTime(localStoreImpl, queryCollectionGroup(query3), documents);
        return {
          documents,
          remoteKeys
        };
      });
    }
  );
}
function applyWriteToRemoteDocuments(localStoreImpl, txn, batchResult, documentBuffer) {
  const batch = batchResult.batch;
  const docKeys = batch.keys();
  let promiseChain = PersistencePromise.resolve();
  docKeys.forEach((docKey) => {
    promiseChain = promiseChain.next(() => documentBuffer.getEntry(txn, docKey)).next((doc4) => {
      const ackVersion = batchResult.docVersions.get(docKey);
      hardAssert(ackVersion !== null);
      if (doc4.version.compareTo(ackVersion) < 0) {
        batch.applyToRemoteDocument(doc4, batchResult);
        if (doc4.isValidDocument()) {
          doc4.setReadTime(batchResult.commitVersion);
          documentBuffer.addEntry(doc4);
        }
      }
    });
  });
  return promiseChain.next(() => localStoreImpl.mutationQueue.removeMutationBatch(txn, batch));
}
function localStoreLookupMutationDocuments(localStore, batchId) {
  const localStoreImpl = debugCast(localStore);
  const mutationQueueImpl = debugCast(localStoreImpl.mutationQueue);
  return localStoreImpl.persistence.runTransaction("Lookup mutation documents", "readonly", (txn) => {
    return mutationQueueImpl.lookupMutationKeys(txn, batchId).next((keys) => {
      if (keys) {
        return localStoreImpl.localDocuments.getDocuments(txn, keys);
      } else {
        return PersistencePromise.resolve(null);
      }
    });
  });
}
function localStoreRemoveCachedMutationBatchMetadata(localStore, batchId) {
  const mutationQueueImpl = debugCast(debugCast(localStore, LocalStoreImpl).mutationQueue);
  mutationQueueImpl.removeCachedMutationKeys(batchId);
}
function localStoreGetActiveClients(localStore) {
  const persistenceImpl = debugCast(debugCast(localStore, LocalStoreImpl).persistence);
  return persistenceImpl.getActiveClients();
}
function localStoreGetCachedTarget(localStore, targetId) {
  const localStoreImpl = debugCast(localStore);
  const targetCacheImpl = debugCast(localStoreImpl.targetCache);
  const cachedTargetData = localStoreImpl.targetDataByTarget.get(targetId);
  if (cachedTargetData) {
    return Promise.resolve(cachedTargetData.target);
  } else {
    return localStoreImpl.persistence.runTransaction("Get target data", "readonly", (txn) => {
      return targetCacheImpl.getTargetDataForTarget(txn, targetId).next((targetData) => targetData ? targetData.target : null);
    });
  }
}
function localStoreGetNewDocumentChanges(localStore, collectionGroup3) {
  const localStoreImpl = debugCast(localStore);
  const readTime = localStoreImpl.collectionGroupReadTime.get(collectionGroup3) || SnapshotVersion.min();
  return localStoreImpl.persistence.runTransaction("Get new document changes", "readonly", (txn) => localStoreImpl.remoteDocuments.getAllFromCollectionGroup(
    txn,
    collectionGroup3,
    newIndexOffsetSuccessorFromReadTime(readTime, INITIAL_LARGEST_BATCH_ID),
    /* limit= */
    Number.MAX_SAFE_INTEGER
  )).then((changedDocs) => {
    setMaxReadTime(localStoreImpl, collectionGroup3, changedDocs);
    return changedDocs;
  });
}
function setMaxReadTime(localStoreImpl, collectionGroup3, changedDocs) {
  let readTime = localStoreImpl.collectionGroupReadTime.get(collectionGroup3) || SnapshotVersion.min();
  changedDocs.forEach((_, doc4) => {
    if (doc4.readTime.compareTo(readTime) > 0) {
      readTime = doc4.readTime;
    }
  });
  localStoreImpl.collectionGroupReadTime.set(collectionGroup3, readTime);
}
function umbrellaTarget(bundleName) {
  return queryToTarget(newQueryForPath(ResourcePath.fromString(`__bundle__/docs/${bundleName}`)));
}
function localStoreApplyBundledDocuments(localStore, bundleConverter, documents, bundleName) {
  return __async(this, null, function* () {
    const localStoreImpl = debugCast(localStore);
    let documentKeys = documentKeySet();
    let documentMap2 = mutableDocumentMap();
    for (const bundleDoc of documents) {
      const documentKey = bundleConverter.toDocumentKey(bundleDoc.metadata.name);
      if (bundleDoc.document) {
        documentKeys = documentKeys.add(documentKey);
      }
      const doc4 = bundleConverter.toMutableDocument(bundleDoc);
      doc4.setReadTime(bundleConverter.toSnapshotVersion(bundleDoc.metadata.readTime));
      documentMap2 = documentMap2.insert(documentKey, doc4);
    }
    const documentBuffer = localStoreImpl.remoteDocuments.newChangeBuffer({
      trackRemovals: true
      // Make sure document removals show up in `getNewDocumentChanges()`
    });
    const umbrellaTargetData = yield localStoreAllocateTarget(localStoreImpl, umbrellaTarget(bundleName));
    return localStoreImpl.persistence.runTransaction("Apply bundle documents", "readwrite", (txn) => {
      return populateDocumentChangeBuffer(txn, documentBuffer, documentMap2).next((documentChangeResult) => {
        documentBuffer.apply(txn);
        return documentChangeResult;
      }).next((documentChangeResult) => {
        return localStoreImpl.targetCache.removeMatchingKeysForTargetId(txn, umbrellaTargetData.targetId).next(() => localStoreImpl.targetCache.addMatchingKeys(txn, documentKeys, umbrellaTargetData.targetId)).next(() => localStoreImpl.localDocuments.getLocalViewOfDocuments(txn, documentChangeResult.changedDocuments, documentChangeResult.existenceChangedKeys)).next(() => documentChangeResult.changedDocuments);
      });
    });
  });
}
function localStoreHasNewerBundle(localStore, bundleMetadata) {
  const localStoreImpl = debugCast(localStore);
  const currentReadTime = fromVersion(bundleMetadata.createTime);
  return localStoreImpl.persistence.runTransaction("hasNewerBundle", "readonly", (transaction) => {
    return localStoreImpl.bundleCache.getBundleMetadata(transaction, bundleMetadata.id);
  }).then((cached) => {
    return !!cached && cached.createTime.compareTo(currentReadTime) >= 0;
  });
}
function localStoreSaveBundle(localStore, bundleMetadata) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Save bundle", "readwrite", (transaction) => {
    return localStoreImpl.bundleCache.saveBundleMetadata(transaction, bundleMetadata);
  });
}
function localStoreGetNamedQuery(localStore, queryName) {
  const localStoreImpl = debugCast(localStore);
  return localStoreImpl.persistence.runTransaction("Get named query", "readonly", (transaction) => localStoreImpl.bundleCache.getNamedQuery(transaction, queryName));
}
function localStoreSaveNamedQuery(_0, _1) {
  return __async(this, arguments, function* (localStore, query3, documents = documentKeySet()) {
    const allocated = yield localStoreAllocateTarget(localStore, queryToTarget(fromBundledQuery(query3.bundledQuery)));
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction("Save named query", "readwrite", (transaction) => {
      const readTime = fromVersion(query3.readTime);
      if (allocated.snapshotVersion.compareTo(readTime) >= 0) {
        return localStoreImpl.bundleCache.saveNamedQuery(transaction, query3);
      }
      const newTargetData = allocated.withResumeToken(ByteString.EMPTY_BYTE_STRING, readTime);
      localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.insert(newTargetData.targetId, newTargetData);
      return localStoreImpl.targetCache.updateTargetData(transaction, newTargetData).next(() => localStoreImpl.targetCache.removeMatchingKeysForTargetId(transaction, allocated.targetId)).next(() => localStoreImpl.targetCache.addMatchingKeys(transaction, documents, allocated.targetId)).next(() => localStoreImpl.bundleCache.saveNamedQuery(transaction, query3));
    });
  });
}
function localStoreConfigureFieldIndexes(localStore, newFieldIndexes) {
  return __async(this, null, function* () {
    const localStoreImpl = debugCast(localStore);
    const indexManager = localStoreImpl.indexManager;
    const promises = [];
    return localStoreImpl.persistence.runTransaction("Configure indexes", "readwrite", (transaction) => indexManager.getFieldIndexes(transaction).next((oldFieldIndexes) => diffArrays(oldFieldIndexes, newFieldIndexes, fieldIndexSemanticComparator, (fieldIndex) => {
      promises.push(indexManager.addFieldIndex(transaction, fieldIndex));
    }, (fieldIndex) => {
      promises.push(indexManager.deleteFieldIndex(transaction, fieldIndex));
    })).next(() => PersistencePromise.waitFor(promises)));
  });
}
function localStoreSetIndexAutoCreationEnabled(localStore, isEnabled) {
  const localStoreImpl = debugCast(localStore);
  localStoreImpl.queryEngine.indexAutoCreationEnabled = isEnabled;
}
function localStoreDeleteAllFieldIndexes(localStore) {
  const localStoreImpl = debugCast(localStore);
  const indexManager = localStoreImpl.indexManager;
  return localStoreImpl.persistence.runTransaction("Delete All Indexes", "readwrite", (transaction) => indexManager.deleteAllFieldIndexes(transaction));
}
var QueryContext = class {
  constructor() {
    this._documentReadCount = 0;
  }
  get documentReadCount() {
    return this._documentReadCount;
  }
  incrementDocumentReadCount(amount) {
    this._documentReadCount += amount;
  }
};
var DEFAULT_INDEX_AUTO_CREATION_MIN_COLLECTION_SIZE = 100;
function getDefaultRelativeIndexReadCostPerDocument() {
  if (isSafari()) {
    return 8;
  } else if (getAndroidVersion(getUA()) > 0) {
    return 6;
  } else {
    return 4;
  }
}
var QueryEngine = class {
  constructor() {
    this.initialized = false;
    this.indexAutoCreationEnabled = false;
    this.indexAutoCreationMinCollectionSize = DEFAULT_INDEX_AUTO_CREATION_MIN_COLLECTION_SIZE;
    this.relativeIndexReadCostPerDocument = getDefaultRelativeIndexReadCostPerDocument();
  }
  /** Sets the document view to query against. */
  initialize(localDocuments, indexManager) {
    this.localDocumentsView = localDocuments;
    this.indexManager = indexManager;
    this.initialized = true;
  }
  /** Returns all local documents matching the specified query. */
  getDocumentsMatchingQuery(transaction, query3, lastLimboFreeSnapshotVersion, remoteKeys) {
    const queryResult = {
      result: null
    };
    return this.performQueryUsingIndex(transaction, query3).next((result) => {
      queryResult.result = result;
    }).next(() => {
      if (queryResult.result) {
        return;
      }
      return this.performQueryUsingRemoteKeys(transaction, query3, remoteKeys, lastLimboFreeSnapshotVersion).next((result) => {
        queryResult.result = result;
      });
    }).next(() => {
      if (queryResult.result) {
        return;
      }
      const context = new QueryContext();
      return this.executeFullCollectionScan(transaction, query3, context).next((result) => {
        queryResult.result = result;
        if (this.indexAutoCreationEnabled) {
          return this.createCacheIndexes(transaction, query3, context, result.size);
        }
      });
    }).next(() => queryResult.result);
  }
  createCacheIndexes(transaction, query3, context, resultSize) {
    if (context.documentReadCount < this.indexAutoCreationMinCollectionSize) {
      if (getLogLevel() <= LogLevel.DEBUG) {
        logDebug("QueryEngine", "SDK will not create cache indexes for query:", stringifyQuery(query3), "since it only creates cache indexes for collection contains", "more than or equal to", this.indexAutoCreationMinCollectionSize, "documents");
      }
      return PersistencePromise.resolve();
    }
    if (getLogLevel() <= LogLevel.DEBUG) {
      logDebug("QueryEngine", "Query:", stringifyQuery(query3), "scans", context.documentReadCount, "local documents and returns", resultSize, "documents as results.");
    }
    if (context.documentReadCount > this.relativeIndexReadCostPerDocument * resultSize) {
      if (getLogLevel() <= LogLevel.DEBUG) {
        logDebug("QueryEngine", "The SDK decides to create cache indexes for query:", stringifyQuery(query3), "as using cache indexes may help improve performance.");
      }
      return this.indexManager.createTargetIndexes(transaction, queryToTarget(query3));
    }
    return PersistencePromise.resolve();
  }
  /**
   * Performs an indexed query that evaluates the query based on a collection's
   * persisted index values. Returns `null` if an index is not available.
   */
  performQueryUsingIndex(transaction, query3) {
    if (queryMatchesAllDocuments(query3)) {
      return PersistencePromise.resolve(null);
    }
    let target = queryToTarget(query3);
    return this.indexManager.getIndexType(transaction, target).next((indexType) => {
      if (indexType === 0) {
        return null;
      }
      if (query3.limit !== null && indexType === 1) {
        query3 = queryWithLimit(
          query3,
          null,
          "F"
          /* LimitType.First */
        );
        target = queryToTarget(query3);
      }
      return this.indexManager.getDocumentsMatchingTarget(transaction, target).next((keys) => {
        const sortedKeys = documentKeySet(...keys);
        return this.localDocumentsView.getDocuments(transaction, sortedKeys).next((indexedDocuments) => {
          return this.indexManager.getMinOffset(transaction, target).next((offset) => {
            const previousResults = this.applyQuery(query3, indexedDocuments);
            if (this.needsRefill(query3, previousResults, sortedKeys, offset.readTime)) {
              return this.performQueryUsingIndex(transaction, queryWithLimit(
                query3,
                null,
                "F"
                /* LimitType.First */
              ));
            }
            return this.appendRemainingResults(transaction, previousResults, query3, offset);
          });
        });
      });
    });
  }
  /**
   * Performs a query based on the target's persisted query mapping. Returns
   * `null` if the mapping is not available or cannot be used.
   */
  performQueryUsingRemoteKeys(transaction, query3, remoteKeys, lastLimboFreeSnapshotVersion) {
    if (queryMatchesAllDocuments(query3)) {
      return PersistencePromise.resolve(null);
    }
    if (lastLimboFreeSnapshotVersion.isEqual(SnapshotVersion.min())) {
      return PersistencePromise.resolve(null);
    }
    return this.localDocumentsView.getDocuments(transaction, remoteKeys).next((documents) => {
      const previousResults = this.applyQuery(query3, documents);
      if (this.needsRefill(query3, previousResults, remoteKeys, lastLimboFreeSnapshotVersion)) {
        return PersistencePromise.resolve(null);
      }
      if (getLogLevel() <= LogLevel.DEBUG) {
        logDebug("QueryEngine", "Re-using previous result from %s to execute query: %s", lastLimboFreeSnapshotVersion.toString(), stringifyQuery(query3));
      }
      return this.appendRemainingResults(transaction, previousResults, query3, newIndexOffsetSuccessorFromReadTime(lastLimboFreeSnapshotVersion, INITIAL_LARGEST_BATCH_ID)).next((results) => results);
    });
  }
  /** Applies the query filter and sorting to the provided documents.  */
  applyQuery(query3, documents) {
    let queryResults = new SortedSet(newQueryComparator(query3));
    documents.forEach((_, maybeDoc) => {
      if (queryMatches(query3, maybeDoc)) {
        queryResults = queryResults.add(maybeDoc);
      }
    });
    return queryResults;
  }
  /**
   * Determines if a limit query needs to be refilled from cache, making it
   * ineligible for index-free execution.
   *
   * @param query - The query.
   * @param sortedPreviousResults - The documents that matched the query when it
   * was last synchronized, sorted by the query's comparator.
   * @param remoteKeys - The document keys that matched the query at the last
   * snapshot.
   * @param limboFreeSnapshotVersion - The version of the snapshot when the
   * query was last synchronized.
   */
  needsRefill(query3, sortedPreviousResults, remoteKeys, limboFreeSnapshotVersion) {
    if (query3.limit === null) {
      return false;
    }
    if (remoteKeys.size !== sortedPreviousResults.size) {
      return true;
    }
    const docAtLimitEdge = query3.limitType === "F" ? sortedPreviousResults.last() : sortedPreviousResults.first();
    if (!docAtLimitEdge) {
      return false;
    }
    return docAtLimitEdge.hasPendingWrites || docAtLimitEdge.version.compareTo(limboFreeSnapshotVersion) > 0;
  }
  executeFullCollectionScan(transaction, query3, context) {
    if (getLogLevel() <= LogLevel.DEBUG) {
      logDebug("QueryEngine", "Using full collection scan to execute query:", stringifyQuery(query3));
    }
    return this.localDocumentsView.getDocumentsMatchingQuery(transaction, query3, IndexOffset.min(), context);
  }
  /**
   * Combines the results from an indexed execution with the remaining documents
   * that have not yet been indexed.
   */
  appendRemainingResults(transaction, indexedResults, query3, offset) {
    return this.localDocumentsView.getDocumentsMatchingQuery(transaction, query3, offset).next((remainingResults) => {
      indexedResults.forEach((d) => {
        remainingResults = remainingResults.insert(d.key, d);
      });
      return remainingResults;
    });
  }
};
var CLIENT_STATE_KEY_PREFIX = "firestore_clients";
function createWebStorageClientStateKey(persistenceKey, clientId) {
  return `${CLIENT_STATE_KEY_PREFIX}_${persistenceKey}_${clientId}`;
}
var MUTATION_BATCH_KEY_PREFIX = "firestore_mutations";
function createWebStorageMutationBatchKey(persistenceKey, user, batchId) {
  let mutationKey = `${MUTATION_BATCH_KEY_PREFIX}_${persistenceKey}_${batchId}`;
  if (user.isAuthenticated()) {
    mutationKey += `_${user.uid}`;
  }
  return mutationKey;
}
var QUERY_TARGET_KEY_PREFIX = "firestore_targets";
function createWebStorageQueryTargetMetadataKey(persistenceKey, targetId) {
  return `${QUERY_TARGET_KEY_PREFIX}_${persistenceKey}_${targetId}`;
}
var ONLINE_STATE_KEY_PREFIX = "firestore_online_state";
function createWebStorageOnlineStateKey(persistenceKey) {
  return `${ONLINE_STATE_KEY_PREFIX}_${persistenceKey}`;
}
var BUNDLE_LOADED_KEY_PREFIX = "firestore_bundle_loaded_v2";
function createBundleLoadedKey(persistenceKey) {
  return `${BUNDLE_LOADED_KEY_PREFIX}_${persistenceKey}`;
}
var SEQUENCE_NUMBER_KEY_PREFIX = "firestore_sequence_number";
function createWebStorageSequenceNumberKey(persistenceKey) {
  return `${SEQUENCE_NUMBER_KEY_PREFIX}_${persistenceKey}`;
}
var LOG_TAG$a = "SharedClientState";
var MutationMetadata = class _MutationMetadata {
  constructor(user, batchId, state, error) {
    this.user = user;
    this.batchId = batchId;
    this.state = state;
    this.error = error;
  }
  /**
   * Parses a MutationMetadata from its JSON representation in WebStorage.
   * Logs a warning and returns null if the format of the data is not valid.
   */
  static fromWebStorageEntry(user, batchId, value) {
    const mutationBatch = JSON.parse(value);
    let validData = typeof mutationBatch === "object" && ["pending", "acknowledged", "rejected"].indexOf(mutationBatch.state) !== -1 && (mutationBatch.error === void 0 || typeof mutationBatch.error === "object");
    let firestoreError = void 0;
    if (validData && mutationBatch.error) {
      validData = typeof mutationBatch.error.message === "string" && typeof mutationBatch.error.code === "string";
      if (validData) {
        firestoreError = new FirestoreError(mutationBatch.error.code, mutationBatch.error.message);
      }
    }
    if (validData) {
      return new _MutationMetadata(user, batchId, mutationBatch.state, firestoreError);
    } else {
      logError(LOG_TAG$a, `Failed to parse mutation state for ID '${batchId}': ${value}`);
      return null;
    }
  }
  toWebStorageJSON() {
    const batchMetadata = {
      state: this.state,
      updateTimeMs: Date.now()
      // Modify the existing value to trigger update.
    };
    if (this.error) {
      batchMetadata.error = {
        code: this.error.code,
        message: this.error.message
      };
    }
    return JSON.stringify(batchMetadata);
  }
};
var QueryTargetMetadata = class _QueryTargetMetadata {
  constructor(targetId, state, error) {
    this.targetId = targetId;
    this.state = state;
    this.error = error;
  }
  /**
   * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
   * Logs a warning and returns null if the format of the data is not valid.
   */
  static fromWebStorageEntry(targetId, value) {
    const targetState = JSON.parse(value);
    let validData = typeof targetState === "object" && ["not-current", "current", "rejected"].indexOf(targetState.state) !== -1 && (targetState.error === void 0 || typeof targetState.error === "object");
    let firestoreError = void 0;
    if (validData && targetState.error) {
      validData = typeof targetState.error.message === "string" && typeof targetState.error.code === "string";
      if (validData) {
        firestoreError = new FirestoreError(targetState.error.code, targetState.error.message);
      }
    }
    if (validData) {
      return new _QueryTargetMetadata(targetId, targetState.state, firestoreError);
    } else {
      logError(LOG_TAG$a, `Failed to parse target state for ID '${targetId}': ${value}`);
      return null;
    }
  }
  toWebStorageJSON() {
    const targetState = {
      state: this.state,
      updateTimeMs: Date.now()
      // Modify the existing value to trigger update.
    };
    if (this.error) {
      targetState.error = {
        code: this.error.code,
        message: this.error.message
      };
    }
    return JSON.stringify(targetState);
  }
};
var RemoteClientState = class _RemoteClientState {
  constructor(clientId, activeTargetIds) {
    this.clientId = clientId;
    this.activeTargetIds = activeTargetIds;
  }
  /**
   * Parses a RemoteClientState from the JSON representation in WebStorage.
   * Logs a warning and returns null if the format of the data is not valid.
   */
  static fromWebStorageEntry(clientId, value) {
    const clientState = JSON.parse(value);
    let validData = typeof clientState === "object" && clientState.activeTargetIds instanceof Array;
    let activeTargetIdsSet = targetIdSet();
    for (let i = 0; validData && i < clientState.activeTargetIds.length; ++i) {
      validData = isSafeInteger(clientState.activeTargetIds[i]);
      activeTargetIdsSet = activeTargetIdsSet.add(clientState.activeTargetIds[i]);
    }
    if (validData) {
      return new _RemoteClientState(clientId, activeTargetIdsSet);
    } else {
      logError(LOG_TAG$a, `Failed to parse client data for instance '${clientId}': ${value}`);
      return null;
    }
  }
};
var SharedOnlineState = class _SharedOnlineState {
  constructor(clientId, onlineState) {
    this.clientId = clientId;
    this.onlineState = onlineState;
  }
  /**
   * Parses a SharedOnlineState from its JSON representation in WebStorage.
   * Logs a warning and returns null if the format of the data is not valid.
   */
  static fromWebStorageEntry(value) {
    const onlineState = JSON.parse(value);
    const validData = typeof onlineState === "object" && ["Unknown", "Online", "Offline"].indexOf(onlineState.onlineState) !== -1 && typeof onlineState.clientId === "string";
    if (validData) {
      return new _SharedOnlineState(onlineState.clientId, onlineState.onlineState);
    } else {
      logError(LOG_TAG$a, `Failed to parse online state: ${value}`);
      return null;
    }
  }
};
var LocalClientState = class {
  constructor() {
    this.activeTargetIds = targetIdSet();
  }
  addQueryTarget(targetId) {
    this.activeTargetIds = this.activeTargetIds.add(targetId);
  }
  removeQueryTarget(targetId) {
    this.activeTargetIds = this.activeTargetIds.delete(targetId);
  }
  /**
   * Converts this entry into a JSON-encoded format we can use for WebStorage.
   * Does not encode `clientId` as it is part of the key in WebStorage.
   */
  toWebStorageJSON() {
    const data = {
      activeTargetIds: this.activeTargetIds.toArray(),
      updateTimeMs: Date.now()
      // Modify the existing value to trigger update.
    };
    return JSON.stringify(data);
  }
};
var WebStorageSharedClientState = class {
  constructor(window2, queue, persistenceKey, localClientId, initialUser) {
    this.window = window2;
    this.queue = queue;
    this.persistenceKey = persistenceKey;
    this.localClientId = localClientId;
    this.syncEngine = null;
    this.onlineStateHandler = null;
    this.sequenceNumberHandler = null;
    this.storageListener = this.handleWebStorageEvent.bind(this);
    this.activeClients = new SortedMap(primitiveComparator);
    this.started = false;
    this.earlyEvents = [];
    const escapedPersistenceKey = persistenceKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    this.storage = this.window.localStorage;
    this.currentUser = initialUser;
    this.localClientStorageKey = createWebStorageClientStateKey(this.persistenceKey, this.localClientId);
    this.sequenceNumberKey = createWebStorageSequenceNumberKey(this.persistenceKey);
    this.activeClients = this.activeClients.insert(this.localClientId, new LocalClientState());
    this.clientStateKeyRe = new RegExp(`^${CLIENT_STATE_KEY_PREFIX}_${escapedPersistenceKey}_([^_]*)$`);
    this.mutationBatchKeyRe = new RegExp(`^${MUTATION_BATCH_KEY_PREFIX}_${escapedPersistenceKey}_(\\d+)(?:_(.*))?$`);
    this.queryTargetKeyRe = new RegExp(`^${QUERY_TARGET_KEY_PREFIX}_${escapedPersistenceKey}_(\\d+)$`);
    this.onlineStateKey = createWebStorageOnlineStateKey(this.persistenceKey);
    this.bundleLoadedKey = createBundleLoadedKey(this.persistenceKey);
    this.window.addEventListener("storage", this.storageListener);
  }
  /** Returns 'true' if WebStorage is available in the current environment. */
  static isAvailable(window2) {
    return !!(window2 && window2.localStorage);
  }
  start() {
    return __async(this, null, function* () {
      const existingClients = yield this.syncEngine.getActiveClients();
      for (const clientId of existingClients) {
        if (clientId === this.localClientId) {
          continue;
        }
        const storageItem = this.getItem(createWebStorageClientStateKey(this.persistenceKey, clientId));
        if (storageItem) {
          const clientState = RemoteClientState.fromWebStorageEntry(clientId, storageItem);
          if (clientState) {
            this.activeClients = this.activeClients.insert(clientState.clientId, clientState);
          }
        }
      }
      this.persistClientState();
      const onlineStateJSON = this.storage.getItem(this.onlineStateKey);
      if (onlineStateJSON) {
        const onlineState = this.fromWebStorageOnlineState(onlineStateJSON);
        if (onlineState) {
          this.handleOnlineStateEvent(onlineState);
        }
      }
      for (const event of this.earlyEvents) {
        this.handleWebStorageEvent(event);
      }
      this.earlyEvents = [];
      this.window.addEventListener("pagehide", () => this.shutdown());
      this.started = true;
    });
  }
  writeSequenceNumber(sequenceNumber) {
    this.setItem(this.sequenceNumberKey, JSON.stringify(sequenceNumber));
  }
  getAllActiveQueryTargets() {
    return this.extractActiveQueryTargets(this.activeClients);
  }
  isActiveQueryTarget(targetId) {
    let found = false;
    this.activeClients.forEach((key, value) => {
      if (value.activeTargetIds.has(targetId)) {
        found = true;
      }
    });
    return found;
  }
  addPendingMutation(batchId) {
    this.persistMutationState(batchId, "pending");
  }
  updateMutationState(batchId, state, error) {
    this.persistMutationState(batchId, state, error);
    this.removeMutationState(batchId);
  }
  addLocalQueryTarget(targetId, addToActiveTargetIds = true) {
    let queryState = "not-current";
    if (this.isActiveQueryTarget(targetId)) {
      const storageItem = this.storage.getItem(createWebStorageQueryTargetMetadataKey(this.persistenceKey, targetId));
      if (storageItem) {
        const metadata = QueryTargetMetadata.fromWebStorageEntry(targetId, storageItem);
        if (metadata) {
          queryState = metadata.state;
        }
      }
    }
    if (addToActiveTargetIds) {
      this.localClientState.addQueryTarget(targetId);
    }
    this.persistClientState();
    return queryState;
  }
  removeLocalQueryTarget(targetId) {
    this.localClientState.removeQueryTarget(targetId);
    this.persistClientState();
  }
  isLocalQueryTarget(targetId) {
    return this.localClientState.activeTargetIds.has(targetId);
  }
  clearQueryState(targetId) {
    this.removeItem(createWebStorageQueryTargetMetadataKey(this.persistenceKey, targetId));
  }
  updateQueryState(targetId, state, error) {
    this.persistQueryTargetState(targetId, state, error);
  }
  handleUserChange(user, removedBatchIds, addedBatchIds) {
    removedBatchIds.forEach((batchId) => {
      this.removeMutationState(batchId);
    });
    this.currentUser = user;
    addedBatchIds.forEach((batchId) => {
      this.addPendingMutation(batchId);
    });
  }
  setOnlineState(onlineState) {
    this.persistOnlineState(onlineState);
  }
  notifyBundleLoaded(collectionGroups) {
    this.persistBundleLoadedState(collectionGroups);
  }
  shutdown() {
    if (this.started) {
      this.window.removeEventListener("storage", this.storageListener);
      this.removeItem(this.localClientStorageKey);
      this.started = false;
    }
  }
  getItem(key) {
    const value = this.storage.getItem(key);
    logDebug(LOG_TAG$a, "READ", key, value);
    return value;
  }
  setItem(key, value) {
    logDebug(LOG_TAG$a, "SET", key, value);
    this.storage.setItem(key, value);
  }
  removeItem(key) {
    logDebug(LOG_TAG$a, "REMOVE", key);
    this.storage.removeItem(key);
  }
  handleWebStorageEvent(event) {
    const storageEvent = event;
    if (storageEvent.storageArea === this.storage) {
      logDebug(LOG_TAG$a, "EVENT", storageEvent.key, storageEvent.newValue);
      if (storageEvent.key === this.localClientStorageKey) {
        logError("Received WebStorage notification for local change. Another client might have garbage-collected our state");
        return;
      }
      this.queue.enqueueRetryable(() => __async(this, null, function* () {
        if (!this.started) {
          this.earlyEvents.push(storageEvent);
          return;
        }
        if (storageEvent.key === null) {
          return;
        }
        if (this.clientStateKeyRe.test(storageEvent.key)) {
          if (storageEvent.newValue != null) {
            const clientState = this.fromWebStorageClientState(storageEvent.key, storageEvent.newValue);
            if (clientState) {
              return this.handleClientStateEvent(clientState.clientId, clientState);
            }
          } else {
            const clientId = this.fromWebStorageClientStateKey(storageEvent.key);
            return this.handleClientStateEvent(clientId, null);
          }
        } else if (this.mutationBatchKeyRe.test(storageEvent.key)) {
          if (storageEvent.newValue !== null) {
            const mutationMetadata = this.fromWebStorageMutationMetadata(storageEvent.key, storageEvent.newValue);
            if (mutationMetadata) {
              return this.handleMutationBatchEvent(mutationMetadata);
            }
          }
        } else if (this.queryTargetKeyRe.test(storageEvent.key)) {
          if (storageEvent.newValue !== null) {
            const queryTargetMetadata = this.fromWebStorageQueryTargetMetadata(storageEvent.key, storageEvent.newValue);
            if (queryTargetMetadata) {
              return this.handleQueryTargetEvent(queryTargetMetadata);
            }
          }
        } else if (storageEvent.key === this.onlineStateKey) {
          if (storageEvent.newValue !== null) {
            const onlineState = this.fromWebStorageOnlineState(storageEvent.newValue);
            if (onlineState) {
              return this.handleOnlineStateEvent(onlineState);
            }
          }
        } else if (storageEvent.key === this.sequenceNumberKey) {
          const sequenceNumber = fromWebStorageSequenceNumber(storageEvent.newValue);
          if (sequenceNumber !== ListenSequence.INVALID) {
            this.sequenceNumberHandler(sequenceNumber);
          }
        } else if (storageEvent.key === this.bundleLoadedKey) {
          const collectionGroups = this.fromWebStoreBundleLoadedState(storageEvent.newValue);
          yield Promise.all(collectionGroups.map((cg) => this.syncEngine.synchronizeWithChangedDocuments(cg)));
        }
      }));
    }
  }
  get localClientState() {
    return this.activeClients.get(this.localClientId);
  }
  persistClientState() {
    this.setItem(this.localClientStorageKey, this.localClientState.toWebStorageJSON());
  }
  persistMutationState(batchId, state, error) {
    const mutationState = new MutationMetadata(this.currentUser, batchId, state, error);
    const mutationKey = createWebStorageMutationBatchKey(this.persistenceKey, this.currentUser, batchId);
    this.setItem(mutationKey, mutationState.toWebStorageJSON());
  }
  removeMutationState(batchId) {
    const mutationKey = createWebStorageMutationBatchKey(this.persistenceKey, this.currentUser, batchId);
    this.removeItem(mutationKey);
  }
  persistOnlineState(onlineState) {
    const entry = {
      clientId: this.localClientId,
      onlineState
    };
    this.storage.setItem(this.onlineStateKey, JSON.stringify(entry));
  }
  persistQueryTargetState(targetId, state, error) {
    const targetKey = createWebStorageQueryTargetMetadataKey(this.persistenceKey, targetId);
    const targetMetadata = new QueryTargetMetadata(targetId, state, error);
    this.setItem(targetKey, targetMetadata.toWebStorageJSON());
  }
  persistBundleLoadedState(collectionGroups) {
    const json = JSON.stringify(Array.from(collectionGroups));
    this.setItem(this.bundleLoadedKey, json);
  }
  /**
   * Parses a client state key in WebStorage. Returns null if the key does not
   * match the expected key format.
   */
  fromWebStorageClientStateKey(key) {
    const match = this.clientStateKeyRe.exec(key);
    return match ? match[1] : null;
  }
  /**
   * Parses a client state in WebStorage. Returns 'null' if the value could not
   * be parsed.
   */
  fromWebStorageClientState(key, value) {
    const clientId = this.fromWebStorageClientStateKey(key);
    return RemoteClientState.fromWebStorageEntry(clientId, value);
  }
  /**
   * Parses a mutation batch state in WebStorage. Returns 'null' if the value
   * could not be parsed.
   */
  fromWebStorageMutationMetadata(key, value) {
    const match = this.mutationBatchKeyRe.exec(key);
    const batchId = Number(match[1]);
    const userId = match[2] !== void 0 ? match[2] : null;
    return MutationMetadata.fromWebStorageEntry(new User(userId), batchId, value);
  }
  /**
   * Parses a query target state from WebStorage. Returns 'null' if the value
   * could not be parsed.
   */
  fromWebStorageQueryTargetMetadata(key, value) {
    const match = this.queryTargetKeyRe.exec(key);
    const targetId = Number(match[1]);
    return QueryTargetMetadata.fromWebStorageEntry(targetId, value);
  }
  /**
   * Parses an online state from WebStorage. Returns 'null' if the value
   * could not be parsed.
   */
  fromWebStorageOnlineState(value) {
    return SharedOnlineState.fromWebStorageEntry(value);
  }
  fromWebStoreBundleLoadedState(value) {
    return JSON.parse(value);
  }
  handleMutationBatchEvent(mutationBatch) {
    return __async(this, null, function* () {
      if (mutationBatch.user.uid !== this.currentUser.uid) {
        logDebug(LOG_TAG$a, `Ignoring mutation for non-active user ${mutationBatch.user.uid}`);
        return;
      }
      return this.syncEngine.applyBatchState(mutationBatch.batchId, mutationBatch.state, mutationBatch.error);
    });
  }
  handleQueryTargetEvent(targetMetadata) {
    return this.syncEngine.applyTargetState(targetMetadata.targetId, targetMetadata.state, targetMetadata.error);
  }
  handleClientStateEvent(clientId, clientState) {
    const updatedClients = clientState ? this.activeClients.insert(clientId, clientState) : this.activeClients.remove(clientId);
    const existingTargets = this.extractActiveQueryTargets(this.activeClients);
    const newTargets = this.extractActiveQueryTargets(updatedClients);
    const addedTargets = [];
    const removedTargets = [];
    newTargets.forEach((targetId) => {
      if (!existingTargets.has(targetId)) {
        addedTargets.push(targetId);
      }
    });
    existingTargets.forEach((targetId) => {
      if (!newTargets.has(targetId)) {
        removedTargets.push(targetId);
      }
    });
    return this.syncEngine.applyActiveTargetsChange(addedTargets, removedTargets).then(() => {
      this.activeClients = updatedClients;
    });
  }
  handleOnlineStateEvent(onlineState) {
    if (this.activeClients.get(onlineState.clientId)) {
      this.onlineStateHandler(onlineState.onlineState);
    }
  }
  extractActiveQueryTargets(clients) {
    let activeTargets = targetIdSet();
    clients.forEach((kev, value) => {
      activeTargets = activeTargets.unionWith(value.activeTargetIds);
    });
    return activeTargets;
  }
};
function fromWebStorageSequenceNumber(seqString) {
  let sequenceNumber = ListenSequence.INVALID;
  if (seqString != null) {
    try {
      const parsed = JSON.parse(seqString);
      hardAssert(typeof parsed === "number");
      sequenceNumber = parsed;
    } catch (e) {
      logError(LOG_TAG$a, "Failed to read sequence number from WebStorage", e);
    }
  }
  return sequenceNumber;
}
var MemorySharedClientState = class {
  constructor() {
    this.localState = new LocalClientState();
    this.queryState = {};
    this.onlineStateHandler = null;
    this.sequenceNumberHandler = null;
  }
  addPendingMutation(batchId) {
  }
  updateMutationState(batchId, state, error) {
  }
  addLocalQueryTarget(targetId, addToActiveTargetIds = true) {
    if (addToActiveTargetIds) {
      this.localState.addQueryTarget(targetId);
    }
    return this.queryState[targetId] || "not-current";
  }
  updateQueryState(targetId, state, error) {
    this.queryState[targetId] = state;
  }
  removeLocalQueryTarget(targetId) {
    this.localState.removeQueryTarget(targetId);
  }
  isLocalQueryTarget(targetId) {
    return this.localState.activeTargetIds.has(targetId);
  }
  clearQueryState(targetId) {
    delete this.queryState[targetId];
  }
  getAllActiveQueryTargets() {
    return this.localState.activeTargetIds;
  }
  isActiveQueryTarget(targetId) {
    return this.localState.activeTargetIds.has(targetId);
  }
  start() {
    this.localState = new LocalClientState();
    return Promise.resolve();
  }
  handleUserChange(user, removedBatchIds, addedBatchIds) {
  }
  setOnlineState(onlineState) {
  }
  shutdown() {
  }
  writeSequenceNumber(sequenceNumber) {
  }
  notifyBundleLoaded(collectionGroups) {
  }
};
var NoopConnectivityMonitor = class {
  addCallback(callback) {
  }
  shutdown() {
  }
};
var StreamBridge = class {
  constructor(args) {
    this.sendFn = args.sendFn;
    this.closeFn = args.closeFn;
  }
  onConnected(callback) {
    this.wrappedOnConnected = callback;
  }
  onOpen(callback) {
    this.wrappedOnOpen = callback;
  }
  onClose(callback) {
    this.wrappedOnClose = callback;
  }
  onMessage(callback) {
    this.wrappedOnMessage = callback;
  }
  close() {
    this.closeFn();
  }
  send(msg) {
    this.sendFn(msg);
  }
  callOnConnected() {
    this.wrappedOnConnected();
  }
  callOnOpen() {
    this.wrappedOnOpen();
  }
  callOnClose(err) {
    this.wrappedOnClose(err);
  }
  callOnMessage(msg) {
    this.wrappedOnMessage(msg);
  }
};
var lastUniqueDebugId = null;
function generateInitialUniqueDebugId() {
  const minResult = 268435456;
  const maxResult = 2415919104;
  const resultRange = maxResult - minResult;
  const resultOffset = Math.round(resultRange * Math.random());
  return minResult + resultOffset;
}
function generateUniqueDebugId() {
  if (lastUniqueDebugId === null) {
    lastUniqueDebugId = generateInitialUniqueDebugId();
  } else {
    lastUniqueDebugId++;
  }
  return "0x" + lastUniqueDebugId.toString(16);
}
function nodePromise(action) {
  return new Promise((resolve, reject) => {
    action((error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}
var grpcVersion = "1.9.1";
var LOG_TAG$9 = "GrpcConnection";
var X_GOOG_API_CLIENT_VALUE = `gl-node/${process.versions.node} fire/${SDK_VERSION2} grpc/${grpcVersion}`;
function createMetadata(databasePath, authToken, appCheckToken, appId) {
  hardAssert(authToken === null || authToken.type === "OAuth");
  const metadata = new grpc.Metadata();
  if (authToken) {
    authToken.headers.forEach((value, key) => metadata.set(key, value));
  }
  if (appCheckToken) {
    appCheckToken.headers.forEach((value, key) => metadata.set(key, value));
  }
  if (appId) {
    metadata.set("X-Firebase-GMPID", appId);
  }
  metadata.set("X-Goog-Api-Client", X_GOOG_API_CLIENT_VALUE);
  metadata.set("Google-Cloud-Resource-Prefix", databasePath);
  metadata.set("x-goog-request-params", databasePath);
  return metadata;
}
var GrpcConnection = class {
  constructor(protos2, databaseInfo) {
    this.databaseInfo = databaseInfo;
    this.cachedStub = null;
    this.firestore = protos2["google"]["firestore"]["v1"];
    this.databasePath = `projects/${databaseInfo.databaseId.projectId}/databases/${databaseInfo.databaseId.database}`;
  }
  get shouldResourcePathBeIncludedInRequest() {
    return true;
  }
  ensureActiveStub() {
    if (!this.cachedStub) {
      logDebug(LOG_TAG$9, "Creating Firestore stub.");
      const credentials2 = this.databaseInfo.ssl ? grpc.credentials.createSsl() : grpc.credentials.createInsecure();
      this.cachedStub = new this.firestore.Firestore(this.databaseInfo.host, credentials2);
    }
    return this.cachedStub;
  }
  invokeRPC(rpcName, path, request, authToken, appCheckToken) {
    const streamId = generateUniqueDebugId();
    const stub = this.ensureActiveStub();
    const metadata = createMetadata(this.databasePath, authToken, appCheckToken, this.databaseInfo.appId);
    const jsonRequest = Object.assign({
      database: this.databasePath
    }, request);
    return nodePromise((callback) => {
      logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} invoked with request:`, request);
      return stub[rpcName](jsonRequest, metadata, (grpcError, value) => {
        if (grpcError) {
          logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} failed with error:`, grpcError);
          callback(new FirestoreError(mapCodeFromRpcCode(grpcError.code), grpcError.message));
        } else {
          logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} completed with response:`, value);
          callback(void 0, value);
        }
      });
    });
  }
  invokeStreamingRPC(rpcName, path, request, authToken, appCheckToken, expectedResponseCount) {
    const streamId = generateUniqueDebugId();
    const results = [];
    const responseDeferred = new Deferred();
    logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} invoked (streaming) with request:`, request);
    const stub = this.ensureActiveStub();
    const metadata = createMetadata(this.databasePath, authToken, appCheckToken, this.databaseInfo.appId);
    const jsonRequest = Object.assign(Object.assign({}, request), {
      database: this.databasePath
    });
    const stream = stub[rpcName](jsonRequest, metadata);
    let callbackFired = false;
    stream.on("data", (response) => {
      logDebug(LOG_TAG$9, `RPC ${rpcName} ${streamId} received result:`, response);
      results.push(response);
      if (expectedResponseCount !== void 0 && results.length === expectedResponseCount) {
        callbackFired = true;
        responseDeferred.resolve(results);
      }
    });
    stream.on("end", () => {
      logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} completed.`);
      if (!callbackFired) {
        callbackFired = true;
        responseDeferred.resolve(results);
      }
    });
    stream.on("error", (grpcError) => {
      logDebug(LOG_TAG$9, `RPC '${rpcName}' ${streamId} failed with error:`, grpcError);
      const code = mapCodeFromRpcCode(grpcError.code);
      responseDeferred.reject(new FirestoreError(code, grpcError.message));
    });
    return responseDeferred.promise;
  }
  // TODO(mikelehen): This "method" is a monster. Should be refactored.
  openStream(rpcName, authToken, appCheckToken) {
    const streamId = generateUniqueDebugId();
    const stub = this.ensureActiveStub();
    const metadata = createMetadata(this.databasePath, authToken, appCheckToken, this.databaseInfo.appId);
    const grpcStream = stub[rpcName](metadata);
    let closed = false;
    const close = (err) => {
      if (!closed) {
        closed = true;
        stream.callOnClose(err);
        grpcStream.end();
      }
    };
    const stream = new StreamBridge({
      sendFn: (msg) => {
        if (!closed) {
          logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} sending:`, msg);
          try {
            grpcStream.write(msg);
          } catch (e) {
            logError("Failure sending:", msg);
            logError("Error:", e);
            throw e;
          }
        } else {
          logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} not sending because gRPC stream is closed:`, msg);
        }
      },
      closeFn: () => {
        logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} closed locally via close().`);
        close();
      }
    });
    let onConnectedSent = false;
    grpcStream.on("data", (msg) => {
      if (!closed) {
        logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} received:`, msg);
        if (!onConnectedSent) {
          stream.callOnConnected();
          onConnectedSent = true;
        }
        stream.callOnMessage(msg);
      }
    });
    grpcStream.on("end", () => {
      logDebug(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} ended.`);
      close();
    });
    grpcStream.on("error", (grpcError) => {
      if (!closed) {
        logWarn(LOG_TAG$9, `RPC '${rpcName}' stream ${streamId} error. Code:`, grpcError.code, "Message:", grpcError.message);
        const code = mapCodeFromRpcCode(grpcError.code);
        close(new FirestoreError(code, grpcError.message));
      }
    });
    logDebug(LOG_TAG$9, `Opening RPC '${rpcName}' stream ${streamId} to ${this.databaseInfo.host}`);
    setTimeout(() => {
      stream.callOnOpen();
    }, 0);
    return stream;
  }
  /**
   * Closes and cleans up any resources associated with the GrpcConnection.
   * If a gRPC client has been generated for this connection, the gRPC client
   * is closed. Failure to call terminate on a GrpcConnection can result
   * in leaked resources of the gRPC client.
   */
  terminate() {
    if (this.cachedStub) {
      this.cachedStub.close();
      this.cachedStub = void 0;
    }
  }
};
var nested = {
  google: {
    nested: {
      protobuf: {
        options: {
          csharp_namespace: "Google.Protobuf.WellKnownTypes",
          go_package: "github.com/golang/protobuf/ptypes/wrappers",
          java_package: "com.google.protobuf",
          java_outer_classname: "WrappersProto",
          java_multiple_files: true,
          objc_class_prefix: "GPB",
          cc_enable_arenas: true,
          optimize_for: "SPEED"
        },
        nested: {
          Timestamp: {
            fields: {
              seconds: {
                type: "int64",
                id: 1
              },
              nanos: {
                type: "int32",
                id: 2
              }
            }
          },
          FileDescriptorSet: {
            fields: {
              file: {
                rule: "repeated",
                type: "FileDescriptorProto",
                id: 1
              }
            }
          },
          FileDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              "package": {
                type: "string",
                id: 2
              },
              dependency: {
                rule: "repeated",
                type: "string",
                id: 3
              },
              publicDependency: {
                rule: "repeated",
                type: "int32",
                id: 10,
                options: {
                  packed: false
                }
              },
              weakDependency: {
                rule: "repeated",
                type: "int32",
                id: 11,
                options: {
                  packed: false
                }
              },
              messageType: {
                rule: "repeated",
                type: "DescriptorProto",
                id: 4
              },
              enumType: {
                rule: "repeated",
                type: "EnumDescriptorProto",
                id: 5
              },
              service: {
                rule: "repeated",
                type: "ServiceDescriptorProto",
                id: 6
              },
              extension: {
                rule: "repeated",
                type: "FieldDescriptorProto",
                id: 7
              },
              options: {
                type: "FileOptions",
                id: 8
              },
              sourceCodeInfo: {
                type: "SourceCodeInfo",
                id: 9
              },
              syntax: {
                type: "string",
                id: 12
              }
            }
          },
          DescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              field: {
                rule: "repeated",
                type: "FieldDescriptorProto",
                id: 2
              },
              extension: {
                rule: "repeated",
                type: "FieldDescriptorProto",
                id: 6
              },
              nestedType: {
                rule: "repeated",
                type: "DescriptorProto",
                id: 3
              },
              enumType: {
                rule: "repeated",
                type: "EnumDescriptorProto",
                id: 4
              },
              extensionRange: {
                rule: "repeated",
                type: "ExtensionRange",
                id: 5
              },
              oneofDecl: {
                rule: "repeated",
                type: "OneofDescriptorProto",
                id: 8
              },
              options: {
                type: "MessageOptions",
                id: 7
              },
              reservedRange: {
                rule: "repeated",
                type: "ReservedRange",
                id: 9
              },
              reservedName: {
                rule: "repeated",
                type: "string",
                id: 10
              }
            },
            nested: {
              ExtensionRange: {
                fields: {
                  start: {
                    type: "int32",
                    id: 1
                  },
                  end: {
                    type: "int32",
                    id: 2
                  }
                }
              },
              ReservedRange: {
                fields: {
                  start: {
                    type: "int32",
                    id: 1
                  },
                  end: {
                    type: "int32",
                    id: 2
                  }
                }
              }
            }
          },
          FieldDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              number: {
                type: "int32",
                id: 3
              },
              label: {
                type: "Label",
                id: 4
              },
              type: {
                type: "Type",
                id: 5
              },
              typeName: {
                type: "string",
                id: 6
              },
              extendee: {
                type: "string",
                id: 2
              },
              defaultValue: {
                type: "string",
                id: 7
              },
              oneofIndex: {
                type: "int32",
                id: 9
              },
              jsonName: {
                type: "string",
                id: 10
              },
              options: {
                type: "FieldOptions",
                id: 8
              }
            },
            nested: {
              Type: {
                values: {
                  TYPE_DOUBLE: 1,
                  TYPE_FLOAT: 2,
                  TYPE_INT64: 3,
                  TYPE_UINT64: 4,
                  TYPE_INT32: 5,
                  TYPE_FIXED64: 6,
                  TYPE_FIXED32: 7,
                  TYPE_BOOL: 8,
                  TYPE_STRING: 9,
                  TYPE_GROUP: 10,
                  TYPE_MESSAGE: 11,
                  TYPE_BYTES: 12,
                  TYPE_UINT32: 13,
                  TYPE_ENUM: 14,
                  TYPE_SFIXED32: 15,
                  TYPE_SFIXED64: 16,
                  TYPE_SINT32: 17,
                  TYPE_SINT64: 18
                }
              },
              Label: {
                values: {
                  LABEL_OPTIONAL: 1,
                  LABEL_REQUIRED: 2,
                  LABEL_REPEATED: 3
                }
              }
            }
          },
          OneofDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              options: {
                type: "OneofOptions",
                id: 2
              }
            }
          },
          EnumDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              value: {
                rule: "repeated",
                type: "EnumValueDescriptorProto",
                id: 2
              },
              options: {
                type: "EnumOptions",
                id: 3
              }
            }
          },
          EnumValueDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              number: {
                type: "int32",
                id: 2
              },
              options: {
                type: "EnumValueOptions",
                id: 3
              }
            }
          },
          ServiceDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              method: {
                rule: "repeated",
                type: "MethodDescriptorProto",
                id: 2
              },
              options: {
                type: "ServiceOptions",
                id: 3
              }
            }
          },
          MethodDescriptorProto: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              inputType: {
                type: "string",
                id: 2
              },
              outputType: {
                type: "string",
                id: 3
              },
              options: {
                type: "MethodOptions",
                id: 4
              },
              clientStreaming: {
                type: "bool",
                id: 5
              },
              serverStreaming: {
                type: "bool",
                id: 6
              }
            }
          },
          FileOptions: {
            fields: {
              javaPackage: {
                type: "string",
                id: 1
              },
              javaOuterClassname: {
                type: "string",
                id: 8
              },
              javaMultipleFiles: {
                type: "bool",
                id: 10
              },
              javaGenerateEqualsAndHash: {
                type: "bool",
                id: 20,
                options: {
                  deprecated: true
                }
              },
              javaStringCheckUtf8: {
                type: "bool",
                id: 27
              },
              optimizeFor: {
                type: "OptimizeMode",
                id: 9,
                options: {
                  "default": "SPEED"
                }
              },
              goPackage: {
                type: "string",
                id: 11
              },
              ccGenericServices: {
                type: "bool",
                id: 16
              },
              javaGenericServices: {
                type: "bool",
                id: 17
              },
              pyGenericServices: {
                type: "bool",
                id: 18
              },
              deprecated: {
                type: "bool",
                id: 23
              },
              ccEnableArenas: {
                type: "bool",
                id: 31
              },
              objcClassPrefix: {
                type: "string",
                id: 36
              },
              csharpNamespace: {
                type: "string",
                id: 37
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [[1e3, 536870911]],
            reserved: [[38, 38]],
            nested: {
              OptimizeMode: {
                values: {
                  SPEED: 1,
                  CODE_SIZE: 2,
                  LITE_RUNTIME: 3
                }
              }
            }
          },
          MessageOptions: {
            fields: {
              messageSetWireFormat: {
                type: "bool",
                id: 1
              },
              noStandardDescriptorAccessor: {
                type: "bool",
                id: 2
              },
              deprecated: {
                type: "bool",
                id: 3
              },
              mapEntry: {
                type: "bool",
                id: 7
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [[1e3, 536870911]],
            reserved: [[8, 8]]
          },
          FieldOptions: {
            fields: {
              ctype: {
                type: "CType",
                id: 1,
                options: {
                  "default": "STRING"
                }
              },
              packed: {
                type: "bool",
                id: 2
              },
              jstype: {
                type: "JSType",
                id: 6,
                options: {
                  "default": "JS_NORMAL"
                }
              },
              lazy: {
                type: "bool",
                id: 5
              },
              deprecated: {
                type: "bool",
                id: 3
              },
              weak: {
                type: "bool",
                id: 10
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [[1e3, 536870911]],
            reserved: [[4, 4]],
            nested: {
              CType: {
                values: {
                  STRING: 0,
                  CORD: 1,
                  STRING_PIECE: 2
                }
              },
              JSType: {
                values: {
                  JS_NORMAL: 0,
                  JS_STRING: 1,
                  JS_NUMBER: 2
                }
              }
            }
          },
          OneofOptions: {
            fields: {
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [[1e3, 536870911]]
          },
          EnumOptions: {
            fields: {
              allowAlias: {
                type: "bool",
                id: 2
              },
              deprecated: {
                type: "bool",
                id: 3
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [[1e3, 536870911]]
          },
          EnumValueOptions: {
            fields: {
              deprecated: {
                type: "bool",
                id: 1
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [[1e3, 536870911]]
          },
          ServiceOptions: {
            fields: {
              deprecated: {
                type: "bool",
                id: 33
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [[1e3, 536870911]]
          },
          MethodOptions: {
            fields: {
              deprecated: {
                type: "bool",
                id: 33
              },
              uninterpretedOption: {
                rule: "repeated",
                type: "UninterpretedOption",
                id: 999
              }
            },
            extensions: [[1e3, 536870911]]
          },
          UninterpretedOption: {
            fields: {
              name: {
                rule: "repeated",
                type: "NamePart",
                id: 2
              },
              identifierValue: {
                type: "string",
                id: 3
              },
              positiveIntValue: {
                type: "uint64",
                id: 4
              },
              negativeIntValue: {
                type: "int64",
                id: 5
              },
              doubleValue: {
                type: "double",
                id: 6
              },
              stringValue: {
                type: "bytes",
                id: 7
              },
              aggregateValue: {
                type: "string",
                id: 8
              }
            },
            nested: {
              NamePart: {
                fields: {
                  namePart: {
                    rule: "required",
                    type: "string",
                    id: 1
                  },
                  isExtension: {
                    rule: "required",
                    type: "bool",
                    id: 2
                  }
                }
              }
            }
          },
          SourceCodeInfo: {
            fields: {
              location: {
                rule: "repeated",
                type: "Location",
                id: 1
              }
            },
            nested: {
              Location: {
                fields: {
                  path: {
                    rule: "repeated",
                    type: "int32",
                    id: 1
                  },
                  span: {
                    rule: "repeated",
                    type: "int32",
                    id: 2
                  },
                  leadingComments: {
                    type: "string",
                    id: 3
                  },
                  trailingComments: {
                    type: "string",
                    id: 4
                  },
                  leadingDetachedComments: {
                    rule: "repeated",
                    type: "string",
                    id: 6
                  }
                }
              }
            }
          },
          GeneratedCodeInfo: {
            fields: {
              annotation: {
                rule: "repeated",
                type: "Annotation",
                id: 1
              }
            },
            nested: {
              Annotation: {
                fields: {
                  path: {
                    rule: "repeated",
                    type: "int32",
                    id: 1
                  },
                  sourceFile: {
                    type: "string",
                    id: 2
                  },
                  begin: {
                    type: "int32",
                    id: 3
                  },
                  end: {
                    type: "int32",
                    id: 4
                  }
                }
              }
            }
          },
          Struct: {
            fields: {
              fields: {
                keyType: "string",
                type: "Value",
                id: 1
              }
            }
          },
          Value: {
            oneofs: {
              kind: {
                oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]
              }
            },
            fields: {
              nullValue: {
                type: "NullValue",
                id: 1
              },
              numberValue: {
                type: "double",
                id: 2
              },
              stringValue: {
                type: "string",
                id: 3
              },
              boolValue: {
                type: "bool",
                id: 4
              },
              structValue: {
                type: "Struct",
                id: 5
              },
              listValue: {
                type: "ListValue",
                id: 6
              }
            }
          },
          NullValue: {
            values: {
              NULL_VALUE: 0
            }
          },
          ListValue: {
            fields: {
              values: {
                rule: "repeated",
                type: "Value",
                id: 1
              }
            }
          },
          Empty: {
            fields: {}
          },
          DoubleValue: {
            fields: {
              value: {
                type: "double",
                id: 1
              }
            }
          },
          FloatValue: {
            fields: {
              value: {
                type: "float",
                id: 1
              }
            }
          },
          Int64Value: {
            fields: {
              value: {
                type: "int64",
                id: 1
              }
            }
          },
          UInt64Value: {
            fields: {
              value: {
                type: "uint64",
                id: 1
              }
            }
          },
          Int32Value: {
            fields: {
              value: {
                type: "int32",
                id: 1
              }
            }
          },
          UInt32Value: {
            fields: {
              value: {
                type: "uint32",
                id: 1
              }
            }
          },
          BoolValue: {
            fields: {
              value: {
                type: "bool",
                id: 1
              }
            }
          },
          StringValue: {
            fields: {
              value: {
                type: "string",
                id: 1
              }
            }
          },
          BytesValue: {
            fields: {
              value: {
                type: "bytes",
                id: 1
              }
            }
          },
          Any: {
            fields: {
              typeUrl: {
                type: "string",
                id: 1
              },
              value: {
                type: "bytes",
                id: 2
              }
            }
          }
        }
      },
      firestore: {
        nested: {
          v1: {
            options: {
              csharp_namespace: "Google.Cloud.Firestore.V1",
              go_package: "google.golang.org/genproto/googleapis/firestore/v1;firestore",
              java_multiple_files: true,
              java_outer_classname: "WriteProto",
              java_package: "com.google.firestore.v1",
              objc_class_prefix: "GCFS",
              php_namespace: "Google\\Cloud\\Firestore\\V1",
              ruby_package: "Google::Cloud::Firestore::V1"
            },
            nested: {
              AggregationResult: {
                fields: {
                  aggregateFields: {
                    keyType: "string",
                    type: "Value",
                    id: 2
                  }
                }
              },
              BitSequence: {
                fields: {
                  bitmap: {
                    type: "bytes",
                    id: 1
                  },
                  padding: {
                    type: "int32",
                    id: 2
                  }
                }
              },
              BloomFilter: {
                fields: {
                  bits: {
                    type: "BitSequence",
                    id: 1
                  },
                  hashCount: {
                    type: "int32",
                    id: 2
                  }
                }
              },
              DocumentMask: {
                fields: {
                  fieldPaths: {
                    rule: "repeated",
                    type: "string",
                    id: 1
                  }
                }
              },
              Precondition: {
                oneofs: {
                  conditionType: {
                    oneof: ["exists", "updateTime"]
                  }
                },
                fields: {
                  exists: {
                    type: "bool",
                    id: 1
                  },
                  updateTime: {
                    type: "google.protobuf.Timestamp",
                    id: 2
                  }
                }
              },
              TransactionOptions: {
                oneofs: {
                  mode: {
                    oneof: ["readOnly", "readWrite"]
                  }
                },
                fields: {
                  readOnly: {
                    type: "ReadOnly",
                    id: 2
                  },
                  readWrite: {
                    type: "ReadWrite",
                    id: 3
                  }
                },
                nested: {
                  ReadWrite: {
                    fields: {
                      retryTransaction: {
                        type: "bytes",
                        id: 1
                      }
                    }
                  },
                  ReadOnly: {
                    oneofs: {
                      consistencySelector: {
                        oneof: ["readTime"]
                      }
                    },
                    fields: {
                      readTime: {
                        type: "google.protobuf.Timestamp",
                        id: 2
                      }
                    }
                  }
                }
              },
              Document: {
                fields: {
                  name: {
                    type: "string",
                    id: 1
                  },
                  fields: {
                    keyType: "string",
                    type: "Value",
                    id: 2
                  },
                  createTime: {
                    type: "google.protobuf.Timestamp",
                    id: 3
                  },
                  updateTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              Value: {
                oneofs: {
                  valueType: {
                    oneof: ["nullValue", "booleanValue", "integerValue", "doubleValue", "timestampValue", "stringValue", "bytesValue", "referenceValue", "geoPointValue", "arrayValue", "mapValue"]
                  }
                },
                fields: {
                  nullValue: {
                    type: "google.protobuf.NullValue",
                    id: 11
                  },
                  booleanValue: {
                    type: "bool",
                    id: 1
                  },
                  integerValue: {
                    type: "int64",
                    id: 2
                  },
                  doubleValue: {
                    type: "double",
                    id: 3
                  },
                  timestampValue: {
                    type: "google.protobuf.Timestamp",
                    id: 10
                  },
                  stringValue: {
                    type: "string",
                    id: 17
                  },
                  bytesValue: {
                    type: "bytes",
                    id: 18
                  },
                  referenceValue: {
                    type: "string",
                    id: 5
                  },
                  geoPointValue: {
                    type: "google.type.LatLng",
                    id: 8
                  },
                  arrayValue: {
                    type: "ArrayValue",
                    id: 9
                  },
                  mapValue: {
                    type: "MapValue",
                    id: 6
                  }
                }
              },
              ArrayValue: {
                fields: {
                  values: {
                    rule: "repeated",
                    type: "Value",
                    id: 1
                  }
                }
              },
              MapValue: {
                fields: {
                  fields: {
                    keyType: "string",
                    type: "Value",
                    id: 1
                  }
                }
              },
              Firestore: {
                options: {
                  "(google.api.default_host)": "firestore.googleapis.com",
                  "(google.api.oauth_scopes)": "https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/datastore"
                },
                methods: {
                  GetDocument: {
                    requestType: "GetDocumentRequest",
                    responseType: "Document",
                    options: {
                      "(google.api.http).get": "/v1/{name=projects/*/databases/*/documents/*/**}"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        get: "/v1/{name=projects/*/databases/*/documents/*/**}"
                      }
                    }]
                  },
                  ListDocuments: {
                    requestType: "ListDocumentsRequest",
                    responseType: "ListDocumentsResponse",
                    options: {
                      "(google.api.http).get": "/v1/{parent=projects/*/databases/*/documents/*/**}/{collection_id}"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        get: "/v1/{parent=projects/*/databases/*/documents/*/**}/{collection_id}"
                      }
                    }]
                  },
                  UpdateDocument: {
                    requestType: "UpdateDocumentRequest",
                    responseType: "Document",
                    options: {
                      "(google.api.http).patch": "/v1/{document.name=projects/*/databases/*/documents/*/**}",
                      "(google.api.http).body": "document",
                      "(google.api.method_signature)": "document,update_mask"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        patch: "/v1/{document.name=projects/*/databases/*/documents/*/**}",
                        body: "document"
                      }
                    }, {
                      "(google.api.method_signature)": "document,update_mask"
                    }]
                  },
                  DeleteDocument: {
                    requestType: "DeleteDocumentRequest",
                    responseType: "google.protobuf.Empty",
                    options: {
                      "(google.api.http).delete": "/v1/{name=projects/*/databases/*/documents/*/**}",
                      "(google.api.method_signature)": "name"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        "delete": "/v1/{name=projects/*/databases/*/documents/*/**}"
                      }
                    }, {
                      "(google.api.method_signature)": "name"
                    }]
                  },
                  BatchGetDocuments: {
                    requestType: "BatchGetDocumentsRequest",
                    responseType: "BatchGetDocumentsResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:batchGet",
                      "(google.api.http).body": "*"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{database=projects/*/databases/*}/documents:batchGet",
                        body: "*"
                      }
                    }]
                  },
                  BeginTransaction: {
                    requestType: "BeginTransactionRequest",
                    responseType: "BeginTransactionResponse",
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:beginTransaction",
                      "(google.api.http).body": "*",
                      "(google.api.method_signature)": "database"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{database=projects/*/databases/*}/documents:beginTransaction",
                        body: "*"
                      }
                    }, {
                      "(google.api.method_signature)": "database"
                    }]
                  },
                  Commit: {
                    requestType: "CommitRequest",
                    responseType: "CommitResponse",
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:commit",
                      "(google.api.http).body": "*",
                      "(google.api.method_signature)": "database,writes"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{database=projects/*/databases/*}/documents:commit",
                        body: "*"
                      }
                    }, {
                      "(google.api.method_signature)": "database,writes"
                    }]
                  },
                  Rollback: {
                    requestType: "RollbackRequest",
                    responseType: "google.protobuf.Empty",
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:rollback",
                      "(google.api.http).body": "*",
                      "(google.api.method_signature)": "database,transaction"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{database=projects/*/databases/*}/documents:rollback",
                        body: "*"
                      }
                    }, {
                      "(google.api.method_signature)": "database,transaction"
                    }]
                  },
                  RunQuery: {
                    requestType: "RunQueryRequest",
                    responseType: "RunQueryResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents}:runQuery",
                      "(google.api.http).body": "*",
                      "(google.api.http).additional_bindings.post": "/v1/{parent=projects/*/databases/*/documents/*/**}:runQuery",
                      "(google.api.http).additional_bindings.body": "*"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{parent=projects/*/databases/*/documents}:runQuery",
                        body: "*",
                        additional_bindings: {
                          post: "/v1/{parent=projects/*/databases/*/documents/*/**}:runQuery",
                          body: "*"
                        }
                      }
                    }]
                  },
                  RunAggregationQuery: {
                    requestType: "RunAggregationQueryRequest",
                    responseType: "RunAggregationQueryResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery",
                      "(google.api.http).body": "*",
                      "(google.api.http).additional_bindings.post": "/v1/{parent=projects/*/databases/*/documents/*/**}:runAggregationQuery",
                      "(google.api.http).additional_bindings.body": "*"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery",
                        body: "*",
                        additional_bindings: {
                          post: "/v1/{parent=projects/*/databases/*/documents/*/**}:runAggregationQuery",
                          body: "*"
                        }
                      }
                    }]
                  },
                  PartitionQuery: {
                    requestType: "PartitionQueryRequest",
                    responseType: "PartitionQueryResponse",
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents}:partitionQuery",
                      "(google.api.http).body": "*",
                      "(google.api.http).additional_bindings.post": "/v1/{parent=projects/*/databases/*/documents/*/**}:partitionQuery",
                      "(google.api.http).additional_bindings.body": "*"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{parent=projects/*/databases/*/documents}:partitionQuery",
                        body: "*",
                        additional_bindings: {
                          post: "/v1/{parent=projects/*/databases/*/documents/*/**}:partitionQuery",
                          body: "*"
                        }
                      }
                    }]
                  },
                  Write: {
                    requestType: "WriteRequest",
                    requestStream: true,
                    responseType: "WriteResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:write",
                      "(google.api.http).body": "*"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{database=projects/*/databases/*}/documents:write",
                        body: "*"
                      }
                    }]
                  },
                  Listen: {
                    requestType: "ListenRequest",
                    requestStream: true,
                    responseType: "ListenResponse",
                    responseStream: true,
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:listen",
                      "(google.api.http).body": "*"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{database=projects/*/databases/*}/documents:listen",
                        body: "*"
                      }
                    }]
                  },
                  ListCollectionIds: {
                    requestType: "ListCollectionIdsRequest",
                    responseType: "ListCollectionIdsResponse",
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents}:listCollectionIds",
                      "(google.api.http).body": "*",
                      "(google.api.http).additional_bindings.post": "/v1/{parent=projects/*/databases/*/documents/*/**}:listCollectionIds",
                      "(google.api.http).additional_bindings.body": "*",
                      "(google.api.method_signature)": "parent"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{parent=projects/*/databases/*/documents}:listCollectionIds",
                        body: "*",
                        additional_bindings: {
                          post: "/v1/{parent=projects/*/databases/*/documents/*/**}:listCollectionIds",
                          body: "*"
                        }
                      }
                    }, {
                      "(google.api.method_signature)": "parent"
                    }]
                  },
                  BatchWrite: {
                    requestType: "BatchWriteRequest",
                    responseType: "BatchWriteResponse",
                    options: {
                      "(google.api.http).post": "/v1/{database=projects/*/databases/*}/documents:batchWrite",
                      "(google.api.http).body": "*"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{database=projects/*/databases/*}/documents:batchWrite",
                        body: "*"
                      }
                    }]
                  },
                  CreateDocument: {
                    requestType: "CreateDocumentRequest",
                    responseType: "Document",
                    options: {
                      "(google.api.http).post": "/v1/{parent=projects/*/databases/*/documents/**}/{collection_id}",
                      "(google.api.http).body": "document"
                    },
                    parsedOptions: [{
                      "(google.api.http)": {
                        post: "/v1/{parent=projects/*/databases/*/documents/**}/{collection_id}",
                        body: "document"
                      }
                    }]
                  }
                }
              },
              GetDocumentRequest: {
                oneofs: {
                  consistencySelector: {
                    oneof: ["transaction", "readTime"]
                  }
                },
                fields: {
                  name: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 3
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 5
                  }
                }
              },
              ListDocumentsRequest: {
                oneofs: {
                  consistencySelector: {
                    oneof: ["transaction", "readTime"]
                  }
                },
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  collectionId: {
                    type: "string",
                    id: 2,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  pageSize: {
                    type: "int32",
                    id: 3
                  },
                  pageToken: {
                    type: "string",
                    id: 4
                  },
                  orderBy: {
                    type: "string",
                    id: 6
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 7
                  },
                  transaction: {
                    type: "bytes",
                    id: 8
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 10
                  },
                  showMissing: {
                    type: "bool",
                    id: 12
                  }
                }
              },
              ListDocumentsResponse: {
                fields: {
                  documents: {
                    rule: "repeated",
                    type: "Document",
                    id: 1
                  },
                  nextPageToken: {
                    type: "string",
                    id: 2
                  }
                }
              },
              CreateDocumentRequest: {
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  collectionId: {
                    type: "string",
                    id: 2,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  documentId: {
                    type: "string",
                    id: 3
                  },
                  document: {
                    type: "Document",
                    id: 4,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 5
                  }
                }
              },
              UpdateDocumentRequest: {
                fields: {
                  document: {
                    type: "Document",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  updateMask: {
                    type: "DocumentMask",
                    id: 2
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 3
                  },
                  currentDocument: {
                    type: "Precondition",
                    id: 4
                  }
                }
              },
              DeleteDocumentRequest: {
                fields: {
                  name: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  currentDocument: {
                    type: "Precondition",
                    id: 2
                  }
                }
              },
              BatchGetDocumentsRequest: {
                oneofs: {
                  consistencySelector: {
                    oneof: ["transaction", "newTransaction", "readTime"]
                  }
                },
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  documents: {
                    rule: "repeated",
                    type: "string",
                    id: 2
                  },
                  mask: {
                    type: "DocumentMask",
                    id: 3
                  },
                  transaction: {
                    type: "bytes",
                    id: 4
                  },
                  newTransaction: {
                    type: "TransactionOptions",
                    id: 5
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 7
                  }
                }
              },
              BatchGetDocumentsResponse: {
                oneofs: {
                  result: {
                    oneof: ["found", "missing"]
                  }
                },
                fields: {
                  found: {
                    type: "Document",
                    id: 1
                  },
                  missing: {
                    type: "string",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 3
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              BeginTransactionRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  options: {
                    type: "TransactionOptions",
                    id: 2
                  }
                }
              },
              BeginTransactionResponse: {
                fields: {
                  transaction: {
                    type: "bytes",
                    id: 1
                  }
                }
              },
              CommitRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  writes: {
                    rule: "repeated",
                    type: "Write",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 3
                  }
                }
              },
              CommitResponse: {
                fields: {
                  writeResults: {
                    rule: "repeated",
                    type: "WriteResult",
                    id: 1
                  },
                  commitTime: {
                    type: "google.protobuf.Timestamp",
                    id: 2
                  }
                }
              },
              RollbackRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  transaction: {
                    type: "bytes",
                    id: 2,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  }
                }
              },
              RunQueryRequest: {
                oneofs: {
                  queryType: {
                    oneof: ["structuredQuery"]
                  },
                  consistencySelector: {
                    oneof: ["transaction", "newTransaction", "readTime"]
                  }
                },
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  structuredQuery: {
                    type: "StructuredQuery",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 5
                  },
                  newTransaction: {
                    type: "TransactionOptions",
                    id: 6
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 7
                  }
                }
              },
              RunQueryResponse: {
                fields: {
                  transaction: {
                    type: "bytes",
                    id: 2
                  },
                  document: {
                    type: "Document",
                    id: 1
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 3
                  },
                  skippedResults: {
                    type: "int32",
                    id: 4
                  }
                }
              },
              RunAggregationQueryRequest: {
                oneofs: {
                  queryType: {
                    oneof: ["structuredAggregationQuery"]
                  },
                  consistencySelector: {
                    oneof: ["transaction", "newTransaction", "readTime"]
                  }
                },
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  structuredAggregationQuery: {
                    type: "StructuredAggregationQuery",
                    id: 2
                  },
                  transaction: {
                    type: "bytes",
                    id: 4
                  },
                  newTransaction: {
                    type: "TransactionOptions",
                    id: 5
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 6
                  }
                }
              },
              RunAggregationQueryResponse: {
                fields: {
                  result: {
                    type: "AggregationResult",
                    id: 1
                  },
                  transaction: {
                    type: "bytes",
                    id: 2
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 3
                  }
                }
              },
              PartitionQueryRequest: {
                oneofs: {
                  queryType: {
                    oneof: ["structuredQuery"]
                  }
                },
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  structuredQuery: {
                    type: "StructuredQuery",
                    id: 2
                  },
                  partitionCount: {
                    type: "int64",
                    id: 3
                  },
                  pageToken: {
                    type: "string",
                    id: 4
                  },
                  pageSize: {
                    type: "int32",
                    id: 5
                  }
                }
              },
              PartitionQueryResponse: {
                fields: {
                  partitions: {
                    rule: "repeated",
                    type: "Cursor",
                    id: 1
                  },
                  nextPageToken: {
                    type: "string",
                    id: 2
                  }
                }
              },
              WriteRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  streamId: {
                    type: "string",
                    id: 2
                  },
                  writes: {
                    rule: "repeated",
                    type: "Write",
                    id: 3
                  },
                  streamToken: {
                    type: "bytes",
                    id: 4
                  },
                  labels: {
                    keyType: "string",
                    type: "string",
                    id: 5
                  }
                }
              },
              WriteResponse: {
                fields: {
                  streamId: {
                    type: "string",
                    id: 1
                  },
                  streamToken: {
                    type: "bytes",
                    id: 2
                  },
                  writeResults: {
                    rule: "repeated",
                    type: "WriteResult",
                    id: 3
                  },
                  commitTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              ListenRequest: {
                oneofs: {
                  targetChange: {
                    oneof: ["addTarget", "removeTarget"]
                  }
                },
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  addTarget: {
                    type: "Target",
                    id: 2
                  },
                  removeTarget: {
                    type: "int32",
                    id: 3
                  },
                  labels: {
                    keyType: "string",
                    type: "string",
                    id: 4
                  }
                }
              },
              ListenResponse: {
                oneofs: {
                  responseType: {
                    oneof: ["targetChange", "documentChange", "documentDelete", "documentRemove", "filter"]
                  }
                },
                fields: {
                  targetChange: {
                    type: "TargetChange",
                    id: 2
                  },
                  documentChange: {
                    type: "DocumentChange",
                    id: 3
                  },
                  documentDelete: {
                    type: "DocumentDelete",
                    id: 4
                  },
                  documentRemove: {
                    type: "DocumentRemove",
                    id: 6
                  },
                  filter: {
                    type: "ExistenceFilter",
                    id: 5
                  }
                }
              },
              Target: {
                oneofs: {
                  targetType: {
                    oneof: ["query", "documents"]
                  },
                  resumeType: {
                    oneof: ["resumeToken", "readTime"]
                  }
                },
                fields: {
                  query: {
                    type: "QueryTarget",
                    id: 2
                  },
                  documents: {
                    type: "DocumentsTarget",
                    id: 3
                  },
                  resumeToken: {
                    type: "bytes",
                    id: 4
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 11
                  },
                  targetId: {
                    type: "int32",
                    id: 5
                  },
                  once: {
                    type: "bool",
                    id: 6
                  },
                  expectedCount: {
                    type: "google.protobuf.Int32Value",
                    id: 12
                  }
                },
                nested: {
                  DocumentsTarget: {
                    fields: {
                      documents: {
                        rule: "repeated",
                        type: "string",
                        id: 2
                      }
                    }
                  },
                  QueryTarget: {
                    oneofs: {
                      queryType: {
                        oneof: ["structuredQuery"]
                      }
                    },
                    fields: {
                      parent: {
                        type: "string",
                        id: 1
                      },
                      structuredQuery: {
                        type: "StructuredQuery",
                        id: 2
                      }
                    }
                  }
                }
              },
              TargetChange: {
                fields: {
                  targetChangeType: {
                    type: "TargetChangeType",
                    id: 1
                  },
                  targetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 2
                  },
                  cause: {
                    type: "google.rpc.Status",
                    id: 3
                  },
                  resumeToken: {
                    type: "bytes",
                    id: 4
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 6
                  }
                },
                nested: {
                  TargetChangeType: {
                    values: {
                      NO_CHANGE: 0,
                      ADD: 1,
                      REMOVE: 2,
                      CURRENT: 3,
                      RESET: 4
                    }
                  }
                }
              },
              ListCollectionIdsRequest: {
                fields: {
                  parent: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  pageSize: {
                    type: "int32",
                    id: 2
                  },
                  pageToken: {
                    type: "string",
                    id: 3
                  }
                }
              },
              ListCollectionIdsResponse: {
                fields: {
                  collectionIds: {
                    rule: "repeated",
                    type: "string",
                    id: 1
                  },
                  nextPageToken: {
                    type: "string",
                    id: 2
                  }
                }
              },
              BatchWriteRequest: {
                fields: {
                  database: {
                    type: "string",
                    id: 1,
                    options: {
                      "(google.api.field_behavior)": "REQUIRED"
                    }
                  },
                  writes: {
                    rule: "repeated",
                    type: "Write",
                    id: 2
                  },
                  labels: {
                    keyType: "string",
                    type: "string",
                    id: 3
                  }
                }
              },
              BatchWriteResponse: {
                fields: {
                  writeResults: {
                    rule: "repeated",
                    type: "WriteResult",
                    id: 1
                  },
                  status: {
                    rule: "repeated",
                    type: "google.rpc.Status",
                    id: 2
                  }
                }
              },
              StructuredQuery: {
                fields: {
                  select: {
                    type: "Projection",
                    id: 1
                  },
                  from: {
                    rule: "repeated",
                    type: "CollectionSelector",
                    id: 2
                  },
                  where: {
                    type: "Filter",
                    id: 3
                  },
                  orderBy: {
                    rule: "repeated",
                    type: "Order",
                    id: 4
                  },
                  startAt: {
                    type: "Cursor",
                    id: 7
                  },
                  endAt: {
                    type: "Cursor",
                    id: 8
                  },
                  offset: {
                    type: "int32",
                    id: 6
                  },
                  limit: {
                    type: "google.protobuf.Int32Value",
                    id: 5
                  }
                },
                nested: {
                  CollectionSelector: {
                    fields: {
                      collectionId: {
                        type: "string",
                        id: 2
                      },
                      allDescendants: {
                        type: "bool",
                        id: 3
                      }
                    }
                  },
                  Filter: {
                    oneofs: {
                      filterType: {
                        oneof: ["compositeFilter", "fieldFilter", "unaryFilter"]
                      }
                    },
                    fields: {
                      compositeFilter: {
                        type: "CompositeFilter",
                        id: 1
                      },
                      fieldFilter: {
                        type: "FieldFilter",
                        id: 2
                      },
                      unaryFilter: {
                        type: "UnaryFilter",
                        id: 3
                      }
                    }
                  },
                  CompositeFilter: {
                    fields: {
                      op: {
                        type: "Operator",
                        id: 1
                      },
                      filters: {
                        rule: "repeated",
                        type: "Filter",
                        id: 2
                      }
                    },
                    nested: {
                      Operator: {
                        values: {
                          OPERATOR_UNSPECIFIED: 0,
                          AND: 1,
                          OR: 2
                        }
                      }
                    }
                  },
                  FieldFilter: {
                    fields: {
                      field: {
                        type: "FieldReference",
                        id: 1
                      },
                      op: {
                        type: "Operator",
                        id: 2
                      },
                      value: {
                        type: "Value",
                        id: 3
                      }
                    },
                    nested: {
                      Operator: {
                        values: {
                          OPERATOR_UNSPECIFIED: 0,
                          LESS_THAN: 1,
                          LESS_THAN_OR_EQUAL: 2,
                          GREATER_THAN: 3,
                          GREATER_THAN_OR_EQUAL: 4,
                          EQUAL: 5,
                          NOT_EQUAL: 6,
                          ARRAY_CONTAINS: 7,
                          IN: 8,
                          ARRAY_CONTAINS_ANY: 9,
                          NOT_IN: 10
                        }
                      }
                    }
                  },
                  UnaryFilter: {
                    oneofs: {
                      operandType: {
                        oneof: ["field"]
                      }
                    },
                    fields: {
                      op: {
                        type: "Operator",
                        id: 1
                      },
                      field: {
                        type: "FieldReference",
                        id: 2
                      }
                    },
                    nested: {
                      Operator: {
                        values: {
                          OPERATOR_UNSPECIFIED: 0,
                          IS_NAN: 2,
                          IS_NULL: 3,
                          IS_NOT_NAN: 4,
                          IS_NOT_NULL: 5
                        }
                      }
                    }
                  },
                  Order: {
                    fields: {
                      field: {
                        type: "FieldReference",
                        id: 1
                      },
                      direction: {
                        type: "Direction",
                        id: 2
                      }
                    }
                  },
                  FieldReference: {
                    fields: {
                      fieldPath: {
                        type: "string",
                        id: 2
                      }
                    }
                  },
                  Projection: {
                    fields: {
                      fields: {
                        rule: "repeated",
                        type: "FieldReference",
                        id: 2
                      }
                    }
                  },
                  Direction: {
                    values: {
                      DIRECTION_UNSPECIFIED: 0,
                      ASCENDING: 1,
                      DESCENDING: 2
                    }
                  }
                }
              },
              StructuredAggregationQuery: {
                oneofs: {
                  queryType: {
                    oneof: ["structuredQuery"]
                  }
                },
                fields: {
                  structuredQuery: {
                    type: "StructuredQuery",
                    id: 1
                  },
                  aggregations: {
                    rule: "repeated",
                    type: "Aggregation",
                    id: 3
                  }
                },
                nested: {
                  Aggregation: {
                    oneofs: {
                      operator: {
                        oneof: ["count", "sum", "avg"]
                      }
                    },
                    fields: {
                      count: {
                        type: "Count",
                        id: 1
                      },
                      sum: {
                        type: "Sum",
                        id: 2
                      },
                      avg: {
                        type: "Avg",
                        id: 3
                      },
                      alias: {
                        type: "string",
                        id: 7
                      }
                    },
                    nested: {
                      Count: {
                        fields: {
                          upTo: {
                            type: "google.protobuf.Int64Value",
                            id: 1
                          }
                        }
                      },
                      Sum: {
                        fields: {
                          field: {
                            type: "FieldReference",
                            id: 1
                          }
                        }
                      },
                      Avg: {
                        fields: {
                          field: {
                            type: "FieldReference",
                            id: 1
                          }
                        }
                      }
                    }
                  }
                }
              },
              Cursor: {
                fields: {
                  values: {
                    rule: "repeated",
                    type: "Value",
                    id: 1
                  },
                  before: {
                    type: "bool",
                    id: 2
                  }
                }
              },
              Write: {
                oneofs: {
                  operation: {
                    oneof: ["update", "delete", "verify", "transform"]
                  }
                },
                fields: {
                  update: {
                    type: "Document",
                    id: 1
                  },
                  "delete": {
                    type: "string",
                    id: 2
                  },
                  verify: {
                    type: "string",
                    id: 5
                  },
                  transform: {
                    type: "DocumentTransform",
                    id: 6
                  },
                  updateMask: {
                    type: "DocumentMask",
                    id: 3
                  },
                  updateTransforms: {
                    rule: "repeated",
                    type: "DocumentTransform.FieldTransform",
                    id: 7
                  },
                  currentDocument: {
                    type: "Precondition",
                    id: 4
                  }
                }
              },
              DocumentTransform: {
                fields: {
                  document: {
                    type: "string",
                    id: 1
                  },
                  fieldTransforms: {
                    rule: "repeated",
                    type: "FieldTransform",
                    id: 2
                  }
                },
                nested: {
                  FieldTransform: {
                    oneofs: {
                      transformType: {
                        oneof: ["setToServerValue", "increment", "maximum", "minimum", "appendMissingElements", "removeAllFromArray"]
                      }
                    },
                    fields: {
                      fieldPath: {
                        type: "string",
                        id: 1
                      },
                      setToServerValue: {
                        type: "ServerValue",
                        id: 2
                      },
                      increment: {
                        type: "Value",
                        id: 3
                      },
                      maximum: {
                        type: "Value",
                        id: 4
                      },
                      minimum: {
                        type: "Value",
                        id: 5
                      },
                      appendMissingElements: {
                        type: "ArrayValue",
                        id: 6
                      },
                      removeAllFromArray: {
                        type: "ArrayValue",
                        id: 7
                      }
                    },
                    nested: {
                      ServerValue: {
                        values: {
                          SERVER_VALUE_UNSPECIFIED: 0,
                          REQUEST_TIME: 1
                        }
                      }
                    }
                  }
                }
              },
              WriteResult: {
                fields: {
                  updateTime: {
                    type: "google.protobuf.Timestamp",
                    id: 1
                  },
                  transformResults: {
                    rule: "repeated",
                    type: "Value",
                    id: 2
                  }
                }
              },
              DocumentChange: {
                fields: {
                  document: {
                    type: "Document",
                    id: 1
                  },
                  targetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 5
                  },
                  removedTargetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 6
                  }
                }
              },
              DocumentDelete: {
                fields: {
                  document: {
                    type: "string",
                    id: 1
                  },
                  removedTargetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 6
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              DocumentRemove: {
                fields: {
                  document: {
                    type: "string",
                    id: 1
                  },
                  removedTargetIds: {
                    rule: "repeated",
                    type: "int32",
                    id: 2
                  },
                  readTime: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  }
                }
              },
              ExistenceFilter: {
                fields: {
                  targetId: {
                    type: "int32",
                    id: 1
                  },
                  count: {
                    type: "int32",
                    id: 2
                  },
                  unchangedNames: {
                    type: "BloomFilter",
                    id: 3
                  }
                }
              }
            }
          }
        }
      },
      api: {
        options: {
          go_package: "google.golang.org/genproto/googleapis/api/annotations;annotations",
          java_multiple_files: true,
          java_outer_classname: "HttpProto",
          java_package: "com.google.api",
          objc_class_prefix: "GAPI",
          cc_enable_arenas: true
        },
        nested: {
          http: {
            type: "HttpRule",
            id: 72295728,
            extend: "google.protobuf.MethodOptions"
          },
          Http: {
            fields: {
              rules: {
                rule: "repeated",
                type: "HttpRule",
                id: 1
              }
            }
          },
          HttpRule: {
            oneofs: {
              pattern: {
                oneof: ["get", "put", "post", "delete", "patch", "custom"]
              }
            },
            fields: {
              get: {
                type: "string",
                id: 2
              },
              put: {
                type: "string",
                id: 3
              },
              post: {
                type: "string",
                id: 4
              },
              "delete": {
                type: "string",
                id: 5
              },
              patch: {
                type: "string",
                id: 6
              },
              custom: {
                type: "CustomHttpPattern",
                id: 8
              },
              selector: {
                type: "string",
                id: 1
              },
              body: {
                type: "string",
                id: 7
              },
              additionalBindings: {
                rule: "repeated",
                type: "HttpRule",
                id: 11
              }
            }
          },
          CustomHttpPattern: {
            fields: {
              kind: {
                type: "string",
                id: 1
              },
              path: {
                type: "string",
                id: 2
              }
            }
          },
          methodSignature: {
            rule: "repeated",
            type: "string",
            id: 1051,
            extend: "google.protobuf.MethodOptions"
          },
          defaultHost: {
            type: "string",
            id: 1049,
            extend: "google.protobuf.ServiceOptions"
          },
          oauthScopes: {
            type: "string",
            id: 1050,
            extend: "google.protobuf.ServiceOptions"
          },
          fieldBehavior: {
            rule: "repeated",
            type: "google.api.FieldBehavior",
            id: 1052,
            extend: "google.protobuf.FieldOptions"
          },
          FieldBehavior: {
            values: {
              FIELD_BEHAVIOR_UNSPECIFIED: 0,
              OPTIONAL: 1,
              REQUIRED: 2,
              OUTPUT_ONLY: 3,
              INPUT_ONLY: 4,
              IMMUTABLE: 5,
              UNORDERED_LIST: 6,
              NON_EMPTY_DEFAULT: 7
            }
          }
        }
      },
      type: {
        options: {
          cc_enable_arenas: true,
          go_package: "google.golang.org/genproto/googleapis/type/latlng;latlng",
          java_multiple_files: true,
          java_outer_classname: "LatLngProto",
          java_package: "com.google.type",
          objc_class_prefix: "GTP"
        },
        nested: {
          LatLng: {
            fields: {
              latitude: {
                type: "double",
                id: 1
              },
              longitude: {
                type: "double",
                id: 2
              }
            }
          }
        }
      },
      rpc: {
        options: {
          cc_enable_arenas: true,
          go_package: "google.golang.org/genproto/googleapis/rpc/status;status",
          java_multiple_files: true,
          java_outer_classname: "StatusProto",
          java_package: "com.google.rpc",
          objc_class_prefix: "RPC"
        },
        nested: {
          Status: {
            fields: {
              code: {
                type: "int32",
                id: 1
              },
              message: {
                type: "string",
                id: 2
              },
              details: {
                rule: "repeated",
                type: "google.protobuf.Any",
                id: 3
              }
            }
          }
        }
      }
    }
  }
};
var protos = {
  nested
};
var protos$1 = Object.freeze({
  __proto__: null,
  nested,
  "default": protos
});
var protoLoaderOptions = {
  longs: String,
  enums: String,
  defaults: true,
  oneofs: false
};
function loadProtos() {
  const packageDefinition = protoLoader.fromJSON(protos$1, protoLoaderOptions);
  return grpc.loadPackageDefinition(packageDefinition);
}
function newConnection(databaseInfo) {
  const protos2 = loadProtos();
  return new GrpcConnection(protos2, databaseInfo);
}
function newConnectivityMonitor() {
  return new NoopConnectivityMonitor();
}
function getWindow() {
  if (process.env.USE_MOCK_PERSISTENCE === "YES") {
    return window;
  }
  return null;
}
function getDocument() {
  return null;
}
function newSerializer(databaseId) {
  return new JsonProtoSerializer(
    databaseId,
    /* useProto3Json= */
    false
  );
}
var LOG_TAG$8 = "ExponentialBackoff";
var DEFAULT_BACKOFF_INITIAL_DELAY_MS = 1e3;
var DEFAULT_BACKOFF_FACTOR = 1.5;
var DEFAULT_BACKOFF_MAX_DELAY_MS = 60 * 1e3;
var ExponentialBackoff = class {
  constructor(queue, timerId, initialDelayMs = DEFAULT_BACKOFF_INITIAL_DELAY_MS, backoffFactor = DEFAULT_BACKOFF_FACTOR, maxDelayMs = DEFAULT_BACKOFF_MAX_DELAY_MS) {
    this.queue = queue;
    this.timerId = timerId;
    this.initialDelayMs = initialDelayMs;
    this.backoffFactor = backoffFactor;
    this.maxDelayMs = maxDelayMs;
    this.currentBaseMs = 0;
    this.timerPromise = null;
    this.lastAttemptTime = Date.now();
    this.reset();
  }
  /**
   * Resets the backoff delay.
   *
   * The very next backoffAndWait() will have no delay. If it is called again
   * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
   * subsequent ones will increase according to the backoffFactor.
   */
  reset() {
    this.currentBaseMs = 0;
  }
  /**
   * Resets the backoff delay to the maximum delay (e.g. for use after a
   * RESOURCE_EXHAUSTED error).
   */
  resetToMax() {
    this.currentBaseMs = this.maxDelayMs;
  }
  /**
   * Returns a promise that resolves after currentDelayMs, and increases the
   * delay for any subsequent attempts. If there was a pending backoff operation
   * already, it will be canceled.
   */
  backoffAndRun(op) {
    this.cancel();
    const desiredDelayWithJitterMs = Math.floor(this.currentBaseMs + this.jitterDelayMs());
    const delaySoFarMs = Math.max(0, Date.now() - this.lastAttemptTime);
    const remainingDelayMs = Math.max(0, desiredDelayWithJitterMs - delaySoFarMs);
    if (remainingDelayMs > 0) {
      logDebug(LOG_TAG$8, `Backing off for ${remainingDelayMs} ms (base delay: ${this.currentBaseMs} ms, delay with jitter: ${desiredDelayWithJitterMs} ms, last attempt: ${delaySoFarMs} ms ago)`);
    }
    this.timerPromise = this.queue.enqueueAfterDelay(this.timerId, remainingDelayMs, () => {
      this.lastAttemptTime = Date.now();
      return op();
    });
    this.currentBaseMs *= this.backoffFactor;
    if (this.currentBaseMs < this.initialDelayMs) {
      this.currentBaseMs = this.initialDelayMs;
    }
    if (this.currentBaseMs > this.maxDelayMs) {
      this.currentBaseMs = this.maxDelayMs;
    }
  }
  skipBackoff() {
    if (this.timerPromise !== null) {
      this.timerPromise.skipDelay();
      this.timerPromise = null;
    }
  }
  cancel() {
    if (this.timerPromise !== null) {
      this.timerPromise.cancel();
      this.timerPromise = null;
    }
  }
  /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
  jitterDelayMs() {
    return (Math.random() - 0.5) * this.currentBaseMs;
  }
};
var LOG_TAG$7 = "PersistentStream";
var IDLE_TIMEOUT_MS = 60 * 1e3;
var HEALTHY_TIMEOUT_MS = 10 * 1e3;
var PersistentStream = class {
  constructor(queue, connectionTimerId, idleTimerId, healthTimerId, connection, authCredentialsProvider, appCheckCredentialsProvider, listener) {
    this.queue = queue;
    this.idleTimerId = idleTimerId;
    this.healthTimerId = healthTimerId;
    this.connection = connection;
    this.authCredentialsProvider = authCredentialsProvider;
    this.appCheckCredentialsProvider = appCheckCredentialsProvider;
    this.listener = listener;
    this.state = 0;
    this.closeCount = 0;
    this.idleTimer = null;
    this.healthCheck = null;
    this.stream = null;
    this.responseCount = 0;
    this.backoff = new ExponentialBackoff(queue, connectionTimerId);
  }
  /**
   * Returns true if start() has been called and no error has occurred. True
   * indicates the stream is open or in the process of opening (which
   * encompasses respecting backoff, getting auth tokens, and starting the
   * actual RPC). Use isOpen() to determine if the stream is open and ready for
   * outbound requests.
   */
  isStarted() {
    return this.state === 1 || this.state === 5 || this.isOpen();
  }
  /**
   * Returns true if the underlying RPC is open (the onOpen() listener has been
   * called) and the stream is ready for outbound requests.
   */
  isOpen() {
    return this.state === 2 || this.state === 3;
  }
  /**
   * Starts the RPC. Only allowed if isStarted() returns false. The stream is
   * not immediately ready for use: onOpen() will be invoked when the RPC is
   * ready for outbound requests, at which point isOpen() will return true.
   *
   * When start returns, isStarted() will return true.
   */
  start() {
    this.responseCount = 0;
    if (this.state === 4) {
      this.performBackoff();
      return;
    }
    this.auth();
  }
  /**
   * Stops the RPC. This call is idempotent and allowed regardless of the
   * current isStarted() state.
   *
   * When stop returns, isStarted() and isOpen() will both return false.
   */
  stop() {
    return __async(this, null, function* () {
      if (this.isStarted()) {
        yield this.close(
          0
          /* PersistentStreamState.Initial */
        );
      }
    });
  }
  /**
   * After an error the stream will usually back off on the next attempt to
   * start it. If the error warrants an immediate restart of the stream, the
   * sender can use this to indicate that the receiver should not back off.
   *
   * Each error will call the onClose() listener. That function can decide to
   * inhibit backoff if required.
   */
  inhibitBackoff() {
    this.state = 0;
    this.backoff.reset();
  }
  /**
   * Marks this stream as idle. If no further actions are performed on the
   * stream for one minute, the stream will automatically close itself and
   * notify the stream's onClose() handler with Status.OK. The stream will then
   * be in a !isStarted() state, requiring the caller to start the stream again
   * before further use.
   *
   * Only streams that are in state 'Open' can be marked idle, as all other
   * states imply pending network operations.
   */
  markIdle() {
    if (this.isOpen() && this.idleTimer === null) {
      this.idleTimer = this.queue.enqueueAfterDelay(this.idleTimerId, IDLE_TIMEOUT_MS, () => this.handleIdleCloseTimer());
    }
  }
  /** Sends a message to the underlying stream. */
  sendRequest(msg) {
    this.cancelIdleCheck();
    this.stream.send(msg);
  }
  /** Called by the idle timer when the stream should close due to inactivity. */
  handleIdleCloseTimer() {
    return __async(this, null, function* () {
      if (this.isOpen()) {
        return this.close(
          0
          /* PersistentStreamState.Initial */
        );
      }
    });
  }
  /** Marks the stream as active again. */
  cancelIdleCheck() {
    if (this.idleTimer) {
      this.idleTimer.cancel();
      this.idleTimer = null;
    }
  }
  /** Cancels the health check delayed operation. */
  cancelHealthCheck() {
    if (this.healthCheck) {
      this.healthCheck.cancel();
      this.healthCheck = null;
    }
  }
  /**
   * Closes the stream and cleans up as necessary:
   *
   * * closes the underlying GRPC stream;
   * * calls the onClose handler with the given 'error';
   * * sets internal stream state to 'finalState';
   * * adjusts the backoff timer based on the error
   *
   * A new stream can be opened by calling start().
   *
   * @param finalState - the intended state of the stream after closing.
   * @param error - the error the connection was closed with.
   */
  close(finalState, error) {
    return __async(this, null, function* () {
      this.cancelIdleCheck();
      this.cancelHealthCheck();
      this.backoff.cancel();
      this.closeCount++;
      if (finalState !== 4) {
        this.backoff.reset();
      } else if (error && error.code === Code.RESOURCE_EXHAUSTED) {
        logError(error.toString());
        logError("Using maximum backoff delay to prevent overloading the backend.");
        this.backoff.resetToMax();
      } else if (error && error.code === Code.UNAUTHENTICATED && this.state !== 3) {
        this.authCredentialsProvider.invalidateToken();
        this.appCheckCredentialsProvider.invalidateToken();
      }
      if (this.stream !== null) {
        this.tearDown();
        this.stream.close();
        this.stream = null;
      }
      this.state = finalState;
      yield this.listener.onClose(error);
    });
  }
  /**
   * Can be overridden to perform additional cleanup before the stream is closed.
   * Calling super.tearDown() is not required.
   */
  tearDown() {
  }
  auth() {
    this.state = 1;
    const dispatchIfNotClosed = this.getCloseGuardedDispatcher(this.closeCount);
    const closeCount = this.closeCount;
    Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(([authToken, appCheckToken]) => {
      if (this.closeCount === closeCount) {
        this.startStream(authToken, appCheckToken);
      }
    }, (error) => {
      dispatchIfNotClosed(() => {
        const rpcError = new FirestoreError(Code.UNKNOWN, "Fetching auth token failed: " + error.message);
        return this.handleStreamClose(rpcError);
      });
    });
  }
  startStream(authToken, appCheckToken) {
    const dispatchIfNotClosed = this.getCloseGuardedDispatcher(this.closeCount);
    this.stream = this.startRpc(authToken, appCheckToken);
    this.stream.onConnected(() => {
      dispatchIfNotClosed(() => this.listener.onConnected());
    });
    this.stream.onOpen(() => {
      dispatchIfNotClosed(() => {
        this.state = 2;
        this.healthCheck = this.queue.enqueueAfterDelay(this.healthTimerId, HEALTHY_TIMEOUT_MS, () => {
          if (this.isOpen()) {
            this.state = 3;
          }
          return Promise.resolve();
        });
        return this.listener.onOpen();
      });
    });
    this.stream.onClose((error) => {
      dispatchIfNotClosed(() => {
        return this.handleStreamClose(error);
      });
    });
    this.stream.onMessage((msg) => {
      dispatchIfNotClosed(() => {
        if (++this.responseCount === 1) {
          return this.onFirst(msg);
        } else {
          return this.onNext(msg);
        }
      });
    });
  }
  performBackoff() {
    this.state = 5;
    this.backoff.backoffAndRun(() => __async(this, null, function* () {
      this.state = 0;
      this.start();
    }));
  }
  // Visible for tests
  handleStreamClose(error) {
    logDebug(LOG_TAG$7, `close with error: ${error}`);
    this.stream = null;
    return this.close(4, error);
  }
  /**
   * Returns a "dispatcher" function that dispatches operations onto the
   * AsyncQueue but only runs them if closeCount remains unchanged. This allows
   * us to turn auth / stream callbacks into no-ops if the stream is closed /
   * re-opened, etc.
   */
  getCloseGuardedDispatcher(startCloseCount) {
    return (fn) => {
      this.queue.enqueueAndForget(() => {
        if (this.closeCount === startCloseCount) {
          return fn();
        } else {
          logDebug(LOG_TAG$7, "stream callback skipped by getCloseGuardedDispatcher.");
          return Promise.resolve();
        }
      });
    };
  }
};
var PersistentListenStream = class extends PersistentStream {
  constructor(queue, connection, authCredentials, appCheckCredentials, serializer, listener) {
    super(queue, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", connection, authCredentials, appCheckCredentials, listener);
    this.serializer = serializer;
  }
  startRpc(authToken, appCheckToken) {
    return this.connection.openStream("Listen", authToken, appCheckToken);
  }
  onFirst(watchChangeProto) {
    return this.onNext(watchChangeProto);
  }
  onNext(watchChangeProto) {
    this.backoff.reset();
    const watchChange = fromWatchChange(this.serializer, watchChangeProto);
    const snapshot = versionFromListenResponse(watchChangeProto);
    return this.listener.onWatchChange(watchChange, snapshot);
  }
  /**
   * Registers interest in the results of the given target. If the target
   * includes a resumeToken it will be included in the request. Results that
   * affect the target will be streamed back as WatchChange messages that
   * reference the targetId.
   */
  watch(targetData) {
    const request = {};
    request.database = getEncodedDatabaseId(this.serializer);
    request.addTarget = toTarget(this.serializer, targetData);
    const labels = toListenRequestLabels(this.serializer, targetData);
    if (labels) {
      request.labels = labels;
    }
    this.sendRequest(request);
  }
  /**
   * Unregisters interest in the results of the target associated with the
   * given targetId.
   */
  unwatch(targetId) {
    const request = {};
    request.database = getEncodedDatabaseId(this.serializer);
    request.removeTarget = targetId;
    this.sendRequest(request);
  }
};
var PersistentWriteStream = class extends PersistentStream {
  constructor(queue, connection, authCredentials, appCheckCredentials, serializer, listener) {
    super(queue, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", connection, authCredentials, appCheckCredentials, listener);
    this.serializer = serializer;
  }
  /**
   * Tracks whether or not a handshake has been successfully exchanged and
   * the stream is ready to accept mutations.
   */
  get handshakeComplete() {
    return this.responseCount > 0;
  }
  // Override of PersistentStream.start
  start() {
    this.lastStreamToken = void 0;
    super.start();
  }
  tearDown() {
    if (this.handshakeComplete) {
      this.writeMutations([]);
    }
  }
  startRpc(authToken, appCheckToken) {
    return this.connection.openStream("Write", authToken, appCheckToken);
  }
  onFirst(responseProto) {
    hardAssert(!!responseProto.streamToken);
    this.lastStreamToken = responseProto.streamToken;
    hardAssert(!responseProto.writeResults || responseProto.writeResults.length === 0);
    return this.listener.onHandshakeComplete();
  }
  onNext(responseProto) {
    hardAssert(!!responseProto.streamToken);
    this.lastStreamToken = responseProto.streamToken;
    this.backoff.reset();
    const results = fromWriteResults(responseProto.writeResults, responseProto.commitTime);
    const commitVersion = fromVersion(responseProto.commitTime);
    return this.listener.onMutationResult(commitVersion, results);
  }
  /**
   * Sends an initial streamToken to the server, performing the handshake
   * required to make the StreamingWrite RPC work. Subsequent
   * calls should wait until onHandshakeComplete was called.
   */
  writeHandshake() {
    const request = {};
    request.database = getEncodedDatabaseId(this.serializer);
    this.sendRequest(request);
  }
  /** Sends a group of mutations to the Firestore backend to apply. */
  writeMutations(mutations) {
    const request = {
      streamToken: this.lastStreamToken,
      writes: mutations.map((mutation) => toMutation(this.serializer, mutation))
    };
    this.sendRequest(request);
  }
};
var Datastore = class {
};
var DatastoreImpl = class extends Datastore {
  constructor(authCredentials, appCheckCredentials, connection, serializer) {
    super();
    this.authCredentials = authCredentials;
    this.appCheckCredentials = appCheckCredentials;
    this.connection = connection;
    this.serializer = serializer;
    this.terminated = false;
  }
  verifyInitialized() {
    if (this.terminated) {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "The client has already been terminated.");
    }
  }
  /** Invokes the provided RPC with auth and AppCheck tokens. */
  invokeRPC(rpcName, databaseId, resourcePath, request) {
    this.verifyInitialized();
    return Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([authToken, appCheckToken]) => {
      return this.connection.invokeRPC(rpcName, toResourcePath(databaseId, resourcePath), request, authToken, appCheckToken);
    }).catch((error) => {
      if (error.name === "FirebaseError") {
        if (error.code === Code.UNAUTHENTICATED) {
          this.authCredentials.invalidateToken();
          this.appCheckCredentials.invalidateToken();
        }
        throw error;
      } else {
        throw new FirestoreError(Code.UNKNOWN, error.toString());
      }
    });
  }
  /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */
  invokeStreamingRPC(rpcName, databaseId, resourcePath, request, expectedResponseCount) {
    this.verifyInitialized();
    return Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([authToken, appCheckToken]) => {
      return this.connection.invokeStreamingRPC(rpcName, toResourcePath(databaseId, resourcePath), request, authToken, appCheckToken, expectedResponseCount);
    }).catch((error) => {
      if (error.name === "FirebaseError") {
        if (error.code === Code.UNAUTHENTICATED) {
          this.authCredentials.invalidateToken();
          this.appCheckCredentials.invalidateToken();
        }
        throw error;
      } else {
        throw new FirestoreError(Code.UNKNOWN, error.toString());
      }
    });
  }
  terminate() {
    this.terminated = true;
    this.connection.terminate();
  }
};
function newDatastore(authCredentials, appCheckCredentials, connection, serializer) {
  return new DatastoreImpl(authCredentials, appCheckCredentials, connection, serializer);
}
function invokeCommitRpc(datastore, mutations) {
  return __async(this, null, function* () {
    const datastoreImpl = debugCast(datastore);
    const request = {
      writes: mutations.map((m) => toMutation(datastoreImpl.serializer, m))
    };
    yield datastoreImpl.invokeRPC("Commit", datastoreImpl.serializer.databaseId, ResourcePath.emptyPath(), request);
  });
}
function invokeBatchGetDocumentsRpc(datastore, keys) {
  return __async(this, null, function* () {
    const datastoreImpl = debugCast(datastore);
    const request = {
      documents: keys.map((k) => toName(datastoreImpl.serializer, k))
    };
    const response = yield datastoreImpl.invokeStreamingRPC("BatchGetDocuments", datastoreImpl.serializer.databaseId, ResourcePath.emptyPath(), request, keys.length);
    const docs = /* @__PURE__ */ new Map();
    response.forEach((proto) => {
      const doc4 = fromBatchGetDocumentsResponse(datastoreImpl.serializer, proto);
      docs.set(doc4.key.toString(), doc4);
    });
    const result = [];
    keys.forEach((key) => {
      const doc4 = docs.get(key.toString());
      hardAssert(!!doc4);
      result.push(doc4);
    });
    return result;
  });
}
function invokeRunAggregationQueryRpc(datastore, query3, aggregates) {
  return __async(this, null, function* () {
    var _a;
    const datastoreImpl = debugCast(datastore);
    const {
      request,
      aliasMap,
      parent
    } = toRunAggregationQueryRequest(datastoreImpl.serializer, queryToAggregateTarget(query3), aggregates);
    if (!datastoreImpl.connection.shouldResourcePathBeIncludedInRequest) {
      delete request.parent;
    }
    const response = yield datastoreImpl.invokeStreamingRPC(
      "RunAggregationQuery",
      datastoreImpl.serializer.databaseId,
      parent,
      request,
      /*expectedResponseCount=*/
      1
    );
    const filteredResult = response.filter((proto) => !!proto.result);
    hardAssert(filteredResult.length === 1);
    const unmappedAggregateFields = (_a = filteredResult[0].result) === null || _a === void 0 ? void 0 : _a.aggregateFields;
    const remappedFields = Object.keys(unmappedAggregateFields).reduce((accumulator, key) => {
      accumulator[aliasMap[key]] = unmappedAggregateFields[key];
      return accumulator;
    }, {});
    return remappedFields;
  });
}
function newPersistentWriteStream(datastore, queue, listener) {
  const datastoreImpl = debugCast(datastore);
  datastoreImpl.verifyInitialized();
  return new PersistentWriteStream(queue, datastoreImpl.connection, datastoreImpl.authCredentials, datastoreImpl.appCheckCredentials, datastoreImpl.serializer, listener);
}
function newPersistentWatchStream(datastore, queue, listener) {
  const datastoreImpl = debugCast(datastore);
  datastoreImpl.verifyInitialized();
  return new PersistentListenStream(queue, datastoreImpl.connection, datastoreImpl.authCredentials, datastoreImpl.appCheckCredentials, datastoreImpl.serializer, listener);
}
var LOG_TAG$6 = "OnlineStateTracker";
var MAX_WATCH_STREAM_FAILURES = 1;
var ONLINE_STATE_TIMEOUT_MS = 10 * 1e3;
var OnlineStateTracker = class {
  constructor(asyncQueue, onlineStateHandler) {
    this.asyncQueue = asyncQueue;
    this.onlineStateHandler = onlineStateHandler;
    this.state = "Unknown";
    this.watchStreamFailures = 0;
    this.onlineStateTimer = null;
    this.shouldWarnClientIsOffline = true;
  }
  /**
   * Called by RemoteStore when a watch stream is started (including on each
   * backoff attempt).
   *
   * If this is the first attempt, it sets the OnlineState to Unknown and starts
   * the onlineStateTimer.
   */
  handleWatchStreamStart() {
    if (this.watchStreamFailures === 0) {
      this.setAndBroadcast(
        "Unknown"
        /* OnlineState.Unknown */
      );
      this.onlineStateTimer = this.asyncQueue.enqueueAfterDelay("online_state_timeout", ONLINE_STATE_TIMEOUT_MS, () => {
        this.onlineStateTimer = null;
        this.logClientOfflineWarningIfNecessary(`Backend didn't respond within ${ONLINE_STATE_TIMEOUT_MS / 1e3} seconds.`);
        this.setAndBroadcast(
          "Offline"
          /* OnlineState.Offline */
        );
        return Promise.resolve();
      });
    }
  }
  /**
   * Updates our OnlineState as appropriate after the watch stream reports a
   * failure. The first failure moves us to the 'Unknown' state. We then may
   * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
   * actually transition to the 'Offline' state.
   */
  handleWatchStreamFailure(error) {
    if (this.state === "Online") {
      this.setAndBroadcast(
        "Unknown"
        /* OnlineState.Unknown */
      );
    } else {
      this.watchStreamFailures++;
      if (this.watchStreamFailures >= MAX_WATCH_STREAM_FAILURES) {
        this.clearOnlineStateTimer();
        this.logClientOfflineWarningIfNecessary(`Connection failed ${MAX_WATCH_STREAM_FAILURES} times. Most recent error: ${error.toString()}`);
        this.setAndBroadcast(
          "Offline"
          /* OnlineState.Offline */
        );
      }
    }
  }
  /**
   * Explicitly sets the OnlineState to the specified state.
   *
   * Note that this resets our timers / failure counters, etc. used by our
   * Offline heuristics, so must not be used in place of
   * handleWatchStreamStart() and handleWatchStreamFailure().
   */
  set(newState) {
    this.clearOnlineStateTimer();
    this.watchStreamFailures = 0;
    if (newState === "Online") {
      this.shouldWarnClientIsOffline = false;
    }
    this.setAndBroadcast(newState);
  }
  setAndBroadcast(newState) {
    if (newState !== this.state) {
      this.state = newState;
      this.onlineStateHandler(newState);
    }
  }
  logClientOfflineWarningIfNecessary(details) {
    const message = `Could not reach Cloud Firestore backend. ${details}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
    if (this.shouldWarnClientIsOffline) {
      logError(message);
      this.shouldWarnClientIsOffline = false;
    } else {
      logDebug(LOG_TAG$6, message);
    }
  }
  clearOnlineStateTimer() {
    if (this.onlineStateTimer !== null) {
      this.onlineStateTimer.cancel();
      this.onlineStateTimer = null;
    }
  }
};
var LOG_TAG$5 = "RemoteStore";
var MAX_PENDING_WRITES = 10;
var RemoteStoreImpl = class {
  constructor(localStore, datastore, asyncQueue, onlineStateHandler, connectivityMonitor) {
    this.localStore = localStore;
    this.datastore = datastore;
    this.asyncQueue = asyncQueue;
    this.remoteSyncer = {};
    this.writePipeline = [];
    this.listenTargets = /* @__PURE__ */ new Map();
    this.offlineCauses = /* @__PURE__ */ new Set();
    this.onNetworkStatusChange = [];
    this.connectivityMonitor = connectivityMonitor;
    this.connectivityMonitor.addCallback((_) => {
      asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
        if (canUseNetwork(this)) {
          logDebug(LOG_TAG$5, "Restarting streams for network reachability change.");
          yield restartNetwork(this);
        }
      }));
    });
    this.onlineStateTracker = new OnlineStateTracker(asyncQueue, onlineStateHandler);
  }
};
function newRemoteStore(localStore, datastore, asyncQueue, onlineStateHandler, connectivityMonitor) {
  return new RemoteStoreImpl(localStore, datastore, asyncQueue, onlineStateHandler, connectivityMonitor);
}
function remoteStoreEnableNetwork(remoteStore) {
  const remoteStoreImpl = debugCast(remoteStore);
  remoteStoreImpl.offlineCauses.delete(
    0
    /* OfflineCause.UserDisabled */
  );
  return enableNetworkInternal(remoteStoreImpl);
}
function enableNetworkInternal(remoteStoreImpl) {
  return __async(this, null, function* () {
    if (canUseNetwork(remoteStoreImpl)) {
      for (const networkStatusHandler of remoteStoreImpl.onNetworkStatusChange) {
        yield networkStatusHandler(
          /* enabled= */
          true
        );
      }
    }
  });
}
function remoteStoreDisableNetwork(remoteStore) {
  return __async(this, null, function* () {
    const remoteStoreImpl = debugCast(remoteStore);
    remoteStoreImpl.offlineCauses.add(
      0
      /* OfflineCause.UserDisabled */
    );
    yield disableNetworkInternal(remoteStoreImpl);
    remoteStoreImpl.onlineStateTracker.set(
      "Offline"
      /* OnlineState.Offline */
    );
  });
}
function disableNetworkInternal(remoteStoreImpl) {
  return __async(this, null, function* () {
    for (const networkStatusHandler of remoteStoreImpl.onNetworkStatusChange) {
      yield networkStatusHandler(
        /* enabled= */
        false
      );
    }
  });
}
function remoteStoreShutdown(remoteStore) {
  return __async(this, null, function* () {
    const remoteStoreImpl = debugCast(remoteStore);
    logDebug(LOG_TAG$5, "RemoteStore shutting down.");
    remoteStoreImpl.offlineCauses.add(
      5
      /* OfflineCause.Shutdown */
    );
    yield disableNetworkInternal(remoteStoreImpl);
    remoteStoreImpl.connectivityMonitor.shutdown();
    remoteStoreImpl.onlineStateTracker.set(
      "Unknown"
      /* OnlineState.Unknown */
    );
  });
}
function remoteStoreListen(remoteStore, targetData) {
  const remoteStoreImpl = debugCast(remoteStore);
  if (remoteStoreImpl.listenTargets.has(targetData.targetId)) {
    return;
  }
  remoteStoreImpl.listenTargets.set(targetData.targetId, targetData);
  if (shouldStartWatchStream(remoteStoreImpl)) {
    startWatchStream(remoteStoreImpl);
  } else if (ensureWatchStream(remoteStoreImpl).isOpen()) {
    sendWatchRequest(remoteStoreImpl, targetData);
  }
}
function remoteStoreUnlisten(remoteStore, targetId) {
  const remoteStoreImpl = debugCast(remoteStore);
  const watchStream = ensureWatchStream(remoteStoreImpl);
  remoteStoreImpl.listenTargets.delete(targetId);
  if (watchStream.isOpen()) {
    sendUnwatchRequest(remoteStoreImpl, targetId);
  }
  if (remoteStoreImpl.listenTargets.size === 0) {
    if (watchStream.isOpen()) {
      watchStream.markIdle();
    } else if (canUseNetwork(remoteStoreImpl)) {
      remoteStoreImpl.onlineStateTracker.set(
        "Unknown"
        /* OnlineState.Unknown */
      );
    }
  }
}
function sendWatchRequest(remoteStoreImpl, targetData) {
  remoteStoreImpl.watchChangeAggregator.recordPendingTargetRequest(targetData.targetId);
  if (targetData.resumeToken.approximateByteSize() > 0 || targetData.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
    const expectedCount = remoteStoreImpl.remoteSyncer.getRemoteKeysForTarget(targetData.targetId).size;
    targetData = targetData.withExpectedCount(expectedCount);
  }
  ensureWatchStream(remoteStoreImpl).watch(targetData);
}
function sendUnwatchRequest(remoteStoreImpl, targetId) {
  remoteStoreImpl.watchChangeAggregator.recordPendingTargetRequest(targetId);
  ensureWatchStream(remoteStoreImpl).unwatch(targetId);
}
function startWatchStream(remoteStoreImpl) {
  remoteStoreImpl.watchChangeAggregator = new WatchChangeAggregator({
    getRemoteKeysForTarget: (targetId) => remoteStoreImpl.remoteSyncer.getRemoteKeysForTarget(targetId),
    getTargetDataForTarget: (targetId) => remoteStoreImpl.listenTargets.get(targetId) || null,
    getDatabaseId: () => remoteStoreImpl.datastore.serializer.databaseId
  });
  ensureWatchStream(remoteStoreImpl).start();
  remoteStoreImpl.onlineStateTracker.handleWatchStreamStart();
}
function shouldStartWatchStream(remoteStoreImpl) {
  return canUseNetwork(remoteStoreImpl) && !ensureWatchStream(remoteStoreImpl).isStarted() && remoteStoreImpl.listenTargets.size > 0;
}
function canUseNetwork(remoteStore) {
  const remoteStoreImpl = debugCast(remoteStore);
  return remoteStoreImpl.offlineCauses.size === 0;
}
function cleanUpWatchStreamState(remoteStoreImpl) {
  remoteStoreImpl.watchChangeAggregator = void 0;
}
function onWatchStreamConnected(remoteStoreImpl) {
  return __async(this, null, function* () {
    remoteStoreImpl.onlineStateTracker.set(
      "Online"
      /* OnlineState.Online */
    );
  });
}
function onWatchStreamOpen(remoteStoreImpl) {
  return __async(this, null, function* () {
    remoteStoreImpl.listenTargets.forEach((targetData, targetId) => {
      sendWatchRequest(remoteStoreImpl, targetData);
    });
  });
}
function onWatchStreamClose(remoteStoreImpl, error) {
  return __async(this, null, function* () {
    cleanUpWatchStreamState(remoteStoreImpl);
    if (shouldStartWatchStream(remoteStoreImpl)) {
      remoteStoreImpl.onlineStateTracker.handleWatchStreamFailure(error);
      startWatchStream(remoteStoreImpl);
    } else {
      remoteStoreImpl.onlineStateTracker.set(
        "Unknown"
        /* OnlineState.Unknown */
      );
    }
  });
}
function onWatchStreamChange(remoteStoreImpl, watchChange, snapshotVersion) {
  return __async(this, null, function* () {
    remoteStoreImpl.onlineStateTracker.set(
      "Online"
      /* OnlineState.Online */
    );
    if (watchChange instanceof WatchTargetChange && watchChange.state === 2 && watchChange.cause) {
      try {
        yield handleTargetError(remoteStoreImpl, watchChange);
      } catch (e) {
        logDebug(LOG_TAG$5, "Failed to remove targets %s: %s ", watchChange.targetIds.join(","), e);
        yield disableNetworkUntilRecovery(remoteStoreImpl, e);
      }
      return;
    }
    if (watchChange instanceof DocumentWatchChange) {
      remoteStoreImpl.watchChangeAggregator.handleDocumentChange(watchChange);
    } else if (watchChange instanceof ExistenceFilterChange) {
      remoteStoreImpl.watchChangeAggregator.handleExistenceFilter(watchChange);
    } else {
      remoteStoreImpl.watchChangeAggregator.handleTargetChange(watchChange);
    }
    if (!snapshotVersion.isEqual(SnapshotVersion.min())) {
      try {
        const lastRemoteSnapshotVersion = yield localStoreGetLastRemoteSnapshotVersion(remoteStoreImpl.localStore);
        if (snapshotVersion.compareTo(lastRemoteSnapshotVersion) >= 0) {
          yield raiseWatchSnapshot(remoteStoreImpl, snapshotVersion);
        }
      } catch (e) {
        logDebug(LOG_TAG$5, "Failed to raise snapshot:", e);
        yield disableNetworkUntilRecovery(remoteStoreImpl, e);
      }
    }
  });
}
function disableNetworkUntilRecovery(remoteStoreImpl, e, op) {
  return __async(this, null, function* () {
    if (isIndexedDbTransactionError(e)) {
      remoteStoreImpl.offlineCauses.add(
        1
        /* OfflineCause.IndexedDbFailed */
      );
      yield disableNetworkInternal(remoteStoreImpl);
      remoteStoreImpl.onlineStateTracker.set(
        "Offline"
        /* OnlineState.Offline */
      );
      if (!op) {
        op = () => localStoreGetLastRemoteSnapshotVersion(remoteStoreImpl.localStore);
      }
      remoteStoreImpl.asyncQueue.enqueueRetryable(() => __async(this, null, function* () {
        logDebug(LOG_TAG$5, "Retrying IndexedDB access");
        yield op();
        remoteStoreImpl.offlineCauses.delete(
          1
          /* OfflineCause.IndexedDbFailed */
        );
        yield enableNetworkInternal(remoteStoreImpl);
      }));
    } else {
      throw e;
    }
  });
}
function executeWithRecovery(remoteStoreImpl, op) {
  return op().catch((e) => disableNetworkUntilRecovery(remoteStoreImpl, e, op));
}
function raiseWatchSnapshot(remoteStoreImpl, snapshotVersion) {
  const remoteEvent = remoteStoreImpl.watchChangeAggregator.createRemoteEvent(snapshotVersion);
  remoteEvent.targetChanges.forEach((change, targetId) => {
    if (change.resumeToken.approximateByteSize() > 0) {
      const targetData = remoteStoreImpl.listenTargets.get(targetId);
      if (targetData) {
        remoteStoreImpl.listenTargets.set(targetId, targetData.withResumeToken(change.resumeToken, snapshotVersion));
      }
    }
  });
  remoteEvent.targetMismatches.forEach((targetId, targetPurpose) => {
    const targetData = remoteStoreImpl.listenTargets.get(targetId);
    if (!targetData) {
      return;
    }
    remoteStoreImpl.listenTargets.set(targetId, targetData.withResumeToken(ByteString.EMPTY_BYTE_STRING, targetData.snapshotVersion));
    sendUnwatchRequest(remoteStoreImpl, targetId);
    const requestTargetData = new TargetData(targetData.target, targetId, targetPurpose, targetData.sequenceNumber);
    sendWatchRequest(remoteStoreImpl, requestTargetData);
  });
  return remoteStoreImpl.remoteSyncer.applyRemoteEvent(remoteEvent);
}
function handleTargetError(remoteStoreImpl, watchChange) {
  return __async(this, null, function* () {
    const error = watchChange.cause;
    for (const targetId of watchChange.targetIds) {
      if (remoteStoreImpl.listenTargets.has(targetId)) {
        yield remoteStoreImpl.remoteSyncer.rejectListen(targetId, error);
        remoteStoreImpl.listenTargets.delete(targetId);
        remoteStoreImpl.watchChangeAggregator.removeTarget(targetId);
      }
    }
  });
}
function fillWritePipeline(remoteStore) {
  return __async(this, null, function* () {
    const remoteStoreImpl = debugCast(remoteStore);
    const writeStream = ensureWriteStream(remoteStoreImpl);
    let lastBatchIdRetrieved = remoteStoreImpl.writePipeline.length > 0 ? remoteStoreImpl.writePipeline[remoteStoreImpl.writePipeline.length - 1].batchId : BATCHID_UNKNOWN;
    while (canAddToWritePipeline(remoteStoreImpl)) {
      try {
        const batch = yield localStoreGetNextMutationBatch(remoteStoreImpl.localStore, lastBatchIdRetrieved);
        if (batch === null) {
          if (remoteStoreImpl.writePipeline.length === 0) {
            writeStream.markIdle();
          }
          break;
        } else {
          lastBatchIdRetrieved = batch.batchId;
          addToWritePipeline(remoteStoreImpl, batch);
        }
      } catch (e) {
        yield disableNetworkUntilRecovery(remoteStoreImpl, e);
      }
    }
    if (shouldStartWriteStream(remoteStoreImpl)) {
      startWriteStream(remoteStoreImpl);
    }
  });
}
function canAddToWritePipeline(remoteStoreImpl) {
  return canUseNetwork(remoteStoreImpl) && remoteStoreImpl.writePipeline.length < MAX_PENDING_WRITES;
}
function addToWritePipeline(remoteStoreImpl, batch) {
  remoteStoreImpl.writePipeline.push(batch);
  const writeStream = ensureWriteStream(remoteStoreImpl);
  if (writeStream.isOpen() && writeStream.handshakeComplete) {
    writeStream.writeMutations(batch.mutations);
  }
}
function shouldStartWriteStream(remoteStoreImpl) {
  return canUseNetwork(remoteStoreImpl) && !ensureWriteStream(remoteStoreImpl).isStarted() && remoteStoreImpl.writePipeline.length > 0;
}
function startWriteStream(remoteStoreImpl) {
  ensureWriteStream(remoteStoreImpl).start();
}
function onWriteStreamOpen(remoteStoreImpl) {
  return __async(this, null, function* () {
    ensureWriteStream(remoteStoreImpl).writeHandshake();
  });
}
function onWriteHandshakeComplete(remoteStoreImpl) {
  return __async(this, null, function* () {
    const writeStream = ensureWriteStream(remoteStoreImpl);
    for (const batch of remoteStoreImpl.writePipeline) {
      writeStream.writeMutations(batch.mutations);
    }
  });
}
function onMutationResult(remoteStoreImpl, commitVersion, results) {
  return __async(this, null, function* () {
    const batch = remoteStoreImpl.writePipeline.shift();
    const success = MutationBatchResult.from(batch, commitVersion, results);
    yield executeWithRecovery(remoteStoreImpl, () => remoteStoreImpl.remoteSyncer.applySuccessfulWrite(success));
    yield fillWritePipeline(remoteStoreImpl);
  });
}
function onWriteStreamClose(remoteStoreImpl, error) {
  return __async(this, null, function* () {
    if (error && ensureWriteStream(remoteStoreImpl).handshakeComplete) {
      yield handleWriteError(remoteStoreImpl, error);
    }
    if (shouldStartWriteStream(remoteStoreImpl)) {
      startWriteStream(remoteStoreImpl);
    }
  });
}
function handleWriteError(remoteStoreImpl, error) {
  return __async(this, null, function* () {
    if (isPermanentWriteError(error.code)) {
      const batch = remoteStoreImpl.writePipeline.shift();
      ensureWriteStream(remoteStoreImpl).inhibitBackoff();
      yield executeWithRecovery(remoteStoreImpl, () => remoteStoreImpl.remoteSyncer.rejectFailedWrite(batch.batchId, error));
      yield fillWritePipeline(remoteStoreImpl);
    }
  });
}
function restartNetwork(remoteStore) {
  return __async(this, null, function* () {
    const remoteStoreImpl = debugCast(remoteStore);
    remoteStoreImpl.offlineCauses.add(
      4
      /* OfflineCause.ConnectivityChange */
    );
    yield disableNetworkInternal(remoteStoreImpl);
    remoteStoreImpl.onlineStateTracker.set(
      "Unknown"
      /* OnlineState.Unknown */
    );
    remoteStoreImpl.offlineCauses.delete(
      4
      /* OfflineCause.ConnectivityChange */
    );
    yield enableNetworkInternal(remoteStoreImpl);
  });
}
function remoteStoreHandleCredentialChange(remoteStore, user) {
  return __async(this, null, function* () {
    const remoteStoreImpl = debugCast(remoteStore);
    remoteStoreImpl.asyncQueue.verifyOperationInProgress();
    logDebug(LOG_TAG$5, "RemoteStore received new credentials");
    const usesNetwork = canUseNetwork(remoteStoreImpl);
    remoteStoreImpl.offlineCauses.add(
      3
      /* OfflineCause.CredentialChange */
    );
    yield disableNetworkInternal(remoteStoreImpl);
    if (usesNetwork) {
      remoteStoreImpl.onlineStateTracker.set(
        "Unknown"
        /* OnlineState.Unknown */
      );
    }
    yield remoteStoreImpl.remoteSyncer.handleCredentialChange(user);
    remoteStoreImpl.offlineCauses.delete(
      3
      /* OfflineCause.CredentialChange */
    );
    yield enableNetworkInternal(remoteStoreImpl);
  });
}
function remoteStoreApplyPrimaryState(remoteStore, isPrimary) {
  return __async(this, null, function* () {
    const remoteStoreImpl = debugCast(remoteStore);
    if (isPrimary) {
      remoteStoreImpl.offlineCauses.delete(
        2
        /* OfflineCause.IsSecondary */
      );
      yield enableNetworkInternal(remoteStoreImpl);
    } else if (!isPrimary) {
      remoteStoreImpl.offlineCauses.add(
        2
        /* OfflineCause.IsSecondary */
      );
      yield disableNetworkInternal(remoteStoreImpl);
      remoteStoreImpl.onlineStateTracker.set(
        "Unknown"
        /* OnlineState.Unknown */
      );
    }
  });
}
function ensureWatchStream(remoteStoreImpl) {
  if (!remoteStoreImpl.watchStream) {
    remoteStoreImpl.watchStream = newPersistentWatchStream(remoteStoreImpl.datastore, remoteStoreImpl.asyncQueue, {
      onConnected: onWatchStreamConnected.bind(null, remoteStoreImpl),
      onOpen: onWatchStreamOpen.bind(null, remoteStoreImpl),
      onClose: onWatchStreamClose.bind(null, remoteStoreImpl),
      onWatchChange: onWatchStreamChange.bind(null, remoteStoreImpl)
    });
    remoteStoreImpl.onNetworkStatusChange.push((enabled) => __async(this, null, function* () {
      if (enabled) {
        remoteStoreImpl.watchStream.inhibitBackoff();
        if (shouldStartWatchStream(remoteStoreImpl)) {
          startWatchStream(remoteStoreImpl);
        } else {
          remoteStoreImpl.onlineStateTracker.set(
            "Unknown"
            /* OnlineState.Unknown */
          );
        }
      } else {
        yield remoteStoreImpl.watchStream.stop();
        cleanUpWatchStreamState(remoteStoreImpl);
      }
    }));
  }
  return remoteStoreImpl.watchStream;
}
function ensureWriteStream(remoteStoreImpl) {
  if (!remoteStoreImpl.writeStream) {
    remoteStoreImpl.writeStream = newPersistentWriteStream(remoteStoreImpl.datastore, remoteStoreImpl.asyncQueue, {
      onConnected: () => Promise.resolve(),
      onOpen: onWriteStreamOpen.bind(null, remoteStoreImpl),
      onClose: onWriteStreamClose.bind(null, remoteStoreImpl),
      onHandshakeComplete: onWriteHandshakeComplete.bind(null, remoteStoreImpl),
      onMutationResult: onMutationResult.bind(null, remoteStoreImpl)
    });
    remoteStoreImpl.onNetworkStatusChange.push((enabled) => __async(this, null, function* () {
      if (enabled) {
        remoteStoreImpl.writeStream.inhibitBackoff();
        yield fillWritePipeline(remoteStoreImpl);
      } else {
        yield remoteStoreImpl.writeStream.stop();
        if (remoteStoreImpl.writePipeline.length > 0) {
          logDebug(LOG_TAG$5, `Stopping write stream with ${remoteStoreImpl.writePipeline.length} pending writes`);
          remoteStoreImpl.writePipeline = [];
        }
      }
    }));
  }
  return remoteStoreImpl.writeStream;
}
var LOG_TAG$4 = "AsyncQueue";
var DelayedOperation = class _DelayedOperation {
  constructor(asyncQueue, timerId, targetTimeMs, op, removalCallback) {
    this.asyncQueue = asyncQueue;
    this.timerId = timerId;
    this.targetTimeMs = targetTimeMs;
    this.op = op;
    this.removalCallback = removalCallback;
    this.deferred = new Deferred();
    this.then = this.deferred.promise.then.bind(this.deferred.promise);
    this.deferred.promise.catch((err) => {
    });
  }
  get promise() {
    return this.deferred.promise;
  }
  /**
   * Creates and returns a DelayedOperation that has been scheduled to be
   * executed on the provided asyncQueue after the provided delayMs.
   *
   * @param asyncQueue - The queue to schedule the operation on.
   * @param id - A Timer ID identifying the type of operation this is.
   * @param delayMs - The delay (ms) before the operation should be scheduled.
   * @param op - The operation to run.
   * @param removalCallback - A callback to be called synchronously once the
   *   operation is executed or canceled, notifying the AsyncQueue to remove it
   *   from its delayedOperations list.
   *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
   *   the DelayedOperation class public.
   */
  static createAndSchedule(asyncQueue, timerId, delayMs, op, removalCallback) {
    const targetTime = Date.now() + delayMs;
    const delayedOp = new _DelayedOperation(asyncQueue, timerId, targetTime, op, removalCallback);
    delayedOp.start(delayMs);
    return delayedOp;
  }
  /**
   * Starts the timer. This is called immediately after construction by
   * createAndSchedule().
   */
  start(delayMs) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), delayMs);
  }
  /**
   * Queues the operation to run immediately (if it hasn't already been run or
   * canceled).
   */
  skipDelay() {
    return this.handleDelayElapsed();
  }
  /**
   * Cancels the operation if it hasn't already been executed or canceled. The
   * promise will be rejected.
   *
   * As long as the operation has not yet been run, calling cancel() provides a
   * guarantee that the operation will not be run.
   */
  cancel(reason) {
    if (this.timerHandle !== null) {
      this.clearTimeout();
      this.deferred.reject(new FirestoreError(Code.CANCELLED, "Operation cancelled" + (reason ? ": " + reason : "")));
    }
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() => {
      if (this.timerHandle !== null) {
        this.clearTimeout();
        return this.op().then((result) => {
          return this.deferred.resolve(result);
        });
      } else {
        return Promise.resolve();
      }
    });
  }
  clearTimeout() {
    if (this.timerHandle !== null) {
      this.removalCallback(this);
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    }
  }
};
function wrapInUserErrorIfRecoverable(e, msg) {
  logError(LOG_TAG$4, `${msg}: ${e}`);
  if (isIndexedDbTransactionError(e)) {
    return new FirestoreError(Code.UNAVAILABLE, `${msg}: ${e}`);
  } else {
    throw e;
  }
}
var DocumentSet = class _DocumentSet {
  /** The default ordering is by key if the comparator is omitted */
  constructor(comp) {
    if (comp) {
      this.comparator = (d1, d2) => comp(d1, d2) || DocumentKey.comparator(d1.key, d2.key);
    } else {
      this.comparator = (d1, d2) => DocumentKey.comparator(d1.key, d2.key);
    }
    this.keyedMap = documentMap();
    this.sortedSet = new SortedMap(this.comparator);
  }
  /**
   * Returns an empty copy of the existing DocumentSet, using the same
   * comparator.
   */
  static emptySet(oldSet) {
    return new _DocumentSet(oldSet.comparator);
  }
  has(key) {
    return this.keyedMap.get(key) != null;
  }
  get(key) {
    return this.keyedMap.get(key);
  }
  first() {
    return this.sortedSet.minKey();
  }
  last() {
    return this.sortedSet.maxKey();
  }
  isEmpty() {
    return this.sortedSet.isEmpty();
  }
  /**
   * Returns the index of the provided key in the document set, or -1 if the
   * document key is not present in the set;
   */
  indexOf(key) {
    const doc4 = this.keyedMap.get(key);
    return doc4 ? this.sortedSet.indexOf(doc4) : -1;
  }
  get size() {
    return this.sortedSet.size;
  }
  /** Iterates documents in order defined by "comparator" */
  forEach(cb) {
    this.sortedSet.inorderTraversal((k, v) => {
      cb(k);
      return false;
    });
  }
  /** Inserts or updates a document with the same key */
  add(doc4) {
    const set = this.delete(doc4.key);
    return set.copy(set.keyedMap.insert(doc4.key, doc4), set.sortedSet.insert(doc4, null));
  }
  /** Deletes a document with a given key */
  delete(key) {
    const doc4 = this.get(key);
    if (!doc4) {
      return this;
    }
    return this.copy(this.keyedMap.remove(key), this.sortedSet.remove(doc4));
  }
  isEqual(other) {
    if (!(other instanceof _DocumentSet)) {
      return false;
    }
    if (this.size !== other.size) {
      return false;
    }
    const thisIt = this.sortedSet.getIterator();
    const otherIt = other.sortedSet.getIterator();
    while (thisIt.hasNext()) {
      const thisDoc = thisIt.getNext().key;
      const otherDoc = otherIt.getNext().key;
      if (!thisDoc.isEqual(otherDoc)) {
        return false;
      }
    }
    return true;
  }
  toString() {
    const docStrings = [];
    this.forEach((doc4) => {
      docStrings.push(doc4.toString());
    });
    if (docStrings.length === 0) {
      return "DocumentSet ()";
    } else {
      return "DocumentSet (\n  " + docStrings.join("  \n") + "\n)";
    }
  }
  copy(keyedMap, sortedSet) {
    const newSet = new _DocumentSet();
    newSet.comparator = this.comparator;
    newSet.keyedMap = keyedMap;
    newSet.sortedSet = sortedSet;
    return newSet;
  }
};
var DocumentChangeSet = class {
  constructor() {
    this.changeMap = new SortedMap(DocumentKey.comparator);
  }
  track(change) {
    const key = change.doc.key;
    const oldChange = this.changeMap.get(key);
    if (!oldChange) {
      this.changeMap = this.changeMap.insert(key, change);
      return;
    }
    if (change.type !== 0 && oldChange.type === 3) {
      this.changeMap = this.changeMap.insert(key, change);
    } else if (change.type === 3 && oldChange.type !== 1) {
      this.changeMap = this.changeMap.insert(key, {
        type: oldChange.type,
        doc: change.doc
      });
    } else if (change.type === 2 && oldChange.type === 2) {
      this.changeMap = this.changeMap.insert(key, {
        type: 2,
        doc: change.doc
      });
    } else if (change.type === 2 && oldChange.type === 0) {
      this.changeMap = this.changeMap.insert(key, {
        type: 0,
        doc: change.doc
      });
    } else if (change.type === 1 && oldChange.type === 0) {
      this.changeMap = this.changeMap.remove(key);
    } else if (change.type === 1 && oldChange.type === 2) {
      this.changeMap = this.changeMap.insert(key, {
        type: 1,
        doc: oldChange.doc
      });
    } else if (change.type === 0 && oldChange.type === 1) {
      this.changeMap = this.changeMap.insert(key, {
        type: 2,
        doc: change.doc
      });
    } else {
      fail();
    }
  }
  getChanges() {
    const changes = [];
    this.changeMap.inorderTraversal((key, change) => {
      changes.push(change);
    });
    return changes;
  }
};
var ViewSnapshot = class _ViewSnapshot {
  constructor(query3, docs, oldDocs, docChanges, mutatedKeys, fromCache, syncStateChanged, excludesMetadataChanges, hasCachedResults) {
    this.query = query3;
    this.docs = docs;
    this.oldDocs = oldDocs;
    this.docChanges = docChanges;
    this.mutatedKeys = mutatedKeys;
    this.fromCache = fromCache;
    this.syncStateChanged = syncStateChanged;
    this.excludesMetadataChanges = excludesMetadataChanges;
    this.hasCachedResults = hasCachedResults;
  }
  /** Returns a view snapshot as if all documents in the snapshot were added. */
  static fromInitialDocuments(query3, documents, mutatedKeys, fromCache, hasCachedResults) {
    const changes = [];
    documents.forEach((doc4) => {
      changes.push({
        type: 0,
        doc: doc4
      });
    });
    return new _ViewSnapshot(
      query3,
      documents,
      DocumentSet.emptySet(documents),
      changes,
      mutatedKeys,
      fromCache,
      /* syncStateChanged= */
      true,
      /* excludesMetadataChanges= */
      false,
      hasCachedResults
    );
  }
  get hasPendingWrites() {
    return !this.mutatedKeys.isEmpty();
  }
  isEqual(other) {
    if (this.fromCache !== other.fromCache || this.hasCachedResults !== other.hasCachedResults || this.syncStateChanged !== other.syncStateChanged || !this.mutatedKeys.isEqual(other.mutatedKeys) || !queryEquals(this.query, other.query) || !this.docs.isEqual(other.docs) || !this.oldDocs.isEqual(other.oldDocs)) {
      return false;
    }
    const changes = this.docChanges;
    const otherChanges = other.docChanges;
    if (changes.length !== otherChanges.length) {
      return false;
    }
    for (let i = 0; i < changes.length; i++) {
      if (changes[i].type !== otherChanges[i].type || !changes[i].doc.isEqual(otherChanges[i].doc)) {
        return false;
      }
    }
    return true;
  }
};
var QueryListenersInfo = class {
  constructor() {
    this.viewSnap = void 0;
    this.listeners = [];
  }
  // Helper methods that checks if the query has listeners that listening to remote store
  hasRemoteListeners() {
    return this.listeners.some((listener) => listener.listensToRemoteStore());
  }
};
function newEventManager() {
  return new EventManagerImpl();
}
var EventManagerImpl = class {
  constructor() {
    this.queries = newQueriesObjectMap();
    this.onlineState = "Unknown";
    this.snapshotsInSyncListeners = /* @__PURE__ */ new Set();
  }
  terminate() {
    errorAllTargets(this, new FirestoreError(Code.ABORTED, "Firestore shutting down"));
  }
};
function newQueriesObjectMap() {
  return new ObjectMap((q) => canonifyQuery(q), queryEquals);
}
function eventManagerListen(eventManager, listener) {
  return __async(this, null, function* () {
    const eventManagerImpl = debugCast(eventManager);
    let listenerAction = 3;
    const query3 = listener.query;
    let queryInfo = eventManagerImpl.queries.get(query3);
    if (!queryInfo) {
      queryInfo = new QueryListenersInfo();
      listenerAction = listener.listensToRemoteStore() ? 0 : 1;
    } else if (!queryInfo.hasRemoteListeners() && listener.listensToRemoteStore()) {
      listenerAction = 2;
    }
    try {
      switch (listenerAction) {
        case 0:
          queryInfo.viewSnap = yield eventManagerImpl.onListen(
            query3,
            /** enableRemoteListen= */
            true
          );
          break;
        case 1:
          queryInfo.viewSnap = yield eventManagerImpl.onListen(
            query3,
            /** enableRemoteListen= */
            false
          );
          break;
        case 2:
          yield eventManagerImpl.onFirstRemoteStoreListen(query3);
          break;
        default:
          break;
      }
    } catch (e) {
      const firestoreError = wrapInUserErrorIfRecoverable(e, `Initialization of query '${stringifyQuery(listener.query)}' failed`);
      listener.onError(firestoreError);
      return;
    }
    eventManagerImpl.queries.set(query3, queryInfo);
    queryInfo.listeners.push(listener);
    listener.applyOnlineStateChange(eventManagerImpl.onlineState);
    if (queryInfo.viewSnap) {
      const raisedEvent = listener.onViewSnapshot(queryInfo.viewSnap);
      if (raisedEvent) {
        raiseSnapshotsInSyncEvent(eventManagerImpl);
      }
    }
  });
}
function eventManagerUnlisten(eventManager, listener) {
  return __async(this, null, function* () {
    const eventManagerImpl = debugCast(eventManager);
    const query3 = listener.query;
    let listenerAction = 3;
    const queryInfo = eventManagerImpl.queries.get(query3);
    if (queryInfo) {
      const i = queryInfo.listeners.indexOf(listener);
      if (i >= 0) {
        queryInfo.listeners.splice(i, 1);
        if (queryInfo.listeners.length === 0) {
          listenerAction = listener.listensToRemoteStore() ? 0 : 1;
        } else if (!queryInfo.hasRemoteListeners() && listener.listensToRemoteStore()) {
          listenerAction = 2;
        }
      }
    }
    switch (listenerAction) {
      case 0:
        eventManagerImpl.queries.delete(query3);
        return eventManagerImpl.onUnlisten(
          query3,
          /** disableRemoteListen= */
          true
        );
      case 1:
        eventManagerImpl.queries.delete(query3);
        return eventManagerImpl.onUnlisten(
          query3,
          /** disableRemoteListen= */
          false
        );
      case 2:
        return eventManagerImpl.onLastRemoteStoreUnlisten(query3);
      default:
        return;
    }
  });
}
function eventManagerOnWatchChange(eventManager, viewSnaps) {
  const eventManagerImpl = debugCast(eventManager);
  let raisedEvent = false;
  for (const viewSnap of viewSnaps) {
    const query3 = viewSnap.query;
    const queryInfo = eventManagerImpl.queries.get(query3);
    if (queryInfo) {
      for (const listener of queryInfo.listeners) {
        if (listener.onViewSnapshot(viewSnap)) {
          raisedEvent = true;
        }
      }
      queryInfo.viewSnap = viewSnap;
    }
  }
  if (raisedEvent) {
    raiseSnapshotsInSyncEvent(eventManagerImpl);
  }
}
function eventManagerOnWatchError(eventManager, query3, error) {
  const eventManagerImpl = debugCast(eventManager);
  const queryInfo = eventManagerImpl.queries.get(query3);
  if (queryInfo) {
    for (const listener of queryInfo.listeners) {
      listener.onError(error);
    }
  }
  eventManagerImpl.queries.delete(query3);
}
function eventManagerOnOnlineStateChange(eventManager, onlineState) {
  const eventManagerImpl = debugCast(eventManager);
  eventManagerImpl.onlineState = onlineState;
  let raisedEvent = false;
  eventManagerImpl.queries.forEach((_, queryInfo) => {
    for (const listener of queryInfo.listeners) {
      if (listener.applyOnlineStateChange(onlineState)) {
        raisedEvent = true;
      }
    }
  });
  if (raisedEvent) {
    raiseSnapshotsInSyncEvent(eventManagerImpl);
  }
}
function addSnapshotsInSyncListener(eventManager, observer) {
  const eventManagerImpl = debugCast(eventManager);
  eventManagerImpl.snapshotsInSyncListeners.add(observer);
  observer.next();
}
function removeSnapshotsInSyncListener(eventManager, observer) {
  const eventManagerImpl = debugCast(eventManager);
  eventManagerImpl.snapshotsInSyncListeners.delete(observer);
}
function errorAllTargets(eventManager, error) {
  const eventManagerImpl = debugCast(eventManager);
  const queries = eventManagerImpl.queries;
  eventManagerImpl.queries = newQueriesObjectMap();
  queries.forEach((_, queryInfo) => {
    for (const listener of queryInfo.listeners) {
      listener.onError(error);
    }
  });
}
function raiseSnapshotsInSyncEvent(eventManagerImpl) {
  eventManagerImpl.snapshotsInSyncListeners.forEach((observer) => {
    observer.next();
  });
}
var ListenerDataSource;
(function(ListenerDataSource2) {
  ListenerDataSource2["Default"] = "default";
  ListenerDataSource2["Cache"] = "cache";
})(ListenerDataSource || (ListenerDataSource = {}));
var QueryListener = class {
  constructor(query3, queryObserver, options) {
    this.query = query3;
    this.queryObserver = queryObserver;
    this.raisedInitialEvent = false;
    this.snap = null;
    this.onlineState = "Unknown";
    this.options = options || {};
  }
  /**
   * Applies the new ViewSnapshot to this listener, raising a user-facing event
   * if applicable (depending on what changed, whether the user has opted into
   * metadata-only changes, etc.). Returns true if a user-facing event was
   * indeed raised.
   */
  onViewSnapshot(snap) {
    if (!this.options.includeMetadataChanges) {
      const docChanges = [];
      for (const docChange of snap.docChanges) {
        if (docChange.type !== 3) {
          docChanges.push(docChange);
        }
      }
      snap = new ViewSnapshot(
        snap.query,
        snap.docs,
        snap.oldDocs,
        docChanges,
        snap.mutatedKeys,
        snap.fromCache,
        snap.syncStateChanged,
        /* excludesMetadataChanges= */
        true,
        snap.hasCachedResults
      );
    }
    let raisedEvent = false;
    if (!this.raisedInitialEvent) {
      if (this.shouldRaiseInitialEvent(snap, this.onlineState)) {
        this.raiseInitialEvent(snap);
        raisedEvent = true;
      }
    } else if (this.shouldRaiseEvent(snap)) {
      this.queryObserver.next(snap);
      raisedEvent = true;
    }
    this.snap = snap;
    return raisedEvent;
  }
  onError(error) {
    this.queryObserver.error(error);
  }
  /** Returns whether a snapshot was raised. */
  applyOnlineStateChange(onlineState) {
    this.onlineState = onlineState;
    let raisedEvent = false;
    if (this.snap && !this.raisedInitialEvent && this.shouldRaiseInitialEvent(this.snap, onlineState)) {
      this.raiseInitialEvent(this.snap);
      raisedEvent = true;
    }
    return raisedEvent;
  }
  shouldRaiseInitialEvent(snap, onlineState) {
    if (!snap.fromCache) {
      return true;
    }
    if (!this.listensToRemoteStore()) {
      return true;
    }
    const maybeOnline = onlineState !== "Offline";
    if (this.options.waitForSyncWhenOnline && maybeOnline) {
      return false;
    }
    return !snap.docs.isEmpty() || snap.hasCachedResults || onlineState === "Offline";
  }
  shouldRaiseEvent(snap) {
    if (snap.docChanges.length > 0) {
      return true;
    }
    const hasPendingWritesChanged = this.snap && this.snap.hasPendingWrites !== snap.hasPendingWrites;
    if (snap.syncStateChanged || hasPendingWritesChanged) {
      return this.options.includeMetadataChanges === true;
    }
    return false;
  }
  raiseInitialEvent(snap) {
    snap = ViewSnapshot.fromInitialDocuments(snap.query, snap.docs, snap.mutatedKeys, snap.fromCache, snap.hasCachedResults);
    this.raisedInitialEvent = true;
    this.queryObserver.next(snap);
  }
  listensToRemoteStore() {
    return this.options.source !== ListenerDataSource.Cache;
  }
};
var LocalViewChanges = class _LocalViewChanges {
  constructor(targetId, fromCache, addedKeys, removedKeys) {
    this.targetId = targetId;
    this.fromCache = fromCache;
    this.addedKeys = addedKeys;
    this.removedKeys = removedKeys;
  }
  static fromSnapshot(targetId, viewSnapshot) {
    let addedKeys = documentKeySet();
    let removedKeys = documentKeySet();
    for (const docChange of viewSnapshot.docChanges) {
      switch (docChange.type) {
        case 0:
          addedKeys = addedKeys.add(docChange.doc.key);
          break;
        case 1:
          removedKeys = removedKeys.add(docChange.doc.key);
          break;
      }
    }
    return new _LocalViewChanges(targetId, viewSnapshot.fromCache, addedKeys, removedKeys);
  }
};
var BundleConverterImpl = class {
  constructor(serializer) {
    this.serializer = serializer;
  }
  toDocumentKey(name2) {
    return fromName(this.serializer, name2);
  }
  /**
   * Converts a BundleDocument to a MutableDocument.
   */
  toMutableDocument(bundledDoc) {
    if (bundledDoc.metadata.exists) {
      return fromDocument(this.serializer, bundledDoc.document, false);
    } else {
      return MutableDocument.newNoDocument(this.toDocumentKey(bundledDoc.metadata.name), this.toSnapshotVersion(bundledDoc.metadata.readTime));
    }
  }
  toSnapshotVersion(time) {
    return fromVersion(time);
  }
};
var BundleLoader = class {
  constructor(bundleMetadata, localStore, serializer) {
    this.bundleMetadata = bundleMetadata;
    this.localStore = localStore;
    this.serializer = serializer;
    this.queries = [];
    this.documents = [];
    this.collectionGroups = /* @__PURE__ */ new Set();
    this.progress = bundleInitialProgress(bundleMetadata);
  }
  /**
   * Adds an element from the bundle to the loader.
   *
   * Returns a new progress if adding the element leads to a new progress,
   * otherwise returns null.
   */
  addSizedElement(element) {
    this.progress.bytesLoaded += element.byteLength;
    let documentsLoaded = this.progress.documentsLoaded;
    if (element.payload.namedQuery) {
      this.queries.push(element.payload.namedQuery);
    } else if (element.payload.documentMetadata) {
      this.documents.push({
        metadata: element.payload.documentMetadata
      });
      if (!element.payload.documentMetadata.exists) {
        ++documentsLoaded;
      }
      const path = ResourcePath.fromString(element.payload.documentMetadata.name);
      this.collectionGroups.add(path.get(path.length - 2));
    } else if (element.payload.document) {
      this.documents[this.documents.length - 1].document = element.payload.document;
      ++documentsLoaded;
    }
    if (documentsLoaded !== this.progress.documentsLoaded) {
      this.progress.documentsLoaded = documentsLoaded;
      return Object.assign({}, this.progress);
    }
    return null;
  }
  getQueryDocumentMapping(documents) {
    const queryDocumentMap = /* @__PURE__ */ new Map();
    const bundleConverter = new BundleConverterImpl(this.serializer);
    for (const bundleDoc of documents) {
      if (bundleDoc.metadata.queries) {
        const documentKey = bundleConverter.toDocumentKey(bundleDoc.metadata.name);
        for (const queryName of bundleDoc.metadata.queries) {
          const documentKeys = (queryDocumentMap.get(queryName) || documentKeySet()).add(documentKey);
          queryDocumentMap.set(queryName, documentKeys);
        }
      }
    }
    return queryDocumentMap;
  }
  /**
   * Update the progress to 'Success' and return the updated progress.
   */
  complete() {
    return __async(this, null, function* () {
      const changedDocs = yield localStoreApplyBundledDocuments(this.localStore, new BundleConverterImpl(this.serializer), this.documents, this.bundleMetadata.id);
      const queryDocumentMap = this.getQueryDocumentMapping(this.documents);
      for (const q of this.queries) {
        yield localStoreSaveNamedQuery(this.localStore, q, queryDocumentMap.get(q.name));
      }
      this.progress.taskState = "Success";
      return {
        progress: this.progress,
        changedCollectionGroups: this.collectionGroups,
        changedDocs
      };
    });
  }
};
function bundleInitialProgress(metadata) {
  return {
    taskState: "Running",
    documentsLoaded: 0,
    bytesLoaded: 0,
    totalDocuments: metadata.totalDocuments,
    totalBytes: metadata.totalBytes
  };
}
function bundleSuccessProgress(metadata) {
  return {
    taskState: "Success",
    documentsLoaded: metadata.totalDocuments,
    bytesLoaded: metadata.totalBytes,
    totalDocuments: metadata.totalDocuments,
    totalBytes: metadata.totalBytes
  };
}
var AddedLimboDocument = class {
  constructor(key) {
    this.key = key;
  }
};
var RemovedLimboDocument = class {
  constructor(key) {
    this.key = key;
  }
};
var View = class {
  constructor(query3, _syncedDocuments) {
    this.query = query3;
    this._syncedDocuments = _syncedDocuments;
    this.syncState = null;
    this.hasCachedResults = false;
    this.current = false;
    this.limboDocuments = documentKeySet();
    this.mutatedKeys = documentKeySet();
    this.docComparator = newQueryComparator(query3);
    this.documentSet = new DocumentSet(this.docComparator);
  }
  /**
   * The set of remote documents that the server has told us belongs to the target associated with
   * this view.
   */
  get syncedDocuments() {
    return this._syncedDocuments;
  }
  /**
   * Iterates over a set of doc changes, applies the query limit, and computes
   * what the new results should be, what the changes were, and whether we may
   * need to go back to the local cache for more results. Does not make any
   * changes to the view.
   * @param docChanges - The doc changes to apply to this view.
   * @param previousChanges - If this is being called with a refill, then start
   *        with this set of docs and changes instead of the current view.
   * @returns a new set of docs, changes, and refill flag.
   */
  computeDocChanges(docChanges, previousChanges) {
    const changeSet = previousChanges ? previousChanges.changeSet : new DocumentChangeSet();
    const oldDocumentSet = previousChanges ? previousChanges.documentSet : this.documentSet;
    let newMutatedKeys = previousChanges ? previousChanges.mutatedKeys : this.mutatedKeys;
    let newDocumentSet = oldDocumentSet;
    let needsRefill = false;
    const lastDocInLimit = this.query.limitType === "F" && oldDocumentSet.size === this.query.limit ? oldDocumentSet.last() : null;
    const firstDocInLimit = this.query.limitType === "L" && oldDocumentSet.size === this.query.limit ? oldDocumentSet.first() : null;
    docChanges.inorderTraversal((key, entry) => {
      const oldDoc = oldDocumentSet.get(key);
      const newDoc = queryMatches(this.query, entry) ? entry : null;
      const oldDocHadPendingMutations = oldDoc ? this.mutatedKeys.has(oldDoc.key) : false;
      const newDocHasPendingMutations = newDoc ? newDoc.hasLocalMutations || // We only consider committed mutations for documents that were
      // mutated during the lifetime of the view.
      this.mutatedKeys.has(newDoc.key) && newDoc.hasCommittedMutations : false;
      let changeApplied = false;
      if (oldDoc && newDoc) {
        const docsEqual = oldDoc.data.isEqual(newDoc.data);
        if (!docsEqual) {
          if (!this.shouldWaitForSyncedDocument(oldDoc, newDoc)) {
            changeSet.track({
              type: 2,
              doc: newDoc
            });
            changeApplied = true;
            if (lastDocInLimit && this.docComparator(newDoc, lastDocInLimit) > 0 || firstDocInLimit && this.docComparator(newDoc, firstDocInLimit) < 0) {
              needsRefill = true;
            }
          }
        } else if (oldDocHadPendingMutations !== newDocHasPendingMutations) {
          changeSet.track({
            type: 3,
            doc: newDoc
          });
          changeApplied = true;
        }
      } else if (!oldDoc && newDoc) {
        changeSet.track({
          type: 0,
          doc: newDoc
        });
        changeApplied = true;
      } else if (oldDoc && !newDoc) {
        changeSet.track({
          type: 1,
          doc: oldDoc
        });
        changeApplied = true;
        if (lastDocInLimit || firstDocInLimit) {
          needsRefill = true;
        }
      }
      if (changeApplied) {
        if (newDoc) {
          newDocumentSet = newDocumentSet.add(newDoc);
          if (newDocHasPendingMutations) {
            newMutatedKeys = newMutatedKeys.add(key);
          } else {
            newMutatedKeys = newMutatedKeys.delete(key);
          }
        } else {
          newDocumentSet = newDocumentSet.delete(key);
          newMutatedKeys = newMutatedKeys.delete(key);
        }
      }
    });
    if (this.query.limit !== null) {
      while (newDocumentSet.size > this.query.limit) {
        const oldDoc = this.query.limitType === "F" ? newDocumentSet.last() : newDocumentSet.first();
        newDocumentSet = newDocumentSet.delete(oldDoc.key);
        newMutatedKeys = newMutatedKeys.delete(oldDoc.key);
        changeSet.track({
          type: 1,
          doc: oldDoc
        });
      }
    }
    return {
      documentSet: newDocumentSet,
      changeSet,
      needsRefill,
      mutatedKeys: newMutatedKeys
    };
  }
  shouldWaitForSyncedDocument(oldDoc, newDoc) {
    return oldDoc.hasLocalMutations && newDoc.hasCommittedMutations && !newDoc.hasLocalMutations;
  }
  /**
   * Updates the view with the given ViewDocumentChanges and optionally updates
   * limbo docs and sync state from the provided target change.
   * @param docChanges - The set of changes to make to the view's docs.
   * @param limboResolutionEnabled - Whether to update limbo documents based on
   *        this change.
   * @param targetChange - A target change to apply for computing limbo docs and
   *        sync state.
   * @param targetIsPendingReset - Whether the target is pending to reset due to
   *        existence filter mismatch. If not explicitly specified, it is treated
   *        equivalently to `false`.
   * @returns A new ViewChange with the given docs, changes, and sync state.
   */
  // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
  applyChanges(docChanges, limboResolutionEnabled, targetChange, targetIsPendingReset) {
    const oldDocs = this.documentSet;
    this.documentSet = docChanges.documentSet;
    this.mutatedKeys = docChanges.mutatedKeys;
    const changes = docChanges.changeSet.getChanges();
    changes.sort((c1, c2) => {
      return compareChangeType(c1.type, c2.type) || this.docComparator(c1.doc, c2.doc);
    });
    this.applyTargetChange(targetChange);
    targetIsPendingReset = targetIsPendingReset !== null && targetIsPendingReset !== void 0 ? targetIsPendingReset : false;
    const limboChanges = limboResolutionEnabled && !targetIsPendingReset ? this.updateLimboDocuments() : [];
    const synced = this.limboDocuments.size === 0 && this.current && !targetIsPendingReset;
    const newSyncState = synced ? 1 : 0;
    const syncStateChanged = newSyncState !== this.syncState;
    this.syncState = newSyncState;
    if (changes.length === 0 && !syncStateChanged) {
      return {
        limboChanges
      };
    } else {
      const snap = new ViewSnapshot(
        this.query,
        docChanges.documentSet,
        oldDocs,
        changes,
        docChanges.mutatedKeys,
        newSyncState === 0,
        syncStateChanged,
        /* excludesMetadataChanges= */
        false,
        targetChange ? targetChange.resumeToken.approximateByteSize() > 0 : false
      );
      return {
        snapshot: snap,
        limboChanges
      };
    }
  }
  /**
   * Applies an OnlineState change to the view, potentially generating a
   * ViewChange if the view's syncState changes as a result.
   */
  applyOnlineStateChange(onlineState) {
    if (this.current && onlineState === "Offline") {
      this.current = false;
      return this.applyChanges(
        {
          documentSet: this.documentSet,
          changeSet: new DocumentChangeSet(),
          mutatedKeys: this.mutatedKeys,
          needsRefill: false
        },
        /* limboResolutionEnabled= */
        false
      );
    } else {
      return {
        limboChanges: []
      };
    }
  }
  /**
   * Returns whether the doc for the given key should be in limbo.
   */
  shouldBeInLimbo(key) {
    if (this._syncedDocuments.has(key)) {
      return false;
    }
    if (!this.documentSet.has(key)) {
      return false;
    }
    if (this.documentSet.get(key).hasLocalMutations) {
      return false;
    }
    return true;
  }
  /**
   * Updates syncedDocuments, current, and limbo docs based on the given change.
   * Returns the list of changes to which docs are in limbo.
   */
  applyTargetChange(targetChange) {
    if (targetChange) {
      targetChange.addedDocuments.forEach((key) => this._syncedDocuments = this._syncedDocuments.add(key));
      targetChange.modifiedDocuments.forEach((key) => {
      });
      targetChange.removedDocuments.forEach((key) => this._syncedDocuments = this._syncedDocuments.delete(key));
      this.current = targetChange.current;
    }
  }
  updateLimboDocuments() {
    if (!this.current) {
      return [];
    }
    const oldLimboDocuments = this.limboDocuments;
    this.limboDocuments = documentKeySet();
    this.documentSet.forEach((doc4) => {
      if (this.shouldBeInLimbo(doc4.key)) {
        this.limboDocuments = this.limboDocuments.add(doc4.key);
      }
    });
    const changes = [];
    oldLimboDocuments.forEach((key) => {
      if (!this.limboDocuments.has(key)) {
        changes.push(new RemovedLimboDocument(key));
      }
    });
    this.limboDocuments.forEach((key) => {
      if (!oldLimboDocuments.has(key)) {
        changes.push(new AddedLimboDocument(key));
      }
    });
    return changes;
  }
  /**
   * Update the in-memory state of the current view with the state read from
   * persistence.
   *
   * We update the query view whenever a client's primary status changes:
   * - When a client transitions from primary to secondary, it can miss
   *   LocalStorage updates and its query views may temporarily not be
   *   synchronized with the state on disk.
   * - For secondary to primary transitions, the client needs to update the list
   *   of `syncedDocuments` since secondary clients update their query views
   *   based purely on synthesized RemoteEvents.
   *
   * @param queryResult.documents - The documents that match the query according
   * to the LocalStore.
   * @param queryResult.remoteKeys - The keys of the documents that match the
   * query according to the backend.
   *
   * @returns The ViewChange that resulted from this synchronization.
   */
  // PORTING NOTE: Multi-tab only.
  synchronizeWithPersistedState(queryResult) {
    this._syncedDocuments = queryResult.remoteKeys;
    this.limboDocuments = documentKeySet();
    const docChanges = this.computeDocChanges(queryResult.documents);
    return this.applyChanges(
      docChanges,
      /* limboResolutionEnabled= */
      true
    );
  }
  /**
   * Returns a view snapshot as if this query was just listened to. Contains
   * a document add for every existing document and the `fromCache` and
   * `hasPendingWrites` status of the already established view.
   */
  // PORTING NOTE: Multi-tab only.
  computeInitialSnapshot() {
    return ViewSnapshot.fromInitialDocuments(this.query, this.documentSet, this.mutatedKeys, this.syncState === 0, this.hasCachedResults);
  }
};
function compareChangeType(c1, c2) {
  const order = (change) => {
    switch (change) {
      case 0:
        return 1;
      case 2:
        return 2;
      case 3:
        return 2;
      case 1:
        return 0;
      default:
        return fail();
    }
  };
  return order(c1) - order(c2);
}
var LOG_TAG$3 = "SyncEngine";
var QueryView = class {
  constructor(query3, targetId, view) {
    this.query = query3;
    this.targetId = targetId;
    this.view = view;
  }
};
var LimboResolution = class {
  constructor(key) {
    this.key = key;
    this.receivedDocument = false;
  }
};
var SyncEngineImpl = class {
  constructor(localStore, remoteStore, eventManager, sharedClientState, currentUser, maxConcurrentLimboResolutions) {
    this.localStore = localStore;
    this.remoteStore = remoteStore;
    this.eventManager = eventManager;
    this.sharedClientState = sharedClientState;
    this.currentUser = currentUser;
    this.maxConcurrentLimboResolutions = maxConcurrentLimboResolutions;
    this.syncEngineListener = {};
    this.queryViewsByQuery = new ObjectMap((q) => canonifyQuery(q), queryEquals);
    this.queriesByTarget = /* @__PURE__ */ new Map();
    this.enqueuedLimboResolutions = /* @__PURE__ */ new Set();
    this.activeLimboTargetsByKey = new SortedMap(DocumentKey.comparator);
    this.activeLimboResolutionsByTarget = /* @__PURE__ */ new Map();
    this.limboDocumentRefs = new ReferenceSet();
    this.mutationUserCallbacks = {};
    this.pendingWritesCallbacks = /* @__PURE__ */ new Map();
    this.limboTargetIdGenerator = TargetIdGenerator.forSyncEngine();
    this.onlineState = "Unknown";
    this._isPrimaryClient = void 0;
  }
  get isPrimaryClient() {
    return this._isPrimaryClient === true;
  }
};
function newSyncEngine(localStore, remoteStore, eventManager, sharedClientState, currentUser, maxConcurrentLimboResolutions, isPrimary) {
  const syncEngine = new SyncEngineImpl(localStore, remoteStore, eventManager, sharedClientState, currentUser, maxConcurrentLimboResolutions);
  if (isPrimary) {
    syncEngine._isPrimaryClient = true;
  }
  return syncEngine;
}
function syncEngineListen(syncEngine, query3, shouldListenToRemote = true) {
  return __async(this, null, function* () {
    const syncEngineImpl = ensureWatchCallbacks(syncEngine);
    let viewSnapshot;
    const queryView = syncEngineImpl.queryViewsByQuery.get(query3);
    if (queryView) {
      syncEngineImpl.sharedClientState.addLocalQueryTarget(queryView.targetId);
      viewSnapshot = queryView.view.computeInitialSnapshot();
    } else {
      viewSnapshot = yield allocateTargetAndMaybeListen(
        syncEngineImpl,
        query3,
        shouldListenToRemote,
        /** shouldInitializeView= */
        true
      );
    }
    return viewSnapshot;
  });
}
function triggerRemoteStoreListen(syncEngine, query3) {
  return __async(this, null, function* () {
    const syncEngineImpl = ensureWatchCallbacks(syncEngine);
    yield allocateTargetAndMaybeListen(
      syncEngineImpl,
      query3,
      /** shouldListenToRemote= */
      true,
      /** shouldInitializeView= */
      false
    );
  });
}
function allocateTargetAndMaybeListen(syncEngineImpl, query3, shouldListenToRemote, shouldInitializeView) {
  return __async(this, null, function* () {
    const targetData = yield localStoreAllocateTarget(syncEngineImpl.localStore, queryToTarget(query3));
    const targetId = targetData.targetId;
    const status = syncEngineImpl.sharedClientState.addLocalQueryTarget(
      targetId,
      /* addToActiveTargetIds= */
      shouldListenToRemote
    );
    let viewSnapshot;
    if (shouldInitializeView) {
      viewSnapshot = yield initializeViewAndComputeSnapshot(syncEngineImpl, query3, targetId, status === "current", targetData.resumeToken);
    }
    if (syncEngineImpl.isPrimaryClient && shouldListenToRemote) {
      remoteStoreListen(syncEngineImpl.remoteStore, targetData);
    }
    return viewSnapshot;
  });
}
function initializeViewAndComputeSnapshot(syncEngineImpl, query3, targetId, current, resumeToken) {
  return __async(this, null, function* () {
    syncEngineImpl.applyDocChanges = (queryView, changes, remoteEvent) => applyDocChanges(syncEngineImpl, queryView, changes, remoteEvent);
    const queryResult = yield localStoreExecuteQuery(
      syncEngineImpl.localStore,
      query3,
      /* usePreviousResults= */
      true
    );
    const view = new View(query3, queryResult.remoteKeys);
    const viewDocChanges = view.computeDocChanges(queryResult.documents);
    const synthesizedTargetChange = TargetChange.createSynthesizedTargetChangeForCurrentChange(targetId, current && syncEngineImpl.onlineState !== "Offline", resumeToken);
    const viewChange = view.applyChanges(
      viewDocChanges,
      /* limboResolutionEnabled= */
      syncEngineImpl.isPrimaryClient,
      synthesizedTargetChange
    );
    updateTrackedLimbos(syncEngineImpl, targetId, viewChange.limboChanges);
    const data = new QueryView(query3, targetId, view);
    syncEngineImpl.queryViewsByQuery.set(query3, data);
    if (syncEngineImpl.queriesByTarget.has(targetId)) {
      syncEngineImpl.queriesByTarget.get(targetId).push(query3);
    } else {
      syncEngineImpl.queriesByTarget.set(targetId, [query3]);
    }
    return viewChange.snapshot;
  });
}
function syncEngineUnlisten(syncEngine, query3, shouldUnlistenToRemote) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    const queryView = syncEngineImpl.queryViewsByQuery.get(query3);
    const queries = syncEngineImpl.queriesByTarget.get(queryView.targetId);
    if (queries.length > 1) {
      syncEngineImpl.queriesByTarget.set(queryView.targetId, queries.filter((q) => !queryEquals(q, query3)));
      syncEngineImpl.queryViewsByQuery.delete(query3);
      return;
    }
    if (syncEngineImpl.isPrimaryClient) {
      syncEngineImpl.sharedClientState.removeLocalQueryTarget(queryView.targetId);
      const targetRemainsActive = syncEngineImpl.sharedClientState.isActiveQueryTarget(queryView.targetId);
      if (!targetRemainsActive) {
        yield localStoreReleaseTarget(
          syncEngineImpl.localStore,
          queryView.targetId,
          /*keepPersistedTargetData=*/
          false
        ).then(() => {
          syncEngineImpl.sharedClientState.clearQueryState(queryView.targetId);
          if (shouldUnlistenToRemote) {
            remoteStoreUnlisten(syncEngineImpl.remoteStore, queryView.targetId);
          }
          removeAndCleanupTarget(syncEngineImpl, queryView.targetId);
        }).catch(ignoreIfPrimaryLeaseLoss);
      }
    } else {
      removeAndCleanupTarget(syncEngineImpl, queryView.targetId);
      yield localStoreReleaseTarget(
        syncEngineImpl.localStore,
        queryView.targetId,
        /*keepPersistedTargetData=*/
        true
      );
    }
  });
}
function triggerRemoteStoreUnlisten(syncEngine, query3) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    const queryView = syncEngineImpl.queryViewsByQuery.get(query3);
    const queries = syncEngineImpl.queriesByTarget.get(queryView.targetId);
    if (syncEngineImpl.isPrimaryClient && queries.length === 1) {
      syncEngineImpl.sharedClientState.removeLocalQueryTarget(queryView.targetId);
      remoteStoreUnlisten(syncEngineImpl.remoteStore, queryView.targetId);
    }
  });
}
function syncEngineWrite(syncEngine, batch, userCallback) {
  return __async(this, null, function* () {
    const syncEngineImpl = syncEngineEnsureWriteCallbacks(syncEngine);
    try {
      const result = yield localStoreWriteLocally(syncEngineImpl.localStore, batch);
      syncEngineImpl.sharedClientState.addPendingMutation(result.batchId);
      addMutationCallback(syncEngineImpl, result.batchId, userCallback);
      yield syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, result.changes);
      yield fillWritePipeline(syncEngineImpl.remoteStore);
    } catch (e) {
      const error = wrapInUserErrorIfRecoverable(e, `Failed to persist write`);
      userCallback.reject(error);
    }
  });
}
function syncEngineApplyRemoteEvent(syncEngine, remoteEvent) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    try {
      const changes = yield localStoreApplyRemoteEventToLocalCache(syncEngineImpl.localStore, remoteEvent);
      remoteEvent.targetChanges.forEach((targetChange, targetId) => {
        const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
        if (limboResolution) {
          hardAssert(targetChange.addedDocuments.size + targetChange.modifiedDocuments.size + targetChange.removedDocuments.size <= 1);
          if (targetChange.addedDocuments.size > 0) {
            limboResolution.receivedDocument = true;
          } else if (targetChange.modifiedDocuments.size > 0) {
            hardAssert(limboResolution.receivedDocument);
          } else if (targetChange.removedDocuments.size > 0) {
            hardAssert(limboResolution.receivedDocument);
            limboResolution.receivedDocument = false;
          } else {
          }
        }
      });
      yield syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes, remoteEvent);
    } catch (error) {
      yield ignoreIfPrimaryLeaseLoss(error);
    }
  });
}
function syncEngineApplyOnlineStateChange(syncEngine, onlineState, source) {
  const syncEngineImpl = debugCast(syncEngine);
  if (syncEngineImpl.isPrimaryClient && source === 0 || !syncEngineImpl.isPrimaryClient && source === 1) {
    const newViewSnapshots = [];
    syncEngineImpl.queryViewsByQuery.forEach((query3, queryView) => {
      const viewChange = queryView.view.applyOnlineStateChange(onlineState);
      if (viewChange.snapshot) {
        newViewSnapshots.push(viewChange.snapshot);
      }
    });
    eventManagerOnOnlineStateChange(syncEngineImpl.eventManager, onlineState);
    if (newViewSnapshots.length) {
      syncEngineImpl.syncEngineListener.onWatchChange(newViewSnapshots);
    }
    syncEngineImpl.onlineState = onlineState;
    if (syncEngineImpl.isPrimaryClient) {
      syncEngineImpl.sharedClientState.setOnlineState(onlineState);
    }
  }
}
function syncEngineRejectListen(syncEngine, targetId, err) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    syncEngineImpl.sharedClientState.updateQueryState(targetId, "rejected", err);
    const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
    const limboKey = limboResolution && limboResolution.key;
    if (limboKey) {
      let documentUpdates = new SortedMap(DocumentKey.comparator);
      documentUpdates = documentUpdates.insert(limboKey, MutableDocument.newNoDocument(limboKey, SnapshotVersion.min()));
      const resolvedLimboDocuments = documentKeySet().add(limboKey);
      const event = new RemoteEvent(
        SnapshotVersion.min(),
        /* targetChanges= */
        /* @__PURE__ */ new Map(),
        /* targetMismatches= */
        new SortedMap(primitiveComparator),
        documentUpdates,
        resolvedLimboDocuments
      );
      yield syncEngineApplyRemoteEvent(syncEngineImpl, event);
      syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.remove(limboKey);
      syncEngineImpl.activeLimboResolutionsByTarget.delete(targetId);
      pumpEnqueuedLimboResolutions(syncEngineImpl);
    } else {
      yield localStoreReleaseTarget(
        syncEngineImpl.localStore,
        targetId,
        /* keepPersistedTargetData */
        false
      ).then(() => removeAndCleanupTarget(syncEngineImpl, targetId, err)).catch(ignoreIfPrimaryLeaseLoss);
    }
  });
}
function syncEngineApplySuccessfulWrite(syncEngine, mutationBatchResult) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    const batchId = mutationBatchResult.batch.batchId;
    try {
      const changes = yield localStoreAcknowledgeBatch(syncEngineImpl.localStore, mutationBatchResult);
      processUserCallback(
        syncEngineImpl,
        batchId,
        /*error=*/
        null
      );
      triggerPendingWritesCallbacks(syncEngineImpl, batchId);
      syncEngineImpl.sharedClientState.updateMutationState(batchId, "acknowledged");
      yield syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes);
    } catch (error) {
      yield ignoreIfPrimaryLeaseLoss(error);
    }
  });
}
function syncEngineRejectFailedWrite(syncEngine, batchId, error) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    try {
      const changes = yield localStoreRejectBatch(syncEngineImpl.localStore, batchId);
      processUserCallback(syncEngineImpl, batchId, error);
      triggerPendingWritesCallbacks(syncEngineImpl, batchId);
      syncEngineImpl.sharedClientState.updateMutationState(batchId, "rejected", error);
      yield syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes);
    } catch (error2) {
      yield ignoreIfPrimaryLeaseLoss(error2);
    }
  });
}
function syncEngineRegisterPendingWritesCallback(syncEngine, callback) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    if (!canUseNetwork(syncEngineImpl.remoteStore)) {
      logDebug(LOG_TAG$3, "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
    }
    try {
      const highestBatchId = yield localStoreGetHighestUnacknowledgedBatchId(syncEngineImpl.localStore);
      if (highestBatchId === BATCHID_UNKNOWN) {
        callback.resolve();
        return;
      }
      const callbacks = syncEngineImpl.pendingWritesCallbacks.get(highestBatchId) || [];
      callbacks.push(callback);
      syncEngineImpl.pendingWritesCallbacks.set(highestBatchId, callbacks);
    } catch (e) {
      const firestoreError = wrapInUserErrorIfRecoverable(e, "Initialization of waitForPendingWrites() operation failed");
      callback.reject(firestoreError);
    }
  });
}
function triggerPendingWritesCallbacks(syncEngineImpl, batchId) {
  (syncEngineImpl.pendingWritesCallbacks.get(batchId) || []).forEach((callback) => {
    callback.resolve();
  });
  syncEngineImpl.pendingWritesCallbacks.delete(batchId);
}
function rejectOutstandingPendingWritesCallbacks(syncEngineImpl, errorMessage) {
  syncEngineImpl.pendingWritesCallbacks.forEach((callbacks) => {
    callbacks.forEach((callback) => {
      callback.reject(new FirestoreError(Code.CANCELLED, errorMessage));
    });
  });
  syncEngineImpl.pendingWritesCallbacks.clear();
}
function addMutationCallback(syncEngineImpl, batchId, callback) {
  let newCallbacks = syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()];
  if (!newCallbacks) {
    newCallbacks = new SortedMap(primitiveComparator);
  }
  newCallbacks = newCallbacks.insert(batchId, callback);
  syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()] = newCallbacks;
}
function processUserCallback(syncEngine, batchId, error) {
  const syncEngineImpl = debugCast(syncEngine);
  let newCallbacks = syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()];
  if (newCallbacks) {
    const callback = newCallbacks.get(batchId);
    if (callback) {
      if (error) {
        callback.reject(error);
      } else {
        callback.resolve();
      }
      newCallbacks = newCallbacks.remove(batchId);
    }
    syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()] = newCallbacks;
  }
}
function removeAndCleanupTarget(syncEngineImpl, targetId, error = null) {
  syncEngineImpl.sharedClientState.removeLocalQueryTarget(targetId);
  for (const query3 of syncEngineImpl.queriesByTarget.get(targetId)) {
    syncEngineImpl.queryViewsByQuery.delete(query3);
    if (error) {
      syncEngineImpl.syncEngineListener.onWatchError(query3, error);
    }
  }
  syncEngineImpl.queriesByTarget.delete(targetId);
  if (syncEngineImpl.isPrimaryClient) {
    const limboKeys = syncEngineImpl.limboDocumentRefs.removeReferencesForId(targetId);
    limboKeys.forEach((limboKey) => {
      const isReferenced = syncEngineImpl.limboDocumentRefs.containsKey(limboKey);
      if (!isReferenced) {
        removeLimboTarget(syncEngineImpl, limboKey);
      }
    });
  }
}
function removeLimboTarget(syncEngineImpl, key) {
  syncEngineImpl.enqueuedLimboResolutions.delete(key.path.canonicalString());
  const limboTargetId = syncEngineImpl.activeLimboTargetsByKey.get(key);
  if (limboTargetId === null) {
    return;
  }
  remoteStoreUnlisten(syncEngineImpl.remoteStore, limboTargetId);
  syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.remove(key);
  syncEngineImpl.activeLimboResolutionsByTarget.delete(limboTargetId);
  pumpEnqueuedLimboResolutions(syncEngineImpl);
}
function updateTrackedLimbos(syncEngineImpl, targetId, limboChanges) {
  for (const limboChange of limboChanges) {
    if (limboChange instanceof AddedLimboDocument) {
      syncEngineImpl.limboDocumentRefs.addReference(limboChange.key, targetId);
      trackLimboChange(syncEngineImpl, limboChange);
    } else if (limboChange instanceof RemovedLimboDocument) {
      logDebug(LOG_TAG$3, "Document no longer in limbo: " + limboChange.key);
      syncEngineImpl.limboDocumentRefs.removeReference(limboChange.key, targetId);
      const isReferenced = syncEngineImpl.limboDocumentRefs.containsKey(limboChange.key);
      if (!isReferenced) {
        removeLimboTarget(syncEngineImpl, limboChange.key);
      }
    } else {
      fail();
    }
  }
}
function trackLimboChange(syncEngineImpl, limboChange) {
  const key = limboChange.key;
  const keyString = key.path.canonicalString();
  if (!syncEngineImpl.activeLimboTargetsByKey.get(key) && !syncEngineImpl.enqueuedLimboResolutions.has(keyString)) {
    logDebug(LOG_TAG$3, "New document in limbo: " + key);
    syncEngineImpl.enqueuedLimboResolutions.add(keyString);
    pumpEnqueuedLimboResolutions(syncEngineImpl);
  }
}
function pumpEnqueuedLimboResolutions(syncEngineImpl) {
  while (syncEngineImpl.enqueuedLimboResolutions.size > 0 && syncEngineImpl.activeLimboTargetsByKey.size < syncEngineImpl.maxConcurrentLimboResolutions) {
    const keyString = syncEngineImpl.enqueuedLimboResolutions.values().next().value;
    syncEngineImpl.enqueuedLimboResolutions.delete(keyString);
    const key = new DocumentKey(ResourcePath.fromString(keyString));
    const limboTargetId = syncEngineImpl.limboTargetIdGenerator.next();
    syncEngineImpl.activeLimboResolutionsByTarget.set(limboTargetId, new LimboResolution(key));
    syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.insert(key, limboTargetId);
    remoteStoreListen(syncEngineImpl.remoteStore, new TargetData(queryToTarget(newQueryForPath(key.path)), limboTargetId, "TargetPurposeLimboResolution", ListenSequence.INVALID));
  }
}
function syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngine, changes, remoteEvent) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    const newSnaps = [];
    const docChangesInAllViews = [];
    const queriesProcessed = [];
    if (syncEngineImpl.queryViewsByQuery.isEmpty()) {
      return;
    }
    syncEngineImpl.queryViewsByQuery.forEach((_, queryView) => {
      queriesProcessed.push(syncEngineImpl.applyDocChanges(queryView, changes, remoteEvent).then((viewSnapshot) => {
        var _a;
        if (viewSnapshot || remoteEvent) {
          if (syncEngineImpl.isPrimaryClient) {
            const isCurrent = viewSnapshot ? !viewSnapshot.fromCache : (_a = remoteEvent === null || remoteEvent === void 0 ? void 0 : remoteEvent.targetChanges.get(queryView.targetId)) === null || _a === void 0 ? void 0 : _a.current;
            syncEngineImpl.sharedClientState.updateQueryState(queryView.targetId, isCurrent ? "current" : "not-current");
          }
        }
        if (!!viewSnapshot) {
          newSnaps.push(viewSnapshot);
          const docChanges = LocalViewChanges.fromSnapshot(queryView.targetId, viewSnapshot);
          docChangesInAllViews.push(docChanges);
        }
      }));
    });
    yield Promise.all(queriesProcessed);
    syncEngineImpl.syncEngineListener.onWatchChange(newSnaps);
    yield localStoreNotifyLocalViewChanges(syncEngineImpl.localStore, docChangesInAllViews);
  });
}
function applyDocChanges(syncEngineImpl, queryView, changes, remoteEvent) {
  return __async(this, null, function* () {
    let viewDocChanges = queryView.view.computeDocChanges(changes);
    if (viewDocChanges.needsRefill) {
      viewDocChanges = yield localStoreExecuteQuery(
        syncEngineImpl.localStore,
        queryView.query,
        /* usePreviousResults= */
        false
      ).then(({
        documents
      }) => {
        return queryView.view.computeDocChanges(documents, viewDocChanges);
      });
    }
    const targetChange = remoteEvent && remoteEvent.targetChanges.get(queryView.targetId);
    const targetIsPendingReset = remoteEvent && remoteEvent.targetMismatches.get(queryView.targetId) != null;
    const viewChange = queryView.view.applyChanges(
      viewDocChanges,
      /* limboResolutionEnabled= */
      syncEngineImpl.isPrimaryClient,
      targetChange,
      targetIsPendingReset
    );
    updateTrackedLimbos(syncEngineImpl, queryView.targetId, viewChange.limboChanges);
    return viewChange.snapshot;
  });
}
function syncEngineHandleCredentialChange(syncEngine, user) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    const userChanged = !syncEngineImpl.currentUser.isEqual(user);
    if (userChanged) {
      logDebug(LOG_TAG$3, "User change. New user:", user.toKey());
      const result = yield localStoreHandleUserChange(syncEngineImpl.localStore, user);
      syncEngineImpl.currentUser = user;
      rejectOutstandingPendingWritesCallbacks(syncEngineImpl, "'waitForPendingWrites' promise is rejected due to a user change.");
      syncEngineImpl.sharedClientState.handleUserChange(user, result.removedBatchIds, result.addedBatchIds);
      yield syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, result.affectedDocuments);
    }
  });
}
function syncEngineGetRemoteKeysForTarget(syncEngine, targetId) {
  const syncEngineImpl = debugCast(syncEngine);
  const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
  if (limboResolution && limboResolution.receivedDocument) {
    return documentKeySet().add(limboResolution.key);
  } else {
    let keySet = documentKeySet();
    const queries = syncEngineImpl.queriesByTarget.get(targetId);
    if (!queries) {
      return keySet;
    }
    for (const query3 of queries) {
      const queryView = syncEngineImpl.queryViewsByQuery.get(query3);
      keySet = keySet.unionWith(queryView.view.syncedDocuments);
    }
    return keySet;
  }
}
function synchronizeViewAndComputeSnapshot(syncEngine, queryView) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    const queryResult = yield localStoreExecuteQuery(
      syncEngineImpl.localStore,
      queryView.query,
      /* usePreviousResults= */
      true
    );
    const viewSnapshot = queryView.view.synchronizeWithPersistedState(queryResult);
    if (syncEngineImpl.isPrimaryClient) {
      updateTrackedLimbos(syncEngineImpl, queryView.targetId, viewSnapshot.limboChanges);
    }
    return viewSnapshot;
  });
}
function syncEngineSynchronizeWithChangedDocuments(syncEngine, collectionGroup3) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    return localStoreGetNewDocumentChanges(syncEngineImpl.localStore, collectionGroup3).then((changes) => syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes));
  });
}
function syncEngineApplyBatchState(syncEngine, batchId, batchState, error) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    const documents = yield localStoreLookupMutationDocuments(syncEngineImpl.localStore, batchId);
    if (documents === null) {
      logDebug(LOG_TAG$3, "Cannot apply mutation batch with id: " + batchId);
      return;
    }
    if (batchState === "pending") {
      yield fillWritePipeline(syncEngineImpl.remoteStore);
    } else if (batchState === "acknowledged" || batchState === "rejected") {
      processUserCallback(syncEngineImpl, batchId, error ? error : null);
      triggerPendingWritesCallbacks(syncEngineImpl, batchId);
      localStoreRemoveCachedMutationBatchMetadata(syncEngineImpl.localStore, batchId);
    } else {
      fail();
    }
    yield syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, documents);
  });
}
function syncEngineApplyPrimaryState(syncEngine, isPrimary) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    ensureWatchCallbacks(syncEngineImpl);
    syncEngineEnsureWriteCallbacks(syncEngineImpl);
    if (isPrimary === true && syncEngineImpl._isPrimaryClient !== true) {
      const activeTargets = syncEngineImpl.sharedClientState.getAllActiveQueryTargets();
      const activeQueries = yield synchronizeQueryViewsAndRaiseSnapshots(syncEngineImpl, activeTargets.toArray());
      syncEngineImpl._isPrimaryClient = true;
      yield remoteStoreApplyPrimaryState(syncEngineImpl.remoteStore, true);
      for (const targetData of activeQueries) {
        remoteStoreListen(syncEngineImpl.remoteStore, targetData);
      }
    } else if (isPrimary === false && syncEngineImpl._isPrimaryClient !== false) {
      const activeTargets = [];
      let p = Promise.resolve();
      syncEngineImpl.queriesByTarget.forEach((_, targetId) => {
        if (syncEngineImpl.sharedClientState.isLocalQueryTarget(targetId)) {
          activeTargets.push(targetId);
        } else {
          p = p.then(() => {
            removeAndCleanupTarget(syncEngineImpl, targetId);
            return localStoreReleaseTarget(
              syncEngineImpl.localStore,
              targetId,
              /*keepPersistedTargetData=*/
              true
            );
          });
        }
        remoteStoreUnlisten(syncEngineImpl.remoteStore, targetId);
      });
      yield p;
      yield synchronizeQueryViewsAndRaiseSnapshots(syncEngineImpl, activeTargets);
      resetLimboDocuments(syncEngineImpl);
      syncEngineImpl._isPrimaryClient = false;
      yield remoteStoreApplyPrimaryState(syncEngineImpl.remoteStore, false);
    }
  });
}
function resetLimboDocuments(syncEngine) {
  const syncEngineImpl = debugCast(syncEngine);
  syncEngineImpl.activeLimboResolutionsByTarget.forEach((_, targetId) => {
    remoteStoreUnlisten(syncEngineImpl.remoteStore, targetId);
  });
  syncEngineImpl.limboDocumentRefs.removeAllReferences();
  syncEngineImpl.activeLimboResolutionsByTarget = /* @__PURE__ */ new Map();
  syncEngineImpl.activeLimboTargetsByKey = new SortedMap(DocumentKey.comparator);
}
function synchronizeQueryViewsAndRaiseSnapshots(syncEngine, targets, transitionToPrimary) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    const activeQueries = [];
    const newViewSnapshots = [];
    for (const targetId of targets) {
      let targetData;
      const queries = syncEngineImpl.queriesByTarget.get(targetId);
      if (queries && queries.length !== 0) {
        targetData = yield localStoreAllocateTarget(syncEngineImpl.localStore, queryToTarget(queries[0]));
        for (const query3 of queries) {
          const queryView = syncEngineImpl.queryViewsByQuery.get(query3);
          const viewChange = yield synchronizeViewAndComputeSnapshot(syncEngineImpl, queryView);
          if (viewChange.snapshot) {
            newViewSnapshots.push(viewChange.snapshot);
          }
        }
      } else {
        const target = yield localStoreGetCachedTarget(syncEngineImpl.localStore, targetId);
        targetData = yield localStoreAllocateTarget(syncEngineImpl.localStore, target);
        yield initializeViewAndComputeSnapshot(
          syncEngineImpl,
          synthesizeTargetToQuery(target),
          targetId,
          /*current=*/
          false,
          targetData.resumeToken
        );
      }
      activeQueries.push(targetData);
    }
    syncEngineImpl.syncEngineListener.onWatchChange(newViewSnapshots);
    return activeQueries;
  });
}
function synthesizeTargetToQuery(target) {
  return newQuery(target.path, target.collectionGroup, target.orderBy, target.filters, target.limit, "F", target.startAt, target.endAt);
}
function syncEngineGetActiveClients(syncEngine) {
  const syncEngineImpl = debugCast(syncEngine);
  return localStoreGetActiveClients(syncEngineImpl.localStore);
}
function syncEngineApplyTargetState(syncEngine, targetId, state, error) {
  return __async(this, null, function* () {
    const syncEngineImpl = debugCast(syncEngine);
    if (syncEngineImpl._isPrimaryClient) {
      logDebug(LOG_TAG$3, "Ignoring unexpected query state notification.");
      return;
    }
    const query3 = syncEngineImpl.queriesByTarget.get(targetId);
    if (query3 && query3.length > 0) {
      switch (state) {
        case "current":
        case "not-current": {
          const changes = yield localStoreGetNewDocumentChanges(syncEngineImpl.localStore, queryCollectionGroup(query3[0]));
          const synthesizedRemoteEvent = RemoteEvent.createSynthesizedRemoteEventForCurrentChange(targetId, state === "current", ByteString.EMPTY_BYTE_STRING);
          yield syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes, synthesizedRemoteEvent);
          break;
        }
        case "rejected": {
          yield localStoreReleaseTarget(
            syncEngineImpl.localStore,
            targetId,
            /* keepPersistedTargetData */
            true
          );
          removeAndCleanupTarget(syncEngineImpl, targetId, error);
          break;
        }
        default:
          fail();
      }
    }
  });
}
function syncEngineApplyActiveTargetsChange(syncEngine, added, removed) {
  return __async(this, null, function* () {
    const syncEngineImpl = ensureWatchCallbacks(syncEngine);
    if (!syncEngineImpl._isPrimaryClient) {
      return;
    }
    for (const targetId of added) {
      const targetAlreadyListeningToRemoteStore = syncEngineImpl.queriesByTarget.has(targetId) && syncEngineImpl.sharedClientState.isActiveQueryTarget(targetId);
      if (targetAlreadyListeningToRemoteStore) {
        logDebug(LOG_TAG$3, "Adding an already active target " + targetId);
        continue;
      }
      const target = yield localStoreGetCachedTarget(syncEngineImpl.localStore, targetId);
      const targetData = yield localStoreAllocateTarget(syncEngineImpl.localStore, target);
      yield initializeViewAndComputeSnapshot(
        syncEngineImpl,
        synthesizeTargetToQuery(target),
        targetData.targetId,
        /*current=*/
        false,
        targetData.resumeToken
      );
      remoteStoreListen(syncEngineImpl.remoteStore, targetData);
    }
    for (const targetId of removed) {
      if (!syncEngineImpl.queriesByTarget.has(targetId)) {
        continue;
      }
      yield localStoreReleaseTarget(
        syncEngineImpl.localStore,
        targetId,
        /* keepPersistedTargetData */
        false
      ).then(() => {
        remoteStoreUnlisten(syncEngineImpl.remoteStore, targetId);
        removeAndCleanupTarget(syncEngineImpl, targetId);
      }).catch(ignoreIfPrimaryLeaseLoss);
    }
  });
}
function ensureWatchCallbacks(syncEngine) {
  const syncEngineImpl = debugCast(syncEngine);
  syncEngineImpl.remoteStore.remoteSyncer.applyRemoteEvent = syncEngineApplyRemoteEvent.bind(null, syncEngineImpl);
  syncEngineImpl.remoteStore.remoteSyncer.getRemoteKeysForTarget = syncEngineGetRemoteKeysForTarget.bind(null, syncEngineImpl);
  syncEngineImpl.remoteStore.remoteSyncer.rejectListen = syncEngineRejectListen.bind(null, syncEngineImpl);
  syncEngineImpl.syncEngineListener.onWatchChange = eventManagerOnWatchChange.bind(null, syncEngineImpl.eventManager);
  syncEngineImpl.syncEngineListener.onWatchError = eventManagerOnWatchError.bind(null, syncEngineImpl.eventManager);
  return syncEngineImpl;
}
function syncEngineEnsureWriteCallbacks(syncEngine) {
  const syncEngineImpl = debugCast(syncEngine);
  syncEngineImpl.remoteStore.remoteSyncer.applySuccessfulWrite = syncEngineApplySuccessfulWrite.bind(null, syncEngineImpl);
  syncEngineImpl.remoteStore.remoteSyncer.rejectFailedWrite = syncEngineRejectFailedWrite.bind(null, syncEngineImpl);
  return syncEngineImpl;
}
function syncEngineLoadBundle(syncEngine, bundleReader, task) {
  const syncEngineImpl = debugCast(syncEngine);
  loadBundleImpl(syncEngineImpl, bundleReader, task).then((collectionGroups) => {
    syncEngineImpl.sharedClientState.notifyBundleLoaded(collectionGroups);
  });
}
function loadBundleImpl(syncEngine, reader, task) {
  return __async(this, null, function* () {
    try {
      const metadata = yield reader.getMetadata();
      const skip = yield localStoreHasNewerBundle(syncEngine.localStore, metadata);
      if (skip) {
        yield reader.close();
        task._completeWith(bundleSuccessProgress(metadata));
        return Promise.resolve(/* @__PURE__ */ new Set());
      }
      task._updateProgress(bundleInitialProgress(metadata));
      const loader = new BundleLoader(metadata, syncEngine.localStore, reader.serializer);
      let element = yield reader.nextElement();
      while (element) {
        ;
        const progress = yield loader.addSizedElement(element);
        if (progress) {
          task._updateProgress(progress);
        }
        element = yield reader.nextElement();
      }
      const result = yield loader.complete();
      yield syncEngineEmitNewSnapsAndNotifyLocalStore(
        syncEngine,
        result.changedDocs,
        /* remoteEvent */
        void 0
      );
      yield localStoreSaveBundle(syncEngine.localStore, metadata);
      task._completeWith(result.progress);
      return Promise.resolve(result.changedCollectionGroups);
    } catch (e) {
      logWarn(LOG_TAG$3, `Loading bundle failed with ${e}`);
      task._failWith(e);
      return Promise.resolve(/* @__PURE__ */ new Set());
    }
  });
}
var MemoryOfflineComponentProvider = class {
  constructor() {
    this.kind = "memory";
    this.synchronizeTabs = false;
  }
  initialize(cfg) {
    return __async(this, null, function* () {
      this.serializer = newSerializer(cfg.databaseInfo.databaseId);
      this.sharedClientState = this.createSharedClientState(cfg);
      this.persistence = this.createPersistence(cfg);
      yield this.persistence.start();
      this.localStore = this.createLocalStore(cfg);
      this.gcScheduler = this.createGarbageCollectionScheduler(cfg, this.localStore);
      this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(cfg, this.localStore);
    });
  }
  createGarbageCollectionScheduler(cfg, localStore) {
    return null;
  }
  createIndexBackfillerScheduler(cfg, localStore) {
    return null;
  }
  createLocalStore(cfg) {
    return newLocalStore(this.persistence, new QueryEngine(), cfg.initialUser, this.serializer);
  }
  createPersistence(cfg) {
    return new MemoryPersistence(MemoryEagerDelegate.factory, this.serializer);
  }
  createSharedClientState(cfg) {
    return new MemorySharedClientState();
  }
  terminate() {
    return __async(this, null, function* () {
      var _a, _b;
      (_a = this.gcScheduler) === null || _a === void 0 ? void 0 : _a.stop();
      (_b = this.indexBackfillerScheduler) === null || _b === void 0 ? void 0 : _b.stop();
      this.sharedClientState.shutdown();
      yield this.persistence.shutdown();
    });
  }
};
MemoryOfflineComponentProvider.provider = {
  build: () => new MemoryOfflineComponentProvider()
};
var LruGcMemoryOfflineComponentProvider = class extends MemoryOfflineComponentProvider {
  constructor(cacheSizeBytes) {
    super();
    this.cacheSizeBytes = cacheSizeBytes;
  }
  createGarbageCollectionScheduler(cfg, localStore) {
    hardAssert(this.persistence.referenceDelegate instanceof MemoryLruDelegate);
    const garbageCollector = this.persistence.referenceDelegate.garbageCollector;
    return new LruScheduler(garbageCollector, cfg.asyncQueue, localStore);
  }
  createPersistence(cfg) {
    const lruParams = this.cacheSizeBytes !== void 0 ? LruParams.withCacheSize(this.cacheSizeBytes) : LruParams.DEFAULT;
    return new MemoryPersistence((p) => MemoryLruDelegate.factory(p, lruParams), this.serializer);
  }
};
var IndexedDbOfflineComponentProvider = class _IndexedDbOfflineComponentProvider extends MemoryOfflineComponentProvider {
  constructor(onlineComponentProvider, cacheSizeBytes, forceOwnership) {
    super();
    this.onlineComponentProvider = onlineComponentProvider;
    this.cacheSizeBytes = cacheSizeBytes;
    this.forceOwnership = forceOwnership;
    this.kind = "persistent";
    this.synchronizeTabs = false;
  }
  initialize(cfg) {
    return __async(this, null, function* () {
      yield __superGet(_IndexedDbOfflineComponentProvider.prototype, this, "initialize").call(this, cfg);
      yield this.onlineComponentProvider.initialize(this, cfg);
      yield syncEngineEnsureWriteCallbacks(this.onlineComponentProvider.syncEngine);
      yield fillWritePipeline(this.onlineComponentProvider.remoteStore);
      yield this.persistence.setPrimaryStateListener(() => {
        if (this.gcScheduler && !this.gcScheduler.started) {
          this.gcScheduler.start();
        }
        if (this.indexBackfillerScheduler && !this.indexBackfillerScheduler.started) {
          this.indexBackfillerScheduler.start();
        }
        return Promise.resolve();
      });
    });
  }
  createLocalStore(cfg) {
    return newLocalStore(this.persistence, new QueryEngine(), cfg.initialUser, this.serializer);
  }
  createGarbageCollectionScheduler(cfg, localStore) {
    const garbageCollector = this.persistence.referenceDelegate.garbageCollector;
    return new LruScheduler(garbageCollector, cfg.asyncQueue, localStore);
  }
  createIndexBackfillerScheduler(cfg, localStore) {
    const indexBackfiller = new IndexBackfiller(localStore, this.persistence);
    return new IndexBackfillerScheduler(cfg.asyncQueue, indexBackfiller);
  }
  createPersistence(cfg) {
    const persistenceKey = indexedDbStoragePrefix(cfg.databaseInfo.databaseId, cfg.databaseInfo.persistenceKey);
    const lruParams = this.cacheSizeBytes !== void 0 ? LruParams.withCacheSize(this.cacheSizeBytes) : LruParams.DEFAULT;
    return new IndexedDbPersistence(this.synchronizeTabs, persistenceKey, cfg.clientId, lruParams, cfg.asyncQueue, getWindow(), getDocument(), this.serializer, this.sharedClientState, !!this.forceOwnership);
  }
  createSharedClientState(cfg) {
    return new MemorySharedClientState();
  }
};
var MultiTabOfflineComponentProvider = class _MultiTabOfflineComponentProvider extends IndexedDbOfflineComponentProvider {
  constructor(onlineComponentProvider, cacheSizeBytes) {
    super(
      onlineComponentProvider,
      cacheSizeBytes,
      /* forceOwnership= */
      false
    );
    this.onlineComponentProvider = onlineComponentProvider;
    this.cacheSizeBytes = cacheSizeBytes;
    this.synchronizeTabs = true;
  }
  initialize(cfg) {
    return __async(this, null, function* () {
      yield __superGet(_MultiTabOfflineComponentProvider.prototype, this, "initialize").call(this, cfg);
      const syncEngine = this.onlineComponentProvider.syncEngine;
      if (this.sharedClientState instanceof WebStorageSharedClientState) {
        this.sharedClientState.syncEngine = {
          applyBatchState: syncEngineApplyBatchState.bind(null, syncEngine),
          applyTargetState: syncEngineApplyTargetState.bind(null, syncEngine),
          applyActiveTargetsChange: syncEngineApplyActiveTargetsChange.bind(null, syncEngine),
          getActiveClients: syncEngineGetActiveClients.bind(null, syncEngine),
          synchronizeWithChangedDocuments: syncEngineSynchronizeWithChangedDocuments.bind(null, syncEngine)
        };
        yield this.sharedClientState.start();
      }
      yield this.persistence.setPrimaryStateListener((isPrimary) => __async(this, null, function* () {
        yield syncEngineApplyPrimaryState(this.onlineComponentProvider.syncEngine, isPrimary);
        if (this.gcScheduler) {
          if (isPrimary && !this.gcScheduler.started) {
            this.gcScheduler.start();
          } else if (!isPrimary) {
            this.gcScheduler.stop();
          }
        }
        if (this.indexBackfillerScheduler) {
          if (isPrimary && !this.indexBackfillerScheduler.started) {
            this.indexBackfillerScheduler.start();
          } else if (!isPrimary) {
            this.indexBackfillerScheduler.stop();
          }
        }
      }));
    });
  }
  createSharedClientState(cfg) {
    const window2 = getWindow();
    if (!WebStorageSharedClientState.isAvailable(window2)) {
      throw new FirestoreError(Code.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
    }
    const persistenceKey = indexedDbStoragePrefix(cfg.databaseInfo.databaseId, cfg.databaseInfo.persistenceKey);
    return new WebStorageSharedClientState(window2, cfg.asyncQueue, persistenceKey, cfg.clientId, cfg.initialUser);
  }
};
var OnlineComponentProvider = class {
  initialize(offlineComponentProvider, cfg) {
    return __async(this, null, function* () {
      if (this.localStore) {
        return;
      }
      this.localStore = offlineComponentProvider.localStore;
      this.sharedClientState = offlineComponentProvider.sharedClientState;
      this.datastore = this.createDatastore(cfg);
      this.remoteStore = this.createRemoteStore(cfg);
      this.eventManager = this.createEventManager(cfg);
      this.syncEngine = this.createSyncEngine(
        cfg,
        /* startAsPrimary=*/
        !offlineComponentProvider.synchronizeTabs
      );
      this.sharedClientState.onlineStateHandler = (onlineState) => syncEngineApplyOnlineStateChange(
        this.syncEngine,
        onlineState,
        1
        /* OnlineStateSource.SharedClientState */
      );
      this.remoteStore.remoteSyncer.handleCredentialChange = syncEngineHandleCredentialChange.bind(null, this.syncEngine);
      yield remoteStoreApplyPrimaryState(this.remoteStore, this.syncEngine.isPrimaryClient);
    });
  }
  createEventManager(cfg) {
    return newEventManager();
  }
  createDatastore(cfg) {
    const serializer = newSerializer(cfg.databaseInfo.databaseId);
    const connection = newConnection(cfg.databaseInfo);
    return newDatastore(cfg.authCredentials, cfg.appCheckCredentials, connection, serializer);
  }
  createRemoteStore(cfg) {
    return newRemoteStore(this.localStore, this.datastore, cfg.asyncQueue, (onlineState) => syncEngineApplyOnlineStateChange(
      this.syncEngine,
      onlineState,
      0
      /* OnlineStateSource.RemoteStore */
    ), newConnectivityMonitor());
  }
  createSyncEngine(cfg, startAsPrimary) {
    return newSyncEngine(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, cfg.initialUser, cfg.maxConcurrentLimboResolutions, startAsPrimary);
  }
  terminate() {
    return __async(this, null, function* () {
      var _a, _b;
      yield remoteStoreShutdown(this.remoteStore);
      (_a = this.datastore) === null || _a === void 0 ? void 0 : _a.terminate();
      (_b = this.eventManager) === null || _b === void 0 ? void 0 : _b.terminate();
    });
  }
};
OnlineComponentProvider.provider = {
  build: () => new OnlineComponentProvider()
};
var DEFAULT_BYTES_PER_READ = 10240;
function toByteStreamReaderHelper(source, bytesPerRead = DEFAULT_BYTES_PER_READ) {
  let readFrom = 0;
  const reader = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    read() {
      return __async(this, null, function* () {
        if (readFrom < source.byteLength) {
          const result = {
            value: source.slice(readFrom, readFrom + bytesPerRead),
            done: false
          };
          readFrom += bytesPerRead;
          return result;
        }
        return {
          done: true
        };
      });
    },
    cancel() {
      return __async(this, null, function* () {
      });
    },
    releaseLock() {
    },
    closed: Promise.resolve()
  };
  return reader;
}
function validateNonEmptyArgument(functionName, argumentName, argument) {
  if (!argument) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${functionName}() cannot be called with an empty ${argumentName}.`);
  }
}
function validateIsNotUsedTogether(optionName1, argument1, optionName2, argument2) {
  if (argument1 === true && argument2 === true) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `${optionName1} and ${optionName2} cannot be used together.`);
  }
}
function validateDocumentPath(path) {
  if (!DocumentKey.isDocumentKey(path)) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${path} has ${path.length}.`);
  }
}
function validateCollectionPath(path) {
  if (DocumentKey.isDocumentKey(path)) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${path} has ${path.length}.`);
  }
}
function isPlainObject(input) {
  return typeof input === "object" && input !== null && (Object.getPrototypeOf(input) === Object.prototype || Object.getPrototypeOf(input) === null);
}
function valueDescription(input) {
  if (input === void 0) {
    return "undefined";
  } else if (input === null) {
    return "null";
  } else if (typeof input === "string") {
    if (input.length > 20) {
      input = `${input.substring(0, 20)}...`;
    }
    return JSON.stringify(input);
  } else if (typeof input === "number" || typeof input === "boolean") {
    return "" + input;
  } else if (typeof input === "object") {
    if (input instanceof Array) {
      return "an array";
    } else {
      const customObjectName = tryGetCustomObjectType(input);
      if (customObjectName) {
        return `a custom ${customObjectName} object`;
      } else {
        return "an object";
      }
    }
  } else if (typeof input === "function") {
    return "a function";
  } else {
    return fail();
  }
}
function tryGetCustomObjectType(input) {
  if (input.constructor) {
    return input.constructor.name;
  }
  return null;
}
function cast(obj, constructor) {
  if ("_delegate" in obj) {
    obj = obj._delegate;
  }
  if (!(obj instanceof constructor)) {
    if (constructor.name === obj.constructor.name) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?`);
    } else {
      const description = valueDescription(obj);
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Expected type '${constructor.name}', but it was: ${description}`);
    }
  }
  return obj;
}
function validatePositiveNumber(functionName, n) {
  if (n <= 0) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${functionName}() requires a positive number, but it was: ${n}.`);
  }
}
function toByteStreamReader(source, bytesPerRead) {
  if (!(source instanceof Uint8Array)) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `NodePlatform.toByteStreamReader expects source to be Uint8Array, got ${valueDescription(source)}`);
  }
  return toByteStreamReaderHelper(source, bytesPerRead);
}
var AsyncObserver = class {
  constructor(observer) {
    this.observer = observer;
    this.muted = false;
  }
  next(value) {
    if (this.muted) {
      return;
    }
    if (this.observer.next) {
      this.scheduleEvent(this.observer.next, value);
    }
  }
  error(error) {
    if (this.muted) {
      return;
    }
    if (this.observer.error) {
      this.scheduleEvent(this.observer.error, error);
    } else {
      logError("Uncaught Error in snapshot listener:", error.toString());
    }
  }
  mute() {
    this.muted = true;
  }
  scheduleEvent(eventHandler, event) {
    setTimeout(() => {
      if (!this.muted) {
        eventHandler(event);
      }
    }, 0);
  }
};
var SizedBundleElement = class {
  constructor(payload, byteLength) {
    this.payload = payload;
    this.byteLength = byteLength;
  }
  isBundleMetadata() {
    return "metadata" in this.payload;
  }
};
var BundleReaderImpl = class {
  constructor(reader, serializer) {
    this.reader = reader;
    this.serializer = serializer;
    this.metadata = new Deferred();
    this.buffer = new Uint8Array();
    this.textDecoder = newTextDecoder();
    this.nextElementImpl().then((element) => {
      if (element && element.isBundleMetadata()) {
        this.metadata.resolve(element.payload.metadata);
      } else {
        this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(element === null || element === void 0 ? void 0 : element.payload)}`));
      }
    }, (error) => this.metadata.reject(error));
  }
  close() {
    return this.reader.cancel();
  }
  getMetadata() {
    return __async(this, null, function* () {
      return this.metadata.promise;
    });
  }
  nextElement() {
    return __async(this, null, function* () {
      yield this.getMetadata();
      return this.nextElementImpl();
    });
  }
  /**
   * Reads from the head of internal buffer, and pulling more data from
   * underlying stream if a complete element cannot be found, until an
   * element(including the prefixed length and the JSON string) is found.
   *
   * Once a complete element is read, it is dropped from internal buffer.
   *
   * Returns either the bundled element, or null if we have reached the end of
   * the stream.
   */
  nextElementImpl() {
    return __async(this, null, function* () {
      const lengthBuffer = yield this.readLength();
      if (lengthBuffer === null) {
        return null;
      }
      const lengthString = this.textDecoder.decode(lengthBuffer);
      const length = Number(lengthString);
      if (isNaN(length)) {
        this.raiseError(`length string (${lengthString}) is not valid number`);
      }
      const jsonString = yield this.readJsonString(length);
      return new SizedBundleElement(JSON.parse(jsonString), lengthBuffer.length + length);
    });
  }
  /** First index of '{' from the underlying buffer. */
  indexOfOpenBracket() {
    return this.buffer.findIndex((v) => v === "{".charCodeAt(0));
  }
  /**
   * Reads from the beginning of the internal buffer, until the first '{', and
   * return the content.
   *
   * If reached end of the stream, returns a null.
   */
  readLength() {
    return __async(this, null, function* () {
      while (this.indexOfOpenBracket() < 0) {
        const done = yield this.pullMoreDataToBuffer();
        if (done) {
          break;
        }
      }
      if (this.buffer.length === 0) {
        return null;
      }
      const position = this.indexOfOpenBracket();
      if (position < 0) {
        this.raiseError("Reached the end of bundle when a length string is expected.");
      }
      const result = this.buffer.slice(0, position);
      this.buffer = this.buffer.slice(position);
      return result;
    });
  }
  /**
   * Reads from a specified position from the internal buffer, for a specified
   * number of bytes, pulling more data from the underlying stream if needed.
   *
   * Returns a string decoded from the read bytes.
   */
  readJsonString(length) {
    return __async(this, null, function* () {
      while (this.buffer.length < length) {
        const done = yield this.pullMoreDataToBuffer();
        if (done) {
          this.raiseError("Reached the end of bundle when more is expected.");
        }
      }
      const result = this.textDecoder.decode(this.buffer.slice(0, length));
      this.buffer = this.buffer.slice(length);
      return result;
    });
  }
  raiseError(message) {
    this.reader.cancel();
    throw new Error(`Invalid bundle format: ${message}`);
  }
  /**
   * Pulls more data from underlying stream to internal buffer.
   * Returns a boolean indicating whether the stream is finished.
   */
  pullMoreDataToBuffer() {
    return __async(this, null, function* () {
      const result = yield this.reader.read();
      if (!result.done) {
        const newBuffer = new Uint8Array(this.buffer.length + result.value.length);
        newBuffer.set(this.buffer);
        newBuffer.set(result.value, this.buffer.length);
        this.buffer = newBuffer;
      }
      return result.done;
    });
  }
};
function newBundleReader(reader, serializer) {
  return new BundleReaderImpl(reader, serializer);
}
var Transaction$2 = class {
  constructor(datastore) {
    this.datastore = datastore;
    this.readVersions = /* @__PURE__ */ new Map();
    this.mutations = [];
    this.committed = false;
    this.lastTransactionError = null;
    this.writtenDocs = /* @__PURE__ */ new Set();
  }
  lookup(keys) {
    return __async(this, null, function* () {
      this.ensureCommitNotCalled();
      if (this.mutations.length > 0) {
        this.lastTransactionError = new FirestoreError(Code.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
        throw this.lastTransactionError;
      }
      const docs = yield invokeBatchGetDocumentsRpc(this.datastore, keys);
      docs.forEach((doc4) => this.recordVersion(doc4));
      return docs;
    });
  }
  set(key, data) {
    this.write(data.toMutation(key, this.precondition(key)));
    this.writtenDocs.add(key.toString());
  }
  update(key, data) {
    try {
      this.write(data.toMutation(key, this.preconditionForUpdate(key)));
    } catch (e) {
      this.lastTransactionError = e;
    }
    this.writtenDocs.add(key.toString());
  }
  delete(key) {
    this.write(new DeleteMutation(key, this.precondition(key)));
    this.writtenDocs.add(key.toString());
  }
  commit() {
    return __async(this, null, function* () {
      this.ensureCommitNotCalled();
      if (this.lastTransactionError) {
        throw this.lastTransactionError;
      }
      const unwritten = this.readVersions;
      this.mutations.forEach((mutation) => {
        unwritten.delete(mutation.key.toString());
      });
      unwritten.forEach((_, path) => {
        const key = DocumentKey.fromPath(path);
        this.mutations.push(new VerifyMutation(key, this.precondition(key)));
      });
      yield invokeCommitRpc(this.datastore, this.mutations);
      this.committed = true;
    });
  }
  recordVersion(doc4) {
    let docVersion;
    if (doc4.isFoundDocument()) {
      docVersion = doc4.version;
    } else if (doc4.isNoDocument()) {
      docVersion = SnapshotVersion.min();
    } else {
      throw fail();
    }
    const existingVersion = this.readVersions.get(doc4.key.toString());
    if (existingVersion) {
      if (!docVersion.isEqual(existingVersion)) {
        throw new FirestoreError(Code.ABORTED, "Document version changed between two reads.");
      }
    } else {
      this.readVersions.set(doc4.key.toString(), docVersion);
    }
  }
  /**
   * Returns the version of this document when it was read in this transaction,
   * as a precondition, or no precondition if it was not read.
   */
  precondition(key) {
    const version2 = this.readVersions.get(key.toString());
    if (!this.writtenDocs.has(key.toString()) && version2) {
      if (version2.isEqual(SnapshotVersion.min())) {
        return Precondition.exists(false);
      } else {
        return Precondition.updateTime(version2);
      }
    } else {
      return Precondition.none();
    }
  }
  /**
   * Returns the precondition for a document if the operation is an update.
   */
  preconditionForUpdate(key) {
    const version2 = this.readVersions.get(key.toString());
    if (!this.writtenDocs.has(key.toString()) && version2) {
      if (version2.isEqual(SnapshotVersion.min())) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
      }
      return Precondition.updateTime(version2);
    } else {
      return Precondition.exists(true);
    }
  }
  write(mutation) {
    this.ensureCommitNotCalled();
    this.mutations.push(mutation);
  }
  ensureCommitNotCalled() {
  }
};
var TransactionRunner = class {
  constructor(asyncQueue, datastore, options, updateFunction, deferred) {
    this.asyncQueue = asyncQueue;
    this.datastore = datastore;
    this.options = options;
    this.updateFunction = updateFunction;
    this.deferred = deferred;
    this.attemptsRemaining = options.maxAttempts;
    this.backoff = new ExponentialBackoff(
      this.asyncQueue,
      "transaction_retry"
      /* TimerId.TransactionRetry */
    );
  }
  /** Runs the transaction and sets the result on deferred. */
  run() {
    this.attemptsRemaining -= 1;
    this.runWithBackOff();
  }
  runWithBackOff() {
    this.backoff.backoffAndRun(() => __async(this, null, function* () {
      const transaction = new Transaction$2(this.datastore);
      const userPromise = this.tryRunUpdateFunction(transaction);
      if (userPromise) {
        userPromise.then((result) => {
          this.asyncQueue.enqueueAndForget(() => {
            return transaction.commit().then(() => {
              this.deferred.resolve(result);
            }).catch((commitError) => {
              this.handleTransactionError(commitError);
            });
          });
        }).catch((userPromiseError) => {
          this.handleTransactionError(userPromiseError);
        });
      }
    }));
  }
  tryRunUpdateFunction(transaction) {
    try {
      const userPromise = this.updateFunction(transaction);
      if (isNullOrUndefined(userPromise) || !userPromise.catch || !userPromise.then) {
        this.deferred.reject(Error("Transaction callback must return a Promise"));
        return null;
      }
      return userPromise;
    } catch (error) {
      this.deferred.reject(error);
      return null;
    }
  }
  handleTransactionError(error) {
    if (this.attemptsRemaining > 0 && this.isRetryableTransactionError(error)) {
      this.attemptsRemaining -= 1;
      this.asyncQueue.enqueueAndForget(() => {
        this.runWithBackOff();
        return Promise.resolve();
      });
    } else {
      this.deferred.reject(error);
    }
  }
  isRetryableTransactionError(error) {
    if (error.name === "FirebaseError") {
      const code = error.code;
      return code === "aborted" || code === "failed-precondition" || code === "already-exists" || !isPermanentError(code);
    }
    return false;
  }
};
var LOG_TAG$2 = "FirestoreClient";
var MAX_CONCURRENT_LIMBO_RESOLUTIONS = 100;
var DOM_EXCEPTION_INVALID_STATE = 11;
var DOM_EXCEPTION_ABORTED = 20;
var DOM_EXCEPTION_QUOTA_EXCEEDED = 22;
var FirestoreClient = class {
  constructor(authCredentials, appCheckCredentials, asyncQueue, databaseInfo, componentProvider) {
    this.authCredentials = authCredentials;
    this.appCheckCredentials = appCheckCredentials;
    this.asyncQueue = asyncQueue;
    this.databaseInfo = databaseInfo;
    this.user = User.UNAUTHENTICATED;
    this.clientId = AutoId.newId();
    this.authCredentialListener = () => Promise.resolve();
    this.appCheckCredentialListener = () => Promise.resolve();
    this._uninitializedComponentsProvider = componentProvider;
    this.authCredentials.start(asyncQueue, (user) => __async(this, null, function* () {
      logDebug(LOG_TAG$2, "Received user=", user.uid);
      yield this.authCredentialListener(user);
      this.user = user;
    }));
    this.appCheckCredentials.start(asyncQueue, (newAppCheckToken) => {
      logDebug(LOG_TAG$2, "Received new app check token=", newAppCheckToken);
      return this.appCheckCredentialListener(newAppCheckToken, this.user);
    });
  }
  get configuration() {
    return {
      asyncQueue: this.asyncQueue,
      databaseInfo: this.databaseInfo,
      clientId: this.clientId,
      authCredentials: this.authCredentials,
      appCheckCredentials: this.appCheckCredentials,
      initialUser: this.user,
      maxConcurrentLimboResolutions: MAX_CONCURRENT_LIMBO_RESOLUTIONS
    };
  }
  setCredentialChangeListener(listener) {
    this.authCredentialListener = listener;
  }
  setAppCheckTokenChangeListener(listener) {
    this.appCheckCredentialListener = listener;
  }
  terminate() {
    this.asyncQueue.enterRestrictedMode();
    const deferred = new Deferred();
    this.asyncQueue.enqueueAndForgetEvenWhileRestricted(() => __async(this, null, function* () {
      try {
        if (this._onlineComponents) {
          yield this._onlineComponents.terminate();
        }
        if (this._offlineComponents) {
          yield this._offlineComponents.terminate();
        }
        this.authCredentials.shutdown();
        this.appCheckCredentials.shutdown();
        deferred.resolve();
      } catch (e) {
        const firestoreError = wrapInUserErrorIfRecoverable(e, `Failed to shutdown persistence`);
        deferred.reject(firestoreError);
      }
    }));
    return deferred.promise;
  }
};
function setOfflineComponentProvider(client, offlineComponentProvider) {
  return __async(this, null, function* () {
    client.asyncQueue.verifyOperationInProgress();
    logDebug(LOG_TAG$2, "Initializing OfflineComponentProvider");
    const configuration = client.configuration;
    yield offlineComponentProvider.initialize(configuration);
    let currentUser = configuration.initialUser;
    client.setCredentialChangeListener((user) => __async(this, null, function* () {
      if (!currentUser.isEqual(user)) {
        yield localStoreHandleUserChange(offlineComponentProvider.localStore, user);
        currentUser = user;
      }
    }));
    offlineComponentProvider.persistence.setDatabaseDeletedListener(() => client.terminate());
    client._offlineComponents = offlineComponentProvider;
  });
}
function setOnlineComponentProvider(client, onlineComponentProvider) {
  return __async(this, null, function* () {
    client.asyncQueue.verifyOperationInProgress();
    const offlineComponents = yield ensureOfflineComponents(client);
    logDebug(LOG_TAG$2, "Initializing OnlineComponentProvider");
    yield onlineComponentProvider.initialize(offlineComponents, client.configuration);
    client.setCredentialChangeListener((user) => remoteStoreHandleCredentialChange(onlineComponentProvider.remoteStore, user));
    client.setAppCheckTokenChangeListener((_, user) => remoteStoreHandleCredentialChange(onlineComponentProvider.remoteStore, user));
    client._onlineComponents = onlineComponentProvider;
  });
}
function canFallbackFromIndexedDbError(error) {
  if (error.name === "FirebaseError") {
    return error.code === Code.FAILED_PRECONDITION || error.code === Code.UNIMPLEMENTED;
  } else if (typeof DOMException !== "undefined" && error instanceof DOMException) {
    return (
      // When the browser is out of quota we could get either quota exceeded
      // or an aborted error depending on whether the error happened during
      // schema migration.
      error.code === DOM_EXCEPTION_QUOTA_EXCEEDED || error.code === DOM_EXCEPTION_ABORTED || // Firefox Private Browsing mode disables IndexedDb and returns
      // INVALID_STATE for any usage.
      error.code === DOM_EXCEPTION_INVALID_STATE
    );
  }
  return true;
}
function ensureOfflineComponents(client) {
  return __async(this, null, function* () {
    if (!client._offlineComponents) {
      if (client._uninitializedComponentsProvider) {
        logDebug(LOG_TAG$2, "Using user provided OfflineComponentProvider");
        try {
          yield setOfflineComponentProvider(client, client._uninitializedComponentsProvider._offline);
        } catch (e) {
          const error = e;
          if (!canFallbackFromIndexedDbError(error)) {
            throw error;
          }
          logWarn("Error using user provided cache. Falling back to memory cache: " + error);
          yield setOfflineComponentProvider(client, new MemoryOfflineComponentProvider());
        }
      } else {
        logDebug(LOG_TAG$2, "Using default OfflineComponentProvider");
        yield setOfflineComponentProvider(client, new MemoryOfflineComponentProvider());
      }
    }
    return client._offlineComponents;
  });
}
function ensureOnlineComponents(client) {
  return __async(this, null, function* () {
    if (!client._onlineComponents) {
      if (client._uninitializedComponentsProvider) {
        logDebug(LOG_TAG$2, "Using user provided OnlineComponentProvider");
        yield setOnlineComponentProvider(client, client._uninitializedComponentsProvider._online);
      } else {
        logDebug(LOG_TAG$2, "Using default OnlineComponentProvider");
        yield setOnlineComponentProvider(client, new OnlineComponentProvider());
      }
    }
    return client._onlineComponents;
  });
}
function getPersistence(client) {
  return ensureOfflineComponents(client).then((c) => c.persistence);
}
function getLocalStore(client) {
  return ensureOfflineComponents(client).then((c) => c.localStore);
}
function getRemoteStore(client) {
  return ensureOnlineComponents(client).then((c) => c.remoteStore);
}
function getSyncEngine(client) {
  return ensureOnlineComponents(client).then((c) => c.syncEngine);
}
function getDatastore(client) {
  return ensureOnlineComponents(client).then((c) => c.datastore);
}
function getEventManager(client) {
  return __async(this, null, function* () {
    const onlineComponentProvider = yield ensureOnlineComponents(client);
    const eventManager = onlineComponentProvider.eventManager;
    eventManager.onListen = syncEngineListen.bind(null, onlineComponentProvider.syncEngine);
    eventManager.onUnlisten = syncEngineUnlisten.bind(null, onlineComponentProvider.syncEngine);
    eventManager.onFirstRemoteStoreListen = triggerRemoteStoreListen.bind(null, onlineComponentProvider.syncEngine);
    eventManager.onLastRemoteStoreUnlisten = triggerRemoteStoreUnlisten.bind(null, onlineComponentProvider.syncEngine);
    return eventManager;
  });
}
function firestoreClientEnableNetwork(client) {
  return client.asyncQueue.enqueue(() => __async(this, null, function* () {
    const persistence = yield getPersistence(client);
    const remoteStore = yield getRemoteStore(client);
    persistence.setNetworkEnabled(true);
    return remoteStoreEnableNetwork(remoteStore);
  }));
}
function firestoreClientDisableNetwork(client) {
  return client.asyncQueue.enqueue(() => __async(this, null, function* () {
    const persistence = yield getPersistence(client);
    const remoteStore = yield getRemoteStore(client);
    persistence.setNetworkEnabled(false);
    return remoteStoreDisableNetwork(remoteStore);
  }));
}
function firestoreClientWaitForPendingWrites(client) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const syncEngine = yield getSyncEngine(client);
    return syncEngineRegisterPendingWritesCallback(syncEngine, deferred);
  }));
  return deferred.promise;
}
function firestoreClientListen(client, query3, options, observer) {
  const wrappedObserver = new AsyncObserver(observer);
  const listener = new QueryListener(query3, wrappedObserver, options);
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const eventManager = yield getEventManager(client);
    return eventManagerListen(eventManager, listener);
  }));
  return () => {
    wrappedObserver.mute();
    client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
      const eventManager = yield getEventManager(client);
      return eventManagerUnlisten(eventManager, listener);
    }));
  };
}
function firestoreClientGetDocumentFromLocalCache(client, docKey) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const localStore = yield getLocalStore(client);
    return readDocumentFromCache(localStore, docKey, deferred);
  }));
  return deferred.promise;
}
function firestoreClientGetDocumentViaSnapshotListener(client, key, options = {}) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const eventManager = yield getEventManager(client);
    return readDocumentViaSnapshotListener(eventManager, client.asyncQueue, key, options, deferred);
  }));
  return deferred.promise;
}
function firestoreClientGetDocumentsFromLocalCache(client, query3) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const localStore = yield getLocalStore(client);
    return executeQueryFromCache(localStore, query3, deferred);
  }));
  return deferred.promise;
}
function firestoreClientGetDocumentsViaSnapshotListener(client, query3, options = {}) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const eventManager = yield getEventManager(client);
    return executeQueryViaSnapshotListener(eventManager, client.asyncQueue, query3, options, deferred);
  }));
  return deferred.promise;
}
function firestoreClientRunAggregateQuery(client, query3, aggregates) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    try {
      const datastore = yield getDatastore(client);
      deferred.resolve(invokeRunAggregationQueryRpc(datastore, query3, aggregates));
    } catch (e) {
      deferred.reject(e);
    }
  }));
  return deferred.promise;
}
function firestoreClientWrite(client, mutations) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const syncEngine = yield getSyncEngine(client);
    return syncEngineWrite(syncEngine, mutations, deferred);
  }));
  return deferred.promise;
}
function firestoreClientAddSnapshotsInSyncListener(client, observer) {
  const wrappedObserver = new AsyncObserver(observer);
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const eventManager = yield getEventManager(client);
    return addSnapshotsInSyncListener(eventManager, wrappedObserver);
  }));
  return () => {
    wrappedObserver.mute();
    client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
      const eventManager = yield getEventManager(client);
      return removeSnapshotsInSyncListener(eventManager, wrappedObserver);
    }));
  };
}
function firestoreClientTransaction(client, updateFunction, options) {
  const deferred = new Deferred();
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    const datastore = yield getDatastore(client);
    new TransactionRunner(client.asyncQueue, datastore, options, updateFunction, deferred).run();
  }));
  return deferred.promise;
}
function readDocumentFromCache(localStore, docKey, result) {
  return __async(this, null, function* () {
    try {
      const document = yield localStoreReadDocument(localStore, docKey);
      if (document.isFoundDocument()) {
        result.resolve(document);
      } else if (document.isNoDocument()) {
        result.resolve(null);
      } else {
        result.reject(new FirestoreError(Code.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"));
      }
    } catch (e) {
      const firestoreError = wrapInUserErrorIfRecoverable(e, `Failed to get document '${docKey} from cache`);
      result.reject(firestoreError);
    }
  });
}
function readDocumentViaSnapshotListener(eventManager, asyncQueue, key, options, result) {
  const wrappedObserver = new AsyncObserver({
    next: (snap) => {
      wrappedObserver.mute();
      asyncQueue.enqueueAndForget(() => eventManagerUnlisten(eventManager, listener));
      const exists = snap.docs.has(key);
      if (!exists && snap.fromCache) {
        result.reject(new FirestoreError(Code.UNAVAILABLE, "Failed to get document because the client is offline."));
      } else if (exists && snap.fromCache && options && options.source === "server") {
        result.reject(new FirestoreError(Code.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'));
      } else {
        result.resolve(snap);
      }
    },
    error: (e) => result.reject(e)
  });
  const listener = new QueryListener(newQueryForPath(key.path), wrappedObserver, {
    includeMetadataChanges: true,
    waitForSyncWhenOnline: true
  });
  return eventManagerListen(eventManager, listener);
}
function executeQueryFromCache(localStore, query3, result) {
  return __async(this, null, function* () {
    try {
      const queryResult = yield localStoreExecuteQuery(
        localStore,
        query3,
        /* usePreviousResults= */
        true
      );
      const view = new View(query3, queryResult.remoteKeys);
      const viewDocChanges = view.computeDocChanges(queryResult.documents);
      const viewChange = view.applyChanges(
        viewDocChanges,
        /* limboResolutionEnabled= */
        false
      );
      result.resolve(viewChange.snapshot);
    } catch (e) {
      const firestoreError = wrapInUserErrorIfRecoverable(e, `Failed to execute query '${query3} against cache`);
      result.reject(firestoreError);
    }
  });
}
function executeQueryViaSnapshotListener(eventManager, asyncQueue, query3, options, result) {
  const wrappedObserver = new AsyncObserver({
    next: (snapshot) => {
      wrappedObserver.mute();
      asyncQueue.enqueueAndForget(() => eventManagerUnlisten(eventManager, listener));
      if (snapshot.fromCache && options.source === "server") {
        result.reject(new FirestoreError(Code.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'));
      } else {
        result.resolve(snapshot);
      }
    },
    error: (e) => result.reject(e)
  });
  const listener = new QueryListener(query3, wrappedObserver, {
    includeMetadataChanges: true,
    waitForSyncWhenOnline: true
  });
  return eventManagerListen(eventManager, listener);
}
function firestoreClientLoadBundle(client, databaseId, data, resultTask) {
  const reader = createBundleReader(data, newSerializer(databaseId));
  client.asyncQueue.enqueueAndForget(() => __async(this, null, function* () {
    syncEngineLoadBundle(yield getSyncEngine(client), reader, resultTask);
  }));
}
function firestoreClientGetNamedQuery(client, queryName) {
  return client.asyncQueue.enqueue(() => __async(this, null, function* () {
    return localStoreGetNamedQuery(yield getLocalStore(client), queryName);
  }));
}
function createBundleReader(data, serializer) {
  let content;
  if (typeof data === "string") {
    content = newTextEncoder().encode(data);
  } else {
    content = data;
  }
  return newBundleReader(toByteStreamReader(content), serializer);
}
function firestoreClientSetIndexConfiguration(client, indexes) {
  return client.asyncQueue.enqueue(() => __async(this, null, function* () {
    return localStoreConfigureFieldIndexes(yield getLocalStore(client), indexes);
  }));
}
function firestoreClientSetPersistentCacheIndexAutoCreationEnabled(client, isEnabled) {
  return client.asyncQueue.enqueue(() => __async(this, null, function* () {
    return localStoreSetIndexAutoCreationEnabled(yield getLocalStore(client), isEnabled);
  }));
}
function firestoreClientDeleteAllFieldIndexes(client) {
  return client.asyncQueue.enqueue(() => __async(this, null, function* () {
    return localStoreDeleteAllFieldIndexes(yield getLocalStore(client));
  }));
}
function longPollingOptionsEqual(options1, options2) {
  return options1.timeoutSeconds === options2.timeoutSeconds;
}
function cloneLongPollingOptions(options) {
  const clone = {};
  if (options.timeoutSeconds !== void 0) {
    clone.timeoutSeconds = options.timeoutSeconds;
  }
  return clone;
}
var LOG_TAG$1 = "ComponentProvider";
var datastoreInstances = /* @__PURE__ */ new Map();
function removeComponents(firestore) {
  const datastore = datastoreInstances.get(firestore);
  if (datastore) {
    logDebug(LOG_TAG$1, "Removing Datastore");
    datastoreInstances.delete(firestore);
    datastore.terminate();
  }
}
function makeDatabaseInfo(databaseId, appId, persistenceKey, settings) {
  return new DatabaseInfo(databaseId, appId, persistenceKey, settings.host, settings.ssl, settings.experimentalForceLongPolling, settings.experimentalAutoDetectLongPolling, cloneLongPollingOptions(settings.experimentalLongPollingOptions), settings.useFetchStreams);
}
var DEFAULT_HOST = "firestore.googleapis.com";
var DEFAULT_SSL = true;
var MIN_LONG_POLLING_TIMEOUT_SECONDS = 5;
var MAX_LONG_POLLING_TIMEOUT_SECONDS = 30;
var DEFAULT_AUTO_DETECT_LONG_POLLING = true;
var FirestoreSettingsImpl = class {
  constructor(settings) {
    var _a, _b;
    if (settings.host === void 0) {
      if (settings.ssl !== void 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
      }
      this.host = DEFAULT_HOST;
      this.ssl = DEFAULT_SSL;
    } else {
      this.host = settings.host;
      this.ssl = (_a = settings.ssl) !== null && _a !== void 0 ? _a : DEFAULT_SSL;
    }
    this.credentials = settings.credentials;
    this.ignoreUndefinedProperties = !!settings.ignoreUndefinedProperties;
    this.localCache = settings.localCache;
    if (settings.cacheSizeBytes === void 0) {
      this.cacheSizeBytes = LRU_DEFAULT_CACHE_SIZE_BYTES;
    } else {
      if (settings.cacheSizeBytes !== LRU_COLLECTION_DISABLED && settings.cacheSizeBytes < LRU_MINIMUM_CACHE_SIZE_BYTES) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `cacheSizeBytes must be at least ${LRU_MINIMUM_CACHE_SIZE_BYTES}`);
      } else {
        this.cacheSizeBytes = settings.cacheSizeBytes;
      }
    }
    validateIsNotUsedTogether("experimentalForceLongPolling", settings.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", settings.experimentalAutoDetectLongPolling);
    this.experimentalForceLongPolling = !!settings.experimentalForceLongPolling;
    if (this.experimentalForceLongPolling) {
      this.experimentalAutoDetectLongPolling = false;
    } else if (settings.experimentalAutoDetectLongPolling === void 0) {
      this.experimentalAutoDetectLongPolling = DEFAULT_AUTO_DETECT_LONG_POLLING;
    } else {
      this.experimentalAutoDetectLongPolling = !!settings.experimentalAutoDetectLongPolling;
    }
    this.experimentalLongPollingOptions = cloneLongPollingOptions((_b = settings.experimentalLongPollingOptions) !== null && _b !== void 0 ? _b : {});
    validateLongPollingOptions(this.experimentalLongPollingOptions);
    this.useFetchStreams = !!settings.useFetchStreams;
  }
  isEqual(other) {
    return this.host === other.host && this.ssl === other.ssl && this.credentials === other.credentials && this.cacheSizeBytes === other.cacheSizeBytes && this.experimentalForceLongPolling === other.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === other.experimentalAutoDetectLongPolling && longPollingOptionsEqual(this.experimentalLongPollingOptions, other.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === other.ignoreUndefinedProperties && this.useFetchStreams === other.useFetchStreams;
  }
};
function validateLongPollingOptions(options) {
  if (options.timeoutSeconds !== void 0) {
    if (isNaN(options.timeoutSeconds)) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `invalid long polling timeout: ${options.timeoutSeconds} (must not be NaN)`);
    }
    if (options.timeoutSeconds < MIN_LONG_POLLING_TIMEOUT_SECONDS) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `invalid long polling timeout: ${options.timeoutSeconds} (minimum allowed value is ${MIN_LONG_POLLING_TIMEOUT_SECONDS})`);
    }
    if (options.timeoutSeconds > MAX_LONG_POLLING_TIMEOUT_SECONDS) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `invalid long polling timeout: ${options.timeoutSeconds} (maximum allowed value is ${MAX_LONG_POLLING_TIMEOUT_SECONDS})`);
    }
  }
}
var Firestore$1 = class {
  /** @hideconstructor */
  constructor(_authCredentials, _appCheckCredentials, _databaseId, _app) {
    this._authCredentials = _authCredentials;
    this._appCheckCredentials = _appCheckCredentials;
    this._databaseId = _databaseId;
    this._app = _app;
    this.type = "firestore-lite";
    this._persistenceKey = "(lite)";
    this._settings = new FirestoreSettingsImpl({});
    this._settingsFrozen = false;
    this._terminateTask = "notTerminated";
  }
  /**
   * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
   * instance.
   */
  get app() {
    if (!this._app) {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
    }
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return this._terminateTask !== "notTerminated";
  }
  _setSettings(settings) {
    if (this._settingsFrozen) {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
    }
    this._settings = new FirestoreSettingsImpl(settings);
    if (settings.credentials !== void 0) {
      this._authCredentials = makeAuthCredentialsProvider(settings.credentials);
    }
  }
  _getSettings() {
    return this._settings;
  }
  _freezeSettings() {
    this._settingsFrozen = true;
    return this._settings;
  }
  _delete() {
    if (this._terminateTask === "notTerminated") {
      this._terminateTask = this._terminate();
    }
    return this._terminateTask;
  }
  _restart() {
    return __async(this, null, function* () {
      if (this._terminateTask === "notTerminated") {
        yield this._terminate();
      } else {
        this._terminateTask = "notTerminated";
      }
    });
  }
  /** Returns a JSON-serializable representation of this `Firestore` instance. */
  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings
    };
  }
  /**
   * Terminates all components used by this client. Subclasses can override
   * this method to clean up their own dependencies, but must also call this
   * method.
   *
   * Only ever called once.
   */
  _terminate() {
    removeComponents(this);
    return Promise.resolve();
  }
};
function connectFirestoreEmulator(firestore, host, port, options = {}) {
  var _a;
  firestore = cast(firestore, Firestore$1);
  const settings = firestore._getSettings();
  const newHostSetting = `${host}:${port}`;
  if (settings.host !== DEFAULT_HOST && settings.host !== newHostSetting) {
    logWarn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");
  }
  firestore._setSettings(Object.assign(Object.assign({}, settings), {
    host: newHostSetting,
    ssl: false
  }));
  if (options.mockUserToken) {
    let token;
    let user;
    if (typeof options.mockUserToken === "string") {
      token = options.mockUserToken;
      user = User.MOCK_USER;
    } else {
      token = createMockUserToken(options.mockUserToken, (_a = firestore._app) === null || _a === void 0 ? void 0 : _a.options.projectId);
      const uid = options.mockUserToken.sub || options.mockUserToken.user_id;
      if (!uid) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
      }
      user = new User(uid);
    }
    firestore._authCredentials = new EmulatorAuthCredentialsProvider(new OAuthToken(token, user));
  }
}
var Query = class _Query {
  // This is the lite version of the Query class in the main SDK.
  /** @hideconstructor protected */
  constructor(firestore, converter, _query) {
    this.converter = converter;
    this._query = _query;
    this.type = "query";
    this.firestore = firestore;
  }
  withConverter(converter) {
    return new _Query(this.firestore, converter, this._query);
  }
};
var DocumentReference = class _DocumentReference {
  /** @hideconstructor */
  constructor(firestore, converter, _key) {
    this.converter = converter;
    this._key = _key;
    this.type = "document";
    this.firestore = firestore;
  }
  get _path() {
    return this._key.path;
  }
  /**
   * The document's identifier within its collection.
   */
  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * A string representing the path of the referenced document (relative
   * to the root of the database).
   */
  get path() {
    return this._key.path.canonicalString();
  }
  /**
   * The collection this `DocumentReference` belongs to.
   */
  get parent() {
    return new CollectionReference(this.firestore, this.converter, this._key.path.popLast());
  }
  withConverter(converter) {
    return new _DocumentReference(this.firestore, converter, this._key);
  }
};
var CollectionReference = class _CollectionReference extends Query {
  /** @hideconstructor */
  constructor(firestore, converter, _path) {
    super(firestore, converter, newQueryForPath(_path));
    this._path = _path;
    this.type = "collection";
  }
  /** The collection's identifier. */
  get id() {
    return this._query.path.lastSegment();
  }
  /**
   * A string representing the path of the referenced collection (relative
   * to the root of the database).
   */
  get path() {
    return this._query.path.canonicalString();
  }
  /**
   * A reference to the containing `DocumentReference` if this is a
   * subcollection. If this isn't a subcollection, the reference is null.
   */
  get parent() {
    const parentPath = this._path.popLast();
    if (parentPath.isEmpty()) {
      return null;
    } else {
      return new DocumentReference(
        this.firestore,
        /* converter= */
        null,
        new DocumentKey(parentPath)
      );
    }
  }
  withConverter(converter) {
    return new _CollectionReference(this.firestore, converter, this._path);
  }
};
function collection2(parent, path, ...pathSegments) {
  parent = getModularInstance(parent);
  validateNonEmptyArgument("collection", "path", path);
  if (parent instanceof Firestore$1) {
    const absolutePath = ResourcePath.fromString(path, ...pathSegments);
    validateCollectionPath(absolutePath);
    return new CollectionReference(
      parent,
      /* converter= */
      null,
      absolutePath
    );
  } else {
    if (!(parent instanceof DocumentReference) && !(parent instanceof CollectionReference)) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    }
    const absolutePath = parent._path.child(ResourcePath.fromString(path, ...pathSegments));
    validateCollectionPath(absolutePath);
    return new CollectionReference(
      parent.firestore,
      /* converter= */
      null,
      absolutePath
    );
  }
}
function collectionGroup(firestore, collectionId) {
  firestore = cast(firestore, Firestore$1);
  validateNonEmptyArgument("collectionGroup", "collection id", collectionId);
  if (collectionId.indexOf("/") >= 0) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid collection ID '${collectionId}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
  }
  return new Query(
    firestore,
    /* converter= */
    null,
    newQueryForCollectionGroup(collectionId)
  );
}
function doc2(parent, path, ...pathSegments) {
  parent = getModularInstance(parent);
  if (arguments.length === 1) {
    path = AutoId.newId();
  }
  validateNonEmptyArgument("doc", "path", path);
  if (parent instanceof Firestore$1) {
    const absolutePath = ResourcePath.fromString(path, ...pathSegments);
    validateDocumentPath(absolutePath);
    return new DocumentReference(
      parent,
      /* converter= */
      null,
      new DocumentKey(absolutePath)
    );
  } else {
    if (!(parent instanceof DocumentReference) && !(parent instanceof CollectionReference)) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    }
    const absolutePath = parent._path.child(ResourcePath.fromString(path, ...pathSegments));
    validateDocumentPath(absolutePath);
    return new DocumentReference(parent.firestore, parent instanceof CollectionReference ? parent.converter : null, new DocumentKey(absolutePath));
  }
}
function refEqual2(left, right) {
  left = getModularInstance(left);
  right = getModularInstance(right);
  if ((left instanceof DocumentReference || left instanceof CollectionReference) && (right instanceof DocumentReference || right instanceof CollectionReference)) {
    return left.firestore === right.firestore && left.path === right.path && left.converter === right.converter;
  }
  return false;
}
function queryEqual(left, right) {
  left = getModularInstance(left);
  right = getModularInstance(right);
  if (left instanceof Query && right instanceof Query) {
    return left.firestore === right.firestore && queryEquals(left._query, right._query) && left.converter === right.converter;
  }
  return false;
}
var LOG_TAG = "AsyncQueue";
var AsyncQueueImpl = class {
  constructor(tail = Promise.resolve()) {
    this.retryableOps = [];
    this._isShuttingDown = false;
    this.delayedOperations = [];
    this.failure = null;
    this.operationInProgress = false;
    this.skipNonRestrictedTasks = false;
    this.timerIdsToSkip = [];
    this.backoff = new ExponentialBackoff(
      this,
      "async_queue_retry"
      /* TimerId.AsyncQueueRetry */
    );
    this.visibilityHandler = () => {
      this.backoff.skipBackoff();
    };
    this.tail = tail;
  }
  get isShuttingDown() {
    return this._isShuttingDown;
  }
  /**
   * Adds a new operation to the queue without waiting for it to complete (i.e.
   * we ignore the Promise result).
   */
  enqueueAndForget(op) {
    this.enqueue(op);
  }
  enqueueAndForgetEvenWhileRestricted(op) {
    this.verifyNotFailed();
    this.enqueueInternal(op);
  }
  enterRestrictedMode(purgeExistingTasks) {
    if (!this._isShuttingDown) {
      this._isShuttingDown = true;
      this.skipNonRestrictedTasks = purgeExistingTasks || false;
    }
  }
  enqueue(op) {
    this.verifyNotFailed();
    if (this._isShuttingDown) {
      return new Promise(() => {
      });
    }
    const task = new Deferred();
    return this.enqueueInternal(() => {
      if (this._isShuttingDown && this.skipNonRestrictedTasks) {
        return Promise.resolve();
      }
      op().then(task.resolve, task.reject);
      return task.promise;
    }).then(() => task.promise);
  }
  enqueueRetryable(op) {
    this.enqueueAndForget(() => {
      this.retryableOps.push(op);
      return this.retryNextOp();
    });
  }
  /**
   * Runs the next operation from the retryable queue. If the operation fails,
   * reschedules with backoff.
   */
  retryNextOp() {
    return __async(this, null, function* () {
      if (this.retryableOps.length === 0) {
        return;
      }
      try {
        yield this.retryableOps[0]();
        this.retryableOps.shift();
        this.backoff.reset();
      } catch (e) {
        if (isIndexedDbTransactionError(e)) {
          logDebug(LOG_TAG, "Operation failed with retryable error: " + e);
        } else {
          throw e;
        }
      }
      if (this.retryableOps.length > 0) {
        this.backoff.backoffAndRun(() => this.retryNextOp());
      }
    });
  }
  enqueueInternal(op) {
    const newTail = this.tail.then(() => {
      this.operationInProgress = true;
      return op().catch((error) => {
        this.failure = error;
        this.operationInProgress = false;
        const message = getMessageOrStack(error);
        logError("INTERNAL UNHANDLED ERROR: ", message);
        throw error;
      }).then((result) => {
        this.operationInProgress = false;
        return result;
      });
    });
    this.tail = newTail;
    return newTail;
  }
  enqueueAfterDelay(timerId, delayMs, op) {
    this.verifyNotFailed();
    if (this.timerIdsToSkip.indexOf(timerId) > -1) {
      delayMs = 0;
    }
    const delayedOp = DelayedOperation.createAndSchedule(this, timerId, delayMs, op, (removedOp) => this.removeDelayedOperation(removedOp));
    this.delayedOperations.push(delayedOp);
    return delayedOp;
  }
  verifyNotFailed() {
    if (this.failure) {
      fail();
    }
  }
  verifyOperationInProgress() {
  }
  /**
   * Waits until all currently queued tasks are finished executing. Delayed
   * operations are not run.
   */
  drain() {
    return __async(this, null, function* () {
      let currentTail;
      do {
        currentTail = this.tail;
        yield currentTail;
      } while (currentTail !== this.tail);
    });
  }
  /**
   * For Tests: Determine if a delayed operation with a particular TimerId
   * exists.
   */
  containsDelayedOperation(timerId) {
    for (const op of this.delayedOperations) {
      if (op.timerId === timerId) {
        return true;
      }
    }
    return false;
  }
  /**
   * For Tests: Runs some or all delayed operations early.
   *
   * @param lastTimerId - Delayed operations up to and including this TimerId
   * will be drained. Pass TimerId.All to run all delayed operations.
   * @returns a Promise that resolves once all operations have been run.
   */
  runAllDelayedOperationsUntil(lastTimerId) {
    return this.drain().then(() => {
      this.delayedOperations.sort((a, b) => a.targetTimeMs - b.targetTimeMs);
      for (const op of this.delayedOperations) {
        op.skipDelay();
        if (lastTimerId !== "all" && op.timerId === lastTimerId) {
          break;
        }
      }
      return this.drain();
    });
  }
  /**
   * For Tests: Skip all subsequent delays for a timer id.
   */
  skipDelaysForTimerId(timerId) {
    this.timerIdsToSkip.push(timerId);
  }
  /** Called once a DelayedOperation is run or canceled. */
  removeDelayedOperation(op) {
    const index = this.delayedOperations.indexOf(op);
    this.delayedOperations.splice(index, 1);
  }
};
function getMessageOrStack(error) {
  let message = error.message || "";
  if (error.stack) {
    if (error.stack.includes(error.message)) {
      message = error.stack;
    } else {
      message = error.message + "\n" + error.stack;
    }
  }
  return message;
}
var LoadBundleTask = class {
  constructor() {
    this._progressObserver = {};
    this._taskCompletionResolver = new Deferred();
    this._lastProgress = {
      taskState: "Running",
      totalBytes: 0,
      totalDocuments: 0,
      bytesLoaded: 0,
      documentsLoaded: 0
    };
  }
  /**
   * Registers functions to listen to bundle loading progress events.
   * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
   *   each time a Firestore document is loaded from the bundle.
   * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
   *   error, and there should be no more updates after this.
   * @param complete - Called when the loading task is complete.
   */
  onProgress(next, error, complete) {
    this._progressObserver = {
      next,
      error,
      complete
    };
  }
  /**
   * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
   *
   * @param onRejected - Called when an error occurs during bundle loading.
   */
  catch(onRejected) {
    return this._taskCompletionResolver.promise.catch(onRejected);
  }
  /**
   * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
   *
   * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
   *   The update will always have its `taskState` set to `"Success"`.
   * @param onRejected - Called when an error occurs during bundle loading.
   */
  then(onFulfilled, onRejected) {
    return this._taskCompletionResolver.promise.then(onFulfilled, onRejected);
  }
  /**
   * Notifies all observers that bundle loading has completed, with a provided
   * `LoadBundleTaskProgress` object.
   *
   * @private
   */
  _completeWith(progress) {
    this._updateProgress(progress);
    if (this._progressObserver.complete) {
      this._progressObserver.complete();
    }
    this._taskCompletionResolver.resolve(progress);
  }
  /**
   * Notifies all observers that bundle loading has failed, with a provided
   * `Error` as the reason.
   *
   * @private
   */
  _failWith(error) {
    this._lastProgress.taskState = "Error";
    if (this._progressObserver.next) {
      this._progressObserver.next(this._lastProgress);
    }
    if (this._progressObserver.error) {
      this._progressObserver.error(error);
    }
    this._taskCompletionResolver.reject(error);
  }
  /**
   * Notifies a progress update of loading a bundle.
   * @param progress - The new progress.
   *
   * @private
   */
  _updateProgress(progress) {
    this._lastProgress = progress;
    if (this._progressObserver.next) {
      this._progressObserver.next(progress);
    }
  }
};
var CACHE_SIZE_UNLIMITED = LRU_COLLECTION_DISABLED;
var Firestore = class extends Firestore$1 {
  /** @hideconstructor */
  constructor(authCredentialsProvider, appCheckCredentialsProvider, databaseId, app) {
    super(authCredentialsProvider, appCheckCredentialsProvider, databaseId, app);
    this.type = "firestore";
    this._queue = new AsyncQueueImpl();
    this._persistenceKey = (app === null || app === void 0 ? void 0 : app.name) || "[DEFAULT]";
  }
  _terminate() {
    return __async(this, null, function* () {
      if (this._firestoreClient) {
        const terminate3 = this._firestoreClient.terminate();
        this._queue = new AsyncQueueImpl(terminate3);
        this._firestoreClient = void 0;
        yield terminate3;
      }
    });
  }
};
function initializeFirestore(app, settings, databaseId) {
  if (!databaseId) {
    databaseId = DEFAULT_DATABASE_NAME;
  }
  const provider = _getProvider(app, "firestore");
  if (provider.isInitialized(databaseId)) {
    const existingInstance = provider.getImmediate({
      identifier: databaseId
    });
    const initialSettings = provider.getOptions(databaseId);
    if (deepEqual(initialSettings, settings)) {
      return existingInstance;
    } else {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.");
    }
  }
  if (settings.cacheSizeBytes !== void 0 && settings.localCache !== void 0) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object`);
  }
  if (settings.cacheSizeBytes !== void 0 && settings.cacheSizeBytes !== CACHE_SIZE_UNLIMITED && settings.cacheSizeBytes < LRU_MINIMUM_CACHE_SIZE_BYTES) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `cacheSizeBytes must be at least ${LRU_MINIMUM_CACHE_SIZE_BYTES}`);
  }
  return provider.initialize({
    options: settings,
    instanceIdentifier: databaseId
  });
}
function getFirestore(appOrDatabaseId, optionalDatabaseId) {
  const app = typeof appOrDatabaseId === "object" ? appOrDatabaseId : getApp();
  const databaseId = typeof appOrDatabaseId === "string" ? appOrDatabaseId : optionalDatabaseId || DEFAULT_DATABASE_NAME;
  const db = _getProvider(app, "firestore").getImmediate({
    identifier: databaseId
  });
  if (!db._initialized) {
    const emulator = getDefaultEmulatorHostnameAndPort("firestore");
    if (emulator) {
      connectFirestoreEmulator(db, ...emulator);
    }
  }
  return db;
}
function ensureFirestoreConfigured(firestore) {
  if (firestore._terminated) {
    throw new FirestoreError(Code.FAILED_PRECONDITION, "The client has already been terminated.");
  }
  if (!firestore._firestoreClient) {
    configureFirestore(firestore);
  }
  return firestore._firestoreClient;
}
function configureFirestore(firestore) {
  var _a, _b, _c;
  const settings = firestore._freezeSettings();
  const databaseInfo = makeDatabaseInfo(firestore._databaseId, ((_a = firestore._app) === null || _a === void 0 ? void 0 : _a.options.appId) || "", firestore._persistenceKey, settings);
  if (!firestore._componentsProvider) {
    if (((_b = settings.localCache) === null || _b === void 0 ? void 0 : _b._offlineComponentProvider) && ((_c = settings.localCache) === null || _c === void 0 ? void 0 : _c._onlineComponentProvider)) {
      firestore._componentsProvider = {
        _offline: settings.localCache._offlineComponentProvider,
        _online: settings.localCache._onlineComponentProvider
      };
    }
  }
  firestore._firestoreClient = new FirestoreClient(firestore._authCredentials, firestore._appCheckCredentials, firestore._queue, databaseInfo, firestore._componentsProvider && buildComponentProvider(firestore._componentsProvider));
}
function buildComponentProvider(componentsProvider) {
  const online = componentsProvider === null || componentsProvider === void 0 ? void 0 : componentsProvider._online.build();
  return {
    _offline: componentsProvider === null || componentsProvider === void 0 ? void 0 : componentsProvider._offline.build(online),
    _online: online
  };
}
function enableIndexedDbPersistence(firestore, persistenceSettings) {
  logWarn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
  const settings = firestore._freezeSettings();
  setPersistenceProviders(firestore, OnlineComponentProvider.provider, {
    build: (onlineComponents) => new IndexedDbOfflineComponentProvider(onlineComponents, settings.cacheSizeBytes, persistenceSettings === null || persistenceSettings === void 0 ? void 0 : persistenceSettings.forceOwnership)
  });
  return Promise.resolve();
}
function enableMultiTabIndexedDbPersistence(firestore) {
  return __async(this, null, function* () {
    logWarn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");
    const settings = firestore._freezeSettings();
    setPersistenceProviders(firestore, OnlineComponentProvider.provider, {
      build: (onlineComponents) => new MultiTabOfflineComponentProvider(onlineComponents, settings.cacheSizeBytes)
    });
  });
}
function setPersistenceProviders(firestore, onlineComponentProvider, offlineComponentProvider) {
  firestore = cast(firestore, Firestore);
  if (firestore._firestoreClient || firestore._terminated) {
    throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
  }
  if (firestore._componentsProvider || firestore._getSettings().localCache) {
    throw new FirestoreError(Code.FAILED_PRECONDITION, "SDK cache is already specified.");
  }
  firestore._componentsProvider = {
    _online: onlineComponentProvider,
    _offline: offlineComponentProvider
  };
  configureFirestore(firestore);
}
function clearIndexedDbPersistence(firestore) {
  if (firestore._initialized && !firestore._terminated) {
    throw new FirestoreError(Code.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
  }
  const deferred = new Deferred();
  firestore._queue.enqueueAndForgetEvenWhileRestricted(() => __async(this, null, function* () {
    try {
      yield indexedDbClearPersistence(indexedDbStoragePrefix(firestore._databaseId, firestore._persistenceKey));
      deferred.resolve();
    } catch (e) {
      deferred.reject(e);
    }
  }));
  return deferred.promise;
}
function waitForPendingWrites(firestore) {
  firestore = cast(firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientWaitForPendingWrites(client);
}
function enableNetwork(firestore) {
  firestore = cast(firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientEnableNetwork(client);
}
function disableNetwork(firestore) {
  firestore = cast(firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientDisableNetwork(client);
}
function terminate(firestore) {
  _removeServiceInstance(firestore.app, "firestore", firestore._databaseId.database);
  return firestore._delete();
}
function loadBundle(firestore, bundleData) {
  firestore = cast(firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const resultTask = new LoadBundleTask();
  firestoreClientLoadBundle(client, firestore._databaseId, bundleData, resultTask);
  return resultTask;
}
function namedQuery(firestore, name2) {
  firestore = cast(firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientGetNamedQuery(client, name2).then((namedQuery3) => {
    if (!namedQuery3) {
      return null;
    }
    return new Query(firestore, null, namedQuery3.query);
  });
}
function registerFirestore(variant, useFetchStreams = true) {
  setSDKVersion(SDK_VERSION);
  _registerComponent(new Component("firestore", (container, {
    instanceIdentifier: databaseId,
    options: settings
  }) => {
    const app = container.getProvider("app").getImmediate();
    const firestoreInstance = new Firestore(new FirebaseAuthCredentialsProvider(container.getProvider("auth-internal")), new FirebaseAppCheckTokenProvider(container.getProvider("app-check-internal")), databaseIdFromApp(app, databaseId), app);
    settings = Object.assign({
      useFetchStreams
    }, settings);
    firestoreInstance._setSettings(settings);
    return firestoreInstance;
  }, "PUBLIC").setMultipleInstances(true));
  registerVersion(name, version$1, variant);
  registerVersion(name, version$1, "esm2017");
}
var AggregateImpl = class {
  constructor(alias, aggregateType, fieldPath) {
    this.alias = alias;
    this.aggregateType = aggregateType;
    this.fieldPath = fieldPath;
  }
};
var AggregateField = class {
  /**
   * Create a new AggregateField<T>
   * @param aggregateType Specifies the type of aggregation operation to perform.
   * @param _internalFieldPath Optionally specifies the field that is aggregated.
   * @internal
   */
  constructor(aggregateType = "count", _internalFieldPath) {
    this._internalFieldPath = _internalFieldPath;
    this.type = "AggregateField";
    this.aggregateType = aggregateType;
  }
};
var AggregateQuerySnapshot = class {
  /** @hideconstructor */
  constructor(query3, _userDataWriter, _data) {
    this._userDataWriter = _userDataWriter;
    this._data = _data;
    this.type = "AggregateQuerySnapshot";
    this.query = query3;
  }
  /**
   * Returns the results of the aggregations performed over the underlying
   * query.
   *
   * The keys of the returned object will be the same as those of the
   * `AggregateSpec` object specified to the aggregation method, and the values
   * will be the corresponding aggregation result.
   *
   * @returns The results of the aggregations performed over the underlying
   * query.
   */
  data() {
    return this._userDataWriter.convertObjectMap(this._data);
  }
};
var Bytes = class _Bytes {
  /** @hideconstructor */
  constructor(byteString) {
    this._byteString = byteString;
  }
  /**
   * Creates a new `Bytes` object from the given Base64 string, converting it to
   * bytes.
   *
   * @param base64 - The Base64 string used to create the `Bytes` object.
   */
  static fromBase64String(base64) {
    try {
      return new _Bytes(ByteString.fromBase64String(base64));
    } catch (e) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e);
    }
  }
  /**
   * Creates a new `Bytes` object from the given Uint8Array.
   *
   * @param array - The Uint8Array used to create the `Bytes` object.
   */
  static fromUint8Array(array) {
    return new _Bytes(ByteString.fromUint8Array(array));
  }
  /**
   * Returns the underlying bytes as a Base64-encoded string.
   *
   * @returns The Base64-encoded string created from the `Bytes` object.
   */
  toBase64() {
    return this._byteString.toBase64();
  }
  /**
   * Returns the underlying bytes in a new `Uint8Array`.
   *
   * @returns The Uint8Array created from the `Bytes` object.
   */
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  /**
   * Returns a string representation of the `Bytes` object.
   *
   * @returns A string representation of the `Bytes` object.
   */
  toString() {
    return "Bytes(base64: " + this.toBase64() + ")";
  }
  /**
   * Returns true if this `Bytes` object is equal to the provided one.
   *
   * @param other - The `Bytes` object to compare against.
   * @returns true if this `Bytes` object is equal to the provided one.
   */
  isEqual(other) {
    return this._byteString.isEqual(other._byteString);
  }
};
var FieldPath = class {
  /**
   * Creates a `FieldPath` from the provided field names. If more than one field
   * name is provided, the path will point to a nested field in a document.
   *
   * @param fieldNames - A list of field names.
   */
  constructor(...fieldNames) {
    for (let i = 0; i < fieldNames.length; ++i) {
      if (fieldNames[i].length === 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid field name at argument $(i + 1). Field names must not be empty.`);
      }
    }
    this._internalPath = new FieldPath$1(fieldNames);
  }
  /**
   * Returns true if this `FieldPath` is equal to the provided one.
   *
   * @param other - The `FieldPath` to compare against.
   * @returns true if this `FieldPath` is equal to the provided one.
   */
  isEqual(other) {
    return this._internalPath.isEqual(other._internalPath);
  }
};
function documentId() {
  return new FieldPath(DOCUMENT_KEY_NAME);
}
var FieldValue = class {
  /**
   * @param _methodName - The public API endpoint that returns this class.
   * @hideconstructor
   */
  constructor(_methodName) {
    this._methodName = _methodName;
  }
};
var GeoPoint = class {
  /**
   * Creates a new immutable `GeoPoint` object with the provided latitude and
   * longitude values.
   * @param latitude - The latitude as number between -90 and 90.
   * @param longitude - The longitude as number between -180 and 180.
   */
  constructor(latitude, longitude) {
    if (!isFinite(latitude) || latitude < -90 || latitude > 90) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + latitude);
    }
    if (!isFinite(longitude) || longitude < -180 || longitude > 180) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + longitude);
    }
    this._lat = latitude;
    this._long = longitude;
  }
  /**
   * The latitude of this `GeoPoint` instance.
   */
  get latitude() {
    return this._lat;
  }
  /**
   * The longitude of this `GeoPoint` instance.
   */
  get longitude() {
    return this._long;
  }
  /**
   * Returns true if this `GeoPoint` is equal to the provided one.
   *
   * @param other - The `GeoPoint` to compare against.
   * @returns true if this `GeoPoint` is equal to the provided one.
   */
  isEqual(other) {
    return this._lat === other._lat && this._long === other._long;
  }
  /** Returns a JSON-serializable representation of this GeoPoint. */
  toJSON() {
    return {
      latitude: this._lat,
      longitude: this._long
    };
  }
  /**
   * Actually private to JS consumers of our API, so this function is prefixed
   * with an underscore.
   */
  _compareTo(other) {
    return primitiveComparator(this._lat, other._lat) || primitiveComparator(this._long, other._long);
  }
};
var VectorValue = class {
  /**
   * @private
   * @internal
   */
  constructor(values) {
    this._values = (values || []).map((n) => n);
  }
  /**
   * Returns a copy of the raw number array form of the vector.
   */
  toArray() {
    return this._values.map((n) => n);
  }
  /**
   * Returns `true` if the two VectorValue has the same raw number arrays, returns `false` otherwise.
   */
  isEqual(other) {
    return isPrimitiveArrayEqual(this._values, other._values);
  }
};
var RESERVED_FIELD_REGEX = /^__.*__$/;
var ParsedSetData = class {
  constructor(data, fieldMask, fieldTransforms) {
    this.data = data;
    this.fieldMask = fieldMask;
    this.fieldTransforms = fieldTransforms;
  }
  toMutation(key, precondition) {
    if (this.fieldMask !== null) {
      return new PatchMutation(key, this.data, this.fieldMask, precondition, this.fieldTransforms);
    } else {
      return new SetMutation(key, this.data, precondition, this.fieldTransforms);
    }
  }
};
var ParsedUpdateData = class {
  constructor(data, fieldMask, fieldTransforms) {
    this.data = data;
    this.fieldMask = fieldMask;
    this.fieldTransforms = fieldTransforms;
  }
  toMutation(key, precondition) {
    return new PatchMutation(key, this.data, this.fieldMask, precondition, this.fieldTransforms);
  }
};
function isWrite(dataSource) {
  switch (dataSource) {
    case 0:
    case 2:
    case 1:
      return true;
    case 3:
    case 4:
      return false;
    default:
      throw fail();
  }
}
var ParseContextImpl = class _ParseContextImpl {
  /**
   * Initializes a ParseContext with the given source and path.
   *
   * @param settings - The settings for the parser.
   * @param databaseId - The database ID of the Firestore instance.
   * @param serializer - The serializer to use to generate the Value proto.
   * @param ignoreUndefinedProperties - Whether to ignore undefined properties
   * rather than throw.
   * @param fieldTransforms - A mutable list of field transforms encountered
   * while parsing the data.
   * @param fieldMask - A mutable list of field paths encountered while parsing
   * the data.
   *
   * TODO(b/34871131): We don't support array paths right now, so path can be
   * null to indicate the context represents any location within an array (in
   * which case certain features will not work and errors will be somewhat
   * compromised).
   */
  constructor(settings, databaseId, serializer, ignoreUndefinedProperties, fieldTransforms, fieldMask) {
    this.settings = settings;
    this.databaseId = databaseId;
    this.serializer = serializer;
    this.ignoreUndefinedProperties = ignoreUndefinedProperties;
    if (fieldTransforms === void 0) {
      this.validatePath();
    }
    this.fieldTransforms = fieldTransforms || [];
    this.fieldMask = fieldMask || [];
  }
  get path() {
    return this.settings.path;
  }
  get dataSource() {
    return this.settings.dataSource;
  }
  /** Returns a new context with the specified settings overwritten. */
  contextWith(configuration) {
    return new _ParseContextImpl(Object.assign(Object.assign({}, this.settings), configuration), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
  }
  childContextForField(field) {
    var _a;
    const childPath = (_a = this.path) === null || _a === void 0 ? void 0 : _a.child(field);
    const context = this.contextWith({
      path: childPath,
      arrayElement: false
    });
    context.validatePathSegment(field);
    return context;
  }
  childContextForFieldPath(field) {
    var _a;
    const childPath = (_a = this.path) === null || _a === void 0 ? void 0 : _a.child(field);
    const context = this.contextWith({
      path: childPath,
      arrayElement: false
    });
    context.validatePath();
    return context;
  }
  childContextForArray(index) {
    return this.contextWith({
      path: void 0,
      arrayElement: true
    });
  }
  createError(reason) {
    return createError(reason, this.settings.methodName, this.settings.hasConverter || false, this.path, this.settings.targetDoc);
  }
  /** Returns 'true' if 'fieldPath' was traversed when creating this context. */
  contains(fieldPath) {
    return this.fieldMask.find((field) => fieldPath.isPrefixOf(field)) !== void 0 || this.fieldTransforms.find((transform) => fieldPath.isPrefixOf(transform.field)) !== void 0;
  }
  validatePath() {
    if (!this.path) {
      return;
    }
    for (let i = 0; i < this.path.length; i++) {
      this.validatePathSegment(this.path.get(i));
    }
  }
  validatePathSegment(segment) {
    if (segment.length === 0) {
      throw this.createError("Document fields must not be empty");
    }
    if (isWrite(this.dataSource) && RESERVED_FIELD_REGEX.test(segment)) {
      throw this.createError('Document fields cannot begin and end with "__"');
    }
  }
};
var UserDataReader = class {
  constructor(databaseId, ignoreUndefinedProperties, serializer) {
    this.databaseId = databaseId;
    this.ignoreUndefinedProperties = ignoreUndefinedProperties;
    this.serializer = serializer || newSerializer(databaseId);
  }
  /** Creates a new top-level parse context. */
  createContext(dataSource, methodName, targetDoc, hasConverter = false) {
    return new ParseContextImpl({
      dataSource,
      methodName,
      targetDoc,
      path: FieldPath$1.emptyPath(),
      arrayElement: false,
      hasConverter
    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties);
  }
};
function newUserDataReader(firestore) {
  const settings = firestore._freezeSettings();
  const serializer = newSerializer(firestore._databaseId);
  return new UserDataReader(firestore._databaseId, !!settings.ignoreUndefinedProperties, serializer);
}
function parseSetData(userDataReader, methodName, targetDoc, input, hasConverter, options = {}) {
  const context = userDataReader.createContext(options.merge || options.mergeFields ? 2 : 0, methodName, targetDoc, hasConverter);
  validatePlainObject("Data must be an object, but it was:", context, input);
  const updateData = parseObject(input, context);
  let fieldMask;
  let fieldTransforms;
  if (options.merge) {
    fieldMask = new FieldMask(context.fieldMask);
    fieldTransforms = context.fieldTransforms;
  } else if (options.mergeFields) {
    const validatedFieldPaths = [];
    for (const stringOrFieldPath of options.mergeFields) {
      const fieldPath = fieldPathFromArgument$1(methodName, stringOrFieldPath, targetDoc);
      if (!context.contains(fieldPath)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Field '${fieldPath}' is specified in your field mask but missing from your input data.`);
      }
      if (!fieldMaskContains(validatedFieldPaths, fieldPath)) {
        validatedFieldPaths.push(fieldPath);
      }
    }
    fieldMask = new FieldMask(validatedFieldPaths);
    fieldTransforms = context.fieldTransforms.filter((transform) => fieldMask.covers(transform.field));
  } else {
    fieldMask = null;
    fieldTransforms = context.fieldTransforms;
  }
  return new ParsedSetData(new ObjectValue(updateData), fieldMask, fieldTransforms);
}
var DeleteFieldValueImpl = class _DeleteFieldValueImpl extends FieldValue {
  _toFieldTransform(context) {
    if (context.dataSource === 2) {
      context.fieldMask.push(context.path);
    } else if (context.dataSource === 1) {
      throw context.createError(`${this._methodName}() can only appear at the top level of your update data`);
    } else {
      throw context.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
    }
    return null;
  }
  isEqual(other) {
    return other instanceof _DeleteFieldValueImpl;
  }
};
function createSentinelChildContext(fieldValue, context, arrayElement) {
  return new ParseContextImpl({
    dataSource: 3,
    targetDoc: context.settings.targetDoc,
    methodName: fieldValue._methodName,
    arrayElement
  }, context.databaseId, context.serializer, context.ignoreUndefinedProperties);
}
var ServerTimestampFieldValueImpl = class _ServerTimestampFieldValueImpl extends FieldValue {
  _toFieldTransform(context) {
    return new FieldTransform(context.path, new ServerTimestampTransform());
  }
  isEqual(other) {
    return other instanceof _ServerTimestampFieldValueImpl;
  }
};
var ArrayUnionFieldValueImpl = class _ArrayUnionFieldValueImpl extends FieldValue {
  constructor(methodName, _elements) {
    super(methodName);
    this._elements = _elements;
  }
  _toFieldTransform(context) {
    const parseContext = createSentinelChildContext(
      this,
      context,
      /*array=*/
      true
    );
    const parsedElements = this._elements.map((element) => parseData(element, parseContext));
    const arrayUnion3 = new ArrayUnionTransformOperation(parsedElements);
    return new FieldTransform(context.path, arrayUnion3);
  }
  isEqual(other) {
    return other instanceof _ArrayUnionFieldValueImpl && deepEqual(this._elements, other._elements);
  }
};
var ArrayRemoveFieldValueImpl = class _ArrayRemoveFieldValueImpl extends FieldValue {
  constructor(methodName, _elements) {
    super(methodName);
    this._elements = _elements;
  }
  _toFieldTransform(context) {
    const parseContext = createSentinelChildContext(
      this,
      context,
      /*array=*/
      true
    );
    const parsedElements = this._elements.map((element) => parseData(element, parseContext));
    const arrayUnion3 = new ArrayRemoveTransformOperation(parsedElements);
    return new FieldTransform(context.path, arrayUnion3);
  }
  isEqual(other) {
    return other instanceof _ArrayRemoveFieldValueImpl && deepEqual(this._elements, other._elements);
  }
};
var NumericIncrementFieldValueImpl = class _NumericIncrementFieldValueImpl extends FieldValue {
  constructor(methodName, _operand) {
    super(methodName);
    this._operand = _operand;
  }
  _toFieldTransform(context) {
    const numericIncrement = new NumericIncrementTransformOperation(context.serializer, toNumber(context.serializer, this._operand));
    return new FieldTransform(context.path, numericIncrement);
  }
  isEqual(other) {
    return other instanceof _NumericIncrementFieldValueImpl && this._operand === other._operand;
  }
};
function parseUpdateData(userDataReader, methodName, targetDoc, input) {
  const context = userDataReader.createContext(1, methodName, targetDoc);
  validatePlainObject("Data must be an object, but it was:", context, input);
  const fieldMaskPaths = [];
  const updateData = ObjectValue.empty();
  forEach(input, (key, value) => {
    const path = fieldPathFromDotSeparatedString(methodName, key, targetDoc);
    value = getModularInstance(value);
    const childContext = context.childContextForFieldPath(path);
    if (value instanceof DeleteFieldValueImpl) {
      fieldMaskPaths.push(path);
    } else {
      const parsedValue = parseData(value, childContext);
      if (parsedValue != null) {
        fieldMaskPaths.push(path);
        updateData.set(path, parsedValue);
      }
    }
  });
  const mask = new FieldMask(fieldMaskPaths);
  return new ParsedUpdateData(updateData, mask, context.fieldTransforms);
}
function parseUpdateVarargs(userDataReader, methodName, targetDoc, field, value, moreFieldsAndValues) {
  const context = userDataReader.createContext(1, methodName, targetDoc);
  const keys = [fieldPathFromArgument$1(methodName, field, targetDoc)];
  const values = [value];
  if (moreFieldsAndValues.length % 2 !== 0) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${methodName}() needs to be called with an even number of arguments that alternate between field names and values.`);
  }
  for (let i = 0; i < moreFieldsAndValues.length; i += 2) {
    keys.push(fieldPathFromArgument$1(methodName, moreFieldsAndValues[i]));
    values.push(moreFieldsAndValues[i + 1]);
  }
  const fieldMaskPaths = [];
  const updateData = ObjectValue.empty();
  for (let i = keys.length - 1; i >= 0; --i) {
    if (!fieldMaskContains(fieldMaskPaths, keys[i])) {
      const path = keys[i];
      let value2 = values[i];
      value2 = getModularInstance(value2);
      const childContext = context.childContextForFieldPath(path);
      if (value2 instanceof DeleteFieldValueImpl) {
        fieldMaskPaths.push(path);
      } else {
        const parsedValue = parseData(value2, childContext);
        if (parsedValue != null) {
          fieldMaskPaths.push(path);
          updateData.set(path, parsedValue);
        }
      }
    }
  }
  const mask = new FieldMask(fieldMaskPaths);
  return new ParsedUpdateData(updateData, mask, context.fieldTransforms);
}
function parseQueryValue(userDataReader, methodName, input, allowArrays = false) {
  const context = userDataReader.createContext(allowArrays ? 4 : 3, methodName);
  const parsed = parseData(input, context);
  return parsed;
}
function parseData(input, context) {
  input = getModularInstance(input);
  if (looksLikeJsonObject(input)) {
    validatePlainObject("Unsupported field value:", context, input);
    return parseObject(input, context);
  } else if (input instanceof FieldValue) {
    parseSentinelFieldValue(input, context);
    return null;
  } else if (input === void 0 && context.ignoreUndefinedProperties) {
    return null;
  } else {
    if (context.path) {
      context.fieldMask.push(context.path);
    }
    if (input instanceof Array) {
      if (context.settings.arrayElement && context.dataSource !== 4) {
        throw context.createError("Nested arrays are not supported");
      }
      return parseArray(input, context);
    } else {
      return parseScalarValue(input, context);
    }
  }
}
function parseObject(obj, context) {
  const fields = {};
  if (isEmpty(obj)) {
    if (context.path && context.path.length > 0) {
      context.fieldMask.push(context.path);
    }
  } else {
    forEach(obj, (key, val) => {
      const parsedValue = parseData(val, context.childContextForField(key));
      if (parsedValue != null) {
        fields[key] = parsedValue;
      }
    });
  }
  return {
    mapValue: {
      fields
    }
  };
}
function parseArray(array, context) {
  const values = [];
  let entryIndex = 0;
  for (const entry of array) {
    let parsedEntry = parseData(entry, context.childContextForArray(entryIndex));
    if (parsedEntry == null) {
      parsedEntry = {
        nullValue: "NULL_VALUE"
      };
    }
    values.push(parsedEntry);
    entryIndex++;
  }
  return {
    arrayValue: {
      values
    }
  };
}
function parseSentinelFieldValue(value, context) {
  if (!isWrite(context.dataSource)) {
    throw context.createError(`${value._methodName}() can only be used with update() and set()`);
  }
  if (!context.path) {
    throw context.createError(`${value._methodName}() is not currently supported inside arrays`);
  }
  const fieldTransform = value._toFieldTransform(context);
  if (fieldTransform) {
    context.fieldTransforms.push(fieldTransform);
  }
}
function parseScalarValue(value, context) {
  value = getModularInstance(value);
  if (value === null) {
    return {
      nullValue: "NULL_VALUE"
    };
  } else if (typeof value === "number") {
    return toNumber(context.serializer, value);
  } else if (typeof value === "boolean") {
    return {
      booleanValue: value
    };
  } else if (typeof value === "string") {
    return {
      stringValue: value
    };
  } else if (value instanceof Date) {
    const timestamp = Timestamp.fromDate(value);
    return {
      timestampValue: toTimestamp(context.serializer, timestamp)
    };
  } else if (value instanceof Timestamp) {
    const timestamp = new Timestamp(value.seconds, Math.floor(value.nanoseconds / 1e3) * 1e3);
    return {
      timestampValue: toTimestamp(context.serializer, timestamp)
    };
  } else if (value instanceof GeoPoint) {
    return {
      geoPointValue: {
        latitude: value.latitude,
        longitude: value.longitude
      }
    };
  } else if (value instanceof Bytes) {
    return {
      bytesValue: toBytes(context.serializer, value._byteString)
    };
  } else if (value instanceof DocumentReference) {
    const thisDb = context.databaseId;
    const otherDb = value.firestore._databaseId;
    if (!otherDb.isEqual(thisDb)) {
      throw context.createError(`Document reference is for database ${otherDb.projectId}/${otherDb.database} but should be for database ${thisDb.projectId}/${thisDb.database}`);
    }
    return {
      referenceValue: toResourceName(value.firestore._databaseId || context.databaseId, value._key.path)
    };
  } else if (value instanceof VectorValue) {
    return parseVectorValue(value, context);
  } else {
    throw context.createError(`Unsupported field value: ${valueDescription(value)}`);
  }
}
function parseVectorValue(value, context) {
  const mapValue = {
    fields: {
      [TYPE_KEY]: {
        stringValue: VECTOR_VALUE_SENTINEL
      },
      [VECTOR_MAP_VECTORS_KEY]: {
        arrayValue: {
          values: value.toArray().map((value2) => {
            if (typeof value2 !== "number") {
              throw context.createError("VectorValues must only contain numeric values.");
            }
            return toDouble(context.serializer, value2);
          })
        }
      }
    }
  };
  return {
    mapValue
  };
}
function looksLikeJsonObject(input) {
  return typeof input === "object" && input !== null && !(input instanceof Array) && !(input instanceof Date) && !(input instanceof Timestamp) && !(input instanceof GeoPoint) && !(input instanceof Bytes) && !(input instanceof DocumentReference) && !(input instanceof FieldValue) && !(input instanceof VectorValue);
}
function validatePlainObject(message, context, input) {
  if (!looksLikeJsonObject(input) || !isPlainObject(input)) {
    const description = valueDescription(input);
    if (description === "an object") {
      throw context.createError(message + " a custom object");
    } else {
      throw context.createError(message + " " + description);
    }
  }
}
function fieldPathFromArgument$1(methodName, path, targetDoc) {
  path = getModularInstance(path);
  if (path instanceof FieldPath) {
    return path._internalPath;
  } else if (typeof path === "string") {
    return fieldPathFromDotSeparatedString(methodName, path);
  } else {
    const message = "Field path arguments must be of type string or ";
    throw createError(
      message,
      methodName,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      targetDoc
    );
  }
}
var FIELD_PATH_RESERVED = new RegExp("[~\\*/\\[\\]]");
function fieldPathFromDotSeparatedString(methodName, path, targetDoc) {
  const found = path.search(FIELD_PATH_RESERVED);
  if (found >= 0) {
    throw createError(
      `Invalid field path (${path}). Paths must not contain '~', '*', '/', '[', or ']'`,
      methodName,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      targetDoc
    );
  }
  try {
    return new FieldPath(...path.split("."))._internalPath;
  } catch (e) {
    throw createError(
      `Invalid field path (${path}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      methodName,
      /* hasConverter= */
      false,
      /* path= */
      void 0,
      targetDoc
    );
  }
}
function createError(reason, methodName, hasConverter, path, targetDoc) {
  const hasPath = path && !path.isEmpty();
  const hasDocument = targetDoc !== void 0;
  let message = `Function ${methodName}() called with invalid data`;
  if (hasConverter) {
    message += " (via `toFirestore()`)";
  }
  message += ". ";
  let description = "";
  if (hasPath || hasDocument) {
    description += " (found";
    if (hasPath) {
      description += ` in field ${path}`;
    }
    if (hasDocument) {
      description += ` in document ${targetDoc}`;
    }
    description += ")";
  }
  return new FirestoreError(Code.INVALID_ARGUMENT, message + reason + description);
}
function fieldMaskContains(haystack, needle) {
  return haystack.some((v) => v.isEqual(needle));
}
var DocumentSnapshot$1 = class {
  // Note: This class is stripped down version of the DocumentSnapshot in
  // the legacy SDK. The changes are:
  // - No support for SnapshotMetadata.
  // - No support for SnapshotOptions.
  /** @hideconstructor protected */
  constructor(_firestore, _userDataWriter, _key, _document, _converter) {
    this._firestore = _firestore;
    this._userDataWriter = _userDataWriter;
    this._key = _key;
    this._document = _document;
    this._converter = _converter;
  }
  /** Property of the `DocumentSnapshot` that provides the document's ID. */
  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * The `DocumentReference` for the document included in the `DocumentSnapshot`.
   */
  get ref() {
    return new DocumentReference(this._firestore, this._converter, this._key);
  }
  /**
   * Signals whether or not the document at the snapshot's location exists.
   *
   * @returns true if the document exists.
   */
  exists() {
    return this._document !== null;
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * @returns An `Object` containing all fields in the document or `undefined`
   * if the document doesn't exist.
   */
  data() {
    if (!this._document) {
      return void 0;
    } else if (this._converter) {
      const snapshot = new QueryDocumentSnapshot$1(
        this._firestore,
        this._userDataWriter,
        this._key,
        this._document,
        /* converter= */
        null
      );
      return this._converter.fromFirestore(snapshot);
    } else {
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(fieldPath) {
    if (this._document) {
      const value = this._document.data.field(fieldPathFromArgument("DocumentSnapshot.get", fieldPath));
      if (value !== null) {
        return this._userDataWriter.convertValue(value);
      }
    }
    return void 0;
  }
};
var QueryDocumentSnapshot$1 = class extends DocumentSnapshot$1 {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * @override
   * @returns An `Object` containing all fields in the document.
   */
  data() {
    return super.data();
  }
};
function fieldPathFromArgument(methodName, arg) {
  if (typeof arg === "string") {
    return fieldPathFromDotSeparatedString(methodName, arg);
  } else if (arg instanceof FieldPath) {
    return arg._internalPath;
  } else {
    return arg._delegate._internalPath;
  }
}
function validateHasExplicitOrderByForLimitToLast(query3) {
  if (query3.limitType === "L" && query3.explicitOrderBy.length === 0) {
    throw new FirestoreError(Code.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
  }
}
var AppliableConstraint = class {
};
var QueryConstraint = class extends AppliableConstraint {
};
function query(query3, queryConstraint, ...additionalQueryConstraints) {
  let queryConstraints = [];
  if (queryConstraint instanceof AppliableConstraint) {
    queryConstraints.push(queryConstraint);
  }
  queryConstraints = queryConstraints.concat(additionalQueryConstraints);
  validateQueryConstraintArray(queryConstraints);
  for (const constraint of queryConstraints) {
    query3 = constraint._apply(query3);
  }
  return query3;
}
var QueryFieldFilterConstraint = class _QueryFieldFilterConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(_field, _op, _value) {
    super();
    this._field = _field;
    this._op = _op;
    this._value = _value;
    this.type = "where";
  }
  static _create(_field, _op, _value) {
    return new _QueryFieldFilterConstraint(_field, _op, _value);
  }
  _apply(query3) {
    const filter2 = this._parse(query3);
    validateNewFieldFilter(query3._query, filter2);
    return new Query(query3.firestore, query3.converter, queryWithAddedFilter(query3._query, filter2));
  }
  _parse(query3) {
    const reader = newUserDataReader(query3.firestore);
    const filter2 = newQueryFilter(query3._query, "where", reader, query3.firestore._databaseId, this._field, this._op, this._value);
    return filter2;
  }
};
function where(fieldPath, opStr, value) {
  const op = opStr;
  const field = fieldPathFromArgument("where", fieldPath);
  return QueryFieldFilterConstraint._create(field, op, value);
}
var QueryCompositeFilterConstraint = class _QueryCompositeFilterConstraint extends AppliableConstraint {
  /**
   * @internal
   */
  constructor(type, _queryConstraints) {
    super();
    this.type = type;
    this._queryConstraints = _queryConstraints;
  }
  static _create(type, _queryConstraints) {
    return new _QueryCompositeFilterConstraint(type, _queryConstraints);
  }
  _parse(query3) {
    const parsedFilters = this._queryConstraints.map((queryConstraint) => {
      return queryConstraint._parse(query3);
    }).filter((parsedFilter) => parsedFilter.getFilters().length > 0);
    if (parsedFilters.length === 1) {
      return parsedFilters[0];
    }
    return CompositeFilter.create(parsedFilters, this._getOperator());
  }
  _apply(query3) {
    const parsedFilter = this._parse(query3);
    if (parsedFilter.getFilters().length === 0) {
      return query3;
    }
    validateNewFilter(query3._query, parsedFilter);
    return new Query(query3.firestore, query3.converter, queryWithAddedFilter(query3._query, parsedFilter));
  }
  _getQueryConstraints() {
    return this._queryConstraints;
  }
  _getOperator() {
    return this.type === "and" ? "and" : "or";
  }
};
function or(...queryConstraints) {
  queryConstraints.forEach((queryConstraint) => validateQueryFilterConstraint("or", queryConstraint));
  return QueryCompositeFilterConstraint._create("or", queryConstraints);
}
function and(...queryConstraints) {
  queryConstraints.forEach((queryConstraint) => validateQueryFilterConstraint("and", queryConstraint));
  return QueryCompositeFilterConstraint._create("and", queryConstraints);
}
var QueryOrderByConstraint = class _QueryOrderByConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(_field, _direction) {
    super();
    this._field = _field;
    this._direction = _direction;
    this.type = "orderBy";
  }
  static _create(_field, _direction) {
    return new _QueryOrderByConstraint(_field, _direction);
  }
  _apply(query3) {
    const orderBy3 = newQueryOrderBy(query3._query, this._field, this._direction);
    return new Query(query3.firestore, query3.converter, queryWithAddedOrderBy(query3._query, orderBy3));
  }
};
function orderBy(fieldPath, directionStr = "asc") {
  const direction = directionStr;
  const path = fieldPathFromArgument("orderBy", fieldPath);
  return QueryOrderByConstraint._create(path, direction);
}
var QueryLimitConstraint = class _QueryLimitConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(type, _limit, _limitType) {
    super();
    this.type = type;
    this._limit = _limit;
    this._limitType = _limitType;
  }
  static _create(type, _limit, _limitType) {
    return new _QueryLimitConstraint(type, _limit, _limitType);
  }
  _apply(query3) {
    return new Query(query3.firestore, query3.converter, queryWithLimit(query3._query, this._limit, this._limitType));
  }
};
function limit(limit3) {
  validatePositiveNumber("limit", limit3);
  return QueryLimitConstraint._create(
    "limit",
    limit3,
    "F"
    /* LimitType.First */
  );
}
function limitToLast(limit3) {
  validatePositiveNumber("limitToLast", limit3);
  return QueryLimitConstraint._create(
    "limitToLast",
    limit3,
    "L"
    /* LimitType.Last */
  );
}
var QueryStartAtConstraint = class _QueryStartAtConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(type, _docOrFields, _inclusive) {
    super();
    this.type = type;
    this._docOrFields = _docOrFields;
    this._inclusive = _inclusive;
  }
  static _create(type, _docOrFields, _inclusive) {
    return new _QueryStartAtConstraint(type, _docOrFields, _inclusive);
  }
  _apply(query3) {
    const bound = newQueryBoundFromDocOrFields(query3, this.type, this._docOrFields, this._inclusive);
    return new Query(query3.firestore, query3.converter, queryWithStartAt(query3._query, bound));
  }
};
function startAt(...docOrFields) {
  return QueryStartAtConstraint._create(
    "startAt",
    docOrFields,
    /*inclusive=*/
    true
  );
}
function startAfter(...docOrFields) {
  return QueryStartAtConstraint._create(
    "startAfter",
    docOrFields,
    /*inclusive=*/
    false
  );
}
var QueryEndAtConstraint = class _QueryEndAtConstraint extends QueryConstraint {
  /**
   * @internal
   */
  constructor(type, _docOrFields, _inclusive) {
    super();
    this.type = type;
    this._docOrFields = _docOrFields;
    this._inclusive = _inclusive;
  }
  static _create(type, _docOrFields, _inclusive) {
    return new _QueryEndAtConstraint(type, _docOrFields, _inclusive);
  }
  _apply(query3) {
    const bound = newQueryBoundFromDocOrFields(query3, this.type, this._docOrFields, this._inclusive);
    return new Query(query3.firestore, query3.converter, queryWithEndAt(query3._query, bound));
  }
};
function endBefore(...docOrFields) {
  return QueryEndAtConstraint._create(
    "endBefore",
    docOrFields,
    /*inclusive=*/
    false
  );
}
function endAt(...docOrFields) {
  return QueryEndAtConstraint._create(
    "endAt",
    docOrFields,
    /*inclusive=*/
    true
  );
}
function newQueryBoundFromDocOrFields(query3, methodName, docOrFields, inclusive) {
  docOrFields[0] = getModularInstance(docOrFields[0]);
  if (docOrFields[0] instanceof DocumentSnapshot$1) {
    return newQueryBoundFromDocument(query3._query, query3.firestore._databaseId, methodName, docOrFields[0]._document, inclusive);
  } else {
    const reader = newUserDataReader(query3.firestore);
    return newQueryBoundFromFields(query3._query, query3.firestore._databaseId, reader, methodName, docOrFields, inclusive);
  }
}
function newQueryFilter(query3, methodName, dataReader, databaseId, fieldPath, op, value) {
  let fieldValue;
  if (fieldPath.isKeyField()) {
    if (op === "array-contains" || op === "array-contains-any") {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid Query. You can't perform '${op}' queries on documentId().`);
    } else if (op === "in" || op === "not-in") {
      validateDisjunctiveFilterElements(value, op);
      const referenceList = [];
      for (const arrayValue of value) {
        referenceList.push(parseDocumentIdValue(databaseId, query3, arrayValue));
      }
      fieldValue = {
        arrayValue: {
          values: referenceList
        }
      };
    } else {
      fieldValue = parseDocumentIdValue(databaseId, query3, value);
    }
  } else {
    if (op === "in" || op === "not-in" || op === "array-contains-any") {
      validateDisjunctiveFilterElements(value, op);
    }
    fieldValue = parseQueryValue(
      dataReader,
      methodName,
      value,
      /* allowArrays= */
      op === "in" || op === "not-in"
      /* Operator.NOT_IN */
    );
  }
  const filter2 = FieldFilter.create(fieldPath, op, fieldValue);
  return filter2;
}
function newQueryOrderBy(query3, fieldPath, direction) {
  if (query3.startAt !== null) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
  }
  if (query3.endAt !== null) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
  }
  const orderBy3 = new OrderBy(fieldPath, direction);
  return orderBy3;
}
function newQueryBoundFromDocument(query3, databaseId, methodName, doc4, inclusive) {
  if (!doc4) {
    throw new FirestoreError(Code.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${methodName}().`);
  }
  const components = [];
  for (const orderBy3 of queryNormalizedOrderBy(query3)) {
    if (orderBy3.field.isKeyField()) {
      components.push(refValue(databaseId, doc4.key));
    } else {
      const value = doc4.data.field(orderBy3.field);
      if (isServerTimestamp(value)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + orderBy3.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
      } else if (value !== null) {
        components.push(value);
      } else {
        const field = orderBy3.field.canonicalString();
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${field}' (used as the orderBy) does not exist.`);
      }
    }
  }
  return new Bound(components, inclusive);
}
function newQueryBoundFromFields(query3, databaseId, dataReader, methodName, values, inclusive) {
  const orderBy3 = query3.explicitOrderBy;
  if (values.length > orderBy3.length) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Too many arguments provided to ${methodName}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
  }
  const components = [];
  for (let i = 0; i < values.length; i++) {
    const rawValue = values[i];
    const orderByComponent = orderBy3[i];
    if (orderByComponent.field.isKeyField()) {
      if (typeof rawValue !== "string") {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${methodName}(), but got a ${typeof rawValue}`);
      }
      if (!isCollectionGroupQuery(query3) && rawValue.indexOf("/") !== -1) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${methodName}() must be a plain document ID, but '${rawValue}' contains a slash.`);
      }
      const path = query3.path.child(ResourcePath.fromString(rawValue));
      if (!DocumentKey.isDocumentKey(path)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${methodName}() must result in a valid document path, but '${path}' is not because it contains an odd number of segments.`);
      }
      const key = new DocumentKey(path);
      components.push(refValue(databaseId, key));
    } else {
      const wrapped = parseQueryValue(dataReader, methodName, rawValue);
      components.push(wrapped);
    }
  }
  return new Bound(components, inclusive);
}
function parseDocumentIdValue(databaseId, query3, documentIdValue) {
  documentIdValue = getModularInstance(documentIdValue);
  if (typeof documentIdValue === "string") {
    if (documentIdValue === "") {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
    }
    if (!isCollectionGroupQuery(query3) && documentIdValue.indexOf("/") !== -1) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${documentIdValue}' contains a '/' character.`);
    }
    const path = query3.path.child(ResourcePath.fromString(documentIdValue));
    if (!DocumentKey.isDocumentKey(path)) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${path}' is not because it has an odd number of segments (${path.length}).`);
    }
    return refValue(databaseId, new DocumentKey(path));
  } else if (documentIdValue instanceof DocumentReference) {
    return refValue(databaseId, documentIdValue._key);
  } else {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${valueDescription(documentIdValue)}.`);
  }
}
function validateDisjunctiveFilterElements(value, operator) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${operator.toString()}' filters.`);
  }
}
function conflictingOps(op) {
  switch (op) {
    case "!=":
      return [
        "!=",
        "not-in"
        /* Operator.NOT_IN */
      ];
    case "array-contains-any":
    case "in":
      return [
        "not-in"
        /* Operator.NOT_IN */
      ];
    case "not-in":
      return [
        "array-contains-any",
        "in",
        "not-in",
        "!="
        /* Operator.NOT_EQUAL */
      ];
    default:
      return [];
  }
}
function validateNewFieldFilter(query3, fieldFilter) {
  const conflictingOp = findOpInsideFilters(query3.filters, conflictingOps(fieldFilter.op));
  if (conflictingOp !== null) {
    if (conflictingOp === fieldFilter.op) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${fieldFilter.op.toString()}' filter.`);
    } else {
      throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. You cannot use '${fieldFilter.op.toString()}' filters with '${conflictingOp.toString()}' filters.`);
    }
  }
}
function validateNewFilter(query3, filter2) {
  let testQuery = query3;
  const subFilters = filter2.getFlattenedFilters();
  for (const subFilter of subFilters) {
    validateNewFieldFilter(testQuery, subFilter);
    testQuery = queryWithAddedFilter(testQuery, subFilter);
  }
}
function findOpInsideFilters(filters, operators) {
  for (const filter2 of filters) {
    for (const fieldFilter of filter2.getFlattenedFilters()) {
      if (operators.indexOf(fieldFilter.op) >= 0) {
        return fieldFilter.op;
      }
    }
  }
  return null;
}
function validateQueryFilterConstraint(functionName, queryConstraint) {
  if (!(queryConstraint instanceof QueryFieldFilterConstraint) && !(queryConstraint instanceof QueryCompositeFilterConstraint)) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${functionName}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`);
  }
}
function validateQueryConstraintArray(queryConstraint) {
  const compositeFilterCount = queryConstraint.filter((filter2) => filter2 instanceof QueryCompositeFilterConstraint).length;
  const fieldFilterCount = queryConstraint.filter((filter2) => filter2 instanceof QueryFieldFilterConstraint).length;
  if (compositeFilterCount > 1 || compositeFilterCount > 0 && fieldFilterCount > 0) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.");
  }
}
var AbstractUserDataWriter = class {
  convertValue(value, serverTimestampBehavior = "none") {
    switch (typeOrder(value)) {
      case 0:
        return null;
      case 1:
        return value.booleanValue;
      case 2:
        return normalizeNumber(value.integerValue || value.doubleValue);
      case 3:
        return this.convertTimestamp(value.timestampValue);
      case 4:
        return this.convertServerTimestamp(value, serverTimestampBehavior);
      case 5:
        return value.stringValue;
      case 6:
        return this.convertBytes(normalizeByteString(value.bytesValue));
      case 7:
        return this.convertReference(value.referenceValue);
      case 8:
        return this.convertGeoPoint(value.geoPointValue);
      case 9:
        return this.convertArray(value.arrayValue, serverTimestampBehavior);
      case 11:
        return this.convertObject(value.mapValue, serverTimestampBehavior);
      case 10:
        return this.convertVectorValue(value.mapValue);
      default:
        throw fail();
    }
  }
  convertObject(mapValue, serverTimestampBehavior) {
    return this.convertObjectMap(mapValue.fields, serverTimestampBehavior);
  }
  /**
   * @internal
   */
  convertObjectMap(fields, serverTimestampBehavior = "none") {
    const result = {};
    forEach(fields, (key, value) => {
      result[key] = this.convertValue(value, serverTimestampBehavior);
    });
    return result;
  }
  /**
   * @internal
   */
  convertVectorValue(mapValue) {
    var _a, _b, _c;
    const values = (_c = (_b = (_a = mapValue.fields) === null || _a === void 0 ? void 0 : _a[VECTOR_MAP_VECTORS_KEY].arrayValue) === null || _b === void 0 ? void 0 : _b.values) === null || _c === void 0 ? void 0 : _c.map((value) => {
      return normalizeNumber(value.doubleValue);
    });
    return new VectorValue(values);
  }
  convertGeoPoint(value) {
    return new GeoPoint(normalizeNumber(value.latitude), normalizeNumber(value.longitude));
  }
  convertArray(arrayValue, serverTimestampBehavior) {
    return (arrayValue.values || []).map((value) => this.convertValue(value, serverTimestampBehavior));
  }
  convertServerTimestamp(value, serverTimestampBehavior) {
    switch (serverTimestampBehavior) {
      case "previous":
        const previousValue = getPreviousValue(value);
        if (previousValue == null) {
          return null;
        }
        return this.convertValue(previousValue, serverTimestampBehavior);
      case "estimate":
        return this.convertTimestamp(getLocalWriteTime(value));
      default:
        return null;
    }
  }
  convertTimestamp(value) {
    const normalizedValue = normalizeTimestamp(value);
    return new Timestamp(normalizedValue.seconds, normalizedValue.nanos);
  }
  convertDocumentKey(name2, expectedDatabaseId) {
    const resourcePath = ResourcePath.fromString(name2);
    hardAssert(isValidResourceName(resourcePath));
    const databaseId = new DatabaseId(resourcePath.get(1), resourcePath.get(3));
    const key = new DocumentKey(resourcePath.popFirst(5));
    if (!databaseId.isEqual(expectedDatabaseId)) {
      logError(`Document ${key} contains a document reference within a different database (${databaseId.projectId}/${databaseId.database}) which is not supported. It will be treated as a reference in the current database (${expectedDatabaseId.projectId}/${expectedDatabaseId.database}) instead.`);
    }
    return key;
  }
};
function applyFirestoreDataConverter(converter, value, options) {
  let convertedValue;
  if (converter) {
    if (options && (options.merge || options.mergeFields)) {
      convertedValue = converter.toFirestore(value, options);
    } else {
      convertedValue = converter.toFirestore(value);
    }
  } else {
    convertedValue = value;
  }
  return convertedValue;
}
var LiteUserDataWriter = class extends AbstractUserDataWriter {
  constructor(firestore) {
    super();
    this.firestore = firestore;
  }
  convertBytes(bytes) {
    return new Bytes(bytes);
  }
  convertReference(name2) {
    const key = this.convertDocumentKey(name2, this.firestore._databaseId);
    return new DocumentReference(
      this.firestore,
      /* converter= */
      null,
      key
    );
  }
};
function sum(field) {
  return new AggregateField("sum", fieldPathFromArgument$1("sum", field));
}
function average(field) {
  return new AggregateField("avg", fieldPathFromArgument$1("average", field));
}
function count() {
  return new AggregateField("count");
}
function aggregateFieldEqual(left, right) {
  var _a, _b;
  return left instanceof AggregateField && right instanceof AggregateField && left.aggregateType === right.aggregateType && ((_a = left._internalFieldPath) === null || _a === void 0 ? void 0 : _a.canonicalString()) === ((_b = right._internalFieldPath) === null || _b === void 0 ? void 0 : _b.canonicalString());
}
function aggregateQuerySnapshotEqual(left, right) {
  return queryEqual(left.query, right.query) && deepEqual(left.data(), right.data());
}
function isPartialObserver(obj) {
  return implementsAnyMethods(obj, ["next", "error", "complete"]);
}
function implementsAnyMethods(obj, methods) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  const object = obj;
  for (const method of methods) {
    if (method in object && typeof object[method] === "function") {
      return true;
    }
  }
  return false;
}
var SnapshotMetadata = class {
  /** @hideconstructor */
  constructor(hasPendingWrites, fromCache) {
    this.hasPendingWrites = hasPendingWrites;
    this.fromCache = fromCache;
  }
  /**
   * Returns true if this `SnapshotMetadata` is equal to the provided one.
   *
   * @param other - The `SnapshotMetadata` to compare against.
   * @returns true if this `SnapshotMetadata` is equal to the provided one.
   */
  isEqual(other) {
    return this.hasPendingWrites === other.hasPendingWrites && this.fromCache === other.fromCache;
  }
};
var DocumentSnapshot = class extends DocumentSnapshot$1 {
  /** @hideconstructor protected */
  constructor(_firestore, userDataWriter, key, document, metadata, converter) {
    super(_firestore, userDataWriter, key, document, converter);
    this._firestore = _firestore;
    this._firestoreImpl = _firestore;
    this.metadata = metadata;
  }
  /**
   * Returns whether or not the data exists. True if the document exists.
   */
  exists() {
    return super.exists();
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * By default, `serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @param options - An options object to configure how data is retrieved from
   * the snapshot (for example the desired behavior for server timestamps that
   * have not yet been set to their final value).
   * @returns An `Object` containing all fields in the document or `undefined` if
   * the document doesn't exist.
   */
  data(options = {}) {
    if (!this._document) {
      return void 0;
    } else if (this._converter) {
      const snapshot = new QueryDocumentSnapshot(
        this._firestore,
        this._userDataWriter,
        this._key,
        this._document,
        this.metadata,
        /* converter= */
        null
      );
      return this._converter.fromFirestore(snapshot, options);
    } else {
      return this._userDataWriter.convertValue(this._document.data.value, options.serverTimestamps);
    }
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * By default, a `serverTimestamp()` that has not yet been set to
   * its final value will be returned as `null`. You can override this by
   * passing an options object.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @param options - An options object to configure how the field is retrieved
   * from the snapshot (for example the desired behavior for server timestamps
   * that have not yet been set to their final value).
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(fieldPath, options = {}) {
    if (this._document) {
      const value = this._document.data.field(fieldPathFromArgument("DocumentSnapshot.get", fieldPath));
      if (value !== null) {
        return this._userDataWriter.convertValue(value, options.serverTimestamps);
      }
    }
    return void 0;
  }
};
var QueryDocumentSnapshot = class extends DocumentSnapshot {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * By default, `serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @override
   * @param options - An options object to configure how data is retrieved from
   * the snapshot (for example the desired behavior for server timestamps that
   * have not yet been set to their final value).
   * @returns An `Object` containing all fields in the document.
   */
  data(options = {}) {
    return super.data(options);
  }
};
var QuerySnapshot = class {
  /** @hideconstructor */
  constructor(_firestore, _userDataWriter, query3, _snapshot) {
    this._firestore = _firestore;
    this._userDataWriter = _userDataWriter;
    this._snapshot = _snapshot;
    this.metadata = new SnapshotMetadata(_snapshot.hasPendingWrites, _snapshot.fromCache);
    this.query = query3;
  }
  /** An array of all the documents in the `QuerySnapshot`. */
  get docs() {
    const result = [];
    this.forEach((doc4) => result.push(doc4));
    return result;
  }
  /** The number of documents in the `QuerySnapshot`. */
  get size() {
    return this._snapshot.docs.size;
  }
  /** True if there are no documents in the `QuerySnapshot`. */
  get empty() {
    return this.size === 0;
  }
  /**
   * Enumerates all of the documents in the `QuerySnapshot`.
   *
   * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
   * each document in the snapshot.
   * @param thisArg - The `this` binding for the callback.
   */
  forEach(callback, thisArg) {
    this._snapshot.docs.forEach((doc4) => {
      callback.call(thisArg, new QueryDocumentSnapshot(this._firestore, this._userDataWriter, doc4.key, doc4, new SnapshotMetadata(this._snapshot.mutatedKeys.has(doc4.key), this._snapshot.fromCache), this.query.converter));
    });
  }
  /**
   * Returns an array of the documents changes since the last snapshot. If this
   * is the first snapshot, all documents will be in the list as 'added'
   * changes.
   *
   * @param options - `SnapshotListenOptions` that control whether metadata-only
   * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
   * snapshot events.
   */
  docChanges(options = {}) {
    const includeMetadataChanges = !!options.includeMetadataChanges;
    if (includeMetadataChanges && this._snapshot.excludesMetadataChanges) {
      throw new FirestoreError(Code.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
    }
    if (!this._cachedChanges || this._cachedChangesIncludeMetadataChanges !== includeMetadataChanges) {
      this._cachedChanges = changesFromSnapshot(this, includeMetadataChanges);
      this._cachedChangesIncludeMetadataChanges = includeMetadataChanges;
    }
    return this._cachedChanges;
  }
};
function changesFromSnapshot(querySnapshot, includeMetadataChanges) {
  if (querySnapshot._snapshot.oldDocs.isEmpty()) {
    let index = 0;
    return querySnapshot._snapshot.docChanges.map((change) => {
      const doc4 = new QueryDocumentSnapshot(querySnapshot._firestore, querySnapshot._userDataWriter, change.doc.key, change.doc, new SnapshotMetadata(querySnapshot._snapshot.mutatedKeys.has(change.doc.key), querySnapshot._snapshot.fromCache), querySnapshot.query.converter);
      change.doc;
      return {
        type: "added",
        doc: doc4,
        oldIndex: -1,
        newIndex: index++
      };
    });
  } else {
    let indexTracker = querySnapshot._snapshot.oldDocs;
    return querySnapshot._snapshot.docChanges.filter(
      (change) => includeMetadataChanges || change.type !== 3
      /* ChangeType.Metadata */
    ).map((change) => {
      const doc4 = new QueryDocumentSnapshot(querySnapshot._firestore, querySnapshot._userDataWriter, change.doc.key, change.doc, new SnapshotMetadata(querySnapshot._snapshot.mutatedKeys.has(change.doc.key), querySnapshot._snapshot.fromCache), querySnapshot.query.converter);
      let oldIndex = -1;
      let newIndex = -1;
      if (change.type !== 0) {
        oldIndex = indexTracker.indexOf(change.doc.key);
        indexTracker = indexTracker.delete(change.doc.key);
      }
      if (change.type !== 1) {
        indexTracker = indexTracker.add(change.doc);
        newIndex = indexTracker.indexOf(change.doc.key);
      }
      return {
        type: resultChangeType(change.type),
        doc: doc4,
        oldIndex,
        newIndex
      };
    });
  }
}
function resultChangeType(type) {
  switch (type) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return fail();
  }
}
function snapshotEqual(left, right) {
  if (left instanceof DocumentSnapshot && right instanceof DocumentSnapshot) {
    return left._firestore === right._firestore && left._key.isEqual(right._key) && (left._document === null ? right._document === null : left._document.isEqual(right._document)) && left._converter === right._converter;
  } else if (left instanceof QuerySnapshot && right instanceof QuerySnapshot) {
    return left._firestore === right._firestore && queryEqual(left.query, right.query) && left.metadata.isEqual(right.metadata) && left._snapshot.isEqual(right._snapshot);
  }
  return false;
}
function getDoc(reference) {
  reference = cast(reference, DocumentReference);
  const firestore = cast(reference.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientGetDocumentViaSnapshotListener(client, reference._key).then((snapshot) => convertToDocSnapshot(firestore, reference, snapshot));
}
var ExpUserDataWriter = class extends AbstractUserDataWriter {
  constructor(firestore) {
    super();
    this.firestore = firestore;
  }
  convertBytes(bytes) {
    return new Bytes(bytes);
  }
  convertReference(name2) {
    const key = this.convertDocumentKey(name2, this.firestore._databaseId);
    return new DocumentReference(
      this.firestore,
      /* converter= */
      null,
      key
    );
  }
};
function getDocFromCache(reference) {
  reference = cast(reference, DocumentReference);
  const firestore = cast(reference.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const userDataWriter = new ExpUserDataWriter(firestore);
  return firestoreClientGetDocumentFromLocalCache(client, reference._key).then((doc4) => new DocumentSnapshot(firestore, userDataWriter, reference._key, doc4, new SnapshotMetadata(
    doc4 !== null && doc4.hasLocalMutations,
    /* fromCache= */
    true
  ), reference.converter));
}
function getDocFromServer(reference) {
  reference = cast(reference, DocumentReference);
  const firestore = cast(reference.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientGetDocumentViaSnapshotListener(client, reference._key, {
    source: "server"
  }).then((snapshot) => convertToDocSnapshot(firestore, reference, snapshot));
}
function getDocs(query3) {
  query3 = cast(query3, Query);
  const firestore = cast(query3.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const userDataWriter = new ExpUserDataWriter(firestore);
  validateHasExplicitOrderByForLimitToLast(query3._query);
  return firestoreClientGetDocumentsViaSnapshotListener(client, query3._query).then((snapshot) => new QuerySnapshot(firestore, userDataWriter, query3, snapshot));
}
function getDocsFromCache(query3) {
  query3 = cast(query3, Query);
  const firestore = cast(query3.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const userDataWriter = new ExpUserDataWriter(firestore);
  return firestoreClientGetDocumentsFromLocalCache(client, query3._query).then((snapshot) => new QuerySnapshot(firestore, userDataWriter, query3, snapshot));
}
function getDocsFromServer(query3) {
  query3 = cast(query3, Query);
  const firestore = cast(query3.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const userDataWriter = new ExpUserDataWriter(firestore);
  return firestoreClientGetDocumentsViaSnapshotListener(client, query3._query, {
    source: "server"
  }).then((snapshot) => new QuerySnapshot(firestore, userDataWriter, query3, snapshot));
}
function setDoc(reference, data, options) {
  reference = cast(reference, DocumentReference);
  const firestore = cast(reference.firestore, Firestore);
  const convertedValue = applyFirestoreDataConverter(reference.converter, data, options);
  const dataReader = newUserDataReader(firestore);
  const parsed = parseSetData(dataReader, "setDoc", reference._key, convertedValue, reference.converter !== null, options);
  const mutation = parsed.toMutation(reference._key, Precondition.none());
  return executeWrite(firestore, [mutation]);
}
function updateDoc(reference, fieldOrUpdateData, value, ...moreFieldsAndValues) {
  reference = cast(reference, DocumentReference);
  const firestore = cast(reference.firestore, Firestore);
  const dataReader = newUserDataReader(firestore);
  fieldOrUpdateData = getModularInstance(fieldOrUpdateData);
  let parsed;
  if (typeof fieldOrUpdateData === "string" || fieldOrUpdateData instanceof FieldPath) {
    parsed = parseUpdateVarargs(dataReader, "updateDoc", reference._key, fieldOrUpdateData, value, moreFieldsAndValues);
  } else {
    parsed = parseUpdateData(dataReader, "updateDoc", reference._key, fieldOrUpdateData);
  }
  const mutation = parsed.toMutation(reference._key, Precondition.exists(true));
  return executeWrite(firestore, [mutation]);
}
function deleteDoc(reference) {
  const firestore = cast(reference.firestore, Firestore);
  const mutations = [new DeleteMutation(reference._key, Precondition.none())];
  return executeWrite(firestore, mutations);
}
function addDoc(reference, data) {
  const firestore = cast(reference.firestore, Firestore);
  const docRef = doc2(reference);
  const convertedValue = applyFirestoreDataConverter(reference.converter, data);
  const dataReader = newUserDataReader(reference.firestore);
  const parsed = parseSetData(dataReader, "addDoc", docRef._key, convertedValue, reference.converter !== null, {});
  const mutation = parsed.toMutation(docRef._key, Precondition.exists(false));
  return executeWrite(firestore, [mutation]).then(() => docRef);
}
function onSnapshot2(reference, ...args) {
  var _a, _b, _c;
  reference = getModularInstance(reference);
  let options = {
    includeMetadataChanges: false,
    source: "default"
  };
  let currArg = 0;
  if (typeof args[currArg] === "object" && !isPartialObserver(args[currArg])) {
    options = args[currArg];
    currArg++;
  }
  const internalOptions = {
    includeMetadataChanges: options.includeMetadataChanges,
    source: options.source
  };
  if (isPartialObserver(args[currArg])) {
    const userObserver = args[currArg];
    args[currArg] = (_a = userObserver.next) === null || _a === void 0 ? void 0 : _a.bind(userObserver);
    args[currArg + 1] = (_b = userObserver.error) === null || _b === void 0 ? void 0 : _b.bind(userObserver);
    args[currArg + 2] = (_c = userObserver.complete) === null || _c === void 0 ? void 0 : _c.bind(userObserver);
  }
  let observer;
  let firestore;
  let internalQuery;
  if (reference instanceof DocumentReference) {
    firestore = cast(reference.firestore, Firestore);
    internalQuery = newQueryForPath(reference._key.path);
    observer = {
      next: (snapshot) => {
        if (args[currArg]) {
          args[currArg](convertToDocSnapshot(firestore, reference, snapshot));
        }
      },
      error: args[currArg + 1],
      complete: args[currArg + 2]
    };
  } else {
    const query3 = cast(reference, Query);
    firestore = cast(query3.firestore, Firestore);
    internalQuery = query3._query;
    const userDataWriter = new ExpUserDataWriter(firestore);
    observer = {
      next: (snapshot) => {
        if (args[currArg]) {
          args[currArg](new QuerySnapshot(firestore, userDataWriter, query3, snapshot));
        }
      },
      error: args[currArg + 1],
      complete: args[currArg + 2]
    };
    validateHasExplicitOrderByForLimitToLast(reference._query);
  }
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientListen(client, internalQuery, internalOptions, observer);
}
function onSnapshotsInSync(firestore, arg) {
  firestore = cast(firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const observer = isPartialObserver(arg) ? arg : {
    next: arg
  };
  return firestoreClientAddSnapshotsInSyncListener(client, observer);
}
function executeWrite(firestore, mutations) {
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientWrite(client, mutations);
}
function convertToDocSnapshot(firestore, ref, snapshot) {
  const doc4 = snapshot.docs.get(ref._key);
  const userDataWriter = new ExpUserDataWriter(firestore);
  return new DocumentSnapshot(firestore, userDataWriter, ref._key, doc4, new SnapshotMetadata(snapshot.hasPendingWrites, snapshot.fromCache), ref.converter);
}
function getCountFromServer2(query3) {
  const countQuerySpec = {
    count: count()
  };
  return getAggregateFromServer(query3, countQuerySpec);
}
function getAggregateFromServer(query3, aggregateSpec) {
  const firestore = cast(query3.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const internalAggregates = mapToArray(aggregateSpec, (aggregate, alias) => {
    return new AggregateImpl(alias, aggregate.aggregateType, aggregate._internalFieldPath);
  });
  return firestoreClientRunAggregateQuery(client, query3._query, internalAggregates).then((aggregateResult) => convertToAggregateQuerySnapshot(firestore, query3, aggregateResult));
}
function convertToAggregateQuerySnapshot(firestore, query3, aggregateResult) {
  const userDataWriter = new ExpUserDataWriter(firestore);
  const querySnapshot = new AggregateQuerySnapshot(query3, userDataWriter, aggregateResult);
  return querySnapshot;
}
var MemoryLocalCacheImpl = class {
  constructor(settings) {
    this.kind = "memory";
    this._onlineComponentProvider = OnlineComponentProvider.provider;
    if (settings === null || settings === void 0 ? void 0 : settings.garbageCollector) {
      this._offlineComponentProvider = settings.garbageCollector._offlineComponentProvider;
    } else {
      this._offlineComponentProvider = MemoryOfflineComponentProvider.provider;
    }
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
};
var PersistentLocalCacheImpl = class {
  constructor(settings) {
    this.kind = "persistent";
    let tabManager;
    if (settings === null || settings === void 0 ? void 0 : settings.tabManager) {
      settings.tabManager._initialize(settings);
      tabManager = settings.tabManager;
    } else {
      tabManager = persistentSingleTabManager(void 0);
      tabManager._initialize(settings);
    }
    this._onlineComponentProvider = tabManager._onlineComponentProvider;
    this._offlineComponentProvider = tabManager._offlineComponentProvider;
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
};
var MemoryEagerGarbageCollectorImpl = class {
  constructor() {
    this.kind = "memoryEager";
    this._offlineComponentProvider = MemoryOfflineComponentProvider.provider;
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
};
var MemoryLruGarbageCollectorImpl = class {
  constructor(cacheSize) {
    this.kind = "memoryLru";
    this._offlineComponentProvider = {
      build: () => new LruGcMemoryOfflineComponentProvider(cacheSize)
    };
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
};
function memoryEagerGarbageCollector() {
  return new MemoryEagerGarbageCollectorImpl();
}
function memoryLruGarbageCollector(settings) {
  return new MemoryLruGarbageCollectorImpl(settings === null || settings === void 0 ? void 0 : settings.cacheSizeBytes);
}
function memoryLocalCache(settings) {
  return new MemoryLocalCacheImpl(settings);
}
function persistentLocalCache(settings) {
  return new PersistentLocalCacheImpl(settings);
}
var SingleTabManagerImpl = class {
  constructor(forceOwnership) {
    this.forceOwnership = forceOwnership;
    this.kind = "persistentSingleTab";
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
  /**
   * @internal
   */
  _initialize(settings) {
    this._onlineComponentProvider = OnlineComponentProvider.provider;
    this._offlineComponentProvider = {
      build: (onlineComponents) => new IndexedDbOfflineComponentProvider(onlineComponents, settings === null || settings === void 0 ? void 0 : settings.cacheSizeBytes, this.forceOwnership)
    };
  }
};
var MultiTabManagerImpl = class {
  constructor() {
    this.kind = "PersistentMultipleTab";
  }
  toJSON() {
    return {
      kind: this.kind
    };
  }
  /**
   * @internal
   */
  _initialize(settings) {
    this._onlineComponentProvider = OnlineComponentProvider.provider;
    this._offlineComponentProvider = {
      build: (onlineComponents) => new MultiTabOfflineComponentProvider(onlineComponents, settings === null || settings === void 0 ? void 0 : settings.cacheSizeBytes)
    };
  }
};
function persistentSingleTabManager(settings) {
  return new SingleTabManagerImpl(settings === null || settings === void 0 ? void 0 : settings.forceOwnership);
}
function persistentMultipleTabManager() {
  return new MultiTabManagerImpl();
}
var DEFAULT_TRANSACTION_OPTIONS = {
  maxAttempts: 5
};
function validateTransactionOptions(options) {
  if (options.maxAttempts < 1) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Max attempts must be at least 1");
  }
}
var WriteBatch = class {
  /** @hideconstructor */
  constructor(_firestore, _commitHandler) {
    this._firestore = _firestore;
    this._commitHandler = _commitHandler;
    this._mutations = [];
    this._committed = false;
    this._dataReader = newUserDataReader(_firestore);
  }
  set(documentRef, data, options) {
    this._verifyNotCommitted();
    const ref = validateReference(documentRef, this._firestore);
    const convertedValue = applyFirestoreDataConverter(ref.converter, data, options);
    const parsed = parseSetData(this._dataReader, "WriteBatch.set", ref._key, convertedValue, ref.converter !== null, options);
    this._mutations.push(parsed.toMutation(ref._key, Precondition.none()));
    return this;
  }
  update(documentRef, fieldOrUpdateData, value, ...moreFieldsAndValues) {
    this._verifyNotCommitted();
    const ref = validateReference(documentRef, this._firestore);
    fieldOrUpdateData = getModularInstance(fieldOrUpdateData);
    let parsed;
    if (typeof fieldOrUpdateData === "string" || fieldOrUpdateData instanceof FieldPath) {
      parsed = parseUpdateVarargs(this._dataReader, "WriteBatch.update", ref._key, fieldOrUpdateData, value, moreFieldsAndValues);
    } else {
      parsed = parseUpdateData(this._dataReader, "WriteBatch.update", ref._key, fieldOrUpdateData);
    }
    this._mutations.push(parsed.toMutation(ref._key, Precondition.exists(true)));
    return this;
  }
  /**
   * Deletes the document referred to by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be deleted.
   * @returns This `WriteBatch` instance. Used for chaining method calls.
   */
  delete(documentRef) {
    this._verifyNotCommitted();
    const ref = validateReference(documentRef, this._firestore);
    this._mutations = this._mutations.concat(new DeleteMutation(ref._key, Precondition.none()));
    return this;
  }
  /**
   * Commits all of the writes in this write batch as a single atomic unit.
   *
   * The result of these writes will only be reflected in document reads that
   * occur after the returned promise resolves. If the client is offline, the
   * write fails. If you would like to see local modifications or buffer writes
   * until the client is online, use the full Firestore SDK.
   *
   * @returns A `Promise` resolved once all of the writes in the batch have been
   * successfully written to the backend as an atomic unit (note that it won't
   * resolve while you're offline).
   */
  commit() {
    this._verifyNotCommitted();
    this._committed = true;
    if (this._mutations.length > 0) {
      return this._commitHandler(this._mutations);
    }
    return Promise.resolve();
  }
  _verifyNotCommitted() {
    if (this._committed) {
      throw new FirestoreError(Code.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }
  }
};
function validateReference(documentRef, firestore) {
  documentRef = getModularInstance(documentRef);
  if (documentRef.firestore !== firestore) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
  } else {
    return documentRef;
  }
}
var Transaction$1 = class {
  /** @hideconstructor */
  constructor(_firestore, _transaction) {
    this._firestore = _firestore;
    this._transaction = _transaction;
    this._dataReader = newUserDataReader(_firestore);
  }
  /**
   * Reads the document referenced by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be read.
   * @returns A `DocumentSnapshot` with the read data.
   */
  get(documentRef) {
    const ref = validateReference(documentRef, this._firestore);
    const userDataWriter = new LiteUserDataWriter(this._firestore);
    return this._transaction.lookup([ref._key]).then((docs) => {
      if (!docs || docs.length !== 1) {
        return fail();
      }
      const doc4 = docs[0];
      if (doc4.isFoundDocument()) {
        return new DocumentSnapshot$1(this._firestore, userDataWriter, doc4.key, doc4, ref.converter);
      } else if (doc4.isNoDocument()) {
        return new DocumentSnapshot$1(this._firestore, userDataWriter, ref._key, null, ref.converter);
      } else {
        throw fail();
      }
    });
  }
  set(documentRef, value, options) {
    const ref = validateReference(documentRef, this._firestore);
    const convertedValue = applyFirestoreDataConverter(ref.converter, value, options);
    const parsed = parseSetData(this._dataReader, "Transaction.set", ref._key, convertedValue, ref.converter !== null, options);
    this._transaction.set(ref._key, parsed);
    return this;
  }
  update(documentRef, fieldOrUpdateData, value, ...moreFieldsAndValues) {
    const ref = validateReference(documentRef, this._firestore);
    fieldOrUpdateData = getModularInstance(fieldOrUpdateData);
    let parsed;
    if (typeof fieldOrUpdateData === "string" || fieldOrUpdateData instanceof FieldPath) {
      parsed = parseUpdateVarargs(this._dataReader, "Transaction.update", ref._key, fieldOrUpdateData, value, moreFieldsAndValues);
    } else {
      parsed = parseUpdateData(this._dataReader, "Transaction.update", ref._key, fieldOrUpdateData);
    }
    this._transaction.update(ref._key, parsed);
    return this;
  }
  /**
   * Deletes the document referred to by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be deleted.
   * @returns This `Transaction` instance. Used for chaining method calls.
   */
  delete(documentRef) {
    const ref = validateReference(documentRef, this._firestore);
    this._transaction.delete(ref._key);
    return this;
  }
};
var Transaction = class extends Transaction$1 {
  // This class implements the same logic as the Transaction API in the Lite SDK
  // but is subclassed in order to return its own DocumentSnapshot types.
  /** @hideconstructor */
  constructor(_firestore, _transaction) {
    super(_firestore, _transaction);
    this._firestore = _firestore;
  }
  /**
   * Reads the document referenced by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be read.
   * @returns A `DocumentSnapshot` with the read data.
   */
  get(documentRef) {
    const ref = validateReference(documentRef, this._firestore);
    const userDataWriter = new ExpUserDataWriter(this._firestore);
    return super.get(documentRef).then((liteDocumentSnapshot) => new DocumentSnapshot(this._firestore, userDataWriter, ref._key, liteDocumentSnapshot._document, new SnapshotMetadata(
      /* hasPendingWrites= */
      false,
      /* fromCache= */
      false
    ), ref.converter));
  }
};
function runTransaction(firestore, updateFunction, options) {
  firestore = cast(firestore, Firestore);
  const optionsWithDefaults = Object.assign(Object.assign({}, DEFAULT_TRANSACTION_OPTIONS), options);
  validateTransactionOptions(optionsWithDefaults);
  const client = ensureFirestoreConfigured(firestore);
  return firestoreClientTransaction(client, (internalTransaction) => updateFunction(new Transaction(firestore, internalTransaction)), optionsWithDefaults);
}
function deleteField() {
  return new DeleteFieldValueImpl("deleteField");
}
function serverTimestamp() {
  return new ServerTimestampFieldValueImpl("serverTimestamp");
}
function arrayUnion(...elements) {
  return new ArrayUnionFieldValueImpl("arrayUnion", elements);
}
function arrayRemove(...elements) {
  return new ArrayRemoveFieldValueImpl("arrayRemove", elements);
}
function increment(n) {
  return new NumericIncrementFieldValueImpl("increment", n);
}
function vector(values) {
  return new VectorValue(values);
}
function writeBatch(firestore) {
  firestore = cast(firestore, Firestore);
  ensureFirestoreConfigured(firestore);
  return new WriteBatch(firestore, (mutations) => executeWrite(firestore, mutations));
}
function setIndexConfiguration(firestore, jsonOrConfiguration) {
  firestore = cast(firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  if (!client._uninitializedComponentsProvider || client._uninitializedComponentsProvider._offline.kind === "memory") {
    logWarn("Cannot enable indexes when persistence is disabled");
    return Promise.resolve();
  }
  const parsedIndexes = parseIndexes(jsonOrConfiguration);
  return firestoreClientSetIndexConfiguration(client, parsedIndexes);
}
function parseIndexes(jsonOrConfiguration) {
  const indexConfiguration = typeof jsonOrConfiguration === "string" ? tryParseJson(jsonOrConfiguration) : jsonOrConfiguration;
  const parsedIndexes = [];
  if (Array.isArray(indexConfiguration.indexes)) {
    for (const index of indexConfiguration.indexes) {
      const collectionGroup3 = tryGetString(index, "collectionGroup");
      const segments = [];
      if (Array.isArray(index.fields)) {
        for (const field of index.fields) {
          const fieldPathString = tryGetString(field, "fieldPath");
          const fieldPath = fieldPathFromDotSeparatedString("setIndexConfiguration", fieldPathString);
          if (field.arrayConfig === "CONTAINS") {
            segments.push(new IndexSegment(
              fieldPath,
              2
              /* IndexKind.CONTAINS */
            ));
          } else if (field.order === "ASCENDING") {
            segments.push(new IndexSegment(
              fieldPath,
              0
              /* IndexKind.ASCENDING */
            ));
          } else if (field.order === "DESCENDING") {
            segments.push(new IndexSegment(
              fieldPath,
              1
              /* IndexKind.DESCENDING */
            ));
          }
        }
      }
      parsedIndexes.push(new FieldIndex(FieldIndex.UNKNOWN_ID, collectionGroup3, segments, IndexState.empty()));
    }
  }
  return parsedIndexes;
}
function tryParseJson(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Failed to parse JSON: " + (e === null || e === void 0 ? void 0 : e.message));
  }
}
function tryGetString(data, property) {
  if (typeof data[property] !== "string") {
    throw new FirestoreError(Code.INVALID_ARGUMENT, "Missing string value for: " + property);
  }
  return data[property];
}
var PersistentCacheIndexManager = class {
  /** @hideconstructor */
  constructor(_firestore) {
    this._firestore = _firestore;
    this.type = "PersistentCacheIndexManager";
  }
};
function getPersistentCacheIndexManager(firestore) {
  var _a;
  firestore = cast(firestore, Firestore);
  const cachedInstance = persistentCacheIndexManagerByFirestore.get(firestore);
  if (cachedInstance) {
    return cachedInstance;
  }
  const client = ensureFirestoreConfigured(firestore);
  if (((_a = client._uninitializedComponentsProvider) === null || _a === void 0 ? void 0 : _a._offline.kind) !== "persistent") {
    return null;
  }
  const instance = new PersistentCacheIndexManager(firestore);
  persistentCacheIndexManagerByFirestore.set(firestore, instance);
  return instance;
}
function enablePersistentCacheIndexAutoCreation(indexManager) {
  setPersistentCacheIndexAutoCreationEnabled(indexManager, true);
}
function disablePersistentCacheIndexAutoCreation(indexManager) {
  setPersistentCacheIndexAutoCreationEnabled(indexManager, false);
}
function deleteAllPersistentCacheIndexes(indexManager) {
  const client = ensureFirestoreConfigured(indexManager._firestore);
  const promise = firestoreClientDeleteAllFieldIndexes(client);
  promise.then((_) => logDebug("deleting all persistent cache indexes succeeded")).catch((error) => logWarn("deleting all persistent cache indexes failed", error));
}
function setPersistentCacheIndexAutoCreationEnabled(indexManager, isEnabled) {
  const client = ensureFirestoreConfigured(indexManager._firestore);
  const promise = firestoreClientSetPersistentCacheIndexAutoCreationEnabled(client, isEnabled);
  promise.then((_) => logDebug(`setting persistent cache index auto creation isEnabled=${isEnabled} succeeded`)).catch((error) => logWarn(`setting persistent cache index auto creation isEnabled=${isEnabled} failed`, error));
}
var persistentCacheIndexManagerByFirestore = /* @__PURE__ */ new WeakMap();
function _internalQueryToProtoQueryTarget(query3) {
  var _a;
  const firestore = cast(query3.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const serializer = (_a = client._onlineComponents) === null || _a === void 0 ? void 0 : _a.datastore.serializer;
  if (serializer === void 0) {
    return null;
  }
  return toQueryTarget(serializer, queryToTarget(query3._query)).queryTarget;
}
function _internalAggregationQueryToProtoRunAggregationQueryRequest(query3, aggregateSpec) {
  var _a;
  const aggregates = mapToArray(aggregateSpec, (aggregate, alias) => {
    return new AggregateImpl(alias, aggregate.aggregateType, aggregate._internalFieldPath);
  });
  const firestore = cast(query3.firestore, Firestore);
  const client = ensureFirestoreConfigured(firestore);
  const serializer = (_a = client._onlineComponents) === null || _a === void 0 ? void 0 : _a.datastore.serializer;
  if (serializer === void 0) {
    return null;
  }
  return toRunAggregationQueryRequest(
    serializer,
    queryToAggregateTarget(query3._query),
    aggregates,
    /* skipAliasing= */
    true
  ).request;
}
var TestingHooks = class {
  constructor() {
    throw new Error("instances of this class should not be created");
  }
  /**
   * Registers a callback to be notified when an existence filter mismatch
   * occurs in the Watch listen stream.
   *
   * The relative order in which callbacks are notified is unspecified; do not
   * rely on any particular ordering. If a given callback is registered multiple
   * times then it will be notified multiple times, once per registration.
   *
   * @param callback the callback to invoke upon existence filter mismatch.
   *
   * @return a function that, when called, unregisters the given callback; only
   * the first invocation of the returned function does anything; all subsequent
   * invocations do nothing.
   */
  static onExistenceFilterMismatch(callback) {
    return TestingHooksSpiImpl.instance.onExistenceFilterMismatch(callback);
  }
};
var TestingHooksSpiImpl = class _TestingHooksSpiImpl {
  constructor() {
    this.existenceFilterMismatchCallbacksById = /* @__PURE__ */ new Map();
  }
  static get instance() {
    if (!testingHooksSpiImplInstance) {
      testingHooksSpiImplInstance = new _TestingHooksSpiImpl();
      setTestingHooksSpi(testingHooksSpiImplInstance);
    }
    return testingHooksSpiImplInstance;
  }
  notifyOnExistenceFilterMismatch(info) {
    this.existenceFilterMismatchCallbacksById.forEach((callback) => callback(info));
  }
  onExistenceFilterMismatch(callback) {
    const id = Symbol();
    const callbacks = this.existenceFilterMismatchCallbacksById;
    callbacks.set(id, callback);
    return () => callbacks.delete(id);
  }
};
var testingHooksSpiImplInstance = null;
registerFirestore("node");

// node_modules/@angular/fire/fesm2022/angular-fire-firestore.mjs
var Firestore2 = class {
  constructor(firestore) {
    return firestore;
  }
};
var FIRESTORE_PROVIDER_NAME = "firestore";
var FirestoreInstances = class {
  constructor() {
    return ɵgetAllInstancesOf(FIRESTORE_PROVIDER_NAME);
  }
};
var firestoreInstance$ = (0, import_rxjs2.timer)(0, 300).pipe((0, import_operators2.concatMap)(() => (0, import_rxjs2.from)(ɵgetAllInstancesOf(FIRESTORE_PROVIDER_NAME))), (0, import_operators2.distinct)());
var PROVIDED_FIRESTORE_INSTANCES = new InjectionToken("angularfire2.firestore-instances");
function defaultFirestoreInstanceFactory(provided, defaultApp) {
  const defaultFirestore = ɵgetDefaultInstanceOf(FIRESTORE_PROVIDER_NAME, provided, defaultApp);
  return defaultFirestore && new Firestore2(defaultFirestore);
}
function firestoreInstanceFactory(fn) {
  return (zone, injector) => {
    const firestore = zone.runOutsideAngular(() => fn(injector));
    return new Firestore2(firestore);
  };
}
var FIRESTORE_INSTANCES_PROVIDER = {
  provide: FirestoreInstances,
  deps: [[new Optional(), PROVIDED_FIRESTORE_INSTANCES]]
};
var DEFAULT_FIRESTORE_INSTANCE_PROVIDER = {
  provide: Firestore2,
  useFactory: defaultFirestoreInstanceFactory,
  deps: [[new Optional(), PROVIDED_FIRESTORE_INSTANCES], FirebaseApp]
};
var FirestoreModule = class _FirestoreModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "fst");
  }
  static ɵfac = function FirestoreModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FirestoreModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FirestoreModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DEFAULT_FIRESTORE_INSTANCE_PROVIDER, FIRESTORE_INSTANCES_PROVIDER]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FirestoreModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_FIRESTORE_INSTANCE_PROVIDER, FIRESTORE_INSTANCES_PROVIDER]
    }]
  }], () => [], null);
})();
function provideFirestore(fn, ...deps) {
  registerVersion("angularfire", VERSION.full, "fst");
  return makeEnvironmentProviders([DEFAULT_FIRESTORE_INSTANCE_PROVIDER, FIRESTORE_INSTANCES_PROVIDER, {
    provide: PROVIDED_FIRESTORE_INSTANCES,
    useFactory: firestoreInstanceFactory(fn),
    multi: true,
    deps: [
      NgZone,
      Injector,
      ɵAngularFireSchedulers,
      FirebaseApps,
      // Firestore+Auth work better if Auth is loaded first
      [new Optional(), AuthInstances],
      [new Optional(), ɵAppCheckInstances],
      ...deps
    ]
  }]);
}
var collectionChanges2 = ɵzoneWrap(collectionChanges, true);
var collectionSnapshots = ɵzoneWrap(collection, true);
var sortedChanges2 = ɵzoneWrap(sortedChanges, true);
var auditTrail2 = ɵzoneWrap(auditTrail, true);
var collectionData2 = ɵzoneWrap(collectionData, true);
var collectionCountSnap2 = ɵzoneWrap(collectionCountSnap, true);
var collectionCount2 = ɵzoneWrap(collectionCount, true);
var docSnapshots = ɵzoneWrap(doc, true);
var docData2 = ɵzoneWrap(docData, true);
var snapToData2 = ɵzoneWrap(snapToData, true);
var fromRef2 = ɵzoneWrap(fromRef, true);
var addDoc2 = ɵzoneWrap(addDoc, true);
var aggregateFieldEqual2 = ɵzoneWrap(aggregateFieldEqual, true);
var aggregateQuerySnapshotEqual2 = ɵzoneWrap(aggregateQuerySnapshotEqual, true);
var and2 = ɵzoneWrap(and, true);
var arrayRemove2 = ɵzoneWrap(arrayRemove, true);
var arrayUnion2 = ɵzoneWrap(arrayUnion, true);
var average2 = ɵzoneWrap(average, true);
var clearIndexedDbPersistence2 = ɵzoneWrap(clearIndexedDbPersistence, true);
var collection3 = ɵzoneWrap(collection2, true);
var collectionGroup2 = ɵzoneWrap(collectionGroup, true);
var connectFirestoreEmulator2 = ɵzoneWrap(connectFirestoreEmulator, true);
var count2 = ɵzoneWrap(count, true);
var deleteAllPersistentCacheIndexes2 = ɵzoneWrap(deleteAllPersistentCacheIndexes, true);
var deleteDoc2 = ɵzoneWrap(deleteDoc, true);
var deleteField2 = ɵzoneWrap(deleteField, true);
var disableNetwork2 = ɵzoneWrap(disableNetwork, true);
var disablePersistentCacheIndexAutoCreation2 = ɵzoneWrap(disablePersistentCacheIndexAutoCreation, true);
var doc3 = ɵzoneWrap(doc2, true);
var documentId2 = ɵzoneWrap(documentId, true);
var enableIndexedDbPersistence2 = ɵzoneWrap(enableIndexedDbPersistence, true);
var enableMultiTabIndexedDbPersistence2 = ɵzoneWrap(enableMultiTabIndexedDbPersistence, true);
var enableNetwork2 = ɵzoneWrap(enableNetwork, true);
var enablePersistentCacheIndexAutoCreation2 = ɵzoneWrap(enablePersistentCacheIndexAutoCreation, true);
var endAt2 = ɵzoneWrap(endAt, true);
var endBefore2 = ɵzoneWrap(endBefore, true);
var getAggregateFromServer2 = ɵzoneWrap(getAggregateFromServer, true);
var getCountFromServer3 = ɵzoneWrap(getCountFromServer2, true);
var getDoc2 = ɵzoneWrap(getDoc, true);
var getDocFromCache2 = ɵzoneWrap(getDocFromCache, true);
var getDocFromServer2 = ɵzoneWrap(getDocFromServer, true);
var getDocs2 = ɵzoneWrap(getDocs, true);
var getDocsFromCache2 = ɵzoneWrap(getDocsFromCache, true);
var getDocsFromServer2 = ɵzoneWrap(getDocsFromServer, true);
var getFirestore2 = ɵzoneWrap(getFirestore, true);
var getPersistentCacheIndexManager2 = ɵzoneWrap(getPersistentCacheIndexManager, true);
var increment2 = ɵzoneWrap(increment, true);
var initializeFirestore2 = ɵzoneWrap(initializeFirestore, true);
var limit2 = ɵzoneWrap(limit, true);
var limitToLast2 = ɵzoneWrap(limitToLast, true);
var loadBundle2 = ɵzoneWrap(loadBundle, true);
var memoryEagerGarbageCollector2 = ɵzoneWrap(memoryEagerGarbageCollector, true);
var memoryLocalCache2 = ɵzoneWrap(memoryLocalCache, true);
var memoryLruGarbageCollector2 = ɵzoneWrap(memoryLruGarbageCollector, true);
var namedQuery2 = ɵzoneWrap(namedQuery, true);
var onSnapshot3 = ɵzoneWrap(onSnapshot2, true);
var onSnapshotsInSync2 = ɵzoneWrap(onSnapshotsInSync, true);
var or2 = ɵzoneWrap(or, true);
var orderBy2 = ɵzoneWrap(orderBy, true);
var persistentLocalCache2 = ɵzoneWrap(persistentLocalCache, true);
var persistentMultipleTabManager2 = ɵzoneWrap(persistentMultipleTabManager, true);
var persistentSingleTabManager2 = ɵzoneWrap(persistentSingleTabManager, true);
var query2 = ɵzoneWrap(query, true);
var queryEqual2 = ɵzoneWrap(queryEqual, true);
var refEqual3 = ɵzoneWrap(refEqual2, true);
var runTransaction2 = ɵzoneWrap(runTransaction, true);
var serverTimestamp2 = ɵzoneWrap(serverTimestamp, true);
var setDoc2 = ɵzoneWrap(setDoc, true);
var setIndexConfiguration2 = ɵzoneWrap(setIndexConfiguration, true);
var setLogLevel2 = ɵzoneWrap(setLogLevel, true);
var snapshotEqual2 = ɵzoneWrap(snapshotEqual, true);
var startAfter2 = ɵzoneWrap(startAfter, true);
var startAt2 = ɵzoneWrap(startAt, true);
var sum2 = ɵzoneWrap(sum, true);
var terminate2 = ɵzoneWrap(terminate, true);
var updateDoc2 = ɵzoneWrap(updateDoc, true);
var waitForPendingWrites2 = ɵzoneWrap(waitForPendingWrites, true);
var where2 = ɵzoneWrap(where, true);
var writeBatch2 = ɵzoneWrap(writeBatch, true);
export {
  AbstractUserDataWriter,
  AggregateField,
  AggregateQuerySnapshot,
  Bytes,
  CACHE_SIZE_UNLIMITED,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  FieldPath,
  FieldValue,
  Firestore2 as Firestore,
  FirestoreError,
  FirestoreInstances,
  FirestoreModule,
  GeoPoint,
  LoadBundleTask,
  PersistentCacheIndexManager,
  Query,
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryDocumentSnapshot,
  QueryEndAtConstraint,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  QuerySnapshot,
  QueryStartAtConstraint,
  SnapshotMetadata,
  Timestamp,
  Transaction,
  VectorValue,
  WriteBatch,
  AutoId as _AutoId,
  ByteString as _ByteString,
  DatabaseId as _DatabaseId,
  DocumentKey as _DocumentKey,
  EmptyAppCheckTokenProvider as _EmptyAppCheckTokenProvider,
  EmptyAuthCredentialsProvider as _EmptyAuthCredentialsProvider,
  FieldPath$1 as _FieldPath,
  TestingHooks as _TestingHooks,
  cast as _cast,
  debugAssert as _debugAssert,
  _internalAggregationQueryToProtoRunAggregationQueryRequest,
  _internalQueryToProtoQueryTarget,
  isBase64Available as _isBase64Available,
  logWarn as _logWarn,
  validateIsNotUsedTogether as _validateIsNotUsedTogether,
  addDoc2 as addDoc,
  aggregateFieldEqual2 as aggregateFieldEqual,
  aggregateQuerySnapshotEqual2 as aggregateQuerySnapshotEqual,
  and2 as and,
  arrayRemove2 as arrayRemove,
  arrayUnion2 as arrayUnion,
  auditTrail2 as auditTrail,
  average2 as average,
  clearIndexedDbPersistence2 as clearIndexedDbPersistence,
  collection3 as collection,
  collectionChanges2 as collectionChanges,
  collectionCount2 as collectionCount,
  collectionCountSnap2 as collectionCountSnap,
  collectionData2 as collectionData,
  collectionGroup2 as collectionGroup,
  collectionSnapshots,
  connectFirestoreEmulator2 as connectFirestoreEmulator,
  count2 as count,
  deleteAllPersistentCacheIndexes2 as deleteAllPersistentCacheIndexes,
  deleteDoc2 as deleteDoc,
  deleteField2 as deleteField,
  disableNetwork2 as disableNetwork,
  disablePersistentCacheIndexAutoCreation2 as disablePersistentCacheIndexAutoCreation,
  doc3 as doc,
  docData2 as docData,
  docSnapshots,
  documentId2 as documentId,
  enableIndexedDbPersistence2 as enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence2 as enableMultiTabIndexedDbPersistence,
  enableNetwork2 as enableNetwork,
  enablePersistentCacheIndexAutoCreation2 as enablePersistentCacheIndexAutoCreation,
  endAt2 as endAt,
  endBefore2 as endBefore,
  ensureFirestoreConfigured,
  executeWrite,
  firestoreInstance$,
  fromRef2 as fromRef,
  getAggregateFromServer2 as getAggregateFromServer,
  getCountFromServer3 as getCountFromServer,
  getDoc2 as getDoc,
  getDocFromCache2 as getDocFromCache,
  getDocFromServer2 as getDocFromServer,
  getDocs2 as getDocs,
  getDocsFromCache2 as getDocsFromCache,
  getDocsFromServer2 as getDocsFromServer,
  getFirestore2 as getFirestore,
  getPersistentCacheIndexManager2 as getPersistentCacheIndexManager,
  increment2 as increment,
  initializeFirestore2 as initializeFirestore,
  limit2 as limit,
  limitToLast2 as limitToLast,
  loadBundle2 as loadBundle,
  memoryEagerGarbageCollector2 as memoryEagerGarbageCollector,
  memoryLocalCache2 as memoryLocalCache,
  memoryLruGarbageCollector2 as memoryLruGarbageCollector,
  namedQuery2 as namedQuery,
  onSnapshot3 as onSnapshot,
  onSnapshotsInSync2 as onSnapshotsInSync,
  or2 as or,
  orderBy2 as orderBy,
  persistentLocalCache2 as persistentLocalCache,
  persistentMultipleTabManager2 as persistentMultipleTabManager,
  persistentSingleTabManager2 as persistentSingleTabManager,
  provideFirestore,
  query2 as query,
  queryEqual2 as queryEqual,
  refEqual3 as refEqual,
  runTransaction2 as runTransaction,
  serverTimestamp2 as serverTimestamp,
  setDoc2 as setDoc,
  setIndexConfiguration2 as setIndexConfiguration,
  setLogLevel2 as setLogLevel,
  snapToData2 as snapToData,
  snapshotEqual2 as snapshotEqual,
  sortedChanges2 as sortedChanges,
  startAfter2 as startAfter,
  startAt2 as startAt,
  sum2 as sum,
  terminate2 as terminate,
  updateDoc2 as updateDoc,
  vector,
  waitForPendingWrites2 as waitForPendingWrites,
  where2 as where,
  writeBatch2 as writeBatch
};
/*! Bundled license information:

rxfire/firestore/index.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.node.mjs:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@angular_fire_firestore.js.map
