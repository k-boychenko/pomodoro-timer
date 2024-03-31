import React from "react";
import { GrClose } from "react-icons/gr";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// imoprt components
import Modal from "../common/Modal";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const Info = (props: Props) => {
  const info = (
    <div className="info-wrap">
      <div className="info-header">
        <div className="close-btn right-side">
          <GrClose onClick={props.toggle} />
        </div>
      </div>
      <div className="info-content">
        <h3>What is Pomotimer?</h3>
        <p>
          Pomotimer is a customizable pomodoro timer. It helps you focus on your
          tasks, using the pomodoro timer, as well as letting you track the
          tasks you're working on at the moment.
        </p>
        <h3>What is Pomodoro technique?</h3>
        <p>
          The Pomodoro Technique is created by Francesco Cirillo for a more
          productive way to work and study. The technique uses a timer to break
          down work into intervals, traditionally 25 minutes in length,
          separated by short breaks. Each interval is known as a pomodoro, from
          the Italian word for 'tomato', after the tomato-shaped kitchen timer
          that Cirillo used as a university student. -{" "}
          <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
            Wikipedia
          </a>
        </p>
        <h3>How to use this timer?</h3>
        <p>
          <ol>
            <li>Add your tasks for today</li>
            <li>Start the timer and focus on you tasks!</li>
            <li>Take a break when the timer goes off</li>
            <li>
              Iterate the pomodoro and breaks in a few cycles until you are done
              with the tasks
            </li>
            <li>
              Optionally you can choose you current task, set the number of
              pomodoro you plan for each task using arrows and edit the timers
              to your preferred length in settings{" "}
              <SettingsOutlinedIcon sx={{ verticalAlign: "middle" }} />
            </li>
          </ol>
        </p>
      </div>
    </div>
  );

  return <Modal children={info} isOpen={props.isOpen} toggle={props.toggle} />;
};

export default Info;
