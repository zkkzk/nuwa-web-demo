// MyButton.tsx
import {extendVariants, Button} from "@nextui-org/react";

const NuwaButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {
      indigo: "bg-primary text-white",
    },
    isDisabled: {
    },
    size: {
      // xl: "h-12 text-base rounded-xl rounded-xl px-12 py-3 gap-4",
    },
  },
  defaultVariants: { // <- modify/add default variants
    color: "indigo"
  },
  compoundVariants: [ // <- modify/add compound variants
    {
      isDisabled: "true",
      color: "indigo",
      class: "font-semibold font-['Inter']",
    },
  ],
});

export default NuwaButton;