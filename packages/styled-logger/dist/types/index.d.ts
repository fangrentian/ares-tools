
export {};

declare global {
	interface Console {
		// 直接扩展 console 接口
		success?: (...args: any[]) => void;
	}
}
