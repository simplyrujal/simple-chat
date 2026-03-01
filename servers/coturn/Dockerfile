FROM coturn/coturn:latest

COPY turnserver.conf /etc/coturn/turnserver.conf

RUN mkdir -p /var/lib/coturn && touch /var/lib/coturn/turnuserdb.conf

CMD ["turnserver", "-c", "/etc/coturn/turnserver.conf", "-v"]
