
## 说明

we-sonar-scanner -pk vue-test -b master -h http://10.18.104.127:9000/ -l 629973df7b9089d7bbbb89f848f0317f5b9f3702 -pv 1.0.0 -vue 3 -f /Users/bwrong/WorkSpace/00.Misthin/admin-antd-vue3

1. 创建容器，并挂在
we-sonar-scanner -pk vue-test -b master -h http://10.18.104.127:9000/ -l 629973df7b9089d7bbbb89f848f0317f5b9f3702 -pv 1.0.0 -vue 3 -f /data

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