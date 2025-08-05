import Link from "next/link";

interface ExternalLinkProps {
  url?: string;
  label: string;
  className?: string;
}

const ExternalLink = ({ url = "#", label, className }: ExternalLinkProps) => {
  if (!url) return null;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className || "text-xs text-blue-500 ml-2 underline"}
    >
      {label}
    </Link>
  );
};

export default ExternalLink;
