async function load() {
  let resp = await fetch("superstore.csv");
  let csv = await resp.text();
  const worker = perspective.worker();
  const table = worker.table(csv);
  const viewers = document.querySelectorAll("perspective-viewer");
  viewers.forEach(async (viewer) => {
    await viewer.load(table);
    await viewer.restore({ group_by: ["Row ID"] });
    if (viewer.className.length > 0) {
      await viewer.restore({ plugin_config: { theme: viewer.className } });
    }
  });
}

await load();

document
  .querySelectorAll("div.container-col > perspective-viewer")
  .forEach((viewer) =>
    viewer.restore({ plugin_config: { align: "vertical" } })
  );
