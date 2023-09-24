// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
	messagingSenderId: process.env
		.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER__ID as string,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
