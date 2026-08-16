FROM nginx:1.31-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css app.js sw.js manifest.webmanifest /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8787/ >/dev/null || exit 1
