declare global {
	namespace Express {
		interface Application {
			sseClients: Map<string, any>;
			wsClients: Map<string, any>;
		}
		interface Request {
			sessionID?: string;
			session?: any;
		}
	}
}

export {}

