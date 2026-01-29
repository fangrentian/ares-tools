import { SFTPWrapper } from 'ssh2';

interface SSHClientConfig {
	host?: string
	port?: number | string
	username?: string
	password?: string
	privateKey?: string
	[key: string]: any
}
interface BastionSSHClientConfig extends SSHClientConfig {
	[key: string]: any
}
interface TargetSSHClientConfig extends SSHClientConfig {
	localDeployDir?: string
	localDownloadDir?: string

	remoteBackupDir?: string
	remoteDir?: string
	remoteDirTemp?: string

	remoteHealthDir?: string
	remoteHideHealthFileDir?: string
	remoteHealthFile?: string
	remoteHealthHiddenFile?: string
	[key: string]: any
}
interface BastionChannelConfig {
	srcIP?: string
	srcPort?: number | string
	dstIP?: string
	dstPort?: number | string
	[key: string]: any
}
interface IntraServerSSHClientConfig {
	username?: string
	password?: string
	[key: string]: any
}
interface UploadDownloadConfig {
	localDir?: string
	remoteDir?: string
	[key: string]: any
}
interface MakeDirectoryConfig {
	path: string
	method?: 'sftp' | 'exec'
	givenSftp?: SFTPWrapper
	[key: string]: any
}

interface BuildConfig {
	build?: boolean
	mode?: string
	projectDir?: string
	[key: string]: any
}

export type { BuildConfig as B, IntraServerSSHClientConfig as I, MakeDirectoryConfig as M, SSHClientConfig as S, TargetSSHClientConfig as T, UploadDownloadConfig as U, BastionChannelConfig as a, BastionSSHClientConfig as b };
