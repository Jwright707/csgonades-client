import { FC, useState, useEffect, useCallback, memo, useMemo } from "react";
import { NadeCommentApi, NadeComment } from "../../api/NadeCommentApi";
import { NadeCommentItem } from "./NadeCommentItem";
import { CommentSubmit } from "./CommentSubmit";

type Props = {
  nadeId: string;
};

export const NadeComments: FC<Props> = memo(({ nadeId }) => {
  const { comments, addComment, fetchComments } = useNadeComments(nadeId);

  return (
    <>
      <div className="nade-comment-container">
        <CommentSubmit nadeId={nadeId} onCommentSubmitted={addComment} />

        {comments.map((nc) => (
          <NadeCommentItem
            key={nc.id}
            nadeComment={nc}
            refetchComment={fetchComments}
          />
        ))}
      </div>
      <style jsx>{`
        .nade-comment-container {
          width: 100%;
        }
      `}</style>
    </>
  );
});

const useNadeComments = (nadeId: string) => {
  const [rawComments, setRawComment] = useState<NadeComment[]>([]);

  const fetchComments = useCallback(() => {
    (async () => {
      const res = await NadeCommentApi.getCommentsForNade(nadeId);
      if (res.isOk()) {
        setRawComment(res.value);
      }
    })();
  }, [nadeId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = useCallback(
    (comment: NadeComment) => {
      setRawComment([comment, ...rawComments]);
    },
    [rawComments]
  );

  const comments = useMemo(() => {
    const copy = [...rawComments];
    copy.sort((a, b) => {
      const first = new Date(a.createdAt);
      const second = new Date(b.createdAt);
      return first > second ? -1 : first < second ? 1 : 0;
    });
    return copy;
  }, [rawComments]);

  return {
    comments,
    addComment,
    fetchComments,
  };
};
