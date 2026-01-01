import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050505] relative overflow-hidden">
            {/* Stock Ticker - Re-located from Sponsors */}
            <div className="w-full bg-[#111] border-y border-[#333] py-2 relative overflow-hidden mb-16">
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

            <div className="pt-8 pb-8">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>

                {/* Top Border Gradient */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e33e33] to-transparent opacity-50"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Brand Section */}
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <Link to="/" className="flex items-center gap-2 group">
                                <span className="text-3xl font-bold font-serif tracking-tighter text-white">
                                    ZORPHIX <span className="text-[#e33e33]">'26</span>
                                </span>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-mono">
                                The ultimate convergence of Technology and Finance. Join the elite league of innovators and market movers.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <SocialIcon icon={FaInstagram} href="#" color="#E1306C" />
                                <SocialIcon icon={FaLinkedin} href="#" color="#0077B5" />
                                <SocialIcon icon={FaGithub} href="#" color="#ffffff" />
                                <SocialIcon icon={FaTwitter} href="#" color="#1DA1F2" />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h4 className="text-white font-bold tracking-widest uppercase text-sm border-b border-[#97b85d] inline-block pb-1">Navigation</h4>
                            <ul className="space-y-3 font-mono text-sm">
                                <FooterLink to="/" text="HOME" />
                                <FooterLink to="/events" text="EVENTS" />
                                <FooterLink to="/register" text="REGISTER" />
                                <FooterLink to="/about" text="ABOUT US" />
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h4 className="text-white font-bold tracking-widest uppercase text-sm border-b border-[#e33e33] inline-block pb-1">Contact</h4>
                            <ul className="space-y-4 font-mono text-sm text-gray-400">
                                <li className="flex items-start gap-3 group cursor-pointer hover:text-white transition-colors">
                                    <FaMapMarkerAlt className="mt-1 text-[#e33e33] group-hover:scale-110 transition-transform" />
                                    <span>
                                        Chennai Institute of Technology,<br />
                                        Sarathy Nagar, Kundrathur,<br />
                                        Chennai - 600069
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                                    <FaEnvelope className="text-[#97b85d] group-hover:scale-110 transition-transform" />
                                    <a href="mailto:contact@zorphix.com">contact@zorphix.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                        <p>© {currentYear} ZORPHIX SYMPOSIUM. ALL RIGHTS RESERVED.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-[#e33e33] transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-[#97b85d] transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper Components

const SocialIcon = ({ icon: Icon, href, color }) => (
    <motion.a
        href={href}
        whileHover={{ y: -3 }}
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all hover:bg-white/10 hover:border-white/20"
        style={{ '--hover-color': color }}
    >
        <Icon className="text-lg transition-colors duration-300 hover:text-[var(--hover-color)]" style={{ color: 'inherit' }} />
    </motion.a>
);

const FooterLink = ({ to, text }) => (
    <li>
        <Link
            to={to}
            className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
        >
            <span className="w-1 h-1 bg-[#97b85d] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="group-hover:translate-x-1 transition-transform">{text}</span>
        </Link>
    </li>
);

export default Footer;
