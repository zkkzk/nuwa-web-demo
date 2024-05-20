export enum CharacterAvatarType {
  LIVE2D = 'LIVE2D',
  VRM = "VRM",
  IMAGE = 'IMAGE',
}

export type TypeAvatar = {
  url: string;
  name?: string;
  type: CharacterAvatarType,
}
