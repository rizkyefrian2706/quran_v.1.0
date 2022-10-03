import Image from 'next/image'
import { useEffect, useState } from "react";
import { useRouter } from "next/router"

export default function Menu() {
  const router = useRouter()
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);

  const slide1 = () => {
    if (menu1 == false) {
      setMenu1(true)
      setMenu2(false)
      setMenu3(false)
    } else {
      setMenu1(false)
    }
  };

  const slide2 = () => {
    if (menu2 == false) {
      setMenu1(false)
      setMenu3(false)
      setMenu2(true)
    } else {
      setMenu2(false)
    }
  };

  const slide3 = () => {
    if (menu3 == false) {
      setMenu1(false)
      setMenu2(false)
      setMenu3(true)
    } else {
      setMenu3(false)
    }
  };

  const list = () => {
    return router.push({
      pathname: "/"
    })
  }

  return (
    <div className=" bg-[url('/bgg.png')] min-h-screen text-white">
      <header className=' bg-green-600 fixed top-0 left-0 w-full h-16 z-20'>
        <div className="flex items-center justify-between relative ml-10 mr-10">
          <div>Menu</div>
          <div>
            <a onClick={() => list()} className=" cursor-pointer"><h1>Baca Quran</h1></a>
          </div>
          <div className=' flex flex-wrap justify-center items-center'>
            <Image src="/quran.png" alt='quran' width="68" height="65" />
          </div>
        </div>
      </header>

      <div className='max-h-screen overflow-auto'>
        <div className=' p-20 pb-5'>
          <div className='flex flex-wrap justify-center '>
            <div className='w-full lg:w-3/4 md:w-3/4 sm:w-3/4 lg:text-2xl md:text-xl sm:text-lg'>
              <div className='mb-3'>
                <div onClick={() => slide1()} className=' relative z-10 cursor-pointer w-full h-40 bg-green-500 rounded-2xl shadow-lg shadow-black p-3'>
                  <div className=' text-center pt-10'>
                    <p>API Source</p>
                    <p>----</p>
                  </div>
                </div>
                {menu1 == true ? (
                  <div className=' -mt-7 w-full lg:h-40 md:h-36 sm:h-36 pt-7 bg-white rounded-2xl shadow-lg shadow-black p-3 flex flex-wrap justify-between items-center'>
                    <div className=' text-black'>
                      <p className=' text-sm text-gray-500'>Equran.id</p>
                      <a href='https://equran.id/apidev' className='text-blue-500' target="_blank" rel="noreferrer">Developer API</a>
                    </div>
                    <div className=' w-1/4'>
                      <Image src="/quran.png" alt='quran' width="100" height="100" />
                    </div>
                  </div>
                ) : (<></>)}
              </div>
              <div className='mb-3'>
                <div onClick={() => slide2()} className=' relative z-10 cursor-pointer w-full h-40 bg-green-500 rounded-2xl shadow-lg shadow-black p-3'>
                  <div className=' text-center pt-10'>
                    <p>Build With</p>
                    <p>----</p>
                  </div>
                </div>
                {menu2 == true ? (
                  <div className=' -mt-7 w-full lg:h-40 md:h-36 sm:h-36 pt-7 bg-white rounded-2xl shadow-lg shadow-black p-3 flex flex-wrap justify-between items-center'>
                    <div className='flex flex-wrap justify-between items-center w-2/4'>
                      <div className=' text-black'>
                        <a href='https://nextjs.org' className=' text-blue-500' target="_blank" rel="noreferrer">Next.js</a>
                      </div>
                      <div className=' w-1/4 mr-5'>
                        <Image src="/nextjs.png" alt='quran' width="100" height="100" />
                      </div>
                    </div>
                    <div className='flex flex-wrap justify-between items-center w-2/4'>
                      <div className=' text-black'>
                        <a href='https://tailwindcss.com' className=' text-blue-500' target="_blank" rel="noreferrer">Tailwind.css</a>
                      </div>
                      <div className=' w-1/4'>
                        <Image src="/tailwind.png" alt='quran' width="100" height="100" />
                      </div>
                    </div>
                  </div>
                ) : (<></>)}
              </div>
              <div className='mb-3'>
                <div onClick={() => slide3()} className=' relative z-10 cursor-pointer w-full h-40 bg-green-500 rounded-2xl shadow-lg shadow-black p-3'>
                  <div className=' text-center pt-10'>
                    <p>Developer</p>
                    <p>----</p>
                  </div>
                </div>
                {menu3 == true ? (
                  <div className=' -mt-7 w-full lg:h-40 md:h-36 sm:h-36 pt-7 bg-white rounded-2xl shadow-lg shadow-black p-3 flex flex-wrap justify-between items-center'>
                    <div className=' text-black'>
                      <p className=' text-sm text-gray-500'>Rizky Efrian</p>
                      <a href='https://wa.me/6281267725101?text=Saya%20tertarik%20untuk%20bekerja%20sama%20dengan%20Anda' className=' text-xl text-blue-500' target="_blank" rel="noreferrer">Developer</a>
                    </div>
                    <div className=' w-1/4 pt-3'>
                      <Image src="/av.png" alt='quran' width="80" height="80" />
                    </div>
                  </div>
                ) : (<></>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className=' bg-green-600 w-full h-6 text-center text-sm bottom-0 right-0 absolute z-50'>
      QuranKu V.1.0 | @abangmiC 2022 
      </footer>
    </div>
  )
}
