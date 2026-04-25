# CrowdFlow 🏟️

CrowdFlow is a real-time, mobile-first web app designed to improve the physical event experience at large-scale sporting venues by mitigating long queues and optimizing crowd movement.

## 🎤 60-Second Demo Pitch
> *"Have you ever missed a crucial goal because you were stuck in a 20-minute line for a hot dog? Or felt trapped traversing a congested stadium gate? Meet CrowdFlow. CrowdFlow is a real-time smart navigation dashboard built directly into the web—no app download required. Using live stadium analytics, dynamic heatmaps, and instantaneous AI alerts, CrowdFlow doesn't just show you where things are—it tells you when to go. If North Gate is overflowing, our system dynamically updates your path to Gate 5, saving you time and keeping the crowds balanced. With our live queue tracking and automated AI routing, you spend less time waiting, and more time cheering. CrowdFlow: Move Smarter, Fan Harder."*

---

## 🚀 Setup & Deployment

### 1. Backend (Node.js/Express)
The backend acts as an in-memory simulation engine pushing realtime WebSocket events.
- **cd backend**
- **Install dependencies**: `npm install`
- **Run Locally**: `npm start` (Runs on port 3001)
- **Deployment (Render/Railway)**:
  - Connect your GitHub repo.
  - Set root directory to `backend`.
  - Build command: `npm install`
  - Start command: `npm start`
  - Ensure CORS is configured properly in `server.js` if deploying.

### 2. Frontend (Next.js)
The frontend connects to the backend to get real-time crowd changes.
- **cd frontend**
- **Install dependencies**: `npm install`
- **Set Environment Variable**: Create a `.env.local` containing `NEXT_PUBLIC_BACKEND_URL=http://localhost:3001` (or your chosen backend deployment URL).
- **Run Locally**: `npm run dev` (Runs on port 3000)
- **Deployment (Vercel)**:
  - Connect your GitHub repo to Vercel.
  - Set the framework preset to "Next.js".
  - Set the Root Directory to `frontend`.
  - Add the `NEXT_PUBLIC_BACKEND_URL` environment variable pointing to your hosted Socket.io backend.
  - Deploy.

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Zustand, Socket.io-client.
- **Backend**: Express, Socket.io.
- **Simulation**: Custom data mutator mimicking 5-second interval IoT sensor updates. No external DB.

## ⚙️ System Design

### Architecture Diagram
```text
[ Mobile/Web Client ] <---(WebSocket)---> [ Node.js/Express Server ]
 (Next.js, Zustand)          (Real-time State)    |
         |                                        v
   [ REST API ] <------------------------ [ Data Simulator ]
 (Join Queue, etc)                     (Cron/Interval mutates data)
```

### Data Flow
1. **Simulation**: The `Data Simulator` runs a tick every 5 seconds, slightly modifying queue times and occupancy levels to mimic real crowd movement. It evaluates rule-based AI conditions (e.g. "Gate 2 is congested while Gate 1 is empty").
2. **Real-time Sync**: The updated state is pushed to all connected clients via WebSockets (`simulation_update` event).
3. **Client Store**: The Next.js client receives the payload and updates the global Zustand store.
4. **UI Reactivity**: The SVG Map and Dashboard components automatically re-render based on the live data, highlighting congested zones in red and updating wait times.
5. **User Actions**: Users joining queues send HTTP POST requests to the REST API.

### API Contract
**POST `/api/queue/join`**
- **Description**: Allows a user to virtually join a queue for food or washrooms.
- **Request Body**:
  ```json
  { "zoneId": "food-north" }
  ```
- **Response**:
  ```json
  { "success": true, "message": "Joined queue for food-north" }
  ```

**GET `/api/status`**
- **Description**: Fetches the current snapshot of all stadium zones.
- **Response**:
  ```json
  {
    "timestamp": 1713500000000,
    "zones": [ { "id": "gate-1", "type": "gate", "occupancy": 45, "crowdLevel": "medium" } ],
    "alerts": []
  }
  ```

### WebSocket Event Structure
**Event: `simulation_update`** (Server to Client)
- **Payload**:
  ```json
  {
    "timestamp": 1713500000000,
    "zones": [ ... ],
    "alerts": [
      {
        "id": "alert-1",
        "message": "South Gate is heavily congested. Route to North Gate.",
        "type": "ai_suggestion",
        "active": true
      }
    ]
  }
  ```
