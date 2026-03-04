module.export({datetime:()=>datetime,date:()=>date,time:()=>time,duration:()=>duration});module.export({ZodISODateTime:()=>ZodISODateTime,ZodISODate:()=>ZodISODate,ZodISOTime:()=>ZodISOTime,ZodISODuration:()=>ZodISODuration},true);let core;module.link("../core/index.js",{"*"(v){core=v}},0);let schemas;module.link("./schemas.js",{"*"(v){schemas=v}},1);

const ZodISODateTime = /*@__PURE__*/ core.$constructor("ZodISODateTime", (inst, def) => {
    core.$ZodISODateTime.init(inst, def);
    schemas.ZodStringFormat.init(inst, def);
});
function datetime(params) {
    return core._isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /*@__PURE__*/ core.$constructor("ZodISODate", (inst, def) => {
    core.$ZodISODate.init(inst, def);
    schemas.ZodStringFormat.init(inst, def);
});
function date(params) {
    return core._isoDate(ZodISODate, params);
}
const ZodISOTime = /*@__PURE__*/ core.$constructor("ZodISOTime", (inst, def) => {
    core.$ZodISOTime.init(inst, def);
    schemas.ZodStringFormat.init(inst, def);
});
function time(params) {
    return core._isoTime(ZodISOTime, params);
}
const ZodISODuration = /*@__PURE__*/ core.$constructor("ZodISODuration", (inst, def) => {
    core.$ZodISODuration.init(inst, def);
    schemas.ZodStringFormat.init(inst, def);
});
function duration(params) {
    return core._isoDuration(ZodISODuration, params);
}
