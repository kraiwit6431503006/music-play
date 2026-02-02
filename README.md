
#  Music Play Project

A full-stack music streaming application built with modern web technologies.

---

## Tech Stack

### Frontend

* **Nuxt.js** (Vue-based framework)
* **JavaScript**
* **Tailwind CSS**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **JWT Authentication**

---

## Backend Setup (Node.js + MongoDB)

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables file

Create a `.env` file in `/backend` directory:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/music_play
JWT_SECRET=supersecret
```

 Make sure MongoDB is running locally before starting the server.

### 4. Start backend development server

```bash
npm run dev
```

Backend will run at:

```
http://localhost:5001
```

---

## 💻 Frontend Setup (Nuxt.js)

### Requirements

* **Node.js v20 or higher**

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Nuxt development server

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

---

### Data Example for data

Url mp3: https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3

Url image: https://gdb.voanews.com/EEA0B145-95D4-4532-9C69-D0FCD1833D53_w408_r0_s.jpg
