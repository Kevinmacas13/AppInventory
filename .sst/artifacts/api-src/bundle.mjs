import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
import { fileURLToPath as topLevelFileUrlToPath, URL as topLevelURL } from "url"
const __filename = topLevelFileUrlToPath(import.meta.url)
const __dirname = topLevelFileUrlToPath(new topLevelURL(".", import.meta.url))

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name18 in all)
    __defProp(target, name18, { get: all[name18], enumerable: true });
};
var __copyProps = (to, from, except2, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except2)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
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

// node_modules/secure-json-parse/index.js
var require_secure_json_parse = __commonJS({
  "node_modules/secure-json-parse/index.js"(exports, module) {
    "use strict";
    var hasBuffer = typeof Buffer !== "undefined";
    var suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
    var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    function _parse(text4, reviver, options) {
      if (options == null) {
        if (reviver !== null && typeof reviver === "object") {
          options = reviver;
          reviver = void 0;
        }
      }
      if (hasBuffer && Buffer.isBuffer(text4)) {
        text4 = text4.toString();
      }
      if (text4 && text4.charCodeAt(0) === 65279) {
        text4 = text4.slice(1);
      }
      const obj = JSON.parse(text4, reviver);
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      const protoAction = options && options.protoAction || "error";
      const constructorAction = options && options.constructorAction || "error";
      if (protoAction === "ignore" && constructorAction === "ignore") {
        return obj;
      }
      if (protoAction !== "ignore" && constructorAction !== "ignore") {
        if (suspectProtoRx.test(text4) === false && suspectConstructorRx.test(text4) === false) {
          return obj;
        }
      } else if (protoAction !== "ignore" && constructorAction === "ignore") {
        if (suspectProtoRx.test(text4) === false) {
          return obj;
        }
      } else {
        if (suspectConstructorRx.test(text4) === false) {
          return obj;
        }
      }
      return filter(obj, { protoAction, constructorAction, safe: options && options.safe });
    }
    __name(_parse, "_parse");
    function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
      let next = [obj];
      while (next.length) {
        const nodes = next;
        next = [];
        for (const node of nodes) {
          if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
            if (safe === true) {
              return null;
            } else if (protoAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.__proto__;
          }
          if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
            if (safe === true) {
              return null;
            } else if (constructorAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.constructor;
          }
          for (const key in node) {
            const value = node[key];
            if (value && typeof value === "object") {
              next.push(value);
            }
          }
        }
      }
      return obj;
    }
    __name(filter, "filter");
    function parse2(text4, reviver, options) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text4, reviver, options);
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    __name(parse2, "parse");
    function safeParse(text4, reviver) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text4, reviver, { safe: true });
      } catch (_e) {
        return null;
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    __name(safeParse, "safeParse");
    module.exports = parse2;
    module.exports.default = parse2;
    module.exports.parse = parse2;
    module.exports.safeParse = safeParse;
    module.exports.scan = filter;
  }
});

// node_modules/hono/dist/utils/encode.js
var encodeBase64 = /* @__PURE__ */ __name((buf) => {
  let binary = "";
  const bytes = new Uint8Array(buf);
  for (let i3 = 0, len = bytes.length; i3 < len; i3++) {
    binary += String.fromCharCode(bytes[i3]);
  }
  return btoa(binary);
}, "encodeBase64");
var decodeBase64 = /* @__PURE__ */ __name((str) => {
  const binary = atob(str);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  const half = binary.length / 2;
  for (let i3 = 0, j = binary.length - 1; i3 <= half; i3++, j--) {
    bytes[i3] = binary.charCodeAt(i3);
    bytes[j] = binary.charCodeAt(j);
  }
  return bytes;
}, "decodeBase64");

// node_modules/hono/dist/adapter/aws-lambda/handler.js
var getRequestContext = /* @__PURE__ */ __name((event) => {
  return event.requestContext;
}, "getRequestContext");
var handle = /* @__PURE__ */ __name((app2) => {
  return async (event, lambdaContext) => {
    const processor = getProcessor(event);
    const req = processor.createRequest(event);
    const requestContext = getRequestContext(event);
    const res = await app2.fetch(req, {
      event,
      requestContext,
      lambdaContext
    });
    return processor.createResult(event, res);
  };
}, "handle");
var EventProcessor = class {
  static {
    __name(this, "EventProcessor");
  }
  createRequest(event) {
    const queryString = this.getQueryString(event);
    const domainName = event.requestContext && "domainName" in event.requestContext ? event.requestContext.domainName : event.headers?.["host"] ?? event.multiValueHeaders?.["host"]?.[0];
    const path = this.getPath(event);
    const urlPath = `https://${domainName}${path}`;
    const url = queryString ? `${urlPath}?${queryString}` : urlPath;
    const headers = this.getHeaders(event);
    const method = this.getMethod(event);
    const requestInit = {
      headers,
      method
    };
    if (event.body) {
      requestInit.body = event.isBase64Encoded ? decodeBase64(event.body) : event.body;
    }
    return new Request(url, requestInit);
  }
  async createResult(event, res) {
    const contentType = res.headers.get("content-type");
    let isBase64Encoded = contentType && isContentTypeBinary(contentType) ? true : false;
    if (!isBase64Encoded) {
      const contentEncoding = res.headers.get("content-encoding");
      isBase64Encoded = isContentEncodingBinary(contentEncoding);
    }
    const body = isBase64Encoded ? encodeBase64(await res.arrayBuffer()) : await res.text();
    const result = {
      body,
      statusCode: res.status,
      isBase64Encoded,
      ...event.multiValueHeaders ? {
        multiValueHeaders: {}
      } : {
        headers: {}
      }
    };
    this.setCookies(event, res, result);
    if (result.multiValueHeaders) {
      res.headers.forEach((value, key) => {
        result.multiValueHeaders[key] = [value];
      });
    } else {
      res.headers.forEach((value, key) => {
        result.headers[key] = value;
      });
    }
    return result;
  }
  setCookies(event, res, result) {
    if (res.headers.has("set-cookie")) {
      const cookies = res.headers.getSetCookie ? res.headers.getSetCookie() : Array.from(res.headers.entries()).filter(([k]) => k === "set-cookie").map(([, v2]) => v2);
      if (Array.isArray(cookies)) {
        this.setCookiesToResult(result, cookies);
        res.headers.delete("set-cookie");
      }
    }
  }
};
var EventV2Processor = class extends EventProcessor {
  static {
    __name(this, "EventV2Processor");
  }
  getPath(event) {
    return event.rawPath;
  }
  getMethod(event) {
    return event.requestContext.http.method;
  }
  getQueryString(event) {
    return event.rawQueryString;
  }
  getCookies(event, headers) {
    if (Array.isArray(event.cookies)) {
      headers.set("Cookie", event.cookies.join("; "));
    }
  }
  setCookiesToResult(result, cookies) {
    result.cookies = cookies;
  }
  getHeaders(event) {
    const headers = new Headers();
    this.getCookies(event, headers);
    if (event.headers) {
      for (const [k, v2] of Object.entries(event.headers)) {
        if (v2) {
          headers.set(k, v2);
        }
      }
    }
    return headers;
  }
};
var v2Processor = new EventV2Processor();
var EventV1Processor = class extends EventProcessor {
  static {
    __name(this, "EventV1Processor");
  }
  getPath(event) {
    return event.path;
  }
  getMethod(event) {
    return event.httpMethod;
  }
  getQueryString(event) {
    if (event.multiValueQueryStringParameters) {
      return Object.entries(event.multiValueQueryStringParameters || {}).filter(([, value]) => value).map(([key, value]) => `${key}=${value.join(`&${key}=`)}`).join("&");
    } else {
      return Object.entries(event.queryStringParameters || {}).filter(([, value]) => value).map(([key, value]) => `${key}=${value}`).join("&");
    }
  }
  getCookies(event, headers) {
  }
  getHeaders(event) {
    const headers = new Headers();
    this.getCookies(event, headers);
    if (event.headers) {
      for (const [k, v2] of Object.entries(event.headers)) {
        if (v2) {
          headers.set(k, v2);
        }
      }
    }
    if (event.multiValueHeaders) {
      for (const [k, values] of Object.entries(event.multiValueHeaders)) {
        if (values) {
          const foundK = headers.get(k);
          values.forEach((v2) => (!foundK || !foundK.includes(v2)) && headers.append(k, v2));
        }
      }
    }
    return headers;
  }
  setCookiesToResult(result, cookies) {
    result.multiValueHeaders = {
      "set-cookie": cookies
    };
  }
};
var v1Processor = new EventV1Processor();
var ALBProcessor = class extends EventProcessor {
  static {
    __name(this, "ALBProcessor");
  }
  getHeaders(event) {
    const headers = new Headers();
    if (event.multiValueHeaders) {
      for (const [key, values] of Object.entries(event.multiValueHeaders)) {
        if (values && Array.isArray(values)) {
          headers.set(key, values.join("; "));
        }
      }
    } else {
      for (const [key, value] of Object.entries(event.headers ?? {})) {
        if (value) {
          headers.set(key, value);
        }
      }
    }
    return headers;
  }
  getPath(event) {
    return event.path;
  }
  getMethod(event) {
    return event.httpMethod;
  }
  getQueryString(event) {
    if (event.multiValueQueryStringParameters) {
      return Object.entries(event.multiValueQueryStringParameters || {}).filter(([, value]) => value).map(([key, value]) => `${key}=${value.join(`&${key}=`)}`).join("&");
    } else {
      return Object.entries(event.queryStringParameters || {}).filter(([, value]) => value).map(([key, value]) => `${key}=${value}`).join("&");
    }
  }
  getCookies(event, headers) {
    let cookie;
    if (event.multiValueHeaders) {
      cookie = event.multiValueHeaders["cookie"]?.join("; ");
    } else {
      cookie = event.headers ? event.headers["cookie"] : void 0;
    }
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  setCookiesToResult(result, cookies) {
    if (result.multiValueHeaders) {
      result.multiValueHeaders["set-cookie"] = cookies;
    } else {
      result.headers["set-cookie"] = cookies.join(", ");
    }
  }
};
var albProcessor = new ALBProcessor();
var getProcessor = /* @__PURE__ */ __name((event) => {
  if (isProxyEventALB(event)) {
    return albProcessor;
  }
  if (isProxyEventV2(event)) {
    return v2Processor;
  }
  return v1Processor;
}, "getProcessor");
var isProxyEventALB = /* @__PURE__ */ __name((event) => {
  if (event.requestContext) {
    return Object.hasOwn(event.requestContext, "elb");
  }
  return false;
}, "isProxyEventALB");
var isProxyEventV2 = /* @__PURE__ */ __name((event) => {
  return Object.hasOwn(event, "rawPath");
}, "isProxyEventV2");
var isContentTypeBinary = /* @__PURE__ */ __name((contentType) => {
  return !/^(text\/(plain|html|css|javascript|csv).*|application\/(.*json|.*xml).*|image\/svg\+xml.*)$/.test(
    contentType
  );
}, "isContentTypeBinary");
var isContentEncodingBinary = /* @__PURE__ */ __name((contentEncoding) => {
  if (contentEncoding === null) {
    return false;
  }
  return /^(gzip|deflate|compress|br)/.test(contentEncoding);
}, "isContentEncodingBinary");

// node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i3) {
      if (i3 <= index) {
        throw new Error("next() called multiple times");
      }
      index = i3;
      let res;
      let isError = false;
      let handler2;
      if (middleware[i3]) {
        handler2 = middleware[i3][0][0];
        context.req.routeIndex = i3;
      } else {
        handler2 = i3 === middleware.length && next || void 0;
      }
      if (handler2) {
        try {
          res = await handler2(context, () => dispatch(i3 + 1));
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
  for (let i3 = groups.length - 1; i3 >= 0; i3--) {
    const [mark] = groups[i3];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i3][1]);
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
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder(match);
      } catch {
        return match;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf(
    "/",
    url.charCodeAt(9) === 58 ? 13 : 8
  );
  let i3 = start;
  for (; i3 < url.length; i3++) {
    const charCode = url.charCodeAt(i3);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i3);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i3);
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
  return results.filter((v2, i3, a3) => a3.indexOf(v2) === i3);
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
    let name18 = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name18 = _decodeURI(name18);
    }
    keyIndex = nextKeyIndex;
    if (name18 === "") {
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
      if (!(results[name18] && Array.isArray(results[name18]))) {
        results[name18] = [];
      }
      ;
      results[name18].push(value);
    } else {
      results[name18] ??= value;
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
  header(name18) {
    if (name18) {
      return this.raw.headers.get(name18) ?? void 0;
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
    const { bodyCache, raw: raw2 } = this;
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
    return bodyCache[key] = raw2[key]();
  }, "#cachedBody");
  json() {
    return this.#cachedBody("text").then((text4) => JSON.parse(text4));
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
var raw = /* @__PURE__ */ __name((value, callbacks) => {
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
  const resStr = Promise.all(callbacks.map((c2) => c2({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
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
  header = /* @__PURE__ */ __name((name18, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name18);
    } else if (options?.append) {
      headers.append(name18, value);
    } else {
      headers.set(name18, value);
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
  text = /* @__PURE__ */ __name((text4, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text4) : this.#newResponse(
      text4,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  json = /* @__PURE__ */ __name((object2, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object2),
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
var notFoundHandler = /* @__PURE__ */ __name((c2) => {
  return c2.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c2) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c2.newResponse(res.body, res);
  }
  console.error(err);
  return c2.text("Internal Server Error", 500);
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
        args.forEach((handler2) => {
          this.#addRoute(method, this.#path, handler2);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p3 of [path].flat()) {
        this.#path = p3;
        for (const m3 of [method].flat()) {
          handlers.map((handler2) => {
            this.#addRoute(m3.toUpperCase(), this.#path, handler2);
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
      handlers.forEach((handler2) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler2);
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
    app2.routes.map((r2) => {
      let handler2;
      if (app2.errorHandler === errorHandler) {
        handler2 = r2.handler;
      } else {
        handler2 = /* @__PURE__ */ __name(async (c2, next) => (await compose([], app2.errorHandler)(c2, () => r2.handler(c2, next))).res, "handler");
        handler2[COMPOSED_HANDLER] = r2.handler;
      }
      subApp.#addRoute(r2.method, r2.path, handler2);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = /* @__PURE__ */ __name((handler2) => {
    this.errorHandler = handler2;
    return this;
  }, "onError");
  notFound = /* @__PURE__ */ __name((handler2) => {
    this.#notFoundHandler = handler2;
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
    const getOptions = optionHandler ? (c2) => {
      const options2 = optionHandler(c2);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c2) => {
      let executionContext = void 0;
      try {
        executionContext = c2.executionCtx;
      } catch {
      }
      return [c2.env, executionContext];
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
    const handler2 = /* @__PURE__ */ __name(async (c2, next) => {
      const res = await applicationHandler(replaceRequest(c2.req.raw), ...getOptions(c2));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler2);
    return this;
  }
  #addRoute(method, path, handler2) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r2 = { basePath: this._basePath, path, method, handler: handler2 };
    this.router.add(method, path, [handler2, r2]);
    this.routes.push(r2);
  }
  #handleError(err, c2) {
    if (err instanceof Error) {
      return this.errorHandler(err, c2);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c2 = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c2, async () => {
          c2.res = await this.#notFoundHandler(c2);
        });
      } catch (err) {
        return this.#handleError(err, c2);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c2.finalized ? c2.res : this.#notFoundHandler(c2))
      ).catch((err) => this.#handleError(err, c2)) : res ?? this.#notFoundHandler(c2);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c2);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c2);
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
function compareKey(a3, b2) {
  if (a3.length === 1) {
    return b2.length === 1 ? a3 < b2 ? -1 : 1 : -1;
  }
  if (b2.length === 1) {
    return 1;
  }
  if (a3 === ONLY_WILDCARD_REG_EXP_STR || a3 === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b2 === ONLY_WILDCARD_REG_EXP_STR || b2 === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a3 === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b2 === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a3.length === b2.length ? a3 < b2 ? -1 : 1 : b2.length - a3.length;
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
      const name18 = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name18 && pattern[2]) {
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
        if (name18 !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name18 !== "") {
        paramMap.push([name18, node.#varIndex]);
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
      const c2 = this.#children[k];
      return (typeof c2.#varIndex === "number" ? `(${k})@${c2.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c2.buildRegExpStr();
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
    for (let i3 = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m3) => {
        const mark = `@\\${i3}`;
        groups[i3] = [mark, m3];
        i3++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i3 = groups.length - 1; i3 >= 0; i3--) {
      const [mark] = groups[i3];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i3][1]);
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
function buildMatcherFromPreprocessedRoutes(routes2) {
  const trie = new Trie();
  const handlerData = [];
  if (routes2.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes2.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i3 = 0, j = -1, len = routesWithStaticPathFlag.length; i3 < len; i3++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i3];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h2]) => [h2, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e3) {
      throw e3 === PATH_ERROR ? new UnsupportedPathError(path) : e3;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h2, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h2, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i3 = 0, len = handlerData.length; i3 < len; i3++) {
    for (let j = 0, len2 = handlerData[i3].length; j < len2; j++) {
      const map = handlerData[i3][j]?.[1];
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
  for (const i3 in indexReplacementMap) {
    handlerMap[i3] = handlerData[indexReplacementMap[i3]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a3, b2) => b2.length - a3.length)) {
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
  add(method, path, handler2) {
    const middleware = this.#middleware;
    const routes2 = this.#routes;
    if (!middleware || !routes2) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes2].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p3) => {
          handlerMap[method][p3] = [...handlerMap[METHOD_NAME_ALL][p3]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re2 = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m3) => {
          middleware[m3][path] ||= findMiddleware(middleware[m3], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          Object.keys(middleware[m3]).forEach((p3) => {
            re2.test(p3) && middleware[m3][p3].push([handler2, paramCount]);
          });
        }
      });
      Object.keys(routes2).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          Object.keys(routes2[m3]).forEach(
            (p3) => re2.test(p3) && routes2[m3][p3].push([handler2, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i3 = 0, len = paths.length; i3 < len; i3++) {
      const path2 = paths[i3];
      Object.keys(routes2).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          routes2[m3][path2] ||= [
            ...findMiddleware(middleware[m3], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes2[m3][path2].push([handler2, paramCount - len + i3 + 1]);
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
    const routes2 = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r2) => {
      const ownRoute = r2[method] ? Object.keys(r2[method]).map((path) => [path, r2[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes2.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes2.push(
          ...Object.keys(r2[METHOD_NAME_ALL]).map((path) => [path, r2[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes2);
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
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler2) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler2]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes2 = this.#routes;
    const len = routers.length;
    let i3 = 0;
    let res;
    for (; i3 < len; i3++) {
      const router = routers[i3];
      try {
        for (let i22 = 0, len2 = routes2.length; i22 < len2; i22++) {
          router.add(...routes2[i22]);
        }
        res = router.match(method, path);
      } catch (e3) {
        if (e3 instanceof UnsupportedPathError) {
          continue;
        }
        throw e3;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i3 === len) {
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
  constructor(method, handler2, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler2) {
      const m3 = /* @__PURE__ */ Object.create(null);
      m3[method] = { handler: handler2, possibleKeys: [], score: 0 };
      this.#methods = [m3];
    }
    this.#patterns = [];
  }
  insert(method, path, handler2) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i3 = 0, len = parts.length; i3 < len; i3++) {
      const p3 = parts[i3];
      const nextP = parts[i3 + 1];
      const pattern = getPattern(p3, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p3;
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
        handler: handler2,
        possibleKeys: possibleKeys.filter((v2, i3, a3) => a3.indexOf(v2) === i3),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i3 = 0, len = node.#methods.length; i3 < len; i3++) {
      const m3 = node.#methods[i3];
      const handlerSet = m3[method] || m3[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i22 = 0, len2 = handlerSet.possibleKeys.length; i22 < len2; i22++) {
            const key = handlerSet.possibleKeys[i22];
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
    for (let i3 = 0, len = parts.length; i3 < len; i3++) {
      const part = parts[i3];
      const isLast = i3 === len - 1;
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
          const [key, name18, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i3).join("/");
          if (matcher instanceof RegExp) {
            const m3 = matcher.exec(restPathString);
            if (m3) {
              params[name18] = m3[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m3[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name18] = part;
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
      handlerSets.sort((a3, b2) => {
        return a3.score - b2.score;
      });
    }
    return [handlerSets.map(({ handler: handler2, params }) => [handler2, params])];
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
  add(method, path, handler2) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i3 = 0, len = results.length; i3 < len; i3++) {
        this.#node.insert(method, results[i3], handler2);
      }
      return;
    }
    this.#node.insert(method, path, handler2);
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

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  __name(assertIs, "assertIs");
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  __name(assertNever, "assertNever");
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e3) {
      return obj[e3];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object2) => {
    const keys = [];
    for (const key in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  __name(joinValues, "joinValues");
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = /* @__PURE__ */ __name((data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
}, "getParsedType");

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = /* @__PURE__ */ __name((obj) => {
  const json2 = JSON.stringify(obj, null, 2);
  return json2.replace(/"([^"]+)":/g, "$1:");
}, "quotelessJson");
var ZodError = class _ZodError extends Error {
  static {
    __name(this, "ZodError");
  }
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = /* @__PURE__ */ __name((error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i3 = 0;
          while (i3 < issue.path.length) {
            const el = issue.path[i3];
            const terminal = i3 === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i3++;
          }
        }
      }
    }, "processError");
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = /* @__PURE__ */ __name((issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
}, "errorMap");
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
__name(setErrorMap, "setErrorMap");
function getErrorMap() {
  return overrideErrorMap;
}
__name(getErrorMap, "getErrorMap");

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = /* @__PURE__ */ __name((params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m3) => !!m3).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
}, "makeIssue");
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x3) => !!x3)
  });
  ctx.common.issues.push(issue);
}
__name(addIssueToContext, "addIssueToContext");
var ParseStatus = class _ParseStatus {
  static {
    __name(this, "ParseStatus");
  }
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s3 of results) {
      if (s3.status === "aborted")
        return INVALID;
      if (s3.status === "dirty")
        status.dirty();
      arrayValue.push(s3.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = /* @__PURE__ */ __name((value) => ({ status: "dirty", value }), "DIRTY");
var OK = /* @__PURE__ */ __name((value) => ({ status: "valid", value }), "OK");
var isAborted = /* @__PURE__ */ __name((x3) => x3.status === "aborted", "isAborted");
var isDirty = /* @__PURE__ */ __name((x3) => x3.status === "dirty", "isDirty");
var isValid = /* @__PURE__ */ __name((x3) => x3.status === "valid", "isValid");
var isAsync = /* @__PURE__ */ __name((x3) => typeof Promise !== "undefined" && x3 instanceof Promise, "isAsync");

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  static {
    __name(this, "ParseInputLazyPath");
  }
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = /* @__PURE__ */ __name((ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
}, "handleResult");
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = /* @__PURE__ */ __name((iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  }, "customMap");
  return { errorMap: customMap, description };
}
__name(processCreateParams, "processCreateParams");
var ZodType = class {
  static {
    __name(this, "ZodType");
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = /* @__PURE__ */ __name((val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    }, "getIssueProperties");
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = /* @__PURE__ */ __name(() => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      }), "setError");
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: /* @__PURE__ */ __name((data) => this["~validate"](data), "validate")
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
__name(timeRegexSource, "timeRegexSource");
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
__name(timeRegex, "timeRegex");
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
__name(datetimeRegex, "datetimeRegex");
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidIP, "isValidIP");
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
__name(isValidJWT, "isValidJWT");
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidCidr, "isValidCidr");
var ZodString = class _ZodString extends ZodType {
  static {
    __name(this, "ZodString");
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
__name(floatSafeRemainder, "floatSafeRemainder");
var ZodNumber = class _ZodNumber extends ZodType {
  static {
    __name(this, "ZodNumber");
  }
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  static {
    __name(this, "ZodBigInt");
  }
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  static {
    __name(this, "ZodBoolean");
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  static {
    __name(this, "ZodDate");
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  static {
    __name(this, "ZodSymbol");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  static {
    __name(this, "ZodUndefined");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  static {
    __name(this, "ZodNull");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  static {
    __name(this, "ZodAny");
  }
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  static {
    __name(this, "ZodUnknown");
  }
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  static {
    __name(this, "ZodNever");
  }
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  static {
    __name(this, "ZodVoid");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  static {
    __name(this, "ZodArray");
  }
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i3) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i3));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i3) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i3));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: /* @__PURE__ */ __name(() => newShape, "shape")
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
__name(deepPartialify, "deepPartialify");
var ZodObject = class _ZodObject extends ZodType {
  static {
    __name(this, "ZodObject");
  }
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: /* @__PURE__ */ __name((issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }, "errorMap")
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => ({
        ...this._def.shape(),
        ...augmentation
      }), "shape")
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: /* @__PURE__ */ __name(() => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }), "shape"),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => shape, "shape")
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => shape, "shape")
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => newShape, "shape")
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: /* @__PURE__ */ __name(() => newShape, "shape")
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: /* @__PURE__ */ __name(() => shape, "shape"),
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: /* @__PURE__ */ __name(() => shape, "shape"),
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  static {
    __name(this, "ZodUnion");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    __name(handleResults, "handleResults");
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = /* @__PURE__ */ __name((type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
}, "getDiscriminator");
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  static {
    __name(this, "ZodDiscriminatedUnion");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a3, b2) {
  const aType = getParsedType(a3);
  const bType = getParsedType(b2);
  if (a3 === b2) {
    return { valid: true, data: a3 };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b2);
    const sharedKeys = util.objectKeys(a3).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a3, ...b2 };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a3[key], b2[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a3.length !== b2.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a3.length; index++) {
      const itemA = a3[index];
      const itemB = b2[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a3 === +b2) {
    return { valid: true, data: a3 };
  } else {
    return { valid: false };
  }
}
__name(mergeValues, "mergeValues");
var ZodIntersection = class extends ZodType {
  static {
    __name(this, "ZodIntersection");
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = /* @__PURE__ */ __name((parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    }, "handleParsed");
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  static {
    __name(this, "ZodTuple");
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x3) => !!x3);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  static {
    __name(this, "ZodRecord");
  }
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  static {
    __name(this, "ZodMap");
  }
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  static {
    __name(this, "ZodSet");
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    __name(finalizeSet, "finalizeSet");
    const elements = [...ctx.data.values()].map((item, i3) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i3)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  static {
    __name(this, "ZodFunction");
  }
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x3) => !!x3),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    __name(makeArgsIssue, "makeArgsIssue");
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x3) => !!x3),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    __name(makeReturnsIssue, "makeReturnsIssue");
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn2 = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e3) => {
          error.addIssue(makeArgsIssue(args, e3));
          throw error;
        });
        const result = await Reflect.apply(fn2, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e3) => {
          error.addIssue(makeReturnsIssue(result, e3));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn2, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  static {
    __name(this, "ZodLazy");
  }
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  static {
    __name(this, "ZodLiteral");
  }
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
__name(createZodEnum, "createZodEnum");
var ZodEnum = class _ZodEnum extends ZodType {
  static {
    __name(this, "ZodEnum");
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  static {
    __name(this, "ZodNativeEnum");
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  static {
    __name(this, "ZodPromise");
  }
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  static {
    __name(this, "ZodEffects");
  }
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: /* @__PURE__ */ __name((arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      }, "addIssue"),
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = /* @__PURE__ */ __name((acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      }, "executeRefinement");
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  static {
    __name(this, "ZodOptional");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  static {
    __name(this, "ZodNullable");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  static {
    __name(this, "ZodDefault");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  static {
    __name(this, "ZodCatch");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  static {
    __name(this, "ZodNaN");
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  static {
    __name(this, "ZodBranded");
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  static {
    __name(this, "ZodPipeline");
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = /* @__PURE__ */ __name(async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      }, "handleAsync");
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a3, b2) {
    return new _ZodPipeline({
      in: a3,
      out: b2,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  static {
    __name(this, "ZodReadonly");
  }
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = /* @__PURE__ */ __name((data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    }, "freeze");
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p3 = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p22 = typeof p3 === "string" ? { message: p3 } : p3;
  return p22;
}
__name(cleanParams, "cleanParams");
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r2 = check(data);
      if (r2 instanceof Promise) {
        return r2.then((r3) => {
          if (!r3) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r2) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
__name(custom, "custom");
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = /* @__PURE__ */ __name((cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params), "instanceOfType");
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = /* @__PURE__ */ __name(() => stringType().optional(), "ostring");
var onumber = /* @__PURE__ */ __name(() => numberType().optional(), "onumber");
var oboolean = /* @__PURE__ */ __name(() => booleanType().optional(), "oboolean");
var coerce = {
  string: /* @__PURE__ */ __name((arg) => ZodString.create({ ...arg, coerce: true }), "string"),
  number: /* @__PURE__ */ __name((arg) => ZodNumber.create({ ...arg, coerce: true }), "number"),
  boolean: /* @__PURE__ */ __name((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }), "boolean"),
  bigint: /* @__PURE__ */ __name((arg) => ZodBigInt.create({ ...arg, coerce: true }), "bigint"),
  date: /* @__PURE__ */ __name((arg) => ZodDate.create({ ...arg, coerce: true }), "date")
};
var NEVER = INVALID;

// node_modules/zod-openapi/dist/extendZodSymbols.chunk.mjs
var currentSymbol = Symbol("current");
var previousSymbol = Symbol("previous");

// node_modules/zod-openapi/dist/extendZod.chunk.mjs
var mergeOpenApi = /* @__PURE__ */ __name((openapi, {
  ref: _ref,
  refType: _refType,
  param: _param,
  header: _header,
  ...rest
} = {}) => ({
  ...rest,
  ...openapi
}), "mergeOpenApi");
function extendZodWithOpenApi(zod) {
  if (typeof zod.ZodType.prototype.openapi !== "undefined") {
    return;
  }
  zod.ZodType.prototype.openapi = function(openapi) {
    const { zodOpenApi, ...rest } = this._def;
    const result = new this.constructor({
      ...rest,
      zodOpenApi: {
        openapi: mergeOpenApi(
          openapi,
          zodOpenApi == null ? void 0 : zodOpenApi.openapi
        )
      }
    });
    result._def.zodOpenApi[currentSymbol] = result;
    if (zodOpenApi) {
      result._def.zodOpenApi[previousSymbol] = this;
    }
    return result;
  };
  const zodDescribe = zod.ZodType.prototype.describe;
  zod.ZodType.prototype.describe = function(...args) {
    const result = zodDescribe.apply(this, args);
    const def = result._def;
    if (def.zodOpenApi) {
      const cloned = { ...def.zodOpenApi };
      cloned.openapi = mergeOpenApi({ description: args[0] }, cloned.openapi);
      cloned[previousSymbol] = this;
      cloned[currentSymbol] = result;
      def.zodOpenApi = cloned;
    } else {
      def.zodOpenApi = {
        openapi: { description: args[0] },
        [currentSymbol]: result
      };
    }
    return result;
  };
  const zodObjectExtend = zod.ZodObject.prototype.extend;
  zod.ZodObject.prototype.extend = function(...args) {
    const extendResult = zodObjectExtend.apply(this, args);
    const zodOpenApi = extendResult._def.zodOpenApi;
    if (zodOpenApi) {
      const cloned = { ...zodOpenApi };
      cloned.openapi = mergeOpenApi({}, cloned.openapi);
      cloned[previousSymbol] = this;
      extendResult._def.zodOpenApi = cloned;
    } else {
      extendResult._def.zodOpenApi = {
        [previousSymbol]: this
      };
    }
    return extendResult;
  };
  const zodObjectOmit = zod.ZodObject.prototype.omit;
  zod.ZodObject.prototype.omit = function(...args) {
    const omitResult = zodObjectOmit.apply(this, args);
    const zodOpenApi = omitResult._def.zodOpenApi;
    if (zodOpenApi) {
      const cloned = { ...zodOpenApi };
      cloned.openapi = mergeOpenApi({}, cloned.openapi);
      delete cloned[previousSymbol];
      delete cloned[currentSymbol];
      omitResult._def.zodOpenApi = cloned;
    }
    return omitResult;
  };
  const zodObjectPick = zod.ZodObject.prototype.pick;
  zod.ZodObject.prototype.pick = function(...args) {
    const pickResult = zodObjectPick.apply(this, args);
    const zodOpenApi = pickResult._def.zodOpenApi;
    if (zodOpenApi) {
      const cloned = { ...zodOpenApi };
      cloned.openapi = mergeOpenApi({}, cloned.openapi);
      delete cloned[previousSymbol];
      delete cloned[currentSymbol];
      pickResult._def.zodOpenApi = cloned;
    }
    return pickResult;
  };
}
__name(extendZodWithOpenApi, "extendZodWithOpenApi");

// node_modules/zod-openapi/dist/extend.mjs
extendZodWithOpenApi(external_exports);

// packages/core/src/shared/common.ts
var Common;
((Common2) => {
  Common2.IdDescription = `Unique object identifier. 
The format and length of IDs may change over time.`;
})(Common || (Common = {}));

// node_modules/ulid/dist/node/index.js
import crypto2 from "crypto";
var ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
var ENCODING_LEN = 32;
var RANDOM_LEN = 16;
var TIME_LEN = 10;
var TIME_MAX = 281474976710655;
var ULIDErrorCode;
(function(ULIDErrorCode2) {
  ULIDErrorCode2["Base32IncorrectEncoding"] = "B32_ENC_INVALID";
  ULIDErrorCode2["DecodeTimeInvalidCharacter"] = "DEC_TIME_CHAR";
  ULIDErrorCode2["DecodeTimeValueMalformed"] = "DEC_TIME_MALFORMED";
  ULIDErrorCode2["EncodeTimeNegative"] = "ENC_TIME_NEG";
  ULIDErrorCode2["EncodeTimeSizeExceeded"] = "ENC_TIME_SIZE_EXCEED";
  ULIDErrorCode2["EncodeTimeValueMalformed"] = "ENC_TIME_MALFORMED";
  ULIDErrorCode2["PRNGDetectFailure"] = "PRNG_DETECT";
  ULIDErrorCode2["ULIDInvalid"] = "ULID_INVALID";
  ULIDErrorCode2["Unexpected"] = "UNEXPECTED";
  ULIDErrorCode2["UUIDInvalid"] = "UUID_INVALID";
})(ULIDErrorCode || (ULIDErrorCode = {}));
var ULIDError = class extends Error {
  static {
    __name(this, "ULIDError");
  }
  constructor(errorCode, message) {
    super(`${message} (${errorCode})`);
    this.name = "ULIDError";
    this.code = errorCode;
  }
};
function randomChar(prng) {
  const randomPosition = Math.floor(prng() * ENCODING_LEN) % ENCODING_LEN;
  return ENCODING.charAt(randomPosition);
}
__name(randomChar, "randomChar");
function detectPRNG(root) {
  const rootLookup = detectRoot();
  const globalCrypto = rootLookup && (rootLookup.crypto || rootLookup.msCrypto) || (typeof crypto2 !== "undefined" ? crypto2 : null);
  if (typeof globalCrypto?.getRandomValues === "function") {
    return () => {
      const buffer = new Uint8Array(1);
      globalCrypto.getRandomValues(buffer);
      return buffer[0] / 255;
    };
  } else if (typeof globalCrypto?.randomBytes === "function") {
    return () => globalCrypto.randomBytes(1).readUInt8() / 255;
  } else if (crypto2?.randomBytes) {
    return () => crypto2.randomBytes(1).readUInt8() / 255;
  }
  throw new ULIDError(ULIDErrorCode.PRNGDetectFailure, "Failed to find a reliable PRNG");
}
__name(detectPRNG, "detectPRNG");
function detectRoot() {
  if (inWebWorker())
    return self;
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  return null;
}
__name(detectRoot, "detectRoot");
function encodeRandom(len, prng) {
  let str = "";
  for (; len > 0; len--) {
    str = randomChar(prng) + str;
  }
  return str;
}
__name(encodeRandom, "encodeRandom");
function encodeTime(now, len = TIME_LEN) {
  if (isNaN(now)) {
    throw new ULIDError(ULIDErrorCode.EncodeTimeValueMalformed, `Time must be a number: ${now}`);
  } else if (now > TIME_MAX) {
    throw new ULIDError(ULIDErrorCode.EncodeTimeSizeExceeded, `Cannot encode a time larger than ${TIME_MAX}: ${now}`);
  } else if (now < 0) {
    throw new ULIDError(ULIDErrorCode.EncodeTimeNegative, `Time must be positive: ${now}`);
  } else if (Number.isInteger(now) === false) {
    throw new ULIDError(ULIDErrorCode.EncodeTimeValueMalformed, `Time must be an integer: ${now}`);
  }
  let mod, str = "";
  for (let currentLen = len; currentLen > 0; currentLen--) {
    mod = now % ENCODING_LEN;
    str = ENCODING.charAt(mod) + str;
    now = (now - mod) / ENCODING_LEN;
  }
  return str;
}
__name(encodeTime, "encodeTime");
function inWebWorker() {
  return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
}
__name(inWebWorker, "inWebWorker");
function ulid(seedTime, prng) {
  const currentPRNG = prng || detectPRNG();
  const seed = !seedTime || isNaN(seedTime) ? Date.now() : seedTime;
  return encodeTime(seed, TIME_LEN) + encodeRandom(RANDOM_LEN, currentPRNG);
}
__name(ulid, "ulid");

// packages/core/src/shared/id.ts
var prefixes = {
  clothe: "clo"
};
function createID(prefix) {
  return [prefixes[prefix], ulid()].join("_");
}
__name(createID, "createID");

// packages/core/src/examples/index.ts
var Examples;
((Examples2) => {
  Examples2.Id = /* @__PURE__ */ __name((prefix) => `${prefixes[prefix]}_XXXXXXXXXXXXXXXXXXXXXXXXXX`, "Id");
  Examples2.Clothe = {
    id: (0, Examples2.Id)("clothe"),
    name: "Slim Fit Denim Jeans",
    codeqr: "1202",
    category: "Jeans",
    size: "L",
    color: "Blue",
    material: "Denim",
    quantity: 30,
    image: "https://placehold.co/400x400.png",
    status: "A timeless crewneck t-shirt made from 100% organic cotton. Soft, durable, and versatile.",
    costPrice: 35,
    sellingPrice: 79.99
  };
})(Examples || (Examples = {}));

// node_modules/drizzle-orm/entity.js
var entityKind = Symbol.for("drizzle:entityKind");
var hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(
      `Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  }
  let cls = Object.getPrototypeOf(value).constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}
__name(is, "is");

// node_modules/drizzle-orm/column.js
var Column = class {
  static {
    __name(this, "Column");
  }
  constructor(table, config) {
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.keyAsName = config.keyAsName;
    this.notNull = config.notNull;
    this.default = config.default;
    this.defaultFn = config.defaultFn;
    this.onUpdateFn = config.onUpdateFn;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
    this.isUnique = config.isUnique;
    this.uniqueName = config.uniqueName;
    this.uniqueType = config.uniqueType;
    this.dataType = config.dataType;
    this.columnType = config.columnType;
    this.generated = config.generated;
    this.generatedIdentity = config.generatedIdentity;
  }
  static [entityKind] = "Column";
  name;
  keyAsName;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = void 0;
  generated = void 0;
  generatedIdentity = void 0;
  config;
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
  // ** @internal */
  shouldDisableInsert() {
    return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
  }
};

// node_modules/drizzle-orm/column-builder.js
var ColumnBuilder = class {
  static {
    __name(this, "ColumnBuilder");
  }
  static [entityKind] = "ColumnBuilder";
  config;
  constructor(name18, dataType, columnType) {
    this.config = {
      name: name18,
      keyAsName: name18 === "",
      notNull: false,
      default: void 0,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType,
      columnType,
      generated: void 0
    };
  }
  /**
   * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
   *
   * @example
   * ```ts
   * const users = pgTable('users', {
   * 	id: integer('id').$type<UserId>().primaryKey(),
   * 	details: json('details').$type<UserDetails>().notNull(),
   * });
   * ```
   */
  $type() {
    return this;
  }
  /**
   * Adds a `not null` clause to the column definition.
   *
   * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
   */
  notNull() {
    this.config.notNull = true;
    return this;
  }
  /**
   * Adds a `default <value>` clause to the column definition.
   *
   * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
   *
   * If you need to set a dynamic default value, use {@link $defaultFn} instead.
   */
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Adds a dynamic default value to the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $defaultFn(fn2) {
    this.config.defaultFn = fn2;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Alias for {@link $defaultFn}.
   */
  $default = this.$defaultFn;
  /**
   * Adds a dynamic update value to the column.
   * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
   * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $onUpdateFn(fn2) {
    this.config.onUpdateFn = fn2;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Alias for {@link $onUpdateFn}.
   */
  $onUpdate = this.$onUpdateFn;
  /**
   * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
   *
   * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
   */
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
  /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
  setName(name18) {
    if (this.config.name !== "")
      return;
    this.config.name = name18;
  }
};

// node_modules/drizzle-orm/table.utils.js
var TableName = Symbol.for("drizzle:Name");

// node_modules/drizzle-orm/pg-core/foreign-keys.js
var ForeignKeyBuilder = class {
  static {
    __name(this, "ForeignKeyBuilder");
  }
  static [entityKind] = "PgForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate = "no action";
  /** @internal */
  _onDelete = "no action";
  constructor(config, actions) {
    this.reference = () => {
      const { name: name18, columns, foreignColumns } = config();
      return { name: name18, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action === void 0 ? "no action" : action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action === void 0 ? "no action" : action;
    return this;
  }
  /** @internal */
  build(table) {
    return new ForeignKey(table, this);
  }
};
var ForeignKey = class {
  static {
    __name(this, "ForeignKey");
  }
  constructor(table, builder) {
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "PgForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name: name18, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames
    ];
    return name18 ?? `${chunks.join("_")}_fk`;
  }
};

// node_modules/drizzle-orm/tracing-utils.js
function iife(fn2, ...args) {
  return fn2(...args);
}
__name(iife, "iife");

// node_modules/drizzle-orm/pg-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
__name(uniqueKeyName, "uniqueKeyName");
var UniqueConstraintBuilder = class {
  static {
    __name(this, "UniqueConstraintBuilder");
  }
  constructor(columns, name18) {
    this.name = name18;
    this.columns = columns;
  }
  static [entityKind] = "PgUniqueConstraintBuilder";
  /** @internal */
  columns;
  /** @internal */
  nullsNotDistinctConfig = false;
  nullsNotDistinct() {
    this.nullsNotDistinctConfig = true;
    return this;
  }
  /** @internal */
  build(table) {
    return new UniqueConstraint(table, this.columns, this.nullsNotDistinctConfig, this.name);
  }
};
var UniqueOnConstraintBuilder = class {
  static {
    __name(this, "UniqueOnConstraintBuilder");
  }
  static [entityKind] = "PgUniqueOnConstraintBuilder";
  /** @internal */
  name;
  constructor(name18) {
    this.name = name18;
  }
  on(...columns) {
    return new UniqueConstraintBuilder(columns, this.name);
  }
};
var UniqueConstraint = class {
  static {
    __name(this, "UniqueConstraint");
  }
  constructor(table, columns, nullsNotDistinct, name18) {
    this.table = table;
    this.columns = columns;
    this.name = name18 ?? uniqueKeyName(this.table, this.columns.map((column) => column.name));
    this.nullsNotDistinct = nullsNotDistinct;
  }
  static [entityKind] = "PgUniqueConstraint";
  columns;
  name;
  nullsNotDistinct = false;
  getName() {
    return this.name;
  }
};

// node_modules/drizzle-orm/pg-core/utils/array.js
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i3 = startFrom; i3 < arrayString.length; i3++) {
    const char2 = arrayString[i3];
    if (char2 === "\\") {
      i3++;
      continue;
    }
    if (char2 === '"') {
      return [arrayString.slice(startFrom, i3).replace(/\\/g, ""), i3 + 1];
    }
    if (inQuotes) {
      continue;
    }
    if (char2 === "," || char2 === "}") {
      return [arrayString.slice(startFrom, i3).replace(/\\/g, ""), i3];
    }
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
__name(parsePgArrayValue, "parsePgArrayValue");
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i3 = startFrom;
  let lastCharIsComma = false;
  while (i3 < arrayString.length) {
    const char2 = arrayString[i3];
    if (char2 === ",") {
      if (lastCharIsComma || i3 === startFrom) {
        result.push("");
      }
      lastCharIsComma = true;
      i3++;
      continue;
    }
    lastCharIsComma = false;
    if (char2 === "\\") {
      i3 += 2;
      continue;
    }
    if (char2 === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i3 + 1, true);
      result.push(value2);
      i3 = startFrom2;
      continue;
    }
    if (char2 === "}") {
      return [result, i3 + 1];
    }
    if (char2 === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i3 + 1);
      result.push(value2);
      i3 = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i3, false);
    result.push(value);
    i3 = newStartFrom;
  }
  return [result, i3];
}
__name(parsePgNestedArray, "parsePgNestedArray");
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
__name(parsePgArray, "parsePgArray");
function makePgArray(array) {
  return `{${array.map((item) => {
    if (Array.isArray(item)) {
      return makePgArray(item);
    }
    if (typeof item === "string") {
      return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return `${item}`;
  }).join(",")}}`;
}
__name(makePgArray, "makePgArray");

// node_modules/drizzle-orm/pg-core/columns/common.js
var PgColumnBuilder = class extends ColumnBuilder {
  static {
    __name(this, "PgColumnBuilder");
  }
  foreignKeyConfigs = [];
  static [entityKind] = "PgColumnBuilder";
  array(size) {
    return new PgArrayBuilder(this.config.name, this, size);
  }
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name18, config) {
    this.config.isUnique = true;
    this.config.uniqueName = name18;
    this.config.uniqueType = config?.nulls;
    return this;
  }
  generatedAlwaysAs(as2) {
    this.config.generated = {
      as: as2,
      type: "always",
      mode: "stored"
    };
    return this;
  }
  /** @internal */
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return iife(
        (ref2, actions2) => {
          const builder = new ForeignKeyBuilder(() => {
            const foreignColumn = ref2();
            return { columns: [column], foreignColumns: [foreignColumn] };
          });
          if (actions2.onUpdate) {
            builder.onUpdate(actions2.onUpdate);
          }
          if (actions2.onDelete) {
            builder.onDelete(actions2.onDelete);
          }
          return builder.build(table);
        },
        ref,
        actions
      );
    });
  }
  /** @internal */
  buildExtraConfigColumn(table) {
    return new ExtraConfigColumn(table, this.config);
  }
};
var PgColumn = class extends Column {
  static {
    __name(this, "PgColumn");
  }
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
  static [entityKind] = "PgColumn";
};
var ExtraConfigColumn = class extends PgColumn {
  static {
    __name(this, "ExtraConfigColumn");
  }
  static [entityKind] = "ExtraConfigColumn";
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? "asc",
    nulls: this.config.nulls ?? "last",
    opClass: this.config.opClass
  };
  defaultConfig = {
    order: "asc",
    nulls: "last",
    opClass: void 0
  };
  asc() {
    this.indexConfig.order = "asc";
    return this;
  }
  desc() {
    this.indexConfig.order = "desc";
    return this;
  }
  nullsFirst() {
    this.indexConfig.nulls = "first";
    return this;
  }
  nullsLast() {
    this.indexConfig.nulls = "last";
    return this;
  }
  /**
   * ### PostgreSQL documentation quote
   *
   * > An operator class with optional parameters can be specified for each column of an index.
   * The operator class identifies the operators to be used by the index for that column.
   * For example, a B-tree index on four-byte integers would use the int4_ops class;
   * this operator class includes comparison functions for four-byte integers.
   * In practice the default operator class for the column's data type is usually sufficient.
   * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
   * For example, we might want to sort a complex-number data type either by absolute value or by real part.
   * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
   * More information about operator classes check:
   *
   * ### Useful links
   * https://www.postgresql.org/docs/current/sql-createindex.html
   *
   * https://www.postgresql.org/docs/current/indexes-opclass.html
   *
   * https://www.postgresql.org/docs/current/xindex.html
   *
   * ### Additional types
   * If you have the `pg_vector` extension installed in your database, you can use the
   * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
   *
   * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
   *
   * @param opClass
   * @returns
   */
  op(opClass) {
    this.indexConfig.opClass = opClass;
    return this;
  }
};
var IndexedColumn = class {
  static {
    __name(this, "IndexedColumn");
  }
  static [entityKind] = "IndexedColumn";
  constructor(name18, keyAsName, type, indexConfig) {
    this.name = name18;
    this.keyAsName = keyAsName;
    this.type = type;
    this.indexConfig = indexConfig;
  }
  name;
  keyAsName;
  type;
  indexConfig;
};
var PgArrayBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgArrayBuilder");
  }
  static [entityKind] = "PgArrayBuilder";
  constructor(name18, baseBuilder, size) {
    super(name18, "array", "PgArray");
    this.config.baseBuilder = baseBuilder;
    this.config.size = size;
  }
  /** @internal */
  build(table) {
    const baseColumn = this.config.baseBuilder.build(table);
    return new PgArray(
      table,
      this.config,
      baseColumn
    );
  }
};
var PgArray = class _PgArray extends PgColumn {
  static {
    __name(this, "PgArray");
  }
  constructor(table, config, baseColumn, range) {
    super(table, config);
    this.baseColumn = baseColumn;
    this.range = range;
    this.size = config.size;
  }
  size;
  static [entityKind] = "PgArray";
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      value = parsePgArray(value);
    }
    return value.map((v2) => this.baseColumn.mapFromDriverValue(v2));
  }
  mapToDriverValue(value, isNestedArray = false) {
    const a3 = value.map(
      (v2) => v2 === null ? null : is(this.baseColumn, _PgArray) ? this.baseColumn.mapToDriverValue(v2, true) : this.baseColumn.mapToDriverValue(v2)
    );
    if (isNestedArray)
      return a3;
    return makePgArray(a3);
  }
};

// node_modules/drizzle-orm/pg-core/columns/enum.js
var PgEnumObjectColumnBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgEnumObjectColumnBuilder");
  }
  static [entityKind] = "PgEnumObjectColumnBuilder";
  constructor(name18, enumInstance) {
    super(name18, "string", "PgEnumObjectColumn");
    this.config.enum = enumInstance;
  }
  /** @internal */
  build(table) {
    return new PgEnumObjectColumn(
      table,
      this.config
    );
  }
};
var PgEnumObjectColumn = class extends PgColumn {
  static {
    __name(this, "PgEnumObjectColumn");
  }
  static [entityKind] = "PgEnumObjectColumn";
  enum;
  enumValues = this.config.enum.enumValues;
  constructor(table, config) {
    super(table, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
};
var isPgEnumSym = Symbol.for("drizzle:isPgEnum");
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
__name(isPgEnum, "isPgEnum");
var PgEnumColumnBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgEnumColumnBuilder");
  }
  static [entityKind] = "PgEnumColumnBuilder";
  constructor(name18, enumInstance) {
    super(name18, "string", "PgEnumColumn");
    this.config.enum = enumInstance;
  }
  /** @internal */
  build(table) {
    return new PgEnumColumn(
      table,
      this.config
    );
  }
};
var PgEnumColumn = class extends PgColumn {
  static {
    __name(this, "PgEnumColumn");
  }
  static [entityKind] = "PgEnumColumn";
  enum = this.config.enum;
  enumValues = this.config.enum.enumValues;
  constructor(table, config) {
    super(table, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
};

// node_modules/drizzle-orm/subquery.js
var Subquery = class {
  static {
    __name(this, "Subquery");
  }
  static [entityKind] = "Subquery";
  constructor(sql2, selection, alias, isWith = false) {
    this._ = {
      brand: "Subquery",
      sql: sql2,
      selectedFields: selection,
      alias,
      isWith
    };
  }
  // getSQL(): SQL<unknown> {
  // 	return new SQL([this]);
  // }
};
var WithSubquery = class extends Subquery {
  static {
    __name(this, "WithSubquery");
  }
  static [entityKind] = "WithSubquery";
};

// node_modules/drizzle-orm/version.js
var version = "0.43.1";

// node_modules/drizzle-orm/tracing.js
var otel;
var rawTracer;
var tracer = {
  startActiveSpan(name18, fn2) {
    if (!otel) {
      return fn2();
    }
    if (!rawTracer) {
      rawTracer = otel.trace.getTracer("drizzle-orm", version);
    }
    return iife(
      (otel2, rawTracer2) => rawTracer2.startActiveSpan(
        name18,
        (span) => {
          try {
            return fn2(span);
          } catch (e3) {
            span.setStatus({
              code: otel2.SpanStatusCode.ERROR,
              message: e3 instanceof Error ? e3.message : "Unknown error"
              // eslint-disable-line no-instanceof/no-instanceof
            });
            throw e3;
          } finally {
            span.end();
          }
        }
      ),
      otel,
      rawTracer
    );
  }
};

// node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");

// node_modules/drizzle-orm/table.js
var Schema = Symbol.for("drizzle:Schema");
var Columns = Symbol.for("drizzle:Columns");
var ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
var OriginalName = Symbol.for("drizzle:OriginalName");
var BaseName = Symbol.for("drizzle:BaseName");
var IsAlias = Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");
var Table = class {
  static {
    __name(this, "Table");
  }
  static [entityKind] = "Table";
  /** @internal */
  static Symbol = {
    Name: TableName,
    Schema,
    OriginalName,
    Columns,
    ExtraConfigColumns,
    BaseName,
    IsAlias,
    ExtraConfigBuilder
  };
  /**
   * @internal
   * Can be changed if the table is aliased.
   */
  [TableName];
  /**
   * @internal
   * Used to store the original name of the table, before any aliasing.
   */
  [OriginalName];
  /** @internal */
  [Schema];
  /** @internal */
  [Columns];
  /** @internal */
  [ExtraConfigColumns];
  /**
   *  @internal
   * Used to store the table name before the transformation via the `tableCreator` functions.
   */
  [BaseName];
  /** @internal */
  [IsAlias] = false;
  /** @internal */
  [IsDrizzleTable] = true;
  /** @internal */
  [ExtraConfigBuilder] = void 0;
  constructor(name18, schema, baseName) {
    this[TableName] = this[OriginalName] = name18;
    this[Schema] = schema;
    this[BaseName] = baseName;
  }
};
function getTableName(table) {
  return table[TableName];
}
__name(getTableName, "getTableName");
function getTableUniqueName(table) {
  return `${table[Schema] ?? "public"}.${table[TableName]}`;
}
__name(getTableUniqueName, "getTableUniqueName");

// node_modules/drizzle-orm/sql/sql.js
var FakePrimitiveParam = class {
  static {
    __name(this, "FakePrimitiveParam");
  }
  static [entityKind] = "FakePrimitiveParam";
};
function isSQLWrapper(value) {
  return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
__name(isSQLWrapper, "isSQLWrapper");
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
__name(mergeQueries, "mergeQueries");
var StringChunk = class {
  static {
    __name(this, "StringChunk");
  }
  static [entityKind] = "StringChunk";
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
};
var SQL = class _SQL {
  static {
    __name(this, "SQL");
  }
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
  }
  static [entityKind] = "SQL";
  /** @internal */
  decoder = noopDecoder;
  shouldInlineParams = false;
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span?.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const {
      casing,
      escapeName,
      escapeParam,
      prepareTyping,
      inlineParams,
      paramStartIndex
    } = config;
    return mergeQueries(chunks.map((chunk) => {
      if (is(chunk, StringChunk)) {
        return { sql: chunk.value.join(""), params: [] };
      }
      if (is(chunk, Name)) {
        return { sql: escapeName(chunk.value), params: [] };
      }
      if (chunk === void 0) {
        return { sql: "", params: [] };
      }
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i3, p3] of chunk.entries()) {
          result.push(p3);
          if (i3 < chunk.length - 1) {
            result.push(new StringChunk(", "));
          }
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config);
      }
      if (is(chunk, _SQL)) {
        return this.buildQueryFromSourceParams(chunk.queryChunks, {
          ...config,
          inlineParams: inlineParams || chunk.shouldInlineParams
        });
      }
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        return {
          sql: schemaName === void 0 || chunk[IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (is(chunk, Column)) {
        const columnName = casing.getColumnCasing(chunk);
        if (_config.invokeSource === "indexes") {
          return { sql: escapeName(columnName), params: [] };
        }
        const schemaName = chunk.table[Table.Symbol.Schema];
        return {
          sql: chunk.table[IsAlias] || schemaName === void 0 ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
          params: []
        };
      }
      if (is(chunk, View)) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === void 0 || chunk[ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (is(chunk, Param)) {
        if (is(chunk.value, Placeholder)) {
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (is(mappedValue, _SQL)) {
          return this.buildQueryFromSourceParams([mappedValue], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(mappedValue, config), params: [] };
        }
        let typings = ["none"];
        if (prepareTyping) {
          typings = [prepareTyping(chunk.encoder)];
        }
        return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
      }
      if (is(chunk, Placeholder)) {
        return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
      }
      if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
        return { sql: escapeName(chunk.fieldAlias), params: [] };
      }
      if (is(chunk, Subquery)) {
        if (chunk._.isWith) {
          return { sql: escapeName(chunk._.alias), params: [] };
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk._.sql,
          new StringChunk(") "),
          new Name(chunk._.alias)
        ], config);
      }
      if (isPgEnum(chunk)) {
        if (chunk.schema) {
          return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
        }
        return { sql: escapeName(chunk.enumName), params: [] };
      }
      if (isSQLWrapper(chunk)) {
        if (chunk.shouldOmitSQLParens?.()) {
          return this.buildQueryFromSourceParams([chunk.getSQL()], config);
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config);
      }
      if (inlineParams) {
        return { sql: this.mapInlineParam(chunk, config), params: [] };
      }
      return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return "null";
    }
    if (typeof chunk === "number" || typeof chunk === "boolean") {
      return chunk.toString();
    }
    if (typeof chunk === "string") {
      return escapeString(chunk);
    }
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === void 0) {
      return this;
    }
    return new _SQL.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
  /**
   * This method is used to conditionally include a part of the query.
   *
   * @param condition - Condition to check
   * @returns itself if the condition is `true`, otherwise `undefined`
   */
  if(condition) {
    return condition ? this : void 0;
  }
};
var Name = class {
  static {
    __name(this, "Name");
  }
  constructor(value) {
    this.value = value;
  }
  static [entityKind] = "Name";
  brand;
  getSQL() {
    return new SQL([this]);
  }
};
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
__name(isDriverValueEncoder, "isDriverValueEncoder");
var noopDecoder = {
  mapFromDriverValue: /* @__PURE__ */ __name((value) => value, "mapFromDriverValue")
};
var noopEncoder = {
  mapToDriverValue: /* @__PURE__ */ __name((value) => value, "mapToDriverValue")
};
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};
var Param = class {
  static {
    __name(this, "Param");
  }
  /**
   * @param value - Parameter value
   * @param encoder - Encoder to convert the value to a driver parameter
   */
  constructor(value, encoder = noopEncoder) {
    this.value = value;
    this.encoder = encoder;
  }
  static [entityKind] = "Param";
  brand;
  getSQL() {
    return new SQL([this]);
  }
};
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
__name(sql, "sql");
((sql2) => {
  function empty() {
    return new SQL([]);
  }
  __name(empty, "empty");
  sql2.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  __name(fromList, "fromList");
  sql2.fromList = fromList;
  function raw2(str) {
    return new SQL([new StringChunk(str)]);
  }
  __name(raw2, "raw");
  sql2.raw = raw2;
  function join(chunks, separator) {
    const result = [];
    for (const [i3, chunk] of chunks.entries()) {
      if (i3 > 0 && separator !== void 0) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return new SQL(result);
  }
  __name(join, "join");
  sql2.join = join;
  function identifier(value) {
    return new Name(value);
  }
  __name(identifier, "identifier");
  sql2.identifier = identifier;
  function placeholder2(name25) {
    return new Placeholder(name25);
  }
  __name(placeholder2, "placeholder2");
  sql2.placeholder = placeholder2;
  function param2(value, encoder) {
    return new Param(value, encoder);
  }
  __name(param2, "param2");
  sql2.param = param2;
})(sql || (sql = {}));
((SQL2) => {
  class Aliased {
    static {
      __name(this, "Aliased");
    }
    constructor(sql2, fieldAlias) {
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    static [entityKind] = "SQL.Aliased";
    /** @internal */
    isSelectionField = false;
    getSQL() {
      return this.sql;
    }
    /** @internal */
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));
var Placeholder = class {
  static {
    __name(this, "Placeholder");
  }
  constructor(name25) {
    this.name = name25;
  }
  static [entityKind] = "Placeholder";
  getSQL() {
    return new SQL([this]);
  }
};
function fillPlaceholders(params, values) {
  return params.map((p3) => {
    if (is(p3, Placeholder)) {
      if (!(p3.name in values)) {
        throw new Error(`No value for placeholder "${p3.name}" was provided`);
      }
      return values[p3.name];
    }
    if (is(p3, Param) && is(p3.value, Placeholder)) {
      if (!(p3.value.name in values)) {
        throw new Error(`No value for placeholder "${p3.value.name}" was provided`);
      }
      return p3.encoder.mapToDriverValue(values[p3.value.name]);
    }
    return p3;
  });
}
__name(fillPlaceholders, "fillPlaceholders");
var IsDrizzleView = Symbol.for("drizzle:IsDrizzleView");
var View = class {
  static {
    __name(this, "View");
  }
  static [entityKind] = "View";
  /** @internal */
  [ViewBaseConfig];
  /** @internal */
  [IsDrizzleView] = true;
  constructor({ name: name25, schema, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name25,
      originalName: name25,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
  getSQL() {
    return new SQL([this]);
  }
};
Column.prototype.getSQL = function() {
  return new SQL([this]);
};
Table.prototype.getSQL = function() {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
  return new SQL([this]);
};

// node_modules/drizzle-orm/alias.js
var ColumnAliasProxyHandler = class {
  static {
    __name(this, "ColumnAliasProxyHandler");
  }
  constructor(table) {
    this.table = table;
  }
  static [entityKind] = "ColumnAliasProxyHandler";
  get(columnObj, prop) {
    if (prop === "table") {
      return this.table;
    }
    return columnObj[prop];
  }
};
var TableAliasProxyHandler = class {
  static {
    __name(this, "TableAliasProxyHandler");
  }
  constructor(alias, replaceOriginalName) {
    this.alias = alias;
    this.replaceOriginalName = replaceOriginalName;
  }
  static [entityKind] = "TableAliasProxyHandler";
  get(target, prop) {
    if (prop === Table.Symbol.IsAlias) {
      return true;
    }
    if (prop === Table.Symbol.Name) {
      return this.alias;
    }
    if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
      return this.alias;
    }
    if (prop === ViewBaseConfig) {
      return {
        ...target[ViewBaseConfig],
        name: this.alias,
        isAlias: true
      };
    }
    if (prop === Table.Symbol.Columns) {
      const columns = target[Table.Symbol.Columns];
      if (!columns) {
        return columns;
      }
      const proxiedColumns = {};
      Object.keys(columns).map((key) => {
        proxiedColumns[key] = new Proxy(
          columns[key],
          new ColumnAliasProxyHandler(new Proxy(target, this))
        );
      });
      return proxiedColumns;
    }
    const value = target[prop];
    if (is(value, Column)) {
      return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
    }
    return value;
  }
};
var RelationTableAliasProxyHandler = class {
  static {
    __name(this, "RelationTableAliasProxyHandler");
  }
  constructor(alias) {
    this.alias = alias;
  }
  static [entityKind] = "RelationTableAliasProxyHandler";
  get(target, prop) {
    if (prop === "sourceTable") {
      return aliasedTable(target.sourceTable, this.alias);
    }
    return target[prop];
  }
};
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
__name(aliasedTable, "aliasedTable");
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(
    column,
    new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false)))
  );
}
__name(aliasedTableColumn, "aliasedTableColumn");
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
__name(mapColumnsInAliasedSQLToAlias, "mapColumnsInAliasedSQLToAlias");
function mapColumnsInSQLToAlias(query, alias) {
  return sql.join(query.queryChunks.map((c2) => {
    if (is(c2, Column)) {
      return aliasedTableColumn(c2, alias);
    }
    if (is(c2, SQL)) {
      return mapColumnsInSQLToAlias(c2, alias);
    }
    if (is(c2, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c2, alias);
    }
    return c2;
  }));
}
__name(mapColumnsInSQLToAlias, "mapColumnsInSQLToAlias");

// node_modules/drizzle-orm/errors.js
var DrizzleError = class extends Error {
  static {
    __name(this, "DrizzleError");
  }
  static [entityKind] = "DrizzleError";
  constructor({ message, cause }) {
    super(message);
    this.name = "DrizzleError";
    this.cause = cause;
  }
};
var TransactionRollbackError = class extends DrizzleError {
  static {
    __name(this, "TransactionRollbackError");
  }
  static [entityKind] = "TransactionRollbackError";
  constructor() {
    super({ message: "Rollback" });
  }
};

// node_modules/drizzle-orm/logger.js
var ConsoleLogWriter = class {
  static {
    __name(this, "ConsoleLogWriter");
  }
  static [entityKind] = "ConsoleLogWriter";
  write(message) {
    console.log(message);
  }
};
var DefaultLogger = class {
  static {
    __name(this, "DefaultLogger");
  }
  static [entityKind] = "DefaultLogger";
  writer;
  constructor(config) {
    this.writer = config?.writer ?? new ConsoleLogWriter();
  }
  logQuery(query, params) {
    const stringifiedParams = params.map((p3) => {
      try {
        return JSON.stringify(p3);
      } catch {
        return String(p3);
      }
    });
    const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
    this.writer.write(`Query: ${query}${paramsStr}`);
  }
};
var NoopLogger = class {
  static {
    __name(this, "NoopLogger");
  }
  static [entityKind] = "NoopLogger";
  logQuery() {
  }
};

// node_modules/drizzle-orm/query-promise.js
var QueryPromise = class {
  static {
    __name(this, "QueryPromise");
  }
  static [entityKind] = "QueryPromise";
  [Symbol.toStringTag] = "QueryPromise";
  catch(onRejected) {
    return this.then(void 0, onRejected);
  }
  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally?.();
        return value;
      },
      (reason) => {
        onFinally?.();
        throw reason;
      }
    );
  }
  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
};

// node_modules/drizzle-orm/utils.js
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce(
    (result2, { path, field }, columnIndex) => {
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      let node = result2;
      for (const [pathChunkIndex, pathChunk] of path.entries()) {
        if (pathChunkIndex < path.length - 1) {
          if (!(pathChunk in node)) {
            node[pathChunk] = {};
          }
          node = node[pathChunk];
        } else {
          const rawValue = row[columnIndex];
          const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
          if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
            const objectName = path[0];
            if (!(objectName in nullifyMap)) {
              nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
            } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
              nullifyMap[objectName] = false;
            }
          }
        }
      }
      return result2;
    },
    {}
  );
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
}
__name(mapResultRow, "mapResultRow");
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name18, field]) => {
    if (typeof name18 !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name18] : [name18];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
__name(orderSelectedFields, "orderSelectedFields");
function haveSameKeys(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index, key] of leftKeys.entries()) {
    if (key !== rightKeys[index]) {
      return false;
    }
  }
  return true;
}
__name(haveSameKeys, "haveSameKeys");
function mapUpdateSet(table, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key, value]) => {
    if (is(value, SQL) || is(value, Column)) {
      return [key, value];
    } else {
      return [key, new Param(value, table[Table.Symbol.Columns][key])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
}
__name(mapUpdateSet, "mapUpdateSet");
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name18 of Object.getOwnPropertyNames(extendedClass.prototype)) {
      if (name18 === "constructor")
        continue;
      Object.defineProperty(
        baseClass.prototype,
        name18,
        Object.getOwnPropertyDescriptor(extendedClass.prototype, name18) || /* @__PURE__ */ Object.create(null)
      );
    }
  }
}
__name(applyMixins, "applyMixins");
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
__name(getTableColumns, "getTableColumns");
function getTableLikeName(table) {
  return is(table, Subquery) ? table._.alias : is(table, View) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}
__name(getTableLikeName, "getTableLikeName");
function getColumnNameAndConfig(a3, b2) {
  return {
    name: typeof a3 === "string" && a3.length > 0 ? a3 : "",
    config: typeof a3 === "object" ? a3 : b2
  };
}
__name(getColumnNameAndConfig, "getColumnNameAndConfig");
function isConfig(data) {
  if (typeof data !== "object" || data === null)
    return false;
  if (data.constructor.name !== "Object")
    return false;
  if ("logger" in data) {
    const type = typeof data["logger"];
    if (type !== "boolean" && (type !== "object" || typeof data["logger"]["logQuery"] !== "function") && type !== "undefined")
      return false;
    return true;
  }
  if ("schema" in data) {
    const type = typeof data["schema"];
    if (type !== "object" && type !== "undefined")
      return false;
    return true;
  }
  if ("casing" in data) {
    const type = typeof data["casing"];
    if (type !== "string" && type !== "undefined")
      return false;
    return true;
  }
  if ("mode" in data) {
    if (data["mode"] !== "default" || data["mode"] !== "planetscale" || data["mode"] !== void 0)
      return false;
    return true;
  }
  if ("connection" in data) {
    const type = typeof data["connection"];
    if (type !== "string" && type !== "object" && type !== "undefined")
      return false;
    return true;
  }
  if ("client" in data) {
    const type = typeof data["client"];
    if (type !== "object" && type !== "function" && type !== "undefined")
      return false;
    return true;
  }
  if (Object.keys(data).length === 0)
    return true;
  return false;
}
__name(isConfig, "isConfig");

// node_modules/drizzle-orm/pg-core/columns/int.common.js
var PgIntColumnBaseBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgIntColumnBaseBuilder");
  }
  static [entityKind] = "PgIntColumnBaseBuilder";
  generatedAlwaysAsIdentity(sequence) {
    if (sequence) {
      const { name: name18, ...options } = sequence;
      this.config.generatedIdentity = {
        type: "always",
        sequenceName: name18,
        sequenceOptions: options
      };
    } else {
      this.config.generatedIdentity = {
        type: "always"
      };
    }
    this.config.hasDefault = true;
    this.config.notNull = true;
    return this;
  }
  generatedByDefaultAsIdentity(sequence) {
    if (sequence) {
      const { name: name18, ...options } = sequence;
      this.config.generatedIdentity = {
        type: "byDefault",
        sequenceName: name18,
        sequenceOptions: options
      };
    } else {
      this.config.generatedIdentity = {
        type: "byDefault"
      };
    }
    this.config.hasDefault = true;
    this.config.notNull = true;
    return this;
  }
};

// node_modules/drizzle-orm/pg-core/columns/bigint.js
var PgBigInt53Builder = class extends PgIntColumnBaseBuilder {
  static {
    __name(this, "PgBigInt53Builder");
  }
  static [entityKind] = "PgBigInt53Builder";
  constructor(name18) {
    super(name18, "number", "PgBigInt53");
  }
  /** @internal */
  build(table) {
    return new PgBigInt53(table, this.config);
  }
};
var PgBigInt53 = class extends PgColumn {
  static {
    __name(this, "PgBigInt53");
  }
  static [entityKind] = "PgBigInt53";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(value) {
    if (typeof value === "number") {
      return value;
    }
    return Number(value);
  }
};
var PgBigInt64Builder = class extends PgIntColumnBaseBuilder {
  static {
    __name(this, "PgBigInt64Builder");
  }
  static [entityKind] = "PgBigInt64Builder";
  constructor(name18) {
    super(name18, "bigint", "PgBigInt64");
  }
  /** @internal */
  build(table) {
    return new PgBigInt64(
      table,
      this.config
    );
  }
};
var PgBigInt64 = class extends PgColumn {
  static {
    __name(this, "PgBigInt64");
  }
  static [entityKind] = "PgBigInt64";
  getSQLType() {
    return "bigint";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(value) {
    return BigInt(value);
  }
};
function bigint(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  if (config.mode === "number") {
    return new PgBigInt53Builder(name18);
  }
  return new PgBigInt64Builder(name18);
}
__name(bigint, "bigint");

// node_modules/drizzle-orm/pg-core/columns/bigserial.js
var PgBigSerial53Builder = class extends PgColumnBuilder {
  static {
    __name(this, "PgBigSerial53Builder");
  }
  static [entityKind] = "PgBigSerial53Builder";
  constructor(name18) {
    super(name18, "number", "PgBigSerial53");
    this.config.hasDefault = true;
    this.config.notNull = true;
  }
  /** @internal */
  build(table) {
    return new PgBigSerial53(
      table,
      this.config
    );
  }
};
var PgBigSerial53 = class extends PgColumn {
  static {
    __name(this, "PgBigSerial53");
  }
  static [entityKind] = "PgBigSerial53";
  getSQLType() {
    return "bigserial";
  }
  mapFromDriverValue(value) {
    if (typeof value === "number") {
      return value;
    }
    return Number(value);
  }
};
var PgBigSerial64Builder = class extends PgColumnBuilder {
  static {
    __name(this, "PgBigSerial64Builder");
  }
  static [entityKind] = "PgBigSerial64Builder";
  constructor(name18) {
    super(name18, "bigint", "PgBigSerial64");
    this.config.hasDefault = true;
  }
  /** @internal */
  build(table) {
    return new PgBigSerial64(
      table,
      this.config
    );
  }
};
var PgBigSerial64 = class extends PgColumn {
  static {
    __name(this, "PgBigSerial64");
  }
  static [entityKind] = "PgBigSerial64";
  getSQLType() {
    return "bigserial";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(value) {
    return BigInt(value);
  }
};
function bigserial(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  if (config.mode === "number") {
    return new PgBigSerial53Builder(name18);
  }
  return new PgBigSerial64Builder(name18);
}
__name(bigserial, "bigserial");

// node_modules/drizzle-orm/pg-core/columns/boolean.js
var PgBooleanBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgBooleanBuilder");
  }
  static [entityKind] = "PgBooleanBuilder";
  constructor(name18) {
    super(name18, "boolean", "PgBoolean");
  }
  /** @internal */
  build(table) {
    return new PgBoolean(table, this.config);
  }
};
var PgBoolean = class extends PgColumn {
  static {
    __name(this, "PgBoolean");
  }
  static [entityKind] = "PgBoolean";
  getSQLType() {
    return "boolean";
  }
};
function boolean(name18) {
  return new PgBooleanBuilder(name18 ?? "");
}
__name(boolean, "boolean");

// node_modules/drizzle-orm/pg-core/columns/char.js
var PgCharBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgCharBuilder");
  }
  static [entityKind] = "PgCharBuilder";
  constructor(name18, config) {
    super(name18, "string", "PgChar");
    this.config.length = config.length;
    this.config.enumValues = config.enum;
  }
  /** @internal */
  build(table) {
    return new PgChar(
      table,
      this.config
    );
  }
};
var PgChar = class extends PgColumn {
  static {
    __name(this, "PgChar");
  }
  static [entityKind] = "PgChar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? `char` : `char(${this.length})`;
  }
};
function char(a3, b2 = {}) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgCharBuilder(name18, config);
}
__name(char, "char");

// node_modules/drizzle-orm/pg-core/columns/cidr.js
var PgCidrBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgCidrBuilder");
  }
  static [entityKind] = "PgCidrBuilder";
  constructor(name18) {
    super(name18, "string", "PgCidr");
  }
  /** @internal */
  build(table) {
    return new PgCidr(table, this.config);
  }
};
var PgCidr = class extends PgColumn {
  static {
    __name(this, "PgCidr");
  }
  static [entityKind] = "PgCidr";
  getSQLType() {
    return "cidr";
  }
};
function cidr(name18) {
  return new PgCidrBuilder(name18 ?? "");
}
__name(cidr, "cidr");

// node_modules/drizzle-orm/pg-core/columns/custom.js
var PgCustomColumnBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgCustomColumnBuilder");
  }
  static [entityKind] = "PgCustomColumnBuilder";
  constructor(name18, fieldConfig, customTypeParams) {
    super(name18, "custom", "PgCustomColumn");
    this.config.fieldConfig = fieldConfig;
    this.config.customTypeParams = customTypeParams;
  }
  /** @internal */
  build(table) {
    return new PgCustomColumn(
      table,
      this.config
    );
  }
};
var PgCustomColumn = class extends PgColumn {
  static {
    __name(this, "PgCustomColumn");
  }
  static [entityKind] = "PgCustomColumn";
  sqlName;
  mapTo;
  mapFrom;
  constructor(table, config) {
    super(table, config);
    this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
    this.mapTo = config.customTypeParams.toDriver;
    this.mapFrom = config.customTypeParams.fromDriver;
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(value) {
    return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
  }
  mapToDriverValue(value) {
    return typeof this.mapTo === "function" ? this.mapTo(value) : value;
  }
};
function customType(customTypeParams) {
  return (a3, b2) => {
    const { name: name18, config } = getColumnNameAndConfig(a3, b2);
    return new PgCustomColumnBuilder(name18, config, customTypeParams);
  };
}
__name(customType, "customType");

// node_modules/drizzle-orm/pg-core/columns/date.common.js
var PgDateColumnBaseBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgDateColumnBaseBuilder");
  }
  static [entityKind] = "PgDateColumnBaseBuilder";
  defaultNow() {
    return this.default(sql`now()`);
  }
};

// node_modules/drizzle-orm/pg-core/columns/date.js
var PgDateBuilder = class extends PgDateColumnBaseBuilder {
  static {
    __name(this, "PgDateBuilder");
  }
  static [entityKind] = "PgDateBuilder";
  constructor(name18) {
    super(name18, "date", "PgDate");
  }
  /** @internal */
  build(table) {
    return new PgDate(table, this.config);
  }
};
var PgDate = class extends PgColumn {
  static {
    __name(this, "PgDate");
  }
  static [entityKind] = "PgDate";
  getSQLType() {
    return "date";
  }
  mapFromDriverValue(value) {
    return new Date(value);
  }
  mapToDriverValue(value) {
    return value.toISOString();
  }
};
var PgDateStringBuilder = class extends PgDateColumnBaseBuilder {
  static {
    __name(this, "PgDateStringBuilder");
  }
  static [entityKind] = "PgDateStringBuilder";
  constructor(name18) {
    super(name18, "string", "PgDateString");
  }
  /** @internal */
  build(table) {
    return new PgDateString(
      table,
      this.config
    );
  }
};
var PgDateString = class extends PgColumn {
  static {
    __name(this, "PgDateString");
  }
  static [entityKind] = "PgDateString";
  getSQLType() {
    return "date";
  }
};
function date(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  if (config?.mode === "date") {
    return new PgDateBuilder(name18);
  }
  return new PgDateStringBuilder(name18);
}
__name(date, "date");

// node_modules/drizzle-orm/pg-core/columns/double-precision.js
var PgDoublePrecisionBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgDoublePrecisionBuilder");
  }
  static [entityKind] = "PgDoublePrecisionBuilder";
  constructor(name18) {
    super(name18, "number", "PgDoublePrecision");
  }
  /** @internal */
  build(table) {
    return new PgDoublePrecision(
      table,
      this.config
    );
  }
};
var PgDoublePrecision = class extends PgColumn {
  static {
    __name(this, "PgDoublePrecision");
  }
  static [entityKind] = "PgDoublePrecision";
  getSQLType() {
    return "double precision";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      return Number.parseFloat(value);
    }
    return value;
  }
};
function doublePrecision(name18) {
  return new PgDoublePrecisionBuilder(name18 ?? "");
}
__name(doublePrecision, "doublePrecision");

// node_modules/drizzle-orm/pg-core/columns/inet.js
var PgInetBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgInetBuilder");
  }
  static [entityKind] = "PgInetBuilder";
  constructor(name18) {
    super(name18, "string", "PgInet");
  }
  /** @internal */
  build(table) {
    return new PgInet(table, this.config);
  }
};
var PgInet = class extends PgColumn {
  static {
    __name(this, "PgInet");
  }
  static [entityKind] = "PgInet";
  getSQLType() {
    return "inet";
  }
};
function inet(name18) {
  return new PgInetBuilder(name18 ?? "");
}
__name(inet, "inet");

// node_modules/drizzle-orm/pg-core/columns/integer.js
var PgIntegerBuilder = class extends PgIntColumnBaseBuilder {
  static {
    __name(this, "PgIntegerBuilder");
  }
  static [entityKind] = "PgIntegerBuilder";
  constructor(name18) {
    super(name18, "number", "PgInteger");
  }
  /** @internal */
  build(table) {
    return new PgInteger(table, this.config);
  }
};
var PgInteger = class extends PgColumn {
  static {
    __name(this, "PgInteger");
  }
  static [entityKind] = "PgInteger";
  getSQLType() {
    return "integer";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      return Number.parseInt(value);
    }
    return value;
  }
};
function integer(name18) {
  return new PgIntegerBuilder(name18 ?? "");
}
__name(integer, "integer");

// node_modules/drizzle-orm/pg-core/columns/interval.js
var PgIntervalBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgIntervalBuilder");
  }
  static [entityKind] = "PgIntervalBuilder";
  constructor(name18, intervalConfig) {
    super(name18, "string", "PgInterval");
    this.config.intervalConfig = intervalConfig;
  }
  /** @internal */
  build(table) {
    return new PgInterval(table, this.config);
  }
};
var PgInterval = class extends PgColumn {
  static {
    __name(this, "PgInterval");
  }
  static [entityKind] = "PgInterval";
  fields = this.config.intervalConfig.fields;
  precision = this.config.intervalConfig.precision;
  getSQLType() {
    const fields = this.fields ? ` ${this.fields}` : "";
    const precision = this.precision ? `(${this.precision})` : "";
    return `interval${fields}${precision}`;
  }
};
function interval(a3, b2 = {}) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgIntervalBuilder(name18, config);
}
__name(interval, "interval");

// node_modules/drizzle-orm/pg-core/columns/json.js
var PgJsonBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgJsonBuilder");
  }
  static [entityKind] = "PgJsonBuilder";
  constructor(name18) {
    super(name18, "json", "PgJson");
  }
  /** @internal */
  build(table) {
    return new PgJson(table, this.config);
  }
};
var PgJson = class extends PgColumn {
  static {
    __name(this, "PgJson");
  }
  static [entityKind] = "PgJson";
  constructor(table, config) {
    super(table, config);
  }
  getSQLType() {
    return "json";
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  }
};
function json(name18) {
  return new PgJsonBuilder(name18 ?? "");
}
__name(json, "json");

// node_modules/drizzle-orm/pg-core/columns/jsonb.js
var PgJsonbBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgJsonbBuilder");
  }
  static [entityKind] = "PgJsonbBuilder";
  constructor(name18) {
    super(name18, "json", "PgJsonb");
  }
  /** @internal */
  build(table) {
    return new PgJsonb(table, this.config);
  }
};
var PgJsonb = class extends PgColumn {
  static {
    __name(this, "PgJsonb");
  }
  static [entityKind] = "PgJsonb";
  constructor(table, config) {
    super(table, config);
  }
  getSQLType() {
    return "jsonb";
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  }
};
function jsonb(name18) {
  return new PgJsonbBuilder(name18 ?? "");
}
__name(jsonb, "jsonb");

// node_modules/drizzle-orm/pg-core/columns/line.js
var PgLineBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgLineBuilder");
  }
  static [entityKind] = "PgLineBuilder";
  constructor(name18) {
    super(name18, "array", "PgLine");
  }
  /** @internal */
  build(table) {
    return new PgLineTuple(
      table,
      this.config
    );
  }
};
var PgLineTuple = class extends PgColumn {
  static {
    __name(this, "PgLineTuple");
  }
  static [entityKind] = "PgLine";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(value) {
    const [a3, b2, c2] = value.slice(1, -1).split(",");
    return [Number.parseFloat(a3), Number.parseFloat(b2), Number.parseFloat(c2)];
  }
  mapToDriverValue(value) {
    return `{${value[0]},${value[1]},${value[2]}}`;
  }
};
var PgLineABCBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgLineABCBuilder");
  }
  static [entityKind] = "PgLineABCBuilder";
  constructor(name18) {
    super(name18, "json", "PgLineABC");
  }
  /** @internal */
  build(table) {
    return new PgLineABC(
      table,
      this.config
    );
  }
};
var PgLineABC = class extends PgColumn {
  static {
    __name(this, "PgLineABC");
  }
  static [entityKind] = "PgLineABC";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(value) {
    const [a3, b2, c2] = value.slice(1, -1).split(",");
    return { a: Number.parseFloat(a3), b: Number.parseFloat(b2), c: Number.parseFloat(c2) };
  }
  mapToDriverValue(value) {
    return `{${value.a},${value.b},${value.c}}`;
  }
};
function line(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  if (!config?.mode || config.mode === "tuple") {
    return new PgLineBuilder(name18);
  }
  return new PgLineABCBuilder(name18);
}
__name(line, "line");

// node_modules/drizzle-orm/pg-core/columns/macaddr.js
var PgMacaddrBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgMacaddrBuilder");
  }
  static [entityKind] = "PgMacaddrBuilder";
  constructor(name18) {
    super(name18, "string", "PgMacaddr");
  }
  /** @internal */
  build(table) {
    return new PgMacaddr(table, this.config);
  }
};
var PgMacaddr = class extends PgColumn {
  static {
    __name(this, "PgMacaddr");
  }
  static [entityKind] = "PgMacaddr";
  getSQLType() {
    return "macaddr";
  }
};
function macaddr(name18) {
  return new PgMacaddrBuilder(name18 ?? "");
}
__name(macaddr, "macaddr");

// node_modules/drizzle-orm/pg-core/columns/macaddr8.js
var PgMacaddr8Builder = class extends PgColumnBuilder {
  static {
    __name(this, "PgMacaddr8Builder");
  }
  static [entityKind] = "PgMacaddr8Builder";
  constructor(name18) {
    super(name18, "string", "PgMacaddr8");
  }
  /** @internal */
  build(table) {
    return new PgMacaddr8(table, this.config);
  }
};
var PgMacaddr8 = class extends PgColumn {
  static {
    __name(this, "PgMacaddr8");
  }
  static [entityKind] = "PgMacaddr8";
  getSQLType() {
    return "macaddr8";
  }
};
function macaddr8(name18) {
  return new PgMacaddr8Builder(name18 ?? "");
}
__name(macaddr8, "macaddr8");

// node_modules/drizzle-orm/pg-core/columns/numeric.js
var PgNumericBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgNumericBuilder");
  }
  static [entityKind] = "PgNumericBuilder";
  constructor(name18, precision, scale) {
    super(name18, "string", "PgNumeric");
    this.config.precision = precision;
    this.config.scale = scale;
  }
  /** @internal */
  build(table) {
    return new PgNumeric(table, this.config);
  }
};
var PgNumeric = class extends PgColumn {
  static {
    __name(this, "PgNumeric");
  }
  static [entityKind] = "PgNumeric";
  precision;
  scale;
  constructor(table, config) {
    super(table, config);
    this.precision = config.precision;
    this.scale = config.scale;
  }
  mapFromDriverValue(value) {
    if (typeof value === "string")
      return value;
    return String(value);
  }
  getSQLType() {
    if (this.precision !== void 0 && this.scale !== void 0) {
      return `numeric(${this.precision}, ${this.scale})`;
    } else if (this.precision === void 0) {
      return "numeric";
    } else {
      return `numeric(${this.precision})`;
    }
  }
};
var PgNumericNumberBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgNumericNumberBuilder");
  }
  static [entityKind] = "PgNumericNumberBuilder";
  constructor(name18, precision, scale) {
    super(name18, "number", "PgNumericNumber");
    this.config.precision = precision;
    this.config.scale = scale;
  }
  /** @internal */
  build(table) {
    return new PgNumericNumber(
      table,
      this.config
    );
  }
};
var PgNumericNumber = class extends PgColumn {
  static {
    __name(this, "PgNumericNumber");
  }
  static [entityKind] = "PgNumericNumber";
  precision;
  scale;
  constructor(table, config) {
    super(table, config);
    this.precision = config.precision;
    this.scale = config.scale;
  }
  mapFromDriverValue(value) {
    if (typeof value === "number")
      return value;
    return Number(value);
  }
  mapToDriverValue = String;
  getSQLType() {
    if (this.precision !== void 0 && this.scale !== void 0) {
      return `numeric(${this.precision}, ${this.scale})`;
    } else if (this.precision === void 0) {
      return "numeric";
    } else {
      return `numeric(${this.precision})`;
    }
  }
};
var PgNumericBigIntBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgNumericBigIntBuilder");
  }
  static [entityKind] = "PgNumericBigIntBuilder";
  constructor(name18, precision, scale) {
    super(name18, "bigint", "PgNumericBigInt");
    this.config.precision = precision;
    this.config.scale = scale;
  }
  /** @internal */
  build(table) {
    return new PgNumericBigInt(
      table,
      this.config
    );
  }
};
var PgNumericBigInt = class extends PgColumn {
  static {
    __name(this, "PgNumericBigInt");
  }
  static [entityKind] = "PgNumericBigInt";
  precision;
  scale;
  constructor(table, config) {
    super(table, config);
    this.precision = config.precision;
    this.scale = config.scale;
  }
  mapFromDriverValue = BigInt;
  mapToDriverValue = String;
  getSQLType() {
    if (this.precision !== void 0 && this.scale !== void 0) {
      return `numeric(${this.precision}, ${this.scale})`;
    } else if (this.precision === void 0) {
      return "numeric";
    } else {
      return `numeric(${this.precision})`;
    }
  }
};
function numeric(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  const mode = config?.mode;
  return mode === "number" ? new PgNumericNumberBuilder(name18, config?.precision, config?.scale) : mode === "bigint" ? new PgNumericBigIntBuilder(name18, config?.precision, config?.scale) : new PgNumericBuilder(name18, config?.precision, config?.scale);
}
__name(numeric, "numeric");

// node_modules/drizzle-orm/pg-core/columns/point.js
var PgPointTupleBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgPointTupleBuilder");
  }
  static [entityKind] = "PgPointTupleBuilder";
  constructor(name18) {
    super(name18, "array", "PgPointTuple");
  }
  /** @internal */
  build(table) {
    return new PgPointTuple(
      table,
      this.config
    );
  }
};
var PgPointTuple = class extends PgColumn {
  static {
    __name(this, "PgPointTuple");
  }
  static [entityKind] = "PgPointTuple";
  getSQLType() {
    return "point";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      const [x3, y2] = value.slice(1, -1).split(",");
      return [Number.parseFloat(x3), Number.parseFloat(y2)];
    }
    return [value.x, value.y];
  }
  mapToDriverValue(value) {
    return `(${value[0]},${value[1]})`;
  }
};
var PgPointObjectBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgPointObjectBuilder");
  }
  static [entityKind] = "PgPointObjectBuilder";
  constructor(name18) {
    super(name18, "json", "PgPointObject");
  }
  /** @internal */
  build(table) {
    return new PgPointObject(
      table,
      this.config
    );
  }
};
var PgPointObject = class extends PgColumn {
  static {
    __name(this, "PgPointObject");
  }
  static [entityKind] = "PgPointObject";
  getSQLType() {
    return "point";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      const [x3, y2] = value.slice(1, -1).split(",");
      return { x: Number.parseFloat(x3), y: Number.parseFloat(y2) };
    }
    return value;
  }
  mapToDriverValue(value) {
    return `(${value.x},${value.y})`;
  }
};
function point(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  if (!config?.mode || config.mode === "tuple") {
    return new PgPointTupleBuilder(name18);
  }
  return new PgPointObjectBuilder(name18);
}
__name(point, "point");

// node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.js
function hexToBytes(hex) {
  const bytes = [];
  for (let c2 = 0; c2 < hex.length; c2 += 2) {
    bytes.push(Number.parseInt(hex.slice(c2, c2 + 2), 16));
  }
  return new Uint8Array(bytes);
}
__name(hexToBytes, "hexToBytes");
function bytesToFloat64(bytes, offset) {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  for (let i3 = 0; i3 < 8; i3++) {
    view.setUint8(i3, bytes[offset + i3]);
  }
  return view.getFloat64(0, true);
}
__name(bytesToFloat64, "bytesToFloat64");
function parseEWKB(hex) {
  const bytes = hexToBytes(hex);
  let offset = 0;
  const byteOrder = bytes[offset];
  offset += 1;
  const view = new DataView(bytes.buffer);
  const geomType = view.getUint32(offset, byteOrder === 1);
  offset += 4;
  let _srid;
  if (geomType & 536870912) {
    _srid = view.getUint32(offset, byteOrder === 1);
    offset += 4;
  }
  if ((geomType & 65535) === 1) {
    const x3 = bytesToFloat64(bytes, offset);
    offset += 8;
    const y2 = bytesToFloat64(bytes, offset);
    offset += 8;
    return [x3, y2];
  }
  throw new Error("Unsupported geometry type");
}
__name(parseEWKB, "parseEWKB");

// node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.js
var PgGeometryBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgGeometryBuilder");
  }
  static [entityKind] = "PgGeometryBuilder";
  constructor(name18) {
    super(name18, "array", "PgGeometry");
  }
  /** @internal */
  build(table) {
    return new PgGeometry(
      table,
      this.config
    );
  }
};
var PgGeometry = class extends PgColumn {
  static {
    __name(this, "PgGeometry");
  }
  static [entityKind] = "PgGeometry";
  getSQLType() {
    return "geometry(point)";
  }
  mapFromDriverValue(value) {
    return parseEWKB(value);
  }
  mapToDriverValue(value) {
    return `point(${value[0]} ${value[1]})`;
  }
};
var PgGeometryObjectBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgGeometryObjectBuilder");
  }
  static [entityKind] = "PgGeometryObjectBuilder";
  constructor(name18) {
    super(name18, "json", "PgGeometryObject");
  }
  /** @internal */
  build(table) {
    return new PgGeometryObject(
      table,
      this.config
    );
  }
};
var PgGeometryObject = class extends PgColumn {
  static {
    __name(this, "PgGeometryObject");
  }
  static [entityKind] = "PgGeometryObject";
  getSQLType() {
    return "geometry(point)";
  }
  mapFromDriverValue(value) {
    const parsed = parseEWKB(value);
    return { x: parsed[0], y: parsed[1] };
  }
  mapToDriverValue(value) {
    return `point(${value.x} ${value.y})`;
  }
};
function geometry(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  if (!config?.mode || config.mode === "tuple") {
    return new PgGeometryBuilder(name18);
  }
  return new PgGeometryObjectBuilder(name18);
}
__name(geometry, "geometry");

// node_modules/drizzle-orm/pg-core/columns/real.js
var PgRealBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgRealBuilder");
  }
  static [entityKind] = "PgRealBuilder";
  constructor(name18, length) {
    super(name18, "number", "PgReal");
    this.config.length = length;
  }
  /** @internal */
  build(table) {
    return new PgReal(table, this.config);
  }
};
var PgReal = class extends PgColumn {
  static {
    __name(this, "PgReal");
  }
  static [entityKind] = "PgReal";
  constructor(table, config) {
    super(table, config);
  }
  getSQLType() {
    return "real";
  }
  mapFromDriverValue = /* @__PURE__ */ __name((value) => {
    if (typeof value === "string") {
      return Number.parseFloat(value);
    }
    return value;
  }, "mapFromDriverValue");
};
function real(name18) {
  return new PgRealBuilder(name18 ?? "");
}
__name(real, "real");

// node_modules/drizzle-orm/pg-core/columns/serial.js
var PgSerialBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgSerialBuilder");
  }
  static [entityKind] = "PgSerialBuilder";
  constructor(name18) {
    super(name18, "number", "PgSerial");
    this.config.hasDefault = true;
    this.config.notNull = true;
  }
  /** @internal */
  build(table) {
    return new PgSerial(table, this.config);
  }
};
var PgSerial = class extends PgColumn {
  static {
    __name(this, "PgSerial");
  }
  static [entityKind] = "PgSerial";
  getSQLType() {
    return "serial";
  }
};
function serial(name18) {
  return new PgSerialBuilder(name18 ?? "");
}
__name(serial, "serial");

// node_modules/drizzle-orm/pg-core/columns/smallint.js
var PgSmallIntBuilder = class extends PgIntColumnBaseBuilder {
  static {
    __name(this, "PgSmallIntBuilder");
  }
  static [entityKind] = "PgSmallIntBuilder";
  constructor(name18) {
    super(name18, "number", "PgSmallInt");
  }
  /** @internal */
  build(table) {
    return new PgSmallInt(table, this.config);
  }
};
var PgSmallInt = class extends PgColumn {
  static {
    __name(this, "PgSmallInt");
  }
  static [entityKind] = "PgSmallInt";
  getSQLType() {
    return "smallint";
  }
  mapFromDriverValue = /* @__PURE__ */ __name((value) => {
    if (typeof value === "string") {
      return Number(value);
    }
    return value;
  }, "mapFromDriverValue");
};
function smallint(name18) {
  return new PgSmallIntBuilder(name18 ?? "");
}
__name(smallint, "smallint");

// node_modules/drizzle-orm/pg-core/columns/smallserial.js
var PgSmallSerialBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgSmallSerialBuilder");
  }
  static [entityKind] = "PgSmallSerialBuilder";
  constructor(name18) {
    super(name18, "number", "PgSmallSerial");
    this.config.hasDefault = true;
    this.config.notNull = true;
  }
  /** @internal */
  build(table) {
    return new PgSmallSerial(
      table,
      this.config
    );
  }
};
var PgSmallSerial = class extends PgColumn {
  static {
    __name(this, "PgSmallSerial");
  }
  static [entityKind] = "PgSmallSerial";
  getSQLType() {
    return "smallserial";
  }
};
function smallserial(name18) {
  return new PgSmallSerialBuilder(name18 ?? "");
}
__name(smallserial, "smallserial");

// node_modules/drizzle-orm/pg-core/columns/text.js
var PgTextBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgTextBuilder");
  }
  static [entityKind] = "PgTextBuilder";
  constructor(name18, config) {
    super(name18, "string", "PgText");
    this.config.enumValues = config.enum;
  }
  /** @internal */
  build(table) {
    return new PgText(table, this.config);
  }
};
var PgText = class extends PgColumn {
  static {
    __name(this, "PgText");
  }
  static [entityKind] = "PgText";
  enumValues = this.config.enumValues;
  getSQLType() {
    return "text";
  }
};
function text(a3, b2 = {}) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgTextBuilder(name18, config);
}
__name(text, "text");

// node_modules/drizzle-orm/pg-core/columns/time.js
var PgTimeBuilder = class extends PgDateColumnBaseBuilder {
  static {
    __name(this, "PgTimeBuilder");
  }
  constructor(name18, withTimezone, precision) {
    super(name18, "string", "PgTime");
    this.withTimezone = withTimezone;
    this.precision = precision;
    this.config.withTimezone = withTimezone;
    this.config.precision = precision;
  }
  static [entityKind] = "PgTimeBuilder";
  /** @internal */
  build(table) {
    return new PgTime(table, this.config);
  }
};
var PgTime = class extends PgColumn {
  static {
    __name(this, "PgTime");
  }
  static [entityKind] = "PgTime";
  withTimezone;
  precision;
  constructor(table, config) {
    super(table, config);
    this.withTimezone = config.withTimezone;
    this.precision = config.precision;
  }
  getSQLType() {
    const precision = this.precision === void 0 ? "" : `(${this.precision})`;
    return `time${precision}${this.withTimezone ? " with time zone" : ""}`;
  }
};
function time(a3, b2 = {}) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgTimeBuilder(name18, config.withTimezone ?? false, config.precision);
}
__name(time, "time");

// node_modules/drizzle-orm/pg-core/columns/timestamp.js
var PgTimestampBuilder = class extends PgDateColumnBaseBuilder {
  static {
    __name(this, "PgTimestampBuilder");
  }
  static [entityKind] = "PgTimestampBuilder";
  constructor(name18, withTimezone, precision) {
    super(name18, "date", "PgTimestamp");
    this.config.withTimezone = withTimezone;
    this.config.precision = precision;
  }
  /** @internal */
  build(table) {
    return new PgTimestamp(table, this.config);
  }
};
var PgTimestamp = class extends PgColumn {
  static {
    __name(this, "PgTimestamp");
  }
  static [entityKind] = "PgTimestamp";
  withTimezone;
  precision;
  constructor(table, config) {
    super(table, config);
    this.withTimezone = config.withTimezone;
    this.precision = config.precision;
  }
  getSQLType() {
    const precision = this.precision === void 0 ? "" : ` (${this.precision})`;
    return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
  }
  mapFromDriverValue = /* @__PURE__ */ __name((value) => {
    return new Date(this.withTimezone ? value : value + "+0000");
  }, "mapFromDriverValue");
  mapToDriverValue = /* @__PURE__ */ __name((value) => {
    return value.toISOString();
  }, "mapToDriverValue");
};
var PgTimestampStringBuilder = class extends PgDateColumnBaseBuilder {
  static {
    __name(this, "PgTimestampStringBuilder");
  }
  static [entityKind] = "PgTimestampStringBuilder";
  constructor(name18, withTimezone, precision) {
    super(name18, "string", "PgTimestampString");
    this.config.withTimezone = withTimezone;
    this.config.precision = precision;
  }
  /** @internal */
  build(table) {
    return new PgTimestampString(
      table,
      this.config
    );
  }
};
var PgTimestampString = class extends PgColumn {
  static {
    __name(this, "PgTimestampString");
  }
  static [entityKind] = "PgTimestampString";
  withTimezone;
  precision;
  constructor(table, config) {
    super(table, config);
    this.withTimezone = config.withTimezone;
    this.precision = config.precision;
  }
  getSQLType() {
    const precision = this.precision === void 0 ? "" : `(${this.precision})`;
    return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
  }
};
function timestamp(a3, b2 = {}) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  if (config?.mode === "string") {
    return new PgTimestampStringBuilder(name18, config.withTimezone ?? false, config.precision);
  }
  return new PgTimestampBuilder(name18, config?.withTimezone ?? false, config?.precision);
}
__name(timestamp, "timestamp");

// node_modules/drizzle-orm/pg-core/columns/uuid.js
var PgUUIDBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgUUIDBuilder");
  }
  static [entityKind] = "PgUUIDBuilder";
  constructor(name18) {
    super(name18, "string", "PgUUID");
  }
  /**
   * Adds `default gen_random_uuid()` to the column definition.
   */
  defaultRandom() {
    return this.default(sql`gen_random_uuid()`);
  }
  /** @internal */
  build(table) {
    return new PgUUID(table, this.config);
  }
};
var PgUUID = class extends PgColumn {
  static {
    __name(this, "PgUUID");
  }
  static [entityKind] = "PgUUID";
  getSQLType() {
    return "uuid";
  }
};
function uuid(name18) {
  return new PgUUIDBuilder(name18 ?? "");
}
__name(uuid, "uuid");

// node_modules/drizzle-orm/pg-core/columns/varchar.js
var PgVarcharBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgVarcharBuilder");
  }
  static [entityKind] = "PgVarcharBuilder";
  constructor(name18, config) {
    super(name18, "string", "PgVarchar");
    this.config.length = config.length;
    this.config.enumValues = config.enum;
  }
  /** @internal */
  build(table) {
    return new PgVarchar(
      table,
      this.config
    );
  }
};
var PgVarchar = class extends PgColumn {
  static {
    __name(this, "PgVarchar");
  }
  static [entityKind] = "PgVarchar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
  }
};
function varchar(a3, b2 = {}) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgVarcharBuilder(name18, config);
}
__name(varchar, "varchar");

// node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.js
var PgBinaryVectorBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgBinaryVectorBuilder");
  }
  static [entityKind] = "PgBinaryVectorBuilder";
  constructor(name18, config) {
    super(name18, "string", "PgBinaryVector");
    this.config.dimensions = config.dimensions;
  }
  /** @internal */
  build(table) {
    return new PgBinaryVector(
      table,
      this.config
    );
  }
};
var PgBinaryVector = class extends PgColumn {
  static {
    __name(this, "PgBinaryVector");
  }
  static [entityKind] = "PgBinaryVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `bit(${this.dimensions})`;
  }
};
function bit(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgBinaryVectorBuilder(name18, config);
}
__name(bit, "bit");

// node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.js
var PgHalfVectorBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgHalfVectorBuilder");
  }
  static [entityKind] = "PgHalfVectorBuilder";
  constructor(name18, config) {
    super(name18, "array", "PgHalfVector");
    this.config.dimensions = config.dimensions;
  }
  /** @internal */
  build(table) {
    return new PgHalfVector(
      table,
      this.config
    );
  }
};
var PgHalfVector = class extends PgColumn {
  static {
    __name(this, "PgHalfVector");
  }
  static [entityKind] = "PgHalfVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `halfvec(${this.dimensions})`;
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    return value.slice(1, -1).split(",").map((v2) => Number.parseFloat(v2));
  }
};
function halfvec(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgHalfVectorBuilder(name18, config);
}
__name(halfvec, "halfvec");

// node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.js
var PgSparseVectorBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgSparseVectorBuilder");
  }
  static [entityKind] = "PgSparseVectorBuilder";
  constructor(name18, config) {
    super(name18, "string", "PgSparseVector");
    this.config.dimensions = config.dimensions;
  }
  /** @internal */
  build(table) {
    return new PgSparseVector(
      table,
      this.config
    );
  }
};
var PgSparseVector = class extends PgColumn {
  static {
    __name(this, "PgSparseVector");
  }
  static [entityKind] = "PgSparseVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `sparsevec(${this.dimensions})`;
  }
};
function sparsevec(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgSparseVectorBuilder(name18, config);
}
__name(sparsevec, "sparsevec");

// node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.js
var PgVectorBuilder = class extends PgColumnBuilder {
  static {
    __name(this, "PgVectorBuilder");
  }
  static [entityKind] = "PgVectorBuilder";
  constructor(name18, config) {
    super(name18, "array", "PgVector");
    this.config.dimensions = config.dimensions;
  }
  /** @internal */
  build(table) {
    return new PgVector(
      table,
      this.config
    );
  }
};
var PgVector = class extends PgColumn {
  static {
    __name(this, "PgVector");
  }
  static [entityKind] = "PgVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `vector(${this.dimensions})`;
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    return value.slice(1, -1).split(",").map((v2) => Number.parseFloat(v2));
  }
};
function vector(a3, b2) {
  const { name: name18, config } = getColumnNameAndConfig(a3, b2);
  return new PgVectorBuilder(name18, config);
}
__name(vector, "vector");

// node_modules/drizzle-orm/pg-core/columns/all.js
function getPgColumnBuilders() {
  return {
    bigint,
    bigserial,
    boolean,
    char,
    cidr,
    customType,
    date,
    doublePrecision,
    inet,
    integer,
    interval,
    json,
    jsonb,
    line,
    macaddr,
    macaddr8,
    numeric,
    point,
    geometry,
    real,
    serial,
    smallint,
    smallserial,
    text,
    time,
    timestamp,
    uuid,
    varchar,
    bit,
    halfvec,
    sparsevec,
    vector
  };
}
__name(getPgColumnBuilders, "getPgColumnBuilders");

// node_modules/drizzle-orm/pg-core/table.js
var InlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");
var EnableRLS = Symbol.for("drizzle:EnableRLS");
var PgTable = class extends Table {
  static {
    __name(this, "PgTable");
  }
  static [entityKind] = "PgTable";
  /** @internal */
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys,
    EnableRLS
  });
  /**@internal */
  [InlineForeignKeys] = [];
  /** @internal */
  [EnableRLS] = false;
  /** @internal */
  [Table.Symbol.ExtraConfigBuilder] = void 0;
  /** @internal */
  [Table.Symbol.ExtraConfigColumns] = {};
};
function pgTableWithSchema(name18, columns, extraConfig, schema, baseName = name18) {
  const rawTable = new PgTable(name18, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getPgColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(
    Object.entries(parsedColumns).map(([name25, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name25);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name25, column];
    })
  );
  const builtColumnsForExtraConfig = Object.fromEntries(
    Object.entries(parsedColumns).map(([name25, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name25);
      const column = colBuilder.buildExtraConfigColumn(rawTable);
      return [name25, column];
    })
  );
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  table[Table.Symbol.ExtraConfigColumns] = builtColumnsForExtraConfig;
  if (extraConfig) {
    table[PgTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return Object.assign(table, {
    enableRLS: /* @__PURE__ */ __name(() => {
      table[PgTable.Symbol.EnableRLS] = true;
      return table;
    }, "enableRLS")
  });
}
__name(pgTableWithSchema, "pgTableWithSchema");
var pgTable = /* @__PURE__ */ __name((name18, columns, extraConfig) => {
  return pgTableWithSchema(name18, columns, extraConfig, void 0);
}, "pgTable");

// node_modules/drizzle-orm/pg-core/primary-keys.js
var PrimaryKeyBuilder = class {
  static {
    __name(this, "PrimaryKeyBuilder");
  }
  static [entityKind] = "PgPrimaryKeyBuilder";
  /** @internal */
  columns;
  /** @internal */
  name;
  constructor(columns, name18) {
    this.columns = columns;
    this.name = name18;
  }
  /** @internal */
  build(table) {
    return new PrimaryKey(table, this.columns, this.name);
  }
};
var PrimaryKey = class {
  static {
    __name(this, "PrimaryKey");
  }
  constructor(table, columns, name18) {
    this.table = table;
    this.columns = columns;
    this.name = name18;
  }
  static [entityKind] = "PgPrimaryKey";
  columns;
  name;
  getName() {
    return this.name ?? `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
  }
};

// node_modules/drizzle-orm/sql/expressions/conditions.js
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
__name(bindIfParam, "bindIfParam");
var eq = /* @__PURE__ */ __name((left, right) => {
  return sql`${left} = ${bindIfParam(right, left)}`;
}, "eq");
var ne = /* @__PURE__ */ __name((left, right) => {
  return sql`${left} <> ${bindIfParam(right, left)}`;
}, "ne");
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c2) => c2 !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
__name(and, "and");
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c2) => c2 !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
__name(or, "or");
function not(condition) {
  return sql`not ${condition}`;
}
__name(not, "not");
var gt = /* @__PURE__ */ __name((left, right) => {
  return sql`${left} > ${bindIfParam(right, left)}`;
}, "gt");
var gte = /* @__PURE__ */ __name((left, right) => {
  return sql`${left} >= ${bindIfParam(right, left)}`;
}, "gte");
var lt = /* @__PURE__ */ __name((left, right) => {
  return sql`${left} < ${bindIfParam(right, left)}`;
}, "lt");
var lte = /* @__PURE__ */ __name((left, right) => {
  return sql`${left} <= ${bindIfParam(right, left)}`;
}, "lte");
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`false`;
    }
    return sql`${column} in ${values.map((v2) => bindIfParam(v2, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}
__name(inArray, "inArray");
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`true`;
    }
    return sql`${column} not in ${values.map((v2) => bindIfParam(v2, column))}`;
  }
  return sql`${column} not in ${bindIfParam(values, column)}`;
}
__name(notInArray, "notInArray");
function isNull(value) {
  return sql`${value} is null`;
}
__name(isNull, "isNull");
function isNotNull(value) {
  return sql`${value} is not null`;
}
__name(isNotNull, "isNotNull");
function exists(subquery) {
  return sql`exists ${subquery}`;
}
__name(exists, "exists");
function notExists(subquery) {
  return sql`not exists ${subquery}`;
}
__name(notExists, "notExists");
function between(column, min, max) {
  return sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(
    max,
    column
  )}`;
}
__name(between, "between");
function notBetween(column, min, max) {
  return sql`${column} not between ${bindIfParam(
    min,
    column
  )} and ${bindIfParam(max, column)}`;
}
__name(notBetween, "notBetween");
function like(column, value) {
  return sql`${column} like ${value}`;
}
__name(like, "like");
function notLike(column, value) {
  return sql`${column} not like ${value}`;
}
__name(notLike, "notLike");
function ilike(column, value) {
  return sql`${column} ilike ${value}`;
}
__name(ilike, "ilike");
function notIlike(column, value) {
  return sql`${column} not ilike ${value}`;
}
__name(notIlike, "notIlike");

// node_modules/drizzle-orm/sql/expressions/select.js
function asc(column) {
  return sql`${column} asc`;
}
__name(asc, "asc");
function desc(column) {
  return sql`${column} desc`;
}
__name(desc, "desc");

// node_modules/drizzle-orm/relations.js
var Relation = class {
  static {
    __name(this, "Relation");
  }
  constructor(sourceTable, referencedTable, relationName) {
    this.sourceTable = sourceTable;
    this.referencedTable = referencedTable;
    this.relationName = relationName;
    this.referencedTableName = referencedTable[Table.Symbol.Name];
  }
  static [entityKind] = "Relation";
  referencedTableName;
  fieldName;
};
var Relations = class {
  static {
    __name(this, "Relations");
  }
  constructor(table, config) {
    this.table = table;
    this.config = config;
  }
  static [entityKind] = "Relations";
};
var One = class _One extends Relation {
  static {
    __name(this, "One");
  }
  constructor(sourceTable, referencedTable, config, isNullable) {
    super(sourceTable, referencedTable, config?.relationName);
    this.config = config;
    this.isNullable = isNullable;
  }
  static [entityKind] = "One";
  withFieldName(fieldName) {
    const relation = new _One(
      this.sourceTable,
      this.referencedTable,
      this.config,
      this.isNullable
    );
    relation.fieldName = fieldName;
    return relation;
  }
};
var Many = class _Many extends Relation {
  static {
    __name(this, "Many");
  }
  constructor(sourceTable, referencedTable, config) {
    super(sourceTable, referencedTable, config?.relationName);
    this.config = config;
  }
  static [entityKind] = "Many";
  withFieldName(fieldName) {
    const relation = new _Many(
      this.sourceTable,
      this.referencedTable,
      this.config
    );
    relation.fieldName = fieldName;
    return relation;
  }
};
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql
  };
}
__name(getOperators, "getOperators");
function getOrderByOperators() {
  return {
    sql,
    asc,
    desc
  };
}
__name(getOrderByOperators, "getOrderByOperators");
function extractTablesRelationalConfig(schema, configHelpers) {
  if (Object.keys(schema).length === 1 && "default" in schema && !is(schema["default"], Table)) {
    schema = schema["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) {
    if (is(value, Table)) {
      const dbName = getTableUniqueName(value);
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value[Table.Symbol.Name],
        schema: value[Table.Symbol.Schema],
        columns: value[Table.Symbol.Columns],
        relations: bufferedRelations?.relations ?? {},
        primaryKey: bufferedRelations?.primaryKey ?? []
      };
      for (const column of Object.values(
        value[Table.Symbol.Columns]
      )) {
        if (column.primary) {
          tablesConfig[key].primaryKey.push(column);
        }
      }
      const extraConfig = value[Table.Symbol.ExtraConfigBuilder]?.(value[Table.Symbol.ExtraConfigColumns]);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value, Relations)) {
      const dbName = getTableUniqueName(value.table);
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(
        configHelpers(value.table)
      );
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
          if (primaryKey) {
            tableConfig.primaryKey.push(...primaryKey);
          }
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
}
__name(extractTablesRelationalConfig, "extractTablesRelationalConfig");
function createOne(sourceTable) {
  return /* @__PURE__ */ __name(function one(table, config) {
    return new One(
      sourceTable,
      table,
      config,
      config?.fields.reduce((res, f2) => res && f2.notNull, true) ?? false
    );
  }, "one");
}
__name(createOne, "createOne");
function createMany(sourceTable) {
  return /* @__PURE__ */ __name(function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  }, "many");
}
__name(createMany, "createMany");
function normalizeRelation(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[getTableUniqueName(relation.referencedTable)];
  if (!referencedTableTsName) {
    throw new Error(
      `Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[getTableUniqueName(sourceTable)];
  if (!sourceTableTsName) {
    throw new Error(
      `Table "${sourceTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(
    referencedTableConfig.relations
  )) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(
      `There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`
    ) : new Error(
      `There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`
    );
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(
    `There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`
  );
}
__name(normalizeRelation, "normalizeRelation");
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
}
__name(createTableRelationsHelpers, "createTableRelationsHelpers");
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [
    selectionItemIndex,
    selectionItem
  ] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(
        tablesConfig,
        tablesConfig[selectionItem.relationTableTsKey],
        subRows,
        selectionItem.selection,
        mapColumnValue
      ) : subRows.map(
        (subRow) => mapRelationalRow(
          tablesConfig,
          tablesConfig[selectionItem.relationTableTsKey],
          subRow,
          selectionItem.selection,
          mapColumnValue
        )
      );
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
}
__name(mapRelationalRow, "mapRelationalRow");

// node_modules/drizzle-orm/selection-proxy.js
var SelectionProxyHandler = class _SelectionProxyHandler {
  static {
    __name(this, "SelectionProxyHandler");
  }
  static [entityKind] = "SelectionProxyHandler";
  config;
  constructor(config) {
    this.config = { ...config };
  }
  get(subquery, prop) {
    if (prop === "_") {
      return {
        ...subquery["_"],
        selectedFields: new Proxy(
          subquery._.selectedFields,
          this
        )
      };
    }
    if (prop === ViewBaseConfig) {
      return {
        ...subquery[ViewBaseConfig],
        selectedFields: new Proxy(
          subquery[ViewBaseConfig].selectedFields,
          this
        )
      };
    }
    if (typeof prop === "symbol") {
      return subquery[prop];
    }
    const columns = is(subquery, Subquery) ? subquery._.selectedFields : is(subquery, View) ? subquery[ViewBaseConfig].selectedFields : subquery;
    const value = columns[prop];
    if (is(value, SQL.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
        return value.sql;
      }
      const newValue = value.clone();
      newValue.isSelectionField = true;
      return newValue;
    }
    if (is(value, SQL)) {
      if (this.config.sqlBehavior === "sql") {
        return value;
      }
      throw new Error(
        `You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
      );
    }
    if (is(value, Column)) {
      if (this.config.alias) {
        return new Proxy(
          value,
          new ColumnAliasProxyHandler(
            new Proxy(
              value.table,
              new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false)
            )
          )
        );
      }
      return value;
    }
    if (typeof value !== "object" || value === null) {
      return value;
    }
    return new Proxy(value, new _SelectionProxyHandler(this.config));
  }
};

// node_modules/drizzle-orm/pg-core/query-builders/delete.js
var PgDeleteBase = class extends QueryPromise {
  static {
    __name(this, "PgDeleteBase");
  }
  constructor(table, session, dialect, withList) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { table, withList };
  }
  static [entityKind] = "PgDelete";
  config;
  /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will delete only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be deleted.
   *
   * ```ts
   * // Delete all cars with green color
   * await db.delete(cars).where(eq(cars.color, 'green'));
   * // or
   * await db.delete(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Delete all BMW cars with a green color
   * await db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Delete all cars with the green or blue color
   * await db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(where) {
    this.config.where = where;
    return this;
  }
  returning(fields = this.config.table[Table.Symbol.Columns]) {
    this.config.returningFields = fields;
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(name18) {
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name18, true);
    });
  }
  prepare(name18) {
    return this._prepare(name18);
  }
  authToken;
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  execute = /* @__PURE__ */ __name((placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues, this.authToken);
    });
  }, "execute");
  /** @internal */
  getSelectedFields() {
    return this.config.returningFields ? new Proxy(
      this.config.returningFields,
      new SelectionProxyHandler({
        alias: getTableName(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
};

// node_modules/drizzle-orm/casing.js
function toSnakeCase(input) {
  const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.map((word) => word.toLowerCase()).join("_");
}
__name(toSnakeCase, "toSnakeCase");
function toCamelCase(input) {
  const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.reduce((acc, word, i3) => {
    const formattedWord = i3 === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`;
    return acc + formattedWord;
  }, "");
}
__name(toCamelCase, "toCamelCase");
function noopCase(input) {
  return input;
}
__name(noopCase, "noopCase");
var CasingCache = class {
  static {
    __name(this, "CasingCache");
  }
  static [entityKind] = "CasingCache";
  /** @internal */
  cache = {};
  cachedTables = {};
  convert;
  constructor(casing) {
    this.convert = casing === "snake_case" ? toSnakeCase : casing === "camelCase" ? toCamelCase : noopCase;
  }
  getColumnCasing(column) {
    if (!column.keyAsName)
      return column.name;
    const schema = column.table[Table.Symbol.Schema] ?? "public";
    const tableName = column.table[Table.Symbol.OriginalName];
    const key = `${schema}.${tableName}.${column.name}`;
    if (!this.cache[key]) {
      this.cacheTable(column.table);
    }
    return this.cache[key];
  }
  cacheTable(table) {
    const schema = table[Table.Symbol.Schema] ?? "public";
    const tableName = table[Table.Symbol.OriginalName];
    const tableKey = `${schema}.${tableName}`;
    if (!this.cachedTables[tableKey]) {
      for (const column of Object.values(table[Table.Symbol.Columns])) {
        const columnKey = `${tableKey}.${column.name}`;
        this.cache[columnKey] = this.convert(column.name);
      }
      this.cachedTables[tableKey] = true;
    }
  }
  clearCache() {
    this.cache = {};
    this.cachedTables = {};
  }
};

// node_modules/drizzle-orm/pg-core/view-base.js
var PgViewBase = class extends View {
  static {
    __name(this, "PgViewBase");
  }
  static [entityKind] = "PgViewBase";
};

// node_modules/drizzle-orm/pg-core/dialect.js
var PgDialect = class {
  static {
    __name(this, "PgDialect");
  }
  static [entityKind] = "PgDialect";
  /** @internal */
  casing;
  constructor(config) {
    this.casing = new CasingCache(config?.casing);
  }
  async migrate(migrations, session, config) {
    const migrationsTable = typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
    const migrationsSchema = typeof config === "string" ? "drizzle" : config.migrationsSchema ?? "drizzle";
    const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
    await session.execute(sql`CREATE SCHEMA IF NOT EXISTS ${sql.identifier(migrationsSchema)}`);
    await session.execute(migrationTableCreate);
    const dbMigrations = await session.all(
      sql`select id, hash, created_at from ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} order by created_at desc limit 1`
    );
    const lastDbMigration = dbMigrations[0];
    await session.transaction(async (tx) => {
      for await (const migration of migrations) {
        if (!lastDbMigration || Number(lastDbMigration.created_at) < migration.folderMillis) {
          for (const stmt of migration.sql) {
            await tx.execute(sql.raw(stmt));
          }
          await tx.execute(
            sql`insert into ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} ("hash", "created_at") values(${migration.hash}, ${migration.folderMillis})`
          );
        }
      }
    });
  }
  escapeName(name18) {
    return `"${name18}"`;
  }
  escapeParam(num) {
    return `$${num + 1}`;
  }
  escapeString(str) {
    return `'${str.replace(/'/g, "''")}'`;
  }
  buildWithCTE(queries) {
    if (!queries?.length)
      return void 0;
    const withSqlChunks = [sql`with `];
    for (const [i3, w2] of queries.entries()) {
      withSqlChunks.push(sql`${sql.identifier(w2._.alias)} as (${w2._.sql})`);
      if (i3 < queries.length - 1) {
        withSqlChunks.push(sql`, `);
      }
    }
    withSqlChunks.push(sql` `);
    return sql.join(withSqlChunks);
  }
  buildDeleteQuery({ table, where, returning, withList }) {
    const withSql = this.buildWithCTE(withList);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
    const whereSql = where ? sql` where ${where}` : void 0;
    return sql`${withSql}delete from ${table}${whereSql}${returningSql}`;
  }
  buildUpdateSet(table, set) {
    const tableColumns = table[Table.Symbol.Columns];
    const columnNames = Object.keys(tableColumns).filter(
      (colName) => set[colName] !== void 0 || tableColumns[colName]?.onUpdateFn !== void 0
    );
    const setSize = columnNames.length;
    return sql.join(columnNames.flatMap((colName, i3) => {
      const col = tableColumns[colName];
      const value = set[colName] ?? sql.param(col.onUpdateFn(), col);
      const res = sql`${sql.identifier(this.casing.getColumnCasing(col))} = ${value}`;
      if (i3 < setSize - 1) {
        return [res, sql.raw(", ")];
      }
      return [res];
    }));
  }
  buildUpdateQuery({ table, set, where, returning, withList, from, joins }) {
    const withSql = this.buildWithCTE(withList);
    const tableName = table[PgTable.Symbol.Name];
    const tableSchema = table[PgTable.Symbol.Schema];
    const origTableName = table[PgTable.Symbol.OriginalName];
    const alias = tableName === origTableName ? void 0 : tableName;
    const tableSql = sql`${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`}`;
    const setSql = this.buildUpdateSet(table, set);
    const fromSql = from && sql.join([sql.raw(" from "), this.buildFromTable(from)]);
    const joinsSql = this.buildJoins(joins);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: !from })}` : void 0;
    const whereSql = where ? sql` where ${where}` : void 0;
    return sql`${withSql}update ${tableSql} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}`;
  }
  /**
   * Builds selection SQL with provided fields/expressions
   *
   * Examples:
   *
   * `select <selection> from`
   *
   * `insert ... returning <selection>`
   *
   * If `isSingleTable` is true, then columns won't be prefixed with table name
   */
  buildSelection(fields, { isSingleTable = false } = {}) {
    const columnsLen = fields.length;
    const chunks = fields.flatMap(({ field }, i3) => {
      const chunk = [];
      if (is(field, SQL.Aliased) && field.isSelectionField) {
        chunk.push(sql.identifier(field.fieldAlias));
      } else if (is(field, SQL.Aliased) || is(field, SQL)) {
        const query = is(field, SQL.Aliased) ? field.sql : field;
        if (isSingleTable) {
          chunk.push(
            new SQL(
              query.queryChunks.map((c2) => {
                if (is(c2, PgColumn)) {
                  return sql.identifier(this.casing.getColumnCasing(c2));
                }
                return c2;
              })
            )
          );
        } else {
          chunk.push(query);
        }
        if (is(field, SQL.Aliased)) {
          chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
        }
      } else if (is(field, Column)) {
        if (isSingleTable) {
          chunk.push(sql.identifier(this.casing.getColumnCasing(field)));
        } else {
          chunk.push(field);
        }
      }
      if (i3 < columnsLen - 1) {
        chunk.push(sql`, `);
      }
      return chunk;
    });
    return sql.join(chunks);
  }
  buildJoins(joins) {
    if (!joins || joins.length === 0) {
      return void 0;
    }
    const joinsArray = [];
    for (const [index, joinMeta] of joins.entries()) {
      if (index === 0) {
        joinsArray.push(sql` `);
      }
      const table = joinMeta.table;
      const lateralSql = joinMeta.lateral ? sql` lateral` : void 0;
      const onSql = joinMeta.on ? sql` on ${joinMeta.on}` : void 0;
      if (is(table, PgTable)) {
        const tableName = table[PgTable.Symbol.Name];
        const tableSchema = table[PgTable.Symbol.Schema];
        const origTableName = table[PgTable.Symbol.OriginalName];
        const alias = tableName === origTableName ? void 0 : joinMeta.alias;
        joinsArray.push(
          sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`}${onSql}`
        );
      } else if (is(table, View)) {
        const viewName = table[ViewBaseConfig].name;
        const viewSchema = table[ViewBaseConfig].schema;
        const origViewName = table[ViewBaseConfig].originalName;
        const alias = viewName === origViewName ? void 0 : joinMeta.alias;
        joinsArray.push(
          sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${viewSchema ? sql`${sql.identifier(viewSchema)}.` : void 0}${sql.identifier(origViewName)}${alias && sql` ${sql.identifier(alias)}`}${onSql}`
        );
      } else {
        joinsArray.push(
          sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${table}${onSql}`
        );
      }
      if (index < joins.length - 1) {
        joinsArray.push(sql` `);
      }
    }
    return sql.join(joinsArray);
  }
  buildFromTable(table) {
    if (is(table, Table) && table[Table.Symbol.IsAlias]) {
      let fullName = sql`${sql.identifier(table[Table.Symbol.OriginalName])}`;
      if (table[Table.Symbol.Schema]) {
        fullName = sql`${sql.identifier(table[Table.Symbol.Schema])}.${fullName}`;
      }
      return sql`${fullName} ${sql.identifier(table[Table.Symbol.Name])}`;
    }
    return table;
  }
  buildSelectQuery({
    withList,
    fields,
    fieldsFlat,
    where,
    having,
    table,
    joins,
    orderBy,
    groupBy,
    limit,
    offset,
    lockingClause,
    distinct,
    setOperators
  }) {
    const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
    for (const f2 of fieldsList) {
      if (is(f2.field, Column) && getTableName(f2.field.table) !== (is(table, Subquery) ? table._.alias : is(table, PgViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : getTableName(table)) && !((table2) => joins?.some(
        ({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])
      ))(f2.field.table)) {
        const tableName = getTableName(f2.field.table);
        throw new Error(
          `Your "${f2.path.join("->")}" field references a column "${tableName}"."${f2.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`
        );
      }
    }
    const isSingleTable = !joins || joins.length === 0;
    const withSql = this.buildWithCTE(withList);
    let distinctSql;
    if (distinct) {
      distinctSql = distinct === true ? sql` distinct` : sql` distinct on (${sql.join(distinct.on, sql`, `)})`;
    }
    const selection = this.buildSelection(fieldsList, { isSingleTable });
    const tableSql = this.buildFromTable(table);
    const joinsSql = this.buildJoins(joins);
    const whereSql = where ? sql` where ${where}` : void 0;
    const havingSql = having ? sql` having ${having}` : void 0;
    let orderBySql;
    if (orderBy && orderBy.length > 0) {
      orderBySql = sql` order by ${sql.join(orderBy, sql`, `)}`;
    }
    let groupBySql;
    if (groupBy && groupBy.length > 0) {
      groupBySql = sql` group by ${sql.join(groupBy, sql`, `)}`;
    }
    const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
    const offsetSql = offset ? sql` offset ${offset}` : void 0;
    const lockingClauseSql = sql.empty();
    if (lockingClause) {
      const clauseSql = sql` for ${sql.raw(lockingClause.strength)}`;
      if (lockingClause.config.of) {
        clauseSql.append(
          sql` of ${sql.join(
            Array.isArray(lockingClause.config.of) ? lockingClause.config.of : [lockingClause.config.of],
            sql`, `
          )}`
        );
      }
      if (lockingClause.config.noWait) {
        clauseSql.append(sql` nowait`);
      } else if (lockingClause.config.skipLocked) {
        clauseSql.append(sql` skip locked`);
      }
      lockingClauseSql.append(clauseSql);
    }
    const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}${lockingClauseSql}`;
    if (setOperators.length > 0) {
      return this.buildSetOperations(finalQuery, setOperators);
    }
    return finalQuery;
  }
  buildSetOperations(leftSelect, setOperators) {
    const [setOperator, ...rest] = setOperators;
    if (!setOperator) {
      throw new Error("Cannot pass undefined values to any set operator");
    }
    if (rest.length === 0) {
      return this.buildSetOperationQuery({ leftSelect, setOperator });
    }
    return this.buildSetOperations(
      this.buildSetOperationQuery({ leftSelect, setOperator }),
      rest
    );
  }
  buildSetOperationQuery({
    leftSelect,
    setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
  }) {
    const leftChunk = sql`(${leftSelect.getSQL()}) `;
    const rightChunk = sql`(${rightSelect.getSQL()})`;
    let orderBySql;
    if (orderBy && orderBy.length > 0) {
      const orderByValues = [];
      for (const singleOrderBy of orderBy) {
        if (is(singleOrderBy, PgColumn)) {
          orderByValues.push(sql.identifier(singleOrderBy.name));
        } else if (is(singleOrderBy, SQL)) {
          for (let i3 = 0; i3 < singleOrderBy.queryChunks.length; i3++) {
            const chunk = singleOrderBy.queryChunks[i3];
            if (is(chunk, PgColumn)) {
              singleOrderBy.queryChunks[i3] = sql.identifier(chunk.name);
            }
          }
          orderByValues.push(sql`${singleOrderBy}`);
        } else {
          orderByValues.push(sql`${singleOrderBy}`);
        }
      }
      orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)} `;
    }
    const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
    const operatorChunk = sql.raw(`${type} ${isAll ? "all " : ""}`);
    const offsetSql = offset ? sql` offset ${offset}` : void 0;
    return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
  }
  buildInsertQuery({ table, values: valuesOrSelect, onConflict, returning, withList, select, overridingSystemValue_ }) {
    const valuesSqlList = [];
    const columns = table[Table.Symbol.Columns];
    const colEntries = Object.entries(columns).filter(([_, col]) => !col.shouldDisableInsert());
    const insertOrder = colEntries.map(
      ([, column]) => sql.identifier(this.casing.getColumnCasing(column))
    );
    if (select) {
      const select2 = valuesOrSelect;
      if (is(select2, SQL)) {
        valuesSqlList.push(select2);
      } else {
        valuesSqlList.push(select2.getSQL());
      }
    } else {
      const values = valuesOrSelect;
      valuesSqlList.push(sql.raw("values "));
      for (const [valueIndex, value] of values.entries()) {
        const valueList = [];
        for (const [fieldName, col] of colEntries) {
          const colValue = value[fieldName];
          if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
            if (col.defaultFn !== void 0) {
              const defaultFnResult = col.defaultFn();
              const defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql.param(defaultFnResult, col);
              valueList.push(defaultValue);
            } else if (!col.default && col.onUpdateFn !== void 0) {
              const onUpdateFnResult = col.onUpdateFn();
              const newValue = is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col);
              valueList.push(newValue);
            } else {
              valueList.push(sql`default`);
            }
          } else {
            valueList.push(colValue);
          }
        }
        valuesSqlList.push(valueList);
        if (valueIndex < values.length - 1) {
          valuesSqlList.push(sql`, `);
        }
      }
    }
    const withSql = this.buildWithCTE(withList);
    const valuesSql = sql.join(valuesSqlList);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
    const onConflictSql = onConflict ? sql` on conflict ${onConflict}` : void 0;
    const overridingSql = overridingSystemValue_ === true ? sql`overriding system value ` : void 0;
    return sql`${withSql}insert into ${table} ${insertOrder} ${overridingSql}${valuesSql}${onConflictSql}${returningSql}`;
  }
  buildRefreshMaterializedViewQuery({ view, concurrently, withNoData }) {
    const concurrentlySql = concurrently ? sql` concurrently` : void 0;
    const withNoDataSql = withNoData ? sql` with no data` : void 0;
    return sql`refresh materialized view${concurrentlySql} ${view}${withNoDataSql}`;
  }
  prepareTyping(encoder) {
    if (is(encoder, PgJsonb) || is(encoder, PgJson)) {
      return "json";
    } else if (is(encoder, PgNumeric)) {
      return "decimal";
    } else if (is(encoder, PgTime)) {
      return "time";
    } else if (is(encoder, PgTimestamp) || is(encoder, PgTimestampString)) {
      return "timestamp";
    } else if (is(encoder, PgDate) || is(encoder, PgDateString)) {
      return "date";
    } else if (is(encoder, PgUUID)) {
      return "uuid";
    } else {
      return "none";
    }
  }
  sqlToQuery(sql2, invokeSource) {
    return sql2.toQuery({
      casing: this.casing,
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      prepareTyping: this.prepareTyping,
      invokeSource
    });
  }
  // buildRelationalQueryWithPK({
  // 	fullSchema,
  // 	schema,
  // 	tableNamesMap,
  // 	table,
  // 	tableConfig,
  // 	queryConfig: config,
  // 	tableAlias,
  // 	isRoot = false,
  // 	joinOn,
  // }: {
  // 	fullSchema: Record<string, unknown>;
  // 	schema: TablesRelationalConfig;
  // 	tableNamesMap: Record<string, string>;
  // 	table: PgTable;
  // 	tableConfig: TableRelationalConfig;
  // 	queryConfig: true | DBQueryConfig<'many', true>;
  // 	tableAlias: string;
  // 	isRoot?: boolean;
  // 	joinOn?: SQL;
  // }): BuildRelationalQueryResult<PgTable, PgColumn> {
  // 	// For { "<relation>": true }, return a table with selection of all columns
  // 	if (config === true) {
  // 		const selectionEntries = Object.entries(tableConfig.columns);
  // 		const selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = selectionEntries.map((
  // 			[key, value],
  // 		) => ({
  // 			dbKey: value.name,
  // 			tsKey: key,
  // 			field: value as PgColumn,
  // 			relationTableTsKey: undefined,
  // 			isJson: false,
  // 			selection: [],
  // 		}));
  // 		return {
  // 			tableTsKey: tableConfig.tsName,
  // 			sql: table,
  // 			selection,
  // 		};
  // 	}
  // 	// let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
  // 	// let selectionForBuild = selection;
  // 	const aliasedColumns = Object.fromEntries(
  // 		Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)]),
  // 	);
  // 	const aliasedRelations = Object.fromEntries(
  // 		Object.entries(tableConfig.relations).map(([key, value]) => [key, aliasedRelation(value, tableAlias)]),
  // 	);
  // 	const aliasedFields = Object.assign({}, aliasedColumns, aliasedRelations);
  // 	let where, hasUserDefinedWhere;
  // 	if (config.where) {
  // 		const whereSql = typeof config.where === 'function' ? config.where(aliasedFields, operators) : config.where;
  // 		where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
  // 		hasUserDefinedWhere = !!where;
  // 	}
  // 	where = and(joinOn, where);
  // 	// const fieldsSelection: { tsKey: string; value: PgColumn | SQL.Aliased; isExtra?: boolean }[] = [];
  // 	let joins: Join[] = [];
  // 	let selectedColumns: string[] = [];
  // 	// Figure out which columns to select
  // 	if (config.columns) {
  // 		let isIncludeMode = false;
  // 		for (const [field, value] of Object.entries(config.columns)) {
  // 			if (value === undefined) {
  // 				continue;
  // 			}
  // 			if (field in tableConfig.columns) {
  // 				if (!isIncludeMode && value === true) {
  // 					isIncludeMode = true;
  // 				}
  // 				selectedColumns.push(field);
  // 			}
  // 		}
  // 		if (selectedColumns.length > 0) {
  // 			selectedColumns = isIncludeMode
  // 				? selectedColumns.filter((c) => config.columns?.[c] === true)
  // 				: Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
  // 		}
  // 	} else {
  // 		// Select all columns if selection is not specified
  // 		selectedColumns = Object.keys(tableConfig.columns);
  // 	}
  // 	// for (const field of selectedColumns) {
  // 	// 	const column = tableConfig.columns[field]! as PgColumn;
  // 	// 	fieldsSelection.push({ tsKey: field, value: column });
  // 	// }
  // 	let initiallySelectedRelations: {
  // 		tsKey: string;
  // 		queryConfig: true | DBQueryConfig<'many', false>;
  // 		relation: Relation;
  // 	}[] = [];
  // 	// let selectedRelations: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
  // 	// Figure out which relations to select
  // 	if (config.with) {
  // 		initiallySelectedRelations = Object.entries(config.with)
  // 			.filter((entry): entry is [typeof entry[0], NonNullable<typeof entry[1]>] => !!entry[1])
  // 			.map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey]! }));
  // 	}
  // 	const manyRelations = initiallySelectedRelations.filter((r) =>
  // 		is(r.relation, Many)
  // 		&& (schema[tableNamesMap[r.relation.referencedTable[Table.Symbol.Name]]!]?.primaryKey.length ?? 0) > 0
  // 	);
  // 	// If this is the last Many relation (or there are no Many relations), we are on the innermost subquery level
  // 	const isInnermostQuery = manyRelations.length < 2;
  // 	const selectedExtras: {
  // 		tsKey: string;
  // 		value: SQL.Aliased;
  // 	}[] = [];
  // 	// Figure out which extras to select
  // 	if (isInnermostQuery && config.extras) {
  // 		const extras = typeof config.extras === 'function'
  // 			? config.extras(aliasedFields, { sql })
  // 			: config.extras;
  // 		for (const [tsKey, value] of Object.entries(extras)) {
  // 			selectedExtras.push({
  // 				tsKey,
  // 				value: mapColumnsInAliasedSQLToAlias(value, tableAlias),
  // 			});
  // 		}
  // 	}
  // 	// Transform `fieldsSelection` into `selection`
  // 	// `fieldsSelection` shouldn't be used after this point
  // 	// for (const { tsKey, value, isExtra } of fieldsSelection) {
  // 	// 	selection.push({
  // 	// 		dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey]!.name,
  // 	// 		tsKey,
  // 	// 		field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
  // 	// 		relationTableTsKey: undefined,
  // 	// 		isJson: false,
  // 	// 		isExtra,
  // 	// 		selection: [],
  // 	// 	});
  // 	// }
  // 	let orderByOrig = typeof config.orderBy === 'function'
  // 		? config.orderBy(aliasedFields, orderByOperators)
  // 		: config.orderBy ?? [];
  // 	if (!Array.isArray(orderByOrig)) {
  // 		orderByOrig = [orderByOrig];
  // 	}
  // 	const orderBy = orderByOrig.map((orderByValue) => {
  // 		if (is(orderByValue, Column)) {
  // 			return aliasedTableColumn(orderByValue, tableAlias) as PgColumn;
  // 		}
  // 		return mapColumnsInSQLToAlias(orderByValue, tableAlias);
  // 	});
  // 	const limit = isInnermostQuery ? config.limit : undefined;
  // 	const offset = isInnermostQuery ? config.offset : undefined;
  // 	// For non-root queries without additional config except columns, return a table with selection
  // 	if (
  // 		!isRoot
  // 		&& initiallySelectedRelations.length === 0
  // 		&& selectedExtras.length === 0
  // 		&& !where
  // 		&& orderBy.length === 0
  // 		&& limit === undefined
  // 		&& offset === undefined
  // 	) {
  // 		return {
  // 			tableTsKey: tableConfig.tsName,
  // 			sql: table,
  // 			selection: selectedColumns.map((key) => ({
  // 				dbKey: tableConfig.columns[key]!.name,
  // 				tsKey: key,
  // 				field: tableConfig.columns[key] as PgColumn,
  // 				relationTableTsKey: undefined,
  // 				isJson: false,
  // 				selection: [],
  // 			})),
  // 		};
  // 	}
  // 	const selectedRelationsWithoutPK:
  // 	// Process all relations without primary keys, because they need to be joined differently and will all be on the same query level
  // 	for (
  // 		const {
  // 			tsKey: selectedRelationTsKey,
  // 			queryConfig: selectedRelationConfigValue,
  // 			relation,
  // 		} of initiallySelectedRelations
  // 	) {
  // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
  // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
  // 		const relationTableTsName = tableNamesMap[relationTableName]!;
  // 		const relationTable = schema[relationTableTsName]!;
  // 		if (relationTable.primaryKey.length > 0) {
  // 			continue;
  // 		}
  // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
  // 		const joinOn = and(
  // 			...normalizedRelation.fields.map((field, i) =>
  // 				eq(
  // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
  // 					aliasedTableColumn(field, tableAlias),
  // 				)
  // 			),
  // 		);
  // 		const builtRelation = this.buildRelationalQueryWithoutPK({
  // 			fullSchema,
  // 			schema,
  // 			tableNamesMap,
  // 			table: fullSchema[relationTableTsName] as PgTable,
  // 			tableConfig: schema[relationTableTsName]!,
  // 			queryConfig: selectedRelationConfigValue,
  // 			tableAlias: relationTableAlias,
  // 			joinOn,
  // 			nestedQueryRelation: relation,
  // 		});
  // 		const field = sql`${sql.identifier(relationTableAlias)}.${sql.identifier('data')}`.as(selectedRelationTsKey);
  // 		joins.push({
  // 			on: sql`true`,
  // 			table: new Subquery(builtRelation.sql as SQL, {}, relationTableAlias),
  // 			alias: relationTableAlias,
  // 			joinType: 'left',
  // 			lateral: true,
  // 		});
  // 		selectedRelations.push({
  // 			dbKey: selectedRelationTsKey,
  // 			tsKey: selectedRelationTsKey,
  // 			field,
  // 			relationTableTsKey: relationTableTsName,
  // 			isJson: true,
  // 			selection: builtRelation.selection,
  // 		});
  // 	}
  // 	const oneRelations = initiallySelectedRelations.filter((r): r is typeof r & { relation: One } =>
  // 		is(r.relation, One)
  // 	);
  // 	// Process all One relations with PKs, because they can all be joined on the same level
  // 	for (
  // 		const {
  // 			tsKey: selectedRelationTsKey,
  // 			queryConfig: selectedRelationConfigValue,
  // 			relation,
  // 		} of oneRelations
  // 	) {
  // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
  // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
  // 		const relationTableTsName = tableNamesMap[relationTableName]!;
  // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
  // 		const relationTable = schema[relationTableTsName]!;
  // 		if (relationTable.primaryKey.length === 0) {
  // 			continue;
  // 		}
  // 		const joinOn = and(
  // 			...normalizedRelation.fields.map((field, i) =>
  // 				eq(
  // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
  // 					aliasedTableColumn(field, tableAlias),
  // 				)
  // 			),
  // 		);
  // 		const builtRelation = this.buildRelationalQueryWithPK({
  // 			fullSchema,
  // 			schema,
  // 			tableNamesMap,
  // 			table: fullSchema[relationTableTsName] as PgTable,
  // 			tableConfig: schema[relationTableTsName]!,
  // 			queryConfig: selectedRelationConfigValue,
  // 			tableAlias: relationTableAlias,
  // 			joinOn,
  // 		});
  // 		const field = sql`case when ${sql.identifier(relationTableAlias)} is null then null else json_build_array(${
  // 			sql.join(
  // 				builtRelation.selection.map(({ field }) =>
  // 					is(field, SQL.Aliased)
  // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
  // 						: is(field, Column)
  // 						? aliasedTableColumn(field, relationTableAlias)
  // 						: field
  // 				),
  // 				sql`, `,
  // 			)
  // 		}) end`.as(selectedRelationTsKey);
  // 		const isLateralJoin = is(builtRelation.sql, SQL);
  // 		joins.push({
  // 			on: isLateralJoin ? sql`true` : joinOn,
  // 			table: is(builtRelation.sql, SQL)
  // 				? new Subquery(builtRelation.sql, {}, relationTableAlias)
  // 				: aliasedTable(builtRelation.sql, relationTableAlias),
  // 			alias: relationTableAlias,
  // 			joinType: 'left',
  // 			lateral: is(builtRelation.sql, SQL),
  // 		});
  // 		selectedRelations.push({
  // 			dbKey: selectedRelationTsKey,
  // 			tsKey: selectedRelationTsKey,
  // 			field,
  // 			relationTableTsKey: relationTableTsName,
  // 			isJson: true,
  // 			selection: builtRelation.selection,
  // 		});
  // 	}
  // 	let distinct: PgSelectConfig['distinct'];
  // 	let tableFrom: PgTable | Subquery = table;
  // 	// Process first Many relation - each one requires a nested subquery
  // 	const manyRelation = manyRelations[0];
  // 	if (manyRelation) {
  // 		const {
  // 			tsKey: selectedRelationTsKey,
  // 			queryConfig: selectedRelationQueryConfig,
  // 			relation,
  // 		} = manyRelation;
  // 		distinct = {
  // 			on: tableConfig.primaryKey.map((c) => aliasedTableColumn(c as PgColumn, tableAlias)),
  // 		};
  // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
  // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
  // 		const relationTableTsName = tableNamesMap[relationTableName]!;
  // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
  // 		const joinOn = and(
  // 			...normalizedRelation.fields.map((field, i) =>
  // 				eq(
  // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
  // 					aliasedTableColumn(field, tableAlias),
  // 				)
  // 			),
  // 		);
  // 		const builtRelationJoin = this.buildRelationalQueryWithPK({
  // 			fullSchema,
  // 			schema,
  // 			tableNamesMap,
  // 			table: fullSchema[relationTableTsName] as PgTable,
  // 			tableConfig: schema[relationTableTsName]!,
  // 			queryConfig: selectedRelationQueryConfig,
  // 			tableAlias: relationTableAlias,
  // 			joinOn,
  // 		});
  // 		const builtRelationSelectionField = sql`case when ${
  // 			sql.identifier(relationTableAlias)
  // 		} is null then '[]' else json_agg(json_build_array(${
  // 			sql.join(
  // 				builtRelationJoin.selection.map(({ field }) =>
  // 					is(field, SQL.Aliased)
  // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
  // 						: is(field, Column)
  // 						? aliasedTableColumn(field, relationTableAlias)
  // 						: field
  // 				),
  // 				sql`, `,
  // 			)
  // 		})) over (partition by ${sql.join(distinct.on, sql`, `)}) end`.as(selectedRelationTsKey);
  // 		const isLateralJoin = is(builtRelationJoin.sql, SQL);
  // 		joins.push({
  // 			on: isLateralJoin ? sql`true` : joinOn,
  // 			table: isLateralJoin
  // 				? new Subquery(builtRelationJoin.sql as SQL, {}, relationTableAlias)
  // 				: aliasedTable(builtRelationJoin.sql as PgTable, relationTableAlias),
  // 			alias: relationTableAlias,
  // 			joinType: 'left',
  // 			lateral: isLateralJoin,
  // 		});
  // 		// Build the "from" subquery with the remaining Many relations
  // 		const builtTableFrom = this.buildRelationalQueryWithPK({
  // 			fullSchema,
  // 			schema,
  // 			tableNamesMap,
  // 			table,
  // 			tableConfig,
  // 			queryConfig: {
  // 				...config,
  // 				where: undefined,
  // 				orderBy: undefined,
  // 				limit: undefined,
  // 				offset: undefined,
  // 				with: manyRelations.slice(1).reduce<NonNullable<typeof config['with']>>(
  // 					(result, { tsKey, queryConfig: configValue }) => {
  // 						result[tsKey] = configValue;
  // 						return result;
  // 					},
  // 					{},
  // 				),
  // 			},
  // 			tableAlias,
  // 		});
  // 		selectedRelations.push({
  // 			dbKey: selectedRelationTsKey,
  // 			tsKey: selectedRelationTsKey,
  // 			field: builtRelationSelectionField,
  // 			relationTableTsKey: relationTableTsName,
  // 			isJson: true,
  // 			selection: builtRelationJoin.selection,
  // 		});
  // 		// selection = builtTableFrom.selection.map((item) =>
  // 		// 	is(item.field, SQL.Aliased)
  // 		// 		? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
  // 		// 		: item
  // 		// );
  // 		// selectionForBuild = [{
  // 		// 	dbKey: '*',
  // 		// 	tsKey: '*',
  // 		// 	field: sql`${sql.identifier(tableAlias)}.*`,
  // 		// 	selection: [],
  // 		// 	isJson: false,
  // 		// 	relationTableTsKey: undefined,
  // 		// }];
  // 		// const newSelectionItem: (typeof selection)[number] = {
  // 		// 	dbKey: selectedRelationTsKey,
  // 		// 	tsKey: selectedRelationTsKey,
  // 		// 	field,
  // 		// 	relationTableTsKey: relationTableTsName,
  // 		// 	isJson: true,
  // 		// 	selection: builtRelationJoin.selection,
  // 		// };
  // 		// selection.push(newSelectionItem);
  // 		// selectionForBuild.push(newSelectionItem);
  // 		tableFrom = is(builtTableFrom.sql, PgTable)
  // 			? builtTableFrom.sql
  // 			: new Subquery(builtTableFrom.sql, {}, tableAlias);
  // 	}
  // 	if (selectedColumns.length === 0 && selectedRelations.length === 0 && selectedExtras.length === 0) {
  // 		throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")`);
  // 	}
  // 	let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'];
  // 	function prepareSelectedColumns() {
  // 		return selectedColumns.map((key) => ({
  // 			dbKey: tableConfig.columns[key]!.name,
  // 			tsKey: key,
  // 			field: tableConfig.columns[key] as PgColumn,
  // 			relationTableTsKey: undefined,
  // 			isJson: false,
  // 			selection: [],
  // 		}));
  // 	}
  // 	function prepareSelectedExtras() {
  // 		return selectedExtras.map((item) => ({
  // 			dbKey: item.value.fieldAlias,
  // 			tsKey: item.tsKey,
  // 			field: item.value,
  // 			relationTableTsKey: undefined,
  // 			isJson: false,
  // 			selection: [],
  // 		}));
  // 	}
  // 	if (isRoot) {
  // 		selection = [
  // 			...prepareSelectedColumns(),
  // 			...prepareSelectedExtras(),
  // 		];
  // 	}
  // 	if (hasUserDefinedWhere || orderBy.length > 0) {
  // 		tableFrom = new Subquery(
  // 			this.buildSelectQuery({
  // 				table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
  // 				fields: {},
  // 				fieldsFlat: selectionForBuild.map(({ field }) => ({
  // 					path: [],
  // 					field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
  // 				})),
  // 				joins,
  // 				distinct,
  // 			}),
  // 			{},
  // 			tableAlias,
  // 		);
  // 		selectionForBuild = selection.map((item) =>
  // 			is(item.field, SQL.Aliased)
  // 				? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
  // 				: item
  // 		);
  // 		joins = [];
  // 		distinct = undefined;
  // 	}
  // 	const result = this.buildSelectQuery({
  // 		table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
  // 		fields: {},
  // 		fieldsFlat: selectionForBuild.map(({ field }) => ({
  // 			path: [],
  // 			field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
  // 		})),
  // 		where,
  // 		limit,
  // 		offset,
  // 		joins,
  // 		orderBy,
  // 		distinct,
  // 	});
  // 	return {
  // 		tableTsKey: tableConfig.tsName,
  // 		sql: result,
  // 		selection,
  // 	};
  // }
  buildRelationalQueryWithoutPK({
    fullSchema,
    schema,
    tableNamesMap,
    table,
    tableConfig,
    queryConfig: config,
    tableAlias,
    nestedQueryRelation,
    joinOn
  }) {
    let selection = [];
    let limit, offset, orderBy = [], where;
    const joins = [];
    if (config === true) {
      const selectionEntries = Object.entries(tableConfig.columns);
      selection = selectionEntries.map(([key, value]) => ({
        dbKey: value.name,
        tsKey: key,
        field: aliasedTableColumn(value, tableAlias),
        relationTableTsKey: void 0,
        isJson: false,
        selection: []
      }));
    } else {
      const aliasedColumns = Object.fromEntries(
        Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)])
      );
      if (config.where) {
        const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
        where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
      }
      const fieldsSelection = [];
      let selectedColumns = [];
      if (config.columns) {
        let isIncludeMode = false;
        for (const [field, value] of Object.entries(config.columns)) {
          if (value === void 0) {
            continue;
          }
          if (field in tableConfig.columns) {
            if (!isIncludeMode && value === true) {
              isIncludeMode = true;
            }
            selectedColumns.push(field);
          }
        }
        if (selectedColumns.length > 0) {
          selectedColumns = isIncludeMode ? selectedColumns.filter((c2) => config.columns?.[c2] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
        }
      } else {
        selectedColumns = Object.keys(tableConfig.columns);
      }
      for (const field of selectedColumns) {
        const column = tableConfig.columns[field];
        fieldsSelection.push({ tsKey: field, value: column });
      }
      let selectedRelations = [];
      if (config.with) {
        selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig2]) => ({ tsKey, queryConfig: queryConfig2, relation: tableConfig.relations[tsKey] }));
      }
      let extras;
      if (config.extras) {
        extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql }) : config.extras;
        for (const [tsKey, value] of Object.entries(extras)) {
          fieldsSelection.push({
            tsKey,
            value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
          });
        }
      }
      for (const { tsKey, value } of fieldsSelection) {
        selection.push({
          dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
          tsKey,
          field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
          relationTableTsKey: void 0,
          isJson: false,
          selection: []
        });
      }
      let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
      if (!Array.isArray(orderByOrig)) {
        orderByOrig = [orderByOrig];
      }
      orderBy = orderByOrig.map((orderByValue) => {
        if (is(orderByValue, Column)) {
          return aliasedTableColumn(orderByValue, tableAlias);
        }
        return mapColumnsInSQLToAlias(orderByValue, tableAlias);
      });
      limit = config.limit;
      offset = config.offset;
      for (const {
        tsKey: selectedRelationTsKey,
        queryConfig: selectedRelationConfigValue,
        relation
      } of selectedRelations) {
        const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
        const relationTableName = getTableUniqueName(relation.referencedTable);
        const relationTableTsName = tableNamesMap[relationTableName];
        const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
        const joinOn2 = and(
          ...normalizedRelation.fields.map(
            (field2, i3) => eq(
              aliasedTableColumn(normalizedRelation.references[i3], relationTableAlias),
              aliasedTableColumn(field2, tableAlias)
            )
          )
        );
        const builtRelation = this.buildRelationalQueryWithoutPK({
          fullSchema,
          schema,
          tableNamesMap,
          table: fullSchema[relationTableTsName],
          tableConfig: schema[relationTableTsName],
          queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
          tableAlias: relationTableAlias,
          joinOn: joinOn2,
          nestedQueryRelation: relation
        });
        const field = sql`${sql.identifier(relationTableAlias)}.${sql.identifier("data")}`.as(selectedRelationTsKey);
        joins.push({
          on: sql`true`,
          table: new Subquery(builtRelation.sql, {}, relationTableAlias),
          alias: relationTableAlias,
          joinType: "left",
          lateral: true
        });
        selection.push({
          dbKey: selectedRelationTsKey,
          tsKey: selectedRelationTsKey,
          field,
          relationTableTsKey: relationTableTsName,
          isJson: true,
          selection: builtRelation.selection
        });
      }
    }
    if (selection.length === 0) {
      throw new DrizzleError({ message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")` });
    }
    let result;
    where = and(joinOn, where);
    if (nestedQueryRelation) {
      let field = sql`json_build_array(${sql.join(
        selection.map(
          ({ field: field2, tsKey, isJson }) => isJson ? sql`${sql.identifier(`${tableAlias}_${tsKey}`)}.${sql.identifier("data")}` : is(field2, SQL.Aliased) ? field2.sql : field2
        ),
        sql`, `
      )})`;
      if (is(nestedQueryRelation, Many)) {
        field = sql`coalesce(json_agg(${field}${orderBy.length > 0 ? sql` order by ${sql.join(orderBy, sql`, `)}` : void 0}), '[]'::json)`;
      }
      const nestedSelection = [{
        dbKey: "data",
        tsKey: "data",
        field: field.as("data"),
        isJson: true,
        relationTableTsKey: tableConfig.tsName,
        selection
      }];
      const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
      if (needsSubquery) {
        result = this.buildSelectQuery({
          table: aliasedTable(table, tableAlias),
          fields: {},
          fieldsFlat: [{
            path: [],
            field: sql.raw("*")
          }],
          where,
          limit,
          offset,
          orderBy,
          setOperators: []
        });
        where = void 0;
        limit = void 0;
        offset = void 0;
        orderBy = [];
      } else {
        result = aliasedTable(table, tableAlias);
      }
      result = this.buildSelectQuery({
        table: is(result, PgTable) ? result : new Subquery(result, {}, tableAlias),
        fields: {},
        fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
          path: [],
          field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    } else {
      result = this.buildSelectQuery({
        table: aliasedTable(table, tableAlias),
        fields: {},
        fieldsFlat: selection.map(({ field }) => ({
          path: [],
          field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    }
    return {
      tableTsKey: tableConfig.tsName,
      sql: result,
      selection
    };
  }
};

// node_modules/drizzle-orm/query-builders/query-builder.js
var TypedQueryBuilder = class {
  static {
    __name(this, "TypedQueryBuilder");
  }
  static [entityKind] = "TypedQueryBuilder";
  /** @internal */
  getSelectedFields() {
    return this._.selectedFields;
  }
};

// node_modules/drizzle-orm/pg-core/query-builders/select.js
var PgSelectBuilder = class {
  static {
    __name(this, "PgSelectBuilder");
  }
  static [entityKind] = "PgSelectBuilder";
  fields;
  session;
  dialect;
  withList = [];
  distinct;
  constructor(config) {
    this.fields = config.fields;
    this.session = config.session;
    this.dialect = config.dialect;
    if (config.withList) {
      this.withList = config.withList;
    }
    this.distinct = config.distinct;
  }
  authToken;
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  /**
   * Specify the table, subquery, or other target that you're
   * building a select query against.
   *
   * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FROM | Postgres from documentation}
   */
  from(source) {
    const isPartialSelect = !!this.fields;
    const src = source;
    let fields;
    if (this.fields) {
      fields = this.fields;
    } else if (is(src, Subquery)) {
      fields = Object.fromEntries(
        Object.keys(src._.selectedFields).map((key) => [key, src[key]])
      );
    } else if (is(src, PgViewBase)) {
      fields = src[ViewBaseConfig].selectedFields;
    } else if (is(src, SQL)) {
      fields = {};
    } else {
      fields = getTableColumns(src);
    }
    return new PgSelectBase({
      table: src,
      fields,
      isPartialSelect,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct
    }).setToken(this.authToken);
  }
};
var PgSelectQueryBuilderBase = class extends TypedQueryBuilder {
  static {
    __name(this, "PgSelectQueryBuilderBase");
  }
  static [entityKind] = "PgSelectQueryBuilder";
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
    super();
    this.config = {
      withList,
      table,
      fields: { ...fields },
      distinct,
      setOperators: []
    };
    this.isPartialSelect = isPartialSelect;
    this.session = session;
    this.dialect = dialect;
    this._ = {
      selectedFields: fields
    };
    this.tableName = getTableLikeName(table);
    this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
  }
  createJoin(joinType, lateral) {
    return (table, on) => {
      const baseTableName = this.tableName;
      const tableName = getTableLikeName(table);
      if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (!this.isPartialSelect) {
        if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
          this.config.fields = {
            [baseTableName]: this.config.fields
          };
        }
        if (typeof tableName === "string" && !is(table, SQL)) {
          const selection = is(table, Subquery) ? table._.selectedFields : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
          this.config.fields[tableName] = selection;
        }
      }
      if (typeof on === "function") {
        on = on(
          new Proxy(
            this.config.fields,
            new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          )
        );
      }
      if (!this.config.joins) {
        this.config.joins = [];
      }
      this.config.joins.push({ on, table, joinType, alias: tableName, lateral });
      if (typeof tableName === "string") {
        switch (joinType) {
          case "left": {
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
            );
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "cross":
          case "inner": {
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
            );
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
        }
      }
      return this;
    };
  }
  /**
   * Executes a `left join` operation by adding another table to the current query.
   *
   * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
   *   .from(users)
   *   .leftJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .leftJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */
  leftJoin = this.createJoin("left", false);
  /**
   * Executes a `left join lateral` operation by adding subquery to the current query.
   *
   * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
   *
   * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#left-join-lateral}
   *
   * @param table the subquery to join.
   * @param on the `on` clause.
   */
  leftJoinLateral = this.createJoin("left", true);
  /**
   * Executes a `right join` operation by adding another table to the current query.
   *
   * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .rightJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .rightJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */
  rightJoin = this.createJoin("right", false);
  /**
   * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
   *
   * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .innerJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .innerJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */
  innerJoin = this.createJoin("inner", false);
  /**
   * Executes an `inner join lateral` operation, creating a new table by combining rows from two queries that have matching values.
   *
   * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
   *
   * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join-lateral}
   *
   * @param table the subquery to join.
   * @param on the `on` clause.
   */
  innerJoinLateral = this.createJoin("inner", true);
  /**
   * Executes a `full join` operation by combining rows from two tables into a new table.
   *
   * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
   *   .from(users)
   *   .fullJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .fullJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */
  fullJoin = this.createJoin("full", false);
  /**
   * Executes a `cross join` operation by combining rows from two tables into a new table.
   *
   * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
   *
   * @param table the table to join.
   *
   * @example
   *
   * ```ts
   * // Select all users, each user with every pet
   * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .crossJoin(pets)
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .crossJoin(pets)
   * ```
   */
  crossJoin = this.createJoin("cross", false);
  /**
   * Executes a `cross join lateral` operation by combining rows from two queries into a new table.
   *
   * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
   *
   * Calling this method retrieves all rows from both main and joined queries, merging all rows from each query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join-lateral}
   *
   * @param table the query to join.
   */
  crossJoinLateral = this.createJoin("cross", true);
  createSetOperator(type, isAll) {
    return (rightSelection) => {
      const rightSelect = typeof rightSelection === "function" ? rightSelection(getPgSetOperators()) : rightSelection;
      if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
      }
      this.config.setOperators.push({ type, isAll, rightSelect });
      return this;
    };
  }
  /**
   * Adds `union` set operator to the query.
   *
   * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
   *
   * @example
   *
   * ```ts
   * // Select all unique names from customers and users tables
   * await db.select({ name: users.name })
   *   .from(users)
   *   .union(
   *     db.select({ name: customers.name }).from(customers)
   *   );
   * // or
   * import { union } from 'drizzle-orm/pg-core'
   *
   * await union(
   *   db.select({ name: users.name }).from(users),
   *   db.select({ name: customers.name }).from(customers)
   * );
   * ```
   */
  union = this.createSetOperator("union", false);
  /**
   * Adds `union all` set operator to the query.
   *
   * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
   *
   * @example
   *
   * ```ts
   * // Select all transaction ids from both online and in-store sales
   * await db.select({ transaction: onlineSales.transactionId })
   *   .from(onlineSales)
   *   .unionAll(
   *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
   *   );
   * // or
   * import { unionAll } from 'drizzle-orm/pg-core'
   *
   * await unionAll(
   *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
   *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
   * );
   * ```
   */
  unionAll = this.createSetOperator("union", true);
  /**
   * Adds `intersect` set operator to the query.
   *
   * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
   *
   * @example
   *
   * ```ts
   * // Select course names that are offered in both departments A and B
   * await db.select({ courseName: depA.courseName })
   *   .from(depA)
   *   .intersect(
   *     db.select({ courseName: depB.courseName }).from(depB)
   *   );
   * // or
   * import { intersect } from 'drizzle-orm/pg-core'
   *
   * await intersect(
   *   db.select({ courseName: depA.courseName }).from(depA),
   *   db.select({ courseName: depB.courseName }).from(depB)
   * );
   * ```
   */
  intersect = this.createSetOperator("intersect", false);
  /**
   * Adds `intersect all` set operator to the query.
   *
   * Calling this method will retain only the rows that are present in both result sets including all duplicates.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect-all}
   *
   * @example
   *
   * ```ts
   * // Select all products and quantities that are ordered by both regular and VIP customers
   * await db.select({
   *   productId: regularCustomerOrders.productId,
   *   quantityOrdered: regularCustomerOrders.quantityOrdered
   * })
   * .from(regularCustomerOrders)
   * .intersectAll(
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * // or
   * import { intersectAll } from 'drizzle-orm/pg-core'
   *
   * await intersectAll(
   *   db.select({
   *     productId: regularCustomerOrders.productId,
   *     quantityOrdered: regularCustomerOrders.quantityOrdered
   *   })
   *   .from(regularCustomerOrders),
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * ```
   */
  intersectAll = this.createSetOperator("intersect", true);
  /**
   * Adds `except` set operator to the query.
   *
   * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
   *
   * @example
   *
   * ```ts
   * // Select all courses offered in department A but not in department B
   * await db.select({ courseName: depA.courseName })
   *   .from(depA)
   *   .except(
   *     db.select({ courseName: depB.courseName }).from(depB)
   *   );
   * // or
   * import { except } from 'drizzle-orm/pg-core'
   *
   * await except(
   *   db.select({ courseName: depA.courseName }).from(depA),
   *   db.select({ courseName: depB.courseName }).from(depB)
   * );
   * ```
   */
  except = this.createSetOperator("except", false);
  /**
   * Adds `except all` set operator to the query.
   *
   * Calling this method will retrieve all rows from the left query, except for the rows that are present in the result set of the right query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#except-all}
   *
   * @example
   *
   * ```ts
   * // Select all products that are ordered by regular customers but not by VIP customers
   * await db.select({
   *   productId: regularCustomerOrders.productId,
   *   quantityOrdered: regularCustomerOrders.quantityOrdered,
   * })
   * .from(regularCustomerOrders)
   * .exceptAll(
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered,
   *   })
   *   .from(vipCustomerOrders)
   * );
   * // or
   * import { exceptAll } from 'drizzle-orm/pg-core'
   *
   * await exceptAll(
   *   db.select({
   *     productId: regularCustomerOrders.productId,
   *     quantityOrdered: regularCustomerOrders.quantityOrdered
   *   })
   *   .from(regularCustomerOrders),
   *   db.select({
   *     productId: vipCustomerOrders.productId,
   *     quantityOrdered: vipCustomerOrders.quantityOrdered
   *   })
   *   .from(vipCustomerOrders)
   * );
   * ```
   */
  exceptAll = this.createSetOperator("except", true);
  /** @internal */
  addSetOperators(setOperators) {
    this.config.setOperators.push(...setOperators);
    return this;
  }
  /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be selected.
   *
   * ```ts
   * // Select all cars with green color
   * await db.select().from(cars).where(eq(cars.color, 'green'));
   * // or
   * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Select all BMW cars with a green color
   * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Select all cars with the green or blue color
   * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(where) {
    if (typeof where === "function") {
      where = where(
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
        )
      );
    }
    this.config.where = where;
    return this;
  }
  /**
   * Adds a `having` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
   *
   * @param having the `having` clause.
   *
   * @example
   *
   * ```ts
   * // Select all brands with more than one car
   * await db.select({
   * 	brand: cars.brand,
   * 	count: sql<number>`cast(count(${cars.id}) as int)`,
   * })
   *   .from(cars)
   *   .groupBy(cars.brand)
   *   .having(({ count }) => gt(count, 1));
   * ```
   */
  having(having) {
    if (typeof having === "function") {
      having = having(
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
        )
      );
    }
    this.config.having = having;
    return this;
  }
  groupBy(...columns) {
    if (typeof columns[0] === "function") {
      const groupBy = columns[0](
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
        )
      );
      this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
    } else {
      this.config.groupBy = columns;
    }
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === "function") {
      const orderBy = columns[0](
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
        )
      );
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    } else {
      const orderByArray = columns;
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    }
    return this;
  }
  /**
   * Adds a `limit` clause to the query.
   *
   * Calling this method will set the maximum number of rows that will be returned by this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param limit the `limit` clause.
   *
   * @example
   *
   * ```ts
   * // Get the first 10 people from this query.
   * await db.select().from(people).limit(10);
   * ```
   */
  limit(limit) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).limit = limit;
    } else {
      this.config.limit = limit;
    }
    return this;
  }
  /**
   * Adds an `offset` clause to the query.
   *
   * Calling this method will skip a number of rows when returning results from this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param offset the `offset` clause.
   *
   * @example
   *
   * ```ts
   * // Get the 10th-20th people from this query.
   * await db.select().from(people).offset(10).limit(10);
   * ```
   */
  offset(offset) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).offset = offset;
    } else {
      this.config.offset = offset;
    }
    return this;
  }
  /**
   * Adds a `for` clause to the query.
   *
   * Calling this method will specify a lock strength for this query that controls how strictly it acquires exclusive access to the rows being queried.
   *
   * See docs: {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE}
   *
   * @param strength the lock strength.
   * @param config the lock configuration.
   */
  for(strength, config = {}) {
    this.config.lockingClause = { strength, config };
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  as(alias) {
    return new Proxy(
      new Subquery(this.getSQL(), this.config.fields, alias),
      new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    );
  }
  /** @internal */
  getSelectedFields() {
    return new Proxy(
      this.config.fields,
      new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
    );
  }
  $dynamic() {
    return this;
  }
};
var PgSelectBase = class extends PgSelectQueryBuilderBase {
  static {
    __name(this, "PgSelectBase");
  }
  static [entityKind] = "PgSelect";
  /** @internal */
  _prepare(name18) {
    const { session, config, dialect, joinsNotNullableMap, authToken } = this;
    if (!session) {
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    }
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      const fieldsList = orderSelectedFields(config.fields);
      const query = session.prepareQuery(dialect.sqlToQuery(this.getSQL()), fieldsList, name18, true);
      query.joinsNotNullableMap = joinsNotNullableMap;
      return query.setToken(authToken);
    });
  }
  /**
   * Create a prepared statement for this query. This allows
   * the database to remember this query for the given session
   * and call it by name, rather than specifying the full query.
   *
   * {@link https://www.postgresql.org/docs/current/sql-prepare.html | Postgres prepare documentation}
   */
  prepare(name18) {
    return this._prepare(name18);
  }
  authToken;
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  execute = /* @__PURE__ */ __name((placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues, this.authToken);
    });
  }, "execute");
};
applyMixins(PgSelectBase, [QueryPromise]);
function createSetOperator(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) {
      if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
}
__name(createSetOperator, "createSetOperator");
var getPgSetOperators = /* @__PURE__ */ __name(() => ({
  union,
  unionAll,
  intersect,
  intersectAll,
  except,
  exceptAll
}), "getPgSetOperators");
var union = createSetOperator("union", false);
var unionAll = createSetOperator("union", true);
var intersect = createSetOperator("intersect", false);
var intersectAll = createSetOperator("intersect", true);
var except = createSetOperator("except", false);
var exceptAll = createSetOperator("except", true);

// node_modules/drizzle-orm/pg-core/query-builders/query-builder.js
var QueryBuilder = class {
  static {
    __name(this, "QueryBuilder");
  }
  static [entityKind] = "PgQueryBuilder";
  dialect;
  dialectConfig;
  constructor(dialect) {
    this.dialect = is(dialect, PgDialect) ? dialect : void 0;
    this.dialectConfig = is(dialect, PgDialect) ? void 0 : dialect;
  }
  $with = /* @__PURE__ */ __name((alias, selection) => {
    const queryBuilder = this;
    const as2 = /* @__PURE__ */ __name((qb) => {
      if (typeof qb === "function") {
        qb = qb(queryBuilder);
      }
      return new Proxy(
        new WithSubquery(
          qb.getSQL(),
          selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
          alias,
          true
        ),
        new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
      );
    }, "as");
    return { as: as2 };
  }, "$with");
  with(...queries) {
    const self2 = this;
    function select(fields) {
      return new PgSelectBuilder({
        fields: fields ?? void 0,
        session: void 0,
        dialect: self2.getDialect(),
        withList: queries
      });
    }
    __name(select, "select");
    function selectDistinct(fields) {
      return new PgSelectBuilder({
        fields: fields ?? void 0,
        session: void 0,
        dialect: self2.getDialect(),
        distinct: true
      });
    }
    __name(selectDistinct, "selectDistinct");
    function selectDistinctOn(on, fields) {
      return new PgSelectBuilder({
        fields: fields ?? void 0,
        session: void 0,
        dialect: self2.getDialect(),
        distinct: { on }
      });
    }
    __name(selectDistinctOn, "selectDistinctOn");
    return { select, selectDistinct, selectDistinctOn };
  }
  select(fields) {
    return new PgSelectBuilder({
      fields: fields ?? void 0,
      session: void 0,
      dialect: this.getDialect()
    });
  }
  selectDistinct(fields) {
    return new PgSelectBuilder({
      fields: fields ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: true
    });
  }
  selectDistinctOn(on, fields) {
    return new PgSelectBuilder({
      fields: fields ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: { on }
    });
  }
  // Lazy load dialect to avoid circular dependency
  getDialect() {
    if (!this.dialect) {
      this.dialect = new PgDialect(this.dialectConfig);
    }
    return this.dialect;
  }
};

// node_modules/drizzle-orm/pg-core/query-builders/insert.js
var PgInsertBuilder = class {
  static {
    __name(this, "PgInsertBuilder");
  }
  constructor(table, session, dialect, withList, overridingSystemValue_) {
    this.table = table;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
    this.overridingSystemValue_ = overridingSystemValue_;
  }
  static [entityKind] = "PgInsertBuilder";
  authToken;
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  overridingSystemValue() {
    this.overridingSystemValue_ = true;
    return this;
  }
  values(values) {
    values = Array.isArray(values) ? values : [values];
    if (values.length === 0) {
      throw new Error("values() must be called with at least one value");
    }
    const mappedValues = values.map((entry) => {
      const result = {};
      const cols = this.table[Table.Symbol.Columns];
      for (const colKey of Object.keys(entry)) {
        const colValue = entry[colKey];
        result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
      }
      return result;
    });
    return new PgInsertBase(
      this.table,
      mappedValues,
      this.session,
      this.dialect,
      this.withList,
      false,
      this.overridingSystemValue_
    ).setToken(this.authToken);
  }
  select(selectQuery) {
    const select = typeof selectQuery === "function" ? selectQuery(new QueryBuilder()) : selectQuery;
    if (!is(select, SQL) && !haveSameKeys(this.table[Columns], select._.selectedFields)) {
      throw new Error(
        "Insert select error: selected fields are not the same or are in a different order compared to the table definition"
      );
    }
    return new PgInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
  }
};
var PgInsertBase = class extends QueryPromise {
  static {
    __name(this, "PgInsertBase");
  }
  constructor(table, values, session, dialect, withList, select, overridingSystemValue_) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { table, values, withList, select, overridingSystemValue_ };
  }
  static [entityKind] = "PgInsert";
  config;
  returning(fields = this.config.table[Table.Symbol.Columns]) {
    this.config.returningFields = fields;
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /**
   * Adds an `on conflict do nothing` clause to the query.
   *
   * Calling this method simply avoids inserting a row as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
   *
   * @param config The `target` and `where` clauses.
   *
   * @example
   * ```ts
   * // Insert one row and cancel the insert if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing();
   *
   * // Explicitly specify conflict target
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing({ target: cars.id });
   * ```
   */
  onConflictDoNothing(config = {}) {
    if (config.target === void 0) {
      this.config.onConflict = sql`do nothing`;
    } else {
      let targetColumn = "";
      targetColumn = Array.isArray(config.target) ? config.target.map((it2) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(it2))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(config.target));
      const whereSql = config.where ? sql` where ${config.where}` : void 0;
      this.config.onConflict = sql`(${sql.raw(targetColumn)})${whereSql} do nothing`;
    }
    return this;
  }
  /**
   * Adds an `on conflict do update` clause to the query.
   *
   * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
   *
   * @param config The `target`, `set` and `where` clauses.
   *
   * @example
   * ```ts
   * // Update the row if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'Porsche' }
   *   });
   *
   * // Upsert with 'where' clause
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'newBMW' },
   *     targetWhere: sql`${cars.createdAt} > '2023-01-01'::date`,
   *   });
   * ```
   */
  onConflictDoUpdate(config) {
    if (config.where && (config.targetWhere || config.setWhere)) {
      throw new Error(
        'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.'
      );
    }
    const whereSql = config.where ? sql` where ${config.where}` : void 0;
    const targetWhereSql = config.targetWhere ? sql` where ${config.targetWhere}` : void 0;
    const setWhereSql = config.setWhere ? sql` where ${config.setWhere}` : void 0;
    const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
    let targetColumn = "";
    targetColumn = Array.isArray(config.target) ? config.target.map((it2) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(it2))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(config.target));
    this.config.onConflict = sql`(${sql.raw(targetColumn)})${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`;
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(name18) {
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name18, true);
    });
  }
  prepare(name18) {
    return this._prepare(name18);
  }
  authToken;
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  execute = /* @__PURE__ */ __name((placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues, this.authToken);
    });
  }, "execute");
  /** @internal */
  getSelectedFields() {
    return this.config.returningFields ? new Proxy(
      this.config.returningFields,
      new SelectionProxyHandler({
        alias: getTableName(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
};

// node_modules/drizzle-orm/pg-core/query-builders/refresh-materialized-view.js
var PgRefreshMaterializedView = class extends QueryPromise {
  static {
    __name(this, "PgRefreshMaterializedView");
  }
  constructor(view, session, dialect) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { view };
  }
  static [entityKind] = "PgRefreshMaterializedView";
  config;
  concurrently() {
    if (this.config.withNoData !== void 0) {
      throw new Error("Cannot use concurrently and withNoData together");
    }
    this.config.concurrently = true;
    return this;
  }
  withNoData() {
    if (this.config.concurrently !== void 0) {
      throw new Error("Cannot use concurrently and withNoData together");
    }
    this.config.withNoData = true;
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildRefreshMaterializedViewQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(name18) {
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0, name18, true);
    });
  }
  prepare(name18) {
    return this._prepare(name18);
  }
  authToken;
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  execute = /* @__PURE__ */ __name((placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues, this.authToken);
    });
  }, "execute");
};

// node_modules/drizzle-orm/pg-core/query-builders/update.js
var PgUpdateBuilder = class {
  static {
    __name(this, "PgUpdateBuilder");
  }
  constructor(table, session, dialect, withList) {
    this.table = table;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  static [entityKind] = "PgUpdateBuilder";
  authToken;
  setToken(token) {
    this.authToken = token;
    return this;
  }
  set(values) {
    return new PgUpdateBase(
      this.table,
      mapUpdateSet(this.table, values),
      this.session,
      this.dialect,
      this.withList
    ).setToken(this.authToken);
  }
};
var PgUpdateBase = class extends QueryPromise {
  static {
    __name(this, "PgUpdateBase");
  }
  constructor(table, set, session, dialect, withList) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { set, table, withList, joins: [] };
    this.tableName = getTableLikeName(table);
    this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
  }
  static [entityKind] = "PgUpdate";
  config;
  tableName;
  joinsNotNullableMap;
  from(source) {
    const src = source;
    const tableName = getTableLikeName(src);
    if (typeof tableName === "string") {
      this.joinsNotNullableMap[tableName] = true;
    }
    this.config.from = src;
    return this;
  }
  getTableLikeFields(table) {
    if (is(table, PgTable)) {
      return table[Table.Symbol.Columns];
    } else if (is(table, Subquery)) {
      return table._.selectedFields;
    }
    return table[ViewBaseConfig].selectedFields;
  }
  createJoin(joinType) {
    return (table, on) => {
      const tableName = getTableLikeName(table);
      if (typeof tableName === "string" && this.config.joins.some((join) => join.alias === tableName)) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (typeof on === "function") {
        const from = this.config.from && !is(this.config.from, SQL) ? this.getTableLikeFields(this.config.from) : void 0;
        on = on(
          new Proxy(
            this.config.table[Table.Symbol.Columns],
            new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          ),
          from && new Proxy(
            from,
            new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
          )
        );
      }
      this.config.joins.push({ on, table, joinType, alias: tableName });
      if (typeof tableName === "string") {
        switch (joinType) {
          case "left": {
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
            );
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "inner": {
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
            );
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
        }
      }
      return this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  /**
   * Adds a 'where' clause to the query.
   *
   * Calling this method will update only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param where the 'where' clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be updated.
   *
   * ```ts
   * // Update all cars with green color
   * await db.update(cars).set({ color: 'red' })
   *   .where(eq(cars.color, 'green'));
   * // or
   * await db.update(cars).set({ color: 'red' })
   *   .where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Update all BMW cars with a green color
   * await db.update(cars).set({ color: 'red' })
   *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Update all cars with the green or blue color
   * await db.update(cars).set({ color: 'red' })
   *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(where) {
    this.config.where = where;
    return this;
  }
  returning(fields) {
    if (!fields) {
      fields = Object.assign({}, this.config.table[Table.Symbol.Columns]);
      if (this.config.from) {
        const tableName = getTableLikeName(this.config.from);
        if (typeof tableName === "string" && this.config.from && !is(this.config.from, SQL)) {
          const fromFields = this.getTableLikeFields(this.config.from);
          fields[tableName] = fromFields;
        }
        for (const join of this.config.joins) {
          const tableName2 = getTableLikeName(join.table);
          if (typeof tableName2 === "string" && !is(join.table, SQL)) {
            const fromFields = this.getTableLikeFields(join.table);
            fields[tableName2] = fromFields;
          }
        }
      }
    }
    this.config.returningFields = fields;
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(name18) {
    const query = this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name18, true);
    query.joinsNotNullableMap = this.joinsNotNullableMap;
    return query;
  }
  prepare(name18) {
    return this._prepare(name18);
  }
  authToken;
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  execute = /* @__PURE__ */ __name((placeholderValues) => {
    return this._prepare().execute(placeholderValues, this.authToken);
  }, "execute");
  /** @internal */
  getSelectedFields() {
    return this.config.returningFields ? new Proxy(
      this.config.returningFields,
      new SelectionProxyHandler({
        alias: getTableName(this.config.table),
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      })
    ) : void 0;
  }
  $dynamic() {
    return this;
  }
};

// node_modules/drizzle-orm/pg-core/query-builders/count.js
var PgCountBuilder = class _PgCountBuilder extends SQL {
  static {
    __name(this, "PgCountBuilder");
  }
  constructor(params) {
    super(_PgCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
    this.params = params;
    this.mapWith(Number);
    this.session = params.session;
    this.sql = _PgCountBuilder.buildCount(
      params.source,
      params.filters
    );
  }
  sql;
  token;
  static [entityKind] = "PgCountBuilder";
  [Symbol.toStringTag] = "PgCountBuilder";
  session;
  static buildEmbeddedCount(source, filters) {
    return sql`(select count(*) from ${source}${sql.raw(" where ").if(filters)}${filters})`;
  }
  static buildCount(source, filters) {
    return sql`select count(*) as count from ${source}${sql.raw(" where ").if(filters)}${filters};`;
  }
  /** @intrnal */
  setToken(token) {
    this.token = token;
    return this;
  }
  then(onfulfilled, onrejected) {
    return Promise.resolve(this.session.count(this.sql, this.token)).then(
      onfulfilled,
      onrejected
    );
  }
  catch(onRejected) {
    return this.then(void 0, onRejected);
  }
  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally?.();
        return value;
      },
      (reason) => {
        onFinally?.();
        throw reason;
      }
    );
  }
};

// node_modules/drizzle-orm/pg-core/query-builders/query.js
var RelationalQueryBuilder = class {
  static {
    __name(this, "RelationalQueryBuilder");
  }
  constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
  }
  static [entityKind] = "PgRelationalQueryBuilder";
  findMany(config) {
    return new PgRelationalQuery(
      this.fullSchema,
      this.schema,
      this.tableNamesMap,
      this.table,
      this.tableConfig,
      this.dialect,
      this.session,
      config ? config : {},
      "many"
    );
  }
  findFirst(config) {
    return new PgRelationalQuery(
      this.fullSchema,
      this.schema,
      this.tableNamesMap,
      this.table,
      this.tableConfig,
      this.dialect,
      this.session,
      config ? { ...config, limit: 1 } : { limit: 1 },
      "first"
    );
  }
};
var PgRelationalQuery = class extends QueryPromise {
  static {
    __name(this, "PgRelationalQuery");
  }
  constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
    super();
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
    this.config = config;
    this.mode = mode;
  }
  static [entityKind] = "PgRelationalQuery";
  /** @internal */
  _prepare(name18) {
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      const { query, builtQuery } = this._toSQL();
      return this.session.prepareQuery(
        builtQuery,
        void 0,
        name18,
        true,
        (rawRows, mapColumnValue) => {
          const rows = rawRows.map(
            (row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue)
          );
          if (this.mode === "first") {
            return rows[0];
          }
          return rows;
        }
      );
    });
  }
  prepare(name18) {
    return this._prepare(name18);
  }
  _getQuery() {
    return this.dialect.buildRelationalQueryWithoutPK({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    });
  }
  /** @internal */
  getSQL() {
    return this._getQuery().sql;
  }
  _toSQL() {
    const query = this._getQuery();
    const builtQuery = this.dialect.sqlToQuery(query.sql);
    return { query, builtQuery };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  authToken;
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  execute() {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(void 0, this.authToken);
    });
  }
};

// node_modules/drizzle-orm/pg-core/query-builders/raw.js
var PgRaw = class extends QueryPromise {
  static {
    __name(this, "PgRaw");
  }
  constructor(execute, sql2, query, mapBatchResult) {
    super();
    this.execute = execute;
    this.sql = sql2;
    this.query = query;
    this.mapBatchResult = mapBatchResult;
  }
  static [entityKind] = "PgRaw";
  /** @internal */
  getSQL() {
    return this.sql;
  }
  getQuery() {
    return this.query;
  }
  mapResult(result, isFromBatch) {
    return isFromBatch ? this.mapBatchResult(result) : result;
  }
  _prepare() {
    return this;
  }
  /** @internal */
  isResponseInArrayMode() {
    return false;
  }
};

// node_modules/drizzle-orm/pg-core/db.js
var PgDatabase = class {
  static {
    __name(this, "PgDatabase");
  }
  constructor(dialect, session, schema) {
    this.dialect = dialect;
    this.session = session;
    this._ = schema ? {
      schema: schema.schema,
      fullSchema: schema.fullSchema,
      tableNamesMap: schema.tableNamesMap,
      session
    } : {
      schema: void 0,
      fullSchema: {},
      tableNamesMap: {},
      session
    };
    this.query = {};
    if (this._.schema) {
      for (const [tableName, columns] of Object.entries(this._.schema)) {
        this.query[tableName] = new RelationalQueryBuilder(
          schema.fullSchema,
          this._.schema,
          this._.tableNamesMap,
          schema.fullSchema[tableName],
          columns,
          dialect,
          session
        );
      }
    }
  }
  static [entityKind] = "PgDatabase";
  query;
  /**
   * Creates a subquery that defines a temporary named result set as a CTE.
   *
   * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param alias The alias for the subquery.
   *
   * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
   *
   * @example
   *
   * ```ts
   * // Create a subquery with alias 'sq' and use it in the select query
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * const result = await db.with(sq).select().from(sq);
   * ```
   *
   * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
   *
   * ```ts
   * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
   * const sq = db.$with('sq').as(db.select({
   *   name: sql<string>`upper(${users.name})`.as('name'),
   * })
   * .from(users));
   *
   * const result = await db.with(sq).select({ name: sq.name }).from(sq);
   * ```
   */
  $with = /* @__PURE__ */ __name((alias, selection) => {
    const self2 = this;
    const as2 = /* @__PURE__ */ __name((qb) => {
      if (typeof qb === "function") {
        qb = qb(new QueryBuilder(self2.dialect));
      }
      return new Proxy(
        new WithSubquery(
          qb.getSQL(),
          selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
          alias,
          true
        ),
        new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
      );
    }, "as");
    return { as: as2 };
  }, "$with");
  $count(source, filters) {
    return new PgCountBuilder({ source, filters, session: this.session });
  }
  /**
   * Incorporates a previously defined CTE (using `$with`) into the main query.
   *
   * This method allows the main query to reference a temporary named result set.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param queries The CTEs to incorporate into the main query.
   *
   * @example
   *
   * ```ts
   * // Define a subquery 'sq' as a CTE using $with
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * // Incorporate the CTE 'sq' into the main query and select from it
   * const result = await db.with(sq).select().from(sq);
   * ```
   */
  with(...queries) {
    const self2 = this;
    function select(fields) {
      return new PgSelectBuilder({
        fields: fields ?? void 0,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries
      });
    }
    __name(select, "select");
    function selectDistinct(fields) {
      return new PgSelectBuilder({
        fields: fields ?? void 0,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries,
        distinct: true
      });
    }
    __name(selectDistinct, "selectDistinct");
    function selectDistinctOn(on, fields) {
      return new PgSelectBuilder({
        fields: fields ?? void 0,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries,
        distinct: { on }
      });
    }
    __name(selectDistinctOn, "selectDistinctOn");
    function update(table) {
      return new PgUpdateBuilder(table, self2.session, self2.dialect, queries);
    }
    __name(update, "update");
    function insert(table) {
      return new PgInsertBuilder(table, self2.session, self2.dialect, queries);
    }
    __name(insert, "insert");
    function delete_(table) {
      return new PgDeleteBase(table, self2.session, self2.dialect, queries);
    }
    __name(delete_, "delete_");
    return { select, selectDistinct, selectDistinctOn, update, insert, delete: delete_ };
  }
  select(fields) {
    return new PgSelectBuilder({
      fields: fields ?? void 0,
      session: this.session,
      dialect: this.dialect
    });
  }
  selectDistinct(fields) {
    return new PgSelectBuilder({
      fields: fields ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: true
    });
  }
  selectDistinctOn(on, fields) {
    return new PgSelectBuilder({
      fields: fields ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: { on }
    });
  }
  /**
   * Creates an update query.
   *
   * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
   *
   * Use `.set()` method to specify which values to update.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param table The table to update.
   *
   * @example
   *
   * ```ts
   * // Update all rows in the 'cars' table
   * await db.update(cars).set({ color: 'red' });
   *
   * // Update rows with filters and conditions
   * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
   *
   * // Update with returning clause
   * const updatedCar: Car[] = await db.update(cars)
   *   .set({ color: 'red' })
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  update(table) {
    return new PgUpdateBuilder(table, this.session, this.dialect);
  }
  /**
   * Creates an insert query.
   *
   * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert}
   *
   * @param table The table to insert into.
   *
   * @example
   *
   * ```ts
   * // Insert one row
   * await db.insert(cars).values({ brand: 'BMW' });
   *
   * // Insert multiple rows
   * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
   *
   * // Insert with returning clause
   * const insertedCar: Car[] = await db.insert(cars)
   *   .values({ brand: 'BMW' })
   *   .returning();
   * ```
   */
  insert(table) {
    return new PgInsertBuilder(table, this.session, this.dialect);
  }
  /**
   * Creates a delete query.
   *
   * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param table The table to delete from.
   *
   * @example
   *
   * ```ts
   * // Delete all rows in the 'cars' table
   * await db.delete(cars);
   *
   * // Delete rows with filters and conditions
   * await db.delete(cars).where(eq(cars.color, 'green'));
   *
   * // Delete with returning clause
   * const deletedCar: Car[] = await db.delete(cars)
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  delete(table) {
    return new PgDeleteBase(table, this.session, this.dialect);
  }
  refreshMaterializedView(view) {
    return new PgRefreshMaterializedView(view, this.session, this.dialect);
  }
  authToken;
  execute(query) {
    const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
    const builtQuery = this.dialect.sqlToQuery(sequel);
    const prepared = this.session.prepareQuery(
      builtQuery,
      void 0,
      void 0,
      false
    );
    return new PgRaw(
      () => prepared.execute(void 0, this.authToken),
      sequel,
      builtQuery,
      (result) => prepared.mapResult(result, true)
    );
  }
  transaction(transaction, config) {
    return this.session.transaction(transaction, config);
  }
};

// node_modules/drizzle-orm/pg-core/session.js
var PgPreparedQuery = class {
  static {
    __name(this, "PgPreparedQuery");
  }
  constructor(query) {
    this.query = query;
  }
  authToken;
  getQuery() {
    return this.query;
  }
  mapResult(response, _isFromBatch) {
    return response;
  }
  /** @internal */
  setToken(token) {
    this.authToken = token;
    return this;
  }
  static [entityKind] = "PgPreparedQuery";
  /** @internal */
  joinsNotNullableMap;
};
var PgSession = class {
  static {
    __name(this, "PgSession");
  }
  constructor(dialect) {
    this.dialect = dialect;
  }
  static [entityKind] = "PgSession";
  /** @internal */
  execute(query, token) {
    return tracer.startActiveSpan("drizzle.operation", () => {
      const prepared = tracer.startActiveSpan("drizzle.prepareQuery", () => {
        return this.prepareQuery(
          this.dialect.sqlToQuery(query),
          void 0,
          void 0,
          false
        );
      });
      return prepared.setToken(token).execute(void 0, token);
    });
  }
  all(query) {
    return this.prepareQuery(
      this.dialect.sqlToQuery(query),
      void 0,
      void 0,
      false
    ).all();
  }
  /** @internal */
  async count(sql2, token) {
    const res = await this.execute(sql2, token);
    return Number(
      res[0]["count"]
    );
  }
};
var PgTransaction = class extends PgDatabase {
  static {
    __name(this, "PgTransaction");
  }
  constructor(dialect, session, schema, nestedIndex = 0) {
    super(dialect, session, schema);
    this.schema = schema;
    this.nestedIndex = nestedIndex;
  }
  static [entityKind] = "PgTransaction";
  rollback() {
    throw new TransactionRollbackError();
  }
  /** @internal */
  getTransactionConfigSQL(config) {
    const chunks = [];
    if (config.isolationLevel) {
      chunks.push(`isolation level ${config.isolationLevel}`);
    }
    if (config.accessMode) {
      chunks.push(config.accessMode);
    }
    if (typeof config.deferrable === "boolean") {
      chunks.push(config.deferrable ? "deferrable" : "not deferrable");
    }
    return sql.raw(chunks.join(" "));
  }
  setTransaction(config) {
    return this.session.execute(sql`set transaction ${this.getTransactionConfigSQL(config)}`);
  }
};

// node_modules/@neondatabase/serverless/index.mjs
var So = Object.create;
var Ie = Object.defineProperty;
var Eo = Object.getOwnPropertyDescriptor;
var Ao = Object.getOwnPropertyNames;
var Co = Object.getPrototypeOf;
var _o = Object.prototype.hasOwnProperty;
var Io = /* @__PURE__ */ __name((r2, e3, t) => e3 in r2 ? Ie(r2, e3, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e3] = t, "Io");
var a = /* @__PURE__ */ __name((r2, e3) => Ie(r2, "name", { value: e3, configurable: true }), "a");
var G = /* @__PURE__ */ __name((r2, e3) => () => (r2 && (e3 = r2(r2 = 0)), e3), "G");
var T = /* @__PURE__ */ __name((r2, e3) => () => (e3 || r2((e3 = { exports: {} }).exports, e3), e3.exports), "T");
var ie = /* @__PURE__ */ __name((r2, e3) => {
  for (var t in e3) Ie(r2, t, {
    get: e3[t],
    enumerable: true
  });
}, "ie");
var Dn = /* @__PURE__ */ __name((r2, e3, t, n2) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function") for (let i3 of Ao(e3)) !_o.call(r2, i3) && i3 !== t && Ie(r2, i3, { get: /* @__PURE__ */ __name(() => e3[i3], "get"), enumerable: !(n2 = Eo(e3, i3)) || n2.enumerable });
  return r2;
}, "Dn");
var Se = /* @__PURE__ */ __name((r2, e3, t) => (t = r2 != null ? So(Co(r2)) : {}, Dn(e3 || !r2 || !r2.__esModule ? Ie(t, "default", { value: r2, enumerable: true }) : t, r2)), "Se");
var O = /* @__PURE__ */ __name((r2) => Dn(Ie({}, "__esModule", { value: true }), r2), "O");
var E = /* @__PURE__ */ __name((r2, e3, t) => Io(r2, typeof e3 != "symbol" ? e3 + "" : e3, t), "E");
var Qn = T((lt2) => {
  "use strict";
  p();
  lt2.byteLength = Po;
  lt2.toByteArray = Ro;
  lt2.fromByteArray = ko;
  var ae = [], te = [], To = typeof Uint8Array < "u" ? Uint8Array : Array, qt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Ee = 0, On = qt.length; Ee < On; ++Ee) ae[Ee] = qt[Ee], te[qt.charCodeAt(Ee)] = Ee;
  var Ee, On;
  te[45] = 62;
  te[95] = 63;
  function qn(r2) {
    var e3 = r2.length;
    if (e3 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var t = r2.indexOf("=");
    t === -1 && (t = e3);
    var n2 = t === e3 ? 0 : 4 - t % 4;
    return [t, n2];
  }
  __name(qn, "qn");
  a(qn, "getLens");
  function Po(r2) {
    var e3 = qn(r2), t = e3[0], n2 = e3[1];
    return (t + n2) * 3 / 4 - n2;
  }
  __name(Po, "Po");
  a(Po, "byteLength");
  function Bo(r2, e3, t) {
    return (e3 + t) * 3 / 4 - t;
  }
  __name(Bo, "Bo");
  a(Bo, "_byteLength");
  function Ro(r2) {
    var e3, t = qn(r2), n2 = t[0], i3 = t[1], s3 = new To(Bo(r2, n2, i3)), o2 = 0, u2 = i3 > 0 ? n2 - 4 : n2, c2;
    for (c2 = 0; c2 < u2; c2 += 4) e3 = te[r2.charCodeAt(c2)] << 18 | te[r2.charCodeAt(c2 + 1)] << 12 | te[r2.charCodeAt(c2 + 2)] << 6 | te[r2.charCodeAt(c2 + 3)], s3[o2++] = e3 >> 16 & 255, s3[o2++] = e3 >> 8 & 255, s3[o2++] = e3 & 255;
    return i3 === 2 && (e3 = te[r2.charCodeAt(
      c2
    )] << 2 | te[r2.charCodeAt(c2 + 1)] >> 4, s3[o2++] = e3 & 255), i3 === 1 && (e3 = te[r2.charCodeAt(c2)] << 10 | te[r2.charCodeAt(c2 + 1)] << 4 | te[r2.charCodeAt(c2 + 2)] >> 2, s3[o2++] = e3 >> 8 & 255, s3[o2++] = e3 & 255), s3;
  }
  __name(Ro, "Ro");
  a(Ro, "toByteArray");
  function Lo(r2) {
    return ae[r2 >> 18 & 63] + ae[r2 >> 12 & 63] + ae[r2 >> 6 & 63] + ae[r2 & 63];
  }
  __name(Lo, "Lo");
  a(Lo, "tripletToBase64");
  function Fo(r2, e3, t) {
    for (var n2, i3 = [], s3 = e3; s3 < t; s3 += 3) n2 = (r2[s3] << 16 & 16711680) + (r2[s3 + 1] << 8 & 65280) + (r2[s3 + 2] & 255), i3.push(Lo(n2));
    return i3.join("");
  }
  __name(Fo, "Fo");
  a(Fo, "encodeChunk");
  function ko(r2) {
    for (var e3, t = r2.length, n2 = t % 3, i3 = [], s3 = 16383, o2 = 0, u2 = t - n2; o2 < u2; o2 += s3) i3.push(Fo(
      r2,
      o2,
      o2 + s3 > u2 ? u2 : o2 + s3
    ));
    return n2 === 1 ? (e3 = r2[t - 1], i3.push(ae[e3 >> 2] + ae[e3 << 4 & 63] + "==")) : n2 === 2 && (e3 = (r2[t - 2] << 8) + r2[t - 1], i3.push(ae[e3 >> 10] + ae[e3 >> 4 & 63] + ae[e3 << 2 & 63] + "=")), i3.join("");
  }
  __name(ko, "ko");
  a(ko, "fromByteArray");
});
var Nn = T((Qt) => {
  p();
  Qt.read = function(r2, e3, t, n2, i3) {
    var s3, o2, u2 = i3 * 8 - n2 - 1, c2 = (1 << u2) - 1, l2 = c2 >> 1, f2 = -7, y2 = t ? i3 - 1 : 0, g = t ? -1 : 1, A = r2[e3 + y2];
    for (y2 += g, s3 = A & (1 << -f2) - 1, A >>= -f2, f2 += u2; f2 > 0; s3 = s3 * 256 + r2[e3 + y2], y2 += g, f2 -= 8) ;
    for (o2 = s3 & (1 << -f2) - 1, s3 >>= -f2, f2 += n2; f2 > 0; o2 = o2 * 256 + r2[e3 + y2], y2 += g, f2 -= 8) ;
    if (s3 === 0) s3 = 1 - l2;
    else {
      if (s3 === c2) return o2 ? NaN : (A ? -1 : 1) * (1 / 0);
      o2 = o2 + Math.pow(2, n2), s3 = s3 - l2;
    }
    return (A ? -1 : 1) * o2 * Math.pow(2, s3 - n2);
  };
  Qt.write = function(r2, e3, t, n2, i3, s3) {
    var o2, u2, c2, l2 = s3 * 8 - i3 - 1, f2 = (1 << l2) - 1, y2 = f2 >> 1, g = i3 === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, A = n2 ? 0 : s3 - 1, C = n2 ? 1 : -1, D = e3 < 0 || e3 === 0 && 1 / e3 < 0 ? 1 : 0;
    for (e3 = Math.abs(e3), isNaN(e3) || e3 === 1 / 0 ? (u2 = isNaN(e3) ? 1 : 0, o2 = f2) : (o2 = Math.floor(Math.log(e3) / Math.LN2), e3 * (c2 = Math.pow(2, -o2)) < 1 && (o2--, c2 *= 2), o2 + y2 >= 1 ? e3 += g / c2 : e3 += g * Math.pow(2, 1 - y2), e3 * c2 >= 2 && (o2++, c2 /= 2), o2 + y2 >= f2 ? (u2 = 0, o2 = f2) : o2 + y2 >= 1 ? (u2 = (e3 * c2 - 1) * Math.pow(2, i3), o2 = o2 + y2) : (u2 = e3 * Math.pow(2, y2 - 1) * Math.pow(2, i3), o2 = 0)); i3 >= 8; r2[t + A] = u2 & 255, A += C, u2 /= 256, i3 -= 8) ;
    for (o2 = o2 << i3 | u2, l2 += i3; l2 > 0; r2[t + A] = o2 & 255, A += C, o2 /= 256, l2 -= 8) ;
    r2[t + A - C] |= D * 128;
  };
});
var ii = T((Re) => {
  "use strict";
  p();
  var Nt = Qn(), Pe = Nn(), Wn = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Re.Buffer = h2;
  Re.SlowBuffer = Qo;
  Re.INSPECT_MAX_BYTES = 50;
  var ft = 2147483647;
  Re.kMaxLength = ft;
  h2.TYPED_ARRAY_SUPPORT = Mo();
  !h2.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function Mo() {
    try {
      let r2 = new Uint8Array(1), e3 = { foo: a(function() {
        return 42;
      }, "foo") };
      return Object.setPrototypeOf(e3, Uint8Array.prototype), Object.setPrototypeOf(r2, e3), r2.foo() === 42;
    } catch {
      return false;
    }
  }
  __name(Mo, "Mo");
  a(Mo, "typedArraySupport");
  Object.defineProperty(h2.prototype, "parent", { enumerable: true, get: a(function() {
    if (h2.isBuffer(this)) return this.buffer;
  }, "get") });
  Object.defineProperty(h2.prototype, "offset", { enumerable: true, get: a(function() {
    if (h2.isBuffer(
      this
    )) return this.byteOffset;
  }, "get") });
  function he(r2) {
    if (r2 > ft) throw new RangeError('The value "' + r2 + '" is invalid for option "size"');
    let e3 = new Uint8Array(r2);
    return Object.setPrototypeOf(e3, h2.prototype), e3;
  }
  __name(he, "he");
  a(he, "createBuffer");
  function h2(r2, e3, t) {
    if (typeof r2 == "number") {
      if (typeof e3 == "string") throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      );
      return $t(r2);
    }
    return Gn(r2, e3, t);
  }
  __name(h2, "h");
  a(h2, "Buffer");
  h2.poolSize = 8192;
  function Gn(r2, e3, t) {
    if (typeof r2 == "string") return Do(r2, e3);
    if (ArrayBuffer.isView(r2)) return Oo(r2);
    if (r2 == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r2);
    if (ue(r2, ArrayBuffer) || r2 && ue(r2.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ue(r2, SharedArrayBuffer) || r2 && ue(
      r2.buffer,
      SharedArrayBuffer
    ))) return jt(r2, e3, t);
    if (typeof r2 == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n2 = r2.valueOf && r2.valueOf();
    if (n2 != null && n2 !== r2) return h2.from(n2, e3, t);
    let i3 = qo(r2);
    if (i3) return i3;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r2[Symbol.toPrimitive] == "function") return h2.from(r2[Symbol.toPrimitive]("string"), e3, t);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r2);
  }
  __name(Gn, "Gn");
  a(Gn, "from");
  h2.from = function(r2, e3, t) {
    return Gn(r2, e3, t);
  };
  Object.setPrototypeOf(
    h2.prototype,
    Uint8Array.prototype
  );
  Object.setPrototypeOf(h2, Uint8Array);
  function Vn(r2) {
    if (typeof r2 != "number") throw new TypeError(
      '"size" argument must be of type number'
    );
    if (r2 < 0) throw new RangeError('The value "' + r2 + '" is invalid for option "size"');
  }
  __name(Vn, "Vn");
  a(Vn, "assertSize");
  function Uo(r2, e3, t) {
    return Vn(r2), r2 <= 0 ? he(r2) : e3 !== void 0 ? typeof t == "string" ? he(r2).fill(e3, t) : he(r2).fill(e3) : he(r2);
  }
  __name(Uo, "Uo");
  a(Uo, "alloc");
  h2.alloc = function(r2, e3, t) {
    return Uo(r2, e3, t);
  };
  function $t(r2) {
    return Vn(r2), he(r2 < 0 ? 0 : Gt(r2) | 0);
  }
  __name($t, "$t");
  a($t, "allocUnsafe");
  h2.allocUnsafe = function(r2) {
    return $t(
      r2
    );
  };
  h2.allocUnsafeSlow = function(r2) {
    return $t(r2);
  };
  function Do(r2, e3) {
    if ((typeof e3 != "string" || e3 === "") && (e3 = "utf8"), !h2.isEncoding(e3)) throw new TypeError("Unknown encoding: " + e3);
    let t = zn(r2, e3) | 0, n2 = he(t), i3 = n2.write(
      r2,
      e3
    );
    return i3 !== t && (n2 = n2.slice(0, i3)), n2;
  }
  __name(Do, "Do");
  a(Do, "fromString");
  function Wt(r2) {
    let e3 = r2.length < 0 ? 0 : Gt(r2.length) | 0, t = he(e3);
    for (let n2 = 0; n2 < e3; n2 += 1) t[n2] = r2[n2] & 255;
    return t;
  }
  __name(Wt, "Wt");
  a(Wt, "fromArrayLike");
  function Oo(r2) {
    if (ue(r2, Uint8Array)) {
      let e3 = new Uint8Array(r2);
      return jt(e3.buffer, e3.byteOffset, e3.byteLength);
    }
    return Wt(r2);
  }
  __name(Oo, "Oo");
  a(Oo, "fromArrayView");
  function jt(r2, e3, t) {
    if (e3 < 0 || r2.byteLength < e3) throw new RangeError('"offset" is outside of buffer bounds');
    if (r2.byteLength < e3 + (t || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let n2;
    return e3 === void 0 && t === void 0 ? n2 = new Uint8Array(r2) : t === void 0 ? n2 = new Uint8Array(r2, e3) : n2 = new Uint8Array(
      r2,
      e3,
      t
    ), Object.setPrototypeOf(n2, h2.prototype), n2;
  }
  __name(jt, "jt");
  a(jt, "fromArrayBuffer");
  function qo(r2) {
    if (h2.isBuffer(r2)) {
      let e3 = Gt(r2.length) | 0, t = he(e3);
      return t.length === 0 || r2.copy(t, 0, 0, e3), t;
    }
    if (r2.length !== void 0) return typeof r2.length != "number" || zt(r2.length) ? he(0) : Wt(r2);
    if (r2.type === "Buffer" && Array.isArray(r2.data)) return Wt(r2.data);
  }
  __name(qo, "qo");
  a(qo, "fromObject");
  function Gt(r2) {
    if (r2 >= ft) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ft.toString(16) + " bytes");
    return r2 | 0;
  }
  __name(Gt, "Gt");
  a(Gt, "checked");
  function Qo(r2) {
    return +r2 != r2 && (r2 = 0), h2.alloc(+r2);
  }
  __name(Qo, "Qo");
  a(Qo, "SlowBuffer");
  h2.isBuffer = a(function(e3) {
    return e3 != null && e3._isBuffer === true && e3 !== h2.prototype;
  }, "isBuffer");
  h2.compare = a(function(e3, t) {
    if (ue(e3, Uint8Array) && (e3 = h2.from(e3, e3.offset, e3.byteLength)), ue(t, Uint8Array) && (t = h2.from(t, t.offset, t.byteLength)), !h2.isBuffer(e3) || !h2.isBuffer(t)) throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    );
    if (e3 === t) return 0;
    let n2 = e3.length, i3 = t.length;
    for (let s3 = 0, o2 = Math.min(n2, i3); s3 < o2; ++s3) if (e3[s3] !== t[s3]) {
      n2 = e3[s3], i3 = t[s3];
      break;
    }
    return n2 < i3 ? -1 : i3 < n2 ? 1 : 0;
  }, "compare");
  h2.isEncoding = a(function(e3) {
    switch (String(e3).toLowerCase()) {
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
  h2.concat = a(function(e3, t) {
    if (!Array.isArray(e3)) throw new TypeError(
      '"list" argument must be an Array of Buffers'
    );
    if (e3.length === 0) return h2.alloc(0);
    let n2;
    if (t === void 0)
      for (t = 0, n2 = 0; n2 < e3.length; ++n2) t += e3[n2].length;
    let i3 = h2.allocUnsafe(t), s3 = 0;
    for (n2 = 0; n2 < e3.length; ++n2) {
      let o2 = e3[n2];
      if (ue(o2, Uint8Array)) s3 + o2.length > i3.length ? (h2.isBuffer(o2) || (o2 = h2.from(o2)), o2.copy(i3, s3)) : Uint8Array.prototype.set.call(i3, o2, s3);
      else if (h2.isBuffer(o2)) o2.copy(i3, s3);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      s3 += o2.length;
    }
    return i3;
  }, "concat");
  function zn(r2, e3) {
    if (h2.isBuffer(r2)) return r2.length;
    if (ArrayBuffer.isView(r2) || ue(r2, ArrayBuffer)) return r2.byteLength;
    if (typeof r2 != "string") throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r2
    );
    let t = r2.length, n2 = arguments.length > 2 && arguments[2] === true;
    if (!n2 && t === 0) return 0;
    let i3 = false;
    for (; ; ) switch (e3) {
      case "ascii":
      case "latin1":
      case "binary":
        return t;
      case "utf8":
      case "utf-8":
        return Ht(r2).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return t * 2;
      case "hex":
        return t >>> 1;
      case "base64":
        return ni(r2).length;
      default:
        if (i3) return n2 ? -1 : Ht(r2).length;
        e3 = ("" + e3).toLowerCase(), i3 = true;
    }
  }
  __name(zn, "zn");
  a(zn, "byteLength");
  h2.byteLength = zn;
  function No(r2, e3, t) {
    let n2 = false;
    if ((e3 === void 0 || e3 < 0) && (e3 = 0), e3 > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e3 >>>= 0, t <= e3)) return "";
    for (r2 || (r2 = "utf8"); ; ) switch (r2) {
      case "hex":
        return Zo(this, e3, t);
      case "utf8":
      case "utf-8":
        return Yn(this, e3, t);
      case "ascii":
        return Ko(this, e3, t);
      case "latin1":
      case "binary":
        return Yo(
          this,
          e3,
          t
        );
      case "base64":
        return Vo(this, e3, t);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Jo(
          this,
          e3,
          t
        );
      default:
        if (n2) throw new TypeError("Unknown encoding: " + r2);
        r2 = (r2 + "").toLowerCase(), n2 = true;
    }
  }
  __name(No, "No");
  a(
    No,
    "slowToString"
  );
  h2.prototype._isBuffer = true;
  function Ae(r2, e3, t) {
    let n2 = r2[e3];
    r2[e3] = r2[t], r2[t] = n2;
  }
  __name(Ae, "Ae");
  a(Ae, "swap");
  h2.prototype.swap16 = a(function() {
    let e3 = this.length;
    if (e3 % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < e3; t += 2) Ae(this, t, t + 1);
    return this;
  }, "swap16");
  h2.prototype.swap32 = a(function() {
    let e3 = this.length;
    if (e3 % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < e3; t += 4) Ae(this, t, t + 3), Ae(this, t + 1, t + 2);
    return this;
  }, "swap32");
  h2.prototype.swap64 = a(
    function() {
      let e3 = this.length;
      if (e3 % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t = 0; t < e3; t += 8) Ae(this, t, t + 7), Ae(this, t + 1, t + 6), Ae(this, t + 2, t + 5), Ae(this, t + 3, t + 4);
      return this;
    },
    "swap64"
  );
  h2.prototype.toString = a(function() {
    let e3 = this.length;
    return e3 === 0 ? "" : arguments.length === 0 ? Yn(
      this,
      0,
      e3
    ) : No.apply(this, arguments);
  }, "toString");
  h2.prototype.toLocaleString = h2.prototype.toString;
  h2.prototype.equals = a(function(e3) {
    if (!h2.isBuffer(e3)) throw new TypeError("Argument must be a Buffer");
    return this === e3 ? true : h2.compare(this, e3) === 0;
  }, "equals");
  h2.prototype.inspect = a(function() {
    let e3 = "", t = Re.INSPECT_MAX_BYTES;
    return e3 = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e3 += " ... "), "<Buffer " + e3 + ">";
  }, "inspect");
  Wn && (h2.prototype[Wn] = h2.prototype.inspect);
  h2.prototype.compare = a(function(e3, t, n2, i3, s3) {
    if (ue(e3, Uint8Array) && (e3 = h2.from(e3, e3.offset, e3.byteLength)), !h2.isBuffer(e3)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e3);
    if (t === void 0 && (t = 0), n2 === void 0 && (n2 = e3 ? e3.length : 0), i3 === void 0 && (i3 = 0), s3 === void 0 && (s3 = this.length), t < 0 || n2 > e3.length || i3 < 0 || s3 > this.length) throw new RangeError("out of range index");
    if (i3 >= s3 && t >= n2) return 0;
    if (i3 >= s3) return -1;
    if (t >= n2) return 1;
    if (t >>>= 0, n2 >>>= 0, i3 >>>= 0, s3 >>>= 0, this === e3) return 0;
    let o2 = s3 - i3, u2 = n2 - t, c2 = Math.min(o2, u2), l2 = this.slice(
      i3,
      s3
    ), f2 = e3.slice(t, n2);
    for (let y2 = 0; y2 < c2; ++y2) if (l2[y2] !== f2[y2]) {
      o2 = l2[y2], u2 = f2[y2];
      break;
    }
    return o2 < u2 ? -1 : u2 < o2 ? 1 : 0;
  }, "compare");
  function Kn(r2, e3, t, n2, i3) {
    if (r2.length === 0) return -1;
    if (typeof t == "string" ? (n2 = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, zt(t) && (t = i3 ? 0 : r2.length - 1), t < 0 && (t = r2.length + t), t >= r2.length) {
      if (i3) return -1;
      t = r2.length - 1;
    } else if (t < 0) if (i3) t = 0;
    else return -1;
    if (typeof e3 == "string" && (e3 = h2.from(
      e3,
      n2
    )), h2.isBuffer(e3)) return e3.length === 0 ? -1 : jn(r2, e3, t, n2, i3);
    if (typeof e3 == "number") return e3 = e3 & 255, typeof Uint8Array.prototype.indexOf == "function" ? i3 ? Uint8Array.prototype.indexOf.call(r2, e3, t) : Uint8Array.prototype.lastIndexOf.call(r2, e3, t) : jn(r2, [e3], t, n2, i3);
    throw new TypeError("val must be string, number or Buffer");
  }
  __name(Kn, "Kn");
  a(Kn, "bidirectionalIndexOf");
  function jn(r2, e3, t, n2, i3) {
    let s3 = 1, o2 = r2.length, u2 = e3.length;
    if (n2 !== void 0 && (n2 = String(n2).toLowerCase(), n2 === "ucs2" || n2 === "ucs-2" || n2 === "utf16le" || n2 === "utf-16le")) {
      if (r2.length < 2 || e3.length < 2) return -1;
      s3 = 2, o2 /= 2, u2 /= 2, t /= 2;
    }
    function c2(f2, y2) {
      return s3 === 1 ? f2[y2] : f2.readUInt16BE(y2 * s3);
    }
    __name(c2, "c");
    a(c2, "read");
    let l2;
    if (i3) {
      let f2 = -1;
      for (l2 = t; l2 < o2; l2++) if (c2(r2, l2) === c2(e3, f2 === -1 ? 0 : l2 - f2)) {
        if (f2 === -1 && (f2 = l2), l2 - f2 + 1 === u2) return f2 * s3;
      } else f2 !== -1 && (l2 -= l2 - f2), f2 = -1;
    } else for (t + u2 > o2 && (t = o2 - u2), l2 = t; l2 >= 0; l2--) {
      let f2 = true;
      for (let y2 = 0; y2 < u2; y2++) if (c2(r2, l2 + y2) !== c2(e3, y2)) {
        f2 = false;
        break;
      }
      if (f2) return l2;
    }
    return -1;
  }
  __name(jn, "jn");
  a(jn, "arrayIndexOf");
  h2.prototype.includes = a(function(e3, t, n2) {
    return this.indexOf(
      e3,
      t,
      n2
    ) !== -1;
  }, "includes");
  h2.prototype.indexOf = a(function(e3, t, n2) {
    return Kn(this, e3, t, n2, true);
  }, "indexOf");
  h2.prototype.lastIndexOf = a(function(e3, t, n2) {
    return Kn(this, e3, t, n2, false);
  }, "lastIndexOf");
  function Wo(r2, e3, t, n2) {
    t = Number(t) || 0;
    let i3 = r2.length - t;
    n2 ? (n2 = Number(n2), n2 > i3 && (n2 = i3)) : n2 = i3;
    let s3 = e3.length;
    n2 > s3 / 2 && (n2 = s3 / 2);
    let o2;
    for (o2 = 0; o2 < n2; ++o2) {
      let u2 = parseInt(e3.substr(o2 * 2, 2), 16);
      if (zt(u2)) return o2;
      r2[t + o2] = u2;
    }
    return o2;
  }
  __name(Wo, "Wo");
  a(Wo, "hexWrite");
  function jo(r2, e3, t, n2) {
    return ht(Ht(e3, r2.length - t), r2, t, n2);
  }
  __name(jo, "jo");
  a(jo, "utf8Write");
  function Ho(r2, e3, t, n2) {
    return ht(ra(e3), r2, t, n2);
  }
  __name(Ho, "Ho");
  a(
    Ho,
    "asciiWrite"
  );
  function $o(r2, e3, t, n2) {
    return ht(ni(e3), r2, t, n2);
  }
  __name($o, "$o");
  a($o, "base64Write");
  function Go(r2, e3, t, n2) {
    return ht(
      na(e3, r2.length - t),
      r2,
      t,
      n2
    );
  }
  __name(Go, "Go");
  a(Go, "ucs2Write");
  h2.prototype.write = a(function(e3, t, n2, i3) {
    if (t === void 0) i3 = "utf8", n2 = this.length, t = 0;
    else if (n2 === void 0 && typeof t == "string") i3 = t, n2 = this.length, t = 0;
    else if (isFinite(t))
      t = t >>> 0, isFinite(n2) ? (n2 = n2 >>> 0, i3 === void 0 && (i3 = "utf8")) : (i3 = n2, n2 = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let s3 = this.length - t;
    if ((n2 === void 0 || n2 > s3) && (n2 = s3), e3.length > 0 && (n2 < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    i3 || (i3 = "utf8");
    let o2 = false;
    for (; ; ) switch (i3) {
      case "hex":
        return Wo(this, e3, t, n2);
      case "utf8":
      case "utf-8":
        return jo(this, e3, t, n2);
      case "ascii":
      case "latin1":
      case "binary":
        return Ho(this, e3, t, n2);
      case "base64":
        return $o(this, e3, t, n2);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Go(this, e3, t, n2);
      default:
        if (o2) throw new TypeError("Unknown encoding: " + i3);
        i3 = ("" + i3).toLowerCase(), o2 = true;
    }
  }, "write");
  h2.prototype.toJSON = a(function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  }, "toJSON");
  function Vo(r2, e3, t) {
    return e3 === 0 && t === r2.length ? Nt.fromByteArray(r2) : Nt.fromByteArray(r2.slice(e3, t));
  }
  __name(Vo, "Vo");
  a(Vo, "base64Slice");
  function Yn(r2, e3, t) {
    t = Math.min(r2.length, t);
    let n2 = [], i3 = e3;
    for (; i3 < t; ) {
      let s3 = r2[i3], o2 = null, u2 = s3 > 239 ? 4 : s3 > 223 ? 3 : s3 > 191 ? 2 : 1;
      if (i3 + u2 <= t) {
        let c2, l2, f2, y2;
        switch (u2) {
          case 1:
            s3 < 128 && (o2 = s3);
            break;
          case 2:
            c2 = r2[i3 + 1], (c2 & 192) === 128 && (y2 = (s3 & 31) << 6 | c2 & 63, y2 > 127 && (o2 = y2));
            break;
          case 3:
            c2 = r2[i3 + 1], l2 = r2[i3 + 2], (c2 & 192) === 128 && (l2 & 192) === 128 && (y2 = (s3 & 15) << 12 | (c2 & 63) << 6 | l2 & 63, y2 > 2047 && (y2 < 55296 || y2 > 57343) && (o2 = y2));
            break;
          case 4:
            c2 = r2[i3 + 1], l2 = r2[i3 + 2], f2 = r2[i3 + 3], (c2 & 192) === 128 && (l2 & 192) === 128 && (f2 & 192) === 128 && (y2 = (s3 & 15) << 18 | (c2 & 63) << 12 | (l2 & 63) << 6 | f2 & 63, y2 > 65535 && y2 < 1114112 && (o2 = y2));
        }
      }
      o2 === null ? (o2 = 65533, u2 = 1) : o2 > 65535 && (o2 -= 65536, n2.push(o2 >>> 10 & 1023 | 55296), o2 = 56320 | o2 & 1023), n2.push(o2), i3 += u2;
    }
    return zo(n2);
  }
  __name(Yn, "Yn");
  a(Yn, "utf8Slice");
  var Hn = 4096;
  function zo(r2) {
    let e3 = r2.length;
    if (e3 <= Hn) return String.fromCharCode.apply(String, r2);
    let t = "", n2 = 0;
    for (; n2 < e3; ) t += String.fromCharCode.apply(String, r2.slice(n2, n2 += Hn));
    return t;
  }
  __name(zo, "zo");
  a(zo, "decodeCodePointsArray");
  function Ko(r2, e3, t) {
    let n2 = "";
    t = Math.min(r2.length, t);
    for (let i3 = e3; i3 < t; ++i3) n2 += String.fromCharCode(r2[i3] & 127);
    return n2;
  }
  __name(Ko, "Ko");
  a(Ko, "asciiSlice");
  function Yo(r2, e3, t) {
    let n2 = "";
    t = Math.min(r2.length, t);
    for (let i3 = e3; i3 < t; ++i3) n2 += String.fromCharCode(r2[i3]);
    return n2;
  }
  __name(Yo, "Yo");
  a(Yo, "latin1Slice");
  function Zo(r2, e3, t) {
    let n2 = r2.length;
    (!e3 || e3 < 0) && (e3 = 0), (!t || t < 0 || t > n2) && (t = n2);
    let i3 = "";
    for (let s3 = e3; s3 < t; ++s3) i3 += ia[r2[s3]];
    return i3;
  }
  __name(Zo, "Zo");
  a(Zo, "hexSlice");
  function Jo(r2, e3, t) {
    let n2 = r2.slice(e3, t), i3 = "";
    for (let s3 = 0; s3 < n2.length - 1; s3 += 2) i3 += String.fromCharCode(n2[s3] + n2[s3 + 1] * 256);
    return i3;
  }
  __name(Jo, "Jo");
  a(Jo, "utf16leSlice");
  h2.prototype.slice = a(function(e3, t) {
    let n2 = this.length;
    e3 = ~~e3, t = t === void 0 ? n2 : ~~t, e3 < 0 ? (e3 += n2, e3 < 0 && (e3 = 0)) : e3 > n2 && (e3 = n2), t < 0 ? (t += n2, t < 0 && (t = 0)) : t > n2 && (t = n2), t < e3 && (t = e3);
    let i3 = this.subarray(e3, t);
    return Object.setPrototypeOf(i3, h2.prototype), i3;
  }, "slice");
  function q(r2, e3, t) {
    if (r2 % 1 !== 0 || r2 < 0) throw new RangeError("offset is not uint");
    if (r2 + e3 > t) throw new RangeError("Trying to access beyond buffer length");
  }
  __name(q, "q");
  a(q, "checkOffset");
  h2.prototype.readUintLE = h2.prototype.readUIntLE = a(
    function(e3, t, n2) {
      e3 = e3 >>> 0, t = t >>> 0, n2 || q(e3, t, this.length);
      let i3 = this[e3], s3 = 1, o2 = 0;
      for (; ++o2 < t && (s3 *= 256); ) i3 += this[e3 + o2] * s3;
      return i3;
    },
    "readUIntLE"
  );
  h2.prototype.readUintBE = h2.prototype.readUIntBE = a(function(e3, t, n2) {
    e3 = e3 >>> 0, t = t >>> 0, n2 || q(
      e3,
      t,
      this.length
    );
    let i3 = this[e3 + --t], s3 = 1;
    for (; t > 0 && (s3 *= 256); ) i3 += this[e3 + --t] * s3;
    return i3;
  }, "readUIntBE");
  h2.prototype.readUint8 = h2.prototype.readUInt8 = a(
    function(e3, t) {
      return e3 = e3 >>> 0, t || q(e3, 1, this.length), this[e3];
    },
    "readUInt8"
  );
  h2.prototype.readUint16LE = h2.prototype.readUInt16LE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(
      e3,
      2,
      this.length
    ), this[e3] | this[e3 + 1] << 8;
  }, "readUInt16LE");
  h2.prototype.readUint16BE = h2.prototype.readUInt16BE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 2, this.length), this[e3] << 8 | this[e3 + 1];
  }, "readUInt16BE");
  h2.prototype.readUint32LE = h2.prototype.readUInt32LE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 4, this.length), (this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16) + this[e3 + 3] * 16777216;
  }, "readUInt32LE");
  h2.prototype.readUint32BE = h2.prototype.readUInt32BE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 4, this.length), this[e3] * 16777216 + (this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3]);
  }, "readUInt32BE");
  h2.prototype.readBigUInt64LE = we(a(function(e3) {
    e3 = e3 >>> 0, Be(e3, "offset");
    let t = this[e3], n2 = this[e3 + 7];
    (t === void 0 || n2 === void 0) && je(e3, this.length - 8);
    let i3 = t + this[++e3] * 2 ** 8 + this[++e3] * 2 ** 16 + this[++e3] * 2 ** 24, s3 = this[++e3] + this[++e3] * 2 ** 8 + this[++e3] * 2 ** 16 + n2 * 2 ** 24;
    return BigInt(i3) + (BigInt(s3) << BigInt(32));
  }, "readBigUInt64LE"));
  h2.prototype.readBigUInt64BE = we(a(function(e3) {
    e3 = e3 >>> 0, Be(e3, "offset");
    let t = this[e3], n2 = this[e3 + 7];
    (t === void 0 || n2 === void 0) && je(e3, this.length - 8);
    let i3 = t * 2 ** 24 + this[++e3] * 2 ** 16 + this[++e3] * 2 ** 8 + this[++e3], s3 = this[++e3] * 2 ** 24 + this[++e3] * 2 ** 16 + this[++e3] * 2 ** 8 + n2;
    return (BigInt(i3) << BigInt(
      32
    )) + BigInt(s3);
  }, "readBigUInt64BE"));
  h2.prototype.readIntLE = a(function(e3, t, n2) {
    e3 = e3 >>> 0, t = t >>> 0, n2 || q(
      e3,
      t,
      this.length
    );
    let i3 = this[e3], s3 = 1, o2 = 0;
    for (; ++o2 < t && (s3 *= 256); ) i3 += this[e3 + o2] * s3;
    return s3 *= 128, i3 >= s3 && (i3 -= Math.pow(2, 8 * t)), i3;
  }, "readIntLE");
  h2.prototype.readIntBE = a(function(e3, t, n2) {
    e3 = e3 >>> 0, t = t >>> 0, n2 || q(e3, t, this.length);
    let i3 = t, s3 = 1, o2 = this[e3 + --i3];
    for (; i3 > 0 && (s3 *= 256); ) o2 += this[e3 + --i3] * s3;
    return s3 *= 128, o2 >= s3 && (o2 -= Math.pow(2, 8 * t)), o2;
  }, "readIntBE");
  h2.prototype.readInt8 = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 1, this.length), this[e3] & 128 ? (255 - this[e3] + 1) * -1 : this[e3];
  }, "readInt8");
  h2.prototype.readInt16LE = a(function(e3, t) {
    e3 = e3 >>> 0, t || q(
      e3,
      2,
      this.length
    );
    let n2 = this[e3] | this[e3 + 1] << 8;
    return n2 & 32768 ? n2 | 4294901760 : n2;
  }, "readInt16LE");
  h2.prototype.readInt16BE = a(function(e3, t) {
    e3 = e3 >>> 0, t || q(e3, 2, this.length);
    let n2 = this[e3 + 1] | this[e3] << 8;
    return n2 & 32768 ? n2 | 4294901760 : n2;
  }, "readInt16BE");
  h2.prototype.readInt32LE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 4, this.length), this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16 | this[e3 + 3] << 24;
  }, "readInt32LE");
  h2.prototype.readInt32BE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 4, this.length), this[e3] << 24 | this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3];
  }, "readInt32BE");
  h2.prototype.readBigInt64LE = we(a(function(e3) {
    e3 = e3 >>> 0, Be(e3, "offset");
    let t = this[e3], n2 = this[e3 + 7];
    (t === void 0 || n2 === void 0) && je(e3, this.length - 8);
    let i3 = this[e3 + 4] + this[e3 + 5] * 2 ** 8 + this[e3 + 6] * 2 ** 16 + (n2 << 24);
    return (BigInt(i3) << BigInt(
      32
    )) + BigInt(t + this[++e3] * 2 ** 8 + this[++e3] * 2 ** 16 + this[++e3] * 2 ** 24);
  }, "readBigInt64LE"));
  h2.prototype.readBigInt64BE = we(a(function(e3) {
    e3 = e3 >>> 0, Be(e3, "offset");
    let t = this[e3], n2 = this[e3 + 7];
    (t === void 0 || n2 === void 0) && je(e3, this.length - 8);
    let i3 = (t << 24) + this[++e3] * 2 ** 16 + this[++e3] * 2 ** 8 + this[++e3];
    return (BigInt(i3) << BigInt(32)) + BigInt(
      this[++e3] * 2 ** 24 + this[++e3] * 2 ** 16 + this[++e3] * 2 ** 8 + n2
    );
  }, "readBigInt64BE"));
  h2.prototype.readFloatLE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 4, this.length), Pe.read(this, e3, true, 23, 4);
  }, "readFloatLE");
  h2.prototype.readFloatBE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 4, this.length), Pe.read(this, e3, false, 23, 4);
  }, "readFloatBE");
  h2.prototype.readDoubleLE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 8, this.length), Pe.read(this, e3, true, 52, 8);
  }, "readDoubleLE");
  h2.prototype.readDoubleBE = a(function(e3, t) {
    return e3 = e3 >>> 0, t || q(e3, 8, this.length), Pe.read(
      this,
      e3,
      false,
      52,
      8
    );
  }, "readDoubleBE");
  function V(r2, e3, t, n2, i3, s3) {
    if (!h2.isBuffer(r2)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e3 > i3 || e3 < s3) throw new RangeError('"value" argument is out of bounds');
    if (t + n2 > r2.length) throw new RangeError("Index out of range");
  }
  __name(V, "V");
  a(V, "checkInt");
  h2.prototype.writeUintLE = h2.prototype.writeUIntLE = a(function(e3, t, n2, i3) {
    if (e3 = +e3, t = t >>> 0, n2 = n2 >>> 0, !i3) {
      let u2 = Math.pow(2, 8 * n2) - 1;
      V(
        this,
        e3,
        t,
        n2,
        u2,
        0
      );
    }
    let s3 = 1, o2 = 0;
    for (this[t] = e3 & 255; ++o2 < n2 && (s3 *= 256); ) this[t + o2] = e3 / s3 & 255;
    return t + n2;
  }, "writeUIntLE");
  h2.prototype.writeUintBE = h2.prototype.writeUIntBE = a(function(e3, t, n2, i3) {
    if (e3 = +e3, t = t >>> 0, n2 = n2 >>> 0, !i3) {
      let u2 = Math.pow(2, 8 * n2) - 1;
      V(this, e3, t, n2, u2, 0);
    }
    let s3 = n2 - 1, o2 = 1;
    for (this[t + s3] = e3 & 255; --s3 >= 0 && (o2 *= 256); ) this[t + s3] = e3 / o2 & 255;
    return t + n2;
  }, "writeUIntBE");
  h2.prototype.writeUint8 = h2.prototype.writeUInt8 = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(this, e3, t, 1, 255, 0), this[t] = e3 & 255, t + 1;
  }, "writeUInt8");
  h2.prototype.writeUint16LE = h2.prototype.writeUInt16LE = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(this, e3, t, 2, 65535, 0), this[t] = e3 & 255, this[t + 1] = e3 >>> 8, t + 2;
  }, "writeUInt16LE");
  h2.prototype.writeUint16BE = h2.prototype.writeUInt16BE = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(this, e3, t, 2, 65535, 0), this[t] = e3 >>> 8, this[t + 1] = e3 & 255, t + 2;
  }, "writeUInt16BE");
  h2.prototype.writeUint32LE = h2.prototype.writeUInt32LE = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(
      this,
      e3,
      t,
      4,
      4294967295,
      0
    ), this[t + 3] = e3 >>> 24, this[t + 2] = e3 >>> 16, this[t + 1] = e3 >>> 8, this[t] = e3 & 255, t + 4;
  }, "writeUInt32LE");
  h2.prototype.writeUint32BE = h2.prototype.writeUInt32BE = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(
      this,
      e3,
      t,
      4,
      4294967295,
      0
    ), this[t] = e3 >>> 24, this[t + 1] = e3 >>> 16, this[t + 2] = e3 >>> 8, this[t + 3] = e3 & 255, t + 4;
  }, "writeUInt32BE");
  function Zn(r2, e3, t, n2, i3) {
    ri(e3, n2, i3, r2, t, 7);
    let s3 = Number(e3 & BigInt(4294967295));
    r2[t++] = s3, s3 = s3 >> 8, r2[t++] = s3, s3 = s3 >> 8, r2[t++] = s3, s3 = s3 >> 8, r2[t++] = s3;
    let o2 = Number(e3 >> BigInt(32) & BigInt(4294967295));
    return r2[t++] = o2, o2 = o2 >> 8, r2[t++] = o2, o2 = o2 >> 8, r2[t++] = o2, o2 = o2 >> 8, r2[t++] = o2, t;
  }
  __name(Zn, "Zn");
  a(Zn, "wrtBigUInt64LE");
  function Jn(r2, e3, t, n2, i3) {
    ri(e3, n2, i3, r2, t, 7);
    let s3 = Number(e3 & BigInt(4294967295));
    r2[t + 7] = s3, s3 = s3 >> 8, r2[t + 6] = s3, s3 = s3 >> 8, r2[t + 5] = s3, s3 = s3 >> 8, r2[t + 4] = s3;
    let o2 = Number(e3 >> BigInt(32) & BigInt(4294967295));
    return r2[t + 3] = o2, o2 = o2 >> 8, r2[t + 2] = o2, o2 = o2 >> 8, r2[t + 1] = o2, o2 = o2 >> 8, r2[t] = o2, t + 8;
  }
  __name(Jn, "Jn");
  a(Jn, "wrtBigUInt64BE");
  h2.prototype.writeBigUInt64LE = we(a(function(e3, t = 0) {
    return Zn(this, e3, t, BigInt(0), BigInt("0xffffffffffffffff"));
  }, "writeBigUInt64LE"));
  h2.prototype.writeBigUInt64BE = we(a(function(e3, t = 0) {
    return Jn(this, e3, t, BigInt(0), BigInt(
      "0xffffffffffffffff"
    ));
  }, "writeBigUInt64BE"));
  h2.prototype.writeIntLE = a(function(e3, t, n2, i3) {
    if (e3 = +e3, t = t >>> 0, !i3) {
      let c2 = Math.pow(2, 8 * n2 - 1);
      V(this, e3, t, n2, c2 - 1, -c2);
    }
    let s3 = 0, o2 = 1, u2 = 0;
    for (this[t] = e3 & 255; ++s3 < n2 && (o2 *= 256); )
      e3 < 0 && u2 === 0 && this[t + s3 - 1] !== 0 && (u2 = 1), this[t + s3] = (e3 / o2 >> 0) - u2 & 255;
    return t + n2;
  }, "writeIntLE");
  h2.prototype.writeIntBE = a(function(e3, t, n2, i3) {
    if (e3 = +e3, t = t >>> 0, !i3) {
      let c2 = Math.pow(2, 8 * n2 - 1);
      V(this, e3, t, n2, c2 - 1, -c2);
    }
    let s3 = n2 - 1, o2 = 1, u2 = 0;
    for (this[t + s3] = e3 & 255; --s3 >= 0 && (o2 *= 256); ) e3 < 0 && u2 === 0 && this[t + s3 + 1] !== 0 && (u2 = 1), this[t + s3] = (e3 / o2 >> 0) - u2 & 255;
    return t + n2;
  }, "writeIntBE");
  h2.prototype.writeInt8 = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(this, e3, t, 1, 127, -128), e3 < 0 && (e3 = 255 + e3 + 1), this[t] = e3 & 255, t + 1;
  }, "writeInt8");
  h2.prototype.writeInt16LE = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(this, e3, t, 2, 32767, -32768), this[t] = e3 & 255, this[t + 1] = e3 >>> 8, t + 2;
  }, "writeInt16LE");
  h2.prototype.writeInt16BE = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(this, e3, t, 2, 32767, -32768), this[t] = e3 >>> 8, this[t + 1] = e3 & 255, t + 2;
  }, "writeInt16BE");
  h2.prototype.writeInt32LE = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(
      this,
      e3,
      t,
      4,
      2147483647,
      -2147483648
    ), this[t] = e3 & 255, this[t + 1] = e3 >>> 8, this[t + 2] = e3 >>> 16, this[t + 3] = e3 >>> 24, t + 4;
  }, "writeInt32LE");
  h2.prototype.writeInt32BE = a(function(e3, t, n2) {
    return e3 = +e3, t = t >>> 0, n2 || V(
      this,
      e3,
      t,
      4,
      2147483647,
      -2147483648
    ), e3 < 0 && (e3 = 4294967295 + e3 + 1), this[t] = e3 >>> 24, this[t + 1] = e3 >>> 16, this[t + 2] = e3 >>> 8, this[t + 3] = e3 & 255, t + 4;
  }, "writeInt32BE");
  h2.prototype.writeBigInt64LE = we(a(function(e3, t = 0) {
    return Zn(this, e3, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }, "writeBigInt64LE"));
  h2.prototype.writeBigInt64BE = we(
    a(function(e3, t = 0) {
      return Jn(this, e3, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64BE")
  );
  function Xn(r2, e3, t, n2, i3, s3) {
    if (t + n2 > r2.length) throw new RangeError("Index out of range");
    if (t < 0) throw new RangeError("Index out of range");
  }
  __name(Xn, "Xn");
  a(Xn, "checkIEEE754");
  function ei(r2, e3, t, n2, i3) {
    return e3 = +e3, t = t >>> 0, i3 || Xn(r2, e3, t, 4, 34028234663852886e22, -34028234663852886e22), Pe.write(r2, e3, t, n2, 23, 4), t + 4;
  }
  __name(ei, "ei");
  a(
    ei,
    "writeFloat"
  );
  h2.prototype.writeFloatLE = a(function(e3, t, n2) {
    return ei(this, e3, t, true, n2);
  }, "writeFloatLE");
  h2.prototype.writeFloatBE = a(function(e3, t, n2) {
    return ei(this, e3, t, false, n2);
  }, "writeFloatBE");
  function ti(r2, e3, t, n2, i3) {
    return e3 = +e3, t = t >>> 0, i3 || Xn(r2, e3, t, 8, 17976931348623157e292, -17976931348623157e292), Pe.write(
      r2,
      e3,
      t,
      n2,
      52,
      8
    ), t + 8;
  }
  __name(ti, "ti");
  a(ti, "writeDouble");
  h2.prototype.writeDoubleLE = a(function(e3, t, n2) {
    return ti(this, e3, t, true, n2);
  }, "writeDoubleLE");
  h2.prototype.writeDoubleBE = a(function(e3, t, n2) {
    return ti(this, e3, t, false, n2);
  }, "writeDoubleBE");
  h2.prototype.copy = a(function(e3, t, n2, i3) {
    if (!h2.isBuffer(e3)) throw new TypeError("argument should be a Buffer");
    if (n2 || (n2 = 0), !i3 && i3 !== 0 && (i3 = this.length), t >= e3.length && (t = e3.length), t || (t = 0), i3 > 0 && i3 < n2 && (i3 = n2), i3 === n2 || e3.length === 0 || this.length === 0) return 0;
    if (t < 0) throw new RangeError("targetStart out of bounds");
    if (n2 < 0 || n2 >= this.length) throw new RangeError("Index out of range");
    if (i3 < 0) throw new RangeError("sourceEnd out of bounds");
    i3 > this.length && (i3 = this.length), e3.length - t < i3 - n2 && (i3 = e3.length - t + n2);
    let s3 = i3 - n2;
    return this === e3 && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n2, i3) : Uint8Array.prototype.set.call(e3, this.subarray(n2, i3), t), s3;
  }, "copy");
  h2.prototype.fill = a(function(e3, t, n2, i3) {
    if (typeof e3 == "string") {
      if (typeof t == "string" ? (i3 = t, t = 0, n2 = this.length) : typeof n2 == "string" && (i3 = n2, n2 = this.length), i3 !== void 0 && typeof i3 != "string") throw new TypeError("encoding must be a string");
      if (typeof i3 == "string" && !h2.isEncoding(i3)) throw new TypeError(
        "Unknown encoding: " + i3
      );
      if (e3.length === 1) {
        let o2 = e3.charCodeAt(0);
        (i3 === "utf8" && o2 < 128 || i3 === "latin1") && (e3 = o2);
      }
    } else typeof e3 == "number" ? e3 = e3 & 255 : typeof e3 == "boolean" && (e3 = Number(e3));
    if (t < 0 || this.length < t || this.length < n2) throw new RangeError("Out of range index");
    if (n2 <= t) return this;
    t = t >>> 0, n2 = n2 === void 0 ? this.length : n2 >>> 0, e3 || (e3 = 0);
    let s3;
    if (typeof e3 == "number") for (s3 = t; s3 < n2; ++s3) this[s3] = e3;
    else {
      let o2 = h2.isBuffer(e3) ? e3 : h2.from(
        e3,
        i3
      ), u2 = o2.length;
      if (u2 === 0) throw new TypeError('The value "' + e3 + '" is invalid for argument "value"');
      for (s3 = 0; s3 < n2 - t; ++s3) this[s3 + t] = o2[s3 % u2];
    }
    return this;
  }, "fill");
  var Te = {};
  function Vt(r2, e3, t) {
    var n2;
    Te[r2] = (n2 = class extends t {
      static {
        __name(this, "n");
      }
      constructor() {
        super(), Object.defineProperty(this, "message", { value: e3.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${r2}]`, this.stack, delete this.name;
      }
      get code() {
        return r2;
      }
      set code(s3) {
        Object.defineProperty(
          this,
          "code",
          { configurable: true, enumerable: true, value: s3, writable: true }
        );
      }
      toString() {
        return `${this.name} [${r2}]: ${this.message}`;
      }
    }, a(n2, "NodeError"), n2);
  }
  __name(Vt, "Vt");
  a(Vt, "E");
  Vt("ERR_BUFFER_OUT_OF_BOUNDS", function(r2) {
    return r2 ? `${r2} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  Vt(
    "ERR_INVALID_ARG_TYPE",
    function(r2, e3) {
      return `The "${r2}" argument must be of type number. Received type ${typeof e3}`;
    },
    TypeError
  );
  Vt("ERR_OUT_OF_RANGE", function(r2, e3, t) {
    let n2 = `The value of "${r2}" is out of range.`, i3 = t;
    return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i3 = $n(String(t)) : typeof t == "bigint" && (i3 = String(
      t
    ), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i3 = $n(i3)), i3 += "n"), n2 += ` It must be ${e3}. Received ${i3}`, n2;
  }, RangeError);
  function $n(r2) {
    let e3 = "", t = r2.length, n2 = r2[0] === "-" ? 1 : 0;
    for (; t >= n2 + 4; t -= 3) e3 = `_${r2.slice(t - 3, t)}${e3}`;
    return `${r2.slice(0, t)}${e3}`;
  }
  __name($n, "$n");
  a($n, "addNumericalSeparator");
  function Xo(r2, e3, t) {
    Be(e3, "offset"), (r2[e3] === void 0 || r2[e3 + t] === void 0) && je(e3, r2.length - (t + 1));
  }
  __name(Xo, "Xo");
  a(Xo, "checkBounds");
  function ri(r2, e3, t, n2, i3, s3) {
    if (r2 > t || r2 < e3) {
      let o2 = typeof e3 == "bigint" ? "n" : "", u2;
      throw s3 > 3 ? e3 === 0 || e3 === BigInt(0) ? u2 = `>= 0${o2} and < 2${o2} ** ${(s3 + 1) * 8}${o2}` : u2 = `>= -(2${o2} ** ${(s3 + 1) * 8 - 1}${o2}) and < 2 ** ${(s3 + 1) * 8 - 1}${o2}` : u2 = `>= ${e3}${o2} and <= ${t}${o2}`, new Te.ERR_OUT_OF_RANGE("value", u2, r2);
    }
    Xo(n2, i3, s3);
  }
  __name(ri, "ri");
  a(ri, "checkIntBI");
  function Be(r2, e3) {
    if (typeof r2 != "number") throw new Te.ERR_INVALID_ARG_TYPE(e3, "number", r2);
  }
  __name(Be, "Be");
  a(Be, "validateNumber");
  function je(r2, e3, t) {
    throw Math.floor(r2) !== r2 ? (Be(r2, t), new Te.ERR_OUT_OF_RANGE(t || "offset", "an integer", r2)) : e3 < 0 ? new Te.ERR_BUFFER_OUT_OF_BOUNDS() : new Te.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e3}`, r2);
  }
  __name(je, "je");
  a(je, "boundsError");
  var ea = /[^+/0-9A-Za-z-_]/g;
  function ta(r2) {
    if (r2 = r2.split("=")[0], r2 = r2.trim().replace(ea, ""), r2.length < 2) return "";
    for (; r2.length % 4 !== 0; ) r2 = r2 + "=";
    return r2;
  }
  __name(ta, "ta");
  a(ta, "base64clean");
  function Ht(r2, e3) {
    e3 = e3 || 1 / 0;
    let t, n2 = r2.length, i3 = null, s3 = [];
    for (let o2 = 0; o2 < n2; ++o2) {
      if (t = r2.charCodeAt(o2), t > 55295 && t < 57344) {
        if (!i3) {
          if (t > 56319) {
            (e3 -= 3) > -1 && s3.push(239, 191, 189);
            continue;
          } else if (o2 + 1 === n2) {
            (e3 -= 3) > -1 && s3.push(239, 191, 189);
            continue;
          }
          i3 = t;
          continue;
        }
        if (t < 56320) {
          (e3 -= 3) > -1 && s3.push(239, 191, 189), i3 = t;
          continue;
        }
        t = (i3 - 55296 << 10 | t - 56320) + 65536;
      } else i3 && (e3 -= 3) > -1 && s3.push(239, 191, 189);
      if (i3 = null, t < 128) {
        if ((e3 -= 1) < 0) break;
        s3.push(t);
      } else if (t < 2048) {
        if ((e3 -= 2) < 0) break;
        s3.push(t >> 6 | 192, t & 63 | 128);
      } else if (t < 65536) {
        if ((e3 -= 3) < 0) break;
        s3.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
      } else if (t < 1114112) {
        if ((e3 -= 4) < 0) break;
        s3.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return s3;
  }
  __name(Ht, "Ht");
  a(Ht, "utf8ToBytes");
  function ra(r2) {
    let e3 = [];
    for (let t = 0; t < r2.length; ++t) e3.push(r2.charCodeAt(t) & 255);
    return e3;
  }
  __name(ra, "ra");
  a(
    ra,
    "asciiToBytes"
  );
  function na(r2, e3) {
    let t, n2, i3, s3 = [];
    for (let o2 = 0; o2 < r2.length && !((e3 -= 2) < 0); ++o2) t = r2.charCodeAt(
      o2
    ), n2 = t >> 8, i3 = t % 256, s3.push(i3), s3.push(n2);
    return s3;
  }
  __name(na, "na");
  a(na, "utf16leToBytes");
  function ni(r2) {
    return Nt.toByteArray(
      ta(r2)
    );
  }
  __name(ni, "ni");
  a(ni, "base64ToBytes");
  function ht(r2, e3, t, n2) {
    let i3;
    for (i3 = 0; i3 < n2 && !(i3 + t >= e3.length || i3 >= r2.length); ++i3)
      e3[i3 + t] = r2[i3];
    return i3;
  }
  __name(ht, "ht");
  a(ht, "blitBuffer");
  function ue(r2, e3) {
    return r2 instanceof e3 || r2 != null && r2.constructor != null && r2.constructor.name != null && r2.constructor.name === e3.name;
  }
  __name(ue, "ue");
  a(ue, "isInstance");
  function zt(r2) {
    return r2 !== r2;
  }
  __name(zt, "zt");
  a(zt, "numberIsNaN");
  var ia = function() {
    let r2 = "0123456789abcdef", e3 = new Array(256);
    for (let t = 0; t < 16; ++t) {
      let n2 = t * 16;
      for (let i3 = 0; i3 < 16; ++i3) e3[n2 + i3] = r2[t] + r2[i3];
    }
    return e3;
  }();
  function we(r2) {
    return typeof BigInt > "u" ? sa : r2;
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
  b = globalThis, v = globalThis.setImmediate ?? ((r2) => setTimeout(r2, 0)), x = globalThis.clearImmediate ?? ((r2) => clearTimeout(r2)), d = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : ii().Buffer, m = globalThis.process ?? {};
  m.env ?? (m.env = {});
  try {
    m.nextTick(() => {
    });
  } catch {
    let e3 = Promise.resolve();
    m.nextTick = e3.then.bind(e3);
  }
});
var ge = T((Rl, Kt) => {
  "use strict";
  p();
  var Le = typeof Reflect == "object" ? Reflect : null, si = Le && typeof Le.apply == "function" ? Le.apply : a(function(e3, t, n2) {
    return Function.prototype.apply.call(e3, t, n2);
  }, "ReflectApply"), pt;
  Le && typeof Le.ownKeys == "function" ? pt = Le.ownKeys : Object.getOwnPropertySymbols ? pt = a(function(e3) {
    return Object.getOwnPropertyNames(e3).concat(Object.getOwnPropertySymbols(e3));
  }, "ReflectOwnKeys") : pt = a(function(e3) {
    return Object.getOwnPropertyNames(e3);
  }, "ReflectOwnKeys");
  function oa(r2) {
    console && console.warn && console.warn(r2);
  }
  __name(oa, "oa");
  a(
    oa,
    "ProcessEmitWarning"
  );
  var ai = Number.isNaN || a(function(e3) {
    return e3 !== e3;
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
  function dt(r2) {
    if (typeof r2 != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r2);
  }
  __name(dt, "dt");
  a(dt, "checkListener");
  Object.defineProperty(B, "defaultMaxListeners", { enumerable: true, get: a(function() {
    return oi;
  }, "get"), set: a(
    function(r2) {
      if (typeof r2 != "number" || r2 < 0 || ai(r2)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r2 + ".");
      oi = r2;
    },
    "set"
  ) });
  B.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  };
  B.prototype.setMaxListeners = a(function(e3) {
    if (typeof e3 != "number" || e3 < 0 || ai(e3)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e3 + ".");
    return this._maxListeners = e3, this;
  }, "setMaxListeners");
  function ui(r2) {
    return r2._maxListeners === void 0 ? B.defaultMaxListeners : r2._maxListeners;
  }
  __name(ui, "ui");
  a(ui, "_getMaxListeners");
  B.prototype.getMaxListeners = a(function() {
    return ui(this);
  }, "getMaxListeners");
  B.prototype.emit = a(function(e3) {
    for (var t = [], n2 = 1; n2 < arguments.length; n2++) t.push(arguments[n2]);
    var i3 = e3 === "error", s3 = this._events;
    if (s3 !== void 0) i3 = i3 && s3.error === void 0;
    else if (!i3) return false;
    if (i3) {
      var o2;
      if (t.length > 0 && (o2 = t[0]), o2 instanceof Error) throw o2;
      var u2 = new Error("Unhandled error." + (o2 ? " (" + o2.message + ")" : ""));
      throw u2.context = o2, u2;
    }
    var c2 = s3[e3];
    if (c2 === void 0) return false;
    if (typeof c2 == "function") si(c2, this, t);
    else for (var l2 = c2.length, f2 = pi(c2, l2), n2 = 0; n2 < l2; ++n2) si(f2[n2], this, t);
    return true;
  }, "emit");
  function ci(r2, e3, t, n2) {
    var i3, s3, o2;
    if (dt(
      t
    ), s3 = r2._events, s3 === void 0 ? (s3 = r2._events = /* @__PURE__ */ Object.create(null), r2._eventsCount = 0) : (s3.newListener !== void 0 && (r2.emit("newListener", e3, t.listener ? t.listener : t), s3 = r2._events), o2 = s3[e3]), o2 === void 0) o2 = s3[e3] = t, ++r2._eventsCount;
    else if (typeof o2 == "function" ? o2 = s3[e3] = n2 ? [t, o2] : [o2, t] : n2 ? o2.unshift(t) : o2.push(t), i3 = ui(r2), i3 > 0 && o2.length > i3 && !o2.warned) {
      o2.warned = true;
      var u2 = new Error("Possible EventEmitter memory leak detected. " + o2.length + " " + String(e3) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      u2.name = "MaxListenersExceededWarning", u2.emitter = r2, u2.type = e3, u2.count = o2.length, oa(u2);
    }
    return r2;
  }
  __name(ci, "ci");
  a(ci, "_addListener");
  B.prototype.addListener = a(function(e3, t) {
    return ci(this, e3, t, false);
  }, "addListener");
  B.prototype.on = B.prototype.addListener;
  B.prototype.prependListener = a(function(e3, t) {
    return ci(this, e3, t, true);
  }, "prependListener");
  function aa() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  __name(aa, "aa");
  a(aa, "onceWrapper");
  function li(r2, e3, t) {
    var n2 = {
      fired: false,
      wrapFn: void 0,
      target: r2,
      type: e3,
      listener: t
    }, i3 = aa.bind(n2);
    return i3.listener = t, n2.wrapFn = i3, i3;
  }
  __name(li, "li");
  a(li, "_onceWrap");
  B.prototype.once = a(function(e3, t) {
    return dt(t), this.on(e3, li(this, e3, t)), this;
  }, "once");
  B.prototype.prependOnceListener = a(function(e3, t) {
    return dt(t), this.prependListener(e3, li(this, e3, t)), this;
  }, "prependOnceListener");
  B.prototype.removeListener = a(function(e3, t) {
    var n2, i3, s3, o2, u2;
    if (dt(t), i3 = this._events, i3 === void 0) return this;
    if (n2 = i3[e3], n2 === void 0) return this;
    if (n2 === t || n2.listener === t) --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i3[e3], i3.removeListener && this.emit("removeListener", e3, n2.listener || t));
    else if (typeof n2 != "function") {
      for (s3 = -1, o2 = n2.length - 1; o2 >= 0; o2--) if (n2[o2] === t || n2[o2].listener === t) {
        u2 = n2[o2].listener, s3 = o2;
        break;
      }
      if (s3 < 0) return this;
      s3 === 0 ? n2.shift() : ua(n2, s3), n2.length === 1 && (i3[e3] = n2[0]), i3.removeListener !== void 0 && this.emit("removeListener", e3, u2 || t);
    }
    return this;
  }, "removeListener");
  B.prototype.off = B.prototype.removeListener;
  B.prototype.removeAllListeners = a(function(e3) {
    var t, n2, i3;
    if (n2 = this._events, n2 === void 0) return this;
    if (n2.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n2[e3] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n2[e3]), this;
    if (arguments.length === 0) {
      var s3 = Object.keys(n2), o2;
      for (i3 = 0; i3 < s3.length; ++i3) o2 = s3[i3], o2 !== "removeListener" && this.removeAllListeners(
        o2
      );
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (t = n2[e3], typeof t == "function") this.removeListener(e3, t);
    else if (t !== void 0) for (i3 = t.length - 1; i3 >= 0; i3--) this.removeListener(e3, t[i3]);
    return this;
  }, "removeAllListeners");
  function fi(r2, e3, t) {
    var n2 = r2._events;
    if (n2 === void 0) return [];
    var i3 = n2[e3];
    return i3 === void 0 ? [] : typeof i3 == "function" ? t ? [i3.listener || i3] : [i3] : t ? ca(i3) : pi(i3, i3.length);
  }
  __name(fi, "fi");
  a(fi, "_listeners");
  B.prototype.listeners = a(function(e3) {
    return fi(this, e3, true);
  }, "listeners");
  B.prototype.rawListeners = a(function(e3) {
    return fi(this, e3, false);
  }, "rawListeners");
  B.listenerCount = function(r2, e3) {
    return typeof r2.listenerCount == "function" ? r2.listenerCount(e3) : hi.call(r2, e3);
  };
  B.prototype.listenerCount = hi;
  function hi(r2) {
    var e3 = this._events;
    if (e3 !== void 0) {
      var t = e3[r2];
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
  function pi(r2, e3) {
    for (var t = new Array(e3), n2 = 0; n2 < e3; ++n2) t[n2] = r2[n2];
    return t;
  }
  __name(pi, "pi");
  a(pi, "arrayClone");
  function ua(r2, e3) {
    for (; e3 + 1 < r2.length; e3++) r2[e3] = r2[e3 + 1];
    r2.pop();
  }
  __name(ua, "ua");
  a(ua, "spliceOne");
  function ca(r2) {
    for (var e3 = new Array(r2.length), t = 0; t < e3.length; ++t) e3[t] = r2[t].listener || r2[t];
    return e3;
  }
  __name(ca, "ca");
  a(ca, "unwrapListeners");
  function la(r2, e3) {
    return new Promise(function(t, n2) {
      function i3(o2) {
        r2.removeListener(e3, s3), n2(o2);
      }
      __name(i3, "i");
      a(i3, "errorListener");
      function s3() {
        typeof r2.removeListener == "function" && r2.removeListener("error", i3), t([].slice.call(arguments));
      }
      __name(s3, "s");
      a(s3, "resolver"), di(r2, e3, s3, { once: true }), e3 !== "error" && fa(r2, i3, { once: true });
    });
  }
  __name(la, "la");
  a(la, "once");
  function fa(r2, e3, t) {
    typeof r2.on == "function" && di(r2, "error", e3, t);
  }
  __name(fa, "fa");
  a(
    fa,
    "addErrorHandlerIfEventEmitter"
  );
  function di(r2, e3, t, n2) {
    if (typeof r2.on == "function") n2.once ? r2.once(e3, t) : r2.on(e3, t);
    else if (typeof r2.addEventListener == "function") r2.addEventListener(e3, a(/* @__PURE__ */ __name(function i3(s3) {
      n2.once && r2.removeEventListener(e3, i3), t(s3);
    }, "i"), "wrapListener"));
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r2);
  }
  __name(di, "di");
  a(di, "eventTargetAgnosticAddListener");
});
var wi = {};
ie(wi, { Socket: /* @__PURE__ */ __name(() => ce, "Socket"), isIP: /* @__PURE__ */ __name(() => ha, "isIP") });
function ha(r2) {
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
    wsProxyAddrForHost(t, n2) {
      let i3 = this.wsProxy;
      if (i3 === void 0) throw new Error("No WebSocket proxy is configured. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#wsproxy-string--host-string-port-number--string--string");
      return typeof i3 == "function" ? i3(t, n2) : `${i3}?address=${t}:${n2}`;
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
    connect(t, n2, i3) {
      this.connecting = true, i3 && this.once("connect", i3);
      let s3 = a(() => {
        this.connecting = false, this.pending = false, this.emit("connect"), this.emit("ready");
      }, "handleWebSocketOpen"), o2 = a((c2, l2 = false) => {
        c2.binaryType = "arraybuffer", c2.addEventListener("error", (f2) => {
          this.emit("error", f2), this.emit("close");
        }), c2.addEventListener("message", (f2) => {
          if (this.tlsState === 0) {
            let y2 = d.from(f2.data);
            this.emit("data", y2);
          }
        }), c2.addEventListener("close", () => {
          this.emit("close");
        }), l2 ? s3() : c2.addEventListener(
          "open",
          s3
        );
      }, "configureWebSocket"), u2;
      try {
        u2 = this.wsProxyAddrForHost(n2, typeof t == "string" ? parseInt(t, 10) : t);
      } catch (c2) {
        this.emit("error", c2), this.emit("close");
        return;
      }
      try {
        let l2 = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + u2;
        if (this.webSocketConstructor !== void 0) this.ws = new this.webSocketConstructor(l2), o2(this.ws);
        else try {
          this.ws = new WebSocket(l2), o2(this.ws);
        } catch {
          this.ws = new __unstable_WebSocket(l2), o2(this.ws);
        }
      } catch (c2) {
        let f2 = (this.useSecureWebSocket ? "https:" : "http:") + "//" + u2;
        fetch(f2, { headers: { Upgrade: "websocket" } }).then(
          (y2) => {
            if (this.ws = y2.webSocket, this.ws == null) throw c2;
            this.ws.accept(), o2(this.ws, true);
          }
        ).catch((y2) => {
          this.emit(
            "error",
            new Error(`All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined. Details: ${y2}`)
          ), this.emit("close");
        });
      }
    }
    async startTls(t) {
      if (this.subtls === void 0) throw new Error(
        "For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information."
      );
      this.tlsState = 1;
      let n2 = await this.subtls.TrustedCert.databaseFromPEM(this.rootCerts), i3 = new this.subtls.WebSocketReadQueue(this.ws), s3 = i3.read.bind(i3), o2 = this.rawWrite.bind(this), { read: u2, write: c2 } = await this.subtls.startTls(t, n2, s3, o2, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
      this.tlsRead = u2, this.tlsWrite = c2, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit("secureConnection", this), this.tlsReadLoop();
    }
    async tlsReadLoop() {
      for (; ; ) {
        let t = await this.tlsRead();
        if (t === void 0) break;
        {
          let n2 = d.from(t);
          this.emit("data", n2);
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
        let n2 = new Uint8Array(
          this.writeBuffer.length + t.length
        );
        n2.set(this.writeBuffer), n2.set(t, this.writeBuffer.length), this.writeBuffer = n2;
      }
    }
    write(t, n2 = "utf8", i3 = (s3) => {
    }) {
      return t.length === 0 ? (i3(), true) : (typeof t == "string" && (t = d.from(t, n2)), this.tlsState === 0 ? (this.rawWrite(t), i3()) : this.tlsState === 1 ? this.once("secureConnection", () => {
        this.write(
          t,
          n2,
          i3
        );
      }) : (this.tlsWrite(t), i3()), true);
    }
    end(t = d.alloc(0), n2 = "utf8", i3 = () => {
    }) {
      return this.write(t, n2, () => {
        this.ws.close(), i3();
      }), this;
    }
    destroy() {
      return this.destroyed = true, this.end();
    }
  };
  a(S, "Socket"), E(S, "defaults", {
    poolQueryViaFetch: false,
    fetchEndpoint: a((t, n2, i3) => {
      let s3;
      return i3?.jwtAuth ? s3 = t.replace(yi, "apiauth.") : s3 = t.replace(yi, "api."), "https://" + s3 + "/sql";
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
function Yt(r2, e3 = false) {
  let { protocol: t } = new URL(r2), n2 = "http:" + r2.substring(
    t.length
  ), { username: i3, password: s3, host: o2, hostname: u2, port: c2, pathname: l2, search: f2, searchParams: y2, hash: g } = new URL(
    n2
  );
  s3 = decodeURIComponent(s3), i3 = decodeURIComponent(i3), l2 = decodeURIComponent(l2);
  let A = i3 + ":" + s3, C = e3 ? Object.fromEntries(y2.entries()) : f2;
  return {
    href: r2,
    protocol: t,
    auth: A,
    username: i3,
    password: s3,
    host: o2,
    hostname: u2,
    port: c2,
    pathname: l2,
    search: f2,
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
  Ai.parse = function(r2, e3) {
    return new er(r2, e3).parse();
  };
  var vt = class vt2 {
    static {
      __name(this, "vt");
    }
    constructor(e3, t) {
      this.source = e3, this.transform = t || Ca, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var e3 = this.source[this.position++];
      return e3 === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e3, escaped: false };
    }
    record(e3) {
      this.recorded.push(
        e3
      );
    }
    newEntry(e3) {
      var t;
      (this.recorded.length > 0 || e3) && (t = this.recorded.join(""), t === "NULL" && !e3 && (t = null), t !== null && (t = this.transform(t)), this.entries.push(t), this.recorded = []);
    }
    consumeDimensions() {
      if (this.source[0] === "[") for (; !this.isEof(); ) {
        var e3 = this.nextCharacter();
        if (e3.value === "=") break;
      }
    }
    parse(e3) {
      var t, n2, i3;
      for (this.consumeDimensions(); !this.isEof(); ) if (t = this.nextCharacter(), t.value === "{" && !i3) this.dimension++, this.dimension > 1 && (n2 = new vt2(this.source.substr(this.position - 1), this.transform), this.entries.push(n2.parse(
        true
      )), this.position += n2.position - 2);
      else if (t.value === "}" && !i3) {
        if (this.dimension--, !this.dimension && (this.newEntry(), e3)) return this.entries;
      } else t.value === '"' && !t.escaped ? (i3 && this.newEntry(true), i3 = !i3) : t.value === "," && !i3 ? this.newEntry() : this.record(t.value);
      if (this.dimension !== 0) throw new Error("array dimension not balanced");
      return this.entries;
    }
  };
  a(vt, "ArrayParser");
  var er = vt;
  function Ca(r2) {
    return r2;
  }
  __name(Ca, "Ca");
  a(Ca, "identity");
});
var rr = T((Zl, Ci) => {
  p();
  var _a18 = tr();
  Ci.exports = { create: a(function(r2, e3) {
    return { parse: a(function() {
      return _a18.parse(r2, e3);
    }, "parse") };
  }, "create") };
});
var Ti = T((ef, Ii) => {
  "use strict";
  p();
  var Ia = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, Ta = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, Pa = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, Ba = /^-?infinity$/;
  Ii.exports = a(function(e3) {
    if (Ba.test(e3)) return Number(e3.replace("i", "I"));
    var t = Ia.exec(e3);
    if (!t) return Ra(
      e3
    ) || null;
    var n2 = !!t[8], i3 = parseInt(t[1], 10);
    n2 && (i3 = _i(i3));
    var s3 = parseInt(t[2], 10) - 1, o2 = t[3], u2 = parseInt(
      t[4],
      10
    ), c2 = parseInt(t[5], 10), l2 = parseInt(t[6], 10), f2 = t[7];
    f2 = f2 ? 1e3 * parseFloat(f2) : 0;
    var y2, g = La(e3);
    return g != null ? (y2 = new Date(Date.UTC(i3, s3, o2, u2, c2, l2, f2)), nr(i3) && y2.setUTCFullYear(i3), g !== 0 && y2.setTime(y2.getTime() - g)) : (y2 = new Date(i3, s3, o2, u2, c2, l2, f2), nr(i3) && y2.setFullYear(i3)), y2;
  }, "parseDate");
  function Ra(r2) {
    var e3 = Ta.exec(r2);
    if (e3) {
      var t = parseInt(e3[1], 10), n2 = !!e3[4];
      n2 && (t = _i(t));
      var i3 = parseInt(e3[2], 10) - 1, s3 = e3[3], o2 = new Date(t, i3, s3);
      return nr(
        t
      ) && o2.setFullYear(t), o2;
    }
  }
  __name(Ra, "Ra");
  a(Ra, "getDate");
  function La(r2) {
    if (r2.endsWith("+00")) return 0;
    var e3 = Pa.exec(r2.split(" ")[1]);
    if (e3) {
      var t = e3[1];
      if (t === "Z") return 0;
      var n2 = t === "-" ? -1 : 1, i3 = parseInt(e3[2], 10) * 3600 + parseInt(
        e3[3] || 0,
        10
      ) * 60 + parseInt(e3[4] || 0, 10);
      return i3 * n2 * 1e3;
    }
  }
  __name(La, "La");
  a(La, "timeZoneOffset");
  function _i(r2) {
    return -(r2 - 1);
  }
  __name(_i, "_i");
  a(_i, "bcYearToNegativeYear");
  function nr(r2) {
    return r2 >= 0 && r2 < 100;
  }
  __name(nr, "nr");
  a(nr, "is0To99");
});
var Bi = T((nf, Pi) => {
  p();
  Pi.exports = ka;
  var Fa = Object.prototype.hasOwnProperty;
  function ka(r2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t = arguments[e3];
      for (var n2 in t) Fa.call(t, n2) && (r2[n2] = t[n2]);
    }
    return r2;
  }
  __name(ka, "ka");
  a(ka, "extend");
});
var Fi = T((af, Li) => {
  "use strict";
  p();
  var Ma = Bi();
  Li.exports = ke;
  function ke(r2) {
    if (!(this instanceof ke))
      return new ke(r2);
    Ma(this, Va(r2));
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
    var r2 = Ua.filter(this.hasOwnProperty, this);
    return this.milliseconds && r2.indexOf("seconds") < 0 && r2.push("seconds"), r2.length === 0 ? "0" : r2.map(function(e3) {
      var t = this[e3] || 0;
      return e3 === "seconds" && this.milliseconds && (t = (t + this.milliseconds / 1e3).toFixed(6).replace(
        /\.?0+$/,
        ""
      )), t + " " + e3;
    }, this).join(" ");
  };
  var Da = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, Oa = ["years", "months", "days"], qa = ["hours", "minutes", "seconds"];
  ke.prototype.toISOString = ke.prototype.toISO = function() {
    var r2 = Oa.map(t, this).join(""), e3 = qa.map(t, this).join("");
    return "P" + r2 + "T" + e3;
    function t(n2) {
      var i3 = this[n2] || 0;
      return n2 === "seconds" && this.milliseconds && (i3 = (i3 + this.milliseconds / 1e3).toFixed(6).replace(
        /0+$/,
        ""
      )), i3 + Da[n2];
    }
    __name(t, "t");
  };
  var ir = "([+-]?\\d+)", Qa = ir + "\\s+years?", Na = ir + "\\s+mons?", Wa = ir + "\\s+days?", ja = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", Ha = new RegExp([Qa, Na, Wa, ja].map(function(r2) {
    return "(" + r2 + ")?";
  }).join("\\s*")), Ri = { years: 2, months: 4, days: 6, hours: 9, minutes: 10, seconds: 11, milliseconds: 12 }, $a = ["hours", "minutes", "seconds", "milliseconds"];
  function Ga(r2) {
    var e3 = r2 + "000000".slice(r2.length);
    return parseInt(
      e3,
      10
    ) / 1e3;
  }
  __name(Ga, "Ga");
  a(Ga, "parseMilliseconds");
  function Va(r2) {
    if (!r2) return {};
    var e3 = Ha.exec(r2), t = e3[8] === "-";
    return Object.keys(Ri).reduce(function(n2, i3) {
      var s3 = Ri[i3], o2 = e3[s3];
      return !o2 || (o2 = i3 === "milliseconds" ? Ga(o2) : parseInt(o2, 10), !o2) || (t && ~$a.indexOf(i3) && (o2 *= -1), n2[i3] = o2), n2;
    }, {});
  }
  __name(Va, "Va");
  a(Va, "parse");
});
var Mi = T((lf, ki) => {
  "use strict";
  p();
  ki.exports = a(function(e3) {
    if (/^\\x/.test(e3)) return new d(e3.substr(
      2
    ), "hex");
    for (var t = "", n2 = 0; n2 < e3.length; ) if (e3[n2] !== "\\") t += e3[n2], ++n2;
    else if (/[0-7]{3}/.test(e3.substr(n2 + 1, 3))) t += String.fromCharCode(parseInt(e3.substr(n2 + 1, 3), 8)), n2 += 4;
    else {
      for (var i3 = 1; n2 + i3 < e3.length && e3[n2 + i3] === "\\"; ) i3++;
      for (var s3 = 0; s3 < Math.floor(i3 / 2); ++s3) t += "\\";
      n2 += Math.floor(i3 / 2) * 2;
    }
    return new d(t, "binary");
  }, "parseBytea");
});
var Wi = T((pf, Ni) => {
  p();
  var Ve = tr(), ze = rr(), xt = Ti(), Di = Fi(), Oi = Mi();
  function St(r2) {
    return a(function(t) {
      return t === null ? t : r2(t);
    }, "nullAllowed");
  }
  __name(St, "St");
  a(St, "allowNull");
  function qi(r2) {
    return r2 === null ? r2 : r2 === "TRUE" || r2 === "t" || r2 === "true" || r2 === "y" || r2 === "yes" || r2 === "on" || r2 === "1";
  }
  __name(qi, "qi");
  a(qi, "parseBool");
  function za(r2) {
    return r2 ? Ve.parse(r2, qi) : null;
  }
  __name(za, "za");
  a(za, "parseBoolArray");
  function Ka(r2) {
    return parseInt(r2, 10);
  }
  __name(Ka, "Ka");
  a(Ka, "parseBaseTenInt");
  function sr(r2) {
    return r2 ? Ve.parse(r2, St(Ka)) : null;
  }
  __name(sr, "sr");
  a(sr, "parseIntegerArray");
  function Ya(r2) {
    return r2 ? Ve.parse(r2, St(function(e3) {
      return Qi(e3).trim();
    })) : null;
  }
  __name(Ya, "Ya");
  a(Ya, "parseBigIntegerArray");
  var Za = a(function(r2) {
    if (!r2) return null;
    var e3 = ze.create(r2, function(t) {
      return t !== null && (t = cr(t)), t;
    });
    return e3.parse();
  }, "parsePointArray"), or2 = a(function(r2) {
    if (!r2) return null;
    var e3 = ze.create(r2, function(t) {
      return t !== null && (t = parseFloat(t)), t;
    });
    return e3.parse();
  }, "parseFloatArray"), re2 = a(function(r2) {
    if (!r2) return null;
    var e3 = ze.create(r2);
    return e3.parse();
  }, "parseStringArray"), ar = a(function(r2) {
    if (!r2) return null;
    var e3 = ze.create(
      r2,
      function(t) {
        return t !== null && (t = xt(t)), t;
      }
    );
    return e3.parse();
  }, "parseDateArray"), Ja = a(function(r2) {
    if (!r2)
      return null;
    var e3 = ze.create(r2, function(t) {
      return t !== null && (t = Di(t)), t;
    });
    return e3.parse();
  }, "parseIntervalArray"), Xa = a(function(r2) {
    return r2 ? Ve.parse(r2, St(Oi)) : null;
  }, "parseByteAArray"), ur = a(function(r2) {
    return parseInt(r2, 10);
  }, "parseInteger"), Qi = a(function(r2) {
    var e3 = String(r2);
    return /^\d+$/.test(e3) ? e3 : r2;
  }, "parseBigInteger"), Ui = a(function(r2) {
    return r2 ? Ve.parse(r2, St(JSON.parse)) : null;
  }, "parseJsonArray"), cr = a(
    function(r2) {
      return r2[0] !== "(" ? null : (r2 = r2.substring(1, r2.length - 1).split(","), { x: parseFloat(r2[0]), y: parseFloat(
        r2[1]
      ) });
    },
    "parsePoint"
  ), eu = a(function(r2) {
    if (r2[0] !== "<" && r2[1] !== "(") return null;
    for (var e3 = "(", t = "", n2 = false, i3 = 2; i3 < r2.length - 1; i3++) {
      if (n2 || (e3 += r2[i3]), r2[i3] === ")") {
        n2 = true;
        continue;
      } else if (!n2) continue;
      r2[i3] !== "," && (t += r2[i3]);
    }
    var s3 = cr(e3);
    return s3.radius = parseFloat(t), s3;
  }, "parseCircle"), tu = a(function(r2) {
    r2(20, Qi), r2(21, ur), r2(23, ur), r2(26, ur), r2(700, parseFloat), r2(701, parseFloat), r2(16, qi), r2(1082, xt), r2(1114, xt), r2(1184, xt), r2(
      600,
      cr
    ), r2(651, re2), r2(718, eu), r2(1e3, za), r2(1001, Xa), r2(1005, sr), r2(1007, sr), r2(1028, sr), r2(1016, Ya), r2(1017, Za), r2(1021, or2), r2(1022, or2), r2(1231, or2), r2(1014, re2), r2(1015, re2), r2(1008, re2), r2(1009, re2), r2(1040, re2), r2(1041, re2), r2(
      1115,
      ar
    ), r2(1182, ar), r2(1185, ar), r2(1186, Di), r2(1187, Ja), r2(17, Oi), r2(114, JSON.parse.bind(JSON)), r2(3802, JSON.parse.bind(JSON)), r2(199, Ui), r2(3807, Ui), r2(3907, re2), r2(2951, re2), r2(791, re2), r2(1183, re2), r2(1270, re2);
  }, "init");
  Ni.exports = { init: tu };
});
var Hi = T((mf, ji) => {
  "use strict";
  p();
  var z = 1e6;
  function ru(r2) {
    var e3 = r2.readInt32BE(0), t = r2.readUInt32BE(
      4
    ), n2 = "";
    e3 < 0 && (e3 = ~e3 + (t === 0), t = ~t + 1 >>> 0, n2 = "-");
    var i3 = "", s3, o2, u2, c2, l2, f2;
    {
      if (s3 = e3 % z, e3 = e3 / z >>> 0, o2 = 4294967296 * s3 + t, t = o2 / z >>> 0, u2 = "" + (o2 - z * t), t === 0 && e3 === 0) return n2 + u2 + i3;
      for (c2 = "", l2 = 6 - u2.length, f2 = 0; f2 < l2; f2++) c2 += "0";
      i3 = c2 + u2 + i3;
    }
    {
      if (s3 = e3 % z, e3 = e3 / z >>> 0, o2 = 4294967296 * s3 + t, t = o2 / z >>> 0, u2 = "" + (o2 - z * t), t === 0 && e3 === 0) return n2 + u2 + i3;
      for (c2 = "", l2 = 6 - u2.length, f2 = 0; f2 < l2; f2++) c2 += "0";
      i3 = c2 + u2 + i3;
    }
    {
      if (s3 = e3 % z, e3 = e3 / z >>> 0, o2 = 4294967296 * s3 + t, t = o2 / z >>> 0, u2 = "" + (o2 - z * t), t === 0 && e3 === 0) return n2 + u2 + i3;
      for (c2 = "", l2 = 6 - u2.length, f2 = 0; f2 < l2; f2++) c2 += "0";
      i3 = c2 + u2 + i3;
    }
    return s3 = e3 % z, o2 = 4294967296 * s3 + t, u2 = "" + o2 % z, n2 + u2 + i3;
  }
  __name(ru, "ru");
  a(ru, "readInt8");
  ji.exports = ru;
});
var Ki = T((bf, zi) => {
  p();
  var nu = Hi(), L = a(function(r2, e3, t, n2, i3) {
    t = t || 0, n2 = n2 || false, i3 = i3 || function(A, C, D) {
      return A * Math.pow(2, D) + C;
    };
    var s3 = t >> 3, o2 = a(function(A) {
      return n2 ? ~A & 255 : A;
    }, "inv"), u2 = 255, c2 = 8 - t % 8;
    e3 < c2 && (u2 = 255 << 8 - e3 & 255, c2 = e3), t && (u2 = u2 >> t % 8);
    var l2 = 0;
    t % 8 + e3 >= 8 && (l2 = i3(0, o2(r2[s3]) & u2, c2));
    for (var f2 = e3 + t >> 3, y2 = s3 + 1; y2 < f2; y2++) l2 = i3(l2, o2(
      r2[y2]
    ), 8);
    var g = (e3 + t) % 8;
    return g > 0 && (l2 = i3(l2, o2(r2[f2]) >> 8 - g, g)), l2;
  }, "parseBits"), Vi = a(function(r2, e3, t) {
    var n2 = Math.pow(2, t - 1) - 1, i3 = L(r2, 1), s3 = L(r2, t, 1);
    if (s3 === 0) return 0;
    var o2 = 1, u2 = a(function(l2, f2, y2) {
      l2 === 0 && (l2 = 1);
      for (var g = 1; g <= y2; g++) o2 /= 2, (f2 & 1 << y2 - g) > 0 && (l2 += o2);
      return l2;
    }, "parsePrecisionBits"), c2 = L(r2, e3, t + 1, false, u2);
    return s3 == Math.pow(
      2,
      t + 1
    ) - 1 ? c2 === 0 ? i3 === 0 ? 1 / 0 : -1 / 0 : NaN : (i3 === 0 ? 1 : -1) * Math.pow(2, s3 - n2) * c2;
  }, "parseFloatFromBits"), iu = a(function(r2) {
    return L(r2, 1) == 1 ? -1 * (L(r2, 15, 1, true) + 1) : L(r2, 15, 1);
  }, "parseInt16"), $i = a(function(r2) {
    return L(r2, 1) == 1 ? -1 * (L(
      r2,
      31,
      1,
      true
    ) + 1) : L(r2, 31, 1);
  }, "parseInt32"), su = a(function(r2) {
    return Vi(r2, 23, 8);
  }, "parseFloat32"), ou = a(function(r2) {
    return Vi(r2, 52, 11);
  }, "parseFloat64"), au = a(function(r2) {
    var e3 = L(r2, 16, 32);
    if (e3 == 49152) return NaN;
    for (var t = Math.pow(1e4, L(r2, 16, 16)), n2 = 0, i3 = [], s3 = L(r2, 16), o2 = 0; o2 < s3; o2++) n2 += L(r2, 16, 64 + 16 * o2) * t, t /= 1e4;
    var u2 = Math.pow(10, L(
      r2,
      16,
      48
    ));
    return (e3 === 0 ? 1 : -1) * Math.round(n2 * u2) / u2;
  }, "parseNumeric"), Gi = a(function(r2, e3) {
    var t = L(e3, 1), n2 = L(
      e3,
      63,
      1
    ), i3 = new Date((t === 0 ? 1 : -1) * n2 / 1e3 + 9466848e5);
    return r2 || i3.setTime(i3.getTime() + i3.getTimezoneOffset() * 6e4), i3.usec = n2 % 1e3, i3.getMicroSeconds = function() {
      return this.usec;
    }, i3.setMicroSeconds = function(s3) {
      this.usec = s3;
    }, i3.getUTCMicroSeconds = function() {
      return this.usec;
    }, i3;
  }, "parseDate"), Ke = a(
    function(r2) {
      for (var e3 = L(
        r2,
        32
      ), t = L(r2, 32, 32), n2 = L(r2, 32, 64), i3 = 96, s3 = [], o2 = 0; o2 < e3; o2++) s3[o2] = L(r2, 32, i3), i3 += 32, i3 += 32;
      var u2 = a(function(l2) {
        var f2 = L(r2, 32, i3);
        if (i3 += 32, f2 == 4294967295) return null;
        var y2;
        if (l2 == 23 || l2 == 20) return y2 = L(r2, f2 * 8, i3), i3 += f2 * 8, y2;
        if (l2 == 25) return y2 = r2.toString(this.encoding, i3 >> 3, (i3 += f2 << 3) >> 3), y2;
        console.log("ERROR: ElementType not implemented: " + l2);
      }, "parseElement"), c2 = a(function(l2, f2) {
        var y2 = [], g;
        if (l2.length > 1) {
          var A = l2.shift();
          for (g = 0; g < A; g++) y2[g] = c2(l2, f2);
          l2.unshift(A);
        } else for (g = 0; g < l2[0]; g++) y2[g] = u2(f2);
        return y2;
      }, "parse");
      return c2(s3, n2);
    },
    "parseArray"
  ), uu = a(function(r2) {
    return r2.toString("utf8");
  }, "parseText"), cu = a(function(r2) {
    return r2 === null ? null : L(r2, 8) > 0;
  }, "parseBool"), lu = a(function(r2) {
    r2(20, nu), r2(21, iu), r2(23, $i), r2(26, $i), r2(1700, au), r2(700, su), r2(701, ou), r2(16, cu), r2(1114, Gi.bind(null, false)), r2(1184, Gi.bind(null, true)), r2(1e3, Ke), r2(1007, Ke), r2(1016, Ke), r2(1008, Ke), r2(1009, Ke), r2(25, uu);
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
  function Ji(r2) {
    return String(r2);
  }
  __name(Ji, "Ji");
  a(Ji, "noParse");
  function yu(r2, e3) {
    return e3 = e3 || "text", Ye[e3] && Ye[e3][r2] || Ji;
  }
  __name(yu, "yu");
  a(yu, "getTypeParser");
  function mu(r2, e3, t) {
    typeof e3 == "function" && (t = e3, e3 = "text"), Ye[e3][r2] = t;
  }
  __name(mu, "mu");
  a(mu, "setTypeParser");
  fu.init(function(r2, e3) {
    Ye.text[r2] = e3;
  });
  hu.init(function(r2, e3) {
    Ye.binary[r2] = e3;
  });
});
var At = T((If, Xi) => {
  "use strict";
  p();
  var wu = Je();
  function Et(r2) {
    this._types = r2 || wu, this.text = {}, this.binary = {};
  }
  __name(Et, "Et");
  a(Et, "TypeOverrides");
  Et.prototype.getOverrides = function(r2) {
    switch (r2) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  };
  Et.prototype.setTypeParser = function(r2, e3, t) {
    typeof e3 == "function" && (t = e3, e3 = "text"), this.getOverrides(e3)[r2] = t;
  };
  Et.prototype.getTypeParser = function(r2, e3) {
    return e3 = e3 || "text", this.getOverrides(e3)[r2] || this._types.getTypeParser(r2, e3);
  };
  Xi.exports = Et;
});
function Xe(r2) {
  let e3 = 1779033703, t = 3144134277, n2 = 1013904242, i3 = 2773480762, s3 = 1359893119, o2 = 2600822924, u2 = 528734635, c2 = 1541459225, l2 = 0, f2 = 0, y2 = [
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
  ], g = a((I, w2) => I >>> w2 | I << 32 - w2, "rrot"), A = new Uint32Array(64), C = new Uint8Array(64), D = a(() => {
    for (let R = 0, j = 0; R < 16; R++, j += 4) A[R] = C[j] << 24 | C[j + 1] << 16 | C[j + 2] << 8 | C[j + 3];
    for (let R = 16; R < 64; R++) {
      let j = g(A[R - 15], 7) ^ g(A[R - 15], 18) ^ A[R - 15] >>> 3, le = g(
        A[R - 2],
        17
      ) ^ g(A[R - 2], 19) ^ A[R - 2] >>> 10;
      A[R] = A[R - 16] + j + A[R - 7] + le | 0;
    }
    let I = e3, w2 = t, Z = n2, W = i3, J = s3, X = o2, se = u2, oe = c2;
    for (let R = 0; R < 64; R++) {
      let j = g(J, 6) ^ g(J, 11) ^ g(J, 25), le = J & X ^ ~J & se, de = oe + j + le + y2[R] + A[R] | 0, We = g(I, 2) ^ g(
        I,
        13
      ) ^ g(I, 22), fe = I & w2 ^ I & Z ^ w2 & Z, _e = We + fe | 0;
      oe = se, se = X, X = J, J = W + de | 0, W = Z, Z = w2, w2 = I, I = de + _e | 0;
    }
    e3 = e3 + I | 0, t = t + w2 | 0, n2 = n2 + Z | 0, i3 = i3 + W | 0, s3 = s3 + J | 0, o2 = o2 + X | 0, u2 = u2 + se | 0, c2 = c2 + oe | 0, f2 = 0;
  }, "process"), Y = a((I) => {
    typeof I == "string" && (I = new TextEncoder().encode(I));
    for (let w2 = 0; w2 < I.length; w2++) C[f2++] = I[w2], f2 === 64 && D();
    l2 += I.length;
  }, "add"), P = a(() => {
    if (C[f2++] = 128, f2 == 64 && D(), f2 + 8 > 64) {
      for (; f2 < 64; ) C[f2++] = 0;
      D();
    }
    for (; f2 < 58; ) C[f2++] = 0;
    let I = l2 * 8;
    C[f2++] = I / 1099511627776 & 255, C[f2++] = I / 4294967296 & 255, C[f2++] = I >>> 24, C[f2++] = I >>> 16 & 255, C[f2++] = I >>> 8 & 255, C[f2++] = I & 255, D();
    let w2 = new Uint8Array(
      32
    );
    return w2[0] = e3 >>> 24, w2[1] = e3 >>> 16 & 255, w2[2] = e3 >>> 8 & 255, w2[3] = e3 & 255, w2[4] = t >>> 24, w2[5] = t >>> 16 & 255, w2[6] = t >>> 8 & 255, w2[7] = t & 255, w2[8] = n2 >>> 24, w2[9] = n2 >>> 16 & 255, w2[10] = n2 >>> 8 & 255, w2[11] = n2 & 255, w2[12] = i3 >>> 24, w2[13] = i3 >>> 16 & 255, w2[14] = i3 >>> 8 & 255, w2[15] = i3 & 255, w2[16] = s3 >>> 24, w2[17] = s3 >>> 16 & 255, w2[18] = s3 >>> 8 & 255, w2[19] = s3 & 255, w2[20] = o2 >>> 24, w2[21] = o2 >>> 16 & 255, w2[22] = o2 >>> 8 & 255, w2[23] = o2 & 255, w2[24] = u2 >>> 24, w2[25] = u2 >>> 16 & 255, w2[26] = u2 >>> 8 & 255, w2[27] = u2 & 255, w2[28] = c2 >>> 24, w2[29] = c2 >>> 16 & 255, w2[30] = c2 >>> 8 & 255, w2[31] = c2 & 255, w2;
  }, "digest");
  return r2 === void 0 ? { add: Y, digest: P } : (Y(r2), P());
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
    static hashByteArray(e3, t = false) {
      return this.onePassHasher.start().appendByteArray(
        e3
      ).end(t);
    }
    static hashStr(e3, t = false) {
      return this.onePassHasher.start().appendStr(e3).end(t);
    }
    static hashAsciiStr(e3, t = false) {
      return this.onePassHasher.start().appendAsciiStr(e3).end(t);
    }
    static _hex(e3) {
      let t = U2.hexChars, n2 = U2.hexOut, i3, s3, o2, u2;
      for (u2 = 0; u2 < 4; u2 += 1) for (s3 = u2 * 8, i3 = e3[u2], o2 = 0; o2 < 8; o2 += 2) n2[s3 + 1 + o2] = t.charAt(i3 & 15), i3 >>>= 4, n2[s3 + 0 + o2] = t.charAt(
        i3 & 15
      ), i3 >>>= 4;
      return n2.join("");
    }
    static _md5cycle(e3, t) {
      let n2 = e3[0], i3 = e3[1], s3 = e3[2], o2 = e3[3];
      n2 += (i3 & s3 | ~i3 & o2) + t[0] - 680876936 | 0, n2 = (n2 << 7 | n2 >>> 25) + i3 | 0, o2 += (n2 & i3 | ~n2 & s3) + t[1] - 389564586 | 0, o2 = (o2 << 12 | o2 >>> 20) + n2 | 0, s3 += (o2 & n2 | ~o2 & i3) + t[2] + 606105819 | 0, s3 = (s3 << 17 | s3 >>> 15) + o2 | 0, i3 += (s3 & o2 | ~s3 & n2) + t[3] - 1044525330 | 0, i3 = (i3 << 22 | i3 >>> 10) + s3 | 0, n2 += (i3 & s3 | ~i3 & o2) + t[4] - 176418897 | 0, n2 = (n2 << 7 | n2 >>> 25) + i3 | 0, o2 += (n2 & i3 | ~n2 & s3) + t[5] + 1200080426 | 0, o2 = (o2 << 12 | o2 >>> 20) + n2 | 0, s3 += (o2 & n2 | ~o2 & i3) + t[6] - 1473231341 | 0, s3 = (s3 << 17 | s3 >>> 15) + o2 | 0, i3 += (s3 & o2 | ~s3 & n2) + t[7] - 45705983 | 0, i3 = (i3 << 22 | i3 >>> 10) + s3 | 0, n2 += (i3 & s3 | ~i3 & o2) + t[8] + 1770035416 | 0, n2 = (n2 << 7 | n2 >>> 25) + i3 | 0, o2 += (n2 & i3 | ~n2 & s3) + t[9] - 1958414417 | 0, o2 = (o2 << 12 | o2 >>> 20) + n2 | 0, s3 += (o2 & n2 | ~o2 & i3) + t[10] - 42063 | 0, s3 = (s3 << 17 | s3 >>> 15) + o2 | 0, i3 += (s3 & o2 | ~s3 & n2) + t[11] - 1990404162 | 0, i3 = (i3 << 22 | i3 >>> 10) + s3 | 0, n2 += (i3 & s3 | ~i3 & o2) + t[12] + 1804603682 | 0, n2 = (n2 << 7 | n2 >>> 25) + i3 | 0, o2 += (n2 & i3 | ~n2 & s3) + t[13] - 40341101 | 0, o2 = (o2 << 12 | o2 >>> 20) + n2 | 0, s3 += (o2 & n2 | ~o2 & i3) + t[14] - 1502002290 | 0, s3 = (s3 << 17 | s3 >>> 15) + o2 | 0, i3 += (s3 & o2 | ~s3 & n2) + t[15] + 1236535329 | 0, i3 = (i3 << 22 | i3 >>> 10) + s3 | 0, n2 += (i3 & o2 | s3 & ~o2) + t[1] - 165796510 | 0, n2 = (n2 << 5 | n2 >>> 27) + i3 | 0, o2 += (n2 & s3 | i3 & ~s3) + t[6] - 1069501632 | 0, o2 = (o2 << 9 | o2 >>> 23) + n2 | 0, s3 += (o2 & i3 | n2 & ~i3) + t[11] + 643717713 | 0, s3 = (s3 << 14 | s3 >>> 18) + o2 | 0, i3 += (s3 & n2 | o2 & ~n2) + t[0] - 373897302 | 0, i3 = (i3 << 20 | i3 >>> 12) + s3 | 0, n2 += (i3 & o2 | s3 & ~o2) + t[5] - 701558691 | 0, n2 = (n2 << 5 | n2 >>> 27) + i3 | 0, o2 += (n2 & s3 | i3 & ~s3) + t[10] + 38016083 | 0, o2 = (o2 << 9 | o2 >>> 23) + n2 | 0, s3 += (o2 & i3 | n2 & ~i3) + t[15] - 660478335 | 0, s3 = (s3 << 14 | s3 >>> 18) + o2 | 0, i3 += (s3 & n2 | o2 & ~n2) + t[4] - 405537848 | 0, i3 = (i3 << 20 | i3 >>> 12) + s3 | 0, n2 += (i3 & o2 | s3 & ~o2) + t[9] + 568446438 | 0, n2 = (n2 << 5 | n2 >>> 27) + i3 | 0, o2 += (n2 & s3 | i3 & ~s3) + t[14] - 1019803690 | 0, o2 = (o2 << 9 | o2 >>> 23) + n2 | 0, s3 += (o2 & i3 | n2 & ~i3) + t[3] - 187363961 | 0, s3 = (s3 << 14 | s3 >>> 18) + o2 | 0, i3 += (s3 & n2 | o2 & ~n2) + t[8] + 1163531501 | 0, i3 = (i3 << 20 | i3 >>> 12) + s3 | 0, n2 += (i3 & o2 | s3 & ~o2) + t[13] - 1444681467 | 0, n2 = (n2 << 5 | n2 >>> 27) + i3 | 0, o2 += (n2 & s3 | i3 & ~s3) + t[2] - 51403784 | 0, o2 = (o2 << 9 | o2 >>> 23) + n2 | 0, s3 += (o2 & i3 | n2 & ~i3) + t[7] + 1735328473 | 0, s3 = (s3 << 14 | s3 >>> 18) + o2 | 0, i3 += (s3 & n2 | o2 & ~n2) + t[12] - 1926607734 | 0, i3 = (i3 << 20 | i3 >>> 12) + s3 | 0, n2 += (i3 ^ s3 ^ o2) + t[5] - 378558 | 0, n2 = (n2 << 4 | n2 >>> 28) + i3 | 0, o2 += (n2 ^ i3 ^ s3) + t[8] - 2022574463 | 0, o2 = (o2 << 11 | o2 >>> 21) + n2 | 0, s3 += (o2 ^ n2 ^ i3) + t[11] + 1839030562 | 0, s3 = (s3 << 16 | s3 >>> 16) + o2 | 0, i3 += (s3 ^ o2 ^ n2) + t[14] - 35309556 | 0, i3 = (i3 << 23 | i3 >>> 9) + s3 | 0, n2 += (i3 ^ s3 ^ o2) + t[1] - 1530992060 | 0, n2 = (n2 << 4 | n2 >>> 28) + i3 | 0, o2 += (n2 ^ i3 ^ s3) + t[4] + 1272893353 | 0, o2 = (o2 << 11 | o2 >>> 21) + n2 | 0, s3 += (o2 ^ n2 ^ i3) + t[7] - 155497632 | 0, s3 = (s3 << 16 | s3 >>> 16) + o2 | 0, i3 += (s3 ^ o2 ^ n2) + t[10] - 1094730640 | 0, i3 = (i3 << 23 | i3 >>> 9) + s3 | 0, n2 += (i3 ^ s3 ^ o2) + t[13] + 681279174 | 0, n2 = (n2 << 4 | n2 >>> 28) + i3 | 0, o2 += (n2 ^ i3 ^ s3) + t[0] - 358537222 | 0, o2 = (o2 << 11 | o2 >>> 21) + n2 | 0, s3 += (o2 ^ n2 ^ i3) + t[3] - 722521979 | 0, s3 = (s3 << 16 | s3 >>> 16) + o2 | 0, i3 += (s3 ^ o2 ^ n2) + t[6] + 76029189 | 0, i3 = (i3 << 23 | i3 >>> 9) + s3 | 0, n2 += (i3 ^ s3 ^ o2) + t[9] - 640364487 | 0, n2 = (n2 << 4 | n2 >>> 28) + i3 | 0, o2 += (n2 ^ i3 ^ s3) + t[12] - 421815835 | 0, o2 = (o2 << 11 | o2 >>> 21) + n2 | 0, s3 += (o2 ^ n2 ^ i3) + t[15] + 530742520 | 0, s3 = (s3 << 16 | s3 >>> 16) + o2 | 0, i3 += (s3 ^ o2 ^ n2) + t[2] - 995338651 | 0, i3 = (i3 << 23 | i3 >>> 9) + s3 | 0, n2 += (s3 ^ (i3 | ~o2)) + t[0] - 198630844 | 0, n2 = (n2 << 6 | n2 >>> 26) + i3 | 0, o2 += (i3 ^ (n2 | ~s3)) + t[7] + 1126891415 | 0, o2 = (o2 << 10 | o2 >>> 22) + n2 | 0, s3 += (n2 ^ (o2 | ~i3)) + t[14] - 1416354905 | 0, s3 = (s3 << 15 | s3 >>> 17) + o2 | 0, i3 += (o2 ^ (s3 | ~n2)) + t[5] - 57434055 | 0, i3 = (i3 << 21 | i3 >>> 11) + s3 | 0, n2 += (s3 ^ (i3 | ~o2)) + t[12] + 1700485571 | 0, n2 = (n2 << 6 | n2 >>> 26) + i3 | 0, o2 += (i3 ^ (n2 | ~s3)) + t[3] - 1894986606 | 0, o2 = (o2 << 10 | o2 >>> 22) + n2 | 0, s3 += (n2 ^ (o2 | ~i3)) + t[10] - 1051523 | 0, s3 = (s3 << 15 | s3 >>> 17) + o2 | 0, i3 += (o2 ^ (s3 | ~n2)) + t[1] - 2054922799 | 0, i3 = (i3 << 21 | i3 >>> 11) + s3 | 0, n2 += (s3 ^ (i3 | ~o2)) + t[8] + 1873313359 | 0, n2 = (n2 << 6 | n2 >>> 26) + i3 | 0, o2 += (i3 ^ (n2 | ~s3)) + t[15] - 30611744 | 0, o2 = (o2 << 10 | o2 >>> 22) + n2 | 0, s3 += (n2 ^ (o2 | ~i3)) + t[6] - 1560198380 | 0, s3 = (s3 << 15 | s3 >>> 17) + o2 | 0, i3 += (o2 ^ (s3 | ~n2)) + t[13] + 1309151649 | 0, i3 = (i3 << 21 | i3 >>> 11) + s3 | 0, n2 += (s3 ^ (i3 | ~o2)) + t[4] - 145523070 | 0, n2 = (n2 << 6 | n2 >>> 26) + i3 | 0, o2 += (i3 ^ (n2 | ~s3)) + t[11] - 1120210379 | 0, o2 = (o2 << 10 | o2 >>> 22) + n2 | 0, s3 += (n2 ^ (o2 | ~i3)) + t[2] + 718787259 | 0, s3 = (s3 << 15 | s3 >>> 17) + o2 | 0, i3 += (o2 ^ (s3 | ~n2)) + t[9] - 343485551 | 0, i3 = (i3 << 21 | i3 >>> 11) + s3 | 0, e3[0] = n2 + e3[0] | 0, e3[1] = i3 + e3[1] | 0, e3[2] = s3 + e3[2] | 0, e3[3] = o2 + e3[3] | 0;
    }
    start() {
      return this._dataLength = 0, this._bufferLength = 0, this._state.set(U2.stateIdentity), this;
    }
    appendStr(e3) {
      let t = this._buffer8, n2 = this._buffer32, i3 = this._bufferLength, s3, o2;
      for (o2 = 0; o2 < e3.length; o2 += 1) {
        if (s3 = e3.charCodeAt(o2), s3 < 128) t[i3++] = s3;
        else if (s3 < 2048) t[i3++] = (s3 >>> 6) + 192, t[i3++] = s3 & 63 | 128;
        else if (s3 < 55296 || s3 > 56319) t[i3++] = (s3 >>> 12) + 224, t[i3++] = s3 >>> 6 & 63 | 128, t[i3++] = s3 & 63 | 128;
        else {
          if (s3 = (s3 - 55296) * 1024 + (e3.charCodeAt(++o2) - 56320) + 65536, s3 > 1114111) throw new Error(
            "Unicode standard supports code points up to U+10FFFF"
          );
          t[i3++] = (s3 >>> 18) + 240, t[i3++] = s3 >>> 12 & 63 | 128, t[i3++] = s3 >>> 6 & 63 | 128, t[i3++] = s3 & 63 | 128;
        }
        i3 >= 64 && (this._dataLength += 64, U2._md5cycle(this._state, n2), i3 -= 64, n2[0] = n2[16]);
      }
      return this._bufferLength = i3, this;
    }
    appendAsciiStr(e3) {
      let t = this._buffer8, n2 = this._buffer32, i3 = this._bufferLength, s3, o2 = 0;
      for (; ; ) {
        for (s3 = Math.min(e3.length - o2, 64 - i3); s3--; ) t[i3++] = e3.charCodeAt(o2++);
        if (i3 < 64) break;
        this._dataLength += 64, U2._md5cycle(this._state, n2), i3 = 0;
      }
      return this._bufferLength = i3, this;
    }
    appendByteArray(e3) {
      let t = this._buffer8, n2 = this._buffer32, i3 = this._bufferLength, s3, o2 = 0;
      for (; ; ) {
        for (s3 = Math.min(e3.length - o2, 64 - i3); s3--; ) t[i3++] = e3[o2++];
        if (i3 < 64) break;
        this._dataLength += 64, U2._md5cycle(this._state, n2), i3 = 0;
      }
      return this._bufferLength = i3, this;
    }
    getState() {
      let e3 = this._state;
      return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e3[0], e3[1], e3[2], e3[3]] };
    }
    setState(e3) {
      let t = e3.buffer, n2 = e3.state, i3 = this._state, s3;
      for (this._dataLength = e3.length, this._bufferLength = e3.buflen, i3[0] = n2[0], i3[1] = n2[1], i3[2] = n2[2], i3[3] = n2[3], s3 = 0; s3 < t.length; s3 += 1) this._buffer8[s3] = t.charCodeAt(s3);
    }
    end(e3 = false) {
      let t = this._bufferLength, n2 = this._buffer8, i3 = this._buffer32, s3 = (t >> 2) + 1;
      this._dataLength += t;
      let o2 = this._dataLength * 8;
      if (n2[t] = 128, n2[t + 1] = n2[t + 2] = n2[t + 3] = 0, i3.set(U2.buffer32Identity.subarray(s3), s3), t > 55 && (U2._md5cycle(this._state, i3), i3.set(U2.buffer32Identity)), o2 <= 4294967295) i3[14] = o2;
      else {
        let u2 = o2.toString(16).match(/(.*?)(.{0,8})$/);
        if (u2 === null) return;
        let c2 = parseInt(
          u2[2],
          16
        ), l2 = parseInt(u2[1], 16) || 0;
        i3[14] = c2, i3[15] = l2;
      }
      return U2._md5cycle(this._state, i3), e3 ? this._state : U2._hex(
        this._state
      );
    }
  };
  a(U, "Md5"), E(U, "stateIdentity", new Int32Array([1732584193, -271733879, -1732584194, 271733878])), E(U, "buffer32Identity", new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), E(U, "hexChars", "0123456789abcdef"), E(U, "hexOut", []), E(U, "onePassHasher", new U());
  et = U;
});
var lr = {};
ie(lr, { createHash: /* @__PURE__ */ __name(() => bu, "createHash"), createHmac: /* @__PURE__ */ __name(() => vu, "createHmac"), randomBytes: /* @__PURE__ */ __name(() => gu, "randomBytes") });
function gu(r2) {
  return crypto.getRandomValues(d.alloc(r2));
}
__name(gu, "gu");
function bu(r2) {
  if (r2 === "sha256") return { update: a(function(e3) {
    return { digest: a(
      function() {
        return d.from(Xe(e3));
      },
      "digest"
    ) };
  }, "update") };
  if (r2 === "md5") return { update: a(function(e3) {
    return {
      digest: a(function() {
        return typeof e3 == "string" ? et.hashStr(e3) : et.hashByteArray(e3);
      }, "digest")
    };
  }, "update") };
  throw new Error(`Hash type '${r2}' not supported`);
}
__name(bu, "bu");
function vu(r2, e3) {
  if (r2 !== "sha256") throw new Error(`Only sha256 is supported (requested: '${r2}')`);
  return { update: a(function(t) {
    return { digest: a(
      function() {
        typeof e3 == "string" && (e3 = new TextEncoder().encode(e3)), typeof t == "string" && (t = new TextEncoder().encode(
          t
        ));
        let n2 = e3.length;
        if (n2 > 64) e3 = Xe(e3);
        else if (n2 < 64) {
          let c2 = new Uint8Array(64);
          c2.set(e3), e3 = c2;
        }
        let i3 = new Uint8Array(
          64
        ), s3 = new Uint8Array(64);
        for (let c2 = 0; c2 < 64; c2++) i3[c2] = 54 ^ e3[c2], s3[c2] = 92 ^ e3[c2];
        let o2 = new Uint8Array(t.length + 64);
        o2.set(i3, 0), o2.set(t, 64);
        let u2 = new Uint8Array(96);
        return u2.set(s3, 0), u2.set(Xe(o2), 64), d.from(Xe(u2));
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
  hr.exports.__defineSetter__("parseInt8", function(r2) {
    Me.setTypeParser(20, "text", r2 ? Me.getTypeParser(
      23,
      "text"
    ) : xu), Me.setTypeParser(1016, "text", r2 ? Me.getTypeParser(1007, "text") : Su);
  });
});
var rt = T((Wf, ns) => {
  "use strict";
  p();
  var Eu = (fr(), O(lr)), Au = tt();
  function Cu(r2) {
    var e3 = r2.replace(
      /\\/g,
      "\\\\"
    ).replace(/"/g, '\\"');
    return '"' + e3 + '"';
  }
  __name(Cu, "Cu");
  a(Cu, "escapeElement");
  function rs(r2) {
    for (var e3 = "{", t = 0; t < r2.length; t++) t > 0 && (e3 = e3 + ","), r2[t] === null || typeof r2[t] > "u" ? e3 = e3 + "NULL" : Array.isArray(r2[t]) ? e3 = e3 + rs(r2[t]) : r2[t] instanceof d ? e3 += "\\\\x" + r2[t].toString("hex") : e3 += Cu(Ct(r2[t]));
    return e3 = e3 + "}", e3;
  }
  __name(rs, "rs");
  a(rs, "arrayString");
  var Ct = a(function(r2, e3) {
    if (r2 == null) return null;
    if (r2 instanceof d) return r2;
    if (ArrayBuffer.isView(r2)) {
      var t = d.from(r2.buffer, r2.byteOffset, r2.byteLength);
      return t.length === r2.byteLength ? t : t.slice(r2.byteOffset, r2.byteOffset + r2.byteLength);
    }
    return r2 instanceof Date ? Au.parseInputDatesAsUTC ? Tu(r2) : Iu(r2) : Array.isArray(r2) ? rs(r2) : typeof r2 == "object" ? _u(r2, e3) : r2.toString();
  }, "prepareValue");
  function _u(r2, e3) {
    if (r2 && typeof r2.toPostgres == "function") {
      if (e3 = e3 || [], e3.indexOf(r2) !== -1) throw new Error('circular reference detected while preparing "' + r2 + '" for query');
      return e3.push(r2), Ct(r2.toPostgres(Ct), e3);
    }
    return JSON.stringify(r2);
  }
  __name(_u, "_u");
  a(_u, "prepareObject");
  function N(r2, e3) {
    for (r2 = "" + r2; r2.length < e3; ) r2 = "0" + r2;
    return r2;
  }
  __name(N, "N");
  a(N, "pad");
  function Iu(r2) {
    var e3 = -r2.getTimezoneOffset(), t = r2.getFullYear(), n2 = t < 1;
    n2 && (t = Math.abs(t) + 1);
    var i3 = N(t, 4) + "-" + N(r2.getMonth() + 1, 2) + "-" + N(r2.getDate(), 2) + "T" + N(
      r2.getHours(),
      2
    ) + ":" + N(r2.getMinutes(), 2) + ":" + N(r2.getSeconds(), 2) + "." + N(r2.getMilliseconds(), 3);
    return e3 < 0 ? (i3 += "-", e3 *= -1) : i3 += "+", i3 += N(Math.floor(e3 / 60), 2) + ":" + N(e3 % 60, 2), n2 && (i3 += " BC"), i3;
  }
  __name(Iu, "Iu");
  a(Iu, "dateToString");
  function Tu(r2) {
    var e3 = r2.getUTCFullYear(), t = e3 < 1;
    t && (e3 = Math.abs(e3) + 1);
    var n2 = N(e3, 4) + "-" + N(r2.getUTCMonth() + 1, 2) + "-" + N(r2.getUTCDate(), 2) + "T" + N(r2.getUTCHours(), 2) + ":" + N(r2.getUTCMinutes(), 2) + ":" + N(r2.getUTCSeconds(), 2) + "." + N(
      r2.getUTCMilliseconds(),
      3
    );
    return n2 += "+00:00", t && (n2 += " BC"), n2;
  }
  __name(Tu, "Tu");
  a(Tu, "dateToStringUTC");
  function Pu(r2, e3, t) {
    return r2 = typeof r2 == "string" ? { text: r2 } : r2, e3 && (typeof e3 == "function" ? r2.callback = e3 : r2.values = e3), t && (r2.callback = t), r2;
  }
  __name(Pu, "Pu");
  a(Pu, "normalizeQueryConfig");
  var pr = a(function(r2) {
    return Eu.createHash("md5").update(r2, "utf-8").digest("hex");
  }, "md5"), Bu = a(
    function(r2, e3, t) {
      var n2 = pr(e3 + r2), i3 = pr(d.concat([d.from(n2), t]));
      return "md5" + i3;
    },
    "postgresMd5PasswordHash"
  );
  ns.exports = {
    prepareValue: a(function(e3) {
      return Ct(e3);
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
  function Mu(r2) {
    if (r2.indexOf("SCRAM-SHA-256") === -1) throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    let e3 = yr.randomBytes(
      18
    ).toString("base64");
    return { mechanism: "SCRAM-SHA-256", clientNonce: e3, response: "n,,n=*,r=" + e3, message: "SASLInitialResponse" };
  }
  __name(Mu, "Mu");
  a(Mu, "startSession");
  function Uu(r2, e3, t) {
    if (r2.message !== "SASLInitialResponse") throw new Error(
      "SASL: Last message was not SASLInitialResponse"
    );
    if (typeof e3 != "string") throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
    if (typeof t != "string") throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    let n2 = qu(t);
    if (n2.nonce.startsWith(r2.clientNonce)) {
      if (n2.nonce.length === r2.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    var i3 = d.from(n2.salt, "base64"), s3 = Wu(e3, i3, n2.iteration), o2 = Ue(s3, "Client Key"), u2 = Nu(
      o2
    ), c2 = "n=*,r=" + r2.clientNonce, l2 = "r=" + n2.nonce + ",s=" + n2.salt + ",i=" + n2.iteration, f2 = "c=biws,r=" + n2.nonce, y2 = c2 + "," + l2 + "," + f2, g = Ue(u2, y2), A = hs(o2, g), C = A.toString("base64"), D = Ue(s3, "Server Key"), Y = Ue(D, y2);
    r2.message = "SASLResponse", r2.serverSignature = Y.toString("base64"), r2.response = f2 + ",p=" + C;
  }
  __name(Uu, "Uu");
  a(Uu, "continueSession");
  function Du(r2, e3) {
    if (r2.message !== "SASLResponse") throw new Error("SASL: Last message was not SASLResponse");
    if (typeof e3 != "string") throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    let { serverSignature: t } = Qu(
      e3
    );
    if (t !== r2.serverSignature) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
  __name(Du, "Du");
  a(Du, "finalizeSession");
  function Ou(r2) {
    if (typeof r2 != "string") throw new TypeError("SASL: text must be a string");
    return r2.split("").map((e3, t) => r2.charCodeAt(t)).every((e3) => e3 >= 33 && e3 <= 43 || e3 >= 45 && e3 <= 126);
  }
  __name(Ou, "Ou");
  a(Ou, "isPrintableChars");
  function ls(r2) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r2);
  }
  __name(ls, "ls");
  a(ls, "isBase64");
  function fs(r2) {
    if (typeof r2 != "string") throw new TypeError("SASL: attribute pairs text must be a string");
    return new Map(r2.split(",").map((e3) => {
      if (!/^.=/.test(e3)) throw new Error("SASL: Invalid attribute pair entry");
      let t = e3[0], n2 = e3.substring(2);
      return [t, n2];
    }));
  }
  __name(fs, "fs");
  a(fs, "parseAttributePairs");
  function qu(r2) {
    let e3 = fs(r2), t = e3.get("r");
    if (t) {
      if (!Ou(t)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    let n2 = e3.get("s");
    if (n2) {
      if (!ls(n2)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    let i3 = e3.get("i");
    if (i3) {
      if (!/^[1-9][0-9]*$/.test(i3)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    } else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    let s3 = parseInt(i3, 10);
    return { nonce: t, salt: n2, iteration: s3 };
  }
  __name(qu, "qu");
  a(qu, "parseServerFirstMessage");
  function Qu(r2) {
    let t = fs(r2).get("v");
    if (t) {
      if (!ls(t)) throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    } else throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
    return { serverSignature: t };
  }
  __name(Qu, "Qu");
  a(Qu, "parseServerFinalMessage");
  function hs(r2, e3) {
    if (!d.isBuffer(r2)) throw new TypeError("first argument must be a Buffer");
    if (!d.isBuffer(e3)) throw new TypeError(
      "second argument must be a Buffer"
    );
    if (r2.length !== e3.length) throw new Error("Buffer lengths must match");
    if (r2.length === 0) throw new Error("Buffers cannot be empty");
    return d.from(r2.map((t, n2) => r2[n2] ^ e3[n2]));
  }
  __name(hs, "hs");
  a(hs, "xorBuffers");
  function Nu(r2) {
    return yr.createHash("sha256").update(r2).digest();
  }
  __name(Nu, "Nu");
  a(Nu, "sha256");
  function Ue(r2, e3) {
    return yr.createHmac("sha256", r2).update(e3).digest();
  }
  __name(Ue, "Ue");
  a(Ue, "hmacSha256");
  function Wu(r2, e3, t) {
    for (var n2 = Ue(
      r2,
      d.concat([e3, d.from([0, 0, 0, 1])])
    ), i3 = n2, s3 = 0; s3 < t - 1; s3++) n2 = Ue(r2, n2), i3 = hs(i3, n2);
    return i3;
  }
  __name(Wu, "Wu");
  a(Wu, "Hi");
  ps.exports = { startSession: Mu, continueSession: Uu, finalizeSession: Du };
});
var mr = {};
ie(mr, { join: /* @__PURE__ */ __name(() => ju, "join") });
function ju(...r2) {
  return r2.join("/");
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
function Hu(r2, e3) {
  e3(new Error("No filesystem"));
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
    constructor(e3) {
      E(this, "td");
      this.td = new TextDecoder(e3);
    }
    write(e3) {
      return this.td.decode(e3, { stream: true });
    }
    end(e3) {
      return this.td.decode(e3);
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
  function zu(r2, e3, t) {
    let n2;
    if (this.overflow) {
      if (n2 = this[It].write(r2).split(
        this.matcher
      ), n2.length === 1) return t();
      n2.shift(), this.overflow = false;
    } else this[ve] += this[It].write(r2), n2 = this[ve].split(this.matcher);
    this[ve] = n2.pop();
    for (let i3 = 0; i3 < n2.length; i3++) try {
      gs(this, this.mapper(n2[i3]));
    } catch (s3) {
      return t(s3);
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
  function Ku(r2) {
    if (this[ve] += this[It].end(), this[ve])
      try {
        gs(this, this.mapper(this[ve]));
      } catch (e3) {
        return r2(e3);
      }
    r2();
  }
  __name(Ku, "Ku");
  a(Ku, "flush");
  function gs(r2, e3) {
    e3 !== void 0 && r2.push(e3);
  }
  __name(gs, "gs");
  a(gs, "push");
  function ws(r2) {
    return r2;
  }
  __name(ws, "ws");
  a(ws, "noop");
  function Yu(r2, e3, t) {
    switch (r2 = r2 || /\r?\n/, e3 = e3 || ws, t = t || {}, arguments.length) {
      case 1:
        typeof r2 == "function" ? (e3 = r2, r2 = /\r?\n/) : typeof r2 == "object" && !(r2 instanceof RegExp) && !r2[Symbol.split] && (t = r2, r2 = /\r?\n/);
        break;
      case 2:
        typeof r2 == "function" ? (t = e3, e3 = r2, r2 = /\r?\n/) : typeof e3 == "object" && (t = e3, e3 = ws);
    }
    t = Object.assign({}, t), t.autoDestroy = true, t.transform = zu, t.flush = Ku, t.readableObjectMode = true;
    let n2 = new Gu(t);
    return n2[ve] = "", n2[It] = new Vu("utf8"), n2.matcher = r2, n2.mapper = e3, n2.maxLength = t.maxLength, n2.skipOverflow = t.skipOverflow || false, n2.overflow = false, n2._destroy = function(i3, s3) {
      this._writableState.errorEmitted = false, s3(i3);
    }, n2;
  }
  __name(Yu, "Yu");
  a(Yu, "split");
  bs.exports = Yu;
});
var Es = T((dh, pe) => {
  "use strict";
  p();
  var xs = (wr(), O(mr)), Zu = (xr(), O(vr)).Stream, Ju = vs(), Ss = (it(), O(nt)), Xu = 5432, Tt = m.platform === "win32", st = m.stderr, ec = 56, tc = 7, rc = 61440, nc = 32768;
  function ic(r2) {
    return (r2 & rc) == nc;
  }
  __name(ic, "ic");
  a(ic, "isRegFile");
  var De = ["host", "port", "database", "user", "password"], Ar = De.length, sc = De[Ar - 1];
  function Cr() {
    var r2 = st instanceof Zu && st.writable === true;
    if (r2) {
      var e3 = Array.prototype.slice.call(arguments).concat(`
`);
      st.write(Ss.format.apply(Ss, e3));
    }
  }
  __name(Cr, "Cr");
  a(Cr, "warn");
  Object.defineProperty(pe.exports, "isWin", { get: a(function() {
    return Tt;
  }, "get"), set: a(function(r2) {
    Tt = r2;
  }, "set") });
  pe.exports.warnTo = function(r2) {
    var e3 = st;
    return st = r2, e3;
  };
  pe.exports.getFileName = function(r2) {
    var e3 = r2 || m.env, t = e3.PGPASSFILE || (Tt ? xs.join(e3.APPDATA || "./", "postgresql", "pgpass.conf") : xs.join(e3.HOME || "./", ".pgpass"));
    return t;
  };
  pe.exports.usePgPass = function(r2, e3) {
    return Object.prototype.hasOwnProperty.call(m.env, "PGPASSWORD") ? false : Tt ? true : (e3 = e3 || "<unkn>", ic(r2.mode) ? r2.mode & (ec | tc) ? (Cr('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e3), false) : true : (Cr('WARNING: password file "%s" is not a plain file', e3), false));
  };
  var oc = pe.exports.match = function(r2, e3) {
    return De.slice(0, -1).reduce(function(t, n2, i3) {
      return i3 == 1 && Number(r2[n2] || Xu) === Number(
        e3[n2]
      ) ? t && true : t && (e3[n2] === "*" || e3[n2] === r2[n2]);
    }, true);
  };
  pe.exports.getPassword = function(r2, e3, t) {
    var n2, i3 = e3.pipe(
      Ju()
    );
    function s3(c2) {
      var l2 = ac(c2);
      l2 && uc(l2) && oc(r2, l2) && (n2 = l2[sc], i3.end());
    }
    __name(s3, "s");
    a(s3, "onLine");
    var o2 = a(function() {
      e3.destroy(), t(n2);
    }, "onEnd"), u2 = a(function(c2) {
      e3.destroy(), Cr("WARNING: error on reading file: %s", c2), t(
        void 0
      );
    }, "onErr");
    e3.on("error", u2), i3.on("data", s3).on("end", o2).on("error", u2);
  };
  var ac = pe.exports.parseLine = function(r2) {
    if (r2.length < 11 || r2.match(/^\s+#/)) return null;
    for (var e3 = "", t = "", n2 = 0, i3 = 0, s3 = 0, o2 = {}, u2 = false, c2 = a(
      function(f2, y2, g) {
        var A = r2.substring(y2, g);
        Object.hasOwnProperty.call(m.env, "PGPASS_NO_DEESCAPE") || (A = A.replace(/\\([:\\])/g, "$1")), o2[De[f2]] = A;
      },
      "addToObj"
    ), l2 = 0; l2 < r2.length - 1; l2 += 1) {
      if (e3 = r2.charAt(l2 + 1), t = r2.charAt(
        l2
      ), u2 = n2 == Ar - 1, u2) {
        c2(n2, i3);
        break;
      }
      l2 >= 0 && e3 == ":" && t !== "\\" && (c2(n2, i3, l2 + 1), i3 = l2 + 2, n2 += 1);
    }
    return o2 = Object.keys(o2).length === Ar ? o2 : null, o2;
  }, uc = pe.exports.isValidEntry = function(r2) {
    for (var e3 = { 0: function(o2) {
      return o2.length > 0;
    }, 1: function(o2) {
      return o2 === "*" ? true : (o2 = Number(o2), isFinite(o2) && o2 > 0 && o2 < 9007199254740992 && Math.floor(o2) === o2);
    }, 2: function(o2) {
      return o2.length > 0;
    }, 3: function(o2) {
      return o2.length > 0;
    }, 4: function(o2) {
      return o2.length > 0;
    } }, t = 0; t < De.length; t += 1) {
      var n2 = e3[t], i3 = r2[De[t]] || "", s3 = n2(i3);
      if (!s3) return false;
    }
    return true;
  };
});
var Cs = T((gh, _r) => {
  "use strict";
  p();
  var wh = (wr(), O(mr)), As = (br(), O(gr)), Pt = Es();
  _r.exports = function(r2, e3) {
    var t = Pt.getFileName();
    As.stat(t, function(n2, i3) {
      if (n2 || !Pt.usePgPass(i3, t)) return e3(void 0);
      var s3 = As.createReadStream(
        t
      );
      Pt.getPassword(r2, s3, e3);
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
  function Tr(r2) {
    if (r2.charAt(0) === "/") {
      var t = r2.split(" ");
      return { host: t[0], database: t[1] };
    }
    var e3 = lc.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r2) ? encodeURI(r2).replace(/\%25(\d\d)/g, "%$1") : r2, true), t = e3.query;
    for (var n2 in t) Array.isArray(t[n2]) && (t[n2] = t[n2][t[n2].length - 1]);
    var i3 = (e3.auth || ":").split(":");
    if (t.user = i3[0], t.password = i3.splice(1).join(
      ":"
    ), t.port = e3.port, e3.protocol == "socket:") return t.host = decodeURI(e3.pathname), t.database = e3.query.db, t.client_encoding = e3.query.encoding, t;
    t.host || (t.host = e3.hostname);
    var s3 = e3.pathname;
    if (!t.host && s3 && /^%2f/i.test(s3)) {
      var o2 = s3.split("/");
      t.host = decodeURIComponent(o2[0]), s3 = o2.splice(1).join("/");
    }
    switch (s3 && s3.charAt(
      0
    ) === "/" && (s3 = s3.slice(1) || null), t.database = s3 && decodeURI(s3), (t.ssl === "true" || t.ssl === "1") && (t.ssl = true), t.ssl === "0" && (t.ssl = false), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = Ir.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = Ir.readFileSync(t.sslkey).toString()), t.sslrootcert && (t.ssl.ca = Ir.readFileSync(t.sslrootcert).toString()), t.sslmode) {
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
  var fc = (Is(), O(_s)), Rs = tt(), Bs = Ps().parse, H = a(function(r2, e3, t) {
    return t === void 0 ? t = m.env["PG" + r2.toUpperCase()] : t === false || (t = m.env[t]), e3[r2] || t || Rs[r2];
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
  }, "readSSLConfigFromEnvironment"), Oe = a(function(r2) {
    return "'" + ("" + r2).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  }, "quoteParamValue"), ne2 = a(function(r2, e3, t) {
    var n2 = e3[t];
    n2 != null && r2.push(t + "=" + Oe(n2));
  }, "add"), Br = class Br {
    static {
      __name(this, "Br");
    }
    constructor(e3) {
      e3 = typeof e3 == "string" ? Bs(e3) : e3 || {}, e3.connectionString && (e3 = Object.assign({}, e3, Bs(e3.connectionString))), this.user = H("user", e3), this.database = H("database", e3), this.database === void 0 && (this.database = this.user), this.port = parseInt(H("port", e3), 10), this.host = H("host", e3), Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: H("password", e3)
      }), this.binary = H("binary", e3), this.options = H("options", e3), this.ssl = typeof e3.ssl > "u" ? hc() : e3.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = H("client_encoding", e3), this.replication = H("replication", e3), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = H("application_name", e3, "PGAPPNAME"), this.fallback_application_name = H("fallback_application_name", e3, false), this.statement_timeout = H("statement_timeout", e3, false), this.lock_timeout = H("lock_timeout", e3, false), this.idle_in_transaction_session_timeout = H("idle_in_transaction_session_timeout", e3, false), this.query_timeout = H("query_timeout", e3, false), e3.connectionTimeoutMillis === void 0 ? this.connect_timeout = m.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e3.connectionTimeoutMillis / 1e3), e3.keepAlive === false ? this.keepalives = 0 : e3.keepAlive === true && (this.keepalives = 1), typeof e3.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e3.keepAliveInitialDelayMillis / 1e3));
    }
    getLibpqConnectionString(e3) {
      var t = [];
      ne2(t, this, "user"), ne2(t, this, "password"), ne2(t, this, "port"), ne2(t, this, "application_name"), ne2(
        t,
        this,
        "fallback_application_name"
      ), ne2(t, this, "connect_timeout"), ne2(t, this, "options");
      var n2 = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      if (ne2(t, n2, "sslmode"), ne2(t, n2, "sslca"), ne2(t, n2, "sslkey"), ne2(t, n2, "sslcert"), ne2(t, n2, "sslrootcert"), this.database && t.push("dbname=" + Oe(this.database)), this.replication && t.push("replication=" + Oe(this.replication)), this.host && t.push("host=" + Oe(this.host)), this.isDomainSocket) return e3(null, t.join(" "));
      this.client_encoding && t.push("client_encoding=" + Oe(this.client_encoding)), fc.lookup(this.host, function(i3, s3) {
        return i3 ? e3(i3, null) : (t.push("hostaddr=" + Oe(s3)), e3(null, t.join(" ")));
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
    constructor(e3, t) {
      this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t, this.RowCtor = null, this.rowAsArray = e3 === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
    }
    addCommandComplete(e3) {
      var t;
      e3.text ? t = Fs.exec(e3.text) : t = Fs.exec(e3.command), t && (this.command = t[1], t[3] ? (this.oid = parseInt(
        t[2],
        10
      ), this.rowCount = parseInt(t[3], 10)) : t[2] && (this.rowCount = parseInt(t[2], 10)));
    }
    _parseRowAsArray(e3) {
      for (var t = new Array(
        e3.length
      ), n2 = 0, i3 = e3.length; n2 < i3; n2++) {
        var s3 = e3[n2];
        s3 !== null ? t[n2] = this._parsers[n2](s3) : t[n2] = null;
      }
      return t;
    }
    parseRow(e3) {
      for (var t = {}, n2 = 0, i3 = e3.length; n2 < i3; n2++) {
        var s3 = e3[n2], o2 = this.fields[n2].name;
        s3 !== null ? t[o2] = this._parsers[n2](
          s3
        ) : t[o2] = null;
      }
      return t;
    }
    addRow(e3) {
      this.rows.push(e3);
    }
    addFields(e3) {
      this.fields = e3, this.fields.length && (this._parsers = new Array(e3.length));
      for (var t = 0; t < e3.length; t++) {
        var n2 = e3[t];
        this._types ? this._parsers[t] = this._types.getTypeParser(n2.dataTypeID, n2.format || "text") : this._parsers[t] = pc.getTypeParser(n2.dataTypeID, n2.format || "text");
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
    constructor(e3, t, n2) {
      super(), e3 = Ds.normalizeQueryConfig(e3, t, n2), this.text = e3.text, this.values = e3.values, this.rows = e3.rows, this.types = e3.types, this.name = e3.name, this.binary = e3.binary, this.portal = e3.portal || "", this.callback = e3.callback, this._rowMode = e3.rowMode, m.domain && e3.callback && (this.callback = m.domain.bind(e3.callback)), this._result = new Us(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
    }
    requiresPreparation() {
      return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
    }
    _checkForMultirow() {
      this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new Us(this._rowMode, this.types), this._results.push(this._result));
    }
    handleRowDescription(e3) {
      this._checkForMultirow(), this._result.addFields(e3.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(e3) {
      let t;
      if (!this._canceledDueToError) {
        try {
          t = this._result.parseRow(
            e3.fields
          );
        } catch (n2) {
          this._canceledDueToError = n2;
          return;
        }
        this.emit("row", t, this._result), this._accumulateRows && this._result.addRow(t);
      }
    }
    handleCommandComplete(e3, t) {
      this._checkForMultirow(), this._result.addCommandComplete(
        e3
      ), this.rows && t.sync();
    }
    handleEmptyQuery(e3) {
      this.rows && e3.sync();
    }
    handleError(e3, t) {
      if (this._canceledDueToError && (e3 = this._canceledDueToError, this._canceledDueToError = false), this.callback) return this.callback(e3);
      this.emit("error", e3);
    }
    handleReadyForQuery(e3) {
      if (this._canceledDueToError) return this.handleError(
        this._canceledDueToError,
        e3
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
    submit(e3) {
      if (typeof this.text != "string" && typeof this.name != "string") return new Error(
        "A query must have either text or a name. Supplying neither is unsupported."
      );
      let t = e3.parsedStatements[this.name];
      return this.text && t && this.text !== t ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(e3) : e3.query(this.text), null);
    }
    hasBeenParsed(e3) {
      return this.name && e3.parsedStatements[this.name];
    }
    handlePortalSuspended(e3) {
      this._getRows(e3, this.rows);
    }
    _getRows(e3, t) {
      e3.execute({ portal: this.portal, rows: t }), t ? e3.flush() : e3.sync();
    }
    prepare(e3) {
      this.isPreparedStatement = true, this.hasBeenParsed(e3) || e3.parse({ text: this.text, name: this.name, types: this.types });
      try {
        e3.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: Ds.prepareValue });
      } catch (t) {
        this.handleError(t, e3);
        return;
      }
      e3.describe({ type: "P", name: this.portal || "" }), this._getRows(e3, this.rows);
    }
    handleCopyInResponse(e3) {
      e3.sendCopyFail("No source stream defined");
    }
    handleCopyData(e3, t) {
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
    constructor(e3, t, n2) {
      super(e3), this.length = t, this.name = n2;
    }
  };
  a(Kr, "DatabaseError");
  var Mr = Kr;
  _.DatabaseError = Mr;
  var Yr = class Yr {
    static {
      __name(this, "Yr");
    }
    constructor(e3, t) {
      this.length = e3, this.chunk = t, this.name = "copyData";
    }
  };
  a(Yr, "CopyDataMessage");
  var Ur = Yr;
  _.CopyDataMessage = Ur;
  var Zr = class Zr {
    static {
      __name(this, "Zr");
    }
    constructor(e3, t, n2, i3) {
      this.length = e3, this.name = t, this.binary = n2, this.columnTypes = new Array(i3);
    }
  };
  a(Zr, "CopyResponse");
  var Dr = Zr;
  _.CopyResponse = Dr;
  var Jr = class Jr {
    static {
      __name(this, "Jr");
    }
    constructor(e3, t, n2, i3, s3, o2, u2) {
      this.name = e3, this.tableID = t, this.columnID = n2, this.dataTypeID = i3, this.dataTypeSize = s3, this.dataTypeModifier = o2, this.format = u2;
    }
  };
  a(Jr, "Field");
  var Or = Jr;
  _.Field = Or;
  var Xr = class Xr {
    static {
      __name(this, "Xr");
    }
    constructor(e3, t) {
      this.length = e3, this.fieldCount = t, this.name = "rowDescription", this.fields = new Array(this.fieldCount);
    }
  };
  a(Xr, "RowDescriptionMessage");
  var qr = Xr;
  _.RowDescriptionMessage = qr;
  var en = class en {
    static {
      __name(this, "en");
    }
    constructor(e3, t) {
      this.length = e3, this.parameterCount = t, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
    }
  };
  a(en, "ParameterDescriptionMessage");
  var Qr = en;
  _.ParameterDescriptionMessage = Qr;
  var tn = class tn {
    static {
      __name(this, "tn");
    }
    constructor(e3, t, n2) {
      this.length = e3, this.parameterName = t, this.parameterValue = n2, this.name = "parameterStatus";
    }
  };
  a(tn, "ParameterStatusMessage");
  var Nr = tn;
  _.ParameterStatusMessage = Nr;
  var rn = class rn {
    static {
      __name(this, "rn");
    }
    constructor(e3, t) {
      this.length = e3, this.salt = t, this.name = "authenticationMD5Password";
    }
  };
  a(rn, "AuthenticationMD5Password");
  var Wr = rn;
  _.AuthenticationMD5Password = Wr;
  var nn = class nn {
    static {
      __name(this, "nn");
    }
    constructor(e3, t, n2) {
      this.length = e3, this.processID = t, this.secretKey = n2, this.name = "backendKeyData";
    }
  };
  a(nn, "BackendKeyDataMessage");
  var jr = nn;
  _.BackendKeyDataMessage = jr;
  var sn = class sn {
    static {
      __name(this, "sn");
    }
    constructor(e3, t, n2, i3) {
      this.length = e3, this.processId = t, this.channel = n2, this.payload = i3, this.name = "notification";
    }
  };
  a(sn, "NotificationResponseMessage");
  var Hr = sn;
  _.NotificationResponseMessage = Hr;
  var on = class on {
    static {
      __name(this, "on");
    }
    constructor(e3, t) {
      this.length = e3, this.status = t, this.name = "readyForQuery";
    }
  };
  a(on, "ReadyForQueryMessage");
  var $r = on;
  _.ReadyForQueryMessage = $r;
  var an = class an {
    static {
      __name(this, "an");
    }
    constructor(e3, t) {
      this.length = e3, this.text = t, this.name = "commandComplete";
    }
  };
  a(an, "CommandCompleteMessage");
  var Gr = an;
  _.CommandCompleteMessage = Gr;
  var un = class un {
    static {
      __name(this, "un");
    }
    constructor(e3, t) {
      this.length = e3, this.fields = t, this.name = "dataRow", this.fieldCount = t.length;
    }
  };
  a(un, "DataRowMessage");
  var Vr = un;
  _.DataRowMessage = Vr;
  var cn = class cn {
    static {
      __name(this, "cn");
    }
    constructor(e3, t) {
      this.length = e3, this.message = t, this.name = "notice";
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
    constructor(e3 = 256) {
      this.size = e3, this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(e3);
    }
    ensure(e3) {
      if (this.buffer.length - this.offset < e3) {
        let n2 = this.buffer, i3 = n2.length + (n2.length >> 1) + e3;
        this.buffer = d.allocUnsafe(i3), n2.copy(
          this.buffer
        );
      }
    }
    addInt32(e3) {
      return this.ensure(4), this.buffer[this.offset++] = e3 >>> 24 & 255, this.buffer[this.offset++] = e3 >>> 16 & 255, this.buffer[this.offset++] = e3 >>> 8 & 255, this.buffer[this.offset++] = e3 >>> 0 & 255, this;
    }
    addInt16(e3) {
      return this.ensure(2), this.buffer[this.offset++] = e3 >>> 8 & 255, this.buffer[this.offset++] = e3 >>> 0 & 255, this;
    }
    addCString(e3) {
      if (!e3) this.ensure(1);
      else {
        let t = d.byteLength(e3);
        this.ensure(t + 1), this.buffer.write(e3, this.offset, "utf-8"), this.offset += t;
      }
      return this.buffer[this.offset++] = 0, this;
    }
    addString(e3 = "") {
      let t = d.byteLength(e3);
      return this.ensure(t), this.buffer.write(e3, this.offset), this.offset += t, this;
    }
    add(e3) {
      return this.ensure(
        e3.length
      ), e3.copy(this.buffer, this.offset), this.offset += e3.length, this;
    }
    join(e3) {
      if (e3) {
        this.buffer[this.headerPosition] = e3;
        let t = this.offset - (this.headerPosition + 1);
        this.buffer.writeInt32BE(t, this.headerPosition + 1);
      }
      return this.buffer.slice(e3 ? 0 : 5, this.offset);
    }
    flush(e3) {
      let t = this.join(e3);
      return this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(this.size), t;
    }
  };
  a(hn, "Writer");
  var fn2 = hn;
  Rt.Writer = fn2;
});
var Ws = T((Ft) => {
  "use strict";
  p();
  Object.defineProperty(Ft, "__esModule", { value: true });
  Ft.serialize = void 0;
  var pn = Qs(), F = new pn.Writer(), yc = a((r2) => {
    F.addInt16(3).addInt16(0);
    for (let n2 of Object.keys(r2)) F.addCString(
      n2
    ).addCString(r2[n2]);
    F.addCString("client_encoding").addCString("UTF8");
    let e3 = F.addCString("").flush(), t = e3.length + 4;
    return new pn.Writer().addInt32(t).add(e3).flush();
  }, "startup"), mc = a(() => {
    let r2 = d.allocUnsafe(
      8
    );
    return r2.writeInt32BE(8, 0), r2.writeInt32BE(80877103, 4), r2;
  }, "requestSsl"), wc = a((r2) => F.addCString(r2).flush(
    112
  ), "password"), gc = a(function(r2, e3) {
    return F.addCString(r2).addInt32(d.byteLength(e3)).addString(e3), F.flush(112);
  }, "sendSASLInitialResponseMessage"), bc = a(function(r2) {
    return F.addString(r2).flush(112);
  }, "sendSCRAMClientFinalMessage"), vc = a((r2) => F.addCString(r2).flush(81), "query"), Ns = [], xc = a((r2) => {
    let e3 = r2.name || "";
    e3.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e3, e3.length), console.error("This can cause conflicts and silent errors executing queries"));
    let t = r2.types || Ns, n2 = t.length, i3 = F.addCString(e3).addCString(r2.text).addInt16(n2);
    for (let s3 = 0; s3 < n2; s3++) i3.addInt32(t[s3]);
    return F.flush(80);
  }, "parse"), qe = new pn.Writer(), Sc = a(function(r2, e3) {
    for (let t = 0; t < r2.length; t++) {
      let n2 = e3 ? e3(r2[t], t) : r2[t];
      n2 == null ? (F.addInt16(0), qe.addInt32(-1)) : n2 instanceof d ? (F.addInt16(
        1
      ), qe.addInt32(n2.length), qe.add(n2)) : (F.addInt16(0), qe.addInt32(d.byteLength(n2)), qe.addString(n2));
    }
  }, "writeValues"), Ec = a((r2 = {}) => {
    let e3 = r2.portal || "", t = r2.statement || "", n2 = r2.binary || false, i3 = r2.values || Ns, s3 = i3.length;
    return F.addCString(e3).addCString(t), F.addInt16(s3), Sc(i3, r2.valueMapper), F.addInt16(s3), F.add(qe.flush()), F.addInt16(n2 ? 1 : 0), F.flush(66);
  }, "bind"), Ac = d.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Cc = a((r2) => {
    if (!r2 || !r2.portal && !r2.rows) return Ac;
    let e3 = r2.portal || "", t = r2.rows || 0, n2 = d.byteLength(e3), i3 = 4 + n2 + 1 + 4, s3 = d.allocUnsafe(1 + i3);
    return s3[0] = 69, s3.writeInt32BE(i3, 1), s3.write(e3, 5, "utf-8"), s3[n2 + 5] = 0, s3.writeUInt32BE(t, s3.length - 4), s3;
  }, "execute"), _c = a(
    (r2, e3) => {
      let t = d.allocUnsafe(16);
      return t.writeInt32BE(16, 0), t.writeInt16BE(1234, 4), t.writeInt16BE(
        5678,
        6
      ), t.writeInt32BE(r2, 8), t.writeInt32BE(e3, 12), t;
    },
    "cancel"
  ), dn = a((r2, e3) => {
    let n2 = 4 + d.byteLength(e3) + 1, i3 = d.allocUnsafe(1 + n2);
    return i3[0] = r2, i3.writeInt32BE(n2, 1), i3.write(e3, 5, "utf-8"), i3[n2] = 0, i3;
  }, "cstringMessage"), Ic = F.addCString("P").flush(68), Tc = F.addCString("S").flush(68), Pc = a((r2) => r2.name ? dn(68, `${r2.type}${r2.name || ""}`) : r2.type === "P" ? Ic : Tc, "describe"), Bc = a((r2) => {
    let e3 = `${r2.type}${r2.name || ""}`;
    return dn(67, e3);
  }, "close"), Rc = a((r2) => F.add(r2).flush(100), "copyData"), Lc = a((r2) => dn(102, r2), "copyFail"), Lt = a((r2) => d.from([r2, 0, 0, 0, 4]), "codeOnlyBuffer"), Fc = Lt(72), kc = Lt(83), Mc = Lt(88), Uc = Lt(99), Dc = {
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
    constructor(e3 = 0) {
      this.offset = e3, this.buffer = Oc, this.encoding = "utf-8";
    }
    setBuffer(e3, t) {
      this.offset = e3, this.buffer = t;
    }
    int16() {
      let e3 = this.buffer.readInt16BE(this.offset);
      return this.offset += 2, e3;
    }
    byte() {
      let e3 = this.buffer[this.offset];
      return this.offset++, e3;
    }
    int32() {
      let e3 = this.buffer.readInt32BE(
        this.offset
      );
      return this.offset += 4, e3;
    }
    uint32() {
      let e3 = this.buffer.readUInt32BE(this.offset);
      return this.offset += 4, e3;
    }
    string(e3) {
      let t = this.buffer.toString(this.encoding, this.offset, this.offset + e3);
      return this.offset += e3, t;
    }
    cstring() {
      let e3 = this.offset, t = e3;
      for (; this.buffer[t++] !== 0; ) ;
      return this.offset = t, this.buffer.toString(this.encoding, e3, t - 1);
    }
    bytes(e3) {
      let t = this.buffer.slice(this.offset, this.offset + e3);
      return this.offset += e3, t;
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
    constructor(e3) {
      if (this.buffer = $s, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new qc.BufferReader(), e3?.mode === "binary") throw new Error("Binary mode not supported yet");
      this.mode = e3?.mode || "text";
    }
    parse(e3, t) {
      this.mergeBuffer(e3);
      let n2 = this.bufferOffset + this.bufferLength, i3 = this.bufferOffset;
      for (; i3 + Hs <= n2; ) {
        let s3 = this.buffer[i3], o2 = this.buffer.readUInt32BE(
          i3 + wn
        ), u2 = wn + o2;
        if (u2 + i3 <= n2) {
          let c2 = this.handlePacket(i3 + Hs, s3, o2, this.buffer);
          t(c2), i3 += u2;
        } else break;
      }
      i3 === n2 ? (this.buffer = $s, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n2 - i3, this.bufferOffset = i3);
    }
    mergeBuffer(e3) {
      if (this.bufferLength > 0) {
        let t = this.bufferLength + e3.byteLength;
        if (t + this.bufferOffset > this.buffer.byteLength) {
          let i3;
          if (t <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) i3 = this.buffer;
          else {
            let s3 = this.buffer.byteLength * 2;
            for (; t >= s3; ) s3 *= 2;
            i3 = d.allocUnsafe(s3);
          }
          this.buffer.copy(i3, 0, this.bufferOffset, this.bufferOffset + this.bufferLength), this.buffer = i3, this.bufferOffset = 0;
        }
        e3.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t;
      } else this.buffer = e3, this.bufferOffset = 0, this.bufferLength = e3.byteLength;
    }
    handlePacket(e3, t, n2, i3) {
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
          return this.parseDataRowMessage(e3, n2, i3);
        case 67:
          return this.parseCommandCompleteMessage(
            e3,
            n2,
            i3
          );
        case 90:
          return this.parseReadyForQueryMessage(e3, n2, i3);
        case 65:
          return this.parseNotificationMessage(
            e3,
            n2,
            i3
          );
        case 82:
          return this.parseAuthenticationResponse(e3, n2, i3);
        case 83:
          return this.parseParameterStatusMessage(
            e3,
            n2,
            i3
          );
        case 75:
          return this.parseBackendKeyData(e3, n2, i3);
        case 69:
          return this.parseErrorMessage(e3, n2, i3, "error");
        case 78:
          return this.parseErrorMessage(e3, n2, i3, "notice");
        case 84:
          return this.parseRowDescriptionMessage(
            e3,
            n2,
            i3
          );
        case 116:
          return this.parseParameterDescriptionMessage(e3, n2, i3);
        case 71:
          return this.parseCopyInMessage(
            e3,
            n2,
            i3
          );
        case 72:
          return this.parseCopyOutMessage(e3, n2, i3);
        case 100:
          return this.parseCopyData(e3, n2, i3);
        default:
          return new k.DatabaseError("received invalid response: " + t.toString(16), n2, "error");
      }
    }
    parseReadyForQueryMessage(e3, t, n2) {
      this.reader.setBuffer(e3, n2);
      let i3 = this.reader.string(1);
      return new k.ReadyForQueryMessage(t, i3);
    }
    parseCommandCompleteMessage(e3, t, n2) {
      this.reader.setBuffer(e3, n2);
      let i3 = this.reader.cstring();
      return new k.CommandCompleteMessage(t, i3);
    }
    parseCopyData(e3, t, n2) {
      let i3 = n2.slice(e3, e3 + (t - 4));
      return new k.CopyDataMessage(t, i3);
    }
    parseCopyInMessage(e3, t, n2) {
      return this.parseCopyMessage(
        e3,
        t,
        n2,
        "copyInResponse"
      );
    }
    parseCopyOutMessage(e3, t, n2) {
      return this.parseCopyMessage(e3, t, n2, "copyOutResponse");
    }
    parseCopyMessage(e3, t, n2, i3) {
      this.reader.setBuffer(e3, n2);
      let s3 = this.reader.byte() !== 0, o2 = this.reader.int16(), u2 = new k.CopyResponse(t, i3, s3, o2);
      for (let c2 = 0; c2 < o2; c2++) u2.columnTypes[c2] = this.reader.int16();
      return u2;
    }
    parseNotificationMessage(e3, t, n2) {
      this.reader.setBuffer(e3, n2);
      let i3 = this.reader.int32(), s3 = this.reader.cstring(), o2 = this.reader.cstring();
      return new k.NotificationResponseMessage(t, i3, s3, o2);
    }
    parseRowDescriptionMessage(e3, t, n2) {
      this.reader.setBuffer(
        e3,
        n2
      );
      let i3 = this.reader.int16(), s3 = new k.RowDescriptionMessage(t, i3);
      for (let o2 = 0; o2 < i3; o2++) s3.fields[o2] = this.parseField();
      return s3;
    }
    parseField() {
      let e3 = this.reader.cstring(), t = this.reader.uint32(), n2 = this.reader.int16(), i3 = this.reader.uint32(), s3 = this.reader.int16(), o2 = this.reader.int32(), u2 = this.reader.int16() === 0 ? "text" : "binary";
      return new k.Field(e3, t, n2, i3, s3, o2, u2);
    }
    parseParameterDescriptionMessage(e3, t, n2) {
      this.reader.setBuffer(e3, n2);
      let i3 = this.reader.int16(), s3 = new k.ParameterDescriptionMessage(t, i3);
      for (let o2 = 0; o2 < i3; o2++)
        s3.dataTypeIDs[o2] = this.reader.int32();
      return s3;
    }
    parseDataRowMessage(e3, t, n2) {
      this.reader.setBuffer(e3, n2);
      let i3 = this.reader.int16(), s3 = new Array(i3);
      for (let o2 = 0; o2 < i3; o2++) {
        let u2 = this.reader.int32();
        s3[o2] = u2 === -1 ? null : this.reader.string(u2);
      }
      return new k.DataRowMessage(t, s3);
    }
    parseParameterStatusMessage(e3, t, n2) {
      this.reader.setBuffer(e3, n2);
      let i3 = this.reader.cstring(), s3 = this.reader.cstring();
      return new k.ParameterStatusMessage(
        t,
        i3,
        s3
      );
    }
    parseBackendKeyData(e3, t, n2) {
      this.reader.setBuffer(e3, n2);
      let i3 = this.reader.int32(), s3 = this.reader.int32();
      return new k.BackendKeyDataMessage(t, i3, s3);
    }
    parseAuthenticationResponse(e3, t, n2) {
      this.reader.setBuffer(
        e3,
        n2
      );
      let i3 = this.reader.int32(), s3 = { name: "authenticationOk", length: t };
      switch (i3) {
        case 0:
          break;
        case 3:
          s3.length === 8 && (s3.name = "authenticationCleartextPassword");
          break;
        case 5:
          if (s3.length === 12) {
            s3.name = "authenticationMD5Password";
            let o2 = this.reader.bytes(4);
            return new k.AuthenticationMD5Password(t, o2);
          }
          break;
        case 10:
          {
            s3.name = "authenticationSASL", s3.mechanisms = [];
            let o2;
            do
              o2 = this.reader.cstring(), o2 && s3.mechanisms.push(o2);
            while (o2);
          }
          break;
        case 11:
          s3.name = "authenticationSASLContinue", s3.data = this.reader.string(t - 8);
          break;
        case 12:
          s3.name = "authenticationSASLFinal", s3.data = this.reader.string(t - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + i3);
      }
      return s3;
    }
    parseErrorMessage(e3, t, n2, i3) {
      this.reader.setBuffer(e3, n2);
      let s3 = {}, o2 = this.reader.string(1);
      for (; o2 !== "\0"; ) s3[o2] = this.reader.cstring(), o2 = this.reader.string(1);
      let u2 = s3.M, c2 = i3 === "notice" ? new k.NoticeMessage(t, u2) : new k.DatabaseError(u2, t, i3);
      return c2.severity = s3.S, c2.code = s3.C, c2.detail = s3.D, c2.hint = s3.H, c2.position = s3.P, c2.internalPosition = s3.p, c2.internalQuery = s3.q, c2.where = s3.W, c2.schema = s3.s, c2.table = s3.t, c2.column = s3.c, c2.dataType = s3.d, c2.constraint = s3.n, c2.file = s3.F, c2.line = s3.L, c2.routine = s3.R, c2;
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
  function Hc(r2, e3) {
    let t = new jc.Parser();
    return r2.on("data", (n2) => t.parse(n2, e3)), new Promise((n2) => r2.on("end", () => n2()));
  }
  __name(Hc, "Hc");
  a(Hc, "parse");
  xe.parse = Hc;
});
var Vs = {};
ie(Vs, { connect: /* @__PURE__ */ __name(() => $c, "connect") });
function $c({ socket: r2, servername: e3 }) {
  return r2.startTls(e3), r2;
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
    constructor(e3) {
      super(), e3 = e3 || {}, this.stream = e3.stream || new Ks.Socket(), this._keepAlive = e3.keepAlive, this._keepAliveInitialDelayMillis = e3.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e3.ssl || false, this._ending = false, this._emitMessage = false;
      var t = this;
      this.on("newListener", function(n2) {
        n2 === "message" && (t._emitMessage = true);
      });
    }
    connect(e3, t) {
      var n2 = this;
      this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(e3, t), this.stream.once("connect", function() {
        n2._keepAlive && n2.stream.setKeepAlive(true, n2._keepAliveInitialDelayMillis), n2.emit("connect");
      });
      let i3 = a(function(s3) {
        n2._ending && (s3.code === "ECONNRESET" || s3.code === "EPIPE") || n2.emit("error", s3);
      }, "reportStreamError");
      if (this.stream.on("error", i3), this.stream.on("close", function() {
        n2.emit("end");
      }), !this.ssl) return this.attachListeners(
        this.stream
      );
      this.stream.once("data", function(s3) {
        var o2 = s3.toString("utf8");
        switch (o2) {
          case "S":
            break;
          case "N":
            return n2.stream.end(), n2.emit("error", new Error("The server does not support SSL connections"));
          default:
            return n2.stream.end(), n2.emit("error", new Error("There was an error establishing an SSL connection"));
        }
        var u2 = (zs(), O(Vs));
        let c2 = { socket: n2.stream };
        n2.ssl !== true && (Object.assign(c2, n2.ssl), "key" in n2.ssl && (c2.key = n2.ssl.key)), Ks.isIP(t) === 0 && (c2.servername = t);
        try {
          n2.stream = u2.connect(c2);
        } catch (l2) {
          return n2.emit(
            "error",
            l2
          );
        }
        n2.attachListeners(n2.stream), n2.stream.on("error", i3), n2.emit("sslconnect");
      });
    }
    attachListeners(e3) {
      e3.on(
        "end",
        () => {
          this.emit("end");
        }
      ), Vc(e3, (t) => {
        var n2 = t.name === "error" ? "errorMessage" : t.name;
        this._emitMessage && this.emit("message", t), this.emit(n2, t);
      });
    }
    requestSsl() {
      this.stream.write(Q.requestSsl());
    }
    startup(e3) {
      this.stream.write(Q.startup(e3));
    }
    cancel(e3, t) {
      this._send(Q.cancel(e3, t));
    }
    password(e3) {
      this._send(Q.password(e3));
    }
    sendSASLInitialResponseMessage(e3, t) {
      this._send(Q.sendSASLInitialResponseMessage(e3, t));
    }
    sendSCRAMClientFinalMessage(e3) {
      this._send(Q.sendSCRAMClientFinalMessage(
        e3
      ));
    }
    _send(e3) {
      return this.stream.writable ? this.stream.write(e3) : false;
    }
    query(e3) {
      this._send(Q.query(e3));
    }
    parse(e3) {
      this._send(Q.parse(e3));
    }
    bind(e3) {
      this._send(Q.bind(e3));
    }
    execute(e3) {
      this._send(Q.execute(e3));
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
    close(e3) {
      this._send(Q.close(e3));
    }
    describe(e3) {
      this._send(Q.describe(e3));
    }
    sendCopyFromChunk(e3) {
      this._send(Q.copyData(e3));
    }
    endCopyFrom() {
      this._send(Q.copyDone());
    }
    sendCopyFail(e3) {
      this._send(Q.copyFail(e3));
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
    constructor(e3) {
      super(), this.connectionParameters = new el(e3), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(
        this,
        "password",
        { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }
      ), this.replication = this.connectionParameters.replication;
      var t = e3 || {};
      this._Promise = t.Promise || b.Promise, this._types = new Xc(t.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t.connection || new rl({ stream: t.stream, ssl: this.connectionParameters.ssl, keepAlive: t.keepAlive || false, keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t.binary || tl.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(e3) {
      let t = a((n2) => {
        m.nextTick(() => {
          n2.handleError(e3, this.connection);
        });
      }, "enqueueError");
      this.activeQuery && (t(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t), this.queryQueue.length = 0;
    }
    _connect(e3) {
      var t = this, n2 = this.connection;
      if (this._connectionCallback = e3, this._connecting || this._connected) {
        let i3 = new Error("Client has already been connected. You cannot reuse a client.");
        m.nextTick(
          () => {
            e3(i3);
          }
        );
        return;
      }
      this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
        n2._ending = true, n2.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n2.connect(this.host + "/.s.PGSQL." + this.port) : n2.connect(this.port, this.host), n2.on("connect", function() {
        t.ssl ? n2.requestSsl() : n2.startup(t.getStartupConf());
      }), n2.on("sslconnect", function() {
        n2.startup(t.getStartupConf());
      }), this._attachListeners(
        n2
      ), n2.once("end", () => {
        let i3 = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i3), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i3) : this._handleErrorEvent(i3) : this._connectionError || this._handleErrorEvent(i3)), m.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(e3) {
      if (e3) {
        this._connect(e3);
        return;
      }
      return new this._Promise((t, n2) => {
        this._connect((i3) => {
          i3 ? n2(i3) : t();
        });
      });
    }
    _attachListeners(e3) {
      e3.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e3.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e3.on("authenticationSASL", this._handleAuthSASL.bind(this)), e3.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e3.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e3.on("backendKeyData", this._handleBackendKeyData.bind(this)), e3.on("error", this._handleErrorEvent.bind(this)), e3.on("errorMessage", this._handleErrorMessage.bind(this)), e3.on("readyForQuery", this._handleReadyForQuery.bind(this)), e3.on("notice", this._handleNotice.bind(this)), e3.on("rowDescription", this._handleRowDescription.bind(this)), e3.on("dataRow", this._handleDataRow.bind(this)), e3.on("portalSuspended", this._handlePortalSuspended.bind(
        this
      )), e3.on("emptyQuery", this._handleEmptyQuery.bind(this)), e3.on("commandComplete", this._handleCommandComplete.bind(this)), e3.on("parseComplete", this._handleParseComplete.bind(this)), e3.on("copyInResponse", this._handleCopyInResponse.bind(this)), e3.on("copyData", this._handleCopyData.bind(this)), e3.on("notification", this._handleNotification.bind(this));
    }
    _checkPgPass(e3) {
      let t = this.connection;
      typeof this.password == "function" ? this._Promise.resolve().then(() => this.password()).then((n2) => {
        if (n2 !== void 0) {
          if (typeof n2 != "string") {
            t.emit("error", new TypeError(
              "Password must be a string"
            ));
            return;
          }
          this.connectionParameters.password = this.password = n2;
        } else this.connectionParameters.password = this.password = null;
        e3();
      }).catch((n2) => {
        t.emit("error", n2);
      }) : this.password !== null ? e3() : Jc(
        this.connectionParameters,
        (n2) => {
          n2 !== void 0 && (this.connectionParameters.password = this.password = n2), e3();
        }
      );
    }
    _handleAuthCleartextPassword(e3) {
      this._checkPgPass(() => {
        this.connection.password(this.password);
      });
    }
    _handleAuthMD5Password(e3) {
      this._checkPgPass(
        () => {
          let t = Zc.postgresMd5PasswordHash(this.user, this.password, e3.salt);
          this.connection.password(t);
        }
      );
    }
    _handleAuthSASL(e3) {
      this._checkPgPass(() => {
        this.saslSession = An.startSession(e3.mechanisms), this.connection.sendSASLInitialResponseMessage(
          this.saslSession.mechanism,
          this.saslSession.response
        );
      });
    }
    _handleAuthSASLContinue(e3) {
      An.continueSession(
        this.saslSession,
        this.password,
        e3.data
      ), this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
    }
    _handleAuthSASLFinal(e3) {
      An.finalizeSession(this.saslSession, e3.data), this.saslSession = null;
    }
    _handleBackendKeyData(e3) {
      this.processID = e3.processID, this.secretKey = e3.secretKey;
    }
    _handleReadyForQuery(e3) {
      this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
      let { activeQuery: t } = this;
      this.activeQuery = null, this.readyForQuery = true, t && t.handleReadyForQuery(this.connection), this._pulseQueryQueue();
    }
    _handleErrorWhileConnecting(e3) {
      if (!this._connectionError) {
        if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback) return this._connectionCallback(e3);
        this.emit("error", e3);
      }
    }
    _handleErrorEvent(e3) {
      if (this._connecting) return this._handleErrorWhileConnecting(e3);
      this._queryable = false, this._errorAllQueries(e3), this.emit("error", e3);
    }
    _handleErrorMessage(e3) {
      if (this._connecting) return this._handleErrorWhileConnecting(e3);
      let t = this.activeQuery;
      if (!t) {
        this._handleErrorEvent(e3);
        return;
      }
      this.activeQuery = null, t.handleError(
        e3,
        this.connection
      );
    }
    _handleRowDescription(e3) {
      this.activeQuery.handleRowDescription(e3);
    }
    _handleDataRow(e3) {
      this.activeQuery.handleDataRow(e3);
    }
    _handlePortalSuspended(e3) {
      this.activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(e3) {
      this.activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(e3) {
      this.activeQuery.handleCommandComplete(e3, this.connection);
    }
    _handleParseComplete(e3) {
      this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
    }
    _handleCopyInResponse(e3) {
      this.activeQuery.handleCopyInResponse(this.connection);
    }
    _handleCopyData(e3) {
      this.activeQuery.handleCopyData(
        e3,
        this.connection
      );
    }
    _handleNotification(e3) {
      this.emit("notification", e3);
    }
    _handleNotice(e3) {
      this.emit("notice", e3);
    }
    getStartupConf() {
      var e3 = this.connectionParameters, t = { user: e3.user, database: e3.database }, n2 = e3.application_name || e3.fallback_application_name;
      return n2 && (t.application_name = n2), e3.replication && (t.replication = "" + e3.replication), e3.statement_timeout && (t.statement_timeout = String(parseInt(e3.statement_timeout, 10))), e3.lock_timeout && (t.lock_timeout = String(parseInt(e3.lock_timeout, 10))), e3.idle_in_transaction_session_timeout && (t.idle_in_transaction_session_timeout = String(parseInt(e3.idle_in_transaction_session_timeout, 10))), e3.options && (t.options = e3.options), t;
    }
    cancel(e3, t) {
      if (e3.activeQuery === t) {
        var n2 = this.connection;
        this.host && this.host.indexOf("/") === 0 ? n2.connect(this.host + "/.s.PGSQL." + this.port) : n2.connect(this.port, this.host), n2.on("connect", function() {
          n2.cancel(
            e3.processID,
            e3.secretKey
          );
        });
      } else e3.queryQueue.indexOf(t) !== -1 && e3.queryQueue.splice(e3.queryQueue.indexOf(t), 1);
    }
    setTypeParser(e3, t, n2) {
      return this._types.setTypeParser(e3, t, n2);
    }
    getTypeParser(e3, t) {
      return this._types.getTypeParser(e3, t);
    }
    escapeIdentifier(e3) {
      return '"' + e3.replace(/"/g, '""') + '"';
    }
    escapeLiteral(e3) {
      for (var t = false, n2 = "'", i3 = 0; i3 < e3.length; i3++) {
        var s3 = e3[i3];
        s3 === "'" ? n2 += s3 + s3 : s3 === "\\" ? (n2 += s3 + s3, t = true) : n2 += s3;
      }
      return n2 += "'", t === true && (n2 = " E" + n2), n2;
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === true) if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
        this.readyForQuery = false, this.hasExecuted = true;
        let e3 = this.activeQuery.submit(this.connection);
        e3 && m.nextTick(() => {
          this.activeQuery.handleError(e3, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
        });
      } else this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
    }
    query(e3, t, n2) {
      var i3, s3, o2, u2, c2;
      if (e3 == null) throw new TypeError(
        "Client was passed a null or undefined query"
      );
      return typeof e3.submit == "function" ? (o2 = e3.query_timeout || this.connectionParameters.query_timeout, s3 = i3 = e3, typeof t == "function" && (i3.callback = i3.callback || t)) : (o2 = this.connectionParameters.query_timeout, i3 = new Js(e3, t, n2), i3.callback || (s3 = new this._Promise((l2, f2) => {
        i3.callback = (y2, g) => y2 ? f2(y2) : l2(g);
      }))), o2 && (c2 = i3.callback, u2 = setTimeout(() => {
        var l2 = new Error("Query read timeout");
        m.nextTick(
          () => {
            i3.handleError(l2, this.connection);
          }
        ), c2(l2), i3.callback = () => {
        };
        var f2 = this.queryQueue.indexOf(i3);
        f2 > -1 && this.queryQueue.splice(f2, 1), this._pulseQueryQueue();
      }, o2), i3.callback = (l2, f2) => {
        clearTimeout(u2), c2(l2, f2);
      }), this.binary && !i3.binary && (i3.binary = true), i3._result && !i3._result._types && (i3._result._types = this._types), this._queryable ? this._ending ? (m.nextTick(() => {
        i3.handleError(new Error("Client was closed and is not queryable"), this.connection);
      }), s3) : (this.queryQueue.push(i3), this._pulseQueryQueue(), s3) : (m.nextTick(() => {
        i3.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
      }), s3);
    }
    ref() {
      this.connection.ref();
    }
    unref() {
      this.connection.unref();
    }
    end(e3) {
      if (this._ending = true, !this.connection._connecting) if (e3) e3();
      else return this._Promise.resolve();
      if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), e3) this.connection.once("end", e3);
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
  }, "NOOP"), ro = a((r2, e3) => {
    let t = r2.findIndex(e3);
    return t === -1 ? void 0 : r2.splice(t, 1)[0];
  }, "removeWhere"), Tn = class Tn {
    static {
      __name(this, "Tn");
    }
    constructor(e3, t, n2) {
      this.client = e3, this.idleListener = t, this.timeoutId = n2;
    }
  };
  a(Tn, "IdleItem");
  var _n = Tn, Pn = class Pn {
    static {
      __name(this, "Pn");
    }
    constructor(e3) {
      this.callback = e3;
    }
  };
  a(Pn, "PendingItem");
  var Qe = Pn;
  function il() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  __name(il, "il");
  a(il, "throwOnDoubleRelease");
  function Dt(r2, e3) {
    if (e3)
      return { callback: e3, result: void 0 };
    let t, n2, i3 = a(function(o2, u2) {
      o2 ? t(o2) : n2(u2);
    }, "cb"), s3 = new r2(function(o2, u2) {
      n2 = o2, t = u2;
    }).catch((o2) => {
      throw Error.captureStackTrace(o2), o2;
    });
    return { callback: i3, result: s3 };
  }
  __name(Dt, "Dt");
  a(Dt, "promisify");
  function sl(r2, e3) {
    return a(/* @__PURE__ */ __name(function t(n2) {
      n2.client = e3, e3.removeListener("error", t), e3.on("error", () => {
        r2.log(
          "additional client error after disconnection due to error",
          n2
        );
      }), r2._remove(e3), r2.emit("error", n2, e3);
    }, "t"), "idleListener");
  }
  __name(sl, "sl");
  a(sl, "makeIdleListener");
  var Bn = class Bn extends nl {
    static {
      __name(this, "Bn");
    }
    constructor(e3, t) {
      super(), this.options = Object.assign({}, e3), e3 != null && "password" in e3 && Object.defineProperty(this.options, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: e3.password
      }), e3 != null && e3.ssl && e3.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.min = this.options.min || 0, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
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
      let e3 = this._pendingQueue.shift();
      if (this._idle.length) {
        let t = this._idle.pop();
        clearTimeout(
          t.timeoutId
        );
        let n2 = t.client;
        n2.ref && n2.ref();
        let i3 = t.idleListener;
        return this._acquireClient(n2, e3, i3, false);
      }
      if (!this._isFull()) return this.newClient(e3);
      throw new Error("unexpected condition");
    }
    _remove(e3) {
      let t = ro(
        this._idle,
        (n2) => n2.client === e3
      );
      t !== void 0 && clearTimeout(t.timeoutId), this._clients = this._clients.filter(
        (n2) => n2 !== e3
      ), e3.end(), this.emit("remove", e3);
    }
    connect(e3) {
      if (this.ending) {
        let i3 = new Error("Cannot use a pool after calling end on the pool");
        return e3 ? e3(i3) : this.Promise.reject(i3);
      }
      let t = Dt(this.Promise, e3), n2 = t.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length && m.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis) return this._pendingQueue.push(new Qe(t.callback)), n2;
        let i3 = a((u2, c2, l2) => {
          clearTimeout(o2), t.callback(u2, c2, l2);
        }, "queueCallback"), s3 = new Qe(i3), o2 = setTimeout(() => {
          ro(
            this._pendingQueue,
            (u2) => u2.callback === i3
          ), s3.timedOut = true, t.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        return o2.unref && o2.unref(), this._pendingQueue.push(s3), n2;
      }
      return this.newClient(new Qe(t.callback)), n2;
    }
    newClient(e3) {
      let t = new this.Client(this.options);
      this._clients.push(
        t
      );
      let n2 = sl(this, t);
      this.log("checking client timeout");
      let i3, s3 = false;
      this.options.connectionTimeoutMillis && (i3 = setTimeout(() => {
        this.log("ending client due to timeout"), s3 = true, t.connection ? t.connection.stream.destroy() : t.end();
      }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t.connect((o2) => {
        if (i3 && clearTimeout(i3), t.on("error", n2), o2) this.log("client failed to connect", o2), this._clients = this._clients.filter((u2) => u2 !== t), s3 && (o2 = new Error("Connection terminated due to connection timeout", { cause: o2 })), this._pulseQueue(), e3.timedOut || e3.callback(o2, void 0, to);
        else {
          if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
            let u2 = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(t), this._idle.findIndex((l2) => l2.client === t) !== -1 && this._acquireClient(
                t,
                new Qe((l2, f2, y2) => y2()),
                n2,
                false
              );
            }, this.options.maxLifetimeSeconds * 1e3);
            u2.unref(), t.once("end", () => clearTimeout(u2));
          }
          return this._acquireClient(t, e3, n2, true);
        }
      });
    }
    _acquireClient(e3, t, n2, i3) {
      i3 && this.emit("connect", e3), this.emit("acquire", e3), e3.release = this._releaseOnce(e3, n2), e3.removeListener("error", n2), t.timedOut ? i3 && this.options.verify ? this.options.verify(e3, e3.release) : e3.release() : i3 && this.options.verify ? this.options.verify(e3, (s3) => {
        if (s3) return e3.release(s3), t.callback(s3, void 0, to);
        t.callback(void 0, e3, e3.release);
      }) : t.callback(void 0, e3, e3.release);
    }
    _releaseOnce(e3, t) {
      let n2 = false;
      return (i3) => {
        n2 && il(), n2 = true, this._release(e3, t, i3);
      };
    }
    _release(e3, t, n2) {
      if (e3.on("error", t), e3._poolUseCount = (e3._poolUseCount || 0) + 1, this.emit("release", n2, e3), n2 || this.ending || !e3._queryable || e3._ending || e3._poolUseCount >= this.options.maxUses) {
        e3._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e3), this._pulseQueue();
        return;
      }
      if (this._expired.has(e3)) {
        this.log("remove expired client"), this._expired.delete(e3), this._remove(e3), this._pulseQueue();
        return;
      }
      let s3;
      this.options.idleTimeoutMillis && this._isAboveMin() && (s3 = setTimeout(() => {
        this.log("remove idle client"), this._remove(e3);
      }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s3.unref()), this.options.allowExitOnIdle && e3.unref(), this._idle.push(new _n(
        e3,
        t,
        s3
      )), this._pulseQueue();
    }
    query(e3, t, n2) {
      if (typeof e3 == "function") {
        let s3 = Dt(this.Promise, e3);
        return v(function() {
          return s3.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        }), s3.result;
      }
      typeof t == "function" && (n2 = t, t = void 0);
      let i3 = Dt(this.Promise, n2);
      return n2 = i3.callback, this.connect((s3, o2) => {
        if (s3) return n2(s3);
        let u2 = false, c2 = a((l2) => {
          u2 || (u2 = true, o2.release(l2), n2(l2));
        }, "onError");
        o2.once("error", c2), this.log("dispatching query");
        try {
          o2.query(e3, t, (l2, f2) => {
            if (this.log("query dispatched"), o2.removeListener(
              "error",
              c2
            ), !u2) return u2 = true, o2.release(l2), l2 ? n2(l2) : n2(void 0, f2);
          });
        } catch (l2) {
          return o2.release(l2), n2(l2);
        }
      }), i3.result;
    }
    end(e3) {
      if (this.log("ending"), this.ending) {
        let n2 = new Error("Called end on pool more than once");
        return e3 ? e3(n2) : this.Promise.reject(n2);
      }
      this.ending = true;
      let t = Dt(this.Promise, e3);
      return this._endCallback = t.callback, this._pulseQueue(), t.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((e3, t) => e3 + (this._expired.has(t) ? 1 : 0), 0);
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
  var uo = ge().EventEmitter, ul = (it(), O(nt)), Rn = rt(), Ne = co.exports = function(r2, e3, t) {
    uo.call(this), r2 = Rn.normalizeQueryConfig(r2, e3, t), this.text = r2.text, this.values = r2.values, this.name = r2.name, this.callback = r2.callback, this.state = "new", this._arrayMode = r2.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n2) {
      n2 === "row" && (this._emitRowEvents = true);
    }.bind(this));
  };
  ul.inherits(Ne, uo);
  var cl = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
  Ne.prototype.handleError = function(r2) {
    var e3 = this.native.pq.resultErrorFields();
    if (e3) for (var t in e3) {
      var n2 = cl[t] || t;
      r2[n2] = e3[t];
    }
    this.callback ? this.callback(r2) : this.emit("error", r2), this.state = "error";
  };
  Ne.prototype.then = function(r2, e3) {
    return this._getPromise().then(
      r2,
      e3
    );
  };
  Ne.prototype.catch = function(r2) {
    return this._getPromise().catch(r2);
  };
  Ne.prototype._getPromise = function() {
    return this._promise ? this._promise : (this._promise = new Promise(function(r2, e3) {
      this._once("end", r2), this._once("error", e3);
    }.bind(this)), this._promise);
  };
  Ne.prototype.submit = function(r2) {
    this.state = "running";
    var e3 = this;
    this.native = r2.native, r2.native.arrayMode = this._arrayMode;
    var t = a(function(s3, o2, u2) {
      if (r2.native.arrayMode = false, v(function() {
        e3.emit("_done");
      }), s3) return e3.handleError(s3);
      e3._emitRowEvents && (u2.length > 1 ? o2.forEach(
        (c2, l2) => {
          c2.forEach((f2) => {
            e3.emit("row", f2, u2[l2]);
          });
        }
      ) : o2.forEach(function(c2) {
        e3.emit("row", c2, u2);
      })), e3.state = "end", e3.emit("end", u2), e3.callback && e3.callback(null, u2);
    }, "after");
    if (m.domain && (t = m.domain.bind(t)), this.name) {
      this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", this.name, this.name.length), console.error("This can cause conflicts and silent errors executing queries"));
      var n2 = (this.values || []).map(Rn.prepareValue);
      if (r2.namedQueries[this.name]) {
        if (this.text && r2.namedQueries[this.name] !== this.text) {
          let s3 = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return t(s3);
        }
        return r2.native.execute(this.name, n2, t);
      }
      return r2.native.prepare(this.name, this.text, n2.length, function(s3) {
        return s3 ? t(s3) : (r2.namedQueries[e3.name] = e3.text, e3.native.execute(e3.name, n2, t));
      });
    } else if (this.values) {
      if (!Array.isArray(
        this.values
      )) {
        let s3 = new Error("Query values must be an array");
        return t(s3);
      }
      var i3 = this.values.map(Rn.prepareValue);
      r2.native.query(this.text, i3, t);
    } else r2.native.query(this.text, t);
  };
});
var yo = T((yp, po) => {
  "use strict";
  p();
  var ll = (oo(), O(so)), fl = At(), dp = ao(), fo = ge().EventEmitter, hl = (it(), O(nt)), pl = Bt(), ho = lo(), K = po.exports = function(r2) {
    fo.call(this), r2 = r2 || {}, this._Promise = r2.Promise || b.Promise, this._types = new fl(r2.types), this.native = new ll({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
    var e3 = this.connectionParameters = new pl(r2);
    this.user = e3.user, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: e3.password }), this.database = e3.database, this.host = e3.host, this.port = e3.port, this.namedQueries = {};
  };
  K.Query = ho;
  hl.inherits(K, fo);
  K.prototype._errorAllQueries = function(r2) {
    let e3 = a((t) => {
      m.nextTick(() => {
        t.native = this.native, t.handleError(r2);
      });
    }, "enqueueError");
    this._hasActiveQuery() && (e3(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e3), this._queryQueue.length = 0;
  };
  K.prototype._connect = function(r2) {
    var e3 = this;
    if (this._connecting) {
      m.nextTick(() => r2(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t, n2) {
      if (t) return r2(t);
      e3.native.connect(n2, function(i3) {
        if (i3) return e3.native.end(), r2(i3);
        e3._connected = true, e3.native.on("error", function(s3) {
          e3._queryable = false, e3._errorAllQueries(s3), e3.emit("error", s3);
        }), e3.native.on("notification", function(s3) {
          e3.emit("notification", { channel: s3.relname, payload: s3.extra });
        }), e3.emit("connect"), e3._pulseQueryQueue(true), r2();
      });
    });
  };
  K.prototype.connect = function(r2) {
    if (r2) {
      this._connect(r2);
      return;
    }
    return new this._Promise((e3, t) => {
      this._connect((n2) => {
        n2 ? t(n2) : e3();
      });
    });
  };
  K.prototype.query = function(r2, e3, t) {
    var n2, i3, s3, o2, u2;
    if (r2 == null) throw new TypeError("Client was passed a null or undefined query");
    if (typeof r2.submit == "function") s3 = r2.query_timeout || this.connectionParameters.query_timeout, i3 = n2 = r2, typeof e3 == "function" && (r2.callback = e3);
    else if (s3 = this.connectionParameters.query_timeout, n2 = new ho(r2, e3, t), !n2.callback) {
      let c2, l2;
      i3 = new this._Promise((f2, y2) => {
        c2 = f2, l2 = y2;
      }), n2.callback = (f2, y2) => f2 ? l2(f2) : c2(y2);
    }
    return s3 && (u2 = n2.callback, o2 = setTimeout(() => {
      var c2 = new Error(
        "Query read timeout"
      );
      m.nextTick(() => {
        n2.handleError(c2, this.connection);
      }), u2(c2), n2.callback = () => {
      };
      var l2 = this._queryQueue.indexOf(n2);
      l2 > -1 && this._queryQueue.splice(l2, 1), this._pulseQueryQueue();
    }, s3), n2.callback = (c2, l2) => {
      clearTimeout(o2), u2(c2, l2);
    }), this._queryable ? this._ending ? (n2.native = this.native, m.nextTick(() => {
      n2.handleError(
        new Error("Client was closed and is not queryable")
      );
    }), i3) : (this._queryQueue.push(n2), this._pulseQueryQueue(), i3) : (n2.native = this.native, m.nextTick(() => {
      n2.handleError(new Error("Client has encountered a connection error and is not queryable"));
    }), i3);
  };
  K.prototype.end = function(r2) {
    var e3 = this;
    this._ending = true, this._connected || this.once("connect", this.end.bind(this, r2));
    var t;
    return r2 || (t = new this._Promise(function(n2, i3) {
      r2 = a((s3) => s3 ? i3(s3) : n2(), "cb");
    })), this.native.end(function() {
      e3._errorAllQueries(new Error("Connection terminated")), m.nextTick(() => {
        e3.emit("end"), r2 && r2();
      });
    }), t;
  };
  K.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  K.prototype._pulseQueryQueue = function(r2) {
    if (this._connected && !this._hasActiveQuery()) {
      var e3 = this._queryQueue.shift();
      if (!e3) {
        r2 || this.emit("drain");
        return;
      }
      this._activeQuery = e3, e3.submit(this);
      var t = this;
      e3.once("_done", function() {
        t._pulseQueryQueue();
      });
    }
  };
  K.prototype.cancel = function(r2) {
    this._activeQuery === r2 ? this.native.cancel(function() {
    }) : this._queryQueue.indexOf(r2) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r2), 1);
  };
  K.prototype.ref = function() {
  };
  K.prototype.unref = function() {
  };
  K.prototype.setTypeParser = function(r2, e3, t) {
    return this._types.setTypeParser(
      r2,
      e3,
      t
    );
  };
  K.prototype.getTypeParser = function(r2, e3) {
    return this._types.getTypeParser(r2, e3);
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
    (r2) => {
      var e3;
      return e3 = class extends wl {
        static {
          __name(this, "e");
        }
        constructor(n2) {
          super(n2, r2);
        }
      }, a(e3, "BoundPool"), e3;
    },
    "poolFactory"
  ), Fn = a(
    function(r2) {
      this.defaults = yl, this.Client = r2, this.Query = this.Client.Query, this.Pool = bl(this.Client), this._pools = [], this.Connection = ml, this.types = Je(), this.DatabaseError = gl;
    },
    "PG"
  );
  typeof m.env.NODE_PG_FORCE_NATIVE < "u" ? at.exports = new Fn(Ln()) : (at.exports = new Fn(dl), Object.defineProperty(at.exports, "native", {
    configurable: true,
    enumerable: false,
    get() {
      var r2 = null;
      try {
        r2 = new Fn(Ln());
      } catch (e3) {
        if (e3.code !== "MODULE_NOT_FOUND") throw e3;
      }
      return Object.defineProperty(at.exports, "native", { value: r2 }), r2;
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
  (r2, e3, t) => e3 in r2 ? pa(r2, e3, { enumerable: true, configurable: true, writable: true, value: t }) : r2[e3] = t,
  "__defNormalProp"
);
var ga = a((r2, e3) => {
  for (var t in e3 || (e3 = {})) ma.call(e3, t) && vi(r2, t, e3[t]);
  if (bi) for (var t of bi(e3)) wa.call(e3, t) && vi(r2, t, e3[t]);
  return r2;
}, "__spreadValues");
var ba = a((r2, e3) => da(r2, ya(e3)), "__spreadProps");
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
function Ea(r2, { alphabet: e3, scratchArr: t } = {}) {
  if (!He) if (He = new Uint16Array(256), wt = new Uint16Array(256), xi) for (let C = 0; C < 256; C++) He[C] = yt[C & 15] << 8 | yt[C >>> 4], wt[C] = mt[C & 15] << 8 | mt[C >>> 4];
  else for (let C = 0; C < 256; C++) He[C] = yt[C & 15] | yt[C >>> 4] << 8, wt[C] = mt[C & 15] | mt[C >>> 4] << 8;
  r2.byteOffset % 4 !== 0 && (r2 = new Uint8Array(r2));
  let n2 = r2.length, i3 = n2 >>> 1, s3 = n2 >>> 2, o2 = t || new Uint16Array(n2), u2 = new Uint32Array(
    r2.buffer,
    r2.byteOffset,
    s3
  ), c2 = new Uint32Array(o2.buffer, o2.byteOffset, i3), l2 = e3 === "upper" ? wt : He, f2 = 0, y2 = 0, g;
  if (xi)
    for (; f2 < s3; ) g = u2[f2++], c2[y2++] = l2[g >>> 8 & 255] << 16 | l2[g & 255], c2[y2++] = l2[g >>> 24] << 16 | l2[g >>> 16 & 255];
  else for (; f2 < s3; )
    g = u2[f2++], c2[y2++] = l2[g >>> 24] << 16 | l2[g >>> 16 & 255], c2[y2++] = l2[g >>> 8 & 255] << 16 | l2[g & 255];
  for (f2 <<= 2; f2 < n2; ) o2[f2] = l2[r2[f2++]];
  return xa.decode(o2.subarray(0, n2));
}
__name(Ea, "Ea");
a(Ea, "_toHex");
function Aa(r2, e3 = {}) {
  let t = "", n2 = r2.length, i3 = va >>> 1, s3 = Math.ceil(n2 / i3), o2 = new Uint16Array(s3 > 1 ? i3 : n2);
  for (let u2 = 0; u2 < s3; u2++) {
    let c2 = u2 * i3, l2 = c2 + i3;
    t += Ea(r2.subarray(c2, l2), ba(ga(
      {},
      e3
    ), { scratchArr: o2 }));
  }
  return t;
}
__name(Aa, "Aa");
a(Aa, "_toHexChunked");
function Ei(r2, e3 = {}) {
  return e3.alphabet !== "upper" && typeof r2.toHex == "function" ? r2.toHex() : Aa(r2, e3);
}
__name(Ei, "Ei");
a(Ei, "toHex");
p();
var gt2 = class gt3 {
  static {
    __name(this, "gt");
  }
  constructor(e3, t) {
    this.strings = e3;
    this.values = t;
  }
  toParameterizedQuery(e3 = { query: "", params: [] }) {
    let { strings: t, values: n2 } = this;
    for (let i3 = 0, s3 = t.length; i3 < s3; i3++) if (e3.query += t[i3], i3 < n2.length) {
      let o2 = n2[i3];
      if (o2 instanceof Ge) e3.query += o2.sql;
      else if (o2 instanceof Ce) if (o2.queryData instanceof gt3) o2.queryData.toParameterizedQuery(
        e3
      );
      else {
        if (o2.queryData.params?.length) throw new Error("This query is not composable");
        e3.query += o2.queryData.query;
      }
      else {
        let { params: u2 } = e3;
        u2.push(o2), e3.query += "$" + u2.length, (o2 instanceof d || ArrayBuffer.isView(o2)) && (e3.query += "::bytea");
      }
    }
    return e3;
  }
};
a(gt2, "SqlTemplate");
var $e = gt2;
var Xt = class Xt2 {
  static {
    __name(this, "Xt");
  }
  constructor(e3) {
    this.sql = e3;
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
var is2 = "transaction() expects an array of queries, or a function returning an array of queries";
var Ru = ["severity", "code", "detail", "hint", "position", "internalPosition", "internalQuery", "where", "schema", "table", "column", "dataType", "constraint", "file", "line", "routine"];
function Lu(r2) {
  return r2 instanceof d ? "\\x" + Ei(r2) : r2;
}
__name(Lu, "Lu");
a(Lu, "encodeBuffersAsBytea");
function ss(r2) {
  let { query: e3, params: t } = r2 instanceof $e ? r2.toParameterizedQuery() : r2;
  return { query: e3, params: t.map((n2) => Lu((0, us.prepareValue)(n2))) };
}
__name(ss, "ss");
a(ss, "prepareQuery");
function cs(r2, {
  arrayMode: e3,
  fullResults: t,
  fetchOptions: n2,
  isolationLevel: i3,
  readOnly: s3,
  deferrable: o2,
  authToken: u2,
  disableWarningInBrowsers: c2
} = {}) {
  if (!r2) throw new Error("No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?");
  let l2;
  try {
    l2 = Yt(r2);
  } catch {
    throw new Error(
      "Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(r2)
    );
  }
  let { protocol: f2, username: y2, hostname: g, port: A, pathname: C } = l2;
  if (f2 !== "postgres:" && f2 !== "postgresql:" || !y2 || !g || !C) throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
  function D(P, ...I) {
    if (!(Array.isArray(P) && Array.isArray(P.raw) && Array.isArray(I))) throw new Error('This function can now be called only as a tagged-template function: sql`SELECT ${value}`, not sql("SELECT $1", [value], options). For a conventional function call with value placeholders ($1, $2, etc.), use sql.query("SELECT $1", [value], options).');
    return new Ce(
      Y,
      new $e(P, I)
    );
  }
  __name(D, "D");
  a(D, "templateFn"), D.query = (P, I, w2) => new Ce(Y, { query: P, params: I ?? [] }, w2), D.unsafe = (P) => new Ge(
    P
  ), D.transaction = async (P, I) => {
    if (typeof P == "function" && (P = P(D)), !Array.isArray(P)) throw new Error(is2);
    P.forEach((W) => {
      if (!(W instanceof Ce)) throw new Error(is2);
    });
    let w2 = P.map((W) => W.queryData), Z = P.map((W) => W.opts ?? {});
    return Y(w2, Z, I);
  };
  async function Y(P, I, w2) {
    let { fetchEndpoint: Z, fetchFunction: W } = ce, J = Array.isArray(
      P
    ) ? { queries: P.map((ee) => ss(ee)) } : ss(P), X = n2 ?? {}, se = e3 ?? false, oe = t ?? false, R = i3, j = s3, le = o2;
    w2 !== void 0 && (w2.fetchOptions !== void 0 && (X = { ...X, ...w2.fetchOptions }), w2.arrayMode !== void 0 && (se = w2.arrayMode), w2.fullResults !== void 0 && (oe = w2.fullResults), w2.isolationLevel !== void 0 && (R = w2.isolationLevel), w2.readOnly !== void 0 && (j = w2.readOnly), w2.deferrable !== void 0 && (le = w2.deferrable)), I !== void 0 && !Array.isArray(I) && I.fetchOptions !== void 0 && (X = { ...X, ...I.fetchOptions });
    let de = u2;
    !Array.isArray(I) && I?.authToken !== void 0 && (de = I.authToken);
    let We = typeof Z == "function" ? Z(g, A, { jwtAuth: de !== void 0 }) : Z, fe = { "Neon-Connection-String": r2, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true" }, _e = await Fu(de);
    _e && (fe.Authorization = `Bearer ${_e}`), Array.isArray(P) && (R !== void 0 && (fe["Neon-Batch-Isolation-Level"] = R), j !== void 0 && (fe["Neon-Batch-Read-Only"] = String(j)), le !== void 0 && (fe["Neon-Batch-Deferrable"] = String(le))), c2 || ce.disableWarningInBrowsers || bt();
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
        return M.map(($, me) => {
          let Ot = I[me] ?? {}, vo = Ot.arrayMode ?? se, xo = Ot.fullResults ?? oe;
          return os(
            $,
            { arrayMode: vo, fullResults: xo, types: Ot.types }
          );
        });
      } else {
        let M = I ?? {}, $ = M.arrayMode ?? se, me = M.fullResults ?? oe;
        return os(ee, { arrayMode: $, fullResults: me, types: M.types });
      }
    } else {
      let { status: ee } = ye;
      if (ee === 400) {
        let M = await ye.json(), $ = new be(M.message);
        for (let me of Ru) $[me] = M[me] ?? void 0;
        throw $;
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
  constructor(e3, t, n2) {
    this.execute = e3;
    this.queryData = t;
    this.opts = n2;
  }
  then(e3, t) {
    return this.execute(this.queryData, this.opts).then(e3, t);
  }
  catch(e3) {
    return this.execute(this.queryData, this.opts).catch(e3);
  }
  finally(e3) {
    return this.execute(
      this.queryData,
      this.opts
    ).finally(e3);
  }
};
a(dr, "NeonQueryPromise");
var Ce = dr;
function os(r2, {
  arrayMode: e3,
  fullResults: t,
  types: n2
}) {
  let i3 = new as.default(n2), s3 = r2.fields.map((c2) => c2.name), o2 = r2.fields.map((c2) => i3.getTypeParser(
    c2.dataTypeID
  )), u2 = e3 === true ? r2.rows.map((c2) => c2.map((l2, f2) => l2 === null ? null : o2[f2](l2))) : r2.rows.map((c2) => Object.fromEntries(
    c2.map((l2, f2) => [s3[f2], l2 === null ? null : o2[f2](l2)])
  ));
  return t ? (r2.viaNeonFetch = true, r2.rowAsArray = e3, r2.rows = u2, r2._parsers = o2, r2._types = i3, r2) : u2;
}
__name(os, "os");
a(os, "processQueryResult");
async function Fu(r2) {
  if (typeof r2 == "string") return r2;
  if (typeof r2 == "function") try {
    return await Promise.resolve(r2());
  } catch (e3) {
    let t = new be("Error getting auth token.");
    throw e3 instanceof Error && (t = new be(`Error getting auth token: ${e3.message}`)), t;
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
    let { neonConfig: n2 } = this;
    n2.forceDisablePgSSL && (this.ssl = this.connection.ssl = false), this.ssl && n2.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
    let i3 = typeof this.config != "string" && this.config?.host !== void 0 || typeof this.config != "string" && this.config?.connectionString !== void 0 || m.env.PGHOST !== void 0, s3 = m.env.USER ?? m.env.USERNAME;
    if (!i3 && this.host === "localhost" && this.user === s3 && this.database === s3 && this.password === null) throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s3}, db: ${s3}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
    let o2 = super.connect(t), u2 = n2.pipelineTLS && this.ssl, c2 = n2.pipelineConnect === "password";
    if (!u2 && !n2.pipelineConnect) return o2;
    let l2 = this.connection;
    if (u2 && l2.on(
      "connect",
      () => l2.stream.emit("data", "S")
    ), c2) {
      l2.removeAllListeners("authenticationCleartextPassword"), l2.removeAllListeners("readyForQuery"), l2.once("readyForQuery", () => l2.on("readyForQuery", this._handleReadyForQuery.bind(this)));
      let f2 = this.ssl ? "sslconnect" : "connect";
      l2.on(f2, () => {
        this.neonConfig.disableWarningInBrowsers || bt(), this._handleAuthCleartextPassword(), this._handleReadyForQuery();
      });
    }
    return o2;
  }
  async _handleAuthSASLContinue(t) {
    if (typeof crypto > "u" || crypto.subtle === void 0 || crypto.subtle.importKey === void 0) throw new Error("Cannot use SASL auth when `crypto.subtle` is not defined");
    let n2 = crypto.subtle, i3 = this.saslSession, s3 = this.password, o2 = t.data;
    if (i3.message !== "SASLInitialResponse" || typeof s3 != "string" || typeof o2 != "string") throw new Error(
      "SASL: protocol error"
    );
    let u2 = Object.fromEntries(o2.split(",").map((M) => {
      if (!/^.=/.test(M)) throw new Error(
        "SASL: Invalid attribute pair entry"
      );
      let $ = M[0], me = M.substring(2);
      return [$, me];
    })), c2 = u2.r, l2 = u2.s, f2 = u2.i;
    if (!c2 || !/^[!-+--~]+$/.test(c2)) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
    if (!l2 || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(l2)) throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64"
    );
    if (!f2 || !/^[1-9][0-9]*$/.test(f2)) throw new Error(
      "SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count"
    );
    if (!c2.startsWith(i3.clientNonce))
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    if (c2.length === i3.clientNonce.length) throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    let y2 = parseInt(f2, 10), g = d.from(l2, "base64"), A = new TextEncoder(), C = A.encode(s3), D = await n2.importKey(
      "raw",
      C,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), Y = new Uint8Array(await n2.sign("HMAC", D, d.concat(
      [g, d.from([0, 0, 0, 1])]
    ))), P = Y;
    for (var I = 0; I < y2 - 1; I++) Y = new Uint8Array(await n2.sign("HMAC", D, Y)), P = d.from(
      P.map((M, $) => P[$] ^ Y[$])
    );
    let w2 = P, Z = await n2.importKey(
      "raw",
      w2,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), W = new Uint8Array(await n2.sign("HMAC", Z, A.encode("Client Key"))), J = await n2.digest(
      "SHA-256",
      W
    ), X = "n=*,r=" + i3.clientNonce, se = "r=" + c2 + ",s=" + l2 + ",i=" + y2, oe = "c=biws,r=" + c2, R = X + "," + se + "," + oe, j = await n2.importKey(
      "raw",
      J,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    var le = new Uint8Array(await n2.sign(
      "HMAC",
      j,
      A.encode(R)
    )), de = d.from(W.map((M, $) => W[$] ^ le[$])), We = de.toString("base64");
    let fe = await n2.importKey(
      "raw",
      w2,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    ), _e = await n2.sign("HMAC", fe, A.encode("Server Key")), ye = await n2.importKey("raw", _e, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
    var ee = d.from(
      await n2.sign("HMAC", ye, A.encode(R))
    );
    i3.message = "SASLResponse", i3.serverSignature = ee.toString("base64"), i3.response = oe + ",p=" + We, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
  }
};
a(
  kn,
  "NeonClient"
);
var ut = kn;
Fe();
var bo = Se(Bt());
function vl(r2, e3) {
  if (e3) return { callback: e3, result: void 0 };
  let t, n2, i3 = a(function(o2, u2) {
    o2 ? t(o2) : n2(u2);
  }, "cb"), s3 = new r2(function(o2, u2) {
    n2 = o2, t = u2;
  });
  return { callback: i3, result: s3 };
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
  on(t, n2) {
    return t !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t, n2);
  }
  query(t, n2, i3) {
    if (!ce.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t == "function") return super.query(
      t,
      n2,
      i3
    );
    typeof n2 == "function" && (i3 = n2, n2 = void 0);
    let s3 = vl(this.Promise, i3);
    i3 = s3.callback;
    try {
      let o2 = new bo.default(
        this.options
      ), u2 = encodeURIComponent, c2 = encodeURI, l2 = `postgresql://${u2(o2.user)}:${u2(o2.password)}@${u2(o2.host)}/${c2(o2.database)}`, f2 = typeof t == "string" ? t : t.text, y2 = n2 ?? t.values ?? [];
      cs(l2, { fullResults: true, arrayMode: t.rowMode === "array" }).query(f2, y2, { types: t.types ?? this.options?.types }).then((A) => i3(void 0, A)).catch((A) => i3(
        A
      ));
    } catch (o2) {
      i3(o2);
    }
    return s3.result;
  }
};
a(Un, "NeonPool");
Fe();
var ct = Se(ot());
var export_DatabaseError = ct.DatabaseError;
var export_defaults = ct.defaults;
var export_escapeIdentifier = ct.escapeIdentifier;
var export_escapeLiteral = ct.escapeLiteral;
var export_types = ct.types;

// node_modules/drizzle-orm/neon-http/session.js
var rawQueryConfig = {
  arrayMode: false,
  fullResults: true
};
var queryConfig = {
  arrayMode: true,
  fullResults: true
};
var NeonHttpPreparedQuery = class extends PgPreparedQuery {
  static {
    __name(this, "NeonHttpPreparedQuery");
  }
  constructor(client, query, logger, fields, _isResponseInArrayMode, customResultMapper) {
    super(query);
    this.client = client;
    this.logger = logger;
    this.fields = fields;
    this._isResponseInArrayMode = _isResponseInArrayMode;
    this.customResultMapper = customResultMapper;
    this.clientQuery = client.query ?? client;
  }
  static [entityKind] = "NeonHttpPreparedQuery";
  clientQuery;
  /** @internal */
  async execute(placeholderValues = {}, token = this.authToken) {
    const params = fillPlaceholders(this.query.params, placeholderValues);
    this.logger.logQuery(this.query.sql, params);
    const { fields, clientQuery, query, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      return clientQuery(
        query.sql,
        params,
        token === void 0 ? rawQueryConfig : {
          ...rawQueryConfig,
          authToken: token
        }
      );
    }
    const result = await clientQuery(
      query.sql,
      params,
      token === void 0 ? queryConfig : {
        ...queryConfig,
        authToken: token
      }
    );
    return this.mapResult(result);
  }
  mapResult(result) {
    if (!this.fields && !this.customResultMapper) {
      return result;
    }
    const rows = result.rows;
    if (this.customResultMapper) {
      return this.customResultMapper(rows);
    }
    return rows.map((row) => mapResultRow(this.fields, row, this.joinsNotNullableMap));
  }
  all(placeholderValues = {}) {
    const params = fillPlaceholders(this.query.params, placeholderValues);
    this.logger.logQuery(this.query.sql, params);
    return this.clientQuery(
      this.query.sql,
      params,
      this.authToken === void 0 ? rawQueryConfig : {
        ...rawQueryConfig,
        authToken: this.authToken
      }
    ).then((result) => result.rows);
  }
  /** @internal */
  values(placeholderValues = {}, token) {
    const params = fillPlaceholders(this.query.params, placeholderValues);
    this.logger.logQuery(this.query.sql, params);
    return this.clientQuery(this.query.sql, params, { arrayMode: true, fullResults: true, authToken: token }).then((result) => result.rows);
  }
  /** @internal */
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
};
var NeonHttpSession = class extends PgSession {
  static {
    __name(this, "NeonHttpSession");
  }
  constructor(client, dialect, schema, options = {}) {
    super(dialect);
    this.client = client;
    this.schema = schema;
    this.options = options;
    this.clientQuery = client.query ?? client;
    this.logger = options.logger ?? new NoopLogger();
  }
  static [entityKind] = "NeonHttpSession";
  clientQuery;
  logger;
  prepareQuery(query, fields, name18, isResponseInArrayMode, customResultMapper) {
    return new NeonHttpPreparedQuery(
      this.client,
      query,
      this.logger,
      fields,
      isResponseInArrayMode,
      customResultMapper
    );
  }
  async batch(queries) {
    const preparedQueries = [];
    const builtQueries = [];
    for (const query of queries) {
      const preparedQuery = query._prepare();
      const builtQuery = preparedQuery.getQuery();
      preparedQueries.push(preparedQuery);
      builtQueries.push(
        this.clientQuery(builtQuery.sql, builtQuery.params, {
          fullResults: true,
          arrayMode: preparedQuery.isResponseInArrayMode()
        })
      );
    }
    const batchResults = await this.client.transaction(builtQueries, queryConfig);
    return batchResults.map((result, i3) => preparedQueries[i3].mapResult(result, true));
  }
  // change return type to QueryRows<true>
  async query(query, params) {
    this.logger.logQuery(query, params);
    const result = await this.clientQuery(query, params, { arrayMode: true, fullResults: true });
    return result;
  }
  // change return type to QueryRows<false>
  async queryObjects(query, params) {
    return this.clientQuery(query, params, { arrayMode: false, fullResults: true });
  }
  /** @internal */
  async count(sql2, token) {
    const res = await this.execute(sql2, token);
    return Number(
      res["rows"][0]["count"]
    );
  }
  async transaction(_transaction, _config = {}) {
    throw new Error("No transactions support in neon-http driver");
  }
};
var NeonTransaction = class extends PgTransaction {
  static {
    __name(this, "NeonTransaction");
  }
  static [entityKind] = "NeonHttpTransaction";
  async transaction(_transaction) {
    throw new Error("No transactions support in neon-http driver");
  }
};

// node_modules/drizzle-orm/neon-http/driver.js
var NeonHttpDriver = class {
  static {
    __name(this, "NeonHttpDriver");
  }
  constructor(client, dialect, options = {}) {
    this.client = client;
    this.dialect = dialect;
    this.options = options;
    this.initMappers();
  }
  static [entityKind] = "NeonHttpDriver";
  createSession(schema) {
    return new NeonHttpSession(this.client, this.dialect, schema, { logger: this.options.logger });
  }
  initMappers() {
    export_types.setTypeParser(export_types.builtins.TIMESTAMPTZ, (val) => val);
    export_types.setTypeParser(export_types.builtins.TIMESTAMP, (val) => val);
    export_types.setTypeParser(export_types.builtins.DATE, (val) => val);
    export_types.setTypeParser(export_types.builtins.INTERVAL, (val) => val);
    export_types.setTypeParser(1231, (val) => val);
    export_types.setTypeParser(1115, (val) => val);
    export_types.setTypeParser(1185, (val) => val);
    export_types.setTypeParser(1187, (val) => val);
    export_types.setTypeParser(1182, (val) => val);
  }
};
function wrap(target, token, cb, deep) {
  return new Proxy(target, {
    get(target2, p3) {
      const element = target2[p3];
      if (typeof element !== "function" && (typeof element !== "object" || element === null))
        return element;
      if (deep)
        return wrap(element, token, cb);
      if (p3 === "query")
        return wrap(element, token, cb, true);
      return new Proxy(element, {
        apply(target3, thisArg, argArray) {
          const res = target3.call(thisArg, ...argArray);
          if (typeof res === "object" && res !== null && "setToken" in res && typeof res.setToken === "function") {
            res.setToken(token);
          }
          return cb(target3, p3, res);
        }
      });
    }
  });
}
__name(wrap, "wrap");
var NeonHttpDatabase = class extends PgDatabase {
  static {
    __name(this, "NeonHttpDatabase");
  }
  static [entityKind] = "NeonHttpDatabase";
  $withAuth(token) {
    this.authToken = token;
    return wrap(this, token, (target, p3, res) => {
      if (p3 === "with") {
        return wrap(res, token, (_, __, res2) => res2);
      }
      return res;
    });
  }
  async batch(batch) {
    return this.session.batch(batch);
  }
};
function construct(client, config = {}) {
  const dialect = new PgDialect({ casing: config.casing });
  let logger;
  if (config.logger === true) {
    logger = new DefaultLogger();
  } else if (config.logger !== false) {
    logger = config.logger;
  }
  let schema;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(
      config.schema,
      createTableRelationsHelpers
    );
    schema = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const driver = new NeonHttpDriver(client, dialect, { logger });
  const session = driver.createSession(schema);
  const db = new NeonHttpDatabase(
    dialect,
    session,
    schema
  );
  db.$client = client;
  return db;
}
__name(construct, "construct");
function drizzle(...params) {
  if (typeof params[0] === "string") {
    const instance = cs(params[0]);
    return construct(instance, params[1]);
  }
  if (isConfig(params[0])) {
    const { connection, client, ...drizzleConfig } = params[0];
    if (client)
      return construct(client, drizzleConfig);
    if (typeof connection === "object") {
      const { connectionString, ...options } = connection;
      const instance2 = cs(connectionString, options);
      return construct(instance2, drizzleConfig);
    }
    const instance = cs(connection);
    return construct(instance, drizzleConfig);
  }
  return construct(params[0], params[1]);
}
__name(drizzle, "drizzle");
((drizzle2) => {
  function mock(config) {
    return construct({}, config);
  }
  __name(mock, "mock");
  drizzle2.mock = mock;
})(drizzle || (drizzle = {}));

// packages/core/src/shared/config.ts
var Config;
((Config2) => {
  Config2.DATABASE_URL = process.env.DATABASE_URL;
  Config2.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
})(Config || (Config = {}));

// packages/core/src/shared/drizzle.ts
var Drizzle;
((Drizzle2) => {
  Drizzle2.client = cs(Config.DATABASE_URL);
  Drizzle2.db = drizzle({ client: Drizzle2.client });
  Drizzle2.ulid = /* @__PURE__ */ __name((name18) => char(name18, { length: 30 }), "ulid");
  Drizzle2.id = {
    get id() {
      return (0, Drizzle2.ulid)("id").primaryKey();
    }
  };
  Drizzle2.timestamps = {
    timeCreated: timestamp("time_created").notNull().defaultNow(),
    timeUpdated: timestamp("time_updated").notNull().default(sql`CURRENT_TIMESTAMP(3)`),
    timeDeleted: timestamp("time_deleted")
  };
  Drizzle2.isActive = {
    isActive: boolean("is_active").notNull().default(true)
  };
})(Drizzle || (Drizzle = {}));

// packages/core/src/clothe/clothe.sql.ts
var clotheTable = pgTable("clothe", {
  ...Drizzle.id,
  ...Drizzle.timestamps,
  ...Drizzle.isActive,
  name: varchar("name", { length: 100 }).notNull(),
  codeqr: varchar("codeqr", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  size: varchar("size", { length: 20 }).notNull(),
  color: varchar("color", { length: 100 }).notNull(),
  material: varchar("material", { length: 100 }).notNull(),
  quantity: doublePrecision("quantity").notNull(),
  image: varchar("image", { length: 612 }),
  status: varchar("status", { length: 100 }).notNull(),
  costPrice: doublePrecision("costPrice").notNull(),
  sellingPrice: doublePrecision("sellingPrice").notNull()
});

// packages/core/src/shared/fn.ts
function fn(arg1, cb) {
  const result = /* @__PURE__ */ __name(function(input) {
    const parsed = arg1.parse(input);
    return cb.apply(cb, [parsed]);
  }, "result");
  result.schema = arg1;
  return result;
}
__name(fn, "fn");

// packages/core/src/clothe/index.ts
var Clothe;
((Clothe2) => {
  Clothe2.InfoSchema = external_exports.object({
    id: external_exports.string().openapi({
      description: Common.IdDescription,
      example: Examples.Clothe.id
    }),
    name: external_exports.string().openapi({
      description: "Name of the Clothe.",
      example: Examples.Clothe.name
    }),
    codeqr: external_exports.string().openapi({
      description: "Code qr of the Clothe.",
      example: Examples.Clothe.codeqr
    }),
    color: external_exports.string().openapi({
      description: "Color of the Clothe.",
      example: Examples.Clothe.color
    }),
    image: external_exports.string().url().nullish().openapi({
      description: "URL of the Clothe image.",
      example: Examples.Clothe.image
    }),
    category: external_exports.string().openapi({
      description: "Category of the Clothe.",
      example: Examples.Clothe.category
    }),
    size: external_exports.string().openapi({
      description: "size of the Clothe.",
      example: Examples.Clothe.size
    }),
    quantity: external_exports.number().openapi({
      description: "Quantity of the Clothe in units.",
      example: Examples.Clothe.quantity
    }),
    status: external_exports.string().openapi({
      description: "Status of the Clothe.",
      example: Examples.Clothe.status
    }),
    material: external_exports.string().openapi({
      description: "Status of the Clothe.",
      example: Examples.Clothe.material
    }),
    costPrice: external_exports.number().openapi({
      description: "Quantity of the Clothe in units.",
      example: Examples.Clothe.costPrice
    }),
    sellingPrice: external_exports.number().openapi({
      description: "Quantity of the Clothe in units.",
      example: Examples.Clothe.sellingPrice
    })
  }).openapi({
    ref: "Clothe",
    description: "A collection of cards with a theme or purpose.",
    example: Examples.Clothe
  });
  function serialize2(input) {
    return {
      id: input.id,
      name: input.name,
      codeqr: input.codeqr,
      status: input.status,
      color: input.color,
      image: input.image,
      category: input.category,
      size: input.size,
      quantity: input.quantity,
      material: input.material,
      costPrice: input.costPrice,
      sellingPrice: input.sellingPrice
    };
  }
  __name(serialize2, "serialize");
  Clothe2.list = /* @__PURE__ */ __name(async () => {
    const select = await Drizzle.db.select().from(clotheTable).where(eq(clotheTable.isActive, true));
    return select.map(serialize2);
  }, "list");
  Clothe2.create = fn(Clothe2.InfoSchema.partial({ id: true }), async (data) => {
    const id = data.id || createID("clothe");
    await Drizzle.db.insert(clotheTable).values({ ...data, id });
    return id;
  });
  Clothe2.update = fn(Clothe2.InfoSchema, async (data) => {
    await Drizzle.db.update(clotheTable).set({ ...data, timeUpdated: /* @__PURE__ */ new Date() }).where(eq(clotheTable.id, data.id));
    return data.id;
  });
  Clothe2.getDetail = fn(Clothe2.InfoSchema.pick({ id: true }), async ({ id }) => {
    const select = await Drizzle.db.select().from(clotheTable).where(and(eq(clotheTable.id, id), eq(clotheTable.isActive, true)));
    return select.map(serialize2).at(0);
  });
  Clothe2.deactivate = fn(
    Clothe2.InfoSchema.pick({ id: true }),
    async ({ id }) => {
      await Drizzle.db.update(clotheTable).set({ isActive: false, timeDeleted: /* @__PURE__ */ new Date() }).where(eq(clotheTable.id, id));
      return id;
    }
  );
})(Clothe || (Clothe = {}));

// node_modules/ai/node_modules/@ai-sdk/provider/dist/index.mjs
var marker = "vercel.ai.error";
var symbol = Symbol.for(marker);
var _a;
var _AISDKError = class _AISDKError2 extends Error {
  static {
    __name(this, "_AISDKError");
  }
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name143,
    message,
    cause
  }) {
    super(message);
    this[_a] = true;
    this.name = name143;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError2.hasMarker(error, marker);
  }
  static hasMarker(error, marker153) {
    const markerSymbol = Symbol.for(marker153);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
};
_a = symbol;
var AISDKError = _AISDKError;
var name = "AI_APICallError";
var marker2 = `vercel.ai.error.${name}`;
var symbol2 = Symbol.for(marker2);
var _a2;
var APICallError = class extends AISDKError {
  static {
    __name(this, "APICallError");
  }
  constructor({
    message,
    url,
    requestBodyValues,
    statusCode,
    responseHeaders,
    responseBody,
    cause,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500),
    // server error
    data
  }) {
    super({ name, message, cause });
    this[_a2] = true;
    this.url = url;
    this.requestBodyValues = requestBodyValues;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.responseBody = responseBody;
    this.isRetryable = isRetryable;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker2);
  }
};
_a2 = symbol2;
var name2 = "AI_EmptyResponseBodyError";
var marker3 = `vercel.ai.error.${name2}`;
var symbol3 = Symbol.for(marker3);
var _a3;
_a3 = symbol3;
function getErrorMessage(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
__name(getErrorMessage, "getErrorMessage");
var name3 = "AI_InvalidArgumentError";
var marker4 = `vercel.ai.error.${name3}`;
var symbol4 = Symbol.for(marker4);
var _a4;
var InvalidArgumentError = class extends AISDKError {
  static {
    __name(this, "InvalidArgumentError");
  }
  constructor({
    message,
    cause,
    argument
  }) {
    super({ name: name3, message, cause });
    this[_a4] = true;
    this.argument = argument;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker4);
  }
};
_a4 = symbol4;
var name4 = "AI_InvalidPromptError";
var marker5 = `vercel.ai.error.${name4}`;
var symbol5 = Symbol.for(marker5);
var _a5;
var InvalidPromptError = class extends AISDKError {
  static {
    __name(this, "InvalidPromptError");
  }
  constructor({
    prompt,
    message,
    cause
  }) {
    super({ name: name4, message: `Invalid prompt: ${message}`, cause });
    this[_a5] = true;
    this.prompt = prompt;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker5);
  }
};
_a5 = symbol5;
var name5 = "AI_InvalidResponseDataError";
var marker6 = `vercel.ai.error.${name5}`;
var symbol6 = Symbol.for(marker6);
var _a6;
_a6 = symbol6;
var name6 = "AI_JSONParseError";
var marker7 = `vercel.ai.error.${name6}`;
var symbol7 = Symbol.for(marker7);
var _a7;
var JSONParseError = class extends AISDKError {
  static {
    __name(this, "JSONParseError");
  }
  constructor({ text: text4, cause }) {
    super({
      name: name6,
      message: `JSON parsing failed: Text: ${text4}.
Error message: ${getErrorMessage(cause)}`,
      cause
    });
    this[_a7] = true;
    this.text = text4;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker7);
  }
};
_a7 = symbol7;
var name7 = "AI_LoadAPIKeyError";
var marker8 = `vercel.ai.error.${name7}`;
var symbol8 = Symbol.for(marker8);
var _a8;
_a8 = symbol8;
var name8 = "AI_LoadSettingError";
var marker9 = `vercel.ai.error.${name8}`;
var symbol9 = Symbol.for(marker9);
var _a9;
_a9 = symbol9;
var name9 = "AI_NoContentGeneratedError";
var marker10 = `vercel.ai.error.${name9}`;
var symbol10 = Symbol.for(marker10);
var _a10;
_a10 = symbol10;
var name10 = "AI_NoSuchModelError";
var marker11 = `vercel.ai.error.${name10}`;
var symbol11 = Symbol.for(marker11);
var _a11;
_a11 = symbol11;
var name11 = "AI_TooManyEmbeddingValuesForCallError";
var marker12 = `vercel.ai.error.${name11}`;
var symbol12 = Symbol.for(marker12);
var _a12;
_a12 = symbol12;
var name12 = "AI_TypeValidationError";
var marker13 = `vercel.ai.error.${name12}`;
var symbol13 = Symbol.for(marker13);
var _a13;
var _TypeValidationError = class _TypeValidationError2 extends AISDKError {
  static {
    __name(this, "_TypeValidationError");
  }
  constructor({ value, cause }) {
    super({
      name: name12,
      message: `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage(cause)}`,
      cause
    });
    this[_a13] = true;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker13);
  }
  /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */
  static wrap({
    value,
    cause
  }) {
    return _TypeValidationError2.isInstance(cause) && cause.value === value ? cause : new _TypeValidationError2({ value, cause });
  }
};
_a13 = symbol13;
var TypeValidationError = _TypeValidationError;
var name13 = "AI_UnsupportedFunctionalityError";
var marker14 = `vercel.ai.error.${name13}`;
var symbol14 = Symbol.for(marker14);
var _a14;
_a14 = symbol14;

// node_modules/nanoid/non-secure/index.js
var customAlphabet = /* @__PURE__ */ __name((alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = "";
    let i3 = size | 0;
    while (i3--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
}, "customAlphabet");

// node_modules/ai/node_modules/@ai-sdk/provider-utils/dist/index.mjs
var import_secure_json_parse = __toESM(require_secure_json_parse(), 1);
function convertAsyncIteratorToReadableStream(iterator) {
  return new ReadableStream({
    /**
     * Called when the consumer wants to pull more data from the stream.
     *
     * @param {ReadableStreamDefaultController<T>} controller - The controller to enqueue data into the stream.
     * @returns {Promise<void>}
     */
    async pull(controller) {
      try {
        const { value, done } = await iterator.next();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        controller.error(error);
      }
    },
    /**
     * Called when the consumer cancels the stream.
     */
    cancel() {
    }
  });
}
__name(convertAsyncIteratorToReadableStream, "convertAsyncIteratorToReadableStream");
async function delay(delayInMs) {
  return delayInMs == null ? Promise.resolve() : new Promise((resolve2) => setTimeout(resolve2, delayInMs));
}
__name(delay, "delay");
var createIdGenerator = /* @__PURE__ */ __name(({
  prefix,
  size: defaultSize = 16,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator = "-"
} = {}) => {
  const generator = customAlphabet(alphabet, defaultSize);
  if (prefix == null) {
    return generator;
  }
  if (alphabet.includes(separator)) {
    throw new InvalidArgumentError({
      argument: "separator",
      message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
    });
  }
  return (size) => `${prefix}${separator}${generator(size)}`;
}, "createIdGenerator");
var generateId = createIdGenerator();
function getErrorMessage2(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
__name(getErrorMessage2, "getErrorMessage");
function isAbortError(error) {
  return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}
__name(isAbortError, "isAbortError");
var validatorSymbol = Symbol.for("vercel.ai.validator");
function validator(validate) {
  return { [validatorSymbol]: true, validate };
}
__name(validator, "validator");
function isValidator(value) {
  return typeof value === "object" && value !== null && validatorSymbol in value && value[validatorSymbol] === true && "validate" in value;
}
__name(isValidator, "isValidator");
function asValidator(value) {
  return isValidator(value) ? value : zodValidator(value);
}
__name(asValidator, "asValidator");
function zodValidator(zodSchema2) {
  return validator((value) => {
    const result = zodSchema2.safeParse(value);
    return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
  });
}
__name(zodValidator, "zodValidator");
function safeValidateTypes({
  value,
  schema
}) {
  const validator22 = asValidator(schema);
  try {
    if (validator22.validate == null) {
      return { success: true, value };
    }
    const result = validator22.validate(value);
    if (result.success) {
      return result;
    }
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: result.error })
    };
  } catch (error) {
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: error })
    };
  }
}
__name(safeValidateTypes, "safeValidateTypes");
function safeParseJSON({
  text: text4,
  schema
}) {
  try {
    const value = import_secure_json_parse.default.parse(text4);
    if (schema == null) {
      return { success: true, value, rawValue: value };
    }
    const validationResult = safeValidateTypes({ value, schema });
    return validationResult.success ? { ...validationResult, rawValue: value } : validationResult;
  } catch (error) {
    return {
      success: false,
      error: JSONParseError.isInstance(error) ? error : new JSONParseError({ text: text4, cause: error })
    };
  }
}
__name(safeParseJSON, "safeParseJSON");
var { btoa: btoa2, atob: atob2 } = globalThis;
function convertBase64ToUint8Array(base64String) {
  const base64Url = base64String.replace(/-/g, "+").replace(/_/g, "/");
  const latin1string = atob2(base64Url);
  return Uint8Array.from(latin1string, (byte) => byte.codePointAt(0));
}
__name(convertBase64ToUint8Array, "convertBase64ToUint8Array");
function convertUint8ArrayToBase64(array) {
  let latin1string = "";
  for (let i3 = 0; i3 < array.length; i3++) {
    latin1string += String.fromCodePoint(array[i3]);
  }
  return btoa2(latin1string);
}
__name(convertUint8ArrayToBase64, "convertUint8ArrayToBase64");

// node_modules/@ai-sdk/ui-utils/node_modules/@ai-sdk/provider/dist/index.mjs
var marker15 = "vercel.ai.error";
var symbol15 = Symbol.for(marker15);
var _a15;
var _AISDKError3 = class _AISDKError4 extends Error {
  static {
    __name(this, "_AISDKError");
  }
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name143,
    message,
    cause
  }) {
    super(message);
    this[_a15] = true;
    this.name = name143;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError4.hasMarker(error, marker15);
  }
  static hasMarker(error, marker153) {
    const markerSymbol = Symbol.for(marker153);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
};
_a15 = symbol15;
var AISDKError2 = _AISDKError3;
var name14 = "AI_APICallError";
var marker22 = `vercel.ai.error.${name14}`;
var symbol22 = Symbol.for(marker22);
var _a22;
_a22 = symbol22;
var name22 = "AI_EmptyResponseBodyError";
var marker32 = `vercel.ai.error.${name22}`;
var symbol32 = Symbol.for(marker32);
var _a32;
_a32 = symbol32;
function getErrorMessage3(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
__name(getErrorMessage3, "getErrorMessage");
var name32 = "AI_InvalidArgumentError";
var marker42 = `vercel.ai.error.${name32}`;
var symbol42 = Symbol.for(marker42);
var _a42;
var InvalidArgumentError2 = class extends AISDKError2 {
  static {
    __name(this, "InvalidArgumentError");
  }
  constructor({
    message,
    cause,
    argument
  }) {
    super({ name: name32, message, cause });
    this[_a42] = true;
    this.argument = argument;
  }
  static isInstance(error) {
    return AISDKError2.hasMarker(error, marker42);
  }
};
_a42 = symbol42;
var name42 = "AI_InvalidPromptError";
var marker52 = `vercel.ai.error.${name42}`;
var symbol52 = Symbol.for(marker52);
var _a52;
_a52 = symbol52;
var name52 = "AI_InvalidResponseDataError";
var marker62 = `vercel.ai.error.${name52}`;
var symbol62 = Symbol.for(marker62);
var _a62;
_a62 = symbol62;
var name62 = "AI_JSONParseError";
var marker72 = `vercel.ai.error.${name62}`;
var symbol72 = Symbol.for(marker72);
var _a72;
var JSONParseError2 = class extends AISDKError2 {
  static {
    __name(this, "JSONParseError");
  }
  constructor({ text: text4, cause }) {
    super({
      name: name62,
      message: `JSON parsing failed: Text: ${text4}.
Error message: ${getErrorMessage3(cause)}`,
      cause
    });
    this[_a72] = true;
    this.text = text4;
  }
  static isInstance(error) {
    return AISDKError2.hasMarker(error, marker72);
  }
};
_a72 = symbol72;
var name72 = "AI_LoadAPIKeyError";
var marker82 = `vercel.ai.error.${name72}`;
var symbol82 = Symbol.for(marker82);
var _a82;
_a82 = symbol82;
var name82 = "AI_LoadSettingError";
var marker92 = `vercel.ai.error.${name82}`;
var symbol92 = Symbol.for(marker92);
var _a92;
_a92 = symbol92;
var name92 = "AI_NoContentGeneratedError";
var marker102 = `vercel.ai.error.${name92}`;
var symbol102 = Symbol.for(marker102);
var _a102;
_a102 = symbol102;
var name102 = "AI_NoSuchModelError";
var marker112 = `vercel.ai.error.${name102}`;
var symbol112 = Symbol.for(marker112);
var _a112;
_a112 = symbol112;
var name112 = "AI_TooManyEmbeddingValuesForCallError";
var marker122 = `vercel.ai.error.${name112}`;
var symbol122 = Symbol.for(marker122);
var _a122;
_a122 = symbol122;
var name122 = "AI_TypeValidationError";
var marker132 = `vercel.ai.error.${name122}`;
var symbol132 = Symbol.for(marker132);
var _a132;
var _TypeValidationError3 = class _TypeValidationError4 extends AISDKError2 {
  static {
    __name(this, "_TypeValidationError");
  }
  constructor({ value, cause }) {
    super({
      name: name122,
      message: `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage3(cause)}`,
      cause
    });
    this[_a132] = true;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError2.hasMarker(error, marker132);
  }
  /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */
  static wrap({
    value,
    cause
  }) {
    return _TypeValidationError4.isInstance(cause) && cause.value === value ? cause : new _TypeValidationError4({ value, cause });
  }
};
_a132 = symbol132;
var TypeValidationError2 = _TypeValidationError3;
var name132 = "AI_UnsupportedFunctionalityError";
var marker142 = `vercel.ai.error.${name132}`;
var symbol142 = Symbol.for(marker142);
var _a142;
_a142 = symbol142;

// node_modules/@ai-sdk/ui-utils/node_modules/@ai-sdk/provider-utils/dist/index.mjs
var import_secure_json_parse2 = __toESM(require_secure_json_parse(), 1);
var createIdGenerator2 = /* @__PURE__ */ __name(({
  prefix,
  size: defaultSize = 16,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator = "-"
} = {}) => {
  const generator = customAlphabet(alphabet, defaultSize);
  if (prefix == null) {
    return generator;
  }
  if (alphabet.includes(separator)) {
    throw new InvalidArgumentError2({
      argument: "separator",
      message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
    });
  }
  return (size) => `${prefix}${separator}${generator(size)}`;
}, "createIdGenerator");
var generateId2 = createIdGenerator2();
var validatorSymbol2 = Symbol.for("vercel.ai.validator");
function validator2(validate) {
  return { [validatorSymbol2]: true, validate };
}
__name(validator2, "validator");
function isValidator2(value) {
  return typeof value === "object" && value !== null && validatorSymbol2 in value && value[validatorSymbol2] === true && "validate" in value;
}
__name(isValidator2, "isValidator");
function asValidator2(value) {
  return isValidator2(value) ? value : zodValidator2(value);
}
__name(asValidator2, "asValidator");
function zodValidator2(zodSchema2) {
  return validator2((value) => {
    const result = zodSchema2.safeParse(value);
    return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
  });
}
__name(zodValidator2, "zodValidator");
function safeValidateTypes2({
  value,
  schema
}) {
  const validator22 = asValidator2(schema);
  try {
    if (validator22.validate == null) {
      return { success: true, value };
    }
    const result = validator22.validate(value);
    if (result.success) {
      return result;
    }
    return {
      success: false,
      error: TypeValidationError2.wrap({ value, cause: result.error })
    };
  } catch (error) {
    return {
      success: false,
      error: TypeValidationError2.wrap({ value, cause: error })
    };
  }
}
__name(safeValidateTypes2, "safeValidateTypes");
function safeParseJSON2({
  text: text4,
  schema
}) {
  try {
    const value = import_secure_json_parse2.default.parse(text4);
    if (schema == null) {
      return { success: true, value, rawValue: value };
    }
    const validationResult = safeValidateTypes2({ value, schema });
    return validationResult.success ? { ...validationResult, rawValue: value } : validationResult;
  } catch (error) {
    return {
      success: false,
      error: JSONParseError2.isInstance(error) ? error : new JSONParseError2({ text: text4, cause: error })
    };
  }
}
__name(safeParseJSON2, "safeParseJSON");
var { btoa: btoa3, atob: atob3 } = globalThis;

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: true,
  rejectedAdditionalProperties: false,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
var getDefaultOptions = /* @__PURE__ */ __name((options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
}, "getDefaultOptions");

// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs = /* @__PURE__ */ __name((options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: void 0,
    seen: new Map(Object.entries(_options.definitions).map(([name18, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name18],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
}, "getRefs");

// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
__name(addErrorMessage, "addErrorMessage");
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}
__name(setResponseValueAndErrors, "setResponseValueAndErrors");

// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
  return {};
}
__name(parseAnyDef, "parseAnyDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def && def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}
__name(parseArrayDef, "parseArrayDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
__name(parseBigintDef, "parseBigintDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}
__name(parseBooleanDef, "parseBooleanDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}
__name(parseBrandedDef, "parseBrandedDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef = /* @__PURE__ */ __name((def, refs) => {
  return parseDef(def.innerType._def, refs);
}, "parseCatchDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i3) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
__name(parseDateDef, "parseDateDef");
var integerDateParser = /* @__PURE__ */ __name((def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(
          res,
          "minimum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
      case "max":
        setResponseValueAndErrors(
          res,
          "maximum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
    }
  }
  return res;
}, "integerDateParser");

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}
__name(parseDefaultDef, "parseDefaultDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}
__name(parseEffectsDef, "parseEffectsDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}
__name(parseEnumDef, "parseEnumDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var isJsonSchema7AllOfType = /* @__PURE__ */ __name((type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
}, "isJsonSchema7AllOfType");
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x3) => !!x3);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}
__name(parseIntersectionDef, "parseIntersectionDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}
__name(parseLiteralDef, "parseLiteralDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var emojiRegex2 = void 0;
var zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: /* @__PURE__ */ __name(() => {
    if (emojiRegex2 === void 0) {
      emojiRegex2 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
    }
    return emojiRegex2;
  }, "emoji"),
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check.message, refs);
          break;
        case "cidr": {
          if (check.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
          }
          if (check.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          /* @__PURE__ */ ((_) => {
          })(check);
      }
    }
  }
  return res;
}
__name(parseStringDef, "parseStringDef");
function escapeLiteralCheckValue(literal, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
__name(escapeLiteralCheckValue, "escapeLiteralCheckValue");
var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i3 = 0; i3 < source.length; i3++) {
    if (!ALPHA_NUMERIC.has(source[i3])) {
      result += "\\";
    }
    result += source[i3];
  }
  return result;
}
__name(escapeNonAlphaNumeric, "escapeNonAlphaNumeric");
function addFormat(schema, value, message, refs) {
  if (schema.format || schema.anyOf?.some((x3) => x3.format)) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message, refs);
  }
}
__name(addFormat, "addFormat");
function addPattern(schema, regex, message, refs) {
  if (schema.pattern || schema.allOf?.some((x3) => x3.pattern)) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
  }
}
__name(addPattern, "addPattern");
function stringifyRegExpWithFlags(regex, refs) {
  if (!refs.applyRegexFlags || !regex.flags) {
    return regex.source;
  }
  const flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i3 = 0; i3 < source.length; i3++) {
    if (isEscaped) {
      pattern += source[i3];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i3].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i3];
            pattern += `${source[i3 - 2]}-${source[i3]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i3 + 1] === "-" && source[i3 + 2]?.match(/[a-z]/)) {
            pattern += source[i3];
            inCharRange = true;
          } else {
            pattern += `${source[i3]}${source[i3].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i3].match(/[a-z]/)) {
        pattern += `[${source[i3]}${source[i3].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i3] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i3] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i3] === ".") {
      pattern += inCharGroup ? `${source[i3]}\r
` : `[${source[i3]}\r
]`;
      continue;
    }
    pattern += source[i3];
    if (source[i3] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i3] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i3] === "[") {
      inCharGroup = true;
    }
  }
  try {
    new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex.source;
  }
  return pattern;
}
__name(stringifyRegExpWithFlags, "stringifyRegExpWithFlags");

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openAi") {
    console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
  }
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? {}
      }), {}),
      additionalProperties: refs.rejectedAdditionalProperties
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? refs.allowedAdditionalProperties
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
    const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}
__name(parseRecordDef, "parseRecordDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}
__name(parseMapDef, "parseMapDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object2 = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object2[object2[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object2[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}
__name(parseNativeEnumDef, "parseNativeEnumDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
  return {
    not: {}
  };
}
__name(parseNeverDef, "parseNeverDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}
__name(parseNullDef, "parseNullDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x3) => x3._def.typeName in primitiveMappings && (!x3._def.checks || !x3._def.checks.length))) {
    const types = options.reduce((types2, x3) => {
      const type = primitiveMappings[x3._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x3) => x3._def.typeName === "ZodLiteral" && !x3.description)) {
    const types = options.reduce((acc, x3) => {
      const type = typeof x3._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x3._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x3, i3, a3) => a3.indexOf(x3) === i3);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x3) => {
          return acc.includes(x3._def.value) ? acc : [...acc, x3._def.value];
        }, [])
      };
    }
  } else if (options.every((x3) => x3._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x3) => [
        ...acc,
        ...x3._def.values.filter((x4) => !acc.includes(x4))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
__name(parseUnionDef, "parseUnionDef");
var asAnyOf = /* @__PURE__ */ __name((def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x3, i3) => parseDef(x3._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i3}`]
  })).filter((x3) => !!x3 && (!refs.strictUnions || typeof x3 === "object" && Object.keys(x3).length > 0));
  return anyOf.length ? { anyOf } : void 0;
}, "asAnyOf");

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}
__name(parseNullableDef, "parseNullableDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
__name(parseNumberDef, "parseNumberDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function parseObjectDef(def, refs) {
  const forceOptionalIntoNullable = refs.target === "openAi";
  const result = {
    type: "object",
    properties: {}
  };
  const required = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === void 0 || propDef._def === void 0) {
      continue;
    }
    let propOptional = safeIsOptional(propDef);
    if (propOptional && forceOptionalIntoNullable) {
      if (propDef instanceof ZodOptional) {
        propDef = propDef._def.innerType;
      }
      if (!propDef.isNullable()) {
        propDef = propDef.nullable();
      }
      propOptional = false;
    }
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === void 0) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required.push(propName);
    }
  }
  if (required.length) {
    result.required = required;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== void 0) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
__name(parseObjectDef, "parseObjectDef");
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
__name(decideAdditionalProperties, "decideAdditionalProperties");
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch {
    return true;
  }
}
__name(safeIsOptional, "safeIsOptional");

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef = /* @__PURE__ */ __name((def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: {}
      },
      innerSchema
    ]
  } : {};
}, "parseOptionalDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef = /* @__PURE__ */ __name((def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a3 = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b2 = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a3 ? "1" : "0"]
  });
  return {
    allOf: [a3, b2].filter((x3) => x3 !== void 0)
  };
}, "parsePipelineDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}
__name(parsePromiseDef, "parsePromiseDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}
__name(parseSetDef, "parseSetDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x3, i3) => parseDef(x3._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i3}`]
      })).reduce((acc, x3) => x3 === void 0 ? acc : [...acc, x3], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x3, i3) => parseDef(x3._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i3}`]
      })).reduce((acc, x3) => x3 === void 0 ? acc : [...acc, x3], [])
    };
  }
}
__name(parseTupleDef, "parseTupleDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
  return {
    not: {}
  };
}
__name(parseUndefinedDef, "parseUndefinedDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
  return {};
}
__name(parseUnknownDef, "parseUnknownDef");

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef = /* @__PURE__ */ __name((def, refs) => {
  return parseDef(def.innerType._def, refs);
}, "parseReadonlyDef");

// node_modules/zod-to-json-schema/dist/esm/selectParser.js
var selectParser = /* @__PURE__ */ __name((def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return () => def.getter()._def;
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_) => void 0)(typeName);
  }
}, "selectParser");

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema2 = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema2) {
    addMeta(def, refs, jsonSchema2);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema2, def, refs);
    newItem.jsonSchema = jsonSchema2;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema2;
  return jsonSchema2;
}
__name(parseDef, "parseDef");
var get$ref = /* @__PURE__ */ __name((item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return {};
      }
      return refs.$refStrategy === "seen" ? {} : void 0;
    }
  }
}, "get$ref");
var getRelativePath = /* @__PURE__ */ __name((pathA, pathB) => {
  let i3 = 0;
  for (; i3 < pathA.length && i3 < pathB.length; i3++) {
    if (pathA[i3] !== pathB[i3])
      break;
  }
  return [(pathA.length - i3).toString(), ...pathB.slice(i3)].join("/");
}, "getRelativePath");
var addMeta = /* @__PURE__ */ __name((def, refs, jsonSchema2) => {
  if (def.description) {
    jsonSchema2.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema2.markdownDescription = def.description;
    }
  }
  return jsonSchema2;
}, "addMeta");

// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema = /* @__PURE__ */ __name((schema, options) => {
  const refs = getRefs(options);
  const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name19, schema2]) => ({
    ...acc,
    [name19]: parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name19]
    }, true) ?? {}
  }), {}) : void 0;
  const name18 = typeof options === "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name;
  const main = parseDef(schema._def, name18 === void 0 ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name18]
  }, false) ?? {};
  const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  if (title !== void 0) {
    main.title = title;
  }
  const combined = name18 === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name18
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name18]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  if (refs.target === "openAi" && ("anyOf" in combined || "oneOf" in combined || "allOf" in combined || "type" in combined && Array.isArray(combined.type))) {
    console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
  }
  return combined;
}, "zodToJsonSchema");

// node_modules/zod-to-json-schema/dist/esm/index.js
var esm_default = zodToJsonSchema;

// node_modules/@ai-sdk/ui-utils/dist/index.mjs
var textStreamPart = {
  code: "0",
  name: "text",
  parse: /* @__PURE__ */ __name((value) => {
    if (typeof value !== "string") {
      throw new Error('"text" parts expect a string value.');
    }
    return { type: "text", value };
  }, "parse")
};
var errorStreamPart = {
  code: "3",
  name: "error",
  parse: /* @__PURE__ */ __name((value) => {
    if (typeof value !== "string") {
      throw new Error('"error" parts expect a string value.');
    }
    return { type: "error", value };
  }, "parse")
};
var assistantMessageStreamPart = {
  code: "4",
  name: "assistant_message",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("id" in value) || !("role" in value) || !("content" in value) || typeof value.id !== "string" || typeof value.role !== "string" || value.role !== "assistant" || !Array.isArray(value.content) || !value.content.every(
      (item) => item != null && typeof item === "object" && "type" in item && item.type === "text" && "text" in item && item.text != null && typeof item.text === "object" && "value" in item.text && typeof item.text.value === "string"
    )) {
      throw new Error(
        '"assistant_message" parts expect an object with an "id", "role", and "content" property.'
      );
    }
    return {
      type: "assistant_message",
      value
    };
  }, "parse")
};
var assistantControlDataStreamPart = {
  code: "5",
  name: "assistant_control_data",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("threadId" in value) || !("messageId" in value) || typeof value.threadId !== "string" || typeof value.messageId !== "string") {
      throw new Error(
        '"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.'
      );
    }
    return {
      type: "assistant_control_data",
      value: {
        threadId: value.threadId,
        messageId: value.messageId
      }
    };
  }, "parse")
};
var dataMessageStreamPart = {
  code: "6",
  name: "data_message",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("role" in value) || !("data" in value) || typeof value.role !== "string" || value.role !== "data") {
      throw new Error(
        '"data_message" parts expect an object with a "role" and "data" property.'
      );
    }
    return {
      type: "data_message",
      value
    };
  }, "parse")
};
var assistantStreamParts = [
  textStreamPart,
  errorStreamPart,
  assistantMessageStreamPart,
  assistantControlDataStreamPart,
  dataMessageStreamPart
];
var assistantStreamPartsByCode = {
  [textStreamPart.code]: textStreamPart,
  [errorStreamPart.code]: errorStreamPart,
  [assistantMessageStreamPart.code]: assistantMessageStreamPart,
  [assistantControlDataStreamPart.code]: assistantControlDataStreamPart,
  [dataMessageStreamPart.code]: dataMessageStreamPart
};
var StreamStringPrefixes = {
  [textStreamPart.name]: textStreamPart.code,
  [errorStreamPart.name]: errorStreamPart.code,
  [assistantMessageStreamPart.name]: assistantMessageStreamPart.code,
  [assistantControlDataStreamPart.name]: assistantControlDataStreamPart.code,
  [dataMessageStreamPart.name]: dataMessageStreamPart.code
};
var validCodes = assistantStreamParts.map((part) => part.code);
function fixJson(input) {
  const stack = ["ROOT"];
  let lastValidIndex = -1;
  let literalStart = null;
  function processValueStart(char2, i3, swapState) {
    {
      switch (char2) {
        case '"': {
          lastValidIndex = i3;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_STRING");
          break;
        }
        case "f":
        case "t":
        case "n": {
          lastValidIndex = i3;
          literalStart = i3;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_LITERAL");
          break;
        }
        case "-": {
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          lastValidIndex = i3;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "{": {
          lastValidIndex = i3;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_OBJECT_START");
          break;
        }
        case "[": {
          lastValidIndex = i3;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_ARRAY_START");
          break;
        }
      }
    }
  }
  __name(processValueStart, "processValueStart");
  function processAfterObjectValue(char2, i3) {
    switch (char2) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        lastValidIndex = i3;
        stack.pop();
        break;
      }
    }
  }
  __name(processAfterObjectValue, "processAfterObjectValue");
  function processAfterArrayValue(char2, i3) {
    switch (char2) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_ARRAY_AFTER_COMMA");
        break;
      }
      case "]": {
        lastValidIndex = i3;
        stack.pop();
        break;
      }
    }
  }
  __name(processAfterArrayValue, "processAfterArrayValue");
  for (let i3 = 0; i3 < input.length; i3++) {
    const char2 = input[i3];
    const currentState = stack[stack.length - 1];
    switch (currentState) {
      case "ROOT":
        processValueStart(char2, i3, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (char2) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
          case "}": {
            lastValidIndex = i3;
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (char2) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (char2) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (char2) {
          case ":": {
            stack.pop();
            stack.push("INSIDE_OBJECT_BEFORE_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        processValueStart(char2, i3, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        processAfterObjectValue(char2, i3);
        break;
      }
      case "INSIDE_STRING": {
        switch (char2) {
          case '"': {
            stack.pop();
            lastValidIndex = i3;
            break;
          }
          case "\\": {
            stack.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default: {
            lastValidIndex = i3;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (char2) {
          case "]": {
            lastValidIndex = i3;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i3;
            processValueStart(char2, i3, "INSIDE_ARRAY_AFTER_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (char2) {
          case ",": {
            stack.pop();
            stack.push("INSIDE_ARRAY_AFTER_COMMA");
            break;
          }
          case "]": {
            lastValidIndex = i3;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i3;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        processValueStart(char2, i3, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        stack.pop();
        lastValidIndex = i3;
        break;
      }
      case "INSIDE_NUMBER": {
        switch (char2) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            lastValidIndex = i3;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".": {
            break;
          }
          case ",": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char2, i3);
            }
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char2, i3);
            }
            break;
          }
          case "}": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char2, i3);
            }
            break;
          }
          case "]": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char2, i3);
            }
            break;
          }
          default: {
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, i3 + 1);
        if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
          stack.pop();
          if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
            processAfterObjectValue(char2, i3);
          } else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
            processAfterArrayValue(char2, i3);
          }
        } else {
          lastValidIndex = i3;
        }
        break;
      }
    }
  }
  let result = input.slice(0, lastValidIndex + 1);
  for (let i3 = stack.length - 1; i3 >= 0; i3--) {
    const state = stack[i3];
    switch (state) {
      case "INSIDE_STRING": {
        result += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        result += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        result += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, input.length);
        if ("true".startsWith(partialLiteral)) {
          result += "true".slice(partialLiteral.length);
        } else if ("false".startsWith(partialLiteral)) {
          result += "false".slice(partialLiteral.length);
        } else if ("null".startsWith(partialLiteral)) {
          result += "null".slice(partialLiteral.length);
        }
      }
    }
  }
  return result;
}
__name(fixJson, "fixJson");
function parsePartialJson(jsonText) {
  if (jsonText === void 0) {
    return { value: void 0, state: "undefined-input" };
  }
  let result = safeParseJSON2({ text: jsonText });
  if (result.success) {
    return { value: result.value, state: "successful-parse" };
  }
  result = safeParseJSON2({ text: fixJson(jsonText) });
  if (result.success) {
    return { value: result.value, state: "repaired-parse" };
  }
  return { value: void 0, state: "failed-parse" };
}
__name(parsePartialJson, "parsePartialJson");
var textStreamPart2 = {
  code: "0",
  name: "text",
  parse: /* @__PURE__ */ __name((value) => {
    if (typeof value !== "string") {
      throw new Error('"text" parts expect a string value.');
    }
    return { type: "text", value };
  }, "parse")
};
var dataStreamPart = {
  code: "2",
  name: "data",
  parse: /* @__PURE__ */ __name((value) => {
    if (!Array.isArray(value)) {
      throw new Error('"data" parts expect an array value.');
    }
    return { type: "data", value };
  }, "parse")
};
var errorStreamPart2 = {
  code: "3",
  name: "error",
  parse: /* @__PURE__ */ __name((value) => {
    if (typeof value !== "string") {
      throw new Error('"error" parts expect a string value.');
    }
    return { type: "error", value };
  }, "parse")
};
var messageAnnotationsStreamPart = {
  code: "8",
  name: "message_annotations",
  parse: /* @__PURE__ */ __name((value) => {
    if (!Array.isArray(value)) {
      throw new Error('"message_annotations" parts expect an array value.');
    }
    return { type: "message_annotations", value };
  }, "parse")
};
var toolCallStreamPart = {
  code: "9",
  name: "tool_call",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string" || !("args" in value) || typeof value.args !== "object") {
      throw new Error(
        '"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.'
      );
    }
    return {
      type: "tool_call",
      value
    };
  }, "parse")
};
var toolResultStreamPart = {
  code: "a",
  name: "tool_result",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("result" in value)) {
      throw new Error(
        '"tool_result" parts expect an object with a "toolCallId" and a "result" property.'
      );
    }
    return {
      type: "tool_result",
      value
    };
  }, "parse")
};
var toolCallStreamingStartStreamPart = {
  code: "b",
  name: "tool_call_streaming_start",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string") {
      throw new Error(
        '"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.'
      );
    }
    return {
      type: "tool_call_streaming_start",
      value
    };
  }, "parse")
};
var toolCallDeltaStreamPart = {
  code: "c",
  name: "tool_call_delta",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("argsTextDelta" in value) || typeof value.argsTextDelta !== "string") {
      throw new Error(
        '"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.'
      );
    }
    return {
      type: "tool_call_delta",
      value
    };
  }, "parse")
};
var finishMessageStreamPart = {
  code: "d",
  name: "finish_message",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
      throw new Error(
        '"finish_message" parts expect an object with a "finishReason" property.'
      );
    }
    const result = {
      finishReason: value.finishReason
    };
    if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
      result.usage = {
        promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
        completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
      };
    }
    return {
      type: "finish_message",
      value: result
    };
  }, "parse")
};
var finishStepStreamPart = {
  code: "e",
  name: "finish_step",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
      throw new Error(
        '"finish_step" parts expect an object with a "finishReason" property.'
      );
    }
    const result = {
      finishReason: value.finishReason,
      isContinued: false
    };
    if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
      result.usage = {
        promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
        completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
      };
    }
    if ("isContinued" in value && typeof value.isContinued === "boolean") {
      result.isContinued = value.isContinued;
    }
    return {
      type: "finish_step",
      value: result
    };
  }, "parse")
};
var startStepStreamPart = {
  code: "f",
  name: "start_step",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("messageId" in value) || typeof value.messageId !== "string") {
      throw new Error(
        '"start_step" parts expect an object with an "id" property.'
      );
    }
    return {
      type: "start_step",
      value: {
        messageId: value.messageId
      }
    };
  }, "parse")
};
var reasoningStreamPart = {
  code: "g",
  name: "reasoning",
  parse: /* @__PURE__ */ __name((value) => {
    if (typeof value !== "string") {
      throw new Error('"reasoning" parts expect a string value.');
    }
    return { type: "reasoning", value };
  }, "parse")
};
var sourcePart = {
  code: "h",
  name: "source",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object") {
      throw new Error('"source" parts expect a Source object.');
    }
    return {
      type: "source",
      value
    };
  }, "parse")
};
var redactedReasoningStreamPart = {
  code: "i",
  name: "redacted_reasoning",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("data" in value) || typeof value.data !== "string") {
      throw new Error(
        '"redacted_reasoning" parts expect an object with a "data" property.'
      );
    }
    return { type: "redacted_reasoning", value: { data: value.data } };
  }, "parse")
};
var reasoningSignatureStreamPart = {
  code: "j",
  name: "reasoning_signature",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("signature" in value) || typeof value.signature !== "string") {
      throw new Error(
        '"reasoning_signature" parts expect an object with a "signature" property.'
      );
    }
    return {
      type: "reasoning_signature",
      value: { signature: value.signature }
    };
  }, "parse")
};
var fileStreamPart = {
  code: "k",
  name: "file",
  parse: /* @__PURE__ */ __name((value) => {
    if (value == null || typeof value !== "object" || !("data" in value) || typeof value.data !== "string" || !("mimeType" in value) || typeof value.mimeType !== "string") {
      throw new Error(
        '"file" parts expect an object with a "data" and "mimeType" property.'
      );
    }
    return { type: "file", value };
  }, "parse")
};
var dataStreamParts = [
  textStreamPart2,
  dataStreamPart,
  errorStreamPart2,
  messageAnnotationsStreamPart,
  toolCallStreamPart,
  toolResultStreamPart,
  toolCallStreamingStartStreamPart,
  toolCallDeltaStreamPart,
  finishMessageStreamPart,
  finishStepStreamPart,
  startStepStreamPart,
  reasoningStreamPart,
  sourcePart,
  redactedReasoningStreamPart,
  reasoningSignatureStreamPart,
  fileStreamPart
];
var dataStreamPartsByCode = Object.fromEntries(
  dataStreamParts.map((part) => [part.code, part])
);
var DataStreamStringPrefixes = Object.fromEntries(
  dataStreamParts.map((part) => [part.name, part.code])
);
var validCodes2 = dataStreamParts.map((part) => part.code);
function formatDataStreamPart(type, value) {
  const streamPart = dataStreamParts.find((part) => part.name === type);
  if (!streamPart) {
    throw new Error(`Invalid stream part type: ${type}`);
  }
  return `${streamPart.code}:${JSON.stringify(value)}
`;
}
__name(formatDataStreamPart, "formatDataStreamPart");
var NEWLINE = "\n".charCodeAt(0);
var NEWLINE2 = "\n".charCodeAt(0);
function zodSchema(zodSchema2, options) {
  var _a18;
  const useReferences = (_a18 = options == null ? void 0 : options.useReferences) != null ? _a18 : false;
  return jsonSchema(
    esm_default(zodSchema2, {
      $refStrategy: useReferences ? "root" : "none",
      target: "jsonSchema7"
      // note: openai mode breaks various gemini conversions
    }),
    {
      validate: /* @__PURE__ */ __name((value) => {
        const result = zodSchema2.safeParse(value);
        return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
      }, "validate")
    }
  );
}
__name(zodSchema, "zodSchema");
var schemaSymbol = Symbol.for("vercel.ai.schema");
function jsonSchema(jsonSchema2, {
  validate
} = {}) {
  return {
    [schemaSymbol]: true,
    _type: void 0,
    // should never be used directly
    [validatorSymbol2]: true,
    jsonSchema: jsonSchema2,
    validate
  };
}
__name(jsonSchema, "jsonSchema");
function isSchema(value) {
  return typeof value === "object" && value !== null && schemaSymbol in value && value[schemaSymbol] === true && "jsonSchema" in value && "validate" in value;
}
__name(isSchema, "isSchema");
function asSchema(schema) {
  return isSchema(schema) ? schema : zodSchema(schema);
}
__name(asSchema, "asSchema");

// node_modules/@opentelemetry/api/build/esm/platform/node/globalThis.js
var _globalThis = typeof globalThis === "object" ? globalThis : global;

// node_modules/@opentelemetry/api/build/esm/version.js
var VERSION = "1.9.0";

// node_modules/@opentelemetry/api/build/esm/internal/semver.js
var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function _makeCompatibilityCheck(ownVersion) {
  var acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
  var rejectedVersions = /* @__PURE__ */ new Set();
  var myVersionMatch = ownVersion.match(re);
  if (!myVersionMatch) {
    return function() {
      return false;
    };
  }
  var ownVersionParsed = {
    major: +myVersionMatch[1],
    minor: +myVersionMatch[2],
    patch: +myVersionMatch[3],
    prerelease: myVersionMatch[4]
  };
  if (ownVersionParsed.prerelease != null) {
    return /* @__PURE__ */ __name(function isExactmatch(globalVersion) {
      return globalVersion === ownVersion;
    }, "isExactmatch");
  }
  function _reject(v2) {
    rejectedVersions.add(v2);
    return false;
  }
  __name(_reject, "_reject");
  function _accept(v2) {
    acceptedVersions.add(v2);
    return true;
  }
  __name(_accept, "_accept");
  return /* @__PURE__ */ __name(function isCompatible2(globalVersion) {
    if (acceptedVersions.has(globalVersion)) {
      return true;
    }
    if (rejectedVersions.has(globalVersion)) {
      return false;
    }
    var globalVersionMatch = globalVersion.match(re);
    if (!globalVersionMatch) {
      return _reject(globalVersion);
    }
    var globalVersionParsed = {
      major: +globalVersionMatch[1],
      minor: +globalVersionMatch[2],
      patch: +globalVersionMatch[3],
      prerelease: globalVersionMatch[4]
    };
    if (globalVersionParsed.prerelease != null) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major !== globalVersionParsed.major) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major === 0) {
      if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    }
    if (ownVersionParsed.minor <= globalVersionParsed.minor) {
      return _accept(globalVersion);
    }
    return _reject(globalVersion);
  }, "isCompatible");
}
__name(_makeCompatibilityCheck, "_makeCompatibilityCheck");
var isCompatible = _makeCompatibilityCheck(VERSION);

// node_modules/@opentelemetry/api/build/esm/internal/global-utils.js
var major = VERSION.split(".")[0];
var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
var _global = _globalThis;
function registerGlobal(type, instance, diag, allowOverride) {
  var _a18;
  if (allowOverride === void 0) {
    allowOverride = false;
  }
  var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a18 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a18 !== void 0 ? _a18 : {
    version: VERSION
  };
  if (!allowOverride && api[type]) {
    var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
    diag.error(err.stack || err.message);
    return false;
  }
  if (api.version !== VERSION) {
    var err = new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + VERSION);
    diag.error(err.stack || err.message);
    return false;
  }
  api[type] = instance;
  diag.debug("@opentelemetry/api: Registered a global for " + type + " v" + VERSION + ".");
  return true;
}
__name(registerGlobal, "registerGlobal");
function getGlobal(type) {
  var _a18, _b;
  var globalVersion = (_a18 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a18 === void 0 ? void 0 : _a18.version;
  if (!globalVersion || !isCompatible(globalVersion)) {
    return;
  }
  return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
__name(getGlobal, "getGlobal");
function unregisterGlobal(type, diag) {
  diag.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + VERSION + ".");
  var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
  if (api) {
    delete api[type];
  }
}
__name(unregisterGlobal, "unregisterGlobal");

// node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js
var __read = function(o2, n2) {
  var m3 = typeof Symbol === "function" && o2[Symbol.iterator];
  if (!m3) return o2;
  var i3 = m3.call(o2), r2, ar = [], e3;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i3.next()).done) ar.push(r2.value);
  } catch (error) {
    e3 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m3 = i3["return"])) m3.call(i3);
    } finally {
      if (e3) throw e3.error;
    }
  }
  return ar;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i3 = 0, l2 = from.length, ar; i3 < l2; i3++) {
    if (ar || !(i3 in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i3);
      ar[i3] = from[i3];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var DiagComponentLogger = (
  /** @class */
  function() {
    function DiagComponentLogger2(props) {
      this._namespace = props.namespace || "DiagComponentLogger";
    }
    __name(DiagComponentLogger2, "DiagComponentLogger");
    DiagComponentLogger2.prototype.debug = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return logProxy("debug", this._namespace, args);
    };
    DiagComponentLogger2.prototype.error = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return logProxy("error", this._namespace, args);
    };
    DiagComponentLogger2.prototype.info = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return logProxy("info", this._namespace, args);
    };
    DiagComponentLogger2.prototype.warn = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return logProxy("warn", this._namespace, args);
    };
    DiagComponentLogger2.prototype.verbose = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return logProxy("verbose", this._namespace, args);
    };
    return DiagComponentLogger2;
  }()
);
function logProxy(funcName, namespace, args) {
  var logger = getGlobal("diag");
  if (!logger) {
    return;
  }
  args.unshift(namespace);
  return logger[funcName].apply(logger, __spreadArray([], __read(args), false));
}
__name(logProxy, "logProxy");

// node_modules/@opentelemetry/api/build/esm/diag/types.js
var DiagLogLevel;
(function(DiagLogLevel2) {
  DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
  DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
  DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
  DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
  DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
  DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
  DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
})(DiagLogLevel || (DiagLogLevel = {}));

// node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js
function createLogLevelDiagLogger(maxLevel, logger) {
  if (maxLevel < DiagLogLevel.NONE) {
    maxLevel = DiagLogLevel.NONE;
  } else if (maxLevel > DiagLogLevel.ALL) {
    maxLevel = DiagLogLevel.ALL;
  }
  logger = logger || {};
  function _filterFunc(funcName, theLevel) {
    var theFunc = logger[funcName];
    if (typeof theFunc === "function" && maxLevel >= theLevel) {
      return theFunc.bind(logger);
    }
    return function() {
    };
  }
  __name(_filterFunc, "_filterFunc");
  return {
    error: _filterFunc("error", DiagLogLevel.ERROR),
    warn: _filterFunc("warn", DiagLogLevel.WARN),
    info: _filterFunc("info", DiagLogLevel.INFO),
    debug: _filterFunc("debug", DiagLogLevel.DEBUG),
    verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
  };
}
__name(createLogLevelDiagLogger, "createLogLevelDiagLogger");

// node_modules/@opentelemetry/api/build/esm/api/diag.js
var __read2 = function(o2, n2) {
  var m3 = typeof Symbol === "function" && o2[Symbol.iterator];
  if (!m3) return o2;
  var i3 = m3.call(o2), r2, ar = [], e3;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i3.next()).done) ar.push(r2.value);
  } catch (error) {
    e3 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m3 = i3["return"])) m3.call(i3);
    } finally {
      if (e3) throw e3.error;
    }
  }
  return ar;
};
var __spreadArray2 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i3 = 0, l2 = from.length, ar; i3 < l2; i3++) {
    if (ar || !(i3 in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i3);
      ar[i3] = from[i3];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME = "diag";
var DiagAPI = (
  /** @class */
  function() {
    function DiagAPI2() {
      function _logProxy(funcName) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var logger = getGlobal("diag");
          if (!logger)
            return;
          return logger[funcName].apply(logger, __spreadArray2([], __read2(args), false));
        };
      }
      __name(_logProxy, "_logProxy");
      var self2 = this;
      var setLogger = /* @__PURE__ */ __name(function(logger, optionsOrLogLevel) {
        var _a18, _b, _c;
        if (optionsOrLogLevel === void 0) {
          optionsOrLogLevel = { logLevel: DiagLogLevel.INFO };
        }
        if (logger === self2) {
          var err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
          self2.error((_a18 = err.stack) !== null && _a18 !== void 0 ? _a18 : err.message);
          return false;
        }
        if (typeof optionsOrLogLevel === "number") {
          optionsOrLogLevel = {
            logLevel: optionsOrLogLevel
          };
        }
        var oldLogger = getGlobal("diag");
        var newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : DiagLogLevel.INFO, logger);
        if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
          var stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
          oldLogger.warn("Current logger will be overwritten from " + stack);
          newLogger.warn("Current logger will overwrite one already registered from " + stack);
        }
        return registerGlobal("diag", newLogger, self2, true);
      }, "setLogger");
      self2.setLogger = setLogger;
      self2.disable = function() {
        unregisterGlobal(API_NAME, self2);
      };
      self2.createComponentLogger = function(options) {
        return new DiagComponentLogger(options);
      };
      self2.verbose = _logProxy("verbose");
      self2.debug = _logProxy("debug");
      self2.info = _logProxy("info");
      self2.warn = _logProxy("warn");
      self2.error = _logProxy("error");
    }
    __name(DiagAPI2, "DiagAPI");
    DiagAPI2.instance = function() {
      if (!this._instance) {
        this._instance = new DiagAPI2();
      }
      return this._instance;
    };
    return DiagAPI2;
  }()
);

// node_modules/@opentelemetry/api/build/esm/context/context.js
function createContextKey(description) {
  return Symbol.for(description);
}
__name(createContextKey, "createContextKey");
var BaseContext = (
  /** @class */
  /* @__PURE__ */ function() {
    function BaseContext2(parentContext) {
      var self2 = this;
      self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
      self2.getValue = function(key) {
        return self2._currentContext.get(key);
      };
      self2.setValue = function(key, value) {
        var context = new BaseContext2(self2._currentContext);
        context._currentContext.set(key, value);
        return context;
      };
      self2.deleteValue = function(key) {
        var context = new BaseContext2(self2._currentContext);
        context._currentContext.delete(key);
        return context;
      };
    }
    __name(BaseContext2, "BaseContext");
    return BaseContext2;
  }()
);
var ROOT_CONTEXT = new BaseContext();

// node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js
var __read3 = function(o2, n2) {
  var m3 = typeof Symbol === "function" && o2[Symbol.iterator];
  if (!m3) return o2;
  var i3 = m3.call(o2), r2, ar = [], e3;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i3.next()).done) ar.push(r2.value);
  } catch (error) {
    e3 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m3 = i3["return"])) m3.call(i3);
    } finally {
      if (e3) throw e3.error;
    }
  }
  return ar;
};
var __spreadArray3 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i3 = 0, l2 = from.length, ar; i3 < l2; i3++) {
    if (ar || !(i3 in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i3);
      ar[i3] = from[i3];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var NoopContextManager = (
  /** @class */
  function() {
    function NoopContextManager2() {
    }
    __name(NoopContextManager2, "NoopContextManager");
    NoopContextManager2.prototype.active = function() {
      return ROOT_CONTEXT;
    };
    NoopContextManager2.prototype.with = function(_context, fn2, thisArg) {
      var args = [];
      for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
      }
      return fn2.call.apply(fn2, __spreadArray3([thisArg], __read3(args), false));
    };
    NoopContextManager2.prototype.bind = function(_context, target) {
      return target;
    };
    NoopContextManager2.prototype.enable = function() {
      return this;
    };
    NoopContextManager2.prototype.disable = function() {
      return this;
    };
    return NoopContextManager2;
  }()
);

// node_modules/@opentelemetry/api/build/esm/api/context.js
var __read4 = function(o2, n2) {
  var m3 = typeof Symbol === "function" && o2[Symbol.iterator];
  if (!m3) return o2;
  var i3 = m3.call(o2), r2, ar = [], e3;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i3.next()).done) ar.push(r2.value);
  } catch (error) {
    e3 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m3 = i3["return"])) m3.call(i3);
    } finally {
      if (e3) throw e3.error;
    }
  }
  return ar;
};
var __spreadArray4 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i3 = 0, l2 = from.length, ar; i3 < l2; i3++) {
    if (ar || !(i3 in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i3);
      ar[i3] = from[i3];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME2 = "context";
var NOOP_CONTEXT_MANAGER = new NoopContextManager();
var ContextAPI = (
  /** @class */
  function() {
    function ContextAPI2() {
    }
    __name(ContextAPI2, "ContextAPI");
    ContextAPI2.getInstance = function() {
      if (!this._instance) {
        this._instance = new ContextAPI2();
      }
      return this._instance;
    };
    ContextAPI2.prototype.setGlobalContextManager = function(contextManager) {
      return registerGlobal(API_NAME2, contextManager, DiagAPI.instance());
    };
    ContextAPI2.prototype.active = function() {
      return this._getContextManager().active();
    };
    ContextAPI2.prototype.with = function(context, fn2, thisArg) {
      var _a18;
      var args = [];
      for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
      }
      return (_a18 = this._getContextManager()).with.apply(_a18, __spreadArray4([context, fn2, thisArg], __read4(args), false));
    };
    ContextAPI2.prototype.bind = function(context, target) {
      return this._getContextManager().bind(context, target);
    };
    ContextAPI2.prototype._getContextManager = function() {
      return getGlobal(API_NAME2) || NOOP_CONTEXT_MANAGER;
    };
    ContextAPI2.prototype.disable = function() {
      this._getContextManager().disable();
      unregisterGlobal(API_NAME2, DiagAPI.instance());
    };
    return ContextAPI2;
  }()
);

// node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js
var TraceFlags;
(function(TraceFlags2) {
  TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
  TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
})(TraceFlags || (TraceFlags = {}));

// node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js
var INVALID_SPANID = "0000000000000000";
var INVALID_TRACEID = "00000000000000000000000000000000";
var INVALID_SPAN_CONTEXT = {
  traceId: INVALID_TRACEID,
  spanId: INVALID_SPANID,
  traceFlags: TraceFlags.NONE
};

// node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js
var NonRecordingSpan = (
  /** @class */
  function() {
    function NonRecordingSpan2(_spanContext) {
      if (_spanContext === void 0) {
        _spanContext = INVALID_SPAN_CONTEXT;
      }
      this._spanContext = _spanContext;
    }
    __name(NonRecordingSpan2, "NonRecordingSpan");
    NonRecordingSpan2.prototype.spanContext = function() {
      return this._spanContext;
    };
    NonRecordingSpan2.prototype.setAttribute = function(_key, _value) {
      return this;
    };
    NonRecordingSpan2.prototype.setAttributes = function(_attributes) {
      return this;
    };
    NonRecordingSpan2.prototype.addEvent = function(_name, _attributes) {
      return this;
    };
    NonRecordingSpan2.prototype.addLink = function(_link) {
      return this;
    };
    NonRecordingSpan2.prototype.addLinks = function(_links) {
      return this;
    };
    NonRecordingSpan2.prototype.setStatus = function(_status) {
      return this;
    };
    NonRecordingSpan2.prototype.updateName = function(_name) {
      return this;
    };
    NonRecordingSpan2.prototype.end = function(_endTime) {
    };
    NonRecordingSpan2.prototype.isRecording = function() {
      return false;
    };
    NonRecordingSpan2.prototype.recordException = function(_exception, _time) {
    };
    return NonRecordingSpan2;
  }()
);

// node_modules/@opentelemetry/api/build/esm/trace/context-utils.js
var SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
function getSpan(context) {
  return context.getValue(SPAN_KEY) || void 0;
}
__name(getSpan, "getSpan");
function getActiveSpan() {
  return getSpan(ContextAPI.getInstance().active());
}
__name(getActiveSpan, "getActiveSpan");
function setSpan(context, span) {
  return context.setValue(SPAN_KEY, span);
}
__name(setSpan, "setSpan");
function deleteSpan(context) {
  return context.deleteValue(SPAN_KEY);
}
__name(deleteSpan, "deleteSpan");
function setSpanContext(context, spanContext) {
  return setSpan(context, new NonRecordingSpan(spanContext));
}
__name(setSpanContext, "setSpanContext");
function getSpanContext(context) {
  var _a18;
  return (_a18 = getSpan(context)) === null || _a18 === void 0 ? void 0 : _a18.spanContext();
}
__name(getSpanContext, "getSpanContext");

// node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js
var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
function isValidTraceId(traceId) {
  return VALID_TRACEID_REGEX.test(traceId) && traceId !== INVALID_TRACEID;
}
__name(isValidTraceId, "isValidTraceId");
function isValidSpanId(spanId) {
  return VALID_SPANID_REGEX.test(spanId) && spanId !== INVALID_SPANID;
}
__name(isValidSpanId, "isValidSpanId");
function isSpanContextValid(spanContext) {
  return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
__name(isSpanContextValid, "isSpanContextValid");
function wrapSpanContext(spanContext) {
  return new NonRecordingSpan(spanContext);
}
__name(wrapSpanContext, "wrapSpanContext");

// node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js
var contextApi = ContextAPI.getInstance();
var NoopTracer = (
  /** @class */
  function() {
    function NoopTracer2() {
    }
    __name(NoopTracer2, "NoopTracer");
    NoopTracer2.prototype.startSpan = function(name18, options, context) {
      if (context === void 0) {
        context = contextApi.active();
      }
      var root = Boolean(options === null || options === void 0 ? void 0 : options.root);
      if (root) {
        return new NonRecordingSpan();
      }
      var parentFromContext = context && getSpanContext(context);
      if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
        return new NonRecordingSpan(parentFromContext);
      } else {
        return new NonRecordingSpan();
      }
    };
    NoopTracer2.prototype.startActiveSpan = function(name18, arg2, arg3, arg4) {
      var opts;
      var ctx;
      var fn2;
      if (arguments.length < 2) {
        return;
      } else if (arguments.length === 2) {
        fn2 = arg2;
      } else if (arguments.length === 3) {
        opts = arg2;
        fn2 = arg3;
      } else {
        opts = arg2;
        ctx = arg3;
        fn2 = arg4;
      }
      var parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
      var span = this.startSpan(name18, opts, parentContext);
      var contextWithSpanSet = setSpan(parentContext, span);
      return contextApi.with(contextWithSpanSet, fn2, void 0, span);
    };
    return NoopTracer2;
  }()
);
function isSpanContext(spanContext) {
  return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
}
__name(isSpanContext, "isSpanContext");

// node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js
var NOOP_TRACER = new NoopTracer();
var ProxyTracer = (
  /** @class */
  function() {
    function ProxyTracer2(_provider, name18, version2, options) {
      this._provider = _provider;
      this.name = name18;
      this.version = version2;
      this.options = options;
    }
    __name(ProxyTracer2, "ProxyTracer");
    ProxyTracer2.prototype.startSpan = function(name18, options, context) {
      return this._getTracer().startSpan(name18, options, context);
    };
    ProxyTracer2.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
      var tracer2 = this._getTracer();
      return Reflect.apply(tracer2.startActiveSpan, tracer2, arguments);
    };
    ProxyTracer2.prototype._getTracer = function() {
      if (this._delegate) {
        return this._delegate;
      }
      var tracer2 = this._provider.getDelegateTracer(this.name, this.version, this.options);
      if (!tracer2) {
        return NOOP_TRACER;
      }
      this._delegate = tracer2;
      return this._delegate;
    };
    return ProxyTracer2;
  }()
);

// node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js
var NoopTracerProvider = (
  /** @class */
  function() {
    function NoopTracerProvider2() {
    }
    __name(NoopTracerProvider2, "NoopTracerProvider");
    NoopTracerProvider2.prototype.getTracer = function(_name, _version, _options) {
      return new NoopTracer();
    };
    return NoopTracerProvider2;
  }()
);

// node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js
var NOOP_TRACER_PROVIDER = new NoopTracerProvider();
var ProxyTracerProvider = (
  /** @class */
  function() {
    function ProxyTracerProvider2() {
    }
    __name(ProxyTracerProvider2, "ProxyTracerProvider");
    ProxyTracerProvider2.prototype.getTracer = function(name18, version2, options) {
      var _a18;
      return (_a18 = this.getDelegateTracer(name18, version2, options)) !== null && _a18 !== void 0 ? _a18 : new ProxyTracer(this, name18, version2, options);
    };
    ProxyTracerProvider2.prototype.getDelegate = function() {
      var _a18;
      return (_a18 = this._delegate) !== null && _a18 !== void 0 ? _a18 : NOOP_TRACER_PROVIDER;
    };
    ProxyTracerProvider2.prototype.setDelegate = function(delegate) {
      this._delegate = delegate;
    };
    ProxyTracerProvider2.prototype.getDelegateTracer = function(name18, version2, options) {
      var _a18;
      return (_a18 = this._delegate) === null || _a18 === void 0 ? void 0 : _a18.getTracer(name18, version2, options);
    };
    return ProxyTracerProvider2;
  }()
);

// node_modules/@opentelemetry/api/build/esm/trace/status.js
var SpanStatusCode;
(function(SpanStatusCode2) {
  SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
  SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
  SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
})(SpanStatusCode || (SpanStatusCode = {}));

// node_modules/@opentelemetry/api/build/esm/api/trace.js
var API_NAME3 = "trace";
var TraceAPI = (
  /** @class */
  function() {
    function TraceAPI2() {
      this._proxyTracerProvider = new ProxyTracerProvider();
      this.wrapSpanContext = wrapSpanContext;
      this.isSpanContextValid = isSpanContextValid;
      this.deleteSpan = deleteSpan;
      this.getSpan = getSpan;
      this.getActiveSpan = getActiveSpan;
      this.getSpanContext = getSpanContext;
      this.setSpan = setSpan;
      this.setSpanContext = setSpanContext;
    }
    __name(TraceAPI2, "TraceAPI");
    TraceAPI2.getInstance = function() {
      if (!this._instance) {
        this._instance = new TraceAPI2();
      }
      return this._instance;
    };
    TraceAPI2.prototype.setGlobalTracerProvider = function(provider) {
      var success = registerGlobal(API_NAME3, this._proxyTracerProvider, DiagAPI.instance());
      if (success) {
        this._proxyTracerProvider.setDelegate(provider);
      }
      return success;
    };
    TraceAPI2.prototype.getTracerProvider = function() {
      return getGlobal(API_NAME3) || this._proxyTracerProvider;
    };
    TraceAPI2.prototype.getTracer = function(name18, version2) {
      return this.getTracerProvider().getTracer(name18, version2);
    };
    TraceAPI2.prototype.disable = function() {
      unregisterGlobal(API_NAME3, DiagAPI.instance());
      this._proxyTracerProvider = new ProxyTracerProvider();
    };
    return TraceAPI2;
  }()
);

// node_modules/@opentelemetry/api/build/esm/trace-api.js
var trace = TraceAPI.getInstance();

// node_modules/ai/dist/index.mjs
var __defProp2 = Object.defineProperty;
var __export2 = /* @__PURE__ */ __name((target, all) => {
  for (var name172 in all)
    __defProp2(target, name172, { get: all[name172], enumerable: true });
}, "__export");
function prepareResponseHeaders(headers, {
  contentType,
  dataStreamVersion
}) {
  const responseHeaders = new Headers(headers != null ? headers : {});
  if (!responseHeaders.has("Content-Type")) {
    responseHeaders.set("Content-Type", contentType);
  }
  if (dataStreamVersion !== void 0) {
    responseHeaders.set("X-Vercel-AI-Data-Stream", dataStreamVersion);
  }
  return responseHeaders;
}
__name(prepareResponseHeaders, "prepareResponseHeaders");
var name15 = "AI_InvalidArgumentError";
var marker16 = `vercel.ai.error.${name15}`;
var symbol16 = Symbol.for(marker16);
var _a16;
var InvalidArgumentError3 = class extends AISDKError {
  static {
    __name(this, "InvalidArgumentError");
  }
  constructor({
    parameter,
    value,
    message
  }) {
    super({
      name: name15,
      message: `Invalid argument for parameter ${parameter}: ${message}`
    });
    this[_a16] = true;
    this.parameter = parameter;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker16);
  }
};
_a16 = symbol16;
var name23 = "AI_RetryError";
var marker23 = `vercel.ai.error.${name23}`;
var symbol23 = Symbol.for(marker23);
var _a23;
var RetryError = class extends AISDKError {
  static {
    __name(this, "RetryError");
  }
  constructor({
    message,
    reason,
    errors
  }) {
    super({ name: name23, message });
    this[_a23] = true;
    this.reason = reason;
    this.errors = errors;
    this.lastError = errors[errors.length - 1];
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker23);
  }
};
_a23 = symbol23;
var retryWithExponentialBackoff = /* @__PURE__ */ __name(({
  maxRetries = 2,
  initialDelayInMs = 2e3,
  backoffFactor = 2
} = {}) => async (f2) => _retryWithExponentialBackoff(f2, {
  maxRetries,
  delayInMs: initialDelayInMs,
  backoffFactor
}), "retryWithExponentialBackoff");
async function _retryWithExponentialBackoff(f2, {
  maxRetries,
  delayInMs,
  backoffFactor
}, errors = []) {
  try {
    return await f2();
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }
    if (maxRetries === 0) {
      throw error;
    }
    const errorMessage = getErrorMessage2(error);
    const newErrors = [...errors, error];
    const tryNumber = newErrors.length;
    if (tryNumber > maxRetries) {
      throw new RetryError({
        message: `Failed after ${tryNumber} attempts. Last error: ${errorMessage}`,
        reason: "maxRetriesExceeded",
        errors: newErrors
      });
    }
    if (error instanceof Error && APICallError.isInstance(error) && error.isRetryable === true && tryNumber <= maxRetries) {
      await delay(delayInMs);
      return _retryWithExponentialBackoff(
        f2,
        { maxRetries, delayInMs: backoffFactor * delayInMs, backoffFactor },
        newErrors
      );
    }
    if (tryNumber === 1) {
      throw error;
    }
    throw new RetryError({
      message: `Failed after ${tryNumber} attempts with non-retryable error: '${errorMessage}'`,
      reason: "errorNotRetryable",
      errors: newErrors
    });
  }
}
__name(_retryWithExponentialBackoff, "_retryWithExponentialBackoff");
function prepareRetries({
  maxRetries
}) {
  if (maxRetries != null) {
    if (!Number.isInteger(maxRetries)) {
      throw new InvalidArgumentError3({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be an integer"
      });
    }
    if (maxRetries < 0) {
      throw new InvalidArgumentError3({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be >= 0"
      });
    }
  }
  const maxRetriesResult = maxRetries != null ? maxRetries : 2;
  return {
    maxRetries: maxRetriesResult,
    retry: retryWithExponentialBackoff({ maxRetries: maxRetriesResult })
  };
}
__name(prepareRetries, "prepareRetries");
function assembleOperationName({
  operationId,
  telemetry
}) {
  return {
    // standardized operation and resource name:
    "operation.name": `${operationId}${(telemetry == null ? void 0 : telemetry.functionId) != null ? ` ${telemetry.functionId}` : ""}`,
    "resource.name": telemetry == null ? void 0 : telemetry.functionId,
    // detailed, AI SDK specific data:
    "ai.operationId": operationId,
    "ai.telemetry.functionId": telemetry == null ? void 0 : telemetry.functionId
  };
}
__name(assembleOperationName, "assembleOperationName");
function getBaseTelemetryAttributes({
  model,
  settings,
  telemetry,
  headers
}) {
  var _a172;
  return {
    "ai.model.provider": model.provider,
    "ai.model.id": model.modelId,
    // settings:
    ...Object.entries(settings).reduce((attributes, [key, value]) => {
      attributes[`ai.settings.${key}`] = value;
      return attributes;
    }, {}),
    // add metadata as attributes:
    ...Object.entries((_a172 = telemetry == null ? void 0 : telemetry.metadata) != null ? _a172 : {}).reduce(
      (attributes, [key, value]) => {
        attributes[`ai.telemetry.metadata.${key}`] = value;
        return attributes;
      },
      {}
    ),
    // request headers
    ...Object.entries(headers != null ? headers : {}).reduce((attributes, [key, value]) => {
      if (value !== void 0) {
        attributes[`ai.request.headers.${key}`] = value;
      }
      return attributes;
    }, {})
  };
}
__name(getBaseTelemetryAttributes, "getBaseTelemetryAttributes");
var noopTracer = {
  startSpan() {
    return noopSpan;
  },
  startActiveSpan(name172, arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
      return arg1(noopSpan);
    }
    if (typeof arg2 === "function") {
      return arg2(noopSpan);
    }
    if (typeof arg3 === "function") {
      return arg3(noopSpan);
    }
  }
};
var noopSpan = {
  spanContext() {
    return noopSpanContext;
  },
  setAttribute() {
    return this;
  },
  setAttributes() {
    return this;
  },
  addEvent() {
    return this;
  },
  addLink() {
    return this;
  },
  addLinks() {
    return this;
  },
  setStatus() {
    return this;
  },
  updateName() {
    return this;
  },
  end() {
    return this;
  },
  isRecording() {
    return false;
  },
  recordException() {
    return this;
  }
};
var noopSpanContext = {
  traceId: "",
  spanId: "",
  traceFlags: 0
};
function getTracer({
  isEnabled = false,
  tracer: tracer2
} = {}) {
  if (!isEnabled) {
    return noopTracer;
  }
  if (tracer2) {
    return tracer2;
  }
  return trace.getTracer("ai");
}
__name(getTracer, "getTracer");
function recordSpan({
  name: name172,
  tracer: tracer2,
  attributes,
  fn: fn2,
  endWhenDone = true
}) {
  return tracer2.startActiveSpan(name172, { attributes }, async (span) => {
    try {
      const result = await fn2(span);
      if (endWhenDone) {
        span.end();
      }
      return result;
    } catch (error) {
      try {
        if (error instanceof Error) {
          span.recordException({
            name: error.name,
            message: error.message,
            stack: error.stack
          });
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message
          });
        } else {
          span.setStatus({ code: SpanStatusCode.ERROR });
        }
      } finally {
        span.end();
      }
      throw error;
    }
  });
}
__name(recordSpan, "recordSpan");
function selectTelemetryAttributes({
  telemetry,
  attributes
}) {
  if ((telemetry == null ? void 0 : telemetry.isEnabled) !== true) {
    return {};
  }
  return Object.entries(attributes).reduce((attributes2, [key, value]) => {
    if (value === void 0) {
      return attributes2;
    }
    if (typeof value === "object" && "input" in value && typeof value.input === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordInputs) === false) {
        return attributes2;
      }
      const result = value.input();
      return result === void 0 ? attributes2 : { ...attributes2, [key]: result };
    }
    if (typeof value === "object" && "output" in value && typeof value.output === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordOutputs) === false) {
        return attributes2;
      }
      const result = value.output();
      return result === void 0 ? attributes2 : { ...attributes2, [key]: result };
    }
    return { ...attributes2, [key]: value };
  }, {});
}
__name(selectTelemetryAttributes, "selectTelemetryAttributes");
var name33 = "AI_NoImageGeneratedError";
var marker33 = `vercel.ai.error.${name33}`;
var symbol33 = Symbol.for(marker33);
var _a33;
_a33 = symbol33;
var DefaultGeneratedFile = class {
  static {
    __name(this, "DefaultGeneratedFile");
  }
  constructor({
    data,
    mimeType
  }) {
    const isUint8Array = data instanceof Uint8Array;
    this.base64Data = isUint8Array ? void 0 : data;
    this.uint8ArrayData = isUint8Array ? data : void 0;
    this.mimeType = mimeType;
  }
  // lazy conversion with caching to avoid unnecessary conversion overhead:
  get base64() {
    if (this.base64Data == null) {
      this.base64Data = convertUint8ArrayToBase64(this.uint8ArrayData);
    }
    return this.base64Data;
  }
  // lazy conversion with caching to avoid unnecessary conversion overhead:
  get uint8Array() {
    if (this.uint8ArrayData == null) {
      this.uint8ArrayData = convertBase64ToUint8Array(this.base64Data);
    }
    return this.uint8ArrayData;
  }
};
var mimeTypeSignatures = [
  {
    mimeType: "image/gif",
    bytesPrefix: [71, 73, 70],
    base64Prefix: "R0lG"
  },
  {
    mimeType: "image/png",
    bytesPrefix: [137, 80, 78, 71],
    base64Prefix: "iVBORw"
  },
  {
    mimeType: "image/jpeg",
    bytesPrefix: [255, 216],
    base64Prefix: "/9j/"
  },
  {
    mimeType: "image/webp",
    bytesPrefix: [82, 73, 70, 70],
    base64Prefix: "UklGRg"
  },
  {
    mimeType: "image/bmp",
    bytesPrefix: [66, 77],
    base64Prefix: "Qk"
  },
  {
    mimeType: "image/tiff",
    bytesPrefix: [73, 73, 42, 0],
    base64Prefix: "SUkqAA"
  },
  {
    mimeType: "image/tiff",
    bytesPrefix: [77, 77, 0, 42],
    base64Prefix: "TU0AKg"
  },
  {
    mimeType: "image/avif",
    bytesPrefix: [
      0,
      0,
      0,
      32,
      102,
      116,
      121,
      112,
      97,
      118,
      105,
      102
    ],
    base64Prefix: "AAAAIGZ0eXBhdmlm"
  },
  {
    mimeType: "image/heic",
    bytesPrefix: [
      0,
      0,
      0,
      32,
      102,
      116,
      121,
      112,
      104,
      101,
      105,
      99
    ],
    base64Prefix: "AAAAIGZ0eXBoZWlj"
  }
];
function detectImageMimeType(image) {
  for (const signature of mimeTypeSignatures) {
    if (typeof image === "string" ? image.startsWith(signature.base64Prefix) : image.length >= signature.bytesPrefix.length && signature.bytesPrefix.every((byte, index) => image[index] === byte)) {
      return signature.mimeType;
    }
  }
  return void 0;
}
__name(detectImageMimeType, "detectImageMimeType");
var name43 = "AI_NoObjectGeneratedError";
var marker43 = `vercel.ai.error.${name43}`;
var symbol43 = Symbol.for(marker43);
var _a43;
var NoObjectGeneratedError = class extends AISDKError {
  static {
    __name(this, "NoObjectGeneratedError");
  }
  constructor({
    message = "No object generated.",
    cause,
    text: text22,
    response,
    usage
  }) {
    super({ name: name43, message, cause });
    this[_a43] = true;
    this.text = text22;
    this.response = response;
    this.usage = usage;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker43);
  }
};
_a43 = symbol43;
var name53 = "AI_DownloadError";
var marker53 = `vercel.ai.error.${name53}`;
var symbol53 = Symbol.for(marker53);
var _a53;
var DownloadError = class extends AISDKError {
  static {
    __name(this, "DownloadError");
  }
  constructor({
    url,
    statusCode,
    statusText,
    cause,
    message = cause == null ? `Failed to download ${url}: ${statusCode} ${statusText}` : `Failed to download ${url}: ${cause}`
  }) {
    super({ name: name53, message, cause });
    this[_a53] = true;
    this.url = url;
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker53);
  }
};
_a53 = symbol53;
async function download({ url }) {
  var _a172;
  const urlText = url.toString();
  try {
    const response = await fetch(urlText);
    if (!response.ok) {
      throw new DownloadError({
        url: urlText,
        statusCode: response.status,
        statusText: response.statusText
      });
    }
    return {
      data: new Uint8Array(await response.arrayBuffer()),
      mimeType: (_a172 = response.headers.get("content-type")) != null ? _a172 : void 0
    };
  } catch (error) {
    if (DownloadError.isInstance(error)) {
      throw error;
    }
    throw new DownloadError({ url: urlText, cause: error });
  }
}
__name(download, "download");
var name63 = "AI_InvalidDataContentError";
var marker63 = `vercel.ai.error.${name63}`;
var symbol63 = Symbol.for(marker63);
var _a63;
var InvalidDataContentError = class extends AISDKError {
  static {
    __name(this, "InvalidDataContentError");
  }
  constructor({
    content,
    cause,
    message = `Invalid data content. Expected a base64 string, Uint8Array, ArrayBuffer, or Buffer, but got ${typeof content}.`
  }) {
    super({ name: name63, message, cause });
    this[_a63] = true;
    this.content = content;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker63);
  }
};
_a63 = symbol63;
var dataContentSchema = external_exports.union([
  external_exports.string(),
  external_exports.instanceof(Uint8Array),
  external_exports.instanceof(ArrayBuffer),
  external_exports.custom(
    // Buffer might not be available in some environments such as CloudFlare:
    (value) => {
      var _a172, _b;
      return (_b = (_a172 = globalThis.Buffer) == null ? void 0 : _a172.isBuffer(value)) != null ? _b : false;
    },
    { message: "Must be a Buffer" }
  )
]);
function convertDataContentToBase64String(content) {
  if (typeof content === "string") {
    return content;
  }
  if (content instanceof ArrayBuffer) {
    return convertUint8ArrayToBase64(new Uint8Array(content));
  }
  return convertUint8ArrayToBase64(content);
}
__name(convertDataContentToBase64String, "convertDataContentToBase64String");
function convertDataContentToUint8Array(content) {
  if (content instanceof Uint8Array) {
    return content;
  }
  if (typeof content === "string") {
    try {
      return convertBase64ToUint8Array(content);
    } catch (error) {
      throw new InvalidDataContentError({
        message: "Invalid data content. Content string is not a base64-encoded media.",
        content,
        cause: error
      });
    }
  }
  if (content instanceof ArrayBuffer) {
    return new Uint8Array(content);
  }
  throw new InvalidDataContentError({ content });
}
__name(convertDataContentToUint8Array, "convertDataContentToUint8Array");
function convertUint8ArrayToText(uint8Array) {
  try {
    return new TextDecoder().decode(uint8Array);
  } catch (error) {
    throw new Error("Error decoding Uint8Array to text");
  }
}
__name(convertUint8ArrayToText, "convertUint8ArrayToText");
var name73 = "AI_InvalidMessageRoleError";
var marker73 = `vercel.ai.error.${name73}`;
var symbol73 = Symbol.for(marker73);
var _a73;
var InvalidMessageRoleError = class extends AISDKError {
  static {
    __name(this, "InvalidMessageRoleError");
  }
  constructor({
    role,
    message = `Invalid message role: '${role}'. Must be one of: "system", "user", "assistant", "tool".`
  }) {
    super({ name: name73, message });
    this[_a73] = true;
    this.role = role;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker73);
  }
};
_a73 = symbol73;
function splitDataUrl(dataUrl) {
  try {
    const [header, base64Content] = dataUrl.split(",");
    return {
      mimeType: header.split(";")[0].split(":")[1],
      base64Content
    };
  } catch (error) {
    return {
      mimeType: void 0,
      base64Content: void 0
    };
  }
}
__name(splitDataUrl, "splitDataUrl");
async function convertToLanguageModelPrompt({
  prompt,
  modelSupportsImageUrls = true,
  modelSupportsUrl = /* @__PURE__ */ __name(() => false, "modelSupportsUrl"),
  downloadImplementation = download
}) {
  const downloadedAssets = await downloadAssets(
    prompt.messages,
    downloadImplementation,
    modelSupportsImageUrls,
    modelSupportsUrl
  );
  return [
    ...prompt.system != null ? [{ role: "system", content: prompt.system }] : [],
    ...prompt.messages.map(
      (message) => convertToLanguageModelMessage(message, downloadedAssets)
    )
  ];
}
__name(convertToLanguageModelPrompt, "convertToLanguageModelPrompt");
function convertToLanguageModelMessage(message, downloadedAssets) {
  var _a172, _b, _c, _d, _e, _f;
  const role = message.role;
  switch (role) {
    case "system": {
      return {
        role: "system",
        content: message.content,
        providerMetadata: (_a172 = message.providerOptions) != null ? _a172 : message.experimental_providerMetadata
      };
    }
    case "user": {
      if (typeof message.content === "string") {
        return {
          role: "user",
          content: [{ type: "text", text: message.content }],
          providerMetadata: (_b = message.providerOptions) != null ? _b : message.experimental_providerMetadata
        };
      }
      return {
        role: "user",
        content: message.content.map((part) => convertPartToLanguageModelPart(part, downloadedAssets)).filter((part) => part.type !== "text" || part.text !== ""),
        providerMetadata: (_c = message.providerOptions) != null ? _c : message.experimental_providerMetadata
      };
    }
    case "assistant": {
      if (typeof message.content === "string") {
        return {
          role: "assistant",
          content: [{ type: "text", text: message.content }],
          providerMetadata: (_d = message.providerOptions) != null ? _d : message.experimental_providerMetadata
        };
      }
      return {
        role: "assistant",
        content: message.content.filter(
          // remove empty text parts:
          (part) => part.type !== "text" || part.text !== ""
        ).map((part) => {
          var _a18;
          const providerOptions = (_a18 = part.providerOptions) != null ? _a18 : part.experimental_providerMetadata;
          switch (part.type) {
            case "file": {
              return {
                type: "file",
                data: part.data instanceof URL ? part.data : convertDataContentToBase64String(part.data),
                filename: part.filename,
                mimeType: part.mimeType,
                providerMetadata: providerOptions
              };
            }
            case "reasoning": {
              return {
                type: "reasoning",
                text: part.text,
                signature: part.signature,
                providerMetadata: providerOptions
              };
            }
            case "redacted-reasoning": {
              return {
                type: "redacted-reasoning",
                data: part.data,
                providerMetadata: providerOptions
              };
            }
            case "text": {
              return {
                type: "text",
                text: part.text,
                providerMetadata: providerOptions
              };
            }
            case "tool-call": {
              return {
                type: "tool-call",
                toolCallId: part.toolCallId,
                toolName: part.toolName,
                args: part.args,
                providerMetadata: providerOptions
              };
            }
          }
        }),
        providerMetadata: (_e = message.providerOptions) != null ? _e : message.experimental_providerMetadata
      };
    }
    case "tool": {
      return {
        role: "tool",
        content: message.content.map((part) => {
          var _a18;
          return {
            type: "tool-result",
            toolCallId: part.toolCallId,
            toolName: part.toolName,
            result: part.result,
            content: part.experimental_content,
            isError: part.isError,
            providerMetadata: (_a18 = part.providerOptions) != null ? _a18 : part.experimental_providerMetadata
          };
        }),
        providerMetadata: (_f = message.providerOptions) != null ? _f : message.experimental_providerMetadata
      };
    }
    default: {
      const _exhaustiveCheck = role;
      throw new InvalidMessageRoleError({ role: _exhaustiveCheck });
    }
  }
}
__name(convertToLanguageModelMessage, "convertToLanguageModelMessage");
async function downloadAssets(messages, downloadImplementation, modelSupportsImageUrls, modelSupportsUrl) {
  const urls = messages.filter((message) => message.role === "user").map((message) => message.content).filter(
    (content) => Array.isArray(content)
  ).flat().filter(
    (part) => part.type === "image" || part.type === "file"
  ).filter(
    (part) => !(part.type === "image" && modelSupportsImageUrls === true)
  ).map((part) => part.type === "image" ? part.image : part.data).map(
    (part) => (
      // support string urls:
      typeof part === "string" && (part.startsWith("http:") || part.startsWith("https:")) ? new URL(part) : part
    )
  ).filter((image) => image instanceof URL).filter((url) => !modelSupportsUrl(url));
  const downloadedImages = await Promise.all(
    urls.map(async (url) => ({
      url,
      data: await downloadImplementation({ url })
    }))
  );
  return Object.fromEntries(
    downloadedImages.map(({ url, data }) => [url.toString(), data])
  );
}
__name(downloadAssets, "downloadAssets");
function convertPartToLanguageModelPart(part, downloadedAssets) {
  var _a172, _b, _c, _d;
  if (part.type === "text") {
    return {
      type: "text",
      text: part.text,
      providerMetadata: (_a172 = part.providerOptions) != null ? _a172 : part.experimental_providerMetadata
    };
  }
  let mimeType = part.mimeType;
  let data;
  let content;
  let normalizedData;
  const type = part.type;
  switch (type) {
    case "image":
      data = part.image;
      break;
    case "file":
      data = part.data;
      break;
    default:
      throw new Error(`Unsupported part type: ${type}`);
  }
  try {
    content = typeof data === "string" ? new URL(data) : data;
  } catch (error) {
    content = data;
  }
  if (content instanceof URL) {
    if (content.protocol === "data:") {
      const { mimeType: dataUrlMimeType, base64Content } = splitDataUrl(
        content.toString()
      );
      if (dataUrlMimeType == null || base64Content == null) {
        throw new Error(`Invalid data URL format in part ${type}`);
      }
      mimeType = dataUrlMimeType;
      normalizedData = convertDataContentToUint8Array(base64Content);
    } else {
      const downloadedFile = downloadedAssets[content.toString()];
      if (downloadedFile) {
        normalizedData = downloadedFile.data;
        mimeType != null ? mimeType : mimeType = downloadedFile.mimeType;
      } else {
        normalizedData = content;
      }
    }
  } else {
    normalizedData = convertDataContentToUint8Array(content);
  }
  switch (type) {
    case "image": {
      if (normalizedData instanceof Uint8Array) {
        mimeType = (_b = detectImageMimeType(normalizedData)) != null ? _b : mimeType;
      }
      return {
        type: "image",
        image: normalizedData,
        mimeType,
        providerMetadata: (_c = part.providerOptions) != null ? _c : part.experimental_providerMetadata
      };
    }
    case "file": {
      if (mimeType == null) {
        throw new Error(`Mime type is missing for file part`);
      }
      return {
        type: "file",
        data: normalizedData instanceof Uint8Array ? convertDataContentToBase64String(normalizedData) : normalizedData,
        filename: part.filename,
        mimeType,
        providerMetadata: (_d = part.providerOptions) != null ? _d : part.experimental_providerMetadata
      };
    }
  }
}
__name(convertPartToLanguageModelPart, "convertPartToLanguageModelPart");
function prepareCallSettings({
  maxTokens,
  temperature,
  topP,
  topK,
  presencePenalty,
  frequencyPenalty,
  stopSequences,
  seed
}) {
  if (maxTokens != null) {
    if (!Number.isInteger(maxTokens)) {
      throw new InvalidArgumentError3({
        parameter: "maxTokens",
        value: maxTokens,
        message: "maxTokens must be an integer"
      });
    }
    if (maxTokens < 1) {
      throw new InvalidArgumentError3({
        parameter: "maxTokens",
        value: maxTokens,
        message: "maxTokens must be >= 1"
      });
    }
  }
  if (temperature != null) {
    if (typeof temperature !== "number") {
      throw new InvalidArgumentError3({
        parameter: "temperature",
        value: temperature,
        message: "temperature must be a number"
      });
    }
  }
  if (topP != null) {
    if (typeof topP !== "number") {
      throw new InvalidArgumentError3({
        parameter: "topP",
        value: topP,
        message: "topP must be a number"
      });
    }
  }
  if (topK != null) {
    if (typeof topK !== "number") {
      throw new InvalidArgumentError3({
        parameter: "topK",
        value: topK,
        message: "topK must be a number"
      });
    }
  }
  if (presencePenalty != null) {
    if (typeof presencePenalty !== "number") {
      throw new InvalidArgumentError3({
        parameter: "presencePenalty",
        value: presencePenalty,
        message: "presencePenalty must be a number"
      });
    }
  }
  if (frequencyPenalty != null) {
    if (typeof frequencyPenalty !== "number") {
      throw new InvalidArgumentError3({
        parameter: "frequencyPenalty",
        value: frequencyPenalty,
        message: "frequencyPenalty must be a number"
      });
    }
  }
  if (seed != null) {
    if (!Number.isInteger(seed)) {
      throw new InvalidArgumentError3({
        parameter: "seed",
        value: seed,
        message: "seed must be an integer"
      });
    }
  }
  return {
    maxTokens,
    // TODO v5 remove default 0 for temperature
    temperature: temperature != null ? temperature : 0,
    topP,
    topK,
    presencePenalty,
    frequencyPenalty,
    stopSequences: stopSequences != null && stopSequences.length > 0 ? stopSequences : void 0,
    seed
  };
}
__name(prepareCallSettings, "prepareCallSettings");
function attachmentsToParts(attachments) {
  var _a172, _b, _c;
  const parts = [];
  for (const attachment of attachments) {
    let url;
    try {
      url = new URL(attachment.url);
    } catch (error) {
      throw new Error(`Invalid URL: ${attachment.url}`);
    }
    switch (url.protocol) {
      case "http:":
      case "https:": {
        if ((_a172 = attachment.contentType) == null ? void 0 : _a172.startsWith("image/")) {
          parts.push({ type: "image", image: url });
        } else {
          if (!attachment.contentType) {
            throw new Error(
              "If the attachment is not an image, it must specify a content type"
            );
          }
          parts.push({
            type: "file",
            data: url,
            mimeType: attachment.contentType
          });
        }
        break;
      }
      case "data:": {
        let header;
        let base64Content;
        let mimeType;
        try {
          [header, base64Content] = attachment.url.split(",");
          mimeType = header.split(";")[0].split(":")[1];
        } catch (error) {
          throw new Error(`Error processing data URL: ${attachment.url}`);
        }
        if (mimeType == null || base64Content == null) {
          throw new Error(`Invalid data URL format: ${attachment.url}`);
        }
        if ((_b = attachment.contentType) == null ? void 0 : _b.startsWith("image/")) {
          parts.push({
            type: "image",
            image: convertDataContentToUint8Array(base64Content)
          });
        } else if ((_c = attachment.contentType) == null ? void 0 : _c.startsWith("text/")) {
          parts.push({
            type: "text",
            text: convertUint8ArrayToText(
              convertDataContentToUint8Array(base64Content)
            )
          });
        } else {
          if (!attachment.contentType) {
            throw new Error(
              "If the attachment is not an image or text, it must specify a content type"
            );
          }
          parts.push({
            type: "file",
            data: base64Content,
            mimeType: attachment.contentType
          });
        }
        break;
      }
      default: {
        throw new Error(`Unsupported URL protocol: ${url.protocol}`);
      }
    }
  }
  return parts;
}
__name(attachmentsToParts, "attachmentsToParts");
var name83 = "AI_MessageConversionError";
var marker83 = `vercel.ai.error.${name83}`;
var symbol83 = Symbol.for(marker83);
var _a83;
var MessageConversionError = class extends AISDKError {
  static {
    __name(this, "MessageConversionError");
  }
  constructor({
    originalMessage,
    message
  }) {
    super({ name: name83, message });
    this[_a83] = true;
    this.originalMessage = originalMessage;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker83);
  }
};
_a83 = symbol83;
function convertToCoreMessages(messages, options) {
  var _a172, _b;
  const tools = (_a172 = options == null ? void 0 : options.tools) != null ? _a172 : {};
  const coreMessages = [];
  for (let i3 = 0; i3 < messages.length; i3++) {
    const message = messages[i3];
    const isLastMessage = i3 === messages.length - 1;
    const { role, content, experimental_attachments } = message;
    switch (role) {
      case "system": {
        coreMessages.push({
          role: "system",
          content
        });
        break;
      }
      case "user": {
        if (message.parts == null) {
          coreMessages.push({
            role: "user",
            content: experimental_attachments ? [
              { type: "text", text: content },
              ...attachmentsToParts(experimental_attachments)
            ] : content
          });
        } else {
          const textParts = message.parts.filter((part) => part.type === "text").map((part) => ({
            type: "text",
            text: part.text
          }));
          coreMessages.push({
            role: "user",
            content: experimental_attachments ? [...textParts, ...attachmentsToParts(experimental_attachments)] : textParts
          });
        }
        break;
      }
      case "assistant": {
        if (message.parts != null) {
          let processBlock2 = /* @__PURE__ */ __name(function() {
            const content2 = [];
            for (const part of block) {
              switch (part.type) {
                case "file":
                case "text": {
                  content2.push(part);
                  break;
                }
                case "reasoning": {
                  for (const detail of part.details) {
                    switch (detail.type) {
                      case "text":
                        content2.push({
                          type: "reasoning",
                          text: detail.text,
                          signature: detail.signature
                        });
                        break;
                      case "redacted":
                        content2.push({
                          type: "redacted-reasoning",
                          data: detail.data
                        });
                        break;
                    }
                  }
                  break;
                }
                case "tool-invocation":
                  content2.push({
                    type: "tool-call",
                    toolCallId: part.toolInvocation.toolCallId,
                    toolName: part.toolInvocation.toolName,
                    args: part.toolInvocation.args
                  });
                  break;
                default: {
                  const _exhaustiveCheck = part;
                  throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
                }
              }
            }
            coreMessages.push({
              role: "assistant",
              content: content2
            });
            const stepInvocations = block.filter(
              (part) => part.type === "tool-invocation"
            ).map((part) => part.toolInvocation);
            if (stepInvocations.length > 0) {
              coreMessages.push({
                role: "tool",
                content: stepInvocations.map(
                  (toolInvocation) => {
                    if (!("result" in toolInvocation)) {
                      throw new MessageConversionError({
                        originalMessage: message,
                        message: "ToolInvocation must have a result: " + JSON.stringify(toolInvocation)
                      });
                    }
                    const { toolCallId, toolName, result } = toolInvocation;
                    const tool2 = tools[toolName];
                    return (tool2 == null ? void 0 : tool2.experimental_toToolResultContent) != null ? {
                      type: "tool-result",
                      toolCallId,
                      toolName,
                      result: tool2.experimental_toToolResultContent(result),
                      experimental_content: tool2.experimental_toToolResultContent(result)
                    } : {
                      type: "tool-result",
                      toolCallId,
                      toolName,
                      result
                    };
                  }
                )
              });
            }
            block = [];
            blockHasToolInvocations = false;
            currentStep++;
          }, "processBlock2");
          var processBlock = processBlock2;
          let currentStep = 0;
          let blockHasToolInvocations = false;
          let block = [];
          for (const part of message.parts) {
            switch (part.type) {
              case "text": {
                if (blockHasToolInvocations) {
                  processBlock2();
                }
                block.push(part);
                break;
              }
              case "file":
              case "reasoning": {
                block.push(part);
                break;
              }
              case "tool-invocation": {
                if (((_b = part.toolInvocation.step) != null ? _b : 0) !== currentStep) {
                  processBlock2();
                }
                block.push(part);
                blockHasToolInvocations = true;
                break;
              }
            }
          }
          processBlock2();
          break;
        }
        const toolInvocations = message.toolInvocations;
        if (toolInvocations == null || toolInvocations.length === 0) {
          coreMessages.push({ role: "assistant", content });
          break;
        }
        const maxStep = toolInvocations.reduce((max, toolInvocation) => {
          var _a18;
          return Math.max(max, (_a18 = toolInvocation.step) != null ? _a18 : 0);
        }, 0);
        for (let i22 = 0; i22 <= maxStep; i22++) {
          const stepInvocations = toolInvocations.filter(
            (toolInvocation) => {
              var _a18;
              return ((_a18 = toolInvocation.step) != null ? _a18 : 0) === i22;
            }
          );
          if (stepInvocations.length === 0) {
            continue;
          }
          coreMessages.push({
            role: "assistant",
            content: [
              ...isLastMessage && content && i22 === 0 ? [{ type: "text", text: content }] : [],
              ...stepInvocations.map(
                ({ toolCallId, toolName, args }) => ({
                  type: "tool-call",
                  toolCallId,
                  toolName,
                  args
                })
              )
            ]
          });
          coreMessages.push({
            role: "tool",
            content: stepInvocations.map((toolInvocation) => {
              if (!("result" in toolInvocation)) {
                throw new MessageConversionError({
                  originalMessage: message,
                  message: "ToolInvocation must have a result: " + JSON.stringify(toolInvocation)
                });
              }
              const { toolCallId, toolName, result } = toolInvocation;
              const tool2 = tools[toolName];
              return (tool2 == null ? void 0 : tool2.experimental_toToolResultContent) != null ? {
                type: "tool-result",
                toolCallId,
                toolName,
                result: tool2.experimental_toToolResultContent(result),
                experimental_content: tool2.experimental_toToolResultContent(result)
              } : {
                type: "tool-result",
                toolCallId,
                toolName,
                result
              };
            })
          });
        }
        if (content && !isLastMessage) {
          coreMessages.push({ role: "assistant", content });
        }
        break;
      }
      case "data": {
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new MessageConversionError({
          originalMessage: message,
          message: `Unsupported role: ${_exhaustiveCheck}`
        });
      }
    }
  }
  return coreMessages;
}
__name(convertToCoreMessages, "convertToCoreMessages");
function detectPromptType(prompt) {
  if (!Array.isArray(prompt)) {
    return "other";
  }
  if (prompt.length === 0) {
    return "messages";
  }
  const characteristics = prompt.map(detectSingleMessageCharacteristics);
  if (characteristics.some((c2) => c2 === "has-ui-specific-parts")) {
    return "ui-messages";
  } else if (characteristics.every(
    (c2) => c2 === "has-core-specific-parts" || c2 === "message"
  )) {
    return "messages";
  } else {
    return "other";
  }
}
__name(detectPromptType, "detectPromptType");
function detectSingleMessageCharacteristics(message) {
  if (typeof message === "object" && message !== null && (message.role === "function" || // UI-only role
  message.role === "data" || // UI-only role
  "toolInvocations" in message || // UI-specific field
  "parts" in message || // UI-specific field
  "experimental_attachments" in message)) {
    return "has-ui-specific-parts";
  } else if (typeof message === "object" && message !== null && "content" in message && (Array.isArray(message.content) || // Core messages can have array content
  "experimental_providerMetadata" in message || "providerOptions" in message)) {
    return "has-core-specific-parts";
  } else if (typeof message === "object" && message !== null && "role" in message && "content" in message && typeof message.content === "string" && ["system", "user", "assistant", "tool"].includes(message.role)) {
    return "message";
  } else {
    return "other";
  }
}
__name(detectSingleMessageCharacteristics, "detectSingleMessageCharacteristics");
var jsonValueSchema = external_exports.lazy(
  () => external_exports.union([
    external_exports.null(),
    external_exports.string(),
    external_exports.number(),
    external_exports.boolean(),
    external_exports.record(external_exports.string(), jsonValueSchema),
    external_exports.array(jsonValueSchema)
  ])
);
var providerMetadataSchema = external_exports.record(
  external_exports.string(),
  external_exports.record(external_exports.string(), jsonValueSchema)
);
var toolResultContentSchema = external_exports.array(
  external_exports.union([
    external_exports.object({ type: external_exports.literal("text"), text: external_exports.string() }),
    external_exports.object({
      type: external_exports.literal("image"),
      data: external_exports.string(),
      mimeType: external_exports.string().optional()
    })
  ])
);
var textPartSchema = external_exports.object({
  type: external_exports.literal("text"),
  text: external_exports.string(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var imagePartSchema = external_exports.object({
  type: external_exports.literal("image"),
  image: external_exports.union([dataContentSchema, external_exports.instanceof(URL)]),
  mimeType: external_exports.string().optional(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var filePartSchema = external_exports.object({
  type: external_exports.literal("file"),
  data: external_exports.union([dataContentSchema, external_exports.instanceof(URL)]),
  filename: external_exports.string().optional(),
  mimeType: external_exports.string(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var reasoningPartSchema = external_exports.object({
  type: external_exports.literal("reasoning"),
  text: external_exports.string(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var redactedReasoningPartSchema = external_exports.object({
  type: external_exports.literal("redacted-reasoning"),
  data: external_exports.string(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var toolCallPartSchema = external_exports.object({
  type: external_exports.literal("tool-call"),
  toolCallId: external_exports.string(),
  toolName: external_exports.string(),
  args: external_exports.unknown(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var toolResultPartSchema = external_exports.object({
  type: external_exports.literal("tool-result"),
  toolCallId: external_exports.string(),
  toolName: external_exports.string(),
  result: external_exports.unknown(),
  content: toolResultContentSchema.optional(),
  isError: external_exports.boolean().optional(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreSystemMessageSchema = external_exports.object({
  role: external_exports.literal("system"),
  content: external_exports.string(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreUserMessageSchema = external_exports.object({
  role: external_exports.literal("user"),
  content: external_exports.union([
    external_exports.string(),
    external_exports.array(external_exports.union([textPartSchema, imagePartSchema, filePartSchema]))
  ]),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreAssistantMessageSchema = external_exports.object({
  role: external_exports.literal("assistant"),
  content: external_exports.union([
    external_exports.string(),
    external_exports.array(
      external_exports.union([
        textPartSchema,
        filePartSchema,
        reasoningPartSchema,
        redactedReasoningPartSchema,
        toolCallPartSchema
      ])
    )
  ]),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreToolMessageSchema = external_exports.object({
  role: external_exports.literal("tool"),
  content: external_exports.array(toolResultPartSchema),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreMessageSchema = external_exports.union([
  coreSystemMessageSchema,
  coreUserMessageSchema,
  coreAssistantMessageSchema,
  coreToolMessageSchema
]);
function standardizePrompt({
  prompt,
  tools
}) {
  if (prompt.prompt == null && prompt.messages == null) {
    throw new InvalidPromptError({
      prompt,
      message: "prompt or messages must be defined"
    });
  }
  if (prompt.prompt != null && prompt.messages != null) {
    throw new InvalidPromptError({
      prompt,
      message: "prompt and messages cannot be defined at the same time"
    });
  }
  if (prompt.system != null && typeof prompt.system !== "string") {
    throw new InvalidPromptError({
      prompt,
      message: "system must be a string"
    });
  }
  if (prompt.prompt != null) {
    if (typeof prompt.prompt !== "string") {
      throw new InvalidPromptError({
        prompt,
        message: "prompt must be a string"
      });
    }
    return {
      type: "prompt",
      system: prompt.system,
      messages: [
        {
          role: "user",
          content: prompt.prompt
        }
      ]
    };
  }
  if (prompt.messages != null) {
    const promptType = detectPromptType(prompt.messages);
    if (promptType === "other") {
      throw new InvalidPromptError({
        prompt,
        message: "messages must be an array of CoreMessage or UIMessage"
      });
    }
    const messages = promptType === "ui-messages" ? convertToCoreMessages(prompt.messages, {
      tools
    }) : prompt.messages;
    if (messages.length === 0) {
      throw new InvalidPromptError({
        prompt,
        message: "messages must not be empty"
      });
    }
    const validationResult = safeValidateTypes({
      value: messages,
      schema: external_exports.array(coreMessageSchema)
    });
    if (!validationResult.success) {
      throw new InvalidPromptError({
        prompt,
        message: "messages must be an array of CoreMessage or UIMessage",
        cause: validationResult.error
      });
    }
    return {
      type: "messages",
      messages,
      system: prompt.system
    };
  }
  throw new Error("unreachable");
}
__name(standardizePrompt, "standardizePrompt");
function calculateLanguageModelUsage({
  promptTokens,
  completionTokens
}) {
  return {
    promptTokens,
    completionTokens,
    totalTokens: promptTokens + completionTokens
  };
}
__name(calculateLanguageModelUsage, "calculateLanguageModelUsage");
function addLanguageModelUsage(usage1, usage2) {
  return {
    promptTokens: usage1.promptTokens + usage2.promptTokens,
    completionTokens: usage1.completionTokens + usage2.completionTokens,
    totalTokens: usage1.totalTokens + usage2.totalTokens
  };
}
__name(addLanguageModelUsage, "addLanguageModelUsage");
var DEFAULT_SCHEMA_PREFIX = "JSON schema:";
var DEFAULT_SCHEMA_SUFFIX = "You MUST answer with a JSON object that matches the JSON schema above.";
var DEFAULT_GENERIC_SUFFIX = "You MUST answer with JSON.";
function injectJsonInstruction({
  prompt,
  schema,
  schemaPrefix = schema != null ? DEFAULT_SCHEMA_PREFIX : void 0,
  schemaSuffix = schema != null ? DEFAULT_SCHEMA_SUFFIX : DEFAULT_GENERIC_SUFFIX
}) {
  return [
    prompt != null && prompt.length > 0 ? prompt : void 0,
    prompt != null && prompt.length > 0 ? "" : void 0,
    // add a newline if prompt is not null
    schemaPrefix,
    schema != null ? JSON.stringify(schema) : void 0,
    schemaSuffix
  ].filter((line2) => line2 != null).join("\n");
}
__name(injectJsonInstruction, "injectJsonInstruction");
var originalGenerateId = createIdGenerator({ prefix: "aiobj", size: 24 });
var originalGenerateId2 = createIdGenerator({ prefix: "aiobj", size: 24 });
var name93 = "AI_NoOutputSpecifiedError";
var marker93 = `vercel.ai.error.${name93}`;
var symbol93 = Symbol.for(marker93);
var _a93;
var NoOutputSpecifiedError = class extends AISDKError {
  static {
    __name(this, "NoOutputSpecifiedError");
  }
  // used in isInstance
  constructor({ message = "No output specified." } = {}) {
    super({ name: name93, message });
    this[_a93] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker93);
  }
};
_a93 = symbol93;
var name103 = "AI_ToolExecutionError";
var marker103 = `vercel.ai.error.${name103}`;
var symbol103 = Symbol.for(marker103);
var _a103;
var ToolExecutionError = class extends AISDKError {
  static {
    __name(this, "ToolExecutionError");
  }
  constructor({
    toolArgs,
    toolName,
    toolCallId,
    cause,
    message = `Error executing tool ${toolName}: ${getErrorMessage(cause)}`
  }) {
    super({ name: name103, message, cause });
    this[_a103] = true;
    this.toolArgs = toolArgs;
    this.toolName = toolName;
    this.toolCallId = toolCallId;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker103);
  }
};
_a103 = symbol103;
function isNonEmptyObject(object2) {
  return object2 != null && Object.keys(object2).length > 0;
}
__name(isNonEmptyObject, "isNonEmptyObject");
function prepareToolsAndToolChoice({
  tools,
  toolChoice,
  activeTools
}) {
  if (!isNonEmptyObject(tools)) {
    return {
      tools: void 0,
      toolChoice: void 0
    };
  }
  const filteredTools = activeTools != null ? Object.entries(tools).filter(
    ([name172]) => activeTools.includes(name172)
  ) : Object.entries(tools);
  return {
    tools: filteredTools.map(([name172, tool2]) => {
      const toolType = tool2.type;
      switch (toolType) {
        case void 0:
        case "function":
          return {
            type: "function",
            name: name172,
            description: tool2.description,
            parameters: asSchema(tool2.parameters).jsonSchema
          };
        case "provider-defined":
          return {
            type: "provider-defined",
            name: name172,
            id: tool2.id,
            args: tool2.args
          };
        default: {
          const exhaustiveCheck = toolType;
          throw new Error(`Unsupported tool type: ${exhaustiveCheck}`);
        }
      }
    }),
    toolChoice: toolChoice == null ? { type: "auto" } : typeof toolChoice === "string" ? { type: toolChoice } : { type: "tool", toolName: toolChoice.toolName }
  };
}
__name(prepareToolsAndToolChoice, "prepareToolsAndToolChoice");
var lastWhitespaceRegexp = /^([\s\S]*?)(\s+)(\S*)$/;
function splitOnLastWhitespace(text22) {
  const match = text22.match(lastWhitespaceRegexp);
  return match ? { prefix: match[1], whitespace: match[2], suffix: match[3] } : void 0;
}
__name(splitOnLastWhitespace, "splitOnLastWhitespace");
function removeTextAfterLastWhitespace(text22) {
  const match = splitOnLastWhitespace(text22);
  return match ? match.prefix + match.whitespace : text22;
}
__name(removeTextAfterLastWhitespace, "removeTextAfterLastWhitespace");
var name113 = "AI_InvalidToolArgumentsError";
var marker113 = `vercel.ai.error.${name113}`;
var symbol113 = Symbol.for(marker113);
var _a113;
var InvalidToolArgumentsError = class extends AISDKError {
  static {
    __name(this, "InvalidToolArgumentsError");
  }
  constructor({
    toolArgs,
    toolName,
    cause,
    message = `Invalid arguments for tool ${toolName}: ${getErrorMessage(
      cause
    )}`
  }) {
    super({ name: name113, message, cause });
    this[_a113] = true;
    this.toolArgs = toolArgs;
    this.toolName = toolName;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker113);
  }
};
_a113 = symbol113;
var name123 = "AI_NoSuchToolError";
var marker123 = `vercel.ai.error.${name123}`;
var symbol123 = Symbol.for(marker123);
var _a123;
var NoSuchToolError = class extends AISDKError {
  static {
    __name(this, "NoSuchToolError");
  }
  constructor({
    toolName,
    availableTools = void 0,
    message = `Model tried to call unavailable tool '${toolName}'. ${availableTools === void 0 ? "No tools are available." : `Available tools: ${availableTools.join(", ")}.`}`
  }) {
    super({ name: name123, message });
    this[_a123] = true;
    this.toolName = toolName;
    this.availableTools = availableTools;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker123);
  }
};
_a123 = symbol123;
var name133 = "AI_ToolCallRepairError";
var marker133 = `vercel.ai.error.${name133}`;
var symbol133 = Symbol.for(marker133);
var _a133;
var ToolCallRepairError = class extends AISDKError {
  static {
    __name(this, "ToolCallRepairError");
  }
  constructor({
    cause,
    originalError,
    message = `Error repairing tool call: ${getErrorMessage(cause)}`
  }) {
    super({ name: name133, message, cause });
    this[_a133] = true;
    this.originalError = originalError;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker133);
  }
};
_a133 = symbol133;
async function parseToolCall({
  toolCall,
  tools,
  repairToolCall,
  system,
  messages
}) {
  if (tools == null) {
    throw new NoSuchToolError({ toolName: toolCall.toolName });
  }
  try {
    return await doParseToolCall({ toolCall, tools });
  } catch (error) {
    if (repairToolCall == null || !(NoSuchToolError.isInstance(error) || InvalidToolArgumentsError.isInstance(error))) {
      throw error;
    }
    let repairedToolCall = null;
    try {
      repairedToolCall = await repairToolCall({
        toolCall,
        tools,
        parameterSchema: /* @__PURE__ */ __name(({ toolName }) => asSchema(tools[toolName].parameters).jsonSchema, "parameterSchema"),
        system,
        messages,
        error
      });
    } catch (repairError) {
      throw new ToolCallRepairError({
        cause: repairError,
        originalError: error
      });
    }
    if (repairedToolCall == null) {
      throw error;
    }
    return await doParseToolCall({ toolCall: repairedToolCall, tools });
  }
}
__name(parseToolCall, "parseToolCall");
async function doParseToolCall({
  toolCall,
  tools
}) {
  const toolName = toolCall.toolName;
  const tool2 = tools[toolName];
  if (tool2 == null) {
    throw new NoSuchToolError({
      toolName: toolCall.toolName,
      availableTools: Object.keys(tools)
    });
  }
  const schema = asSchema(tool2.parameters);
  const parseResult = toolCall.args.trim() === "" ? safeValidateTypes({ value: {}, schema }) : safeParseJSON({ text: toolCall.args, schema });
  if (parseResult.success === false) {
    throw new InvalidToolArgumentsError({
      toolName,
      toolArgs: toolCall.args,
      cause: parseResult.error
    });
  }
  return {
    type: "tool-call",
    toolCallId: toolCall.toolCallId,
    toolName,
    args: parseResult.value
  };
}
__name(doParseToolCall, "doParseToolCall");
function asReasoningText(reasoning) {
  const reasoningText = reasoning.filter((part) => part.type === "text").map((part) => part.text).join("");
  return reasoningText.length > 0 ? reasoningText : void 0;
}
__name(asReasoningText, "asReasoningText");
function toResponseMessages({
  text: text22 = "",
  files,
  reasoning,
  tools,
  toolCalls,
  toolResults,
  messageId,
  generateMessageId
}) {
  const responseMessages = [];
  responseMessages.push({
    role: "assistant",
    content: [
      ...reasoning.map(
        (part) => part.type === "text" ? { ...part, type: "reasoning" } : { ...part, type: "redacted-reasoning" }
      ),
      // TODO language model v2: switch to order response content (instead of type-based ordering)
      ...files.map((file) => ({
        type: "file",
        data: file.base64,
        mimeType: file.mimeType
      })),
      { type: "text", text: text22 },
      ...toolCalls
    ],
    id: messageId
  });
  if (toolResults.length > 0) {
    responseMessages.push({
      role: "tool",
      id: generateMessageId(),
      content: toolResults.map((toolResult) => {
        const tool2 = tools[toolResult.toolName];
        return (tool2 == null ? void 0 : tool2.experimental_toToolResultContent) != null ? {
          type: "tool-result",
          toolCallId: toolResult.toolCallId,
          toolName: toolResult.toolName,
          result: tool2.experimental_toToolResultContent(toolResult.result),
          experimental_content: tool2.experimental_toToolResultContent(
            toolResult.result
          )
        } : {
          type: "tool-result",
          toolCallId: toolResult.toolCallId,
          toolName: toolResult.toolName,
          result: toolResult.result
        };
      })
    });
  }
  return responseMessages;
}
__name(toResponseMessages, "toResponseMessages");
var originalGenerateId3 = createIdGenerator({
  prefix: "aitxt",
  size: 24
});
var originalGenerateMessageId = createIdGenerator({
  prefix: "msg",
  size: 24
});
async function generateText({
  model,
  tools,
  toolChoice,
  system,
  prompt,
  messages,
  maxRetries: maxRetriesArg,
  abortSignal,
  headers,
  maxSteps = 1,
  experimental_generateMessageId: generateMessageId = originalGenerateMessageId,
  experimental_output: output,
  experimental_continueSteps: continueSteps = false,
  experimental_telemetry: telemetry,
  experimental_providerMetadata,
  providerOptions = experimental_providerMetadata,
  experimental_activeTools: activeTools,
  experimental_repairToolCall: repairToolCall,
  _internal: {
    generateId: generateId32 = originalGenerateId3,
    currentDate = /* @__PURE__ */ __name(() => /* @__PURE__ */ new Date(), "currentDate")
  } = {},
  onStepFinish,
  ...settings
}) {
  var _a172;
  if (maxSteps < 1) {
    throw new InvalidArgumentError3({
      parameter: "maxSteps",
      value: maxSteps,
      message: "maxSteps must be at least 1"
    });
  }
  const { maxRetries, retry } = prepareRetries({ maxRetries: maxRetriesArg });
  const baseTelemetryAttributes = getBaseTelemetryAttributes({
    model,
    telemetry,
    headers,
    settings: { ...settings, maxRetries }
  });
  const initialPrompt = standardizePrompt({
    prompt: {
      system: (_a172 = output == null ? void 0 : output.injectIntoSystemPrompt({ system, model })) != null ? _a172 : system,
      prompt,
      messages
    },
    tools
  });
  const tracer2 = getTracer(telemetry);
  return recordSpan({
    name: "ai.generateText",
    attributes: selectTelemetryAttributes({
      telemetry,
      attributes: {
        ...assembleOperationName({
          operationId: "ai.generateText",
          telemetry
        }),
        ...baseTelemetryAttributes,
        // specific settings that only make sense on the outer level:
        "ai.prompt": {
          input: /* @__PURE__ */ __name(() => JSON.stringify({ system, prompt, messages }), "input")
        },
        "ai.settings.maxSteps": maxSteps
      }
    }),
    tracer: tracer2,
    fn: /* @__PURE__ */ __name(async (span) => {
      var _a18, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const mode = {
        type: "regular",
        ...prepareToolsAndToolChoice({ tools, toolChoice, activeTools })
      };
      const callSettings = prepareCallSettings(settings);
      let currentModelResponse;
      let currentToolCalls = [];
      let currentToolResults = [];
      let currentReasoningDetails = [];
      let stepCount = 0;
      const responseMessages = [];
      let text22 = "";
      const sources = [];
      const steps = [];
      let usage = {
        completionTokens: 0,
        promptTokens: 0,
        totalTokens: 0
      };
      let stepType = "initial";
      do {
        const promptFormat = stepCount === 0 ? initialPrompt.type : "messages";
        const stepInputMessages = [
          ...initialPrompt.messages,
          ...responseMessages
        ];
        const promptMessages = await convertToLanguageModelPrompt({
          prompt: {
            type: promptFormat,
            system: initialPrompt.system,
            messages: stepInputMessages
          },
          modelSupportsImageUrls: model.supportsImageUrls,
          modelSupportsUrl: (_a18 = model.supportsUrl) == null ? void 0 : _a18.bind(model)
          // support 'this' context
        });
        currentModelResponse = await retry(
          () => recordSpan({
            name: "ai.generateText.doGenerate",
            attributes: selectTelemetryAttributes({
              telemetry,
              attributes: {
                ...assembleOperationName({
                  operationId: "ai.generateText.doGenerate",
                  telemetry
                }),
                ...baseTelemetryAttributes,
                "ai.prompt.format": { input: /* @__PURE__ */ __name(() => promptFormat, "input") },
                "ai.prompt.messages": {
                  input: /* @__PURE__ */ __name(() => JSON.stringify(promptMessages), "input")
                },
                "ai.prompt.tools": {
                  // convert the language model level tools:
                  input: /* @__PURE__ */ __name(() => {
                    var _a19;
                    return (_a19 = mode.tools) == null ? void 0 : _a19.map((tool2) => JSON.stringify(tool2));
                  }, "input")
                },
                "ai.prompt.toolChoice": {
                  input: /* @__PURE__ */ __name(() => mode.toolChoice != null ? JSON.stringify(mode.toolChoice) : void 0, "input")
                },
                // standardized gen-ai llm span attributes:
                "gen_ai.system": model.provider,
                "gen_ai.request.model": model.modelId,
                "gen_ai.request.frequency_penalty": settings.frequencyPenalty,
                "gen_ai.request.max_tokens": settings.maxTokens,
                "gen_ai.request.presence_penalty": settings.presencePenalty,
                "gen_ai.request.stop_sequences": settings.stopSequences,
                "gen_ai.request.temperature": settings.temperature,
                "gen_ai.request.top_k": settings.topK,
                "gen_ai.request.top_p": settings.topP
              }
            }),
            tracer: tracer2,
            fn: /* @__PURE__ */ __name(async (span2) => {
              var _a19, _b2, _c2, _d2, _e2, _f2;
              const result = await model.doGenerate({
                mode,
                ...callSettings,
                inputFormat: promptFormat,
                responseFormat: output == null ? void 0 : output.responseFormat({ model }),
                prompt: promptMessages,
                providerMetadata: providerOptions,
                abortSignal,
                headers
              });
              const responseData = {
                id: (_b2 = (_a19 = result.response) == null ? void 0 : _a19.id) != null ? _b2 : generateId32(),
                timestamp: (_d2 = (_c2 = result.response) == null ? void 0 : _c2.timestamp) != null ? _d2 : currentDate(),
                modelId: (_f2 = (_e2 = result.response) == null ? void 0 : _e2.modelId) != null ? _f2 : model.modelId
              };
              span2.setAttributes(
                selectTelemetryAttributes({
                  telemetry,
                  attributes: {
                    "ai.response.finishReason": result.finishReason,
                    "ai.response.text": {
                      output: /* @__PURE__ */ __name(() => result.text, "output")
                    },
                    "ai.response.toolCalls": {
                      output: /* @__PURE__ */ __name(() => JSON.stringify(result.toolCalls), "output")
                    },
                    "ai.response.id": responseData.id,
                    "ai.response.model": responseData.modelId,
                    "ai.response.timestamp": responseData.timestamp.toISOString(),
                    "ai.usage.promptTokens": result.usage.promptTokens,
                    "ai.usage.completionTokens": result.usage.completionTokens,
                    // standardized gen-ai llm span attributes:
                    "gen_ai.response.finish_reasons": [result.finishReason],
                    "gen_ai.response.id": responseData.id,
                    "gen_ai.response.model": responseData.modelId,
                    "gen_ai.usage.input_tokens": result.usage.promptTokens,
                    "gen_ai.usage.output_tokens": result.usage.completionTokens
                  }
                })
              );
              return { ...result, response: responseData };
            }, "fn")
          })
        );
        currentToolCalls = await Promise.all(
          ((_b = currentModelResponse.toolCalls) != null ? _b : []).map(
            (toolCall) => parseToolCall({
              toolCall,
              tools,
              repairToolCall,
              system,
              messages: stepInputMessages
            })
          )
        );
        currentToolResults = tools == null ? [] : await executeTools({
          toolCalls: currentToolCalls,
          tools,
          tracer: tracer2,
          telemetry,
          messages: stepInputMessages,
          abortSignal
        });
        const currentUsage = calculateLanguageModelUsage(
          currentModelResponse.usage
        );
        usage = addLanguageModelUsage(usage, currentUsage);
        let nextStepType = "done";
        if (++stepCount < maxSteps) {
          if (continueSteps && currentModelResponse.finishReason === "length" && // only use continue when there are no tool calls:
          currentToolCalls.length === 0) {
            nextStepType = "continue";
          } else if (
            // there are tool calls:
            currentToolCalls.length > 0 && // all current tool calls have results:
            currentToolResults.length === currentToolCalls.length
          ) {
            nextStepType = "tool-result";
          }
        }
        const originalText = (_c = currentModelResponse.text) != null ? _c : "";
        const stepTextLeadingWhitespaceTrimmed = stepType === "continue" && // only for continue steps
        text22.trimEnd() !== text22 ? originalText.trimStart() : originalText;
        const stepText = nextStepType === "continue" ? removeTextAfterLastWhitespace(stepTextLeadingWhitespaceTrimmed) : stepTextLeadingWhitespaceTrimmed;
        text22 = nextStepType === "continue" || stepType === "continue" ? text22 + stepText : stepText;
        currentReasoningDetails = asReasoningDetails(
          currentModelResponse.reasoning
        );
        sources.push(...(_d = currentModelResponse.sources) != null ? _d : []);
        if (stepType === "continue") {
          const lastMessage = responseMessages[responseMessages.length - 1];
          if (typeof lastMessage.content === "string") {
            lastMessage.content += stepText;
          } else {
            lastMessage.content.push({
              text: stepText,
              type: "text"
            });
          }
        } else {
          responseMessages.push(
            ...toResponseMessages({
              text: text22,
              files: asFiles(currentModelResponse.files),
              reasoning: asReasoningDetails(currentModelResponse.reasoning),
              tools: tools != null ? tools : {},
              toolCalls: currentToolCalls,
              toolResults: currentToolResults,
              messageId: generateMessageId(),
              generateMessageId
            })
          );
        }
        const currentStepResult = {
          stepType,
          text: stepText,
          // TODO v5: rename reasoning to reasoningText (and use reasoning for composite array)
          reasoning: asReasoningText(currentReasoningDetails),
          reasoningDetails: currentReasoningDetails,
          files: asFiles(currentModelResponse.files),
          sources: (_e = currentModelResponse.sources) != null ? _e : [],
          toolCalls: currentToolCalls,
          toolResults: currentToolResults,
          finishReason: currentModelResponse.finishReason,
          usage: currentUsage,
          warnings: currentModelResponse.warnings,
          logprobs: currentModelResponse.logprobs,
          request: (_f = currentModelResponse.request) != null ? _f : {},
          response: {
            ...currentModelResponse.response,
            headers: (_g = currentModelResponse.rawResponse) == null ? void 0 : _g.headers,
            body: (_h = currentModelResponse.rawResponse) == null ? void 0 : _h.body,
            // deep clone msgs to avoid mutating past messages in multi-step:
            messages: structuredClone(responseMessages)
          },
          providerMetadata: currentModelResponse.providerMetadata,
          experimental_providerMetadata: currentModelResponse.providerMetadata,
          isContinued: nextStepType === "continue"
        };
        steps.push(currentStepResult);
        await (onStepFinish == null ? void 0 : onStepFinish(currentStepResult));
        stepType = nextStepType;
      } while (stepType !== "done");
      span.setAttributes(
        selectTelemetryAttributes({
          telemetry,
          attributes: {
            "ai.response.finishReason": currentModelResponse.finishReason,
            "ai.response.text": {
              output: /* @__PURE__ */ __name(() => currentModelResponse.text, "output")
            },
            "ai.response.toolCalls": {
              output: /* @__PURE__ */ __name(() => JSON.stringify(currentModelResponse.toolCalls), "output")
            },
            "ai.usage.promptTokens": currentModelResponse.usage.promptTokens,
            "ai.usage.completionTokens": currentModelResponse.usage.completionTokens
          }
        })
      );
      return new DefaultGenerateTextResult({
        text: text22,
        files: asFiles(currentModelResponse.files),
        reasoning: asReasoningText(currentReasoningDetails),
        reasoningDetails: currentReasoningDetails,
        sources,
        outputResolver: /* @__PURE__ */ __name(() => {
          if (output == null) {
            throw new NoOutputSpecifiedError();
          }
          return output.parseOutput(
            { text: text22 },
            { response: currentModelResponse.response, usage }
          );
        }, "outputResolver"),
        toolCalls: currentToolCalls,
        toolResults: currentToolResults,
        finishReason: currentModelResponse.finishReason,
        usage,
        warnings: currentModelResponse.warnings,
        request: (_i = currentModelResponse.request) != null ? _i : {},
        response: {
          ...currentModelResponse.response,
          headers: (_j = currentModelResponse.rawResponse) == null ? void 0 : _j.headers,
          body: (_k = currentModelResponse.rawResponse) == null ? void 0 : _k.body,
          messages: responseMessages
        },
        logprobs: currentModelResponse.logprobs,
        steps,
        providerMetadata: currentModelResponse.providerMetadata
      });
    }, "fn")
  });
}
__name(generateText, "generateText");
async function executeTools({
  toolCalls,
  tools,
  tracer: tracer2,
  telemetry,
  messages,
  abortSignal
}) {
  const toolResults = await Promise.all(
    toolCalls.map(async ({ toolCallId, toolName, args }) => {
      const tool2 = tools[toolName];
      if ((tool2 == null ? void 0 : tool2.execute) == null) {
        return void 0;
      }
      const result = await recordSpan({
        name: "ai.toolCall",
        attributes: selectTelemetryAttributes({
          telemetry,
          attributes: {
            ...assembleOperationName({
              operationId: "ai.toolCall",
              telemetry
            }),
            "ai.toolCall.name": toolName,
            "ai.toolCall.id": toolCallId,
            "ai.toolCall.args": {
              output: /* @__PURE__ */ __name(() => JSON.stringify(args), "output")
            }
          }
        }),
        tracer: tracer2,
        fn: /* @__PURE__ */ __name(async (span) => {
          try {
            const result2 = await tool2.execute(args, {
              toolCallId,
              messages,
              abortSignal
            });
            try {
              span.setAttributes(
                selectTelemetryAttributes({
                  telemetry,
                  attributes: {
                    "ai.toolCall.result": {
                      output: /* @__PURE__ */ __name(() => JSON.stringify(result2), "output")
                    }
                  }
                })
              );
            } catch (ignored) {
            }
            return result2;
          } catch (error) {
            throw new ToolExecutionError({
              toolCallId,
              toolName,
              toolArgs: args,
              cause: error
            });
          }
        }, "fn")
      });
      return {
        type: "tool-result",
        toolCallId,
        toolName,
        args,
        result
      };
    })
  );
  return toolResults.filter(
    (result) => result != null
  );
}
__name(executeTools, "executeTools");
var DefaultGenerateTextResult = class {
  static {
    __name(this, "DefaultGenerateTextResult");
  }
  constructor(options) {
    this.text = options.text;
    this.files = options.files;
    this.reasoning = options.reasoning;
    this.reasoningDetails = options.reasoningDetails;
    this.toolCalls = options.toolCalls;
    this.toolResults = options.toolResults;
    this.finishReason = options.finishReason;
    this.usage = options.usage;
    this.warnings = options.warnings;
    this.request = options.request;
    this.response = options.response;
    this.steps = options.steps;
    this.experimental_providerMetadata = options.providerMetadata;
    this.providerMetadata = options.providerMetadata;
    this.logprobs = options.logprobs;
    this.outputResolver = options.outputResolver;
    this.sources = options.sources;
  }
  get experimental_output() {
    return this.outputResolver();
  }
};
function asReasoningDetails(reasoning) {
  if (reasoning == null) {
    return [];
  }
  if (typeof reasoning === "string") {
    return [{ type: "text", text: reasoning }];
  }
  return reasoning;
}
__name(asReasoningDetails, "asReasoningDetails");
function asFiles(files) {
  var _a172;
  return (_a172 = files == null ? void 0 : files.map((file) => new DefaultGeneratedFile(file))) != null ? _a172 : [];
}
__name(asFiles, "asFiles");
var output_exports = {};
__export2(output_exports, {
  object: /* @__PURE__ */ __name(() => object, "object"),
  text: /* @__PURE__ */ __name(() => text3, "text")
});
var name142 = "AI_InvalidStreamPartError";
var marker143 = `vercel.ai.error.${name142}`;
var symbol143 = Symbol.for(marker143);
var _a143;
_a143 = symbol143;
var name152 = "AI_MCPClientError";
var marker152 = `vercel.ai.error.${name152}`;
var symbol152 = Symbol.for(marker152);
var _a152;
_a152 = symbol152;
var text3 = /* @__PURE__ */ __name(() => ({
  type: "text",
  responseFormat: /* @__PURE__ */ __name(() => ({ type: "text" }), "responseFormat"),
  injectIntoSystemPrompt({ system }) {
    return system;
  },
  parsePartial({ text: text22 }) {
    return { partial: text22 };
  },
  parseOutput({ text: text22 }) {
    return text22;
  }
}), "text");
var object = /* @__PURE__ */ __name(({
  schema: inputSchema
}) => {
  const schema = asSchema(inputSchema);
  return {
    type: "object",
    responseFormat: /* @__PURE__ */ __name(({ model }) => ({
      type: "json",
      schema: model.supportsStructuredOutputs ? schema.jsonSchema : void 0
    }), "responseFormat"),
    injectIntoSystemPrompt({ system, model }) {
      return model.supportsStructuredOutputs ? system : injectJsonInstruction({
        prompt: system,
        schema: schema.jsonSchema
      });
    },
    parsePartial({ text: text22 }) {
      const result = parsePartialJson(text22);
      switch (result.state) {
        case "failed-parse":
        case "undefined-input":
          return void 0;
        case "repaired-parse":
        case "successful-parse":
          return {
            // Note: currently no validation of partial results:
            partial: result.value
          };
        default: {
          const _exhaustiveCheck = result.state;
          throw new Error(`Unsupported parse state: ${_exhaustiveCheck}`);
        }
      }
    },
    parseOutput({ text: text22 }, context) {
      const parseResult = safeParseJSON({ text: text22 });
      if (!parseResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: could not parse the response.",
          cause: parseResult.error,
          text: text22,
          response: context.response,
          usage: context.usage
        });
      }
      const validationResult = safeValidateTypes({
        value: parseResult.value,
        schema
      });
      if (!validationResult.success) {
        throw new NoObjectGeneratedError({
          message: "No object generated: response did not match schema.",
          cause: validationResult.error,
          text: text22,
          response: context.response,
          usage: context.usage
        });
      }
      return validationResult.value;
    }
  };
}, "object");
function mergeStreams(stream1, stream2) {
  const reader1 = stream1.getReader();
  const reader2 = stream2.getReader();
  let lastRead1 = void 0;
  let lastRead2 = void 0;
  let stream1Done = false;
  let stream2Done = false;
  async function readStream1(controller) {
    try {
      if (lastRead1 == null) {
        lastRead1 = reader1.read();
      }
      const result = await lastRead1;
      lastRead1 = void 0;
      if (!result.done) {
        controller.enqueue(result.value);
      } else {
        controller.close();
      }
    } catch (error) {
      controller.error(error);
    }
  }
  __name(readStream1, "readStream1");
  async function readStream2(controller) {
    try {
      if (lastRead2 == null) {
        lastRead2 = reader2.read();
      }
      const result = await lastRead2;
      lastRead2 = void 0;
      if (!result.done) {
        controller.enqueue(result.value);
      } else {
        controller.close();
      }
    } catch (error) {
      controller.error(error);
    }
  }
  __name(readStream2, "readStream2");
  return new ReadableStream({
    async pull(controller) {
      try {
        if (stream1Done) {
          await readStream2(controller);
          return;
        }
        if (stream2Done) {
          await readStream1(controller);
          return;
        }
        if (lastRead1 == null) {
          lastRead1 = reader1.read();
        }
        if (lastRead2 == null) {
          lastRead2 = reader2.read();
        }
        const { result, reader } = await Promise.race([
          lastRead1.then((result2) => ({ result: result2, reader: reader1 })),
          lastRead2.then((result2) => ({ result: result2, reader: reader2 }))
        ]);
        if (!result.done) {
          controller.enqueue(result.value);
        }
        if (reader === reader1) {
          lastRead1 = void 0;
          if (result.done) {
            await readStream2(controller);
            stream1Done = true;
          }
        } else {
          lastRead2 = void 0;
          if (result.done) {
            stream2Done = true;
            await readStream1(controller);
          }
        }
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      reader1.cancel();
      reader2.cancel();
    }
  });
}
__name(mergeStreams, "mergeStreams");
var originalGenerateId4 = createIdGenerator({
  prefix: "aitxt",
  size: 24
});
var originalGenerateMessageId2 = createIdGenerator({
  prefix: "msg",
  size: 24
});
var name16 = "AI_NoSuchProviderError";
var marker162 = `vercel.ai.error.${name16}`;
var symbol162 = Symbol.for(marker162);
var _a162;
_a162 = symbol162;
var ClientOrServerImplementationSchema = external_exports.object({
  name: external_exports.string(),
  version: external_exports.string()
}).passthrough();
var BaseParamsSchema = external_exports.object({
  _meta: external_exports.optional(external_exports.object({}).passthrough())
}).passthrough();
var ResultSchema = BaseParamsSchema;
var RequestSchema = external_exports.object({
  method: external_exports.string(),
  params: external_exports.optional(BaseParamsSchema)
});
var ServerCapabilitiesSchema = external_exports.object({
  experimental: external_exports.optional(external_exports.object({}).passthrough()),
  logging: external_exports.optional(external_exports.object({}).passthrough()),
  prompts: external_exports.optional(
    external_exports.object({
      listChanged: external_exports.optional(external_exports.boolean())
    }).passthrough()
  ),
  resources: external_exports.optional(
    external_exports.object({
      subscribe: external_exports.optional(external_exports.boolean()),
      listChanged: external_exports.optional(external_exports.boolean())
    }).passthrough()
  ),
  tools: external_exports.optional(
    external_exports.object({
      listChanged: external_exports.optional(external_exports.boolean())
    }).passthrough()
  )
}).passthrough();
var InitializeResultSchema = ResultSchema.extend({
  protocolVersion: external_exports.string(),
  capabilities: ServerCapabilitiesSchema,
  serverInfo: ClientOrServerImplementationSchema,
  instructions: external_exports.optional(external_exports.string())
});
var PaginatedResultSchema = ResultSchema.extend({
  nextCursor: external_exports.optional(external_exports.string())
});
var ToolSchema = external_exports.object({
  name: external_exports.string(),
  description: external_exports.optional(external_exports.string()),
  inputSchema: external_exports.object({
    type: external_exports.literal("object"),
    properties: external_exports.optional(external_exports.object({}).passthrough())
  }).passthrough()
}).passthrough();
var ListToolsResultSchema = PaginatedResultSchema.extend({
  tools: external_exports.array(ToolSchema)
});
var TextContentSchema = external_exports.object({
  type: external_exports.literal("text"),
  text: external_exports.string()
}).passthrough();
var ImageContentSchema = external_exports.object({
  type: external_exports.literal("image"),
  data: external_exports.string().base64(),
  mimeType: external_exports.string()
}).passthrough();
var ResourceContentsSchema = external_exports.object({
  /**
   * The URI of this resource.
   */
  uri: external_exports.string(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: external_exports.optional(external_exports.string())
}).passthrough();
var TextResourceContentsSchema = ResourceContentsSchema.extend({
  text: external_exports.string()
});
var BlobResourceContentsSchema = ResourceContentsSchema.extend({
  blob: external_exports.string().base64()
});
var EmbeddedResourceSchema = external_exports.object({
  type: external_exports.literal("resource"),
  resource: external_exports.union([TextResourceContentsSchema, BlobResourceContentsSchema])
}).passthrough();
var CallToolResultSchema = ResultSchema.extend({
  content: external_exports.array(
    external_exports.union([TextContentSchema, ImageContentSchema, EmbeddedResourceSchema])
  ),
  isError: external_exports.boolean().default(false).optional()
}).or(
  ResultSchema.extend({
    toolResult: external_exports.unknown()
  })
);
var JSONRPC_VERSION = "2.0";
var JSONRPCRequestSchema = external_exports.object({
  jsonrpc: external_exports.literal(JSONRPC_VERSION),
  id: external_exports.union([external_exports.string(), external_exports.number().int()])
}).merge(RequestSchema).strict();
var JSONRPCResponseSchema = external_exports.object({
  jsonrpc: external_exports.literal(JSONRPC_VERSION),
  id: external_exports.union([external_exports.string(), external_exports.number().int()]),
  result: ResultSchema
}).strict();
var JSONRPCErrorSchema = external_exports.object({
  jsonrpc: external_exports.literal(JSONRPC_VERSION),
  id: external_exports.union([external_exports.string(), external_exports.number().int()]),
  error: external_exports.object({
    code: external_exports.number().int(),
    message: external_exports.string(),
    data: external_exports.optional(external_exports.unknown())
  })
}).strict();
var JSONRPCNotificationSchema = external_exports.object({
  jsonrpc: external_exports.literal(JSONRPC_VERSION)
}).merge(
  external_exports.object({
    method: external_exports.string(),
    params: external_exports.optional(BaseParamsSchema)
  })
).strict();
var JSONRPCMessageSchema = external_exports.union([
  JSONRPCRequestSchema,
  JSONRPCNotificationSchema,
  JSONRPCResponseSchema,
  JSONRPCErrorSchema
]);
var langchain_adapter_exports = {};
__export2(langchain_adapter_exports, {
  mergeIntoDataStream: /* @__PURE__ */ __name(() => mergeIntoDataStream, "mergeIntoDataStream"),
  toDataStream: /* @__PURE__ */ __name(() => toDataStream, "toDataStream"),
  toDataStreamResponse: /* @__PURE__ */ __name(() => toDataStreamResponse, "toDataStreamResponse")
});
function createCallbacksTransformer(callbacks = {}) {
  const textEncoder = new TextEncoder();
  let aggregatedResponse = "";
  return new TransformStream({
    async start() {
      if (callbacks.onStart)
        await callbacks.onStart();
    },
    async transform(message, controller) {
      controller.enqueue(textEncoder.encode(message));
      aggregatedResponse += message;
      if (callbacks.onToken)
        await callbacks.onToken(message);
      if (callbacks.onText && typeof message === "string") {
        await callbacks.onText(message);
      }
    },
    async flush() {
      if (callbacks.onCompletion) {
        await callbacks.onCompletion(aggregatedResponse);
      }
      if (callbacks.onFinal) {
        await callbacks.onFinal(aggregatedResponse);
      }
    }
  });
}
__name(createCallbacksTransformer, "createCallbacksTransformer");
function toDataStreamInternal(stream, callbacks) {
  return stream.pipeThrough(
    new TransformStream({
      transform: /* @__PURE__ */ __name(async (value, controller) => {
        var _a172;
        if (typeof value === "string") {
          controller.enqueue(value);
          return;
        }
        if ("event" in value) {
          if (value.event === "on_chat_model_stream") {
            forwardAIMessageChunk(
              (_a172 = value.data) == null ? void 0 : _a172.chunk,
              controller
            );
          }
          return;
        }
        forwardAIMessageChunk(value, controller);
      }, "transform")
    })
  ).pipeThrough(createCallbacksTransformer(callbacks)).pipeThrough(new TextDecoderStream()).pipeThrough(
    new TransformStream({
      transform: /* @__PURE__ */ __name(async (chunk, controller) => {
        controller.enqueue(formatDataStreamPart("text", chunk));
      }, "transform")
    })
  );
}
__name(toDataStreamInternal, "toDataStreamInternal");
function toDataStream(stream, callbacks) {
  return toDataStreamInternal(stream, callbacks).pipeThrough(
    new TextEncoderStream()
  );
}
__name(toDataStream, "toDataStream");
function toDataStreamResponse(stream, options) {
  var _a172;
  const dataStream = toDataStreamInternal(
    stream,
    options == null ? void 0 : options.callbacks
  ).pipeThrough(new TextEncoderStream());
  const data = options == null ? void 0 : options.data;
  const init = options == null ? void 0 : options.init;
  const responseStream = data ? mergeStreams(data.stream, dataStream) : dataStream;
  return new Response(responseStream, {
    status: (_a172 = init == null ? void 0 : init.status) != null ? _a172 : 200,
    statusText: init == null ? void 0 : init.statusText,
    headers: prepareResponseHeaders(init == null ? void 0 : init.headers, {
      contentType: "text/plain; charset=utf-8",
      dataStreamVersion: "v1"
    })
  });
}
__name(toDataStreamResponse, "toDataStreamResponse");
function mergeIntoDataStream(stream, options) {
  options.dataStream.merge(toDataStreamInternal(stream, options.callbacks));
}
__name(mergeIntoDataStream, "mergeIntoDataStream");
function forwardAIMessageChunk(chunk, controller) {
  if (typeof chunk.content === "string") {
    controller.enqueue(chunk.content);
  } else {
    const content = chunk.content;
    for (const item of content) {
      if (item.type === "text") {
        controller.enqueue(item.text);
      }
    }
  }
}
__name(forwardAIMessageChunk, "forwardAIMessageChunk");
var llamaindex_adapter_exports = {};
__export2(llamaindex_adapter_exports, {
  mergeIntoDataStream: /* @__PURE__ */ __name(() => mergeIntoDataStream2, "mergeIntoDataStream"),
  toDataStream: /* @__PURE__ */ __name(() => toDataStream2, "toDataStream"),
  toDataStreamResponse: /* @__PURE__ */ __name(() => toDataStreamResponse2, "toDataStreamResponse")
});
function toDataStreamInternal2(stream, callbacks) {
  const trimStart = trimStartOfStream();
  return convertAsyncIteratorToReadableStream(stream[Symbol.asyncIterator]()).pipeThrough(
    new TransformStream({
      async transform(message, controller) {
        controller.enqueue(trimStart(message.delta));
      }
    })
  ).pipeThrough(createCallbacksTransformer(callbacks)).pipeThrough(new TextDecoderStream()).pipeThrough(
    new TransformStream({
      transform: /* @__PURE__ */ __name(async (chunk, controller) => {
        controller.enqueue(formatDataStreamPart("text", chunk));
      }, "transform")
    })
  );
}
__name(toDataStreamInternal2, "toDataStreamInternal2");
function toDataStream2(stream, callbacks) {
  return toDataStreamInternal2(stream, callbacks).pipeThrough(
    new TextEncoderStream()
  );
}
__name(toDataStream2, "toDataStream2");
function toDataStreamResponse2(stream, options = {}) {
  var _a172;
  const { init, data, callbacks } = options;
  const dataStream = toDataStreamInternal2(stream, callbacks).pipeThrough(
    new TextEncoderStream()
  );
  const responseStream = data ? mergeStreams(data.stream, dataStream) : dataStream;
  return new Response(responseStream, {
    status: (_a172 = init == null ? void 0 : init.status) != null ? _a172 : 200,
    statusText: init == null ? void 0 : init.statusText,
    headers: prepareResponseHeaders(init == null ? void 0 : init.headers, {
      contentType: "text/plain; charset=utf-8",
      dataStreamVersion: "v1"
    })
  });
}
__name(toDataStreamResponse2, "toDataStreamResponse2");
function mergeIntoDataStream2(stream, options) {
  options.dataStream.merge(toDataStreamInternal2(stream, options.callbacks));
}
__name(mergeIntoDataStream2, "mergeIntoDataStream2");
function trimStartOfStream() {
  let isStreamStart = true;
  return (text22) => {
    if (isStreamStart) {
      text22 = text22.trimStart();
      if (text22)
        isStreamStart = false;
    }
    return text22;
  };
}
__name(trimStartOfStream, "trimStartOfStream");
var HANGING_STREAM_WARNING_TIME_MS = 15 * 1e3;

// node_modules/@ai-sdk/provider/dist/index.mjs
var marker17 = "vercel.ai.error";
var symbol17 = Symbol.for(marker17);
var _a17;
var _AISDKError5 = class _AISDKError6 extends Error {
  static {
    __name(this, "_AISDKError");
  }
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name143,
    message,
    cause
  }) {
    super(message);
    this[_a17] = true;
    this.name = name143;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError6.hasMarker(error, marker17);
  }
  static hasMarker(error, marker153) {
    const markerSymbol = Symbol.for(marker153);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
};
_a17 = symbol17;
var AISDKError3 = _AISDKError5;
var name17 = "AI_APICallError";
var marker24 = `vercel.ai.error.${name17}`;
var symbol24 = Symbol.for(marker24);
var _a24;
var APICallError2 = class extends AISDKError3 {
  static {
    __name(this, "APICallError");
  }
  constructor({
    message,
    url,
    requestBodyValues,
    statusCode,
    responseHeaders,
    responseBody,
    cause,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500),
    // server error
    data
  }) {
    super({ name: name17, message, cause });
    this[_a24] = true;
    this.url = url;
    this.requestBodyValues = requestBodyValues;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.responseBody = responseBody;
    this.isRetryable = isRetryable;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError3.hasMarker(error, marker24);
  }
};
_a24 = symbol24;
var name24 = "AI_EmptyResponseBodyError";
var marker34 = `vercel.ai.error.${name24}`;
var symbol34 = Symbol.for(marker34);
var _a34;
var EmptyResponseBodyError = class extends AISDKError3 {
  static {
    __name(this, "EmptyResponseBodyError");
  }
  // used in isInstance
  constructor({ message = "Empty response body" } = {}) {
    super({ name: name24, message });
    this[_a34] = true;
  }
  static isInstance(error) {
    return AISDKError3.hasMarker(error, marker34);
  }
};
_a34 = symbol34;
function getErrorMessage4(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
__name(getErrorMessage4, "getErrorMessage");
var name34 = "AI_InvalidArgumentError";
var marker44 = `vercel.ai.error.${name34}`;
var symbol44 = Symbol.for(marker44);
var _a44;
var InvalidArgumentError4 = class extends AISDKError3 {
  static {
    __name(this, "InvalidArgumentError");
  }
  constructor({
    message,
    cause,
    argument
  }) {
    super({ name: name34, message, cause });
    this[_a44] = true;
    this.argument = argument;
  }
  static isInstance(error) {
    return AISDKError3.hasMarker(error, marker44);
  }
};
_a44 = symbol44;
var name44 = "AI_InvalidPromptError";
var marker54 = `vercel.ai.error.${name44}`;
var symbol54 = Symbol.for(marker54);
var _a54;
_a54 = symbol54;
var name54 = "AI_InvalidResponseDataError";
var marker64 = `vercel.ai.error.${name54}`;
var symbol64 = Symbol.for(marker64);
var _a64;
_a64 = symbol64;
var name64 = "AI_JSONParseError";
var marker74 = `vercel.ai.error.${name64}`;
var symbol74 = Symbol.for(marker74);
var _a74;
var JSONParseError3 = class extends AISDKError3 {
  static {
    __name(this, "JSONParseError");
  }
  constructor({ text: text4, cause }) {
    super({
      name: name64,
      message: `JSON parsing failed: Text: ${text4}.
Error message: ${getErrorMessage4(cause)}`,
      cause
    });
    this[_a74] = true;
    this.text = text4;
  }
  static isInstance(error) {
    return AISDKError3.hasMarker(error, marker74);
  }
};
_a74 = symbol74;
var name74 = "AI_LoadAPIKeyError";
var marker84 = `vercel.ai.error.${name74}`;
var symbol84 = Symbol.for(marker84);
var _a84;
var LoadAPIKeyError = class extends AISDKError3 {
  static {
    __name(this, "LoadAPIKeyError");
  }
  // used in isInstance
  constructor({ message }) {
    super({ name: name74, message });
    this[_a84] = true;
  }
  static isInstance(error) {
    return AISDKError3.hasMarker(error, marker84);
  }
};
_a84 = symbol84;
var name84 = "AI_LoadSettingError";
var marker94 = `vercel.ai.error.${name84}`;
var symbol94 = Symbol.for(marker94);
var _a94;
_a94 = symbol94;
var name94 = "AI_NoContentGeneratedError";
var marker104 = `vercel.ai.error.${name94}`;
var symbol104 = Symbol.for(marker104);
var _a104;
_a104 = symbol104;
var name104 = "AI_NoSuchModelError";
var marker114 = `vercel.ai.error.${name104}`;
var symbol114 = Symbol.for(marker114);
var _a114;
_a114 = symbol114;
var name114 = "AI_TooManyEmbeddingValuesForCallError";
var marker124 = `vercel.ai.error.${name114}`;
var symbol124 = Symbol.for(marker124);
var _a124;
var TooManyEmbeddingValuesForCallError = class extends AISDKError3 {
  static {
    __name(this, "TooManyEmbeddingValuesForCallError");
  }
  constructor(options) {
    super({
      name: name114,
      message: `Too many values for a single embedding call. The ${options.provider} model "${options.modelId}" can only embed up to ${options.maxEmbeddingsPerCall} values per call, but ${options.values.length} values were provided.`
    });
    this[_a124] = true;
    this.provider = options.provider;
    this.modelId = options.modelId;
    this.maxEmbeddingsPerCall = options.maxEmbeddingsPerCall;
    this.values = options.values;
  }
  static isInstance(error) {
    return AISDKError3.hasMarker(error, marker124);
  }
};
_a124 = symbol124;
var name124 = "AI_TypeValidationError";
var marker134 = `vercel.ai.error.${name124}`;
var symbol134 = Symbol.for(marker134);
var _a134;
var _TypeValidationError5 = class _TypeValidationError6 extends AISDKError3 {
  static {
    __name(this, "_TypeValidationError");
  }
  constructor({ value, cause }) {
    super({
      name: name124,
      message: `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage4(cause)}`,
      cause
    });
    this[_a134] = true;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError3.hasMarker(error, marker134);
  }
  /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */
  static wrap({
    value,
    cause
  }) {
    return _TypeValidationError6.isInstance(cause) && cause.value === value ? cause : new _TypeValidationError6({ value, cause });
  }
};
_a134 = symbol134;
var TypeValidationError3 = _TypeValidationError5;
var name134 = "AI_UnsupportedFunctionalityError";
var marker144 = `vercel.ai.error.${name134}`;
var symbol144 = Symbol.for(marker144);
var _a144;
var UnsupportedFunctionalityError = class extends AISDKError3 {
  static {
    __name(this, "UnsupportedFunctionalityError");
  }
  constructor({
    functionality,
    message = `'${functionality}' functionality not supported.`
  }) {
    super({ name: name134, message });
    this[_a144] = true;
    this.functionality = functionality;
  }
  static isInstance(error) {
    return AISDKError3.hasMarker(error, marker144);
  }
};
_a144 = symbol144;

// node_modules/@ai-sdk/provider-utils/dist/index.mjs
var import_secure_json_parse3 = __toESM(require_secure_json_parse(), 1);
function combineHeaders(...headers) {
  return headers.reduce(
    (combinedHeaders, currentHeaders) => ({
      ...combinedHeaders,
      ...currentHeaders != null ? currentHeaders : {}
    }),
    {}
  );
}
__name(combineHeaders, "combineHeaders");
function createEventSourceParserStream() {
  let buffer = "";
  let event = void 0;
  let data = [];
  let lastEventId = void 0;
  let retry = void 0;
  function parseLine(line2, controller) {
    if (line2 === "") {
      dispatchEvent(controller);
      return;
    }
    if (line2.startsWith(":")) {
      return;
    }
    const colonIndex = line2.indexOf(":");
    if (colonIndex === -1) {
      handleField(line2, "");
      return;
    }
    const field = line2.slice(0, colonIndex);
    const valueStart = colonIndex + 1;
    const value = valueStart < line2.length && line2[valueStart] === " " ? line2.slice(valueStart + 1) : line2.slice(valueStart);
    handleField(field, value);
  }
  __name(parseLine, "parseLine");
  function dispatchEvent(controller) {
    if (data.length > 0) {
      controller.enqueue({
        event,
        data: data.join("\n"),
        id: lastEventId,
        retry
      });
      data = [];
      event = void 0;
      retry = void 0;
    }
  }
  __name(dispatchEvent, "dispatchEvent");
  function handleField(field, value) {
    switch (field) {
      case "event":
        event = value;
        break;
      case "data":
        data.push(value);
        break;
      case "id":
        lastEventId = value;
        break;
      case "retry":
        const parsedRetry = parseInt(value, 10);
        if (!isNaN(parsedRetry)) {
          retry = parsedRetry;
        }
        break;
    }
  }
  __name(handleField, "handleField");
  return new TransformStream({
    transform(chunk, controller) {
      const { lines, incompleteLine } = splitLines(buffer, chunk);
      buffer = incompleteLine;
      for (let i3 = 0; i3 < lines.length; i3++) {
        parseLine(lines[i3], controller);
      }
    },
    flush(controller) {
      parseLine(buffer, controller);
      dispatchEvent(controller);
    }
  });
}
__name(createEventSourceParserStream, "createEventSourceParserStream");
function splitLines(buffer, chunk) {
  const lines = [];
  let currentLine = buffer;
  for (let i3 = 0; i3 < chunk.length; ) {
    const char2 = chunk[i3++];
    if (char2 === "\n") {
      lines.push(currentLine);
      currentLine = "";
    } else if (char2 === "\r") {
      lines.push(currentLine);
      currentLine = "";
      if (chunk[i3] === "\n") {
        i3++;
      }
    } else {
      currentLine += char2;
    }
  }
  return { lines, incompleteLine: currentLine };
}
__name(splitLines, "splitLines");
function extractResponseHeaders(response) {
  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}
__name(extractResponseHeaders, "extractResponseHeaders");
var createIdGenerator3 = /* @__PURE__ */ __name(({
  prefix,
  size: defaultSize = 16,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator = "-"
} = {}) => {
  const generator = customAlphabet(alphabet, defaultSize);
  if (prefix == null) {
    return generator;
  }
  if (alphabet.includes(separator)) {
    throw new InvalidArgumentError4({
      argument: "separator",
      message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
    });
  }
  return (size) => `${prefix}${separator}${generator(size)}`;
}, "createIdGenerator");
var generateId3 = createIdGenerator3();
function removeUndefinedEntries(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([_key, value]) => value != null)
  );
}
__name(removeUndefinedEntries, "removeUndefinedEntries");
function isAbortError2(error) {
  return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}
__name(isAbortError2, "isAbortError");
function loadApiKey({
  apiKey,
  environmentVariableName,
  apiKeyParameterName = "apiKey",
  description
}) {
  if (typeof apiKey === "string") {
    return apiKey;
  }
  if (apiKey != null) {
    throw new LoadAPIKeyError({
      message: `${description} API key must be a string.`
    });
  }
  if (typeof process === "undefined") {
    throw new LoadAPIKeyError({
      message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter. Environment variables is not supported in this environment.`
    });
  }
  apiKey = process.env[environmentVariableName];
  if (apiKey == null) {
    throw new LoadAPIKeyError({
      message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter or the ${environmentVariableName} environment variable.`
    });
  }
  if (typeof apiKey !== "string") {
    throw new LoadAPIKeyError({
      message: `${description} API key must be a string. The value of the ${environmentVariableName} environment variable is not a string.`
    });
  }
  return apiKey;
}
__name(loadApiKey, "loadApiKey");
var validatorSymbol3 = Symbol.for("vercel.ai.validator");
function validator3(validate) {
  return { [validatorSymbol3]: true, validate };
}
__name(validator3, "validator");
function isValidator3(value) {
  return typeof value === "object" && value !== null && validatorSymbol3 in value && value[validatorSymbol3] === true && "validate" in value;
}
__name(isValidator3, "isValidator");
function asValidator3(value) {
  return isValidator3(value) ? value : zodValidator3(value);
}
__name(asValidator3, "asValidator");
function zodValidator3(zodSchema2) {
  return validator3((value) => {
    const result = zodSchema2.safeParse(value);
    return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
  });
}
__name(zodValidator3, "zodValidator");
function validateTypes({
  value,
  schema: inputSchema
}) {
  const result = safeValidateTypes3({ value, schema: inputSchema });
  if (!result.success) {
    throw TypeValidationError3.wrap({ value, cause: result.error });
  }
  return result.value;
}
__name(validateTypes, "validateTypes");
function safeValidateTypes3({
  value,
  schema
}) {
  const validator22 = asValidator3(schema);
  try {
    if (validator22.validate == null) {
      return { success: true, value };
    }
    const result = validator22.validate(value);
    if (result.success) {
      return result;
    }
    return {
      success: false,
      error: TypeValidationError3.wrap({ value, cause: result.error })
    };
  } catch (error) {
    return {
      success: false,
      error: TypeValidationError3.wrap({ value, cause: error })
    };
  }
}
__name(safeValidateTypes3, "safeValidateTypes");
function parseJSON({
  text: text4,
  schema
}) {
  try {
    const value = import_secure_json_parse3.default.parse(text4);
    if (schema == null) {
      return value;
    }
    return validateTypes({ value, schema });
  } catch (error) {
    if (JSONParseError3.isInstance(error) || TypeValidationError3.isInstance(error)) {
      throw error;
    }
    throw new JSONParseError3({ text: text4, cause: error });
  }
}
__name(parseJSON, "parseJSON");
function safeParseJSON3({
  text: text4,
  schema
}) {
  try {
    const value = import_secure_json_parse3.default.parse(text4);
    if (schema == null) {
      return { success: true, value, rawValue: value };
    }
    const validationResult = safeValidateTypes3({ value, schema });
    return validationResult.success ? { ...validationResult, rawValue: value } : validationResult;
  } catch (error) {
    return {
      success: false,
      error: JSONParseError3.isInstance(error) ? error : new JSONParseError3({ text: text4, cause: error })
    };
  }
}
__name(safeParseJSON3, "safeParseJSON");
function parseProviderOptions({
  provider,
  providerOptions,
  schema
}) {
  if ((providerOptions == null ? void 0 : providerOptions[provider]) == null) {
    return void 0;
  }
  const parsedProviderOptions = safeValidateTypes3({
    value: providerOptions[provider],
    schema
  });
  if (!parsedProviderOptions.success) {
    throw new InvalidArgumentError4({
      argument: "providerOptions",
      message: `invalid ${provider} provider options`,
      cause: parsedProviderOptions.error
    });
  }
  return parsedProviderOptions.value;
}
__name(parseProviderOptions, "parseProviderOptions");
var getOriginalFetch2 = /* @__PURE__ */ __name(() => globalThis.fetch, "getOriginalFetch2");
var postJsonToApi = /* @__PURE__ */ __name(async ({
  url,
  headers,
  body,
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch: fetch2
}) => postToApi({
  url,
  headers: {
    "Content-Type": "application/json",
    ...headers
  },
  body: {
    content: JSON.stringify(body),
    values: body
  },
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch: fetch2
}), "postJsonToApi");
var postToApi = /* @__PURE__ */ __name(async ({
  url,
  headers = {},
  body,
  successfulResponseHandler,
  failedResponseHandler,
  abortSignal,
  fetch: fetch2 = getOriginalFetch2()
}) => {
  try {
    const response = await fetch2(url, {
      method: "POST",
      headers: removeUndefinedEntries(headers),
      body: body.content,
      signal: abortSignal
    });
    const responseHeaders = extractResponseHeaders(response);
    if (!response.ok) {
      let errorInformation;
      try {
        errorInformation = await failedResponseHandler({
          response,
          url,
          requestBodyValues: body.values
        });
      } catch (error) {
        if (isAbortError2(error) || APICallError2.isInstance(error)) {
          throw error;
        }
        throw new APICallError2({
          message: "Failed to process error response",
          cause: error,
          statusCode: response.status,
          url,
          responseHeaders,
          requestBodyValues: body.values
        });
      }
      throw errorInformation.value;
    }
    try {
      return await successfulResponseHandler({
        response,
        url,
        requestBodyValues: body.values
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAbortError2(error) || APICallError2.isInstance(error)) {
          throw error;
        }
      }
      throw new APICallError2({
        message: "Failed to process successful response",
        cause: error,
        statusCode: response.status,
        url,
        responseHeaders,
        requestBodyValues: body.values
      });
    }
  } catch (error) {
    if (isAbortError2(error)) {
      throw error;
    }
    if (error instanceof TypeError && error.message === "fetch failed") {
      const cause = error.cause;
      if (cause != null) {
        throw new APICallError2({
          message: `Cannot connect to API: ${cause.message}`,
          cause,
          url,
          requestBodyValues: body.values,
          isRetryable: true
          // retry when network error
        });
      }
    }
    throw error;
  }
}, "postToApi");
async function resolve(value) {
  if (typeof value === "function") {
    value = value();
  }
  return Promise.resolve(value);
}
__name(resolve, "resolve");
var createJsonErrorResponseHandler = /* @__PURE__ */ __name(({
  errorSchema,
  errorToMessage,
  isRetryable
}) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const responseHeaders = extractResponseHeaders(response);
  if (responseBody.trim() === "") {
    return {
      responseHeaders,
      value: new APICallError2({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
  try {
    const parsedError = parseJSON({
      text: responseBody,
      schema: errorSchema
    });
    return {
      responseHeaders,
      value: new APICallError2({
        message: errorToMessage(parsedError),
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        data: parsedError,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response, parsedError)
      })
    };
  } catch (parseError) {
    return {
      responseHeaders,
      value: new APICallError2({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
}, "createJsonErrorResponseHandler");
var createEventSourceResponseHandler = /* @__PURE__ */ __name((chunkSchema2) => async ({ response }) => {
  const responseHeaders = extractResponseHeaders(response);
  if (response.body == null) {
    throw new EmptyResponseBodyError({});
  }
  return {
    responseHeaders,
    value: response.body.pipeThrough(new TextDecoderStream()).pipeThrough(createEventSourceParserStream()).pipeThrough(
      new TransformStream({
        transform({ data }, controller) {
          if (data === "[DONE]") {
            return;
          }
          controller.enqueue(
            safeParseJSON3({
              text: data,
              schema: chunkSchema2
            })
          );
        }
      })
    )
  };
}, "createEventSourceResponseHandler");
var createJsonResponseHandler = /* @__PURE__ */ __name((responseSchema2) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const parsedResult = safeParseJSON3({
    text: responseBody,
    schema: responseSchema2
  });
  const responseHeaders = extractResponseHeaders(response);
  if (!parsedResult.success) {
    throw new APICallError2({
      message: "Invalid JSON response",
      cause: parsedResult.error,
      statusCode: response.status,
      responseHeaders,
      responseBody,
      url,
      requestBodyValues
    });
  }
  return {
    responseHeaders,
    value: parsedResult.value,
    rawValue: parsedResult.rawValue
  };
}, "createJsonResponseHandler");
var { btoa: btoa4, atob: atob4 } = globalThis;
function convertUint8ArrayToBase642(array) {
  let latin1string = "";
  for (let i3 = 0; i3 < array.length; i3++) {
    latin1string += String.fromCodePoint(array[i3]);
  }
  return btoa4(latin1string);
}
__name(convertUint8ArrayToBase642, "convertUint8ArrayToBase64");
function withoutTrailingSlash(url) {
  return url == null ? void 0 : url.replace(/\/$/, "");
}
__name(withoutTrailingSlash, "withoutTrailingSlash");

// node_modules/@ai-sdk/google/dist/index.mjs
function convertJSONSchemaToOpenAPISchema(jsonSchema2) {
  if (isEmptyObjectSchema(jsonSchema2)) {
    return void 0;
  }
  if (typeof jsonSchema2 === "boolean") {
    return { type: "boolean", properties: {} };
  }
  const {
    type,
    description,
    required,
    properties,
    items,
    allOf,
    anyOf,
    oneOf,
    format,
    const: constValue,
    minLength,
    enum: enumValues
  } = jsonSchema2;
  const result = {};
  if (description)
    result.description = description;
  if (required)
    result.required = required;
  if (format)
    result.format = format;
  if (constValue !== void 0) {
    result.enum = [constValue];
  }
  if (type) {
    if (Array.isArray(type)) {
      if (type.includes("null")) {
        result.type = type.filter((t) => t !== "null")[0];
        result.nullable = true;
      } else {
        result.type = type;
      }
    } else if (type === "null") {
      result.type = "null";
    } else {
      result.type = type;
    }
  }
  if (enumValues !== void 0) {
    result.enum = enumValues;
  }
  if (properties != null) {
    result.properties = Object.entries(properties).reduce(
      (acc, [key, value]) => {
        acc[key] = convertJSONSchemaToOpenAPISchema(value);
        return acc;
      },
      {}
    );
  }
  if (items) {
    result.items = Array.isArray(items) ? items.map(convertJSONSchemaToOpenAPISchema) : convertJSONSchemaToOpenAPISchema(items);
  }
  if (allOf) {
    result.allOf = allOf.map(convertJSONSchemaToOpenAPISchema);
  }
  if (anyOf) {
    if (anyOf.some(
      (schema) => typeof schema === "object" && (schema == null ? void 0 : schema.type) === "null"
    )) {
      const nonNullSchemas = anyOf.filter(
        (schema) => !(typeof schema === "object" && (schema == null ? void 0 : schema.type) === "null")
      );
      if (nonNullSchemas.length === 1) {
        const converted = convertJSONSchemaToOpenAPISchema(nonNullSchemas[0]);
        if (typeof converted === "object") {
          result.nullable = true;
          Object.assign(result, converted);
        }
      } else {
        result.anyOf = nonNullSchemas.map(convertJSONSchemaToOpenAPISchema);
        result.nullable = true;
      }
    } else {
      result.anyOf = anyOf.map(convertJSONSchemaToOpenAPISchema);
    }
  }
  if (oneOf) {
    result.oneOf = oneOf.map(convertJSONSchemaToOpenAPISchema);
  }
  if (minLength !== void 0) {
    result.minLength = minLength;
  }
  return result;
}
__name(convertJSONSchemaToOpenAPISchema, "convertJSONSchemaToOpenAPISchema");
function isEmptyObjectSchema(jsonSchema2) {
  return jsonSchema2 != null && typeof jsonSchema2 === "object" && jsonSchema2.type === "object" && (jsonSchema2.properties == null || Object.keys(jsonSchema2.properties).length === 0) && !jsonSchema2.additionalProperties;
}
__name(isEmptyObjectSchema, "isEmptyObjectSchema");
function convertToGoogleGenerativeAIMessages(prompt) {
  var _a18, _b;
  const systemInstructionParts = [];
  const contents = [];
  let systemMessagesAllowed = true;
  for (const { role, content } of prompt) {
    switch (role) {
      case "system": {
        if (!systemMessagesAllowed) {
          throw new UnsupportedFunctionalityError({
            functionality: "system messages are only supported at the beginning of the conversation"
          });
        }
        systemInstructionParts.push({ text: content });
        break;
      }
      case "user": {
        systemMessagesAllowed = false;
        const parts = [];
        for (const part of content) {
          switch (part.type) {
            case "text": {
              parts.push({ text: part.text });
              break;
            }
            case "image": {
              parts.push(
                part.image instanceof URL ? {
                  fileData: {
                    mimeType: (_a18 = part.mimeType) != null ? _a18 : "image/jpeg",
                    fileUri: part.image.toString()
                  }
                } : {
                  inlineData: {
                    mimeType: (_b = part.mimeType) != null ? _b : "image/jpeg",
                    data: convertUint8ArrayToBase642(part.image)
                  }
                }
              );
              break;
            }
            case "file": {
              parts.push(
                part.data instanceof URL ? {
                  fileData: {
                    mimeType: part.mimeType,
                    fileUri: part.data.toString()
                  }
                } : {
                  inlineData: {
                    mimeType: part.mimeType,
                    data: part.data
                  }
                }
              );
              break;
            }
          }
        }
        contents.push({ role: "user", parts });
        break;
      }
      case "assistant": {
        systemMessagesAllowed = false;
        contents.push({
          role: "model",
          parts: content.map((part) => {
            switch (part.type) {
              case "text": {
                return part.text.length === 0 ? void 0 : { text: part.text };
              }
              case "file": {
                if (part.mimeType !== "image/png") {
                  throw new UnsupportedFunctionalityError({
                    functionality: "Only PNG images are supported in assistant messages"
                  });
                }
                if (part.data instanceof URL) {
                  throw new UnsupportedFunctionalityError({
                    functionality: "File data URLs in assistant messages are not supported"
                  });
                }
                return {
                  inlineData: {
                    mimeType: part.mimeType,
                    data: part.data
                  }
                };
              }
              case "tool-call": {
                return {
                  functionCall: {
                    name: part.toolName,
                    args: part.args
                  }
                };
              }
            }
          }).filter((part) => part !== void 0)
        });
        break;
      }
      case "tool": {
        systemMessagesAllowed = false;
        contents.push({
          role: "user",
          parts: content.map((part) => ({
            functionResponse: {
              name: part.toolName,
              response: {
                name: part.toolName,
                content: part.result
              }
            }
          }))
        });
        break;
      }
    }
  }
  return {
    systemInstruction: systemInstructionParts.length > 0 ? { parts: systemInstructionParts } : void 0,
    contents
  };
}
__name(convertToGoogleGenerativeAIMessages, "convertToGoogleGenerativeAIMessages");
function getModelPath(modelId) {
  return modelId.includes("/") ? modelId : `models/${modelId}`;
}
__name(getModelPath, "getModelPath");
var googleErrorDataSchema = external_exports.object({
  error: external_exports.object({
    code: external_exports.number().nullable(),
    message: external_exports.string(),
    status: external_exports.string()
  })
});
var googleFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: googleErrorDataSchema,
  errorToMessage: /* @__PURE__ */ __name((data) => data.error.message, "errorToMessage")
});
function prepareTools(mode, useSearchGrounding, dynamicRetrievalConfig, modelId) {
  var _a18, _b;
  const tools = ((_a18 = mode.tools) == null ? void 0 : _a18.length) ? mode.tools : void 0;
  const toolWarnings = [];
  const isGemini2 = modelId.includes("gemini-2");
  const supportsDynamicRetrieval = modelId.includes("gemini-1.5-flash") && !modelId.includes("-8b");
  if (useSearchGrounding) {
    return {
      tools: isGemini2 ? { googleSearch: {} } : {
        googleSearchRetrieval: !supportsDynamicRetrieval || !dynamicRetrievalConfig ? {} : { dynamicRetrievalConfig }
      },
      toolConfig: void 0,
      toolWarnings
    };
  }
  if (tools == null) {
    return { tools: void 0, toolConfig: void 0, toolWarnings };
  }
  const functionDeclarations = [];
  for (const tool of tools) {
    if (tool.type === "provider-defined") {
      toolWarnings.push({ type: "unsupported-tool", tool });
    } else {
      functionDeclarations.push({
        name: tool.name,
        description: (_b = tool.description) != null ? _b : "",
        parameters: convertJSONSchemaToOpenAPISchema(tool.parameters)
      });
    }
  }
  const toolChoice = mode.toolChoice;
  if (toolChoice == null) {
    return {
      tools: { functionDeclarations },
      toolConfig: void 0,
      toolWarnings
    };
  }
  const type = toolChoice.type;
  switch (type) {
    case "auto":
      return {
        tools: { functionDeclarations },
        toolConfig: { functionCallingConfig: { mode: "AUTO" } },
        toolWarnings
      };
    case "none":
      return {
        tools: { functionDeclarations },
        toolConfig: { functionCallingConfig: { mode: "NONE" } },
        toolWarnings
      };
    case "required":
      return {
        tools: { functionDeclarations },
        toolConfig: { functionCallingConfig: { mode: "ANY" } },
        toolWarnings
      };
    case "tool":
      return {
        tools: { functionDeclarations },
        toolConfig: {
          functionCallingConfig: {
            mode: "ANY",
            allowedFunctionNames: [toolChoice.toolName]
          }
        },
        toolWarnings
      };
    default: {
      const _exhaustiveCheck = type;
      throw new UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}
__name(prepareTools, "prepareTools");
function mapGoogleGenerativeAIFinishReason({
  finishReason,
  hasToolCalls
}) {
  switch (finishReason) {
    case "STOP":
      return hasToolCalls ? "tool-calls" : "stop";
    case "MAX_TOKENS":
      return "length";
    case "IMAGE_SAFETY":
    case "RECITATION":
    case "SAFETY":
    case "BLOCKLIST":
    case "PROHIBITED_CONTENT":
    case "SPII":
      return "content-filter";
    case "FINISH_REASON_UNSPECIFIED":
    case "OTHER":
      return "other";
    case "MALFORMED_FUNCTION_CALL":
      return "error";
    default:
      return "unknown";
  }
}
__name(mapGoogleGenerativeAIFinishReason, "mapGoogleGenerativeAIFinishReason");
var GoogleGenerativeAILanguageModel = class {
  static {
    __name(this, "GoogleGenerativeAILanguageModel");
  }
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.defaultObjectGenerationMode = "json";
    this.supportsImageUrls = false;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get supportsStructuredOutputs() {
    var _a18;
    return (_a18 = this.settings.structuredOutputs) != null ? _a18 : true;
  }
  get provider() {
    return this.config.provider;
  }
  async getArgs({
    mode,
    prompt,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences,
    responseFormat,
    seed,
    providerMetadata
  }) {
    var _a18, _b, _c;
    const type = mode.type;
    const warnings = [];
    const googleOptions = parseProviderOptions({
      provider: "google",
      providerOptions: providerMetadata,
      schema: googleGenerativeAIProviderOptionsSchema
    });
    if (((_a18 = googleOptions == null ? void 0 : googleOptions.thinkingConfig) == null ? void 0 : _a18.includeThoughts) === true && !this.config.provider.startsWith("google.vertex.")) {
      warnings.push({
        type: "other",
        message: `The 'includeThoughts' option is only supported with the Google Vertex provider and might not be supported or could behave unexpectedly with the current Google provider (${this.config.provider}).`
      });
    }
    const generationConfig = {
      // standardized settings:
      maxOutputTokens: maxTokens,
      temperature,
      topK,
      topP,
      frequencyPenalty,
      presencePenalty,
      stopSequences,
      seed,
      // response format:
      responseMimeType: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? "application/json" : void 0,
      responseSchema: (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && // Google GenAI does not support all OpenAPI Schema features,
      // so this is needed as an escape hatch:
      this.supportsStructuredOutputs ? convertJSONSchemaToOpenAPISchema(responseFormat.schema) : void 0,
      ...this.settings.audioTimestamp && {
        audioTimestamp: this.settings.audioTimestamp
      },
      // provider options:
      responseModalities: googleOptions == null ? void 0 : googleOptions.responseModalities,
      thinkingConfig: googleOptions == null ? void 0 : googleOptions.thinkingConfig
    };
    const { contents, systemInstruction } = convertToGoogleGenerativeAIMessages(prompt);
    switch (type) {
      case "regular": {
        const { tools, toolConfig, toolWarnings } = prepareTools(
          mode,
          (_b = this.settings.useSearchGrounding) != null ? _b : false,
          this.settings.dynamicRetrievalConfig,
          this.modelId
        );
        return {
          args: {
            generationConfig,
            contents,
            systemInstruction,
            safetySettings: this.settings.safetySettings,
            tools,
            toolConfig,
            cachedContent: this.settings.cachedContent
          },
          warnings: [...warnings, ...toolWarnings]
        };
      }
      case "object-json": {
        return {
          args: {
            generationConfig: {
              ...generationConfig,
              responseMimeType: "application/json",
              responseSchema: mode.schema != null && // Google GenAI does not support all OpenAPI Schema features,
              // so this is needed as an escape hatch:
              this.supportsStructuredOutputs ? convertJSONSchemaToOpenAPISchema(mode.schema) : void 0
            },
            contents,
            systemInstruction,
            safetySettings: this.settings.safetySettings,
            cachedContent: this.settings.cachedContent
          },
          warnings
        };
      }
      case "object-tool": {
        return {
          args: {
            generationConfig,
            contents,
            systemInstruction,
            tools: {
              functionDeclarations: [
                {
                  name: mode.tool.name,
                  description: (_c = mode.tool.description) != null ? _c : "",
                  parameters: convertJSONSchemaToOpenAPISchema(
                    mode.tool.parameters
                  )
                }
              ]
            },
            toolConfig: { functionCallingConfig: { mode: "ANY" } },
            safetySettings: this.settings.safetySettings,
            cachedContent: this.settings.cachedContent
          },
          warnings
        };
      }
      default: {
        const _exhaustiveCheck = type;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  supportsUrl(url) {
    return this.config.isSupportedUrl(url);
  }
  async doGenerate(options) {
    var _a18, _b, _c, _d, _e;
    const { args, warnings } = await this.getArgs(options);
    const body = JSON.stringify(args);
    const mergedHeaders = combineHeaders(
      await resolve(this.config.headers),
      options.headers
    );
    const {
      responseHeaders,
      value: response,
      rawValue: rawResponse
    } = await postJsonToApi({
      url: `${this.config.baseURL}/${getModelPath(
        this.modelId
      )}:generateContent`,
      headers: mergedHeaders,
      body: args,
      failedResponseHandler: googleFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(responseSchema),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });
    const { contents: rawPrompt, ...rawSettings } = args;
    const candidate = response.candidates[0];
    const parts = candidate.content == null || typeof candidate.content !== "object" || !("parts" in candidate.content) ? [] : candidate.content.parts;
    const toolCalls = getToolCallsFromParts({
      parts,
      // Use candidateParts
      generateId: this.config.generateId
    });
    const usageMetadata = response.usageMetadata;
    return {
      text: getTextFromParts(parts),
      reasoning: getReasoningDetailsFromParts(parts),
      files: (_a18 = getInlineDataParts(parts)) == null ? void 0 : _a18.map((part) => ({
        data: part.inlineData.data,
        mimeType: part.inlineData.mimeType
      })),
      toolCalls,
      finishReason: mapGoogleGenerativeAIFinishReason({
        finishReason: candidate.finishReason,
        hasToolCalls: toolCalls != null && toolCalls.length > 0
      }),
      usage: {
        promptTokens: (_b = usageMetadata == null ? void 0 : usageMetadata.promptTokenCount) != null ? _b : NaN,
        completionTokens: (_c = usageMetadata == null ? void 0 : usageMetadata.candidatesTokenCount) != null ? _c : NaN
      },
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders, body: rawResponse },
      warnings,
      providerMetadata: {
        google: {
          groundingMetadata: (_d = candidate.groundingMetadata) != null ? _d : null,
          safetyRatings: (_e = candidate.safetyRatings) != null ? _e : null
        }
      },
      sources: extractSources({
        groundingMetadata: candidate.groundingMetadata,
        generateId: this.config.generateId
      }),
      request: { body }
    };
  }
  async doStream(options) {
    const { args, warnings } = await this.getArgs(options);
    const body = JSON.stringify(args);
    const headers = combineHeaders(
      await resolve(this.config.headers),
      options.headers
    );
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/${getModelPath(
        this.modelId
      )}:streamGenerateContent?alt=sse`,
      headers,
      body: args,
      failedResponseHandler: googleFailedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(chunkSchema),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch
    });
    const { contents: rawPrompt, ...rawSettings } = args;
    let finishReason = "unknown";
    let usage = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    let providerMetadata = void 0;
    const generateId22 = this.config.generateId;
    let hasToolCalls = false;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            var _a18, _b, _c, _d, _e, _f;
            if (!chunk.success) {
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            const usageMetadata = value.usageMetadata;
            if (usageMetadata != null) {
              usage = {
                promptTokens: (_a18 = usageMetadata.promptTokenCount) != null ? _a18 : NaN,
                completionTokens: (_b = usageMetadata.candidatesTokenCount) != null ? _b : NaN
              };
            }
            const candidate = (_c = value.candidates) == null ? void 0 : _c[0];
            if (candidate == null) {
              return;
            }
            const content = candidate.content;
            if (content != null) {
              const deltaText = getTextFromParts(content.parts);
              if (deltaText != null) {
                controller.enqueue({
                  type: "text-delta",
                  textDelta: deltaText
                });
              }
              const reasoningDeltaText = getReasoningDetailsFromParts(
                content.parts
              );
              if (reasoningDeltaText != null) {
                for (const part of reasoningDeltaText) {
                  controller.enqueue({
                    type: "reasoning",
                    textDelta: part.text
                  });
                }
              }
              const inlineDataParts = getInlineDataParts(content.parts);
              if (inlineDataParts != null) {
                for (const part of inlineDataParts) {
                  controller.enqueue({
                    type: "file",
                    mimeType: part.inlineData.mimeType,
                    data: part.inlineData.data
                  });
                }
              }
              const toolCallDeltas = getToolCallsFromParts({
                parts: content.parts,
                generateId: generateId22
              });
              if (toolCallDeltas != null) {
                for (const toolCall of toolCallDeltas) {
                  controller.enqueue({
                    type: "tool-call-delta",
                    toolCallType: "function",
                    toolCallId: toolCall.toolCallId,
                    toolName: toolCall.toolName,
                    argsTextDelta: toolCall.args
                  });
                  controller.enqueue({
                    type: "tool-call",
                    toolCallType: "function",
                    toolCallId: toolCall.toolCallId,
                    toolName: toolCall.toolName,
                    args: toolCall.args
                  });
                  hasToolCalls = true;
                }
              }
            }
            if (candidate.finishReason != null) {
              finishReason = mapGoogleGenerativeAIFinishReason({
                finishReason: candidate.finishReason,
                hasToolCalls
              });
              const sources = (_d = extractSources({
                groundingMetadata: candidate.groundingMetadata,
                generateId: generateId22
              })) != null ? _d : [];
              for (const source of sources) {
                controller.enqueue({ type: "source", source });
              }
              providerMetadata = {
                google: {
                  groundingMetadata: (_e = candidate.groundingMetadata) != null ? _e : null,
                  safetyRatings: (_f = candidate.safetyRatings) != null ? _f : null
                }
              };
            }
          },
          flush(controller) {
            controller.enqueue({
              type: "finish",
              finishReason,
              usage,
              providerMetadata
            });
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      warnings,
      request: { body }
    };
  }
};
function getToolCallsFromParts({
  parts,
  generateId: generateId22
}) {
  const functionCallParts = parts == null ? void 0 : parts.filter(
    (part) => "functionCall" in part
  );
  return functionCallParts == null || functionCallParts.length === 0 ? void 0 : functionCallParts.map((part) => ({
    toolCallType: "function",
    toolCallId: generateId22(),
    toolName: part.functionCall.name,
    args: JSON.stringify(part.functionCall.args)
  }));
}
__name(getToolCallsFromParts, "getToolCallsFromParts");
function getTextFromParts(parts) {
  const textParts = parts == null ? void 0 : parts.filter(
    (part) => "text" in part && part.thought !== true
  );
  return textParts == null || textParts.length === 0 ? void 0 : textParts.map((part) => part.text).join("");
}
__name(getTextFromParts, "getTextFromParts");
function getReasoningDetailsFromParts(parts) {
  const reasoningParts = parts == null ? void 0 : parts.filter(
    (part) => "text" in part && part.thought === true && part.text != null
  );
  return reasoningParts == null || reasoningParts.length === 0 ? void 0 : reasoningParts.map((part) => ({ type: "text", text: part.text }));
}
__name(getReasoningDetailsFromParts, "getReasoningDetailsFromParts");
function getInlineDataParts(parts) {
  return parts == null ? void 0 : parts.filter(
    (part) => "inlineData" in part
  );
}
__name(getInlineDataParts, "getInlineDataParts");
function extractSources({
  groundingMetadata,
  generateId: generateId22
}) {
  var _a18;
  return (_a18 = groundingMetadata == null ? void 0 : groundingMetadata.groundingChunks) == null ? void 0 : _a18.filter(
    (chunk) => chunk.web != null
  ).map((chunk) => ({
    sourceType: "url",
    id: generateId22(),
    url: chunk.web.uri,
    title: chunk.web.title
  }));
}
__name(extractSources, "extractSources");
var contentSchema = external_exports.object({
  parts: external_exports.array(
    external_exports.union([
      // note: order matters since text can be fully empty
      external_exports.object({
        functionCall: external_exports.object({
          name: external_exports.string(),
          args: external_exports.unknown()
        })
      }),
      external_exports.object({
        inlineData: external_exports.object({
          mimeType: external_exports.string(),
          data: external_exports.string()
        })
      }),
      external_exports.object({
        text: external_exports.string().nullish(),
        thought: external_exports.boolean().nullish()
      })
    ])
  ).nullish()
});
var groundingChunkSchema = external_exports.object({
  web: external_exports.object({ uri: external_exports.string(), title: external_exports.string() }).nullish(),
  retrievedContext: external_exports.object({ uri: external_exports.string(), title: external_exports.string() }).nullish()
});
var groundingMetadataSchema = external_exports.object({
  webSearchQueries: external_exports.array(external_exports.string()).nullish(),
  retrievalQueries: external_exports.array(external_exports.string()).nullish(),
  searchEntryPoint: external_exports.object({ renderedContent: external_exports.string() }).nullish(),
  groundingChunks: external_exports.array(groundingChunkSchema).nullish(),
  groundingSupports: external_exports.array(
    external_exports.object({
      segment: external_exports.object({
        startIndex: external_exports.number().nullish(),
        endIndex: external_exports.number().nullish(),
        text: external_exports.string().nullish()
      }),
      segment_text: external_exports.string().nullish(),
      groundingChunkIndices: external_exports.array(external_exports.number()).nullish(),
      supportChunkIndices: external_exports.array(external_exports.number()).nullish(),
      confidenceScores: external_exports.array(external_exports.number()).nullish(),
      confidenceScore: external_exports.array(external_exports.number()).nullish()
    })
  ).nullish(),
  retrievalMetadata: external_exports.union([
    external_exports.object({
      webDynamicRetrievalScore: external_exports.number()
    }),
    external_exports.object({})
  ]).nullish()
});
var safetyRatingSchema = external_exports.object({
  category: external_exports.string().nullish(),
  probability: external_exports.string().nullish(),
  probabilityScore: external_exports.number().nullish(),
  severity: external_exports.string().nullish(),
  severityScore: external_exports.number().nullish(),
  blocked: external_exports.boolean().nullish()
});
var responseSchema = external_exports.object({
  candidates: external_exports.array(
    external_exports.object({
      content: contentSchema.nullish().or(external_exports.object({}).strict()),
      finishReason: external_exports.string().nullish(),
      safetyRatings: external_exports.array(safetyRatingSchema).nullish(),
      groundingMetadata: groundingMetadataSchema.nullish()
    })
  ),
  usageMetadata: external_exports.object({
    promptTokenCount: external_exports.number().nullish(),
    candidatesTokenCount: external_exports.number().nullish(),
    totalTokenCount: external_exports.number().nullish()
  }).nullish()
});
var chunkSchema = external_exports.object({
  candidates: external_exports.array(
    external_exports.object({
      content: contentSchema.nullish(),
      finishReason: external_exports.string().nullish(),
      safetyRatings: external_exports.array(safetyRatingSchema).nullish(),
      groundingMetadata: groundingMetadataSchema.nullish()
    })
  ).nullish(),
  usageMetadata: external_exports.object({
    promptTokenCount: external_exports.number().nullish(),
    candidatesTokenCount: external_exports.number().nullish(),
    totalTokenCount: external_exports.number().nullish()
  }).nullish()
});
var googleGenerativeAIProviderOptionsSchema = external_exports.object({
  responseModalities: external_exports.array(external_exports.enum(["TEXT", "IMAGE"])).nullish(),
  thinkingConfig: external_exports.object({
    thinkingBudget: external_exports.number().nullish(),
    includeThoughts: external_exports.boolean().nullish()
  }).nullish()
});
var GoogleGenerativeAIEmbeddingModel = class {
  static {
    __name(this, "GoogleGenerativeAIEmbeddingModel");
  }
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  get maxEmbeddingsPerCall() {
    return 2048;
  }
  get supportsParallelCalls() {
    return true;
  }
  async doEmbed({
    values,
    headers,
    abortSignal
  }) {
    if (values.length > this.maxEmbeddingsPerCall) {
      throw new TooManyEmbeddingValuesForCallError({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values
      });
    }
    const mergedHeaders = combineHeaders(
      await resolve(this.config.headers),
      headers
    );
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/models/${this.modelId}:batchEmbedContents`,
      headers: mergedHeaders,
      body: {
        requests: values.map((value) => ({
          model: `models/${this.modelId}`,
          content: { role: "user", parts: [{ text: value }] },
          outputDimensionality: this.settings.outputDimensionality,
          taskType: this.settings.taskType
        }))
      },
      failedResponseHandler: googleFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        googleGenerativeAITextEmbeddingResponseSchema
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      embeddings: response.embeddings.map((item) => item.values),
      usage: void 0,
      rawResponse: { headers: responseHeaders }
    };
  }
};
var googleGenerativeAITextEmbeddingResponseSchema = external_exports.object({
  embeddings: external_exports.array(external_exports.object({ values: external_exports.array(external_exports.number()) }))
});
function isSupportedFileUrl(url) {
  return url.toString().startsWith("https://generativelanguage.googleapis.com/v1beta/files/");
}
__name(isSupportedFileUrl, "isSupportedFileUrl");
function createGoogleGenerativeAI(options = {}) {
  var _a18;
  const baseURL = (_a18 = withoutTrailingSlash(options.baseURL)) != null ? _a18 : "https://generativelanguage.googleapis.com/v1beta";
  const getHeaders2 = /* @__PURE__ */ __name(() => ({
    "x-goog-api-key": loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: "GOOGLE_GENERATIVE_AI_API_KEY",
      description: "Google Generative AI"
    }),
    ...options.headers
  }), "getHeaders");
  const createChatModel = /* @__PURE__ */ __name((modelId, settings = {}) => {
    var _a25;
    return new GoogleGenerativeAILanguageModel(modelId, settings, {
      provider: "google.generative-ai",
      baseURL,
      headers: getHeaders2,
      generateId: (_a25 = options.generateId) != null ? _a25 : generateId3,
      isSupportedUrl: isSupportedFileUrl,
      fetch: options.fetch
    });
  }, "createChatModel");
  const createEmbeddingModel = /* @__PURE__ */ __name((modelId, settings = {}) => new GoogleGenerativeAIEmbeddingModel(modelId, settings, {
    provider: "google.generative-ai",
    baseURL,
    headers: getHeaders2,
    fetch: options.fetch
  }), "createEmbeddingModel");
  const provider = /* @__PURE__ */ __name(function(modelId, settings) {
    if (new.target) {
      throw new Error(
        "The Google Generative AI model function cannot be called with the new keyword."
      );
    }
    return createChatModel(modelId, settings);
  }, "provider");
  provider.languageModel = createChatModel;
  provider.chat = createChatModel;
  provider.generativeAI = createChatModel;
  provider.embedding = createEmbeddingModel;
  provider.textEmbedding = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  return provider;
}
__name(createGoogleGenerativeAI, "createGoogleGenerativeAI");
var google = createGoogleGenerativeAI();

// packages/core/src/ia/index.ts
var IA;
((IA2) => {
  const google2 = createGoogleGenerativeAI({
    apiKey: Config.GEMINI_API_KEY
  });
  async function generateClothe(instructions) {
    const prompt = `
Genera un nuevo art\xEDculo de ropa basado en las siguientes instrucciones en espa\xF1ol.
La salida debe ser un objeto JSON v\xE1lido que coincida exactamente con el modelo Clothe.
No incluyas texto adicional ni explicaciones, solo JSON.

Campos:
- name (string)
- Barcode (string, \xFAnico)
- category (string)
- size (string)
- color (string)
- material (string)
- quantity (number)
- image (string, siempre debe ser esta URL: "https://www.anahuac.mx/mexico/sites/default/files/noticias/Los-colores-que-utilizamos-en-la-ropa-dicen-como-somos.jpg")
- status (string)
- costPrice (number)
- sellingPrice (number)

Instrucciones: ${instructions}

Formato de salida (solo JSON, sin markdown ni comentarios):
{
  "name": "string",
  "codeqr": "string",
  "category": "string",
  "size": "string",
  "color": "string",
  "material": "string",
  "quantity": 0,
  "image": "https://www.anahuac.mx/mexico/sites/default/files/noticias/Los-colores-que-utilizamos-en-la-ropa-dicen-como-somos.jpg",
  "status": "string",
  "costPrice": 0,
  "sellingPrice": 0
}
`;
    const result = await generateText({
      model: google2("gemini-1.5-flash"),
      prompt,
      maxTokens: 4e3
    });
    const cleanedText = result.text.replace(/```json\s*|\s*```/g, "").trim();
    const jsonResult = JSON.parse(cleanedText);
    jsonResult.image = "https://www.anahuac.mx/mexico/sites/default/files/noticias/Los-colores-que-utilizamos-en-la-ropa-dicen-como-somos.jpg";
    const clothe = Clothe.InfoSchema.omit({ id: true }).parse(jsonResult);
    const clotheId = await Clothe.create(clothe);
    return clothe.name;
  }
  IA2.generateClothe = generateClothe;
  __name(generateClothe, "generateClothe");
})(IA || (IA = {}));

// node_modules/hono-openapi/utils.js
var e = Symbol("openapi");
async function s(e3, s3) {
  const n2 = await s3, o2 = {};
  if ("form" === e3 || "json" === e3) {
    const s4 = "json" === e3 ? "application/json" : "multipart/form-data";
    o2.requestBody && "content" in o2.requestBody && o2.requestBody.content ? o2.requestBody.content[s4] = { schema: n2.schema } : o2.requestBody = { content: { [s4]: { schema: n2.schema } } };
  } else {
    const s4 = [];
    if ("$ref" in n2.schema) s4.push({ in: e3, name: n2.schema.$ref, schema: n2.schema });
    else for (const [o3, t] of Object.entries(n2.schema.properties ?? {})) s4.push({ in: e3, name: o3, schema: t, required: n2.schema.required?.includes(o3) });
    o2.parameters = s4;
  }
  return { docs: o2, components: n2.components };
}
__name(s, "s");

// node_modules/hono/dist/http-exception.js
var HTTPException = class extends Error {
  static {
    __name(this, "HTTPException");
  }
  res;
  status;
  constructor(status = 500, options) {
    super(options?.message, { cause: options?.cause });
    this.res = options?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      const newResponse = new Response(this.res.body, {
        status: this.status,
        headers: this.res.headers
      });
      return newResponse;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};

// node_modules/hono-openapi/index.js
var n = ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD", "PATCH", "TRACE"];
var s2 = /* @__PURE__ */ __name((e3) => e3.charAt(0).toUpperCase() + e3.slice(1), "s");
var o = /* @__PURE__ */ new Map();
var a2 = /* @__PURE__ */ __name((e3, t) => {
  const n2 = `${e3}:${t}`;
  if (o.has(n2)) return o.get(n2);
  let a3 = e3;
  if ("/" === t) return `${a3}Index`;
  for (const e4 of t.split("/")) 123 === e4.charCodeAt(0) ? a3 += `By${s2(e4.slice(1, -1))}` : a3 += s2(e4);
  return o.set(n2, a3), a3;
}, "a");
var r = /* @__PURE__ */ new Map();
function c(e3, t, n2) {
  return e3 && t in e3 ? e3[t] ?? n2 : n2;
}
__name(c, "c");
function i(...e3) {
  return e3.reduce((e4, t) => {
    if (!t) return e4;
    let n2;
    return ("tags" in e4 && e4.tags || "tags" in t && t.tags) && (n2 = Array.from(/* @__PURE__ */ new Set([...c(e4, "tags", []), ...c(t, "tags", [])]))), { ...e4, ...t, tags: n2, responses: { ...c(e4, "responses", {}), ...c(t, "responses", {}) }, parameters: m2(e4.parameters, t.parameters) };
  }, {});
}
__name(i, "i");
function p2({ path: e3, method: t, data: n2, schema: s3 }) {
  e3 = ((e4) => e4.split("/").map((e5) => {
    let t2 = e5;
    if (t2.startsWith(":")) {
      const e6 = t2.match(/^:([^{?]+)(?:{(.+)})?(\?)?$/);
      e6 ? t2 = `{${e6[1]}}` : (t2 = t2.slice(1, t2.length), t2.endsWith("?") && (t2 = t2.slice(0, -1)), t2 = `{${t2}}`);
    }
    return t2;
  }).join("/"))(e3);
  const o2 = t.toLowerCase();
  if ("all" === o2) {
    if (!n2) return;
    if (r.has(e3)) {
      const t2 = r.get(e3) ?? {};
      r.set(e3, { ...t2, ...n2, parameters: m2(t2.parameters, n2.parameters) });
    } else r.set(e3, n2);
  } else {
    const t2 = function(e4) {
      const t3 = Array.from(r.keys());
      let n3 = {};
      for (const s4 of t3) e4.match(s4) && (n3 = i(n3, r.get(s4) ?? {}));
      return n3;
    }(e3);
    s3[e3] = { ...s3[e3] ? s3[e3] : {}, [o2]: { responses: {}, operationId: a2(o2, e3), ...i(t2, s3[e3]?.[o2], n2) } };
  }
}
__name(p2, "p");
var f = /* @__PURE__ */ __name((e3) => "$ref" in e3 ? e3.$ref : `${e3.in} ${e3.name}`, "f");
function m2(...e3) {
  const t = e3.flatMap((e4) => e4 ?? []).reduce((e4, t2) => (e4.set(f(t2), t2), e4), /* @__PURE__ */ new Map());
  return Array.from(t.values());
}
__name(m2, "m");
function l(e3, { excludeStaticFile: t = true, exclude: n2 = [] }) {
  const s3 = {}, o2 = Array.isArray(n2) ? n2 : [n2];
  for (const [n3, a3] of Object.entries(e3)) if (!o2.some((e4) => "string" == typeof e4 ? n3 === e4 : e4.test(n3)) && (!n3.includes("*") || n3.includes("{")) && (!t || (!n3.includes(".") || n3.includes("{")))) {
    for (const e4 of Object.keys(a3)) {
      const t2 = a3[e4];
      if (n3.includes("{")) {
        t2.parameters || (t2.parameters = []);
        const e5 = n3.split("/").filter((e6) => e6.startsWith("{") && !t2.parameters.find((t3) => "path" === t3.in && t3.name === e6.slice(1, e6.length - 1)));
        for (const n4 of e5) {
          const e6 = n4.slice(1, n4.length - 1), s4 = t2.parameters.findIndex((t3) => "param" === t3.in && t3.name === e6);
          -1 !== s4 ? t2.parameters[s4].in = "path" : t2.parameters.push({ schema: { type: "string" }, in: "path", name: e6, required: true });
        }
      }
      t2.responses || (t2.responses = { 200: {} });
    }
    s3[n3] = a3;
  }
  return s3;
}
__name(l, "l");
var u = { documentation: {}, excludeStaticFile: true, exclude: [], excludeMethods: ["OPTIONS"], excludeTags: [] };
var d2 = { version: "3.1.0", components: {} };
function h(e3, t) {
  const n2 = { version: "3.1.0", components: {} };
  let s3;
  return async (o2) => (s3 || (s3 = await y(e3, t, n2, o2)), o2.json(s3));
}
__name(h, "h");
async function y(t, s3 = u, o2 = d2, a3) {
  const r2 = { ...u, ...s3 }, c2 = { ...d2, ...o2 }, i3 = r2.documentation ?? {}, f2 = await async function(t2, s4, o3) {
    const a4 = {};
    for (const r3 of t2.routes) {
      if (!(e in r3.handler)) {
        s4.includeEmptyPaths && p2({ method: r3.method, path: r3.path, schema: a4 });
        continue;
      }
      if (s4.excludeMethods.includes(r3.method)) continue;
      if (false === n.includes(r3.method) && "ALL" !== r3.method) continue;
      const { resolver: t3, metadata: c3 = {} } = r3.handler[e], i4 = s4.defaultOptions?.[r3.method], { docs: f3, components: m3 } = await t3({ ...o3, ...c3 }, i4);
      o3.components = { ...o3.components, ...m3 ?? {} }, p2({ method: r3.method, path: r3.path, data: f3, schema: a4 });
    }
    return a4;
  }(t, r2, c2);
  for (const e3 in f2) for (const t2 in f2[e3]) {
    const n2 = f2[e3][t2]?.hide;
    if (n2) {
      let s4 = false;
      "boolean" == typeof n2 ? s4 = n2 : "function" == typeof n2 && (a3 ? s4 = n2(a3) : console.warn(`'c' is not defined, cannot evaluate hide function for ${t2} ${e3}`)), s4 && delete f2[e3][t2];
    }
  }
  return { openapi: c2.version, ...{ ...i3, tags: i3.tags?.filter((e3) => !r2.excludeTags?.includes(e3?.name)), info: { title: "Hono Documentation", description: "Development documentation", version: "0.0.0", ...i3.info }, paths: { ...l(f2, r2), ...i3.paths }, components: { ...i3.components, schemas: { ...c2.components, ...i3.components?.schemas } } } };
}
__name(y, "y");
function w(n2) {
  const { validateResponse: s3, ...o2 } = n2;
  return Object.assign(async (e3, o3) => {
    if (await o3(), s3 && n2.responses) {
      const o4 = e3.res.status, a3 = e3.res.headers.get("content-type");
      if (o4 && a3) {
        const r2 = n2.responses[o4];
        if (r2 && "content" in r2 && r2.content) {
          const n3 = a3.split(";")[0], o5 = r2.content[n3];
          if (o5?.schema && "validator" in o5.schema) try {
            let t;
            const s4 = e3.res.clone();
            if ("application/json" === n3 ? t = await s4.json() : "text/plain" === n3 && (t = await s4.text()), !t) throw new Error("No data to validate!");
            await o5.schema.validator(t);
          } catch (e4) {
            let n4 = { status: 500, message: "Response validation failed!" };
            throw "object" == typeof s3 && (n4 = { ...n4, ...s3 }), new HTTPException(n4.status, { message: n4.message, cause: e4 });
          }
        }
      }
    }
  }, { [e]: { resolver: /* @__PURE__ */ __name((e3, t) => x2(e3, o2, t), "resolver") } });
}
__name(w, "w");
async function x2(e3, t, n2 = {}) {
  let s3 = {};
  const o2 = { ...n2, ...t, responses: { ...n2?.responses, ...t.responses } };
  if (o2.responses) for (const t2 of Object.keys(o2.responses)) {
    const n3 = o2.responses[t2];
    if (n3 && "content" in n3) for (const t3 of Object.keys(n3.content ?? {})) {
      const o3 = n3.content?.[t3];
      if (o3 && (o3.schema && "builder" in o3.schema)) {
        const t4 = await o3.schema.builder(e3);
        o3.schema = t4.schema, t4.components && (s3 = { ...s3, ...t4.components });
      }
    }
  }
  return { docs: o2, components: s3 };
}
__name(x2, "x");

// node_modules/hono/dist/utils/cookie.js
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse = /* @__PURE__ */ __name((cookie, name18) => {
  if (name18 && cookie.indexOf(name18) === -1) {
    return {};
  }
  const pairs = cookie.trim().split(";");
  const parsedCookie = {};
  for (let pairStr of pairs) {
    pairStr = pairStr.trim();
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = pairStr.substring(0, valueStartPos).trim();
    if (name18 && name18 !== cookieName || !validCookieNameRegEx.test(cookieName)) {
      continue;
    }
    let cookieValue = pairStr.substring(valueStartPos + 1).trim();
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = cookieValue.indexOf("%") !== -1 ? tryDecode(cookieValue, decodeURIComponent_) : cookieValue;
      if (name18) {
        break;
      }
    }
  }
  return parsedCookie;
}, "parse");

// node_modules/hono/dist/helper/cookie/index.js
var getCookie = /* @__PURE__ */ __name((c2, key, prefix) => {
  const cookie = c2.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
}, "getCookie");

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = /* @__PURE__ */ __name((arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      "Content-Type": contentType
    }
  });
  return response.formData();
}, "bufferToFormData");

// node_modules/hono/dist/validator/validator.js
var jsonRegex = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/;
var multipartRegex = /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/;
var urlencodedRegex = /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/;
var validator4 = /* @__PURE__ */ __name((target, validationFunc) => {
  return async (c2, next) => {
    let value = {};
    const contentType = c2.req.header("Content-Type");
    switch (target) {
      case "json":
        if (!contentType || !jsonRegex.test(contentType)) {
          break;
        }
        try {
          value = await c2.req.json();
        } catch {
          const message = "Malformed JSON in request body";
          throw new HTTPException(400, { message });
        }
        break;
      case "form": {
        if (!contentType || !(multipartRegex.test(contentType) || urlencodedRegex.test(contentType))) {
          break;
        }
        let formData;
        if (c2.req.bodyCache.formData) {
          formData = await c2.req.bodyCache.formData;
        } else {
          try {
            const arrayBuffer = await c2.req.arrayBuffer();
            formData = await bufferToFormData(arrayBuffer, contentType);
            c2.req.bodyCache.formData = formData;
          } catch (e3) {
            let message = "Malformed FormData request.";
            message += e3 instanceof Error ? ` ${e3.message}` : ` ${String(e3)}`;
            throw new HTTPException(400, { message });
          }
        }
        const form = {};
        formData.forEach((value2, key) => {
          if (key.endsWith("[]")) {
            ;
            (form[key] ??= []).push(value2);
          } else if (Array.isArray(form[key])) {
            ;
            form[key].push(value2);
          } else if (key in form) {
            form[key] = [form[key], value2];
          } else {
            form[key] = value2;
          }
        });
        value = form;
        break;
      }
      case "query":
        value = Object.fromEntries(
          Object.entries(c2.req.queries()).map(([k, v2]) => {
            return v2.length === 1 ? [k, v2[0]] : [k, v2];
          })
        );
        break;
      case "param":
        value = c2.req.param();
        break;
      case "header":
        value = c2.req.header();
        break;
      case "cookie":
        value = getCookie(c2);
        break;
    }
    const res = await validationFunc(value, c2);
    if (res instanceof Response) {
      return res;
    }
    c2.req.addValidatedData(target, res);
    await next();
  };
}, "validator");

// node_modules/@hono/zod-validator/dist/index.js
var zValidator = /* @__PURE__ */ __name((target, schema, hook) => (
  // @ts-expect-error not typed well
  validator4(target, async (value, c2) => {
    let validatorValue = value;
    if (target === "header" && schema instanceof ZodObject) {
      const schemaKeys = Object.keys(schema.shape);
      const caseInsensitiveKeymap = Object.fromEntries(
        schemaKeys.map((key) => [key.toLowerCase(), key])
      );
      validatorValue = Object.fromEntries(
        Object.entries(value).map(([key, value2]) => [caseInsensitiveKeymap[key] || key, value2])
      );
    }
    const result = await schema.safeParseAsync(validatorValue);
    if (hook) {
      const hookResult = await hook({ data: validatorValue, ...result, target }, c2);
      if (hookResult) {
        if (hookResult instanceof Response) {
          return hookResult;
        }
        if ("response" in hookResult) {
          return hookResult.response;
        }
      }
    }
    if (!result.success) {
      return c2.json(result, 400);
    }
    return result.data;
  })
), "zValidator");

// node_modules/zod-openapi/dist/components.chunk.mjs
var isZodType = /* @__PURE__ */ __name((zodType, typeName) => {
  var _a18;
  return ((_a18 = zodType == null ? void 0 : zodType._def) == null ? void 0 : _a18.typeName) === typeName;
}, "isZodType");
var isAnyZodType = /* @__PURE__ */ __name((zodType) => {
  var _a18;
  return Boolean(
    (_a18 = zodType == null ? void 0 : zodType._def) == null ? void 0 : _a18.typeName
  );
}, "isAnyZodType");
var openApiVersions = [
  "3.0.0",
  "3.0.1",
  "3.0.2",
  "3.0.3",
  "3.1.0"
];
var satisfiesVersion = /* @__PURE__ */ __name((test, against) => openApiVersions.indexOf(test) >= openApiVersions.indexOf(against), "satisfiesVersion");
var createDescriptionMetadata = /* @__PURE__ */ __name((schema, description, state) => {
  if (satisfiesVersion(state.components.openapi, "3.1.0")) {
    return {
      type: "ref",
      schema: {
        $ref: schema.schema.$ref,
        description
      },
      zodType: schema.zodType,
      effects: schema.effects,
      schemaObject: schema.schemaObject
    };
  }
  return {
    type: "schema",
    schema: {
      description,
      allOf: [schema.schema]
    },
    effects: schema.effects
  };
}, "createDescriptionMetadata");
var isValueEqual = /* @__PURE__ */ __name((value, previous) => {
  if (typeof value !== typeof previous) {
    return false;
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value === previous;
  }
  if (Array.isArray(value) && Array.isArray(previous)) {
    const sorted = [...value].sort();
    const previousSorted = [...previous].sort();
    return sorted.every((v2, i3) => isValueEqual(v2, previousSorted[i3]));
  }
  if (value === null || previous === null) {
    return value === previous;
  }
  if (typeof value === "object" && typeof previous === "object") {
    const keys = Object.keys(value);
    return keys.every(
      (key) => isValueEqual(
        value[key],
        previous[key]
      )
    );
  }
  return value === previous;
}, "isValueEqual");
var enhanceWithMetadata = /* @__PURE__ */ __name((schema, metadata, state, previous) => {
  const values = Object.entries(metadata).reduce(
    (acc, [key, value]) => {
      if (value === void 0) {
        return acc;
      }
      acc[key] = value;
      return acc;
    },
    {}
  );
  const length = Object.values(values).length;
  if (schema.type === "ref") {
    if (length === 0) {
      return schema;
    }
    if (length === 1 && metadata.description) {
      return createDescriptionMetadata(schema, metadata.description, state);
    }
    return {
      type: "schema",
      schema: {
        allOf: [schema.schema],
        ...metadata
      },
      effects: schema.effects
    };
  }
  if (previous && schema.schema.type !== "object") {
    const diff = Object.entries({ ...schema.schema, ...values }).reduce(
      (acc, [key, value]) => {
        if (previous.schemaObject && isValueEqual(
          previous.schemaObject[key],
          value
        )) {
          return acc;
        }
        acc[key] = value;
        return acc;
      },
      {}
    );
    const diffLength = Object.values(diff).length;
    if (diffLength === 0) {
      return {
        type: "ref",
        schema: {
          $ref: previous.schema.$ref
        },
        effects: schema.effects,
        schemaObject: previous.schemaObject,
        zodType: previous.zodType
      };
    }
    if (diffLength === 1 && typeof diff.description === "string") {
      return createDescriptionMetadata(previous, diff.description, state);
    }
    return {
      type: "schema",
      schema: { allOf: [previous.schema], ...diff },
      effects: schema.effects
    };
  }
  return {
    type: "schema",
    schema: {
      ...schema.schema,
      ...metadata
    },
    effects: schema.effects
  };
}, "enhanceWithMetadata");
var createArraySchema = /* @__PURE__ */ __name((zodArray, state) => {
  var _a18, _b, _c, _d;
  const zodType = zodArray._def.type;
  const minItems = ((_a18 = zodArray._def.exactLength) == null ? void 0 : _a18.value) ?? ((_b = zodArray._def.minLength) == null ? void 0 : _b.value);
  const maxItems = ((_c = zodArray._def.exactLength) == null ? void 0 : _c.value) ?? ((_d = zodArray._def.maxLength) == null ? void 0 : _d.value);
  const items = createSchemaObject(zodType, state, ["array items"]);
  return {
    type: "schema",
    schema: {
      type: "array",
      items: items.schema,
      ...minItems !== void 0 && { minItems },
      ...maxItems !== void 0 && { maxItems }
    },
    effects: items.effects
  };
}, "createArraySchema");
var createBigIntSchema = /* @__PURE__ */ __name((_zodBigInt) => ({
  type: "schema",
  schema: {
    type: "integer",
    format: "int64"
  }
}), "createBigIntSchema");
var createBooleanSchema = /* @__PURE__ */ __name((_zodBoolean) => ({
  type: "schema",
  schema: {
    type: "boolean"
  }
}), "createBooleanSchema");
var createBrandedSchema = /* @__PURE__ */ __name((zodBranded, state) => createSchemaObject(zodBranded._def.type, state, ["brand"]), "createBrandedSchema");
var createCatchSchema = /* @__PURE__ */ __name((zodCatch, state, previous) => {
  const schemaObject = createSchemaObject(zodCatch._def.innerType, state, [
    "default"
  ]);
  const catchResult = zodCatch.safeParse(void 0);
  const maybeDefaultValue = catchResult.success ? {
    default: catchResult.data
  } : {};
  return enhanceWithMetadata(schemaObject, maybeDefaultValue, state, previous);
}, "createCatchSchema");
var createDateSchema = /* @__PURE__ */ __name((_zodDate, state) => {
  var _a18;
  return {
    type: "schema",
    schema: ((_a18 = state.documentOptions) == null ? void 0 : _a18.defaultDateSchema) ?? {
      type: "string"
    }
  };
}, "createDateSchema");
var createDefaultSchema = /* @__PURE__ */ __name((zodDefault, state, previous) => {
  const schemaObject = createSchemaObject(zodDefault._def.innerType, state, [
    "default"
  ]);
  return enhanceWithMetadata(
    schemaObject,
    {
      default: zodDefault._def.defaultValue()
    },
    state,
    previous
  );
}, "createDefaultSchema");
var createNativeEnumSchema = /* @__PURE__ */ __name((zodEnum, state) => {
  const enumValues = getValidEnumValues(zodEnum._def.values);
  const { numbers, strings } = sortStringsAndNumbers(enumValues);
  if (strings.length && numbers.length) {
    if (satisfiesVersion(state.components.openapi, "3.1.0")) {
      return {
        type: "schema",
        schema: {
          type: ["string", "number"],
          enum: [...strings, ...numbers]
        }
      };
    }
    return {
      type: "schema",
      schema: {
        oneOf: [
          { type: "string", enum: strings },
          { type: "number", enum: numbers }
        ]
      }
    };
  }
  if (strings.length) {
    return {
      type: "schema",
      schema: {
        type: "string",
        enum: strings
      }
    };
  }
  return {
    type: "schema",
    schema: {
      type: "number",
      enum: numbers
    }
  };
}, "createNativeEnumSchema");
var getValidEnumValues = /* @__PURE__ */ __name((enumValues) => {
  const keys = Object.keys(enumValues).filter(
    (key) => typeof enumValues[enumValues[key]] !== "number"
  );
  return keys.map((key) => enumValues[key]);
}, "getValidEnumValues");
var sortStringsAndNumbers = /* @__PURE__ */ __name((values) => ({
  strings: values.filter((value) => typeof value === "string"),
  numbers: values.filter((value) => typeof value === "number")
}), "sortStringsAndNumbers");
var createTransformSchema = /* @__PURE__ */ __name((zodTransform, state) => {
  var _a18, _b, _c, _d, _e, _f;
  if (((_b = (_a18 = zodTransform._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.effectType) === "output") {
    return {
      type: "schema",
      schema: createManualOutputTransformSchema(zodTransform, state)
    };
  }
  if (((_d = (_c = zodTransform._def.zodOpenApi) == null ? void 0 : _c.openapi) == null ? void 0 : _d.effectType) === "input" || ((_f = (_e = zodTransform._def.zodOpenApi) == null ? void 0 : _e.openapi) == null ? void 0 : _f.effectType) === "same") {
    return createSchemaObject(zodTransform._def.schema, state, [
      "transform input"
    ]);
  }
  if (state.type === "output") {
    return {
      type: "schema",
      schema: createManualOutputTransformSchema(zodTransform, state)
    };
  }
  const schema = createSchemaObject(zodTransform._def.schema, state, [
    "transform input"
  ]);
  return {
    ...schema,
    effects: flattenEffects([
      [
        {
          type: "schema",
          creationType: "input",
          zodType: zodTransform,
          path: [...state.path]
        }
      ],
      schema.effects
    ])
  };
}, "createTransformSchema");
var createManualOutputTransformSchema = /* @__PURE__ */ __name((zodTransform, state) => {
  var _a18, _b, _c;
  if (!((_b = (_a18 = zodTransform._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.type)) {
    const zodType = zodTransform.constructor.name;
    const schemaName = `${zodType} - ${zodTransform._def.effect.type}`;
    throw new Error(
      `Failed to determine a type for ${schemaName} at ${state.path.join(
        " > "
      )}. Please change the 'effectType' to 'same' or 'input', wrap it in a ZodPipeline or assign it a manual 'type'.`
    );
  }
  return {
    type: (_c = zodTransform._def.zodOpenApi) == null ? void 0 : _c.openapi.type
  };
}, "createManualOutputTransformSchema");
var getZodTypeName = /* @__PURE__ */ __name((zodType) => {
  if (isZodType(zodType, "ZodEffects")) {
    return `${zodType._def.typeName} - ${zodType._def.effect.type}`;
  }
  return zodType._def.typeName;
}, "getZodTypeName");
var throwTransformError = /* @__PURE__ */ __name((effect) => {
  const typeName = getZodTypeName(effect.zodType);
  const input = effect.creationType;
  const opposite = input === "input" ? "output" : "input";
  throw new Error(
    `The ${typeName} at ${effect.path.join(
      " > "
    )} is used within a registered compoment schema${effect.component ? ` (${effect.component.ref})` : ""} and contains an ${input} transformation${effect.component ? ` (${getZodTypeName(
      effect.component.zodType
    )}) defined at ${effect.component.path.join(" > ")}` : ""} which is also used in an ${opposite} schema.

This may cause the schema to render incorrectly and is most likely a mistake. You can resolve this by:

1. Setting an \`effectType\` on one of the transformations to \`same\` (Not applicable for ZodDefault), \`input\` or \`output\` eg. \`.openapi({type: 'same'})\`
2. Wrapping the transformation in a ZodPipeline
3. Assigning a manual type to the transformation eg. \`.openapi({type: 'string'})\`
4. Removing the transformation
5. Deregister the component containing the transformation`
  );
}, "throwTransformError");
var resolveSingleEffect = /* @__PURE__ */ __name((effect, state) => {
  if (effect.type === "schema") {
    return {
      creationType: effect.creationType,
      path: effect.path,
      zodType: effect.zodType
    };
  }
  if (effect.type === "component") {
    if (state.visited.has(effect.zodType)) {
      return;
    }
    const component = state.components.schemas.get(effect.zodType);
    if ((component == null ? void 0 : component.type) !== "complete") {
      throw new Error("Something went wrong, component schema is not complete");
    }
    if (component.resolvedEffect) {
      return {
        creationType: component.resolvedEffect.creationType,
        path: effect.path,
        zodType: effect.zodType,
        component: {
          ref: component.ref,
          zodType: component.resolvedEffect.zodType,
          path: component.resolvedEffect.path
        }
      };
    }
    if (!component.effects) {
      return void 0;
    }
    state.visited.add(effect.zodType);
    const resolved = resolveEffect(component.effects, state);
    state.visited.delete(effect.zodType);
    if (!resolved) {
      return void 0;
    }
    component.resolvedEffect = resolved;
    return resolved;
  }
  return void 0;
}, "resolveSingleEffect");
var resolveEffect = /* @__PURE__ */ __name((effects, state) => {
  const { input, output } = effects.reduce(
    (acc, effect) => {
      const resolvedSchemaEffect = resolveSingleEffect(effect, state);
      if ((resolvedSchemaEffect == null ? void 0 : resolvedSchemaEffect.creationType) === "input") {
        acc.input.push(resolvedSchemaEffect);
      }
      if ((resolvedSchemaEffect == null ? void 0 : resolvedSchemaEffect.creationType) === "output") {
        acc.output.push(resolvedSchemaEffect);
      }
      if (resolvedSchemaEffect && acc.input.length > 1 && acc.output.length > 1) {
        throwTransformError(resolvedSchemaEffect);
      }
      return acc;
    },
    { input: [], output: [] }
  );
  if (input.length > 0) {
    return input[0];
  }
  if (output.length > 0) {
    return output[0];
  }
  return void 0;
}, "resolveEffect");
var verifyEffects = /* @__PURE__ */ __name((effects, state) => {
  const resolved = resolveEffect(effects, state);
  if ((resolved == null ? void 0 : resolved.creationType) && resolved.creationType !== state.type) {
    throwTransformError(resolved);
  }
}, "verifyEffects");
var flattenEffects = /* @__PURE__ */ __name((effects) => {
  const allEffects = effects.reduce((acc, effect) => {
    if (effect) {
      return acc.concat(effect);
    }
    return acc;
  }, []);
  return allEffects.length ? allEffects : void 0;
}, "flattenEffects");
var createDiscriminatedUnionSchema = /* @__PURE__ */ __name((zodDiscriminatedUnion, state) => {
  const options = zodDiscriminatedUnion.options;
  const schemas = options.map(
    (option, index) => createSchemaObject(option, state, [`discriminated union option ${index}`])
  );
  const schemaObjects = schemas.map((schema) => schema.schema);
  const discriminator = mapDiscriminator(
    schemaObjects,
    options,
    zodDiscriminatedUnion.discriminator,
    state
  );
  return {
    type: "schema",
    schema: {
      oneOf: schemaObjects,
      ...discriminator && { discriminator }
    },
    effects: flattenEffects(schemas.map((schema) => schema.effects))
  };
}, "createDiscriminatedUnionSchema");
var unwrapLiterals = /* @__PURE__ */ __name((zodType, state) => {
  if (isZodType(zodType, "ZodLiteral")) {
    if (typeof zodType._def.value !== "string") {
      return void 0;
    }
    return [zodType._def.value];
  }
  if (isZodType(zodType, "ZodNativeEnum")) {
    const schema = createNativeEnumSchema(zodType, state);
    if (schema.type === "schema" && schema.schema.type === "string") {
      return schema.schema.enum;
    }
  }
  if (isZodType(zodType, "ZodEnum")) {
    return zodType._def.values;
  }
  if (isZodType(zodType, "ZodBranded")) {
    return unwrapLiterals(zodType._def.type, state);
  }
  if (isZodType(zodType, "ZodReadonly")) {
    return unwrapLiterals(zodType._def.innerType, state);
  }
  if (isZodType(zodType, "ZodCatch")) {
    return unwrapLiterals(zodType._def.innerType, state);
  }
  return void 0;
}, "unwrapLiterals");
var mapDiscriminator = /* @__PURE__ */ __name((schemas, zodObjects, discriminator, state) => {
  var _a18;
  if (typeof discriminator !== "string") {
    return void 0;
  }
  const mapping = {};
  for (const [index, zodObject] of zodObjects.entries()) {
    const schema = schemas[index];
    const componentSchemaRef = "$ref" in schema ? schema == null ? void 0 : schema.$ref : void 0;
    if (!componentSchemaRef) {
      if ((_a18 = state.documentOptions) == null ? void 0 : _a18.enforceDiscriminatedUnionComponents) {
        throw new Error(
          `Discriminated Union member ${index} at ${state.path.join(" > ")} is not registered as a component`
        );
      }
      return void 0;
    }
    const value = zodObject.shape[discriminator];
    const literals = unwrapLiterals(value, state);
    if (!literals) {
      return void 0;
    }
    for (const enumValue of literals) {
      mapping[enumValue] = componentSchemaRef;
    }
  }
  return {
    propertyName: discriminator,
    mapping
  };
}, "mapDiscriminator");
var createEnumSchema = /* @__PURE__ */ __name((zodEnum) => ({
  type: "schema",
  schema: {
    type: "string",
    enum: zodEnum._def.values
  }
}), "createEnumSchema");
var createIntersectionSchema = /* @__PURE__ */ __name((zodIntersection, state) => {
  const schemas = flattenIntersection(zodIntersection);
  const allOfs = schemas.map(
    (schema, index) => createSchemaObject(schema, state, [`intersection ${index}`])
  );
  return {
    type: "schema",
    schema: {
      allOf: allOfs.map((schema) => schema.schema)
    },
    effects: flattenEffects(allOfs.map((schema) => schema.effects))
  };
}, "createIntersectionSchema");
var flattenIntersection = /* @__PURE__ */ __name((zodType) => {
  if (!isZodType(zodType, "ZodIntersection")) {
    return [zodType];
  }
  const leftSchemas = flattenIntersection(zodType._def.left);
  const rightSchemas = flattenIntersection(zodType._def.right);
  return [...leftSchemas, ...rightSchemas];
}, "flattenIntersection");
var createLazySchema = /* @__PURE__ */ __name((zodLazy, state) => {
  const innerSchema = zodLazy._def.getter();
  return createSchemaObject(innerSchema, state, ["lazy schema"]);
}, "createLazySchema");
var createNullSchema = /* @__PURE__ */ __name(() => ({
  type: "schema",
  schema: {
    type: "null"
  }
}), "createNullSchema");
var createLiteralSchema = /* @__PURE__ */ __name((zodLiteral, state) => {
  if (zodLiteral.value === null) {
    return createNullSchema();
  }
  if (satisfiesVersion(state.components.openapi, "3.1.0")) {
    return {
      type: "schema",
      schema: {
        type: typeof zodLiteral.value,
        const: zodLiteral.value
      }
    };
  }
  return {
    type: "schema",
    schema: {
      type: typeof zodLiteral.value,
      enum: [zodLiteral.value]
    }
  };
}, "createLiteralSchema");
var createManualTypeSchema = /* @__PURE__ */ __name((zodSchema2, state) => {
  var _a18, _b, _c;
  if (!((_b = (_a18 = zodSchema2._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.type)) {
    const schemaName = zodSchema2.constructor.name;
    throw new Error(
      `Unknown schema ${schemaName} at ${state.path.join(
        " > "
      )}. Please assign it a manual 'type'.`
    );
  }
  return {
    type: "schema",
    schema: {
      type: (_c = zodSchema2._def.zodOpenApi) == null ? void 0 : _c.openapi.type
    }
  };
}, "createManualTypeSchema");
var createNullableSchema = /* @__PURE__ */ __name((zodNullable, state) => {
  const schemaObject = createSchemaObject(zodNullable.unwrap(), state, [
    "nullable"
  ]);
  if (satisfiesVersion(state.components.openapi, "3.1.0")) {
    if (schemaObject.type === "ref" || schemaObject.schema.allOf) {
      return {
        type: "schema",
        schema: {
          oneOf: mapNullOf([schemaObject.schema], state.components.openapi)
        },
        effects: schemaObject.effects
      };
    }
    if (schemaObject.schema.oneOf) {
      const { oneOf, ...schema3 } = schemaObject.schema;
      return {
        type: "schema",
        schema: {
          oneOf: mapNullOf(oneOf, state.components.openapi),
          ...schema3
        },
        effects: schemaObject.effects
      };
    }
    if (schemaObject.schema.anyOf) {
      const { anyOf, ...schema3 } = schemaObject.schema;
      return {
        type: "schema",
        schema: {
          anyOf: mapNullOf(anyOf, state.components.openapi),
          ...schema3
        },
        effects: schemaObject.effects
      };
    }
    const { type: type2, const: schemaConst, ...schema2 } = schemaObject.schema;
    if (schemaConst) {
      return {
        type: "schema",
        schema: {
          type: mapNullType(type2),
          enum: [schemaConst, null],
          ...schema2
        },
        effects: schemaObject.effects
      };
    }
    return {
      type: "schema",
      schema: {
        type: mapNullType(type2),
        ...schema2,
        // https://github.com/json-schema-org/json-schema-spec/issues/258
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...schema2.enum && { enum: [...schema2.enum, null] }
      },
      effects: schemaObject.effects
    };
  }
  if (schemaObject.type === "ref") {
    return {
      type: "schema",
      schema: {
        allOf: [schemaObject.schema],
        nullable: true
      },
      effects: schemaObject.effects
    };
  }
  const { type, ...schema } = schemaObject.schema;
  return {
    type: "schema",
    schema: {
      ...type && { type },
      nullable: true,
      ...schema,
      // https://github.com/OAI/OpenAPI-Specification/blob/main/proposals/2019-10-31-Clarify-Nullable.md#if-a-schema-specifies-nullable-true-and-enum-1-2-3-does-that-schema-allow-null-values-see-1900
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...schema.enum && { enum: [...schema.enum, null] }
    },
    effects: schemaObject.effects
  };
}, "createNullableSchema");
var mapNullType = /* @__PURE__ */ __name((type) => {
  if (!type) {
    return "null";
  }
  if (Array.isArray(type)) {
    return [...type, "null"];
  }
  return [type, "null"];
}, "mapNullType");
var mapNullOf = /* @__PURE__ */ __name((ofSchema, openapi) => {
  if (satisfiesVersion(openapi, "3.1.0")) {
    return [...ofSchema, { type: "null" }];
  }
  return [...ofSchema, { nullable: true }];
}, "mapNullOf");
var createNumberSchema = /* @__PURE__ */ __name((zodNumber, state) => {
  const zodNumberChecks = getZodNumberChecks(zodNumber);
  const minimum = mapMinimum(zodNumberChecks, state.components.openapi);
  const maximum = mapMaximum(zodNumberChecks, state.components.openapi);
  const multipleOf = mapMultipleOf(zodNumberChecks);
  return {
    type: "schema",
    schema: {
      type: mapNumberType(zodNumberChecks),
      ...multipleOf && multipleOf,
      ...minimum && minimum,
      // Union types are not easy to tame
      ...maximum && maximum
    }
  };
}, "createNumberSchema");
var mapMultipleOf = /* @__PURE__ */ __name((zodNumberCheck) => zodNumberCheck.multipleOf ? { multipleOf: zodNumberCheck.multipleOf.value } : void 0, "mapMultipleOf");
var mapMaximum = /* @__PURE__ */ __name((zodNumberCheck, openapi) => {
  if (!zodNumberCheck.max) {
    return void 0;
  }
  const maximum = zodNumberCheck.max.value;
  if (zodNumberCheck.max.inclusive) {
    return { ...maximum !== void 0 && { maximum } };
  }
  if (satisfiesVersion(openapi, "3.1.0")) {
    return { exclusiveMaximum: maximum };
  }
  return { maximum, exclusiveMaximum: true };
}, "mapMaximum");
var mapMinimum = /* @__PURE__ */ __name((zodNumberCheck, openapi) => {
  if (!zodNumberCheck.min) {
    return void 0;
  }
  const minimum = zodNumberCheck.min.value;
  if (zodNumberCheck.min.inclusive) {
    return { ...minimum !== void 0 && { minimum } };
  }
  if (satisfiesVersion(openapi, "3.1.0")) {
    return { exclusiveMinimum: minimum };
  }
  return { minimum, exclusiveMinimum: true };
}, "mapMinimum");
var getZodNumberChecks = /* @__PURE__ */ __name((zodNumber) => zodNumber._def.checks.reduce((acc, check) => {
  acc[check.kind] = check;
  return acc;
}, {}), "getZodNumberChecks");
var mapNumberType = /* @__PURE__ */ __name((zodNumberChecks) => zodNumberChecks.int ? "integer" : "number", "mapNumberType");
var createOptionalSchema = /* @__PURE__ */ __name((zodOptional, state) => createSchemaObject(zodOptional.unwrap(), state, ["optional"]), "createOptionalSchema");
var isOptionalObjectKey = /* @__PURE__ */ __name((zodSchema2) => isZodType(zodSchema2, "ZodNever") || isZodType(zodSchema2, "ZodUndefined") || isZodType(zodSchema2, "ZodLiteral") && zodSchema2._def.value === void 0, "isOptionalObjectKey");
var createObjectSchema = /* @__PURE__ */ __name((zodObject, previous, state) => {
  const extendedSchema = createExtendedSchema(
    zodObject,
    previous == null ? void 0 : previous.zodType,
    state
  );
  if (extendedSchema) {
    return extendedSchema;
  }
  return createObjectSchemaFromShape(
    zodObject.shape,
    {
      unknownKeys: zodObject._def.unknownKeys,
      catchAll: zodObject._def.catchall
    },
    state
  );
}, "createObjectSchema");
var createExtendedSchema = /* @__PURE__ */ __name((zodObject, baseZodObject, state) => {
  var _a18, _b, _c, _d, _e;
  if (!baseZodObject) {
    return void 0;
  }
  const component = state.components.schemas.get(baseZodObject);
  if (component ?? ((_b = (_a18 = baseZodObject._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.ref)) {
    createSchemaObject(baseZodObject, state, ["extended schema"]);
  }
  const completeComponent = state.components.schemas.get(baseZodObject);
  if (!completeComponent) {
    return void 0;
  }
  const diffOpts = createDiffOpts(
    {
      unknownKeys: baseZodObject._def.unknownKeys,
      catchAll: baseZodObject._def.catchall
    },
    {
      unknownKeys: zodObject._def.unknownKeys,
      catchAll: zodObject._def.catchall
    }
  );
  if (!diffOpts) {
    return void 0;
  }
  const diffShape = createShapeDiff(
    baseZodObject._def.shape(),
    zodObject._def.shape()
  );
  if (!diffShape) {
    return void 0;
  }
  const extendedSchema = createObjectSchemaFromShape(
    diffShape,
    diffOpts,
    state,
    true
  );
  const schemaLength = Object.keys(extendedSchema.schema).length;
  const effects = flattenEffects([
    completeComponent.type === "complete" ? completeComponent.effects : [],
    completeComponent.type === "in-progress" ? [
      {
        type: "component",
        zodType: zodObject,
        path: [...state.path]
      }
    ] : [],
    extendedSchema.effects
  ]);
  if (schemaLength === 0) {
    return {
      type: "ref",
      schema: {
        $ref: createComponentSchemaRef(
          completeComponent.ref,
          (_c = state.documentOptions) == null ? void 0 : _c.componentRefPath
        )
      },
      schemaObject: completeComponent.type === "complete" ? completeComponent.schemaObject : void 0,
      zodType: zodObject,
      effects
    };
  }
  if (schemaLength === 1 && extendedSchema.schema.description) {
    return createDescriptionMetadata(
      {
        type: "ref",
        schema: {
          $ref: createComponentSchemaRef(
            completeComponent.ref,
            (_d = state.documentOptions) == null ? void 0 : _d.componentRefPath
          )
        },
        schemaObject: completeComponent.type === "complete" ? completeComponent.schemaObject : void 0,
        zodType: zodObject,
        effects
      },
      extendedSchema.schema.description,
      state
    );
  }
  return {
    type: "schema",
    schema: {
      allOf: [
        {
          $ref: createComponentSchemaRef(
            completeComponent.ref,
            (_e = state.documentOptions) == null ? void 0 : _e.componentRefPath
          )
        }
      ],
      ...extendedSchema.schema
    },
    effects: flattenEffects([
      completeComponent.type === "complete" ? completeComponent.effects : [],
      completeComponent.type === "in-progress" ? [
        {
          type: "component",
          zodType: zodObject,
          path: [...state.path]
        }
      ] : [],
      extendedSchema.effects
    ])
  };
}, "createExtendedSchema");
var createDiffOpts = /* @__PURE__ */ __name((baseOpts, extendedOpts) => {
  if (baseOpts.unknownKeys === "strict" || !isZodType(baseOpts.catchAll, "ZodNever")) {
    return void 0;
  }
  return {
    catchAll: extendedOpts.catchAll,
    unknownKeys: extendedOpts.unknownKeys
  };
}, "createDiffOpts");
var createShapeDiff = /* @__PURE__ */ __name((baseObj, extendedObj) => {
  const acc = {};
  for (const [key, val] of Object.entries(extendedObj)) {
    const baseValue = baseObj[key];
    if (val === baseValue) {
      continue;
    }
    if (baseValue === void 0) {
      acc[key] = extendedObj[key];
      continue;
    }
    return null;
  }
  return acc;
}, "createShapeDiff");
var mapAdditionalProperties = /* @__PURE__ */ __name(({ unknownKeys, catchAll }, state) => {
  if (!isZodType(catchAll, "ZodNever")) {
    return createSchemaObject(catchAll, state, ["additional properties"]);
  }
  if (unknownKeys === "strict") {
    return false;
  }
  if (unknownKeys === "passthrough") {
    return true;
  }
  return void 0;
}, "mapAdditionalProperties");
var createObjectSchemaFromShape = /* @__PURE__ */ __name((shape, { unknownKeys, catchAll }, state, omitType) => {
  const properties = mapProperties(shape, state);
  const required = mapRequired(properties, shape, state);
  const additionalProperties = mapAdditionalProperties(
    { catchAll, unknownKeys },
    state
  );
  return {
    type: "schema",
    schema: {
      ...!omitType && { type: "object" },
      ...properties && { properties: properties.properties },
      ...(required == null ? void 0 : required.required.length) && { required: required.required },
      ...additionalProperties !== void 0 && {
        additionalProperties: typeof additionalProperties === "object" ? additionalProperties.schema : additionalProperties
      }
    },
    effects: flattenEffects([
      ...(properties == null ? void 0 : properties.effects) ?? [],
      typeof additionalProperties === "object" && (additionalProperties == null ? void 0 : additionalProperties.effects),
      required == null ? void 0 : required.effects
    ])
  };
}, "createObjectSchemaFromShape");
var mapRequired = /* @__PURE__ */ __name((properties, shape, state) => {
  if (!properties) {
    return void 0;
  }
  const { required, effects } = Object.entries(properties.schemas).reduce(
    (acc, [key, schemaOrRef]) => {
      const zodSchema2 = shape[key];
      if (!zodSchema2) {
        throw new Error("Property somehow doesn't exist in shape");
      }
      const result = zodSchema2.safeParse(void 0);
      if (!result.success) {
        acc.required.push(key);
        return acc;
      }
      if (result.data !== void 0) {
        const baseEffect = {
          zodType: zodSchema2,
          path: [...state.path, `property: ${key}`]
        };
        const effect = schemaOrRef.type === "ref" ? {
          ...baseEffect,
          type: "component"
        } : {
          ...baseEffect,
          type: "schema",
          creationType: state.type
        };
        acc.effects.push(effect);
        if (state.type === "output") {
          acc.required.push(key);
        }
      }
      return acc;
    },
    {
      required: [],
      effects: []
    }
  );
  return { required, effects };
}, "mapRequired");
var mapProperties = /* @__PURE__ */ __name((shape, state) => {
  const shapeEntries = Object.entries(shape);
  if (!shapeEntries.length) {
    return void 0;
  }
  return shapeEntries.reduce(
    (acc, [key, zodSchema2]) => {
      if (isOptionalObjectKey(zodSchema2)) {
        return acc;
      }
      const schema = createSchemaObject(zodSchema2, state, [`property: ${key}`]);
      acc.schemas[key] = schema;
      acc.properties[key] = schema.schema;
      acc.effects.push(schema.effects);
      return acc;
    },
    {
      schemas: {},
      properties: {},
      effects: []
    }
  );
}, "mapProperties");
var createPipelineSchema = /* @__PURE__ */ __name((zodPipeline, state) => {
  var _a18, _b, _c, _d, _e, _f;
  if (((_b = (_a18 = zodPipeline._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.effectType) === "input" || ((_d = (_c = zodPipeline._def.zodOpenApi) == null ? void 0 : _c.openapi) == null ? void 0 : _d.effectType) === "same") {
    return createSchemaObject(zodPipeline._def.in, state, ["pipeline input"]);
  }
  if (((_f = (_e = zodPipeline._def.zodOpenApi) == null ? void 0 : _e.openapi) == null ? void 0 : _f.effectType) === "output") {
    return createSchemaObject(zodPipeline._def.out, state, ["pipeline output"]);
  }
  if (state.type === "input") {
    const schema2 = createSchemaObject(zodPipeline._def.in, state, [
      "pipeline input"
    ]);
    return {
      ...schema2,
      effects: flattenEffects([
        [
          {
            type: "schema",
            creationType: "input",
            path: [...state.path],
            zodType: zodPipeline
          }
        ],
        schema2.effects
      ])
    };
  }
  const schema = createSchemaObject(zodPipeline._def.out, state, [
    "pipeline output"
  ]);
  return {
    ...schema,
    effects: flattenEffects([
      [
        {
          type: "schema",
          creationType: "output",
          path: [...state.path],
          zodType: zodPipeline
        }
      ],
      schema.effects
    ])
  };
}, "createPipelineSchema");
var createPreprocessSchema = /* @__PURE__ */ __name((zodPreprocess, state) => createSchemaObject(zodPreprocess._def.schema, state, ["preprocess schema"]), "createPreprocessSchema");
var createReadonlySchema = /* @__PURE__ */ __name((zodReadonly, state) => (
  // Readonly doesn't change OpenAPI schema
  createSchemaObject(zodReadonly._def.innerType, state, ["readonly"])
), "createReadonlySchema");
var createRecordSchema = /* @__PURE__ */ __name((zodRecord, state) => {
  const additionalProperties = createSchemaObject(
    zodRecord.valueSchema,
    state,
    ["record value"]
  );
  const keySchema = createSchemaObject(zodRecord.keySchema, state, [
    "record key"
  ]);
  const maybeComponent = state.components.schemas.get(zodRecord.keySchema);
  const isComplete = maybeComponent && maybeComponent.type === "complete";
  const maybeSchema = isComplete && maybeComponent.schemaObject;
  const maybeEffects = isComplete && maybeComponent.effects || void 0;
  const renderedKeySchema = maybeSchema || keySchema.schema;
  if ("enum" in renderedKeySchema && renderedKeySchema.enum) {
    return {
      type: "schema",
      schema: {
        type: "object",
        properties: renderedKeySchema.enum.reduce((acc, key) => {
          acc[key] = additionalProperties.schema;
          return acc;
        }, {}),
        additionalProperties: false
      },
      effects: flattenEffects([
        keySchema.effects,
        additionalProperties.effects,
        maybeEffects
      ])
    };
  }
  if (satisfiesVersion(state.components.openapi, "3.1.0") && "type" in renderedKeySchema && renderedKeySchema.type === "string" && Object.keys(renderedKeySchema).length > 1) {
    return {
      type: "schema",
      schema: {
        type: "object",
        propertyNames: keySchema.schema,
        additionalProperties: additionalProperties.schema
      },
      effects: flattenEffects([
        keySchema.effects,
        additionalProperties.effects
      ])
    };
  }
  return {
    type: "schema",
    schema: {
      type: "object",
      additionalProperties: additionalProperties.schema
    },
    effects: additionalProperties.effects
  };
}, "createRecordSchema");
var createRefineSchema = /* @__PURE__ */ __name((zodRefine, state) => createSchemaObject(zodRefine._def.schema, state, ["refine schema"]), "createRefineSchema");
var createSetSchema = /* @__PURE__ */ __name((zodSet, state) => {
  var _a18, _b;
  const schema = zodSet._def.valueType;
  const minItems = (_a18 = zodSet._def.minSize) == null ? void 0 : _a18.value;
  const maxItems = (_b = zodSet._def.maxSize) == null ? void 0 : _b.value;
  const itemSchema = createSchemaObject(schema, state, ["set items"]);
  return {
    type: "schema",
    schema: {
      type: "array",
      items: itemSchema.schema,
      uniqueItems: true,
      ...minItems !== void 0 && { minItems },
      ...maxItems !== void 0 && { maxItems }
    },
    effects: itemSchema.effects
  };
}, "createSetSchema");
var createStringSchema = /* @__PURE__ */ __name((zodString, state) => {
  var _a18, _b, _c, _d, _e, _f, _g, _h;
  const zodStringChecks = getZodStringChecks(zodString);
  const format = mapStringFormat(zodStringChecks);
  const patterns = mapPatterns(zodStringChecks);
  const minLength = ((_b = (_a18 = zodStringChecks.length) == null ? void 0 : _a18[0]) == null ? void 0 : _b.value) ?? ((_d = (_c = zodStringChecks.min) == null ? void 0 : _c[0]) == null ? void 0 : _d.value);
  const maxLength = ((_f = (_e = zodStringChecks.length) == null ? void 0 : _e[0]) == null ? void 0 : _f.value) ?? ((_h = (_g = zodStringChecks.max) == null ? void 0 : _g[0]) == null ? void 0 : _h.value);
  const contentEncoding = satisfiesVersion(state.components.openapi, "3.1.0") ? mapContentEncoding(zodStringChecks) : void 0;
  if (patterns.length <= 1) {
    return {
      type: "schema",
      schema: {
        type: "string",
        ...format && { format },
        ...patterns[0] && { pattern: patterns[0] },
        ...minLength !== void 0 && { minLength },
        ...maxLength !== void 0 && { maxLength },
        ...contentEncoding && { contentEncoding }
      }
    };
  }
  return {
    type: "schema",
    schema: {
      allOf: [
        {
          type: "string",
          ...format && { format },
          ...patterns[0] && { pattern: patterns[0] },
          ...minLength !== void 0 && { minLength },
          ...maxLength !== void 0 && { maxLength },
          ...contentEncoding && { contentEncoding }
        },
        ...patterns.slice(1).map(
          (pattern) => ({
            type: "string",
            pattern
          })
        )
      ]
    }
  };
}, "createStringSchema");
var getZodStringChecks = /* @__PURE__ */ __name((zodString) => zodString._def.checks.reduce(
  (acc, check) => {
    const mapping = acc[check.kind];
    if (mapping) {
      mapping.push(check);
      return acc;
    }
    acc[check.kind] = [check];
    return acc;
  },
  {}
), "getZodStringChecks");
var mapPatterns = /* @__PURE__ */ __name((zodStringChecks) => {
  const startsWith = mapStartsWith(zodStringChecks);
  const endsWith = mapEndsWith(zodStringChecks);
  const regex = mapRegex(zodStringChecks);
  const includes = mapIncludes(zodStringChecks);
  const patterns = [
    ...regex ?? [],
    ...startsWith ? [startsWith] : [],
    ...endsWith ? [endsWith] : [],
    ...includes ?? []
  ];
  return patterns;
}, "mapPatterns");
var mapStartsWith = /* @__PURE__ */ __name((zodStringChecks) => {
  var _a18, _b;
  if ((_b = (_a18 = zodStringChecks.startsWith) == null ? void 0 : _a18[0]) == null ? void 0 : _b.value) {
    return `^${zodStringChecks.startsWith[0].value}`;
  }
  return void 0;
}, "mapStartsWith");
var mapEndsWith = /* @__PURE__ */ __name((zodStringChecks) => {
  var _a18, _b;
  if ((_b = (_a18 = zodStringChecks.endsWith) == null ? void 0 : _a18[0]) == null ? void 0 : _b.value) {
    return `${zodStringChecks.endsWith[0].value}$`;
  }
  return void 0;
}, "mapEndsWith");
var mapRegex = /* @__PURE__ */ __name((zodStringChecks) => {
  var _a18;
  return (_a18 = zodStringChecks.regex) == null ? void 0 : _a18.map((regexCheck) => regexCheck.regex.source);
}, "mapRegex");
var mapIncludes = /* @__PURE__ */ __name((zodStringChecks) => {
  var _a18;
  return (_a18 = zodStringChecks.includes) == null ? void 0 : _a18.map((includeCheck) => {
    if (includeCheck.position === 0) {
      return `^${includeCheck.value}`;
    }
    if (includeCheck.position) {
      return `^.{${includeCheck.position}}${includeCheck.value}`;
    }
    return includeCheck.value;
  });
}, "mapIncludes");
var mapStringFormat = /* @__PURE__ */ __name((zodStringChecks) => {
  var _a18, _b, _c, _d;
  if (zodStringChecks.uuid) {
    return "uuid";
  }
  if (zodStringChecks.datetime) {
    return "date-time";
  }
  if (zodStringChecks.date) {
    return "date";
  }
  if (zodStringChecks.time) {
    return "time";
  }
  if (zodStringChecks.duration) {
    return "duration";
  }
  if (zodStringChecks.email) {
    return "email";
  }
  if (zodStringChecks.url) {
    return "uri";
  }
  if ((_a18 = zodStringChecks.ip) == null ? void 0 : _a18.every((ip) => ip.version === "v4")) {
    return "ipv4";
  }
  if ((_b = zodStringChecks.ip) == null ? void 0 : _b.every((ip) => ip.version === "v6")) {
    return "ipv6";
  }
  if ((_c = zodStringChecks.cidr) == null ? void 0 : _c.every((ip) => ip.version === "v4")) {
    return "ipv4";
  }
  if ((_d = zodStringChecks.cidr) == null ? void 0 : _d.every((ip) => ip.version === "v6")) {
    return "ipv6";
  }
  return void 0;
}, "mapStringFormat");
var mapContentEncoding = /* @__PURE__ */ __name((zodStringChecks) => {
  if (zodStringChecks.base64) {
    return "base64";
  }
  return void 0;
}, "mapContentEncoding");
var createTupleSchema = /* @__PURE__ */ __name((zodTuple, state) => {
  const items = zodTuple.items;
  const rest = zodTuple._def.rest;
  const prefixItems = mapPrefixItems(items, state);
  if (satisfiesVersion(state.components.openapi, "3.1.0")) {
    if (!rest) {
      return {
        type: "schema",
        schema: {
          type: "array",
          maxItems: items.length,
          minItems: items.length,
          ...prefixItems && {
            prefixItems: prefixItems.schemas.map((item) => item.schema)
          }
        },
        effects: prefixItems == null ? void 0 : prefixItems.effects
      };
    }
    const itemSchema = createSchemaObject(rest, state, ["tuple items"]);
    return {
      type: "schema",
      schema: {
        type: "array",
        items: itemSchema.schema,
        ...prefixItems && {
          prefixItems: prefixItems.schemas.map((item) => item.schema)
        }
      },
      effects: flattenEffects([prefixItems == null ? void 0 : prefixItems.effects, itemSchema.effects])
    };
  }
  if (!rest) {
    return {
      type: "schema",
      schema: {
        type: "array",
        maxItems: items.length,
        minItems: items.length,
        ...prefixItems && {
          items: { oneOf: prefixItems.schemas.map((item) => item.schema) }
        }
      },
      effects: prefixItems == null ? void 0 : prefixItems.effects
    };
  }
  if (prefixItems) {
    const restSchema = createSchemaObject(rest, state, ["tuple items"]);
    return {
      type: "schema",
      schema: {
        type: "array",
        items: {
          oneOf: [
            ...prefixItems.schemas.map((item) => item.schema),
            restSchema.schema
          ]
        }
      },
      effects: flattenEffects([restSchema.effects, prefixItems.effects])
    };
  }
  return {
    type: "schema",
    schema: {
      type: "array"
    }
  };
}, "createTupleSchema");
var mapPrefixItems = /* @__PURE__ */ __name((items, state) => {
  if (items.length) {
    const schemas = items.map(
      (item, index) => createSchemaObject(item, state, [`tuple item ${index}`])
    );
    return {
      effects: flattenEffects(schemas.map((s3) => s3.effects)),
      schemas
    };
  }
  return void 0;
}, "mapPrefixItems");
var createUnionSchema = /* @__PURE__ */ __name((zodUnion, state) => {
  var _a18, _b, _c;
  const schemas = zodUnion.options.reduce((acc, option, index) => {
    if (!isOptionalObjectKey(option)) {
      acc.push(createSchemaObject(option, state, [`union option ${index}`]));
    }
    return acc;
  }, []);
  if (((_b = (_a18 = zodUnion._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.unionOneOf) ?? ((_c = state.documentOptions) == null ? void 0 : _c.unionOneOf)) {
    return {
      type: "schema",
      schema: {
        oneOf: schemas.map((s3) => s3.schema)
      },
      effects: flattenEffects(schemas.map((s3) => s3.effects))
    };
  }
  return {
    type: "schema",
    schema: {
      anyOf: schemas.map((s3) => s3.schema)
    },
    effects: flattenEffects(schemas.map((s3) => s3.effects))
  };
}, "createUnionSchema");
var createUnknownSchema = /* @__PURE__ */ __name((_zodUnknown) => ({
  type: "schema",
  schema: {}
}), "createUnknownSchema");
var createSchemaSwitch = /* @__PURE__ */ __name((zodSchema2, previous, state) => {
  var _a18, _b;
  if ((_b = (_a18 = zodSchema2._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.type) {
    return createManualTypeSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodString")) {
    return createStringSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodNumber")) {
    return createNumberSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodBoolean")) {
    return createBooleanSchema();
  }
  if (isZodType(zodSchema2, "ZodEnum")) {
    return createEnumSchema(zodSchema2);
  }
  if (isZodType(zodSchema2, "ZodLiteral")) {
    return createLiteralSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodNativeEnum")) {
    return createNativeEnumSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodArray")) {
    return createArraySchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodObject")) {
    return createObjectSchema(zodSchema2, previous, state);
  }
  if (isZodType(zodSchema2, "ZodUnion")) {
    return createUnionSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodDiscriminatedUnion")) {
    return createDiscriminatedUnionSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodNull")) {
    return createNullSchema();
  }
  if (isZodType(zodSchema2, "ZodNullable")) {
    return createNullableSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodOptional")) {
    return createOptionalSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodReadonly")) {
    return createReadonlySchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodDefault")) {
    return createDefaultSchema(zodSchema2, state, previous);
  }
  if (isZodType(zodSchema2, "ZodRecord")) {
    return createRecordSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodTuple")) {
    return createTupleSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodDate")) {
    return createDateSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodPipeline")) {
    return createPipelineSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodEffects") && zodSchema2._def.effect.type === "transform") {
    return createTransformSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodEffects") && zodSchema2._def.effect.type === "preprocess") {
    return createPreprocessSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodEffects") && zodSchema2._def.effect.type === "refinement") {
    return createRefineSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodNativeEnum")) {
    return createNativeEnumSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodIntersection")) {
    return createIntersectionSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodCatch")) {
    return createCatchSchema(zodSchema2, state, previous);
  }
  if (isZodType(zodSchema2, "ZodUnknown") || isZodType(zodSchema2, "ZodAny")) {
    return createUnknownSchema();
  }
  if (isZodType(zodSchema2, "ZodLazy")) {
    return createLazySchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodBranded")) {
    return createBrandedSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodSet")) {
    return createSetSchema(zodSchema2, state);
  }
  if (isZodType(zodSchema2, "ZodBigInt")) {
    return createBigIntSchema();
  }
  return createManualTypeSchema(zodSchema2, state);
}, "createSchemaSwitch");
var createNewSchema = /* @__PURE__ */ __name(({
  zodSchema: zodSchema2,
  previous,
  state
}) => {
  var _a18;
  if (state.visited.has(zodSchema2)) {
    throw new Error(
      `The schema at ${state.path.join(
        " > "
      )} needs to be registered because it's circularly referenced`
    );
  }
  state.visited.add(zodSchema2);
  const {
    effectType,
    param,
    header,
    ref,
    refType,
    unionOneOf,
    ...additionalMetadata
  } = ((_a18 = zodSchema2._def.zodOpenApi) == null ? void 0 : _a18.openapi) ?? {};
  const schema = createSchemaSwitch(zodSchema2, previous, state);
  const schemaWithMetadata = enhanceWithMetadata(
    schema,
    additionalMetadata,
    state,
    previous
  );
  state.visited.delete(zodSchema2);
  return schemaWithMetadata;
}, "createNewSchema");
var createNewRef = /* @__PURE__ */ __name(({
  previous,
  ref,
  zodSchema: zodSchema2,
  state
}) => {
  var _a18;
  state.components.schemas.set(zodSchema2, {
    type: "in-progress",
    ref
  });
  const newSchema = createNewSchema({
    zodSchema: zodSchema2,
    previous,
    state: {
      ...state,
      visited: /* @__PURE__ */ new Set()
    }
  });
  state.components.schemas.set(zodSchema2, {
    type: "complete",
    ref,
    schemaObject: newSchema.schema,
    effects: newSchema.effects
  });
  return {
    type: "ref",
    schema: {
      $ref: createComponentSchemaRef(
        ref,
        (_a18 = state.documentOptions) == null ? void 0 : _a18.componentRefPath
      )
    },
    schemaObject: newSchema.schema,
    effects: newSchema.effects ? [
      {
        type: "component",
        zodType: zodSchema2,
        path: [...state.path]
      }
    ] : void 0,
    zodType: zodSchema2
  };
}, "createNewRef");
var createExistingRef = /* @__PURE__ */ __name((zodSchema2, component, state) => {
  var _a18, _b;
  if (component && component.type === "complete") {
    return {
      type: "ref",
      schema: {
        $ref: createComponentSchemaRef(
          component.ref,
          (_a18 = state.documentOptions) == null ? void 0 : _a18.componentRefPath
        )
      },
      schemaObject: component.schemaObject,
      effects: component.effects ? [
        {
          type: "component",
          zodType: zodSchema2,
          path: [...state.path]
        }
      ] : void 0,
      zodType: zodSchema2
    };
  }
  if (component && component.type === "in-progress") {
    return {
      type: "ref",
      schema: {
        $ref: createComponentSchemaRef(
          component.ref,
          (_b = state.documentOptions) == null ? void 0 : _b.componentRefPath
        )
      },
      schemaObject: void 0,
      effects: [
        {
          type: "component",
          zodType: zodSchema2,
          path: [...state.path]
        }
      ],
      zodType: zodSchema2
    };
  }
  return;
}, "createExistingRef");
var createSchemaOrRef = /* @__PURE__ */ __name((zodSchema2, state, onlyRef) => {
  var _a18, _b, _c, _d;
  const component = state.components.schemas.get(zodSchema2);
  const existingRef = createExistingRef(zodSchema2, component, state);
  if (existingRef) {
    return existingRef;
  }
  const previous = ((_a18 = zodSchema2._def.zodOpenApi) == null ? void 0 : _a18[previousSymbol]) ? createSchemaOrRef(
    zodSchema2._def.zodOpenApi[previousSymbol],
    state,
    true
  ) : void 0;
  const current = ((_b = zodSchema2._def.zodOpenApi) == null ? void 0 : _b[currentSymbol]) && zodSchema2._def.zodOpenApi[currentSymbol] !== zodSchema2 ? createSchemaOrRef(
    zodSchema2._def.zodOpenApi[currentSymbol],
    state,
    true
  ) : void 0;
  const ref = ((_d = (_c = zodSchema2._def.zodOpenApi) == null ? void 0 : _c.openapi) == null ? void 0 : _d.ref) ?? (component == null ? void 0 : component.ref);
  if (ref) {
    return current ? createNewSchema({ zodSchema: zodSchema2, previous: current, state }) : createNewRef({ ref, zodSchema: zodSchema2, previous, state });
  }
  if (onlyRef) {
    return previous ?? current;
  }
  return createNewSchema({ zodSchema: zodSchema2, previous: previous ?? current, state });
}, "createSchemaOrRef");
var createSchemaObject = /* @__PURE__ */ __name((zodSchema2, state, subpath) => {
  state.path.push(...subpath);
  const schema = createSchemaOrRef(zodSchema2, state);
  if (!schema) {
    throw new Error("Schema does not exist");
  }
  state.path.pop();
  return schema;
}, "createSchemaObject");
var createSchema = /* @__PURE__ */ __name((zodSchema2, state, subpath) => {
  const schema = createSchemaObject(zodSchema2, state, subpath);
  if (schema.effects) {
    verifyEffects(schema.effects, state);
  }
  return schema.schema;
}, "createSchema");
var getDefaultComponents = /* @__PURE__ */ __name((componentsObject, openapi = "3.1.0") => {
  const defaultComponents = {
    schemas: /* @__PURE__ */ new Map(),
    parameters: /* @__PURE__ */ new Map(),
    headers: /* @__PURE__ */ new Map(),
    requestBodies: /* @__PURE__ */ new Map(),
    responses: /* @__PURE__ */ new Map(),
    callbacks: /* @__PURE__ */ new Map(),
    openapi
  };
  if (!componentsObject) {
    return defaultComponents;
  }
  getSchemas(componentsObject.schemas, defaultComponents);
  getParameters(componentsObject.parameters, defaultComponents);
  getRequestBodies(componentsObject.requestBodies, defaultComponents);
  getHeaders(componentsObject.headers, defaultComponents);
  getResponses(componentsObject.responses, defaultComponents);
  getCallbacks(componentsObject.callbacks, defaultComponents);
  return defaultComponents;
}, "getDefaultComponents");
var getSchemas = /* @__PURE__ */ __name((schemas, components) => {
  if (!schemas) {
    return;
  }
  Object.entries(schemas).forEach(([key, schema]) => {
    var _a18, _b;
    if (isAnyZodType(schema)) {
      if (components.schemas.has(schema)) {
        throw new Error(
          `Schema ${JSON.stringify(schema._def)} is already registered`
        );
      }
      const ref = ((_b = (_a18 = schema._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.ref) ?? key;
      components.schemas.set(schema, {
        type: "manual",
        ref
      });
    }
  });
}, "getSchemas");
var getParameters = /* @__PURE__ */ __name((parameters, components) => {
  if (!parameters) {
    return;
  }
  Object.entries(parameters).forEach(([key, schema]) => {
    var _a18, _b, _c, _d, _e, _f, _g, _h, _i;
    if (isAnyZodType(schema)) {
      if (components.parameters.has(schema)) {
        throw new Error(
          `Parameter ${JSON.stringify(schema._def)} is already registered`
        );
      }
      const ref = ((_c = (_b = (_a18 = schema._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.param) == null ? void 0 : _c.ref) ?? key;
      const name18 = (_f = (_e = (_d = schema._def.zodOpenApi) == null ? void 0 : _d.openapi) == null ? void 0 : _e.param) == null ? void 0 : _f.name;
      const location = (_i = (_h = (_g = schema._def.zodOpenApi) == null ? void 0 : _g.openapi) == null ? void 0 : _h.param) == null ? void 0 : _i.in;
      if (!name18 || !location) {
        throw new Error("`name` or `in` missing in .openapi()");
      }
      components.parameters.set(schema, {
        type: "manual",
        ref,
        in: location,
        name: name18
      });
    }
  });
}, "getParameters");
var getHeaders = /* @__PURE__ */ __name((responseHeaders, components) => {
  if (!responseHeaders) {
    return;
  }
  Object.entries(responseHeaders).forEach(([key, schema]) => {
    var _a18, _b, _c;
    if (isAnyZodType(schema)) {
      if (components.parameters.has(schema)) {
        throw new Error(
          `Header ${JSON.stringify(schema._def)} is already registered`
        );
      }
      const ref = ((_c = (_b = (_a18 = schema._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.param) == null ? void 0 : _c.ref) ?? key;
      components.headers.set(schema, {
        type: "manual",
        ref
      });
    }
  });
}, "getHeaders");
var getResponses = /* @__PURE__ */ __name((responses, components) => {
  if (!responses) {
    return;
  }
  Object.entries(responses).forEach(([key, responseObject]) => {
    if (components.responses.has(responseObject)) {
      throw new Error(
        `Header ${JSON.stringify(responseObject)} is already registered`
      );
    }
    const ref = (responseObject == null ? void 0 : responseObject.ref) ?? key;
    components.responses.set(responseObject, {
      type: "manual",
      ref
    });
  });
}, "getResponses");
var getRequestBodies = /* @__PURE__ */ __name((requestBodies, components) => {
  if (!requestBodies) {
    return;
  }
  Object.entries(requestBodies).forEach(([key, requestBody]) => {
    if (components.requestBodies.has(requestBody)) {
      throw new Error(
        `Header ${JSON.stringify(requestBody)} is already registered`
      );
    }
    const ref = (requestBody == null ? void 0 : requestBody.ref) ?? key;
    components.requestBodies.set(requestBody, {
      type: "manual",
      ref
    });
  });
}, "getRequestBodies");
var getCallbacks = /* @__PURE__ */ __name((callbacks, components) => {
  if (!callbacks) {
    return;
  }
  Object.entries(callbacks).forEach(([key, callback]) => {
    if (components.callbacks.has(callback)) {
      throw new Error(
        `Callback ${JSON.stringify(callback)} is already registered`
      );
    }
    const ref = (callback == null ? void 0 : callback.ref) ?? key;
    components.callbacks.set(callback, {
      type: "manual",
      ref
    });
  });
}, "getCallbacks");
var createComponentSchemaRef = /* @__PURE__ */ __name((schemaRef, componentPath) => `${componentPath ?? "#/components/schemas/"}${schemaRef}`, "createComponentSchemaRef");
var createSchemaComponents = /* @__PURE__ */ __name((componentsObject, components, documentOptions) => {
  Array.from(components.schemas).forEach(([schema, { type }], index) => {
    var _a18, _b;
    if (type === "manual") {
      const state = {
        components,
        type: ((_b = (_a18 = schema._def.zodOpenApi) == null ? void 0 : _a18.openapi) == null ? void 0 : _b.refType) ?? "output",
        path: [],
        visited: /* @__PURE__ */ new Set(),
        documentOptions
      };
      createSchema(schema, state, [`component schema index ${index}`]);
    }
  });
  const customComponents = Object.entries(
    componentsObject.schemas ?? {}
  ).reduce(
    (acc, [key, value]) => {
      if (isAnyZodType(value)) {
        return acc;
      }
      if (acc[key]) {
        throw new Error(`Schema "${key}" is already registered`);
      }
      acc[key] = value;
      return acc;
    },
    {}
  );
  const finalComponents = Array.from(components.schemas).reduce((acc, [_zodType, component]) => {
    if (component.type === "complete") {
      if (acc[component.ref]) {
        throw new Error(`Schema "${component.ref}" is already registered`);
      }
      acc[component.ref] = component.schemaObject;
    }
    return acc;
  }, customComponents);
  return Object.keys(finalComponents).length ? finalComponents : void 0;
}, "createSchemaComponents");

// node_modules/zod-openapi/dist/index.mjs
var createSchema2 = /* @__PURE__ */ __name((zodType, opts) => {
  const components = getDefaultComponents(
    {
      schemas: opts == null ? void 0 : opts.components
    },
    opts == null ? void 0 : opts.openapi
  );
  const state = {
    components,
    type: (opts == null ? void 0 : opts.schemaType) ?? "output",
    path: [],
    visited: /* @__PURE__ */ new Set(),
    documentOptions: opts
  };
  const schema = createSchema(zodType, state, ["createSchema"]);
  const schemaComponents = createSchemaComponents({}, components);
  return {
    schema,
    components: schemaComponents
  };
}, "createSchema");

// node_modules/hono-openapi/zod.js
function i2(o2) {
  return { builder: /* @__PURE__ */ __name((t) => {
    const { version: a3, ...i3 } = t ?? {};
    return createSchema2(o2, t ? { openapi: a3, ...i3 } : void 0);
  }, "builder"), validator: o2.parse };
}
__name(i2, "i");
function e2(r2, e3, n2) {
  const s3 = zValidator(r2, e3, n2);
  return Object.assign(s3, { [e]: { resolver: /* @__PURE__ */ __name(async (o2) => s(r2, await i2(e3).builder(o2)), "resolver"), metadata: { schemaType: "input" } } });
}
__name(e2, "e");

// apps/api/error.ts
var ErrorResponse = external_exports.object({
  type: external_exports.enum([
    "validation",
    "authentication",
    "forbidden",
    "not_found",
    "rate_limit",
    "internal"
  ]).openapi({
    description: "The error type category",
    examples: ["validation", "authentication"]
  }),
  code: external_exports.string().openapi({
    description: "Machine-readable error code identifier",
    examples: ["invalid_parameter", "missing_required_field", "unauthorized"]
  }),
  message: external_exports.string().openapi({
    description: "Human-readable error message",
    examples: ["The request was invalid", "Authentication required"]
  }),
  param: external_exports.string().optional().openapi({
    description: "The parameter that caused the error (if applicable)",
    examples: ["email", "user_id"]
  }),
  details: external_exports.any().optional().openapi({
    description: "Additional error context information"
  })
}).openapi({ ref: "ErrorResponse" });
var ErrorCodes = {
  // Validation errors (400)
  Validation: {
    INVALID_PARAMETER: "invalid_parameter",
    MISSING_REQUIRED_FIELD: "missing_required_field",
    INVALID_FORMAT: "invalid_format",
    ALREADY_EXISTS: "already_exists",
    IN_USE: "resource_in_use",
    INVALID_STATE: "invalid_state"
  },
  // Authentication errors (401)
  Authentication: {
    UNAUTHORIZED: "unauthorized",
    INVALID_TOKEN: "invalid_token",
    EXPIRED_TOKEN: "expired_token",
    INVALID_CREDENTIALS: "invalid_credentials"
  },
  // Permission errors (403)
  Permission: {
    FORBIDDEN: "forbidden",
    INSUFFICIENT_PERMISSIONS: "insufficient_permissions",
    ACCOUNT_RESTRICTED: "account_restricted"
  },
  // Resource not found errors (404)
  NotFound: {
    RESOURCE_NOT_FOUND: "resource_not_found"
  },
  // Rate limit errors (429)
  RateLimit: {
    TOO_MANY_REQUESTS: "too_many_requests",
    QUOTA_EXCEEDED: "quota_exceeded"
  },
  // Server errors (500)
  Server: {
    INTERNAL_ERROR: "internal_error",
    SERVICE_UNAVAILABLE: "service_unavailable",
    DEPENDENCY_FAILURE: "dependency_failure"
  }
};

// apps/api/common.ts
var validator5 = /* @__PURE__ */ __name(function(target, schema) {
  const standardErrorHandler = /* @__PURE__ */ __name((result, c2) => {
    if (!result.success) {
      const issues = result.error.issues || result.error.errors || [];
      if (issues.length === 0) {
        return c2.json(
          {
            type: "validation",
            code: ErrorCodes.Validation.INVALID_PARAMETER,
            message: "Invalid request data"
          },
          400
        );
      }
      const firstIssue = issues[0];
      const fieldPath = firstIssue.path ? Array.isArray(firstIssue.path) ? firstIssue.path.join(".") : firstIssue.path : void 0;
      let message = firstIssue.message;
      let errorCode = ErrorCodes.Validation.INVALID_PARAMETER;
      if (firstIssue.code === "invalid_type" && firstIssue.received === "undefined") {
        errorCode = ErrorCodes.Validation.MISSING_REQUIRED_FIELD;
        message = `The \`${firstIssue.path}\` field is required.`;
      } else if (["invalid_string", "invalid_date", "invalid_regex"].includes(
        firstIssue.code
      )) {
        errorCode = ErrorCodes.Validation.INVALID_FORMAT;
      }
      const response = {
        type: "validation",
        code: errorCode,
        message,
        param: fieldPath,
        details: void 0
      };
      if (issues.length > 0) {
        response.details = {
          issues: issues.map((issue) => ({
            path: issue.path ? Array.isArray(issue.path) ? issue.path.join(".") : issue.path : void 0,
            code: issue.code,
            message: issue.message,
            // @ts-expect-error
            expected: issue.expected,
            // @ts-expect-error
            received: issue.received
          }))
        };
      }
      console.log("Validation error in validator:", response);
      return c2.json(response, 400);
    }
  }, "standardErrorHandler");
  return e2(target, schema, standardErrorHandler);
}, "validator");
var ErrorResponses = {
  400: {
    content: {
      "application/json": {
        schema: i2(
          ErrorResponse.openapi({
            description: "Validation error"
          })
        ),
        example: {
          type: "validation",
          code: "invalid_parameter",
          message: "The request was invalid",
          param: "email"
        }
      }
    },
    description: "Bad Request"
  },
  401: {
    content: {
      "application/json": {
        schema: i2(
          ErrorResponse.openapi({
            description: "Authentication error"
          })
        ),
        example: {
          type: "authentication",
          code: "unauthorized",
          message: "Authentication required"
        }
      }
    },
    description: "Unauthorized"
  },
  403: {
    content: {
      "application/json": {
        schema: i2(
          ErrorResponse.openapi({
            description: "Permission error"
          })
        ),
        example: {
          type: "forbidden",
          code: "permission_denied",
          message: "You do not have permission to access this resource"
        }
      }
    },
    description: "Forbidden"
  },
  404: {
    content: {
      "application/json": {
        schema: i2(
          ErrorResponse.openapi({
            description: "Not found error"
          })
        ),
        example: {
          type: "not_found",
          code: "resource_not_found",
          message: "The requested resource could not be found"
        }
      }
    },
    description: "Not Found"
  },
  429: {
    content: {
      "application/json": {
        schema: i2(
          ErrorResponse.openapi({
            description: "Rate limit error"
          })
        ),
        example: {
          type: "rate_limit",
          code: "too_many_requests",
          message: "Rate limit exceeded"
        }
      }
    },
    description: "Too Many Requests"
  },
  500: {
    content: {
      "application/json": {
        schema: i2(
          ErrorResponse.openapi({
            description: "Server error"
          })
        ),
        example: {
          type: "internal",
          code: "internal_error",
          message: "Internal server error"
        }
      }
    },
    description: "Internal Server Error"
  }
};

// apps/api/clothesRoute.ts
var clothesRoute = new Hono2().post(
  "/",
  w({
    tags: ["Clothe"],
    summary: "Crea un nuevo Clothe",
    description: "Crea un nuevo Clothe para el usuario",
    requestBody: {
      content: {
        "application/json": {
          schema: i2(Clothe.InfoSchema.partial({ id: true })),
          example: Examples.Clothe
        }
      }
    },
    responses: {
      201: {
        description: "Respuesta exitosa",
        content: {
          "application/json": {
            schema: i2(
              external_exports.object({
                data: external_exports.literal("Ok")
              })
            ),
            example: { data: "Ok" }
          }
        }
      },
      400: ErrorResponses[400],
      500: ErrorResponses[500]
    }
  }),
  validator5("json", Clothe.InfoSchema.partial({ id: true })),
  async (c2) => {
    const body = c2.req.valid("json");
    await Clothe.create(body);
    return c2.json({ data: "Ok" }, 201);
  }
).get(
  "/",
  w({
    tags: ["Clothe"],
    summary: "Lista all the clothes",
    description: "List all the clothes of the company.",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: i2(
              external_exports.object({
                data: Clothe.InfoSchema.array().openapi({
                  description: "Lista de Clothes",
                  example: [Examples.Clothe]
                })
              })
            ),
            example: {
              data: [Examples.Clothe]
            }
          }
        },
        description: "A list of clothes."
      },
      500: ErrorResponses[500]
    }
  }),
  async (c2) => {
    const animals = await Clothe.list();
    return c2.json({ data: animals }, 200);
  }
).get(
  "/:id",
  w({
    tags: ["Clothe"],
    summary: "Obtener Clothe por ID",
    description: "Recupera un Clothe espec\xEDfico por su ID.",
    responses: {
      200: {
        description: "Respuesta exitosa",
        content: {
          "application/json": {
            schema: i2(
              external_exports.object({
                data: Clothe.InfoSchema
              })
            ),
            example: { data: Examples.Clothe }
          }
        }
      },
      400: ErrorResponses[400],
      404: ErrorResponses[404],
      500: ErrorResponses[500]
    }
  }),
  validator5("param", Clothe.InfoSchema.pick({ id: true })),
  async (c2) => {
    const id = c2.req.valid("param").id;
    const clothe = await Clothe.getDetail({ id });
    if (!clothe) {
      return c2.json(
        {
          type: "not_found",
          code: "resource_not_found",
          message: "The requested resource could not be found"
        },
        404
      );
    }
    return c2.json({ data: clothe }, 200);
  }
).put(
  "/:id",
  w({
    tags: ["Clothe"],
    summary: "Update Clothe by ID",
    description: "Update a clothe by ID.",
    requestBody: {
      content: {
        "application/json": {
          schema: i2(Clothe.InfoSchema),
          example: Examples.Clothe
        }
      }
    },
    responses: {
      200: {
        description: "Respuesta exitosa",
        content: {
          "application/json": {
            schema: i2(
              external_exports.object({
                data: Clothe.InfoSchema
              })
            ),
            example: { data: Examples.Clothe }
          }
        }
      },
      400: ErrorResponses[400],
      404: ErrorResponses[404],
      500: ErrorResponses[500]
    }
  }),
  validator5("json", Clothe.InfoSchema),
  async (c2) => {
    const id = c2.req.param("id");
    const body = c2.req.valid("json");
    await Clothe.update({ ...body, id });
    return c2.json({ data: "Ok" }, 200);
  }
).delete(
  "/:id",
  w({
    tags: ["Clothe"],
    summary: "Delete a clothe by ID",
    description: "Delete a clothe by ID.",
    responses: {
      204: {
        description: "Without content. Clothes was eliminated."
      },
      400: ErrorResponses[400],
      404: ErrorResponses[404],
      500: ErrorResponses[500]
    }
  }),
  validator5("param", Clothe.InfoSchema.pick({ id: true })),
  async (c2) => {
    const id = c2.req.param("id");
    await Clothe.deactivate({ id });
    return c2.body(null, 204);
  }
);

// node_modules/@scalar/core/dist/libs/html-rendering/html-rendering.js
var addIndent = /* @__PURE__ */ __name((str, spaces = 2, initialIndent = false) => {
  const indent = " ".repeat(spaces);
  const lines = str.split("\n");
  return lines.map((line2, index) => {
    if (index === 0 && !initialIndent) {
      return line2;
    }
    return `${indent}${line2}`;
  }).join("\n");
}, "addIndent");
var getStyles = /* @__PURE__ */ __name((configuration, customTheme2) => {
  const styles = [];
  if (configuration.customCss) {
    styles.push("/* Custom CSS */");
    styles.push(configuration.customCss);
  }
  if (!configuration.theme && customTheme2) {
    styles.push("/* Custom Theme */");
    styles.push(customTheme2);
  }
  if (styles.length === 0) {
    return "";
  }
  return `
    <style type="text/css">
      ${addIndent(styles.join("\n\n"), 6)}
    </style>`;
}, "getStyles");
var getHtmlDocument = /* @__PURE__ */ __name((givenConfiguration, customTheme2 = "") => {
  const { cdn, pageTitle, customCss, theme, ...rest } = givenConfiguration;
  const configuration = getConfiguration({
    ...rest,
    ...theme ? { theme } : {},
    customCss
  });
  const content = `<!doctype html>
<html>
  <head>
    <title>${pageTitle ?? "Scalar API Reference"}</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />${getStyles(configuration, customTheme2)}
  </head>
  <body>
    <div id="app"></div>${getScriptTags(configuration, cdn)}
  </body>
</html>`;
  return content;
}, "getHtmlDocument");
function getScriptTags(configuration, cdn) {
  const { tagsSorter, operationsSorter, generateHeadingSlug, generateModelSlug, generateTagSlug, generateOperationSlug, generateWebhookSlug, onLoaded, redirect, onSpecUpdate, onServerChange, ...restConfig } = configuration;
  const functionProps = [];
  const functionProperties = [
    { name: "tagsSorter", value: tagsSorter },
    { name: "operationsSorter", value: operationsSorter },
    { name: "generateHeadingSlug", value: generateHeadingSlug },
    { name: "generateModelSlug", value: generateModelSlug },
    { name: "generateTagSlug", value: generateTagSlug },
    { name: "generateOperationSlug", value: generateOperationSlug },
    { name: "generateWebhookSlug", value: generateWebhookSlug },
    { name: "onLoaded", value: onLoaded },
    { name: "redirect", value: redirect },
    { name: "onSpecUpdate", value: onSpecUpdate },
    { name: "onServerChange", value: onServerChange }
  ];
  functionProperties.forEach(({ name: name18, value }) => {
    if (value && typeof value === "function") {
      functionProps.push(`"${name18}": ${value.toString()}`);
    }
  });
  const configString = JSON.stringify(restConfig, null, 2).split("\n").map((line2, index) => index === 0 ? line2 : "      " + line2).join("\n").replace(/\s*}$/, "");
  const functionPropsString = functionProps.length ? `,
        ${functionProps.join(",\n        ")}
      }` : "}";
  return `
    <!-- Load the Script -->
    <script src="${cdn ?? "https://cdn.jsdelivr.net/npm/@scalar/api-reference"}"></script>

    <!-- Initialize the Scalar API Reference -->
    <script type="text/javascript">
      Scalar.createApiReference('#app', ${configString}${functionPropsString})
    </script>`;
}
__name(getScriptTags, "getScriptTags");
var getConfiguration = /* @__PURE__ */ __name((givenConfiguration) => {
  const configuration = {
    ...givenConfiguration
  };
  if (typeof configuration.content === "function") {
    configuration.content = configuration.content();
  }
  if (configuration.content && configuration.url) {
    delete configuration.content;
  }
  return configuration;
}, "getConfiguration");

// node_modules/@scalar/hono-api-reference/dist/scalar.js
var DEFAULT_CONFIGURATION = {
  _integration: "hono"
};
var customTheme = `
.light-mode {
  color-scheme: light;
  --scalar-color-1: #2a2f45;
  --scalar-color-2: #757575;
  --scalar-color-3: #8e8e8e;
  --scalar-color-disabled: #b4b1b1;
  --scalar-color-ghost: #a7a7a7;
  --scalar-color-accent: #0099ff;
  --scalar-background-1: #fff;
  --scalar-background-2: #f6f6f6;
  --scalar-background-3: #e7e7e7;
  --scalar-background-4: rgba(0, 0, 0, 0.06);
  --scalar-background-accent: #8ab4f81f;

  --scalar-border-color: rgba(0, 0, 0, 0.1);
  --scalar-scrollbar-color: rgba(0, 0, 0, 0.18);
  --scalar-scrollbar-color-active: rgba(0, 0, 0, 0.36);
  --scalar-lifted-brightness: 1;
  --scalar-backdrop-brightness: 1;

  --scalar-shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.11);
  --scalar-shadow-2: rgba(0, 0, 0, 0.08) 0px 13px 20px 0px,
    rgba(0, 0, 0, 0.08) 0px 3px 8px 0px, #eeeeed 0px 0 0 1px;

  --scalar-button-1: rgb(49 53 56);
  --scalar-button-1-color: #fff;
  --scalar-button-1-hover: rgb(28 31 33);

  --scalar-color-green: #069061;
  --scalar-color-red: #ef0006;
  --scalar-color-yellow: #edbe20;
  --scalar-color-blue: #0082d0;
  --scalar-color-orange: #fb892c;
  --scalar-color-purple: #5203d1;
}

.dark-mode {
  color-scheme: dark;
  --scalar-color-1: rgba(255, 255, 245, .86);
  --scalar-color-2: rgba(255, 255, 245, .6);
  --scalar-color-3: rgba(255, 255, 245, .38);
  --scalar-color-disabled: rgba(255, 255, 245, .25);
  --scalar-color-ghost: rgba(255, 255, 245, .25);
  --scalar-color-accent: #e36002;
  --scalar-background-1: #1e1e20;
  --scalar-background-2: #2a2a2a;
  --scalar-background-3: #505053;
  --scalar-background-4: rgba(255, 255, 255, 0.06);
  --scalar-background-accent: #e360021f;

  --scalar-border-color: rgba(255, 255, 255, 0.1);
  --scalar-scrollbar-color: rgba(255, 255, 255, 0.24);
  --scalar-scrollbar-color-active: rgba(255, 255, 255, 0.48);
  --scalar-lifted-brightness: 1.45;
  --scalar-backdrop-brightness: 0.5;

  --scalar-shadow-1: 0 1px 3px 0 rgb(0, 0, 0, 0.1);
  --scalar-shadow-2: rgba(15, 15, 15, 0.2) 0px 3px 6px,
    rgba(15, 15, 15, 0.4) 0px 9px 24px, 0 0 0 1px rgba(255, 255, 255, 0.1);

  --scalar-button-1: #f6f6f6;
  --scalar-button-1-color: #000;
  --scalar-button-1-hover: #e7e7e7;

  --scalar-color-green: #3dd68c;
  --scalar-color-red: #f66f81;
  --scalar-color-yellow: #f9b44e;
  --scalar-color-blue: #5c73e7;
  --scalar-color-orange: #ff8d4d;
  --scalar-color-purple: #b191f9;
}
/* Sidebar */
.light-mode .t-doc__sidebar {
  --scalar-sidebar-background-1: var(--scalar-background-1);
  --scalar-sidebar-item-hover-color: currentColor;
  --scalar-sidebar-item-hover-background: var(--scalar-background-2);
  --scalar-sidebar-item-active-background: var(--scalar-background-accent);
  --scalar-sidebar-border-color: var(--scalar-border-color);
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-accent);
  --scalar-sidebar-search-background: var(--scalar-background-2);
  --scalar-sidebar-search-border-color: var(--scalar-sidebar-border-color);
  --scalar-sidebar-search-color: var(--scalar-color-3);
}

.dark-mode .sidebar {
  --scalar-sidebar-background-1: #161618;
  --scalar-sidebar-item-hover-color: var(--scalar-color-accent);
  --scalar-sidebar-item-hover-background: transparent;
  --scalar-sidebar-item-active-background: transparent;
  --scalar-sidebar-border-color: transparent;
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-accent);
  --scalar-sidebar-search-background: #252529;
  --scalar-sidebar-search-border-color: transparent;
  --scalar-sidebar-search-color: var(--scalar-color-3);
}
`;
var Scalar = /* @__PURE__ */ __name((givenConfiguration) => {
  const configuration = {
    ...DEFAULT_CONFIGURATION,
    ...givenConfiguration
  };
  return async (c2) => c2.html(
    /* html */
    `${getHtmlDocument(configuration, customTheme)}`
  );
}, "Scalar");

// node_modules/hono/dist/middleware/cors/index.js
var cors = /* @__PURE__ */ __name((options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c2, next) {
    function set(key, value) {
      c2.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = findAllowOrigin(c2.req.header("origin") || "", c2);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.origin !== "*") {
      const existingVary = c2.req.header("Vary");
      if (existingVary) {
        set("Vary", existingVary);
      } else {
        set("Vary", "Origin");
      }
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c2.req.method === "OPTIONS") {
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = findAllowMethods(c2.req.header("origin") || "", c2);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c2.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c2.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c2.res.headers.delete("Content-Length");
      c2.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c2.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
  }, "cors2");
}, "cors");

// apps/api/iaRoute.ts
var iaRoute = new Hono2().post(
  "/generate",
  w({
    tags: ["IA"],
    summary: "Generar una prenda con IA",
    description: "Genera una prenda de vestir para el inventario.",
    requestBody: {
      content: {
        "application/json": {
          schema: i2(
            external_exports.object({
              instructions: external_exports.string().openapi({
                description: "Instrucciones para la IA",
                example: "Genera una nueva prenda de vestir"
              })
            })
          )
        }
      }
    },
    responses: {
      201: {
        description: "Generaci\xF3n iniciada exitosamente",
        content: {
          "application/json": {
            schema: i2(
              external_exports.object({
                data: external_exports.literal("Ok")
              })
            ),
            example: { data: "Ok" }
          }
        }
      },
      400: ErrorResponses[400],
      500: ErrorResponses[500]
    }
  }),
  validator5(
    "json",
    external_exports.object({
      instructions: external_exports.string()
    }).openapi({
      description: "Instrucciones para la IA",
      example: {
        instructions: "Genera una nueva prenda de vestir"
      }
    })
  ),
  async (c2) => {
    const body = c2.req.valid("json");
    await IA.generateClothe(body.instructions);
    return c2.json({ data: "Ok" }, 201);
  }
);

// apps/api/app.ts
var app = new Hono2();
var routes = app.use(
  cors({
    origin: "https://zf2diku5sbjcj3zyenbqhzzeyq0nnnvm.lambda-url.us-east-1.on.aws/"
  })
).route("/api/clothes", clothesRoute).route("/api/ia", iaRoute).get(
  "/openapi",
  h(app, {
    documentation: {
      info: {
        title: "Hono API",
        version: "1.0.0",
        description: "Greeting API"
      },
      servers: [
        { url: "http://localhost:3001", description: "Local Server" },
        {
          url: "https://zf2diku5sbjcj3zyenbqhzzeyq0nnnvm.lambda-url.us-east-1.on.aws/",
          description: "Staging server"
        }
      ]
    }
  })
).get(
  "/docs",
  Scalar({
    theme: "saturn",
    url: "/openapi"
  })
).onError((error, c2) => {
  if (error instanceof HTTPException) {
    console.error("http error:", error);
    return c2.json(
      {
        type: "validation",
        code: ErrorCodes.Validation.INVALID_PARAMETER,
        message: "Invalid request"
      },
      400
    );
  }
  console.error("unhandled error:", error);
  return c2.json(
    {
      type: "internal",
      code: ErrorCodes.Server.INTERNAL_ERROR,
      message: "Internal server error"
    },
    500
  );
});
var app_default = routes;

// apps/api/handler.ts
var handler = handle(app_default);
export {
  handler
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
//# sourceMappingURL=bundle.mjs.map
