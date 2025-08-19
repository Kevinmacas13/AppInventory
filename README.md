# Inventario App - Full-Stack Clothing Inventory Management

Inventario App is a comprehensive, full-stack inventory management system designed for clothing stores. It features a mobile application built with React Native and a powerful backend API using Hono. The application leverages modern technologies including AI for product generation, barcode scanning, and detailed financial reporting, all deployed seamlessly to AWS with SST.

## ✨ Features

- **📱 Mobile-First Dashboard:** Get a quick overview of your inventory with key metrics like total items, low stock alerts, and category distribution.
- **📦 Complete Inventory Control:** Perform full CRUD (Create, Read, Update, Delete) operations on your clothing items.
- **🤖 AI-Powered Product Generation:** Use Google's Gemini AI to automatically generate new clothing items from simple text descriptions (e.g., "a red t-shirt").
- **║█║ Barcode Scanning:** Utilize the device's camera to scan product barcodes for quick and easy item lookup and creation.
- **📈 Financial Reporting:** Access detailed financial summaries, including total inventory cost, retail value, and potential profit margins.
- **🚀 High-Performance API:** The backend is built with Hono, a fast and lightweight web framework running on the Bun runtime.
- **📚 Interactive API Documentation:** Explore and test API endpoints through a beautiful, interactive Scalar interface.

## 🛠️ Tech Stack

- **Monorepo:** Managed with Bun Workspaces.
- **Frontend:** React Native (Expo)
- **Backend:** Hono on Bun
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **AI Integration:** Google Gemini via Vercel's AI SDK
- **Deployment:** SST (Serverless Stack) on AWS

## 📂 Project Structure

The project is organized as a monorepo to ensure code sharing and maintainability.

```
.
├── apps
│   ├── api/                # Hono backend API
│   └── inventario-app/     # React Native (Expo) mobile application
├── packages
│   └── core/               # Shared code: Drizzle schemas, Zod validation, etc.
├── sst.config.ts           # Serverless Stack deployment configuration
└── package.json            # Root package configuration
```

- `apps/api`: Contains all backend logic, routes, and API definitions.
- `apps/inventario-app`: The complete source code for the mobile application.
- `packages/core`: A shared library for database schemas, Zod validation schemas, and core business logic used by both the API and the mobile app.

## 🚀 Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites

- Bun (v1.0 or higher)
- Node.js (LTS version recommended)
- AWS CLI configured with your credentials (for deployment)
- A Neon account for the PostgreSQL database.
- A Google Gemini API Key from Google AI Studio.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Install all project dependencies from the root directory using Bun.

```bash
bun install
```

### 3. Set Up Environment Variables

Create a file named `.env` in the root of the project and add the following environment variables. You can get these values from your Neon and Google AI Studio accounts.

### 4. Database Migration

The project uses Drizzle ORM to manage the database schema. To push the schema to your Neon database, run the following command:

```bash
bun --cwd packages/core drizzle-kit push
```

_Note: You might want to add this as a script to `packages/core/package.json` for convenience._

### 5. Run the Development Servers

You need to run the API and the frontend app in separate terminal windows.

**To run the API:**

```bash
# From the root directory
bun --cwd apps/api dev
```

The API will be available at `https://zf2diku5sbjcj3zyenbqhzzeyq0nnnvm.lambda-url.us-east-1.on.aws/`.

**To run the React Native App:**

```bash
# From the root directory
bun --cwd apps/inventario-app start
```

The react native web app will be available at `https://d31whwn9krmyev.cloudfront.net`

This will start the Expo development server. You can then scan the QR code with the Expo Go app on your mobile device or run it in an emulator.

## 📖 API Documentation

Once the API server is running, you can access the interactive Scalar documentation in your browser at:

http://localhost:3001/docs

## ☁️ Deployment

This project is configured for easy deployment to AWS using SST (Serverless Stack).

To deploy the application, ensure your AWS credentials are configured and run:

```bash
# Deploy to a staging environment
bun sst deploy --stage staging

# Deploy to production
bun sst deploy --stage production
```
