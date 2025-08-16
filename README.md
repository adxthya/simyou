


<img width="1920" height="1080" alt="nasahub" src="https://github.com/user-attachments/assets/e8544200-f902-41ee-a2f2-7375cad5043d" />




# SimYou
Project Description

This project, SimYou, is designed to create a digital doppelgänger for users by combining personal interests, habits, and knowledge with AI-powered conversational abilities. It allows users to build a detailed profile including likes, hobbies, habits, bio, and more, and then interact with a chatbot that embodies their personality.

The system intelligently leverages AI to provide meaningful and personalized conversations, making the digital avatar act like a true reflection of the user. Users can log in via Google, fill out their profile through an intuitive multi-step onboarding process, and then engage with the AI in a beautifully designed chat interface.

Why it’s awesome:

Personalized AI chatbot that mirrors the user’s personality.

Minimalistic and modern UI for both onboarding and chat experience.

Secure authentication via Google OAuth.

Fully interactive and responsive design.

A seamless integration of AI and user-generated data to create a unique digital companion.

This project showcases the power of combining AI with user-centric design to create immersive, personalized experiences. It’s a perfect demonstration of how technology can replicate human-like interaction in a meaningful and engaging way
## Team members
1. [Adithya K B](https://github.com/adxthya)

## Link to product walkthrough





## How it Works ?
User Login & Authentication: Users log in via Google OAuth to securely access the app.

Onboarding & Profile Creation: Users fill out a multi-step form to provide personal details such as likes, hobbies, habits, bio, and more.

Digital Doppelgänger AI: The AI chatbot reads the user profile and simulates conversations as the user’s digital counterpart.

Chat Interaction: Users can interact with their AI avatar via a sleek, responsive chat interface.

Personalized Experience: The AI generates responses tailored to the user’s interests, habits, and knowledge.

### Video


https://github.com/user-attachments/assets/b2540963-bfdd-4f18-9fdb-82613b315187


## Libraries used
### FrontEnd Libraries Used
| Library         | Version | Purpose                                  |
| --------------- | ------- | ---------------------------------------- |
| React           | 18.x    | Frontend framework                       |
| Next.js         | 14.x    | Fullstack framework for SSR & API routes |
| NextAuth.js     | 5.x     | Authentication & session management      |
| Framer Motion   | 10.x    | Smooth animations and transitions        |
| React Hook Form | 7.x     | Form handling and validation             |
| Zod             | 3.x     | Schema validation                        |
| Lucide-React    | 0.x     | Icons                                    |
| Tailwind CSS    | 4.x     | Styling & responsive design              |
### BackEnd Libraries Used
| Library           | Version | Purpose                            |
| ----------------- | ------- | ---------------------------------- |
| Python            | 3.11+   | Runtime environment                |
| FastAPI           | 0.100.x | Backend API framework              |
| Uvicorn           | latest  | ASGI server for FastAPI            |
| Pydantic          | latest  | Data validation and serialization  |
| Dotenv            | latest  | Environment variable management    |
| GROQ / OpenAI API | latest  | AI chatbot integration             |
| MongoDB / Prisma  | latest  | Database for storing user profiles |
| CORS Middleware   | latest  | Cross-Origin Resource Sharing      |


## How to configure
Frontend

Clone the repository:
```
git clone <repo-url>
cd <frontend-folder>
```

Install dependencies:
```
npm install
# or
yarn install
```

Configure environment variables (.env):
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-a-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GROQ_API_KEY=<your-groq-api-key>
```
Backend (FastAPI)

Navigate to the backend folder:
```
cd simyou-backend
```

Create a virtual environment and install dependencies:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r app/requirements.txt
```

Configure environment variables (.env):
```
PORT=8000
MONGO_URI=<your-mongo-db-uri>
GROQ_API_KEY=<your-groq-api-key>
```
## How to Run
Frontend
```
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

Backend (FastAPI)
```
uvicorn main:app --reload
```


API will run on http://localhost:8000 (default port).
