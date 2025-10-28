import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SidePanel({ open, onClose, node }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            key="panel"
            initial={{ x: 480, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 480, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed right-0 top-0 h-full w-full max-w-[480px] bg-white z-50 shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-l-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={node?.title || 'Integrations panel'}
          >
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#101828]">{node?.title}</h3>
                <p className="text-sm text-[#667085] mt-1">Explore integrations, use cases and docs.</p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex h-9 px-3 items-center rounded-md bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
              >
                Close
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-80px)]">
              {node?.integrations && (
                <section>
                  <h4 className="text-sm font-semibold text-[#1D2939] tracking-wide">Integrations</h4>
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {node.integrations.map((name) => (
                      <li key={name} className="flex items-center gap-2">
                        <span className="inline-block h-6 w-6 rounded-full bg-[#F7F9FC] border border-slate-200" />
                        <span className="text-sm text-[#344054]">{name}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {node?.examples && (
                <section>
                  <h4 className="text-sm font-semibold text-[#1D2939] tracking-wide">Example brands</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {node.examples.map((b) => (
                      <span key={b} className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">{b}</span>
                    ))}
                  </div>
                </section>
              )}

              {node?.value && (
                <section>
                  <h4 className="text-sm font-semibold text-[#1D2939] tracking-wide">Value</h4>
                  <p className="mt-2 text-sm text-[#344054]">{node.value}</p>
                </section>
              )}

              <section>
                <h4 className="text-sm font-semibold text-[#1D2939] tracking-wide">Links</h4>
                <div className="mt-3 flex gap-3">
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#004EEB] hover:underline">Developer Docs</a>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#004EEB] hover:underline">Case Study</a>
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
