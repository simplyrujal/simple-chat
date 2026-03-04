module.export({string:()=>string,email:()=>email,guid:()=>guid,uuid:()=>uuid,uuidv4:()=>uuidv4,uuidv6:()=>uuidv6,uuidv7:()=>uuidv7,url:()=>url,httpUrl:()=>httpUrl,emoji:()=>emoji,nanoid:()=>nanoid,cuid:()=>cuid,cuid2:()=>cuid2,ulid:()=>ulid,xid:()=>xid,ksuid:()=>ksuid,ipv4:()=>ipv4,mac:()=>mac,ipv6:()=>ipv6,cidrv4:()=>cidrv4,cidrv6:()=>cidrv6,base64:()=>base64,base64url:()=>base64url,e164:()=>e164,jwt:()=>jwt,stringFormat:()=>stringFormat,hostname:()=>hostname,hex:()=>hex,hash:()=>hash,number:()=>number,int:()=>int,float32:()=>float32,float64:()=>float64,int32:()=>int32,uint32:()=>uint32,boolean:()=>boolean,bigint:()=>bigint,int64:()=>int64,uint64:()=>uint64,symbol:()=>symbol,undefined:()=>_undefined,null:()=>_null,any:()=>any,unknown:()=>unknown,never:()=>never,void:()=>_void,date:()=>date,array:()=>array,keyof:()=>keyof,object:()=>object,strictObject:()=>strictObject,looseObject:()=>looseObject,union:()=>union,xor:()=>xor,discriminatedUnion:()=>discriminatedUnion,intersection:()=>intersection,tuple:()=>tuple,record:()=>record,partialRecord:()=>partialRecord,looseRecord:()=>looseRecord,map:()=>map,set:()=>set,enum:()=>_enum,nativeEnum:()=>nativeEnum,literal:()=>literal,file:()=>file,transform:()=>transform,optional:()=>optional,exactOptional:()=>exactOptional,nullable:()=>nullable,nullish:()=>nullish,_default:()=>_default,prefault:()=>prefault,nonoptional:()=>nonoptional,success:()=>success,catch:()=>_catch,nan:()=>nan,pipe:()=>pipe,codec:()=>codec,readonly:()=>readonly,templateLiteral:()=>templateLiteral,lazy:()=>lazy,promise:()=>promise,_function:()=>_function,function:()=>_function,check:()=>check,custom:()=>custom,refine:()=>refine,superRefine:()=>superRefine,instanceof:()=>_instanceof,json:()=>json,preprocess:()=>preprocess});module.export({ZodType:()=>ZodType,_ZodString:()=>_ZodString,ZodString:()=>ZodString,ZodStringFormat:()=>ZodStringFormat,ZodEmail:()=>ZodEmail,ZodGUID:()=>ZodGUID,ZodUUID:()=>ZodUUID,ZodURL:()=>ZodURL,ZodEmoji:()=>ZodEmoji,ZodNanoID:()=>ZodNanoID,ZodCUID:()=>ZodCUID,ZodCUID2:()=>ZodCUID2,ZodULID:()=>ZodULID,ZodXID:()=>ZodXID,ZodKSUID:()=>ZodKSUID,ZodIPv4:()=>ZodIPv4,ZodMAC:()=>ZodMAC,ZodIPv6:()=>ZodIPv6,ZodCIDRv4:()=>ZodCIDRv4,ZodCIDRv6:()=>ZodCIDRv6,ZodBase64:()=>ZodBase64,ZodBase64URL:()=>ZodBase64URL,ZodE164:()=>ZodE164,ZodJWT:()=>ZodJWT,ZodCustomStringFormat:()=>ZodCustomStringFormat,ZodNumber:()=>ZodNumber,ZodNumberFormat:()=>ZodNumberFormat,ZodBoolean:()=>ZodBoolean,ZodBigInt:()=>ZodBigInt,ZodBigIntFormat:()=>ZodBigIntFormat,ZodSymbol:()=>ZodSymbol,ZodUndefined:()=>ZodUndefined,ZodNull:()=>ZodNull,ZodAny:()=>ZodAny,ZodUnknown:()=>ZodUnknown,ZodNever:()=>ZodNever,ZodVoid:()=>ZodVoid,ZodDate:()=>ZodDate,ZodArray:()=>ZodArray,ZodObject:()=>ZodObject,ZodUnion:()=>ZodUnion,ZodXor:()=>ZodXor,ZodDiscriminatedUnion:()=>ZodDiscriminatedUnion,ZodIntersection:()=>ZodIntersection,ZodTuple:()=>ZodTuple,ZodRecord:()=>ZodRecord,ZodMap:()=>ZodMap,ZodSet:()=>ZodSet,ZodEnum:()=>ZodEnum,ZodLiteral:()=>ZodLiteral,ZodFile:()=>ZodFile,ZodTransform:()=>ZodTransform,ZodOptional:()=>ZodOptional,ZodExactOptional:()=>ZodExactOptional,ZodNullable:()=>ZodNullable,ZodDefault:()=>ZodDefault,ZodPrefault:()=>ZodPrefault,ZodNonOptional:()=>ZodNonOptional,ZodSuccess:()=>ZodSuccess,ZodCatch:()=>ZodCatch,ZodNaN:()=>ZodNaN,ZodPipe:()=>ZodPipe,ZodCodec:()=>ZodCodec,ZodReadonly:()=>ZodReadonly,ZodTemplateLiteral:()=>ZodTemplateLiteral,ZodLazy:()=>ZodLazy,ZodPromise:()=>ZodPromise,ZodFunction:()=>ZodFunction,ZodCustom:()=>ZodCustom,describe:()=>describe,meta:()=>meta,stringbool:()=>stringbool},true);let core;module.link("../core/index.js",{"*"(v){core=v}},0);let util;module.link("../core/index.js",{util(v){util=v}},1);let processors;module.link("../core/json-schema-processors.js",{"*"(v){processors=v}},2);let createStandardJSONSchemaMethod,createToJSONSchemaMethod;module.link("../core/to-json-schema.js",{createStandardJSONSchemaMethod(v){createStandardJSONSchemaMethod=v},createToJSONSchemaMethod(v){createToJSONSchemaMethod=v}},3);let checks;module.link("./checks.js",{"*"(v){checks=v}},4);let iso;module.link("./iso.js",{"*"(v){iso=v}},5);let parse;module.link("./parse.js",{"*"(v){parse=v}},6);






const ZodType = /*@__PURE__*/ core.$constructor("ZodType", (inst, def) => {
    core.$ZodType.init(inst, def);
    Object.assign(inst["~standard"], {
        jsonSchema: {
            input: createStandardJSONSchemaMethod(inst, "input"),
            output: createStandardJSONSchemaMethod(inst, "output"),
        },
    });
    inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
    inst.def = def;
    inst.type = def.type;
    Object.defineProperty(inst, "_def", { value: def });
    // base methods
    inst.check = (...checks) => {
        return inst.clone(util.mergeDefs(def, {
            checks: [
                ...(def.checks ?? []),
                ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch),
            ],
        }), {
            parent: true,
        });
    };
    inst.with = inst.check;
    inst.clone = (def, params) => core.clone(inst, def, params);
    inst.brand = () => inst;
    inst.register = ((reg, meta) => {
        reg.add(inst, meta);
        return inst;
    });
    // parsing
    inst.parse = (data, params) => parse.parse(inst, data, params, { callee: inst.parse });
    inst.safeParse = (data, params) => parse.safeParse(inst, data, params);
    inst.parseAsync = async (data, params) => parse.parseAsync(inst, data, params, { callee: inst.parseAsync });
    inst.safeParseAsync = async (data, params) => parse.safeParseAsync(inst, data, params);
    inst.spa = inst.safeParseAsync;
    // encoding/decoding
    inst.encode = (data, params) => parse.encode(inst, data, params);
    inst.decode = (data, params) => parse.decode(inst, data, params);
    inst.encodeAsync = async (data, params) => parse.encodeAsync(inst, data, params);
    inst.decodeAsync = async (data, params) => parse.decodeAsync(inst, data, params);
    inst.safeEncode = (data, params) => parse.safeEncode(inst, data, params);
    inst.safeDecode = (data, params) => parse.safeDecode(inst, data, params);
    inst.safeEncodeAsync = async (data, params) => parse.safeEncodeAsync(inst, data, params);
    inst.safeDecodeAsync = async (data, params) => parse.safeDecodeAsync(inst, data, params);
    // refinements
    inst.refine = (check, params) => inst.check(refine(check, params));
    inst.superRefine = (refinement) => inst.check(superRefine(refinement));
    inst.overwrite = (fn) => inst.check(checks.overwrite(fn));
    // wrappers
    inst.optional = () => optional(inst);
    inst.exactOptional = () => exactOptional(inst);
    inst.nullable = () => nullable(inst);
    inst.nullish = () => optional(nullable(inst));
    inst.nonoptional = (params) => nonoptional(inst, params);
    inst.array = () => array(inst);
    inst.or = (arg) => union([inst, arg]);
    inst.and = (arg) => intersection(inst, arg);
    inst.transform = (tx) => pipe(inst, transform(tx));
    inst.default = (def) => _default(inst, def);
    inst.prefault = (def) => prefault(inst, def);
    // inst.coalesce = (def, params) => coalesce(inst, def, params);
    inst.catch = (params) => _catch(inst, params);
    inst.pipe = (target) => pipe(inst, target);
    inst.readonly = () => readonly(inst);
    // meta
    inst.describe = (description) => {
        const cl = inst.clone();
        core.globalRegistry.add(cl, { description });
        return cl;
    };
    Object.defineProperty(inst, "description", {
        get() {
            return core.globalRegistry.get(inst)?.description;
        },
        configurable: true,
    });
    inst.meta = (...args) => {
        if (args.length === 0) {
            return core.globalRegistry.get(inst);
        }
        const cl = inst.clone();
        core.globalRegistry.add(cl, args[0]);
        return cl;
    };
    // helpers
    inst.isOptional = () => inst.safeParse(undefined).success;
    inst.isNullable = () => inst.safeParse(null).success;
    inst.apply = (fn) => fn(inst);
    return inst;
});
/** @internal */
const _ZodString = /*@__PURE__*/ core.$constructor("_ZodString", (inst, def) => {
    core.$ZodString.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.stringProcessor(inst, ctx, json, params);
    const bag = inst._zod.bag;
    inst.format = bag.format ?? null;
    inst.minLength = bag.minimum ?? null;
    inst.maxLength = bag.maximum ?? null;
    // validations
    inst.regex = (...args) => inst.check(checks.regex(...args));
    inst.includes = (...args) => inst.check(checks.includes(...args));
    inst.startsWith = (...args) => inst.check(checks.startsWith(...args));
    inst.endsWith = (...args) => inst.check(checks.endsWith(...args));
    inst.min = (...args) => inst.check(checks.minLength(...args));
    inst.max = (...args) => inst.check(checks.maxLength(...args));
    inst.length = (...args) => inst.check(checks.length(...args));
    inst.nonempty = (...args) => inst.check(checks.minLength(1, ...args));
    inst.lowercase = (params) => inst.check(checks.lowercase(params));
    inst.uppercase = (params) => inst.check(checks.uppercase(params));
    // transforms
    inst.trim = () => inst.check(checks.trim());
    inst.normalize = (...args) => inst.check(checks.normalize(...args));
    inst.toLowerCase = () => inst.check(checks.toLowerCase());
    inst.toUpperCase = () => inst.check(checks.toUpperCase());
    inst.slugify = () => inst.check(checks.slugify());
});
const ZodString = /*@__PURE__*/ core.$constructor("ZodString", (inst, def) => {
    core.$ZodString.init(inst, def);
    _ZodString.init(inst, def);
    inst.email = (params) => inst.check(core._email(ZodEmail, params));
    inst.url = (params) => inst.check(core._url(ZodURL, params));
    inst.jwt = (params) => inst.check(core._jwt(ZodJWT, params));
    inst.emoji = (params) => inst.check(core._emoji(ZodEmoji, params));
    inst.guid = (params) => inst.check(core._guid(ZodGUID, params));
    inst.uuid = (params) => inst.check(core._uuid(ZodUUID, params));
    inst.uuidv4 = (params) => inst.check(core._uuidv4(ZodUUID, params));
    inst.uuidv6 = (params) => inst.check(core._uuidv6(ZodUUID, params));
    inst.uuidv7 = (params) => inst.check(core._uuidv7(ZodUUID, params));
    inst.nanoid = (params) => inst.check(core._nanoid(ZodNanoID, params));
    inst.guid = (params) => inst.check(core._guid(ZodGUID, params));
    inst.cuid = (params) => inst.check(core._cuid(ZodCUID, params));
    inst.cuid2 = (params) => inst.check(core._cuid2(ZodCUID2, params));
    inst.ulid = (params) => inst.check(core._ulid(ZodULID, params));
    inst.base64 = (params) => inst.check(core._base64(ZodBase64, params));
    inst.base64url = (params) => inst.check(core._base64url(ZodBase64URL, params));
    inst.xid = (params) => inst.check(core._xid(ZodXID, params));
    inst.ksuid = (params) => inst.check(core._ksuid(ZodKSUID, params));
    inst.ipv4 = (params) => inst.check(core._ipv4(ZodIPv4, params));
    inst.ipv6 = (params) => inst.check(core._ipv6(ZodIPv6, params));
    inst.cidrv4 = (params) => inst.check(core._cidrv4(ZodCIDRv4, params));
    inst.cidrv6 = (params) => inst.check(core._cidrv6(ZodCIDRv6, params));
    inst.e164 = (params) => inst.check(core._e164(ZodE164, params));
    // iso
    inst.datetime = (params) => inst.check(iso.datetime(params));
    inst.date = (params) => inst.check(iso.date(params));
    inst.time = (params) => inst.check(iso.time(params));
    inst.duration = (params) => inst.check(iso.duration(params));
});
function string(params) {
    return core._string(ZodString, params);
}
const ZodStringFormat = /*@__PURE__*/ core.$constructor("ZodStringFormat", (inst, def) => {
    core.$ZodStringFormat.init(inst, def);
    _ZodString.init(inst, def);
});
const ZodEmail = /*@__PURE__*/ core.$constructor("ZodEmail", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodEmail.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function email(params) {
    return core._email(ZodEmail, params);
}
const ZodGUID = /*@__PURE__*/ core.$constructor("ZodGUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodGUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function guid(params) {
    return core._guid(ZodGUID, params);
}
const ZodUUID = /*@__PURE__*/ core.$constructor("ZodUUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodUUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function uuid(params) {
    return core._uuid(ZodUUID, params);
}
function uuidv4(params) {
    return core._uuidv4(ZodUUID, params);
}
// ZodUUIDv6
function uuidv6(params) {
    return core._uuidv6(ZodUUID, params);
}
// ZodUUIDv7
function uuidv7(params) {
    return core._uuidv7(ZodUUID, params);
}
const ZodURL = /*@__PURE__*/ core.$constructor("ZodURL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodURL.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function url(params) {
    return core._url(ZodURL, params);
}
function httpUrl(params) {
    return core._url(ZodURL, {
        protocol: /^https?$/,
        hostname: core.regexes.domain,
        ...util.normalizeParams(params),
    });
}
const ZodEmoji = /*@__PURE__*/ core.$constructor("ZodEmoji", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodEmoji.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function emoji(params) {
    return core._emoji(ZodEmoji, params);
}
const ZodNanoID = /*@__PURE__*/ core.$constructor("ZodNanoID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodNanoID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function nanoid(params) {
    return core._nanoid(ZodNanoID, params);
}
const ZodCUID = /*@__PURE__*/ core.$constructor("ZodCUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodCUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cuid(params) {
    return core._cuid(ZodCUID, params);
}
const ZodCUID2 = /*@__PURE__*/ core.$constructor("ZodCUID2", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodCUID2.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cuid2(params) {
    return core._cuid2(ZodCUID2, params);
}
const ZodULID = /*@__PURE__*/ core.$constructor("ZodULID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodULID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ulid(params) {
    return core._ulid(ZodULID, params);
}
const ZodXID = /*@__PURE__*/ core.$constructor("ZodXID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodXID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function xid(params) {
    return core._xid(ZodXID, params);
}
const ZodKSUID = /*@__PURE__*/ core.$constructor("ZodKSUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodKSUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ksuid(params) {
    return core._ksuid(ZodKSUID, params);
}
const ZodIPv4 = /*@__PURE__*/ core.$constructor("ZodIPv4", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodIPv4.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv4(params) {
    return core._ipv4(ZodIPv4, params);
}
const ZodMAC = /*@__PURE__*/ core.$constructor("ZodMAC", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodMAC.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function mac(params) {
    return core._mac(ZodMAC, params);
}
const ZodIPv6 = /*@__PURE__*/ core.$constructor("ZodIPv6", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodIPv6.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv6(params) {
    return core._ipv6(ZodIPv6, params);
}
const ZodCIDRv4 = /*@__PURE__*/ core.$constructor("ZodCIDRv4", (inst, def) => {
    core.$ZodCIDRv4.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
    return core._cidrv4(ZodCIDRv4, params);
}
const ZodCIDRv6 = /*@__PURE__*/ core.$constructor("ZodCIDRv6", (inst, def) => {
    core.$ZodCIDRv6.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
    return core._cidrv6(ZodCIDRv6, params);
}
const ZodBase64 = /*@__PURE__*/ core.$constructor("ZodBase64", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodBase64.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64(params) {
    return core._base64(ZodBase64, params);
}
const ZodBase64URL = /*@__PURE__*/ core.$constructor("ZodBase64URL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodBase64URL.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64url(params) {
    return core._base64url(ZodBase64URL, params);
}
const ZodE164 = /*@__PURE__*/ core.$constructor("ZodE164", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodE164.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function e164(params) {
    return core._e164(ZodE164, params);
}
const ZodJWT = /*@__PURE__*/ core.$constructor("ZodJWT", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodJWT.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function jwt(params) {
    return core._jwt(ZodJWT, params);
}
const ZodCustomStringFormat = /*@__PURE__*/ core.$constructor("ZodCustomStringFormat", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodCustomStringFormat.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
    return core._stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname(_params) {
    return core._stringFormat(ZodCustomStringFormat, "hostname", core.regexes.hostname, _params);
}
function hex(_params) {
    return core._stringFormat(ZodCustomStringFormat, "hex", core.regexes.hex, _params);
}
function hash(alg, params) {
    const enc = params?.enc ?? "hex";
    const format = `${alg}_${enc}`;
    const regex = core.regexes[format];
    if (!regex)
        throw new Error(`Unrecognized hash format: ${format}`);
    return core._stringFormat(ZodCustomStringFormat, format, regex, params);
}
const ZodNumber = /*@__PURE__*/ core.$constructor("ZodNumber", (inst, def) => {
    core.$ZodNumber.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.numberProcessor(inst, ctx, json, params);
    inst.gt = (value, params) => inst.check(checks.gt(value, params));
    inst.gte = (value, params) => inst.check(checks.gte(value, params));
    inst.min = (value, params) => inst.check(checks.gte(value, params));
    inst.lt = (value, params) => inst.check(checks.lt(value, params));
    inst.lte = (value, params) => inst.check(checks.lte(value, params));
    inst.max = (value, params) => inst.check(checks.lte(value, params));
    inst.int = (params) => inst.check(int(params));
    inst.safe = (params) => inst.check(int(params));
    inst.positive = (params) => inst.check(checks.gt(0, params));
    inst.nonnegative = (params) => inst.check(checks.gte(0, params));
    inst.negative = (params) => inst.check(checks.lt(0, params));
    inst.nonpositive = (params) => inst.check(checks.lte(0, params));
    inst.multipleOf = (value, params) => inst.check(checks.multipleOf(value, params));
    inst.step = (value, params) => inst.check(checks.multipleOf(value, params));
    // inst.finite = (params) => inst.check(core.finite(params));
    inst.finite = () => inst;
    const bag = inst._zod.bag;
    inst.minValue =
        Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
    inst.maxValue =
        Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
    inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
    inst.isFinite = true;
    inst.format = bag.format ?? null;
});
function number(params) {
    return core._number(ZodNumber, params);
}
const ZodNumberFormat = /*@__PURE__*/ core.$constructor("ZodNumberFormat", (inst, def) => {
    core.$ZodNumberFormat.init(inst, def);
    ZodNumber.init(inst, def);
});
function int(params) {
    return core._int(ZodNumberFormat, params);
}
function float32(params) {
    return core._float32(ZodNumberFormat, params);
}
function float64(params) {
    return core._float64(ZodNumberFormat, params);
}
function int32(params) {
    return core._int32(ZodNumberFormat, params);
}
function uint32(params) {
    return core._uint32(ZodNumberFormat, params);
}
const ZodBoolean = /*@__PURE__*/ core.$constructor("ZodBoolean", (inst, def) => {
    core.$ZodBoolean.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
    return core._boolean(ZodBoolean, params);
}
const ZodBigInt = /*@__PURE__*/ core.$constructor("ZodBigInt", (inst, def) => {
    core.$ZodBigInt.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.bigintProcessor(inst, ctx, json, params);
    inst.gte = (value, params) => inst.check(checks.gte(value, params));
    inst.min = (value, params) => inst.check(checks.gte(value, params));
    inst.gt = (value, params) => inst.check(checks.gt(value, params));
    inst.gte = (value, params) => inst.check(checks.gte(value, params));
    inst.min = (value, params) => inst.check(checks.gte(value, params));
    inst.lt = (value, params) => inst.check(checks.lt(value, params));
    inst.lte = (value, params) => inst.check(checks.lte(value, params));
    inst.max = (value, params) => inst.check(checks.lte(value, params));
    inst.positive = (params) => inst.check(checks.gt(BigInt(0), params));
    inst.negative = (params) => inst.check(checks.lt(BigInt(0), params));
    inst.nonpositive = (params) => inst.check(checks.lte(BigInt(0), params));
    inst.nonnegative = (params) => inst.check(checks.gte(BigInt(0), params));
    inst.multipleOf = (value, params) => inst.check(checks.multipleOf(value, params));
    const bag = inst._zod.bag;
    inst.minValue = bag.minimum ?? null;
    inst.maxValue = bag.maximum ?? null;
    inst.format = bag.format ?? null;
});
function bigint(params) {
    return core._bigint(ZodBigInt, params);
}
const ZodBigIntFormat = /*@__PURE__*/ core.$constructor("ZodBigIntFormat", (inst, def) => {
    core.$ZodBigIntFormat.init(inst, def);
    ZodBigInt.init(inst, def);
});
// int64
function int64(params) {
    return core._int64(ZodBigIntFormat, params);
}
// uint64
function uint64(params) {
    return core._uint64(ZodBigIntFormat, params);
}
const ZodSymbol = /*@__PURE__*/ core.$constructor("ZodSymbol", (inst, def) => {
    core.$ZodSymbol.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.symbolProcessor(inst, ctx, json, params);
});
function symbol(params) {
    return core._symbol(ZodSymbol, params);
}
const ZodUndefined = /*@__PURE__*/ core.$constructor("ZodUndefined", (inst, def) => {
    core.$ZodUndefined.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.undefinedProcessor(inst, ctx, json, params);
});
function _undefined(params) {
    return core._undefined(ZodUndefined, params);
}

const ZodNull = /*@__PURE__*/ core.$constructor("ZodNull", (inst, def) => {
    core.$ZodNull.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.nullProcessor(inst, ctx, json, params);
});
function _null(params) {
    return core._null(ZodNull, params);
}

const ZodAny = /*@__PURE__*/ core.$constructor("ZodAny", (inst, def) => {
    core.$ZodAny.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.anyProcessor(inst, ctx, json, params);
});
function any() {
    return core._any(ZodAny);
}
const ZodUnknown = /*@__PURE__*/ core.$constructor("ZodUnknown", (inst, def) => {
    core.$ZodUnknown.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.unknownProcessor(inst, ctx, json, params);
});
function unknown() {
    return core._unknown(ZodUnknown);
}
const ZodNever = /*@__PURE__*/ core.$constructor("ZodNever", (inst, def) => {
    core.$ZodNever.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.neverProcessor(inst, ctx, json, params);
});
function never(params) {
    return core._never(ZodNever, params);
}
const ZodVoid = /*@__PURE__*/ core.$constructor("ZodVoid", (inst, def) => {
    core.$ZodVoid.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.voidProcessor(inst, ctx, json, params);
});
function _void(params) {
    return core._void(ZodVoid, params);
}

const ZodDate = /*@__PURE__*/ core.$constructor("ZodDate", (inst, def) => {
    core.$ZodDate.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.dateProcessor(inst, ctx, json, params);
    inst.min = (value, params) => inst.check(checks.gte(value, params));
    inst.max = (value, params) => inst.check(checks.lte(value, params));
    const c = inst._zod.bag;
    inst.minDate = c.minimum ? new Date(c.minimum) : null;
    inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date(params) {
    return core._date(ZodDate, params);
}
const ZodArray = /*@__PURE__*/ core.$constructor("ZodArray", (inst, def) => {
    core.$ZodArray.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.arrayProcessor(inst, ctx, json, params);
    inst.element = def.element;
    inst.min = (minLength, params) => inst.check(checks.minLength(minLength, params));
    inst.nonempty = (params) => inst.check(checks.minLength(1, params));
    inst.max = (maxLength, params) => inst.check(checks.maxLength(maxLength, params));
    inst.length = (len, params) => inst.check(checks.length(len, params));
    inst.unwrap = () => inst.element;
});
function array(element, params) {
    return core._array(ZodArray, element, params);
}
// .keyof
function keyof(schema) {
    const shape = schema._zod.def.shape;
    return _enum(Object.keys(shape));
}
const ZodObject = /*@__PURE__*/ core.$constructor("ZodObject", (inst, def) => {
    core.$ZodObjectJIT.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.objectProcessor(inst, ctx, json, params);
    util.defineLazy(inst, "shape", () => {
        return def.shape;
    });
    inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
    inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall: catchall });
    inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
    inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
    inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
    inst.strip = () => inst.clone({ ...inst._zod.def, catchall: undefined });
    inst.extend = (incoming) => {
        return util.extend(inst, incoming);
    };
    inst.safeExtend = (incoming) => {
        return util.safeExtend(inst, incoming);
    };
    inst.merge = (other) => util.merge(inst, other);
    inst.pick = (mask) => util.pick(inst, mask);
    inst.omit = (mask) => util.omit(inst, mask);
    inst.partial = (...args) => util.partial(ZodOptional, inst, args[0]);
    inst.required = (...args) => util.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
    const def = {
        type: "object",
        shape: shape ?? {},
        ...util.normalizeParams(params),
    };
    return new ZodObject(def);
}
// strictObject
function strictObject(shape, params) {
    return new ZodObject({
        type: "object",
        shape,
        catchall: never(),
        ...util.normalizeParams(params),
    });
}
// looseObject
function looseObject(shape, params) {
    return new ZodObject({
        type: "object",
        shape,
        catchall: unknown(),
        ...util.normalizeParams(params),
    });
}
const ZodUnion = /*@__PURE__*/ core.$constructor("ZodUnion", (inst, def) => {
    core.$ZodUnion.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
    inst.options = def.options;
});
function union(options, params) {
    return new ZodUnion({
        type: "union",
        options: options,
        ...util.normalizeParams(params),
    });
}
const ZodXor = /*@__PURE__*/ core.$constructor("ZodXor", (inst, def) => {
    ZodUnion.init(inst, def);
    core.$ZodXor.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
    inst.options = def.options;
});
/** Creates an exclusive union (XOR) where exactly one option must match.
 * Unlike regular unions that succeed when any option matches, xor fails if
 * zero or more than one option matches the input. */
function xor(options, params) {
    return new ZodXor({
        type: "union",
        options: options,
        inclusive: false,
        ...util.normalizeParams(params),
    });
}
const ZodDiscriminatedUnion = /*@__PURE__*/ core.$constructor("ZodDiscriminatedUnion", (inst, def) => {
    ZodUnion.init(inst, def);
    core.$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
    // const [options, params] = args;
    return new ZodDiscriminatedUnion({
        type: "union",
        options,
        discriminator,
        ...util.normalizeParams(params),
    });
}
const ZodIntersection = /*@__PURE__*/ core.$constructor("ZodIntersection", (inst, def) => {
    core.$ZodIntersection.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
    return new ZodIntersection({
        type: "intersection",
        left: left,
        right: right,
    });
}
const ZodTuple = /*@__PURE__*/ core.$constructor("ZodTuple", (inst, def) => {
    core.$ZodTuple.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.tupleProcessor(inst, ctx, json, params);
    inst.rest = (rest) => inst.clone({
        ...inst._zod.def,
        rest: rest,
    });
});
function tuple(items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof core.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new ZodTuple({
        type: "tuple",
        items: items,
        rest,
        ...util.normalizeParams(params),
    });
}
const ZodRecord = /*@__PURE__*/ core.$constructor("ZodRecord", (inst, def) => {
    core.$ZodRecord.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.recordProcessor(inst, ctx, json, params);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
// type alksjf = core.output<core.$ZodRecordKey>;
function partialRecord(keyType, valueType, params) {
    const k = core.clone(keyType);
    k._zod.values = undefined;
    return new ZodRecord({
        type: "record",
        keyType: k,
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
function looseRecord(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        mode: "loose",
        ...util.normalizeParams(params),
    });
}
const ZodMap = /*@__PURE__*/ core.$constructor("ZodMap", (inst, def) => {
    core.$ZodMap.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.mapProcessor(inst, ctx, json, params);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
    inst.min = (...args) => inst.check(core._minSize(...args));
    inst.nonempty = (params) => inst.check(core._minSize(1, params));
    inst.max = (...args) => inst.check(core._maxSize(...args));
    inst.size = (...args) => inst.check(core._size(...args));
});
function map(keyType, valueType, params) {
    return new ZodMap({
        type: "map",
        keyType: keyType,
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
const ZodSet = /*@__PURE__*/ core.$constructor("ZodSet", (inst, def) => {
    core.$ZodSet.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.setProcessor(inst, ctx, json, params);
    inst.min = (...args) => inst.check(core._minSize(...args));
    inst.nonempty = (params) => inst.check(core._minSize(1, params));
    inst.max = (...args) => inst.check(core._maxSize(...args));
    inst.size = (...args) => inst.check(core._size(...args));
});
function set(valueType, params) {
    return new ZodSet({
        type: "set",
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
const ZodEnum = /*@__PURE__*/ core.$constructor("ZodEnum", (inst, def) => {
    core.$ZodEnum.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.enumProcessor(inst, ctx, json, params);
    inst.enum = def.entries;
    inst.options = Object.values(def.entries);
    const keys = new Set(Object.keys(def.entries));
    inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) {
            if (keys.has(value)) {
                newEntries[value] = def.entries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ...util.normalizeParams(params),
            entries: newEntries,
        });
    };
    inst.exclude = (values, params) => {
        const newEntries = { ...def.entries };
        for (const value of values) {
            if (keys.has(value)) {
                delete newEntries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ...util.normalizeParams(params),
            entries: newEntries,
        });
    };
});
function _enum(values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    return new ZodEnum({
        type: "enum",
        entries,
        ...util.normalizeParams(params),
    });
}

/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function nativeEnum(entries, params) {
    return new ZodEnum({
        type: "enum",
        entries,
        ...util.normalizeParams(params),
    });
}
const ZodLiteral = /*@__PURE__*/ core.$constructor("ZodLiteral", (inst, def) => {
    core.$ZodLiteral.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.literalProcessor(inst, ctx, json, params);
    inst.values = new Set(def.values);
    Object.defineProperty(inst, "value", {
        get() {
            if (def.values.length > 1) {
                throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
            }
            return def.values[0];
        },
    });
});
function literal(value, params) {
    return new ZodLiteral({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ...util.normalizeParams(params),
    });
}
const ZodFile = /*@__PURE__*/ core.$constructor("ZodFile", (inst, def) => {
    core.$ZodFile.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.fileProcessor(inst, ctx, json, params);
    inst.min = (size, params) => inst.check(core._minSize(size, params));
    inst.max = (size, params) => inst.check(core._maxSize(size, params));
    inst.mime = (types, params) => inst.check(core._mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
    return core._file(ZodFile, params);
}
const ZodTransform = /*@__PURE__*/ core.$constructor("ZodTransform", (inst, def) => {
    core.$ZodTransform.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.transformProcessor(inst, ctx, json, params);
    inst._zod.parse = (payload, _ctx) => {
        if (_ctx.direction === "backward") {
            throw new core.$ZodEncodeError(inst.constructor.name);
        }
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(util.issue(issue, payload.value, def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                _issue.input ?? (_issue.input = payload.value);
                _issue.inst ?? (_issue.inst = inst);
                // _issue.continue ??= true;
                payload.issues.push(util.issue(_issue));
            }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) {
            return output.then((output) => {
                payload.value = output;
                return payload;
            });
        }
        payload.value = output;
        return payload;
    };
});
function transform(fn) {
    return new ZodTransform({
        type: "transform",
        transform: fn,
    });
}
const ZodOptional = /*@__PURE__*/ core.$constructor("ZodOptional", (inst, def) => {
    core.$ZodOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.optionalProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
    return new ZodOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodExactOptional = /*@__PURE__*/ core.$constructor("ZodExactOptional", (inst, def) => {
    core.$ZodExactOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.optionalProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
    return new ZodExactOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodNullable = /*@__PURE__*/ core.$constructor("ZodNullable", (inst, def) => {
    core.$ZodNullable.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.nullableProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
    return new ZodNullable({
        type: "nullable",
        innerType: innerType,
    });
}
// nullish
function nullish(innerType) {
    return optional(nullable(innerType));
}
const ZodDefault = /*@__PURE__*/ core.$constructor("ZodDefault", (inst, def) => {
    core.$ZodDefault.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.defaultProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
    return new ZodDefault({
        type: "default",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : util.shallowClone(defaultValue);
        },
    });
}
const ZodPrefault = /*@__PURE__*/ core.$constructor("ZodPrefault", (inst, def) => {
    core.$ZodPrefault.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.prefaultProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
    return new ZodPrefault({
        type: "prefault",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : util.shallowClone(defaultValue);
        },
    });
}
const ZodNonOptional = /*@__PURE__*/ core.$constructor("ZodNonOptional", (inst, def) => {
    core.$ZodNonOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.nonoptionalProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
    return new ZodNonOptional({
        type: "nonoptional",
        innerType: innerType,
        ...util.normalizeParams(params),
    });
}
const ZodSuccess = /*@__PURE__*/ core.$constructor("ZodSuccess", (inst, def) => {
    core.$ZodSuccess.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.successProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
    return new ZodSuccess({
        type: "success",
        innerType: innerType,
    });
}
const ZodCatch = /*@__PURE__*/ core.$constructor("ZodCatch", (inst, def) => {
    core.$ZodCatch.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.catchProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
    return new ZodCatch({
        type: "catch",
        innerType: innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
    });
}

const ZodNaN = /*@__PURE__*/ core.$constructor("ZodNaN", (inst, def) => {
    core.$ZodNaN.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.nanProcessor(inst, ctx, json, params);
});
function nan(params) {
    return core._nan(ZodNaN, params);
}
const ZodPipe = /*@__PURE__*/ core.$constructor("ZodPipe", (inst, def) => {
    core.$ZodPipe.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.pipeProcessor(inst, ctx, json, params);
    inst.in = def.in;
    inst.out = def.out;
});
function pipe(in_, out) {
    return new ZodPipe({
        type: "pipe",
        in: in_,
        out: out,
        // ...util.normalizeParams(params),
    });
}
const ZodCodec = /*@__PURE__*/ core.$constructor("ZodCodec", (inst, def) => {
    ZodPipe.init(inst, def);
    core.$ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
    return new ZodCodec({
        type: "pipe",
        in: in_,
        out: out,
        transform: params.decode,
        reverseTransform: params.encode,
    });
}
const ZodReadonly = /*@__PURE__*/ core.$constructor("ZodReadonly", (inst, def) => {
    core.$ZodReadonly.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.readonlyProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
    return new ZodReadonly({
        type: "readonly",
        innerType: innerType,
    });
}
const ZodTemplateLiteral = /*@__PURE__*/ core.$constructor("ZodTemplateLiteral", (inst, def) => {
    core.$ZodTemplateLiteral.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.templateLiteralProcessor(inst, ctx, json, params);
});
function templateLiteral(parts, params) {
    return new ZodTemplateLiteral({
        type: "template_literal",
        parts,
        ...util.normalizeParams(params),
    });
}
const ZodLazy = /*@__PURE__*/ core.$constructor("ZodLazy", (inst, def) => {
    core.$ZodLazy.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.lazyProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
    return new ZodLazy({
        type: "lazy",
        getter: getter,
    });
}
const ZodPromise = /*@__PURE__*/ core.$constructor("ZodPromise", (inst, def) => {
    core.$ZodPromise.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.promiseProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
    return new ZodPromise({
        type: "promise",
        innerType: innerType,
    });
}
const ZodFunction = /*@__PURE__*/ core.$constructor("ZodFunction", (inst, def) => {
    core.$ZodFunction.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.functionProcessor(inst, ctx, json, params);
});
function _function(params) {
    return new ZodFunction({
        type: "function",
        input: Array.isArray(params?.input) ? tuple(params?.input) : (params?.input ?? array(unknown())),
        output: params?.output ?? unknown(),
    });
}

const ZodCustom = /*@__PURE__*/ core.$constructor("ZodCustom", (inst, def) => {
    core.$ZodCustom.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.customProcessor(inst, ctx, json, params);
});
// custom checks
function check(fn) {
    const ch = new core.$ZodCheck({
        check: "custom",
        // ...util.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
function custom(fn, _params) {
    return core._custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
    return core._refine(ZodCustom, fn, _params);
}
// superRefine
function superRefine(fn) {
    return core._superRefine(fn);
}
// Re-export describe and meta from core
const describe = core.describe;
const meta = core.meta;
function _instanceof(cls, params = {}) {
    const inst = new ZodCustom({
        type: "custom",
        check: "custom",
        fn: (data) => data instanceof cls,
        abort: true,
        ...util.normalizeParams(params),
    });
    inst._zod.bag.Class = cls;
    // Override check to emit invalid_type instead of custom
    inst._zod.check = (payload) => {
        if (!(payload.value instanceof cls)) {
            payload.issues.push({
                code: "invalid_type",
                expected: cls.name,
                input: payload.value,
                inst,
                path: [...(inst._zod.def.path ?? [])],
            });
        }
    };
    return inst;
}

// stringbool
const stringbool = (...args) => core._stringbool({
    Codec: ZodCodec,
    Boolean: ZodBoolean,
    String: ZodString,
}, ...args);
function json(params) {
    const jsonSchema = lazy(() => {
        return union([string(params), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema)]);
    });
    return jsonSchema;
}
// preprocess
// /** @deprecated Use `z.pipe()` and `z.transform()` instead. */
function preprocess(fn, schema) {
    return pipe(transform(fn), schema);
}
