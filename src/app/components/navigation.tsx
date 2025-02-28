"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const Navigation = () => {
    const pathname = usePathname()
    return (
        <nav>
            <Link href="/" className={pathname === "/" ? "font-bold  mr-4" : "mr-4 text-blue-200"}>Home</Link>
            <Link href="/about" className={pathname === "/about" ? "font-bold  mr-4" : "mr-4 text-blue-200"}>About</Link>
            <Link href="/product/1" className={pathname.startsWith("/product/1") ? "font-bold  mr-4" : "mr-4 text-blue-200"}>Product 1</Link>
        </nav>
    )
}