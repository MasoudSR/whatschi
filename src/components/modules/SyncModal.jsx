import loadStorage from '@/helpers/loadStorage';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { BsCloudCheckFill } from "react-icons/bs";
import timeAgo from '@/helpers/timeAgo';

function SyncModal({ setSyncModal, setContacts }) {

    const [modalOpened, setModalOpened] = useState(false)
    const [syncMode, setSyncMode] = useState("local")
    const [localContactsData, setLocalContactsData] = useState(loadStorage())
    const [syncStatus, setSyncStatus] = useState("")
    const [syncInProgress, setSyncInProgress] = useState(false)
    const [metadata, setMetadata] = useState(null);
    const [loadingMetadata, setLoadingMetadata] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setModalOpened(true)
        const fetchMetadata = async () => {
            try {
                const response = await fetch("/api/contacts/metadata")
                if (!response.ok) throw new Error("Failed to fetch metadata")
                const data = await response.json()
                setMetadata(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoadingMetadata(false)
            }
        }

        fetchMetadata()
    }, [])

    const closeModal = () => {
        setModalOpened(false)
        setTimeout(() => {
            setSyncModal(false)
        }, 500);
    }

    const syncContacts = (mode) => {
        // setSyncMode(mode)
        setSyncInProgress(true)

        if (mode === "local") {
            const syncLocalContacts = async () => {
                try {
                    const response = await fetch("/api/contacts/local", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json", },
                        body: JSON.stringify(localContactsData),
                    })
                    if (!response.ok) throw new Error("Failed")
                    const res = await response.json()
                    setSyncStatus(res)
                } catch (err) {
                    setError(err.message)
                }
            }
            syncLocalContacts()
        }

        if (mode === "cloud") {
            const syncCloudContacts = async () => {
                try {
                    const response = await fetch("/api/contacts/cloud")
                    if (!response.ok) throw new Error("Failed")
                    const res = await response.json()
                    setSyncStatus({ success: res.success, message: res.message })
                    localStorage.setItem("contactsData", JSON.stringify(res.data));
                    setContacts(res.data.contacts)
                } catch (err) {
                    setError(err.message)
                }
            }
            syncCloudContacts()
        }

        if (mode === "merge") {
            const syncMergeContacts = async () => {
                try {
                    const response = await fetch("/api/contacts/merge", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", },
                        body: JSON.stringify(localContactsData),
                    })
                    if (!response.ok) throw new Error("Failed")
                    const res = await response.json()
                    setSyncStatus({ success: res.success, message: res.message })
                    localStorage.setItem("contactsData", JSON.stringify(res.data));
                    setContacts(res.data.contacts)
                } catch (err) {
                    setError(err.message)
                }
            }
            syncMergeContacts()
        }
    }

    return (
        <div className={`fixed top-0 left-0 flex justify-center items-center transition-all duration-300 w-full h-full z-30  ${modalOpened ? "backdrop-blur-sm bg-slate-800/40" : " backdrop-blur-0"}`}>
            <div className={`transition-all duration-500 overflow-y-scroll no-scrollbar relative bg-teal-500 rounded-xl text-white max-h-[90%] max-w-[90%] ${modalOpened ? "opacity-100" : "opacity-0 scale-50"}`}>
                <div className='bg-teal-600 p-4 shadow-md text-xl'>Sync Contacts</div>
                <button className='absolute top-4 right-3 hover:bg-teal-700 rounded-full p-1' onClick={closeModal}>
                    <RxCross2 size={22} />
                </button>
                <div className='p-4 flex flex-col justify-center items-center'>
                    <div className={`flex flex-col justify-center items-center gap-3 overflow-hidden transition-all duration-300 ${loadingMetadata ? "max-h-48 scale-100" : "max-h-0 scale-0"}`}>
                        <div className='w-8 h-8 animate-spin border-2 border-t-white border-teal-600 rounded-full'></div>
                        <p>
                            Retrieving contact information from the cloud, please wait.
                        </p>
                    </div>

                    <div className={`transition-all duration-300 ${error ? "max-h-[100vh] scale-100" : "max-h-0 scale-0"}`}>
                        <div className='px-5 py-7'>
                            <p>Something went wrong.</p>
                            <p>Please try again later.</p>
                        </div>
                    </div>
                    <div className={`flex flex-col w-full transition-all duration-300 ${loadingMetadata || error ? "max-h-0 scale-0" : "max-h-[100vh] scale-100"}`}>
                        <div>
                            <div className={`transition-all duration-300 flex flex-col items-center overflow-hidden ${syncInProgress ? "max-h-32" : "max-h-0"}`}>
                                <div className={`transition-all duration-300 overflow-hidden ${syncStatus.success ? "max-h-20" : "max-h-0"}`}>
                                    <BsCloudCheckFill size={60} />
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${!syncStatus.success ? "max-h-20" : "max-h-0"}`}>
                                    <div className='w-8 h-8 my-2 animate-spin border-2 border-t-white border-teal-600 rounded-full'></div>
                                </div>

                                <div className={`transition-all duration-300 overflow-hidden ${syncStatus.success ? "max-h-20" : "max-h-0"}`}>
                                    {syncStatus.message && syncStatus.message}
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${!syncStatus.success ? "max-h-20" : "max-h-0"}`}>
                                    Sync in progress...
                                </div>
                            </div>
                        </div>

                        <div className={`transition-all duration-300 ${!syncInProgress ? "max-h-100 scale-100" : "max-h-0 scale-0"}`}>
                            <div className={`flex flex-col transition-all duration-300 items-center rounded-xl overflow-hidden shadow-md`} >
                                <div className='flex w-full bg-teal-700'>
                                    <div className=' px-3 py-2 w-full border-r border-teal-600'>Local</div>
                                    <div className=' px-3 py-2 w-full'>Cloud</div>
                                </div>
                                <div className='flex w-full bg-teal-600'>
                                    <div className='w-full flex flex-col justify-center border-r border-teal-700'>
                                        {localContactsData.contacts.length === 0 ? <div className='py-4'>
                                            No Contacts Saved
                                        </div> : <div className='p-3'>
                                            <div className='flex items-center justify-center'>
                                                {localContactsData.contacts.length} Contact{localContactsData.contacts.length > 1 && "s"}
                                            </div>
                                            <div className='border-t mt-3 pt-3 border-teal-500'>
                                                <div>Updated on</div>
                                                <div>
                                                    {timeAgo(localContactsData.updatedAt)}
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <div className='w-full flex flex-col justify-center'>
                                        {metadata && metadata.contactsCount === 0 ?
                                            <div className='py-4'>
                                                No Contacts Saved
                                            </div>
                                            :
                                            <div className='p-3'>
                                                <div className='flex items-center justify-center'>
                                                    {metadata && metadata.contactsCount} Contact{metadata && metadata.contactsCount > 1 && "s"}
                                                </div>
                                                <div className='border-t mt-3 pt-3 border-teal-500'>
                                                    <div>Updated on</div>
                                                    <div>
                                                        {metadata && metadata.updatedAt ?
                                                            timeAgo(metadata.updatedAt) : "Never"}
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                                <div className='text-center w-full py-2 text-sm bg-teal-700'>
                                    <div className=''>Last Synced {metadata && metadata.lastSync ?
                                         timeAgo(metadata.lastSync) : "Never"}
                                    </div>
                                </div>
                            </div>

                            <p className='mt-4'>
                                Choose how to sync your contacts
                            </p>

                            <div className='grid grid-cols-3 mt-4 rounded-lg overflow-hidden relative bg-teal-700'>
                                <button className={`px-2 z-10 transition-all h-14 duration-200 ${syncMode === "local" ? " text-teal-700" : "text-white"}`} onClick={() => { setSyncMode("local") }}>Keep Local</button>
                                <button className={`px-2 z-10 transition-all duration-200 ${syncMode === "cloud" ? " text-teal-700" : "text-white"}`} onClick={() => { setSyncMode("cloud") }}>Keep Cloud</button>
                                <button className={`px-2 z-10 transition-all duration-200 ${syncMode === "merge" ? " text-teal-700" : "text-white"}`} onClick={() => { setSyncMode("merge") }}>Merge</button>
                                <div className={`absolute left-1 top-1 w-[32%] rounded-md h-12 bg-white z-0 transition-all duration-300 ${syncMode === "cloud" && "translate-x-[103%]"}  ${syncMode === "merge" && "translate-x-[206%]"}`}></div>
                            </div>

                            <button className='border w-full border-teal-700 bg-teal-600 rounded-lg mt-5 p-3' onClick={() => syncContacts(syncMode)} disabled={syncInProgress || loadingMetadata || error}>Sync Now</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SyncModal