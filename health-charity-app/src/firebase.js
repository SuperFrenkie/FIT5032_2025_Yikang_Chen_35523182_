// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useUserStore } from './stores/user';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKdT1L3POVH0S3gCYayzoR1rfv2Lw3u3s",
  authDomain: "health-charity-app-b7555.firebaseapp.com",
  projectId: "health-charity-app-b7555",
  storageBucket: "health-charity-app-b7555.appspot.com",
  messagingSenderId: "947957139706",
  appId: "1:947957139706:web:895524f923f723f3596143",
  measurementId: "G-DVKQR9DF7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

// 监听认证状态变化的函数
const initAuthListener = () => {
  const store = useUserStore();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // 用户已登录
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      let userRole = 'user';
      if (docSnap.exists()) {
        userRole = docSnap.data().role;
      }

      console.log(`用户 ${user.email} 已登录，角色为: ${userRole}`);
      store.setUser({
        uid: user.uid,
        email: user.email,
        role: userRole
      });
    } else {
      // 用户已退出
      console.log('用户已退出');
      store.setUser(null);
    }
  });
};

export { auth, db, initAuthListener }; 