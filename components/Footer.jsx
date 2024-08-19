import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div className="footer">
                <p><Link href="/">Home</Link></p>
                <p><Link href="/about">About</Link></p>
                <p>A big thanks to <a href="https://giphy.com/">giphy.com</a> for letting us use there API!</p>
            </div>
        </>
    )
}