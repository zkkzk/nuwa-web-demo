export type TypeVoiceModel = {
  id: number;
  src: string,
  name: string,
  count: number,
  star: boolean,
  publish_id: string,
};

export type TypeVoice = {
  id: number;
  avatar: string,
  name: string,
  tone: string,
  content: string,
  voiceSrc: string,
  datetime: string,
  tags: string,
  type: 'API' | 'FILE'
};

export type TypeVoiceApi = {
  id: number;
  src: string,
  name: string,
  count: number,
};


export const voiceModelTypeList = [{
  value: "male",
  label: "male",
}, {
  value: "female",
  label: "female",
}, {
  value: "boy",
  label: "boy",
}, {
  value: "girl",
  label: "girl",
}]

export type voiceTrainRecordType = {
  id: string
  task_id: number
  task_name: string
  status: number
  result: number,
  task_param: {
    model_id: string,
  }
}