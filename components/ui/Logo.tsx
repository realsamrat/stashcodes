import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="flex items-center gap-2 text-white" href="/">
      <Image src="/logo.svg" alt="StashCode" width={90} height={41} priority />
    </Link>
  );
}

