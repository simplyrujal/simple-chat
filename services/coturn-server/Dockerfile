FROM coturn/coturn:latest

# Copy turnserver config from correct path (relative to repo root)
COPY services/coturn-server/turnserver.conf /etc/coturn/turnserver.conf

RUN mkdir -p /var/lib/coturn && touch /var/lib/coturn/turnuserdb.conf

CMD ["turnserver", "-c", "/etc/coturn/turnserver.conf", "-v"]
