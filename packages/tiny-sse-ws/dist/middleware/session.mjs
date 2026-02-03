import e from"express-session";const{SESSION_SECRET:r}=process.env;function s(){return e({secret:r,resave:!1,saveUninitialized:!0})}export{s as getSessionMiddleware};
