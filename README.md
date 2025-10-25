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

### Just want to see the app?

If you only need to open the project and click around, follow these plain-language steps:

1. **Install the tools:** Open the built-in terminal and run `npm install`. This happens once and prepares the project.
2. **Start the ready-made preview:** Type `npm run preview:local` and press Enter. The command builds the app and keeps it running.
3. **Open the live page:** In Codex, click the **Ports** icon on the left, find port **4173**, and choose **Open in Browser** (or **Open in Preview**). A new tab with the site appears.
4. **Test the features:** You can switch pages, change the language, and upload the sample photo that ships with the project at `public/demo/sample-headshot.svg`—no extra setup needed. Image generation requires your own Gemini API key, so expect an error message until you add one.

### Prerequisites

- Node.js (v18 or later)
- A modern web browser
- A Google Gemini API Key

### Environment Variables

Before running the application you must provide a Google Gemini API key. The Vite build reads a `GEMINI_API_KEY` variable from your environment and exposes it to the frontend as `process.env.API_KEY`.

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

3.  **Run the app in development mode:**
    ```bash
    npm run dev
    ```
    Vite will print the local development URL (default: http://127.0.0.1:5173). You can start interacting with the UI immediately. If you have your own Gemini credentials available, export them before running the command:
    ```bash
    export GEMINI_API_KEY="your_key_here"
    ```
    Without a key you can still click around the interface, but AI generation requests will fail until a valid credential is supplied.

4.  **Set up your API Key for full functionality:**
    Create an `.env` file (or use your shell environment) with `GEMINI_API_KEY`. This unlocks authenticated Gemini requests so that generation features work end-to-end.

### Previewing the production build

To preview the optimized build the same way it will run in production:

```bash
npm run preview:local
```

The script automatically builds the project before starting `vite preview`, so you will never
hit the blank/404 page that appeared previously when the `dist/` folder hadn't been generated.
Once the command is running you can open the production preview at
**http://127.0.0.1:4173/**.

#### Opening the preview in Codex

If clicking the URL gives you a blank tab, manually attach your browser to the
forwarded port:

1. Run `npm run preview:local` (or `npm run dev` for the development server).
2. In the left toolbar, click **Ports** and wait for port `4173` (or `5173` in
   dev mode) to appear.
3. Hover the port entry, choose **Open in Browser** (or **Open in Preview**),
   and a new tab will load the running app.
4. Interact with the UI normally—navigation, uploads, and language toggles all
   behave exactly as they do in a regular browser window.

> **Tip:** If clicking the URL inside this environment opens a blank tab, open your IDE's **Ports** panel, locate port `4173`, and choose **Open in Browser** (or **Preview** in Codex) to attach to the running server.

### Quick testing checklist

Use these commands to cover the most common testing flows:

| Goal | Command | What to look for |
| --- | --- | --- |
| Fast UI smoke test | `npm run dev` | Confirm the page renders at http://127.0.0.1:5173 and the main navigation works. |
| Production build preview | `npm run preview:local` | Visit http://127.0.0.1:4173 to ensure the optimized bundle loads without console errors. |
| End-to-end Gemini checks | `export GEMINI_API_KEY="your_key_here"` then rerun either workflow | Verify AI-powered features respond successfully with your own API quota. |

### Functional testing walkthrough

Follow this path to interact with the full experience and verify that navigation and uploads behave as expected:

1. Start the preview server with `npm run preview:local` (or the dev server with `npm run dev`).
2. In Codex or any browser-based IDE, open the **Ports** sidebar, select the forwarded port (`4173` for preview or `5173` for dev), and choose **Open in Browser/Preview** so the UI renders in a new tab.
3. On the landing screen, click **Upload Photo** and select the bundled sample headshot located at `public/demo/sample-headshot.svg` (the file is also reachable at `/demo/sample-headshot.svg` once the server is running).
4. Confirm that you can navigate between **Privacy Policy**, **Terms of Use**, and **Bank Details** using the footer links while the upload is processing.
5. For full AI generation, supply your own `GEMINI_API_KEY`; without it you can still explore navigation, validation, loading states, and error messages, but image generation will not complete.

---

## Deployment

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