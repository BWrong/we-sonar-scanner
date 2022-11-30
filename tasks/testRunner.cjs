// 运行项目单元测试
const path = require('path');
const fs = require('fs-extra');
module.exports = async (opts) => {
  try {
    const { filePath, testScript } = opts;
    const pkgPath = path.join(filePath, 'package.json');
    if (!fs.pathExistsSync(pkgPath)) {
      console.log('warnning：缺少package.json，跳过单元测试任务');
      return;
    }
    const pkgJson = fs.readJsonSync(pkgPath);
    const testScriptName = pkgJson?.scripts?.[testScript];
    if (!testScriptName) {
      console.log('warnning：未找到测试指令，跳过单元测试任务');
      return;
    }
    const { execaCommand } = await import('execa');
    await execaCommand(`npm run ${testScript}`, { cwd: filePath }).stdout.pipe(process.stdout);
  } catch (error) {
    process.exitCode = 1;
    console.log(error);
  }
};
