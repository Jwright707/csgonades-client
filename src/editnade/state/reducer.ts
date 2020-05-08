import { Reducer, useReducer, useMemo, useCallback } from "react";
import {
  NadeCreateBody,
  Nade,
  MapCoordinates,
  NadeUpdateBody,
  Status,
} from "../../models/Nade/Nade";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { GfycatData } from "../../models/Nade/GfycatData";
import { NadeType } from "../../models/Nade/NadeType";
import { Movement } from "../../models/Nade/NadeMovement";
import { Technique } from "../../models/Nade/Technique";
import { useGetOrUpdateToken } from "../../store/AuthStore/hooks/useGetToken";
import { useDisplayToast } from "../../store/ToastStore/hooks/useDisplayToast";
import { NadeApi } from "../../api/NadeApi";
import { useRouter } from "next/router";

interface EditNadeState extends Partial<NadeCreateBody> {
  originalNade: Nade;
  showImageAdder: boolean;
  loading: boolean;
  slug?: string;
  status?: Status;
}

type SetMap = {
  type: "CreateNade/SetMap";
  map: CsgoMap;
};

type SetGfyData = {
  type: "CreateNade/SetGfyData";
  data: GfycatData;
};

type SetEndPosition = {
  type: "CreateNade/SetEndPosition";
  endPosition: string;
};

type SetStartPosition = {
  type: "CreateNade/SetStartPosition";
  startPosition: string;
};

type SetDescription = {
  type: "CreateNade/SetDescription";
  description: string;
};

type SetNadeType = {
  type: "CreateNade/SetNadeType";
  nadeType: NadeType;
};

type SetMovement = {
  type: "CreateNade/SetMovement";
  movement: Movement;
};

type SetImage = {
  type: "CreateNade/SetImage";
  image: string;
};

type ShowImageSelector = {
  type: "CreateNade/ShowImageSelector";
};

type SetEndPosCoords = {
  type: "CreateNade/SetEndPosCoords";
  coords: MapCoordinates;
};

type SetTechnique = {
  type: "CreateNade/SetTechnique";
  technique: Technique;
};

type SetLoading = {
  type: "CreateNade/SetLoading";
};

type SetNotLoading = {
  type: "CreateNade/SetNotLoading";
};

type SetOneWay = {
  type: "EditNade/SetOneWay";
  oneWay: boolean;
};

type Actions =
  | SetMap
  | SetGfyData
  | SetEndPosition
  | SetStartPosition
  | SetDescription
  | SetNadeType
  | SetMovement
  | SetImage
  | ShowImageSelector
  | SetEndPosCoords
  | SetTechnique
  | SetLoading
  | SetNotLoading
  | SetOneWay;

const reducer: Reducer<EditNadeState, Actions> = (state, action) => {
  console.log(action.type, action);
  switch (action.type) {
    case "CreateNade/SetMap":
      return {
        ...state,
        map: action.map,
      };
    case "CreateNade/SetGfyData":
      return {
        ...state,
        gfycat: action.data,
      };
    case "CreateNade/SetEndPosition":
      return {
        ...state,
        endPosition: action.endPosition,
      };
    case "CreateNade/SetStartPosition":
      return {
        ...state,
        startPosition: action.startPosition,
      };
    case "CreateNade/SetDescription":
      return {
        ...state,
        description: action.description,
      };
    case "CreateNade/SetNadeType":
      return {
        ...state,
        type: action.nadeType,
      };
    case "CreateNade/SetMovement":
      return {
        ...state,
        movement: action.movement,
      };
    case "CreateNade/SetImage":
      return {
        ...state,
        imageBase64: action.image,
        showImageAdder: false,
      };
    case "CreateNade/ShowImageSelector":
      return {
        ...state,
        showImageAdder: !state.showImageAdder,
      };
    case "CreateNade/SetEndPosCoords":
      return {
        ...state,
        mapEndCoord: action.coords,
      };
    case "CreateNade/SetTechnique":
      return {
        ...state,
        technique: action.technique,
      };
    case "CreateNade/SetLoading":
      return {
        ...state,
        loading: true,
      };
    case "CreateNade/SetNotLoading":
      return {
        ...state,
        loading: false,
      };
    case "EditNade/SetOneWay":
      return {
        ...state,
        oneWay: action.oneWay,
      };
    default:
      return state;
  }
};

export const useEditNadeState = (nade: Nade) => {
  const router = useRouter();
  const displayToast = useDisplayToast();
  const getToken = useGetOrUpdateToken();
  const [state, dispatch] = useReducer(reducer, {
    originalNade: nade,
    showImageAdder: false,
    loading: false,
  });

  const onUpdate = useCallback(async () => {
    const updateDto = createNadeUpdateBody(state);

    const changedFields = Object.keys(updateDto).length;

    console.log({
      updateDto,
    });

    if (!changedFields) {
      displayToast({
        severity: "info",
        title: "Nothing Changed",
        message: "Nothing changed from original nade",
      });
      return;
    }

    const token = await getToken();
    if (!token) {
      displayToast({
        severity: "error",
        title: "Not Signed In",
        message: "You don't seem to be signed in.",
      });
      return;
    }

    const result = await NadeApi.update(
      state.originalNade.id,
      updateDto,
      token
    );

    if (result.isErr()) {
      displayToast({
        severity: "error",
        message: "Failed to update nade",
      });
      console.error(result.error);
      return;
    }

    displayToast({
      severity: "success",
      message: "Nade updated!",
    });

    router.push(
      "/nades/[nade]",
      `/nades/${state.originalNade.slug || state.originalNade.id}`
    );
  }, [state, getToken, displayToast, router]);

  const disableSubmit = useMemo(() => {
    const updateDto = createNadeUpdateBody(state);

    const changedFields = Object.keys(updateDto).length;

    return changedFields === 0;
  }, [state]);

  return {
    state,
    dispatch,
    disableSubmit,
    onUpdate,
  };
};

function createNadeUpdateBody(state: EditNadeState): NadeUpdateBody {
  //console.log("CurState", state);
  const { originalNade } = state;

  const updateBody: NadeUpdateBody = {
    description: newValueIfDifferent(
      originalNade.description,
      state.description
    ),
    endPosition: newValueIfDifferent(
      originalNade.endPosition,
      state.endPosition
    ),
    gfycat: newValueIfDifferent(originalNade.gfycat, state.gfycat),
    imageBase64: newValueIfDifferent(originalNade.images, state.imageBase64),
    map: newValueIfDifferent(originalNade.map, state.map),
    mapEndCoord: newValueIfDifferent(
      originalNade.mapEndCoord,
      state.mapEndCoord
    ),
    movement: newValueIfDifferent(originalNade.movement, state.movement),
    slug: newValueIfDifferent(originalNade.slug, state.slug),
    startPosition: newValueIfDifferent(
      originalNade.startPosition,
      state.startPosition
    ),
    status: newValueIfDifferent(originalNade.status, state.status),
    technique: newValueIfDifferent(originalNade.technique, state.technique),
    tickrate: newValueIfDifferent(originalNade.tickrate, state.tickrate),
    type: newValueIfDifferent(originalNade.type, state.type),
    oneWay: newValueIfDifferent(originalNade, state.oneWay),
  };

  // Remove undefine keys
  Object.keys(updateBody).forEach((key) =>
    updateBody[key] === undefined ? delete updateBody[key] : {}
  );

  return updateBody;
}

function newValueIfDifferent(originalValue?: any, newValue?: any) {
  const originalValueCheck = JSON.stringify(originalValue);
  const newValueCheck = JSON.stringify(newValue);

  if (!newValue) {
    return undefined;
  } else if (originalValueCheck === newValueCheck) {
    return undefined;
  } else {
    return newValue;
  }
}
