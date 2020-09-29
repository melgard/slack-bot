import app from "./app";

async function main() {
  await app()
}

main().then(() => console.log('Slack bot server is running'));
