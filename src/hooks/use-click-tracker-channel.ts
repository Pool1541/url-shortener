import { useEffect } from "react";

const CLICK_TRACKER_BROADCASTCHANNEL = "click-tracker";

interface ClickEventData {
  id: string,
  increment: number
}

interface OnClickEventProps {
  callback: (data: ClickEventData) => void
}

export function emitClickEvent({ id }: Pick<ClickEventData, 'id'>) {
  const channel: BroadcastChannel = new BroadcastChannel(CLICK_TRACKER_BROADCASTCHANNEL);
  channel.postMessage({ id, increment: 1});
  channel.close();
};

export default function useClickTrackerChannel(callback: OnClickEventProps['callback']) {
  useEffect(() => {
    const channel: BroadcastChannel = new BroadcastChannel(CLICK_TRACKER_BROADCASTCHANNEL);

    channel.onmessage = (event) => {
      console.log(`Click registrado en: ${event.data.id}`)
      callback(event.data);
    };

    return () => {
      channel.close();
    };

  }, [callback]);
}