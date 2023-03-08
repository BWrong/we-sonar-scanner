const path = require('path');
const fs = require('fs-extra');
const { ESLint } = require('eslint');
const baseConfig = require('../config/base.cjs');
const vue2Config = require('../config/vue2.cjs');
const vue3Config = require('../config/vue3.cjs');
function getVueConfig(version) {
  const vueConfigMap = {
    2: vue2Config,
    3: vue3Config
  };
  return vueConfigMap[version] || vue2Config;
}
module.exports = async (opts) => {
  try {
    console.log('开始ESlint扫描...');
    const { vueVersion = 2, filePath,reportPath } = opts;
    const params = {
      cwd: __dirname,
      errorOnUnmatchedPattern: false, // 在找不到目标文件时抛出错误
      extensions: ['.vue', '.js', '.jsx', '.cjs', '.mjs', '.ts', '.tsx'], // 要检测的文件类型
      ignore: true, // eslint.lintFiles()方法采用.eslintignore文件或ignorePatterns的配置。
      allowInlineConfig: true, // 允许行内注释指令
      baseConfig, // 基础配置
      overrideConfig: getVueConfig(vueVersion),
      useEslintrc: false, // 使用项目中的配置
      fix: false
    };
    const ignoreFilePath = path.join(filePath, '.eslintignore');
    const isPathIgnored = fs.existsSync(ignoreFilePath);
    isPathIgnored && (params.ignorePath = ignoreFilePath);
    console.log('eslint配置：', params);
    // 1. Create an instance with the `fix` option.
    const eslint = new ESLint(params);
    // 2. Lint files. This doesn't modify target files.
    const results = await eslint.lintFiles(path.normalize(filePath));
    // 3. Modify the files with the fixed code.
    await ESLint.outputFixes(results);
    // 4. Format the results.
    const formatter = await eslint.loadFormatter('json');
    const resultText = formatter.format(results);
    // 5. Output it.
    fs.outputFileSync(reportPath, resultText);
    console.log('ESlint扫描结束');
  } catch (error) {
    process.exitCode = 1;
    console.log(error);
  }
};
