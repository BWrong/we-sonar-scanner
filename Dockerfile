FROM node:16
LABEL author="bwrong"
RUN npm install -g sonarqube-scanner @vanwei/we-sonar-scanner@0.1.3 --registry=https://registry.npmmirror.com
# VOLUME [ "/data" ]
# COPY /Users/bwrong/WorkSpace/00.Misthin/admin-antd-vue3/ /data
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# WORKDIR /usr/share/nginx/html/
# EXPOSE 80
