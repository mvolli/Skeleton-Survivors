// Forest Background Fix - Insert this to replace the space theme
// Replace the GothicBackground class constructor and render method

// NEW CONSTRUCTOR (replace lines 101-128):
constructor(canvas) {
    this.canvas = canvas;
    this.time = 0;
    
    // Gothic forest background layers using downloaded images
    this.forestLayers = {
        backTrees: new Image(),
        middleTrees: new Image(), 
        frontTrees: new Image(),
        lights: new Image()
    };
    this.particles = [];
    
    // Animation properties
    this.gameIntensity = 0;
    this.warningIntensity = 0;
    this.imagesLoaded = 0;
    this.totalImages = 4;
    
    // Load the forest background images
    this.loadBackgroundImages();
    this.initializeParticles();
}

// NEW LOAD IMAGES METHOD (add after constructor):
loadBackgroundImages() {
    this.forestLayers.backTrees.onload = () => this.onImageLoad();
    this.forestLayers.backTrees.src = 'gfx/backgrounds/parallax_forest_pack/layers/parallax-forest-back-trees.png';
    
    this.forestLayers.middleTrees.onload = () => this.onImageLoad();
    this.forestLayers.middleTrees.src = 'gfx/backgrounds/parallax_forest_pack/layers/parallax-forest-middle-trees.png';
    
    this.forestLayers.frontTrees.onload = () => this.onImageLoad();
    this.forestLayers.frontTrees.src = 'gfx/backgrounds/parallax_forest_pack/layers/parallax-forest-front-trees.png';
    
    this.forestLayers.lights.onload = () => this.onImageLoad();
    this.forestLayers.lights.src = 'gfx/backgrounds/parallax_forest_pack/layers/parallax-forest-lights.png';
}

onImageLoad() {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.totalImages) {
        console.log('All forest background images loaded successfully!');
    }
}

// NEW RENDER METHOD (replace the entire space-themed render method):
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
    
    // Only render forest images if they're loaded
    if (this.imagesLoaded === this.totalImages) {
        // 1. Render back trees (most distant layer - slowest parallax)
        this.renderForestLayer(ctx, this.forestLayers.backTrees, scrollX * 0.1, scrollY * 0.05);
        
        // 2. Render middle trees (medium distance)
        this.renderForestLayer(ctx, this.forestLayers.middleTrees, scrollX * 0.2, scrollY * 0.1);
        
        // 3. Render lights (atmospheric effect)
        ctx.globalAlpha = 0.6 + this.warningIntensity * 0.3;
        this.renderForestLayer(ctx, this.forestLayers.lights, scrollX * 0.15, scrollY * 0.08);
        ctx.globalAlpha = 1;
        
        // 4. Render front trees (closest layer - fastest parallax)
        this.renderForestLayer(ctx, this.forestLayers.frontTrees, scrollX * 0.3, scrollY * 0.15);
    }
    
    // 5. Render atmospheric particles
    ctx.globalAlpha = 0.4;
    this.particles.forEach(particle => {
        const x = particle.x - scrollX * 0.2;
        const y = particle.y - scrollY * 0.1;
        
        ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // 6. Render world-aligned grid (kept for gameplay reference)
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = 'rgba(100, 120, 100, 0.3)';
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

// FOREST LAYER RENDERING METHOD (add this method):
renderForestLayer(ctx, image, offsetX, offsetY) {
    if (!image || !image.complete) return;
    
    const imageWidth = image.width;
    const imageHeight = image.height;
    
    // Calculate how many times we need to tile the image
    const tilesX = Math.ceil(this.canvas.width / imageWidth) + 2;
    const tilesY = Math.ceil(this.canvas.height / imageHeight) + 2;
    
    // Calculate starting position for seamless tiling
    const startX = -((offsetX % imageWidth) + imageWidth) % imageWidth;
    const startY = -((offsetY % imageHeight) + imageHeight) % imageHeight;
    
    // Render tiled background
    for (let x = 0; x < tilesX; x++) {
        for (let y = 0; y < tilesY; y++) {
            const drawX = startX + x * imageWidth;
            const drawY = startY + y * imageHeight;
            
            ctx.drawImage(image, drawX, drawY);
        }
    }
}