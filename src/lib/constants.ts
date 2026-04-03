export const APP_URL = "https://flush-golf.vercel.app";

export const FLAW_GROUPS = [
  {
    phase: "Setup",
    flaws: [
      "Standing Too Tall",
      "Too Bent Over",
      "Standing Too Close",
      "Standing Too Far",
      "Shoulders Open",
      "Shoulders Closed",
    ],
  },
  {
    phase: "Backswing",
    flaws: [
      "Poor Shoulder Turn",
      "Poor Hip Load",
      "Hands Push Away",
      "Flying Elbow",
      "Arms Too Flat",
      "Arms Too Upright",
      "Reverse Pivot",
      "Too Much Sway",
      "Overswing",
      "Bent Lead Arm",
    ],
  },
  {
    phase: "Downswing & Impact",
    flaws: [
      "Over The Top",
      "Early Extension",
      "Standing Up",
      "Hip Slide",
      "Leaning Back",
      "Hands Roll Over",
      "Flat Shoulder Turn",
    ],
  },
  {
    phase: "Tempo & Pattern",
    flaws: ["Quick Tempo", "Arms Driven Swing", "Hands Too Far Ahead"],
  },
];

export const ALL_FLAWS = FLAW_GROUPS.flatMap((g) => g.flaws);

export const PRICING_TIERS = [
  {
    name: "Casual Golfer",
    price: 0,
    description: "Get started with the basics.",
    features: [
      "10 swings / month",
      "1 Full Diagnostic / month",
      "10 saved swings",
      "100 MB storage",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Weekend Warrior",
    price: 10,
    description: "For the regular golfer looking to improve.",
    features: [
      "100 swings / month",
      "Unlimited diagnostics",
      "50 saved swings",
      "500 MB storage",
    ],
    cta: "Subscribe",
    highlighted: true,
  },
  {
    name: "Range Rat",
    price: 20,
    description: "Unlimited everything. Maximum storage.",
    features: [
      "Unlimited swings",
      "Unlimited diagnostics",
      "Unlimited saved swings",
      "2 GB storage",
    ],
    cta: "Subscribe",
    highlighted: false,
  },
];
