type HeroTitleProps = {
  title: string;
  backgroundColor: string;
  className?: string;
};

function HeroTitle({ title, backgroundColor, className }: HeroTitleProps) {
  return (
    <div
      className={`${backgroundColor} ${className} ring-secondary-900 border-primary-700
        bg-primary-500 rounded-full border-4 p-4 pt-6 ring-4`}
    >
      <h1 className="header-text mb-1 text-5xl">{title}</h1>
    </div>
  );
}

export default HeroTitle;
