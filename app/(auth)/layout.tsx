import React from "react";
import Link from "next/link";
import Image from "next/image";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Layout = async ({ children }: { children : React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers()});

    if(session?.user) redirect("/");

    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default">
                <Link href="/" className="auth-logo">
                    {/*<Image src="/assets/icons/logo.svg" alt="The logo" width={140} height={32} className="h-8 w-auto" />*/}
                    <p className="text-gray-100 font-bold text-4xl">Stock Watcher 9000</p>
                </Link>

                <div className="pb=6 lg:pb-8 flex-1">{children}</div>
            </section>

            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb16">

                    <blockquote className="auth-blockquote">
                        In this app, you can keep up with you favourite stocks with the awesome widgets from
                        TradingView, receive emails with the principal news on the market and more!
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-testimonial-author">- Lucas Pena</cite>
                            <p className="max-md:text-xs text-gray-500">Stock Watcher 9000 Developer</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {[1,2,3,4].map((star) => (
                                <Image src="/assets/icons/star.svg" alt="Star" key={star} width={20} height={20} className="w-5 h-5" />
                            ))}
                            {[1].map((star) => (
                                <Image src="/assets/icons/star.svg" alt="Star" key={star} width={20} height={20} className="w-5 h-5 opacity-25" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <Image src="/assets/images/my-dash.png" alt="Dashboard" width={1440} height={1150} className="auth-dashboard-preview absolute top-10 drop-shadow-md drop-shadow-yellow-200/60" />
                </div>

            </section>
        </main>
    )
}
export default Layout