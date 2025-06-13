---
title: "How to correctly run long-running shell commands for Database migrations ✅"
description: "When running long-running shell commands, such as database migrations, over an SSH connection, it’s important to ensure the process continues even if your SSH session is interrupted"
date: "Aug 31, 2024"
---
![long-running-shell-tasks](/blog-assets/long-running-shell-tasks.png)

When running long-running shell commands, such as database migrations, over an SSH connection, it’s important to ensure the process continues even if your SSH session is interrupted. There are a few strategies you can use:

---

## Using `nohup` (No Hang Up)

`nohup` allows a command to keep running after the session is closed.

**Usage:**
```bash
nohup <your-command> &
```

**Example for a database migration:**

```bash
nohup python manage.py migrate &
```

> This will redirect the command’s output to a file named `nohup.out` in the current directory.

---

## Using `screen`

`screen` allows you to start a command and then disconnect, leaving the command running in the background.

**Start a new screen session:**

```bash
screen
```

**Run your command inside the screen session:**

```bash
python manage.py migrate
```

**Detach from the screen session by pressing:** `Ctrl-A` followed by `D`.

**Reattach to the session later using:**

```bash
screen -r
```

---

## Using `tmux`

`tmux` is similar to screen and is used for managing multiple terminal sessions.

**Start a new tmux session:**

```bash
tmux
```

**Run your command inside the tmux session:**

```bash
python manage.py migrate
```

**Detach from the tmux session by pressing:** `Ctrl-B` followed by `D`.

**Reattach to the session later using:**

```bash
tmux attach
```

---

## Using `disown`

`disown` can be used to remove jobs from the shell's job table, allowing them to continue running after the shell session ends.

**Run your command in the background:**

```bash
python manage.py migrate &
```

**Get the job ID of the command using:**

```bash
jobs
```

**Use `disown` with the job ID:**

```bash
disown %1
```

---

These methods ensure that your database migrations or any other long-running commands continue to execute even if your SSH session is disconnected.

