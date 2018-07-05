FROM node:8.10.0
ENV NODE_ENV production
# ARG NPM_TOKEN="${NPM_TOKEN}"

RUN useradd --user-group --create-home --shell /bin/false app
RUN apt-get update && apt-get -y install rsync

ENV HOME=/home/app

COPY . $HOME

# https://github.com/docker/docker/issues/30110
RUN chown -R app:app $HOME/

USER app
WORKDIR $HOME
RUN pwd && ls -l
# RUN npm config set //registry.npmjs.org/:_authToken=${NPM_TOKEN}
RUN npm install --production=false
RUN npm run build:production && npm prune --production

CMD ["npm", "run", "start:production"]
