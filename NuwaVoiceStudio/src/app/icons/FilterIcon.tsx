const FilterIcon = ({ className }: { className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width="24" height="24" viewBox="0 0 24 24"
      fill="none"
    >
      <g id="filter">
        <path id="Vector 6" d="M4 7H20" stroke="#7C878E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Vector 7" d="M7 12H17" stroke="#7C878E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Vector 8" d="M11 17H13" stroke="#7C878E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};

export default FilterIcon;