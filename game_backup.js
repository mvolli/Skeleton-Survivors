class SpriteAnimation {
    constructor(imagePath, frameWidth, frameHeight, frameCount, frameDuration = 100) {
        this.image = new Image();
        this.image.src = imagePath;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.frameDuration = frameDuration;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.loaded = false;
        
        this.image.onload = () => {
            this.loaded = true;
        };
    }
    
    update(deltaTime) {
        if (!this.loaded) return;
        
        this.frameTimer += deltaTime;
        if (this.frameTimer >= this.frameDuration) {
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            this.frameTimer = 0;
        }
    }
    
    render(ctx, x, y, scale = 1) {
        if (!this.loaded) return;
        
        const sourceX = this.currentFrame * this.frameWidth;
        const sourceY = 0;
        
        const drawWidth = this.frameWidth * scale;
        const drawHeight = this.frameHeight * scale;
        
        ctx.drawImage(
            this.image,
            sourceX, sourceY, this.frameWidth, this.frameHeight,
            x - drawWidth/2, y - drawHeight/2, drawWidth, drawHeight
        );
    }
}

class GifAnimation {
    constructor(imagePath, scale = 1.0) {
        this.image = new Image();
        this.image.src = imagePath;
        this.scale = scale;
        this.loaded = false;
        
        this.image.onload = () => {
            this.loaded = true;
        };
    }
    
    update(deltaTime) {
        // GIFs animate automatically, no manual frame management needed
    }
    
    render(ctx, x, y, scale = 1) {
        if (!this.loaded) return;
        
        const finalScale = this.scale * scale;
        const drawWidth = this.image.width * finalScale;
        const drawHeight = this.image.height * finalScale;
        
        ctx.drawImage(
            this.image,
            x - drawWidth/2, y - drawHeight/2, drawWidth, drawHeight
        );
    }
}

class AssetManager {
    constructor() {
        this.animations = {};
        this.loadAssets();
    }
    
    loadAssets() {
        // Skeleton animations (slowed down)
        this.animations.skeletonIdle = new SpriteAnimation('gfx/skeleton-idle.png', 48, 48, 6, 250);
        this.animations.skeletonWalk = new SpriteAnimation('gfx/skeleton-walk.png', 48, 48, 4, 200);
        
        // Zombie animations (7 frames idle, 4 frames walk)
        this.animations.zombieIdle = new SpriteAnimation('gfx/zombie-idle.png', 48, 48, 7, 300);
        this.animations.zombieWalk = new SpriteAnimation('gfx/zombie-walk.png', 48, 48, 4, 250);
        
        // Ghost animation for player (using GIF)
        this.animations.ghostIdle = new GifAnimation('gfx/FANTASMA_GIF.gif', 1.0);
    }
    
    getAnimation(name) {
        return this.animations[name];
    }
}

// Enhanced Dynamic Background System
class GothicBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.time = 0;
        
        // Multiple background layers for depth
        this.distantStars = [];
        this.stars = [];
        this.nearStars = [];
        this.nebula = [];
        this.gasGiants = [];
        this.spaceDebris = [];
        this.gridLines = [];
        this.particles = [];
        
        // Animation properties
        this.pulseIntensity = 0;
        this.gameIntensity = 0; // Increases with game progression
        this.warningIntensity = 0; // For boss warnings
        
        this.initializeDistantStars();
        this.initializeStars();
        this.initializeNearStars();
        this.initializeNebula();
        this.initializeGasGiants();
        this.initializeSpaceDebris();
        this.initializeGrid();
        this.initializeParticles();
    }
    
    initializeDistantStars() {
        // Very distant, small, slow-moving stars
        for (let i = 0; i < 300; i++) {
            this.distantStars.push({
                x: Math.random() * this.canvas.width * 6 - this.canvas.width * 2,
                y: Math.random() * this.canvas.height * 6 - this.canvas.height * 2,
                size: Math.random() * 1.5 + 0.5,
                brightness: Math.random() * 0.6 + 0.2,
                twinkleSpeed: Math.random() * 0.01 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2,
                color: Math.random() > 0.8 ? '#e8f4fd' : '#ffffff'
            });
        }
    }
    
    initializeStars() {
        for (let i = 0; i < 200; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width * 4 - this.canvas.width,
                y: Math.random() * this.canvas.height * 4 - this.canvas.height,
                size: Math.random() * 3 + 1,
                brightness: Math.random(),
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }
    
    initializeNearStars() {
        // Closer, larger, more prominent stars
        for (let i = 0; i < 50; i++) {
            this.nearStars.push({
                x: Math.random() * this.canvas.width * 3 - this.canvas.width * 0.5,
                y: Math.random() * this.canvas.height * 3 - this.canvas.height * 0.5,
                size: Math.random() * 4 + 2,
                brightness: Math.random() * 0.4 + 0.6,
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2,
                color: ['#ffffff', '#e8f4fd', '#fff2e6', '#ffe6f2', '#e6f9ff'][Math.floor(Math.random() * 5)],
                glowSize: Math.random() * 3 + 2
            });
        }
    }
    
    initializeNebula() {
        for (let i = 0; i < 8; i++) {
            this.nebula.push({
                x: Math.random() * this.canvas.width * 1.5,
                y: Math.random() * this.canvas.height * 1.5,
                size: Math.random() * 300 + 100,
                color: `hsl(${Math.random() * 60 + 220}, 60%, ${Math.random() * 20 + 10}%)`,
                drift: {
                    x: (Math.random() - 0.5) * 0.3,
                    y: (Math.random() - 0.5) * 0.3
                },
                pulseSpeed: Math.random() * 0.01 + 0.005,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }
    }
    
    initializeGasGiants() {
        // Smaller, subtle distant planetary bodies
        for (let i = 0; i < 2; i++) {
            this.gasGiants.push({
                x: Math.random() * this.canvas.width * 2 - this.canvas.width * 0.5,
                y: Math.random() * this.canvas.height * 2 - this.canvas.height * 0.5,
                size: Math.random() * 60 + 40, // Much smaller
                color: ['#1a237e', '#4a148c', '#b71c1c', '#1b5e20'][Math.floor(Math.random() * 4)],
                drift: {
                    x: (Math.random() - 0.5) * 0.05, // Slower drift
                    y: (Math.random() - 0.5) * 0.05
                },
                pulseSpeed: Math.random() * 0.002 + 0.001, // Much slower pulse
                pulseOffset: Math.random() * Math.PI * 2,
                hasRings: Math.random() > 0.8 // Fewer rings
            });
        }
    }
    
    initializeSpaceDebris() {
        // Floating debris and asteroids
        for (let i = 0; i < 15; i++) {
            this.spaceDebris.push({
                x: Math.random() * this.canvas.width * 3 - this.canvas.width,
                y: Math.random() * this.canvas.height * 3 - this.canvas.height,
                size: Math.random() * 8 + 3,
                drift: {
                    x: (Math.random() - 0.5) * 0.3,
                    y: (Math.random() - 0.5) * 0.3
                },
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                color: '#444444',
                shape: Math.floor(Math.random() * 3) // 0: circle, 1: square, 2: triangle
            });
        }
    }
    
    initializeGrid() {
        const gridSpacing = 80;
        for (let x = 0; x < this.canvas.width * 1.5; x += gridSpacing) {
            this.gridLines.push({
                type: 'vertical',
                pos: x,
                offset: Math.random() * Math.PI,
                wave: Math.random() * 10 + 5
            });
        }
        for (let y = 0; y < this.canvas.height * 1.5; y += gridSpacing) {
            this.gridLines.push({
                type: 'horizontal',
                pos: y,
                offset: Math.random() * Math.PI,
                wave: Math.random() * 10 + 5
            });
        }
    }
    
    initializeParticles() {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                life: Math.random(),
                maxLife: Math.random() * 3000 + 2000,
                color: Math.random() > 0.5 ? '#4ecdc4' : '#f39c12'
            });
        }
    }
    
    update(deltaTime, gameState = {}) {
        this.time += deltaTime;
        
        // Update game intensity based on level and time
        this.gameIntensity = Math.min((gameState.level || 1) * 0.1 + (gameState.gameTime || 0) / 120000, 2);
        
        // Update warning intensity for boss warnings
        if (gameState.bossWarning) {
            this.warningIntensity = Math.min(this.warningIntensity + deltaTime * 0.003, 1);
        } else {
            this.warningIntensity = Math.max(this.warningIntensity - deltaTime * 0.002, 0);
        }
        
        // Update nebula drift
        this.nebula.forEach(cloud => {
            cloud.x += cloud.drift.x * deltaTime * 0.01;
            cloud.y += cloud.drift.y * deltaTime * 0.01;
            
            // Wrap around
            if (cloud.x > this.canvas.width * 1.5) cloud.x = -cloud.size;
            if (cloud.x < -cloud.size) cloud.x = this.canvas.width * 1.5;
            if (cloud.y > this.canvas.height * 1.5) cloud.y = -cloud.size;
            if (cloud.y < -cloud.size) cloud.y = this.canvas.height * 1.5;
        });
        
        // Update gas giants
        this.gasGiants.forEach(giant => {
            giant.x += giant.drift.x * deltaTime * 0.001;
            giant.y += giant.drift.y * deltaTime * 0.001;
        });
        
        // Update space debris
        this.spaceDebris.forEach(debris => {
            debris.x += debris.drift.x * deltaTime * 0.01;
            debris.y += debris.drift.y * deltaTime * 0.01;
            debris.rotation += debris.rotationSpeed * deltaTime * 0.01;
            
            // Wrap around
            if (debris.x > this.canvas.width * 3) debris.x = -debris.size;
            if (debris.x < -debris.size) debris.x = this.canvas.width * 3;
            if (debris.y > this.canvas.height * 3) debris.y = -debris.size;
            if (debris.y < -debris.size) debris.y = this.canvas.height * 3;
        });
        
        // Update floating particles
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx * deltaTime * 0.1;
            particle.y += particle.vy * deltaTime * 0.1;
            particle.life += deltaTime;
            
            // Wrap particles around screen
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Reset particle if it lived too long
            if (particle.life > particle.maxLife) {
                particle.life = 0;
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
            }
        });
    }
    
    render(ctx, scroll = {x: 0, y: 0}) {
        const scrollX = scroll.x || 0;
        const scrollY = scroll.y || 0;
        
        // Save context
        ctx.save();
        
        // Enhanced gradient background with depth
        const baseIntensity = 0.1 + this.gameIntensity * 0.1;
        const warningRed = this.warningIntensity * 0.3;
        
        const gradient = ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height)
        );
        
        gradient.addColorStop(0, `rgba(${Math.floor(8 + warningRed * 50)}, ${Math.floor(12 + baseIntensity * 25)}, ${Math.floor(28 + baseIntensity * 15)}, 1)`);
        gradient.addColorStop(0.4, `rgba(${Math.floor(15 + warningRed * 60)}, ${Math.floor(20 + baseIntensity * 30)}, ${Math.floor(35 + baseIntensity * 20)}, 1)`);
        gradient.addColorStop(0.8, `rgba(${Math.floor(5 + warningRed * 40)}, ${Math.floor(8 + baseIntensity * 20)}, ${Math.floor(15 + baseIntensity * 10)}, 1)`);
        gradient.addColorStop(1, `rgba(${Math.floor(2 + warningRed * 30)}, ${Math.floor(4 + baseIntensity * 15)}, ${Math.floor(8 + baseIntensity * 8)}, 1)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 1. Render distant stars (deepest layer)
        ctx.globalAlpha = 0.6 + this.gameIntensity * 0.1;
        this.distantStars.forEach(star => {
            const x = star.x - scrollX * 0.01;
            const y = star.y - scrollY * 0.01;
            
            if (x < -20 || x > this.canvas.width + 20 || y < -20 || y > this.canvas.height + 20) return;
            
            const twinkle = 0.5 + 0.5 * (Math.sin(this.time * star.twinkleSpeed + star.twinkleOffset) + 1) / 2;
            const brightness = star.brightness * twinkle;
            
            ctx.globalAlpha = brightness * 0.4;
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(x, y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 2. Render gas giants (far background) - subtle and static
        ctx.globalAlpha = 0.15 + this.gameIntensity * 0.05;
        this.gasGiants.forEach(giant => {
            const x = giant.x - scrollX * 0.03;
            const y = giant.y - scrollY * 0.03;
            const pulse = 1 + Math.sin(this.time * giant.pulseSpeed + giant.pulseOffset) * 0.03; // Much smaller pulse
            const size = giant.size * pulse;
            
            // Main planet body
            const planetGradient = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size);
            planetGradient.addColorStop(0, giant.color.replace(')', ', 0.4)').replace('rgb', 'rgba'));
            planetGradient.addColorStop(0.7, giant.color.replace(')', ', 0.2)').replace('rgb', 'rgba'));
            planetGradient.addColorStop(1, giant.color.replace(')', ', 0.05)').replace('rgb', 'rgba'));
            
            ctx.fillStyle = planetGradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Planetary rings
            if (giant.hasRings) {
                ctx.globalAlpha = 0.2;
                ctx.strokeStyle = `rgba(200, 200, 200, 0.3)`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.ellipse(x, y, size * 1.4, size * 0.3, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse(x, y, size * 1.6, size * 0.35, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
        });
        
        // 4. Render nebula clouds with enhanced visuals
        ctx.globalAlpha = 0.4 + this.gameIntensity * 0.2;
        this.nebula.forEach(cloud => {
            const x = cloud.x - scrollX * 0.08;
            const y = cloud.y - scrollY * 0.08;
            const pulse = 1 + Math.sin(this.time * cloud.pulseSpeed + cloud.pulseOffset) * 0.3;
            const size = cloud.size * pulse;
            
            // Multiple nebula layers for depth
            for (let layer = 0; layer < 3; layer++) {
                const layerSize = size * (0.4 + layer * 0.3);
                const layerAlpha = 0.3 - layer * 0.1;
                
                const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, layerSize);
                nebulaGradient.addColorStop(0, cloud.color.replace(')', `, ${layerAlpha})`).replace('hsl', 'hsla'));
                nebulaGradient.addColorStop(0.6, cloud.color.replace(')', `, ${layerAlpha * 0.5})`).replace('hsl', 'hsla'));
                nebulaGradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = nebulaGradient;
                ctx.beginPath();
                ctx.arc(x + layer * 10, y + layer * 5, layerSize, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // 5. Render space debris
        ctx.globalAlpha = 0.6;
        this.spaceDebris.forEach(debris => {
            const x = debris.x - scrollX * 0.15;
            const y = debris.y - scrollY * 0.15;
            
            if (x < -20 || x > this.canvas.width + 20 || y < -20 || y > this.canvas.height + 20) return;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(debris.rotation);
            ctx.fillStyle = debris.color;
            
            switch(debris.shape) {
                case 0: // circle
                    ctx.beginPath();
                    ctx.arc(0, 0, debris.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 1: // square
                    ctx.fillRect(-debris.size/2, -debris.size/2, debris.size, debris.size);
                    break;
                case 2: // triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -debris.size);
                    ctx.lineTo(debris.size, debris.size);
                    ctx.lineTo(-debris.size, debris.size);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
            ctx.restore();
        });
        
        // 6. Render main stars with enhanced effects
        ctx.globalAlpha = 1;
        this.stars.forEach(star => {
            const x = star.x - scrollX * 0.05;
            const y = star.y - scrollY * 0.05;
            
            if (x < -50 || x > this.canvas.width + 50 || y < -50 || y > this.canvas.height + 50) return;
            
            const twinkle = 0.3 + 0.7 * (Math.sin(this.time * star.twinkleSpeed + star.twinkleOffset) + 1) / 2;
            const brightness = star.brightness * twinkle * (0.8 + this.gameIntensity * 0.2);
            
            ctx.globalAlpha = brightness;
            ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
            ctx.beginPath();
            ctx.arc(x, y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Enhanced star glow
            if (star.size > 2) {
                ctx.globalAlpha = brightness * 0.4;
                ctx.fillStyle = `rgba(78, 205, 196, ${brightness * 0.2})`;
                ctx.beginPath();
                ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // 7. Render near stars (closest layer)
        this.nearStars.forEach(star => {
            const x = star.x - scrollX * 0.1;
            const y = star.y - scrollY * 0.1;
            
            if (x < -100 || x > this.canvas.width + 100 || y < -100 || y > this.canvas.height + 100) return;
            
            const twinkle = 0.4 + 0.6 * (Math.sin(this.time * star.twinkleSpeed + star.twinkleOffset) + 1) / 2;
            const brightness = star.brightness * twinkle;
            
            // Main star
            ctx.globalAlpha = brightness;
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(x, y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Star glow effect
            ctx.globalAlpha = brightness * 0.3;
            const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, star.glowSize * 3);
            glowGradient.addColorStop(0, star.color.replace(')', ', 0.6)').replace('rgb', 'rgba'));
            glowGradient.addColorStop(0.5, star.color.replace(')', ', 0.2)').replace('rgb', 'rgba'));
            glowGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(x, y, star.glowSize * 3, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 8. Render animated grid (foreground)
        ctx.globalAlpha = 0.08 + this.gameIntensity * 0.03;
        ctx.strokeStyle = `rgba(78, 205, 196, ${0.2 + this.warningIntensity * 0.3})`;
        ctx.lineWidth = 1;
        
        const gridSpacing = 80;
        const startX = Math.floor((scrollX * 0.3) / gridSpacing) * gridSpacing - gridSpacing;
        const endX = startX + this.canvas.width + gridSpacing * 2;
        const startY = Math.floor((scrollY * 0.3) / gridSpacing) * gridSpacing - gridSpacing;
        const endY = startY + this.canvas.height + gridSpacing * 2;
        
        for (let x = startX; x <= endX; x += gridSpacing) {
            ctx.beginPath();
            const screenX = x - scrollX * 0.3;
            const wave = Math.sin(this.time * 0.001 + x * 0.01) * 3;
            ctx.moveTo(screenX + wave, 0);
            ctx.lineTo(screenX - wave, this.canvas.height);
            ctx.stroke();
        }
        
        for (let y = startY; y <= endY; y += gridSpacing) {
            ctx.beginPath();
            const screenY = y - scrollY * 0.3;
            const wave = Math.sin(this.time * 0.001 + y * 0.01) * 3;
            ctx.moveTo(0, screenY + wave);
            ctx.lineTo(this.canvas.width, screenY - wave);
            ctx.stroke();
        }
        
        // 9. Render floating particles (front layer)
        ctx.globalAlpha = 0.8;
        this.particles.forEach(particle => {
            const x = particle.x - scrollX * 0.02;
            const y = particle.y - scrollY * 0.02;
            const alpha = 1 - (particle.life / particle.maxLife);
            
            ctx.globalAlpha = alpha * 0.6;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Restore context
        ctx.restore();
    }
    
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Reinitialize all layers with new dimensions
        this.distantStars = [];
        this.stars = [];
        this.nearStars = [];
        this.nebula = [];
        this.gasGiants = [];
        this.spaceDebris = [];
        this.gridLines = [];
        this.particles = [];
        
        this.initializeDistantStars();
        this.initializeStars();
        this.initializeNearStars();
        this.initializeNebula();
        this.initializeGasGiants();
        this.initializeSpaceDebris();
        this.initializeGrid();
        this.initializeParticles();
    }
}

// Enhanced Particle Effects System
class EnhancedParticle {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.vx = options.vx || (Math.random() - 0.5) * 200;
        this.vy = options.vy || (Math.random() - 0.5) * 200;
        this.size = options.size || Math.random() * 4 + 2;
        this.life = 0;
        this.maxLife = options.maxLife || 1000 + Math.random() * 1000;
        this.color = options.color || '#4ecdc4';
        this.alpha = options.alpha || 1;
        this.gravity = options.gravity || 0;
        this.friction = options.friction || 0.98;
        this.type = options.type || 'circle';
        this.rotation = options.rotation || 0;
        this.angularVelocity = options.angularVelocity || 0;
        this.glow = options.glow || false;
        this.trail = options.trail || false;
        this.trailHistory = [];
    }
    
    update(deltaTime) {
        this.life += deltaTime;
        
        // Physics
        this.x += this.vx * deltaTime * 0.001;
        this.y += this.vy * deltaTime * 0.001;
        this.vy += this.gravity * deltaTime * 0.001;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.rotation += this.angularVelocity * deltaTime * 0.001;
        
        // Trail effect
        if (this.trail) {
            this.trailHistory.push({x: this.x, y: this.y, alpha: this.alpha});
            if (this.trailHistory.length > 5) this.trailHistory.shift();
        }
        
        // Fade out over time
        const lifeRatio = this.life / this.maxLife;
        this.alpha = Math.max(0, 1 - lifeRatio);
        
        return this.life < this.maxLife;
    }
    
    render(ctx) {
        ctx.save();
        
        // Draw trail first
        if (this.trail && this.trailHistory.length > 1) {
            ctx.globalAlpha = this.alpha * 0.3;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size * 0.5;
            ctx.beginPath();
            ctx.moveTo(this.trailHistory[0].x, this.trailHistory[0].y);
            for (let i = 1; i < this.trailHistory.length; i++) {
                ctx.lineTo(this.trailHistory[i].x, this.trailHistory[i].y);
            }
            ctx.stroke();
        }
        
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Glow effect
        if (this.glow) {
            ctx.shadowColor = this.color;
            ctx.shadowBlur = this.size * 2;
        }
        
        ctx.fillStyle = this.color;
        
        if (this.type === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'square') {
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        } else if (this.type === 'diamond') {
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size, 0);
            ctx.lineTo(0, this.size);
            ctx.lineTo(-this.size, 0);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    
    addExplosion(x, y, count = 10, options = {}) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const speed = 100 + Math.random() * 200;
            this.particles.push(new EnhancedParticle(x, y, {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: options.size || 3 + Math.random() * 4,
                color: options.color || '#ff6b6b',
                maxLife: options.maxLife || 800 + Math.random() * 400,
                friction: 0.95,
                glow: true,
                ...options
            }));
        }
    }
    
    addImpact(x, y, direction, options = {}) {
        const count = options.count || 6;
        for (let i = 0; i < count; i++) {
            const spreadAngle = direction + (Math.random() - 0.5) * Math.PI * 0.5;
            const speed = 80 + Math.random() * 120;
            this.particles.push(new EnhancedParticle(x, y, {
                vx: Math.cos(spreadAngle) * speed,
                vy: Math.sin(spreadAngle) * speed,
                size: 2 + Math.random() * 3,
                color: options.color || '#f39c12',
                maxLife: 600 + Math.random() * 300,
                type: Math.random() > 0.5 ? 'circle' : 'diamond',
                glow: true,
                ...options
            }));
        }
    }
    
    addHealEffect(x, y, options = {}) {
        for (let i = 0; i < 8; i++) {
            this.particles.push(new EnhancedParticle(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40, {
                vx: (Math.random() - 0.5) * 50,
                vy: -50 - Math.random() * 100,
                size: 3 + Math.random() * 3,
                color: '#27ae60',
                maxLife: 1200 + Math.random() * 600,
                gravity: -30,
                glow: true,
                type: 'circle',
                ...options
            }));
        }
    }
    
    addLevelUpEffect(x, y, options = {}) {
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 / 20) * i;
            const speed = 150 + Math.random() * 100;
            this.particles.push(new EnhancedParticle(x, y, {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 4 + Math.random() * 4,
                color: i % 2 === 0 ? '#f39c12' : '#4ecdc4',
                maxLife: 1500 + Math.random() * 500,
                friction: 0.96,
                glow: true,
                type: 'diamond',
                angularVelocity: (Math.random() - 0.5) * 10,
                ...options
            }));
        }
    }
    
    update(deltaTime) {
        this.particles = this.particles.filter(particle => particle.update(deltaTime));
    }
    
    render(ctx) {
        this.particles.forEach(particle => particle.render(ctx));
    }
    
    clear() {
        this.particles = [];
    }
}

// Screen Shake System
class ScreenShake {
    constructor() {
        this.intensity = 0;
        this.duration = 0;
        this.shakeX = 0;
        this.shakeY = 0;
    }
    
    shake(intensity = 10, duration = 300) {
        this.intensity = Math.max(this.intensity, intensity);
        this.duration = Math.max(this.duration, duration);
    }
    
    update(deltaTime) {
        if (this.duration > 0) {
            this.duration -= deltaTime;
            const currentIntensity = this.intensity * (this.duration / 300);
            this.shakeX = (Math.random() - 0.5) * currentIntensity;
            this.shakeY = (Math.random() - 0.5) * currentIntensity;
        } else {
            this.shakeX = 0;
            this.shakeY = 0;
            this.intensity = 0;
        }
    }
    
    apply(ctx) {
        ctx.translate(this.shakeX, this.shakeY);
    }
}


class Game {
    constructor(saveManager = null) {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.saveManager = saveManager;
        this.assets = new AssetManager();
        this.background = new GothicBackground(this.canvas);
        this.particleSystem = new ParticleSystem();
        this.screenShake = new ScreenShake();
        this.player = new Player(0, 0, this.assets, saveManager);
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
        this.items = [];
        
        this.gameTime = 0;
        this.score = 0;
        this.level = 1;
        this.experience = 0;
        this.experienceToNext = 100;
        this.diamonds = 0;
        this.isGameOver = false;
        this.isPaused = false;
        
        this.camera = { x: 0, y: 0 };
        this.scrollOffset = { x: 0, y: 0 }; // For background scrolling
        this.lastTime = 0;
        
        this.keys = {};
        this.powerups = new PowerupManager();
        
        this.enemySpawnTimer = 0;
        this.enemySpawnRate = 1200; // ms - easier start, was 800
        
        // Boss system
        this.bossSpawnTimer = 0;
        this.bossSpawnInterval = 120000; // Boss every 2 minutes
        this.currentBoss = null;
        this.bossWarning = null;
        this.bossWarningTimer = 0;
        
        // Zombie system - appears after 10 minutes
        this.zombieUnlockTime = 600000; // 10 minutes in milliseconds
        this.zombiesUnlocked = false;
        
        // Apply boss timer meta upgrade
        if (saveManager && saveManager.currentSlot) {
            const saveData = saveManager.getSaveData(saveManager.currentSlot);
            const metaUpgrades = saveData.metaUpgrades;
            this.bossSpawnInterval += metaUpgrades.bossTimer * 10000; // +10s per level
        }
        
        this.setupEventListeners();
        this.gameLoop();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            // Handle pause keys
            if (e.key.toLowerCase() === 'p' || e.key === 'Escape') {
                this.togglePause();
                e.preventDefault();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.background.resize(window.innerWidth, window.innerHeight);
        });
    }
    
    gameLoop() {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        if (!this.isGameOver && !this.isPaused) {
            this.update(deltaTime);
        }
        
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.showPauseMenu();
        } else {
            this.hidePauseMenu();
        }
    }
    
    showPauseMenu() {
        document.getElementById('pauseMenu').style.display = 'flex';
        this.updatePauseMenuContent();
    }
    
    updatePauseMenuContent() {
        // Update current stats
        document.getElementById('pauseLevel').textContent = this.level;
        document.getElementById('pauseScore').textContent = this.score.toLocaleString();
        
        // Format game time
        const totalSeconds = Math.floor(this.gameTime / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        document.getElementById('pauseTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update active powerups
        const activePowerupsDiv = document.getElementById('activePowerups');
        activePowerupsDiv.innerHTML = '';
        
        const powerupStats = {
            damage: this.player.damage > 1 ? `+${Math.round((this.player.damage - 1) * 100)}% Damage` : null,
            attackSpeed: this.player.attackSpeed > 1 ? `+${Math.round((this.player.attackSpeed - 1) * 100)}% Attack Speed` : null,
            moveSpeed: this.player.moveSpeed > 1 ? `+${Math.round((this.player.moveSpeed - 1) * 100)}% Move Speed` : null,
            maxHealth: this.player.maxHealth > 100 ? `${this.player.maxHealth} Max Health` : null,
            multishot: this.player.multishot > 0 ? `+${this.player.multishot} Multishot` : null,
            penetration: this.player.penetration > 0 ? `+${this.player.penetration} Penetration` : null,
            projectileSize: this.player.projectileSize > 1 ? `+${Math.round((this.player.projectileSize - 1) * 100)}% Projectile Size` : null,
            expMultiplier: this.player.expMultiplier > 1 ? `+${Math.round((this.player.expMultiplier - 1) * 100)}% XP Gain` : null,
            freezeChance: this.player.freezeChance > 0 ? `${Math.round(this.player.freezeChance * 100)}% Freeze Chance` : null,
            lifesteal: this.player.lifesteal > 0 ? `${Math.round(this.player.lifesteal * 100)}% Life Steal` : null,
            criticalHit: this.player.criticalHit > 0 ? `${Math.round(this.player.criticalHit * 100)}% Critical Hit` : null,
            reflect: this.player.reflect > 0 ? `${Math.round(this.player.reflect * 100)}% Reflect` : null
        };
        
        let hasActivePowerups = false;
        Object.entries(powerupStats).forEach(([key, value]) => {
            if (value) {
                hasActivePowerups = true;
                const powerupDiv = document.createElement('div');
                powerupDiv.className = 'powerup-item';
                powerupDiv.innerHTML = `
                    <h4>${key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                    <p>${value}</p>
                `;
                activePowerupsDiv.appendChild(powerupDiv);
            }
        });
        
        if (!hasActivePowerups) {
            activePowerupsDiv.innerHTML = '<p style="opacity: 0.6;">No active powerups</p>';
        }
        
        // Update weapons
        const weaponsDiv = document.getElementById('pauseWeapons');
        weaponsDiv.innerHTML = '';
        
        if (this.player.weapons && this.player.weapons.length > 0) {
            this.player.weapons.forEach(weapon => {
                const weaponDiv = document.createElement('div');
                weaponDiv.className = 'weapon-item';
                const weaponName = weapon.constructor.name.replace('Weapon', '');
                weaponDiv.innerHTML = `
                    <h4>${weaponName}</h4>
                    <p>Level: ${weapon.level || 1}</p>
                    <p>Damage: ${weapon.damage || weapon.baseDamage || 'N/A'}</p>
                `;
                weaponsDiv.appendChild(weaponDiv);
            });
        } else {
            weaponsDiv.innerHTML = '<p style="opacity: 0.6;">No weapons equipped</p>';
        }
    }
    
    hidePauseMenu() {
        document.getElementById('pauseMenu').style.display = 'none';
    }
    
    update(deltaTime) {
        this.gameTime += deltaTime;
        
        // Update dynamic background based on scroll offset
        this.background.update(deltaTime, {
            level: this.level,
            gameTime: this.gameTime,
            bossWarning: this.bossWarning,
            scrollX: this.scrollOffset.x,
            scrollY: this.scrollOffset.y
        });
        
        // Update enhanced particle system
        this.particleSystem.update(deltaTime);
        
        // Update screen shake
        this.screenShake.update(deltaTime);
        
        // Update player
        this.player.update(deltaTime, this.keys);
        
        // Update camera to follow player (center player on screen)
        this.camera.x = this.player.x - this.canvas.width / 2;
        this.camera.y = this.player.y - this.canvas.height / 2;
        
        // Update scroll offset for background parallax
        this.scrollOffset.x = this.camera.x;
        this.scrollOffset.y = this.camera.y;
        
        // Check if zombies should be unlocked (after 10 minutes)
        if (!this.zombiesUnlocked && this.gameTime >= this.zombieUnlockTime) {
            this.zombiesUnlocked = true;
            // Show zombie unlock notification (optional visual feedback)
            console.log('Zombies have awakened!');
        }
        
        // Spawn enemies
        this.enemySpawnTimer += deltaTime;
        if (this.enemySpawnTimer >= this.enemySpawnRate) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
            
            // Increase spawn rate over time - gentler progression for easier start
            this.enemySpawnRate = Math.max(200, this.enemySpawnRate - 5);
        }
        
        // Boss spawning system
        this.bossSpawnTimer += deltaTime;
        if (this.bossSpawnTimer >= this.bossSpawnInterval && !this.currentBoss && this.level >= 5) {
            this.triggerBossWarning();
            this.bossSpawnTimer = 0;
        }
        
        // Handle boss warning
        if (this.bossWarning) {
            this.bossWarningTimer += deltaTime;
            if (this.bossWarningTimer >= 3000) { // 3 second warning
                this.spawnBoss();
                this.bossWarning = null;
                this.bossWarningTimer = 0;
            }
        }
        
        // Update current boss
        if (this.currentBoss) {
            this.currentBoss.update(deltaTime, this.player);
            
            // Check boss collision with player
            if (this.checkCollision(this.currentBoss, this.player)) {
                this.player.takeDamage(40); // Bosses do significant damage
                // Don't kill boss on hit
            }
            
            // Check if boss is dead
            if (this.currentBoss.health <= 0) {
                this.score += this.currentBoss.scoreValue;
                this.experience += Math.floor(this.currentBoss.expValue * this.player.expMultiplier);
                this.createDeathParticles(this.currentBoss.x, this.currentBoss.y);
                
                // Guaranteed diamond rewards for boss defeats - make them feel earned!
                const diamondReward = this.currentBoss instanceof GiantBoss ? 5 : 3; // Giant boss gives 5, regular boss gives 3
                for (let i = 0; i < diamondReward; i++) {
                    // Spread diamonds around the boss position
                    const offsetX = (Math.random() - 0.5) * 80;
                    const offsetY = (Math.random() - 0.5) * 80;
                    this.items.push(new DiamondPickup(this.currentBoss.x + offsetX, this.currentBoss.y + offsetY));
                }
                
                this.currentBoss = null;
                
                // Reset boss timer when boss is defeated
                this.bossSpawnTimer = 0;
            }
        }
        
        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime, this.player);
            
            // Check collision with player
            if (this.checkCollision(enemy, this.player)) {
                // Different enemy types do different damage
                let damage = 20; // Basic skeleton damage
                if (enemy instanceof FastSkeletonEnemy) {
                    damage = 15; // Fast enemies do less damage but are harder to avoid
                } else if (enemy instanceof TankSkeletonEnemy) {
                    damage = 35; // Tank enemies do much more damage
                }
                
                this.player.takeDamage(damage);
                enemy.health = 0; // Kill enemy on hit
            }
        });
        
        // Update projectiles
        this.projectiles.forEach(projectile => {
            projectile.update(deltaTime);
            
            // Only check collision with enemies for player projectiles (not enemy projectiles)
            if (!projectile.isEnemyProjectile) {
                this.enemies.forEach(enemy => {
                if (this.checkCollision(projectile, enemy)) {
                    // Use new penetration system
                    if (projectile.hitEnemy && projectile.hitEnemy(enemy)) {
                        enemy.takeDamage(projectile.damage);
                        
                        // Handle fireball explosion
                        if (projectile instanceof FireballProjectile) {
                            projectile.explode(this.enemies);
                            projectile.active = false; // Fireballs always explode on first hit
                        }
                        
                        // Create hit particles
                        this.createHitParticles(enemy.x, enemy.y);
                        
                        // Handle multishot splitting
                        this.handleMultishotSplit(projectile, enemy.x, enemy.y);
                    } else if (!projectile.hitEnemy) {
                        // Fallback for projectiles without penetration system
                        enemy.takeDamage(projectile.damage);
                        projectile.active = false;
                        this.createHitParticles(enemy.x, enemy.y);
                        
                        // Handle multishot splitting (fallback path)
                        this.handleMultishotSplit(projectile, enemy.x, enemy.y);
                    }
                }
                });
            }
            
            // Check collision with boss (only for player projectiles)
            if (!projectile.isEnemyProjectile && this.currentBoss && this.checkCollision(projectile, this.currentBoss)) {
                // Use new penetration system
                if (projectile.hitEnemy && projectile.hitEnemy(this.currentBoss)) {
                    this.currentBoss.takeDamage(projectile.damage);
                    
                    // Handle fireball explosion
                    if (projectile instanceof FireballProjectile) {
                        // Include boss in explosion targets
                        const allTargets = [...this.enemies];
                        if (this.currentBoss) allTargets.push(this.currentBoss);
                        projectile.explode(allTargets);
                        projectile.active = false;
                    }
                    
                    // Create hit particles
                    this.createHitParticles(this.currentBoss.x, this.currentBoss.y);
                    
                    // Handle multishot splitting
                    this.handleMultishotSplit(projectile, this.currentBoss.x, this.currentBoss.y);
                } else if (!projectile.hitEnemy) {
                    // Fallback for projectiles without penetration system
                    this.currentBoss.takeDamage(projectile.damage);
                    projectile.active = false;
                    this.createHitParticles(this.currentBoss.x, this.currentBoss.y);
                    
                    // Handle multishot splitting (fallback path)
                    this.handleMultishotSplit(projectile, this.currentBoss.x, this.currentBoss.y);
                }
            }
        });
        
        // Update particles
        this.particles.forEach(particle => {
            particle.update(deltaTime);
        });
        
        // Update items
        this.items.forEach(item => {
            item.update(deltaTime);
            
            // Check collision with player
            if (this.checkCollision(item, this.player)) {
                this.collectItem(item);
                item.active = false;
            }
        });
        
        // Clean up inactive objects
        this.enemies = this.enemies.filter(enemy => {
            if (enemy.health <= 0) {
                this.score += enemy.scoreValue;
                this.experience += Math.floor(enemy.expValue * this.player.expMultiplier);
                
                // Chance to drop items (affected by luck)
                const luckBonus = this.player.luck;
                const dropRoll = Math.random();
                const expChance = 0.15 + luckBonus * 0.05;
                const healthChance = expChance + 0.015 + luckBonus * 0.01; // Much rarer health (was 0.05)
                const diamondChance = healthChance + 0.01 + luckBonus * 0.01; // Much rarer diamonds
                
                if (dropRoll < expChance) {
                    this.items.push(new ExperienceOrb(enemy.x, enemy.y));
                } else if (dropRoll < healthChance) {
                    this.items.push(new HealthPickup(enemy.x, enemy.y));
                } else if (dropRoll < diamondChance) {
                    this.items.push(new DiamondPickup(enemy.x, enemy.y));
                }
                
                this.createDeathParticles(enemy.x, enemy.y);
                return false;
            }
            return true;
        });
        
        this.projectiles = this.projectiles.filter(p => p.active);
        this.particles = this.particles.filter(p => p.active);
        this.items = this.items.filter(i => i.active);
        
        // Auto-fire weapons
        const allTargets = [...this.enemies];
        if (this.currentBoss) allTargets.push(this.currentBoss);
        
        this.player.weapons.forEach(weapon => {
            weapon.update(deltaTime, allTargets, this.projectiles, this.player);
        });
        
        // Check for level up
        if (this.experience >= this.experienceToNext) {
            this.levelUp();
        }
        
        // Check game over
        if (this.player.health <= 0) {
            this.gameOver();
        }
        
        // Update UI
        this.updateUI();
    }
    
    render() {
        // Clear canvas completely first
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Apply screen shake
        this.ctx.save();
        this.screenShake.apply(this.ctx);
        
        // Render dynamic background based on scroll offset (before camera transform)
        this.background.render(this.ctx, {x: this.scrollOffset.x, y: this.scrollOffset.y});
        
        // Apply camera transform for world objects
        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);
        
        // Draw world-aligned grid
        this.drawBackground();
        
        // Draw game objects
        this.particles.forEach(particle => particle.render(this.ctx));
        this.particleSystem.render(this.ctx);
        this.items.forEach(item => item.render(this.ctx));
        this.enemies.forEach(enemy => enemy.render(this.ctx));
        
        // Draw boss
        if (this.currentBoss) {
            this.currentBoss.render(this.ctx);
        }
        
        this.projectiles.forEach(projectile => projectile.render(this.ctx));
        
        // Draw sword slashes
        this.player.weapons.forEach(weapon => {
            if (weapon.render) {
                weapon.render(this.ctx);
            }
        });
        
        this.player.render(this.ctx);
        
        // Restore camera transform
        this.ctx.restore();
        
        // Draw UI elements
        this.renderBossWarning();
        this.renderBossIndicator();
        
        // Restore screen shake context
        this.ctx.restore();
    }
    
    // Enhanced Visual Effects Triggers
    triggerEnemyDeathEffect(x, y) {
        this.particleSystem.addExplosion(x, y, 8, {
            color: '#ff6b6b',
            size: 3,
            maxLife: 600
        });
        this.screenShake.shake(3, 150);
    }
    
    triggerBossDeathEffect(x, y) {
        this.particleSystem.addExplosion(x, y, 25, {
            color: '#ff6b6b',
            size: 6,
            maxLife: 1200
        });
        this.screenShake.shake(15, 800);
    }
    
    triggerPlayerHitEffect(x, y) {
        this.particleSystem.addImpact(x, y, 0, {
            color: '#e74c3c',
            count: 4
        });
        this.screenShake.shake(8, 200);
    }
    
    triggerLevelUpEffect(x, y) {
        this.particleSystem.addLevelUpEffect(x, y);
        this.screenShake.shake(5, 300);
    }
    
    triggerHealEffect(x, y) {
        this.particleSystem.addHealEffect(x, y);
    }
    
    triggerProjectileImpact(x, y, direction) {
        this.particleSystem.addImpact(x, y, direction, {
            color: '#f39c12',
            count: 3,
            size: 2
        });
    }
    
    
    drawBackground() {
        const gridSize = 50;
        const startX = Math.floor(this.camera.x / gridSize) * gridSize;
        const startY = Math.floor(this.camera.y / gridSize) * gridSize;
        
        this.ctx.strokeStyle = 'rgba(26, 26, 46, 0.4)';
        this.ctx.lineWidth = 1;
        
        for (let x = startX; x < this.camera.x + this.canvas.width + gridSize; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x - this.camera.x, 0);
            this.ctx.lineTo(x - this.camera.x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = startY; y < this.camera.y + this.canvas.height + gridSize; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y - this.camera.y);
            this.ctx.lineTo(this.canvas.width, y - this.camera.y);
            this.ctx.stroke();
        }
    }
    
    renderBossWarning() {
        if (!this.bossWarning) return;
        
        this.bossWarning.pulse += 0.1;
        const alpha = 0.8 + Math.sin(this.bossWarning.pulse * 6) * 0.2;
        
        this.ctx.save();
        this.ctx.fillStyle = this.bossWarning.color;
        this.ctx.globalAlpha = alpha;
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 4;
        
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2 - 100;
        
        this.ctx.strokeText(this.bossWarning.text, x, y);
        this.ctx.fillText(this.bossWarning.text, x, y);
        
        this.ctx.restore();
    }
    
    renderBossIndicator() {
        if (!this.currentBoss) return;
        
        // Calculate boss position relative to screen
        const bossScreenX = this.currentBoss.x - this.camera.x;
        const bossScreenY = this.currentBoss.y - this.camera.y;
        
        // Check if boss is off-screen
        const margin = 100;
        const isOffScreen = bossScreenX < -margin || bossScreenX > this.canvas.width + margin ||
                           bossScreenY < -margin || bossScreenY > this.canvas.height + margin;
        
        if (isOffScreen) {
            // Calculate direction arrow
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            
            const dx = this.currentBoss.x - this.player.x;
            const dy = this.currentBoss.y - this.player.y;
            const angle = Math.atan2(dy, dx);
            
            // Position arrow at edge of screen
            const arrowDistance = Math.min(this.canvas.width, this.canvas.height) * 0.4;
            const arrowX = centerX + Math.cos(angle) * arrowDistance;
            const arrowY = centerY + Math.sin(angle) * arrowDistance;
            
            this.ctx.save();
            this.ctx.translate(arrowX, arrowY);
            this.ctx.rotate(angle);
            
            // Draw boss indicator arrow
            this.ctx.fillStyle = '#ff0000';
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 3;
            
            this.ctx.beginPath();
            this.ctx.moveTo(20, 0);
            this.ctx.lineTo(-10, -15);
            this.ctx.lineTo(-5, 0);
            this.ctx.lineTo(-10, 15);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            
            // Boss indicator text
            this.ctx.rotate(-angle);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('BOSS', 0, -25);
            
            this.ctx.restore();
        }
    }
    
    spawnEnemy() {
        const spawnDistance = 600;
        const angle = Math.random() * Math.PI * 2;
        const x = this.player.x + Math.cos(angle) * spawnDistance;
        const y = this.player.y + Math.sin(angle) * spawnDistance;
        
        // Enemy types based on zombie unlock status
        let enemyTypes = [BasicSkeletonEnemy, FastSkeletonEnemy, TankSkeletonEnemy];
        
        if (this.zombiesUnlocked) {
            // Add zombie types after 10 minutes - they can spawn alongside skeletons
            enemyTypes = enemyTypes.concat([BasicZombieEnemy, FastZombieEnemy, TankZombieEnemy, RangedZombieEnemy]);
        }
        
        const EnemyClass = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        const enemy = new EnemyClass(x, y, this.assets);
        
        // Scale enemy health from level 10 onwards
        if (this.level >= 10) {
            const healthMultiplier = 1 + (this.level - 9) * 0.15; // +15% health per level after 10
            enemy.health = Math.floor(enemy.health * healthMultiplier);
            enemy.maxHealth = enemy.health;
        }
        
        this.enemies.push(enemy);
    }
    
    triggerBossWarning() {
        this.bossWarning = {
            text: "⚠️ BOSS APPROACHING ⚠️",
            color: '#ff0000',
            pulse: 0
        };
    }
    
    spawnBoss() {
        const spawnDistance = 800;
        const angle = Math.random() * Math.PI * 2;
        const x = this.player.x + Math.cos(angle) * spawnDistance;
        const y = this.player.y + Math.sin(angle) * spawnDistance;
        
        // Choose boss type based on level and zombie unlock status
        let BossClass;
        
        if (this.zombiesUnlocked) {
            // After 10 minutes, use zombie bosses
            const bossTypes = [ZombieBoss, ZombieKing];
            BossClass = this.level < 20 ? ZombieBoss : 
                        bossTypes[Math.floor(Math.random() * bossTypes.length)];
        } else {
            // Before 10 minutes, use skeleton bosses
            const bossTypes = [SkeletonBoss, GiantBoss];
            BossClass = this.level < 15 ? SkeletonBoss : 
                        bossTypes[Math.floor(Math.random() * bossTypes.length)];
        }
        
        this.currentBoss = new BossClass(x, y, this.assets);
        
        // Scale boss health with level
        if (this.level >= 10) {
            const healthMultiplier = 1 + (this.level - 9) * 0.2; // +20% health per level after 10
            this.currentBoss.health = Math.floor(this.currentBoss.health * healthMultiplier);
            this.currentBoss.maxHealth = this.currentBoss.health;
        }
    }
    
    checkCollision(obj1, obj2) {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (obj1.radius + obj2.radius);
    }
    
    createHitParticles(x, y) {
        for (let i = 0; i < 5; i++) {
            this.particles.push(new HitParticle(x, y));
        }
    }
    
    handleMultishotSplit(projectile, hitX, hitY) {
        // Multishot now handled at firing time with angular spread - disable bullet splitting
        return;
        
        // Create split projectiles
        for (let i = 0; i < totalSplits; i++) {
            // Calculate spread angles (45 degrees apart)
            const baseAngle = Math.atan2(projectile.vy, projectile.vx);
            const spreadAngle = (Math.PI / 4) * (i - (totalSplits - 1) / 2); // Spread around original direction
            const newAngle = baseAngle + spreadAngle;
            
            // Reduce damage and size for split bullets
            const splitDamage = Math.max(1, Math.floor(projectile.damage * 0.7));
            const splitSize = Math.max(0.5, (projectile.sizeMultiplier || 1.0) * 0.8);
            
            // Calculate remaining penetration
            const remainingPenetration = Math.max(0, projectile.penetration - projectile.enemiesHit.length);
            
            // Create new projectile with same speed
            const speed = Math.sqrt(projectile.vx * projectile.vx + projectile.vy * projectile.vy);
            const splitVx = Math.cos(newAngle) * speed;
            const splitVy = Math.sin(newAngle) * speed;
            
            // Create the split projectile
            const splitProjectile = new Projectile(
                hitX, hitY, 
                splitVx, splitVy, 
                splitDamage, 
                remainingPenetration, 
                splitSize
            );
            
            // Copy enemies already hit to prevent double-hitting
            splitProjectile.enemiesHit = [...projectile.enemiesHit];
            
            // Add visual effect for split bullets
            splitProjectile.isSplit = true;
            
            this.projectiles.push(splitProjectile);
        }
    }
    
    createDeathParticles(x, y) {
        for (let i = 0; i < 10; i++) {
            this.particles.push(new DeathParticle(x, y));
        }
    }
    
    collectItem(item) {
        if (item instanceof ExperienceOrb) {
            this.experience += Math.floor(item.value * this.player.expMultiplier);
        } else if (item instanceof HealthPickup) {
            this.player.health = Math.min(this.player.health + item.value, this.player.maxHealth);
        } else if (item instanceof DiamondPickup) {
            if (!this.diamonds) this.diamonds = 0;
            this.diamonds += item.value;
        }
    }
    
    levelUp() {
        this.level++;
        this.experience -= this.experienceToNext;
        this.experienceToNext = Math.floor(this.experienceToNext * 1.2);
        
        this.isPaused = true;
        this.showLevelUpScreen();
    }
    
    showLevelUpScreen() {
        const levelUpDiv = document.getElementById('levelUp');
        const optionsDiv = document.getElementById('powerupOptions');
        
        optionsDiv.innerHTML = '';
        
        const availablePowerups = this.powerups.getRandomPowerups(3, this.player);
        
        availablePowerups.forEach((powerup, index) => {
            const option = document.createElement('div');
            option.className = 'powerup-option';
            option.innerHTML = `
                <div class="powerup-title">${powerup.name}</div>
                <div class="powerup-desc">${powerup.description}</div>
            `;
            
            option.addEventListener('click', () => {
                this.powerups.applyPowerup(powerup, this.player);
                this.isPaused = false;
                levelUpDiv.style.display = 'none';
            });
            
            optionsDiv.appendChild(option);
        });
        
        levelUpDiv.style.display = 'block';
    }
    
    gameOver() {
        this.isGameOver = true;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalTime').textContent = this.formatTime(this.gameTime);
        document.getElementById('gameOver').style.display = 'block';
    }
    
    updateUI() {
        document.getElementById('level').textContent = this.level;
        document.getElementById('score').textContent = this.score;
        document.getElementById('time').textContent = this.formatTime(this.gameTime);
        document.getElementById('enemyCount').textContent = this.enemies.length;
        document.getElementById('diamonds').textContent = this.diamonds;
        
        const healthPercent = (this.player.health / this.player.maxHealth) * 100;
        document.getElementById('healthFill').style.width = healthPercent + '%';
        
        const expPercent = (this.experience / this.experienceToNext) * 100;
        document.getElementById('expFill').style.width = expPercent + '%';
        
        this.updateWeaponHUD();
    }
    
    updateWeaponHUD() {
        const weaponInventory = document.getElementById('weaponInventory');
        const hasWeapons = this.player.weapons && this.player.weapons.length > 0;
        
        if (!hasWeapons) {
            weaponInventory.style.display = 'none';
            return;
        }
        
        weaponInventory.style.display = 'flex';
        weaponInventory.innerHTML = '';
        
        this.player.weapons.forEach((weapon, index) => {
            const weaponSlot = document.createElement('div');
            weaponSlot.className = 'weapon-slot';
            
            const status = weapon.getStatus ? weapon.getStatus(this.player) : { state: 'ready', timeLeft: 0 };
            weaponSlot.classList.add(status.state);
            
            const weaponIcon = this.getWeaponIcon(weapon.name);
            const weaponLevel = weapon.level || 1;
            
            // Calculate cooldown progress for circular overlay
            const cooldownProgress = status.state === 'cooldown' && status.maxCooldown ? 
                ((status.maxCooldown - status.timeLeft) / status.maxCooldown) * 100 : 0;
            
            weaponSlot.innerHTML = `
                <div class="weapon-cooldown-overlay" style="--progress: ${cooldownProgress}%"></div>
                <div class="weapon-icon">${weaponIcon}</div>
                <div class="weapon-name">${weapon.name}</div>
                <div class="weapon-level">Lv.${weaponLevel}</div>
            `;
            
            weaponInventory.appendChild(weaponSlot);
        });
    }
    
    getWeaponIcon(weaponName) {
        const icons = {
            'Basic Gun': '🔫',
            'Laser': '⚡',
            'Sword': '⚔️',
            'Fireball': '🔥',
            'Magic Missile': '🌟',
            'Lightning': '⚡',
            'Ice Shard': '❄️',
            'Poison Dart': '🏹'
        };
        return icons[weaponName] || '🔫';
    }
    
    formatWeaponTimer(timeMs) {
        if (timeMs <= 0) return '';
        const seconds = Math.ceil(timeMs / 1000);
        return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

class Player {
    constructor(x, y, assets, saveManager = null) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.speed = 200;
        this.health = 100;
        this.maxHealth = 100;
        this.weapons = [new BasicWeapon()];
        this.scale = 1.0;
        
        // Stats
        this.damage = 1;
        this.attackSpeed = 1;
        this.moveSpeed = 1;
        this.luck = 0;
        this.pickup = 1;
        this.penetration = 0; // How many enemies projectiles can penetrate through
        this.projectileSize = 1.0; // Multiplier for projectile size (1.0 = normal size)
        this.expMultiplier = 1.0; // Multiplier for experience gain (1.0 = normal XP)
        this.multishot = 0; // Number of bullets that split on hit
        this.freezeChance = 0; // Chance to freeze enemies
        this.lifesteal = 0; // Life steal amount
        this.criticalHit = 0; // Critical hit chance
        this.reflect = 0; // Reflect chance
        
        // Invincibility frames
        this.invincible = false;
        this.invincibilityDuration = 1000; // 1 second of invincibility
        this.invincibilityTimer = 0;
        
        // Apply meta upgrades from current slot
        if (saveManager && saveManager.currentSlot) {
            const saveData = saveManager.getSaveData(saveManager.currentSlot);
            const metaUpgrades = saveData.metaUpgrades;
            
            // Basic stat upgrades
            this.maxHealth += metaUpgrades.health * 25;
            this.health = this.maxHealth;
            this.damage += metaUpgrades.damage * 0.2;
            this.moveSpeed += metaUpgrades.speed * 0.1;
            this.luck += metaUpgrades.luck * 0.1;
            
            // New meta upgrades
            this.attackSpeed += metaUpgrades.attackSpeed * 0.15;
            this.penetration += metaUpgrades.penetration;
            this.multishot += metaUpgrades.multishot;
            this.expMultiplier += metaUpgrades.xpBoost * 0.25;
            this.invincibilityDuration += metaUpgrades.invincibility * 500; // +0.5s per level
            this.pickup += metaUpgrades.pickupRange * 0.2; // +20% pickup range per level
            this.projectileSize += metaUpgrades.projectileSize * 0.15; // +15% size per level
            
            // Apply damage bonus to starting weapon
            this.weapons[0].damage += metaUpgrades.damage * 5;
        }
        
        // Animation
        this.ghostAnimation = assets.getAnimation('ghostIdle');
    }
    
    update(deltaTime, keys) {
        const dt = deltaTime / 1000;
        
        // Movement
        let dx = 0;
        let dy = 0;
        
        if (keys['w'] || keys['arrowup']) dy -= 1;
        if (keys['s'] || keys['arrowdown']) dy += 1;
        if (keys['a'] || keys['arrowleft']) dx -= 1;
        if (keys['d'] || keys['arrowright']) dx += 1;
        
        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            dx *= 0.707;
            dy *= 0.707;
        }
        
        // Apply movement directly (unlimited movement)
        this.x += dx * this.speed * this.moveSpeed * dt;
        this.y += dy * this.speed * this.moveSpeed * dt;
        
        // Update ghost animation
        if (this.ghostAnimation) {
            this.ghostAnimation.update(deltaTime);
        }
        
        // Update invincibility frames
        if (this.invincible) {
            this.invincibilityTimer += deltaTime;
            if (this.invincibilityTimer >= this.invincibilityDuration) {
                this.invincible = false;
                this.invincibilityTimer = 0;
            }
        }
    }
    
    takeDamage(amount) {
        if (this.invincible) return; // No damage during invincibility frames
        
        this.health = Math.max(0, this.health - amount);
        
        // Start invincibility frames
        this.invincible = true;
        this.invincibilityTimer = 0;
    }
    
    render(ctx) {
        ctx.save();
        
        // Flash during invincibility
        if (this.invincible) {
            const flashRate = 200; // Flash every 200ms
            const shouldFlash = Math.floor(this.invincibilityTimer / flashRate) % 2 === 0;
            if (shouldFlash) {
                ctx.globalAlpha = 0.5;
            }
        }
        
        // Draw ghost sprite
        if (this.ghostAnimation) {
            this.ghostAnimation.render(ctx, this.x, this.y, this.scale);
        } else {
            // Fallback circle if sprite not loaded
            ctx.fillStyle = '#4ecdc4';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw health bar
        const barWidth = 50;
        const barHeight = 6;
        const healthPercent = this.health / this.maxHealth;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 20, barWidth, barHeight);
        
        ctx.fillStyle = '#4ecdc4';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 20, barWidth * healthPercent, barHeight);
        
        // Health bar border
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - barWidth/2, this.y - this.radius - 20, barWidth, barHeight);
        
        ctx.restore();
    }
}

class BasicSkeletonEnemy {
    constructor(x, y, assets) {
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.speed = 50;
        this.health = 60;
        this.maxHealth = 60;
        this.scoreValue = 10;
        this.expValue = 8; // Reduced from 15 for better balance
        this.scale = 1.2;
        this.isMoving = false;
        this.lastX = x;
        this.lastY = y;
        
        // Get animations from asset manager
        this.idleAnimation = assets.getAnimation('skeletonIdle');
        this.walkAnimation = assets.getAnimation('skeletonWalk');
        this.currentAnimation = this.idleAnimation;
    }
    
    update(deltaTime, player) {
        const dt = deltaTime / 1000;
        
        // Store previous position to detect movement
        this.lastX = this.x;
        this.lastY = this.y;
        
        // Move towards player
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            this.x += (dx / distance) * this.speed * dt;
            this.y += (dy / distance) * this.speed * dt;
        }
        
        // Determine if moving and set appropriate animation
        const moved = Math.abs(this.x - this.lastX) > 0.1 || Math.abs(this.y - this.lastY) > 0.1;
        this.isMoving = moved;
        
        if (this.isMoving) {
            this.currentAnimation = this.walkAnimation;
        } else {
            this.currentAnimation = this.idleAnimation;
        }
        
        // Update current animation
        if (this.currentAnimation) {
            this.currentAnimation.update(deltaTime);
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
    }
    
    render(ctx) {
        ctx.save();
        
        // Render skeleton sprite
        if (this.currentAnimation) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
        } else {
            // Fallback circle if sprites not loaded
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Health bar
        if (this.health < this.maxHealth) {
            const barWidth = 35;
            const barHeight = 4;
            const healthPercent = this.health / this.maxHealth;
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 15, barWidth, barHeight);
            
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 15, barWidth * healthPercent, barHeight);
            
            // Health bar border
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x - barWidth/2, this.y - this.radius - 15, barWidth, barHeight);
        }
        
        ctx.restore();
    }
}

class FastSkeletonEnemy extends BasicSkeletonEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.speed = 100;
        this.health = 40;
        this.maxHealth = 40;
        this.radius = 22;
        this.scoreValue = 15;
        this.expValue = 6; // Reduced from 12 for better balance
        this.scale = 1.0; // Fast but normal size
    }
}

class TankSkeletonEnemy extends BasicSkeletonEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.speed = 25;
        this.health = 120;
        this.maxHealth = 120;
        this.radius = 35;
        this.scoreValue = 30;
        this.expValue = 15; // Reduced from 25 for better balance
        this.scale = 1.6; // Much bigger and slower
    }
    
    render(ctx) {
        ctx.save();
        
        // Add red tint for tank enemy
        ctx.globalCompositeOperation = 'source-over';
        
        // Render skeleton sprite
        if (this.currentAnimation) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
            
            // Add purple overlay for tank variant
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = 'rgba(139, 69, 173, 0.3)'; // Purple tint
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        } else {
            // Fallback circle if sprites not loaded
            ctx.fillStyle = '#8e44ad';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Health bar
        if (this.health < this.maxHealth) {
            const barWidth = 40;
            const barHeight = 6;
            const healthPercent = this.health / this.maxHealth;
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 20, barWidth, barHeight);
            
            ctx.fillStyle = '#8e44ad';
            ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 20, barWidth * healthPercent, barHeight);
            
            // Health bar border
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x - barWidth/2, this.y - this.radius - 20, barWidth, barHeight);
        }
        
        ctx.restore();
    }
}

class SkeletonBoss extends BasicSkeletonEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.isBoss = true;
        this.speed = 30;
        this.health = 800;
        this.maxHealth = 800;
        this.radius = 60;
        this.scoreValue = 500;
        this.expValue = 250; // Much higher XP reward for bosses
        this.scale = 2.5;
        this.name = "Skeleton Lord";
        
        // Boss special abilities
        this.chargeAttack = false;
        this.chargeSpeed = 200;
        this.chargeCooldown = 3000;
        this.lastCharge = 0;
        this.isCharging = false;
        this.chargeDuration = 1000;
        this.chargeStartTime = 0;
    }
    
    update(deltaTime, player) {
        super.update(deltaTime, player);
        
        // Boss charge attack ability
        this.lastCharge += deltaTime;
        
        if (!this.isCharging && this.lastCharge >= this.chargeCooldown) {
            // Start charge attack
            this.isCharging = true;
            this.chargeStartTime = performance.now();
            this.lastCharge = 0;
            
            // Calculate charge direction towards player
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
                this.chargeVx = (dx / distance) * this.chargeSpeed;
                this.chargeVy = (dy / distance) * this.chargeSpeed;
            }
        }
        
        if (this.isCharging) {
            const chargeTime = performance.now() - this.chargeStartTime;
            if (chargeTime < this.chargeDuration) {
                // Override normal movement with charge
                const dt = deltaTime / 1000;
                this.x += this.chargeVx * dt;
                this.y += this.chargeVy * dt;
            } else {
                this.isCharging = false;
            }
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Boss glow effect
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 20;
        
        // Charging effect
        if (this.isCharging) {
            ctx.shadowColor = '#ffff00';
            ctx.shadowBlur = 30;
        }
        
        // Render skeleton sprite with red overlay
        if (this.currentAnimation) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
            
            // Add red overlay for boss
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        } else {
            // Fallback circle
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Boss health bar (bigger)
        const barWidth = 80;
        const barHeight = 8;
        const healthPercent = this.health / this.maxHealth;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 25, barWidth, barHeight);
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 25, barWidth * healthPercent, barHeight);
        
        // Health bar border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - barWidth/2, this.y - this.radius - 25, barWidth, barHeight);
        
        // Boss name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y - this.radius - 35);
        
        ctx.restore();
    }
}

class GiantBoss extends BasicSkeletonEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.isBoss = true;
        this.speed = 20;
        this.health = 1200;
        this.maxHealth = 1200;
        this.radius = 80;
        this.scoreValue = 1000;
        this.expValue = 400; // Much higher XP reward for bosses
        this.scale = 3.5;
        this.name = "Bone Colossus";
        
        // Stomping attack
        this.stompCooldown = 4000;
        this.lastStomp = 0;
        this.isStomping = false;
        this.stompDuration = 800;
        this.stompStartTime = 0;
        this.stompRadius = 120;
    }
    
    update(deltaTime, player) {
        super.update(deltaTime, player);
        
        // Stomp attack
        this.lastStomp += deltaTime;
        
        if (!this.isStomping && this.lastStomp >= this.stompCooldown) {
            const distance = Math.sqrt(
                Math.pow(player.x - this.x, 2) + 
                Math.pow(player.y - this.y, 2)
            );
            
            if (distance <= this.stompRadius) {
                this.isStomping = true;
                this.stompStartTime = performance.now();
                this.lastStomp = 0;
            }
        }
        
        if (this.isStomping) {
            const stompTime = performance.now() - this.stompStartTime;
            if (stompTime >= this.stompDuration) {
                this.isStomping = false;
                
                // Deal damage to player if in range
                const distance = Math.sqrt(
                    Math.pow(player.x - this.x, 2) + 
                    Math.pow(player.y - this.y, 2)
                );
                
                if (distance <= this.stompRadius) {
                    player.takeDamage(75);
                }
            }
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Boss glow effect
        ctx.shadowColor = '#8e44ad';
        ctx.shadowBlur = 25;
        
        // Stomping effect
        if (this.isStomping) {
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 40;
            
            // Draw stomp radius
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.stompRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Render skeleton sprite with purple overlay
        if (this.currentAnimation) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
            
            // Add purple overlay for giant boss
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = 'rgba(142, 68, 173, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        } else {
            // Fallback circle
            ctx.fillStyle = '#8e44ad';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Boss health bar (even bigger)
        const barWidth = 100;
        const barHeight = 10;
        const healthPercent = this.health / this.maxHealth;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 30, barWidth, barHeight);
        
        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 30, barWidth * healthPercent, barHeight);
        
        // Health bar border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - barWidth/2, this.y - this.radius - 30, barWidth, barHeight);
        
        // Boss name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y - this.radius - 40);
        
        ctx.restore();
    }
}

// Zombie Enemy Classes - Stronger than skeletons, appear after 10 minutes

class BasicZombieEnemy {
    constructor(x, y, assets) {
        this.x = x;
        this.y = y;
        this.health = 120; // Much stronger than skeleton (60)
        this.maxHealth = 120;
        this.speed = 45; // Slightly slower than skeleton (50) but more damage
        this.radius = 25;
        this.scale = 1.3; // Slightly larger than skeleton (1.2)
        this.scoreValue = 20; // More valuable than skeleton (10)
        this.expValue = 15; // More XP than skeleton (8)
        this.damage = 30; // Higher damage than skeleton (20)
        this.frozen = false;
        this.freezeTimer = 0;
        
        // Zombie animations
        this.idleAnimation = assets.getAnimation('zombieIdle');
        this.walkAnimation = assets.getAnimation('zombieWalk');
        this.currentAnimation = this.idleAnimation;
        this.isMoving = false;
    }
    
    update(deltaTime, player) {
        if (this.frozen) {
            this.freezeTimer -= deltaTime;
            if (this.freezeTimer <= 0) {
                this.frozen = false;
            }
            return; // Don't move when frozen
        }
        
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > this.radius) {
            const moveX = (dx / distance) * this.speed * (deltaTime / 1000);
            const moveY = (dy / distance) * this.speed * (deltaTime / 1000);
            
            this.x += moveX;
            this.y += moveY;
            this.isMoving = true;
        } else {
            this.isMoving = false;
        }
        
        // Switch animations based on movement
        if (this.isMoving && this.currentAnimation === this.idleAnimation) {
            this.currentAnimation = this.walkAnimation;
        } else if (!this.isMoving && this.currentAnimation === this.walkAnimation) {
            this.currentAnimation = this.idleAnimation;
        }
        
        // Update current animation
        if (this.currentAnimation) {
            this.currentAnimation.update(deltaTime);
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
    }
    
    render(ctx) {
        ctx.save();
        
        // Zombie-specific tint (green/decay overlay)
        ctx.globalCompositeOperation = 'source-over';
        
        // Render zombie sprite with current animation
        if (this.currentAnimation && this.currentAnimation.loaded) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
        } else {
            // Fallback zombie color - sickly green
            ctx.fillStyle = '#556b2f';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add green decay overlay
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgba(85, 107, 47, 0.4)'; // Dark olive green
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        
        // Frozen effect
        if (this.frozen) {
            ctx.fillStyle = 'rgba(173, 216, 230, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Health bar
        const healthBarWidth = 35;
        const healthBarHeight = 4;
        const healthPercentage = this.health / this.maxHealth;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 10, healthBarWidth, healthBarHeight);
        
        ctx.fillStyle = '#228b22'; // Forest green for zombie health
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 10, healthBarWidth * healthPercentage, healthBarHeight);
        
        ctx.restore();
    }
}

class FastZombieEnemy extends BasicZombieEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.health = 85; // Less health but faster
        this.maxHealth = 85;
        this.speed = 90; // Much faster than basic zombie
        this.radius = 22;
        this.scale = 1.1;
        this.scoreValue = 25;
        this.expValue = 12;
        this.damage = 25; // Slightly less damage for speed
    }
}

class TankZombieEnemy extends BasicZombieEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.health = 240; // Much tankier than basic zombie
        this.maxHealth = 240;
        this.speed = 20; // Slower but devastating
        this.radius = 35;
        this.scale = 1.8;
        this.scoreValue = 50;
        this.expValue = 25;
        this.damage = 45; // High damage
    }
    
    render(ctx) {
        ctx.save();
        
        // Render zombie sprite with current animation
        if (this.currentAnimation && this.currentAnimation.loaded) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
        } else {
            // Fallback tank zombie color - dark green
            ctx.fillStyle = '#2f4f2f';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add dark green armored overlay for tank zombie
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgba(47, 79, 47, 0.5)'; // Dark forest green
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        
        // Frozen effect
        if (this.frozen) {
            ctx.fillStyle = 'rgba(173, 216, 230, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Larger health bar for tank
        const healthBarWidth = 40;
        const healthBarHeight = 6;
        const healthPercentage = this.health / this.maxHealth;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 12, healthBarWidth, healthBarHeight);
        
        ctx.fillStyle = '#006400'; // Dark green for tank zombie health
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 12, healthBarWidth * healthPercentage, healthBarHeight);
        
        ctx.restore();
    }
}

class RangedZombieEnemy extends BasicZombieEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.health = 100; // Medium health for ranged unit
        this.maxHealth = 100;
        this.speed = 35; // Slower to balance ranged attacks
        this.radius = 25;
        this.scale = 1.2;
        this.scoreValue = 30; // Higher value for ranged threat
        this.expValue = 18;
        this.damage = 25; // Melee damage if player gets close
        
        // Projectile throwing mechanics
        this.throwCooldown = 0;
        this.throwCooldownMax = 2500; // 2.5 seconds between throws
        this.throwRange = 350; // Can attack from longer distance
        this.projectileDamage = 20; // Projectile damage
        this.isThrowing = false;
        this.throwDuration = 800; // 0.8 second throw animation
        this.throwTimer = 0;
    }
    
    update(deltaTime, player) {
        super.update(deltaTime, player);
        
        if (this.frozen) return; // Don't attack when frozen
        
        // Handle projectile throwing
        this.throwCooldown += deltaTime;
        
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (this.isThrowing) {
            this.throwTimer += deltaTime;
            if (this.throwTimer >= this.throwDuration) {
                this.isThrowing = false;
                this.throwTimer = 0;
                
                // Throw projectile at player
                if (distance <= this.throwRange && distance > 0) {
                    const speed = 180;
                    const vx = (dx / distance) * speed;
                    const vy = (dy / distance) * speed;
                    
                    // Add zombie projectile to game
                    if (window.game) {
                        window.game.projectiles.push(new ZombieThrowProjectile(
                            this.x, this.y, vx, vy, this.projectileDamage
                        ));
                    }
                }
            }
        } else if (this.throwCooldown >= this.throwCooldownMax) {
            // Check if player is in range for projectile attack
            if (distance <= this.throwRange && distance > this.radius + 50) { // Don't throw when too close
                this.isThrowing = true;
                this.throwCooldown = 0;
            }
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Throwing animation effect
        if (this.isThrowing) {
            ctx.shadowColor = '#8b4513'; // Brown glow when throwing
            ctx.shadowBlur = 15;
        }
        
        // Render zombie sprite with current animation
        if (this.currentAnimation && this.currentAnimation.loaded) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
        } else {
            // Fallback ranged zombie color - brown
            ctx.fillStyle = '#8b4513';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add brown overlay for ranged zombie identification
        ctx.globalCompositeOperation = 'multiply';
        if (this.isThrowing) {
            ctx.fillStyle = 'rgba(139, 69, 19, 0.6)'; // Darker when throwing
        } else {
            ctx.fillStyle = 'rgba(139, 69, 19, 0.3)'; // Normal brown overlay
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        
        // Frozen effect
        if (this.frozen) {
            ctx.fillStyle = 'rgba(173, 216, 230, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Range indicator when throwing (optional visual feedback)
        if (this.isThrowing) {
            ctx.globalAlpha = 0.2;
            ctx.strokeStyle = '#8b4513';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.throwRange, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        // Health bar
        const healthBarWidth = 35;
        const healthBarHeight = 4;
        const healthPercentage = this.health / this.maxHealth;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 10, healthBarWidth, healthBarHeight);
        
        ctx.fillStyle = '#8b4513'; // Brown for ranged zombie health
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 10, healthBarWidth * healthPercentage, healthBarHeight);
        
        ctx.restore();
    }
}

class ZombieBoss extends BasicZombieEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.health = 1000; // Stronger than Skeleton Lord (800)
        this.maxHealth = 1000;
        this.speed = 25;
        this.radius = 70;
        this.scale = 2.8;
        this.scoreValue = 600;
        this.expValue = 300;
        this.damage = 50;
        this.name = "Zombie Overlord";
        
        // Poison spit attack
        this.spitCooldown = 0;
        this.spitCooldownMax = 3500; // 3.5 seconds
        this.spitRange = 300;
        this.isSpitting = false;
        this.spitDuration = 1000; // 1 second spit animation
        this.spitTimer = 0;
    }
    
    update(deltaTime, player) {
        super.update(deltaTime, player);
        
        // Handle spit attack
        this.spitCooldown += deltaTime;
        
        if (this.isSpitting) {
            this.spitTimer += deltaTime;
            if (this.spitTimer >= this.spitDuration) {
                this.isSpitting = false;
                this.spitTimer = 0;
                
                // Create poison spit projectile
                const dx = player.x - this.x;
                const dy = player.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance <= this.spitRange && distance > 0) {
                    const speed = 150;
                    const vx = (dx / distance) * speed;
                    const vy = (dy / distance) * speed;
                    
                    // Add poison spit projectile to game
                    if (window.game) {
                        window.game.projectiles.push(new PoisonSpitProjectile(
                            this.x, this.y, vx, vy, this.damage
                        ));
                    }
                }
            }
        } else if (this.spitCooldown >= this.spitCooldownMax) {
            // Check if player is in range for spit attack
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= this.spitRange) {
                this.isSpitting = true;
                this.spitCooldown = 0;
            }
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Boss glow effect
        if (this.isSpitting) {
            ctx.shadowColor = '#32cd32'; // Lime green glow when spitting
            ctx.shadowBlur = 30;
        } else {
            ctx.shadowColor = '#228b22'; // Forest green glow
            ctx.shadowBlur = 20;
        }
        
        // Render zombie sprite
        if (this.currentAnimation && this.currentAnimation.loaded) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
        } else {
            // Fallback boss color - toxic green
            ctx.fillStyle = '#32cd32';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add toxic green overlay
        ctx.globalCompositeOperation = 'multiply';
        if (this.isSpitting) {
            ctx.fillStyle = 'rgba(50, 205, 50, 0.6)'; // Brighter when spitting
        } else {
            ctx.fillStyle = 'rgba(34, 139, 34, 0.4)'; // Normal toxic overlay
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        
        // Boss name
        ctx.fillStyle = '#32cd32';
        ctx.font = '16px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y - this.radius * this.scale - 25);
        
        // Large health bar
        const healthBarWidth = 90;
        const healthBarHeight = 8;
        const healthPercentage = this.health / this.maxHealth;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 15, healthBarWidth, healthBarHeight);
        
        ctx.fillStyle = '#32cd32'; // Lime green for boss health
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 15, healthBarWidth * healthPercentage, healthBarHeight);
        
        ctx.restore();
    }
}

class ZombieKing extends BasicZombieEnemy {
    constructor(x, y, assets) {
        super(x, y, assets);
        this.health = 1500; // Stronger than Giant Boss (1200)
        this.maxHealth = 1500;
        this.speed = 15;
        this.radius = 90;
        this.scale = 4.0;
        this.scoreValue = 1200;
        this.expValue = 500;
        this.damage = 60;
        this.name = "Zombie King";
        
        // Horde summon attack
        this.summonCooldown = 0;
        this.summonCooldownMax = 6000; // 6 seconds
        this.isSummoning = false;
        this.summonDuration = 2000; // 2 second summon animation
        this.summonTimer = 0;
    }
    
    update(deltaTime, player) {
        super.update(deltaTime, player);
        
        // Handle summon attack
        this.summonCooldown += deltaTime;
        
        if (this.isSummoning) {
            this.summonTimer += deltaTime;
            if (this.summonTimer >= this.summonDuration) {
                this.isSummoning = false;
                this.summonTimer = 0;
                
                // Summon 3 basic zombies around the king
                if (window.game) {
                    for (let i = 0; i < 3; i++) {
                        const angle = (i * 2 * Math.PI) / 3;
                        const spawnDistance = 120;
                        const spawnX = this.x + Math.cos(angle) * spawnDistance;
                        const spawnY = this.y + Math.sin(angle) * spawnDistance;
                        
                        window.game.enemies.push(new BasicZombieEnemy(spawnX, spawnY, window.game.assets));
                    }
                }
            }
        } else if (this.summonCooldown >= this.summonCooldownMax) {
            this.isSummoning = true;
            this.summonCooldown = 0;
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // King glow effect
        if (this.isSummoning) {
            ctx.shadowColor = '#9acd32'; // Yellow-green glow when summoning
            ctx.shadowBlur = 40;
        } else {
            ctx.shadowColor = '#6b8e23'; // Olive drab glow
            ctx.shadowBlur = 25;
        }
        
        // Render zombie sprite
        if (this.currentAnimation && this.currentAnimation.loaded) {
            this.currentAnimation.render(ctx, this.x, this.y, this.scale);
        } else {
            // Fallback king color - olive drab
            ctx.fillStyle = '#6b8e23';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add royal green overlay
        ctx.globalCompositeOperation = 'multiply';
        if (this.isSummoning) {
            ctx.fillStyle = 'rgba(154, 205, 50, 0.7)'; // Brighter when summoning
        } else {
            ctx.fillStyle = 'rgba(107, 142, 35, 0.5)'; // Normal royal overlay
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        
        // King name
        ctx.fillStyle = '#9acd32';
        ctx.font = '18px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y - this.radius * this.scale - 30);
        
        // Extra large health bar
        const healthBarWidth = 110;
        const healthBarHeight = 10;
        const healthPercentage = this.health / this.maxHealth;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 20, healthBarWidth, healthBarHeight);
        
        ctx.fillStyle = '#9acd32'; // Yellow-green for king health
        ctx.fillRect(this.x - healthBarWidth/2, this.y - this.radius * this.scale - 20, healthBarWidth * healthPercentage, healthBarHeight);
        
        ctx.restore();
    }
}

class BasicWeapon {
    constructor() {
        this.name = "Basic Gun";
        this.damage = 10;
        this.fireRate = 500; // ms between shots
        this.lastFired = 0;
        this.range = 300;
        this.projectileSpeed = 400;
        this.level = 1;
        this.maxLevel = 5;
    }
    
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage += 5;
            this.fireRate = Math.max(200, this.fireRate - 50);
            this.range += 25;
            return true;
        }
        return false;
    }
    
    getUpgradeDescription() {
        if (this.level >= this.maxLevel) {
            return "MAX LEVEL";
        }
        return `Level ${this.level} → ${this.level + 1}: +5 damage, +50 attack speed, +25 range`;
    }
    
    update(deltaTime, enemies, projectiles, player) {
        this.lastFired += deltaTime;
        
        // Apply player attack speed multiplier
        const effectiveFireRate = this.fireRate / (player ? player.attackSpeed : 1);
        
        if (this.lastFired >= effectiveFireRate && enemies.length > 0) {
            const nearestEnemy = this.findNearestEnemy(enemies, player);
            if (nearestEnemy) {
                this.fire(nearestEnemy, projectiles, player);
                this.lastFired = 0;
            }
        }
    }
    
    findNearestEnemy(enemies, player) {
        let nearest = null;
        let nearestDistance = Infinity;
        
        if (!player) return null;
        
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - player.x, 2) + 
                Math.pow(enemy.y - player.y, 2)
            );
            
            if (distance < nearestDistance && distance <= this.range) {
                nearest = enemy;
                nearestDistance = distance;
            }
        });
        
        return nearest;
    }
    
    fire(target, projectiles, player) {
        if (!player) return;
        
        const dx = target.x - player.x;
        const dy = target.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            // Calculate base angle towards target
            const baseAngle = Math.atan2(dy, dx);
            
            // Apply player damage multiplier
            const finalDamage = Math.floor(this.damage * player.damage);
            
            // Calculate number of projectiles to fire
            const projectileCount = 1 + (player.multishot || 0);
            
            // Calculate spread - 30 degrees total spread, scaled by projectile count
            const totalSpreadRadians = (Math.PI / 6) * Math.min(projectileCount / 3, 1.5); // 30° base, max 45°
            const angleStep = projectileCount > 1 ? totalSpreadRadians / (projectileCount - 1) : 0;
            const startAngle = baseAngle - totalSpreadRadians / 2;
            
            // Fire multiple projectiles with angular spread
            for (let i = 0; i < projectileCount; i++) {
                const angle = projectileCount > 1 ? startAngle + (i * angleStep) : baseAngle;
                const vx = Math.cos(angle) * this.projectileSpeed;
                const vy = Math.sin(angle) * this.projectileSpeed;
                
                projectiles.push(new Projectile(
                    player.x, 
                    player.y, 
                    vx, 
                    vy, 
                    finalDamage,
                    player.penetration,
                    player.projectileSize
                ));
            }
        }
    }
    
    getStatus(player = null) {
        const attackSpeed = player ? player.attackSpeed : 1;
        const effectiveFireRate = this.fireRate / attackSpeed;
        const timeUntilNext = Math.max(0, effectiveFireRate - this.lastFired);
        return {
            state: timeUntilNext > 0 ? 'cooldown' : 'ready',
            timeLeft: timeUntilNext,
            maxCooldown: effectiveFireRate
        };
    }
}

class Projectile {
    constructor(x, y, vx, vy, damage, penetration = 0, sizeMultiplier = 1.0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.baseRadius = 4;
        this.radius = this.baseRadius * sizeMultiplier;
        this.sizeMultiplier = sizeMultiplier;
        this.active = true;
        this.lifetime = 2000; // ms
        this.age = 0;
        this.penetration = penetration; // How many enemies this can penetrate through
        this.enemiesHit = []; // Track which enemies have been hit to avoid double damage
    }
    
    update(deltaTime) {
        const dt = deltaTime / 1000;
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        
        this.age += deltaTime;
        if (this.age >= this.lifetime) {
            this.active = false;
        }
    }
    
    hitEnemy(enemy) {
        // Check if this enemy has already been hit by this projectile
        if (this.enemiesHit.includes(enemy)) {
            return false; // Don't hit the same enemy twice
        }
        
        // Add enemy to hit list
        this.enemiesHit.push(enemy);
        
        // Check if projectile should be destroyed (no more penetration)
        if (this.enemiesHit.length > this.penetration) {
            this.active = false;
        }
        
        return true; // Successfully hit enemy
    }
    
    render(ctx) {
        ctx.save();
        
        // Enhanced visual effects for larger projectiles
        if (this.sizeMultiplier > 1.0) {
            ctx.shadowBlur = 5 + (this.sizeMultiplier - 1.0) * 5;
        }
        
        // Different colors based on projectile type
        if (this.isSplit) {
            ctx.fillStyle = '#ff6b6b'; // Red for split bullets
            ctx.shadowColor = '#ff6b6b';
            if (!ctx.shadowBlur) ctx.shadowBlur = 3;
        } else if (this.penetration > 0) {
            ctx.fillStyle = '#00ff88'; // Green for penetrating projectiles
            ctx.shadowColor = '#00ff88';
            if (!ctx.shadowBlur) ctx.shadowBlur = 5;
        } else {
            ctx.fillStyle = '#f39c12'; // Orange for normal projectiles
            if (this.sizeMultiplier > 1.0) {
                ctx.shadowColor = '#f39c12';
            }
        }
        
        // Draw the projectile
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add extra glow for large projectiles
        if (this.sizeMultiplier > 1.5) {
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

// Poison Spit Projectile for Zombie Boss
class PoisonSpitProjectile extends Projectile {
    constructor(x, y, vx, vy, damage) {
        super(x, y, vx, vy, damage, 0, 1.0);
        this.radius = 8;
        this.lifetime = 3000; // 3 seconds max
        this.age = 0;
        this.isEnemyProjectile = true; // Mark as enemy projectile
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        this.age += deltaTime;
        
        if (this.age >= this.lifetime) {
            this.active = false;
        }
        
        // Check collision with player
        if (window.game && window.game.player) {
            const dx = this.x - window.game.player.x;
            const dy = this.y - window.game.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= this.radius + 20) { // Player radius ~20
                // Damage player
                window.game.player.takeDamage(this.damage);
                this.active = false;
                
                // Create poison effect particles
                for (let i = 0; i < 5; i++) {
                    window.game.particles.push(new PoisonParticle(this.x, this.y));
                }
            }
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Poison spit appearance
        ctx.fillStyle = '#32cd32';
        ctx.shadowColor = '#32cd32';
        ctx.shadowBlur = 5;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add bubbling effect
        const alpha = 0.3 + Math.sin(this.age * 0.01) * 0.3;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#9acd32';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Poison effect particle
class PoisonParticle {
    constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.vx = (Math.random() - 0.5) * 100;
        this.vy = (Math.random() - 0.5) * 100;
        this.life = 500; // 0.5 seconds
        this.maxLife = 500;
        this.active = true;
    }
    
    update(deltaTime) {
        this.life -= deltaTime;
        if (this.life <= 0) {
            this.active = false;
            return;
        }
        
        const dt = deltaTime / 1000;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#32cd32';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Zombie Debris Projectile for Ranged Zombie Enemy
class ZombieThrowProjectile extends Projectile {
    constructor(x, y, vx, vy, damage) {
        super(x, y, vx, vy, damage, 0, 1.0);
        this.radius = 6;
        this.lifetime = 4000; // 4 seconds max
        this.age = 0;
        this.isEnemyProjectile = true; // Mark as enemy projectile
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        this.age += deltaTime;
        
        if (this.age >= this.lifetime) {
            this.active = false;
        }
        
        // Check collision with player
        if (window.game && window.game.player) {
            const dx = this.x - window.game.player.x;
            const dy = this.y - window.game.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= this.radius + 20) { // Player radius ~20
                // Damage player
                window.game.player.takeDamage(this.damage);
                this.active = false;
                
                // Enhanced impact effects
                // Create bigger debris burst with more particles
                for (let i = 0; i < 8; i++) {
                    window.game.particles.push(new DebrisParticle(this.x, this.y));
                }
                
                // Add hit flash particles for impact
                for (let i = 0; i < 6; i++) {
                    window.game.particles.push(new HitParticle(this.x, this.y));
                }
                
                // Create impact shockwave effect
                window.game.particles.push(new ZombieImpactWave(this.x, this.y));
            }
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Debris appearance - rocky brown color
        ctx.fillStyle = '#8b4513';
        ctx.shadowColor = '#8b4513';
        ctx.shadowBlur = 3;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add darker center
        ctx.fillStyle = '#654321';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Enhanced debris effect particle
class DebrisParticle {
    constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.vx = (Math.random() - 0.5) * 150;
        this.vy = (Math.random() - 0.5) * 150;
        this.life = 500 + Math.random() * 300; // 0.5-0.8 seconds
        this.maxLife = this.life;
        this.active = true;
        this.size = 2 + Math.random() * 3; // Variable size
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.gravity = 100; // Add gravity for more realistic movement
    }
    
    update(deltaTime) {
        this.life -= deltaTime;
        if (this.life <= 0) {
            this.active = false;
            return;
        }
        
        const dt = deltaTime / 1000;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vy += this.gravity * dt; // Apply gravity
        this.rotation += this.rotationSpeed * dt;
        
        // Add some air resistance
        this.vx *= 0.98;
        this.vy *= 0.98;
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw as small brown rock/debris
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        
        // Add darker edge for depth
        ctx.fillStyle = '#654321';
        ctx.fillRect(-this.size/4, -this.size/4, this.size/2, this.size/2);
        
        ctx.restore();
    }
}

// Zombie impact shockwave effect
class ZombieImpactWave {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 60;
        this.life = 400; // 0.4 seconds
        this.maxLife = 400;
        this.active = true;
        this.pulseSpeed = 0.01;
        this.age = 0;
    }
    
    update(deltaTime) {
        this.life -= deltaTime;
        this.age += deltaTime;
        
        if (this.life <= 0) {
            this.active = false;
            return;
        }
        
        // Expand shockwave
        const progress = 1 - (this.life / this.maxLife);
        this.radius = this.maxRadius * progress;
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        const pulse = Math.sin(this.age * this.pulseSpeed) * 0.3 + 0.7;
        
        ctx.save();
        ctx.globalAlpha = alpha * 0.6 * pulse;
        
        // Brown shockwave ring
        ctx.strokeStyle = '#8b4513';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner filled ring for more impact
        ctx.globalAlpha = alpha * 0.3 * pulse;
        ctx.fillStyle = '#8b4513';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class FireballWeapon {
    constructor() {
        this.name = "Fireball";
        this.damage = 25;
        this.fireRate = 800; // ms between shots
        this.lastFired = 0;
        this.range = 400;
        this.projectileSpeed = 250;
        this.level = 1;
        this.maxLevel = 5;
        this.explosionRadius = 60;
    }
    
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage += 10;
            this.fireRate = Math.max(400, this.fireRate - 80);
            this.explosionRadius += 10;
            return true;
        }
        return false;
    }
    
    getUpgradeDescription() {
        if (this.level >= this.maxLevel) {
            return "MAX LEVEL";
        }
        return `Level ${this.level} → ${this.level + 1}: +10 damage, +80 attack speed, +10 explosion radius`;
    }
    
    update(deltaTime, enemies, projectiles, player) {
        this.lastFired += deltaTime;
        
        if (this.lastFired >= this.fireRate && enemies.length > 0) {
            const nearestEnemy = this.findNearestEnemy(enemies, player);
            if (nearestEnemy) {
                this.fire(nearestEnemy, projectiles, player);
                this.lastFired = 0;
            }
        }
    }
    
    findNearestEnemy(enemies, player) {
        let nearest = null;
        let nearestDistance = Infinity;
        
        if (!player) return null;
        
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - player.x, 2) + 
                Math.pow(enemy.y - player.y, 2)
            );
            
            if (distance < nearestDistance && distance <= this.range) {
                nearest = enemy;
                nearestDistance = distance;
            }
        });
        
        return nearest;
    }
    
    fire(target, projectiles, player) {
        if (!player) return;
        
        const dx = target.x - player.x;
        const dy = target.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            // Calculate base angle towards target
            const baseAngle = Math.atan2(dy, dx);
            
            // Calculate number of projectiles to fire
            const projectileCount = 1 + (player.multishot || 0);
            
            // Calculate spread - 25 degrees total for fireballs (tighter than basic weapon)
            const totalSpreadRadians = (Math.PI / 7.2) * Math.min(projectileCount / 3, 1.2); // 25° base, max 30°
            const angleStep = projectileCount > 1 ? totalSpreadRadians / (projectileCount - 1) : 0;
            const startAngle = baseAngle - totalSpreadRadians / 2;
            
            // Fire multiple fireballs with angular spread
            for (let i = 0; i < projectileCount; i++) {
                const angle = projectileCount > 1 ? startAngle + (i * angleStep) : baseAngle;
                const vx = Math.cos(angle) * this.projectileSpeed;
                const vy = Math.sin(angle) * this.projectileSpeed;
                
                projectiles.push(new FireballProjectile(
                    player.x, 
                    player.y, 
                    vx, 
                    vy, 
                    this.damage,
                    this.explosionRadius,
                    player.penetration,
                    player.projectileSize
                ));
            }
        }
    }
    
    getStatus(player) {
        if (this.lastFired < this.fireRate) {
            return { 
                state: 'cooldown', 
                timeLeft: (this.fireRate - this.lastFired) / 1000,
                maxCooldown: this.fireRate / 1000
            };
        }
        return { state: 'ready', timeLeft: 0, maxCooldown: 0 };
    }
}

class LaserWeapon {
    constructor() {
        this.name = "Laser";
        this.damage = 15;
        this.range = 300;
        this.level = 1;
        this.maxLevel = 5;
        
        // Laser beam mechanics
        this.fireDuration = 2000; // ms the laser fires for
        this.cooldownDuration = 3000; // ms cooldown between bursts
        this.lastActivated = 0;
        this.isFiring = false;
        this.isOnCooldown = false;
        this.currentTarget = null;
        this.beamAngle = 0;
        this.rotationSpeed = 1.5; // radians per second (slower rotation)
        this.beamRadius = 150; // distance from player center
    }
    
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage += 8; // Increased from 5
            this.range += 30;
            this.fireDuration += 300;
            this.beamRadius += 15;
            return true;
        }
        return false;
    }
    
    getUpgradeDescription() {
        if (this.level >= this.maxLevel) {
            return "MAX LEVEL";
        }
        return `Level ${this.level} → ${this.level + 1}: +8 damage, +30 range, +0.3s duration, +15 beam radius`;
    }
    
    update(deltaTime, enemies, projectiles) {
        const currentTime = performance.now();
        
        if (!this.isFiring && !this.isOnCooldown) {
            // Find target and start firing
            const target = this.findNearestEnemy(enemies);
            if (target) {
                this.currentTarget = target;
                this.isFiring = true;
                this.lastActivated = currentTime;
                // Set initial beam angle towards target
                const dx = target.x - window.game.player.x;
                const dy = target.y - window.game.player.y;
                this.beamAngle = Math.atan2(dy, dx);
            }
        } else if (this.isFiring) {
            // Update beam rotation and damage enemies
            this.beamAngle += (this.rotationSpeed * deltaTime) / 1000;
            this.damageEnemiesInBeam(enemies);
            
            // Check if firing duration is over
            if (currentTime - this.lastActivated >= this.fireDuration) {
                this.isFiring = false;
                this.isOnCooldown = true;
                this.lastActivated = currentTime;
            }
        } else if (this.isOnCooldown) {
            // Check if cooldown is over
            if (currentTime - this.lastActivated >= this.cooldownDuration) {
                this.isOnCooldown = false;
            }
        }
    }
    
    findNearestEnemy(enemies) {
        let nearest = null;
        let nearestDistance = Infinity;
        
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - window.game.player.x, 2) + 
                Math.pow(enemy.y - window.game.player.y, 2)
            );
            
            if (distance < nearestDistance && distance <= this.range) {
                nearest = enemy;
                nearestDistance = distance;
            }
        });
        
        return nearest;
    }
    
    damageEnemiesInBeam(enemies) {
        const beamWidth = 15; // Width of the laser beam
        
        enemies.forEach(enemy => {
            // Calculate if enemy is within the rotating beam
            const dx = enemy.x - window.game.player.x;
            const dy = enemy.y - window.game.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= this.range && distance >= 30) { // Don't hit enemies too close
                const enemyAngle = Math.atan2(dy, dx);
                let angleDiff = Math.abs(enemyAngle - this.beamAngle);
                
                // Normalize angle difference
                if (angleDiff > Math.PI) {
                    angleDiff = 2 * Math.PI - angleDiff;
                }
                
                // Check if enemy is within beam width
                const beamWidthAngle = Math.atan2(beamWidth, distance);
                if (angleDiff <= beamWidthAngle) {
                    // Higher damage per frame - laser should be powerful!
                    const finalDamage = Math.floor(this.damage * window.game.player.damage * 0.5); // 50% damage per frame at 60fps = 30 DPS
                    enemy.takeDamage(finalDamage);
                    
                    // Create beam hit particles
                    if (Math.random() < 0.3) {
                        window.game.particles.push(new LaserHitParticle(enemy.x, enemy.y));
                    }
                }
            }
        });
    }
    
    getStatus() {
        if (this.isFiring) {
            const timeLeft = this.fireDuration - (performance.now() - this.lastActivated);
            return { state: 'firing', timeLeft: Math.max(0, timeLeft), maxCooldown: this.fireDuration };
        } else if (this.isOnCooldown) {
            const timeLeft = this.cooldownDuration - (performance.now() - this.lastActivated);
            return { state: 'cooldown', timeLeft: Math.max(0, timeLeft), maxCooldown: this.cooldownDuration };
        } else {
            return { state: 'ready', timeLeft: 0, maxCooldown: 0 };
        }
    }
    
    render(ctx) {
        if (!this.isFiring) return;
        
        ctx.save();
        ctx.translate(window.game.player.x, window.game.player.y);
        
        // Draw rotating laser beam
        const beamLength = this.range;
        const beamWidth = 15;
        
        // Create gradient for beam
        const gradient = ctx.createLinearGradient(0, 0, 
            Math.cos(this.beamAngle) * beamLength, 
            Math.sin(this.beamAngle) * beamLength);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(0, 191, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0.1)');
        
        // Draw beam glow
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 20;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = beamWidth;
        ctx.beginPath();
        ctx.moveTo(30 * Math.cos(this.beamAngle), 30 * Math.sin(this.beamAngle));
        ctx.lineTo(beamLength * Math.cos(this.beamAngle), beamLength * Math.sin(this.beamAngle));
        ctx.stroke();
        
        // Draw inner beam core
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = beamWidth * 0.3;
        ctx.stroke();
        
        ctx.restore();
    }
}

class SwordWeapon {
    constructor() {
        this.name = "Sword";
        this.damage = 40;
        this.attackRate = 1500; // ms between attacks
        this.lastAttacked = 0;
        this.range = 80;
        this.level = 1;
        this.maxLevel = 5;
        this.slashDuration = 300;
        this.isSlashing = false;
        this.slashStartTime = 0;
        this.slashAngle = 0;
    }
    
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage += 20;
            this.attackRate = Math.max(800, this.attackRate - 150);
            this.range += 15;
            return true;
        }
        return false;
    }
    
    getUpgradeDescription() {
        if (this.level >= this.maxLevel) {
            return "MAX LEVEL";
        }
        return `Level ${this.level} → ${this.level + 1}: +20 damage, +150 attack speed, +15 range`;
    }
    
    update(deltaTime, enemies, projectiles, player) {
        this.lastAttacked += deltaTime;
        
        // Update slash animation
        if (this.isSlashing) {
            if (performance.now() - this.slashStartTime >= this.slashDuration) {
                this.isSlashing = false;
            }
        }
        
        // Apply player attack speed multiplier  
        const effectiveAttackRate = this.attackRate / (player ? player.attackSpeed : 1);
        
        if (this.lastAttacked >= effectiveAttackRate && enemies.length > 0) {
            const nearestEnemy = this.findNearestEnemy(enemies, player);
            if (nearestEnemy) {
                this.attack(nearestEnemy, enemies, player);
                this.lastAttacked = 0;
            }
        }
    }
    
    findNearestEnemy(enemies, player) {
        let nearest = null;
        let nearestDistance = Infinity;
        
        if (!player) return null;
        
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - player.x, 2) + 
                Math.pow(enemy.y - player.y, 2)
            );
            
            if (distance < nearestDistance && distance <= this.range) {
                nearest = enemy;
                nearestDistance = distance;
            }
        });
        
        return nearest;
    }
    
    attack(target, enemies, player) {
        if (!player) return;
        
        // Start slash animation
        this.isSlashing = true;
        this.slashStartTime = performance.now();
        
        // Calculate slash angle towards target
        const dx = target.x - player.x;
        const dy = target.y - player.y;
        this.slashAngle = Math.atan2(dy, dx);
        
        // Damage all enemies in range (area of effect)
        const finalDamage = Math.floor(this.damage * player.damage);
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - player.x, 2) + 
                Math.pow(enemy.y - player.y, 2)
            );
            
            if (distance <= this.range) {
                enemy.takeDamage(finalDamage);
                // Create hit particles - we'll need to pass game reference differently
                if (window.game && window.game.createHitParticles) {
                    window.game.createHitParticles(enemy.x, enemy.y);
                }
            }
        });
    }
    
    getStatus(player = null) {
        const attackSpeed = player ? player.attackSpeed : 1;
        const effectiveAttackRate = this.attackRate / attackSpeed;
        const timeUntilNextAttack = Math.max(0, effectiveAttackRate - this.lastAttacked);
        if (this.isSlashing) {
            const slashTimeLeft = this.slashDuration - (performance.now() - this.slashStartTime);
            return {
                state: 'attacking',
                timeLeft: Math.max(0, slashTimeLeft)
            };
        }
        return {
            state: timeUntilNextAttack > 0 ? 'cooldown' : 'ready',
            timeLeft: timeUntilNextAttack
        };
    }
    
    render(ctx) {
        if (!this.isSlashing) return;
        
        const progress = (performance.now() - this.slashStartTime) / this.slashDuration;
        const alpha = 1 - progress;
        
        ctx.save();
        ctx.translate(window.game.player.x, window.game.player.y);
        ctx.rotate(this.slashAngle);
        
        // Draw radiant slash effect (multiple layers for glow)
        for (let i = 3; i >= 0; i--) {
            const layerAlpha = alpha * (0.8 - i * 0.2);
            const layerWidth = 8 + i * 4;
            const layerRange = this.range + i * 5;
            
            ctx.globalAlpha = layerAlpha;
            ctx.shadowColor = '#ff6b6b';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = i === 0 ? '#ffffff' : '#e74c3c';
            ctx.lineWidth = layerWidth;
            ctx.beginPath();
            ctx.arc(0, 0, layerRange, -0.4 - i * 0.05, 0.4 + i * 0.05);
            ctx.stroke();
        }
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Draw sword blade with metallic effect
        ctx.globalAlpha = alpha;
        const gradient = ctx.createLinearGradient(10, -3, this.range - 10, 3);
        gradient.addColorStop(0, '#ecf0f1');
        gradient.addColorStop(0.3, '#bdc3c7');
        gradient.addColorStop(0.7, '#95a5a6');
        gradient.addColorStop(1, '#7f8c8d');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(this.range - 10, 0);
        ctx.stroke();
        
        // Add sword edge highlight
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(15, -1);
        ctx.lineTo(this.range - 15, -1);
        ctx.stroke();
        
        ctx.restore();
    }
}

class FireballProjectile extends Projectile {
    constructor(x, y, vx, vy, damage, explosionRadius = 60, penetration = 0, sizeMultiplier = 1.0) {
        super(x, y, vx, vy, damage, penetration, sizeMultiplier);
        this.baseRadius = 8;
        this.radius = this.baseRadius * sizeMultiplier;
        this.trailParticles = [];
        this.explosionRadius = explosionRadius * sizeMultiplier; // Scale explosion with size
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        
        // Add trail particles
        if (Math.random() < 0.3) {
            this.trailParticles.push({
                x: this.x + (Math.random() - 0.5) * 10,
                y: this.y + (Math.random() - 0.5) * 10,
                life: 200,
                maxLife: 200
            });
        }
        
        // Update trail particles
        this.trailParticles = this.trailParticles.filter(particle => {
            particle.life -= deltaTime;
            return particle.life > 0;
        });
    }
    
    explode(enemies) {
        // Create explosion particles
        for (let i = 0; i < 15; i++) {
            game.particles.push(new ExplosionParticle(this.x, this.y));
        }
        
        // Damage enemies in explosion radius
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - this.x, 2) + 
                Math.pow(enemy.y - this.y, 2)
            );
            
            if (distance <= this.explosionRadius) {
                enemy.takeDamage(this.damage * 0.7); // Reduced explosion damage
                game.createHitParticles(enemy.x, enemy.y);
            }
        });
    }
    
    render(ctx) {
        // Draw trail particles
        this.trailParticles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            ctx.save();
            ctx.globalAlpha = alpha * 0.6;
            ctx.fillStyle = '#ff6b35';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        // Draw fireball
        ctx.save();
        
        // Outer glow
        ctx.shadowColor = '#ff6b35';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner core
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius - 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class LaserProjectile extends Projectile {
    constructor(x, y, vx, vy, damage) {
        super(x, y, vx, vy, damage);
        this.radius = 3;
        this.lifetime = 1000; // Shorter lifetime
    }
    
    render(ctx) {
        ctx.save();
        
        // Draw laser beam with glow
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.x - 5, this.y);
        ctx.lineTo(this.x + 5, this.y);
        ctx.stroke();
        
        // Inner core
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }
}

class ExplosionParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 300;
        this.vy = (Math.random() - 0.5) * 300;
        this.life = 500;
        this.maxLife = 500;
        this.active = true;
        this.size = 3 + Math.random() * 5;
        this.color = Math.random() > 0.5 ? '#ff6b35' : '#ffff00';
    }
    
    update(deltaTime) {
        const dt = deltaTime / 1000;
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vx *= 0.98; // Friction
        this.vy *= 0.98;
        this.life -= deltaTime;
        
        if (this.life <= 0) {
            this.active = false;
        }
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class GrenadeExplosionParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 400;
        this.vy = (Math.random() - 0.5) * 400;
        this.life = 600;
        this.maxLife = 600;
        this.active = true;
        this.length = 8 + Math.random() * 12; // Line length
        this.angle = Math.random() * Math.PI * 2; // Line orientation
        this.color = Math.random() > 0.7 ? '#ff4444' : '#ffaa00';
        this.lineWidth = 2 + Math.random() * 2;
    }
    
    update(deltaTime) {
        const dt = deltaTime / 1000;
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vx *= 0.96; // Slightly less friction than regular explosion
        this.vy *= 0.96;
        this.life -= deltaTime;
        
        // Rotate the line slightly as it moves
        this.angle += (Math.random() - 0.5) * 0.1;
        
        if (this.life <= 0) {
            this.active = false;
        }
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        const currentLength = this.length * alpha; // Shrink as life decreases
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth * alpha;
        ctx.lineCap = 'round';
        
        // Calculate line endpoints
        const halfLength = currentLength / 2;
        const x1 = this.x - Math.cos(this.angle) * halfLength;
        const y1 = this.y - Math.sin(this.angle) * halfLength;
        const x2 = this.x + Math.cos(this.angle) * halfLength;
        const y2 = this.y + Math.sin(this.angle) * halfLength;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
    }
}

class LaserHitParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 100;
        this.vy = (Math.random() - 0.5) * 100;
        this.life = 200;
        this.maxLife = 200;
        this.active = true;
        this.size = 1 + Math.random() * 2;
    }
    
    update(deltaTime) {
        const dt = deltaTime / 1000;
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= deltaTime;
        
        if (this.life <= 0) {
            this.active = false;
        }
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#00ffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class HitParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 200;
        this.vy = (Math.random() - 0.5) * 200;
        this.life = 300;
        this.maxLife = 300;
        this.active = true;
        this.size = 2 + Math.random() * 3;
    }
    
    update(deltaTime) {
        const dt = deltaTime / 1000;
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= deltaTime;
        
        if (this.life <= 0) {
            this.active = false;
        }
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class DeathParticle extends HitParticle {
    constructor(x, y) {
        super(x, y);
        this.life = 500;
        this.maxLife = 500;
        this.size = 3 + Math.random() * 5;
        this.color = '#e74c3c';
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class ExperienceOrb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.value = 15;
        this.active = true;
        this.bobOffset = Math.random() * Math.PI * 2;
        this.bobSpeed = 5;
        this.age = 0;
    }
    
    update(deltaTime) {
        this.age += deltaTime / 1000;
        
        // Move towards player if close enough
        const dx = game.player.x - this.x;
        const dy = game.player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const speed = 200;
            const dt = deltaTime / 1000;
            this.x += (dx / distance) * speed * dt;
            this.y += (dy / distance) * speed * dt;
        }
    }
    
    render(ctx) {
        const bobY = Math.sin(this.age * this.bobSpeed + this.bobOffset) * 3;
        
        ctx.save();
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(this.x, this.y + bobY, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#e67e22';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }
}

class HealthPickup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 8;
        this.value = 25;
        this.active = true;
        this.bobOffset = Math.random() * Math.PI * 2;
        this.bobSpeed = 4;
        this.age = 0;
        this.pulsePhase = 0;
    }
    
    update(deltaTime) {
        this.age += deltaTime / 1000;
        this.pulsePhase += deltaTime / 200;
        
        // Move towards player if close enough
        const dx = game.player.x - this.x;
        const dy = game.player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
            const speed = 150;
            const dt = deltaTime / 1000;
            this.x += (dx / distance) * speed * dt;
            this.y += (dy / distance) * speed * dt;
        }
    }
    
    render(ctx) {
        const bobY = Math.sin(this.age * this.bobSpeed + this.bobOffset) * 2;
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        
        ctx.save();
        ctx.translate(this.x, this.y + bobY);
        ctx.scale(pulse, pulse);
        
        // Draw red cross
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(-6, -2, 12, 4);
        ctx.fillRect(-2, -6, 4, 12);
        
        // Draw white outline
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-6, -2, 12, 4);
        ctx.strokeRect(-2, -6, 4, 12);
        
        ctx.restore();
    }
}

class DiamondPickup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 6;
        this.value = 1;
        this.active = true;
        this.bobOffset = Math.random() * Math.PI * 2;
        this.bobSpeed = 6;
        this.age = 0;
        this.sparklePhase = 0;
    }
    
    update(deltaTime) {
        this.age += deltaTime / 1000;
        this.sparklePhase += deltaTime / 100;
        
        // Move towards player if close enough
        const dx = game.player.x - this.x;
        const dy = game.player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const speed = 250;
            const dt = deltaTime / 1000;
            this.x += (dx / distance) * speed * dt;
            this.y += (dy / distance) * speed * dt;
        }
    }
    
    render(ctx) {
        const bobY = Math.sin(this.age * this.bobSpeed + this.bobOffset) * 4;
        const sparkle = Math.sin(this.sparklePhase) * 0.3 + 0.7;
        
        ctx.save();
        ctx.translate(this.x, this.y + bobY);
        ctx.rotate(this.age);
        
        // Draw diamond shape
        ctx.fillStyle = `rgba(0, 191, 255, ${sparkle})`;
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(6, 0);
        ctx.lineTo(0, 8);
        ctx.lineTo(-6, 0);
        ctx.closePath();
        ctx.fill();
        
        // Draw sparkle effect
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add inner shine
        ctx.fillStyle = `rgba(255, 255, 255, ${sparkle * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(3, 0);
        ctx.lineTo(0, 4);
        ctx.lineTo(-3, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
}

// New Weapon Classes

class GrenadeWeapon {
    constructor() {
        this.name = "Grenade Launcher";
        this.damage = 50;
        this.fireRate = 2000; // ms between shots
        this.lastFired = 0;
        this.level = 1;
        this.maxLevel = 8;
        this.explosionRadius = 80;
        this.range = 300;
    }
    
    getStatus(player) {
        if (this.lastFired < this.fireRate) {
            return { 
                state: 'cooldown', 
                timeLeft: (this.fireRate - this.lastFired) / 1000,
                maxCooldown: this.fireRate / 1000
            };
        }
        return { state: 'ready', timeLeft: 0, maxCooldown: this.fireRate / 1000 };
    }
    
    update(deltaTime, enemies, projectiles, player) {
        this.lastFired += deltaTime;
        
        if (this.lastFired >= this.fireRate && enemies.length > 0) {
            const nearestEnemy = this.findStrongestEnemy(enemies, player);
            if (nearestEnemy) {
                this.fire(nearestEnemy, projectiles, player);
                this.lastFired = 0;
            }
        }
    }
    
    findNearestEnemy(enemies, player) {
        let nearest = null;
        let nearestDistance = Infinity;
        
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - player.x, 2) + 
                Math.pow(enemy.y - player.y, 2)
            );
            
            if (distance < nearestDistance && distance <= this.range) {
                nearest = enemy;
                nearestDistance = distance;
            }
        });
        
        return nearest;
    }
    
    findStrongestEnemy(enemies, player) {
        let strongest = null;
        let highestHealth = 0;
        
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - player.x, 2) + 
                Math.pow(enemy.y - player.y, 2)
            );
            
            if (distance <= this.range && enemy.health > highestHealth) {
                strongest = enemy;
                highestHealth = enemy.health;
            }
        });
        
        return strongest;
    }
    
    fire(target, projectiles, player) {
        const finalDamage = this.damage * player.damage;
        
        // Create target indicator at landing site
        game.particles.push(new TargetIndicator(target.x, target.y, this.explosionRadius));
        
        // Create grenade projectile
        projectiles.push(new GrenadeProjectile(
            player.x, player.y, target.x, target.y, finalDamage, 
            this.explosionRadius, player.projectileSize
        ));
    }
    
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage += 15;
            this.explosionRadius += 10;
            this.fireRate = Math.max(800, this.fireRate - 150);
        }
    }
    
    getUpgradeDescription() {
        return `Level ${this.level + 1}: +15 damage, +10 explosion radius, faster reload`;
    }
}

class MineWeapon {
    constructor() {
        this.name = "Mine Layer";
        this.damage = 80;
        this.fireRate = 3000; // ms between mine placements
        this.lastFired = 0;
        this.level = 1;
        this.maxLevel = 6;
        this.explosionRadius = 70;
        this.maxMines = 3;
        this.activeMines = [];
    }
    
    getStatus(player) {
        if (this.lastFired < this.fireRate) {
            return { 
                state: 'cooldown', 
                timeLeft: (this.fireRate - this.lastFired) / 1000,
                maxCooldown: this.fireRate / 1000
            };
        }
        return { state: 'ready', timeLeft: 0, maxCooldown: 0 };
    }
    
    update(deltaTime, enemies, projectiles, player) {
        this.lastFired += deltaTime;
        
        // Update existing mines
        this.activeMines = this.activeMines.filter(mine => mine.active);
        
        if (this.lastFired >= this.fireRate && this.activeMines.length < this.maxMines) {
            this.placeMine(player, enemies);
            this.lastFired = 0;
        }
    }
    
    placeMine(player, enemies) {
        // Place mine slightly ahead of player movement
        const mineX = player.x + (Math.random() - 0.5) * 100;
        const mineY = player.y + (Math.random() - 0.5) * 100;
        
        const mine = new MineProjectile(
            mineX, mineY, this.damage * player.damage, 
            this.explosionRadius, player.projectileSize
        );
        
        this.activeMines.push(mine);
        game.projectiles.push(mine);
    }
    
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage += 20;
            this.explosionRadius += 15;
            this.maxMines += 1;
            this.fireRate = Math.max(1500, this.fireRate - 200);
        }
    }
    
    getUpgradeDescription() {
        return `Level ${this.level + 1}: +20 damage, +15 explosion radius, +1 max mines`;
    }
}

class ChainLightningWeapon {
    constructor() {
        this.name = "Chain Lightning";
        this.damage = 30;
        this.fireRate = 1200; // ms between shots
        this.lastFired = 0;
        this.level = 1;
        this.maxLevel = 10;
        this.chainCount = 3;
        this.chainRange = 120;
        this.range = 250;
    }
    
    getStatus(player) {
        if (this.lastFired < this.fireRate) {
            return { 
                state: 'firing', 
                timeLeft: (this.fireRate - this.lastFired) / 1000,
                maxCooldown: this.fireRate / 1000
            };
        }
        return { state: 'ready', timeLeft: 0, maxCooldown: 0 };
    }
    
    update(deltaTime, enemies, projectiles, player) {
        this.lastFired += deltaTime;
        
        if (this.lastFired >= this.fireRate && enemies.length > 0) {
            const target = this.findNearestEnemy(enemies, player);
            if (target) {
                this.createLightningChain(target, enemies, player);
                this.lastFired = 0;
            }
        }
    }
    
    findNearestEnemy(enemies, player) {
        let nearest = null;
        let nearestDistance = Infinity;
        
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - player.x, 2) + 
                Math.pow(enemy.y - player.y, 2)
            );
            
            if (distance < nearestDistance && distance <= this.range) {
                nearest = enemy;
                nearestDistance = distance;
            }
        });
        
        return nearest;
    }
    
    createLightningChain(initialTarget, enemies, player) {
        const hitEnemies = new Set();
        let currentTarget = initialTarget;
        let chainLength = 0;
        const maxChains = this.chainCount;
        
        while (currentTarget && chainLength < maxChains) {
            if (hitEnemies.has(currentTarget)) break;
            
            hitEnemies.add(currentTarget);
            
            // Apply damage with critical hit chance
            let finalDamage = this.damage * player.damage;
            let isCrit = false;
            if (Math.random() < player.criticalHit) {
                finalDamage *= 2;
                isCrit = true;
            }
            
            // Apply lifesteal
            if (player.lifesteal > 0) {
                const healAmount = Math.floor(finalDamage * player.lifesteal);
                if (healAmount > 0) {
                    player.health = Math.min(player.health + healAmount, player.maxHealth);
                }
            }
            
            currentTarget.takeDamage(finalDamage);
            
            // Apply freeze chance
            if (Math.random() < player.freezeChance) {
                currentTarget.frozen = true;
                currentTarget.freezeTimer = 2000; // 2 seconds
            }
            
            // Create lightning effect
            game.projectiles.push(new ChainLightningEffect(
                player.x, player.y, currentTarget.x, currentTarget.y
            ));
            
            // Find next target in chain
            let nextTarget = null;
            let nextDistance = Infinity;
            
            enemies.forEach(enemy => {
                if (!hitEnemies.has(enemy)) {
                    const distance = Math.sqrt(
                        Math.pow(enemy.x - currentTarget.x, 2) + 
                        Math.pow(enemy.y - currentTarget.y, 2)
                    );
                    
                    if (distance < nextDistance && distance <= this.chainRange) {
                        nextTarget = enemy;
                        nextDistance = distance;
                    }
                }
            });
            
            currentTarget = nextTarget;
            chainLength++;
        }
    }
    
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage += 8;
            this.chainCount += 1;
            this.chainRange += 20;
            this.fireRate = Math.max(600, this.fireRate - 60);
        }
    }
    
    getUpgradeDescription() {
        return `Level ${this.level + 1}: +8 damage, +1 chain target, +20 chain range`;
    }
}

class BoomerangWeapon {
    constructor() {
        this.name = "Boomerang";
        this.damage = 35;
        this.fireRate = 1800; // ms between shots
        this.lastFired = 0;
        this.level = 1;
        this.maxLevel = 8;
        this.speed = 300;
        this.range = 200;
    }
    
    getStatus(player) {
        if (this.lastFired < this.fireRate) {
            return { 
                state: 'cooldown', 
                timeLeft: (this.fireRate - this.lastFired) / 1000,
                maxCooldown: this.fireRate / 1000
            };
        }
        return { state: 'ready', timeLeft: 0, maxCooldown: 0 };
    }
    
    update(deltaTime, enemies, projectiles, player) {
        this.lastFired += deltaTime;
        
        if (this.lastFired >= this.fireRate && enemies.length > 0) {
            const target = this.findNearestEnemy(enemies, player);
            if (target) {
                this.fire(target, projectiles, player);
                this.lastFired = 0;
            }
        }
    }
    
    findNearestEnemy(enemies, player) {
        let nearest = null;
        let nearestDistance = Infinity;
        
        enemies.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - player.x, 2) + 
                Math.pow(enemy.y - player.y, 2)
            );
            
            if (distance < nearestDistance && distance <= this.range) {
                nearest = enemy;
                nearestDistance = distance;
            }
        });
        
        return nearest;
    }
    
    fire(target, projectiles, player) {
        const dx = target.x - player.x;
        const dy = target.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const vx = (dx / distance) * this.speed;
            const vy = (dy / distance) * this.speed;
            
            const finalDamage = this.damage * player.damage;
            projectiles.push(new BoomerangProjectile(
                player.x, player.y, vx, vy, finalDamage, 
                player.x, player.y, player.penetration, player.projectileSize
            ));
        }
    }
    
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.damage += 10;
            this.speed += 30;
            this.range += 25;
            this.fireRate = Math.max(1000, this.fireRate - 100);
        }
    }
    
    getUpgradeDescription() {
        return `Level ${this.level + 1}: +10 damage, +30 speed, +25 range`;
    }
}

// New Projectile Classes

class GrenadeProjectile extends Projectile {
    constructor(x, y, targetX, targetY, damage, explosionRadius = 100, sizeMultiplier = 1.0) {
        // Calculate trajectory to target
        const distance = Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2);
        const flightTime = 1.2; // Fixed flight time for consistent arc
        const vx = (targetX - x) / flightTime;
        const vy = (targetY - y) / flightTime;
        
        super(x, y, vx, vy, damage, 0, sizeMultiplier);
        this.baseRadius = 5;
        this.radius = this.baseRadius * sizeMultiplier;
        this.explosionRadius = explosionRadius * sizeMultiplier;
        this.targetX = targetX;
        this.targetY = targetY;
        this.flightTime = flightTime * 1000; // Convert to ms
        this.age = 0;
        this.landed = false;
        this.fuseTime = 150; // 150ms delay after landing
        this.fuseTimer = 0;
        this.rotation = 0;
    }
    
    update(deltaTime) {
        if (!this.landed) {
            const dt = deltaTime / 1000;
            this.x += this.vx * dt;
            this.y += this.vy * dt;
            this.age += deltaTime;
            this.rotation += deltaTime * 0.01; // Spinning grenade
            
            // Check if grenade has reached target or timeout
            if (this.age >= this.flightTime || 
                Math.sqrt((this.x - this.targetX) ** 2 + (this.y - this.targetY) ** 2) < 20) {
                this.landed = true;
                this.x = this.targetX; // Snap to exact target position
                this.y = this.targetY;
                this.vx = 0;
                this.vy = 0;
                
                // Create landing effect
                for (let i = 0; i < 6; i++) {
                    game.particles.push(new ExplosionParticle(this.x, this.y, 0.3));
                }
            }
        } else {
            // Grenade is on ground, start fuse timer
            this.fuseTimer += deltaTime;
            if (this.fuseTimer >= this.fuseTime) {
                this.explode();
                this.active = false;
            }
        }
    }
    
    explode() {
        // Create large explosion particles
        for (let i = 0; i < 20; i++) {
            game.particles.push(new GrenadeExplosionParticle(this.x, this.y, 1.5));
        }
        
        // Create damage zone effect that persists briefly
        game.particles.push(new DamageZone(this.x, this.y, this.explosionRadius, 500));
        
        // Damage enemies in explosion radius
        const allTargets = [...game.enemies];
        if (game.currentBoss) allTargets.push(game.currentBoss);
        
        allTargets.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - this.x, 2) + 
                Math.pow(enemy.y - this.y, 2)
            );
            
            if (distance <= this.explosionRadius) {
                enemy.takeDamage(this.damage);
            }
        });
    }
    
    render(ctx) {
        ctx.save();
        
        if (!this.landed) {
            // Flying grenade - green military style
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            ctx.fillStyle = '#2d5016'; // Dark military green
            ctx.strokeStyle = '#4a7c59'; // Lighter green outline
            ctx.lineWidth = 1.5;
            ctx.shadowColor = '#4a7c59';
            ctx.shadowBlur = 6;
            
            // Main grenade body (oval shape)
            ctx.beginPath();
            ctx.ellipse(0, 0, this.radius, this.radius * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Grenade segments
            ctx.strokeStyle = '#1a3009';
            ctx.lineWidth = 1;
            for (let i = -1; i <= 1; i++) {
                ctx.beginPath();
                ctx.moveTo(-this.radius, i * this.radius * 0.3);
                ctx.lineTo(this.radius, i * this.radius * 0.3);
                ctx.stroke();
            }
            
            // Safety pin (if early in flight)
            if (this.age < 200) {
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(-1, -this.radius - 2, 2, 3);
            }
        } else {
            // Landed grenade - pulsing danger
            const pulseIntensity = Math.sin(this.fuseTimer * 0.02) * 0.5 + 0.5;
            
            ctx.fillStyle = '#2d5016';
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.3 + pulseIntensity * 0.7})`;
            ctx.lineWidth = 2;
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 10 + pulseIntensity * 10;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Danger indicator ring
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.2 + pulseIntensity * 0.3})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.explosionRadius * 0.3, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.restore();
    }
}

class DamageZone {
    constructor(x, y, radius, duration) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.duration = duration;
        this.age = 0;
        this.active = true;
    }
    
    update(deltaTime) {
        this.age += deltaTime;
        if (this.age >= this.duration) {
            this.active = false;
        }
    }
    
    render(ctx) {
        const alpha = Math.max(0, 1 - (this.age / this.duration));
        
        ctx.save();
        ctx.globalAlpha = alpha * 0.3;
        
        // Damage zone circle
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Scorch mark effect
        ctx.globalAlpha = alpha * 0.2;
        ctx.fillStyle = '#330000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class TargetIndicator {
    constructor(x, y, radius, duration = 1350) { // Slightly longer than grenade flight time + fuse
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.active = true;
        this.age = 0;
        this.duration = duration;
        this.pulseSpeed = 0.005;
    }
    
    update(deltaTime) {
        this.age += deltaTime;
        if (this.age >= this.duration) {
            this.active = false;
        }
    }
    
    render(ctx) {
        const pulse = Math.sin(this.age * this.pulseSpeed) * 0.3 + 0.7;
        const fadeAlpha = Math.max(0, 1 - (this.age / this.duration));
        
        ctx.save();
        ctx.globalAlpha = 0.6 * pulse * fadeAlpha;
        
        // Target crosshair
        ctx.strokeStyle = '#44ff44';
        ctx.lineWidth = 2;
        
        // Circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
        ctx.stroke();
        
        // Cross lines
        const lineLength = this.radius * 0.4;
        ctx.beginPath();
        ctx.moveTo(this.x - lineLength, this.y);
        ctx.lineTo(this.x + lineLength, this.y);
        ctx.moveTo(this.x, this.y - lineLength);
        ctx.lineTo(this.x, this.y + lineLength);
        ctx.stroke();
        
        // Corner brackets
        const bracketSize = this.radius * 0.3;
        const offset = this.radius * 0.9;
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const x = this.x + Math.cos(angle) * offset;
            const y = this.y + Math.sin(angle) * offset;
            
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(angle + Math.PI/4) * bracketSize, y + Math.sin(angle + Math.PI/4) * bracketSize);
            ctx.lineTo(x, y);
            ctx.lineTo(x + Math.cos(angle - Math.PI/4) * bracketSize, y + Math.sin(angle - Math.PI/4) * bracketSize);
            ctx.stroke();
        }
        
        ctx.restore();
    }
}

class MineProjectile extends Projectile {
    constructor(x, y, damage, explosionRadius = 70, sizeMultiplier = 1.0) {
        super(x, y, 0, 0, damage, 0, sizeMultiplier);
        this.baseRadius = 8;
        this.radius = this.baseRadius * sizeMultiplier;
        this.explosionRadius = explosionRadius * sizeMultiplier;
        this.triggerRadius = 40;
        this.armed = false;
        this.armTime = 1000; // Arms after 1 second
        this.age = 0;
        this.pulseTime = 0;
    }
    
    update(deltaTime) {
        this.age += deltaTime;
        this.pulseTime += deltaTime;
        
        if (this.age >= this.armTime) {
            this.armed = true;
        }
        
        if (this.armed) {
            // Check for nearby enemies
            const allTargets = [...game.enemies];
            if (game.currentBoss) allTargets.push(game.currentBoss);
            
            allTargets.forEach(enemy => {
                const distance = Math.sqrt(
                    Math.pow(enemy.x - this.x, 2) + 
                    Math.pow(enemy.y - this.y, 2)
                );
                
                if (distance <= this.triggerRadius) {
                    this.explode();
                    this.active = false;
                }
            });
        }
    }
    
    explode() {
        // Create explosion particles
        for (let i = 0; i < 15; i++) {
            game.particles.push(new ExplosionParticle(this.x, this.y));
        }
        
        // Damage enemies in explosion radius
        const allTargets = [...game.enemies];
        if (game.currentBoss) allTargets.push(game.currentBoss);
        
        allTargets.forEach(enemy => {
            const distance = Math.sqrt(
                Math.pow(enemy.x - this.x, 2) + 
                Math.pow(enemy.y - this.y, 2)
            );
            
            if (distance <= this.explosionRadius) {
                enemy.takeDamage(this.damage);
            }
        });
    }
    
    render(ctx) {
        ctx.save();
        
        if (this.armed) {
            // Armed mine - red with pulsing effect
            const pulseScale = 1 + Math.sin(this.pulseTime * 0.01) * 0.2;
            ctx.fillStyle = '#ff0000';
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 5 * pulseScale;
        } else {
            // Unarmed mine - gray
            ctx.fillStyle = '#666666';
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Trigger radius indicator when armed
        if (this.armed) {
            ctx.globalAlpha = 0.2;
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.triggerRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.restore();
    }
}

class ChainLightningEffect extends Projectile {
    constructor(startX, startY, endX, endY) {
        super(startX, startY, 0, 0, 0, 0, 1.0);
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.lifetime = 200; // Lightning effect lasts 200ms
        this.age = 0;
        this.segments = [];
        this.generateLightning();
    }
    
    generateLightning() {
        const segments = 8;
        const dx = this.endX - this.startX;
        const dy = this.endY - this.startY;
        
        this.segments = [{ x: this.startX, y: this.startY }];
        
        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const jitter = 15;
            const x = this.startX + dx * t + (Math.random() - 0.5) * jitter;
            const y = this.startY + dy * t + (Math.random() - 0.5) * jitter;
            this.segments.push({ x, y });
        }
        
        this.segments.push({ x: this.endX, y: this.endY });
    }
    
    update(deltaTime) {
        this.age += deltaTime;
        
        if (this.age >= this.lifetime) {
            this.active = false;
        }
        
        // Regenerate lightning path for flickering effect
        if (Math.random() < 0.3) {
            this.generateLightning();
        }
    }
    
    render(ctx) {
        ctx.save();
        
        const alpha = 1 - (this.age / this.lifetime);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#4444ff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#4444ff';
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        
        for (let i = 1; i < this.segments.length; i++) {
            ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        
        ctx.stroke();
        
        // Secondary thinner lightning
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#8888ff';
        ctx.stroke();
        
        ctx.restore();
    }
}

class BoomerangProjectile extends Projectile {
    constructor(x, y, vx, vy, damage, returnX, returnY, penetration = 0, sizeMultiplier = 1.0) {
        super(x, y, vx, vy, damage, penetration, sizeMultiplier);
        this.baseRadius = 8;
        this.radius = this.baseRadius * sizeMultiplier;
        this.returnX = returnX;
        this.returnY = returnY;
        this.maxDistance = 280 * sizeMultiplier;
        this.returning = false;
        this.distanceTraveled = 0;
        this.rotationAngle = 0;
        this.rotationSpeed = 0.15;
    }
    
    update(deltaTime) {
        const dt = deltaTime / 1000;
        
        if (!this.returning) {
            // Moving outward
            this.x += this.vx * dt;
            this.y += this.vy * dt;
            this.distanceTraveled += Math.sqrt(this.vx * this.vx + this.vy * this.vy) * dt;
            
            if (this.distanceTraveled >= this.maxDistance) {
                this.returning = true;
            }
        } else {
            // Returning to player
            const dx = this.returnX - this.x;
            const dy = this.returnY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 20) {
                this.active = false;
                return;
            }
            
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            this.vx = (dx / distance) * speed * 1.2; // Faster return
            this.vy = (dy / distance) * speed * 1.2;
            
            this.x += this.vx * dt;
            this.y += this.vy * dt;
        }
        
        this.rotationAngle += this.rotationSpeed * deltaTime;
        
        if (this.age >= this.lifetime) {
            this.active = false;
        }
    }
    
    render(ctx) {
        ctx.save();
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationAngle);
        
        const size = this.radius;
        
        // Draw motion trail effect
        if (this.returning) {
            // Returning boomerang - bright green with electric effect
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 15;
            
            // Electric trail effect
            for (let i = 0; i < 3; i++) {
                ctx.save();
                ctx.rotate(i * 0.5);
                ctx.strokeStyle = `rgba(0, 255, 136, ${0.6 - i * 0.2})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, size + i * 3, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
            
            // Main boomerang body - bright green with yellow edge
            ctx.fillStyle = '#00ff88';
            ctx.strokeStyle = '#44ff00';
        } else {
            // Outward boomerang - wooden brown with metallic edge
            ctx.shadowColor = '#cc8800';
            ctx.shadowBlur = 10;
            
            // Spinning air distortion effect
            ctx.strokeStyle = 'rgba(255, 170, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.3, 0, Math.PI * 2);
            ctx.stroke();
            
            // Main boomerang body - wooden brown with metallic trim
            ctx.fillStyle = '#8B4513';
            ctx.strokeStyle = '#FFD700';
        }
        
        ctx.lineWidth = 2;
        
        // Draw detailed boomerang shape with wood grain effect
        ctx.beginPath();
        ctx.moveTo(-size, -size * 0.3);
        ctx.quadraticCurveTo(0, -size, size, -size * 0.3);
        ctx.quadraticCurveTo(size * 0.7, 0, size, size * 0.3);
        ctx.quadraticCurveTo(0, size, -size, size * 0.3);
        ctx.quadraticCurveTo(-size * 0.7, 0, -size, -size * 0.3);
        ctx.fill();
        ctx.stroke();
        
        // Add decorative center grip
        ctx.fillStyle = this.returning ? '#ffffff' : '#654321';
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.2, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Add carved lines for detail
        ctx.strokeStyle = this.returning ? '#00cc66' : '#2F1B14';
        ctx.lineWidth = 1;
        for (let i = -1; i <= 1; i += 2) {
            ctx.beginPath();
            ctx.moveTo(i * size * 0.7, -size * 0.2);
            ctx.lineTo(i * size * 0.3, size * 0.2);
            ctx.stroke();
        }
        
        // Whoosh effect particles
        if (Math.random() < 0.3) {
            const particleCount = this.returning ? 5 : 3;
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 / particleCount) * i + this.rotationAngle;
                const dist = size * 1.5;
                const px = Math.cos(angle) * dist;
                const py = Math.sin(angle) * dist;
                
                ctx.fillStyle = this.returning ? 'rgba(0, 255, 136, 0.6)' : 'rgba(255, 170, 0, 0.4)';
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.restore();
    }
}

class PowerupManager {
    constructor() {
        this.powerups = [
            {
                name: "Increased Damage",
                description: "Increase weapon damage by 20%",
                type: "damage",
                value: 0.2
            },
            {
                name: "Faster Attack",
                description: "Increase attack speed by 15%",
                type: "attackSpeed",
                value: 0.15
            },
            {
                name: "Speed Boost",
                description: "Increase movement speed by 10%",
                type: "moveSpeed",
                value: 0.1
            },
            {
                name: "Health Boost",
                description: "Increase max health by 25",
                type: "health",
                value: 25
            },
            {
                name: "Multi-Shot",
                description: "Weapons fire additional projectiles",
                type: "multishot",
                value: 1
            },
            {
                name: "Regeneration",
                description: "Slowly regenerate health over time",
                type: "regen",
                value: 1
            },
            {
                name: "Penetrating Shots",
                description: "Projectiles penetrate through 1 additional enemy",
                type: "penetration",
                value: 1
            },
            {
                name: "Larger Projectiles",
                description: "Increase projectile size by 25%",
                type: "projectileSize",
                value: 0.25
            },
            {
                name: "Fireball",
                description: "Gain a fireball weapon that explodes on impact",
                type: "weapon",
                value: "fireball"
            },
            {
                name: "Laser",
                description: "Gain a rapid-fire laser weapon",
                type: "weapon",
                value: "laser"
            },
            {
                name: "Sword",
                description: "Gain a melee sword weapon for close combat",
                type: "weapon",
                value: "sword"
            },
            {
                name: "Basic Shot Upgrade",
                description: "Upgrade your basic weapon",
                type: "weapon",
                value: "basic"
            },
            {
                name: "Grenade Launcher",
                description: "Gain explosive grenades that deal area damage",
                type: "weapon",
                value: "grenade"
            },
            {
                name: "Mine Layer",
                description: "Place mines that explode when enemies approach",
                type: "weapon",
                value: "mine"
            },
            {
                name: "Chain Lightning",
                description: "Lightning that jumps between nearby enemies",
                type: "weapon",
                value: "chainlightning"
            },
            {
                name: "Boomerang",
                description: "Returning projectile that hits on both trips",
                type: "weapon",
                value: "boomerang"
            },
            {
                name: "XP Multiplier",
                description: "Increase XP gain by 50%",
                type: "expMultiplier",
                value: 0.5
            },
            {
                name: "Freeze",
                description: "10% chance to freeze enemies for 2 seconds",
                type: "freeze",
                value: 0.1
            },
            {
                name: "Life Steal",
                description: "Gain 1 HP for every 50 damage dealt",
                type: "lifesteal",
                value: 0.02
            },
            {
                name: "Critical Hit",
                description: "10% chance to deal double damage",
                type: "criticalHit",
                value: 0.1
            },
            {
                name: "Reflect",
                description: "20% chance to reflect enemy attacks",
                type: "reflect",
                value: 0.2
            }
        ];
    }
    
    getRandomPowerups(count, player) {
        let availablePowerups = [...this.powerups.filter(p => p.type !== "weapon")];
        
        // Add weapon-specific powerups based on current weapons (only if not max level)
        player.weapons.forEach(weapon => {
            if (weapon.level < weapon.maxLevel) {
                if (weapon instanceof BasicWeapon) {
                    availablePowerups.push({
                        name: `${weapon.name} Level ${weapon.level + 1}`,
                        description: weapon.getUpgradeDescription(),
                        type: "weapon",
                        value: "basic"
                    });
                } else if (weapon instanceof FireballWeapon) {
                    availablePowerups.push({
                        name: `${weapon.name} Level ${weapon.level + 1}`,
                        description: weapon.getUpgradeDescription(),
                        type: "weapon",
                        value: "fireball"
                    });
                } else if (weapon instanceof LaserWeapon) {
                    availablePowerups.push({
                        name: `${weapon.name} Level ${weapon.level + 1}`,
                        description: weapon.getUpgradeDescription(),
                        type: "weapon",
                        value: "laser"
                    });
                } else if (weapon instanceof SwordWeapon) {
                    availablePowerups.push({
                        name: `${weapon.name} Level ${weapon.level + 1}`,
                        description: weapon.getUpgradeDescription(),
                        type: "weapon",
                        value: "sword"
                    });
                } else if (weapon instanceof GrenadeWeapon) {
                    availablePowerups.push({
                        name: `${weapon.name} Level ${weapon.level + 1}`,
                        description: weapon.getUpgradeDescription(),
                        type: "weapon",
                        value: "grenade"
                    });
                } else if (weapon instanceof MineWeapon) {
                    availablePowerups.push({
                        name: `${weapon.name} Level ${weapon.level + 1}`,
                        description: weapon.getUpgradeDescription(),
                        type: "weapon",
                        value: "mine"
                    });
                } else if (weapon instanceof ChainLightningWeapon) {
                    availablePowerups.push({
                        name: `${weapon.name} Level ${weapon.level + 1}`,
                        description: weapon.getUpgradeDescription(),
                        type: "weapon",
                        value: "chainlightning"
                    });
                } else if (weapon instanceof BoomerangWeapon) {
                    availablePowerups.push({
                        name: `${weapon.name} Level ${weapon.level + 1}`,
                        description: weapon.getUpgradeDescription(),
                        type: "weapon",
                        value: "boomerang"
                    });
                }
            }
        });
        
        // Add new weapon options if not owned
        if (!player.weapons.some(w => w instanceof FireballWeapon)) {
            availablePowerups.push({
                name: "Fireball",
                description: "Gain a fireball weapon that explodes on impact",
                type: "weapon",
                value: "fireball"
            });
        }
        
        if (!player.weapons.some(w => w instanceof LaserWeapon)) {
            availablePowerups.push({
                name: "Laser",
                description: "Gain a rapid-fire laser weapon",
                type: "weapon",
                value: "laser"
            });
        }
        
        if (!player.weapons.some(w => w instanceof SwordWeapon)) {
            availablePowerups.push({
                name: "Sword",
                description: "Gain a melee sword weapon for close combat",
                type: "weapon",
                value: "sword"
            });
        }
        
        // Add new weapons if not owned
        if (!player.weapons.some(w => w instanceof GrenadeWeapon)) {
            availablePowerups.push({
                name: "Grenade Launcher",
                description: "Gain explosive grenades that deal area damage",
                type: "weapon",
                value: "grenade"
            });
        }
        
        if (!player.weapons.some(w => w instanceof MineWeapon)) {
            availablePowerups.push({
                name: "Mine Layer",
                description: "Place mines that explode when enemies approach",
                type: "weapon",
                value: "mine"
            });
        }
        
        if (!player.weapons.some(w => w instanceof ChainLightningWeapon)) {
            availablePowerups.push({
                name: "Chain Lightning",
                description: "Lightning that jumps between nearby enemies",
                type: "weapon",
                value: "chainlightning"
            });
        }
        
        if (!player.weapons.some(w => w instanceof BoomerangWeapon)) {
            availablePowerups.push({
                name: "Boomerang",
                description: "Returning projectile that hits on both trips",
                type: "weapon",
                value: "boomerang"
            });
        }
        
        const shuffled = availablePowerups.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    applyPowerup(powerup, player) {
        switch (powerup.type) {
            case "damage":
                player.damage += powerup.value;
                player.weapons.forEach(weapon => {
                    weapon.damage = Math.floor(weapon.damage * (1 + powerup.value));
                });
                break;
            case "attackSpeed":
                player.attackSpeed += powerup.value;
                player.weapons.forEach(weapon => {
                    if (weapon.fireRate) {
                        weapon.fireRate = Math.floor(weapon.fireRate * (1 - powerup.value));
                    }
                    if (weapon.attackRate) {
                        weapon.attackRate = Math.floor(weapon.attackRate * (1 - powerup.value));
                    }
                });
                break;
            case "moveSpeed":
                player.moveSpeed += powerup.value;
                break;
            case "health":
                player.maxHealth += powerup.value;
                player.health = Math.min(player.health + powerup.value, player.maxHealth);
                break;
            case "multishot":
                player.multishot += powerup.value;
                break;
            case "regen":
                // TODO: Implement regeneration
                break;
            case "penetration":
                player.penetration += powerup.value;
                break;
            case "projectileSize":
                player.projectileSize += powerup.value;
                break;
            case "expMultiplier":
                player.expMultiplier += powerup.value;
                break;
            case "freeze":
                player.freezeChance += powerup.value;
                break;
            case "lifesteal":
                player.lifesteal += powerup.value;
                break;
            case "criticalHit":
                player.criticalHit += powerup.value;
                break;
            case "reflect":
                player.reflect += powerup.value;
                break;
            case "weapon":
                // Add new weapon or upgrade existing one
                switch (powerup.value) {
                    case "fireball":
                        let fireballWeapon = player.weapons.find(w => w instanceof FireballWeapon);
                        if (fireballWeapon) {
                            fireballWeapon.upgrade();
                        } else {
                            player.weapons.push(new FireballWeapon());
                        }
                        break;
                    case "laser":
                        let laserWeapon = player.weapons.find(w => w instanceof LaserWeapon);
                        if (laserWeapon) {
                            laserWeapon.upgrade();
                        } else {
                            player.weapons.push(new LaserWeapon());
                        }
                        break;
                    case "sword":
                        let swordWeapon = player.weapons.find(w => w instanceof SwordWeapon);
                        if (swordWeapon) {
                            swordWeapon.upgrade();
                        } else {
                            player.weapons.push(new SwordWeapon());
                        }
                        break;
                    case "basic":
                        let basicWeapon = player.weapons.find(w => w instanceof BasicWeapon);
                        if (basicWeapon) {
                            basicWeapon.upgrade();
                        }
                        break;
                    case "grenade":
                        let grenadeWeapon = player.weapons.find(w => w instanceof GrenadeWeapon);
                        if (grenadeWeapon) {
                            grenadeWeapon.upgrade();
                        } else {
                            player.weapons.push(new GrenadeWeapon());
                        }
                        break;
                    case "mine":
                        let mineWeapon = player.weapons.find(w => w instanceof MineWeapon);
                        if (mineWeapon) {
                            mineWeapon.upgrade();
                        } else {
                            player.weapons.push(new MineWeapon());
                        }
                        break;
                    case "chainlightning":
                        let chainWeapon = player.weapons.find(w => w instanceof ChainLightningWeapon);
                        if (chainWeapon) {
                            chainWeapon.upgrade();
                        } else {
                            player.weapons.push(new ChainLightningWeapon());
                        }
                        break;
                    case "boomerang":
                        let boomerangWeapon = player.weapons.find(w => w instanceof BoomerangWeapon);
                        if (boomerangWeapon) {
                            boomerangWeapon.upgrade();
                        } else {
                            player.weapons.push(new BoomerangWeapon());
                        }
                        break;
                }
                break;
        }
    }
}

// Save System
class SaveManager {
    constructor() {
        this.currentSlot = null;
        this.SAVE_VERSION = "1.1.0"; // Current save format version
        this.loadMetaProgression();
    }
    
    // Define the default save structure for new saves
    getDefaultSaveData() {
        return {
            version: this.SAVE_VERSION,
            diamonds: 0,
            highScore: 0,
            totalTimePlayed: 0,
            gamesPlayed: 0,
            metaUpgrades: { 
                health: 0, 
                damage: 0, 
                speed: 0, 
                luck: 0,
                attackSpeed: 0,
                penetration: 0,
                multishot: 0,
                xpBoost: 0,
                invincibility: 0,
                pickupRange: 0,
                projectileSize: 0,
                bossTimer: 0
            },
            // Future features can be added here with default values
            playerStats: {
                totalEnemiesKilled: 0,
                totalDamageDone: 0,
                longestSurvivalTime: 0
            },
            unlockedFeatures: {
                penetratingShots: false,
                multiShot: false,
                regeneration: false
            },
            achievements: []
        };
    }
    
    // Migrate old save data to new format
    migrateSaveData(oldData) {
        const newData = this.getDefaultSaveData();
        
        // Copy existing data from old save
        if (oldData.diamonds !== undefined) newData.diamonds = oldData.diamonds;
        if (oldData.highScore !== undefined) newData.highScore = oldData.highScore;
        if (oldData.totalTimePlayed !== undefined) newData.totalTimePlayed = oldData.totalTimePlayed;
        if (oldData.gamesPlayed !== undefined) newData.gamesPlayed = oldData.gamesPlayed;
        
        // Handle metaUpgrades - ensure all fields exist
        if (oldData.metaUpgrades) {
            newData.metaUpgrades.health = oldData.metaUpgrades.health || 0;
            newData.metaUpgrades.damage = oldData.metaUpgrades.damage || 0;
            newData.metaUpgrades.speed = oldData.metaUpgrades.speed || 0;
            newData.metaUpgrades.luck = oldData.metaUpgrades.luck || 0;
            newData.metaUpgrades.attackSpeed = oldData.metaUpgrades.attackSpeed || 0;
            newData.metaUpgrades.penetration = oldData.metaUpgrades.penetration || 0;
            newData.metaUpgrades.multishot = oldData.metaUpgrades.multishot || 0;
            newData.metaUpgrades.xpBoost = oldData.metaUpgrades.xpBoost || 0;
            newData.metaUpgrades.invincibility = oldData.metaUpgrades.invincibility || 0;
            newData.metaUpgrades.pickupRange = oldData.metaUpgrades.pickupRange || 0;
            newData.metaUpgrades.projectileSize = oldData.metaUpgrades.projectileSize || 0;
            newData.metaUpgrades.bossTimer = oldData.metaUpgrades.bossTimer || 0;
        }
        
        // Preserve any other fields that might exist
        Object.keys(oldData).forEach(key => {
            if (!newData.hasOwnProperty(key) && key !== 'version') {
                newData[key] = oldData[key];
            }
        });
        
        // Mark as migrated
        newData.version = this.SAVE_VERSION;
        
        return newData;
    }
    
    // Check if save data needs migration
    needsMigration(saveData) {
        return !saveData.version || saveData.version !== this.SAVE_VERSION;
    }
    
    save(slot, gameData) {
        const currentData = this.getSaveData(slot);
        
        // Update the existing save data structure
        const saveData = {
            ...currentData, // Preserve all existing fields
            version: this.SAVE_VERSION,
            diamonds: currentData.diamonds + (gameData.diamonds || 0),
            highScore: Math.max(currentData.highScore, gameData.score || 0),
            totalTimePlayed: currentData.totalTimePlayed + (gameData.gameTime || 0),
            gamesPlayed: currentData.gamesPlayed + 1,
            metaUpgrades: currentData.metaUpgrades
        };
        
        // Update player stats if available
        if (saveData.playerStats) {
            saveData.playerStats.totalEnemiesKilled += gameData.enemiesKilled || 0;
            saveData.playerStats.totalDamageDone += gameData.totalDamage || 0;
            saveData.playerStats.longestSurvivalTime = Math.max(
                saveData.playerStats.longestSurvivalTime, 
                gameData.gameTime || 0
            );
        }
        
        localStorage.setItem(`skeletonSurvivors_slot${slot}`, JSON.stringify(saveData));
        this.updateSlotDisplay(slot);
    }
    
    getSaveData(slot) {
        const data = localStorage.getItem(`skeletonSurvivors_slot${slot}`);
        
        if (!data) {
            // Return fresh default save data for new saves
            return this.getDefaultSaveData();
        }
        
        try {
            const parsedData = JSON.parse(data);
            
            // Check if migration is needed
            if (this.needsMigration(parsedData)) {
                console.log(`Migrating save slot ${slot} to version ${this.SAVE_VERSION}`);
                const migratedData = this.migrateSaveData(parsedData);
                
                // Validate migrated data
                const validatedData = this.validateSaveData(migratedData);
                
                // Save the migrated and validated data immediately
                localStorage.setItem(`skeletonSurvivors_slot${slot}`, JSON.stringify(validatedData));
                
                return validatedData;
            }
            
            // Validate existing data for integrity
            const validatedData = this.validateSaveData(parsedData);
            
            // Save back if validation made changes
            if (JSON.stringify(validatedData) !== JSON.stringify(parsedData)) {
                localStorage.setItem(`skeletonSurvivors_slot${slot}`, JSON.stringify(validatedData));
            }
            
            return validatedData;
        } catch (error) {
            console.error(`Error loading save slot ${slot}:`, error);
            console.log(`Creating new save data for slot ${slot}`);
            
            // Return default data if parsing fails
            return this.getDefaultSaveData();
        }
    }
    
    // Safe accessor for save data properties with fallback defaults
    getSaveProperty(slot, propertyPath, defaultValue = null) {
        const saveData = this.getSaveData(slot);
        const keys = propertyPath.split('.');
        let current = saveData;
        
        for (const key of keys) {
            if (current && current.hasOwnProperty(key)) {
                current = current[key];
            } else {
                return defaultValue;
            }
        }
        
        return current !== undefined ? current : defaultValue;
    }
    
    // Set save data property safely
    setSaveProperty(slot, propertyPath, value) {
        const saveData = this.getSaveData(slot);
        const keys = propertyPath.split('.');
        let current = saveData;
        
        // Navigate to the parent object
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        // Set the final property
        current[keys[keys.length - 1]] = value;
        
        // Save back to localStorage
        localStorage.setItem(`skeletonSurvivors_slot${slot}`, JSON.stringify(saveData));
    }
    
    deleteSave(slot) {
        localStorage.removeItem(`skeletonSurvivors_slot${slot}`);
        this.updateSlotDisplay(slot);
    }
    
    // Validate and repair save data if needed
    validateSaveData(saveData) {
        const defaultData = this.getDefaultSaveData();
        let wasRepaired = false;
        
        // Ensure all required numeric fields are valid numbers
        const numericFields = ['diamonds', 'highScore', 'totalTimePlayed', 'gamesPlayed'];
        numericFields.forEach(field => {
            if (typeof saveData[field] !== 'number' || isNaN(saveData[field]) || saveData[field] < 0) {
                saveData[field] = defaultData[field];
                wasRepaired = true;
            }
        });
        
        // Ensure metaUpgrades object exists and has valid values
        if (!saveData.metaUpgrades || typeof saveData.metaUpgrades !== 'object') {
            saveData.metaUpgrades = defaultData.metaUpgrades;
            wasRepaired = true;
        } else {
            Object.keys(defaultData.metaUpgrades).forEach(key => {
                if (typeof saveData.metaUpgrades[key] !== 'number' || 
                    isNaN(saveData.metaUpgrades[key]) || 
                    saveData.metaUpgrades[key] < 0) {
                    saveData.metaUpgrades[key] = defaultData.metaUpgrades[key];
                    wasRepaired = true;
                }
            });
        }
        
        // Ensure arrays exist
        if (!Array.isArray(saveData.achievements)) {
            saveData.achievements = defaultData.achievements;
            wasRepaired = true;
        }
        
        if (wasRepaired) {
            console.log('Save data was repaired during validation');
        }
        
        return saveData;
    }
    
    updateSlotDisplay(slot) {
        const saveData = this.getSaveData(slot);
        const slotInfo = document.getElementById(`slot${slot}Info`);
        
        if (saveData.gamesPlayed === 0) {
            slotInfo.innerHTML = '<p>Empty Slot</p>';
        } else {
            slotInfo.innerHTML = `
                <p>High Score: ${saveData.highScore}</p>
                <p>💎 Diamonds: ${saveData.diamonds}</p>
                <p>Games: ${saveData.gamesPlayed}</p>
            `;
        }
    }
    
    loadMetaProgression() {
        // Meta progression is now per-slot, no global loading needed
    }
    
    saveSlotData(slot) {
        const saveData = this.getSaveData(slot);
        localStorage.setItem(`skeletonSurvivors_slot${slot}`, JSON.stringify(saveData));
        this.updateSlotDisplay(slot);
    }
    
    updateMetaDisplay(slot) {
        if (!slot) return;
        
        const saveData = this.getSaveData(slot);
        const metaUpgrades = saveData.metaUpgrades;
        
        // Update diamonds display
        const diamondsElement = document.getElementById('metaDiamonds');
        if (diamondsElement) {
            diamondsElement.textContent = saveData.diamonds;
        }
        
        // Define all upgrade configurations
        const upgradeConfig = {
            health: { baseCost: 10, maxLevel: 10 },
            damage: { baseCost: 15, maxLevel: 10 },
            speed: { baseCost: 20, maxLevel: 10 },
            luck: { baseCost: 25, maxLevel: 10 },
            attackSpeed: { baseCost: 18, maxLevel: 10 },
            penetration: { baseCost: 30, maxLevel: 5 },
            multishot: { baseCost: 40, maxLevel: 3 },
            xpBoost: { baseCost: 22, maxLevel: 10 },
            invincibility: { baseCost: 35, maxLevel: 5 },
            pickupRange: { baseCost: 12, maxLevel: 8 },
            projectileSize: { baseCost: 28, maxLevel: 7 },
            bossTimer: { baseCost: 50, maxLevel: 5 }
        };
        
        // Update all upgrade displays
        Object.keys(upgradeConfig).forEach(type => {
            const config = upgradeConfig[type];
            const currentLevel = metaUpgrades[type] || 0;
            
            this.updateUpgradeButton(type, currentLevel, saveData.diamonds, config.baseCost, config.maxLevel);
        });
    }
    
    updateUpgradeButton(type, level, diamonds, baseCost, maxLevel = 10) {
        // Update level display
        const levelElement = document.getElementById(`${type}UpgradeLevel`);
        if (levelElement) {
            levelElement.textContent = level;
        }
        
        const cost = (level + 1) * baseCost;
        const costElement = document.getElementById(`${type}UpgradeCost`);
        const buttonElement = document.querySelector(`button[onclick="purchaseUpgrade('${type}')"]`);
        
        if (costElement) {
            costElement.textContent = level >= maxLevel ? 'MAX' : cost;
        }
        
        if (buttonElement) {
            if (level >= maxLevel) {
                buttonElement.textContent = 'MAX';
                buttonElement.disabled = true;
            } else if (diamonds >= cost) {
                buttonElement.textContent = 'Upgrade';
                buttonElement.disabled = false;
            } else {
                buttonElement.textContent = 'Not enough 💎';
                buttonElement.disabled = true;
            }
        }
    }
    
    purchaseUpgrade(type) {
        if (!this.currentSlot) return;
        
        const saveData = this.getSaveData(this.currentSlot);
        
        // Define base costs and max levels for each upgrade
        const upgradeConfig = {
            health: { baseCost: 10, maxLevel: 10 },
            damage: { baseCost: 15, maxLevel: 10 },
            speed: { baseCost: 20, maxLevel: 10 },
            luck: { baseCost: 25, maxLevel: 10 },
            attackSpeed: { baseCost: 18, maxLevel: 10 },
            penetration: { baseCost: 30, maxLevel: 5 },
            multishot: { baseCost: 40, maxLevel: 3 },
            xpBoost: { baseCost: 22, maxLevel: 10 },
            invincibility: { baseCost: 35, maxLevel: 5 },
            pickupRange: { baseCost: 12, maxLevel: 8 },
            projectileSize: { baseCost: 28, maxLevel: 7 },
            bossTimer: { baseCost: 50, maxLevel: 5 }
        };
        
        const config = upgradeConfig[type];
        if (!config) return;
        
        const currentLevel = saveData.metaUpgrades[type] || 0;
        const cost = (currentLevel + 1) * config.baseCost;
        
        if (saveData.diamonds >= cost && currentLevel < config.maxLevel) {
            saveData.diamonds -= cost;
            saveData.metaUpgrades[type]++;
            localStorage.setItem(`skeletonSurvivors_slot${this.currentSlot}`, JSON.stringify(saveData));
            this.updateMetaDisplay(this.currentSlot);
            this.updateCharacterStats(this.currentSlot);
        }
    }
    
    updateCharacterStats(slot) {
        const saveData = this.getSaveData(slot);
        document.getElementById('charHighScore').textContent = saveData.highScore;
        document.getElementById('charGamesPlayed').textContent = saveData.gamesPlayed;
        document.getElementById('charTotalDiamonds').textContent = saveData.diamonds;
    }
}

// Menu Functions
let saveManager = null;
let game = null;

function selectSlot(slot) {
    if (!saveManager) {
        console.error('SaveManager not initialized');
        return;
    }
    
    saveManager.currentSlot = slot;
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('characterMenu').style.display = 'flex';
    
    // Update character menu
    document.getElementById('selectedSlotName').textContent = `Slot ${slot}`;
    saveManager.updateCharacterStats(slot);
}

function startGame() {
    document.getElementById('characterMenu').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('ui').style.display = 'block';
    
    // Make sure canvas is visible and properly sized
    const canvas = document.getElementById('gameCanvas');
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Start the game
    game = new Game(saveManager);
    window.game = game; // Make game globally accessible
}

function backToCharacterSelect() {
    document.getElementById('characterMenu').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
    saveManager.currentSlot = null;
}

function deleteSave(slot) {
    if (confirm('Are you sure you want to delete this save?')) {
        saveManager.deleteSave(slot);
    }
}

function openMetaProgression() {
    document.getElementById('characterMenu').style.display = 'none';
    document.getElementById('metaProgressionMenu').style.display = 'flex';
    
    // Update meta progression display
    document.getElementById('metaSlotName').textContent = `Slot ${saveManager.currentSlot}`;
    saveManager.updateMetaDisplay(saveManager.currentSlot);
}

function closeMetaProgression() {
    document.getElementById('metaProgressionMenu').style.display = 'none';
    document.getElementById('characterMenu').style.display = 'flex';
    saveManager.updateCharacterStats(saveManager.currentSlot);
}

function purchaseUpgrade(type) {
    saveManager.purchaseUpgrade(type);
}

function returnToMenu() {
    if (game && saveManager.currentSlot) {
        // Save game data including diamonds
        saveManager.save(saveManager.currentSlot, game);
        
        // Hide pause menu and reset pause state
        game.hidePauseMenu();
        game.isPaused = false;
    }
    
    document.getElementById('characterMenu').style.display = 'flex';
    document.getElementById('gameCanvas').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('ui').style.display = 'none';
    
    // Update character stats and all slot displays
    saveManager.updateCharacterStats(saveManager.currentSlot);
    for (let i = 1; i <= 3; i++) {
        saveManager.updateSlotDisplay(i);
    }
}

function restartGame() {
    document.getElementById('gameOver').style.display = 'none';
    game = new Game(saveManager);
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize save manager and update displays
    saveManager = new SaveManager();
    for (let i = 1; i <= 3; i++) {
        saveManager.updateSlotDisplay(i);
    }
    
    // Show main menu by default
    document.getElementById('mainMenu').style.display = 'flex';
    document.getElementById('gameCanvas').style.display = 'none';
});