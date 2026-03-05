# Personal Portfolio

A modern, interactive portfolio website showcasing work and skills with cutting-edge technologies and smooth animations.

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Library:** React
- **Backend & Database:** Firebase

## Features

- **Smooth Animations** - Engaging transitions and interactive elements powered by Framer Motion
- **Dark Mode Support** - Seamless theme switching for better user experience
- **SEO Optimized** - Fully optimized for search engines with meta tags and structured data
- **Mobile Responsive** - Perfect display on all device sizes from mobile to desktop
- **Fast Performance** - Optimized load times and efficient code splitting

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
├── components/             # Reusable React components
├── public/                 # Static assets
├── data/projects.ts        # Project array
├── lib/                    # Utility functions and Firebase config
|   ├──validators/          # Validation form contact                   
├── layout.jsx              # Shared Layouts
├── page.jsx                # Home Layouts
├── providers.jsx           # State Management Theme dark/light
├── about/page.jsx          # Page about
├── hero/page.jsx           # Page hero
├── contact/page.jsx        # Page contact
├── skills/page.jsx         # Page skills
├── project/page.jsx        # Page project
└── next.config.js          # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint code linting

## Customization

### Dark Mode
Dark mode is built-in and automatically detects system preferences. Users can manually toggle it using the theme switcher in the navigation.

### Animations
Modify Framer Motion animations in individual components. Common animation variants are in `lib/animations.js`.

## Responsive Breakpoints

The portfolio uses Tailwind's responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Other Options

- **Netlify:** Follow their Next.js deployment guide
- **AWS Amplify:** Deploy through AWS console
- **Self-hosted:** Build and deploy to your own server

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minified CSS and JavaScript
- Optimized Firebase queries

