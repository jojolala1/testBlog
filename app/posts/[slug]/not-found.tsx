import Link from "next/link";

export default async function RoutePage(){

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '3rem', color: '#ff6b6b' }}>404</h1>
            <p style={{ fontSize: '1.5rem', color: '#555' }}>
                Oops! The page was not found.
            </p>
            <Link href="/" style={{ textDecoration: 'none', color: '#0070f3', fontSize: '1.2rem' }}>
                Go back to Home
            </Link>
        </div>
    )
}