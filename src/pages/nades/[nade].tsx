import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../api/NadeApi";
import { Nade } from "../../models/Nade/Nade";
import { NadeNotFound } from "../../nades/NadeNotFound";
import { NadePage } from "../../nades/NadePage";
import { PageCentralize } from "../../common/PageCentralize";

type Props = {
  nade: Nade;
};

const NadePageComponent: NextPage<Props> = ({ nade }) => {
  if (!nade) {
    return <NadeNotFound />;
  }

  return (
    <PageCentralize>
      <NadePage key={nade.id} nade={nade} />
    </PageCentralize>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const nadeIdOrSlug = query.nade as string;

  const requestedSlug = checkIsSlug(nadeIdOrSlug);

  const result = await NadeApi.byId(nadeIdOrSlug);

  if (result.isErr()) {
    res.statusCode = 404;
    return {
      props: {
        nade: null,
      },
    };
  }

  // Redirect to slug url if using non slug url
  if (!requestedSlug && result.value.slug) {
    res.writeHead(301, {
      Location: `/nades/${result.value.slug}`,
    });
    res.end();
  }

  return {
    props: {
      nade: result.value,
    },
  };
};

function checkIsSlug(value: string) {
  return value.includes("-");
}

export default NadePageComponent;
