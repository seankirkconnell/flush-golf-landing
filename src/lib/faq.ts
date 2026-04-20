export type FAQItem = {
  q: string;
  a: string;
};

export type FAQCategory = {
  title: string;
  items: FAQItem[];
};

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: "The basics",
    items: [
      {
        q: "What is FLUSH Golf?",
        a: "FLUSH is an AI golf coach that lives in your phone. Record your swing and it finds your flaws, teaches you the fix with drills from real coaches, and gives you real-time feedback on every swing at the range.",
      },
      {
        q: "Do I need any special equipment?",
        a: "Just your phone. No sensors, no launch monitor, no hitting mat. A basic phone stand or tripod helps but isn't required.",
      },
      {
        q: "What phones does FLUSH work on?",
        a: "Modern iPhones and most Android phones. If your phone records smooth 1080p video, you're good.",
      },
      {
        q: "How much does FLUSH cost?",
        a: "Free to start — 10 swings/month plus 1 Full Diagnostic. $10/month unlocks 100 swings and unlimited diagnostics. $20/month is unlimited everything.",
      },
    ],
  },
  {
    title: "How it works",
    items: [
      {
        q: "How does FLUSH actually analyze my swing?",
        a: "FLUSH uses AI pose estimation to track your body through every frame of the swing. It measures the angles, positions, and timing at each phase — setup, backswing, top, impact, and follow-through — and compares them against rules built from real golf swings to pinpoint exactly what's off.",
      },
      {
        q: "What's the difference between Full Diagnostic and Live Coach?",
        a: "Full Diagnostic is a deep report on one swing — a ranked list of your biggest flaws with drills for each. Live Coach runs in real-time at the range — it detects each swing as you hit and calls out flaws hands-free so you can keep going.",
      },
      {
        q: "Where should I place my phone?",
        a: "Two angles work: face-on (camera in front of you, perpendicular to your target line) or down-the-line (behind you, pointing at your target). Waist-to-hip height, 6–8 feet away. Each angle catches different flaws — try both.",
      },
      {
        q: "Does FLUSH work indoors?",
        a: "Yes. It reads your body, not the ball — so hitting nets, simulators, garages, and backyards all work as long as lighting is decent.",
      },
      {
        q: "Does it work for left-handed golfers?",
        a: "Yes. FLUSH auto-detects your handedness and every detection works identically for lefties.",
      },
      {
        q: "Do I need to hit a real ball?",
        a: "No. Practice swings, range balls, and on-course shots all work — FLUSH reads your motion, not ball flight.",
      },
    ],
  },
  {
    title: "The AI and accuracy",
    items: [
      {
        q: "How is FLUSH different from apps that just draw lines on my swing?",
        a: "Most \"AI\" golf apps are glorified line-drawers — they show you where your club is but don't tell you what's wrong or how to fix it. FLUSH names the specific flaw, explains what it's costing you, and matches you with drills that actually fix it.",
      },
      {
        q: "How accurate is the AI?",
        a: "FLUSH has been tuned against thousands of real swings and is used by serious golfers and coaches. Like any tool, results are best with a steady phone, decent lighting, and a clear view of your body.",
      },
      {
        q: "Can FLUSH replace a human coach?",
        a: "No, and it's not trying to. A human coach reads subtle things AI can't and can physically demonstrate a move. FLUSH fills the gap between lessons — unlimited instant feedback so you practice the right things instead of grooving bad habits.",
      },
      {
        q: "What flaws can FLUSH detect?",
        a: "25+ flaws across every phase: setup (Standing Too Tall, Shoulders Open), backswing (Flying Elbow, Overswing, Reverse Pivot), downswing (Over The Top, Early Extension), plus tempo and pattern issues. The full list is on the homepage.",
      },
    ],
  },
  {
    title: "Practice and progress",
    items: [
      {
        q: "Can I practice at the range hands-free?",
        a: "Yes — that's exactly what Live Coach is for. Prop up your phone, start a session, and FLUSH speaks results out loud (or uses tones) after each swing. No checking your phone between shots.",
      },
      {
        q: "How do I know I'm actually improving?",
        a: "FLUSH tracks your flaw-free percentage across each session and over time. You'll see specific flaws shrink session over session — concrete proof your swing is changing.",
      },
      {
        q: "What are tips and who makes them?",
        a: "Tips are short video drills from 60+ real coaches — PGA pros and popular creators. When FLUSH finds a flaw, it suggests tips that fix that specific flaw, so you can pick the teaching style that clicks for you.",
      },
    ],
  },
  {
    title: "Account and data",
    items: [
      {
        q: "Is my swing video private?",
        a: "Yes. Your swings live in your private account. Nothing is shared publicly unless you choose to share it.",
      },
      {
        q: "Do I need internet to use FLUSH?",
        a: "Full Diagnostic needs a connection since it's cloud-powered. Live Coach runs on-device, so it keeps working if signal is spotty at the range.",
      },
      {
        q: "Can I cancel my subscription any time?",
        a: "Yes. Cancel from the app in two taps — no phone calls, no retention hoops.",
      },
    ],
  },
];

export const ALL_FAQ_ITEMS: FAQItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
