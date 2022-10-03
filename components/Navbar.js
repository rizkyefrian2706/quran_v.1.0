import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from "react";

export default function Navbar(data) {
    const [audioPl, setAudioPl] = useState("show");

  const play = (e, pl) => {
    if (pl == "hidden") {
      setAudioPl("show")
    } else {
      setAudioPl("hidden")
    }
  }
    const headerData = () => {
        return (
            <>
                <div className='flex flex-wrap justify-between items-center cursor-pointer'>
                    {data.surat_selanjutnya != undefined ? (
                        // <Link href={`/${encodeURIComponent(data.surat_selanjutnya.nomor)}`}>

                        <a onClick={(e) => linkDetail(e, data.surat_selanjutnya.nomor)}>
                            <h1>
                                {data.surat_selanjutnya.nama_latin}
                            </h1>
                        </a>
                        // </Link>
                    ) : ""}
                    <h1>
                        {data.nama_latin}
                    </h1>
                    {data.surat_sebelumnya != undefined ? (
                        <a onClick={(e) => linkDetail(e, data.surat_sebelumnya.nomor)}>
                            {/* <Link href={`/${encodeURIComponent(data.surat_sebelumnya.nomor)}`}> */}
                            <h1>
                                {data.surat_sebelumnya.nama_latin}
                            </h1>
                        </a>
                        // </Link>
                    ) : ""}
                </div>
                <div className=' flex flex-wrap justify-center items-center cursor-pointer'>
                    <div className='uppercase'>{data.tempat_turun}</div>
                    <div className=' pl-5 pr-5'>{data.arti}</div>
                    <div>{data.jumlah_ayat} Ayat</div>
                </div>
            </>
        )
    }

    const linkTafsir = (e, nomor) => {
        return router.push({
            pathname: "/tafsir",
            query: {
                surat: nomor,
            },
        })
    }

    return (<header className=' bg-green-600 fixed top-0 left-0 w-full h-16 z-20'>
        <div className="flex items-center justify-between relative ml-10 mr-10">
            <div>
                <Link href="/">
                    Quran Ku
                </Link>
            </div>
            <div className=' w-2/4'>
                {headerData()}
            </div>
            <div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div>
                        <Image src="/quran_.png" alt='quran_' width="20" height="20" className=' object-fill fill-white' />
                    </div>
                    <div onClick={(e) => linkTafsir(e, data.nomor)} className=' ml-2 mr-2'>
                        <Image src="/book.png" alt='book' width="20" height="20" />
                    </div>
                    <div onClick={(e) => play(e, audioPl)} className="mr-5">
                        {audioPl == "show" ? (
                            <Image src="/speaker.png" alt='speaker' width="20" height="20" />
                        ) : (
                            <Image src="/silence.png" alt='speaker' width="20" height="20" />
                        )}
                    </div>
                    <div>
                        <Image src="/quran.png" alt='quran' width="68" height="65" />
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
}
