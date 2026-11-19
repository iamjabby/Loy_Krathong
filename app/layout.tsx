import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "ลอยกระทง ลุ้นบิงโก | PIE SARAN OFFICIAL",
  description: "ติ๊กให้ครบ จบที่บิงโก — เกมภารกิจคืนวันเพ็ญ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
