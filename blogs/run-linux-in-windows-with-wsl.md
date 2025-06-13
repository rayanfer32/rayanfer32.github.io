---
title: "The Best of Both Worlds: Run Linux GUI Apps Seamlessly on Windows with WSL 🎉 "
description: "Thanks to Microsoft, developers can now truly live the dream: a smooth workflow with the power of Linux and the convenience of Windows — all in one place."
date: "Oct 24, 2023"
---


![run-linux-in-windows-with-wsl](/blog-assets/run-linux-in-windows-with-wsl.png)

Thanks to Microsoft, developers can now truly live the dream: a smooth workflow with the power of Linux and the convenience of Windows — all in one place.

With WSL (Windows Subsystem for Linux), you can:

✅ Run full Linux distros
✅ Launch Linux GUI apps
✅ Browse Linux files in Windows Explorer
✅ Use VS Code directly inside your Linux environment

And the best part? It’s ridiculously simple to get started.

---

### 🛠️ Step 1: Install WSL

If you’re on **Windows 10 (build 2004+) or Windows 11**, just open PowerShell or Command Prompt as Administrator and run:

```bash
wsl --install
```

This command installs:

* WSL 2
* Ubuntu (by default)
* The required Linux kernel

After installation, restart your system when prompted.

---

### 👤 Step 2: Set Up Your Linux User

Once Ubuntu starts up, you’ll be asked to create a username and password.

Want to change the default user later?

```bash
ubuntu config --default-user your_username
```

---

### 🔄 Imported Distros & Default Users

If you’ve cloned/imported a custom WSL distro using:

```bash
wsl --export
wsl --import
```

And you're always logged in as root or the wrong user, refer to this SuperUser thread for a fix:
🔗 [Set default user for manually installed WSL distro](https://superuser.com/questions/1658576/how-to-set-default-user-for-manually-installed-wsl-distro)

---

### 🧑‍💻 Step 3: Open VS Code in WSL

Once inside Ubuntu, type:

```bash
code .
```

![wsl-for-code](/blog-assets/wsl-for-code.png)

If you've installed VS Code from the [Microsoft Store](https://apps.microsoft.com/store/detail/XP9KHM4BK9FZ7Q), this will open your current Linux directory in a native VS Code window — **no extra setup needed**.

---

### 📂 Step 4: Browse Linux Files

Open File Explorer and enter:

```
\\wsl$\Ubuntu\
```

Navigate your Linux filesystem just like a normal folder. You can also create a `/home/yourname/projects/` directory and see it reflected here.

---

### 🪟 Bonus: Run Linux GUI Apps!

Let’s try something fun — a graphical Linux app running on Windows.

```bash
sudo apt update
sudo apt install mate-system-monitor
mate-system-monitor
```

This installs a task manager utility, and yes — it launches **as a GUI app** on your Windows desktop. 🎉

---

### 🔚 Wrap-up

With WSL2 + GUI support + VS Code integration, Microsoft has built a developer experience that’s hard to beat.

No dual-booting. No VMs. Just one command line away from a full Linux workstation — right inside Windows.

Have fun hacking!

---
