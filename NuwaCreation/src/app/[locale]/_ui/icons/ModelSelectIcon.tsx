import { twMerge } from 'tailwind-merge';


const ModelSelectIcon = ({ className }: { className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width="22" height="19" viewBox="0 0 22 19"
      fill="none"
    >
      <path id="Vector" d="M9.27113 8.56697L1.02099 4.91585C0.910463 4.86385 0.786098 4.83923 0.661044 4.84458C0.535991 4.84994 0.414899 4.88507 0.310577 4.94627C0.206254 5.00747 0.12258 5.09246 0.0684032 5.19225C0.0142268 5.29204 -0.00843737 5.40291 0.00280799 5.51315V13.5978C0.00405749 13.7014 0.0353306 13.8029 0.093639 13.8928C0.151947 13.9826 0.235343 14.0577 0.335856 14.111L8.56699 18.6623C8.67481 18.7245 8.79987 18.7594 8.92857 18.7632C9.01854 18.7632 9.10764 18.7475 9.19076 18.7171C9.27389 18.6867 9.34942 18.6421 9.41304 18.5858C9.47666 18.5296 9.52713 18.4628 9.56156 18.3893C9.596 18.3158 9.61372 18.237 9.61372 18.1575V9.1138C9.61825 9.00373 9.58875 8.89465 9.52838 8.7983C9.46802 8.70195 9.37908 8.62197 9.27113 8.56697ZM21.6892 4.83171C21.5885 4.78311 21.4756 4.75764 21.3609 4.75764C21.2462 4.75764 21.1333 4.78311 21.0326 4.83171L11.4217 8.56697C11.2999 8.61437 11.1963 8.69213 11.1236 8.79074C11.0509 8.88935 11.0123 9.00453 11.0125 9.12222V18.1659C11.0131 18.272 11.0452 18.3761 11.1056 18.4677C11.166 18.5594 11.2525 18.6354 11.3566 18.6882C11.4606 18.7411 11.5785 18.7688 11.6985 18.7687C11.8185 18.7685 11.9363 18.7405 12.0402 18.6875L21.6416 13.8249C21.7453 13.772 21.8314 13.696 21.8915 13.6045C21.9516 13.513 21.9836 13.4092 21.9842 13.3033V5.34489C21.987 5.24443 21.9615 5.14493 21.91 5.05534C21.8585 4.96575 21.7826 4.8889 21.6892 4.83171ZM20.5568 3.27535C20.5506 3.15326 20.5027 3.03569 20.4195 2.93809C20.3363 2.84049 20.2216 2.76744 20.0906 2.72852L11.4217 0.0280429C11.2886 -0.00934765 11.1456 -0.00934765 11.0125 0.0280429L1.73467 2.89678C1.60552 2.93466 1.49205 3.00568 1.40872 3.10078C1.3254 3.19589 1.276 3.31078 1.26681 3.4308C1.25762 3.55083 1.28907 3.67055 1.35714 3.77472C1.42522 3.87888 1.52683 3.96276 1.64903 4.01568L9.89918 7.66679C9.99432 7.70657 10.0984 7.72671 10.2037 7.72569C10.2948 7.74179 10.3886 7.74179 10.4797 7.72569L20.1 3.95679C20.256 3.91061 20.388 3.81635 20.4719 3.69123C20.5557 3.56612 20.5859 3.4185 20.5568 3.27535H20.5568Z"/>
    </svg>
  );
};

export default ModelSelectIcon;