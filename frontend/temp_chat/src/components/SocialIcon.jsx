


export const SocialIcon = ({ href, icon: Icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label={label}
    >
      <Icon size={20} />
    </a>
  );
};