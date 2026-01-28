# ssh-deploy-tools

基于 SSH 协议的自动化部署工具，支持部署项目到远程 Windows Server 服务器，或者通过堡垒机部署项目到内部 Linux 服务器。

## 功能特性

- **双平台支持**: 支持部署到 Windows Server 和 Linux 服务器
- **堡垒机部署**: 支持通过堡垒机部署到内部 Linux 服务器
- **安全传输**: 基于 SSH 协议进行安全文件传输
- **备份机制**: 部署前自动备份远程服务器现有文件
- **临时目录**: 使用临时目录策略，确保部署过程原子性
- **健康检查**: 支持健康检查开关控制（仅限堡垒机模式）
-

## 安装

```bash
# 作为依赖安装
npm install ares-ssh-deploy

# 或使用 pnpm
pnpm add ares-ssh-deploy
```

## 使用方法

### 1. 部署到 Windows Server

```typescript
import { deployToWindowsServer } from 'ares-ssh-deploy';

// 前端项目打包配置
const buildConfig = {
  build: true,                                          // 是否构建项目
  mode: 'production',                                   // 构建模式
  projectDir: 'C:\\workspace\\webstormProjects\\test\\' // 项目目录
};

// 服务器配置
const targetConfig = {
  host: '192.168.1.158',
  port: 22,
  username: 'username',
  password: 'password',
  localDeployDir: 'C:\\deploy_static\\deploy-tool-test\\',           // 本地待部署目录
  remoteDir: 'D:\\nginx-1.20.2\\html\\deploy-tool-test\\',           // 远程目标目录
  remoteDirTemp: 'D:\\nginx-1.20.2\\html\\deploy-tool-test-temp\\'   // 远程临时目录
};

// 执行部署
deployToWindowsServer(buildConfig, targetConfig);

```
以上的配置项为可选，可以在 `.env.windows-server` 文件中定义, 从配置文件中读取配置项, 执行部署方法时可不传参。


### 2. 通过堡垒机部署到 Linux 服务器

```typescript
import {deployToLinuxBastionInternalServer} from 'ares-ssh-deploy';

// 前端项目打包配置
const buildConfig = {
	build: true,                                          // 是否构建项目
	mode: 'production',                                   // 构建模式
	projectDir: 'C:\\workspace\\webstormProjects\\test\\' // 项目目录
};
// 堡垒机配置
const bastionConfig = {
	host: 'bastion-host.com', 
    port: 22, 
    username: 'bastion-user', 
    password: 'bastion-password'
};
// 堡垒机内部服务器配置
const targetConfig = {
	host: 'internal-linux-server.com',
	port: 22,
	username: 'target-user',
	password: 'target-password',
	localDeployDir: 'C:\\deploy_static\\deploy-tool-test\\',              // 本地待部署目录
	remoteDir: '/usr/share/nginx/html/deploy-tool-test/',                 // 远程部署目录
	remoteDirTemp: '/usr/share/nginx/html/deploy-tool-test-temp/',        // 远程临时目录
	remoteBackupDir: '/usr/share/nginx/deploy-tool-test-backup/',         // 远程备份目录
	remoteHealthDir: '/usr/share/nginx/html/health/',                     // 健康检查目录
	remoteHealthFile: '/usr/share/nginx/html/health/index.html',          // 健康检查文件
	remoteHideHealthFileDir: '/usr/share/nginx/html/health/hide/',        // 健康检查隐藏目录
	remoteHealthHiddenFile: '/usr/share/nginx/html/health/hide/index.html', // 健康检查隐藏文件
};

// 执行部署
const success = await deployToLinuxBastionInternalServer(buildConfig, bastionConfig, targetConfig);
```

以上的配置项为可选，可以在 `.env.linux-aliyun-bastion` 文件中定义, 从配置文件中读取配置项, 执行部署方法时可不传参。


### 3. 控制健康检查

```typescript
import { enableLinuxBastionHealthCheck, disableLinuxBastionHealthCheck } from 'ares-ssh-deploy';

// 关闭健康检查
disableLinuxBastionHealthCheck(bastionConfig, targetConfig);

// 启用健康检查
enableLinuxBastionHealthCheck(bastionConfig, targetConfig);
```

同部署代码, 可以不传参, 而是通过配置文件读取参数。


### 4. 示例
```
test/
├── .env
├── .env.linux-aliyun-bastion
├── .env.windows-server
├── deploy-linux-bastion.js
├── deploy-windows-server.js
├── package.json

```

#### 示例代码 `.env`
```env
```

#### 示例代码 `.env.linux-aliyun-bastion`
```env
# 日志级别
LOG_LEVEL=info

# 是否构建前端项目
BUILD_PROJECT=false

# 构建模式
BUILD_MODE=test

# 项目目录
PROJECT_DIR=C:\\workspace\\webstormProjects\\test\\

# 本地待部署目录
LOCAL_DEPLOY_DIR=C:\\deploy_static\\deploy-tool-test\\

# 本地下载目录
LOCAL_DOWNLOAD_DIR=C:\\Users\\ares\\Downloads\\deploy-tool-test\\

# 堡垒机SSH配置
BASTION_SSH_HOST=bastion-host.com
BASTION_SSH_USER=bastion-user
BASTION_SSH_PASSWORD=bastion-password
BASTION_SSH_PORT=bastion-port
BASTION_SSH_PRIVATE_KEY=

# 目标SSH配置
TARGET_SSH_HOST=172.16.0.52
TARGET_SSH_USER=root
TARGET_SSH_PASSWORD=
TARGET_SSH_PORT=22
TARGET_SSH_PRIVATE_KEY=

# 目标服务器相关目录
TARGET_BK_DIR=/usr/share/nginx/deploy-tool-test-backup/
TARGET_DIR=/usr/share/nginx/html/deploy-tool-test/
TARGET_DIR_TEMP=/usr/share/nginx/html/deploy-tool-test-temp/

# 目标服务器健康检查相关目录及文件
TARGET_HEALTH_DIR=/usr/share/nginx/html/health/
TARGET_HIDE_HEALTH_FILE_DIR=/usr/share/nginx/html/health/hide/
TARGET_HEALTH_FILE=/usr/share/nginx/html/health/index.html
TARGET_HEALTH_HIDDEN_FILE=/usr/share/nginx/html/health/hide/index.html
```

#### 示例代码 `.env.windows-server`
```env
# 日志级别
LOG_LEVEL=info

# 是否构建前端项目
BUILD_PROJECT=false

# 构建模式
BUILD_MODE=test

# 项目目录
PROJECT_DIR=C:\\workspace\\webstormProjects\\test\\

# 本地待部署目录
LOCAL_DEPLOY_DIR=C:\\deploy_static\\deploy-tool-test\\

# 本地下载目录
LOCAL_DOWNLOAD_DIR=C:\\Users\\ares\\Downloads\\deploy-tool-test\\

# 目标SSH配置
TARGET_SSH_HOST=192.168.1.158
TARGET_SSH_USER=username
TARGET_SSH_PASSWORD=password
TARGET_SSH_PORT=22
TARGET_SSH_PRIVATE_KEY=

# 目标服务器相关目录
TARGET_BK_DIR=D:\\nginx-1.20.2\\html\\deploy-tool-test-backup\\
TARGET_DIR=D:\\nginx-1.20.2\\html\\deploy-tool-test\\
TARGET_DIR_TEMP=D:\\nginx-1.20.2\\html\\deploy-tool-test-temp\\

```

#### 示例代码 `deploy-linux-bastion.js`
```javascript
import {deployToLinuxBastionInternalServer} from 'ares-ssh-deploy'

deployToLinuxBastionInternalServer()
```

#### 示例代码 `deploy-windows-server.js`
```javascript
import {deployToWindowsServer} from 'ares-ssh-deploy'

deployToWindowsServer()
```

#### 示例代码 `package.json`
```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "deploy:windows-server": "dotenvx run --env-file=.env.windows-server -- node deploy-windows-server.js",
    "deploy:linux-aliyun-bastion": "dotenvx run --env-file=.env.linux-aliyun-bastion -- node deploy-linux-bastion.js"
  },
  "dependencies": {
    "ares-ssh-deploy": "^1.0.0"
  }
}
```


## 配置选项说明

### SSH 客户端配置 (SSHClientConfig)
- `host`: 服务器地址
- `port`: SSH 端口号，默认 22
- `username`: 用户名
- `password`: 密码
- `privateKey`: 私钥文件路径（可选，用于密钥认证）

### 部署配置 (BuildConfig)
- `build`: 是否执行构建，默认 false
- `mode`: 构建模式，如 production、development
- `projectDir`: 项目根目录

### 目标服务器配置 (TargetSSHClientConfig)
- `localDeployDir`: 本地待部署目录
- `localDownloadDir`: 本地下载目录（用于本地备份）
- `remoteBackupDir`: 远程备份目录
- `remoteDir`: 远程目标目录（最终部署位置）
- `remoteDirTemp`: 远程临时目录（部署过程中的临时存储）
- `remoteHealthDir`: 健康检查目录
- `remoteHealthFile`: 健康检查文件路径
- `remoteHideHealthFileDir`: 隐藏健康检查文件的目录
- `remoteHealthHiddenFile`: 隐藏的健康检查文件路径

## 部署流程

### Windows Server 部署流程
1. 检查本地部署目录是否存在
2. 如需构建，则执行项目构建
3. 连接到远程 Windows Server
4. 检查并创建远程目标目录和临时目录
5. 清空远程临时目录
6. 上传本地文件到远程临时目录
7. 清空远程目标目录
8. 将临时目录文件移动到目标目录
9. 断开连接

### Linux 堡垒机部署流程
1. 检查本地部署目录是否存在
2. 如需构建，则执行项目构建
3. 连接到堡垒机
4. 检查并创建远程目标目录、临时目录和备份目录
5. 在远程服务器上备份现有文件
6. 清空远程临时目录
7. 上传本地文件到远程临时目录
8. （可选）隐藏健康检查文件使服务暂时不可用
9. 清空远程目标目录
10. 将临时目录文件移动到目标目录
11. （可选）恢复健康检查文件使服务可用
12. 断开连接

## 已测试使用环境

- 本地环境：Windows 10/11
- 测试环境：Windows Server
- 生产环境：阿里云堡垒机（Linux）+ 内部 Linux 服务器

## 已测试部署流程

1. 部署本地前端项目到 Windows Server 服务器的 Nginx 服务
2. 通过堡垒机部署项目到内部 Linux 服务器

## 常见问题

### Q: 部署流程是否可配置？
A: 目前已封装的部署流程方法`deployToWindowsServer`和`deployToLinuxBastionInternalServer`可满足大多数场景，如果需要自定义部署流程，请根据工具方法自行封装。


## 部分实用工具函数 API

以下是在 `utils` 目录中提供的实用工具函数：

### 通用工具函数 (common.js)

#### `getBastionConfig(config?)`
获取堡垒机配置，合并环境变量和传入的配置参数

- **参数**:
    - `config` (BastionSSHClientConfig, 可选): 用户自定义的堡垒机配置
- **返回值**: `BastionSSHClientConfig` - 合并后的堡垒机配置

#### `getBastionTargetConfig(config?)`
获取堡垒机内部 Linux 服务器配置

- **参数**:
    - `config` (TargetSSHClientConfig, 可选): 用户自定义的目标服务器配置
- **返回值**: `TargetSSHClientConfig` - 合并后的目标服务器配置

#### `getBastionChannelConfig(config?)`
获取堡垒机连接内部服务器的通道配置

- **参数**:
    - `config` (TargetSSHClientConfig, 可选): 目标服务器配置
- **返回值**: `BastionChannelConfig` - 通道配置

#### `getWindowsServerTargetConfig(config?)`
获取 Windows Server 目标服务器配置

- **参数**:
    - `config` (TargetSSHClientConfig, 可选): 用户自定义的目标服务器配置
- **返回值**: `TargetSSHClientConfig` - 合并后的 Windows Server 配置

#### `getBuildConfig(config?)`
获取构建项目配置

- **参数**:
    - `config` (BuildConfig): 用户自定义的构建配置
- **返回值**: `BuildConfig` - 合并后的构建配置

#### `buildProject(bConfig)`
执行项目构建

- **参数**:
    - `bConfig` (BuildConfig): 构建配置
- **返回值**: `Promise<any>` - 构建结果

### SSH 工具函数 (ssh.js)

#### `getSSHClient(config)`
获取连接到 Windows Server 的 SSH 客户端

- **参数**:
    - `config` (TargetSSHClientConfig): 目标服务器配置
- **返回值**: `Promise<NodeSSH>` - SSH 客户端实例

#### `getBastionSSHClient(config)`
获取连接到堡垒机的 SSH 客户端

- **参数**:
    - `config` (BastionSSHClientConfig): 堡垒机配置
- **返回值**: `Promise<NodeSSH>` - SSH 客户端实例

#### `execRemoteWindowServerCommand(ssh, command)`
在远程 Windows Server 上执行命令

- **参数**:
    - `ssh` (NodeSSH): SSH 客户端实例
    - `command` (string): 要执行的命令
- **返回值**: `Promise<SSHExecCommandResponse>` - 命令执行结果

#### `makeDirectoryOnRemoteWindowServer(ssh, config)`
在远程 Windows Server 上创建目录

- **参数**:
    - `ssh` (NodeSSH): SSH 客户端实例
    - `config` (MakeDirectoryConfig): 目录创建配置
- **返回值**: `Promise<void>`

#### `putDirectoryToRemoteWindowServer(ssh, config)`
上传目录到远程 Windows Server

- **参数**:
    - `ssh` (NodeSSH): SSH 客户端实例
    - `config` (UploadDownloadConfig): 上传配置
- **返回值**: `Promise<any>` - 上传结果

#### `getDirectoryFromRemoteWindowServer(ssh, config)`
从远程 Windows Server 下载目录

- **参数**:
    - `ssh` (NodeSSH): SSH 客户端实例
    - `config` (UploadDownloadConfig): 下载配置
- **返回值**: `Promise<any>` - 下载结果

#### `clearRemoteWindowServerDir(ssh, path)`
清空远程 Windows Server 上的目录

- **参数**:
    - `ssh` (NodeSSH): SSH 客户端实例
    - `path` (string): 目录路径
- **返回值**: `Promise<any>` - 执行结果

#### `execIntraServerCommand(bastionSSH, channelConfig, targetConfig, command)`
在堡垒机内部服务器上执行命令

- **参数**:
    - `bastionSSH` (NodeSSH): 堡垒机 SSH 客户端实例
    - `channelConfig` (BastionChannelConfig): 通道配置
    - `targetConfig` (TargetSSHClientConfig): 目标服务器配置
    - `command` (string): 要执行的命令
- **返回值**: `Promise<SSHExecCommandResponse>` - 命令执行结果

#### `makeDirectoryOnIntraServer(bastionSSH, channelConfig, targetConfig, config)`
在堡垒机内部服务器上创建目录

- **参数**:
    - `bastionSSH` (NodeSSH): 堡垒机 SSH 客户端实例
    - `channelConfig` (BastionChannelConfig): 通道配置
    - `targetConfig` (TargetSSHClientConfig): 目标服务器配置
    - `config` (MakeDirectoryConfig): 目录创建配置
- **返回值**: `Promise<void>`

#### `putDirectoryToIntraServer(bastionSSH, channelConfig, targetConfig, config)`
上传目录到堡垒机内部服务器

- **参数**:
    - `bastionSSH` (NodeSSH): 堡垒机 SSH 客户端实例
    - `channelConfig` (BastionChannelConfig): 通道配置
    - `targetConfig` (TargetSSHClientConfig): 目标服务器配置
    - `config` (UploadDownloadConfig): 上传配置
- **返回值**: `Promise<any>` - 上传结果

#### `getDirectoryFromIntraServer(bastionSSH, channelConfig, targetConfig, config)`
从堡垒机内部服务器下载目录

- **参数**:
    - `bastionSSH` (NodeSSH): 堡垒机 SSH 客户端实例
    - `channelConfig` (BastionChannelConfig): 通道配置
    - `targetConfig` (TargetSSHClientConfig): 目标服务器配置
    - `config` (UploadDownloadConfig): 下载配置
- **返回값**: `Promise<any>` - 下载结果

### 子进程工具函数 (childProcess.js)

#### `execCommandUnderDirectory(directory, command)`
在指定目录下执行命令

- **参数**:
    - `directory` (string): 目标目录
    - `command` (string): 要执行的命令
- **返回值**: `Promise<any>` - 命令执行结果

#### `execProjectPNPMCommand(projectDir, command)`
在项目目录下执行 pnpm 命令

- **参数**:
    - `projectDir` (string): 项目目录
    - `command` (string): pnpm 命令
- **返回값**: `Promise<any>` - 命令执行结果
