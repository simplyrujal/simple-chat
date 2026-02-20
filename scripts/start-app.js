#!/usr/bin/env node

const { exec, spawn } = require("child_process");
const os = require("os");

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (!iface.internal && iface.family === "IPv4") {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const IP = getLocalIP();
const PORT = 3000;
const URL = `http://${IP}:${PORT}`;

console.log("\n========================================");
console.log(`🔗 App running at: ${URL}`);
console.log("   Open this URL on your mobile device!");
console.log("========================================\n");

// Start the signaling server
exec("bun run servers/signaling-server/index.ts", (error, stdout, stderr) => {
  if (error) {
    console.error("Signaling server error:", error.message);
  }
  console.log("[Signaling]", stdout, stderr);
});

// Start Meteor with the IP
const meteor = spawn("meteor", ["run", `--mobile-server=${URL}`], {
  env: {
    ...process.env,
    ROOT_URL: URL,
    DDP_DEFAULT_CONNECTION_URL: URL,
  },
  stdio: "inherit",
  shell: true,
});

meteor.on("close", (code) => {
  process.exit(code);
});
