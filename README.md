# Portfolio - React + Vite

A modern portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **React 18** - Modern React with hooks
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Works beautifully on all devices
- **Smooth Animations** - Scroll-triggered animations and transitions
- **Component-Based Architecture** - Modular and maintainable code

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── assets/          # CV and project images
│   └── images/          # Profile and other images
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # React entry point
│   ├── index.css        # Tailwind CSS imports
│   └── styles.css       # Custom portfolio styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## 🎨 Customization

### Update Personal Information

Edit the following files to update your information:

- **Hero Section**: `src/components/Hero.jsx`
- **About Section**: `src/components/About.jsx`
- **Projects**: `src/components/Projects.jsx` - Update the projects array
- **Contact**: `src/components/Contact.jsx`
- **Footer**: `src/components/Footer.jsx`

### Update Skills

Edit `src/components/Skills.jsx` and modify the skills arrays:
- `frontendSkills`
- `backendSkills`
- `databaseSkills`
- `devOpsSkills`

### Styling

- **Tailwind CSS**: Modify `tailwind.config.js` for theme customization
- **Custom Styles**: Edit `src/styles.css` for custom animations and effects

## 🔧 Technologies Used

- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- Font Awesome 6.5.1
- Sansation Font

## 📝 Notes

- The contact form currently shows an alert on submission. You'll need to integrate it with a backend service (e.g., Formspree, EmailJS) for actual form handling.
- Project links are currently placeholders (`#`). Update them with actual URLs.
- All images should be placed in the `public` folder to be accessible.

## 🚢 Deployment

### Build the project:
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages:
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## 📄 License

Feel free to use this template for your personal portfolio.

## 👤 Author

Muzammal Hussain - Senior Software Engineer

---

Made with ❤️ using React and Vite
