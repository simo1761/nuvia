'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface Story {
  src: string;
  label: string;
}

const stories: Story[] = [
  { src: '/images/stories/story1.jpg', label: 'استلام الطلب 📦' },
  { src: '/images/stories/story2.jpg', label: 'داخل الباقة ✨' },
  { src: '/images/stories/story3.jpg', label: 'أول استخدام 💆‍♀️' },
  { src: '/images/stories/story4.jpg', label: 'الكيت كامل 🌟' },
  { src: '/images/stories/story5.jpg', label: 'الجهاز بالعمل ⚡' },
  { src: '/images/stories/story6.jpg', label: 'تجربة العميلة 💖' },
];

interface ModalProps {
  story: Story;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function StoryModal({ story, index, total, onClose, onPrev, onNext }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Progress bars */}
      <div className="absolute top-4 left-0 right-0 flex gap-1 px-4">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${i < index ? 'bg-white w-full' : i === index ? 'bg-white w-full animate-[story_4s_linear_forwards]' : 'bg-transparent w-0'}`}
            />
          </div>
        ))}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-8 right-4 z-10 text-white text-3xl leading-none"
      >
        ×
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-sm h-[85vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={story.src}
          alt={story.label}
          fill
          className="object-cover rounded-2xl"
          sizes="100vw"
        />
        {/* Label */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent pb-6 pt-10 px-5 rounded-b-2xl">
          <p className="text-white font-bold text-lg text-center">{story.label}</p>
          <p className="text-white/60 text-xs text-center mt-1">نوفيا كلينيك</p>
        </div>

        {/* Tap zones */}
        <button
          className="absolute inset-y-0 right-0 w-1/2"
          onClick={onNext}
          aria-label="التالية"
        />
        <button
          className="absolute inset-y-0 left-0 w-1/2"
          onClick={onPrev}
          aria-label="السابقة"
        />
      </div>
    </div>
  );
}

export default function ProductStories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState<number | null>(null);

  const openStory = (i: number) => setActiveStory(i);
  const closeStory = () => setActiveStory(null);
  const prevStory = () =>
    setActiveStory((i) => (i !== null ? Math.max(0, i - 1) : null));
  const nextStory = () =>
    setActiveStory((i) =>
      i !== null ? (i + 1 < stories.length ? i + 1 : null) : null
    );

  return (
    <>
      <section className="py-6 bg-white border-b border-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-secondary font-bold text-sm">📸 قصص عميلاتنا</span>
            <span className="text-nuvia-light text-xs">(اضغطي لمشاهدة)</span>
          </div>

          {/* Horizontal scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stories.map((story, i) => (
              <button
                key={i}
                onClick={() => openStory(i)}
                className="flex-shrink-0 flex flex-col items-center gap-2 snap-start"
              >
                {/* Instagram-style bubble */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px]"
                  style={{
                    background: 'linear-gradient(135deg, #C9A96E, #B08D4F, #E8D5B7, #C9A96E)',
                  }}
                >
                  {/* Inner white ring */}
                  <div className="w-full h-full rounded-full bg-white p-[2px]">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={story.src}
                        alt={story.label}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </div>
                  {/* Seen indicator dot */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] leading-none">▶</span>
                  </div>
                </div>
                {/* Label */}
                <span className="text-xs text-nuvia-text font-medium text-center leading-tight max-w-[72px] sm:max-w-[88px] line-clamp-2">
                  {story.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Story viewer modal */}
      {activeStory !== null && (
        <StoryModal
          story={stories[activeStory]}
          index={activeStory}
          total={stories.length}
          onClose={closeStory}
          onPrev={prevStory}
          onNext={nextStory}
        />
      )}
    </>
  );
}
