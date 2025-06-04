_version: 0.0.1_

# Backend

## 1. Folder Structure

/backend <br>
|-- controllers/ <br>
|-- middleware/ <br>
|-- models/ <br>
|-- routes/ <br>
|-- utils/ <br>
|-- data/ <br>
|-- config/ <br>
|-- .env <br>
|-- sever.js <br>

## 2. Key Libraries

- express
- cors
- cookie-parser
- bcryptjs
- dotenv
- nodemailer
- fs

## 3. Core Modules

- **Auth**

  - Email + OTP Verification
  - Login only after verification
  - JWT token generation and cookie storage
    <br>

- **Middleware**
  - Permission-based auth middleware
  - OTP validation middleware

<br>

- **Models (JSON format)**
  - user.json
  - projects.json
  - analytics.json
  - subscriptions.json
  - ads.json
  - otpTokens.json

<br>

- **Controllers**
  - auth.controller.js
  - project.controller.js
  - analytics.controller.js
  - subscription.controller.js
  - ads.controller.js

<br>

- **Routes**
  - /auth
  - /projects
  - /analytics
  - /subscriptions
  - /ads

# Frontend

## 1. Folder Structure

/frontend <br>
|-- src/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- app/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- components/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- features/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- pages/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- routes/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- charts/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- services/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- utils/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- App.jsx <br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- main.jsx <br>

## 2. Important Libraries

- react-router-dom
- @reduxjs/toolkit + react-redux
- recharts or chart.js for graphs
- react-hook-form or formik for forms
- tailwindcss for styling

## 3. Features to Implement

- Email verification during signup
- Permission-based access control
- Project CRUD (Create, Read, Update, Delete)
- Subscriptions tracking
- Daily user and ad analytics
- Data views: Table, Text,and Chart (toggle)

## Dataa Models (JSON Format)

### User

```
{
    "_id": "u123",
    "email": "user@example.com",
    "password": "hashed",
    "permissions": ["create_project","view_analytics"],
    "verified": true,
    "otp": "654321",
    "otpExpire": 175842354
}
```

### Project

```
{
    "_id": "u123",
    "name": "Weather App",
    "description": "Shows real-time wather",
    "platform": "android",
    "packageName": "com.weather.app",
    "managerId": "u123",
    "createdBy": "u123",
    "createdAt": "Date",
    "updatedAt": "Date",
}
```

### Analytics

```
{
    "_id": "u123",
    "projectId": "p001",
    "date": "Date",
    "createBy": "u123",
    "data": {
        "activeUsers": 123,
        "concurrentUsers": 45,
        "newUsers": 30,
        "oldUsers": 50,
        "lostUsers": 10,
        "countryWise": {
            "IN": 50,
            "US": 30
        }
    }
    "createdAt": "Date",
    "updatedAt": "Date",
}
```

### Subscription

```
{
    "_id": "s123",
    "projectId": "p001",
    "purchaseId": "pid123",
    "date": "2025-06-03",
    "time": "10:00",
    "duration": "30d",
    "type": "new",
    "status": "active",
    "createdBy": "u123",
    "createdAt": "Date",
    "updatedAt": "Date",
}
```

### Ad Analytics

```
{
    "_id": "u123",
    "project_d": "p001",
    "sessions": 300,
    "adRequests": {
        "banner": 100,
        "rewarded": 50,
        "interstitial": 30
    },
    "impressions": {
        "banner": 80,
        "rewarded": 40,
        "interstitial": 25
    },
    "createdBy": "u123",
    "createdAt": "Date",
    "updatedAt": "Date",
}
```

## UI Example Features

- Dashboard with total counts and graphs (last 7 days)
- Table view for analytics and subscriptions
- Project list with manager/user filtering
- Email verification OTP popup
- Permission-gated views and routes
- Charts (Recharts):
  - Line chart for user acquisition.
  - Bar chart for ad impressions.
  - Pie chart for country-wise user.
