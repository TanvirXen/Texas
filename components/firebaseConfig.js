
import fire from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const config = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
class Firebase {
  constructor() {
      if (!fire.apps.length) {
          fire.initializeApp(config);
      }
      this.auth = fire.auth()
     
  }

  async login({ email, password }) {
      return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
      return await this.auth.signOut()
  }


  isInitialized() {
      return new Promise(resolve => {
          this.auth.onAuthStateChanged(resolve)
      })
  }

  isLoggedIN() {
      if (this.auth.currentUser) {
          return true
      } else {
          return false
      }
  }

}

export default new Firebase()