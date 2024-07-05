

const defaultLanguage = 'auto';
const defaultSegmentationMethod = 'auto_cut';
const defaultSpeed = 1;
const defaultMaxWords = 50;
const defaultSeed = -1;
const defaultTopK = 5;
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
  model_id: '',
  publish_type: 1,
  local_model: {
    type: "shide",
    "gpt-weights_url": "https://us-west-ddream-audiomodel.s3.us-west-2.amazonaws.com/model_24070510070079/lisa123-e15.ckpt",
    "sovits-weights_url": "https://us-west-ddream-audiomodel.s3.us-west-2.amazonaws.com/model_24070510070079/lisa123_e8_s96.pth"
  },
  basic_params: {
    language: defaultLanguage
  },
  tone: [],
  publish_info: {
    cover_url: "",
    name: "",
    type: "",
    tag: [],
    desc: "",
    source: "original",
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
  model_id: string
  publish_type: 1 | 2
  local_model: {
    type: string
    "gpt-weights_url": string
    "sovits-weights_url": string
  },
  basic_params: {
    language: string
  },
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

export const languageListEn = [{
  value: "auto",
  label: "Automatic Recognition"
}, {
  value: "all_zh",
  label: "Chinese Recognition"
}, {
  value: "en",
  label: "English Recognition"
}, {
  value: "all_ja",
  label: "Japanese Recognition"
}, {
  value: "zh",
  label: "Chinese-English Mixed"
}, {
  value: "ja",
  label: "Japanese-English Mixed"
}];

export const languageListZhcn = [{
  value: "auto",
  label: "自动识别"
}, {
  value: "all_zh",
  label: "按中文识别"
}, {
  value: "en",
  label: "按英文识别"
}, {
  value: "all_ja",
  label: "按日文识别"
}, {
  value: "zh",
  label: "中英混合"
}, {
  value: "ja",
  label: "日英混合"
}];

export const segmentationMethodListZhcn = [{
  value: "auto_cut",
  label: "智能切分"
}, {
  value: "cut0",
  label: "仅凭换行切分"
}, {
  value: "cut1",
  label: "凑四句一切"
}, {
  value: "cut2",
  label: "凑50字一切"
}, {
  value: "cut3",
  label: "按中文句号切。"
}, {
  value: "cut4",
  label: "按英文句号切."
}, {
  value: "cut5",
  label: "按标点符号切"
}];

export const segmentationMethodListEn = [{
  value: "auto_cut",
  label: "Smart Segmentation"
}, {
  value: "cut0",
  label: "Segment by Line Break"
}, {
  value: "cut1",
  label: "Segment Every Four Sentences"
}, {
  value: "cut2",
  label: "Segment Every 50 Characters"
}, {
  value: "cut3",
  label: "Segment by Chinese Period"
}, {
  value: "cut4",
  label: "Segment by English Period"
}, {
  value: "cut5",
  label: "Segment by Punctuation"
}];
