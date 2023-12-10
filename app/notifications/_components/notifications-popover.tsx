import { BellIcon, BellRing } from "lucide-react";

import { Button } from "~/app/components/ui/button";
import { HTNotification } from "../service";

export const NotificationsPopover = ({
  notifications,
}: {
  notifications: HTNotification[];
}) => (
  <Button variant="ghost" size="icon">
    <NotificationIcon hasNotifications={notifications.length > 0} />
  </Button>
);

const NotificationIcon = ({
  hasNotifications,
}: {
  hasNotifications: boolean;
}) =>
  hasNotifications ? (
    <span className="relative">
      <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-destructive" />
      <div className="absolute right-0 top-0 -z-10 h-3 w-3 scale-150 rounded-full bg-[radial-gradient(hsl(var(--destructive))_10%,hsl(var(--destructive)/0)_70%)]" />
      <BellRing />
    </span>
  ) : (
    <BellIcon />
  );
