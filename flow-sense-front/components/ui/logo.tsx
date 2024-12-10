import Link from "next/link";


export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Cruip">
      <img src="/images/logo.png" alt="Cruip Logo" width="28" height="28" />
    </Link>
  );
}