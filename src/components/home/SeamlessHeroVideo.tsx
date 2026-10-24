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

  const [activePlayer, setActivePlayer] = useState<'A' | 'B'>('A');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [, setIsVideoLoaded] = useState(false);

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

  const crossfadeDuration = 0.8; // 800ms natural crossfade
  const activePlayerRef = useRef<'A' | 'B'>('A');
  const isCrossfadingRef = useRef(false);

  // Seamless Dual-Buffer Looping Engine
  useEffect(() => {
    if (prefersReducedMotion) return;

    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (!vA || !vB) return;

    vA.muted = true;
    vB.muted = true;

    // Start video A immediately
    const startInitialPlayback = async () => {
      try {
        await vA.play();
        setIsVideoLoaded(true);
      } catch (err) {
        console.warn('Hero video autoplay deferred by browser policy:', err);
      }
    };

    startInitialPlayback();

    const handleTimeUpdate = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      const currentActive = activePlayerRef.current;
      const isPlayerA = target === vA;

      // Only monitor the currently playing/active video element
      if ((currentActive === 'A' && !isPlayerA) || (currentActive === 'B' && isPlayerA)) {
        return;
      }

      if (isCrossfadingRef.current || !target.duration) return;

      const timeRemaining = target.duration - target.currentTime;

      // When approaching the end of the clip, seamlessly wake up the alternate video
      if (timeRemaining <= crossfadeDuration && timeRemaining > 0) {
        isCrossfadingRef.current = true;

        const nextVideo = currentActive === 'A' ? vB : vA;
        const nextPlayer = currentActive === 'A' ? 'B' : 'A';

        nextVideo.currentTime = 0;
        nextVideo.play().then(() => {
          activePlayerRef.current = nextPlayer;
          setActivePlayer(nextPlayer);

          // Allow the CSS crossfade transition to complete smoothly before pausing outgoing video
          setTimeout(() => {
            isCrossfadingRef.current = false;
            try {
              target.pause();
              target.currentTime = 0;
            } catch {
              // ignore
            }
          }, (crossfadeDuration * 1000) + 100);
        }).catch((err) => {
          console.warn('Crossfade buffer switch handled:', err);
          isCrossfadingRef.current = false;
        });
      }
    };

    const handleEnded = (e: Event) => {
      // Fallback safeguard in case timeupdate missed the seam
      const target = e.target as HTMLVideoElement;
      target.currentTime = 0;
      target.play().catch(() => {});
    };

    vA.addEventListener('timeupdate', handleTimeUpdate);
    vB.addEventListener('timeupdate', handleTimeUpdate);
    vA.addEventListener('ended', handleEnded);
    vB.addEventListener('ended', handleEnded);

    return () => {
      vA.removeEventListener('timeupdate', handleTimeUpdate);
      vB.removeEventListener('timeupdate', handleTimeUpdate);
      vA.removeEventListener('ended', handleEnded);
      vB.removeEventListener('ended', handleEnded);
    };
  }, [prefersReducedMotion, videoSrc]);

  // If user prefers reduced motion, render high quality static hero
  if (prefersReducedMotion) {
    return (
      <img
        src={posterSrc}
        alt="Verdaura handcrafted botanical oils displayed on apothecary tray with gentle sunlight"
        className={className}
        loading="eager"
      />
    );
  }

  return (
    <div className="relative z-0 w-full h-full overflow-hidden select-none pointer-events-none bg-white">
      {/* Permanent Base Poster Layer - Matches Frame 0 Exactly, ensures ZERO white flash or blank frame under any condition */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 ${className} z-0 select-none pointer-events-none`}
        loading="eager"
      />

      {/* Video Player Buffer A */}
      <video
        ref={videoRefA}
        src={videoSrc}
        poster={posterSrc}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        style={{
          transition: 'opacity 800ms ease-in-out',
        }}
        className={`absolute inset-0 ${className} ${
          activePlayer === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
        onLoadedData={() => setIsVideoLoaded(true)}
      />

      {/* Video Player Buffer B */}
      <video
        ref={videoRefB}
        src={videoSrc}
        poster={posterSrc}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        style={{
          transition: 'opacity 800ms ease-in-out',
        }}
        className={`absolute inset-0 ${className} ${
          activePlayer === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      />
    </div>
  );
};
