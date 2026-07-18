<div align="center">

```
 █████╗ ████████╗
██╔══██╗╚══██╔══╝
███████║   ██║   
██╔══██║   ██║   
██║  ██║   ██║   
╚═╝  ╚═╝   ╚═╝   
```

# Ahmed Tareque
### Software Engineer · AI Researcher · PhD Applicant

[![Portfolio](https://img.shields.io/badge/Portfolio-ahmedtareque.netlify.app-00B4A2?style=flat-square&logo=netlify&logoColor=white)](https://ahmedtareque.netlify.app)
[![Email](https://img.shields.io/badge/Email-Where.is.tareque%40gmail.com-FF5C3A?style=flat-square&logo=gmail&logoColor=white)](mailto:Where.is.tareque@gmail.com)
[![Location](https://img.shields.io/badge/Location-Norman%2C%20Oklahoma-0A0A0A?style=flat-square&logo=googlemaps&logoColor=white)](https://maps.google.com/?q=Norman,OK)
[![PhD](https://img.shields.io/badge/Seeking-PhD%202026-00B4A2?style=flat-square&logo=academia&logoColor=white)]()

*"Building AI systems that are not only powerful — but trustworthy enough to save lives."*

---

</div>

## The Story Behind This Portfolio

In **2018**, I stood in a rural clinic in Bangladesh and watched a physician study a blurred retinal scan. The patient had diabetes and was gradually losing vision. The doctor suspected diabetic retinopathy — but there was no specialist nearby, and diagnosis could take weeks. In low-resource regions, that delay means permanent blindness.

That moment planted a question I've never stopped asking:

> **Can intelligent diagnostic systems bridge the gap between limited medical resources and timely, accurate diagnosis?**

That question became my undergraduate thesis. Then my independent research. Now it's the thread running through everything — from building systems that serve half a million citizens, to studying why a neural network can be simultaneously *accurate* and *dangerously wrong*.

This portfolio is where that story lives.

---

## The Human Behind the Code

| | |
|---|---|
| 🎓 | First-generation university graduate — BRAC University, BSc Computer Science |
| 🌍 | Born in Bangladesh. Building in Norman, Oklahoma. |
| 👨‍👩‍👧‍👦 | Husband. Father of two infants. Still ships code after bedtime. |
| 🕌 | Built the Islamic Society of Norman app used by the local Muslim community |
| 🏆 | Led 600+ person national hackathon as President of Mozilla Firefox Bangladesh |
| 🤖 | [Rock Paper Scissors: AI-Powered Robot Playmate with Image Recognition!](https://www.youtube.com/watch?v=9ZcNXEHXX24) — real-time human-robot interaction |
| 🚁 | Studied swarm algorithms for drone obstacle detection |
| ❤️ | Red Crescent volunteer — fundraised for underprivileged communities |
| 🎮 | Off the clock: World of Tanks, FIFA, and Call of Duty |
| 🏍️ | Ride sports bikes to the mountains and sea beaches |
| ⚽ | Love playing football |
| 🔧 | Currently learning: car mechanics |

---

## Research

### 🔬 Adversarial Robustness in Medical Image Classification *(2026)*

The most important question in medical AI isn't *"how accurate is it?"* — it's *"can we trust it when it matters most?"*

**What I found:**

A MobileNetV2 pneumonia detector that achieved **95% accuracy on clean data** collapsed to **18% accuracy** under FGSM adversarial perturbations at ε=0.10. But the most revealing finding wasn't the numbers — it was what **Grad-CAM** showed underneath them.

Adversarial noise didn't just degrade performance. It **shifted the model's attention away from clinically meaningful lung regions** toward irrelevant image areas. The model was giving correct predictions — for entirely wrong reasons.

A system that is right by accident cannot be trusted with a human life.

```
Clean data    [ε=0.00] ████████████████████  95%
Light attack  [ε=0.01] █████████████░░░░░░░  71%
Medium attack [ε=0.05] ███████░░░░░░░░░░░░░  38%
Heavy attack  [ε=0.10] ███░░░░░░░░░░░░░░░░░  18%
Post-training [ε=0.10] ████████████░░░░░░░░  61%  ← adversarial training improved robustness
```

**Stack:** TensorFlow · MobileNetV2 · FGSM · Grad-CAM · Python · Jupyter

---

### 🔬 Early Detection of Diabetic Retinopathy Using ML *(2019 — Undergraduate Thesis)*

Motivated by that clinic in Bangladesh. Evaluated **KNN, SVM, Random Forest, and Neural Networks** on retinal fundus image feature sets for early diabetic retinopathy detection.

- Neural network classifier achieved **72.61% predictive accuracy** — highest among all models
- Explored decision-support systems for improving diagnosis in low-resource healthcare environments
- Revealed the gap between benchmark accuracy and clinical reliability — the seed of all future research

**Stack:** Python · scikit-learn · Neural Networks · Medical Imaging · Feature Engineering

---

## Engineering at Scale

### 🏛️ Bangladesh National Skills Development Portal — SynesisIT *(2021–2023)*

Not a side project. Not a demo. A **live government platform** used by more than **500,000 active citizens** to access employment resources, vocational training, and national education initiatives.

Engineering at this scale meant every decision carried real consequences — a bug wasn't an inconvenience, it was a blocked citizen. A slow query wasn't technical debt, it was someone unable to access their training certificate.

**What I built:**
- Designed ER diagrams and managed full database schema evolution with **Liquibase**
- Built complex backend business logic in **Spring Boot** — RestTemplate, Spring Security, JavaMailSender
- Developed **native PostgreSQL report queries** for government certificate downloads with embedded QR codes
- Built Angular frontend — forms, tables, modals, data-bound preview documents
- Iterated directly with the Business Analysis team and client feedback cycles

**Stack:** Spring Boot · Angular · PostgreSQL · Liquibase · Spring Security · Java

---

## Client & Product Work

### 🏥 Quick Urgent Care — Patient Conversion Site *(Moore + OKC)*

A ~128-route Next.js site engineered to turn local search intent into walk-in visits — 30 SEO city × service landing pages, condition and symptom guides, and online booking. `MedicalWebPage` + `Speakable` + FAQ schema answer AI and voice queries; Stripe handles self-pay, Resend handles booking email.

**Stack:** Next.js 15 · TypeScript · Tailwind · Stripe · Resend · Vercel
→ [quickurgentcareok.com](https://www.quickurgentcareok.com/)

---

### 🍽️ Food Port POS — Restaurant Ordering Platform

A kiosk-to-kitchen ordering system in a single codebase — token-based customer ordering (no login), vendor and admin portals, and a standalone public display board. Zustand for state, socket.io for live kitchen updates, Supabase for menu media.

**Stack:** Next.js 16 · React 19 · Zustand · socket.io · Supabase · Tailwind v4
→ [food-port-frontend.vercel.app/order](https://food-port-frontend.vercel.app/order)

---

## Founded

### 🧠 Sapiens Station *(2026 — Norman, OK)*
> *"We automate the impossible 20% of your business."*

Purpose-built AI agents replacing hardened manual workflows in **healthcare and real estate**. Target outcomes: **70% reduction in cost-to-serve**, **95× faster customer response times**.

→ [sapiensstation.com](https://www.sapiensstation.com)

---

### 🌙 Muslim Noor *(2026 — Norman, OK)*
> *"Built by Muslims, for Muslims."*

Mosque management and Muslim entrepreneur community platform. Includes the **Islamic Society of Norman** mobile app — live Suhoor/Iftar/Iqamah times, Ramadan updates, community events, and Stripe-integrated donations. iOS live, Android in progress.

→ [muslimnoor.com](https://www.muslimnoor.com)

---

### 💡 Null Pointers *(2018 — Co-Founder)*
Developed a **SaaS platform for Internet Service Providers** as a university student. First taste of building real software for real customers — and discovering that scale reveals everything your architecture got wrong.

---

## Leadership

| Year | Role | Impact |
|------|------|--------|
| 2017 | President, Mozilla Firefox Bangladesh | Organized national hackathon with **600+ participants** in partnership with Google Developers Group Bangladesh |
| 2016 | Team Lead — AI Robot | Built an image-recognition powered [Rock Paper Scissors robot](https://www.youtube.com/watch?v=9ZcNXEHXX24) with real-time human-robot interaction |
| 2016 | Team Lead — Swarm Robotics | Implemented swarm algorithm in 3-sensor obstacle detection robot; explored drone applications |
| 2015 | Volunteer, Red Crescent | Fundraised for underprivileged communities under international organizations |

---

## Skills

```
AI / ML          ████████████████░░  TensorFlow · MobileNetV2 · FGSM · Grad-CAM
                                     Neural Networks · Computer Vision · Prompt Engineering
                                     Model Evaluation · Power BI · Jupyter

Full-Stack        ████████████████░░  NestJS · NextJS · Spring Boot · Angular
                                     React Native · Flutter · Expo · Stripe

Data / DB         ██████████████░░░░  PostgreSQL · MongoDB · Liquibase · SQLite

Cloud / Infra     █████████████░░░░░  Docker · Git · SaaS Architecture
                                     Large-scale System Design · Distributed Systems

Hardware          ████████░░░░░░░░░░  Arduino · Robotics · Embedded Systems
```

---

## Research Interests *(PhD Focus)*

I am actively seeking PhD opportunities in the following areas:

- **Adversarial robustness** in deep learning — particularly for safety-critical applications
- **Interpretability & explainability** in medical AI — making Grad-CAM and similar tools robust enough for clinical trust
- **Trustworthy AI for healthcare** — distribution shift, uncertainty quantification, reliability under real-world conditions
- **Human-centered AI** — socio-technical challenges of deploying AI in low-resource medical environments
- **Responsible AI** — mitigating algorithmic bias in diagnostic systems

> I am particularly interested in working with researchers at the intersection of **machine learning robustness** and **clinical applicability** — where the gap between a model's benchmark performance and its real-world trustworthiness is not just an academic problem, but a matter of patient safety.

---

<!-- ## This Portfolio — Technical

Built to awwwards standard. Every interaction is intentional.

```bash
git clone https://github.com/ahmedtareque/portfolio
cd portfolio
npm install
npm run dev
# → http://localhost:3000
``` -->

<!-- ### Stack
| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (Pages Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Smooth scroll | Lenis |
| Animations | GSAP + CSS transitions |
| Fonts | Playfair Display + DM Sans + DM Mono |
| Deploy | Netlify | -->

<!-- ### Awwwards Techniques Implemented

| Technique | Effect |
|-----------|--------|
| **Percentage preloader** | Counts 0→100%, then splits screen open |
| **Text scramble** | Name and title resolve from random characters on load |
| **Animated counters** | 500K+ users and years count up on viewport enter |
| **Custom cursor + ring lag** | Teal dot + lagging ring, shifts on hover |
| **Film grain overlay** | Animated SVG noise texture over entire viewport |
| **Ghost typography** | Giant transparent `AT` watermark in hero |
| **Infinite marquee** | Skills/keywords ticker between sections |
| **Clip-reveal on scroll** | Text slides up from behind a mask on IntersectionObserver |
| **Hide-on-scroll nav** | Navbar disappears scrolling down, returns scrolling up |
| **Grid-ruled project cards** | 2×2 grid separated by 1.5px lines |
| **Vertical accent line** | Teal gradient line running down hero |

### Deploy to Netlify
```
Build command:   npm run build
Publish dir:     .next
Node version:    18.x
``` -->

<!-- --- -->

## Contact

I'm always open to conversations about **trustworthy AI, PhD opportunities, research collaboration**, or just good hard engineering problems.

📧 [Where.is.tareque@gmail.com](mailto:Where.is.tareque@gmail.com)  
📱 (405) 981-8292  
🌐 [ahmedtareque.netlify.app](https://ahmedtareque.netlify.app)  
📍 Norman, Oklahoma

---

<div align="center">

*"The system that produces correct predictions for the wrong reasons cannot be trusted at all."*

**— Ahmed Tareque, 2026**

<br/>

![visitors](https://visitor-badge.laobi.icu/badge?page_id=ahmedtareque.portfolio&left_color=0A0A0A&right_color=00B4A2)

</div>
