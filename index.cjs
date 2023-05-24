const path = require('path');
const fs = require('fs-extra');
const { program } = require('commander');
const eslintScanner = require('./tasks/eslintScanner.cjs');
const sonarRunner = require('./tasks/sonarRunner.cjs');
const testRunner = require('./tasks/testRunner.cjs');
// 查看版本号
program.description('执行代码质量扫描（eslint）、单元测试任务，将数据上传到sonarQube').version(require('./package.json').version);
// 定义命令及参数
program
  .requiredOption('-h, --host <value>', 'sonarqube server地址')
  .requiredOption('-l, --login <value>', '登录token')
  .requiredOption('-pk, --projectKey <value>', '项目名称')
  .option('-b, --branch <value>', '分支名称', 'master')
  .option('-pv, --projectVersion <value>', '项目版本', '1.0.0')
  .option('-vue, --vueVersion <value>', 'vue版本号', '')
  .option('-f, --filePath <value>', '需要扫描文件位置', '/data')
  .option('-sv, --scannerVersion <value>', '使用的sonar scanner的版本', '4.7.0.2747')
  .option('-lrp, --lcovReportPaths <value>', '覆盖率报告locv文件位置', './coverage/lcov.info')
  .option('-trp, --testExecutionReportPaths <value>', '单元测试报告文件位置', './coverage/test-report.xml')
  .option('-t, --test <value>', 'package.json中单元测试的script命令', '')
  .option('-d, --debug', '打开调试模式', '')
  .parse();
console.log('传入参数:', program.opts());
const {
  projectKey,
  branch,
  host,
  login,
  projectVersion,
  vueVersion,
  filePath,
  scannerVersion,
  lcovReportPaths,
  testExecutionReportPaths,
  test,
  debug
} = program.opts();
// https://binaries.sonarsource.com/?prefix=Distribution/sonar-scanner-cli/
process.env.SONAR_SCANNER_VERSION = scannerVersion;
const lintReportPath = path.format({
  dir: path.join(__dirname, 'reports'),
  name: projectKey,
  ext: '.json'
});

(async function main() {
  if (!fs.pathExistsSync(filePath)) {
    console.log('warnning：目标位置不存在，结束任务');
    process.exitCode = 1;
    return;
  }
  Promise.all([
    // 1. eslint扫描
    eslintScanner({
      vueVersion,
      filePath,
      reportPath: lintReportPath
    }),
    // 2. 执行单元测试
    test && testRunner({
      filePath,
      lcovReportPaths,
      testExecutionReportPaths,
      test
    })
  ]).then(async () => {
    // 3. sonar扫描并上传
    await sonarRunner({
      projectKey,
      branch,
      host,
      login,
      projectVersion,
      filePath,
      lintReportPath,
      lcovReportPaths,
      testExecutionReportPaths,
      debug
    });
  });
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
