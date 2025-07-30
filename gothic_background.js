// Gothic Medieval Background System - Much better for skeletons and zombies!
class GothicBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.time = 0;
        
        // Gothic background layers for dark atmosphere
        this.trees = [];
        this.mist = [];
        this.ruins = [];
        this.fog = [];
        this.particles = [];
        this.torchLights = [];
        this.tombstones = [];
        this.bats = [];
        
        // Animation properties
        this.gameIntensity = 0; // Increases with game progression
        this.warningIntensity = 0; // For boss warnings
        
        this.initializeTrees();
        this.initializeMist();
        this.initializeRuins();
        this.initializeFog();
        this.initializeParticles();
        this.initializeTorchLights();
        this.initializeTombstones();
        this.initializeBats();
    }
    
    initializeTrees() {
        // Distant dark trees silhouettes
        for (let i = 0; i < 60; i++) {
            this.trees.push({
                x: Math.random() * this.canvas.width * 4 - this.canvas.width,
                y: this.canvas.height * 0.5 + Math.random() * this.canvas.height * 0.3,
                width: Math.random() * 100 + 50,
                height: Math.random() * 250 + 150,
                sway: Math.random() * 0.02 + 0.01,
                swayOffset: Math.random() * Math.PI * 2,
                darkness: Math.random() * 0.2 + 0.8,
                branches: Math.floor(Math.random() * 4) + 3
            });
        }
    }
    
    initializeMist() {
        // Atmospheric mist layers
        for (let i = 0; i < 25; i++) {
            this.mist.push({
                x: Math.random() * this.canvas.width * 3,
                y: Math.random() * this.canvas.height,
                width: Math.random() * 400 + 200,
                height: Math.random() * 120 + 60,
                opacity: Math.random() * 0.2 + 0.05,
                drift: {
                    x: (Math.random() - 0.5) * 0.3,
                    y: (Math.random() - 0.5) * 0.1
                },
                pulseSpeed: Math.random() * 0.003 + 0.001
            });
        }
    }
    
    initializeRuins() {
        // Ancient stone ruins and pillars
        for (let i = 0; i < 18; i++) {
            this.ruins.push({
                x: Math.random() * this.canvas.width * 3,
                y: this.canvas.height * 0.6 + Math.random() * this.canvas.height * 0.3,
                width: Math.random() * 80 + 40,
                height: Math.random() * 180 + 100,
                type: ['pillar', 'wall', 'arch'][Math.floor(Math.random() * 3)],
                weathering: Math.random() * 0.4 + 0.3,
                shadow: Math.random() * 0.3 + 0.1,
                cracks: Math.floor(Math.random() * 3) + 1
            });
        }
    }
    
    initializeFog() {
        // Ground-level fog
        for (let i = 0; i < 40; i++) {
            this.fog.push({
                x: Math.random() * this.canvas.width * 3,
                y: this.canvas.height * 0.7 + Math.random() * this.canvas.height * 0.4,
                width: Math.random() * 250 + 150,
                height: Math.random() * 80 + 40,
                opacity: Math.random() * 0.25 + 0.1,
                drift: {
                    x: (Math.random() - 0.5) * 0.6,
                    y: (Math.random() - 0.5) * 0.2
                },
                swirl: Math.random() * 0.008 + 0.003
            });
        }
    }
    
    initializeTorchLights() {
        // Flickering torch/firelight effects
        for (let i = 0; i < 12; i++) {
            this.torchLights.push({
                x: Math.random() * this.canvas.width * 3,
                y: this.canvas.height * 0.3 + Math.random() * this.canvas.height * 0.5,
                intensity: Math.random() * 0.5 + 0.3,
                flickerSpeed: Math.random() * 0.15 + 0.08,
                flickerOffset: Math.random() * Math.PI * 2,
                color: Math.random() > 0.3 ? 'rgba(255, 140, 0, 0.4)' : 'rgba(255, 69, 0, 0.35)',
                radius: Math.random() * 120 + 100
            });
        }
    }
    
    initializeTombstones() {
        // Graveyard tombstones
        for (let i = 0; i < 25; i++) {
            this.tombstones.push({
                x: Math.random() * this.canvas.width * 3,
                y: this.canvas.height * 0.65 + Math.random() * this.canvas.height * 0.25,
                width: Math.random() * 25 + 15,
                height: Math.random() * 50 + 30,
                tilt: (Math.random() - 0.5) * 0.3,
                weathering: Math.random() * 0.5 + 0.2,
                type: Math.random() > 0.5 ? 'cross' : 'stone'
            });
        }
    }
    
    initializeBats() {
        // Flying bats for atmosphere
        for (let i = 0; i < 15; i++) {
            this.bats.push({
                x: Math.random() * this.canvas.width * 3,
                y: Math.random() * this.canvas.height * 0.6,
                size: Math.random() * 8 + 4,
                speed: Math.random() * 2 + 1,
                direction: Math.random() * Math.PI * 2,
                wingBeat: Math.random() * Math.PI * 2,
                wingSpeed: Math.random() * 0.3 + 0.2
            });
        }
    }
    
    initializeParticles() {
        // Atmospheric particles (ash, dust, floating spirits)
        for (let i = 0; i < 200; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width * 3,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 0.5,
                opacity: Math.random() * 0.6 + 0.1,
                drift: {
                    x: (Math.random() - 0.5) * 0.4,
                    y: Math.random() * 0.2 + 0.05
                },
                type: ['ash', 'dust', 'spirit'][Math.floor(Math.random() * 3)],
                life: Math.random() * 2000,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    update(deltaTime, gameState = {}) {
        this.time += deltaTime;
        
        // Update game intensity and warning effects
        this.gameIntensity = Math.min((gameState.level || 1) * 0.1, 1);
        this.warningIntensity = gameState.bossWarning ? 0.8 : 0;
        
        // Update mist
        this.mist.forEach(mist => {
            mist.x += mist.drift.x * deltaTime * 0.01;
            mist.y += mist.drift.y * deltaTime * 0.01;
            
            // Wrap around
            if (mist.x > this.canvas.width * 3) mist.x = -mist.width;
            if (mist.x < -mist.width) mist.x = this.canvas.width * 3;
        });
        
        // Update fog
        this.fog.forEach(fog => {
            fog.x += fog.drift.x * deltaTime * 0.01;
            fog.y += Math.sin(this.time * fog.swirl) * 0.1;
            
            if (fog.x > this.canvas.width * 3) fog.x = -fog.width;
            if (fog.x < -fog.width) fog.x = this.canvas.width * 3;
        });
        
        // Update bats
        this.bats.forEach(bat => {
            bat.x += Math.cos(bat.direction) * bat.speed * deltaTime * 0.01;
            bat.y += Math.sin(bat.direction) * bat.speed * deltaTime * 0.01;
            bat.wingBeat += bat.wingSpeed * deltaTime * 0.01;
            
            // Change direction occasionally
            if (Math.random() < 0.002) {
                bat.direction += (Math.random() - 0.5) * 0.5;
            }
            
            // Wrap around
            if (bat.x > this.canvas.width * 3) bat.x = 0;
            if (bat.x < 0) bat.x = this.canvas.width * 3;
            if (bat.y < 0) bat.y = this.canvas.height * 0.6;
            if (bat.y > this.canvas.height * 0.6) bat.y = 0;
        });
        
        // Update particles
        this.particles.forEach((particle, index) => {
            particle.x += particle.drift.x * deltaTime * 0.1;
            particle.y += particle.drift.y * deltaTime * 0.1;
            particle.life += deltaTime;
            particle.pulse += deltaTime * 0.005;
            
            // Wrap particles around screen
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Reset particle if it's lived too long
            if (particle.life > 3000) {
                particle.life = 0;
                particle.x = Math.random() * this.canvas.width * 3;
                particle.y = Math.random() * this.canvas.height;
            }
        });
    }
    
    render(ctx, scroll = {x: 0, y: 0}) {
        const scrollX = scroll.x || 0;
        const scrollY = scroll.y || 0;
        
        // Create dark gothic gradient background
        const gradient = ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.8
        );
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.4, '#16213e');
        gradient.addColorStop(0.8, '#0f0f23');
        gradient.addColorStop(1, '#050510');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 1. Render distant trees (background layer)
        ctx.globalAlpha = 0.3 + this.gameIntensity * 0.1;
        this.trees.forEach(tree => {
            const x = tree.x - scrollX * 0.02;
            const y = tree.y - scrollY * 0.02;
            const sway = Math.sin(this.time * tree.sway + tree.swayOffset) * 5;
            
            if (x + tree.width > 0 && x < this.canvas.width) {
                ctx.fillStyle = `rgba(20, 20, 30, ${tree.darkness})`;
                ctx.beginPath();
                ctx.ellipse(x + sway, y, tree.width / 2, tree.height / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Add some twisted branches
                ctx.strokeStyle = `rgba(15, 15, 25, ${tree.darkness})`;
                ctx.lineWidth = 2;
                for (let i = 0; i < tree.branches; i++) {
                    ctx.beginPath();
                    ctx.moveTo(x + sway, y - tree.height / 3);
                    ctx.lineTo(x + sway + (Math.random() - 0.5) * 40, y - tree.height / 2);
                    ctx.stroke();
                }
            }
        });
        
        // 2. Render ruins and tombstones
        ctx.globalAlpha = 0.4 + this.gameIntensity * 0.15;
        this.ruins.forEach(ruin => {
            const x = ruin.x - scrollX * 0.05;
            const y = ruin.y - scrollY * 0.05;
            
            if (x + ruin.width > 0 && x < this.canvas.width) {
                ctx.fillStyle = `rgba(60, 60, 70, ${0.8 - ruin.weathering})`;
                ctx.fillRect(x, y - ruin.height, ruin.width, ruin.height);
                
                // Add weathering effects
                ctx.fillStyle = `rgba(40, 40, 50, ${ruin.weathering})`;
                for (let i = 0; i < ruin.cracks; i++) {
                    ctx.fillRect(x + Math.random() * ruin.width, y - Math.random() * ruin.height, 2, Math.random() * 20);
                }
            }
        });
        
        this.tombstones.forEach(tomb => {
            const x = tomb.x - scrollX * 0.08;
            const y = tomb.y - scrollY * 0.08;
            
            if (x + tomb.width > 0 && x < this.canvas.width) {
                ctx.save();
                ctx.translate(x + tomb.width / 2, y);
                ctx.rotate(tomb.tilt);
                ctx.fillStyle = `rgba(80, 80, 90, ${0.9 - tomb.weathering})`;
                ctx.fillRect(-tomb.width / 2, -tomb.height, tomb.width, tomb.height);
                
                if (tomb.type === 'cross') {
                    ctx.fillRect(-tomb.width / 6, -tomb.height * 0.8, tomb.width / 3, tomb.height / 4);
                }
                ctx.restore();
            }
        });
        
        // 3. Render mist layers
        ctx.globalAlpha = 0.6;
        this.mist.forEach(mist => {
            const x = mist.x - scrollX * 0.03;
            const y = mist.y - scrollY * 0.03;
            const pulse = 1 + Math.sin(this.time * mist.pulseSpeed) * 0.2;
            
            ctx.fillStyle = `rgba(200, 200, 220, ${mist.opacity * pulse})`;
            ctx.beginPath();
            ctx.ellipse(x, y, mist.width / 2 * pulse, mist.height / 2, 0, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 4. Render torch lights
        ctx.globalAlpha = 0.5 + this.warningIntensity * 0.3;
        this.torchLights.forEach(torch => {
            const x = torch.x - scrollX * 0.06;
            const y = torch.y - scrollY * 0.06;
            const flicker = 0.8 + Math.sin(this.time * torch.flickerSpeed + torch.flickerOffset) * 0.2;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, torch.radius * flicker);
            gradient.addColorStop(0, torch.color.replace('0.4', (0.4 * flicker).toString()));
            gradient.addColorStop(0.5, torch.color.replace('0.4', (0.2 * flicker).toString()));
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, torch.radius * flicker, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 5. Render fog
        ctx.globalAlpha = 0.3;
        this.fog.forEach(fog => {
            const x = fog.x - scrollX * 0.1;
            const y = fog.y - scrollY * 0.1;
            
            ctx.fillStyle = `rgba(160, 160, 180, ${fog.opacity})`;
            ctx.beginPath();
            ctx.ellipse(x, y, fog.width / 2, fog.height / 2, 0, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 6. Render bats
        ctx.globalAlpha = 0.7;
        this.bats.forEach(bat => {
            const x = bat.x - scrollX * 0.12;
            const y = bat.y - scrollY * 0.12;
            const wingSpread = Math.sin(bat.wingBeat) * 0.5 + 0.5;
            
            ctx.fillStyle = 'rgba(40, 40, 50, 0.8)';
            ctx.beginPath();
            ctx.ellipse(x, y, bat.size * (1 + wingSpread), bat.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 7. Render particles
        ctx.globalAlpha = 0.6;
        this.particles.forEach(particle => {
            const x = particle.x - scrollX * 0.15;
            const y = particle.y - scrollY * 0.15;
            const pulse = particle.type === 'spirit' ? 
                0.5 + Math.sin(particle.pulse) * 0.3 : 1;
            
            let color = 'rgba(200, 200, 200, ' + (particle.opacity * pulse) + ')';
            if (particle.type === 'ash') color = 'rgba(100, 100, 120, ' + (particle.opacity * pulse) + ')';
            if (particle.type === 'spirit') color = 'rgba(150, 200, 255, ' + (particle.opacity * pulse * 0.7) + ')';
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, particle.size * pulse, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 8. Render world-aligned grid (kept for gameplay reference)
        ctx.globalAlpha = 0.08 + this.gameIntensity * 0.03;
        ctx.strokeStyle = `rgba(100, 100, 120, ${0.3 + this.warningIntensity * 0.2})`;
        ctx.lineWidth = 1;

        const gridSpacing = 80;
        const startX = Math.floor((scrollX * 0.3) / gridSpacing) * gridSpacing - gridSpacing;
        const endX = startX + this.canvas.width + gridSpacing * 2;
        const startY = Math.floor((scrollY * 0.3) / gridSpacing) * gridSpacing - gridSpacing;
        const endY = startY + this.canvas.height + gridSpacing * 2;

        for (let x = startX; x <= endX; x += gridSpacing) {
            ctx.beginPath();
            const screenX = x - scrollX * 0.3;
            ctx.moveTo(screenX, 0);
            ctx.lineTo(screenX, this.canvas.height);
            ctx.stroke();
        }

        for (let y = startY; y <= endY; y += gridSpacing) {
            ctx.beginPath();
            const screenY = y - scrollY * 0.3;
            ctx.moveTo(0, screenY);
            ctx.lineTo(this.canvas.width, screenY);
            ctx.stroke();
        }
        
        // Reset alpha
        ctx.globalAlpha = 1;
    }
    
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Reinitialize elements for new canvas size
        this.trees = [];
        this.mist = [];
        this.ruins = [];
        this.fog = [];
        this.particles = [];
        this.torchLights = [];
        this.tombstones = [];
        this.bats = [];
        
        this.initializeTrees();
        this.initializeMist();
        this.initializeRuins();
        this.initializeFog();
        this.initializeParticles();
        this.initializeTorchLights();
        this.initializeTombstones();
        this.initializeBats();
    }
}