"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";

// Step 1 schema
const step1Schema = z.object({
  likes: z.string().min(1, "Please enter at least one like"),
  hobbies: z.string().min(1, "Please enter at least one hobby"),
  habits: z.string().min(1, "Please enter at least one habit"),
  knowledge: z.string().min(1, "Please enter at least one knowledge area"),
});

// Step 2 schema
const step2Schema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  age: z.string().min(1, "Please enter your age"),
  bio: z.string().min(5, "Please write a short bio"),
  location: z.string().min(1, "Please enter your location"),
  image_url: z.string().min(1, "Provide avatar url"),
});

// Combined schema
const formSchema = step1Schema.merge(step2Schema);

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      likes: "",
      hobbies: "",
      habits: "",
      knowledge: "",
      fullName: "",
      age: "",
      bio: "",
      location: "",
      image_url: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await fetch("http://localhost:8000/profile/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: session?.user?.email, // pass Google user ID
          username: data.fullName,
          email: session?.user?.email,
          likes: data.likes,
          hobbies: data.hobbies,
          habits: data.habits,
          knowledge: data.knowledge,
          bio: data.bio,
          location: data.location,
          age: Number(data.age),
          image_url: data.image_url,
        }),
      });
      router.push("/profile");
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* progress bar */}
      <Progress
        value={step === 1 ? 50 : 100}
        className="mb-6"
      />

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-Medium mb-6 text-center"
      >
        {step === 1 ? (
          "✨ Tell us about yourself"
        ) : (
          <div className="flex justify-center items-center gap-2">
            <User /> <p>Profile Details</p>
          </div>
        )}
      </motion.h1>

      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {step === 1 && (
                <>
                  {/* Step 1 fields */}
                  <FormField
                    control={form.control}
                    name="likes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>💖 Likes</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="chess, music"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Things that make you happy
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hobbies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>🎨 Hobbies</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="coding, painting"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          What you enjoy doing in free time
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="habits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>☕ Habits</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="early riser, coffee lover"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Daily rituals or quirks
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="knowledge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📚 Knowledge</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="AI, philosophy"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          What you know or are curious about
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      type="button"
                      className="w-full text-lg py-6 rounded-xl"
                      onClick={() => setStep(2)}
                    >
                      Next →
                    </Button>
                  </motion.div>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Step 2 fields */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="21"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A short introduction about you"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Avatar URL"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </Button>
                    <Button
                      type="submit"
                      className="px-6"
                    >
                      🚀 Finish
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
