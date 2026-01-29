# axios service

## 使用示例
```ts
import {defineAxiosService} from 'ares-axios-service'
import type {AxiosRequestConfig} from 'axios'
import type {AxiosServiceConfig, IResponse} from 'ares-axios-service/types'

// 定义axios在项目中使用的配置
const axiosService = defineAxiosService({
	baseUrl: 'http://192.168.1.158/mes/',
    responseCodeField: 'code',
    responseMsgField: 'msg',
	getToken: ()=>{
		// 根据实际情况实现获取token
		return "real token"
	}
})

// 解构出service父类和配置父类
const {BaseService, BaseServiceConfigurator} = axiosService

// 实例化service父类
const service = new BaseService({
	prefix: '/api/dict/',
	apiPathConfig: {
		list: 'findList',
		typeList: 'findTypeList',
	}
})

// 使用service父类实例`getList`方法
service.getList([{fieldName: 'status', fieldValue: '1'}, {fieldName: 'type', fieldValue: '44'}]).then(res=>{
	console.log('##postList', res)
})

// 使用service父类实例通用get方法`getService`方法
service.getService({
	url: '/api/dict/findTypeList',
	method: 'get',
	params: {
		status: 1,
		type: 44
	}
}).then(res=>{
	console.log('##getService', res)
})

// 使用service父类实例通用post方法`postService`方法
service.postService({
	url: '/api/dict/findTypeList',
	method: 'post',
	data: {
		status: 1,
		type: 44
	}
}).then(res=>{
	console.log('##postService', res)
})


// 大型项目, 分模块, 可新建service继承BaseService
class DictService extends BaseService {
    constructor(
            options: AxiosServiceConfig = {},
            requester?: (<T>(config: AxiosRequestConfig, ignoreError?: boolean) => Promise<IResponse<T>>) | null | undefined,
            Configurator: (new (options: AxiosServiceConfig)=> any) | null | undefined = BaseServiceConfigurator
    ) {
        super(options, requester, Configurator)
    }
	
	async findCommonList(status: number, type: number): Promise<IResponse<Record<string, any>[]>> {
		return this.postService<Record<string, any>[]>({
			url: '/api/dict/findTypeList',
			method: 'post',
			data: {
				status,
				type
			}
		}).then(res=>{
			console.log('##findCommonList', res)
			return res
		})
	}
}

// 实例化模块化service
const dictService = new DictService()
// 使用模块化service实例方法
dictService.findCommonList(1, 44)
```

## API 详细说明

### defineAxiosService 函数
- **功能**: 定义并初始化一个 Axios 服务实例，包含了完整的请求/响应拦截器、错误处理等功能
- **参数**: 
  - `config` (AxiosDefineConfig, 可选): 配置对象，包含 baseUrl、token 获取方法等
- **返回**: 包含 `$service`、`$upload`、`$download`、`$axios`三个方法和`BaseServiceConfigurator`、`BaseService` 两个类

#### AxiosDefineConfig 配置项
- `baseUrl`: API 请求的基础路径，默认为当前页面协议+主机+端口
- `host`: 主机地址，用于会话过期时跳转
- `responseSuccessStatus`: 响应成功的 HTTP 状态码，默认为 200
- `responseSuccessCode`: 响应成功的业务码，默认为 1
- `sessionExpireCode`: 会话过期的业务码，默认为 -1
- `responseCodeField`: 响应体中表示业务码的字段名，默认为 'code'
- `responseMsgField`: 响应体中表示消息的字段名，默认为 'msg'
- `defaultHeaders`: 默认请求头类型，默认为 'application/json'
- `requestTimeout`: 请求超时时间，默认为 300000ms (5分钟)
- `tokenKey`: Token 存储的键名，默认为 'Authorization'
- `getToken`: 获取 Token 的函数
- `handleErrorMsg`: 处理错误消息的函数

### $service 函数
- **功能**: 执行基本的 HTTP 请求
- **参数**: 
  - `config` (AxiosRequestConfig): 请求配置对象
  - `ignoreError` (boolean, 可选): 是否忽略错误，默认为 false
- **返回**: Promise<IResponse<T>>

### $upload 函数
- **功能**: 执行文件上传请求
- **参数**: 
  - `config` (AxiosRequestConfig): 请求配置对象
  - `ignoreError` (boolean, 可选): 是否忽略错误，默认为 false
- **返回**: Promise<IResponse<T>>

### $download 函数
- **功能**: 执行文件下载请求
- **参数**: 
  - `config` (AxiosRequestConfig): 请求配置对象
  - `ignoreError` (boolean, 可选): 是否忽略错误，默认为 false
- **返回**: Promise<IResponse<T>>

### $axios 函数
- **功能**: 执行通用 axios 请求，不经过拦截器处理
- **参数**: `config` (AxiosRequestConfig): 请求配置对象
- **返回**: Promise<AxiosResponse>

### BaseServiceConfigurator 类
- **功能**: 配置服务的基本参数，包括权限配置、API 路径映射等
- **构造函数参数**: `config` (AxiosServiceConfig): 配置对象

#### AxiosServiceConfig 配置项
- `module`: 模块名，默认为 'sys'
- `prefix`: API 路径前缀，默认为 '/'
- `permissionPrefix`: 权限前缀
- `permissionConfig`: 权限配置对象
- `apiPathConfig`: API 路径配置对象

### BaseService 类
- **功能**: 基础服务类，封装了常用的 CRUD 操作和通用请求方法
- **构造函数参数**: 
  - `options`: 配置选项
  - `requester`: 请求函数，默认使用 `$service`
  - `Configurator`: 配置类，默认为 `BaseServiceConfigurator`

#### BaseService 实例方法

##### create<T>(data: any, ignoreError: boolean)
- **功能**: 创建资源
- **参数**: `data` - 要创建的数据，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### remove<T>(fieldValue: string | number, fieldName: string, ignoreError: boolean)
- **功能**: 删除资源（DELETE 方式）
- **参数**: `fieldValue` - 字段值，`fieldName` - 字段名，默认为 'id'，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### removeBatch<T>(ids: string[] | number[] | Recordable[], fieldName: string, ignoreError: boolean)
- **功能**: 批量删除资源（DELETE 方式）
- **参数**: `ids` - 要删除的 ID 列表，`fieldName` - 字段名，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### postRemove<T>(fieldValue: string | number, fieldName: string, ignoreError: boolean)
- **功能**: 删除资源（POST 方式）
- **参数**: `fieldValue` - 字段值，`fieldName` - 字段名，默认为 'id'，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### postRemoveBatch<T>(ids: string[] | number[] | Recordable[], fieldName: string, ignoreError: boolean)
- **功能**: 批量删除资源（POST 方式）
- **参数**: `ids` - 要删除的 ID 列表，`fieldName` - 字段名，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### update<T>(data: Recordable, ignoreError: boolean)
- **功能**: 更新资源
- **参数**: `data` - 要更新的数据，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### createOrUpdate<T>(data: Recordable, ignoreError: boolean)
- **功能**: 创建或更新资源
- **参数**: `data` - 要创建或更新的数据，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### postUpdate<T>(data: Recordable, ignoreError: boolean)
- **功能**: 更新资源（POST 方式）
- **参数**: `data` - 要更新的数据，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### getDetail<T>(fieldValue: string | number, fieldName: string, ignoreError: boolean)
- **功能**: 获取详情
- **参数**: `fieldValue` - 字段值，`fieldName` - 字段名，默认为 'id'，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### getDetailByPageList<T>(fieldValue: string | number, fieldName: string, ignoreError: boolean)
- **功能**: 通过分页列表获取详情
- **参数**: `fieldValue` - 字段值，`fieldName` - 字段名，默认为 'id'，`ignoreError` - 是否忽略错误
- **返回**: Promise<T>

##### getDetailByPageListV1<T>(fieldValue: string | number, fieldName: string, ignoreError: boolean)
- **功能**: 通过 V1 版本的分页列表获取详情
- **参数**: `fieldValue` - 字段值，`fieldName` - 字段名，默认为 'id'，`ignoreError` - 是否忽略错误
- **返回**: Promise<T>

##### getList<T>(conditions: { fieldValue: string | number; fieldName: string }[], ignoreError: boolean)
- **功能**: 获取列表（GET 方式）
- **参数**: `conditions` - 查询条件数组，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T[]>>

##### postList<T>(conditions: { fieldValue: string | number; fieldName: string }[], ignoreError: boolean)
- **功能**: 获取列表（POST 方式）
- **参数**: `conditions` - 查询条件数组，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T[]>>

##### getPageList<T>(page: number, pageSize: number, _params: any, ignoreError: boolean)
- **功能**: 分页获取列表（GET 方式）
- **参数**: `page` - 当前页码，默认为 1，`pageSize` - 每页数量，默认为 10，`_params` - 其他参数，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T[], true>>

##### postPageList<T>(page: number, pageSize: number, params: any, ignoreError: boolean)
- **功能**: 分页获取列表（POST 方式，复杂查询）
- **参数**: `page` - 当前页码，默认为 1，`pageSize` - 每页数量，默认为 10，`params` - 其他参数，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T[], true>>

##### postPageListV1<T>(params: { pageIndex: number, pageSize: number }, ignoreError: boolean)
- **功能**: V1 版本分页获取列表（POST 方式）
- **参数**: `params` - 包含 pageIndex 和 pageSize 的参数对象，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T[], true>>

##### upload<T>(url: string, file: File, fileFieldName: string, otherData: any, serviceConfig: AxiosRequestConfig, ignoreError: boolean)
- **功能**: 文件上传
- **参数**: `url` - 上传地址，`file` - 文件对象，`fileFieldName` - 文件字段名，`otherData` - 其他数据，`serviceConfig` - 服务配置，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### download(url: string, downloadConfig: Record<string, any>, params: Record<string, any>, serviceConfig: AxiosRequestConfig, ignoreError: boolean)
- **功能**: 文件下载
- **参数**: `url` - 下载地址，`downloadConfig` - 下载配置，`params` - 参数，`serviceConfig` - 服务配置，`ignoreError` - 是否忽略错误
- **返回**: Promise<any>

##### getService<T>(config: AxiosRequestConfig, ignoreError: boolean)
- **功能**: 通用 GET 请求
- **参数**: `config` - 请求配置，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### postService<T>(config: AxiosRequestConfig, ignoreError: boolean)
- **功能**: 通用 POST 请求
- **参数**: `config` - 请求配置，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### deleteService<T>(config: AxiosRequestConfig, ignoreError: boolean)
- **功能**: 通用 DELETE 请求
- **参数**: `config` - 请求配置，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

##### putService<T>(config: AxiosRequestConfig, ignoreError: boolean)
- **功能**: 通用 PUT 请求
- **参数**: `config` - 请求配置，`ignoreError` - 是否忽略错误
- **返回**: Promise<IResponse<T>>

### 常量配置
- `RESPONSE_SUCCESS_STATUS`: 请求成功 HTTP 状态码 (200)
- `RESPONSE_SUCCESS_CODE`: 请求成功业务码 (1)
- `SESSION_EXPIRE_CODE`: 会话过期业务码 (-1)
- `RESPONSE_CODE_FIELD`: 响应码字段名 ('code')
- `RESPONSE_MSG_FIELD`: 响应消息字段名 ('msg')
- `REQUEST_CONTENT_TYPE`: 默认请求类型 ('application/json')
- `REQUEST_TIMEOUT`: 请求超时时间 (300000ms)
- `TOKEN_KEY`: 请求头中的token键名 ('Authorization')

### 类型定义
- `IResponse<T, P>`: 统一响应类型，包含 `code`、`msg`、`data` 字段, 布尔泛型`P` 表示是否为分页数据
- `AxiosServiceConfig`: 服务配置类型
- `AxiosDefineConfig`: 定义配置类型
- `Recordable<K, T>`: 可记录类型
