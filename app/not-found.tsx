'use client'
import { BookIcon, ChevronRightIcon, HomeIcon, MessageCircleIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page: React.FC = () =>
{
    const navigate = useRouter();

    return (
        <div className="min-h-full w-full">
            <div className="bg-background">
                <main className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24">
                    <div className="text-center">
                        <p className="text-6xl font-semibold text-indigo-600">404</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-300 sm:text-5xl">
                            Page not found
                        </h1>
                        <p className="mt-6 text-base leading-7 text-gray-500">
                            Sorry, we couldn’t find the page you're looking for.
                        </p>
                    </div>

                    <div className="mt-16 flex justify-center">
                        <div className="w-full max-w-xl">
                            <h2 className="sr-only">Popular pages</h2>
                            <ul role="list" className="space-y-4">
                                <li onClick={() => navigate.push("/")} className="group relative flex cursor-pointer items-center gap-x-4 rounded-lg border border-blue-800/50 p-4 hover:border-blue-600">
                                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg ">
                                        <HomeIcon className="h-6 w-6 text-blue-600/50 group-hover:text-blue-600" />
                                    </div>
                                    <div className="flex-auto">
                                        <h3 className="text-base font-semibold text-gray-300">
                                            <a href="#" className="focus:outline-none">
                                                Welcome
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            This is where it all starts
                                        </p>
                                    </div>
                                    <ChevronRightIcon className='text-gray-500 group-hover:text-white' />
                                </li>
                                <li onClick={() => navigate.push("/messages")} className="group relative flex cursor-pointer items-center gap-x-4 rounded-lg border border-blue-800/50 p-4 hover:border-blue-600">
                                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg ">
                                        <MessageCircleIcon className="h-6 w-6 text-blue-600/50 group-hover:text-blue-600" />
                                    </div>
                                    <div className="flex-auto">
                                        <h3 className="text-base font-semibold text-gray-300">
                                            <a href="#" className="focus:outline-none">
                                                Messages
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Your chats and messages
                                        </p>
                                    </div>
                                    <ChevronRightIcon className='text-gray-500 group-hover:text-white' />
                                </li>
                                <li onClick={() => navigate.push("/contacts")} className="group relative flex cursor-pointer items-center gap-x-4 rounded-lg border border-blue-800/50 p-4 hover:border-blue-600">
                                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg ">
                                        <UserIcon className="h-6 w-6 text-blue-600/50 group-hover:text-blue-600" />
                                    </div>
                                    <div className="flex-auto">
                                        <h3 className="text-base font-semibold text-gray-300">
                                            <a href="#" className="focus:outline-none">
                                                Contacts
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            People who should write to
                                        </p>
                                    </div>
                                    <ChevronRightIcon className='text-gray-500 group-hover:text-white' />
                                </li>
                            </ul>

                            <div className="mt-10 text-center">
                                <a
                                    href="#"
                                    className="text-sm space-x-2 font-semibold text-blue-600 hover:text-blue-400"
                                >
                                    <span aria-hidden="true">&larr;</span>
                                    <span>Back to home</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="border-t border-gray-800 bg-background">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                        <p className="text-center text-sm text-gray-500">
                            &copy; Your Company, Inc. All rights reserved.
                        </p>
                        <div className="mt-8 flex justify-center space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Twitter</span>
                                {/* Twitter icon */}
                            </a>
                            {/* Other social icons */}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Page;