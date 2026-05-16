/*import Link from "next/link";

export function SummaryItem({
  name,
  link,
  count,
  isSelected,
  title,
  showCount = false,
}: {
  name: string;
  link: string;
  count?: number;
  isSelected?: boolean;
  title?: string;
  showCount?: boolean;
}) {
  return (
    <li>
      <Link
        href={link}
        title={title}
        className={`
          flex items-center justify-between
          px-3 py-2 rounded-lg
          transition
          hover:bg-gray-100
          ${
            isSelected
              ? "bg-black text-white"
              : "text-gray-700"
          }
        `}
      >
        <span>{name}</span>

        {showCount && (
          <span className="text-sm opacity-70">
            {count}
          </span>
        )}
      </Link>
    </li>
  );
}*/