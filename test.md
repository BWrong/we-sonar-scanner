
## 说明

we-sonar-scanner -pk easy-bi-vue -b develop-20230530140802-29a042a8a1bf -h http://10.18.100.4:30092 -l c810661f52f95df6dea0acb567264764761b1b3d -pv 547e7d71dde5380e417fe55409bb353c50d1f205 -vue 3 -f /Users/bwrong/WorkSpace/01.CTWW/easy-bi-vue -d

1. 创建容器，并挂在
we-sonar-scanner -pk vue-test -b master -h http://10.18.100.4:30092 -l c810661f52f95df6dea0acb567264764761b1b3d -pv 1.0.0 -vue 3 -f /Users/bwrong/Desktop/iot-front -d

 LC_ALL=C.UTF-8 LANG=C.UTF-8

docker run -it -v /Users/bwrong/Desktop/iot-front:/data --name vue-sonnar-test wesonarscanner:latest LC_ALL=C.UTF-8 LANG=C.UTF-8 we-sonar-scanner -pk easy-bi-vue-test -b master -h http://10.18.100.4:30092 -l c810661f52f95df6dea0acb567264764761b1b3d -pv 1.0.0 -vue 3 -f /data -d

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