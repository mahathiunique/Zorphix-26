import React, { useMemo } from 'react';

const CurrencyBackground = () => {
    // Generate particle data only once
    const particles = useMemo(() => {
        // Increased variety and mix of crypto/fiat
        const symbols = ['$', '€', '£', '¥', '₹', '₿', 'Ξ', '◈', '∞'];
        // Increased count for simplified 'more nice' look
        return [...Array(50)].map(() => {
            // Randomize color between Zorphix Red and Green
            const isGreen = Math.random() > 0.5;
            return {
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                color: isGreen ? '#97b85d' : '#e33e33',
                duration: 15 + Math.random() * 20, // Slower, more majestic float
                delay: -(Math.random() * 20), // Negative delay to start mid-animation
                size: 15 + Math.random() * 30,
                left: Math.random() * 100
            };
        });
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

            <style jsx>{`
                @keyframes float-up {
                    0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default CurrencyBackground;
