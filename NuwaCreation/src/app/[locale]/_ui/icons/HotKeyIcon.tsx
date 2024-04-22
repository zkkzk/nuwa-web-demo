import { twMerge } from 'tailwind-merge';


const HotKeyIcon = ({ className }: { className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width="23" height="23" viewBox="0 0 23 23"
      fill="none"
    >
      <g id="Frame">
        <path id="Vector" d="M0.00718307 3.13672H23V19.864H0.00718307V3.13672Z" fill="#797979"/>
        <path id="Vector_2" d="M6.58888 6.8252H4.35666V9.12448H6.58888V6.8252ZM6.58888 10.3795H4.35666V12.6788H6.58888V10.3795ZM18.6793 6.8252H16.447V9.12448H18.6793V6.8252ZM18.6793 10.3795H16.447V12.6788H18.6793V10.3795ZM14.6555 6.8252H12.4616V9.12448H14.6555V6.8252ZM14.6555 10.3795H12.4616V12.6788H14.6555V10.3795ZM10.6222 6.8252H8.38998V9.12448H10.6222V6.8252ZM10.6222 10.3795H8.38998V12.6788H10.6222V10.3795ZM18.6793 13.9434H4.36624V16.2906H18.6793V13.9434Z" fill="#EFEFEF"/>
      </g>
    </svg>
  );
};

export default HotKeyIcon;