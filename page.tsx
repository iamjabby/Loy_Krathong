"use client";

import { useMemo, useState } from "react";

const missions = [
  "เห็นกระทงประดับดอกดาวเรือง",
  "ได้ยินเสียงประทัดดังปัง!",
  "เจอคนใส่ชุดไทยในงาน",
  "ถ่ายรูปกับแสงโคมสวย ๆ",
  "เห็นพระจันทร์คืนนี้",
  "เพื่อนชวนไปซื้อขนม",
  "เจอร้านปาโป่งหรือตักไข่",
  "ได้กลิ่นหมูปิ้งลอยมา",
  "เห็นคนถือสายไหมสีหวาน",
  "ได้ยินเพลงลูกทุ่งจากเวที",
  "มีคนยิ้มให้ตอนเดินสวนกัน",
  "เพื่อนแซวเรื่องคนที่แอบชอบ",
  "เดินผ่านคนเดิมมากกว่าสองรอบ",
  "มีคนชวนไปลอยกระทงด้วยกัน",
  "สบตาใครบางคนแล้วหลบก่อน",
  "เห็นกระทงใบตองลอยไปกับน้ำ",
  "ถ่ายรูปกับเพื่อนครบแก๊ง",
  "เจอร้านขายหน้ากากหรือตุ๊กตา",
  "ได้กินของทอดในงาน",
  "เห็นไฟประดับสะท้อนผิวน้ำ",
  "มีคนชมชุดหรือทรงผม",
  "เจอคนรู้จักแบบไม่ได้นัด",
  "ช่วยเพื่อนถือของในงาน",
  "ขอถ่ายรูปกับใครสักคน",
  "เจอโมเมนต์น่ารักจนยิ้มเอง",
  "เห็นเด็กน้อยแต่งชุดไทย",
  "ซื้อของกินที่ไม่เคยลอง",
  "ได้ยินเสียงหัวเราะดัง ๆ",
  "ยืนดูการแสดงจนจบเพลง",
  "มีคนถ่ายรูปให้โดยไม่ต้องขอ",
  "ได้เดินข้างคนที่อยากคุยด้วย",
  "เจอคู่รักถ่ายรูปหวาน ๆ",
  "เพื่อนทำตัวเป็นกามเทพให้",
  "เห็นดอกไม้ไฟบนฟ้า",
  "เจอกระทงที่ตกแต่งไม่เหมือนใคร",
];

const fortunes = [
  "คืนนี้เสน่ห์แรง ระวังมีคนแอบมองอยู่นะ ✨",
  "กระทงลอยไป แต่ใจใครบางคนอาจลอยมาหา 💌",
  "ถ้าสบตาอีกครั้ง ลองยิ้มให้ดูสิ 🌙",
  "คืนนี้เหมาะกับการเริ่มบทสนทนาดี ๆ 🪷",
  "คำอธิษฐานเรื่องหัวใจมีแววเป็นจริง 💛",
  "คนข้าง ๆ อาจเป็นคนที่รอจังหวะคุยอยู่ก็ได้ 👀",
];

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getLines(marked: Set<number>) {
  const lines: number[][] = [];
  for (let r = 0; r < 5; r++)
    lines.push(Array.from({ length: 5 }, (_, c) => r * 5 + c));
  for (let c = 0; c < 5; c++)
    lines.push(Array.from({ length: 5 }, (_, r) => r * 5 + c));
  lines.push([0, 6, 12, 18, 24], [4, 8, 12, 16, 20]);
  return lines.filter((line) => line.every((i) => i === 12 || marked.has(i)));
}

export default function Home() {
  const [name, setName] = useState("");
  const [player, setPlayer] = useState("");
  const [board, setBoard] = useState<string[]>([]);
  const [marked, setMarked] = useState<Set<number>>(new Set([12]));
  const [fortune, setFortune] = useState("");
  const [toast, setToast] = useState("");
  const lines = useMemo(() => getLines(marked), [marked]);
  const isBingo = lines.length > 0;

  function startGame(event: React.FormEvent) {
    event.preventDefault();
    const cleanName = name.trim().slice(0, 20);
    if (!cleanName) return;
    setPlayer(cleanName);
    const cards = shuffled(missions).slice(0, 24);
    cards.splice(12, 0, "FREE");
    setBoard(cards);
    setMarked(new Set([12]));
    setFortune("");
  }

  function toggleCell(index: number) {
    if (index === 12) return;
    setMarked((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function downloadBoard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, 1200, 1500);
    gradient.addColorStop(0, "#142c45");
    gradient.addColorStop(0.55, "#1b5260");
    gradient.addColorStop(1, "#a34e32");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 1500);
    for (let i = 0; i < 70; i++) {
      const x = (i * 197 + 83) % 1200;
      const y = (i * 271 + 47) % 1500;
      ctx.fillStyle = i % 3 === 0 ? "#ffe28b" : "rgba(255,255,255,.75)";
      ctx.beginPath();
      ctx.arc(x, y, i % 4 === 0 ? 4 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#fff4d3";
    ctx.textAlign = "center";
    ctx.font = "bold 62px sans-serif";
    ctx.fillText("ลอยกระทง ลอยใจ", 600, 130);
    ctx.font = "32px sans-serif";
    ctx.fillText(`บิงโกของ ${player}`, 600, 188);
    const left = 90,
      top = 250,
      gap = 12,
      size = 192;
    board.forEach((item, index) => {
      const row = Math.floor(index / 5),
        col = index % 5;
      const x = left + col * (size + gap),
        y = top + row * (size + gap);
      ctx.fillStyle = marked.has(index) ? "#e9ae57" : "#f8f1de";
      ctx.strokeStyle = marked.has(index) ? "#fff0b1" : "#c9a779";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, 18);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = marked.has(index) ? "#512d25" : "#20394b";
      ctx.font = item === "FREE" ? "bold 34px sans-serif" : "26px sans-serif";
      const words =
        item === "FREE" ? ["FREE", "✦"] : (item.match(/.{1,11}/gu) ?? [item]);
      words
        .slice(0, 5)
        .forEach((word, line) =>
          ctx.fillText(
            word,
            x + size / 2,
            y + size / 2 + (line - (Math.min(words.length, 5) - 1) / 2) * 34,
            size - 18,
          ),
        );
      if (marked.has(index) && index !== 12) {
        ctx.strokeStyle = "#b64e36";
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(x + 24, y + size - 27);
        ctx.lineTo(x + size - 22, y + 26);
        ctx.stroke();
      }
    });
    ctx.fillStyle = "#fff4d3";
    ctx.font = "28px sans-serif";
    ctx.fillText(
      isBingo
        ? `BINGO! ${lines.length} แถว ✨`
        : `ทำภารกิจแล้ว ${marked.size - 1} ช่อง`,
      600,
      1395,
    );
    ctx.font = "22px sans-serif";
    ctx.fillText("คืนวันเพ็ญ • ขอให้คืนนี้มีเรื่องดี ๆ", 600, 1440);
    const link = document.createElement("a");
    link.download = `loy-krathong-bingo-${player}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setToast("เซฟบอร์ดของคุณเรียบร้อยแล้ว ✨");
    window.setTimeout(() => setToast(""), 2400);
  }

  function leaveGame() {
    setPlayer("");
    setBoard([]);
    setMarked(new Set());
    setFortune("");
    setName("");
  }

  return (
    <main className="scene">
      <div className="moon" aria-hidden="true" />
      <div className="sparkles" aria-hidden="true">
        ✦　·　✧　　 ·　✦　　✧　·　✦
      </div>
      <header className="masthead">
        <span className="eyebrow">BANGKOK · FULL MOON FESTIVAL</span>
        <div className="brand">
          <span>🪷</span> ลอยกระทง <i>ลอยใจ</i>
        </div>
        <div className="tagline">
          A little game, a little love, one magical night
        </div>
      </header>
      {!player ? (
        <section className="welcome panel">
          <div className="lamp">🏮</div>
          <span className="section-kicker">ยินดีต้อนรับสู่คืนวันเพ็ญ</span>
          <h1>คืนนี้…จะได้ลอยกับใครนะ?</h1>
          <p>
            เดินเล่นในงานวัด เก็บโมเมนต์น่ารัก แล้วเช็กดูว่าหัวใจจะพาไปเจออะไร
          </p>
          <form onSubmit={startGame} className="name-form">
            <label htmlFor="player-name">ชื่อเล่นของคุณ</label>
            <div className="input-row">
              <input
                id="player-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น มะลิ"
                maxLength={20}
                required
              />
              <button type="submit">
                เข้าเล่น <span>→</span>
              </button>
            </div>
          </form>
          <div className="privacy-note">
            ✧ ไม่ต้องสมัคร · ไม่บันทึกข้อมูล · เล่นจบแล้วเริ่มใหม่ได้ทุกเมื่อ
          </div>
          <div className="temple-line" aria-hidden="true">
            ⌂　♧　⌂　♧　⌂　♧　⌂
          </div>
        </section>
      ) : (
        <section className="game panel">
          <div className="board-heading">
            <div>
              <span className="section-kicker">บอร์ดของ {player}</span>
              <h1>ภารกิจคืนวันเพ็ญ</h1>
            </div>
            <button className="quiet-button" onClick={leaveGame}>
              ออกจากเกม ↗
            </button>
          </div>
          <div className="score-strip">
            <span>
              🪷 ทำแล้ว <b>{marked.size - 1}</b> / 24
            </span>
            <span>
              ✦ บิงโก <b>{lines.length}</b> แถว
            </span>
            <button
              onClick={() =>
                setFortune(
                  fortunes[Math.floor(Math.random() * fortunes.length)],
                )
              }
            >
              เปิดคำทำนาย 💌
            </button>
          </div>
          {fortune && (
            <div className="fortune" key={fortune}>
              {fortune}
            </div>
          )}
          {isBingo && (
            <div className="bingo-banner">
              🎉 BINGO! คืนนี้หัวใจเข้าข้างคุณแล้ว ✨
            </div>
          )}
          <div className="bingo-grid" role="grid" aria-label="บิงโก 5 คูณ 5">
            {board.map((item, index) => (
              <button
                key={`${item}-${index}`}
                role="gridcell"
                aria-pressed={marked.has(index)}
                disabled={index === 12}
                className={`cell ${marked.has(index) ? "selected" : ""} ${index === 12 ? "free" : ""} ${lines.some((line) => line.includes(index)) ? "winning" : ""}`}
                onClick={() => toggleCell(index)}
              >
                <span>{item === "FREE" ? "✦ FREE ✦" : item}</span>
                {marked.has(index) && index !== 12 && <i>✓</i>}
              </button>
            ))}
          </div>
          <div className="game-actions">
            <button className="download-button" onClick={downloadBoard}>
              ดาวน์โหลดบอร์ดเป็นภาพ <span>↓</span>
            </button>
            <button
              className="reset-button"
              onClick={() => {
                const cards = shuffled(missions).slice(0, 24);
                cards.splice(12, 0, "FREE");
                setBoard(cards);
                setMarked(new Set([12]));
                setFortune("");
              }}
            >
              สุ่มบอร์ดใหม่ ↻
            </button>
          </div>
          <p className="hint">
            แตะช่องเมื่อทำภารกิจสำเร็จ · ช่องกลางนับเป็นช่องฟรี ·
            บิงโกได้ทั้งแนวตั้ง แนวนอน และแนวทแยง
          </p>
        </section>
      )}
      <footer>
        <span>🌕 คืนวันเพ็ญเดือนสิบสอง</span>
        <span>
          ทำด้วยหัวใจและแสงเทียน <b>✦</b>
        </span>
      </footer>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
