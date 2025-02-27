type HeroTitleProps = {
  title: string;
  backgroundColor: string;
};

function HeroTitle({ title, backgroundColor }: HeroTitleProps) {
  return (
    <div
      className={`${backgroundColor} ring-secondary-900 dark:ring-card border-primary-400 mb-4
        rounded-full border-4 p-4 pt-6 ring-4`}
    >
      <h1 className="font-header text-primary-500 mb-1 text-center text-5xl font-bold">
        {title}
      </h1>
    </div>
  );
}

export default HeroTitle;
