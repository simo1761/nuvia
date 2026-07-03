'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const INSTA_RING = 'linear-gradient(135deg, #feda75 0%, #fa7e1e 30%, #d62976 65%, #4f5bd5 100%)';

const stories = [
  {
    src: '/videos/stories/rev1.mp4',
    name: 'nour.sh90',
    avatar: '/images/reviews/review1.webp',
  },
  {
    src: '/videos/stories/rev2.mp4',
    name: 'sara_366_',
    avatar: '/images/reviews/review2.webp',
  },
  {
    src: '/videos/stories/rev3.mp4',
    name: 'hnouf2369',
    avatar: '/images/reviews/review3.webp',
  },
  {
    src: '/videos/stories/rev4.mp4',
    name: 'mona.z2210',
    avatar: '/images/reviews/review4.webp',
  },
  {
    src: '/videos/stories/rev5.mp4',
    name: 'rana_hrb27',
    avatar: '/images/reviews/review5.webp',
  },
];

export default function LPStoryStrip() {
  const [active, setActive] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [thumbnailsReady, setThumbnailsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef(0);
  const stripRef = useRef<HTMLDivElement>(null);

  // Lazy-load video thumbnails only when strip scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setThumbnailsReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (stripRef.current) observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, []);

  const openStory = (idx: number) => {
    setProgress(0);
    setActive(idx);
  };

  const closeStory = () => {
    setActive(null);
    setProgress(0);
  };

  const goNext = () => {
    setProgress(0);
    setActive((prev) => {
      if (prev === null) return null;
      return prev < stories.length - 1 ? prev + 1 : null;
    });
  };

  const goPrev = () => {
    setProgress(0);
    setActive((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : prev;
    });
  };

  useEffect(() => {
    if (active === null) return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const handleEnded = () => goNext();

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <>
      {/* ── Instagram-style story strip ── */}
      <section className="py-6 bg-white border-b border-accent/30" ref={stripRef}>
        <div className="max-w-lg mx-auto px-2">
          <div
            className="flex gap-4 overflow-x-auto py-2 px-3"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {stories.map((s, i) => (
              <button
                key={i}
                onClick={() => openStory(i)}
                className="flex flex-col items-center gap-0 flex-shrink-0 focus:outline-none"
                aria-label={`مشاهدة قصة ${s.name}`}
              >
                {/* Story ring + video thumbnail — exactly like Instagram */}
                <div
                  className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full p-[3px] flex-shrink-0"
                  style={{ background: INSTA_RING }}
                >
                  {/* Inner white gap (Instagram look) */}
                  <div className="w-full h-full rounded-full p-[2px] bg-white">
                    {/* Video thumbnail or placeholder */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                      {thumbnailsReady ? (
                        <video
                          src={`${s.src}#t=0.5`}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                      )}
                      {/* Play icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile avatar — overlapping the bottom of the story ring (Instagram style) */}
                <div className="relative -mt-4 z-10 mb-1.5">
                  <div className="w-7 h-7 rounded-full overflow-hidden border-[2.5px] border-white shadow-sm">
                    <Image
                      src={s.avatar}
                      alt={s.name}
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Arabic name */}
                <span className="text-[11px] text-secondary font-tajawal font-semibold text-center leading-tight max-w-[72px] sm:max-w-[80px] line-clamp-1">
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fullscreen Story Player ── */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[70] bg-black flex flex-col select-none"
          style={{ height: '100dvh' }}
          onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
          onTouchEnd={(e) => {
            if (e.changedTouches[0].clientY - touchStartY.current > 70) closeStory();
          }}
        >
          {/* Progress bars */}
          <div className="flex gap-1 px-3 pt-10 pb-2 z-10 flex-shrink-0">
            {stories.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{
                    width: i < active ? '100%' : i === active ? `${progress}%` : '0%',
                    transition: i === active ? 'none' : undefined,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header with profile */}
          <div className="flex items-center justify-between px-4 pb-3 z-10 flex-shrink-0">
            <button onClick={closeStory} className="text-white p-1" aria-label="إغلاق">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-tajawal font-semibold drop-shadow">
                {stories[active].name}
              </span>
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/60">
                <Image
                  src={stories[active].avatar}
                  alt={stories[active].name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="w-9" />
          </div>

          {/* Video */}
          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoRef}
              key={active}
              src={stories[active].src}
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Tap zones */}
            <div className="absolute inset-0 flex z-10">
              <div className="w-1/3 h-full cursor-pointer" onClick={goPrev} />
              <div className="w-2/3 h-full cursor-pointer" onClick={goNext} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
