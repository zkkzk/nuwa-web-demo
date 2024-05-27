import {extendVariants, Select, SelectItem} from "@nextui-org/react";

const NuwaSelect = extendVariants(Select, {
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
        label: "text-gray-500 text-sm font-semibold font-['Inter'] leading-normal group[data-filled=true]:text-gray-500 group-data-[filled=true]:text-gray-500",
        value: "group[data-has-value=true]:text-white group-data-[has-value=true]:text-white text-base font-medium font-['Inter'] w-auto",
        trigger: ["data-[hover=true]:border-primary/50 data-[focus=true]:border-primary data-[open=true]:border-primary"]
      },
    }
  },
  defaultVariants: { // <- modify/add default variants
    classNames: 'default'
  },
  compoundVariants: [ // <- modify/add compound variants
  ],
});

export default NuwaSelect;

export const NuwaSelectItem = extendVariants(SelectItem, {
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
        base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4 selected:bg-zinc-700 color-red data-[selected=true]:text-purple-400',
        title: 'text-white text-sm font-semibold font-["Inter"]',
      },
    }
  },
  defaultVariants: { // <- modify/add default variants
    classNames: 'default'
  },
  compoundVariants: [ // <- modify/add compound variants
  ],
});
