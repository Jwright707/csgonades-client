import { FC, useRef, useState, useLayoutEffect, useEffect } from "react";
import ReactPlayer from "react-player";
import { GfycatData } from "../../models/Nade";
import { Icon } from "semantic-ui-react";

type Props = {
  gfyData?: GfycatData;
  editable?: boolean;
};

export const GfycatVideoPlayer: FC<Props> = ({ gfyData }) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const window = useWindowSize();

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      const height = ref.current.offsetWidth / (16 / 9);
      setHeight(height);
    }
  }, [window]);

  return (
    <>
      <div className="gfycat-player" style={{ width: "100%" }} ref={ref}>
        <ReactPlayer
          controls
          playing
          loop
          playsinline
          volume={0}
          url={gfyData ? gfyData.smallVideoUrl : ""}
          width={width}
          height={height}
        />
        <div className="edit-button-wrapper">
          <Icon name="edit" color="yellow" size="large" />
        </div>
      </div>
      <style jsx>{`
        .gfycat-player {
          position: relative;
        }

        .gfycat-player:hover .edit-button-wrapper {
          opacity: 1;
        }

        .edit-button-wrapper {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0;
          transition: opacity 0.3s;
          padding: 12px;
        }
      `}</style>
      <style jsx global>
        {`
          .gfycat-player video {
            outline: none;
          }
        `}
      </style>
    </>
  );
};

function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
