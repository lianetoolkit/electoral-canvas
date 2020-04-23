FROM node:14-slim

ARG UID=991
ARG GID=991

ENV NODE_ENV=production
ENV URL=http://localhost:8000
ENV CHROME_PATH=/usr/bin/google-chrome-unstable

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    gnupg2 \
    pdfposter \
    wget \
    ca-certificates \
    file \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Add tini
ENV TINI_VERSION="0.18.0"
ADD https://github.com/krallin/tini/releases/download/v${TINI_VERSION}/tini /tini
RUN chmod +x /tini

RUN groupadd -g $GID canvas \
  && useradd -m -d /canvas -s /bin/sh -g $GID -u $UID canvas

# Copy files
COPY --chown=canvas:canvas . /canvas

USER canvas
WORKDIR /canvas

# Install app dependencies
RUN npm install --production=false \
  && npm run build

ENTRYPOINT ["/tini", "--"]
EXPOSE 8000
CMD ["node", "dist/index.js"]
