# Egal | عقال

**Wear your identity — digitally.**

Egal is a premium, AI-powered platform for generating personalized digital identities in authentic, professional Saudi attire. It combines cultural depth with a sleek, modern interface that meets global standards of simplicity, security, and trust.

This project is built with React, TypeScript, and Google's Gemini API.

## ✨ Features

- **AI-Powered Portraits**: Upload a photo and receive multiple, ultra-realistic portraits in authentic Saudi thobes, shemaghs, and bishts.
- **Bilingual Interface**: Seamlessly switch between English and Arabic with full RTL support.
- **Production-Ready**: Built with best practices for security, privacy, and performance.
- **Minimalist UX**: A clean, intuitive, and responsive interface inspired by modern design principles.
- **Privacy First**: User photos are processed once for generation and are never stored on a server.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- A modern web browser
- A Google Gemini API Key

### Environment Variables

Before running the application you must provide a Google Gemini API key. The Vite build reads a `GEMINI_API_KEY` variable from your environment and exposes it to the frontend as `process.env.API_KEY`.

> **Preview shortcut:** For convenience, the project now falls back to a preview-only API key (`AIzaSyBwz0yVONdv8iTkJRTJdK0o6U7fQ5nCzB8`) when no environment variable is supplied. This allows the hosted preview to boot without manual setup. You should always override this value with your own credentials for local development and production deployments.

When deploying to platforms like Vercel, configure this in the project's environment variable settings.

**Example `.env` configuration**:

```
# Your Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"
```

### Installation & Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/egal.git
    cd egal
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your API Key:**
    Create an `.env` file (or use your shell environment) with `GEMINI_API_KEY`. If you skip this step, the app will fall back to the bundled preview key so the UI still loads, but you should treat that key as temporary and replace it for any real usage.

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    Vite will print the local development URL (default: http://127.0.0.1:5173).

### Previewing the production build

To preview the optimized build the same way it will run in production:

```bash
npm run build
npm run preview:local
```

Thanks to the bundled preview key, these commands work even if you haven't exported
`GEMINI_API_KEY`. Once `npm run preview:local` is running you can open the production
preview at **http://127.0.0.1:4173/**.

---

##  deployment

This application is a static single-page application and can be deployed to any static hosting provider.

### Deploying to Vercel

1.  **Push your code** to a Git repository (GitHub, GitLab, Bitbucket).
2.  **Import your project** into Vercel. Vercel will auto-detect that it is a static site.
3.  **Configure Environment Variables**:
    - Go to your project's **Settings > Environment Variables**.
    - Add a new variable:
      - **Name**: `GEMINI_API_KEY`
      - **Value**: `your_gemini_api_key_here`
4.  **Deploy**. Your site will be live at the provided Vercel domain.

---

## ✅ Post-Deployment QA Checklist

- [ ] **Domain**: Custom domain is configured and pointing to the deployment.
- [ ] **HTTPS**: SSL certificate is active and enforced.
- [ ] **API Key**: The `GEMINI_API_KEY` environment variable is correctly set in the production environment.
- [ ] **Responsiveness**: Test the application on various devices (Desktop, Tablet, Mobile).
- [ ] **Functionality**:
    - [ ] Image upload works (with validation).
    - [ ] Image generation completes successfully.
    - [ ] "Regenerate" and "Download" buttons function as expected.
    - [ ] Language toggle works and persists.
    - [ ] Privacy and Terms links navigate correctly.
- [ ] **Analytics**: Google Analytics or other tracking scripts have been added.
- [ ] **SEO**: `sitemap.xml` and `robots.txt` are accessible. Meta tags are correct.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

```
MIT License

Copyright (c) 2024 Yasir Aljohani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## changelog

### v1.0.0 (Initial Release)

- **Features**:
  - Initial launch of the Egal | عقال platform.
  - Core functionality: Upload a photo to generate professional portraits in Saudi attire.
  - Bilingual support (English/Arabic) with RTL layout.
  - Production-grade UI/UX with a premium, minimalist design.
  - Privacy-first approach: Images are not stored.
- **Tech Stack**:
  - React, TypeScript, Framer Motion
  - Google Gemini API for image generation.
  - Tailwind CSS for styling.
```