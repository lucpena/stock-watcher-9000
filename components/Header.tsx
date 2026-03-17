import Link from "next/link";
import Image from "next/image";

import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";

const Header = ({ user }: { user: User}) => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    {/*<Image src="/assets/icons/logo.svg" alt="Logo" width={140} height={32} className="h-8 w-auto cursor-pointer"></Image>*/}
                    <h3 className="text-gray-100 text-xl font-bold">Stock Watcher 9000</h3>
                </Link>

                <nav className="hidden sm:block absolute sm:ml-64 underline underline-offset-3">
                    <NavItems initialStocks={[]} />
                </nav>

                <UserDropdown user={user} />

            </div>
        </header>
    )
}
export default Header
