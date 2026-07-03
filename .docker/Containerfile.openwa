FROM openwa/wa-automate:4.64.0
USER root
RUN rm -f /etc/apt/sources.list.d/google-chrome.list && apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*
COPY openwa-dashboard.html /usr/src/app/node_modules/@open-wa/wa-automate/dist/controllers/popup/index.html
USER node
