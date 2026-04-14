interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, center = true, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${light ? 'text-white' : 'text-secondary'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-nuvia-light'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-3 w-16 h-1 rounded-full bg-gradient-to-r from-primary to-primary-dark ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}
