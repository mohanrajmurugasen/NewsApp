import { Share } from "react-native";

const onShare = async (title, message, url) => {
    const messageAndUrl = message.concat('\n\n').concat(url);
    try {
      const result = await Share.share(
        {
            title,
            message: messageAndUrl,
        },
        {
            subject: title,
        },
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  export default { onShare }