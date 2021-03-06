import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../nade/data/NadeApi";
import { Nade } from "../../nade/models/Nade";
import { NadeNotFound } from "../../nade/components/NadeNotFound";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { NadeMain } from "../../nade/NadeMain";
import { NadeHeader } from "../../nade/components/NadeHeader/NadeHeader";

type Props = {
  nade: Nade;
};

const NadePageComponent: NextPage<Props> = ({ nade }) => {
  if (!nade) {
    return <NadeNotFound />;
  }

  return (
    <LayoutBuilder
      header={<NadeHeader key={nade.id} nade={nade} />}
      main={<NadeMain key={nade.id} nade={nade} />}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const nadeIdOrSlug = query.nade as string;

  const idIsOnlyNumbers = /^\d+$/.test(nadeIdOrSlug);

  // Old site urls are no longer available
  if (nadeIdOrSlug.length <= 3 && idIsOnlyNumbers) {
    return {
      notFound: true,
    };
  }

  const requestedSlug = checkIsSlug(nadeIdOrSlug);

  const result = await NadeApi.byId(nadeIdOrSlug);

  if (result.isErr()) {
    // Might need to display a better error
    return {
      notFound: true,
    };
  }

  // Redirect to slug url if using non slug url
  if (!requestedSlug && result.value.slug) {
    return {
      redirect: {
        destination: `/nades/${result.value.slug}`,
        statusCode: 301,
      },
    };
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
