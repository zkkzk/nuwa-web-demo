import React from "react";
import {useRadio, Chip, VisuallyHidden, tv, RadioGroup} from "@nextui-org/react";

const radio = tv({
  slots: {
    base: "border-black hover:bg-gray-200 bg-white h-10 rounded-md border border-black border-opacity-20",
    content: "text-black w-[155px] text-center"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-black bg-black hover:bg-black-500 hover:border-black-500",
        content: "text-white pl-1"
      }
    },
    isFocusVisible: {
      true: { 
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      }
    }
  }
})

const CustomRadio = (props : any) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useRadio({
    ...props
  })

  const styles = radio({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()} onClick={(e) => {
      if (e.currentTarget.getAttribute('data-selected') === "true") {
        // 阻止事件冒泡
        e.stopPropagation();
   
        // 阻止事件的默认行为
        e.preventDefault();
        props.onChange();
      }
    }}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        variant="faded"
        // {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}


export default function NuwaRadio({items, value, onChange}: {
  items: {name: string, value: any}[],
  value: any,
  onChange: (e: any) => void
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <RadioGroup
        orientation="horizontal"
        value={value}
        onChange={(e) => {
          debugger
          onChange(e)
        }}
        classNames={{
          wrapper: "gap-x-10 gap-y-4"
        }}
      >
        {items.map((item) => (
          <CustomRadio key={item.value} value={item.value} onChange={onChange}>{item.name}</CustomRadio>
        ))}
      </RadioGroup>
    </div>
  );
}

