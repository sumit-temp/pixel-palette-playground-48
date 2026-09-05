import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mic,
  MicOff,
  Send,
  Settings,
  Signal,
  Smile,
  MoreHorizontal,
  MessageSquare,
  Target,
} from "lucide-react";

import { CardFan, PlayingCard, type Suit } from "@/components/game/card";
import roomBg from "@/assets/table-room.jpg";
import avatarArjun from "@/assets/avatar-arjun.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import avatarKaran from "@/assets/avatar-karan.jpg";
import avatarYou from "@/assets/avatar-you.jpg";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "Live Table — Numbers Card Game" },
      {
        name: "description",
        content:
          "Play a 2v2 hand of Numbers at the live table: bidding, trumps, tricks, chat and voice.",
      },
      { property: "og:title", content: "Live Table — Numbers Card Game" },
      {
        property: "og:description",
        content: "Bid, call trumps and take tricks with your partner in real time.",
      },
    ],
  }),
  component: GameScreen,
});

function Hearts({ lives, total = 2 }: { lives: number; total?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="text-lg leading-none"
          style={{ color: i < lives ? "var(--suit-red)" : "oklch(0.45 0.01 60)" }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function Avatar({
  src,
  name,
  team,
  size = 74,
}: {
  src: string;
  name: string;
  team: "A" | "B";
  size?: number;
}) {
  return (
    <div className="relative">
      <img
        src={src}
        alt={name}
        width={512}
        height={512}
        loading="lazy"
        className="rounded-full object-cover"
        style={{
          width: size,
          height: size,
          border: "3px solid var(--gold)",
          boxShadow: "0 0 22px oklch(0 0 0 / 0.6)",
        }}
      />
      <span
        className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-foreground"
        style={{
          background: team === "A" ? "var(--team-a)" : "var(--team-b)",
          border: "2px solid oklch(0.16 0.01 60)",
        }}
      >
        {team}
      </span>
    </div>
  );
}

function MicButton({ muted }: { muted?: boolean }) {
  return (
    <span
      className="grid h-10 w-10 place-items-center rounded-full border border-border"
      style={{ background: "oklch(0.17 0.01 60 / 0.9)" }}
    >
      {muted ? (
        <MicOff className="h-4 w-4 text-suit-red" />
      ) : (
        <Mic className="h-4 w-4 text-live" />
      )}
    </span>
  );
}

const HAND: { rank: string; suit: Suit }[] = [
  { rank: "A", suit: "spades" },
  { rank: "10", suit: "spades" },
  { rank: "J", suit: "hearts" },
  { rank: "9", suit: "hearts" },
  { rank: "8", suit: "diamonds" },
  { rank: "6", suit: "diamonds" },
  { rank: "5", suit: "clubs" },
  { rank: "3", suit: "clubs" },
];

const LOG = [
  { name: "Arjun", text: "bid", value: "17", src: avatarArjun },
  { name: "Karan", text: "bid", value: "19", src: avatarKaran },
  { name: "Priya", text: "bid", value: "21", src: avatarPriya },
  { name: "You", text: "bid", value: "24", src: avatarYou, active: true },
  { name: "Arjun", text: "passed", src: avatarArjun },
  { name: "Karan", text: "passed", src: avatarKaran },
  { name: "Priya", text: "passed", src: avatarPriya },
];

const CHAT = [
  { name: "Priya", text: "Let's go!", time: "10:24", src: avatarPriya },
  { name: "Karan", text: "Nice play!", time: "10:24", src: avatarKaran },
  { name: "Arjun", text: "🤔", time: "10:25", src: avatarArjun },
  { name: "You", text: "Our turn next", time: "10:25", src: avatarYou },
];

function GameScreen() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center text-foreground"
      style={{ backgroundImage: `url(${roomBg})` }}
    >
      <div className="absolute inset-0 bg-background/45" />

      <div className="relative mx-auto h-screen min-h-[560px] w-full max-w-[1700px]">
        {/* Brand */}
        <div className="absolute left-6 top-4">
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

        {/* Top HUD */}
        <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-start gap-4">
          <div className="panel min-w-[190px] px-6 py-3 text-center">
            <p className="text-base font-semibold">Team A</p>
            <div className="my-1 flex justify-center">
              <Hearts lives={2} />
            </div>
            <p className="text-3xl font-bold">18</p>
          </div>
          <div className="panel mt-1 px-6 py-3 text-center">
            <p className="text-base font-semibold">Hand 3 / 8</p>
            <p className="text-xs text-muted-foreground">4 Players (2v2)</p>
          </div>
          <div className="panel min-w-[190px] px-6 py-3 text-center">
            <p className="text-base font-semibold">Team B</p>
            <div className="my-1 flex justify-center">
              <Hearts lives={1} />
            </div>
            <p className="text-3xl font-bold">14</p>
          </div>
        </div>

        <div className="absolute right-6 top-3 flex items-center gap-4">
          <div className="panel px-6 py-3 text-center">
            <p className="text-xs text-muted-foreground">Trump</p>
            <p className="flex items-center gap-2 text-2xl font-semibold">
              <span className="text-suit-red">♥</span> Hearts
            </p>
          </div>
          <button
            className="panel grid h-12 w-12 place-items-center"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          <span className="flex items-center gap-1 text-sm font-medium text-live">
            <Signal className="h-4 w-4" /> 32 ms
          </span>
        </div>

        <div className="panel absolute right-6 top-28 flex items-center gap-3 px-5 py-3">
          <Target className="h-6 w-6 text-gold" />
          <div>
            <p className="text-lg font-semibold">Current Trick</p>
            <p className="text-sm text-muted-foreground">Led by Arjun</p>
          </div>
        </div>

        {/* Table */}
        <div className="absolute left-1/2 top-[44%] h-[60%] w-[56%] -translate-x-1/2 -translate-y-1/2">
          <div
            className="wood h-full w-full rounded-[50%] p-4"
            style={{ boxShadow: "var(--shadow-table)" }}
          >
            <div
              className="felt relative h-full w-full rounded-[50%]"
              style={{ boxShadow: "inset 0 0 60px oklch(0 0 0 / 0.55)" }}
            >
              <div className="absolute left-1/2 top-1/2 h-[46%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-foreground/5" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-felt-deep">
                ♠
              </span>

              {/* Trick cards */}
              <div className="absolute left-1/2 top-[26%] -translate-x-1/2">
                <PlayingCard rank="K" suit="clubs" />
              </div>
              <div className="absolute left-[26%] top-[42%]">
                <PlayingCard rank="10" suit="clubs" />
              </div>
              <div className="absolute right-[26%] top-[42%]">
                <PlayingCard rank="9" suit="clubs" />
              </div>
              <div className="absolute left-1/2 top-[58%] -translate-x-1/2">
                <PlayingCard rank="A" suit="hearts" highlighted />
              </div>
            </div>
          </div>

          {/* Seats */}
          <div className="absolute -top-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
            <Avatar src={avatarArjun} name="Arjun" team="B" />
            <p className="text-sm font-semibold">Arjun</p>
            <Hearts lives={2} />
            <div className="mt-1 rotate-180">
              <CardFan count={8} />
            </div>
          </div>

          <div className="absolute -bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
            <div className="-mb-8">
              <CardFan count={8} />
            </div>
            <div className="relative">
              <Avatar src={avatarYou} name="You" team="A" />
              <div className="absolute -left-10 top-6">
                <MicButton />
              </div>
            </div>
            <p className="text-sm font-semibold">You</p>
            <Hearts lives={2} />
          </div>

          <div className="absolute -left-14 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <Avatar src={avatarPriya} name="Priya" team="A" />
              <p className="text-sm font-semibold">Priya</p>
              <Hearts lives={2} />
              <MicButton />
            </div>
            <CardFan count={5} vertical />
          </div>

          <div className="absolute -right-14 top-1/2 flex -translate-y-1/2 flex-row-reverse items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <Avatar src={avatarKaran} name="Karan" team="B" />
              <p className="text-sm font-semibold">Karan</p>
              <Hearts lives={1} />
              <MicButton muted />
            </div>
            <CardFan count={5} vertical />
          </div>
        </div>

        {/* Game log */}
        <aside className="panel absolute left-6 top-[22%] w-[15rem] p-4">
          <h2 className="border-b border-border pb-2 text-lg font-semibold">Game Log</h2>
          <ul className="mt-2 space-y-1">
            {LOG.map((entry, i) => (
              <li
                key={i}
                className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm ${
                  entry.active ? "bg-secondary" : ""
                }`}
              >
                <img
                  src={entry.src}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-5 w-5 rounded-full object-cover"
                />
                <span className="font-medium">{entry.name}</span>
                <span className="text-muted-foreground">{entry.text}</span>
                {entry.value ? <span className="font-semibold">{entry.value}</span> : null}
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat */}
        <aside className="panel absolute bottom-6 left-6 w-[17rem] overflow-hidden">
          <div className="flex gap-2 border-b border-border p-2">
            <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium">
              <MessageSquare className="h-4 w-4" /> Chat
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground">
              <Smile className="h-4 w-4" /> Reactions
            </span>
          </div>
          <ul className="space-y-2 p-3">
            {CHAT.map((m, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <img
                  src={m.src}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-muted-foreground">{m.name}</span>
                <span className="rounded-md bg-secondary px-2 py-1">{m.text}</span>
                <span className="ml-auto text-xs text-muted-foreground">{m.time}</span>
              </li>
            ))}
          </ul>
          <div className="m-3 flex items-center gap-2 rounded-lg border border-border px-3 py-2">
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Type a message..."
            />
            <Send className="h-4 w-4 text-gold" />
          </div>
        </aside>

        {/* Turn prompt */}
        <div className="panel absolute bottom-[22%] right-6 flex w-[19rem] items-start gap-3 p-4">
          <Target className="mt-1 h-6 w-6 text-live" />
          <div>
            <p className="text-lg font-semibold">Your Turn</p>
            <p className="text-xl font-semibold text-live">Follow suit</p>
            <p className="text-xs text-muted-foreground">Play a card of ♣ if possible</p>
          </div>
        </div>

        {/* Your hand */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-end">
          {HAND.map((c, i) => {
            const offset = i - (HAND.length - 1) / 2;
            const playable = c.suit === "clubs" || c.suit === "hearts";
            return (
              <div
                key={i}
                className="-mx-2"
                style={{
                  transform: `rotate(${offset * 4}deg) translateY(${-Math.abs(offset) * 5}px)`,
                }}
              >
                <PlayingCard rank={c.rank} suit={c.suit} size="md" highlighted={playable} />
              </div>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="absolute bottom-6 right-6 flex gap-3 text-center text-xs">
          <div className="flex flex-col items-center gap-1">
            <button className="panel grid h-12 w-12 place-items-center" aria-label="Mute">
              <Mic className="h-5 w-5" />
            </button>
            <span className="text-muted-foreground">Mute</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="panel grid h-12 w-12 place-items-center" aria-label="Emoji">
              <Smile className="h-5 w-5" />
            </button>
            <span className="text-muted-foreground">Emoji</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Link
              to="/"
              className="panel grid h-12 w-12 place-items-center"
              aria-label="More"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Link>
            <span className="text-muted-foreground">More</span>
          </div>
        </div>
      </div>
    </main>
  );
}
