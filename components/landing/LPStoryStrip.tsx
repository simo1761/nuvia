'use client';

import { useState, useRef, useEffect } from 'react';

const stories = [
  { src: '/videos/stories/rev1.mp4', label: 'التجربة الأولى' },
  { src: '/videos/stories/rev2.mp4', label: 'الأسبوع الأول' },
  { src: '/videos/stories/rev3.mp4', label: 'الأسبوع الثاني' },
  { src: '/videos/stories/rev4.mp4', label: 'الأسبوع الثالث' },
  { src: '/videos/stories/rev5.mp4', label: 'النتيجة ✨' },
];

export default function LPStoryStrip() {
  const [active, setActive] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef(0);

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

  // Lock body scroll while story is open
  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <>
      {/* ── Strip ── */}
      <section className="py-8 bg-white">
        <div className="max-w-lg mx-auto px-4">
          <p className="text-center text-xs text-nuvia-light mb-5 font-tajawal font-medium">
            شاهدي التجربة بنفسك 👁
          </p>
          <div
            className="flex gap-5 justify-center overflow-x-auto pb-2"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {stories.map((s, i) => (
              <button
                key={i}
                onClick={() => openStory(i)}
                className="flex flex-col items-center gap-2 flex-shrink-0"
                aria-label={`مشاهدة ${s.label}`}
              >
                {/* Circular thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] border-primary overflow-hidden shadow-gold bg-bg-alt flex-shrink-0">
                  <video
                    src={`${s.src}#t=0.5`}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <svg className="w-5 h-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs text-nuvia-text font-tajawal font-semibold whitespace-nowrap">
                  {s.label}
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

          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-2 z-10 flex-shrink-0">
            <button onClick={closeStory} className="text-white p-1" aria-label="إغلاق">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="text-white text-sm font-tajawal font-medium drop-shadow">
              {stories[active].label}
            </span>
            <div className="w-9" />
          </div>

          {/* Video */}
          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoRef}
              key={active}
              src={stories[active].src}
              playsInline
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* Tap zones: left 1/3 = prev, right 2/3 = next */}
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
