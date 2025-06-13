---
title: "Building a Cloudflare Worker to Monitor Node Uptime and Send Telegram Notifications 🔔"
description: "Cloudflare Workers is a serverless platform that allows you to run JavaScript code at the edge of the network, closest to your users. With Workers, you can modify or extend the behavior of your website or application without modifying the underlying infrastructure."
date: "10th June 2025"
---

## Introduction

In today's digital age, ensuring the uptime and reliability of our applications is crucial. One way to achieve this is by monitoring our nodes and sending notifications when downtime is detected. In this article, we'll explore how to create a Cloudflare Worker that scans for node downtime and sends alerts to Telegram using a scheduler.

## What is a Cloudflare Worker?

Cloudflare Workers is a serverless platform that allows you to run JavaScript code at the edge of the network, closest to your users. With Workers, you can modify or extend the behavior of your website or application without modifying the underlying infrastructure.

## What is Telegram?

Telegram is a popular messaging app that allows users to send and receive messages, files, and other media. We'll use Telegram's Bot API to send notifications to users when node downtime is detected.

---

## Step 1: Create a Telegram Bot

To send notifications to Telegram, we need to create a bot. Follow these steps:

1. Open Telegram and search for the **"BotFather"** bot.
2. Start a conversation with BotFather and follow the instructions to create a new bot.
3. Note down the API token provided by BotFather.

---

## Step 2: Create a Cloudflare Worker

Create a new Cloudflare Worker by going to the Cloudflare dashboard and navigating to the **"Workers"** tab. Click on **"Create a Worker"** and choose **"Blank Worker"**.

---

## Step 3: Write the Worker Code

In this example, we'll use JavaScript to write the Worker code. We'll use the `fetch` API to make requests to our node and check for uptime. If the node is down, we'll send a notification to Telegram using the Bot API.

### `wrangler.toml`

```toml
name = "edge-staking-monitor"
main = "src/worker.js"
compatibility_date = "2024-12-07"
workers_dev = true
preview_urls = false

[triggers]
crons = [ "*/5 * * * *" ]
```

### `worker.js`

```javascript
const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN_HERE_FROM_BOTFATHER';
const CHAT_ID = 'YOUR_CHAT_ID_HERE_FROM_CHATID_ECHO_BOT';

const EXPLORER_BASE_URL = 'https://xe.network/node';
const EDGE_NODES = [
  { name: 'Oracle-Ampere-ARM64', address: 'NODE_ADDRESS_1' },
  { name: 'Oracle-x86', address: 'NODE_ADDRESS_2' },
];

// Add link property to each object
EDGE_NODES.forEach((node) => {
  node.link = `${EXPLORER_BASE_URL}/${node.address}`;
});

async function sendTelegramMessage(chatId, message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const payload = {
    chat_id: chatId,
    text: message,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      return new Response('Message sent successfully: ' + JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('Failed to send message: ' + (await response.text()), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response('Error: ' + error.message, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function scanNodes() {
  async function getEdgeNodeStatus(address) {
    let response = await fetch(`https://index.xe.network/session/${address}`, {
      headers: {
        accept: '*/*',
        'cache-control': 'no-cache',
      },
      body: null,
      method: 'GET',
    });

    return await response.json();
  }

  let allNodeStats = await Promise.all(EDGE_NODES.map((node) => getEdgeNodeStatus(node.address)));

  let nodesInfo = [];
  allNodeStats.forEach((nodeResponse, index) => {
    let message = '';
    let node = EDGE_NODES[index];
    if (nodeResponse.online) {
      message = `🟩 ${node.name} is Online!`;
    } else {
      message = `🟥 ${node.name} is Offline, Please restart the node.`;
    }
    nodesInfo.push({ node, nodeResponse, message });
  });

  return nodesInfo;
}

async function scheduled(event, env, ctx) {
  let nodesInfo = await scanNodes();
  let finalMsg = nodesInfo
    .filter((node) => node.message.toLowerCase().includes('offline'))
    .map((node) => node.message)
    .join('\r\n');

  await sendTelegramMessage(CHAT_ID, finalMsg);
  return new Response(JSON.stringify({ status: 'Checked and notified' }));
}
```

---

## Step 4: Schedule the Worker

To scan for node downtime regularly, we'll use Cloudflare's built-in scheduler:

1. Go to the Cloudflare dashboard and navigate to the **"Workers"** tab.
2. Click on the three dots next to your Worker and select **"Edit"**.
3. In the **"Triggers"** section, click on **"Add trigger"** and select **"Scheduled"**.
4. Set the schedule to run every 1 minute (or your desired interval).

---

## Conclusion

In this article, we've created a Cloudflare Worker that scans for node downtime and sends notifications to Telegram using a scheduler. This setup allows you to monitor your nodes and receive alerts when downtime is detected, ensuring your applications remain reliable and available.

---

## Example Use Cases

* Monitor website-specific sections to check for service availability and uptime and receive notifications when the site goes down.
* Track API endpoint uptime and receive alerts when the endpoint is unavailable.
* Monitor server uptime and receive notifications when the server goes down.

---

## Further Reading

* [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
* [Telegram Bot API documentation](https://core.telegram.org/bots/api)


