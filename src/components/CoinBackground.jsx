import React from 'react';
import './CoinBackground.css';

const CoinBackground = () => {
    const [coins, setCoins] = React.useState([]);

    React.useEffect(() => {
        const newCoins = [...Array(20)].map(() => ({
            left: Math.random() * 100,
            duration: 15 + Math.random() * 20,
            delay: -(Math.random() * 20),
            size: 20 + Math.random() * 30,
            rotation: Math.random() * 360,
        }));
        setCoins(newCoins);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            {coins.map((coin, i) => (
                <div
                    key={i}
                    className="absolute coin-float"
                    style={{
                        left: `${coin.left}%`,
                        width: `${coin.size}px`,
                        height: `${coin.size}px`,
                        animation: `float-coin ${coin.duration}s linear infinite`,
                        animationDelay: `${coin.delay}s`,
                        opacity: 0.6,
                    }}
                >
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                        <circle cx="50" cy="50" r="45" fill="url(#goldGradient)" stroke="#B8860B" strokeWidth="2" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#B8860B" strokeWidth="1" strokeDasharray="4 2" />
                        <text x="50" y="62" fontSize="40" textAnchor="middle" fill="#B8860B" fontFamily="serif" fontWeight="bold">$</text>

                        <defs>
                            <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100">
                                <stop offset="0%" stopColor="#FFD700" />
                                <stop offset="50%" stopColor="#FDB931" />
                                <stop offset="100%" stopColor="#C59124" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default CoinBackground;
