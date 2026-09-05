import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Signal, Users, Plus, Trophy, BookOpen, Play } from "lucide-react";

import roomBg from "@/assets/table-room.jpg";
import avatarArjun from "@/assets/avatar-arjun.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import avatarKaran from "@/assets/avatar-karan.jpg";
import avatarYou from "@/assets/avatar-you.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Numbers — Bid. Trick. Survive." },
      {
        name: "description",
        content:
          "Join a 2v2 table, invite friends and play the Numbers trick-taking card game live.",
      },
      { property: "og:title", content: "Numbers — Bid. Trick. Survive." },
      {
        property: "og:description",
        content: "Join a 2v2 table, invite friends and play Numbers live.",
      },
    ],
  }),
  component: Home,
});

const FRIENDS = [
  { name: "Priya", src: avatarPriya, status: "Online" },
  { name: "Arjun", src: avatarArjun, status: "In a game" },
  { name: "Karan", src: avatarKaran, status: "Online" },
];

const TABLES = [
  { name: "Evening Rummy Club", players: "3 / 4", mode: "2v2 · Hearts", ping: "28 ms" },
  { name: "Sharma Family Table", players: "2 / 4", mode: "2v2 · Spades", ping: "41 ms" },
  { name: "Late Night Tricks", players: "4 / 4", mode: "2v2 · Diamonds", ping: "36 ms" },
];

function Home() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center text-foreground"
      style={{ backgroundImage: `url(${roomBg})` }}
    >
      <div className="absolute inset-0 bg-background/55" />

      <div className="relative mx-auto flex h-screen min-h-[560px] w-full max-w-[1700px] flex-col p-6">
        <header className="flex items-start justify-between">
          <div>
            <h1
              className="text-4xl tracking-[0.14em] text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="mr-1 align-middle text-2xl">♠</span>NUMBERS
            </h1>
            <p className="mt-1 text-center text-sm tracking-wide text-gold/70">
              Bid. Trick. Survive.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="panel flex items-center gap-3 px-4 py-2">
              <img
                src={avatarYou}
                alt="Your profile"
                width={512}
                height={512}
                className="h-10 w-10 rounded-full object-cover"
                style={{ border: "2px solid var(--gold)" }}
              />
              <div>
                <p className="text-sm font-semibold">You</p>
                <p className="text-xs text-muted-foreground">Level 12 · 1,480 pts</p>
              </div>
            </div>
            <button className="panel grid h-12 w-12 place-items-center" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </button>
            <span className="flex items-center gap-1 text-sm font-medium text-live">
              <Signal className="h-4 w-4" /> 32 ms
            </span>
          </div>
        </header>

        <div className="mt-6 grid flex-1 grid-cols-[16rem_1fr_19rem] gap-6 overflow-hidden">
          {/* Friends */}
          <aside className="panel flex flex-col p-4">
            <h2 className="border-b border-border pb-2 text-lg font-semibold">Friends</h2>
            <ul className="mt-3 space-y-2 overflow-auto">
              {FRIENDS.map((f) => (
                <li key={f.name} className="flex items-center gap-3 rounded-lg px-2 py-2">
                  <img
                    src={f.src}
                    alt=""
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.status}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm text-muted-foreground">
              <Plus className="h-4 w-4" /> Invite a friend
            </button>
          </aside>

          {/* Centre stage */}
          <section className="flex flex-col items-center justify-center">
            <div
              className="wood flex h-[68%] w-full max-w-[46rem] items-center justify-center rounded-[50%] p-4"
              style={{ boxShadow: "var(--shadow-table)" }}
            >
              <div
                className="felt flex h-full w-full flex-col items-center justify-center gap-5 rounded-[50%] px-10 text-center"
                style={{ boxShadow: "inset 0 0 60px oklch(0 0 0 / 0.55)" }}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-foreground/70">
                  Table ready
                </p>
                <h2
                  className="text-4xl text-gold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Sit down and deal
                </h2>
                <p className="max-w-sm text-sm text-foreground/75">
                  Four players, two teams, eight hands. Bid what you can take, then take it.
                </p>
                <Link
                  to="/game"
                  className="flex items-center gap-2 rounded-xl px-8 py-3 text-lg font-semibold text-primary-foreground"
                  style={{
                    backgroundImage: "var(--gradient-gold)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <Play className="h-5 w-5" /> Play now
                </Link>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button className="panel flex items-center gap-2 px-5 py-3 text-sm font-medium">
                <Users className="h-4 w-4 text-gold" /> Create private table
              </button>
              <button className="panel flex items-center gap-2 px-5 py-3 text-sm font-medium">
                <Trophy className="h-4 w-4 text-gold" /> Tournaments
              </button>
              <button className="panel flex items-center gap-2 px-5 py-3 text-sm font-medium">
                <BookOpen className="h-4 w-4 text-gold" /> How to play
              </button>
            </div>
          </section>

          {/* Open tables */}
          <aside className="panel flex flex-col p-4">
            <h2 className="border-b border-border pb-2 text-lg font-semibold">
              Open Tables
            </h2>
            <ul className="mt-3 space-y-2 overflow-auto">
              {TABLES.map((t) => (
                <li key={t.name} className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.mode}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{t.players} players</span>
                    <span className="text-live">{t.ping}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/game"
              className="mt-auto rounded-lg border border-border py-2 text-center text-sm text-muted-foreground"
            >
              Quick join
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
