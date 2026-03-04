module.export({string:()=>string,number:()=>number,boolean:()=>boolean,bigint:()=>bigint,date:()=>date});let core;module.link("../core/index.js",{"*"(v){core=v}},0);let schemas;module.link("./schemas.js",{"*"(v){schemas=v}},1);

function string(params) {
    return core._coercedString(schemas.ZodString, params);
}
function number(params) {
    return core._coercedNumber(schemas.ZodNumber, params);
}
function boolean(params) {
    return core._coercedBoolean(schemas.ZodBoolean, params);
}
function bigint(params) {
    return core._coercedBigint(schemas.ZodBigInt, params);
}
function date(params) {
    return core._coercedDate(schemas.ZodDate, params);
}
