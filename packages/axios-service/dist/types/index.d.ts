import type {RawAxiosRequestHeaders} from 'axios'

export interface Console {
	// 直接扩展 console 接口
	success?: (...args: any[]) => void;
}

export interface Fn<T = any> {
	(...arg: T[]): T
}

export interface AsyncFn<T = any> {
	(...arg: T[]): Promise<T>
}

export type Nullable<T> = T | null | undefined

export type Recordable<K extends string | number | symbol = string, T = any> = Record<K extends null | undefined ? string : K, T>

export type AxiosContentType =
	| 'application/json'
	| 'application/x-www-form-urlencoded'
	| 'multipart/form-data'
	| 'text/plain'

export type AxiosMethod = 'get' | 'post' | 'delete' | 'put' | 'patch' | 'options'

export type AxiosResponseType = | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosConfig {
	params?: any
	data?: any
	url?: string
	method?: AxiosMethod
	headers?: RawAxiosRequestHeaders
	responseType?: AxiosResponseType
}

export interface AxiosDefineConfig {
	baseUrl?: string
	host?: string
	responseSuccessStatus?: number | string
	responseSuccessCode?: number | string
	sessionExpireCode?: number | string
	responseCodeField?: string
	responseMsgField?: string
	defaultHeaders?: AxiosContentType
	requestTimeout?: number
	tokenKey?: string
	getToken?: Fn
	handleErrorMsg?: Fn
}

export interface AxiosServiceConfig {
	service?: AsyncFn
	module?: string
	prefix?: string
	permissionPrefix?: string
	permissionConfig?: Record<string, string>
	apiPathConfig?: Record<string, string>
}

export interface IResponsePageData<T> {
	total?: number | unknown
	list: T[]

	[key: string]: any
}

export interface IResponse<T = any, P = boolean> {
	code: number
	msg: string
	data: P extends true ? IResponsePageData<T> : T

	[key: string]: any
}


