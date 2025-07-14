# 🌐 Hosting Guide - Travel44U Website

This guide will help you host your travel website on free platforms.

## 📋 Prerequisites

1. **GitHub Account** - For code repository
2. **MongoDB Atlas Account** - For database (free tier)
3. **Netlify/Vercel Account** - For frontend hosting (free)
4. **Render/Railway Account** - For backend hosting (free tier)

## 🗄️ Step 1: Database Setup (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier)

### 1.2 Configure Database
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `travel_tourism`

### 1.3 Sample Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/travel_tourism?retryWrites=true&w=majority
```

## 🖥️ Step 2: Backend Hosting (Render)

### 2.1 Prepare Backend
1. Push your code to GitHub
2. Ensure `backend/` folder contains all backend files
3. Verify `render.yaml` is in the backend folder

### 2.2 Deploy on Render
1. Go to [Render](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `travel44u-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 2.3 Environment Variables
Add these environment variables in Render:
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_random_secret_key
PORT=10000
```

### 2.4 Get Backend URL
After deployment, note your backend URL:
`https://travel44u-backend.onrender.com`

## 🌐 Step 3: Frontend Hosting (Netlify)

### 3.1 Update Frontend Configuration
1. Update API URLs in frontend files to point to your backend
2. Ensure `netlify.toml` is in the frontend folder

### 3.2 Deploy on Netlify
1. Go to [Netlify](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Choose your repository
5. Configure the build:
   - **Base directory**: `frontend`
   - **Build command**: (leave empty)
   - **Publish directory**: `.`

### 3.3 Environment Variables (Optional)
Add these in Netlify:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com
```

## 🔧 Step 4: Admin Panel Hosting

### 4.1 Deploy Admin Panel
1. The admin panel can be hosted on the same Netlify site
2. Access via: `https://your-site.netlify.app/admin/`
3. Or deploy separately on Vercel

## 🔗 Step 5: Update API URLs

### 5.1 Update Frontend Files
Update these files to use your backend URL:

**frontend/script.js**
```javascript
const API_BASE_URL = 'https://travel44u-backend.onrender.com/api';
```

**admin/admin.js**
```javascript
const API_BASE_URL = 'https://travel44u-backend.onrender.com/api';
```

### 5.2 Update CORS in Backend
In `backend/server.js`, update the CORS origin:
```javascript
origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.netlify.app'] 
    : ['http://localhost:3000', 'http://localhost:5000'],
```

## 🚀 Step 6: Test Your Deployment

### 6.1 Test Backend
- Health check: `https://your-backend-name.onrender.com/api/health`
- Should return: `{"status":"OK","message":"Travel & Tourism API is running"}`

### 6.2 Test Frontend
- Visit: `https://your-site.netlify.app`
- Test login/register functionality
- Test admin panel: `https://your-site.netlify.app/admin/`

### 6.3 Admin Access
- Email: `admin@travel44u.com`
- Password: `admin123`

## 🔒 Step 7: Security & Optimization

### 7.1 Environment Variables
- Never commit `.env` files
- Use platform environment variables
- Rotate secrets regularly

### 7.2 SSL/HTTPS
- Netlify and Render provide free SSL
- Ensure all API calls use HTTPS

### 7.3 CORS Configuration
- Only allow your frontend domain
- Remove localhost from production

## 📊 Step 8: Monitoring

### 8.1 Health Checks
- Backend: `/api/health`
- Monitor uptime with external services

### 8.2 Logs
- Render: Built-in logging
- Netlify: Function logs in dashboard

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in backend
   - Verify frontend URL is allowed

2. **Database Connection**
   - Verify MongoDB Atlas connection string
   - Check network access settings

3. **Build Failures**
   - Check package.json dependencies
   - Verify Node.js version compatibility

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match code

### Support Resources
- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

## 🎉 Success!

Your travel website is now live at:
- **Frontend**: `https://travel44u.netlify.app`
- **Backend**: `https://travel44u-backend.onrender.com`
- **Admin**: `https://travel44u.netlify.app/admin/`

---

**Need help?** Check the troubleshooting section or create an issue in your repository. 