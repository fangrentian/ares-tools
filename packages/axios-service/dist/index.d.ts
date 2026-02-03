import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Fn<T = any> {
	(...arg: T[]): T
}

interface AsyncFn<T = any> {
	(...arg: T[]): Promise<T>
}

type Recordable<K extends string | number | symbol = string, T = any> = Record<K extends null | undefined ? string : K, T>

type AxiosContentType =
	| 'application/json'
	| 'application/x-www-form-urlencoded'
	| 'multipart/form-data'
	| 'text/plain'

interface AxiosDefineConfig {
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

interface AxiosServiceConfig {
	service?: AsyncFn
	module?: string
	prefix?: string
	permissionPrefix?: string
	permissionConfig?: Record<string, string>
	apiPathConfig?: Record<string, string>
}

interface IResponsePageData<T> {
	total?: number | unknown
	list: T[]

	[key: string]: any
}

interface IResponse<T = any, P = boolean> {
	code: number
	msg: string
	data: P extends true ? IResponsePageData<T> : T

	[key: string]: any
}

/**
 * @author: ares
 * @date: 2026/1/28 下午1:57
 * @description: 定义AxiosService
 * @param config
 */
declare const defineAxiosService: (config?: AxiosDefineConfig) => {
    $service: <T>(config: AxiosRequestConfig, ignoreError?: boolean) => Promise<IResponse<T>>;
    $upload: <T>(config: AxiosRequestConfig, ignoreError?: boolean) => Promise<IResponse<T>>;
    $download: <T>(config: AxiosRequestConfig, ignoreError?: boolean) => Promise<IResponse<T>>;
    $axios: (config: AxiosRequestConfig) => Promise<AxiosResponse>;
    BaseServiceConfigurator: {
        new (config: AxiosServiceConfig): {
            module: string;
            prefix: string;
            permissionPrefix: string;
            permissionConfig: Record<string, string>;
            apiPathConfig: Record<string, string>;
        };
    };
    BaseService: {
        new (requester?: (<T>(config: AxiosRequestConfig, ignoreError?: boolean) => Promise<IResponse<T>>) | null | undefined, Configurator?: (new (options: AxiosServiceConfig) => {
            module: string;
            prefix: string;
            permissionPrefix: string;
            permissionConfig: Record<string, string>;
            apiPathConfig: Record<string, string>;
        }) | null | undefined, options?: AxiosServiceConfig): {
            requester: <T>(config: AxiosRequestConfig, ignoreError?: boolean) => Promise<IResponse<T>>;
            config: InstanceType<{
                new (config: AxiosServiceConfig): {
                    module: string;
                    prefix: string;
                    permissionPrefix: string;
                    permissionConfig: Record<string, string>;
                    apiPathConfig: Record<string, string>;
                };
            }>;
            definedConfig: AxiosDefineConfig;
            /**
             * @author: ares
             * @date: 2021/4/24 11:29
             * @description:  创建
             * @param {object}data
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            create<T>(data: any, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:31
             * @description: 删除
             * @param {string | number}fieldValue
             * @param {string}fieldName  按指定字段删除
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            remove<T>(fieldValue: string | number, fieldName?: string, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2024/10/10 下午2:36
             * @description: 批量删除
             * @param {array}ids
             * @param {string}fieldName
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            removeBatch<T>(ids: string[] | number[] | Recordable[], fieldName?: string, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:31
             * @description: 删除 post方式
             * @param {string | number}fieldValue
             * @param {string}fieldName  按指定字段删除
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            postRemove<T>(fieldValue: string | number, fieldName?: string, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2024/10/10 下午2:37
             * @description: 批量删除  post方法
             * @param {array}ids
             * @param {string}fieldName
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            postRemoveBatch<T>(ids: string[] | number[] | Recordable[], fieldName?: string, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:32
             * @description: 更新
             * @param {object}data
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            update<T>(data: Recordable, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2025/2/8 上午9:21
             * @description: 新增或更新
             * @param data
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            createOrUpdate<T>(data: Recordable, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:32
             * @description: 更新 post方式
             * @param {object}data
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            postUpdate<T>(data: Recordable, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:36
             * @description: 查询详情
             * @param {string | number}fieldValue 字段值
             * @param {string}fieldName  按指定字段查询
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            getDetail<T>(fieldValue: string | number, fieldName?: string, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:36
             * @description: 查询详情  借用postPageList方法
             * @param {string | number}fieldValue 字段值
             * @param {string}fieldName  按指定字段查询
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            getDetailByPageList<T>(fieldValue: string | number, fieldName?: string, ignoreError?: boolean): Promise<T>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:36
             * @description: 查询详情  借用postPageListV1方法
             * @param {string | number}fieldValue 字段值
             * @param {string}fieldName  按指定字段查询
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            getDetailByPageListV1<T>(fieldValue: string | number, fieldName?: string, ignoreError?: boolean): Promise<T>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:33
             * @description: 获取列表条件
             * @param {array}conditions {fieldValue: string | number, fieldName: string}
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            getList<T>(conditions?: {
                fieldValue: string | number;
                fieldName: string;
            }[], ignoreError?: boolean): Promise<IResponse<T[]>>;
            /**
             * @author: ares
             * @date: 2021/4/24 11:33
             * @description: 获取列表 post方式
             * @param {array}conditions {fieldValue: string | number, fieldName: string}
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            postList<T>(conditions?: {
                fieldValue: string | number;
                fieldName: string;
            }[], ignoreError?: boolean): Promise<IResponse<T[]>>;
            /**
             * @author: ares
             * @date: 2022/3/16 16:34
             * @description: 分页查询 get请求
             * @param {number}page      当前页
             * @param {number}pageSize  分页大小
             * @param {object}_params   其它参数
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            getPageList<T>(page?: number, pageSize?: number, _params?: {}, ignoreError?: boolean): Promise<IResponse<T[], true>>;
            /**
             * @author: ares
             * @date: 2022/3/16 16:34
             * @description: 分页查询  post请求  复杂分页查询
             * @param {number}page      当前页
             * @param {number}pageSize  分页大小
             * @param {object}params   其它参数
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            postPageList<T>(page?: number, pageSize?: number, params?: {}, ignoreError?: boolean): Promise<IResponse<T[], true>>;
            /**
             * @author: ares
             * @date: 2022/3/16 16:34
             * @description: 分页查询  post请求  复杂分页查询
             * @param {object}params   {pageIndex: 1, pageSize: 10, ...}参数
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            postPageListV1<T>(params?: {
                pageIndex: number;
                pageSize: number;
            }, ignoreError?: boolean): Promise<IResponse<T[], true>>;
            /**
             * @author: ares
             * @date: 2019/8/20 15:56
             * @description: 上传
             * @param {string}url
             * @param {object}file
             * @param {string}fileFieldName
             * @param {object}otherData    提交到服务器的额外数据
             * @param {AxiosRequestConfig}serviceConfig  上传服务配置
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            upload<T>(url: string, file: File, fileFieldName: string, otherData: any, serviceConfig: AxiosRequestConfig, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2020/6/29 23:15
             * @description: 下载
             * @param {string}url
             * @param {object}params
             * @param {object}downloadConfig  下载配置,如文件名,后缀
             * @param {AxiosRequestConfig}serviceConfig
             * @param {boolean}ignoreError
             * @returns {Promise<any>}
             */
            download(url: string, downloadConfig: Record<string, any>, params: Record<string, any>, serviceConfig: AxiosRequestConfig, ignoreError?: boolean): Promise<any>;
            /**
             * @author: ares
             * @date: 2022/7/24 21:50
             * @description: get请求
             * @param {AxiosRequestConfig}config
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            getService<T>(config: AxiosRequestConfig, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2022/7/24 22:04
             * @description: post请求
             * @param {AxiosRequestConfig}config
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            postService<T>(config: AxiosRequestConfig, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2022/7/24 22:05
             * @description: delete请求
             * @param {AxiosRequestConfig}config
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            deleteService<T>(config: AxiosRequestConfig, ignoreError?: boolean): Promise<IResponse<T>>;
            /**
             * @author: ares
             * @date: 2022/7/24 22:06
             * @description: put请求
             * @param {AxiosRequestConfig}config
             * @param {boolean}ignoreError
             * @returns {Promise<IResponse>}
             */
            putService<T>(config: AxiosRequestConfig, ignoreError?: boolean): Promise<IResponse<T>>;
        };
    };
};

export { defineAxiosService };
