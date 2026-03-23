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
