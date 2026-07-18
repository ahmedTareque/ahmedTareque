export type Project = {
  num: string
  title: string
  subtitle: string
  desc: string
  tags: string[]
  scale: string
  accent: string
  /** Live product / deployed URL. Renders a "Live ↗" button. */
  live?: string
  /** Source code URL. Renders a "Code ↗" button. */
  repo?: string
}

export const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'National Skills Development Portal',
    subtitle: 'Bangladesh Government Platform',
    desc: 'Architecture and development of Bangladesh\'s national employment and skills platform. Spring Boot microservices, Angular frontend, serving 500K+ active citizens.',
    tags: ['Spring Boot', 'Angular', 'PostgreSQL', 'Liquibase'],
    scale: '500,000+ Users',
    accent: '#00B4A2',
    live: 'https://www.skillsportal.gov.bd/',
  },
  {
    num: '02',
    title: 'Adversarial Robustness Study',
    subtitle: 'Medical AI Research · 2026',
    desc: 'MobileNetV2 pneumonia detector stress-tested with FGSM adversarial attacks. Grad-CAM analysis revealed internal reasoning failures. Published findings on attention shifts under noise.',
    tags: ['TensorFlow', 'FGSM', 'Grad-CAM', 'Python'],
    scale: 'Independent Research',
    accent: '#FF5C3A',
    repo: 'https://github.com/ahmedTareque/Adversarial-Robustness-in-Medical-Image-Classification',
  },
  {
    num: '03',
    title: 'Islamic Society of Norman App',
    subtitle: 'Community Mobile App · iOS + Android',
    desc: 'Full-featured mosque management app — live prayer times, Iqamah schedule, Ramadan calendar, events, announcements and Stripe donation integration. iOS live, Android in progress.',
    tags: ['React Native', 'Expo', 'Stripe', 'iOS'],
    scale: 'Live on App Store',
    accent: '#8B6FFF',
    live: 'https://apps.apple.com/us/app/islamic-society-of-norman/id6758760571',
  },
  {
    num: '04',
    title: 'Sapiens Station',
    subtitle: 'AI Automation Platform',
    desc: 'Purpose-built AI agents for healthcare and real estate. Swapping hardened workflows for intelligent automation targeting 70% cost reduction.',
    tags: ['AI Agents', 'Next.js', 'LLM', 'Healthcare'],
    scale: 'sapiensstation.com',
    accent: '#2FD98A',
    live: 'https://www.sapiensstation.com/',
  },
  {
    num: '05',
    title: 'Quick Urgent Care',
    subtitle: 'Healthcare Marketing Site · Moore + OKC',
    desc: 'Patient-conversion site spanning ~128 routes — 30 SEO city×service landing pages, condition/symptom guides, and online booking. MedicalWebPage + Speakable schema for AI/voice search, Stripe self-pay, Resend booking email.',
    tags: ['Next.js 15', 'TypeScript', 'Stripe', 'SEO'],
    scale: 'Live · quickurgentcareok.com',
    accent: '#3AA0FF',
    live: 'https://www.quickurgentcareok.com/',
  },
  {
    num: '06',
    title: 'Food Port POS',
    subtitle: 'Restaurant Ordering Platform',
    desc: 'Kiosk-to-kitchen ordering system in one codebase — customer QR/token ordering, vendor + admin portals, and a live display board. Zustand state, socket.io KDS realtime, Supabase media uploads.',
    tags: ['Next.js 16', 'React 19', 'Zustand', 'socket.io'],
    scale: 'Live Demo',
    accent: '#FFB03A',
    live: 'https://food-port-frontend.vercel.app/order',
  },
]
