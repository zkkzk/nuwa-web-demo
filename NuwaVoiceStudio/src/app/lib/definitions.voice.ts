import { VoiceModelToneType } from "./definitions.InstantGenerateParamster";

export type TypeVoiceModel = {
  id: number;
  src: string,
  name: string,
  count: number,
  star: boolean,
  publish_id: string,
  model_id: string,
  tone: Array<VoiceModelToneType>,
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
  task_id: string
  task_name: string
  status: number
  result: number,
  task_param: {
    model_id: string,
  }
}