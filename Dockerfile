FROM node:16
LABEL author="bwrong"
# ENV SONAR_SCANNER_MIRROR=https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/
ENV SONAR_SCANNER_MIRROR=http://10.18.100.19:9107/
ENV SONAR_SCANNER_VERSION=4.7.0.2747
RUN npm install -g sonarqube-scanner @vanwei/we-sonar-scanner@0.1.4 --registry=https://registry.npmmirror.com
RUN sonar-scanner -v
# VOLUME [ "/data" ]
# COPY /Users/bwrong/WorkSpace/00.Misthin/admin-antd-vue3/ /data
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# WORKDIR /usr/share/nginx/html/
# EXPOSE 80
