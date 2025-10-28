import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlowMap from './FlowMap.jsx';
import SidePanel from './SidePanel.jsx';

export default function IntegrationsSection() {
  const [open, setOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const handleNodeClick = (node) => {
    setActiveNode(node);
    setOpen(true);
  };

  return (
    <section className="relative w-full bg-[#F7F9FC] py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-24">
        {/* Header Block */}
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[36px] leading-[44px] font-bold text-[#101828]"
          >
            An Ecosystem Built to Work in Sync
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="mt-3 text-[18px] leading-[28px] font-medium text-[#344054]"
          >
            From checkout and payments to analytics and marketing — every GoKwik integration flows together to boost growth.
          </motion.p>
        </div>

        {/* Flow Map Canvas */}
        <div className="mt-10 md:mt-12 lg:mt-16 rounded-3xl bg-white p-4 md:p-6 lg:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <FlowMap onNodeClick={handleNodeClick} />
        </div>
      </div>

      {/* Side Panel */}
      <SidePanel open={open} onClose={() => setOpen(false)} node={activeNode} />
    </section>
  );
}
