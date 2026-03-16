"use client"

import {use, useEffect, useState} from "react"
import { Command, CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import {Button} from "@/components/ui/button";
import {Loader2,  TrendingUp} from "lucide-react";
import Link from "next/link";
import {searchStocks} from "@/lib/actions/finnhub.actions";
import {useDebounce} from "@/hooks/useDebounce";

export default function SearchCommand({ renderAs = 'button', label = 'Add stock', initialStocks }: SearchCommandProps) {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);

    const isSearchMode = !!searchTerm.trim();
    const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                setOpen(v => !v)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    const handleSearch = async () => {
        if(!isSearchMode) return setStocks(initialStocks);

        setLoading(true)
        try {
            const results = await searchStocks(searchTerm.trim());
            setStocks(results);
        } catch {
            setStocks([])
        } finally {
            setLoading(false)
        }
    }

    // const debouncedSearch = useDebounce(handleSearch, 300);
    //
    // useEffect(() => {
    //     debouncedSearch();
    // }, [debouncedSearch, searchTerm]);

    const handleSelectStock = () => {
        setOpen(false);
        setSearchTerm("");
        setStocks(initialStocks);
    }

    return (
        <>
            {renderAs === 'text' ? (
                <span onClick={() => setOpen(true)} className="search-text">
            {label}
          </span>
            ): (
                <Button onClick={() => setOpen(true)} className="search-btn">
                    {label}
                </Button>
            )}
            <CommandDialog open={open} onOpenChange={setOpen} className="search-dialog bg-gray-700">
                {/* ✨ Snap the <Command> wrapper right here! ✨ */}
                <Command className="w-full h-full bg-gray-700">

                    <div className="bg-gray-700">
                        <CommandInput
                            value={searchTerm}
                            onValueChange={setSearchTerm}
                            onKeyDown={(e) => {
                                if (e) {
                                    handleSearch();
                                }
                            }}
                            placeholder="Search stocks..."
                            className="text-gray-50"
                        />
                        {loading && <Loader2 className="search-loader" />}
                    </div>

                    <CommandList className="search-list bg-gray-700">
                        {loading ? (
                            <CommandEmpty className="bg-gray-700">Loading stocks...</CommandEmpty>
                        ) : displayStocks?.length === 0 ? (
                            <div className="search-list-indicator bg-gray-700">
                                {isSearchMode ? 'No results found' : 'No stocks available'}
                            </div>
                        ) : (
                            <ul>
                                <div className="search-count bg-gray-700">
                                    {isSearchMode ? 'Search results' : 'Popular stocks'}
                                    {` `}({displayStocks?.length || 0})
                                </div>
                                {displayStocks?.map((stock, i) => (
                                    <li key={stock.symbol} className="bg-gray-700 py-1">
                                        <Link
                                            href={`/stocks/${stock.symbol}`}
                                            onClick={handleSelectStock}
                                            className="search-item-link bg-gray-700"
                                        >
                                            <TrendingUp className="h-4 w-4 text-gray-500" />
                                            <div className="flex-1">
                                                <div className="search-item-name">
                                                    {stock.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {stock.symbol} | {stock.exchange } | {stock.type}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    )
}