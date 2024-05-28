import {extendVariants, Slider} from "@nextui-org/react";

const NuwaSlider = extendVariants(Slider, {
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
        // base: "max-w-md",
        // trackWrapper: "h-12",
        // thumb: ["after:w-2 after:h-2 after:bg-primary", "w-3 h-3 bg-white"],
        label: "text-gray-500 text-sm font-semibold font-['Inter'] leading-normal",
        // labelWrapper: 'mb-px'
      },
    }
  },
  defaultVariants: { // <- modify/add default variants
    classNames: 'default'
  },
  compoundVariants: [ // <- modify/add compound variants
  ],
});

export default NuwaSlider;
