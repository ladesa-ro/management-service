FROM openwa/wa-automate:latest
USER root
RUN rm -f /etc/apt/sources.list.d/google-chrome.list && apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*
COPY openwa-dashboard.html /usr/src/app/node_modules/@open-wa/wa-automate/dist/controllers/popup/index.html
