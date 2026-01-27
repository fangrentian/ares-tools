import type { Channel, SFTPWrapper } from 'ssh2'

export {};

declare global {

	type Recordable<K extends string | number | symbol = string, T = any> = Record<
		K extends null | undefined ? string : K,
		T
	>

	interface SSHClientConfig {
		host?: string
		port?: number | string
		username?: string
		password?: string
		privateKey?: string
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
}
