import { posts } from "@repo/db/data";
import { CategoryList } from "./CategoryList";
import { HistoryList } from "./HistoryList";
import { TagList } from "./TagList";
import Link from "next/link";
import logo from "@/asset/image/wsulo.png";
import Image from "next/image";
export function LeftMenu() {
  return (
    <div>

      <div className="mb-4 mt-2">
        <Link href="/" className="flex items-center gap-3 ml-2">
          <Image src={logo} alt="logo" width={36} height={36} />

          <span className="text-lg font-bold">
            Full Stack Blog
          </span>
        </Link>
      </div>
      <nav>
        <ul role="list" className="flex flex-1 flex-col gap-y-7">

          <CategoryList posts={posts} />


          <HistoryList selectedYear="" selectedMonth="" posts={posts} />


          <TagList selectedTag="" posts={posts} />

          <li>Admin</li>
        </ul>
      </nav>
    </div>
  );
}
