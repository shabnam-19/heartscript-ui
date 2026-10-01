import { useEffect, useState } from "react";

const messages = [
  "Translating your heartbeat into prose...",
  "Gathering cherished memories from the quiet hours...",
  "Inscribing vintage ink upon warm parchment...",
  "Weaving dark gothic romance and tender longing...",
  "Sealing your words with timeless devotion...",
];

function LoadingMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="mt-8 text-xl md:text-2xl font-serif italic text-[#F0E0D0] text-center max-w-md tracking-wide">
      {messages[index]}
    </p>
  );
}

export default LoadingMessages;