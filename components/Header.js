import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Link href="/">
        <a>Index</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  )
}

export default Header;
