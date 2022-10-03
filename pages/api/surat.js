import axios from "axios";

class Surat { 
  static async getAllData() {
    try {
      const res = await axios.get('https://equran.id/api/surat', {
        headers: {
          'accept': 'application/json',
        }
      })
      console.log("sampai", res);
      return res.data ? res.data : []
    } catch (err) {
      console.log(err)
      //   setErrorMessage(err)
      return []
    }
  }

  static async getOneData(nomor) {
    console.log("nomor", +nomor);
    try {
      const res = await axios.get('https://equran.id/api/surat/' + nomor, {
        headers: {
          'accept': 'application/json',
        }
      })
      return res.data ? res.data : []
    } catch (err) {
      console.log("errorrr", err)
      //   setErrorMessage(err)
      return []
    }
  }
  
  static async getTafsir(nomor) {
    console.log("nomor", +nomor);
    try {
      const res = await axios.get('https://equran.id/api/tafsir/' + nomor, {
        headers: {
          'accept': 'application/json',
        }
      })
      return res.data ? res.data : []
    } catch (err) {
      console.log("errorrr", err)
      //   setErrorMessage(err)
      return []
    }
  }
  
}
export default Surat
