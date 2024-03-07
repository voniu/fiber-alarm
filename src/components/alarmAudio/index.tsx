import { useState, useEffect } from "react";
import alarmAudio from "@/assets/audio/7711.wav";
import { message } from "antd";
interface IProps {
  alert: boolean;
  volume: number;
}
const SoundAlert = (props: IProps) => {
  const { alert, volume } = props;
  const [audio] = useState(new Audio(alarmAudio));
  useEffect(() => {
    audio.volume = volume;
  }, [volume]);
  const playAlertSound = () => {
    // 播放声音警报
    audio.play().catch(() => {
      message.info("Error playing sound");
    });
  };
  const handleEnded = () => {
    audio.currentTime = 0; // 将播放时间设置为音频的开头
    audio.play(); // 重新播放音频
  };
  useEffect(() => {
    // 检查alert变量的变化

    console.log(alert);

    if (alert) {
      playAlertSound();
    } else {
      audio.pause();
    }
    audio.addEventListener("ended", handleEnded);
    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
      }
    };
  }, [alert]);

  return null;
};

export default SoundAlert;
