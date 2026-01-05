import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaTrophy,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers
} from 'react-icons/fa';

const EventModal = ({ isOpen, onClose, event }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative mt-20"
          >
            {/* Header */}
            <div className="h-32 bg-gradient-to-r from-[#e33e33] to-[#97b85d] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition"
              >
                <FaTimes />
              </button>

              <div className="absolute bottom-4 left-6">
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
                  {event.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-8">

              {/* Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Info label="Date" value={event.date} icon={<FaCalendarAlt />} />
                <Info label="Venue" value={event.venue} icon={<FaMapMarkerAlt />} />
                <Info label="Team" value={event.team} icon={<FaUsers />} />
                <Info label="Prize" value={event.prize} icon={<FaTrophy />} highlight />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-[#97b85d] font-bold tracking-widest uppercase text-sm mb-2">
                  Description
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {event.desc}
                </p>
              </div>

              {/* Rounds */}
              {event.rounds && event.rounds.length > 0 && (
                <div>
                  <h3 className="text-[#97b85d] font-bold tracking-widest uppercase text-sm mb-3">
                    Rounds
                  </h3>
                  <ul className="space-y-3">
                    {event.rounds.map((round, index) => (
                      <li key={index} className="flex gap-4 text-gray-300 text-sm md:text-base">
                        <span className="text-[#e33e33] font-mono font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{round}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rules */}
              <div>
                <h3 className="text-[#e33e33] font-bold tracking-widest uppercase text-sm mb-3">
                  Rules & Guidelines
                </h3>
                <ul className="space-y-2">
                  {event.rules?.map((rule, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-gray-400 hover:text-gray-200 transition text-sm"
                    >
                      <span className="text-[#e33e33] font-mono font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/30 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-mono uppercase tracking-widest border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition"
              >
                Close
              </button>
              <button className="px-6 py-2 text-sm font-mono uppercase tracking-widest bg-[#e33e33] text-white hover:bg-[#c22e24] shadow-[0_0_15px_rgba(227,62,51,0.4)] transition">
                Register Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;

/* Helper component */
const Info = ({ label, value, icon, highlight }) => (
  <div className="bg-white/5 p-3 rounded-lg border border-white/5">
    <div className="text-gray-400 text-xs uppercase mb-1 flex items-center gap-1">
      {icon} {label}
    </div>
    <div className={`font-mono text-sm ${highlight ? 'text-[#e33e33]' : 'text-white'}`}>
      {value}
    </div>
  </div>
);
