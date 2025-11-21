import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
providers: [
CredentialsProvider({
name: "Credentials",
credentials: {
email: {
label: "email:",
type: "text",
},
password: {
label: "password:",
type: "password",
},
},
async authorize(credentials) {
try {
const res = await fetch("http://localhost:3001/api/users/login", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
email: credentials?.email,
password: credentials?.password,
}),
});
const response = await res.json();
console.log(response)
if (response.success===false) {
throw new Error("Invalid credentials");
}
if (response.user) { console.log(response.user)
return { ...response.user, password: null, role:
response.user.role , image: response.user.avatar};
} else {
return null;
}
} catch (error) {
console.log(error);
}
return null;
},
}),
GitHubProvider({
clientId: "8ae91e7483780c86e578",
clientSecret: "a10f093c2d1eb2253b7e3149e8f42b11dafe9fc0",
}),
GoogleProvider({
clientId: "31017781977-c2mev6djp0jd9dte3hcqal7v8ha2tp27.apps.googleusercontent.com",
clientSecret: "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"
})
],
secret: process.env.SECRET,
callbacks: {
async jwt({ token, user }) {
if (user){
token.role = user.role;
token.image = user.image;
}
return token;
},
async session({ session, token }) {
if (session?.user) {
session.user.role = token.role;
session.user.image = token.image;
}
return session;
},
},
}
export default NextAuth(authOptions)