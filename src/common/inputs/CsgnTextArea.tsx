import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  label: string;
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const CsgnTextArea: FC<Props> = ({
  value,
  onChange,
  label,
  placeholder,
  defaultValue,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="text-area-wrapper">
        <label>{label}</label>
        <textarea
          defaultValue={defaultValue}
          placeholder={placeholder}
          value={value}
          onBlur={(e) => onChange(e.target.value)}
        />
      </div>
      <style jsx>{`
        label {
          margin-bottom: 5px;
          color: ${colors.TEXT};
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
        }

        .text-area-wrapper {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
          color: ${colors.TEXT};
        }

        textarea {
          background: ${colors.DP03};
          outline: none;
          min-height: 250px;
          resize: none;
          padding: 15px;
          border-radius: 5px;
          color: ${colors.TEXT};
          border: 1px solid rgba(0, 0, 0, 0.15);
        }

        textarea:focus {
          border: 1px solid ${colors.filterBgHover};
        }

        textarea::placeholder {
          color: #ccc;
          font-weight: 300;
        }
      `}</style>
    </>
  );
};
