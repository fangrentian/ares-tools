import { NodeSSH } from 'node-ssh';
import { B as BuildConfig, T as TargetSSHClientConfig } from '../shared/ssh-deploy.BPGd0bH8.js';
import 'ssh2';

/**
 * @author: ares
 * @date: 2025/8/29 上午10:23
 * @description: 备份远程项目文件
 * @param targetSSH
 * @param targetConfig
 * @returns {Promise<*>}
 */
declare function backup(targetSSH: NodeSSH, targetConfig: TargetSSHClientConfig): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:26
 * @description: 检查服务器上的相关目录是否存在
 * @param targetSSH
 * @param targetConfig
 * @returns {Promise<void>}
 */
declare function checkRemoteDirExist(targetSSH: NodeSSH, targetConfig: TargetSSHClientConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:28
 * @description: 删除远程临时目录
 * @param targetSSH
 * @param targetConfig
 * @returns {Promise<void>}
 */
declare function clearRemoteTempDir(targetSSH: NodeSSH, targetConfig: TargetSSHClientConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:30
 * @description: 上传到远程临时目录
 * @param targetSSH
 * @param targetConfig
 * @returns {Promise<void>}
 */
declare function uploadToRemoteTempDir(targetSSH: NodeSSH, targetConfig: TargetSSHClientConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:31
 * @description: 清空远程目标目录
 * @param targetSSH
 * @param targetConfig
 * @returns {Promise<void>}
 */
declare function clearRemoteTargetDir(targetSSH: NodeSSH, targetConfig: TargetSSHClientConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:32
 * @description: 移动远程临时目录内容到目标目录
 * @param targetSSH
 * @param targetConfig
 * @returns {Promise<void>}
 */
declare function moveRemoteTempDirToTargetDir(targetSSH: NodeSSH, targetConfig: TargetSSHClientConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:37
 * @description: 部署项目到window-server
 * @param bConfig 打包前端项目配置
 * @param tConfig 服务器配置
 */
declare function deployToWindowsServer(bConfig?: BuildConfig, tConfig?: TargetSSHClientConfig): Promise<boolean>;

export { backup, checkRemoteDirExist, clearRemoteTargetDir, clearRemoteTempDir, deployToWindowsServer, moveRemoteTempDirToTargetDir, uploadToRemoteTempDir };
