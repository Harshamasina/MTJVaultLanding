'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    Loader2,
    RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface WatchDemoButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children?: React.ReactNode;
}

const VIDEO_SRC = '/demo_video.mp4';

export function WatchDemoButton({
    variant = 'secondary',
    size = 'md',
    className = '',
    children,
}: WatchDemoButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <>
            <Button
                variant={variant}
                size={size}
                className={className}
                onClick={() => setIsOpen(true)}
            >
                {children || (
                    <>
                        <Play className="w-5 h-5" />
                        Watch Demo
                    </>
                )}
            </Button>
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <VideoModal onClose={() => setIsOpen(false)} />
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
}

/* ─── Helpers ─── */

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ─── Video Modal ─── */

type VideoState = 'idle' | 'loading' | 'ready' | 'playing' | 'buffering' | 'ended' | 'error';

function VideoModal({ onClose }: { onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const controlsTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

    const [videoState, setVideoState] = useState<VideoState>('idle');
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);

    const isPlaying = videoState === 'playing' || videoState === 'buffering';
    const showSpinner = videoState === 'loading' || videoState === 'buffering';
    const showPlayOverlay = videoState === 'idle' || videoState === 'ready' || videoState === 'ended';

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Close on Escape, Space to play/pause
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === ' ') {
                e.preventDefault();
                togglePlay();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onClose],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Fullscreen change listener
    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    // Auto-hide controls
    const resetControlsTimer = useCallback(() => {
        setShowControls(true);
        if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
        if (isPlaying) {
            controlsTimerRef.current = setTimeout(
                () => setShowControls(false),
                3000,
            );
        }
    }, [isPlaying]);

    function togglePlay() {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            setVideoState('loading');
            video.play().catch(() => {
                setVideoState('error');
            });
        } else {
            video.pause();
        }
    }

    function toggleMute() {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    }

    function toggleFullscreen() {
        const video = videoRef.current;
        if (!video) return;
        if (!document.fullscreenElement) {
            video.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    function handleTimeUpdate() {
        const video = videoRef.current;
        if (!video) return;
        setCurrentTime(video.currentTime);
        if (video.buffered.length > 0) {
            setBuffered(video.buffered.end(video.buffered.length - 1));
        }
    }

    function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
        const video = videoRef.current;
        const bar = progressRef.current;
        if (!video || !bar) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(
            0,
            Math.min(1, (e.clientX - rect.left) / rect.width),
        );
        video.currentTime = ratio * video.duration;
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const bufferProgress = duration > 0 ? (buffered / duration) * 100 : 0;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-navy/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            />

            {/* Modal */}
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Product demo video"
                className="relative w-full max-w-5xl"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{
                    duration: 0.3,
                    ease: [0.21, 0.47, 0.32, 0.98],
                }}
            >
                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute -top-12 right-0 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors cursor-pointer group"
                    aria-label="Close video"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    <span className="hidden sm:inline">Close</span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <X className="w-4 h-4" />
                    </span>
                </button>

                {/* Video container */}
                <div
                    className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 bg-navy"
                    data-video-container
                >
                    {/* Top bar — browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-navy-light border-b border-white/10">
                        <div className="flex gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-danger/80" />
                            <span className="w-3 h-3 rounded-full bg-compliance/80" />
                            <span className="w-3 h-3 rounded-full bg-success/80" />
                        </div>
                        <div className="flex-1 mx-4">
                            <div
                                className="max-w-xs mx-auto rounded-md bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/50 text-center truncate"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                app.designyourinvention.com
                            </div>
                        </div>
                        <div className="w-13.5" />
                    </div>

                    {/* Video area */}
                    <div
                        className="relative bg-black cursor-pointer group"
                        onMouseMove={resetControlsTimer}
                        onMouseLeave={() => isPlaying && setShowControls(false)}
                    >
                        {/* 16:9 aspect ratio */}
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <video
                                ref={videoRef}
                                className="absolute inset-0 w-full h-full object-contain"
                                src={VIDEO_SRC}
                                preload="auto"
                                playsInline
                                onClick={togglePlay}
                                onCanPlay={() => {
                                    if (videoState === 'loading' || videoState === 'buffering') {
                                        setVideoState('playing');
                                    } else if (videoState === 'idle') {
                                        setVideoState('ready');
                                    }
                                }}
                                onPlaying={() => setVideoState('playing')}
                                onPause={() => {
                                    if (videoState !== 'buffering') {
                                        setVideoState('ready');
                                    }
                                }}
                                onWaiting={() => setVideoState('buffering')}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={() => {
                                    if (videoRef.current) {
                                        setDuration(videoRef.current.duration);
                                    }
                                }}
                                onEnded={() => {
                                    setVideoState('ended');
                                    setShowControls(true);
                                }}
                                onError={() => setVideoState('error')}
                            />
                        </div>

                        {/* Loading / Buffering spinner */}
                        <AnimatePresence>
                            {showSpinner && (
                                <motion.div
                                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                    <span
                                        className="text-sm text-white/60"
                                        style={{ fontFamily: 'var(--font-body)' }}
                                    >
                                        {videoState === 'buffering' ? 'Buffering...' : 'Loading video...'}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Play / Replay overlay */}
                        <AnimatePresence>
                            {showPlayOverlay && (
                                <motion.button
                                    type="button"
                                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer"
                                    onClick={togglePlay}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    aria-label={videoState === 'ended' ? 'Replay video' : 'Play video'}
                                >
                                    <span className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/90 shadow-lg shadow-primary/30 hover:bg-primary hover:scale-105 transition-all duration-200">
                                        {videoState === 'ended' ? (
                                            <RotateCcw className="w-8 h-8 text-white" />
                                        ) : (
                                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                                        )}
                                    </span>
                                    {videoState === 'ended' && (
                                        <span
                                            className="text-sm text-white/70"
                                            style={{ fontFamily: 'var(--font-body)' }}
                                        >
                                            Watch again
                                        </span>
                                    )}
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Error state */}
                        {videoState === 'error' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                <p
                                    className="text-sm text-white/70"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Video failed to load. Please check your connection and try again.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const video = videoRef.current;
                                        if (!video) return;
                                        setVideoState('idle');
                                        video.load();
                                    }}
                                    className="text-sm text-primary hover:text-primary-light transition-colors cursor-pointer font-semibold"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Controls bar */}
                        <div
                            className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${
                                showControls && !showPlayOverlay
                                    ? 'opacity-100'
                                    : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            {/* Gradient fade */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                            <div className="relative px-4 pb-3 pt-8">
                                {/* Progress bar */}
                                <div
                                    ref={progressRef}
                                    className="group/progress relative w-full h-1.5 rounded-full bg-white/20 cursor-pointer mb-3 overflow-hidden hover:h-2.5 transition-all duration-150"
                                    onClick={handleProgressClick}
                                    role="slider"
                                    aria-label="Video progress"
                                    aria-valuenow={Math.round(progress)}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    tabIndex={0}
                                >
                                    {/* Buffer */}
                                    <div
                                        className="absolute inset-y-0 left-0 rounded-full bg-white/20"
                                        style={{ width: `${bufferProgress}%` }}
                                    />
                                    {/* Progress */}
                                    <div
                                        className="absolute inset-y-0 left-0 rounded-full bg-primary"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                {/* Control buttons row */}
                                <div className="relative z-10 flex items-center gap-3">
                                    {/* Play/Pause */}
                                    <button
                                        type="button"
                                        onClick={togglePlay}
                                        className="text-white hover:text-primary transition-colors cursor-pointer"
                                        aria-label={isPlaying ? 'Pause' : 'Play'}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-5 h-5 fill-current" />
                                        ) : (
                                            <Play className="w-5 h-5 fill-current" />
                                        )}
                                    </button>

                                    {/* Volume */}
                                    <button
                                        type="button"
                                        onClick={toggleMute}
                                        className="text-white hover:text-primary transition-colors cursor-pointer"
                                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                                    >
                                        {isMuted ? (
                                            <VolumeX className="w-5 h-5" />
                                        ) : (
                                            <Volume2 className="w-5 h-5" />
                                        )}
                                    </button>

                                    {/* Timestamp */}
                                    <span
                                        className="text-xs text-white/70 tabular-nums"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </span>

                                    <div className="flex-1" />

                                    {/* Brand tag */}
                                    <span
                                        className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary-light"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        Design Your Invention Demo
                                    </span>

                                    {/* Fullscreen */}
                                    <button
                                        type="button"
                                        onClick={toggleFullscreen}
                                        className="text-white hover:text-primary transition-colors cursor-pointer"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen'
                                                : 'Fullscreen'
                                        }
                                    >
                                        {isFullscreen ? (
                                            <Minimize className="w-5 h-5" />
                                        ) : (
                                            <Maximize className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-navy-light border-t border-white/10">
                        <p
                            className="text-xs text-white/40 truncate"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Design Your Invention — IP Management Software for Law Firms &
                            Pharma
                        </p>
                        <span
                            className="shrink-0 ml-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary-light"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Live Demo
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
