import { useState, useEffect } from "react";
import alarmAudio from "@/assets/audio/7711.wav";
import { message } from "antd";
interface IProps {
  alert: boolean;
}
const SoundAlert = (props: IProps) => {
  const { alert } = props;
  const [audio] = useState(new Audio(alarmAudio));
  const playAlertSound = () => {
    // 播放声音警报
    audio.play().catch(() => {
      message.info("Error playing sound");
    });
  };
  useEffect(() => {
    // 检查alert变量的变化

    if (alert) {
      playAlertSound();
    } else {
      audio.pause();
    }
  }, [alert]);

  return null;
};

export default SoundAlert;
