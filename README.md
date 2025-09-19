# Full-Stack Video Chat Application

A real-time video chat application built with Django (backend) and React (frontend), featuring WebRTC peer-to-peer communication, JWT authentication, and WebSocket integration.

## 🚀 Features

- **User Authentication**: Registration and login with JWT tokens
- **Real-time Video Chat**: WebRTC-based peer-to-peer video communication
- **Room Management**: Create and join video/chat rooms
- **Live Updates**: WebSocket integration for real-time messaging
- **Responsive UI**: Modern React interface with user-friendly design

## 🛠️ Tech Stack

### Backend
- Django 4.x
- Django REST Framework
- Django Channels (WebSockets)
- JWT Authentication
- SQLite/PostgreSQL

### Frontend
- React 18
- Axios (API calls)
- WebRTC API
- WebSocket client
- CSS3/Styled Components

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── temp_chat/
│   ├── requirements.txt
│   ├── manage.py
│   ├── utils/
│   └── apps/
      ├── chat/
│     └── users/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── README.md
```

## ⚡ Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup database**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start Django server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start React development server**
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/refresh/` - Refresh JWT token

### Rooms
- `GET /api/rooms/` - List all rooms
- `POST /api/rooms/` - Create a new room
- `GET /api/rooms/{id}/` - Get room details
- `DELETE /api/rooms/{id}/` - Delete room

### Messages
- `GET /api/rooms/{id}/messages/` - Get room messages
- WebSocket: `/ws/chat/{room_id}/` - Real-time messaging

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Environment Variables

Create `.env` files in both backend and frontend directories:

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
REDIS_URL=redis://localhost:6379
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000
```

## 🚀 Deployment

### Production Setup
1. Set `DEBUG=False` in Django settings
2. Configure PostgreSQL/MySQL database
3. Set up Redis for WebSocket support
4. Build React app: `npm run build`
5. Configure web server (Nginx + Gunicorn)

## 📖 Usage

1. **Register**: Create a new account
2. **Login**: Authenticate with your credentials
3. **Create Room**: Start a new chat room
4. **Join Room**: Enter an existing room
5. **Chat**: Send real-time messages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Contact: your-email@example.com

## ✨ Acknowledgments

- Django & Django Channels for backend framework
- React for frontend library
- WebSocket for real-time communication
