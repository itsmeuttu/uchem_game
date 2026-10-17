import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export const MoleculeCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for molecular network
    const particles: Particle[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1.5,
      alpha: Math.random() * 0.5 + 0.3,
      color: Math.random() > 0.5 ? '#42E8F5' : '#8B5CF6'
    }));

    let angle1 = 0;
    let angle2 = 0;
    let angle3 = 0;

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw connecting molecular bonds between nearby floating particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Subtle mouse pull
        const dxMouse = mouseX - p1.x;
        const dyMouse = mouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 100) {
          p1.x -= (dxMouse / distMouse) * 0.5;
          p1.y -= (dyMouse / distMouse) * 0.5;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(66, 232, 245, ${0.15 * (1 - dist / 90)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 2. Central Quantum Nucleus
      const nucleusPulse = Math.sin(angle1 * 2) * 4;
      const nucleusRadius = 24 + nucleusPulse;

      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, nucleusRadius * 2);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, '#42E8F5');
      grad.addColorStop(0.7, '#8B5CF6');
      grad.addColorStop(1, 'rgba(139, 92, 246, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, nucleusRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, nucleusRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#42E8F5';
      ctx.shadowColor = '#42E8F5';
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // 3. Draw 3 Orbital Ellipses with 3D tilt
      const drawOrbital = (rx: number, ry: number, tilt: number, rotAngle: number, color: string, electronColor: string) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tilt);

        // Orbital ring
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Orbiting electron
        const ex = Math.cos(rotAngle) * rx;
        const ey = Math.sin(rotAngle) * ry;

        // Electron glow
        ctx.beginPath();
        ctx.arc(ex, ey, 6, 0, Math.PI * 2);
        ctx.fillStyle = electronColor;
        ctx.shadowColor = electronColor;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Small electron inner core
        ctx.beginPath();
        ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.restore();
      };

      const scale = Math.min(width, height) / 450;
      const rX = 140 * scale;
      const rY = 50 * scale;

      drawOrbital(rX, rY, Math.PI / 6, angle1, 'rgba(66, 232, 245, 0.45)', '#42E8F5');
      drawOrbital(rX, rY, -Math.PI / 6, angle2, 'rgba(139, 92, 246, 0.45)', '#8B5CF6');
      drawOrbital(rX, rY, Math.PI / 2, angle3, 'rgba(53, 208, 127, 0.45)', '#35D07F');

      angle1 += 0.022;
      angle2 += 0.028;
      angle3 += 0.019;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center w-full h-[380px] sm:h-[440px] md:h-[480px] overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-[#080B12]/80" />
    </div>
  );
};
