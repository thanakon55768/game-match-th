import { useEffect, useRef } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min.js";

const VantaBackground = ({ children }) => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = WAVES({
      el: vantaRef.current,
      THREE,
      color: 0x1a1a1a, // สีพื้นหลัง
      shininess: 50,
      waveHeight: 20,
      waveSpeed: 1.2,
    });

    return () => effect.destroy();
  }, []);

  return (
    <div ref={vantaRef} style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* ✅ เพิ่ม children ตรงนี้ */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default VantaBackground;
