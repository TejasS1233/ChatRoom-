# Mesh Emergency Chat

A **peer-to-peer (P2P) emergency chatroom** built using **React, Gun.js, TailwindCSS, and DaisyUI**.  
Designed to work **completely offline** when devices are connected over a **local mesh** or hotspot, with **no internet dependency**.

---

## ✨ Features
- **Peer-to-Peer Chat** using [Gun.js](https://gun.eco/)
- **Offline Support** – works without any internet relay servers
- **Avatar-based Login**
- **Dark/Light Mode Toggle** (DaisyUI themes)
- **SOS Location Sharing** (shares live Google Maps link)
- **Responsive UI** built with TailwindCSS + DaisyUI

---

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **State & Networking:** Gun.js (Decentralized Database)
- **Styling:** TailwindCSS + DaisyUI
- **Icons/Avatar:** Default avatar fallback (`https://i.pravatar.cc/40`)

---

## 📦 Installation & Setup
### **1. Clone the repository**
```
git clone https://github.com/your-username/mesh-chat-app.git
cd mesh-chat-app
```

### **2. Install dependencies**
```
npm install
```

### **3. Configure for Offline Mesh**
Open `src/ChatRoom.jsx` and modify the Gun initialization:  
```
const gun = Gun();  // No relay peers, devices will sync directly
```

> **Note:**  
> - Devices must be connected on the **same LAN, Wi-Fi hotspot, or local mesh network**.  
> - Gun.js automatically handles peer discovery over WebRTC (if supported by browser).

---

## 🏃 Run Offline
Start a **local development server**:  
```
npm run dev
```
Open in browser: **http://localhost:5173**

### **Share on Local Network**
If devices are on the same network:
- Find your local IP (e.g., `192.168.1.10`)
- Access from another device:  
```
http://192.168.1.10:5173
```

---

## 📁 Project Structure
```
mesh-chat-app/
├─ src/
│  ├─ ChatRoom.jsx   # Chat component (main UI & logic)
│  ├─ App.jsx        # Root App component
│  ├─ main.jsx       # Entry point
│  ├─ index.css      # TailwindCSS + DaisyUI
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

---

## 🛡️ License
MIT License – free to use and modify.

---

## 🚀 Future Enhancements
- Automatic offline peer discovery (Bluetooth, WebRTC mesh)
- Encrypted direct peer-to-peer messaging
- Persistent offline message history sync across devices

---

## 👤 Author
**Built by Tejas**

- **GitHub:** [https://github.com/TejasS1233](https://github.com/TejasS1233)  
- **LinkedIn:** [https://www.linkedin.com/in/tejas-sidhwani-89337a32b/](https://www.linkedin.com/in/tejas-sidhwani-89337a32b/)
