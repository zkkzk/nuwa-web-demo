import React, { createRef, RefObject, useRef } from "react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import dynamic from 'next/dynamic';
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
const InsertUserOrChar = dynamic(() => import("../components/InsertUserOrChar"), { ssr: false })

export default function Mes_Example() {
  const descTextareaRefs = useRef<{ [key: string]: RefObject<HTMLElement> | null }>({});
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();

  let initNewMesExampleList = charaListItem.chara.data.mes_example.split('<START>');
  initNewMesExampleList = initNewMesExampleList.filter((_, index: number) => {
    return index !== 0;
  })
  
  initNewMesExampleList.map((item, index)=> {
    descTextareaRefs.current[index] = createRef<HTMLElement>();
    return item;
  });
  const [mesExampleList, setMesExampleList] = React.useState(initNewMesExampleList);

  const setCharaListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            mes_example: newValue,
          }
        }
      },
    })
  }

  const saveMesExample = (newMesExampleList: string[]) => {
    // 保存到chara
    setCharaListItem(mesExampleListToMesExample(newMesExampleList));

  }

  const mesExampleListToMesExample = (mesExampleList: string[]) => {
    const newMesExample = mesExampleList.map((item) => {
      return `<START>${item}`;
    }).join('');
    return newMesExample;
  }


  const insertNewMesExample = () => {
    descTextareaRefs.current[mesExampleList.length] = createRef<HTMLElement>();
    const newMesExampleList = [
      ...mesExampleList,
      ''
    ]
    setMesExampleList(newMesExampleList);
    saveMesExample(newMesExampleList);
  }


  const updateMesExamplePlist = (newMesExample: string, index: number) => {
    let newMesExampleList = [] as string[];
    newMesExampleList = mesExampleList.map((item, index2) => {
      if (index === index2) {
        return newMesExample;
      }
      return item;
    });
    setMesExampleList(newMesExampleList);
    saveMesExample(newMesExampleList);
}

  return (
    <>
      <div
        onClick={() => {
          insertNewMesExample();
        }}
        className=" relative cursor-pointer text-xl border border-black border-solid rounded-[30px] w-full h-[236px] flex items-center justify-center bg-no-repeat bg-[bottom_0.5rem_right_1rem] bg-white bg-[url('/character-mesExample-add-first-bg.png')]">

        <div className=" absolute left-4 text-sm">
          <p>Tips：请按玩家、数字生命的顺序依次添加对话。</p> 
          <p>例如：</p>
          <p>{`{{user}}:你好`}</p>
          <p>{`{{char}}:我很好谢谢！`}</p>
        </div>
        <div className="shrink-0">
          添加对话示例
        </div>
      </div>


      {mesExampleList.map((item, index) =>{
        return (
        <div className="flex flex-row gap-4 mt-4" key={index}>
          <div
            className="group relative p-10 flex flex-row items-end cursor-pointer text-xl bg-black rounded-[40px] w-full min-h-[300px] bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-list-item-bg.png')]"
          >
            <div className="mr-4 grow h-full">
              <textarea
                ref={r => { (descTextareaRefs.current[index] as any) = r; }}
                placeholder="请在这里填写对话示例"
                value={item}
                onChange={e => {
                  updateMesExamplePlist(e.target.value, index)
                }}
                className="border-none outline-none w-full h-full resize-none mb-6 bg-transparent text-white"
              />
            </div>


            <Popover placement="top" color='warning'>
              <PopoverTrigger>
                <Button
                  className="absolute top-10 right-10 bg-white text-white opacity-0 group-hover:opacity-100"
                  startContent={<TrashIcon className="h-5 w-5 text-black"/>}
                  isIconOnly
                ></Button>
              </PopoverTrigger>
              <PopoverContent>
                <Button 
                  className="w-full" 
                  size="sm" 
                  color="warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newMesExampleList = mesExampleList.filter((_, i) => i !== index);
                    setMesExampleList(newMesExampleList);
                    saveMesExample(newMesExampleList);
                  }}
                >    
                  {t('Previews.mymindismadeup')}
                </Button>
              </PopoverContent>
            </Popover>

            <div className="opacity-0 group-hover:opacity-100">
              <InsertUserOrChar getTextRef={()=>{return descTextareaRefs.current[index] as any}} onDone={(newValue) => {
                updateMesExamplePlist(newValue, index);
              }} />
            </div>
            
          </div>
        </div>
      )})}
      <div className="flex flex-row-reverse mt-2">
        <Button onClick={insertNewMesExample} variant="light" className="w-[200px]" endContent={<PlusIcon className="h-4 w-4 text-black"/>}>增加对话示例</Button> 
      </div>   


      {/* <div className="flex justify-end mt-10 w-full">
        <Link href='/character/avatar'>
          <Image className="cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
        </Link> 
      </div> */}
     
    </>
  );
}
