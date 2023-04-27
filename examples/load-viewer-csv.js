async function load() {
  let resp = await fetch("superstore.csv");
  let csv = await resp.text();
  const viewer = document.querySelector("perspective-viewer");
  const worker = perspective.worker();
  const table = worker.table(csv);
  await viewer.load(table);
}

await load();
