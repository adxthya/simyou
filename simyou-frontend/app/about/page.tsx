"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5">
        <CardHeader>
          <CardTitle className="text-3xl font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent text-center">
            About SimYou
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground leading-relaxed text-lg">
          <p>
            <span className="font-bold text-foreground">SimYou</span> is your{" "}
            <span className="italic">digital doppelgänger</span> — a reflection
            of <span className="underline decoration-primary">you</span> in the
            digital world. By feeding in your{" "}
            <span className="font-medium text-foreground">
              likes, hobbies, and habits
            </span>
            , SimYou learns to respond and interact the way <em>you</em> would.
          </p>

          <p>
            The more you share, the smarter and more accurate your digital twin
            becomes. Whether it’s{" "}
            <span className="text-foreground font-medium">
              chatting like you
            </span>
            ,{" "}
            <span className="text-foreground font-medium">
              remembering your quirks
            </span>
            , or{" "}
            <span className="text-foreground font-medium">
              simulating your preferences
            </span>
            — SimYou grows alongside you.
          </p>

          <p className="italic text-sm text-center text-primary/80">
            🚀 Built with Next.js, Tailwind, shadcn/ui, and a sprinkle of
            imagination.
          </p>

          <div className="flex justify-center pt-6">
            <Button
              asChild
              size="lg"
              className="rounded-xl shadow-md"
            >
              <Link href="/profile">Start Building Your Twin →</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
