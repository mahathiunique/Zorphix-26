import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaAmazon, FaMicrosoft, FaApple, FaSpotify, FaAirbnb, FaUber, FaLyft, FaTwitch, FaDiscord, FaSlack, FaBolt, FaGamepad, FaMicrochip, FaServer, FaDatabase } from 'react-icons/fa';

const Sponsors = () => {
    const sponsorsTop = [
        {
            name: 'Google',
            icon: FaGoogle,
            color: '#4285F4',
            desc: 'The global leader in search engine technology, artificial intelligence, and cloud computing. Google is pioneering the future of information access, machine learning, and digital innovation, empowering billions of users and businesses worldwide to achieve more through its diverse ecosystem of products.'
        },
        {
            name: 'Microsoft',
            icon: FaMicrosoft,
            color: '#00A4EF',
            desc: 'A powerhouse in personal computing, cloud infrastructure, and productivity software. Microsoft continues to redefine the digital experience with advancements in AI, gaming, and enterprise solutions, driving productivity and connectivity across the globe.'
        },
        {
            name: 'Tesla',
            icon: FaBolt,
            color: '#E31937',
            desc: 'Revolutionizing the automotive and energy industries with high-performance electric vehicles and sustainable energy solutions. Tesla is accelerating the world’s transition to sustainable energy through cutting-edge battery technology, solar panels, and full self-driving capabilities.'
        },
        {
            name: 'Nvidia',
            icon: FaGamepad,
            color: '#76B900',
            desc: 'The pioneer of GPU-accelerated computing and the engine behind the AI revolution. Nvidia’s innovations in graphics, high-performance computing, and autonomous machines are powering the next generation of discovery, from gaming to healthcare and deep learning.'
        },
        {
            name: 'Amazon',
            icon: FaAmazon,
            color: '#FF9900',
            desc: 'The world’s largest online marketplace and cloud computing platform. Amazon is transforming commerce, logistics, and technology with customer-centric innovations like Prime, AWS, and Alexa, setting the standard for efficiency and scalability in the digital age.'
        },
        {
            name: 'Apple',
            icon: FaApple,
            color: '#A2AAAD',
            desc: 'Renowned for its sleek design and user-centric innovation in consumer electronics. Apple leads the industry with iconic products like the iPhone, Mac, and Apple Watch, creating a seamless ecosystem that integrates hardware, software, and services perfectly.'
        },
        {
            name: 'Intel',
            icon: FaMicrochip,
            color: '#0071C5',
            desc: 'A global leader in semiconductor manufacturing and computing innovation. Intel technologies power the cloud, connect the world, and enable the devices we use every day, driving advancements in AI, 5G network transformation, and the intelligent edge.'
        },
        {
            name: 'IBM',
            icon: FaServer,
            color: '#006699',
            desc: 'A pioneer in hybrid cloud, AI, and enterprise consulting services. IBM integrates technology and expertise to help clients solve their most pressing business challenges, delivering secure and scalable solutions for a complex global economy.'
        },
    ];

    const sponsorsBottom = [
        {
            name: 'AMD',
            icon: FaMicrochip,
            color: '#ED1C24',
            desc: 'Driving innovation in high-performance computing, graphics, and visualization technologies. AMD processors and graphics cards are at the heart of gaming, data centers, and business computing, delivering speed and efficiency for the most demanding workloads.'
        },
        {
            name: 'Oracle',
            icon: FaDatabase,
            color: '#F80000',
            desc: 'A leading provider of database software and cloud engineered systems. Oracle empowers businesses with integrated cloud applications and platform services, helping them manage data with unmatched reliability, security, and performance at scale.'
        },
        {
            name: 'Uber',
            icon: FaUber,
            color: '#000000',
            desc: 'Reimagining the way the world moves for the better. Uber’s platform connects people with rides, food delivery, and freight, creating opportunities and redefining urban mobility through technology and logistical prowess on a global scale.'
        },
        {
            name: 'Airbnb',
            icon: FaAirbnb,
            color: '#FF5A5F',
            desc: 'Revolutionizing the travel industry by offering unique stays and experiences worldwide. Airbnb connects hosts with guests to create a sense of belonging anywhere, fostering community and cultural exchange through its vast global network.'
        },
        {
            name: 'Discord',
            icon: FaDiscord,
            color: '#5865F2',
            desc: 'A voice, video, and text communication service used by over a hundred million people to hang out and talk with their communities and friends. Discord is the place to build relationships and create shared experiences online.'
        },
        {
            name: 'Spotify',
            icon: FaSpotify,
            color: '#1DB954',
            desc: 'The world’s most popular audio streaming subscription service, giving users access to millions of songs and podcasts. Spotify is transforming the music industry by connecting artists with fans and delivering personalized audio experiences.'
        },
        {
            name: 'Twitch',
            icon: FaTwitch,
            color: '#9146FF',
            desc: 'The leading live streaming platform for everything from gaming and sports to music and creative arts. Twitch builds communities around shared interests, allowing creators to interact with their audiences in real-time.'
        },
        {
            name: 'Slack',
            icon: FaSlack,
            color: '#4A154B',
            desc: 'The collaboration hub that brings the right people, information, and tools together to get work done. Slack transforms the way organizations communicate, making work lives simpler, more pleasant, and more productive.'
        },
    ];

    // Duplicate for infinite loop
    const row1 = [...sponsorsTop, ...sponsorsTop, ...sponsorsTop];
    const row2 = [...sponsorsBottom, ...sponsorsBottom, ...sponsorsBottom];

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e33e33]/20 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#97b85d]/20 rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block"
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-2 tracking-tighter mix-blend-difference">
                        ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e33e33] to-[#97b85d]">PARTNERS</span>
                    </h2>
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4"></div>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative flex flex-col gap-16 rotate-[-2deg] scale-105 my-10">
                {/* Row 1: Left to Right */}
                <div className="relative flex overflow-hidden group">
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

                    <motion.div
                        className="flex gap-8"
                        animate={{ x: [0, -4000] }} // Increased distance for wider content
                        transition={{ duration: 60, ease: "linear", repeat: Infinity }} // Slower speed
                    >
                        {row1.map((sponsor, i) => (
                            <SponsorCard key={i} sponsor={sponsor} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Right to Left */}
                <div className="relative flex overflow-hidden group">
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

                    <motion.div
                        className="flex gap-8"
                        animate={{ x: [-4000, 0] }}
                        transition={{ duration: 65, ease: "linear", repeat: Infinity }}
                    >
                        {row2.map((sponsor, i) => (
                            <SponsorCard key={i} sponsor={sponsor} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Stock Ticker Footer */}
            <div className="w-full bg-[#111] border-y border-[#333] mt-20 py-2 relative overflow-hidden">
                <motion.div
                    className="whitespace-nowrap flex gap-12 font-mono text-sm"
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                    {[...Array(10)].map((_, i) => (
                        <React.Fragment key={i}>
                            <span className="text-gray-400">NASDAQ <span className="text-[#97b85d]">▲ 1.2%</span></span>
                            <span className="text-gray-400">BTC <span className="text-[#e33e33]">▼ 0.5%</span></span>
                            <span className="text-gray-400">ETH <span className="text-[#97b85d]">▲ 2.4%</span></span>
                            <span className="text-[#e33e33] font-bold">ZPX <span className="text-[#e33e33]">▲ 1000%</span></span>
                            <span className="text-gray-400">S&P 500 <span className="text-[#97b85d]">▲ 0.8%</span></span>
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Subcomponent for individual cards
const SponsorCard = ({ sponsor }) => (
    <div className="relative group w-[500px] h-[220px] bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 flex flex-col justify-between p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] shrink-0 cursor-pointer overflow-hidden">
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Header: Icon & Name */}
        <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-4">
                <div className="text-4xl text-gray-400 group-hover:text-white transition-colors duration-300">
                    <sponsor.icon style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 group-hover:from-white group-hover:to-gray-300 transition-all duration-300 font-serif uppercase tracking-wider">
                        {sponsor.name}
                    </span>
                    <span className="text-[10px] text-[#e33e33] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                        Official Partner
                    </span>
                </div>
            </div>
        </div>

        {/* Body: Description */}
        <div className="relative z-10 flex-grow">
            <p className="text-gray-500 text-xs leading-relaxed font-mono text-justify group-hover:text-gray-300 transition-colors duration-300">
                {sponsor.desc}
            </p>
        </div>

        {/* Colored Glow on Hover */}
        <div
            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
            style={{ backgroundColor: sponsor.color }}
        ></div>
        <div
            className="absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ backgroundColor: sponsor.color }}
        ></div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
);

export default Sponsors;
