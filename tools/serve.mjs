// Serves the site locally: npm run serve
import { startServer } from "./serve-lib.mjs";
const s = await startServer(process.cwd(), Number(process.env.PORT) || 8765);
console.log(`Shortcut Press running at http://localhost:${s.port}/`);
