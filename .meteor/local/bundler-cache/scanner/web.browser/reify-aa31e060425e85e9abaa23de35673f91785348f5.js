module.export({parse:()=>parse,parseAsync:()=>parseAsync,safeParse:()=>safeParse,safeParseAsync:()=>safeParseAsync,encode:()=>encode,decode:()=>decode,encodeAsync:()=>encodeAsync,decodeAsync:()=>decodeAsync,safeEncode:()=>safeEncode,safeDecode:()=>safeDecode,safeEncodeAsync:()=>safeEncodeAsync,safeDecodeAsync:()=>safeDecodeAsync},true);let core;module.link("../core/index.js",{"*"(v){core=v}},0);let ZodRealError;module.link("./errors.js",{ZodRealError(v){ZodRealError=v}},1);

const parse = /* @__PURE__ */ core._parse(ZodRealError);
const parseAsync = /* @__PURE__ */ core._parseAsync(ZodRealError);
const safeParse = /* @__PURE__ */ core._safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ core._safeParseAsync(ZodRealError);
// Codec functions
const encode = /* @__PURE__ */ core._encode(ZodRealError);
const decode = /* @__PURE__ */ core._decode(ZodRealError);
const encodeAsync = /* @__PURE__ */ core._encodeAsync(ZodRealError);
const decodeAsync = /* @__PURE__ */ core._decodeAsync(ZodRealError);
const safeEncode = /* @__PURE__ */ core._safeEncode(ZodRealError);
const safeDecode = /* @__PURE__ */ core._safeDecode(ZodRealError);
const safeEncodeAsync = /* @__PURE__ */ core._safeEncodeAsync(ZodRealError);
const safeDecodeAsync = /* @__PURE__ */ core._safeDecodeAsync(ZodRealError);
