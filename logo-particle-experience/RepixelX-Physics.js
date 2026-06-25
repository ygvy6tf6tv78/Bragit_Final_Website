class RepixelXPhysics {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = {
      sources: options.sources || [],
      color: options.color || '#FFFFFF',
      gold: options.gold || '#E5B521',
      particleSize: options.particleSize || 1.5,
      mouseRadius: options.mouseRadius || 150,
      hoverForce: options.hoverForce || 2.2,
      magnetForce: options.magnetForce || 4.5,
      spring: options.spring || 0.07,
      friction: options.friction || 0.85,
    };
    this.mouse = { x: -1000, y: -1000, inside: false, down: false };
    this.particles = [];
    this.masks = [];
    this.scrollVelocity = 0;
    this.releaseBoost = 0;
    this.magnetPulse = 0;
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.startTime = performance.now();
    this.bindEvents();
    this.init();
  }

  async init() {
    const images = await Promise.all(this.options.sources.map((source) => this.loadImage(source.url)));
    this.masks = images.map((image, index) => this.extractMask(image, this.options.sources[index].background));
    this.resize();
    document.body.classList.add('ready');
    requestAnimationFrame((time) => this.animate(time));
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  extractMask(image, background) {
    const scale = Math.min(1, 920 / image.naturalWidth);
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const buffer = document.createElement('canvas');
    const context = buffer.getContext('2d', { willReadFrequently: true });
    buffer.width = width;
    buffer.height = height;
    context.drawImage(image, 0, 0, width, height);
    const data = context.getImageData(0, 0, width, height).data;
    const active = (index) => data[index + 3] > 55
      && (background === 'transparent' || Math.min(data[index], data[index + 1], data[index + 2]) < 238);
    const bounds = { minX: width, minY: height, maxX: 0, maxY: 0 };

    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        if (!active((y * width + x) * 4)) continue;
        bounds.minX = Math.min(bounds.minX, x);
        bounds.minY = Math.min(bounds.minY, y);
        bounds.maxX = Math.max(bounds.maxX, x);
        bounds.maxY = Math.max(bounds.maxY, y);
      }
    }
    return { data, width, bounds, active };
  }

  makeParticles(mask, box, logoIndex) {
    const { data, width, bounds, active } = mask;
    const sourceWidth = Math.max(1, bounds.maxX - bounds.minX);
    const sourceHeight = Math.max(1, bounds.maxY - bounds.minY);
    const scale = Math.min(box.width / sourceWidth, box.height / sourceHeight);
    
    // Original particle density
    const step = Math.max(2, Math.round(2.8 / scale));
    const particles = [];

    for (let y = bounds.minY; y <= bounds.maxY; y += step) {
      for (let x = bounds.minX; x <= bounds.maxX; x += step) {
        const index = (Math.round(y) * width + Math.round(x)) * 4;
        if (!active(index)) continue;
        
        const originX = box.x + (x - bounds.minX - sourceWidth / 2) * scale;
        const originY = box.y + (y - bounds.minY - sourceHeight / 2) * scale;
        const seed = ((x * 17 + y * 31 + logoIndex * 101) % 997) / 997;
        
        const isGold = logoIndex === 0 && data[index] > 145 && data[index + 1] > 90 && data[index + 2] < 90;

        particles.push({
          x: originX,
          y: originY,
          originX,
          originY,
          vx: 0,
          vy: 0,
          seed,
          phase: seed * Math.PI * 2,
          size: this.options.particleSize + seed * 1.15, // Original size
          ease: this.options.spring * (0.85 + seed * 0.3),
          friction: this.options.friction + seed * 0.035,
          color: isGold ? this.options.gold : this.options.color,
        });
      }
    }
    return particles;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cx = rect.width / 2;
    this.cy = rect.height / 2;
    if (!this.masks.length) return;

    const mobile = rect.width < 720;
    const logoWidth = mobile ? rect.width * 0.86 : Math.min(rect.width * 0.39, 610);
    const logoHeight = mobile ? rect.height * 0.22 : Math.min(rect.height * 0.31, 270);
    const boxes = mobile
      ? [
          { x: rect.width * 0.54, y: rect.height * 0.31, width: logoWidth, height: logoHeight },
          { x: rect.width * 0.46, y: rect.height * 0.69, width: logoWidth, height: logoHeight },
        ]
      : [
          { x: rect.width * 0.29, y: rect.height * 0.43, width: logoWidth, height: logoHeight },
          { x: rect.width * 0.71, y: rect.height * 0.57, width: logoWidth, height: logoHeight },
        ];
    this.particles = this.masks.flatMap((mask, index) => this.makeParticles(mask, boxes[index], index));
  }

  bindEvents() {
    addEventListener('resize', () => this.resize());
    addEventListener('pointermove', (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      this.mouse.inside = true;
    });
    addEventListener('pointerleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.inside = false;
      this.mouse.down = false;
    });
    addEventListener('pointerdown', (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      this.mouse.inside = true;
      this.mouse.down = true;
      this.releaseBoost = 0;
      this.magnetPulse = 1;
    });
    addEventListener('pointerup', () => {
      if (!this.mouse.down) return;
      this.mouse.down = false;
      this.releaseBoost = 1;
    });
    addEventListener('wheel', (event) => {
      const velocity = Math.max(-45, Math.min(45, event.deltaY * 0.16));
      this.scrollVelocity = velocity;
      for (const particle of this.particles) {
        particle.vy += velocity * (Math.random() * 1.5);
        particle.vx += (Math.random() - 0.5) * Math.abs(velocity) * 2.5;
      }
    }, { passive: true });
  }

  animate(time) {
    const elapsed = (time - this.startTime) / 1000;
    
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = 'rgba(3, 3, 5, 0.25)'; 
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.ctx.globalCompositeOperation = 'lighter';
    
    this.scrollVelocity *= 0.9;
    this.releaseBoost *= 0.965;
    this.magnetPulse *= 0.94;

    for (const particle of this.particles) {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.max(0.001, Math.hypot(dx, dy));

      if (!this.reducedMotion) {
        if (this.mouse.down) {
            // CLOUD GAPPING MAGNET WITH CRAZY SMOOTH ORBIT
            const targetX = this.mouse.x + Math.cos(particle.phase) * 80 * particle.seed;
            const targetY = this.mouse.y + Math.sin(particle.phase) * 80 * particle.seed;
            
            const mdx = targetX - particle.x;
            const mdy = targetY - particle.y;
            const mDist = Math.max(0.001, Math.hypot(mdx, mdy));

            const reach = Math.max(0.1, 1 - distance / Math.hypot(this.width, this.height));
            particle.vx += (mdx / mDist) * this.options.magnetForce * reach * 1.8;
            particle.vy += (mdy / mDist) * this.options.magnetForce * reach * 1.8;
            
            // Smooth crazy orbit (tangent vector)
            particle.vx += (mdy / mDist) * this.options.magnetForce * reach * 0.6;
            particle.vy -= (mdx / mDist) * this.options.magnetForce * reach * 0.6;

        } else if (distance < this.options.mouseRadius) {
            // HOVER FLUID REPEL
            const force = (this.options.mouseRadius - distance) / this.options.mouseRadius;
            particle.vx -= (dx / distance) * force * this.options.hoverForce * 2.5;
            particle.vy -= (dy / distance) * force * this.options.hoverForce * 2.5;
            
            // Add a fluid, organic swirl to the hover so it feels like moving through water!
            particle.vx += Math.sin(particle.phase + elapsed * 5) * force * 4.0;
            particle.vy += Math.cos(particle.phase + elapsed * 5) * force * 4.0;
        }
      }

      const spring = this.mouse.down ? particle.ease * 0.15 : particle.ease;
      particle.vx += (particle.originX - particle.x) * spring;
      particle.vy += (particle.originY - particle.y) * spring;
      
      particle.vx *= particle.friction;
      particle.vy *= particle.friction;
      
      particle.x += particle.vx;
      particle.y += particle.vy;

      const speed = Math.min(1, Math.hypot(particle.vx, particle.vy) / 10);
      
      // CLEAN DRAWING (Original particle thickness)
      this.ctx.fillStyle = particle.color;
      this.ctx.strokeStyle = particle.color;
      
      if (speed > 0.15 && particle.seed > 0.72) { // Original condition limits lines to fewer particles
        this.ctx.globalAlpha = speed * 0.8; 
        this.ctx.lineWidth = 0.7; // Original thinner line
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(particle.x - particle.vx * 2.2, particle.y - particle.vy * 2.2);
        this.ctx.stroke();
      }

      const size = particle.size + speed * 0.8; // Original smaller size
      
      // Solid core only
      this.ctx.globalAlpha = 1.0; 
      this.ctx.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);

      // Snap
      if (!this.mouse.down) {
        const homeDistance = Math.hypot(particle.originX - particle.x, particle.originY - particle.y);
        if (homeDistance < 0.08 && Math.hypot(particle.vx, particle.vy) < 0.08) {
          particle.x = particle.originX;
          particle.y = particle.originY;
          particle.vx = 0;
          particle.vy = 0;
        }
      }
    }

    this.ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame((nextTime) => this.animate(nextTime));
  }
}

window.RepixelXPhysics = RepixelXPhysics;
