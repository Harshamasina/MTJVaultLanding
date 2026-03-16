'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import {
    subscribeTree,
    getTreeSnapshot,
    getTreeServerSnapshot,
} from '@/lib/treeProgress';

interface FadeInProps {
    children: React.ReactNode;
    /** Tree node elementId — content appears when tree reaches this node */
    treeNode?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const OFFSETS: Record<string, { x?: number; y?: number }> = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
};

export function FadeIn({
    children,
    treeNode,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    className = '',
}: FadeInProps) {
    const treeSnapshot = useSyncExternalStore(
        subscribeTree,
        getTreeSnapshot,
        getTreeServerSnapshot,
    );

    const isNodeReached = treeNode ? (treeSnapshot[treeNode] ?? false) : false;

    // Latch: once triggered, stay visible (don't reverse on scroll-up)
    // Reset when tree store resets (navigating away from homepage and back)
    const hasTreeNode = treeNode !== undefined;
    const nodeInSnapshot = hasTreeNode && treeNode in treeSnapshot;
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (isNodeReached && !show) {
            setShow(true);
        } else if (!isNodeReached && show && hasTreeNode && !nodeInSnapshot) {
            // Tree store was reset (key removed entirely) — reset animation
            setShow(false);
        }
    }, [isNodeReached, show, hasTreeNode, nodeInSnapshot]);

    const initial = { opacity: 0, ...OFFSETS[direction] };
    const visible = { opacity: 1, x: 0, y: 0 };

    // Tree-coupled mode: animate when tree reaches the node
    if (treeNode) {
        return (
            <motion.div
                initial={initial}
                animate={show ? visible : initial}
                transition={{ duration, delay, ease: EASE }}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    // Fallback: viewport-based (for elements without a tree node)
    return (
        <motion.div
            initial={initial}
            whileInView={visible}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
