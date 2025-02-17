import type { Metadata } from "next"
import { AppProvider } from "@/context/AppContext"
import { Sidebar } from "@/components/sidebar"
import Dialogs from "@/components/dialogs/dialogs"
import "@/styles/globals.css"

export const metadata: Metadata =
{
    title: "Kiviuly Messanger",
    description: "",
    generator: "nextjs, react, messanger"
}

export default function RootLayout({children,}: 
    Readonly<{children: React.ReactNode}>
) 
{
    return (
        <html lang="ru">
            <body>
                <AppProvider>
                    <Dialogs />
                    <div className="flex h-screen">
                        <Sidebar />
                        {children}
                    </div>
                </AppProvider>
            </body>
        </html>
    )
}
