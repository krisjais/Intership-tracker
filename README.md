# 🚀 Internship Tracker (InternTrack)

A comprehensive, professional, and visually stunning web application designed to help students and job seekers manage their internship applications in one place. Keep track of deadlines, application statuses, and interview progress with ease.

![InternTrack Dashboard Screen](/screenshot_placeholder.png)

## ✨ Features

- **📊 Dynamic Dashboard**: Get a high-level overview of your application stats with interactive charts and recent activity logs.
- **📝 Application Management**: Add, edit, and delete internship applications with fields for company, role, status, application date, and deadline.
- **🎨 Visual Status Tracking**: Color-coded badges for statuses like *Applied*, *Interview*, *Offer*, and *Rejected*.
- **🔍 Advanced Filtering**: Search by company or role and filter by status to quickly find specific applications.
- **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile screens.
- **⚡ Performance**: Built with Next.js 15+ for blazing-fast performance and SEO optimization.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **API Calls**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)

---

## 🚦 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 2. Backend Setup
1. Clone the backend repository (if separate) or navigate to the backend folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd intern-track
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router pages
│   ├── dashboard/  # Analytics dashboard
│   ├── internships/# List and CRUD operations
│   └── layout.js   # Main application shell
├── components/     # Reusable UI components
│   ├── InternshipForm.js
│   └── AppLayout.js
└── lib/            # API utilities and helpers
    └── api.js      # Axios instance and endpoints
```

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [krisjais](https://github.com/krisjais)
