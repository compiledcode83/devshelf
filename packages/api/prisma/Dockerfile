FROM node:12
RUN openssl version -v
RUN uname -a
RUN echo $DATABASE_URL

WORKDIR /app

RUN npm install -g prisma --unsafe-perm

ADD ./ ./prisma/

CMD [ "prisma", "migrate", "deploy", "--preview-feature"]