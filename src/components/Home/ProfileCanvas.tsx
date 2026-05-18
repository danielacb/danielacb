import gsap from 'gsap';
import fx from 'glfx';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import type { GlfxCanvas, GlfxTexture } from 'glfx';
import { animateHome } from './animations';

export const ProfileCanvas = () => {
  const sourceRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const source = sourceRef.current;
    const container = containerRef.current;
    if (!source || !container) return;

    const ctx = source.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = '/profile-image.jpg';

    let glcanvas: GlfxCanvas | null = null;
    let texture: GlfxTexture | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let rafId = 0;

    const state = {
      w: 1,
      h: 1,
      hw: 0.5,
      hh: 0.5,
      radius: 0.75,
      mouseX: 0,
      mouseY: 0,
    };

    const animState = {
      opacity: 0,
      widthProgress: 0,
      heightProgress: 0,
      shadowBlur: 10,
    };

    const updateSize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);

      Object.assign(state, {
        w,
        h,
        hw: w / 2,
        hh: h / 2,
        radius: w * 0.75,
        mouseX: w / 2,
        mouseY: h / 2,
      });

      source.width = w;
      source.height = h;

      if (glcanvas) {
        glcanvas.width = w - 100;
        glcanvas.height = h - 100;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!glcanvas) return;

      const rect = glcanvas.getBoundingClientRect();
      const rw = rect.width || 1;
      const rh = rect.height || 1;

      state.mouseX = ((e.clientX - rect.left) / rw) * state.w;
      state.mouseY = ((e.clientY - rect.top) / rh) * state.h;
    };

    const drawProfileImage = () => {
      const { w, h } = state;

      const scale = Math.min(w / image.width, h / image.height) * 0.75;
      const dw = image.width * scale;
      const dh = image.height * scale;

      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.globalAlpha = animState.opacity;

      const maskW = dw * animState.widthProgress;
      const maskH = 2 + (dh - 2) * animState.heightProgress;

      const rectX = (w - maskW) / 2;
      const rectY = (h - maskH) / 2;

      ctx.beginPath();
      ctx.rect(rectX, rectY, maskW, maskH);
      ctx.clip();

      ctx.drawImage(image, dx, dy, dw, dh);
      ctx.restore();

      if (animState.opacity > 0) {
        ctx.save();
        ctx.globalAlpha = animState.opacity;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowColor = 'rgba(0, 0, 255, 1)';
        ctx.shadowBlur = animState.shadowBlur;
        ctx.fillRect(rectX, rectY, maskW, 2);
        ctx.fillRect(rectX, rectY + maskH - 2, maskW, 2);
        ctx.restore();
      }
    };

    const render = () => {
      if (!glcanvas || !texture) return;

      drawProfileImage();
      texture.loadContentsOf(source);

      const { hw, hh, radius, mouseX, mouseY } = state;

      glcanvas
        .draw(texture)
        .bulgePinch(hw, hh, radius, 0.2)
        .vignette(0.2, 0.74)
        .zoomBlur(mouseX, mouseY, 0.05)
        .update();

      rafId = requestAnimationFrame(render);
    };

    const init = () => {
      if (!image.complete || !image.naturalWidth) return;

      try {
        glcanvas = fx.canvas();
      } catch (err) {
        console.error('WebGL init failed:', err);
        return;
      }

      texture = glcanvas.texture(source);

      updateSize();

      resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(container);

      window.addEventListener('resize', updateSize);
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      container.insertBefore(glcanvas, source);
      source.style.display = 'none';

      render();

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(animState, {
        opacity: 1,
        widthProgress: 1,
        duration: 1,
        ease: 'power3.inOut',
      })
        .to(animState, {
          heightProgress: 1,
          duration: 1.2,
          ease: 'power3.inOut',
        })
        .to(animState, {
          shadowBlur: 20,
          duration: 1.5,
          ease: 'power2.out',
        });

      animateHome(tl);
    };

    if (image.complete) {
      init();
    } else {
      image.onload = init;
      image.onerror = () => console.error('Failed to load /profile-image.jpg');
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver?.disconnect();
      glcanvas?.remove();
    };
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      <canvas ref={sourceRef} style={{ display: 'none' }} />
    </div>
  );
};
