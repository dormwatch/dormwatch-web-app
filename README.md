# dormwatch-web-app

Frontend web application for DormWatch — a dormitory issue tracking system. Built with React, TypeScript, Vite, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 24.6+
- npm

### Setup

1.  **Install dependencies:**

    ```sh
    npm install
    ```

2.  **Start the development server:**

    ```sh
    npm run dev
    ```

    The app will be available at `http://localhost:5173`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

### Docker

```sh
npm run build
docker build -t dormwatch-web-app .
docker run -p 80:80 dormwatch-web-app
```

The production build is served via nginx inside the container.