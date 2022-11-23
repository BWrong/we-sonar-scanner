const path = require('path');
const fs = require('fs-extra');
const { program } = require('commander');
const eslintScanner = require('./scanner/eslint-scanner.cjs');
// 查看版本号
program.description('通过eslint进行自定义规则扫描，并导入到sonar').version(require('./package.json').version);
// https://binaries.sonarsource.com/?prefix=Distribution/sonar-scanner-cli/
process.env.SONAR_SCANNER_VERSION = '4.7.0.2747';
// 初始化项目
program
  .requiredOption('-pk, --projectKey <value>', '项目名称')
  .requiredOption('-b, --branch <value>', '分支名称')
  .requiredOption('-h, --host <value>', 'sonarqube server地址')
  .requiredOption('-l, --login <value>', '登录token')
  .requiredOption('-pv, --projectVersion <value>', '项目版本')
  .requiredOption('-vue, --vueVersion <value>', 'vue版本号')
  .option('-f, --filePath <value>', '需要扫描文件位置', '/data')
  .parse();
console.log('传入参数:', program.opts());
const { projectKey, branch, host, login, projectVersion, vueVersion = 2, filePath } = program.opts();
(async function main() {
  // 1. eslint扫描
  const eslintReport = await eslintScanner({
    vueVersion,
    filePath
  });
  // 2. 存储报告文件
  const reportPath = path.format({
    dir: 'reports',
    name: projectKey,
    ext: '.json'
  });
  fs.outputFileSync(reportPath, eslintReport);
  // 3. sonar扫描
  try {
    const { execa } = await import('execa');
    const commondParams = [
      '-Dsonar.sources=' + filePath,
      '-Dsonar.projectBaseDir=' + filePath,
      '-Dsonar.working.directory=' + path.join(__dirname,'.scannerwork'),
      '-Dsonar.projectKey=' + projectKey,
      '-Dsonar.branch.name=' + branch,
      '-Dsonar.host.url=' + host,
      '-Dsonar.login=' + login,
      '-Dsonar.projectVersion=' + projectVersion,
      '-Dsonar.javascript.node.maxspace=4096',
      '-Dsonar.eslint.reportPaths=' + reportPath
    ];
    console.log('sonar参数：', commondParams);
    await execa('sonar-scanner', commondParams, { cwd: filePath }).stdout.pipe(process.stdout);
  } catch (error) {
    process.exitCode = 1;
    console.log(error);
  }
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
