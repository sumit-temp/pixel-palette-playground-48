const SUITS = {
  hearts: { glyph: "♥", red: true },
  diamonds: { glyph: "♦", red: true },
  spades: { glyph: "♠", red: false },
  clubs: { glyph: "♣", red: false },
} as const;

export type Suit = keyof typeof SUITS;

export function suitGlyph(suit: Suit) {
  return SUITS[suit].glyph;
}

export function PlayingCard({
  rank,
  suit,
  size = "md",
  highlighted = false,
  className = "",
}: {
  rank: string;
  suit: Suit;
  size?: "sm" | "md" | "lg";
  highlighted?: boolean;
  className?: string;
}) {
  const { glyph, red } = SUITS[suit];
  const dims = {
    sm: "w-[3.1rem] h-[4.4rem] text-[0.95rem]",
    md: "w-[4.2rem] h-[5.9rem] text-[1.15rem]",
    lg: "w-[5rem] h-[7rem] text-[1.35rem]",
  }[size];

  return (
    <div
      className={`playing-card ${dims} ${highlighted ? "ring-gold" : ""} ${className}`}
      style={{ color: red ? "var(--suit-red)" : "var(--suit-black)" }}
    >
      <span>{rank}</span>
      <span className="self-start text-[0.8em] leading-none">{glyph}</span>
      <span className="self-center text-[1.9em] leading-none">{glyph}</span>
    </div>
  );
}

export function CardFan({
  count,
  vertical = false,
}: {
  count: number;
  vertical?: boolean;
}) {
  return (
    <div className={vertical ? "flex flex-col -space-y-8" : "flex -space-x-6"}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`card-back ${vertical ? "h-14 w-20" : "h-[3.4rem] w-[2.4rem]"}`}
          style={
            vertical
              ? undefined
              : { transform: `rotate(${(i - (count - 1) / 2) * 5}deg)` }
          }
        />
      ))}
    </div>
  );
}
