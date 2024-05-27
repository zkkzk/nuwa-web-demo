import {extendVariants, Tabs} from "@nextui-org/react";

const NuwaTabs = extendVariants(Tabs, {
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
        base: "bg-neutral-900 rounded-xl",
        tabList: "border border-neutral-700",
        tab: "px-6 py-1.5",
        cursor: "group-data-[selected=true]:bg-neutral-800 ",
        tabContent: "group-data-[selected=true]:text-slate-100 group-data-[selected=true]:font-semibold font-medium font-['Inter']",
        panel: "p-0 w-full"
      },
    }
  },
  defaultVariants: { // <- modify/add default variants
    classNames: 'default'
  },
  compoundVariants: [ // <- modify/add compound variants
  ],
});

export default NuwaTabs;
