---
title: "8 React Anti-Patterns You Should Stop Using (and Why) 🚩 "
description: "In React development, some patterns look harmless — even idiomatic — but can introduce subtle bugs, performance issues, or long-term maintainability problems."
date: "Oct 24, 2023"
---

In React development, some patterns look harmless — even idiomatic — but can introduce subtle bugs, performance issues, or long-term maintainability problems.

Here are some red flags (🚩) I’ve seen in real-world React codebases — and why you should avoid them.

---

### 🚩 1. `handleClick`, `handleSubmit` Everywhere

```jsx
<button onClick={handleClick}>Submit</button>
```

**Why it’s a problem:**

* These vague function names don't explain **what** the button does.
* Colocation is lost — you have to scroll to understand the behavior.
* You’ll need to come up with new names for every callback.

**Better approach:**
Use **inline callbacks** that clearly describe what’s happening.

```jsx
<button onClick={() => {
  analytics.event('submit-button')
  openModal()
}}>
  Submit
</button>
```

---

### 🚩 2. `event.preventDefault()` as a crutch

Using `event.preventDefault()` assumes JavaScript has loaded. If a user clicks a form or link **before JS is ready**, this won’t run.

✅ It's fine for **progressive enhancement**, but if you rely on it blindly, you may introduce **inconsistent behavior**.

---

### 🚩 3. Overuse of `useMemo`

Many React devs are afraid of re-renders and go overboard with `useMemo`.

**Guidelines:**

* ✅ Use it **when passing expensive calculations or large objects** to children.
* ❌ Don’t use it to “fix” bugs — it won’t.
* ✅ It’s fine if **leaf components** re-render more often.

```tsx
const filtered = useMemo(() => expensiveFilter(data), [data])
```

> `useMemo` doesn’t fix bugs. It just makes them happen less often.

---

### 🚩 4. Fetching data inside `useEffect`

Yes, React requires fetch to happen inside effects:

```js
useEffect(() => {
  fetchData()
}, [])
```

But **most people should be using** [`react-query`](https://tanstack.com/query/latest) or [`swr`](https://swr.vercel.app/).

Why?

* Effects often run **more than you expect**.
* Lifecycle-tied fetches are hard to cancel, retry, or cache.
* Fetch logic gets scattered across components.

---

### 🚩 5. `<div onClick={...}>` — Non-interactive elements

Adding `onClick` to a `div`? You’ve just created an accessibility landmine.

**Problems:**

* No keyboard support (space/enter won't trigger it)
* No screen reader announcement
* Violates semantic HTML principles

**Better:** Use a `<button>` or `<a>` — or handle keyboard/ARIA manually if needed.

---

### 🚩 6. A “hooks” directory

Separating code by *type* rather than *feature* causes sprawl:

```
/components/MyContextProvider.jsx
/hooks/useMyContext.js
```

**Better structure:**

```bash
/features/my-context/
  ├── ContextProvider.jsx
  └── useMyContext.js
```

Keep related logic **together** — not separated by file type.

---

### 🚩 7. Scattered CSS files

CSS and React are **two different component systems** — and they compete.

* CSS files are for reusability.
* React components already handle reusability + co-location.

**Best practice:**

* Co-locate styles with components (CSS-in-JS, CSS Modules, Tailwind, etc.)
* Use one global stylesheet for **design tokens / resets** only.

---

### 🚩 8. Icon libraries in `package.json`

Importing a massive icon set like this:

```js
import { Bell, User, Settings } from 'mega-icon-lib'
```

...can balloon your bundle size.

**Why?**

* Many icon libraries export thousands of components.
* Tree-shaking can break.
* Auto-imports go haywire.

**Solutions:**

* Use custom SVGs.
* Use icon systems that support on-demand loading.

---

## 🧠 Final Thoughts

These red flags don’t mean “never use this.” But they **signal deeper architectural issues** or **misunderstandings**.

The fix? Be intentional. Think in terms of **user experience**, **performance**, and **maintainability** — not just what looks clean.

---

### 💬 Did I miss any React red flags?

Drop your favorite (or most hated) anti-patterns in the comments. Let’s make better React code together!

---
