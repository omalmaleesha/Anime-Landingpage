# 🌸 Anime Landing Page - Next.js Project

A modern, responsive, and feature-rich Anime Landing Page built with **Next.js**, **React**, and **Tailwind CSS**. This project showcases sleek UI/UX design, dynamic theming, animations, interactive charts, and an admin panel for managing content.

---

## 🚀 Features

- 🌗 **Dynamic Theming** – Light/Dark mode toggle with smooth transitions  
- 📊 **Interactive Charts** – Anime analytics using `recharts` with theme support  
- 🎠 **Carousel Components** – Smooth horizontal/vertical sliders with navigation controls  
- 🧑‍💻 **Admin Panel** – Interface for managing content, users, or settings  
- 🎴 **Anime Gallery** – Grid or list view of anime content with search and filtering  
- 🧭 **Responsive UI** – Fully mobile-friendly layout using Tailwind CSS  
- ♿ **Accessibility** – Screen reader support and keyboard navigability  

---

## 📁 Project Structure

```
├── app/                # Page routes and layouts
├── components/         # Reusable UI components (charts, carousel, etc.)
├── context/            # Global state (e.g., theme context)
├── data/               # Static/dynamic anime-related data
├── lib/                # Utility functions
├── public/             # Static assets (e.g., images)
├── styles/             # Global CSS (if applicable)
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript config
├── next.config.mjs     # Next.js config
├── components.json     # Tailwind & alias configs
└── .gitignore          # Files to exclude from Git
```

---

## 🧩 Key Components

### 🎨 Theming  
Light/Dark mode support using Tailwind CSS and CSS variables.

### 📈 Charts (`components/chart.tsx`)  
Interactive charts with tooltips, legends, and dynamic theming using `recharts`.

### 🎠 Carousel (`components/carousel.tsx`)  
Scrollable carousel with navigation buttons and keyboard support via `embla-carousel-react`.

### 🧑‍💼 Admin Panel  
Basic interface for managing anime content and themes.

### 🎴 Anime Gallery  
Responsive anime listing grid.

### 🔍 Search & Filter  
`SearchBar` component for querying content with optional filtering logic.

---

## 📦 Dependencies

### Core
- `next`
- `react`

### UI Libraries
- `tailwindcss`
- `lucide-react`
- `@radix-ui/react-*` (accessible UI primitives)

### Visualization
- `recharts` (for dynamic charts)

### Animation
- `framer-motion`

### Carousel
- `embla-carousel-react`

---

## ⚙️ Configuration

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- JSX preserved for Next.js

### Next.js (`next.config.mjs`)
- Ignores TypeScript and ESLint errors during builds (for development)

### Tailwind CSS (`components.json`)
- Uses CSS variables and a neutral base theme

---

## ⚠️ Known Issues

- ❌ React 19 compatibility issues (e.g., with `react-day-picker`)  
- ⚠️ TypeScript and ESLint errors are currently disabled  
- 🖼️ Image optimization is turned off  

---

## ✅ Suggestions for Improvement

- Downgrade React or update libraries for compatibility  
- Re-enable ESLint/TypeScript for better code reliability  
- Enable Next.js image optimization for faster loading  

---

## 📸 Screenshots

*Add screenshots here of your landing page, charts, and carousel components.*

---

## 🧑‍💻 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/anime-landing-page.git

# Navigate into the project directory
cd anime-landing-page

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Recharts](https://recharts.org/) - A composable charting library built on React components
- [Embla Carousel](https://www.embla-carousel.com/) - A lightweight carousel library for React
