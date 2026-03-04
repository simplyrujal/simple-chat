'use client';module.export({useWatchLocalStorageValue:()=>useWatchLocalStorageValue});let useEffect;module.link('react',{useEffect(v){useEffect=v}},0);


function useWatchLocalStorageValue({
  key: watchKey,
  onChange
}) {
  function handleStorageChange({ key, newValue }) {
    if (key === watchKey) onChange(newValue);
  }
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
}


//# sourceMappingURL=use-watch-localstorage-value.js.map
