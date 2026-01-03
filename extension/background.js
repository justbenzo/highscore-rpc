let currentAppId = null;
let intervalId = null;

function updatePresence(appId) {
  fetch("http://localhost:3020/presence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appId })
  })
    .then(res => {
      if (!res.ok) throw new Error(`Status code ${res.status}`);
      currentAppId = appId;
      console.log(`Updated Discord presence for App ID ${appId}`);
    })
    .catch(err => {
      console.error("Failed to update Discord presence:", err);
    });
}

function clearPresence() {
  fetch("http://localhost:3020/clear", { method: "POST" })
    .then(res => {
      if (!res.ok) throw new Error(`Status code ${res.status}`);
      console.log("Cleared Discord presence");
      currentAppId = null;
    })
    .catch(err => {
      console.error("Failed to clear Discord presence:", err);
    });
}

function checkTabs() {
  try {
    chrome.tabs.query({}, (tabs) => {
      let found = false;

      for (const tab of tabs) {
        if (!tab.url) continue;

        const match = tab.url.match(/^https:\/\/alpha\.highscore\.com\/play\/(\d+)/);
        if (match) {
          found = true;
          const appId = match[1];
          if (appId !== currentAppId) {
            updatePresence(appId);
          }
          break;
        }
      }

      if (!found && currentAppId) {
        clearPresence();
      }
    });
  } catch (err) {
    console.error("Error querying tabs:", err);
  }
}

if (!intervalId) {
  intervalId = setInterval(checkTabs, 1000);
}