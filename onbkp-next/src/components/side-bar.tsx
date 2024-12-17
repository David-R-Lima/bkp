"use client"
import { open } from "fs";
import { Home, Database, Send, Save } from "lucide-react";
import Link from "next/link"
import { usePathname } from "next/navigation";

interface Props {
    open: boolean
}

export function SideBar({open}: Props) {
    const path = usePathname().split("/")

    if(open) {
        return (
            <div>
                <div>
                    <Link 
                        href={"/dashboard/bancos"} 
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "bancos" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                    >
                        <Database className="h-6 w-6" />
                        Bancos
                    </Link>
                </div>
                <div>
                    <Link 
                        href={"/dashboard/avisos"} 
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "avisos" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                    >
                        <Send className="h-6 w-6"/> 
                        Avisos
                    </Link>
                </div>
                <div>
                    <Link
                        href={"/dashboard/upload"} 
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "upload" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                    >
                        <Save className="h-6 w-6" /> 
                        Upload
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <div>
                <Link 
                    href={"/dashboard"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2] === undefined ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <Home className="h-6 w-6" /> 
                </Link>
            </div>
            <div>
                <Link 
                    href={"/dashboard/bancos"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "bancos" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <Database className="h-6 w-6" />
                </Link>
            </div>
            <div>
                <Link 
                    href={"/dashboard/avisos"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "avisos" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <Send className="h-6 w-6" /> 
                </Link>
            </div>
            <div>
                <Link 
                    href={"/dashboard/upload"} 
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${path[2]  === "upload" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
                >
                    <Save className="h-6 w-6" /> 
                </Link>
            </div>
        </div>
    )
}