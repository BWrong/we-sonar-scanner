
## 说明

we-sonar-scanner -pk easy-bi-vue -b develop-20230530140802-29a042a8a1bf -h http://10.18.101.93:30091 -l 067e236448bfedb7600ca9621db434b090c568e2 -pv 547e7d71dde5380e417fe55409bb353c50d1f205 -vue 3 -f /Users/bwrong/WorkSpace/01.CTWW/easy-bi-vue

1. 创建容器，并挂在
we-sonar-scanner -pk vue-test -b master -h http://10.18.104.127:9000/ -l 629973df7b9089d7bbbb89f848f0317f5b9f3702 -pv 1.0.0 -vue 3 -f /data



docker run -it -v /Users/bwrong/WorkSpace/01.CTWW/easy-bi-vue:/data --name vue-sonnar-test wesonarscanner:latest LC_ALL=C.UTF-8 LANG=C.UTF-8 we-sonar-scanner -pk easy-bi-vue -b develop-20230530140802-29a042a8a1bf -h http://10.18.101.93:30091 -l 067e236448bfedb7600ca9621db434b090c568e2 -pv 1.0.0 -vue 3 -f /data

docker run -it -v /Users/bwrong/WorkSpace/00.Misthin/admin-antd-vue3:/data we-sonar-scanner:latest
```js
scanner(
  {
    serverUrl: host,
    token: login,
    options: {
      'sonar.sources': filePath,
      'sonar.projectBaseDir': filePath,
      'sonar.working.directory': path.join(__dirname, '../.scannerwork'),
      'sonar.projectKey': projectKey,
      'sonar.branch.name': branch,
      'sonar.host.url': host,
      'sonar.login': login,
      'sonar.projectVersion': projectVersion,
      'sonar.javascript.node.maxspace': '4096',
      'sonar.eslint.reportPaths': lintReportPath,
      'sonar.test.inclusions':'src/**/*.spec.*,src/**/*.test.*',
      'sonar.tests':'src'
    }
  },
  () => {
    console.log('任务执行完成');
    process.exit();
  }
);
```