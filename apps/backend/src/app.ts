import createServer from "./server.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT ?? 3000;

const app = createServer();

app.listen(PORT, () => {
  logger.info(`[server]: Server is running on PORT ${PORT}`);
});
