# Deployment Guide for DevType

This guide covers how to deploy the DevType application (MERN Stack) to production.

## Prerequisites
- A GitHub account.
- A Render account (for Backend).
- A Vercel account (for Frontend).
- A MongoDB Atlas account (for Database).

## 1. Security First
**IMPORTANT**: Never commit your `.env` file or `node_modules` to GitHub.
Ensure your `.gitignore` file includes:
```
node_modules/
.env
dist/
```

## 2. Push to GitHub
1.  Initialize a git repository in the root folder if you haven't already.
2.  Commit your code.
3.  Push to a new GitHub repository.

## 3. Backend Deployment (Render)
1.  Log in to [Render](https://render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Root Directory**: `server`
5.  **Build Command**: `npm install`
6.  **Start Command**: `node server.js`
7.  **Environment Variables**:
    -   `MONGODB_URI`: Your connection string from MongoDB Atlas.
    -   `JWT_SECRET`: A strong random string.
    -   `PORT`: `10000` (Render default).
8.  Click **Deploy Web Service**.
9.  Copy the **Service URL** (e.g., `https://devtype-api.onrender.com`).

## 4. Frontend Deployment (Vercel)
1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Root Directory**: `client` (Click Edit to change this).
5.  **Build Command**: `npm run build` (Default).
6.  **Output Directory**: `dist` (Default).
7.  **Environment Variables**:
    -   `VITE_API_URL`: The Backend Service URL from step 3 (e.g., `https://devtype-api.onrender.com`).
        *Important: Do not add a trailing slash. It should look like `https://devtype-api.onrender.com`.*
8.  Click **Deploy**.

## 5. Final Configuration
-   **CORS**: Ensure your Backend `server.js` allows requests from your Vercel Frontend URL.
    ```javascript
    app.use(cors({
        origin: 'https://your-vercel-app.vercel.app',
        credentials: true
    }));
    ```
