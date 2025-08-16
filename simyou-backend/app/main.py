from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union
from database import db
from bson import ObjectId

app = FastAPI(title="SimYou API", version="0.1.0")

# CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Profile model
class Profile(BaseModel):
    user_id: str
    username: str
    email: Union[str, None] = None
    likes: str
    hobbies: str
    habits: str
    knowledge: str
    image_url: str
    bio: Union[str, None] = None
    location: Union[str, None] = None
    age: Union[int, None] = None


@app.get("/", tags=["root"])
async def read_root():
    return {"message": "SimYou API is running"}


@app.post("/profile/", tags=["profile"])
async def save_profile(profile: Profile):
    existing = await db.profiles.find_one({"user_id": profile.user_id})
    if existing:
        # update existing
        await db.profiles.update_one({"user_id": profile.user_id}, {"$set": profile.dict()})
    else:
        # insert new
        await db.profiles.insert_one(profile.dict())
    return {"status": "success", "profile": profile.dict()}


@app.get("/profile/{user_id}", tags=["profile"])
async def get_profile(user_id: str):
    profile = await db.profiles.find_one({"user_id": user_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    profile.pop("_id")  # remove MongoDB internal ID
    return profile
