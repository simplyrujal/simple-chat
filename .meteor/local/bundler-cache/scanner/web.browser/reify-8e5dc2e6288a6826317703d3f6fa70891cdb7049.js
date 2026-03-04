module.export({ZodError:()=>ZodError,ZodRealError:()=>ZodRealError},true);let core;module.link("../core/index.js",{"*"(v){core=v}},0);let $ZodError;module.link("../core/index.js",{$ZodError(v){$ZodError=v}},1);let util;module.link("../core/util.js",{"*"(v){util=v}},2);


const initializer = (inst, issues) => {
    $ZodError.init(inst, issues);
    inst.name = "ZodError";
    Object.defineProperties(inst, {
        format: {
            value: (mapper) => core.formatError(inst, mapper),
            // enumerable: false,
        },
        flatten: {
            value: (mapper) => core.flattenError(inst, mapper),
            // enumerable: false,
        },
        addIssue: {
            value: (issue) => {
                inst.issues.push(issue);
                inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        addIssues: {
            value: (issues) => {
                inst.issues.push(...issues);
                inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        isEmpty: {
            get() {
                return inst.issues.length === 0;
            },
            // enumerable: false,
        },
    });
    // Object.defineProperty(inst, "isEmpty", {
    //   get() {
    //     return inst.issues.length === 0;
    //   },
    // });
};
const ZodError = core.$constructor("ZodError", initializer);
const ZodRealError = core.$constructor("ZodError", initializer, {
    Parent: Error,
});
// /** @deprecated Use `z.core.$ZodErrorMapCtx` instead. */
// export type ErrorMapCtx = core.$ZodErrorMapCtx;
