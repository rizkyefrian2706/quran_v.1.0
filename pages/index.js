import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Surat from './api/surat'
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  const [surat, setSurat] = useState([]);
  const [side, setSides] = useState(false);

  const [suratfil, setSuratFil] = useState([]);
  async function getFetch() {
    const surats = await Surat.getAllData()
    setSurat(surats)
    setSuratFil(surats)
  }
  useEffect(() => {
    getFetch()
  }, []);

  const linkDetail = (e, nomor) => {
    return router.push({
      pathname: "/surat",
      query: {
        ke: nomor,
      },
    })
  }

  const loopData = () => {
    return suratfil.map((item) => {
      return (
        <div key={item.nomor} className='cursor-pointer w-72 h-44 bg-green-500 rounded-2xl mb-3 shadow-lg shadow-black p-3'>
          <a onClick={(e) => linkDetail(e, item.nomor)}>
              <div>{item.nomor}. {item.nama_latin}</div>
              <div className=' text-center pt-5'>
                <p  >{item.nama}</p>
                <p  >({item.arti})</p>
              </div>
              <div className=' text-center'>
                <div >{item.jumlah_ayat} Ayat | {item.tempat_turun}</div>
              </div>
          </a>
        </div>
      )
    })
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log("suratsurat", surat);
    result = surat.filter((data) => {
      let dt = data.nama_latin.toLowerCase();
      return dt.search(value) != -1;
    });
    if (value.length == 0) {
      getFetch()
    }
    setSuratFil(result);
    console.log("asdasdasd", suratfil);
  }

  const sidebar = () => {
    side == false ? (setSides(true)) : (setSides(false))
  };

  const menu = () => {
    return router.push({
      pathname: "/menu"
    })
  }

  return (
    <div className=" bg-[url('/bgg.png')] min-h-screen text-white lg:text-xl md:text-lg sm:text-md">
      <header className=' bg-green-600 fixed top-0 left-0 w-full h-16 z-20'>
        <div className="flex items-center justify-between relative ml-10 mr-10">
          <div><a onClick={() => menu()} className=" cursor-pointer">Menu</a></div>
          <div>
            <input type="text" onChange={(event) => handleSearch(event)} className="ml-2 lg:w-96 md:w-96 border-2 lg:p-2 md:p-2 sm:p-1 rounded-xl border-green-300" placeholder='Search' />
          </div>
          <div className=' flex flex-wrap justify-center items-center'>
            <Image src="/quran.png" alt='quran' width="68" height="65" /> 
          </div>
        </div>
      </header>

      <div className='max-h-screen overflow-auto'>
        <div className=' p-20 pb-5'>
          <div className='flex flex-wrap lg:justify-between md:justify-between sm:justify-center w-full'>
            {loopData()}
          </div>
        </div>
      <footer className=' bg-green-600 w-full h-6 text-center text-sm bottom-0 right-0 absolute z-50'>
      QuranKu V.1.0 | @abangmiC 2022 
      </footer>
      </div>
    </div>
  )
}
