<template>
  <v-container class="bg" fluid>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="390">
      <v-card>
        
        <v-card-title>Login with google</v-card-title>
        <v-card-text class="text-center pb-0">
          <v-btn @click="loginGoogle()" class="mb-4"><v-icon left>mdi-google</v-icon>Login with google</v-btn>
        </v-card-text>
        
        <v-card-title>Login or Signup with email</v-card-title>
        <v-card-text>
            <v-form autocomplete="off" ref="form" v-model="valid" lazy-validation >
              <v-text-field 
                :name="Math.random()"
                v-model="email" :rules="emailRules" label="E-mail" required 
                autocomplete="off"
                ></v-text-field>
              <v-text-field
                v-model="pass"
                autocomplete="off"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                :name="Math.random()"
                label="Normal with hint text"
                hint="At least 8 characters"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-form>
            <v-alert
              v-if="error"
              dense
              outlined
              type="error"
            >
            {{errorText}}
            </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="signup(email,pass)">signup</v-btn>
          <v-btn @click="login(email,pass)">login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import { db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { doc, getDoc, setDoc} from 'firebase/firestore';

export default {
  name: 'Login',
  data: ()=>({
    error: false,
    errorText: "Error",
    dialog: true,
    valid:true,
    email:"",
    show: false,
      rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    pass:""
  }),
  mounted() {

  },
  methods: {
    // Регистрация нового пользователя
    signup(email, pass) {
      createUserWithEmailAndPassword(getAuth(), email, pass)
      .then((user_cred) => {
        const user = user_cred.user;
        // console.log(user);
        let user_ref = doc(db,"users", user.uid); 
        getDoc(user_ref)
        .then((user_snp)=> {
          if(!user_snp.exists()) {
            // console.log("Create user doc", user, user_snp);
            setDoc(user_ref, {id:user.uid, email});
          } else {
            user_snp;
          }
        })
        .then(()=> {
          // console.log(user_snp);
          this.$router.push("/");
        })
      })
      .catch((err) => {
        switch (err.code) {
            case 'auth/email-already-in-use':
              this.errorText = (`Email address ${email} already in use.`);
              break;
            case 'auth/invalid-email':
              this.errorText = (`Email address ${email} is invalid.`);
              break;
            case 'auth/operation-not-allowed':
              this.errorText = (`Error during sign up.`);
              break;
            case 'auth/weak-password':
              this.errorText = ('Password is not strong enough. Add additional characters including special characters and numbers.');
              break;
            default:
              this.errorText = (err.message);
              break;
          }
          this.error = true;
      });
    },

    login(email, pass) {
      signInWithEmailAndPassword(getAuth(), email, pass)
      .then((user_cred) => {
        const user = user_cred.user;
        // console.log(user);
        let user_ref = doc(db,"users", user.uid); 
        getDoc(user_ref)
        .then((user_snp)=> {
          if(!user_snp.exists()) {
            console.log("Create user doc", user, user_snp);
            setDoc(user_ref, {id:user.uid, email});
          } else {
            user_snp;
          }
        })
        .then(()=> {
          // console.log(user_snp);
          this.$router.push("/");
        })
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/user-not-found':
            this.errorText = (`Email address ${email} already in use.`);
            break;
          case 'auth/wrong-password':
            this.errorText = (`Wrong password`);
            break;
          default:
            this.errorText = (err.message);
            break;
        }
        this.error=true;
        console.log(err.code)
      });
    },

    loginGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(credential, token, user);
        this.$router.push("/");
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorCode, errorMessage, email, credential);
      })
    }
  }
};
</script>

<style scoped>
.bg {
  height: 100%;
  background-image: url('../assets/background.jpg') !important;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
