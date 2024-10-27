import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { API } from '@/constant/api';

export const OPTIONS = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile: (profile, tokens) => {
        if (profile) {
          return {
            id: profile.sub,
            name: profile.firstName,
            lastName: profile.family_name,
            firstName: profile.given_name,
            image: profile.picture,
          };
        } else {
          throw new Error('Login Failed');
        }
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email_or_phone_number: {
          label: 'email_or_phone_number',
          type: 'text',
        },
        password: { label: 'password', type: 'password' },
        role: { label: 'role', type: 'text' },
      },
      authorize: async (credentials, req) => {
        if (credentials) {
          try {
            const res = await fetch(API.auth.login, {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json());
            if (res?.message) {
              throw new Error('Login Failed');
            }
            if (res) {
              return res?.response;
            } else {
              return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    session: async ({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) => {
      const sessionInfo = {
        user: {
          id: token.id,
          email: token.email,
          phone_number: token.phone_number,
          full_name: token.full_name,
          gender: token.gender,
          address: token.address,
          status: token.status,
          role: token.role,
        },
        expires: session.expires,
        accessToken: token.token,
      };
      return sessionInfo as Session;
    },
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
  },
};

export const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
