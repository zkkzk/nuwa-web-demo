import {extendVariants, Input} from "@nextui-org/react";

const NuwaInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
    },
    isDisabled: {
    },
    size: {
    },
    classNames: {
      default: {
        // input: ["caret-[#9A77FF] dark:placeholder:text-gray-500/50"],
        // inputWrapper: ["data-[hover=true]:border-primary/50 group-data-[focus=true]:border-primary"],
        label: ["group[data-filled-within=true]:text-gray-500 group-data-[filled-within=true]:text-gray-500", "text-gray-500 text-sm font-semibold font-['Inter'] leading-normal"],
      },
    }
  },
  defaultVariants: { // <- modify/add default variants
    classNames: 'default',
    color: 'primary'
  },
  compoundVariants: [ // <- modify/add compound variants
  ],
});

export default NuwaInput;
