import { getMetaData } from "./metadata/metadata";
import { publish } from "./publishing/publish";

start()
  .then(() => {
    writeDone();
  })
  .catch((error) => {
    console.error(error.stack);
  });

async function start() {
  const metadata = await getMetaData();
  await publish(metadata);
}

function writeDone() {
  //console.clear();
  console.log();
  console.log("     ┌───────────────┐");
  console.log("     │    ✓ Done!    │");
  console.log("     └───────────────┘	");
  console.log("\n\n");
}
