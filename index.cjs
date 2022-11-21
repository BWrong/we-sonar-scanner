const path = require('path');
const fs = require('fs');
const { program } = require('commander');
const { ESLint } = require('eslint');
const scanner = require('sonarqube-scanner');
const baseConfig = require('./config/base.cjs');
const vue2Config = require('./config/vue2.cjs');
const vue3Config = require('./config/vue3.cjs');

function getVueConfig(version) {
  const vueConfigMap = {
    2: vue2Config,
    3: vue3Config
  };
  version ||= 2;
  return vueConfigMap[version];
}
// 查看版本号
program.description('通过eslint进行自定义规则扫描，并导入到sonar').version(require('./package.json').version);
// 初始化项目
program
  .requiredOption('-pk, --projectKey <value>', '项目名称')
  .requiredOption('-b, --branch <value>', '分支名称')
  .requiredOption('-h, --host <value>', 'sonarqube server地址')
  .requiredOption('-l, --login <value>', '登录token')
  .requiredOption('-pv, --projectVersion <value>', '项目版本')
  .requiredOption('-vue, --vueVersion <value>', 'vue版本号')
  .option('-f, --filePath <value>', '需要扫描文件位置', '/src/data')
  .parse();
//   .requiredOption('-r, --report', 'eslint报告位置')
//   .action(createAction);
const { projectKey, branch, host, login, projectVersion, vueVersion = 2, filePath } = program.opts();
const params = {
  cwd: __dirname,
  errorOnUnmatchedPattern: false, // 在找不到目标文件时抛出错误
  extensions: ['.vue', '.js', '.jsx', '.cjs', '.mjs', '.ts', '.tsx'],
  ignore: true, // eslint.lintFiles()方法不采用.eslintignore文件或ignorePatterns的配置。
  ignorePath: path.join(filePath, '.eslintignore'),
  allowInlineConfig: true, // 允许行内注释指令
  baseConfig,
  overrideConfig: getVueConfig(vueVersion),
  // plugins:[],
  resolvePluginsRelativeTo: __dirname,
  rulePaths: ['./config'],
  useEslintrc: false,
  fix: false
};

console.log(params);
(async function main() {
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
  const reportPath = path.format({
    dir: './reports',
    name: projectKey,
    ext: '.json'
  });
  fs.writeFileSync(reportPath, resultText);
  scanner(
    {
      serverUrl : host,
      token : login,
      options: {
        'sonar.projectKey': projectKey,
        'sonar.branch.name': branch,
        'sonar.host.url': host,
        'sonar.login': login,
        'sonar.projectVersion': projectVersion,
        'sonar.eslint.reportPaths': reportPath,
      }
    },
    () => process.exit()
  )
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
