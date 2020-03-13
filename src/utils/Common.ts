import Router from "next/router";
import { NadeType } from "../models/Nade/NadeType";

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const redirectUserPage = (steamId: string, edit?: boolean) => {
  if (edit) {
    Router.push(`/users/[user]`, `/users/${steamId}?edit=true`);
  } else {
    Router.push(`/users/[user]`, `/users/${steamId}`);
  }
};

export const redirectNadePage = (nadeId: string) => {
  Router.push(`/nades/[nade]`, `/nades/${nadeId}`);
};

export function iconFromType(type?: NadeType) {
  switch (type) {
    case "flash":
      return "/icons/grenades/flash.png";
    case "hegrenade":
      return "/icons/grenades/hegrenade.png";
    case "molotov":
      return "/icons/grenades/molotov.png";
    case "smoke":
      return "/icons/grenades/smoke.png";
    default:
      return null;
  }
}

export function kFormatter(num: number) {
  const isBelow1k = Math.abs(num) > 999;

  if (isBelow1k) {
    // @ts-ignore
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k";
  } else {
    return Math.sign(num) * Math.abs(num);
  }
}

export function cleanGfycatUrl(gfycatIdOrUrl: string): string {
  const index = gfycatIdOrUrl.lastIndexOf("/");
  let gfyId: string | string[] = gfycatIdOrUrl.substr(index + 1);
  gfyId = gfyId.split("-");

  if (typeof gfyId === "string") {
    return gfyId;
  }

  return gfyId[0];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertNever(_: never) {
  // no-op
}

export const pluralize = (count: number, noun: string, suffix = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;

export function LightenDarkenColor(col: string, amt: number) {
  let usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) {
    r = 255;
  } else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amt;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
