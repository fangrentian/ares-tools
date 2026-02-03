import { Application } from 'express';

declare class AppMapUtil {
    private app;
    constructor(app: Application);
    getSseClients(): Map<string, any>;
    addSseClient(sessionId: string, client: any): void;
    removeSseClient(sessionId: string): boolean;
    getSseClient(sessionId: string): any;
    hasSseClient(sessionId: string): boolean;
    getSseClientCount(): number;
    clearSseClients(): void;
    getWsClients(): Map<string, any>;
    addWsClient(sessionId: string, client: any): void;
    removeWsClient(sessionId: string): boolean;
    getWsClient(sessionId: string): any;
    hasWsClient(sessionId: string): boolean;
    getWsClientCount(): number;
    clearWsClients(): void;
}

export { AppMapUtil };
