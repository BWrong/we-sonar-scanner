## 说明
sonar前端代码扫描工具
Usage: we-sonar-scanner [options]

通过eslint进行自定义规则扫描，并导入到sonar，没有默认值的为必传

```
Options:
  -h, --host <value>                        sonarqube server地址
  -l, --login <value>                       登录token
  -pk, --projectKey <value>                 项目名称
  -b, --branch <value>                      分支名称 (default: "master")
  -pv, --projectVersion <value>             项目版本 (default: "1.0.0")
  -vue, --vueVersion <value>                vue版本号 (default: "2")
  -f, --filePath <value>                    需要扫描文件位置 (default: "/data")
  -sv, --scannerVersion <value>             使用的sonar scanner的版本 (default: "4.7.0.2747")
  -lrp, --lcovReportPaths <value>           覆盖率报告locv文件位置 (default: "./coverage/lcov.info")
  -trp, --testExecutionReportPaths <value>  单元测试报告文件位置 (default: "./coverage/test-report.xml")
  -t, --test <value>                        package.json中单元测试的script命令,为空则不执行单元测试(default:"")
  -d, --debug                               打开调试模式, 默认不开启
```
## TODO
- [x] 对Vue3 setup script支持，需要server段升级
- [x] 样式文件支持，使用sonar默认规则
- [x] 支持单元测试和覆盖率上报
- [x] 将sonarqube-scanner作为本地依赖