"use client";
import Link from "next/link"
import { useState } from "react";

function Tags({data:tag}:any) {
    const [showDropdown, setShowDropdown] = useState(false);
    
  return (
    <li key={tag.slug} className="flex gap-2 relative" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
        <Link className={`px-4 py-2 bg-black text-white rounded-sm ${tag.subTag.length > 0 && "group"}`} href={`/know-more/category/${tag.slug}`}>{tag.name}{tag.subTag.length > 0 && <button className="group-hover:rotate-45 ml-2">+</button>}</Link>
        {showDropdown && tag.subTag.length > 0 && <div className="absolute flex flex-col top-10">
            {tag.subTag.map((subtag:any) => {
            return <Link key={subtag.name} href={`/know-more/category/${tag.slug}/${subtag.slug}`} className="px-4 py-2 bg-black text-white rounded-sm ">{subtag.name}</Link>
        })}
            </div>}
    </li>
  )
}

export default Tags