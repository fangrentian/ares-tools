
export {};

declare global {
	interface Console {
		// 直接扩展 console 接口
		success?: (...args: any[]) => void;
	}

	type Recordable<K extends string | number | symbol = string, T = any> = Record<
		K extends null | undefined ? string : K,
		T
	>

}
