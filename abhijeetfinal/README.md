# 🌍 Travel44U - Travel & Tourism Website

A modern travel website with Node.js backend and MongoDB database.

## 🚀 Quick Start

### Setup
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Set environment variables
cp env.example .env
# Edit .env with your MongoDB connection string

# Start server
cd backend && npm start
```

### Access
- **Website**: http://localhost:3000
- **API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
projecttravel/
├── Frontend (7 files)
│   ├── index.html, login.html, register.html
│   ├── profile.html, reset.html
│   ├── style.css, script.js
├── backend/ (18 files)
│   ├── config/, controllers/, middleware/
│   ├── models/, routes/, utils/
│   ├── server.js, package.json
├── database/
│   └── setup.sql
└── Configuration files
    ├── package.json, .gitignore, env.example
    ├── vercel.json, netlify.toml
    └── README.md
```

## 🌐 Deploy

### Quick Start
1. Run `./deploy.sh` (Linux/Mac) or `deploy.bat` (Windows)
2. Follow the step-by-step guide in `HOSTING_GUIDE.md`

### Frontend (Netlify/Vercel)
1. Push to GitHub
2. Connect repository to Netlify/Vercel
3. Set base directory to `frontend`
4. Deploy

### Backend (Render/Railway)
1. Connect GitHub repository
2. Set root directory to `backend`
3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection
   - `SESSION_SECRET`: Random string
   - `NODE_ENV`: production
4. Deploy

### Database (MongoDB Atlas)
1. Create free account at mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Add to backend environment variables

### Admin Panel
- Access via: `your-frontend-url/admin/`
- Login: `admin@travel44u.com` / `admin123`

## 🔧 Features

- User authentication (register/login)
- Destination browsing
- Package booking
- Contact form
- Responsive design
- Admin panel

## 📞 Support

Check error logs and verify environment variables if issues occur.

---

**Ready to deploy!** 🚀 