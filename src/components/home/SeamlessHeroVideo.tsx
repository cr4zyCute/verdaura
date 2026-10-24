import React, { useEffect, useRef, useState } from 'react';

interface SeamlessHeroVideoProps {
  videoSrc: string;
  posterSrc: string;
  className?: string;
}

export const SeamlessHeroVideo: React.FC<SeamlessHeroVideoProps> = ({
  videoSrc,
  posterSrc,
  className = 'w-full h-full object-cover',
}) => {
  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);

  // activeLayer: player currently rendering at full opacity as the base
  // incomingLayer: player currently crossfading in over the base layer
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');
  const [incomingLayer, setIncomingLayer] = useState<'A' | 'B' | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const crossfadeDuration = 1.0; // 1 second silky smooth crossfade
  const activeRef = useRef<'A' | 'B'>('A');
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (!vA || !vB) return;

    // Ensure audio is muted so autoplay is never blocked
    vA.muted = true;
    vB.muted = true;
    vA.defaultMuted = true;
    vB.defaultMuted = true;

    // Both videos have native loop as a failsafe so they never stop or emit 'ended'
    vA.loop = true;
    vB.loop = true;

    // Start video A immediately
    const startInitial = async () => {
      try {
        await vA.play();
        setIsLoaded(true);
      } catch {
        // Autoplay policy deferred until user interaction
        const retry = () => {
          vA.play().catch(() => {});
          window.removeEventListener('click', retry);
          window.removeEventListener('touchstart', retry);
          window.removeEventListener('scroll', retry);
        };
        window.addEventListener('click', retry, { once: true });
        window.addEventListener('touchstart', retry, { once: true });
        window.addEventListener('scroll', retry, { once: true });
      }
    };

    startInitial();

    const handleTimeUpdate = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      const currentActive = activeRef.current;
      const isPlayerA = target === vA;

      // Only listen to the currently active base video
      if ((currentActive === 'A' && !isPlayerA) || (currentActive === 'B' && isPlayerA)) {
        return;
      }

      if (isTransitioningRef.current || !target.duration || target.duration <= crossfadeDuration * 2) {
        return;
      }

      const timeRemaining = target.duration - target.currentTime;

      // When approaching the end of the active video (e.g. at 9.0s of a 10s clip)
      if (timeRemaining <= crossfadeDuration && timeRemaining > 0) {
        isTransitioningRef.current = true;

        const nextPlayer = currentActive === 'A' ? 'B' : 'A';
        const nextVideo = nextPlayer === 'B' ? vB : vA;

        // Reset incoming video to frame 0 and begin playback
        nextVideo.currentTime = 0;

        const startCrossfade = () => {
          // Mount next player on top (z-20) and animate opacity from 0 -> 100
          setIncomingLayer(nextPlayer);

          // After the crossfade duration completes (1000ms):
          setTimeout(() => {
            // Next player is now the base layer (at 100% opacity)
            activeRef.current = nextPlayer;
            setActiveLayer(nextPlayer);
            setIncomingLayer(null);

            // Pause the previous player and reset it
            try {
              target.pause();
              target.currentTime = 0;
            } catch {
              // ignore
            }

            // Small cooldown before allowing next crossfade
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 500);
          }, crossfadeDuration * 1000);
        };

        nextVideo.play().then(() => {
          startCrossfade();
        }).catch(() => {
          // If play failed, reset transition flag
          isTransitioningRef.current = false;
        });
      }
    };

    vA.addEventListener('timeupdate', handleTimeUpdate);
    vB.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      vA.removeEventListener('timeupdate', handleTimeUpdate);
      vB.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [prefersReducedMotion, videoSrc]);

  // Reduced motion: high quality static poster
  if (prefersReducedMotion) {
    return (
      <img
        src={posterSrc}
        alt="Verdaura botanical luxury"
        className={className}
        loading="eager"
      />
    );
  }

  return (
    <div className="relative z-0 w-full h-full overflow-hidden select-none pointer-events-none bg-[#243324]">
      {/* Permanent Base Poster Layer - Real video frame 0, never flashes white */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 ${className} z-0 select-none pointer-events-none transition-opacity duration-700 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
      />

      {/* Video Player Buffer A */}
      <video
        ref={videoRefA}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className={`absolute inset-0 ${className} transition-opacity duration-1000 ease-in-out ${
          activeLayer === 'A'
            ? 'z-10 opacity-100'
            : incomingLayer === 'A'
            ? 'z-20 opacity-100'
            : 'z-0 opacity-0 pointer-events-none'
        }`}
        onLoadedData={() => setIsLoaded(true)}
        onPlaying={() => setIsLoaded(true)}
      />

      {/* Video Player Buffer B */}
      <video
        ref={videoRefB}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className={`absolute inset-0 ${className} transition-opacity duration-1000 ease-in-out ${
          activeLayer === 'B'
            ? 'z-10 opacity-100'
            : incomingLayer === 'B'
            ? 'z-20 opacity-100'
            : 'z-0 opacity-0 pointer-events-none'
        }`}
        onLoadedData={() => setIsLoaded(true)}
        onPlaying={() => setIsLoaded(true)}
      />
    </div>
  );
};

