module.export({_parse:()=>_parse,parse:()=>parse,_parseAsync:()=>_parseAsync,parseAsync:()=>parseAsync,_safeParse:()=>_safeParse,safeParse:()=>safeParse,_safeParseAsync:()=>_safeParseAsync,safeParseAsync:()=>safeParseAsync,_encode:()=>_encode,encode:()=>encode,_decode:()=>_decode,decode:()=>decode,_encodeAsync:()=>_encodeAsync,encodeAsync:()=>encodeAsync,_decodeAsync:()=>_decodeAsync,decodeAsync:()=>decodeAsync,_safeEncode:()=>_safeEncode,safeEncode:()=>safeEncode,_safeDecode:()=>_safeDecode,safeDecode:()=>safeDecode,_safeEncodeAsync:()=>_safeEncodeAsync,safeEncodeAsync:()=>safeEncodeAsync,_safeDecodeAsync:()=>_safeDecodeAsync,safeDecodeAsync:()=>safeDecodeAsync},true);let core;module.link("./core.js",{"*"(v){core=v}},0);let errors;module.link("./errors.js",{"*"(v){errors=v}},1);let util;module.link("./util.js",{"*"(v){util=v}},2);


const _parse = (_Err) => (schema, value, _ctx, _params) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new core.$ZodAsyncError();
    }
    if (result.issues.length) {
        const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())));
        util.captureStackTrace(e, _params?.callee);
        throw e;
    }
    return result.value;
};
const parse = /* @__PURE__*/ _parse(errors.$ZodRealError);
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    if (result.issues.length) {
        const e = new (params?.Err ?? _Err)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())));
        util.captureStackTrace(e, params?.callee);
        throw e;
    }
    return result.value;
};
const parseAsync = /* @__PURE__*/ _parseAsync(errors.$ZodRealError);
const _safeParse = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new core.$ZodAsyncError();
    }
    return result.issues.length
        ? {
            success: false,
            error: new (_Err ?? errors.$ZodError)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))),
        }
        : { success: true, data: result.value };
};
const safeParse = /* @__PURE__*/ _safeParse(errors.$ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    return result.issues.length
        ? {
            success: false,
            error: new _Err(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))),
        }
        : { success: true, data: result.value };
};
const safeParseAsync = /* @__PURE__*/ _safeParseAsync(errors.$ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
    return _parse(_Err)(schema, value, ctx);
};
const encode = /* @__PURE__*/ _encode(errors.$ZodRealError);
const _decode = (_Err) => (schema, value, _ctx) => {
    return _parse(_Err)(schema, value, _ctx);
};
const decode = /* @__PURE__*/ _decode(errors.$ZodRealError);
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
    return _parseAsync(_Err)(schema, value, ctx);
};
const encodeAsync = /* @__PURE__*/ _encodeAsync(errors.$ZodRealError);
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
    return _parseAsync(_Err)(schema, value, _ctx);
};
const decodeAsync = /* @__PURE__*/ _decodeAsync(errors.$ZodRealError);
const _safeEncode = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
    return _safeParse(_Err)(schema, value, ctx);
};
const safeEncode = /* @__PURE__*/ _safeEncode(errors.$ZodRealError);
const _safeDecode = (_Err) => (schema, value, _ctx) => {
    return _safeParse(_Err)(schema, value, _ctx);
};
const safeDecode = /* @__PURE__*/ _safeDecode(errors.$ZodRealError);
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
    return _safeParseAsync(_Err)(schema, value, ctx);
};
const safeEncodeAsync = /* @__PURE__*/ _safeEncodeAsync(errors.$ZodRealError);
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
    return _safeParseAsync(_Err)(schema, value, _ctx);
};
const safeDecodeAsync = /* @__PURE__*/ _safeDecodeAsync(errors.$ZodRealError);
