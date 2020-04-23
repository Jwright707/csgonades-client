import { FC } from "react";

type Props = {
  checked: boolean;
  onChange: () => void;
};

export const NightDayToggle: FC<Props> = ({ checked, onChange }) => {
  return (
    <>
      <div className="container">
        <div className="toggleWrapper">
          <input
            type="checkbox"
            className="dn"
            id="dn"
            onChange={onChange}
            checked={checked}
          />
          <label htmlFor="dn" className="toggle">
            <span className="toggle__handler">
              <span className="crater crater--1"></span>
              <span className="crater crater--2"></span>
              <span className="crater crater--3"></span>
            </span>
            <span className="star star--1"></span>
            <span className="star star--2"></span>
            <span className="star star--3"></span>
            <span className="star star--4"></span>
            <span className="star star--5"></span>
            <span className="star star--6"></span>
          </label>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: block;
          position: relative;
          top: 13px;
          right: 0;
          transform: scale(0.5);
        }

        .toggleWrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          overflow: hidden;
          padding: 0 200px;
          transform: translate3d(-50%, -50%, 0);
        }
        .toggleWrapper input {
          position: absolute;
          left: -99em;
        }
        .toggle {
          cursor: pointer;
          display: inline-block;
          position: relative;
          width: 90px;
          height: 50px;
          background-color: #83d8ff;
          border-radius: 84px;
          transition: background-color 200ms
            cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        .toggle__handler {
          display: inline-block;
          position: relative;
          z-index: 1;
          top: 3px;
          left: 3px;
          width: 44px;
          height: 44px;
          background-color: #ffcf96;
          border-radius: 50px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform: rotate(-45deg);
        }
        .toggle__handler .crater {
          position: absolute;
          background-color: #e8cda5;
          opacity: 0;
          transition: opacity 200ms ease-in-out;
          border-radius: 100%;
        }
        .toggle__handler .crater--1 {
          top: 18px;
          left: 10px;
          width: 4px;
          height: 4px;
        }
        .toggle__handler .crater--2 {
          top: 28px;
          left: 22px;
          width: 6px;
          height: 6px;
        }
        .toggle__handler .crater--3 {
          top: 10px;
          left: 25px;
          width: 8px;
          height: 8px;
        }
        .star {
          position: absolute;
          background-color: #fff;
          transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
          border-radius: 50%;
        }
        .star--1 {
          top: 10px;
          left: 35px;
          z-index: 0;
          width: 30px;
          height: 3px;
        }
        .star--2 {
          top: 18px;
          left: 28px;
          z-index: 1;
          width: 30px;
          height: 3px;
        }
        .star--3 {
          top: 27px;
          left: 40px;
          z-index: 0;
          width: 30px;
          height: 3px;
        }
        .star--4,
        .star--5,
        .star--6 {
          opacity: 0;
          transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        .star--4 {
          top: 16px;
          left: 11px;
          z-index: 0;
          width: 2px;
          height: 2px;
          transform: translate3d(3px, 0, 0);
        }
        .star--5 {
          top: 32px;
          left: 17px;
          z-index: 0;
          width: 3px;
          height: 3px;
          transform: translate3d(3px, 0, 0);
        }
        .star--6 {
          top: 36px;
          left: 28px;
          z-index: 0;
          width: 2px;
          height: 2px;
          transform: translate3d(3px, 0, 0);
        }
        input:checked + .toggle {
          background-color: #749dd6;
        }
        input:checked + .toggle:before {
          color: #749ed7;
        }
        input:checked + .toggle:after {
          color: #fff;
        }
        input:checked + .toggle .toggle__handler {
          background-color: #ffe5b5;
          transform: translate3d(40px, 0, 0) rotate(0);
        }
        input:checked + .toggle .toggle__handler .crater {
          opacity: 1;
        }
        input:checked + .toggle .star--1 {
          width: 2px;
          height: 2px;
        }
        input:checked + .toggle .star--2 {
          width: 4px;
          height: 4px;
          transform: translate3d(-5px, 0, 0);
        }
        input:checked + .toggle .star--3 {
          width: 2px;
          height: 2px;
          transform: translate3d(-7px, 0, 0);
        }
        input:checked + .toggle .star--4,
        input:checked + .toggle .star--5,
        input:checked + .toggle .star--6 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        input:checked + .toggle .star--4 {
          transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        input:checked + .toggle .star--5 {
          transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        input:checked + .toggle .star--6 {
          transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
      `}</style>
    </>
  );
};
