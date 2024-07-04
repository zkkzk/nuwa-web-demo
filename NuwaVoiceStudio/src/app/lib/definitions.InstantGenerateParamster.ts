

const defaultLanguage = 'en';
const defaultSegmentationMethod = 'zh';
const defaultSpeed = 1;
const defaultMaxWords = 25;
const defaultSeed = -1;
const defaultTopK = 3;
const defaultTopP = 0.8;
const defaultTemperature = 0.8;

export const DefaultInstantGenerateParamster = {
  language: defaultLanguage,
  segmentationMethod: defaultSegmentationMethod,
  speed: defaultSpeed,
  maxWords: defaultMaxWords,
  seed: defaultSeed,
  topK: defaultTopK,
  topP: defaultTopP,
  temperature: defaultTemperature,
};

export type TypeInstantGenerateParamster = {
  language: string,
  segmentationMethod: string,
  speed: number,
  maxWords: number,
  seed: number,
  topK: number,
  topP: number,
  temperature: number,
};

export const DefaultVoiceModelFormData: VoiceModelFormDataProps = {
  model_id: null,
  publish_type: "1",
  local_model: {
    type: "shide",
    "gpt-weights_url": "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
    "sovits-weights_url": "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3"
  },
  basic_params: {
    language: defaultLanguage,
    speed: defaultSpeed,
    seg_method: defaultSegmentationMethod,
    "m_w_a_p_s": defaultMaxWords,
  },
  dvance_params: {
    seed: defaultSeed,
    top_k: defaultTopK,
    top_p: defaultTopP,
    temperature: defaultTemperature,
  },
  tone: [],
  publish_info: {
    cover_url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
    name: "",
    type: "",
    tag: [],
    desc: "",
    source: "",
    permission: {
      credit_free: true,
      reprint_allowed: true,
      download_permission: true,
      modification_allowed: true,
      permission_change_allowed: true,
      commercial_license: true
    }
  }
}


export type VoiceModelFormDataProps = {
  model_id: string | null
  publish_type: "1" | "2"
  local_model: {
    type: string
    "gpt-weights_url": string
    "sovits-weights_url": string
  },
  basic_params: VoiceModelBasicParamsType,
  dvance_params: VoiceModelAdvancedParamsType,
  tone:  Array<VoiceModelToneType>,
  publish_info: VoiceModelInfoType
}

export type VoiceModelBasicParamsType = {
  language: string | null
  speed: number | null
  seg_method: string | null
  "m_w_a_p_s": number | null
}

export type VoiceModelAdvancedParamsType = {
  seed: number | null
  top_k: number | null
  top_p: number | null
  temperature: number | null
}

export type VoiceModelToneType = {
  tone_type: string
  audio_url: string
  text: string
}

export type VoiceModelInfoType = {
  cover_url: string
  name: string
  type: string
  tag: Array<string>
  desc: string
  source: string
  permission: {
    credit_free: boolean
    reprint_allowed: boolean
    download_permission: boolean
    modification_allowed: boolean
    permission_change_allowed: boolean
    commercial_license: boolean
  }
}
