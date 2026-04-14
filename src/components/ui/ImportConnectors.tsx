'use client';

import { motion } from 'framer-motion';

export function ImportConnectors() {
    return (
        <div className="hidden lg:block absolute top-[3.5rem] left-[calc(33.33%+0.5rem)] right-[calc(33.33%+0.5rem)] z-0">
            <div className="flex items-center justify-between gap-0">
                <motion.div
                    className="flex-1 flex items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-primary/20" />
                    <div className="w-2 h-2 rounded-full bg-primary/30 -mx-1" />
                </motion.div>
                <motion.div
                    className="flex-1 flex items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                >
                    <div className="w-2 h-2 rounded-full bg-primary/30 -mx-1" />
                    <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-primary/30" />
                </motion.div>
            </div>
        </div>
    );
}
