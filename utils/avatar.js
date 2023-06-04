import { createAvatar } from "@dicebear/core";
import { funEmoji } from '@dicebear/collection';

function getAvatar(name) {
  const avatar = createAvatar(thumbs, { seed: name });
  // const avatar = createAvatar(funEmoji, { seed: name });
  const imgString = avatar.toDataUri();
  return imgString;
}

export default getAvatar
