"use client"

import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package2, Home, ShoppingCart, Badge, Package, Users, LineChart, DollarSign, Webhook, List, Database, Send } from "lucide-react";
import Link from "next/link"
import { usePathname } from "next/navigation";

export function MobileSideBar() {
    const path = usePathname().split("/")
    return (
        <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">On BKP</span>
            </Link>
            <Link
              href={"/dashboard/bancos"}
              className={`flex items-center gap-3 rounded-lg py-2 ${path[2]  === "bancos" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
            >
              <Database className="h-5 w-5" />
              Bancos
            </Link>
            <Link
              href={"/dashboard/avisos"}
              className={`flex items-center gap-3 rounded-lg py-2 ${path[2]  === "avisos" ? "text-primary text-lg" : "text-muted-foreground transition-all hover:text-primary"}`}
            >
              <Send className="h-4 w-4"/> 
              Avisos
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    )
}