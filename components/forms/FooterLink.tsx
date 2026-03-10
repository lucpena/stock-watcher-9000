import React from 'react'
import Link from "next/link";

const FooterLink = ({text, linkText, href } : FooterLinkProps) => {
    return (
        <div className="text-center pt-4">
            <p className="text-gray-100">
                <Link href={href} className="footer-link">
                { text }{` `}{linkText}
                </Link>
            </p>
        </div>
    )
}
export default FooterLink
