#!/usr/bin/env node

const { spawn } = require("child_process");
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
const SIGNALING_PORT = 8080;

const NETWORK_URL = `http://${IP}:${PORT}`;

console.log("\n========================================");
console.log("🚀 Starting Simple Chat...");
console.log("========================================");
console.log(`\n📱 Meteor App:`);
console.log(`   Local:   http://localhost:${PORT}`);
console.log(`   Network: ${NETWORK_URL}`);
console.log(`\n📡 Signaling Server (WebRTC):`);
console.log(`   ws://${IP}:${SIGNALING_PORT}`);
console.log(`\n⚠️  Video/Audio calls require HTTPS or localhost.`);
console.log(`   Use http://localhost:${PORT} for full call support.`);
console.log("\n========================================\n");

// Start the signaling server using spawn so output is visible
const signalingServer = spawn(
  "bun",
  ["run", "servers/signaling-server/index.ts"],
  {
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
  },
);

signalingServer.stdout.on("data", (data) => {
  process.stdout.write(`[Signaling] ${data}`);
});

signalingServer.stderr.on("data", (data) => {
  process.stderr.write(`[Signaling ERROR] ${data}`);
});

signalingServer.on("close", (code) => {
  if (code !== 0) {
    console.error(`[Signaling] Server exited with code ${code}`);
  }
});

signalingServer.on("error", (err) => {
  console.error(`[Signaling] Failed to start: ${err.message}`);
});

// Start Meteor with IP as ROOT_URL so other PCs can connect
const meteor = spawn("meteor", ["run", `--mobile-server=${NETWORK_URL}`], {
  env: {
    ...process.env,
    ROOT_URL: NETWORK_URL,
    DDP_DEFAULT_CONNECTION_URL: NETWORK_URL,
  },
  stdio: "inherit",
  shell: true,
});

meteor.on("close", (code) => {
  signalingServer.kill();
  process.exit(code);
});
