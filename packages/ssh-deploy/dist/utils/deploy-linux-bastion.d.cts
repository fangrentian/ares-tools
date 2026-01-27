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
 * @description: 备份远程项目文件到本地
 * @param bastionSSH
 * @returns {Promise<*>}
 */
declare function backupLocal(bastionSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:23
 * @description: 在服务器端备份远程项目文件
 * @param bastionSSH
 * @returns {Promise<*>}
 */
declare function backupRemote(bastionSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:26
 * @description: 检查服务器上的相关目录是否存在
 * @param bastionSSH
 * @returns {Promise<void>}
 */
declare function checkRemoteDirExist(bastionSSH: NodeSSH): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:32
 * @description: 把被健康检查的文件移动至其它目录, 使健康检查失效
 * @param bastionSSH
 * @returns {Promise<*>}
 */
declare function hideHealthFile(bastionSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:32
 * @description: 把被移动至其它目录的被健康检查的文件移动回原来的目录, 使健康检查生效效
 * @param bastionSSH
 * @returns {Promise<*>}
 */
declare function displayHealthFile(bastionSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:28
 * @description: 删除远程临时目录
 * @param bastionSSH
 * @returns {Promise<*>}
 */
declare function clearRemoteTempDir(bastionSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:30
 * @description: 上传到远程临时目录
 * @param bastionSSH
 * @returns {Promise<*>}
 */
declare function uploadToRemoteTempDir(bastionSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:31
 * @description: 清空远程目标目录
 * @param bastionSSH
 * @returns {Promise<*>}
 */
declare function clearRemoteTargetDir(bastionSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:32
 * @description: 移动远程临时目录内容到目标目录
 * @param bastionSSH
 * @returns {Promise<*>}
 */
declare function moveRemoteTempDirToTargetDir(bastionSSH: NodeSSH): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:37
 * @description: 通过堡垒机部署项目到linux服务器
 * @returns {Promise<boolean>}
 */
declare function deployLinuxBastion(build?: boolean): Promise<boolean>;
/**
 * @author: ares
 * @date: 2025/9/11 下午1:00
 * @description: 使健康检查生效
 */
declare function enableLinuxBastionHealthCheck(): Promise<void>;
/**
 * @author: ares
 * @date: 2025/9/11 下午1:00
 * @description: 使健康检查失效
 */
declare function disableLinuxBastionHealthCheck(): Promise<void>;

export { backupLocal, backupRemote, buildProject, checkRemoteDirExist, clearRemoteTargetDir, clearRemoteTempDir, deployLinuxBastion, disableLinuxBastionHealthCheck, displayHealthFile, enableLinuxBastionHealthCheck, hideHealthFile, moveRemoteTempDirToTargetDir, uploadToRemoteTempDir };
