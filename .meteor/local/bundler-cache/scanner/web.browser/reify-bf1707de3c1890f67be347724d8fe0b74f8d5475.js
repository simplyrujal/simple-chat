module.export({resolveTheme:()=>resolveTheme,useResolveTheme:()=>useResolveTheme,useStableMemo:()=>useStableMemo});let deepmerge;module.link('deepmerge-ts',{deepmerge(v){deepmerge=v}},0);let klona;module.link('klona/json',{klona(v){klona=v}},1);let useRef;module.link('react',{useRef(v){useRef=v}},2);let getDark,getVersion,getPrefix;module.link('../store/index.js',{getDark(v){getDark=v},getVersion(v){getVersion=v},getPrefix(v){getPrefix=v}},3);let applyPrefix;module.link('./apply-prefix.js',{applyPrefix(v){applyPrefix=v}},4);let applyPrefixV3;module.link('./apply-prefix-v3.js',{applyPrefixV3(v){applyPrefixV3=v}},5);let convertUtilitiesToV4;module.link('./convert-utilities-to-v4.js',{convertUtilitiesToV4(v){convertUtilitiesToV4=v}},6);let deepMergeStrings;module.link('./deep-merge.js',{deepMergeStrings(v){deepMergeStrings=v}},7);let isEqual;module.link('./is-equal.js',{isEqual(v){isEqual=v}},8);let stripDark;module.link('./strip-dark.js',{stripDark(v){stripDark=v}},9);let twMerge;module.link('./tailwind-merge.js',{twMerge(v){twMerge=v}},10);











function useResolveTheme(...input) {
  return useStableMemo(() => resolveTheme(...input), input);
}
function useStableMemo(factory, dependencies) {
  const prevDepsRef = useRef();
  const prevResultRef = useRef();
  const hasChanged = !prevDepsRef.current || !isEqual(prevDepsRef.current, dependencies);
  if (hasChanged) {
    prevDepsRef.current = dependencies;
    prevResultRef.current = factory();
  }
  return prevResultRef.current;
}
function resolveTheme([base, ...custom], clearThemeList, applyThemeList) {
  const dark = getDark();
  const prefix = getPrefix();
  const version = getVersion();
  const _custom = custom?.length ? custom?.filter((value) => value !== void 0) : void 0;
  const _clearThemeList = clearThemeList?.length ? clearThemeList?.filter((value) => value !== void 0) : void 0;
  const _applyThemeList = applyThemeList?.length ? applyThemeList?.filter((value) => value !== void 0) : void 0;
  const baseTheme = _clearThemeList?.length || dark === false || version === 4 || prefix ? klona(base) : base;
  if (_clearThemeList?.length) {
    const finalClearTheme = cloneWithValue(baseTheme, false);
    let run = false;
    for (const clearTheme of _clearThemeList) {
      if (clearTheme) {
        run = true;
      }
      patchClearTheme(finalClearTheme, clearTheme);
    }
    if (run) {
      runClearTheme(baseTheme, finalClearTheme);
    }
  }
  if (dark === false || version === 4 || prefix) {
    stringIterator(baseTheme, (value) => {
      if (dark === false) {
        value = stripDark(value);
      }
      if (version === 4) {
        value = convertUtilitiesToV4(value);
      }
      if (prefix) {
        if (version === 3) {
          value = applyPrefixV3(value, prefix);
        }
        if (version === 4) {
          value = applyPrefix(value, prefix);
        }
      }
      return value;
    });
  }
  let theme = baseTheme;
  if (_custom?.length) {
    theme = deepMergeStrings(twMerge)(baseTheme, ..._custom);
  }
  if (_applyThemeList?.length && _custom?.length) {
    const finalApplyTheme = cloneWithValue(baseTheme, "merge");
    let run = false;
    for (const applyTheme of _applyThemeList) {
      if (applyTheme !== "merge") {
        run = true;
      }
      patchApplyTheme(finalApplyTheme, applyTheme);
    }
    if (run) {
      runApplyTheme(theme, deepmerge(baseTheme, ...custom), finalApplyTheme);
    }
  }
  return theme;
}
function patchClearTheme(base, clearTheme) {
  function iterate(base2, clearTheme2) {
    if (typeof clearTheme2 === "boolean") {
      if (typeof base2 === "object" && base2 !== null) {
        for (const key in base2) {
          base2[key] = iterate(base2[key], clearTheme2);
        }
      } else {
        return clearTheme2;
      }
    }
    if (typeof clearTheme2 === "object" && clearTheme2 !== null) {
      for (const key in clearTheme2) {
        base2[key] = iterate(base2[key], clearTheme2[key]);
      }
    }
    return base2;
  }
  iterate(base, clearTheme);
}
function patchApplyTheme(base, applyTheme) {
  function iterate(base2, applyTheme2) {
    if (typeof applyTheme2 === "string") {
      if (typeof base2 === "object" && base2 !== null) {
        for (const key in base2) {
          base2[key] = iterate(base2[key], applyTheme2);
        }
      } else {
        return applyTheme2;
      }
    }
    if (typeof applyTheme2 === "object" && applyTheme2 !== null) {
      for (const key in applyTheme2) {
        base2[key] = iterate(base2[key], applyTheme2[key]);
      }
    }
    return base2;
  }
  iterate(base, applyTheme);
}
function runClearTheme(base, clearTheme) {
  function iterate(base2, clearTheme2) {
    if (clearTheme2 === true) {
      if (typeof base2 === "object" && base2 !== null) {
        for (const key in base2) {
          base2[key] = iterate(base2[key], clearTheme2);
        }
      } else {
        return "";
      }
    }
    if (typeof clearTheme2 === "object" && clearTheme2 !== null) {
      for (const key in clearTheme2) {
        base2[key] = iterate(base2[key], clearTheme2[key]);
      }
    }
    return base2;
  }
  iterate(base, clearTheme);
}
function runApplyTheme(base, target, applyTheme) {
  function iterate(base2, target2, applyTheme2) {
    if (applyTheme2 === "replace") {
      if (typeof base2 === "object" && base2 !== null) {
        for (const key in base2) {
          base2[key] = iterate(base2[key], target2[key], applyTheme2);
        }
      } else {
        return target2;
      }
    }
    if (typeof applyTheme2 === "object" && applyTheme2 !== null) {
      for (const key in applyTheme2) {
        base2[key] = iterate(base2[key], target2[key], applyTheme2[key]);
      }
    }
    return base2;
  }
  iterate(base, target, applyTheme);
}
function stringIterator(input, callback) {
  function iterate(input2) {
    if (typeof input2 === "string") {
      return callback(input2);
    } else if (Array.isArray(input2)) {
      for (let i = 0; i < input2.length; i++) {
        input2[i] = iterate(input2[i]);
      }
    } else if (typeof input2 === "object" && input2 !== null) {
      for (const key in input2) {
        input2[key] = iterate(input2[key]);
      }
    }
    return input2;
  }
  iterate(input);
}
function cloneWithValue(input, value) {
  if (input === null || typeof input !== "object") {
    return value;
  }
  const clone = {};
  for (const key in input) {
    clone[key] = cloneWithValue(input[key], value);
  }
  return clone;
}


//# sourceMappingURL=resolve-theme.js.map
