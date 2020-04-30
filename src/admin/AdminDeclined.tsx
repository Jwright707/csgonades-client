import { FC, useState, useEffect } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { CsgnList } from "../common/list/CsgnList";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { useGetOrUpdateToken } from "../store/AuthStore/hooks/useGetToken";
import { NadeApi } from "../api/NadeApi";

type Props = {};

export const AdminDeclined: FC<Props> = ({}) => {
  const getToken = useGetOrUpdateToken();
  const [declinedNades, setDeclinedNades] = useState<NadeLight[]>([]);

  useEffect(() => {
    (async () => {
      const token = await getToken();

      if (!token) {
        return;
      }

      const res = await NadeApi.getDeclined(token);
      if (res.isOk()) {
        setDeclinedNades(res.value);
      }
    })();
  }, []);

  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <div>
        <h1>Declined</h1>
        <CsgnList<NadeLight>
          data={declinedNades}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </div>
      <style jsx>{``}</style>
    </>
  );
};
