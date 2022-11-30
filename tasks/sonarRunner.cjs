const path = require('path');
const fs = require('fs-extra');
module.exports = async (opts) => {
const { projectKey, branch, host, login, projectVersion, filePath,lintReportPath,lcovReportPaths,testExecutionReportPaths } = opts;
  try {
    const { execa } = await import('execa');
    const commondParams = [
      '-Dsonar.sources=' + filePath,
      '-Dsonar.projectBaseDir=' + filePath,
      '-Dsonar.working.directory=' + path.join(__dirname, '../.scannerwork'),
      '-Dsonar.projectKey=' + projectKey,
      '-Dsonar.branch.name=' + branch,
      '-Dsonar.host.url=' + host,
      '-Dsonar.login=' + login,
      '-Dsonar.projectVersion=' + projectVersion,
      '-Dsonar.javascript.node.maxspace=4096',
      '-Dsonar.eslint.reportPaths=' + lintReportPath,
      '-Dsonar.test.inclusions= src/**/*.spec.*,src/**/*.test.*',
      '-Dsonar.tests=src'
    ];
    if (fs.pathExistsSync(path.join(filePath,lcovReportPaths))) {
      commondParams.push('-Dsonar.javascript.lcov.reportPaths=' + lcovReportPaths);
    }
    if (fs.pathExistsSync(path.join(filePath,testExecutionReportPaths))) {
      commondParams.push('-Dsonar.testExecutionReportPaths=' + testExecutionReportPaths);
    }
    console.log('sonar参数：', commondParams);
    await execa('sonar-scanner', commondParams, { cwd: filePath }).stdout.pipe(process.stdout);
  } catch (error) {
    process.exitCode = 1;
    console.log(error);
  }
};