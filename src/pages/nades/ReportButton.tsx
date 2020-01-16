import { FC, useState } from "react";
import { Button, Icon, Form, TextArea } from "semantic-ui-react";
import { CSGNModal } from "../../ui-common/CSGNModal";
import { ReportAddDto } from "../../models/Report";
import { ReportApi } from "../../api/ReportApi";
import { useDispatch } from "react-redux";
import { addNotificationActionThunk } from "../../store/NotificationStore/NotificationThunks";

type Props = {
  nadeId: string;
};

export const ReportButton: FC<Props> = ({ nadeId }) => {
  const dispatch = useDispatch();
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportMsg, setReportMsg] = useState("");

  function onToggle() {
    setShowReportForm(!showReportForm);
  }

  function onSendReport() {
    const report: ReportAddDto = {
      nadeId,
      message: reportMsg
    };
    ReportApi.add(report);
    setReportMsg("");
    setShowReportForm(false);
    dispatch(
      addNotificationActionThunk({
        severity: "success",
        title: "Report sent",
        message: "Thanks for reporting this nade.\nWe will look into it."
      })
    );
  }

  return (
    <>
      <div className="report-btn-container">
        <Button fluid color="vk" onClick={onToggle}>
          <Icon name="flag" />
          Report
        </Button>
      </div>
      <CSGNModal
        visible={showReportForm}
        onDismiss={onToggle}
        title="Report nade"
      >
        <p>Explain why you are reporting this nade.</p>
        <Form onSubmit={onSendReport}>
          <Form.Field>
            <label>Reason</label>
            <TextArea
              placeholder="Report reason..."
              value={reportMsg}
              rows={10}
              onChange={e => setReportMsg(e.currentTarget.value)}
            />
          </Form.Field>
          <Button positive type="submit">
            Send
          </Button>
        </Form>
      </CSGNModal>
      <style jsx>{`
        .report-btn-container {
          margin-top: 54px;
        }
      `}</style>
    </>
  );
};
