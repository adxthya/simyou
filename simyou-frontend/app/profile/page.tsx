"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  FileText,
  Heart,
  Music,
  Coffee,
  Brain,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Profile = {
  username: string;
  age?: number;
  location?: string;
  bio?: string;
  likes?: string;
  hobbies?: string;
  habits?: string;
  knowledge?: string;
  image_url?: string;
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/profile/${session.user?.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No profile found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 shadow-inner">
          {profile.image_url && (
            <Image
              src={profile.image_url}
              alt="Avatar"
              width={500}
              height={500}
              className="rounded-full"
            />
          )}
        </div>
        <h1 className="text-3xl font-medium mt-4">{profile.username}</h1>
        <p className="text-gray-500 text-sm">Your digital doppelgänger</p>
      </div>

      {/* Profile Card */}
      <Card className="shadow-sm rounded-2xl border border-gray-100">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Age</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.age ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Location</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.location ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Bio</p>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {profile.bio ?? "No bio provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Likes</p>
                  <p className="text-base text-gray-700">
                    {profile.likes ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Music className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Hobbies</p>
                  <p className="text-base text-gray-700">
                    {profile.hobbies ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Coffee className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Habits</p>
                  <p className="text-base text-gray-700">
                    {profile.habits ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Knowledge</p>
                  <p className="text-base text-gray-700">
                    {profile.knowledge ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
