type HeroTitleProps = {
  title: string;
  backgroundColor: string;
};

function HeroTitle({ title, backgroundColor }: HeroTitleProps) {
  return (
    <div
      className={`${backgroundColor} ring-secondary-900 border-primary-700 mb-4 rounded-full bg-primary-500
        border-4 p-4 pt-6 ring-4 `}
    >
      <h1 className="header-text mb-1 text-5xl">{title}</h1>
    </div>
  );
}

export default HeroTitle;
