const path = require('path');
const fs = require('fs-extra');
const scanner = require('sonarqube-scanner');
const ignorePatterns = require('../config/ignorePatterns.cjs');
module.exports = async (opts) => {
  const {
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
  } = opts;
  try {
    // const { execa } = await import('execa');
    const ignoreFilePath = path.join(filePath, '.eslintignore');
    const isPathIgnored = fs.existsSync(ignoreFilePath);
    if (isPathIgnored) {
      let localIgnore =
        fs
          .readFileSync(ignoreFilePath)
          ?.toString()
          ?.split(/[\n\r]/) || [];
      localIgnore = localIgnore.filter((item) => item);
      ignorePatterns.push(...localIgnore);
    }
    const ignorePatternsStr = ignorePatterns.join(',');
    // const commondParams = [
    //   '-Dsonar.sources=' + filePath,
    //   '-Dsonar.projectBaseDir=' + filePath,
    //   '-Dsonar.working.directory=' + path.join(__dirname, '../.scannerwork'),
    //   '-Dsonar.projectKey=' + projectKey,
    //   '-Dsonar.projectName=' + projectKey,
    //   '-Dsonar.branch.name=' + branch,
    //   '-Dsonar.host.url=' + host,
    //   '-Dsonar.login=' + login,
    //   '-Dsonar.projectVersion=' + projectVersion,
    //   '-Dsonar.ws.timeout=180',
    //   '-Dsonar.javascript.node.maxspace=8192',
    //   '-Dsonar.eslint.reportPaths=' + lintReportPath,
    //   '-Dsonar.test.inclusions= src/**/*.spec.*,src/**/*.test.*',
    //   '-Dsonar.tests=src',
    //   '-Dsonar.exclusions=' + ignorePatternsStr,
    //   '-Dsonar.sourceEncoding=UTF-8'
    // ];
    const options = {
      'sonar.sources': filePath,
      'sonar.projectBaseDir': filePath,
      'sonar.working.directory': path.join(__dirname, '../.scannerwork'),
      'sonar.projectKey': projectKey,
      'sonar.projectName': projectKey,
      'sonar.branch.name': branch,
      'sonar.projectVersion': projectVersion,
      'sonar.ws.timeout': '180',
      'sonar.javascript.node.maxspace': '8192',
      'sonar.eslint.reportPaths': lintReportPath,
      // 'sonar.test.inclusions': 'src/**/*.spec.*,src/**/*.test.*',
      // 'sonar.tests': 'src',
      'sonar.exclusions': ignorePatternsStr,
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.verbose': debug ? 'true' : 'false'
    };
    if (lcovReportPaths && fs.pathExistsSync(path.join(filePath, lcovReportPaths))) {
      // commondParams.push('-Dsonar.javascript.lcov.reportPaths=' + lcovReportPaths);
      options['sonar.javascript.lcov.reportPaths'] = lcovReportPaths;
    }
    if (testExecutionReportPaths && fs.pathExistsSync(path.join(filePath, testExecutionReportPaths))) {
      // commondParams.push('-Dsonar.testExecutionReportPaths=' + testExecutionReportPaths);
      options['sonar.testExecutionReportPaths'] = testExecutionReportPaths;
    }
    console.log('sonar参数：', options);
    // await execa('sonar-scanner', commondParams, { cwd: filePath }).stdout.pipe(process.stdout);
    scanner(
      {
        serverUrl: host,
        token: login,
        options
      },
      () => process.exit()
    );
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  }
};
