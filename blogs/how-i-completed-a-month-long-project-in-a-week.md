---
title: "How I Completed a Month-Long React Project in a Week ⚡"
date: "Nov 2, 2023"
description: "Recently I took up the development of a new project for a bank. The client wanted the application to be responsive on all platforms like mobile, desktop, and tablets. I received the Figma and validations for the input fields"
---


![React developer tools — Part 1](/blog-assets/react-tools-1.png)


Recently I took up the development of a new project for a bank. The client wanted the application to be **responsive on all platforms** like mobile, desktop, and tablets. I received the Figma designs and validation rules for input fields.

---

## Project Scope

There were about **10 screens in total**:

1. **Login Screen** — with subtle animations  
2. **Select Currency Screen** — feature to apply promo codes, multiple validations, edit modals, etc.  
3. **Enter Details Screen** — 10 input fields with validations  
4. **Preconfirmation Screen** — and T&C modals  
5. **Grid Card & OTP Authentication** — with UI for each step  
6. **Success Screen** — after successful flow

There were **10+ API calls** in total. I optimized a few by placing static values (like city and state lists) in constants.

All in all, this required **24 days of development**, including:
- Designing UI screens
- Functionality implementation
- API integration
- Unit testing

---

## Tools That Boosted My Productivity 🚀

Let’s talk tools. These helped me finish ahead of schedule, and I bet they’ll help you too.

---

### 1. Tailwind CSS

First of all — **let go of the CSS stigma**. Hear me out — it’ll save you tons of time.

I’ve used `SASS`, `module.css`, and even `styled-components` in production. They’re clean and modular, but the boilerplate is heavy. Even writing a simple layout like `flex flex-col` needed a new CSS class — which adds up when you're in the zone.

**Tailwind CSS** was the perfect solution.  
But — the project was already using Bootstrap. So I couldn’t just replace everything.

The solution?

✅ I used the **runtime JIT compiler** via CDN initially. Then I discovered **[Twind](https://twind.style)** — a tiny and super-fast JIT compiler for Tailwind with **no build step**.

Also, keep this official Tailwind responsive design guide handy:  
👉 [https://tailwindcss.com/docs/responsive-design](https://tailwindcss.com/docs/responsive-design)

And don’t forget to bookmark a good Tailwind cheatsheet.

---

### 2. [React Hot Toast](https://react-hot-toast.com/)

A great lib for quick API feedback. Works out of the box with Tailwind and supports:
- Success/failure toasts
- Custom toasts
- Slick animations

Super handy when you're working with multiple API calls.

---

### 3. [Zustand](https://zustand-demo.pmnd.rs/)

Need global state management without the Redux headache?

**Zustand** is an absolute breeze. Setup takes a minute, and accessing global state/hooks is incredibly intuitive.

It’s now my go-to state manager for React projects.

---

### 4. [Figma to Code Plugin by Builder.io](https://www.builder.io/blog/figma-to-code-visual-copilot)

Unfortunately, I didn’t use this during development since it wasn’t available.  
But this is seriously one of the most **powerful AI plugins** I’ve seen.

It converts Figma designs to **clean Tailwind or raw CSS React code**. Check it out if you haven’t.

---

### 5. [Next UI](https://nextui.org/)

Component libraries can either speed you up or slow you down.

I’ve tried:
- `Shadcn`  
- `Radix UI`  

But I found **Next UI** to be the **perfect mix of customizability and speed** — with Tailwind support, great design defaults, and cool animations.

Highly recommend it when you’re short on time.

---

### 6. [Codeium for VS Code](https://codeium.com/)

Think **GitHub Copilot**, but **free**.

Didn’t think tools like this would exist until the ChatGPT era. Boosted my productivity by **66%**.  
Really does what it says on the label.

---

## Final Words

👏 Clap if you liked the post.  
🔋 More power to you, my friend!

**Code great things. Off you go. 🐦**
