const JITSI_DOMAIN = "meet.ffmuc.net";

let loadPromise: Promise<void> | null = null;

/**
 * Dynamically loads lib-jitsi-meet from the Jitsi server's CDN.
 * This avoids the broken npm package and uses the latest, compatible version.
 */
export function loadJitsiScript(): Promise<void> {
  if (loadPromise) return loadPromise;

  // If already loaded, resolve immediately
  if (typeof (window as any).JitsiMeetJS !== "undefined") {
    loadPromise = Promise.resolve();
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://${JITSI_DOMAIN}/libs/lib-jitsi-meet.min.js`;
    script.async = true;
    script.onload = () => {
      console.log("✅ lib-jitsi-meet loaded from CDN");
      resolve();
    };
    script.onerror = (err) => {
      console.error("❌ Failed to load lib-jitsi-meet from CDN", err);
      reject(new Error("Failed to load lib-jitsi-meet from CDN"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}
