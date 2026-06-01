import { redirect } from 'next/navigation';

export default function RootRedirect() {
  // Automatically redirect base domain visitors to the Vietnamese version
  redirect('/vi');
}