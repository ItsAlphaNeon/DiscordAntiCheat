/**
 * @name DiscordAnticheat
 * @author AlphaNeon
 * @description Adds a fake EasyAnticheat™ splashscreen to your Discord client.
 * @version 0.0.1
 */

module.exports = class EasyAnticheat {
    constructor(meta) {
        this.loadedImages = [];
    }

    start() {
        // Preload images
        const images = [
            "https://i.ibb.co/wS24Y4p/Discord.png",
            "https://i.ibb.co/RGXdkbp/Easy.png",
            "https://i.ibb.co/kmLKq3H/Black.png"
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
            this.loadedImages.push(img);
        });

        setTimeout(() => {
            this.startSplashscreen();
        }, 50);
    }

    stop() {
        const splashscreen = document.querySelector('div[style*="z-index: 9999"]');
        if (splashscreen) {
            splashscreen.remove();
        }
    }

    startSplashscreen() {
        const splashscreen = document.createElement('div');

        splashscreen.innerHTML = `
            <div class="container">
                <style>
                    .container {
                        position: relative;
                        width: 100vw;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #313338;
                        overflow: hidden;
                        opacity: 1;
                        animation: backgroundFadeOut 2s ease-in-out forwards 5s;
                    }
    
                    .container img {
                        position: absolute;
                        max-width: 100%;
                        max-height: 100%;
                        opacity: 0;
                    }

                    .loading-bar {
                        position: absolute;
                        bottom: 30px;
                        left: 50%;
                        transform: translateX(-50%);
                        height: 5px;
                        width: 0;
                        background-color: #5865f1;
                        border-radius: 3px;
                        animation: loadProgress 3s linear forwards;
                    }
    
                    .fade-in {
                        animation: fadeIn 2s ease-in-out forwards;
                    }

                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }

                    @keyframes loadProgress {
                        to {
                            width: 80%;
                        }
                    }

                    @keyframes backgroundFadeOut {
                        to {
                            opacity: 0;
                        }
                    }
                </style>
                <img src="https://i.ibb.co/kmLKq3H/Black.png" class="fade-in">
                <img src="https://i.ibb.co/wS24Y4p/Discord.png" class="fade-in">
                <img src="https://i.ibb.co/RGXdkbp/Easy.png" class="fade-in">
                <div class="loading-bar"></div>
            </div>
        `;

        splashscreen.style.position = 'fixed';
        splashscreen.style.transform = 'translate(-50%, -50%)';
        splashscreen.style.top = '50%';
        splashscreen.style.left = '50%';
        splashscreen.style.width = '100vw';
        splashscreen.style.height = '100vh';
        splashscreen.style.zIndex = '9999';
        splashscreen.style.pointerEvents = 'none';
        document.body.appendChild(splashscreen);

        setTimeout(() => {
            const imagesAndBar = splashscreen.querySelectorAll('img, .loading-bar');
            imagesAndBar.forEach(el => el.style.display = 'none');
        }, 5000);

        setTimeout(() => {
            splashscreen.remove();
        }, 7000);
    }
};
