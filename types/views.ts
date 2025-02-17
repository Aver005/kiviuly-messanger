import { BellIcon, MessageSquareIcon, PhoneIcon, UsersIcon } from "lucide-react";

export const VIEWS =
[
    {
        name: "Главная",
        path: ["/", "/messages"],
        icon: MessageSquareIcon,
        sidebar: true
    },
    {
        name: "Контакты",
        path: ["/contacts"],
        icon: UsersIcon,
        sidebar: true
    },
    {
        name: "Звонки",
        path: ["/calls"],
        icon: PhoneIcon,
        sidebar: true
    },
    {
        name: "Уведомления",
        path: ["/notifications", "/noti"],
        icon: BellIcon,
        sidebar: true
    }
]