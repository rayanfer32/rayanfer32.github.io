---
title: "Build Expo APKs on GitHub Actions Without Hitting the EAS Monthly Limit 🚀 "
description: "Expo provides cloud services to build Android and iOS apps, but there's a major limitation: **a maximum of 30 builds per month** on the free plan."
date: "Nov 14, 2023"
---

![GitHub action building Android app APK/AAB artifact](/blog-assets/build-expo-react-native.png)

Expo provides cloud services to build Android and iOS apps, but there's a major limitation: **a maximum of 30 builds per month** on the free plan.

To overcome this, I set up a **GitHub Action** workflow that builds the APK using the **EAS Build Toolkit locally**, directly on GitHub's CI/CD runners. This avoids consuming your EAS cloud build quota and still produces downloadable artifacts.

In this post, I’ll walk you through the entire setup — from getting your token to generating and downloading the APK file using GitHub Actions.

---

## ✅ Prerequisites

To follow along, make sure you have:

* A GitHub repository with your Expo app.
* An [Expo account](https://expo.dev/) (required for authentication).
* An Expo **Robot Token** with **Admin** access.

> ⚠️ Viewer or Developer tokens may throw permission errors — use a **Robot token with Admin** rights.

---

## 🔧 Step 1: Initialize EAS

In your project directory, run:

```bash
eas init
```

Answer the basic setup questions. After this, update your `eas.json` to include a `preview` profile:

```json
// eas.json
{
  "cli": {
    "version": ">= 5.6.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

---

## ⚙️ Step 2: GitHub Action to Build APK

Create a new workflow file in your repo:

```yaml
# .github/workflows/android-build.yml

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: 🏗 Setup repo
        uses: actions/checkout@v3

      - name: 🏗 Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: yarn

      - name: 🏗 Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: 📦 Install dependencies
        run: yarn install

      - name: 🚀 Build app
        run: eas build --local --non-interactive --platform android --profile preview

      - name: 📤 Upload Artifact
        uses: actions/upload-artifact@v3
        with:
          name: apk-preview-build
          path: build-*.apk
```

> 💡 You must add your `EXPO_TOKEN` as a [GitHub Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in the repo settings.

---

## 🛠️ Step 3: app.json Configuration

Here’s a sample `app.json` config:

```json
// app.json
{
  "expo": {
    "owner": "myusername",
    "name": "MY_APP",
    "slug": "MY_APP",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "dev.myapp.studio"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "5fafbba5-a3e3-4607-a6b5-5ad150a00132"
      }
    }
  }
}
```

---

## 📦 Result: Preview APK Build

Now, every time you push to the `main` branch:

* GitHub will run the build workflow.
* A local EAS build will be created for Android (`.apk` file).
* The final APK will be available in your **Actions tab** under **Artifacts**.

> ⚠️ This is a **preview APK** and is **not signed** for production. Use it for testing or internal distribution only.

---

## 🔒 Final Note: APK Signing for Production

This post focuses on building a preview `.apk`. For **production-ready APKs**, you’ll need to **sign** them — a process that involves uploading keystores and configuring build credentials.

> I’ll cover APK signing and production builds in a future post once I complete the MVP of my app.

---

## 📬 Questions or Suggestions?

If you face any issues or have ideas for improvement, drop a comment below! Happy building 🚀

---
