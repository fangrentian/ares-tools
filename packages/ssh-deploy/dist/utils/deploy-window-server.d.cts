import { NodeSSH } from 'node-ssh';

/**
 * @author: ares
 * @date: 2025/8/29 上午10:55
 * @description: 打包项目
 * @returns {Promise<*>}
 */
declare function buildProject(): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:23
 * @description: 备份远程项目文件
 * @param targetSSH
 * @returns {Promise<*>}
 */
declare function backup(targetSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:26
 * @description: 检查服务器上的相关目录是否存在
 * @param targetSSH
 * @returns {Promise<void>}
 */
declare function checkRemoteDirExist(targetSSH: NodeSSH): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:28
 * @description: 删除远程临时目录
 * @param targetSSH
 * @returns {Promise<void>}
 */
declare function clearRemoteTempDir(targetSSH: NodeSSH): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:30
 * @description: 上传到远程临时目录
 * @param targetSSH
 * @returns {Promise<void>}
 */
declare function uploadToRemoteTempDir(targetSSH: NodeSSH): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:31
 * @description: 清空远程目标目录
 * @param targetSSH
 * @returns {Promise<void>}
 */
declare function clearRemoteTargetDir(targetSSH: NodeSSH): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:32
 * @description: 移动远程临时目录内容到目标目录
 * @param targetSSH
 * @returns {Promise<void>}
 */
declare function moveRemoteTempDirToTargetDir(targetSSH: NodeSSH): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:37
 * @description: 部署项目到window-server
 */
declare function deployWindowServer(build?: boolean): Promise<boolean>;

export { backup, buildProject, checkRemoteDirExist, clearRemoteTargetDir, clearRemoteTempDir, deployWindowServer, moveRemoteTempDirToTargetDir, uploadToRemoteTempDir };
