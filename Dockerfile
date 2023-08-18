FROM node:16
LABEL author="bwrong"
ENV LANG="C.UTF-8"
ENV LC_ALL="C.UTF-8"
# scanner下载地址
ENV SONAR_SCANNER_MIRROR=https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/
# scanner版本
ENV SONAR_SCANNER_VERSION=4.8.0.2856
# 安装相关工具
RUN npm install -g @vanwei/we-sonar-scanner@1.0.1
# 拷贝sonar-scanner https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip
COPY ./sonar-scanner-4.8.0.2856-linux /root/.sonar/native-sonar-scanner/sonar-scanner-4.8.0.2856-linux

