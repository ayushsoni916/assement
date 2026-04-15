# 🚗 CarFinder AI – The "Confused Buyer" Specialist

**Live URL:** `https://cardekho-ayush.netlify.app/`

---

## 🎯 1. What did you build and why?
I built an **Intent-Based Recommendation Engine** designed to solve the "Paradox of Choice." Most car platforms force users to know technical specs (CC, BHP, Torque) before they can even start searching.

**My approach flips this:** The user provides a "Life Statement" (e.g., *"I have 2 kids and want a good mileage car in a low budget"*), and the app uses a custom **Weighted Heuristic Engine** to map those human needs to the best 3 car matches.

### What was deliberately cut?
* **External LLM API:** I deliberately chose *not* to use the OpenAI/Claude API for the live app. For a 50-car database, a custom heuristic engine is **faster (0ms latency)**, **free**, and **deterministic**, proving that "AI-Native" isn't just about calling an API—it's about smart local logic.
* **Authentication:** I focused entirely on the search-to-shortlist journey. I cut the "Save Car" feature to ensure the core recommendation logic and UI were rock solid within the 3-hour timebox.

---

## 🛠 2. What’s your tech stack and why?
* **React.js (Vite):** Chosen for rapid component-based development and instant HMR (Hot Module Replacement).
* **Tailwind CSS:** Used to build a clean, modern "CarDekho-style" interface with high speed and responsiveness.
* **Lucide-React:** For lightweight, semantic iconography that provides visual cues for mileage, safety, and seating.
* **Custom Heuristic Engine (JS):** A weighted scoring algorithm that handles intent extraction, price-penalty logic, and EV-mileage normalization.

---

## 🤖 3. AI Tooling: Delegation vs. Manual
**AI Tool Used:** Google Gemini

### Delegated to AI:
* **Data Generation:** I used Gemini to generate the initial `cars_db.js` with 50 realistic entries, including specific tags like `rugged`, `family`, and `budget`.
* **Logic Brainstorming:** I collaborated with Gemini to solve the **"Mileage Paradox"** (where expensive EVs were outranking cheap cars in budget searches). We developed a price-normalization formula together.
* **Boilerplate:** Scaffolding the initial Tailwind layout and basic functional component structures.

### Done Manually:
* **Weight Tuning:** I manually adjusted the "Luxury Penalty" scores. AI often suggests "safe" numbers, but I had to tune them so that "Budget" intent strictly overrides raw spec-sheet performance.
* **Architectural Refactor:** When the app hit a "Rules of Hooks" error (due to `useState` inside a `.map()` loop), I manually refactored the code into a standalone `CarCard` component.
* **UX Polish:** Designing the expand/collapse flow to ensure the UI remained "clean" for a confused buyer.

### Where did the tools help/get in the way?
* **Help:** Gemini was a massive force multiplier for **explaining logic**. It helped me articulate *why* a certain weight should be used, which helped me code the algorithm faster.
* **In the way:** The AI initially suggested a flat scoring system that allowed $₹60L$ EVs to win "cheap" searches. I had to manually implement a **Negative Weighting Heuristic** to correct its "math-first" bias over "product-first" thinking.

---

## ⏳ 4. If I had another 4 hours...
1.  **Vector Search (Semantic Layer):** Use **Supabase Vector** to handle much more complex queries like *"Something that feels like a tank but drives like a sedan."*
2.  **Interactive Comparison:** A "Compare Top 3" mode that highlights trade-offs (e.g., "Car A is safer, but Car B saves you ₹2,000/month on fuel").
3.  **Real-time Analytics:** A dashboard to see what "Confusion Points" are most common among users to improve the car inventory.
4.  **Unit Test Suite:** Implement **Vitest** for the scoring engine to ensure that adding new cars doesn't break the recommendations for existing ones.

---

### 🚀 Run Instructions
1.  **Clone:** `git clone <repo-url>`
2.  **Install:** `npm install`
3.  **Launch:** `npm run dev`
4.  **Test:** Try searching *"cheap car for kids with high mileage"* and watch the weights work in the console log!
