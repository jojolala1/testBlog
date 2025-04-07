import Link from "next/link"

const Header = () => {
  return (
    <header className="flex  items-center gap-2 bg-card rounded-lg shadow-xl my-4 py-2 px-3">
        <p>Lasblei Thibau</p>
        <div className="ml-auto"></div>
        <Link href="/" className="text-primary">
        Posts
        </Link>
    </header>
  )
}

export default Header

