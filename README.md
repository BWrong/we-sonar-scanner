# Misthin-cli
![npm](https://img.shields.io/npm/dt/misthin-cli)
![npm](https://img.shields.io/npm/v/misthin-cli)
![travis](https://travis-ci.com/BWrong/misthin-cli.svg?branch=master)

## 介绍
MisthinCli为前端开发者提供了一些常用的功能：
- 项目模板：可以下载一些成熟的项目模板，在新项目开始时不必从零开始。
- 部署助手：可以在项目创建配置文件，用于配置部署信息，然后执行部署命令进行项目部署。

## 安装
采用全局安装：
```bash
npm i -g misthin-cli
```
## 常用命令
- 帮助
```bash
misthin -h
```
- 查看版本
```bash
misthin -V
```
- 初始化项目
```bash
## 创建项目
## <name>是创建项目文件的名字
misthin create <name>
```
- 初始化配置信息
```bash
misthin init
```
- 部署
```bash
misthin deploy --mode <mode>
# 或
misthin deploy -m <mode>
## <mode>为项目环境名称
```
```bash
# 部署到所有环境
misthin deploy -m all
```

## 说明
-Dsonar.projectKey=vue - test
- Dsonar.branch.name=master
- Dsonar.host.url=http://10.18.104.127:9000/
- Dsonar.login=629973df7b9089d7bbbb89f848f0317f5b9f3702
- Dsonar.projectVersion=1.0.0
- Dsonar.eslint.reportPaths=/Users/bwrong / WorkSpace / 00.MyStudy / vue - project / eslint - report.json


----------------------
sonar-eslint-scanner -pk vue-test -b master -h http://10.18.104.127:9000/ -l 629973df7b9089d7bbbb89f848f0317f5b9f3702 -pv 1.0.0 -vue 3 -f /Users/bwrong/WorkSpace/00.Misthin/admin-antd-vue3