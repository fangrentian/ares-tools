/// <reference types="node" />
import { NodeSSH, SSHExecCommandResponse, SSHExecCommandOptions } from 'node-ssh';
import { Duplex, Writable, Readable } from 'stream';

type ChannelType = "session" | "sftp" | "direct-tcpip" | "direct-streamlocal@openssh.com";

type ChannelSubType = "exec" | "shell";

interface Channel extends Duplex {
    /** Standard input for the Channel. */
    stdin: this;
    /** Standard output for the Channel. */
    stdout: this;
    /** Standard error for the Channel. */
    stderr: Writable | Readable;
    /** Indicates whether this is a server or client channel. */
    server: boolean;
    /** The channel type, usually "session". */
    type: ChannelType;
    /** The channel subtype, usually "exec", "shell", or undefined. */
    subtype?: ChannelSubType;
    incoming: unknown;
    outgoing: unknown;

    /**
     * Sends EOF to the remote side.
     */
    eof(): void;

    /**
     * Closes the channel on both sides.
     */
    close(...args: any[]): void;

    /**
     * Shuts down the channel on this side.
     */
    destroy(): this;

    /**
     * Session type-specific methods
     */
    setWindow(rows: number, cols: number, height: number, width: number): void;
    signal(signalName: string): void;
    exit(status: number): void;
    exit(signalName: string, coreDumped?: boolean, msg?: string): void;

    /**
     * Emitted once the channel is completely closed on both the client and the server.
     */
    on(event: "close", listener: () => void): this;
    on(event: "eof", listener: () => void): this;
    on(event: "end", listener: () => void): this;
    on(event: string | symbol, listener: Function): this;
    once(event: "close", listener: () => void): this;
    once(event: "eof", listener: () => void): this;
    once(event: "end", listener: () => void): this;
    once(event: string | symbol, listener: Function): this;
}

/**
 * @author: ares
 * @date: 2025/8/28 上午9:15
 * @description: SSH连接远程服务器
 * @param config
 * @returns {Promise<NodeSSH>}
 */
declare function getSSHClient(config: SSHClientConfig): Promise<NodeSSH>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:16
 * @description: SSH连接堡垒机
 * @param config
 * @returns {Promise<NodeSSH>}
 */
declare function getBastionSSHClient(config: SSHClientConfig): Promise<NodeSSH>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:21
 * @description: 通过堡垒机与内部服务器建立隧道
 * @param bastionSSHClient
 * @param config
 * @returns {Promise<Channel>}
 */
declare function getBastionChannel(bastionSSHClient: NodeSSH, config: BastionChannelConfig): Promise<Channel>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:25
 * @description: 通过堡垒机隧道与内部服务器建立SSH连接
 * @param channel
 * @param config
 * @returns {Promise<NodeSSH>}
 */
declare function getIntraServerSSHClient(channel: Channel, config: IntraServerSSHClientConfig): Promise<NodeSSH>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:29
 * @description: 在堡垒机内部服务器上执行命令
 * @param bastionSSHClient
 * @param channelConfig
 * @param intraServerConfig
 * @param command
 * @param callback
 * @returns {Promise<SSHExecCommandResponse>}
 */
declare function execIntraServerCommand(bastionSSHClient: NodeSSH, channelConfig: BastionChannelConfig, intraServerConfig: IntraServerSSHClientConfig, command: string, callback?: any): Promise<SSHExecCommandResponse>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:35
 * @description: 上传本地目录到堡垒机内部服务器
 * @param bastionSSHClient
 * @param channelConfig
 * @param intraServerConfig
 * @param config
 * @returns {Promise<void>}
 */
declare function putDirectoryToIntraServer(bastionSSHClient: NodeSSH, channelConfig: BastionChannelConfig, intraServerConfig: IntraServerSSHClientConfig, config: UploadDownloadConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午9:45
 * @description: 从堡垒机内部服务器下载目录到本地目录
 * @param bastionSSHClient
 * @param channelConfig
 * @param intraServerConfig
 * @param config
 * @returns {Promise<void>}
 */
declare function getDirectoryFromIntraServer(bastionSSHClient: NodeSSH, channelConfig: BastionChannelConfig, intraServerConfig: IntraServerSSHClientConfig, config: UploadDownloadConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 上午10:50
 * @description: 在堡垒机内部服务器上创建目录
 * @param bastionSSHClient
 * @param channelConfig
 * @param intraServerConfig
 * @param config
 * @returns {Promise<void>}
 */
declare function makeDirectoryOnIntraServer(bastionSSHClient: NodeSSH, channelConfig: BastionChannelConfig, intraServerConfig: IntraServerSSHClientConfig, config: MakeDirectoryConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:29
 * @description: 在远程服务器上执行命令
 * @param ssh
 * @param command
 * @param commandOptions
 * @param callback
 * @returns {Promise<void>}
 */
declare function execRemoteServerCommand(ssh: NodeSSH, command: string, commandOptions?: SSHExecCommandOptions, callback?: any): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:35
 * @description: 上传本地目录到远程服务器
 * @param ssh
 * @param config
 * @returns {Promise<void>}
 */
declare function putDirectoryToRemoteServer(ssh: NodeSSH, config: UploadDownloadConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午9:45
 * @description: 从远程服务器下载目录到本地目录
 * @param ssh
 * @param config
 * @returns {Promise<void>}
 */
declare function getDirectoryFromRemoteServer(ssh: NodeSSH, config: UploadDownloadConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 上午10:50
 * @description: 在远程服务器上创建目录
 * @param ssh
 * @param config
 * @returns {Promise<void>}
 */
declare function makeDirectoryOnRemoteServer(ssh: NodeSSH, config: MakeDirectoryConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:29
 * @description: 在远程windowServer上执行命令
 * @param ssh
 * @param command
 * @param commandOptions
 * @param callback
 * @returns {Promise<SSHExecCommandResponse>}
 */
declare function execRemoteWindowServerCommand(ssh: NodeSSH, command: string, commandOptions?: SSHExecCommandOptions, callback?: any): Promise<SSHExecCommandResponse>;
/**
 * @author: ares
 * @date: 2025/8/28 上午9:35
 * @description: 上传本地目录到远程windowServer
 * @param ssh
 * @param config
 * @returns {Promise<void>}
 */
declare function putDirectoryToRemoteWindowServer(ssh: NodeSSH, config: UploadDownloadConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/29 上午9:45
 * @description: 从远程windowServer下载目录到本地目录
 * @param ssh
 * @param config
 * @returns {Promise<void>}
 */
declare function getDirectoryFromRemoteWindowServer(ssh: NodeSSH, config: UploadDownloadConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/8/28 上午10:50
 * @description: 在远程windowServer上创建目录
 * @param ssh
 * @param config
 * @returns {Promise<void>}
 */
declare function makeDirectoryOnRemoteWindowServer(ssh: NodeSSH, config: MakeDirectoryConfig): Promise<void>;
/**
 * @author: ares
 * @date: 2025/9/1 下午2:25
 * @description: 在远程windowServer上清空目录
 * @param targetSSH
 * @param path
 * @returns {Promise<void>}
 */
declare function clearRemoteWindowServerDir(targetSSH: NodeSSH, path: string): Promise<void>;

export { clearRemoteWindowServerDir, execIntraServerCommand, execRemoteServerCommand, execRemoteWindowServerCommand, getBastionChannel, getBastionSSHClient, getDirectoryFromIntraServer, getDirectoryFromRemoteServer, getDirectoryFromRemoteWindowServer, getIntraServerSSHClient, getSSHClient, makeDirectoryOnIntraServer, makeDirectoryOnRemoteServer, makeDirectoryOnRemoteWindowServer, putDirectoryToIntraServer, putDirectoryToRemoteServer, putDirectoryToRemoteWindowServer };
