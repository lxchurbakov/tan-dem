import React from 'react';

export const FancyBackground = ({ ...props }) => {
    const imageRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        const image = imageRef.current;

        if (!image) {
            return;
        }

        const onscroll = (e) => {
            const offset = window.scrollY;

            image.style.top = -offset * .5 + 'px';
        };

        window.addEventListener('scroll', onscroll);
        return () => window.removeEventListener('scroll', onscroll);
    }, []);

    return (
        <img style={{ width: '100vw', height: '100vh', objectFit: 'cover', position: 'fixed', zIndex: -1, left: 0, top: 0 }} src="./space.svg" ref={imageRef} />
    );
};

export const SplineBackground = ({ ...props }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        // Init

        const { width, height } = canvas.getBoundingClientRect();
        const pixelDensity = window.devicePixelRatio || 1.0

        canvas.width = width * pixelDensity;
        canvas.height = height * pixelDensity;;

        const context = canvas.getContext('2d');

        if (!context) {
            return
        }

        context.scale(pixelDensity, pixelDensity);

        // Go over bezier curve

        const ctx = context;

        // const points = [
        //     {x:0.0, y:0.5}, {x:0.125, y:0.0}, {x:0.25, y:1.0}, {x:0.375, y:0.0},
        //     {x:0.5, y:1.0}, {x:0.625, y:0.0}, {x:0.75, y:1.0}, {x:0.875, y:0.5}, {x:1, y:0.5}
        // ];

        // function bezier(points, t) {
        //     // De Casteljau's algorithm for any number of points
        //     let pts = points.map(p => ({x:p.x, y:p.y}));
        //     for (let step = pts.length; step > 1; step--) {
        //         for (let i = 0; i < step-1; i++) {
        //             pts[i] = {
        //                 x: pts[i].x * (1-t) + pts[i+1].x * t,
        //                 y: pts[i].y * (1-t) + pts[i+1].y * t
        //             };
        //         }
        //     }
        //     return pts[0];
        // }

        const path = document.querySelector('#test') as any;

        if (!path) {
            return;
        }

        const length = path.getTotalLength();
        // const step = 10; // pixels

        
            
            // draw circle at point.x, point.y
        // }

        const color = (p) => {
            return `hsl(${p * 100 + 200}, 50%, 50%)`;
        };

        // Draw circles every 10px along the curve
        // let lastPoint = bezier(points, 0);
        for (let dist = 0; dist <= length; dist += 10) {
            const point = path.getPointAtLength(dist);

            const x = point.x / 3163;
            const y = point.y / 2090;

            // console.log({ point })
            // const dist = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
            
            // if (dist >= 10) {
                ctx.beginPath();
                ctx.arc(x * (width * 1.5) - (width * .25), y * height * .8 + (height * .1), 120, 0, Math.PI*2);
                ctx.fillStyle = color(dist / length);
                ctx.fill();
                ctx.fillStyle = 'white';
                // ctx.font = 'bold 10px Arial';
                // ctx.fillText('●', point.x-2, point.y+3);
                // lastPoint = point;
            // }
        }

        // Scroll

        const onscroll = (e) => {
            const offset = window.scrollY;

            canvas.style.top = -offset * .5 + 'px';
        };

        window.addEventListener('scroll', onscroll);
        return () => window.removeEventListener('scroll', onscroll);
    }, []);

    return (
        <>
            <svg style={{ display: 'none' }}>
                <path id="test" d="M148.032 1550.82C264.532 1319.65 763.532 662.406 1238.03 280.836C2218.66 -507.739 1264.53 2499.91 873.532 1848.4C739.593 1625.22 1148.22 1129.51 1535.53 894.833C2054.53 580.362 2993.32 -142.811 2445.53 628.335C1711.33 1661.91 2050.19 1657.61 2180.53 1550.82C2532.53 1262.41 2445.53 1279.41 3014.53 628.335" stroke="black" stroke-width="296" stroke-linecap="round"/>
            </svg>

            <canvas style={{ width: '100vw', height: '100vh', objectFit: 'cover', position: 'fixed', zIndex: -1, left: 0, top: 0 }} ref={canvasRef} />
        </>
    );
};
