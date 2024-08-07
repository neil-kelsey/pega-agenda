import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header>
      <Image
        src="/pega-logo.svg"
        width={134}
        height={50}
        alt="Pega logo"
      />
    </header>
  );
};

export default Header;