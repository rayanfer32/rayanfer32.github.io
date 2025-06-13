---
title: "Skip ChatGPT Once in a While 😄"
description: "The other day I needed to show icons on a logistics dashboard based on the status of a shipment and its current location type (warehouse, transit, port, etc"
date: "10th June 2025"
---

The other day I needed to show icons on a logistics dashboard based on the status of a shipment and its current location type (warehouse, transit, port, etc.).

The backend would send something like:

```json
{
  "shipment_status": "Delayed",
  "location_type": "Port",
  "success": true
}
```

But of course, instead of just three or four simple conditions, the logic was handed to me in an Excel file with **20+ combinations** like this:

| shipment\_status | location\_type | icon            |
| ---------------- | -------------- | --------------- |
| In Transit       | Warehouse      | "truck-loading" |
| In Transit       | Port           | "cargo-ship"    |
| Delayed          | Port           | "warning-ship"  |
| Delivered        | Warehouse      | "check-circle"  |
| Delayed          | Transit        | "warning-truck" |

At first, I thought of hardcoding the logic like a caveman.
But my developer instincts said: “Wait, let’s automate this.”

So I converted the Excel file into JSON using a helper:

```js
function convertToJson(rawExcelTabSeparatedData) {
  // parse rows, trim extra whitespace, and convert to JSON
  return cleanedJsonArray;
}

const ICON_RULES = convertToJson(excelData);
```

⚠️ **Heads-up**: Always clean your raw data—remove extra tabs, inconsistent quotes, or trailing spaces.

Now all I had to do was this:

```js
function getShipmentIcon(shipmentStatus, locationType) {
  const rule = ICON_RULES.find(item =>
    item.shipment_status === shipmentStatus &&
    item.location_type === locationType
  );
  return rule?.icon || "default-icon";
}
```

And voilà! The UI shows the right icon depending on live data from the API.

---

**What’s the takeaway?**
Sometimes the solution is just:
📄 → 🧼 → 🔄 → `.find()`.

No need to overthink it. Use the language features you already know to turn messy Excel logic into clean JSON-driven code.

And yeah—skip ChatGPT once in a while 😉
Let your brain run wild before you ask the bot.

---

Want help turning this into a slick blog post, code snippet, or animated tutorial? Just say the word.
