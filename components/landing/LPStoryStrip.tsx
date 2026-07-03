'use client';

import { useState, useRef, useEffect } from 'react';

const stories = [
  {
    src: '/videos/stories/rev1.mp4',
    label: 'التجربة الأولى',
    ring: 'linear-gradient(135deg,#F472B6,#E11D48)',
    bg: 'linear-gradient(135deg,#FFEEF5,#FFB3CE)',
  },
  {
    src: '/videos/stories/rev2.mp4',
    label: 'الأسبوع الأول',
    ring: 'linear-gradient(135deg,#FB923C,#D97706)',
    bg: 'linear-gradient(135deg,#FFF3E6,#FFE0B2)',
  },
  {
    src: '/videos/stories/rev3.mp4',
    label: 'الأسبوع الثاني',
    ring: 'linear-gradient(135deg,#FBBF24,#D97706)',
    bg: 'linear-gradient(135deg,#FFFDE7,#FFF3C4)',
  },
  {
    src: '/videos/stories/rev4.mp4',
    label: 'الأسبوع الثالث',
    ring: 'linear-gradient(135deg,#34D399,#059669)',
    bg: 'linear-gradient(135deg,#EEFBF3,#BBFCE8)',
  },
  {
    src: '/videos/stories/rev5.mp4',
    label: 'النتيجة ✨',
    ring: 'linear-gradient(135deg,#D4A017,#A97830)',
    bg: 'linear-gradient(135deg,#FFF8EB,#FAECD8)',
  },
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
                {/* CSS-only story ring — zero network requests */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] flex-shrink-0"
                  style={{ background: s.ring }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ background: s.bg }}
                  >
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: '#5c3d1e', opacity: 0.7 }}
                    >
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

      {/* ── Fullscreen Story Player — video loads ONLY when user clicks ── */}
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

          {/* Video — created here for the first time, loaded on demand */}
          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoRef}
              key={active}
              src={stories[active].src}
              playsInline
              preload="auto"
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
