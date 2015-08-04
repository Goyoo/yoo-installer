FROM google/nodejs

MAINTAINER Tad Wang <wptady@gmail.com>

EXPOSE 8080
WORKDIR /app
ADD ./app /app
ADD ./config.js /app/config.js
#RUN npm install
ADD ./entrypoint.sh /entrypoint.sh
CMD ["/entrypoint.sh"]
