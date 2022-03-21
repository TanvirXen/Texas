import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import firebases from  "../components/firebaseConfig";
import Loader from '../components/loader';
import {useRouter} from "next/router";
import {DataContext} from '../components/context'
import firebase from "firebase/app";
import { createTheme, ThemeProvider } from '@mui/material/styles';
function MyApp({ Component, pageProps }) {
  const db = firebase.firestore();
  const [value, setValue] = useState()
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: '#B6EFB4',
      },
    },
  });
  
  async function fetchProduct() {
		let obj = [];
		await db
			.collection("Products")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					obj.push(doc.data());
				});
				setValue(obj);
			});
	}
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  let i=0
  useEffect( async () => {
    i++
    await firebases.isInitialized().then(async()=> await fetchProduct()
      
    )
    setFirebaseInitialized(true);
  }

  , []);

  return (
    <>
      {!firebaseInitialized ? (
    
        <div className="fullscreenflexmiddle">
          <Loader />
        </div>
 
      ) : (
        <DataContext.Provider value={{value, setValue}}>
          <ThemeProvider theme={outerTheme}>
          <Component {...pageProps} />
          </ThemeProvider>
        </DataContext.Provider>
      )}
    </>
  );
}
export default MyApp;