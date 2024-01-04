'use client';

import Logo from "~/assets/HMG-logo-hor-black.svg";

export const Footer: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  return (
    <footer className="bg-gray-200">
      <div className="container py-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <img src={Logo} alt="logo" width="170" height="50" />
      </div>
    </footer>
  )
}
