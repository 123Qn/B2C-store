import Link from "next/link";

export function SummaryItem({
  name,
  link,
  count,
  isSelected,
  title,
  showCount = true,
}: {
  name: string;
  link: string;
  count: number;
  isSelected: boolean;
  title?: string;
  showCount?: boolean;
}) {
  return (
    <li>
      <Link
        href={link}
        title={title}
        className={`flex items-center justify-between px-3 py-2 rounded-md transition
          ${isSelected
            ? "bg-gray-200 dark:bg-gray-700 font-medium"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-400">🏷️</span>
          <span>{name}</span>
        </div>

        <span
          data-testid="post-count"
          data-test-id="post-count"
          className={`text-sm text-gray-500 ${!showCount ? "invisible" : ""}`}
        >
          {count}
        </span>
      </Link>
    </li>
  );
}