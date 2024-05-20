import { TypeAvatar } from "./definitions.avatar";
import { TypeVoiceType, voiceSex } from "./definitions.voice";

export type TypeChara = {
  name: string;
  description: string;
  personality: string;
  scenario: string;
  first_mes: string;
  mes_example: string;
  creatorcomment: string;
  avatar: string;
  chat: string;
  talkativeness: string;
  fav: Boolean;
  spec: string;
  spec_version: string;
  data: {
    name: string;
    description: string;
    personality: string;
    scenario: string;
    first_mes: string;
    mes_example: string;
    creator_notes: string;
    system_prompt: string;
    post_history_instructions: string;
    tags: string;
    creator: string;
    character_version: string;
    alternate_greetings: string[];
    extensions: {
      avatar?: string | undefined;
      talkativeness: string;
      fav: Boolean;
      world: string;
      depth_prompt: {
        prompt: string;
        depth: number;
      };
      languages: string[],
      level: string,
      cclicense: string,
      // 角色卡当前应用的 背景图 配置
      nuwa_bg?: NuwaBackgroundExtensionConfig
      
      // 角色卡当前应用的 tts 配置 
      nuwa_voice?: NuwaVoiceExtensionConfig
      // 角色卡绑定的所有 tts 列表
      nuwa_voices?: NuwaVoicesExtensionConfig 
    
      // 角色卡当前应用的 形象 配置
      nuwa_avatar?: NuwaAvatarExtensionConfig
      // 角色卡绑定的所有 形象 列表
      nuwa_avatars: {
        version: string
        list: Array<TypeAvatar>
      }
    };
    character_book?: TypeWorldBook;
  };
  create_date: string;
};

export enum CharacterAvatarType {
  Live2D = 'LIVE2D',
  VRM = 'VRM',
  Img = 'IMAGE',
}

// 角色卡当前应用的 形象 配置
export interface NuwaAvatarExtensionConfig extends NuwaExtensionConfigBase {
  type: CharacterAvatarType
  url: string
  name?: string
}

// 角色卡当前应用的 背景图 配置
export interface NuwaBackgroundExtensionConfig extends NuwaExtensionConfigBase {
  url: string
}

export type TypeCharaList = TypeCharaListItem[];

export type TypeCharaListItem = {
  uid: string;
  chara: TypeChara;
  cover_url?: string,
  cover: string,
};
export type TypeWorldBook = {
  name: string;

  entries: {[index: string]: TypeWorldBookEntriy};
  // entries: Array<TypeWorldBookEntriy> | [];
};

export type TypeWorldBookEntriy = {
  uid: string;
  keys: string[];
  secondary_keys: string[];
  comment: string;
  content: string;
  constant: Boolean | null;
  selective: Boolean;
  insertion_order: Number;
  enabled: Boolean;
  position: Number | null;
  depth: Number;
  extensions: {
    exclude_recursion: Boolean;
    display_index: string;
    probability: Number;
    useProbability: Boolean;
  };
};
export type TypeWorldBookItem = {
  uid: string;
  worldBook: TypeWorldBook;
};

export type TypeWorldBookList = TypeWorldBookItem[];

export enum NuwaExtensionVersion {
  V1 = '1.0',
}
// Nuwa 扩展公共配置基类
export interface NuwaExtensionConfigBase {
  // 为后续升级预留，当前（20240520）只有固定值为 1.0
  version: NuwaExtensionVersion
  // 指示是否禁用扩展，只有值为 true 的时候禁用，其他值忽略
  disable?: boolean
}

// 角色卡当前应用的 tts 配置 
export interface NuwaVoiceExtensionConfig extends NuwaExtensionConfigBase {
  type: TypeVoiceType
  sex: voiceSex
  name: string
  language: string
}

// 角色卡绑定的所有 tts 列表
export interface NuwaVoicesExtensionConfig extends NuwaExtensionConfigBase {
  list: NuwaVoiceExtensionConfig[]
}