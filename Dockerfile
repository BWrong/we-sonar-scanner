FROM node:16
LABEL author="bwrong"
ENV LANG='zh_CN.UTF-8'
# ENV LANG="en_US.UTF-8"
ENV LC_NUMERIC="en_US.UTF-8"
ENV LC_TIME="en_US.UTF-8"
ENV LC_COLLATE="en_US.UTF-8"
ENV LC_MONETARY="en_US.UTF-8"
ENV LC_MESSAGES="en_US.UTF-8"
ENV LC_PAPER="en_US.UTF-8"
ENV LC_NAME="en_US.UTF-8"
ENV C_ADDRESS="en_US.UTF-8"
ENV LC_TELEPHONE="en_US.UTF-8"
ENV LC_MEASUREMENT="en_US.UTF-8"
ENV LC_IDENTIFICATION="en_US.UTF-8"
# scanner下载地址
ENV SONAR_SCANNER_MIRROR=https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/
# ENV SONAR_SCANNER_MIRROR=http://10.18.100.19:9107/
# scanner版本
ENV SONAR_SCANNER_VERSION=4.8.0.2856
# 安装相关工具
RUN npm install -g sonarqube-scanner@3.0.1 @vanwei/we-sonar-scanner@0.2.5 --registry=https://registry.npmmirror.com
# 该命令会安装scanner，需要花费一点时间
RUN sonar-scanner -v
# VOLUME [ "/data" ]
# COPY /Users/bwrong/WorkSpace/00.Misthin/admin-antd-vue3/ /data
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# WORKDIR /usr/share/nginx/html/
# EXPOSE 80
