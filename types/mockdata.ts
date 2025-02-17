import { MessageCircleIcon, UsersIcon, PlusCircleIcon, SmileIcon, BellIcon, HashIcon, FolderIcon, KeyIcon, MailIcon, CameraIcon, HeartIcon, StarIcon, ThumbsUpIcon, ThumbsDownIcon, CheckIcon, CrossIcon, ClockIcon, GlobeIcon, LinkIcon, FileIcon, SettingsIcon } from "lucide-react"
import { Category, Message, User, UserStatus } from "./interfaces"

export const USERS = 
{
    SOFIA: {
        id: "user1",
        username: "sofia.martinez",
        firstName: "Sofia",
        lastName: "Martinez"
    } as User,
    DAVID: {
        id: "user2",
        username: "david.lee",
        firstName: "David",
        lastName: "Lee"
    } as User,
    EMMA: {
        id: "user3",
        username: "emma.wilson",
        firstName: "Emma",
        lastName: "Wilson"
    } as User,
    MICHAEL: {
        id: "user4",
        username: "michael.brown",
        firstName: "Michael",
        lastName: "Brown"
    } as User,
    SYSTEM: {
        id: "system",
        username: "system"
    } as User
}

export const MESSAGES: Message[] = 
[
    {
        id: "1",
        type: "text",
        sender: USERS.SOFIA,
        timestamp: "09:00 AM",
        content: "Привет, команда! Как дела? 😊"
    },
    {
        id: "2",
        type: "text",
        sender: USERS.DAVID,
        timestamp: "09:02 AM",
        content: "Привет, София! Все отлично, готовимся к встрече."
    },
    {
        id: "3",
        type: "text",
        sender: USERS.EMMA,
        timestamp: "09:03 AM",
        content: "Доброе утро! Я тоже готова."
    },
    {
        id: "4",
        type: "file",
        sender: USERS.SOFIA,
        timestamp: "09:05 AM",
        fileName: "agenda.pdf",
        fileSize: "1.2 MB",
        content: ""
    },
    {
        id: "5",
        type: "text",
        sender: USERS.DAVID,
        timestamp: "09:06 AM",
        content: "София, ты прислала повестку?"
    },
    {
        id: "6",
        type: "text",
        sender: USERS.SOFIA,
        timestamp: "09:07 AM",
        content: "Да, только что отправила. Проверьте, пожалуйста."
    },
    {
        id: "7",
        type: "text",
        sender: USERS.EMMA,
        timestamp: "09:08 AM",
        content: "Все в порядке, спасибо!"
    },
    {
        id: "8",
        type: "text",
        sender: USERS.MICHAEL,
        timestamp: "09:10 AM",
        content: "Привет всем! Я немного опоздаю на встречу."
    },
    {
        id: "9",
        type: "event",
        sender: USERS.SYSTEM,
        timestamp: "09:11 AM",
        content: "Michael Brown присоединился к чату"
    },
    {
        id: "10",
        type: "text",
        sender: USERS.DAVID,
        timestamp: "09:12 AM",
        content: "Ничего страшного, мы ждем тебя."
    },
    {
        id: "11",
        type: "text",
        sender: USERS.SOFIA,
        timestamp: "09:15 AM",
        content: "Как насчет того, чтобы обсудить проект X?"
    },
    {
        id: "12",
        type: "text",
        sender: USERS.EMMA,
        timestamp: "09:16 AM",
        content: "Да, давайте начнем с этого."
    },
    {
        id: "13",
        type: "text",
        sender: USERS.MICHAEL,
        timestamp: "09:18 AM",
        content: "Я согласен. У нас есть какие-то обновления?"
    },
    {
        id: "14",
        type: "text",
        sender: USERS.SOFIA,
        timestamp: "09:20 AM",
        content: "Я подготовила несколько данных. Дайте мне минуту."
    },
    {
        id: "15",
        type: "file",
        sender: USERS.SOFIA,
        timestamp: "09:22 AM",
        fileName: "projectX_data.xlsx",
        fileSize: "3.4 MB",
        content: ""
    },
    {
        id: "16",
        type: "text",
        sender: USERS.DAVID,
        timestamp: "09:25 AM",
        content: "Отлично, я посмотрю данные."
    },
    {
        id: "17",
        type: "text",
        sender: USERS.EMMA,
        timestamp: "09:27 AM",
        content: "София, ты можешь объяснить, что мы видим в таблице?"
    },
    {
        id: "18",
        type: "text",
        sender: USERS.SOFIA,
        timestamp: "09:30 AM",
        content: "Конечно! Здесь представлены ключевые показатели."
    },
    {
        id: "19",
        type: "text",
        sender: USERS.MICHAEL,
        timestamp: "09:32 AM",
        content: "Понятно, спасибо за объяснение!"
    },
    {
        id: "20",
        type: "text",
        sender: USERS.DAVID,
        timestamp: "09:35 AM",
        content: "Когда мы можем запланировать следующую встречу?"
    },
    {
        id: "21",
        type: "text",
        sender: USERS.EMMA,
        timestamp: "09:36 AM",
        content: "Как насчет следующей среды?"
    },
    {
        id: "22",
        type: "text",
        sender: USERS.SOFIA,
        timestamp: "09:37 AM",
        content: "Мне подходит! А вам, ребята?"
    },
    {
        id: "23",
        type: "text",
        sender: USERS.DAVID,
        timestamp: "09:38 AM",
        content: "Да, я свободен в среду."
    },
    {
        id: "24",
        type: "text",
        sender: USERS.MICHAEL,
        timestamp: "09:39 AM",
        content: "Я тоже. Давайте назначим на 10:00 AM?"
    },
    {
        id: "25",
        type: "event",
        sender: USERS.SYSTEM,
        timestamp: "09:40 AM",
        content: "Встреча запланирована на среду в 10:00 AM"
    }
]



export const INIT_CATEGORIES: Category[] =
[
    {
        id: "friends",
        name: "Friends",
        isOpen: true,
        chats:
        [
            {
                id: 1,
                name: "Conference",
                lastActivityTime: "1 min ago",
                avatar: "/13.svg",
                unread: 2,
                status: UserStatus.ONLINE,
                notificationsMuted: false,
                messages: MESSAGES,
                members: [...Object.values(USERS)],
                type: "chat",
                icon: 'bell'
            },
            {
                id: 2,
                name: "Frances Swann",
                lastActivityTime: "yesterday",
                avatar: "/image.png",
                verified: true,
                unread: 0,
                status: UserStatus.AWAY,
                notificationsMuted: true,
                messages: [],
                members: [USERS.DAVID],
                type: "direct"
            },
        ],
    },
]

export const CHAT_ICONS = 
[
    { id: 'message', Component: MessageCircleIcon, color: '#6c757d' }, // Серый
    { id: 'users', Component: UsersIcon, color: '#5a6268' }, // Темно-серый
    { id: 'plus', Component: PlusCircleIcon, color: '#17a2b8' }, // Бирюзовый
    { id: 'smile', Component: SmileIcon, color: '#ffc107' }, // Желтый
    { id: 'bell', Component: BellIcon, color: '#fd7e14' }, // Оранжевый
    { id: 'hash', Component: HashIcon, color: '#6f42c1' }, // Фиолетовый
    { id: 'folder', Component: FolderIcon, color: '#20c997' }, // Светло-зеленый
    { id: 'key', Component: KeyIcon, color: '#343a40' }, // Темно-серый
    { id: 'mail', Component: MailIcon, color: '#007bff' }, // Синий
    { id: 'camera', Component: CameraIcon, color: '#6c757d' }, // Серый
    { id: 'heart', Component: HeartIcon, color: '#e83e8c' }, // Розовый
    { id: 'star', Component: StarIcon, color: '#ffd700' }, // Золотистый
    { id: 'thumbs-up', Component: ThumbsUpIcon, color: '#28a745' }, // Зеленый
    { id: 'thumbs-down', Component: ThumbsDownIcon, color: '#dc3545' }, // Красный
    { id: 'check', Component: CheckIcon, color: '#28a745' }, // Зеленый
    { id: 'cross', Component: CrossIcon, color: '#dc3545' }, // Красный
    { id: 'clock', Component: ClockIcon, color: '#6c757d' }, // Серый
    { id: 'location', Component: GlobeIcon, color: '#007bff' }, // Синий
    { id: 'link', Component: LinkIcon, color: '#6c757d' }, // Серый
    { id: 'file', Component: FileIcon, color: '#6c757d' }, // Серый
    { id: 'settings', Component: SettingsIcon, color: '#6c757d' }, // Серый
]