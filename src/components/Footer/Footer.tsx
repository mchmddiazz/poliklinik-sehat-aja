import React from "react";
import Link from "next/link";
import style from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <Link href="https://github.com/mchmddiazz" target="_blank">
        <span className={style.footerCopyright}>&copy; 2024, Development By mchmddiazz</span>  
      </Link>
    </footer>
  ); 
}
export default Footer;