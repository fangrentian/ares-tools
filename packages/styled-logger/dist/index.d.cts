declare class StyledLogger {
    #private;
    constructor(styleConfig?: {});
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:19
     * @description: 覆盖原始console方法
     */
    overrideOriginalLogger(): void;
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:19
     * @description: 还原原始console方法
     */
    restoreOriginalLogger(): void;
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:19
     * @description: 更新样式配置
     * @param styleConfig
     */
    updateStyleConfig(styleConfig?: {}): void;
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:19
     * @description: StyledLogger实例log方法
     * @param args
     */
    log(...args: any[]): void;
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:22
     * @description: StyledLogger实例success方法
     * @param args
     */
    success(...args: any[]): void;
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:22
     * @description: StyledLogger实例warn方法
     * @param args
     */
    warn(...args: any[]): void;
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:22
     * @description: StyledLogger实例error方法
     * @param args
     */
    error(...args: any[]): void;
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:22
     * @description: StyledLogger实例info方法
     * @param args
     */
    info(...args: any[]): void;
    /**
     * @author: ares
     * @date: 2026/1/16 上午11:22
     * @description: StyledLogger实例debug方法
     * @param args
     */
    debug(...args: any[]): void;
}

export { StyledLogger };
