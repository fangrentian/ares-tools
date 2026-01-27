import { ExecOptions, SpawnOptions } from 'child_process';

/**
 * @author: ares
 * @date: 2025/8/29 下午4:10
 * @description: 使用fs.rename重命名文件夹
 * @param oldPath 原文件夹路径
 * @param newPath 新文件夹路径
 * @returns {Promise<void>}
 */
declare function renameDirectory(oldPath: string, newPath: string): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:34
 * @description: 用exec执行命令
 * @param command
 * @param config
 * @returns {Promise<*>}
 */
declare function execCommand(command: string, config?: ExecOptions): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:27
 * @description: 用exec执行CD命令
 * @param path
 * @returns {Promise<*>}
 */
declare function execCDCommand(path: string): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:27
 * @description: 用exec执行PNPM命令
 * @param script
 * @param projectDir
 * @returns {Promise<*>}
 */
declare function execPNPMCommand(script: string, projectDir: string): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:27
 * @description: 用exec执行项目的PNPM命令
 * @param projectDir
 * @param script
 * @returns {Promise<*>}
 */
declare function execProjectPNPMCommand(projectDir: string, script: string): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:42
 * @description: 在指定目录下用exec执行命令
 * @param dir
 * @param command
 * @returns {Promise<*>}
 */
declare function execCommandUnderDirectory(dir: string, command: string): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午2:49
 * @description: 用spawn执行命令
 * @param command
 * @param args
 * @param config
 * @returns {Promise<*>}
 */
declare function spawnCommand(command: any, args?: string[], config?: SpawnOptions): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:27
 * @description: 用spawn执行CD命令
 * @param path
 * @returns {Promise<*>}
 */
declare function spawnCDCommand(path: string): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:27
 * @description: 执行PNPM命令
 * @param script
 * @param projectDir
 * @returns {Promise<*>}
 */
declare function spawnPNPMCommand(script: string, projectDir: string): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:27
 * @description: 用spawn执行项目的PNPM命令
 * @param projectDir
 * @param script
 * @returns {Promise<*>}
 */
declare function spawnProjectPNPMCommand(projectDir: string, script: string): Promise<any>;
/**
 * @author: ares
 * @date: 2025/8/28 下午1:42
 * @description: 在指定目录下用spawn执行命令
 * @param dir
 * @param command
 * @param args
 * @returns {Promise<*>}
 */
declare function spawnCommandUnderDirectory(dir: string, command: string, args?: string[]): Promise<any>;

export { execCDCommand, execCommand, execCommandUnderDirectory, execPNPMCommand, execProjectPNPMCommand, renameDirectory, spawnCDCommand, spawnCommand, spawnCommandUnderDirectory, spawnPNPMCommand, spawnProjectPNPMCommand };
