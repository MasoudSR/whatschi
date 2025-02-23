import Image from 'next/image';
import React, { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import { MdAccountCircle } from "react-icons/md";
import SyncModal from './modules/SyncModal';
import { signIn, signOut, useSession } from "next-auth/react"

function AccountMenu({ setContacts, toggleAccountMenu, setToggleAccountMenu }) {

    const { status, data: session } = useSession();
    const [syncModal, setSyncModal] = useState(false)

    return (
        <div className={`bg-green-800 rounded-2xl shadow-inner transition-all duration-300 overflow-hidden mt-4 ${toggleAccountMenu ? "max-h-full" : "max-h-14"}`}>
            <div className='flex justify-between cursor-pointer py-4 px-5' onClick={() => setToggleAccountMenu(!toggleAccountMenu)}>
                <div className='flex gap-1 items-start'>
                    <MdAccountCircle size={20} />
                    <div>
                        Account
                    </div>
                </div>
                <div className='text-gray-300 flex gap-2 items-center'>
                    <div className={`transition-all duration-300 text-sm ${toggleAccountMenu ? "opacity-0 translate-y-6" : "opacity-100"}`}>
                        {status === "loading" ? "Loading" :
                            status === "authenticated" ? session.user.name : "Not Signed In"
                        }
                    </div>
                    <div className={`transition-all duration-300 ${toggleAccountMenu ? "rotate-90" : "rotate-180"}`}>
                        <IoChevronBack size={20} />
                    </div>
                </div>
            </div>
            <div className={`transition-all duration-300 h-[calc(100%-56px)] overflow-y-auto no-scrollbar flex flex-col items-center gap-3 ${toggleAccountMenu ? "opacity-100" : "opacity-100"}`}>
                {status === "loading" &&
                    <div className='p-4 flex flex-col justify-center gap-3 items-center'>
                        <div className='w-8 h-8 animate-spin border-2 border-t-white border-teal-600 rounded-full'></div>
                        <p className="text-sm text-green-50">
                            Checking authentication status...
                        </p>
                    </div>
                }
                {status === "unauthenticated" &&
                    <div className='p-4 flex flex-col justify-center gap-3 items-center'>
                        <p className="text-sm text-green-50">
                            Sign in to sync your contacts and access them on all your devices.
                        </p>
                        <button className='bg-green-700 px-4 py-2 rounded-xl border border-green-700 shadow-md shadow-green-900 flex items-center gap-2' onClick={() => signIn("google")}>
                            <span className='p-1 bg-white rounded-full'>
                                <Image src="/Google-logo.svg" alt='logo' width={20} height={20} />
                            </span>
                            <span className="text-white font-medium">Continue with Google</span>
                        </button>
                    </div>
                }
                {status === "authenticated" &&
                    <div className='p-4 flex flex-col gap-4 w-full'>
                        <div className='flex items-center gap-4'>
                            <div className='rounded-full w-14 h-14 bg-white border shadow-sm text-black flex justify-center items-center'>
                                {session.user.image ?
                                    <Image
                                        src={session?.user?.image}
                                        alt={session?.user?.name}
                                        width={80}
                                        height={80}
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    :
                                    session.user.name.charAt(0)
                                }
                            </div>
                            <div className='flex flex-col items-start'>
                                <span>{session.user.name}</span>
                                <span className='text-gray-200 text-sm'>{session.user.email}</span>
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <button className='px-4 py-2 w-[60%] bg-teal-500 hover:bg-teal-400 rounded-xl shadow-sm shadow-teal-500' onClick={() => setSyncModal(true)}>Sync Contacts</button>
                            <button className='ml-3 px-4 w-[40%] py-2 bg-red-600 hover:bg-red-500 rounded-xl shadow-sm shadow-red-600' onClick={() => signOut()}>Sign Out</button>
                        </div>
                    </div>
                }
            </div>
            {syncModal &&
                <SyncModal setSyncModal={setSyncModal} setContacts={setContacts} />
            }
        </div>
    )
}

export default AccountMenu