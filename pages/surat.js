import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Surat from './api/surat'
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/router"
import ReactAudioPlayer from 'react-audio-player';

export default function Nomor(props) {
  const router = useRouter()
  const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  const [surat, setSurat] = useState([]);
  const [audioPl, setAudioPl] = useState("hidden");

  const play = (e, pl) => {
    if (pl == "hidden") {
      setAudioPl("show")
    } else {
      setAudioPl("hidden")
    }
  }
  console.log("audio", audioPl);
  useEffect(() => {
    async function getFetch() {
      const surats = await Surat.getAllData()
      setSurat(surats)
    }
    getFetch()
  }, []);
  console.log("surats", props.data);

  const loopData = () => {
    return props.data.ayat.map((item) => {
      let arr = e2a(item.nomor.toString())
      return (
        <div key={item.nomor}>
          <div className='rounded-xl p-3 mb-1 bg-green-500 shadow-md shadow-black'>
            <div className=' flex flex-wrap justify-between'>
              <h1>{item.nomor}.</h1>
              <h1 className='  text-right'>{item.ar} ({arr})</h1>
            </div>
            <i>{item.tr}</i><br />
            {item.idn}
          </div>
        </div>
      )
    })
  }

  const linkDetail = (e, nomor) => {
    return router.push({
      pathname: "/surat",
      query: {
        ke: nomor,
      },
    })
  }

  const headerData = () => {
    return (
      <>
        <div className='flex flex-wrap justify-between items-center cursor-pointer lg:text-lg md:text-md sm:text-sm'>
          {props.data.surat_selanjutnya != undefined ? (
            <a onClick={(e) => linkDetail(e, props.data.surat_selanjutnya.nomor)} className=" text-green-400">
              <h1>
                {props.data.surat_selanjutnya.nama_latin}
              </h1>
            </a>
          ) : ""}
          <h1 className=' text-center lg:ml-10 lg:mr-10 md:ml-10 md:mr-10 sm:ml-3 sm:mr-3'>
            {props.data.nama_latin}<br />

            <div className=' flex flex-wrap justify-center items-center cursor-pointer'>
              <div className='uppercase'>{props.data.tempat_turun}</div>
              <div className=' pl-5 pr-5'>{props.data.arti}</div>
              <div>{props.data.jumlah_ayat} Ayat</div>
            </div>
          </h1>
          {props.data.surat_sebelumnya != undefined ? (
            <a onClick={(e) => linkDetail(e, props.data.surat_sebelumnya.nomor)} className="text-green-400">
              {/* <Link href={`/${encodeURIComponent(props.data.surat_sebelumnya.nomor)}`}> */}
              <h1>
                {props.data.surat_sebelumnya.nama_latin}
              </h1>
            </a>
            // </Link>
          ) : ""}
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

  return (
    <div className=" bg-[url('/bgg.png')] min-h-screen text-white w-full">
      {/* <Navbar></Navbar> */}

      <header className=' bg-green-600 fixed top-0 left-0 w-full h-24 z-20 sm:text-xs'>
        <div className="flex flex-wrap items-center justify-between relative lg:ml-10 lg:mr-10 md:ml-5 md:mr-5 sm:ml-2 sm:mr-2">
          <div className=' flex flex-wrap justify-center items-center'>
            <Image src="/quran.png" alt='quran' width="30" height="30" />
            <Link href="/">
              List Quran
            </Link>
          </div>
          <div>
            <div className='flex flex-wrap justify-between items-center cursor-pointer'>
              <div>
                <Image src="/quran_.png" alt='quran_' width="20" height="20" className=' object-fill brightness-150' title='Quran' />
              </div>
              <div onClick={(e) => linkTafsir(e, props.data.nomor)} className=' ml-2 mr-2'>
                <Image src="/book.png" alt='tafsir' width="20" height="20" title='Tafsir' />
              </div>
              <div onClick={(e) => play(e, audioPl)} className="mr-5">
                {audioPl == "show" ? (
                  <Image src="/speaker.png" alt='speaker' width="20" height="20" title='Voice' />
                ) : (
                  <Image src="/silence.png" alt='speaker' width="20" height="20" title='Voice' />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center relative lg:ml-10 lg:mr-10 md:ml-5 md:mr-5 sm:ml-2 sm:mr-2 ">
          <div>
            {headerData()}
          </div>
        </div>
      </header>

      <div className='max-h-screen overflow-auto w-full p-20 pt-28 pb-5'>
        <div className='rounded-2xl '>
          {props.data.nomor != "1" ? (
            <div className='rounded-xl p-3 mb-1 bg-green-500 shadow-md shadow-black text-center'>
              <Image src="/bismillah.png" alt='quran' width="250" height="70" />
            </div>
          ) : <></>}
          {loopData()}
        </div>
        {audioPl == "show" ? (
          <div className=' mb-10'>
          </div>
        ) : (<>
          <footer className=' bg-green-600 w-full h-6 text-center text-sm'>
            QuranKu V.1.0 | @abangmiC 2022
          </footer>
        </>)}
      </div>

      <div className={audioPl} onClick={(e) => play(e, audioPl)}>
        <footer className=' bg-green-600 fixed bottom-0 left-0 w-full h-12 z-20'>
          <div className="flex flex-wrap items-center justify-center relative ml-10 mr-10">
            <ReactAudioPlayer
              src={props.data.audio}
              autoPlay={false}
              controls
              className=' sm:w-full lg:w-2/4 md:w-2/4'
            />
          </div>
        </footer>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {

  const { ke } = context.query;
  if (ke) {
    const data = await Surat.getOneData(ke);
    return {
      props: { data }
    }
  }

}