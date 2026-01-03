const RPC = require("discord-rpc");
const express = require("express");
const fetch = require("node-fetch");

const CLIENT_ID = "1456749132403183738";
const rpc = new RPC.Client({ transport: "ipc" });
const app = express();
app.use(express.json());

let connected = false;

const steamCache = {};

function connectRPC() {
  rpc.login({ clientId: CLIENT_ID }).catch(() => {
    console.log("Discord not ready, retrying in 3s...");
    setTimeout(connectRPC, 3000);
  });
}

rpc.on("ready", () => {
  connected = true;
  console.log("Discord RPC ready");
});

rpc.on("disconnected", () => {
  connected = false;
  console.log("Discord disconnected, reconnecting...");
  connectRPC();
});

connectRPC();

async function getSteamGameName(appId) {
  if (steamCache[appId]) return steamCache[appId];

  try {
    const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
    const json = await res.json();
    if (!json[appId]?.success) return null;
    const name = json[appId].data.name;
    steamCache[appId] = name;
    return name;
  } catch (err) {
    console.error("Steam API fetch error:", err);
    return null;
  }
}

app.post("/presence", async (req, res) => {
  if (!connected) return res.sendStatus(503);

  const { appId } = req.body;
  const gameName = await getSteamGameName(appId);

  rpc.setActivity({
    name: "Highscore",
    type: 0,
    details: gameName ? `Playing ${gameName}` : "Playing on Highscore",
    timestamps: { start: Math.floor(Date.now() / 1000) }
  }).catch(err => console.error("Failed to set activity:", err));

  res.sendStatus(200);
});

app.post("/clear", (req, res) => {
  if (connected) {
    rpc.clearActivity().catch(err => console.error("Failed to clear activity:", err));
  }
  res.sendStatus(200);
});

function clearActivity() {
  if (connected) {
    rpc.clearActivity().catch(() => {});
    console.log("Cleared Discord activity");
  }
}

process.on("exit", clearActivity);
process.on("SIGINT", () => { clearActivity(); process.exit(); });
process.on("SIGTERM", () => { clearActivity(); process.exit(); });
process.on("uncaughtException", (err) => { 
  console.error("Uncaught exception:", err); 
  clearActivity(); 
  process.exit(1); 
});

app.listen(3020, () => console.log("Helper listening on http://localhost:3020"));

setInterval(() => {}, 1000);