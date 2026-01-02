import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBolt, FaPalette, FaTools, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTrophy } from 'react-icons/fa';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import EventModal from './EventModal';

const EventsPage = () => {
    const [activeTab, setActiveTab] = useState('technical');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEventsList, setSelectedEventsList] = useState(() => {
        try {
            const stored = localStorage.getItem('selectedEvents');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });
    const [registeredEventsList, setRegisteredEventsList] = useState([]);

    useEffect(() => {
        // Listen for auth state changes to sync with DB if registered
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, 'registrations', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.events && Array.isArray(data.events)) {
                            // Database has Mixed Case (e.g. "Code Wars"), mapped to Upper Case for local logic
                            const dbEvents = data.events.map(e => e.toUpperCase());

                            // Update state
                            setRegisteredEventsList(dbEvents);

                            // Merge DB events with existing local selection to ensure nothing is lost
                            setSelectedEventsList(prev => {
                                const newSet = new Set([...prev, ...dbEvents]);
                                const newList = Array.from(newSet);
                                localStorage.setItem('selectedEvents', JSON.stringify(newList));
                                return newList;
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error syncing events from DB:", error);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleAddeEvent = (event) => {
        // Prevent removing/toggling if already registered
        if (registeredEventsList.includes(event.title)) return;

        let updatedList;
        // Check if event is already in list (case-insensitive check for robustness, though we prefer exact match based on strategy)
        // We decided to store UPPERCASE. event.title is 'CODE WARS' (uppercase).
        if (selectedEventsList.includes(event.title)) {
            // Remove
            updatedList = selectedEventsList.filter(title => title !== event.title);
        } else {
            // Add
            updatedList = [...selectedEventsList, event.title];
        }
        setSelectedEventsList(updatedList);
        localStorage.setItem('selectedEvents', JSON.stringify(updatedList));
    };

    const categories = [
        { id: 'technical', label: 'TECHNICAL', icon: FaBolt, color: '#e33e33' },
        { id: 'non-technical', label: 'NON-TECHNICAL', icon: FaPalette, color: '#97b85d' },
        { id: 'workshops', label: 'WORKSHOPS', icon: FaTools, color: '#ffa500' },
    ];

    const events = {
        technical: [
            {
                id: 1, title: 'CODE WARS', date: 'March 15', venue: 'Main Lab', team: '2-3', prize: '₹15,000', price: '149', desc: 'The ultimate competitive coding battle. Solve complex algorithms and climb the leaderboard.',
                rules: [
                    'Participants must have a valid symposium ID.',
                    'Use of ChatGPT or any AI tools is strictly prohibited.',
                    'Teams must consist of 2-3 members.',
                    'The decision of the judges is final.'
                ]
            },
            {
                id: 2, title: 'CYBER HEIST', date: 'March 16', venue: 'Security Lab', team: '4', prize: '₹10,000', price: '149', desc: 'A CTF challenge where you hack into secure systems to retrieve the flags.',
                rules: [
                    'Do not attack the game infrastructure.',
                    'Flag sharing is strictly prohibited.',
                    'Tools like Metasploit, Burp Suite, etc., are allowed.'
                ]
            },
            {
                id: 3, title: 'AI NEXUS', date: 'March 15', venue: 'Seminar Hall', team: '2', prize: '₹12,000', price: '149', desc: 'Build and showcase innovative AI models to solve real-world problems.',
                rules: [
                    'Model must be trained on open-source datasets.',
                    'Plagiarism will lead to immediate disqualification.',
                    'Presentation time is limited to 10 minutes.'
                ]
            },
            {
                id: 4, title: 'WEB WIZARDS', date: 'March 16', venue: 'Browsing Centre', team: '2-3', prize: '₹8,000', price: '149', desc: 'Design and deploy a stunning web application within a set timeframe.',
                rules: [
                    'No pre-made templates allowed.',
                    'Code must be pushed to GitHub repository.',
                    'Responsive design is a key evaluation metric.'
                ]
            },
            {
                id: 5, title: 'ROBO RUMBLE', date: 'March 15', venue: 'Open Ground', team: '4', prize: '₹20,000', price: '149', desc: 'Heavy metal mayhem. Build robots to destroy your opponents in the arena.',
                rules: [
                    'Robot weight must not exceed 15kg.',
                    'No flamethrowers or explosives allowed.',
                    'Wireless control is mandatory.'
                ]
            },
            {
                id: 6, title: 'CIRCUITRIX', date: 'March 16', venue: 'Hardware Lab', team: '2', prize: '₹7,000', price: '149', desc: 'Debug complex circuits and design efficient hardware solutions.',
                rules: [
                    'Components will be provided at the venue.',
                    'Bring your own breadboard and multimeter if possible.',
                    'Circuit must be functional to qualify.'
                ]
            },
        ],
        'non-technical': [
            {
                id: 7, title: 'LENS LEGENDS', date: 'March 15', venue: 'Campus wide', team: '1', prize: '₹5,000', price: '99', desc: 'Capture the essence of the symposium through your lens. Photography contest.',
                rules: [
                    'Photos must be taken during the symposium event.',
                    'Basic editing is allowed, but manipulation is not.',
                    'Submit raw files for verification.'
                ]
            },
            {
                id: 8, title: 'MEME MASTERS', date: 'Online', venue: 'Discord', team: '1', prize: '₹3,000', price: '99', desc: 'Create the most hilarious and relatable tech memes.',
                rules: [
                    'Content must be original and related to tech/college life.',
                    'No offensive or political content.',
                    'Memes must be submitted by 5 PM.'
                ]
            },
            {
                id: 9, title: 'GAMING ARENA', date: 'March 15-16', venue: 'Gaming Zone', team: '5', prize: '₹15,000', price: '99', desc: 'Valorant and BGMI tournaments. Dominate the server.',
                rules: [
                    'Bring your own peripherals (mouse, headphones).',
                    'Toxic behavior will result in a ban.',
                    'Matches will be spectated by moderators.'
                ]
            },
            {
                id: 10, title: 'TREASURE HUNT', date: 'March 16', venue: 'Campus wide', team: '3', prize: '₹6,000', price: '99', desc: 'Solve riddles and follow clues to find the hidden treasure.',
                rules: [
                    'Teams must stay together at all times.',
                    'Do not damage college property.',
                    'Time penalty for wrong guesses.'
                ]
            },
            {
                id: 11, title: 'QUIZ BOWL', date: 'March 15', venue: 'Auditorium', team: '2', prize: '₹4,000', price: '99', desc: 'Test your general knowledge and tech trivia skills.',
                rules: [
                    'No mobile phones allowed during the quiz.',
                    'Questions range from tech, sci-fi to general knowledge.',
                    'Buzzer round rules will be explained on spot.'
                ]
            },
        ],
        workshops: [
            {
                id: 12, title: 'ETHICAL HACKING', date: 'March 15', venue: 'Lab 1', team: 'Individual', prize: 'Certificate', price: '199', desc: 'Learn the fundamentals of cybersecurity and penetration testing.',
                rules: [
                    'Laptop is mandatory.',
                    'Pre-install Kali Linux (VM or Dual boot).',
                    'Do not attack college network.'
                ]
            },
            {
                id: 13, title: 'APP DEV', date: 'March 16', venue: 'Lab 2', team: 'Individual', prize: 'Certificate', price: '199', desc: 'Master Flutter and build cross-platform mobile applications.',
                rules: [
                    'Laptop with VS Code and Flutter SDK installed.',
                    'Basic knowledge of programming is recommended.',
                    'Certificate provided upon completion.'
                ]
            },
            {
                id: 14, title: 'BLOCKCHAIN', date: 'March 15', venue: 'Lab 3', team: 'Individual', prize: 'Certificate', price: '199', desc: 'Understand the decentralized web and build your first DApp.',
                rules: [
                    'Laptop required.',
                    'Node.js and Metamask wallet must be installed.',
                    'Introduction to Solidity and Smart Contracts.'
                ]
            },
        ]
    };

    return (
        <div className="min-h-screen text-white font-mono relative overflow-x-hidden">

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

            <div className="relative z-20 container mx-auto px-4 py-24 md:py-32">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter sm:tracking-widest mb-4 glitch-text" data-text="EVENTS">
                        EVENTS
                    </h1>
                    <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#e33e33] via-[#97b85d] to-[#e33e33]"></div>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                        Explore our lineup of competitions and workshops designed to challenge your skills and ignite your passion.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-4 mb-16 pb-4 px-4 custom-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex-shrink-0 relative px-6 py-3 md:px-8 md:py-4 clip-path-polygon transition-all duration-300 group overflow-hidden ${activeTab === cat.id
                                ? 'text-black font-bold'
                                : 'text-gray-400 hover:text-white bg-black/50 border border-white/10'
                                }`}
                            style={{
                                backgroundColor: activeTab === cat.id ? cat.color : 'transparent',
                                borderColor: activeTab === cat.id ? cat.color : '',
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2 tracking-widest text-xs md:text-sm whitespace-nowrap">
                                <cat.icon className="text-lg" /> {cat.label}
                            </span>
                            {activeTab !== cat.id && (
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {events[activeTab].map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="group relative"
                            >
                                {/* Card Background - Massive Realistic Metal Card */}
                                <div className={`relative w-full aspect-[1.58/1] bg-gradient-to-br from-[#1c1c1c] via-[#0d0d0d] to-[#000] rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] flex flex-col transition-all duration-500 transform group-hover:scale-[1.05] group-hover:-translate-y-2 ${registeredEventsList.includes(event.title)
                                    ? 'border-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)] grayscale-[0.3]'
                                    : selectedEventsList.includes(event.title)
                                        ? 'border-2 border-[#97b85d] shadow-[0_0_30px_rgba(151,184,93,0.3)]'
                                        : 'border border-white/5 group-hover:shadow-[0_20px_50px_rgba(227,62,51,0.15)]'
                                    }`}>

                                    {/* Registered Watermark */}
                                    {registeredEventsList.includes(event.title) && (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none rotate-[-30deg]">
                                            <span className="text-6xl md:text-8xl font-black text-blue-500/10 tracking-widest border-4 border-blue-500/10 px-8 py-2 rounded-xl">
                                                REGISTERED
                                            </span>
                                        </div>
                                    )}

                                    {/* Brushed Metal Texture */}
                                    <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

                                    {/* Holographic Sheen */}
                                    <div className="absolute -inset-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[25deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none blur-sm"></div>

                                    {/* World Map Pattern (Subtle) */}
                                    <div className="absolute inset-0 opacity-[0.07] bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/87/World_map_blank_gmt.svg')] bg-cover bg-center mix-blend-overlay"></div>

                                    {/* Card Content */}
                                    <div className="p-5 md:p-7 flex-1 flex flex-col justify-between relative z-10 h-full">

                                        {/* Top Header */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner border border-white/10 ${registeredEventsList.includes(event.title)
                                                    ? 'bg-gradient-to-br from-blue-600 to-blue-900'
                                                    : selectedEventsList.includes(event.title)
                                                        ? 'bg-gradient-to-br from-[#97b85d] to-[#4a5c2d]'
                                                        : 'bg-gradient-to-br from-[#e33e33] to-[#800000]'
                                                    }`}>
                                                    <FaBolt className="text-white text-xs" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold tracking-[0.25em] text-gray-300 uppercase font-mono text-shadow-sm leading-none">ZORPHIX BANK</span>
                                                    <span className={`text-[6px] tracking-[0.2em] uppercase font-mono mt-1 ${registeredEventsList.includes(event.title)
                                                        ? 'text-blue-400'
                                                        : selectedEventsList.includes(event.title)
                                                            ? 'text-[#97b85d]'
                                                            : 'text-[#e33e33]'
                                                        }`}>
                                                        {registeredEventsList.includes(event.title) ? 'REGISTERED MEMBER' : 'WORLD ELITE'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[8px] font-mono text-white/40 tracking-widest border border-white/20 px-1 rounded">DEBIT</span>
                                                {/* Contactless Icon */}
                                                <svg className="w-8 h-8 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity=".3" />
                                                    <path d="M4.93 4.93c-1.2 1.2-1.93 2.76-1.93 4.57s.73 3.37 1.93 4.57l1.41-1.41c-.82-.82-1.34-1.95-1.34-3.16s.52-2.34 1.34-3.16L4.93 4.93zM8.46 8.46c-.43.43-.69.99-.69 1.62s.26 1.19.69 1.62l1.41-1.41c-.06-.06-.1-.13-.1-.21s.04-.15.1-.21L8.46 8.46zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 1.79 4 4-1.79 4-4 4z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Chip & Event Title */}
                                        <div className="mt-2">
                                            <div className="flex justify-between items-end mb-4">
                                                <div className="w-12 h-9 bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#C49303] rounded-md border border-[#FDB931] shadow-md relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40"></div>
                                                    <div className="absolute top-0 left-1/2 h-full w-[1px] bg-black/40"></div>
                                                    <div className="absolute top-1/2 left-1/2 w-4 h-3 border border-black/40 rounded-[2px] -translate-x-1/2 -translate-y-1/2"></div>
                                                </div>
                                                <div className="text-[8px] text-white/30 font-mono tracking-widest">
                                                    AUTHORIZED SIGNATURE
                                                </div>
                                            </div>

                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 tracking-[0.15em] uppercase truncate drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] filter shadow-inner font-bold" style={{ textShadow: '-1px -1px 0 rgba(255,255,255,0.1), 2px 2px 4px rgba(0,0,0,0.8)' }}>
                                                {event.title}
                                            </h3>

                                            <div className="flex gap-4 mt-2 mb-4">
                                                <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest">4520</span>
                                                <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest">****</span>
                                                <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest">****</span>
                                                <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest">8892</span>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <span className="block text-[5px] md:text-[6px] text-gray-400 uppercase tracking-widest mb-0.5">MEMBER SINCE</span>
                                                    <span className="text-xs md:text-sm text-white font-mono tracking-wider">2024</span>
                                                </div>
                                                <div>
                                                    <span className="block text-[5px] md:text-[6px] text-gray-400 uppercase tracking-widest mb-0.5">VALID THRU</span>
                                                    <span className="text-xs md:text-sm text-white font-mono tracking-wider">{event.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Footer */}
                                        <div className="flex justify-between items-end border-t border-white/5 pt-2 mt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-4 bg-white/10 rounded-sm flex items-center justify-center border border-white/5">
                                                    <span className="text-[6px] text-white/50 font-bold">VIP</span>
                                                </div>
                                                <div className="text-[10px] md:text-xs text-gray-300 font-mono uppercase tracking-wider">{event.venue}</div>
                                            </div>

                                            <div className="text-right flex items-center gap-3">
                                                <div className="text-white/30 font-bold italic text-lg md:text-xl tracking-tighter">VISA</div>
                                                <div className="h-6 w-[1px] bg-white/10"></div>
                                                <div className="text-lg md:text-2xl font-bold text-[#e33e33] font-mono tracking-widest drop-shadow-lg">₹{event.price}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Actions Below Card */}
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => setSelectedEvent(event)}
                                        className="flex-1 py-3 bg-[#1a1a1a] rounded-lg border border-[#e33e33] text-[#e33e33] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#e33e33] hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(227,62,51,0.2)] hover:shadow-[0_0_20px_rgba(227,62,51,0.6)]"
                                    >
                                        Know More
                                    </button>
                                    <button
                                        onClick={() => handleAddeEvent(event)}
                                        disabled={registeredEventsList.includes(event.title)}
                                        className={`flex-1 py-3 rounded-lg border font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ${registeredEventsList.includes(event.title)
                                            ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600 text-gray-400 shadow-none cursor-not-allowed opacity-80'
                                            : selectedEventsList.includes(event.title)
                                                ? 'bg-[#97b85d] text-black border-[#97b85d] shadow-[0_0_10px_rgba(151,184,93,0.2)]'
                                                : 'bg-[#1a1a1a] border-[#97b85d] text-[#97b85d] hover:bg-[#97b85d] hover:text-black shadow-[0_0_10px_rgba(151,184,93,0.2)] hover:shadow-[0_0_20px_rgba(151,184,93,0.6)]'
                                            }`}>
                                        {registeredEventsList.includes(event.title)
                                            ? 'REGISTERED'
                                            : selectedEventsList.includes(event.title) ? 'ADDED' : 'ADD'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div >

            {/* Scrolling decorative text */}
            < div className="fixed -right-20 top-1/2 -translate-y-1/2 rotate-90 opacity-10 pointer-events-none hidden lg:block" >
                <span className="text-9xl font-bold text-transparent stroke-text-white tracking-widest">
                    SYMPOSIUM '26
                </span>
            </div >

            <style jsx>{`
                .clip-path-polygon {
                    clip-path: polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%);
                }
                .stroke-text-white {
                    -webkit-text-stroke: 2px rgba(255,255,255,0.2);
                }
                /* Glitch effect keys would go here or in global css */
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e33e33;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #97b85d;
                }
            `}</style>

            <EventModal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                event={selectedEvent}
            />
        </div >
    );
};

export default EventsPage;
