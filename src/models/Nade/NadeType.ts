export const NadeTypes = {
  smoke: "Smoke",
  flash: "Flash",
  molotov: "Molotov",
  hegrenade: "HE Grenade",
};

export type NadeType = keyof typeof NadeTypes;

type NadeTypeOption = {
  key: NadeType;
  text: string;
  value: NadeType;
};

export function nadeTypeString(nadeType?: NadeType) {
  if (!nadeType) {
    return "Missing type";
  }
  return NadeTypes[nadeType];
}

export function nadeTypeOptions() {
  const options: NadeTypeOption[] = [];
  for (const key in NadeTypes) {
    const objKey = key as NadeType;
    const text = nadeTypeString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey,
    });
  }
  return options;
}
