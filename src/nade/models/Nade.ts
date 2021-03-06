import { UserLight } from "../../users/models/User";
import { CsgoMap } from "../../map/models/CsGoMap";
import { GfycatData } from "./GfycatData";
import { NadeImages } from "./NadeImages";
import { Movement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { Technique } from "./Technique";
import { Status } from "./Status";

export type StatusInfo = string;

export type MapCoordinates = {
  x: number;
  y: number;
};

export type Nade = {
  commentCount: number;
  createdAt: Date | string;
  description?: string;
  downVoteCount?: number;
  endPosition?: string;
  favoriteCount: number;
  gfycat: GfycatData;
  id: string;
  images: NadeImages;
  isFavorited?: boolean;
  isPro?: boolean;
  map?: CsgoMap;
  mapEndCoord?: MapCoordinates;
  movement?: Movement;
  nextUpdateInHours: number;
  oneWay?: boolean;
  score: number;
  slug?: string;
  startPosition?: string;
  status: Status;
  statusInfo?: StatusInfo;
  steamId: string;
  technique?: Technique;
  tickrate?: Tickrate;
  title: string;
  type?: NadeType;
  updatedAt: string;
  upVoteCount?: number;
  user: UserLight;
  viewCount: number;
};

export type NadeLight = {
  commentCount: number;
  createdAt: Date | string;
  downVoteCount?: number;
  endPosition?: string;
  favoriteCount: number;
  gfycat: GfycatData;
  id: string;
  imageLineupThumbUrl?: string;
  images: NadeImages;
  isFavorited?: boolean;
  isPro?: boolean;
  mapEndCoord?: MapCoordinates;
  movement?: Movement;
  nextUpdateInHours: number;
  oneWay?: boolean;
  score: number;
  slug?: string;
  startPosition?: string;
  status: Status;
  technique?: Technique;
  tickrate?: Tickrate;
  title?: string;
  type?: NadeType;
  upVoteCount?: number;
  user: UserLight;
  viewCount: number;
};

export type NadeCreateBody = {
  description: string;
  endPosition: string;
  gfycat: GfycatData;
  imageBase64: string;
  isPro?: boolean;
  lineUpImageBase64?: string;
  map: CsgoMap;
  mapEndCoord: MapCoordinates;
  movement: Movement;
  oneWay?: boolean;
  startPosition: string;
  technique: Technique;
  tickrate?: Tickrate;
  type: NadeType;
};

export type NadeUpdateBody = {
  description?: string;
  endPosition?: string;
  gfycat?: GfycatData;
  imageBase64?: string;
  isPro?: boolean;
  lineUpImageBase64?: string;
  map?: CsgoMap;
  mapEndCoord?: MapCoordinates;
  movement?: Movement;
  oneWay?: boolean;
  slug?: string;
  startPosition?: string;
  status?: Status;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
};

export type NadeStatusDTO = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NewNade = (data: Nade): Nade => {
  return data;
};
