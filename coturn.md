📘 Coturn Setup and Docker Implementation Guide
🧊 What is Coturn?

Coturn is a TURN + STUN server used in WebRTC applications.

It helps users connect when a direct peer-to-peer connection fails due to:

NAT restrictions

Firewalls

Different networks

❓ Why Coturn is Needed
STUN does:

Finds your public IP address

TURN does:

Relays audio/video when direct connection cannot be made

👉 Without TURN, many real-world video calls will fail.

📁 Monorepo Setup

Create a folder named coturn in your project root.

Example:

your-project/
├── apps/
├── packages/
├── coturn/

This folder will contain:

Configuration file

Dockerfile

⚙️ Configuration File

Create a file:

turnserver.conf

Add basic settings like:

Listening port

Realm

Username

Password

Example:

listening-port=3478
fingerprint
lt-cred-mech

realm=localhost
user=testuser:testpass

no-multicast-peers
no-cli
🐳 Dockerfile Setup

Use the official coturn image.

Example:

FROM coturn/coturn:latest

COPY turnserver.conf /etc/coturn/turnserver.conf

CMD ["turnserver", "-c", "/etc/coturn/turnserver.conf", "-v"]
📦 Docker Compose Setup

Add a coturn service in docker-compose.yml.

Example:

services:
coturn:
build: ./coturn
container_name: coturn-server
ports: - "3478:3478" - "3478:3478/udp"
restart: unless-stopped
▶️ Start the Server

Run:

docker compose up -d coturn

Check logs:

docker logs coturn-server

You should see:

Listening on port 3478
