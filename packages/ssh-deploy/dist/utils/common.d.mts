import { B as BuildConfig, T as TargetSSHClientConfig, a as BastionChannelConfig, b as BastionSSHClientConfig } from '../shared/ssh-deploy.BPGd0bH8.mjs';
import 'ssh2';

/**
 * @author: ares
 * @date: 2026/1/26 上午9:38
 * @description: 获取堡垒机配置
 * @param config
 */
declare function getBastionConfig(config?: BastionSSHClientConfig): BastionSSHClientConfig;
/**
 * @author: ares
 * @date: 2026/1/26 上午9:42
 * @description: 获取堡垒机内部linux服务器配置
 * @param config
 */
declare function getBastionTargetConfig(config?: TargetSSHClientConfig): TargetSSHClientConfig;
/**
 * @author: ares
 * @date: 2026/1/26 上午9:43
 * @description: 获取堡垒机连接内部服务器通道配置
 * @param config
 */
declare function getBastionChannelConfig(config?: TargetSSHClientConfig): BastionChannelConfig;
/**
 * @author: ares
 * @date: 2026/1/26 上午9:42
 * @description: 获取堡垒机内部linux服务器配置
 * @param config
 */
declare function getWindowsServerTargetConfig(config?: TargetSSHClientConfig): TargetSSHClientConfig;
/**
 * @author: ares
 * @date: 2026/1/26 上午10:13
 * @description: 获取打包项目配置
 * @param config
 */
declare function getBuildConfig(config: BuildConfig): BuildConfig;
/**
 * @author: ares
 * @date: 2025/8/29 上午10:55
 * @description: 打包项目
 * @param bConfig
 * @returns {Promise<*>}
 */
declare function buildProject(bConfig: BuildConfig): Promise<any>;

export { buildProject, getBastionChannelConfig, getBastionConfig, getBastionTargetConfig, getBuildConfig, getWindowsServerTargetConfig };
