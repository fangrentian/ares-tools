import { NodeSSH, SSHExecCommandResponse } from 'node-ssh';

/**
 * @author: ares
 * @date: 2025/8/29 上午10:23
 * @description: 备份远程项目文件到本地
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<*>}
 */
declare function backupLocal(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:23
 * @description: 在服务器端备份远程项目文件
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<SSHExecCommandResponse>}
 */
declare function backupRemote(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<SSHExecCommandResponse>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:26
 * @description: 检查服务器上的相关目录是否存在
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<void>}
 */
declare function checkRemoteDirExist(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:32
 * @description: 把被健康检查的文件移动至其它目录, 使健康检查失效
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<SSHExecCommandResponse>}
 */
declare function hideHealthFile(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<SSHExecCommandResponse>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:32
 * @description: 把被移动至其它目录的被健康检查的文件移动回原来的目录, 使健康检查生效效
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<SSHExecCommandResponse>}
 */
declare function displayHealthFile(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<SSHExecCommandResponse>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:28
 * @description: 删除远程临时目录
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<SSHExecCommandResponse>}
 */
declare function clearRemoteTempDir(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<SSHExecCommandResponse>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:30
 * @description: 上传到远程临时目录
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<*>}
 */
declare function uploadToRemoteTempDir(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:31
 * @description: 清空远程目标目录
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<SSHExecCommandResponse>}
 */
declare function clearRemoteTargetDir(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<SSHExecCommandResponse>;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:32
 * @description: 移动远程临时目录内容到目标目录
 * @param bastionSSH
 * @param targetConfig
 * @param channelConfig
 * @returns {Promise<SSHExecCommandResponse>}
 */
declare function moveRemoteTempDirToTargetDir(bastionSSH: NodeSSH, targetConfig: TargetSSHClientConfig, channelConfig: BastionChannelConfig): Promise<SSHExecCommandResponse>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:37
 * @description: 通过堡垒机部署项目到linux服务器
 * @param bConfig 打包前端项目配置
 * @param btConfig 堡垒机配置
 * @param tConfig 堡垒机内部linux服务器配置
 * @returns {Promise<boolean>}
 */
declare function deployToLinuxBastionInternalServer(bConfig?: BuildConfig, btConfig?: BastionSSHClientConfig, tConfig?: TargetSSHClientConfig): Promise<boolean>;
/**
 * @author: ares
 * @date: 2025/9/11 下午1:00
 * @description: 使健康检查生效
 * @param bConfig 堡垒机配置
 * @param tConfig 堡垒机内部linux服务器配置
 */
declare function enableLinuxBastionHealthCheck(bConfig?: BastionSSHClientConfig, tConfig?: TargetSSHClientConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/9/11 下午1:00
 * @description: 使健康检查失效
 * @param bConfig 堡垒机配置
 * @param tConfig 堡垒机内部linux服务器配置
 */
declare function disableLinuxBastionHealthCheck(bConfig?: BastionSSHClientConfig, tConfig?: TargetSSHClientConfig): Promise<void>;

export { backupLocal, backupRemote, checkRemoteDirExist, clearRemoteTargetDir, clearRemoteTempDir, deployToLinuxBastionInternalServer, disableLinuxBastionHealthCheck, displayHealthFile, enableLinuxBastionHealthCheck, hideHealthFile, moveRemoteTempDirToTargetDir, uploadToRemoteTempDir };
