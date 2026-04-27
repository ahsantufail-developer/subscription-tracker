import aj from "../config/arcjet.js";
const arcjetMiddleware = (req, res) => {
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: "Rate Limit exceeds" });
            if (decision.reason.isBot()) return res.status(403).json({ message: "Bot detected" });

            return res.status(403).json({ error: "Access Denied" });
        }
        next();

    } catch (error) {
        console.log('Arcjet Middleware Error: ${error}')
        next(error);
    }

}

export default arcjetMiddleware;