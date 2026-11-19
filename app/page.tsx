"use client";

import { useMemo, useState } from "react";

const missions = [
  "ลอยกระทงสิจ๊ะ",
  "ไม่ลอยอะ ขอนอน",
  "กระทงใบตอง",
  "กระทงขนมปัง",
  "กระทงทำเอง",
  "ไปกับคนรู้ใจ",
  "อยู่กับครอบครัว",
  "ขอฉายเดี่ยว",
  "ชุดไทยพร้อม",
  "ชุดธรรมดาพอ",
  "ไอติมหลอด",
  "โรตีสายไหม",
  "ขนมเบื้อง",
  "เล่นประทัด/พลุ",
  "จุดไฟเย็น",
  "ประกวดนางนพมาศ",
  "เดินเที่ยวงานหาขนมกิน",
  "อัพสตอรี่เที่ยว แต่จริงๆนอนอยู่บ้าน",
  "สายมูเตรียมขอพรพระจันทร์",
  "ขอขมาพระแม่คงคา",
  "เกิด 24 พ.ย",
  "ลูกรักสิ่งศักดิ์สิทธิ์",
  "กลับบ้านพร้อมของกินเต็มมือ",
  "ถ่ายรูปเป็นร้อย แต่ลงแค่รูปเดียว",
  "เจอโมเมนต์น่ารักจนยิ้มเอง",
  "เห็นเด็กน้อยแต่งชุดไทย",
  "ซื้อของกินที่ไม่เคยลอง",
  "เผลอเดินหลงกับเพื่อน",
  "ถ่ายรูปคู่กับกระทง",
  "มีคนชวนไปลอยกระทง",
  "ลอยกระทงเสร็จแล้วกลับบ้านเลย",
  "ต่อคิวซื้อของกินจนเมื่อย",
  "ยืนดูดอกไม้ไฟกับเพื่อนรู้ใจ",
  "ยืนดูดอกไม้ไฟคนเดียวปล่าวเปลี่ยวหัวใจ",
  "เจอกระทงที่ตกแต่งไม่เหมือนใคร",
];

const fortunes = [
  "ดวงช่วงนี้มีเกณฑ์ได้เห็นโมเมนต์จากเมนแบบไม่ทันตั้งตัว เตรียมตัวรับแรงกระแทกทางใจไว้ให้ดี",
  "มีบุญสัมพันธ์กับศิลปิน มีโอกาสได้พบกันในสถานที่ที่ตั้งใจไว้",
  "ใครกำลังรอบัตรคอน รอบนี้ดวงยังเปิด มีลุ้นได้ที่นั่งถูกใจ",
  "ระวังทรัพย์จางเพราะความน่ารักของเมน เห็นอะไรใหม่ ๆ เป็นต้องกดใส่ตะกร้า",
  "มีเกณฑ์ได้รับข่าวดีจากบ้านเบสหรือประกาศที่รอคอยมานาน",
  "ดวงสุ่มการ์ดกำลังมา ใบที่ตามหาอาจมาอยู่ในมือโดยไม่คาดคิด",
  "ช่วงนี้เมนมีเกณฑ์ตกแฟนคลับเพิ่ม ส่วนคุณก็มีเกณฑ์ตกหลุมรักซ้ำ ๆ",
  "ระวังอาการใจเหลวเมื่อเห็นรอยยิ้มของเมน ช่วงนี้ภูมิต้านทานต่ำเป็นพิเศษ",
  "บุญเก่าที่สะสมมามีผล มีเกณฑ์ได้เห็นศิลปินในระยะใกล้กว่าที่คิด",
  "ใครกำลังรอคิวไซน์หรือกิจกรรมแฟนคลับ มีโอกาสได้รับข่าวที่ทำให้ยิ้มออก",
  "ดวงการเปย์โดดเด่น แต่ควรตรวจสอบยอดเงินในบัญชีก่อนตัดสินใจทุกครั้ง",
  "มีเกณฑ์ได้โมเมนต์ที่รอมานาน จนต้องกลับไปดูซ้ำก่อนนอนทุกคืน",
  "มีเกณฑ์ได้ร่วมโปรเจกต์ดี ๆ กับแฟนคลับคนอื่น และได้มิตรภาพกลับมาเป็นของแถม",
  "ดวงการเดินทางเพื่อไปหาศิลปินโดดเด่น ทริปที่วางแผนไว้อาจมีข่าวดีตามมา",
  "ช่วงนี้มีเกณฑ์ได้ของสะสมที่ตามหามานาน แต่ต้องระวังเจอราคาที่ทำใจสั่น",
  "อย่าเพิ่งรีบขายการ์ดที่มีอยู่ ใบที่คิดว่าไม่มีอะไรอาจกลายเป็นใบโปรดในอนาคต",
  "ระวังนอนดึกเพราะมัวแต่ย้อนดูคลิปเก่า ๆ ดวงพักผ่อนช่วงนี้ค่อนข้างน่าเป็นห่วง",
  "ดวงติ่งยังรุ่งเรือง แม้ยอดเงินในบัญชีจะเริ่มส่งสัญญาณขอความช่วยเหลือ"
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

function wrapThaiText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const wordSegmenter = new Intl.Segmenter("th", { granularity: "word" });
  const graphemeSegmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
  const lines: string[] = [];
  let line = "";

  for (const part of wordSegmenter.segment(text)) {
    const word = part.segment;
    if (!word.trim()) {
      if (line) line += word;
      continue;
    }
    const candidate = line + word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line.trim()) lines.push(line.trimEnd());
    line = "";
    if (ctx.measureText(word).width <= maxWidth) {
      line = word.trimStart();
      continue;
    }
    for (const grapheme of graphemeSegmenter.segment(word)) {
      const next = line + grapheme.segment;
      if (line && ctx.measureText(next).width > maxWidth) {
        lines.push(line.trimEnd());
        line = grapheme.segment;
      } else {
        line = next;
      }
    }
  }
  if (line.trim()) lines.push(line.trimEnd());
  return lines;
}

function drawCenteredText(ctx: CanvasRenderingContext2D, text: string, y: number, font: string, color: string) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  ctx.fillText(text, 600 - ctx.measureText(text).width / 2, y);
}

export default function Home() {
  type GameScreen = "board" | "letter" | "result";
  const [name, setName] = useState("");
  const [player, setPlayer] = useState("");
  const [board, setBoard] = useState<string[]>([]);
  const [marked, setMarked] = useState<Set<number>>(new Set([12]));
  const [fortune, setFortune] = useState("");
  const [toast, setToast] = useState("");
  const [pendingMobileImage, setPendingMobileImage] = useState<File | null>(null);
  const [gameScreen, setGameScreen] = useState<GameScreen>("board");
  const [letterOpening, setLetterOpening] = useState(false);
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
    setPendingMobileImage(null);
    setGameScreen("board");
    setLetterOpening(false);
  }

  function goToLetter() {
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
    setGameScreen("letter");
    setLetterOpening(false);
  }

  function openLetter() {
    setLetterOpening(true);
    window.setTimeout(() => {
      setGameScreen("result");
      setLetterOpening(false);
    }, 700);
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

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function openMobileImage() {
    if (!pendingMobileImage) return;
    const url = URL.createObjectURL(pendingMobileImage);
    const preview = window.open(url, "_blank");
    if (!preview) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.click();
    }
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  function shareMobileImage() {
    if (!pendingMobileImage) return;
    const shareData = { files: [pendingMobileImage], title: pendingMobileImage.name };
    if (navigator.share && navigator.canShare?.({ files: [pendingMobileImage] })) {
      void navigator.share(shareData).catch((error: unknown) => {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setToast("แชร์ไม่สำเร็จ ลองแตะ “เปิดภาพ” เพื่อบันทึกแทน");
          window.setTimeout(() => setToast(""), 4000);
        }
      });
      return;
    }
    openMobileImage();
  }

  async function downloadBoard() {
    await document.fonts.ready;
    const portrait = new Image();
    portrait.src = "/artwork-pie.png";
    const pagoda = new Image();
    pagoda.src = "/artwork-pagoda.png";
    const floatingKrathong = new Image();
    floatingKrathong.src = "/artwork-floating-krathong.png";
    const water = new Image();
    water.src = "/artwork-water.png";
    const krathong = new Image();
    krathong.src = "/artwork-krathong.png";
    try {
      await Promise.all([portrait.decode(), pagoda.decode(), floatingKrathong.decode(), water.decode(), krathong.decode()]);
    } catch {
      // Save the board and fortune even if a decorative image is unavailable.
    }
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
    for (let i = 0; i < 90; i++) {
      const x = (i * 197 + 83) % 1200;
      const y = (i * 271 + 47) % 1500;
      ctx.fillStyle = i % 3 === 0 ? "#ffe28b" : "rgba(255,255,255,.75)";
      ctx.beginPath();
      ctx.arc(x, y, i % 4 === 0 ? 4 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
    drawCenteredText(ctx, "✦  วันเพ็ญเดือนสิบสอง  ✦", 76, '600 25px "Noto Sans Thai", sans-serif', "#f4cf78");
    drawCenteredText(ctx, "ลอยกระทง ลุ้นบิงโก", 143, '800 62px "Noto Sans Thai", sans-serif', "#fff4d3");
    drawCenteredText(ctx, `บิงโกของ ${player}`, 198, '600 32px "Noto Sans Thai", sans-serif', "#f6dfae");
    ctx.strokeStyle = "rgba(244,207,120,.65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(390, 220);
    ctx.lineTo(810, 220);
    ctx.stroke();
    const left = 72,
      top = 366,
      gap = 14,
      size = 200;
    ctx.fillStyle = "rgba(251,244,231,.97)";
    ctx.beginPath();
    ctx.roundRect(92, 232, 1016, 102, 22);
    ctx.fill();
    drawCenteredText(ctx, "คำทำนาย", 264, '700 22px "Noto Sans Thai", sans-serif', "#a84f37");
    ctx.font = '500 25px "Noto Sans Thai", sans-serif';
    ctx.fillStyle = "#23394a";
    const fortuneLines = wrapThaiText(ctx, fortune, 940).slice(0, 2);
    fortuneLines.forEach((line, index) => {
      ctx.textAlign = "left";
      ctx.fillText(line, 600 - ctx.measureText(line).width / 2, 298 + index * 27);
    });
    board.forEach((item, index) => {
      const row = Math.floor(index / 5),
        col = index % 5;
      const x = left + col * (size + gap),
        y = top + row * (size + gap);
      if (item === "FREE") {
        const freeGradient = ctx.createLinearGradient(x, y, x + size, y + size);
        freeGradient.addColorStop(0, "#347a70");
        freeGradient.addColorStop(0.52, "#235e66");
        freeGradient.addColorStop(1, "#163e55");
        ctx.fillStyle = freeGradient;
      } else {
        ctx.fillStyle = marked.has(index) ? "#e9ae57" : "#f8f1de";
      }
      ctx.strokeStyle = item === "FREE" ? "#235e66" : marked.has(index) ? "#fff0b1" : "#c9a779";
      ctx.lineWidth = item === "FREE" ? 1 : marked.has(index) ? 5 : 3;
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, 22);
      ctx.fill();
      ctx.stroke();
      if (item === "FREE") {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x + 4, y + 4, size - 8, size - 8, 18);
        ctx.clip();
        if (water.complete && water.naturalWidth) {
          ctx.globalAlpha = 0.9;
          ctx.drawImage(water, x + 4, y + 143, 192, 52);
          ctx.globalAlpha = 1;
        }
        for (const [sx, sy] of [[x + 32, y + 37], [x + 163, y + 43], [x + 25, y + 144], [x + 170, y + 151]]) {
          ctx.fillStyle = "#ffe28b";
          ctx.font = '20px sans-serif';
          ctx.fillText("✦", sx, sy);
        }
        if (pagoda.complete && pagoda.naturalWidth) {
          ctx.globalAlpha = 0.72;
          ctx.drawImage(pagoda, x + 5, y + 28, 190, 118);
          ctx.globalAlpha = 1;
        }
        if (floatingKrathong.complete && floatingKrathong.naturalWidth) {
          const floatBoxWidth = size * 0.44;
          const floatHeight = size * 0.43;
          const floatWidth = floatHeight * (floatingKrathong.naturalWidth / floatingKrathong.naturalHeight);
          const floatTop = y + size * 0.01;
          const leftFloatX = x + (floatBoxWidth - floatWidth) / 2;
          ctx.drawImage(floatingKrathong, leftFloatX, floatTop, floatWidth, floatHeight);
          ctx.save();
          const rightBoxLeft = x + size - floatBoxWidth;
          ctx.translate(rightBoxLeft + floatBoxWidth / 2, floatTop);
          ctx.scale(-1, 1);
          ctx.drawImage(floatingKrathong, -floatWidth / 2, 0, floatWidth, floatHeight);
          ctx.restore();
        }
        if (portrait.complete && portrait.naturalWidth) {
          const portraitHeight = 232;
          const portraitWidth = portraitHeight * (portrait.naturalWidth / portrait.naturalHeight);
          ctx.drawImage(portrait, x + (size - portraitWidth) / 2, y - 32, portraitWidth, portraitHeight);
        }
        if (krathong.complete && krathong.naturalWidth) {
          ctx.drawImage(krathong, x + 6, y + 150, 46, 46);
          ctx.drawImage(krathong, x + 148, y + 150, 46, 46);
        }
        ctx.fillStyle = "#123f4a";
        ctx.beginPath();
        ctx.roundRect(x + 45, y + 161, 110, 30, 15);
        ctx.fill();
        ctx.fillStyle = "#fff4d3";
        ctx.textAlign = "left";
        ctx.font = '800 18px "Noto Sans Thai", sans-serif';
        const freeLabel = "✦ FREE ✦";
        ctx.fillText(freeLabel, x + size / 2 - ctx.measureText(freeLabel).width / 2, y + 182);
        ctx.restore();
      } else {
        ctx.fillStyle = marked.has(index) ? "#512d25" : "#20394b";
        ctx.font = '500 25px "Noto Sans Thai", sans-serif';
        const textLines = wrapThaiText(ctx, item, size - 36).slice(0, 5);
        const lineHeight = 32;
        const startY = y + size / 2 - ((textLines.length - 1) * lineHeight) / 2 + 9;
        ctx.textAlign = "left";
        ctx.textAlign = "left";
        textLines.forEach((text, line) => {
          ctx.fillText(text, x + size / 2 - ctx.measureText(text).width / 2, startY + line * lineHeight);
        });
      }
      if (marked.has(index) && index !== 12) {
        ctx.beginPath();
        ctx.fillStyle = "#a94f36";
        ctx.arc(x + size - 28, y + 28, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff4d3";
        ctx.textAlign = "center";
        ctx.font = '700 20px sans-serif';
        ctx.fillText("✓", x + size - 28, y + 35);
      }
      if (lines.some((line) => line.includes(index))) {
        ctx.strokeStyle = "#fff0a7";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(x + 7, y + 7, size - 14, size - 14, 17);
        ctx.stroke();
      }
    });
    drawCenteredText(ctx, "✦ made by piesaran official ✦", 1472, '500 20px "Noto Sans Thai", sans-serif', "#f6dfae");
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      setToast("สร้างภาพไม่สำเร็จ ลองกดดาวน์โหลดอีกครั้งนะ");
      window.setTimeout(() => setToast(""), 3000);
      return;
    }
    const filename = `loy-krathong-bingo-${player}.png`;
    if (isMobileDevice()) {
      setPendingMobileImage(new File([blob], filename, { type: "image/png" }));
      setToast("ภาพพร้อมแล้ว เลือกวิธีบันทึกด้านล่างได้เลย ✨");
      window.setTimeout(() => setToast(""), 4000);
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    setToast("บันทึกบิงโกของคุณเรียบร้อยแล้ว ✨");
    window.setTimeout(() => setToast(""), 2400);
  }

  function leaveGame() {
    setPlayer("");
    setBoard([]);
    setMarked(new Set());
    setFortune("");
    setName("");
    setPendingMobileImage(null);
  }

  return (
    <main className="scene">
      <div className="moon" aria-hidden="true" />
      <div className="sparkles" aria-hidden="true">
        ✦　·　✧　　 ·　✦　　✧　·　✦
      </div>
      <div className="sparkles sparkles-right" aria-hidden="true">
        ✦　·　✧　　 ·　✦　　✧　·　✦
      </div>
      <header className="masthead">
        <span className="eyebrow">PIE SARAN OFFICIAL · LOY KRATHONG FESTIVAL</span>
        <div className="brand">
          <span>🪷</span> ลอยกระทง <i>ลุ้นบิงโก</i> <span>🪷</span>
        </div>
        <div className="tagline">ลอย ลอยกระทง ลอย ลอยกระทง</div>
      </header>
      {!player ? (
        <section className="welcome panel">
          <div className="lamp">🏮</div>
          <span className="section-kicker">พร้อมกันหรือยัง</span>
          <h1>ภารกิจสนุก ลุ้นบิงโก!</h1>
          <p>
            ติ๊กช่องตามโมเมนต์ที่เจอในงานลอยกระทง และรับคำทำนาย
          </p>
          <form onSubmit={startGame} className="name-form">
            <label htmlFor="player-name">ชื่อเล่นของคุณ</label>
            <div className="input-row">
              <input
                id="player-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น ตี๋Handsome"
                maxLength={20}
                required
              />
              <button type="submit">
                เริ่มเล่น <span>→</span>
              </button>
            </div>
          </form>
          <div className="temple-line" aria-hidden="true">
            ⌂　♧　⌂　♧　⌂　♧　⌂
          </div>
        </section>
      ) : gameScreen === "board" ? (
        <section className="game panel">
          <div className="board-heading">
            <div>
              <span className="section-kicker">บิงโกของ {player}</span>
              <h1>พริกแกงทำอะไรกันบ้างค้าบ ?</h1>
            </div>
            <button className="quiet-button" onClick={leaveGame}>
              ออกจากเกม
            </button>
          </div>
          {isBingo && (
            <div className="bingo-banner">
              🎉 BINGO! ✨
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
                {index === 12 ? (
                  <span className="free-art" aria-label="ช่อง FREE">
                    <span className="free-orbit" />
                    <span className="free-orbit free-orbit-two" />
                    <span className="free-twinkles" aria-hidden="true">
                      <i className="twinkle-a">✦</i>
                      <i className="twinkle-b">✧</i>
                      <i className="twinkle-c">✦</i>
                      <i className="twinkle-d">✧</i>
                      <i className="twinkle-e">✦</i>
                      <i className="twinkle-f">✧</i>
                      <i className="twinkle-g">·</i>
                    </span>
                    <img className="free-water" src="/artwork-water.png" alt="" />
                    <img className="free-pagoda" src="/artwork-pagoda.png" alt="" />
                    <img className="free-float free-float-left" src="/artwork-floating-krathong.png" alt="" />
                    <img className="free-float free-float-right" src="/artwork-floating-krathong.png" alt="" />
                    <img src="/artwork-pie.png" alt="" />
                    <span className="free-label-group">
                      <img className="free-krathong-icon" src="/artwork-krathong.png" alt="" />
                      <span className="free-label">✦ FREE ✦</span>
                      <img className="free-krathong-icon" src="/artwork-krathong.png" alt="" />
                    </span>
                  </span>
                ) : (
                  <span>{item}</span>
                )}
                {marked.has(index) && index !== 12 && <i>✓</i>}
              </button>
            ))}
          </div>
          <div className="game-actions">
            <button className="download-button next-button" onClick={goToLetter}>
              ต่อไป <span>→</span>
            </button>
          </div>
          <p className="hint">
            ช่องกลางนับเป็นช่องฟรี ·
            บิงโกได้ทั้งแนวตั้ง แนวนอน และแนวทแยง
          </p>
        </section>
      ) : gameScreen === "letter" ? (
        <section className="letter-page panel">
          <div className="letter-nav">
            <button className="reset-button" onClick={() => setGameScreen("board")}>กลับไปดูบอร์ด</button>
            <button className="quiet-button letter-exit" onClick={leaveGame}>ออกจากเกม</button>
          </div>
          <div className={`letter-sheet ${letterOpening ? "letter-opening" : ""}`}>
            <div className="letter-lotus">🪷</div>
            <span className="section-kicker">จดหมาย</span>
            <h1>ถึง {player}</h1>
            <p>มีคำทำนายเล็ก ๆ รอให้เปิดอ่านอยู่<br />กดเปิดได้เลย</p>
            <button
              type="button"
              className="envelope-art envelope-trigger"
              onClick={openLetter}
              disabled={letterOpening}
              aria-label="เปิดจดหมายคำทำนาย"
            >
              <div className="envelope-paper"><span>✦</span><span>คำทำนาย</span></div>
              <div className="envelope-fold" />
              <div className="envelope-seal">🪷</div>
            </button>
          </div>
        </section>
      ) : (
        <section className="result-page panel">
          <div className="board-heading result-heading">
            <div>
              <span className="section-kicker">จดหมายเปิดแล้ว 🪷</span>
              <h1>บิงโกของ {player}</h1>
            </div>
            <button className="quiet-button" onClick={leaveGame}>ออกจากเกม</button>
          </div>
          <div className="fortune-letter">
            <span>✦ คำทำนาย ✦</span>
            <p>{fortune}</p>
          </div>
          <div className="result-grid" aria-label="สรุปบอร์ดบิงโก">
            {board.map((item, index) => (
              <div key={`${item}-${index}`} className={`result-cell ${marked.has(index) ? "result-selected" : ""} ${index === 12 ? "result-free" : ""} ${lines.some((line) => line.includes(index)) ? "result-winning" : ""}`}>
                {index === 12 ? (
                  <>
                    <img className="result-water" src="/artwork-water.png" alt="" />
                    <img className="result-pagoda" src="/artwork-pagoda.png" alt="" />
                    <img className="result-float result-float-left" src="/artwork-floating-krathong.png" alt="" />
                    <img className="result-float result-float-right" src="/artwork-floating-krathong.png" alt="" />
                    <img src="/artwork-pie.png" alt="" />
                    <span className="result-free-label">
                      <img src="/artwork-krathong.png" alt="" />
                      <b>FREE</b>
                      <img src="/artwork-krathong.png" alt="" />
                    </span>
                  </>
                ) : <span>{item}</span>}
                {marked.has(index) && index !== 12 && <i>✓</i>}
              </div>
            ))}
          </div>
          <div className="result-actions">
            <button className="download-button" onClick={downloadBoard}>ดาวน์โหลดบิงโกพร้อมคำทำนาย </button>
          </div>
          {pendingMobileImage && (
            <div className="mobile-save-panel">
              <p>ภาพพร้อมแล้ว แตะ “แชร์ / บันทึกภาพ” แล้วเลือกแอปหรือที่จัดเก็บจากเมนูที่เปิดขึ้น</p>
              <div>
                <button className="download-button" onClick={shareMobileImage}>แชร์ / บันทึกภาพ</button>
                <button className="reset-button" onClick={openMobileImage}>เปิดภาพ</button>
              </div>
            </div>
          )}
        </section>
      )}
      <footer>
        <span>✦ made by pie saran official ✦</span>
      </footer>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
