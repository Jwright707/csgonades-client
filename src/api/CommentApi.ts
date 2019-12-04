import { NadeComment } from "../models/NadeComment";

export class NadeCommentApi {
  static async byNadeId(_: string): Promise<NadeComment[]> {
    return fakeComments();
  }
}

const fakeComments = () => {
  const comment1: NadeComment = {
    id: "1",
    body: "This is a test",
    user: {
      nickname: "User1",
      steamID: "123"
    }
  };
  const comment2: NadeComment = {
    id: "2",
    body: "Hello World",
    user: {
      nickname: "User2",
      steamID: "456"
    }
  };

  return [comment1, comment2];
};
