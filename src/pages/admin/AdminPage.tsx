import { FC, useReducer } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { useIsAdminOrModerator } from "../../store/AuthStore/AuthHooks";
import { AdminNav } from "./AdminNav";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { AdminPendingNades } from "./AdminPendingNades";
import { AdminUsers } from "./AdminUsers";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

export const AdminPage: FC = () => {
  const theme = useTheme();
  const allowedToView = useIsAdminOrModerator();
  const { route } = useAdminPage();

  if (!allowedToView) {
    return <p>Your not allowed to view this page :(</p>;
  }

  function pageContent() {
    switch (route) {
      case "pending-nades":
        return <AdminPendingNades />;
      case "user":
        return <AdminUsers />;
      default:
        return null;
    }
  }

  return (
    <Layout title="Admin">
      <div className="admin-container">
        <div className="admin-nav">
          <AdminNav />
        </div>
        <div className="admin-content">{pageContent()}</div>
      </div>
      <style jsx>{`
        .admin-container {
          margin: ${theme.uiDimensions.OUTER_GUTTER_SIZE}px;
          display: flex;
        }

        .admin-nav {
          margin-right: ${theme.uiDimensions.INNER_GUTTER_SIZE}px;
        }

        .admin-content {
          flex: 1;
        }
      `}</style>
    </Layout>
  );
};
