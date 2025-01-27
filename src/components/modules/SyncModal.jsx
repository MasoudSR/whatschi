import loadStorage from '@/helpers/loadStorage';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { BsCloudCheck } from "react-icons/bs";

function SyncModal({ setSyncModal }) {

    const [isSyncing, setIsSyncing] = useState(true)
    const [modalOpened, setModalOpened] = useState(false)
    const [syncMode, setSyncMode] = useState("")
    const [localContactsData, setLocalContactsData] = useState(loadStorage())
    const [syncStatus, setSyncStatus] = useState("")

    useEffect(() => {
        setModalOpened(true)

        const tempData = loadStorage()

        // setLocalContactsData(tempData)

        console.log(tempData);

        setTimeout(() => {
            setIsSyncing(false)
        }, 3000);
    }, [])

    const closeModal = () => {
        setModalOpened(false)
        setTimeout(() => {
            setSyncModal(false)
        }, 500);
    }

    const syncContacts = (mode) => {
        setSyncMode(mode)
        // setSyncStatus("pending")
        setTimeout(() => {
            setSyncStatus("done")
        }, 3000);
    }

    return (
        <div className={`fixed top-0 left-0 flex justify-center items-center transition-all duration-300 w-full h-full  ${modalOpened ? "backdrop-blur-sm bg-slate-800/40" : " backdrop-blur-0"}`}>
            <div className={`transition-all duration-500 overflow-y-scroll no-scrollbar relative bg-teal-500 rounded-xl text-white max-h-[90%] max-w-[90%] ${modalOpened ? "opacity-100" : "opacity-0 scale-50"}`}>
                <div className='bg-teal-600 p-4 shadow-md text-xl'>Sync Contacts</div>
                <button className='absolute top-4 right-3 hover:bg-teal-700 rounded-full p-1' onClick={closeModal}>
                    <RxCross2 size={22} />
                </button>
                <div className='p-4 flex flex-col justify-center items-center'>
                    <div className={`flex flex-col justify-center items-center gap-3 overflow-hidden transition-all duration-300 ${isSyncing ? "max-h-48 scale-100" : "max-h-0 scale-0"}`}>
                        <div className='w-8 h-8 animate-spin border-2 border-t-white border-teal-600 rounded-full'></div>
                        <p>
                            Retrieving contact information from the cloud, please wait.
                        </p>
                    </div>

                    <div className={`flex flex-col transition-all duration-300 ${isSyncing ? "max-h-0 scale-0" : "max-h-[100vh] scale-100"}`}>
                        <div>
                            <div className={`transition-all duration-300 overflow-hidden ${syncMode ? "max-h-0" : "max-h-10"}`}>
                                Choose how to sync your contacts
                            </div>
                            <div className={`transition-all duration-300 flex flex-col items-center overflow-hidden ${syncMode ? "max-h-32" : "max-h-0"}`}>
                                <div className='w-8 h-8 my-2 animate-spin border-2 border-t-white border-teal-600 rounded-full'></div>
                                <div>
                                    Sync in progress...
                                </div>
                            </div>
                        </div>
                        <button className={`flex flex-col transition-all duration-300 items-center bg-teal-700 rounded-xl overflow-hidden shadow-md mt-4 ${syncMode === "cloud" || !syncMode ? "max-h-40 scale-100 mt-4" : "max-h-0 scale-0 mt-0"}`} onClick={() => syncContacts("cloud")} disabled={syncMode}>
                            <div className='bg-teal-700 px-3 py-2'>Keep Cloud Contacts</div>
                            <div className='bg-teal-700 w-full gap-[1px] flex justify-between'>
                                <div className='bg-teal-600 w-full flex items-center justify-center p-1'>50 contacts</div>
                                <div className=' bg-teal-600 w-full p-1'>
                                    <div>Last update:</div>
                                    <div>Jan 20, 2025</div>
                                </div>
                            </div>
                        </button>

                        <button className={`flex flex-col transition-all duration-300 items-center bg-teal-700 rounded-xl overflow-hidden shadow-md mt-4 ${syncMode === "local" || !syncMode ? "max-h-40 scale-100 mt-4" : "max-h-0 scale-0 mt-0"}`} onClick={() => syncContacts("local")} disabled={syncMode}>
                            <div className='bg-teal-700 px-3 py-2'>Keep Local Contacts</div>
                            <div className='bg-teal-700 w-full gap-[1px] flex justify-between'>
                                <div className='bg-teal-600 w-full flex items-center justify-center p-1'>
                                    {localContactsData.contacts.length} contact{localContactsData.contacts.length > 1 && "s"}</div>
                                <div className=' bg-teal-600 w-full p-1'>
                                    <div>Last update:</div>
                                    <div>
                                        {new Date(localContactsData.updatedAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </div>
                                </div>
                            </div>
                        </button>

                        <button className={`flex flex-col transition-all duration-300 items-center bg-teal-700 rounded-xl overflow-hidden shadow-md ${syncMode === "merge" || !syncMode ? "max-h-40 scale-100 mt-4" : "max-h-0 scale-0 mt-0"}`} onClick={() => syncContacts("merge")} disabled={syncMode}>
                            <div className='bg-teal-700 px-3 py-2'>Merge Contacts</div>
                            <div className='bg-teal-600 w-full px-4 py-2'>
                                Combine cloud and local contacts into one unified list.
                            </div>
                        </button>


                    </div>


                </div>

            </div>
        </div>
    )
}

export default SyncModal