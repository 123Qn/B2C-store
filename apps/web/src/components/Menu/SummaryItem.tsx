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
      <Link href={link} legacyBehavior>
        <a
          title={title}
          className={`flex items-center justify-between px-3 py-2 ${
            isSelected ? "selected" : ""
          }`}
        >
          <span>{name}</span>

          <span data-testid="post-count" data-test-id="post-count">
            {showCount ? count : ""}
          </span>
        </a>
      </Link>
    </li>
  );
}