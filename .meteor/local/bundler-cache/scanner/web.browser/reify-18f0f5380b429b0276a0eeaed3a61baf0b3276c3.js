module.export({twMerge:()=>twMerge});let extendTailwindMerge$1;module.link('tailwind-merge-v2',{extendTailwindMerge(v){extendTailwindMerge$1=v}},0);let extendTailwindMerge;module.link('tailwind-merge-v3',{extendTailwindMerge(v){extendTailwindMerge=v}},1);let getPrefix,getVersion;module.link('../store/index.js',{getPrefix(v){getPrefix=v},getVersion(v){getVersion=v}},2);



const cache = /* @__PURE__ */ new Map();
function twMerge(...classLists) {
  const prefix = getPrefix();
  const version = getVersion();
  const cacheKey = `${prefix}.${version}`;
  const cacheValue = cache.get(cacheKey);
  if (cacheValue) {
    return cacheValue(...classLists);
  }
  const twMergeFn = (version === 3 ? extendTailwindMerge$1 : extendTailwindMerge)({
    extend: {
      classGroups: {
        "bg-image": ["bg-arrow-down-icon", "bg-check-icon", "bg-dash-icon", "bg-dot-icon"],
        shadow: ["shadow-sm-light"]
      }
    },
    prefix
  });
  cache.set(cacheKey, twMergeFn);
  return twMergeFn(...classLists);
}


//# sourceMappingURL=tailwind-merge.js.map
