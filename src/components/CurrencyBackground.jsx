import React from 'react';
import './CurrencyBackground.css';

const CurrencyBackground = () => {
    // Generate particle data only once
    const [particles, setParticles] = React.useState([]);

    React.useEffect(() => {
        const symbols = ['$', '€', '£', '¥', '₹', '₿', 'Ξ', '◈', '∞'];
        const newParticles = [...Array(50)].map(() => {
            const colors = ['#97b85d', '#e33e33', '#FFD700', '#FFC107']; // Green, Red, Gold, Amber
            return {
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                duration: 15 + Math.random() * 20,
                delay: -(Math.random() * 20),
                size: 15 + Math.random() * 30,
                left: Math.random() * 100
            };
        });
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className="absolute font-serif font-bold pointer-events-none currency-symbol"
                    style={{
                        color: particle.color,
                        left: `${particle.left}%`,
                        animation: `float-up ${particle.duration}s linear infinite`,
                        animationDelay: `${particle.delay}s`,
                        fontSize: `${particle.size}px`,
                        textShadow: '0 0 5px currentColor'
                    }}
                >
                    {particle.symbol}
                </div>
            ))}
        </div>
    );
};

export default CurrencyBackground;
