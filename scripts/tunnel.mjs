import { bin, install, Tunnel } from "cloudflared";
import { existsSync } from "node:fs";

const port = process.env.PORT ?? process.argv[2] ?? "3000";

if (!existsSync(bin)) {
  await install(bin);
}

const tunnel = Tunnel.quick(`http://localhost:${port}`);

tunnel.once("url", (url) => {
  console.log(`\nShare this link with your friend: ${url}\n`);
});
tunnel.on("error", (error) => console.error(error));
tunnel.on("exit", (code) => process.exit(code ?? 0));

process.on("SIGINT", () => tunnel.stop());
